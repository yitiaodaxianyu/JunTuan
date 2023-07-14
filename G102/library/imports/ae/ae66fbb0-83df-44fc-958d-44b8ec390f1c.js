"use strict";
cc._RF.push(module, 'ae66fuwg99E/JWNRLjsOQ8c', 'MazeBagUi');
// Scripts/Maze/MazeBagUi.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var GameManager_1 = require("../GameManager");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var UIComponent_1 = require("../UI/UIComponent");
var MazeBuffItem_1 = require("./MazeBuffItem");
var MazeManager_1 = require("./MazeManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MazeBagUi = /** @class */ (function (_super) {
    __extends(MazeBagUi, _super);
    function MazeBagUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefab_buff_item = null;
        return _this;
    }
    MazeBagUi.prototype.start = function () {
        this.initUi();
    };
    MazeBagUi.prototype.initUi = function () {
        //buff列表
        var buffList = MazeManager_1.MazeManager.getInstance().getBuffList();
        //buffList=RogueBuffManager.getInstance().getBuffIdList()
        //标题
        var hint = this.node.getChildByName('hint');
        var label = hint.getChildByName('label');
        label.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(830021);
        var detailLabel = this.node.getChildByName('detailLabel');
        detailLabel.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(830022);
        var content = this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content;
        var len = buffList.length;
        hint.active = len == 0;
        for (var i = 0; i < len; i++) {
            var buffId = buffList[i];
            var buffItem = cc.instantiate(this.prefab_buff_item);
            buffItem.getComponent(MazeBuffItem_1.default).init(buffId);
            content.addChild(buffItem);
        }
    };
    MazeBagUi.prototype.clickBtnYes = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        //城墙满血
        _super.prototype.onClose.call(this);
    };
    MazeBagUi.prototype.clickBtnNo = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        _super.prototype.onClose.call(this);
    };
    __decorate([
        property(cc.Prefab)
    ], MazeBagUi.prototype, "prefab_buff_item", void 0);
    MazeBagUi = __decorate([
        ccclass
    ], MazeBagUi);
    return MazeBagUi;
}(UIComponent_1.default));
exports.default = MazeBagUi;

cc._RF.pop();