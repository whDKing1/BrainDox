import { ObjectDirective } from 'vue';
interface ClickOutsideElement extends HTMLElement {
    '@@coContext': {
        handler: ((e: MouseEvent) => any) | undefined;
    };
}
declare const clickoutside: ObjectDirective<ClickOutsideElement>;
export default clickoutside;
