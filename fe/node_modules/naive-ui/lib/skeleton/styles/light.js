"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skeletonLight = void 0;
const common_1 = require("../../_styles/common");
function self(vars) {
    const { heightSmall, heightMedium, heightLarge, borderRadius } = vars;
    return {
        color: '#eee',
        colorEnd: '#ddd',
        borderRadius,
        heightSmall,
        heightMedium,
        heightLarge
    };
}
exports.skeletonLight = {
    name: 'Skeleton',
    common: common_1.commonLight,
    self
};
