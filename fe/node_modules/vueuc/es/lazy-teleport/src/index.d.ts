import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    to: {
        type: PropType<string | HTMLElement>;
        default: undefined;
    };
    disabled: BooleanConstructor;
    show: {
        type: BooleanConstructor;
        required: true;
    };
}>, {
    showTeleport: Readonly<import("vue").Ref<boolean, boolean>>;
    mergedTo: import("vue").ComputedRef<string | HTMLElement>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    to: {
        type: PropType<string | HTMLElement>;
        default: undefined;
    };
    disabled: BooleanConstructor;
    show: {
        type: BooleanConstructor;
        required: true;
    };
}>> & Readonly<{}>, {
    disabled: boolean;
    to: string | HTMLElement;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
