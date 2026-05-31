import type { Ref } from 'vue';
export interface IWindowLocation {
    hash?: string;
    host?: string;
    hostname?: string;
    href?: string;
    origin?: string;
    pathname?: string;
    port?: string;
    protocol?: string;
    search?: string;
}
export declare function useBrowserLocation(customWindow?: (Window & typeof globalThis) | null): Ref<IWindowLocation>;
