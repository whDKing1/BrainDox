import type { PropType } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
export declare const badgeProps: {
    readonly value: PropType<string | number>;
    readonly max: NumberConstructor;
    readonly dot: BooleanConstructor;
    readonly type: {
        readonly type: PropType<"success" | "error" | "warning" | "info" | "default">;
        readonly default: "default";
    };
    readonly show: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly showZero: BooleanConstructor;
    readonly processing: BooleanConstructor;
    readonly color: StringConstructor;
    readonly offset: PropType<readonly [number | string, number | string]>;
    readonly theme: PropType<import("../../_mixins").Theme<"Badge", {
        color: string;
        colorInfo: string;
        colorSuccess: string;
        colorError: string;
        colorWarning: string;
        fontSize: string;
        fontFamily: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Badge", {
        color: string;
        colorInfo: string;
        colorSuccess: string;
        colorError: string;
        colorWarning: string;
        fontSize: string;
        fontFamily: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Badge", {
        color: string;
        colorInfo: string;
        colorSuccess: string;
        colorError: string;
        colorWarning: string;
        fontSize: string;
        fontFamily: string;
    }, any>>>;
};
export type BadgeProps = ExtractPublicPropTypes<typeof badgeProps>;
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly value: PropType<string | number>;
    readonly max: NumberConstructor;
    readonly dot: BooleanConstructor;
    readonly type: {
        readonly type: PropType<"success" | "error" | "warning" | "info" | "default">;
        readonly default: "default";
    };
    readonly show: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly showZero: BooleanConstructor;
    readonly processing: BooleanConstructor;
    readonly color: StringConstructor;
    readonly offset: PropType<readonly [number | string, number | string]>;
    readonly theme: PropType<import("../../_mixins").Theme<"Badge", {
        color: string;
        colorInfo: string;
        colorSuccess: string;
        colorError: string;
        colorWarning: string;
        fontSize: string;
        fontFamily: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Badge", {
        color: string;
        colorInfo: string;
        colorSuccess: string;
        colorError: string;
        colorWarning: string;
        fontSize: string;
        fontFamily: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Badge", {
        color: string;
        colorInfo: string;
        colorSuccess: string;
        colorError: string;
        colorWarning: string;
        fontSize: string;
        fontFamily: string;
    }, any>>>;
}>, {
    rtlEnabled: import("vue").Ref<import("../../config-provider/src/internal-interface").RtlItem | undefined, import("../../config-provider/src/internal-interface").RtlItem | undefined> | undefined;
    mergedClsPrefix: import("vue").Ref<string, string>;
    appeared: import("vue").Ref<boolean, boolean>;
    showBadge: import("vue").ComputedRef<boolean>;
    handleAfterEnter: () => void;
    handleAfterLeave: () => void;
    cssVars: import("vue").ComputedRef<{
        '--n-font-size': string;
        '--n-font-family': string;
        '--n-color': string;
        '--n-ripple-color': string;
        '--n-bezier': string;
        '--n-ripple-bezier': string;
    }> | undefined;
    themeClass: import("vue").Ref<string, string> | undefined;
    onRender: (() => void) | undefined;
    offsetStyle: import("vue").ComputedRef<{
        transform: string;
    } | undefined>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly value: PropType<string | number>;
    readonly max: NumberConstructor;
    readonly dot: BooleanConstructor;
    readonly type: {
        readonly type: PropType<"success" | "error" | "warning" | "info" | "default">;
        readonly default: "default";
    };
    readonly show: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly showZero: BooleanConstructor;
    readonly processing: BooleanConstructor;
    readonly color: StringConstructor;
    readonly offset: PropType<readonly [number | string, number | string]>;
    readonly theme: PropType<import("../../_mixins").Theme<"Badge", {
        color: string;
        colorInfo: string;
        colorSuccess: string;
        colorError: string;
        colorWarning: string;
        fontSize: string;
        fontFamily: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Badge", {
        color: string;
        colorInfo: string;
        colorSuccess: string;
        colorError: string;
        colorWarning: string;
        fontSize: string;
        fontFamily: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Badge", {
        color: string;
        colorInfo: string;
        colorSuccess: string;
        colorError: string;
        colorWarning: string;
        fontSize: string;
        fontFamily: string;
    }, any>>>;
}>> & Readonly<{}>, {
    readonly type: "default" | "info" | "warning" | "error" | "success";
    readonly show: boolean;
    readonly dot: boolean;
    readonly showZero: boolean;
    readonly processing: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
