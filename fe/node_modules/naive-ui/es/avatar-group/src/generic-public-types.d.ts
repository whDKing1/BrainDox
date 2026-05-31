import type { CSSProperties, VNode } from 'vue';
import type { Size } from '../../avatar/src/interface';
import type { AvatarGroupAvatarSlotProps, AvatarGroupOption, AvatarGroupRestSlotProps } from './public-types';
interface ResolvableAvatarGroupProps<T extends AvatarGroupOption = AvatarGroupOption> {
    options?: T[];
    vertical?: boolean;
    expandOnHover?: boolean;
    size?: Size;
    max?: number;
    maxStyle?: string | CSSProperties;
}
export type GAvatarGroupProps<T extends AvatarGroupOption> = ResolvableAvatarGroupProps<T>;
export interface GAvatarGroupSlots<T extends AvatarGroupOption> {
    avatar?: (props: AvatarGroupAvatarSlotProps<T>) => VNode[];
    rest?: (props: AvatarGroupRestSlotProps<T>) => VNode[];
    default?: () => VNode[];
}
export {};
