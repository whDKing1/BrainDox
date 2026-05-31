import { commonDark } from "../../_styles/common/index.mjs";
import { self } from "./light.mjs";
const HeatmapDark = {
  name: 'Heatmap',
  common: commonDark,
  self(vars) {
    const lightSelf = self(vars);
    return Object.assign(Object.assign({}, lightSelf), {
      activeColors: ['#0d4429', '#006d32', '#26a641', '#39d353'],
      mininumColor: 'rgba(255, 255, 255, 0.1)',
      loadingColorStart: 'rgba(255, 255, 255, 0.12)',
      loadingColorEnd: 'rgba(255, 255, 255, 0.18)'
    });
  }
};
export default HeatmapDark;