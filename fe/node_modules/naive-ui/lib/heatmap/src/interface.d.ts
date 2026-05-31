import type { HeatmapDataItem } from './public-types';
export interface DayRect extends HeatmapDataItem {
    color: string;
    dayOfWeek: number;
    rowIndex: number;
    colIndex: number;
}
