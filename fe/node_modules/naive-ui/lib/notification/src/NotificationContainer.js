"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationContainer = void 0;
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const context_1 = require("./context");
exports.NotificationContainer = (0, vue_1.defineComponent)({
    name: 'NotificationContainer',
    props: {
        scrollable: {
            type: Boolean,
            required: true
        },
        placement: {
            type: String,
            required: true
        }
    },
    setup() {
        const { mergedThemeRef, mergedClsPrefixRef, wipTransitionCountRef } = (0, vue_1.inject)(context_1.notificationProviderInjectionKey);
        const selfRef = (0, vue_1.ref)(null);
        (0, vue_1.watchEffect)(() => {
            var _a, _b;
            if (wipTransitionCountRef.value > 0) {
                (_a = selfRef === null || selfRef === void 0 ? void 0 : selfRef.value) === null || _a === void 0 ? void 0 : _a.classList.add('transitioning');
            }
            else {
                (_b = selfRef === null || selfRef === void 0 ? void 0 : selfRef.value) === null || _b === void 0 ? void 0 : _b.classList.remove('transitioning');
            }
        });
        return {
            selfRef,
            mergedTheme: mergedThemeRef,
            mergedClsPrefix: mergedClsPrefixRef,
            transitioning: wipTransitionCountRef
        };
    },
    render() {
        const { $slots, scrollable, mergedClsPrefix, mergedTheme, placement } = this;
        return ((0, vue_1.h)("div", { ref: "selfRef", class: [
                `${mergedClsPrefix}-notification-container`,
                scrollable && `${mergedClsPrefix}-notification-container--scrollable`,
                `${mergedClsPrefix}-notification-container--${placement}`
            ] }, scrollable ? ((0, vue_1.h)(_internal_1.NScrollbar, { theme: mergedTheme.peers.Scrollbar, themeOverrides: mergedTheme.peerOverrides.Scrollbar, contentStyle: { overflow: 'hidden' } }, $slots)) : ($slots)));
    }
});
