import { computed, defineComponent, h } from 'vue';
import { useConfig, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { typographyLight } from "../styles/index.mjs";
import style from "./styles/p.cssr.mjs";
export const pProps = Object.assign(Object.assign({}, useTheme.props), {
  depth: [String, Number]
});
export default defineComponent({
  name: 'P',
  props: pProps,
  setup(props) {
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled
    } = useConfig(props);
    const themeRef = useTheme('Typography', '-p', style, typographyLight, props, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        depth
      } = props;
      const typeSafeDepth = depth || '1';
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: {
          pFontSize,
          pLineHeight,
          pMargin,
          pTextColor,
          [`pTextColor${typeSafeDepth}Depth`]: depthTextColor
        }
      } = themeRef.value;
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-font-size': pFontSize,
        '--n-line-height': pLineHeight,
        '--n-margin': pMargin,
        '--n-text-color': depth === undefined ? pTextColor : depthTextColor
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('p', computed(() => `${props.depth || ''}`), cssVarsRef, props) : undefined;
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
    return h("p", {
      class: [`${this.mergedClsPrefix}-p`, this.themeClass],
      style: this.cssVars
    }, this.$slots);
  }
});