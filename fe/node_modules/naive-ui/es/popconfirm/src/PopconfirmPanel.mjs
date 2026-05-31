import { computed, defineComponent, h, inject, toRef } from 'vue';
import { NBaseIcon } from "../../_internal/index.mjs";
import { WarningIcon } from "../../_internal/icons/index.mjs";
import { useConfig, useLocale, useThemeClass } from "../../_mixins/index.mjs";
import { keysOf, resolveSlot, resolveWrappedSlot } from "../../_utils/index.mjs";
import { NButton } from "../../button/index.mjs";
import { popconfirmInjectionKey } from "./interface.mjs";
export const panelProps = {
  positiveText: String,
  negativeText: String,
  showIcon: {
    type: Boolean,
    default: true
  },
  onPositiveClick: {
    type: Function,
    required: true
  },
  onNegativeClick: {
    type: Function,
    required: true
  }
};
export const panelPropKeys = keysOf(panelProps);
export default defineComponent({
  name: 'NPopconfirmPanel',
  props: panelProps,
  setup(props) {
    const {
      localeRef
    } = useLocale('Popconfirm');
    const {
      inlineThemeDisabled
    } = useConfig();
    const {
      mergedClsPrefixRef,
      mergedThemeRef,
      props: popconfirmProps
    } = inject(popconfirmInjectionKey);
    const cssVarsRef = computed(() => {
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: {
          fontSize,
          iconSize,
          iconColor
        }
      } = mergedThemeRef.value;
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-font-size': fontSize,
        '--n-icon-size': iconSize,
        '--n-icon-color': iconColor
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('popconfirm-panel', undefined, cssVarsRef, popconfirmProps) : undefined;
    return Object.assign(Object.assign({}, useLocale('Popconfirm')), {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      localizedPositiveText: computed(() => {
        return props.positiveText || localeRef.value.positiveText;
      }),
      localizedNegativeText: computed(() => {
        return props.negativeText || localeRef.value.negativeText;
      }),
      positiveButtonProps: toRef(popconfirmProps, 'positiveButtonProps'),
      negativeButtonProps: toRef(popconfirmProps, 'negativeButtonProps'),
      handlePositiveClick(e) {
        props.onPositiveClick(e);
      },
      handleNegativeClick(e) {
        props.onNegativeClick(e);
      },
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    });
  },
  render() {
    var _a;
    const {
      mergedClsPrefix,
      showIcon,
      $slots
    } = this;
    const actionContentNode = resolveSlot($slots.action, () => this.negativeText === null && this.positiveText === null ? [] : [this.negativeText !== null && h(NButton, Object.assign({
      size: "small",
      onClick: this.handleNegativeClick
    }, this.negativeButtonProps), {
      default: () => this.localizedNegativeText
    }), this.positiveText !== null && h(NButton, Object.assign({
      size: "small",
      type: "primary",
      onClick: this.handlePositiveClick
    }, this.positiveButtonProps), {
      default: () => this.localizedPositiveText
    })]);
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    return h("div", {
      class: [`${mergedClsPrefix}-popconfirm__panel`, this.themeClass],
      style: this.cssVars
    }, resolveWrappedSlot($slots.default, children => showIcon || children ? h("div", {
      class: `${mergedClsPrefix}-popconfirm__body`
    }, showIcon ? h("div", {
      class: `${mergedClsPrefix}-popconfirm__icon`
    }, resolveSlot($slots.icon, () => [h(NBaseIcon, {
      clsPrefix: mergedClsPrefix
    }, {
      default: () => h(WarningIcon, null)
    })])) : null, children) : null), actionContentNode ? h("div", {
      class: [`${mergedClsPrefix}-popconfirm__action`]
    }, actionContentNode) : null);
  }
});