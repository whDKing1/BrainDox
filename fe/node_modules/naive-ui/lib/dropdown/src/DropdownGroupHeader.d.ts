declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    tmNode: {
        type: ObjectConstructor;
        required: true;
    };
}>, {
    labelField: import("vue").Ref<string, string>;
    showIcon: import("vue").Ref<boolean, boolean>;
    hasSubmenu: import("vue").Ref<boolean, boolean>;
    renderLabel: import("vue").Ref<import("./interface").RenderLabelImpl | undefined, import("./interface").RenderLabelImpl | undefined>;
    nodeProps: import("vue").Ref<import("../..").MenuNodeProps | undefined, import("../..").MenuNodeProps | undefined>;
    renderOption: import("vue").Ref<import("./interface").RenderOptionImpl | undefined, import("./interface").RenderOptionImpl | undefined>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    clsPrefix: {
        type: StringConstructor;
        required: true;
    };
    tmNode: {
        type: ObjectConstructor;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
