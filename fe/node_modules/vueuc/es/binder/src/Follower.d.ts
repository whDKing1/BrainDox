import { PropType } from 'vue';
import { BinderInstance, Placement } from './interface';
export interface FollowerInst {
    syncPosition: () => void;
}
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    show: BooleanConstructor;
    enabled: {
        type: PropType<boolean | undefined>;
        default: undefined;
    };
    placement: {
        type: PropType<Placement>;
        default: string;
    };
    syncTrigger: {
        type: PropType<Array<"scroll" | "resize">>;
        default: string[];
    };
    to: PropType<string | HTMLElement>;
    flip: {
        type: BooleanConstructor;
        default: boolean;
    };
    internalShift: BooleanConstructor;
    x: NumberConstructor;
    y: NumberConstructor;
    width: PropType<"target" | string>;
    minWidth: PropType<"target" | string>;
    containerClass: StringConstructor;
    teleportDisabled: BooleanConstructor;
    zindexable: {
        type: BooleanConstructor;
        default: boolean;
    };
    zIndex: NumberConstructor;
    overlap: BooleanConstructor;
}>, {
    VBinder: BinderInstance;
    mergedEnabled: import("vue").ComputedRef<boolean>;
    offsetContainerRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    followerRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    mergedTo: import("vue").ComputedRef<string | HTMLElement | undefined>;
    syncPosition: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    show: BooleanConstructor;
    enabled: {
        type: PropType<boolean | undefined>;
        default: undefined;
    };
    placement: {
        type: PropType<Placement>;
        default: string;
    };
    syncTrigger: {
        type: PropType<Array<"scroll" | "resize">>;
        default: string[];
    };
    to: PropType<string | HTMLElement>;
    flip: {
        type: BooleanConstructor;
        default: boolean;
    };
    internalShift: BooleanConstructor;
    x: NumberConstructor;
    y: NumberConstructor;
    width: PropType<"target" | string>;
    minWidth: PropType<"target" | string>;
    containerClass: StringConstructor;
    teleportDisabled: BooleanConstructor;
    zindexable: {
        type: BooleanConstructor;
        default: boolean;
    };
    zIndex: NumberConstructor;
    overlap: BooleanConstructor;
}>> & Readonly<{}>, {
    show: boolean;
    internalShift: boolean;
    teleportDisabled: boolean;
    overlap: boolean;
    enabled: boolean | undefined;
    placement: Placement;
    syncTrigger: ("resize" | "scroll")[];
    flip: boolean;
    zindexable: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
