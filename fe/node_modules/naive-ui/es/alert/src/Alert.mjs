import { getMargin } from 'seemly';
import { computed, defineComponent, h, mergeProps, ref, watchEffect } from 'vue';
import { NBaseClose, NBaseIcon, NFadeInExpandTransition } from "../../_internal/index.mjs";
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from "../../_internal/icons/index.mjs";
import { useConfig, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { useRtl } from "../../_mixins/use-rtl.mjs";
import { createKey, resolveSlot, resolveWrappedSlot, warnOnce } from "../../_utils/index.mjs";
import { alertLight } from "../styles/index.mjs";
import style from "./styles/index.cssr.mjs";
export const alertProps = Object.assign(Object.assign({}, useTheme.props), {
  title: String,
  showIcon: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: 'default'
  },
  bordered: {
    type: Boolean,
    default: true
  },
  closable: Boolean,
  onClose: Function,
  onAfterLeave: Function,
  /** @deprecated */
  onAfterHide: Function
});
export default defineComponent({
  name: 'Alert',
  inheritAttrs: false,
  props: alertProps,
  slots: Object,
  setup(props) {
    if (process.env.NODE_ENV !== 'production') {
      watchEffect(() => {
        if (props.onAfterHide !== undefined) {
          warnOnce('alert', '`on-after-hide` is deprecated, please use `on-after-leave` instead.');
        }
      });
    }
    const {
      mergedClsPrefixRef,
      mergedBorderedRef,
      inlineThemeDisabled,
      mergedRtlRef
    } = useConfig(props);
    const themeRef = useTheme('Alert', '-alert', style, alertLight, props, mergedClsPrefixRef);
    const rtlEnabledRef = useRtl('Alert', mergedRtlRef, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        common: {
          cubicBezierEaseInOut
        },
        self
      } = themeRef.value;
      const {
        fontSize,
        borderRadius,
        titleFontWeight,
        lineHeight,
        iconSize,
        iconMargin,
        iconMarginRtl,
        closeIconSize,
        closeBorderRadius,
        closeSize,
        closeMargin,
        closeMarginRtl,
        padding
      } = self;
      const {
        type
      } = props;
      const {
        left,
        right
      } = getMargin(iconMargin);
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-color': self[createKey('color', type)],
        '--n-close-icon-size': closeIconSize,
        '--n-close-border-radius': closeBorderRadius,
        '--n-close-color-hover': self[createKey('closeColorHover', type)],
        '--n-close-color-pressed': self[createKey('closeColorPressed', type)],
        '--n-close-icon-color': self[createKey('closeIconColor', type)],
        '--n-close-icon-color-hover': self[createKey('closeIconColorHover', type)],
        '--n-close-icon-color-pressed': self[createKey('closeIconColorPressed', type)],
        '--n-icon-color': self[createKey('iconColor', type)],
        '--n-border': self[createKey('border', type)],
        '--n-title-text-color': self[createKey('titleTextColor', type)],
        '--n-content-text-color': self[createKey('contentTextColor', type)],
        '--n-line-height': lineHeight,
        '--n-border-radius': borderRadius,
        '--n-font-size': fontSize,
        '--n-title-font-weight': titleFontWeight,
        '--n-icon-size': iconSize,
        '--n-icon-margin': iconMargin,
        '--n-icon-margin-rtl': iconMarginRtl,
        '--n-close-size': closeSize,
        '--n-close-margin': closeMargin,
        '--n-close-margin-rtl': closeMarginRtl,
        '--n-padding': padding,
        '--n-icon-margin-left': left,
        '--n-icon-margin-right': right
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('alert', computed(() => {
      return props.type[0];
    }), cssVarsRef, props) : undefined;
    const visibleRef = ref(true);
    const doAfterLeave = () => {
      const {
        onAfterLeave,
        onAfterHide // deprecated
      } = props;
      if (onAfterLeave) onAfterLeave();
      if (onAfterHide) onAfterHide();
    };
    const handleCloseClick = () => {
      var _a;
      void Promise.resolve((_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props)).then(result => {
        if (result === false) return;
        visibleRef.value = false;
      });
    };
    const handleAfterLeave = () => {
      doAfterLeave();
    };
    return {
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedBordered: mergedBorderedRef,
      visible: visibleRef,
      handleCloseClick,
      handleAfterLeave,
      mergedTheme: themeRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    var _a;
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    return h(NFadeInExpandTransition, {
      onAfterLeave: this.handleAfterLeave
    }, {
      default: () => {
        const {
          mergedClsPrefix,
          $slots
        } = this;
        const attrs = {
          class: [`${mergedClsPrefix}-alert`, this.themeClass, this.closable && `${mergedClsPrefix}-alert--closable`, this.showIcon && `${mergedClsPrefix}-alert--show-icon`,
          // fix: https://github.com/tusen-ai/naive-ui/issues/4588
          !this.title && this.closable && `${mergedClsPrefix}-alert--right-adjust`, this.rtlEnabled && `${mergedClsPrefix}-alert--rtl`],
          style: this.cssVars,
          role: 'alert'
        };
        return this.visible ? h("div", Object.assign({}, mergeProps(this.$attrs, attrs)), this.closable && h(NBaseClose, {
          clsPrefix: mergedClsPrefix,
          class: `${mergedClsPrefix}-alert__close`,
          onClick: this.handleCloseClick
        }), this.bordered && h("div", {
          class: `${mergedClsPrefix}-alert__border`
        }), this.showIcon && h("div", {
          class: `${mergedClsPrefix}-alert__icon`,
          "aria-hidden": "true"
        }, resolveSlot($slots.icon, () => [h(NBaseIcon, {
          clsPrefix: mergedClsPrefix
        }, {
          default: () => {
            switch (this.type) {
              case 'success':
                return h(SuccessIcon, null);
              case 'info':
                return h(InfoIcon, null);
              case 'warning':
                return h(WarningIcon, null);
              case 'error':
                return h(ErrorIcon, null);
              default:
                return null;
            }
          }
        })])), h("div", {
          class: [`${mergedClsPrefix}-alert-body`, this.mergedBordered && `${mergedClsPrefix}-alert-body--bordered`]
        }, resolveWrappedSlot($slots.header, children => {
          const mergedChildren = children || this.title;
          return mergedChildren ? h("div", {
            class: `${mergedClsPrefix}-alert-body__title`
          }, mergedChildren) : null;
        }), $slots.default && h("div", {
          class: `${mergedClsPrefix}-alert-body__content`
        }, $slots))) : null;
      }
    });
  }
});