import { internalSelectMenuDark } from "../../_internal/select-menu/styles/index.mjs";
import { commonDark } from "../../_styles/common/index.mjs";
import { popoverDark } from "../../popover/styles/index.mjs";
const popselect = {
  name: 'Popselect',
  common: commonDark,
  peers: {
    Popover: popoverDark,
    InternalSelectMenu: internalSelectMenuDark
  }
};
export default popselect;