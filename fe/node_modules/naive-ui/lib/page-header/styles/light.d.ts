import type { ThemeCommonVars } from '../../_styles/common';
export declare function self(vars: ThemeCommonVars): {
    titleFontWeight: string;
    fontSize: string;
    titleTextColor: string;
    backColor: string;
    backColorHover: string;
    backColorPressed: string;
    subtitleTextColor: string;
    titleFontSize: string;
    backSize: string;
};
export declare const pageHeaderLight: import("../../_mixins").Theme<"PageHeader", {
    titleFontWeight: string;
    fontSize: string;
    titleTextColor: string;
    backColor: string;
    backColorHover: string;
    backColorPressed: string;
    subtitleTextColor: string;
    titleFontSize: string;
    backSize: string;
}, unknown>;
export type PageHeaderThemeVars = ReturnType<typeof self>;
export type PageHeaderTheme = typeof pageHeaderLight;
