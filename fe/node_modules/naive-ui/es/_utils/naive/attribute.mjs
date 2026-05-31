export function getTitleAttribute(value) {
  switch (typeof value) {
    case 'string':
      // The empty string should also be reset to undefined.
      return value || undefined;
    case 'number':
      return String(value);
    default:
      return undefined;
  }
}