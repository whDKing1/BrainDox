"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageProps = void 0;
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const is_native_lazy_load_1 = require("../../_utils/env/is-native-lazy-load");
const ImageGroup_1 = require("./ImageGroup");
const ImagePreview_1 = __importDefault(require("./ImagePreview"));
const interface_1 = require("./interface");
const utils_1 = require("./utils");
exports.imageProps = Object.assign({ alt: String, height: [String, Number], imgProps: Object, previewedImgProps: Object, lazy: Boolean, intersectionObserverOptions: Object, objectFit: {
        type: String,
        default: 'fill'
    }, previewSrc: String, fallbackSrc: String, width: [String, Number], src: String, previewDisabled: Boolean, loadDescription: String, onError: Function, onLoad: Function }, interface_1.imagePreviewSharedProps);
let uuid = 0;
exports.default = (0, vue_1.defineComponent)({
    name: 'Image',
    props: exports.imageProps,
    slots: Object,
    inheritAttrs: false,
    setup(props) {
        const imageRef = (0, vue_1.ref)(null);
        const showErrorRef = (0, vue_1.ref)(false);
        const previewInstRef = (0, vue_1.ref)(null);
        const imageGroupHandle = (0, vue_1.inject)(ImageGroup_1.imageGroupInjectionKey, null);
        const { mergedClsPrefixRef } = imageGroupHandle || (0, _mixins_1.useConfig)(props);
        const mergedPreviewSrcRef = (0, vue_1.computed)(() => {
            return props.previewSrc || props.src;
        });
        const previewShowRef = (0, vue_1.ref)(false);
        const imageId = uuid++;
        const showPreview = () => {
            if (props.previewDisabled || showErrorRef.value)
                return;
            if (imageGroupHandle) {
                imageGroupHandle.setThumbnailEl(imageRef.value);
                imageGroupHandle.toggleShow(`r${imageId}`);
                return;
            }
            const { value: previewInst } = previewInstRef;
            if (!previewInst)
                return;
            previewInst.setThumbnailEl(imageRef.value);
            previewShowRef.value = true;
        };
        const exposedMethods = {
            click: () => {
                showPreview();
            },
            showPreview
        };
        const shouldStartLoadingRef = (0, vue_1.ref)(!props.lazy);
        (0, vue_1.onMounted)(() => {
            var _a;
            (_a = imageRef.value) === null || _a === void 0 ? void 0 : _a.setAttribute('data-group-id', (imageGroupHandle === null || imageGroupHandle === void 0 ? void 0 : imageGroupHandle.groupId) || '');
        });
        (0, vue_1.onMounted)(() => {
            // Use IntersectionObserver if lazy and intersectionObserverOptions is set
            if (props.lazy && props.intersectionObserverOptions) {
                let unobserve;
                const stopWatchHandle = (0, vue_1.watchEffect)(() => {
                    unobserve === null || unobserve === void 0 ? void 0 : unobserve();
                    unobserve = undefined;
                    unobserve = (0, utils_1.observeIntersection)(imageRef.value, props.intersectionObserverOptions, shouldStartLoadingRef);
                });
                (0, vue_1.onBeforeUnmount)(() => {
                    stopWatchHandle();
                    unobserve === null || unobserve === void 0 ? void 0 : unobserve();
                });
            }
        });
        (0, vue_1.watchEffect)(() => {
            var _a;
            void (props.src || ((_a = props.imgProps) === null || _a === void 0 ? void 0 : _a.src));
            showErrorRef.value = false;
        });
        (0, vue_1.watchEffect)((onInvalidate) => {
            var _a;
            const unregister = (_a = imageGroupHandle === null || imageGroupHandle === void 0 ? void 0 : imageGroupHandle.registerImageUrl) === null || _a === void 0 ? void 0 : _a.call(imageGroupHandle, imageId, mergedPreviewSrcRef.value || '');
            onInvalidate(() => {
                unregister === null || unregister === void 0 ? void 0 : unregister();
            });
        });
        function onImgClick(e) {
            var _a, _b;
            exposedMethods.showPreview();
            (_b = (_a = props.imgProps) === null || _a === void 0 ? void 0 : _a.onClick) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        }
        function onPreviewClose() {
            previewShowRef.value = false;
        }
        const loadedRef = (0, vue_1.ref)(false);
        (0, vue_1.provide)(interface_1.imageContextKey, {
            previewedImgPropsRef: (0, vue_1.toRef)(props, 'previewedImgProps')
        });
        return Object.assign({ mergedClsPrefix: mergedClsPrefixRef, groupId: imageGroupHandle === null || imageGroupHandle === void 0 ? void 0 : imageGroupHandle.groupId, previewInstRef,
            imageRef, mergedPreviewSrc: mergedPreviewSrcRef, showError: showErrorRef, shouldStartLoading: shouldStartLoadingRef, loaded: loadedRef, mergedOnClick: (e) => {
                onImgClick(e);
            }, onPreviewClose, mergedOnError: (e) => {
                if (!shouldStartLoadingRef.value)
                    return;
                showErrorRef.value = true;
                const { onError, imgProps: { onError: imgPropsOnError } = {} } = props;
                onError === null || onError === void 0 ? void 0 : onError(e);
                imgPropsOnError === null || imgPropsOnError === void 0 ? void 0 : imgPropsOnError(e);
            }, mergedOnLoad: (e) => {
                const { onLoad, imgProps: { onLoad: imgPropsOnLoad } = {} } = props;
                onLoad === null || onLoad === void 0 ? void 0 : onLoad(e);
                imgPropsOnLoad === null || imgPropsOnLoad === void 0 ? void 0 : imgPropsOnLoad(e);
                loadedRef.value = true;
            }, previewShow: previewShowRef }, exposedMethods);
    },
    render() {
        var _a, _b;
        const { mergedClsPrefix, imgProps = {}, loaded, $attrs, lazy } = this;
        const errorNode = (0, _utils_1.resolveSlot)(this.$slots.error, () => []);
        const placeholderNode = (_b = (_a = this.$slots).placeholder) === null || _b === void 0 ? void 0 : _b.call(_a);
        const loadSrc = this.src || imgProps.src;
        const imgNode = this.showError && errorNode.length
            ? errorNode
            : (0, vue_1.h)('img', Object.assign(Object.assign({}, imgProps), { ref: 'imageRef', width: this.width || imgProps.width, height: this.height || imgProps.height, src: this.showError
                    ? this.fallbackSrc
                    : lazy && this.intersectionObserverOptions
                        ? this.shouldStartLoading
                            ? loadSrc
                            : undefined
                        : loadSrc, alt: this.alt || imgProps.alt, 'aria-label': this.alt || imgProps.alt, onClick: this.mergedOnClick, onError: this.mergedOnError, onLoad: this.mergedOnLoad, 
                // If interseciton observer options is set, do not use native lazy
                loading: is_native_lazy_load_1.isImageSupportNativeLazy
                    && lazy
                    && !this.intersectionObserverOptions
                    ? 'lazy'
                    : 'eager', style: [
                    imgProps.style || '',
                    placeholderNode && !loaded
                        ? { height: '0', width: '0', visibility: 'hidden' }
                        : '',
                    { objectFit: this.objectFit }
                ], 'data-error': this.showError, 'data-preview-src': this.previewSrc || this.src }));
        return ((0, vue_1.h)("div", Object.assign({}, $attrs, { role: "none", class: [
                $attrs.class,
                `${mergedClsPrefix}-image`,
                (this.previewDisabled || this.showError)
                    && `${mergedClsPrefix}-image--preview-disabled`
            ] }),
            this.groupId ? (imgNode) : ((0, vue_1.h)(ImagePreview_1.default, { theme: this.theme, themeOverrides: this.themeOverrides, ref: "previewInstRef", showToolbar: this.showToolbar, showToolbarTooltip: this.showToolbarTooltip, renderToolbar: this.renderToolbar, src: this.mergedPreviewSrc, show: !this.previewDisabled && this.previewShow, onClose: this.onPreviewClose }, {
                default: () => imgNode
            })),
            !loaded && placeholderNode));
    }
});
