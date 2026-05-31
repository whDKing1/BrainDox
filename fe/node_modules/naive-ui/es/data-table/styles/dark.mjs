import { scrollbarDark } from "../../_internal/scrollbar/styles/index.mjs";
import { commonDark } from "../../_styles/common/index.mjs";
import { buttonDark } from "../../button/styles/index.mjs";
import { checkboxDark } from "../../checkbox/styles/index.mjs";
import { dropdownDark } from "../../dropdown/styles/index.mjs";
import { ellipsisDark } from "../../ellipsis/styles/index.mjs";
import { emptyDark } from "../../empty/styles/index.mjs";
import { paginationDark } from "../../pagination/styles/index.mjs";
import { popoverDark } from "../../popover/styles/index.mjs";
import { radioDark } from "../../radio/styles/index.mjs";
import { self } from "./light.mjs";
const dataTableDark = {
  name: 'DataTable',
  common: commonDark,
  peers: {
    Button: buttonDark,
    Checkbox: checkboxDark,
    Radio: radioDark,
    Pagination: paginationDark,
    Scrollbar: scrollbarDark,
    Empty: emptyDark,
    Popover: popoverDark,
    Ellipsis: ellipsisDark,
    Dropdown: dropdownDark
  },
  self(vars) {
    const commonSelf = self(vars);
    commonSelf.boxShadowAfter = 'inset 12px 0 8px -12px rgba(0, 0, 0, .36)';
    commonSelf.boxShadowBefore = 'inset -12px 0 8px -12px rgba(0, 0, 0, .36)';
    return commonSelf;
  }
};
export default dataTableDark;