import { commonLight } from "../../_styles/common/index.mjs";
export function self(vars) {
  const {
    textColor2,
    textColor3,
    fontSize,
    fontWeight
  } = vars;
  return {
    labelFontSize: fontSize,
    labelFontWeight: fontWeight,
    valueFontWeight: fontWeight,
    valueFontSize: '24px',
    labelTextColor: textColor3,
    valuePrefixTextColor: textColor2,
    valueSuffixTextColor: textColor2,
    valueTextColor: textColor2
  };
}
const statisticLight = {
  name: 'Statistic',
  common: commonLight,
  self
};
export default statisticLight;