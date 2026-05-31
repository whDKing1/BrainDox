import type { ExtractPropTypes, PropType } from 'vue';
export declare const notificationEnvOptions: {
    readonly duration: NumberConstructor;
    readonly onClose: PropType<() => Promise<boolean> | boolean | any>;
    readonly onLeave: PropType<() => void>;
    readonly onAfterEnter: PropType<() => void>;
    readonly onAfterLeave: PropType<() => void>;
    /** @deprecated */
    readonly onHide: PropType<() => void>;
    /** @deprecated */
    readonly onAfterShow: PropType<() => void>;
    /** @deprecated */
    readonly onAfterHide: PropType<() => void>;
    readonly closable: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly type: {
        readonly type: PropType<"info" | "success" | "warning" | "error" | "default">;
        readonly default: "default";
    };
    readonly avatar: PropType<() => import("vue").VNodeChild>;
    readonly title: PropType<string | (() => import("vue").VNodeChild)>;
    readonly description: PropType<string | (() => import("vue").VNodeChild)>;
    readonly content: PropType<string | (() => import("vue").VNodeChild)>;
    readonly meta: PropType<string | (() => import("vue").VNodeChild)>;
    readonly action: PropType<string | (() => import("vue").VNodeChild)>;
    readonly keepAliveOnHover: BooleanConstructor;
    readonly onMouseenter: PropType<(e: MouseEvent) => void>;
    readonly onMouseleave: PropType<(e: MouseEvent) => void>;
};
export type NotificationOptions = Partial<ExtractPropTypes<typeof notificationEnvOptions>>;
export declare const NotificationEnvironment: import("vue").DefineComponent<ExtractPropTypes<{
    internalKey: {
        type: StringConstructor;
        required: true;
    };
    onInternalAfterLeave: {
        type: PropType<(key: string) => void>;
        required: true;
    };
    duration: NumberConstructor;
    onClose: PropType<() => Promise<boolean> | boolean | any>;
    onLeave: PropType<() => void>;
    onAfterEnter: PropType<() => void>;
    onAfterLeave: PropType<() => void>;
    onHide: PropType<() => void>;
    onAfterShow: PropType<() => void>;
    onAfterHide: PropType<() => void>;
    closable: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    type: {
        readonly type: PropType<"info" | "success" | "warning" | "error" | "default">;
        readonly default: "default";
    };
    avatar: PropType<() => import("vue").VNodeChild>;
    title: PropType<string | (() => import("vue").VNodeChild)>;
    description: PropType<string | (() => import("vue").VNodeChild)>;
    content: PropType<string | (() => import("vue").VNodeChild)>;
    meta: PropType<string | (() => import("vue").VNodeChild)>;
    action: PropType<string | (() => import("vue").VNodeChild)>;
    keepAliveOnHover: BooleanConstructor;
    onMouseenter: PropType<(e: MouseEvent) => void>;
    onMouseleave: PropType<(e: MouseEvent) => void>;
}>, {
    show: import("vue").Ref<boolean, boolean>;
    hide: () => void;
    handleClose: () => void;
    handleAfterLeave: () => void;
    handleLeave: (el: HTMLElement) => void;
    handleBeforeLeave: (el: HTMLElement) => void;
    handleAfterEnter: (el: HTMLElement) => void;
    handleBeforeEnter: (el: HTMLElement) => void;
    handleMouseenter: (e: MouseEvent) => void;
    handleMouseleave: (e: MouseEvent) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ExtractPropTypes<{
    internalKey: {
        type: StringConstructor;
        required: true;
    };
    onInternalAfterLeave: {
        type: PropType<(key: string) => void>;
        required: true;
    };
    duration: NumberConstructor;
    onClose: PropType<() => Promise<boolean> | boolean | any>;
    onLeave: PropType<() => void>;
    onAfterEnter: PropType<() => void>;
    onAfterLeave: PropType<() => void>;
    onHide: PropType<() => void>;
    onAfterShow: PropType<() => void>;
    onAfterHide: PropType<() => void>;
    closable: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    type: {
        readonly type: PropType<"info" | "success" | "warning" | "error" | "default">;
        readonly default: "default";
    };
    avatar: PropType<() => import("vue").VNodeChild>;
    title: PropType<string | (() => import("vue").VNodeChild)>;
    description: PropType<string | (() => import("vue").VNodeChild)>;
    content: PropType<string | (() => import("vue").VNodeChild)>;
    meta: PropType<string | (() => import("vue").VNodeChild)>;
    action: PropType<string | (() => import("vue").VNodeChild)>;
    keepAliveOnHover: BooleanConstructor;
    onMouseenter: PropType<(e: MouseEvent) => void>;
    onMouseleave: PropType<(e: MouseEvent) => void>;
}>> & Readonly<{}>, {
    type: "default" | "info" | "warning" | "error" | "success";
    closable: boolean;
    keepAliveOnHover: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
