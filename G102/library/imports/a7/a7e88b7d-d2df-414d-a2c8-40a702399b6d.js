"use strict";
cc._RF.push(module, 'a7e88t90t9BTaLIQKcCOZtt', 'ChapterPop');
// Scripts/Game/ChapterPop.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var MapManager_1 = require("../GuaJi/MapManager");
var LevelManager_1 = require("../Level/LevelManager");
var MissionLevel_1 = require("../Level/MissionLevel");
var OfflineRevenueShow_1 = require("../Level/OfflineRevenueShow");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var TextLanguage_1 = require("../multiLanguage/TextLanguage");
var PropManager_1 = require("../Prop/PropManager");
var BigMap_1 = require("./BigMap");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        // @property(cc.Label)
        // label: cc.Label = null;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @property
        // text: string = 'hello';
        // LIFE-CYCLE CALLBACKS:
        // onLoad () {}
        _this.txtScrollView = null;
        _this.level = 0; //默认第0关
        _this.bt = null; //标题名字
        _this.gushi = null; //章节故事
        _this.needNum = null; //每小时增加多少金币
        _this.content = null; //新增奖励
        _this.txt = null; //无新增奖励文本
        _this.btnReplace = null; //蓝色按钮   未抵达100106  变灰    前往100034   变蓝色
        _this.parent = null; //父节点
        _this.Map_Window_1 = null; //背景图
        _this.Map_Window = null; //背景图
        return _this;
        // update (dt) {}
    }
    NewClass.prototype.start = function () {
    };
    NewClass.prototype.onEnable = function () {
        this.txtScrollView.getComponent(cc.ScrollView).scrollToTop(0);
        this.txtScrollView.getComponent(cc.ScrollView).scrollToBottom(4);
        this.bt.getComponent(TextLanguage_1.default).setReplaceValue('~', (this.level + 1) + ''); //.setTextId(OfflineRevenueShowManager.getInstance().getTitletext(this.level+1))
        this.gushi.getComponent(TextLanguage_1.default).setTextId(OfflineRevenueShow_1.OfflineRevenueShowManager.getInstance().getChapterIntroduction(this.level + 1));
        this.needNum.getComponent(cc.Label).string = "+" + OfflineRevenueShow_1.OfflineRevenueShowManager.getInstance().getGetCoins(this.level + 1) + "/h";
        var UnlockProps = OfflineRevenueShow_1.OfflineRevenueShowManager.getInstance().getUnlockProps(this.level + 1);
        // console.log("精灵图：",this.Map_Window.getSpriteFrame("Map_Window_1"),this.level+1)
        this.Map_Window_1.getComponent(cc.Sprite).spriteFrame = this.Map_Window.getSpriteFrame("Map_Window_" + (this.level + 1));
        if (UnlockProps.length == 0) {
            this.txt.active = true;
        }
        else {
            this.txt.active = false;
            for (var index = 0; index < UnlockProps.length; index++) {
                var item = PropManager_1.PropManager.getInstance().createPropItem(UnlockProps[index], 0);
                item.scale = 0.9;
                item.parent = this.content;
            }
        }
        var myChapter = 0;
        if (LevelManager_1.LevelManager.getInstance().finish_level < MissionLevel_1.MissionLevelManager.getMaxLevel()) {
            myChapter = MissionLevel_1.MissionLevelManager.getInstance().getChapter(LevelManager_1.LevelManager.getInstance().finish_level + 1);
        }
        else {
            myChapter = MissionLevel_1.MissionLevelManager.getInstance().getChapter(LevelManager_1.LevelManager.getInstance().finish_level);
        }
        if ((this.level + 1) > myChapter) {
            // this.Flag.children[this.level].getComponent(cc.Sprite).spriteFrame=this.spriteFrame[1]
            this.btnReplace.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            this.btnReplace.getChildByName("label").getComponent(TextLanguage_1.default).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            this.btnReplace.getChildByName("label").getComponent(TextLanguage_1.default).setTextId(100106);
        }
        if ((this.level + 1) <= myChapter) {
            this.btnReplace.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            this.btnReplace.getChildByName("label").getComponent(TextLanguage_1.default).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            this.btnReplace.getChildByName("label").getComponent(TextLanguage_1.default).setTextId(100034);
            // this.Flag.children[this.level].getComponent(cc.Sprite).spriteFrame=this.spriteFrame[0]
            // if((this.level+1)==Chapter){
            //     this.Map_Sword.setPosition(this.Flag.children[this.level].getPosition().x,this.Flag.children[this.level].getPosition().y+100,0)
            // }
        }
    };
    NewClass.prototype.onBtn_Close = function () {
        for (var index = 0; index < this.content.children.length; index++) {
            this.content.children[index].destroy();
        }
        this.node.active = false;
    };
    NewClass.prototype.onBtn_Replace = function () {
        // @ts-ignore
        if (this.btnReplace.getComponent(cc.Sprite).getMaterial(0)._name == 'builtin-2d-gray-sprite (Instance)') {
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100108)); //暂未解锁该章节
        }
        else {
            MapManager_1.default.Currentlevel = MissionLevel_1.MissionLevelManager.getInstance().getChapterLevel(this.level + 1);
            // console.log("________",MapManager.Currentlevel,this.level)
            this.onBtn_Close();
            this.parent.getComponent(BigMap_1.default).onBtn_Close();
            //进入这个章节
        }
    };
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "txtScrollView", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "bt", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "gushi", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "needNum", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "content", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "txt", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "btnReplace", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "Map_Window_1", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], NewClass.prototype, "Map_Window", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();