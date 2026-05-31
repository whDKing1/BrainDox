import { changeColor, depx, getPreciseEventTarget, happensIn } from 'seemly';
import { createTreeMate, SubtreeNotLoadedError } from 'treemate';
import { useIsMounted, useMergedState } from 'vooks';
import { computed, defineComponent, h, isReactive, nextTick, provide, ref, toRef, watch, watchEffect } from 'vue';
import { VBinder, VFollower, VTarget } from 'vueuc';
import { NInternalSelection } from "../../_internal/index.mjs";
import { useConfig, useFormItem, useLocale, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { call, markEventEffectPerformed, useAdjustedTo, warnOnce } from "../../_utils/index.mjs";
import { cascaderLight } from "../styles/index.mjs";
import CascaderMenu from "./CascaderMenu.mjs";
import CascaderSelectMenu from "./CascaderSelectMenu.mjs";
import { cascaderInjectionKey } from "./interface.mjs";
import style from "./styles/index.cssr.mjs";
import { getPathLabel, getRawNodePath } from "./utils.mjs";
export const cascaderProps = Object.assign(Object.assign({}, useTheme.props), {
  allowCheckingNotLoaded: Boolean,
  to: useAdjustedTo.propTo,
  bordered: {
    type: Boolean,
    default: undefined
  },
  options: {
    type: Array,
    default: () => []
  },
  value: [String, Number, Array],
  defaultValue: {
    type: [String, Number, Array],
    default: null
  },
  placeholder: String,
  multiple: Boolean,
  size: String,
  filterable: Boolean,
  disabled: {
    type: Boolean,
    default: undefined
  },
  disabledField: {
    type: String,
    default: 'disabled'
  },
  expandTrigger: {
    type: String,
    default: 'click'
  },
  clearable: Boolean,
  clearFilterAfterSelect: {
    type: Boolean,
    default: true
  },
  remote: Boolean,
  onLoad: Function,
  separator: {
    type: String,
    default: ' / '
  },
  filter: Function,
  placement: {
    type: String,
    default: 'bottom-start'
  },
  cascade: {
    type: Boolean,
    default: true
  },
  leafOnly: Boolean,
  showPath: {
    type: Boolean,
    default: true
  },
  show: {
    type: Boolean,
    default: undefined
  },
  maxTagCount: [String, Number],
  ellipsisTagPopoverProps: Object,
  menuProps: Object,
  filterMenuProps: Object,
  virtualScroll: {
    type: Boolean,
    default: true
  },
  checkStrategy: {
    type: String,
    default: 'all'
  },
  valueField: {
    type: String,
    default: 'value'
  },
  labelField: {
    type: String,
    default: 'label'
  },
  childrenField: {
    type: String,
    default: 'children'
  },
  renderLabel: Function,
  status: String,
  'onUpdate:value': [Function, Array],
  onUpdateValue: [Function, Array],
  'onUpdate:show': [Function, Array],
  onUpdateShow: [Function, Array],
  onBlur: Function,
  onFocus: Function,
  getColumnStyle: Function,
  spinProps: Object,
  renderPrefix: Function,
  renderSuffix: Function,
  scrollbarProps: Object,
  // deprecated
  onChange: [Function, Array]
});
export default defineComponent({
  name: 'Cascader',
  props: cascaderProps,
  slots: Object,
  setup(props, {
    slots
  }) {
    if (process.env.NODE_ENV !== 'production') {
      watchEffect(() => {
        if (props.leafOnly) {
          warnOnce('cascader', '`leaf-only` is deprecated, please use `check-strategy="child"` instead');
        }
        if (props.onChange !== undefined) {
          warnOnce('cascader', '`on-change` is deprecated, please use `on-update:value` instead.');
        }
      });
    }
    const {
      mergedBorderedRef,
      mergedClsPrefixRef,
      namespaceRef,
      inlineThemeDisabled,
      mergedComponentPropsRef
    } = useConfig(props);
    const themeRef = useTheme('Cascader', '-cascader', style, cascaderLight, props, mergedClsPrefixRef);
    const {
      localeRef
    } = useLocale('Cascader');
    const uncontrolledValueRef = ref(props.defaultValue);
    const controlledValueRef = computed(() => props.value);
    const mergedValueRef = useMergedState(controlledValueRef, uncontrolledValueRef);
    const mergedCheckStrategyRef = computed(() => {
      return props.leafOnly ? 'child' : props.checkStrategy;
    });
    const patternRef = ref('');
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
        const configSize = (_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Cascader) === null || _b === void 0 ? void 0 : _b.size;
        if (configSize) return configSize;
        return 'medium';
      }
    });
    const {
      mergedSizeRef,
      mergedDisabledRef,
      mergedStatusRef
    } = formItem;
    const cascaderMenuInstRef = ref(null);
    const selectMenuInstRef = ref(null);
    const triggerInstRef = ref(null);
    const keyboardKeyRef = ref(null);
    const hoverKeyRef = ref(null);
    const loadingKeySetRef = ref(new Set());
    const selectMenuFollowerRef = ref(null);
    const cascaderMenuFollowerRef = ref(null);
    const adjustedToRef = useAdjustedTo(props);
    const focusedRef = ref(false);
    const addLoadingKey = key => {
      loadingKeySetRef.value.add(key);
    };
    const deleteLoadingKey = key => {
      loadingKeySetRef.value.delete(key);
    };
    const treeMateRef = computed(() => {
      const {
        valueField,
        childrenField,
        disabledField
      } = props;
      return createTreeMate(props.options, {
        getDisabled(node) {
          return node[disabledField];
        },
        getKey(node) {
          return node[valueField];
        },
        getChildren(node) {
          return node[childrenField];
        }
      });
    });
    const mergedKeysRef = computed(() => {
      const {
        cascade,
        multiple
      } = props;
      if (multiple && Array.isArray(mergedValueRef.value)) {
        return treeMateRef.value.getCheckedKeys(mergedValueRef.value, {
          cascade,
          allowNotLoaded: props.allowCheckingNotLoaded
        });
      } else {
        return {
          checkedKeys: [],
          indeterminateKeys: []
        };
      }
    });
    const checkedKeysRef = computed(() => mergedKeysRef.value.checkedKeys);
    const indeterminateKeysRef = computed(() => mergedKeysRef.value.indeterminateKeys);
    const menuModelRef = computed(() => {
      const {
        treeNodePath,
        treeNode
      } = treeMateRef.value.getPath(hoverKeyRef.value);
      let ret;
      if (treeNode === null) {
        ret = [treeMateRef.value.treeNodes];
      } else {
        ret = treeNodePath.map(treeNode => treeNode.siblings);
        if (!treeNode.isLeaf && !loadingKeySetRef.value.has(treeNode.key) && treeNode.children) {
          ret.push(treeNode.children);
        }
      }
      return ret;
    });
    const hoverKeyPathRef = computed(() => {
      const {
        keyPath
      } = treeMateRef.value.getPath(hoverKeyRef.value);
      return keyPath;
    });
    const optionHeightRef = computed(() => {
      return themeRef.value.self.optionHeight;
    });
    if (isReactive(props.options)) {
      watch(props.options, (value, oldValue) => {
        if (!(value === oldValue)) {
          hoverKeyRef.value = null;
          keyboardKeyRef.value = null;
        }
      });
    }
    const uncontrolledShowRef = ref(false);
    function doUpdateShow(value) {
      const {
        onUpdateShow,
        'onUpdate:show': _onUpdateShow
      } = props;
      if (onUpdateShow) {
        call(onUpdateShow, value);
      }
      if (_onUpdateShow) {
        call(_onUpdateShow, value);
      }
      uncontrolledShowRef.value = value;
    }
    function doUpdateValue(value, option, optionPath) {
      const {
        onUpdateValue,
        'onUpdate:value': _onUpdateValue,
        onChange
      } = props;
      const {
        nTriggerFormInput,
        nTriggerFormChange
      } = formItem;
      if (onUpdateValue) {
        call(onUpdateValue, value, option, optionPath);
      }
      if (_onUpdateValue) {
        call(_onUpdateValue, value, option, optionPath);
      }
      if (onChange) {
        call(onChange, value, option, optionPath);
      }
      uncontrolledValueRef.value = value;
      nTriggerFormInput();
      nTriggerFormChange();
    }
    function updateKeyboardKey(key) {
      keyboardKeyRef.value = key;
    }
    function updateHoverKey(key) {
      hoverKeyRef.value = key;
    }
    function getOptionsByKeys(keys) {
      const {
        value: {
          getNode
        }
      } = treeMateRef;
      return keys.map(keys => {
        var _a;
        return ((_a = getNode(keys)) === null || _a === void 0 ? void 0 : _a.rawNode) || null;
      });
    }
    function doCheck(key) {
      var _a;
      const {
        cascade,
        multiple,
        filterable
      } = props;
      const {
        value: {
          check,
          getNode,
          getPath
        }
      } = treeMateRef;
      if (multiple) {
        try {
          const {
            checkedKeys
          } = check(key, mergedKeysRef.value.checkedKeys, {
            cascade,
            checkStrategy: mergedCheckStrategyRef.value,
            allowNotLoaded: props.allowCheckingNotLoaded
          });
          doUpdateValue(checkedKeys, getOptionsByKeys(checkedKeys), checkedKeys.map(checkedKey => {
            var _a;
            return getRawNodePath((_a = getPath(checkedKey)) === null || _a === void 0 ? void 0 : _a.treeNodePath);
          }));
          if (filterable) focusSelectionInput();
          keyboardKeyRef.value = key;
          hoverKeyRef.value = key;
        } catch (err) {
          if (err instanceof SubtreeNotLoadedError) {
            if (cascaderMenuInstRef.value) {
              const tmNode = getNode(key);
              if (tmNode !== null) {
                cascaderMenuInstRef.value.showErrorMessage(tmNode.rawNode[props.labelField]);
              }
            }
          } else {
            throw err;
          }
        }
      } else {
        if (mergedCheckStrategyRef.value === 'child') {
          const tmNode = getNode(key);
          if (tmNode === null || tmNode === void 0 ? void 0 : tmNode.isLeaf) {
            doUpdateValue(key, tmNode.rawNode, getRawNodePath(getPath(key).treeNodePath));
          } else {
            return false;
          }
        } else {
          const tmNode = getNode(key);
          doUpdateValue(key, (tmNode === null || tmNode === void 0 ? void 0 : tmNode.rawNode) || null, getRawNodePath((_a = getPath(key)) === null || _a === void 0 ? void 0 : _a.treeNodePath));
        }
      }
      return true;
    }
    function doUncheck(key) {
      const {
        cascade,
        multiple
      } = props;
      if (multiple) {
        const {
          value: {
            uncheck,
            getNode,
            getPath
          }
        } = treeMateRef;
        const {
          checkedKeys
        } = uncheck(key, mergedKeysRef.value.checkedKeys, {
          cascade,
          checkStrategy: mergedCheckStrategyRef.value,
          allowNotLoaded: props.allowCheckingNotLoaded
        });
        doUpdateValue(checkedKeys, checkedKeys.map(checkedKey => {
          var _a;
          return ((_a = getNode(checkedKey)) === null || _a === void 0 ? void 0 : _a.rawNode) || null;
        }), checkedKeys.map(checkedKey => {
          var _a;
          return getRawNodePath((_a = getPath(checkedKey)) === null || _a === void 0 ? void 0 : _a.treeNodePath);
        }));
        keyboardKeyRef.value = key;
        hoverKeyRef.value = key;
      }
    }
    const selectedOptionsRef = computed(() => {
      if (props.multiple) {
        const {
          showPath,
          separator,
          labelField,
          cascade
        } = props;
        const {
          getCheckedKeys,
          getNode
        } = treeMateRef.value;
        const value = getCheckedKeys(checkedKeysRef.value, {
          cascade,
          checkStrategy: mergedCheckStrategyRef.value,
          allowNotLoaded: props.allowCheckingNotLoaded
        }).checkedKeys;
        return value.map(key => {
          const node = getNode(key);
          if (node === null) {
            return {
              label: String(key),
              value: key
            };
          } else {
            return {
              label: showPath ? getPathLabel(node, separator, labelField) : node.rawNode[labelField],
              value: node.key
            };
          }
        });
      } else {
        return [];
      }
    });
    const selectedOptionRef = computed(() => {
      const {
        multiple,
        showPath,
        separator,
        labelField
      } = props;
      const {
        value
      } = mergedValueRef;
      if (!multiple && !Array.isArray(value)) {
        const {
          getNode
        } = treeMateRef.value;
        if (value === null) {
          return null;
        }
        const node = getNode(value);
        if (node === null) {
          return {
            label: String(value),
            value
          };
        } else {
          return {
            label: showPath ? getPathLabel(node, separator, labelField) : node.rawNode[labelField],
            value: node.key
          };
        }
      } else {
        return null;
      }
    });
    const controlledShowRef = toRef(props, 'show');
    const mergedShowRef = useMergedState(controlledShowRef, uncontrolledShowRef);
    const localizedPlaceholderRef = computed(() => {
      const {
        placeholder
      } = props;
      if (placeholder !== undefined) return placeholder;
      return localeRef.value.placeholder;
    });
    // select option related
    const showSelectMenuRef = computed(() => {
      return !!(props.filterable && patternRef.value);
    });
    // init hover key
    watch(mergedShowRef, show => {
      if (!show) return;
      if (props.multiple) return;
      const {
        value
      } = mergedValueRef;
      if (!Array.isArray(value) && value !== null) {
        keyboardKeyRef.value = value;
        hoverKeyRef.value = value;
        void nextTick(() => {
          var _a;
          if (!mergedShowRef.value) return;
          const {
            value: hoverKey
          } = hoverKeyRef;
          if (mergedValueRef.value !== null) {
            const node = treeMateRef.value.getNode(hoverKey);
            if (node) {
              (_a = cascaderMenuInstRef.value) === null || _a === void 0 ? void 0 : _a.scroll(node.level, node.index, depx(optionHeightRef.value));
            }
          }
        });
      } else {
        keyboardKeyRef.value = null;
        hoverKeyRef.value = null;
      }
    }, {
      immediate: true
    });
    // --- methods
    function doBlur(e) {
      const {
        onBlur
      } = props;
      const {
        nTriggerFormBlur
      } = formItem;
      if (onBlur) call(onBlur, e);
      nTriggerFormBlur();
    }
    function doFocus(e) {
      const {
        onFocus
      } = props;
      const {
        nTriggerFormFocus
      } = formItem;
      if (onFocus) call(onFocus, e);
      nTriggerFormFocus();
    }
    function focusSelectionInput() {
      var _a;
      (_a = triggerInstRef.value) === null || _a === void 0 ? void 0 : _a.focusInput();
    }
    function focusSelection() {
      var _a;
      (_a = triggerInstRef.value) === null || _a === void 0 ? void 0 : _a.focus();
    }
    function openMenu() {
      if (!mergedDisabledRef.value) {
        patternRef.value = '';
        doUpdateShow(true);
        if (props.filterable) {
          focusSelectionInput();
        }
      }
    }
    function closeMenu(returnFocus = false) {
      if (returnFocus) {
        focusSelection();
      }
      doUpdateShow(false);
      patternRef.value = '';
    }
    function handleCascaderMenuClickOutside(e) {
      var _a;
      if (showSelectMenuRef.value) return;
      if (mergedShowRef.value) {
        if (!((_a = triggerInstRef.value) === null || _a === void 0 ? void 0 : _a.$el.contains(getPreciseEventTarget(e)))) {
          closeMenu();
        }
      }
    }
    function handleSelectMenuClickOutside(e) {
      if (!showSelectMenuRef.value) return;
      handleCascaderMenuClickOutside(e);
    }
    function clearPattern() {
      if (props.clearFilterAfterSelect) patternRef.value = '';
    }
    // --- keyboard
    function move(direction) {
      var _a, _b, _c;
      const {
        value: keyboardKey
      } = keyboardKeyRef;
      const {
        value: treeMate
      } = treeMateRef;
      switch (direction) {
        case 'prev':
          if (keyboardKey !== null) {
            const node = treeMate.getPrev(keyboardKey, {
              loop: true
            });
            if (node !== null) {
              updateKeyboardKey(node.key);
              (_a = cascaderMenuInstRef.value) === null || _a === void 0 ? void 0 : _a.scroll(node.level, node.index, depx(optionHeightRef.value));
            }
          }
          break;
        case 'next':
          if (keyboardKey === null) {
            const node = treeMate.getFirstAvailableNode();
            if (node !== null) {
              updateKeyboardKey(node.key);
              (_b = cascaderMenuInstRef.value) === null || _b === void 0 ? void 0 : _b.scroll(node.level, node.index, depx(optionHeightRef.value));
            }
          } else {
            const node = treeMate.getNext(keyboardKey, {
              loop: true
            });
            if (node !== null) {
              updateKeyboardKey(node.key);
              (_c = cascaderMenuInstRef.value) === null || _c === void 0 ? void 0 : _c.scroll(node.level, node.index, depx(optionHeightRef.value));
            }
          }
          break;
        case 'child':
          if (keyboardKey !== null) {
            const currentNode = treeMate.getNode(keyboardKey);
            if (currentNode !== null) {
              if (currentNode.shallowLoaded) {
                const node = treeMate.getChild(keyboardKey);
                if (node !== null) {
                  updateHoverKey(keyboardKey);
                  updateKeyboardKey(node.key);
                }
              } else {
                const {
                  value: loadingKeySet
                } = loadingKeySetRef;
                if (!loadingKeySet.has(keyboardKey)) {
                  addLoadingKey(keyboardKey);
                  updateHoverKey(keyboardKey);
                  const {
                    onLoad
                  } = props;
                  if (onLoad) {
                    onLoad(currentNode.rawNode).then(() => {
                      deleteLoadingKey(keyboardKey);
                    }).catch(() => {
                      deleteLoadingKey(keyboardKey);
                    });
                  }
                }
              }
            }
          }
          break;
        case 'parent':
          if (keyboardKey !== null) {
            const node = treeMate.getParent(keyboardKey);
            if (node !== null) {
              updateKeyboardKey(node.key);
              const parentNode = node.getParent();
              if (parentNode === null) {
                updateHoverKey(null);
              } else {
                updateHoverKey(parentNode.key);
              }
            }
          }
          break;
      }
    }
    function handleKeydown(e) {
      var _a, _b;
      switch (e.key) {
        case ' ':
        case 'ArrowDown':
        case 'ArrowUp':
          if (props.filterable && mergedShowRef.value) {
            break;
          }
          e.preventDefault();
          break;
      }
      if (happensIn(e, 'action')) return;
      switch (e.key) {
        case ' ':
          if (props.filterable) return;
        // eslint-disable-next-line no-fallthrough
        case 'Enter':
          if (!mergedShowRef.value) {
            openMenu();
          } else {
            const {
              value: showSelectMenu
            } = showSelectMenuRef;
            const {
              value: keyboardKey
            } = keyboardKeyRef;
            if (!showSelectMenu) {
              if (keyboardKey !== null) {
                if (checkedKeysRef.value.includes(keyboardKey) || indeterminateKeysRef.value.includes(keyboardKey)) {
                  doUncheck(keyboardKey);
                } else {
                  const checkIsValid = doCheck(keyboardKey);
                  if (!props.multiple && checkIsValid) {
                    closeMenu(true);
                  }
                }
              }
            } else {
              if (selectMenuInstRef.value) {
                const hasCorrespondingOption = selectMenuInstRef.value.enter();
                if (hasCorrespondingOption) clearPattern();
              }
            }
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (mergedShowRef.value) {
            if (showSelectMenuRef.value) {
              (_a = selectMenuInstRef.value) === null || _a === void 0 ? void 0 : _a.prev();
            } else {
              move('prev');
            }
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (mergedShowRef.value) {
            if (showSelectMenuRef.value) {
              (_b = selectMenuInstRef.value) === null || _b === void 0 ? void 0 : _b.next();
            } else {
              move('next');
            }
          } else {
            openMenu();
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (mergedShowRef.value && !showSelectMenuRef.value) {
            move('parent');
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (mergedShowRef.value && !showSelectMenuRef.value) {
            move('child');
          }
          break;
        case 'Escape':
          if (mergedShowRef.value) {
            markEventEffectPerformed(e);
            closeMenu(true);
          }
      }
    }
    function handleMenuKeydown(e) {
      handleKeydown(e);
    }
    // --- search
    function handleClear(e) {
      e.stopPropagation();
      if (props.multiple) {
        doUpdateValue([], [], []);
      } else {
        doUpdateValue(null, null, null);
      }
    }
    function handleTriggerFocus(e) {
      var _a;
      if (!((_a = cascaderMenuInstRef.value) === null || _a === void 0 ? void 0 : _a.$el.contains(e.relatedTarget))) {
        focusedRef.value = true;
        doFocus(e);
      }
    }
    function handleTriggerBlur(e) {
      var _a;
      if (!((_a = cascaderMenuInstRef.value) === null || _a === void 0 ? void 0 : _a.$el.contains(e.relatedTarget))) {
        focusedRef.value = false;
        doBlur(e);
        closeMenu();
      }
    }
    function handleMenuFocus(e) {
      var _a;
      if (!((_a = triggerInstRef.value) === null || _a === void 0 ? void 0 : _a.$el.contains(e.relatedTarget))) {
        focusedRef.value = true;
        doFocus(e);
      }
    }
    function handleMenuBlur(e) {
      var _a;
      if (!((_a = triggerInstRef.value) === null || _a === void 0 ? void 0 : _a.$el.contains(e.relatedTarget))) {
        focusedRef.value = false;
        doBlur(e);
      }
    }
    function handleMenuMousedown(e) {
      if (!happensIn(e, 'action')) {
        if (props.multiple && props.filter) {
          e.preventDefault();
          focusSelectionInput();
        }
      }
    }
    function handleMenuTabout() {
      closeMenu(true);
    }
    function handleTriggerClick() {
      if (props.filterable) {
        openMenu();
      } else {
        if (mergedShowRef.value) {
          closeMenu(true);
        } else {
          openMenu();
        }
      }
    }
    function handlePatternInput(e) {
      patternRef.value = e.target.value;
    }
    function handleDeleteOption(option) {
      const {
        multiple
      } = props;
      const {
        value: mergedValue
      } = mergedValueRef;
      if (multiple && Array.isArray(mergedValue) && option.value !== undefined) {
        doUncheck(option.value);
      } else {
        doUpdateValue(null, null, null);
      }
    }
    // sync position
    function syncSelectMenuPosition() {
      var _a;
      (_a = selectMenuFollowerRef.value) === null || _a === void 0 ? void 0 : _a.syncPosition();
    }
    function syncCascaderMenuPosition() {
      var _a;
      (_a = cascaderMenuFollowerRef.value) === null || _a === void 0 ? void 0 : _a.syncPosition();
    }
    function handleTriggerResize() {
      if (mergedShowRef.value) {
        if (showSelectMenuRef.value) {
          syncSelectMenuPosition();
        } else {
          syncCascaderMenuPosition();
        }
      }
    }
    const showCheckboxRef = computed(() => {
      if (props.multiple && props.cascade) return true;
      if (mergedCheckStrategyRef.value !== 'child') return true;
      return false;
    });
    provide(cascaderInjectionKey, {
      slots,
      mergedClsPrefixRef,
      mergedThemeRef: themeRef,
      mergedValueRef,
      checkedKeysRef,
      indeterminateKeysRef,
      hoverKeyPathRef,
      mergedCheckStrategyRef,
      showCheckboxRef,
      cascadeRef: toRef(props, 'cascade'),
      multipleRef: toRef(props, 'multiple'),
      keyboardKeyRef,
      hoverKeyRef,
      remoteRef: toRef(props, 'remote'),
      loadingKeySetRef,
      expandTriggerRef: toRef(props, 'expandTrigger'),
      isMountedRef: useIsMounted(),
      onLoadRef: toRef(props, 'onLoad'),
      virtualScrollRef: toRef(props, 'virtualScroll'),
      optionHeightRef,
      localeRef,
      labelFieldRef: toRef(props, 'labelField'),
      renderLabelRef: toRef(props, 'renderLabel'),
      getColumnStyleRef: toRef(props, 'getColumnStyle'),
      renderPrefixRef: toRef(props, 'renderPrefix'),
      renderSuffixRef: toRef(props, 'renderSuffix'),
      spinPropsRef: toRef(props, 'spinProps'),
      syncCascaderMenuPosition,
      syncSelectMenuPosition,
      updateKeyboardKey,
      updateHoverKey,
      addLoadingKey,
      deleteLoadingKey,
      doCheck,
      doUncheck,
      closeMenu,
      handleSelectMenuClickOutside,
      handleCascaderMenuClickOutside,
      scrollbarPropsRef: toRef(props, 'scrollbarProps'),
      clearPattern
    });
    const exposedMethods = {
      focus: () => {
        var _a;
        (_a = triggerInstRef.value) === null || _a === void 0 ? void 0 : _a.focus();
      },
      blur: () => {
        var _a;
        (_a = triggerInstRef.value) === null || _a === void 0 ? void 0 : _a.blur();
      },
      getCheckedData: () => {
        if (showCheckboxRef.value) {
          const checkedKeys = checkedKeysRef.value;
          return {
            keys: checkedKeys,
            options: getOptionsByKeys(checkedKeys)
          };
        }
        return {
          keys: [],
          options: []
        };
      },
      getIndeterminateData: () => {
        if (showCheckboxRef.value) {
          const indeterminateKeys = indeterminateKeysRef.value;
          return {
            keys: indeterminateKeys,
            options: getOptionsByKeys(indeterminateKeys)
          };
        }
        return {
          keys: [],
          options: []
        };
      }
    };
    const cssVarsRef = computed(() => {
      const {
        self: {
          optionArrowColor,
          optionTextColor,
          optionTextColorActive,
          optionTextColorDisabled,
          optionCheckMarkColor,
          menuColor,
          menuBoxShadow,
          menuDividerColor,
          menuBorderRadius,
          menuHeight,
          optionColorHover,
          optionHeight,
          optionFontSize,
          loadingColor,
          columnWidth
        },
        common: {
          cubicBezierEaseInOut
        }
      } = themeRef.value;
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-menu-border-radius': menuBorderRadius,
        '--n-menu-box-shadow': menuBoxShadow,
        '--n-menu-height': menuHeight,
        '--n-column-width': columnWidth,
        '--n-menu-color': menuColor,
        '--n-menu-divider-color': menuDividerColor,
        '--n-option-height': optionHeight,
        '--n-option-font-size': optionFontSize,
        '--n-option-text-color': optionTextColor,
        '--n-option-text-color-disabled': optionTextColorDisabled,
        '--n-option-text-color-active': optionTextColorActive,
        '--n-option-color-hover': optionColorHover,
        '--n-option-check-mark-color': optionCheckMarkColor,
        '--n-option-arrow-color': optionArrowColor,
        '--n-menu-mask-color': changeColor(menuColor, {
          alpha: 0.75
        }),
        '--n-loading-color': loadingColor
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('cascader', undefined, cssVarsRef, props) : undefined;
    return Object.assign(Object.assign({}, exposedMethods), {
      handleTriggerResize,
      mergedStatus: mergedStatusRef,
      selectMenuFollowerRef,
      cascaderMenuFollowerRef,
      triggerInstRef,
      selectMenuInstRef,
      cascaderMenuInstRef,
      mergedBordered: mergedBorderedRef,
      mergedClsPrefix: mergedClsPrefixRef,
      namespace: namespaceRef,
      mergedValue: mergedValueRef,
      mergedShow: mergedShowRef,
      showSelectMenu: showSelectMenuRef,
      pattern: patternRef,
      treeMate: treeMateRef,
      mergedSize: mergedSizeRef,
      mergedDisabled: mergedDisabledRef,
      localizedPlaceholder: localizedPlaceholderRef,
      selectedOption: selectedOptionRef,
      selectedOptions: selectedOptionsRef,
      adjustedTo: adjustedToRef,
      menuModel: menuModelRef,
      handleMenuTabout,
      handleMenuFocus,
      handleMenuBlur,
      handleMenuKeydown,
      handleMenuMousedown,
      handleTriggerFocus,
      handleTriggerBlur,
      handleTriggerClick,
      handleClear,
      handleDeleteOption,
      handlePatternInput,
      handleKeydown,
      focused: focusedRef,
      optionHeight: optionHeightRef,
      mergedTheme: themeRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    });
  },
  render() {
    const {
      mergedClsPrefix
    } = this;
    return h("div", {
      class: `${mergedClsPrefix}-cascader`
    }, h(VBinder, null, {
      default: () => [h(VTarget, null, {
        default: () => h(NInternalSelection, {
          onResize: this.handleTriggerResize,
          ref: "triggerInstRef",
          status: this.mergedStatus,
          clsPrefix: mergedClsPrefix,
          maxTagCount: this.maxTagCount,
          ellipsisTagPopoverProps: this.ellipsisTagPopoverProps,
          bordered: this.mergedBordered,
          size: this.mergedSize,
          theme: this.mergedTheme.peers.InternalSelection,
          themeOverrides: this.mergedTheme.peerOverrides.InternalSelection,
          active: this.mergedShow,
          pattern: this.pattern,
          placeholder: this.localizedPlaceholder,
          selectedOption: this.selectedOption,
          selectedOptions: this.selectedOptions,
          multiple: this.multiple,
          filterable: this.filterable,
          clearable: this.clearable,
          disabled: this.mergedDisabled,
          focused: this.focused,
          onFocus: this.handleTriggerFocus,
          onBlur: this.handleTriggerBlur,
          onClick: this.handleTriggerClick,
          onClear: this.handleClear,
          onDeleteOption: this.handleDeleteOption,
          onPatternInput: this.handlePatternInput,
          onKeydown: this.handleKeydown
        }, {
          arrow: () => {
            var _a, _b;
            return (_b = (_a = this.$slots).arrow) === null || _b === void 0 ? void 0 : _b.call(_a);
          }
        })
      }), h(VFollower, {
        key: "cascaderMenu",
        ref: "cascaderMenuFollowerRef",
        show: this.mergedShow && !this.showSelectMenu,
        containerClass: this.namespace,
        placement: this.placement,
        width: !this.options.length ? 'target' : undefined,
        teleportDisabled: this.adjustedTo === useAdjustedTo.tdkey,
        to: this.adjustedTo
      }, {
        default: () => {
          var _a;
          (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
          const {
            menuProps
          } = this;
          return h(CascaderMenu, Object.assign({}, menuProps, {
            ref: "cascaderMenuInstRef",
            class: [this.themeClass, menuProps === null || menuProps === void 0 ? void 0 : menuProps.class],
            value: this.mergedValue,
            show: this.mergedShow && !this.showSelectMenu,
            menuModel: this.menuModel,
            style: [this.cssVars, menuProps === null || menuProps === void 0 ? void 0 : menuProps.style],
            onFocus: this.handleMenuFocus,
            onBlur: this.handleMenuBlur,
            onKeydown: this.handleMenuKeydown,
            onMousedown: this.handleMenuMousedown,
            onTabout: this.handleMenuTabout
          }), {
            action: () => {
              var _a, _b;
              return (_b = (_a = this.$slots).action) === null || _b === void 0 ? void 0 : _b.call(_a);
            },
            empty: () => {
              var _a, _b;
              return (_b = (_a = this.$slots).empty) === null || _b === void 0 ? void 0 : _b.call(_a);
            }
          });
        }
      }), h(VFollower, {
        key: "selectMenu",
        ref: "selectMenuFollowerRef",
        show: this.mergedShow && this.showSelectMenu,
        containerClass: this.namespace,
        width: "target",
        placement: this.placement,
        to: this.adjustedTo,
        teleportDisabled: this.adjustedTo === useAdjustedTo.tdkey
      }, {
        default: () => {
          var _a;
          (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
          const {
            filterMenuProps
          } = this;
          return h(CascaderSelectMenu, Object.assign({}, filterMenuProps, {
            ref: "selectMenuInstRef",
            class: [this.themeClass, filterMenuProps === null || filterMenuProps === void 0 ? void 0 : filterMenuProps.class],
            value: this.mergedValue,
            show: this.mergedShow && this.showSelectMenu,
            pattern: this.pattern,
            multiple: this.multiple,
            tmNodes: this.treeMate.treeNodes,
            filter: this.filter,
            labelField: this.labelField,
            separator: this.separator,
            style: [this.cssVars, filterMenuProps === null || filterMenuProps === void 0 ? void 0 : filterMenuProps.style]
          }));
        }
      })]
    }));
  }
});