import type { PropType } from 'vue';
import type { TmNode } from './interface';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    indent: {
        type: NumberConstructor;
        required: true;
    };
    expanded: BooleanConstructor;
    selected: BooleanConstructor;
    hide: BooleanConstructor;
    loading: BooleanConstructor;
    onClick: PropType<(e: MouseEvent) => void>;
    tmNode: {
        type: PropType<TmNode>;
        required: true;
    };
}>, () => JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    indent: {
        type: NumberConstructor;
        required: true;
    };
    expanded: BooleanConstructor;
    selected: BooleanConstructor;
    hide: BooleanConstructor;
    loading: BooleanConstructor;
    onClick: PropType<(e: MouseEvent) => void>;
    tmNode: {
        type: PropType<TmNode>;
        required: true;
    };
}>> & Readonly<{}>, {
    loading: boolean;
    selected: boolean;
    expanded: boolean;
    hide: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
