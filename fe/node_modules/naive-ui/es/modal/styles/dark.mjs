import { scrollbarDark } from "../../_internal/scrollbar/styles/index.mjs";
import { commonDark } from "../../_styles/common/index.mjs";
import { cardDark } from "../../card/styles/index.mjs";
import { dialogDark } from "../../dialog/styles/index.mjs";
import { self } from "./light.mjs";
const modalDark = {
  name: 'Modal',
  common: commonDark,
  peers: {
    Scrollbar: scrollbarDark,
    Dialog: dialogDark,
    Card: cardDark
  },
  self
};
export default modalDark;