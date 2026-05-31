import { computed, defineComponent, h, inject } from 'vue';
import { NFadeInExpandTransition } from "../../_internal/index.mjs";
import { throwError } from "../../_utils/index.mjs";
import { NImageGroup } from "../../image/index.mjs";
import { uploadInjectionKey } from "./interface.mjs";
import NUploadFile from "./UploadFile.mjs";
import NUploadTrigger from "./UploadTrigger.mjs";
export default defineComponent({
  name: 'UploadFileList',
  setup(_, {
    slots
  }) {
    const NUpload = inject(uploadInjectionKey, null);
    if (!NUpload) {
      throwError('upload-file-list', '`n-upload-file-list` must be placed inside `n-upload`.');
    }
    const {
      abstractRef,
      mergedClsPrefixRef,
      listTypeRef,
      mergedFileListRef,
      fileListClassRef,
      fileListStyleRef,
      cssVarsRef,
      themeClassRef,
      maxReachedRef,
      showTriggerRef,
      imageGroupPropsRef
    } = NUpload;
    const isImageCardTypeRef = computed(() => listTypeRef.value === 'image-card');
    const renderFileList = () => mergedFileListRef.value.map((file, index) => h(NUploadFile, {
      clsPrefix: mergedClsPrefixRef.value,
      key: file.id,
      file: file,
      index: index,
      listType: listTypeRef.value
    }));
    const renderUploadFileList = () => isImageCardTypeRef.value ? h(NImageGroup, Object.assign({}, imageGroupPropsRef.value), {
      default: renderFileList
    }) : h(NFadeInExpandTransition, {
      group: true
    }, {
      default: renderFileList
    });
    return () => {
      const {
        value: mergedClsPrefix
      } = mergedClsPrefixRef;
      const {
        value: abstract
      } = abstractRef;
      return h("div", {
        class: [`${mergedClsPrefix}-upload-file-list`, isImageCardTypeRef.value && `${mergedClsPrefix}-upload-file-list--grid`, abstract ? themeClassRef === null || themeClassRef === void 0 ? void 0 : themeClassRef.value : undefined, fileListClassRef.value],
        style: [abstract && cssVarsRef ? cssVarsRef.value : '', fileListStyleRef.value]
      }, renderUploadFileList(), showTriggerRef.value && !maxReachedRef.value && isImageCardTypeRef.value && h(NUploadTrigger, null, slots));
    };
  }
});