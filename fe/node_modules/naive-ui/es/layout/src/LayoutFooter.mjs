import { computed, defineComponent, h } from 'vue';
import { useConfig, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { layoutLight } from "../styles/index.mjs";
import { positionProp } from "./interface.mjs";
import style from "./styles/layout-footer.cssr.mjs";
export const layoutFooterProps = Object.assign(Object.assign({}, useTheme.props), {
  inverted: Boolean,
  position: positionProp,
  bordered: Boolean
});
export default defineComponent({
  name: 'LayoutFooter',
  props: layoutFooterProps,
  setup(props) {
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled
    } = useConfig(props);
    const themeRef = useTheme('Layout', '-layout-footer', style, layoutLight, props, mergedClsPrefixRef);
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
        vars['--n-color'] = self.footerColorInverted;
        vars['--n-text-color'] = self.textColorInverted;
        vars['--n-border-color'] = self.footerBorderColorInverted;
      } else {
        vars['--n-color'] = self.footerColor;
        vars['--n-text-color'] = self.textColor;
        vars['--n-border-color'] = self.footerBorderColor;
      }
      return vars;
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('layout-footer', computed(() => props.inverted ? 'a' : 'b'), cssVarsRef, props) : undefined;
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
      class: [`${mergedClsPrefix}-layout-footer`, this.themeClass, this.position && `${mergedClsPrefix}-layout-footer--${this.position}-positioned`, this.bordered && `${mergedClsPrefix}-layout-footer--bordered`],
      style: this.cssVars
    }, this.$slots);
  }
});