"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawerContentProps = void 0;
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const _utils_1 = require("../../_utils");
const interface_1 = require("./interface");
exports.drawerContentProps = {
    title: String,
    headerClass: String,
    headerStyle: [Object, String],
    footerClass: String,
    footerStyle: [Object, String],
    bodyClass: String,
    bodyStyle: [Object, String],
    bodyContentClass: String,
    bodyContentStyle: [Object, String],
    nativeScrollbar: { type: Boolean, default: true },
    scrollbarProps: Object,
    closable: Boolean
};
exports.default = (0, vue_1.defineComponent)({
    name: 'DrawerContent',
    props: exports.drawerContentProps,
    slots: Object,
    setup() {
        const NDrawer = (0, vue_1.inject)(interface_1.drawerInjectionKey, null);
        if (!NDrawer) {
            (0, _utils_1.throwError)('drawer-content', '`n-drawer-content` must be placed inside `n-drawer`.');
        }
        const { doUpdateShow } = NDrawer;
        function handleCloseClick() {
            doUpdateShow(false);
        }
        return {
            handleCloseClick,
            mergedTheme: NDrawer.mergedThemeRef,
            mergedClsPrefix: NDrawer.mergedClsPrefixRef
        };
    },
    render() {
        const { title, mergedClsPrefix, nativeScrollbar, mergedTheme, bodyClass, bodyStyle, bodyContentClass, bodyContentStyle, headerClass, headerStyle, footerClass, footerStyle, scrollbarProps, closable, $slots } = this;
        return ((0, vue_1.h)("div", { role: "none", class: [
                `${mergedClsPrefix}-drawer-content`,
                nativeScrollbar
                    && `${mergedClsPrefix}-drawer-content--native-scrollbar`
            ] },
            $slots.header || title || closable ? ((0, vue_1.h)("div", { class: [`${mergedClsPrefix}-drawer-header`, headerClass], style: headerStyle, role: "none" },
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-drawer-header__main`, role: "heading", "aria-level": "1" }, $slots.header !== undefined ? $slots.header() : title),
                closable && ((0, vue_1.h)(_internal_1.NBaseClose, { onClick: this.handleCloseClick, clsPrefix: mergedClsPrefix, class: `${mergedClsPrefix}-drawer-header__close`, absolute: true })))) : null,
            nativeScrollbar ? ((0, vue_1.h)("div", { class: [`${mergedClsPrefix}-drawer-body`, bodyClass], style: bodyStyle, role: "none" },
                (0, vue_1.h)("div", { class: [
                        `${mergedClsPrefix}-drawer-body-content-wrapper`,
                        bodyContentClass
                    ], style: bodyContentStyle, role: "none" }, $slots))) : ((0, vue_1.h)(_internal_1.NScrollbar, Object.assign({ themeOverrides: mergedTheme.peerOverrides.Scrollbar, theme: mergedTheme.peers.Scrollbar }, scrollbarProps, { class: `${mergedClsPrefix}-drawer-body`, contentClass: [
                    `${mergedClsPrefix}-drawer-body-content-wrapper`,
                    bodyContentClass
                ], contentStyle: bodyContentStyle }), $slots)),
            $slots.footer ? ((0, vue_1.h)("div", { class: [`${mergedClsPrefix}-drawer-footer`, footerClass], style: footerStyle, role: "none" }, $slots.footer())) : null));
    }
});
