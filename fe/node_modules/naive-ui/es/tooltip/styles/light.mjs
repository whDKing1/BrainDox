import { composite } from 'seemly';
import { createTheme } from "../../_mixins/use-theme.mjs";
import { commonLight } from "../../_styles/common/index.mjs";
import { popoverLight } from "../../popover/styles/index.mjs";
import commonVars from "./_common.mjs";
function self(vars) {
  const {
    borderRadius,
    boxShadow2,
    baseColor
  } = vars;
  return Object.assign(Object.assign({}, commonVars), {
    borderRadius,
    boxShadow: boxShadow2,
    color: composite(baseColor, 'rgba(0, 0, 0, .85)'),
    textColor: baseColor
  });
}
const tooltipLight = createTheme({
  name: 'Tooltip',
  common: commonLight,
  peers: {
    Popover: popoverLight
  },
  self
});
export default tooltipLight;