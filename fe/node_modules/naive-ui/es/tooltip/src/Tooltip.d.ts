import type { SlotsType } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
import type { PopoverInst, PopoverSlots } from '../../popover';
export type TooltipInst = PopoverInst;
export declare const tooltipProps: {
    theme: import("vue").PropType<import("../../_mixins").Theme<"Tooltip", {
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
    }>>;
    themeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Tooltip", {
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
    }>>>;
    builtinThemeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Tooltip", {
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
    }>>>;
    show: {
        type: import("vue").PropType<boolean | undefined>;
        default: undefined;
    };
    defaultShow: BooleanConstructor;
    showArrow: {
        type: BooleanConstructor;
        default: boolean;
    };
    trigger: {
        type: import("vue").PropType<import("../..").PopoverTrigger>;
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
        type: import("vue").PropType<import("vueuc").FollowerPlacement>;
        default: string;
    };
    x: NumberConstructor;
    y: NumberConstructor;
    arrowPointToCenter: BooleanConstructor;
    disabled: BooleanConstructor;
    getDisabled: import("vue").PropType<() => boolean>;
    displayDirective: {
        type: import("vue").PropType<"if" | "show">;
        default: string;
    };
    arrowClass: StringConstructor;
    arrowStyle: import("vue").PropType<string | import("vue").CSSProperties>;
    arrowWrapperClass: StringConstructor;
    arrowWrapperStyle: import("vue").PropType<string | import("vue").CSSProperties>;
    flip: {
        type: BooleanConstructor;
        default: boolean;
    };
    animated: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: import("vue").PropType<number | "trigger">;
        default: undefined;
    };
    overlap: BooleanConstructor;
    keepAliveOnHover: {
        type: BooleanConstructor;
        default: boolean;
    };
    zIndex: NumberConstructor;
    to: {
        type: import("vue").PropType<HTMLElement | string | boolean>;
        default: undefined;
    };
    scrollable: BooleanConstructor;
    contentClass: StringConstructor;
    contentStyle: import("vue").PropType<import("vue").CSSProperties | string>;
    headerClass: StringConstructor;
    headerStyle: import("vue").PropType<import("vue").CSSProperties | string>;
    footerClass: StringConstructor;
    footerStyle: import("vue").PropType<import("vue").CSSProperties | string>;
    onClickoutside: import("vue").PropType<(e: MouseEvent) => void>;
    'onUpdate:show': import("vue").PropType<import("../../_utils").MaybeArray<(value: boolean) => void>>;
    onUpdateShow: import("vue").PropType<import("../../_utils").MaybeArray<(value: boolean) => void>>;
    internalDeactivateImmediately: BooleanConstructor;
    internalSyncTargetWithParent: BooleanConstructor;
    internalInheritedEventHandlers: {
        type: import("vue").PropType<import("../../popover/src/Popover").TriggerEventHandlers[]>;
        default: () => never[];
    };
    internalTrapFocus: BooleanConstructor;
    internalExtraClass: {
        type: import("vue").PropType<string[]>;
        default: () => never[];
    };
    onShow: import("vue").PropType<import("../../_utils").MaybeArray<(value: boolean) => void> | undefined>;
    onHide: import("vue").PropType<import("../../_utils").MaybeArray<(value: boolean) => void> | undefined>;
    arrow: {
        type: import("vue").PropType<boolean | undefined>;
        default: undefined;
    };
    minWidth: NumberConstructor;
    maxWidth: NumberConstructor;
};
export type TooltipProps = ExtractPublicPropTypes<typeof tooltipProps>;
export interface TooltipSlots extends PopoverSlots {
}
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    theme: import("vue").PropType<import("../../_mixins").Theme<"Tooltip", {
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
    }>>;
    themeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Tooltip", {
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
    }>>>;
    builtinThemeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Tooltip", {
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
    }>>>;
    show: {
        type: import("vue").PropType<boolean | undefined>;
        default: undefined;
    };
    defaultShow: BooleanConstructor;
    showArrow: {
        type: BooleanConstructor;
        default: boolean;
    };
    trigger: {
        type: import("vue").PropType<import("../..").PopoverTrigger>;
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
        type: import("vue").PropType<import("vueuc").FollowerPlacement>;
        default: string;
    };
    x: NumberConstructor;
    y: NumberConstructor;
    arrowPointToCenter: BooleanConstructor;
    disabled: BooleanConstructor;
    getDisabled: import("vue").PropType<() => boolean>;
    displayDirective: {
        type: import("vue").PropType<"if" | "show">;
        default: string;
    };
    arrowClass: StringConstructor;
    arrowStyle: import("vue").PropType<string | import("vue").CSSProperties>;
    arrowWrapperClass: StringConstructor;
    arrowWrapperStyle: import("vue").PropType<string | import("vue").CSSProperties>;
    flip: {
        type: BooleanConstructor;
        default: boolean;
    };
    animated: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: import("vue").PropType<number | "trigger">;
        default: undefined;
    };
    overlap: BooleanConstructor;
    keepAliveOnHover: {
        type: BooleanConstructor;
        default: boolean;
    };
    zIndex: NumberConstructor;
    to: {
        type: import("vue").PropType<HTMLElement | string | boolean>;
        default: undefined;
    };
    scrollable: BooleanConstructor;
    contentClass: StringConstructor;
    contentStyle: import("vue").PropType<import("vue").CSSProperties | string>;
    headerClass: StringConstructor;
    headerStyle: import("vue").PropType<import("vue").CSSProperties | string>;
    footerClass: StringConstructor;
    footerStyle: import("vue").PropType<import("vue").CSSProperties | string>;
    onClickoutside: import("vue").PropType<(e: MouseEvent) => void>;
    'onUpdate:show': import("vue").PropType<import("../../_utils").MaybeArray<(value: boolean) => void>>;
    onUpdateShow: import("vue").PropType<import("../../_utils").MaybeArray<(value: boolean) => void>>;
    internalDeactivateImmediately: BooleanConstructor;
    internalSyncTargetWithParent: BooleanConstructor;
    internalInheritedEventHandlers: {
        type: import("vue").PropType<import("../../popover/src/Popover").TriggerEventHandlers[]>;
        default: () => never[];
    };
    internalTrapFocus: BooleanConstructor;
    internalExtraClass: {
        type: import("vue").PropType<string[]>;
        default: () => never[];
    };
    onShow: import("vue").PropType<import("../../_utils").MaybeArray<(value: boolean) => void> | undefined>;
    onHide: import("vue").PropType<import("../../_utils").MaybeArray<(value: boolean) => void> | undefined>;
    arrow: {
        type: import("vue").PropType<boolean | undefined>;
        default: undefined;
    };
    minWidth: NumberConstructor;
    maxWidth: NumberConstructor;
}>, {
    popoverRef: import("vue").Ref<{
        syncPosition: () => void;
        setShow: (value: boolean) => void;
    } | null, PopoverInst | {
        syncPosition: () => void;
        setShow: (value: boolean) => void;
    } | null>;
    mergedTheme: import("vue").ComputedRef<{
        common: import("../..").ThemeCommonVars;
        self: {
            borderRadius: string;
            boxShadow: string;
            color: string;
            textColor: string;
            padding: string;
        };
        peers: {
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
        };
        peerOverrides: {
            Popover?: {
                peers?: {
                    Scrollbar?: import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Scrollbar", {
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
                    }, any>> | undefined;
                } | undefined;
            } | undefined;
        };
    }>;
    popoverThemeOverrides: import("vue").ComputedRef<{
        borderRadius: string;
        boxShadow: string;
        color: string;
        textColor: string;
        padding: string;
    }>;
    syncPosition: () => void;
    setShow: (value: boolean) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    theme: import("vue").PropType<import("../../_mixins").Theme<"Tooltip", {
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
    }>>;
    themeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Tooltip", {
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
    }>>>;
    builtinThemeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Tooltip", {
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
    }>>>;
    show: {
        type: import("vue").PropType<boolean | undefined>;
        default: undefined;
    };
    defaultShow: BooleanConstructor;
    showArrow: {
        type: BooleanConstructor;
        default: boolean;
    };
    trigger: {
        type: import("vue").PropType<import("../..").PopoverTrigger>;
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
        type: import("vue").PropType<import("vueuc").FollowerPlacement>;
        default: string;
    };
    x: NumberConstructor;
    y: NumberConstructor;
    arrowPointToCenter: BooleanConstructor;
    disabled: BooleanConstructor;
    getDisabled: import("vue").PropType<() => boolean>;
    displayDirective: {
        type: import("vue").PropType<"if" | "show">;
        default: string;
    };
    arrowClass: StringConstructor;
    arrowStyle: import("vue").PropType<string | import("vue").CSSProperties>;
    arrowWrapperClass: StringConstructor;
    arrowWrapperStyle: import("vue").PropType<string | import("vue").CSSProperties>;
    flip: {
        type: BooleanConstructor;
        default: boolean;
    };
    animated: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: import("vue").PropType<number | "trigger">;
        default: undefined;
    };
    overlap: BooleanConstructor;
    keepAliveOnHover: {
        type: BooleanConstructor;
        default: boolean;
    };
    zIndex: NumberConstructor;
    to: {
        type: import("vue").PropType<HTMLElement | string | boolean>;
        default: undefined;
    };
    scrollable: BooleanConstructor;
    contentClass: StringConstructor;
    contentStyle: import("vue").PropType<import("vue").CSSProperties | string>;
    headerClass: StringConstructor;
    headerStyle: import("vue").PropType<import("vue").CSSProperties | string>;
    footerClass: StringConstructor;
    footerStyle: import("vue").PropType<import("vue").CSSProperties | string>;
    onClickoutside: import("vue").PropType<(e: MouseEvent) => void>;
    'onUpdate:show': import("vue").PropType<import("../../_utils").MaybeArray<(value: boolean) => void>>;
    onUpdateShow: import("vue").PropType<import("../../_utils").MaybeArray<(value: boolean) => void>>;
    internalDeactivateImmediately: BooleanConstructor;
    internalSyncTargetWithParent: BooleanConstructor;
    internalInheritedEventHandlers: {
        type: import("vue").PropType<import("../../popover/src/Popover").TriggerEventHandlers[]>;
        default: () => never[];
    };
    internalTrapFocus: BooleanConstructor;
    internalExtraClass: {
        type: import("vue").PropType<string[]>;
        default: () => never[];
    };
    onShow: import("vue").PropType<import("../../_utils").MaybeArray<(value: boolean) => void> | undefined>;
    onHide: import("vue").PropType<import("../../_utils").MaybeArray<(value: boolean) => void> | undefined>;
    arrow: {
        type: import("vue").PropType<boolean | undefined>;
        default: undefined;
    };
    minWidth: NumberConstructor;
    maxWidth: NumberConstructor;
}>> & Readonly<{}>, {
    disabled: boolean;
    raw: boolean;
    width: number | "trigger";
    duration: number;
    scrollable: boolean;
    trigger: import("../..").PopoverTrigger;
    to: string | boolean | HTMLElement;
    placement: import("vueuc").FollowerPlacement;
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
    internalInheritedEventHandlers: import("../../popover/src/Popover").TriggerEventHandlers[];
    internalTrapFocus: boolean;
    internalExtraClass: string[];
}, SlotsType<TooltipSlots>, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
