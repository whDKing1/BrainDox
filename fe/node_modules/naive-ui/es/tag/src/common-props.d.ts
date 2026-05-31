import type { PropType } from 'vue';
import type { TagSize } from './public-types';
export interface TagColor {
    color?: string;
    borderColor?: string;
    textColor?: string;
}
declare const _default: {
    readonly color: PropType<TagColor>;
    readonly type: {
        readonly type: PropType<"default" | "primary" | "success" | "info" | "warning" | "error">;
        readonly default: "default";
    };
    readonly round: BooleanConstructor;
    readonly size: PropType<TagSize>;
    readonly closable: BooleanConstructor;
    readonly disabled: {
        readonly type: PropType<boolean | undefined>;
        readonly default: undefined;
    };
};
export default _default;
