import { CNode, CssRenderInstance, CRenderProps } from './types';
export declare function render<T extends CRenderProps>(node: CNode, instance: CssRenderInstance, props?: T): string;
