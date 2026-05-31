"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.floatButtonProps = void 0;
const evtd_1 = require("evtd");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const icons_1 = require("../../_internal/icons");
const _mixins_1 = require("../../_mixins");
const use_config_1 = __importDefault(require("../../_mixins/use-config"));
const _utils_1 = require("../../_utils");
const FloatButtonGroup_1 = require("../../float-button-group/src/FloatButtonGroup");
const styles_1 = require("../styles");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.floatButtonProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { width: { type: [Number, String], default: 40 }, height: { type: [Number, String], default: 40 }, left: [Number, String], right: [Number, String], top: [Number, String], bottom: [Number, String], shape: {
        type: String,
        default: 'circle'
    }, position: {
        type: String,
        default: 'fixed'
    }, type: {
        type: String,
        default: 'default'
    }, menuTrigger: String, showMenu: {
        type: Boolean,
        default: undefined
    }, onUpdateShowMenu: {
        type: [Function, Array],
        default: undefined
    }, 'onUpdate:showMenu': {
        type: [Function, Array],
        default: undefined
    } });
exports.default = (0, vue_1.defineComponent)({
    name: 'FloatButton',
    props: exports.floatButtonProps,
    slots: Object,
    setup(props) {
        const { mergedClsPrefixRef, inlineThemeDisabled } = (0, use_config_1.default)(props);
        const selfElRef = (0, vue_1.ref)(null);
        const themeRef = (0, _mixins_1.useTheme)('FloatButton', '-float-button', index_cssr_1.default, styles_1.floatButtonLight, props, mergedClsPrefixRef);
        const floatButtonGroupInjection = (0, vue_1.inject)(FloatButtonGroup_1.floatButtonGroupInjectionKey, null);
        const uncontrolledShowMenuRef = (0, vue_1.ref)(false);
        const controlledShoeMenuRef = (0, vue_1.toRef)(props, 'showMenu');
        const mergedShowMenuRef = (0, vooks_1.useMergedState)(controlledShoeMenuRef, uncontrolledShowMenuRef);
        function doUpdateShowMenu(value) {
            const { onUpdateShowMenu, 'onUpdate:showMenu': _onUpdateShowMenu } = props;
            uncontrolledShowMenuRef.value = value;
            if (onUpdateShowMenu) {
                (0, _utils_1.call)(onUpdateShowMenu, value);
            }
            if (_onUpdateShowMenu) {
                (0, _utils_1.call)(_onUpdateShowMenu, value);
            }
        }
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { self: { color, textColor, boxShadow, boxShadowHover, boxShadowPressed, colorHover, colorPrimary, colorPrimaryHover, textColorPrimary, borderRadiusSquare, colorPressed, colorPrimaryPressed }, common: { cubicBezierEaseInOut } } = themeRef.value;
            const { type } = props;
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-box-shadow': boxShadow,
                '--n-box-shadow-hover': boxShadowHover,
                '--n-box-shadow-pressed': boxShadowPressed,
                '--n-color': type === 'primary' ? colorPrimary : color,
                '--n-text-color': type === 'primary' ? textColorPrimary : textColor,
                '--n-color-hover': type === 'primary' ? colorPrimaryHover : colorHover,
                '--n-color-pressed': type === 'primary' ? colorPrimaryPressed : colorPressed,
                '--n-border-radius-square': borderRadiusSquare
            };
        });
        const inlineStyle = (0, vue_1.computed)(() => {
            const { width, height } = props;
            return Object.assign({ position: floatButtonGroupInjection ? undefined : props.position, width: (0, _utils_1.formatLength)(width), minHeight: (0, _utils_1.formatLength)(height) }, (floatButtonGroupInjection
                ? null
                : {
                    left: (0, _utils_1.formatLength)(props.left),
                    right: (0, _utils_1.formatLength)(props.right),
                    top: (0, _utils_1.formatLength)(props.top),
                    bottom: (0, _utils_1.formatLength)(props.bottom)
                }));
        });
        const mergedShapeRef = (0, vue_1.computed)(() => {
            return floatButtonGroupInjection
                ? floatButtonGroupInjection.shapeRef.value
                : props.shape;
        });
        const Mouseenter = () => {
            if (props.menuTrigger === 'hover') {
                doUpdateShowMenu(true);
            }
        };
        const handleMouseleave = () => {
            if (props.menuTrigger === 'hover' && mergedShowMenuRef.value) {
                doUpdateShowMenu(false);
            }
        };
        const handleClick = () => {
            if (props.menuTrigger === 'click') {
                doUpdateShowMenu(!mergedShowMenuRef.value);
            }
        };
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('float-button', (0, vue_1.computed)(() => props.type[0]), cssVarsRef, props)
            : undefined;
        (0, vue_1.onMounted)(() => {
            const selfEl = selfElRef.value;
            if (selfEl) {
                (0, evtd_1.on)('mousemoveoutside', selfEl, handleMouseleave);
            }
        });
        (0, vue_1.onBeforeUnmount)(() => {
            const selfEl = selfElRef.value;
            if (selfEl) {
                (0, evtd_1.off)('mousemoveoutside', selfEl, handleMouseleave);
            }
        });
        return {
            inlineStyle,
            selfElRef,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            mergedClsPrefix: mergedClsPrefixRef,
            mergedShape: mergedShapeRef,
            mergedShowMenu: mergedShowMenuRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender,
            Mouseenter,
            handleMouseleave,
            handleClick
        };
    },
    render() {
        var _a;
        const { mergedClsPrefix, cssVars, mergedShape, type, menuTrigger, mergedShowMenu, themeClass, $slots, inlineStyle, onRender } = this;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        return ((0, vue_1.h)("div", { ref: "selfElRef", class: [
                `${mergedClsPrefix}-float-button`,
                `${mergedClsPrefix}-float-button--${mergedShape}-shape`,
                `${mergedClsPrefix}-float-button--${type}-type`,
                mergedShowMenu && `${mergedClsPrefix}-float-button--show-menu`,
                themeClass
            ], style: [cssVars, inlineStyle], onMouseenter: this.Mouseenter, onMouseleave: this.handleMouseleave, onClick: this.handleClick, role: "button" },
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-float-button__fill`, "aria-hidden": true }),
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-float-button__body` }, (_a = $slots.default) === null || _a === void 0 ? void 0 :
                _a.call($slots),
                (0, _utils_1.resolveWrappedSlot)($slots.description, (children) => {
                    if (children) {
                        return ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-float-button__description` }, children));
                    }
                    return null;
                })),
            menuTrigger ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-float-button__close` },
                (0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: mergedClsPrefix }, { default: () => (0, vue_1.h)(icons_1.CloseIcon, null) }))) : null,
            menuTrigger ? ((0, vue_1.h)("div", { onClick: (e) => {
                    e.stopPropagation();
                }, "data-float-button-menu": true, class: `${mergedClsPrefix}-float-button__menu` }, (0, _utils_1.resolveSlot)($slots.menu, () => []))) : null));
    }
});
