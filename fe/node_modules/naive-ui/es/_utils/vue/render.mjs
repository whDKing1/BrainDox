import { createTextVNode } from 'vue';
export function render(r, ...args) {
  if (typeof r === 'function') {
    return r(...args);
  } else if (typeof r === 'string') {
    return createTextVNode(r);
  } else if (typeof r === 'number') {
    return createTextVNode(String(r));
  } else {
    return null;
  }
}