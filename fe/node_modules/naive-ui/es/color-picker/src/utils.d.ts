import type { HSLA, RGB } from 'seemly';
export type ColorPickerMode = 'rgb' | 'hsl' | 'hsv' | 'hex';
export type ActionType = 'confirm' | 'clear';
export declare function deriveDefaultValue(modes: ColorPickerMode[], showAlpha: boolean): string;
export declare function getModeFromValue(color: string | null): ColorPickerMode | null;
export declare function getWCAGContrast(hsla: HSLA, contrastColor?: RGB, level?: 'AA' | 'AAA'): boolean;
export declare function floor(color: number[]): number[];
export declare function normalizeHue(hue: number): number;
export declare function normalizeAlpha(alpha: number): number;
/**
 * Convert color value by mode
 */
export declare function convertColor(value: string, mode: ColorPickerMode, originalMode: ColorPickerMode): string;
export declare function convertColor(value: string, mode: ColorPickerMode, originalMode?: null): string | null;
