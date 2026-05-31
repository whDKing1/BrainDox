import type { KatexOptions } from 'katex';
import type { PropType } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
import type { Katex } from '../../config-provider/src/katex';
export declare const equationProps: {
    readonly value: StringConstructor;
    readonly katex: PropType<Katex>;
    readonly katexOptions: PropType<KatexOptions>;
};
export type EquationProps = ExtractPublicPropTypes<typeof equationProps>;
export declare const Equation: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly value: StringConstructor;
    readonly katex: PropType<Katex>;
    readonly katexOptions: PropType<KatexOptions>;
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly value: StringConstructor;
    readonly katex: PropType<Katex>;
    readonly katexOptions: PropType<KatexOptions>;
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
