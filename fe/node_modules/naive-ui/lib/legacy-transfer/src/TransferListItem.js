"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _utils_1 = require("../../_utils");
const checkbox_1 = require("../../checkbox");
const interface_1 = require("./interface");
exports.default = (0, vue_1.defineComponent)({
    name: 'NTransferListItem',
    props: {
        source: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            required: true
        },
        value: {
            type: [String, Number],
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const { source } = props;
        const { mergedClsPrefixRef, mergedThemeRef, srcCheckedValuesRef, tgtCheckedValuesRef, handleSrcCheckboxClick, handleTgtCheckboxClick } = (0, vue_1.inject)(interface_1.transferInjectionKey);
        const checkedRef = source
            ? (0, vooks_1.useMemo)(() => srcCheckedValuesRef.value.includes(props.value))
            : (0, vooks_1.useMemo)(() => tgtCheckedValuesRef.value.includes(props.value));
        const handleClick = source
            ? () => {
                if (!props.disabled) {
                    handleSrcCheckboxClick(!checkedRef.value, props.value);
                }
            }
            : () => {
                if (!props.disabled) {
                    handleTgtCheckboxClick(!checkedRef.value, props.value);
                }
            };
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            mergedTheme: mergedThemeRef,
            checked: checkedRef,
            handleClick
        };
    },
    render() {
        const { disabled, mergedTheme, mergedClsPrefix, label, checked, source } = this;
        return ((0, vue_1.h)("div", { class: [
                `${mergedClsPrefix}-legacy-transfer-list-item`,
                disabled && `${mergedClsPrefix}-legacy-transfer-list-item--disabled`,
                source
                    ? `${mergedClsPrefix}-legacy-transfer-list-item--source`
                    : `${mergedClsPrefix}-legacy-transfer-list-item--target`
            ], onClick: this.handleClick },
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-legacy-transfer-list-item__checkbox` },
                (0, vue_1.h)(checkbox_1.NCheckbox, { theme: mergedTheme.peers.Checkbox, themeOverrides: mergedTheme.peerOverrides.Checkbox, disabled: disabled, checked: checked })),
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-legacy-transfer-list-item__label`, title: (0, _utils_1.getTitleAttribute)(label) }, label)));
    }
});
