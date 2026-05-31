import type { MaybeArray } from '../../_utils';
export declare const time: {
    amHours: string[];
    pmHours: string[];
    hours: string[];
    minutes: string[];
    seconds: string[];
    period: string[];
};
export declare function getFixValue(value: number): string;
export declare function getTimeUnits(defaultValue: string[], stepOrList: MaybeArray<number> | undefined, isHourWithAmPm?: 'am' | 'pm'): string[];
export declare function isTimeInStep(value: number, type: 'hours' | 'minutes' | 'seconds', stepOrList: MaybeArray<number> | undefined): boolean;
export declare function findSimilarTime(value: number, type: 'hours' | 'minutes' | 'seconds', stepOrList: MaybeArray<number> | undefined): number;
export declare function getAmPm(value: number): 'am' | 'pm';
