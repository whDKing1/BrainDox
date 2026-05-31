import type { PropType } from 'vue';
import type { Item } from './interface';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    data: {
        type: PropType<Item[]>;
        required: true;
    };
    activeValue: {
        type: PropType<number | null | "am" | "pm">;
        default: null;
    };
    onItemClick: PropType<(value: number | "am" | "pm") => void>;
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    data: {
        type: PropType<Item[]>;
        required: true;
    };
    activeValue: {
        type: PropType<number | null | "am" | "pm">;
        default: null;
    };
    onItemClick: PropType<(value: number | "am" | "pm") => void>;
}>> & Readonly<{}>, {
    activeValue: number | "am" | "pm" | null;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
