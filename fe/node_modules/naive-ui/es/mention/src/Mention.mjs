import { createTreeMate } from 'treemate';
import { useIsMounted, useMergedState } from 'vooks';
import { computed, defineComponent, h, nextTick, ref, toRef, Transition } from 'vue';
import { VBinder, VFollower, VTarget } from 'vueuc';
import { NInternalSelectMenu } from "../../_internal/index.mjs";
import { useConfig, useFormItem, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { call, useAdjustedTo, warn } from "../../_utils/index.mjs";
import { NInput } from "../../input/index.mjs";
import { mentionLight } from "../styles/index.mjs";
import style from "./styles/index.cssr.mjs";
import { getRelativePosition } from "./utils.mjs";
export const mentionProps = Object.assign(Object.assign({}, useTheme.props), {
  to: useAdjustedTo.propTo,
  autosize: [Boolean, Object],
  options: {
    type: Array,
    default: []
  },
  filter: {
    type: Function,
    default: (pattern, option) => {
      if (!pattern) return true;
      if (typeof option.label === 'string') {
        return option.label.startsWith(pattern);
      }
      if (typeof option.value === 'string') {
        return option.value.startsWith(pattern);
      }
      return false;
    }
  },
  type: {
    type: String,
    default: 'text'
  },
  separator: {
    type: String,
    validator: separator => {
      if (separator.length !== 1) {
        warn('mention', '`separator`\'s length must be 1.');
        return false;
      }
      return true;
    },
    default: ' '
  },
  bordered: {
    type: Boolean,
    default: undefined
  },
  disabled: Boolean,
  value: String,
  defaultValue: {
    type: String,
    default: ''
  },
  loading: Boolean,
  prefix: {
    type: [String, Array],
    default: '@'
  },
  placeholder: {
    type: String,
    default: ''
  },
  placement: {
    type: String,
    default: 'bottom-start'
  },
  size: String,
  renderLabel: Function,
  status: String,
  'onUpdate:show': [Array, Function],
  onUpdateShow: [Array, Function],
  'onUpdate:value': [Array, Function],
  onUpdateValue: [Array, Function],
  onSearch: Function,
  onSelect: Function,
  onFocus: Function,
  onBlur: Function,
  scrollbarProps: Object,
  // private
  internalDebug: Boolean
});
export default defineComponent({
  name: 'Mention',
  props: mentionProps,
  slots: Object,
  setup(props) {
    const {
      namespaceRef,
      mergedClsPrefixRef,
      mergedBorderedRef,
      inlineThemeDisabled,
      mergedComponentPropsRef
    } = useConfig(props);
    const themeRef = useTheme('Mention', '-mention', style, mentionLight, props, mergedClsPrefixRef);
    const formItem = useFormItem(props, {
      mergedSize: NFormItem => {
        var _a, _b;
        const {
          size
        } = props;
        if (size) return size;
        const {
          mergedSize: formItemSize
        } = NFormItem || {};
        if (formItemSize === null || formItemSize === void 0 ? void 0 : formItemSize.value) return formItemSize.value;
        const configSize = (_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Mention) === null || _b === void 0 ? void 0 : _b.size;
        if (configSize) return configSize;
        return 'medium';
      }
    });
    const inputInstRef = ref(null);
    const cursorRef = ref(null);
    const followerRef = ref(null);
    const wrapperElRef = ref(null);
    const partialPatternRef = ref('');
    let cachedPrefix = null;
    // cached pattern end is for partial pattern
    // for example @abc|def
    // end is after `c`
    let cachedPartialPatternStart = null;
    let cachedPartialPatternEnd = null;
    const filteredOptionsRef = computed(() => {
      const {
        value: pattern
      } = partialPatternRef;
      return props.options.filter(option => props.filter(pattern, option));
    });
    const treeMateRef = computed(() => {
      return createTreeMate(filteredOptionsRef.value, {
        getKey: v => {
          return v.value;
        }
      });
    });
    const selectMenuInstRef = ref(null);
    const showMenuRef = ref(false);
    const uncontrolledValueRef = ref(props.defaultValue);
    const controlledValueRef = toRef(props, 'value');
    const mergedValueRef = useMergedState(controlledValueRef, uncontrolledValueRef);
    const cssVarsRef = computed(() => {
      const {
        self: {
          menuBoxShadow
        }
      } = themeRef.value;
      return {
        '--n-menu-box-shadow': menuBoxShadow
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('mention', undefined, cssVarsRef, props) : undefined;
    function doUpdateShowMenu(show) {
      if (props.disabled) return;
      const {
        onUpdateShow,
        'onUpdate:show': _onUpdateShow
      } = props;
      if (onUpdateShow) call(onUpdateShow, show);
      if (_onUpdateShow) call(_onUpdateShow, show);
      if (!show) {
        cachedPrefix = null;
        cachedPartialPatternStart = null;
        cachedPartialPatternEnd = null;
      }
      showMenuRef.value = show;
    }
    function doUpdateValue(value) {
      const {
        onUpdateValue,
        'onUpdate:value': _onUpdateValue
      } = props;
      const {
        nTriggerFormChange,
        nTriggerFormInput
      } = formItem;
      if (_onUpdateValue) {
        call(_onUpdateValue, value);
      }
      if (onUpdateValue) {
        call(onUpdateValue, value);
      }
      nTriggerFormInput();
      nTriggerFormChange();
      uncontrolledValueRef.value = value;
    }
    function getInputEl() {
      return props.type === 'text' ? inputInstRef.value.inputElRef : inputInstRef.value.textareaElRef;
    }
    function deriveShowMenu() {
      var _a;
      const inputEl = getInputEl();
      if (document.activeElement !== inputEl) {
        doUpdateShowMenu(false);
        return;
      }
      const {
        selectionEnd
      } = inputEl;
      if (selectionEnd === null) {
        doUpdateShowMenu(false);
        return;
      }
      const inputValue = inputEl.value;
      const {
        separator
      } = props;
      const {
        prefix
      } = props;
      const prefixArray = typeof prefix === 'string' ? [prefix] : prefix;
      for (let i = selectionEnd - 1; i >= 0; --i) {
        const char = inputValue[i];
        if (char === separator || char === '\n' || char === '\r') {
          doUpdateShowMenu(false);
          return;
        }
        if (prefixArray.includes(char)) {
          const partialPattern = inputValue.slice(i + 1, selectionEnd);
          doUpdateShowMenu(true);
          (_a = props.onSearch) === null || _a === void 0 ? void 0 : _a.call(props, partialPattern, char);
          partialPatternRef.value = partialPattern;
          cachedPrefix = char;
          cachedPartialPatternStart = i + 1;
          cachedPartialPatternEnd = selectionEnd;
          return;
        }
      }
      doUpdateShowMenu(false);
    }
    function syncCursor() {
      const {
        value: cursorAnchor
      } = cursorRef;
      if (!cursorAnchor) return;
      const inputEl = getInputEl();
      const cursorPos = getRelativePosition(inputEl);
      const inputRect = inputEl.getBoundingClientRect();
      const wrapperRect = wrapperElRef.value.getBoundingClientRect();
      cursorAnchor.style.left = `${cursorPos.left + inputRect.left - wrapperRect.left}px`;
      cursorAnchor.style.top = `${cursorPos.top + inputRect.top - wrapperRect.top}px`;
      cursorAnchor.style.height = `${cursorPos.height}px`;
    }
    function syncPosition() {
      var _a;
      if (!showMenuRef.value) return;
      (_a = followerRef.value) === null || _a === void 0 ? void 0 : _a.syncPosition();
    }
    function handleInputUpdateValue(value) {
      doUpdateValue(value);
      // Vue update is mirco task.
      // So DOM must have been done when sync start in marco task.
      // I can't use nextTick(), Chrome doesn't update scrollLeft of INPUT
      // element is immediatelly updated. The behavior is wired but that's what
      // happens.
      syncAfterCursorMove();
    }
    function syncAfterCursorMove() {
      setTimeout(() => {
        syncCursor();
        deriveShowMenu();
        void nextTick().then(syncPosition);
      }, 0);
    }
    function handleInputKeyDown(e) {
      var _a, _b;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        if ((_a = inputInstRef.value) === null || _a === void 0 ? void 0 : _a.isCompositing) return;
        syncAfterCursorMove();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Enter') {
        if ((_b = inputInstRef.value) === null || _b === void 0 ? void 0 : _b.isCompositing) return;
        const {
          value: selectMenuInst
        } = selectMenuInstRef;
        if (showMenuRef.value) {
          if (selectMenuInst) {
            e.preventDefault();
            if (e.key === 'ArrowUp') {
              selectMenuInst.prev();
            } else if (e.key === 'ArrowDown') {
              selectMenuInst.next();
            } else {
              // Enter
              const pendingOptionTmNode = selectMenuInst.getPendingTmNode();
              if (pendingOptionTmNode) {
                handleSelect(pendingOptionTmNode);
              } else {
                doUpdateShowMenu(false);
              }
            }
          }
        } else {
          syncAfterCursorMove();
        }
      }
    }
    function handleInputFocus(e) {
      const {
        onFocus
      } = props;
      onFocus === null || onFocus === void 0 ? void 0 : onFocus(e);
      const {
        nTriggerFormFocus
      } = formItem;
      nTriggerFormFocus();
      syncAfterCursorMove();
    }
    function focus() {
      var _a;
      (_a = inputInstRef.value) === null || _a === void 0 ? void 0 : _a.focus();
    }
    function blur() {
      var _a;
      (_a = inputInstRef.value) === null || _a === void 0 ? void 0 : _a.blur();
    }
    function handleInputBlur(e) {
      const {
        onBlur
      } = props;
      onBlur === null || onBlur === void 0 ? void 0 : onBlur(e);
      const {
        nTriggerFormBlur
      } = formItem;
      nTriggerFormBlur();
      doUpdateShowMenu(false);
    }
    function handleSelect(tmNode) {
      var _a;
      if (cachedPrefix === null || cachedPartialPatternStart === null || cachedPartialPatternEnd === null) {
        if (process.env.NODE_ENV !== 'production') {
          warn('mention', 'Cache works unexpectly, this is probably a bug. Please create an issue.');
        }
        return;
      }
      const {
        rawNode: {
          value = ''
        }
      } = tmNode;
      const inputEl = getInputEl();
      const inputValue = inputEl.value;
      const {
        separator
      } = props;
      const nextEndPart = inputValue.slice(cachedPartialPatternEnd);
      const alreadySeparated = nextEndPart.startsWith(separator);
      const nextMiddlePart = `${value}${alreadySeparated ? '' : separator}`;
      doUpdateValue(inputValue.slice(0, cachedPartialPatternStart) + nextMiddlePart + nextEndPart);
      (_a = props.onSelect) === null || _a === void 0 ? void 0 : _a.call(props, tmNode.rawNode, cachedPrefix);
      const nextSelectionEnd = cachedPartialPatternStart + nextMiddlePart.length + (alreadySeparated ? 1 : 0);
      void nextTick().then(() => {
        // input value is updated
        inputEl.selectionStart = nextSelectionEnd;
        inputEl.selectionEnd = nextSelectionEnd;
        deriveShowMenu();
      });
    }
    function handleInputMouseDown() {
      if (!props.disabled) {
        syncAfterCursorMove();
      }
    }
    return {
      namespace: namespaceRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedBordered: mergedBorderedRef,
      mergedSize: formItem.mergedSizeRef,
      mergedStatus: formItem.mergedStatusRef,
      mergedTheme: themeRef,
      treeMate: treeMateRef,
      selectMenuInstRef,
      inputInstRef,
      cursorRef,
      followerRef,
      wrapperElRef,
      showMenu: showMenuRef,
      adjustedTo: useAdjustedTo(props),
      isMounted: useIsMounted(),
      mergedValue: mergedValueRef,
      handleInputFocus,
      handleInputBlur,
      handleInputUpdateValue,
      handleInputKeyDown,
      handleSelect,
      handleInputMouseDown,
      focus,
      blur,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    const {
      mergedTheme,
      mergedClsPrefix,
      $slots
    } = this;
    return h("div", {
      class: `${mergedClsPrefix}-mention`,
      ref: "wrapperElRef"
    }, h(NInput, {
      status: this.mergedStatus,
      themeOverrides: mergedTheme.peerOverrides.Input,
      theme: mergedTheme.peers.Input,
      size: this.mergedSize,
      autosize: this.autosize,
      type: this.type,
      ref: "inputInstRef",
      placeholder: this.placeholder,
      onMousedown: this.handleInputMouseDown,
      onUpdateValue: this.handleInputUpdateValue,
      onKeydown: this.handleInputKeyDown,
      onFocus: this.handleInputFocus,
      onBlur: this.handleInputBlur,
      bordered: this.mergedBordered,
      disabled: this.disabled,
      value: this.mergedValue
    }), h(VBinder, null, {
      default: () => [h(VTarget, null, {
        default: () => {
          const style = {
            position: 'absolute',
            width: 0
          };
          if (process.env.NODE_ENV !== 'production' && this.internalDebug) {
            style.width = '1px';
            style.background = 'red';
          }
          return h("div", {
            style: style,
            ref: "cursorRef"
          });
        }
      }), h(VFollower, {
        ref: "followerRef",
        placement: this.placement,
        show: this.showMenu,
        containerClass: this.namespace,
        to: this.adjustedTo,
        teleportDisabled: this.adjustedTo === useAdjustedTo.tdkey
      }, {
        default: () => h(Transition, {
          name: "fade-in-scale-up-transition",
          appear: this.isMounted
        }, {
          default: () => {
            const {
              mergedTheme,
              onRender
            } = this;
            onRender === null || onRender === void 0 ? void 0 : onRender();
            return this.showMenu ? h(NInternalSelectMenu, {
              clsPrefix: mergedClsPrefix,
              theme: mergedTheme.peers.InternalSelectMenu,
              themeOverrides: mergedTheme.peerOverrides.InternalSelectMenu,
              autoPending: true,
              ref: "selectMenuInstRef",
              class: [`${mergedClsPrefix}-mention-menu`, this.themeClass],
              loading: this.loading,
              treeMate: this.treeMate,
              virtualScroll: false,
              style: this.cssVars,
              onToggle: this.handleSelect,
              renderLabel: this.renderLabel,
              scrollbarProps: this.scrollbarProps
            }, $slots) : null;
          }
        })
      })]
    }));
  }
});