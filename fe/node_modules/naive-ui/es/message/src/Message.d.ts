import type { PropType, VNodeChild } from 'vue';
import type { MessageSpinProps } from './public-types';
import type { MessageRenderMessage, MessageType } from './types';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    render: PropType<MessageRenderMessage>;
    icon: PropType<() => VNodeChild>;
    type: {
        readonly type: PropType<MessageType>;
        readonly default: "info";
    };
    content: PropType<string | number | (() => VNodeChild)>;
    showIcon: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    closable: BooleanConstructor;
    keepAliveOnHover: BooleanConstructor;
    spinProps: PropType<MessageSpinProps>;
    onClose: PropType<() => void>;
    onMouseenter: PropType<(e: MouseEvent) => void>;
    onMouseleave: PropType<(e: MouseEvent) => void>;
}>, {
    mergedClsPrefix: import("vue").Ref<string, string>;
    rtlEnabled: import("vue").Ref<import("../../config-provider/src/internal-interface").RtlItem | undefined, import("../../config-provider/src/internal-interface").RtlItem | undefined> | undefined;
    messageProviderProps: import("./MessageProvider").MessageProviderSetupProps;
    handleClose(): void;
    cssVars: import("vue").ComputedRef<{
        '--n-bezier': string;
        '--n-margin': string;
        '--n-padding': string;
        '--n-max-width': string;
        '--n-font-size': string;
        '--n-icon-margin': string;
        '--n-icon-size': string;
        '--n-close-icon-size': string;
        '--n-close-border-radius': string;
        '--n-close-size': string;
        '--n-close-margin': string;
        '--n-text-color': string;
        '--n-color': string;
        '--n-box-shadow': string;
        '--n-icon-color-info': string;
        '--n-icon-color-success': string;
        '--n-icon-color-warning': string;
        '--n-icon-color-error': string;
        '--n-icon-color-loading': string;
        '--n-close-color-hover': string;
        '--n-close-color-pressed': string;
        '--n-close-icon-color': string;
        '--n-close-icon-color-pressed': string;
        '--n-close-icon-color-hover': string;
        '--n-line-height': string;
        '--n-border-radius': string;
        '--n-border': string;
    }> | undefined;
    themeClass: import("vue").Ref<string, string> | undefined;
    onRender: (() => void) | undefined;
    placement: "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    render: PropType<MessageRenderMessage>;
    icon: PropType<() => VNodeChild>;
    type: {
        readonly type: PropType<MessageType>;
        readonly default: "info";
    };
    content: PropType<string | number | (() => VNodeChild)>;
    showIcon: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    closable: BooleanConstructor;
    keepAliveOnHover: BooleanConstructor;
    spinProps: PropType<MessageSpinProps>;
    onClose: PropType<() => void>;
    onMouseenter: PropType<(e: MouseEvent) => void>;
    onMouseleave: PropType<(e: MouseEvent) => void>;
}>> & Readonly<{}>, {
    type: MessageType;
    showIcon: boolean;
    closable: boolean;
    keepAliveOnHover: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
