import { useMemo } from 'vooks';
import { defineComponent, h, inject } from 'vue';
import { NBaseClose } from "../../_internal/index.mjs";
import { getTitleAttribute } from "../../_utils/index.mjs";
import { NCheckbox } from "../../checkbox/index.mjs";
import { transferInjectionKey } from "./interface.mjs";
export default defineComponent({
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
    const {
      targetValueSetRef,
      mergedClsPrefixRef,
      mergedThemeRef,
      handleItemCheck,
      renderSourceLabelRef,
      renderTargetLabelRef,
      showSelectedRef
    } = inject(transferInjectionKey);
    const checkedRef = useMemo(() => targetValueSetRef.value.has(props.value));
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
    const {
      disabled,
      mergedTheme,
      mergedClsPrefix,
      label,
      checked,
      source,
      renderSourceLabel,
      renderTargetLabel
    } = this;
    return h("div", {
      class: [`${mergedClsPrefix}-transfer-list-item`, disabled && `${mergedClsPrefix}-transfer-list-item--disabled`, source ? `${mergedClsPrefix}-transfer-list-item--source` : `${mergedClsPrefix}-transfer-list-item--target`],
      onClick: source ? this.handleClick : undefined
    }, h("div", {
      class: `${mergedClsPrefix}-transfer-list-item__background`
    }), source && this.showSelected && h("div", {
      class: `${mergedClsPrefix}-transfer-list-item__checkbox`
    }, h(NCheckbox, {
      theme: mergedTheme.peers.Checkbox,
      themeOverrides: mergedTheme.peerOverrides.Checkbox,
      disabled: disabled,
      checked: checked
    })), h("div", {
      class: `${mergedClsPrefix}-transfer-list-item__label`,
      title: getTitleAttribute(label)
    }, source ? renderSourceLabel ? renderSourceLabel({
      option: this.option
    }) : label : renderTargetLabel ? renderTargetLabel({
      option: this.option
    }) : label), !source && !disabled && h(NBaseClose, {
      focusable: false,
      class: `${mergedClsPrefix}-transfer-list-item__close`,
      clsPrefix: mergedClsPrefix,
      onClick: this.handleClick
    }));
  }
});