"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rtlInset = rtlInset;
const seemly_1 = require("seemly");
function rtlInset(inset) {
    const { left, right, top, bottom } = (0, seemly_1.getPadding)(inset);
    return `${top} ${left} ${bottom} ${right}`;
}
