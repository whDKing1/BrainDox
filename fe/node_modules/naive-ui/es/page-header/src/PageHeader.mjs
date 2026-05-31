import { computed, defineComponent, h } from 'vue';
import { NBaseIcon } from "../../_internal/index.mjs";
import { ArrowBackIcon } from "../../_internal/icons/index.mjs";
import { useConfig, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { useRtl } from "../../_mixins/use-rtl.mjs";
import { pageHeaderLight } from "../styles/light.mjs";
import style from "./styles/index.cssr.mjs";
export const pageHeaderProps = Object.assign(Object.assign({}, useTheme.props), {
  title: String,
  subtitle: String,
  extra: String,
  onBack: Function
});
export default defineComponent({
  name: 'PageHeader',
  props: pageHeaderProps,
  slots: Object,
  setup(props) {
    const {
      mergedClsPrefixRef,
      mergedRtlRef,
      inlineThemeDisabled
    } = useConfig(props);
    const themeRef = useTheme('PageHeader', '-page-header', style, pageHeaderLight, props, mergedClsPrefixRef);
    const rtlEnabledRef = useRtl('PageHeader', mergedRtlRef, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        self: {
          titleTextColor,
          subtitleTextColor,
          backColor,
          fontSize,
          titleFontSize,
          backSize,
          titleFontWeight,
          backColorHover,
          backColorPressed
        },
        common: {
          cubicBezierEaseInOut
        }
      } = themeRef.value;
      return {
        '--n-title-text-color': titleTextColor,
        '--n-title-font-size': titleFontSize,
        '--n-title-font-weight': titleFontWeight,
        '--n-font-size': fontSize,
        '--n-back-size': backSize,
        '--n-subtitle-text-color': subtitleTextColor,
        '--n-back-color': backColor,
        '--n-back-color-hover': backColorHover,
        '--n-back-color-pressed': backColorPressed,
        '--n-bezier': cubicBezierEaseInOut
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('page-header', undefined, cssVarsRef, props) : undefined;
    return {
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    var _a;
    const {
      onBack,
      title,
      subtitle,
      extra,
      mergedClsPrefix,
      cssVars,
      $slots
    } = this;
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    const {
      title: titleSlot,
      subtitle: subtitleSlot,
      extra: extraSlot,
      default: defaultSlot,
      header: headerSlot,
      avatar: avatarSlot,
      footer: footerSlot,
      back: backSlot
    } = $slots;
    const showBack = onBack;
    const showTitle = title || titleSlot;
    const showSubtitle = subtitle || subtitleSlot;
    const showExtra = extra || extraSlot;
    return h("div", {
      style: cssVars,
      class: [`${mergedClsPrefix}-page-header-wrapper`, this.themeClass, this.rtlEnabled && `${mergedClsPrefix}-page-header-wrapper--rtl`]
    }, headerSlot ? h("div", {
      class: `${mergedClsPrefix}-page-header-header`,
      key: "breadcrumb"
    }, headerSlot()) : null, (showBack || avatarSlot || showTitle || showSubtitle || showExtra) && h("div", {
      class: `${mergedClsPrefix}-page-header`,
      key: "header"
    }, h("div", {
      class: `${mergedClsPrefix}-page-header__main`,
      key: "back"
    }, showBack ? h("div", {
      class: `${mergedClsPrefix}-page-header__back`,
      onClick: onBack
    }, backSlot ? backSlot() : h(NBaseIcon, {
      clsPrefix: mergedClsPrefix
    }, {
      default: () => h(ArrowBackIcon, null)
    })) : null, avatarSlot ? h("div", {
      class: `${mergedClsPrefix}-page-header__avatar`
    }, avatarSlot()) : null, showTitle ? h("div", {
      class: `${mergedClsPrefix}-page-header__title`,
      key: "title"
    }, title || titleSlot()) : null, showSubtitle ? h("div", {
      class: `${mergedClsPrefix}-page-header__subtitle`,
      key: "subtitle"
    }, subtitle || subtitleSlot()) : null), showExtra ? h("div", {
      class: `${mergedClsPrefix}-page-header__extra`
    }, extra || extraSlot()) : null), defaultSlot ? h("div", {
      class: `${mergedClsPrefix}-page-header-content`,
      key: "content"
    }, defaultSlot()) : null, footerSlot ? h("div", {
      class: `${mergedClsPrefix}-page-header-footer`,
      key: "footer"
    }, footerSlot()) : null);
  }
});