import type { Theme } from '../../_mixins';
import type { ThemeCommonVars } from '../../_styles/common';
export declare function self(vars: ThemeCommonVars): {
    resizableTriggerColorHover: string;
    resizableTriggerColor: string;
};
export type SplitThemeVars = ReturnType<typeof self>;
declare const themeLight: Theme<'Split', SplitThemeVars>;
export default themeLight;
export type SplitTheme = typeof themeLight;
