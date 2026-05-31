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
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const icons_1 = require("../../_internal/icons");
const _utils_1 = require("../../_utils");
const button_1 = require("../../button");
const image_1 = require("../../image");
const icons_2 = require("./icons");
const interface_1 = require("./interface");
const UploadProgress_1 = __importDefault(require("./UploadProgress"));
const utils_1 = require("./utils");
const buttonThemeOverrides = {
    paddingMedium: '0 3px',
    heightMedium: '24px',
    iconSizeMedium: '18px'
};
exports.default = (0, vue_1.defineComponent)({
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
        const NUpload = (0, vue_1.inject)(interface_1.uploadInjectionKey);
        const imageRef = (0, vue_1.ref)(null);
        const thumbnailUrlRef = (0, vue_1.ref)('');
        const progressStatusRef = (0, vue_1.computed)(() => {
            const { file } = props;
            if (file.status === 'finished')
                return 'success';
            if (file.status === 'error')
                return 'error';
            return 'info';
        });
        const buttonTypeRef = (0, vue_1.computed)(() => {
            const { file } = props;
            if (file.status === 'error')
                return 'error';
            return undefined;
        });
        const showProgressRef = (0, vue_1.computed)(() => {
            const { file } = props;
            return file.status === 'uploading';
        });
        const showCancelButtonRef = (0, vue_1.computed)(() => {
            if (!NUpload.showCancelButtonRef.value)
                return false;
            const { file } = props;
            return ['uploading', 'pending', 'error'].includes(file.status);
        });
        const showRemoveButtonRef = (0, vue_1.computed)(() => {
            if (!NUpload.showRemoveButtonRef.value)
                return false;
            const { file } = props;
            return ['finished'].includes(file.status);
        });
        const showDownloadButtonRef = (0, vue_1.computed)(() => {
            if (!NUpload.showDownloadButtonRef.value)
                return false;
            const { file } = props;
            return ['finished'].includes(file.status);
        });
        const showRetryButtonRef = (0, vue_1.computed)(() => {
            if (!NUpload.showRetryButtonRef.value)
                return false;
            const { file } = props;
            return ['error'].includes(file.status);
        });
        const mergedThumbnailUrlRef = (0, vooks_1.useMemo)(() => {
            return thumbnailUrlRef.value || props.file.thumbnailUrl || props.file.url;
        });
        const showPreviewButtonRef = (0, vue_1.computed)(() => {
            if (!NUpload.showPreviewButtonRef.value)
                return false;
            const { file: { status }, listType } = props;
            return (['finished'].includes(status)
                && mergedThumbnailUrlRef.value
                && listType === 'image-card');
        });
        function handleRetryClick() {
            return __awaiter(this, void 0, void 0, function* () {
                const onRetry = NUpload.onRetryRef.value;
                if (onRetry) {
                    const onRetryReturn = yield onRetry({ file: props.file });
                    if (onRetryReturn === false) {
                        return;
                    }
                }
                NUpload.submit({ fileId: props.file.id });
            });
        }
        function handleRemoveOrCancelClick(e) {
            e.preventDefault();
            const { file } = props;
            if (['finished', 'pending', 'error'].includes(file.status)) {
                handleRemove(file);
            }
            else if (['uploading'].includes(file.status)) {
                handleAbort(file);
            }
            else {
                (0, _utils_1.warn)('upload', 'The button clicked type is unknown.');
            }
        }
        function handleDownloadClick(e) {
            e.preventDefault();
            handleDownload(props.file);
        }
        function handleRemove(file) {
            const { xhrMap, doChange, onRemoveRef: { value: onRemove }, mergedFileListRef: { value: mergedFileList } } = NUpload;
            void Promise.resolve(onRemove
                ? onRemove({
                    file: Object.assign({}, file),
                    fileList: mergedFileList,
                    index: props.index
                })
                : true).then((result) => {
                if (result === false)
                    return;
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
            const { onDownloadRef: { value: onDownload }, customDownloadRef: { value: customDownload } } = NUpload;
            void Promise.resolve(onDownload ? onDownload(Object.assign({}, file)) : true).then((res) => {
                if (res !== false) {
                    if (customDownload) {
                        customDownload(Object.assign({}, file));
                    }
                    else {
                        (0, _utils_1.download)(file.url, file.name);
                    }
                }
            });
        }
        function handleAbort(file) {
            const { xhrMap } = NUpload;
            const xhr = xhrMap.get(file.id);
            xhr === null || xhr === void 0 ? void 0 : xhr.abort();
            handleRemove(Object.assign({}, file));
        }
        function handlePreviewClick(e) {
            const { onPreviewRef: { value: onPreview } } = NUpload;
            if (onPreview) {
                onPreview(props.file, {
                    event: e
                });
            }
            else if (props.listType === 'image-card') {
                const { value } = imageRef;
                if (!value)
                    return;
                value.showPreview();
            }
        }
        const deriveFileThumbnailUrl = () => __awaiter(this, void 0, void 0, function* () {
            const { listType } = props;
            if (listType !== 'image' && listType !== 'image-card') {
                return;
            }
            if (NUpload.shouldUseThumbnailUrlRef.value(props.file)) {
                thumbnailUrlRef.value = yield NUpload.getFileThumbnailUrlResolver(props.file);
            }
        });
        (0, vue_1.watchEffect)(() => {
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
        const { clsPrefix, mergedTheme, listType, file, renderIcon } = this;
        // if there is text list type, show file icon
        let icon;
        const isImageType = listType === 'image';
        const isImageCardType = listType === 'image-card';
        if (isImageType || isImageCardType) {
            icon
                = !this.shouldUseThumbnailUrl(file) || !this.mergedThumbnailUrl ? ((0, vue_1.h)("span", { class: `${clsPrefix}-upload-file-info__thumbnail` }, renderIcon ? (renderIcon(file)) : (0, utils_1.isImageFile)(file) ? ((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: clsPrefix }, { default: icons_2.renderImageIcon })) : ((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: clsPrefix }, { default: icons_2.renderDocumentIcon })))) : ((0, vue_1.h)("a", { rel: "noopener noreferer", target: "_blank", href: file.url || undefined, class: `${clsPrefix}-upload-file-info__thumbnail`, onClick: this.handlePreviewClick }, listType === 'image-card' ? ((0, vue_1.h)(image_1.NImage, { src: this.mergedThumbnailUrl || undefined, previewSrc: file.url || undefined, alt: file.name, ref: "imageRef" })) : ((0, vue_1.h)("img", { src: this.mergedThumbnailUrl || undefined, alt: file.name }))));
        }
        else {
            icon = ((0, vue_1.h)("span", { class: `${clsPrefix}-upload-file-info__thumbnail` }, renderIcon ? (renderIcon(file)) : ((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: clsPrefix }, { default: () => (0, vue_1.h)(icons_1.AttachIcon, null) }))));
        }
        const progress = ((0, vue_1.h)(UploadProgress_1.default, { show: this.showProgress, percentage: file.percentage || 0, status: this.progressStatus }));
        const showName = listType === 'text' || listType === 'image';
        return ((0, vue_1.h)("div", { class: [
                `${clsPrefix}-upload-file`,
                `${clsPrefix}-upload-file--${this.progressStatus}-status`,
                file.url
                    && file.status !== 'error'
                    && listType !== 'image-card'
                    && `${clsPrefix}-upload-file--with-url`,
                `${clsPrefix}-upload-file--${listType}-type`
            ] },
            (0, vue_1.h)("div", { class: `${clsPrefix}-upload-file-info` },
                icon,
                (0, vue_1.h)("div", { class: `${clsPrefix}-upload-file-info__name` },
                    showName
                        && (file.url && file.status !== 'error' ? ((0, vue_1.h)("a", { rel: "noopener noreferer", target: "_blank", href: file.url || undefined, onClick: this.handlePreviewClick }, file.name)) : ((0, vue_1.h)("span", { onClick: this.handlePreviewClick }, file.name))),
                    isImageType && progress),
                (0, vue_1.h)("div", { class: [
                        `${clsPrefix}-upload-file-info__action`,
                        `${clsPrefix}-upload-file-info__action--${listType}-type`
                    ] },
                    this.showPreviewButton ? ((0, vue_1.h)(button_1.NButton, { key: "preview", quaternary: true, type: this.buttonType, onClick: this.handlePreviewClick, theme: mergedTheme.peers.Button, themeOverrides: mergedTheme.peerOverrides.Button, builtinThemeOverrides: buttonThemeOverrides }, {
                        icon: () => ((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: clsPrefix }, { default: () => (0, vue_1.h)(icons_1.EyeIcon, null) }))
                    })) : null,
                    (this.showRemoveButton || this.showCancelButton)
                        && !this.disabled && ((0, vue_1.h)(button_1.NButton, { key: "cancelOrTrash", theme: mergedTheme.peers.Button, themeOverrides: mergedTheme.peerOverrides.Button, quaternary: true, builtinThemeOverrides: buttonThemeOverrides, type: this.buttonType, onClick: this.handleRemoveOrCancelClick }, {
                        icon: () => ((0, vue_1.h)(_internal_1.NIconSwitchTransition, null, {
                            default: () => this.showRemoveButton ? ((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: clsPrefix, key: "trash" }, { default: () => (0, vue_1.h)(icons_1.TrashIcon, null) })) : ((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: clsPrefix, key: "cancel" }, { default: () => (0, vue_1.h)(icons_1.CancelIcon, null) }))
                        }))
                    })),
                    this.showRetryButton && !this.disabled && ((0, vue_1.h)(button_1.NButton, { key: "retry", quaternary: true, type: this.buttonType, onClick: this.handleRetryClick, theme: mergedTheme.peers.Button, themeOverrides: mergedTheme.peerOverrides.Button, builtinThemeOverrides: buttonThemeOverrides }, {
                        icon: () => ((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: clsPrefix }, { default: () => (0, vue_1.h)(icons_1.RetryIcon, null) }))
                    })),
                    this.showDownloadButton ? ((0, vue_1.h)(button_1.NButton, { key: "download", quaternary: true, type: this.buttonType, onClick: this.handleDownloadClick, theme: mergedTheme.peers.Button, themeOverrides: mergedTheme.peerOverrides.Button, builtinThemeOverrides: buttonThemeOverrides }, {
                        icon: () => ((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: clsPrefix }, { default: () => (0, vue_1.h)(icons_1.DownloadIcon, null) }))
                    })) : null)),
            !isImageType && progress));
    }
});
