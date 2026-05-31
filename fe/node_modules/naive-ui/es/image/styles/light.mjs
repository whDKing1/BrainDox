import { createTheme } from "../../_mixins/index.mjs";
import { commonLight } from "../../_styles/common/index.mjs";
import { tooltipLight } from "../../tooltip/styles/index.mjs";
function self() {
  return {
    toolbarIconColor: 'rgba(255, 255, 255, .9)',
    toolbarColor: 'rgba(0, 0, 0, .35)',
    toolbarBoxShadow: 'none',
    toolbarBorderRadius: '24px'
  };
}
export const imageLight = createTheme({
  name: 'Image',
  common: commonLight,
  peers: {
    Tooltip: tooltipLight
  },
  self
});