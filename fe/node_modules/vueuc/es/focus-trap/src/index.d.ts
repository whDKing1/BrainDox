import { PropType } from 'vue';
export declare const FocusTrap: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    disabled: BooleanConstructor;
    active: BooleanConstructor;
    autoFocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    onEsc: PropType<(e: KeyboardEvent) => void>;
    initialFocusTo: PropType<string | (() => HTMLElement | undefined | null)>;
    finalFocusTo: PropType<string | (() => HTMLElement | undefined | null)>;
    returnFocusOnDeactivated: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {
    focusableStartRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    focusableEndRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    focusableStyle: string;
    handleStartFocus: (e: FocusEvent) => void;
    handleEndFocus: (e: FocusEvent) => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    disabled: BooleanConstructor;
    active: BooleanConstructor;
    autoFocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    onEsc: PropType<(e: KeyboardEvent) => void>;
    initialFocusTo: PropType<string | (() => HTMLElement | undefined | null)>;
    finalFocusTo: PropType<string | (() => HTMLElement | undefined | null)>;
    returnFocusOnDeactivated: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{}>, {
    disabled: boolean;
    active: boolean;
    autoFocus: boolean;
    returnFocusOnDeactivated: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
