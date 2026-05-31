import type { Theme } from '../../_mixins';
import type { ThemeCommonVars } from '../../_styles/common';
export declare function self(vars: ThemeCommonVars): {
    fontSize: string;
    textColor: string;
    sizeTiny: string;
    sizeSmall: string;
    sizeMedium: string;
    sizeLarge: string;
    sizeHuge: string;
    color: string;
    opacitySpinning: string;
};
export type SpinThemeVars = ReturnType<typeof self>;
declare const spinLight: Theme<'Spin', SpinThemeVars>;
export default spinLight;
export type SpinTheme = typeof spinLight;
