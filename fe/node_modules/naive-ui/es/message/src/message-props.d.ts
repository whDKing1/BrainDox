import type { ExtractPropTypes, PropType, VNodeChild } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
import type { MessageSpinProps } from './public-types';
import type { MessageType } from './types';
export declare const messageProps: {
    readonly icon: PropType<() => VNodeChild>;
    readonly type: {
        readonly type: PropType<MessageType>;
        readonly default: "info";
    };
    readonly content: PropType<string | number | (() => VNodeChild)>;
    readonly showIcon: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly closable: BooleanConstructor;
    readonly keepAliveOnHover: BooleanConstructor;
    readonly spinProps: PropType<MessageSpinProps>;
    readonly onClose: PropType<() => void>;
    readonly onMouseenter: PropType<(e: MouseEvent) => void>;
    readonly onMouseleave: PropType<(e: MouseEvent) => void>;
};
export type MessageProps = ExtractPublicPropTypes<typeof messageProps>;
export type MessageSetupProps = ExtractPropTypes<typeof messageProps>;
