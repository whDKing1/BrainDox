"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const common_1 = require("../../_styles/common");
const _common_1 = __importDefault(require("./_common"));
function self(vars) {
    const { fontWeightStrong, baseColor, textColorDisabled, primaryColor, errorColor, textColor1, textColor2 } = vars;
    return Object.assign(Object.assign({}, _common_1.default), { stepHeaderFontWeight: fontWeightStrong, indicatorTextColorProcess: baseColor, indicatorTextColorWait: textColorDisabled, indicatorTextColorFinish: primaryColor, indicatorTextColorError: errorColor, indicatorBorderColorProcess: primaryColor, indicatorBorderColorWait: textColorDisabled, indicatorBorderColorFinish: primaryColor, indicatorBorderColorError: errorColor, indicatorColorProcess: primaryColor, indicatorColorWait: '#0000', indicatorColorFinish: '#0000', indicatorColorError: '#0000', splitorColorProcess: textColorDisabled, splitorColorWait: textColorDisabled, splitorColorFinish: primaryColor, splitorColorError: textColorDisabled, headerTextColorProcess: textColor1, headerTextColorWait: textColorDisabled, headerTextColorFinish: textColorDisabled, headerTextColorError: errorColor, descriptionTextColorProcess: textColor2, descriptionTextColorWait: textColorDisabled, descriptionTextColorFinish: textColorDisabled, descriptionTextColorError: errorColor });
}
const stepsLight = {
    name: 'Steps',
    common: common_1.commonLight,
    self
};
exports.default = stepsLight;
