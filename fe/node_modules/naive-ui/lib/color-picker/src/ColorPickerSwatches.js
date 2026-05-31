"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const seemly_1 = require("seemly");
const vue_1 = require("vue");
const _utils_1 = require("../../_utils");
const utils_1 = require("./utils");
// Try to normalize the color values to ensure that they are valid CSS colors
function normalizeColor(color, mode) {
    if (mode === 'hsv') {
        const [h, s, v, a] = (0, seemly_1.hsva)(color);
        return (0, seemly_1.toRgbaString)([...(0, seemly_1.hsv2rgb)(h, s, v), a]);
    }
    // For the mode that is not in preset, we keep the original value.
    // For color names, they are legal to CSS, so we don’t deal with them,
    // and only standardize them when outputting.
    return color;
}
function getHexFromName(color) {
    const ctx = document.createElement('canvas').getContext('2d');
    if (!ctx) {
        return '#000000';
    }
    ctx.fillStyle = color;
    return ctx.fillStyle;
}
exports.default = (0, vue_1.defineComponent)({
    name: 'ColorPickerSwatches',
    props: {
        clsPrefix: {
            type: String,
            required: true
        },
        mode: {
            type: String,
            required: true
        },
        swatches: {
            type: Array,
            required: true
        },
        onUpdateColor: {
            type: Function,
            required: true
        }
    },
    setup(props) {
        const parsedSwatchesRef = (0, vue_1.computed)(() => props.swatches.map((value) => {
            const mode = (0, utils_1.getModeFromValue)(value);
            return {
                value,
                mode,
                legalValue: normalizeColor(value, mode)
            };
        }));
        function normalizeOutput(parsed) {
            const { mode: modeProp } = props;
            let { value, mode: swatchColorMode } = parsed;
            // color name is converted to hex
            if (!swatchColorMode) {
                swatchColorMode = 'hex';
                if (/^[a-zA-Z]+$/.test(value)) {
                    value = getHexFromName(value);
                }
                else {
                    // for invalid color, we make it black
                    (0, _utils_1.warn)('color-picker', `color ${value} in swatches is invalid.`);
                    value = '#000000';
                }
            }
            if (swatchColorMode === modeProp)
                return value;
            // swatch value to current mode value
            return (0, utils_1.convertColor)(value, modeProp, swatchColorMode);
        }
        function handleSwatchSelect(parsed) {
            props.onUpdateColor(normalizeOutput(parsed));
        }
        function handleSwatchKeyDown(e, parsed) {
            if (e.key === 'Enter')
                handleSwatchSelect(parsed);
        }
        return {
            parsedSwatchesRef,
            handleSwatchSelect,
            handleSwatchKeyDown
        };
    },
    render() {
        const { clsPrefix } = this;
        return ((0, vue_1.h)("div", { class: `${clsPrefix}-color-picker-swatches` }, this.parsedSwatchesRef.map(swatch => ((0, vue_1.h)("div", { class: `${clsPrefix}-color-picker-swatch`, tabindex: 0, onClick: () => {
                this.handleSwatchSelect(swatch);
            }, onKeydown: (e) => {
                this.handleSwatchKeyDown(e, swatch);
            } },
            (0, vue_1.h)("div", { class: `${clsPrefix}-color-picker-swatch__fill`, style: { background: swatch.legalValue } }))))));
    }
});
