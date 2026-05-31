import { useTheme } from "../../_mixins/index.mjs";
import { useAdjustedTo } from "../../_utils/index.mjs";
export const datePickerProps = Object.assign(Object.assign({}, useTheme.props), {
  to: useAdjustedTo.propTo,
  bordered: {
    type: Boolean,
    default: undefined
  },
  clearable: Boolean,
  fastYearSelect: Boolean,
  fastMonthSelect: Boolean,
  updateValueOnClose: Boolean,
  calendarDayFormat: String,
  calendarHeaderYearFormat: String,
  calendarHeaderMonthFormat: String,
  calendarHeaderMonthYearSeparator: {
    type: String,
    default: ' '
  },
  calendarHeaderMonthBeforeYear: {
    type: Boolean,
    default: undefined
  },
  defaultValue: [Number, Array],
  defaultFormattedValue: [String, Array],
  defaultTime: [Number, String, Array, Function],
  disabled: {
    type: Boolean,
    default: undefined
  },
  placement: {
    type: String,
    default: 'bottom-start'
  },
  value: [Number, Array],
  formattedValue: [String, Array],
  size: String,
  type: {
    type: String,
    default: 'date'
  },
  valueFormat: String,
  separator: String,
  placeholder: String,
  startPlaceholder: String,
  endPlaceholder: String,
  format: String,
  dateFormat: String,
  timePickerFormat: String,
  actions: Array,
  shortcuts: Object,
  isDateDisabled: Function,
  isTimeDisabled: Function,
  show: {
    type: Boolean,
    default: undefined
  },
  panel: Boolean,
  ranges: Object,
  firstDayOfWeek: Number,
  inputReadonly: Boolean,
  closeOnSelect: Boolean,
  status: String,
  timePickerProps: [Object, Array],
  onClear: Function,
  onConfirm: Function,
  defaultCalendarStartTime: Number,
  defaultCalendarEndTime: Number,
  bindCalendarMonths: Boolean,
  monthFormat: {
    type: String,
    default: 'M'
  },
  yearFormat: {
    type: String,
    default: 'y'
  },
  quarterFormat: {
    type: String,
    default: '\'Q\'Q'
  },
  yearRange: {
    type: Array,
    default: () => [1901, 2100]
  },
  'onUpdate:show': [Function, Array],
  onUpdateShow: [Function, Array],
  'onUpdate:formattedValue': [Function, Array],
  onUpdateFormattedValue: [Function, Array],
  'onUpdate:value': [Function, Array],
  onUpdateValue: [Function, Array],
  onFocus: [Function, Array],
  onBlur: [Function, Array],
  onNextMonth: Function,
  onPrevMonth: Function,
  onNextYear: Function,
  onPrevYear: Function,
  // deprecated
  onChange: [Function, Array]
});