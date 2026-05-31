import { defineComponent, h, inject } from 'vue';
import { NCheckbox } from "../../checkbox/index.mjs";
import { treeInjectionKey } from "./interface.mjs";
export default defineComponent({
  name: 'NTreeNodeCheckbox',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    indent: {
      type: Number,
      required: true
    },
    right: Boolean,
    focusable: Boolean,
    disabled: Boolean,
    checked: Boolean,
    indeterminate: Boolean,
    onCheck: Function
  },
  setup(props) {
    const NTree = inject(treeInjectionKey);
    function doCheck(value) {
      const {
        onCheck
      } = props;
      if (onCheck) {
        onCheck(value);
      }
    }
    function handleUpdateValue(value) {
      doCheck(value);
    }
    return {
      handleUpdateValue,
      mergedTheme: NTree.mergedThemeRef
    };
  },
  render() {
    const {
      clsPrefix,
      mergedTheme,
      checked,
      indeterminate,
      disabled,
      focusable,
      indent,
      handleUpdateValue
    } = this;
    return h("span", {
      class: [`${clsPrefix}-tree-node-checkbox`, this.right && `${clsPrefix}-tree-node-checkbox--right`],
      style: {
        width: `${indent}px`
      },
      "data-checkbox": true
    }, h(NCheckbox, {
      focusable: focusable,
      disabled: disabled,
      theme: mergedTheme.peers.Checkbox,
      themeOverrides: mergedTheme.peerOverrides.Checkbox,
      checked: checked,
      indeterminate: indeterminate,
      onUpdateChecked: handleUpdateValue
    }));
  }
});