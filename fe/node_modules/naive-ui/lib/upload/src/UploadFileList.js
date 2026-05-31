"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const _utils_1 = require("../../_utils");
const image_1 = require("../../image");
const interface_1 = require("./interface");
const UploadFile_1 = __importDefault(require("./UploadFile"));
const UploadTrigger_1 = __importDefault(require("./UploadTrigger"));
exports.default = (0, vue_1.defineComponent)({
    name: 'UploadFileList',
    setup(_, { slots }) {
        const NUpload = (0, vue_1.inject)(interface_1.uploadInjectionKey, null);
        if (!NUpload) {
            (0, _utils_1.throwError)('upload-file-list', '`n-upload-file-list` must be placed inside `n-upload`.');
        }
        const { abstractRef, mergedClsPrefixRef, listTypeRef, mergedFileListRef, fileListClassRef, fileListStyleRef, cssVarsRef, themeClassRef, maxReachedRef, showTriggerRef, imageGroupPropsRef } = NUpload;
        const isImageCardTypeRef = (0, vue_1.computed)(() => listTypeRef.value === 'image-card');
        const renderFileList = () => mergedFileListRef.value.map((file, index) => ((0, vue_1.h)(UploadFile_1.default, { clsPrefix: mergedClsPrefixRef.value, key: file.id, file: file, index: index, listType: listTypeRef.value })));
        const renderUploadFileList = () => isImageCardTypeRef.value ? ((0, vue_1.h)(image_1.NImageGroup, Object.assign({}, imageGroupPropsRef.value), { default: renderFileList })) : ((0, vue_1.h)(_internal_1.NFadeInExpandTransition, { group: true }, {
            default: renderFileList
        }));
        return () => {
            const { value: mergedClsPrefix } = mergedClsPrefixRef;
            const { value: abstract } = abstractRef;
            return ((0, vue_1.h)("div", { class: [
                    `${mergedClsPrefix}-upload-file-list`,
                    isImageCardTypeRef.value
                        && `${mergedClsPrefix}-upload-file-list--grid`,
                    abstract ? themeClassRef === null || themeClassRef === void 0 ? void 0 : themeClassRef.value : undefined,
                    fileListClassRef.value
                ], style: [
                    abstract && cssVarsRef ? cssVarsRef.value : '',
                    fileListStyleRef.value
                ] },
                renderUploadFileList(),
                showTriggerRef.value
                    && !maxReachedRef.value
                    && isImageCardTypeRef.value && ((0, vue_1.h)(UploadTrigger_1.default, null, slots))));
        };
    }
});
