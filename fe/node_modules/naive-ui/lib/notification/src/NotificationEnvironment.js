"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationEnvironment = exports.notificationEnvOptions = void 0;
const vue_1 = require("vue");
const _utils_1 = require("../../_utils");
const context_1 = require("./context");
const Notification_1 = require("./Notification");
exports.notificationEnvOptions = Object.assign(Object.assign({}, Notification_1.notificationProps), { duration: Number, onClose: Function, onLeave: Function, onAfterEnter: Function, onAfterLeave: Function, 
    /** @deprecated */
    onHide: Function, 
    /** @deprecated */
    onAfterShow: Function, 
    /** @deprecated */
    onAfterHide: Function });
exports.NotificationEnvironment = (0, vue_1.defineComponent)({
    name: 'NotificationEnvironment',
    props: Object.assign(Object.assign({}, exports.notificationEnvOptions), { 
        // private
        internalKey: {
            type: String,
            required: true
        }, onInternalAfterLeave: {
            type: Function,
            required: true
        } }),
    setup(props) {
        const { wipTransitionCountRef } = (0, vue_1.inject)(context_1.notificationProviderInjectionKey);
        const showRef = (0, vue_1.ref)(true);
        let timerId = null;
        function hide() {
            showRef.value = false;
            if (timerId) {
                window.clearTimeout(timerId);
            }
        }
        function handleBeforeEnter(el) {
            wipTransitionCountRef.value++;
            void (0, vue_1.nextTick)(() => {
                el.style.height = `${el.offsetHeight}px`;
                el.style.maxHeight = '0';
                el.style.transition = 'none';
                void el.offsetHeight;
                el.style.transition = '';
                el.style.maxHeight = el.style.height;
            });
        }
        function handleAfterEnter(el) {
            wipTransitionCountRef.value--;
            el.style.height = '';
            el.style.maxHeight = '';
            const { onAfterEnter, onAfterShow } = props;
            if (onAfterEnter)
                onAfterEnter();
            // deprecated
            if (onAfterShow)
                onAfterShow();
        }
        function handleBeforeLeave(el) {
            wipTransitionCountRef.value++;
            el.style.maxHeight = `${el.offsetHeight}px`;
            el.style.height = `${el.offsetHeight}px`;
            void el.offsetHeight;
        }
        function handleLeave(el) {
            const { onHide } = props;
            if (onHide)
                onHide();
            el.style.maxHeight = '0';
            void el.offsetHeight;
        }
        function handleAfterLeave() {
            wipTransitionCountRef.value--;
            const { onAfterLeave, onInternalAfterLeave, onAfterHide, internalKey } = props;
            if (onAfterLeave)
                onAfterLeave();
            onInternalAfterLeave(internalKey);
            // deprecated
            if (onAfterHide)
                onAfterHide();
        }
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
        function handleClose() {
            const { onClose } = props;
            if (onClose) {
                void Promise.resolve(onClose()).then((feedback) => {
                    if (feedback === false)
                        return;
                    hide();
                });
            }
            else {
                hide();
            }
        }
        (0, vue_1.onMounted)(() => {
            if (props.duration) {
                timerId = window.setTimeout(hide, props.duration);
            }
        });
        return {
            show: showRef,
            hide,
            handleClose,
            handleAfterLeave,
            handleLeave,
            handleBeforeLeave,
            handleAfterEnter,
            handleBeforeEnter,
            handleMouseenter,
            handleMouseleave
        };
    },
    render() {
        return ((0, vue_1.h)(vue_1.Transition, { name: "notification-transition", appear: true, 
            // convert to any since Element is not compatible with HTMLElement
            onBeforeEnter: this.handleBeforeEnter, onAfterEnter: this.handleAfterEnter, onBeforeLeave: this.handleBeforeLeave, onLeave: this.handleLeave, onAfterLeave: this.handleAfterLeave }, {
            default: () => {
                return this.show ? ((0, vue_1.h)(Notification_1.Notification, Object.assign({}, (0, _utils_1.keep)(this.$props, Notification_1.notificationPropKeys), { onClose: this.handleClose, onMouseenter: this.duration && this.keepAliveOnHover
                        ? this.handleMouseenter
                        : undefined, onMouseleave: this.duration && this.keepAliveOnHover
                        ? this.handleMouseleave
                        : undefined }))) : null;
            }
        }));
    }
});
