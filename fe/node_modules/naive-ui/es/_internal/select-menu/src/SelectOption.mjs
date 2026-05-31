import { useMemo } from 'vooks';
import { defineComponent, h, inject, Transition } from 'vue';
import { mergeEventHandlers, render } from "../../../_utils/index.mjs";
import { NBaseIcon } from "../../icon/index.mjs";
import { CheckmarkIcon } from "../../icons/index.mjs";
import { internalSelectionMenuInjectionKey } from "./interface.mjs";
function renderCheckMark(show, clsPrefix) {
  return h(Transition, {
    name: "fade-in-scale-up-transition"
  }, {
    default: () => show ? h(NBaseIcon, {
      clsPrefix: clsPrefix,
      class: `${clsPrefix}-base-select-option__check`
    }, {
      default: () => h(CheckmarkIcon)
    }) : null
  });
}
export default defineComponent({
  name: 'NBaseSelectOption',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    tmNode: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const {
      valueRef,
      pendingTmNodeRef,
      multipleRef,
      valueSetRef,
      renderLabelRef,
      renderOptionRef,
      labelFieldRef,
      valueFieldRef,
      showCheckmarkRef,
      nodePropsRef,
      handleOptionClick,
      handleOptionMouseEnter
    } = inject(internalSelectionMenuInjectionKey);
    const isPendingRef = useMemo(() => {
      const {
        value: pendingTmNode
      } = pendingTmNodeRef;
      if (!pendingTmNode) return false;
      return props.tmNode.key === pendingTmNode.key;
    });
    function handleClick(e) {
      const {
        tmNode
      } = props;
      if (tmNode.disabled) return;
      handleOptionClick(e, tmNode);
    }
    function handleMouseEnter(e) {
      const {
        tmNode
      } = props;
      if (tmNode.disabled) return;
      handleOptionMouseEnter(e, tmNode);
    }
    function handleMouseMove(e) {
      const {
        tmNode
      } = props;
      const {
        value: isPending
      } = isPendingRef;
      if (tmNode.disabled || isPending) return;
      handleOptionMouseEnter(e, tmNode);
    }
    return {
      multiple: multipleRef,
      isGrouped: useMemo(() => {
        const {
          tmNode
        } = props;
        const {
          parent
        } = tmNode;
        return parent && parent.rawNode.type === 'group';
      }),
      showCheckmark: showCheckmarkRef,
      nodeProps: nodePropsRef,
      isPending: isPendingRef,
      isSelected: useMemo(() => {
        const {
          value
        } = valueRef;
        const {
          value: multiple
        } = multipleRef;
        if (value === null) return false;
        const optionValue = props.tmNode.rawNode[valueFieldRef.value];
        if (multiple) {
          const {
            value: valueSet
          } = valueSetRef;
          return valueSet.has(optionValue);
        } else {
          return value === optionValue;
        }
      }),
      labelField: labelFieldRef,
      renderLabel: renderLabelRef,
      renderOption: renderOptionRef,
      handleMouseMove,
      handleMouseEnter,
      handleClick
    };
  },
  render() {
    const {
      clsPrefix,
      tmNode: {
        rawNode
      },
      isSelected,
      isPending,
      isGrouped,
      showCheckmark,
      nodeProps,
      renderOption,
      renderLabel,
      handleClick,
      handleMouseEnter,
      handleMouseMove
    } = this;
    const checkmark = renderCheckMark(isSelected, clsPrefix);
    const children = renderLabel ? [renderLabel(rawNode, isSelected), showCheckmark && checkmark] : [render(rawNode[this.labelField], rawNode, isSelected), showCheckmark && checkmark];
    const attrs = nodeProps === null || nodeProps === void 0 ? void 0 : nodeProps(rawNode);
    const node = h("div", Object.assign({}, attrs, {
      class: [`${clsPrefix}-base-select-option`, rawNode.class, attrs === null || attrs === void 0 ? void 0 : attrs.class, {
        [`${clsPrefix}-base-select-option--disabled`]: rawNode.disabled,
        [`${clsPrefix}-base-select-option--selected`]: isSelected,
        [`${clsPrefix}-base-select-option--grouped`]: isGrouped,
        [`${clsPrefix}-base-select-option--pending`]: isPending,
        [`${clsPrefix}-base-select-option--show-checkmark`]: showCheckmark
      }],
      style: [(attrs === null || attrs === void 0 ? void 0 : attrs.style) || '', rawNode.style || ''],
      onClick: mergeEventHandlers([handleClick, attrs === null || attrs === void 0 ? void 0 : attrs.onClick]),
      onMouseenter: mergeEventHandlers([handleMouseEnter, attrs === null || attrs === void 0 ? void 0 : attrs.onMouseenter]),
      onMousemove: mergeEventHandlers([handleMouseMove, attrs === null || attrs === void 0 ? void 0 : attrs.onMousemove])
    }), h("div", {
      class: `${clsPrefix}-base-select-option__content`
    }, children));
    return rawNode.render ? rawNode.render({
      node,
      option: rawNode,
      selected: isSelected
    }) : renderOption ? renderOption({
      node,
      option: rawNode,
      selected: isSelected
    }) : node;
  }
});