"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropdownProps = void 0;
const treemate_1 = require("treemate");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const popover_1 = require("../../popover");
const Popover_1 = require("../../popover/src/Popover");
const styles_1 = require("../styles");
const context_1 = require("./context");
const DropdownMenu_1 = __importDefault(require("./DropdownMenu"));
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
const dropdownBaseProps = {
    animated: {
        type: Boolean,
        default: true
    },
    keyboard: {
        type: Boolean,
        default: true
    },
    size: String,
    inverted: Boolean,
    placement: {
        type: String,
        default: 'bottom'
    },
    onSelect: [Function, Array],
    options: {
        type: Array,
        default: () => []
    },
    menuProps: Function,
    showArrow: Boolean,
    renderLabel: Function,
    renderIcon: Function,
    renderOption: Function,
    nodeProps: Function,
    labelField: {
        type: String,
        default: 'label'
    },
    keyField: {
        type: String,
        default: 'key'
    },
    childrenField: {
        type: String,
        default: 'children'
    },
    // for menu, not documented
    value: [String, Number]
};
const popoverPropKeys = Object.keys(Popover_1.popoverBaseProps);
exports.dropdownProps = Object.assign(Object.assign(Object.assign({}, Popover_1.popoverBaseProps), dropdownBaseProps), _mixins_1.useTheme.props);
exports.default = (0, vue_1.defineComponent)({
    name: 'Dropdown',
    inheritAttrs: false,
    props: exports.dropdownProps,
    setup(props) {
        const uncontrolledShowRef = (0, vue_1.ref)(false);
        const mergedShowRef = (0, vooks_1.useMergedState)((0, vue_1.toRef)(props, 'show'), uncontrolledShowRef);
        const treemateRef = (0, vue_1.computed)(() => {
            const { keyField, childrenField } = props;
            return (0, treemate_1.createTreeMate)(props.options, {
                getKey(node) {
                    return node[keyField];
                },
                getDisabled(node) {
                    return node.disabled === true;
                },
                getIgnored(node) {
                    return node.type === 'divider' || node.type === 'render';
                },
                getChildren(node) {
                    return node[childrenField];
                }
            });
        });
        const tmNodesRef = (0, vue_1.computed)(() => {
            return treemateRef.value.treeNodes;
        });
        const hoverKeyRef = (0, vue_1.ref)(null);
        const keyboardKeyRef = (0, vue_1.ref)(null);
        const lastToggledSubmenuKeyRef = (0, vue_1.ref)(null);
        const pendingKeyRef = (0, vue_1.computed)(() => {
            var _a, _b, _c;
            return ((_c = (_b = (_a = hoverKeyRef.value) !== null && _a !== void 0 ? _a : keyboardKeyRef.value) !== null && _b !== void 0 ? _b : lastToggledSubmenuKeyRef.value) !== null && _c !== void 0 ? _c : null);
        });
        const pendingKeyPathRef = (0, vue_1.computed)(() => treemateRef.value.getPath(pendingKeyRef.value).keyPath);
        const activeKeyPathRef = (0, vue_1.computed)(() => treemateRef.value.getPath(props.value).keyPath);
        const keyboardEnabledRef = (0, vooks_1.useMemo)(() => {
            return props.keyboard && mergedShowRef.value;
        });
        (0, vooks_1.useKeyboard)({
            keydown: {
                ArrowUp: {
                    prevent: true,
                    handler: handleKeydownUp
                },
                ArrowRight: {
                    prevent: true,
                    handler: handleKeydownRight
                },
                ArrowDown: {
                    prevent: true,
                    handler: handleKeydownDown
                },
                ArrowLeft: {
                    prevent: true,
                    handler: handleKeydownLeft
                },
                Enter: {
                    prevent: true,
                    handler: handleKeydownEnter
                },
                Escape: handleKeydownEsc
            }
        }, keyboardEnabledRef);
        const { mergedClsPrefixRef, inlineThemeDisabled, mergedComponentPropsRef } = (0, _mixins_1.useConfig)(props);
        const mergedSizeRef = (0, vue_1.computed)(() => {
            var _a, _b;
            return (props.size || ((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Dropdown) === null || _b === void 0 ? void 0 : _b.size) || 'medium');
        });
        const themeRef = (0, _mixins_1.useTheme)('Dropdown', '-dropdown', index_cssr_1.default, styles_1.dropdownLight, props, mergedClsPrefixRef);
        (0, vue_1.provide)(context_1.dropdownInjectionKey, {
            labelFieldRef: (0, vue_1.toRef)(props, 'labelField'),
            childrenFieldRef: (0, vue_1.toRef)(props, 'childrenField'),
            renderLabelRef: (0, vue_1.toRef)(props, 'renderLabel'),
            renderIconRef: (0, vue_1.toRef)(props, 'renderIcon'),
            hoverKeyRef,
            keyboardKeyRef,
            lastToggledSubmenuKeyRef,
            pendingKeyPathRef,
            activeKeyPathRef,
            animatedRef: (0, vue_1.toRef)(props, 'animated'),
            mergedShowRef,
            nodePropsRef: (0, vue_1.toRef)(props, 'nodeProps'),
            renderOptionRef: (0, vue_1.toRef)(props, 'renderOption'),
            menuPropsRef: (0, vue_1.toRef)(props, 'menuProps'),
            doSelect,
            doUpdateShow
        });
        // watch
        (0, vue_1.watch)(mergedShowRef, (value) => {
            if (!props.animated && !value) {
                clearPendingState();
            }
        });
        // methods
        function doSelect(key, node) {
            const { onSelect } = props;
            if (onSelect)
                (0, _utils_1.call)(onSelect, key, node);
        }
        function doUpdateShow(value) {
            const { 'onUpdate:show': _onUpdateShow, onUpdateShow } = props;
            if (_onUpdateShow)
                (0, _utils_1.call)(_onUpdateShow, value);
            if (onUpdateShow)
                (0, _utils_1.call)(onUpdateShow, value);
            uncontrolledShowRef.value = value;
        }
        function clearPendingState() {
            hoverKeyRef.value = null;
            keyboardKeyRef.value = null;
            lastToggledSubmenuKeyRef.value = null;
        }
        function handleKeydownEsc() {
            doUpdateShow(false);
        }
        function handleKeydownLeft() {
            handleKeydown('left');
        }
        function handleKeydownRight() {
            handleKeydown('right');
        }
        function handleKeydownUp() {
            handleKeydown('up');
        }
        function handleKeydownDown() {
            handleKeydown('down');
        }
        function handleKeydownEnter() {
            const pendingNode = getPendingNode();
            if ((pendingNode === null || pendingNode === void 0 ? void 0 : pendingNode.isLeaf) && mergedShowRef.value) {
                doSelect(pendingNode.key, pendingNode.rawNode);
                doUpdateShow(false);
            }
        }
        function getPendingNode() {
            var _a;
            const { value: treeMate } = treemateRef;
            const { value: pendingKey } = pendingKeyRef;
            if (!treeMate || pendingKey === null)
                return null;
            return (_a = treeMate.getNode(pendingKey)) !== null && _a !== void 0 ? _a : null;
        }
        function handleKeydown(direction) {
            const { value: pendingKey } = pendingKeyRef;
            const { value: { getFirstAvailableNode } } = treemateRef;
            let nextKeyboardKey = null;
            if (pendingKey === null) {
                const firstNode = getFirstAvailableNode();
                if (firstNode !== null) {
                    nextKeyboardKey = firstNode.key;
                }
            }
            else {
                const currentNode = getPendingNode();
                if (currentNode) {
                    let nextNode;
                    switch (direction) {
                        case 'down':
                            nextNode = currentNode.getNext();
                            break;
                        case 'up':
                            nextNode = currentNode.getPrev();
                            break;
                        case 'right':
                            nextNode = currentNode.getChild();
                            break;
                        case 'left':
                            nextNode = currentNode.getParent();
                            break;
                    }
                    if (nextNode)
                        nextKeyboardKey = nextNode.key;
                }
            }
            if (nextKeyboardKey !== null) {
                hoverKeyRef.value = null;
                keyboardKeyRef.value = nextKeyboardKey;
            }
        }
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { inverted } = props;
            const size = mergedSizeRef.value;
            const { common: { cubicBezierEaseInOut }, self } = themeRef.value;
            const { padding, dividerColor, borderRadius, optionOpacityDisabled, [(0, _utils_1.createKey)('optionIconSuffixWidth', size)]: optionIconSuffixWidth, [(0, _utils_1.createKey)('optionSuffixWidth', size)]: optionSuffixWidth, [(0, _utils_1.createKey)('optionIconPrefixWidth', size)]: optionIconPrefixWidth, [(0, _utils_1.createKey)('optionPrefixWidth', size)]: optionPrefixWidth, [(0, _utils_1.createKey)('fontSize', size)]: fontSize, [(0, _utils_1.createKey)('optionHeight', size)]: optionHeight, [(0, _utils_1.createKey)('optionIconSize', size)]: optionIconSize } = self;
            const vars = {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-font-size': fontSize,
                '--n-padding': padding,
                '--n-border-radius': borderRadius,
                '--n-option-height': optionHeight,
                '--n-option-prefix-width': optionPrefixWidth,
                '--n-option-icon-prefix-width': optionIconPrefixWidth,
                '--n-option-suffix-width': optionSuffixWidth,
                '--n-option-icon-suffix-width': optionIconSuffixWidth,
                '--n-option-icon-size': optionIconSize,
                '--n-divider-color': dividerColor,
                '--n-option-opacity-disabled': optionOpacityDisabled
            };
            // writing like this is the fastest method
            if (inverted) {
                vars['--n-color'] = self.colorInverted;
                vars['--n-option-color-hover'] = self.optionColorHoverInverted;
                vars['--n-option-color-active'] = self.optionColorActiveInverted;
                vars['--n-option-text-color'] = self.optionTextColorInverted;
                vars['--n-option-text-color-hover'] = self.optionTextColorHoverInverted;
                vars['--n-option-text-color-active']
                    = self.optionTextColorActiveInverted;
                vars['--n-option-text-color-child-active']
                    = self.optionTextColorChildActiveInverted;
                vars['--n-prefix-color'] = self.prefixColorInverted;
                vars['--n-suffix-color'] = self.suffixColorInverted;
                vars['--n-group-header-text-color'] = self.groupHeaderTextColorInverted;
            }
            else {
                vars['--n-color'] = self.color;
                vars['--n-option-color-hover'] = self.optionColorHover;
                vars['--n-option-color-active'] = self.optionColorActive;
                vars['--n-option-text-color'] = self.optionTextColor;
                vars['--n-option-text-color-hover'] = self.optionTextColorHover;
                vars['--n-option-text-color-active'] = self.optionTextColorActive;
                vars['--n-option-text-color-child-active']
                    = self.optionTextColorChildActive;
                vars['--n-prefix-color'] = self.prefixColor;
                vars['--n-suffix-color'] = self.suffixColor;
                vars['--n-group-header-text-color'] = self.groupHeaderTextColor;
            }
            return vars;
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('dropdown', (0, vue_1.computed)(() => `${mergedSizeRef.value[0]}${props.inverted ? 'i' : ''}`), cssVarsRef, props)
            : undefined;
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            mergedTheme: themeRef,
            mergedSize: mergedSizeRef,
            // data
            tmNodes: tmNodesRef,
            // show
            mergedShow: mergedShowRef,
            // methods
            handleAfterLeave: () => {
                if (!props.animated)
                    return;
                clearPendingState();
            },
            doUpdateShow,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
        };
    },
    render() {
        const renderPopoverBody = (className, ref, style, onMouseenter, onMouseleave) => {
            var _a;
            const { mergedClsPrefix, menuProps } = this;
            (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
            const menuNodeProps = (menuProps === null || menuProps === void 0 ? void 0 : menuProps(undefined, this.tmNodes.map(v => v.rawNode))) || {};
            const dropdownProps = {
                ref: (0, _utils_1.createRefSetter)(ref),
                class: [
                    className,
                    `${mergedClsPrefix}-dropdown`,
                    `${mergedClsPrefix}-dropdown--${this.mergedSize}-size`,
                    this.themeClass
                ],
                clsPrefix: mergedClsPrefix,
                tmNodes: this.tmNodes,
                style: [...style, this.cssVars],
                showArrow: this.showArrow,
                arrowStyle: this.arrowStyle,
                scrollable: this.scrollable,
                onMouseenter,
                onMouseleave
            };
            return (0, vue_1.h)(DropdownMenu_1.default, (0, vue_1.mergeProps)(this.$attrs, dropdownProps, menuNodeProps));
        };
        const { mergedTheme } = this;
        const popoverProps = {
            show: this.mergedShow,
            theme: mergedTheme.peers.Popover,
            themeOverrides: mergedTheme.peerOverrides.Popover,
            internalOnAfterLeave: this.handleAfterLeave,
            internalRenderBody: renderPopoverBody,
            onUpdateShow: this.doUpdateShow,
            'onUpdate:show': undefined
        };
        return ((0, vue_1.h)(popover_1.NPopover, Object.assign({}, (0, _utils_1.keep)(this.$props, popoverPropKeys), popoverProps), {
            trigger: () => { var _a, _b; return (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a); }
        }));
    }
});
