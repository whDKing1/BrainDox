import { off, on } from 'evtd';
import { kebabCase } from 'lodash-es';
import { beforeNextFrameOnce } from 'seemly';
import { zindexable } from 'vdirs';
import { useIsMounted, useMergedState } from 'vooks';
import { computed, defineComponent, Fragment, h, inject, normalizeStyle, onBeforeUnmount, ref, toRef, toRefs, Transition, vShow, watch, withDirectives } from 'vue';
import { LazyTeleport } from 'vueuc';
import { NBaseIcon } from "../../_internal/index.mjs";
import { DownloadIcon, ResizeSmallIcon, RotateClockwiseIcon, RotateCounterclockwiseIcon, ZoomInIcon, ZoomOutIcon } from "../../_internal/icons/index.mjs";
import { useConfig, useLocale, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { call, download } from "../../_utils/index.mjs";
import { NTooltip } from "../../tooltip/index.mjs";
import { imageLight } from "../styles/index.mjs";
import { renderCloseIcon, renderNextIcon, renderPrevIcon } from "./icons.mjs";
import { imageContextKey, imagePreviewSharedProps } from "./interface.mjs";
import style from "./styles/index.cssr.mjs";
const BLEEDING = 32;
export const imagePreviewProps = Object.assign(Object.assign({}, imagePreviewSharedProps), {
  src: String,
  show: {
    type: Boolean,
    default: undefined
  },
  defaultShow: Boolean,
  'onUpdate:show': [Function, Array],
  onUpdateShow: [Function, Array],
  onNext: Function,
  onPrev: Function,
  onClose: [Function, Array]
});
export default defineComponent({
  name: 'ImagePreview',
  props: imagePreviewProps,
  setup(props) {
    const {
      src
    } = toRefs(props);
    const {
      mergedClsPrefixRef
    } = useConfig(props);
    const themeRef = useTheme('Image', '-image', style, imageLight, props, mergedClsPrefixRef);
    let thumbnailEl = null;
    const previewRef = ref(null);
    const previewWrapperRef = ref(null);
    const displayedRef = ref(false);
    const {
      localeRef
    } = useLocale('Image');
    const uncontrolledShowRef = ref(props.defaultShow);
    const controlledShowRef = toRef(props, 'show');
    const mergedShowRef = useMergedState(controlledShowRef, uncontrolledShowRef);
    function syncTransformOrigin() {
      const {
        value: previewWrapper
      } = previewWrapperRef;
      if (!thumbnailEl || !previewWrapper) return;
      const {
        style
      } = previewWrapper;
      const tbox = thumbnailEl.getBoundingClientRect();
      const tx = tbox.left + tbox.width / 2;
      const ty = tbox.top + tbox.height / 2;
      style.transformOrigin = `${tx}px ${ty}px`;
    }
    function handleKeydown(e) {
      var _a, _b;
      switch (e.key) {
        case ' ':
          e.preventDefault();
          break;
        case 'ArrowLeft':
          (_a = props.onPrev) === null || _a === void 0 ? void 0 : _a.call(props);
          break;
        case 'ArrowRight':
          (_b = props.onNext) === null || _b === void 0 ? void 0 : _b.call(props);
          break;
        case 'ArrowUp':
          e.preventDefault();
          zoomIn();
          break;
        case 'ArrowDown':
          e.preventDefault();
          zoomOut();
          break;
        case 'Escape':
          close();
          break;
      }
    }
    function doUpdateShow(value) {
      const {
        onUpdateShow,
        'onUpdate:show': _onUpdateShow
      } = props;
      if (onUpdateShow) {
        call(onUpdateShow, value);
      }
      if (_onUpdateShow) {
        call(_onUpdateShow, value);
      }
      uncontrolledShowRef.value = value;
      displayedRef.value = true;
    }
    watch(mergedShowRef, value => {
      if (value) {
        on('keydown', document, handleKeydown);
      } else {
        off('keydown', document, handleKeydown);
      }
    });
    onBeforeUnmount(() => {
      off('keydown', document, handleKeydown);
    });
    let startX = 0;
    let startY = 0;
    let offsetX = 0;
    let offsetY = 0;
    let startOffsetX = 0;
    let startOffsetY = 0;
    let mouseDownClientX = 0;
    let mouseDownClientY = 0;
    let dragging = false;
    function handleMouseMove(e) {
      const {
        clientX,
        clientY
      } = e;
      offsetX = clientX - startX;
      offsetY = clientY - startY;
      beforeNextFrameOnce(derivePreviewStyle);
    }
    function getMoveStrategy(opts) {
      const {
        mouseUpClientX,
        mouseUpClientY,
        mouseDownClientX,
        mouseDownClientY
      } = opts;
      const deltaHorizontal = mouseDownClientX - mouseUpClientX;
      const deltaVertical = mouseDownClientY - mouseUpClientY;
      const moveVerticalDirection = `vertical${deltaVertical > 0 ? 'Top' : 'Bottom'}`;
      const moveHorizontalDirection = `horizontal${deltaHorizontal > 0 ? 'Left' : 'Right'}`;
      return {
        moveVerticalDirection,
        moveHorizontalDirection,
        deltaHorizontal,
        deltaVertical
      };
    }
    // avoid image move outside viewport
    function getDerivedOffset(moveStrategy) {
      const {
        value: preview
      } = previewRef;
      if (!preview) return {
        offsetX: 0,
        offsetY: 0
      };
      const pbox = preview.getBoundingClientRect();
      const {
        moveVerticalDirection,
        moveHorizontalDirection,
        deltaHorizontal,
        deltaVertical
      } = moveStrategy || {};
      let nextOffsetX = 0;
      let nextOffsetY = 0;
      if (pbox.width <= window.innerWidth) {
        nextOffsetX = 0;
      } else if (pbox.left > 0) {
        nextOffsetX = (pbox.width - window.innerWidth) / 2;
      } else if (pbox.right < window.innerWidth) {
        nextOffsetX = -(pbox.width - window.innerWidth) / 2;
      } else if (moveHorizontalDirection === 'horizontalRight') {
        nextOffsetX = Math.min((pbox.width - window.innerWidth) / 2, startOffsetX - (deltaHorizontal !== null && deltaHorizontal !== void 0 ? deltaHorizontal : 0));
      } else {
        nextOffsetX = Math.max(-((pbox.width - window.innerWidth) / 2), startOffsetX - (deltaHorizontal !== null && deltaHorizontal !== void 0 ? deltaHorizontal : 0));
      }
      if (pbox.height <= window.innerHeight) {
        nextOffsetY = 0;
      } else if (pbox.top > 0) {
        nextOffsetY = (pbox.height - window.innerHeight) / 2;
      } else if (pbox.bottom < window.innerHeight) {
        nextOffsetY = -(pbox.height - window.innerHeight) / 2;
      } else if (moveVerticalDirection === 'verticalBottom') {
        nextOffsetY = Math.min((pbox.height - window.innerHeight) / 2, startOffsetY - (deltaVertical !== null && deltaVertical !== void 0 ? deltaVertical : 0));
      } else {
        nextOffsetY = Math.max(-((pbox.height - window.innerHeight) / 2), startOffsetY - (deltaVertical !== null && deltaVertical !== void 0 ? deltaVertical : 0));
      }
      return {
        offsetX: nextOffsetX,
        offsetY: nextOffsetY
      };
    }
    function handleMouseUp(e) {
      off('mousemove', document, handleMouseMove);
      off('mouseup', document, handleMouseUp);
      const {
        clientX: mouseUpClientX,
        clientY: mouseUpClientY
      } = e;
      dragging = false;
      const moveStrategy = getMoveStrategy({
        mouseUpClientX,
        mouseUpClientY,
        mouseDownClientX,
        mouseDownClientY
      });
      const offset = getDerivedOffset(moveStrategy);
      offsetX = offset.offsetX;
      offsetY = offset.offsetY;
      derivePreviewStyle();
    }
    const imageContext = inject(imageContextKey, null);
    function handlePreviewMousedown(e) {
      var _a, _b;
      (_b = (_a = imageContext === null || imageContext === void 0 ? void 0 : imageContext.previewedImgPropsRef.value) === null || _a === void 0 ? void 0 : _a.onMousedown) === null || _b === void 0 ? void 0 : _b.call(_a, e);
      if (e.button !== 0) return;
      const {
        clientX,
        clientY
      } = e;
      dragging = true;
      startX = clientX - offsetX;
      startY = clientY - offsetY;
      startOffsetX = offsetX;
      startOffsetY = offsetY;
      mouseDownClientX = clientX;
      mouseDownClientY = clientY;
      derivePreviewStyle();
      on('mousemove', document, handleMouseMove);
      on('mouseup', document, handleMouseUp);
    }
    const scaleRadix = 1.5;
    let scaleExp = 0;
    let scale = 1;
    let rotate = 0;
    function handlePreviewDblclick(e) {
      var _a, _b;
      (_b = (_a = imageContext === null || imageContext === void 0 ? void 0 : imageContext.previewedImgPropsRef.value) === null || _a === void 0 ? void 0 : _a.onDblclick) === null || _b === void 0 ? void 0 : _b.call(_a, e);
      const originalImageSizeScale = getOrignalImageSizeScale();
      scale = scale === originalImageSizeScale ? 1 : originalImageSizeScale;
      derivePreviewStyle();
    }
    function resetScale() {
      scale = 1;
      scaleExp = 0;
    }
    function handleSwitchPrev() {
      var _a;
      resetScale();
      rotate = 0;
      (_a = props.onPrev) === null || _a === void 0 ? void 0 : _a.call(props);
    }
    function handleSwitchNext() {
      var _a;
      resetScale();
      rotate = 0;
      (_a = props.onNext) === null || _a === void 0 ? void 0 : _a.call(props);
    }
    function rotateCounterclockwise() {
      rotate -= 90;
      derivePreviewStyle();
    }
    function rotateClockwise() {
      rotate += 90;
      derivePreviewStyle();
    }
    function getMaxScale() {
      const {
        value: preview
      } = previewRef;
      if (!preview) return 1;
      const {
        innerWidth,
        innerHeight
      } = window;
      const heightMaxScale = Math.max(1, preview.naturalHeight / (innerHeight - BLEEDING));
      const widthMaxScale = Math.max(1, preview.naturalWidth / (innerWidth - BLEEDING));
      return Math.max(3, heightMaxScale * 2, widthMaxScale * 2);
    }
    function getOrignalImageSizeScale() {
      const {
        value: preview
      } = previewRef;
      if (!preview) return 1;
      const {
        innerWidth,
        innerHeight
      } = window;
      const heightScale = preview.naturalHeight / (innerHeight - BLEEDING);
      const widthScale = preview.naturalWidth / (innerWidth - BLEEDING);
      if (heightScale < 1 && widthScale < 1) {
        return 1;
      }
      return Math.max(heightScale, widthScale);
    }
    function zoomIn() {
      const maxScale = getMaxScale();
      if (scale < maxScale) {
        scaleExp += 1;
        scale = Math.min(maxScale, Math.pow(scaleRadix, scaleExp));
        derivePreviewStyle();
      }
    }
    function zoomOut() {
      if (scale > 0.5) {
        const originalScale = scale;
        scaleExp -= 1;
        scale = Math.max(0.5, Math.pow(scaleRadix, scaleExp));
        const diff = originalScale - scale;
        derivePreviewStyle(false);
        const offset = getDerivedOffset();
        scale += diff;
        derivePreviewStyle(false);
        scale -= diff;
        offsetX = offset.offsetX;
        offsetY = offset.offsetY;
        derivePreviewStyle();
      }
    }
    function handleDownloadClick() {
      const imgSrc = src.value;
      if (imgSrc) {
        download(imgSrc, undefined);
      }
    }
    function derivePreviewStyle(transition = true) {
      var _a;
      const {
        value: preview
      } = previewRef;
      if (!preview) return;
      const {
        style
      } = preview;
      const controlledStyle = normalizeStyle((_a = imageContext === null || imageContext === void 0 ? void 0 : imageContext.previewedImgPropsRef.value) === null || _a === void 0 ? void 0 : _a.style);
      let controlledStyleString = '';
      if (typeof controlledStyle === 'string') {
        controlledStyleString = `${controlledStyle};`;
      } else {
        for (const key in controlledStyle) {
          controlledStyleString += `${kebabCase(key)}: ${controlledStyle[key]};`;
        }
      }
      const transformStyle = `transform-origin: center; transform: translateX(${offsetX}px) translateY(${offsetY}px) rotate(${rotate}deg) scale(${scale});`;
      if (dragging) {
        style.cssText = `${controlledStyleString}cursor: grabbing; transition: none;${transformStyle}`;
      } else {
        style.cssText = `${controlledStyleString}cursor: grab;${transformStyle}${transition ? '' : 'transition: none;'}`;
      }
      if (!transition) {
        void preview.offsetHeight;
      }
    }
    function close() {
      if (mergedShowRef.value) {
        const {
          onClose
        } = props;
        if (onClose) call(onClose);
        doUpdateShow(false);
        uncontrolledShowRef.value = false;
      }
    }
    function resizeToOrignalImageSize() {
      scale = getOrignalImageSizeScale();
      scaleExp = Math.ceil(Math.log(scale) / Math.log(scaleRadix));
      offsetX = 0;
      offsetY = 0;
      derivePreviewStyle();
    }
    const exposedMethods = {
      setThumbnailEl: el => {
        thumbnailEl = el;
      }
    };
    function withTooltip(node, tooltipKey) {
      if (props.showToolbarTooltip) {
        const {
          value: theme
        } = themeRef;
        return h(NTooltip, {
          to: false,
          theme: theme.peers.Tooltip,
          themeOverrides: theme.peerOverrides.Tooltip,
          keepAliveOnHover: false
        }, {
          default: () => {
            return localeRef.value[tooltipKey];
          },
          trigger: () => node
        });
      } else {
        return node;
      }
    }
    const cssVarsRef = computed(() => {
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: {
          toolbarIconColor,
          toolbarBorderRadius,
          toolbarBoxShadow,
          toolbarColor
        }
      } = themeRef.value;
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-toolbar-icon-color': toolbarIconColor,
        '--n-toolbar-color': toolbarColor,
        '--n-toolbar-border-radius': toolbarBorderRadius,
        '--n-toolbar-box-shadow': toolbarBoxShadow
      };
    });
    const {
      inlineThemeDisabled
    } = useConfig();
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('image-preview', undefined, cssVarsRef, props) : undefined;
    function handleWheel(event) {
      event.preventDefault();
    }
    return Object.assign({
      clsPrefix: mergedClsPrefixRef,
      previewRef,
      previewWrapperRef,
      previewSrc: src,
      mergedShow: mergedShowRef,
      appear: useIsMounted(),
      displayed: displayedRef,
      previewedImgProps: imageContext === null || imageContext === void 0 ? void 0 : imageContext.previewedImgPropsRef,
      handleWheel,
      handlePreviewMousedown,
      handlePreviewDblclick,
      syncTransformOrigin,
      handleAfterLeave: () => {
        resetScale();
        rotate = 0;
        displayedRef.value = false;
      },
      handleDragStart: e => {
        var _a, _b;
        (_b = (_a = imageContext === null || imageContext === void 0 ? void 0 : imageContext.previewedImgPropsRef.value) === null || _a === void 0 ? void 0 : _a.onDragstart) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        e.preventDefault();
      },
      zoomIn,
      zoomOut,
      handleDownloadClick,
      rotateCounterclockwise,
      rotateClockwise,
      handleSwitchPrev,
      handleSwitchNext,
      withTooltip,
      resizeToOrignalImageSize,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender,
      doUpdateShow,
      close
    }, exposedMethods);
  },
  render() {
    var _a, _b;
    const {
      clsPrefix,
      renderToolbar,
      withTooltip
    } = this;
    const prevNode = withTooltip(h(NBaseIcon, {
      clsPrefix: clsPrefix,
      onClick: this.handleSwitchPrev
    }, {
      default: renderPrevIcon
    }), 'tipPrevious');
    const nextNode = withTooltip(h(NBaseIcon, {
      clsPrefix: clsPrefix,
      onClick: this.handleSwitchNext
    }, {
      default: renderNextIcon
    }), 'tipNext');
    const rotateCounterclockwiseNode = withTooltip(h(NBaseIcon, {
      clsPrefix: clsPrefix,
      onClick: this.rotateCounterclockwise
    }, {
      default: () => h(RotateCounterclockwiseIcon, null)
    }), 'tipCounterclockwise');
    const rotateClockwiseNode = withTooltip(h(NBaseIcon, {
      clsPrefix: clsPrefix,
      onClick: this.rotateClockwise
    }, {
      default: () => h(RotateClockwiseIcon, null)
    }), 'tipClockwise');
    const originalSizeNode = withTooltip(h(NBaseIcon, {
      clsPrefix: clsPrefix,
      onClick: this.resizeToOrignalImageSize
    }, {
      default: () => {
        return h(ResizeSmallIcon, null);
      }
    }), 'tipOriginalSize');
    const zoomOutNode = withTooltip(h(NBaseIcon, {
      clsPrefix: clsPrefix,
      onClick: this.zoomOut
    }, {
      default: () => h(ZoomOutIcon, null)
    }), 'tipZoomOut');
    const downloadNode = withTooltip(h(NBaseIcon, {
      clsPrefix: clsPrefix,
      onClick: this.handleDownloadClick
    }, {
      default: () => h(DownloadIcon, null)
    }), 'tipDownload');
    const closeNode = withTooltip(h(NBaseIcon, {
      clsPrefix: clsPrefix,
      onClick: () => this.close()
    }, {
      default: renderCloseIcon
    }), 'tipClose');
    const zoomInNode = withTooltip(h(NBaseIcon, {
      clsPrefix: clsPrefix,
      onClick: this.zoomIn
    }, {
      default: () => h(ZoomInIcon, null)
    }), 'tipZoomIn');
    return h(Fragment, null, (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a), h(LazyTeleport, {
      show: this.mergedShow
    }, {
      default: () => {
        var _a;
        if (!(this.mergedShow || this.displayed)) {
          return null;
        }
        (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
        return withDirectives(h("div", {
          ref: "containerRef",
          class: [`${clsPrefix}-image-preview-container`, this.themeClass],
          style: this.cssVars,
          onWheel: this.handleWheel
        }, h(Transition, {
          name: "fade-in-transition",
          appear: this.appear
        }, {
          default: () => this.mergedShow ? h("div", {
            class: `${clsPrefix}-image-preview-overlay`,
            onClick: () => this.close()
          }) : null
        }), this.showToolbar ? h(Transition, {
          name: "fade-in-transition",
          appear: this.appear
        }, {
          default: () => {
            if (!this.mergedShow) return null;
            return h("div", {
              class: `${clsPrefix}-image-preview-toolbar`
            }, renderToolbar ? renderToolbar({
              nodes: {
                prev: prevNode,
                next: nextNode,
                rotateCounterclockwise: rotateCounterclockwiseNode,
                rotateClockwise: rotateClockwiseNode,
                resizeToOriginalSize: originalSizeNode,
                zoomOut: zoomOutNode,
                zoomIn: zoomInNode,
                download: downloadNode,
                close: closeNode
              }
            }) : h(Fragment, null, this.onPrev ? h(Fragment, null, prevNode, nextNode) : null, rotateCounterclockwiseNode, rotateClockwiseNode, originalSizeNode, zoomOutNode, zoomInNode, downloadNode, closeNode));
          }
        }) : null, h(Transition, {
          name: "fade-in-scale-up-transition",
          onAfterLeave: this.handleAfterLeave,
          appear: this.appear,
          // BUG:
          // onEnter will be called twice, I don't know why
          // Maybe it is a bug of vue
          onEnter: this.syncTransformOrigin,
          onBeforeLeave: this.syncTransformOrigin
        }, {
          default: () => {
            const {
              previewedImgProps = {}
            } = this;
            return withDirectives(h("div", {
              class: `${clsPrefix}-image-preview-wrapper`,
              ref: "previewWrapperRef"
            }, h("img", Object.assign({}, previewedImgProps, {
              draggable: false,
              onMousedown: this.handlePreviewMousedown,
              onDblclick: this.handlePreviewDblclick,
              class: [`${clsPrefix}-image-preview`, previewedImgProps.class],
              key: this.previewSrc,
              src: this.previewSrc,
              ref: "previewRef",
              onDragstart: this.handleDragStart
            }))), [[vShow, this.mergedShow]]);
          }
        })), [[zindexable, {
          enabled: this.mergedShow
        }]]);
      }
    }));
  }
});