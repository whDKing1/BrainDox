"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hsl2hsv = hsl2hsv;
exports.hsv2hsl = hsv2hsl;
exports.hsv2rgb = hsv2rgb;
exports.rgb2hsv = rgb2hsv;
exports.rgb2hsl = rgb2hsl;
exports.hsl2rgb = hsl2rgb;
// All the algorithms credit to https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex/54014428#54014428
// original author: Kamil Kiełczewski
/**
 * @param h 360
 * @param s 100
 * @param l 100
 * @returns [h, s, v] 360, 100, 100
 */
function hsl2hsv(h, s, l) {
    s /= 100;
    l /= 100;
    const v = s * Math.min(l, 1 - l) + l;
    return [h, v ? (2 - (2 * l) / v) * 100 : 0, v * 100];
}
/**
 * @param h 360
 * @param s 100
 * @param v 100
 * @returns [h, s, l] 360, 100, 100
 */
function hsv2hsl(h, s, v) {
    s /= 100;
    v /= 100;
    const l = v - (v * s) / 2;
    const m = Math.min(l, 1 - l);
    return [h, m ? ((v - l) / m) * 100 : 0, l * 100];
}
/**
 * @param h 360
 * @param s 100
 * @param v 100
 * @returns [r, g, b] 255, 255, 255
 */
function hsv2rgb(h, s, v) {
    s /= 100;
    v /= 100;
    let f = (n, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
    return [f(5) * 255, f(3) * 255, f(1) * 255];
}
/**
 * @param r 255
 * @param g 255
 * @param b 255
 * @returns [360, 100, 100]
 */
function rgb2hsv(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    let v = Math.max(r, g, b), c = v - Math.min(r, g, b);
    let h = c && (v == r ? (g - b) / c : v == g ? 2 + (b - r) / c : 4 + (r - g) / c);
    return [60 * (h < 0 ? h + 6 : h), v && (c / v) * 100, v * 100];
}
/**
 * @param r 255
 * @param g 255
 * @param b 255
 * @returns [360, 100, 100]
 */
function rgb2hsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    let v = Math.max(r, g, b), c = v - Math.min(r, g, b), f = 1 - Math.abs(v + v - c - 1);
    let h = c && (v == r ? (g - b) / c : v == g ? 2 + (b - r) / c : 4 + (r - g) / c);
    return [60 * (h < 0 ? h + 6 : h), f ? (c / f) * 100 : 0, (v + v - c) * 50];
}
/**
 * @param h 360
 * @param s 100
 * @param l 100
 * @returns [255, 255, 255]
 */
function hsl2rgb(h, s, l) {
    s /= 100;
    l /= 100;
    let a = s * Math.min(l, 1 - l);
    let f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return [f(0) * 255, f(8) * 255, f(4) * 255];
}
