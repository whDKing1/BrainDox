/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { defineComponent, provide, ref, inject, getCurrentInstance, onBeforeUnmount } from 'vue';
import { beforeNextFrameOnce } from 'seemly';
import { on, off } from 'evtd';
import { getSlot } from '../../shared/v-node';
import { getScrollParent } from './utils';
const Binder = defineComponent({
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
        provide('VBinder', (_a = getCurrentInstance()) === null || _a === void 0 ? void 0 : _a.proxy);
        const VBinder = inject('VBinder', null);
        const targetRef = ref(null);
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
                cursor = getScrollParent(cursor);
                if (cursor === null)
                    break;
                scrollableNodes.push(cursor);
            }
            for (const el of scrollableNodes) {
                on('scroll', el, onScroll, true);
            }
        };
        const removeScrollListeners = () => {
            for (const el of scrollableNodes) {
                off('scroll', el, onScroll, true);
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
            beforeNextFrameOnce(onScrollRaf);
        };
        const onScrollRaf = () => {
            followerScrollListeners.forEach((listener) => listener());
        };
        // resize related
        const followerResizeListeners = new Set();
        const addResizeListener = (listener) => {
            if (followerResizeListeners.size === 0) {
                on('resize', window, onResize);
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
                off('resize', window, onResize);
            }
        };
        const onResize = () => {
            followerResizeListeners.forEach((listener) => listener());
        };
        onBeforeUnmount(() => {
            off('resize', window, onResize);
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
        return getSlot('binder', this.$slots);
    }
});
export default Binder;
