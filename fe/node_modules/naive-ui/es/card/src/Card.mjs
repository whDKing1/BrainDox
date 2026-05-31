import { getPadding } from 'seemly';
import { computed, defineComponent, h } from 'vue';
import { NBaseClose, NScrollbar } from "../../_internal/index.mjs";
import { useConfig, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { useRtl } from "../../_mixins/use-rtl.mjs";
import { call, createKey, keysOf, resolveWrappedSlot } from "../../_utils/index.mjs";
import { ensureValidVNode } from "../../_utils/vue/resolve-slot.mjs";
import { cardLight } from "../styles/index.mjs";
import style from "./styles/index.cssr.mjs";
export const cardBaseProps = {
  title: [String, Function],
  contentClass: String,
  contentStyle: [Object, String],
  contentScrollable: Boolean,
  headerClass: String,
  headerStyle: [Object, String],
  headerExtraClass: String,
  headerExtraStyle: [Object, String],
  footerClass: String,
  footerStyle: [Object, String],
  embedded: Boolean,
  segmented: {
    type: [Boolean, Object],
    default: false
  },
  size: String,
  bordered: {
    type: Boolean,
    default: true
  },
  closable: Boolean,
  hoverable: Boolean,
  role: String,
  onClose: [Function, Array],
  tag: {
    type: String,
    default: 'div'
  },
  cover: Function,
  content: [String, Function],
  footer: Function,
  action: Function,
  headerExtra: Function,
  closeFocusable: Boolean
};
export const cardBasePropKeys = keysOf(cardBaseProps);
export const cardProps = Object.assign(Object.assign({}, useTheme.props), cardBaseProps);
export default defineComponent({
  name: 'Card',
  props: cardProps,
  slots: Object,
  setup(props) {
    const handleCloseClick = () => {
      const {
        onClose
      } = props;
      if (onClose) {
        call(onClose);
      }
    };
    const {
      inlineThemeDisabled,
      mergedClsPrefixRef,
      mergedRtlRef,
      mergedComponentPropsRef
    } = useConfig(props);
    const themeRef = useTheme('Card', '-card', style, cardLight, props, mergedClsPrefixRef);
    const rtlEnabledRef = useRtl('Card', mergedRtlRef, mergedClsPrefixRef);
    const mergedSizeRef = computed(() => {
      var _a, _b;
      return props.size || ((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Card) === null || _b === void 0 ? void 0 : _b.size) || 'medium';
    });
    const cssVarsRef = computed(() => {
      const mergedSize = mergedSizeRef.value;
      const {
        self: {
          color,
          colorModal,
          colorTarget,
          textColor,
          titleTextColor,
          titleFontWeight,
          borderColor,
          actionColor,
          borderRadius,
          lineHeight,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed,
          closeColorHover,
          closeColorPressed,
          closeBorderRadius,
          closeIconSize,
          closeSize,
          boxShadow,
          colorPopover,
          colorEmbedded,
          colorEmbeddedModal,
          colorEmbeddedPopover,
          [createKey('padding', mergedSize)]: padding,
          [createKey('fontSize', mergedSize)]: fontSize,
          [createKey('titleFontSize', mergedSize)]: titleFontSize
        },
        common: {
          cubicBezierEaseInOut
        }
      } = themeRef.value;
      const {
        top: paddingTop,
        left: paddingLeft,
        bottom: paddingBottom
      } = getPadding(padding);
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-border-radius': borderRadius,
        '--n-color': color,
        '--n-color-modal': colorModal,
        '--n-color-popover': colorPopover,
        '--n-color-embedded': colorEmbedded,
        '--n-color-embedded-modal': colorEmbeddedModal,
        '--n-color-embedded-popover': colorEmbeddedPopover,
        '--n-color-target': colorTarget,
        '--n-text-color': textColor,
        '--n-line-height': lineHeight,
        '--n-action-color': actionColor,
        '--n-title-text-color': titleTextColor,
        '--n-title-font-weight': titleFontWeight,
        '--n-close-icon-color': closeIconColor,
        '--n-close-icon-color-hover': closeIconColorHover,
        '--n-close-icon-color-pressed': closeIconColorPressed,
        '--n-close-color-hover': closeColorHover,
        '--n-close-color-pressed': closeColorPressed,
        '--n-border-color': borderColor,
        '--n-box-shadow': boxShadow,
        // size
        '--n-padding-top': paddingTop,
        '--n-padding-bottom': paddingBottom,
        '--n-padding-left': paddingLeft,
        '--n-font-size': fontSize,
        '--n-title-font-size': titleFontSize,
        '--n-close-size': closeSize,
        '--n-close-icon-size': closeIconSize,
        '--n-close-border-radius': closeBorderRadius
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('card', computed(() => {
      return mergedSizeRef.value[0];
    }), cssVarsRef, props) : undefined;
    return {
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: themeRef,
      handleCloseClick,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    const {
      segmented,
      bordered,
      hoverable,
      mergedClsPrefix,
      rtlEnabled,
      onRender,
      embedded,
      tag: Component,
      $slots
    } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    return h(Component, {
      class: [`${mergedClsPrefix}-card`, this.themeClass, embedded && `${mergedClsPrefix}-card--embedded`, {
        [`${mergedClsPrefix}-card--rtl`]: rtlEnabled,
        [`${mergedClsPrefix}-card--content-scrollable`]: this.contentScrollable,
        [`${mergedClsPrefix}-card--content${typeof segmented !== 'boolean' && segmented.content === 'soft' ? '-soft' : ''}-segmented`]: segmented === true || segmented !== false && segmented.content,
        [`${mergedClsPrefix}-card--footer${typeof segmented !== 'boolean' && segmented.footer === 'soft' ? '-soft' : ''}-segmented`]: segmented === true || segmented !== false && segmented.footer,
        [`${mergedClsPrefix}-card--action-segmented`]: segmented === true || segmented !== false && segmented.action,
        [`${mergedClsPrefix}-card--bordered`]: bordered,
        [`${mergedClsPrefix}-card--hoverable`]: hoverable
      }],
      style: this.cssVars,
      role: this.role
    }, resolveWrappedSlot($slots.cover, children => {
      const mergedChildren = this.cover ? ensureValidVNode([this.cover()]) : children;
      return mergedChildren && h("div", {
        class: `${mergedClsPrefix}-card-cover`,
        role: "none"
      }, mergedChildren);
    }), resolveWrappedSlot($slots.header, children => {
      const {
        title
      } = this;
      const mergedChildren = title ? ensureValidVNode(typeof title === 'function' ? [title()] : [title]) : children;
      return mergedChildren || this.closable ? h("div", {
        class: [`${mergedClsPrefix}-card-header`, this.headerClass],
        style: this.headerStyle,
        role: "heading"
      }, h("div", {
        class: `${mergedClsPrefix}-card-header__main`,
        role: "heading"
      }, mergedChildren), resolveWrappedSlot($slots['header-extra'], children => {
        const mergedChildren = this.headerExtra ? ensureValidVNode([this.headerExtra()]) : children;
        return mergedChildren && h("div", {
          class: [`${mergedClsPrefix}-card-header__extra`, this.headerExtraClass],
          style: this.headerExtraStyle
        }, mergedChildren);
      }), this.closable && h(NBaseClose, {
        clsPrefix: mergedClsPrefix,
        class: `${mergedClsPrefix}-card-header__close`,
        onClick: this.handleCloseClick,
        focusable: this.closeFocusable,
        absolute: true
      })) : null;
    }), resolveWrappedSlot($slots.default, children => {
      const {
        content
      } = this;
      const mergedChildren = content ? ensureValidVNode(typeof content === 'function' ? [content()] : [content]) : children;
      return mergedChildren ? this.contentScrollable ? h(NScrollbar, {
        class: `${mergedClsPrefix}-card__content-scrollbar`,
        contentClass: [`${mergedClsPrefix}-card-content`, this.contentClass],
        contentStyle: this.contentStyle
      }, mergedChildren) : h("div", {
        class: [`${mergedClsPrefix}-card-content`, this.contentClass],
        style: this.contentStyle,
        role: "none"
      }, mergedChildren) : null;
    }), resolveWrappedSlot($slots.footer, children => {
      const mergedChildren = this.footer ? ensureValidVNode([this.footer()]) : children;
      return mergedChildren && h("div", {
        class: [`${mergedClsPrefix}-card__footer`, this.footerClass],
        style: this.footerStyle,
        role: "none"
      }, mergedChildren);
    }), resolveWrappedSlot($slots.action, children => {
      const mergedChildren = this.action ? ensureValidVNode([this.action()]) : children;
      return mergedChildren && h("div", {
        class: `${mergedClsPrefix}-card__action`,
        role: "none"
      }, mergedChildren);
    }));
  }
});