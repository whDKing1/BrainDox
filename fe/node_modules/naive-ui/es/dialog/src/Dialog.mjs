import { getMargin } from 'seemly';
import { computed, defineComponent, h } from 'vue';
import { NBaseClose, NBaseIcon } from "../../_internal/index.mjs";
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from "../../_internal/icons/index.mjs";
import { useConfig, useRtl, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { createKey, render, resolveSlot, resolveWrappedSlot } from "../../_utils/index.mjs";
import { NButton } from "../../button/index.mjs";
import { dialogLight } from "../styles/index.mjs";
import { dialogProps } from "./dialogProps.mjs";
import style from "./styles/index.cssr.mjs";
const iconRenderMap = {
  default: () => h(InfoIcon, null),
  info: () => h(InfoIcon, null),
  success: () => h(SuccessIcon, null),
  warning: () => h(WarningIcon, null),
  error: () => h(ErrorIcon, null)
};
export const NDialog = defineComponent({
  name: 'Dialog',
  alias: ['NimbusConfirmCard',
  // deprecated
  'Confirm' // deprecated
  ],
  props: Object.assign(Object.assign({}, useTheme.props), dialogProps),
  slots: Object,
  setup(props) {
    const {
      mergedComponentPropsRef,
      mergedClsPrefixRef,
      inlineThemeDisabled,
      mergedRtlRef
    } = useConfig(props);
    const rtlEnabledRef = useRtl('Dialog', mergedRtlRef, mergedClsPrefixRef);
    const mergedIconPlacementRef = computed(() => {
      var _a, _b;
      const {
        iconPlacement
      } = props;
      return iconPlacement || ((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Dialog) === null || _b === void 0 ? void 0 : _b.iconPlacement) || 'left';
    });
    function handlePositiveClick(e) {
      const {
        onPositiveClick
      } = props;
      if (onPositiveClick) onPositiveClick(e);
    }
    function handleNegativeClick(e) {
      const {
        onNegativeClick
      } = props;
      if (onNegativeClick) onNegativeClick(e);
    }
    function handleCloseClick() {
      const {
        onClose
      } = props;
      if (onClose) onClose();
    }
    const themeRef = useTheme('Dialog', '-dialog', style, dialogLight, props, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        type
      } = props;
      const iconPlacement = mergedIconPlacementRef.value;
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: {
          fontSize,
          lineHeight,
          border,
          titleTextColor,
          textColor,
          color,
          closeBorderRadius,
          closeColorHover,
          closeColorPressed,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed,
          closeIconSize,
          borderRadius,
          titleFontWeight,
          titleFontSize,
          padding,
          iconSize,
          actionSpace,
          contentMargin,
          closeSize,
          [iconPlacement === 'top' ? 'iconMarginIconTop' : 'iconMargin']: iconMargin,
          [iconPlacement === 'top' ? 'closeMarginIconTop' : 'closeMargin']: closeMargin,
          [createKey('iconColor', type)]: iconColor
        }
      } = themeRef.value;
      const iconMarginDiscrete = getMargin(iconMargin);
      return {
        '--n-font-size': fontSize,
        '--n-icon-color': iconColor,
        '--n-bezier': cubicBezierEaseInOut,
        '--n-close-margin': closeMargin,
        '--n-icon-margin-top': iconMarginDiscrete.top,
        '--n-icon-margin-right': iconMarginDiscrete.right,
        '--n-icon-margin-bottom': iconMarginDiscrete.bottom,
        '--n-icon-margin-left': iconMarginDiscrete.left,
        '--n-icon-size': iconSize,
        '--n-close-size': closeSize,
        '--n-close-icon-size': closeIconSize,
        '--n-close-border-radius': closeBorderRadius,
        '--n-close-color-hover': closeColorHover,
        '--n-close-color-pressed': closeColorPressed,
        '--n-close-icon-color': closeIconColor,
        '--n-close-icon-color-hover': closeIconColorHover,
        '--n-close-icon-color-pressed': closeIconColorPressed,
        '--n-color': color,
        '--n-text-color': textColor,
        '--n-border-radius': borderRadius,
        '--n-padding': padding,
        '--n-line-height': lineHeight,
        '--n-border': border,
        '--n-content-margin': contentMargin,
        '--n-title-font-size': titleFontSize,
        '--n-title-font-weight': titleFontWeight,
        '--n-title-text-color': titleTextColor,
        '--n-action-space': actionSpace
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('dialog', computed(() => `${props.type[0]}${mergedIconPlacementRef.value[0]}`), cssVarsRef, props) : undefined;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      rtlEnabled: rtlEnabledRef,
      mergedIconPlacement: mergedIconPlacementRef,
      mergedTheme: themeRef,
      handlePositiveClick,
      handleNegativeClick,
      handleCloseClick,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    var _a;
    const {
      bordered,
      mergedIconPlacement,
      cssVars,
      closable,
      showIcon,
      title,
      content,
      action,
      negativeText,
      positiveText,
      positiveButtonProps,
      negativeButtonProps,
      handlePositiveClick,
      handleNegativeClick,
      mergedTheme,
      loading,
      type,
      mergedClsPrefix
    } = this;
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    const icon = showIcon ? h(NBaseIcon, {
      clsPrefix: mergedClsPrefix,
      class: `${mergedClsPrefix}-dialog__icon`
    }, {
      default: () => resolveWrappedSlot(this.$slots.icon, children => children || (this.icon ? render(this.icon) : iconRenderMap[this.type]()))
    }) : null;
    const actionNode = resolveWrappedSlot(this.$slots.action, children => children || positiveText || negativeText || action ? h("div", {
      class: [`${mergedClsPrefix}-dialog__action`, this.actionClass],
      style: this.actionStyle
    }, children || (action ? [render(action)] : [this.negativeText && h(NButton, Object.assign({
      theme: mergedTheme.peers.Button,
      themeOverrides: mergedTheme.peerOverrides.Button,
      ghost: true,
      size: "small",
      onClick: handleNegativeClick
    }, negativeButtonProps), {
      default: () => render(this.negativeText)
    }), this.positiveText && h(NButton, Object.assign({
      theme: mergedTheme.peers.Button,
      themeOverrides: mergedTheme.peerOverrides.Button,
      size: "small",
      type: type === 'default' ? 'primary' : type,
      disabled: loading,
      loading: loading,
      onClick: handlePositiveClick
    }, positiveButtonProps), {
      default: () => render(this.positiveText)
    })])) : null);
    return h("div", {
      class: [`${mergedClsPrefix}-dialog`, this.themeClass, this.closable && `${mergedClsPrefix}-dialog--closable`, `${mergedClsPrefix}-dialog--icon-${mergedIconPlacement}`, bordered && `${mergedClsPrefix}-dialog--bordered`, this.rtlEnabled && `${mergedClsPrefix}-dialog--rtl`],
      style: cssVars,
      role: "dialog"
    }, closable ? resolveWrappedSlot(this.$slots.close, node => {
      const classNames = [`${mergedClsPrefix}-dialog__close`, this.rtlEnabled && `${mergedClsPrefix}-dialog--rtl`];
      return node ? h("div", {
        class: classNames
      }, node) : h(NBaseClose, {
        focusable: this.closeFocusable,
        clsPrefix: mergedClsPrefix,
        class: classNames,
        onClick: this.handleCloseClick
      });
    }) : null, showIcon && mergedIconPlacement === 'top' ? h("div", {
      class: `${mergedClsPrefix}-dialog-icon-container`
    }, icon) : null, h("div", {
      class: [`${mergedClsPrefix}-dialog__title`, this.titleClass],
      style: this.titleStyle
    }, showIcon && mergedIconPlacement === 'left' ? icon : null, resolveSlot(this.$slots.header, () => [render(title)])), h("div", {
      class: [`${mergedClsPrefix}-dialog__content`, actionNode ? '' : `${mergedClsPrefix}-dialog__content--last`, this.contentClass],
      style: this.contentStyle
    }, resolveSlot(this.$slots.default, () => [render(content)])), actionNode);
  }
});