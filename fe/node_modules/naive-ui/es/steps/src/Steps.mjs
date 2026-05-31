import { defineComponent, h, provide } from 'vue';
import { useConfig, useRtl, useTheme } from "../../_mixins/index.mjs";
import { createInjectionKey, flatten, getSlot } from "../../_utils/index.mjs";
import { stepsLight } from "../styles/index.mjs";
import style from "./styles/index.cssr.mjs";
function stepWithIndex(step, i) {
  if (typeof step !== 'object' || step === null || Array.isArray(step)) {
    return null;
  }
  if (!step.props) step.props = {};
  step.props.internalIndex = i + 1;
  return step;
}
function stepsWithIndex(steps) {
  return steps.map((step, i) => stepWithIndex(step, i));
}
export const stepsProps = Object.assign(Object.assign({}, useTheme.props), {
  current: Number,
  status: {
    type: String,
    default: 'process'
  },
  size: {
    type: String,
    default: 'medium'
  },
  vertical: Boolean,
  contentPlacement: {
    type: String,
    default: 'right'
  },
  'onUpdate:current': [Function, Array],
  onUpdateCurrent: [Function, Array]
});
export const stepsInjectionKey = createInjectionKey('n-steps');
export default defineComponent({
  name: 'Steps',
  props: stepsProps,
  slots: Object,
  setup(props, {
    slots
  }) {
    const {
      mergedClsPrefixRef,
      mergedRtlRef
    } = useConfig(props);
    const rtlEnabledRef = useRtl('Steps', mergedRtlRef, mergedClsPrefixRef);
    const themeRef = useTheme('Steps', '-steps', style, stepsLight, props, mergedClsPrefixRef);
    provide(stepsInjectionKey, {
      props,
      mergedThemeRef: themeRef,
      mergedClsPrefixRef,
      stepsSlots: slots
    });
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      rtlEnabled: rtlEnabledRef
    };
  },
  render() {
    const {
      mergedClsPrefix
    } = this;
    return h("div", {
      class: [`${mergedClsPrefix}-steps`, this.rtlEnabled && `${mergedClsPrefix}-steps--rtl`, this.vertical && `${mergedClsPrefix}-steps--vertical`, this.contentPlacement === 'bottom' && `${mergedClsPrefix}-steps--content-bottom`]
    }, stepsWithIndex(flatten(getSlot(this))));
  }
});