"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const styles_1 = require("../../_internal/select-menu/styles");
const styles_2 = require("../../_internal/selection/styles");
const _mixins_1 = require("../../_mixins");
const common_1 = require("../../_styles/common");
function self(vars) {
    const { boxShadow2 } = vars;
    return {
        menuBoxShadow: boxShadow2
    };
}
const selectLight = (0, _mixins_1.createTheme)({
    name: 'Select',
    common: common_1.commonLight,
    peers: {
        InternalSelection: styles_2.internalSelectionLight,
        InternalSelectMenu: styles_1.internalSelectMenuLight
    },
    self
});
exports.default = selectLight;
