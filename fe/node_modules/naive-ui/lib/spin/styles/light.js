"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.self = self;
const common_1 = require("../../_styles/common");
function self(vars) {
    const { opacityDisabled, heightTiny, heightSmall, heightMedium, heightLarge, heightHuge, primaryColor, fontSize } = vars;
    return {
        fontSize,
        textColor: primaryColor,
        sizeTiny: heightTiny,
        sizeSmall: heightSmall,
        sizeMedium: heightMedium,
        sizeLarge: heightLarge,
        sizeHuge: heightHuge,
        color: primaryColor,
        opacitySpinning: opacityDisabled
    };
}
const spinLight = {
    name: 'Spin',
    common: common_1.commonLight,
    self
};
exports.default = spinLight;
