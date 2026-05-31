declare const enUS: {
    name: string;
    global: {
        undo: string;
        redo: string;
        confirm: string;
        clear: string;
    };
    Popconfirm: {
        positiveText: string;
        negativeText: string;
    };
    Cascader: {
        placeholder: string;
        loading: string;
        loadingRequiredMessage: (label: string) => string;
    };
    Time: {
        dateFormat: string;
        dateTimeFormat: string;
    };
    DatePicker: {
        yearFormat: string;
        monthFormat: string;
        dayFormat: string;
        yearTypeFormat: string;
        monthTypeFormat: string;
        dateFormat: string;
        dateTimeFormat: string;
        quarterFormat: string;
        weekFormat: string;
        clear: string;
        now: string;
        confirm: string;
        selectTime: string;
        selectDate: string;
        datePlaceholder: string;
        datetimePlaceholder: string;
        monthPlaceholder: string;
        yearPlaceholder: string;
        quarterPlaceholder: string;
        weekPlaceholder: string;
        startDatePlaceholder: string;
        endDatePlaceholder: string;
        startDatetimePlaceholder: string;
        endDatetimePlaceholder: string;
        startMonthPlaceholder: string;
        endMonthPlaceholder: string;
        monthBeforeYear: boolean;
        firstDayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
        today: string;
    };
    DataTable: {
        checkTableAll: string;
        uncheckTableAll: string;
        confirm: string;
        clear: string;
    };
    LegacyTransfer: {
        sourceTitle: string;
        targetTitle: string;
    };
    Transfer: {
        selectAll: string;
        unselectAll: string;
        clearAll: string;
        total: (num: number) => string;
        selected: (num: number) => string;
    };
    Empty: {
        description: string;
    };
    Select: {
        placeholder: string;
    };
    TimePicker: {
        placeholder: string;
        positiveText: string;
        negativeText: string;
        now: string;
        clear: string;
    };
    Pagination: {
        goto: string;
        selectionSuffix: string;
    };
    DynamicTags: {
        add: string;
    };
    Log: {
        loading: string;
    };
    Input: {
        placeholder: string;
    };
    InputNumber: {
        placeholder: string;
    };
    DynamicInput: {
        create: string;
    };
    ThemeEditor: {
        title: string;
        clearAllVars: string;
        clearSearch: string;
        filterCompName: string;
        filterVarName: string;
        import: string;
        export: string;
        restore: string;
    };
    Image: {
        tipPrevious: string;
        tipNext: string;
        tipCounterclockwise: string;
        tipClockwise: string;
        tipZoomOut: string;
        tipZoomIn: string;
        tipDownload: string;
        tipClose: string;
        tipOriginalSize: string;
    };
    Heatmap: {
        less: string;
        more: string;
        monthFormat: string;
        weekdayFormat: string;
    };
};
export type NLocale = typeof enUS;
export default enUS;
