import type { CSSProperties, PropType, SlotsType, VNode } from 'vue';
import type { ScrollbarProps } from '../../_internal';
import type { ExtractPublicPropTypes } from '../../_utils';
export declare const drawerContentProps: {
    title: StringConstructor;
    headerClass: StringConstructor;
    headerStyle: PropType<string | CSSProperties>;
    footerClass: StringConstructor;
    footerStyle: PropType<string | CSSProperties>;
    bodyClass: StringConstructor;
    bodyStyle: PropType<string | CSSProperties>;
    bodyContentClass: StringConstructor;
    bodyContentStyle: PropType<string | CSSProperties>;
    nativeScrollbar: {
        type: BooleanConstructor;
        default: boolean;
    };
    scrollbarProps: PropType<ScrollbarProps>;
    closable: BooleanConstructor;
};
export type DrawerContentProps = ExtractPublicPropTypes<typeof drawerContentProps>;
export interface DrawerContentSlots {
    default?: () => VNode[];
    header?: () => VNode[];
    footer?: () => VNode[];
}
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    title: StringConstructor;
    headerClass: StringConstructor;
    headerStyle: PropType<string | CSSProperties>;
    footerClass: StringConstructor;
    footerStyle: PropType<string | CSSProperties>;
    bodyClass: StringConstructor;
    bodyStyle: PropType<string | CSSProperties>;
    bodyContentClass: StringConstructor;
    bodyContentStyle: PropType<string | CSSProperties>;
    nativeScrollbar: {
        type: BooleanConstructor;
        default: boolean;
    };
    scrollbarProps: PropType<ScrollbarProps>;
    closable: BooleanConstructor;
}>, {
    handleCloseClick: () => void;
    mergedTheme: import("vue").Ref<{
        common: import("../..").ThemeCommonVars;
        self: {
            bodyPadding: string;
            borderRadius: string;
            headerPadding: string;
            footerPadding: string;
            color: string;
            textColor: string;
            titleTextColor: string;
            titleFontSize: string;
            titleFontWeight: string;
            boxShadow: string;
            lineHeight: string;
            headerBorderBottom: string;
            footerBorderTop: string;
            closeIconColor: string;
            closeIconColorHover: string;
            closeIconColorPressed: string;
            closeSize: string;
            closeIconSize: string;
            closeColorHover: string;
            closeColorPressed: string;
            closeBorderRadius: string;
            resizableTriggerColorHover: string;
        };
        peers: {
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
        };
        peerOverrides: {
            Scrollbar?: {
                peers?: {
                    [x: string]: any;
                } | undefined;
            } | undefined;
        };
    }, {
        common: import("../..").ThemeCommonVars;
        self: {
            bodyPadding: string;
            borderRadius: string;
            headerPadding: string;
            footerPadding: string;
            color: string;
            textColor: string;
            titleTextColor: string;
            titleFontSize: string;
            titleFontWeight: string;
            boxShadow: string;
            lineHeight: string;
            headerBorderBottom: string;
            footerBorderTop: string;
            closeIconColor: string;
            closeIconColorHover: string;
            closeIconColorPressed: string;
            closeSize: string;
            closeIconSize: string;
            closeColorHover: string;
            closeColorPressed: string;
            closeBorderRadius: string;
            resizableTriggerColorHover: string;
        };
        peers: {
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
        };
        peerOverrides: {
            Scrollbar?: {
                peers?: {
                    [x: string]: any;
                } | undefined;
            } | undefined;
        };
    }>;
    mergedClsPrefix: import("vue").Ref<string, string>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    title: StringConstructor;
    headerClass: StringConstructor;
    headerStyle: PropType<string | CSSProperties>;
    footerClass: StringConstructor;
    footerStyle: PropType<string | CSSProperties>;
    bodyClass: StringConstructor;
    bodyStyle: PropType<string | CSSProperties>;
    bodyContentClass: StringConstructor;
    bodyContentStyle: PropType<string | CSSProperties>;
    nativeScrollbar: {
        type: BooleanConstructor;
        default: boolean;
    };
    scrollbarProps: PropType<ScrollbarProps>;
    closable: BooleanConstructor;
}>> & Readonly<{}>, {
    closable: boolean;
    nativeScrollbar: boolean;
}, SlotsType<DrawerContentSlots>, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
