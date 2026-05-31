import type { Ref } from 'vue';
import type { DatePickerSetupProps } from './DatePicker';
export declare function uniCalendarValidation(props: DatePickerSetupProps, mergedValueRef: Ref<number | [number, number] | null>): {
    isValueInvalidRef: import("vue").ComputedRef<boolean>;
    isDateInvalidRef: import("vue").ComputedRef<boolean>;
    isTimeInvalidRef: import("vue").ComputedRef<boolean>;
    isDateTimeInvalidRef: import("vue").ComputedRef<boolean>;
    isHourDisabledRef: import("vue").ComputedRef<import("../../time-picker/src/interface").IsHourDisabled | undefined>;
    isMinuteDisabledRef: import("vue").ComputedRef<import("../../time-picker/src/interface").IsMinuteDisabled | undefined>;
    isSecondDisabledRef: import("vue").ComputedRef<import("../../time-picker/src/interface").IsSecondDisabled | undefined>;
};
export declare function dualCalendarValidation(props: DatePickerSetupProps, mergedValueRef: Ref<number | [number, number] | null>): {
    isStartDateInvalidRef: import("vue").ComputedRef<boolean>;
    isEndDateInvalidRef: import("vue").ComputedRef<boolean>;
    isStartTimeInvalidRef: import("vue").ComputedRef<boolean>;
    isEndTimeInvalidRef: import("vue").ComputedRef<boolean>;
    isStartValueInvalidRef: import("vue").ComputedRef<boolean>;
    isEndValueInvalidRef: import("vue").ComputedRef<boolean>;
    isRangeInvalidRef: import("vue").ComputedRef<boolean>;
    isStartHourDisabledRef: import("vue").ComputedRef<import("../../time-picker/src/interface").IsHourDisabled | undefined>;
    isEndHourDisabledRef: import("vue").ComputedRef<import("../../time-picker/src/interface").IsHourDisabled | undefined>;
    isStartMinuteDisabledRef: import("vue").ComputedRef<import("../../time-picker/src/interface").IsMinuteDisabled | undefined>;
    isEndMinuteDisabledRef: import("vue").ComputedRef<import("../../time-picker/src/interface").IsMinuteDisabled | undefined>;
    isStartSecondDisabledRef: import("vue").ComputedRef<import("../../time-picker/src/interface").IsSecondDisabled | undefined>;
    isEndSecondDisabledRef: import("vue").ComputedRef<import("../../time-picker/src/interface").IsSecondDisabled | undefined>;
};
