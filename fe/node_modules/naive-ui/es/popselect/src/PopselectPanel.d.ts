import type { TreeNode } from 'treemate';
import type { PropType } from 'vue';
import type { NodeProps, RenderLabel } from '../../_internal/select-menu/src/interface';
import type { MaybeArray } from '../../_utils';
import type { OnUpdateValue, SelectBaseOption, SelectGroupOption, SelectIgnoredOption, SelectMixedOption, Value } from '../../select/src/interface';
import type { PopselectSize } from './public-types';
export declare const panelProps: {
    readonly multiple: BooleanConstructor;
    readonly value: {
        readonly type: PropType<Value | null>;
        readonly default: null;
    };
    readonly cancelable: BooleanConstructor;
    readonly options: {
        readonly type: PropType<SelectMixedOption[]>;
        readonly default: () => never[];
    };
    readonly size: PropType<PopselectSize>;
    readonly scrollable: BooleanConstructor;
    readonly 'onUpdate:value': PropType<MaybeArray<OnUpdateValue>>;
    readonly onUpdateValue: PropType<MaybeArray<OnUpdateValue>>;
    readonly onMouseenter: PropType<(e: MouseEvent) => void>;
    readonly onMouseleave: PropType<(e: MouseEvent) => void>;
    readonly renderLabel: PropType<RenderLabel>;
    readonly showCheckmark: {
        readonly type: BooleanConstructor;
        readonly default: undefined;
    };
    readonly nodeProps: PropType<NodeProps>;
    readonly virtualScroll: BooleanConstructor;
    readonly onChange: PropType<MaybeArray<OnUpdateValue> | undefined>;
};
export declare const panelPropKeys: ("value" | "size" | "onChange" | "onMouseenter" | "onMouseleave" | "scrollable" | "renderLabel" | "options" | "onUpdate:value" | "onUpdateValue" | "multiple" | "virtualScroll" | "nodeProps" | "showCheckmark" | "cancelable")[];
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly multiple: BooleanConstructor;
    readonly value: {
        readonly type: PropType<Value | null>;
        readonly default: null;
    };
    readonly cancelable: BooleanConstructor;
    readonly options: {
        readonly type: PropType<SelectMixedOption[]>;
        readonly default: () => never[];
    };
    readonly size: PropType<PopselectSize>;
    readonly scrollable: BooleanConstructor;
    readonly 'onUpdate:value': PropType<MaybeArray<OnUpdateValue>>;
    readonly onUpdateValue: PropType<MaybeArray<OnUpdateValue>>;
    readonly onMouseenter: PropType<(e: MouseEvent) => void>;
    readonly onMouseleave: PropType<(e: MouseEvent) => void>;
    readonly renderLabel: PropType<RenderLabel>;
    readonly showCheckmark: {
        readonly type: BooleanConstructor;
        readonly default: undefined;
    };
    readonly nodeProps: PropType<NodeProps>;
    readonly virtualScroll: BooleanConstructor;
    readonly onChange: PropType<MaybeArray<OnUpdateValue> | undefined>;
}>, {
    mergedTheme: import("vue").Ref<{
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
    }, {
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
    mergedClsPrefix: import("vue").Ref<string, string>;
    treeMate: import("vue").ComputedRef<import("treemate").TreeMate<SelectBaseOption<string | number, string | ((option: SelectBaseOption<string | number, string | /*elided*/ any>, selected: boolean) => import("vue").VNodeChild)>, SelectGroupOption, SelectIgnoredOption>>;
    handleToggle: (tmNode: TreeNode<SelectBaseOption>) => void;
    handleMenuMousedown: (e: MouseEvent) => void;
    cssVars: import("vue").ComputedRef<{
        '--n-menu-box-shadow': string;
    }> | undefined;
    themeClass: import("vue").Ref<string, string> | undefined;
    onRender: (() => void) | undefined;
    mergedSize: import("vue").ComputedRef<PopselectSize>;
    scrollbarProps: import("../../_internal").ScrollbarProps | undefined;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly multiple: BooleanConstructor;
    readonly value: {
        readonly type: PropType<Value | null>;
        readonly default: null;
    };
    readonly cancelable: BooleanConstructor;
    readonly options: {
        readonly type: PropType<SelectMixedOption[]>;
        readonly default: () => never[];
    };
    readonly size: PropType<PopselectSize>;
    readonly scrollable: BooleanConstructor;
    readonly 'onUpdate:value': PropType<MaybeArray<OnUpdateValue>>;
    readonly onUpdateValue: PropType<MaybeArray<OnUpdateValue>>;
    readonly onMouseenter: PropType<(e: MouseEvent) => void>;
    readonly onMouseleave: PropType<(e: MouseEvent) => void>;
    readonly renderLabel: PropType<RenderLabel>;
    readonly showCheckmark: {
        readonly type: BooleanConstructor;
        readonly default: undefined;
    };
    readonly nodeProps: PropType<NodeProps>;
    readonly virtualScroll: BooleanConstructor;
    readonly onChange: PropType<MaybeArray<OnUpdateValue> | undefined>;
}>> & Readonly<{}>, {
    readonly value: Value | null;
    readonly scrollable: boolean;
    readonly options: SelectMixedOption[];
    readonly multiple: boolean;
    readonly virtualScroll: boolean;
    readonly showCheckmark: boolean;
    readonly cancelable: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
