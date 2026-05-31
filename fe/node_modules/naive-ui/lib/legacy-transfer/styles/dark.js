"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("../../_internal/scrollbar/styles");
const common_1 = require("../../_styles/common");
const styles_2 = require("../../button/styles");
const styles_3 = require("../../checkbox/styles");
const styles_4 = require("../../empty/styles");
const styles_5 = require("../../input/styles");
const _common_1 = __importDefault(require("./_common"));
const transferDark = {
    name: 'Transfer',
    common: common_1.commonDark,
    peers: {
        Checkbox: styles_3.checkboxDark,
        Scrollbar: styles_1.scrollbarDark,
        Input: styles_5.inputDark,
        Empty: styles_4.emptyDark,
        Button: styles_2.buttonDark
    },
    self(vars) {
        const { iconColorDisabled, iconColor, fontWeight, fontSizeLarge, fontSizeMedium, fontSizeSmall, heightLarge, heightMedium, heightSmall, borderRadius, inputColor, tableHeaderColor, textColor1, textColorDisabled, textColor2, hoverColor } = vars;
        return Object.assign(Object.assign({}, _common_1.default), { itemHeightSmall: heightSmall, itemHeightMedium: heightMedium, itemHeightLarge: heightLarge, fontSizeSmall,
            fontSizeMedium,
            fontSizeLarge,
            borderRadius, borderColor: '#0000', listColor: inputColor, headerColor: tableHeaderColor, titleTextColor: textColor1, titleTextColorDisabled: textColorDisabled, extraTextColor: textColor2, filterDividerColor: '#0000', itemTextColor: textColor2, itemTextColorDisabled: textColorDisabled, itemColorPending: hoverColor, titleFontWeight: fontWeight, iconColor,
            iconColorDisabled });
    }
};
exports.default = transferDark;
