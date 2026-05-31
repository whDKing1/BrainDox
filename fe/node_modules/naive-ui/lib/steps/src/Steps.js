"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stepsInjectionKey = exports.stepsProps = void 0;
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
function stepWithIndex(step, i) {
    if (typeof step !== 'object' || step === null || Array.isArray(step)) {
        return null;
    }
    if (!step.props)
        step.props = {};
    step.props.internalIndex = i + 1;
    return step;
}
function stepsWithIndex(steps) {
    return steps.map((step, i) => stepWithIndex(step, i));
}
exports.stepsProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { current: Number, status: {
        type: String,
        default: 'process'
    }, size: {
        type: String,
        default: 'medium'
    }, vertical: Boolean, contentPlacement: {
        type: String,
        default: 'right'
    }, 'onUpdate:current': [Function, Array], onUpdateCurrent: [Function, Array] });
exports.stepsInjectionKey = (0, _utils_1.createInjectionKey)('n-steps');
exports.default = (0, vue_1.defineComponent)({
    name: 'Steps',
    props: exports.stepsProps,
    slots: Object,
    setup(props, { slots }) {
        const { mergedClsPrefixRef, mergedRtlRef } = (0, _mixins_1.useConfig)(props);
        const rtlEnabledRef = (0, _mixins_1.useRtl)('Steps', mergedRtlRef, mergedClsPrefixRef);
        const themeRef = (0, _mixins_1.useTheme)('Steps', '-steps', index_cssr_1.default, styles_1.stepsLight, props, mergedClsPrefixRef);
        (0, vue_1.provide)(exports.stepsInjectionKey, {
            props,
            mergedThemeRef: themeRef,
            mergedClsPrefixRef,
            stepsSlots: slots
        });
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            rtlEnabled: rtlEnabledRef
        };
    },
    render() {
        const { mergedClsPrefix } = this;
        return ((0, vue_1.h)("div", { class: [
                `${mergedClsPrefix}-steps`,
                this.rtlEnabled && `${mergedClsPrefix}-steps--rtl`,
                this.vertical && `${mergedClsPrefix}-steps--vertical`,
                this.contentPlacement === 'bottom'
                    && `${mergedClsPrefix}-steps--content-bottom`
            ] }, stepsWithIndex((0, _utils_1.flatten)((0, _utils_1.getSlot)(this)))));
    }
});
