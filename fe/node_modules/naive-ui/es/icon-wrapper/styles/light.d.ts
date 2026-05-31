import type { Theme } from '../../_mixins';
import type { ThemeCommonVars } from '../../_styles/common';
export declare function self(vars: ThemeCommonVars): {
    color: string;
    iconColor: string;
};
export type IconWrapperThemeVars = ReturnType<typeof self>;
declare const iconWrapperLight: Theme<'IconWrapper', IconWrapperThemeVars>;
export default iconWrapperLight;
export type IconWrapperTheme = typeof iconWrapperLight;
