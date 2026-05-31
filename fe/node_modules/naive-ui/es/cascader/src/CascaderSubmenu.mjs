import { depx } from 'seemly';
import { computed, defineComponent, h, inject, ref } from 'vue';
import { VirtualList } from 'vueuc';
import { NScrollbar } from "../../_internal/index.mjs";
import NCascaderOption from "./CascaderOption.mjs";
import { cascaderInjectionKey } from "./interface.mjs";
export default defineComponent({
  name: 'CascaderSubmenu',
  props: {
    depth: {
      type: Number,
      required: true
    },
    tmNodes: {
      type: Array,
      required: true
    }
  },
  setup() {
    const {
      virtualScrollRef,
      mergedClsPrefixRef,
      mergedThemeRef,
      optionHeightRef
    } = inject(cascaderInjectionKey);
    const scrollbarInstRef = ref(null);
    const vlInstRef = ref(null);
    const inst = {
      scroll(index, elSize) {
        var _a, _b;
        if (virtualScrollRef.value) {
          (_a = vlInstRef.value) === null || _a === void 0 ? void 0 : _a.scrollTo({
            index
          });
        } else {
          (_b = scrollbarInstRef.value) === null || _b === void 0 ? void 0 : _b.scrollTo({
            index,
            elSize
          });
        }
      }
    };
    return Object.assign({
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: mergedThemeRef,
      scrollbarInstRef,
      vlInstRef,
      virtualScroll: virtualScrollRef,
      itemSize: computed(() => depx(optionHeightRef.value)),
      handleVlScroll: () => {
        var _a;
        (_a = scrollbarInstRef.value) === null || _a === void 0 ? void 0 : _a.sync();
      },
      getVlContainer: () => {
        var _a;
        return (_a = vlInstRef.value) === null || _a === void 0 ? void 0 : _a.listElRef;
      },
      getVlContent: () => {
        var _a;
        return (_a = vlInstRef.value) === null || _a === void 0 ? void 0 : _a.itemsElRef;
      }
    }, inst);
  },
  render() {
    const {
      mergedClsPrefix,
      mergedTheme,
      virtualScroll
    } = this;
    return h("div", {
      class: [virtualScroll && `${mergedClsPrefix}-cascader-submenu--virtual`, `${mergedClsPrefix}-cascader-submenu`]
    }, h(NScrollbar, {
      ref: "scrollbarInstRef",
      theme: mergedTheme.peers.Scrollbar,
      themeOverrides: mergedTheme.peerOverrides.Scrollbar,
      container: virtualScroll ? this.getVlContainer : undefined,
      content: virtualScroll ? this.getVlContent : undefined
    }, {
      default: () => virtualScroll ? h(VirtualList, {
        items: this.tmNodes,
        itemSize: this.itemSize,
        onScroll: this.handleVlScroll,
        showScrollbar: false,
        ref: "vlInstRef"
      }, {
        default: ({
          item: tmNode
        }) => h(NCascaderOption, {
          key: tmNode.key,
          tmNode: tmNode
        })
      }) : this.tmNodes.map(tmNode => h(NCascaderOption, {
        key: tmNode.key,
        tmNode: tmNode
      }))
    }));
  }
});