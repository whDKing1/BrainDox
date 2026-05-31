import type { PropType, Ref } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
export interface RowInjection {
    gutterRef: Ref<string | number | [number, number]>;
    verticalGutterRef: Ref<number>;
    horizontalGutterRef: Ref<number>;
    mergedClsPrefixRef: Ref<string>;
}
export declare const rowInjectionKey: import("vue").InjectionKey<RowInjection>;
export declare const rowProps: {
    readonly gutter: {
        readonly type: PropType<string | number | [number, number]>;
        readonly default: 0;
    };
    readonly alignItems: StringConstructor;
    readonly justifyContent: StringConstructor;
};
export declare const rowPropKeys: ("alignItems" | "justifyContent" | "gutter")[];
export type RowProps = ExtractPublicPropTypes<typeof rowProps>;
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly gutter: {
        readonly type: PropType<string | number | [number, number]>;
        readonly default: 0;
    };
    readonly alignItems: StringConstructor;
    readonly justifyContent: StringConstructor;
}>, {
    mergedClsPrefix: Ref<string, string>;
    rtlEnabled: Ref<import("../../config-provider/src/internal-interface").RtlItem | undefined, import("../../config-provider/src/internal-interface").RtlItem | undefined> | undefined;
    styleMargin: import("vue").ComputedRef<string>;
    styleWidth: import("vue").ComputedRef<string>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly gutter: {
        readonly type: PropType<string | number | [number, number]>;
        readonly default: 0;
    };
    readonly alignItems: StringConstructor;
    readonly justifyContent: StringConstructor;
}>> & Readonly<{}>, {
    readonly gutter: string | number | [number, number];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
