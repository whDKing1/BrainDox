import type { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    indent: {
        type: NumberConstructor;
        required: true;
    };
    right: BooleanConstructor;
    focusable: BooleanConstructor;
    disabled: BooleanConstructor;
    checked: BooleanConstructor;
    indeterminate: BooleanConstructor;
    onCheck: PropType<(value: boolean) => void>;
}>, {
    handleUpdateValue: (value: boolean) => void;
    mergedTheme: import("vue").Ref<{
        common: import("../..").ThemeCommonVars;
        self: {
            fontSize: string;
            lineHeight: string;
            nodeHeight: string;
            nodeWrapperPadding: string;
            nodeBorderRadius: string;
            nodeColorHover: string;
            nodeColorPressed: string;
            nodeColorActive: string;
            arrowColor: string;
            nodeTextColor: string;
            nodeTextColorDisabled: string;
            loadingColor: string;
            dropMarkColor: string;
            lineColor: string;
        };
        peers: {
            Checkbox: import("../../_mixins").Theme<"Checkbox", {
                labelLineHeight: string;
                fontSizeSmall: string;
                fontSizeMedium: string;
                fontSizeLarge: string;
                borderRadius: string;
                color: string;
                colorChecked: string;
                colorDisabled: string;
                colorDisabledChecked: string;
                colorTableHeader: string;
                colorTableHeaderModal: string;
                colorTableHeaderPopover: string;
                checkMarkColor: string;
                checkMarkColorDisabled: string;
                checkMarkColorDisabledChecked: string;
                border: string;
                borderDisabled: string;
                borderDisabledChecked: string;
                borderChecked: string;
                borderFocus: string;
                boxShadowFocus: string;
                textColor: string;
                textColorDisabled: string;
                sizeSmall: string;
                sizeMedium: string;
                sizeLarge: string;
                labelPadding: string;
                labelFontWeight: string;
            }, any>;
            Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
                height: string;
                width: string;
                borderRadius: string;
                color: string;
                colorHover: string;
                railInsetHorizontalBottom: string;
                railInsetHorizontalTop: string;
                railInsetVerticalRight: string;
                railInsetVerticalLeft: string;
                railColor: string;
            }, any>;
            Empty: import("../../_mixins").Theme<"Empty", {
                fontSizeTiny: string;
                fontSizeSmall: string;
                fontSizeMedium: string;
                fontSizeLarge: string;
                fontSizeHuge: string;
                textColor: string;
                iconColor: string;
                extraTextColor: string;
                iconSizeTiny: string;
                iconSizeSmall: string;
                iconSizeMedium: string;
                iconSizeLarge: string;
                iconSizeHuge: string;
            }, any>;
        };
        peerOverrides: {
            Checkbox?: {
                peers?: {
                    [x: string]: any;
                } | undefined;
            } | undefined;
            Scrollbar?: {
                peers?: {
                    [x: string]: any;
                } | undefined;
            } | undefined;
            Empty?: {
                peers?: {
                    [x: string]: any;
                } | undefined;
            } | undefined;
        };
    }, {
        common: import("../..").ThemeCommonVars;
        self: {
            fontSize: string;
            lineHeight: string;
            nodeHeight: string;
            nodeWrapperPadding: string;
            nodeBorderRadius: string;
            nodeColorHover: string;
            nodeColorPressed: string;
            nodeColorActive: string;
            arrowColor: string;
            nodeTextColor: string;
            nodeTextColorDisabled: string;
            loadingColor: string;
            dropMarkColor: string;
            lineColor: string;
        };
        peers: {
            Checkbox: import("../../_mixins").Theme<"Checkbox", {
                labelLineHeight: string;
                fontSizeSmall: string;
                fontSizeMedium: string;
                fontSizeLarge: string;
                borderRadius: string;
                color: string;
                colorChecked: string;
                colorDisabled: string;
                colorDisabledChecked: string;
                colorTableHeader: string;
                colorTableHeaderModal: string;
                colorTableHeaderPopover: string;
                checkMarkColor: string;
                checkMarkColorDisabled: string;
                checkMarkColorDisabledChecked: string;
                border: string;
                borderDisabled: string;
                borderDisabledChecked: string;
                borderChecked: string;
                borderFocus: string;
                boxShadowFocus: string;
                textColor: string;
                textColorDisabled: string;
                sizeSmall: string;
                sizeMedium: string;
                sizeLarge: string;
                labelPadding: string;
                labelFontWeight: string;
            }, any>;
            Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
                height: string;
                width: string;
                borderRadius: string;
                color: string;
                colorHover: string;
                railInsetHorizontalBottom: string;
                railInsetHorizontalTop: string;
                railInsetVerticalRight: string;
                railInsetVerticalLeft: string;
                railColor: string;
            }, any>;
            Empty: import("../../_mixins").Theme<"Empty", {
                fontSizeTiny: string;
                fontSizeSmall: string;
                fontSizeMedium: string;
                fontSizeLarge: string;
                fontSizeHuge: string;
                textColor: string;
                iconColor: string;
                extraTextColor: string;
                iconSizeTiny: string;
                iconSizeSmall: string;
                iconSizeMedium: string;
                iconSizeLarge: string;
                iconSizeHuge: string;
            }, any>;
        };
        peerOverrides: {
            Checkbox?: {
                peers?: {
                    [x: string]: any;
                } | undefined;
            } | undefined;
            Scrollbar?: {
                peers?: {
                    [x: string]: any;
                } | undefined;
            } | undefined;
            Empty?: {
                peers?: {
                    [x: string]: any;
                } | undefined;
            } | undefined;
        };
    }>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    indent: {
        type: NumberConstructor;
        required: true;
    };
    right: BooleanConstructor;
    focusable: BooleanConstructor;
    disabled: BooleanConstructor;
    checked: BooleanConstructor;
    indeterminate: BooleanConstructor;
    onCheck: PropType<(value: boolean) => void>;
}>> & Readonly<{}>, {
    disabled: boolean;
    right: boolean;
    focusable: boolean;
    checked: boolean;
    indeterminate: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
