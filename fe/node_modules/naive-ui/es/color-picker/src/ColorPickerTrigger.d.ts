import type { HSLA } from 'seemly';
import type { PropType, SlotsType } from 'vue';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    value: {
        type: PropType<string | null>;
        default: null;
    };
    hsla: {
        type: PropType<HSLA | null>;
        default: null;
    };
    disabled: BooleanConstructor;
    onClick: PropType<() => void>;
}>, () => JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    value: {
        type: PropType<string | null>;
        default: null;
    };
    hsla: {
        type: PropType<HSLA | null>;
        default: null;
    };
    disabled: BooleanConstructor;
    onClick: PropType<() => void>;
}>> & Readonly<{}>, {
    value: string | null;
    disabled: boolean;
    hsla: HSLA | null;
}, SlotsType<Record<string, never>>, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
