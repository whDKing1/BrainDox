"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.watermarkProps = void 0;
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
function getRatio(context) {
    if (!context) {
        return 1;
    }
    const backingStore = context.backingStorePixelRatio
        || context.webkitBackingStorePixelRatio
        || context.mozBackingStorePixelRatio
        || context.msBackingStorePixelRatio
        || context.oBackingStorePixelRatio
        || context.backingStorePixelRatio
        || 1;
    return (window.devicePixelRatio || 1) / backingStore;
}
exports.watermarkProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { debug: Boolean, cross: Boolean, fullscreen: Boolean, width: {
        type: Number,
        default: 32
    }, height: {
        type: Number,
        default: 32
    }, zIndex: {
        type: Number,
        default: 10
    }, xGap: {
        type: Number,
        default: 0
    }, yGap: {
        type: Number,
        default: 0
    }, yOffset: {
        type: Number,
        default: 0
    }, xOffset: {
        type: Number,
        default: 0
    }, rotate: {
        type: Number,
        default: 0
    }, textAlign: {
        type: String,
        default: 'left'
    }, image: String, imageOpacity: { type: Number, default: 1 }, imageHeight: Number, imageWidth: Number, content: String, selectable: {
        type: Boolean,
        default: true
    }, fontSize: {
        type: Number,
        default: 14
    }, fontFamily: String, fontStyle: {
        type: String,
        default: 'normal'
    }, fontVariant: {
        type: String,
        default: ''
    }, fontWeight: {
        type: Number,
        default: 400
    }, fontColor: {
        type: String,
        default: 'rgba(128, 128, 128, .3)'
    }, fontStretch: {
        type: String,
        default: ''
    }, lineHeight: {
        type: Number,
        default: 14
    }, globalRotate: {
        type: Number,
        default: 0
    } });
exports.default = (0, vue_1.defineComponent)({
    name: 'Watermark',
    props: exports.watermarkProps,
    setup(props, { slots }) {
        const { mergedClsPrefixRef } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Watermark', '-watermark', index_cssr_1.default, styles_1.watermarkLight, props, mergedClsPrefixRef);
        const base64UrlRef = (0, vue_1.ref)('');
        const canvas = _utils_1.isBrowser ? document.createElement('canvas') : null;
        const ctx = canvas ? canvas.getContext('2d') : null;
        const fontsReadyRef = (0, vue_1.ref)(false);
        (0, vooks_1.onFontsReady)(() => (fontsReadyRef.value = true));
        (0, vue_1.watchEffect)(() => {
            if (!canvas)
                return;
            void fontsReadyRef.value;
            const ratio = getRatio(ctx);
            const { xGap, yGap, width, height, yOffset, xOffset, rotate, image, content, fontColor, fontStyle, fontVariant, fontStretch, fontWeight, fontFamily, fontSize, lineHeight, debug } = props;
            const canvasWidth = (xGap + width) * ratio;
            const canvasHeight = (yGap + height) * ratio;
            const canvasOffsetLeft = xOffset * ratio;
            const canvasOffsetTop = yOffset * ratio;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            if (ctx) {
                ctx.translate(0, 0);
                const markWidth = width * ratio;
                const markHeight = height * ratio;
                if (debug) {
                    ctx.strokeStyle = 'grey';
                    ctx.strokeRect(0, 0, markWidth, markHeight);
                }
                ctx.rotate(rotate * (Math.PI / 180));
                if (image) {
                    const img = new Image();
                    img.crossOrigin = 'anonymous';
                    img.referrerPolicy = 'no-referrer';
                    img.src = image;
                    img.onload = () => {
                        ctx.globalAlpha = props.imageOpacity;
                        const { imageWidth, imageHeight } = props;
                        ctx.drawImage(img, canvasOffsetLeft, canvasOffsetTop, (props.imageWidth
                            || (imageHeight
                                ? (img.width * imageHeight) / img.height
                                : img.width)) * ratio, (props.imageHeight
                            || (imageWidth
                                ? (img.height * imageWidth) / img.width
                                : img.height)) * ratio);
                        base64UrlRef.value = canvas.toDataURL();
                    };
                }
                else if (content) {
                    if (debug) {
                        ctx.strokeStyle = 'green';
                        ctx.strokeRect(0, 0, markWidth, markHeight);
                    }
                    ctx.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontStretch} ${fontSize * ratio}px/${lineHeight * ratio}px ${fontFamily || themeRef.value.self.fontFamily}`;
                    ctx.fillStyle = fontColor;
                    let maxWidth = 0;
                    const { textAlign } = props;
                    content
                        .split('\n')
                        .map((line) => {
                        const width = ctx.measureText(line).width;
                        maxWidth = Math.max(maxWidth, width);
                        return {
                            width,
                            line
                        };
                    })
                        .forEach(({ line, width }, index) => {
                        const alignOffset = textAlign === 'left'
                            ? 0
                            : textAlign === 'center'
                                ? (maxWidth - width) / 2
                                : maxWidth - width;
                        ctx.fillText(line, canvasOffsetLeft + alignOffset, canvasOffsetTop + lineHeight * ratio * (index + 1));
                    });
                    base64UrlRef.value = canvas.toDataURL();
                }
                else if (!content) {
                    // For example, you are using the input box to customize the watermark
                    // content, but after clearing the input box, the content is empty,
                    // and the canvas content is empty. Clear canvas when content is empty
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    base64UrlRef.value = canvas.toDataURL();
                }
            }
            else {
                (0, _utils_1.warnOnce)('watermark', 'Canvas is not supported in the browser.');
            }
        });
        return () => {
            var _a;
            const { globalRotate, fullscreen, zIndex } = props;
            const mergedClsPrefix = mergedClsPrefixRef.value;
            const isFullScreenGlobalRotate = globalRotate !== 0 && fullscreen;
            const rotatedImageOffset = 'max(142vh, 142vw)';
            const watermarkNode = ((0, vue_1.h)("div", { class: [
                    `${mergedClsPrefix}-watermark`,
                    globalRotate !== 0 && `${mergedClsPrefix}-watermark--global-rotate`,
                    fullscreen && `${mergedClsPrefix}-watermark--fullscreen`
                ], style: {
                    transform: globalRotate
                        ? `translateX(-50%) translateY(-50%) rotate(${globalRotate}deg)`
                        : undefined,
                    zIndex: isFullScreenGlobalRotate ? undefined : zIndex,
                    backgroundSize: `${props.xGap + props.width}px`,
                    backgroundPosition: globalRotate === 0
                        ? props.cross
                            ? `${props.width / 2}px ${props.height / 2}px, 0 0`
                            : ''
                        : props.cross
                            ? `calc(${rotatedImageOffset} + ${props.width / 2}px) calc(${rotatedImageOffset} + ${props.height / 2}px), ${rotatedImageOffset} ${rotatedImageOffset}`
                            : rotatedImageOffset,
                    backgroundImage: props.cross
                        ? `url(${base64UrlRef.value}), url(${base64UrlRef.value})`
                        : `url(${base64UrlRef.value})`
                } }));
            if (props.fullscreen && !globalRotate)
                return watermarkNode;
            return ((0, vue_1.h)("div", { class: [
                    `${mergedClsPrefix}-watermark-container`,
                    globalRotate !== 0
                        && `${mergedClsPrefix}-watermark-container--global-rotate`,
                    fullscreen && `${mergedClsPrefix}-watermark-container--fullscreen`,
                    props.selectable
                        && `${mergedClsPrefix}-watermark-container--selectable`
                ], style: {
                    zIndex: isFullScreenGlobalRotate ? zIndex : undefined
                } }, (_a = slots.default) === null || _a === void 0 ? void 0 :
                _a.call(slots),
                watermarkNode));
        };
    }
});
