import type { PropType } from 'vue';
import type { TmNode } from './interface';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    height: NumberConstructor;
    nodes: {
        type: PropType<TmNode[]>;
        required: true;
    };
    mode: {
        type: PropType<"expand" | "collapse">;
        required: true;
    };
    onAfterEnter: {
        type: PropType<() => void>;
        required: true;
    };
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    height: NumberConstructor;
    nodes: {
        type: PropType<TmNode[]>;
        required: true;
    };
    mode: {
        type: PropType<"expand" | "collapse">;
        required: true;
    };
    onAfterEnter: {
        type: PropType<() => void>;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
