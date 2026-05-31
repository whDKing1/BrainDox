import type { HTMLAttributes, PropType } from 'vue';
import type { TmNode } from './interface';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    disabled: BooleanConstructor;
    checked: BooleanConstructor;
    selected: BooleanConstructor;
    onClick: PropType<(e: PointerEvent) => void>;
    onDragstart: PropType<(e: DragEvent) => void>;
    tmNode: {
        type: PropType<TmNode>;
        required: true;
    };
    nodeProps: PropType<HTMLAttributes>;
}>, {
    selfRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    renderLabel: import("vue").Ref<(({ option, checked, selected }: import("./interface").TreeRenderProps) => import("vue").VNodeChild) | undefined, (({ option, checked, selected }: import("./interface").TreeRenderProps) => import("vue").VNodeChild) | undefined>;
    renderPrefix: import("vue").Ref<(({ option, checked, selected }: import("./interface").TreeRenderProps) => import("vue").VNodeChild) | undefined, (({ option, checked, selected }: import("./interface").TreeRenderProps) => import("vue").VNodeChild) | undefined>;
    renderSuffix: import("vue").Ref<(({ option, checked, selected }: import("./interface").TreeRenderProps) => import("vue").VNodeChild) | undefined, (({ option, checked, selected }: import("./interface").TreeRenderProps) => import("vue").VNodeChild) | undefined>;
    labelField: import("vue").Ref<string, string>;
    handleClick: (e: PointerEvent) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    disabled: BooleanConstructor;
    checked: BooleanConstructor;
    selected: BooleanConstructor;
    onClick: PropType<(e: PointerEvent) => void>;
    onDragstart: PropType<(e: DragEvent) => void>;
    tmNode: {
        type: PropType<TmNode>;
        required: true;
    };
    nodeProps: PropType<HTMLAttributes>;
}>> & Readonly<{}>, {
    disabled: boolean;
    selected: boolean;
    checked: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
