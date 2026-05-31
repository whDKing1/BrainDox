import { ObjectDirective } from 'vue';
interface MouseMoveOutsideElement extends HTMLElement {
    '@@mmoContext': {
        handler?: (e: MouseEvent) => any;
    };
}
declare const mousemoveoutside: ObjectDirective<MouseMoveOutsideElement>;
export default mousemoveoutside;
