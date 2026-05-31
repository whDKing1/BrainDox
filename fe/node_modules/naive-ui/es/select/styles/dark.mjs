import { internalSelectMenuDark } from "../../_internal/select-menu/styles/index.mjs";
import { internalSelectionDark } from "../../_internal/selection/styles/index.mjs";
import { commonDark } from "../../_styles/common/index.mjs";
import { self } from "./light.mjs";
const selectDark = {
  name: 'Select',
  common: commonDark,
  peers: {
    InternalSelection: internalSelectionDark,
    InternalSelectMenu: internalSelectMenuDark
  },
  self
};
export default selectDark;