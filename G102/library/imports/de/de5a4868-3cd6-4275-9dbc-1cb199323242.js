"use strict";
cc._RF.push(module, 'de5a4hoPNZCdZ28HLGZMjJC', 'MapManager');
// Scripts/GuaJi/MapManager.ts

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
var LevelManager_1 = require("../Level/LevelManager");
var MissionLevel_1 = require("../Level/MissionLevel");
var levelnode_1 = require("./levelnode");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MapManager = /** @class */ (function (_super) {
    __extends(MapManager, _super);
    function MapManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.levelnode = null; //关卡节点
        _this.levelpanten = null; //关卡的父节点
        _this.levelarr = []; //已生成的关卡节点
        _this.bjarr = []; //章节地图
        _this.bjarr1 = []; //章节地图
        _this.bjarr2 = []; //章节地图
        _this.Main_Bg = null; //地图背景
        _this.Main_Bg_Level_2 = null; //背景地图下面
        _this.Main_Bg_Level_1 = null; //背景地图上面
        // @property(cc.SpriteAtlas)
        // bjarr:cc.SpriteAtlas=null;//章节地图
        // @property
        // text: string = 'hello';
        // LIFE-CYCLE CALLBACKS:
        // onLoad () {}
        _this.ChallengeRoundPop = null; //关卡挑战弹窗
        _this.WarChariot = null; //战车
        _this.shan = []; //背景山
        _this.shu = []; //树
        _this.caodi = []; //草地
        _this.cao = []; //草
        return _this;
        // update (dt) {}
    }
    MapManager_1 = MapManager;
    MapManager.prototype.start = function () {
        MapManager_1.ChallengeRoundPops = this.ChallengeRoundPop;
        // console.log("_____",MapManager.ChallengeRoundPops)
        this.instantiatelevelnode();
    };
    MapManager.getInstance = function () {
        return this._instance;
    };
    MapManager.prototype.onLoad = function () {
        // if(MapManager._instance==null){
        MapManager_1._instance = this;
        //拉取主页图片
        // }
    };
    MapManager.prototype.instantiatelevelnode = function () {
        var startLevel = LevelManager_1.LevelManager.getInstance().finish_level + 1; //当前最大关卡
        var myCurrentlevel = startLevel;
        if (startLevel >= MissionLevel_1.MissionLevelManager.getMaxLevel()) {
            myCurrentlevel = MissionLevel_1.MissionLevelManager.getMaxLevel();
        }
        if (MapManager_1.Currentlevel == 0) {
        }
        else {
            myCurrentlevel = MapManager_1.Currentlevel; //当前最大关卡
        }
        var Chapter = MissionLevel_1.MissionLevelManager.getInstance().getChapter(myCurrentlevel); //当前关卡的章节
        // console.log("章节：",Chapter,this.Main_Bg)
        // console.log("++++++",myCurrentlevel,Chapter)
        this.Main_Bg.getComponent(cc.Sprite).spriteFrame = this.bjarr[Chapter - 1];
        this.Main_Bg_Level_2.getComponent(cc.Sprite).spriteFrame = this.bjarr2[Chapter - 1];
        this.Main_Bg_Level_1.getComponent(cc.Sprite).spriteFrame = this.bjarr1[Chapter - 1];
        this.WarChariot.getComponent(sp.Skeleton).setSkin("WarChariot_" + Chapter);
        // console.log("++++++++++",LevelManager.getInstance().maininterfacemap)
        for (var shanindex = 0; shanindex < this.shan.length; shanindex++) {
            this.shan[shanindex].getComponent(cc.Sprite).spriteFrame = LevelManager_1.LevelManager.getInstance().maininterfacemap.get("Home_Chapter" + Chapter + "_0");
        }
        for (var caodindex = 0; caodindex < this.caodi.length; caodindex++) {
            this.caodi[caodindex].getComponent(cc.Sprite).spriteFrame = LevelManager_1.LevelManager.getInstance().maininterfacemap.get("Home_Chapter" + Chapter + "_1");
        }
        for (var shuindex = 0; shuindex < this.shu.length; shuindex++) {
            this.shu[shuindex].getComponent(cc.Sprite).spriteFrame = LevelManager_1.LevelManager.getInstance().maininterfacemap.get("Home_Chapter" + Chapter + "_2");
        }
        for (var caoindex = 0; caoindex < this.cao.length; caoindex++) {
            this.cao[caoindex].getComponent(cc.Sprite).spriteFrame = LevelManager_1.LevelManager.getInstance().maininterfacemap.get("Home_Chapter" + Chapter + "_3");
        }
        // console.log("坐标：",this.Main_Bg.parent.parent.parent.parent.getPosition())
        for (var index = this.levelarr.length; index <= MissionLevel_1.MissionLevelManager.getInstance().getJsonLevelchapterLength(Chapter); index++) {
            var mylevelnode = cc.instantiate(this.levelnode);
            mylevelnode.parent = this.levelpanten;
            this.levelarr.push(mylevelnode);
        }
        for (var levelindex = 0; levelindex < this.levelarr.length; levelindex++) {
            if (levelindex < MissionLevel_1.MissionLevelManager.getInstance().getJsonLevelchapterLength(Chapter)) {
                var level = MissionLevel_1.MissionLevelManager.getInstance().getJsonLevelchapterwholeLength(Chapter) + levelindex + 1;
                this.levelarr[levelindex].getComponent(levelnode_1.default).init(level);
                // let pos=MissionLevelManager.getInstance().getJsonLevelPosXY(poslevel)
                // this.levelarr[levelindex].setPosition(pos)
                // this.levelarr[levelindex].getChildByName("level").getComponent(cc.Label).string=""+MissionLevelManager.getInstance().getLevelName
                this.levelarr[levelindex].active = true;
            }
            else {
                this.levelarr[levelindex].active = false;
            }
        }
    };
    MapManager.prototype.OnxiayizhangBtn = function () {
        MapManager_1.Currentlevel += 1;
        if (MapManager_1.Currentlevel >= 35) {
            MapManager_1.Currentlevel = 1;
        }
        this.instantiatelevelnode();
    };
    var MapManager_1;
    MapManager._instance = null;
    /**进入哪个关卡 */
    MapManager.Currentlevel = 0; //    0：关闭游戏重新开始游戏
    MapManager.ChallengeRoundPops = null; //关卡挑战弹窗
    __decorate([
        property(cc.Prefab)
    ], MapManager.prototype, "levelnode", void 0);
    __decorate([
        property(cc.Node)
    ], MapManager.prototype, "levelpanten", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], MapManager.prototype, "bjarr", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], MapManager.prototype, "bjarr1", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], MapManager.prototype, "bjarr2", void 0);
    __decorate([
        property(cc.Node)
    ], MapManager.prototype, "Main_Bg", void 0);
    __decorate([
        property(cc.Node)
    ], MapManager.prototype, "Main_Bg_Level_2", void 0);
    __decorate([
        property(cc.Node)
    ], MapManager.prototype, "Main_Bg_Level_1", void 0);
    __decorate([
        property(cc.Node)
    ], MapManager.prototype, "ChallengeRoundPop", void 0);
    __decorate([
        property(cc.Node)
    ], MapManager.prototype, "WarChariot", void 0);
    __decorate([
        property(cc.Node)
    ], MapManager.prototype, "shan", void 0);
    __decorate([
        property(cc.Node)
    ], MapManager.prototype, "shu", void 0);
    __decorate([
        property(cc.Node)
    ], MapManager.prototype, "caodi", void 0);
    __decorate([
        property(cc.Node)
    ], MapManager.prototype, "cao", void 0);
    MapManager = MapManager_1 = __decorate([
        ccclass
    ], MapManager);
    return MapManager;
}(cc.Component));
exports.default = MapManager;

cc._RF.pop();