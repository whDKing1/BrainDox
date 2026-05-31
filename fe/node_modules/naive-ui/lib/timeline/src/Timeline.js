"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.timelineInjectionKey = exports.timelineProps = void 0;
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.timelineProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { horizontal: Boolean, itemPlacement: {
        type: String,
        default: 'left'
    }, size: {
        type: String,
        default: 'medium'
    }, iconSize: Number });
exports.timelineInjectionKey = (0, _utils_1.createInjectionKey)('n-timeline');
exports.default = (0, vue_1.defineComponent)({
    name: 'Timeline',
    props: exports.timelineProps,
    setup(props, { slots }) {
        const { mergedClsPrefixRef } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Timeline', '-timeline', index_cssr_1.default, styles_1.timelineLight, props, mergedClsPrefixRef);
        (0, vue_1.provide)(exports.timelineInjectionKey, {
            props,
            mergedThemeRef: themeRef,
            mergedClsPrefixRef
        });
        return () => {
            const { value: mergedClsPrefix } = mergedClsPrefixRef;
            return ((0, vue_1.h)("div", { class: [
                    `${mergedClsPrefix}-timeline`,
                    props.horizontal && `${mergedClsPrefix}-timeline--horizontal`,
                    `${mergedClsPrefix}-timeline--${props.size}-size`,
                    !props.horizontal
                        && `${mergedClsPrefix}-timeline--${props.itemPlacement}-placement`
                ] }, slots));
        };
    }
});
