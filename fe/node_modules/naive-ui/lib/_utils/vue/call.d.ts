declare function call(funcs: MaybeArray<() => void>): void;
declare function call<A1>(funcs: MaybeArray<(a1: A1) => void>, a1: A1): void;
declare function call<A1, A2>(funcs: MaybeArray<(a1: A1, a2: A2) => void>, a1: A1, a2: A2): void;
declare function call<A1, A2, A3>(funcs: MaybeArray<(a1: A1, a2: A2, a3: A3) => void>, a1: A1, a2: A2, a3: A3): void;
declare function call<A1, A2, A3, A4>(funcs: MaybeArray<(a1: A1, a2: A2, a3: A3, a4: A4) => void>, a1: A1, a2: A2, a3: A3, a4: A4): void;
export { call };
export type MaybeArray<T> = T | T[];
