import type { HSVA } from 'seemly';
import type { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    rgba: {
        type: PropType<HSVA | null>;
        default: null;
    };
    displayedHue: {
        type: NumberConstructor;
        required: true;
    };
    displayedSv: {
        type: PropType<[number, number]>;
        required: true;
    };
    onUpdateSV: {
        type: PropType<(s: number, v: number) => void>;
        required: true;
    };
    onComplete: PropType<() => void>;
}>, {
    palleteRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    handleColor: import("vue").ComputedRef<string>;
    handleMouseDown: (e: MouseEvent) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    rgba: {
        type: PropType<HSVA | null>;
        default: null;
    };
    displayedHue: {
        type: NumberConstructor;
        required: true;
    };
    displayedSv: {
        type: PropType<[number, number]>;
        required: true;
    };
    onUpdateSV: {
        type: PropType<(s: number, v: number) => void>;
        required: true;
    };
    onComplete: PropType<() => void>;
}>> & Readonly<{}>, {
    rgba: HSVA | null;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
