"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NModalProvider = exports.modalProviderProps = void 0;
const seemly_1 = require("seemly");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _utils_1 = require("../../_utils");
const context_1 = require("./context");
const ModalEnvironment_1 = require("./ModalEnvironment");
exports.modalProviderProps = {
    to: [String, Object]
};
exports.NModalProvider = (0, vue_1.defineComponent)({
    name: 'ModalProvider',
    props: exports.modalProviderProps,
    setup() {
        const modalListRef = (0, vue_1.ref)([]);
        const modalInstRefs = {};
        function create(options = {}) {
            const key = (0, seemly_1.createId)();
            const modalReactive = (0, vue_1.reactive)(Object.assign(Object.assign({}, options), { key, destroy: () => {
                    var _a;
                    (_a = modalInstRefs[`n-modal-${key}`]) === null || _a === void 0 ? void 0 : _a.hide();
                } }));
            modalListRef.value.push(modalReactive);
            return modalReactive;
        }
        function handleAfterLeave(key) {
            const { value: modalList } = modalListRef;
            modalList.splice(modalList.findIndex(modal => modal.key === key), 1);
        }
        function destroyAll() {
            Object.values(modalInstRefs).forEach((modalInstRef) => {
                modalInstRef === null || modalInstRef === void 0 ? void 0 : modalInstRef.hide();
            });
        }
        const api = {
            create,
            destroyAll
        };
        (0, vue_1.provide)(context_1.modalApiInjectionKey, api);
        (0, vue_1.provide)(context_1.modalProviderInjectionKey, {
            clickedRef: (0, vooks_1.useClicked)(64),
            clickedPositionRef: (0, vooks_1.useClickPosition)()
        });
        (0, vue_1.provide)(context_1.modalReactiveListInjectionKey, modalListRef);
        return Object.assign(Object.assign({}, api), { modalList: modalListRef, modalInstRefs,
            handleAfterLeave });
    },
    render() {
        var _a, _b;
        return (0, vue_1.h)(vue_1.Fragment, null, [
            this.modalList.map(modal => {
                var _a;
                return (0, vue_1.h)(ModalEnvironment_1.NModalEnvironment, (0, _utils_1.omit)(modal, ['destroy', 'render'], {
                    to: (_a = modal.to) !== null && _a !== void 0 ? _a : this.to,
                    ref: ((inst) => {
                        if (inst === null) {
                            delete this.modalInstRefs[`n-modal-${modal.key}`];
                        }
                        else {
                            this.modalInstRefs[`n-modal-${modal.key}`] = inst;
                        }
                    }),
                    internalKey: modal.key,
                    onInternalAfterLeave: this.handleAfterLeave
                }), {
                    default: modal.render
                });
            }),
            (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)
        ]);
    }
});
