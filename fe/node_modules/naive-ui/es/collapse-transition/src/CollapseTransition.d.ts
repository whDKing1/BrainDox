import type { PropType } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
export declare const collapseTransitionProps: {
    readonly show: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly appear: BooleanConstructor;
    /** @deprecated */
    readonly collapsed: {
        readonly type: PropType<boolean | undefined>;
        readonly default: undefined;
    };
    readonly theme: PropType<import("../../_mixins").Theme<"CollapseTransition", {
        bezier: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"CollapseTransition", {
        bezier: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"CollapseTransition", {
        bezier: string;
    }, any>>>;
};
export type CollapseTransitionProps = ExtractPublicPropTypes<typeof collapseTransitionProps>;
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly show: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly appear: BooleanConstructor;
    /** @deprecated */
    readonly collapsed: {
        readonly type: PropType<boolean | undefined>;
        readonly default: undefined;
    };
    readonly theme: PropType<import("../../_mixins").Theme<"CollapseTransition", {
        bezier: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"CollapseTransition", {
        bezier: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"CollapseTransition", {
        bezier: string;
    }, any>>>;
}>, {
    rtlEnabled: import("vue").Ref<import("../../config-provider/src/internal-interface").RtlItem | undefined, import("../../config-provider/src/internal-interface").RtlItem | undefined> | undefined;
    mergedShow: import("vue").ComputedRef<boolean>;
    mergedClsPrefix: import("vue").Ref<string, string>;
    cssVars: import("vue").ComputedRef<{
        '--n-bezier': string;
    }> | undefined;
    themeClass: import("vue").Ref<string, string> | undefined;
    onRender: (() => void) | undefined;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly show: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly appear: BooleanConstructor;
    /** @deprecated */
    readonly collapsed: {
        readonly type: PropType<boolean | undefined>;
        readonly default: undefined;
    };
    readonly theme: PropType<import("../../_mixins").Theme<"CollapseTransition", {
        bezier: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"CollapseTransition", {
        bezier: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"CollapseTransition", {
        bezier: string;
    }, any>>>;
}>> & Readonly<{}>, {
    readonly show: boolean;
    readonly collapsed: boolean | undefined;
    readonly appear: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
