import { computed, defineComponent, h, inject } from 'vue';
import { NBaseIcon } from "../../../_internal/index.mjs";
import { ArrowDownIcon } from "../../../_internal/icons/index.mjs";
import { useConfig } from "../../../_mixins/index.mjs";
import { dataTableInjectionKey } from "../interface.mjs";
import RenderSorter from "./RenderSorter.mjs";
export default defineComponent({
  name: 'SortIcon',
  props: {
    column: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const {
      mergedComponentPropsRef
    } = useConfig();
    const {
      mergedSortStateRef,
      mergedClsPrefixRef
    } = inject(dataTableInjectionKey);
    const sortStateRef = computed(() => mergedSortStateRef.value.find(state => state.columnKey === props.column.key));
    const activeRef = computed(() => {
      return sortStateRef.value !== undefined;
    });
    const mergedSortOrderRef = computed(() => {
      const {
        value: sortState
      } = sortStateRef;
      if (sortState && activeRef.value) {
        return sortState.order;
      }
      return false;
    });
    const mergedRenderSorterRef = computed(() => {
      var _a, _b;
      return ((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.DataTable) === null || _b === void 0 ? void 0 : _b.renderSorter) || props.column.renderSorter;
    });
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      active: activeRef,
      mergedSortOrder: mergedSortOrderRef,
      mergedRenderSorter: mergedRenderSorterRef
    };
  },
  render() {
    const {
      mergedRenderSorter,
      mergedSortOrder,
      mergedClsPrefix
    } = this;
    const {
      renderSorterIcon
    } = this.column;
    return mergedRenderSorter ? h(RenderSorter, {
      render: mergedRenderSorter,
      order: mergedSortOrder
    }) : h("span", {
      class: [`${mergedClsPrefix}-data-table-sorter`, mergedSortOrder === 'ascend' && `${mergedClsPrefix}-data-table-sorter--asc`, mergedSortOrder === 'descend' && `${mergedClsPrefix}-data-table-sorter--desc`]
    }, renderSorterIcon ? renderSorterIcon({
      order: mergedSortOrder
    }) : h(NBaseIcon, {
      clsPrefix: mergedClsPrefix
    }, {
      default: () => h(ArrowDownIcon, null)
    }));
  }
});