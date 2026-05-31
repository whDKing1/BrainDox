"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveDefaultValue = deriveDefaultValue;
exports.getModeFromValue = getModeFromValue;
exports.getWCAGContrast = getWCAGContrast;
exports.floor = floor;
exports.normalizeHue = normalizeHue;
exports.normalizeAlpha = normalizeAlpha;
exports.convertColor = convertColor;
const seemly_1 = require("seemly");
const _utils_1 = require("../../_utils");
function deriveDefaultValue(modes, showAlpha) {
    const mode = modes[0];
    switch (mode) {
        case 'hex':
            return showAlpha ? '#000000FF' : '#000000';
        case 'rgb':
            return showAlpha ? 'rgba(0, 0, 0, 1)' : 'rgb(0, 0, 0)';
        case 'hsl':
            return showAlpha ? 'hsla(0, 0%, 0%, 1)' : 'hsl(0, 0%, 0%)';
        case 'hsv':
            return showAlpha ? 'hsva(0, 0%, 0%, 1)' : 'hsv(0, 0%, 0%)';
    }
    if (process.env.NODE_ENV !== 'production')
        (0, _utils_1.warn)('color-picker', 'props.modes is invalid.');
    // in case of invalid modes
    return '#000000';
}
function getModeFromValue(color) {
    if (color === null)
        return null;
    if (/^ *#/.test(color))
        return 'hex';
    if (color.includes('rgb'))
        return 'rgb';
    if (color.includes('hsl'))
        return 'hsl';
    if (color.includes('hsv'))
        return 'hsv';
    return null;
}
function getWCAGContrast(hsla, contrastColor = [255, 255, 255], level = 'AA') {
    const [r, g, b, a] = (0, seemly_1.rgba)((0, seemly_1.toHslaString)(hsla));
    if (a === 1) {
        const luminance1 = rgb2luminance([r, g, b]);
        const luminance2 = rgb2luminance(contrastColor);
        const contrast = (Math.max(luminance1, luminance2) + 0.05)
            / (Math.min(luminance1, luminance2) + 0.05);
        return contrast >= (level === 'AA' ? 4.5 : 7);
    }
    const blendedR = Math.round(r * a + contrastColor[0] * (1 - a));
    const blendedG = Math.round(g * a + contrastColor[1] * (1 - a));
    const blendedB = Math.round(b * a + contrastColor[2] * (1 - a));
    const luminanceBlended = rgb2luminance([blendedR, blendedG, blendedB]);
    const luminanceWhite = rgb2luminance(contrastColor);
    const contrastBlended = (Math.max(luminanceBlended, luminanceWhite) + 0.05)
        / (Math.min(luminanceBlended, luminanceWhite) + 0.05);
    return contrastBlended >= (level === 'AA' ? 4.5 : 7);
}
function rgb2luminance(rgb) {
    const [cr, cg, cb] = rgb.map((c) => {
        c /= 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow(((c + 0.055) / 1.055), 2.4);
    });
    return 0.2126 * cr + 0.7152 * cg + 0.0722 * cb;
}
function floor(color) {
    return color.map(channel => Math.floor(channel));
}
function normalizeHue(hue) {
    hue = Math.round(hue);
    return hue >= 360 ? 359 : hue < 0 ? 0 : hue;
}
function normalizeAlpha(alpha) {
    alpha = Math.round(alpha * 100) / 100;
    return alpha > 1 ? 1 : alpha < 0 ? 0 : alpha;
}
const convert = {
    rgb: {
        hex(value) {
            return (0, seemly_1.toHexaString)((0, seemly_1.rgba)(value));
        },
        hsl(value) {
            const [r, g, b, a] = (0, seemly_1.rgba)(value);
            return (0, seemly_1.toHslaString)([...(0, seemly_1.rgb2hsl)(r, g, b), a]);
        },
        hsv(value) {
            const [r, g, b, a] = (0, seemly_1.rgba)(value);
            return (0, seemly_1.toHsvaString)([...(0, seemly_1.rgb2hsv)(r, g, b), a]);
        }
    },
    hex: {
        rgb(value) {
            return (0, seemly_1.toRgbaString)((0, seemly_1.rgba)(value));
        },
        hsl(value) {
            const [r, g, b, a] = (0, seemly_1.rgba)(value);
            return (0, seemly_1.toHslaString)([...(0, seemly_1.rgb2hsl)(r, g, b), a]);
        },
        hsv(value) {
            const [r, g, b, a] = (0, seemly_1.rgba)(value);
            return (0, seemly_1.toHsvaString)([...(0, seemly_1.rgb2hsv)(r, g, b), a]);
        }
    },
    hsl: {
        hex(value) {
            const [h, s, l, a] = (0, seemly_1.hsla)(value);
            return (0, seemly_1.toHexaString)([...(0, seemly_1.hsl2rgb)(h, s, l), a]);
        },
        rgb(value) {
            const [h, s, l, a] = (0, seemly_1.hsla)(value);
            return (0, seemly_1.toRgbaString)([...(0, seemly_1.hsl2rgb)(h, s, l), a]);
        },
        hsv(value) {
            const [h, s, l, a] = (0, seemly_1.hsla)(value);
            return (0, seemly_1.toHsvaString)([...(0, seemly_1.hsl2hsv)(h, s, l), a]);
        }
    },
    hsv: {
        hex(value) {
            const [h, s, v, a] = (0, seemly_1.hsva)(value);
            return (0, seemly_1.toHexaString)([...(0, seemly_1.hsv2rgb)(h, s, v), a]);
        },
        rgb(value) {
            const [h, s, v, a] = (0, seemly_1.hsva)(value);
            return (0, seemly_1.toRgbaString)([...(0, seemly_1.hsv2rgb)(h, s, v), a]);
        },
        hsl(value) {
            const [h, s, v, a] = (0, seemly_1.hsva)(value);
            return (0, seemly_1.toHslaString)([...(0, seemly_1.hsv2hsl)(h, s, v), a]);
        }
    }
};
// implementation
function convertColor(value, mode, originalMode) {
    originalMode = originalMode || getModeFromValue(value);
    if (!originalMode)
        return null;
    if (originalMode === mode)
        return value;
    const conversions = convert[originalMode];
    return conversions[mode](value);
}
