import type { CSSProperties, PropType, SlotsType, VNode } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
export declare const descriptionsItemProps: {
    readonly label: StringConstructor;
    readonly span: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly labelClass: StringConstructor;
    readonly labelStyle: PropType<string | CSSProperties>;
    readonly contentClass: StringConstructor;
    readonly contentStyle: PropType<string | CSSProperties>;
};
export type DescriptionItemProps = ExtractPublicPropTypes<typeof descriptionsItemProps>;
export interface DescriptionItemSlots {
    default?: () => VNode[];
    label?: () => VNode[];
}
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly label: StringConstructor;
    readonly span: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly labelClass: StringConstructor;
    readonly labelStyle: PropType<string | CSSProperties>;
    readonly contentClass: StringConstructor;
    readonly contentStyle: PropType<string | CSSProperties>;
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly label: StringConstructor;
    readonly span: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly labelClass: StringConstructor;
    readonly labelStyle: PropType<string | CSSProperties>;
    readonly contentClass: StringConstructor;
    readonly contentStyle: PropType<string | CSSProperties>;
}>> & Readonly<{}>, {
    readonly span: number;
}, SlotsType<DescriptionItemSlots>, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
