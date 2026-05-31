"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const seemly_1 = require("seemly");
const common_1 = require("../../_styles/common");
const styles_1 = require("../../input/styles");
const styles_2 = require("../../popselect/styles");
const styles_3 = require("../../select/styles");
const light_1 = require("./light");
const paginationDark = {
    name: 'Pagination',
    common: common_1.commonDark,
    peers: {
        Select: styles_3.selectDark,
        Input: styles_1.inputDark,
        Popselect: styles_2.popselectDark
    },
    self(vars) {
        const { primaryColor, opacity3 } = vars;
        const borderColorActive = (0, seemly_1.changeColor)(primaryColor, {
            alpha: Number(opacity3)
        });
        const commonSelf = (0, light_1.self)(vars);
        commonSelf.itemBorderActive = `1px solid ${borderColorActive}`;
        commonSelf.itemBorderDisabled = '1px solid #0000';
        return commonSelf;
    }
};
exports.default = paginationDark;
