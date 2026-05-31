import type { PropType, SlotsType, VNode } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
export declare const stepProps: {
    readonly status: PropType<"process" | "finish" | "error" | "wait">;
    readonly title: StringConstructor;
    readonly description: StringConstructor;
    readonly disabled: BooleanConstructor;
    readonly internalIndex: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
};
export type StepProps = ExtractPublicPropTypes<typeof stepProps>;
export interface StepSlots {
    default?: () => VNode[];
    icon?: () => VNode[];
    title?: () => VNode[];
}
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly status: PropType<"process" | "finish" | "error" | "wait">;
    readonly title: StringConstructor;
    readonly description: StringConstructor;
    readonly disabled: BooleanConstructor;
    readonly internalIndex: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
}>, {
    stepsSlots: import("./Steps").StepsSlots;
    mergedClsPrefix: import("vue").Ref<string, string>;
    vertical: import("vue").Ref<boolean, boolean>;
    mergedStatus: import("vue").ComputedRef<"error" | "wait" | "finish" | "process">;
    handleStepClick: import("vue").ComputedRef<(() => void) | undefined>;
    cssVars: import("vue").ComputedRef<{
        '--n-bezier': string;
        '--n-description-text-color': string;
        '--n-header-text-color': string;
        '--n-indicator-border-color': string;
        '--n-indicator-color': string;
        '--n-indicator-icon-size': string;
        '--n-indicator-index-font-size': string;
        '--n-indicator-size': string;
        '--n-indicator-text-color': string;
        '--n-splitor-color': string;
        '--n-step-header-font-size': string;
        '--n-step-header-font-weight': string;
    }> | undefined;
    themeClass: import("vue").Ref<string, string> | undefined;
    onRender: (() => void) | undefined;
    contentPlacement: import("vue").Ref<"bottom" | "right", "bottom" | "right">;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly status: PropType<"process" | "finish" | "error" | "wait">;
    readonly title: StringConstructor;
    readonly description: StringConstructor;
    readonly disabled: BooleanConstructor;
    readonly internalIndex: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
}>> & Readonly<{}>, {
    readonly disabled: boolean;
    readonly internalIndex: number;
}, SlotsType<StepSlots>, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
