import { vShow } from 'vue';
export function isNodeVShowFalse(vNode) {
  var _a;
  const showDir = (_a = vNode.dirs) === null || _a === void 0 ? void 0 : _a.find(({
    dir
  }) => dir === vShow);
  return !!(showDir && showDir.value === false);
}