import type { PropType, VNodeChild } from 'vue';
export declare const notificationProps: {
    readonly closable: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly type: {
        readonly type: PropType<"info" | "success" | "warning" | "error" | "default">;
        readonly default: "default";
    };
    readonly avatar: PropType<() => VNodeChild>;
    readonly title: PropType<string | (() => VNodeChild)>;
    readonly description: PropType<string | (() => VNodeChild)>;
    readonly content: PropType<string | (() => VNodeChild)>;
    readonly meta: PropType<string | (() => VNodeChild)>;
    readonly action: PropType<string | (() => VNodeChild)>;
    readonly onClose: {
        readonly type: PropType<() => void>;
        readonly required: true;
    };
    readonly keepAliveOnHover: BooleanConstructor;
    readonly onMouseenter: PropType<(e: MouseEvent) => void>;
    readonly onMouseleave: PropType<(e: MouseEvent) => void>;
};
export declare const notificationPropKeys: ("type" | "title" | "closable" | "onClose" | "content" | "onMouseenter" | "onMouseleave" | "avatar" | "meta" | "action" | "keepAliveOnHover" | "description")[];
export declare const Notification: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly closable: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly type: {
        readonly type: PropType<"info" | "success" | "warning" | "error" | "default">;
        readonly default: "default";
    };
    readonly avatar: PropType<() => VNodeChild>;
    readonly title: PropType<string | (() => VNodeChild)>;
    readonly description: PropType<string | (() => VNodeChild)>;
    readonly content: PropType<string | (() => VNodeChild)>;
    readonly meta: PropType<string | (() => VNodeChild)>;
    readonly action: PropType<string | (() => VNodeChild)>;
    readonly onClose: {
        readonly type: PropType<() => void>;
        readonly required: true;
    };
    readonly keepAliveOnHover: BooleanConstructor;
    readonly onMouseenter: PropType<(e: MouseEvent) => void>;
    readonly onMouseleave: PropType<(e: MouseEvent) => void>;
}>, {
    mergedClsPrefix: import("vue").Ref<string, string>;
    showAvatar: import("vue").ComputedRef<boolean | (() => VNodeChild)>;
    handleCloseClick(): void;
    rtlEnabled: import("vue").Ref<import("../../config-provider/src/internal-interface").RtlItem | undefined, import("../../config-provider/src/internal-interface").RtlItem | undefined> | undefined;
    cssVars: import("vue").ComputedRef<{
        '--n-color': string;
        '--n-font-size': string;
        '--n-text-color': string;
        '--n-description-text-color': string;
        '--n-action-text-color': string;
        '--n-title-text-color': string;
        '--n-title-font-weight': string;
        '--n-bezier': string;
        '--n-bezier-ease-out': string;
        '--n-bezier-ease-in': string;
        '--n-border-radius': string;
        '--n-box-shadow': string;
        '--n-close-border-radius': string;
        '--n-close-color-hover': string;
        '--n-close-color-pressed': string;
        '--n-close-icon-color': string;
        '--n-close-icon-color-hover': string;
        '--n-close-icon-color-pressed': string;
        '--n-line-height': string;
        '--n-icon-color': string;
        '--n-close-margin': string;
        '--n-close-size': string;
        '--n-close-icon-size': string;
        '--n-width': string;
        '--n-padding-left': string;
        '--n-padding-right': string;
        '--n-padding-top': string;
        '--n-padding-bottom': string;
        '--n-title-font-size': string;
        '--n-meta-font-size': string;
        '--n-description-font-size': string;
    }> | undefined;
    themeClass: import("vue").Ref<string, string> | undefined;
    onRender: (() => void) | undefined;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly closable: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly type: {
        readonly type: PropType<"info" | "success" | "warning" | "error" | "default">;
        readonly default: "default";
    };
    readonly avatar: PropType<() => VNodeChild>;
    readonly title: PropType<string | (() => VNodeChild)>;
    readonly description: PropType<string | (() => VNodeChild)>;
    readonly content: PropType<string | (() => VNodeChild)>;
    readonly meta: PropType<string | (() => VNodeChild)>;
    readonly action: PropType<string | (() => VNodeChild)>;
    readonly onClose: {
        readonly type: PropType<() => void>;
        readonly required: true;
    };
    readonly keepAliveOnHover: BooleanConstructor;
    readonly onMouseenter: PropType<(e: MouseEvent) => void>;
    readonly onMouseleave: PropType<(e: MouseEvent) => void>;
}>> & Readonly<{}>, {
    readonly type: "default" | "info" | "warning" | "error" | "success";
    readonly closable: boolean;
    readonly keepAliveOnHover: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
