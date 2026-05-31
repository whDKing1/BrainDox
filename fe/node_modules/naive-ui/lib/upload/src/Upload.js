"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProps = void 0;
const seemly_1 = require("seemly");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const interface_1 = require("./interface");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
const UploadDragger_1 = require("./UploadDragger");
const UploadFileList_1 = __importDefault(require("./UploadFileList"));
const UploadTrigger_1 = __importDefault(require("./UploadTrigger"));
const utils_1 = require("./utils");
/**
 * fils status ['pending', 'uploading', 'finished', 'removed', 'error']
 */
function createXhrHandlers(inst, file, xhr) {
    const { doChange, xhrMap } = inst;
    let percentage = 0;
    function handleXHRError(e) {
        var _a;
        let fileAfterChange = Object.assign({}, file, {
            status: 'error',
            percentage
        });
        xhrMap.delete(file.id);
        fileAfterChange = (0, utils_1.createSettledFileInfo)(((_a = inst.onError) === null || _a === void 0 ? void 0 : _a.call(inst, { file: fileAfterChange, event: e })) || fileAfterChange);
        doChange(fileAfterChange, e);
    }
    function handleXHRLoad(e) {
        var _a;
        if (inst.isErrorState) {
            if (inst.isErrorState(xhr)) {
                handleXHRError(e);
                return;
            }
        }
        else {
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
        fileAfterChange = (0, utils_1.createSettledFileInfo)(((_a = inst.onFinish) === null || _a === void 0 ? void 0 : _a.call(inst, { file: fileAfterChange, event: e })) || fileAfterChange);
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
                const progress = Math.ceil((e.loaded / e.total) * 100);
                fileAfterChange.percentage = progress;
                percentage = progress;
            }
            doChange(fileAfterChange, e);
        }
    };
}
function customSubmitImpl(options) {
    const { inst, file, data, headers, withCredentials, action, customRequest } = options;
    const { doChange } = options.inst;
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
            fileAfterChange = (0, utils_1.createSettledFileInfo)(((_a = inst.onFinish) === null || _a === void 0 ? void 0 : _a.call(inst, { file: fileAfterChange })) || fileAfterChange);
            doChange(fileAfterChange);
        },
        onError() {
            var _a;
            let fileAfterChange = Object.assign({}, file, {
                status: 'error',
                percentage
            });
            fileAfterChange = (0, utils_1.createSettledFileInfo)(((_a = inst.onError) === null || _a === void 0 ? void 0 : _a.call(inst, { file: fileAfterChange })) || fileAfterChange);
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
        return data({ file });
    }
    if (data)
        return data;
    return {};
}
function setHeaders(request, headers, file) {
    const headersObject = unwrapFunctionValue(headers, file);
    if (!headersObject)
        return;
    Object.keys(headersObject).forEach((key) => {
        request.setRequestHeader(key, headersObject[key]);
    });
}
function appendData(formData, data, file) {
    const dataObject = unwrapFunctionValue(data, file);
    if (!dataObject)
        return;
    Object.keys(dataObject).forEach((key) => {
        formData.append(key, dataObject[key]);
    });
}
function submitImpl(inst, fieldName, file, { method, action, withCredentials, responseType, headers, data }) {
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
exports.uploadProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { name: {
        type: String,
        default: 'file'
    }, accept: String, action: String, customRequest: Function, directory: Boolean, directoryDnd: { type: Boolean, default: undefined }, method: {
        type: String,
        default: 'POST'
    }, multiple: Boolean, showFileList: {
        type: Boolean,
        default: true
    }, data: [Object, Function], headers: [Object, Function], withCredentials: Boolean, responseType: {
        type: String,
        default: ''
    }, disabled: {
        type: Boolean,
        default: undefined
    }, onChange: Function, onRemove: Function, onFinish: Function, onError: Function, onRetry: Function, onBeforeUpload: Function, isErrorState: Function, 
    /** currently not used */
    onDownload: Function, customDownload: Function, defaultUpload: {
        type: Boolean,
        default: true
    }, fileList: Array, 'onUpdate:fileList': [Function, Array], onUpdateFileList: [Function, Array], fileListClass: String, fileListStyle: [String, Object], defaultFileList: {
        type: Array,
        default: () => []
    }, showCancelButton: {
        type: Boolean,
        default: true
    }, showRemoveButton: {
        type: Boolean,
        default: true
    }, showDownloadButton: Boolean, showRetryButton: {
        type: Boolean,
        default: true
    }, showPreviewButton: {
        type: Boolean,
        default: true
    }, listType: {
        type: String,
        default: 'text'
    }, onPreview: Function, shouldUseThumbnailUrl: {
        type: Function,
        default: (file) => {
            if (!utils_1.environmentSupportFile)
                return false;
            return (0, utils_1.isImageFile)(file);
        }
    }, createThumbnailUrl: Function, abstract: Boolean, max: Number, showTrigger: {
        type: Boolean,
        default: true
    }, imageGroupProps: Object, inputProps: Object, triggerClass: String, triggerStyle: [String, Object], renderIcon: Function });
exports.default = (0, vue_1.defineComponent)({
    name: 'Upload',
    props: exports.uploadProps,
    setup(props) {
        if (props.abstract && props.listType === 'image-card') {
            (0, _utils_1.throwError)('upload', 'when the list-type is image-card, abstract is not supported.');
        }
        const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Upload', '-upload', index_cssr_1.default, styles_1.uploadLight, props, mergedClsPrefixRef);
        const rtlEnabledRef = (0, _mixins_1.useRtl)('Upload', mergedRtlRef, mergedClsPrefixRef);
        const formItem = (0, _mixins_1.useFormItem)(props);
        const uncontrolledFileListRef = (0, vue_1.ref)(props.defaultFileList);
        const controlledFileListRef = (0, vue_1.toRef)(props, 'fileList');
        const inputElRef = (0, vue_1.ref)(null);
        const draggerInsideRef = {
            value: false
        };
        const dragOverRef = (0, vue_1.ref)(false);
        const xhrMap = new Map();
        const _mergedFileListRef = (0, vooks_1.useMergedState)(controlledFileListRef, uncontrolledFileListRef);
        const mergedFileListRef = (0, vue_1.computed)(() => _mergedFileListRef.value.map(utils_1.createSettledFileInfo));
        const maxReachedRef = (0, vue_1.computed)(() => {
            const { max } = props;
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
            handleFileAddition(target.files
                ? Array.from(target.files).map(file => ({
                    file,
                    entry: null,
                    source: 'input'
                }))
                : null, e);
            // May have bug! set to null?
            target.value = '';
        }
        function doUpdateFileList(files) {
            const { 'onUpdate:fileList': _onUpdateFileList, onUpdateFileList } = props;
            if (_onUpdateFileList)
                (0, _utils_1.call)(_onUpdateFileList, files);
            if (onUpdateFileList)
                (0, _utils_1.call)(onUpdateFileList, files);
            uncontrolledFileListRef.value = files;
        }
        const mergedMultipleRef = (0, vue_1.computed)(() => props.multiple || props.directory);
        const doChange = (fileAfterChange, event, options = {
            append: false,
            remove: false
        }) => {
            const { append, remove } = options;
            const fileListAfterChange = Array.from(mergedFileListRef.value);
            const fileIndex = fileListAfterChange.findIndex(file => file.id === fileAfterChange.id);
            if (append || remove || ~fileIndex) {
                if (append) {
                    fileListAfterChange.push(fileAfterChange);
                }
                else if (remove) {
                    fileListAfterChange.splice(fileIndex, 1);
                }
                else {
                    fileListAfterChange.splice(fileIndex, 1, fileAfterChange);
                }
                const { onChange } = props;
                if (onChange) {
                    onChange({
                        file: fileAfterChange,
                        fileList: fileListAfterChange,
                        event
                    });
                }
                doUpdateFileList(fileListAfterChange);
            }
            else if (process.env.NODE_ENV !== 'production') {
                (0, _utils_1.warn)('upload', 'File has no corresponding id in current file list.');
            }
        };
        function handleFileAddition(fileAndEntries, e) {
            if (!fileAndEntries || fileAndEntries.length === 0)
                return;
            const { onBeforeUpload } = props;
            fileAndEntries = mergedMultipleRef.value
                ? fileAndEntries
                : [fileAndEntries[0]];
            const { max, accept } = props;
            fileAndEntries = fileAndEntries.filter(({ file, source }) => {
                if (source === 'dnd' && (accept === null || accept === void 0 ? void 0 : accept.trim())) {
                    return (0, utils_1.matchType)(file.name, file.type, accept);
                }
                else {
                    return true;
                }
            });
            if (max) {
                fileAndEntries = fileAndEntries.slice(0, max - mergedFileListRef.value.length);
            }
            const batchId = (0, seemly_1.createId)();
            void Promise.all(fileAndEntries.map((_a) => __awaiter(this, [_a], void 0, function* ({ file, entry }) {
                var _b;
                const fileInfo = {
                    id: (0, seemly_1.createId)(),
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
                if (!onBeforeUpload
                    || (yield onBeforeUpload({
                        file: fileInfo,
                        fileList: mergedFileListRef.value
                    })) !== false) {
                    return fileInfo;
                }
                return null;
            })))
                .then((fileInfos) => __awaiter(this, void 0, void 0, function* () {
                let nextTickChain = Promise.resolve();
                fileInfos.forEach((fileInfo) => {
                    nextTickChain = nextTickChain.then(vue_1.nextTick).then(() => {
                        if (fileInfo) {
                            doChange(fileInfo, e, {
                                append: true
                            });
                        }
                    });
                });
                yield nextTickChain;
            }))
                .then(() => {
                if (props.defaultUpload) {
                    submit();
                }
            });
        }
        function submit({ fileId, retry = false } = {}) {
            const { method, action, withCredentials, headers, data, name: fieldName } = props;
            const filesToUpload = fileId !== undefined
                ? mergedFileListRef.value.filter(file => file.id === fileId)
                : mergedFileListRef.value;
            const shouldReupload = retry || fileId !== undefined;
            filesToUpload.forEach((file) => {
                const { status } = file;
                if (status === 'pending' || (status === 'error' && shouldReupload)) {
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
                    }
                    else {
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
            if (file.thumbnailUrl)
                return file.thumbnailUrl;
            const { createThumbnailUrl } = props;
            if (createThumbnailUrl) {
                return (_a = createThumbnailUrl(file.file, file)) !== null && _a !== void 0 ? _a : (file.url || '');
            }
            if (file.url) {
                return file.url;
            }
            else if (file.file) {
                return (0, utils_1.createImageDataUrl)(file.file);
            }
            return '';
        }
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { common: { cubicBezierEaseInOut }, self: { draggerColor, draggerBorder, draggerBorderHover, itemColorHover, itemColorHoverError, itemTextColorError, itemTextColorSuccess, itemTextColor, itemIconColor, itemDisabledOpacity, lineHeight, borderRadius, fontSize, itemBorderImageCardError, itemBorderImageCard } } = themeRef.value;
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
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('upload', undefined, cssVarsRef, props)
            : undefined;
        (0, vue_1.provide)(interface_1.uploadInjectionKey, {
            mergedClsPrefixRef,
            mergedThemeRef: themeRef,
            showCancelButtonRef: (0, vue_1.toRef)(props, 'showCancelButton'),
            showDownloadButtonRef: (0, vue_1.toRef)(props, 'showDownloadButton'),
            showRemoveButtonRef: (0, vue_1.toRef)(props, 'showRemoveButton'),
            showRetryButtonRef: (0, vue_1.toRef)(props, 'showRetryButton'),
            onRemoveRef: (0, vue_1.toRef)(props, 'onRemove'),
            onDownloadRef: (0, vue_1.toRef)(props, 'onDownload'),
            customDownloadRef: (0, vue_1.toRef)(props, 'customDownload'),
            mergedFileListRef,
            triggerClassRef: (0, vue_1.toRef)(props, 'triggerClass'),
            triggerStyleRef: (0, vue_1.toRef)(props, 'triggerStyle'),
            shouldUseThumbnailUrlRef: (0, vue_1.toRef)(props, 'shouldUseThumbnailUrl'),
            renderIconRef: (0, vue_1.toRef)(props, 'renderIcon'),
            xhrMap,
            submit,
            doChange,
            showPreviewButtonRef: (0, vue_1.toRef)(props, 'showPreviewButton'),
            onPreviewRef: (0, vue_1.toRef)(props, 'onPreview'),
            getFileThumbnailUrlResolver,
            listTypeRef: (0, vue_1.toRef)(props, 'listType'),
            dragOverRef,
            openOpenFileDialog,
            draggerInsideRef,
            handleFileAddition,
            mergedDisabledRef: formItem.mergedDisabledRef,
            maxReachedRef,
            fileListClassRef: (0, vue_1.toRef)(props, 'fileListClass'),
            fileListStyleRef: (0, vue_1.toRef)(props, 'fileListStyle'),
            abstractRef: (0, vue_1.toRef)(props, 'abstract'),
            acceptRef: (0, vue_1.toRef)(props, 'accept'),
            cssVarsRef: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClassRef: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender,
            showTriggerRef: (0, vue_1.toRef)(props, 'showTrigger'),
            imageGroupPropsRef: (0, vue_1.toRef)(props, 'imageGroupProps'),
            mergedDirectoryDndRef: (0, vue_1.computed)(() => {
                var _a;
                return (_a = props.directoryDnd) !== null && _a !== void 0 ? _a : props.directory;
            }),
            onRetryRef: (0, vue_1.toRef)(props, 'onRetry')
        });
        const exposedMethods = {
            clear: () => {
                uncontrolledFileListRef.value = [];
            },
            submit,
            openOpenFileDialog
        };
        return Object.assign({ mergedClsPrefix: mergedClsPrefixRef, draggerInsideRef, rtlEnabled: rtlEnabledRef, inputElRef, mergedTheme: themeRef, dragOver: dragOverRef, mergedMultiple: mergedMultipleRef, cssVars: inlineThemeDisabled ? undefined : cssVarsRef, themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass, onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender, handleFileInputChange }, exposedMethods);
    },
    render() {
        var _a, _b;
        const { draggerInsideRef, mergedClsPrefix, $slots, directory, onRender } = this;
        if ($slots.default && !this.abstract) {
            const firstChild = $slots.default()[0];
            if ((_a = firstChild === null || firstChild === void 0 ? void 0 : firstChild.type) === null || _a === void 0 ? void 0 : _a[UploadDragger_1.uploadDraggerKey]) {
                draggerInsideRef.value = true;
            }
        }
        const inputNode = ((0, vue_1.h)("input", Object.assign({}, this.inputProps, { ref: "inputElRef", type: "file", class: `${mergedClsPrefix}-upload-file-input`, accept: this.accept, multiple: this.mergedMultiple, onChange: this.handleFileInputChange, 
            // @ts-expect-error // seems vue-tsc will add the prop, so we can't use expect-error
            webkitdirectory: directory || undefined, directory: directory || undefined })));
        if (this.abstract) {
            return ((0, vue_1.h)(vue_1.Fragment, null, (_b = $slots.default) === null || _b === void 0 ? void 0 :
                _b.call($slots),
                (0, vue_1.h)(vue_1.Teleport, { to: "body" }, inputNode)));
        }
        onRender === null || onRender === void 0 ? void 0 : onRender();
        return ((0, vue_1.h)("div", { class: [
                `${mergedClsPrefix}-upload`,
                this.rtlEnabled && `${mergedClsPrefix}-upload--rtl`,
                draggerInsideRef.value && `${mergedClsPrefix}-upload--dragger-inside`,
                this.dragOver && `${mergedClsPrefix}-upload--drag-over`,
                this.themeClass
            ], style: this.cssVars },
            inputNode,
            this.showTrigger && this.listType !== 'image-card' && ((0, vue_1.h)(UploadTrigger_1.default, null, $slots)),
            this.showFileList && (0, vue_1.h)(UploadFileList_1.default, null, $slots)));
    }
});
