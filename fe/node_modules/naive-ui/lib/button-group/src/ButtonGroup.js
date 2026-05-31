"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buttonGroupProps = void 0;
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const use_rtl_1 = require("../../_mixins/use-rtl");
const context_1 = require("./context");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.buttonGroupProps = {
    size: String,
    vertical: Boolean
};
exports.default = (0, vue_1.defineComponent)({
    name: 'ButtonGroup',
    props: exports.buttonGroupProps,
    setup(props) {
        const { mergedClsPrefixRef, mergedRtlRef } = (0, _mixins_1.useConfig)(props);
        (0, _mixins_1.useStyle)('-button-group', index_cssr_1.default, mergedClsPrefixRef);
        (0, vue_1.provide)(context_1.buttonGroupInjectionKey, props);
        const rtlEnabledRef = (0, use_rtl_1.useRtl)('ButtonGroup', mergedRtlRef, mergedClsPrefixRef);
        return {
            rtlEnabled: rtlEnabledRef,
            mergedClsPrefix: mergedClsPrefixRef
        };
    },
    render() {
        const { mergedClsPrefix } = this;
        return ((0, vue_1.h)("div", { class: [
                `${mergedClsPrefix}-button-group`,
                this.rtlEnabled && `${mergedClsPrefix}-button-group--rtl`,
                this.vertical && `${mergedClsPrefix}-button-group--vertical`
            ], role: "group" }, this.$slots));
    }
});
