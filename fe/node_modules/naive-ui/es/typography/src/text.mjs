import { useCompitable } from 'vooks';
import { computed, defineComponent, h } from 'vue';
import { useConfig, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { createKey, warn } from "../../_utils/index.mjs";
import { typographyLight } from "../styles/index.mjs";
import style from "./styles/text.cssr.mjs";
export const textProps = Object.assign(Object.assign({}, useTheme.props), {
  code: Boolean,
  type: {
    type: String,
    default: 'default'
  },
  delete: Boolean,
  strong: Boolean,
  italic: Boolean,
  underline: Boolean,
  depth: [String, Number],
  tag: String,
  // deprecated
  as: {
    type: String,
    validator: () => {
      if (process.env.NODE_ENV !== 'production') {
        warn('text', '`as` is deprecated, please use `tag` instead.');
      }
      return true;
    },
    default: undefined
  }
});
export default defineComponent({
  name: 'Text',
  props: textProps,
  setup(props) {
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled
    } = useConfig(props);
    const themeRef = useTheme('Typography', '-text', style, typographyLight, props, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        depth,
        type
      } = props;
      const textColorKey = type === 'default' ? depth === undefined ? 'textColor' : `textColor${depth}Depth` : createKey('textColor', type);
      const {
        common: {
          fontWeightStrong,
          fontFamilyMono,
          cubicBezierEaseInOut
        },
        self: {
          codeTextColor,
          codeBorderRadius,
          codeColor,
          codeBorder,
          [textColorKey]: textColor
        }
      } = themeRef.value;
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-text-color': textColor,
        '--n-font-weight-strong': fontWeightStrong,
        '--n-font-famliy-mono': fontFamilyMono,
        '--n-code-border-radius': codeBorderRadius,
        '--n-code-text-color': codeTextColor,
        '--n-code-color': codeColor,
        '--n-code-border': codeBorder
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('text', computed(() => `${props.type[0]}${props.depth || ''}`), cssVarsRef, props) : undefined;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      compitableTag: useCompitable(props, ['as', 'tag']),
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
    const textClass = [`${mergedClsPrefix}-text`, this.themeClass, {
      [`${mergedClsPrefix}-text--code`]: this.code,
      [`${mergedClsPrefix}-text--delete`]: this.delete,
      [`${mergedClsPrefix}-text--strong`]: this.strong,
      [`${mergedClsPrefix}-text--italic`]: this.italic,
      [`${mergedClsPrefix}-text--underline`]: this.underline
    }];
    const children = (_c = (_b = this.$slots).default) === null || _c === void 0 ? void 0 : _c.call(_b);
    return this.code ? h("code", {
      class: textClass,
      style: this.cssVars
    }, this.delete ? h("del", null, children) : children) : this.delete ? h("del", {
      class: textClass,
      style: this.cssVars
    }, children) : h(this.compitableTag || 'span', {
      class: textClass,
      style: this.cssVars
    }, children);
  }
});