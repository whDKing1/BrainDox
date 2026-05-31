import type { RGBA } from 'seemly';
import type { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    rgba: {
        type: PropType<RGBA | null>;
        default: null;
    };
    alpha: {
        type: NumberConstructor;
        default: number;
    };
    onUpdateAlpha: {
        type: PropType<(value: number) => void>;
        required: true;
    };
    onComplete: PropType<() => void>;
}>, {
    railRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    railBackgroundImage: import("vue").ComputedRef<string>;
    handleMouseDown: (e: MouseEvent) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    rgba: {
        type: PropType<RGBA | null>;
        default: null;
    };
    alpha: {
        type: NumberConstructor;
        default: number;
    };
    onUpdateAlpha: {
        type: PropType<(value: number) => void>;
        required: true;
    };
    onComplete: PropType<() => void>;
}>> & Readonly<{}>, {
    rgba: RGBA | null;
    alpha: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
