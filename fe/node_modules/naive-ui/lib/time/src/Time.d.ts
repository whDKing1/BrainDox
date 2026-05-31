import type { PropType } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
export declare const timeProps: {
    readonly time: {
        readonly type: PropType<number | Date>;
        readonly default: undefined;
    };
    readonly type: {
        readonly type: PropType<"relative" | "date" | "datetime">;
        readonly default: "datetime";
    };
    readonly to: {
        readonly type: PropType<number | Date>;
        readonly default: undefined;
    };
    readonly unix: BooleanConstructor;
    readonly format: StringConstructor;
    readonly text: BooleanConstructor;
    readonly timeZone: StringConstructor;
};
export type TimeProps = ExtractPublicPropTypes<typeof timeProps>;
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly time: {
        readonly type: PropType<number | Date>;
        readonly default: undefined;
    };
    readonly type: {
        readonly type: PropType<"relative" | "date" | "datetime">;
        readonly default: "datetime";
    };
    readonly to: {
        readonly type: PropType<number | Date>;
        readonly default: undefined;
    };
    readonly unix: BooleanConstructor;
    readonly format: StringConstructor;
    readonly text: BooleanConstructor;
    readonly timeZone: StringConstructor;
}>, {
    renderedTime: import("vue").ComputedRef<string>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly time: {
        readonly type: PropType<number | Date>;
        readonly default: undefined;
    };
    readonly type: {
        readonly type: PropType<"relative" | "date" | "datetime">;
        readonly default: "datetime";
    };
    readonly to: {
        readonly type: PropType<number | Date>;
        readonly default: undefined;
    };
    readonly unix: BooleanConstructor;
    readonly format: StringConstructor;
    readonly text: BooleanConstructor;
    readonly timeZone: StringConstructor;
}>> & Readonly<{}>, {
    readonly type: "relative" | "date" | "datetime";
    readonly to: number | Date;
    readonly text: boolean;
    readonly time: number | Date;
    readonly unix: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
