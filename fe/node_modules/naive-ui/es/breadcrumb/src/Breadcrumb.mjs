import { computed, defineComponent, h, provide, toRef } from 'vue';
import { useConfig, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { createInjectionKey } from "../../_utils/index.mjs";
import { breadcrumbLight } from "../styles/index.mjs";
import style from "./styles/index.cssr.mjs";
export const breadcrumbInjectionKey = createInjectionKey('n-breadcrumb');
export const breadcrumbProps = Object.assign(Object.assign({}, useTheme.props), {
  separator: {
    type: String,
    default: '/'
  }
});
export default defineComponent({
  name: 'Breadcrumb',
  props: breadcrumbProps,
  setup(props) {
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled
    } = useConfig(props);
    const themeRef = useTheme('Breadcrumb', '-breadcrumb', style, breadcrumbLight, props, mergedClsPrefixRef);
    provide(breadcrumbInjectionKey, {
      separatorRef: toRef(props, 'separator'),
      mergedClsPrefixRef
    });
    const cssVarsRef = computed(() => {
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: {
          separatorColor,
          itemTextColor,
          itemTextColorHover,
          itemTextColorPressed,
          itemTextColorActive,
          fontSize,
          fontWeightActive,
          itemBorderRadius,
          itemColorHover,
          itemColorPressed,
          itemLineHeight
        }
      } = themeRef.value;
      return {
        '--n-font-size': fontSize,
        '--n-bezier': cubicBezierEaseInOut,
        '--n-item-text-color': itemTextColor,
        '--n-item-text-color-hover': itemTextColorHover,
        '--n-item-text-color-pressed': itemTextColorPressed,
        '--n-item-text-color-active': itemTextColorActive,
        '--n-separator-color': separatorColor,
        '--n-item-color-hover': itemColorHover,
        '--n-item-color-pressed': itemColorPressed,
        '--n-item-border-radius': itemBorderRadius,
        '--n-font-weight-active': fontWeightActive,
        '--n-item-line-height': itemLineHeight
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('breadcrumb', undefined, cssVarsRef, props) : undefined;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    var _a;
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    return h("nav", {
      class: [`${this.mergedClsPrefix}-breadcrumb`, this.themeClass],
      style: this.cssVars,
      "aria-label": "Breadcrumb"
    }, h("ul", null, this.$slots));
  }
});