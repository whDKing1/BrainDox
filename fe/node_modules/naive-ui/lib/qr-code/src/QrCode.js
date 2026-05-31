"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.qrCodeProps = void 0;
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const styles_1 = require("../styles");
const qrcodegen_1 = __importDefault(require("./qrcodegen"));
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
const ERROR_CORRECTION_LEVEL = {
    L: qrcodegen_1.default.QrCode.Ecc.LOW,
    M: qrcodegen_1.default.QrCode.Ecc.MEDIUM,
    Q: qrcodegen_1.default.QrCode.Ecc.QUARTILE,
    H: qrcodegen_1.default.QrCode.Ecc.HIGH
};
exports.qrCodeProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { value: String, color: {
        type: String,
        default: '#000'
    }, backgroundColor: {
        type: String,
        default: '#FFF'
    }, iconSrc: String, iconSize: {
        type: Number,
        default: 40
    }, iconBackgroundColor: {
        type: String,
        default: '#FFF'
    }, iconBorderRadius: {
        type: Number,
        default: 4
    }, size: {
        type: Number,
        default: 100
    }, padding: {
        type: [Number, String],
        default: 12
    }, errorCorrectionLevel: {
        type: String,
        default: 'M'
    }, type: {
        type: String,
        default: 'canvas'
    } });
// For retina display
const UPSCALE_RATIO = 2;
exports.default = (0, vue_1.defineComponent)({
    name: 'QrCode',
    props: exports.qrCodeProps,
    setup(props) {
        const { mergedClsPrefixRef, inlineThemeDisabled } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('QrCode', '-qr-code', index_cssr_1.default, styles_1.qrcodeLight, props, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            return {
                '--n-border-radius': themeRef.value.self.borderRadius
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('qr-code', undefined, cssVarsRef, props)
            : undefined;
        const canvasRef = (0, vue_1.ref)();
        const qr = (0, vue_1.computed)(() => {
            var _a;
            const errorCorrectionLevel = ERROR_CORRECTION_LEVEL[props.errorCorrectionLevel];
            return qrcodegen_1.default.QrCode.encodeText((_a = props.value) !== null && _a !== void 0 ? _a : '-', errorCorrectionLevel);
        });
        (0, vue_1.onMounted)(() => {
            const imageLoadedTrigger = (0, vue_1.ref)(0);
            let loadedIcon = null;
            (0, vue_1.watchEffect)(() => {
                if (props.type === 'svg')
                    return;
                void imageLoadedTrigger.value;
                drawCanvas(qr.value, props.size, props.color, props.backgroundColor, loadedIcon
                    ? {
                        icon: loadedIcon,
                        iconBorderRadius: props.iconBorderRadius,
                        iconSize: props.iconSize,
                        iconBackgroundColor: props.iconBackgroundColor
                    }
                    : null);
            });
            (0, vue_1.watchEffect)(() => {
                if (props.type === 'svg')
                    return;
                const { iconSrc } = props;
                if (iconSrc) {
                    let aborted = false;
                    const img = new Image();
                    img.src = iconSrc;
                    img.onload = () => {
                        if (aborted)
                            return;
                        loadedIcon = img;
                        imageLoadedTrigger.value++;
                    };
                    return () => {
                        aborted = true;
                    };
                }
            });
        });
        function drawCanvas(qr, size, foregroundColor, backgroundColor, iconConfig) {
            const canvas = canvasRef.value;
            if (!canvas)
                return;
            const canvasWidth = size * UPSCALE_RATIO;
            const width = qr.size;
            const scale = canvasWidth / width;
            canvas.width = canvasWidth;
            canvas.height = canvasWidth;
            const ctx = canvas.getContext('2d');
            if (!ctx)
                return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let y = 0; y < qr.size; y++) {
                for (let x = 0; x < qr.size; x++) {
                    ctx.fillStyle = qr.getModule(x, y) ? foregroundColor : backgroundColor;
                    const startX = Math.floor(x * scale);
                    const endX = Math.ceil((x + 1) * scale);
                    const startY = Math.floor(y * scale);
                    const endY = Math.ceil((y + 1) * scale);
                    ctx.fillRect(startX, startY, endX - startX, endY - startY);
                }
            }
            if (iconConfig) {
                const { icon, iconBackgroundColor, iconBorderRadius, iconSize } = iconConfig;
                const finalIconSize = iconSize * UPSCALE_RATIO;
                const centerX = (canvas.width - finalIconSize) / 2;
                const centerY = (canvas.height - finalIconSize) / 2;
                ctx.fillStyle = iconBackgroundColor;
                ctx.beginPath();
                ctx.roundRect(centerX, centerY, finalIconSize, finalIconSize, iconBorderRadius * UPSCALE_RATIO);
                ctx.fill();
                const aspectRatio = icon.width / icon.height;
                const scaledWidth = aspectRatio >= 1 ? finalIconSize : finalIconSize * aspectRatio;
                const scaledHeight = aspectRatio <= 1 ? finalIconSize : finalIconSize / aspectRatio;
                const left = centerX + (finalIconSize - scaledWidth) / 2;
                const top = centerY + (finalIconSize - scaledHeight) / 2;
                ctx.drawImage(icon, left, top, scaledWidth, scaledHeight);
            }
        }
        function generatePath(modules, margin = 0) {
            const ops = [];
            modules.forEach((row, y) => {
                let start = null;
                row.forEach((cell, x) => {
                    if (!cell && start !== null) {
                        // M0 0h7v1H0z injects the space with the move and drops the comma,
                        // saving a char per operation
                        ops.push(`M${start + margin} ${y + margin}h${x - start}v1H${start + margin}z`);
                        start = null;
                        return;
                    }
                    // end of row, clean up or skip
                    if (x === row.length - 1) {
                        if (!cell) {
                            // We would have closed the op above already so this can only mean
                            // 2+ light modules in a row.
                            return;
                        }
                        if (start === null) {
                            // Just a single dark module.
                            ops.push(`M${x + margin},${y + margin} h1v1H${x + margin}z`);
                        }
                        else {
                            // Otherwise finish the current line.
                            ops.push(`M${start + margin},${y + margin} h${x + 1 - start}v1H${start + margin}z`);
                        }
                        return;
                    }
                    if (cell && start === null) {
                        start = x;
                    }
                });
            });
            return ops.join('');
        }
        function svgInfo(qr, size, iconConfig) {
            const cells = qr.getModules();
            const numCells = cells.length;
            const cellsToDraw = cells;
            let svgInnerHtml = '';
            const path1Html = `<path fill="transparent" d="M0,0 h${numCells}v${numCells}H0z" shape-rendering="crispEdges"></path>`;
            const path2Html = `<path fill="${props.color}" d="${generatePath(cellsToDraw, 0)}" shape-rendering="crispEdges"></path>`;
            let iconHtml = '';
            if (iconConfig) {
                const { iconSrc, iconSize } = iconConfig;
                const DEFAULT_IMG_SCALE = 0.1;
                const defaultSize = Math.floor(size * DEFAULT_IMG_SCALE);
                const scale = numCells / size;
                const h = (iconSize || defaultSize) * scale;
                const w = (iconSize || defaultSize) * scale;
                const x = cells.length / 2 - w / 2;
                const y = cells.length / 2 - h / 2;
                iconHtml += `<image href="${iconSrc}" width="${w}" height="${h}" x="${x}" y="${y}" preserveAspectRatio="none"></image>`;
            }
            svgInnerHtml += path1Html;
            svgInnerHtml += path2Html;
            svgInnerHtml += iconHtml;
            return {
                innerHtml: svgInnerHtml,
                numCells
            };
        }
        const svgInfoRef = (0, vue_1.computed)(() => svgInfo(qr.value, props.size, props.iconSrc
            ? {
                iconSrc: props.iconSrc,
                iconBorderRadius: props.iconBorderRadius,
                iconSize: props.iconSize,
                iconBackgroundColor: props.iconBackgroundColor
            }
            : null));
        return {
            canvasRef,
            mergedClsPrefix: mergedClsPrefixRef,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            svgInfo: svgInfoRef
        };
    },
    render() {
        const { mergedClsPrefix, backgroundColor, padding, cssVars, themeClass, size, type } = this;
        return ((0, vue_1.h)("div", { class: [`${mergedClsPrefix}-qr-code`, themeClass], style: Object.assign({ padding: typeof padding === 'number' ? `${padding}px` : padding, backgroundColor, width: `${size}px`, height: `${size}px` }, cssVars) }, type === 'canvas' ? ((0, vue_1.h)("canvas", { ref: "canvasRef", style: {
                width: `${size}px`,
                height: `${size}px`
            } })) : ((0, vue_1.h)("svg", { height: size, width: size, viewBox: `0 0 ${this.svgInfo.numCells} ${this.svgInfo.numCells}`, role: "img", innerHTML: this.svgInfo.innerHtml }))));
    }
});
