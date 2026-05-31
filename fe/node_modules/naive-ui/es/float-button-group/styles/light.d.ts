import type { Theme } from '../../_mixins';
import type { ThemeCommonVars } from '../../config-provider';
declare function self(vars: ThemeCommonVars): {
    color: string;
    buttonBorderColor: string;
    borderRadiusSquare: string;
    boxShadow: string;
};
export type FloatButtonGroupThemeVars = ReturnType<typeof self>;
declare const themeLight: Theme<'FloatButtonGroup', FloatButtonGroupThemeVars>;
export default themeLight;
export type FloatButtonGroupTheme = typeof themeLight;
