import { commonDark } from "../../_styles/common/index.mjs";
export const skeletonDark = {
  name: 'Skeleton',
  common: commonDark,
  self(vars) {
    const {
      heightSmall,
      heightMedium,
      heightLarge,
      borderRadius
    } = vars;
    return {
      color: 'rgba(255, 255, 255, 0.12)',
      colorEnd: 'rgba(255, 255, 255, 0.18)',
      borderRadius,
      heightSmall,
      heightMedium,
      heightLarge
    };
  }
};