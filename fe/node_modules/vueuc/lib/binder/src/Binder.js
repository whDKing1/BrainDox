"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const vue_1 = require("vue");
const seemly_1 = require("seemly");
const evtd_1 = require("evtd");
const v_node_1 = require("../../shared/v-node");
const utils_1 = require("./utils");
const Binder = (0, vue_1.defineComponent)({
    name: 'Binder',
    props: {
        syncTargetWithParent: Boolean,
        syncTarget: {
            type: Boolean,
            default: true
        }
    },
    setup(props) {
        var _a;
        (0, vue_1.provide)('VBinder', (_a = (0, vue_1.getCurrentInstance)()) === null || _a === void 0 ? void 0 : _a.proxy);
        const VBinder = (0, vue_1.inject)('VBinder', null);
        const targetRef = (0, vue_1.ref)(null);
        /**
         * If there's no nested vbinder, we can simply set the target ref.
         *
         * However, when it comes to:
         * <VBinder> <- syncTarget = false
         *
         *              Should hold target DOM ref, but can't get it directly from
         *              its VTarget. So if there are nested VBinder, we should:
         *              1. Stop setting target DOM from level-1 VTarget
         *              2. Set target DOM from level-2 VTarget
         *              For (1), we need `syncTarget` to `false`
         *              For (2), we need to set `syncTargetWithParent` to `true` on
         *              level-2 VBinder
         *   <VTarget>
         *     <VBinder> <- syncTargetWithParent = true
         *       <VTarget>target</VTarget>
         *     </VBinder>
         *     <VFollower>
         *       content1
         *     </VFollower>
         *   </VTarget>
         *   <VFollower>
         *     content2
         *   </VFollower>
         * </VBinder>
         */
        const setTargetRef = (el) => {
            targetRef.value = el;
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (VBinder && props.syncTargetWithParent) {
                VBinder.setTargetRef(el);
            }
        };
        // scroll related
        let scrollableNodes = [];
        const ensureScrollListener = () => {
            let cursor = targetRef.value;
            while (true) {
                cursor = (0, utils_1.getScrollParent)(cursor);
                if (cursor === null)
                    break;
                scrollableNodes.push(cursor);
            }
            for (const el of scrollableNodes) {
                (0, evtd_1.on)('scroll', el, onScroll, true);
            }
        };
        const removeScrollListeners = () => {
            for (const el of scrollableNodes) {
                (0, evtd_1.off)('scroll', el, onScroll, true);
            }
            scrollableNodes = [];
        };
        const followerScrollListeners = new Set();
        const addScrollListener = (listener) => {
            if (followerScrollListeners.size === 0) {
                ensureScrollListener();
            }
            if (!followerScrollListeners.has(listener)) {
                followerScrollListeners.add(listener);
            }
        };
        const removeScrollListener = (listener) => {
            if (followerScrollListeners.has(listener)) {
                followerScrollListeners.delete(listener);
            }
            if (followerScrollListeners.size === 0) {
                removeScrollListeners();
            }
        };
        const onScroll = () => {
            (0, seemly_1.beforeNextFrameOnce)(onScrollRaf);
        };
        const onScrollRaf = () => {
            followerScrollListeners.forEach((listener) => listener());
        };
        // resize related
        const followerResizeListeners = new Set();
        const addResizeListener = (listener) => {
            if (followerResizeListeners.size === 0) {
                (0, evtd_1.on)('resize', window, onResize);
            }
            if (!followerResizeListeners.has(listener)) {
                followerResizeListeners.add(listener);
            }
        };
        const removeResizeListener = (listener) => {
            if (followerResizeListeners.has(listener)) {
                followerResizeListeners.delete(listener);
            }
            if (followerResizeListeners.size === 0) {
                (0, evtd_1.off)('resize', window, onResize);
            }
        };
        const onResize = () => {
            followerResizeListeners.forEach((listener) => listener());
        };
        (0, vue_1.onBeforeUnmount)(() => {
            (0, evtd_1.off)('resize', window, onResize);
            removeScrollListeners();
        });
        return {
            targetRef,
            setTargetRef,
            addScrollListener,
            removeScrollListener,
            addResizeListener,
            removeResizeListener
        };
    },
    render() {
        return (0, v_node_1.getSlot)('binder', this.$slots);
    }
});
exports.default = Binder;
