import type { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    hue: {
        type: NumberConstructor;
        required: true;
    };
    onUpdateHue: {
        type: PropType<(value: number) => void>;
        required: true;
    };
    onComplete: PropType<() => void>;
}>, {
    railRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    handleMouseDown: (e: MouseEvent) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    hue: {
        type: NumberConstructor;
        required: true;
    };
    onUpdateHue: {
        type: PropType<(value: number) => void>;
        required: true;
    };
    onComplete: PropType<() => void>;
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
