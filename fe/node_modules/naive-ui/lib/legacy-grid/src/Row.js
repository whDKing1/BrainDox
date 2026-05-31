"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rowPropKeys = exports.rowProps = exports.rowInjectionKey = void 0;
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.rowInjectionKey = (0, _utils_1.createInjectionKey)('n-row');
exports.rowProps = {
    gutter: {
        type: [Array, Number, String],
        default: 0
    },
    alignItems: String,
    justifyContent: String
};
exports.rowPropKeys = (0, _utils_1.keysOf)(exports.rowProps);
exports.default = (0, vue_1.defineComponent)({
    name: 'Row',
    props: exports.rowProps,
    setup(props) {
        const { mergedClsPrefixRef, mergedRtlRef } = (0, _mixins_1.useConfig)(props);
        (0, _mixins_1.useStyle)('-legacy-grid', index_cssr_1.default, mergedClsPrefixRef);
        const rtlEnabledRef = (0, _mixins_1.useRtl)('Row', mergedRtlRef, mergedClsPrefixRef);
        const verticalGutterRef = (0, vooks_1.useMemo)(() => {
            const { gutter } = props;
            if (Array.isArray(gutter)) {
                return gutter[1] || 0;
            }
            return 0;
        });
        const horizontalGutterRef = (0, vooks_1.useMemo)(() => {
            const { gutter } = props;
            if (Array.isArray(gutter)) {
                return gutter[0];
            }
            return Number(gutter);
        });
        (0, vue_1.provide)(exports.rowInjectionKey, {
            mergedClsPrefixRef,
            gutterRef: (0, vue_1.toRef)(props, 'gutter'),
            verticalGutterRef,
            horizontalGutterRef
        });
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            rtlEnabled: rtlEnabledRef,
            styleMargin: (0, vooks_1.useMemo)(() => `-${(0, _utils_1.formatLength)(verticalGutterRef.value, {
                c: 0.5
            })} -${(0, _utils_1.formatLength)(horizontalGutterRef.value, { c: 0.5 })}`),
            styleWidth: (0, vooks_1.useMemo)(() => `calc(100% + ${(0, _utils_1.formatLength)(horizontalGutterRef.value)})`)
        };
    },
    render() {
        return ((0, vue_1.h)("div", { class: [
                `${this.mergedClsPrefix}-row`,
                this.rtlEnabled && `${this.mergedClsPrefix}-row--rtl`
            ], style: {
                margin: this.styleMargin,
                width: this.styleWidth,
                alignItems: this.alignItems,
                justifyContent: this.justifyContent
            } }, this.$slots));
    }
});
