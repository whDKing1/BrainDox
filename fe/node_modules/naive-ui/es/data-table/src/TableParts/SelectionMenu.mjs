import { computed, defineComponent, h, inject } from 'vue';
import { NBaseIcon } from "../../../_internal/index.mjs";
import { ChevronDownIcon } from "../../../_internal/icons/index.mjs";
import { NDropdown } from "../../../dropdown/index.mjs";
import { dataTableInjectionKey } from "../interface.mjs";
const allKey = '_n_all__';
const noneKey = '_n_none__';
function createSelectHandler(options, rawPaginatedDataRef, doCheckAll, doUncheckAll) {
  if (!options) return () => {};
  return key => {
    for (const option of options) {
      switch (key) {
        case allKey:
          doCheckAll(true);
          return;
        case noneKey:
          doUncheckAll(true);
          return;
        default:
          if (typeof option === 'object' && option.key === key) {
            option.onSelect(rawPaginatedDataRef.value);
            return;
          }
      }
    }
  };
}
function createDropdownOptions(options, localeRef) {
  if (!options) return [];
  return options.map(option => {
    switch (option) {
      case 'all':
        return {
          label: localeRef.checkTableAll,
          key: allKey
        };
      case 'none':
        return {
          label: localeRef.uncheckTableAll,
          key: noneKey
        };
      default:
        return option;
    }
  });
}
export default defineComponent({
  name: 'DataTableSelectionMenu',
  props: {
    clsPrefix: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const {
      props: dataTableProps,
      localeRef,
      checkOptionsRef,
      rawPaginatedDataRef,
      doCheckAll,
      doUncheckAll
    } = inject(dataTableInjectionKey);
    const handleSelectRef = computed(() => createSelectHandler(checkOptionsRef.value, rawPaginatedDataRef, doCheckAll, doUncheckAll));
    const optionsRef = computed(() => createDropdownOptions(checkOptionsRef.value, localeRef.value));
    return () => {
      var _a, _b, _c, _d;
      const {
        clsPrefix
      } = props;
      return h(NDropdown, {
        theme: (_b = (_a = dataTableProps.theme) === null || _a === void 0 ? void 0 : _a.peers) === null || _b === void 0 ? void 0 : _b.Dropdown,
        themeOverrides: (_d = (_c = dataTableProps.themeOverrides) === null || _c === void 0 ? void 0 : _c.peers) === null || _d === void 0 ? void 0 : _d.Dropdown,
        options: optionsRef.value,
        onSelect: handleSelectRef.value
      }, {
        default: () => h(NBaseIcon, {
          clsPrefix: clsPrefix,
          class: `${clsPrefix}-data-table-check-extra`
        }, {
          default: () => h(ChevronDownIcon, null)
        })
      });
    };
  }
});