"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadDraggerKey = void 0;
const vue_1 = require("vue");
const _utils_1 = require("../../_utils");
const interface_1 = require("./interface");
exports.uploadDraggerKey = '__UPLOAD_DRAGGER__';
exports.default = (0, vue_1.defineComponent)({
    name: 'UploadDragger',
    [exports.uploadDraggerKey]: true,
    setup(_, { slots }) {
        const NUpload = (0, vue_1.inject)(interface_1.uploadInjectionKey, null);
        if (!NUpload) {
            (0, _utils_1.throwError)('upload-dragger', '`n-upload-dragger` must be placed inside `n-upload`.');
        }
        return () => {
            const { mergedClsPrefixRef: { value: mergedClsPrefix }, mergedDisabledRef: { value: mergedDisabled }, maxReachedRef: { value: maxReached } } = NUpload;
            return ((0, vue_1.h)("div", { class: [
                    `${mergedClsPrefix}-upload-dragger`,
                    (mergedDisabled || maxReached)
                        && `${mergedClsPrefix}-upload-dragger--disabled`
                ] }, slots));
        };
    }
});
