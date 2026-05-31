export function color2Class(color) {
  return color.replace(/#|\(|\)|,|\s|\./g, '_');
}