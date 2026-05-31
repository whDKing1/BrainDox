"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hsl2rgb = exports.rgb2hsl = exports.rgb2hsv = exports.hsv2rgb = exports.hsv2hsl = exports.hsl2hsv = void 0;
exports.hsla = hsla;
exports.hsva = hsva;
exports.rgba = rgba;
exports.composite = composite;
exports.changeColor = changeColor;
exports.scaleColor = scaleColor;
exports.getAlpha = getAlpha;
exports.getAlphaString = getAlphaString;
exports.roundAlpha = roundAlpha;
exports.roundDeg = roundDeg;
exports.roundChannel = roundChannel;
exports.roundPercent = roundPercent;
exports.toRgbString = toRgbString;
exports.toRgbaString = toRgbaString;
exports.toHsvString = toHsvString;
exports.toHsvaString = toHsvaString;
exports.toHslString = toHslString;
exports.toHslaString = toHslaString;
exports.toHexaString = toHexaString;
exports.toHexString = toHexString;
const colors_1 = require("./colors");
const convert_1 = require("./convert");
const prefix = '^\\s*';
const suffix = '\\s*$';
const percent = '\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))%\\s*'; // 4 offset
const float = '\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*'; // 4 offset
const hex = '([0-9A-Fa-f])';
const dhex = '([0-9A-Fa-f]{2})';
const hslRegex = new RegExp(`${prefix}hsl\\s*\\(${float},${percent},${percent}\\)${suffix}`);
const hsvRegex = new RegExp(`${prefix}hsv\\s*\\(${float},${percent},${percent}\\)${suffix}`);
const hslaRegex = new RegExp(`${prefix}hsla\\s*\\(${float},${percent},${percent},${float}\\)${suffix}`);
const hsvaRegex = new RegExp(`${prefix}hsva\\s*\\(${float},${percent},${percent},${float}\\)${suffix}`);
const rgbRegex = new RegExp(`${prefix}rgb\\s*\\(${float},${float},${float}\\)${suffix}`);
const rgbaRegex = new RegExp(`${prefix}rgba\\s*\\(${float},${float},${float},${float}\\)${suffix}`);
const sHexRegex = new RegExp(`${prefix}#${hex}${hex}${hex}${suffix}`);
const hexRegex = new RegExp(`${prefix}#${dhex}${dhex}${dhex}${suffix}`);
const sHexaRegex = new RegExp(`${prefix}#${hex}${hex}${hex}${hex}${suffix}`);
const hexaRegex = new RegExp(`${prefix}#${dhex}${dhex}${dhex}${dhex}${suffix}`);
function parseHex(value) {
    return parseInt(value, 16);
}
/**
 * Convert color string to hsla array
 * @param color format like hsl(180, 100%, 100%), hsla(180, 100%, 100%, 1)
 * @returns
 */
function hsla(color) {
    try {
        let i;
        if ((i = hslaRegex.exec(color))) {
            return [
                roundDeg(i[1]),
                roundPercent(i[5]),
                roundPercent(i[9]),
                roundAlpha(i[13])
            ];
        }
        else if ((i = hslRegex.exec(color))) {
            return [roundDeg(i[1]), roundPercent(i[5]), roundPercent(i[9]), 1];
        }
        throw new Error(`[seemly/hsla]: Invalid color value ${color}.`);
    }
    catch (e) {
        throw e;
    }
}
/**
 * Convert color string to hsva array
 * @param color format like hsv(180, 100%, 100%), hsva(180, 100%, 100%, 1)
 * @returns
 */
function hsva(color) {
    try {
        let i;
        if ((i = hsvaRegex.exec(color))) {
            return [
                roundDeg(i[1]),
                roundPercent(i[5]),
                roundPercent(i[9]),
                roundAlpha(i[13])
            ];
        }
        else if ((i = hsvRegex.exec(color))) {
            return [roundDeg(i[1]), roundPercent(i[5]), roundPercent(i[9]), 1];
        }
        throw new Error(`[seemly/hsva]: Invalid color value ${color}.`);
    }
    catch (e) {
        throw e;
    }
}
/**
 * Convert color string to rgba array.
 * @param color format like #000[0], #000000[00], rgb(0, 0, 0),
 * rgba(0, 0, 0, 0), hsl(a) color, hsv(a) color and color keywords and
 * transparent
 * @returns
 */
function rgba(color) {
    try {
        let i;
        if ((i = hexRegex.exec(color))) {
            return [parseHex(i[1]), parseHex(i[2]), parseHex(i[3]), 1];
        }
        else if ((i = rgbRegex.exec(color))) {
            return [roundChannel(i[1]), roundChannel(i[5]), roundChannel(i[9]), 1];
        }
        else if ((i = rgbaRegex.exec(color))) {
            return [
                roundChannel(i[1]),
                roundChannel(i[5]),
                roundChannel(i[9]),
                roundAlpha(i[13])
            ];
        }
        else if ((i = sHexRegex.exec(color))) {
            return [
                parseHex(i[1] + i[1]),
                parseHex(i[2] + i[2]),
                parseHex(i[3] + i[3]),
                1
            ];
        }
        else if ((i = hexaRegex.exec(color))) {
            return [
                parseHex(i[1]),
                parseHex(i[2]),
                parseHex(i[3]),
                roundAlpha(parseHex(i[4]) / 255)
            ];
        }
        else if ((i = sHexaRegex.exec(color))) {
            return [
                parseHex(i[1] + i[1]),
                parseHex(i[2] + i[2]),
                parseHex(i[3] + i[3]),
                roundAlpha(parseHex(i[4] + i[4]) / 255)
            ];
        }
        else if (color in colors_1.default) {
            return rgba(colors_1.default[color]);
        }
        else if (hslRegex.test(color) || hslaRegex.test(color)) {
            const [h, s, l, a] = hsla(color);
            return [...(0, convert_1.hsl2rgb)(h, s, l), a];
        }
        else if (hsvRegex.test(color) || hsvaRegex.test(color)) {
            const [h, s, v, a] = hsva(color);
            return [...(0, convert_1.hsv2rgb)(h, s, v), a];
        }
        throw new Error(`[seemly/rgba]: Invalid color value ${color}.`);
    }
    catch (e) {
        throw e;
    }
}
function normalizeAlpha(alphaValue) {
    return alphaValue > 1 ? 1 : alphaValue < 0 ? 0 : alphaValue;
}
function stringifyRgb(r, g, b) {
    return `rgb(${roundChannel(r)}, ${roundChannel(g)}, ${roundChannel(b)})`;
}
function stringifyRgba(r, g, b, a) {
    return `rgba(${roundChannel(r)}, ${roundChannel(g)}, ${roundChannel(b)}, ${normalizeAlpha(a)})`;
}
function compositeChannel(v1, a1, v2, a2, a) {
    return roundChannel((v1 * a1 * (1 - a2) + v2 * a2) / a);
}
function composite(background, overlay) {
    if (!Array.isArray(background))
        background = rgba(background);
    if (!Array.isArray(overlay))
        overlay = rgba(overlay);
    const a1 = background[3];
    const a2 = overlay[3];
    const alpha = roundAlpha(a1 + a2 - a1 * a2);
    return stringifyRgba(compositeChannel(background[0], a1, overlay[0], a2, alpha), compositeChannel(background[1], a1, overlay[1], a2, alpha), compositeChannel(background[2], a1, overlay[2], a2, alpha), alpha);
}
function changeColor(base, options) {
    const [r, g, b, a = 1] = Array.isArray(base) ? base : rgba(base);
    if (typeof options.alpha === 'number') {
        return stringifyRgba(r, g, b, options.alpha);
    }
    return stringifyRgba(r, g, b, a);
}
function scaleColor(base, options) {
    const [r, g, b, a = 1] = Array.isArray(base) ? base : rgba(base);
    const { lightness = 1, alpha = 1 } = options;
    return toRgbaString([r * lightness, g * lightness, b * lightness, a * alpha]);
}
function getAlpha(base) {
    var _a;
    const alpha = (_a = (Array.isArray(base) ? base : rgba(base))[3]) !== null && _a !== void 0 ? _a : 1;
    return alpha;
}
function getAlphaString(base) {
    return `${getAlpha(base)}`;
}
function roundAlpha(value) {
    const v = Math.round(Number(value) * 100) / 100;
    if (v > 1)
        return 1;
    if (v < 0)
        return 0;
    return v;
}
function roundDeg(value) {
    const v = Math.round(Number(value));
    if (v >= 360)
        return 0;
    if (v < 0)
        return 0;
    return v;
}
function roundChannel(value) {
    const v = Math.round(Number(value));
    if (v > 255)
        return 255;
    if (v < 0)
        return 0;
    return v;
}
function roundPercent(value) {
    const v = Math.round(Number(value));
    if (v > 100)
        return 100;
    if (v < 0)
        return 0;
    return v;
}
function toRgbString(base) {
    const [r, g, b] = Array.isArray(base) ? base : rgba(base);
    return stringifyRgb(r, g, b);
}
function toRgbaString(base) {
    const [r, g, b] = base;
    if (3 in base) {
        return `rgba(${roundChannel(r)}, ${roundChannel(g)}, ${roundChannel(b)}, ${roundAlpha(base[3])})`;
    }
    return `rgba(${roundChannel(r)}, ${roundChannel(g)}, ${roundChannel(b)}, 1)`;
}
function toHsvString(base) {
    return `hsv(${roundDeg(base[0])}, ${roundPercent(base[1])}%, ${roundPercent(base[2])}%)`;
}
function toHsvaString(base) {
    const [h, s, v] = base;
    if (3 in base) {
        return `hsva(${roundDeg(h)}, ${roundPercent(s)}%, ${roundPercent(v)}%, ${roundAlpha(base[3])})`;
    }
    return `hsva(${roundDeg(h)}, ${roundPercent(s)}%, ${roundPercent(v)}%, 1)`;
}
function toHslString(base) {
    return `hsl(${roundDeg(base[0])}, ${roundPercent(base[1])}%, ${roundPercent(base[2])}%)`;
}
function toHslaString(base) {
    const [h, s, l] = base;
    if (3 in base) {
        return `hsla(${roundDeg(h)}, ${roundPercent(s)}%, ${roundPercent(l)}%, ${roundAlpha(base[3])})`;
    }
    return `hsla(${roundDeg(h)}, ${roundPercent(s)}%, ${roundPercent(l)}%, 1)`;
}
/**
 *
 * @param base [255, 255, 255, 255], [255, 255, 255], any hex string
 * @returns
 */
function toHexaString(base) {
    if (typeof base === 'string') {
        let i;
        if (i = hexRegex.exec(base)) {
            return `${i[0]}FF`;
        }
        else if (i = hexaRegex.exec(base)) {
            return i[0];
        }
        else if (i = sHexRegex.exec(base)) {
            return `#${i[1]}${i[1]}${i[2]}${i[2]}${i[3]}${i[3]}FF`;
        }
        else if (i = sHexaRegex.exec(base)) {
            return `#${i[1]}${i[1]}${i[2]}${i[2]}${i[3]}${i[3]}${i[4]}${i[4]}`;
        }
        throw new Error(`[seemly/toHexString]: Invalid hex value ${base}.`);
    }
    const hex = `#${base
        .slice(0, 3)
        .map((unit) => roundChannel(unit).toString(16).toUpperCase().padStart(2, '0'))
        .join('')}`;
    const a = base.length === 3
        ? 'FF'
        : roundChannel(base[3] * 255)
            .toString(16)
            .padStart(2, '0')
            .toUpperCase();
    return hex + a;
}
/**
 *
 * @param base [255, 255, 255, 255], [255, 255, 255], any hex string
 * @returns
 */
function toHexString(base) {
    if (typeof base === 'string') {
        let i;
        if (i = hexRegex.exec(base)) {
            return i[0];
        }
        else if (i = hexaRegex.exec(base)) {
            return i[0].slice(0, 7);
        }
        else if (i = (sHexRegex.exec(base) || sHexaRegex.exec(base))) {
            return `#${i[1]}${i[1]}${i[2]}${i[2]}${i[3]}${i[3]}`;
        }
        throw new Error(`[seemly/toHexString]: Invalid hex value ${base}.`);
    }
    return `#${base
        .slice(0, 3)
        .map((unit) => roundChannel(unit).toString(16).toUpperCase().padStart(2, '0'))
        .join('')}`;
}
var convert_2 = require("./convert");
Object.defineProperty(exports, "hsl2hsv", { enumerable: true, get: function () { return convert_2.hsl2hsv; } });
Object.defineProperty(exports, "hsv2hsl", { enumerable: true, get: function () { return convert_2.hsv2hsl; } });
Object.defineProperty(exports, "hsv2rgb", { enumerable: true, get: function () { return convert_2.hsv2rgb; } });
Object.defineProperty(exports, "rgb2hsv", { enumerable: true, get: function () { return convert_2.rgb2hsv; } });
Object.defineProperty(exports, "rgb2hsl", { enumerable: true, get: function () { return convert_2.rgb2hsl; } });
Object.defineProperty(exports, "hsl2rgb", { enumerable: true, get: function () { return convert_2.hsl2rgb; } });
