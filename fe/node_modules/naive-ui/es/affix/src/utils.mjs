export function getScrollTop(target) {
  return target instanceof HTMLElement ? target.scrollTop : window.scrollY;
}
export function getRect(target) {
  return target instanceof HTMLElement ? target.getBoundingClientRect() : {
    top: 0,
    bottom: window.innerHeight
  };
}