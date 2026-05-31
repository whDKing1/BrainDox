"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const vue_1 = require("vue");
const vdirs_1 = require("vdirs");
const vooks_1 = require("vooks");
const vue3_ssr_1 = require("@css-render/vue3-ssr");
const shared_1 = require("../../shared");
const index_1 = __importDefault(require("../../lazy-teleport/src/index"));
const get_placement_style_1 = require("./get-placement-style");
const utils_1 = require("./utils");
const style = (0, shared_1.c)([
    (0, shared_1.c)('.v-binder-follower-container', {
        position: 'absolute',
        left: '0',
        right: '0',
        top: '0',
        height: '0',
        pointerEvents: 'none',
        zIndex: 'auto'
    }),
    (0, shared_1.c)('.v-binder-follower-content', {
        position: 'absolute',
        zIndex: 'auto'
    }, [
        (0, shared_1.c)('> *', {
            pointerEvents: 'all'
        })
    ])
]);
exports.default = (0, vue_1.defineComponent)({
    name: 'Follower',
    inheritAttrs: false,
    props: {
        show: Boolean,
        enabled: {
            type: Boolean,
            default: undefined
        },
        placement: {
            type: String,
            default: 'bottom'
        },
        syncTrigger: {
            type: Array,
            default: ['resize', 'scroll']
        },
        to: [String, Object],
        flip: {
            type: Boolean,
            default: true
        },
        internalShift: Boolean,
        x: Number,
        y: Number,
        width: String,
        minWidth: String,
        containerClass: String,
        teleportDisabled: Boolean,
        zindexable: {
            type: Boolean,
            default: true
        },
        zIndex: Number,
        overlap: Boolean
    },
    setup(props) {
        const VBinder = (0, vue_1.inject)('VBinder');
        const mergedEnabledRef = (0, vooks_1.useMemo)(() => {
            return props.enabled !== undefined ? props.enabled : props.show;
        });
        const followerRef = (0, vue_1.ref)(null);
        const offsetContainerRef = (0, vue_1.ref)(null);
        const ensureListeners = () => {
            const { syncTrigger } = props;
            if (syncTrigger.includes('scroll')) {
                VBinder.addScrollListener(syncPosition);
            }
            if (syncTrigger.includes('resize')) {
                VBinder.addResizeListener(syncPosition);
            }
        };
        const removeListeners = () => {
            VBinder.removeScrollListener(syncPosition);
            VBinder.removeResizeListener(syncPosition);
        };
        (0, vue_1.onMounted)(() => {
            if (mergedEnabledRef.value) {
                syncPosition();
                ensureListeners();
            }
        });
        const ssrAdapter = (0, vue3_ssr_1.useSsrAdapter)();
        style.mount({
            id: 'vueuc/binder',
            head: true,
            anchorMetaName: shared_1.cssrAnchorMetaName,
            ssr: ssrAdapter
        });
        (0, vue_1.onBeforeUnmount)(() => {
            removeListeners();
        });
        (0, vooks_1.onFontsReady)(() => {
            if (mergedEnabledRef.value) {
                syncPosition();
            }
        });
        const syncPosition = () => {
            if (!mergedEnabledRef.value) {
                return;
            }
            const follower = followerRef.value;
            // sometimes watched props change before its dom is ready
            // for example: show=false, x=undefined, y=undefined
            //              show=true,  x=0,         y=0
            // will cause error
            // I may optimize the watch start point later
            if (follower === null)
                return;
            const target = VBinder.targetRef;
            const { x, y, overlap } = props;
            const targetRect = x !== undefined && y !== undefined
                ? (0, utils_1.getPointRect)(x, y)
                : (0, utils_1.getRect)(target);
            follower.style.setProperty('--v-target-width', `${Math.round(targetRect.width)}px`);
            follower.style.setProperty('--v-target-height', `${Math.round(targetRect.height)}px`);
            const { width, minWidth, placement, internalShift, flip } = props;
            follower.setAttribute('v-placement', placement);
            if (overlap) {
                follower.setAttribute('v-overlap', '');
            }
            else {
                follower.removeAttribute('v-overlap');
            }
            const { style } = follower;
            if (width === 'target') {
                style.width = `${targetRect.width}px`;
            }
            else if (width !== undefined) {
                style.width = width;
            }
            else {
                style.width = '';
            }
            if (minWidth === 'target') {
                style.minWidth = `${targetRect.width}px`;
            }
            else if (minWidth !== undefined) {
                style.minWidth = minWidth;
            }
            else {
                style.minWidth = '';
            }
            const followerRect = (0, utils_1.getRect)(follower);
            const offsetContainerRect = (0, utils_1.getRect)(offsetContainerRef.value);
            const { left: offsetLeftToStandardPlacement, top: offsetTopToStandardPlacement, placement: properPlacement } = (0, get_placement_style_1.getPlacementAndOffsetOfFollower)(placement, targetRect, followerRect, internalShift, flip, overlap);
            const properTransformOrigin = (0, get_placement_style_1.getProperTransformOrigin)(properPlacement, overlap);
            const { left, top, transform } = (0, get_placement_style_1.getOffset)(properPlacement, offsetContainerRect, targetRect, offsetTopToStandardPlacement, offsetLeftToStandardPlacement, overlap);
            // we assume that the content size doesn't change after flip,
            // nor we need to make sync logic more complex
            follower.setAttribute('v-placement', properPlacement);
            follower.style.setProperty('--v-offset-left', `${Math.round(offsetLeftToStandardPlacement)}px`);
            follower.style.setProperty('--v-offset-top', `${Math.round(offsetTopToStandardPlacement)}px`);
            follower.style.transform = `translateX(${left}) translateY(${top}) ${transform}`;
            follower.style.setProperty('--v-transform-origin', properTransformOrigin);
            follower.style.transformOrigin = properTransformOrigin;
        };
        (0, vue_1.watch)(mergedEnabledRef, (value) => {
            if (value) {
                ensureListeners();
                syncOnNextTick();
            }
            else {
                removeListeners();
            }
        });
        const syncOnNextTick = () => {
            (0, vue_1.nextTick)()
                .then(syncPosition)
                .catch((e) => console.error(e));
        };
        [
            'placement',
            'x',
            'y',
            'internalShift',
            'flip',
            'width',
            'overlap',
            'minWidth'
        ].forEach((prop) => {
            (0, vue_1.watch)((0, vue_1.toRef)(props, prop), syncPosition);
        });
        ['teleportDisabled'].forEach((prop) => {
            (0, vue_1.watch)((0, vue_1.toRef)(props, prop), syncOnNextTick);
        });
        (0, vue_1.watch)((0, vue_1.toRef)(props, 'syncTrigger'), (value) => {
            if (!value.includes('resize')) {
                VBinder.removeResizeListener(syncPosition);
            }
            else {
                VBinder.addResizeListener(syncPosition);
            }
            if (!value.includes('scroll')) {
                VBinder.removeScrollListener(syncPosition);
            }
            else {
                VBinder.addScrollListener(syncPosition);
            }
        });
        const isMountedRef = (0, vooks_1.useIsMounted)();
        const mergedToRef = (0, vooks_1.useMemo)(() => {
            const { to } = props;
            if (to !== undefined)
                return to;
            if (isMountedRef.value) {
                // TODO: find proper container
                return undefined;
            }
            return undefined;
        });
        return {
            VBinder,
            mergedEnabled: mergedEnabledRef,
            offsetContainerRef,
            followerRef,
            mergedTo: mergedToRef,
            syncPosition
        };
    },
    render() {
        return (0, vue_1.h)(index_1.default, {
            show: this.show,
            to: this.mergedTo,
            disabled: this.teleportDisabled
        }, {
            default: () => {
                var _a, _b;
                const vNode = (0, vue_1.h)('div', {
                    class: ['v-binder-follower-container', this.containerClass],
                    ref: 'offsetContainerRef'
                }, [
                    (0, vue_1.h)('div', {
                        class: 'v-binder-follower-content',
                        ref: 'followerRef'
                    }, (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a))
                ]);
                if (this.zindexable) {
                    return (0, vue_1.withDirectives)(vNode, [
                        [
                            vdirs_1.zindexable,
                            {
                                enabled: this.mergedEnabled,
                                zIndex: this.zIndex
                            }
                        ]
                    ]);
                }
                return vNode;
            }
        });
    }
});
