import { computed, defineComponent, h } from 'vue';
import { NBaseIcon } from "../../_internal/index.mjs";
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from "../../_internal/icons/index.mjs";
import { useConfig, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { createKey } from "../../_utils/index.mjs";
import { resultLight } from "../styles/index.mjs";
import { render403 } from "./403.mjs";
import { render404 } from "./404.mjs";
import { render418 } from "./418.mjs";
import { render500 } from "./500.mjs";
import style from "./styles/index.cssr.mjs";
const iconRenderMap = {
  403: render403,
  404: render404,
  418: render418,
  500: render500,
  info: () => h(InfoIcon, null),
  success: () => h(SuccessIcon, null),
  warning: () => h(WarningIcon, null),
  error: () => h(ErrorIcon, null)
};
export const resultProps = Object.assign(Object.assign({}, useTheme.props), {
  size: String,
  status: {
    type: String,
    default: 'info'
  },
  title: String,
  description: String
});
export default defineComponent({
  name: 'Result',
  props: resultProps,
  slots: Object,
  setup(props) {
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled,
      mergedComponentPropsRef
    } = useConfig(props);
    const mergedSizeRef = computed(() => {
      var _a, _b;
      return props.size || ((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Result) === null || _b === void 0 ? void 0 : _b.size) || 'medium';
    });
    const themeRef = useTheme('Result', '-result', style, resultLight, props, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        status
      } = props;
      const size = mergedSizeRef.value;
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: {
          textColor,
          lineHeight,
          titleTextColor,
          titleFontWeight,
          [createKey('iconColor', status)]: iconColor,
          [createKey('fontSize', size)]: fontSize,
          [createKey('titleFontSize', size)]: titleFontSize,
          [createKey('iconSize', size)]: iconSize
        }
      } = themeRef.value;
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-font-size': fontSize,
        '--n-icon-size': iconSize,
        '--n-line-height': lineHeight,
        '--n-text-color': textColor,
        '--n-title-font-size': titleFontSize,
        '--n-title-font-weight': titleFontWeight,
        '--n-title-text-color': titleTextColor,
        '--n-icon-color': iconColor || ''
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('result', computed(() => {
      const {
        status
      } = props;
      const size = mergedSizeRef.value;
      let hash = '';
      if (size) {
        hash += size[0];
      }
      if (status) {
        hash += status[0];
      }
      return hash;
    }), cssVarsRef, props) : undefined;
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
      status,
      $slots,
      mergedClsPrefix,
      onRender
    } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    return h("div", {
      class: [`${mergedClsPrefix}-result`, this.themeClass],
      style: this.cssVars
    }, h("div", {
      class: `${mergedClsPrefix}-result-icon`
    }, ((_a = $slots.icon) === null || _a === void 0 ? void 0 : _a.call($slots)) || h(NBaseIcon, {
      clsPrefix: mergedClsPrefix
    }, {
      default: () => iconRenderMap[status]()
    })), h("div", {
      class: `${mergedClsPrefix}-result-header`
    }, this.title ? h("div", {
      class: `${mergedClsPrefix}-result-header__title`
    }, this.title) : null, this.description ? h("div", {
      class: `${mergedClsPrefix}-result-header__description`
    }, this.description) : null), $slots.default && h("div", {
      class: `${mergedClsPrefix}-result-content`
    }, $slots), $slots.footer && h("div", {
      class: `${mergedClsPrefix}-result-footer`
    }, $slots.footer()));
  }
});