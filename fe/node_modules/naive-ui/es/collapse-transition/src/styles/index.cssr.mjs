import { fadeInHeightExpandTransition } from "../../../_styles/transitions/fade-in-height-expand.cssr.mjs";
import { cB } from "../../../_utils/cssr/index.mjs";
export default cB('collapse-transition', {
  width: '100%'
}, [fadeInHeightExpandTransition()]);