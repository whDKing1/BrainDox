import type { Theme } from '../../_mixins';
import type { ThemeCommonVars } from '../../_styles/common';
declare function self(vars: ThemeCommonVars): {
    itemColor: string;
    itemColorActive: string;
    sizeSmall: string;
    sizeMedium: string;
    sizeLarge: string;
};
export type RateThemeVars = ReturnType<typeof self>;
declare const themeLight: Theme<'Rate', RateThemeVars>;
export default themeLight;
export type RateTheme = typeof themeLight;
