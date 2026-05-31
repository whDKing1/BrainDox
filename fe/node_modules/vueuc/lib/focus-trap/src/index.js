"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FocusTrap = void 0;
const vue_1 = require("vue");
const seemly_1 = require("seemly");
const evtd_1 = require("evtd");
const utils_1 = require("./utils");
const shared_1 = require("../../shared");
let stack = [];
exports.FocusTrap = (0, vue_1.defineComponent)({
    name: 'FocusTrap',
    props: {
        disabled: Boolean,
        active: Boolean,
        autoFocus: {
            type: Boolean,
            default: true
        },
        onEsc: Function,
        initialFocusTo: [String, Function],
        finalFocusTo: [String, Function],
        returnFocusOnDeactivated: {
            type: Boolean,
            default: true
        }
    },
    setup(props) {
        const id = (0, seemly_1.createId)();
        const focusableStartRef = (0, vue_1.ref)(null);
        const focusableEndRef = (0, vue_1.ref)(null);
        let activated = false;
        let ignoreInternalFocusChange = false;
        const lastFocusedElement = typeof document === 'undefined' ? null : document.activeElement;
        function isCurrentActive() {
            const currentActiveId = stack[stack.length - 1];
            return currentActiveId === id;
        }
        function handleDocumentKeydown(e) {
            var _a;
            if (e.code === 'Escape') {
                if (isCurrentActive()) {
                    (_a = props.onEsc) === null || _a === void 0 ? void 0 : _a.call(props, e);
                }
            }
        }
        (0, vue_1.onMounted)(() => {
            (0, vue_1.watch)(() => props.active, (value) => {
                if (value) {
                    activate();
                    (0, evtd_1.on)('keydown', document, handleDocumentKeydown);
                }
                else {
                    (0, evtd_1.off)('keydown', document, handleDocumentKeydown);
                    if (activated) {
                        deactivate();
                    }
                }
            }, {
                immediate: true
            });
        });
        (0, vue_1.onBeforeUnmount)(() => {
            (0, evtd_1.off)('keydown', document, handleDocumentKeydown);
            if (activated)
                deactivate();
        });
        function handleDocumentFocus(e) {
            if (ignoreInternalFocusChange)
                return;
            if (isCurrentActive()) {
                const mainEl = getMainEl();
                if (mainEl === null)
                    return;
                if (mainEl.contains((0, seemly_1.getPreciseEventTarget)(e)))
                    return;
                // I don't handle shift + tab status since it's too tricky to handle
                // Not impossible but I need to sleep
                resetFocusTo('first');
            }
        }
        function getMainEl() {
            const focusableStartEl = focusableStartRef.value;
            if (focusableStartEl === null)
                return null;
            let mainEl = focusableStartEl;
            while (true) {
                mainEl = mainEl.nextSibling;
                if (mainEl === null)
                    break;
                if (mainEl instanceof Element && mainEl.tagName === 'DIV') {
                    break;
                }
            }
            return mainEl;
        }
        function activate() {
            var _a;
            if (props.disabled)
                return;
            stack.push(id);
            if (props.autoFocus) {
                const { initialFocusTo } = props;
                if (initialFocusTo === undefined) {
                    resetFocusTo('first');
                }
                else {
                    (_a = (0, shared_1.resolveTo)(initialFocusTo)) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true });
                }
            }
            activated = true;
            document.addEventListener('focus', handleDocumentFocus, true);
        }
        function deactivate() {
            var _a;
            if (props.disabled)
                return;
            document.removeEventListener('focus', handleDocumentFocus, true);
            stack = stack.filter((idInStack) => idInStack !== id);
            if (isCurrentActive())
                return;
            const { finalFocusTo } = props;
            if (finalFocusTo !== undefined) {
                (_a = (0, shared_1.resolveTo)(finalFocusTo)) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true });
            }
            else if (props.returnFocusOnDeactivated) {
                if (lastFocusedElement instanceof HTMLElement) {
                    ignoreInternalFocusChange = true;
                    lastFocusedElement.focus({ preventScroll: true });
                    ignoreInternalFocusChange = false;
                }
            }
        }
        function resetFocusTo(target) {
            if (!isCurrentActive())
                return;
            if (props.active) {
                const focusableStartEl = focusableStartRef.value;
                const focusableEndEl = focusableEndRef.value;
                if (focusableStartEl !== null && focusableEndEl !== null) {
                    const mainEl = getMainEl();
                    if (mainEl == null || mainEl === focusableEndEl) {
                        ignoreInternalFocusChange = true;
                        focusableStartEl.focus({ preventScroll: true });
                        ignoreInternalFocusChange = false;
                        return;
                    }
                    ignoreInternalFocusChange = true;
                    const focused = target === 'first'
                        ? (0, utils_1.focusFirstDescendant)(mainEl)
                        : (0, utils_1.focusLastDescendant)(mainEl);
                    ignoreInternalFocusChange = false;
                    if (!focused) {
                        ignoreInternalFocusChange = true;
                        focusableStartEl.focus({ preventScroll: true });
                        ignoreInternalFocusChange = false;
                    }
                }
            }
        }
        function handleStartFocus(e) {
            if (ignoreInternalFocusChange)
                return;
            const mainEl = getMainEl();
            if (mainEl === null)
                return;
            if (e.relatedTarget !== null && mainEl.contains(e.relatedTarget)) {
                // if it comes from inner, focus last
                resetFocusTo('last');
            }
            else {
                // otherwise focus first
                resetFocusTo('first');
            }
        }
        function handleEndFocus(e) {
            if (ignoreInternalFocusChange)
                return;
            if (e.relatedTarget !== null &&
                e.relatedTarget === focusableStartRef.value) {
                // if it comes from first, focus last
                resetFocusTo('last');
            }
            else {
                // otherwise focus first
                resetFocusTo('first');
            }
        }
        return {
            focusableStartRef,
            focusableEndRef,
            focusableStyle: 'position: absolute; height: 0; width: 0;',
            handleStartFocus,
            handleEndFocus
        };
    },
    render() {
        const { default: defaultSlot } = this.$slots;
        if (defaultSlot === undefined)
            return null;
        if (this.disabled)
            return defaultSlot();
        const { active, focusableStyle } = this;
        return (0, vue_1.h)(vue_1.Fragment, null, [
            (0, vue_1.h)('div', {
                'aria-hidden': 'true',
                tabindex: active ? '0' : '-1',
                ref: 'focusableStartRef',
                style: focusableStyle,
                onFocus: this.handleStartFocus
            }),
            defaultSlot(),
            (0, vue_1.h)('div', {
                'aria-hidden': 'true',
                style: focusableStyle,
                ref: 'focusableEndRef',
                tabindex: active ? '0' : '-1',
                onFocus: this.handleEndFocus
            })
        ]);
    }
});
