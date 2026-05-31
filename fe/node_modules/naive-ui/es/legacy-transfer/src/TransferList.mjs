import { computed, defineComponent, Fragment, h, inject, ref, Transition, TransitionGroup } from 'vue';
import { VirtualList } from 'vueuc';
import { NScrollbar } from "../../_internal/index.mjs";
import { useConfig } from "../../_mixins/index.mjs";
import { NEmpty } from "../../empty/index.mjs";
import { transferInjectionKey } from "./interface.mjs";
import NTransferListItem from "./TransferListItem.mjs";
export default defineComponent({
  name: 'TransferList',
  props: {
    virtualScroll: {
      type: Boolean,
      required: true
    },
    itemSize: {
      type: Number,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    },
    isMounted: {
      type: Boolean,
      required: true
    },
    isInputing: {
      type: Boolean,
      required: true
    },
    source: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const {
      mergedThemeRef,
      mergedClsPrefixRef
    } = inject(transferInjectionKey);
    const {
      mergedComponentPropsRef
    } = useConfig();
    const scrollerInstRef = ref(null);
    const vlInstRef = ref(null);
    const mergedRenderEmptyRef = computed(() => {
      var _a, _b;
      return (_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Transfer) === null || _b === void 0 ? void 0 : _b.renderEmpty;
    });
    function syncVLScroller() {
      var _a;
      (_a = scrollerInstRef.value) === null || _a === void 0 ? void 0 : _a.sync();
    }
    function scrollContainer() {
      const {
        value
      } = vlInstRef;
      if (!value) return null;
      const {
        listElRef
      } = value;
      return listElRef;
    }
    function scrollContent() {
      const {
        value
      } = vlInstRef;
      if (!value) return null;
      const {
        itemsElRef
      } = value;
      return itemsElRef;
    }
    return {
      mergedTheme: mergedThemeRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedRenderEmpty: mergedRenderEmptyRef,
      scrollerInstRef,
      vlInstRef,
      syncVLScroller,
      scrollContainer,
      scrollContent
    };
  },
  render() {
    const {
      mergedTheme,
      mergedClsPrefix,
      virtualScroll,
      syncVLScroller
    } = this;
    return h(Fragment, null, h(NScrollbar, {
      ref: "scrollerInstRef",
      theme: mergedTheme.peers.Scrollbar,
      themeOverrides: mergedTheme.peerOverrides.Scrollbar,
      container: virtualScroll ? this.scrollContainer : undefined,
      content: virtualScroll ? this.scrollContent : undefined
    }, {
      default: () => virtualScroll ? h(VirtualList, {
        ref: "vlInstRef",
        style: {
          height: '100%'
        },
        class: `${mergedClsPrefix}-legacy-transfer-list-content`,
        items: this.options,
        itemSize: this.itemSize,
        showScrollbar: false,
        onResize: syncVLScroller,
        onScroll: syncVLScroller,
        keyField: "value"
      }, {
        default: ({
          item
        }) => {
          const {
            source,
            disabled
          } = this;
          return h(NTransferListItem, {
            source: source,
            key: item.value,
            value: item.value,
            disabled: item.disabled || disabled,
            label: item.label
          });
        }
      }) : h("div", {
        class: `${mergedClsPrefix}-legacy-transfer-list-content`
      }, h(TransitionGroup, {
        name: "item",
        appear: this.isMounted,
        css: !this.isInputing
      }, {
        default: () => {
          const {
            source,
            disabled
          } = this;
          return this.options.map(option => h(NTransferListItem, {
            source: source,
            key: option.value,
            value: option.value,
            disabled: option.disabled || disabled,
            label: option.label
          }));
        }
      }))
    }), h(Transition, {
      name: "fade-in-transition",
      appear: this.isMounted,
      css: !this.isInputing
    }, {
      default: () => {
        var _a;
        return this.options.length ? null : ((_a = this.mergedRenderEmpty) === null || _a === void 0 ? void 0 : _a.call(this)) || h(NEmpty, {
          theme: mergedTheme.peers.Empty,
          themeOverrides: mergedTheme.peerOverrides.Empty
        });
      }
    }));
  }
});