"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const _utils_1 = require("../../_utils");
const checkbox_1 = require("../../checkbox");
const interface_1 = require("./interface");
exports.default = (0, vue_1.defineComponent)({
    name: 'NTransferListItem',
    props: {
        source: Boolean,
        label: {
            type: String,
            required: true
        },
        value: {
            type: [String, Number],
            required: true
        },
        disabled: Boolean,
        option: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const { targetValueSetRef, mergedClsPrefixRef, mergedThemeRef, handleItemCheck, renderSourceLabelRef, renderTargetLabelRef, showSelectedRef } = (0, vue_1.inject)(interface_1.transferInjectionKey);
        const checkedRef = (0, vooks_1.useMemo)(() => targetValueSetRef.value.has(props.value));
        function handleClick() {
            if (!props.disabled) {
                handleItemCheck(!checkedRef.value, props.value);
            }
        }
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            mergedTheme: mergedThemeRef,
            checked: checkedRef,
            showSelected: showSelectedRef,
            renderSourceLabel: renderSourceLabelRef,
            renderTargetLabel: renderTargetLabelRef,
            handleClick
        };
    },
    render() {
        const { disabled, mergedTheme, mergedClsPrefix, label, checked, source, renderSourceLabel, renderTargetLabel } = this;
        return ((0, vue_1.h)("div", { class: [
                `${mergedClsPrefix}-transfer-list-item`,
                disabled && `${mergedClsPrefix}-transfer-list-item--disabled`,
                source
                    ? `${mergedClsPrefix}-transfer-list-item--source`
                    : `${mergedClsPrefix}-transfer-list-item--target`
            ], onClick: source ? this.handleClick : undefined },
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-transfer-list-item__background` }),
            source && this.showSelected && ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-transfer-list-item__checkbox` },
                (0, vue_1.h)(checkbox_1.NCheckbox, { theme: mergedTheme.peers.Checkbox, themeOverrides: mergedTheme.peerOverrides.Checkbox, disabled: disabled, checked: checked }))),
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-transfer-list-item__label`, title: (0, _utils_1.getTitleAttribute)(label) }, source
                ? renderSourceLabel
                    ? renderSourceLabel({
                        option: this.option
                    })
                    : label
                : renderTargetLabel
                    ? renderTargetLabel({
                        option: this.option
                    })
                    : label),
            !source && !disabled && ((0, vue_1.h)(_internal_1.NBaseClose, { focusable: false, class: `${mergedClsPrefix}-transfer-list-item__close`, clsPrefix: mergedClsPrefix, onClick: this.handleClick }))));
    }
});
