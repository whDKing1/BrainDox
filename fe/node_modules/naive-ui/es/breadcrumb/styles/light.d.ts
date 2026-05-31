import type { Theme } from '../../_mixins';
import type { ThemeCommonVars } from '../../_styles/common';
export declare function self(vars: ThemeCommonVars): {
    fontSize: string;
    itemLineHeight: string;
    itemTextColor: string;
    itemTextColorHover: string;
    itemTextColorPressed: string;
    itemTextColorActive: string;
    itemBorderRadius: string;
    itemColorHover: string;
    itemColorPressed: string;
    separatorColor: string;
    fontWeightActive: string;
};
export type BreadcrumbThemeVars = ReturnType<typeof self>;
declare const breadcrumbLight: Theme<'Breadcrumb', BreadcrumbThemeVars>;
export default breadcrumbLight;
export type BreadcrumbTheme = typeof breadcrumbLight;
