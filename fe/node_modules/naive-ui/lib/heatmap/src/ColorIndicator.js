"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
exports.default = (0, vue_1.defineComponent)({
    name: 'HeatmapColorIndicator',
    slots: Object,
    props: {
        colors: {
            type: Array,
            required: true
        },
        clsPrefix: {
            type: String,
            required: true
        }
    },
    setup(props, { slots }) {
        return () => {
            var _a, _b;
            const { colors, clsPrefix } = props;
            return ((0, vue_1.h)("div", { class: `${clsPrefix}-heatmap-color-indicator` },
                (0, vue_1.h)("span", { class: `${clsPrefix}-heatmap-color-indicator__label` }, (_a = slots['leading-text']) === null || _a === void 0 ? void 0 : _a.call(slots)),
                (0, vue_1.h)("div", { class: `${clsPrefix}-heatmap-color-indicator__cells` }, colors.map((color, index) => ((0, vue_1.h)("div", { key: index, class: `${clsPrefix}-heatmap-color-indicator__cell`, style: { backgroundColor: color } })))),
                (0, vue_1.h)("span", { class: `${clsPrefix}-heatmap-color-indicator__label` }, (_b = slots['trailing-text']) === null || _b === void 0 ? void 0 : _b.call(slots))));
        };
    }
});
