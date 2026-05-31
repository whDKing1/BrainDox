import type { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    value: {
        type: PropType<string | number>;
        required: true;
    };
    oldOriginalNumber: {
        type: NumberConstructor;
        default: undefined;
    };
    newOriginalNumber: {
        type: NumberConstructor;
        default: undefined;
    };
}>, () => JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    value: {
        type: PropType<string | number>;
        required: true;
    };
    oldOriginalNumber: {
        type: NumberConstructor;
        default: undefined;
    };
    newOriginalNumber: {
        type: NumberConstructor;
        default: undefined;
    };
}>> & Readonly<{}>, {
    oldOriginalNumber: number;
    newOriginalNumber: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
