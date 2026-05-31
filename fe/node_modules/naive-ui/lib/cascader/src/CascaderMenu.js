"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vdirs_1 = require("vdirs");
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const focus_detector_1 = __importDefault(require("../../_internal/focus-detector"));
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const empty_1 = require("../../empty");
const CascaderSubmenu_1 = __importDefault(require("./CascaderSubmenu"));
const interface_1 = require("./interface");
exports.default = (0, vue_1.defineComponent)({
    name: 'NCascaderMenu',
    props: {
        value: [String, Number, Array],
        placement: {
            type: String,
            default: 'bottom-start'
        },
        show: Boolean,
        menuModel: {
            type: Array,
            required: true
        },
        loading: Boolean,
        onFocus: {
            type: Function,
            required: true
        },
        onBlur: {
            type: Function,
            required: true
        },
        onKeydown: {
            type: Function,
            required: true
        },
        onMousedown: {
            type: Function,
            required: true
        },
        onTabout: {
            type: Function,
            required: true
        }
    },
    setup(props) {
        const { localeRef, isMountedRef, mergedClsPrefixRef, syncCascaderMenuPosition, handleCascaderMenuClickOutside, mergedThemeRef, getColumnStyleRef } = (0, vue_1.inject)(interface_1.cascaderInjectionKey);
        const { mergedComponentPropsRef } = (0, _mixins_1.useConfig)();
        const submenuInstRefs = [];
        const maskInstRef = (0, vue_1.ref)(null);
        const selfElRef = (0, vue_1.ref)(null);
        function handleResize() {
            syncCascaderMenuPosition();
        }
        (0, _utils_1.useOnResize)(selfElRef, handleResize);
        function showErrorMessage(label) {
            var _a;
            const { value: { loadingRequiredMessage } } = localeRef;
            (_a = maskInstRef.value) === null || _a === void 0 ? void 0 : _a.showOnce(loadingRequiredMessage(label));
        }
        function handleClickOutside(e) {
            handleCascaderMenuClickOutside(e);
        }
        function handleFocusin(e) {
            const { value: selfEl } = selfElRef;
            if (!selfEl)
                return;
            if (!selfEl.contains(e.relatedTarget)) {
                props.onFocus(e);
            }
        }
        function handleFocusout(e) {
            const { value: selfEl } = selfElRef;
            if (!selfEl)
                return;
            if (!selfEl.contains(e.relatedTarget)) {
                props.onBlur(e);
            }
        }
        const exposedRef = {
            scroll(depth, index, elSize) {
                const submenuInst = submenuInstRefs[depth];
                if (submenuInst) {
                    submenuInst.scroll(index, elSize);
                }
            },
            showErrorMessage
        };
        return Object.assign({ isMounted: isMountedRef, mergedClsPrefix: mergedClsPrefixRef, selfElRef,
            submenuInstRefs,
            maskInstRef, mergedTheme: mergedThemeRef, mergedRenderEmpty: (0, vue_1.computed)(() => {
                var _a, _b;
                return (_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Cascader) === null || _b === void 0 ? void 0 : _b.renderEmpty;
            }), getColumnStyle: getColumnStyleRef, handleFocusin,
            handleFocusout,
            handleClickOutside }, exposedRef);
    },
    render() {
        const { submenuInstRefs, mergedClsPrefix, mergedTheme } = this;
        return ((0, vue_1.h)(vue_1.Transition, { name: "fade-in-scale-up-transition", appear: this.isMounted }, {
            default: () => {
                if (!this.show)
                    return null;
                return (0, vue_1.withDirectives)((0, vue_1.h)("div", { tabindex: "0", ref: "selfElRef", class: `${mergedClsPrefix}-cascader-menu`, onMousedown: this.onMousedown, onFocusin: this.handleFocusin, onFocusout: this.handleFocusout, onKeydown: this.onKeydown },
                    this.menuModel[0].length ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-cascader-submenu-wrapper` },
                        this.menuModel.map((submenuOptions, index) => {
                            var _a;
                            return ((0, vue_1.h)(CascaderSubmenu_1.default, { style: (_a = this.getColumnStyle) === null || _a === void 0 ? void 0 : _a.call(this, { level: index }), ref: ((instance) => {
                                    if (instance) {
                                        submenuInstRefs[index] = instance;
                                    }
                                }), key: index, tmNodes: submenuOptions, depth: index + 1 }));
                        }),
                        (0, vue_1.h)(_internal_1.NBaseMenuMask, { clsPrefix: mergedClsPrefix, ref: "maskInstRef" }))) : ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-cascader-menu__empty` }, (0, _utils_1.resolveSlot)(this.$slots.empty, () => {
                        var _a;
                        return [
                            ((_a = this.mergedRenderEmpty) === null || _a === void 0 ? void 0 : _a.call(this)) || ((0, vue_1.h)(empty_1.NEmpty, { theme: mergedTheme.peers.Empty, themeOverrides: mergedTheme.peerOverrides.Empty }))
                        ];
                    }))),
                    (0, _utils_1.resolveWrappedSlot)(this.$slots.action, children => children && ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-cascader-menu-action`, "data-action": true }, children))),
                    (0, vue_1.h)(focus_detector_1.default, { onFocus: this.onTabout })), [
                    [
                        vdirs_1.clickoutside,
                        this.handleClickOutside,
                        undefined,
                        { capture: true }
                    ]
                ]);
            }
        }));
    }
});
