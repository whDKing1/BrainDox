import { differenceInCalendarDays, eachDayOfInterval, endOfWeek, endOfYear, getDay, isWithinInterval, startOfDay, startOfWeek, startOfYear, subYears } from 'date-fns';
import { groupBy } from 'lodash-es';
/** get color by value/maxValue */
export function calcColorByValue(colors, value, maxValue) {
  if (maxValue === 0 || value === null || value === undefined || value <= 0) {
    return colors[0];
  }
  const ratio = Math.min(value / maxValue, 1);
  const maxLevel = colors.length - 1;
  const level = Math.min(Math.ceil(ratio * maxLevel), maxLevel);
  return colors[level];
}
/**
 * fill gaps for the given data
 *
 * fill gaps `[firstDate,lastDate]` with value `0`
 *
 * fill `[firstCalendarDate,firstDate]` and `[lastDate,lastCalendarDate]` with value `null` by default
 *
 * fill `[firstCalendarDate,firstDate]` with value `0` when `fillCalendarLeading` is `true`
 */
export function completeDataGaps(data, firstDayOfWeek, fillCalendarLeading) {
  const sortedData = [...data].sort((a, b) => a.timestamp - b.timestamp);
  const firstDate = sortedData[0].timestamp;
  const lastDate = sortedData[sortedData.length - 1].timestamp;
  const firstCalendarDate = startOfWeek(firstDate, {
    weekStartsOn: firstDayOfWeek
  });
  const lastCalendarEndDate = endOfWeek(lastDate, {
    weekStartsOn: firstDayOfWeek
  });
  const dataMap = new Map(sortedData.map(d => [startOfDay(d.timestamp).getTime(), d]));
  const allCalendarDates = eachDayOfInterval({
    start: firstCalendarDate,
    end: lastCalendarEndDate
  });
  const startDate = fillCalendarLeading ? firstCalendarDate : firstDate;
  return allCalendarDates.map(date => {
    const key = startOfDay(date).getTime();
    const dateValue = dataMap.get(key);
    if (dateValue) {
      return dateValue;
    }
    const value = isWithinInterval(date, {
      start: startDate,
      end: lastDate
    }) ? 0 : null;
    return {
      timestamp: date.getTime(),
      value
    };
  });
}
/**
 * Create a DayRect object with position information
 */
export function createDayRect(item, calendarStartDate, weekStartOn, colors, maxValue) {
  const daysFromGridStart = differenceInCalendarDays(item.timestamp, calendarStartDate);
  const colIndex = Math.floor(daysFromGridStart / 7);
  const dayOfWeek = getDay(item.timestamp);
  const rowIndex = (dayOfWeek - weekStartOn + 7) % 7;
  return {
    timestamp: item.timestamp,
    value: item.value,
    color: calcColorByValue(colors, item.value, maxValue),
    dayOfWeek,
    rowIndex,
    colIndex
  };
}
/**
 * Create a sparse matrix from items with position information
 */
export function createSparseMatrix(rows, items, getRowIndex, getColIndex) {
  const groupedByRow = groupBy(items, getRowIndex);
  return Array.from({
    length: rows
  }, (_, rowIndex) => {
    const rowData = groupedByRow[rowIndex] || [];
    const row = [];
    rowData.forEach(item => {
      row[getColIndex(item)] = item;
    });
    return row;
  });
}
/**
 * This creates a 7x53 matrix (typical year layout) filled with loading cells
 */
export function createLoadingMatrix(firstDayOfWeek) {
  const rows = 7;
  const cols = 53;
  const currentTimestamp = Date.now();
  return Array.from({
    length: rows
  }, (_, row) => Array.from({
    length: cols
  }, (_, col) => ({
    timestamp: currentTimestamp,
    value: 0,
    color: '#000000',
    dayOfWeek: (firstDayOfWeek + row) % 7,
    rowIndex: row,
    colIndex: col
  })));
}
/**
 * Generate heatmap data for mock purposes.
 * This function generates random data and the result is not stable.
 * @param range - 'recent' for last year, or a specific year number
 */
export function heatmapMockData(year) {
  let start;
  let end;
  if (year === undefined || year === 'recent') {
    end = new Date();
    start = subYears(end, 1);
  } else {
    const _year = Number(year);
    start = startOfYear(new Date(_year, 0, 1));
    end = endOfYear(new Date(_year, 11, 31));
  }
  const allDays = eachDayOfInterval({
    start,
    end
  });
  return allDays.map(day => {
    const dayOfWeek = day.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    if (isWeekend && Math.random() < 0.7) {
      return {
        timestamp: day.getTime(),
        value: 0
      };
    }
    if (!isWeekend && Math.random() < 0.15) {
      return {
        timestamp: day.getTime(),
        value: 0
      };
    }
    const value = Math.floor(Math.pow(Math.random(), 2) * 40) + 1;
    return {
      timestamp: day.getTime(),
      value
    };
  });
}