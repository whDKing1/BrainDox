"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imagePreviewProps = void 0;
const evtd_1 = require("evtd");
const lodash_1 = require("lodash");
const seemly_1 = require("seemly");
const vdirs_1 = require("vdirs");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const vueuc_1 = require("vueuc");
const _internal_1 = require("../../_internal");
const icons_1 = require("../../_internal/icons");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const tooltip_1 = require("../../tooltip");
const styles_1 = require("../styles");
const icons_2 = require("./icons");
const interface_1 = require("./interface");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
const BLEEDING = 32;
exports.imagePreviewProps = Object.assign(Object.assign({}, interface_1.imagePreviewSharedProps), { src: String, show: {
        type: Boolean,
        default: undefined
    }, defaultShow: Boolean, 'onUpdate:show': [Function, Array], onUpdateShow: [Function, Array], onNext: Function, onPrev: Function, onClose: [Function, Array] });
exports.default = (0, vue_1.defineComponent)({
    name: 'ImagePreview',
    props: exports.imagePreviewProps,
    setup(props) {
        const { src } = (0, vue_1.toRefs)(props);
        const { mergedClsPrefixRef } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Image', '-image', index_cssr_1.default, styles_1.imageLight, props, mergedClsPrefixRef);
        let thumbnailEl = null;
        const previewRef = (0, vue_1.ref)(null);
        const previewWrapperRef = (0, vue_1.ref)(null);
        const displayedRef = (0, vue_1.ref)(false);
        const { localeRef } = (0, _mixins_1.useLocale)('Image');
        const uncontrolledShowRef = (0, vue_1.ref)(props.defaultShow);
        const controlledShowRef = (0, vue_1.toRef)(props, 'show');
        const mergedShowRef = (0, vooks_1.useMergedState)(controlledShowRef, uncontrolledShowRef);
        function syncTransformOrigin() {
            const { value: previewWrapper } = previewWrapperRef;
            if (!thumbnailEl || !previewWrapper)
                return;
            const { style } = previewWrapper;
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
            const { onUpdateShow, 'onUpdate:show': _onUpdateShow } = props;
            if (onUpdateShow) {
                (0, _utils_1.call)(onUpdateShow, value);
            }
            if (_onUpdateShow) {
                (0, _utils_1.call)(_onUpdateShow, value);
            }
            uncontrolledShowRef.value = value;
            displayedRef.value = true;
        }
        (0, vue_1.watch)(mergedShowRef, (value) => {
            if (value) {
                (0, evtd_1.on)('keydown', document, handleKeydown);
            }
            else {
                (0, evtd_1.off)('keydown', document, handleKeydown);
            }
        });
        (0, vue_1.onBeforeUnmount)(() => {
            (0, evtd_1.off)('keydown', document, handleKeydown);
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
            const { clientX, clientY } = e;
            offsetX = clientX - startX;
            offsetY = clientY - startY;
            (0, seemly_1.beforeNextFrameOnce)(derivePreviewStyle);
        }
        function getMoveStrategy(opts) {
            const { mouseUpClientX, mouseUpClientY, mouseDownClientX, mouseDownClientY } = opts;
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
            const { value: preview } = previewRef;
            if (!preview)
                return { offsetX: 0, offsetY: 0 };
            const pbox = preview.getBoundingClientRect();
            const { moveVerticalDirection, moveHorizontalDirection, deltaHorizontal, deltaVertical } = moveStrategy || {};
            let nextOffsetX = 0;
            let nextOffsetY = 0;
            if (pbox.width <= window.innerWidth) {
                nextOffsetX = 0;
            }
            else if (pbox.left > 0) {
                nextOffsetX = (pbox.width - window.innerWidth) / 2;
            }
            else if (pbox.right < window.innerWidth) {
                nextOffsetX = -(pbox.width - window.innerWidth) / 2;
            }
            else if (moveHorizontalDirection === 'horizontalRight') {
                nextOffsetX = Math.min((pbox.width - window.innerWidth) / 2, startOffsetX - (deltaHorizontal !== null && deltaHorizontal !== void 0 ? deltaHorizontal : 0));
            }
            else {
                nextOffsetX = Math.max(-((pbox.width - window.innerWidth) / 2), startOffsetX - (deltaHorizontal !== null && deltaHorizontal !== void 0 ? deltaHorizontal : 0));
            }
            if (pbox.height <= window.innerHeight) {
                nextOffsetY = 0;
            }
            else if (pbox.top > 0) {
                nextOffsetY = (pbox.height - window.innerHeight) / 2;
            }
            else if (pbox.bottom < window.innerHeight) {
                nextOffsetY = -(pbox.height - window.innerHeight) / 2;
            }
            else if (moveVerticalDirection === 'verticalBottom') {
                nextOffsetY = Math.min((pbox.height - window.innerHeight) / 2, startOffsetY - (deltaVertical !== null && deltaVertical !== void 0 ? deltaVertical : 0));
            }
            else {
                nextOffsetY = Math.max(-((pbox.height - window.innerHeight) / 2), startOffsetY - (deltaVertical !== null && deltaVertical !== void 0 ? deltaVertical : 0));
            }
            return {
                offsetX: nextOffsetX,
                offsetY: nextOffsetY
            };
        }
        function handleMouseUp(e) {
            (0, evtd_1.off)('mousemove', document, handleMouseMove);
            (0, evtd_1.off)('mouseup', document, handleMouseUp);
            const { clientX: mouseUpClientX, clientY: mouseUpClientY } = e;
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
        const imageContext = (0, vue_1.inject)(interface_1.imageContextKey, null);
        function handlePreviewMousedown(e) {
            var _a, _b;
            (_b = (_a = imageContext === null || imageContext === void 0 ? void 0 : imageContext.previewedImgPropsRef.value) === null || _a === void 0 ? void 0 : _a.onMousedown) === null || _b === void 0 ? void 0 : _b.call(_a, e);
            if (e.button !== 0)
                return;
            const { clientX, clientY } = e;
            dragging = true;
            startX = clientX - offsetX;
            startY = clientY - offsetY;
            startOffsetX = offsetX;
            startOffsetY = offsetY;
            mouseDownClientX = clientX;
            mouseDownClientY = clientY;
            derivePreviewStyle();
            (0, evtd_1.on)('mousemove', document, handleMouseMove);
            (0, evtd_1.on)('mouseup', document, handleMouseUp);
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
            const { value: preview } = previewRef;
            if (!preview)
                return 1;
            const { innerWidth, innerHeight } = window;
            const heightMaxScale = Math.max(1, preview.naturalHeight / (innerHeight - BLEEDING));
            const widthMaxScale = Math.max(1, preview.naturalWidth / (innerWidth - BLEEDING));
            return Math.max(3, heightMaxScale * 2, widthMaxScale * 2);
        }
        function getOrignalImageSizeScale() {
            const { value: preview } = previewRef;
            if (!preview)
                return 1;
            const { innerWidth, innerHeight } = window;
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
                (0, _utils_1.download)(imgSrc, undefined);
            }
        }
        function derivePreviewStyle(transition = true) {
            var _a;
            const { value: preview } = previewRef;
            if (!preview)
                return;
            const { style } = preview;
            const controlledStyle = (0, vue_1.normalizeStyle)((_a = imageContext === null || imageContext === void 0 ? void 0 : imageContext.previewedImgPropsRef.value) === null || _a === void 0 ? void 0 : _a.style);
            let controlledStyleString = '';
            if (typeof controlledStyle === 'string') {
                controlledStyleString = `${controlledStyle};`;
            }
            else {
                for (const key in controlledStyle) {
                    controlledStyleString += `${(0, lodash_1.kebabCase)(key)}: ${controlledStyle[key]};`;
                }
            }
            const transformStyle = `transform-origin: center; transform: translateX(${offsetX}px) translateY(${offsetY}px) rotate(${rotate}deg) scale(${scale});`;
            if (dragging) {
                style.cssText = `${controlledStyleString}cursor: grabbing; transition: none;${transformStyle}`;
            }
            else {
                style.cssText = `${controlledStyleString}cursor: grab;${transformStyle}${transition ? '' : 'transition: none;'}`;
            }
            if (!transition) {
                void preview.offsetHeight;
            }
        }
        function close() {
            if (mergedShowRef.value) {
                const { onClose } = props;
                if (onClose)
                    (0, _utils_1.call)(onClose);
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
            setThumbnailEl: (el) => {
                thumbnailEl = el;
            }
        };
        function withTooltip(node, tooltipKey) {
            if (props.showToolbarTooltip) {
                const { value: theme } = themeRef;
                return ((0, vue_1.h)(tooltip_1.NTooltip, { to: false, theme: theme.peers.Tooltip, themeOverrides: theme.peerOverrides.Tooltip, keepAliveOnHover: false }, {
                    default: () => {
                        return localeRef.value[tooltipKey];
                    },
                    trigger: () => node
                }));
            }
            else {
                return node;
            }
        }
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { common: { cubicBezierEaseInOut }, self: { toolbarIconColor, toolbarBorderRadius, toolbarBoxShadow, toolbarColor } } = themeRef.value;
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-toolbar-icon-color': toolbarIconColor,
                '--n-toolbar-color': toolbarColor,
                '--n-toolbar-border-radius': toolbarBorderRadius,
                '--n-toolbar-box-shadow': toolbarBoxShadow
            };
        });
        const { inlineThemeDisabled } = (0, _mixins_1.useConfig)();
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('image-preview', undefined, cssVarsRef, props)
            : undefined;
        function handleWheel(event) {
            event.preventDefault();
        }
        return Object.assign({ clsPrefix: mergedClsPrefixRef, previewRef,
            previewWrapperRef, previewSrc: src, mergedShow: mergedShowRef, appear: (0, vooks_1.useIsMounted)(), displayed: displayedRef, previewedImgProps: imageContext === null || imageContext === void 0 ? void 0 : imageContext.previewedImgPropsRef, handleWheel,
            handlePreviewMousedown,
            handlePreviewDblclick,
            syncTransformOrigin, handleAfterLeave: () => {
                resetScale();
                rotate = 0;
                displayedRef.value = false;
            }, handleDragStart: (e) => {
                var _a, _b;
                (_b = (_a = imageContext === null || imageContext === void 0 ? void 0 : imageContext.previewedImgPropsRef.value) === null || _a === void 0 ? void 0 : _a.onDragstart) === null || _b === void 0 ? void 0 : _b.call(_a, e);
                e.preventDefault();
            }, zoomIn,
            zoomOut,
            handleDownloadClick,
            rotateCounterclockwise,
            rotateClockwise,
            handleSwitchPrev,
            handleSwitchNext,
            withTooltip,
            resizeToOrignalImageSize, cssVars: inlineThemeDisabled ? undefined : cssVarsRef, themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass, onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender, doUpdateShow,
            close }, exposedMethods);
    },
    render() {
        var _a, _b;
        const { clsPrefix, renderToolbar, withTooltip } = this;
        const prevNode = withTooltip((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: clsPrefix, onClick: this.handleSwitchPrev }, { default: icons_2.renderPrevIcon }), 'tipPrevious');
        const nextNode = withTooltip((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: clsPrefix, onClick: this.handleSwitchNext }, { default: icons_2.renderNextIcon }), 'tipNext');
        const rotateCounterclockwiseNode = withTooltip((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: clsPrefix, onClick: this.rotateCounterclockwise }, {
            default: () => (0, vue_1.h)(icons_1.RotateCounterclockwiseIcon, null)
        }), 'tipCounterclockwise');
        const rotateClockwiseNode = withTooltip((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: clsPrefix, onClick: this.rotateClockwise }, {
            default: () => (0, vue_1.h)(icons_1.RotateClockwiseIcon, null)
        }), 'tipClockwise');
        const originalSizeNode = withTooltip((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: clsPrefix, onClick: this.resizeToOrignalImageSize }, {
            default: () => {
                return (0, vue_1.h)(icons_1.ResizeSmallIcon, null);
            }
        }), 'tipOriginalSize');
        const zoomOutNode = withTooltip((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: clsPrefix, onClick: this.zoomOut }, { default: () => (0, vue_1.h)(icons_1.ZoomOutIcon, null) }), 'tipZoomOut');
        const downloadNode = withTooltip((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: clsPrefix, onClick: this.handleDownloadClick }, { default: () => (0, vue_1.h)(icons_1.DownloadIcon, null) }), 'tipDownload');
        const closeNode = withTooltip((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: clsPrefix, onClick: () => this.close() }, { default: icons_2.renderCloseIcon }), 'tipClose');
        const zoomInNode = withTooltip((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: clsPrefix, onClick: this.zoomIn }, { default: () => (0, vue_1.h)(icons_1.ZoomInIcon, null) }), 'tipZoomIn');
        return ((0, vue_1.h)(vue_1.Fragment, null, (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 :
            _b.call(_a),
            (0, vue_1.h)(vueuc_1.LazyTeleport, { show: this.mergedShow }, {
                default: () => {
                    var _a;
                    if (!(this.mergedShow || this.displayed)) {
                        return null;
                    }
                    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
                    return (0, vue_1.withDirectives)((0, vue_1.h)("div", { ref: "containerRef", class: [
                            `${clsPrefix}-image-preview-container`,
                            this.themeClass
                        ], style: this.cssVars, onWheel: this.handleWheel },
                        (0, vue_1.h)(vue_1.Transition, { name: "fade-in-transition", appear: this.appear }, {
                            default: () => this.mergedShow ? ((0, vue_1.h)("div", { class: `${clsPrefix}-image-preview-overlay`, onClick: () => this.close() })) : null
                        }),
                        this.showToolbar ? ((0, vue_1.h)(vue_1.Transition, { name: "fade-in-transition", appear: this.appear }, {
                            default: () => {
                                if (!this.mergedShow)
                                    return null;
                                return ((0, vue_1.h)("div", { class: `${clsPrefix}-image-preview-toolbar` }, renderToolbar ? (renderToolbar({
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
                                })) : ((0, vue_1.h)(vue_1.Fragment, null,
                                    this.onPrev ? ((0, vue_1.h)(vue_1.Fragment, null,
                                        prevNode,
                                        nextNode)) : null,
                                    rotateCounterclockwiseNode,
                                    rotateClockwiseNode,
                                    originalSizeNode,
                                    zoomOutNode,
                                    zoomInNode,
                                    downloadNode,
                                    closeNode))));
                            }
                        })) : null,
                        (0, vue_1.h)(vue_1.Transition, { name: "fade-in-scale-up-transition", onAfterLeave: this.handleAfterLeave, appear: this.appear, 
                            // BUG:
                            // onEnter will be called twice, I don't know why
                            // Maybe it is a bug of vue
                            onEnter: this.syncTransformOrigin, onBeforeLeave: this.syncTransformOrigin }, {
                            default: () => {
                                const { previewedImgProps = {} } = this;
                                return (0, vue_1.withDirectives)((0, vue_1.h)("div", { class: `${clsPrefix}-image-preview-wrapper`, ref: "previewWrapperRef" },
                                    (0, vue_1.h)("img", Object.assign({}, previewedImgProps, { draggable: false, onMousedown: this.handlePreviewMousedown, onDblclick: this.handlePreviewDblclick, class: [
                                            `${clsPrefix}-image-preview`,
                                            previewedImgProps.class
                                        ], key: this.previewSrc, src: this.previewSrc, ref: "previewRef", onDragstart: this.handleDragStart }))), [[vue_1.vShow, this.mergedShow]]);
                            }
                        })), [[vdirs_1.zindexable, { enabled: this.mergedShow }]]);
                }
            })));
    }
});
