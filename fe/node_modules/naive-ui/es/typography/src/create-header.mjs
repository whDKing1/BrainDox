import { computed, defineComponent, h } from 'vue';
import { useConfig, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { createKey } from "../../_utils/index.mjs";
import { typographyLight } from "../styles/index.mjs";
import style from "./styles/header.cssr.mjs";
export const headerProps = Object.assign(Object.assign({}, useTheme.props), {
  type: {
    type: String,
    default: 'default'
  },
  prefix: String,
  alignText: Boolean
});
export default level => defineComponent({
  name: `H${level}`,
  props: headerProps,
  setup(props) {
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled
    } = useConfig(props);
    const themeRef = useTheme('Typography', '-h', style, typographyLight, props, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        type
      } = props;
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: {
          headerFontWeight,
          headerTextColor,
          [createKey('headerPrefixWidth', level)]: prefixWidth,
          [createKey('headerFontSize', level)]: fontSize,
          [createKey('headerMargin', level)]: margin,
          [createKey('headerBarWidth', level)]: barWidth,
          [createKey('headerBarColor', type)]: barColor
        }
      } = themeRef.value;
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-font-size': fontSize,
        '--n-margin': margin,
        '--n-bar-color': barColor,
        '--n-bar-width': barWidth,
        '--n-font-weight': headerFontWeight,
        '--n-text-color': headerTextColor,
        '--n-prefix-width': prefixWidth
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass(`h${level}`, computed(() => props.type[0]), cssVarsRef, props) : undefined;
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
      prefix,
      alignText,
      mergedClsPrefix,
      cssVars,
      $slots
    } = this;
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    return h(`h${level}`, {
      class: [`${mergedClsPrefix}-h`, `${mergedClsPrefix}-h${level}`, this.themeClass, {
        [`${mergedClsPrefix}-h--prefix-bar`]: prefix,
        [`${mergedClsPrefix}-h--align-text`]: alignText
      }],
      style: cssVars
    }, $slots);
  }
});