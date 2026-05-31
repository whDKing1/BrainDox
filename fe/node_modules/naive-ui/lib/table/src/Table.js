"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tableProps = void 0;
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const use_rtl_1 = require("../../_mixins/use-rtl");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.tableProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { bordered: {
        type: Boolean,
        default: true
    }, bottomBordered: {
        type: Boolean,
        default: true
    }, singleLine: {
        type: Boolean,
        default: true
    }, striped: Boolean, singleColumn: Boolean, size: String });
exports.default = (0, vue_1.defineComponent)({
    name: 'Table',
    props: exports.tableProps,
    setup(props) {
        const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef, mergedComponentPropsRef } = (0, _mixins_1.useConfig)(props);
        const mergedSizeRef = (0, vue_1.computed)(() => {
            var _a, _b;
            return (props.size || ((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Table) === null || _b === void 0 ? void 0 : _b.size) || 'medium');
        });
        const themeRef = (0, _mixins_1.useTheme)('Table', '-table', index_cssr_1.default, styles_1.tableLight, props, mergedClsPrefixRef);
        const rtlEnabledRef = (0, use_rtl_1.useRtl)('Table', mergedRtlRef, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const size = mergedSizeRef.value;
            const { self: { borderColor, tdColor, tdColorModal, tdColorPopover, thColor, thColorModal, thColorPopover, thTextColor, tdTextColor, borderRadius, thFontWeight, lineHeight, borderColorModal, borderColorPopover, tdColorStriped, tdColorStripedModal, tdColorStripedPopover, [(0, _utils_1.createKey)('fontSize', size)]: fontSize, [(0, _utils_1.createKey)('tdPadding', size)]: tdPadding, [(0, _utils_1.createKey)('thPadding', size)]: thPadding }, common: { cubicBezierEaseInOut } } = themeRef.value;
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-td-color': tdColor,
                '--n-td-color-modal': tdColorModal,
                '--n-td-color-popover': tdColorPopover,
                '--n-td-text-color': tdTextColor,
                '--n-border-color': borderColor,
                '--n-border-color-modal': borderColorModal,
                '--n-border-color-popover': borderColorPopover,
                '--n-border-radius': borderRadius,
                '--n-font-size': fontSize,
                '--n-th-color': thColor,
                '--n-th-color-modal': thColorModal,
                '--n-th-color-popover': thColorPopover,
                '--n-th-font-weight': thFontWeight,
                '--n-th-text-color': thTextColor,
                '--n-line-height': lineHeight,
                '--n-td-padding': tdPadding,
                '--n-th-padding': thPadding,
                '--n-td-color-striped': tdColorStriped,
                '--n-td-color-striped-modal': tdColorStripedModal,
                '--n-td-color-striped-popover': tdColorStripedPopover
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('table', (0, vue_1.computed)(() => {
                return mergedSizeRef.value[0];
            }), cssVarsRef, props)
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
        const { mergedClsPrefix } = this;
        (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
        return ((0, vue_1.h)("table", { class: [
                `${mergedClsPrefix}-table`,
                this.themeClass,
                {
                    [`${mergedClsPrefix}-table--rtl`]: this.rtlEnabled,
                    [`${mergedClsPrefix}-table--bottom-bordered`]: this.bottomBordered,
                    [`${mergedClsPrefix}-table--bordered`]: this.bordered,
                    [`${mergedClsPrefix}-table--single-line`]: this.singleLine,
                    [`${mergedClsPrefix}-table--single-column`]: this.singleColumn,
                    [`${mergedClsPrefix}-table--striped`]: this.striped
                }
            ], style: this.cssVars }, this.$slots));
    }
});
