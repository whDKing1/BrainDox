import { computed, defineComponent, h } from 'vue';
import { useConfig, useFormItem, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { createKey } from "../../_utils/index.mjs";
import { inputLight } from "../styles/index.mjs";
import style from "./styles/input-group-label.cssr.mjs";
export const inputGroupLabelProps = Object.assign(Object.assign({}, useTheme.props), {
  size: String,
  bordered: {
    type: Boolean,
    default: undefined
  }
});
export default defineComponent({
  name: 'InputGroupLabel',
  props: inputGroupLabelProps,
  setup(props) {
    const {
      mergedBorderedRef,
      mergedClsPrefixRef,
      inlineThemeDisabled,
      mergedComponentPropsRef
    } = useConfig(props);
    const themeRef = useTheme('Input', '-input-group-label', style, inputLight, props, mergedClsPrefixRef);
    const {
      mergedSizeRef
    } = useFormItem(props, {
      mergedSize(NFormItem) {
        var _a, _b;
        if (props.size !== undefined) return props.size;
        if (NFormItem) {
          return NFormItem.mergedSize.value;
        }
        const configSize = (_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Input) === null || _b === void 0 ? void 0 : _b.size;
        if (configSize) return configSize;
        return 'medium';
      }
    });
    const cssVarsRef = computed(() => {
      const {
        value: size
      } = mergedSizeRef;
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: {
          groupLabelColor,
          borderRadius,
          groupLabelTextColor,
          lineHeight,
          groupLabelBorder,
          [createKey('fontSize', size)]: fontSize,
          [createKey('height', size)]: height
        }
      } = themeRef.value;
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-group-label-color': groupLabelColor,
        '--n-group-label-border': groupLabelBorder,
        '--n-border-radius': borderRadius,
        '--n-group-label-text-color': groupLabelTextColor,
        '--n-font-size': fontSize,
        '--n-line-height': lineHeight,
        '--n-height': height
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('input-group-label', computed(() => mergedSizeRef.value[0]), cssVarsRef, props) : undefined;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedBordered: mergedBorderedRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    var _a, _b, _c;
    const {
      mergedClsPrefix
    } = this;
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    return h("div", {
      class: [`${mergedClsPrefix}-input-group-label`, this.themeClass],
      style: this.cssVars
    }, (_c = (_b = this.$slots).default) === null || _c === void 0 ? void 0 : _c.call(_b), this.mergedBordered ? h("div", {
      class: `${mergedClsPrefix}-input-group-label__border`
    }) : null);
  }
});