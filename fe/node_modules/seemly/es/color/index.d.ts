export type RGBA = [number, number, number, number];
export type RGB = [number, number, number];
export type HSLA = [number, number, number, number];
export type HSVA = [number, number, number, number];
export type HSL = [number, number, number];
export type HSV = [number, number, number];
/**
 * Convert color string to hsla array
 * @param color format like hsl(180, 100%, 100%), hsla(180, 100%, 100%, 1)
 * @returns
 */
export declare function hsla(color: string): HSLA;
/**
 * Convert color string to hsva array
 * @param color format like hsv(180, 100%, 100%), hsva(180, 100%, 100%, 1)
 * @returns
 */
export declare function hsva(color: string): HSLA;
/**
 * Convert color string to rgba array.
 * @param color format like #000[0], #000000[00], rgb(0, 0, 0),
 * rgba(0, 0, 0, 0), hsl(a) color, hsv(a) color and color keywords and
 * transparent
 * @returns
 */
export declare function rgba(color: string): RGBA;
export declare function composite(background: string | RGB | RGBA, overlay: string | RGB | RGBA): string;
export interface ChangeColorOptions {
    alpha?: number;
}
export declare function changeColor(base: string | RGB | RGBA, options: ChangeColorOptions): string;
export interface ScaleColorOptions {
    lightness?: number;
    alpha?: number;
}
export declare function scaleColor(base: string | RGB | RGBA, options: ScaleColorOptions): string;
export declare function getAlpha(base: string | RGB | RGBA): number;
export declare function getAlphaString(base: string | RGB | RGBA): string;
export declare function roundAlpha(value: number | string): number;
export declare function roundDeg(value: number | string): number;
export declare function roundChannel(value: number | string): number;
export declare function roundPercent(value: number | string): number;
export declare function toRgbString(base: string | RGB | RGBA): string;
export declare function toRgbaString(base: RGBA | RGB): string;
export declare function toHsvString(base: HSVA | HSV): string;
export declare function toHsvaString(base: HSVA | HSV): string;
export declare function toHslString(base: HSVA | HSV): string;
export declare function toHslaString(base: HSLA | HSL): string;
/**
 *
 * @param base [255, 255, 255, 255], [255, 255, 255], any hex string
 * @returns
 */
export declare function toHexaString(base: RGBA | RGB | string): string;
/**
 *
 * @param base [255, 255, 255, 255], [255, 255, 255], any hex string
 * @returns
 */
export declare function toHexString(base: RGBA | RGB | string): string;
export { hsl2hsv, hsv2hsl, hsv2rgb, rgb2hsv, rgb2hsl, hsl2rgb } from './convert';
