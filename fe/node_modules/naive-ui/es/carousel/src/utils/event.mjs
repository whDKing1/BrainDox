export function isTouchEvent(e) {
  return window.TouchEvent && e instanceof window.TouchEvent;
}