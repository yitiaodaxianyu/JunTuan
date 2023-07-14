"use strict";
cc._RF.push(module, 'd88f0uySDtGlKD+liSb2dDn', 'BigMap');
// Scripts/Game/BigMap.ts

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
var MapManager_1 = require("../GuaJi/MapManager");
var LevelManager_1 = require("../Level/LevelManager");
var MissionLevel_1 = require("../Level/MissionLevel");
var TextLanguage_1 = require("../multiLanguage/TextLanguage");
var ChapterPop_1 = require("./ChapterPop");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BigMap = /** @class */ (function (_super) {
    __extends(BigMap, _super);
    function BigMap() {
        // @property(cc.Label)
        // label: cc.Label = null;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @property
        // text: string = 'hello';
        // LIFE-CYCLE CALLBACKS:
        // onLoad () {}
        _this.Btn_Close = null; //关闭按钮
        _this.Flag = null; //状态
        _this.txt = null; //文字
        _this.Frame = null; //文字背景
        _this.spriteFrame = []; //状态图片   0:打过了   1:还没打过
        _this.Chapter = null; //地图
        _this.Map_Sword = null; //剑
        _this.ChapterPop = null; //大地图弹窗
        return _this;
        // update (dt) {}
    }
    // @property(cc.Node)
    // Trascina:cc.Node= null;//大地图弹窗
    BigMap.prototype.start = function () {
        var _this = this;
        this.Btn_Close.on(cc.Node.EventType.TOUCH_END, this.onBtn_Close, this);
        var _loop_1 = function (index) {
            this_1.Flag.children[index].on(cc.Node.EventType.TOUCH_END, (function () {
                _this.onBtn_Chapter(index);
            }), this_1);
            this_1.Frame.children[index].on(cc.Node.EventType.TOUCH_END, (function () {
                _this.onBtn_Chapter(index);
            }), this_1);
        };
        var this_1 = this;
        for (var index = 0; index < this.Flag.children.length; index++) {
            _loop_1(index);
        }
        // this.Trascina.on(cc.Node.EventType.TOUCH_START,((e:cc.Event.EventTouch)=>{//当手指触摸到屏幕时
        //     this.onBtnTOUCH_START(e)
        // }),this);
        // this.Trascina.on(cc.Node.EventType.TOUCH_MOVE,((e:cc.Event.EventTouch)=>{//当手指在屏幕上移动时
        //     this.onBtnTOUCH_MOVE(e)
        // }),this);
        // this.Trascina.on(cc.Node.EventType.TOUCH_END,((e:cc.Event.EventTouch)=>{//当手指在目标节点区域内离开屏幕时
        //     this.onBtnTOUCH_END(e)
        // }),this);
        // this.Trascina.on(cc.Node.EventType.TOUCH_CANCEL,((e:cc.Event.EventTouch)=>{//当手指在目标节点区域外离开屏幕时
        //     this.onBtnTOUCH_CANCEL(e)
        // }),this);
    };
    // onBtnTOUCH_START(e:cc.Event.EventTouch) {
    //     throw new Error("Method not implemented.");
    // }
    // onBtnTOUCH_MOVE(e:cc.Event.EventTouch) {
    //     throw new Error("Method not implemented.");
    // }
    // onBtnTOUCH_END(e:cc.Event.EventTouch) {
    //     throw new Error("Method not implemented.");
    // }
    // onBtnTOUCH_CANCEL(e:cc.Event.EventTouch) {
    //     throw new Error("Method not implemented.");
    // }
    BigMap.prototype.onEnable = function () {
        this.ChapterPop.active = false;
        var myCurrentlevel = LevelManager_1.LevelManager.getInstance().finish_level + 1; //当前最大关卡
        if (MapManager_1.default.Currentlevel == 0) {
        }
        else {
            myCurrentlevel = MapManager_1.default.Currentlevel; //当前点击的关卡
        }
        if (myCurrentlevel >= MissionLevel_1.MissionLevelManager.getMaxLevel()) {
            myCurrentlevel = LevelManager_1.LevelManager.getInstance().finish_level;
            // GameManager.getInstance().showMessage("你太厉害啦，测试版本暂时没有了，敬请期待后续版本！记得加id",3);
        }
        // console.log("++++++++",myCurrentlevel,MissionLevelManager.getMaxLevel())
        var Chapter = MissionLevel_1.MissionLevelManager.getInstance().getChapter(myCurrentlevel); //当前关卡的章节
        for (var index = 0; index < this.Flag.children.length; index++) {
            var myChapter = 0;
            if (LevelManager_1.LevelManager.getInstance().finish_level < MissionLevel_1.MissionLevelManager.getMaxLevel()) {
                myChapter = MissionLevel_1.MissionLevelManager.getInstance().getChapter(LevelManager_1.LevelManager.getInstance().finish_level + 1);
            }
            else {
                myChapter = MissionLevel_1.MissionLevelManager.getInstance().getChapter(LevelManager_1.LevelManager.getInstance().finish_level);
            }
            if ((index + 1) > myChapter) {
                this.Flag.children[index].getComponent(cc.Sprite).spriteFrame = this.spriteFrame[1];
                this.Chapter.children[index].getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
                this.txt.children[index].getComponent(TextLanguage_1.default).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
                this.Frame.children[index].getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            }
            if ((index + 1) <= myChapter) {
                this.Flag.children[index].getComponent(cc.Sprite).spriteFrame = this.spriteFrame[0];
                this.Chapter.children[index].getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
                this.txt.children[index].getComponent(TextLanguage_1.default).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
                this.Frame.children[index].getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
                if ((index + 1) == Chapter) {
                    this.Map_Sword.setPosition(this.Flag.children[index].getPosition().x, this.Flag.children[index].getPosition().y + 60, 0);
                }
            }
            this.txt.children[index].getComponent(TextLanguage_1.default).setReplaceValue('~', (index + 1) + '');
        }
        // this.ScrollView.getComponent(cc.ScrollView).scrollToBottom(2)
    };
    BigMap.prototype.onBtn_Close = function () {
        MapManager_1.default.getInstance().instantiatelevelnode();
        this.node.active = false;
    };
    BigMap.prototype.onBtn_Chapter = function (level) {
        this.ChapterPop.getComponent(ChapterPop_1.default).parent = this.node;
        this.ChapterPop.getComponent(ChapterPop_1.default).level = Number(level);
        this.ChapterPop.active = true;
    };
    __decorate([
        property(cc.Node)
    ], BigMap.prototype, "Btn_Close", void 0);
    __decorate([
        property(cc.Node)
    ], BigMap.prototype, "Flag", void 0);
    __decorate([
        property(cc.Node)
    ], BigMap.prototype, "txt", void 0);
    __decorate([
        property(cc.Node)
    ], BigMap.prototype, "Frame", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BigMap.prototype, "spriteFrame", void 0);
    __decorate([
        property(cc.Node)
    ], BigMap.prototype, "Chapter", void 0);
    __decorate([
        property(cc.Node)
    ], BigMap.prototype, "Map_Sword", void 0);
    __decorate([
        property(cc.Node)
    ], BigMap.prototype, "ChapterPop", void 0);
    BigMap = __decorate([
        ccclass
    ], BigMap);
    return BigMap;
}(cc.Component));
exports.default = BigMap;

cc._RF.pop();