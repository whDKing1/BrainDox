"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _mixins_1 = require("../../_mixins");
const common_1 = require("../../_styles/common");
const styles_1 = require("../../button/styles");
const styles_2 = require("../../input/styles");
const styles_3 = require("../../space/styles");
const styles_4 = require("../../tag/styles");
const dynamicTagsLight = (0, _mixins_1.createTheme)({
    name: 'DynamicTags',
    common: common_1.commonLight,
    peers: {
        Input: styles_2.inputLight,
        Button: styles_1.buttonLight,
        Tag: styles_4.tagLight,
        Space: styles_3.spaceLight
    },
    self() {
        return {
            inputWidth: '64px'
        };
    }
});
exports.default = dynamicTagsLight;
