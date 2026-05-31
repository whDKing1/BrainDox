import { internalSelectMenuDark } from "../../_internal/select-menu/styles/index.mjs";
import { commonDark } from "../../_styles/common/index.mjs";
import { inputDark } from "../../input/styles/index.mjs";
import { self } from "./light.mjs";
const autoCompleteDark = {
  name: 'AutoComplete',
  common: commonDark,
  peers: {
    InternalSelectMenu: internalSelectMenuDark,
    Input: inputDark
  },
  self
};
export default autoCompleteDark;