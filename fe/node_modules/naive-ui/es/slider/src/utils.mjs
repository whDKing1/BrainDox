import { onBeforeUpdate } from 'vue';
export function isTouchEvent(e) {
  return window.TouchEvent && e instanceof window.TouchEvent;
}
export function useRefs() {
  const refs = new Map();
  const setRefs = index => el => {
    refs.set(index, el);
  };
  onBeforeUpdate(() => {
    refs.clear();
  });
  return [refs, setRefs];
}