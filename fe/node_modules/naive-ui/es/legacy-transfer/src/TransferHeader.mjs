import { computed, defineComponent, h, inject } from 'vue';
import { NCheckbox } from "../../checkbox/index.mjs";
import { transferInjectionKey } from "./interface.mjs";
export default defineComponent({
  name: 'TransferHeader',
  props: {
    source: {
      type: Boolean,
      default: false
    },
    onChange: {
      type: Function,
      required: true
    },
    title: String
  },
  setup(props) {
    const {
      srcOptsRef,
      tgtOptsRef,
      srcCheckedStatusRef,
      tgtCheckedStatusRef,
      srcCheckedValuesRef,
      tgtCheckedValuesRef,
      mergedThemeRef,
      disabledRef,
      mergedClsPrefixRef
    } = inject(transferInjectionKey);
    const checkboxPropsRef = computed(() => {
      const {
        source
      } = props;
      if (source) {
        return srcCheckedStatusRef.value;
      } else {
        return tgtCheckedStatusRef.value;
      }
    });
    return () => {
      const {
        source
      } = props;
      const {
        value: checkboxProps
      } = checkboxPropsRef;
      const {
        value: mergedTheme
      } = mergedThemeRef;
      const {
        value: mergedClsPrefix
      } = mergedClsPrefixRef;
      return h("div", {
        class: `${mergedClsPrefix}-legacy-transfer-list-header`
      }, h("div", {
        class: `${mergedClsPrefix}-legacy-transfer-list-header__checkbox`
      }, h(NCheckbox, {
        theme: mergedTheme.peers.Checkbox,
        themeOverrides: mergedTheme.peerOverrides.Checkbox,
        checked: checkboxProps.checked,
        indeterminate: checkboxProps.indeterminate,
        disabled: checkboxProps.disabled || disabledRef.value,
        onUpdateChecked: props.onChange
      })), h("div", {
        class: `${mergedClsPrefix}-legacy-transfer-list-header__header`
      }, props.title), h("div", {
        class: `${mergedClsPrefix}-legacy-transfer-list-header__extra`
      }, source ? srcCheckedValuesRef.value.length : tgtCheckedValuesRef.value.length, "/", source ? srcOptsRef.value.length : tgtOptsRef.value.length));
    };
  }
});