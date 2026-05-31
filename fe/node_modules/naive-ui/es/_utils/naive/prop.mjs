const smallerSizeMap = {
  tiny: 'mini',
  small: 'tiny',
  medium: 'small',
  large: 'medium',
  huge: 'large'
};
const largerSizeMap = {
  tiny: 'small',
  small: 'medium',
  medium: 'large',
  large: 'huge'
};
export function largerSize(size) {
  const result = largerSizeMap[size];
  if (result === undefined) {
    throw new Error(`${size} has no larger size.`);
  }
  return result;
}
export function smallerSize(size) {
  const result = smallerSizeMap[size];
  if (result === undefined) {
    throw new Error(`${size} has no smaller size.`);
  }
  return result;
}