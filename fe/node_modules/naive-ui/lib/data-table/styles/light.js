"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const seemly_1 = require("seemly");
const styles_1 = require("../../_internal/scrollbar/styles");
const _mixins_1 = require("../../_mixins");
const common_1 = require("../../_styles/common");
const styles_2 = require("../../button/styles");
const styles_3 = require("../../checkbox/styles");
const styles_4 = require("../../dropdown/styles");
const styles_5 = require("../../ellipsis/styles");
const styles_6 = require("../../empty/styles");
const styles_7 = require("../../pagination/styles");
const styles_8 = require("../../popover/styles");
const styles_9 = require("../../radio/styles");
const _common_1 = __importDefault(require("./_common"));
function self(vars) {
    const { cardColor, modalColor, popoverColor, textColor2, textColor1, tableHeaderColor, tableColorHover, iconColor, primaryColor, fontWeightStrong, borderRadius, lineHeight, fontSizeSmall, fontSizeMedium, fontSizeLarge, dividerColor, heightSmall, opacityDisabled, tableColorStriped } = vars;
    return Object.assign(Object.assign({}, _common_1.default), { actionDividerColor: dividerColor, lineHeight,
        borderRadius,
        fontSizeSmall,
        fontSizeMedium,
        fontSizeLarge, borderColor: (0, seemly_1.composite)(cardColor, dividerColor), tdColorHover: (0, seemly_1.composite)(cardColor, tableColorHover), tdColorSorting: (0, seemly_1.composite)(cardColor, tableColorHover), tdColorStriped: (0, seemly_1.composite)(cardColor, tableColorStriped), thColor: (0, seemly_1.composite)(cardColor, tableHeaderColor), thColorHover: (0, seemly_1.composite)((0, seemly_1.composite)(cardColor, tableHeaderColor), tableColorHover), thColorSorting: (0, seemly_1.composite)((0, seemly_1.composite)(cardColor, tableHeaderColor), tableColorHover), tdColor: cardColor, tdTextColor: textColor2, thTextColor: textColor1, thFontWeight: fontWeightStrong, thButtonColorHover: tableColorHover, thIconColor: iconColor, thIconColorActive: primaryColor, 
        // modal
        borderColorModal: (0, seemly_1.composite)(modalColor, dividerColor), tdColorHoverModal: (0, seemly_1.composite)(modalColor, tableColorHover), tdColorSortingModal: (0, seemly_1.composite)(modalColor, tableColorHover), tdColorStripedModal: (0, seemly_1.composite)(modalColor, tableColorStriped), thColorModal: (0, seemly_1.composite)(modalColor, tableHeaderColor), thColorHoverModal: (0, seemly_1.composite)((0, seemly_1.composite)(modalColor, tableHeaderColor), tableColorHover), thColorSortingModal: (0, seemly_1.composite)((0, seemly_1.composite)(modalColor, tableHeaderColor), tableColorHover), tdColorModal: modalColor, 
        // popover
        borderColorPopover: (0, seemly_1.composite)(popoverColor, dividerColor), tdColorHoverPopover: (0, seemly_1.composite)(popoverColor, tableColorHover), tdColorSortingPopover: (0, seemly_1.composite)(popoverColor, tableColorHover), tdColorStripedPopover: (0, seemly_1.composite)(popoverColor, tableColorStriped), thColorPopover: (0, seemly_1.composite)(popoverColor, tableHeaderColor), thColorHoverPopover: (0, seemly_1.composite)((0, seemly_1.composite)(popoverColor, tableHeaderColor), tableColorHover), thColorSortingPopover: (0, seemly_1.composite)((0, seemly_1.composite)(popoverColor, tableHeaderColor), tableColorHover), tdColorPopover: popoverColor, boxShadowBefore: 'inset -12px 0 8px -12px rgba(0, 0, 0, .18)', boxShadowAfter: 'inset 12px 0 8px -12px rgba(0, 0, 0, .18)', 
        // loading
        loadingColor: primaryColor, loadingSize: heightSmall, opacityLoading: opacityDisabled });
}
const dataTableLight = (0, _mixins_1.createTheme)({
    name: 'DataTable',
    common: common_1.commonLight,
    peers: {
        Button: styles_2.buttonLight,
        Checkbox: styles_3.checkboxLight,
        Radio: styles_9.radioLight,
        Pagination: styles_7.paginationLight,
        Scrollbar: styles_1.scrollbarLight,
        Empty: styles_6.emptyLight,
        Popover: styles_8.popoverLight,
        Ellipsis: styles_5.ellipsisLight,
        Dropdown: styles_4.dropdownLight
    },
    self
});
exports.default = dataTableLight;
