declare const Binder: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    syncTargetWithParent: BooleanConstructor;
    syncTarget: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {
    targetRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    setTargetRef: (el: HTMLElement | null) => void;
    addScrollListener: (listener: () => void) => void;
    removeScrollListener: (listener: () => void) => void;
    addResizeListener: (listener: () => void) => void;
    removeResizeListener: (listener: () => void) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    syncTargetWithParent: BooleanConstructor;
    syncTarget: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{}>, {
    syncTargetWithParent: boolean;
    syncTarget: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default Binder;
