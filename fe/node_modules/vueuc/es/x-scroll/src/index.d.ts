import { PropType } from 'vue';
export type { VXScrollInst } from './interface';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    disabled: BooleanConstructor;
    onScroll: PropType<(e: Event) => void>;
}>, {
    scrollTo: HTMLElement["scrollTo"];
    selfRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    handleWheel: (e: WheelEvent) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    disabled: BooleanConstructor;
    onScroll: PropType<(e: Event) => void>;
}>> & Readonly<{}>, {
    disabled: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
