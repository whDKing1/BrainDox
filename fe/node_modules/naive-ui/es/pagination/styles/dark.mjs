import { changeColor } from 'seemly';
import { commonDark } from "../../_styles/common/index.mjs";
import { inputDark } from "../../input/styles/index.mjs";
import { popselectDark } from "../../popselect/styles/index.mjs";
import { selectDark } from "../../select/styles/index.mjs";
import { self } from "./light.mjs";
const paginationDark = {
  name: 'Pagination',
  common: commonDark,
  peers: {
    Select: selectDark,
    Input: inputDark,
    Popselect: popselectDark
  },
  self(vars) {
    const {
      primaryColor,
      opacity3
    } = vars;
    const borderColorActive = changeColor(primaryColor, {
      alpha: Number(opacity3)
    });
    const commonSelf = self(vars);
    commonSelf.itemBorderActive = `1px solid ${borderColorActive}`;
    commonSelf.itemBorderDisabled = '1px solid #0000';
    return commonSelf;
  }
};
export default paginationDark;