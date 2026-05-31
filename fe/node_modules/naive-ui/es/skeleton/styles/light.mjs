import { commonLight } from "../../_styles/common/index.mjs";
function self(vars) {
  const {
    heightSmall,
    heightMedium,
    heightLarge,
    borderRadius
  } = vars;
  return {
    color: '#eee',
    colorEnd: '#ddd',
    borderRadius,
    heightSmall,
    heightMedium,
    heightLarge
  };
}
export const skeletonLight = {
  name: 'Skeleton',
  common: commonLight,
  self
};