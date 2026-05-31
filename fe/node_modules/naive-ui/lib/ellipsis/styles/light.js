"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _mixins_1 = require("../../_mixins");
const common_1 = require("../../_styles/common");
const styles_1 = require("../../tooltip/styles");
const ellipsisLight = (0, _mixins_1.createTheme)({
    name: 'Ellipsis',
    common: common_1.commonLight,
    peers: {
        Tooltip: styles_1.tooltipLight
    }
});
exports.default = ellipsisLight;
