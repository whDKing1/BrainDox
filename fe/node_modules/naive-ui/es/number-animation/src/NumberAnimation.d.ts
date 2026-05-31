import type { PropType } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
export declare const numberAnimationProps: {
    to: {
        type: NumberConstructor;
        default: number;
    };
    precision: {
        type: NumberConstructor;
        default: number;
    };
    showSeparator: BooleanConstructor;
    locale: StringConstructor;
    from: {
        type: NumberConstructor;
        default: number;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    onFinish: PropType<() => void>;
};
export type NumberAnimationProps = ExtractPublicPropTypes<typeof numberAnimationProps>;
export interface NumberAnimationInst {
    play: () => void;
}
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    to: {
        type: NumberConstructor;
        default: number;
    };
    precision: {
        type: NumberConstructor;
        default: number;
    };
    showSeparator: BooleanConstructor;
    locale: StringConstructor;
    from: {
        type: NumberConstructor;
        default: number;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    onFinish: PropType<() => void>;
}>, {
    play: () => void;
    formattedValue: import("vue").ComputedRef<{
        integer: string;
        decimal: string;
        decimalSeparator: string | undefined;
    }>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    to: {
        type: NumberConstructor;
        default: number;
    };
    precision: {
        type: NumberConstructor;
        default: number;
    };
    showSeparator: BooleanConstructor;
    locale: StringConstructor;
    from: {
        type: NumberConstructor;
        default: number;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    onFinish: PropType<() => void>;
}>> & Readonly<{}>, {
    duration: number;
    to: number;
    active: boolean;
    from: number;
    showSeparator: boolean;
    precision: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
