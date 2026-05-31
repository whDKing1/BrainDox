import { ObjectDirective } from 'vue';
interface ZIndexableElement extends HTMLElement {
    '@@ziContext': {
        enabled: boolean;
        initialized: boolean;
    };
}
declare const zindexable: ObjectDirective<ZIndexableElement, {
    zIndex?: number;
    enabled?: boolean;
} | undefined>;
export default zindexable;
