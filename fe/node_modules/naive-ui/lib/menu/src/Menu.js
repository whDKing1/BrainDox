"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuProps = void 0;
const seemly_1 = require("seemly");
const treemate_1 = require("treemate");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const vueuc_1 = require("vueuc");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const interface_1 = require("../../layout/src/interface");
const styles_1 = require("../styles");
const context_1 = require("./context");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
const Submenu_1 = require("./Submenu");
const useCheckDeprecated_1 = require("./useCheckDeprecated");
const utils_1 = require("./utils");
exports.menuProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { options: {
        type: Array,
        default: () => []
    }, collapsed: {
        type: Boolean,
        default: undefined
    }, collapsedWidth: {
        type: Number,
        default: 48
    }, iconSize: {
        type: Number,
        default: 20
    }, collapsedIconSize: {
        type: Number,
        default: 24
    }, rootIndent: Number, indent: {
        type: Number,
        default: 32
    }, labelField: {
        type: String,
        default: 'label'
    }, keyField: {
        type: String,
        default: 'key'
    }, childrenField: {
        type: String,
        default: 'children'
    }, disabledField: {
        type: String,
        default: 'disabled'
    }, defaultExpandAll: Boolean, defaultExpandedKeys: Array, expandedKeys: Array, value: [String, Number], defaultValue: {
        type: [String, Number],
        default: null
    }, mode: {
        type: String,
        default: 'vertical'
    }, watchProps: {
        type: Array,
        default: undefined
    }, disabled: Boolean, show: {
        type: Boolean,
        default: true
    }, inverted: Boolean, 'onUpdate:expandedKeys': [Function, Array], onUpdateExpandedKeys: [Function, Array], onUpdateValue: [Function, Array], 'onUpdate:value': [Function, Array], expandIcon: Function, renderIcon: Function, renderLabel: Function, renderExtra: Function, dropdownProps: Object, accordion: Boolean, nodeProps: Function, dropdownPlacement: {
        type: String,
        default: 'bottom'
    }, responsive: Boolean, 
    // deprecated
    items: Array, onOpenNamesChange: [Function, Array], onSelect: [Function, Array], onExpandedNamesChange: [Function, Array], expandedNames: Array, defaultExpandedNames: Array });
exports.default = (0, vue_1.defineComponent)({
    name: 'Menu',
    inheritAttrs: false,
    props: exports.menuProps,
    setup(props) {
        if (process.env.NODE_ENV !== 'production') {
            (0, useCheckDeprecated_1.useCheckDeprecated)(props);
        }
        const { mergedClsPrefixRef, inlineThemeDisabled } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Menu', '-menu', index_cssr_1.default, styles_1.menuLight, props, mergedClsPrefixRef);
        const layoutSider = (0, vue_1.inject)(interface_1.layoutSiderInjectionKey, null);
        const mergedCollapsedRef = (0, vue_1.computed)(() => {
            var _a;
            const { collapsed } = props;
            if (collapsed !== undefined)
                return collapsed;
            if (layoutSider) {
                const { collapseModeRef, collapsedRef } = layoutSider;
                if (collapseModeRef.value === 'width') {
                    return (_a = collapsedRef.value) !== null && _a !== void 0 ? _a : false;
                }
            }
            return false;
        });
        const treeMateRef = (0, vue_1.computed)(() => {
            const { keyField, childrenField, disabledField } = props;
            return (0, treemate_1.createTreeMate)(props.items || props.options, {
                getIgnored(node) {
                    return (0, utils_1.isIgnoredNode)(node);
                },
                getChildren(node) {
                    return node[childrenField];
                },
                getDisabled(node) {
                    return node[disabledField];
                },
                getKey(node) {
                    var _a;
                    return (_a = node[keyField]) !== null && _a !== void 0 ? _a : node.name;
                }
            });
        });
        const treeKeysLevelOneRef = (0, vue_1.computed)(() => new Set(treeMateRef.value.treeNodes.map(e => e.key)));
        const { watchProps } = props;
        const uncontrolledValueRef = (0, vue_1.ref)(null);
        if (watchProps === null || watchProps === void 0 ? void 0 : watchProps.includes('defaultValue')) {
            (0, vue_1.watchEffect)(() => {
                uncontrolledValueRef.value = props.defaultValue;
            });
        }
        else {
            uncontrolledValueRef.value = props.defaultValue;
        }
        const controlledValueRef = (0, vue_1.toRef)(props, 'value');
        const mergedValueRef = (0, vooks_1.useMergedState)(controlledValueRef, uncontrolledValueRef);
        const uncontrolledExpandedKeysRef = (0, vue_1.ref)([]);
        const initUncontrolledExpandedKeys = () => {
            uncontrolledExpandedKeysRef.value = props.defaultExpandAll
                ? treeMateRef.value.getNonLeafKeys()
                : props.defaultExpandedNames
                    || props.defaultExpandedKeys
                    || treeMateRef.value.getPath(mergedValueRef.value, {
                        includeSelf: false
                    }).keyPath;
        };
        if (watchProps === null || watchProps === void 0 ? void 0 : watchProps.includes('defaultExpandedKeys')) {
            (0, vue_1.watchEffect)(initUncontrolledExpandedKeys);
        }
        else {
            initUncontrolledExpandedKeys();
        }
        const controlledExpandedKeysRef = (0, vooks_1.useCompitable)(props, [
            'expandedNames',
            'expandedKeys'
        ]);
        const mergedExpandedKeysRef = (0, vooks_1.useMergedState)(controlledExpandedKeysRef, uncontrolledExpandedKeysRef);
        const tmNodesRef = (0, vue_1.computed)(() => treeMateRef.value.treeNodes);
        const activePathRef = (0, vue_1.computed)(() => {
            return treeMateRef.value.getPath(mergedValueRef.value).keyPath;
        });
        (0, vue_1.provide)(context_1.menuInjectionKey, {
            props,
            mergedCollapsedRef,
            mergedThemeRef: themeRef,
            mergedValueRef,
            mergedExpandedKeysRef,
            activePathRef,
            mergedClsPrefixRef,
            isHorizontalRef: (0, vue_1.computed)(() => props.mode === 'horizontal'),
            invertedRef: (0, vue_1.toRef)(props, 'inverted'),
            doSelect,
            toggleExpand
        });
        function doSelect(value, item) {
            const { 'onUpdate:value': _onUpdateValue, onUpdateValue, onSelect } = props;
            if (onUpdateValue) {
                (0, _utils_1.call)(onUpdateValue, value, item);
            }
            if (_onUpdateValue) {
                (0, _utils_1.call)(_onUpdateValue, value, item);
            }
            if (onSelect) {
                (0, _utils_1.call)(onSelect, value, item);
            }
            uncontrolledValueRef.value = value;
        }
        function doUpdateExpandedKeys(value) {
            const { 'onUpdate:expandedKeys': _onUpdateExpandedKeys, onUpdateExpandedKeys, onExpandedNamesChange, onOpenNamesChange } = props;
            if (_onUpdateExpandedKeys) {
                (0, _utils_1.call)(_onUpdateExpandedKeys, value);
            }
            if (onUpdateExpandedKeys) {
                (0, _utils_1.call)(onUpdateExpandedKeys, value);
            }
            // deprecated
            if (onExpandedNamesChange) {
                (0, _utils_1.call)(onExpandedNamesChange, value);
            }
            if (onOpenNamesChange) {
                (0, _utils_1.call)(onOpenNamesChange, value);
            }
            uncontrolledExpandedKeysRef.value = value;
        }
        function toggleExpand(key) {
            const currentExpandedKeys = Array.from(mergedExpandedKeysRef.value);
            const index = currentExpandedKeys.findIndex(expanededKey => expanededKey === key);
            if (~index) {
                currentExpandedKeys.splice(index, 1);
            }
            else {
                if (props.accordion) {
                    if (treeKeysLevelOneRef.value.has(key)) {
                        const closeKeyIndex = currentExpandedKeys.findIndex(e => treeKeysLevelOneRef.value.has(e));
                        if (closeKeyIndex > -1) {
                            currentExpandedKeys.splice(closeKeyIndex, 1);
                        }
                    }
                }
                currentExpandedKeys.push(key);
            }
            doUpdateExpandedKeys(currentExpandedKeys);
        }
        const showOption = (key) => {
            const selectedKeyPath = treeMateRef.value.getPath(key !== null && key !== void 0 ? key : mergedValueRef.value, {
                includeSelf: false
            }).keyPath;
            if (!selectedKeyPath.length)
                return;
            const currentExpandedKeys = Array.from(mergedExpandedKeysRef.value);
            const nextExpandedKeys = new Set([
                ...currentExpandedKeys,
                ...selectedKeyPath
            ]);
            if (props.accordion) {
                treeKeysLevelOneRef.value.forEach((firstLevelKey) => {
                    if (nextExpandedKeys.has(firstLevelKey)
                        && !selectedKeyPath.includes(firstLevelKey)) {
                        nextExpandedKeys.delete(firstLevelKey);
                    }
                });
            }
            doUpdateExpandedKeys(Array.from(nextExpandedKeys));
        };
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { inverted } = props;
            const { common: { cubicBezierEaseInOut }, self } = themeRef.value;
            const { borderRadius, borderColorHorizontal, fontSize, itemHeight, dividerColor } = self;
            const vars = {
                '--n-divider-color': dividerColor,
                '--n-bezier': cubicBezierEaseInOut,
                '--n-font-size': fontSize,
                '--n-border-color-horizontal': borderColorHorizontal,
                '--n-border-radius': borderRadius,
                '--n-item-height': itemHeight
            };
            if (inverted) {
                vars['--n-group-text-color'] = self.groupTextColorInverted;
                vars['--n-color'] = self.colorInverted;
                vars['--n-item-text-color'] = self.itemTextColorInverted;
                vars['--n-item-text-color-hover'] = self.itemTextColorHoverInverted;
                vars['--n-item-text-color-active'] = self.itemTextColorActiveInverted;
                vars['--n-item-text-color-child-active']
                    = self.itemTextColorChildActiveInverted;
                vars['--n-item-text-color-child-active-hover']
                    = self.itemTextColorChildActiveInverted;
                vars['--n-item-text-color-active-hover']
                    = self.itemTextColorActiveHoverInverted;
                vars['--n-item-icon-color'] = self.itemIconColorInverted;
                vars['--n-item-icon-color-hover'] = self.itemIconColorHoverInverted;
                vars['--n-item-icon-color-active'] = self.itemIconColorActiveInverted;
                vars['--n-item-icon-color-active-hover']
                    = self.itemIconColorActiveHoverInverted;
                vars['--n-item-icon-color-child-active']
                    = self.itemIconColorChildActiveInverted;
                vars['--n-item-icon-color-child-active-hover']
                    = self.itemIconColorChildActiveHoverInverted;
                vars['--n-item-icon-color-collapsed']
                    = self.itemIconColorCollapsedInverted;
                vars['--n-item-text-color-horizontal']
                    = self.itemTextColorHorizontalInverted;
                vars['--n-item-text-color-hover-horizontal']
                    = self.itemTextColorHoverHorizontalInverted;
                vars['--n-item-text-color-active-horizontal']
                    = self.itemTextColorActiveHorizontalInverted;
                vars['--n-item-text-color-child-active-horizontal']
                    = self.itemTextColorChildActiveHorizontalInverted;
                vars['--n-item-text-color-child-active-hover-horizontal']
                    = self.itemTextColorChildActiveHoverHorizontalInverted;
                vars['--n-item-text-color-active-hover-horizontal']
                    = self.itemTextColorActiveHoverHorizontalInverted;
                vars['--n-item-icon-color-horizontal']
                    = self.itemIconColorHorizontalInverted;
                vars['--n-item-icon-color-hover-horizontal']
                    = self.itemIconColorHoverHorizontalInverted;
                vars['--n-item-icon-color-active-horizontal']
                    = self.itemIconColorActiveHorizontalInverted;
                vars['--n-item-icon-color-active-hover-horizontal']
                    = self.itemIconColorActiveHoverHorizontalInverted;
                vars['--n-item-icon-color-child-active-horizontal']
                    = self.itemIconColorChildActiveHorizontalInverted;
                vars['--n-item-icon-color-child-active-hover-horizontal']
                    = self.itemIconColorChildActiveHoverHorizontalInverted;
                vars['--n-arrow-color'] = self.arrowColorInverted;
                vars['--n-arrow-color-hover'] = self.arrowColorHoverInverted;
                vars['--n-arrow-color-active'] = self.arrowColorActiveInverted;
                vars['--n-arrow-color-active-hover']
                    = self.arrowColorActiveHoverInverted;
                vars['--n-arrow-color-child-active']
                    = self.arrowColorChildActiveInverted;
                vars['--n-arrow-color-child-active-hover']
                    = self.arrowColorChildActiveHoverInverted;
                vars['--n-item-color-hover'] = self.itemColorHoverInverted;
                vars['--n-item-color-active'] = self.itemColorActiveInverted;
                vars['--n-item-color-active-hover'] = self.itemColorActiveHoverInverted;
                vars['--n-item-color-active-collapsed']
                    = self.itemColorActiveCollapsedInverted;
            }
            else {
                vars['--n-group-text-color'] = self.groupTextColor;
                vars['--n-color'] = self.color;
                vars['--n-item-text-color'] = self.itemTextColor;
                vars['--n-item-text-color-hover'] = self.itemTextColorHover;
                vars['--n-item-text-color-active'] = self.itemTextColorActive;
                vars['--n-item-text-color-child-active'] = self.itemTextColorChildActive;
                vars['--n-item-text-color-child-active-hover']
                    = self.itemTextColorChildActiveHover;
                vars['--n-item-text-color-active-hover'] = self.itemTextColorActiveHover;
                vars['--n-item-icon-color'] = self.itemIconColor;
                vars['--n-item-icon-color-hover'] = self.itemIconColorHover;
                vars['--n-item-icon-color-active'] = self.itemIconColorActive;
                vars['--n-item-icon-color-active-hover'] = self.itemIconColorActiveHover;
                vars['--n-item-icon-color-child-active'] = self.itemIconColorChildActive;
                vars['--n-item-icon-color-child-active-hover']
                    = self.itemIconColorChildActiveHover;
                vars['--n-item-icon-color-collapsed'] = self.itemIconColorCollapsed;
                vars['--n-item-text-color-horizontal'] = self.itemTextColorHorizontal;
                vars['--n-item-text-color-hover-horizontal']
                    = self.itemTextColorHoverHorizontal;
                vars['--n-item-text-color-active-horizontal']
                    = self.itemTextColorActiveHorizontal;
                vars['--n-item-text-color-child-active-horizontal']
                    = self.itemTextColorChildActiveHorizontal;
                vars['--n-item-text-color-child-active-hover-horizontal']
                    = self.itemTextColorChildActiveHoverHorizontal;
                vars['--n-item-text-color-active-hover-horizontal']
                    = self.itemTextColorActiveHoverHorizontal;
                vars['--n-item-icon-color-horizontal'] = self.itemIconColorHorizontal;
                vars['--n-item-icon-color-hover-horizontal']
                    = self.itemIconColorHoverHorizontal;
                vars['--n-item-icon-color-active-horizontal']
                    = self.itemIconColorActiveHorizontal;
                vars['--n-item-icon-color-active-hover-horizontal']
                    = self.itemIconColorActiveHoverHorizontal;
                vars['--n-item-icon-color-child-active-horizontal']
                    = self.itemIconColorChildActiveHorizontal;
                vars['--n-item-icon-color-child-active-hover-horizontal']
                    = self.itemIconColorChildActiveHoverHorizontal;
                vars['--n-arrow-color'] = self.arrowColor;
                vars['--n-arrow-color-hover'] = self.arrowColorHover;
                vars['--n-arrow-color-active'] = self.arrowColorActive;
                vars['--n-arrow-color-active-hover'] = self.arrowColorActiveHover;
                vars['--n-arrow-color-child-active'] = self.arrowColorChildActive;
                vars['--n-arrow-color-child-active-hover']
                    = self.arrowColorChildActiveHover;
                vars['--n-item-color-hover'] = self.itemColorHover;
                vars['--n-item-color-active'] = self.itemColorActive;
                vars['--n-item-color-active-hover'] = self.itemColorActiveHover;
                vars['--n-item-color-active-collapsed'] = self.itemColorActiveCollapsed;
            }
            return vars;
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('menu', (0, vue_1.computed)(() => (props.inverted ? 'a' : 'b')), cssVarsRef, props)
            : undefined;
        const ellipsisNodeId = (0, seemly_1.createId)();
        const overflowRef = (0, vue_1.ref)(null);
        const counterRef = (0, vue_1.ref)(null);
        let isFirstResize = true;
        const onResize = () => {
            var _a;
            if (isFirstResize) {
                isFirstResize = false;
            }
            else {
                (_a = overflowRef.value) === null || _a === void 0 ? void 0 : _a.sync({
                    showAllItemsBeforeCalculate: true
                });
            }
        };
        function getCounter() {
            return document.getElementById(ellipsisNodeId);
        }
        const ellipsisFromIndexRef = (0, vue_1.ref)(-1);
        function onUpdateCount(count) {
            ellipsisFromIndexRef.value = props.options.length - count;
        }
        function onUpdateOverflow(overflow) {
            if (!overflow) {
                ellipsisFromIndexRef.value = -1;
            }
        }
        const ellipsisOptionRef = (0, vue_1.computed)(() => {
            const ellipsisFromIndex = ellipsisFromIndexRef.value;
            const option = {
                children: ellipsisFromIndex === -1 ? [] : props.options.slice(ellipsisFromIndex)
            };
            return option;
        });
        const ellipsisTreeMateRef = (0, vue_1.computed)(() => {
            const { childrenField, disabledField, keyField } = props;
            return (0, treemate_1.createTreeMate)([ellipsisOptionRef.value], {
                getIgnored(node) {
                    return (0, utils_1.isIgnoredNode)(node);
                },
                getChildren(node) {
                    return node[childrenField];
                },
                getDisabled(node) {
                    return node[disabledField];
                },
                getKey(node) {
                    var _a;
                    return (_a = node[keyField]) !== null && _a !== void 0 ? _a : node.name;
                }
            });
        });
        const emptyTmNodeRef = (0, vue_1.computed)(() => {
            return (0, treemate_1.createTreeMate)([
                {}
            ]).treeNodes[0];
        });
        function renderCounter() {
            var _a;
            if (ellipsisFromIndexRef.value === -1) {
                // Only a placeholder
                return ((0, vue_1.h)(Submenu_1.NSubmenu, { root: true, level: 0, key: "__ellpisisGroupPlaceholder__", internalKey: "__ellpisisGroupPlaceholder__", title: "\u00B7\u00B7\u00B7", tmNode: emptyTmNodeRef.value, domId: ellipsisNodeId, isEllipsisPlaceholder: true }));
            }
            const tmNode = ellipsisTreeMateRef.value.treeNodes[0];
            const activePath = activePathRef.value;
            const childActive = !!((_a = tmNode.children) === null || _a === void 0 ? void 0 : _a.some((tmNode) => {
                return activePath.includes(tmNode.key);
            }));
            return ((0, vue_1.h)(Submenu_1.NSubmenu, { level: 0, root: true, key: "__ellpisisGroup__", internalKey: "__ellpisisGroup__", title: "\u00B7\u00B7\u00B7", virtualChildActive: childActive, tmNode: tmNode, domId: ellipsisNodeId, rawNodes: tmNode.rawNode.children || [], tmNodes: tmNode.children || [], isEllipsisPlaceholder: true }));
        }
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            controlledExpandedKeys: controlledExpandedKeysRef,
            uncontrolledExpanededKeys: uncontrolledExpandedKeysRef,
            mergedExpandedKeys: mergedExpandedKeysRef,
            uncontrolledValue: uncontrolledValueRef,
            mergedValue: mergedValueRef,
            activePath: activePathRef,
            tmNodes: tmNodesRef,
            mergedTheme: themeRef,
            mergedCollapsed: mergedCollapsedRef,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            overflowRef,
            counterRef,
            updateCounter: () => { },
            onResize,
            onUpdateOverflow,
            onUpdateCount,
            renderCounter,
            getCounter,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender,
            showOption,
            deriveResponsiveState: onResize
        };
    },
    render() {
        const { mergedClsPrefix, mode, themeClass, onRender } = this;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        const renderMenuItemNodes = () => this.tmNodes.map(tmNode => (0, utils_1.itemRenderer)(tmNode, this.$props));
        const horizontal = mode === 'horizontal';
        const finalResponsive = horizontal && this.responsive;
        const renderMainNode = () => (0, vue_1.h)('div', (0, vue_1.mergeProps)(this.$attrs, {
            role: mode === 'horizontal' ? 'menubar' : 'menu',
            class: [
                `${mergedClsPrefix}-menu`,
                themeClass,
                `${mergedClsPrefix}-menu--${mode}`,
                finalResponsive && `${mergedClsPrefix}-menu--responsive`,
                this.mergedCollapsed && `${mergedClsPrefix}-menu--collapsed`
            ],
            style: this.cssVars
        }), finalResponsive ? ((0, vue_1.h)(vueuc_1.VOverflow, { ref: "overflowRef", onUpdateOverflow: this.onUpdateOverflow, getCounter: this.getCounter, onUpdateCount: this.onUpdateCount, updateCounter: this.updateCounter, style: {
                width: '100%',
                display: 'flex',
                overflow: 'hidden'
            } }, {
            default: renderMenuItemNodes,
            counter: this.renderCounter
        })) : (renderMenuItemNodes()));
        return finalResponsive ? ((0, vue_1.h)(vueuc_1.VResizeObserver, { onResize: this.onResize }, { default: renderMainNode })) : (renderMainNode());
    }
});
