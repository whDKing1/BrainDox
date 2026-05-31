import type { CSSProperties, PropType } from 'vue';
import type { ScrollbarProps } from '../../_internal';
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils';
import type { Placement } from './DrawerBodyWrapper';
export declare const drawerProps: {
    readonly show: BooleanConstructor;
    readonly width: PropType<string | number>;
    readonly height: PropType<string | number>;
    readonly placement: {
        readonly type: PropType<Placement>;
        readonly default: "right";
    };
    readonly maskClosable: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly showMask: {
        readonly type: PropType<boolean | "transparent">;
        readonly default: true;
    };
    readonly to: PropType<string | HTMLElement>;
    readonly displayDirective: {
        readonly type: PropType<"if" | "show">;
        readonly default: "if";
    };
    readonly nativeScrollbar: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly zIndex: NumberConstructor;
    readonly onMaskClick: PropType<(e: MouseEvent) => void>;
    readonly scrollbarProps: PropType<ScrollbarProps>;
    readonly contentClass: StringConstructor;
    readonly contentStyle: PropType<string | CSSProperties>;
    readonly trapFocus: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly onEsc: PropType<() => void>;
    readonly autoFocus: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly closeOnEsc: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly blockScroll: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly maxWidth: NumberConstructor;
    readonly maxHeight: NumberConstructor;
    readonly minWidth: NumberConstructor;
    readonly minHeight: NumberConstructor;
    readonly resizable: BooleanConstructor;
    readonly defaultWidth: {
        readonly type: PropType<string | number>;
        readonly default: 251;
    };
    readonly defaultHeight: {
        readonly type: PropType<string | number>;
        readonly default: 251;
    };
    readonly onUpdateWidth: PropType<MaybeArray<(value: number) => void>>;
    readonly onUpdateHeight: PropType<MaybeArray<(value: number) => void>>;
    readonly 'onUpdate:width': PropType<MaybeArray<(value: number) => void>>;
    readonly 'onUpdate:height': PropType<MaybeArray<(value: number) => void>>;
    readonly 'onUpdate:show': PropType<MaybeArray<(value: boolean) => void>>;
    readonly onUpdateShow: PropType<MaybeArray<(value: boolean) => void>>;
    readonly onAfterEnter: PropType<() => void>;
    readonly onAfterLeave: PropType<() => void>;
    /** @deprecated */
    readonly drawerStyle: PropType<string | CSSProperties>;
    readonly drawerClass: StringConstructor;
    readonly target: null;
    readonly onShow: PropType<(value: boolean) => void>;
    readonly onHide: PropType<(value: boolean) => void>;
    readonly theme: PropType<import("../../_mixins").Theme<"Drawer", {
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
    }>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Drawer", {
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
    }>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Drawer", {
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
    }>>>;
};
export type DrawerProps = ExtractPublicPropTypes<typeof drawerProps>;
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly show: BooleanConstructor;
    readonly width: PropType<string | number>;
    readonly height: PropType<string | number>;
    readonly placement: {
        readonly type: PropType<Placement>;
        readonly default: "right";
    };
    readonly maskClosable: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly showMask: {
        readonly type: PropType<boolean | "transparent">;
        readonly default: true;
    };
    readonly to: PropType<string | HTMLElement>;
    readonly displayDirective: {
        readonly type: PropType<"if" | "show">;
        readonly default: "if";
    };
    readonly nativeScrollbar: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly zIndex: NumberConstructor;
    readonly onMaskClick: PropType<(e: MouseEvent) => void>;
    readonly scrollbarProps: PropType<ScrollbarProps>;
    readonly contentClass: StringConstructor;
    readonly contentStyle: PropType<string | CSSProperties>;
    readonly trapFocus: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly onEsc: PropType<() => void>;
    readonly autoFocus: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly closeOnEsc: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly blockScroll: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly maxWidth: NumberConstructor;
    readonly maxHeight: NumberConstructor;
    readonly minWidth: NumberConstructor;
    readonly minHeight: NumberConstructor;
    readonly resizable: BooleanConstructor;
    readonly defaultWidth: {
        readonly type: PropType<string | number>;
        readonly default: 251;
    };
    readonly defaultHeight: {
        readonly type: PropType<string | number>;
        readonly default: 251;
    };
    readonly onUpdateWidth: PropType<MaybeArray<(value: number) => void>>;
    readonly onUpdateHeight: PropType<MaybeArray<(value: number) => void>>;
    readonly 'onUpdate:width': PropType<MaybeArray<(value: number) => void>>;
    readonly 'onUpdate:height': PropType<MaybeArray<(value: number) => void>>;
    readonly 'onUpdate:show': PropType<MaybeArray<(value: boolean) => void>>;
    readonly onUpdateShow: PropType<MaybeArray<(value: boolean) => void>>;
    readonly onAfterEnter: PropType<() => void>;
    readonly onAfterLeave: PropType<() => void>;
    /** @deprecated */
    readonly drawerStyle: PropType<string | CSSProperties>;
    readonly drawerClass: StringConstructor;
    readonly target: null;
    readonly onShow: PropType<(value: boolean) => void>;
    readonly onHide: PropType<(value: boolean) => void>;
    readonly theme: PropType<import("../../_mixins").Theme<"Drawer", {
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
    }>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Drawer", {
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
    }>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Drawer", {
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
    }>>>;
}>, {
    mergedClsPrefix: import("vue").Ref<string, string>;
    namespace: import("vue").ComputedRef<string | undefined>;
    mergedBodyStyle: import("vue").ComputedRef<(string | CSSProperties)[]>;
    handleOutsideClick: (e: MouseEvent) => void;
    handleMaskClick: (e: MouseEvent) => void;
    handleEsc: (e: KeyboardEvent) => void;
    mergedTheme: import("vue").ComputedRef<{
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
    cssVars: import("vue").ComputedRef<{
        '--n-line-height': string;
        '--n-color': string;
        '--n-border-radius': string;
        '--n-text-color': string;
        '--n-box-shadow': string;
        '--n-bezier': string;
        '--n-bezier-out': string;
        '--n-bezier-in': string;
        '--n-header-padding': string;
        '--n-body-padding': string;
        '--n-footer-padding': string;
        '--n-title-text-color': string;
        '--n-title-font-size': string;
        '--n-title-font-weight': string;
        '--n-header-border-bottom': string;
        '--n-footer-border-top': string;
        '--n-close-icon-color': string;
        '--n-close-icon-color-hover': string;
        '--n-close-icon-color-pressed': string;
        '--n-close-size': string;
        '--n-close-color-hover': string;
        '--n-close-color-pressed': string;
        '--n-close-icon-size': string;
        '--n-close-border-radius': string;
        '--n-resize-trigger-color-hover': string;
    }> | undefined;
    themeClass: import("vue").Ref<string, string> | undefined;
    onRender: (() => void) | undefined;
    isMounted: Readonly<import("vue").Ref<boolean, boolean>>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly show: BooleanConstructor;
    readonly width: PropType<string | number>;
    readonly height: PropType<string | number>;
    readonly placement: {
        readonly type: PropType<Placement>;
        readonly default: "right";
    };
    readonly maskClosable: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly showMask: {
        readonly type: PropType<boolean | "transparent">;
        readonly default: true;
    };
    readonly to: PropType<string | HTMLElement>;
    readonly displayDirective: {
        readonly type: PropType<"if" | "show">;
        readonly default: "if";
    };
    readonly nativeScrollbar: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly zIndex: NumberConstructor;
    readonly onMaskClick: PropType<(e: MouseEvent) => void>;
    readonly scrollbarProps: PropType<ScrollbarProps>;
    readonly contentClass: StringConstructor;
    readonly contentStyle: PropType<string | CSSProperties>;
    readonly trapFocus: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly onEsc: PropType<() => void>;
    readonly autoFocus: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly closeOnEsc: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly blockScroll: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly maxWidth: NumberConstructor;
    readonly maxHeight: NumberConstructor;
    readonly minWidth: NumberConstructor;
    readonly minHeight: NumberConstructor;
    readonly resizable: BooleanConstructor;
    readonly defaultWidth: {
        readonly type: PropType<string | number>;
        readonly default: 251;
    };
    readonly defaultHeight: {
        readonly type: PropType<string | number>;
        readonly default: 251;
    };
    readonly onUpdateWidth: PropType<MaybeArray<(value: number) => void>>;
    readonly onUpdateHeight: PropType<MaybeArray<(value: number) => void>>;
    readonly 'onUpdate:width': PropType<MaybeArray<(value: number) => void>>;
    readonly 'onUpdate:height': PropType<MaybeArray<(value: number) => void>>;
    readonly 'onUpdate:show': PropType<MaybeArray<(value: boolean) => void>>;
    readonly onUpdateShow: PropType<MaybeArray<(value: boolean) => void>>;
    readonly onAfterEnter: PropType<() => void>;
    readonly onAfterLeave: PropType<() => void>;
    /** @deprecated */
    readonly drawerStyle: PropType<string | CSSProperties>;
    readonly drawerClass: StringConstructor;
    readonly target: null;
    readonly onShow: PropType<(value: boolean) => void>;
    readonly onHide: PropType<(value: boolean) => void>;
    readonly theme: PropType<import("../../_mixins").Theme<"Drawer", {
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
    }>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Drawer", {
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
    }>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Drawer", {
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
    }>>>;
}>> & Readonly<{}>, {
    readonly placement: Placement;
    readonly show: boolean;
    readonly displayDirective: "show" | "if";
    readonly resizable: boolean;
    readonly blockScroll: boolean;
    readonly closeOnEsc: boolean;
    readonly autoFocus: boolean;
    readonly maskClosable: boolean;
    readonly showMask: boolean | "transparent";
    readonly nativeScrollbar: boolean;
    readonly trapFocus: boolean;
    readonly defaultWidth: string | number;
    readonly defaultHeight: string | number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
