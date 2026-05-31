import { internalSelectMenuLight } from "../../_internal/select-menu/styles/index.mjs";
import { createTheme } from "../../_mixins/index.mjs";
import { commonLight } from "../../_styles/common/index.mjs";
import { inputLight } from "../../input/styles/index.mjs";
function self(vars) {
  const {
    boxShadow2
  } = vars;
  return {
    menuBoxShadow: boxShadow2
  };
}
const mentionLight = createTheme({
  name: 'Mention',
  common: commonLight,
  peers: {
    InternalSelectMenu: internalSelectMenuLight,
    Input: inputLight
  },
  self
});
export default mentionLight;