"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../_styles/common");
const rateDark = {
    name: 'Rate',
    common: common_1.commonDark,
    self(vars) {
        const { railColor } = vars;
        return {
            itemColor: railColor,
            itemColorActive: '#CCAA33',
            itemSize: '20px',
            sizeSmall: '16px',
            sizeMedium: '20px',
            sizeLarge: '24px'
        };
    }
};
exports.default = rateDark;
