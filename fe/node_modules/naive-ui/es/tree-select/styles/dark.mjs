import { internalSelectionDark } from "../../_internal/selection/styles/index.mjs";
import { commonDark } from "../../_styles/common/index.mjs";
import { emptyDark } from "../../empty/styles/index.mjs";
import { treeDark } from "../../tree/styles/index.mjs";
const treeSelectDark = {
  name: 'TreeSelect',
  common: commonDark,
  peers: {
    Tree: treeDark,
    Empty: emptyDark,
    InternalSelection: internalSelectionDark
  }
};
export default treeSelectDark;