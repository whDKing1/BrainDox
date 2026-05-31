import { format, formatDistanceStrict, fromUnixTime } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { computed, createTextVNode, defineComponent, h } from 'vue';
import { useLocale } from "../../_mixins/index.mjs";
export const timeProps = {
  time: {
    type: [Number, Date],
    default: undefined // For unix or non unix mode, it should be different default value
  },
  type: {
    type: String,
    default: 'datetime'
  },
  to: {
    type: [Number, Date],
    default: undefined // the same as `time` prop
  },
  unix: Boolean,
  format: String,
  text: Boolean,
  timeZone: String
};
export default defineComponent({
  name: 'Time',
  props: timeProps,
  setup(props) {
    const now = Date.now();
    const {
      localeRef,
      dateLocaleRef
    } = useLocale('Time');
    const mergedFormatRef = computed(() => {
      const {
        timeZone
      } = props;
      if (timeZone) {
        return (time, _format, options) => {
          return formatInTimeZone(time, timeZone, _format, options);
        };
      }
      return format;
    });
    const dateFnsOptionsRef = computed(() => {
      return {
        locale: dateLocaleRef.value.locale
      };
    });
    const mergedTimeRef = computed(() => {
      const {
        time
      } = props;
      if (props.unix) {
        if (time === undefined) return now;
        return fromUnixTime(typeof time === 'number' ? time : time.valueOf());
      }
      return time !== null && time !== void 0 ? time : now;
    });
    const mergedToRef = computed(() => {
      const {
        to
      } = props;
      if (props.unix) {
        if (to === undefined) return now;
        return fromUnixTime(typeof to === 'number' ? to : to.valueOf());
      }
      return to !== null && to !== void 0 ? to : now;
    });
    const renderedTimeRef = computed(() => {
      if (props.format) {
        return mergedFormatRef.value(mergedTimeRef.value, props.format, dateFnsOptionsRef.value);
      } else if (props.type === 'date') {
        return mergedFormatRef.value(mergedTimeRef.value, localeRef.value.dateFormat, dateFnsOptionsRef.value);
      } else if (props.type === 'datetime') {
        return mergedFormatRef.value(mergedTimeRef.value, localeRef.value.dateTimeFormat, dateFnsOptionsRef.value);
      } else {
        return formatDistanceStrict(mergedTimeRef.value, mergedToRef.value, {
          addSuffix: true,
          locale: dateLocaleRef.value.locale
        });
      }
    });
    return {
      renderedTime: renderedTimeRef
    };
  },
  render() {
    return this.text ? createTextVNode(this.renderedTime) : h('time', [this.renderedTime]);
  }
});