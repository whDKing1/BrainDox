import { depx, getGap } from 'seemly';
import { computed, defineComponent, h } from 'vue';
import { useConfig, useTheme } from "../../_mixins/index.mjs";
import { useRtl } from "../../_mixins/use-rtl.mjs";
import { createKey, flatten, getSlot } from "../../_utils/index.mjs";
import { flexLight } from "../styles/index.mjs";
export const flexProps = Object.assign(Object.assign({}, useTheme.props), {
  align: String,
  justify: {
    type: String,
    default: 'start'
  },
  inline: Boolean,
  vertical: Boolean,
  reverse: Boolean,
  size: {
    type: [String, Number, Array],
    default: 'medium'
  },
  wrap: {
    type: Boolean,
    default: true
  }
});
export default defineComponent({
  name: 'Flex',
  props: flexProps,
  setup(props) {
    const {
      mergedClsPrefixRef,
      mergedRtlRef
    } = useConfig(props);
    const themeRef = useTheme('Flex', '-flex', undefined, flexLight, props, mergedClsPrefixRef);
    const rtlEnabledRef = useRtl('Flex', mergedRtlRef, mergedClsPrefixRef);
    return {
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      margin: computed(() => {
        const {
          size
        } = props;
        if (Array.isArray(size)) {
          return {
            horizontal: size[0],
            vertical: size[1]
          };
        }
        if (typeof size === 'number') {
          return {
            horizontal: size,
            vertical: size
          };
        }
        const {
          self: {
            [createKey('gap', size)]: gap
          }
        } = themeRef.value;
        const {
          row,
          col
        } = getGap(gap);
        return {
          horizontal: depx(col),
          vertical: depx(row)
        };
      })
    };
  },
  render() {
    const {
      vertical,
      reverse,
      align,
      inline,
      justify,
      margin,
      wrap,
      mergedClsPrefix,
      rtlEnabled
    } = this;
    const children = flatten(getSlot(this), false);
    if (!children.length) return null;
    return h("div", {
      role: "none",
      class: [`${mergedClsPrefix}-flex`, rtlEnabled && `${mergedClsPrefix}-flex--rtl`],
      style: {
        display: inline ? 'inline-flex' : 'flex',
        flexDirection: (() => {
          if (vertical && !reverse) return 'column';
          if (vertical && reverse) return 'column-reverse';
          if (!vertical && reverse) return 'row-reverse';else return 'row';
        })(),
        justifyContent: justify,
        flexWrap: !wrap || vertical ? 'nowrap' : 'wrap',
        alignItems: align,
        gap: `${margin.vertical}px ${margin.horizontal}px`
      }
    }, children);
  }
});