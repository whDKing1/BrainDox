"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformNaiveFirstDayOfWeekToDateFns = transformNaiveFirstDayOfWeekToDateFns;
exports.dateArray = dateArray;
exports.extractRangeDefaultTime = extractRangeDefaultTime;
exports.extractSingleDefaultTime = extractSingleDefaultTime;
exports.getDefaultTime = getDefaultTime;
exports.getDerivedTimeFromKeyboardEvent = getDerivedTimeFromKeyboardEvent;
exports.getMonthString = getMonthString;
exports.getQuarterString = getQuarterString;
exports.getYearString = getYearString;
exports.monthArray = monthArray;
exports.pluckValueFromRange = pluckValueFromRange;
exports.quarterArray = quarterArray;
exports.strictParse = strictParse;
exports.yearArray = yearArray;
const date_fns_1 = require("date-fns");
function getDerivedTimeFromKeyboardEvent(prevValue, event) {
    const now = (0, date_fns_1.getTime)(Date.now());
    if (typeof prevValue !== 'number')
        return now;
    switch (event.key) {
        case 'ArrowUp':
            return (0, date_fns_1.getTime)((0, date_fns_1.addDays)(prevValue, -7));
        case 'ArrowDown':
            return (0, date_fns_1.getTime)((0, date_fns_1.addDays)(prevValue, 7));
        case 'ArrowRight':
            return (0, date_fns_1.getTime)((0, date_fns_1.addDays)(prevValue, 1));
        case 'ArrowLeft':
            return (0, date_fns_1.getTime)((0, date_fns_1.addDays)(prevValue, -1));
    }
    return now;
}
const matcherMap = {
    date: date_fns_1.isSameDay,
    month: date_fns_1.isSameMonth,
    year: date_fns_1.isSameYear,
    quarter: date_fns_1.isSameQuarter
};
function makeWeekMatcher(firstDayOfWeek) {
    return (sourceTime, patternTime) => {
        // date-fns: 0 - Sunday
        // naive-ui: 0 - Monday
        const weekStartsOn = transformNaiveFirstDayOfWeekToDateFns(firstDayOfWeek);
        return (0, date_fns_1.isSameWeek)(sourceTime, patternTime, { weekStartsOn });
    };
}
function transformNaiveFirstDayOfWeekToDateFns(firstDayOfWeek) {
    return ((firstDayOfWeek + 1) % 7);
}
function matchDate(sourceTime, patternTime, type, firstDayOfWeek = 0) {
    const matcher = type === 'week' ? makeWeekMatcher(firstDayOfWeek) : matcherMap[type];
    return matcher(sourceTime, patternTime);
}
function dateOrWeekItem(time, monthTs, valueTs, currentTs, mode, firstDayOfWeek) {
    if (mode === 'date') {
        return dateItem(time, monthTs, valueTs, currentTs);
    }
    else {
        return weekItem(time, monthTs, valueTs, currentTs, firstDayOfWeek);
    }
}
// date item's valueTs can be a tuple since two date may show in one panel, so
// any matched value would make it shown as selected
function dateItem(time, monthTs, valueTs, currentTs) {
    let inSpan = false;
    let startOfSpan = false;
    let endOfSpan = false;
    if (Array.isArray(valueTs)) {
        if (valueTs[0] < time && time < valueTs[1]) {
            inSpan = true;
        }
        if (matchDate(valueTs[0], time, 'date'))
            startOfSpan = true;
        if (matchDate(valueTs[1], time, 'date'))
            endOfSpan = true;
    }
    const selected = valueTs !== null
        && (Array.isArray(valueTs)
            ? matchDate(valueTs[0], time, 'date')
                || matchDate(valueTs[1], time, 'date')
            : matchDate(valueTs, time, 'date'));
    return {
        type: 'date',
        dateObject: {
            date: (0, date_fns_1.getDate)(time),
            month: (0, date_fns_1.getMonth)(time),
            year: (0, date_fns_1.getYear)(time)
        },
        inCurrentMonth: (0, date_fns_1.isSameMonth)(time, monthTs),
        isCurrentDate: matchDate(currentTs, time, 'date'),
        inSpan,
        inSelectedWeek: false,
        startOfSpan,
        endOfSpan,
        selected,
        ts: (0, date_fns_1.getTime)(time)
    };
}
function getMonthString(month, monthFormat, locale) {
    const date = new Date(2000, month, 1).getTime();
    return (0, date_fns_1.format)(date, monthFormat, { locale });
}
function getYearString(year, yearFormat, locale) {
    const date = new Date(year, 1, 1).getTime();
    return (0, date_fns_1.format)(date, yearFormat, { locale });
}
function getQuarterString(quarter, quarterFormat, locale) {
    const date = new Date(2000, quarter * 3 - 2, 1).getTime();
    return (0, date_fns_1.format)(date, quarterFormat, { locale });
}
function weekItem(time, monthTs, valueTs, currentTs, firstDayOfWeek) {
    let inSpan = false;
    let startOfSpan = false;
    let endOfSpan = false;
    if (Array.isArray(valueTs)) {
        if (valueTs[0] < time && time < valueTs[1]) {
            inSpan = true;
        }
        if (matchDate(valueTs[0], time, 'week', firstDayOfWeek))
            startOfSpan = true;
        if (matchDate(valueTs[1], time, 'week', firstDayOfWeek))
            endOfSpan = true;
    }
    const inSelectedWeek = valueTs !== null
        && (Array.isArray(valueTs)
            ? matchDate(valueTs[0], time, 'week', firstDayOfWeek)
                || matchDate(valueTs[1], time, 'week', firstDayOfWeek)
            : matchDate(valueTs, time, 'week', firstDayOfWeek));
    return {
        type: 'date',
        dateObject: {
            date: (0, date_fns_1.getDate)(time),
            month: (0, date_fns_1.getMonth)(time),
            year: (0, date_fns_1.getYear)(time)
        },
        inCurrentMonth: (0, date_fns_1.isSameMonth)(time, monthTs),
        isCurrentDate: matchDate(currentTs, time, 'date'),
        inSpan,
        startOfSpan,
        endOfSpan,
        selected: false,
        inSelectedWeek,
        ts: (0, date_fns_1.getTime)(time)
    };
}
function monthItem(monthTs, valueTs, currentTs, { monthFormat }) {
    return {
        type: 'month',
        monthFormat,
        dateObject: {
            month: (0, date_fns_1.getMonth)(monthTs),
            year: (0, date_fns_1.getYear)(monthTs)
        },
        isCurrent: (0, date_fns_1.isSameMonth)(currentTs, monthTs),
        selected: valueTs !== null && matchDate(valueTs, monthTs, 'month'),
        ts: (0, date_fns_1.getTime)(monthTs)
    };
}
function yearItem(yearTs, valueTs, currentTs, { yearFormat }) {
    return {
        type: 'year',
        yearFormat,
        dateObject: {
            year: (0, date_fns_1.getYear)(yearTs)
        },
        isCurrent: (0, date_fns_1.isSameYear)(currentTs, yearTs),
        selected: valueTs !== null && matchDate(valueTs, yearTs, 'year'),
        ts: (0, date_fns_1.getTime)(yearTs)
    };
}
function quarterItem(quarterTs, valueTs, currentTs, { quarterFormat }) {
    return {
        type: 'quarter',
        quarterFormat,
        dateObject: {
            quarter: (0, date_fns_1.getQuarter)(quarterTs),
            year: (0, date_fns_1.getYear)(quarterTs)
        },
        isCurrent: (0, date_fns_1.isSameQuarter)(currentTs, quarterTs),
        selected: valueTs !== null && matchDate(valueTs, quarterTs, 'quarter'),
        ts: (0, date_fns_1.getTime)(quarterTs)
    };
}
/**
 * Given time to display calendar, given the selected time, given current time,
 * return the date array of display time's month.
 */
function dateArray(monthTs, valueTs, currentTs, startDay, strip = false, weekMode = false) {
    const granularity = weekMode ? 'week' : 'date';
    const displayMonth = (0, date_fns_1.getMonth)(monthTs);
    // First day of current month
    let displayMonthIterator = (0, date_fns_1.getTime)((0, date_fns_1.startOfMonth)(monthTs));
    // Last day of last month
    let lastMonthIterator = (0, date_fns_1.getTime)((0, date_fns_1.addDays)(displayMonthIterator, -1));
    const calendarDays = [];
    let protectLastMonthDateIsShownFlag = !strip;
    while ((0, date_fns_1.getDay)(lastMonthIterator) !== startDay
        || protectLastMonthDateIsShownFlag) {
        calendarDays.unshift(dateOrWeekItem(lastMonthIterator, monthTs, valueTs, currentTs, granularity, startDay));
        lastMonthIterator = (0, date_fns_1.getTime)((0, date_fns_1.addDays)(lastMonthIterator, -1));
        protectLastMonthDateIsShownFlag = false;
    }
    while ((0, date_fns_1.getMonth)(displayMonthIterator) === displayMonth) {
        calendarDays.push(dateOrWeekItem(displayMonthIterator, monthTs, valueTs, currentTs, granularity, startDay));
        displayMonthIterator = (0, date_fns_1.getTime)((0, date_fns_1.addDays)(displayMonthIterator, 1));
    }
    const endIndex = strip
        ? calendarDays.length <= 28
            ? 28
            : calendarDays.length <= 35
                ? 35
                : 42
        : 42;
    while (calendarDays.length < endIndex) {
        calendarDays.push(dateOrWeekItem(displayMonthIterator, monthTs, valueTs, currentTs, granularity, startDay));
        displayMonthIterator = (0, date_fns_1.getTime)((0, date_fns_1.addDays)(displayMonthIterator, 1));
    }
    return calendarDays;
}
function monthArray(yearAnchorTs, valueTs, currentTs, format) {
    const calendarMonths = [];
    const yearStart = (0, date_fns_1.startOfYear)(yearAnchorTs);
    for (let i = 0; i < 12; i++) {
        calendarMonths.push(monthItem((0, date_fns_1.getTime)((0, date_fns_1.addMonths)(yearStart, i)), valueTs, currentTs, format));
    }
    return calendarMonths;
}
function quarterArray(yearAnchorTs, valueTs, currentTs, format) {
    const calendarQuarters = [];
    const yearStart = (0, date_fns_1.startOfYear)(yearAnchorTs);
    for (let i = 0; i < 4; i++) {
        calendarQuarters.push(quarterItem((0, date_fns_1.getTime)((0, date_fns_1.addQuarters)(yearStart, i)), valueTs, currentTs, format));
    }
    return calendarQuarters;
}
function yearArray(valueTs, currentTs, format, rangeRef) {
    const range = rangeRef.value;
    const calendarYears = [];
    const startTime = (0, date_fns_1.startOfYear)((0, date_fns_1.setYear)(new Date(), range[0]));
    for (let i = 0; i < range[1] - range[0]; i++) {
        calendarYears.push(yearItem((0, date_fns_1.getTime)((0, date_fns_1.addYears)(startTime, i)), valueTs, currentTs, format));
    }
    return calendarYears;
}
function strictParse(string, pattern, backup, option) {
    const result = (0, date_fns_1.parse)(string, pattern, backup, option);
    if (!(0, date_fns_1.isValid)(result))
        return result;
    else if ((0, date_fns_1.format)(result, pattern, option) === string)
        return result;
    else
        return new Date(Number.NaN);
}
function extractSingleDefaultTime(timestamp, defaultTimeExtractor) {
    const extractedTime = defaultTimeExtractor(timestamp);
    return getDefaultTime(extractedTime);
}
function extractRangeDefaultTime(timestamp, defaultTimeExtractor, position, value) {
    const extractedTime = defaultTimeExtractor(timestamp, position, value);
    return getDefaultTime(extractedTime);
}
function getDefaultTime(timeValue) {
    if (timeValue === undefined) {
        return undefined;
    }
    if (typeof timeValue === 'number') {
        return timeValue;
    }
    const [hour, minute, second] = timeValue.split(':');
    return {
        hours: Number(hour),
        minutes: Number(minute),
        seconds: Number(second)
    };
}
function pluckValueFromRange(value, type) {
    return Array.isArray(value) ? value[type === 'start' ? 0 : 1] : null;
}
