"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DRAGGABLE_CLASS = void 0;
exports.useModal = useModal;
exports.useModalReactiveList = useModalReactiveList;
exports.useDragModal = useDragModal;
const evtd_1 = require("evtd");
const vue_1 = require("vue");
const _utils_1 = require("../../_utils");
const context_1 = require("./context");
function useModal() {
    const modal = (0, vue_1.inject)(context_1.modalApiInjectionKey, null);
    if (modal === null) {
        (0, _utils_1.throwError)('use-modal', 'No outer <n-modal-provider /> founded.');
    }
    return modal;
}
function useModalReactiveList() {
    const modalReactiveList = (0, vue_1.inject)(context_1.modalReactiveListInjectionKey, null);
    if (modalReactiveList === null) {
        (0, _utils_1.throwError)('use-modal-reactive-list', 'No outer <n-modal-provider /> founded.');
    }
    return modalReactiveList;
}
exports.DRAGGABLE_CLASS = 'n-draggable';
function useDragModal(draggablePropsRef, options) {
    let cleanup;
    const draggableRef = (0, vue_1.computed)(() => {
        return draggablePropsRef.value !== false;
    });
    const draggableClassRef = (0, vue_1.computed)(() => {
        return draggableRef.value ? exports.DRAGGABLE_CLASS : '';
    });
    const boundsToWindowRef = (0, vue_1.computed)(() => {
        const draggableProps = draggablePropsRef.value;
        if (draggableProps === true || draggableProps === false) {
            return true;
        }
        else if (draggableProps) {
            return draggableProps.bounds !== 'none';
        }
        else {
            return true;
        }
    });
    function startDrag(modal) {
        const header = modal.querySelector(`.${exports.DRAGGABLE_CLASS}`);
        if (!header || !draggableClassRef.value) {
            return;
        }
        let maxMoveX = 0;
        let minMoveX = 0;
        let maxMoveY = 0;
        let minMoveY = 0;
        let prevMoveY = 0;
        let prevMoveX = 0;
        let mousedownEvent;
        let rafId = null;
        let pendingPosition = null;
        function handleMouseDown(event) {
            event.preventDefault();
            mousedownEvent = event;
            const { x, y, right, bottom } = modal.getBoundingClientRect();
            minMoveX = x;
            minMoveY = y;
            maxMoveX = window.innerWidth - right;
            maxMoveY = window.innerHeight - bottom;
            const { left, top } = modal.style;
            prevMoveY = +top.slice(0, -2);
            prevMoveX = +left.slice(0, -2);
        }
        function updatePosition() {
            if (pendingPosition) {
                modal.style.top = `${pendingPosition.y}px`;
                modal.style.left = `${pendingPosition.x}px`;
                pendingPosition = null;
            }
            rafId = null;
        }
        function handleMouseMove(event) {
            if (!mousedownEvent)
                return;
            const { clientX: downX, clientY: downY } = mousedownEvent;
            let moveX = event.clientX - downX;
            let moveY = event.clientY - downY;
            if (boundsToWindowRef.value) {
                if (moveX > maxMoveX) {
                    moveX = maxMoveX;
                }
                else if (-moveX > minMoveX) {
                    moveX = -minMoveX;
                }
                if (moveY > maxMoveY) {
                    moveY = maxMoveY;
                }
                else if (-moveY > minMoveY) {
                    moveY = -minMoveY;
                }
            }
            const x = moveX + prevMoveX;
            const y = moveY + prevMoveY;
            pendingPosition = { x, y };
            if (!rafId) {
                rafId = requestAnimationFrame(updatePosition);
            }
        }
        function handleMouseUp() {
            mousedownEvent = undefined;
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
            if (pendingPosition) {
                modal.style.top = `${pendingPosition.y}px`;
                modal.style.left = `${pendingPosition.x}px`;
                pendingPosition = null;
            }
            options.onEnd(modal);
        }
        (0, evtd_1.on)('mousedown', header, handleMouseDown);
        (0, evtd_1.on)('mousemove', window, handleMouseMove);
        (0, evtd_1.on)('mouseup', window, handleMouseUp);
        cleanup = () => {
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
            (0, evtd_1.off)('mousedown', header, handleMouseDown);
            (0, evtd_1.off)('mousemove', window, handleMouseMove);
            (0, evtd_1.off)('mouseup', window, handleMouseUp);
        };
    }
    function stopDrag() {
        if (cleanup) {
            cleanup();
            cleanup = undefined;
        }
    }
    (0, vue_1.onUnmounted)(stopDrag);
    return {
        stopDrag,
        startDrag,
        draggableRef,
        draggableClassRef
    };
}
