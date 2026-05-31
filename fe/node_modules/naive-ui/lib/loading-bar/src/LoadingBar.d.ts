import type { CSSProperties, PropType } from 'vue';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    containerClass: StringConstructor;
    containerStyle: PropType<string | CSSProperties>;
}>, {
    mergedClsPrefix: import("vue").Ref<string, string>;
    loadingBarRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    started: import("vue").Ref<boolean, boolean>;
    loading: import("vue").Ref<boolean, boolean>;
    entering: import("vue").Ref<boolean, boolean>;
    transitionDisabled: import("vue").Ref<boolean, boolean>;
    start: (fromProgress?: number, toProgress?: number, status?: "starting" | "error") => Promise<void>;
    error: () => void;
    finish: () => Promise<void>;
    handleEnter: () => void;
    handleAfterEnter: () => void;
    handleAfterLeave: () => Promise<void>;
    mergedLoadingBarStyle: import("vue").ComputedRef<string | CSSProperties | undefined>;
    cssVars: import("vue").ComputedRef<{
        '--n-height': string;
        '--n-color-loading': string;
        '--n-color-error': string;
    }> | undefined;
    themeClass: import("vue").Ref<string, string> | undefined;
    onRender: (() => void) | undefined;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    containerClass: StringConstructor;
    containerStyle: PropType<string | CSSProperties>;
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
