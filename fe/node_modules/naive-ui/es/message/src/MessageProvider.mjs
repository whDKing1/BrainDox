import { createId } from 'seemly';
import { defineComponent, Fragment, h, provide, reactive, ref, Teleport } from 'vue';
import { useConfig, useTheme } from "../../_mixins/index.mjs";
import { omit } from "../../_utils/index.mjs";
import { messageApiInjectionKey, messageProviderInjectionKey } from "./context.mjs";
import MessageEnvironment from "./MessageEnvironment.mjs";
export const messageProviderProps = Object.assign(Object.assign({}, useTheme.props), {
  to: [String, Object],
  duration: {
    type: Number,
    default: 3000
  },
  keepAliveOnHover: Boolean,
  max: Number,
  placement: {
    type: String,
    default: 'top'
  },
  closable: Boolean,
  containerClass: String,
  containerStyle: [String, Object]
});
export default defineComponent({
  name: 'MessageProvider',
  props: messageProviderProps,
  setup(props) {
    const {
      mergedClsPrefixRef
    } = useConfig(props);
    const messageListRef = ref([]);
    const messageRefs = ref({});
    const api = {
      create(content, options) {
        return create(content, Object.assign({
          type: 'default'
        }, options));
      },
      info(content, options) {
        return create(content, Object.assign(Object.assign({}, options), {
          type: 'info'
        }));
      },
      success(content, options) {
        return create(content, Object.assign(Object.assign({}, options), {
          type: 'success'
        }));
      },
      warning(content, options) {
        return create(content, Object.assign(Object.assign({}, options), {
          type: 'warning'
        }));
      },
      error(content, options) {
        return create(content, Object.assign(Object.assign({}, options), {
          type: 'error'
        }));
      },
      loading(content, options) {
        return create(content, Object.assign(Object.assign({}, options), {
          type: 'loading'
        }));
      },
      destroyAll
    };
    provide(messageProviderInjectionKey, {
      props,
      mergedClsPrefixRef
    });
    provide(messageApiInjectionKey, api);
    function create(content, options) {
      const key = createId();
      const messageReactive = reactive(Object.assign(Object.assign({}, options), {
        content,
        key,
        destroy: () => {
          var _a;
          (_a = messageRefs.value[key]) === null || _a === void 0 ? void 0 : _a.hide();
        }
      }));
      const {
        max
      } = props;
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
      Object.values(messageRefs.value).forEach(messageInstRef => {
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
    return h(Fragment, null, (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a), this.messageList.length ? h(Teleport, {
      to: (_c = this.to) !== null && _c !== void 0 ? _c : 'body'
    }, h("div", {
      class: [`${this.mergedClsPrefix}-message-container`, `${this.mergedClsPrefix}-message-container--${this.placement}`, this.containerClass],
      key: "message-container",
      style: this.containerStyle
    }, this.messageList.map(message => {
      return h(MessageEnvironment, Object.assign({
        ref: inst => {
          if (inst) {
            this.messageRefs[message.key] = inst;
          }
        },
        internalKey: message.key,
        onInternalAfterLeave: this.handleAfterLeave
      }, omit(message, ['destroy'], undefined), {
        duration: message.duration === undefined ? this.duration : message.duration,
        keepAliveOnHover: message.keepAliveOnHover === undefined ? this.keepAliveOnHover : message.keepAliveOnHover,
        closable: message.closable === undefined ? this.closable : message.closable
      }));
    }))) : null);
  }
});