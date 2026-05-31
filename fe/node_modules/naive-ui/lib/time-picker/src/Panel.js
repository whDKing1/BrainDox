"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const button_1 = require("../../button");
const interface_1 = require("./interface");
const PanelCol_1 = __importDefault(require("./PanelCol"));
const utils_1 = require("./utils");
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
exports.default = (0, vue_1.defineComponent)({
    name: 'TimePickerPanel',
    props: timePickerPanelProps,
    setup(props) {
        const { mergedThemeRef, mergedClsPrefixRef } = (0, vue_1.inject)(interface_1.timePickerInjectionKey);
        const hoursRef = (0, vue_1.computed)(() => {
            const { isHourDisabled, hours, use12Hours, amPmValue } = props;
            if (!use12Hours) {
                return (0, utils_1.getTimeUnits)(utils_1.time.hours, hours).map((hour) => {
                    return {
                        label: hour,
                        value: Number(hour),
                        disabled: isHourDisabled ? isHourDisabled(Number(hour)) : false
                    };
                });
            }
            else {
                const mergedAmPmValue = amPmValue !== null && amPmValue !== void 0 ? amPmValue : (0, utils_1.getAmPm)(Date.now());
                return (0, utils_1.getTimeUnits)(utils_1.time.hours, hours, mergedAmPmValue).map((hour) => {
                    const hourAs12FormattedNumber = Number(hour);
                    const hourAs24FormattedNumber = mergedAmPmValue === 'pm' && hourAs12FormattedNumber !== 12
                        ? hourAs12FormattedNumber + 12
                        : hourAs12FormattedNumber;
                    return {
                        label: hour,
                        value: hourAs24FormattedNumber,
                        disabled: isHourDisabled
                            ? isHourDisabled(hourAs24FormattedNumber)
                            : false
                    };
                });
            }
        });
        const minutesRef = (0, vue_1.computed)(() => {
            const { isMinuteDisabled, minutes } = props;
            return (0, utils_1.getTimeUnits)(utils_1.time.minutes, minutes).map((minute) => {
                return {
                    label: minute,
                    value: Number(minute),
                    disabled: isMinuteDisabled
                        ? isMinuteDisabled(Number(minute), props.hourValue)
                        : false
                };
            });
        });
        const secondsRef = (0, vue_1.computed)(() => {
            const { isSecondDisabled, seconds } = props;
            return (0, utils_1.getTimeUnits)(utils_1.time.seconds, seconds).map((second) => {
                return {
                    label: second,
                    value: Number(second),
                    disabled: isSecondDisabled
                        ? isSecondDisabled(Number(second), props.minuteValue, props.hourValue)
                        : false
                };
            });
        });
        const amPmRef = (0, vue_1.computed)(() => {
            const { isHourDisabled } = props;
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
            return [
                {
                    label: 'AM',
                    value: 'am',
                    disabled: amDisabled
                },
                {
                    label: 'PM',
                    value: 'pm',
                    disabled: pmDisabled
                }
            ];
        });
        return {
            mergedTheme: mergedThemeRef,
            mergedClsPrefix: mergedClsPrefixRef,
            hours: hoursRef,
            minutes: minutesRef,
            seconds: secondsRef,
            amPm: amPmRef,
            hourScrollRef: (0, vue_1.ref)(null),
            minuteScrollRef: (0, vue_1.ref)(null),
            secondScrollRef: (0, vue_1.ref)(null),
            amPmScrollRef: (0, vue_1.ref)(null)
        };
    },
    render() {
        var _a, _b, _c, _d;
        const { mergedClsPrefix, mergedTheme } = this;
        return ((0, vue_1.h)("div", { tabindex: 0, class: `${mergedClsPrefix}-time-picker-panel`, onFocusin: this.onFocusin, onFocusout: this.onFocusout, onKeydown: this.onKeydown },
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-time-picker-cols` },
                this.showHour ? ((0, vue_1.h)("div", { class: [
                        `${mergedClsPrefix}-time-picker-col`,
                        this.isHourInvalid
                            && `${mergedClsPrefix}-time-picker-col--invalid`,
                        this.transitionDisabled
                            && `${mergedClsPrefix}-time-picker-col--transition-disabled`
                    ] },
                    (0, vue_1.h)(_internal_1.NScrollbar, { ref: "hourScrollRef", theme: mergedTheme.peers.Scrollbar, themeOverrides: mergedTheme.peerOverrides.Scrollbar }, {
                        default: () => [
                            (0, vue_1.h)(PanelCol_1.default, { clsPrefix: mergedClsPrefix, data: this.hours, activeValue: this.hourValue, onItemClick: this.onHourClick }),
                            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-time-picker-col__padding` })
                        ]
                    }))) : null,
                this.showMinute ? ((0, vue_1.h)("div", { class: [
                        `${mergedClsPrefix}-time-picker-col`,
                        this.transitionDisabled
                            && `${mergedClsPrefix}-time-picker-col--transition-disabled`,
                        this.isMinuteInvalid
                            && `${mergedClsPrefix}-time-picker-col--invalid`
                    ] },
                    (0, vue_1.h)(_internal_1.NScrollbar, { ref: "minuteScrollRef", theme: mergedTheme.peers.Scrollbar, themeOverrides: mergedTheme.peerOverrides.Scrollbar }, {
                        default: () => [
                            (0, vue_1.h)(PanelCol_1.default, { clsPrefix: mergedClsPrefix, data: this.minutes, activeValue: this.minuteValue, onItemClick: this.onMinuteClick }),
                            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-time-picker-col__padding` })
                        ]
                    }))) : null,
                this.showSecond ? ((0, vue_1.h)("div", { class: [
                        `${mergedClsPrefix}-time-picker-col`,
                        this.isSecondInvalid
                            && `${mergedClsPrefix}-time-picker-col--invalid`,
                        this.transitionDisabled
                            && `${mergedClsPrefix}-time-picker-col--transition-disabled`
                    ] },
                    (0, vue_1.h)(_internal_1.NScrollbar, { ref: "secondScrollRef", theme: mergedTheme.peers.Scrollbar, themeOverrides: mergedTheme.peerOverrides.Scrollbar }, {
                        default: () => [
                            (0, vue_1.h)(PanelCol_1.default, { clsPrefix: mergedClsPrefix, data: this.seconds, activeValue: this.secondValue, onItemClick: this.onSecondClick }),
                            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-time-picker-col__padding` })
                        ]
                    }))) : null,
                this.use12Hours ? ((0, vue_1.h)("div", { class: [
                        `${mergedClsPrefix}-time-picker-col`,
                        this.isAmPmInvalid
                            && `${mergedClsPrefix}-time-picker-col--invalid`,
                        this.transitionDisabled
                            && `${mergedClsPrefix}-time-picker-col--transition-disabled`
                    ] },
                    (0, vue_1.h)(_internal_1.NScrollbar, { ref: "amPmScrollRef", theme: mergedTheme.peers.Scrollbar, themeOverrides: mergedTheme.peerOverrides.Scrollbar }, {
                        default: () => [
                            (0, vue_1.h)(PanelCol_1.default, { clsPrefix: mergedClsPrefix, data: this.amPm, activeValue: this.amPmValue, onItemClick: this.onAmPmClick }),
                            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-time-picker-col__padding` })
                        ]
                    }))) : null),
            ((_a = this.actions) === null || _a === void 0 ? void 0 : _a.length) ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-time-picker-actions` },
                ((_b = this.actions) === null || _b === void 0 ? void 0 : _b.includes('clear')) ? ((0, vue_1.h)(button_1.NButton, { theme: mergedTheme.peers.Button, themeOverrides: mergedTheme.peerOverrides.Button, size: "tiny", onClick: this.onClearClick }, { default: () => this.clearText })) : null,
                ((_c = this.actions) === null || _c === void 0 ? void 0 : _c.includes('now')) ? ((0, vue_1.h)(button_1.NButton, { size: "tiny", theme: mergedTheme.peers.Button, themeOverrides: mergedTheme.peerOverrides.Button, onClick: this.onNowClick }, { default: () => this.nowText })) : null,
                ((_d = this.actions) === null || _d === void 0 ? void 0 : _d.includes('confirm')) ? ((0, vue_1.h)(button_1.NButton, { size: "tiny", type: "primary", class: `${mergedClsPrefix}-time-picker-actions__confirm`, theme: mergedTheme.peers.Button, themeOverrides: mergedTheme.peerOverrides.Button, disabled: this.isValueInvalid, onClick: this.onConfirmClick }, { default: () => this.confirmText })) : null)) : null,
            (0, vue_1.h)(_internal_1.NBaseFocusDetector, { onFocus: this.onFocusDetectorFocus })));
    }
});
