"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skeletonDark = void 0;
const common_1 = require("../../_styles/common");
exports.skeletonDark = {
    name: 'Skeleton',
    common: common_1.commonDark,
    self(vars) {
        const { heightSmall, heightMedium, heightLarge, borderRadius } = vars;
        return {
            color: 'rgba(255, 255, 255, 0.12)',
            colorEnd: 'rgba(255, 255, 255, 0.18)',
            borderRadius,
            heightSmall,
            heightMedium,
            heightLarge
        };
    }
};
