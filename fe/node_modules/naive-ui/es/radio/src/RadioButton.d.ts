import type { ExtractPublicPropTypes } from '../../_utils';
import { radioBaseProps } from './use-radio';
export declare const radioButtonProps: {
    readonly name: StringConstructor;
    readonly value: {
        readonly type: import("vue").PropType<string | number | boolean>;
        readonly default: "on";
    };
    readonly checked: {
        readonly type: import("vue").PropType<boolean | undefined>;
        readonly default: undefined;
    };
    readonly defaultChecked: BooleanConstructor;
    readonly disabled: {
        readonly type: import("vue").PropType<boolean | undefined>;
        readonly default: undefined;
    };
    readonly label: StringConstructor;
    readonly size: import("vue").PropType<import("./public-types").RadioSize>;
    readonly onUpdateChecked: import("vue").PropType<undefined | import("../../_utils").MaybeArray<(value: boolean) => void>>;
    readonly 'onUpdate:checked': import("vue").PropType<undefined | import("../../_utils").MaybeArray<(value: boolean) => void>>;
    readonly checkedValue: {
        readonly type: import("vue").PropType<boolean | undefined>;
        readonly default: undefined;
    };
};
export type RadioButtonProps = ExtractPublicPropTypes<typeof radioBaseProps>;
declare const _default: import("vue").DefineComponent<{
    readonly value: string | number | boolean;
    readonly defaultChecked: boolean;
    readonly label?: string | undefined;
    readonly disabled?: boolean | undefined;
    readonly name?: string | undefined;
    readonly size?: import("./public-types").RadioSize | undefined;
    readonly checked?: boolean | undefined;
    readonly checkedValue?: boolean | undefined;
    readonly 'onUpdate:checked'?: import("../../_utils").MaybeArray<(value: boolean) => void> | undefined;
    readonly onUpdateChecked?: import("../../_utils").MaybeArray<(value: boolean) => void> | undefined;
}, import("./use-radio").UseRadio, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{
    readonly value: string | number | boolean;
    readonly defaultChecked: boolean;
    readonly label?: string | undefined;
    readonly disabled?: boolean | undefined;
    readonly name?: string | undefined;
    readonly size?: import("./public-types").RadioSize | undefined;
    readonly checked?: boolean | undefined;
    readonly checkedValue?: boolean | undefined;
    readonly 'onUpdate:checked'?: import("../../_utils").MaybeArray<(value: boolean) => void> | undefined;
    readonly onUpdateChecked?: import("../../_utils").MaybeArray<(value: boolean) => void> | undefined;
}> & Readonly<{}>, {
    readonly value: string | number | boolean;
    readonly disabled: boolean | undefined;
    readonly checked: boolean | undefined;
    readonly defaultChecked: boolean;
    readonly checkedValue: boolean | undefined;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
