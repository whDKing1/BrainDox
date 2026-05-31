"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("../../_internal/select-menu/styles");
const common_1 = require("../../_styles/common");
const styles_2 = require("../../input/styles");
const listDark = {
    name: 'Mention',
    common: common_1.commonDark,
    peers: {
        InternalSelectMenu: styles_1.internalSelectMenuDark,
        Input: styles_2.inputDark
    },
    self(vars) {
        const { boxShadow2 } = vars;
        return {
            menuBoxShadow: boxShadow2
        };
    }
};
exports.default = listDark;
