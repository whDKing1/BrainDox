import { computed, defineComponent, Fragment, h } from 'vue';
import { useConfig, useRtl, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { thingLight } from "../styles/index.mjs";
import style from "./styles/index.cssr.mjs";
export const thingProps = Object.assign(Object.assign({}, useTheme.props), {
  title: String,
  titleExtra: String,
  description: String,
  descriptionClass: String,
  descriptionStyle: [String, Object],
  content: String,
  contentClass: String,
  contentStyle: [String, Object],
  contentIndented: Boolean
});
export default defineComponent({
  name: 'Thing',
  props: thingProps,
  slots: Object,
  setup(props, {
    slots
  }) {
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled,
      mergedRtlRef
    } = useConfig(props);
    const themeRef = useTheme('Thing', '-thing', style, thingLight, props, mergedClsPrefixRef);
    const rtlEnabledRef = useRtl('Thing', mergedRtlRef, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        self: {
          titleTextColor,
          textColor,
          titleFontWeight,
          fontSize
        },
        common: {
          cubicBezierEaseInOut
        }
      } = themeRef.value;
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-font-size': fontSize,
        '--n-text-color': textColor,
        '--n-title-font-weight': titleFontWeight,
        '--n-title-text-color': titleTextColor
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('thing', undefined, cssVarsRef, props) : undefined;
    return () => {
      var _a;
      const {
        value: mergedClsPrefix
      } = mergedClsPrefixRef;
      const rtlEnabled = rtlEnabledRef ? rtlEnabledRef.value : false;
      (_a = themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender) === null || _a === void 0 ? void 0 : _a.call(themeClassHandle);
      return h("div", {
        class: [`${mergedClsPrefix}-thing`, themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass, rtlEnabled && `${mergedClsPrefix}-thing--rtl`],
        style: inlineThemeDisabled ? undefined : cssVarsRef.value
      }, slots.avatar && props.contentIndented ? h("div", {
        class: `${mergedClsPrefix}-thing-avatar`
      }, slots.avatar()) : null, h("div", {
        class: `${mergedClsPrefix}-thing-main`
      }, !props.contentIndented && (slots.header || props.title || slots['header-extra'] || props.titleExtra || slots.avatar) ? h("div", {
        class: `${mergedClsPrefix}-thing-avatar-header-wrapper`
      }, slots.avatar ? h("div", {
        class: `${mergedClsPrefix}-thing-avatar`
      }, slots.avatar()) : null, slots.header || props.title || slots['header-extra'] || props.titleExtra ? h("div", {
        class: `${mergedClsPrefix}-thing-header-wrapper`
      }, h("div", {
        class: `${mergedClsPrefix}-thing-header`
      }, slots.header || props.title ? h("div", {
        class: `${mergedClsPrefix}-thing-header__title`
      }, slots.header ? slots.header() : props.title) : null, slots['header-extra'] || props.titleExtra ? h("div", {
        class: `${mergedClsPrefix}-thing-header__extra`
      }, slots['header-extra'] ? slots['header-extra']() : props.titleExtra) : null), slots.description || props.description ? h("div", {
        class: [`${mergedClsPrefix}-thing-main__description`, props.descriptionClass],
        style: props.descriptionStyle
      }, slots.description ? slots.description() : props.description) : null) : null) : h(Fragment, null, slots.header || props.title || slots['header-extra'] || props.titleExtra ? h("div", {
        class: `${mergedClsPrefix}-thing-header`
      }, slots.header || props.title ? h("div", {
        class: `${mergedClsPrefix}-thing-header__title`
      }, slots.header ? slots.header() : props.title) : null, slots['header-extra'] || props.titleExtra ? h("div", {
        class: `${mergedClsPrefix}-thing-header__extra`
      }, slots['header-extra'] ? slots['header-extra']() : props.titleExtra) : null) : null, slots.description || props.description ? h("div", {
        class: [`${mergedClsPrefix}-thing-main__description`, props.descriptionClass],
        style: props.descriptionStyle
      }, slots.description ? slots.description() : props.description) : null), slots.default || props.content ? h("div", {
        class: [`${mergedClsPrefix}-thing-main__content`, props.contentClass],
        style: props.contentStyle
      }, slots.default ? slots.default() : props.content) : null, slots.footer ? h("div", {
        class: `${mergedClsPrefix}-thing-main__footer`
      }, slots.footer()) : null, slots.action ? h("div", {
        class: `${mergedClsPrefix}-thing-main__action`
      }, slots.action()) : null));
    };
  }
});