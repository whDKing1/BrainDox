var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
import { useMemo } from 'vooks';
import { computed, defineComponent, h, inject, ref, watchEffect } from 'vue';
import { NBaseIcon, NIconSwitchTransition } from "../../_internal/index.mjs";
import { AttachIcon, CancelIcon, DownloadIcon, EyeIcon, RetryIcon, TrashIcon } from "../../_internal/icons/index.mjs";
import { download, warn } from "../../_utils/index.mjs";
import { NButton } from "../../button/index.mjs";
import { NImage } from "../../image/index.mjs";
import { renderDocumentIcon, renderImageIcon } from "./icons.mjs";
import { uploadInjectionKey } from "./interface.mjs";
import NUploadProgress from "./UploadProgress.mjs";
import { isImageFile } from "./utils.mjs";
const buttonThemeOverrides = {
  paddingMedium: '0 3px',
  heightMedium: '24px',
  iconSizeMedium: '18px'
};
export default defineComponent({
  name: 'UploadFile',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    file: {
      type: Object,
      required: true
    },
    listType: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const NUpload = inject(uploadInjectionKey);
    const imageRef = ref(null);
    const thumbnailUrlRef = ref('');
    const progressStatusRef = computed(() => {
      const {
        file
      } = props;
      if (file.status === 'finished') return 'success';
      if (file.status === 'error') return 'error';
      return 'info';
    });
    const buttonTypeRef = computed(() => {
      const {
        file
      } = props;
      if (file.status === 'error') return 'error';
      return undefined;
    });
    const showProgressRef = computed(() => {
      const {
        file
      } = props;
      return file.status === 'uploading';
    });
    const showCancelButtonRef = computed(() => {
      if (!NUpload.showCancelButtonRef.value) return false;
      const {
        file
      } = props;
      return ['uploading', 'pending', 'error'].includes(file.status);
    });
    const showRemoveButtonRef = computed(() => {
      if (!NUpload.showRemoveButtonRef.value) return false;
      const {
        file
      } = props;
      return ['finished'].includes(file.status);
    });
    const showDownloadButtonRef = computed(() => {
      if (!NUpload.showDownloadButtonRef.value) return false;
      const {
        file
      } = props;
      return ['finished'].includes(file.status);
    });
    const showRetryButtonRef = computed(() => {
      if (!NUpload.showRetryButtonRef.value) return false;
      const {
        file
      } = props;
      return ['error'].includes(file.status);
    });
    const mergedThumbnailUrlRef = useMemo(() => {
      return thumbnailUrlRef.value || props.file.thumbnailUrl || props.file.url;
    });
    const showPreviewButtonRef = computed(() => {
      if (!NUpload.showPreviewButtonRef.value) return false;
      const {
        file: {
          status
        },
        listType
      } = props;
      return ['finished'].includes(status) && mergedThumbnailUrlRef.value && listType === 'image-card';
    });
    function handleRetryClick() {
      return __awaiter(this, void 0, void 0, function* () {
        const onRetry = NUpload.onRetryRef.value;
        if (onRetry) {
          const onRetryReturn = yield onRetry({
            file: props.file
          });
          if (onRetryReturn === false) {
            return;
          }
        }
        NUpload.submit({
          fileId: props.file.id
        });
      });
    }
    function handleRemoveOrCancelClick(e) {
      e.preventDefault();
      const {
        file
      } = props;
      if (['finished', 'pending', 'error'].includes(file.status)) {
        handleRemove(file);
      } else if (['uploading'].includes(file.status)) {
        handleAbort(file);
      } else {
        warn('upload', 'The button clicked type is unknown.');
      }
    }
    function handleDownloadClick(e) {
      e.preventDefault();
      handleDownload(props.file);
    }
    function handleRemove(file) {
      const {
        xhrMap,
        doChange,
        onRemoveRef: {
          value: onRemove
        },
        mergedFileListRef: {
          value: mergedFileList
        }
      } = NUpload;
      void Promise.resolve(onRemove ? onRemove({
        file: Object.assign({}, file),
        fileList: mergedFileList,
        index: props.index
      }) : true).then(result => {
        if (result === false) return;
        const fileAfterChange = Object.assign({}, file, {
          status: 'removed'
        });
        xhrMap.delete(file.id);
        doChange(fileAfterChange, undefined, {
          remove: true
        });
      });
    }
    function handleDownload(file) {
      const {
        onDownloadRef: {
          value: onDownload
        },
        customDownloadRef: {
          value: customDownload
        }
      } = NUpload;
      void Promise.resolve(onDownload ? onDownload(Object.assign({}, file)) : true).then(res => {
        if (res !== false) {
          if (customDownload) {
            customDownload(Object.assign({}, file));
          } else {
            download(file.url, file.name);
          }
        }
      });
    }
    function handleAbort(file) {
      const {
        xhrMap
      } = NUpload;
      const xhr = xhrMap.get(file.id);
      xhr === null || xhr === void 0 ? void 0 : xhr.abort();
      handleRemove(Object.assign({}, file));
    }
    function handlePreviewClick(e) {
      const {
        onPreviewRef: {
          value: onPreview
        }
      } = NUpload;
      if (onPreview) {
        onPreview(props.file, {
          event: e
        });
      } else if (props.listType === 'image-card') {
        const {
          value
        } = imageRef;
        if (!value) return;
        value.showPreview();
      }
    }
    const deriveFileThumbnailUrl = () => __awaiter(this, void 0, void 0, function* () {
      const {
        listType
      } = props;
      if (listType !== 'image' && listType !== 'image-card') {
        return;
      }
      if (NUpload.shouldUseThumbnailUrlRef.value(props.file)) {
        thumbnailUrlRef.value = yield NUpload.getFileThumbnailUrlResolver(props.file);
      }
    });
    watchEffect(() => {
      void deriveFileThumbnailUrl();
    });
    return {
      mergedTheme: NUpload.mergedThemeRef,
      progressStatus: progressStatusRef,
      buttonType: buttonTypeRef,
      showProgress: showProgressRef,
      disabled: NUpload.mergedDisabledRef,
      showCancelButton: showCancelButtonRef,
      showRemoveButton: showRemoveButtonRef,
      showDownloadButton: showDownloadButtonRef,
      showRetryButton: showRetryButtonRef,
      showPreviewButton: showPreviewButtonRef,
      mergedThumbnailUrl: mergedThumbnailUrlRef,
      shouldUseThumbnailUrl: NUpload.shouldUseThumbnailUrlRef,
      renderIcon: NUpload.renderIconRef,
      imageRef,
      handleRemoveOrCancelClick,
      handleDownloadClick,
      handleRetryClick,
      handlePreviewClick
    };
  },
  render() {
    const {
      clsPrefix,
      mergedTheme,
      listType,
      file,
      renderIcon
    } = this;
    // if there is text list type, show file icon
    let icon;
    const isImageType = listType === 'image';
    const isImageCardType = listType === 'image-card';
    if (isImageType || isImageCardType) {
      icon = !this.shouldUseThumbnailUrl(file) || !this.mergedThumbnailUrl ? h("span", {
        class: `${clsPrefix}-upload-file-info__thumbnail`
      }, renderIcon ? renderIcon(file) : isImageFile(file) ? h(NBaseIcon, {
        clsPrefix: clsPrefix
      }, {
        default: renderImageIcon
      }) : h(NBaseIcon, {
        clsPrefix: clsPrefix
      }, {
        default: renderDocumentIcon
      })) : h("a", {
        rel: "noopener noreferer",
        target: "_blank",
        href: file.url || undefined,
        class: `${clsPrefix}-upload-file-info__thumbnail`,
        onClick: this.handlePreviewClick
      }, listType === 'image-card' ? h(NImage, {
        src: this.mergedThumbnailUrl || undefined,
        previewSrc: file.url || undefined,
        alt: file.name,
        ref: "imageRef"
      }) : h("img", {
        src: this.mergedThumbnailUrl || undefined,
        alt: file.name
      }));
    } else {
      icon = h("span", {
        class: `${clsPrefix}-upload-file-info__thumbnail`
      }, renderIcon ? renderIcon(file) : h(NBaseIcon, {
        clsPrefix: clsPrefix
      }, {
        default: () => h(AttachIcon, null)
      }));
    }
    const progress = h(NUploadProgress, {
      show: this.showProgress,
      percentage: file.percentage || 0,
      status: this.progressStatus
    });
    const showName = listType === 'text' || listType === 'image';
    return h("div", {
      class: [`${clsPrefix}-upload-file`, `${clsPrefix}-upload-file--${this.progressStatus}-status`, file.url && file.status !== 'error' && listType !== 'image-card' && `${clsPrefix}-upload-file--with-url`, `${clsPrefix}-upload-file--${listType}-type`]
    }, h("div", {
      class: `${clsPrefix}-upload-file-info`
    }, icon, h("div", {
      class: `${clsPrefix}-upload-file-info__name`
    }, showName && (file.url && file.status !== 'error' ? h("a", {
      rel: "noopener noreferer",
      target: "_blank",
      href: file.url || undefined,
      onClick: this.handlePreviewClick
    }, file.name) : h("span", {
      onClick: this.handlePreviewClick
    }, file.name)), isImageType && progress), h("div", {
      class: [`${clsPrefix}-upload-file-info__action`, `${clsPrefix}-upload-file-info__action--${listType}-type`]
    }, this.showPreviewButton ? h(NButton, {
      key: "preview",
      quaternary: true,
      type: this.buttonType,
      onClick: this.handlePreviewClick,
      theme: mergedTheme.peers.Button,
      themeOverrides: mergedTheme.peerOverrides.Button,
      builtinThemeOverrides: buttonThemeOverrides
    }, {
      icon: () => h(NBaseIcon, {
        clsPrefix: clsPrefix
      }, {
        default: () => h(EyeIcon, null)
      })
    }) : null, (this.showRemoveButton || this.showCancelButton) && !this.disabled && h(NButton, {
      key: "cancelOrTrash",
      theme: mergedTheme.peers.Button,
      themeOverrides: mergedTheme.peerOverrides.Button,
      quaternary: true,
      builtinThemeOverrides: buttonThemeOverrides,
      type: this.buttonType,
      onClick: this.handleRemoveOrCancelClick
    }, {
      icon: () => h(NIconSwitchTransition, null, {
        default: () => this.showRemoveButton ? h(NBaseIcon, {
          clsPrefix: clsPrefix,
          key: "trash"
        }, {
          default: () => h(TrashIcon, null)
        }) : h(NBaseIcon, {
          clsPrefix: clsPrefix,
          key: "cancel"
        }, {
          default: () => h(CancelIcon, null)
        })
      })
    }), this.showRetryButton && !this.disabled && h(NButton, {
      key: "retry",
      quaternary: true,
      type: this.buttonType,
      onClick: this.handleRetryClick,
      theme: mergedTheme.peers.Button,
      themeOverrides: mergedTheme.peerOverrides.Button,
      builtinThemeOverrides: buttonThemeOverrides
    }, {
      icon: () => h(NBaseIcon, {
        clsPrefix: clsPrefix
      }, {
        default: () => h(RetryIcon, null)
      })
    }), this.showDownloadButton ? h(NButton, {
      key: "download",
      quaternary: true,
      type: this.buttonType,
      onClick: this.handleDownloadClick,
      theme: mergedTheme.peers.Button,
      themeOverrides: mergedTheme.peerOverrides.Button,
      builtinThemeOverrides: buttonThemeOverrides
    }, {
      icon: () => h(NBaseIcon, {
        clsPrefix: clsPrefix
      }, {
        default: () => h(DownloadIcon, null)
      })
    }) : null)), !isImageType && progress);
  }
});