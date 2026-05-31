import { round } from 'lodash-es';
import { computed, defineComponent, onMounted, ref, watchEffect } from 'vue';
import { useLocale } from "../../_mixins/index.mjs";
import { tween } from "./utils.mjs";
export const numberAnimationProps = {
  to: {
    type: Number,
    default: 0
  },
  precision: {
    type: Number,
    default: 0
  },
  showSeparator: Boolean,
  locale: String,
  from: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  },
  duration: {
    type: Number,
    default: 2000
  },
  onFinish: Function
};
export default defineComponent({
  name: 'NumberAnimation',
  props: numberAnimationProps,
  setup(props) {
    const {
      localeRef
    } = useLocale('name');
    const {
      duration
    } = props;
    const displayedValueRef = ref(props.from);
    const mergedLocaleRef = computed(() => {
      const {
        locale
      } = props;
      if (locale !== undefined) return locale;
      return localeRef.value;
    });
    let animating = false;
    const onUpdate = currentValue => {
      displayedValueRef.value = currentValue;
    };
    const onFinish = () => {
      var _a;
      displayedValueRef.value = props.to;
      animating = false;
      (_a = props.onFinish) === null || _a === void 0 ? void 0 : _a.call(props);
    };
    const animate = (from = props.from, to = props.to) => {
      animating = true;
      displayedValueRef.value = props.from;
      if (from !== to) {
        tween({
          from,
          to,
          duration,
          onUpdate,
          onFinish
        });
      }
    };
    const formattedValueRef = computed(() => {
      var _a;
      const formatted = round(displayedValueRef.value, props.precision).toFixed(props.precision);
      const splitValue = formatted.split('.');
      const numberFormatter = new Intl.NumberFormat(mergedLocaleRef.value);
      const decimalSeparator = (_a = numberFormatter.formatToParts(0.5).find(part => part.type === 'decimal')) === null || _a === void 0 ? void 0 : _a.value;
      const integer = props.showSeparator ? numberFormatter.format(Number(splitValue[0])) : splitValue[0];
      const decimal = splitValue[1];
      return {
        integer,
        decimal,
        decimalSeparator
      };
    });
    function play() {
      if (animating) return;
      animate();
    }
    onMounted(() => {
      watchEffect(() => {
        if (props.active) animate();
      });
    });
    const exposedMethods = {
      play
    };
    return Object.assign({
      formattedValue: formattedValueRef
    }, exposedMethods);
  },
  render() {
    const {
      formattedValue: {
        integer,
        decimal,
        decimalSeparator
      }
    } = this;
    return [integer, decimal ? decimalSeparator : null, decimal];
  }
});