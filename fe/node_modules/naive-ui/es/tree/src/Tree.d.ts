import type { CheckStrategy, TreeMateOptions } from 'treemate';
import type { PropType, SlotsType, VNode, VNodeChild } from 'vue';
import type { VirtualListInst } from 'vueuc';
import type { ScrollbarInst } from '../../_internal';
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils';
import type { ScrollbarProps } from '../../scrollbar/src/Scrollbar';
import type { AllowDrop, CheckOnClick, GetChildren, Key, OnLoad, RenderLabel, RenderPrefix, RenderSuffix, RenderSwitcherIcon, TreeDragInfo, TreeDropInfo, TreeNodeProps, TreeOption, TreeOptions, TreeOverrideNodeClickBehavior } from './interface';
import type { TreeSpinProps } from './public-types';
import { defaultAllowDrop } from './dnd';
export declare function createTreeMateOptions<T>(keyField: string, childrenField: string, disabledField: string, getChildren: GetChildren | undefined): TreeMateOptions<T, T, T>;
export type OnUpdateCheckedKeys = (value: Array<string & number>, option: Array<TreeOption | null>, meta: {
    node: TreeOption | null;
    action: 'check' | 'uncheck';
}) => void;
export type OnUpdateCheckedKeysImpl = (value: Key[], option: Array<TreeOption | null>, meta: {
    node: TreeOption | null;
    action: 'check' | 'uncheck';
}) => void;
export type OnUpdateIndeterminateKeys = (value: Array<string & number>, option: Array<TreeOption | null>) => void;
export type OnUpdateIndeterminateKeysImpl = (value: Key[], option: Array<TreeOption | null>) => void;
export type OnUpdateSelectedKeys = (value: Array<string & number>, option: Array<TreeOption | null>, meta: {
    node: TreeOption | null;
    action: 'select' | 'unselect';
}) => void;
export type OnUpdateSelectedKeysImpl = (value: Key[], option: Array<TreeOption | null>, meta: {
    node: TreeOption | null;
    action: 'select' | 'unselect';
}) => void;
export type onUpdateExpandedKeys = (value: Array<string & number>, option: Array<TreeOption | null>, meta: {
    node: TreeOption;
    action: 'expand' | 'collapse';
} | {
    node: null;
    action: 'filter';
}) => void;
export type OnUpdateExpandedKeysImpl = (value: Key[], option: Array<TreeOption | null>, meta: {
    node: TreeOption;
    action: 'expand' | 'collapse';
} | {
    node: null;
    action: 'filter';
}) => void;
export declare const treeSharedProps: {
    readonly allowCheckingNotLoaded: BooleanConstructor;
    readonly filter: PropType<(pattern: string, node: TreeOption) => boolean>;
    readonly defaultExpandAll: BooleanConstructor;
    readonly expandedKeys: PropType<Key[]>;
    readonly keyField: {
        readonly type: StringConstructor;
        readonly default: "key";
    };
    readonly labelField: {
        readonly type: StringConstructor;
        readonly default: "label";
    };
    readonly childrenField: {
        readonly type: StringConstructor;
        readonly default: "children";
    };
    readonly disabledField: {
        readonly type: StringConstructor;
        readonly default: "disabled";
    };
    readonly defaultExpandedKeys: {
        readonly type: PropType<Key[]>;
        readonly default: () => never[];
    };
    readonly indent: {
        readonly type: NumberConstructor;
        readonly default: 24;
    };
    readonly indeterminateKeys: PropType<Key[]>;
    readonly renderSwitcherIcon: PropType<RenderSwitcherIcon>;
    readonly onUpdateIndeterminateKeys: PropType<MaybeArray<OnUpdateIndeterminateKeys>>;
    readonly 'onUpdate:indeterminateKeys': PropType<MaybeArray<OnUpdateIndeterminateKeys>>;
    readonly onUpdateExpandedKeys: PropType<MaybeArray<onUpdateExpandedKeys>>;
    readonly 'onUpdate:expandedKeys': PropType<MaybeArray<onUpdateExpandedKeys>>;
    readonly overrideDefaultNodeClickBehavior: PropType<TreeOverrideNodeClickBehavior>;
};
export declare const treeProps: {
    readonly internalTreeSelect: BooleanConstructor;
    readonly internalScrollable: BooleanConstructor;
    readonly internalScrollablePadding: StringConstructor;
    readonly internalRenderEmpty: PropType<() => VNodeChild>;
    readonly internalHighlightKeySet: PropType<Set<Key> | null>;
    readonly internalUnifySelectCheck: BooleanConstructor;
    readonly internalCheckboxFocusable: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly internalFocusable: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly checkStrategy: {
        readonly type: PropType<CheckStrategy>;
        readonly default: "all";
    };
    readonly spinProps: PropType<TreeSpinProps>;
    /**
     * @deprecated
     */
    readonly leafOnly: BooleanConstructor;
    readonly allowCheckingNotLoaded: BooleanConstructor;
    readonly filter: PropType<(pattern: string, node: TreeOption) => boolean>;
    readonly defaultExpandAll: BooleanConstructor;
    readonly expandedKeys: PropType<Key[]>;
    readonly keyField: {
        readonly type: StringConstructor;
        readonly default: "key";
    };
    readonly labelField: {
        readonly type: StringConstructor;
        readonly default: "label";
    };
    readonly childrenField: {
        readonly type: StringConstructor;
        readonly default: "children";
    };
    readonly disabledField: {
        readonly type: StringConstructor;
        readonly default: "disabled";
    };
    readonly defaultExpandedKeys: {
        readonly type: PropType<Key[]>;
        readonly default: () => never[];
    };
    readonly indent: {
        readonly type: NumberConstructor;
        readonly default: 24;
    };
    readonly indeterminateKeys: PropType<Key[]>;
    readonly renderSwitcherIcon: PropType<RenderSwitcherIcon>;
    readonly onUpdateIndeterminateKeys: PropType<MaybeArray<OnUpdateIndeterminateKeys>>;
    readonly 'onUpdate:indeterminateKeys': PropType<MaybeArray<OnUpdateIndeterminateKeys>>;
    readonly onUpdateExpandedKeys: PropType<MaybeArray<onUpdateExpandedKeys>>;
    readonly 'onUpdate:expandedKeys': PropType<MaybeArray<onUpdateExpandedKeys>>;
    readonly overrideDefaultNodeClickBehavior: PropType<TreeOverrideNodeClickBehavior>;
    readonly accordion: BooleanConstructor;
    readonly showIrrelevantNodes: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly data: {
        readonly type: PropType<TreeOptions>;
        readonly default: () => never[];
    };
    readonly expandOnDragenter: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly expandOnClick: BooleanConstructor;
    readonly checkOnClick: {
        readonly type: PropType<boolean | CheckOnClick>;
        readonly default: false;
    };
    readonly cancelable: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly checkable: BooleanConstructor;
    readonly draggable: BooleanConstructor;
    readonly blockNode: BooleanConstructor;
    readonly blockLine: BooleanConstructor;
    readonly showLine: BooleanConstructor;
    readonly disabled: BooleanConstructor;
    readonly checkedKeys: PropType<Key[]>;
    readonly defaultCheckedKeys: {
        readonly type: PropType<Key[]>;
        readonly default: () => never[];
    };
    readonly selectedKeys: PropType<Key[]>;
    readonly defaultSelectedKeys: {
        readonly type: PropType<Key[]>;
        readonly default: () => never[];
    };
    readonly multiple: BooleanConstructor;
    readonly pattern: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly onLoad: PropType<OnLoad>;
    readonly cascade: BooleanConstructor;
    readonly selectable: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly scrollbarProps: PropType<ScrollbarProps>;
    readonly allowDrop: {
        readonly type: PropType<AllowDrop>;
        readonly default: typeof defaultAllowDrop;
    };
    readonly animated: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly ellipsis: BooleanConstructor;
    readonly checkboxPlacement: {
        readonly type: PropType<"left" | "right">;
        readonly default: "left";
    };
    readonly virtualScroll: BooleanConstructor;
    readonly watchProps: PropType<Array<"defaultCheckedKeys" | "defaultSelectedKeys" | "defaultExpandedKeys">>;
    readonly renderLabel: PropType<RenderLabel>;
    readonly renderPrefix: PropType<RenderPrefix>;
    readonly renderSuffix: PropType<RenderSuffix>;
    readonly nodeProps: PropType<TreeNodeProps>;
    readonly keyboard: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly getChildren: PropType<GetChildren>;
    readonly onDragenter: PropType<MaybeArray<(e: TreeDragInfo) => void>>;
    readonly onDragleave: PropType<MaybeArray<(e: TreeDragInfo) => void>>;
    readonly onDragend: PropType<MaybeArray<(e: TreeDragInfo) => void>>;
    readonly onDragstart: PropType<MaybeArray<(e: TreeDragInfo) => void>>;
    readonly onDragover: PropType<MaybeArray<(e: TreeDragInfo) => void>>;
    readonly onDrop: PropType<MaybeArray<(e: TreeDropInfo) => void>>;
    readonly onUpdateCheckedKeys: PropType<MaybeArray<OnUpdateCheckedKeys>>;
    readonly 'onUpdate:checkedKeys': PropType<MaybeArray<OnUpdateCheckedKeys>>;
    readonly onUpdateSelectedKeys: PropType<MaybeArray<OnUpdateSelectedKeys>>;
    readonly 'onUpdate:selectedKeys': PropType<MaybeArray<OnUpdateSelectedKeys>>;
    readonly theme: PropType<import("../../_mixins").Theme<"Tree", {
        fontSize: string;
        lineHeight: string;
        nodeHeight: string;
        nodeWrapperPadding: string;
        nodeBorderRadius: string;
        nodeColorHover: string;
        nodeColorPressed: string;
        nodeColorActive: string;
        arrowColor: string;
        nodeTextColor: string;
        nodeTextColorDisabled: string;
        loadingColor: string;
        dropMarkColor: string;
        lineColor: string;
    }, {
        Checkbox: import("../../_mixins").Theme<"Checkbox", {
            labelLineHeight: string;
            fontSizeSmall: string;
            fontSizeMedium: string;
            fontSizeLarge: string;
            borderRadius: string;
            color: string;
            colorChecked: string;
            colorDisabled: string;
            colorDisabledChecked: string;
            colorTableHeader: string;
            colorTableHeaderModal: string;
            colorTableHeaderPopover: string;
            checkMarkColor: string;
            checkMarkColorDisabled: string;
            checkMarkColorDisabledChecked: string;
            border: string;
            borderDisabled: string;
            borderDisabledChecked: string;
            borderChecked: string;
            borderFocus: string;
            boxShadowFocus: string;
            textColor: string;
            textColorDisabled: string;
            sizeSmall: string;
            sizeMedium: string;
            sizeLarge: string;
            labelPadding: string;
            labelFontWeight: string;
        }, any>;
        Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
            height: string;
            width: string;
            borderRadius: string;
            color: string;
            colorHover: string;
            railInsetHorizontalBottom: string;
            railInsetHorizontalTop: string;
            railInsetVerticalRight: string;
            railInsetVerticalLeft: string;
            railColor: string;
        }, any>;
        Empty: import("../../_mixins").Theme<"Empty", {
            fontSizeTiny: string;
            fontSizeSmall: string;
            fontSizeMedium: string;
            fontSizeLarge: string;
            fontSizeHuge: string;
            textColor: string;
            iconColor: string;
            extraTextColor: string;
            iconSizeTiny: string;
            iconSizeSmall: string;
            iconSizeMedium: string;
            iconSizeLarge: string;
            iconSizeHuge: string;
        }, any>;
    }>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Tree", {
        fontSize: string;
        lineHeight: string;
        nodeHeight: string;
        nodeWrapperPadding: string;
        nodeBorderRadius: string;
        nodeColorHover: string;
        nodeColorPressed: string;
        nodeColorActive: string;
        arrowColor: string;
        nodeTextColor: string;
        nodeTextColorDisabled: string;
        loadingColor: string;
        dropMarkColor: string;
        lineColor: string;
    }, {
        Checkbox: import("../../_mixins").Theme<"Checkbox", {
            labelLineHeight: string;
            fontSizeSmall: string;
            fontSizeMedium: string;
            fontSizeLarge: string;
            borderRadius: string;
            color: string;
            colorChecked: string;
            colorDisabled: string;
            colorDisabledChecked: string;
            colorTableHeader: string;
            colorTableHeaderModal: string;
            colorTableHeaderPopover: string;
            checkMarkColor: string;
            checkMarkColorDisabled: string;
            checkMarkColorDisabledChecked: string;
            border: string;
            borderDisabled: string;
            borderDisabledChecked: string;
            borderChecked: string;
            borderFocus: string;
            boxShadowFocus: string;
            textColor: string;
            textColorDisabled: string;
            sizeSmall: string;
            sizeMedium: string;
            sizeLarge: string;
            labelPadding: string;
            labelFontWeight: string;
        }, any>;
        Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
            height: string;
            width: string;
            borderRadius: string;
            color: string;
            colorHover: string;
            railInsetHorizontalBottom: string;
            railInsetHorizontalTop: string;
            railInsetVerticalRight: string;
            railInsetVerticalLeft: string;
            railColor: string;
        }, any>;
        Empty: import("../../_mixins").Theme<"Empty", {
            fontSizeTiny: string;
            fontSizeSmall: string;
            fontSizeMedium: string;
            fontSizeLarge: string;
            fontSizeHuge: string;
            textColor: string;
            iconColor: string;
            extraTextColor: string;
            iconSizeTiny: string;
            iconSizeSmall: string;
            iconSizeMedium: string;
            iconSizeLarge: string;
            iconSizeHuge: string;
        }, any>;
    }>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Tree", {
        fontSize: string;
        lineHeight: string;
        nodeHeight: string;
        nodeWrapperPadding: string;
        nodeBorderRadius: string;
        nodeColorHover: string;
        nodeColorPressed: string;
        nodeColorActive: string;
        arrowColor: string;
        nodeTextColor: string;
        nodeTextColorDisabled: string;
        loadingColor: string;
        dropMarkColor: string;
        lineColor: string;
    }, {
        Checkbox: import("../../_mixins").Theme<"Checkbox", {
            labelLineHeight: string;
            fontSizeSmall: string;
            fontSizeMedium: string;
            fontSizeLarge: string;
            borderRadius: string;
            color: string;
            colorChecked: string;
            colorDisabled: string;
            colorDisabledChecked: string;
            colorTableHeader: string;
            colorTableHeaderModal: string;
            colorTableHeaderPopover: string;
            checkMarkColor: string;
            checkMarkColorDisabled: string;
            checkMarkColorDisabledChecked: string;
            border: string;
            borderDisabled: string;
            borderDisabledChecked: string;
            borderChecked: string;
            borderFocus: string;
            boxShadowFocus: string;
            textColor: string;
            textColorDisabled: string;
            sizeSmall: string;
            sizeMedium: string;
            sizeLarge: string;
            labelPadding: string;
            labelFontWeight: string;
        }, any>;
        Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
            height: string;
            width: string;
            borderRadius: string;
            color: string;
            colorHover: string;
            railInsetHorizontalBottom: string;
            railInsetHorizontalTop: string;
            railInsetVerticalRight: string;
            railInsetVerticalLeft: string;
            railColor: string;
        }, any>;
        Empty: import("../../_mixins").Theme<"Empty", {
            fontSizeTiny: string;
            fontSizeSmall: string;
            fontSizeMedium: string;
            fontSizeLarge: string;
            fontSizeHuge: string;
            textColor: string;
            iconColor: string;
            extraTextColor: string;
            iconSizeTiny: string;
            iconSizeSmall: string;
            iconSizeMedium: string;
            iconSizeLarge: string;
            iconSizeHuge: string;
        }, any>;
    }>>>;
};
export type TreeProps = ExtractPublicPropTypes<typeof treeProps>;
export interface TreeSlots {
    default?: () => VNode[];
    empty?: () => VNode[];
}
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly internalTreeSelect: BooleanConstructor;
    readonly internalScrollable: BooleanConstructor;
    readonly internalScrollablePadding: StringConstructor;
    readonly internalRenderEmpty: PropType<() => VNodeChild>;
    readonly internalHighlightKeySet: PropType<Set<Key> | null>;
    readonly internalUnifySelectCheck: BooleanConstructor;
    readonly internalCheckboxFocusable: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly internalFocusable: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly checkStrategy: {
        readonly type: PropType<CheckStrategy>;
        readonly default: "all";
    };
    readonly spinProps: PropType<TreeSpinProps>;
    /**
     * @deprecated
     */
    readonly leafOnly: BooleanConstructor;
    readonly allowCheckingNotLoaded: BooleanConstructor;
    readonly filter: PropType<(pattern: string, node: TreeOption) => boolean>;
    readonly defaultExpandAll: BooleanConstructor;
    readonly expandedKeys: PropType<Key[]>;
    readonly keyField: {
        readonly type: StringConstructor;
        readonly default: "key";
    };
    readonly labelField: {
        readonly type: StringConstructor;
        readonly default: "label";
    };
    readonly childrenField: {
        readonly type: StringConstructor;
        readonly default: "children";
    };
    readonly disabledField: {
        readonly type: StringConstructor;
        readonly default: "disabled";
    };
    readonly defaultExpandedKeys: {
        readonly type: PropType<Key[]>;
        readonly default: () => never[];
    };
    readonly indent: {
        readonly type: NumberConstructor;
        readonly default: 24;
    };
    readonly indeterminateKeys: PropType<Key[]>;
    readonly renderSwitcherIcon: PropType<RenderSwitcherIcon>;
    readonly onUpdateIndeterminateKeys: PropType<MaybeArray<OnUpdateIndeterminateKeys>>;
    readonly 'onUpdate:indeterminateKeys': PropType<MaybeArray<OnUpdateIndeterminateKeys>>;
    readonly onUpdateExpandedKeys: PropType<MaybeArray<onUpdateExpandedKeys>>;
    readonly 'onUpdate:expandedKeys': PropType<MaybeArray<onUpdateExpandedKeys>>;
    readonly overrideDefaultNodeClickBehavior: PropType<TreeOverrideNodeClickBehavior>;
    readonly accordion: BooleanConstructor;
    readonly showIrrelevantNodes: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly data: {
        readonly type: PropType<TreeOptions>;
        readonly default: () => never[];
    };
    readonly expandOnDragenter: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly expandOnClick: BooleanConstructor;
    readonly checkOnClick: {
        readonly type: PropType<boolean | CheckOnClick>;
        readonly default: false;
    };
    readonly cancelable: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly checkable: BooleanConstructor;
    readonly draggable: BooleanConstructor;
    readonly blockNode: BooleanConstructor;
    readonly blockLine: BooleanConstructor;
    readonly showLine: BooleanConstructor;
    readonly disabled: BooleanConstructor;
    readonly checkedKeys: PropType<Key[]>;
    readonly defaultCheckedKeys: {
        readonly type: PropType<Key[]>;
        readonly default: () => never[];
    };
    readonly selectedKeys: PropType<Key[]>;
    readonly defaultSelectedKeys: {
        readonly type: PropType<Key[]>;
        readonly default: () => never[];
    };
    readonly multiple: BooleanConstructor;
    readonly pattern: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly onLoad: PropType<OnLoad>;
    readonly cascade: BooleanConstructor;
    readonly selectable: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly scrollbarProps: PropType<ScrollbarProps>;
    readonly allowDrop: {
        readonly type: PropType<AllowDrop>;
        readonly default: typeof defaultAllowDrop;
    };
    readonly animated: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly ellipsis: BooleanConstructor;
    readonly checkboxPlacement: {
        readonly type: PropType<"left" | "right">;
        readonly default: "left";
    };
    readonly virtualScroll: BooleanConstructor;
    readonly watchProps: PropType<Array<"defaultCheckedKeys" | "defaultSelectedKeys" | "defaultExpandedKeys">>;
    readonly renderLabel: PropType<RenderLabel>;
    readonly renderPrefix: PropType<RenderPrefix>;
    readonly renderSuffix: PropType<RenderSuffix>;
    readonly nodeProps: PropType<TreeNodeProps>;
    readonly keyboard: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly getChildren: PropType<GetChildren>;
    readonly onDragenter: PropType<MaybeArray<(e: TreeDragInfo) => void>>;
    readonly onDragleave: PropType<MaybeArray<(e: TreeDragInfo) => void>>;
    readonly onDragend: PropType<MaybeArray<(e: TreeDragInfo) => void>>;
    readonly onDragstart: PropType<MaybeArray<(e: TreeDragInfo) => void>>;
    readonly onDragover: PropType<MaybeArray<(e: TreeDragInfo) => void>>;
    readonly onDrop: PropType<MaybeArray<(e: TreeDropInfo) => void>>;
    readonly onUpdateCheckedKeys: PropType<MaybeArray<OnUpdateCheckedKeys>>;
    readonly 'onUpdate:checkedKeys': PropType<MaybeArray<OnUpdateCheckedKeys>>;
    readonly onUpdateSelectedKeys: PropType<MaybeArray<OnUpdateSelectedKeys>>;
    readonly 'onUpdate:selectedKeys': PropType<MaybeArray<OnUpdateSelectedKeys>>;
    readonly theme: PropType<import("../../_mixins").Theme<"Tree", {
        fontSize: string;
        lineHeight: string;
        nodeHeight: string;
        nodeWrapperPadding: string;
        nodeBorderRadius: string;
        nodeColorHover: string;
        nodeColorPressed: string;
        nodeColorActive: string;
        arrowColor: string;
        nodeTextColor: string;
        nodeTextColorDisabled: string;
        loadingColor: string;
        dropMarkColor: string;
        lineColor: string;
    }, {
        Checkbox: import("../../_mixins").Theme<"Checkbox", {
            labelLineHeight: string;
            fontSizeSmall: string;
            fontSizeMedium: string;
            fontSizeLarge: string;
            borderRadius: string;
            color: string;
            colorChecked: string;
            colorDisabled: string;
            colorDisabledChecked: string;
            colorTableHeader: string;
            colorTableHeaderModal: string;
            colorTableHeaderPopover: string;
            checkMarkColor: string;
            checkMarkColorDisabled: string;
            checkMarkColorDisabledChecked: string;
            border: string;
            borderDisabled: string;
            borderDisabledChecked: string;
            borderChecked: string;
            borderFocus: string;
            boxShadowFocus: string;
            textColor: string;
            textColorDisabled: string;
            sizeSmall: string;
            sizeMedium: string;
            sizeLarge: string;
            labelPadding: string;
            labelFontWeight: string;
        }, any>;
        Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
            height: string;
            width: string;
            borderRadius: string;
            color: string;
            colorHover: string;
            railInsetHorizontalBottom: string;
            railInsetHorizontalTop: string;
            railInsetVerticalRight: string;
            railInsetVerticalLeft: string;
            railColor: string;
        }, any>;
        Empty: import("../../_mixins").Theme<"Empty", {
            fontSizeTiny: string;
            fontSizeSmall: string;
            fontSizeMedium: string;
            fontSizeLarge: string;
            fontSizeHuge: string;
            textColor: string;
            iconColor: string;
            extraTextColor: string;
            iconSizeTiny: string;
            iconSizeSmall: string;
            iconSizeMedium: string;
            iconSizeLarge: string;
            iconSizeHuge: string;
        }, any>;
    }>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Tree", {
        fontSize: string;
        lineHeight: string;
        nodeHeight: string;
        nodeWrapperPadding: string;
        nodeBorderRadius: string;
        nodeColorHover: string;
        nodeColorPressed: string;
        nodeColorActive: string;
        arrowColor: string;
        nodeTextColor: string;
        nodeTextColorDisabled: string;
        loadingColor: string;
        dropMarkColor: string;
        lineColor: string;
    }, {
        Checkbox: import("../../_mixins").Theme<"Checkbox", {
            labelLineHeight: string;
            fontSizeSmall: string;
            fontSizeMedium: string;
            fontSizeLarge: string;
            borderRadius: string;
            color: string;
            colorChecked: string;
            colorDisabled: string;
            colorDisabledChecked: string;
            colorTableHeader: string;
            colorTableHeaderModal: string;
            colorTableHeaderPopover: string;
            checkMarkColor: string;
            checkMarkColorDisabled: string;
            checkMarkColorDisabledChecked: string;
            border: string;
            borderDisabled: string;
            borderDisabledChecked: string;
            borderChecked: string;
            borderFocus: string;
            boxShadowFocus: string;
            textColor: string;
            textColorDisabled: string;
            sizeSmall: string;
            sizeMedium: string;
            sizeLarge: string;
            labelPadding: string;
            labelFontWeight: string;
        }, any>;
        Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
            height: string;
            width: string;
            borderRadius: string;
            color: string;
            colorHover: string;
            railInsetHorizontalBottom: string;
            railInsetHorizontalTop: string;
            railInsetVerticalRight: string;
            railInsetVerticalLeft: string;
            railColor: string;
        }, any>;
        Empty: import("../../_mixins").Theme<"Empty", {
            fontSizeTiny: string;
            fontSizeSmall: string;
            fontSizeMedium: string;
            fontSizeLarge: string;
            fontSizeHuge: string;
            textColor: string;
            iconColor: string;
            extraTextColor: string;
            iconSizeTiny: string;
            iconSizeSmall: string;
            iconSizeMedium: string;
            iconSizeLarge: string;
            iconSizeHuge: string;
        }, any>;
    }>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Tree", {
        fontSize: string;
        lineHeight: string;
        nodeHeight: string;
        nodeWrapperPadding: string;
        nodeBorderRadius: string;
        nodeColorHover: string;
        nodeColorPressed: string;
        nodeColorActive: string;
        arrowColor: string;
        nodeTextColor: string;
        nodeTextColorDisabled: string;
        loadingColor: string;
        dropMarkColor: string;
        lineColor: string;
    }, {
        Checkbox: import("../../_mixins").Theme<"Checkbox", {
            labelLineHeight: string;
            fontSizeSmall: string;
            fontSizeMedium: string;
            fontSizeLarge: string;
            borderRadius: string;
            color: string;
            colorChecked: string;
            colorDisabled: string;
            colorDisabledChecked: string;
            colorTableHeader: string;
            colorTableHeaderModal: string;
            colorTableHeaderPopover: string;
            checkMarkColor: string;
            checkMarkColorDisabled: string;
            checkMarkColorDisabledChecked: string;
            border: string;
            borderDisabled: string;
            borderDisabledChecked: string;
            borderChecked: string;
            borderFocus: string;
            boxShadowFocus: string;
            textColor: string;
            textColorDisabled: string;
            sizeSmall: string;
            sizeMedium: string;
            sizeLarge: string;
            labelPadding: string;
            labelFontWeight: string;
        }, any>;
        Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
            height: string;
            width: string;
            borderRadius: string;
            color: string;
            colorHover: string;
            railInsetHorizontalBottom: string;
            railInsetHorizontalTop: string;
            railInsetVerticalRight: string;
            railInsetVerticalLeft: string;
            railColor: string;
        }, any>;
        Empty: import("../../_mixins").Theme<"Empty", {
            fontSizeTiny: string;
            fontSizeSmall: string;
            fontSizeMedium: string;
            fontSizeLarge: string;
            fontSizeHuge: string;
            textColor: string;
            iconColor: string;
            extraTextColor: string;
            iconSizeTiny: string;
            iconSizeSmall: string;
            iconSizeMedium: string;
            iconSizeLarge: string;
            iconSizeHuge: string;
        }, any>;
    }>>>;
}>, {
    mergedClsPrefix: import("vue").Ref<string, string>;
    mergedTheme: import("vue").ComputedRef<{
        common: import("../..").ThemeCommonVars;
        self: {
            fontSize: string;
            lineHeight: string;
            nodeHeight: string;
            nodeWrapperPadding: string;
            nodeBorderRadius: string;
            nodeColorHover: string;
            nodeColorPressed: string;
            nodeColorActive: string;
            arrowColor: string;
            nodeTextColor: string;
            nodeTextColorDisabled: string;
            loadingColor: string;
            dropMarkColor: string;
            lineColor: string;
        };
        peers: {
            Checkbox: import("../../_mixins").Theme<"Checkbox", {
                labelLineHeight: string;
                fontSizeSmall: string;
                fontSizeMedium: string;
                fontSizeLarge: string;
                borderRadius: string;
                color: string;
                colorChecked: string;
                colorDisabled: string;
                colorDisabledChecked: string;
                colorTableHeader: string;
                colorTableHeaderModal: string;
                colorTableHeaderPopover: string;
                checkMarkColor: string;
                checkMarkColorDisabled: string;
                checkMarkColorDisabledChecked: string;
                border: string;
                borderDisabled: string;
                borderDisabledChecked: string;
                borderChecked: string;
                borderFocus: string;
                boxShadowFocus: string;
                textColor: string;
                textColorDisabled: string;
                sizeSmall: string;
                sizeMedium: string;
                sizeLarge: string;
                labelPadding: string;
                labelFontWeight: string;
            }, any>;
            Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
                height: string;
                width: string;
                borderRadius: string;
                color: string;
                colorHover: string;
                railInsetHorizontalBottom: string;
                railInsetHorizontalTop: string;
                railInsetVerticalRight: string;
                railInsetVerticalLeft: string;
                railColor: string;
            }, any>;
            Empty: import("../../_mixins").Theme<"Empty", {
                fontSizeTiny: string;
                fontSizeSmall: string;
                fontSizeMedium: string;
                fontSizeLarge: string;
                fontSizeHuge: string;
                textColor: string;
                iconColor: string;
                extraTextColor: string;
                iconSizeTiny: string;
                iconSizeSmall: string;
                iconSizeMedium: string;
                iconSizeLarge: string;
                iconSizeHuge: string;
            }, any>;
        };
        peerOverrides: {
            Checkbox?: {
                peers?: {
                    [x: string]: any;
                } | undefined;
            } | undefined;
            Scrollbar?: {
                peers?: {
                    [x: string]: any;
                } | undefined;
            } | undefined;
            Empty?: {
                peers?: {
                    [x: string]: any;
                } | undefined;
            } | undefined;
        };
    }>;
    mergedRenderEmpty: import("vue").ComputedRef<(() => VNodeChild) | undefined>;
    rtlEnabled: import("vue").Ref<import("../../config-provider/src/internal-interface").RtlItem | undefined, import("../../config-provider/src/internal-interface").RtlItem | undefined> | undefined;
    fNodes: import("vue").ComputedRef<({
        key: import("treemate").Key;
        rawNode: {
            [x: string]: unknown;
            key?: Key | undefined;
            label?: string | undefined;
            checkboxDisabled?: boolean | undefined;
            disabled?: boolean | undefined;
            isLeaf?: boolean | undefined;
            children?: /*elided*/ any[] | undefined;
            prefix?: (() => VNodeChild) | undefined;
            suffix?: (() => VNodeChild) | undefined;
        };
        level: number;
        index: number;
        isFirstChild: boolean;
        isLastChild: boolean;
        parent: {
            key: import("treemate").Key;
            rawNode: {
                [x: string]: unknown;
                key?: Key | undefined;
                label?: string | undefined;
                checkboxDisabled?: boolean | undefined;
                disabled?: boolean | undefined;
                isLeaf?: boolean | undefined;
                children?: /*elided*/ any[] | undefined;
                prefix?: (() => VNodeChild) | undefined;
                suffix?: (() => VNodeChild) | undefined;
            };
            level: number;
            index: number;
            isFirstChild: boolean;
            isLastChild: boolean;
            parent: /*elided*/ any | null;
            isLeaf: boolean;
            isGroup: boolean;
            ignored: boolean;
            shallowLoaded: boolean;
            disabled: boolean;
            siblings: /*elided*/ any[];
            children?: /*elided*/ any[] | undefined;
            getPrev: (options?: import("treemate/lib/interface").GetPrevNextOptions) => import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null;
            getNext: (options?: import("treemate/lib/interface").GetPrevNextOptions) => import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null;
            getParent: () => import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null;
            getChild: () => import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null;
            contains: (treeNode: import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null | undefined) => boolean;
        } | null;
        isLeaf: boolean;
        isGroup: boolean;
        ignored: boolean;
        shallowLoaded: boolean;
        disabled: boolean;
        siblings: {
            key: import("treemate").Key;
            rawNode: {
                [x: string]: unknown;
                key?: Key | undefined;
                label?: string | undefined;
                checkboxDisabled?: boolean | undefined;
                disabled?: boolean | undefined;
                isLeaf?: boolean | undefined;
                children?: /*elided*/ any[] | undefined;
                prefix?: (() => VNodeChild) | undefined;
                suffix?: (() => VNodeChild) | undefined;
            };
            level: number;
            index: number;
            isFirstChild: boolean;
            isLastChild: boolean;
            parent: /*elided*/ any | null;
            isLeaf: boolean;
            isGroup: boolean;
            ignored: boolean;
            shallowLoaded: boolean;
            disabled: boolean;
            siblings: /*elided*/ any[];
            children?: /*elided*/ any[] | undefined;
            getPrev: (options?: import("treemate/lib/interface").GetPrevNextOptions) => import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null;
            getNext: (options?: import("treemate/lib/interface").GetPrevNextOptions) => import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null;
            getParent: () => import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null;
            getChild: () => import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null;
            contains: (treeNode: import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null | undefined) => boolean;
        }[];
        children?: {
            key: import("treemate").Key;
            rawNode: {
                [x: string]: unknown;
                key?: Key | undefined;
                label?: string | undefined;
                checkboxDisabled?: boolean | undefined;
                disabled?: boolean | undefined;
                isLeaf?: boolean | undefined;
                children?: /*elided*/ any[] | undefined;
                prefix?: (() => VNodeChild) | undefined;
                suffix?: (() => VNodeChild) | undefined;
            };
            level: number;
            index: number;
            isFirstChild: boolean;
            isLastChild: boolean;
            parent: /*elided*/ any | null;
            isLeaf: boolean;
            isGroup: boolean;
            ignored: boolean;
            shallowLoaded: boolean;
            disabled: boolean;
            siblings: /*elided*/ any[];
            children?: /*elided*/ any[] | undefined;
            getPrev: (options?: import("treemate/lib/interface").GetPrevNextOptions) => import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null;
            getNext: (options?: import("treemate/lib/interface").GetPrevNextOptions) => import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null;
            getParent: () => import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null;
            getChild: () => import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null;
            contains: (treeNode: import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null | undefined) => boolean;
        }[] | undefined;
        getPrev: (options?: import("treemate/lib/interface").GetPrevNextOptions) => import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null;
        getNext: (options?: import("treemate/lib/interface").GetPrevNextOptions) => import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null;
        getParent: () => import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null;
        getChild: () => import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null;
        contains: (treeNode: import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null | undefined) => boolean;
    } | {
        __motion: true;
        height: number | undefined;
        mode: "expand" | "collapse";
        nodes: {
            key: import("treemate").Key;
            rawNode: {
                [x: string]: unknown;
                key?: Key | undefined;
                label?: string | undefined;
                checkboxDisabled?: boolean | undefined;
                disabled?: boolean | undefined;
                isLeaf?: boolean | undefined;
                children?: /*elided*/ any[] | undefined;
                prefix?: (() => VNodeChild) | undefined;
                suffix?: (() => VNodeChild) | undefined;
            };
            level: number;
            index: number;
            isFirstChild: boolean;
            isLastChild: boolean;
            parent: {
                key: import("treemate").Key;
                rawNode: {
                    [x: string]: unknown;
                    key?: Key | undefined;
                    label?: string | undefined;
                    checkboxDisabled?: boolean | undefined;
                    disabled?: boolean | undefined;
                    isLeaf?: boolean | undefined;
                    children?: /*elided*/ any[] | undefined;
                    prefix?: (() => VNodeChild) | undefined;
                    suffix?: (() => VNodeChild) | undefined;
                };
                level: number;
                index: number;
                isFirstChild: boolean;
                isLastChild: boolean;
                parent: /*elided*/ any | null;
                isLeaf: boolean;
                isGroup: boolean;
                ignored: boolean;
                shallowLoaded: boolean;
                disabled: boolean;
                siblings: /*elided*/ any[];
                children?: /*elided*/ any[] | undefined;
                getPrev: (options?: import("treemate/lib/interface").GetPrevNextOptions) => import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null;
                getNext: (options?: import("treemate/lib/interface").GetPrevNextOptions) => import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null;
                getParent: () => import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null;
                getChild: () => import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null;
                contains: (treeNode: import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null | undefined) => boolean;
            } | null;
            isLeaf: boolean;
            isGroup: boolean;
            ignored: boolean;
            shallowLoaded: boolean;
            disabled: boolean;
            siblings: {
                key: import("treemate").Key;
                rawNode: {
                    [x: string]: unknown;
                    key?: Key | undefined;
                    label?: string | undefined;
                    checkboxDisabled?: boolean | undefined;
                    disabled?: boolean | undefined;
                    isLeaf?: boolean | undefined;
                    children?: /*elided*/ any[] | undefined;
                    prefix?: (() => VNodeChild) | undefined;
                    suffix?: (() => VNodeChild) | undefined;
                };
                level: number;
                index: number;
                isFirstChild: boolean;
                isLastChild: boolean;
                parent: /*elided*/ any | null;
                isLeaf: boolean;
                isGroup: boolean;
                ignored: boolean;
                shallowLoaded: boolean;
                disabled: boolean;
                siblings: /*elided*/ any[];
                children?: /*elided*/ any[] | undefined;
                getPrev: (options?: import("treemate/lib/interface").GetPrevNextOptions) => import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null;
                getNext: (options?: import("treemate/lib/interface").GetPrevNextOptions) => import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null;
                getParent: () => import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null;
                getChild: () => import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null;
                contains: (treeNode: import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null | undefined) => boolean;
            }[];
            children?: {
                key: import("treemate").Key;
                rawNode: {
                    [x: string]: unknown;
                    key?: Key | undefined;
                    label?: string | undefined;
                    checkboxDisabled?: boolean | undefined;
                    disabled?: boolean | undefined;
                    isLeaf?: boolean | undefined;
                    children?: /*elided*/ any[] | undefined;
                    prefix?: (() => VNodeChild) | undefined;
                    suffix?: (() => VNodeChild) | undefined;
                };
                level: number;
                index: number;
                isFirstChild: boolean;
                isLastChild: boolean;
                parent: /*elided*/ any | null;
                isLeaf: boolean;
                isGroup: boolean;
                ignored: boolean;
                shallowLoaded: boolean;
                disabled: boolean;
                siblings: /*elided*/ any[];
                children?: /*elided*/ any[] | undefined;
                getPrev: (options?: import("treemate/lib/interface").GetPrevNextOptions) => import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null;
                getNext: (options?: import("treemate/lib/interface").GetPrevNextOptions) => import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null;
                getParent: () => import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null;
                getChild: () => import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null;
                contains: (treeNode: import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null | undefined) => boolean;
            }[] | undefined;
            getPrev: (options?: import("treemate/lib/interface").GetPrevNextOptions) => import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null;
            getNext: (options?: import("treemate/lib/interface").GetPrevNextOptions) => import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null;
            getParent: () => import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null;
            getChild: () => import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null;
            contains: (treeNode: import("treemate").TreeNode<TreeOption, TreeOption, TreeOption> | null | undefined) => boolean;
        }[];
    })[]>;
    aip: import("vue").Ref<boolean, boolean>;
    selfElRef: import("vue").Ref<HTMLDivElement | null, HTMLDivElement | null>;
    virtualListInstRef: import("vue").Ref<{
        listElRef: HTMLElement;
        itemsElRef: HTMLElement | null;
        scrollTo: import("vueuc").VVirtualListScrollTo;
    } | null, VirtualListInst | {
        listElRef: HTMLElement;
        itemsElRef: HTMLElement | null;
        scrollTo: import("vueuc").VVirtualListScrollTo;
    } | null>;
    scrollbarInstRef: import("vue").Ref<{
        $el: HTMLElement;
        containerRef: HTMLElement | null;
        contentRef: HTMLElement | null;
        containerScrollTop: number;
        syncUnifiedContainer: () => void;
        scrollTo: import("../../_internal/scrollbar/src/Scrollbar").ScrollTo;
        scrollBy: import("../../_internal/scrollbar/src/Scrollbar").ScrollBy;
        sync: () => void;
        handleMouseEnterWrapper: () => void;
        handleMouseLeaveWrapper: () => void;
    } | null, ScrollbarInst | {
        $el: HTMLElement;
        containerRef: HTMLElement | null;
        contentRef: HTMLElement | null;
        containerScrollTop: number;
        syncUnifiedContainer: () => void;
        scrollTo: import("../../_internal/scrollbar/src/Scrollbar").ScrollTo;
        scrollBy: import("../../_internal/scrollbar/src/Scrollbar").ScrollBy;
        sync: () => void;
        handleMouseEnterWrapper: () => void;
        handleMouseLeaveWrapper: () => void;
    } | null>;
    handleFocusout: (e: FocusEvent) => void;
    handleDragLeaveTree: (e: DragEvent) => void;
    handleScroll: () => void;
    getScrollContainer: () => HTMLElement | null | undefined;
    getScrollContent: () => HTMLElement | null | undefined;
    handleAfterEnter: () => void;
    handleResize: () => void;
    cssVars: import("vue").ComputedRef<{
        '--n-arrow-color': string;
        '--n-loading-color': string;
        '--n-bezier': string;
        '--n-font-size': string;
        '--n-node-border-radius': string;
        '--n-node-color-active': string;
        '--n-node-color-hover': string;
        '--n-node-color-pressed': string;
        '--n-node-text-color': string;
        '--n-node-text-color-disabled': string;
        '--n-drop-mark-color': string;
        '--n-node-wrapper-padding': string;
        '--n-line-offset-top': string;
        '--n-line-offset-bottom': string;
        '--n-node-content-height': string;
        '--n-line-height': string;
        '--n-line-color': string;
    }> | undefined;
    themeClass: import("vue").Ref<string, string> | undefined;
    onRender: (() => void) | undefined;
    handleKeydown: (e: KeyboardEvent) => {
        enterBehavior: import("./interface").TreeOverrideNodeClickBehaviorReturn | null;
    };
    scrollTo: import("vueuc").VVirtualListScrollTo;
    getCheckedData: () => {
        keys: Key[];
        options: Array<TreeOption | null>;
    };
    getIndeterminateData: () => {
        keys: Key[];
        options: Array<TreeOption | null>;
    };
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly internalTreeSelect: BooleanConstructor;
    readonly internalScrollable: BooleanConstructor;
    readonly internalScrollablePadding: StringConstructor;
    readonly internalRenderEmpty: PropType<() => VNodeChild>;
    readonly internalHighlightKeySet: PropType<Set<Key> | null>;
    readonly internalUnifySelectCheck: BooleanConstructor;
    readonly internalCheckboxFocusable: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly internalFocusable: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly checkStrategy: {
        readonly type: PropType<CheckStrategy>;
        readonly default: "all";
    };
    readonly spinProps: PropType<TreeSpinProps>;
    /**
     * @deprecated
     */
    readonly leafOnly: BooleanConstructor;
    readonly allowCheckingNotLoaded: BooleanConstructor;
    readonly filter: PropType<(pattern: string, node: TreeOption) => boolean>;
    readonly defaultExpandAll: BooleanConstructor;
    readonly expandedKeys: PropType<Key[]>;
    readonly keyField: {
        readonly type: StringConstructor;
        readonly default: "key";
    };
    readonly labelField: {
        readonly type: StringConstructor;
        readonly default: "label";
    };
    readonly childrenField: {
        readonly type: StringConstructor;
        readonly default: "children";
    };
    readonly disabledField: {
        readonly type: StringConstructor;
        readonly default: "disabled";
    };
    readonly defaultExpandedKeys: {
        readonly type: PropType<Key[]>;
        readonly default: () => never[];
    };
    readonly indent: {
        readonly type: NumberConstructor;
        readonly default: 24;
    };
    readonly indeterminateKeys: PropType<Key[]>;
    readonly renderSwitcherIcon: PropType<RenderSwitcherIcon>;
    readonly onUpdateIndeterminateKeys: PropType<MaybeArray<OnUpdateIndeterminateKeys>>;
    readonly 'onUpdate:indeterminateKeys': PropType<MaybeArray<OnUpdateIndeterminateKeys>>;
    readonly onUpdateExpandedKeys: PropType<MaybeArray<onUpdateExpandedKeys>>;
    readonly 'onUpdate:expandedKeys': PropType<MaybeArray<onUpdateExpandedKeys>>;
    readonly overrideDefaultNodeClickBehavior: PropType<TreeOverrideNodeClickBehavior>;
    readonly accordion: BooleanConstructor;
    readonly showIrrelevantNodes: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly data: {
        readonly type: PropType<TreeOptions>;
        readonly default: () => never[];
    };
    readonly expandOnDragenter: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly expandOnClick: BooleanConstructor;
    readonly checkOnClick: {
        readonly type: PropType<boolean | CheckOnClick>;
        readonly default: false;
    };
    readonly cancelable: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly checkable: BooleanConstructor;
    readonly draggable: BooleanConstructor;
    readonly blockNode: BooleanConstructor;
    readonly blockLine: BooleanConstructor;
    readonly showLine: BooleanConstructor;
    readonly disabled: BooleanConstructor;
    readonly checkedKeys: PropType<Key[]>;
    readonly defaultCheckedKeys: {
        readonly type: PropType<Key[]>;
        readonly default: () => never[];
    };
    readonly selectedKeys: PropType<Key[]>;
    readonly defaultSelectedKeys: {
        readonly type: PropType<Key[]>;
        readonly default: () => never[];
    };
    readonly multiple: BooleanConstructor;
    readonly pattern: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly onLoad: PropType<OnLoad>;
    readonly cascade: BooleanConstructor;
    readonly selectable: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly scrollbarProps: PropType<ScrollbarProps>;
    readonly allowDrop: {
        readonly type: PropType<AllowDrop>;
        readonly default: typeof defaultAllowDrop;
    };
    readonly animated: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly ellipsis: BooleanConstructor;
    readonly checkboxPlacement: {
        readonly type: PropType<"left" | "right">;
        readonly default: "left";
    };
    readonly virtualScroll: BooleanConstructor;
    readonly watchProps: PropType<Array<"defaultCheckedKeys" | "defaultSelectedKeys" | "defaultExpandedKeys">>;
    readonly renderLabel: PropType<RenderLabel>;
    readonly renderPrefix: PropType<RenderPrefix>;
    readonly renderSuffix: PropType<RenderSuffix>;
    readonly nodeProps: PropType<TreeNodeProps>;
    readonly keyboard: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly getChildren: PropType<GetChildren>;
    readonly onDragenter: PropType<MaybeArray<(e: TreeDragInfo) => void>>;
    readonly onDragleave: PropType<MaybeArray<(e: TreeDragInfo) => void>>;
    readonly onDragend: PropType<MaybeArray<(e: TreeDragInfo) => void>>;
    readonly onDragstart: PropType<MaybeArray<(e: TreeDragInfo) => void>>;
    readonly onDragover: PropType<MaybeArray<(e: TreeDragInfo) => void>>;
    readonly onDrop: PropType<MaybeArray<(e: TreeDropInfo) => void>>;
    readonly onUpdateCheckedKeys: PropType<MaybeArray<OnUpdateCheckedKeys>>;
    readonly 'onUpdate:checkedKeys': PropType<MaybeArray<OnUpdateCheckedKeys>>;
    readonly onUpdateSelectedKeys: PropType<MaybeArray<OnUpdateSelectedKeys>>;
    readonly 'onUpdate:selectedKeys': PropType<MaybeArray<OnUpdateSelectedKeys>>;
    readonly theme: PropType<import("../../_mixins").Theme<"Tree", {
        fontSize: string;
        lineHeight: string;
        nodeHeight: string;
        nodeWrapperPadding: string;
        nodeBorderRadius: string;
        nodeColorHover: string;
        nodeColorPressed: string;
        nodeColorActive: string;
        arrowColor: string;
        nodeTextColor: string;
        nodeTextColorDisabled: string;
        loadingColor: string;
        dropMarkColor: string;
        lineColor: string;
    }, {
        Checkbox: import("../../_mixins").Theme<"Checkbox", {
            labelLineHeight: string;
            fontSizeSmall: string;
            fontSizeMedium: string;
            fontSizeLarge: string;
            borderRadius: string;
            color: string;
            colorChecked: string;
            colorDisabled: string;
            colorDisabledChecked: string;
            colorTableHeader: string;
            colorTableHeaderModal: string;
            colorTableHeaderPopover: string;
            checkMarkColor: string;
            checkMarkColorDisabled: string;
            checkMarkColorDisabledChecked: string;
            border: string;
            borderDisabled: string;
            borderDisabledChecked: string;
            borderChecked: string;
            borderFocus: string;
            boxShadowFocus: string;
            textColor: string;
            textColorDisabled: string;
            sizeSmall: string;
            sizeMedium: string;
            sizeLarge: string;
            labelPadding: string;
            labelFontWeight: string;
        }, any>;
        Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
            height: string;
            width: string;
            borderRadius: string;
            color: string;
            colorHover: string;
            railInsetHorizontalBottom: string;
            railInsetHorizontalTop: string;
            railInsetVerticalRight: string;
            railInsetVerticalLeft: string;
            railColor: string;
        }, any>;
        Empty: import("../../_mixins").Theme<"Empty", {
            fontSizeTiny: string;
            fontSizeSmall: string;
            fontSizeMedium: string;
            fontSizeLarge: string;
            fontSizeHuge: string;
            textColor: string;
            iconColor: string;
            extraTextColor: string;
            iconSizeTiny: string;
            iconSizeSmall: string;
            iconSizeMedium: string;
            iconSizeLarge: string;
            iconSizeHuge: string;
        }, any>;
    }>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Tree", {
        fontSize: string;
        lineHeight: string;
        nodeHeight: string;
        nodeWrapperPadding: string;
        nodeBorderRadius: string;
        nodeColorHover: string;
        nodeColorPressed: string;
        nodeColorActive: string;
        arrowColor: string;
        nodeTextColor: string;
        nodeTextColorDisabled: string;
        loadingColor: string;
        dropMarkColor: string;
        lineColor: string;
    }, {
        Checkbox: import("../../_mixins").Theme<"Checkbox", {
            labelLineHeight: string;
            fontSizeSmall: string;
            fontSizeMedium: string;
            fontSizeLarge: string;
            borderRadius: string;
            color: string;
            colorChecked: string;
            colorDisabled: string;
            colorDisabledChecked: string;
            colorTableHeader: string;
            colorTableHeaderModal: string;
            colorTableHeaderPopover: string;
            checkMarkColor: string;
            checkMarkColorDisabled: string;
            checkMarkColorDisabledChecked: string;
            border: string;
            borderDisabled: string;
            borderDisabledChecked: string;
            borderChecked: string;
            borderFocus: string;
            boxShadowFocus: string;
            textColor: string;
            textColorDisabled: string;
            sizeSmall: string;
            sizeMedium: string;
            sizeLarge: string;
            labelPadding: string;
            labelFontWeight: string;
        }, any>;
        Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
            height: string;
            width: string;
            borderRadius: string;
            color: string;
            colorHover: string;
            railInsetHorizontalBottom: string;
            railInsetHorizontalTop: string;
            railInsetVerticalRight: string;
            railInsetVerticalLeft: string;
            railColor: string;
        }, any>;
        Empty: import("../../_mixins").Theme<"Empty", {
            fontSizeTiny: string;
            fontSizeSmall: string;
            fontSizeMedium: string;
            fontSizeLarge: string;
            fontSizeHuge: string;
            textColor: string;
            iconColor: string;
            extraTextColor: string;
            iconSizeTiny: string;
            iconSizeSmall: string;
            iconSizeMedium: string;
            iconSizeLarge: string;
            iconSizeHuge: string;
        }, any>;
    }>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Tree", {
        fontSize: string;
        lineHeight: string;
        nodeHeight: string;
        nodeWrapperPadding: string;
        nodeBorderRadius: string;
        nodeColorHover: string;
        nodeColorPressed: string;
        nodeColorActive: string;
        arrowColor: string;
        nodeTextColor: string;
        nodeTextColorDisabled: string;
        loadingColor: string;
        dropMarkColor: string;
        lineColor: string;
    }, {
        Checkbox: import("../../_mixins").Theme<"Checkbox", {
            labelLineHeight: string;
            fontSizeSmall: string;
            fontSizeMedium: string;
            fontSizeLarge: string;
            borderRadius: string;
            color: string;
            colorChecked: string;
            colorDisabled: string;
            colorDisabledChecked: string;
            colorTableHeader: string;
            colorTableHeaderModal: string;
            colorTableHeaderPopover: string;
            checkMarkColor: string;
            checkMarkColorDisabled: string;
            checkMarkColorDisabledChecked: string;
            border: string;
            borderDisabled: string;
            borderDisabledChecked: string;
            borderChecked: string;
            borderFocus: string;
            boxShadowFocus: string;
            textColor: string;
            textColorDisabled: string;
            sizeSmall: string;
            sizeMedium: string;
            sizeLarge: string;
            labelPadding: string;
            labelFontWeight: string;
        }, any>;
        Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
            height: string;
            width: string;
            borderRadius: string;
            color: string;
            colorHover: string;
            railInsetHorizontalBottom: string;
            railInsetHorizontalTop: string;
            railInsetVerticalRight: string;
            railInsetVerticalLeft: string;
            railColor: string;
        }, any>;
        Empty: import("../../_mixins").Theme<"Empty", {
            fontSizeTiny: string;
            fontSizeSmall: string;
            fontSizeMedium: string;
            fontSizeLarge: string;
            fontSizeHuge: string;
            textColor: string;
            iconColor: string;
            extraTextColor: string;
            iconSizeTiny: string;
            iconSizeSmall: string;
            iconSizeMedium: string;
            iconSizeLarge: string;
            iconSizeHuge: string;
        }, any>;
    }>>>;
}>> & Readonly<{}>, {
    readonly disabled: boolean;
    readonly data: TreeOptions;
    readonly internalScrollable: boolean;
    readonly keyboard: boolean;
    readonly draggable: boolean;
    readonly animated: boolean;
    readonly allowCheckingNotLoaded: boolean;
    readonly multiple: boolean;
    readonly disabledField: string;
    readonly cascade: boolean;
    readonly leafOnly: boolean;
    readonly virtualScroll: boolean;
    readonly checkStrategy: CheckStrategy;
    readonly labelField: string;
    readonly childrenField: string;
    readonly pattern: string;
    readonly accordion: boolean;
    readonly defaultExpandAll: boolean;
    readonly indent: number;
    readonly ellipsis: boolean;
    readonly keyField: string;
    readonly defaultExpandedKeys: Key[];
    readonly cancelable: boolean;
    readonly checkable: boolean;
    readonly defaultCheckedKeys: Key[];
    readonly defaultSelectedKeys: Key[];
    readonly internalTreeSelect: boolean;
    readonly internalUnifySelectCheck: boolean;
    readonly internalCheckboxFocusable: boolean;
    readonly internalFocusable: boolean;
    readonly showIrrelevantNodes: boolean;
    readonly expandOnDragenter: boolean;
    readonly expandOnClick: boolean;
    readonly checkOnClick: boolean | CheckOnClick;
    readonly blockNode: boolean;
    readonly blockLine: boolean;
    readonly showLine: boolean;
    readonly selectable: boolean;
    readonly allowDrop: AllowDrop;
    readonly checkboxPlacement: "left" | "right";
}, SlotsType<TreeSlots>, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
