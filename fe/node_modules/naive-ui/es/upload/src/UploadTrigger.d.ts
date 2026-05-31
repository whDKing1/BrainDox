import type { SlotsType, VNode } from 'vue';
import type { UploadTriggerDefaultSlotOptions } from './interface';
export interface UploadTriggerSlots {
    default?: (options: UploadTriggerDefaultSlotOptions) => VNode[];
}
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    abstract: BooleanConstructor;
}>, () => JSX.Element | VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[] | undefined, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    abstract: BooleanConstructor;
}>> & Readonly<{}>, {
    abstract: boolean;
}, SlotsType<UploadTriggerSlots>, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
