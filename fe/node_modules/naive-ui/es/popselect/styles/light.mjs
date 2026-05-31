import { internalSelectMenuLight } from "../../_internal/select-menu/styles/index.mjs";
import { createTheme } from "../../_mixins/index.mjs";
import { commonLight } from "../../_styles/common/index.mjs";
import { popoverLight } from "../../popover/styles/index.mjs";
export function self(vars) {
  const {
    boxShadow2
  } = vars;
  return {
    menuBoxShadow: boxShadow2
  };
}
const popselectLight = createTheme({
  name: 'Popselect',
  common: commonLight,
  peers: {
    Popover: popoverLight,
    InternalSelectMenu: internalSelectMenuLight
  },
  self
});
export default popselectLight;