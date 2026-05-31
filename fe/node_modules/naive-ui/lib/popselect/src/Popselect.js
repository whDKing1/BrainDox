"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.popselectProps = void 0;
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const popover_1 = require("../../popover");
const Popover_1 = require("../../popover/src/Popover");
const styles_1 = require("../styles");
const interface_1 = require("./interface");
const PopselectPanel_1 = __importStar(require("./PopselectPanel"));
exports.popselectProps = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, _mixins_1.useTheme.props), (0, _utils_1.omit)(Popover_1.popoverBaseProps, ['showArrow', 'arrow'])), { placement: Object.assign(Object.assign({}, Popover_1.popoverBaseProps.placement), { default: 'bottom' }), trigger: {
        type: String,
        default: 'hover'
    } }), PopselectPanel_1.panelProps), { scrollbarProps: Object });
exports.default = (0, vue_1.defineComponent)({
    name: 'Popselect',
    props: exports.popselectProps,
    slots: Object,
    inheritAttrs: false,
    __popover__: true,
    setup(props) {
        const { mergedClsPrefixRef } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Popselect', '-popselect', undefined, styles_1.popselectLight, props, mergedClsPrefixRef);
        const popoverInstRef = (0, vue_1.ref)(null);
        function syncPosition() {
            var _a;
            (_a = popoverInstRef.value) === null || _a === void 0 ? void 0 : _a.syncPosition();
        }
        function setShow(value) {
            var _a;
            (_a = popoverInstRef.value) === null || _a === void 0 ? void 0 : _a.setShow(value);
        }
        (0, vue_1.provide)(interface_1.popselectInjectionKey, {
            props,
            mergedThemeRef: themeRef,
            syncPosition,
            setShow
        });
        const exposedMethods = {
            syncPosition,
            setShow
        };
        return Object.assign(Object.assign({}, exposedMethods), { popoverInstRef, mergedTheme: themeRef });
    },
    render() {
        const { mergedTheme } = this;
        const popoverProps = {
            theme: mergedTheme.peers.Popover,
            themeOverrides: mergedTheme.peerOverrides.Popover,
            builtinThemeOverrides: {
                padding: '0'
            },
            ref: 'popoverInstRef',
            internalRenderBody: (className, ref, style, onMouseenter, onMouseleave) => {
                const { $attrs } = this;
                return ((0, vue_1.h)(PopselectPanel_1.default, Object.assign({}, $attrs, { class: [$attrs.class, className], style: [$attrs.style, ...style] }, (0, _utils_1.keep)(this.$props, PopselectPanel_1.panelPropKeys), { ref: (0, _utils_1.createRefSetter)(ref), onMouseenter: (0, _utils_1.mergeEventHandlers)([
                        onMouseenter,
                        $attrs.onMouseenter
                    ]), onMouseleave: (0, _utils_1.mergeEventHandlers)([
                        onMouseleave,
                        $attrs.onMouseleave
                    ]) }), {
                    header: () => { var _a, _b; return (_b = (_a = this.$slots).header) === null || _b === void 0 ? void 0 : _b.call(_a); },
                    action: () => { var _a, _b; return (_b = (_a = this.$slots).action) === null || _b === void 0 ? void 0 : _b.call(_a); },
                    empty: () => { var _a, _b; return (_b = (_a = this.$slots).empty) === null || _b === void 0 ? void 0 : _b.call(_a); }
                }));
            }
        };
        return ((0, vue_1.h)(popover_1.NPopover, Object.assign({}, (0, _utils_1.omit)(this.$props, PopselectPanel_1.panelPropKeys), popoverProps, { internalDeactivateImmediately: true }), {
            trigger: () => { var _a, _b; return (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a); }
        }));
    }
});
