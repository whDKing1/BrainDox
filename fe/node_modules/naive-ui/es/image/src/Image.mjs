import { computed, defineComponent, h, inject, onBeforeUnmount, onMounted, provide, ref, toRef, watchEffect } from 'vue';
import { useConfig } from "../../_mixins/index.mjs";
import { resolveSlot } from "../../_utils/index.mjs";
import { isImageSupportNativeLazy } from "../../_utils/env/is-native-lazy-load.mjs";
import { imageGroupInjectionKey } from "./ImageGroup.mjs";
import NImagePreview from "./ImagePreview.mjs";
import { imageContextKey, imagePreviewSharedProps } from "./interface.mjs";
import { observeIntersection } from "./utils.mjs";
export const imageProps = Object.assign({
  alt: String,
  height: [String, Number],
  imgProps: Object,
  previewedImgProps: Object,
  lazy: Boolean,
  intersectionObserverOptions: Object,
  objectFit: {
    type: String,
    default: 'fill'
  },
  previewSrc: String,
  fallbackSrc: String,
  width: [String, Number],
  src: String,
  previewDisabled: Boolean,
  loadDescription: String,
  onError: Function,
  onLoad: Function
}, imagePreviewSharedProps);
let uuid = 0;
export default defineComponent({
  name: 'Image',
  props: imageProps,
  slots: Object,
  inheritAttrs: false,
  setup(props) {
    const imageRef = ref(null);
    const showErrorRef = ref(false);
    const previewInstRef = ref(null);
    const imageGroupHandle = inject(imageGroupInjectionKey, null);
    const {
      mergedClsPrefixRef
    } = imageGroupHandle || useConfig(props);
    const mergedPreviewSrcRef = computed(() => {
      return props.previewSrc || props.src;
    });
    const previewShowRef = ref(false);
    const imageId = uuid++;
    const showPreview = () => {
      if (props.previewDisabled || showErrorRef.value) return;
      if (imageGroupHandle) {
        imageGroupHandle.setThumbnailEl(imageRef.value);
        imageGroupHandle.toggleShow(`r${imageId}`);
        return;
      }
      const {
        value: previewInst
      } = previewInstRef;
      if (!previewInst) return;
      previewInst.setThumbnailEl(imageRef.value);
      previewShowRef.value = true;
    };
    const exposedMethods = {
      click: () => {
        showPreview();
      },
      showPreview
    };
    const shouldStartLoadingRef = ref(!props.lazy);
    onMounted(() => {
      var _a;
      (_a = imageRef.value) === null || _a === void 0 ? void 0 : _a.setAttribute('data-group-id', (imageGroupHandle === null || imageGroupHandle === void 0 ? void 0 : imageGroupHandle.groupId) || '');
    });
    onMounted(() => {
      // Use IntersectionObserver if lazy and intersectionObserverOptions is set
      if (props.lazy && props.intersectionObserverOptions) {
        let unobserve;
        const stopWatchHandle = watchEffect(() => {
          unobserve === null || unobserve === void 0 ? void 0 : unobserve();
          unobserve = undefined;
          unobserve = observeIntersection(imageRef.value, props.intersectionObserverOptions, shouldStartLoadingRef);
        });
        onBeforeUnmount(() => {
          stopWatchHandle();
          unobserve === null || unobserve === void 0 ? void 0 : unobserve();
        });
      }
    });
    watchEffect(() => {
      var _a;
      void (props.src || ((_a = props.imgProps) === null || _a === void 0 ? void 0 : _a.src));
      showErrorRef.value = false;
    });
    watchEffect(onInvalidate => {
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
    const loadedRef = ref(false);
    provide(imageContextKey, {
      previewedImgPropsRef: toRef(props, 'previewedImgProps')
    });
    return Object.assign({
      mergedClsPrefix: mergedClsPrefixRef,
      groupId: imageGroupHandle === null || imageGroupHandle === void 0 ? void 0 : imageGroupHandle.groupId,
      previewInstRef,
      imageRef,
      mergedPreviewSrc: mergedPreviewSrcRef,
      showError: showErrorRef,
      shouldStartLoading: shouldStartLoadingRef,
      loaded: loadedRef,
      mergedOnClick: e => {
        onImgClick(e);
      },
      onPreviewClose,
      mergedOnError: e => {
        if (!shouldStartLoadingRef.value) return;
        showErrorRef.value = true;
        const {
          onError,
          imgProps: {
            onError: imgPropsOnError
          } = {}
        } = props;
        onError === null || onError === void 0 ? void 0 : onError(e);
        imgPropsOnError === null || imgPropsOnError === void 0 ? void 0 : imgPropsOnError(e);
      },
      mergedOnLoad: e => {
        const {
          onLoad,
          imgProps: {
            onLoad: imgPropsOnLoad
          } = {}
        } = props;
        onLoad === null || onLoad === void 0 ? void 0 : onLoad(e);
        imgPropsOnLoad === null || imgPropsOnLoad === void 0 ? void 0 : imgPropsOnLoad(e);
        loadedRef.value = true;
      },
      previewShow: previewShowRef
    }, exposedMethods);
  },
  render() {
    var _a, _b;
    const {
      mergedClsPrefix,
      imgProps = {},
      loaded,
      $attrs,
      lazy
    } = this;
    const errorNode = resolveSlot(this.$slots.error, () => []);
    const placeholderNode = (_b = (_a = this.$slots).placeholder) === null || _b === void 0 ? void 0 : _b.call(_a);
    const loadSrc = this.src || imgProps.src;
    const imgNode = this.showError && errorNode.length ? errorNode : h('img', Object.assign(Object.assign({}, imgProps), {
      ref: 'imageRef',
      width: this.width || imgProps.width,
      height: this.height || imgProps.height,
      src: this.showError ? this.fallbackSrc : lazy && this.intersectionObserverOptions ? this.shouldStartLoading ? loadSrc : undefined : loadSrc,
      alt: this.alt || imgProps.alt,
      'aria-label': this.alt || imgProps.alt,
      onClick: this.mergedOnClick,
      onError: this.mergedOnError,
      onLoad: this.mergedOnLoad,
      // If interseciton observer options is set, do not use native lazy
      loading: isImageSupportNativeLazy && lazy && !this.intersectionObserverOptions ? 'lazy' : 'eager',
      style: [imgProps.style || '', placeholderNode && !loaded ? {
        height: '0',
        width: '0',
        visibility: 'hidden'
      } : '', {
        objectFit: this.objectFit
      }],
      'data-error': this.showError,
      'data-preview-src': this.previewSrc || this.src
    }));
    return h("div", Object.assign({}, $attrs, {
      role: "none",
      class: [$attrs.class, `${mergedClsPrefix}-image`, (this.previewDisabled || this.showError) && `${mergedClsPrefix}-image--preview-disabled`]
    }), this.groupId ? imgNode : h(NImagePreview, {
      theme: this.theme,
      themeOverrides: this.themeOverrides,
      ref: "previewInstRef",
      showToolbar: this.showToolbar,
      showToolbarTooltip: this.showToolbarTooltip,
      renderToolbar: this.renderToolbar,
      src: this.mergedPreviewSrc,
      show: !this.previewDisabled && this.previewShow,
      onClose: this.onPreviewClose
    }, {
      default: () => imgNode
    }), !loaded && placeholderNode);
  }
});