"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seemly_1 = require("seemly");
const vdirs_1 = require("vdirs");
const vue_1 = require("vue");
const vueuc_1 = require("vueuc");
const month_1 = __importDefault(require("./month"));
exports.default = (0, vue_1.defineComponent)({
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
        const triggerRef = (0, vue_1.ref)(null);
        const monthPanelRef = (0, vue_1.ref)(null);
        const showRef = (0, vue_1.ref)(false);
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
            if (showRef.value
                && !((_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.contains((0, seemly_1.getPreciseEventTarget)(e)))) {
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
        const { handleClickOutside, mergedClsPrefix } = this;
        return ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-date-panel-month__month-year`, ref: "triggerRef" },
            (0, vue_1.h)(vueuc_1.VBinder, null, {
                default: () => [
                    (0, vue_1.h)(vueuc_1.VTarget, null, {
                        default: () => ((0, vue_1.h)("div", { class: [
                                `${mergedClsPrefix}-date-panel-month__text`,
                                this.show
                                    && `${mergedClsPrefix}-date-panel-month__text--active`
                            ], onClick: this.handleHeaderClick }, this.monthBeforeYear
                            ? [
                                this.calendarMonth,
                                this.monthYearSeparator,
                                this.calendarYear
                            ]
                            : [
                                this.calendarYear,
                                this.monthYearSeparator,
                                this.calendarMonth
                            ]))
                    }),
                    (0, vue_1.h)(vueuc_1.VFollower, { show: this.show, teleportDisabled: true }, {
                        default: () => ((0, vue_1.h)(vue_1.Transition, { name: "fade-in-scale-up-transition", appear: true }, {
                            default: () => this.show
                                ? (0, vue_1.withDirectives)((0, vue_1.h)(month_1.default, { ref: "monthPanelRef", onUpdateValue: this.onUpdateValue, onSelectYear: this.handleSelectYear, onSelectMonth: this.handleSelectMonth, actions: [], calendarHeaderMonthYearSeparator: this.monthYearSeparator, 
                                    // month and year click show month type
                                    type: "month", key: "month", useAsQuickJump: true, value: this.value }), [
                                    [
                                        vdirs_1.clickoutside,
                                        handleClickOutside,
                                        undefined,
                                        { capture: true }
                                    ]
                                ])
                                : null
                        }))
                    })
                ]
            })));
    }
});
