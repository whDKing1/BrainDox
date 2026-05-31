export declare function depx(value: string | number): number;
declare function pxfy<T extends string | number | undefined | null>(value: T): T extends string | number ? string : undefined;
export { pxfy };
export type Position = 'top' | 'right' | 'bottom' | 'left';
export interface Margin {
    top: string;
    right: string;
    bottom: string;
    left: string;
}
declare function getMargin(value: string): Margin;
declare function getMargin(value: string, position: Position): string;
export interface Gap {
    row: string;
    col: string;
}
declare function getGap(value: string): Gap;
declare function getGap(value: string, orient: 'row' | 'col'): string;
export { getMargin, getMargin as getPadding, getGap };
export { parseResponsiveProp, parseResponsivePropValue } from './responsive';
