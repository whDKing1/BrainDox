"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const _internal_1 = require("../../../_internal");
const icons_1 = require("../../../_internal/icons");
const dropdown_1 = require("../../../dropdown");
const interface_1 = require("../interface");
const allKey = '_n_all__';
const noneKey = '_n_none__';
function createSelectHandler(options, rawPaginatedDataRef, doCheckAll, doUncheckAll) {
    if (!options)
        return () => { };
    return (key) => {
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
    if (!options)
        return [];
    return options.map((option) => {
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
exports.default = (0, vue_1.defineComponent)({
    name: 'DataTableSelectionMenu',
    props: {
        clsPrefix: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const { props: dataTableProps, localeRef, checkOptionsRef, rawPaginatedDataRef, doCheckAll, doUncheckAll } = (0, vue_1.inject)(interface_1.dataTableInjectionKey);
        const handleSelectRef = (0, vue_1.computed)(() => createSelectHandler(checkOptionsRef.value, rawPaginatedDataRef, doCheckAll, doUncheckAll));
        const optionsRef = (0, vue_1.computed)(() => createDropdownOptions(checkOptionsRef.value, localeRef.value));
        return () => {
            var _a, _b, _c, _d;
            const { clsPrefix } = props;
            return ((0, vue_1.h)(dropdown_1.NDropdown, { theme: (_b = (_a = dataTableProps.theme) === null || _a === void 0 ? void 0 : _a.peers) === null || _b === void 0 ? void 0 : _b.Dropdown, themeOverrides: (_d = (_c = dataTableProps.themeOverrides) === null || _c === void 0 ? void 0 : _c.peers) === null || _d === void 0 ? void 0 : _d.Dropdown, options: optionsRef.value, onSelect: handleSelectRef.value }, {
                default: () => ((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: clsPrefix, class: `${clsPrefix}-data-table-check-extra` }, {
                    default: () => (0, vue_1.h)(icons_1.ChevronDownIcon, null)
                }))
            }));
        };
    }
});
