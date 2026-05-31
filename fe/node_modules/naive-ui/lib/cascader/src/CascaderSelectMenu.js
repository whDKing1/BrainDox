"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const treemate_1 = require("treemate");
const vdirs_1 = require("vdirs");
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const _utils_1 = require("../../_utils");
const utils_1 = require("../../select/src/utils");
const interface_1 = require("./interface");
const utils_2 = require("./utils");
exports.default = (0, vue_1.defineComponent)({
    name: 'NCascaderSelectMenu',
    props: {
        value: {
            type: [String, Number, Array],
            default: null
        },
        show: Boolean,
        pattern: {
            type: String,
            default: ''
        },
        multiple: Boolean,
        tmNodes: {
            type: Array,
            default: () => []
        },
        filter: Function,
        labelField: {
            type: String,
            required: true
        },
        separator: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const { isMountedRef, mergedValueRef, mergedClsPrefixRef, mergedThemeRef, mergedCheckStrategyRef, slots: cascaderSlots, syncSelectMenuPosition, closeMenu, handleSelectMenuClickOutside, doUncheck: cascaderDoUncheck, doCheck: cascaderDoCheck, scrollbarPropsRef, clearPattern } = (0, vue_1.inject)(interface_1.cascaderInjectionKey);
        const menuInstRef = (0, vue_1.ref)(null);
        const selectOptionsRef = (0, vue_1.computed)(() => {
            return (0, utils_2.createSelectOptions)(props.tmNodes, mergedCheckStrategyRef.value === 'child', props.labelField, props.separator);
        });
        const mergedFilterRef = (0, vue_1.computed)(() => {
            const { filter } = props;
            if (filter)
                return filter;
            const { labelField } = props;
            return (pattern, _, path) => path.some(option => option[labelField]
                && ~option[labelField]
                    .toLowerCase()
                    .indexOf(pattern.toLowerCase()));
        });
        const filteredSelectOptionsRef = (0, vue_1.computed)(() => {
            const { pattern } = props;
            const { value: mergedFilter } = mergedFilterRef;
            return (pattern
                ? selectOptionsRef.value.filter((option) => {
                    return mergedFilter(pattern, option.rawNode, option.path);
                })
                : selectOptionsRef.value).map(option => ({
                value: option.value,
                label: option.label
            }));
        });
        const selectTreeMateRef = (0, vue_1.computed)(() => {
            return (0, treemate_1.createTreeMate)(filteredSelectOptionsRef.value, (0, utils_1.createTmOptions)('value', 'children'));
        });
        function handleResize() {
            syncSelectMenuPosition();
        }
        function handleToggle(tmNode) {
            doCheck(tmNode);
        }
        // We don't care what type the tmNode is, we only care about its key
        function doCheck(tmNode) {
            if (props.multiple) {
                const { value: mergedValue } = mergedValueRef;
                if (Array.isArray(mergedValue)) {
                    if (!mergedValue.includes(tmNode.key)) {
                        cascaderDoCheck(tmNode.key);
                    }
                    else {
                        cascaderDoUncheck(tmNode.key);
                    }
                }
                else if (mergedValue === null) {
                    cascaderDoCheck(tmNode.key);
                }
                clearPattern();
            }
            else {
                cascaderDoCheck(tmNode.key);
                // currently the select menu is set to focusable
                // however just leave it here
                closeMenu(true);
            }
        }
        function prev() {
            var _a;
            (_a = menuInstRef.value) === null || _a === void 0 ? void 0 : _a.prev();
        }
        function next() {
            var _a;
            (_a = menuInstRef.value) === null || _a === void 0 ? void 0 : _a.next();
        }
        function enter() {
            var _a;
            if (menuInstRef) {
                const pendingOptionTmNode = (_a = menuInstRef.value) === null || _a === void 0 ? void 0 : _a.getPendingTmNode();
                if (pendingOptionTmNode) {
                    doCheck(pendingOptionTmNode);
                }
                return true;
            }
            return false;
        }
        function handleClickOutside(e) {
            handleSelectMenuClickOutside(e);
        }
        const exposedRef = {
            prev,
            next,
            enter
        };
        return Object.assign({ isMounted: isMountedRef, mergedTheme: mergedThemeRef, mergedClsPrefix: mergedClsPrefixRef, menuInstRef, selectTreeMate: selectTreeMateRef, handleResize,
            handleToggle,
            handleClickOutside,
            cascaderSlots, scrollbarProps: scrollbarPropsRef }, exposedRef);
    },
    render() {
        const { mergedClsPrefix, isMounted, mergedTheme, cascaderSlots } = this;
        return ((0, vue_1.h)(vue_1.Transition, { name: "fade-in-scale-up-transition", appear: isMounted }, {
            default: () => this.show
                ? (0, vue_1.withDirectives)((0, vue_1.h)(_internal_1.NInternalSelectMenu, { ref: "menuInstRef", onResize: this.handleResize, clsPrefix: mergedClsPrefix, class: `${mergedClsPrefix}-cascader-menu`, autoPending: true, themeOverrides: mergedTheme.peerOverrides.InternalSelectMenu, theme: mergedTheme.peers.InternalSelectMenu, treeMate: this.selectTreeMate, multiple: this.multiple, value: this.value, onToggle: this.handleToggle, scrollbarProps: this.scrollbarProps }, {
                    empty: () => (0, _utils_1.resolveSlot)(cascaderSlots['not-found'], () => [])
                }), [
                    [
                        vdirs_1.clickoutside,
                        this.handleClickOutside,
                        undefined,
                        { capture: true }
                    ]
                ])
                : null
        }));
    }
});
