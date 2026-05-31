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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.popconfirmProps = void 0;
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const popover_1 = require("../../popover");
const Popover_1 = require("../../popover/src/Popover");
const styles_1 = require("../styles");
const interface_1 = require("./interface");
const PopconfirmPanel_1 = __importStar(require("./PopconfirmPanel"));
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.popconfirmProps = Object.assign(Object.assign(Object.assign({}, _mixins_1.useTheme.props), Popover_1.popoverBaseProps), { positiveText: String, negativeText: String, showIcon: {
        type: Boolean,
        default: true
    }, trigger: {
        type: String,
        default: 'click'
    }, positiveButtonProps: Object, negativeButtonProps: Object, onPositiveClick: Function, onNegativeClick: Function });
exports.default = (0, vue_1.defineComponent)({
    name: 'Popconfirm',
    props: exports.popconfirmProps,
    slots: Object,
    __popover__: true,
    setup(props) {
        const { mergedClsPrefixRef } = (0, _mixins_1.useConfig)();
        const themeRef = (0, _mixins_1.useTheme)('Popconfirm', '-popconfirm', index_cssr_1.default, styles_1.popconfirmLight, props, mergedClsPrefixRef);
        const popoverInstRef = (0, vue_1.ref)(null);
        function handlePositiveClick(e) {
            var _a;
            if (!((_a = popoverInstRef.value) === null || _a === void 0 ? void 0 : _a.getMergedShow()))
                return;
            const { onPositiveClick, 'onUpdate:show': onUpdateShow } = props;
            void Promise.resolve(onPositiveClick ? onPositiveClick(e) : true).then((value) => {
                var _a;
                if (value === false)
                    return;
                (_a = popoverInstRef.value) === null || _a === void 0 ? void 0 : _a.setShow(false);
                if (onUpdateShow)
                    (0, _utils_1.call)(onUpdateShow, false);
            });
        }
        function handleNegativeClick(e) {
            var _a;
            if (!((_a = popoverInstRef.value) === null || _a === void 0 ? void 0 : _a.getMergedShow()))
                return;
            const { onNegativeClick, 'onUpdate:show': onUpdateShow } = props;
            void Promise.resolve(onNegativeClick ? onNegativeClick(e) : true).then((value) => {
                var _a;
                if (value === false)
                    return;
                (_a = popoverInstRef.value) === null || _a === void 0 ? void 0 : _a.setShow(false);
                if (onUpdateShow)
                    (0, _utils_1.call)(onUpdateShow, false);
            });
        }
        (0, vue_1.provide)(interface_1.popconfirmInjectionKey, {
            mergedThemeRef: themeRef,
            mergedClsPrefixRef,
            props
        });
        const returned = {
            setShow(value) {
                var _a;
                (_a = popoverInstRef.value) === null || _a === void 0 ? void 0 : _a.setShow(value);
            },
            syncPosition() {
                var _a;
                (_a = popoverInstRef.value) === null || _a === void 0 ? void 0 : _a.syncPosition();
            },
            mergedTheme: themeRef,
            popoverInstRef,
            handlePositiveClick,
            handleNegativeClick
        };
        return returned;
    },
    render() {
        const { $slots: slots, $props: props, mergedTheme } = this;
        return ((0, vue_1.h)(popover_1.NPopover, Object.assign({}, (0, _utils_1.omit)(props, PopconfirmPanel_1.panelPropKeys), { theme: mergedTheme.peers.Popover, themeOverrides: mergedTheme.peerOverrides.Popover, internalExtraClass: ['popconfirm'], ref: "popoverInstRef" }), {
            trigger: slots.trigger,
            default: () => {
                const panelProps = (0, _utils_1.keep)(props, PopconfirmPanel_1.panelPropKeys);
                return ((0, vue_1.h)(PopconfirmPanel_1.default, Object.assign({}, panelProps, { onPositiveClick: this.handlePositiveClick, onNegativeClick: this.handleNegativeClick }), slots));
            }
        }));
    }
});
