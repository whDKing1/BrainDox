"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seemly_1 = require("seemly");
const treemate_1 = require("treemate");
const vue_1 = require("vue");
const vueuc_1 = require("vueuc");
const _mixins_1 = require("../../../_mixins");
const _utils_1 = require("../../../_utils");
const cssr_1 = require("../../../_utils/cssr");
const empty_1 = require("../../../empty");
const focus_detector_1 = __importDefault(require("../../focus-detector"));
const loading_1 = __importDefault(require("../../loading"));
const scrollbar_1 = require("../../scrollbar");
const styles_1 = require("../styles");
const interface_1 = require("./interface");
const SelectGroupHeader_1 = __importDefault(require("./SelectGroupHeader"));
const SelectOption_1 = __importDefault(require("./SelectOption"));
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.default = (0, vue_1.defineComponent)({
    name: 'InternalSelectMenu',
    props: Object.assign(Object.assign({}, _mixins_1.useTheme.props), { clsPrefix: {
            type: String,
            required: true
        }, scrollable: {
            type: Boolean,
            default: true
        }, treeMate: {
            type: Object,
            required: true
        }, multiple: Boolean, size: {
            type: String,
            default: 'medium'
        }, value: {
            type: [String, Number, Array],
            default: null
        }, autoPending: Boolean, virtualScroll: {
            type: Boolean,
            default: true
        }, 
        // show is used to toggle pending state initialization
        show: {
            type: Boolean,
            default: true
        }, labelField: {
            type: String,
            default: 'label'
        }, valueField: {
            type: String,
            default: 'value'
        }, loading: Boolean, focusable: Boolean, renderLabel: Function, renderOption: Function, nodeProps: Function, showCheckmark: { type: Boolean, default: true }, onMousedown: Function, onScroll: Function, onFocus: Function, onBlur: Function, onKeyup: Function, onKeydown: Function, onTabOut: Function, onMouseenter: Function, onMouseleave: Function, onResize: Function, resetMenuOnOptionsChange: {
            type: Boolean,
            default: true
        }, inlineThemeDisabled: Boolean, scrollbarProps: Object, 
        // deprecated
        onToggle: Function }),
    setup(props) {
        const { mergedClsPrefixRef, mergedRtlRef, mergedComponentPropsRef } = (0, _mixins_1.useConfig)(props);
        const rtlEnabledRef = (0, _mixins_1.useRtl)('InternalSelectMenu', mergedRtlRef, mergedClsPrefixRef);
        const themeRef = (0, _mixins_1.useTheme)('InternalSelectMenu', '-internal-select-menu', index_cssr_1.default, styles_1.internalSelectMenuLight, props, (0, vue_1.toRef)(props, 'clsPrefix'));
        const selfRef = (0, vue_1.ref)(null);
        const virtualListRef = (0, vue_1.ref)(null);
        const scrollbarRef = (0, vue_1.ref)(null);
        const flattenedNodesRef = (0, vue_1.computed)(() => props.treeMate.getFlattenedNodes());
        const fIndexGetterRef = (0, vue_1.computed)(() => (0, treemate_1.createIndexGetter)(flattenedNodesRef.value));
        const pendingNodeRef = (0, vue_1.ref)(null);
        function initPendingNode() {
            const { treeMate } = props;
            let defaultPendingNode = null;
            const { value } = props;
            if (value === null) {
                defaultPendingNode = treeMate.getFirstAvailableNode();
            }
            else {
                if (props.multiple) {
                    defaultPendingNode = treeMate.getNode((value || [])[(value || []).length - 1]);
                }
                else {
                    defaultPendingNode = treeMate.getNode(value);
                }
                if (!defaultPendingNode || defaultPendingNode.disabled) {
                    defaultPendingNode = treeMate.getFirstAvailableNode();
                }
            }
            if (defaultPendingNode) {
                setPendingTmNode(defaultPendingNode);
            }
            else {
                setPendingTmNode(null);
            }
        }
        function clearPendingNodeIfInvalid() {
            const { value: pendingNode } = pendingNodeRef;
            if (pendingNode && !props.treeMate.getNode(pendingNode.key)) {
                pendingNodeRef.value = null;
            }
        }
        let initPendingNodeWatchStopHandle;
        (0, vue_1.watch)(() => props.show, (show) => {
            if (show) {
                initPendingNodeWatchStopHandle = (0, vue_1.watch)(() => props.treeMate, () => {
                    if (props.resetMenuOnOptionsChange) {
                        if (props.autoPending) {
                            initPendingNode();
                        }
                        else {
                            clearPendingNodeIfInvalid();
                        }
                        void (0, vue_1.nextTick)(scrollToPendingNode);
                    }
                    else {
                        clearPendingNodeIfInvalid();
                    }
                }, {
                    immediate: true
                });
            }
            else {
                initPendingNodeWatchStopHandle === null || initPendingNodeWatchStopHandle === void 0 ? void 0 : initPendingNodeWatchStopHandle();
            }
        }, {
            immediate: true
        });
        (0, vue_1.onBeforeUnmount)(() => {
            initPendingNodeWatchStopHandle === null || initPendingNodeWatchStopHandle === void 0 ? void 0 : initPendingNodeWatchStopHandle();
        });
        const itemSizeRef = (0, vue_1.computed)(() => {
            return (0, seemly_1.depx)(themeRef.value.self[(0, cssr_1.createKey)('optionHeight', props.size)]);
        });
        const paddingRef = (0, vue_1.computed)(() => {
            return (0, seemly_1.getPadding)(themeRef.value.self[(0, cssr_1.createKey)('padding', props.size)]);
        });
        const valueSetRef = (0, vue_1.computed)(() => {
            if (props.multiple && Array.isArray(props.value)) {
                return new Set(props.value);
            }
            return new Set();
        });
        const emptyRef = (0, vue_1.computed)(() => {
            const tmNodes = flattenedNodesRef.value;
            return tmNodes && tmNodes.length === 0;
        });
        const mergedRenderEmptyRef = (0, vue_1.computed)(() => {
            var _a, _b;
            return (_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Select) === null || _b === void 0 ? void 0 : _b.renderEmpty;
        });
        function doToggle(tmNode) {
            const { onToggle } = props;
            if (onToggle)
                onToggle(tmNode);
        }
        function doScroll(e) {
            const { onScroll } = props;
            if (onScroll)
                onScroll(e);
        }
        // required, scroller sync need to be triggered manually
        function handleVirtualListScroll(e) {
            var _a;
            (_a = scrollbarRef.value) === null || _a === void 0 ? void 0 : _a.sync();
            doScroll(e);
        }
        function handleVirtualListResize() {
            var _a;
            (_a = scrollbarRef.value) === null || _a === void 0 ? void 0 : _a.sync();
        }
        function getPendingTmNode() {
            const { value: pendingTmNode } = pendingNodeRef;
            if (pendingTmNode)
                return pendingTmNode;
            return null;
        }
        function handleOptionMouseEnter(e, tmNode) {
            if (tmNode.disabled)
                return;
            setPendingTmNode(tmNode, false);
        }
        function handleOptionClick(e, tmNode) {
            if (tmNode.disabled)
                return;
            doToggle(tmNode);
        }
        // keyboard related methods
        function handleKeyUp(e) {
            var _a;
            if ((0, seemly_1.happensIn)(e, 'action'))
                return;
            (_a = props.onKeyup) === null || _a === void 0 ? void 0 : _a.call(props, e);
        }
        function handleKeyDown(e) {
            var _a;
            if ((0, seemly_1.happensIn)(e, 'action'))
                return;
            (_a = props.onKeydown) === null || _a === void 0 ? void 0 : _a.call(props, e);
        }
        function handleMouseDown(e) {
            var _a;
            (_a = props.onMousedown) === null || _a === void 0 ? void 0 : _a.call(props, e);
            if (props.focusable)
                return;
            e.preventDefault();
        }
        function next() {
            const { value: pendingTmNode } = pendingNodeRef;
            if (pendingTmNode) {
                setPendingTmNode(pendingTmNode.getNext({ loop: true }), true);
            }
        }
        function prev() {
            const { value: pendingTmNode } = pendingNodeRef;
            if (pendingTmNode) {
                setPendingTmNode(pendingTmNode.getPrev({ loop: true }), true);
            }
        }
        function setPendingTmNode(tmNode, doScroll = false) {
            pendingNodeRef.value = tmNode;
            if (doScroll)
                scrollToPendingNode();
        }
        function scrollToPendingNode() {
            var _a, _b;
            const tmNode = pendingNodeRef.value;
            if (!tmNode)
                return;
            const fIndex = fIndexGetterRef.value(tmNode.key);
            if (fIndex === null)
                return;
            if (props.virtualScroll) {
                (_a = virtualListRef.value) === null || _a === void 0 ? void 0 : _a.scrollTo({ index: fIndex });
            }
            else {
                (_b = scrollbarRef.value) === null || _b === void 0 ? void 0 : _b.scrollTo({
                    index: fIndex,
                    elSize: itemSizeRef.value
                });
            }
        }
        function handleFocusin(e) {
            var _a, _b;
            if ((_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.contains(e.target)) {
                (_b = props.onFocus) === null || _b === void 0 ? void 0 : _b.call(props, e);
            }
        }
        function handleFocusout(e) {
            var _a, _b;
            if (!((_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.contains(e.relatedTarget))) {
                (_b = props.onBlur) === null || _b === void 0 ? void 0 : _b.call(props, e);
            }
        }
        (0, vue_1.provide)(interface_1.internalSelectionMenuInjectionKey, {
            handleOptionMouseEnter,
            handleOptionClick,
            valueSetRef,
            pendingTmNodeRef: pendingNodeRef,
            nodePropsRef: (0, vue_1.toRef)(props, 'nodeProps'),
            showCheckmarkRef: (0, vue_1.toRef)(props, 'showCheckmark'),
            multipleRef: (0, vue_1.toRef)(props, 'multiple'),
            valueRef: (0, vue_1.toRef)(props, 'value'),
            renderLabelRef: (0, vue_1.toRef)(props, 'renderLabel'),
            renderOptionRef: (0, vue_1.toRef)(props, 'renderOption'),
            labelFieldRef: (0, vue_1.toRef)(props, 'labelField'),
            valueFieldRef: (0, vue_1.toRef)(props, 'valueField')
        });
        (0, vue_1.provide)(interface_1.internalSelectionMenuBodyInjectionKey, selfRef);
        (0, vue_1.onMounted)(() => {
            const { value } = scrollbarRef;
            if (value)
                value.sync();
        });
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { size } = props;
            const { common: { cubicBezierEaseInOut }, self: { height, borderRadius, color, groupHeaderTextColor, actionDividerColor, optionTextColorPressed, optionTextColor, optionTextColorDisabled, optionTextColorActive, optionOpacityDisabled, optionCheckColor, actionTextColor, optionColorPending, optionColorActive, loadingColor, loadingSize, optionColorActivePending, [(0, cssr_1.createKey)('optionFontSize', size)]: fontSize, [(0, cssr_1.createKey)('optionHeight', size)]: optionHeight, [(0, cssr_1.createKey)('optionPadding', size)]: optionPadding } } = themeRef.value;
            return {
                '--n-height': height,
                '--n-action-divider-color': actionDividerColor,
                '--n-action-text-color': actionTextColor,
                '--n-bezier': cubicBezierEaseInOut,
                '--n-border-radius': borderRadius,
                '--n-color': color,
                '--n-option-font-size': fontSize,
                '--n-group-header-text-color': groupHeaderTextColor,
                '--n-option-check-color': optionCheckColor,
                '--n-option-color-pending': optionColorPending,
                '--n-option-color-active': optionColorActive,
                '--n-option-color-active-pending': optionColorActivePending,
                '--n-option-height': optionHeight,
                '--n-option-opacity-disabled': optionOpacityDisabled,
                '--n-option-text-color': optionTextColor,
                '--n-option-text-color-active': optionTextColorActive,
                '--n-option-text-color-disabled': optionTextColorDisabled,
                '--n-option-text-color-pressed': optionTextColorPressed,
                '--n-option-padding': optionPadding,
                '--n-option-padding-left': (0, seemly_1.getPadding)(optionPadding, 'left'),
                '--n-option-padding-right': (0, seemly_1.getPadding)(optionPadding, 'right'),
                '--n-loading-color': loadingColor,
                '--n-loading-size': loadingSize
            };
        });
        const { inlineThemeDisabled } = props;
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('internal-select-menu', (0, vue_1.computed)(() => props.size[0]), cssVarsRef, props)
            : undefined;
        const exposedProps = {
            selfRef,
            next,
            prev,
            getPendingTmNode
        };
        (0, _utils_1.useOnResize)(selfRef, props.onResize);
        return Object.assign({ mergedTheme: themeRef, mergedClsPrefix: mergedClsPrefixRef, rtlEnabled: rtlEnabledRef, virtualListRef,
            scrollbarRef, itemSize: itemSizeRef, padding: paddingRef, flattenedNodes: flattenedNodesRef, empty: emptyRef, mergedRenderEmpty: mergedRenderEmptyRef, virtualListContainer() {
                const { value } = virtualListRef;
                return value === null || value === void 0 ? void 0 : value.listElRef;
            },
            virtualListContent() {
                const { value } = virtualListRef;
                return value === null || value === void 0 ? void 0 : value.itemsElRef;
            },
            doScroll,
            handleFocusin,
            handleFocusout,
            handleKeyUp,
            handleKeyDown,
            handleMouseDown,
            handleVirtualListResize,
            handleVirtualListScroll, cssVars: inlineThemeDisabled ? undefined : cssVarsRef, themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass, onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender }, exposedProps);
    },
    render() {
        const { $slots, virtualScroll, clsPrefix, mergedTheme, themeClass, onRender } = this;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        return ((0, vue_1.h)("div", { ref: "selfRef", tabindex: this.focusable ? 0 : -1, class: [
                `${clsPrefix}-base-select-menu`,
                `${clsPrefix}-base-select-menu--${this.size}-size`,
                this.rtlEnabled && `${clsPrefix}-base-select-menu--rtl`,
                themeClass,
                this.multiple && `${clsPrefix}-base-select-menu--multiple`
            ], style: this.cssVars, onFocusin: this.handleFocusin, onFocusout: this.handleFocusout, onKeyup: this.handleKeyUp, onKeydown: this.handleKeyDown, onMousedown: this.handleMouseDown, onMouseenter: this.onMouseenter, onMouseleave: this.onMouseleave },
            (0, _utils_1.resolveWrappedSlot)($slots.header, children => children && ((0, vue_1.h)("div", { class: `${clsPrefix}-base-select-menu__header`, "data-header": true, key: "header" }, children))),
            this.loading ? ((0, vue_1.h)("div", { class: `${clsPrefix}-base-select-menu__loading` },
                (0, vue_1.h)(loading_1.default, { clsPrefix: clsPrefix, strokeWidth: 20 }))) : !this.empty ? ((0, vue_1.h)(scrollbar_1.NScrollbar, Object.assign({ ref: "scrollbarRef", theme: mergedTheme.peers.Scrollbar, themeOverrides: mergedTheme.peerOverrides.Scrollbar, scrollable: this.scrollable, container: virtualScroll ? this.virtualListContainer : undefined, content: virtualScroll ? this.virtualListContent : undefined, onScroll: virtualScroll ? undefined : this.doScroll }, this.scrollbarProps), {
                default: () => {
                    return virtualScroll ? ((0, vue_1.h)(vueuc_1.VirtualList, { ref: "virtualListRef", class: `${clsPrefix}-virtual-list`, items: this.flattenedNodes, itemSize: this.itemSize, showScrollbar: false, paddingTop: this.padding.top, paddingBottom: this.padding.bottom, onResize: this.handleVirtualListResize, onScroll: this.handleVirtualListScroll, itemResizable: true }, {
                        default: ({ item: tmNode }) => {
                            return tmNode.isGroup ? ((0, vue_1.h)(SelectGroupHeader_1.default, { key: tmNode.key, clsPrefix: clsPrefix, tmNode: tmNode })) : tmNode.ignored ? null : ((0, vue_1.h)(SelectOption_1.default, { clsPrefix: clsPrefix, key: tmNode.key, tmNode: tmNode }));
                        }
                    })) : ((0, vue_1.h)("div", { class: `${clsPrefix}-base-select-menu-option-wrapper`, style: {
                            paddingTop: this.padding.top,
                            paddingBottom: this.padding.bottom
                        } }, this.flattenedNodes.map(tmNode => tmNode.isGroup ? ((0, vue_1.h)(SelectGroupHeader_1.default, { key: tmNode.key, clsPrefix: clsPrefix, tmNode: tmNode })) : ((0, vue_1.h)(SelectOption_1.default, { clsPrefix: clsPrefix, key: tmNode.key, tmNode: tmNode })))));
                }
            })) : ((0, vue_1.h)("div", { class: `${clsPrefix}-base-select-menu__empty`, "data-empty": true }, (0, _utils_1.resolveSlot)($slots.empty, () => {
                var _a;
                return [
                    ((_a = this.mergedRenderEmpty) === null || _a === void 0 ? void 0 : _a.call(this)) || ((0, vue_1.h)(empty_1.NEmpty, { theme: mergedTheme.peers.Empty, themeOverrides: mergedTheme.peerOverrides.Empty, size: this.size }))
                ];
            }))),
            (0, _utils_1.resolveWrappedSlot)($slots.action, children => children && [
                (0, vue_1.h)("div", { class: `${clsPrefix}-base-select-menu__action`, "data-action": true, key: "action" }, children),
                (0, vue_1.h)(focus_detector_1.default, { onFocus: this.onTabOut, key: "focus-detector" })
            ])));
    }
});
