import type { CSSProperties, PropType, SlotsType, VNode } from 'vue';
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils';
export declare const floatButtonProps: {
    readonly width: {
        readonly type: PropType<string | number>;
        readonly default: 40;
    };
    readonly height: {
        readonly type: PropType<string | number>;
        readonly default: 40;
    };
    readonly left: PropType<string | number>;
    readonly right: PropType<string | number>;
    readonly top: PropType<string | number>;
    readonly bottom: PropType<string | number>;
    readonly shape: {
        readonly type: PropType<"square" | "circle">;
        readonly default: "circle";
    };
    readonly position: {
        readonly type: PropType<"relative" | "absolute" | "fixed">;
        readonly default: "fixed";
    };
    readonly type: {
        readonly type: PropType<"default" | "primary">;
        readonly default: "default";
    };
    readonly menuTrigger: PropType<"hover" | "click">;
    readonly showMenu: {
        readonly type: BooleanConstructor;
        readonly default: undefined;
    };
    readonly onUpdateShowMenu: {
        readonly type: PropType<MaybeArray<(value: boolean) => void>>;
        readonly default: undefined;
    };
    readonly 'onUpdate:showMenu': {
        readonly type: PropType<MaybeArray<(value: boolean) => void>>;
        readonly default: undefined;
    };
    readonly theme: PropType<import("../../_mixins").Theme<"FloatButton", {
        color: string;
        colorHover: string;
        colorPressed: string;
        colorPrimary: string;
        colorPrimaryHover: string;
        colorPrimaryPressed: string;
        textColor: string;
        boxShadow: string;
        boxShadowHover: string;
        boxShadowPressed: string;
        textColorPrimary: string;
        borderRadiusSquare: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"FloatButton", {
        color: string;
        colorHover: string;
        colorPressed: string;
        colorPrimary: string;
        colorPrimaryHover: string;
        colorPrimaryPressed: string;
        textColor: string;
        boxShadow: string;
        boxShadowHover: string;
        boxShadowPressed: string;
        textColorPrimary: string;
        borderRadiusSquare: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"FloatButton", {
        color: string;
        colorHover: string;
        colorPressed: string;
        colorPrimary: string;
        colorPrimaryHover: string;
        colorPrimaryPressed: string;
        textColor: string;
        boxShadow: string;
        boxShadowHover: string;
        boxShadowPressed: string;
        textColorPrimary: string;
        borderRadiusSquare: string;
    }, any>>>;
};
export type FloatButtonProps = ExtractPublicPropTypes<typeof floatButtonProps>;
export interface FloatButtonSlots {
    default?: () => VNode[];
    description?: () => VNode[];
    menu?: () => VNode[];
}
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly width: {
        readonly type: PropType<string | number>;
        readonly default: 40;
    };
    readonly height: {
        readonly type: PropType<string | number>;
        readonly default: 40;
    };
    readonly left: PropType<string | number>;
    readonly right: PropType<string | number>;
    readonly top: PropType<string | number>;
    readonly bottom: PropType<string | number>;
    readonly shape: {
        readonly type: PropType<"square" | "circle">;
        readonly default: "circle";
    };
    readonly position: {
        readonly type: PropType<"relative" | "absolute" | "fixed">;
        readonly default: "fixed";
    };
    readonly type: {
        readonly type: PropType<"default" | "primary">;
        readonly default: "default";
    };
    readonly menuTrigger: PropType<"hover" | "click">;
    readonly showMenu: {
        readonly type: BooleanConstructor;
        readonly default: undefined;
    };
    readonly onUpdateShowMenu: {
        readonly type: PropType<MaybeArray<(value: boolean) => void>>;
        readonly default: undefined;
    };
    readonly 'onUpdate:showMenu': {
        readonly type: PropType<MaybeArray<(value: boolean) => void>>;
        readonly default: undefined;
    };
    readonly theme: PropType<import("../../_mixins").Theme<"FloatButton", {
        color: string;
        colorHover: string;
        colorPressed: string;
        colorPrimary: string;
        colorPrimaryHover: string;
        colorPrimaryPressed: string;
        textColor: string;
        boxShadow: string;
        boxShadowHover: string;
        boxShadowPressed: string;
        textColorPrimary: string;
        borderRadiusSquare: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"FloatButton", {
        color: string;
        colorHover: string;
        colorPressed: string;
        colorPrimary: string;
        colorPrimaryHover: string;
        colorPrimaryPressed: string;
        textColor: string;
        boxShadow: string;
        boxShadowHover: string;
        boxShadowPressed: string;
        textColorPrimary: string;
        borderRadiusSquare: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"FloatButton", {
        color: string;
        colorHover: string;
        colorPressed: string;
        colorPrimary: string;
        colorPrimaryHover: string;
        colorPrimaryPressed: string;
        textColor: string;
        boxShadow: string;
        boxShadowHover: string;
        boxShadowPressed: string;
        textColorPrimary: string;
        borderRadiusSquare: string;
    }, any>>>;
}>, {
    inlineStyle: import("vue").ComputedRef<CSSProperties>;
    selfElRef: import("vue").Ref<HTMLDivElement | null, HTMLDivElement | null>;
    cssVars: import("vue").ComputedRef<Record<string, string>> | undefined;
    mergedClsPrefix: import("vue").Ref<string, string>;
    mergedShape: import("vue").ComputedRef<"circle" | "square">;
    mergedShowMenu: import("vue").ComputedRef<boolean>;
    themeClass: import("vue").Ref<string, string> | undefined;
    onRender: (() => void) | undefined;
    Mouseenter: () => void;
    handleMouseleave: () => void;
    handleClick: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly width: {
        readonly type: PropType<string | number>;
        readonly default: 40;
    };
    readonly height: {
        readonly type: PropType<string | number>;
        readonly default: 40;
    };
    readonly left: PropType<string | number>;
    readonly right: PropType<string | number>;
    readonly top: PropType<string | number>;
    readonly bottom: PropType<string | number>;
    readonly shape: {
        readonly type: PropType<"square" | "circle">;
        readonly default: "circle";
    };
    readonly position: {
        readonly type: PropType<"relative" | "absolute" | "fixed">;
        readonly default: "fixed";
    };
    readonly type: {
        readonly type: PropType<"default" | "primary">;
        readonly default: "default";
    };
    readonly menuTrigger: PropType<"hover" | "click">;
    readonly showMenu: {
        readonly type: BooleanConstructor;
        readonly default: undefined;
    };
    readonly onUpdateShowMenu: {
        readonly type: PropType<MaybeArray<(value: boolean) => void>>;
        readonly default: undefined;
    };
    readonly 'onUpdate:showMenu': {
        readonly type: PropType<MaybeArray<(value: boolean) => void>>;
        readonly default: undefined;
    };
    readonly theme: PropType<import("../../_mixins").Theme<"FloatButton", {
        color: string;
        colorHover: string;
        colorPressed: string;
        colorPrimary: string;
        colorPrimaryHover: string;
        colorPrimaryPressed: string;
        textColor: string;
        boxShadow: string;
        boxShadowHover: string;
        boxShadowPressed: string;
        textColorPrimary: string;
        borderRadiusSquare: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"FloatButton", {
        color: string;
        colorHover: string;
        colorPressed: string;
        colorPrimary: string;
        colorPrimaryHover: string;
        colorPrimaryPressed: string;
        textColor: string;
        boxShadow: string;
        boxShadowHover: string;
        boxShadowPressed: string;
        textColorPrimary: string;
        borderRadiusSquare: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"FloatButton", {
        color: string;
        colorHover: string;
        colorPressed: string;
        colorPrimary: string;
        colorPrimaryHover: string;
        colorPrimaryPressed: string;
        textColor: string;
        boxShadow: string;
        boxShadowHover: string;
        boxShadowPressed: string;
        textColorPrimary: string;
        borderRadiusSquare: string;
    }, any>>>;
}>> & Readonly<{}>, {
    readonly type: "default" | "primary";
    readonly position: "fixed" | "absolute" | "relative";
    readonly height: string | number;
    readonly width: string | number;
    readonly shape: "circle" | "square";
    readonly showMenu: boolean;
    readonly onUpdateShowMenu: MaybeArray<(value: boolean) => void>;
    readonly 'onUpdate:showMenu': MaybeArray<(value: boolean) => void>;
}, SlotsType<FloatButtonSlots>, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
