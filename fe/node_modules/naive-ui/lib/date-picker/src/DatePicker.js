"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const seemly_1 = require("seemly");
const vdirs_1 = require("vdirs");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const vueuc_1 = require("vueuc");
const _internal_1 = require("../../_internal");
const icons_1 = require("../../_internal/icons");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const input_1 = require("../../input");
const styles_1 = require("../styles");
const interface_1 = require("./interface");
const date_1 = __importDefault(require("./panel/date"));
const daterange_1 = __importDefault(require("./panel/daterange"));
const datetime_1 = __importDefault(require("./panel/datetime"));
const datetimerange_1 = __importDefault(require("./panel/datetimerange"));
const month_1 = __importDefault(require("./panel/month"));
const monthrange_1 = __importDefault(require("./panel/monthrange"));
const props_1 = require("./props");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
const utils_1 = require("./utils");
const validation_utils_1 = require("./validation-utils");
exports.default = (0, vue_1.defineComponent)({
    name: 'DatePicker',
    props: props_1.datePickerProps,
    slots: Object,
    setup(props, { slots }) {
        var _a;
        if (process.env.NODE_ENV !== 'production') {
            (0, vue_1.watchEffect)(() => {
                if (props.onChange !== undefined) {
                    (0, _utils_1.warnOnce)('date-picker', '`on-change` is deprecated, please use `on-update:value` instead.');
                }
            });
        }
        const { localeRef, dateLocaleRef } = (0, _mixins_1.useLocale)('DatePicker');
        const { mergedComponentPropsRef, mergedClsPrefixRef, mergedBorderedRef, namespaceRef, inlineThemeDisabled } = (0, _mixins_1.useConfig)(props);
        const formItem = (0, _mixins_1.useFormItem)(props, {
            mergedSize: (NFormItem) => {
                var _a, _b;
                const { size } = props;
                if (size)
                    return size;
                const { mergedSize: formItemSize } = NFormItem || {};
                if (formItemSize === null || formItemSize === void 0 ? void 0 : formItemSize.value)
                    return formItemSize.value;
                const configSize = (_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.DatePicker) === null || _b === void 0 ? void 0 : _b.size;
                if (configSize)
                    return configSize;
                return 'medium';
            }
        });
        const { mergedSizeRef, mergedDisabledRef, mergedStatusRef } = formItem;
        const panelInstRef = (0, vue_1.ref)(null);
        const triggerElRef = (0, vue_1.ref)(null);
        const inputInstRef = (0, vue_1.ref)(null);
        const uncontrolledShowRef = (0, vue_1.ref)(false);
        const controlledShowRef = (0, vue_1.toRef)(props, 'show');
        const mergedShowRef = (0, vooks_1.useMergedState)(controlledShowRef, uncontrolledShowRef);
        const dateFnsOptionsRef = (0, vue_1.computed)(() => {
            return {
                locale: dateLocaleRef.value.locale,
                useAdditionalWeekYearTokens: true
            };
        });
        const mergedFormatRef = (0, vue_1.computed)(() => {
            const { format } = props;
            if (format)
                return format;
            switch (props.type) {
                case 'date':
                case 'daterange':
                    return localeRef.value.dateFormat;
                case 'datetime':
                case 'datetimerange':
                    return localeRef.value.dateTimeFormat;
                case 'year':
                case 'yearrange':
                    return localeRef.value.yearTypeFormat;
                case 'month':
                case 'monthrange':
                    return localeRef.value.monthTypeFormat;
                case 'quarter':
                case 'quarterrange':
                    return localeRef.value.quarterFormat;
                case 'week':
                    return localeRef.value.weekFormat;
            }
        });
        const mergedValueFormatRef = (0, vue_1.computed)(() => {
            var _a;
            return (_a = props.valueFormat) !== null && _a !== void 0 ? _a : mergedFormatRef.value;
        });
        function getTimestampValue(value) {
            if (value === null)
                return null;
            const { value: mergedValueFormat } = mergedValueFormatRef;
            const { value: dateFnsOptions } = dateFnsOptionsRef;
            if (Array.isArray(value)) {
                return [
                    (0, utils_1.strictParse)(value[0], mergedValueFormat, new Date(), dateFnsOptions).getTime(),
                    (0, utils_1.strictParse)(value[1], mergedValueFormat, new Date(), dateFnsOptions).getTime()
                ];
            }
            return (0, utils_1.strictParse)(value, mergedValueFormat, new Date(), dateFnsOptions).getTime();
        }
        const { defaultFormattedValue, defaultValue } = props;
        const uncontrolledValueRef = (0, vue_1.ref)((_a = (defaultFormattedValue !== undefined
            ? getTimestampValue(defaultFormattedValue)
            : defaultValue)) !== null && _a !== void 0 ? _a : null);
        const controlledValueRef = (0, vue_1.computed)(() => {
            const { formattedValue } = props;
            if (formattedValue !== undefined) {
                return getTimestampValue(formattedValue);
            }
            return props.value;
        });
        const mergedValueRef = (0, vooks_1.useMergedState)(controlledValueRef, uncontrolledValueRef);
        // We don't change value unless blur or confirm is called
        const pendingValueRef = (0, vue_1.ref)(null);
        (0, vue_1.watchEffect)(() => {
            pendingValueRef.value = mergedValueRef.value;
        });
        const singleInputValueRef = (0, vue_1.ref)('');
        const rangeStartInputValueRef = (0, vue_1.ref)('');
        const rangeEndInputValueRef = (0, vue_1.ref)('');
        const themeRef = (0, _mixins_1.useTheme)('DatePicker', '-date-picker', index_cssr_1.default, styles_1.datePickerLight, props, mergedClsPrefixRef);
        const timePickerSizeRef = (0, vue_1.computed)(() => {
            var _a, _b;
            return (((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.DatePicker) === null || _b === void 0 ? void 0 : _b.timePickerSize) || 'small');
        });
        const isRangeRef = (0, vue_1.computed)(() => {
            return [
                'daterange',
                'datetimerange',
                'monthrange',
                'quarterrange',
                'yearrange'
            ].includes(props.type);
        });
        const localizedPlacehoderRef = (0, vue_1.computed)(() => {
            const { placeholder } = props;
            if (placeholder === undefined) {
                const { type } = props;
                switch (type) {
                    case 'date':
                        return localeRef.value.datePlaceholder;
                    case 'datetime':
                        return localeRef.value.datetimePlaceholder;
                    case 'month':
                        return localeRef.value.monthPlaceholder;
                    case 'year':
                        return localeRef.value.yearPlaceholder;
                    case 'quarter':
                        return localeRef.value.quarterPlaceholder;
                    case 'week':
                        return localeRef.value.weekPlaceholder;
                    default:
                        return '';
                }
            }
            else {
                return placeholder;
            }
        });
        const localizedStartPlaceholderRef = (0, vue_1.computed)(() => {
            if (props.startPlaceholder === undefined) {
                if (props.type === 'daterange') {
                    return localeRef.value.startDatePlaceholder;
                }
                else if (props.type === 'datetimerange') {
                    return localeRef.value.startDatetimePlaceholder;
                }
                else if (props.type === 'monthrange') {
                    return localeRef.value.startMonthPlaceholder;
                }
                return '';
            }
            else {
                return props.startPlaceholder;
            }
        });
        const localizedEndPlaceholderRef = (0, vue_1.computed)(() => {
            if (props.endPlaceholder === undefined) {
                if (props.type === 'daterange') {
                    return localeRef.value.endDatePlaceholder;
                }
                else if (props.type === 'datetimerange') {
                    return localeRef.value.endDatetimePlaceholder;
                }
                else if (props.type === 'monthrange') {
                    return localeRef.value.endMonthPlaceholder;
                }
                return '';
            }
            else {
                return props.endPlaceholder;
            }
        });
        const mergedActionsRef = (0, vue_1.computed)(() => {
            const { actions, type, clearable } = props;
            if (actions === null)
                return [];
            if (actions !== undefined)
                return actions;
            const result = clearable ? ['clear'] : [];
            switch (type) {
                case 'date':
                case 'week': {
                    result.push('now');
                    return result;
                }
                case 'datetime': {
                    result.push('now', 'confirm');
                    return result;
                }
                case 'daterange': {
                    result.push('confirm');
                    return result;
                }
                case 'datetimerange': {
                    result.push('confirm');
                    return result;
                }
                case 'month': {
                    result.push('now', 'confirm');
                    return result;
                }
                case 'year': {
                    result.push('now');
                    return result;
                }
                case 'quarter': {
                    result.push('now', 'confirm');
                    return result;
                }
                case 'monthrange':
                case 'yearrange':
                case 'quarterrange': {
                    result.push('confirm');
                    return result;
                }
                default: {
                    (0, _utils_1.warn)('date-picker', 'The type is wrong, n-date-picker\'s type only supports `date`, `datetime`, `daterange` and `datetimerange`.');
                    break;
                }
            }
        });
        function getFormattedValue(value) {
            if (value === null)
                return null;
            if (Array.isArray(value)) {
                const { value: mergedValueFormat } = mergedValueFormatRef;
                const { value: dateFnsOptions } = dateFnsOptionsRef;
                return [
                    (0, date_fns_1.format)(value[0], mergedValueFormat, dateFnsOptions),
                    (0, date_fns_1.format)(value[1], mergedValueFormat, dateFnsOptionsRef.value)
                ];
            }
            else {
                return (0, date_fns_1.format)(value, mergedValueFormatRef.value, dateFnsOptionsRef.value);
            }
        }
        function doUpdatePendingValue(value) {
            pendingValueRef.value = value;
        }
        function doUpdateFormattedValue(value, timestampValue) {
            const { 'onUpdate:formattedValue': _onUpdateFormattedValue, onUpdateFormattedValue } = props;
            if (_onUpdateFormattedValue) {
                (0, _utils_1.call)(_onUpdateFormattedValue, value, timestampValue);
            }
            if (onUpdateFormattedValue) {
                (0, _utils_1.call)(onUpdateFormattedValue, value, timestampValue);
            }
        }
        function doUpdateValue(value, options) {
            const { 'onUpdate:value': _onUpdateValue, onUpdateValue, onChange } = props;
            const { nTriggerFormChange, nTriggerFormInput } = formItem;
            const formattedValue = getFormattedValue(value);
            if (options.doConfirm) {
                doConfirm(value, formattedValue);
            }
            if (onUpdateValue) {
                (0, _utils_1.call)(onUpdateValue, value, formattedValue);
            }
            if (_onUpdateValue) {
                (0, _utils_1.call)(_onUpdateValue, value, formattedValue);
            }
            if (onChange)
                (0, _utils_1.call)(onChange, value, formattedValue);
            uncontrolledValueRef.value = value;
            doUpdateFormattedValue(formattedValue, value);
            nTriggerFormChange();
            nTriggerFormInput();
        }
        function doClear() {
            const { onClear } = props;
            onClear === null || onClear === void 0 ? void 0 : onClear();
        }
        function doConfirm(value, formattedValue) {
            const { onConfirm } = props;
            if (onConfirm)
                onConfirm(value, formattedValue);
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
        function doUpdateShow(show) {
            const { 'onUpdate:show': _onUpdateShow, onUpdateShow } = props;
            if (_onUpdateShow)
                (0, _utils_1.call)(_onUpdateShow, show);
            if (onUpdateShow)
                (0, _utils_1.call)(onUpdateShow, show);
            uncontrolledShowRef.value = show;
        }
        function handleKeydown(e) {
            if (e.key === 'Escape') {
                if (mergedShowRef.value) {
                    (0, _utils_1.markEventEffectPerformed)(e);
                    closeCalendar({
                        returnFocus: true
                    });
                }
            }
            // We need to handle the conflict with normal date value input
            // const { value: mergedValue } = mergedValueRef
            // if (props.type === 'date' && !Array.isArray(mergedValue)) {
            //   const nextValue = getDerivedTimeFromKeyboardEvent(mergedValue, e)
            //   doUpdateValue(nextValue)
            // }
        }
        function handleInputKeydown(e) {
            if (e.key === 'Escape' && mergedShowRef.value) {
                (0, _utils_1.markEventEffectPerformed)(e);
                // closeCalendar will be called in handleDeactivated
            }
        }
        function handleClear() {
            var _a;
            doUpdateShow(false);
            (_a = inputInstRef.value) === null || _a === void 0 ? void 0 : _a.deactivate();
            doClear();
        }
        function handlePanelClear() {
            var _a;
            // close will be called inside panel
            (_a = inputInstRef.value) === null || _a === void 0 ? void 0 : _a.deactivate();
            doClear();
        }
        function handlePanelTabOut() {
            closeCalendar({
                returnFocus: true
            });
        }
        function handleClickOutside(e) {
            var _a;
            if (mergedShowRef.value
                && !((_a = triggerElRef.value) === null || _a === void 0 ? void 0 : _a.contains((0, seemly_1.getPreciseEventTarget)(e)))) {
                closeCalendar({
                    returnFocus: false
                });
            }
        }
        function handlePanelClose(disableUpdateOnClose) {
            closeCalendar({
                returnFocus: true,
                disableUpdateOnClose
            });
        }
        // --- Panel update value
        function handlePanelUpdateValue(value, doUpdate) {
            if (doUpdate) {
                doUpdateValue(value, { doConfirm: false });
            }
            else {
                doUpdatePendingValue(value);
            }
        }
        function handlePanelConfirm() {
            const pendingValue = pendingValueRef.value;
            doUpdateValue(Array.isArray(pendingValue)
                ? [pendingValue[0], pendingValue[1]]
                : pendingValue, { doConfirm: true });
        }
        // --- Refresh
        function deriveInputState() {
            const { value } = pendingValueRef;
            if (isRangeRef.value) {
                if (Array.isArray(value) || value === null) {
                    deriveRangeInputState(value);
                }
            }
            else {
                if (!Array.isArray(value)) {
                    deriveSingleInputState(value);
                }
            }
        }
        function deriveSingleInputState(value) {
            if (value === null) {
                singleInputValueRef.value = '';
            }
            else {
                singleInputValueRef.value = (0, date_fns_1.format)(value, mergedFormatRef.value, dateFnsOptionsRef.value);
            }
        }
        function deriveRangeInputState(values) {
            if (values === null) {
                rangeStartInputValueRef.value = '';
                rangeEndInputValueRef.value = '';
            }
            else {
                const dateFnsOptions = dateFnsOptionsRef.value;
                rangeStartInputValueRef.value = (0, date_fns_1.format)(values[0], mergedFormatRef.value, dateFnsOptions);
                rangeEndInputValueRef.value = (0, date_fns_1.format)(values[1], mergedFormatRef.value, dateFnsOptions);
            }
        }
        // --- Input deactivate & blur
        function handleInputActivate() {
            if (!mergedShowRef.value) {
                openCalendar();
            }
        }
        function handleInputBlur(e) {
            var _a;
            if (!((_a = panelInstRef.value) === null || _a === void 0 ? void 0 : _a.$el.contains(e.relatedTarget))) {
                doBlur(e);
                deriveInputState();
                closeCalendar({
                    returnFocus: false
                });
            }
        }
        function handleInputDeactivate() {
            if (mergedDisabledRef.value)
                return;
            deriveInputState();
            closeCalendar({
                returnFocus: false
            });
        }
        // --- Input
        function handleSingleUpdateValue(v) {
            // TODO, fix conflict with clear
            if (v === '') {
                doUpdateValue(null, { doConfirm: false });
                pendingValueRef.value = null;
                singleInputValueRef.value = '';
                return;
            }
            const newSelectedDateTime = (0, utils_1.strictParse)(v, mergedFormatRef.value, new Date(), dateFnsOptionsRef.value);
            if ((0, date_fns_1.isValid)(newSelectedDateTime)) {
                doUpdateValue((0, date_fns_1.getTime)(newSelectedDateTime), { doConfirm: false });
                deriveInputState();
            }
            else {
                singleInputValueRef.value = v;
            }
        }
        function handleRangeUpdateValue(v, { source }) {
            if (v[0] === '' && v[1] === '') {
                // clear or just delete all the inputs
                doUpdateValue(null, { doConfirm: false });
                pendingValueRef.value = null;
                rangeStartInputValueRef.value = '';
                rangeEndInputValueRef.value = '';
                return;
            }
            const [startTime, endTime] = v;
            const newStartTime = (0, utils_1.strictParse)(startTime, mergedFormatRef.value, new Date(), dateFnsOptionsRef.value);
            const newEndTime = (0, utils_1.strictParse)(endTime, mergedFormatRef.value, new Date(), dateFnsOptionsRef.value);
            if ((0, date_fns_1.isValid)(newStartTime) && (0, date_fns_1.isValid)(newEndTime)) {
                let newStartTs = (0, date_fns_1.getTime)(newStartTime);
                let newEndTs = (0, date_fns_1.getTime)(newEndTime);
                if (newEndTime < newStartTime) {
                    if (source === 0) {
                        newEndTs = newStartTs;
                    }
                    else {
                        newStartTs = newEndTs;
                    }
                }
                doUpdateValue([newStartTs, newEndTs], {
                    doConfirm: false
                });
                deriveInputState();
            }
            else {
                ;
                [rangeStartInputValueRef.value, rangeEndInputValueRef.value] = v;
            }
        }
        // --- Click
        function handleTriggerClick(e) {
            if (mergedDisabledRef.value)
                return;
            if ((0, seemly_1.happensIn)(e, 'clear'))
                return;
            if (!mergedShowRef.value) {
                openCalendar();
            }
        }
        // --- Focus
        function handleInputFocus(e) {
            if (mergedDisabledRef.value)
                return;
            doFocus(e);
        }
        // --- Calendar
        function openCalendar() {
            if (mergedDisabledRef.value || mergedShowRef.value)
                return;
            doUpdateShow(true);
        }
        function closeCalendar({ returnFocus, disableUpdateOnClose }) {
            var _a;
            if (mergedShowRef.value) {
                doUpdateShow(false);
                if (props.type !== 'date'
                    && props.updateValueOnClose
                    && !disableUpdateOnClose) {
                    handlePanelConfirm();
                }
                if (returnFocus) {
                    (_a = inputInstRef.value) === null || _a === void 0 ? void 0 : _a.focus();
                }
            }
        }
        // If new value is valid, set calendarTime and refresh display strings.
        // If new value is invalid, do nothing.
        (0, vue_1.watch)(pendingValueRef, () => {
            deriveInputState();
        });
        // init
        deriveInputState();
        (0, vue_1.watch)(mergedShowRef, (value) => {
            if (!value) {
                // close & restore original value
                // it won't conflict with props.value change
                // since when prop is passed, it is already
                // up to date.
                pendingValueRef.value = mergedValueRef.value;
            }
        });
        // use pending value to do validation
        const uniVaidation = (0, validation_utils_1.uniCalendarValidation)(props, pendingValueRef);
        const dualValidation = (0, validation_utils_1.dualCalendarValidation)(props, pendingValueRef);
        (0, vue_1.provide)(interface_1.datePickerInjectionKey, Object.assign(Object.assign(Object.assign({ mergedClsPrefixRef, mergedThemeRef: themeRef, timePickerSizeRef,
            localeRef,
            dateLocaleRef, firstDayOfWeekRef: (0, vue_1.toRef)(props, 'firstDayOfWeek'), isDateDisabledRef: (0, vue_1.toRef)(props, 'isDateDisabled'), rangesRef: (0, vue_1.toRef)(props, 'ranges'), timePickerPropsRef: (0, vue_1.toRef)(props, 'timePickerProps'), closeOnSelectRef: (0, vue_1.toRef)(props, 'closeOnSelect'), updateValueOnCloseRef: (0, vue_1.toRef)(props, 'updateValueOnClose'), monthFormatRef: (0, vue_1.toRef)(props, 'monthFormat'), yearFormatRef: (0, vue_1.toRef)(props, 'yearFormat'), quarterFormatRef: (0, vue_1.toRef)(props, 'quarterFormat'), yearRangeRef: (0, vue_1.toRef)(props, 'yearRange') }, uniVaidation), dualValidation), { datePickerSlots: slots }));
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
                '--n-bezier': cubicBezierEaseInOut,
                '--n-icon-color-override': iconColor,
                '--n-icon-color-disabled-override': iconColorDisabled
            };
        });
        const triggerThemeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('date-picker-trigger', undefined, triggerCssVarsRef, props)
            : undefined;
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { type } = props;
            const { common: { cubicBezierEaseInOut }, self: { calendarTitleFontSize, calendarDaysFontSize, itemFontSize, itemTextColor, itemColorDisabled, itemColorIncluded, itemColorHover, itemColorActive, itemBorderRadius, itemTextColorDisabled, itemTextColorActive, panelColor, panelTextColor, arrowColor, calendarTitleTextColor, panelActionDividerColor, panelHeaderDividerColor, calendarDaysDividerColor, panelBoxShadow, panelBorderRadius, calendarTitleFontWeight, panelExtraFooterPadding, panelActionPadding, itemSize, itemCellWidth, itemCellHeight, scrollItemWidth, scrollItemHeight, calendarTitlePadding, calendarTitleHeight, calendarDaysHeight, calendarDaysTextColor, arrowSize, panelHeaderPadding, calendarDividerColor, calendarTitleGridTempateColumns, iconColor, iconColorDisabled, scrollItemBorderRadius, calendarTitleColorHover, [(0, _utils_1.createKey)('calendarLeftPadding', type)]: calendarLeftPadding, [(0, _utils_1.createKey)('calendarRightPadding', type)]: calendarRightPadding } } = themeRef.value;
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-panel-border-radius': panelBorderRadius,
                '--n-panel-color': panelColor,
                '--n-panel-box-shadow': panelBoxShadow,
                '--n-panel-text-color': panelTextColor,
                // panel header
                '--n-panel-header-padding': panelHeaderPadding,
                '--n-panel-header-divider-color': panelHeaderDividerColor,
                // panel calendar
                '--n-calendar-left-padding': calendarLeftPadding,
                '--n-calendar-right-padding': calendarRightPadding,
                '--n-calendar-title-color-hover': calendarTitleColorHover,
                '--n-calendar-title-height': calendarTitleHeight,
                '--n-calendar-title-padding': calendarTitlePadding,
                '--n-calendar-title-font-size': calendarTitleFontSize,
                '--n-calendar-title-font-weight': calendarTitleFontWeight,
                '--n-calendar-title-text-color': calendarTitleTextColor,
                '--n-calendar-title-grid-template-columns': calendarTitleGridTempateColumns,
                '--n-calendar-days-height': calendarDaysHeight,
                '--n-calendar-days-divider-color': calendarDaysDividerColor,
                '--n-calendar-days-font-size': calendarDaysFontSize,
                '--n-calendar-days-text-color': calendarDaysTextColor,
                '--n-calendar-divider-color': calendarDividerColor,
                // panel action
                '--n-panel-action-padding': panelActionPadding,
                '--n-panel-extra-footer-padding': panelExtraFooterPadding,
                '--n-panel-action-divider-color': panelActionDividerColor,
                // panel item
                '--n-item-font-size': itemFontSize,
                '--n-item-border-radius': itemBorderRadius,
                '--n-item-size': itemSize,
                '--n-item-cell-width': itemCellWidth,
                '--n-item-cell-height': itemCellHeight,
                '--n-item-text-color': itemTextColor,
                '--n-item-color-included': itemColorIncluded,
                '--n-item-color-disabled': itemColorDisabled,
                '--n-item-color-hover': itemColorHover,
                '--n-item-color-active': itemColorActive,
                '--n-item-text-color-disabled': itemTextColorDisabled,
                '--n-item-text-color-active': itemTextColorActive,
                // scroll item
                '--n-scroll-item-width': scrollItemWidth,
                '--n-scroll-item-height': scrollItemHeight,
                '--n-scroll-item-border-radius': scrollItemBorderRadius,
                // panel arrow
                '--n-arrow-size': arrowSize,
                '--n-arrow-color': arrowColor,
                // icon in trigger
                '--n-icon-color': iconColor,
                '--n-icon-color-disabled': iconColorDisabled
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('date-picker', (0, vue_1.computed)(() => {
                return props.type;
            }), cssVarsRef, props)
            : undefined;
        return Object.assign(Object.assign({}, exposedMethods), { mergedStatus: mergedStatusRef, mergedClsPrefix: mergedClsPrefixRef, mergedBordered: mergedBorderedRef, namespace: namespaceRef, uncontrolledValue: uncontrolledValueRef, pendingValue: pendingValueRef, panelInstRef,
            triggerElRef,
            inputInstRef, isMounted: (0, vooks_1.useIsMounted)(), displayTime: singleInputValueRef, displayStartTime: rangeStartInputValueRef, displayEndTime: rangeEndInputValueRef, mergedShow: mergedShowRef, adjustedTo: (0, _utils_1.useAdjustedTo)(props), isRange: isRangeRef, localizedStartPlaceholder: localizedStartPlaceholderRef, localizedEndPlaceholder: localizedEndPlaceholderRef, mergedSize: mergedSizeRef, mergedDisabled: mergedDisabledRef, localizedPlacehoder: localizedPlacehoderRef, isValueInvalid: uniVaidation.isValueInvalidRef, isStartValueInvalid: dualValidation.isStartValueInvalidRef, isEndValueInvalid: dualValidation.isEndValueInvalidRef, handleInputKeydown,
            handleClickOutside,
            handleKeydown,
            handleClear,
            handlePanelClear,
            handleTriggerClick,
            handleInputActivate,
            handleInputDeactivate,
            handleInputFocus,
            handleInputBlur,
            handlePanelTabOut,
            handlePanelClose,
            handleRangeUpdateValue,
            handleSingleUpdateValue,
            handlePanelUpdateValue,
            handlePanelConfirm, mergedTheme: themeRef, actions: mergedActionsRef, triggerCssVars: inlineThemeDisabled ? undefined : triggerCssVarsRef, triggerThemeClass: triggerThemeClassHandle === null || triggerThemeClassHandle === void 0 ? void 0 : triggerThemeClassHandle.themeClass, triggerOnRender: triggerThemeClassHandle === null || triggerThemeClassHandle === void 0 ? void 0 : triggerThemeClassHandle.onRender, cssVars: inlineThemeDisabled ? undefined : cssVarsRef, themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass, onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender, onNextMonth: props.onNextMonth, onPrevMonth: props.onPrevMonth, onNextYear: props.onNextYear, onPrevYear: props.onPrevYear });
    },
    render() {
        const { clearable, triggerOnRender, mergedClsPrefix, $slots } = this;
        const commonPanelProps = {
            onUpdateValue: this.handlePanelUpdateValue,
            onTabOut: this.handlePanelTabOut,
            onClose: this.handlePanelClose,
            onClear: this.handlePanelClear,
            onKeydown: this.handleKeydown,
            onConfirm: this.handlePanelConfirm,
            ref: 'panelInstRef',
            value: this.pendingValue,
            active: this.mergedShow,
            actions: this.actions,
            shortcuts: this.shortcuts,
            style: this.cssVars,
            defaultTime: this.defaultTime,
            themeClass: this.themeClass,
            panel: this.panel,
            inputReadonly: this.inputReadonly || this.mergedDisabled,
            onRender: this.onRender,
            onNextMonth: this.onNextMonth,
            onPrevMonth: this.onPrevMonth,
            onNextYear: this.onNextYear,
            onPrevYear: this.onPrevYear,
            timePickerFormat: this.timePickerFormat,
            dateFormat: this.dateFormat,
            fastYearSelect: this.fastYearSelect,
            fastMonthSelect: this.fastMonthSelect,
            calendarDayFormat: this.calendarDayFormat,
            calendarHeaderYearFormat: this.calendarHeaderYearFormat,
            calendarHeaderMonthFormat: this.calendarHeaderMonthFormat,
            calendarHeaderMonthYearSeparator: this.calendarHeaderMonthYearSeparator,
            calendarHeaderMonthBeforeYear: this.calendarHeaderMonthBeforeYear
        };
        const renderPanel = () => {
            const { type } = this;
            return type === 'datetime' ? ((0, vue_1.h)(datetime_1.default, Object.assign({}, commonPanelProps, { defaultCalendarStartTime: this.defaultCalendarStartTime }), $slots)) : type === 'daterange' ? ((0, vue_1.h)(daterange_1.default, Object.assign({}, commonPanelProps, { defaultCalendarStartTime: this.defaultCalendarStartTime, defaultCalendarEndTime: this.defaultCalendarEndTime, bindCalendarMonths: this.bindCalendarMonths }), $slots)) : type === 'datetimerange' ? ((0, vue_1.h)(datetimerange_1.default, Object.assign({}, commonPanelProps, { defaultCalendarStartTime: this.defaultCalendarStartTime, defaultCalendarEndTime: this.defaultCalendarEndTime, bindCalendarMonths: this.bindCalendarMonths }), $slots)) : type === 'month' || type === 'year' || type === 'quarter' ? ((0, vue_1.h)(month_1.default, Object.assign({}, commonPanelProps, { type: type, key: type }))) : type === 'monthrange'
                || type === 'yearrange'
                || type === 'quarterrange' ? ((0, vue_1.h)(monthrange_1.default, Object.assign({}, commonPanelProps, { type: type }))) : ((0, vue_1.h)(date_1.default, Object.assign({}, commonPanelProps, { type: type, defaultCalendarStartTime: this.defaultCalendarStartTime }), $slots));
        };
        if (this.panel) {
            return renderPanel();
        }
        triggerOnRender === null || triggerOnRender === void 0 ? void 0 : triggerOnRender();
        const commonInputProps = {
            bordered: this.mergedBordered,
            size: this.mergedSize,
            passivelyActivated: true,
            disabled: this.mergedDisabled,
            readonly: this.inputReadonly || this.mergedDisabled,
            clearable,
            onClear: this.handleClear,
            onClick: this.handleTriggerClick,
            onKeydown: this.handleInputKeydown,
            onActivate: this.handleInputActivate,
            onDeactivate: this.handleInputDeactivate,
            onFocus: this.handleInputFocus,
            onBlur: this.handleInputBlur
        };
        return ((0, vue_1.h)("div", { ref: "triggerElRef", class: [
                `${mergedClsPrefix}-date-picker`,
                this.mergedDisabled && `${mergedClsPrefix}-date-picker--disabled`,
                this.isRange && `${mergedClsPrefix}-date-picker--range`,
                this.triggerThemeClass
            ], style: this.triggerCssVars, onKeydown: this.handleKeydown },
            (0, vue_1.h)(vueuc_1.VBinder, null, {
                default: () => [
                    (0, vue_1.h)(vueuc_1.VTarget, null, {
                        default: () => this.isRange ? ((0, vue_1.h)(input_1.NInput, Object.assign({ ref: "inputInstRef", status: this.mergedStatus, value: [this.displayStartTime, this.displayEndTime], placeholder: [
                                this.localizedStartPlaceholder,
                                this.localizedEndPlaceholder
                            ], textDecoration: [
                                this.isStartValueInvalid ? 'line-through' : '',
                                this.isEndValueInvalid ? 'line-through' : ''
                            ], pair: true, onUpdateValue: this.handleRangeUpdateValue, theme: this.mergedTheme.peers.Input, themeOverrides: this.mergedTheme.peerOverrides.Input, internalForceFocus: this.mergedShow, internalDeactivateOnEnter: true }, commonInputProps), {
                            separator: () => this.separator === undefined
                                ? (0, _utils_1.resolveSlot)($slots.separator, () => [
                                    (0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: mergedClsPrefix, class: `${mergedClsPrefix}-date-picker-icon` }, {
                                        default: () => (0, vue_1.h)(icons_1.ToIcon, null)
                                    })
                                ])
                                : this.separator,
                            [clearable ? 'clear-icon-placeholder' : 'suffix']: () => (0, _utils_1.resolveSlot)($slots['date-icon'], () => [
                                (0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: mergedClsPrefix, class: `${mergedClsPrefix}-date-picker-icon` }, {
                                    default: () => (0, vue_1.h)(icons_1.DateIcon, null)
                                })
                            ])
                        })) : ((0, vue_1.h)(input_1.NInput, Object.assign({ ref: "inputInstRef", status: this.mergedStatus, value: this.displayTime, placeholder: this.localizedPlacehoder, textDecoration: this.isValueInvalid && !this.isRange
                                ? 'line-through'
                                : '', onUpdateValue: this.handleSingleUpdateValue, theme: this.mergedTheme.peers.Input, themeOverrides: this.mergedTheme.peerOverrides.Input, internalForceFocus: this.mergedShow, internalDeactivateOnEnter: true }, commonInputProps), {
                            [clearable ? 'clear-icon-placeholder' : 'suffix']: () => ((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: mergedClsPrefix, class: `${mergedClsPrefix}-date-picker-icon` }, {
                                default: () => (0, _utils_1.resolveSlot)($slots['date-icon'], () => [
                                    (0, vue_1.h)(icons_1.DateIcon, null)
                                ])
                            }))
                        }))
                    }),
                    (0, vue_1.h)(vueuc_1.VFollower, { show: this.mergedShow, containerClass: this.namespace, to: this.adjustedTo, teleportDisabled: this.adjustedTo === _utils_1.useAdjustedTo.tdkey, placement: this.placement }, {
                        default: () => ((0, vue_1.h)(vue_1.Transition, { name: "fade-in-scale-up-transition", appear: this.isMounted }, {
                            default: () => {
                                if (!this.mergedShow)
                                    return null;
                                return (0, vue_1.withDirectives)(renderPanel(), [
                                    [
                                        vdirs_1.clickoutside,
                                        this.handleClickOutside,
                                        undefined,
                                        { capture: true }
                                    ]
                                ]);
                            }
                        }))
                    })
                ]
            })));
    }
});
