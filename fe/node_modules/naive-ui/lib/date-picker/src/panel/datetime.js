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
const use_calendar_1 = require("./use-calendar");
/**
 * DateTime Panel
 * Update picker value on:
 * 1. confirm click
 * 2. clear click
 */
exports.default = (0, vue_1.defineComponent)({
    name: 'DateTimePanel',
    props: use_calendar_1.useCalendarProps,
    setup(props) {
        return (0, use_calendar_1.useCalendar)(props, 'datetime');
    },
    render() {
        var _a, _b, _c, _d;
        const { mergedClsPrefix, mergedTheme, shortcuts, timePickerProps, datePickerSlots, onRender } = this;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        return ((0, vue_1.h)("div", { ref: "selfRef", tabindex: 0, class: [
                `${mergedClsPrefix}-date-panel`,
                `${mergedClsPrefix}-date-panel--datetime`,
                !this.panel && `${mergedClsPrefix}-date-panel--shadow`,
                this.themeClass
            ], onKeydown: this.handlePanelKeyDown, onFocus: this.handlePanelFocus },
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-header` },
                (0, vue_1.h)(input_1.NInput, { value: this.dateInputValue, theme: mergedTheme.peers.Input, themeOverrides: mergedTheme.peerOverrides.Input, stateful: false, size: this.timePickerSize, readonly: this.inputReadonly, class: `${mergedClsPrefix}-date-panel-date-input`, textDecoration: this.isDateInvalid ? 'line-through' : '', placeholder: this.locale.selectDate, onBlur: this.handleDateInputBlur, onUpdateValue: this.handleDateInput }),
                (0, vue_1.h)(time_picker_1.NTimePicker, Object.assign({ size: this.timePickerSize, placeholder: this.locale.selectTime, format: this.timePickerFormat }, (Array.isArray(timePickerProps) ? undefined : timePickerProps), { showIcon: false, to: false, theme: mergedTheme.peers.TimePicker, themeOverrides: mergedTheme.peerOverrides.TimePicker, value: Array.isArray(this.value) ? null : this.value, isHourDisabled: this.isHourDisabled, isMinuteDisabled: this.isMinuteDisabled, isSecondDisabled: this.isSecondDisabled, onUpdateValue: this.handleTimePickerChange, stateful: false }))),
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-calendar` },
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-month` },
                    (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-month__fast-prev`, onClick: this.prevYear }, (0, _utils_1.resolveSlot)(datePickerSlots['prev-year'], () => [
                        (0, vue_1.h)(icons_1.FastBackwardIcon, null)
                    ])),
                    (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-month__prev`, onClick: this.prevMonth }, (0, _utils_1.resolveSlot)(datePickerSlots['prev-month'], () => [
                        (0, vue_1.h)(icons_1.BackwardIcon, null)
                    ])),
                    (0, vue_1.h)(panelHeader_1.default, { fastYearSelect: this.fastYearSelect, fastMonthSelect: this.fastMonthSelect, monthYearSeparator: this.calendarHeaderMonthYearSeparator, monthBeforeYear: this.calendarMonthBeforeYear, value: this.calendarValue, onUpdateValue: this.onUpdateCalendarValue, mergedClsPrefix: mergedClsPrefix, calendarMonth: this.calendarMonth, calendarYear: this.calendarYear }),
                    (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-month__next`, onClick: this.nextMonth }, (0, _utils_1.resolveSlot)(datePickerSlots['next-month'], () => [
                        (0, vue_1.h)(icons_1.ForwardIcon, null)
                    ])),
                    (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-month__fast-next`, onClick: this.nextYear }, (0, _utils_1.resolveSlot)(datePickerSlots['next-year'], () => [
                        (0, vue_1.h)(icons_1.FastForwardIcon, null)
                    ]))),
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-weekdays` }, this.weekdays.map(weekday => ((0, vue_1.h)("div", { key: weekday, class: `${mergedClsPrefix}-date-panel-weekdays__day` }, weekday)))),
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-dates` }, this.dateArray.map((dateItem, i) => ((0, vue_1.h)("div", { "data-n-date": true, key: i, class: [
                        `${mergedClsPrefix}-date-panel-date`,
                        {
                            [`${mergedClsPrefix}-date-panel-date--current`]: dateItem.isCurrentDate,
                            [`${mergedClsPrefix}-date-panel-date--selected`]: dateItem.selected,
                            [`${mergedClsPrefix}-date-panel-date--excluded`]: !dateItem.inCurrentMonth,
                            [`${mergedClsPrefix}-date-panel-date--disabled`]: this.mergedIsDateDisabled(dateItem.ts, {
                                type: 'date',
                                year: dateItem.dateObject.year,
                                month: dateItem.dateObject.month,
                                date: dateItem.dateObject.date
                            })
                        }
                    ], onClick: () => {
                        this.handleDateClick(dateItem);
                    } },
                    (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-date__trigger` }),
                    dateItem.dateObject.date,
                    dateItem.isCurrentDate ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-date__sup` })) : null))))),
            this.datePickerSlots.footer ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-footer` }, this.datePickerSlots.footer())) : null,
            ((_a = this.actions) === null || _a === void 0 ? void 0 : _a.length) || shortcuts ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-actions` },
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-actions__prefix` }, shortcuts
                    && Object.keys(shortcuts).map((key) => {
                        const shortcut = shortcuts[key];
                        return Array.isArray(shortcut) ? null : ((0, vue_1.h)(button_1.NxButton, { size: "tiny", onMouseenter: () => {
                                this.handleSingleShortcutMouseenter(shortcut);
                            }, onClick: () => {
                                this.handleSingleShortcutClick(shortcut);
                            }, onMouseleave: () => {
                                this.handleShortcutMouseleave();
                            } }, { default: () => key }));
                    })),
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-actions__suffix` },
                    ((_b = this.actions) === null || _b === void 0 ? void 0 : _b.includes('clear'))
                        ? (0, _utils_1.resolveSlotWithTypedProps)(this.datePickerSlots.clear, {
                            onClear: this.clearSelectedDateTime,
                            text: this.locale.clear
                        }, () => [
                            (0, vue_1.h)(button_1.NButton, { theme: mergedTheme.peers.Button, themeOverrides: mergedTheme.peerOverrides.Button, size: "tiny", onClick: this.clearSelectedDateTime }, { default: () => this.locale.clear })
                        ])
                        : null,
                    ((_c = this.actions) === null || _c === void 0 ? void 0 : _c.includes('now'))
                        ? (0, _utils_1.resolveSlotWithTypedProps)(datePickerSlots.now, {
                            onNow: this.handleNowClick,
                            text: this.locale.now
                        }, () => [
                            (0, vue_1.h)(button_1.NButton, { theme: mergedTheme.peers.Button, themeOverrides: mergedTheme.peerOverrides.Button, size: "tiny", onClick: this.handleNowClick }, { default: () => this.locale.now })
                        ])
                        : null,
                    ((_d = this.actions) === null || _d === void 0 ? void 0 : _d.includes('confirm'))
                        ? (0, _utils_1.resolveSlotWithTypedProps)(datePickerSlots.confirm, {
                            onConfirm: this.handleConfirmClick,
                            disabled: this.isDateInvalid,
                            text: this.locale.confirm
                        }, () => [
                            (0, vue_1.h)(button_1.NButton, { theme: mergedTheme.peers.Button, themeOverrides: mergedTheme.peerOverrides.Button, size: "tiny", type: "primary", disabled: this.isDateInvalid, onClick: this.handleConfirmClick }, { default: () => this.locale.confirm })
                        ])
                        : null))) : null,
            (0, vue_1.h)(_internal_1.NBaseFocusDetector, { onFocus: this.handleFocusDetectorFocus })));
    }
});
