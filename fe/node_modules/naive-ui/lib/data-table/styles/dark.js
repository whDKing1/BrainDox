"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("../../_internal/scrollbar/styles");
const common_1 = require("../../_styles/common");
const styles_2 = require("../../button/styles");
const styles_3 = require("../../checkbox/styles");
const styles_4 = require("../../dropdown/styles");
const styles_5 = require("../../ellipsis/styles");
const styles_6 = require("../../empty/styles");
const styles_7 = require("../../pagination/styles");
const styles_8 = require("../../popover/styles");
const styles_9 = require("../../radio/styles");
const light_1 = require("./light");
const dataTableDark = {
    name: 'DataTable',
    common: common_1.commonDark,
    peers: {
        Button: styles_2.buttonDark,
        Checkbox: styles_3.checkboxDark,
        Radio: styles_9.radioDark,
        Pagination: styles_7.paginationDark,
        Scrollbar: styles_1.scrollbarDark,
        Empty: styles_6.emptyDark,
        Popover: styles_8.popoverDark,
        Ellipsis: styles_5.ellipsisDark,
        Dropdown: styles_4.dropdownDark
    },
    self(vars) {
        const commonSelf = (0, light_1.self)(vars);
        commonSelf.boxShadowAfter = 'inset 12px 0 8px -12px rgba(0, 0, 0, .36)';
        commonSelf.boxShadowBefore = 'inset -12px 0 8px -12px rgba(0, 0, 0, .36)';
        return commonSelf;
    }
};
exports.default = dataTableDark;
