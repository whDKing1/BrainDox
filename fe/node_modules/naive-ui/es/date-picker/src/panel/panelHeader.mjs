import { getPreciseEventTarget } from 'seemly';
import { clickoutside } from 'vdirs';
import { defineComponent, h, ref, Transition, withDirectives } from 'vue';
import { VBinder, VFollower, VTarget } from 'vueuc';
import MonthPanel from "./month.mjs";
export default defineComponent({
  props: {
    mergedClsPrefix: {
      type: String,
      required: true
    },
    value: Number,
    monthBeforeYear: {
      type: Boolean,
      required: true
    },
    monthYearSeparator: {
      type: String,
      required: true
    },
    fastYearSelect: Boolean,
    fastMonthSelect: Boolean,
    calendarMonth: {
      type: String,
      required: true
    },
    calendarYear: {
      type: String,
      required: true
    },
    onUpdateValue: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const triggerRef = ref(null);
    const monthPanelRef = ref(null);
    const showRef = ref(false);
    function toggleShow() {
      showRef.value = !showRef.value;
    }
    function handleSelectYear() {
      if (props.fastYearSelect) {
        toggleShow();
      }
    }
    function handleSelectMonth() {
      if (props.fastMonthSelect) {
        toggleShow();
      }
    }
    function handleClickOutside(e) {
      var _a;
      if (showRef.value && !((_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.contains(getPreciseEventTarget(e)))) {
        showRef.value = false;
      }
    }
    function handleHeaderClick() {
      toggleShow();
    }
    return {
      show: showRef,
      triggerRef,
      monthPanelRef,
      handleSelectYear,
      handleSelectMonth,
      handleHeaderClick,
      handleClickOutside
    };
  },
  render() {
    const {
      handleClickOutside,
      mergedClsPrefix
    } = this;
    return h("div", {
      class: `${mergedClsPrefix}-date-panel-month__month-year`,
      ref: "triggerRef"
    }, h(VBinder, null, {
      default: () => [h(VTarget, null, {
        default: () => h("div", {
          class: [`${mergedClsPrefix}-date-panel-month__text`, this.show && `${mergedClsPrefix}-date-panel-month__text--active`],
          onClick: this.handleHeaderClick
        }, this.monthBeforeYear ? [this.calendarMonth, this.monthYearSeparator, this.calendarYear] : [this.calendarYear, this.monthYearSeparator, this.calendarMonth])
      }), h(VFollower, {
        show: this.show,
        teleportDisabled: true
      }, {
        default: () => h(Transition, {
          name: "fade-in-scale-up-transition",
          appear: true
        }, {
          default: () => this.show ? withDirectives(h(MonthPanel, {
            ref: "monthPanelRef",
            onUpdateValue: this.onUpdateValue,
            onSelectYear: this.handleSelectYear,
            onSelectMonth: this.handleSelectMonth,
            actions: [],
            calendarHeaderMonthYearSeparator: this.monthYearSeparator,
            // month and year click show month type
            type: "month",
            key: "month",
            useAsQuickJump: true,
            value: this.value
          }), [[clickoutside, handleClickOutside, undefined, {
            capture: true
          }]]) : null
        })
      })]
    }));
  }
});