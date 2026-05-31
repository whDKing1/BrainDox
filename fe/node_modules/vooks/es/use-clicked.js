import { onBeforeMount, onBeforeUnmount, ref, readonly } from 'vue';
import { on, off } from 'evtd';
import { hasInstance, isBrowser } from './utils';
const clickedTimeRef = ref(undefined);
let usedCount = 0;
function handleClick() {
    clickedTimeRef.value = Date.now();
}
let managable = true;
export default function useClicked(timeout) {
    if (!isBrowser)
        return readonly(ref(false));
    const clickedRef = ref(false);
    let timerId = null;
    function clearTimer() {
        if (timerId !== null)
            window.clearTimeout(timerId);
    }
    function clickedHandler() {
        clearTimer();
        clickedRef.value = true;
        timerId = window.setTimeout(() => {
            clickedRef.value = false;
        }, timeout);
    }
    if (usedCount === 0) {
        on('click', window, handleClick, true);
    }
    const setup = () => {
        usedCount += 1;
        on('click', window, clickedHandler, true);
    };
    if (managable && (managable = hasInstance())) {
        onBeforeMount(setup);
        onBeforeUnmount(() => {
            usedCount -= 1;
            if (usedCount === 0) {
                off('click', window, handleClick, true);
            }
            off('click', window, clickedHandler, true);
            clearTimer();
        });
    }
    else {
        setup();
    }
    return readonly(clickedRef);
}
