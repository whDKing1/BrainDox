"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const _mixins_1 = require("../../_mixins");
const common_1 = require("../../_styles/common");
const styles_1 = require("../../avatar/styles");
function self() {
    return {
        gap: '-12px'
    };
}
const avatarGroupLight = (0, _mixins_1.createTheme)({
    name: 'AvatarGroup',
    common: common_1.commonLight,
    peers: {
        Avatar: styles_1.avatarLight
    },
    self
});
exports.default = avatarGroupLight;
