import { createId } from 'seemly';
import { defineComponent, Fragment, h, provide, reactive, ref, Teleport } from 'vue';
import { useConfig, useTheme } from "../../_mixins/index.mjs";
import { createInjectionKey, omit } from "../../_utils/index.mjs";
import { notificationLight } from "../styles/index.mjs";
import { notificationProviderInjectionKey } from "./context.mjs";
import { NotificationContainer } from "./NotificationContainer.mjs";
import { NotificationEnvironment } from "./NotificationEnvironment.mjs";
import style from "./styles/index.cssr.mjs";
export const notificationApiInjectionKey = createInjectionKey('n-notification-api');
export const notificationProviderProps = Object.assign(Object.assign({}, useTheme.props), {
  containerClass: String,
  containerStyle: [String, Object],
  to: [String, Object],
  scrollable: {
    type: Boolean,
    default: true
  },
  max: Number,
  placement: {
    type: String,
    default: 'top-right'
  },
  keepAliveOnHover: Boolean
});
export default defineComponent({
  name: 'NotificationProvider',
  props: notificationProviderProps,
  setup(props) {
    const {
      mergedClsPrefixRef
    } = useConfig(props);
    const notificationListRef = ref([]);
    const notificationRefs = {};
    const leavingKeySet = new Set();
    function create(options) {
      const key = createId();
      const destroy = () => {
        leavingKeySet.add(key);
        // If you push n + 1 message when max is n, notificationRefs[key] maybe not be set
        if (notificationRefs[key]) {
          notificationRefs[key].hide();
        }
      };
      const notificationReactive = reactive(Object.assign(Object.assign({}, options), {
        key,
        destroy,
        hide: destroy,
        deactivate: destroy
      }));
      const {
        max
      } = props;
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
    const apis = ['info', 'success', 'warning', 'error'].map(type => {
      return options => create(Object.assign(Object.assign({}, options), {
        type
      }));
    });
    function handleAfterLeave(key) {
      leavingKeySet.delete(key);
      notificationListRef.value.splice(notificationListRef.value.findIndex(notification => notification.key === key), 1);
    }
    const themeRef = useTheme('Notification', '-notification', style, notificationLight, props, mergedClsPrefixRef);
    const api = {
      create,
      info: apis[0],
      success: apis[1],
      warning: apis[2],
      error: apis[3],
      open,
      destroyAll
    };
    const wipTransitionCountRef = ref(0);
    provide(notificationApiInjectionKey, api);
    provide(notificationProviderInjectionKey, {
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
      Object.values(notificationListRef.value).forEach(notification => {
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
    const {
      placement
    } = this;
    return h(Fragment, null, (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a), this.notificationList.length ? h(Teleport, {
      to: (_c = this.to) !== null && _c !== void 0 ? _c : 'body'
    }, h(NotificationContainer, {
      class: this.containerClass,
      style: this.containerStyle,
      scrollable: this.scrollable && placement !== 'top' && placement !== 'bottom',
      placement: placement
    }, {
      default: () => {
        return this.notificationList.map(notification => {
          return h(NotificationEnvironment, Object.assign({
            ref: inst => {
              const refKey = notification.key;
              if (inst === null) {
                delete this.notificationRefs[refKey];
              } else {
                this.notificationRefs[refKey] = inst;
              }
            }
          }, omit(notification, ['destroy', 'hide', 'deactivate']), {
            internalKey: notification.key,
            onInternalAfterLeave: this.handleAfterLeave,
            keepAliveOnHover: notification.keepAliveOnHover === undefined ? this.keepAliveOnHover : notification.keepAliveOnHover
          }));
        });
      }
    })) : null);
  }
});