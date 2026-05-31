import type { PropType } from 'vue';
import type { ColorPickerMode } from './utils';
interface ParsedColor {
    value: string;
    mode: ColorPickerMode | null;
    legalValue: string;
}
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    mode: {
        type: PropType<ColorPickerMode>;
        required: true;
    };
    swatches: {
        type: PropType<string[]>;
        required: true;
    };
    onUpdateColor: {
        type: PropType<(value: string) => void>;
        required: true;
    };
}>, {
    parsedSwatchesRef: import("vue").ComputedRef<ParsedColor[]>;
    handleSwatchSelect: (parsed: ParsedColor) => void;
    handleSwatchKeyDown: (e: KeyboardEvent, parsed: ParsedColor) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    mode: {
        type: PropType<ColorPickerMode>;
        required: true;
    };
    swatches: {
        type: PropType<string[]>;
        required: true;
    };
    onUpdateColor: {
        type: PropType<(value: string) => void>;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
