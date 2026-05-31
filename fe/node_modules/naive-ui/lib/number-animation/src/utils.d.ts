export interface TweenProps {
    from: number;
    to: number;
    duration: number;
    onUpdate: (currentValue: number) => void;
    onFinish: () => void;
}
export declare function tween(props: TweenProps): void;
