declare const presetProps: {
    icon: import("vue").PropType<() => import("vue").VNodeChild>;
    type: {
        readonly type: import("vue").PropType<"info" | "success" | "warning" | "error" | "default">;
        readonly default: "default";
    };
    title: import("vue").PropType<string | (() => import("vue").VNodeChild)>;
    closable: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    negativeText: StringConstructor;
    positiveText: StringConstructor;
    positiveButtonProps: import("vue").PropType<import("../..").ButtonProps>;
    negativeButtonProps: import("vue").PropType<import("../..").ButtonProps>;
    content: import("vue").PropType<string | (() => import("vue").VNodeChild)>;
    action: import("vue").PropType<() => import("vue").VNodeChild>;
    showIcon: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    loading: BooleanConstructor;
    bordered: BooleanConstructor;
    iconPlacement: import("vue").PropType<import("../../dialog/src/interface").IconPlacement>;
    titleClass: import("vue").PropType<string | Array<string | undefined>>;
    titleStyle: import("vue").PropType<string | import("vue").CSSProperties>;
    contentClass: import("vue").PropType<string | Array<string | undefined>>;
    contentStyle: import("vue").PropType<string | import("vue").CSSProperties>;
    actionClass: import("vue").PropType<string | Array<string | undefined>>;
    actionStyle: import("vue").PropType<string | import("vue").CSSProperties>;
    onPositiveClick: import("vue").PropType<(e: MouseEvent) => void>;
    onNegativeClick: import("vue").PropType<(e: MouseEvent) => void>;
    onClose: import("vue").PropType<() => void>;
    closeFocusable: BooleanConstructor;
    contentScrollable: BooleanConstructor;
    headerClass: StringConstructor;
    headerStyle: import("vue").PropType<import("vue").CSSProperties | string>;
    headerExtraClass: StringConstructor;
    headerExtraStyle: import("vue").PropType<import("vue").CSSProperties | string>;
    footerClass: StringConstructor;
    footerStyle: import("vue").PropType<import("vue").CSSProperties | string>;
    embedded: BooleanConstructor;
    segmented: {
        readonly type: import("vue").PropType<boolean | import("../..").CardSegmented>;
        readonly default: false;
    };
    size: import("vue").PropType<import("../..").CardSize>;
    hoverable: BooleanConstructor;
    role: StringConstructor;
    tag: {
        readonly type: import("vue").PropType<keyof HTMLElementTagNameMap>;
        readonly default: "div";
    };
    cover: import("vue").PropType<() => import("vue").VNodeChild>;
    footer: import("vue").PropType<() => import("vue").VNodeChild>;
    headerExtra: import("vue").PropType<() => import("vue").VNodeChild>;
};
declare const presetPropsKeys: ("type" | "size" | "title" | "showIcon" | "bordered" | "closable" | "onClose" | "icon" | "content" | "contentClass" | "contentStyle" | "loading" | "cover" | "footer" | "tag" | "iconPlacement" | "contentScrollable" | "headerClass" | "headerStyle" | "headerExtraClass" | "headerExtraStyle" | "footerClass" | "footerStyle" | "embedded" | "segmented" | "hoverable" | "role" | "action" | "headerExtra" | "closeFocusable" | "negativeText" | "positiveText" | "positiveButtonProps" | "negativeButtonProps" | "titleClass" | "titleStyle" | "actionClass" | "actionStyle" | "onPositiveClick" | "onNegativeClick")[];
export { presetProps, presetPropsKeys };
