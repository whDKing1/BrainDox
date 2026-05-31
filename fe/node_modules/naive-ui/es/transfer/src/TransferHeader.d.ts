import type { PropType, VNodeChild } from 'vue';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    size: {
        type: PropType<"small" | "medium" | "large">;
        required: true;
    };
    selectAllText: StringConstructor;
    clearText: StringConstructor;
    source: BooleanConstructor;
    onCheckedAll: PropType<() => void>;
    onClearAll: PropType<() => void>;
    title: PropType<string | (() => VNodeChild)>;
}>, () => JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    size: {
        type: PropType<"small" | "medium" | "large">;
        required: true;
    };
    selectAllText: StringConstructor;
    clearText: StringConstructor;
    source: BooleanConstructor;
    onCheckedAll: PropType<() => void>;
    onClearAll: PropType<() => void>;
    title: PropType<string | (() => VNodeChild)>;
}>> & Readonly<{}>, {
    source: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
