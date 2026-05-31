import { scrollbarDark } from "../../_internal/scrollbar/styles/index.mjs";
import { internalSelectMenuDark } from "../../_internal/select-menu/styles/index.mjs";
import { internalSelectionDark } from "../../_internal/selection/styles/index.mjs";
import { commonDark } from "../../_styles/common/index.mjs";
import { checkboxDark } from "../../checkbox/styles/index.mjs";
import { emptyLight } from "../../empty/styles/index.mjs";
import { self } from "./light.mjs";
const cascaderDark = {
  name: 'Cascader',
  common: commonDark,
  peers: {
    InternalSelectMenu: internalSelectMenuDark,
    InternalSelection: internalSelectionDark,
    Scrollbar: scrollbarDark,
    Checkbox: checkboxDark,
    Empty: emptyLight
  },
  self
};
export default cascaderDark;