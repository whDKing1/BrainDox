import { useTheme } from "../../_mixins/index.mjs";
import { createInjectionKey } from "../../_utils/index.mjs";
export const imagePreviewSharedProps = Object.assign(Object.assign({}, useTheme.props), {
  onPreviewPrev: Function,
  onPreviewNext: Function,
  showToolbar: {
    type: Boolean,
    default: true
  },
  showToolbarTooltip: Boolean,
  renderToolbar: Function
});
export const imageContextKey = createInjectionKey('n-image');