import { getPadding } from 'seemly';
import { computed, defineComponent, h, inject } from 'vue';
import { NBaseClose, NBaseIcon } from "../../_internal/index.mjs";
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from "../../_internal/icons/index.mjs";
import { useConfig, useRtl, useThemeClass } from "../../_mixins/index.mjs";
import { createKey, keysOf, render } from "../../_utils/index.mjs";
import { notificationProviderInjectionKey } from "./context.mjs";
const iconRenderMap = {
  info: () => h(InfoIcon, null),
  success: () => h(SuccessIcon, null),
  warning: () => h(WarningIcon, null),
  error: () => h(ErrorIcon, null),
  default: () => null
};
export const notificationProps = {
  closable: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: 'default'
  },
  avatar: Function,
  title: [String, Function],
  description: [String, Function],
  content: [String, Function],
  meta: [String, Function],
  action: [String, Function],
  onClose: {
    type: Function,
    required: true
  },
  keepAliveOnHover: Boolean,
  onMouseenter: Function,
  onMouseleave: Function
};
export const notificationPropKeys = keysOf(notificationProps);
export const Notification = defineComponent({
  name: 'Notification',
  props: notificationProps,
  setup(props) {
    const {
      mergedClsPrefixRef,
      mergedThemeRef,
      props: providerProps
    } = inject(notificationProviderInjectionKey);
    const {
      inlineThemeDisabled,
      mergedRtlRef
    } = useConfig();
    const rtlEnabledRef = useRtl('Notification', mergedRtlRef, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        type
      } = props;
      const {
        self: {
          color,
          textColor,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed,
          headerTextColor,
          descriptionTextColor,
          actionTextColor,
          borderRadius,
          headerFontWeight,
          boxShadow,
          lineHeight,
          fontSize,
          closeMargin,
          closeSize,
          width,
          padding,
          closeIconSize,
          closeBorderRadius,
          closeColorHover,
          closeColorPressed,
          titleFontSize,
          metaFontSize,
          descriptionFontSize,
          [createKey('iconColor', type)]: iconColor
        },
        common: {
          cubicBezierEaseOut,
          cubicBezierEaseIn,
          cubicBezierEaseInOut
        }
      } = mergedThemeRef.value;
      const {
        left,
        right,
        top,
        bottom
      } = getPadding(padding);
      return {
        '--n-color': color,
        '--n-font-size': fontSize,
        '--n-text-color': textColor,
        '--n-description-text-color': descriptionTextColor,
        '--n-action-text-color': actionTextColor,
        '--n-title-text-color': headerTextColor,
        '--n-title-font-weight': headerFontWeight,
        '--n-bezier': cubicBezierEaseInOut,
        '--n-bezier-ease-out': cubicBezierEaseOut,
        '--n-bezier-ease-in': cubicBezierEaseIn,
        '--n-border-radius': borderRadius,
        '--n-box-shadow': boxShadow,
        '--n-close-border-radius': closeBorderRadius,
        '--n-close-color-hover': closeColorHover,
        '--n-close-color-pressed': closeColorPressed,
        '--n-close-icon-color': closeIconColor,
        '--n-close-icon-color-hover': closeIconColorHover,
        '--n-close-icon-color-pressed': closeIconColorPressed,
        '--n-line-height': lineHeight,
        '--n-icon-color': iconColor,
        '--n-close-margin': closeMargin,
        '--n-close-size': closeSize,
        '--n-close-icon-size': closeIconSize,
        '--n-width': width,
        '--n-padding-left': left,
        '--n-padding-right': right,
        '--n-padding-top': top,
        '--n-padding-bottom': bottom,
        '--n-title-font-size': titleFontSize,
        '--n-meta-font-size': metaFontSize,
        '--n-description-font-size': descriptionFontSize
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('notification', computed(() => props.type[0]), cssVarsRef, providerProps) : undefined;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      showAvatar: computed(() => {
        return props.avatar || props.type !== 'default';
      }),
      handleCloseClick() {
        props.onClose();
      },
      rtlEnabled: rtlEnabledRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    var _a;
    const {
      mergedClsPrefix
    } = this;
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    return h("div", {
      class: [`${mergedClsPrefix}-notification-wrapper`, this.themeClass],
      onMouseenter: this.onMouseenter,
      onMouseleave: this.onMouseleave,
      style: this.cssVars
    }, h("div", {
      class: [`${mergedClsPrefix}-notification`, this.rtlEnabled && `${mergedClsPrefix}-notification--rtl`, this.themeClass, {
        [`${mergedClsPrefix}-notification--closable`]: this.closable,
        [`${mergedClsPrefix}-notification--show-avatar`]: this.showAvatar
      }],
      style: this.cssVars
    }, this.showAvatar ? h("div", {
      class: `${mergedClsPrefix}-notification__avatar`
    }, this.avatar ? render(this.avatar) : this.type !== 'default' ? h(NBaseIcon, {
      clsPrefix: mergedClsPrefix
    }, {
      default: () => iconRenderMap[this.type]()
    }) : null) : null, this.closable ? h(NBaseClose, {
      clsPrefix: mergedClsPrefix,
      class: `${mergedClsPrefix}-notification__close`,
      onClick: this.handleCloseClick
    }) : null, h("div", {
      ref: "bodyRef",
      class: `${mergedClsPrefix}-notification-main`
    }, this.title ? h("div", {
      class: `${mergedClsPrefix}-notification-main__header`
    }, render(this.title)) : null, this.description ? h("div", {
      class: `${mergedClsPrefix}-notification-main__description`
    }, render(this.description)) : null, this.content ? h("pre", {
      class: `${mergedClsPrefix}-notification-main__content`
    }, render(this.content)) : null, this.meta || this.action ? h("div", {
      class: `${mergedClsPrefix}-notification-main-footer`
    }, this.meta ? h("div", {
      class: `${mergedClsPrefix}-notification-main-footer__meta`
    }, render(this.meta)) : null, this.action ? h("div", {
      class: `${mergedClsPrefix}-notification-main-footer__action`
    }, render(this.action)) : null) : null)));
  }
});