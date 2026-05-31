import type { VNode } from 'vue';
export declare function isCarouselItem(child: VNode): boolean;
declare const _default: import("vue").DefineComponent<{}, {
    mergedClsPrefix: import("vue").Ref<string, string>;
    selfElRef: import("vue").Ref<HTMLElement | undefined, HTMLElement | undefined>;
    isPrev: import("vue").ComputedRef<boolean>;
    isNext: import("vue").ComputedRef<boolean>;
    isActive: import("vue").ComputedRef<boolean>;
    index: import("vue").ComputedRef<number>;
    style: import("vue").ComputedRef<string | Record<string, string | number> | undefined>;
    handleClick: (event: MouseEvent) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
