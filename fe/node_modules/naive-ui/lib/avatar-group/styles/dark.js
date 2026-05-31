"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../_styles/common");
const styles_1 = require("../../avatar/styles");
const light_1 = require("./light");
const avatarGroupDark = {
    name: 'AvatarGroup',
    common: common_1.commonDark,
    peers: {
        Avatar: styles_1.avatarDark
    },
    self: light_1.self
};
exports.default = avatarGroupDark;
