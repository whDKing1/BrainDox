import { computed, defineComponent, h } from 'vue';
import { useConfig, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { formatLength } from "../../_utils/index.mjs";
import { iconWrapperLight } from "../styles/index.mjs";
import style from "./styles/index.cssr.mjs";
export const iconWrapperProps = Object.assign(Object.assign({}, useTheme.props), {
  size: {
    type: Number,
    default: 24
  },
  borderRadius: {
    type: Number,
    default: 6
  },
  color: String,
  iconColor: String
});
export const NIconWrapper = defineComponent({
  name: 'IconWrapper',
  props: iconWrapperProps,
  setup(props, {
    slots
  }) {
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled
    } = useConfig(props);
    const themeRef = useTheme('IconWrapper', '-icon-wrapper', style, iconWrapperLight, props, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: {
          color,
          iconColor
        }
      } = themeRef.value;
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-color': color,
        '--n-icon-color': iconColor
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('icon-wrapper', undefined, cssVarsRef, props) : undefined;
    return () => {
      const size = formatLength(props.size);
      themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender();
      return h("div", {
        class: [`${mergedClsPrefixRef.value}-icon-wrapper`, themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass.value],
        style: [cssVarsRef === null || cssVarsRef === void 0 ? void 0 : cssVarsRef.value, {
          height: size,
          width: size,
          borderRadius: formatLength(props.borderRadius),
          backgroundColor: props.color,
          color: props.iconColor
        }]
      }, slots);
    };
  }
});