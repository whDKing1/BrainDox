import { computed, defineComponent, Fragment, h } from 'vue';
import { useConfig, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { dividerLight } from "../styles/index.mjs";
import style from "./styles/index.cssr.mjs";
export const dividerProps = Object.assign(Object.assign({}, useTheme.props), {
  titlePlacement: {
    type: String,
    default: 'center'
  },
  dashed: Boolean,
  vertical: Boolean
});
export default defineComponent({
  name: 'Divider',
  props: dividerProps,
  setup(props) {
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled
    } = useConfig(props);
    const themeRef = useTheme('Divider', '-divider', style, dividerLight, props, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: {
          color,
          textColor,
          fontWeight
        }
      } = themeRef.value;
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-color': color,
        '--n-text-color': textColor,
        '--n-font-weight': fontWeight
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('divider', undefined, cssVarsRef, props) : undefined;
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
      $slots,
      titlePlacement,
      vertical,
      dashed,
      cssVars,
      mergedClsPrefix
    } = this;
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    return h("div", {
      role: "separator",
      class: [`${mergedClsPrefix}-divider`, this.themeClass, {
        [`${mergedClsPrefix}-divider--vertical`]: vertical,
        [`${mergedClsPrefix}-divider--no-title`]: !$slots.default,
        [`${mergedClsPrefix}-divider--dashed`]: dashed,
        [`${mergedClsPrefix}-divider--title-position-${titlePlacement}`]: $slots.default && titlePlacement
      }],
      style: cssVars
    }, !vertical ? h("div", {
      class: `${mergedClsPrefix}-divider__line ${mergedClsPrefix}-divider__line--left`
    }) : null, !vertical && $slots.default ? h(Fragment, null, h("div", {
      class: `${mergedClsPrefix}-divider__title`
    }, this.$slots), h("div", {
      class: `${mergedClsPrefix}-divider__line ${mergedClsPrefix}-divider__line--right`
    })) : null);
  }
});