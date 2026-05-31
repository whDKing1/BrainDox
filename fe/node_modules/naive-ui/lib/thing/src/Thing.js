"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.thingProps = void 0;
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const styles_1 = require("../styles");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.thingProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { title: String, titleExtra: String, description: String, descriptionClass: String, descriptionStyle: [String, Object], content: String, contentClass: String, contentStyle: [String, Object], contentIndented: Boolean });
exports.default = (0, vue_1.defineComponent)({
    name: 'Thing',
    props: exports.thingProps,
    slots: Object,
    setup(props, { slots }) {
        const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Thing', '-thing', index_cssr_1.default, styles_1.thingLight, props, mergedClsPrefixRef);
        const rtlEnabledRef = (0, _mixins_1.useRtl)('Thing', mergedRtlRef, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { self: { titleTextColor, textColor, titleFontWeight, fontSize }, common: { cubicBezierEaseInOut } } = themeRef.value;
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-font-size': fontSize,
                '--n-text-color': textColor,
                '--n-title-font-weight': titleFontWeight,
                '--n-title-text-color': titleTextColor
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('thing', undefined, cssVarsRef, props)
            : undefined;
        return () => {
            var _a;
            const { value: mergedClsPrefix } = mergedClsPrefixRef;
            const rtlEnabled = rtlEnabledRef ? rtlEnabledRef.value : false;
            (_a = themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender) === null || _a === void 0 ? void 0 : _a.call(themeClassHandle);
            return ((0, vue_1.h)("div", { class: [
                    `${mergedClsPrefix}-thing`,
                    themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
                    rtlEnabled && `${mergedClsPrefix}-thing--rtl`
                ], style: inlineThemeDisabled
                    ? undefined
                    : cssVarsRef.value },
                slots.avatar && props.contentIndented ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-thing-avatar` }, slots.avatar())) : null,
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-thing-main` },
                    !props.contentIndented
                        && (slots.header
                            || props.title
                            || slots['header-extra']
                            || props.titleExtra
                            || slots.avatar) ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-thing-avatar-header-wrapper` },
                        slots.avatar ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-thing-avatar` }, slots.avatar())) : null,
                        slots.header
                            || props.title
                            || slots['header-extra']
                            || props.titleExtra ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-thing-header-wrapper` },
                            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-thing-header` },
                                slots.header || props.title ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-thing-header__title` }, slots.header ? slots.header() : props.title)) : null,
                                slots['header-extra'] || props.titleExtra ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-thing-header__extra` }, slots['header-extra']
                                    ? slots['header-extra']()
                                    : props.titleExtra)) : null),
                            slots.description || props.description ? ((0, vue_1.h)("div", { class: [
                                    `${mergedClsPrefix}-thing-main__description`,
                                    props.descriptionClass
                                ], style: props.descriptionStyle }, slots.description
                                ? slots.description()
                                : props.description)) : null)) : null)) : ((0, vue_1.h)(vue_1.Fragment, null,
                        slots.header
                            || props.title
                            || slots['header-extra']
                            || props.titleExtra ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-thing-header` },
                            slots.header || props.title ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-thing-header__title` }, slots.header ? slots.header() : props.title)) : null,
                            slots['header-extra'] || props.titleExtra ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-thing-header__extra` }, slots['header-extra']
                                ? slots['header-extra']()
                                : props.titleExtra)) : null)) : null,
                        slots.description || props.description ? ((0, vue_1.h)("div", { class: [
                                `${mergedClsPrefix}-thing-main__description`,
                                props.descriptionClass
                            ], style: props.descriptionStyle }, slots.description
                            ? slots.description()
                            : props.description)) : null)),
                    slots.default || props.content ? ((0, vue_1.h)("div", { class: [
                            `${mergedClsPrefix}-thing-main__content`,
                            props.contentClass
                        ], style: props.contentStyle }, slots.default ? slots.default() : props.content)) : null,
                    slots.footer ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-thing-main__footer` }, slots.footer())) : null,
                    slots.action ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-thing-main__action` }, slots.action())) : null)));
        };
    }
});
