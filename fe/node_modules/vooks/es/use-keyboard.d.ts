import { Ref } from 'vue';
interface useKeyboardOptions {
    keyup?: UseKeyboardHandlers;
    keydown?: UseKeyboardHandlers;
}
declare type UseKeyboardHandlers = Record<string, useKeyboardHandler | UseKeyboardOptionHandler>;
declare type useKeyboardHandler = (e: KeyboardEvent) => any;
interface UseKeyboardOptionHandler {
    stop?: boolean;
    prevent?: boolean;
    handler: (e: KeyboardEvent) => any;
}
interface UseKeyboardState {
    ctrl: boolean;
    command: boolean;
    win: boolean;
    shift: boolean;
    tab: boolean;
}
export default function useKeyboard(options?: useKeyboardOptions, enabledRef?: Ref<boolean>): Readonly<UseKeyboardState>;
export {};
