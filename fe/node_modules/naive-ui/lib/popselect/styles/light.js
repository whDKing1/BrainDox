"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const styles_1 = require("../../_internal/select-menu/styles");
const _mixins_1 = require("../../_mixins");
const common_1 = require("../../_styles/common");
const styles_2 = require("../../popover/styles");
function self(vars) {
    const { boxShadow2 } = vars;
    return {
        menuBoxShadow: boxShadow2
    };
}
const popselectLight = (0, _mixins_1.createTheme)({
    name: 'Popselect',
    common: common_1.commonLight,
    peers: {
        Popover: styles_2.popoverLight,
        InternalSelectMenu: styles_1.internalSelectMenuLight
    },
    self
});
exports.default = popselectLight;
