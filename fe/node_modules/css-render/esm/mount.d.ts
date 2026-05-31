import { CNode, CssRenderInstance, CRenderProps, MountId, SsrAdapter } from './types';
export declare function unmount(instance: CssRenderInstance, node: CNode, id: MountId, parent: ParentNode | undefined): void;
declare function mount(instance: CssRenderInstance, node: CNode, id: MountId, props: CRenderProps, head: boolean, force: boolean, anchorMetaName: string | undefined, parent: ParentNode | undefined, ssrAdapter: SsrAdapter): void;
declare function mount(instance: CssRenderInstance, node: CNode, id: MountId, props: CRenderProps, head: boolean, force: boolean, anchorMetaName: string | undefined, parent: ParentNode | undefined, ssrAdapter?: undefined): HTMLStyleElement;
declare function mount(instance: CssRenderInstance, node: CNode, id: MountId, props: CRenderProps, head: boolean, force: boolean, anchorMetaName: string | undefined, parent: ParentNode | undefined, ssrAdapter?: SsrAdapter): HTMLStyleElement | void;
export { mount };
