import type { Ref } from 'vue';
import type { CheckedStatus, Filter, Option, OptionValue } from './interface';
interface UseTransferDataProps {
    defaultValue: OptionValue[] | null;
    value?: OptionValue[] | null;
    options: Option[];
    filterable: boolean;
    filter: Filter;
}
export declare function useTransferData(props: UseTransferDataProps, mergedDisabledRef: Ref<boolean>): {
    uncontrolledValue: Ref<OptionValue[] | null, OptionValue[] | null>;
    mergedValue: import("vue").ComputedRef<OptionValue[] | null>;
    avlSrcValueSet: import("vue").ComputedRef<Set<OptionValue>>;
    avlTgtValueSet: import("vue").ComputedRef<Set<any>>;
    tgtOpts: import("vue").ComputedRef<any[]>;
    srcOpts: import("vue").ComputedRef<Option[]>;
    filteredSrcOpts: import("vue").ComputedRef<Option[]>;
    filteredTgtOpts: import("vue").ComputedRef<any[]>;
    srcCheckedValues: Ref<OptionValue[], OptionValue[]>;
    tgtCheckedValues: Ref<OptionValue[], OptionValue[]>;
    srcCheckedStatus: import("vue").ComputedRef<CheckedStatus>;
    tgtCheckedStatus: import("vue").ComputedRef<{
        checked: boolean;
        indeterminate: boolean;
        disabled: boolean;
    } | {
        checked: boolean;
        indeterminate: boolean;
        disabled?: undefined;
    }>;
    srcPattern: Ref<string, string>;
    tgtPattern: Ref<string, string>;
    isInputing: Ref<boolean, boolean>;
    fromButtonDisabled: import("vue").ComputedRef<boolean>;
    toButtonDisabled: import("vue").ComputedRef<boolean>;
    handleInputFocus: () => void;
    handleInputBlur: () => void;
    handleTgtFilterUpdateValue: (value: string | null) => void;
    handleSrcFilterUpdateValue: (value: string | null) => void;
};
export {};
