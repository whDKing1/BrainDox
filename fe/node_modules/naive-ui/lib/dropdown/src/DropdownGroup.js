"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const _utils_1 = require("../../_utils");
const DropdownDivider_1 = __importDefault(require("./DropdownDivider"));
const DropdownGroupHeader_1 = __importDefault(require("./DropdownGroupHeader"));
const DropdownOption_1 = __importDefault(require("./DropdownOption"));
const utils_1 = require("./utils");
exports.default = (0, vue_1.defineComponent)({
    name: 'NDropdownGroup',
    props: {
        clsPrefix: {
            type: String,
            required: true
        },
        tmNode: {
            type: Object,
            required: true
        },
        parentKey: {
            type: [String, Number],
            default: null
        }
    },
    render() {
        const { tmNode, parentKey, clsPrefix } = this;
        const { children } = tmNode;
        return ((0, vue_1.h)(vue_1.Fragment, null,
            (0, vue_1.h)(DropdownGroupHeader_1.default, { clsPrefix: clsPrefix, tmNode: tmNode, key: tmNode.key }), children === null || children === void 0 ? void 0 :
            children.map((child) => {
                const { rawNode } = child;
                if (rawNode.show === false)
                    return null;
                if ((0, utils_1.isDividerNode)(rawNode)) {
                    return (0, vue_1.h)(DropdownDivider_1.default, {
                        clsPrefix,
                        key: child.key
                    });
                }
                if (child.isGroup) {
                    (0, _utils_1.warn)('dropdown', '`group` node is not allowed to be put in `group` node.');
                    return null;
                }
                return ((0, vue_1.h)(DropdownOption_1.default, { clsPrefix: clsPrefix, tmNode: child, parentKey: parentKey, key: child.key }));
            })));
    }
});
