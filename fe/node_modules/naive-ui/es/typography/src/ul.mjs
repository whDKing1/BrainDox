import { computed, defineComponent, h } from 'vue';
import { useConfig, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { typographyLight } from "../styles/index.mjs";
import style from "./styles/list.cssr.mjs";
export const ulProps = Object.assign(Object.assign({}, useTheme.props), {
  alignText: Boolean
});
export default defineComponent({
  name: 'Ul',
  props: ulProps,
  setup(props) {
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled
    } = useConfig(props);
    const themeRef = useTheme('Typography', '-xl', style, typographyLight, props, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: {
          olPadding,
          ulPadding,
          liMargin,
          liTextColor,
          liLineHeight,
          liFontSize
        }
      } = themeRef.value;
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-font-size': liFontSize,
        '--n-line-height': liLineHeight,
        '--n-text-color': liTextColor,
        '--n-li-margin': liMargin,
        '--n-ol-padding': olPadding,
        '--n-ul-padding': ulPadding
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('ul', undefined, cssVarsRef, props) : undefined;
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
    return h("ul", {
      class: [`${mergedClsPrefix}-ul`, this.themeClass, this.alignText && `${mergedClsPrefix}-ul--align-text`],
      style: this.cssVars
    }, this.$slots);
  }
});