import { defineComponent, h, inject } from 'vue';
import { throwError } from "../../_utils/index.mjs";
import { uploadInjectionKey } from "./interface.mjs";
export const uploadDraggerKey = '__UPLOAD_DRAGGER__';
export default defineComponent({
  name: 'UploadDragger',
  [uploadDraggerKey]: true,
  setup(_, {
    slots
  }) {
    const NUpload = inject(uploadInjectionKey, null);
    if (!NUpload) {
      throwError('upload-dragger', '`n-upload-dragger` must be placed inside `n-upload`.');
    }
    return () => {
      const {
        mergedClsPrefixRef: {
          value: mergedClsPrefix
        },
        mergedDisabledRef: {
          value: mergedDisabled
        },
        maxReachedRef: {
          value: maxReached
        }
      } = NUpload;
      return h("div", {
        class: [`${mergedClsPrefix}-upload-dragger`, (mergedDisabled || maxReached) && `${mergedClsPrefix}-upload-dragger--disabled`]
      }, slots);
    };
  }
});