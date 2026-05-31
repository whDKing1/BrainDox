"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageGroupProps = exports.imageGroupInjectionKey = void 0;
const seemly_1 = require("seemly");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const ImagePreview_1 = __importDefault(require("./ImagePreview"));
const interface_1 = require("./interface");
exports.imageGroupInjectionKey = (0, _utils_1.createInjectionKey)('n-image-group');
exports.imageGroupProps = Object.assign(Object.assign({}, interface_1.imagePreviewSharedProps), { srcList: Array, current: Number, defaultCurrent: {
        type: Number,
        default: 0
    }, show: {
        type: Boolean,
        default: undefined
    }, defaultShow: Boolean, onUpdateShow: [Function, Array], 'onUpdate:show': [Function, Array], onUpdateCurrent: [Function, Array], 'onUpdate:current': [Function, Array] });
exports.default = (0, vue_1.defineComponent)({
    name: 'ImageGroup',
    props: exports.imageGroupProps,
    setup(props) {
        const { mergedClsPrefixRef } = (0, _mixins_1.useConfig)(props);
        const groupId = `c${(0, seemly_1.createId)()}`;
        const previewInstRef = (0, vue_1.ref)(null);
        const uncontrolledShowRef = (0, vue_1.ref)(props.defaultShow);
        const controlledShowRef = (0, vue_1.toRef)(props, 'show');
        const mergedShowRef = (0, vooks_1.useMergedState)(controlledShowRef, uncontrolledShowRef);
        const registeredImageUrlMap = (0, vue_1.ref)(new Map());
        const mergedImageUrlMap = (0, vue_1.computed)(() => {
            if (props.srcList) {
                const map = new Map();
                props.srcList.forEach((url, index) => {
                    map.set(`p${index}`, url);
                });
                return map;
            }
            return registeredImageUrlMap.value;
        });
        const imageIdListRef = (0, vue_1.computed)(() => Array.from(mergedImageUrlMap.value.keys()));
        const imageCountGetter = () => imageIdListRef.value.length;
        function registerImageUrl(id, url) {
            if (props.srcList) {
                (0, _utils_1.throwError)('image-group', '`n-image` can\'t be placed inside `n-image-group` when image group\'s `src-list` prop is set.');
            }
            const sid = `r${id}`;
            if (!registeredImageUrlMap.value.has(`r${sid}`)) {
                registeredImageUrlMap.value.set(sid, url);
            }
            return function unregisterPreviewUrl() {
                if (!registeredImageUrlMap.value.has(sid)) {
                    registeredImageUrlMap.value.delete(sid);
                }
            };
        }
        const uncontrolledCurrentRef = (0, vue_1.ref)(props.defaultCurrent);
        const controlledCurrentRef = (0, vue_1.toRef)(props, 'current');
        const mergedCurrentRef = (0, vooks_1.useMergedState)(controlledCurrentRef, uncontrolledCurrentRef);
        const setCurrentIndex = (index) => {
            if (index !== mergedCurrentRef.value) {
                const { onUpdateCurrent, 'onUpdate:current': _onUpdateCurrent } = props;
                if (onUpdateCurrent) {
                    (0, _utils_1.call)(onUpdateCurrent, index);
                }
                if (_onUpdateCurrent) {
                    (0, _utils_1.call)(_onUpdateCurrent, index);
                }
                uncontrolledCurrentRef.value = index;
            }
        };
        const currentId = (0, vue_1.computed)(() => imageIdListRef.value[mergedCurrentRef.value]);
        const setCurrentId = (nextId) => {
            const nextIndex = imageIdListRef.value.indexOf(nextId);
            if (nextIndex !== mergedCurrentRef.value) {
                setCurrentIndex(nextIndex);
            }
        };
        const currentUrl = (0, vue_1.computed)(() => mergedImageUrlMap.value.get(currentId.value));
        function doUpdateShow(value) {
            const { onUpdateShow, 'onUpdate:show': _onUpdateShow } = props;
            if (onUpdateShow) {
                (0, _utils_1.call)(onUpdateShow, value);
            }
            if (_onUpdateShow) {
                (0, _utils_1.call)(_onUpdateShow, value);
            }
            uncontrolledShowRef.value = value;
        }
        function onClose() {
            doUpdateShow(false);
        }
        const nextIndex = (0, vue_1.computed)(() => {
            const findNext = (start, end) => {
                for (let i = start; i <= end; i++) {
                    const id = imageIdListRef.value[i];
                    if (mergedImageUrlMap.value.get(id)) {
                        return i;
                    }
                }
                return undefined;
            };
            const next = findNext(mergedCurrentRef.value + 1, imageCountGetter() - 1);
            return next === undefined ? findNext(0, mergedCurrentRef.value - 1) : next;
        });
        const prevIndex = (0, vue_1.computed)(() => {
            const findPrev = (start, end) => {
                for (let i = start; i >= end; i--) {
                    const id = imageIdListRef.value[i];
                    if (mergedImageUrlMap.value.get(id)) {
                        return i;
                    }
                }
                return undefined;
            };
            const prev = findPrev(mergedCurrentRef.value - 1, 0);
            return prev === undefined
                ? findPrev(imageCountGetter() - 1, mergedCurrentRef.value + 1)
                : prev;
        });
        function go(step) {
            var _a, _b;
            if (step === 1) {
                prevIndex.value !== undefined && setCurrentIndex(nextIndex.value);
                (_a = props.onPreviewNext) === null || _a === void 0 ? void 0 : _a.call(props);
            }
            else {
                nextIndex.value !== undefined && setCurrentIndex(prevIndex.value);
                (_b = props.onPreviewPrev) === null || _b === void 0 ? void 0 : _b.call(props);
            }
        }
        (0, vue_1.provide)(exports.imageGroupInjectionKey, {
            mergedClsPrefixRef,
            registerImageUrl,
            setThumbnailEl: (el) => {
                var _a;
                (_a = previewInstRef.value) === null || _a === void 0 ? void 0 : _a.setThumbnailEl(el);
            },
            toggleShow: (imageId) => {
                doUpdateShow(true);
                setCurrentId(imageId);
            },
            groupId,
            renderToolbarRef: (0, vue_1.toRef)(props, 'renderToolbar')
        });
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            previewInstRef,
            mergedShow: mergedShowRef,
            src: currentUrl,
            onClose,
            next: () => {
                go(1);
            },
            prev: () => {
                go(-1);
            }
        };
    },
    render() {
        return ((0, vue_1.h)(ImagePreview_1.default, { theme: this.theme, themeOverrides: this.themeOverrides, ref: "previewInstRef", onPrev: this.prev, onNext: this.next, src: this.src, show: this.mergedShow, showToolbar: this.showToolbar, showToolbarTooltip: this.showToolbarTooltip, renderToolbar: this.renderToolbar, onClose: this.onClose }, this.$slots));
    }
});
