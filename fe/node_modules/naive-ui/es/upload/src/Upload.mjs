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
import { createId } from 'seemly';
import { useMergedState } from 'vooks';
import { computed, defineComponent, Fragment, h, nextTick, provide, ref, Teleport, toRef } from 'vue';
import { useConfig, useFormItem, useRtl, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { call, throwError, warn } from "../../_utils/index.mjs";
import { uploadLight } from "../styles/index.mjs";
import { uploadInjectionKey } from "./interface.mjs";
import style from "./styles/index.cssr.mjs";
import { uploadDraggerKey } from "./UploadDragger.mjs";
import NUploadFileList from "./UploadFileList.mjs";
import NUploadTrigger from "./UploadTrigger.mjs";
import { createImageDataUrl, createSettledFileInfo, environmentSupportFile, isImageFile, matchType } from "./utils.mjs";
/**
 * fils status ['pending', 'uploading', 'finished', 'removed', 'error']
 */
function createXhrHandlers(inst, file, xhr) {
  const {
    doChange,
    xhrMap
  } = inst;
  let percentage = 0;
  function handleXHRError(e) {
    var _a;
    let fileAfterChange = Object.assign({}, file, {
      status: 'error',
      percentage
    });
    xhrMap.delete(file.id);
    fileAfterChange = createSettledFileInfo(((_a = inst.onError) === null || _a === void 0 ? void 0 : _a.call(inst, {
      file: fileAfterChange,
      event: e
    })) || fileAfterChange);
    doChange(fileAfterChange, e);
  }
  function handleXHRLoad(e) {
    var _a;
    if (inst.isErrorState) {
      if (inst.isErrorState(xhr)) {
        handleXHRError(e);
        return;
      }
    } else {
      if (xhr.status < 200 || xhr.status >= 300) {
        handleXHRError(e);
        return;
      }
    }
    let fileAfterChange = Object.assign({}, file, {
      status: 'finished',
      percentage
    });
    xhrMap.delete(file.id);
    fileAfterChange = createSettledFileInfo(((_a = inst.onFinish) === null || _a === void 0 ? void 0 : _a.call(inst, {
      file: fileAfterChange,
      event: e
    })) || fileAfterChange);
    doChange(fileAfterChange, e);
  }
  return {
    handleXHRLoad,
    handleXHRError,
    handleXHRAbort(e) {
      const fileAfterChange = Object.assign({}, file, {
        status: 'removed',
        file: null,
        percentage
      });
      xhrMap.delete(file.id);
      doChange(fileAfterChange, e);
    },
    handleXHRProgress(e) {
      const fileAfterChange = Object.assign({}, file, {
        status: 'uploading'
      });
      if (e.lengthComputable) {
        const progress = Math.ceil(e.loaded / e.total * 100);
        fileAfterChange.percentage = progress;
        percentage = progress;
      }
      doChange(fileAfterChange, e);
    }
  };
}
function customSubmitImpl(options) {
  const {
    inst,
    file,
    data,
    headers,
    withCredentials,
    action,
    customRequest
  } = options;
  const {
    doChange
  } = options.inst;
  let percentage = 0;
  customRequest({
    file,
    data,
    headers,
    withCredentials,
    action,
    onProgress(event) {
      const fileAfterChange = Object.assign({}, file, {
        status: 'uploading'
      });
      const progress = event.percent;
      fileAfterChange.percentage = progress;
      percentage = progress;
      doChange(fileAfterChange);
    },
    onFinish() {
      var _a;
      let fileAfterChange = Object.assign({}, file, {
        status: 'finished',
        percentage
      });
      fileAfterChange = createSettledFileInfo(((_a = inst.onFinish) === null || _a === void 0 ? void 0 : _a.call(inst, {
        file: fileAfterChange
      })) || fileAfterChange);
      doChange(fileAfterChange);
    },
    onError() {
      var _a;
      let fileAfterChange = Object.assign({}, file, {
        status: 'error',
        percentage
      });
      fileAfterChange = createSettledFileInfo(((_a = inst.onError) === null || _a === void 0 ? void 0 : _a.call(inst, {
        file: fileAfterChange
      })) || fileAfterChange);
      doChange(fileAfterChange);
    }
  });
}
function registerHandler(inst, file, request) {
  const handlers = createXhrHandlers(inst, file, request);
  request.onabort = handlers.handleXHRAbort;
  request.onerror = handlers.handleXHRError;
  request.onload = handlers.handleXHRLoad;
  if (request.upload) {
    request.upload.onprogress = handlers.handleXHRProgress;
  }
}
function unwrapFunctionValue(data, file) {
  if (typeof data === 'function') {
    return data({
      file
    });
  }
  if (data) return data;
  return {};
}
function setHeaders(request, headers, file) {
  const headersObject = unwrapFunctionValue(headers, file);
  if (!headersObject) return;
  Object.keys(headersObject).forEach(key => {
    request.setRequestHeader(key, headersObject[key]);
  });
}
function appendData(formData, data, file) {
  const dataObject = unwrapFunctionValue(data, file);
  if (!dataObject) return;
  Object.keys(dataObject).forEach(key => {
    formData.append(key, dataObject[key]);
  });
}
function submitImpl(inst, fieldName, file, {
  method,
  action,
  withCredentials,
  responseType,
  headers,
  data
}) {
  const request = new XMLHttpRequest();
  request.responseType = responseType;
  inst.xhrMap.set(file.id, request);
  request.withCredentials = withCredentials;
  const formData = new FormData();
  appendData(formData, data, file);
  if (file.file !== null) {
    formData.append(fieldName, file.file);
  }
  registerHandler(inst, file, request);
  if (action !== undefined) {
    request.open(method.toUpperCase(), action);
    setHeaders(request, headers, file);
    request.send(formData);
    const fileAfterChange = Object.assign({}, file, {
      status: 'uploading'
    });
    inst.doChange(fileAfterChange);
  }
}
export const uploadProps = Object.assign(Object.assign({}, useTheme.props), {
  name: {
    type: String,
    default: 'file'
  },
  accept: String,
  action: String,
  customRequest: Function,
  directory: Boolean,
  directoryDnd: {
    type: Boolean,
    default: undefined
  },
  method: {
    type: String,
    default: 'POST'
  },
  multiple: Boolean,
  showFileList: {
    type: Boolean,
    default: true
  },
  data: [Object, Function],
  headers: [Object, Function],
  withCredentials: Boolean,
  responseType: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: undefined
  },
  onChange: Function,
  onRemove: Function,
  onFinish: Function,
  onError: Function,
  onRetry: Function,
  onBeforeUpload: Function,
  isErrorState: Function,
  /** currently not used */
  onDownload: Function,
  customDownload: Function,
  defaultUpload: {
    type: Boolean,
    default: true
  },
  fileList: Array,
  'onUpdate:fileList': [Function, Array],
  onUpdateFileList: [Function, Array],
  fileListClass: String,
  fileListStyle: [String, Object],
  defaultFileList: {
    type: Array,
    default: () => []
  },
  showCancelButton: {
    type: Boolean,
    default: true
  },
  showRemoveButton: {
    type: Boolean,
    default: true
  },
  showDownloadButton: Boolean,
  showRetryButton: {
    type: Boolean,
    default: true
  },
  showPreviewButton: {
    type: Boolean,
    default: true
  },
  listType: {
    type: String,
    default: 'text'
  },
  onPreview: Function,
  shouldUseThumbnailUrl: {
    type: Function,
    default: file => {
      if (!environmentSupportFile) return false;
      return isImageFile(file);
    }
  },
  createThumbnailUrl: Function,
  abstract: Boolean,
  max: Number,
  showTrigger: {
    type: Boolean,
    default: true
  },
  imageGroupProps: Object,
  inputProps: Object,
  triggerClass: String,
  triggerStyle: [String, Object],
  renderIcon: Function
});
export default defineComponent({
  name: 'Upload',
  props: uploadProps,
  setup(props) {
    if (props.abstract && props.listType === 'image-card') {
      throwError('upload', 'when the list-type is image-card, abstract is not supported.');
    }
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled,
      mergedRtlRef
    } = useConfig(props);
    const themeRef = useTheme('Upload', '-upload', style, uploadLight, props, mergedClsPrefixRef);
    const rtlEnabledRef = useRtl('Upload', mergedRtlRef, mergedClsPrefixRef);
    const formItem = useFormItem(props);
    const uncontrolledFileListRef = ref(props.defaultFileList);
    const controlledFileListRef = toRef(props, 'fileList');
    const inputElRef = ref(null);
    const draggerInsideRef = {
      value: false
    };
    const dragOverRef = ref(false);
    const xhrMap = new Map();
    const _mergedFileListRef = useMergedState(controlledFileListRef, uncontrolledFileListRef);
    const mergedFileListRef = computed(() => _mergedFileListRef.value.map(createSettledFileInfo));
    const maxReachedRef = computed(() => {
      const {
        max
      } = props;
      if (max !== undefined) {
        return mergedFileListRef.value.length >= max;
      }
      return false;
    });
    function openOpenFileDialog() {
      var _a;
      (_a = inputElRef.value) === null || _a === void 0 ? void 0 : _a.click();
    }
    function handleFileInputChange(e) {
      const target = e.target;
      handleFileAddition(target.files ? Array.from(target.files).map(file => ({
        file,
        entry: null,
        source: 'input'
      })) : null, e);
      // May have bug! set to null?
      target.value = '';
    }
    function doUpdateFileList(files) {
      const {
        'onUpdate:fileList': _onUpdateFileList,
        onUpdateFileList
      } = props;
      if (_onUpdateFileList) call(_onUpdateFileList, files);
      if (onUpdateFileList) call(onUpdateFileList, files);
      uncontrolledFileListRef.value = files;
    }
    const mergedMultipleRef = computed(() => props.multiple || props.directory);
    const doChange = (fileAfterChange, event, options = {
      append: false,
      remove: false
    }) => {
      const {
        append,
        remove
      } = options;
      const fileListAfterChange = Array.from(mergedFileListRef.value);
      const fileIndex = fileListAfterChange.findIndex(file => file.id === fileAfterChange.id);
      if (append || remove || ~fileIndex) {
        if (append) {
          fileListAfterChange.push(fileAfterChange);
        } else if (remove) {
          fileListAfterChange.splice(fileIndex, 1);
        } else {
          fileListAfterChange.splice(fileIndex, 1, fileAfterChange);
        }
        const {
          onChange
        } = props;
        if (onChange) {
          onChange({
            file: fileAfterChange,
            fileList: fileListAfterChange,
            event
          });
        }
        doUpdateFileList(fileListAfterChange);
      } else if (process.env.NODE_ENV !== 'production') {
        warn('upload', 'File has no corresponding id in current file list.');
      }
    };
    function handleFileAddition(fileAndEntries, e) {
      if (!fileAndEntries || fileAndEntries.length === 0) return;
      const {
        onBeforeUpload
      } = props;
      fileAndEntries = mergedMultipleRef.value ? fileAndEntries : [fileAndEntries[0]];
      const {
        max,
        accept
      } = props;
      fileAndEntries = fileAndEntries.filter(({
        file,
        source
      }) => {
        if (source === 'dnd' && (accept === null || accept === void 0 ? void 0 : accept.trim())) {
          return matchType(file.name, file.type, accept);
        } else {
          return true;
        }
      });
      if (max) {
        fileAndEntries = fileAndEntries.slice(0, max - mergedFileListRef.value.length);
      }
      const batchId = createId();
      void Promise.all(fileAndEntries.map(_a => __awaiter(this, [_a], void 0, function* ({
        file,
        entry
      }) {
        var _b;
        const fileInfo = {
          id: createId(),
          batchId,
          name: file.name,
          status: 'pending',
          percentage: 0,
          file,
          url: null,
          type: file.type,
          thumbnailUrl: null,
          fullPath: (_b = entry === null || entry === void 0 ? void 0 : entry.fullPath) !== null && _b !== void 0 ? _b : `/${file.webkitRelativePath || file.name}`
        };
        if (!onBeforeUpload || (yield onBeforeUpload({
          file: fileInfo,
          fileList: mergedFileListRef.value
        })) !== false) {
          return fileInfo;
        }
        return null;
      }))).then(fileInfos => __awaiter(this, void 0, void 0, function* () {
        let nextTickChain = Promise.resolve();
        fileInfos.forEach(fileInfo => {
          nextTickChain = nextTickChain.then(nextTick).then(() => {
            if (fileInfo) {
              doChange(fileInfo, e, {
                append: true
              });
            }
          });
        });
        yield nextTickChain;
      })).then(() => {
        if (props.defaultUpload) {
          submit();
        }
      });
    }
    function submit({
      fileId,
      retry = false
    } = {}) {
      const {
        method,
        action,
        withCredentials,
        headers,
        data,
        name: fieldName
      } = props;
      const filesToUpload = fileId !== undefined ? mergedFileListRef.value.filter(file => file.id === fileId) : mergedFileListRef.value;
      const shouldReupload = retry || fileId !== undefined;
      filesToUpload.forEach(file => {
        const {
          status
        } = file;
        if (status === 'pending' || status === 'error' && shouldReupload) {
          if (props.customRequest) {
            customSubmitImpl({
              inst: {
                doChange,
                xhrMap,
                onFinish: props.onFinish,
                onError: props.onError
              },
              file,
              action,
              withCredentials,
              headers,
              data,
              customRequest: props.customRequest
            });
          } else {
            submitImpl({
              doChange,
              xhrMap,
              onFinish: props.onFinish,
              onError: props.onError,
              isErrorState: props.isErrorState
            }, fieldName, file, {
              method,
              action,
              withCredentials,
              responseType: props.responseType,
              headers,
              data
            });
          }
        }
      });
    }
    function getFileThumbnailUrlResolver(file) {
      var _a;
      if (file.thumbnailUrl) return file.thumbnailUrl;
      const {
        createThumbnailUrl
      } = props;
      if (createThumbnailUrl) {
        return (_a = createThumbnailUrl(file.file, file)) !== null && _a !== void 0 ? _a : file.url || '';
      }
      if (file.url) {
        return file.url;
      } else if (file.file) {
        return createImageDataUrl(file.file);
      }
      return '';
    }
    const cssVarsRef = computed(() => {
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: {
          draggerColor,
          draggerBorder,
          draggerBorderHover,
          itemColorHover,
          itemColorHoverError,
          itemTextColorError,
          itemTextColorSuccess,
          itemTextColor,
          itemIconColor,
          itemDisabledOpacity,
          lineHeight,
          borderRadius,
          fontSize,
          itemBorderImageCardError,
          itemBorderImageCard
        }
      } = themeRef.value;
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-border-radius': borderRadius,
        '--n-dragger-border': draggerBorder,
        '--n-dragger-border-hover': draggerBorderHover,
        '--n-dragger-color': draggerColor,
        '--n-font-size': fontSize,
        '--n-item-color-hover': itemColorHover,
        '--n-item-color-hover-error': itemColorHoverError,
        '--n-item-disabled-opacity': itemDisabledOpacity,
        '--n-item-icon-color': itemIconColor,
        '--n-item-text-color': itemTextColor,
        '--n-item-text-color-error': itemTextColorError,
        '--n-item-text-color-success': itemTextColorSuccess,
        '--n-line-height': lineHeight,
        '--n-item-border-image-card-error': itemBorderImageCardError,
        '--n-item-border-image-card': itemBorderImageCard
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('upload', undefined, cssVarsRef, props) : undefined;
    provide(uploadInjectionKey, {
      mergedClsPrefixRef,
      mergedThemeRef: themeRef,
      showCancelButtonRef: toRef(props, 'showCancelButton'),
      showDownloadButtonRef: toRef(props, 'showDownloadButton'),
      showRemoveButtonRef: toRef(props, 'showRemoveButton'),
      showRetryButtonRef: toRef(props, 'showRetryButton'),
      onRemoveRef: toRef(props, 'onRemove'),
      onDownloadRef: toRef(props, 'onDownload'),
      customDownloadRef: toRef(props, 'customDownload'),
      mergedFileListRef,
      triggerClassRef: toRef(props, 'triggerClass'),
      triggerStyleRef: toRef(props, 'triggerStyle'),
      shouldUseThumbnailUrlRef: toRef(props, 'shouldUseThumbnailUrl'),
      renderIconRef: toRef(props, 'renderIcon'),
      xhrMap,
      submit,
      doChange,
      showPreviewButtonRef: toRef(props, 'showPreviewButton'),
      onPreviewRef: toRef(props, 'onPreview'),
      getFileThumbnailUrlResolver,
      listTypeRef: toRef(props, 'listType'),
      dragOverRef,
      openOpenFileDialog,
      draggerInsideRef,
      handleFileAddition,
      mergedDisabledRef: formItem.mergedDisabledRef,
      maxReachedRef,
      fileListClassRef: toRef(props, 'fileListClass'),
      fileListStyleRef: toRef(props, 'fileListStyle'),
      abstractRef: toRef(props, 'abstract'),
      acceptRef: toRef(props, 'accept'),
      cssVarsRef: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClassRef: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender,
      showTriggerRef: toRef(props, 'showTrigger'),
      imageGroupPropsRef: toRef(props, 'imageGroupProps'),
      mergedDirectoryDndRef: computed(() => {
        var _a;
        return (_a = props.directoryDnd) !== null && _a !== void 0 ? _a : props.directory;
      }),
      onRetryRef: toRef(props, 'onRetry')
    });
    const exposedMethods = {
      clear: () => {
        uncontrolledFileListRef.value = [];
      },
      submit,
      openOpenFileDialog
    };
    return Object.assign({
      mergedClsPrefix: mergedClsPrefixRef,
      draggerInsideRef,
      rtlEnabled: rtlEnabledRef,
      inputElRef,
      mergedTheme: themeRef,
      dragOver: dragOverRef,
      mergedMultiple: mergedMultipleRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender,
      handleFileInputChange
    }, exposedMethods);
  },
  render() {
    var _a, _b;
    const {
      draggerInsideRef,
      mergedClsPrefix,
      $slots,
      directory,
      onRender
    } = this;
    if ($slots.default && !this.abstract) {
      const firstChild = $slots.default()[0];
      if ((_a = firstChild === null || firstChild === void 0 ? void 0 : firstChild.type) === null || _a === void 0 ? void 0 : _a[uploadDraggerKey]) {
        draggerInsideRef.value = true;
      }
    }
    const inputNode = h("input", Object.assign({}, this.inputProps, {
      ref: "inputElRef",
      type: "file",
      class: `${mergedClsPrefix}-upload-file-input`,
      accept: this.accept,
      multiple: this.mergedMultiple,
      onChange: this.handleFileInputChange,
      // @ts-expect-error // seems vue-tsc will add the prop, so we can't use expect-error
      webkitdirectory: directory || undefined,
      directory: directory || undefined
    }));
    if (this.abstract) {
      return h(Fragment, null, (_b = $slots.default) === null || _b === void 0 ? void 0 : _b.call($slots), h(Teleport, {
        to: "body"
      }, inputNode));
    }
    onRender === null || onRender === void 0 ? void 0 : onRender();
    return h("div", {
      class: [`${mergedClsPrefix}-upload`, this.rtlEnabled && `${mergedClsPrefix}-upload--rtl`, draggerInsideRef.value && `${mergedClsPrefix}-upload--dragger-inside`, this.dragOver && `${mergedClsPrefix}-upload--drag-over`, this.themeClass],
      style: this.cssVars
    }, inputNode, this.showTrigger && this.listType !== 'image-card' && h(NUploadTrigger, null, $slots), this.showFileList && h(NUploadFileList, null, $slots));
  }
});