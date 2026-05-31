import type { HSLA, HSVA, RGBA } from 'seemly';
import type { PropType } from 'vue';
import type { ColorPickerMode } from './utils';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    mode: {
        type: PropType<ColorPickerMode>;
        required: true;
    };
    modes: {
        type: PropType<ColorPickerMode[]>;
        required: true;
    };
    showAlpha: {
        type: BooleanConstructor;
        required: true;
    };
    value: {
        type: PropType<string | null>;
        default: null;
    };
    valueArr: {
        type: PropType<HSVA | RGBA | HSLA | null>;
        default: null;
    };
    onUpdateValue: {
        type: PropType<(value: string) => void>;
        required: true;
    };
    onUpdateMode: {
        type: PropType<() => void>;
        required: true;
    };
}>, {
    handleUnitUpdateValue(index: number, value: number | string): void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    mode: {
        type: PropType<ColorPickerMode>;
        required: true;
    };
    modes: {
        type: PropType<ColorPickerMode[]>;
        required: true;
    };
    showAlpha: {
        type: BooleanConstructor;
        required: true;
    };
    value: {
        type: PropType<string | null>;
        default: null;
    };
    valueArr: {
        type: PropType<HSVA | RGBA | HSLA | null>;
        default: null;
    };
    onUpdateValue: {
        type: PropType<(value: string) => void>;
        required: true;
    };
    onUpdateMode: {
        type: PropType<() => void>;
        required: true;
    };
}>> & Readonly<{}>, {
    value: string | null;
    valueArr: RGBA | HSLA | HSVA | null;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
