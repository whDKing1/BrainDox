import type { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    isButtonTag: {
        type: BooleanConstructor;
        default: boolean;
    };
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    disabled: {
        type: BooleanConstructor;
        default: undefined;
    };
    focusable: {
        type: BooleanConstructor;
        default: boolean;
    };
    round: BooleanConstructor;
    onClick: PropType<(e: MouseEvent) => void>;
    absolute: BooleanConstructor;
}>, () => JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    isButtonTag: {
        type: BooleanConstructor;
        default: boolean;
    };
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    disabled: {
        type: BooleanConstructor;
        default: undefined;
    };
    focusable: {
        type: BooleanConstructor;
        default: boolean;
    };
    round: BooleanConstructor;
    onClick: PropType<(e: MouseEvent) => void>;
    absolute: BooleanConstructor;
}>> & Readonly<{}>, {
    disabled: boolean;
    absolute: boolean;
    round: boolean;
    focusable: boolean;
    isButtonTag: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
