"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.timePickerProps = void 0;
const date_fns_1 = require("date-fns");
const date_fns_tz_1 = require("date-fns-tz");
const seemly_1 = require("seemly");
const vdirs_1 = require("vdirs");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const vueuc_1 = require("vueuc");
const _internal_1 = require("../../_internal");
const icons_1 = require("../../_internal/icons");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const utils_1 = require("../../date-picker/src/utils");
const input_1 = require("../../input");
const styles_1 = require("../styles");
const interface_1 = require("./interface");
const Panel_1 = __importDefault(require("./Panel"));
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
const utils_2 = require("./utils");
// validate hours, minutes, seconds prop
function validateUnits(value, max) {
    if (value === undefined) {
        return true;
    }
    if (Array.isArray(value)) {
        return value.every(v => v >= 0 && v <= max);
    }
    else {
        return value >= 0 && value <= max;
    }
}
exports.timePickerProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { to: _utils_1.useAdjustedTo.propTo, bordered: {
        type: Boolean,
        default: undefined
    }, actions: Array, defaultValue: {
        type: Number,
        default: null
    }, defaultFormattedValue: String, placeholder: String, placement: {
        type: String,
        default: 'bottom-start'
    }, value: Number, format: {
        type: String,
        default: 'HH:mm:ss'
    }, valueFormat: String, formattedValue: String, isHourDisabled: Function, size: String, isMinuteDisabled: Function, isSecondDisabled: Function, inputReadonly: Boolean, clearable: Boolean, status: String, 'onUpdate:value': [Function, Array], onUpdateValue: [Function, Array], 'onUpdate:show': [Function, Array], onUpdateShow: [Function, Array], onUpdateFormattedValue: [Function, Array], 'onUpdate:formattedValue': [Function, Array], onBlur: [Function, Array], onConfirm: [Function, Array], onClear: Function, onFocus: [Function, Array], 
    // https://www.iana.org/time-zones
    timeZone: String, showIcon: {
        type: Boolean,
        default: true
    }, disabled: {
        type: Boolean,
        default: undefined
    }, show: {
        type: Boolean,
        default: undefined
    }, hours: {
        type: [Number, Array],
        validator: (value) => validateUnits(value, 23)
    }, minutes: {
        type: [Number, Array],
        validator: (value) => validateUnits(value, 59)
    }, seconds: {
        type: [Number, Array],
        validator: (value) => validateUnits(value, 59)
    }, use12Hours: Boolean, 
    // private
    stateful: {
        type: Boolean,
        default: true
    }, 
    // deprecated
    onChange: [Function, Array] });
exports.default = (0, vue_1.defineComponent)({
    name: 'TimePicker',
    props: exports.timePickerProps,
    setup(props) {
        if (process.env.NODE_ENV !== 'production') {
            (0, vue_1.watchEffect)(() => {
                if (props.onChange !== undefined) {
                    (0, _utils_1.warnOnce)('time-picker', '`on-change` is deprecated, please use `on-update:value` instead.');
                }
            });
        }
        const { mergedBorderedRef, mergedClsPrefixRef, namespaceRef, inlineThemeDisabled, mergedComponentPropsRef } = (0, _mixins_1.useConfig)(props);
        const { localeRef, dateLocaleRef } = (0, _mixins_1.useLocale)('TimePicker');
        const formItem = (0, _mixins_1.useFormItem)(props, {
            mergedSize: (NFormItem) => {
                var _a, _b;
                const { size } = props;
                if (size)
                    return size;
                const { mergedSize: formItemSize } = NFormItem || {};
                if (formItemSize === null || formItemSize === void 0 ? void 0 : formItemSize.value)
                    return formItemSize.value;
                const configSize = (_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.TimePicker) === null || _b === void 0 ? void 0 : _b.size;
                if (configSize)
                    return configSize;
                return 'medium';
            }
        });
        const { mergedSizeRef, mergedDisabledRef, mergedStatusRef } = formItem;
        const themeRef = (0, _mixins_1.useTheme)('TimePicker', '-time-picker', index_cssr_1.default, styles_1.timePickerLight, props, mergedClsPrefixRef);
        const keyboardState = (0, vooks_1.useKeyboard)();
        const inputInstRef = (0, vue_1.ref)(null);
        const panelInstRef = (0, vue_1.ref)(null);
        const dateFnsOptionsRef = (0, vue_1.computed)(() => {
            return {
                locale: dateLocaleRef.value.locale
            };
        });
        function getTimestampFromFormattedValue(value) {
            if (value === null)
                return null;
            return (0, utils_1.strictParse)(value, props.valueFormat || props.format, new Date(), dateFnsOptionsRef.value).getTime();
        }
        const { defaultValue, defaultFormattedValue } = props;
        const uncontrolledValueRef = (0, vue_1.ref)(defaultFormattedValue !== undefined
            ? getTimestampFromFormattedValue(defaultFormattedValue)
            : defaultValue);
        const mergedValueRef = (0, vue_1.computed)(() => {
            const { formattedValue } = props;
            if (formattedValue !== undefined) {
                return getTimestampFromFormattedValue(formattedValue);
            }
            const { value } = props;
            if (value !== undefined) {
                return value;
            }
            return uncontrolledValueRef.value;
        });
        const mergedFormatRef = (0, vue_1.computed)(() => {
            const { timeZone } = props;
            if (timeZone) {
                return (date, format, options) => {
                    return (0, date_fns_tz_1.formatInTimeZone)(date, timeZone, format, options);
                };
            }
            else {
                return (date, _format, options) => {
                    return (0, date_fns_1.format)(date, _format, options);
                };
            }
        });
        const displayTimeStringRef = (0, vue_1.ref)('');
        (0, vue_1.watch)(() => props.timeZone, () => {
            const mergedValue = mergedValueRef.value;
            displayTimeStringRef.value
                = mergedValue === null
                    ? ''
                    : mergedFormatRef.value(mergedValue, props.format, dateFnsOptionsRef.value);
        }, {
            immediate: true
        });
        const uncontrolledShowRef = (0, vue_1.ref)(false);
        const controlledShowRef = (0, vue_1.toRef)(props, 'show');
        const mergedShowRef = (0, vooks_1.useMergedState)(controlledShowRef, uncontrolledShowRef);
        const memorizedValueRef = (0, vue_1.ref)(mergedValueRef.value);
        const transitionDisabledRef = (0, vue_1.ref)(false);
        const localizedClearRef = (0, vue_1.computed)(() => {
            return localeRef.value.clear;
        });
        const localizedNowRef = (0, vue_1.computed)(() => {
            return localeRef.value.now;
        });
        const localizedPlaceholderRef = (0, vue_1.computed)(() => {
            if (props.placeholder !== undefined)
                return props.placeholder;
            return localeRef.value.placeholder;
        });
        const localizedNegativeTextRef = (0, vue_1.computed)(() => {
            return localeRef.value.negativeText;
        });
        const localizedPositiveTextRef = (0, vue_1.computed)(() => {
            return localeRef.value.positiveText;
        });
        const hourInFormatRef = (0, vue_1.computed)(() => {
            return /H|h|K|k/.test(props.format);
        });
        const minuteInFormatRef = (0, vue_1.computed)(() => {
            return props.format.includes('m');
        });
        const secondInFormatRef = (0, vue_1.computed)(() => {
            return props.format.includes('s');
        });
        const hourValueRef = (0, vue_1.computed)(() => {
            const { value } = mergedValueRef;
            if (value === null)
                return null;
            return Number(mergedFormatRef.value(value, 'HH', dateFnsOptionsRef.value));
        });
        const minuteValueRef = (0, vue_1.computed)(() => {
            const { value } = mergedValueRef;
            if (value === null)
                return null;
            return Number(mergedFormatRef.value(value, 'mm', dateFnsOptionsRef.value));
        });
        const secondValueRef = (0, vue_1.computed)(() => {
            const { value } = mergedValueRef;
            if (value === null)
                return null;
            return Number(mergedFormatRef.value(value, 'ss', dateFnsOptionsRef.value));
        });
        const isHourInvalidRef = (0, vue_1.computed)(() => {
            const { isHourDisabled } = props;
            if (hourValueRef.value === null)
                return false;
            if (!(0, utils_2.isTimeInStep)(hourValueRef.value, 'hours', props.hours))
                return true;
            if (!isHourDisabled)
                return false;
            return isHourDisabled(hourValueRef.value);
        });
        const isMinuteInvalidRef = (0, vue_1.computed)(() => {
            const { value: minuteValue } = minuteValueRef;
            const { value: hourValue } = hourValueRef;
            if (minuteValue === null || hourValue === null)
                return false;
            if (!(0, utils_2.isTimeInStep)(minuteValue, 'minutes', props.minutes))
                return true;
            const { isMinuteDisabled } = props;
            if (!isMinuteDisabled)
                return false;
            return isMinuteDisabled(minuteValue, hourValue);
        });
        const isSecondInvalidRef = (0, vue_1.computed)(() => {
            const { value: minuteValue } = minuteValueRef;
            const { value: hourValue } = hourValueRef;
            const { value: secondValue } = secondValueRef;
            if (secondValue === null || minuteValue === null || hourValue === null) {
                return false;
            }
            if (!(0, utils_2.isTimeInStep)(secondValue, 'seconds', props.seconds))
                return true;
            const { isSecondDisabled } = props;
            if (!isSecondDisabled)
                return false;
            return isSecondDisabled(secondValue, minuteValue, hourValue);
        });
        const isValueInvalidRef = (0, vue_1.computed)(() => {
            return (isHourInvalidRef.value
                || isMinuteInvalidRef.value
                || isSecondInvalidRef.value);
        });
        const mergedAttrSizeRef = (0, vue_1.computed)(() => {
            return props.format.length + 4;
        });
        const amPmValueRef = (0, vue_1.computed)(() => {
            const { value } = mergedValueRef;
            if (value === null)
                return null;
            return (0, date_fns_1.getHours)(value) < 12 ? 'am' : 'pm';
        });
        function doUpdateFormattedValue(value, timestampValue) {
            const { onUpdateFormattedValue, 'onUpdate:formattedValue': _onUpdateFormattedValue } = props;
            if (onUpdateFormattedValue) {
                (0, _utils_1.call)(onUpdateFormattedValue, value, timestampValue);
            }
            if (_onUpdateFormattedValue) {
                (0, _utils_1.call)(_onUpdateFormattedValue, value, timestampValue);
            }
        }
        function createFormattedValue(value) {
            return value === null
                ? null
                : mergedFormatRef.value(value, props.valueFormat || props.format);
        }
        function doUpdateValue(value) {
            const { onUpdateValue, 'onUpdate:value': _onUpdateValue, onChange } = props;
            const { nTriggerFormChange, nTriggerFormInput } = formItem;
            const formattedValue = createFormattedValue(value);
            if (onUpdateValue) {
                (0, _utils_1.call)(onUpdateValue, value, formattedValue);
            }
            if (_onUpdateValue) {
                (0, _utils_1.call)(_onUpdateValue, value, formattedValue);
            }
            if (onChange)
                (0, _utils_1.call)(onChange, value, formattedValue);
            doUpdateFormattedValue(formattedValue, value);
            uncontrolledValueRef.value = value;
            nTriggerFormChange();
            nTriggerFormInput();
        }
        function doFocus(e) {
            const { onFocus } = props;
            const { nTriggerFormFocus } = formItem;
            if (onFocus)
                (0, _utils_1.call)(onFocus, e);
            nTriggerFormFocus();
        }
        function doBlur(e) {
            const { onBlur } = props;
            const { nTriggerFormBlur } = formItem;
            if (onBlur)
                (0, _utils_1.call)(onBlur, e);
            nTriggerFormBlur();
        }
        function doConfirm() {
            const { onConfirm } = props;
            if (onConfirm) {
                (0, _utils_1.call)(onConfirm, mergedValueRef.value, createFormattedValue(mergedValueRef.value));
            }
        }
        function handleTimeInputClear(e) {
            var _a;
            e.stopPropagation();
            doUpdateValue(null);
            deriveInputValue(null);
            (_a = props.onClear) === null || _a === void 0 ? void 0 : _a.call(props);
        }
        function handleFocusDetectorFocus() {
            closePanel({
                returnFocus: true
            });
        }
        // clear selected time
        function clearSelectedValue() {
            doUpdateValue(null);
            deriveInputValue(null);
            closePanel({
                returnFocus: true
            });
        }
        function handleInputKeydown(e) {
            if (e.key === 'Escape' && mergedShowRef.value) {
                (0, _utils_1.markEventEffectPerformed)(e);
                // closePanel will be called in onDeactivated
            }
        }
        function handleMenuKeydown(e) {
            var _a;
            switch (e.key) {
                case 'Escape':
                    if (mergedShowRef.value) {
                        (0, _utils_1.markEventEffectPerformed)(e);
                        closePanel({
                            returnFocus: true
                        });
                    }
                    break;
                case 'Tab':
                    if (keyboardState.shift && e.target === ((_a = panelInstRef.value) === null || _a === void 0 ? void 0 : _a.$el)) {
                        e.preventDefault();
                        closePanel({
                            returnFocus: true
                        });
                    }
                    break;
            }
        }
        function disableTransitionOneTick() {
            transitionDisabledRef.value = true;
            void (0, vue_1.nextTick)(() => {
                transitionDisabledRef.value = false;
            });
        }
        function handleTriggerClick(e) {
            if (mergedDisabledRef.value || (0, seemly_1.happensIn)(e, 'clear'))
                return;
            if (!mergedShowRef.value) {
                openPanel();
            }
        }
        function handleHourClick(hour) {
            if (typeof hour === 'string')
                return;
            if (mergedValueRef.value === null) {
                doUpdateValue((0, date_fns_1.getTime)((0, date_fns_1.setHours)((0, date_fns_1.startOfHour)(new Date()), hour)));
            }
            else {
                doUpdateValue((0, date_fns_1.getTime)((0, date_fns_1.setHours)(mergedValueRef.value, hour)));
            }
        }
        function handleMinuteClick(minute) {
            if (typeof minute === 'string')
                return;
            if (mergedValueRef.value === null) {
                doUpdateValue((0, date_fns_1.getTime)((0, date_fns_1.setMinutes)((0, date_fns_1.startOfMinute)(new Date()), minute)));
            }
            else {
                doUpdateValue((0, date_fns_1.getTime)((0, date_fns_1.setMinutes)(mergedValueRef.value, minute)));
            }
        }
        function handleSecondClick(second) {
            if (typeof second === 'string')
                return;
            if (mergedValueRef.value === null) {
                doUpdateValue((0, date_fns_1.getTime)((0, date_fns_1.setSeconds)((0, date_fns_1.startOfSecond)(new Date()), second)));
            }
            else {
                doUpdateValue((0, date_fns_1.getTime)((0, date_fns_1.setSeconds)(mergedValueRef.value, second)));
            }
        }
        function handleAmPmClick(amPm) {
            const { value: mergedValue } = mergedValueRef;
            if (mergedValue === null) {
                const now = new Date();
                const hours = (0, date_fns_1.getHours)(now);
                if (amPm === 'pm' && hours < 12) {
                    doUpdateValue((0, date_fns_1.getTime)((0, date_fns_1.setHours)(now, hours + 12)));
                }
                else if (amPm === 'am' && hours >= 12) {
                    doUpdateValue((0, date_fns_1.getTime)((0, date_fns_1.setHours)(now, hours - 12)));
                }
                doUpdateValue((0, date_fns_1.getTime)(now));
            }
            else {
                const hours = (0, date_fns_1.getHours)(mergedValue);
                if (amPm === 'pm' && hours < 12) {
                    doUpdateValue((0, date_fns_1.getTime)((0, date_fns_1.setHours)(mergedValue, hours + 12)));
                }
                else if (amPm === 'am' && hours >= 12) {
                    doUpdateValue((0, date_fns_1.getTime)((0, date_fns_1.setHours)(mergedValue, hours - 12)));
                }
            }
        }
        function deriveInputValue(time) {
            if (time === undefined)
                time = mergedValueRef.value;
            if (time === null) {
                displayTimeStringRef.value = '';
            }
            else {
                displayTimeStringRef.value = mergedFormatRef.value(time, props.format, dateFnsOptionsRef.value);
            }
        }
        function handleTimeInputFocus(e) {
            if (isInternalFocusSwitch(e))
                return;
            doFocus(e);
        }
        function handleTimeInputBlur(e) {
            var _a;
            if (isInternalFocusSwitch(e))
                return;
            if (mergedShowRef.value) {
                const panelEl = (_a = panelInstRef.value) === null || _a === void 0 ? void 0 : _a.$el;
                if (!(panelEl === null || panelEl === void 0 ? void 0 : panelEl.contains(e.relatedTarget))) {
                    deriveInputValue();
                    doBlur(e);
                    closePanel({
                        returnFocus: false
                    });
                }
            }
            else {
                deriveInputValue();
                doBlur(e);
            }
        }
        function handleTimeInputActivate() {
            if (mergedDisabledRef.value)
                return;
            if (!mergedShowRef.value) {
                openPanel();
            }
        }
        function handleTimeInputDeactivate() {
            if (mergedDisabledRef.value)
                return;
            deriveInputValue();
            closePanel({
                returnFocus: false
            });
        }
        function scrollTimer() {
            if (!panelInstRef.value)
                return;
            const { hourScrollRef, minuteScrollRef, secondScrollRef, amPmScrollRef } = panelInstRef.value;
            [hourScrollRef, minuteScrollRef, secondScrollRef, amPmScrollRef].forEach((itemScrollRef) => {
                var _a;
                if (!itemScrollRef)
                    return;
                const activeItemEl = (_a = itemScrollRef.contentRef) === null || _a === void 0 ? void 0 : _a.querySelector('[data-active]');
                if (activeItemEl) {
                    itemScrollRef.scrollTo({
                        top: activeItemEl.offsetTop
                    });
                }
            });
        }
        function doUpdateShow(value) {
            uncontrolledShowRef.value = value;
            const { onUpdateShow, 'onUpdate:show': _onUpdateShow } = props;
            if (onUpdateShow)
                (0, _utils_1.call)(onUpdateShow, value);
            if (_onUpdateShow)
                (0, _utils_1.call)(_onUpdateShow, value);
        }
        function isInternalFocusSwitch(e) {
            var _a, _b, _c;
            return !!(((_b = (_a = inputInstRef.value) === null || _a === void 0 ? void 0 : _a.wrapperElRef) === null || _b === void 0 ? void 0 : _b.contains(e.relatedTarget))
                || ((_c = panelInstRef.value) === null || _c === void 0 ? void 0 : _c.$el.contains(e.relatedTarget)));
        }
        function openPanel() {
            memorizedValueRef.value = mergedValueRef.value;
            doUpdateShow(true);
            void (0, vue_1.nextTick)(scrollTimer);
        }
        function handleClickOutside(e) {
            var _a, _b;
            if (mergedShowRef.value
                && !((_b = (_a = inputInstRef.value) === null || _a === void 0 ? void 0 : _a.wrapperElRef) === null || _b === void 0 ? void 0 : _b.contains((0, seemly_1.getPreciseEventTarget)(e)))) {
                closePanel({
                    returnFocus: false
                });
            }
        }
        function closePanel({ returnFocus }) {
            var _a;
            if (mergedShowRef.value) {
                doUpdateShow(false);
                if (returnFocus) {
                    (_a = inputInstRef.value) === null || _a === void 0 ? void 0 : _a.focus();
                }
            }
        }
        function handleTimeInputUpdateValue(v) {
            if (v === '') {
                doUpdateValue(null);
                return;
            }
            const time = (0, utils_1.strictParse)(v, props.format, new Date(), dateFnsOptionsRef.value);
            displayTimeStringRef.value = v;
            if ((0, date_fns_1.isValid)(time)) {
                const { value: mergedValue } = mergedValueRef;
                if (mergedValue !== null) {
                    const newTime = (0, date_fns_1.set)(mergedValue, {
                        hours: (0, date_fns_1.getHours)(time),
                        minutes: (0, date_fns_1.getMinutes)(time),
                        seconds: (0, date_fns_1.getSeconds)(time),
                        milliseconds: (0, date_fns_1.getMilliseconds)(time)
                    });
                    doUpdateValue((0, date_fns_1.getTime)(newTime));
                }
                else {
                    doUpdateValue((0, date_fns_1.getTime)(time));
                }
            }
        }
        function handleCancelClick() {
            doUpdateValue(memorizedValueRef.value);
            doUpdateShow(false);
        }
        function handleNowClick() {
            const now = new Date();
            const getNowTime = {
                hours: date_fns_1.getHours,
                minutes: date_fns_1.getMinutes,
                seconds: date_fns_1.getSeconds
            };
            const [mergeHours, mergeMinutes, mergeSeconds] = ['hours', 'minutes', 'seconds'].map(i => !props[i] || (0, utils_2.isTimeInStep)(getNowTime[i](now), i, props[i])
                ? getNowTime[i](now)
                : (0, utils_2.findSimilarTime)(getNowTime[i](now), i, props[i]));
            const newValue = (0, date_fns_1.setSeconds)((0, date_fns_1.setMinutes)((0, date_fns_1.setHours)(mergedValueRef.value ? mergedValueRef.value : (0, date_fns_1.getTime)(now), mergeHours), mergeMinutes), mergeSeconds);
            doUpdateValue((0, date_fns_1.getTime)(newValue));
        }
        function handleConfirmClick() {
            deriveInputValue();
            doConfirm();
            closePanel({
                returnFocus: true
            });
        }
        function handleMenuFocusOut(e) {
            if (isInternalFocusSwitch(e))
                return;
            deriveInputValue();
            doBlur(e);
            closePanel({
                returnFocus: false
            });
        }
        (0, vue_1.watch)(mergedValueRef, (value) => {
            deriveInputValue(value);
            disableTransitionOneTick();
            void (0, vue_1.nextTick)(scrollTimer);
        });
        (0, vue_1.watch)(mergedShowRef, () => {
            if (isValueInvalidRef.value) {
                doUpdateValue(memorizedValueRef.value);
            }
        });
        (0, vue_1.provide)(interface_1.timePickerInjectionKey, {
            mergedThemeRef: themeRef,
            mergedClsPrefixRef
        });
        const exposedMethods = {
            focus: () => {
                var _a;
                (_a = inputInstRef.value) === null || _a === void 0 ? void 0 : _a.focus();
            },
            blur: () => {
                var _a;
                (_a = inputInstRef.value) === null || _a === void 0 ? void 0 : _a.blur();
            }
        };
        const triggerCssVarsRef = (0, vue_1.computed)(() => {
            const { common: { cubicBezierEaseInOut }, self: { iconColor, iconColorDisabled } } = themeRef.value;
            return {
                '--n-icon-color-override': iconColor,
                '--n-icon-color-disabled-override': iconColorDisabled,
                '--n-bezier': cubicBezierEaseInOut
            };
        });
        const triggerThemeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('time-picker-trigger', undefined, triggerCssVarsRef, props)
            : undefined;
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { self: { panelColor, itemTextColor, itemTextColorActive, itemColorHover, panelDividerColor, panelBoxShadow, itemOpacityDisabled, borderRadius, itemFontSize, itemWidth, itemHeight, panelActionPadding, itemBorderRadius }, common: { cubicBezierEaseInOut } } = themeRef.value;
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-border-radius': borderRadius,
                '--n-item-color-hover': itemColorHover,
                '--n-item-font-size': itemFontSize,
                '--n-item-height': itemHeight,
                '--n-item-opacity-disabled': itemOpacityDisabled,
                '--n-item-text-color': itemTextColor,
                '--n-item-text-color-active': itemTextColorActive,
                '--n-item-width': itemWidth,
                '--n-panel-action-padding': panelActionPadding,
                '--n-panel-box-shadow': panelBoxShadow,
                '--n-panel-color': panelColor,
                '--n-panel-divider-color': panelDividerColor,
                '--n-item-border-radius': itemBorderRadius
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('time-picker', undefined, cssVarsRef, props)
            : undefined;
        return {
            focus: exposedMethods.focus,
            blur: exposedMethods.blur,
            mergedStatus: mergedStatusRef,
            mergedBordered: mergedBorderedRef,
            mergedClsPrefix: mergedClsPrefixRef,
            namespace: namespaceRef,
            uncontrolledValue: uncontrolledValueRef,
            mergedValue: mergedValueRef,
            isMounted: (0, vooks_1.useIsMounted)(),
            inputInstRef,
            panelInstRef,
            adjustedTo: (0, _utils_1.useAdjustedTo)(props),
            mergedShow: mergedShowRef,
            localizedClear: localizedClearRef,
            localizedNow: localizedNowRef,
            localizedPlaceholder: localizedPlaceholderRef,
            localizedNegativeText: localizedNegativeTextRef,
            localizedPositiveText: localizedPositiveTextRef,
            hourInFormat: hourInFormatRef,
            minuteInFormat: minuteInFormatRef,
            secondInFormat: secondInFormatRef,
            mergedAttrSize: mergedAttrSizeRef,
            displayTimeString: displayTimeStringRef,
            mergedSize: mergedSizeRef,
            mergedDisabled: mergedDisabledRef,
            isValueInvalid: isValueInvalidRef,
            isHourInvalid: isHourInvalidRef,
            isMinuteInvalid: isMinuteInvalidRef,
            isSecondInvalid: isSecondInvalidRef,
            transitionDisabled: transitionDisabledRef,
            hourValue: hourValueRef,
            minuteValue: minuteValueRef,
            secondValue: secondValueRef,
            amPmValue: amPmValueRef,
            handleInputKeydown,
            handleTimeInputFocus,
            handleTimeInputBlur,
            handleNowClick,
            handleConfirmClick,
            handleTimeInputUpdateValue,
            handleMenuFocusOut,
            handleCancelClick,
            handleClickOutside,
            handleTimeInputActivate,
            handleTimeInputDeactivate,
            handleHourClick,
            handleMinuteClick,
            handleSecondClick,
            handleAmPmClick,
            handleTimeInputClear,
            handleFocusDetectorFocus,
            handleMenuKeydown,
            handleTriggerClick,
            mergedTheme: themeRef,
            triggerCssVars: inlineThemeDisabled ? undefined : triggerCssVarsRef,
            triggerThemeClass: triggerThemeClassHandle === null || triggerThemeClassHandle === void 0 ? void 0 : triggerThemeClassHandle.themeClass,
            triggerOnRender: triggerThemeClassHandle === null || triggerThemeClassHandle === void 0 ? void 0 : triggerThemeClassHandle.onRender,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender,
            clearSelectedValue
        };
    },
    render() {
        const { mergedClsPrefix, $slots, triggerOnRender } = this;
        triggerOnRender === null || triggerOnRender === void 0 ? void 0 : triggerOnRender();
        return ((0, vue_1.h)("div", { class: [`${mergedClsPrefix}-time-picker`, this.triggerThemeClass], style: this.triggerCssVars },
            (0, vue_1.h)(vueuc_1.VBinder, null, {
                default: () => [
                    (0, vue_1.h)(vueuc_1.VTarget, null, {
                        default: () => ((0, vue_1.h)(input_1.NInput, { ref: "inputInstRef", status: this.mergedStatus, value: this.displayTimeString, bordered: this.mergedBordered, passivelyActivated: true, attrSize: this.mergedAttrSize, theme: this.mergedTheme.peers.Input, themeOverrides: this.mergedTheme.peerOverrides.Input, stateful: this.stateful, size: this.mergedSize, placeholder: this.localizedPlaceholder, clearable: this.clearable, disabled: this.mergedDisabled, textDecoration: this.isValueInvalid ? 'line-through' : undefined, onFocus: this.handleTimeInputFocus, onBlur: this.handleTimeInputBlur, onActivate: this.handleTimeInputActivate, onDeactivate: this.handleTimeInputDeactivate, onUpdateValue: this.handleTimeInputUpdateValue, onClear: this.handleTimeInputClear, internalDeactivateOnEnter: true, internalForceFocus: this.mergedShow, readonly: this.inputReadonly || this.mergedDisabled, onClick: this.handleTriggerClick, onKeydown: this.handleInputKeydown }, this.showIcon
                            ? {
                                [this.clearable
                                    ? 'clear-icon-placeholder'
                                    : 'suffix']: () => ((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: mergedClsPrefix, class: `${mergedClsPrefix}-time-picker-icon` }, {
                                    default: () => $slots.icon ? $slots.icon() : (0, vue_1.h)(icons_1.TimeIcon, null)
                                }))
                            }
                            : null))
                    }),
                    (0, vue_1.h)(vueuc_1.VFollower, { teleportDisabled: this.adjustedTo === _utils_1.useAdjustedTo.tdkey, show: this.mergedShow, to: this.adjustedTo, containerClass: this.namespace, placement: this.placement }, {
                        default: () => ((0, vue_1.h)(vue_1.Transition, { name: "fade-in-scale-up-transition", appear: this.isMounted }, {
                            default: () => {
                                var _a;
                                if (this.mergedShow) {
                                    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
                                    return (0, vue_1.withDirectives)((0, vue_1.h)(Panel_1.default, { ref: "panelInstRef", actions: this.actions, class: this.themeClass, style: this.cssVars, seconds: this.seconds, minutes: this.minutes, hours: this.hours, transitionDisabled: this.transitionDisabled, hourValue: this.hourValue, showHour: this.hourInFormat, isHourInvalid: this.isHourInvalid, isHourDisabled: this.isHourDisabled, minuteValue: this.minuteValue, showMinute: this.minuteInFormat, isMinuteInvalid: this.isMinuteInvalid, isMinuteDisabled: this.isMinuteDisabled, secondValue: this.secondValue, amPmValue: this.amPmValue, showSecond: this.secondInFormat, isSecondInvalid: this.isSecondInvalid, isSecondDisabled: this.isSecondDisabled, isValueInvalid: this.isValueInvalid, clearText: this.localizedClear, nowText: this.localizedNow, confirmText: this.localizedPositiveText, use12Hours: this.use12Hours, onFocusout: this.handleMenuFocusOut, onKeydown: this.handleMenuKeydown, onHourClick: this.handleHourClick, onMinuteClick: this.handleMinuteClick, onSecondClick: this.handleSecondClick, onAmPmClick: this.handleAmPmClick, onNowClick: this.handleNowClick, onConfirmClick: this.handleConfirmClick, onClearClick: this.clearSelectedValue, onFocusDetectorFocus: this.handleFocusDetectorFocus }), [
                                        [
                                            vdirs_1.clickoutside,
                                            this.handleClickOutside,
                                            undefined,
                                            { capture: true }
                                        ]
                                    ]);
                                }
                                return null;
                            }
                        }))
                    })
                ]
            })));
    }
});
