import { computed, defineComponent, h, provide, toRef } from 'vue';
import { useConfig, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { createInjectionKey, formatLength } from "../../_utils/index.mjs";
import floatButtonGroupLight from "../styles/light.mjs";
import style from "./styles/index.cssr.mjs";
export const floatButtonGroupProps = Object.assign(Object.assign({}, useTheme.props), {
  left: [Number, String],
  right: [Number, String],
  top: [Number, String],
  bottom: [Number, String],
  shape: {
    type: String,
    default: 'circle'
  },
  position: {
    type: String,
    default: 'fixed'
  }
});
export const floatButtonGroupInjectionKey = createInjectionKey('n-float-button-group');
export default defineComponent({
  name: 'FloatButtonGroup',
  props: floatButtonGroupProps,
  setup(props) {
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled
    } = useConfig(props);
    const themeRef = useTheme('FloatButtonGroup', '-float-button-group', style, floatButtonGroupLight, props, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        self: {
          color,
          boxShadow,
          buttonBorderColor,
          borderRadiusSquare
        },
        common: {
          cubicBezierEaseInOut
        }
      } = themeRef.value;
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-box-shadow': boxShadow,
        '--n-color': color,
        '--n-button-border-color': buttonBorderColor,
        '--n-border-radius-square': borderRadiusSquare,
        position: props.position,
        left: formatLength(props.left) || '',
        right: formatLength(props.right) || '',
        top: formatLength(props.top) || '',
        bottom: formatLength(props.bottom) || ''
      };
    });
    provide(floatButtonGroupInjectionKey, {
      shapeRef: toRef(props, 'shape')
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('float-button', undefined, cssVarsRef, props) : undefined;
    return {
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      mergedClsPrefix: mergedClsPrefixRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    const {
      mergedClsPrefix,
      cssVars,
      shape
    } = this;
    return h("div", {
      class: [`${mergedClsPrefix}-float-button-group`, `${mergedClsPrefix}-float-button-group--${shape}-shape`],
      style: cssVars,
      role: "group"
    }, this.$slots);
  }
});