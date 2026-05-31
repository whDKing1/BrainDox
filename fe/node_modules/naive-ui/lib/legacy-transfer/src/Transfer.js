"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferProps = void 0;
const seemly_1 = require("seemly");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const icons_1 = require("../../_internal/icons");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const cssr_1 = require("../../_utils/cssr");
const button_1 = require("../../button");
const styles_1 = require("../styles");
const interface_1 = require("./interface");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
const TransferFilter_1 = __importDefault(require("./TransferFilter"));
const TransferHeader_1 = __importDefault(require("./TransferHeader"));
const TransferList_1 = __importDefault(require("./TransferList"));
const use_transfer_data_1 = require("./use-transfer-data");
exports.transferProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { value: Array, defaultValue: {
        type: Array,
        default: null
    }, options: {
        type: Array,
        default: () => []
    }, disabled: {
        type: Boolean,
        default: undefined
    }, virtualScroll: Boolean, sourceTitle: String, targetTitle: String, filterable: Boolean, sourceFilterPlaceholder: String, targetFilterPlaceholder: String, filter: {
        type: Function,
        default: (pattern, option) => {
            if (!pattern)
                return true;
            return ~`${option.label}`
                .toLowerCase()
                .indexOf(`${pattern}`.toLowerCase());
        }
    }, size: String, 'onUpdate:value': [Function, Array], onUpdateValue: [Function, Array], onChange: [Function, Array] });
exports.default = (0, vue_1.defineComponent)({
    name: 'LegacyTransfer',
    props: exports.transferProps,
    setup(props) {
        if (process.env.NODE_ENV !== 'production') {
            (0, vue_1.watchEffect)(() => {
                if (props.onChange !== undefined) {
                    (0, _utils_1.warnOnce)('legacy-transfer', '`on-change` is deprecated, please use `on-update:value` instead.');
                }
            });
        }
        const { mergedClsPrefixRef } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('LegacyTransfer', '-legacy-transfer', index_cssr_1.default, styles_1.legacyTransferLight, props, mergedClsPrefixRef);
        const formItem = (0, _mixins_1.useFormItem)(props);
        const { mergedSizeRef, mergedDisabledRef } = formItem;
        const itemSizeRef = (0, vue_1.computed)(() => {
            const { value: size } = mergedSizeRef;
            const { self: { [(0, cssr_1.createKey)('itemHeight', size)]: itemSize } } = themeRef.value;
            return (0, seemly_1.depx)(itemSize);
        });
        const { uncontrolledValue: uncontrolledValueRef, mergedValue: mergedValueRef, avlSrcValueSet: avlSrcValueSetRef, avlTgtValueSet: avlTgtValueSetRef, tgtOpts: tgtOptsRef, srcOpts: srcOptsRef, filteredSrcOpts: filteredSrcOptsRef, filteredTgtOpts: filteredTgtOptsRef, srcCheckedValues: srcCheckedValuesRef, tgtCheckedValues: tgtCheckedValuesRef, srcCheckedStatus: srcCheckedStatusRef, tgtCheckedStatus: tgtCheckedStatusRef, srcPattern: srcPatternRef, tgtPattern: tgtPatternRef, isInputing: isInputingRef, fromButtonDisabled: fromButtonDisabledRef, toButtonDisabled: toButtonDisabledRef, handleInputFocus, handleInputBlur, handleTgtFilterUpdateValue, handleSrcFilterUpdateValue } = (0, use_transfer_data_1.useTransferData)(props, mergedDisabledRef);
        function doUpdateValue(value) {
            const { onUpdateValue, 'onUpdate:value': _onUpdateValue, onChange } = props;
            const { nTriggerFormInput, nTriggerFormChange } = formItem;
            if (onUpdateValue)
                (0, _utils_1.call)(onUpdateValue, value);
            if (_onUpdateValue)
                (0, _utils_1.call)(_onUpdateValue, value);
            if (onChange)
                (0, _utils_1.call)(onChange, value);
            uncontrolledValueRef.value = value;
            nTriggerFormInput();
            nTriggerFormChange();
        }
        function handleSrcHeaderCheck() {
            const { value: { checked, indeterminate } } = srcCheckedStatusRef;
            if (indeterminate || checked) {
                srcCheckedValuesRef.value = [];
            }
            else {
                srcCheckedValuesRef.value = Array.from(avlSrcValueSetRef.value);
            }
        }
        function handleTgtHeaderCheck() {
            const { value: { checked, indeterminate } } = tgtCheckedStatusRef;
            if (indeterminate || checked) {
                tgtCheckedValuesRef.value = [];
            }
            else {
                tgtCheckedValuesRef.value = Array.from(avlTgtValueSetRef.value);
            }
        }
        function handleTgtCheckboxClick(checked, optionValue) {
            if (checked) {
                tgtCheckedValuesRef.value.push(optionValue);
            }
            else {
                const index = tgtCheckedValuesRef.value.findIndex(v => v === optionValue);
                if (~index) {
                    tgtCheckedValuesRef.value.splice(index, 1);
                }
            }
        }
        function handleSrcCheckboxClick(checked, optionValue) {
            if (checked) {
                srcCheckedValuesRef.value.push(optionValue);
            }
            else {
                const index = srcCheckedValuesRef.value.findIndex(v => v === optionValue);
                if (~index) {
                    srcCheckedValuesRef.value.splice(index, 1);
                }
            }
        }
        function handleToTgtClick() {
            doUpdateValue(srcCheckedValuesRef.value.concat(mergedValueRef.value || []));
            srcCheckedValuesRef.value = [];
        }
        function handleToSrcClick() {
            const tgtCheckedValueSet = new Set(tgtCheckedValuesRef.value);
            doUpdateValue((mergedValueRef.value || []).filter(v => !tgtCheckedValueSet.has(v)));
            tgtCheckedValuesRef.value = [];
        }
        (0, vue_1.provide)(interface_1.transferInjectionKey, {
            mergedClsPrefixRef,
            mergedSizeRef,
            disabledRef: mergedDisabledRef,
            mergedThemeRef: themeRef,
            srcCheckedValuesRef,
            tgtCheckedValuesRef,
            srcOptsRef,
            tgtOptsRef,
            srcCheckedStatusRef,
            tgtCheckedStatusRef,
            handleSrcCheckboxClick,
            handleTgtCheckboxClick
        });
        const { localeRef } = (0, _mixins_1.useLocale)('LegacyTransfer');
        return {
            locale: localeRef,
            mergedClsPrefix: mergedClsPrefixRef,
            mergedDisabled: mergedDisabledRef,
            itemSize: itemSizeRef,
            isMounted: (0, vooks_1.useIsMounted)(),
            isInputing: isInputingRef,
            mergedTheme: themeRef,
            filteredSrcOpts: filteredSrcOptsRef,
            filteredTgtOpts: filteredTgtOptsRef,
            srcPattern: srcPatternRef,
            tgtPattern: tgtPatternRef,
            toButtonDisabled: toButtonDisabledRef,
            fromButtonDisabled: fromButtonDisabledRef,
            handleSrcHeaderCheck,
            handleTgtHeaderCheck,
            handleToSrcClick,
            handleToTgtClick,
            handleInputFocus,
            handleInputBlur,
            handleTgtFilterUpdateValue,
            handleSrcFilterUpdateValue,
            cssVars: (0, vue_1.computed)(() => {
                const { value: size } = mergedSizeRef;
                const { common: { cubicBezierEaseInOut, cubicBezierEaseIn, cubicBezierEaseOut }, self: { width, borderRadius, borderColor, listColor, headerColor, titleTextColor, titleTextColorDisabled, extraTextColor, filterDividerColor, itemTextColor, itemColorPending, itemTextColorDisabled, extraFontSize, titleFontWeight, iconColor, iconColorDisabled, [(0, cssr_1.createKey)('fontSize', size)]: fontSize, [(0, cssr_1.createKey)('itemHeight', size)]: itemHeight } } = themeRef.value;
                return {
                    '--n-bezier': cubicBezierEaseInOut,
                    '--n-bezier-ease-in': cubicBezierEaseIn,
                    '--n-bezier-ease-out': cubicBezierEaseOut,
                    '--n-border-color': borderColor,
                    '--n-border-radius': borderRadius,
                    '--n-extra-font-size': extraFontSize,
                    '--n-filter-divider-color': filterDividerColor,
                    '--n-font-size': fontSize,
                    '--n-header-color': headerColor,
                    '--n-header-extra-text-color': extraTextColor,
                    '--n-header-font-weight': titleFontWeight,
                    '--n-header-text-color': titleTextColor,
                    '--n-header-text-color-disabled': titleTextColorDisabled,
                    '--n-item-color-pending': itemColorPending,
                    '--n-item-height': itemHeight,
                    '--n-item-text-color': itemTextColor,
                    '--n-item-text-color-disabled': itemTextColorDisabled,
                    '--n-list-color': listColor,
                    '--n-width': width,
                    '--n-icon-color': iconColor,
                    '--n-icon-color-disabled': iconColorDisabled
                };
            })
        };
    },
    render() {
        const { mergedClsPrefix } = this;
        return ((0, vue_1.h)("div", { class: [
                `${mergedClsPrefix}-legacy-transfer`,
                this.mergedDisabled && `${mergedClsPrefix}-legacy-transfer--disabled`,
                this.filterable && `${mergedClsPrefix}-legacy-transfer--filterable`
            ], style: this.cssVars },
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-legacy-transfer-list` },
                (0, vue_1.h)(TransferHeader_1.default, { source: true, onChange: this.handleSrcHeaderCheck, title: this.sourceTitle || this.locale.sourceTitle }),
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-legacy-transfer-list-body` },
                    this.filterable ? ((0, vue_1.h)(TransferFilter_1.default, { onUpdateValue: this.handleSrcFilterUpdateValue, value: this.srcPattern, disabled: this.mergedDisabled, placeholder: this.sourceFilterPlaceholder, onFocus: this.handleInputFocus, onBlur: this.handleInputBlur })) : null,
                    (0, vue_1.h)("div", { class: `${mergedClsPrefix}-legacy-transfer-list-flex-container` },
                        (0, vue_1.h)(TransferList_1.default, { source: true, options: this.filteredSrcOpts, disabled: this.mergedDisabled, virtualScroll: this.virtualScroll, isMounted: this.isMounted, isInputing: this.isInputing, itemSize: this.itemSize }))),
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-legacy-transfer-list__border` })),
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-legacy-transfer-gap` },
                (0, vue_1.h)(button_1.NButton, { disabled: this.toButtonDisabled || this.mergedDisabled, theme: this.mergedTheme.peers.Button, themeOverrides: this.mergedTheme.peerOverrides.Button, onClick: this.handleToTgtClick }, {
                    icon: () => ((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: mergedClsPrefix }, { default: () => (0, vue_1.h)(icons_1.ChevronRightIcon, null) }))
                }),
                (0, vue_1.h)(button_1.NButton, { disabled: this.fromButtonDisabled || this.mergedDisabled, theme: this.mergedTheme.peers.Button, themeOverrides: this.mergedTheme.peerOverrides.Button, onClick: this.handleToSrcClick }, {
                    icon: () => ((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: mergedClsPrefix }, { default: () => (0, vue_1.h)(icons_1.ChevronLeftIcon, null) }))
                })),
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-legacy-transfer-list` },
                (0, vue_1.h)(TransferHeader_1.default, { onChange: this.handleTgtHeaderCheck, title: this.targetTitle || this.locale.targetTitle }),
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-legacy-transfer-list-body` },
                    this.filterable ? ((0, vue_1.h)(TransferFilter_1.default, { onUpdateValue: this.handleTgtFilterUpdateValue, value: this.tgtPattern, disabled: this.mergedDisabled, placeholder: this.targetFilterPlaceholder, onFocus: this.handleInputFocus, onBlur: this.handleInputBlur })) : null,
                    (0, vue_1.h)("div", { class: `${mergedClsPrefix}-legacy-transfer-list-flex-container` },
                        (0, vue_1.h)(TransferList_1.default, { options: this.filteredTgtOpts, disabled: this.mergedDisabled, virtualScroll: this.virtualScroll, isMounted: this.isMounted, isInputing: this.isInputing, itemSize: this.itemSize }))),
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-legacy-transfer-list__border` }))));
    }
});
