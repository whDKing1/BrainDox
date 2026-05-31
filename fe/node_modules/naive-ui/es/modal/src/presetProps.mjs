import { keysOf } from "../../_utils/index.mjs";
import { cardBaseProps } from "../../card/src/Card.mjs";
import { dialogProps } from "../../dialog/src/dialogProps.mjs";
const presetProps = Object.assign(Object.assign({}, cardBaseProps), dialogProps);
const presetPropsKeys = keysOf(presetProps);
export { presetProps, presetPropsKeys };