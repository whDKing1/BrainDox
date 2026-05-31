import type { PropType } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
export declare const dividerProps: {
    readonly titlePlacement: {
        readonly type: PropType<"left" | "center" | "right">;
        readonly default: "center";
    };
    readonly dashed: BooleanConstructor;
    readonly vertical: BooleanConstructor;
    readonly theme: PropType<import("../../_mixins").Theme<"Divider", {
        textColor: string;
        color: string;
        fontWeight: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Divider", {
        textColor: string;
        color: string;
        fontWeight: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Divider", {
        textColor: string;
        color: string;
        fontWeight: string;
    }, any>>>;
};
export type DividerProps = ExtractPublicPropTypes<typeof dividerProps>;
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly titlePlacement: {
        readonly type: PropType<"left" | "center" | "right">;
        readonly default: "center";
    };
    readonly dashed: BooleanConstructor;
    readonly vertical: BooleanConstructor;
    readonly theme: PropType<import("../../_mixins").Theme<"Divider", {
        textColor: string;
        color: string;
        fontWeight: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Divider", {
        textColor: string;
        color: string;
        fontWeight: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Divider", {
        textColor: string;
        color: string;
        fontWeight: string;
    }, any>>>;
}>, {
    mergedClsPrefix: import("vue").Ref<string, string>;
    cssVars: import("vue").ComputedRef<{
        '--n-bezier': string;
        '--n-color': string;
        '--n-text-color': string;
        '--n-font-weight': string;
    }> | undefined;
    themeClass: import("vue").Ref<string, string> | undefined;
    onRender: (() => void) | undefined;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly titlePlacement: {
        readonly type: PropType<"left" | "center" | "right">;
        readonly default: "center";
    };
    readonly dashed: BooleanConstructor;
    readonly vertical: BooleanConstructor;
    readonly theme: PropType<import("../../_mixins").Theme<"Divider", {
        textColor: string;
        color: string;
        fontWeight: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Divider", {
        textColor: string;
        color: string;
        fontWeight: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Divider", {
        textColor: string;
        color: string;
        fontWeight: string;
    }, any>>>;
}>> & Readonly<{}>, {
    readonly vertical: boolean;
    readonly dashed: boolean;
    readonly titlePlacement: "left" | "right" | "center";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
