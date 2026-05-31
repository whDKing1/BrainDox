import { commonDark } from "../../_styles/common/index.mjs";
import { buttonDark } from "../../button/styles/index.mjs";
import { inputDark } from "../../input/styles/index.mjs";
import { spaceDark } from "../../space/styles/index.mjs";
import { tagDark } from "../../tag/styles/index.mjs";
const dynamicTagsDark = {
  name: 'DynamicTags',
  common: commonDark,
  peers: {
    Input: inputDark,
    Button: buttonDark,
    Tag: tagDark,
    Space: spaceDark
  },
  self() {
    return {
      inputWidth: '64px'
    };
  }
};
export default dynamicTagsDark;