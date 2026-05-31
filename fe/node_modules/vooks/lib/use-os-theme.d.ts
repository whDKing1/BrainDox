import { Ref } from 'vue';
declare type Theme = 'light' | 'dark';
export default function useOsTheme(): Readonly<Ref<Theme | null>>;
export {};
