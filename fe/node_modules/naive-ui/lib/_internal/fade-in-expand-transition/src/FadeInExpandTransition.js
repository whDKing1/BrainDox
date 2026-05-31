"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
exports.default = (0, vue_1.defineComponent)({
    name: 'FadeInExpandTransition',
    props: {
        appear: Boolean,
        group: Boolean,
        mode: String,
        onLeave: Function,
        onAfterLeave: Function,
        onAfterEnter: Function,
        width: Boolean,
        // reverse mode is only used in tree
        // it make it from expanded to collapsed after mounted
        reverse: Boolean
    },
    setup(props, { slots }) {
        function handleBeforeLeave(el) {
            if (props.width) {
                el.style.maxWidth = `${el.offsetWidth}px`;
            }
            else {
                el.style.maxHeight = `${el.offsetHeight}px`;
            }
            void el.offsetWidth;
        }
        function handleLeave(el) {
            if (props.width) {
                el.style.maxWidth = '0';
            }
            else {
                el.style.maxHeight = '0';
            }
            void el.offsetWidth;
            const { onLeave } = props;
            if (onLeave)
                onLeave();
        }
        function handleAfterLeave(el) {
            if (props.width) {
                el.style.maxWidth = '';
            }
            else {
                el.style.maxHeight = '';
            }
            const { onAfterLeave } = props;
            if (onAfterLeave)
                onAfterLeave();
        }
        function handleEnter(el) {
            el.style.transition = 'none';
            if (props.width) {
                const memorizedWidth = el.offsetWidth;
                el.style.maxWidth = '0';
                void el.offsetWidth;
                el.style.transition = '';
                el.style.maxWidth = `${memorizedWidth}px`;
            }
            else {
                if (props.reverse) {
                    el.style.maxHeight = `${el.offsetHeight}px`;
                    void el.offsetHeight;
                    el.style.transition = '';
                    el.style.maxHeight = '0';
                }
                else {
                    const memorizedHeight = el.offsetHeight;
                    el.style.maxHeight = '0';
                    void el.offsetWidth;
                    el.style.transition = '';
                    el.style.maxHeight = `${memorizedHeight}px`;
                }
            }
            void el.offsetWidth;
        }
        function handleAfterEnter(el) {
            var _a;
            if (props.width) {
                el.style.maxWidth = '';
            }
            else {
                if (!props.reverse) {
                    el.style.maxHeight = '';
                }
            }
            (_a = props.onAfterEnter) === null || _a === void 0 ? void 0 : _a.call(props);
        }
        return () => {
            const { group, width, appear, mode } = props;
            const type = group ? vue_1.TransitionGroup : vue_1.Transition;
            const resolvedProps = {
                name: width
                    ? 'fade-in-width-expand-transition'
                    : 'fade-in-height-expand-transition',
                appear,
                onEnter: handleEnter,
                onAfterEnter: handleAfterEnter,
                onBeforeLeave: handleBeforeLeave,
                onLeave: handleLeave,
                onAfterLeave: handleAfterLeave
            };
            if (!group) {
                ;
                resolvedProps.mode = mode;
            }
            return (0, vue_1.h)(type, resolvedProps, slots);
        };
    }
});
