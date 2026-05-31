declare const ellipsisLight: import("../../_mixins").Theme<"Ellipsis", unknown, {
    Tooltip: import("../../_mixins").Theme<"Tooltip", {
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
}>;
export default ellipsisLight;
export type EllipsisTheme = typeof ellipsisLight;
