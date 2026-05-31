export function getSlot(instance, slotName = 'default', fallback = []) {
  const slots = instance.$slots;
  const slot = slots[slotName];
  if (slot === undefined) return fallback;
  return slot();
}