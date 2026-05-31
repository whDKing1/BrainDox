export * from "./duplicatedLogic.mjs";
export * from "./event.mjs";
export function calculateSize(element, innerOnly) {
  let {
    offsetWidth: width,
    offsetHeight: height
  } = element;
  if (innerOnly) {
    const style = getComputedStyle(element);
    width = width - Number.parseFloat(style.getPropertyValue('padding-left')) - Number.parseFloat(style.getPropertyValue('padding-right'));
    height = height - Number.parseFloat(style.getPropertyValue('padding-top')) - Number.parseFloat(style.getPropertyValue('padding-bottom'));
  }
  return {
    width,
    height
  };
}
export function clampValue(value, min, max) {
  return value < min ? min : value > max ? max : value;
}
export function resolveSpeed(value) {
  if (value === undefined) return 0;
  if (typeof value === 'number') return value;
  const timeRE = /^((\d+)?\.?\d+?)(ms|s)?$/;
  const match = value.match(timeRE);
  if (match) {
    const [, number,, unit = 'ms'] = match;
    return Number(number) * (unit === 'ms' ? 1 : 1000);
  }
  return 0;
}