import type { Ref } from 'vue';
import type { NDateLocale } from '../../locales';
import type { DatePickerGetDefaultTime, DatePickerGetRangeDefaultTime, FirstDayOfWeek, Value } from './interface';
declare function getDerivedTimeFromKeyboardEvent(prevValue: number | null, event: KeyboardEvent): number;
export declare function transformNaiveFirstDayOfWeekToDateFns(firstDayOfWeek: FirstDayOfWeek): FirstDayOfWeek;
export interface DateItem {
    type: 'date';
    dateObject: {
        date: number;
        month: number;
        year: number;
    };
    inCurrentMonth: boolean;
    isCurrentDate: boolean;
    inSpan: boolean;
    startOfSpan: boolean;
    endOfSpan: boolean;
    selected: boolean;
    inSelectedWeek: boolean;
    ts: number;
}
export interface MonthItem {
    type: 'month';
    monthFormat: string;
    dateObject: {
        month: number;
        year: number;
    };
    isCurrent: boolean;
    selected: boolean;
    ts: number;
}
export interface YearItem {
    type: 'year';
    yearFormat: string;
    dateObject: {
        year: number;
    };
    isCurrent: boolean;
    selected: boolean;
    ts: number;
}
export interface QuarterItem {
    type: 'quarter';
    quarterFormat: string;
    dateObject: {
        quarter: number;
        year: number;
    };
    isCurrent: boolean;
    selected: boolean;
    ts: number;
}
declare function getMonthString(month: number, monthFormat: string, locale: NDateLocale['locale']): string;
declare function getYearString(year: number, yearFormat: string, locale: NDateLocale['locale']): string;
declare function getQuarterString(quarter: number, quarterFormat: string, locale: NDateLocale['locale']): string;
/**
 * Given time to display calendar, given the selected time, given current time,
 * return the date array of display time's month.
 */
declare function dateArray(monthTs: number, valueTs: number | [number, number] | null, currentTs: number, startDay: 0 | 1 | 2 | 3 | 4 | 5 | 6, strip?: boolean, weekMode?: boolean): DateItem[];
declare function monthArray(yearAnchorTs: number, valueTs: number | null, currentTs: number, format: {
    monthFormat: string;
}): MonthItem[];
declare function quarterArray(yearAnchorTs: number, valueTs: number | null, currentTs: number, format: {
    quarterFormat: string;
}): QuarterItem[];
declare function yearArray(valueTs: number | null, currentTs: number, format: {
    yearFormat: string;
}, rangeRef: Ref<[number, number]>): YearItem[];
declare function strictParse(string: string, pattern: string, backup: Date, option: {
    locale: NDateLocale['locale'];
}): Date;
declare function extractSingleDefaultTime(timestamp: number, defaultTimeExtractor: DatePickerGetDefaultTime): {
    hours: number;
    minutes: number;
    seconds: number;
} | undefined;
declare function extractRangeDefaultTime(timestamp: number, defaultTimeExtractor: DatePickerGetRangeDefaultTime, position: 'start' | 'end', value: [number, number] | null): {
    hours: number;
    minutes: number;
    seconds: number;
} | undefined;
declare function getDefaultTime(timeValue: string | undefined): {
    hours: number;
    minutes: number;
    seconds: number;
} | undefined;
declare function pluckValueFromRange(value: Value | null, type: 'start' | 'end'): number | null;
export { dateArray, extractRangeDefaultTime, extractSingleDefaultTime, getDefaultTime, getDerivedTimeFromKeyboardEvent, getMonthString, getQuarterString, getYearString, monthArray, pluckValueFromRange, quarterArray, strictParse, yearArray };
