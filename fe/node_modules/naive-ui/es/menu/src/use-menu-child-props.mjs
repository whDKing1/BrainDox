export const useMenuChildProps = {
  internalKey: {
    type: [String, Number],
    required: true
  },
  root: Boolean,
  isGroup: Boolean,
  level: {
    type: Number,
    required: true
  },
  title: [String, Function],
  extra: [String, Function]
};