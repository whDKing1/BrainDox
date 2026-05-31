import type { ComputedRef, ExtractPropTypes, PropType } from 'vue';
import type { Hljs } from '../../_mixins';
import type { NDateLocale, NLocale } from '../../locales';
import type { GlobalComponentConfig, GlobalIconConfig, GlobalTheme, GlobalThemeOverrides } from './interface';
import type { Breakpoints, RtlProp } from './internal-interface';
import type { Katex } from './katex';
export declare const configProviderProps: {
    readonly abstract: BooleanConstructor;
    readonly bordered: {
        readonly type: PropType<boolean | undefined>;
        readonly default: undefined;
    };
    readonly clsPrefix: StringConstructor;
    readonly locale: PropType<NLocale | null>;
    readonly dateLocale: PropType<NDateLocale | null>;
    readonly namespace: StringConstructor;
    readonly rtl: PropType<RtlProp>;
    readonly tag: {
        readonly type: StringConstructor;
        readonly default: "div";
    };
    readonly hljs: PropType<Hljs>;
    readonly katex: PropType<Katex>;
    readonly theme: PropType<GlobalTheme | null>;
    readonly themeOverrides: PropType<GlobalThemeOverrides | null>;
    readonly componentOptions: PropType<GlobalComponentConfig>;
    readonly icons: PropType<GlobalIconConfig>;
    readonly breakpoints: PropType<Breakpoints>;
    readonly preflightStyleDisabled: BooleanConstructor;
    readonly styleMountTarget: PropType<ParentNode | null>;
    readonly inlineThemeDisabled: {
        readonly type: BooleanConstructor;
        readonly default: undefined;
    };
    readonly as: {
        readonly type: PropType<string | undefined>;
        readonly validator: () => boolean;
        readonly default: undefined;
    };
};
export type ConfigProviderProps = Partial<ExtractPropTypes<typeof configProviderProps>>;
declare const _default: import("vue").DefineComponent<ExtractPropTypes<{
    readonly abstract: BooleanConstructor;
    readonly bordered: {
        readonly type: PropType<boolean | undefined>;
        readonly default: undefined;
    };
    readonly clsPrefix: StringConstructor;
    readonly locale: PropType<NLocale | null>;
    readonly dateLocale: PropType<NDateLocale | null>;
    readonly namespace: StringConstructor;
    readonly rtl: PropType<RtlProp>;
    readonly tag: {
        readonly type: StringConstructor;
        readonly default: "div";
    };
    readonly hljs: PropType<Hljs>;
    readonly katex: PropType<Katex>;
    readonly theme: PropType<GlobalTheme | null>;
    readonly themeOverrides: PropType<GlobalThemeOverrides | null>;
    readonly componentOptions: PropType<GlobalComponentConfig>;
    readonly icons: PropType<GlobalIconConfig>;
    readonly breakpoints: PropType<Breakpoints>;
    readonly preflightStyleDisabled: BooleanConstructor;
    readonly styleMountTarget: PropType<ParentNode | null>;
    readonly inlineThemeDisabled: {
        readonly type: BooleanConstructor;
        readonly default: undefined;
    };
    readonly as: {
        readonly type: PropType<string | undefined>;
        readonly validator: () => boolean;
        readonly default: undefined;
    };
}>, {
    mergedClsPrefix: ComputedRef<string>;
    mergedBordered: ComputedRef<boolean | undefined>;
    mergedNamespace: ComputedRef<string | undefined>;
    mergedTheme: ComputedRef<GlobalTheme | undefined>;
    mergedThemeOverrides: ComputedRef<GlobalThemeOverrides | undefined>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ExtractPropTypes<{
    readonly abstract: BooleanConstructor;
    readonly bordered: {
        readonly type: PropType<boolean | undefined>;
        readonly default: undefined;
    };
    readonly clsPrefix: StringConstructor;
    readonly locale: PropType<NLocale | null>;
    readonly dateLocale: PropType<NDateLocale | null>;
    readonly namespace: StringConstructor;
    readonly rtl: PropType<RtlProp>;
    readonly tag: {
        readonly type: StringConstructor;
        readonly default: "div";
    };
    readonly hljs: PropType<Hljs>;
    readonly katex: PropType<Katex>;
    readonly theme: PropType<GlobalTheme | null>;
    readonly themeOverrides: PropType<GlobalThemeOverrides | null>;
    readonly componentOptions: PropType<GlobalComponentConfig>;
    readonly icons: PropType<GlobalIconConfig>;
    readonly breakpoints: PropType<Breakpoints>;
    readonly preflightStyleDisabled: BooleanConstructor;
    readonly styleMountTarget: PropType<ParentNode | null>;
    readonly inlineThemeDisabled: {
        readonly type: BooleanConstructor;
        readonly default: undefined;
    };
    readonly as: {
        readonly type: PropType<string | undefined>;
        readonly validator: () => boolean;
        readonly default: undefined;
    };
}>> & Readonly<{}>, {
    readonly bordered: boolean | undefined;
    readonly inlineThemeDisabled: boolean;
    readonly tag: string;
    readonly abstract: boolean;
    readonly preflightStyleDisabled: boolean;
    readonly as: string | undefined;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
