import type { CSSProperties, DirectiveArguments, PropType } from 'vue';
import type { ScrollbarProps } from '../../_internal';
export type Placement = 'left' | 'right' | 'top' | 'bottom';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    blockScroll: BooleanConstructor;
    show: {
        type: PropType<boolean | undefined>;
        default: undefined;
    };
    displayDirective: {
        type: PropType<"if" | "show">;
        required: true;
    };
    placement: {
        type: PropType<Placement>;
        required: true;
    };
    contentClass: StringConstructor;
    contentStyle: PropType<string | CSSProperties>;
    nativeScrollbar: {
        type: BooleanConstructor;
        required: true;
    };
    scrollbarProps: PropType<ScrollbarProps>;
    trapFocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    autoFocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    showMask: {
        type: PropType<boolean | "transparent">;
        required: true;
    };
    maxWidth: NumberConstructor;
    maxHeight: NumberConstructor;
    minWidth: NumberConstructor;
    minHeight: NumberConstructor;
    resizable: BooleanConstructor;
    onClickoutside: PropType<(e: MouseEvent) => void>;
    onAfterLeave: PropType<() => void>;
    onAfterEnter: PropType<() => void>;
    onEsc: PropType<(e: KeyboardEvent) => void>;
}>, {
    bodyRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    rtlEnabled: import("vue").Ref<import("../../config-provider/src/internal-interface").RtlItem | undefined, import("../../config-provider/src/internal-interface").RtlItem | undefined> | undefined;
    mergedClsPrefix: import("vue").Ref<string, string>;
    isMounted: import("vue").Ref<boolean, boolean>;
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
    displayed: import("vue").Ref<boolean, boolean>;
    transitionName: import("vue").ComputedRef<string>;
    handleAfterLeave: () => void;
    bodyDirectives: import("vue").ComputedRef<DirectiveArguments>;
    handleMousedownResizeTrigger: (e: MouseEvent) => void;
    handleMouseenterResizeTrigger: () => void;
    handleMouseleaveResizeTrigger: () => void;
    isDragging: import("vue").Ref<boolean, boolean>;
    isHoverOnResizeTrigger: import("vue").Ref<boolean, boolean>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    blockScroll: BooleanConstructor;
    show: {
        type: PropType<boolean | undefined>;
        default: undefined;
    };
    displayDirective: {
        type: PropType<"if" | "show">;
        required: true;
    };
    placement: {
        type: PropType<Placement>;
        required: true;
    };
    contentClass: StringConstructor;
    contentStyle: PropType<string | CSSProperties>;
    nativeScrollbar: {
        type: BooleanConstructor;
        required: true;
    };
    scrollbarProps: PropType<ScrollbarProps>;
    trapFocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    autoFocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    showMask: {
        type: PropType<boolean | "transparent">;
        required: true;
    };
    maxWidth: NumberConstructor;
    maxHeight: NumberConstructor;
    minWidth: NumberConstructor;
    minHeight: NumberConstructor;
    resizable: BooleanConstructor;
    onClickoutside: PropType<(e: MouseEvent) => void>;
    onAfterLeave: PropType<() => void>;
    onAfterEnter: PropType<() => void>;
    onEsc: PropType<(e: KeyboardEvent) => void>;
}>> & Readonly<{}>, {
    show: boolean | undefined;
    resizable: boolean;
    blockScroll: boolean;
    autoFocus: boolean;
    trapFocus: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
