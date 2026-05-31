import { useTheme } from "../../_mixins/index.mjs";
export const marqueeProps = Object.assign(Object.assign({}, useTheme.props), {
  autoFill: Boolean,
  speed: {
    type: Number,
    default: 48
  }
});