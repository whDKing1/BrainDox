import { createTheme } from "../../_mixins/index.mjs";
import { commonLight } from "../../_styles/common/index.mjs";
import { buttonLight } from "../../button/styles/index.mjs";
import { inputLight } from "../../input/styles/index.mjs";
import { spaceLight } from "../../space/styles/index.mjs";
import { tagLight } from "../../tag/styles/index.mjs";
const dynamicTagsLight = createTheme({
  name: 'DynamicTags',
  common: commonLight,
  peers: {
    Input: inputLight,
    Button: buttonLight,
    Tag: tagLight,
    Space: spaceLight
  },
  self() {
    return {
      inputWidth: '64px'
    };
  }
});
export default dynamicTagsLight;