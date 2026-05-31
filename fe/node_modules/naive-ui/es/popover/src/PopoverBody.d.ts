import type { CSSProperties, PropType, VNode } from 'vue';
import type { FollowerInst, FollowerPlacement } from 'vueuc';
import type { PopoverTrigger } from './interface';
export declare const popoverBodyProps: {
    to: {
        type: PropType<HTMLElement | string | boolean>;
        default: undefined;
    };
    show: BooleanConstructor;
    trigger: PropType<PopoverTrigger>;
    showArrow: BooleanConstructor;
    delay: NumberConstructor;
    duration: NumberConstructor;
    raw: BooleanConstructor;
    arrowPointToCenter: BooleanConstructor;
    arrowClass: StringConstructor;
    arrowStyle: PropType<string | CSSProperties>;
    arrowWrapperClass: StringConstructor;
    arrowWrapperStyle: PropType<string | CSSProperties>;
    displayDirective: PropType<"if" | "show">;
    x: NumberConstructor;
    y: NumberConstructor;
    flip: BooleanConstructor;
    overlap: BooleanConstructor;
    placement: PropType<FollowerPlacement>;
    width: PropType<number | "trigger">;
    keepAliveOnHover: BooleanConstructor;
    scrollable: BooleanConstructor;
    contentClass: StringConstructor;
    contentStyle: PropType<CSSProperties | string>;
    headerClass: StringConstructor;
    headerStyle: PropType<CSSProperties | string>;
    footerClass: StringConstructor;
    footerStyle: PropType<CSSProperties | string>;
    internalDeactivateImmediately: BooleanConstructor;
    animated: BooleanConstructor;
    onClickoutside: PropType<(e: MouseEvent) => void>;
    internalTrapFocus: BooleanConstructor;
    internalOnAfterLeave: PropType<() => void>;
    minWidth: NumberConstructor;
    maxWidth: NumberConstructor;
    theme: PropType<import("../../_mixins").Theme<"Popover", {
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
    }>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Popover", {
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
    }>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Popover", {
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
    }>>>;
};
interface RenderArrowProps {
    arrowClass: string | undefined;
    arrowStyle: string | CSSProperties | undefined;
    arrowWrapperClass: string | undefined;
    arrowWrapperStyle: string | CSSProperties | undefined;
    clsPrefix: string;
}
export declare function renderArrow({ arrowClass, arrowStyle, arrowWrapperClass, arrowWrapperStyle, clsPrefix }: RenderArrowProps): VNode | null;
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    to: {
        type: PropType<HTMLElement | string | boolean>;
        default: undefined;
    };
    show: BooleanConstructor;
    trigger: PropType<PopoverTrigger>;
    showArrow: BooleanConstructor;
    delay: NumberConstructor;
    duration: NumberConstructor;
    raw: BooleanConstructor;
    arrowPointToCenter: BooleanConstructor;
    arrowClass: StringConstructor;
    arrowStyle: PropType<string | CSSProperties>;
    arrowWrapperClass: StringConstructor;
    arrowWrapperStyle: PropType<string | CSSProperties>;
    displayDirective: PropType<"if" | "show">;
    x: NumberConstructor;
    y: NumberConstructor;
    flip: BooleanConstructor;
    overlap: BooleanConstructor;
    placement: PropType<FollowerPlacement>;
    width: PropType<number | "trigger">;
    keepAliveOnHover: BooleanConstructor;
    scrollable: BooleanConstructor;
    contentClass: StringConstructor;
    contentStyle: PropType<CSSProperties | string>;
    headerClass: StringConstructor;
    headerStyle: PropType<CSSProperties | string>;
    footerClass: StringConstructor;
    footerStyle: PropType<CSSProperties | string>;
    internalDeactivateImmediately: BooleanConstructor;
    animated: BooleanConstructor;
    onClickoutside: PropType<(e: MouseEvent) => void>;
    internalTrapFocus: BooleanConstructor;
    internalOnAfterLeave: PropType<() => void>;
    minWidth: NumberConstructor;
    maxWidth: NumberConstructor;
    theme: PropType<import("../../_mixins").Theme<"Popover", {
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
    }>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Popover", {
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
    }>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Popover", {
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
    }>>>;
}>, {
    displayed: import("vue").Ref<boolean, boolean>;
    namespace: import("vue").ComputedRef<string | undefined>;
    isMounted: import("vue").Ref<boolean, boolean>;
    zIndex: import("vue").Ref<number | undefined, number | undefined>;
    followerRef: import("vue").Ref<{
        syncPosition: () => void;
    } | null, FollowerInst | {
        syncPosition: () => void;
    } | null>;
    adjustedTo: import("vue").ComputedRef<string | HTMLElement>;
    followerEnabled: import("vue").Ref<boolean, boolean>;
    renderContentNode: () => VNode | null;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    to: {
        type: PropType<HTMLElement | string | boolean>;
        default: undefined;
    };
    show: BooleanConstructor;
    trigger: PropType<PopoverTrigger>;
    showArrow: BooleanConstructor;
    delay: NumberConstructor;
    duration: NumberConstructor;
    raw: BooleanConstructor;
    arrowPointToCenter: BooleanConstructor;
    arrowClass: StringConstructor;
    arrowStyle: PropType<string | CSSProperties>;
    arrowWrapperClass: StringConstructor;
    arrowWrapperStyle: PropType<string | CSSProperties>;
    displayDirective: PropType<"if" | "show">;
    x: NumberConstructor;
    y: NumberConstructor;
    flip: BooleanConstructor;
    overlap: BooleanConstructor;
    placement: PropType<FollowerPlacement>;
    width: PropType<number | "trigger">;
    keepAliveOnHover: BooleanConstructor;
    scrollable: BooleanConstructor;
    contentClass: StringConstructor;
    contentStyle: PropType<CSSProperties | string>;
    headerClass: StringConstructor;
    headerStyle: PropType<CSSProperties | string>;
    footerClass: StringConstructor;
    footerStyle: PropType<CSSProperties | string>;
    internalDeactivateImmediately: BooleanConstructor;
    animated: BooleanConstructor;
    onClickoutside: PropType<(e: MouseEvent) => void>;
    internalTrapFocus: BooleanConstructor;
    internalOnAfterLeave: PropType<() => void>;
    minWidth: NumberConstructor;
    maxWidth: NumberConstructor;
    theme: PropType<import("../../_mixins").Theme<"Popover", {
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
    }>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Popover", {
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
    }>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Popover", {
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
    }>>>;
}>> & Readonly<{}>, {
    raw: boolean;
    scrollable: boolean;
    to: string | boolean | HTMLElement;
    show: boolean;
    showArrow: boolean;
    arrowPointToCenter: boolean;
    flip: boolean;
    animated: boolean;
    overlap: boolean;
    keepAliveOnHover: boolean;
    internalDeactivateImmediately: boolean;
    internalTrapFocus: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
