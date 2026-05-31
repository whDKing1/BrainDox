import type { ExtractPropTypes, PropType, SlotsType, VNode } from 'vue';
import type { ScrollbarProps } from '../../_internal/scrollbar/src/Scrollbar';
import type { ExtractPublicPropTypes } from '../../_utils';
import type { PopoverInst, PopoverTrigger } from '../../popover';
export declare const popselectProps: {
    scrollbarProps: PropType<ScrollbarProps>;
    multiple: BooleanConstructor;
    value: {
        readonly type: PropType<import("../../select/src/interface").Value | null>;
        readonly default: null;
    };
    cancelable: BooleanConstructor;
    options: {
        readonly type: PropType<import("../../select/src/interface").SelectMixedOption[]>;
        readonly default: () => never[];
    };
    size: PropType<import("./public-types").PopselectSize>;
    scrollable: BooleanConstructor;
    'onUpdate:value': PropType<import("../../_utils").MaybeArray<import("../../select/src/interface").OnUpdateValue>>;
    onUpdateValue: PropType<import("../../_utils").MaybeArray<import("../../select/src/interface").OnUpdateValue>>;
    onMouseenter: PropType<(e: MouseEvent) => void>;
    onMouseleave: PropType<(e: MouseEvent) => void>;
    renderLabel: PropType<import("../../_internal/select-menu/src/interface").RenderLabel>;
    showCheckmark: {
        readonly type: BooleanConstructor;
        readonly default: undefined;
    };
    nodeProps: PropType<import("../..").SelectNodeProps>;
    virtualScroll: BooleanConstructor;
    onChange: PropType<import("../../_utils").MaybeArray<import("../../select/src/interface").OnUpdateValue> | undefined>;
    placement: {
        default: string;
        type: PropType<import("vueuc/lib/binder/src/interface").Placement>;
    };
    trigger: {
        type: PropType<PopoverTrigger>;
        default: string;
    };
    disabled: BooleanConstructor;
    raw: BooleanConstructor;
    width: {
        type: PropType<number | "trigger">;
        default: undefined;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    contentClass: StringConstructor;
    contentStyle: PropType<import("vue").CSSProperties | string>;
    to: {
        type: PropType<HTMLElement | string | boolean>;
        default: undefined;
    };
    zIndex: NumberConstructor;
    show: {
        type: PropType<boolean | undefined>;
        default: undefined;
    };
    'onUpdate:show': PropType<import("../../_utils").MaybeArray<(value: boolean) => void>>;
    onShow: PropType<import("../../_utils").MaybeArray<(value: boolean) => void> | undefined>;
    onHide: PropType<import("../../_utils").MaybeArray<(value: boolean) => void> | undefined>;
    headerClass: StringConstructor;
    headerStyle: PropType<import("vue").CSSProperties | string>;
    footerClass: StringConstructor;
    footerStyle: PropType<import("vue").CSSProperties | string>;
    defaultShow: BooleanConstructor;
    delay: {
        type: NumberConstructor;
        default: number;
    };
    x: NumberConstructor;
    y: NumberConstructor;
    arrowPointToCenter: BooleanConstructor;
    getDisabled: PropType<() => boolean>;
    displayDirective: {
        type: PropType<"if" | "show">;
        default: string;
    };
    arrowClass: StringConstructor;
    arrowStyle: PropType<string | import("vue").CSSProperties>;
    arrowWrapperClass: StringConstructor;
    arrowWrapperStyle: PropType<string | import("vue").CSSProperties>;
    flip: {
        type: BooleanConstructor;
        default: boolean;
    };
    animated: {
        type: BooleanConstructor;
        default: boolean;
    };
    overlap: BooleanConstructor;
    keepAliveOnHover: {
        type: BooleanConstructor;
        default: boolean;
    };
    onClickoutside: PropType<(e: MouseEvent) => void>;
    onUpdateShow: PropType<import("../../_utils").MaybeArray<(value: boolean) => void>>;
    internalDeactivateImmediately: BooleanConstructor;
    internalSyncTargetWithParent: BooleanConstructor;
    internalInheritedEventHandlers: {
        type: PropType<import("../../popover/src/Popover").TriggerEventHandlers[]>;
        default: () => never[];
    };
    internalTrapFocus: BooleanConstructor;
    internalExtraClass: {
        type: PropType<string[]>;
        default: () => never[];
    };
    minWidth: NumberConstructor;
    maxWidth: NumberConstructor;
    theme: PropType<import("../../_mixins").Theme<"Popselect", {
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
    }>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Popselect", {
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
    }>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Popselect", {
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
    }>>>;
};
export type PopselectSetupProps = ExtractPropTypes<typeof popselectProps>;
export type PopselectProps = ExtractPublicPropTypes<typeof popselectProps>;
export interface PopselectSlots {
    default?: () => VNode[];
    header?: () => VNode[];
    action?: () => VNode[];
    empty?: () => VNode[];
}
declare const _default: import("vue").DefineComponent<ExtractPropTypes<{
    scrollbarProps: PropType<ScrollbarProps>;
    multiple: BooleanConstructor;
    value: {
        readonly type: PropType<import("../../select/src/interface").Value | null>;
        readonly default: null;
    };
    cancelable: BooleanConstructor;
    options: {
        readonly type: PropType<import("../../select/src/interface").SelectMixedOption[]>;
        readonly default: () => never[];
    };
    size: PropType<import("./public-types").PopselectSize>;
    scrollable: BooleanConstructor;
    'onUpdate:value': PropType<import("../../_utils").MaybeArray<import("../../select/src/interface").OnUpdateValue>>;
    onUpdateValue: PropType<import("../../_utils").MaybeArray<import("../../select/src/interface").OnUpdateValue>>;
    onMouseenter: PropType<(e: MouseEvent) => void>;
    onMouseleave: PropType<(e: MouseEvent) => void>;
    renderLabel: PropType<import("../../_internal/select-menu/src/interface").RenderLabel>;
    showCheckmark: {
        readonly type: BooleanConstructor;
        readonly default: undefined;
    };
    nodeProps: PropType<import("../..").SelectNodeProps>;
    virtualScroll: BooleanConstructor;
    onChange: PropType<import("../../_utils").MaybeArray<import("../../select/src/interface").OnUpdateValue> | undefined>;
    placement: {
        default: string;
        type: PropType<import("vueuc/lib/binder/src/interface").Placement>;
    };
    trigger: {
        type: PropType<PopoverTrigger>;
        default: string;
    };
    disabled: BooleanConstructor;
    raw: BooleanConstructor;
    width: {
        type: PropType<number | "trigger">;
        default: undefined;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    contentClass: StringConstructor;
    contentStyle: PropType<import("vue").CSSProperties | string>;
    to: {
        type: PropType<HTMLElement | string | boolean>;
        default: undefined;
    };
    zIndex: NumberConstructor;
    show: {
        type: PropType<boolean | undefined>;
        default: undefined;
    };
    'onUpdate:show': PropType<import("../../_utils").MaybeArray<(value: boolean) => void>>;
    onShow: PropType<import("../../_utils").MaybeArray<(value: boolean) => void> | undefined>;
    onHide: PropType<import("../../_utils").MaybeArray<(value: boolean) => void> | undefined>;
    headerClass: StringConstructor;
    headerStyle: PropType<import("vue").CSSProperties | string>;
    footerClass: StringConstructor;
    footerStyle: PropType<import("vue").CSSProperties | string>;
    defaultShow: BooleanConstructor;
    delay: {
        type: NumberConstructor;
        default: number;
    };
    x: NumberConstructor;
    y: NumberConstructor;
    arrowPointToCenter: BooleanConstructor;
    getDisabled: PropType<() => boolean>;
    displayDirective: {
        type: PropType<"if" | "show">;
        default: string;
    };
    arrowClass: StringConstructor;
    arrowStyle: PropType<string | import("vue").CSSProperties>;
    arrowWrapperClass: StringConstructor;
    arrowWrapperStyle: PropType<string | import("vue").CSSProperties>;
    flip: {
        type: BooleanConstructor;
        default: boolean;
    };
    animated: {
        type: BooleanConstructor;
        default: boolean;
    };
    overlap: BooleanConstructor;
    keepAliveOnHover: {
        type: BooleanConstructor;
        default: boolean;
    };
    onClickoutside: PropType<(e: MouseEvent) => void>;
    onUpdateShow: PropType<import("../../_utils").MaybeArray<(value: boolean) => void>>;
    internalDeactivateImmediately: BooleanConstructor;
    internalSyncTargetWithParent: BooleanConstructor;
    internalInheritedEventHandlers: {
        type: PropType<import("../../popover/src/Popover").TriggerEventHandlers[]>;
        default: () => never[];
    };
    internalTrapFocus: BooleanConstructor;
    internalExtraClass: {
        type: PropType<string[]>;
        default: () => never[];
    };
    minWidth: NumberConstructor;
    maxWidth: NumberConstructor;
    theme: PropType<import("../../_mixins").Theme<"Popselect", {
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
    }>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Popselect", {
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
    }>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Popselect", {
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
    }>>>;
}>, {
    popoverInstRef: import("vue").Ref<{
        syncPosition: () => void;
        setShow: (value: boolean) => void;
    } | null, PopoverInst | {
        syncPosition: () => void;
        setShow: (value: boolean) => void;
    } | null>;
    mergedTheme: import("vue").ComputedRef<{
        common: import("../..").ThemeCommonVars;
        self: {
            menuBoxShadow: string;
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
            InternalSelectMenu?: {
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
                    Empty?: import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Empty", {
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
                    }, any>> | undefined;
                } | undefined;
            } | undefined;
        };
    }>;
    syncPosition: () => void;
    setShow: (value: boolean) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ExtractPropTypes<{
    scrollbarProps: PropType<ScrollbarProps>;
    multiple: BooleanConstructor;
    value: {
        readonly type: PropType<import("../../select/src/interface").Value | null>;
        readonly default: null;
    };
    cancelable: BooleanConstructor;
    options: {
        readonly type: PropType<import("../../select/src/interface").SelectMixedOption[]>;
        readonly default: () => never[];
    };
    size: PropType<import("./public-types").PopselectSize>;
    scrollable: BooleanConstructor;
    'onUpdate:value': PropType<import("../../_utils").MaybeArray<import("../../select/src/interface").OnUpdateValue>>;
    onUpdateValue: PropType<import("../../_utils").MaybeArray<import("../../select/src/interface").OnUpdateValue>>;
    onMouseenter: PropType<(e: MouseEvent) => void>;
    onMouseleave: PropType<(e: MouseEvent) => void>;
    renderLabel: PropType<import("../../_internal/select-menu/src/interface").RenderLabel>;
    showCheckmark: {
        readonly type: BooleanConstructor;
        readonly default: undefined;
    };
    nodeProps: PropType<import("../..").SelectNodeProps>;
    virtualScroll: BooleanConstructor;
    onChange: PropType<import("../../_utils").MaybeArray<import("../../select/src/interface").OnUpdateValue> | undefined>;
    placement: {
        default: string;
        type: PropType<import("vueuc/lib/binder/src/interface").Placement>;
    };
    trigger: {
        type: PropType<PopoverTrigger>;
        default: string;
    };
    disabled: BooleanConstructor;
    raw: BooleanConstructor;
    width: {
        type: PropType<number | "trigger">;
        default: undefined;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    contentClass: StringConstructor;
    contentStyle: PropType<import("vue").CSSProperties | string>;
    to: {
        type: PropType<HTMLElement | string | boolean>;
        default: undefined;
    };
    zIndex: NumberConstructor;
    show: {
        type: PropType<boolean | undefined>;
        default: undefined;
    };
    'onUpdate:show': PropType<import("../../_utils").MaybeArray<(value: boolean) => void>>;
    onShow: PropType<import("../../_utils").MaybeArray<(value: boolean) => void> | undefined>;
    onHide: PropType<import("../../_utils").MaybeArray<(value: boolean) => void> | undefined>;
    headerClass: StringConstructor;
    headerStyle: PropType<import("vue").CSSProperties | string>;
    footerClass: StringConstructor;
    footerStyle: PropType<import("vue").CSSProperties | string>;
    defaultShow: BooleanConstructor;
    delay: {
        type: NumberConstructor;
        default: number;
    };
    x: NumberConstructor;
    y: NumberConstructor;
    arrowPointToCenter: BooleanConstructor;
    getDisabled: PropType<() => boolean>;
    displayDirective: {
        type: PropType<"if" | "show">;
        default: string;
    };
    arrowClass: StringConstructor;
    arrowStyle: PropType<string | import("vue").CSSProperties>;
    arrowWrapperClass: StringConstructor;
    arrowWrapperStyle: PropType<string | import("vue").CSSProperties>;
    flip: {
        type: BooleanConstructor;
        default: boolean;
    };
    animated: {
        type: BooleanConstructor;
        default: boolean;
    };
    overlap: BooleanConstructor;
    keepAliveOnHover: {
        type: BooleanConstructor;
        default: boolean;
    };
    onClickoutside: PropType<(e: MouseEvent) => void>;
    onUpdateShow: PropType<import("../../_utils").MaybeArray<(value: boolean) => void>>;
    internalDeactivateImmediately: BooleanConstructor;
    internalSyncTargetWithParent: BooleanConstructor;
    internalInheritedEventHandlers: {
        type: PropType<import("../../popover/src/Popover").TriggerEventHandlers[]>;
        default: () => never[];
    };
    internalTrapFocus: BooleanConstructor;
    internalExtraClass: {
        type: PropType<string[]>;
        default: () => never[];
    };
    minWidth: NumberConstructor;
    maxWidth: NumberConstructor;
    theme: PropType<import("../../_mixins").Theme<"Popselect", {
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
    }>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Popselect", {
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
    }>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Popselect", {
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
    }>>>;
}>> & Readonly<{}>, {
    value: import("../../select/src/interface").Value | null;
    disabled: boolean;
    raw: boolean;
    width: number | "trigger";
    duration: number;
    scrollable: boolean;
    trigger: PopoverTrigger;
    to: string | boolean | HTMLElement;
    placement: import("vueuc/lib/binder/src/interface").Placement;
    options: import("../../select/src/interface").SelectMixedOption[];
    show: boolean | undefined;
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
    multiple: boolean;
    virtualScroll: boolean;
    showCheckmark: boolean;
    cancelable: boolean;
}, SlotsType<PopselectSlots>, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
