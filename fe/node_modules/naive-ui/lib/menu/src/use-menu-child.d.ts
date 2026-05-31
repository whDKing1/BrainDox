import type { Key } from 'treemate';
import type { ComputedRef, Ref } from 'vue';
import type { FollowerPlacement } from 'vueuc';
import type { MergedTheme } from '../../_mixins/use-theme';
import type { MenuTheme } from '../styles';
import type { OnUpdateValueImpl } from './interface';
import type { MenuSetupProps } from './Menu';
import type { UseMenuChildProps } from './use-menu-child-props';
export interface MenuInjection {
    props: MenuSetupProps;
    mergedCollapsedRef: Ref<boolean>;
    invertedRef: Ref<boolean>;
    isHorizontalRef: Ref<boolean>;
    mergedClsPrefixRef: Ref<string>;
    mergedValueRef: Ref<Key | null>;
    mergedExpandedKeysRef: Ref<Key[]>;
    activePathRef: Ref<Key[]>;
    mergedThemeRef: Ref<MergedTheme<MenuTheme>>;
    doSelect: OnUpdateValueImpl;
    toggleExpand: (key: Key) => void;
}
export interface SubmenuInjection {
    paddingLeftRef: Ref<number | undefined>;
    mergedDisabledRef: Ref<boolean>;
}
export interface MenuOptionGroupInjection {
    paddingLeftRef: Ref<number | undefined>;
    mergedDisabledRef: Ref<boolean>;
}
export interface UseMenuChild {
    dropdownPlacement: ComputedRef<FollowerPlacement>;
    activeIconSize: ComputedRef<number>;
    maxIconSize: ComputedRef<number>;
    paddingLeft: ComputedRef<number | undefined>;
    iconMarginRight: ComputedRef<number>;
    NMenu: MenuInjection;
    NSubmenu: SubmenuInjection | null;
    NMenuOptionGroup: MenuOptionGroupInjection | null;
}
export declare function useMenuChild(props: UseMenuChildProps): UseMenuChild;
