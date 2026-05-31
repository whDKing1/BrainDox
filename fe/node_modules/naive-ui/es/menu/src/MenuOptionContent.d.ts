import type { PropType } from 'vue';
import type { TmNode } from './interface';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    collapsed: BooleanConstructor;
    disabled: BooleanConstructor;
    title: (StringConstructor | FunctionConstructor)[];
    icon: FunctionConstructor;
    extra: (StringConstructor | FunctionConstructor)[];
    showArrow: BooleanConstructor;
    childActive: BooleanConstructor;
    hover: BooleanConstructor;
    paddingLeft: NumberConstructor;
    selected: BooleanConstructor;
    maxIconSize: {
        type: NumberConstructor;
        required: true;
    };
    activeIconSize: {
        type: NumberConstructor;
        required: true;
    };
    iconMarginRight: {
        type: NumberConstructor;
        required: true;
    };
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    onClick: PropType<(e: MouseEvent) => void>;
    tmNode: {
        type: PropType<TmNode>;
        required: true;
    };
    isEllipsisPlaceholder: BooleanConstructor;
}>, {
    menuProps: import("./Menu").MenuSetupProps;
    style: import("vue").ComputedRef<{
        paddingLeft: string | 0 | undefined;
    }>;
    iconStyle: import("vue").ComputedRef<{
        width: string;
        height: string;
        fontSize: string;
        marginRight: string;
    }>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    collapsed: BooleanConstructor;
    disabled: BooleanConstructor;
    title: (StringConstructor | FunctionConstructor)[];
    icon: FunctionConstructor;
    extra: (StringConstructor | FunctionConstructor)[];
    showArrow: BooleanConstructor;
    childActive: BooleanConstructor;
    hover: BooleanConstructor;
    paddingLeft: NumberConstructor;
    selected: BooleanConstructor;
    maxIconSize: {
        type: NumberConstructor;
        required: true;
    };
    activeIconSize: {
        type: NumberConstructor;
        required: true;
    };
    iconMarginRight: {
        type: NumberConstructor;
        required: true;
    };
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    onClick: PropType<(e: MouseEvent) => void>;
    tmNode: {
        type: PropType<TmNode>;
        required: true;
    };
    isEllipsisPlaceholder: BooleanConstructor;
}>> & Readonly<{}>, {
    disabled: boolean;
    hover: boolean;
    selected: boolean;
    showArrow: boolean;
    collapsed: boolean;
    childActive: boolean;
    isEllipsisPlaceholder: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
