"use strict";
cc._RF.push(module, 'd0c69hRQCNAFLI194Xm9QF1', 'HealingPotion');
// Scripts/Maze/HealingPotion.ts

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
var RogueHexagonTypes_1 = require("../copy/voidcrack/RogueHexagonTypes");
var GameManager_1 = require("../GameManager");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var UIComponent_1 = require("../UI/UIComponent");
// import { RogueHexagonTypesManager } from "./Data/RogueHexagonTypes";
var RogueText_1 = require("./Data/RogueText");
var MazeManager_1 = require("./MazeManager");
var MazeUi_1 = require("./MazeUi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HealingPotion = /** @class */ (function (_super) {
    __extends(HealingPotion, _super);
    function HealingPotion() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.box_id = 5;
        _this.is_can_go = false;
        return _this;
    }
    HealingPotion.prototype.initData = function (id, isCanGo) {
        this.box_id = id;
        this.is_can_go = isCanGo;
        this.initUi();
    };
    HealingPotion.prototype.initUi = function () {
        //标题
        var type = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getHexagonType(this.box_id);
        var jsonData = RogueText_1.RogueTextManager.getInstance().getJsonRogueText(type);
        var titleLabel = this.node.getChildByName('titleLabel');
        titleLabel.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(jsonData.Roguetitle_ID);
        var contentLabel = this.node.getChildByName('contentLabel');
        contentLabel.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(jsonData.RogueText_ID);
        this.node.getChildByName('btnNo').active = this.is_can_go;
        this.node.getChildByName('btnYes').active = this.is_can_go;
    };
    HealingPotion.prototype.clickBtnYes = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        //增加城墙的生命值
        MazeManager_1.MazeManager.getInstance().setPassingId(this.box_id);
        MazeManager_1.MazeManager.getInstance().setFightingId(this.box_id);
        MazeManager_1.MazeManager.getInstance().addMazePassedId(this.box_id);
        //
        var curHp = MazeManager_1.MazeManager.getInstance().getMazeHp();
        var maxHp = MazeManager_1.MazeManager.getInstance().getMazeMaxHp();
        curHp += maxHp * 0.5;
        var hp = maxHp - curHp;
        if (hp < 0) {
            hp = 0;
        }
        MazeManager_1.MazeManager.getInstance().setMazeSubHp(hp);
        MazeUi_1.default.getInstance().refreshFloor();
        _super.prototype.onClose.call(this);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.rogue玩法治疗药水事件);
    };
    HealingPotion.prototype.clickBtnNo = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        _super.prototype.onClose.call(this);
    };
    HealingPotion = __decorate([
        ccclass
    ], HealingPotion);
    return HealingPotion;
}(UIComponent_1.default));
exports.default = HealingPotion;

cc._RF.pop();