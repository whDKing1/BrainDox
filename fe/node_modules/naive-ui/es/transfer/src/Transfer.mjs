import { depx } from 'seemly';
import { useIsMounted } from 'vooks';
import { computed, defineComponent, h, provide, toRef, watchEffect } from 'vue';
import { NScrollbar } from "../../_internal/index.mjs";
import { useConfig, useFormItem, useTheme } from "../../_mixins/index.mjs";
import { call, warnOnce } from "../../_utils/index.mjs";
import { createKey } from "../../_utils/cssr/index.mjs";
import { transferLight } from "../styles/index.mjs";
import { transferInjectionKey } from "./interface.mjs";
import style from "./styles/index.cssr.mjs";
import NTransferFilter from "./TransferFilter.mjs";
import NTransferHeader from "./TransferHeader.mjs";
import NTransferList from "./TransferList.mjs";
import { useTransferData } from "./use-transfer-data.mjs";
export const transferProps = Object.assign(Object.assign({}, useTheme.props), {
  value: Array,
  defaultValue: {
    type: Array,
    default: null
  },
  options: {
    type: Array,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: undefined
  },
  virtualScroll: Boolean,
  sourceTitle: [String, Function],
  selectAllText: String,
  clearText: String,
  targetTitle: [String, Function],
  filterable: {
    type: Boolean,
    default: undefined
  },
  sourceFilterable: Boolean,
  targetFilterable: Boolean,
  showSelected: {
    type: Boolean,
    default: true
  },
  sourceFilterPlaceholder: String,
  targetFilterPlaceholder: String,
  filter: {
    type: Function,
    default: (pattern, option) => {
      if (!pattern) return true;
      return ~`${option.label}`.toLowerCase().indexOf(`${pattern}`.toLowerCase());
    }
  },
  size: String,
  renderSourceLabel: Function,
  renderTargetLabel: Function,
  renderSourceList: Function,
  renderTargetList: Function,
  'onUpdate:value': [Function, Array],
  onUpdateValue: [Function, Array],
  onChange: [Function, Array]
});
export default defineComponent({
  name: 'Transfer',
  props: transferProps,
  setup(props) {
    if (process.env.NODE_ENV !== 'production') {
      watchEffect(() => {
        if (props.onChange !== undefined) {
          warnOnce('transfer', '`on-change` is deprecated, please use `on-update:value` instead.');
        }
        if (props.filterable !== undefined) {
          warnOnce('transfer', '`filterable` is deprecated, please use `source-filterable` or `target-filterable` instead.');
        }
      });
    }
    const {
      mergedClsPrefixRef,
      mergedComponentPropsRef
    } = useConfig(props);
    const themeRef = useTheme('Transfer', '-transfer', style, transferLight, props, mergedClsPrefixRef);
    const formItem = useFormItem(props, {
      mergedSize: NFormItem => {
        var _a, _b;
        const {
          size
        } = props;
        if (size) return size;
        const {
          mergedSize: formItemSize
        } = NFormItem || {};
        if (formItemSize === null || formItemSize === void 0 ? void 0 : formItemSize.value) return formItemSize.value;
        const configSize = (_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Transfer) === null || _b === void 0 ? void 0 : _b.size;
        if (configSize) return configSize;
        return 'medium';
      }
    });
    const {
      mergedSizeRef,
      mergedDisabledRef
    } = formItem;
    const itemSizeRef = computed(() => {
      const {
        value: size
      } = mergedSizeRef;
      const {
        self: {
          [createKey('itemHeight', size)]: itemSize
        }
      } = themeRef.value;
      return depx(itemSize);
    });
    const {
      uncontrolledValueRef,
      mergedValueRef,
      targetValueSetRef,
      valueSetForCheckAllRef,
      valueSetForUncheckAllRef,
      valueSetForClearRef,
      filteredTgtOptionsRef,
      filteredSrcOptionsRef,
      targetOptionsRef,
      canNotSelectAnythingRef,
      canBeClearedRef,
      allCheckedRef,
      srcPatternRef,
      tgtPatternRef,
      mergedSrcFilterableRef,
      handleSrcFilterUpdateValue,
      handleTgtFilterUpdateValue
    } = useTransferData(props);
    function doUpdateValue(value) {
      const {
        onUpdateValue,
        'onUpdate:value': _onUpdateValue,
        onChange
      } = props;
      const {
        nTriggerFormInput,
        nTriggerFormChange
      } = formItem;
      if (onUpdateValue) call(onUpdateValue, value);
      if (_onUpdateValue) call(_onUpdateValue, value);
      if (onChange) call(onChange, value);
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
      } else {
        doUpdateValue((mergedValueRef.value || []).filter(v => v !== optionValue));
      }
    }
    function handleChecked(optionValueList) {
      doUpdateValue(optionValueList);
    }
    provide(transferInjectionKey, {
      targetValueSetRef,
      mergedClsPrefixRef,
      disabledRef: mergedDisabledRef,
      mergedThemeRef: themeRef,
      targetOptionsRef,
      canNotSelectAnythingRef,
      canBeClearedRef,
      allCheckedRef,
      srcOptionsLengthRef: computed(() => props.options.length),
      handleItemCheck,
      renderSourceLabelRef: toRef(props, 'renderSourceLabel'),
      renderTargetLabelRef: toRef(props, 'renderTargetLabel'),
      showSelectedRef: toRef(props, 'showSelected')
    });
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedDisabled: mergedDisabledRef,
      itemSize: itemSizeRef,
      isMounted: useIsMounted(),
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
      cssVars: computed(() => {
        const {
          value: size
        } = mergedSizeRef;
        const {
          common: {
            cubicBezierEaseInOut
          },
          self: {
            borderRadius,
            borderColor,
            listColor,
            titleTextColor,
            titleTextColorDisabled,
            extraTextColor,
            itemTextColor,
            itemColorPending,
            itemTextColorDisabled,
            titleFontWeight,
            closeColorHover,
            closeColorPressed,
            closeIconColor,
            closeIconColorHover,
            closeIconColorPressed,
            closeIconSize,
            closeSize,
            dividerColor,
            extraTextColorDisabled,
            [createKey('extraFontSize', size)]: extraFontSize,
            [createKey('fontSize', size)]: fontSize,
            [createKey('titleFontSize', size)]: titleFontSize,
            [createKey('itemHeight', size)]: itemHeight,
            [createKey('headerHeight', size)]: headerHeight
          }
        } = themeRef.value;
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
    const {
      mergedClsPrefix,
      renderSourceList,
      renderTargetList,
      mergedTheme,
      mergedSrcFilterable,
      targetFilterable
    } = this;
    return h("div", {
      class: [`${mergedClsPrefix}-transfer`, this.mergedDisabled && `${mergedClsPrefix}-transfer--disabled`],
      style: this.cssVars
    }, h("div", {
      class: `${mergedClsPrefix}-transfer-list ${mergedClsPrefix}-transfer-list--source`
    }, h(NTransferHeader, {
      source: true,
      selectAllText: this.selectAllText,
      clearText: this.clearText,
      title: this.sourceTitle,
      onCheckedAll: this.handleSourceCheckAll,
      onClearAll: this.handleSourceUncheckAll,
      size: this.mergedSize
    }), h("div", {
      class: `${mergedClsPrefix}-transfer-list-body`
    }, mergedSrcFilterable ? h(NTransferFilter, {
      onUpdateValue: this.handleSrcFilterUpdateValue,
      value: this.srcPattern,
      disabled: this.mergedDisabled,
      placeholder: this.sourceFilterPlaceholder
    }) : null, h("div", {
      class: `${mergedClsPrefix}-transfer-list-flex-container`
    }, renderSourceList ? h(NScrollbar, {
      theme: mergedTheme.peers.Scrollbar,
      themeOverrides: mergedTheme.peerOverrides.Scrollbar
    }, {
      default: () => renderSourceList({
        onCheck: this.handleChecked,
        checkedOptions: this.filteredTgtOpts,
        pattern: this.srcPattern
      })
    }) : h(NTransferList, {
      source: true,
      options: this.filteredSrcOpts,
      disabled: this.mergedDisabled,
      virtualScroll: this.virtualScroll,
      itemSize: this.itemSize
    }))), h("div", {
      class: `${mergedClsPrefix}-transfer-list__border`
    })), h("div", {
      class: `${mergedClsPrefix}-transfer-list ${mergedClsPrefix}-transfer-list--target`
    }, h(NTransferHeader, {
      onClearAll: this.handleTargetClearAll,
      size: this.mergedSize,
      title: this.targetTitle
    }), h("div", {
      class: `${mergedClsPrefix}-transfer-list-body`
    }, targetFilterable ? h(NTransferFilter, {
      onUpdateValue: this.handleTgtFilterUpdateValue,
      value: this.tgtPattern,
      disabled: this.mergedDisabled,
      placeholder: this.sourceFilterPlaceholder
    }) : null, h("div", {
      class: `${mergedClsPrefix}-transfer-list-flex-container`
    }, renderTargetList ? h(NScrollbar, {
      theme: mergedTheme.peers.Scrollbar,
      themeOverrides: mergedTheme.peerOverrides.Scrollbar
    }, {
      default: () => renderTargetList({
        onCheck: this.handleChecked,
        checkedOptions: this.filteredTgtOpts,
        pattern: this.tgtPattern
      })
    }) : h(NTransferList, {
      options: this.filteredTgtOpts,
      disabled: this.mergedDisabled,
      virtualScroll: this.virtualScroll,
      itemSize: this.itemSize
    }))), h("div", {
      class: `${mergedClsPrefix}-transfer-list__border`
    })));
  }
});