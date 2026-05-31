import { Component, App, ComponentPublicInstance } from 'vue';
interface Wrapper {
    app: App;
    instance: ComponentPublicInstance;
    unmount: () => void;
}
interface MountOptions {
    props?: Record<string, any>;
    attach?: boolean;
}
export declare function mount(comp: Component, options?: MountOptions): Wrapper;
export declare function sleep(ms: number): Promise<void>;
export declare function sleepFrame(): Promise<void>;
export {};
