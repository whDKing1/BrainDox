import { useMemo } from 'vooks';
import { defineComponent, h, inject, ref, toRef, watch } from 'vue';
import { createInjectionKey, getTitleAttribute, resolveSlot } from "../../_utils/index.mjs";
import { useInjectionCollection, useInjectionElementCollection } from "../../_utils/composable/index.mjs";
export const anchorInjectionKey = createInjectionKey('n-anchor');
export const anchorLinkProps = {
  title: String,
  href: String
};
export default defineComponent({
  name: 'AnchorLink',
  props: anchorLinkProps,
  slots: Object,
  setup(props, {
    slots
  }) {
    const titleRef = ref(null);
    const NAnchor = inject(anchorInjectionKey);
    const hrefRef = toRef(props, 'href');
    const activeRef = useMemo(() => {
      return hrefRef.value && hrefRef.value === NAnchor.activeHref.value;
    });
    useInjectionCollection(anchorInjectionKey, 'collectedLinkHrefs', hrefRef);
    useInjectionElementCollection(anchorInjectionKey, 'titleEls', () => titleRef.value);
    watch(activeRef, value => {
      if (value && titleRef.value) {
        NAnchor.updateBarPosition(titleRef.value);
      }
    });
    function handleClick() {
      if (props.href !== undefined) {
        NAnchor.setActiveHref(props.href);
      }
    }
    return () => {
      var _a;
      const {
        value: mergedClsPrefix
      } = NAnchor.mergedClsPrefix;
      return h("div", {
        class: [`${mergedClsPrefix}-anchor-link`, activeRef.value && `${mergedClsPrefix}-anchor-link--active`]
      }, h("a", {
        ref: titleRef,
        class: [`${mergedClsPrefix}-anchor-link__title`],
        href: props.href,
        title: getTitleAttribute(props.title),
        onClick: handleClick
      }, {
        default: () => resolveSlot(slots.title, () => [props.title])
      }), (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots));
    };
  }
});