import { computed, defineComponent, h } from 'vue';
import { NBaseIcon } from "../../_internal/icon/index.mjs";
import { EmptyIcon } from "../../_internal/icons/index.mjs";
import { useConfig, useLocale, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { createKey } from "../../_utils/index.mjs";
import { emptyLight } from "../styles/index.mjs";
import style from "./styles/index.cssr.mjs";
export const emptyProps = Object.assign(Object.assign({}, useTheme.props), {
  description: String,
  showDescription: {
    type: Boolean,
    default: true
  },
  showIcon: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: 'medium'
  },
  renderIcon: Function
});
export default defineComponent({
  name: 'Empty',
  props: emptyProps,
  slots: Object,
  setup(props) {
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled,
      mergedComponentPropsRef
    } = useConfig(props);
    const themeRef = useTheme('Empty', '-empty', style, emptyLight, props, mergedClsPrefixRef);
    const {
      localeRef
    } = useLocale('Empty');
    const mergedDescriptionRef = computed(() => {
      var _a, _b, _c;
      return (_a = props.description) !== null && _a !== void 0 ? _a : (_c = (_b = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _b === void 0 ? void 0 : _b.Empty) === null || _c === void 0 ? void 0 : _c.description;
    });
    const mergedRenderIconRef = computed(() => {
      var _a, _b;
      return ((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Empty) === null || _b === void 0 ? void 0 : _b.renderIcon) || (() => h(EmptyIcon, null));
    });
    const cssVarsRef = computed(() => {
      const {
        size
      } = props;
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: {
          [createKey('iconSize', size)]: iconSize,
          [createKey('fontSize', size)]: fontSize,
          textColor,
          iconColor,
          extraTextColor
        }
      } = themeRef.value;
      return {
        '--n-icon-size': iconSize,
        '--n-font-size': fontSize,
        '--n-bezier': cubicBezierEaseInOut,
        '--n-text-color': textColor,
        '--n-icon-color': iconColor,
        '--n-extra-text-color': extraTextColor
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('empty', computed(() => {
      let hash = '';
      const {
        size
      } = props;
      hash += size[0];
      return hash;
    }), cssVarsRef, props) : undefined;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedRenderIcon: mergedRenderIconRef,
      localizedDescription: computed(() => {
        return mergedDescriptionRef.value || localeRef.value.description;
      }),
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    const {
      $slots,
      mergedClsPrefix,
      onRender
    } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    return h("div", {
      class: [`${mergedClsPrefix}-empty`, this.themeClass],
      style: this.cssVars
    }, this.showIcon ? h("div", {
      class: `${mergedClsPrefix}-empty__icon`
    }, $slots.icon ? $slots.icon() : h(NBaseIcon, {
      clsPrefix: mergedClsPrefix
    }, {
      default: this.mergedRenderIcon
    })) : null, this.showDescription ? h("div", {
      class: `${mergedClsPrefix}-empty__description`
    }, $slots.default ? $slots.default() : this.localizedDescription) : null, $slots.extra ? h("div", {
      class: `${mergedClsPrefix}-empty__extra`
    }, $slots.extra()) : null);
  }
});