import type { PropType } from 'vue';
import type { FollowerPlacement } from 'vueuc';
import type { MenuMaskRef } from '../../_internal/menu-mask';
import type { CascaderSubmenuInstance, MenuModel, Value } from './interface';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    value: PropType<Value | null>;
    placement: {
        type: PropType<FollowerPlacement>;
        default: string;
    };
    show: BooleanConstructor;
    menuModel: {
        type: PropType<MenuModel>;
        required: true;
    };
    loading: BooleanConstructor;
    onFocus: {
        type: PropType<(e: FocusEvent) => void>;
        required: true;
    };
    onBlur: {
        type: PropType<(e: FocusEvent) => void>;
        required: true;
    };
    onKeydown: {
        type: PropType<(e: KeyboardEvent) => void>;
        required: true;
    };
    onMousedown: {
        type: PropType<(e: MouseEvent) => void>;
        required: true;
    };
    onTabout: {
        type: PropType<() => void>;
        required: true;
    };
}>, {
    scroll: (depth: number, index: number, elSize: number) => void;
    showErrorMessage: (label: string) => void;
    isMounted: import("vue").Ref<boolean, boolean>;
    mergedClsPrefix: import("vue").Ref<string, string>;
    selfElRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    submenuInstRefs: CascaderSubmenuInstance[];
    maskInstRef: import("vue").Ref<{
        showOnce: (message: string, duration?: number) => void;
    } | null, MenuMaskRef | {
        showOnce: (message: string, duration?: number) => void;
    } | null>;
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
    mergedRenderEmpty: import("vue").ComputedRef<(() => import("vue").VNodeChild) | undefined>;
    getColumnStyle: import("vue").Ref<((detail: {
        level: number;
    }) => string | import("vue").CSSProperties) | undefined, ((detail: {
        level: number;
    }) => string | import("vue").CSSProperties) | undefined>;
    handleFocusin: (e: FocusEvent) => void;
    handleFocusout: (e: FocusEvent) => void;
    handleClickOutside: (e: MouseEvent) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    value: PropType<Value | null>;
    placement: {
        type: PropType<FollowerPlacement>;
        default: string;
    };
    show: BooleanConstructor;
    menuModel: {
        type: PropType<MenuModel>;
        required: true;
    };
    loading: BooleanConstructor;
    onFocus: {
        type: PropType<(e: FocusEvent) => void>;
        required: true;
    };
    onBlur: {
        type: PropType<(e: FocusEvent) => void>;
        required: true;
    };
    onKeydown: {
        type: PropType<(e: KeyboardEvent) => void>;
        required: true;
    };
    onMousedown: {
        type: PropType<(e: MouseEvent) => void>;
        required: true;
    };
    onTabout: {
        type: PropType<() => void>;
        required: true;
    };
}>> & Readonly<{}>, {
    loading: boolean;
    placement: FollowerPlacement;
    show: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
