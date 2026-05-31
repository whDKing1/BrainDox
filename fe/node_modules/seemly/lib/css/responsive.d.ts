export declare function parseResponsiveProp(reponsiveProp: string | number): Record<string, string>;
declare function parseResponsivePropValue(reponsiveProp: undefined | null, activeKeyOrSize?: number | string | undefined): undefined;
declare function parseResponsivePropValue(// query by string
reponsiveProp: string | number, activeKey?: string | undefined): string | undefined;
declare function parseResponsivePropValue(// query by number
reponsiveProp: string | number, activeSize?: number | undefined): string | undefined;
declare function parseResponsivePropValue(// query by number
reponsiveProp: string | number, activeSize?: string[]): string | undefined;
declare function parseResponsivePropValue(// fallback
reponsiveProp: string | number | undefined | null, activeKeyOrSize?: number | string | string[] | undefined): string | undefined;
export { parseResponsivePropValue };
