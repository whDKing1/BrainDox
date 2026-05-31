"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.time = void 0;
exports.getFixValue = getFixValue;
exports.getTimeUnits = getTimeUnits;
exports.isTimeInStep = isTimeInStep;
exports.findSimilarTime = findSimilarTime;
exports.getAmPm = getAmPm;
const date_fns_1 = require("date-fns");
const _utils_1 = require("../../_utils");
exports.time = {
    amHours: [
        '00',
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11'
    ],
    pmHours: [
        '12',
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11'
    ],
    hours: [
        '00',
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23'
    ],
    minutes: [
        '00',
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
        '31',
        '32',
        '33',
        '34',
        '35',
        '36',
        '37',
        '38',
        '39',
        '40',
        '41',
        '42',
        '43',
        '44',
        '45',
        '46',
        '47',
        '48',
        '49',
        '50',
        '51',
        '52',
        '53',
        '54',
        '55',
        '56',
        '57',
        '58',
        '59'
    ],
    seconds: [
        '00',
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
        '31',
        '32',
        '33',
        '34',
        '35',
        '36',
        '37',
        '38',
        '39',
        '40',
        '41',
        '42',
        '43',
        '44',
        '45',
        '46',
        '47',
        '48',
        '49',
        '50',
        '51',
        '52',
        '53',
        '54',
        '55',
        '56',
        '57',
        '58',
        '59'
    ],
    period: ['AM', 'PM']
};
function getFixValue(value) {
    return `00${value}`.slice(-2);
}
// TODO: refactor the logic, it's somehow a patch logic
function getTimeUnits(defaultValue, stepOrList, isHourWithAmPm) {
    if (Array.isArray(stepOrList)) {
        return (isHourWithAmPm === 'am'
            ? stepOrList.filter(v => v < 12)
            : isHourWithAmPm === 'pm'
                ? stepOrList
                    .filter(v => v >= 12)
                    .map(v => (v === 12 ? 12 : v - 12))
                : stepOrList).map(v => getFixValue(v));
    }
    else if (typeof stepOrList === 'number') {
        if (isHourWithAmPm === 'am') {
            return defaultValue.filter((hour) => {
                const hourAsNumber = Number(hour);
                return hourAsNumber < 12 && hourAsNumber % stepOrList === 0;
            });
        }
        else if (isHourWithAmPm === 'pm') {
            return defaultValue
                .filter((hour) => {
                const hourAsNumber = Number(hour);
                return hourAsNumber >= 12 && hourAsNumber % stepOrList === 0;
            })
                .map((hour) => {
                const hourAsNumber = Number(hour);
                return getFixValue(hourAsNumber === 12 ? 12 : hourAsNumber - 12);
            });
        }
        return defaultValue.filter((hour) => {
            return Number(hour) % stepOrList === 0;
        });
    }
    else {
        return isHourWithAmPm === 'am'
            ? defaultValue.filter(hour => Number(hour) < 12)
            : isHourWithAmPm === 'pm'
                ? defaultValue
                    .map(hour => Number(hour))
                    .filter(hour => Number(hour) >= 12)
                    .map(v => getFixValue(v === 12 ? 12 : v - 12))
                : defaultValue;
    }
}
function isTimeInStep(value, type, stepOrList) {
    if (!stepOrList) {
        return true;
    }
    else if (typeof stepOrList === 'number') {
        return value % stepOrList === 0;
    }
    else {
        return stepOrList.includes(value);
    }
}
function findSimilarTime(value, type, stepOrList) {
    const list = getTimeUnits(exports.time[type], stepOrList).map(Number);
    let lowerBound, upperBound;
    for (let i = 0; i < list.length; ++i) {
        const v = list[i];
        if (v === value) {
            return v;
        }
        else if (v > value) {
            upperBound = v;
            break;
        }
        lowerBound = v;
    }
    if (lowerBound === undefined) {
        if (!upperBound) {
            (0, _utils_1.throwError)('time-picker', 'Please set \'hours\' or \'minutes\' or \'seconds\' props');
        }
        return upperBound;
    }
    if (upperBound === undefined) {
        return lowerBound;
    }
    return upperBound - value > value - lowerBound ? lowerBound : upperBound;
}
function getAmPm(value) {
    return (0, date_fns_1.getHours)(value) < 12 ? 'am' : 'pm';
}
