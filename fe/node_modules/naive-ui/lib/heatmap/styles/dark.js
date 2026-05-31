"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../_styles/common");
const light_1 = require("./light");
const HeatmapDark = {
    name: 'Heatmap',
    common: common_1.commonDark,
    self(vars) {
        const lightSelf = (0, light_1.self)(vars);
        return Object.assign(Object.assign({}, lightSelf), { activeColors: ['#0d4429', '#006d32', '#26a641', '#39d353'], mininumColor: 'rgba(255, 255, 255, 0.1)', loadingColorStart: 'rgba(255, 255, 255, 0.12)', loadingColorEnd: 'rgba(255, 255, 255, 0.18)' });
    }
};
exports.default = HeatmapDark;
