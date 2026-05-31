"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const Message_1 = __importDefault(require("./Message"));
const message_props_1 = require("./message-props");
exports.default = (0, vue_1.defineComponent)({
    name: 'MessageEnvironment',
    props: Object.assign(Object.assign({}, message_props_1.messageProps), { duration: {
            type: Number,
            default: 3000
        }, onAfterLeave: Function, onLeave: Function, internalKey: {
            type: String,
            required: true
        }, 
        // private
        onInternalAfterLeave: Function, 
        // deprecated
        onHide: Function, onAfterHide: Function }),
    setup(props) {
        let timerId = null;
        const showRef = (0, vue_1.ref)(true);
        (0, vue_1.onMounted)(() => {
            setHideTimeout();
        });
        function setHideTimeout() {
            const { duration } = props;
            if (duration) {
                timerId = window.setTimeout(hide, duration);
            }
        }
        function handleMouseenter(e) {
            if (e.currentTarget !== e.target)
                return;
            if (timerId !== null) {
                window.clearTimeout(timerId);
                timerId = null;
            }
        }
        function handleMouseleave(e) {
            if (e.currentTarget !== e.target)
                return;
            setHideTimeout();
        }
        function hide() {
            const { onHide } = props;
            showRef.value = false;
            if (timerId) {
                window.clearTimeout(timerId);
                timerId = null;
            }
            // deprecated
            if (onHide)
                onHide();
        }
        function handleClose() {
            const { onClose } = props;
            if (onClose)
                onClose();
            hide();
        }
        function handleAfterLeave() {
            const { onAfterLeave, onInternalAfterLeave, onAfterHide, internalKey } = props;
            if (onAfterLeave)
                onAfterLeave();
            if (onInternalAfterLeave)
                onInternalAfterLeave(internalKey);
            // deprecated
            if (onAfterHide)
                onAfterHide();
        }
        // deprecated
        function deactivate() {
            hide();
        }
        return {
            show: showRef,
            hide,
            handleClose,
            handleAfterLeave,
            handleMouseleave,
            handleMouseenter,
            deactivate
        };
    },
    render() {
        return ((0, vue_1.h)(_internal_1.NFadeInExpandTransition, { appear: true, onAfterLeave: this.handleAfterLeave, onLeave: this.onLeave }, {
            default: () => [
                this.show ? ((0, vue_1.h)(Message_1.default, { content: this.content, type: this.type, icon: this.icon, showIcon: this.showIcon, closable: this.closable, spinProps: this.spinProps, onClose: this.handleClose, onMouseenter: this.keepAliveOnHover ? this.handleMouseenter : undefined, onMouseleave: this.keepAliveOnHover ? this.handleMouseleave : undefined })) : null
            ]
        }));
    }
});
