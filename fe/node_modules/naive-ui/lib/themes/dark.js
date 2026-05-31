"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.darkTheme = void 0;
const styles_1 = require("../_internal/scrollbar/styles");
const common_1 = require("../_styles/common");
const styles_2 = require("../alert/styles");
const styles_3 = require("../anchor/styles");
const styles_4 = require("../auto-complete/styles");
const styles_5 = require("../avatar-group/styles");
const styles_6 = require("../avatar/styles");
const styles_7 = require("../back-top/styles");
const styles_8 = require("../badge/styles");
const styles_9 = require("../breadcrumb/styles");
const styles_10 = require("../button-group/styles");
const styles_11 = require("../button/styles");
const styles_12 = require("../calendar/styles");
const styles_13 = require("../card/styles");
const styles_14 = require("../carousel/styles");
const styles_15 = require("../cascader/styles");
const styles_16 = require("../checkbox/styles");
const styles_17 = require("../code/styles");
const styles_18 = require("../collapse-transition/styles");
const styles_19 = require("../collapse/styles");
const styles_20 = require("../color-picker/styles");
const styles_21 = require("../data-table/styles");
const styles_22 = require("../date-picker/styles");
const styles_23 = require("../descriptions/styles");
const styles_24 = require("../dialog/styles");
const styles_25 = require("../divider/styles");
const styles_26 = require("../drawer/styles");
const styles_27 = require("../dropdown/styles");
const styles_28 = require("../dynamic-input/styles");
const styles_29 = require("../dynamic-tags/styles");
const styles_30 = require("../element/styles");
const styles_31 = require("../ellipsis/styles");
const styles_32 = require("../empty/styles");
const styles_33 = require("../equation/styles");
const styles_34 = require("../float-button-group/styles");
const styles_35 = require("../float-button/styles");
const styles_36 = require("../form/styles");
const styles_37 = require("../gradient-text/styles");
const styles_38 = require("../heatmap/styles");
const styles_39 = require("../icon-wrapper/styles");
const styles_40 = require("../icon/styles");
const styles_41 = require("../image/styles");
const styles_42 = require("../input-number/styles");
const styles_43 = require("../input/styles");
const styles_44 = require("../layout/styles");
const styles_45 = require("../legacy-grid/styles");
const styles_46 = require("../legacy-transfer/styles");
const styles_47 = require("../list/styles");
const styles_48 = require("../loading-bar/styles");
const styles_49 = require("../log/styles");
const styles_50 = require("../marquee/styles");
const styles_51 = require("../mention/styles");
const styles_52 = require("../menu/styles");
const styles_53 = require("../message/styles");
const styles_54 = require("../modal/styles");
const styles_55 = require("../notification/styles");
const styles_56 = require("../page-header/styles");
const styles_57 = require("../pagination/styles");
const styles_58 = require("../popconfirm/styles");
const styles_59 = require("../popover/styles");
const styles_60 = require("../popselect/styles");
const styles_61 = require("../progress/styles");
const styles_62 = require("../qr-code/styles");
const styles_63 = require("../radio/styles");
const styles_64 = require("../rate/styles");
const styles_65 = require("../result/styles");
const styles_66 = require("../select/styles");
const styles_67 = require("../skeleton/styles");
const styles_68 = require("../slider/styles");
const styles_69 = require("../space/styles");
const styles_70 = require("../spin/styles");
const styles_71 = require("../split/styles");
const styles_72 = require("../statistic/styles");
const styles_73 = require("../steps/styles");
const styles_74 = require("../styles");
const styles_75 = require("../switch/styles");
const styles_76 = require("../table/styles");
const styles_77 = require("../tabs/styles");
const styles_78 = require("../tag/styles");
const styles_79 = require("../thing/styles");
const styles_80 = require("../time-picker/styles");
const styles_81 = require("../timeline/styles");
const styles_82 = require("../tooltip/styles");
const styles_83 = require("../transfer/styles");
const styles_84 = require("../tree-select/styles");
const styles_85 = require("../tree/styles");
const styles_86 = require("../typography/styles");
const styles_87 = require("../upload/styles");
const styles_88 = require("../watermark/styles");
exports.darkTheme = {
    name: 'dark',
    common: common_1.commonDark,
    Alert: styles_2.alertDark,
    Anchor: styles_3.anchorDark,
    AutoComplete: styles_4.autoCompleteDark,
    Avatar: styles_6.avatarDark,
    AvatarGroup: styles_5.avatarGroupDark,
    BackTop: styles_7.backTopDark,
    Badge: styles_8.badgeDark,
    Breadcrumb: styles_9.breadcrumbDark,
    Button: styles_11.buttonDark,
    ButtonGroup: styles_10.buttonGroupDark,
    Calendar: styles_12.calendarDark,
    Card: styles_13.cardDark,
    Carousel: styles_14.carouselDark,
    Cascader: styles_15.cascaderDark,
    Checkbox: styles_16.checkboxDark,
    Code: styles_17.codeDark,
    Collapse: styles_19.collapseDark,
    CollapseTransition: styles_18.collapseTransitionDark,
    ColorPicker: styles_20.colorPickerDark,
    DataTable: styles_21.dataTableDark,
    DatePicker: styles_22.datePickerDark,
    Descriptions: styles_23.descriptionsDark,
    Dialog: styles_24.dialogDark,
    Divider: styles_25.dividerDark,
    Drawer: styles_26.drawerDark,
    Dropdown: styles_27.dropdownDark,
    DynamicInput: styles_28.dynamicInputDark,
    DynamicTags: styles_29.dynamicTagsDark,
    Element: styles_30.elementDark,
    Empty: styles_32.emptyDark,
    Ellipsis: styles_31.ellipsisDark,
    Equation: styles_33.equationDark,
    Flex: styles_74.flexDark,
    Form: styles_36.formDark,
    GradientText: styles_37.gradientTextDark,
    Heatmap: styles_38.heatmapDark,
    Icon: styles_40.iconDark,
    IconWrapper: styles_39.iconWrapperDark,
    Image: styles_41.imageDark,
    Input: styles_43.inputDark,
    InputNumber: styles_42.inputNumberDark,
    InputOtp: styles_74.inputOtpDark,
    LegacyTransfer: styles_46.legacyTransferDark,
    Layout: styles_44.layoutDark,
    List: styles_47.listDark,
    LoadingBar: styles_48.loadingBarDark,
    Log: styles_49.logDark,
    Menu: styles_52.menuDark,
    Mention: styles_51.mentionDark,
    Message: styles_53.messageDark,
    Modal: styles_54.modalDark,
    Notification: styles_55.notificationDark,
    PageHeader: styles_56.pageHeaderDark,
    Pagination: styles_57.paginationDark,
    Popconfirm: styles_58.popconfirmDark,
    Popover: styles_59.popoverDark,
    Popselect: styles_60.popselectDark,
    Progress: styles_61.progressDark,
    QrCode: styles_62.qrcodeDark,
    Radio: styles_63.radioDark,
    Rate: styles_64.rateDark,
    Result: styles_65.resultDark,
    Row: styles_45.rowDark,
    Scrollbar: styles_1.scrollbarDark,
    Select: styles_66.selectDark,
    Skeleton: styles_67.skeletonDark,
    Slider: styles_68.sliderDark,
    Space: styles_69.spaceDark,
    Spin: styles_70.spinDark,
    Statistic: styles_72.statisticDark,
    Steps: styles_73.stepsDark,
    Switch: styles_75.switchDark,
    Table: styles_76.tableDark,
    Tabs: styles_77.tabsDark,
    Tag: styles_78.tagDark,
    Thing: styles_79.thingDark,
    TimePicker: styles_80.timePickerDark,
    Timeline: styles_81.timelineDark,
    Tooltip: styles_82.tooltipDark,
    Transfer: styles_83.transferDark,
    Tree: styles_85.treeDark,
    TreeSelect: styles_84.treeSelectDark,
    Typography: styles_86.typographyDark,
    Upload: styles_87.uploadDark,
    Watermark: styles_88.watermarkDark,
    Split: styles_71.splitDark,
    FloatButton: styles_35.floatButtonDark,
    FloatButtonGroup: styles_34.floatButtonGroupDark,
    Marquee: styles_50.marqueeDark
};
