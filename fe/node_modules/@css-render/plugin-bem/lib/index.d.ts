import { CLazySelector, CStringSelector, CssRenderPlugin, createCNode } from 'css-render';
interface BEMPluginOptions {
    blockPrefix?: string;
    elementPrefix?: string;
    modifierPrefix?: string;
}
declare type AvailableSelector = CStringSelector | CLazySelector<string>;
interface CssRenderBemPlugin extends CssRenderPlugin {
    cB: createCNode<AvailableSelector>;
    cE: createCNode<AvailableSelector>;
    cM: createCNode<AvailableSelector>;
    cNotM: createCNode<AvailableSelector>;
}
declare function plugin(options?: BEMPluginOptions): CssRenderBemPlugin;
export { plugin };
export default plugin;
