import { defineComponent, h } from 'vue';
export default defineComponent({
  name: 'Remove',
  render() {
    return h("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512"
    }, h("line", {
      x1: "400",
      y1: "256",
      x2: "112",
      y2: "256",
      style: "\n        fill: none;\n        stroke: currentColor;\n        stroke-linecap: round;\n        stroke-linejoin: round;\n        stroke-width: 32px;\n      "
    }));
  }
});