"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.progressProps = void 0;
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const Circle_1 = __importDefault(require("./Circle"));
const Line_1 = __importDefault(require("./Line"));
const MultipleCircle_1 = __importDefault(require("./MultipleCircle"));
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.progressProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { processing: Boolean, type: {
        type: String,
        default: 'line'
    }, gapDegree: Number, gapOffsetDegree: Number, status: {
        type: String,
        default: 'default'
    }, railColor: [String, Array], railStyle: [String, Array], color: [String, Array, Object], viewBoxWidth: {
        type: Number,
        default: 100
    }, strokeWidth: {
        type: Number,
        default: 7
    }, percentage: [Number, Array], unit: {
        type: String,
        default: '%'
    }, showIndicator: {
        type: Boolean,
        default: true
    }, indicatorPosition: {
        type: String,
        default: 'outside'
    }, indicatorPlacement: {
        type: String,
        default: 'outside'
    }, indicatorTextColor: String, circleGap: {
        type: Number,
        default: 1
    }, height: Number, borderRadius: [String, Number], fillBorderRadius: [String, Number], offsetDegree: Number });
exports.default = (0, vue_1.defineComponent)({
    name: 'Progress',
    props: exports.progressProps,
    setup(props) {
        const mergedIndicatorPlacementRef = (0, vue_1.computed)(() => {
            return props.indicatorPlacement || props.indicatorPosition;
        });
        const gapDeg = (0, vue_1.computed)(() => {
            if (props.gapDegree || props.gapDegree === 0) {
                return props.gapDegree;
            }
            if (props.type === 'dashboard') {
                return 75;
            }
            return undefined;
        });
        const { mergedClsPrefixRef, inlineThemeDisabled } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Progress', '-progress', index_cssr_1.default, styles_1.progressLight, props, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { status } = props;
            const { common: { cubicBezierEaseInOut }, self: { fontSize, fontSizeCircle, railColor, railHeight, iconSizeCircle, iconSizeLine, textColorCircle, textColorLineInner, textColorLineOuter, lineBgProcessing, fontWeightCircle, [(0, _utils_1.createKey)('iconColor', status)]: iconColor, [(0, _utils_1.createKey)('fillColor', status)]: fillColor } } = themeRef.value;
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-fill-color': fillColor,
                '--n-font-size': fontSize,
                '--n-font-size-circle': fontSizeCircle,
                '--n-font-weight-circle': fontWeightCircle,
                '--n-icon-color': iconColor,
                '--n-icon-size-circle': iconSizeCircle,
                '--n-icon-size-line': iconSizeLine,
                '--n-line-bg-processing': lineBgProcessing,
                '--n-rail-color': railColor,
                '--n-rail-height': railHeight,
                '--n-text-color-circle': textColorCircle,
                '--n-text-color-line-inner': textColorLineInner,
                '--n-text-color-line-outer': textColorLineOuter
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('progress', (0, vue_1.computed)(() => props.status[0]), cssVarsRef, props)
            : undefined;
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            mergedIndicatorPlacement: mergedIndicatorPlacementRef,
            gapDeg,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
        };
    },
    render() {
        // it's ok to expand all prop here since no slots' deps
        const { type, cssVars, indicatorTextColor, showIndicator, status, railColor, railStyle, color, percentage, viewBoxWidth, strokeWidth, mergedIndicatorPlacement, unit, borderRadius, fillBorderRadius, height, processing, circleGap, mergedClsPrefix, gapDeg, gapOffsetDegree, themeClass, $slots, onRender } = this;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        return ((0, vue_1.h)("div", { class: [
                themeClass,
                `${mergedClsPrefix}-progress`,
                `${mergedClsPrefix}-progress--${type}`,
                `${mergedClsPrefix}-progress--${status}`
            ], style: cssVars, "aria-valuemax": 100, "aria-valuemin": 0, "aria-valuenow": percentage, role: type === 'circle' || type === 'line' || type === 'dashboard'
                ? 'progressbar'
                : 'none' }, type === 'circle' || type === 'dashboard' ? ((0, vue_1.h)(Circle_1.default, { clsPrefix: mergedClsPrefix, status: status, showIndicator: showIndicator, indicatorTextColor: indicatorTextColor, railColor: railColor, fillColor: color, railStyle: railStyle, offsetDegree: this.offsetDegree, percentage: percentage, viewBoxWidth: viewBoxWidth, strokeWidth: strokeWidth, gapDegree: gapDeg === undefined ? (type === 'dashboard' ? 75 : 0) : gapDeg, gapOffsetDegree: gapOffsetDegree, unit: unit }, $slots)) : type === 'line' ? ((0, vue_1.h)(Line_1.default, { clsPrefix: mergedClsPrefix, status: status, showIndicator: showIndicator, indicatorTextColor: indicatorTextColor, railColor: railColor, fillColor: color, railStyle: railStyle, percentage: percentage, processing: processing, indicatorPlacement: mergedIndicatorPlacement, unit: unit, fillBorderRadius: fillBorderRadius, railBorderRadius: borderRadius, height: height }, $slots)) : type === 'multiple-circle' ? ((0, vue_1.h)(MultipleCircle_1.default, { clsPrefix: mergedClsPrefix, strokeWidth: strokeWidth, railColor: railColor, fillColor: color, railStyle: railStyle, viewBoxWidth: viewBoxWidth, percentage: percentage, showIndicator: showIndicator, circleGap: circleGap }, $slots)) : null));
    }
});
