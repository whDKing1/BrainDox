import { addMonths, format, getMonth, getYear, startOfDay, startOfMonth } from 'date-fns';
import { useMergedState } from 'vooks';
import { computed, defineComponent, Fragment, h, ref, toRef } from 'vue';
import { NBaseIcon } from "../../_internal/index.mjs";
import { ChevronLeftIcon, ChevronRightIcon } from "../../_internal/icons/index.mjs";
import { useConfig, useLocale, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { call, resolveSlotWithTypedProps } from "../../_utils/index.mjs";
import { NButton } from "../../button/index.mjs";
import { NButtonGroup } from "../../button-group/index.mjs";
import { dateArray } from "../../date-picker/src/utils.mjs";
import { calendarLight } from "../styles/index.mjs";
import style from "./styles/index.cssr.mjs";
export const calendarProps = Object.assign(Object.assign({}, useTheme.props), {
  isDateDisabled: Function,
  value: Number,
  defaultValue: {
    type: Number,
    default: null
  },
  onPanelChange: Function,
  'onUpdate:value': [Function, Array],
  onUpdateValue: [Function, Array]
});
export default defineComponent({
  name: 'Calendar',
  props: calendarProps,
  slots: Object,
  setup(props) {
    var _a;
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled
    } = useConfig(props);
    const themeRef = useTheme('Calendar', '-calendar', style, calendarLight, props, mergedClsPrefixRef);
    const {
      localeRef,
      dateLocaleRef
    } = useLocale('DatePicker');
    const now = Date.now();
    // ts => timestamp
    const monthTsRef = ref(startOfMonth((_a = props.defaultValue) !== null && _a !== void 0 ? _a : now).valueOf());
    const uncontrolledValueRef = ref(props.defaultValue || null);
    const mergedValueRef = useMergedState(toRef(props, 'value'), uncontrolledValueRef);
    function doUpdateValue(value, time) {
      const {
        onUpdateValue,
        'onUpdate:value': _onUpdateValue
      } = props;
      if (onUpdateValue) {
        call(onUpdateValue, value, time);
      }
      if (_onUpdateValue) {
        call(_onUpdateValue, value, time);
      }
      uncontrolledValueRef.value = value;
    }
    function handlePrevClick() {
      var _a;
      const monthTs = addMonths(monthTsRef.value, -1).valueOf();
      monthTsRef.value = monthTs;
      (_a = props.onPanelChange) === null || _a === void 0 ? void 0 : _a.call(props, {
        year: getYear(monthTs),
        month: getMonth(monthTs) + 1
      });
    }
    function handleNextClick() {
      var _a;
      const monthTs = addMonths(monthTsRef.value, 1).valueOf();
      monthTsRef.value = monthTs;
      (_a = props.onPanelChange) === null || _a === void 0 ? void 0 : _a.call(props, {
        year: getYear(monthTs),
        month: getMonth(monthTs) + 1
      });
    }
    function handleTodayClick() {
      var _a;
      const {
        value: monthTs
      } = monthTsRef;
      const oldYear = getYear(monthTs);
      const oldMonth = getMonth(monthTs);
      const newMonthTs = startOfMonth(now).valueOf();
      monthTsRef.value = newMonthTs;
      const newYear = getYear(newMonthTs);
      const newMonth = getMonth(newMonthTs);
      if (oldYear !== newYear || oldMonth !== newMonth) {
        (_a = props.onPanelChange) === null || _a === void 0 ? void 0 : _a.call(props, {
          year: newYear,
          month: newMonth + 1
        });
      }
    }
    const cssVarsRef = computed(() => {
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: {
          borderColor,
          borderColorModal,
          borderColorPopover,
          borderRadius,
          titleFontSize,
          textColor,
          titleFontWeight,
          titleTextColor,
          dayTextColor,
          fontSize,
          lineHeight,
          dateColorCurrent,
          dateTextColorCurrent,
          cellColorHover,
          cellColor,
          cellColorModal,
          barColor,
          cellColorPopover,
          cellColorHoverModal,
          cellColorHoverPopover
        }
      } = themeRef.value;
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-border-color': borderColor,
        '--n-border-color-modal': borderColorModal,
        '--n-border-color-popover': borderColorPopover,
        '--n-border-radius': borderRadius,
        '--n-text-color': textColor,
        '--n-title-font-weight': titleFontWeight,
        '--n-title-font-size': titleFontSize,
        '--n-title-text-color': titleTextColor,
        '--n-day-text-color': dayTextColor,
        '--n-font-size': fontSize,
        '--n-line-height': lineHeight,
        '--n-date-color-current': dateColorCurrent,
        '--n-date-text-color-current': dateTextColorCurrent,
        '--n-cell-color': cellColor,
        '--n-cell-color-modal': cellColorModal,
        '--n-cell-color-popover': cellColorPopover,
        '--n-cell-color-hover': cellColorHover,
        '--n-cell-color-hover-modal': cellColorHoverModal,
        '--n-cell-color-hover-popover': cellColorHoverPopover,
        '--n-bar-color': barColor
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('calendar', undefined, cssVarsRef, props) : undefined;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      locale: localeRef,
      dateLocale: dateLocaleRef,
      now,
      mergedValue: mergedValueRef,
      monthTs: monthTsRef,
      dateItems: computed(() => {
        return dateArray(monthTsRef.value, mergedValueRef.value, now, localeRef.value.firstDayOfWeek, true);
      }),
      doUpdateValue,
      handleTodayClick,
      handlePrevClick,
      handleNextClick,
      mergedTheme: themeRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    const {
      isDateDisabled,
      mergedClsPrefix,
      monthTs,
      cssVars,
      mergedValue,
      mergedTheme,
      $slots,
      locale: {
        monthBeforeYear,
        today
      },
      dateLocale: {
        locale
      },
      handleTodayClick,
      handlePrevClick,
      handleNextClick,
      onRender
    } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    const normalizedValue = mergedValue && startOfDay(mergedValue).valueOf();
    const year = getYear(monthTs);
    const calendarMonth = getMonth(monthTs) + 1;
    return h("div", {
      class: [`${mergedClsPrefix}-calendar`, this.themeClass],
      style: cssVars
    }, h("div", {
      class: `${mergedClsPrefix}-calendar-header`
    }, h("div", {
      class: `${mergedClsPrefix}-calendar-header__title`
    }, resolveSlotWithTypedProps($slots.header, {
      year,
      month: calendarMonth
    }, () => {
      const localeMonth = format(monthTs, 'MMMM', {
        locale
      });
      return [monthBeforeYear ? `${localeMonth} ${year}` : `${year} ${localeMonth}`];
    })), h("div", {
      class: `${mergedClsPrefix}-calendar-header__extra`
    }, h(NButtonGroup, null, {
      default: () => h(Fragment, null, h(NButton, {
        size: "small",
        onClick: handlePrevClick,
        theme: mergedTheme.peers.Button,
        themeOverrides: mergedTheme.peerOverrides.Button
      }, {
        icon: () => h(NBaseIcon, {
          clsPrefix: mergedClsPrefix,
          class: `${mergedClsPrefix}-calendar-prev-btn`
        }, {
          default: () => h(ChevronLeftIcon, null)
        })
      }), h(NButton, {
        size: "small",
        onClick: handleTodayClick,
        theme: mergedTheme.peers.Button,
        themeOverrides: mergedTheme.peerOverrides.Button
      }, {
        default: () => today
      }), h(NButton, {
        size: "small",
        onClick: handleNextClick,
        theme: mergedTheme.peers.Button,
        themeOverrides: mergedTheme.peerOverrides.Button
      }, {
        icon: () => h(NBaseIcon, {
          clsPrefix: mergedClsPrefix,
          class: `${mergedClsPrefix}-calendar-next-btn`
        }, {
          default: () => h(ChevronRightIcon, null)
        })
      }))
    }))), h("div", {
      class: `${mergedClsPrefix}-calendar-dates`
    }, this.dateItems.map(({
      dateObject,
      ts,
      inCurrentMonth,
      isCurrentDate
    }, index) => {
      var _a;
      const {
        year,
        month,
        date
      } = dateObject;
      const fullDate = format(ts, 'yyyy-MM-dd');
      // 'notInCurrentMonth' and 'disabled' are both disabled styles, but 'disabled''s cursor are not-allowed
      const notInCurrentMonth = !inCurrentMonth;
      const disabled = (isDateDisabled === null || isDateDisabled === void 0 ? void 0 : isDateDisabled(ts)) === true;
      const selected = normalizedValue === startOfDay(ts).valueOf();
      return h("div", {
        key: `${calendarMonth}-${index}`,
        class: [`${mergedClsPrefix}-calendar-cell`, disabled && `${mergedClsPrefix}-calendar-cell--disabled`, notInCurrentMonth && `${mergedClsPrefix}-calendar-cell--other-month`, disabled && `${mergedClsPrefix}-calendar-cell--not-allowed`, isCurrentDate && `${mergedClsPrefix}-calendar-cell--current`, selected && `${mergedClsPrefix}-calendar-cell--selected`],
        onClick: () => {
          var _a;
          if (disabled) return;
          const monthTs = startOfMonth(ts).valueOf();
          this.monthTs = monthTs;
          if (notInCurrentMonth) {
            (_a = this.onPanelChange) === null || _a === void 0 ? void 0 : _a.call(this, {
              year: getYear(monthTs),
              month: getMonth(monthTs) + 1
            });
          }
          this.doUpdateValue(ts, {
            year,
            month: month + 1,
            date
          });
        }
      }, h("div", {
        class: `${mergedClsPrefix}-calendar-date`
      }, h("div", {
        class: `${mergedClsPrefix}-calendar-date__date`,
        title: fullDate
      }, date), index < 7 && h("div", {
        class: `${mergedClsPrefix}-calendar-date__day`,
        title: fullDate
      }, format(ts, 'EEE', {
        locale
      }))), (_a = $slots.default) === null || _a === void 0 ? void 0 : _a.call($slots, {
        year,
        month: month + 1,
        date
      }), h("div", {
        class: `${mergedClsPrefix}-calendar-cell__bar`
      }));
    })));
  }
});