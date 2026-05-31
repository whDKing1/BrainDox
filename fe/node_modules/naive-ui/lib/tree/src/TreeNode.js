"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seemly_1 = require("seemly");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _utils_1 = require("../../_utils");
const dnd_1 = require("./dnd");
const interface_1 = require("./interface");
const TreeNodeCheckbox_1 = __importDefault(require("./TreeNodeCheckbox"));
const TreeNodeContent_1 = __importDefault(require("./TreeNodeContent"));
const TreeNodeSwitcher_1 = __importDefault(require("./TreeNodeSwitcher"));
const utils_1 = require("./utils");
const TreeNode = (0, vue_1.defineComponent)({
    name: 'TreeNode',
    props: {
        clsPrefix: {
            type: String,
            required: true
        },
        tmNode: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const NTree = (0, vue_1.inject)(interface_1.treeInjectionKey);
        const { droppingNodeParentRef, droppingMouseNodeRef, draggingNodeRef, droppingPositionRef, droppingOffsetLevelRef, nodePropsRef, indentRef, blockLineRef, checkboxPlacementRef, checkOnClickRef, disabledFieldRef, showLineRef, renderSwitcherIconRef, overrideDefaultNodeClickBehaviorRef } = NTree;
        const checkboxDisabledRef = (0, vooks_1.useMemo)(() => !!props.tmNode.rawNode.checkboxDisabled);
        const nodeIsDisabledRef = (0, vooks_1.useMemo)(() => {
            return (0, utils_1.isNodeDisabled)(props.tmNode, disabledFieldRef.value);
        });
        const disabledRef = (0, vooks_1.useMemo)(() => NTree.disabledRef.value || nodeIsDisabledRef.value);
        const resolvedNodePropsRef = (0, vue_1.computed)(() => {
            const { value: nodeProps } = nodePropsRef;
            if (!nodeProps)
                return undefined;
            return nodeProps({
                option: props.tmNode.rawNode
            });
        });
        // used for drag and drop
        const contentInstRef = (0, vue_1.ref)(null);
        // must be non-reactive
        const contentElRef = { value: null };
        (0, vue_1.onMounted)(() => {
            contentElRef.value = contentInstRef.value.$el;
        });
        function handleSwitcherClick() {
            const callback = () => {
                const { tmNode } = props;
                if (!tmNode.isLeaf && !tmNode.shallowLoaded) {
                    if (!NTree.loadingKeysRef.value.has(tmNode.key)) {
                        NTree.loadingKeysRef.value.add(tmNode.key);
                    }
                    else {
                        return;
                    }
                    const { onLoadRef: { value: onLoad } } = NTree;
                    if (onLoad) {
                        void onLoad(tmNode.rawNode)
                            .then((value) => {
                            if (value !== false) {
                                NTree.handleSwitcherClick(tmNode);
                            }
                        })
                            .finally(() => {
                            NTree.loadingKeysRef.value.delete(tmNode.key);
                        });
                    }
                }
                else {
                    NTree.handleSwitcherClick(tmNode);
                }
            };
            if (renderSwitcherIconRef.value) {
                // if renderSwitcherIcon is set, icon dom may be altered before event
                // bubbles to parent dom, so that target check fails. Call it in next
                // event loop so that event bubble phase is finishes.
                setTimeout(callback, 0);
            }
            else {
                callback();
            }
        }
        const selectableRef = (0, vooks_1.useMemo)(() => !nodeIsDisabledRef.value
            && NTree.selectableRef.value
            && (NTree.internalTreeSelect
                ? NTree.mergedCheckStrategyRef.value !== 'child'
                    || (NTree.multipleRef.value && NTree.cascadeRef.value)
                    || props.tmNode.isLeaf
                : true));
        const checkableRef = (0, vooks_1.useMemo)(() => NTree.checkableRef.value
            && (NTree.cascadeRef.value
                || NTree.mergedCheckStrategyRef.value !== 'child'
                || props.tmNode.isLeaf));
        const checkedRef = (0, vooks_1.useMemo)(() => NTree.displayedCheckedKeysRef.value.includes(props.tmNode.key));
        const mergedCheckOnClickRef = (0, vooks_1.useMemo)(() => {
            const { value: checkable } = checkableRef;
            if (!checkable)
                return false;
            const { value: checkOnClick } = checkOnClickRef;
            const { tmNode } = props;
            if (typeof checkOnClick === 'boolean') {
                return !tmNode.disabled && checkOnClick;
            }
            return checkOnClick(props.tmNode.rawNode);
        });
        function _handleClick(e) {
            const { value: expandOnClick } = NTree.expandOnClickRef;
            const { value: selectable } = selectableRef;
            const { value: mergedCheckOnClick } = mergedCheckOnClickRef;
            if (!selectable && !expandOnClick && !mergedCheckOnClick)
                return;
            if ((0, seemly_1.happensIn)(e, 'checkbox') || (0, seemly_1.happensIn)(e, 'switcher'))
                return;
            const { tmNode } = props;
            if (selectable) {
                NTree.handleSelect(tmNode);
            }
            if (expandOnClick && !tmNode.isLeaf) {
                handleSwitcherClick();
            }
            if (mergedCheckOnClick) {
                handleCheck(!checkedRef.value);
            }
        }
        function handleNodeClick(e) {
            var _a, _b;
            if ((0, seemly_1.happensIn)(e, 'checkbox') || (0, seemly_1.happensIn)(e, 'switcher'))
                return;
            if (!disabledRef.value) {
                const overrideDefaultNodeClickBehavior = overrideDefaultNodeClickBehaviorRef.value;
                let shouldOverride = false;
                if (overrideDefaultNodeClickBehavior) {
                    switch (overrideDefaultNodeClickBehavior({ option: props.tmNode.rawNode })) {
                        case 'toggleCheck':
                            shouldOverride = true;
                            handleCheck(!checkedRef.value);
                            break;
                        case 'toggleSelect':
                            shouldOverride = true;
                            NTree.handleSelect(props.tmNode);
                            break;
                        case 'toggleExpand':
                            shouldOverride = true;
                            handleSwitcherClick();
                            shouldOverride = true;
                            break;
                        case 'none':
                            shouldOverride = true;
                            shouldOverride = true;
                            return;
                        case 'default':
                        default:
                            break;
                    }
                }
                if (!shouldOverride) {
                    _handleClick(e);
                }
            }
            (_b = (_a = resolvedNodePropsRef.value) === null || _a === void 0 ? void 0 : _a.onClick) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        }
        function handleContentClick(e) {
            if (blockLineRef.value)
                return;
            handleNodeClick(e);
        }
        function handleLineClick(e) {
            if (!blockLineRef.value)
                return;
            handleNodeClick(e);
        }
        function handleCheck(checked) {
            NTree.handleCheck(props.tmNode, checked);
        }
        // Dnd
        function handleDragStart(e) {
            NTree.handleDragStart({
                event: e,
                node: props.tmNode
            });
        }
        function handleDragEnter(e) {
            if (e.currentTarget !== e.target) {
                return;
            }
            NTree.handleDragEnter({
                event: e,
                node: props.tmNode
            });
        }
        function handleDragOver(e) {
            e.preventDefault(); // if not prevent, drop event won't be fired...
            NTree.handleDragOver({
                event: e,
                node: props.tmNode
            });
        }
        function handleDragEnd(e) {
            NTree.handleDragEnd({
                event: e,
                node: props.tmNode
            });
        }
        function handleDragLeave(e) {
            if (e.currentTarget !== e.target) {
                return;
            }
            NTree.handleDragLeave({
                event: e,
                node: props.tmNode
            });
        }
        function handleDrop(e) {
            e.preventDefault();
            if (droppingPositionRef.value !== null) {
                NTree.handleDrop({
                    event: e,
                    node: props.tmNode,
                    dropPosition: droppingPositionRef.value
                });
            }
        }
        const indentNodes = (0, vue_1.computed)(() => {
            const { clsPrefix } = props;
            const { value: indent } = indentRef;
            if (showLineRef.value) {
                const indentNodes = [];
                let cursor = props.tmNode.parent;
                while (cursor) {
                    if (cursor.isLastChild) {
                        indentNodes.push((0, vue_1.h)("div", { class: `${clsPrefix}-tree-node-indent` },
                            (0, vue_1.h)("div", { style: { width: `${indent}px` } })));
                    }
                    else {
                        indentNodes.push((0, vue_1.h)("div", { class: [
                                `${clsPrefix}-tree-node-indent`,
                                `${clsPrefix}-tree-node-indent--show-line`
                            ] },
                            (0, vue_1.h)("div", { style: { width: `${indent}px` } })));
                    }
                    cursor = cursor.parent;
                }
                return indentNodes.reverse();
            }
            else {
                return (0, seemly_1.repeat)(props.tmNode.level, (0, vue_1.h)("div", { class: `${props.clsPrefix}-tree-node-indent` },
                    (0, vue_1.h)("div", { style: { width: `${indent}px` } })));
            }
        });
        return {
            showDropMark: (0, vooks_1.useMemo)(() => {
                const { value: draggingNode } = draggingNodeRef;
                if (!draggingNode)
                    return;
                const { value: droppingPosition } = droppingPositionRef;
                if (!droppingPosition)
                    return;
                const { value: droppingMouseNode } = droppingMouseNodeRef;
                if (!droppingMouseNode) {
                    return;
                }
                const { tmNode } = props;
                if (tmNode.key === droppingMouseNode.key)
                    return true;
                return false;
            }),
            showDropMarkAsParent: (0, vooks_1.useMemo)(() => {
                const { value: droppingNodeParent } = droppingNodeParentRef;
                if (!droppingNodeParent)
                    return false;
                const { tmNode } = props;
                const { value: droppingPosition } = droppingPositionRef;
                if (droppingPosition === 'before' || droppingPosition === 'after') {
                    return droppingNodeParent.key === tmNode.key;
                }
                return false;
            }),
            pending: (0, vooks_1.useMemo)(() => NTree.pendingNodeKeyRef.value === props.tmNode.key),
            loading: (0, vooks_1.useMemo)(() => NTree.loadingKeysRef.value.has(props.tmNode.key)),
            highlight: (0, vooks_1.useMemo)(() => {
                var _a;
                return (_a = NTree.highlightKeySetRef.value) === null || _a === void 0 ? void 0 : _a.has(props.tmNode.key);
            }),
            checked: checkedRef,
            indeterminate: (0, vooks_1.useMemo)(() => NTree.displayedIndeterminateKeysRef.value.includes(props.tmNode.key)),
            selected: (0, vooks_1.useMemo)(() => NTree.mergedSelectedKeysRef.value.includes(props.tmNode.key)),
            expanded: (0, vooks_1.useMemo)(() => NTree.mergedExpandedKeysRef.value.includes(props.tmNode.key)),
            disabled: disabledRef,
            checkable: checkableRef,
            mergedCheckOnClick: mergedCheckOnClickRef,
            checkboxDisabled: checkboxDisabledRef,
            selectable: selectableRef,
            expandOnClick: NTree.expandOnClickRef,
            internalScrollable: NTree.internalScrollableRef,
            draggable: NTree.draggableRef,
            blockLine: blockLineRef,
            nodeProps: resolvedNodePropsRef,
            checkboxFocusable: NTree.internalCheckboxFocusableRef,
            droppingPosition: droppingPositionRef,
            droppingOffsetLevel: droppingOffsetLevelRef,
            indent: indentRef,
            checkboxPlacement: checkboxPlacementRef,
            showLine: showLineRef,
            contentInstRef,
            contentElRef,
            indentNodes,
            handleCheck,
            handleDrop,
            handleDragStart,
            handleDragEnter,
            handleDragOver,
            handleDragEnd,
            handleDragLeave,
            handleLineClick,
            handleContentClick,
            handleSwitcherClick
        };
    },
    render() {
        const { tmNode, clsPrefix, checkable, expandOnClick, selectable, selected, checked, highlight, draggable, blockLine, indent, indentNodes, disabled, pending, internalScrollable, nodeProps, checkboxPlacement } = this;
        // drag start not inside
        // it need to be append to node itself, not wrapper
        const dragEventHandlers = draggable && !disabled
            ? {
                onDragenter: this.handleDragEnter,
                onDragleave: this.handleDragLeave,
                onDragend: this.handleDragEnd,
                onDrop: this.handleDrop,
                onDragover: this.handleDragOver
            }
            : undefined;
        // In non virtual mode, there's no evidence that which element should be
        // scrolled to, so we need data-key to query the target element.
        const dataKey = internalScrollable ? (0, _utils_1.createDataKey)(tmNode.key) : undefined;
        const checkboxOnRight = checkboxPlacement === 'right';
        const checkboxNode = checkable ? ((0, vue_1.h)(TreeNodeCheckbox_1.default, { indent: indent, right: checkboxOnRight, focusable: this.checkboxFocusable, disabled: disabled || this.checkboxDisabled, clsPrefix: clsPrefix, checked: this.checked, indeterminate: this.indeterminate, onCheck: this.handleCheck })) : null;
        return ((0, vue_1.h)("div", Object.assign({ class: `${clsPrefix}-tree-node-wrapper` }, dragEventHandlers),
            (0, vue_1.h)("div", Object.assign({}, (blockLine ? nodeProps : undefined), { class: [
                    `${clsPrefix}-tree-node`,
                    {
                        [`${clsPrefix}-tree-node--selected`]: selected,
                        [`${clsPrefix}-tree-node--checkable`]: checkable,
                        [`${clsPrefix}-tree-node--highlight`]: highlight,
                        [`${clsPrefix}-tree-node--pending`]: pending,
                        [`${clsPrefix}-tree-node--disabled`]: disabled,
                        [`${clsPrefix}-tree-node--selectable`]: selectable,
                        [`${clsPrefix}-tree-node--clickable`]: selectable || expandOnClick || this.mergedCheckOnClick
                    },
                    nodeProps === null || nodeProps === void 0 ? void 0 : nodeProps.class
                ], "data-key": dataKey, draggable: draggable && blockLine, onClick: this.handleLineClick, onDragstart: draggable && blockLine && !disabled
                    ? this.handleDragStart
                    : undefined }),
                indentNodes,
                tmNode.isLeaf && this.showLine ? ((0, vue_1.h)("div", { class: [
                        `${clsPrefix}-tree-node-indent`,
                        `${clsPrefix}-tree-node-indent--show-line`,
                        tmNode.isLeaf && `${clsPrefix}-tree-node-indent--is-leaf`,
                        tmNode.isLastChild
                            && `${clsPrefix}-tree-node-indent--last-child`
                    ] },
                    (0, vue_1.h)("div", { style: { width: `${indent}px` } }))) : ((0, vue_1.h)(TreeNodeSwitcher_1.default, { clsPrefix: clsPrefix, expanded: this.expanded, selected: selected, loading: this.loading, hide: tmNode.isLeaf, tmNode: this.tmNode, indent: indent, onClick: this.handleSwitcherClick })),
                !checkboxOnRight ? checkboxNode : null,
                (0, vue_1.h)(TreeNodeContent_1.default, { ref: "contentInstRef", clsPrefix: clsPrefix, checked: checked, selected: selected, onClick: this.handleContentClick, nodeProps: blockLine ? undefined : nodeProps, onDragstart: draggable && !blockLine && !disabled
                        ? this.handleDragStart
                        : undefined, tmNode: tmNode }),
                draggable
                    ? this.showDropMark
                        ? (0, dnd_1.renderDropMark)({
                            el: this.contentElRef.value,
                            position: this.droppingPosition,
                            offsetLevel: this.droppingOffsetLevel,
                            indent
                        })
                        : this.showDropMarkAsParent
                            ? (0, dnd_1.renderDropMark)({
                                el: this.contentElRef.value,
                                position: 'inside',
                                offsetLevel: this.droppingOffsetLevel,
                                indent
                            })
                            : null
                    : null,
                checkboxOnRight ? checkboxNode : null)));
    }
});
exports.default = TreeNode;
