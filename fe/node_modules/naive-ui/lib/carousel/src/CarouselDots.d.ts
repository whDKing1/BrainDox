import type { PropType } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
declare const carouselDotsProps: {
    total: {
        type: NumberConstructor;
        default: number;
    };
    currentIndex: {
        type: NumberConstructor;
        default: number;
    };
    dotType: {
        type: PropType<"dot" | "line" | "never">;
        default: string;
    };
    trigger: {
        type: PropType<"click" | "hover">;
        default: string;
    };
    keyboard: BooleanConstructor;
};
export type CarouselDotsProps = ExtractPublicPropTypes<typeof carouselDotsProps>;
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    total: {
        type: NumberConstructor;
        default: number;
    };
    currentIndex: {
        type: NumberConstructor;
        default: number;
    };
    dotType: {
        type: PropType<"dot" | "line" | "never">;
        default: string;
    };
    trigger: {
        type: PropType<"click" | "hover">;
        default: string;
    };
    keyboard: BooleanConstructor;
}>, {
    mergedClsPrefix: import("vue").Ref<string, string>;
    dotEls: import("vue").Ref<HTMLElement[], HTMLElement[]>;
    handleKeydown: (e: KeyboardEvent, current: number) => void;
    handleMouseenter: (current: number) => void;
    handleClick: (current: number) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    total: {
        type: NumberConstructor;
        default: number;
    };
    currentIndex: {
        type: NumberConstructor;
        default: number;
    };
    dotType: {
        type: PropType<"dot" | "line" | "never">;
        default: string;
    };
    trigger: {
        type: PropType<"click" | "hover">;
        default: string;
    };
    keyboard: BooleanConstructor;
}>> & Readonly<{}>, {
    trigger: "hover" | "click";
    keyboard: boolean;
    currentIndex: number;
    dotType: "dot" | "line" | "never";
    total: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
