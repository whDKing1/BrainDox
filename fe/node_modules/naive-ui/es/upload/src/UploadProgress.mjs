import { defineComponent, h, inject } from 'vue';
import { NFadeInExpandTransition } from "../../_internal/index.mjs";
import { NProgress } from "../../progress/index.mjs";
import { uploadInjectionKey } from "./interface.mjs";
export default defineComponent({
  name: 'UploadProgress',
  props: {
    show: Boolean,
    percentage: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  },
  setup() {
    const NUpload = inject(uploadInjectionKey);
    return {
      mergedTheme: NUpload.mergedThemeRef
    };
  },
  render() {
    return h(NFadeInExpandTransition, null, {
      default: () => this.show ? h(NProgress, {
        type: "line",
        showIndicator: false,
        percentage: this.percentage,
        status: this.status,
        height: 2,
        theme: this.mergedTheme.peers.Progress,
        themeOverrides: this.mergedTheme.peerOverrides.Progress
      }) : null
    });
  }
});