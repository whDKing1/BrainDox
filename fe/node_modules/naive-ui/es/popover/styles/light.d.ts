import type { ThemeCommonVars } from '../../_styles/common';
export declare function self(vars: ThemeCommonVars): {
    fontSize: string;
    borderRadius: string;
    color: string;
    dividerColor: string;
    textColor: string;
    boxShadow: string;
    space: string;
    spaceArrow: string;
    arrowOffset: string;
    arrowOffsetVertical: string;
    arrowHeight: string;
    padding: string;
};
export type PopoverThemeVars = ReturnType<typeof self>;
declare const popoverLight: import("../../_mixins").Theme<"Popover", {
    fontSize: string;
    borderRadius: string;
    color: string;
    dividerColor: string;
    textColor: string;
    boxShadow: string;
    space: string;
    spaceArrow: string;
    arrowOffset: string;
    arrowOffsetVertical: string;
    arrowHeight: string;
    padding: string;
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
}>;
export type PopoverTheme = typeof popoverLight;
export default popoverLight;
