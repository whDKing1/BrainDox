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
    color: {
        type: PropType<string | null>;
        default: null;
        validator: (value: string) => boolean;
    };
    onUpdateColor: {
        type: PropType<(value: string) => void>;
        required: true;
    };
}>, {
    handleChange: (e: Event) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    mode: {
        type: PropType<ColorPickerMode>;
        required: true;
    };
    color: {
        type: PropType<string | null>;
        default: null;
        validator: (value: string) => boolean;
    };
    onUpdateColor: {
        type: PropType<(value: string) => void>;
        required: true;
    };
}>> & Readonly<{}>, {
    color: string | null;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
