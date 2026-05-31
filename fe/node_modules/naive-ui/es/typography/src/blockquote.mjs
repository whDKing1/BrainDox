import { computed, defineComponent, h } from 'vue';
import { useConfig, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { typographyLight } from "../styles/index.mjs";
import style from "./styles/blockquote.cssr.mjs";
export const blockquoteProps = Object.assign(Object.assign({}, useTheme.props), {
  alignText: Boolean
});
export default defineComponent({
  name: 'Blockquote',
  props: blockquoteProps,
  setup(props) {
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled
    } = useConfig(props);
    const themeRef = useTheme('Typography', '-blockquote', style, typographyLight, props, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: {
          blockquoteTextColor,
          blockquotePrefixColor,
          blockquoteLineHeight,
          blockquoteFontSize
        }
      } = themeRef.value;
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-font-size': blockquoteFontSize,
        '--n-line-height': blockquoteLineHeight,
        '--n-prefix-color': blockquotePrefixColor,
        '--n-text-color': blockquoteTextColor
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('blockquote', undefined, cssVarsRef, props) : undefined;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
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
    return h("blockquote", {
      class: [`${mergedClsPrefix}-blockquote`, this.themeClass, this.alignText && `${mergedClsPrefix}-blockquote--align-text`],
      style: this.cssVars
    }, this.$slots);
  }
});