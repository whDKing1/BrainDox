import { createTheme } from "../../_mixins/index.mjs";
import { commonLight } from "../../_styles/common/index.mjs";
import { avatarLight } from "../../avatar/styles/index.mjs";
export function self() {
  return {
    gap: '-12px'
  };
}
const avatarGroupLight = createTheme({
  name: 'AvatarGroup',
  common: commonLight,
  peers: {
    Avatar: avatarLight
  },
  self
});
export default avatarGroupLight;