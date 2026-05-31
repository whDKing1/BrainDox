import type { GlobalTheme } from '../config-provider';
type ComponentKey = Exclude<keyof GlobalTheme, 'name'>;
type ComponentThemes = Array<Exclude<GlobalTheme[ComponentKey], undefined>>;
export declare function createTheme(name: string, componentThemes: ComponentThemes): GlobalTheme;
export declare function createTheme(componentThemes: ComponentThemes): GlobalTheme;
export {};
