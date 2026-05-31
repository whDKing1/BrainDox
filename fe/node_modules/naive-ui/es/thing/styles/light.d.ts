import type { Theme } from '../../_mixins';
import type { ThemeCommonVars } from '../../_styles/common';
export declare function self(vars: ThemeCommonVars): {
    fontSize: string;
    titleTextColor: string;
    textColor: string;
    titleFontWeight: string;
};
export type ThingThemeVars = ReturnType<typeof self>;
declare const thingLight: Theme<'Thing', ThingThemeVars>;
export default thingLight;
export type ThingTheme = typeof thingLight;
