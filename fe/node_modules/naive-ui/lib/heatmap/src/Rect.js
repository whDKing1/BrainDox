"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const _utils_1 = require("../../_utils");
const Tooltip_1 = __importDefault(require("../../tooltip/src/Tooltip"));
exports.default = (0, vue_1.defineComponent)({
    name: 'HeatmapRect',
    slots: Object,
    props: {
        mergedClsPrefix: {
            type: String,
            required: true
        },
        data: {
            type: Object,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        style: Object,
        loading: Boolean,
        loadingClass: String,
        tooltip: {
            type: [Boolean, Object],
            default: true
        }
    },
    setup(props) {
        const cssVarsRef = (0, vue_1.computed)(() => ({
            '--n-rect-color': props.color
        }));
        const tooltipPropsRef = (0, vue_1.computed)(() => {
            return typeof props.tooltip === 'object' ? props.tooltip : {};
        });
        const defaultTooltipContentRef = (0, vue_1.computed)(() => {
            const date = new Date(props.data.timestamp).toLocaleDateString();
            return props.data.value !== null ? `${date} ${props.data.value}` : date;
        });
        return {
            cssVars: cssVarsRef,
            tooltipProps: tooltipPropsRef,
            defaultTooltipContent: defaultTooltipContentRef
        };
    },
    render() {
        const { mergedClsPrefix, style, cssVars, tooltip, tooltipProps, defaultTooltipContent, loading, data } = this;
        const triggerNode = ((0, vue_1.h)("div", { class: [
                `${mergedClsPrefix}-heatmap-rect`,
                loading && `${mergedClsPrefix}-heatmap-rect--loading`,
                loading && this.loadingClass
            ], style: [cssVars, style] }));
        return tooltip === false || loading ? (triggerNode) : ((0, vue_1.h)(Tooltip_1.default, Object.assign({ trigger: "hover" }, tooltipProps), {
            default: () => (0, _utils_1.resolveSlotWithTypedProps)(this.$slots.tooltip, data, () => [
                (0, vue_1.h)("div", null, defaultTooltipContent)
            ]),
            trigger: () => triggerNode
        }));
    }
});
