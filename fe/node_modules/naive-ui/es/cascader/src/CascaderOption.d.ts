import type { PropType, VNode } from 'vue';
import type { TmNode } from './interface';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    tmNode: {
        type: PropType<TmNode>;
        required: true;
    };
}>, {
    checkStrategy: import("vue").Ref<import("treemate").CheckStrategy, import("treemate").CheckStrategy>;
    multiple: import("vue").Ref<boolean, boolean>;
    cascade: import("vue").Ref<boolean, boolean>;
    checked: import("vue").ComputedRef<boolean>;
    indeterminate: import("vue").ComputedRef<boolean>;
    hoverPending: import("vue").ComputedRef<boolean>;
    keyboardPending: import("vue").ComputedRef<boolean>;
    isLoading: import("vue").ComputedRef<boolean>;
    showCheckbox: import("vue").Ref<boolean, boolean>;
    isLeaf: import("vue").ComputedRef<boolean>;
    disabled: import("vue").ComputedRef<boolean>;
    label: import("vue").ComputedRef<any>;
    mergedClsPrefix: import("vue").Ref<string, string>;
    mergedTheme: import("vue").Ref<{
        common: import("../..").ThemeCommonVars;
        self: {
            menuBorderRadius: string;
            menuColor: string;
            menuBoxShadow: string;
            menuDividerColor: string;
            menuHeight: string;
            optionArrowColor: string;
            optionHeight: string;
            optionFontSize: string;
            optionColorHover: string;
            optionTextColor: string;
            optionTextColorActive: string;
            optionTextColorDisabled: string;
            optionCheckMarkColor: string;
            loadingColor: string;
            columnWidth: string;
        };
        peers: {
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
            InternalSelection: import("../../_mixins").Theme<"InternalSelection", {
                fontSizeTiny: string;
                fontSizeSmall: string;
                fontSizeMedium: string;
                fontSizeLarge: string;
                heightTiny: string;
                heightSmall: string;
                heightMedium: string;
                heightLarge: string;
                borderRadius: string;
                fontWeight: string;
                textColor: string;
                textColorDisabled: string;
                placeholderColor: string;
                placeholderColorDisabled: string;
                color: string;
                colorDisabled: string;
                colorActive: string;
                border: string;
                borderHover: string;
                borderActive: string;
                borderFocus: string;
                boxShadowHover: string;
                boxShadowActive: string;
                boxShadowFocus: string;
                caretColor: string;
                arrowColor: string;
                arrowColorDisabled: string;
                loadingColor: string;
                borderWarning: string;
                borderHoverWarning: string;
                borderActiveWarning: string;
                borderFocusWarning: string;
                boxShadowHoverWarning: string;
                boxShadowActiveWarning: string;
                boxShadowFocusWarning: string;
                colorActiveWarning: string;
                caretColorWarning: string;
                borderError: string;
                borderHoverError: string;
                borderActiveError: string;
                borderFocusError: string;
                boxShadowHoverError: string;
                boxShadowActiveError: string;
                boxShadowFocusError: string;
                colorActiveError: string;
                caretColorError: string;
                clearColor: string;
                clearColorHover: string;
                clearColorPressed: string;
                paddingSingle: string;
                paddingMultiple: string;
                clearSize: string;
                arrowSize: string;
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
            Checkbox: import("../../_mixins").Theme<"Checkbox", {
                labelLineHeight: string;
                fontSizeSmall: string;
                fontSizeMedium: string;
                fontSizeLarge: string;
                borderRadius: string;
                color: string;
                colorChecked: string;
                colorDisabled: string;
                colorDisabledChecked: string;
                colorTableHeader: string;
                colorTableHeaderModal: string;
                colorTableHeaderPopover: string;
                checkMarkColor: string;
                checkMarkColorDisabled: string;
                checkMarkColorDisabledChecked: string;
                border: string;
                borderDisabled: string;
                borderDisabledChecked: string;
                borderChecked: string;
                borderFocus: string;
                boxShadowFocus: string;
                textColor: string;
                textColorDisabled: string;
                sizeSmall: string;
                sizeMedium: string;
                sizeLarge: string;
                labelPadding: string;
                labelFontWeight: string;
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
        };
        peerOverrides: {
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
            InternalSelection?: {
                peers?: {
                    Popover?: import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Popover", {
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
                    }>> | undefined;
                } | undefined;
            } | undefined;
            Scrollbar?: {
                peers?: {
                    [x: string]: any;
                } | undefined;
            } | undefined;
            Checkbox?: {
                peers?: {
                    [x: string]: any;
                } | undefined;
            } | undefined;
            Empty?: {
                peers?: {
                    [x: string]: any;
                } | undefined;
            } | undefined;
        };
    }, {
        common: import("../..").ThemeCommonVars;
        self: {
            menuBorderRadius: string;
            menuColor: string;
            menuBoxShadow: string;
            menuDividerColor: string;
            menuHeight: string;
            optionArrowColor: string;
            optionHeight: string;
            optionFontSize: string;
            optionColorHover: string;
            optionTextColor: string;
            optionTextColorActive: string;
            optionTextColorDisabled: string;
            optionCheckMarkColor: string;
            loadingColor: string;
            columnWidth: string;
        };
        peers: {
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
            InternalSelection: import("../../_mixins").Theme<"InternalSelection", {
                fontSizeTiny: string;
                fontSizeSmall: string;
                fontSizeMedium: string;
                fontSizeLarge: string;
                heightTiny: string;
                heightSmall: string;
                heightMedium: string;
                heightLarge: string;
                borderRadius: string;
                fontWeight: string;
                textColor: string;
                textColorDisabled: string;
                placeholderColor: string;
                placeholderColorDisabled: string;
                color: string;
                colorDisabled: string;
                colorActive: string;
                border: string;
                borderHover: string;
                borderActive: string;
                borderFocus: string;
                boxShadowHover: string;
                boxShadowActive: string;
                boxShadowFocus: string;
                caretColor: string;
                arrowColor: string;
                arrowColorDisabled: string;
                loadingColor: string;
                borderWarning: string;
                borderHoverWarning: string;
                borderActiveWarning: string;
                borderFocusWarning: string;
                boxShadowHoverWarning: string;
                boxShadowActiveWarning: string;
                boxShadowFocusWarning: string;
                colorActiveWarning: string;
                caretColorWarning: string;
                borderError: string;
                borderHoverError: string;
                borderActiveError: string;
                borderFocusError: string;
                boxShadowHoverError: string;
                boxShadowActiveError: string;
                boxShadowFocusError: string;
                colorActiveError: string;
                caretColorError: string;
                clearColor: string;
                clearColorHover: string;
                clearColorPressed: string;
                paddingSingle: string;
                paddingMultiple: string;
                clearSize: string;
                arrowSize: string;
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
            Checkbox: import("../../_mixins").Theme<"Checkbox", {
                labelLineHeight: string;
                fontSizeSmall: string;
                fontSizeMedium: string;
                fontSizeLarge: string;
                borderRadius: string;
                color: string;
                colorChecked: string;
                colorDisabled: string;
                colorDisabledChecked: string;
                colorTableHeader: string;
                colorTableHeaderModal: string;
                colorTableHeaderPopover: string;
                checkMarkColor: string;
                checkMarkColorDisabled: string;
                checkMarkColorDisabledChecked: string;
                border: string;
                borderDisabled: string;
                borderDisabledChecked: string;
                borderChecked: string;
                borderFocus: string;
                boxShadowFocus: string;
                textColor: string;
                textColorDisabled: string;
                sizeSmall: string;
                sizeMedium: string;
                sizeLarge: string;
                labelPadding: string;
                labelFontWeight: string;
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
        };
        peerOverrides: {
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
            InternalSelection?: {
                peers?: {
                    Popover?: import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Popover", {
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
                    }>> | undefined;
                } | undefined;
            } | undefined;
            Scrollbar?: {
                peers?: {
                    [x: string]: any;
                } | undefined;
            } | undefined;
            Checkbox?: {
                peers?: {
                    [x: string]: any;
                } | undefined;
            } | undefined;
            Empty?: {
                peers?: {
                    [x: string]: any;
                } | undefined;
            } | undefined;
        };
    }>;
    spinProps: import("vue").Ref<import("../../_internal").SharedSpinProps | undefined, import("../../_internal").SharedSpinProps | undefined>;
    handleClick: (e: MouseEvent) => void;
    handleCheckboxUpdateValue: () => void;
    mergedHandleMouseEnter: import("vue").ComputedRef<(() => void) | undefined>;
    mergedHandleMouseMove: import("vue").ComputedRef<(() => void) | undefined>;
    renderLabel: import("vue").Ref<((option: import("./interface").CascaderOption, checked: boolean) => import("vue").VNodeChild) | undefined, ((option: import("./interface").CascaderOption, checked: boolean) => import("vue").VNodeChild) | undefined>;
    renderPrefix: import("vue").Ref<((info: {
        option: import("./interface").CascaderOption;
        checked: boolean;
        node: VNode | null;
    }) => import("vue").VNodeChild) | undefined, ((info: {
        option: import("./interface").CascaderOption;
        checked: boolean;
        node: VNode | null;
    }) => import("vue").VNodeChild) | undefined>;
    renderSuffix: import("vue").Ref<((info: {
        option: import("./interface").CascaderOption;
        checked: boolean;
        node: VNode | null;
    }) => import("vue").VNodeChild) | undefined, ((info: {
        option: import("./interface").CascaderOption;
        checked: boolean;
        node: VNode | null;
    }) => import("vue").VNodeChild) | undefined>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    tmNode: {
        type: PropType<TmNode>;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
