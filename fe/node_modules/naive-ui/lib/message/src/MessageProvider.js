"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageProviderProps = void 0;
const seemly_1 = require("seemly");
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const context_1 = require("./context");
const MessageEnvironment_1 = __importDefault(require("./MessageEnvironment"));
exports.messageProviderProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { to: [String, Object], duration: {
        type: Number,
        default: 3000
    }, keepAliveOnHover: Boolean, max: Number, placement: {
        type: String,
        default: 'top'
    }, closable: Boolean, containerClass: String, containerStyle: [String, Object] });
exports.default = (0, vue_1.defineComponent)({
    name: 'MessageProvider',
    props: exports.messageProviderProps,
    setup(props) {
        const { mergedClsPrefixRef } = (0, _mixins_1.useConfig)(props);
        const messageListRef = (0, vue_1.ref)([]);
        const messageRefs = (0, vue_1.ref)({});
        const api = {
            create(content, options) {
                return create(content, Object.assign({ type: 'default' }, options));
            },
            info(content, options) {
                return create(content, Object.assign(Object.assign({}, options), { type: 'info' }));
            },
            success(content, options) {
                return create(content, Object.assign(Object.assign({}, options), { type: 'success' }));
            },
            warning(content, options) {
                return create(content, Object.assign(Object.assign({}, options), { type: 'warning' }));
            },
            error(content, options) {
                return create(content, Object.assign(Object.assign({}, options), { type: 'error' }));
            },
            loading(content, options) {
                return create(content, Object.assign(Object.assign({}, options), { type: 'loading' }));
            },
            destroyAll
        };
        (0, vue_1.provide)(context_1.messageProviderInjectionKey, {
            props,
            mergedClsPrefixRef
        });
        (0, vue_1.provide)(context_1.messageApiInjectionKey, api);
        function create(content, options) {
            const key = (0, seemly_1.createId)();
            const messageReactive = (0, vue_1.reactive)(Object.assign(Object.assign({}, options), { content,
                key, destroy: () => {
                    var _a;
                    (_a = messageRefs.value[key]) === null || _a === void 0 ? void 0 : _a.hide();
                } }));
            const { max } = props;
            if (max && messageListRef.value.length >= max) {
                messageListRef.value.shift();
            }
            messageListRef.value.push(messageReactive);
            return messageReactive;
        }
        function handleAfterLeave(key) {
            messageListRef.value.splice(messageListRef.value.findIndex(message => message.key === key), 1);
            delete messageRefs.value[key];
        }
        function destroyAll() {
            Object.values(messageRefs.value).forEach((messageInstRef) => {
                messageInstRef.hide();
            });
        }
        return Object.assign({
            mergedClsPrefix: mergedClsPrefixRef,
            messageRefs,
            messageList: messageListRef,
            handleAfterLeave
        }, api);
    },
    render() {
        var _a, _b, _c;
        return ((0, vue_1.h)(vue_1.Fragment, null, (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 :
            _b.call(_a),
            this.messageList.length ? ((0, vue_1.h)(vue_1.Teleport, { to: (_c = this.to) !== null && _c !== void 0 ? _c : 'body' },
                (0, vue_1.h)("div", { class: [
                        `${this.mergedClsPrefix}-message-container`,
                        `${this.mergedClsPrefix}-message-container--${this.placement}`,
                        this.containerClass
                    ], key: "message-container", style: this.containerStyle }, this.messageList.map((message) => {
                    return ((0, vue_1.h)(MessageEnvironment_1.default, Object.assign({ ref: ((inst) => {
                            if (inst) {
                                this.messageRefs[message.key] = inst;
                            }
                        }), internalKey: message.key, onInternalAfterLeave: this.handleAfterLeave }, (0, _utils_1.omit)(message, ['destroy'], undefined), { duration: message.duration === undefined
                            ? this.duration
                            : message.duration, keepAliveOnHover: message.keepAliveOnHover === undefined
                            ? this.keepAliveOnHover
                            : message.keepAliveOnHover, closable: message.closable === undefined
                            ? this.closable
                            : message.closable })));
                })))) : null));
    }
});
