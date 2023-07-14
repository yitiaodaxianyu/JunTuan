
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/GuaJi/MapManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR3VhSmlcXE1hcE1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsc0RBQXFEO0FBQ3JELHNEQUE0RDtBQUU1RCx5Q0FBb0M7QUFFOUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBd0MsOEJBQVk7SUFBcEQ7UUFBQSxxRUE2SUM7UUF4SUcsZUFBUyxHQUFjLElBQUksQ0FBQyxDQUFBLE1BQU07UUFFbEMsaUJBQVcsR0FBWSxJQUFJLENBQUMsQ0FBQSxRQUFRO1FBRXBDLGNBQVEsR0FBVyxFQUFFLENBQUEsQ0FBQSxVQUFVO1FBSS9CLFdBQUssR0FBa0IsRUFBRSxDQUFDLENBQUEsTUFBTTtRQUdoQyxZQUFNLEdBQWtCLEVBQUUsQ0FBQyxDQUFBLE1BQU07UUFHakMsWUFBTSxHQUFrQixFQUFFLENBQUMsQ0FBQSxNQUFNO1FBRWpDLGFBQU8sR0FBWSxJQUFJLENBQUMsQ0FBQSxNQUFNO1FBRzlCLHFCQUFlLEdBQVksSUFBSSxDQUFDLENBQUEsUUFBUTtRQUd4QyxxQkFBZSxHQUFZLElBQUksQ0FBQyxDQUFBLFFBQVE7UUFDeEMsNEJBQTRCO1FBQzVCLG1DQUFtQztRQUNuQyxZQUFZO1FBQ1osMEJBQTBCO1FBRTFCLHdCQUF3QjtRQUV4QixlQUFlO1FBSWYsdUJBQWlCLEdBQVksSUFBSSxDQUFDLENBQUEsUUFBUTtRQUcxQyxnQkFBVSxHQUFZLElBQUksQ0FBQyxDQUFBLElBQUk7UUFNL0IsVUFBSSxHQUFjLEVBQUUsQ0FBQyxDQUFBLEtBQUs7UUFHMUIsU0FBRyxHQUFjLEVBQUUsQ0FBQyxDQUFBLEdBQUc7UUFHdkIs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UUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7NkNBQ0M7SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzs4Q0FDRTtJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDOzhDQUNFO0lBRTNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7K0NBQ007SUFHeEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt1REFDYztJQUdoQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3VEQUNjO0lBWWhDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7eURBQ2dCO0lBR2xDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ1M7SUFNM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs0Q0FDRztJQUdyQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzJDQUNFO0lBR3BCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NkNBQ0k7SUFHdEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsyQ0FDRTtJQXpESCxVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBNkk5QjtJQUFELGlCQUFDO0NBN0lELEFBNklDLENBN0l1QyxFQUFFLENBQUMsU0FBUyxHQTZJbkQ7a0JBN0lvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IHsgTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uL0xldmVsL0xldmVsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBNaXNzaW9uTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uL0xldmVsL01pc3Npb25MZXZlbFwiO1xyXG5pbXBvcnQgTG9hZGluZyBmcm9tIFwiLi4vTG9hZGluZy9Mb2FkaW5nXCI7XHJcbmltcG9ydCBsZXZlbG5vZGUgZnJvbSBcIi4vbGV2ZWxub2RlXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcE1hbmFnZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBNYXBNYW5hZ2VyID0gbnVsbDtcclxuICAgIC8qKui/m+WFpeWTquS4quWFs+WNoSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBDdXJyZW50bGV2ZWw9MCAgICAvLyAgICAw77ya5YWz6Zet5ri45oiP6YeN5paw5byA5aeL5ri45oiPXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgbGV2ZWxub2RlOiBjYy5QcmVmYWIgPSBudWxsOy8v5YWz5Y2h6IqC54K5XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGxldmVscGFudGVuOiBjYy5Ob2RlID0gbnVsbDsvL+WFs+WNoeeahOeItuiKgueCuVxyXG5cclxuICAgIGxldmVsYXJyOmNjLk5vZGVbXT1bXS8v5bey55Sf5oiQ55qE5YWz5Y2h6IqC54K5XHJcblxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIGJqYXJyOmNjLlNwcml0ZUZyYW1lW109W107Ly/nq6DoioLlnLDlm75cclxuICAgIFxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgYmphcnIxOmNjLlNwcml0ZUZyYW1lW109W107Ly/nq6DoioLlnLDlm75cclxuICAgIFxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgYmphcnIyOmNjLlNwcml0ZUZyYW1lW109W107Ly/nq6DoioLlnLDlm75cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgTWFpbl9CZzogY2MuTm9kZSA9IG51bGw7Ly/lnLDlm77og4zmma9cclxuICAgIFxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBNYWluX0JnX0xldmVsXzI6IGNjLk5vZGUgPSBudWxsOy8v6IOM5pmv5Zyw5Zu+5LiL6Z2iXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBNYWluX0JnX0xldmVsXzE6IGNjLk5vZGUgPSBudWxsOy8v6IOM5pmv5Zyw5Zu+5LiK6Z2iXHJcbiAgICAvLyBAcHJvcGVydHkoY2MuU3ByaXRlQXRsYXMpXHJcbiAgICAvLyBiamFycjpjYy5TcHJpdGVBdGxhcz1udWxsOy8v56ug6IqC5Zyw5Zu+XHJcbiAgICAvLyBAcHJvcGVydHlcclxuICAgIC8vIHRleHQ6IHN0cmluZyA9ICdoZWxsbyc7XHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcblxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgQ2hhbGxlbmdlUm91bmRQb3A6IGNjLk5vZGUgPSBudWxsOy8v5YWz5Y2h5oyR5oiY5by556qXXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBXYXJDaGFyaW90OiBjYy5Ob2RlID0gbnVsbDsvL+aImOi9plxyXG5cclxuXHJcblxyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHNoYW46IGNjLk5vZGVbXSA9IFtdOy8v6IOM5pmv5bGxXHJcbiAgICAgICAgXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHNodTogY2MuTm9kZVtdID0gW107Ly/moJFcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGNhb2RpOiBjYy5Ob2RlW10gPSBbXTsvL+iNieWcsFxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgY2FvOiBjYy5Ob2RlW10gPSBbXTsvL+iNiVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgQ2hhbGxlbmdlUm91bmRQb3BzOiBjYy5Ob2RlID0gbnVsbDsvL+WFs+WNoeaMkeaImOW8ueeql1xyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIE1hcE1hbmFnZXIuQ2hhbGxlbmdlUm91bmRQb3BzPXRoaXMuQ2hhbGxlbmdlUm91bmRQb3BcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIl9fX19fXCIsTWFwTWFuYWdlci5DaGFsbGVuZ2VSb3VuZFBvcHMpXHJcbiAgICAgICAgdGhpcy5pbnN0YW50aWF0ZWxldmVsbm9kZSgpXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6TWFwTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gaWYoTWFwTWFuYWdlci5faW5zdGFuY2U9PW51bGwpe1xyXG4gICAgICAgICAgICBNYXBNYW5hZ2VyLl9pbnN0YW5jZT10aGlzO1xyXG4gICAgICAgICAgICAvL+aLieWPluS4u+mhteWbvueJh1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBpbnN0YW50aWF0ZWxldmVsbm9kZSgpe1xyXG4gICAgICAgIGxldCBzdGFydExldmVsPUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbCsxOy8v5b2T5YmN5pyA5aSn5YWz5Y2hXHJcbiAgICAgICAgbGV0IG15Q3VycmVudGxldmVsPXN0YXJ0TGV2ZWxcclxuICAgICAgICBpZihzdGFydExldmVsPj1NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldE1heExldmVsKCkpe1xyXG4gICAgICAgICAgICBteUN1cnJlbnRsZXZlbD1NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldE1heExldmVsKClcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICBpZihNYXBNYW5hZ2VyLkN1cnJlbnRsZXZlbD09MCl7XHJcblxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBteUN1cnJlbnRsZXZlbD1NYXBNYW5hZ2VyLkN1cnJlbnRsZXZlbDsvL+W9k+WJjeacgOWkp+WFs+WNoVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgQ2hhcHRlcj1NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q2hhcHRlcihteUN1cnJlbnRsZXZlbCkvL+W9k+WJjeWFs+WNoeeahOeroOiKglxyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIueroOiKgu+8mlwiLENoYXB0ZXIsdGhpcy5NYWluX0JnKVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKysrKysrXCIsbXlDdXJyZW50bGV2ZWwsQ2hhcHRlcilcclxuICAgICAgICB0aGlzLk1haW5fQmcuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5iamFycltDaGFwdGVyLTFdXHJcbiAgICAgICAgdGhpcy5NYWluX0JnX0xldmVsXzIuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5iamFycjJbQ2hhcHRlci0xXVxyXG4gICAgICAgIHRoaXMuTWFpbl9CZ19MZXZlbF8xLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXRoaXMuYmphcnIxW0NoYXB0ZXItMV1cclxuICAgICAgICB0aGlzLldhckNoYXJpb3QuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKS5zZXRTa2luKFwiV2FyQ2hhcmlvdF9cIitDaGFwdGVyKVxyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIisrKysrKysrKytcIixMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tYWluaW50ZXJmYWNlbWFwKVxyXG5cclxuXHJcbiAgICAgICAgZm9yIChsZXQgc2hhbmluZGV4ID0gMDsgc2hhbmluZGV4IDwgdGhpcy5zaGFuLmxlbmd0aDsgc2hhbmluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFuW3NoYW5pbmRleF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkubWFpbmludGVyZmFjZW1hcC5nZXQoXCJIb21lX0NoYXB0ZXJcIitDaGFwdGVyK1wiXzBcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGNhb2RpbmRleCA9IDA7IGNhb2RpbmRleCA8IHRoaXMuY2FvZGkubGVuZ3RoOyBjYW9kaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLmNhb2RpW2Nhb2RpbmRleF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkubWFpbmludGVyZmFjZW1hcC5nZXQoXCJIb21lX0NoYXB0ZXJcIitDaGFwdGVyK1wiXzFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IHNodWluZGV4ID0gMDsgc2h1aW5kZXggPCB0aGlzLnNodS5sZW5ndGg7IHNodWluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5zaHVbc2h1aW5kZXhdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLm1haW5pbnRlcmZhY2VtYXAuZ2V0KFwiSG9tZV9DaGFwdGVyXCIrQ2hhcHRlcitcIl8yXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBjYW9pbmRleCA9IDA7IGNhb2luZGV4IDwgdGhpcy5jYW8ubGVuZ3RoOyBjYW9pbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FvW2Nhb2luZGV4XS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT1MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tYWluaW50ZXJmYWNlbWFwLmdldChcIkhvbWVfQ2hhcHRlclwiK0NoYXB0ZXIrXCJfM1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCLlnZDmoIfvvJpcIix0aGlzLk1haW5fQmcucGFyZW50LnBhcmVudC5wYXJlbnQucGFyZW50LmdldFBvc2l0aW9uKCkpXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSB0aGlzLmxldmVsYXJyLmxlbmd0aDsgaW5kZXggPD0gTWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25MZXZlbGNoYXB0ZXJMZW5ndGgoQ2hhcHRlcik7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgbGV0IG15bGV2ZWxub2RlPWNjLmluc3RhbnRpYXRlKHRoaXMubGV2ZWxub2RlKVxyXG4gICAgICAgICAgICBteWxldmVsbm9kZS5wYXJlbnQ9dGhpcy5sZXZlbHBhbnRlblxyXG4gICAgICAgICAgICB0aGlzLmxldmVsYXJyLnB1c2gobXlsZXZlbG5vZGUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGxldmVsaW5kZXggPSAwOyBsZXZlbGluZGV4IDwgdGhpcy5sZXZlbGFyci5sZW5ndGg7IGxldmVsaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZihsZXZlbGluZGV4PE1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uTGV2ZWxjaGFwdGVyTGVuZ3RoKENoYXB0ZXIpKXtcclxuICAgICAgICAgICAgICAgIGxldCBsZXZlbD1NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkxldmVsY2hhcHRlcndob2xlTGVuZ3RoKENoYXB0ZXIpK2xldmVsaW5kZXgrMVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbGFycltsZXZlbGluZGV4XS5nZXRDb21wb25lbnQobGV2ZWxub2RlKS5pbml0KGxldmVsKVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgcG9zPU1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uTGV2ZWxQb3NYWShwb3NsZXZlbClcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMubGV2ZWxhcnJbbGV2ZWxpbmRleF0uc2V0UG9zaXRpb24ocG9zKVxyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5sZXZlbGFycltsZXZlbGluZGV4XS5nZXRDaGlsZEJ5TmFtZShcImxldmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiXCIrTWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExldmVsTmFtZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbGFycltsZXZlbGluZGV4XS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxhcnJbbGV2ZWxpbmRleF0uYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBPbnhpYXlpemhhbmdCdG4oKXsvL+eCueWHu+i/meS4quaMiemSrui/m+WFpeS4i+S4gOWFs1xyXG4gICAgICAgIE1hcE1hbmFnZXIuQ3VycmVudGxldmVsKz0xXHJcbiAgICAgICAgaWYoTWFwTWFuYWdlci5DdXJyZW50bGV2ZWw+PTM1KXtcclxuICAgICAgICAgICAgTWFwTWFuYWdlci5DdXJyZW50bGV2ZWw9MVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmluc3RhbnRpYXRlbGV2ZWxub2RlKClcclxuICAgIH1cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19