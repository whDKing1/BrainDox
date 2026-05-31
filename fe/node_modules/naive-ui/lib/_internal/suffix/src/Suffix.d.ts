import type { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    showArrow: {
        type: BooleanConstructor;
        default: undefined;
    };
    showClear: {
        type: BooleanConstructor;
        default: undefined;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    onClear: PropType<(e: MouseEvent) => void>;
}>, () => JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    showArrow: {
        type: BooleanConstructor;
        default: undefined;
    };
    showClear: {
        type: BooleanConstructor;
        default: undefined;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    onClear: PropType<(e: MouseEvent) => void>;
}>> & Readonly<{}>, {
    loading: boolean;
    showArrow: boolean;
    showClear: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
