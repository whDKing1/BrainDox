import type { PropType } from 'vue';
import type { TmNode } from './interface';
export declare const menuItemProps: {
    readonly tmNode: {
        readonly type: PropType<TmNode>;
        readonly required: true;
    };
    readonly disabled: BooleanConstructor;
    readonly icon: FunctionConstructor;
    readonly onClick: FunctionConstructor;
    readonly internalKey: {
        readonly type: PropType<import("treemate").Key>;
        readonly required: true;
    };
    readonly root: BooleanConstructor;
    readonly isGroup: BooleanConstructor;
    readonly level: {
        readonly type: NumberConstructor;
        readonly required: true;
    };
    readonly title: PropType<string | (() => import("vue").VNodeChild)>;
    readonly extra: PropType<string | (() => import("vue").VNodeChild)>;
};
export declare const menuItemPropKeys: ("disabled" | "title" | "icon" | "onClick" | "root" | "extra" | "level" | "isGroup" | "tmNode" | "internalKey")[];
export declare const NMenuOption: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly tmNode: {
        readonly type: PropType<TmNode>;
        readonly required: true;
    };
    readonly disabled: BooleanConstructor;
    readonly icon: FunctionConstructor;
    readonly onClick: FunctionConstructor;
    readonly internalKey: {
        readonly type: PropType<import("treemate").Key>;
        readonly required: true;
    };
    readonly root: BooleanConstructor;
    readonly isGroup: BooleanConstructor;
    readonly level: {
        readonly type: NumberConstructor;
        readonly required: true;
    };
    readonly title: PropType<string | (() => import("vue").VNodeChild)>;
    readonly extra: PropType<string | (() => import("vue").VNodeChild)>;
}>, {
    mergedClsPrefix: import("vue").Ref<string, string>;
    dropdownPlacement: import("vue").ComputedRef<import("vueuc").FollowerPlacement>;
    paddingLeft: import("vue").ComputedRef<number | undefined>;
    iconMarginRight: import("vue").ComputedRef<number>;
    maxIconSize: import("vue").ComputedRef<number>;
    activeIconSize: import("vue").ComputedRef<number>;
    mergedTheme: import("vue").Ref<{
        common: import("../..").ThemeCommonVars;
        self: {
            itemColorHoverInverted: string;
            itemColorActiveInverted: string;
            itemColorActiveHoverInverted: string;
            itemColorActiveCollapsedInverted: string;
            itemTextColorInverted: string;
            itemTextColorHoverInverted: string;
            itemTextColorChildActiveInverted: string;
            itemTextColorChildActiveHoverInverted: string;
            itemTextColorActiveInverted: string;
            itemTextColorActiveHoverInverted: string;
            itemTextColorHorizontalInverted: string;
            itemTextColorHoverHorizontalInverted: string;
            itemTextColorChildActiveHorizontalInverted: string;
            itemTextColorChildActiveHoverHorizontalInverted: string;
            itemTextColorActiveHorizontalInverted: string;
            itemTextColorActiveHoverHorizontalInverted: string;
            itemIconColorInverted: string;
            itemIconColorHoverInverted: string;
            itemIconColorActiveInverted: string;
            itemIconColorActiveHoverInverted: string;
            itemIconColorChildActiveInverted: string;
            itemIconColorChildActiveHoverInverted: string;
            itemIconColorCollapsedInverted: string;
            itemIconColorHorizontalInverted: string;
            itemIconColorHoverHorizontalInverted: string;
            itemIconColorActiveHorizontalInverted: string;
            itemIconColorActiveHoverHorizontalInverted: string;
            itemIconColorChildActiveHorizontalInverted: string;
            itemIconColorChildActiveHoverHorizontalInverted: string;
            arrowColorInverted: string;
            arrowColorHoverInverted: string;
            arrowColorActiveInverted: string;
            arrowColorActiveHoverInverted: string;
            arrowColorChildActiveInverted: string;
            arrowColorChildActiveHoverInverted: string;
            groupTextColorInverted: string;
            borderRadius: string;
            color: string;
            groupTextColor: string;
            itemColorHover: string;
            itemColorActive: string;
            itemColorActiveHover: string;
            itemColorActiveCollapsed: string;
            itemTextColor: string;
            itemTextColorHover: string;
            itemTextColorActive: string;
            itemTextColorActiveHover: string;
            itemTextColorChildActive: string;
            itemTextColorChildActiveHover: string;
            itemTextColorHorizontal: string;
            itemTextColorHoverHorizontal: string;
            itemTextColorActiveHorizontal: string;
            itemTextColorActiveHoverHorizontal: string;
            itemTextColorChildActiveHorizontal: string;
            itemTextColorChildActiveHoverHorizontal: string;
            itemIconColor: string;
            itemIconColorHover: string;
            itemIconColorActive: string;
            itemIconColorActiveHover: string;
            itemIconColorChildActive: string;
            itemIconColorChildActiveHover: string;
            itemIconColorCollapsed: string;
            itemIconColorHorizontal: string;
            itemIconColorHoverHorizontal: string;
            itemIconColorActiveHorizontal: string;
            itemIconColorActiveHoverHorizontal: string;
            itemIconColorChildActiveHorizontal: string;
            itemIconColorChildActiveHoverHorizontal: string;
            itemHeight: string;
            arrowColor: string;
            arrowColorHover: string;
            arrowColorActive: string;
            arrowColorActiveHover: string;
            arrowColorChildActive: string;
            arrowColorChildActiveHover: string;
            colorInverted: string;
            borderColorHorizontal: string;
            fontSize: string;
            dividerColor: string;
        };
        peers: {
            Tooltip: import("../../_mixins").Theme<"Tooltip", {
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
            }>;
            Dropdown: import("../../_mixins").Theme<"Dropdown", {
                optionHeightSmall: string;
                optionHeightMedium: string;
                optionHeightLarge: string;
                optionHeightHuge: string;
                borderRadius: string;
                fontSizeSmall: string;
                fontSizeMedium: string;
                fontSizeLarge: string;
                fontSizeHuge: string;
                optionTextColor: string;
                optionTextColorHover: string;
                optionTextColorActive: string;
                optionTextColorChildActive: string;
                color: string;
                dividerColor: string;
                suffixColor: string;
                prefixColor: string;
                optionColorHover: string;
                optionColorActive: string;
                groupHeaderTextColor: string;
                optionTextColorInverted: string;
                optionTextColorHoverInverted: string;
                optionTextColorActiveInverted: string;
                optionTextColorChildActiveInverted: string;
                colorInverted: string;
                dividerColorInverted: string;
                suffixColorInverted: string;
                prefixColorInverted: string;
                optionColorHoverInverted: string;
                optionColorActiveInverted: string;
                groupHeaderTextColorInverted: string;
                optionOpacityDisabled: string;
                padding: string;
                optionIconSizeSmall: string;
                optionIconSizeMedium: string;
                optionIconSizeLarge: string;
                optionIconSizeHuge: string;
                optionSuffixWidthSmall: string;
                optionSuffixWidthMedium: string;
                optionSuffixWidthLarge: string;
                optionSuffixWidthHuge: string;
                optionIconSuffixWidthSmall: string;
                optionIconSuffixWidthMedium: string;
                optionIconSuffixWidthLarge: string;
                optionIconSuffixWidthHuge: string;
                optionPrefixWidthSmall: string;
                optionPrefixWidthMedium: string;
                optionPrefixWidthLarge: string;
                optionPrefixWidthHuge: string;
                optionIconPrefixWidthSmall: string;
                optionIconPrefixWidthMedium: string;
                optionIconPrefixWidthLarge: string;
                optionIconPrefixWidthHuge: string;
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
        };
        peerOverrides: {
            Tooltip?: {
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
            Dropdown?: {
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
        };
    }, {
        common: import("../..").ThemeCommonVars;
        self: {
            itemColorHoverInverted: string;
            itemColorActiveInverted: string;
            itemColorActiveHoverInverted: string;
            itemColorActiveCollapsedInverted: string;
            itemTextColorInverted: string;
            itemTextColorHoverInverted: string;
            itemTextColorChildActiveInverted: string;
            itemTextColorChildActiveHoverInverted: string;
            itemTextColorActiveInverted: string;
            itemTextColorActiveHoverInverted: string;
            itemTextColorHorizontalInverted: string;
            itemTextColorHoverHorizontalInverted: string;
            itemTextColorChildActiveHorizontalInverted: string;
            itemTextColorChildActiveHoverHorizontalInverted: string;
            itemTextColorActiveHorizontalInverted: string;
            itemTextColorActiveHoverHorizontalInverted: string;
            itemIconColorInverted: string;
            itemIconColorHoverInverted: string;
            itemIconColorActiveInverted: string;
            itemIconColorActiveHoverInverted: string;
            itemIconColorChildActiveInverted: string;
            itemIconColorChildActiveHoverInverted: string;
            itemIconColorCollapsedInverted: string;
            itemIconColorHorizontalInverted: string;
            itemIconColorHoverHorizontalInverted: string;
            itemIconColorActiveHorizontalInverted: string;
            itemIconColorActiveHoverHorizontalInverted: string;
            itemIconColorChildActiveHorizontalInverted: string;
            itemIconColorChildActiveHoverHorizontalInverted: string;
            arrowColorInverted: string;
            arrowColorHoverInverted: string;
            arrowColorActiveInverted: string;
            arrowColorActiveHoverInverted: string;
            arrowColorChildActiveInverted: string;
            arrowColorChildActiveHoverInverted: string;
            groupTextColorInverted: string;
            borderRadius: string;
            color: string;
            groupTextColor: string;
            itemColorHover: string;
            itemColorActive: string;
            itemColorActiveHover: string;
            itemColorActiveCollapsed: string;
            itemTextColor: string;
            itemTextColorHover: string;
            itemTextColorActive: string;
            itemTextColorActiveHover: string;
            itemTextColorChildActive: string;
            itemTextColorChildActiveHover: string;
            itemTextColorHorizontal: string;
            itemTextColorHoverHorizontal: string;
            itemTextColorActiveHorizontal: string;
            itemTextColorActiveHoverHorizontal: string;
            itemTextColorChildActiveHorizontal: string;
            itemTextColorChildActiveHoverHorizontal: string;
            itemIconColor: string;
            itemIconColorHover: string;
            itemIconColorActive: string;
            itemIconColorActiveHover: string;
            itemIconColorChildActive: string;
            itemIconColorChildActiveHover: string;
            itemIconColorCollapsed: string;
            itemIconColorHorizontal: string;
            itemIconColorHoverHorizontal: string;
            itemIconColorActiveHorizontal: string;
            itemIconColorActiveHoverHorizontal: string;
            itemIconColorChildActiveHorizontal: string;
            itemIconColorChildActiveHoverHorizontal: string;
            itemHeight: string;
            arrowColor: string;
            arrowColorHover: string;
            arrowColorActive: string;
            arrowColorActiveHover: string;
            arrowColorChildActive: string;
            arrowColorChildActiveHover: string;
            colorInverted: string;
            borderColorHorizontal: string;
            fontSize: string;
            dividerColor: string;
        };
        peers: {
            Tooltip: import("../../_mixins").Theme<"Tooltip", {
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
            }>;
            Dropdown: import("../../_mixins").Theme<"Dropdown", {
                optionHeightSmall: string;
                optionHeightMedium: string;
                optionHeightLarge: string;
                optionHeightHuge: string;
                borderRadius: string;
                fontSizeSmall: string;
                fontSizeMedium: string;
                fontSizeLarge: string;
                fontSizeHuge: string;
                optionTextColor: string;
                optionTextColorHover: string;
                optionTextColorActive: string;
                optionTextColorChildActive: string;
                color: string;
                dividerColor: string;
                suffixColor: string;
                prefixColor: string;
                optionColorHover: string;
                optionColorActive: string;
                groupHeaderTextColor: string;
                optionTextColorInverted: string;
                optionTextColorHoverInverted: string;
                optionTextColorActiveInverted: string;
                optionTextColorChildActiveInverted: string;
                colorInverted: string;
                dividerColorInverted: string;
                suffixColorInverted: string;
                prefixColorInverted: string;
                optionColorHoverInverted: string;
                optionColorActiveInverted: string;
                groupHeaderTextColorInverted: string;
                optionOpacityDisabled: string;
                padding: string;
                optionIconSizeSmall: string;
                optionIconSizeMedium: string;
                optionIconSizeLarge: string;
                optionIconSizeHuge: string;
                optionSuffixWidthSmall: string;
                optionSuffixWidthMedium: string;
                optionSuffixWidthLarge: string;
                optionSuffixWidthHuge: string;
                optionIconSuffixWidthSmall: string;
                optionIconSuffixWidthMedium: string;
                optionIconSuffixWidthLarge: string;
                optionIconSuffixWidthHuge: string;
                optionPrefixWidthSmall: string;
                optionPrefixWidthMedium: string;
                optionPrefixWidthLarge: string;
                optionPrefixWidthHuge: string;
                optionIconPrefixWidthSmall: string;
                optionIconPrefixWidthMedium: string;
                optionIconPrefixWidthLarge: string;
                optionIconPrefixWidthHuge: string;
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
        };
        peerOverrides: {
            Tooltip?: {
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
            Dropdown?: {
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
        };
    }>;
    menuProps: import("./Menu").MenuSetupProps;
    dropdownEnabled: import("vue").ComputedRef<boolean>;
    selected: import("vue").ComputedRef<boolean>;
    mergedDisabled: import("vue").ComputedRef<boolean>;
    handleClick: (e: MouseEvent) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly tmNode: {
        readonly type: PropType<TmNode>;
        readonly required: true;
    };
    readonly disabled: BooleanConstructor;
    readonly icon: FunctionConstructor;
    readonly onClick: FunctionConstructor;
    readonly internalKey: {
        readonly type: PropType<import("treemate").Key>;
        readonly required: true;
    };
    readonly root: BooleanConstructor;
    readonly isGroup: BooleanConstructor;
    readonly level: {
        readonly type: NumberConstructor;
        readonly required: true;
    };
    readonly title: PropType<string | (() => import("vue").VNodeChild)>;
    readonly extra: PropType<string | (() => import("vue").VNodeChild)>;
}>> & Readonly<{}>, {
    readonly disabled: boolean;
    readonly root: boolean;
    readonly isGroup: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
