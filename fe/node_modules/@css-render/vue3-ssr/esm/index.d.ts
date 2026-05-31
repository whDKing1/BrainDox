import { App } from 'vue';
interface CssrSsrContext {
    styles: string[];
    ids: Set<string>;
}
export declare function useSsrAdapter(): {
    adapter: (id: string, style: string) => void;
    context: CssrSsrContext;
} | undefined;
interface SsrHandle {
    collect: () => string;
}
export declare function setup(app: App): SsrHandle;
export {};
