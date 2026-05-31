import colors from './colors';
import { hsl2rgb, hsv2rgb } from './convert';
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
export function hsla(color) {
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
export function hsva(color) {
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
export function rgba(color) {
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
        else if (color in colors) {
            return rgba(colors[color]);
        }
        else if (hslRegex.test(color) || hslaRegex.test(color)) {
            const [h, s, l, a] = hsla(color);
            return [...hsl2rgb(h, s, l), a];
        }
        else if (hsvRegex.test(color) || hsvaRegex.test(color)) {
            const [h, s, v, a] = hsva(color);
            return [...hsv2rgb(h, s, v), a];
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
export function composite(background, overlay) {
    if (!Array.isArray(background))
        background = rgba(background);
    if (!Array.isArray(overlay))
        overlay = rgba(overlay);
    const a1 = background[3];
    const a2 = overlay[3];
    const alpha = roundAlpha(a1 + a2 - a1 * a2);
    return stringifyRgba(compositeChannel(background[0], a1, overlay[0], a2, alpha), compositeChannel(background[1], a1, overlay[1], a2, alpha), compositeChannel(background[2], a1, overlay[2], a2, alpha), alpha);
}
export function changeColor(base, options) {
    const [r, g, b, a = 1] = Array.isArray(base) ? base : rgba(base);
    if (typeof options.alpha === 'number') {
        return stringifyRgba(r, g, b, options.alpha);
    }
    return stringifyRgba(r, g, b, a);
}
export function scaleColor(base, options) {
    const [r, g, b, a = 1] = Array.isArray(base) ? base : rgba(base);
    const { lightness = 1, alpha = 1 } = options;
    return toRgbaString([r * lightness, g * lightness, b * lightness, a * alpha]);
}
export function getAlpha(base) {
    var _a;
    const alpha = (_a = (Array.isArray(base) ? base : rgba(base))[3]) !== null && _a !== void 0 ? _a : 1;
    return alpha;
}
export function getAlphaString(base) {
    return `${getAlpha(base)}`;
}
export function roundAlpha(value) {
    const v = Math.round(Number(value) * 100) / 100;
    if (v > 1)
        return 1;
    if (v < 0)
        return 0;
    return v;
}
export function roundDeg(value) {
    const v = Math.round(Number(value));
    if (v >= 360)
        return 0;
    if (v < 0)
        return 0;
    return v;
}
export function roundChannel(value) {
    const v = Math.round(Number(value));
    if (v > 255)
        return 255;
    if (v < 0)
        return 0;
    return v;
}
export function roundPercent(value) {
    const v = Math.round(Number(value));
    if (v > 100)
        return 100;
    if (v < 0)
        return 0;
    return v;
}
export function toRgbString(base) {
    const [r, g, b] = Array.isArray(base) ? base : rgba(base);
    return stringifyRgb(r, g, b);
}
export function toRgbaString(base) {
    const [r, g, b] = base;
    if (3 in base) {
        return `rgba(${roundChannel(r)}, ${roundChannel(g)}, ${roundChannel(b)}, ${roundAlpha(base[3])})`;
    }
    return `rgba(${roundChannel(r)}, ${roundChannel(g)}, ${roundChannel(b)}, 1)`;
}
export function toHsvString(base) {
    return `hsv(${roundDeg(base[0])}, ${roundPercent(base[1])}%, ${roundPercent(base[2])}%)`;
}
export function toHsvaString(base) {
    const [h, s, v] = base;
    if (3 in base) {
        return `hsva(${roundDeg(h)}, ${roundPercent(s)}%, ${roundPercent(v)}%, ${roundAlpha(base[3])})`;
    }
    return `hsva(${roundDeg(h)}, ${roundPercent(s)}%, ${roundPercent(v)}%, 1)`;
}
export function toHslString(base) {
    return `hsl(${roundDeg(base[0])}, ${roundPercent(base[1])}%, ${roundPercent(base[2])}%)`;
}
export function toHslaString(base) {
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
export function toHexaString(base) {
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
export function toHexString(base) {
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
export { hsl2hsv, hsv2hsl, hsv2rgb, rgb2hsv, rgb2hsl, hsl2rgb } from './convert';
