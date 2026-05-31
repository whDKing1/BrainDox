import type { PropType } from 'vue';
import type { NotificationPlacement } from './NotificationProvider';
export declare const NotificationContainer: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    scrollable: {
        type: BooleanConstructor;
        required: true;
    };
    placement: {
        type: PropType<NotificationPlacement>;
        required: true;
    };
}>, {
    selfRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    mergedTheme: import("vue").Ref<{
        common: import("../..").ThemeCommonVars;
        self: {
            borderRadius: string;
            lineHeight: string;
            fontSize: string;
            headerFontWeight: string;
            iconColor: string;
            iconColorSuccess: string;
            iconColorInfo: string;
            iconColorWarning: string;
            iconColorError: string;
            color: string;
            textColor: string;
            closeIconColor: string;
            closeIconColorHover: string;
            closeIconColorPressed: string;
            closeBorderRadius: string;
            closeColorHover: string;
            closeColorPressed: string;
            headerTextColor: string;
            descriptionTextColor: string;
            actionTextColor: string;
            boxShadow: string;
            closeMargin: string;
            closeSize: string;
            closeIconSize: string;
            width: string;
            padding: string;
            titleFontSize: string;
            metaFontSize: string;
            descriptionFontSize: string;
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
            borderRadius: string;
            lineHeight: string;
            fontSize: string;
            headerFontWeight: string;
            iconColor: string;
            iconColorSuccess: string;
            iconColorInfo: string;
            iconColorWarning: string;
            iconColorError: string;
            color: string;
            textColor: string;
            closeIconColor: string;
            closeIconColorHover: string;
            closeIconColorPressed: string;
            closeBorderRadius: string;
            closeColorHover: string;
            closeColorPressed: string;
            headerTextColor: string;
            descriptionTextColor: string;
            actionTextColor: string;
            boxShadow: string;
            closeMargin: string;
            closeSize: string;
            closeIconSize: string;
            width: string;
            padding: string;
            titleFontSize: string;
            metaFontSize: string;
            descriptionFontSize: string;
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
    transitioning: import("vue").Ref<number, number>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    scrollable: {
        type: BooleanConstructor;
        required: true;
    };
    placement: {
        type: PropType<NotificationPlacement>;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
