"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tooltipProps = void 0;
// Tooltip: popover wearing waistcoat
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const popover_1 = require("../../popover");
const Popover_1 = require("../../popover/src/Popover");
const styles_1 = require("../styles");
exports.tooltipProps = Object.assign(Object.assign({}, Popover_1.popoverBaseProps), _mixins_1.useTheme.props);
exports.default = (0, vue_1.defineComponent)({
    name: 'Tooltip',
    props: exports.tooltipProps,
    slots: Object,
    __popover__: true,
    setup(props) {
        const { mergedClsPrefixRef } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Tooltip', '-tooltip', undefined, styles_1.tooltipLight, props, mergedClsPrefixRef);
        const popoverRef = (0, vue_1.ref)(null);
        const tooltipExposedMethod = {
            syncPosition() {
                popoverRef.value.syncPosition();
            },
            setShow(show) {
                popoverRef.value.setShow(show);
            }
        };
        return Object.assign(Object.assign({}, tooltipExposedMethod), { popoverRef, mergedTheme: themeRef, popoverThemeOverrides: (0, vue_1.computed)(() => {
                return themeRef.value.self;
            }) });
    },
    render() {
        const { mergedTheme, internalExtraClass } = this;
        return (0, vue_1.h)(popover_1.NPopover, Object.assign(Object.assign({}, this.$props), { theme: mergedTheme.peers.Popover, themeOverrides: mergedTheme.peerOverrides.Popover, builtinThemeOverrides: this.popoverThemeOverrides, internalExtraClass: internalExtraClass.concat('tooltip'), ref: 'popoverRef' }), this.$slots);
    }
});
