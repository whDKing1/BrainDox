import { commonLight } from "../../_styles/common/index.mjs";
export function self() {
  return {
    dotSize: '8px',
    dotColor: 'rgba(255, 255, 255, .3)',
    dotColorActive: 'rgba(255, 255, 255, 1)',
    dotColorFocus: 'rgba(255, 255, 255, .5)',
    dotLineWidth: '16px',
    dotLineWidthActive: '24px',
    arrowColor: '#eee'
  };
}
const carouselLight = {
  name: 'Carousel',
  common: commonLight,
  self
};
export default carouselLight;