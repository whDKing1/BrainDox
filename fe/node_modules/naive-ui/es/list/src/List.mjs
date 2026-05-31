import { computed, defineComponent, h, provide, toRef } from 'vue';
import { useConfig, useRtl, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { createInjectionKey } from "../../_utils/index.mjs";
import { listLight } from "../styles/index.mjs";
import style from "./styles/index.cssr.mjs";
export const listProps = Object.assign(Object.assign({}, useTheme.props), {
  size: {
    type: String,
    default: 'medium'
  },
  bordered: Boolean,
  clickable: Boolean,
  hoverable: Boolean,
  showDivider: {
    type: Boolean,
    default: true
  }
});
export const listInjectionKey = createInjectionKey('n-list');
export default defineComponent({
  name: 'List',
  props: listProps,
  slots: Object,
  setup(props) {
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled,
      mergedRtlRef
    } = useConfig(props);
    const rtlEnabledRef = useRtl('List', mergedRtlRef, mergedClsPrefixRef);
    const themeRef = useTheme('List', '-list', style, listLight, props, mergedClsPrefixRef);
    provide(listInjectionKey, {
      showDividerRef: toRef(props, 'showDivider'),
      mergedClsPrefixRef
    });
    const cssVarsRef = computed(() => {
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: {
          fontSize,
          textColor,
          color,
          colorModal,
          colorPopover,
          borderColor,
          borderColorModal,
          borderColorPopover,
          borderRadius,
          colorHover,
          colorHoverModal,
          colorHoverPopover
        }
      } = themeRef.value;
      return {
        '--n-font-size': fontSize,
        '--n-bezier': cubicBezierEaseInOut,
        '--n-text-color': textColor,
        '--n-color': color,
        '--n-border-radius': borderRadius,
        '--n-border-color': borderColor,
        '--n-border-color-modal': borderColorModal,
        '--n-border-color-popover': borderColorPopover,
        '--n-color-modal': colorModal,
        '--n-color-popover': colorPopover,
        '--n-color-hover': colorHover,
        '--n-color-hover-modal': colorHoverModal,
        '--n-color-hover-popover': colorHoverPopover
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('list', undefined, cssVarsRef, props) : undefined;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      rtlEnabled: rtlEnabledRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    var _a;
    const {
      $slots,
      mergedClsPrefix,
      onRender
    } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    return h("ul", {
      class: [`${mergedClsPrefix}-list`, this.rtlEnabled && `${mergedClsPrefix}-list--rtl`, this.bordered && `${mergedClsPrefix}-list--bordered`, this.showDivider && `${mergedClsPrefix}-list--show-divider`, this.hoverable && `${mergedClsPrefix}-list--hoverable`, this.clickable && `${mergedClsPrefix}-list--clickable`, this.themeClass],
      style: this.cssVars
    }, $slots.header ? h("div", {
      class: `${mergedClsPrefix}-list__header`
    }, $slots.header()) : null, (_a = $slots.default) === null || _a === void 0 ? void 0 : _a.call($slots), $slots.footer ? h("div", {
      class: `${mergedClsPrefix}-list__footer`
    }, $slots.footer()) : null);
  }
});