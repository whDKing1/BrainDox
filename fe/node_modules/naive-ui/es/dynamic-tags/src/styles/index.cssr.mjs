import { cB } from "../../../_utils/cssr/index.mjs";
// vars:
// --input-width
export default cB('dynamic-tags', [cB('input', {
  minWidth: 'var(--n-input-width)'
})]);