import { RGB, HSV, HSL } from '.';
/**
 * @param h 360
 * @param s 100
 * @param l 100
 * @returns [h, s, v] 360, 100, 100
 */
export declare function hsl2hsv(h: number, s: number, l: number): HSV;
/**
 * @param h 360
 * @param s 100
 * @param v 100
 * @returns [h, s, l] 360, 100, 100
 */
export declare function hsv2hsl(h: number, s: number, v: number): HSL;
/**
 * @param h 360
 * @param s 100
 * @param v 100
 * @returns [r, g, b] 255, 255, 255
 */
export declare function hsv2rgb(h: number, s: number, v: number): RGB;
/**
 * @param r 255
 * @param g 255
 * @param b 255
 * @returns [360, 100, 100]
 */
export declare function rgb2hsv(r: number, g: number, b: number): HSV;
/**
 * @param r 255
 * @param g 255
 * @param b 255
 * @returns [360, 100, 100]
 */
export declare function rgb2hsl(r: number, g: number, b: number): HSL;
/**
 * @param h 360
 * @param s 100
 * @param l 100
 * @returns [255, 255, 255]
 */
export declare function hsl2rgb(h: number, s: number, l: number): RGB;
