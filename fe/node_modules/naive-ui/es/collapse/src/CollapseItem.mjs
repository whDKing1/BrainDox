import { createId, happensIn } from 'seemly';
import { useMemo } from 'vooks';
import { computed, defineComponent, h, inject, toRef } from 'vue';
import { NBaseIcon } from "../../_internal/index.mjs";
import { ChevronLeftIcon as ArrowLeftIcon, ChevronRightIcon as ArrowRightIcon } from "../../_internal/icons/index.mjs";
import { useConfig } from "../../_mixins/index.mjs";
import { useRtl } from "../../_mixins/use-rtl.mjs";
import { resolveSlotWithTypedProps, resolveWrappedSlotWithProps, throwError } from "../../_utils/index.mjs";
import { collapseInjectionKey } from "./Collapse.mjs";
import NCollapseItemContent from "./CollapseItemContent.mjs";
export const collapseItemProps = {
  title: String,
  name: [String, Number],
  disabled: Boolean,
  displayDirective: String
};
export default defineComponent({
  name: 'CollapseItem',
  props: collapseItemProps,
  setup(props) {
    const {
      mergedRtlRef
    } = useConfig(props);
    const randomName = createId();
    const mergedNameRef = useMemo(() => {
      var _a;
      return (_a = props.name) !== null && _a !== void 0 ? _a : randomName;
    });
    const NCollapse = inject(collapseInjectionKey);
    if (!NCollapse) {
      throwError('collapse-item', '`n-collapse-item` must be placed inside `n-collapse`.');
    }
    const {
      expandedNamesRef,
      props: collapseProps,
      mergedClsPrefixRef,
      slots: collapseSlots
    } = NCollapse;
    const collapsedRef = computed(() => {
      const {
        value: expandedNames
      } = expandedNamesRef;
      if (Array.isArray(expandedNames)) {
        const {
          value: name
        } = mergedNameRef;
        return !~expandedNames.findIndex(expandedName => expandedName === name);
      } else if (expandedNames) {
        const {
          value: name
        } = mergedNameRef;
        return name !== expandedNames;
      }
      return true;
    });
    const rtlEnabledRef = useRtl('Collapse', mergedRtlRef, mergedClsPrefixRef);
    return {
      rtlEnabled: rtlEnabledRef,
      collapseSlots,
      randomName,
      mergedClsPrefix: mergedClsPrefixRef,
      collapsed: collapsedRef,
      triggerAreas: toRef(collapseProps, 'triggerAreas'),
      mergedDisplayDirective: computed(() => {
        const {
          displayDirective
        } = props;
        if (displayDirective) {
          return displayDirective;
        } else {
          return collapseProps.displayDirective;
        }
      }),
      arrowPlacement: computed(() => {
        return collapseProps.arrowPlacement;
      }),
      handleClick(e) {
        let happensInArea = 'main';
        if (happensIn(e, 'arrow')) happensInArea = 'arrow';
        if (happensIn(e, 'extra')) happensInArea = 'extra';
        if (!collapseProps.triggerAreas.includes(happensInArea)) {
          return;
        }
        if (NCollapse && !props.disabled) {
          NCollapse.toggleItem(collapsedRef.value, mergedNameRef.value, e);
        }
      }
    };
  },
  render() {
    const {
      collapseSlots,
      $slots,
      arrowPlacement,
      collapsed,
      mergedDisplayDirective,
      mergedClsPrefix,
      disabled,
      triggerAreas
    } = this;
    const headerNode = resolveSlotWithTypedProps($slots.header, {
      collapsed
    }, () => [this.title]);
    const headerExtraSlot = $slots['header-extra'] || collapseSlots['header-extra'];
    const arrowSlot = $slots.arrow || collapseSlots.arrow;
    return h("div", {
      class: [`${mergedClsPrefix}-collapse-item`, `${mergedClsPrefix}-collapse-item--${arrowPlacement}-arrow-placement`, disabled && `${mergedClsPrefix}-collapse-item--disabled`, !collapsed && `${mergedClsPrefix}-collapse-item--active`, triggerAreas.map(area => {
        return `${mergedClsPrefix}-collapse-item--trigger-area-${area}`;
      })]
    }, h("div", {
      class: [`${mergedClsPrefix}-collapse-item__header`, !collapsed && `${mergedClsPrefix}-collapse-item__header--active`]
    }, h("div", {
      class: `${mergedClsPrefix}-collapse-item__header-main`,
      onClick: this.handleClick
    }, arrowPlacement === 'right' && headerNode, h("div", {
      class: `${mergedClsPrefix}-collapse-item-arrow`,
      key: this.rtlEnabled ? 0 : 1,
      "data-arrow": true
    }, resolveSlotWithTypedProps(arrowSlot, {
      collapsed
    }, () => [h(NBaseIcon, {
      clsPrefix: mergedClsPrefix
    }, {
      default: () => this.rtlEnabled ? h(ArrowLeftIcon, null) : h(ArrowRightIcon, null)
    })])), arrowPlacement === 'left' && headerNode), resolveWrappedSlotWithProps(headerExtraSlot, {
      collapsed
    }, children => h("div", {
      class: `${mergedClsPrefix}-collapse-item__header-extra`,
      onClick: this.handleClick,
      "data-extra": true
    }, children))), h(NCollapseItemContent, {
      clsPrefix: mergedClsPrefix,
      displayDirective: mergedDisplayDirective,
      show: !collapsed
    }, $slots));
  }
});