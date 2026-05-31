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
exports.NModalEnvironment = void 0;
// use absolute path to make sure no circular ref of style
// this -> modal-index -> modal-style
const vue_1 = require("vue");
const Modal_1 = __importStar(require("./Modal"));
exports.NModalEnvironment = (0, vue_1.defineComponent)({
    name: 'ModalEnvironment',
    props: Object.assign(Object.assign({}, Modal_1.modalProps), { internalKey: {
            type: String,
            required: true
        }, 
        // private
        onInternalAfterLeave: {
            type: Function,
            required: true
        } }),
    setup(props) {
        const showRef = (0, vue_1.ref)(true);
        function handleAfterLeave() {
            const { onInternalAfterLeave, internalKey, onAfterLeave } = props;
            if (onInternalAfterLeave)
                onInternalAfterLeave(internalKey);
            if (onAfterLeave)
                onAfterLeave();
        }
        function handlePositiveClick() {
            const { onPositiveClick } = props;
            if (onPositiveClick) {
                void Promise.resolve(onPositiveClick()).then((result) => {
                    if (result === false)
                        return;
                    hide();
                });
            }
            else {
                hide();
            }
        }
        function handleNegativeClick() {
            const { onNegativeClick } = props;
            if (onNegativeClick) {
                void Promise.resolve(onNegativeClick()).then((result) => {
                    if (result === false)
                        return;
                    hide();
                });
            }
            else {
                hide();
            }
        }
        function handleCloseClick() {
            const { onClose } = props;
            if (onClose) {
                void Promise.resolve(onClose()).then((result) => {
                    if (result === false)
                        return;
                    hide();
                });
            }
            else {
                hide();
            }
        }
        function handleMaskClick(e) {
            const { onMaskClick, maskClosable } = props;
            if (onMaskClick) {
                onMaskClick(e);
                if (maskClosable) {
                    hide();
                }
            }
        }
        function handleEsc() {
            const { onEsc } = props;
            if (onEsc) {
                onEsc();
            }
        }
        function hide() {
            showRef.value = false;
        }
        function handleUpdateShow(value) {
            showRef.value = value;
        }
        return {
            show: showRef,
            hide,
            handleUpdateShow,
            handleAfterLeave,
            handleCloseClick,
            handleNegativeClick,
            handlePositiveClick,
            handleMaskClick,
            handleEsc
        };
    },
    render() {
        const { handleUpdateShow, handleAfterLeave, handleMaskClick, handleEsc, show } = this;
        return ((0, vue_1.h)(Modal_1.default, Object.assign({}, this.$props, { show: show, onUpdateShow: handleUpdateShow, onMaskClick: handleMaskClick, onEsc: handleEsc, onAfterLeave: handleAfterLeave, internalAppear: true, internalModal: true }), this.$slots));
    }
});
