import type { ExtractPropTypes, PropType, SlotsType, VNode } from 'vue';
export declare const breadcrumbItemProps: {
    readonly separator: StringConstructor;
    readonly href: StringConstructor;
    readonly clickable: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly showSeparator: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly onClick: PropType<(e: MouseEvent) => void>;
};
export type BreadcrumbItemProps = Partial<ExtractPropTypes<typeof breadcrumbItemProps>>;
export interface BreadcrumbItemSlots {
    default?: () => VNode[];
    separator?: () => VNode[];
}
declare const _default: import("vue").DefineComponent<ExtractPropTypes<{
    readonly separator: StringConstructor;
    readonly href: StringConstructor;
    readonly clickable: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly showSeparator: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly onClick: PropType<(e: MouseEvent) => void>;
}>, (() => null) | (() => JSX.Element), {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ExtractPropTypes<{
    readonly separator: StringConstructor;
    readonly href: StringConstructor;
    readonly clickable: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly showSeparator: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly onClick: PropType<(e: MouseEvent) => void>;
}>> & Readonly<{}>, {
    readonly clickable: boolean;
    readonly showSeparator: boolean;
}, SlotsType<BreadcrumbItemSlots>, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
