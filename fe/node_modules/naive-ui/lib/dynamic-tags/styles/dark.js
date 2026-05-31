"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../_styles/common");
const styles_1 = require("../../button/styles");
const styles_2 = require("../../input/styles");
const styles_3 = require("../../space/styles");
const styles_4 = require("../../tag/styles");
const dynamicTagsDark = {
    name: 'DynamicTags',
    common: common_1.commonDark,
    peers: {
        Input: styles_2.inputDark,
        Button: styles_1.buttonDark,
        Tag: styles_4.tagDark,
        Space: styles_3.spaceDark
    },
    self() {
        return {
            inputWidth: '64px'
        };
    }
};
exports.default = dynamicTagsDark;
