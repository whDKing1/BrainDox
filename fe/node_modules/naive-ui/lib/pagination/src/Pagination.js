"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationProps = void 0;
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const icons_1 = require("../../_internal/icons");
const _mixins_1 = require("../../_mixins");
const use_rtl_1 = require("../../_mixins/use-rtl");
const _utils_1 = require("../../_utils");
const input_1 = require("../../input");
const popselect_1 = require("../../popselect");
const select_1 = require("../../select");
const styles_1 = require("../styles");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
const utils_1 = require("./utils");
exports.paginationProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { simple: Boolean, page: Number, defaultPage: {
        type: Number,
        default: 1
    }, itemCount: Number, pageCount: Number, defaultPageCount: {
        type: Number,
        default: 1
    }, showSizePicker: Boolean, pageSize: Number, defaultPageSize: Number, pageSizes: {
        type: Array,
        default() {
            return [10];
        }
    }, showQuickJumper: Boolean, size: String, disabled: Boolean, pageSlot: {
        type: Number,
        default: 9
    }, selectProps: Object, prev: Function, next: Function, goto: Function, prefix: Function, suffix: Function, label: Function, displayOrder: {
        type: Array,
        default: ['pages', 'size-picker', 'quick-jumper']
    }, to: _utils_1.useAdjustedTo.propTo, showQuickJumpDropdown: { type: Boolean, default: true }, scrollbarProps: Object, 'onUpdate:page': [Function, Array], onUpdatePage: [Function, Array], 'onUpdate:pageSize': [Function, Array], onUpdatePageSize: [Function, Array], 
    /** @deprecated */
    onPageSizeChange: [Function, Array], 
    /** @deprecated */
    onChange: [Function, Array] });
exports.default = (0, vue_1.defineComponent)({
    name: 'Pagination',
    props: exports.paginationProps,
    slots: Object,
    setup(props) {
        if (process.env.NODE_ENV !== 'production') {
            (0, vue_1.watchEffect)(() => {
                if (props.pageCount !== undefined && props.itemCount !== undefined) {
                    (0, _utils_1.warn)('pagination', '`page-count` and `item-count` should\'t be specified together. Only `item-count` will take effect.');
                }
                if (props.onPageSizeChange) {
                    (0, _utils_1.warnOnce)('pagination', '`on-page-size-change` is deprecated, please use `on-update:page-size` instead.');
                }
                if (props.onChange) {
                    (0, _utils_1.warnOnce)('pagination', '`on-change` is deprecated, please use `on-update:page` instead.');
                }
            });
        }
        const { mergedComponentPropsRef, mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef } = (0, _mixins_1.useConfig)(props);
        const mergedSizeRef = (0, vue_1.computed)(() => {
            var _a, _b;
            return (props.size
                || ((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Pagination) === null || _b === void 0 ? void 0 : _b.size)
                || 'medium');
        });
        const themeRef = (0, _mixins_1.useTheme)('Pagination', '-pagination', index_cssr_1.default, styles_1.paginationLight, props, mergedClsPrefixRef);
        const { localeRef } = (0, _mixins_1.useLocale)('Pagination');
        const selfRef = (0, vue_1.ref)(null);
        const uncontrolledPageRef = (0, vue_1.ref)(props.defaultPage);
        const uncontrolledPageSizeRef = (0, vue_1.ref)((0, utils_1.getDefaultPageSize)(props));
        const mergedPageRef = (0, vooks_1.useMergedState)((0, vue_1.toRef)(props, 'page'), uncontrolledPageRef);
        const mergedPageSizeRef = (0, vooks_1.useMergedState)((0, vue_1.toRef)(props, 'pageSize'), uncontrolledPageSizeRef);
        const mergedPageCountRef = (0, vue_1.computed)(() => {
            // item count has high priority, for it can affect prefix slot rendering
            const { itemCount } = props;
            if (itemCount !== undefined) {
                return Math.max(1, Math.ceil(itemCount / mergedPageSizeRef.value));
            }
            const { pageCount } = props;
            if (pageCount !== undefined)
                return Math.max(pageCount, 1);
            return 1;
        });
        const jumperValueRef = (0, vue_1.ref)('');
        (0, vue_1.watchEffect)(() => {
            void props.simple;
            jumperValueRef.value = String(mergedPageRef.value);
        });
        const fastForwardActiveRef = (0, vue_1.ref)(false);
        const fastBackwardActiveRef = (0, vue_1.ref)(false);
        const showFastForwardMenuRef = (0, vue_1.ref)(false);
        const showFastBackwardMenuRef = (0, vue_1.ref)(false);
        const handleFastForwardMouseenter = () => {
            if (props.disabled)
                return;
            fastForwardActiveRef.value = true;
            disableTransitionOneTick();
        };
        const handleFastForwardMouseleave = () => {
            if (props.disabled)
                return;
            fastForwardActiveRef.value = false;
            disableTransitionOneTick();
        };
        const handleFastBackwardMouseenter = () => {
            fastBackwardActiveRef.value = true;
            disableTransitionOneTick();
        };
        const handleFastBackwardMouseleave = () => {
            fastBackwardActiveRef.value = false;
            disableTransitionOneTick();
        };
        const handleMenuSelect = (value) => {
            doUpdatePage(value);
        };
        const pageItemsInfo = (0, vue_1.computed)(() => (0, utils_1.createPageItemsInfo)(mergedPageRef.value, mergedPageCountRef.value, props.pageSlot, props.showQuickJumpDropdown));
        (0, vue_1.watchEffect)(() => {
            if (!pageItemsInfo.value.hasFastBackward) {
                fastBackwardActiveRef.value = false;
                showFastBackwardMenuRef.value = false;
            }
            else if (!pageItemsInfo.value.hasFastForward) {
                fastForwardActiveRef.value = false;
                showFastForwardMenuRef.value = false;
            }
        });
        const pageSizeOptionsRef = (0, vue_1.computed)(() => {
            const suffix = localeRef.value.selectionSuffix;
            return props.pageSizes.map((size) => {
                if (typeof size === 'number') {
                    return {
                        label: `${size} / ${suffix}`,
                        value: size
                    };
                }
                else {
                    return size;
                }
            });
        });
        const inputSizeRef = (0, vue_1.computed)(() => {
            var _a, _b;
            return (((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Pagination) === null || _b === void 0 ? void 0 : _b.inputSize)
                || (0, _utils_1.smallerSize)(mergedSizeRef.value));
        });
        const selectSizeRef = (0, vue_1.computed)(() => {
            var _a, _b;
            return (((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Pagination) === null || _b === void 0 ? void 0 : _b.selectSize)
                || (0, _utils_1.smallerSize)(mergedSizeRef.value));
        });
        const startIndexRef = (0, vue_1.computed)(() => {
            return (mergedPageRef.value - 1) * mergedPageSizeRef.value;
        });
        const endIndexRef = (0, vue_1.computed)(() => {
            const endIndex = mergedPageRef.value * mergedPageSizeRef.value - 1;
            const { itemCount } = props;
            if (itemCount !== undefined) {
                return endIndex > itemCount - 1 ? itemCount - 1 : endIndex;
            }
            return endIndex;
        });
        const mergedItemCountRef = (0, vue_1.computed)(() => {
            const { itemCount } = props;
            if (itemCount !== undefined)
                return itemCount;
            return (props.pageCount || 1) * mergedPageSizeRef.value;
        });
        const rtlEnabledRef = (0, use_rtl_1.useRtl)('Pagination', mergedRtlRef, mergedClsPrefixRef);
        function disableTransitionOneTick() {
            void (0, vue_1.nextTick)(() => {
                var _a;
                const { value: selfEl } = selfRef;
                if (!selfEl)
                    return;
                selfEl.classList.add('transition-disabled');
                void ((_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.offsetWidth);
                selfEl.classList.remove('transition-disabled');
            });
        }
        function doUpdatePage(page) {
            if (page === mergedPageRef.value)
                return;
            const { 'onUpdate:page': _onUpdatePage, onUpdatePage, onChange, simple } = props;
            if (_onUpdatePage)
                (0, _utils_1.call)(_onUpdatePage, page);
            if (onUpdatePage)
                (0, _utils_1.call)(onUpdatePage, page);
            // deprecated
            if (onChange)
                (0, _utils_1.call)(onChange, page);
            uncontrolledPageRef.value = page;
            if (simple) {
                jumperValueRef.value = String(page);
            }
        }
        function doUpdatePageSize(pageSize) {
            if (pageSize === mergedPageSizeRef.value)
                return;
            const { 'onUpdate:pageSize': _onUpdatePageSize, onUpdatePageSize, onPageSizeChange } = props;
            if (_onUpdatePageSize)
                (0, _utils_1.call)(_onUpdatePageSize, pageSize);
            if (onUpdatePageSize)
                (0, _utils_1.call)(onUpdatePageSize, pageSize);
            // deprecated
            if (onPageSizeChange)
                (0, _utils_1.call)(onPageSizeChange, pageSize);
            uncontrolledPageSizeRef.value = pageSize;
            // update new page when overflows.
            // we may have different update strategy, but i've no time to impl it
            if (mergedPageCountRef.value < mergedPageRef.value) {
                doUpdatePage(mergedPageCountRef.value);
            }
        }
        function forward() {
            if (props.disabled)
                return;
            const page = Math.min(mergedPageRef.value + 1, mergedPageCountRef.value);
            doUpdatePage(page);
        }
        function backward() {
            if (props.disabled)
                return;
            const page = Math.max(mergedPageRef.value - 1, 1);
            doUpdatePage(page);
        }
        function fastForward() {
            if (props.disabled)
                return;
            const page = Math.min(pageItemsInfo.value.fastForwardTo, mergedPageCountRef.value);
            doUpdatePage(page);
        }
        function fastBackward() {
            if (props.disabled)
                return;
            const page = Math.max(pageItemsInfo.value.fastBackwardTo, 1);
            doUpdatePage(page);
        }
        function handleSizePickerChange(value) {
            doUpdatePageSize(value);
        }
        function doQuickJump() {
            const page = Number.parseInt(jumperValueRef.value);
            if (Number.isNaN(page))
                return;
            doUpdatePage(Math.max(1, Math.min(page, mergedPageCountRef.value)));
            if (!props.simple) {
                jumperValueRef.value = '';
            }
        }
        function handleQuickJumperChange() {
            doQuickJump();
        }
        function handlePageItemClick(pageItem) {
            if (props.disabled)
                return;
            switch (pageItem.type) {
                case 'page':
                    doUpdatePage(pageItem.label);
                    break;
                case 'fast-backward':
                    fastBackward();
                    break;
                case 'fast-forward':
                    fastForward();
                    break;
            }
        }
        function handleJumperInput(value) {
            jumperValueRef.value = value.replace(/\D+/g, '');
        }
        (0, vue_1.watchEffect)(() => {
            void mergedPageRef.value;
            void mergedPageSizeRef.value;
            disableTransitionOneTick();
        });
        const cssVarsRef = (0, vue_1.computed)(() => {
            const size = mergedSizeRef.value;
            const { self: { buttonBorder, buttonBorderHover, buttonBorderPressed, buttonIconColor, buttonIconColorHover, buttonIconColorPressed, itemTextColor, itemTextColorHover, itemTextColorPressed, itemTextColorActive, itemTextColorDisabled, itemColor, itemColorHover, itemColorPressed, itemColorActive, itemColorActiveHover, itemColorDisabled, itemBorder, itemBorderHover, itemBorderPressed, itemBorderActive, itemBorderDisabled, itemBorderRadius, jumperTextColor, jumperTextColorDisabled, buttonColor, buttonColorHover, buttonColorPressed, [(0, _utils_1.createKey)('itemPadding', size)]: itemPadding, [(0, _utils_1.createKey)('itemMargin', size)]: itemMargin, [(0, _utils_1.createKey)('inputWidth', size)]: inputWidth, [(0, _utils_1.createKey)('selectWidth', size)]: selectWidth, [(0, _utils_1.createKey)('inputMargin', size)]: inputMargin, [(0, _utils_1.createKey)('selectMargin', size)]: selectMargin, [(0, _utils_1.createKey)('jumperFontSize', size)]: jumperFontSize, [(0, _utils_1.createKey)('prefixMargin', size)]: prefixMargin, [(0, _utils_1.createKey)('suffixMargin', size)]: suffixMargin, [(0, _utils_1.createKey)('itemSize', size)]: itemSize, [(0, _utils_1.createKey)('buttonIconSize', size)]: buttonIconSize, [(0, _utils_1.createKey)('itemFontSize', size)]: itemFontSize, [`${(0, _utils_1.createKey)('itemMargin', size)}Rtl`]: itemMarginRtl, [`${(0, _utils_1.createKey)('inputMargin', size)}Rtl`]: inputMarginRtl }, common: { cubicBezierEaseInOut } } = themeRef.value;
            return {
                '--n-prefix-margin': prefixMargin,
                '--n-suffix-margin': suffixMargin,
                '--n-item-font-size': itemFontSize,
                '--n-select-width': selectWidth,
                '--n-select-margin': selectMargin,
                '--n-input-width': inputWidth,
                '--n-input-margin': inputMargin,
                '--n-input-margin-rtl': inputMarginRtl,
                '--n-item-size': itemSize,
                '--n-item-text-color': itemTextColor,
                '--n-item-text-color-disabled': itemTextColorDisabled,
                '--n-item-text-color-hover': itemTextColorHover,
                '--n-item-text-color-active': itemTextColorActive,
                '--n-item-text-color-pressed': itemTextColorPressed,
                '--n-item-color': itemColor,
                '--n-item-color-hover': itemColorHover,
                '--n-item-color-disabled': itemColorDisabled,
                '--n-item-color-active': itemColorActive,
                '--n-item-color-active-hover': itemColorActiveHover,
                '--n-item-color-pressed': itemColorPressed,
                '--n-item-border': itemBorder,
                '--n-item-border-hover': itemBorderHover,
                '--n-item-border-disabled': itemBorderDisabled,
                '--n-item-border-active': itemBorderActive,
                '--n-item-border-pressed': itemBorderPressed,
                '--n-item-padding': itemPadding,
                '--n-item-border-radius': itemBorderRadius,
                '--n-bezier': cubicBezierEaseInOut,
                '--n-jumper-font-size': jumperFontSize,
                '--n-jumper-text-color': jumperTextColor,
                '--n-jumper-text-color-disabled': jumperTextColorDisabled,
                '--n-item-margin': itemMargin,
                '--n-item-margin-rtl': itemMarginRtl,
                '--n-button-icon-size': buttonIconSize,
                '--n-button-icon-color': buttonIconColor,
                '--n-button-icon-color-hover': buttonIconColorHover,
                '--n-button-icon-color-pressed': buttonIconColorPressed,
                '--n-button-color-hover': buttonColorHover,
                '--n-button-color': buttonColor,
                '--n-button-color-pressed': buttonColorPressed,
                '--n-button-border': buttonBorder,
                '--n-button-border-hover': buttonBorderHover,
                '--n-button-border-pressed': buttonBorderPressed
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('pagination', (0, vue_1.computed)(() => {
                let hash = '';
                hash += mergedSizeRef.value[0];
                return hash;
            }), cssVarsRef, props)
            : undefined;
        return {
            rtlEnabled: rtlEnabledRef,
            mergedClsPrefix: mergedClsPrefixRef,
            locale: localeRef,
            selfRef,
            mergedPage: mergedPageRef,
            pageItems: (0, vue_1.computed)(() => {
                return pageItemsInfo.value.items;
            }),
            mergedItemCount: mergedItemCountRef,
            jumperValue: jumperValueRef,
            pageSizeOptions: pageSizeOptionsRef,
            mergedPageSize: mergedPageSizeRef,
            inputSize: inputSizeRef,
            selectSize: selectSizeRef,
            mergedTheme: themeRef,
            mergedPageCount: mergedPageCountRef,
            startIndex: startIndexRef,
            endIndex: endIndexRef,
            showFastForwardMenu: showFastForwardMenuRef,
            showFastBackwardMenu: showFastBackwardMenuRef,
            fastForwardActive: fastForwardActiveRef,
            fastBackwardActive: fastBackwardActiveRef,
            handleMenuSelect,
            handleFastForwardMouseenter,
            handleFastForwardMouseleave,
            handleFastBackwardMouseenter,
            handleFastBackwardMouseleave,
            handleJumperInput,
            handleBackwardClick: backward,
            handleForwardClick: forward,
            handlePageItemClick,
            handleSizePickerChange,
            handleQuickJumperChange,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
        };
    },
    render() {
        // it's ok to expand all prop here since no slots' deps
        const { $slots, mergedClsPrefix, disabled, cssVars, mergedPage, mergedPageCount, pageItems, showSizePicker, showQuickJumper, mergedTheme, locale, inputSize, selectSize, mergedPageSize, pageSizeOptions, jumperValue, simple, prev, next, prefix, suffix, label, goto, handleJumperInput, handleSizePickerChange, handleBackwardClick, handlePageItemClick, handleForwardClick, handleQuickJumperChange, onRender } = this;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        const renderPrefix = prefix || $slots.prefix;
        const renderSuffix = suffix || $slots.suffix;
        const renderPrev = prev || $slots.prev;
        const renderNext = next || $slots.next;
        const renderLabel = label || $slots.label;
        return ((0, vue_1.h)("div", { ref: "selfRef", class: [
                `${mergedClsPrefix}-pagination`,
                this.themeClass,
                this.rtlEnabled && `${mergedClsPrefix}-pagination--rtl`,
                disabled && `${mergedClsPrefix}-pagination--disabled`,
                simple && `${mergedClsPrefix}-pagination--simple`
            ], style: cssVars },
            renderPrefix ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-pagination-prefix` }, renderPrefix({
                page: mergedPage,
                pageSize: mergedPageSize,
                pageCount: mergedPageCount,
                startIndex: this.startIndex,
                endIndex: this.endIndex,
                itemCount: this.mergedItemCount
            }))) : null,
            this.displayOrder.map((part) => {
                switch (part) {
                    case 'pages':
                        return ((0, vue_1.h)(vue_1.Fragment, null,
                            (0, vue_1.h)("div", { class: [
                                    `${mergedClsPrefix}-pagination-item`,
                                    !renderPrev
                                        && `${mergedClsPrefix}-pagination-item--button`,
                                    (mergedPage <= 1
                                        || mergedPage > mergedPageCount
                                        || disabled)
                                        && `${mergedClsPrefix}-pagination-item--disabled`
                                ], onClick: handleBackwardClick }, renderPrev ? (renderPrev({
                                page: mergedPage,
                                pageSize: mergedPageSize,
                                pageCount: mergedPageCount,
                                startIndex: this.startIndex,
                                endIndex: this.endIndex,
                                itemCount: this.mergedItemCount
                            })) : ((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: mergedClsPrefix }, {
                                default: () => this.rtlEnabled ? (0, vue_1.h)(icons_1.ForwardIcon, null) : (0, vue_1.h)(icons_1.BackwardIcon, null)
                            }))),
                            simple ? ((0, vue_1.h)(vue_1.Fragment, null,
                                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-pagination-quick-jumper` },
                                    (0, vue_1.h)(input_1.NInput, { value: jumperValue, onUpdateValue: handleJumperInput, size: inputSize, placeholder: "", disabled: disabled, theme: mergedTheme.peers.Input, themeOverrides: mergedTheme.peerOverrides.Input, onChange: handleQuickJumperChange })),
                                "\u00A0/",
                                ' ',
                                mergedPageCount)) : (pageItems.map((pageItem, index) => {
                                let contentNode;
                                let onMouseenter;
                                let onMouseleave;
                                const { type } = pageItem;
                                switch (type) {
                                    case 'page':
                                        // eslint-disable-next-line no-case-declarations
                                        const pageNode = pageItem.label;
                                        if (renderLabel) {
                                            contentNode = renderLabel({
                                                type: 'page',
                                                node: pageNode,
                                                active: pageItem.active
                                            });
                                        }
                                        else {
                                            contentNode = pageNode;
                                        }
                                        break;
                                    case 'fast-forward':
                                        // eslint-disable-next-line no-case-declarations
                                        const fastForwardNode = this.fastForwardActive ? ((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: mergedClsPrefix }, {
                                            default: () => this.rtlEnabled ? ((0, vue_1.h)(icons_1.FastBackwardIcon, null)) : ((0, vue_1.h)(icons_1.FastForwardIcon, null))
                                        })) : ((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: mergedClsPrefix }, { default: () => (0, vue_1.h)(icons_1.MoreIcon, null) }));
                                        if (renderLabel) {
                                            contentNode = renderLabel({
                                                type: 'fast-forward',
                                                node: fastForwardNode,
                                                active: this.fastForwardActive
                                                    || this.showFastForwardMenu
                                            });
                                        }
                                        else {
                                            contentNode = fastForwardNode;
                                        }
                                        onMouseenter = this.handleFastForwardMouseenter;
                                        onMouseleave = this.handleFastForwardMouseleave;
                                        break;
                                    case 'fast-backward':
                                        // eslint-disable-next-line no-case-declarations
                                        const fastBackwardNode = this.fastBackwardActive ? ((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: mergedClsPrefix }, {
                                            default: () => this.rtlEnabled ? ((0, vue_1.h)(icons_1.FastForwardIcon, null)) : ((0, vue_1.h)(icons_1.FastBackwardIcon, null))
                                        })) : ((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: mergedClsPrefix }, { default: () => (0, vue_1.h)(icons_1.MoreIcon, null) }));
                                        if (renderLabel) {
                                            contentNode = renderLabel({
                                                type: 'fast-backward',
                                                node: fastBackwardNode,
                                                active: this.fastBackwardActive
                                                    || this.showFastBackwardMenu
                                            });
                                        }
                                        else {
                                            contentNode = fastBackwardNode;
                                        }
                                        onMouseenter = this.handleFastBackwardMouseenter;
                                        onMouseleave = this.handleFastBackwardMouseleave;
                                        break;
                                }
                                const itemNode = ((0, vue_1.h)("div", { key: index, class: [
                                        `${mergedClsPrefix}-pagination-item`,
                                        pageItem.active
                                            && `${mergedClsPrefix}-pagination-item--active`,
                                        type !== 'page'
                                            && ((type === 'fast-backward'
                                                && this.showFastBackwardMenu)
                                                || (type === 'fast-forward'
                                                    && this.showFastForwardMenu))
                                            && `${mergedClsPrefix}-pagination-item--hover`,
                                        disabled
                                            && `${mergedClsPrefix}-pagination-item--disabled`,
                                        type === 'page'
                                            && `${mergedClsPrefix}-pagination-item--clickable`
                                    ], onClick: () => {
                                        handlePageItemClick(pageItem);
                                    }, onMouseenter: onMouseenter, onMouseleave: onMouseleave }, contentNode));
                                if (type === 'page'
                                    && !pageItem.mayBeFastBackward
                                    && !pageItem.mayBeFastForward) {
                                    return itemNode;
                                }
                                else {
                                    const key = pageItem.type === 'page'
                                        ? pageItem.mayBeFastBackward
                                            ? 'fast-backward'
                                            : 'fast-forward'
                                        : pageItem.type;
                                    if (pageItem.type !== 'page' && !pageItem.options) {
                                        return itemNode;
                                    }
                                    return ((0, vue_1.h)(popselect_1.NPopselect, { to: this.to, key: key, disabled: disabled, trigger: "hover", virtualScroll: true, style: { width: '60px' }, theme: mergedTheme.peers.Popselect, themeOverrides: mergedTheme.peerOverrides.Popselect, builtinThemeOverrides: {
                                            peers: {
                                                InternalSelectMenu: {
                                                    height: 'calc(var(--n-option-height) * 4.6)'
                                                }
                                            }
                                        }, nodeProps: () => ({
                                            style: {
                                                justifyContent: 'center'
                                            }
                                        }), show: type === 'page'
                                            ? false
                                            : type === 'fast-backward'
                                                ? this.showFastBackwardMenu
                                                : this.showFastForwardMenu, onUpdateShow: (value) => {
                                            if (type === 'page')
                                                return;
                                            if (value) {
                                                if (type === 'fast-backward') {
                                                    this.showFastBackwardMenu = value;
                                                }
                                                else {
                                                    this.showFastForwardMenu = value;
                                                }
                                            }
                                            else {
                                                this.showFastBackwardMenu = false;
                                                this.showFastForwardMenu = false;
                                            }
                                        }, options: pageItem.type !== 'page' && pageItem.options
                                            ? pageItem.options
                                            : [], onUpdateValue: this.handleMenuSelect, scrollable: true, scrollbarProps: this.scrollbarProps, showCheckmark: false }, { default: () => itemNode }));
                                }
                            })),
                            (0, vue_1.h)("div", { class: [
                                    `${mergedClsPrefix}-pagination-item`,
                                    !renderNext
                                        && `${mergedClsPrefix}-pagination-item--button`,
                                    {
                                        [`${mergedClsPrefix}-pagination-item--disabled`]: mergedPage < 1
                                            || mergedPage >= mergedPageCount
                                            || disabled
                                    }
                                ], onClick: handleForwardClick }, renderNext ? (renderNext({
                                page: mergedPage,
                                pageSize: mergedPageSize,
                                pageCount: mergedPageCount,
                                itemCount: this.mergedItemCount,
                                startIndex: this.startIndex,
                                endIndex: this.endIndex
                            })) : ((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: mergedClsPrefix }, {
                                default: () => this.rtlEnabled ? (0, vue_1.h)(icons_1.BackwardIcon, null) : (0, vue_1.h)(icons_1.ForwardIcon, null)
                            })))));
                    case 'size-picker': {
                        return !simple && showSizePicker ? ((0, vue_1.h)(select_1.NSelect, Object.assign({ consistentMenuWidth: false, placeholder: "", showCheckmark: false, to: this.to }, this.selectProps, { size: selectSize, options: pageSizeOptions, value: mergedPageSize, disabled: disabled, scrollbarProps: this.scrollbarProps, theme: mergedTheme.peers.Select, themeOverrides: mergedTheme.peerOverrides.Select, onUpdateValue: handleSizePickerChange }))) : null;
                    }
                    case 'quick-jumper':
                        return !simple && showQuickJumper ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-pagination-quick-jumper` },
                            goto
                                ? goto()
                                : (0, _utils_1.resolveSlot)(this.$slots.goto, () => [locale.goto]),
                            (0, vue_1.h)(input_1.NInput, { value: jumperValue, onUpdateValue: handleJumperInput, size: inputSize, placeholder: "", disabled: disabled, theme: mergedTheme.peers.Input, themeOverrides: mergedTheme.peerOverrides.Input, onChange: handleQuickJumperChange }))) : null;
                    default:
                        return null;
                }
            }),
            renderSuffix ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-pagination-suffix` }, renderSuffix({
                page: mergedPage,
                pageSize: mergedPageSize,
                pageCount: mergedPageCount,
                startIndex: this.startIndex,
                endIndex: this.endIndex,
                itemCount: this.mergedItemCount
            }))) : null));
    }
});
