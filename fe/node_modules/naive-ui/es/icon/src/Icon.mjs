import { computed, defineComponent, h, mergeProps } from 'vue';
import { useConfig, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { formatLength, warn } from "../../_utils/index.mjs";
import { iconLight } from "../styles/index.mjs";
import style from "./styles/index.cssr.mjs";
export const iconProps = Object.assign(Object.assign({}, useTheme.props), {
  depth: [String, Number],
  size: [Number, String],
  color: String,
  component: [Object, Function]
});
export const NIcon = defineComponent({
  _n_icon__: true,
  name: 'Icon',
  inheritAttrs: false,
  props: iconProps,
  setup(props) {
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled
    } = useConfig(props);
    const themeRef = useTheme('Icon', '-icon', style, iconLight, props, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        depth
      } = props;
      const {
        common: {
          cubicBezierEaseInOut
        },
        self
      } = themeRef.value;
      if (depth !== undefined) {
        const {
          color,
          [`opacity${depth}Depth`]: opacity
        } = self;
        return {
          '--n-bezier': cubicBezierEaseInOut,
          '--n-color': color,
          '--n-opacity': opacity
        };
      }
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-color': '',
        '--n-opacity': ''
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('icon', computed(() => `${props.depth || 'd'}`), cssVarsRef, props) : undefined;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedStyle: computed(() => {
        const {
          size,
          color
        } = props;
        return {
          fontSize: formatLength(size),
          color
        };
      }),
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    var _a;
    const {
      $parent,
      depth,
      mergedClsPrefix,
      component,
      onRender,
      themeClass
    } = this;
    if ((_a = $parent === null || $parent === void 0 ? void 0 : $parent.$options) === null || _a === void 0 ? void 0 : _a._n_icon__) {
      warn('icon', 'don\'t wrap `n-icon` inside `n-icon`');
    }
    onRender === null || onRender === void 0 ? void 0 : onRender();
    return h('i', mergeProps(this.$attrs, {
      role: 'img',
      class: [`${mergedClsPrefix}-icon`, themeClass, {
        [`${mergedClsPrefix}-icon--depth`]: depth,
        [`${mergedClsPrefix}-icon--color-transition`]: depth !== undefined
      }],
      style: [this.cssVars, this.mergedStyle]
    }), component ? h(component) : this.$slots);
  }
});