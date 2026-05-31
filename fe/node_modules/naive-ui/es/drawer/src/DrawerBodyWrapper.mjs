import { clickoutside } from 'vdirs';
import { computed, defineComponent, h, inject, mergeProps, onBeforeUnmount, provide, ref, Transition, vShow, watch, watchEffect, withDirectives } from 'vue';
import { VFocusTrap } from 'vueuc';
import { NScrollbar } from "../../_internal/index.mjs";
import { useConfig, useRtl } from "../../_mixins/index.mjs";
import { useLockHtmlScroll } from "../../_utils/index.mjs";
import { modalBodyInjectionKey } from "../../modal/src/interface.mjs";
import { popoverBodyInjectionKey } from "../../popover/src/interface.mjs";
import { drawerBodyInjectionKey, drawerInjectionKey } from "./interface.mjs";
export default defineComponent({
  name: 'NDrawerContent',
  inheritAttrs: false,
  props: {
    blockScroll: Boolean,
    show: {
      type: Boolean,
      default: undefined
    },
    displayDirective: {
      type: String,
      required: true
    },
    placement: {
      type: String,
      required: true
    },
    contentClass: String,
    contentStyle: [Object, String],
    nativeScrollbar: {
      type: Boolean,
      required: true
    },
    scrollbarProps: Object,
    trapFocus: {
      type: Boolean,
      default: true
    },
    autoFocus: {
      type: Boolean,
      default: true
    },
    showMask: {
      type: [Boolean, String],
      required: true
    },
    maxWidth: Number,
    maxHeight: Number,
    minWidth: Number,
    minHeight: Number,
    resizable: Boolean,
    onClickoutside: Function,
    onAfterLeave: Function,
    onAfterEnter: Function,
    onEsc: Function
  },
  setup(props) {
    const displayedRef = ref(!!props.show);
    const bodyRef = ref(null); // used for detached content
    const NDrawer = inject(drawerInjectionKey);
    let startPosition = 0;
    let memoizedBodyStyleCursor = '';
    let hoverTimerId = null;
    const isHoverOnResizeTriggerRef = ref(false);
    const isDraggingRef = ref(false);
    const isVertical = computed(() => {
      return props.placement === 'top' || props.placement === 'bottom';
    });
    const {
      mergedClsPrefixRef,
      mergedRtlRef
    } = useConfig(props);
    const rtlEnabledRef = useRtl('Drawer', mergedRtlRef, mergedClsPrefixRef);
    const handleBodyMouseleave = handleBodyMouseup;
    const handleMousedownResizeTrigger = e => {
      isDraggingRef.value = true;
      startPosition = isVertical.value ? e.clientY : e.clientX;
      memoizedBodyStyleCursor = document.body.style.cursor;
      document.body.style.cursor = isVertical.value ? 'ns-resize' : 'ew-resize';
      document.body.addEventListener('mousemove', handleBodyMousemove);
      document.body.addEventListener('mouseleave', handleBodyMouseleave);
      document.body.addEventListener('mouseup', handleBodyMouseup);
    };
    const handleMouseenterResizeTrigger = () => {
      if (hoverTimerId !== null) {
        window.clearTimeout(hoverTimerId);
        hoverTimerId = null;
      }
      if (isDraggingRef.value) {
        isHoverOnResizeTriggerRef.value = true;
      } else {
        hoverTimerId = window.setTimeout(() => {
          isHoverOnResizeTriggerRef.value = true;
        }, 300);
      }
    };
    const handleMouseleaveResizeTrigger = () => {
      if (hoverTimerId !== null) {
        window.clearTimeout(hoverTimerId);
        hoverTimerId = null;
      }
      isHoverOnResizeTriggerRef.value = false;
    };
    const {
      doUpdateHeight,
      doUpdateWidth
    } = NDrawer;
    const regulateWidth = size => {
      const {
        maxWidth
      } = props;
      if (maxWidth && size > maxWidth) return maxWidth;
      const {
        minWidth
      } = props;
      if (minWidth && size < minWidth) return minWidth;
      return size;
    };
    const regulateHeight = size => {
      const {
        maxHeight
      } = props;
      if (maxHeight && size > maxHeight) return maxHeight;
      const {
        minHeight
      } = props;
      if (minHeight && size < minHeight) return minHeight;
      return size;
    };
    function handleBodyMousemove(e) {
      var _a, _b;
      if (isDraggingRef.value) {
        if (isVertical.value) {
          let height = ((_a = bodyRef.value) === null || _a === void 0 ? void 0 : _a.offsetHeight) || 0;
          const increment = startPosition - e.clientY;
          height += props.placement === 'bottom' ? increment : -increment;
          height = regulateHeight(height);
          doUpdateHeight(height);
          startPosition = e.clientY;
        } else {
          let width = ((_b = bodyRef.value) === null || _b === void 0 ? void 0 : _b.offsetWidth) || 0;
          const increment = startPosition - e.clientX;
          width += props.placement === 'right' ? increment : -increment;
          width = regulateWidth(width);
          doUpdateWidth(width);
          startPosition = e.clientX;
        }
      }
    }
    function handleBodyMouseup() {
      if (isDraggingRef.value) {
        startPosition = 0;
        isDraggingRef.value = false;
        document.body.style.cursor = memoizedBodyStyleCursor;
        document.body.removeEventListener('mousemove', handleBodyMousemove);
        document.body.removeEventListener('mouseup', handleBodyMouseup);
        document.body.removeEventListener('mouseleave', handleBodyMouseleave);
      }
    }
    watchEffect(() => {
      if (props.show) displayedRef.value = true;
    });
    watch(() => props.show, value => {
      if (!value) {
        handleBodyMouseup();
      }
    });
    onBeforeUnmount(() => {
      handleBodyMouseup();
    });
    const bodyDirectivesRef = computed(() => {
      const {
        show
      } = props;
      const directives = [[vShow, show]];
      if (!props.showMask) {
        directives.push([clickoutside, props.onClickoutside, undefined, {
          capture: true
        }]);
      }
      return directives;
    });
    function handleAfterLeave() {
      var _a;
      displayedRef.value = false;
      (_a = props.onAfterLeave) === null || _a === void 0 ? void 0 : _a.call(props);
    }
    useLockHtmlScroll(computed(() => props.blockScroll && displayedRef.value));
    provide(drawerBodyInjectionKey, bodyRef);
    provide(popoverBodyInjectionKey, null);
    provide(modalBodyInjectionKey, null);
    return {
      bodyRef,
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: NDrawer.mergedClsPrefixRef,
      isMounted: NDrawer.isMountedRef,
      mergedTheme: NDrawer.mergedThemeRef,
      displayed: displayedRef,
      transitionName: computed(() => {
        return {
          right: 'slide-in-from-right-transition',
          left: 'slide-in-from-left-transition',
          top: 'slide-in-from-top-transition',
          bottom: 'slide-in-from-bottom-transition'
        }[props.placement];
      }),
      handleAfterLeave,
      bodyDirectives: bodyDirectivesRef,
      handleMousedownResizeTrigger,
      handleMouseenterResizeTrigger,
      handleMouseleaveResizeTrigger,
      isDragging: isDraggingRef,
      isHoverOnResizeTrigger: isHoverOnResizeTriggerRef
    };
  },
  render() {
    const {
      $slots,
      mergedClsPrefix
    } = this;
    return this.displayDirective === 'show' || this.displayed || this.show ? withDirectives(
    /* Keep the wrapper dom. Make sure the drawer has a host.
    Nor the detached content will disappear without transition */
    h("div", {
      role: "none"
    }, h(VFocusTrap, {
      disabled: !this.showMask || !this.trapFocus,
      active: this.show,
      autoFocus: this.autoFocus,
      onEsc: this.onEsc
    }, {
      default: () => h(Transition, {
        name: this.transitionName,
        appear: this.isMounted,
        onAfterEnter: this.onAfterEnter,
        onAfterLeave: this.handleAfterLeave
      }, {
        default: () => withDirectives(h('div', mergeProps(this.$attrs, {
          role: 'dialog',
          ref: 'bodyRef',
          'aria-modal': 'true',
          class: [`${mergedClsPrefix}-drawer`, this.rtlEnabled && `${mergedClsPrefix}-drawer--rtl`, `${mergedClsPrefix}-drawer--${this.placement}-placement`,
          /**
           * When the mouse is pressed to resize the drawer,
           * disable text selection
           */
          this.isDragging && `${mergedClsPrefix}-drawer--unselectable`, this.nativeScrollbar && `${mergedClsPrefix}-drawer--native-scrollbar`]
        }), [this.resizable ? h("div", {
          class: [`${mergedClsPrefix}-drawer__resize-trigger`, (this.isDragging || this.isHoverOnResizeTrigger) && `${mergedClsPrefix}-drawer__resize-trigger--hover`],
          onMouseenter: this.handleMouseenterResizeTrigger,
          onMouseleave: this.handleMouseleaveResizeTrigger,
          onMousedown: this.handleMousedownResizeTrigger
        }) : null, this.nativeScrollbar ? h("div", {
          class: [`${mergedClsPrefix}-drawer-content-wrapper`, this.contentClass],
          style: this.contentStyle,
          role: "none"
        }, $slots) : h(NScrollbar, Object.assign({}, this.scrollbarProps, {
          contentStyle: this.contentStyle,
          contentClass: [`${mergedClsPrefix}-drawer-content-wrapper`, this.contentClass],
          theme: this.mergedTheme.peers.Scrollbar,
          themeOverrides: this.mergedTheme.peerOverrides.Scrollbar
        }), $slots)]), this.bodyDirectives)
      })
    })), [[vShow, this.displayDirective === 'if' || this.displayed || this.show]]) : null;
  }
});