
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Game/Ui/RoguelikeTip.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '60646jT0GpBbJOvdLbaPurK', 'RoguelikeTip');
// Scripts/Game/Ui/RoguelikeTip.ts

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
var Constants_1 = require("../../Constants");
var GameManager_1 = require("../../GameManager");
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var HeroItem_1 = require("../../Hero/Ui/HeroItem");
var UIComponent_1 = require("../../UI/UIComponent");
var WallManager_1 = require("../../Wall/WallManager");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var CharioItem_1 = require("./CharioItem");
var HeroUpItem_1 = require("./HeroUpItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RoguelikeTip = /** @class */ (function (_super) {
    __extends(RoguelikeTip, _super);
    function RoguelikeTip() {
        // LIFE-CYCLE CALLBACKS:
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // onLoad () {}
        _this.tag = 0; //选择toggle的选择数
        _this.ToggleContainer = null;
        _this.tipLabel = null;
        _this.content = null; //英雄选择父节点
        _this.hero_item = null; //英雄头像的预制体
        _this.hero_Chose = null; //选择英雄节点
        _this.chariot_Chose = null; //战车升级选择节点
        _this.heroUp_Chose = null; //英雄升级选择节点
        _this.chariotItem0 = null; //战车升级选择节点0
        _this.chariotItem1 = null; //战车升级选择节点1
        _this.chariotItem2 = null; //战车升级选择节点2
        _this.heroUpItem0 = null; //英雄升级选择节点0
        _this.heroUpItem1 = null; //英雄升级选择节点1
        _this.heroUpItem2 = null; //英雄升级选择节点2
        _this.greybuttonjudgment = 0;
        return _this;
        // update (dt) {}
    }
    RoguelikeTip.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.tag = 0;
        this.ToggleContainer.children[0].getComponent(cc.Toggle).isChecked = true;
        this.onToggleChange();
        console.log("进入RogueLike");
        this.chariotUpgradation();
        this.Refreshheroitmestatus();
        this.heroUpRefresh();
        this.chariotItem0.on(cc.Node.EventType.TOUCH_END, this.onCharioItemTouchEnd, this);
        this.chariotItem1.on(cc.Node.EventType.TOUCH_END, this.onCharioItemTouchEnd, this);
        this.chariotItem2.on(cc.Node.EventType.TOUCH_END, this.onCharioItemTouchEnd, this);
        this.heroUpItem0.on(cc.Node.EventType.TOUCH_END, this.onHeroUpTouchEnd, this);
        this.heroUpItem1.on(cc.Node.EventType.TOUCH_END, this.onHeroUpTouchEnd, this);
        this.heroUpItem2.on(cc.Node.EventType.TOUCH_END, this.onHeroUpTouchEnd, this);
    };
    RoguelikeTip.prototype.onDestroy = function () {
        this.chariotItem0.off(cc.Node.EventType.TOUCH_END, this.onCharioItemTouchEnd, this);
        this.chariotItem1.off(cc.Node.EventType.TOUCH_END, this.onCharioItemTouchEnd, this);
        this.chariotItem2.off(cc.Node.EventType.TOUCH_END, this.onCharioItemTouchEnd, this);
        this.heroUpItem0.off(cc.Node.EventType.TOUCH_END, this.onHeroUpTouchEnd, this);
        this.heroUpItem1.off(cc.Node.EventType.TOUCH_END, this.onHeroUpTouchEnd, this);
        this.heroUpItem2.off(cc.Node.EventType.TOUCH_END, this.onHeroUpTouchEnd, this);
        cc.director.resume();
    };
    RoguelikeTip.prototype.onEnable = function () {
    };
    RoguelikeTip.prototype.heroUpRefresh = function () {
        var heroHas = [];
        GameManager_1.default.getInstance().all_hero.forEach(function (v, k) {
            if (v.hero_lvl < 5) {
                heroHas.push(v.hero_type);
            }
        });
        console.log("拥有的可升级英雄" + heroHas.length);
        this.heroUpItem0.x = -223;
        this.heroUpItem1.x = 0;
        this.heroUpItem2.x = 223;
        this.heroUpItem1.active = true;
        this.heroUpItem2.active = true;
        heroHas.sort(function () {
            return Math.random() - 0.5;
        });
        if (heroHas.length == 0) {
            //没有可升级英雄，暂不处理
        }
        else if (heroHas.length == 1) {
            this.heroUpItem0.x = 0;
            this.heroUpItem1.active = false;
            this.heroUpItem2.active = false;
            this.heroUpItem0.getComponent(HeroUpItem_1.default).initData(heroHas[0]);
        }
        else if (heroHas.length == 2) {
            this.heroUpItem0.x = -111.5;
            this.heroUpItem1.x = 111.5;
            this.heroUpItem2.active = false;
            this.heroUpItem0.getComponent(HeroUpItem_1.default).initData(heroHas[0]);
            this.heroUpItem1.getComponent(HeroUpItem_1.default).initData(heroHas[1]);
        }
        else {
            this.heroUpItem0.getComponent(HeroUpItem_1.default).initData(heroHas[0]);
            this.heroUpItem1.getComponent(HeroUpItem_1.default).initData(heroHas[1]);
            this.heroUpItem2.getComponent(HeroUpItem_1.default).initData(heroHas[2]);
        }
    };
    RoguelikeTip.prototype.chariotUpgradation = function () {
        var data = GameManager_1.default.getInstance().getcharioUpgradationData();
        console.log("获得的升级数据" + data);
        this.chariotItem0.getComponent(CharioItem_1.default).initData(data[0]);
        this.chariotItem1.active = true;
        this.chariotItem2.active = true;
        this.chariotItem0.x = -223;
        this.chariotItem1.x = 0;
        this.chariotItem2.x = 223;
        if (data[1] != null) {
            this.chariotItem1.getComponent(CharioItem_1.default).initData(data[1]);
        }
        else {
            this.chariotItem1.active = false;
            this.chariotItem2.active = false;
            this.chariotItem0.x = 0;
            return;
        }
        if (data[2] != null) {
            this.chariotItem2.getComponent(CharioItem_1.default).initData(data[2]);
        }
        else {
            this.chariotItem0.x = -111.5;
            this.chariotItem1.x = 111.5;
            this.chariotItem2.active = false;
        }
    };
    RoguelikeTip.prototype.clickBtnToggle = function (even, i) {
        // console.log("+++++++",even,i)
        this.tag = i;
        this.onToggleChange();
    };
    RoguelikeTip.prototype.Refreshheroitmestatus = function () {
        //已解锁的英雄
        var HeroList = HeroManager_1.HeroManager.getInstance().getHeroList(); //数量   英雄id类型 英雄等级 英雄品质  英雄星星阶段
        var heroBasicdataarr = []; //最高战力数组
        var HeroListarr = HeroList; //已解锁的英雄
        for (var heroindex = 0; heroindex < HeroList.length; heroindex++) {
            var hero = cc.instantiate(this.hero_item);
            hero.name = "" + heroindex;
            hero.setScale(0.75, 0.75);
            this.content.addChild(hero);
            hero.on(cc.Node.EventType.TOUCH_END, this.onHeroItemTouchEnd, this);
            // hero.on(cc.Node.EventType.TOUCH_CANCEL, this.onHeroItemTouchCancel, this);
        }
        this.content.getComponent(cc.Layout).updateLayout();
        //刷新英雄itme
        for (var heroBasicdataindex = 0; heroBasicdataindex < HeroList.length; heroBasicdataindex++) {
            var heroBasicdata = HeroManager_1.HeroManager.getInstance().getHeroData(HeroList[heroBasicdataindex].hero_type); //英雄的基础数据   传入英雄id类型  防御力  生命值  命中值 
            heroBasicdataarr.push(heroBasicdata.total_attack);
        }
        //排列英雄战力
        var cun;
        var herocun;
        for (var index = 0; index < heroBasicdataarr.length; index++) {
            for (var paixvindex = 0; paixvindex < heroBasicdataarr.length - 1; paixvindex++) {
                if (heroBasicdataarr[paixvindex + 1] > heroBasicdataarr[paixvindex]) {
                    cun = heroBasicdataarr[paixvindex];
                    heroBasicdataarr[paixvindex] = heroBasicdataarr[paixvindex + 1];
                    heroBasicdataarr[paixvindex + 1] = cun;
                    herocun = HeroListarr[paixvindex];
                    HeroListarr[paixvindex] = HeroListarr[paixvindex + 1];
                    HeroListarr[paixvindex + 1] = herocun;
                }
            }
        }
        var teamList = GameManager_1.default.getInstance().cur_team_list;
        //刷新英雄itme状态
        //血量
        for (var shuaxingindex = 0; shuaxingindex < HeroListarr.length; shuaxingindex++) {
            this.content.children[shuaxingindex].getComponent(HeroItem_1.default).RefreshHeroesItem(HeroListarr[shuaxingindex].hero_type);
            for (var teamListindex = 0; teamListindex < teamList.length; teamListindex++) {
                if (teamList[teamListindex] == HeroListarr[shuaxingindex].hero_type) {
                    this.content.children[shuaxingindex].getChildByName("shangzheng").active = true;
                }
            }
        }
    };
    RoguelikeTip.prototype.onHeroUpTouchEnd = function (e) {
        var touchTarget = e.getCurrentTarget();
        if (touchTarget.active == true) {
            var heroType = touchTarget.getComponent(HeroUpItem_1.default).getDataType();
            if (GameManager_1.default.getInstance().all_hero.get(heroType).hero_lvl < 5) {
                GameManager_1.default.getInstance().all_hero.get(heroType).hero_lvl++;
            }
            this.heroUpRefresh();
            this.clickBtnClose();
        }
    };
    RoguelikeTip.prototype.onCharioItemTouchEnd = function (e) {
        var touchTarget = e.getCurrentTarget();
        if (touchTarget.active == true) {
            var charioType = touchTarget.getComponent(CharioItem_1.default).getDataType();
            GameManager_1.default.getInstance().charioUpgradationData[charioType]++;
            //["加攻击","血量上限","攻速","防御","技能间隔","左右移动","回血"];
            if (charioType == 0) {
                GameManager_1.default.getInstance().refreshMainWallDataByaddHero();
            }
            else if (charioType == 1) {
                GameManager_1.default.getInstance().refreshMainWallDataByaddHero();
            }
            else if (charioType == 2) {
                //攻速直接在英雄里面取
            }
            else if (charioType == 3) {
                GameManager_1.default.getInstance().refreshMainWallDataByaddHero();
            }
            else if (charioType == 4) {
            }
            else if (charioType == 5) {
            }
            else if (charioType == 6) {
                WallManager_1.default.getInstance().getMainWall().changeHp(WallManager_1.default.getInstance().getMainWall().getMaxHp() * 0.2);
            }
            this.chariotUpgradation();
            this.clickBtnClose();
        }
    };
    RoguelikeTip.prototype.onHeroItemTouchEnd = function (e) {
        var touchTeam = e.getCurrentTarget();
        if (touchTeam.getChildByName("shangzheng").active == false) {
            //上阵该英雄
            var teamList = GameManager_1.default.getInstance().cur_team_list;
            if (teamList[1] == -1 || teamList[1] == HeroConfig_1.Hero_Type.NULL) {
                teamList[1] = touchTeam.getComponent(HeroItem_1.default).hero_type;
                GameManager_1.default.getInstance().addHero(touchTeam.getComponent(HeroItem_1.default).hero_type, 1);
                this.clickBtnClose();
                return;
            }
            if (teamList[3] == -1 || teamList[3] == HeroConfig_1.Hero_Type.NULL) {
                teamList[3] = touchTeam.getComponent(HeroItem_1.default).hero_type;
                GameManager_1.default.getInstance().addHero(touchTeam.getComponent(HeroItem_1.default).hero_type, 3);
                this.clickBtnClose();
                return;
            }
            if (teamList[0] == -1 || teamList[0] == HeroConfig_1.Hero_Type.NULL) {
                teamList[0] = touchTeam.getComponent(HeroItem_1.default).hero_type;
                GameManager_1.default.getInstance().addHero(touchTeam.getComponent(HeroItem_1.default).hero_type, 0);
                this.clickBtnClose();
                return;
            }
            if (teamList[4] == -1 || teamList[4] == HeroConfig_1.Hero_Type.NULL) {
                teamList[4] = touchTeam.getComponent(HeroItem_1.default).hero_type;
                GameManager_1.default.getInstance().addHero(touchTeam.getComponent(HeroItem_1.default).hero_type, 4);
                this.clickBtnClose();
                return;
            }
        }
        else {
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100091));
        }
    };
    RoguelikeTip.prototype.onToggleChange = function () {
        if (this.tag == 0) {
            this.tipLabel.getComponent(cc.Label).string = "选择一个英雄加入你的队伍。";
            this.hero_Chose.active = true;
            this.chariot_Chose.active = false;
            this.heroUp_Chose.active = false;
        }
        else if (this.tag == 1) {
            this.hero_Chose.active = false;
            this.chariot_Chose.active = false;
            this.heroUp_Chose.active = true;
            this.tipLabel.getComponent(cc.Label).string = "选择一个英雄进行升级。";
        }
        else if (this.tag == 2) {
            this.hero_Chose.active = false;
            this.chariot_Chose.active = true;
            this.heroUp_Chose.active = false;
            this.tipLabel.getComponent(cc.Label).string = "选择一个技能用于加强你的战车。";
        }
    };
    RoguelikeTip.prototype.clickBtnClose = function () {
        console.log("离开roguelike");
        cc.director.resume();
        GameManager_1.default.getInstance().cur_game_state = Constants_1.GameState.Game_Playing;
        GameManager_1.default.getInstance().loadLevel();
        _super.prototype.onClose.call(this);
    };
    __decorate([
        property(cc.Node)
    ], RoguelikeTip.prototype, "ToggleContainer", void 0);
    __decorate([
        property(cc.Node)
    ], RoguelikeTip.prototype, "tipLabel", void 0);
    __decorate([
        property(cc.Node)
    ], RoguelikeTip.prototype, "content", void 0);
    __decorate([
        property(cc.Prefab)
    ], RoguelikeTip.prototype, "hero_item", void 0);
    __decorate([
        property(cc.Node)
    ], RoguelikeTip.prototype, "hero_Chose", void 0);
    __decorate([
        property(cc.Node)
    ], RoguelikeTip.prototype, "chariot_Chose", void 0);
    __decorate([
        property(cc.Node)
    ], RoguelikeTip.prototype, "heroUp_Chose", void 0);
    __decorate([
        property(cc.Node)
    ], RoguelikeTip.prototype, "chariotItem0", void 0);
    __decorate([
        property(cc.Node)
    ], RoguelikeTip.prototype, "chariotItem1", void 0);
    __decorate([
        property(cc.Node)
    ], RoguelikeTip.prototype, "chariotItem2", void 0);
    __decorate([
        property(cc.Node)
    ], RoguelikeTip.prototype, "heroUpItem0", void 0);
    __decorate([
        property(cc.Node)
    ], RoguelikeTip.prototype, "heroUpItem1", void 0);
    __decorate([
        property(cc.Node)
    ], RoguelikeTip.prototype, "heroUpItem2", void 0);
    RoguelikeTip = __decorate([
        ccclass
    ], RoguelikeTip);
    return RoguelikeTip;
}(UIComponent_1.default));
exports.default = RoguelikeTip;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcVWlcXFJvZ3VlbGlrZVRpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRiw2Q0FBNEM7QUFDNUMsaURBQTRDO0FBQzVDLDJEQUEwRDtBQUMxRCx5REFBdUQ7QUFDdkQsbURBQThDO0FBQzlDLG9EQUErQztBQUUvQyxzREFBaUQ7QUFDakQsdUVBQWtFO0FBQ2xFLDJDQUFzQztBQUN0QywyQ0FBc0M7QUFFaEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMEMsZ0NBQVc7SUFBckQ7UUFNSSx3QkFBd0I7UUFONUIscUVBbVVDO1FBM1RHLGVBQWU7UUFDZixTQUFHLEdBQVcsQ0FBQyxDQUFDLENBQUEsY0FBYztRQUU5QixxQkFBZSxHQUFZLElBQUksQ0FBQTtRQUcvQixjQUFRLEdBQVksSUFBSSxDQUFBO1FBR3hCLGFBQU8sR0FBWSxJQUFJLENBQUMsQ0FBQSxTQUFTO1FBR2pDLGVBQVMsR0FBYyxJQUFJLENBQUMsQ0FBQSxVQUFVO1FBR3RDLGdCQUFVLEdBQVksSUFBSSxDQUFDLENBQUEsUUFBUTtRQUduQyxtQkFBYSxHQUFZLElBQUksQ0FBQyxDQUFBLFVBQVU7UUFHeEMsa0JBQVksR0FBWSxJQUFJLENBQUMsQ0FBQSxVQUFVO1FBR3ZDLGtCQUFZLEdBQVksSUFBSSxDQUFDLENBQUEsV0FBVztRQUV4QyxrQkFBWSxHQUFZLElBQUksQ0FBQyxDQUFBLFdBQVc7UUFFeEMsa0JBQVksR0FBWSxJQUFJLENBQUMsQ0FBQSxXQUFXO1FBR3hDLGlCQUFXLEdBQVksSUFBSSxDQUFDLENBQUEsV0FBVztRQUV2QyxpQkFBVyxHQUFZ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b250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi8uLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb19UeXBlIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBIZXJvSXRlbSBmcm9tIFwiLi4vLi4vSGVyby9VaS9IZXJvSXRlbVwiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uLy4uL1VJL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFVpQWN0aW9uIH0gZnJvbSBcIi4uLy4uL1VJL1VpSW50ZXJmYWNlXCI7XHJcbmltcG9ydCBXYWxsTWFuYWdlciBmcm9tIFwiLi4vLi4vV2FsbC9XYWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgQ2hhcmlvSXRlbSBmcm9tIFwiLi9DaGFyaW9JdGVtXCI7XHJcbmltcG9ydCBIZXJvVXBJdGVtIGZyb20gXCIuL0hlcm9VcEl0ZW1cIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb2d1ZWxpa2VUaXAgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIC8vIG9uTG9hZCAoKSB7fVxyXG4gICAgdGFnOiBudW1iZXIgPSAwOy8v6YCJ5oupdG9nZ2xl55qE6YCJ5oup5pWwXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFRvZ2dsZUNvbnRhaW5lcjogY2MuTm9kZSA9IG51bGxcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHRpcExhYmVsOiBjYy5Ob2RlID0gbnVsbFxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgY29udGVudDogY2MuTm9kZSA9IG51bGw7Ly/oi7Hpm4TpgInmi6nniLboioLngrlcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgaGVyb19pdGVtOiBjYy5QcmVmYWIgPSBudWxsOy8v6Iux6ZuE5aS05YOP55qE6aKE5Yi25L2TXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBoZXJvX0Nob3NlOiBjYy5Ob2RlID0gbnVsbDsvL+mAieaLqeiLsembhOiKgueCuVxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgY2hhcmlvdF9DaG9zZTogY2MuTm9kZSA9IG51bGw7Ly/miJjovabljYfnuqfpgInmi6noioLngrlcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGhlcm9VcF9DaG9zZTogY2MuTm9kZSA9IG51bGw7Ly/oi7Hpm4TljYfnuqfpgInmi6noioLngrlcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGNoYXJpb3RJdGVtMDogY2MuTm9kZSA9IG51bGw7Ly/miJjovabljYfnuqfpgInmi6noioLngrkwXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGNoYXJpb3RJdGVtMTogY2MuTm9kZSA9IG51bGw7Ly/miJjovabljYfnuqfpgInmi6noioLngrkxXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGNoYXJpb3RJdGVtMjogY2MuTm9kZSA9IG51bGw7Ly/miJjovabljYfnuqfpgInmi6noioLngrkyXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBoZXJvVXBJdGVtMDogY2MuTm9kZSA9IG51bGw7Ly/oi7Hpm4TljYfnuqfpgInmi6noioLngrkwXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGhlcm9VcEl0ZW0xOiBjYy5Ob2RlID0gbnVsbDsvL+iLsembhOWNh+e6p+mAieaLqeiKgueCuTFcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgaGVyb1VwSXRlbTI6IGNjLk5vZGUgPSBudWxsOy8v6Iux6ZuE5Y2H57qn6YCJ5oup6IqC54K5MlxyXG5cclxuXHJcbiAgICBncmV5YnV0dG9uanVkZ21lbnQ6IG51bWJlciA9IDA7XHJcblxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICB0aGlzLnRhZyA9IDBcclxuICAgICAgICB0aGlzLlRvZ2dsZUNvbnRhaW5lci5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuVG9nZ2xlKS5pc0NoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMub25Ub2dnbGVDaGFuZ2UoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIui/m+WFpVJvZ3VlTGlrZVwiKTtcclxuICAgICAgICB0aGlzLmNoYXJpb3RVcGdyYWRhdGlvbigpO1xyXG4gICAgICAgIHRoaXMuUmVmcmVzaGhlcm9pdG1lc3RhdHVzKCk7XHJcbiAgICAgICAgdGhpcy5oZXJvVXBSZWZyZXNoKCk7XHJcbiAgICAgICAgdGhpcy5jaGFyaW90SXRlbTAub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uQ2hhcmlvSXRlbVRvdWNoRW5kLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmNoYXJpb3RJdGVtMS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25DaGFyaW9JdGVtVG91Y2hFbmQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY2hhcmlvdEl0ZW0yLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkNoYXJpb0l0ZW1Ub3VjaEVuZCwgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuaGVyb1VwSXRlbTAub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uSGVyb1VwVG91Y2hFbmQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGVyb1VwSXRlbTEub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uSGVyb1VwVG91Y2hFbmQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGVyb1VwSXRlbTIub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uSGVyb1VwVG91Y2hFbmQsIHRoaXMpO1xyXG5cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jaGFyaW90SXRlbTAub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkNoYXJpb0l0ZW1Ub3VjaEVuZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jaGFyaW90SXRlbTEub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkNoYXJpb0l0ZW1Ub3VjaEVuZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jaGFyaW90SXRlbTIub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkNoYXJpb0l0ZW1Ub3VjaEVuZCwgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuaGVyb1VwSXRlbTAub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkhlcm9VcFRvdWNoRW5kLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmhlcm9VcEl0ZW0xLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25IZXJvVXBUb3VjaEVuZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5oZXJvVXBJdGVtMi5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uSGVyb1VwVG91Y2hFbmQsIHRoaXMpO1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLnJlc3VtZSgpO1xyXG4gICAgfVxyXG4gICAgb25FbmFibGUoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBoZXJvVXBSZWZyZXNoKCk6dm9pZHtcclxuICAgICAgICB2YXIgaGVyb0hhczpBcnJheTxIZXJvX1R5cGU+PVtdO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm8uZm9yRWFjaCgodiwgaykgPT4ge1xyXG4gICAgICAgICAgaWYodi5oZXJvX2x2bDw1KXtcclxuICAgICAgICAgICAgaGVyb0hhcy5wdXNoKHYuaGVyb190eXBlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5oul5pyJ55qE5Y+v5Y2H57qn6Iux6ZuEXCIraGVyb0hhcy5sZW5ndGgpO1xyXG4gICAgICAgIHRoaXMuaGVyb1VwSXRlbTAueCA9IC0yMjM7XHJcbiAgICAgICAgdGhpcy5oZXJvVXBJdGVtMS54ID0gMDtcclxuICAgICAgICB0aGlzLmhlcm9VcEl0ZW0yLnggPSAyMjM7XHJcbiAgICAgICAgdGhpcy5oZXJvVXBJdGVtMS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaGVyb1VwSXRlbTIuYWN0aXZlID0gdHJ1ZTtcclxuXHJcblxyXG4gICAgICAgIGhlcm9IYXMuc29ydChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJhbmRvbSgpIC0gMC41XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICBcclxuICAgICAgICBpZihoZXJvSGFzLmxlbmd0aD09MCl7XHJcbiAgICAgICAgICAgIC8v5rKh5pyJ5Y+v5Y2H57qn6Iux6ZuE77yM5pqC5LiN5aSE55CGXHJcbiAgICAgICAgICBcclxuICAgICAgICB9ZWxzZSBpZihoZXJvSGFzLmxlbmd0aD09MSl7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb1VwSXRlbTAueCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb1VwSXRlbTEuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb1VwSXRlbTIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb1VwSXRlbTAuZ2V0Q29tcG9uZW50KEhlcm9VcEl0ZW0pLmluaXREYXRhKGhlcm9IYXNbMF0pO1xyXG5cclxuICAgICAgICB9ZWxzZSBpZihoZXJvSGFzLmxlbmd0aD09Mil7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb1VwSXRlbTAueCA9IC0xMTEuNTtcclxuICAgICAgICAgICAgdGhpcy5oZXJvVXBJdGVtMS54ID0gMTExLjU7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb1VwSXRlbTIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb1VwSXRlbTAuZ2V0Q29tcG9uZW50KEhlcm9VcEl0ZW0pLmluaXREYXRhKGhlcm9IYXNbMF0pO1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9VcEl0ZW0xLmdldENvbXBvbmVudChIZXJvVXBJdGVtKS5pbml0RGF0YShoZXJvSGFzWzFdKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5oZXJvVXBJdGVtMC5nZXRDb21wb25lbnQoSGVyb1VwSXRlbSkuaW5pdERhdGEoaGVyb0hhc1swXSk7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb1VwSXRlbTEuZ2V0Q29tcG9uZW50KEhlcm9VcEl0ZW0pLmluaXREYXRhKGhlcm9IYXNbMV0pO1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9VcEl0ZW0yLmdldENvbXBvbmVudChIZXJvVXBJdGVtKS5pbml0RGF0YShoZXJvSGFzWzJdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGNoYXJpb3RVcGdyYWRhdGlvbigpOiB2b2lkIHtcclxuICAgICAgICB2YXIgZGF0YTogQXJyYXk8bnVtYmVyPiA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Y2hhcmlvVXBncmFkYXRpb25EYXRhKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLojrflvpfnmoTljYfnuqfmlbDmja5cIiArIGRhdGEpO1xyXG5cclxuICAgICAgICB0aGlzLmNoYXJpb3RJdGVtMC5nZXRDb21wb25lbnQoQ2hhcmlvSXRlbSkuaW5pdERhdGEoZGF0YVswXSk7XHJcblxyXG4gICAgICAgIHRoaXMuY2hhcmlvdEl0ZW0xLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jaGFyaW90SXRlbTIuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGFyaW90SXRlbTAueCA9IC0yMjM7XHJcbiAgICAgICAgdGhpcy5jaGFyaW90SXRlbTEueCA9IDA7XHJcbiAgICAgICAgdGhpcy5jaGFyaW90SXRlbTIueCA9IDIyMztcclxuICAgICAgICBpZiAoZGF0YVsxXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmlvdEl0ZW0xLmdldENvbXBvbmVudChDaGFyaW9JdGVtKS5pbml0RGF0YShkYXRhWzFdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJpb3RJdGVtMS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jaGFyaW90SXRlbTIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmlvdEl0ZW0wLnggPSAwO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGF0YVsyXSAhPSBudWxsKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNoYXJpb3RJdGVtMi5nZXRDb21wb25lbnQoQ2hhcmlvSXRlbSkuaW5pdERhdGEoZGF0YVsyXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFyaW90SXRlbTAueCA9IC0xMTEuNTtcclxuICAgICAgICAgICAgdGhpcy5jaGFyaW90SXRlbTEueCA9IDExMS41O1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJpb3RJdGVtMi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5Ub2dnbGUoZXZlbiwgaSkgey8v5Y2V6YCJ5oyJ6ZKu55qE6YCJ5oupXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCIrKysrKysrXCIsZXZlbixpKVxyXG4gICAgICAgIHRoaXMudGFnID0gaTtcclxuICAgICAgICB0aGlzLm9uVG9nZ2xlQ2hhbmdlKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgUmVmcmVzaGhlcm9pdG1lc3RhdHVzKCk6IHZvaWQge1xyXG4gICAgICAgIC8v5bey6Kej6ZSB55qE6Iux6ZuEXHJcbiAgICAgICAgbGV0IEhlcm9MaXN0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvTGlzdCgpLy/mlbDph48gICDoi7Hpm4RpZOexu+WeiyDoi7Hpm4TnrYnnuqcg6Iux6ZuE5ZOB6LSoICDoi7Hpm4TmmJ/mmJ/pmLbmrrVcclxuXHJcbiAgICAgICAgbGV0IGhlcm9CYXNpY2RhdGFhcnIgPSBbXS8v5pyA6auY5oiY5Yqb5pWw57uEXHJcbiAgICAgICAgbGV0IEhlcm9MaXN0YXJyID0gSGVyb0xpc3QvL+W3suino+mUgeeahOiLsembhFxyXG4gICAgICAgIGZvciAobGV0IGhlcm9pbmRleCA9IDA7IGhlcm9pbmRleCA8IEhlcm9MaXN0Lmxlbmd0aDsgaGVyb2luZGV4KyspIHtcclxuICAgICAgICAgICAgbGV0IGhlcm8gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmhlcm9faXRlbSk7XHJcbiAgICAgICAgICAgIGhlcm8ubmFtZSA9IFwiXCIgKyBoZXJvaW5kZXhcclxuICAgICAgICAgICAgaGVyby5zZXRTY2FsZSgwLjc1LCAwLjc1KVxyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuYWRkQ2hpbGQoaGVybyk7XHJcblxyXG5cclxuICAgICAgICAgICAgaGVyby5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25IZXJvSXRlbVRvdWNoRW5kLCB0aGlzKTtcclxuICAgICAgICAgICAgLy8gaGVyby5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIHRoaXMub25IZXJvSXRlbVRvdWNoQ2FuY2VsLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb250ZW50LmdldENvbXBvbmVudChjYy5MYXlvdXQpLnVwZGF0ZUxheW91dCgpO1xyXG4gICAgICAgIC8v5Yi35paw6Iux6ZuEaXRtZVxyXG4gICAgICAgIGZvciAobGV0IGhlcm9CYXNpY2RhdGFpbmRleCA9IDA7IGhlcm9CYXNpY2RhdGFpbmRleCA8IEhlcm9MaXN0Lmxlbmd0aDsgaGVyb0Jhc2ljZGF0YWluZGV4KyspIHtcclxuICAgICAgICAgICAgbGV0IGhlcm9CYXNpY2RhdGEgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9EYXRhKEhlcm9MaXN0W2hlcm9CYXNpY2RhdGFpbmRleF0uaGVyb190eXBlKS8v6Iux6ZuE55qE5Z+656GA5pWw5o2uICAg5Lyg5YWl6Iux6ZuEaWTnsbvlnosgIOmYsuW+oeWKmyAg55Sf5ZG95YC8ICDlkb3kuK3lgLwgXHJcbiAgICAgICAgICAgIGhlcm9CYXNpY2RhdGFhcnIucHVzaChoZXJvQmFzaWNkYXRhLnRvdGFsX2F0dGFjaylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5o6S5YiX6Iux6ZuE5oiY5YqbXHJcbiAgICAgICAgbGV0IGN1blxyXG4gICAgICAgIGxldCBoZXJvY3VuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGhlcm9CYXNpY2RhdGFhcnIubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHBhaXh2aW5kZXggPSAwOyBwYWl4dmluZGV4IDwgaGVyb0Jhc2ljZGF0YWFyci5sZW5ndGggLSAxOyBwYWl4dmluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChoZXJvQmFzaWNkYXRhYXJyW3BhaXh2aW5kZXggKyAxXSA+IGhlcm9CYXNpY2RhdGFhcnJbcGFpeHZpbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjdW4gPSBoZXJvQmFzaWNkYXRhYXJyW3BhaXh2aW5kZXhdXHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb0Jhc2ljZGF0YWFycltwYWl4dmluZGV4XSA9IGhlcm9CYXNpY2RhdGFhcnJbcGFpeHZpbmRleCArIDFdXHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb0Jhc2ljZGF0YWFycltwYWl4dmluZGV4ICsgMV0gPSBjdW5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb2N1biA9IEhlcm9MaXN0YXJyW3BhaXh2aW5kZXhdXHJcbiAgICAgICAgICAgICAgICAgICAgSGVyb0xpc3RhcnJbcGFpeHZpbmRleF0gPSBIZXJvTGlzdGFycltwYWl4dmluZGV4ICsgMV1cclxuICAgICAgICAgICAgICAgICAgICBIZXJvTGlzdGFycltwYWl4dmluZGV4ICsgMV0gPSBoZXJvY3VuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRlYW1MaXN0ID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfdGVhbV9saXN0O1xyXG5cclxuICAgICAgICAvL+WIt+aWsOiLsembhGl0bWXnirbmgIFcclxuICAgICAgICAvL+ihgOmHj1xyXG5cclxuICAgICAgICBmb3IgKGxldCBzaHVheGluZ2luZGV4ID0gMDsgc2h1YXhpbmdpbmRleCA8IEhlcm9MaXN0YXJyLmxlbmd0aDsgc2h1YXhpbmdpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5jaGlsZHJlbltzaHVheGluZ2luZGV4XS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLlJlZnJlc2hIZXJvZXNJdGVtKEhlcm9MaXN0YXJyW3NodWF4aW5naW5kZXhdLmhlcm9fdHlwZSlcclxuICAgICAgICAgICAgZm9yIChsZXQgdGVhbUxpc3RpbmRleCA9IDA7IHRlYW1MaXN0aW5kZXggPCB0ZWFtTGlzdC5sZW5ndGg7IHRlYW1MaXN0aW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRlYW1MaXN0W3RlYW1MaXN0aW5kZXhdID09IEhlcm9MaXN0YXJyW3NodWF4aW5naW5kZXhdLmhlcm9fdHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5jaGlsZHJlbltzaHVheGluZ2luZGV4XS5nZXRDaGlsZEJ5TmFtZShcInNoYW5nemhlbmdcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcbiAgICBvbkhlcm9VcFRvdWNoRW5kKGU6IGNjLkV2ZW50LkV2ZW50VG91Y2gpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdG91Y2hUYXJnZXQgPSBlLmdldEN1cnJlbnRUYXJnZXQoKTtcclxuICAgICAgICBpZiAodG91Y2hUYXJnZXQuYWN0aXZlID09IHRydWUpIHtcclxuICAgICAgICAgICAgdmFyIGhlcm9UeXBlOiBudW1iZXIgPSB0b3VjaFRhcmdldC5nZXRDb21wb25lbnQoSGVyb1VwSXRlbSkuZ2V0RGF0YVR5cGUoKTtcclxuICAgICAgICAgICAgaWYoIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm8uZ2V0KGhlcm9UeXBlKS5oZXJvX2x2bDw1KXtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm8uZ2V0KGhlcm9UeXBlKS5oZXJvX2x2bCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmhlcm9VcFJlZnJlc2goKTtcclxuICAgICAgICAgICAgdGhpcy5jbGlja0J0bkNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25DaGFyaW9JdGVtVG91Y2hFbmQoZTogY2MuRXZlbnQuRXZlbnRUb3VjaCk6IHZvaWQge1xyXG4gICAgICAgIGxldCB0b3VjaFRhcmdldCA9IGUuZ2V0Q3VycmVudFRhcmdldCgpO1xyXG4gICAgICAgIGlmICh0b3VjaFRhcmdldC5hY3RpdmUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB2YXIgY2hhcmlvVHlwZTogbnVtYmVyID0gdG91Y2hUYXJnZXQuZ2V0Q29tcG9uZW50KENoYXJpb0l0ZW0pLmdldERhdGFUeXBlKCk7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhcmlvVXBncmFkYXRpb25EYXRhW2NoYXJpb1R5cGVdKys7XHJcbiAgICAgICAgICAgIC8vW1wi5Yqg5pS75Ye7XCIsXCLooYDph4/kuIrpmZBcIixcIuaUu+mAn1wiLFwi6Ziy5b6hXCIsXCLmioDog73pl7TpmpRcIixcIuW3puWPs+enu+WKqFwiLFwi5Zue6KGAXCJdO1xyXG4gICAgICAgICAgICBpZiAoY2hhcmlvVHlwZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hNYWluV2FsbERhdGFCeWFkZEhlcm8oKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNoYXJpb1R5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoTWFpbldhbGxEYXRhQnlhZGRIZXJvKClcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhcmlvVHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAvL+aUu+mAn+ebtOaOpeWcqOiLsembhOmHjOmdouWPllxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNoYXJpb1R5cGUgPT0gMykge1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoTWFpbldhbGxEYXRhQnlhZGRIZXJvKClcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhcmlvVHlwZSA9PSA0KSB7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNoYXJpb1R5cGUgPT0gNSkge1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjaGFyaW9UeXBlID09IDYpIHtcclxuICAgICAgICAgICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5jaGFuZ2VIcChXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuZ2V0TWF4SHAoKSAqIDAuMik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmlvdFVwZ3JhZGF0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tCdG5DbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uSGVyb0l0ZW1Ub3VjaEVuZChlOiBjYy5FdmVudC5FdmVudFRvdWNoKSB7XHJcbiAgICAgICAgbGV0IHRvdWNoVGVhbSA9IGUuZ2V0Q3VycmVudFRhcmdldCgpO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKHRvdWNoVGVhbS5nZXRDaGlsZEJ5TmFtZShcInNoYW5nemhlbmdcIikuYWN0aXZlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIC8v5LiK6Zi16K+l6Iux6ZuEXHJcbiAgICAgICAgICAgIGxldCB0ZWFtTGlzdCA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX3RlYW1fbGlzdDtcclxuICAgICAgICAgICAgaWYgKHRlYW1MaXN0WzFdID09IC0xIHx8IHRlYW1MaXN0WzFdID09IEhlcm9fVHlwZS5OVUxMKSB7XHJcbiAgICAgICAgICAgICAgICB0ZWFtTGlzdFsxXSA9IHRvdWNoVGVhbS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLmhlcm9fdHlwZVxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRIZXJvKHRvdWNoVGVhbS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLmhlcm9fdHlwZSwgMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrQnRuQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRlYW1MaXN0WzNdID09IC0xIHx8IHRlYW1MaXN0WzNdID09IEhlcm9fVHlwZS5OVUxMKSB7XHJcbiAgICAgICAgICAgICAgICB0ZWFtTGlzdFszXSA9IHRvdWNoVGVhbS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLmhlcm9fdHlwZVxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRIZXJvKHRvdWNoVGVhbS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLmhlcm9fdHlwZSwgMyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrQnRuQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRlYW1MaXN0WzBdID09IC0xIHx8IHRlYW1MaXN0WzBdID09IEhlcm9fVHlwZS5OVUxMKSB7XHJcbiAgICAgICAgICAgICAgICB0ZWFtTGlzdFswXSA9IHRvdWNoVGVhbS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLmhlcm9fdHlwZVxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRIZXJvKHRvdWNoVGVhbS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLmhlcm9fdHlwZSwgMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrQnRuQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRlYW1MaXN0WzRdID09IC0xIHx8IHRlYW1MaXN0WzRdID09IEhlcm9fVHlwZS5OVUxMKSB7XHJcbiAgICAgICAgICAgICAgICB0ZWFtTGlzdFs0XSA9IHRvdWNoVGVhbS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLmhlcm9fdHlwZVxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRIZXJvKHRvdWNoVGVhbS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLmhlcm9fdHlwZSwgNCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrQnRuQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDkxKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uVG9nZ2xlQ2hhbmdlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnRhZyA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGlwTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIumAieaLqeS4gOS4quiLsembhOWKoOWFpeS9oOeahOmYn+S8jeOAglwiO1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9fQ2hvc2UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5jaGFyaW90X0Nob3NlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9VcF9DaG9zZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGFnID09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5oZXJvX0Nob3NlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJpb3RfQ2hvc2UuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb1VwX0Nob3NlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMudGlwTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIumAieaLqeS4gOS4quiLsembhOi/m+ihjOWNh+e6p+OAglwiO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50YWcgPT0gMikge1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9fQ2hvc2UuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmlvdF9DaG9zZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9VcF9DaG9zZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy50aXBMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwi6YCJ5oup5LiA5Liq5oqA6IO955So5LqO5Yqg5by65L2g55qE5oiY6L2m44CCXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5DbG9zZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuemu+W8gHJvZ3VlbGlrZVwiKTtcclxuXHJcbiAgICAgICAgY2MuZGlyZWN0b3IucmVzdW1lKCk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSA9IEdhbWVTdGF0ZS5HYW1lX1BsYXlpbmc7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkTGV2ZWwoKTtcclxuICAgICAgICBzdXBlci5vbkNsb3NlKCk7XHJcbiAgICB9XHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==