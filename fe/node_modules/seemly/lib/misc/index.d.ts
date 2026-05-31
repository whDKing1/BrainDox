export declare function createId(length?: number): string;
export declare function repeat<T>(count: number, v: T): T[];
declare function indexMap(count: number): number[];
declare function indexMap<T>(count: number, createValue: (index: number) => T): T[];
export { indexMap };
export declare function sleep(ms: number): Promise<void>;
