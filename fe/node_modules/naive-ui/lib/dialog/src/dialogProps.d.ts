import type { CSSProperties, PropType, VNodeChild } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
import type { ButtonProps } from '../../button';
import type { IconPlacement } from './interface';
declare const dialogProps: {
    readonly icon: PropType<() => VNodeChild>;
    readonly type: {
        readonly type: PropType<"info" | "success" | "warning" | "error" | "default">;
        readonly default: "default";
    };
    readonly title: PropType<string | (() => VNodeChild)>;
    readonly closable: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly negativeText: StringConstructor;
    readonly positiveText: StringConstructor;
    readonly positiveButtonProps: PropType<ButtonProps>;
    readonly negativeButtonProps: PropType<ButtonProps>;
    readonly content: PropType<string | (() => VNodeChild)>;
    readonly action: PropType<() => VNodeChild>;
    readonly showIcon: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly loading: BooleanConstructor;
    readonly bordered: BooleanConstructor;
    readonly iconPlacement: PropType<IconPlacement>;
    readonly titleClass: PropType<string | Array<string | undefined>>;
    readonly titleStyle: PropType<string | CSSProperties>;
    readonly contentClass: PropType<string | Array<string | undefined>>;
    readonly contentStyle: PropType<string | CSSProperties>;
    readonly actionClass: PropType<string | Array<string | undefined>>;
    readonly actionStyle: PropType<string | CSSProperties>;
    readonly onPositiveClick: PropType<(e: MouseEvent) => void>;
    readonly onNegativeClick: PropType<(e: MouseEvent) => void>;
    readonly onClose: PropType<() => void>;
    readonly closeFocusable: BooleanConstructor;
};
export type DialogProps = ExtractPublicPropTypes<typeof dialogProps>;
export { dialogProps };
export declare const dialogPropKeys: ("type" | "title" | "showIcon" | "bordered" | "closable" | "onClose" | "icon" | "content" | "contentClass" | "contentStyle" | "loading" | "iconPlacement" | "action" | "closeFocusable" | "negativeText" | "positiveText" | "positiveButtonProps" | "negativeButtonProps" | "titleClass" | "titleStyle" | "actionClass" | "actionStyle" | "onPositiveClick" | "onNegativeClick")[];
