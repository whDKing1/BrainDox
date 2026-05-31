"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationProviderProps = exports.notificationApiInjectionKey = void 0;
const seemly_1 = require("seemly");
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const context_1 = require("./context");
const NotificationContainer_1 = require("./NotificationContainer");
const NotificationEnvironment_1 = require("./NotificationEnvironment");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.notificationApiInjectionKey = (0, _utils_1.createInjectionKey)('n-notification-api');
exports.notificationProviderProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { containerClass: String, containerStyle: [String, Object], to: [String, Object], scrollable: {
        type: Boolean,
        default: true
    }, max: Number, placement: {
        type: String,
        default: 'top-right'
    }, keepAliveOnHover: Boolean });
exports.default = (0, vue_1.defineComponent)({
    name: 'NotificationProvider',
    props: exports.notificationProviderProps,
    setup(props) {
        const { mergedClsPrefixRef } = (0, _mixins_1.useConfig)(props);
        const notificationListRef = (0, vue_1.ref)([]);
        const notificationRefs = {};
        const leavingKeySet = new Set();
        function create(options) {
            const key = (0, seemly_1.createId)();
            const destroy = () => {
                leavingKeySet.add(key);
                // If you push n + 1 message when max is n, notificationRefs[key] maybe not be set
                if (notificationRefs[key]) {
                    notificationRefs[key].hide();
                }
            };
            const notificationReactive = (0, vue_1.reactive)(Object.assign(Object.assign({}, options), { key,
                destroy, hide: destroy, deactivate: destroy }));
            const { max } = props;
            if (max && notificationListRef.value.length - leavingKeySet.size >= max) {
                let someoneMountedRemoved = false;
                let index = 0;
                for (const notification of notificationListRef.value) {
                    if (!leavingKeySet.has(notification.key)) {
                        if (notificationRefs[notification.key]) {
                            notification.destroy();
                            someoneMountedRemoved = true;
                        }
                        break;
                    }
                    index++;
                }
                if (!someoneMountedRemoved) {
                    notificationListRef.value.splice(index, 1);
                }
            }
            notificationListRef.value.push(notificationReactive);
            return notificationReactive;
        }
        const apis = ['info', 'success', 'warning', 'error'].map((type) => {
            return (options) => create(Object.assign(Object.assign({}, options), { type }));
        });
        function handleAfterLeave(key) {
            leavingKeySet.delete(key);
            notificationListRef.value.splice(notificationListRef.value.findIndex(notification => notification.key === key), 1);
        }
        const themeRef = (0, _mixins_1.useTheme)('Notification', '-notification', index_cssr_1.default, styles_1.notificationLight, props, mergedClsPrefixRef);
        const api = {
            create,
            info: apis[0],
            success: apis[1],
            warning: apis[2],
            error: apis[3],
            open,
            destroyAll
        };
        const wipTransitionCountRef = (0, vue_1.ref)(0);
        (0, vue_1.provide)(exports.notificationApiInjectionKey, api);
        (0, vue_1.provide)(context_1.notificationProviderInjectionKey, {
            props,
            mergedClsPrefixRef,
            mergedThemeRef: themeRef,
            wipTransitionCountRef
        });
        // deprecated
        function open(options) {
            return create(options);
        }
        function destroyAll() {
            Object.values(notificationListRef.value).forEach((notification) => {
                notification.hide();
            });
        }
        return Object.assign({
            mergedClsPrefix: mergedClsPrefixRef,
            notificationList: notificationListRef,
            notificationRefs,
            handleAfterLeave
        }, api);
    },
    render() {
        var _a, _b, _c;
        const { placement } = this;
        return ((0, vue_1.h)(vue_1.Fragment, null, (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 :
            _b.call(_a),
            this.notificationList.length ? ((0, vue_1.h)(vue_1.Teleport, { to: (_c = this.to) !== null && _c !== void 0 ? _c : 'body' },
                (0, vue_1.h)(NotificationContainer_1.NotificationContainer, { class: this.containerClass, style: this.containerStyle, scrollable: this.scrollable && placement !== 'top' && placement !== 'bottom', placement: placement }, {
                    default: () => {
                        return this.notificationList.map((notification) => {
                            return ((0, vue_1.h)(NotificationEnvironment_1.NotificationEnvironment, Object.assign({ ref: ((inst) => {
                                    const refKey = notification.key;
                                    if (inst === null) {
                                        delete this.notificationRefs[refKey];
                                    }
                                    else {
                                        this.notificationRefs[refKey] = inst;
                                    }
                                }) }, (0, _utils_1.omit)(notification, [
                                'destroy',
                                'hide',
                                'deactivate'
                            ]), { internalKey: notification.key, onInternalAfterLeave: this.handleAfterLeave, keepAliveOnHover: notification.keepAliveOnHover === undefined
                                    ? this.keepAliveOnHover
                                    : notification.keepAliveOnHover })));
                        });
                    }
                }))) : null));
    }
});
