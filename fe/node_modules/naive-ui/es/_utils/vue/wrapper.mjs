import { defineComponent } from 'vue';
export const Wrapper = defineComponent({
  render() {
    var _a, _b;
    return (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a);
  }
});