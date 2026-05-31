import { pxfy } from 'seemly';
import { useCompitable } from 'vooks';
import { computed, defineComponent, h, ref, Transition, watchEffect } from 'vue';
import { NBaseLoading } from "../../_internal/index.mjs";
import { exposedLoadingProps } from "../../_internal/loading/src/Loading.mjs";
import { useConfig, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { createKey, warnOnce } from "../../_utils/index.mjs";
import { spinLight } from "../styles/index.mjs";
import style from "./styles/index.cssr.mjs";
const STROKE_WIDTH = {
  small: 20,
  medium: 18,
  large: 16
};
export const spinProps = Object.assign(Object.assign(Object.assign({}, useTheme.props), {
  contentClass: String,
  contentStyle: [Object, String],
  description: String,
  size: {
    type: [String, Number],
    default: 'medium'
  },
  show: {
    type: Boolean,
    default: true
  },
  rotate: {
    type: Boolean,
    default: true
  },
  spinning: {
    type: Boolean,
    validator: () => {
      return true;
    },
    default: undefined
  },
  delay: Number
}), exposedLoadingProps);
export default defineComponent({
  name: 'Spin',
  props: spinProps,
  slots: Object,
  setup(props) {
    if (process.env.NODE_ENV !== 'production') {
      watchEffect(() => {
        if (props.spinning !== undefined) {
          warnOnce('spin', '`spinning` is deprecated, please use `show` instead.');
        }
      });
    }
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled
    } = useConfig(props);
    const themeRef = useTheme('Spin', '-spin', style, spinLight, props, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        size: spinSize
      } = props;
      const {
        common: {
          cubicBezierEaseInOut
        },
        self
      } = themeRef.value;
      const {
        opacitySpinning,
        color,
        textColor
      } = self;
      const size = typeof spinSize === 'number' ? pxfy(spinSize) : self[createKey('size', spinSize)];
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-opacity-spinning': opacitySpinning,
        '--n-size': size,
        '--n-color': color,
        '--n-text-color': textColor
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('spin', computed(() => {
      const {
        size
      } = props;
      return typeof size === 'number' ? String(size) : size[0];
    }), cssVarsRef, props) : undefined;
    const compitableShow = useCompitable(props, ['spinning', 'show']);
    const activeRef = ref(false);
    watchEffect(onCleanup => {
      let timerId;
      if (compitableShow.value) {
        const {
          delay
        } = props;
        if (delay) {
          timerId = window.setTimeout(() => {
            activeRef.value = true;
          }, delay);
          onCleanup(() => {
            clearTimeout(timerId);
          });
          return;
        }
      }
      activeRef.value = compitableShow.value;
    });
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      active: activeRef,
      mergedStrokeWidth: computed(() => {
        const {
          strokeWidth
        } = props;
        if (strokeWidth !== undefined) return strokeWidth;
        const {
          size
        } = props;
        return STROKE_WIDTH[typeof size === 'number' ? 'medium' : size];
      }),
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    var _a, _b;
    const {
      $slots,
      mergedClsPrefix,
      description
    } = this;
    const rotate = $slots.icon && this.rotate;
    const descriptionNode = (description || $slots.description) && h("div", {
      class: `${mergedClsPrefix}-spin-description`
    }, description || ((_a = $slots.description) === null || _a === void 0 ? void 0 : _a.call($slots)));
    const icon = $slots.icon ? h("div", {
      class: [`${mergedClsPrefix}-spin-body`, this.themeClass]
    }, h("div", {
      class: [`${mergedClsPrefix}-spin`, rotate && `${mergedClsPrefix}-spin--rotate`],
      style: $slots.default ? '' : this.cssVars
    }, $slots.icon()), descriptionNode) : h("div", {
      class: [`${mergedClsPrefix}-spin-body`, this.themeClass]
    }, h(NBaseLoading, {
      clsPrefix: mergedClsPrefix,
      style: $slots.default ? '' : this.cssVars,
      stroke: this.stroke,
      "stroke-width": this.mergedStrokeWidth,
      radius: this.radius,
      scale: this.scale,
      class: `${mergedClsPrefix}-spin`
    }), descriptionNode);
    (_b = this.onRender) === null || _b === void 0 ? void 0 : _b.call(this);
    return $slots.default ? h("div", {
      class: [`${mergedClsPrefix}-spin-container`, this.themeClass],
      style: this.cssVars
    }, h("div", {
      class: [`${mergedClsPrefix}-spin-content`, this.active && `${mergedClsPrefix}-spin-content--spinning`, this.contentClass],
      style: this.contentStyle
    }, $slots), h(Transition, {
      name: "fade-in-transition"
    }, {
      default: () => this.active ? icon : null
    })) : icon;
  }
});