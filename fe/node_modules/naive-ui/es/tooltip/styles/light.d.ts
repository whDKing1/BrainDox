import type { ThemeCommonVars } from '../../_styles/common';
declare function self(vars: ThemeCommonVars): {
    borderRadius: string;
    boxShadow: string;
    color: string;
    textColor: string;
    padding: string;
};
export type TooltipThemeVars = ReturnType<typeof self>;
declare const tooltipLight: import("../../_mixins").Theme<"Tooltip", {
    borderRadius: string;
    boxShadow: string;
    color: string;
    textColor: string;
    padding: string;
}, {
    Popover: import("../../_mixins").Theme<"Popover", {
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
}>;
export default tooltipLight;
export type TooltipTheme = typeof tooltipLight;
