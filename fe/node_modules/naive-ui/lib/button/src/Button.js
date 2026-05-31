"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XButton = exports.buttonProps = void 0;
const seemly_1 = require("seemly");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const _mixins_1 = require("../../_mixins");
const use_rtl_1 = require("../../_mixins/use-rtl");
const _utils_1 = require("../../_utils");
const index_1 = require("../../_utils/color/index");
const browser_1 = require("../../_utils/env/browser");
const context_1 = require("../../button-group/src/context");
const styles_1 = require("../styles");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.buttonProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { color: String, textColor: String, text: Boolean, block: Boolean, loading: Boolean, disabled: Boolean, circle: Boolean, size: String, ghost: Boolean, round: Boolean, secondary: Boolean, tertiary: Boolean, quaternary: Boolean, strong: Boolean, focusable: {
        type: Boolean,
        default: true
    }, keyboard: {
        type: Boolean,
        default: true
    }, tag: {
        type: String,
        default: 'button'
    }, type: {
        type: String,
        default: 'default'
    }, dashed: Boolean, renderIcon: Function, iconPlacement: {
        type: String,
        default: 'left'
    }, attrType: {
        type: String,
        default: 'button'
    }, bordered: {
        type: Boolean,
        default: true
    }, onClick: [Function, Array], nativeFocusBehavior: {
        type: Boolean,
        default: !browser_1.isSafari
    }, spinProps: Object });
const Button = (0, vue_1.defineComponent)({
    name: 'Button',
    props: exports.buttonProps,
    slots: Object,
    setup(props) {
        if (process.env.NODE_ENV !== 'production') {
            (0, vue_1.watchEffect)(() => {
                const { dashed, ghost, text, secondary, tertiary, quaternary } = props;
                if ((dashed || ghost || text)
                    && (secondary || tertiary || quaternary)) {
                    (0, _utils_1.warnOnce)('button', '`dashed`, `ghost` and `text` props can\'t be used along with `secondary`, `tertiary` and `quaternary` props.');
                }
            });
        }
        const selfElRef = (0, vue_1.ref)(null);
        const waveElRef = (0, vue_1.ref)(null);
        const enterPressedRef = (0, vue_1.ref)(false);
        const showBorderRef = (0, vooks_1.useMemo)(() => {
            return (!props.quaternary
                && !props.tertiary
                && !props.secondary
                && !props.text
                && (!props.color || props.ghost || props.dashed)
                && props.bordered);
        });
        const NButtonGroup = (0, vue_1.inject)(context_1.buttonGroupInjectionKey, {});
        const { inlineThemeDisabled, mergedClsPrefixRef, mergedRtlRef, mergedComponentPropsRef } = (0, _mixins_1.useConfig)(props);
        const { mergedSizeRef } = (0, _mixins_1.useFormItem)({}, {
            defaultSize: 'medium',
            mergedSize: (NFormItem) => {
                var _a, _b;
                const { size } = props;
                if (size)
                    return size;
                const { size: buttonGroupSize } = NButtonGroup;
                if (buttonGroupSize)
                    return buttonGroupSize;
                const { mergedSize: formItemSize } = NFormItem || {};
                if (formItemSize)
                    return formItemSize.value;
                const configSize = (_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Button) === null || _b === void 0 ? void 0 : _b.size;
                if (configSize)
                    return configSize;
                return 'medium';
            }
        });
        const mergedFocusableRef = (0, vue_1.computed)(() => {
            return props.focusable && !props.disabled;
        });
        const handleMousedown = (e) => {
            var _a;
            if (!mergedFocusableRef.value) {
                e.preventDefault();
            }
            if (props.nativeFocusBehavior) {
                return;
            }
            e.preventDefault();
            // normally this won't be called if disabled (when tag is button)
            // if not, we try to make it behave like a button
            if (props.disabled) {
                return;
            }
            if (mergedFocusableRef.value) {
                (_a = selfElRef.value) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true });
            }
        };
        const handleClick = (e) => {
            var _a;
            if (!props.disabled && !props.loading) {
                const { onClick } = props;
                if (onClick)
                    (0, _utils_1.call)(onClick, e);
                if (!props.text) {
                    (_a = waveElRef.value) === null || _a === void 0 ? void 0 : _a.play();
                }
            }
        };
        const handleKeyup = (e) => {
            switch (e.key) {
                case 'Enter':
                    if (!props.keyboard) {
                        return;
                    }
                    enterPressedRef.value = false;
            }
        };
        const handleKeydown = (e) => {
            switch (e.key) {
                case 'Enter':
                    if (!props.keyboard || props.loading) {
                        e.preventDefault();
                        return;
                    }
                    enterPressedRef.value = true;
            }
        };
        const handleBlur = () => {
            enterPressedRef.value = false;
        };
        const themeRef = (0, _mixins_1.useTheme)('Button', '-button', index_cssr_1.default, styles_1.buttonLight, props, mergedClsPrefixRef);
        const rtlEnabledRef = (0, use_rtl_1.useRtl)('Button', mergedRtlRef, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const theme = themeRef.value;
            const { common: { cubicBezierEaseInOut, cubicBezierEaseOut }, self } = theme;
            const { rippleDuration, opacityDisabled, fontWeight, fontWeightStrong } = self;
            const size = mergedSizeRef.value;
            const { dashed, type, ghost, text, color, round, circle, textColor, secondary, tertiary, quaternary, strong } = props;
            // font
            const fontProps = {
                '--n-font-weight': strong ? fontWeightStrong : fontWeight
            };
            // color
            let colorProps = {
                '--n-color': 'initial',
                '--n-color-hover': 'initial',
                '--n-color-pressed': 'initial',
                '--n-color-focus': 'initial',
                '--n-color-disabled': 'initial',
                '--n-ripple-color': 'initial',
                '--n-text-color': 'initial',
                '--n-text-color-hover': 'initial',
                '--n-text-color-pressed': 'initial',
                '--n-text-color-focus': 'initial',
                '--n-text-color-disabled': 'initial'
            };
            const typeIsTertiary = type === 'tertiary';
            const typeIsDefault = type === 'default';
            const mergedType = typeIsTertiary ? 'default' : type;
            if (text) {
                const propTextColor = textColor || color;
                const mergedTextColor = propTextColor || self[(0, _utils_1.createKey)('textColorText', mergedType)];
                colorProps = {
                    '--n-color': '#0000',
                    '--n-color-hover': '#0000',
                    '--n-color-pressed': '#0000',
                    '--n-color-focus': '#0000',
                    '--n-color-disabled': '#0000',
                    '--n-ripple-color': '#0000',
                    '--n-text-color': mergedTextColor,
                    '--n-text-color-hover': propTextColor
                        ? (0, index_1.createHoverColor)(propTextColor)
                        : self[(0, _utils_1.createKey)('textColorTextHover', mergedType)],
                    '--n-text-color-pressed': propTextColor
                        ? (0, index_1.createPressedColor)(propTextColor)
                        : self[(0, _utils_1.createKey)('textColorTextPressed', mergedType)],
                    '--n-text-color-focus': propTextColor
                        ? (0, index_1.createHoverColor)(propTextColor)
                        : self[(0, _utils_1.createKey)('textColorTextHover', mergedType)],
                    '--n-text-color-disabled': propTextColor
                        || self[(0, _utils_1.createKey)('textColorTextDisabled', mergedType)]
                };
            }
            else if (ghost || dashed) {
                const mergedTextColor = textColor || color;
                colorProps = {
                    '--n-color': '#0000',
                    '--n-color-hover': '#0000',
                    '--n-color-pressed': '#0000',
                    '--n-color-focus': '#0000',
                    '--n-color-disabled': '#0000',
                    '--n-ripple-color': color || self[(0, _utils_1.createKey)('rippleColor', mergedType)],
                    '--n-text-color': mergedTextColor || self[(0, _utils_1.createKey)('textColorGhost', mergedType)],
                    '--n-text-color-hover': mergedTextColor
                        ? (0, index_1.createHoverColor)(mergedTextColor)
                        : self[(0, _utils_1.createKey)('textColorGhostHover', mergedType)],
                    '--n-text-color-pressed': mergedTextColor
                        ? (0, index_1.createPressedColor)(mergedTextColor)
                        : self[(0, _utils_1.createKey)('textColorGhostPressed', mergedType)],
                    '--n-text-color-focus': mergedTextColor
                        ? (0, index_1.createHoverColor)(mergedTextColor)
                        : self[(0, _utils_1.createKey)('textColorGhostHover', mergedType)],
                    '--n-text-color-disabled': mergedTextColor
                        || self[(0, _utils_1.createKey)('textColorGhostDisabled', mergedType)]
                };
            }
            else if (secondary) {
                const typeTextColor = typeIsDefault
                    ? self.textColor
                    : typeIsTertiary
                        ? self.textColorTertiary
                        : self[(0, _utils_1.createKey)('color', mergedType)];
                const mergedTextColor = color || typeTextColor;
                const isColoredType = type !== 'default' && type !== 'tertiary';
                colorProps = {
                    '--n-color': isColoredType
                        ? (0, seemly_1.changeColor)(mergedTextColor, {
                            alpha: Number(self.colorOpacitySecondary)
                        })
                        : self.colorSecondary,
                    '--n-color-hover': isColoredType
                        ? (0, seemly_1.changeColor)(mergedTextColor, {
                            alpha: Number(self.colorOpacitySecondaryHover)
                        })
                        : self.colorSecondaryHover,
                    '--n-color-pressed': isColoredType
                        ? (0, seemly_1.changeColor)(mergedTextColor, {
                            alpha: Number(self.colorOpacitySecondaryPressed)
                        })
                        : self.colorSecondaryPressed,
                    '--n-color-focus': isColoredType
                        ? (0, seemly_1.changeColor)(mergedTextColor, {
                            alpha: Number(self.colorOpacitySecondaryHover)
                        })
                        : self.colorSecondaryHover,
                    '--n-color-disabled': self.colorSecondary,
                    '--n-ripple-color': '#0000',
                    '--n-text-color': mergedTextColor,
                    '--n-text-color-hover': mergedTextColor,
                    '--n-text-color-pressed': mergedTextColor,
                    '--n-text-color-focus': mergedTextColor,
                    '--n-text-color-disabled': mergedTextColor
                };
            }
            else if (tertiary || quaternary) {
                const typeColor = typeIsDefault
                    ? self.textColor
                    : typeIsTertiary
                        ? self.textColorTertiary
                        : self[(0, _utils_1.createKey)('color', mergedType)];
                const mergedColor = color || typeColor;
                if (tertiary) {
                    colorProps['--n-color'] = self.colorTertiary;
                    colorProps['--n-color-hover'] = self.colorTertiaryHover;
                    colorProps['--n-color-pressed'] = self.colorTertiaryPressed;
                    colorProps['--n-color-focus'] = self.colorSecondaryHover;
                    colorProps['--n-color-disabled'] = self.colorTertiary;
                }
                else {
                    colorProps['--n-color'] = self.colorQuaternary;
                    colorProps['--n-color-hover'] = self.colorQuaternaryHover;
                    colorProps['--n-color-pressed'] = self.colorQuaternaryPressed;
                    colorProps['--n-color-focus'] = self.colorQuaternaryHover;
                    colorProps['--n-color-disabled'] = self.colorQuaternary;
                }
                colorProps['--n-ripple-color'] = '#0000';
                colorProps['--n-text-color'] = mergedColor;
                colorProps['--n-text-color-hover'] = mergedColor;
                colorProps['--n-text-color-pressed'] = mergedColor;
                colorProps['--n-text-color-focus'] = mergedColor;
                colorProps['--n-text-color-disabled'] = mergedColor;
            }
            else {
                colorProps = {
                    '--n-color': color || self[(0, _utils_1.createKey)('color', mergedType)],
                    '--n-color-hover': color
                        ? (0, index_1.createHoverColor)(color)
                        : self[(0, _utils_1.createKey)('colorHover', mergedType)],
                    '--n-color-pressed': color
                        ? (0, index_1.createPressedColor)(color)
                        : self[(0, _utils_1.createKey)('colorPressed', mergedType)],
                    '--n-color-focus': color
                        ? (0, index_1.createHoverColor)(color)
                        : self[(0, _utils_1.createKey)('colorFocus', mergedType)],
                    '--n-color-disabled': color || self[(0, _utils_1.createKey)('colorDisabled', mergedType)],
                    '--n-ripple-color': color || self[(0, _utils_1.createKey)('rippleColor', mergedType)],
                    '--n-text-color': textColor
                        || (color
                            ? self.textColorPrimary
                            : typeIsTertiary
                                ? self.textColorTertiary
                                : self[(0, _utils_1.createKey)('textColor', mergedType)]),
                    '--n-text-color-hover': textColor
                        || (color
                            ? self.textColorHoverPrimary
                            : self[(0, _utils_1.createKey)('textColorHover', mergedType)]),
                    '--n-text-color-pressed': textColor
                        || (color
                            ? self.textColorPressedPrimary
                            : self[(0, _utils_1.createKey)('textColorPressed', mergedType)]),
                    '--n-text-color-focus': textColor
                        || (color
                            ? self.textColorFocusPrimary
                            : self[(0, _utils_1.createKey)('textColorFocus', mergedType)]),
                    '--n-text-color-disabled': textColor
                        || (color
                            ? self.textColorDisabledPrimary
                            : self[(0, _utils_1.createKey)('textColorDisabled', mergedType)])
                };
            }
            // border
            let borderProps = {
                '--n-border': 'initial',
                '--n-border-hover': 'initial',
                '--n-border-pressed': 'initial',
                '--n-border-focus': 'initial',
                '--n-border-disabled': 'initial'
            };
            if (text) {
                borderProps = {
                    '--n-border': 'none',
                    '--n-border-hover': 'none',
                    '--n-border-pressed': 'none',
                    '--n-border-focus': 'none',
                    '--n-border-disabled': 'none'
                };
            }
            else {
                borderProps = {
                    '--n-border': self[(0, _utils_1.createKey)('border', mergedType)],
                    '--n-border-hover': self[(0, _utils_1.createKey)('borderHover', mergedType)],
                    '--n-border-pressed': self[(0, _utils_1.createKey)('borderPressed', mergedType)],
                    '--n-border-focus': self[(0, _utils_1.createKey)('borderFocus', mergedType)],
                    '--n-border-disabled': self[(0, _utils_1.createKey)('borderDisabled', mergedType)]
                };
            }
            // size
            const { [(0, _utils_1.createKey)('height', size)]: height, [(0, _utils_1.createKey)('fontSize', size)]: fontSize, [(0, _utils_1.createKey)('padding', size)]: padding, [(0, _utils_1.createKey)('paddingRound', size)]: paddingRound, [(0, _utils_1.createKey)('iconSize', size)]: iconSize, [(0, _utils_1.createKey)('borderRadius', size)]: borderRadius, [(0, _utils_1.createKey)('iconMargin', size)]: iconMargin, waveOpacity } = self;
            const sizeProps = {
                '--n-width': circle && !text ? height : 'initial',
                '--n-height': text ? 'initial' : height,
                '--n-font-size': fontSize,
                '--n-padding': circle
                    ? 'initial'
                    : text
                        ? 'initial'
                        : round
                            ? paddingRound
                            : padding,
                '--n-icon-size': iconSize,
                '--n-icon-margin': iconMargin,
                '--n-border-radius': text
                    ? 'initial'
                    : circle || round
                        ? height
                        : borderRadius
            };
            return Object.assign(Object.assign(Object.assign(Object.assign({ '--n-bezier': cubicBezierEaseInOut, '--n-bezier-ease-out': cubicBezierEaseOut, '--n-ripple-duration': rippleDuration, '--n-opacity-disabled': opacityDisabled, '--n-wave-opacity': waveOpacity }, fontProps), colorProps), borderProps), sizeProps);
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('button', (0, vue_1.computed)(() => {
                let hash = '';
                const { dashed, type, ghost, text, color, round, circle, textColor, secondary, tertiary, quaternary, strong } = props;
                if (dashed)
                    hash += 'a';
                if (ghost)
                    hash += 'b';
                if (text)
                    hash += 'c';
                if (round)
                    hash += 'd';
                if (circle)
                    hash += 'e';
                if (secondary)
                    hash += 'f';
                if (tertiary)
                    hash += 'g';
                if (quaternary)
                    hash += 'h';
                if (strong)
                    hash += 'i';
                if (color)
                    hash += `j${(0, _utils_1.color2Class)(color)}`;
                if (textColor)
                    hash += `k${(0, _utils_1.color2Class)(textColor)}`;
                const { value: size } = mergedSizeRef;
                hash += `l${size[0]}`;
                hash += `m${type[0]}`;
                return hash;
            }), cssVarsRef, props)
            : undefined;
        return {
            selfElRef,
            waveElRef,
            mergedClsPrefix: mergedClsPrefixRef,
            mergedFocusable: mergedFocusableRef,
            mergedSize: mergedSizeRef,
            showBorder: showBorderRef,
            enterPressed: enterPressedRef,
            rtlEnabled: rtlEnabledRef,
            handleMousedown,
            handleKeydown,
            handleBlur,
            handleKeyup,
            handleClick,
            customColorCssVars: (0, vue_1.computed)(() => {
                const { color } = props;
                if (!color)
                    return null;
                const hoverColor = (0, index_1.createHoverColor)(color);
                return {
                    '--n-border-color': color,
                    '--n-border-color-hover': hoverColor,
                    '--n-border-color-pressed': (0, index_1.createPressedColor)(color),
                    '--n-border-color-focus': hoverColor,
                    '--n-border-color-disabled': color
                };
            }),
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
        };
    },
    render() {
        const { mergedClsPrefix, tag: Component, onRender } = this;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        const children = (0, _utils_1.resolveWrappedSlot)(this.$slots.default, children => children && ((0, vue_1.h)("span", { class: `${mergedClsPrefix}-button__content` }, children)));
        return ((0, vue_1.h)(Component, { ref: "selfElRef", class: [
                this.themeClass,
                `${mergedClsPrefix}-button`,
                `${mergedClsPrefix}-button--${this.type}-type`,
                `${mergedClsPrefix}-button--${this.mergedSize}-type`,
                this.rtlEnabled && `${mergedClsPrefix}-button--rtl`,
                this.disabled && `${mergedClsPrefix}-button--disabled`,
                this.block && `${mergedClsPrefix}-button--block`,
                this.enterPressed && `${mergedClsPrefix}-button--pressed`,
                !this.text && this.dashed && `${mergedClsPrefix}-button--dashed`,
                this.color && `${mergedClsPrefix}-button--color`,
                this.secondary && `${mergedClsPrefix}-button--secondary`,
                this.loading && `${mergedClsPrefix}-button--loading`,
                this.ghost && `${mergedClsPrefix}-button--ghost` // required for button group border collapse
            ], tabindex: this.mergedFocusable ? 0 : -1, type: this.attrType, style: this.cssVars, disabled: this.disabled, onClick: this.handleClick, onBlur: this.handleBlur, onMousedown: this.handleMousedown, onKeyup: this.handleKeyup, onKeydown: this.handleKeydown },
            this.iconPlacement === 'right' && children,
            (0, vue_1.h)(_internal_1.NFadeInExpandTransition, { width: true }, {
                default: () => (0, _utils_1.resolveWrappedSlot)(this.$slots.icon, children => (this.loading || this.renderIcon || children) && ((0, vue_1.h)("span", { class: `${mergedClsPrefix}-button__icon`, style: {
                        margin: (0, _utils_1.isSlotEmpty)(this.$slots.default) ? '0' : ''
                    } },
                    (0, vue_1.h)(_internal_1.NIconSwitchTransition, null, {
                        default: () => this.loading ? ((0, vue_1.h)(_internal_1.NBaseLoading, Object.assign({ clsPrefix: mergedClsPrefix, key: "loading", class: `${mergedClsPrefix}-icon-slot`, strokeWidth: 20 }, this.spinProps))) : ((0, vue_1.h)("div", { key: "icon", class: `${mergedClsPrefix}-icon-slot`, role: "none" }, this.renderIcon ? this.renderIcon() : children))
                    }))))
            }),
            this.iconPlacement === 'left' && children,
            !this.text ? ((0, vue_1.h)(_internal_1.NBaseWave, { ref: "waveElRef", clsPrefix: mergedClsPrefix })) : null,
            this.showBorder ? ((0, vue_1.h)("div", { "aria-hidden": true, class: `${mergedClsPrefix}-button__border`, style: this.customColorCssVars })) : null,
            this.showBorder ? ((0, vue_1.h)("div", { "aria-hidden": true, class: `${mergedClsPrefix}-button__state-border`, style: this.customColorCssVars })) : null));
    }
});
exports.default = Button;
// XButton is for tsx type checking
// It's not compatible with render function `h`
// Currently we don't expose it as public
// If there's any issue about this, we may expose it
// Since most people use template, the type checking phase doesn't work as tsx
exports.XButton = Button;
// Also, we may make XButton a generic type which support `tag` prop
// but currently vue doesn't export IntrinsicElementAttributes from runtime-dom
// so we can't easily make an attr map by hand
// just leave it for later
