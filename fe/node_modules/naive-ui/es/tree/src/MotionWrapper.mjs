import { pxfy } from 'seemly';
import { defineComponent, h } from 'vue';
import FadeInExpandTransition from "../../_internal/fade-in-expand-transition/index.mjs";
import TreeNode from "./TreeNode.mjs";
export default defineComponent({
  name: 'TreeMotionWrapper',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    height: Number,
    nodes: {
      type: Array,
      required: true
    },
    mode: {
      type: String,
      required: true
    },
    onAfterEnter: {
      type: Function,
      required: true
    }
  },
  render() {
    const {
      clsPrefix
    } = this;
    return h(FadeInExpandTransition, {
      onAfterEnter: this.onAfterEnter,
      appear: true,
      reverse: this.mode === 'collapse'
    }, {
      default: () => h("div", {
        class: [`${clsPrefix}-tree-motion-wrapper`, `${clsPrefix}-tree-motion-wrapper--${this.mode}`],
        style: {
          height: pxfy(this.height)
        }
      }, this.nodes.map(node => h(TreeNode, {
        clsPrefix: clsPrefix,
        tmNode: node
      })))
    });
  }
});