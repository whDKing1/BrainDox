import { computed, defineComponent, h, inject, ref } from 'vue';
import { NBaseFocusDetector, NScrollbar } from "../../_internal/index.mjs";
import { NButton } from "../../button/index.mjs";
import { timePickerInjectionKey } from "./interface.mjs";
import PanelCol from "./PanelCol.mjs";
import { getAmPm, getTimeUnits, time } from "./utils.mjs";
const timePickerPanelProps = {
  actions: {
    type: Array,
    default: () => ['now', 'confirm']
  },
  showHour: {
    type: Boolean,
    default: true
  },
  showMinute: {
    type: Boolean,
    default: true
  },
  showSecond: {
    type: Boolean,
    default: true
  },
  showPeriod: {
    type: Boolean,
    default: true
  },
  isHourInvalid: Boolean,
  isMinuteInvalid: Boolean,
  isSecondInvalid: Boolean,
  isAmPmInvalid: Boolean,
  isValueInvalid: Boolean,
  hourValue: {
    type: Number,
    default: null
  },
  minuteValue: {
    type: Number,
    default: null
  },
  secondValue: {
    type: Number,
    default: null
  },
  amPmValue: {
    type: String,
    default: null
  },
  isHourDisabled: Function,
  isMinuteDisabled: Function,
  isSecondDisabled: Function,
  onHourClick: {
    type: Function,
    required: true
  },
  onMinuteClick: {
    type: Function,
    required: true
  },
  onSecondClick: {
    type: Function,
    required: true
  },
  onAmPmClick: {
    type: Function,
    required: true
  },
  onNowClick: Function,
  clearText: String,
  nowText: String,
  confirmText: String,
  transitionDisabled: Boolean,
  onClearClick: Function,
  onConfirmClick: Function,
  onFocusin: Function,
  onFocusout: Function,
  onFocusDetectorFocus: Function,
  onKeydown: Function,
  hours: [Number, Array],
  minutes: [Number, Array],
  seconds: [Number, Array],
  use12Hours: Boolean
};
export default defineComponent({
  name: 'TimePickerPanel',
  props: timePickerPanelProps,
  setup(props) {
    const {
      mergedThemeRef,
      mergedClsPrefixRef
    } = inject(timePickerInjectionKey);
    const hoursRef = computed(() => {
      const {
        isHourDisabled,
        hours,
        use12Hours,
        amPmValue
      } = props;
      if (!use12Hours) {
        return getTimeUnits(time.hours, hours).map(hour => {
          return {
            label: hour,
            value: Number(hour),
            disabled: isHourDisabled ? isHourDisabled(Number(hour)) : false
          };
        });
      } else {
        const mergedAmPmValue = amPmValue !== null && amPmValue !== void 0 ? amPmValue : getAmPm(Date.now());
        return getTimeUnits(time.hours, hours, mergedAmPmValue).map(hour => {
          const hourAs12FormattedNumber = Number(hour);
          const hourAs24FormattedNumber = mergedAmPmValue === 'pm' && hourAs12FormattedNumber !== 12 ? hourAs12FormattedNumber + 12 : hourAs12FormattedNumber;
          return {
            label: hour,
            value: hourAs24FormattedNumber,
            disabled: isHourDisabled ? isHourDisabled(hourAs24FormattedNumber) : false
          };
        });
      }
    });
    const minutesRef = computed(() => {
      const {
        isMinuteDisabled,
        minutes
      } = props;
      return getTimeUnits(time.minutes, minutes).map(minute => {
        return {
          label: minute,
          value: Number(minute),
          disabled: isMinuteDisabled ? isMinuteDisabled(Number(minute), props.hourValue) : false
        };
      });
    });
    const secondsRef = computed(() => {
      const {
        isSecondDisabled,
        seconds
      } = props;
      return getTimeUnits(time.seconds, seconds).map(second => {
        return {
          label: second,
          value: Number(second),
          disabled: isSecondDisabled ? isSecondDisabled(Number(second), props.minuteValue, props.hourValue) : false
        };
      });
    });
    const amPmRef = computed(() => {
      const {
        isHourDisabled
      } = props;
      let amDisabled = true;
      let pmDisabled = true;
      for (let i = 0; i < 12; ++i) {
        if (!(isHourDisabled === null || isHourDisabled === void 0 ? void 0 : isHourDisabled(i))) {
          amDisabled = false;
          break;
        }
      }
      for (let i = 12; i < 24; ++i) {
        if (!(isHourDisabled === null || isHourDisabled === void 0 ? void 0 : isHourDisabled(i))) {
          pmDisabled = false;
          break;
        }
      }
      return [{
        label: 'AM',
        value: 'am',
        disabled: amDisabled
      }, {
        label: 'PM',
        value: 'pm',
        disabled: pmDisabled
      }];
    });
    return {
      mergedTheme: mergedThemeRef,
      mergedClsPrefix: mergedClsPrefixRef,
      hours: hoursRef,
      minutes: minutesRef,
      seconds: secondsRef,
      amPm: amPmRef,
      hourScrollRef: ref(null),
      minuteScrollRef: ref(null),
      secondScrollRef: ref(null),
      amPmScrollRef: ref(null)
    };
  },
  render() {
    var _a, _b, _c, _d;
    const {
      mergedClsPrefix,
      mergedTheme
    } = this;
    return h("div", {
      tabindex: 0,
      class: `${mergedClsPrefix}-time-picker-panel`,
      onFocusin: this.onFocusin,
      onFocusout: this.onFocusout,
      onKeydown: this.onKeydown
    }, h("div", {
      class: `${mergedClsPrefix}-time-picker-cols`
    }, this.showHour ? h("div", {
      class: [`${mergedClsPrefix}-time-picker-col`, this.isHourInvalid && `${mergedClsPrefix}-time-picker-col--invalid`, this.transitionDisabled && `${mergedClsPrefix}-time-picker-col--transition-disabled`]
    }, h(NScrollbar, {
      ref: "hourScrollRef",
      theme: mergedTheme.peers.Scrollbar,
      themeOverrides: mergedTheme.peerOverrides.Scrollbar
    }, {
      default: () => [h(PanelCol, {
        clsPrefix: mergedClsPrefix,
        data: this.hours,
        activeValue: this.hourValue,
        onItemClick: this.onHourClick
      }), h("div", {
        class: `${mergedClsPrefix}-time-picker-col__padding`
      })]
    })) : null, this.showMinute ? h("div", {
      class: [`${mergedClsPrefix}-time-picker-col`, this.transitionDisabled && `${mergedClsPrefix}-time-picker-col--transition-disabled`, this.isMinuteInvalid && `${mergedClsPrefix}-time-picker-col--invalid`]
    }, h(NScrollbar, {
      ref: "minuteScrollRef",
      theme: mergedTheme.peers.Scrollbar,
      themeOverrides: mergedTheme.peerOverrides.Scrollbar
    }, {
      default: () => [h(PanelCol, {
        clsPrefix: mergedClsPrefix,
        data: this.minutes,
        activeValue: this.minuteValue,
        onItemClick: this.onMinuteClick
      }), h("div", {
        class: `${mergedClsPrefix}-time-picker-col__padding`
      })]
    })) : null, this.showSecond ? h("div", {
      class: [`${mergedClsPrefix}-time-picker-col`, this.isSecondInvalid && `${mergedClsPrefix}-time-picker-col--invalid`, this.transitionDisabled && `${mergedClsPrefix}-time-picker-col--transition-disabled`]
    }, h(NScrollbar, {
      ref: "secondScrollRef",
      theme: mergedTheme.peers.Scrollbar,
      themeOverrides: mergedTheme.peerOverrides.Scrollbar
    }, {
      default: () => [h(PanelCol, {
        clsPrefix: mergedClsPrefix,
        data: this.seconds,
        activeValue: this.secondValue,
        onItemClick: this.onSecondClick
      }), h("div", {
        class: `${mergedClsPrefix}-time-picker-col__padding`
      })]
    })) : null, this.use12Hours ? h("div", {
      class: [`${mergedClsPrefix}-time-picker-col`, this.isAmPmInvalid && `${mergedClsPrefix}-time-picker-col--invalid`, this.transitionDisabled && `${mergedClsPrefix}-time-picker-col--transition-disabled`]
    }, h(NScrollbar, {
      ref: "amPmScrollRef",
      theme: mergedTheme.peers.Scrollbar,
      themeOverrides: mergedTheme.peerOverrides.Scrollbar
    }, {
      default: () => [h(PanelCol, {
        clsPrefix: mergedClsPrefix,
        data: this.amPm,
        activeValue: this.amPmValue,
        onItemClick: this.onAmPmClick
      }), h("div", {
        class: `${mergedClsPrefix}-time-picker-col__padding`
      })]
    })) : null), ((_a = this.actions) === null || _a === void 0 ? void 0 : _a.length) ? h("div", {
      class: `${mergedClsPrefix}-time-picker-actions`
    }, ((_b = this.actions) === null || _b === void 0 ? void 0 : _b.includes('clear')) ? h(NButton, {
      theme: mergedTheme.peers.Button,
      themeOverrides: mergedTheme.peerOverrides.Button,
      size: "tiny",
      onClick: this.onClearClick
    }, {
      default: () => this.clearText
    }) : null, ((_c = this.actions) === null || _c === void 0 ? void 0 : _c.includes('now')) ? h(NButton, {
      size: "tiny",
      theme: mergedTheme.peers.Button,
      themeOverrides: mergedTheme.peerOverrides.Button,
      onClick: this.onNowClick
    }, {
      default: () => this.nowText
    }) : null, ((_d = this.actions) === null || _d === void 0 ? void 0 : _d.includes('confirm')) ? h(NButton, {
      size: "tiny",
      type: "primary",
      class: `${mergedClsPrefix}-time-picker-actions__confirm`,
      theme: mergedTheme.peers.Button,
      themeOverrides: mergedTheme.peerOverrides.Button,
      disabled: this.isValueInvalid,
      onClick: this.onConfirmClick
    }, {
      default: () => this.confirmText
    }) : null) : null, h(NBaseFocusDetector, {
      onFocus: this.onFocusDetectorFocus
    }));
  }
});