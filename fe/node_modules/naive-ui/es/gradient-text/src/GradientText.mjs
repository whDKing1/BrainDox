import { computed, defineComponent, h } from 'vue';
import { useConfig, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { createKey, formatLength, useHoudini } from "../../_utils/index.mjs";
import { gradientTextLight } from "../styles/index.mjs";
import style from "./styles/index.cssr.mjs";
export const gradientTextProps = Object.assign(Object.assign({}, useTheme.props), {
  size: [String, Number],
  fontSize: [String, Number],
  type: {
    type: String,
    default: 'primary'
  },
  color: [Object, String],
  gradient: [Object, String]
});
export default defineComponent({
  name: 'GradientText',
  props: gradientTextProps,
  setup(props) {
    useHoudini();
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled
    } = useConfig(props);
    const compatibleTypeRef = computed(() => {
      const {
        type
      } = props;
      if (type === 'danger') return 'error';
      return type;
    });
    const styleFontSizeRef = computed(() => {
      let fontSize = props.size || props.fontSize;
      if (fontSize) fontSize = formatLength(fontSize);
      return fontSize || undefined;
    });
    const styleBgImageRef = computed(() => {
      const gradient = props.color || props.gradient;
      if (typeof gradient === 'string') {
        return gradient;
      } else if (gradient) {
        const deg = gradient.deg || 0;
        const from = gradient.from;
        const to = gradient.to;
        return `linear-gradient(${deg}deg, ${from} 0%, ${to} 100%)`;
      }
      return undefined;
    });
    const themeRef = useTheme('GradientText', '-gradient-text', style, gradientTextLight, props, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        value: type
      } = compatibleTypeRef;
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: {
          rotate,
          [createKey('colorStart', type)]: colorStart,
          [createKey('colorEnd', type)]: colorEnd,
          fontWeight
        }
      } = themeRef.value;
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-rotate': rotate,
        '--n-color-start': colorStart,
        '--n-color-end': colorEnd,
        '--n-font-weight': fontWeight
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('gradient-text', computed(() => compatibleTypeRef.value[0]), cssVarsRef, props) : undefined;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      compatibleType: compatibleTypeRef,
      styleFontSize: styleFontSizeRef,
      styleBgImage: styleBgImageRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    const {
      mergedClsPrefix,
      onRender
    } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    return h("span", {
      class: [`${mergedClsPrefix}-gradient-text`, `${mergedClsPrefix}-gradient-text--${this.compatibleType}-type`, this.themeClass],
      style: [{
        fontSize: this.styleFontSize,
        backgroundImage: this.styleBgImage
      }, this.cssVars]
    }, this.$slots);
  }
});