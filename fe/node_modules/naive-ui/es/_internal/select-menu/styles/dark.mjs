import { commonDark } from "../../../_styles/common/index.mjs";
import { emptyDark } from "../../../empty/styles/index.mjs";
import { scrollbarDark } from "../../scrollbar/styles/index.mjs";
import { self } from "./light.mjs";
const internalSelectMenuDark = {
  name: 'InternalSelectMenu',
  common: commonDark,
  peers: {
    Scrollbar: scrollbarDark,
    Empty: emptyDark
  },
  self
};
export default internalSelectMenuDark;