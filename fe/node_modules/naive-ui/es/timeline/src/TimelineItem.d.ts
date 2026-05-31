import type { PropType, SlotsType, VNode } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
export declare const timelineItemProps: {
    time: PropType<string | number>;
    title: StringConstructor;
    content: StringConstructor;
    color: StringConstructor;
    lineType: {
        type: PropType<"default" | "dashed">;
        default: string;
    };
    type: {
        type: PropType<"default" | "success" | "error" | "warning" | "info">;
        default: string;
    };
};
export type TimelineItemProps = ExtractPublicPropTypes<typeof timelineItemProps>;
export interface TimelineItemSlots {
    default?: () => VNode[];
    icon?: () => VNode[];
    footer?: () => VNode[];
    header?: () => VNode[];
}
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    time: PropType<string | number>;
    title: StringConstructor;
    content: StringConstructor;
    color: StringConstructor;
    lineType: {
        type: PropType<"default" | "dashed">;
        default: string;
    };
    type: {
        type: PropType<"default" | "success" | "error" | "warning" | "info">;
        default: string;
    };
}>, {
    mergedClsPrefix: import("vue").Ref<string, string>;
    cssVars: import("vue").ComputedRef<{
        '--n-bezier': string;
        '--n-circle-border': string;
        '--n-icon-color': string;
        '--n-content-font-size': string;
        '--n-content-text-color': string;
        '--n-line-color': string;
        '--n-meta-text-color': string;
        '--n-title-font-size': string;
        '--n-title-font-weight': string;
        '--n-title-margin': string;
        '--n-title-text-color': string;
        '--n-icon-size': string;
    }> | undefined;
    themeClass: import("vue").Ref<string, string> | undefined;
    onRender: (() => void) | undefined;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    time: PropType<string | number>;
    title: StringConstructor;
    content: StringConstructor;
    color: StringConstructor;
    lineType: {
        type: PropType<"default" | "dashed">;
        default: string;
    };
    type: {
        type: PropType<"default" | "success" | "error" | "warning" | "info">;
        default: string;
    };
}>> & Readonly<{}>, {
    type: "default" | "info" | "warning" | "error" | "success";
    lineType: "default" | "dashed";
}, SlotsType<TimelineItemSlots>, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
