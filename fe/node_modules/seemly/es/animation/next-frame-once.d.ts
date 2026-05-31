declare function beforeNextFrameOnce(cb: () => void): void;
declare function beforeNextFrameOnce<T1>(cb: (arg1: T1) => void, arg1: T1): void;
declare function beforeNextFrameOnce<T1, T2>(cb: (arg1: T1, arg2: T2) => void, arg1: T1, arg2: T2): void;
declare function beforeNextFrameOnce<T1, T2, T3>(cb: (arg1: T1, arg2: T2, arg3: T3) => void, arg1: T1, arg2: T2, arg3: T3): void;
declare function beforeNextFrameOnce<T1, T2, T3, T4>(cb: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => void, arg1: T1, arg2: T2, arg3: T3, arg4: T4): void;
declare function beforeNextFrameOnce<T extends any[]>(cb: (...args: T) => void, ...params: T): void;
export { beforeNextFrameOnce };
