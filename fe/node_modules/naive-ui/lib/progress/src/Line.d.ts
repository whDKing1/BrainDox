import type { CSSProperties, PropType } from 'vue';
import type { ProgressGradient, ProgressStatus } from './public-types';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    percentage: {
        type: NumberConstructor;
        default: number;
    };
    railColor: StringConstructor;
    railStyle: PropType<string | CSSProperties>;
    fillColor: PropType<string | ProgressGradient>;
    status: {
        type: PropType<ProgressStatus>;
        required: true;
    };
    indicatorPlacement: {
        type: PropType<"inside" | "outside">;
        required: true;
    };
    indicatorTextColor: StringConstructor;
    unit: {
        type: StringConstructor;
        default: string;
    };
    processing: {
        type: BooleanConstructor;
        required: true;
    };
    showIndicator: {
        type: BooleanConstructor;
        required: true;
    };
    height: (StringConstructor | NumberConstructor)[];
    railBorderRadius: (StringConstructor | NumberConstructor)[];
    fillBorderRadius: (StringConstructor | NumberConstructor)[];
}>, () => JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    percentage: {
        type: NumberConstructor;
        default: number;
    };
    railColor: StringConstructor;
    railStyle: PropType<string | CSSProperties>;
    fillColor: PropType<string | ProgressGradient>;
    status: {
        type: PropType<ProgressStatus>;
        required: true;
    };
    indicatorPlacement: {
        type: PropType<"inside" | "outside">;
        required: true;
    };
    indicatorTextColor: StringConstructor;
    unit: {
        type: StringConstructor;
        default: string;
    };
    processing: {
        type: BooleanConstructor;
        required: true;
    };
    showIndicator: {
        type: BooleanConstructor;
        required: true;
    };
    height: (StringConstructor | NumberConstructor)[];
    railBorderRadius: (StringConstructor | NumberConstructor)[];
    fillBorderRadius: (StringConstructor | NumberConstructor)[];
}>> & Readonly<{}>, {
    unit: string;
    percentage: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
