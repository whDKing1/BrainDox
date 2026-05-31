import { commonDark } from "../../_styles/common/index.mjs";
import { avatarDark } from "../../avatar/styles/index.mjs";
import { self } from "./light.mjs";
const avatarGroupDark = {
  name: 'AvatarGroup',
  common: commonDark,
  peers: {
    Avatar: avatarDark
  },
  self
};
export default avatarGroupDark;