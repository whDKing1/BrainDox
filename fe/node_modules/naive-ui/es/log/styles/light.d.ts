import type { ThemeCommonVars } from '../../_styles/common';
declare function self(vars: ThemeCommonVars): {
    loaderFontSize: string;
    loaderTextColor: string;
    loaderColor: string;
    loaderBorder: string;
    loadingColor: string;
};
export type LogThemeVars = ReturnType<typeof self>;
declare const logLight: import("../../_mixins").Theme<"Log", {
    loaderFontSize: string;
    loaderTextColor: string;
    loaderColor: string;
    loaderBorder: string;
    loadingColor: string;
}, {
    Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
        height: string;
        width: string;
        borderRadius: string;
        color: string;
        colorHover: string;
        railInsetHorizontalBottom: string;
        railInsetHorizontalTop: string;
        railInsetVerticalRight: string;
        railInsetVerticalLeft: string;
        railColor: string;
    }, any>;
    Code: import("../../_mixins").Theme<"Code", {
        textColor: string;
        fontSize: string;
        fontWeightStrong: string;
        'mono-3': string;
        'hue-1': string;
        'hue-2': string;
        'hue-3': string;
        'hue-4': string;
        'hue-5': string;
        'hue-5-2': string;
        'hue-6': string;
        'hue-6-2': string;
        lineNumberTextColor: string;
    }, any>;
}>;
export default logLight;
export type LogTheme = typeof logLight;
