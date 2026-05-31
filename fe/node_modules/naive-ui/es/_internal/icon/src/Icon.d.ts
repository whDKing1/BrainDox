import type { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    role: StringConstructor;
    ariaLabel: StringConstructor;
    ariaDisabled: {
        type: BooleanConstructor;
        default: undefined;
    };
    ariaHidden: {
        type: BooleanConstructor;
        default: undefined;
    };
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    onClick: PropType<(e: MouseEvent) => void>;
    onMousedown: PropType<(e: MouseEvent) => void>;
    onMouseup: PropType<(e: MouseEvent) => void>;
}>, void, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    role: StringConstructor;
    ariaLabel: StringConstructor;
    ariaDisabled: {
        type: BooleanConstructor;
        default: undefined;
    };
    ariaHidden: {
        type: BooleanConstructor;
        default: undefined;
    };
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    onClick: PropType<(e: MouseEvent) => void>;
    onMousedown: PropType<(e: MouseEvent) => void>;
    onMouseup: PropType<(e: MouseEvent) => void>;
}>> & Readonly<{}>, {
    ariaDisabled: boolean;
    ariaHidden: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
