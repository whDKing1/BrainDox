import { commonLight } from "../../../_styles/common/index.mjs";
import { commonVars } from "./common.mjs";
export function self(vars) {
  const {
    scrollbarColor,
    scrollbarColorHover,
    scrollbarHeight,
    scrollbarWidth,
    scrollbarBorderRadius
  } = vars;
  return Object.assign(Object.assign({}, commonVars), {
    height: scrollbarHeight,
    width: scrollbarWidth,
    borderRadius: scrollbarBorderRadius,
    color: scrollbarColor,
    colorHover: scrollbarColorHover
  });
}
const scrollbarLight = {
  name: 'Scrollbar',
  common: commonLight,
  self
};
export default scrollbarLight;