import type { Filter, Option, OptionValue } from './interface';
interface UseTransferDataProps {
    defaultValue: OptionValue[] | null;
    value?: OptionValue[] | null;
    options: Option[];
    filterable: boolean | undefined;
    sourceFilterable: boolean;
    targetFilterable: boolean;
    showSelected: boolean;
    filter: Filter;
}
export declare function useTransferData(props: UseTransferDataProps): {
    uncontrolledValueRef: import("vue").Ref<OptionValue[] | null, OptionValue[] | null>;
    mergedValueRef: import("vue").ComputedRef<OptionValue[] | null>;
    targetValueSetRef: import("vue").ComputedRef<Set<OptionValue>>;
    valueSetForCheckAllRef: import("vue").ComputedRef<Set<string | number>>;
    valueSetForUncheckAllRef: import("vue").ComputedRef<Set<string | number>>;
    valueSetForClearRef: import("vue").ComputedRef<Set<string | number>>;
    filteredTgtOptionsRef: import("vue").ComputedRef<Option[]>;
    filteredSrcOptionsRef: import("vue").ComputedRef<Option[]>;
    targetOptionsRef: import("vue").ComputedRef<Option[]>;
    canNotSelectAnythingRef: import("vue").ComputedRef<boolean>;
    canBeClearedRef: import("vue").ComputedRef<boolean>;
    allCheckedRef: import("vue").ComputedRef<boolean>;
    srcPatternRef: import("vue").Ref<string, string>;
    tgtPatternRef: import("vue").Ref<string, string>;
    mergedSrcFilterableRef: import("vue").ComputedRef<boolean>;
    handleSrcFilterUpdateValue: (value: string | null) => void;
    handleTgtFilterUpdateValue: (value: string | null) => void;
};
export {};
