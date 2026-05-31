export function createDataKey(key) {
  return typeof key === 'string' ? `s-${key}` : `n-${key}`;
}