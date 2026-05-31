"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const vueuc_1 = require("vueuc");
const _internal_1 = require("../../../_internal");
const _mixins_1 = require("../../../_mixins");
const _utils_1 = require("../../../_utils");
const button_1 = require("../../../button");
const config_1 = require("../config");
const utils_1 = require("../utils");
const use_calendar_1 = require("./use-calendar");
/**
 * Month Panel
 * Update picker value on:
 * 1. item click
 * 2. clear click
 */
exports.default = (0, vue_1.defineComponent)({
    name: 'MonthPanel',
    props: Object.assign(Object.assign({}, use_calendar_1.useCalendarProps), { type: {
            type: String,
            required: true
        }, 
        // panelHeader prop
        useAsQuickJump: Boolean }),
    setup(props) {
        const useCalendarRef = (0, use_calendar_1.useCalendar)(props, props.type);
        const { dateLocaleRef } = (0, _mixins_1.useLocale)('DatePicker');
        const getRenderContent = (item) => {
            switch (item.type) {
                case 'year':
                    return (0, utils_1.getYearString)(item.dateObject.year, item.yearFormat, dateLocaleRef.value.locale);
                case 'month':
                    return (0, utils_1.getMonthString)(item.dateObject.month, item.monthFormat, dateLocaleRef.value.locale);
                case 'quarter':
                    return (0, utils_1.getQuarterString)(item.dateObject.quarter, item.quarterFormat, dateLocaleRef.value.locale);
            }
        };
        const { useAsQuickJump } = props;
        const renderItem = (item, i, mergedClsPrefix) => {
            const { mergedIsDateDisabled, handleDateClick, handleQuickMonthClick } = useCalendarRef;
            return ((0, vue_1.h)("div", { "data-n-date": true, key: i, class: [
                    `${mergedClsPrefix}-date-panel-month-calendar__picker-col-item`,
                    item.isCurrent
                        && `${mergedClsPrefix}-date-panel-month-calendar__picker-col-item--current`,
                    item.selected
                        && `${mergedClsPrefix}-date-panel-month-calendar__picker-col-item--selected`,
                    !useAsQuickJump
                        && mergedIsDateDisabled(item.ts, item.type === 'year'
                            ? {
                                type: 'year',
                                year: item.dateObject.year
                            }
                            : item.type === 'month'
                                ? {
                                    type: 'month',
                                    year: item.dateObject.year,
                                    month: item.dateObject.month
                                }
                                : item.type === 'quarter'
                                    ? {
                                        type: 'month',
                                        year: item.dateObject.year,
                                        month: item.dateObject.quarter
                                    }
                                    : null)
                        && `${mergedClsPrefix}-date-panel-month-calendar__picker-col-item--disabled`
                ], onClick: () => {
                    var _a, _b;
                    if (item.type === 'year') {
                        (_a = props.onSelectYear) === null || _a === void 0 ? void 0 : _a.call(props);
                    }
                    else if (item.type === 'month') {
                        (_b = props.onSelectMonth) === null || _b === void 0 ? void 0 : _b.call(props);
                    }
                    if (useAsQuickJump) {
                        handleQuickMonthClick(item, (value) => {
                            ;
                            props.onUpdateValue(value, false);
                        });
                    }
                    else {
                        handleDateClick(item);
                    }
                } }, getRenderContent(item)));
        };
        (0, vue_1.onMounted)(() => {
            useCalendarRef.justifyColumnsScrollState();
        });
        return Object.assign(Object.assign({}, useCalendarRef), { renderItem });
    },
    render() {
        const { mergedClsPrefix, mergedTheme, shortcuts, actions, renderItem, type, onRender } = this;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        return ((0, vue_1.h)("div", { ref: "selfRef", tabindex: 0, class: [
                `${mergedClsPrefix}-date-panel`,
                `${mergedClsPrefix}-date-panel--month`,
                !this.panel && `${mergedClsPrefix}-date-panel--shadow`,
                this.themeClass
            ], onFocus: this.handlePanelFocus, onKeydown: this.handlePanelKeyDown },
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-month-calendar` },
                (0, vue_1.h)(_internal_1.NScrollbar, { ref: "yearScrollbarRef", class: `${mergedClsPrefix}-date-panel-month-calendar__picker-col`, theme: mergedTheme.peers.Scrollbar, themeOverrides: mergedTheme.peerOverrides.Scrollbar, container: this.virtualListContainer, content: this.virtualListContent, horizontalRailStyle: { zIndex: 1 }, verticalRailStyle: { zIndex: 1 } }, {
                    default: () => ((0, vue_1.h)(vueuc_1.VirtualList, { ref: "yearVlRef", items: this.yearArray, itemSize: config_1.MONTH_ITEM_HEIGHT, showScrollbar: false, keyField: "ts", onScroll: this.handleVirtualListScroll, paddingBottom: 4 }, {
                        default: ({ item, index }) => {
                            return renderItem(item, index, mergedClsPrefix);
                        }
                    }))
                }),
                type === 'month' || type === 'quarter' ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-month-calendar__picker-col` },
                    (0, vue_1.h)(_internal_1.NScrollbar, { ref: "monthScrollbarRef", theme: mergedTheme.peers.Scrollbar, themeOverrides: mergedTheme.peerOverrides.Scrollbar }, {
                        default: () => [
                            (type === 'month'
                                ? this.monthArray
                                : this.quarterArray).map((item, i) => renderItem(item, i, mergedClsPrefix)),
                            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-${type}-calendar__padding` })
                        ]
                    }))) : null),
            (0, _utils_1.resolveWrappedSlot)(this.datePickerSlots.footer, (children) => {
                return children ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-footer` }, children)) : null;
            }),
            (actions === null || actions === void 0 ? void 0 : actions.length) || shortcuts ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-actions` },
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
                    (actions === null || actions === void 0 ? void 0 : actions.includes('clear'))
                        ? (0, _utils_1.resolveSlotWithTypedProps)(this.datePickerSlots.clear, {
                            onClear: this.handleClearClick,
                            text: this.locale.clear
                        }, () => [
                            (0, vue_1.h)(button_1.NButton, { theme: mergedTheme.peers.Button, themeOverrides: mergedTheme.peerOverrides.Button, size: "tiny", onClick: this.handleClearClick }, { default: () => this.locale.clear })
                        ])
                        : null,
                    (actions === null || actions === void 0 ? void 0 : actions.includes('now'))
                        ? (0, _utils_1.resolveSlotWithTypedProps)(this.datePickerSlots.now, {
                            onNow: this.handleNowClick,
                            text: this.locale.now
                        }, () => [
                            (0, vue_1.h)(button_1.NButton, { theme: mergedTheme.peers.Button, themeOverrides: mergedTheme.peerOverrides.Button, size: "tiny", onClick: this.handleNowClick }, { default: () => this.locale.now })
                        ])
                        : null,
                    (actions === null || actions === void 0 ? void 0 : actions.includes('confirm'))
                        ? (0, _utils_1.resolveSlotWithTypedProps)(this.datePickerSlots.confirm, {
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
