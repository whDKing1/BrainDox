import { zindexable } from 'vdirs';
import { useCompitable, useIsMounted, useMemo, useMergedState } from 'vooks';
import { cloneVNode, computed, defineComponent, h, provide, ref, Text, toRef, watchEffect, withDirectives } from 'vue';
import { VBinder, VTarget } from 'vueuc';
import { useTheme } from "../../_mixins/index.mjs";
import { call, getFirstSlotVNode, keep, useAdjustedTo, warnOnce } from "../../_utils/index.mjs";
import NPopoverBody, { popoverBodyProps } from "./PopoverBody.mjs";
const bodyPropKeys = Object.keys(popoverBodyProps);
const triggerEventMap = {
  focus: ['onFocus', 'onBlur'],
  click: ['onClick'],
  hover: ['onMouseenter', 'onMouseleave'],
  manual: [],
  nested: ['onFocus', 'onBlur', 'onMouseenter', 'onMouseleave', 'onClick']
};
function appendEvents(vNode, trigger, events) {
  triggerEventMap[trigger].forEach(eventName => {
    if (!vNode.props) {
      vNode.props = {};
    } else {
      vNode.props = Object.assign({}, vNode.props);
    }
    const originalHandler = vNode.props[eventName];
    const handler = events[eventName];
    if (!originalHandler) {
      vNode.props[eventName] = handler;
    } else {
      vNode.props[eventName] = (...args) => {
        originalHandler(...args);
        handler(...args);
      };
    }
  });
}
export const popoverBaseProps = {
  show: {
    type: Boolean,
    default: undefined
  },
  defaultShow: Boolean,
  showArrow: {
    type: Boolean,
    default: true
  },
  trigger: {
    type: String,
    default: 'hover'
  },
  delay: {
    type: Number,
    default: 100
  },
  duration: {
    type: Number,
    default: 100
  },
  raw: Boolean,
  placement: {
    type: String,
    default: 'top'
  },
  x: Number,
  y: Number,
  arrowPointToCenter: Boolean,
  disabled: Boolean,
  getDisabled: Function,
  displayDirective: {
    type: String,
    default: 'if'
  },
  arrowClass: String,
  arrowStyle: [String, Object],
  arrowWrapperClass: String,
  arrowWrapperStyle: [String, Object],
  flip: {
    type: Boolean,
    default: true
  },
  animated: {
    type: Boolean,
    default: true
  },
  width: {
    type: [Number, String],
    default: undefined
  },
  overlap: Boolean,
  keepAliveOnHover: {
    type: Boolean,
    default: true
  },
  zIndex: Number,
  to: useAdjustedTo.propTo,
  scrollable: Boolean,
  contentClass: String,
  contentStyle: [Object, String],
  headerClass: String,
  headerStyle: [Object, String],
  footerClass: String,
  footerStyle: [Object, String],
  // events
  onClickoutside: Function,
  'onUpdate:show': [Function, Array],
  onUpdateShow: [Function, Array],
  // internal
  internalDeactivateImmediately: Boolean,
  internalSyncTargetWithParent: Boolean,
  internalInheritedEventHandlers: {
    type: Array,
    default: () => []
  },
  internalTrapFocus: Boolean,
  internalExtraClass: {
    type: Array,
    default: () => []
  },
  // deprecated
  onShow: [Function, Array],
  onHide: [Function, Array],
  arrow: {
    type: Boolean,
    default: undefined
  },
  minWidth: Number,
  maxWidth: Number
};
export const popoverProps = Object.assign(Object.assign(Object.assign({}, useTheme.props), popoverBaseProps), {
  internalOnAfterLeave: Function,
  internalRenderBody: Function
});
export default defineComponent({
  name: 'Popover',
  inheritAttrs: false,
  props: popoverProps,
  slots: Object,
  __popover__: true,
  setup(props) {
    if (process.env.NODE_ENV !== 'production') {
      watchEffect(() => {
        if (props.maxWidth !== undefined) {
          warnOnce('popover', '`max-width` is deprecated, please use `style` instead.');
        }
        if (props.minWidth !== undefined) {
          warnOnce('popover', '`min-width` is deprecated, please use `style` instead.');
        }
        if (props.arrow !== undefined) {
          warnOnce('popover', '`arrow` is deprecated, please use `showArrow` instead.');
        }
        if (props.onHide !== undefined) {
          warnOnce('popover', '`on-hide` is deprecated, please use `on-update:show` instead.');
        }
        if (props.onShow !== undefined) {
          warnOnce('popover', '`on-show` is deprecated, please use `on-update:show` instead.');
        }
      });
    }
    const isMountedRef = useIsMounted();
    const binderInstRef = ref(null);
    // setup show
    const controlledShowRef = computed(() => props.show);
    const uncontrolledShowRef = ref(props.defaultShow);
    const mergedShowWithoutDisabledRef = useMergedState(controlledShowRef, uncontrolledShowRef);
    const mergedShowConsideringDisabledPropRef = useMemo(() => {
      if (props.disabled) return false;
      return mergedShowWithoutDisabledRef.value;
    });
    const getMergedDisabled = () => {
      if (props.disabled) return true;
      const {
        getDisabled
      } = props;
      if (getDisabled === null || getDisabled === void 0 ? void 0 : getDisabled()) return true;
      return false;
    };
    const getMergedShow = () => {
      if (getMergedDisabled()) return false;
      return mergedShowWithoutDisabledRef.value;
    };
    // setup show-arrow
    const compatibleShowArrowRef = useCompitable(props, ['arrow', 'showArrow']);
    const mergedShowArrowRef = computed(() => {
      if (props.overlap) return false;
      return compatibleShowArrowRef.value;
    });
    // bodyInstance
    let bodyInstance = null;
    const showTimerIdRef = ref(null);
    const hideTimerIdRef = ref(null);
    const positionManuallyRef = useMemo(() => {
      return props.x !== undefined && props.y !== undefined;
    });
    // methods
    function doUpdateShow(value) {
      const {
        'onUpdate:show': _onUpdateShow,
        onUpdateShow,
        onShow,
        onHide
      } = props;
      uncontrolledShowRef.value = value;
      if (_onUpdateShow) {
        call(_onUpdateShow, value);
      }
      if (onUpdateShow) {
        call(onUpdateShow, value);
      }
      if (value && onShow) {
        call(onShow, true);
      }
      if (value && onHide) {
        call(onHide, false);
      }
    }
    function syncPosition() {
      if (bodyInstance) {
        bodyInstance.syncPosition();
      }
    }
    function clearShowTimer() {
      const {
        value: showTimerId
      } = showTimerIdRef;
      if (showTimerId) {
        window.clearTimeout(showTimerId);
        showTimerIdRef.value = null;
      }
    }
    function clearHideTimer() {
      const {
        value: hideTimerId
      } = hideTimerIdRef;
      if (hideTimerId) {
        window.clearTimeout(hideTimerId);
        hideTimerIdRef.value = null;
      }
    }
    function handleFocus() {
      const mergedDisabled = getMergedDisabled();
      if (props.trigger === 'focus' && !mergedDisabled) {
        if (getMergedShow()) return;
        doUpdateShow(true);
      }
    }
    function handleBlur() {
      const mergedDisabled = getMergedDisabled();
      if (props.trigger === 'focus' && !mergedDisabled) {
        if (!getMergedShow()) return;
        doUpdateShow(false);
      }
    }
    function handleMouseEnter() {
      const mergedDisabled = getMergedDisabled();
      if (props.trigger === 'hover' && !mergedDisabled) {
        clearHideTimer();
        if (showTimerIdRef.value !== null) return;
        if (getMergedShow()) return;
        const delayCallback = () => {
          doUpdateShow(true);
          showTimerIdRef.value = null;
        };
        const {
          delay
        } = props;
        if (delay === 0) {
          delayCallback();
        } else {
          showTimerIdRef.value = window.setTimeout(delayCallback, delay);
        }
      }
    }
    function handleMouseLeave() {
      const mergedDisabled = getMergedDisabled();
      if (props.trigger === 'hover' && !mergedDisabled) {
        clearShowTimer();
        if (hideTimerIdRef.value !== null) return;
        if (!getMergedShow()) return;
        const delayedCallback = () => {
          doUpdateShow(false);
          hideTimerIdRef.value = null;
        };
        const {
          duration
        } = props;
        if (duration === 0) {
          delayedCallback();
        } else {
          hideTimerIdRef.value = window.setTimeout(delayedCallback, duration);
        }
      }
    }
    // will be called in popover-content
    function handleMouseMoveOutside() {
      handleMouseLeave();
    }
    // will be called in popover-content
    function handleClickOutside(e) {
      var _a;
      if (!getMergedShow()) return;
      if (props.trigger === 'click') {
        clearShowTimer();
        clearHideTimer();
        doUpdateShow(false);
      }
      (_a = props.onClickoutside) === null || _a === void 0 ? void 0 : _a.call(props, e);
    }
    function handleClick() {
      if (props.trigger === 'click' && !getMergedDisabled()) {
        clearShowTimer();
        clearHideTimer();
        const nextShow = !getMergedShow();
        doUpdateShow(nextShow);
      }
    }
    function handleKeydown(e) {
      if (!props.internalTrapFocus) return;
      if (e.key === 'Escape') {
        clearShowTimer();
        clearHideTimer();
        doUpdateShow(false);
      }
    }
    function setShow(value) {
      uncontrolledShowRef.value = value;
    }
    function getTriggerElement() {
      var _a;
      return (_a = binderInstRef.value) === null || _a === void 0 ? void 0 : _a.targetRef;
    }
    function setBodyInstance(value) {
      bodyInstance = value;
    }
    provide('NPopover', {
      getTriggerElement,
      handleKeydown,
      handleMouseEnter,
      handleMouseLeave,
      handleClickOutside,
      handleMouseMoveOutside,
      setBodyInstance,
      positionManuallyRef,
      isMountedRef,
      zIndexRef: toRef(props, 'zIndex'),
      extraClassRef: toRef(props, 'internalExtraClass'),
      internalRenderBodyRef: toRef(props, 'internalRenderBody')
    });
    watchEffect(() => {
      if (mergedShowWithoutDisabledRef.value && getMergedDisabled()) {
        doUpdateShow(false);
      }
    });
    const returned = {
      binderInstRef,
      positionManually: positionManuallyRef,
      mergedShowConsideringDisabledProp: mergedShowConsideringDisabledPropRef,
      // if to show popover body
      uncontrolledShow: uncontrolledShowRef,
      mergedShowArrow: mergedShowArrowRef,
      getMergedShow,
      setShow,
      handleClick,
      handleMouseEnter,
      handleMouseLeave,
      handleFocus,
      handleBlur,
      syncPosition
    };
    return returned;
  },
  render() {
    var _a;
    const {
      positionManually,
      $slots: slots
    } = this;
    let triggerVNode;
    let popoverInside = false;
    if (!positionManually) {
      triggerVNode = getFirstSlotVNode(slots, 'trigger');
      if (triggerVNode) {
        triggerVNode = cloneVNode(triggerVNode);
        triggerVNode = triggerVNode.type === Text ? h('span', [triggerVNode]) : triggerVNode;
        const handlers = {
          onClick: this.handleClick,
          onMouseenter: this.handleMouseEnter,
          onMouseleave: this.handleMouseLeave,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur
        };
        if ((_a = triggerVNode.type) === null || _a === void 0 ? void 0 : _a.__popover__) {
          popoverInside = true;
          // We assume that there's no DOM event handlers on popover element
          if (!triggerVNode.props) {
            triggerVNode.props = {
              internalSyncTargetWithParent: true,
              internalInheritedEventHandlers: []
            };
          }
          triggerVNode.props.internalSyncTargetWithParent = true;
          if (!triggerVNode.props.internalInheritedEventHandlers) {
            triggerVNode.props.internalInheritedEventHandlers = [handlers];
          } else {
            triggerVNode.props.internalInheritedEventHandlers = [handlers, ...triggerVNode.props.internalInheritedEventHandlers];
          }
        } else {
          const {
            internalInheritedEventHandlers
          } = this;
          const ascendantAndCurrentHandlers = [handlers, ...internalInheritedEventHandlers];
          const mergedHandlers = {
            onBlur: e => {
              ascendantAndCurrentHandlers.forEach(_handlers => {
                _handlers.onBlur(e);
              });
            },
            onFocus: e => {
              ascendantAndCurrentHandlers.forEach(_handlers => {
                _handlers.onFocus(e);
              });
            },
            onClick: e => {
              ascendantAndCurrentHandlers.forEach(_handlers => {
                _handlers.onClick(e);
              });
            },
            onMouseenter: e => {
              ascendantAndCurrentHandlers.forEach(_handlers => {
                _handlers.onMouseenter(e);
              });
            },
            onMouseleave: e => {
              ascendantAndCurrentHandlers.forEach(_handlers => {
                _handlers.onMouseleave(e);
              });
            }
          };
          appendEvents(triggerVNode, internalInheritedEventHandlers ? 'nested' : positionManually ? 'manual' : this.trigger, mergedHandlers);
        }
      }
    }
    return h(VBinder, {
      ref: "binderInstRef",
      syncTarget: !popoverInside,
      syncTargetWithParent: this.internalSyncTargetWithParent
    }, {
      default: () => {
        // We need to subscribe it. Sometimes rerender won't ge triggered.
        // `mergedShowConsideringDisabledProp` is not the final disabled status.
        // In ellpisis it's dynamic.
        void this.mergedShowConsideringDisabledProp;
        const mergedShow = this.getMergedShow();
        return [this.internalTrapFocus && mergedShow ? withDirectives(h("div", {
          style: {
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }), [[zindexable, {
          enabled: mergedShow,
          zIndex: this.zIndex
        }]]) : null, positionManually ? null : h(VTarget, null, {
          default: () => triggerVNode
        }), h(NPopoverBody, keep(this.$props, bodyPropKeys, Object.assign(Object.assign({}, this.$attrs), {
          showArrow: this.mergedShowArrow,
          show: mergedShow
        })), {
          default: () => {
            var _a, _b;
            return (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a);
          },
          header: () => {
            var _a, _b;
            return (_b = (_a = this.$slots).header) === null || _b === void 0 ? void 0 : _b.call(_a);
          },
          footer: () => {
            var _a, _b;
            return (_b = (_a = this.$slots).footer) === null || _b === void 0 ? void 0 : _b.call(_a);
          }
        })];
      }
    });
  }
});