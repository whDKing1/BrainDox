"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const _mixins_1 = require("../../_mixins");
const common_1 = require("../../_styles/common");
function self(vars) {
    const { borderRadius, fontSizeMini, fontSizeTiny, fontSizeSmall, fontWeight, textColor2, cardColor, buttonColor2Hover } = vars;
    return {
        activeColors: ['#9be9a8', '#40c463', '#30a14e', '#216e39'],
        borderRadius,
        borderColor: cardColor,
        textColor: textColor2,
        mininumColor: buttonColor2Hover,
        fontWeight,
        loadingColorStart: 'rgba(0, 0, 0, 0.06)',
        loadingColorEnd: 'rgba(0, 0, 0, 0.12)',
        rectSizeSmall: '10px',
        rectSizeMedium: '11px',
        rectSizeLarge: '12px',
        borderRadiusSmall: '2px',
        borderRadiusMedium: '2px',
        borderRadiusLarge: '2px',
        xGapSmall: '2px',
        xGapMedium: '3px',
        xGapLarge: '3px',
        yGapSmall: '2px',
        yGapMedium: '3px',
        yGapLarge: '3px',
        fontSizeSmall: fontSizeTiny,
        fontSizeMedium: fontSizeMini,
        fontSizeLarge: fontSizeSmall
    };
}
const heatmapLight = (0, _mixins_1.createTheme)({
    name: 'Heatmap',
    common: common_1.commonLight,
    self
});
exports.default = heatmapLight;
