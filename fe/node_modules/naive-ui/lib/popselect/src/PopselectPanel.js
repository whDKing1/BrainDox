"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.panelPropKeys = exports.panelProps = void 0;
const seemly_1 = require("seemly");
const treemate_1 = require("treemate");
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const utils_1 = require("../../select/src/utils");
const styles_1 = require("../styles");
const interface_1 = require("./interface");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.panelProps = {
    multiple: Boolean,
    value: {
        type: [String, Number, Array],
        default: null
    },
    cancelable: Boolean,
    options: {
        type: Array,
        default: () => []
    },
    size: String,
    scrollable: Boolean,
    'onUpdate:value': [Function, Array],
    onUpdateValue: [Function, Array],
    onMouseenter: Function,
    onMouseleave: Function,
    renderLabel: Function,
    showCheckmark: {
        type: Boolean,
        default: undefined
    },
    nodeProps: Function,
    virtualScroll: Boolean,
    // deprecated
    onChange: [Function, Array]
};
exports.panelPropKeys = (0, _utils_1.keysOf)(exports.panelProps);
exports.default = (0, vue_1.defineComponent)({
    name: 'PopselectPanel',
    props: exports.panelProps,
    setup(props) {
        if (process.env.NODE_ENV !== 'production') {
            (0, vue_1.watchEffect)(() => {
                if (props.onChange !== undefined) {
                    (0, _utils_1.warn)('popselect', '`on-change` is deprecated, please use `on-update:value` instead.');
                }
            });
        }
        const NPopselect = (0, vue_1.inject)(interface_1.popselectInjectionKey);
        const { mergedClsPrefixRef, inlineThemeDisabled, mergedComponentPropsRef } = (0, _mixins_1.useConfig)(props);
        const mergedSizeRef = (0, vue_1.computed)(() => {
            var _a, _b;
            return (props.size
                || ((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Popselect) === null || _b === void 0 ? void 0 : _b.size)
                || 'medium');
        });
        const themeRef = (0, _mixins_1.useTheme)('Popselect', '-pop-select', index_cssr_1.default, styles_1.popselectLight, NPopselect.props, mergedClsPrefixRef);
        const treeMateRef = (0, vue_1.computed)(() => {
            return (0, treemate_1.createTreeMate)(props.options, (0, utils_1.createTmOptions)('value', 'children'));
        });
        function doUpdateValue(value, option) {
            const { onUpdateValue, 'onUpdate:value': _onUpdateValue, onChange } = props;
            if (onUpdateValue)
                (0, _utils_1.call)(onUpdateValue, value, option);
            if (_onUpdateValue) {
                (0, _utils_1.call)(_onUpdateValue, value, option);
            }
            if (onChange)
                (0, _utils_1.call)(onChange, value, option);
        }
        function handleToggle(tmNode) {
            toggle(tmNode.key);
        }
        function handleMenuMousedown(e) {
            if (!(0, seemly_1.happensIn)(e, 'action')
                && !(0, seemly_1.happensIn)(e, 'empty')
                && !(0, seemly_1.happensIn)(e, 'header')) {
                e.preventDefault();
            }
        }
        function toggle(value) {
            const { value: { getNode } } = treeMateRef;
            if (props.multiple) {
                if (Array.isArray(props.value)) {
                    const newValue = [];
                    const newOptions = [];
                    let shouldAddValue = true;
                    props.value.forEach((v) => {
                        if (v === value) {
                            shouldAddValue = false;
                            return;
                        }
                        const tmNode = getNode(v);
                        if (tmNode) {
                            newValue.push(tmNode.key);
                            newOptions.push(tmNode.rawNode);
                        }
                    });
                    if (shouldAddValue) {
                        newValue.push(value);
                        newOptions.push(getNode(value).rawNode);
                    }
                    doUpdateValue(newValue, newOptions);
                }
                else {
                    const tmNode = getNode(value);
                    if (tmNode) {
                        doUpdateValue([value], [tmNode.rawNode]);
                    }
                }
            }
            else {
                if (props.value === value && props.cancelable) {
                    doUpdateValue(null, null);
                }
                else {
                    const tmNode = getNode(value);
                    if (tmNode) {
                        doUpdateValue(value, tmNode.rawNode);
                    }
                    const { 'onUpdate:show': _onUpdateShow, onUpdateShow } = NPopselect.props;
                    if (_onUpdateShow)
                        (0, _utils_1.call)(_onUpdateShow, false);
                    if (onUpdateShow)
                        (0, _utils_1.call)(onUpdateShow, false);
                    NPopselect.setShow(false);
                }
            }
            void (0, vue_1.nextTick)(() => {
                NPopselect.syncPosition();
            });
        }
        (0, vue_1.watch)((0, vue_1.toRef)(props, 'options'), () => {
            void (0, vue_1.nextTick)(() => {
                NPopselect.syncPosition();
            });
        });
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { self: { menuBoxShadow } } = themeRef.value;
            return {
                '--n-menu-box-shadow': menuBoxShadow
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('select', undefined, cssVarsRef, NPopselect.props)
            : undefined;
        return {
            mergedTheme: NPopselect.mergedThemeRef,
            mergedClsPrefix: mergedClsPrefixRef,
            treeMate: treeMateRef,
            handleToggle,
            handleMenuMousedown,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender,
            mergedSize: mergedSizeRef,
            scrollbarProps: NPopselect.props.scrollbarProps
        };
    },
    render() {
        var _a;
        (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
        return ((0, vue_1.h)(_internal_1.NInternalSelectMenu, { clsPrefix: this.mergedClsPrefix, focusable: true, nodeProps: this.nodeProps, class: [`${this.mergedClsPrefix}-popselect-menu`, this.themeClass], style: this.cssVars, theme: this.mergedTheme.peers.InternalSelectMenu, themeOverrides: this.mergedTheme.peerOverrides.InternalSelectMenu, multiple: this.multiple, treeMate: this.treeMate, size: this.mergedSize, value: this.value, virtualScroll: this.virtualScroll, scrollable: this.scrollable, scrollbarProps: this.scrollbarProps, renderLabel: this.renderLabel, onToggle: this.handleToggle, onMouseenter: this.onMouseenter, onMouseleave: this.onMouseenter, onMousedown: this.handleMenuMousedown, showCheckmark: this.showCheckmark }, {
            header: () => { var _a, _b; return ((_b = (_a = this.$slots).header) === null || _b === void 0 ? void 0 : _b.call(_a)) || []; },
            action: () => { var _a, _b; return ((_b = (_a = this.$slots).action) === null || _b === void 0 ? void 0 : _b.call(_a)) || []; },
            empty: () => { var _a, _b; return ((_b = (_a = this.$slots).empty) === null || _b === void 0 ? void 0 : _b.call(_a)) || []; }
        }));
    }
});
