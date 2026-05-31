import type { CSSProperties, PropType, SlotsType, VNode } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
import type { Size } from '../../avatar/src/interface';
import type { AvatarGroupAvatarSlotProps, AvatarGroupOption, AvatarGroupRestSlotProps } from './public-types';
export interface AvatarGroupInjection {
    size?: Size | undefined;
}
export declare const avatarGroupProps: {
    readonly max: NumberConstructor;
    readonly maxStyle: PropType<CSSProperties | string>;
    readonly options: {
        readonly type: PropType<AvatarGroupOption[]>;
        readonly default: () => never[];
    };
    readonly vertical: BooleanConstructor;
    readonly expandOnHover: BooleanConstructor;
    readonly size: PropType<Size | undefined>;
    readonly theme: PropType<import("../../_mixins").Theme<"AvatarGroup", {
        gap: string;
    }, {
        Avatar: import("../../_mixins").Theme<"Avatar", {
            borderRadius: string;
            fontSize: string;
            border: string;
            heightTiny: string;
            heightSmall: string;
            heightMedium: string;
            heightLarge: string;
            heightHuge: string;
            color: string;
            colorModal: string;
            colorPopover: string;
        }, any>;
    }>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"AvatarGroup", {
        gap: string;
    }, {
        Avatar: import("../../_mixins").Theme<"Avatar", {
            borderRadius: string;
            fontSize: string;
            border: string;
            heightTiny: string;
            heightSmall: string;
            heightMedium: string;
            heightLarge: string;
            heightHuge: string;
            color: string;
            colorModal: string;
            colorPopover: string;
        }, any>;
    }>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"AvatarGroup", {
        gap: string;
    }, {
        Avatar: import("../../_mixins").Theme<"Avatar", {
            borderRadius: string;
            fontSize: string;
            border: string;
            heightTiny: string;
            heightSmall: string;
            heightMedium: string;
            heightLarge: string;
            heightHuge: string;
            color: string;
            colorModal: string;
            colorPopover: string;
        }, any>;
    }>>>;
};
export type AvatarGroupProps = ExtractPublicPropTypes<typeof avatarGroupProps>;
export interface AvatarGroupSlots {
    avatar?: (props: AvatarGroupAvatarSlotProps) => VNode[];
    rest?: (props: AvatarGroupRestSlotProps) => VNode[];
    default?: () => VNode[];
}
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly max: NumberConstructor;
    readonly maxStyle: PropType<CSSProperties | string>;
    readonly options: {
        readonly type: PropType<AvatarGroupOption[]>;
        readonly default: () => never[];
    };
    readonly vertical: BooleanConstructor;
    readonly expandOnHover: BooleanConstructor;
    readonly size: PropType<Size | undefined>;
    readonly theme: PropType<import("../../_mixins").Theme<"AvatarGroup", {
        gap: string;
    }, {
        Avatar: import("../../_mixins").Theme<"Avatar", {
            borderRadius: string;
            fontSize: string;
            border: string;
            heightTiny: string;
            heightSmall: string;
            heightMedium: string;
            heightLarge: string;
            heightHuge: string;
            color: string;
            colorModal: string;
            colorPopover: string;
        }, any>;
    }>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"AvatarGroup", {
        gap: string;
    }, {
        Avatar: import("../../_mixins").Theme<"Avatar", {
            borderRadius: string;
            fontSize: string;
            border: string;
            heightTiny: string;
            heightSmall: string;
            heightMedium: string;
            heightLarge: string;
            heightHuge: string;
            color: string;
            colorModal: string;
            colorPopover: string;
        }, any>;
    }>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"AvatarGroup", {
        gap: string;
    }, {
        Avatar: import("../../_mixins").Theme<"Avatar", {
            borderRadius: string;
            fontSize: string;
            border: string;
            heightTiny: string;
            heightSmall: string;
            heightMedium: string;
            heightLarge: string;
            heightHuge: string;
            color: string;
            colorModal: string;
            colorPopover: string;
        }, any>;
    }>>>;
}>, {
    mergedTheme: import("vue").ComputedRef<{
        common: import("../..").ThemeCommonVars;
        self: {
            gap: string;
        };
        peers: {
            Avatar: import("../../_mixins").Theme<"Avatar", {
                borderRadius: string;
                fontSize: string;
                border: string;
                heightTiny: string;
                heightSmall: string;
                heightMedium: string;
                heightLarge: string;
                heightHuge: string;
                color: string;
                colorModal: string;
                colorPopover: string;
            }, any>;
        };
        peerOverrides: {
            Avatar?: {
                peers?: {
                    [x: string]: any;
                } | undefined;
            } | undefined;
        };
    }>;
    rtlEnabled: import("vue").Ref<import("../../config-provider/src/internal-interface").RtlItem | undefined, import("../../config-provider/src/internal-interface").RtlItem | undefined> | undefined;
    mergedClsPrefix: import("vue").Ref<string, string>;
    restOptions: import("vue").ComputedRef<AvatarGroupOption[] | undefined>;
    displayedOptions: import("vue").ComputedRef<AvatarGroupOption[]>;
    cssVars: import("vue").ComputedRef<{
        '--n-gap': string;
    }>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly max: NumberConstructor;
    readonly maxStyle: PropType<CSSProperties | string>;
    readonly options: {
        readonly type: PropType<AvatarGroupOption[]>;
        readonly default: () => never[];
    };
    readonly vertical: BooleanConstructor;
    readonly expandOnHover: BooleanConstructor;
    readonly size: PropType<Size | undefined>;
    readonly theme: PropType<import("../../_mixins").Theme<"AvatarGroup", {
        gap: string;
    }, {
        Avatar: import("../../_mixins").Theme<"Avatar", {
            borderRadius: string;
            fontSize: string;
            border: string;
            heightTiny: string;
            heightSmall: string;
            heightMedium: string;
            heightLarge: string;
            heightHuge: string;
            color: string;
            colorModal: string;
            colorPopover: string;
        }, any>;
    }>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"AvatarGroup", {
        gap: string;
    }, {
        Avatar: import("../../_mixins").Theme<"Avatar", {
            borderRadius: string;
            fontSize: string;
            border: string;
            heightTiny: string;
            heightSmall: string;
            heightMedium: string;
            heightLarge: string;
            heightHuge: string;
            color: string;
            colorModal: string;
            colorPopover: string;
        }, any>;
    }>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"AvatarGroup", {
        gap: string;
    }, {
        Avatar: import("../../_mixins").Theme<"Avatar", {
            borderRadius: string;
            fontSize: string;
            border: string;
            heightTiny: string;
            heightSmall: string;
            heightMedium: string;
            heightLarge: string;
            heightHuge: string;
            color: string;
            colorModal: string;
            colorPopover: string;
        }, any>;
    }>>>;
}>> & Readonly<{}>, {
    readonly options: AvatarGroupOption[];
    readonly vertical: boolean;
    readonly expandOnHover: boolean;
}, SlotsType<AvatarGroupSlots>, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
