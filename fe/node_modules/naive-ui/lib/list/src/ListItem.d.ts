import type { SlotsType, VNode } from 'vue';
export interface ListItemSlots {
    default?: () => VNode[];
    prefix?: () => VNode[];
    suffix?: () => VNode[];
}
declare const _default: import("vue").DefineComponent<{}, {
    showDivider: import("vue").Ref<boolean, boolean>;
    mergedClsPrefix: import("vue").Ref<string, string>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{}> & Readonly<{}>, {}, SlotsType<ListItemSlots>, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
