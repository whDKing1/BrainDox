import { defineComponent, h, inject, ref } from 'vue';
import { render } from "../../_utils/index.mjs";
import { treeInjectionKey } from "./interface.mjs";
export default defineComponent({
  name: 'TreeNodeContent',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    disabled: Boolean,
    checked: Boolean,
    selected: Boolean,
    onClick: Function,
    onDragstart: Function,
    tmNode: {
      type: Object,
      required: true
    },
    nodeProps: Object
  },
  setup(props) {
    const {
      renderLabelRef,
      renderPrefixRef,
      renderSuffixRef,
      labelFieldRef
    } = inject(treeInjectionKey);
    const selfRef = ref(null);
    function doClick(e) {
      const {
        onClick
      } = props;
      if (onClick) onClick(e);
    }
    function handleClick(e) {
      doClick(e);
    }
    return {
      selfRef,
      renderLabel: renderLabelRef,
      renderPrefix: renderPrefixRef,
      renderSuffix: renderSuffixRef,
      labelField: labelFieldRef,
      handleClick
    };
  },
  render() {
    const {
      clsPrefix,
      labelField,
      nodeProps,
      checked = false,
      selected = false,
      renderLabel,
      renderPrefix,
      renderSuffix,
      handleClick,
      onDragstart,
      tmNode: {
        rawNode,
        rawNode: {
          prefix,
          suffix,
          [labelField]: label
        }
      }
    } = this;
    return h("span", Object.assign({}, nodeProps, {
      ref: "selfRef",
      class: [`${clsPrefix}-tree-node-content`, nodeProps === null || nodeProps === void 0 ? void 0 : nodeProps.class],
      onClick: handleClick,
      draggable: onDragstart === undefined ? undefined : true,
      onDragstart: onDragstart
    }), renderPrefix || prefix ? h("div", {
      class: `${clsPrefix}-tree-node-content__prefix`
    }, renderPrefix ? renderPrefix({
      option: rawNode,
      selected,
      checked
    }) : render(prefix)) : null, h("div", {
      class: `${clsPrefix}-tree-node-content__text`
    }, renderLabel ? renderLabel({
      option: rawNode,
      selected,
      checked
    }) : render(label)), renderSuffix || suffix ? h("div", {
      class: `${clsPrefix}-tree-node-content__suffix`
    }, renderSuffix ? renderSuffix({
      option: rawNode,
      selected,
      checked
    }) : render(suffix)) : null);
  }
});