"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const css_render_1 = require("css-render");
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const icons_1 = require("../../_internal/icons");
const iconMap = {
    success: (0, vue_1.h)(icons_1.SuccessIcon, null),
    error: (0, vue_1.h)(icons_1.ErrorIcon, null),
    warning: (0, vue_1.h)(icons_1.WarningIcon, null),
    info: (0, vue_1.h)(icons_1.InfoIcon, null)
};
exports.default = (0, vue_1.defineComponent)({
    name: 'ProgressCircle',
    props: {
        clsPrefix: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        strokeWidth: {
            type: Number,
            required: true
        },
        fillColor: [String, Object],
        railColor: String,
        railStyle: [String, Object],
        percentage: {
            type: Number,
            default: 0
        },
        offsetDegree: {
            type: Number,
            default: 0
        },
        showIndicator: {
            type: Boolean,
            required: true
        },
        indicatorTextColor: String,
        unit: String,
        viewBoxWidth: {
            type: Number,
            required: true
        },
        gapDegree: {
            type: Number,
            required: true
        },
        gapOffsetDegree: {
            type: Number,
            default: 0
        }
    },
    setup(props, { slots }) {
        const gradientIdRef = (0, vue_1.computed)(() => {
            const base = 'gradient';
            const { fillColor } = props;
            if (typeof fillColor === 'object') {
                return `${base}-${(0, css_render_1.hash)(JSON.stringify(fillColor))}`;
            }
            return base;
        });
        function getPathStyles(percent, offsetDegree, strokeColor, type) {
            const { gapDegree, viewBoxWidth, strokeWidth } = props;
            const radius = 50;
            const beginPositionX = 0;
            const beginPositionY = radius;
            const endPositionX = 0;
            const endPositionY = 2 * radius;
            const centerX = 50 + strokeWidth / 2;
            const pathString = `M ${centerX},${centerX} m ${beginPositionX},${beginPositionY}
      a ${radius},${radius} 0 1 1 ${endPositionX},${-endPositionY}
      a ${radius},${radius} 0 1 1 ${-endPositionX},${endPositionY}`;
            const len = Math.PI * 2 * radius;
            const pathStyle = {
                stroke: type === 'rail'
                    ? strokeColor
                    : typeof props.fillColor === 'object'
                        ? `url(#${gradientIdRef.value})`
                        : strokeColor,
                strokeDasharray: `${(Math.min(percent, 100) / 100) * (len - gapDegree)}px ${viewBoxWidth * 8}px`,
                strokeDashoffset: `-${gapDegree / 2}px`,
                transformOrigin: offsetDegree ? 'center' : undefined,
                transform: offsetDegree ? `rotate(${offsetDegree}deg)` : undefined
            };
            return {
                pathString,
                pathStyle
            };
        }
        const createGradientNode = () => {
            const isGradient = typeof props.fillColor === 'object';
            const from = isGradient ? props.fillColor.stops[0] : '';
            const to = isGradient ? props.fillColor.stops[1] : '';
            return (isGradient && ((0, vue_1.h)("defs", null,
                (0, vue_1.h)("linearGradient", { id: gradientIdRef.value, x1: "0%", y1: "100%", x2: "100%", y2: "0%" },
                    (0, vue_1.h)("stop", { offset: "0%", "stop-color": from }),
                    (0, vue_1.h)("stop", { offset: "100%", "stop-color": to })))));
        };
        return () => {
            const { fillColor, railColor, strokeWidth, offsetDegree, status, percentage, showIndicator, indicatorTextColor, unit, gapOffsetDegree, clsPrefix } = props;
            const { pathString: railPathString, pathStyle: railPathStyle } = getPathStyles(100, 0, railColor, 'rail');
            const { pathString: fillPathString, pathStyle: fillPathStyle } = getPathStyles(percentage, offsetDegree, fillColor, 'fill');
            const viewBoxSize = 100 + strokeWidth;
            return ((0, vue_1.h)("div", { class: `${clsPrefix}-progress-content`, role: "none" },
                (0, vue_1.h)("div", { class: `${clsPrefix}-progress-graph`, "aria-hidden": true },
                    (0, vue_1.h)("div", { class: `${clsPrefix}-progress-graph-circle`, style: {
                            transform: gapOffsetDegree
                                ? `rotate(${gapOffsetDegree}deg)`
                                : undefined
                        } },
                        (0, vue_1.h)("svg", { viewBox: `0 0 ${viewBoxSize} ${viewBoxSize}` },
                            createGradientNode(),
                            (0, vue_1.h)("g", null,
                                (0, vue_1.h)("path", { class: `${clsPrefix}-progress-graph-circle-rail`, d: railPathString, "stroke-width": strokeWidth, "stroke-linecap": "round", fill: "none", style: railPathStyle })),
                            (0, vue_1.h)("g", null,
                                (0, vue_1.h)("path", { class: [
                                        `${clsPrefix}-progress-graph-circle-fill`,
                                        percentage === 0
                                            && `${clsPrefix}-progress-graph-circle-fill--empty`
                                    ], d: fillPathString, "stroke-width": strokeWidth, "stroke-linecap": "round", fill: "none", style: fillPathStyle }))))),
                showIndicator ? ((0, vue_1.h)("div", null, slots.default ? ((0, vue_1.h)("div", { class: `${clsPrefix}-progress-custom-content`, role: "none" }, slots.default())) : status !== 'default' ? ((0, vue_1.h)("div", { class: `${clsPrefix}-progress-icon`, "aria-hidden": true },
                    (0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: clsPrefix }, {
                        default: () => iconMap[status]
                    }))) : ((0, vue_1.h)("div", { class: `${clsPrefix}-progress-text`, style: {
                        color: indicatorTextColor
                    }, role: "none" },
                    (0, vue_1.h)("span", { class: `${clsPrefix}-progress-text__percentage` }, percentage),
                    (0, vue_1.h)("span", { class: `${clsPrefix}-progress-text__unit` }, unit))))) : null));
        };
    }
});
