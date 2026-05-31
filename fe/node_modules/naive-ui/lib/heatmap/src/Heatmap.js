"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.heatmapProps = void 0;
const date_fns_1 = require("date-fns");
const lodash_1 = require("lodash");
const seemly_1 = require("seemly");
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const utils_1 = require("../../date-picker/src/utils");
const light_1 = __importDefault(require("../styles/light"));
const animationStyle_1 = require("./animationStyle");
const ColorIndicator_1 = __importDefault(require("./ColorIndicator"));
const Rect_1 = __importDefault(require("./Rect"));
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
const theme_1 = require("./theme");
const utils_2 = require("./utils");
exports.heatmapProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { activeColors: Array, colorTheme: String, data: Array, loadingData: Object, fillCalendarLeading: Boolean, firstDayOfWeek: {
        type: Number,
        default: 0
    }, loading: Boolean, minimumColor: String, showColorIndicator: {
        type: Boolean,
        default: true
    }, showWeekLabels: {
        type: Boolean,
        default: true
    }, showMonthLabels: {
        type: Boolean,
        default: true
    }, size: {
        type: String,
        default: 'medium'
    }, tooltip: {
        type: [Boolean, Object],
        default: false
    }, xGap: [Number, String], yGap: [Number, String] });
exports.default = (0, vue_1.defineComponent)({
    name: 'Heatmap',
    slots: Object,
    props: exports.heatmapProps,
    setup(props) {
        const { mergedClsPrefixRef, mergedRtlRef, inlineThemeDisabled } = (0, _mixins_1.useConfig)(props);
        const { localeRef, dateLocaleRef } = (0, _mixins_1.useLocale)('Heatmap');
        const themeRef = (0, _mixins_1.useTheme)('Heatmap', '-heatmap', index_cssr_1.default, light_1.default, props, mergedClsPrefixRef);
        const rtlEnabledRef = (0, _mixins_1.useRtl)('Heatmap', mergedRtlRef, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { xGap, yGap, size } = props;
            const { common: { cubicBezierEaseInOut }, self: { fontWeight, textColor, borderColor, loadingColorStart, [(0, _utils_1.createKey)('rectSize', size)]: rectSize, [(0, _utils_1.createKey)('borderRadius', size)]: sizeBorderRadius, [(0, _utils_1.createKey)('xGap', size)]: defaultXGap, [(0, _utils_1.createKey)('yGap', size)]: defaultYGap, [(0, _utils_1.createKey)('fontSize', size)]: fontSize } } = themeRef.value;
            const cssVars = {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-font-size': fontSize,
                '--n-font-weight': fontWeight,
                '--n-text-color': textColor,
                '--n-border-radius': sizeBorderRadius,
                '--n-border-color': borderColor,
                '--n-loading-color-start': loadingColorStart,
                '--n-rect-size': rectSize,
                '--n-x-gap': xGap !== undefined
                    ? typeof xGap === 'number'
                        ? (0, seemly_1.pxfy)(xGap)
                        : xGap
                    : defaultXGap,
                '--n-y-gap': yGap !== undefined
                    ? typeof yGap === 'number'
                        ? (0, seemly_1.pxfy)(yGap)
                        : yGap
                    : defaultYGap
            };
            return cssVars;
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('heatmap', (0, vue_1.computed)(() => {
                const { size } = props;
                return size[0];
            }), cssVarsRef, props)
            : undefined;
        const mergedColorsRef = (0, vue_1.computed)(() => {
            const { mininumColor: builtInMinimumColor, activeColors: builtInActiveColors } = themeRef.value.self;
            const mergedMininumColor = props.minimumColor || builtInMinimumColor;
            const theme = props.colorTheme && theme_1.heatmapColorThemes[props.colorTheme];
            const mergedActiveColors = props.activeColors || theme || builtInActiveColors;
            return [mergedMininumColor, ...mergedActiveColors];
        });
        const normalizedDataRef = (0, vue_1.computed)(() => {
            if (!props.data || props.data.length === 0) {
                return [];
            }
            return (0, utils_2.completeDataGaps)(props.data, (0, utils_1.transformNaiveFirstDayOfWeekToDateFns)(props.firstDayOfWeek), props.fillCalendarLeading);
        });
        const normalizedLoadingDataRef = (0, vue_1.computed)(() => {
            if (!props.loadingData || props.loadingData.length === 0) {
                return [];
            }
            return (0, utils_2.completeDataGaps)(props.loadingData, (0, utils_1.transformNaiveFirstDayOfWeekToDateFns)(props.firstDayOfWeek), props.fillCalendarLeading);
        });
        const maxValueRef = (0, vue_1.computed)(() => {
            var _a, _b;
            const validData = normalizedDataRef.value.filter(d => d.value !== null);
            return (_b = (_a = (0, lodash_1.maxBy)(validData, d => d.value)) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 0;
        });
        const heatmapMatrixRef = (0, vue_1.computed)(() => {
            const data = normalizedDataRef.value;
            const loadingData = normalizedLoadingDataRef.value;
            if (props.loading && !loadingData.length) {
                return (0, utils_2.createLoadingMatrix)((0, utils_1.transformNaiveFirstDayOfWeekToDateFns)(props.firstDayOfWeek));
            }
            const finalData = props.loading ? loadingData : data;
            if (!finalData.length)
                return [];
            const maxValue = maxValueRef.value;
            const colors = mergedColorsRef.value;
            const calendarStartDate = finalData[0].timestamp;
            const dayRects = finalData.map(item => (0, utils_2.createDayRect)(item, calendarStartDate, (0, utils_1.transformNaiveFirstDayOfWeekToDateFns)(props.firstDayOfWeek), colors, maxValue));
            return (0, utils_2.createSparseMatrix)(7, dayRects, dayRect => dayRect.rowIndex, dayRect => dayRect.colIndex);
        });
        const weekLabelsRef = (0, vue_1.computed)(() => {
            const { weekdayFormat } = localeRef.value;
            const { locale } = dateLocaleRef.value;
            const baseDate = (0, date_fns_1.startOfWeek)(new Date(), {
                weekStartsOn: (0, utils_1.transformNaiveFirstDayOfWeekToDateFns)(props.firstDayOfWeek)
            });
            return Array.from({ length: 7 }, (_, i) => {
                return {
                    label: (0, date_fns_1.format)((0, date_fns_1.addDays)(baseDate, i), weekdayFormat, { locale }),
                    visible: i % 2 !== 0
                };
            });
        });
        const loadingMonthLabelsRef = (0, vue_1.computed)(() => {
            const { monthFormat } = localeRef.value;
            const { locale } = dateLocaleRef.value;
            const currentYear = new Date().getFullYear();
            // for more consistent month label widths
            const colSpans = [5, 4, 5, 4, 5, 4, 5, 4, 4, 5, 4, 4];
            return Array.from({ length: 12 }, (_, i) => {
                const monthDate = new Date(currentYear, i, 1);
                return {
                    name: (0, date_fns_1.format)(monthDate, monthFormat, { locale }),
                    colSpan: colSpans[i]
                };
            });
        });
        function getColsMonth(matrix) {
            const cols = matrix[0].length;
            const res = [];
            for (let col = 0; col < cols; col++) {
                for (let row = 0; row < matrix.length; row++) {
                    const cell = matrix[row][col];
                    if ((cell === null || cell === void 0 ? void 0 : cell.value) !== null) {
                        res.push({
                            week: col,
                            month: (0, date_fns_1.format)(cell.timestamp, 'yyyy-MM')
                        });
                        break;
                    }
                }
            }
            return res;
        }
        const dataMonthLabelsRef = (0, vue_1.computed)(() => {
            const { monthFormat } = localeRef.value;
            const { locale } = dateLocaleRef.value;
            const matrix = heatmapMatrixRef.value;
            if (!matrix || matrix.length === 0 || !matrix[0]) {
                return [];
            }
            const colsWithMonth = getColsMonth(matrix);
            const monthStats = (0, lodash_1.mapValues)((0, lodash_1.groupBy)(colsWithMonth, 'month'), (entries) => {
                const weekNumbers = entries.map(e => e.week);
                return {
                    weekCount: entries.length,
                    start: Math.min(...weekNumbers),
                    end: Math.max(...weekNumbers)
                };
            });
            return Object.entries(monthStats)
                .filter(([, stats]) => stats.weekCount >= 3) // ensure have enough space
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([month, stats]) => {
                const monthDate = new Date((0, date_fns_1.parseISO)(`${month}-01`));
                return {
                    name: (0, date_fns_1.format)(monthDate, monthFormat, { locale }),
                    colSpan: stats.end - stats.start + 1
                };
            });
        });
        const monthLabelsRef = (0, vue_1.computed)(() => {
            return props.loading && !props.loadingData
                ? loadingMonthLabelsRef.value
                : dataMonthLabelsRef.value;
        });
        const loadingClassRef = (0, animationStyle_1.useLoadingStyleClass)(props, themeRef);
        return {
            weekLabels: weekLabelsRef,
            monthLabels: monthLabelsRef,
            mergedColors: mergedColorsRef,
            mergedClsPrefix: mergedClsPrefixRef,
            rtlEnabled: rtlEnabledRef,
            locale: localeRef,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender,
            heatmapMatrix: heatmapMatrixRef,
            loadingClass: loadingClassRef
        };
    },
    render() {
        const { loading, showWeekLabels, showMonthLabels, showColorIndicator, mergedClsPrefix, themeClass, cssVars, rtlEnabled, locale, weekLabels, monthLabels, mergedColors, $slots, heatmapMatrix, loadingClass, onRender } = this;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        return ((0, vue_1.h)("div", { class: [
                themeClass,
                `${mergedClsPrefix}-heatmap`,
                rtlEnabled && `${mergedClsPrefix}-heatmap--rtl`
            ], style: cssVars },
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-heatmap__content` },
                (0, vue_1.h)("table", { class: `${mergedClsPrefix}-heatmap__calendar-table` },
                    showMonthLabels && ((0, vue_1.h)("thead", null,
                        (0, vue_1.h)("tr", null,
                            showWeekLabels && ((0, vue_1.h)("th", { class: `${mergedClsPrefix}-heatmap__week-header-cell` })),
                            monthLabels.map((monthLabel, index) => ((0, vue_1.h)("th", { key: `month-${index}`, colspan: monthLabel.colSpan, class: `${mergedClsPrefix}-heatmap__month-label-cell` }, monthLabel.name)))))),
                    (0, vue_1.h)("tbody", null, weekLabels.map((weekLabel, rowIdx) => {
                        return ((0, vue_1.h)("tr", { key: `row-${rowIdx}` },
                            showWeekLabels && ((0, vue_1.h)("td", { class: `${mergedClsPrefix}-heatmap__week-label-cell` }, weekLabel.visible ? weekLabel.label : null)),
                            (heatmapMatrix[rowIdx] || []).map((day, weekIdx) => {
                                return day.value !== null ? ((0, vue_1.h)("td", { key: `day-${rowIdx}-${weekIdx}`, class: `${mergedClsPrefix}-heatmap__day-cell` },
                                    (0, vue_1.h)(Rect_1.default, { mergedClsPrefix: mergedClsPrefix, data: day, color: day.color, tooltip: this.tooltip, loading: loading, loadingClass: loadingClass }, {
                                        tooltip: () => { var _a; return (_a = $slots.tooltip) === null || _a === void 0 ? void 0 : _a.call($slots, day); }
                                    }))) : ((0, vue_1.h)("td", { key: `empty-${rowIdx}-${weekIdx}`, class: `${mergedClsPrefix}-heatmap__day-cell` },
                                    (0, vue_1.h)("div", { class: `${mergedClsPrefix}-heatmap__empty-cell` })));
                            })));
                    })))),
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-heatmap__footer` },
                (0, _utils_1.resolveWrappedSlot)($slots.footer, children => children && ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-heatmap__footer` }, children))),
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-heatmap__indicator` }, (0, _utils_1.resolveSlot)($slots.indicator, () => [
                    showColorIndicator && ((0, vue_1.h)(ColorIndicator_1.default, { colors: mergedColors, clsPrefix: mergedClsPrefix }, {
                        'leading-text': () => (0, _utils_1.resolveSlot)($slots['indicator-leading-text'], () => [
                            locale.less
                        ]),
                        'trailing-text': () => (0, _utils_1.resolveSlot)($slots['indicator-trailing-text'], () => [
                            locale.more
                        ])
                    }))
                ])))));
    }
});
