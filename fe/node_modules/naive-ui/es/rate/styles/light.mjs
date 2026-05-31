import { commonLight } from "../../_styles/common/index.mjs";
function self(vars) {
  const {
    railColor
  } = vars;
  return {
    itemColor: railColor,
    itemColorActive: '#FFCC33',
    sizeSmall: '16px',
    sizeMedium: '20px',
    sizeLarge: '24px'
  };
}
const themeLight = {
  name: 'Rate',
  common: commonLight,
  self
};
export default themeLight;