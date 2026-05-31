import { happensIn } from 'seemly';
import { useMemo } from 'vooks';
import { computed, defineComponent, h, inject, Transition } from 'vue';
import { NBaseIcon, NBaseLoading } from "../../_internal/index.mjs";
import { CheckmarkIcon, ChevronRightIcon } from "../../_internal/icons/index.mjs";
import { NCheckbox } from "../../checkbox/index.mjs";
import { cascaderInjectionKey } from "./interface.mjs";
export default defineComponent({
  name: 'NCascaderOption',
  props: {
    tmNode: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const {
      expandTriggerRef,
      remoteRef,
      multipleRef,
      mergedValueRef,
      checkedKeysRef,
      indeterminateKeysRef,
      hoverKeyPathRef,
      keyboardKeyRef,
      loadingKeySetRef,
      cascadeRef,
      mergedCheckStrategyRef,
      onLoadRef,
      mergedClsPrefixRef,
      mergedThemeRef,
      labelFieldRef,
      showCheckboxRef,
      renderPrefixRef,
      renderSuffixRef,
      spinPropsRef,
      updateHoverKey,
      updateKeyboardKey,
      addLoadingKey,
      deleteLoadingKey,
      closeMenu,
      doCheck,
      doUncheck,
      renderLabelRef
    } = inject(cascaderInjectionKey);
    const valueRef = computed(() => props.tmNode.key);
    const useHoverTriggerRef = computed(() => {
      const {
        value: expandTrigger
      } = expandTriggerRef;
      const {
        value: remote
      } = remoteRef;
      return !remote && expandTrigger === 'hover';
    });
    const mergedHandleMouseEnterRef = computed(() => {
      if (useHoverTriggerRef.value) {
        return handleMouseEnter;
      }
      return undefined;
    });
    const mergedHandleMouseMoveRef = computed(() => {
      if (useHoverTriggerRef.value) {
        return handleMouseMove;
      }
      return undefined;
    });
    const checkedRef = useMemo(() => {
      const {
        value: multiple
      } = multipleRef;
      if (!multiple) return mergedValueRef.value === valueRef.value;
      return checkedKeysRef.value.includes(valueRef.value);
    });
    const indeterminateRef = useMemo(() => {
      if (!multipleRef.value) return false;
      return indeterminateKeysRef.value.includes(valueRef.value);
    });
    const hoverPendingRef = useMemo(() => {
      return hoverKeyPathRef.value.includes(valueRef.value);
    });
    const keyboardPendingRef = useMemo(() => {
      const {
        value: keyboardKey
      } = keyboardKeyRef;
      if (keyboardKey === null) return false;
      return keyboardKey === valueRef.value;
    });
    const isLoadingRef = useMemo(() => {
      if (remoteRef.value) {
        return loadingKeySetRef.value.has(valueRef.value);
      }
      return false;
    });
    const isLeafRef = computed(() => props.tmNode.isLeaf);
    const disabledRef = computed(() => props.tmNode.disabled);
    const labelRef = computed(() => props.tmNode.rawNode[labelFieldRef.value]);
    const isShallowLoadedRef = computed(() => {
      return props.tmNode.shallowLoaded;
    });
    function handleClick(e) {
      if (disabledRef.value) return;
      const {
        value: remote
      } = remoteRef;
      const {
        value: loadingKeySet
      } = loadingKeySetRef;
      const {
        value: onLoad
      } = onLoadRef;
      const {
        value
      } = valueRef;
      const {
        value: isLeaf
      } = isLeafRef;
      const {
        value: isShallowLoaded
      } = isShallowLoadedRef;
      if (!happensIn(e, 'checkbox')) {
        if (remote && !isShallowLoaded && !loadingKeySet.has(value) && onLoad) {
          addLoadingKey(value);
          onLoad(props.tmNode.rawNode).then(() => {
            deleteLoadingKey(value);
          }).catch(() => {
            deleteLoadingKey(value);
          });
        }
        updateHoverKey(value);
        updateKeyboardKey(value);
      }
      if (isLeaf) {
        toggleCheckbox();
      }
    }
    function handleMouseEnter() {
      if (!useHoverTriggerRef.value || disabledRef.value) return;
      const {
        value
      } = valueRef;
      updateHoverKey(value);
      updateKeyboardKey(value);
    }
    function handleMouseMove() {
      if (!useHoverTriggerRef.value) return;
      handleMouseEnter();
    }
    function handleCheckboxUpdateValue() {
      const {
        value: isLeaf
      } = isLeafRef;
      if (!isLeaf) toggleCheckbox();
    }
    function toggleCheckbox() {
      const {
        value: multiple
      } = multipleRef;
      const {
        value
      } = valueRef;
      if (multiple) {
        if (indeterminateRef.value || checkedRef.value) {
          doUncheck(value);
        } else {
          doCheck(value);
        }
      } else {
        doCheck(value);
        closeMenu(true);
      }
    }
    return {
      checkStrategy: mergedCheckStrategyRef,
      multiple: multipleRef,
      cascade: cascadeRef,
      checked: checkedRef,
      indeterminate: indeterminateRef,
      hoverPending: hoverPendingRef,
      keyboardPending: keyboardPendingRef,
      isLoading: isLoadingRef,
      showCheckbox: showCheckboxRef,
      isLeaf: isLeafRef,
      disabled: disabledRef,
      label: labelRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: mergedThemeRef,
      spinProps: spinPropsRef,
      handleClick,
      handleCheckboxUpdateValue,
      mergedHandleMouseEnter: mergedHandleMouseEnterRef,
      mergedHandleMouseMove: mergedHandleMouseMoveRef,
      renderLabel: renderLabelRef,
      renderPrefix: renderPrefixRef,
      renderSuffix: renderSuffixRef
    };
  },
  render() {
    const {
      mergedClsPrefix,
      showCheckbox,
      renderLabel,
      renderPrefix,
      renderSuffix
    } = this;
    let prefixNode = null;
    if (showCheckbox || renderPrefix) {
      const originalNode = this.showCheckbox ? h(NCheckbox, {
        focusable: false,
        "data-checkbox": true,
        disabled: this.disabled,
        checked: this.checked,
        indeterminate: this.indeterminate,
        theme: this.mergedTheme.peers.Checkbox,
        themeOverrides: this.mergedTheme.peerOverrides.Checkbox,
        onUpdateChecked: this.handleCheckboxUpdateValue
      }) : null;
      prefixNode = h("div", {
        class: `${mergedClsPrefix}-cascader-option__prefix`
      }, renderPrefix ? renderPrefix({
        option: this.tmNode.rawNode,
        checked: this.checked,
        node: originalNode
      }) : originalNode);
    }
    let suffixNode = null;
    const originalSuffixChild = h("div", {
      class: `${mergedClsPrefix}-cascader-option-icon-placeholder`
    }, !this.isLeaf ? h(NBaseLoading, Object.assign({
      clsPrefix: mergedClsPrefix,
      scale: 0.85,
      strokeWidth: 24,
      show: this.isLoading,
      class: `${mergedClsPrefix}-cascader-option-icon`
    }, this.spinProps), {
      default: () => h(NBaseIcon, {
        clsPrefix: mergedClsPrefix,
        key: "arrow",
        class: `${mergedClsPrefix}-cascader-option-icon ${mergedClsPrefix}-cascader-option-icon--arrow`
      }, {
        default: () => h(ChevronRightIcon, null)
      })
    }) : this.checkStrategy === 'child' && !(this.multiple && this.cascade) ? h(Transition, {
      name: "fade-in-scale-up-transition"
    }, {
      default: () => this.checked ? h(NBaseIcon, {
        clsPrefix: mergedClsPrefix,
        class: `${mergedClsPrefix}-cascader-option-icon ${mergedClsPrefix}-cascader-option-icon--checkmark`
      }, {
        default: () => h(CheckmarkIcon, null)
      }) : null
    }) : null);
    suffixNode = h("div", {
      class: `${mergedClsPrefix}-cascader-option__suffix`
    }, renderSuffix ? renderSuffix({
      option: this.tmNode.rawNode,
      checked: this.checked,
      node: originalSuffixChild
    }) : originalSuffixChild);
    return h("div", {
      class: [`${mergedClsPrefix}-cascader-option`, this.keyboardPending || this.hoverPending && `${mergedClsPrefix}-cascader-option--pending`, this.disabled && `${mergedClsPrefix}-cascader-option--disabled`, this.showCheckbox && `${mergedClsPrefix}-cascader-option--show-prefix`],
      onMouseenter: this.mergedHandleMouseEnter,
      onMousemove: this.mergedHandleMouseMove,
      onClick: this.handleClick
    }, prefixNode, h("span", {
      class: `${mergedClsPrefix}-cascader-option__label`
    }, renderLabel ? renderLabel(this.tmNode.rawNode, this.checked) : this.label), suffixNode);
  }
});