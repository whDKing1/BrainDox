import { computed, defineComponent, h } from 'vue';
import { useConfig, useRtl, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { resolveWrappedSlot } from "../../_utils/index.mjs";
import { statisticLight } from "../styles/index.mjs";
import style from "./styles/index.cssr.mjs";
export const statisticProps = Object.assign(Object.assign({}, useTheme.props), {
  tabularNums: Boolean,
  label: String,
  value: [String, Number]
});
export default defineComponent({
  name: 'Statistic',
  props: statisticProps,
  slots: Object,
  setup(props) {
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled,
      mergedRtlRef
    } = useConfig(props);
    const themeRef = useTheme('Statistic', '-statistic', style, statisticLight, props, mergedClsPrefixRef);
    const rtlEnabledRef = useRtl('Statistic', mergedRtlRef, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        self: {
          labelFontWeight,
          valueFontSize,
          valueFontWeight,
          valuePrefixTextColor,
          labelTextColor,
          valueSuffixTextColor,
          valueTextColor,
          labelFontSize
        },
        common: {
          cubicBezierEaseInOut
        }
      } = themeRef.value;
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-label-font-size': labelFontSize,
        '--n-label-font-weight': labelFontWeight,
        '--n-label-text-color': labelTextColor,
        '--n-value-font-weight': valueFontWeight,
        '--n-value-font-size': valueFontSize,
        '--n-value-prefix-text-color': valuePrefixTextColor,
        '--n-value-suffix-text-color': valueSuffixTextColor,
        '--n-value-text-color': valueTextColor
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('statistic', undefined, cssVarsRef, props) : undefined;
    return {
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    var _a;
    const {
      mergedClsPrefix,
      $slots: {
        default: defaultSlot,
        label: labelSlot,
        prefix: prefixSlot,
        suffix: suffixSlot
      }
    } = this;
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    return h("div", {
      class: [`${mergedClsPrefix}-statistic`, this.themeClass, this.rtlEnabled && `${mergedClsPrefix}-statistic--rtl`],
      style: this.cssVars
    }, resolveWrappedSlot(labelSlot, children => h("div", {
      class: `${mergedClsPrefix}-statistic__label`
    }, this.label || children)), h("div", {
      class: `${mergedClsPrefix}-statistic-value`,
      style: {
        fontVariantNumeric: this.tabularNums ? 'tabular-nums' : ''
      }
    }, resolveWrappedSlot(prefixSlot, children => children && h("span", {
      class: `${mergedClsPrefix}-statistic-value__prefix`
    }, children)), this.value !== undefined ? h("span", {
      class: `${mergedClsPrefix}-statistic-value__content`
    }, this.value) : resolveWrappedSlot(defaultSlot, children => children && h("span", {
      class: `${mergedClsPrefix}-statistic-value__content`
    }, children)), resolveWrappedSlot(suffixSlot, children => children && h("span", {
      class: `${mergedClsPrefix}-statistic-value__suffix`
    }, children))));
  }
});