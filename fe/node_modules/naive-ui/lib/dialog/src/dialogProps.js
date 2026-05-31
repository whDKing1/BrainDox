"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dialogPropKeys = exports.dialogProps = void 0;
const _utils_1 = require("../../_utils");
const dialogProps = {
    icon: Function,
    type: {
        type: String,
        default: 'default'
    },
    title: [String, Function],
    closable: {
        type: Boolean,
        default: true
    },
    negativeText: String,
    positiveText: String,
    positiveButtonProps: Object,
    negativeButtonProps: Object,
    content: [String, Function],
    action: Function,
    showIcon: {
        type: Boolean,
        default: true
    },
    loading: Boolean,
    bordered: Boolean,
    iconPlacement: String,
    titleClass: [String, Array],
    titleStyle: [String, Object],
    contentClass: [String, Array],
    contentStyle: [String, Object],
    actionClass: [String, Array],
    actionStyle: [String, Object],
    onPositiveClick: Function,
    onNegativeClick: Function,
    onClose: Function,
    closeFocusable: Boolean
};
exports.dialogProps = dialogProps;
exports.dialogPropKeys = (0, _utils_1.keysOf)(dialogProps);
