import { computed, defineComponent, h } from 'vue';
import { useConfig, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { typographyLight } from "../styles/index.mjs";
import style from "./styles/a.cssr.mjs";
export const aProps = Object.assign({}, useTheme.props);
export default defineComponent({
  name: 'A',
  props: aProps,
  setup(props) {
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled
    } = useConfig(props);
    const themeRef = useTheme('Typography', '-a', style, typographyLight, props, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: {
          aTextColor
        }
      } = themeRef.value;
      return {
        '--n-text-color': aTextColor,
        '--n-bezier': cubicBezierEaseInOut
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('a', undefined, cssVarsRef, props) : undefined;
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
    return h("a", {
      class: [`${this.mergedClsPrefix}-a`, this.themeClass],
      style: this.cssVars
    }, this.$slots);
  }
});