"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitProps = void 0;
const evtd_1 = require("evtd");
const seemly_1 = require("seemly");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const use_config_1 = __importDefault(require("../../_mixins/use-config"));
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.splitProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { direction: {
        type: String,
        default: 'horizontal'
    }, resizeTriggerSize: {
        type: Number,
        default: 3
    }, disabled: Boolean, defaultSize: {
        type: [String, Number],
        default: 0.5
    }, 'onUpdate:size': [Function, Array], onUpdateSize: [Function, Array], size: [String, Number], min: {
        type: [String, Number],
        default: 0
    }, max: {
        type: [String, Number],
        default: 1
    }, pane1Class: String, pane1Style: [Object, String], pane2Class: String, pane2Style: [Object, String], onDragStart: Function, onDragMove: Function, onDragEnd: Function, watchProps: Array });
exports.default = (0, vue_1.defineComponent)({
    name: 'Split',
    props: exports.splitProps,
    slots: Object,
    setup(props) {
        var _a;
        const { mergedClsPrefixRef, inlineThemeDisabled } = (0, use_config_1.default)(props);
        const themeRef = (0, _mixins_1.useTheme)('Split', '-split', index_cssr_1.default, styles_1.splitLight, props, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { common: { cubicBezierEaseInOut }, self: { resizableTriggerColor, resizableTriggerColorHover } } = themeRef.value;
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-resize-trigger-color': resizableTriggerColor,
                '--n-resize-trigger-color-hover': resizableTriggerColorHover
            };
        });
        const resizeTriggerElRef = (0, vue_1.ref)(null);
        const isDraggingRef = (0, vue_1.ref)(false);
        const controlledSizeRef = (0, vue_1.toRef)(props, 'size');
        const uncontrolledSizeRef = (0, vue_1.ref)(props.defaultSize);
        if ((_a = props.watchProps) === null || _a === void 0 ? void 0 : _a.includes('defaultSize')) {
            (0, vue_1.watchEffect)(() => (uncontrolledSizeRef.value = props.defaultSize));
        }
        // use to update controlled or uncontrolled values
        const doUpdateSize = (size) => {
            const _onUpdateSize = props['onUpdate:size'];
            if (props.onUpdateSize)
                (0, _utils_1.call)(props.onUpdateSize, size);
            if (_onUpdateSize)
                (0, _utils_1.call)(_onUpdateSize, size);
            uncontrolledSizeRef.value = size;
        };
        const mergedSizeRef = (0, vooks_1.useMergedState)(controlledSizeRef, uncontrolledSizeRef);
        const firstPaneStyle = (0, vue_1.computed)(() => {
            const sizeValue = mergedSizeRef.value;
            if (typeof sizeValue === 'string') {
                return {
                    flex: `0 0 ${sizeValue}`
                };
            }
            else if (typeof sizeValue === 'number') {
                const size = sizeValue * 100;
                return {
                    flex: `0 0 calc(${size}% - ${(props.resizeTriggerSize * size) / 100}px)`
                };
            }
        });
        const resizeTriggerStyle = (0, vue_1.computed)(() => {
            return props.direction === 'horizontal'
                ? {
                    width: `${props.resizeTriggerSize}px`,
                    height: '100%'
                }
                : {
                    width: '100%',
                    height: `${props.resizeTriggerSize}px`
                };
        });
        const resizeTriggerWrapperStyle = (0, vue_1.computed)(() => {
            const horizontal = props.direction === 'horizontal';
            return {
                width: horizontal ? `${props.resizeTriggerSize}px` : '',
                height: horizontal ? '' : `${props.resizeTriggerSize}px`,
                cursor: props.direction === 'horizontal' ? 'col-resize' : 'row-resize'
            };
        });
        let offset = 0;
        const handleMouseDown = (e) => {
            e.preventDefault();
            isDraggingRef.value = true;
            if (props.onDragStart)
                props.onDragStart(e);
            const mouseMoveEvent = 'mousemove';
            const mouseUpEvent = 'mouseup';
            const onMouseMove = (e) => {
                updateSize(e);
                if (props.onDragMove)
                    props.onDragMove(e);
            };
            const onMouseUp = () => {
                (0, evtd_1.off)(mouseMoveEvent, document, onMouseMove);
                (0, evtd_1.off)(mouseUpEvent, document, onMouseUp);
                isDraggingRef.value = false;
                if (props.onDragEnd)
                    props.onDragEnd(e);
                document.body.style.cursor = '';
            };
            document.body.style.cursor = resizeTriggerWrapperStyle.value.cursor;
            (0, evtd_1.on)(mouseMoveEvent, document, onMouseMove);
            (0, evtd_1.on)(mouseUpEvent, document, onMouseUp);
            const resizeTriggerEl = resizeTriggerElRef.value;
            if (resizeTriggerEl) {
                const elRect = resizeTriggerEl.getBoundingClientRect();
                if (props.direction === 'horizontal') {
                    offset = e.clientX - elRect.left;
                }
                else {
                    offset = elRect.top - e.clientY;
                }
            }
            updateSize(e);
        };
        function updateSize(event) {
            var _a, _b;
            const containerRect = (_b = (_a = resizeTriggerElRef.value) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect();
            if (!containerRect)
                return;
            const { direction } = props;
            const containerUsableWidth = containerRect.width - props.resizeTriggerSize;
            const containerUsableHeight = containerRect.height - props.resizeTriggerSize;
            const containerUsableSize = direction === 'horizontal'
                ? containerUsableWidth
                : containerUsableHeight;
            const newPxSize = direction === 'horizontal'
                ? event.clientX - containerRect.left - offset
                : event.clientY - containerRect.top + offset;
            const { min, max } = props;
            const pxMin = typeof min === 'string' ? (0, seemly_1.depx)(min) : min * containerUsableSize;
            const pxMax = typeof max === 'string' ? (0, seemly_1.depx)(max) : max * containerUsableSize;
            let nextPxSize = newPxSize;
            nextPxSize = Math.max(nextPxSize, pxMin);
            nextPxSize = Math.min(nextPxSize, pxMax, containerUsableSize);
            // in pixel mode
            if (typeof mergedSizeRef.value === 'string') {
                doUpdateSize(`${nextPxSize}px`);
            }
            else {
                // in percentage mode
                doUpdateSize(nextPxSize / containerUsableSize);
            }
        }
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('split', undefined, cssVarsRef, props)
            : undefined;
        return {
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            resizeTriggerElRef,
            isDragging: isDraggingRef,
            mergedClsPrefix: mergedClsPrefixRef,
            resizeTriggerWrapperStyle,
            resizeTriggerStyle,
            handleMouseDown,
            firstPaneStyle
        };
    },
    render() {
        var _a, _b, _c, _d, _e;
        (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
        return ((0, vue_1.h)("div", { class: [
                `${this.mergedClsPrefix}-split`,
                `${this.mergedClsPrefix}-split--${this.direction}`,
                this.themeClass
            ], style: this.cssVars },
            (0, vue_1.h)("div", { class: [`${this.mergedClsPrefix}-split-pane-1`, this.pane1Class], style: [this.firstPaneStyle, this.pane1Style] }, (_c = (_b = this.$slots)[1]) === null || _c === void 0 ? void 0 : _c.call(_b)),
            !this.disabled && ((0, vue_1.h)("div", { ref: "resizeTriggerElRef", class: `${this.mergedClsPrefix}-split__resize-trigger-wrapper`, style: this.resizeTriggerWrapperStyle, onMousedown: this.handleMouseDown }, (0, _utils_1.resolveSlot)(this.$slots['resize-trigger'], () => [
                (0, vue_1.h)("div", { style: this.resizeTriggerStyle, class: [
                        `${this.mergedClsPrefix}-split__resize-trigger`,
                        this.isDragging
                            && `${this.mergedClsPrefix}-split__resize-trigger--hover`
                    ] })
            ]))),
            (0, vue_1.h)("div", { class: [`${this.mergedClsPrefix}-split-pane-2`, this.pane2Class], style: this.pane2Style }, (_e = (_d = this.$slots)[2]) === null || _e === void 0 ? void 0 : _e.call(_d))));
    }
});
