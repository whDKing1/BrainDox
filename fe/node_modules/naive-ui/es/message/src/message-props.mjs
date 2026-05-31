export const messageProps = {
  icon: Function,
  type: {
    type: String,
    default: 'info'
  },
  content: [String, Number, Function],
  showIcon: {
    type: Boolean,
    default: true
  },
  closable: Boolean,
  keepAliveOnHover: Boolean,
  spinProps: Object,
  onClose: Function,
  onMouseenter: Function,
  onMouseleave: Function
};