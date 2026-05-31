import { commonLight } from "../../_styles/common/index.mjs";
function self(vars) {
  return {
    borderRadius: vars.borderRadius
  };
}
const themeLight = {
  name: 'QrCode',
  common: commonLight,
  self
};
export default themeLight;