"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapAutoCompleteOptionsToSelectOptions = mapAutoCompleteOptionsToSelectOptions;
function mapAutoCompleteOptionsToSelectOptions(options) {
    return options.map(convertAutoCompleteOptionToSelectOption);
}
function convertAutoCompleteOptionToSelectOption(option) {
    var _a, _b;
    if (typeof option === 'string') {
        return {
            label: option,
            value: option
        };
    }
    else if (option.type === 'group') {
        const groupOption = {
            type: 'group',
            label: (_a = option.label) !== null && _a !== void 0 ? _a : option.name,
            value: (_b = option.value) !== null && _b !== void 0 ? _b : option.name,
            key: (option.key || option.name),
            children: option.children.map(groupOption => convertAutoCompleteOptionToSelectOption(groupOption))
        };
        return groupOption;
    }
    else {
        return option;
    }
}
