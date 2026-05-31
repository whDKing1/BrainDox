"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vdirs_1 = require("vdirs");
const vue_1 = require("vue");
const vueuc_1 = require("vueuc");
const _internal_1 = require("../../_internal");
const _utils_1 = require("../../_utils");
const card_1 = require("../../card");
const Card_1 = require("../../card/src/Card");
const Dialog_1 = require("../../dialog/src/Dialog");
const dialogProps_1 = require("../../dialog/src/dialogProps");
const interface_1 = require("../../drawer/src/interface");
const interface_2 = require("../../popover/src/interface");
const composables_1 = require("./composables");
const interface_3 = require("./interface");
const presetProps_1 = require("./presetProps");
exports.default = (0, vue_1.defineComponent)({
    name: 'ModalBody',
    inheritAttrs: false,
    slots: Object,
    props: Object.assign(Object.assign({ show: {
            type: Boolean,
            required: true
        }, preset: String, displayDirective: {
            type: String,
            required: true
        }, trapFocus: {
            type: Boolean,
            default: true
        }, autoFocus: {
            type: Boolean,
            default: true
        }, blockScroll: Boolean, draggable: {
            type: [Boolean, Object],
            default: false
        }, maskHidden: Boolean }, presetProps_1.presetProps), { renderMask: Function, 
        // events
        onClickoutside: Function, onBeforeLeave: {
            type: Function,
            required: true
        }, onAfterLeave: {
            type: Function,
            required: true
        }, onPositiveClick: {
            type: Function,
            required: true
        }, onNegativeClick: {
            type: Function,
            required: true
        }, onClose: {
            type: Function,
            required: true
        }, onAfterEnter: Function, onEsc: Function }),
    setup(props) {
        const bodyRef = (0, vue_1.ref)(null);
        const scrollbarRef = (0, vue_1.ref)(null);
        const displayedRef = (0, vue_1.ref)(props.show);
        const transformOriginXRef = (0, vue_1.ref)(null);
        const transformOriginYRef = (0, vue_1.ref)(null);
        const NModal = (0, vue_1.inject)(interface_3.modalInjectionKey);
        let mousePosition = null;
        (0, vue_1.watch)((0, vue_1.toRef)(props, 'show'), (value) => {
            if (value) {
                mousePosition = NModal.getMousePosition();
            }
        }, {
            immediate: true
        });
        const { stopDrag, startDrag, draggableRef, draggableClassRef } = (0, composables_1.useDragModal)((0, vue_1.toRef)(props, 'draggable'), {
            onEnd: (el) => {
                syncTransformOrigin(el);
            }
        });
        const dialogTitleClassRef = (0, vue_1.computed)(() => {
            return (0, vue_1.normalizeClass)([props.titleClass, draggableClassRef.value]);
        });
        const cardHeaderClassRef = (0, vue_1.computed)(() => {
            return (0, vue_1.normalizeClass)([props.headerClass, draggableClassRef.value]);
        });
        (0, vue_1.watch)((0, vue_1.toRef)(props, 'show'), (value) => {
            if (value)
                displayedRef.value = true;
        });
        (0, _utils_1.useLockHtmlScroll)((0, vue_1.computed)(() => props.blockScroll && displayedRef.value));
        function styleTransformOrigin() {
            if (NModal.transformOriginRef.value === 'center') {
                return '';
            }
            const { value: transformOriginX } = transformOriginXRef;
            const { value: transformOriginY } = transformOriginYRef;
            if (transformOriginX === null || transformOriginY === null) {
                return '';
            }
            else if (scrollbarRef.value) {
                const scrollTop = scrollbarRef.value.containerScrollTop;
                return `${transformOriginX}px ${transformOriginY + scrollTop}px`;
            }
            return '';
        }
        function syncTransformOrigin(el) {
            if (NModal.transformOriginRef.value === 'center') {
                return;
            }
            if (!mousePosition) {
                return;
            }
            if (!scrollbarRef.value)
                return;
            const scrollTop = scrollbarRef.value.containerScrollTop;
            const { offsetLeft, offsetTop } = el;
            const top = mousePosition.y;
            const left = mousePosition.x;
            transformOriginXRef.value = -(offsetLeft - left);
            transformOriginYRef.value = -(offsetTop - top - scrollTop);
            el.style.transformOrigin = styleTransformOrigin();
        }
        function handleEnter(el) {
            void (0, vue_1.nextTick)(() => {
                syncTransformOrigin(el);
            });
        }
        function handleBeforeLeave(el) {
            el.style.transformOrigin = styleTransformOrigin();
            props.onBeforeLeave();
        }
        function handleAfterEnter(el) {
            const element = el;
            draggableRef.value && startDrag(element);
            props.onAfterEnter && props.onAfterEnter(element);
        }
        function handleAfterLeave() {
            displayedRef.value = false;
            transformOriginXRef.value = null;
            transformOriginYRef.value = null;
            stopDrag();
            props.onAfterLeave();
        }
        function handleCloseClick() {
            const { onClose } = props;
            if (onClose) {
                onClose();
            }
        }
        function handleNegativeClick() {
            props.onNegativeClick();
        }
        function handlePositiveClick() {
            props.onPositiveClick();
        }
        const childNodeRef = (0, vue_1.ref)(null);
        (0, vue_1.watch)(childNodeRef, (node) => {
            if (node) {
                void (0, vue_1.nextTick)(() => {
                    const el = node.el;
                    if (el && bodyRef.value !== el) {
                        bodyRef.value = el;
                    }
                });
            }
        });
        (0, vue_1.provide)(interface_3.modalBodyInjectionKey, bodyRef);
        (0, vue_1.provide)(interface_1.drawerBodyInjectionKey, null);
        (0, vue_1.provide)(interface_2.popoverBodyInjectionKey, null);
        return {
            mergedTheme: NModal.mergedThemeRef,
            appear: NModal.appearRef,
            isMounted: NModal.isMountedRef,
            mergedClsPrefix: NModal.mergedClsPrefixRef,
            bodyRef,
            scrollbarRef,
            draggableClass: draggableClassRef,
            displayed: displayedRef,
            childNodeRef,
            cardHeaderClass: cardHeaderClassRef,
            dialogTitleClass: dialogTitleClassRef,
            handlePositiveClick,
            handleNegativeClick,
            handleCloseClick,
            handleAfterEnter,
            handleAfterLeave,
            handleBeforeLeave,
            handleEnter
        };
    },
    render() {
        const { $slots, $attrs, handleEnter, handleAfterEnter, handleAfterLeave, handleBeforeLeave, preset, mergedClsPrefix } = this;
        let childNode = null;
        if (!preset) {
            childNode = (0, _utils_1.getFirstSlotVNodeWithTypedProps)('default', $slots.default, {
                draggableClass: this.draggableClass
            });
            if (!childNode) {
                (0, _utils_1.warn)('modal', 'default slot is empty');
                return;
            }
            childNode = (0, vue_1.cloneVNode)(childNode);
            childNode.props = (0, vue_1.mergeProps)({
                class: `${mergedClsPrefix}-modal`
            }, $attrs, childNode.props || {});
        }
        return this.displayDirective === 'show' || this.displayed || this.show
            ? (0, vue_1.withDirectives)((0, vue_1.h)("div", { role: "none", class: [
                    `${mergedClsPrefix}-modal-body-wrapper`,
                    this.maskHidden
                        && `${mergedClsPrefix}-modal-body-wrapper--mask-hidden`
                ] },
                (0, vue_1.h)(_internal_1.NScrollbar, { ref: "scrollbarRef", theme: this.mergedTheme.peers.Scrollbar, themeOverrides: this.mergedTheme.peerOverrides.Scrollbar, contentClass: `${mergedClsPrefix}-modal-scroll-content` }, {
                    default: () => {
                        var _a;
                        return [
                            (_a = this.renderMask) === null || _a === void 0 ? void 0 : _a.call(this),
                            (0, vue_1.h)(vueuc_1.VFocusTrap, { disabled: !this.trapFocus || this.maskHidden, active: this.show, onEsc: this.onEsc, autoFocus: this.autoFocus }, {
                                default: () => {
                                    var _a;
                                    return ((0, vue_1.h)(vue_1.Transition, { name: "fade-in-scale-up-transition", appear: (_a = this.appear) !== null && _a !== void 0 ? _a : this.isMounted, onEnter: handleEnter, onAfterEnter: handleAfterEnter, onAfterLeave: handleAfterLeave, onBeforeLeave: handleBeforeLeave }, {
                                        default: () => {
                                            const dirs = [
                                                [vue_1.vShow, this.show]
                                            ];
                                            const { onClickoutside } = this;
                                            if (onClickoutside) {
                                                dirs.push([
                                                    vdirs_1.clickoutside,
                                                    this.onClickoutside,
                                                    undefined,
                                                    { capture: true }
                                                ]);
                                            }
                                            return (0, vue_1.withDirectives)((this.preset === 'confirm'
                                                || this.preset === 'dialog' ? ((0, vue_1.h)(Dialog_1.NDialog, Object.assign({}, this.$attrs, { class: [
                                                    `${mergedClsPrefix}-modal`,
                                                    this.$attrs.class
                                                ], ref: "bodyRef", theme: this.mergedTheme.peers.Dialog, themeOverrides: this.mergedTheme.peerOverrides.Dialog }, (0, _utils_1.keep)(this.$props, dialogProps_1.dialogPropKeys), { titleClass: this.dialogTitleClass, "aria-modal": "true" }), $slots)) : this.preset === 'card' ? ((0, vue_1.h)(card_1.NCard, Object.assign({}, this.$attrs, { ref: "bodyRef", class: [
                                                    `${mergedClsPrefix}-modal`,
                                                    this.$attrs.class
                                                ], theme: this.mergedTheme.peers.Card, themeOverrides: this.mergedTheme.peerOverrides.Card }, (0, _utils_1.keep)(this.$props, Card_1.cardBasePropKeys), { headerClass: this.cardHeaderClass, "aria-modal": "true", role: "dialog" }), $slots)) : ((this.childNodeRef = childNode))), dirs);
                                        }
                                    }));
                                }
                            })
                        ];
                    }
                })), [
                [
                    vue_1.vShow,
                    this.displayDirective === 'if' || this.displayed || this.show
                ]
            ])
            : null;
    }
});
