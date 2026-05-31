import type { CSSProperties, ExtractPropTypes, PropType } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
export interface LoadingBarInst {
    start: () => void;
    error: () => void;
    finish: () => void;
}
export type LoadingBarProviderInst = LoadingBarInst;
export type LoadingBarApiInjection = LoadingBarInst;
export declare const loadingBarProviderProps: {
    to: {
        type: PropType<string | HTMLElement | false>;
        default: undefined;
    };
    containerClass: StringConstructor;
    containerStyle: PropType<string | CSSProperties>;
    loadingBarStyle: {
        type: PropType<{
            loading?: string | CSSProperties;
            error?: string | CSSProperties;
        }>;
    };
    theme: PropType<import("../../_mixins").Theme<"LoadingBar", {
        colorError: string;
        colorLoading: string;
        height: string;
    }, any>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"LoadingBar", {
        colorError: string;
        colorLoading: string;
        height: string;
    }, any>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"LoadingBar", {
        colorError: string;
        colorLoading: string;
        height: string;
    }, any>>>;
};
export type LoadingBarProviderProps = ExtractPublicPropTypes<typeof loadingBarProviderProps>;
export type LoadingBarProviderSetupProps = ExtractPropTypes<typeof loadingBarProviderProps>;
declare const _default: import("vue").DefineComponent<ExtractPropTypes<{
    to: {
        type: PropType<string | HTMLElement | false>;
        default: undefined;
    };
    containerClass: StringConstructor;
    containerStyle: PropType<string | CSSProperties>;
    loadingBarStyle: {
        type: PropType<{
            loading?: string | CSSProperties;
            error?: string | CSSProperties;
        }>;
    };
    theme: PropType<import("../../_mixins").Theme<"LoadingBar", {
        colorError: string;
        colorLoading: string;
        height: string;
    }, any>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"LoadingBar", {
        colorError: string;
        colorLoading: string;
        height: string;
    }, any>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"LoadingBar", {
        colorError: string;
        colorLoading: string;
        height: string;
    }, any>>>;
}>, LoadingBarInst & {
    loadingBarRef: import("vue").Ref<{
        start: () => void;
        error: () => void;
        finish: () => void;
    } | null, LoadingBarInst | {
        start: () => void;
        error: () => void;
        finish: () => void;
    } | null>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ExtractPropTypes<{
    to: {
        type: PropType<string | HTMLElement | false>;
        default: undefined;
    };
    containerClass: StringConstructor;
    containerStyle: PropType<string | CSSProperties>;
    loadingBarStyle: {
        type: PropType<{
            loading?: string | CSSProperties;
            error?: string | CSSProperties;
        }>;
    };
    theme: PropType<import("../../_mixins").Theme<"LoadingBar", {
        colorError: string;
        colorLoading: string;
        height: string;
    }, any>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"LoadingBar", {
        colorError: string;
        colorLoading: string;
        height: string;
    }, any>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"LoadingBar", {
        colorError: string;
        colorLoading: string;
        height: string;
    }, any>>>;
}>> & Readonly<{}>, {
    to: string | false | HTMLElement;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
