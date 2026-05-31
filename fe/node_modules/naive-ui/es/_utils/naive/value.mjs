export function isArrayShallowEqual(array1, array2) {
  if (array1 === null && array2 === null) return true;
  if (array1 === null || array2 === null) return false;
  if (array1.length === array2.length) {
    for (let i = 0; i < array1.length; ++i) {
      if (array1[i] !== array2[i]) {
        return false;
      }
    }
    return true;
  }
  return false;
}