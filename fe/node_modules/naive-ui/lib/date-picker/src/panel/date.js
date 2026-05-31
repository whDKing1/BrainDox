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
const panelHeader_1 = __importDefault(require("./panelHeader"));
const use_calendar_1 = require("./use-calendar");
/**
 * Date Panel
 * Update picker value on:
 * 1. item click
 * 2. clear click
 */
exports.default = (0, vue_1.defineComponent)({
    name: 'DatePanel',
    props: Object.assign(Object.assign({}, use_calendar_1.useCalendarProps), { type: {
            type: String,
            required: true
        } }),
    setup(props) {
        if (process.env.NODE_ENV !== 'production') {
            (0, vue_1.watchEffect)(() => {
                var _a;
                if ((_a = props.actions) === null || _a === void 0 ? void 0 : _a.includes('confirm')) {
                    (0, _utils_1.warnOnce)('date-picker', 'The `confirm` action is not supported for n-date-picker of `date` type');
                }
            });
        }
        return (0, use_calendar_1.useCalendar)(props, props.type);
    },
    render() {
        var _a, _b, _c;
        const { mergedClsPrefix, mergedTheme, shortcuts, onRender, datePickerSlots, type } = this;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        return ((0, vue_1.h)("div", { ref: "selfRef", tabindex: 0, class: [
                `${mergedClsPrefix}-date-panel`,
                `${mergedClsPrefix}-date-panel--${type}`,
                !this.panel && `${mergedClsPrefix}-date-panel--shadow`,
                this.themeClass
            ], onFocus: this.handlePanelFocus, onKeydown: this.handlePanelKeyDown },
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
                            }),
                            [`${mergedClsPrefix}-date-panel-date--week-hovered`]: this.isWeekHovered(dateItem),
                            [`${mergedClsPrefix}-date-panel-date--week-selected`]: dateItem.inSelectedWeek
                        }
                    ], onClick: () => {
                        this.handleDateClick(dateItem);
                    }, onMouseenter: () => {
                        this.handleDateMouseEnter(dateItem);
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
                        ? (0, _utils_1.resolveSlotWithTypedProps)(this.$slots.clear, {
                            onClear: this.handleClearClick,
                            text: this.locale.clear
                        }, () => [
                            (0, vue_1.h)(button_1.NButton, { theme: mergedTheme.peers.Button, themeOverrides: mergedTheme.peerOverrides.Button, size: "tiny", onClick: this.handleClearClick }, { default: () => this.locale.clear })
                        ])
                        : null,
                    ((_c = this.actions) === null || _c === void 0 ? void 0 : _c.includes('now'))
                        ? (0, _utils_1.resolveSlotWithTypedProps)(this.$slots.now, {
                            onNow: this.handleNowClick,
                            text: this.locale.now
                        }, () => [
                            (0, vue_1.h)(button_1.NButton, { theme: mergedTheme.peers.Button, themeOverrides: mergedTheme.peerOverrides.Button, size: "tiny", onClick: this.handleNowClick }, { default: () => this.locale.now })
                        ])
                        : null))) : null,
            (0, vue_1.h)(_internal_1.NBaseFocusDetector, { onFocus: this.handleFocusDetectorFocus })));
    }
});
