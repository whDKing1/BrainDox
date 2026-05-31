"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePanelCommonProps = void 0;
exports.usePanelCommon = usePanelCommon;
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const interface_1 = require("../interface");
const TIME_FORMAT = 'HH:mm:ss';
const usePanelCommonProps = {
    active: Boolean,
    dateFormat: String,
    fastYearSelect: Boolean,
    fastMonthSelect: Boolean,
    calendarDayFormat: String,
    calendarHeaderYearFormat: String,
    calendarHeaderMonthFormat: String,
    calendarHeaderMonthYearSeparator: { type: String, required: true },
    calendarHeaderMonthBeforeYear: {
        type: Boolean,
        default: undefined
    },
    timePickerFormat: {
        type: String,
        value: TIME_FORMAT
    },
    value: {
        type: [Array, Number],
        default: null
    },
    shortcuts: Object,
    defaultTime: [Number, String, Array, Function],
    inputReadonly: Boolean,
    onClear: Function,
    onConfirm: Function,
    onClose: Function,
    onTabOut: Function,
    onKeydown: Function,
    actions: Array,
    onSelectYear: Function,
    onSelectMonth: Function,
    onUpdateValue: {
        type: Function,
        required: true
    },
    themeClass: String,
    onRender: Function,
    panel: Boolean,
    onNextMonth: Function,
    onPrevMonth: Function,
    onNextYear: Function,
    onPrevYear: Function
};
exports.usePanelCommonProps = usePanelCommonProps;
function usePanelCommon(props) {
    const { dateLocaleRef, timePickerSizeRef, timePickerPropsRef, localeRef, mergedClsPrefixRef, mergedThemeRef } = (0, vue_1.inject)(interface_1.datePickerInjectionKey);
    const dateFnsOptionsRef = (0, vue_1.computed)(() => {
        return {
            locale: dateLocaleRef.value.locale
        };
    });
    const selfRef = (0, vue_1.ref)(null);
    const keyboardState = (0, vooks_1.useKeyboard)();
    function doClear() {
        const { onClear } = props;
        if (onClear)
            onClear();
    }
    function doConfirm() {
        const { onConfirm, value } = props;
        if (onConfirm)
            onConfirm(value);
    }
    function doUpdateValue(value, doUpdate) {
        const { onUpdateValue } = props;
        onUpdateValue(value, doUpdate);
    }
    function doClose(disableUpdateOnClose = false) {
        const { onClose } = props;
        if (onClose)
            onClose(disableUpdateOnClose);
    }
    function doTabOut() {
        const { onTabOut } = props;
        if (onTabOut)
            onTabOut();
    }
    function handleClearClick() {
        doUpdateValue(null, true);
        doClose(true);
        doClear();
    }
    function handleFocusDetectorFocus() {
        doTabOut();
    }
    function disableTransitionOneTick() {
        if (props.active || props.panel) {
            void (0, vue_1.nextTick)(() => {
                const { value: selfEl } = selfRef;
                if (!selfEl)
                    return;
                const dateEls = selfEl.querySelectorAll('[data-n-date]');
                dateEls.forEach((el) => {
                    el.classList.add('transition-disabled');
                });
                void selfEl.offsetWidth;
                dateEls.forEach((el) => {
                    el.classList.remove('transition-disabled');
                });
            });
        }
    }
    function handlePanelKeyDown(e) {
        if (e.key === 'Tab' && e.target === selfRef.value && keyboardState.shift) {
            e.preventDefault();
            doTabOut();
        }
    }
    function handlePanelFocus(e) {
        const { value: el } = selfRef;
        if (keyboardState.tab
            && e.target === el
            && (el === null || el === void 0 ? void 0 : el.contains(e.relatedTarget))) {
            doTabOut();
        }
    }
    let cachedValue = null;
    let cached = false;
    function cachePendingValue() {
        cachedValue = props.value;
        cached = true;
    }
    function clearPendingValue() {
        cached = false;
    }
    function restorePendingValue() {
        if (cached) {
            doUpdateValue(cachedValue, false);
            cached = false;
        }
    }
    function getShortcutValue(shortcut) {
        if (typeof shortcut === 'function') {
            return shortcut();
        }
        return shortcut;
    }
    const showMonthYearPanel = (0, vue_1.ref)(false);
    function handleOpenQuickSelectMonthPanel() {
        showMonthYearPanel.value = !showMonthYearPanel.value;
    }
    return {
        mergedTheme: mergedThemeRef,
        mergedClsPrefix: mergedClsPrefixRef,
        dateFnsOptions: dateFnsOptionsRef,
        timePickerSize: timePickerSizeRef,
        timePickerProps: timePickerPropsRef,
        selfRef,
        locale: localeRef,
        doConfirm,
        doClose,
        doUpdateValue,
        doTabOut,
        handleClearClick,
        handleFocusDetectorFocus,
        disableTransitionOneTick,
        handlePanelKeyDown,
        handlePanelFocus,
        cachePendingValue,
        clearPendingValue,
        restorePendingValue,
        getShortcutValue,
        handleShortcutMouseleave: restorePendingValue,
        showMonthYearPanel,
        handleOpenQuickSelectMonthPanel
    };
}
