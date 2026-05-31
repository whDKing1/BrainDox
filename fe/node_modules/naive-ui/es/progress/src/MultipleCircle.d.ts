import type { CSSProperties, PropType } from 'vue';
import type { ProgressGradient } from './public-types';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    viewBoxWidth: {
        type: NumberConstructor;
        required: true;
    };
    percentage: {
        type: PropType<number[]>;
        default: number[];
    };
    strokeWidth: {
        type: NumberConstructor;
        required: true;
    };
    circleGap: {
        type: NumberConstructor;
        required: true;
    };
    showIndicator: {
        type: BooleanConstructor;
        required: true;
    };
    fillColor: {
        type: PropType<string[] | ProgressGradient[]>;
        default: () => never[];
    };
    railColor: {
        type: PropType<string[]>;
        default: () => never[];
    };
    railStyle: {
        type: PropType<Array<string | CSSProperties>>;
        default: () => never[];
    };
}>, () => JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    viewBoxWidth: {
        type: NumberConstructor;
        required: true;
    };
    percentage: {
        type: PropType<number[]>;
        default: number[];
    };
    strokeWidth: {
        type: NumberConstructor;
        required: true;
    };
    circleGap: {
        type: NumberConstructor;
        required: true;
    };
    showIndicator: {
        type: BooleanConstructor;
        required: true;
    };
    fillColor: {
        type: PropType<string[] | ProgressGradient[]>;
        default: () => never[];
    };
    railColor: {
        type: PropType<string[]>;
        default: () => never[];
    };
    railStyle: {
        type: PropType<Array<string | CSSProperties>>;
        default: () => never[];
    };
}>> & Readonly<{}>, {
    railColor: string[];
    fillColor: string[] | ProgressGradient[];
    railStyle: (string | CSSProperties)[];
    percentage: number[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
