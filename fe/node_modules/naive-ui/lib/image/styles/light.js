"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageLight = void 0;
const _mixins_1 = require("../../_mixins");
const common_1 = require("../../_styles/common");
const styles_1 = require("../../tooltip/styles");
function self() {
    return {
        toolbarIconColor: 'rgba(255, 255, 255, .9)',
        toolbarColor: 'rgba(0, 0, 0, .35)',
        toolbarBoxShadow: 'none',
        toolbarBorderRadius: '24px'
    };
}
exports.imageLight = (0, _mixins_1.createTheme)({
    name: 'Image',
    common: common_1.commonLight,
    peers: {
        Tooltip: styles_1.tooltipLight
    },
    self
});
