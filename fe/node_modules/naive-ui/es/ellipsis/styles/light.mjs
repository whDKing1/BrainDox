import { createTheme } from "../../_mixins/index.mjs";
import { commonLight } from "../../_styles/common/index.mjs";
import { tooltipLight } from "../../tooltip/styles/index.mjs";
const ellipsisLight = createTheme({
  name: 'Ellipsis',
  common: commonLight,
  peers: {
    Tooltip: tooltipLight
  }
});
export default ellipsisLight;