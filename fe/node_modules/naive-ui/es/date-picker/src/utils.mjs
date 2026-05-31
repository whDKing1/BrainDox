import { addDays, addMonths, addQuarters, addYears, format, getDate, getDay, getMonth, getQuarter, getTime, getYear, isSameDay, isSameMonth, isSameQuarter, isSameWeek, isSameYear, isValid, parse, setYear, startOfMonth, startOfYear } from 'date-fns';
function getDerivedTimeFromKeyboardEvent(prevValue, event) {
  const now = getTime(Date.now());
  if (typeof prevValue !== 'number') return now;
  switch (event.key) {
    case 'ArrowUp':
      return getTime(addDays(prevValue, -7));
    case 'ArrowDown':
      return getTime(addDays(prevValue, 7));
    case 'ArrowRight':
      return getTime(addDays(prevValue, 1));
    case 'ArrowLeft':
      return getTime(addDays(prevValue, -1));
  }
  return now;
}
const matcherMap = {
  date: isSameDay,
  month: isSameMonth,
  year: isSameYear,
  quarter: isSameQuarter
};
function makeWeekMatcher(firstDayOfWeek) {
  return (sourceTime, patternTime) => {
    // date-fns: 0 - Sunday
    // naive-ui: 0 - Monday
    const weekStartsOn = transformNaiveFirstDayOfWeekToDateFns(firstDayOfWeek);
    return isSameWeek(sourceTime, patternTime, {
      weekStartsOn
    });
  };
}
export function transformNaiveFirstDayOfWeekToDateFns(firstDayOfWeek) {
  return (firstDayOfWeek + 1) % 7;
}
function matchDate(sourceTime, patternTime, type, firstDayOfWeek = 0) {
  const matcher = type === 'week' ? makeWeekMatcher(firstDayOfWeek) : matcherMap[type];
  return matcher(sourceTime, patternTime);
}
function dateOrWeekItem(time, monthTs, valueTs, currentTs, mode, firstDayOfWeek) {
  if (mode === 'date') {
    return dateItem(time, monthTs, valueTs, currentTs);
  } else {
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
    if (matchDate(valueTs[0], time, 'date')) startOfSpan = true;
    if (matchDate(valueTs[1], time, 'date')) endOfSpan = true;
  }
  const selected = valueTs !== null && (Array.isArray(valueTs) ? matchDate(valueTs[0], time, 'date') || matchDate(valueTs[1], time, 'date') : matchDate(valueTs, time, 'date'));
  return {
    type: 'date',
    dateObject: {
      date: getDate(time),
      month: getMonth(time),
      year: getYear(time)
    },
    inCurrentMonth: isSameMonth(time, monthTs),
    isCurrentDate: matchDate(currentTs, time, 'date'),
    inSpan,
    inSelectedWeek: false,
    startOfSpan,
    endOfSpan,
    selected,
    ts: getTime(time)
  };
}
function getMonthString(month, monthFormat, locale) {
  const date = new Date(2000, month, 1).getTime();
  return format(date, monthFormat, {
    locale
  });
}
function getYearString(year, yearFormat, locale) {
  const date = new Date(year, 1, 1).getTime();
  return format(date, yearFormat, {
    locale
  });
}
function getQuarterString(quarter, quarterFormat, locale) {
  const date = new Date(2000, quarter * 3 - 2, 1).getTime();
  return format(date, quarterFormat, {
    locale
  });
}
function weekItem(time, monthTs, valueTs, currentTs, firstDayOfWeek) {
  let inSpan = false;
  let startOfSpan = false;
  let endOfSpan = false;
  if (Array.isArray(valueTs)) {
    if (valueTs[0] < time && time < valueTs[1]) {
      inSpan = true;
    }
    if (matchDate(valueTs[0], time, 'week', firstDayOfWeek)) startOfSpan = true;
    if (matchDate(valueTs[1], time, 'week', firstDayOfWeek)) endOfSpan = true;
  }
  const inSelectedWeek = valueTs !== null && (Array.isArray(valueTs) ? matchDate(valueTs[0], time, 'week', firstDayOfWeek) || matchDate(valueTs[1], time, 'week', firstDayOfWeek) : matchDate(valueTs, time, 'week', firstDayOfWeek));
  return {
    type: 'date',
    dateObject: {
      date: getDate(time),
      month: getMonth(time),
      year: getYear(time)
    },
    inCurrentMonth: isSameMonth(time, monthTs),
    isCurrentDate: matchDate(currentTs, time, 'date'),
    inSpan,
    startOfSpan,
    endOfSpan,
    selected: false,
    inSelectedWeek,
    ts: getTime(time)
  };
}
function monthItem(monthTs, valueTs, currentTs, {
  monthFormat
}) {
  return {
    type: 'month',
    monthFormat,
    dateObject: {
      month: getMonth(monthTs),
      year: getYear(monthTs)
    },
    isCurrent: isSameMonth(currentTs, monthTs),
    selected: valueTs !== null && matchDate(valueTs, monthTs, 'month'),
    ts: getTime(monthTs)
  };
}
function yearItem(yearTs, valueTs, currentTs, {
  yearFormat
}) {
  return {
    type: 'year',
    yearFormat,
    dateObject: {
      year: getYear(yearTs)
    },
    isCurrent: isSameYear(currentTs, yearTs),
    selected: valueTs !== null && matchDate(valueTs, yearTs, 'year'),
    ts: getTime(yearTs)
  };
}
function quarterItem(quarterTs, valueTs, currentTs, {
  quarterFormat
}) {
  return {
    type: 'quarter',
    quarterFormat,
    dateObject: {
      quarter: getQuarter(quarterTs),
      year: getYear(quarterTs)
    },
    isCurrent: isSameQuarter(currentTs, quarterTs),
    selected: valueTs !== null && matchDate(valueTs, quarterTs, 'quarter'),
    ts: getTime(quarterTs)
  };
}
/**
 * Given time to display calendar, given the selected time, given current time,
 * return the date array of display time's month.
 */
function dateArray(monthTs, valueTs, currentTs, startDay, strip = false, weekMode = false) {
  const granularity = weekMode ? 'week' : 'date';
  const displayMonth = getMonth(monthTs);
  // First day of current month
  let displayMonthIterator = getTime(startOfMonth(monthTs));
  // Last day of last month
  let lastMonthIterator = getTime(addDays(displayMonthIterator, -1));
  const calendarDays = [];
  let protectLastMonthDateIsShownFlag = !strip;
  while (getDay(lastMonthIterator) !== startDay || protectLastMonthDateIsShownFlag) {
    calendarDays.unshift(dateOrWeekItem(lastMonthIterator, monthTs, valueTs, currentTs, granularity, startDay));
    lastMonthIterator = getTime(addDays(lastMonthIterator, -1));
    protectLastMonthDateIsShownFlag = false;
  }
  while (getMonth(displayMonthIterator) === displayMonth) {
    calendarDays.push(dateOrWeekItem(displayMonthIterator, monthTs, valueTs, currentTs, granularity, startDay));
    displayMonthIterator = getTime(addDays(displayMonthIterator, 1));
  }
  const endIndex = strip ? calendarDays.length <= 28 ? 28 : calendarDays.length <= 35 ? 35 : 42 : 42;
  while (calendarDays.length < endIndex) {
    calendarDays.push(dateOrWeekItem(displayMonthIterator, monthTs, valueTs, currentTs, granularity, startDay));
    displayMonthIterator = getTime(addDays(displayMonthIterator, 1));
  }
  return calendarDays;
}
function monthArray(yearAnchorTs, valueTs, currentTs, format) {
  const calendarMonths = [];
  const yearStart = startOfYear(yearAnchorTs);
  for (let i = 0; i < 12; i++) {
    calendarMonths.push(monthItem(getTime(addMonths(yearStart, i)), valueTs, currentTs, format));
  }
  return calendarMonths;
}
function quarterArray(yearAnchorTs, valueTs, currentTs, format) {
  const calendarQuarters = [];
  const yearStart = startOfYear(yearAnchorTs);
  for (let i = 0; i < 4; i++) {
    calendarQuarters.push(quarterItem(getTime(addQuarters(yearStart, i)), valueTs, currentTs, format));
  }
  return calendarQuarters;
}
function yearArray(valueTs, currentTs, format, rangeRef) {
  const range = rangeRef.value;
  const calendarYears = [];
  const startTime = startOfYear(setYear(new Date(), range[0]));
  for (let i = 0; i < range[1] - range[0]; i++) {
    calendarYears.push(yearItem(getTime(addYears(startTime, i)), valueTs, currentTs, format));
  }
  return calendarYears;
}
function strictParse(string, pattern, backup, option) {
  const result = parse(string, pattern, backup, option);
  if (!isValid(result)) return result;else if (format(result, pattern, option) === string) return result;else return new Date(Number.NaN);
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
export { dateArray, extractRangeDefaultTime, extractSingleDefaultTime, getDefaultTime, getDerivedTimeFromKeyboardEvent, getMonthString, getQuarterString, getYearString, monthArray, pluckValueFromRange, quarterArray, strictParse, yearArray };