import type { ComputedRef, PropType, Ref } from 'vue';
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils';
export interface CheckboxGroupInjection {
    checkedCountRef: ComputedRef<number>;
    maxRef: Ref<number | undefined>;
    minRef: Ref<number | undefined>;
    disabledRef: Ref<boolean>;
    valueSetRef: Ref<Set<string | number>>;
    mergedSizeRef: Ref<'small' | 'medium' | 'large'>;
    toggleCheckbox: (checked: boolean, checkboxValue: string | number) => void;
}
export declare const checkboxGroupInjectionKey: import("vue").InjectionKey<CheckboxGroupInjection>;
export declare const checkboxGroupProps: {
    readonly min: NumberConstructor;
    readonly max: NumberConstructor;
    readonly size: PropType<"small" | "medium" | "large">;
    readonly value: PropType<Array<string | number> | null>;
    readonly defaultValue: {
        readonly type: PropType<Array<string | number> | null>;
        readonly default: null;
    };
    readonly disabled: {
        readonly type: PropType<boolean | undefined>;
        readonly default: undefined;
    };
    readonly 'onUpdate:value': PropType<MaybeArray<(value: Array<string | number>, meta: {
        actionType: "check" | "uncheck";
        value: string | number;
    }) => void>>;
    readonly onUpdateValue: PropType<MaybeArray<(value: Array<string | number>, meta: {
        actionType: "check" | "uncheck";
        value: string | number;
    }) => void>>;
    readonly onChange: PropType<MaybeArray<(value: Array<string | number>) => void> | undefined>;
};
export type CheckboxGroupProps = ExtractPublicPropTypes<typeof checkboxGroupProps>;
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly min: NumberConstructor;
    readonly max: NumberConstructor;
    readonly size: PropType<"small" | "medium" | "large">;
    readonly value: PropType<Array<string | number> | null>;
    readonly defaultValue: {
        readonly type: PropType<Array<string | number> | null>;
        readonly default: null;
    };
    readonly disabled: {
        readonly type: PropType<boolean | undefined>;
        readonly default: undefined;
    };
    readonly 'onUpdate:value': PropType<MaybeArray<(value: Array<string | number>, meta: {
        actionType: "check" | "uncheck";
        value: string | number;
    }) => void>>;
    readonly onUpdateValue: PropType<MaybeArray<(value: Array<string | number>, meta: {
        actionType: "check" | "uncheck";
        value: string | number;
    }) => void>>;
    readonly onChange: PropType<MaybeArray<(value: Array<string | number>) => void> | undefined>;
}>, {
    mergedClsPrefix: Ref<string, string>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly min: NumberConstructor;
    readonly max: NumberConstructor;
    readonly size: PropType<"small" | "medium" | "large">;
    readonly value: PropType<Array<string | number> | null>;
    readonly defaultValue: {
        readonly type: PropType<Array<string | number> | null>;
        readonly default: null;
    };
    readonly disabled: {
        readonly type: PropType<boolean | undefined>;
        readonly default: undefined;
    };
    readonly 'onUpdate:value': PropType<MaybeArray<(value: Array<string | number>, meta: {
        actionType: "check" | "uncheck";
        value: string | number;
    }) => void>>;
    readonly onUpdateValue: PropType<MaybeArray<(value: Array<string | number>, meta: {
        actionType: "check" | "uncheck";
        value: string | number;
    }) => void>>;
    readonly onChange: PropType<MaybeArray<(value: Array<string | number>) => void> | undefined>;
}>> & Readonly<{}>, {
    readonly disabled: boolean | undefined;
    readonly defaultValue: (string | number)[] | null;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
