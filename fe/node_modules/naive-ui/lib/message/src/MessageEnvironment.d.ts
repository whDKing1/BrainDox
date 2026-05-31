import type { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    duration: {
        type: NumberConstructor;
        default: number;
    };
    onAfterLeave: FunctionConstructor;
    onLeave: FunctionConstructor;
    internalKey: {
        type: StringConstructor;
        required: true;
    };
    onInternalAfterLeave: PropType<(key: string) => void>;
    onHide: FunctionConstructor;
    onAfterHide: FunctionConstructor;
    icon: PropType<() => import("vue").VNodeChild>;
    type: {
        readonly type: PropType<import("./types").MessageType>;
        readonly default: "info";
    };
    content: PropType<string | number | (() => import("vue").VNodeChild)>;
    showIcon: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    closable: BooleanConstructor;
    keepAliveOnHover: BooleanConstructor;
    spinProps: PropType<import("./public-types").MessageSpinProps>;
    onClose: PropType<() => void>;
    onMouseenter: PropType<(e: MouseEvent) => void>;
    onMouseleave: PropType<(e: MouseEvent) => void>;
}>, {
    show: import("vue").Ref<boolean, boolean>;
    hide: () => void;
    handleClose: () => void;
    handleAfterLeave: () => void;
    handleMouseleave: (e: MouseEvent) => void;
    handleMouseenter: (e: MouseEvent) => void;
    deactivate: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    duration: {
        type: NumberConstructor;
        default: number;
    };
    onAfterLeave: FunctionConstructor;
    onLeave: FunctionConstructor;
    internalKey: {
        type: StringConstructor;
        required: true;
    };
    onInternalAfterLeave: PropType<(key: string) => void>;
    onHide: FunctionConstructor;
    onAfterHide: FunctionConstructor;
    icon: PropType<() => import("vue").VNodeChild>;
    type: {
        readonly type: PropType<import("./types").MessageType>;
        readonly default: "info";
    };
    content: PropType<string | number | (() => import("vue").VNodeChild)>;
    showIcon: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    closable: BooleanConstructor;
    keepAliveOnHover: BooleanConstructor;
    spinProps: PropType<import("./public-types").MessageSpinProps>;
    onClose: PropType<() => void>;
    onMouseenter: PropType<(e: MouseEvent) => void>;
    onMouseleave: PropType<(e: MouseEvent) => void>;
}>> & Readonly<{}>, {
    type: import("./types").MessageType;
    showIcon: boolean;
    closable: boolean;
    duration: number;
    keepAliveOnHover: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
