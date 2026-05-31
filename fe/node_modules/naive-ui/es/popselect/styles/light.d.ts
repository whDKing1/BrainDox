import type { ThemeCommonVars } from '../../config-provider';
export declare function self(vars: ThemeCommonVars): {
    menuBoxShadow: string;
};
declare const popselectLight: import("../../_mixins").Theme<"Popselect", {
    menuBoxShadow: string;
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
    InternalSelectMenu: import("../../_mixins").Theme<"InternalSelectMenu", {
        optionFontSizeTiny: string;
        optionFontSizeSmall: string;
        optionFontSizeMedium: string;
        optionFontSizeLarge: string;
        optionFontSizeHuge: string;
        optionHeightTiny: string;
        optionHeightSmall: string;
        optionHeightMedium: string;
        optionHeightLarge: string;
        optionHeightHuge: string;
        borderRadius: string;
        color: string;
        groupHeaderTextColor: string;
        actionDividerColor: string;
        optionTextColor: string;
        optionTextColorPressed: string;
        optionTextColorDisabled: string;
        optionTextColorActive: string;
        optionOpacityDisabled: string;
        optionCheckColor: string;
        optionColorPending: string;
        optionColorActive: string;
        optionColorActivePending: string;
        actionTextColor: string;
        loadingColor: string;
        height: string;
        paddingTiny: string;
        paddingSmall: string;
        paddingMedium: string;
        paddingLarge: string;
        paddingHuge: string;
        optionPaddingTiny: string;
        optionPaddingSmall: string;
        optionPaddingMedium: string;
        optionPaddingLarge: string;
        optionPaddingHuge: string;
        loadingSize: string;
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
        Empty: import("../../_mixins").Theme<"Empty", {
            fontSizeTiny: string;
            fontSizeSmall: string;
            fontSizeMedium: string;
            fontSizeLarge: string;
            fontSizeHuge: string;
            textColor: string;
            iconColor: string;
            extraTextColor: string;
            iconSizeTiny: string;
            iconSizeSmall: string;
            iconSizeMedium: string;
            iconSizeLarge: string;
            iconSizeHuge: string;
        }, any>;
    }>;
}>;
export interface PopselectThemeVars {
}
export default popselectLight;
export type PopselectTheme = typeof popselectLight;
