import { computed, defineComponent, h, mergeProps, watchEffect } from 'vue';
import { NFadeInExpandTransition } from "../../_internal/index.mjs";
import { useConfig, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { useRtl } from "../../_mixins/use-rtl.mjs";
import { warnOnce } from "../../_utils/index.mjs";
import { collapseTransitionLight } from "../styles/index.mjs";
import style from "./styles/index.cssr.mjs";
export const collapseTransitionProps = Object.assign(Object.assign({}, useTheme.props), {
  show: {
    type: Boolean,
    default: true
  },
  appear: Boolean,
  // The collapsed is implemented with mistake, collapsed=true would make it show
  // However there's no possibility to change so I just let it deprecated and use
  // `show` prop instead.
  /** @deprecated */
  collapsed: {
    type: Boolean,
    default: undefined
  }
});
export default defineComponent({
  name: 'CollapseTransition',
  props: collapseTransitionProps,
  inheritAttrs: false,
  setup(props) {
    if (process.env.NODE_ENV !== 'production') {
      watchEffect(() => {
        if (props.collapsed !== undefined) {
          warnOnce('collapse-transition', '`collapsed` is deprecated, please use `show` instead');
        }
      });
    }
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled,
      mergedRtlRef
    } = useConfig(props);
    const mergedThemeRef = useTheme('CollapseTransition', '-collapse-transition', style, collapseTransitionLight, props, mergedClsPrefixRef);
    const rtlEnabledRef = useRtl('CollapseTransition', mergedRtlRef, mergedClsPrefixRef);
    const mergedShowRef = computed(() => {
      if (props.collapsed !== undefined) {
        // No mistake, it's implemented with error at first, just keep it here
        return props.collapsed;
      }
      return props.show;
    });
    const cssVarsRef = computed(() => {
      const {
        self: {
          bezier
        }
      } = mergedThemeRef.value;
      return {
        '--n-bezier': bezier
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('collapse-transition', undefined, cssVarsRef, props) : undefined;
    return {
      rtlEnabled: rtlEnabledRef,
      mergedShow: mergedShowRef,
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    return h(NFadeInExpandTransition, {
      appear: this.appear
    }, {
      default: () => {
        var _a;
        if (!this.mergedShow) return;
        (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
        return h('div',
        // Don't use jsx since it would cause useless spread in each rendering
        mergeProps({
          class: [`${this.mergedClsPrefix}-collapse-transition`, this.rtlEnabled && `${this.mergedClsPrefix}-collapse-transition--rtl`, this.themeClass],
          style: this.cssVars
        }, this.$attrs), this.$slots);
      }
    });
  }
});