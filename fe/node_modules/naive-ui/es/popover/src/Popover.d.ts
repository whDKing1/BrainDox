import type { ComputedRef, CSSProperties, PropType, Ref, SlotsType, VNode } from 'vue';
import type { BinderInst, FollowerPlacement } from 'vueuc';
import type { ExtractInternalPropTypes, ExtractPublicPropTypes, MaybeArray } from '../../_utils';
import type { InternalRenderBody, PopoverTrigger } from './interface';
export interface TriggerEventHandlers {
    onClick: (e: MouseEvent) => void;
    onMouseenter: (e: MouseEvent) => void;
    onMouseleave: (e: MouseEvent) => void;
    onFocus: (e: FocusEvent) => void;
    onBlur: (e: FocusEvent) => void;
}
interface BodyInstance {
    syncPosition: () => void;
    [key: string]: unknown;
}
export interface PopoverInjection {
    handleMouseLeave: (e: MouseEvent) => void;
    handleMouseEnter: (e: MouseEvent) => void;
    handleMouseMoveOutside: (e: MouseEvent) => void;
    handleClickOutside: (e: MouseEvent) => void;
    handleKeydown: (e: KeyboardEvent) => void;
    getTriggerElement: () => HTMLElement;
    setBodyInstance: (value: BodyInstance | null) => void;
    zIndexRef: Ref<number | undefined>;
    internalRenderBodyRef: Ref<InternalRenderBody | undefined>;
    positionManuallyRef: ComputedRef<boolean>;
    isMountedRef: Ref<boolean>;
    extraClassRef: Ref<string[]>;
}
export declare const popoverBaseProps: {
    show: {
        type: PropType<boolean | undefined>;
        default: undefined;
    };
    defaultShow: BooleanConstructor;
    showArrow: {
        type: BooleanConstructor;
        default: boolean;
    };
    trigger: {
        type: PropType<PopoverTrigger>;
        default: string;
    };
    delay: {
        type: NumberConstructor;
        default: number;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    raw: BooleanConstructor;
    placement: {
        type: PropType<FollowerPlacement>;
        default: string;
    };
    x: NumberConstructor;
    y: NumberConstructor;
    arrowPointToCenter: BooleanConstructor;
    disabled: BooleanConstructor;
    getDisabled: PropType<() => boolean>;
    displayDirective: {
        type: PropType<"if" | "show">;
        default: string;
    };
    arrowClass: StringConstructor;
    arrowStyle: PropType<string | CSSProperties>;
    arrowWrapperClass: StringConstructor;
    arrowWrapperStyle: PropType<string | CSSProperties>;
    flip: {
        type: BooleanConstructor;
        default: boolean;
    };
    animated: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: PropType<number | "trigger">;
        default: undefined;
    };
    overlap: BooleanConstructor;
    keepAliveOnHover: {
        type: BooleanConstructor;
        default: boolean;
    };
    zIndex: NumberConstructor;
    to: {
        type: PropType<HTMLElement | string | boolean>;
        default: undefined;
    };
    scrollable: BooleanConstructor;
    contentClass: StringConstructor;
    contentStyle: PropType<CSSProperties | string>;
    headerClass: StringConstructor;
    headerStyle: PropType<CSSProperties | string>;
    footerClass: StringConstructor;
    footerStyle: PropType<CSSProperties | string>;
    onClickoutside: PropType<(e: MouseEvent) => void>;
    'onUpdate:show': PropType<MaybeArray<(value: boolean) => void>>;
    onUpdateShow: PropType<MaybeArray<(value: boolean) => void>>;
    internalDeactivateImmediately: BooleanConstructor;
    internalSyncTargetWithParent: BooleanConstructor;
    internalInheritedEventHandlers: {
        type: PropType<TriggerEventHandlers[]>;
        default: () => never[];
    };
    internalTrapFocus: BooleanConstructor;
    internalExtraClass: {
        type: PropType<string[]>;
        default: () => never[];
    };
    onShow: PropType<MaybeArray<(value: boolean) => void> | undefined>;
    onHide: PropType<MaybeArray<(value: boolean) => void> | undefined>;
    arrow: {
        type: PropType<boolean | undefined>;
        default: undefined;
    };
    minWidth: NumberConstructor;
    maxWidth: NumberConstructor;
};
export declare const popoverProps: {
    internalOnAfterLeave: PropType<() => void>;
    internalRenderBody: PropType<InternalRenderBody>;
    show: {
        type: PropType<boolean | undefined>;
        default: undefined;
    };
    defaultShow: BooleanConstructor;
    showArrow: {
        type: BooleanConstructor;
        default: boolean;
    };
    trigger: {
        type: PropType<PopoverTrigger>;
        default: string;
    };
    delay: {
        type: NumberConstructor;
        default: number;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    raw: BooleanConstructor;
    placement: {
        type: PropType<FollowerPlacement>;
        default: string;
    };
    x: NumberConstructor;
    y: NumberConstructor;
    arrowPointToCenter: BooleanConstructor;
    disabled: BooleanConstructor;
    getDisabled: PropType<() => boolean>;
    displayDirective: {
        type: PropType<"if" | "show">;
        default: string;
    };
    arrowClass: StringConstructor;
    arrowStyle: PropType<string | CSSProperties>;
    arrowWrapperClass: StringConstructor;
    arrowWrapperStyle: PropType<string | CSSProperties>;
    flip: {
        type: BooleanConstructor;
        default: boolean;
    };
    animated: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: PropType<number | "trigger">;
        default: undefined;
    };
    overlap: BooleanConstructor;
    keepAliveOnHover: {
        type: BooleanConstructor;
        default: boolean;
    };
    zIndex: NumberConstructor;
    to: {
        type: PropType<HTMLElement | string | boolean>;
        default: undefined;
    };
    scrollable: BooleanConstructor;
    contentClass: StringConstructor;
    contentStyle: PropType<CSSProperties | string>;
    headerClass: StringConstructor;
    headerStyle: PropType<CSSProperties | string>;
    footerClass: StringConstructor;
    footerStyle: PropType<CSSProperties | string>;
    onClickoutside: PropType<(e: MouseEvent) => void>;
    'onUpdate:show': PropType<MaybeArray<(value: boolean) => void>>;
    onUpdateShow: PropType<MaybeArray<(value: boolean) => void>>;
    internalDeactivateImmediately: BooleanConstructor;
    internalSyncTargetWithParent: BooleanConstructor;
    internalInheritedEventHandlers: {
        type: PropType<TriggerEventHandlers[]>;
        default: () => never[];
    };
    internalTrapFocus: BooleanConstructor;
    internalExtraClass: {
        type: PropType<string[]>;
        default: () => never[];
    };
    onShow: PropType<MaybeArray<(value: boolean) => void> | undefined>;
    onHide: PropType<MaybeArray<(value: boolean) => void> | undefined>;
    arrow: {
        type: PropType<boolean | undefined>;
        default: undefined;
    };
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
export type PopoverProps = ExtractPublicPropTypes<typeof popoverBaseProps>;
export type PopoverInternalProps = ExtractInternalPropTypes<typeof popoverProps>;
export interface PopoverSlots {
    trigger?: () => VNode[];
    footer?: () => VNode[];
    header?: () => VNode[];
    default?: () => VNode[];
}
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    internalOnAfterLeave: PropType<() => void>;
    internalRenderBody: PropType<InternalRenderBody>;
    show: {
        type: PropType<boolean | undefined>;
        default: undefined;
    };
    defaultShow: BooleanConstructor;
    showArrow: {
        type: BooleanConstructor;
        default: boolean;
    };
    trigger: {
        type: PropType<PopoverTrigger>;
        default: string;
    };
    delay: {
        type: NumberConstructor;
        default: number;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    raw: BooleanConstructor;
    placement: {
        type: PropType<FollowerPlacement>;
        default: string;
    };
    x: NumberConstructor;
    y: NumberConstructor;
    arrowPointToCenter: BooleanConstructor;
    disabled: BooleanConstructor;
    getDisabled: PropType<() => boolean>;
    displayDirective: {
        type: PropType<"if" | "show">;
        default: string;
    };
    arrowClass: StringConstructor;
    arrowStyle: PropType<string | CSSProperties>;
    arrowWrapperClass: StringConstructor;
    arrowWrapperStyle: PropType<string | CSSProperties>;
    flip: {
        type: BooleanConstructor;
        default: boolean;
    };
    animated: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: PropType<number | "trigger">;
        default: undefined;
    };
    overlap: BooleanConstructor;
    keepAliveOnHover: {
        type: BooleanConstructor;
        default: boolean;
    };
    zIndex: NumberConstructor;
    to: {
        type: PropType<HTMLElement | string | boolean>;
        default: undefined;
    };
    scrollable: BooleanConstructor;
    contentClass: StringConstructor;
    contentStyle: PropType<CSSProperties | string>;
    headerClass: StringConstructor;
    headerStyle: PropType<CSSProperties | string>;
    footerClass: StringConstructor;
    footerStyle: PropType<CSSProperties | string>;
    onClickoutside: PropType<(e: MouseEvent) => void>;
    'onUpdate:show': PropType<MaybeArray<(value: boolean) => void>>;
    onUpdateShow: PropType<MaybeArray<(value: boolean) => void>>;
    internalDeactivateImmediately: BooleanConstructor;
    internalSyncTargetWithParent: BooleanConstructor;
    internalInheritedEventHandlers: {
        type: PropType<TriggerEventHandlers[]>;
        default: () => never[];
    };
    internalTrapFocus: BooleanConstructor;
    internalExtraClass: {
        type: PropType<string[]>;
        default: () => never[];
    };
    onShow: PropType<MaybeArray<(value: boolean) => void> | undefined>;
    onHide: PropType<MaybeArray<(value: boolean) => void> | undefined>;
    arrow: {
        type: PropType<boolean | undefined>;
        default: undefined;
    };
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
    binderInstRef: Ref<{
        targetRef: HTMLElement | null;
    } | null, BinderInst | {
        targetRef: HTMLElement | null;
    } | null>;
    positionManually: ComputedRef<boolean>;
    mergedShowConsideringDisabledProp: ComputedRef<boolean>;
    uncontrolledShow: Ref<boolean, boolean>;
    mergedShowArrow: ComputedRef<boolean>;
    getMergedShow: () => boolean;
    setShow: (value: boolean) => void;
    handleClick: () => void;
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
    handleFocus: () => void;
    handleBlur: () => void;
    syncPosition: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    internalOnAfterLeave: PropType<() => void>;
    internalRenderBody: PropType<InternalRenderBody>;
    show: {
        type: PropType<boolean | undefined>;
        default: undefined;
    };
    defaultShow: BooleanConstructor;
    showArrow: {
        type: BooleanConstructor;
        default: boolean;
    };
    trigger: {
        type: PropType<PopoverTrigger>;
        default: string;
    };
    delay: {
        type: NumberConstructor;
        default: number;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    raw: BooleanConstructor;
    placement: {
        type: PropType<FollowerPlacement>;
        default: string;
    };
    x: NumberConstructor;
    y: NumberConstructor;
    arrowPointToCenter: BooleanConstructor;
    disabled: BooleanConstructor;
    getDisabled: PropType<() => boolean>;
    displayDirective: {
        type: PropType<"if" | "show">;
        default: string;
    };
    arrowClass: StringConstructor;
    arrowStyle: PropType<string | CSSProperties>;
    arrowWrapperClass: StringConstructor;
    arrowWrapperStyle: PropType<string | CSSProperties>;
    flip: {
        type: BooleanConstructor;
        default: boolean;
    };
    animated: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: PropType<number | "trigger">;
        default: undefined;
    };
    overlap: BooleanConstructor;
    keepAliveOnHover: {
        type: BooleanConstructor;
        default: boolean;
    };
    zIndex: NumberConstructor;
    to: {
        type: PropType<HTMLElement | string | boolean>;
        default: undefined;
    };
    scrollable: BooleanConstructor;
    contentClass: StringConstructor;
    contentStyle: PropType<CSSProperties | string>;
    headerClass: StringConstructor;
    headerStyle: PropType<CSSProperties | string>;
    footerClass: StringConstructor;
    footerStyle: PropType<CSSProperties | string>;
    onClickoutside: PropType<(e: MouseEvent) => void>;
    'onUpdate:show': PropType<MaybeArray<(value: boolean) => void>>;
    onUpdateShow: PropType<MaybeArray<(value: boolean) => void>>;
    internalDeactivateImmediately: BooleanConstructor;
    internalSyncTargetWithParent: BooleanConstructor;
    internalInheritedEventHandlers: {
        type: PropType<TriggerEventHandlers[]>;
        default: () => never[];
    };
    internalTrapFocus: BooleanConstructor;
    internalExtraClass: {
        type: PropType<string[]>;
        default: () => never[];
    };
    onShow: PropType<MaybeArray<(value: boolean) => void> | undefined>;
    onHide: PropType<MaybeArray<(value: boolean) => void> | undefined>;
    arrow: {
        type: PropType<boolean | undefined>;
        default: undefined;
    };
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
    disabled: boolean;
    raw: boolean;
    width: number | "trigger";
    duration: number;
    scrollable: boolean;
    trigger: PopoverTrigger;
    to: string | boolean | HTMLElement;
    placement: FollowerPlacement;
    show: boolean | undefined;
    showArrow: boolean;
    arrow: boolean | undefined;
    defaultShow: boolean;
    delay: number;
    arrowPointToCenter: boolean;
    displayDirective: "show" | "if";
    flip: boolean;
    animated: boolean;
    overlap: boolean;
    keepAliveOnHover: boolean;
    internalDeactivateImmediately: boolean;
    internalSyncTargetWithParent: boolean;
    internalInheritedEventHandlers: TriggerEventHandlers[];
    internalTrapFocus: boolean;
    internalExtraClass: string[];
}, SlotsType<PopoverSlots>, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
