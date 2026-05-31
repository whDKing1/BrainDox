import { internalSelectMenuLight } from "../../_internal/select-menu/styles/index.mjs";
import { internalSelectionLight } from "../../_internal/selection/styles/index.mjs";
import { createTheme } from "../../_mixins/index.mjs";
import { commonLight } from "../../_styles/common/index.mjs";
export function self(vars) {
  const {
    boxShadow2
  } = vars;
  return {
    menuBoxShadow: boxShadow2
  };
}
const selectLight = createTheme({
  name: 'Select',
  common: commonLight,
  peers: {
    InternalSelection: internalSelectionLight,
    InternalSelectMenu: internalSelectMenuLight
  },
  self
});
export default selectLight;