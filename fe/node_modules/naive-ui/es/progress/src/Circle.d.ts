import type { CSSProperties, PropType } from 'vue';
import type { ProgressGradient, ProgressStatus } from './public-types';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    status: {
        type: PropType<ProgressStatus>;
        required: true;
    };
    strokeWidth: {
        type: NumberConstructor;
        required: true;
    };
    fillColor: PropType<string | ProgressGradient>;
    railColor: StringConstructor;
    railStyle: PropType<string | CSSProperties>;
    percentage: {
        type: NumberConstructor;
        default: number;
    };
    offsetDegree: {
        type: NumberConstructor;
        default: number;
    };
    showIndicator: {
        type: BooleanConstructor;
        required: true;
    };
    indicatorTextColor: StringConstructor;
    unit: StringConstructor;
    viewBoxWidth: {
        type: NumberConstructor;
        required: true;
    };
    gapDegree: {
        type: PropType<number>;
        required: true;
    };
    gapOffsetDegree: {
        type: NumberConstructor;
        default: number;
    };
}>, () => JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    status: {
        type: PropType<ProgressStatus>;
        required: true;
    };
    strokeWidth: {
        type: NumberConstructor;
        required: true;
    };
    fillColor: PropType<string | ProgressGradient>;
    railColor: StringConstructor;
    railStyle: PropType<string | CSSProperties>;
    percentage: {
        type: NumberConstructor;
        default: number;
    };
    offsetDegree: {
        type: NumberConstructor;
        default: number;
    };
    showIndicator: {
        type: BooleanConstructor;
        required: true;
    };
    indicatorTextColor: StringConstructor;
    unit: StringConstructor;
    viewBoxWidth: {
        type: NumberConstructor;
        required: true;
    };
    gapDegree: {
        type: PropType<number>;
        required: true;
    };
    gapOffsetDegree: {
        type: NumberConstructor;
        default: number;
    };
}>> & Readonly<{}>, {
    gapOffsetDegree: number;
    percentage: number;
    offsetDegree: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
