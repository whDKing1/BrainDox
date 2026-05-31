import { ComputedRef } from 'vue';
import { BreakpointOptions, ExtractBreakpoint, DefaultBreakpointOptions } from './use-breakpoints';
declare type HasZero<T> = {
    [key in keyof T]: T[key] extends 0 ? true : T[key] extends '0' ? true : false;
};
declare type CanBeUndef<T> = HasZero<T> extends {
    [key: string]: false;
} ? true : false;
declare function useBreakpoint(): ComputedRef<ExtractBreakpoint<DefaultBreakpointOptions>>;
declare function useBreakpoint<T extends BreakpointOptions>(screens: T): CanBeUndef<T> extends true ? ComputedRef<ExtractBreakpoint<T> | undefined> : ComputedRef<ExtractBreakpoint<T>>;
export default useBreakpoint;
