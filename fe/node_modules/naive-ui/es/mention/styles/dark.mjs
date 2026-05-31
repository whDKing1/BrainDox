import { internalSelectMenuDark } from "../../_internal/select-menu/styles/index.mjs";
import { commonDark } from "../../_styles/common/index.mjs";
import { inputDark } from "../../input/styles/index.mjs";
const listDark = {
  name: 'Mention',
  common: commonDark,
  peers: {
    InternalSelectMenu: internalSelectMenuDark,
    Input: inputDark
  },
  self(vars) {
    const {
      boxShadow2
    } = vars;
    return {
      menuBoxShadow: boxShadow2
    };
  }
};
export default listDark;