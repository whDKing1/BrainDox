"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniCalendarValidation = uniCalendarValidation;
exports.dualCalendarValidation = dualCalendarValidation;
const date_fns_1 = require("date-fns");
const vue_1 = require("vue");
function uniCalendarValidation(props, mergedValueRef) {
    // date, datetime
    const timePickerValidatorRef = (0, vue_1.computed)(() => {
        const { isTimeDisabled } = props;
        const { value } = mergedValueRef;
        if (value === null || Array.isArray(value))
            return undefined;
        return isTimeDisabled === null || isTimeDisabled === void 0 ? void 0 : isTimeDisabled(value);
    });
    const isHourDisabledRef = (0, vue_1.computed)(() => {
        var _a;
        return (_a = timePickerValidatorRef.value) === null || _a === void 0 ? void 0 : _a.isHourDisabled;
    });
    const isMinuteDisabledRef = (0, vue_1.computed)(() => {
        var _a;
        return (_a = timePickerValidatorRef.value) === null || _a === void 0 ? void 0 : _a.isMinuteDisabled;
    });
    const isSecondDisabledRef = (0, vue_1.computed)(() => {
        var _a;
        return (_a = timePickerValidatorRef.value) === null || _a === void 0 ? void 0 : _a.isSecondDisabled;
    });
    const isDateInvalidRef = (0, vue_1.computed)(() => {
        const { type, isDateDisabled } = props;
        const { value } = mergedValueRef;
        if (value === null
            || Array.isArray(value)
            || !['date', 'datetime'].includes(type)
            || !isDateDisabled) {
            return false;
        }
        return isDateDisabled(value, { type: 'input' });
    });
    const isTimeInvalidRef = (0, vue_1.computed)(() => {
        const { type } = props;
        const { value } = mergedValueRef;
        if (value === null || !(type !== 'datetime') || Array.isArray(value)) {
            return false;
        }
        const time = new Date(value);
        const hour = time.getHours();
        const minute = time.getMinutes();
        const second = time.getMinutes();
        return ((isHourDisabledRef.value ? isHourDisabledRef.value(hour) : false)
            || (isMinuteDisabledRef.value
                ? isMinuteDisabledRef.value(minute, hour)
                : false)
            || (isSecondDisabledRef.value
                ? isSecondDisabledRef.value(second, minute, hour)
                : false));
    });
    const isDateTimeInvalidRef = (0, vue_1.computed)(() => {
        return isDateInvalidRef.value || isTimeInvalidRef.value;
    });
    const isValueInvalidRef = (0, vue_1.computed)(() => {
        const { type } = props;
        if (type === 'date')
            return isDateInvalidRef.value;
        if (type === 'datetime')
            return isDateTimeInvalidRef.value;
        return false;
    });
    return {
        // date & datetime
        isValueInvalidRef,
        isDateInvalidRef,
        // datetime only
        isTimeInvalidRef,
        isDateTimeInvalidRef,
        isHourDisabledRef,
        isMinuteDisabledRef,
        isSecondDisabledRef
    };
}
function dualCalendarValidation(props, mergedValueRef) {
    // daterange, datetimerange
    const timePickerValidatorRef = (0, vue_1.computed)(() => {
        const { isTimeDisabled } = props;
        const { value } = mergedValueRef;
        if (!Array.isArray(value) || !isTimeDisabled) {
            return [undefined, undefined];
        }
        return [
            isTimeDisabled === null || isTimeDisabled === void 0 ? void 0 : isTimeDisabled(value[0], 'start', value),
            isTimeDisabled === null || isTimeDisabled === void 0 ? void 0 : isTimeDisabled(value[1], 'end', value)
        ];
    });
    const timeValidator = {
        isStartHourDisabledRef: (0, vue_1.computed)(() => { var _a; return (_a = timePickerValidatorRef.value[0]) === null || _a === void 0 ? void 0 : _a.isHourDisabled; }),
        isEndHourDisabledRef: (0, vue_1.computed)(() => { var _a; return (_a = timePickerValidatorRef.value[1]) === null || _a === void 0 ? void 0 : _a.isHourDisabled; }),
        isStartMinuteDisabledRef: (0, vue_1.computed)(() => { var _a; return (_a = timePickerValidatorRef.value[0]) === null || _a === void 0 ? void 0 : _a.isMinuteDisabled; }),
        isEndMinuteDisabledRef: (0, vue_1.computed)(() => { var _a; return (_a = timePickerValidatorRef.value[1]) === null || _a === void 0 ? void 0 : _a.isMinuteDisabled; }),
        isStartSecondDisabledRef: (0, vue_1.computed)(() => { var _a; return (_a = timePickerValidatorRef.value[0]) === null || _a === void 0 ? void 0 : _a.isSecondDisabled; }),
        isEndSecondDisabledRef: (0, vue_1.computed)(() => { var _a; return (_a = timePickerValidatorRef.value[1]) === null || _a === void 0 ? void 0 : _a.isSecondDisabled; })
    };
    const isStartDateInvalidRef = (0, vue_1.computed)(() => {
        const { type, isDateDisabled } = props;
        const { value } = mergedValueRef;
        if (value === null
            || !Array.isArray(value)
            || !['daterange', 'datetimerange'].includes(type)
            || !isDateDisabled) {
            return false;
        }
        return isDateDisabled(value[0], 'start', value);
    });
    const isEndDateInvalidRef = (0, vue_1.computed)(() => {
        const { type, isDateDisabled } = props;
        const { value } = mergedValueRef;
        if (value === null
            || !Array.isArray(value)
            || !['daterange', 'datetimerange'].includes(type)
            || !isDateDisabled) {
            return false;
        }
        return isDateDisabled(value[1], 'end', value);
    });
    const isStartTimeInvalidRef = (0, vue_1.computed)(() => {
        const { type } = props;
        const { value } = mergedValueRef;
        if (value === null || !Array.isArray(value) || type !== 'datetimerange') {
            return false;
        }
        const startHours = (0, date_fns_1.getHours)(value[0]);
        const startMinutes = (0, date_fns_1.getMinutes)(value[0]);
        const startSeconds = (0, date_fns_1.getSeconds)(value[0]);
        const { isStartHourDisabledRef, isStartMinuteDisabledRef, isStartSecondDisabledRef } = timeValidator;
        const startTimeInvalid = (isStartHourDisabledRef.value
            ? isStartHourDisabledRef.value(startHours)
            : false)
            || (isStartMinuteDisabledRef.value
                ? isStartMinuteDisabledRef.value(startMinutes, startHours)
                : false)
            || (isStartSecondDisabledRef.value
                ? isStartSecondDisabledRef.value(startSeconds, startMinutes, startHours)
                : false);
        return startTimeInvalid;
    });
    const isEndTimeInvalidRef = (0, vue_1.computed)(() => {
        const { type } = props;
        const { value } = mergedValueRef;
        if (value === null || !Array.isArray(value) || type !== 'datetimerange') {
            return false;
        }
        const endHours = (0, date_fns_1.getHours)(value[1]);
        const endMinutes = (0, date_fns_1.getMinutes)(value[1]);
        const endSeconds = (0, date_fns_1.getSeconds)(value[1]);
        const { isEndHourDisabledRef, isEndMinuteDisabledRef, isEndSecondDisabledRef } = timeValidator;
        const endTimeInvalid = (isEndHourDisabledRef.value
            ? isEndHourDisabledRef.value(endHours)
            : false)
            || (isEndMinuteDisabledRef.value
                ? isEndMinuteDisabledRef.value(endMinutes, endHours)
                : false)
            || (isEndSecondDisabledRef.value
                ? isEndSecondDisabledRef.value(endSeconds, endMinutes, endHours)
                : false);
        return endTimeInvalid;
    });
    const isStartValueInvalidRef = (0, vue_1.computed)(() => {
        return isStartDateInvalidRef.value || isStartTimeInvalidRef.value;
    });
    const isEndValueInvalidRef = (0, vue_1.computed)(() => {
        return isEndDateInvalidRef.value || isEndTimeInvalidRef.value;
    });
    const isRangeInvalidRef = (0, vue_1.computed)(() => {
        return isStartValueInvalidRef.value || isEndValueInvalidRef.value;
    });
    return Object.assign(Object.assign({}, timeValidator), { isStartDateInvalidRef,
        isEndDateInvalidRef,
        isStartTimeInvalidRef,
        isEndTimeInvalidRef,
        isStartValueInvalidRef,
        isEndValueInvalidRef,
        isRangeInvalidRef });
}
