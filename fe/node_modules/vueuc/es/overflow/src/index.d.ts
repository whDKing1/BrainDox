import { PropType } from 'vue';
export interface VOverflowInst {
    sync: (options: {
        showAllItemsBeforeCalculate: boolean;
    }) => void;
}
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    getCounter: PropType<() => HTMLElement | null>;
    getTail: PropType<() => HTMLElement | null>;
    updateCounter: PropType<(count: number) => void>;
    onUpdateCount: PropType<(count: number) => void>;
    onUpdateOverflow: PropType<(overflow: boolean) => void>;
}>, {
    selfRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    counterRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    sync: (options: {
        showAllItemsBeforeCalculate: boolean;
    }) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    getCounter: PropType<() => HTMLElement | null>;
    getTail: PropType<() => HTMLElement | null>;
    updateCounter: PropType<(count: number) => void>;
    onUpdateCount: PropType<(count: number) => void>;
    onUpdateOverflow: PropType<(overflow: boolean) => void>;
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
