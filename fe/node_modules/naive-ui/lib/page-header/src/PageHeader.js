"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageHeaderProps = void 0;
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const icons_1 = require("../../_internal/icons");
const _mixins_1 = require("../../_mixins");
const use_rtl_1 = require("../../_mixins/use-rtl");
const light_1 = require("../styles/light");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.pageHeaderProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { title: String, subtitle: String, extra: String, onBack: Function });
exports.default = (0, vue_1.defineComponent)({
    name: 'PageHeader',
    props: exports.pageHeaderProps,
    slots: Object,
    setup(props) {
        const { mergedClsPrefixRef, mergedRtlRef, inlineThemeDisabled } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('PageHeader', '-page-header', index_cssr_1.default, light_1.pageHeaderLight, props, mergedClsPrefixRef);
        const rtlEnabledRef = (0, use_rtl_1.useRtl)('PageHeader', mergedRtlRef, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { self: { titleTextColor, subtitleTextColor, backColor, fontSize, titleFontSize, backSize, titleFontWeight, backColorHover, backColorPressed }, common: { cubicBezierEaseInOut } } = themeRef.value;
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
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('page-header', undefined, cssVarsRef, props)
            : undefined;
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
        const { onBack, title, subtitle, extra, mergedClsPrefix, cssVars, $slots } = this;
        (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
        const { title: titleSlot, subtitle: subtitleSlot, extra: extraSlot, default: defaultSlot, header: headerSlot, avatar: avatarSlot, footer: footerSlot, back: backSlot } = $slots;
        const showBack = onBack;
        const showTitle = title || titleSlot;
        const showSubtitle = subtitle || subtitleSlot;
        const showExtra = extra || extraSlot;
        return ((0, vue_1.h)("div", { style: cssVars, class: [
                `${mergedClsPrefix}-page-header-wrapper`,
                this.themeClass,
                this.rtlEnabled && `${mergedClsPrefix}-page-header-wrapper--rtl`
            ] },
            headerSlot ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-page-header-header`, key: "breadcrumb" }, headerSlot())) : null,
            (showBack || avatarSlot || showTitle || showSubtitle || showExtra) && ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-page-header`, key: "header" },
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-page-header__main`, key: "back" },
                    showBack ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-page-header__back`, onClick: onBack }, backSlot ? (backSlot()) : ((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: mergedClsPrefix }, {
                        default: () => (0, vue_1.h)(icons_1.ArrowBackIcon, null)
                    })))) : null,
                    avatarSlot ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-page-header__avatar` }, avatarSlot())) : null,
                    showTitle ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-page-header__title`, key: "title" }, title || titleSlot())) : null,
                    showSubtitle ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-page-header__subtitle`, key: "subtitle" }, subtitle || subtitleSlot())) : null),
                showExtra ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-page-header__extra` }, extra || extraSlot())) : null)),
            defaultSlot ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-page-header-content`, key: "content" }, defaultSlot())) : null,
            footerSlot ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-page-header-footer`, key: "footer" }, footerSlot())) : null));
    }
});
