export function getOffset(el, scrollTarget) {
  const {
    top: elTop,
    height
  } = el.getBoundingClientRect();
  const scrollTargetTop = scrollTarget instanceof HTMLElement ? scrollTarget.getBoundingClientRect().top : 0;
  return {
    top: elTop - scrollTargetTop,
    height
  };
}