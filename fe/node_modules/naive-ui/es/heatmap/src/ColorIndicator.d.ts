import type { PropType, SlotsType, VNode } from 'vue';
interface HeatmapColorIndicatorSlots {
    'leading-text'?: () => VNode[];
    'trailing-text'?: () => VNode[];
}
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    colors: {
        type: PropType<string[]>;
        required: true;
    };
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
}>, () => JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    colors: {
        type: PropType<string[]>;
        required: true;
    };
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
}>> & Readonly<{}>, {}, SlotsType<HeatmapColorIndicatorSlots>, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
