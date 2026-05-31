"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const button_1 = require("../../button");
const collapse_1 = require("../../collapse");
const color_picker_1 = require("../../color-picker");
const config_provider_1 = require("../../config-provider");
const context_1 = require("../../config-provider/src/context");
const divider_1 = require("../../divider");
const element_1 = require("../../element");
const empty_1 = require("../../empty");
const grid_1 = require("../../grid");
const icon_1 = require("../../icon");
const input_1 = require("../../input");
const popover_1 = require("../../popover");
const space_1 = require("../../space");
const light_1 = require("../../themes/light");
const MaximizeIcon_1 = require("./MaximizeIcon");
const MinimizeIcon_1 = require("./MinimizeIcon");
function renderColorWandIcon() {
    return ((0, vue_1.h)("svg", { viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", style: { width: '1em', height: '1em', color: 'currentColor' } },
        (0, vue_1.h)("path", { d: "M13.5 1C13.7761 1 14 1.22386 14 1.5V2H14.5C14.7761 2 15 2.22386 15 2.5C15 2.77614 14.7761 3 14.5 3H14V3.5C14 3.77614 13.7761 4 13.5 4C13.2239 4 13 3.77614 13 3.5V3H12.5C12.2239 3 12 2.77614 12 2.5C12 2.22386 12.2239 2 12.5 2H13V1.5C13 1.22386 13.2239 1 13.5 1Z", fill: "currentColor" }),
        (0, vue_1.h)("path", { d: "M3.5 3C3.77615 3 4 3.22386 4 3.5V4H4.5C4.77615 4 5 4.22386 5 4.5C5 4.77614 4.77615 5 4.5 5H4V5.5C4 5.77614 3.77615 6 3.5 6C3.22386 6 3 5.77614 3 5.5V5H2.5C2.22386 5 2 4.77614 2 4.5C2 4.22386 2.22386 4 2.5 4H3V3.5C3 3.22386 3.22386 3 3.5 3Z", fill: "currentColor" }),
        (0, vue_1.h)("path", { d: "M12.5 12C12.7761 12 13 11.7761 13 11.5C13 11.2239 12.7761 11 12.5 11H12V10.5C12 10.2239 11.7761 10 11.5 10C11.2239 10 11 10.2239 11 10.5V11H10.5C10.2239 11 10 11.2239 10 11.5C10 11.7761 10.2239 12 10.5 12H11V12.5C11 12.7761 11.2239 13 11.5 13C11.7761 13 12 12.7761 12 12.5V12H12.5Z", fill: "currentColor" }),
        (0, vue_1.h)("path", { d: "M8.72956 4.56346C9.4771 3.81592 10.6891 3.81592 11.4367 4.56347C12.1842 5.31102 12.1842 6.52303 11.4367 7.27058L4.26679 14.4404C3.51924 15.1879 2.30723 15.1879 1.55968 14.4404C0.812134 13.6928 0.812138 12.4808 1.55969 11.7333L8.72956 4.56346ZM8.25002 6.4572L2.26679 12.4404C1.90977 12.7974 1.90977 13.3763 2.26679 13.7333C2.62381 14.0903 3.20266 14.0903 3.55968 13.7333L9.54292 7.75009L8.25002 6.4572ZM10.25 7.04299L10.7295 6.56347C11.0866 6.20645 11.0866 5.6276 10.7296 5.27057C10.3725 4.91355 9.79368 4.91355 9.43666 5.27057L8.95713 5.7501L10.25 7.04299Z", fill: "currentColor" })));
}
// button colorOpacitySecondary var is not color
function showColorPicker(key) {
    if (key.includes('pacity'))
        return false;
    if (key.includes('color') || key.includes('Color'))
        return true;
    return false;
}
exports.default = (0, vue_1.defineComponent)({
    name: 'ThemeEditor',
    inheritAttrs: false,
    setup() {
        const isMaximized = (0, vue_1.ref)(false);
        const fileInputRef = (0, vue_1.ref)(null);
        const NConfigProvider = (0, vue_1.inject)(context_1.configProviderInjectionKey, null);
        const overridesRef = (0, vue_1.ref)(JSON.parse(localStorage['naive-ui-theme-overrides'] || '{}'));
        const theme = (0, vue_1.computed)(() => {
            var _a, _b, _c, _d;
            const mergedTheme = (NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedThemeRef.value) || light_1.lightTheme;
            const mergedThemeOverrides = NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedThemeOverridesRef.value;
            const common = (0, lodash_1.merge)({}, mergedTheme.common || light_1.lightTheme.common, mergedThemeOverrides === null || mergedThemeOverrides === void 0 ? void 0 : mergedThemeOverrides.common, overridesRef.value.common || {});
            const overrides = {
                common
            };
            for (const key of Object.keys(light_1.lightTheme)) {
                if (key === 'common') {
                    continue;
                }
                ;
                overrides[key] = (((_b = (_a = mergedTheme[key]) === null || _a === void 0 ? void 0 : _a.self) === null || _b === void 0 ? void 0 : _b.call(_a, common))
                    || ((_d = (_c = light_1.lightTheme[key]).self) === null || _d === void 0 ? void 0 : _d.call(_c, common)));
                // There (last line) we must use as any, nor ts 2590 will be raised since the union
                // is too complex
                if (mergedThemeOverrides && overrides[key]) {
                    (0, lodash_1.merge)(overrides[key], mergedThemeOverrides[key]);
                }
            }
            return overrides;
        });
        const themeCommonDefaultRef = (0, vue_1.computed)(() => {
            var _a;
            return ((_a = NConfigProvider === null || NConfigProvider === void 0 ? void 0 : NConfigProvider.mergedThemeRef.value) === null || _a === void 0 ? void 0 : _a.common) || light_1.lightTheme.common;
        });
        const showPanelRef = (0, vue_1.ref)(false);
        const tempOverridesRef = (0, vue_1.ref)(JSON.parse(localStorage['naive-ui-theme-overrides'] || '{}'));
        const varNamePatternRef = (0, vue_1.ref)('');
        const compNamePatternRef = (0, vue_1.ref)('');
        const tempVarNamePatternRef = (0, vue_1.ref)('');
        const tempCompNamePatternRef = (0, vue_1.ref)('');
        function applyTempOverrides() {
            overridesRef.value = (0, lodash_1.cloneDeep)((0, vue_1.toRaw)(tempOverridesRef.value));
        }
        function setTempOverrides(compName, varName, value) {
            const { value: tempOverrides } = tempOverridesRef;
            if (!(compName in tempOverrides))
                tempOverrides[compName] = {};
            const compOverrides = tempOverrides[compName];
            if (value) {
                compOverrides[varName] = value;
            }
            else {
                delete compOverrides[varName];
            }
        }
        function handleClearAllClick() {
            tempOverridesRef.value = {};
            overridesRef.value = {};
        }
        function handleImportClick() {
            const { value: fileInput } = fileInputRef;
            if (!fileInput)
                return;
            fileInput.click();
        }
        function toggleMaximized() {
            isMaximized.value = !isMaximized.value;
        }
        function handleInputFileChange() {
            const { value: fileInput } = fileInputRef;
            if (!fileInput)
                return;
            const fileList = fileInput.files;
            const file = fileList === null || fileList === void 0 ? void 0 : fileList[0];
            if (!file)
                return;
            file
                .text()
                .then((value) => {
                overridesRef.value = JSON.parse(value);
                tempOverridesRef.value = JSON.parse(value);
            })
                .catch((e) => {
                // eslint-disable-next-line no-alert
                alert('Imported File is Invalid');
                console.error(e);
            })
                .finally(() => {
                fileInput.value = '';
            });
        }
        function handleExportClick() {
            const url = URL.createObjectURL(new Blob([JSON.stringify(overridesRef.value, undefined, 2)]));
            (0, _utils_1.download)(url, 'naive-ui-theme-overrides.json');
            URL.revokeObjectURL(url);
        }
        (0, vue_1.watch)(overridesRef, (value) => {
            localStorage['naive-ui-theme-overrides'] = JSON.stringify(value);
        });
        return {
            locale: (0, _mixins_1.useLocale)('ThemeEditor').localeRef,
            themeCommonDefault: themeCommonDefaultRef,
            theme,
            showPanel: showPanelRef,
            tempOverrides: tempOverridesRef,
            overrides: overridesRef,
            compNamePattern: compNamePatternRef,
            tempCompNamePattern: tempCompNamePatternRef,
            varNamePattern: varNamePatternRef,
            tempVarNamePattern: tempVarNamePatternRef,
            fileInputRef,
            applyTempOverrides,
            setTempOverrides,
            handleClearAllClick,
            handleExportClick,
            handleImportClick,
            handleInputFileChange,
            toggleMaximized,
            isMaximized
        };
    },
    render() {
        return ((0, vue_1.h)(config_provider_1.NConfigProvider, { themeOverrides: this.overrides }, {
            default: () => {
                var _a, _b;
                return [
                    (0, vue_1.h)(popover_1.NPopover, { scrollable: true, arrowPointToCenter: true, trigger: "manual", show: this.showPanel, displayDirective: "show", placement: "top-end", style: {
                            width: this.isMaximized ? 'calc(100vw - 80px)' : '288px',
                            height: 'calc(100vh - 200px)',
                            padding: 0
                        } }, {
                        trigger: () => ((0, vue_1.h)(element_1.NElement, { style: [
                                {
                                    position: 'fixed',
                                    zIndex: 10,
                                    bottom: '40px',
                                    right: `calc(40px + ${_utils_1.lockHtmlScrollRightCompensationRef.value})`,
                                    width: '44px',
                                    height: '44px',
                                    fontSize: '26px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '50%',
                                    backgroundColor: 'var(--popover-color)',
                                    color: 'var(--text-color-2)',
                                    transition: 'color .3s var(--cubic-bezier-ease-in-out), background-color .3s var(--cubic-bezier-ease-in-out), box-shadow .3s var(--cubic-bezier-ease-in-out)',
                                    boxShadow: '0 2px 8px 0px rgba(0, 0, 0, .12)',
                                    cursor: 'pointer'
                                },
                                this.$attrs.style
                            ], 
                            // @ts-expect-error We use ts-ignore for vue-tsc, since it
                            // seems to patch native event for vue components
                            onClick: () => {
                                this.showPanel = !this.showPanel;
                            } }, { default: renderColorWandIcon })),
                        default: () => ((0, vue_1.h)(vue_1.Fragment, null,
                            (0, vue_1.h)("input", { type: "file", ref: "fileInputRef", style: {
                                    display: 'block',
                                    width: 0,
                                    height: 0,
                                    visibility: 'hidden'
                                }, onChange: this.handleInputFileChange }),
                            (0, vue_1.h)(space_1.NSpace, { vertical: true }, {
                                default: () => [
                                    (0, vue_1.h)(space_1.NSpace, { align: "center", justify: "space-between", style: {
                                            marginBottom: '8px',
                                            fontSize: '18px',
                                            fontWeight: 500
                                        } }, {
                                        default: () => ((0, vue_1.h)(vue_1.Fragment, null,
                                            (0, vue_1.h)("span", null, this.locale.title),
                                            (0, vue_1.h)(button_1.NButton, { onClick: this.toggleMaximized, secondary: true, circle: true, size: "tiny" }, {
                                                icon: () => ((0, vue_1.h)(icon_1.NIcon, { component: this.isMaximized
                                                        ? MinimizeIcon_1.MinimizeIcon
                                                        : MaximizeIcon_1.MaximizeIcon }))
                                            })))
                                    }),
                                    this.locale.filterCompName,
                                    (0, vue_1.h)(input_1.NInput, { onChange: () => {
                                            this.compNamePattern = this.tempCompNamePattern;
                                        }, onInput: (value) => {
                                            this.tempCompNamePattern = value;
                                        }, value: this.tempCompNamePattern, placeholder: this.locale.filterCompName }),
                                    this.locale.filterVarName,
                                    (0, vue_1.h)(input_1.NInput, { onChange: (value) => {
                                            this.varNamePattern = value;
                                        }, onInput: (value) => {
                                            this.tempVarNamePattern = value;
                                        }, value: this.tempVarNamePattern, placeholder: this.locale.filterVarName }),
                                    (0, vue_1.h)(button_1.NButton, { size: "small", onClick: () => {
                                            this.compNamePattern = '';
                                            this.varNamePattern = '';
                                            this.tempCompNamePattern = '';
                                            this.tempVarNamePattern = '';
                                        }, block: true }, { default: () => this.locale.clearSearch }),
                                    (0, vue_1.h)(button_1.NButton, { size: "small", onClick: this.handleClearAllClick, block: true }, {
                                        default: () => this.locale.clearAllVars
                                    }),
                                    (0, vue_1.h)(space_1.NSpace, { itemStyle: { flex: 1 } }, {
                                        default: () => ((0, vue_1.h)(vue_1.Fragment, null,
                                            (0, vue_1.h)(button_1.NButton, { block: true, size: "small", onClick: this.handleImportClick }, {
                                                default: () => this.locale.import
                                            }),
                                            (0, vue_1.h)(button_1.NButton, { block: true, size: "small", onClick: this.handleExportClick }, {
                                                default: () => this.locale.export
                                            })))
                                    })
                                ]
                            }),
                            (0, vue_1.h)(divider_1.NDivider, null),
                            (0, vue_1.h)(collapse_1.NCollapse, null, {
                                default: () => {
                                    const { theme, compNamePattern, varNamePattern } = this;
                                    const themeKeys = Object.keys(theme);
                                    const compNamePatternLower = compNamePattern.toLowerCase();
                                    const varNamePatternLower = varNamePattern.toLowerCase();
                                    let filteredItemsCount = 0;
                                    const collapsedItems = themeKeys
                                        .filter((themeKey) => {
                                        return themeKey
                                            .toLowerCase()
                                            .includes(compNamePatternLower);
                                    })
                                        .map((themeKey) => {
                                        const componentTheme = themeKey === 'common'
                                            ? this.themeCommonDefault
                                            : theme[themeKey];
                                        if (componentTheme === undefined) {
                                            return null;
                                        }
                                        const varKeys = Object.keys(componentTheme).filter((key) => {
                                            return (key !== 'name'
                                                && key
                                                    .toLowerCase()
                                                    .includes(varNamePatternLower));
                                        });
                                        if (!varKeys.length) {
                                            return null;
                                        }
                                        filteredItemsCount += 1;
                                        return ((0, vue_1.h)(collapse_1.NCollapseItem, { title: themeKey, name: themeKey }, {
                                            default: () => ((0, vue_1.h)(grid_1.NGrid, { xGap: 32, yGap: 16, responsive: "screen", cols: this.isMaximized
                                                    ? '1 xs:1 s:2 m:3 l:4'
                                                    : 1 }, {
                                                default: () => varKeys.map(varKey => ((0, vue_1.h)(grid_1.NGi, null, {
                                                    default: () => {
                                                        var _a, _b, _c, _d;
                                                        return ((0, vue_1.h)(vue_1.Fragment, null,
                                                            (0, vue_1.h)("div", { key: `${varKey}Label`, style: {
                                                                    wordBreak: 'break-word'
                                                                } }, varKey),
                                                            showColorPicker(varKey) ? ((0, vue_1.h)(color_picker_1.NColorPicker, { key: varKey, modes: ['rgb', 'hex'], value: ((_b = (_a = this
                                                                    .tempOverrides) === null || _a === void 0 ? void 0 : _a[themeKey]) === null || _b === void 0 ? void 0 : _b[varKey])
                                                                    || componentTheme[varKey], onComplete: this
                                                                    .applyTempOverrides, onUpdateValue: (value) => {
                                                                    this.setTempOverrides(themeKey, varKey, value);
                                                                } }, {
                                                                action: () => {
                                                                    var _a, _b;
                                                                    return ((0, vue_1.h)(button_1.NButton, { size: "small", disabled: componentTheme[varKey]
                                                                            === ((_b = (_a = this
                                                                                .tempOverrides) === null || _a === void 0 ? void 0 : _a[themeKey]) === null || _b === void 0 ? void 0 : _b[varKey]), onClick: () => {
                                                                            this.setTempOverrides(themeKey, varKey, componentTheme[varKey]);
                                                                            this.applyTempOverrides();
                                                                        } }, {
                                                                        default: () => this.locale
                                                                            .restore
                                                                    }));
                                                                }
                                                            })) : ((0, vue_1.h)(input_1.NInput, { key: varKey, onChange: this
                                                                    .applyTempOverrides, onUpdateValue: (value) => {
                                                                    this.setTempOverrides(themeKey, varKey, value);
                                                                }, value: ((_d = (_c = this
                                                                    .tempOverrides) === null || _c === void 0 ? void 0 : _c[themeKey]) === null || _d === void 0 ? void 0 : _d[varKey]) || '', placeholder: componentTheme[varKey] }))));
                                                    }
                                                })))
                                            }))
                                        }));
                                    });
                                    if (!filteredItemsCount)
                                        return (0, vue_1.h)(empty_1.NEmpty, null);
                                    return collapsedItems;
                                }
                            })))
                    }),
                    (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)
                ];
            }
        }));
    }
});
