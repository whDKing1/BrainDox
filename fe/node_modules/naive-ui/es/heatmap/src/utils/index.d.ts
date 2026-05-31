import type { DayRect } from '../interface';
import type { HeatmapData, HeatmapDataItem, HeatmapFirstDayOfWeek } from '../public-types';
/** get color by value/maxValue */
export declare function calcColorByValue(colors: string[], value: number | null | undefined, maxValue: number): string;
/**
 * fill gaps for the given data
 *
 * fill gaps `[firstDate,lastDate]` with value `0`
 *
 * fill `[firstCalendarDate,firstDate]` and `[lastDate,lastCalendarDate]` with value `null` by default
 *
 * fill `[firstCalendarDate,firstDate]` with value `0` when `fillCalendarLeading` is `true`
 */
export declare function completeDataGaps(data: HeatmapData, firstDayOfWeek: HeatmapFirstDayOfWeek, fillCalendarLeading: boolean): HeatmapData;
/**
 * Create a DayRect object with position information
 */
export declare function createDayRect(item: HeatmapDataItem, calendarStartDate: number, weekStartOn: number, colors: string[], maxValue: number): DayRect;
/**
 * Create a sparse matrix from items with position information
 */
export declare function createSparseMatrix<T>(rows: number, items: T[], getRowIndex: (item: T) => number, getColIndex: (item: T) => number): T[][];
/**
 * This creates a 7x53 matrix (typical year layout) filled with loading cells
 */
export declare function createLoadingMatrix(firstDayOfWeek: HeatmapFirstDayOfWeek): DayRect[][];
/**
 * Generate heatmap data for mock purposes.
 * This function generates random data and the result is not stable.
 * @param range - 'recent' for last year, or a specific year number
 */
export declare function heatmapMockData(year?: 'recent' | number): HeatmapData;
