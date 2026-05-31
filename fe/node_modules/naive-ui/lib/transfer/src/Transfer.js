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
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const cssr_1 = require("../../_utils/cssr");
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
    }, virtualScroll: Boolean, sourceTitle: [String, Function], selectAllText: String, clearText: String, targetTitle: [String, Function], filterable: {
        type: Boolean,
        default: undefined
    }, sourceFilterable: Boolean, targetFilterable: Boolean, showSelected: {
        type: Boolean,
        default: true
    }, sourceFilterPlaceholder: String, targetFilterPlaceholder: String, filter: {
        type: Function,
        default: (pattern, option) => {
            if (!pattern)
                return true;
            return ~`${option.label}`
                .toLowerCase()
                .indexOf(`${pattern}`.toLowerCase());
        }
    }, size: String, renderSourceLabel: Function, renderTargetLabel: Function, renderSourceList: Function, renderTargetList: Function, 'onUpdate:value': [Function, Array], onUpdateValue: [Function, Array], onChange: [Function, Array] });
exports.default = (0, vue_1.defineComponent)({
    name: 'Transfer',
    props: exports.transferProps,
    setup(props) {
        if (process.env.NODE_ENV !== 'production') {
            (0, vue_1.watchEffect)(() => {
                if (props.onChange !== undefined) {
                    (0, _utils_1.warnOnce)('transfer', '`on-change` is deprecated, please use `on-update:value` instead.');
                }
                if (props.filterable !== undefined) {
                    (0, _utils_1.warnOnce)('transfer', '`filterable` is deprecated, please use `source-filterable` or `target-filterable` instead.');
                }
            });
        }
        const { mergedClsPrefixRef, mergedComponentPropsRef } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Transfer', '-transfer', index_cssr_1.default, styles_1.transferLight, props, mergedClsPrefixRef);
        const formItem = (0, _mixins_1.useFormItem)(props, {
            mergedSize: (NFormItem) => {
                var _a, _b;
                const { size } = props;
                if (size)
                    return size;
                const { mergedSize: formItemSize } = NFormItem || {};
                if (formItemSize === null || formItemSize === void 0 ? void 0 : formItemSize.value)
                    return formItemSize.value;
                const configSize = (_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Transfer) === null || _b === void 0 ? void 0 : _b.size;
                if (configSize)
                    return configSize;
                return 'medium';
            }
        });
        const { mergedSizeRef, mergedDisabledRef } = formItem;
        const itemSizeRef = (0, vue_1.computed)(() => {
            const { value: size } = mergedSizeRef;
            const { self: { [(0, cssr_1.createKey)('itemHeight', size)]: itemSize } } = themeRef.value;
            return (0, seemly_1.depx)(itemSize);
        });
        const { uncontrolledValueRef, mergedValueRef, targetValueSetRef, valueSetForCheckAllRef, valueSetForUncheckAllRef, valueSetForClearRef, filteredTgtOptionsRef, filteredSrcOptionsRef, targetOptionsRef, canNotSelectAnythingRef, canBeClearedRef, allCheckedRef, srcPatternRef, tgtPatternRef, mergedSrcFilterableRef, handleSrcFilterUpdateValue, handleTgtFilterUpdateValue } = (0, use_transfer_data_1.useTransferData)(props);
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
        function handleSourceCheckAll() {
            doUpdateValue([...valueSetForCheckAllRef.value]);
        }
        function handleSourceUncheckAll() {
            doUpdateValue([...valueSetForUncheckAllRef.value]);
        }
        function handleTargetClearAll() {
            doUpdateValue([...valueSetForClearRef.value]);
        }
        function handleItemCheck(checked, optionValue) {
            if (checked) {
                doUpdateValue((mergedValueRef.value || []).concat(optionValue));
            }
            else {
                doUpdateValue((mergedValueRef.value || []).filter(v => v !== optionValue));
            }
        }
        function handleChecked(optionValueList) {
            doUpdateValue(optionValueList);
        }
        (0, vue_1.provide)(interface_1.transferInjectionKey, {
            targetValueSetRef,
            mergedClsPrefixRef,
            disabledRef: mergedDisabledRef,
            mergedThemeRef: themeRef,
            targetOptionsRef,
            canNotSelectAnythingRef,
            canBeClearedRef,
            allCheckedRef,
            srcOptionsLengthRef: (0, vue_1.computed)(() => props.options.length),
            handleItemCheck,
            renderSourceLabelRef: (0, vue_1.toRef)(props, 'renderSourceLabel'),
            renderTargetLabelRef: (0, vue_1.toRef)(props, 'renderTargetLabel'),
            showSelectedRef: (0, vue_1.toRef)(props, 'showSelected')
        });
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            mergedDisabled: mergedDisabledRef,
            itemSize: itemSizeRef,
            isMounted: (0, vooks_1.useIsMounted)(),
            mergedTheme: themeRef,
            filteredSrcOpts: filteredSrcOptionsRef,
            filteredTgtOpts: filteredTgtOptionsRef,
            srcPattern: srcPatternRef,
            tgtPattern: tgtPatternRef,
            mergedSize: mergedSizeRef,
            mergedSrcFilterable: mergedSrcFilterableRef,
            handleSrcFilterUpdateValue,
            handleTgtFilterUpdateValue,
            handleSourceCheckAll,
            handleSourceUncheckAll,
            handleTargetClearAll,
            handleItemCheck,
            handleChecked,
            cssVars: (0, vue_1.computed)(() => {
                const { value: size } = mergedSizeRef;
                const { common: { cubicBezierEaseInOut }, self: { borderRadius, borderColor, listColor, titleTextColor, titleTextColorDisabled, extraTextColor, itemTextColor, itemColorPending, itemTextColorDisabled, titleFontWeight, closeColorHover, closeColorPressed, closeIconColor, closeIconColorHover, closeIconColorPressed, closeIconSize, closeSize, dividerColor, extraTextColorDisabled, [(0, cssr_1.createKey)('extraFontSize', size)]: extraFontSize, [(0, cssr_1.createKey)('fontSize', size)]: fontSize, [(0, cssr_1.createKey)('titleFontSize', size)]: titleFontSize, [(0, cssr_1.createKey)('itemHeight', size)]: itemHeight, [(0, cssr_1.createKey)('headerHeight', size)]: headerHeight } } = themeRef.value;
                return {
                    '--n-bezier': cubicBezierEaseInOut,
                    '--n-border-color': borderColor,
                    '--n-border-radius': borderRadius,
                    '--n-extra-font-size': extraFontSize,
                    '--n-font-size': fontSize,
                    '--n-header-font-size': titleFontSize,
                    '--n-header-extra-text-color': extraTextColor,
                    '--n-header-extra-text-color-disabled': extraTextColorDisabled,
                    '--n-header-font-weight': titleFontWeight,
                    '--n-header-text-color': titleTextColor,
                    '--n-header-text-color-disabled': titleTextColorDisabled,
                    '--n-item-color-pending': itemColorPending,
                    '--n-item-height': itemHeight,
                    '--n-item-text-color': itemTextColor,
                    '--n-item-text-color-disabled': itemTextColorDisabled,
                    '--n-list-color': listColor,
                    '--n-header-height': headerHeight,
                    '--n-close-size': closeSize,
                    '--n-close-icon-size': closeIconSize,
                    '--n-close-color-hover': closeColorHover,
                    '--n-close-color-pressed': closeColorPressed,
                    '--n-close-icon-color': closeIconColor,
                    '--n-close-icon-color-hover': closeIconColorHover,
                    '--n-close-icon-color-pressed': closeIconColorPressed,
                    '--n-divider-color': dividerColor
                };
            })
        };
    },
    render() {
        const { mergedClsPrefix, renderSourceList, renderTargetList, mergedTheme, mergedSrcFilterable, targetFilterable } = this;
        return ((0, vue_1.h)("div", { class: [
                `${mergedClsPrefix}-transfer`,
                this.mergedDisabled && `${mergedClsPrefix}-transfer--disabled`
            ], style: this.cssVars },
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-transfer-list ${mergedClsPrefix}-transfer-list--source` },
                (0, vue_1.h)(TransferHeader_1.default, { source: true, selectAllText: this.selectAllText, clearText: this.clearText, title: this.sourceTitle, onCheckedAll: this.handleSourceCheckAll, onClearAll: this.handleSourceUncheckAll, size: this.mergedSize }),
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-transfer-list-body` },
                    mergedSrcFilterable ? ((0, vue_1.h)(TransferFilter_1.default, { onUpdateValue: this.handleSrcFilterUpdateValue, value: this.srcPattern, disabled: this.mergedDisabled, placeholder: this.sourceFilterPlaceholder })) : null,
                    (0, vue_1.h)("div", { class: `${mergedClsPrefix}-transfer-list-flex-container` }, renderSourceList ? ((0, vue_1.h)(_internal_1.NScrollbar, { theme: mergedTheme.peers.Scrollbar, themeOverrides: mergedTheme.peerOverrides.Scrollbar }, {
                        default: () => renderSourceList({
                            onCheck: this.handleChecked,
                            checkedOptions: this.filteredTgtOpts,
                            pattern: this.srcPattern
                        })
                    })) : ((0, vue_1.h)(TransferList_1.default, { source: true, options: this.filteredSrcOpts, disabled: this.mergedDisabled, virtualScroll: this.virtualScroll, itemSize: this.itemSize })))),
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-transfer-list__border` })),
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-transfer-list ${mergedClsPrefix}-transfer-list--target` },
                (0, vue_1.h)(TransferHeader_1.default, { onClearAll: this.handleTargetClearAll, size: this.mergedSize, title: this.targetTitle }),
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-transfer-list-body` },
                    targetFilterable ? ((0, vue_1.h)(TransferFilter_1.default, { onUpdateValue: this.handleTgtFilterUpdateValue, value: this.tgtPattern, disabled: this.mergedDisabled, placeholder: this.sourceFilterPlaceholder })) : null,
                    (0, vue_1.h)("div", { class: `${mergedClsPrefix}-transfer-list-flex-container` }, renderTargetList ? ((0, vue_1.h)(_internal_1.NScrollbar, { theme: mergedTheme.peers.Scrollbar, themeOverrides: mergedTheme.peerOverrides.Scrollbar }, {
                        default: () => renderTargetList({
                            onCheck: this.handleChecked,
                            checkedOptions: this.filteredTgtOpts,
                            pattern: this.tgtPattern
                        })
                    })) : ((0, vue_1.h)(TransferList_1.default, { options: this.filteredTgtOpts, disabled: this.mergedDisabled, virtualScroll: this.virtualScroll, itemSize: this.itemSize })))),
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-transfer-list__border` }))));
    }
});
