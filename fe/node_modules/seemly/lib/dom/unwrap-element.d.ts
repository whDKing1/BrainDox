type GetElement = () => HTMLElement;
declare function unwrapElement<T>(target: T | string | GetElement): T extends HTMLElement ? HTMLElement : HTMLElement | null;
export { unwrapElement };
