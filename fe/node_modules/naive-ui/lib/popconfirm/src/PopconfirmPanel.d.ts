import type { PropType } from 'vue';
export declare const panelProps: {
    readonly positiveText: PropType<string | null>;
    readonly negativeText: PropType<string | null>;
    readonly showIcon: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly onPositiveClick: {
        readonly type: PropType<(e: MouseEvent) => void>;
        readonly required: true;
    };
    readonly onNegativeClick: {
        readonly type: PropType<(e: MouseEvent) => void>;
        readonly required: true;
    };
};
export declare const panelPropKeys: ("showIcon" | "negativeText" | "positiveText" | "onPositiveClick" | "onNegativeClick")[];
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly positiveText: PropType<string | null>;
    readonly negativeText: PropType<string | null>;
    readonly showIcon: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly onPositiveClick: {
        readonly type: PropType<(e: MouseEvent) => void>;
        readonly required: true;
    };
    readonly onNegativeClick: {
        readonly type: PropType<(e: MouseEvent) => void>;
        readonly required: true;
    };
}>, {
    mergedClsPrefix: import("vue").Ref<string, string>;
    cssVars: import("vue").ComputedRef<{
        '--n-bezier': string;
        '--n-font-size': string;
        '--n-icon-size': string;
        '--n-icon-color': string;
    }> | undefined;
    localizedPositiveText: import("vue").ComputedRef<string>;
    localizedNegativeText: import("vue").ComputedRef<string>;
    positiveButtonProps: import("vue").Ref<import("../../button").ButtonProps | undefined, import("../../button").ButtonProps | undefined>;
    negativeButtonProps: import("vue").Ref<import("../../button").ButtonProps | undefined, import("../../button").ButtonProps | undefined>;
    handlePositiveClick(e: MouseEvent): void;
    handleNegativeClick(e: MouseEvent): void;
    themeClass: import("vue").Ref<string, string> | undefined;
    onRender: (() => void) | undefined;
    localeRef: import("vue").Ref<{
        positiveText: string;
        negativeText: string;
    }, {
        positiveText: string;
        negativeText: string;
    }>;
    dateLocaleRef: import("vue").Ref<import("../..").NDateLocale>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly positiveText: PropType<string | null>;
    readonly negativeText: PropType<string | null>;
    readonly showIcon: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly onPositiveClick: {
        readonly type: PropType<(e: MouseEvent) => void>;
        readonly required: true;
    };
    readonly onNegativeClick: {
        readonly type: PropType<(e: MouseEvent) => void>;
        readonly required: true;
    };
}>> & Readonly<{}>, {
    readonly showIcon: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
