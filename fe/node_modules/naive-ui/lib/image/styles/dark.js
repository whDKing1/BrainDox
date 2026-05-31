"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageDark = void 0;
const common_1 = require("../../_styles/common");
const styles_1 = require("../../styles");
exports.imageDark = {
    name: 'Image',
    common: common_1.commonDark,
    peers: {
        Tooltip: styles_1.tooltipDark
    },
    self: (vars) => {
        const { textColor2 } = vars;
        return {
            toolbarIconColor: textColor2,
            toolbarColor: 'rgba(0, 0, 0, .35)',
            toolbarBoxShadow: 'none',
            toolbarBorderRadius: '24px'
        };
    }
};
