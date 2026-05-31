import { ref, readonly, onBeforeMount, onBeforeUnmount } from 'vue';
import { on, off } from 'evtd';
import { hasInstance, isBrowser } from './utils';
const mousePositionRef = ref(null);
function clickHandler(e) {
    if (e.clientX > 0 || e.clientY > 0) {
        mousePositionRef.value = {
            x: e.clientX,
            y: e.clientY
        };
    }
    else {
        // x = 0 & y = 0
        const { target } = e;
        if (target instanceof Element) {
            const { left, top, width, height } = target.getBoundingClientRect();
            if (left > 0 || top > 0) {
                // impossible to be triggered by real click
                mousePositionRef.value = {
                    x: left + width / 2,
                    y: top + height / 2
                };
            }
            else {
                mousePositionRef.value = { x: 0, y: 0 };
            }
        }
        else {
            mousePositionRef.value = null;
        }
    }
}
let usedCount = 0;
let managable = true;
export default function useClickPosition() {
    if (!isBrowser)
        return readonly(ref(null));
    if (usedCount === 0)
        on('click', document, clickHandler, true);
    const setup = () => {
        usedCount += 1;
    };
    if (managable && (managable = hasInstance())) {
        onBeforeMount(setup);
        onBeforeUnmount(() => {
            usedCount -= 1;
            if (usedCount === 0)
                off('click', document, clickHandler, true);
        });
    }
    else {
        setup();
    }
    return readonly(mousePositionRef);
}
