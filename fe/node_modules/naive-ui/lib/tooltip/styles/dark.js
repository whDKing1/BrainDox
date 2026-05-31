"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../_styles/common");
const styles_1 = require("../../popover/styles");
const _common_1 = __importDefault(require("./_common"));
const tooltipDark = {
    name: 'Tooltip',
    common: common_1.commonDark,
    peers: {
        Popover: styles_1.popoverDark
    },
    self(vars) {
        const { borderRadius, boxShadow2, popoverColor, textColor2 } = vars;
        return Object.assign(Object.assign({}, _common_1.default), { borderRadius, boxShadow: boxShadow2, color: popoverColor, textColor: textColor2 });
    }
};
exports.default = tooltipDark;
