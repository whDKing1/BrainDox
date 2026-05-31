export function createRefSetter(ref) {
  return inst => {
    if (inst) {
      ref.value = inst.$el;
    } else {
      ref.value = null;
    }
  };
}