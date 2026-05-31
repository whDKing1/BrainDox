import { ComputedRef } from 'vue';
export declare type BreakpointOptions = Record<string, number>;
export declare type ExtractBreakpoint<T extends Record<string, number>> = Extract<keyof T, string>;
export declare type ExtractBreakpointStatus<T> = {
    [k in keyof T]: boolean;
};
export declare type BreakpointHandler = {
    [k in string]: mqlHandler;
};
export declare type ExtractMediaQueries<T> = {
    [key in keyof T]: string;
};
export declare const defaultBreakpointOptions: {
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
    '2xl': number;
};
export declare type DefaultBreakpointOptions = typeof defaultBreakpointOptions;
declare type mqlHandler = (e: MediaQueryListEvent) => void;
declare function useBreakpoints(): ComputedRef<Array<ExtractBreakpoint<DefaultBreakpointOptions>>>;
declare function useBreakpoints<T extends BreakpointOptions>(screens: T): ComputedRef<Array<ExtractBreakpoint<T>>>;
export default useBreakpoints;
