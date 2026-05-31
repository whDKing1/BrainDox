import { onBeforeMount, onBeforeUnmount, reactive, readonly, watch } from 'vue';
import { on, off } from 'evtd';
import { hasInstance } from './utils';
export default function useKeyboard(options = {}, enabledRef) {
    const state = reactive({
        ctrl: false,
        command: false,
        win: false,
        shift: false,
        tab: false
    });
    const { keydown, keyup } = options;
    const keydownHandler = (e) => {
        switch (e.key) {
            case 'Control':
                state.ctrl = true;
                break;
            case 'Meta':
                state.command = true;
                state.win = true;
                break;
            case 'Shift':
                state.shift = true;
                break;
            case 'Tab':
                state.tab = true;
                break;
        }
        if (keydown !== undefined) {
            Object.keys(keydown).forEach(key => {
                if (key !== e.key)
                    return;
                const handler = keydown[key];
                if (typeof handler === 'function') {
                    handler(e);
                }
                else {
                    const { stop = false, prevent = false } = handler;
                    if (stop)
                        e.stopPropagation();
                    if (prevent)
                        e.preventDefault();
                    handler.handler(e);
                }
            });
        }
    };
    const keyupHandler = (e) => {
        switch (e.key) {
            case 'Control':
                state.ctrl = false;
                break;
            case 'Meta':
                state.command = false;
                state.win = false;
                break;
            case 'Shift':
                state.shift = false;
                break;
            case 'Tab':
                state.tab = false;
                break;
        }
        if (keyup !== undefined) {
            Object.keys(keyup).forEach(key => {
                if (key !== e.key)
                    return;
                const handler = keyup[key];
                if (typeof handler === 'function') {
                    handler(e);
                }
                else {
                    const { stop = false, prevent = false } = handler;
                    if (stop)
                        e.stopPropagation();
                    if (prevent)
                        e.preventDefault();
                    handler.handler(e);
                }
            });
        }
    };
    const setup = () => {
        if (enabledRef === undefined || enabledRef.value) {
            on('keydown', document, keydownHandler);
            on('keyup', document, keyupHandler);
        }
        if (enabledRef !== undefined) {
            watch(enabledRef, value => {
                if (value) {
                    on('keydown', document, keydownHandler);
                    on('keyup', document, keyupHandler);
                }
                else {
                    off('keydown', document, keydownHandler);
                    off('keyup', document, keyupHandler);
                }
            });
        }
    };
    if (hasInstance()) {
        onBeforeMount(setup);
        onBeforeUnmount(() => {
            if (enabledRef === undefined || enabledRef.value) {
                off('keydown', document, keydownHandler);
                off('keyup', document, keyupHandler);
            }
        });
    }
    else {
        setup();
    }
    return readonly(state);
}
