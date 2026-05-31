import { computed, defineComponent, h } from 'vue';
import { useConfig, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { layoutLight } from "../styles/index.mjs";
import { positionProp } from "./interface.mjs";
import style from "./styles/layout-header.cssr.mjs";
export const headerProps = {
  position: positionProp,
  inverted: Boolean,
  bordered: {
    type: Boolean,
    default: false
  }
};
export default defineComponent({
  name: 'LayoutHeader',
  props: Object.assign(Object.assign({}, useTheme.props), headerProps),
  setup(props) {
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled
    } = useConfig(props);
    const themeRef = useTheme('Layout', '-layout-header', style, layoutLight, props, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        common: {
          cubicBezierEaseInOut
        },
        self
      } = themeRef.value;
      const vars = {
        '--n-bezier': cubicBezierEaseInOut
      };
      if (props.inverted) {
        vars['--n-color'] = self.headerColorInverted;
        vars['--n-text-color'] = self.textColorInverted;
        vars['--n-border-color'] = self.headerBorderColorInverted;
      } else {
        vars['--n-color'] = self.headerColor;
        vars['--n-text-color'] = self.textColor;
        vars['--n-border-color'] = self.headerBorderColor;
      }
      return vars;
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('layout-header', computed(() => props.inverted ? 'a' : 'b'), cssVarsRef, props) : undefined;
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
    return h("div", {
      class: [`${mergedClsPrefix}-layout-header`, this.themeClass, this.position && `${mergedClsPrefix}-layout-header--${this.position}-positioned`, this.bordered && `${mergedClsPrefix}-layout-header--bordered`],
      style: this.cssVars
    }, this.$slots);
  }
});