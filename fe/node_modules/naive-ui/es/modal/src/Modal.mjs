import { getPreciseEventTarget } from 'seemly';
import { zindexable } from 'vdirs';
import { useClicked, useClickPosition, useIsMounted } from 'vooks';
import { computed, defineComponent, h, inject, provide, ref, toRef, Transition, withDirectives } from 'vue';
import { VLazyTeleport } from 'vueuc';
import { useConfig, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { call, eventEffectNotPerformed, keep, useIsComposing, warnOnce } from "../../_utils/index.mjs";
import { dialogProviderInjectionKey } from "../../dialog/src/context.mjs";
import { modalLight } from "../styles/index.mjs";
import NModalBodyWrapper from "./BodyWrapper.mjs";
import { modalInjectionKey, modalProviderInjectionKey } from "./interface.mjs";
import { presetProps, presetPropsKeys } from "./presetProps.mjs";
import style from "./styles/index.cssr.mjs";
export const modalProps = Object.assign(Object.assign(Object.assign(Object.assign({}, useTheme.props), {
  show: Boolean,
  showMask: {
    type: Boolean,
    default: true
  },
  maskClosable: {
    type: Boolean,
    default: true
  },
  preset: String,
  to: [String, Object],
  displayDirective: {
    type: String,
    default: 'if'
  },
  transformOrigin: {
    type: String,
    default: 'mouse'
  },
  zIndex: Number,
  autoFocus: {
    type: Boolean,
    default: true
  },
  trapFocus: {
    type: Boolean,
    default: true
  },
  closeOnEsc: {
    type: Boolean,
    default: true
  },
  blockScroll: {
    type: Boolean,
    default: true
  }
}), presetProps), {
  draggable: [Boolean, Object],
  // events
  onEsc: Function,
  'onUpdate:show': [Function, Array],
  onUpdateShow: [Function, Array],
  onAfterEnter: Function,
  onBeforeLeave: Function,
  onAfterLeave: Function,
  onClose: Function,
  onPositiveClick: Function,
  onNegativeClick: Function,
  onMaskClick: Function,
  // private
  internalDialog: Boolean,
  internalModal: Boolean,
  internalAppear: {
    type: Boolean,
    default: undefined
  },
  // deprecated
  overlayStyle: [String, Object],
  onBeforeHide: Function,
  onAfterHide: Function,
  onHide: Function,
  unstableShowMask: {
    type: Boolean,
    default: undefined
  }
});
export default defineComponent({
  name: 'Modal',
  inheritAttrs: false,
  props: modalProps,
  slots: Object,
  setup(props) {
    if (process.env.NODE_ENV !== 'production') {
      if (props.onHide) {
        warnOnce('modal', '`on-hide` is deprecated.');
      }
      if (props.onAfterHide) {
        warnOnce('modal', '`on-after-hide` is deprecated, please use `on-after-leave` instead.');
      }
      if (props.onBeforeHide) {
        warnOnce('modal', '`on-before-hide` is deprecated, please use `on-before-leave` instead.');
      }
      if (props.overlayStyle) {
        warnOnce('modal', '`overlay-style` is deprecated, please use `style` instead.');
      }
      if (props.unstableShowMask) {
        warnOnce('modal', '`unstable-show-mask` has been removed, please use `show-mask` instead.');
      }
    }
    const containerRef = ref(null);
    const {
      mergedClsPrefixRef,
      namespaceRef,
      inlineThemeDisabled
    } = useConfig(props);
    const themeRef = useTheme('Modal', '-modal', style, modalLight, props, mergedClsPrefixRef);
    const clickedRef = useClicked(64);
    const clickedPositionRef = useClickPosition();
    const isMountedRef = useIsMounted();
    const NDialogProvider = props.internalDialog ? inject(dialogProviderInjectionKey, null) : null;
    const NModalProvider = props.internalModal ? inject(modalProviderInjectionKey, null) : null;
    const isComposingRef = useIsComposing();
    function doUpdateShow(show) {
      const {
        onUpdateShow,
        'onUpdate:show': _onUpdateShow,
        onHide
      } = props;
      if (onUpdateShow) call(onUpdateShow, show);
      if (_onUpdateShow) call(_onUpdateShow, show);
      // deprecated
      if (onHide && !show) onHide(show);
    }
    function handleCloseClick() {
      const {
        onClose
      } = props;
      if (onClose) {
        void Promise.resolve(onClose()).then(value => {
          if (value === false) return;
          doUpdateShow(false);
        });
      } else {
        doUpdateShow(false);
      }
    }
    function handlePositiveClick() {
      const {
        onPositiveClick
      } = props;
      if (onPositiveClick) {
        void Promise.resolve(onPositiveClick()).then(value => {
          if (value === false) return;
          doUpdateShow(false);
        });
      } else {
        doUpdateShow(false);
      }
    }
    function handleNegativeClick() {
      const {
        onNegativeClick
      } = props;
      if (onNegativeClick) {
        void Promise.resolve(onNegativeClick()).then(value => {
          if (value === false) return;
          doUpdateShow(false);
        });
      } else {
        doUpdateShow(false);
      }
    }
    function handleBeforeLeave() {
      const {
        onBeforeLeave,
        onBeforeHide
      } = props;
      if (onBeforeLeave) call(onBeforeLeave);
      // deprecated
      if (onBeforeHide) onBeforeHide();
    }
    function handleAfterLeave() {
      const {
        onAfterLeave,
        onAfterHide
      } = props;
      if (onAfterLeave) call(onAfterLeave);
      // deprecated
      if (onAfterHide) onAfterHide();
    }
    function handleClickoutside(e) {
      var _a;
      const {
        onMaskClick
      } = props;
      if (onMaskClick) {
        onMaskClick(e);
      }
      if (props.maskClosable) {
        if ((_a = containerRef.value) === null || _a === void 0 ? void 0 : _a.contains(getPreciseEventTarget(e))) {
          doUpdateShow(false);
        }
      }
    }
    function handleEsc(e) {
      var _a;
      (_a = props.onEsc) === null || _a === void 0 ? void 0 : _a.call(props);
      if (props.show && props.closeOnEsc && eventEffectNotPerformed(e)) {
        if (!isComposingRef.value) {
          doUpdateShow(false);
        }
      }
    }
    provide(modalInjectionKey, {
      getMousePosition: () => {
        const mergedProvider = NDialogProvider || NModalProvider;
        if (mergedProvider) {
          const {
            clickedRef,
            clickedPositionRef
          } = mergedProvider;
          if (clickedRef.value && clickedPositionRef.value) {
            return clickedPositionRef.value;
          }
        }
        if (clickedRef.value) {
          return clickedPositionRef.value;
        }
        return null;
      },
      mergedClsPrefixRef,
      mergedThemeRef: themeRef,
      isMountedRef,
      appearRef: toRef(props, 'internalAppear'),
      transformOriginRef: toRef(props, 'transformOrigin')
    });
    const cssVarsRef = computed(() => {
      const {
        common: {
          cubicBezierEaseOut
        },
        self: {
          boxShadow,
          color,
          textColor
        }
      } = themeRef.value;
      return {
        '--n-bezier-ease-out': cubicBezierEaseOut,
        '--n-box-shadow': boxShadow,
        '--n-color': color,
        '--n-text-color': textColor
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('theme-class', undefined, cssVarsRef, props) : undefined;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      namespace: namespaceRef,
      isMounted: isMountedRef,
      containerRef,
      presetProps: computed(() => {
        const pickedProps = keep(props, presetPropsKeys);
        // TODO: remove as any after vue fix the issue introduced in 3.2.27
        return pickedProps;
      }),
      handleEsc,
      handleAfterLeave,
      handleClickoutside,
      handleBeforeLeave,
      doUpdateShow,
      handleNegativeClick,
      handlePositiveClick,
      handleCloseClick,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    const {
      mergedClsPrefix
    } = this;
    return h(VLazyTeleport, {
      to: this.to,
      show: this.show
    }, {
      default: () => {
        var _a;
        (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
        const {
          showMask
        } = this;
        return withDirectives(h("div", {
          role: "none",
          ref: "containerRef",
          class: [`${mergedClsPrefix}-modal-container`, this.themeClass, this.namespace],
          style: this.cssVars
        }, h(NModalBodyWrapper, Object.assign({
          style: this.overlayStyle
        }, this.$attrs, {
          ref: "bodyWrapper",
          displayDirective: this.displayDirective,
          show: this.show,
          preset: this.preset,
          autoFocus: this.autoFocus,
          trapFocus: this.trapFocus,
          draggable: this.draggable,
          blockScroll: this.blockScroll,
          maskHidden: !showMask
        }, this.presetProps, {
          onEsc: this.handleEsc,
          onClose: this.handleCloseClick,
          onNegativeClick: this.handleNegativeClick,
          onPositiveClick: this.handlePositiveClick,
          onBeforeLeave: this.handleBeforeLeave,
          onAfterEnter: this.onAfterEnter,
          onAfterLeave: this.handleAfterLeave,
          onClickoutside: showMask ? undefined : this.handleClickoutside,
          renderMask: showMask ? () => {
            var _a;
            return h(Transition, {
              name: "fade-in-transition",
              key: "mask",
              appear: (_a = this.internalAppear) !== null && _a !== void 0 ? _a : this.isMounted
            }, {
              default: () => {
                return this.show ? h("div", {
                  "aria-hidden": true,
                  ref: "containerRef",
                  class: `${mergedClsPrefix}-modal-mask`,
                  onClick: this.handleClickoutside
                }) : null;
              }
            });
          } : undefined
        }), this.$slots)), [[zindexable, {
          zIndex: this.zIndex,
          enabled: this.show
        }]]);
      }
    });
  }
});