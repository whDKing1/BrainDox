"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const _internal_1 = require("../../../_internal");
const icons_1 = require("../../../_internal/icons");
const _utils_1 = require("../../../_utils");
const button_1 = require("../../../button");
const input_1 = require("../../../input");
const time_picker_1 = require("../../../time-picker");
const panelHeader_1 = __importDefault(require("./panelHeader"));
const use_dual_calendar_1 = require("./use-dual-calendar");
exports.default = (0, vue_1.defineComponent)({
    name: 'DateTimeRangePanel',
    props: use_dual_calendar_1.useDualCalendarProps,
    setup(props) {
        if (process.env.NODE_ENV !== 'production') {
            (0, vue_1.watchEffect)(() => {
                var _a;
                if ((_a = props.actions) === null || _a === void 0 ? void 0 : _a.includes('now')) {
                    (0, _utils_1.warnOnce)('date-picker', 'The `now` action is not supported for n-date-picker of `datetimerange` type');
                }
            });
        }
        return (0, use_dual_calendar_1.useDualCalendar)(props, 'datetimerange');
    },
    render() {
        var _a, _b, _c;
        const { mergedClsPrefix, mergedTheme, shortcuts, timePickerProps, onRender, datePickerSlots } = this;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        return ((0, vue_1.h)("div", { ref: "selfRef", tabindex: 0, class: [
                `${mergedClsPrefix}-date-panel`,
                `${mergedClsPrefix}-date-panel--datetimerange`,
                !this.panel && `${mergedClsPrefix}-date-panel--shadow`,
                this.themeClass
            ], onKeydown: this.handlePanelKeyDown, onFocus: this.handlePanelFocus },
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-header` },
                (0, vue_1.h)(input_1.NInput, { value: this.startDateDisplayString, theme: mergedTheme.peers.Input, themeOverrides: mergedTheme.peerOverrides.Input, size: this.timePickerSize, stateful: false, readonly: this.inputReadonly, class: `${mergedClsPrefix}-date-panel-date-input`, textDecoration: this.isStartValueInvalid ? 'line-through' : '', placeholder: this.locale.selectDate, onBlur: this.handleStartDateInputBlur, onUpdateValue: this.handleStartDateInput }),
                (0, vue_1.h)(time_picker_1.NTimePicker, Object.assign({ placeholder: this.locale.selectTime, format: this.timePickerFormat, size: this.timePickerSize }, (Array.isArray(timePickerProps)
                    ? timePickerProps[0]
                    : timePickerProps), { value: this.startTimeValue, to: false, showIcon: false, disabled: this.isSelecting, theme: mergedTheme.peers.TimePicker, themeOverrides: mergedTheme.peerOverrides.TimePicker, stateful: false, isHourDisabled: this.isStartHourDisabled, isMinuteDisabled: this.isStartMinuteDisabled, isSecondDisabled: this.isStartSecondDisabled, onUpdateValue: this.handleStartTimePickerChange })),
                (0, vue_1.h)(input_1.NInput, { value: this.endDateInput, theme: mergedTheme.peers.Input, themeOverrides: mergedTheme.peerOverrides.Input, stateful: false, size: this.timePickerSize, readonly: this.inputReadonly, class: `${mergedClsPrefix}-date-panel-date-input`, textDecoration: this.isEndValueInvalid ? 'line-through' : '', placeholder: this.locale.selectDate, onBlur: this.handleEndDateInputBlur, onUpdateValue: this.handleEndDateInput }),
                (0, vue_1.h)(time_picker_1.NTimePicker, Object.assign({ placeholder: this.locale.selectTime, format: this.timePickerFormat, size: this.timePickerSize }, (Array.isArray(timePickerProps)
                    ? timePickerProps[1]
                    : timePickerProps), { disabled: this.isSelecting, showIcon: false, theme: mergedTheme.peers.TimePicker, themeOverrides: mergedTheme.peerOverrides.TimePicker, to: false, stateful: false, value: this.endTimeValue, isHourDisabled: this.isEndHourDisabled, isMinuteDisabled: this.isEndMinuteDisabled, isSecondDisabled: this.isEndSecondDisabled, onUpdateValue: this.handleEndTimePickerChange }))),
            (0, vue_1.h)("div", { ref: "startDatesElRef", class: `${mergedClsPrefix}-date-panel-calendar ${mergedClsPrefix}-date-panel-calendar--start` },
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-month` },
                    (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-month__fast-prev`, onClick: this.startCalendarPrevYear }, (0, _utils_1.resolveSlot)(datePickerSlots['prev-year'], () => [
                        (0, vue_1.h)(icons_1.FastBackwardIcon, null)
                    ])),
                    (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-month__prev`, onClick: this.startCalendarPrevMonth }, (0, _utils_1.resolveSlot)(datePickerSlots['prev-month'], () => [
                        (0, vue_1.h)(icons_1.BackwardIcon, null)
                    ])),
                    (0, vue_1.h)(panelHeader_1.default, { fastYearSelect: this.fastYearSelect, fastMonthSelect: this.fastMonthSelect, monthYearSeparator: this.calendarHeaderMonthYearSeparator, monthBeforeYear: this.calendarMonthBeforeYear, value: this.startCalendarDateTime, onUpdateValue: this.onUpdateStartCalendarValue, mergedClsPrefix: mergedClsPrefix, calendarMonth: this.startCalendarMonth, calendarYear: this.startCalendarYear }),
                    (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-month__next`, onClick: this.startCalendarNextMonth }, (0, _utils_1.resolveSlot)(datePickerSlots['next-month'], () => [
                        (0, vue_1.h)(icons_1.ForwardIcon, null)
                    ])),
                    (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-month__fast-next`, onClick: this.startCalendarNextYear }, (0, _utils_1.resolveSlot)(datePickerSlots['next-year'], () => [
                        (0, vue_1.h)(icons_1.FastForwardIcon, null)
                    ]))),
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-weekdays` }, this.weekdays.map(weekday => ((0, vue_1.h)("div", { key: weekday, class: `${mergedClsPrefix}-date-panel-weekdays__day` }, weekday)))),
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel__divider` }),
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-dates` }, this.startDateArray.map((dateItem, i) => {
                    const disabled = this.mergedIsDateDisabled(dateItem.ts);
                    return ((0, vue_1.h)("div", { "data-n-date": true, key: i, class: [
                            `${mergedClsPrefix}-date-panel-date`,
                            {
                                [`${mergedClsPrefix}-date-panel-date--excluded`]: !dateItem.inCurrentMonth,
                                [`${mergedClsPrefix}-date-panel-date--current`]: dateItem.isCurrentDate,
                                [`${mergedClsPrefix}-date-panel-date--selected`]: dateItem.selected,
                                [`${mergedClsPrefix}-date-panel-date--covered`]: dateItem.inSpan,
                                [`${mergedClsPrefix}-date-panel-date--start`]: dateItem.startOfSpan,
                                [`${mergedClsPrefix}-date-panel-date--end`]: dateItem.endOfSpan,
                                [`${mergedClsPrefix}-date-panel-date--disabled`]: disabled
                            }
                        ], onClick: disabled
                            ? undefined
                            : () => {
                                this.handleDateClick(dateItem);
                            }, onMouseenter: disabled
                            ? undefined
                            : () => {
                                this.handleDateMouseEnter(dateItem);
                            } },
                        (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-date__trigger` }),
                        dateItem.dateObject.date,
                        dateItem.isCurrentDate ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-date__sup` })) : null));
                }))),
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel__vertical-divider` }),
            (0, vue_1.h)("div", { ref: "endDatesElRef", class: `${mergedClsPrefix}-date-panel-calendar ${mergedClsPrefix}-date-panel-calendar--end` },
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-month` },
                    (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-month__fast-prev`, onClick: this.endCalendarPrevYear }, (0, _utils_1.resolveSlot)(datePickerSlots['prev-year'], () => [
                        (0, vue_1.h)(icons_1.FastBackwardIcon, null)
                    ])),
                    (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-month__prev`, onClick: this.endCalendarPrevMonth }, (0, _utils_1.resolveSlot)(datePickerSlots['prev-month'], () => [
                        (0, vue_1.h)(icons_1.BackwardIcon, null)
                    ])),
                    (0, vue_1.h)(panelHeader_1.default, { fastYearSelect: this.fastYearSelect, fastMonthSelect: this.fastMonthSelect, monthBeforeYear: this.calendarMonthBeforeYear, value: this.endCalendarDateTime, onUpdateValue: this.onUpdateEndCalendarValue, mergedClsPrefix: mergedClsPrefix, monthYearSeparator: this.calendarHeaderMonthYearSeparator, calendarMonth: this.endCalendarMonth, calendarYear: this.endCalendarYear }),
                    (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-month__next`, onClick: this.endCalendarNextMonth }, (0, _utils_1.resolveSlot)(datePickerSlots['next-month'], () => [
                        (0, vue_1.h)(icons_1.ForwardIcon, null)
                    ])),
                    (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-month__fast-next`, onClick: this.endCalendarNextYear }, (0, _utils_1.resolveSlot)(datePickerSlots['next-year'], () => [
                        (0, vue_1.h)(icons_1.FastForwardIcon, null)
                    ]))),
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-weekdays` }, this.weekdays.map(weekday => ((0, vue_1.h)("div", { key: weekday, class: `${mergedClsPrefix}-date-panel-weekdays__day` }, weekday)))),
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel__divider` }),
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-dates` }, this.endDateArray.map((dateItem, i) => {
                    const disabled = this.mergedIsDateDisabled(dateItem.ts);
                    return ((0, vue_1.h)("div", { "data-n-date": true, key: i, class: [
                            `${mergedClsPrefix}-date-panel-date`,
                            {
                                [`${mergedClsPrefix}-date-panel-date--excluded`]: !dateItem.inCurrentMonth,
                                [`${mergedClsPrefix}-date-panel-date--current`]: dateItem.isCurrentDate,
                                [`${mergedClsPrefix}-date-panel-date--selected`]: dateItem.selected,
                                [`${mergedClsPrefix}-date-panel-date--covered`]: dateItem.inSpan,
                                [`${mergedClsPrefix}-date-panel-date--start`]: dateItem.startOfSpan,
                                [`${mergedClsPrefix}-date-panel-date--end`]: dateItem.endOfSpan,
                                [`${mergedClsPrefix}-date-panel-date--disabled`]: disabled
                            }
                        ], onClick: disabled
                            ? undefined
                            : () => {
                                this.handleDateClick(dateItem);
                            }, onMouseenter: disabled
                            ? undefined
                            : () => {
                                this.handleDateMouseEnter(dateItem);
                            } },
                        (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-date__trigger` }),
                        dateItem.dateObject.date,
                        dateItem.isCurrentDate ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-date__sup` })) : null));
                }))),
            this.datePickerSlots.footer ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-footer` }, this.datePickerSlots.footer())) : null,
            ((_a = this.actions) === null || _a === void 0 ? void 0 : _a.length) || shortcuts ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-actions` },
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-actions__prefix` }, shortcuts
                    && Object.keys(shortcuts).map((key) => {
                        const shortcut = shortcuts[key];
                        return Array.isArray(shortcut)
                            || typeof shortcut === 'function' ? ((0, vue_1.h)(button_1.NxButton, { size: "tiny", onMouseenter: () => {
                                this.handleRangeShortcutMouseenter(shortcut);
                            }, onClick: () => {
                                this.handleRangeShortcutClick(shortcut);
                            }, onMouseleave: () => {
                                this.handleShortcutMouseleave();
                            } }, { default: () => key })) : null;
                    })),
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-actions__suffix` },
                    ((_b = this.actions) === null || _b === void 0 ? void 0 : _b.includes('clear'))
                        ? (0, _utils_1.resolveSlotWithTypedProps)(datePickerSlots.clear, {
                            onClear: this.handleClearClick,
                            text: this.locale.clear
                        }, () => [
                            (0, vue_1.h)(button_1.NButton, { theme: mergedTheme.peers.Button, themeOverrides: mergedTheme.peerOverrides.Button, size: "tiny", onClick: this.handleClearClick }, { default: () => this.locale.clear })
                        ])
                        : null,
                    ((_c = this.actions) === null || _c === void 0 ? void 0 : _c.includes('confirm'))
                        ? (0, _utils_1.resolveSlotWithTypedProps)(datePickerSlots.confirm, {
                            onConfirm: this.handleConfirmClick,
                            disabled: this.isRangeInvalid || this.isSelecting,
                            text: this.locale.confirm
                        }, () => [
                            (0, vue_1.h)(button_1.NButton, { theme: mergedTheme.peers.Button, themeOverrides: mergedTheme.peerOverrides.Button, size: "tiny", type: "primary", disabled: this.isRangeInvalid || this.isSelecting, onClick: this.handleConfirmClick }, { default: () => this.locale.confirm })
                        ])
                        : null))) : null,
            (0, vue_1.h)(_internal_1.NBaseFocusDetector, { onFocus: this.handleFocusDetectorFocus })));
    }
});
