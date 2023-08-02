
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
        _this.indexHeroItem = false;
        _this.indexHeroUp = 0;
        return _this;
        // update (dt) {}
    }
    RoguelikeTip.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        console.log("进入RogueLike");
        this.chariotUpgradation();
        this.indexHeroItem = this.Refreshheroitmestatus();
        this.indexHeroUp = this.heroUpRefresh();
        if (this.indexHeroItem) {
            this.tag = 0;
            this.ToggleContainer.children[0].getComponent(cc.Toggle).isChecked = true;
        }
        else if (this.indexHeroUp > 0) {
            this.tag = 1;
            this.ToggleContainer.children[1].getComponent(cc.Toggle).isChecked = true;
        }
        else {
            this.tag = 2;
            this.ToggleContainer.children[2].getComponent(cc.Toggle).isChecked = true;
        }
        this.onToggleChange();
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
            if (v.hero_type <= 4) {
                if (v.hero_lvl < 4) {
                    heroHas.push(v.hero_type);
                }
            }
            else {
                if (v.hero_lvl < 5) {
                    heroHas.push(v.hero_type);
                }
            }
        });
        console.log("拥有的可升级英雄" + heroHas.length);
        this.heroUpItem0.x = -223;
        this.heroUpItem1.x = 0;
        this.heroUpItem2.x = 223;
        this.heroUpItem0.active = true;
        this.heroUpItem1.active = true;
        this.heroUpItem2.active = true;
        heroHas.sort(function () {
            return Math.random() - 0.5;
        });
        if (heroHas.length == 0) {
            //没有可升级英雄，暂不处理
            this.heroUpItem0.active = false;
            this.heroUpItem1.active = false;
            this.heroUpItem2.active = false;
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
        return heroHas.length;
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
        var kewanNum = 0;
        //刷新英雄itme状态
        for (var shuaxingindex = 0; shuaxingindex < HeroListarr.length; shuaxingindex++) {
            this.content.children[shuaxingindex].getComponent(HeroItem_1.default).RefreshHeroesItem(HeroListarr[shuaxingindex].hero_type);
            for (var teamListindex = 0; teamListindex < teamList.length; teamListindex++) {
                if (teamList[teamListindex] == HeroListarr[shuaxingindex].hero_type) {
                    this.content.children[shuaxingindex].getChildByName("shangzheng").active = true;
                }
            }
            if (this.content.children[shuaxingindex].getChildByName("shangzheng").active == false) {
                kewanNum++;
            }
        }
        console.log("可用英雄:" + kewanNum);
        var hasKongwei = false;
        for (var i = 0; i < teamList.length; i++) {
            if (teamList[i] <= 0) {
                hasKongwei = true;
            }
        }
        //有空位并且有可上场英雄
        if (kewanNum > 0 && hasKongwei == true) {
            return true;
        }
        return false;
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
            //["加攻击","血量上限","攻速","防御","技能间隔","回血"];
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
            if (this.indexHeroItem) {
                this.tipLabel.getComponent(cc.Label).string = "选择一个英雄加入你的队伍。";
            }
            else {
                this.tipLabel.getComponent(cc.Label).string = "已无法让更多英雄上场。";
            }
            this.hero_Chose.active = true;
            this.chariot_Chose.active = false;
            this.heroUp_Chose.active = false;
        }
        else if (this.tag == 1) {
            this.hero_Chose.active = false;
            this.chariot_Chose.active = false;
            this.heroUp_Chose.active = true;
            if (this.indexHeroUp > 0) {
                this.tipLabel.getComponent(cc.Label).string = "选择一个英雄进行升级。";
            }
            else {
                this.tipLabel.getComponent(cc.Label).string = "没有可升级的英雄。";
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcVWlcXFJvZ3VlbGlrZVRpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRiw2Q0FBNEM7QUFDNUMsaURBQTRDO0FBQzVDLDJEQUEwRDtBQUMxRCx5REFBdUQ7QUFDdkQsbURBQThDO0FBQzlDLG9EQUErQztBQUUvQyxzREFBaUQ7QUFDakQsdUVBQWtFO0FBQ2xFLDJDQUFzQztBQUN0QywyQ0FBc0M7QUFFaEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMEMsZ0NBQVc7SUFBckQ7UUFNSSx3QkFBd0I7UUFONUIscUVBa1hDO1FBMVdHLGVBQWU7UUFDZixTQUFHLEdBQVcsQ0FBQyxDQUFDLENBQUEsY0FBYztRQUU5QixxQkFBZSxHQUFZLElBQUksQ0FBQTtRQUcvQixjQUFRLEdBQVksSUFBSSxDQUFBO1FBR3hCLGFBQU8sR0FBWSxJQUFJLENBQUMsQ0FBQSxTQUFTO1FBR2pDLGVBQVMsR0FBYyxJQUFJLENBQUMsQ0FBQSxVQUFVO1FBR3RDLGdCQUFVLEdBQVksSUFBSSxDQUFDLENBQUEsUUFBUTtRQUduQyxtQkFBYSxHQUFZLElBQUksQ0FBQyxDQUFBLFVBQVU7UUFHeEMsa0JBQVksR0FBWSxJQUFJLENBQUMsQ0FBQSxVQUFVO1FBR3ZDLGtCQUFZLEdBQVksSUFBSSxDQUFDLENBQUEsV0FBVztRQUV4QyxrQkFBWSxHQUFZLElBQUksQ0FBQyxDQUFBLFdBQVc7UUFFeEMsa0JBQVksR0FBWSxJQUFJLENBQUMsQ0FBQSxXQUFXO1FBR3hDLGlCQUFXLEdBQVksSUFBSSxDQUFDLENBQUEsV0FBVztRQUV2QyxpQkFBVyxHQUFZ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RUFBRSxDQUFDLElBQUksQ0FBQztrREFDTTtJQUd4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNNO0lBR3hCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7bURBQ1E7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDUztJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3VEQUNZO0lBRzlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ1c7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztzREFDVztJQUU3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNXO0lBRTdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ1c7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDVTtJQUU1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3FEQUNVO0lBRTVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQ1U7SUEzQ1gsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQWtYaEM7SUFBRCxtQkFBQztDQWxYRCxBQWtYQyxDQWxYeUMscUJBQVcsR0FrWHBEO2tCQWxYb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi8uLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb19UeXBlIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBIZXJvSXRlbSBmcm9tIFwiLi4vLi4vSGVyby9VaS9IZXJvSXRlbVwiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uLy4uL1VJL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFVpQWN0aW9uIH0gZnJvbSBcIi4uLy4uL1VJL1VpSW50ZXJmYWNlXCI7XHJcbmltcG9ydCBXYWxsTWFuYWdlciBmcm9tIFwiLi4vLi4vV2FsbC9XYWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgQ2hhcmlvSXRlbSBmcm9tIFwiLi9DaGFyaW9JdGVtXCI7XHJcbmltcG9ydCBIZXJvVXBJdGVtIGZyb20gXCIuL0hlcm9VcEl0ZW1cIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb2d1ZWxpa2VUaXAgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIC8vIG9uTG9hZCAoKSB7fVxyXG4gICAgdGFnOiBudW1iZXIgPSAwOy8v6YCJ5oupdG9nZ2xl55qE6YCJ5oup5pWwXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIFRvZ2dsZUNvbnRhaW5lcjogY2MuTm9kZSA9IG51bGxcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHRpcExhYmVsOiBjYy5Ob2RlID0gbnVsbFxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgY29udGVudDogY2MuTm9kZSA9IG51bGw7Ly/oi7Hpm4TpgInmi6nniLboioLngrlcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgaGVyb19pdGVtOiBjYy5QcmVmYWIgPSBudWxsOy8v6Iux6ZuE5aS05YOP55qE6aKE5Yi25L2TXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBoZXJvX0Nob3NlOiBjYy5Ob2RlID0gbnVsbDsvL+mAieaLqeiLsembhOiKgueCuVxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgY2hhcmlvdF9DaG9zZTogY2MuTm9kZSA9IG51bGw7Ly/miJjovabljYfnuqfpgInmi6noioLngrlcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGhlcm9VcF9DaG9zZTogY2MuTm9kZSA9IG51bGw7Ly/oi7Hpm4TljYfnuqfpgInmi6noioLngrlcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGNoYXJpb3RJdGVtMDogY2MuTm9kZSA9IG51bGw7Ly/miJjovabljYfnuqfpgInmi6noioLngrkwXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGNoYXJpb3RJdGVtMTogY2MuTm9kZSA9IG51bGw7Ly/miJjovabljYfnuqfpgInmi6noioLngrkxXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGNoYXJpb3RJdGVtMjogY2MuTm9kZSA9IG51bGw7Ly/miJjovabljYfnuqfpgInmi6noioLngrkyXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBoZXJvVXBJdGVtMDogY2MuTm9kZSA9IG51bGw7Ly/oi7Hpm4TljYfnuqfpgInmi6noioLngrkwXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGhlcm9VcEl0ZW0xOiBjYy5Ob2RlID0gbnVsbDsvL+iLsembhOWNh+e6p+mAieaLqeiKgueCuTFcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgaGVyb1VwSXRlbTI6IGNjLk5vZGUgPSBudWxsOy8v6Iux6ZuE5Y2H57qn6YCJ5oup6IqC54K5MlxyXG5cclxuXHJcbiAgICBncmV5YnV0dG9uanVkZ21lbnQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBpbmRleEhlcm9JdGVtOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBwcml2YXRlIGluZGV4SGVyb1VwOm51bWJlcj0wO1xyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICBcclxuICAgICAgICBcclxuICAgICAgICBjb25zb2xlLmxvZyhcIui/m+WFpVJvZ3VlTGlrZVwiKTtcclxuICAgICAgICB0aGlzLmNoYXJpb3RVcGdyYWRhdGlvbigpO1xyXG5cclxuICAgICAgICB0aGlzLmluZGV4SGVyb0l0ZW09dGhpcy5SZWZyZXNoaGVyb2l0bWVzdGF0dXMoKTtcclxuICAgICAgICB0aGlzLmluZGV4SGVyb1VwPXRoaXMuaGVyb1VwUmVmcmVzaCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuaW5kZXhIZXJvSXRlbSl7XHJcbiAgICAgICAgICAgIHRoaXMudGFnID0gMFxyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZUNvbnRhaW5lci5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuVG9nZ2xlKS5pc0NoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMuaW5kZXhIZXJvVXA+MCl7XHJcbiAgICAgICAgICAgIHRoaXMudGFnID0gMVxyXG4gICAgICAgICAgICB0aGlzLlRvZ2dsZUNvbnRhaW5lci5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuVG9nZ2xlKS5pc0NoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnRhZyA9IDJcclxuICAgICAgICAgICAgdGhpcy5Ub2dnbGVDb250YWluZXIuY2hpbGRyZW5bMl0uZ2V0Q29tcG9uZW50KGNjLlRvZ2dsZSkuaXNDaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vblRvZ2dsZUNoYW5nZSgpO1xyXG4gICAgICAgIHRoaXMuY2hhcmlvdEl0ZW0wLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkNoYXJpb0l0ZW1Ub3VjaEVuZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jaGFyaW90SXRlbTEub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uQ2hhcmlvSXRlbVRvdWNoRW5kLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmNoYXJpb3RJdGVtMi5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25DaGFyaW9JdGVtVG91Y2hFbmQsIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLmhlcm9VcEl0ZW0wLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkhlcm9VcFRvdWNoRW5kLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmhlcm9VcEl0ZW0xLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkhlcm9VcFRvdWNoRW5kLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmhlcm9VcEl0ZW0yLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkhlcm9VcFRvdWNoRW5kLCB0aGlzKTtcclxuXHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2hhcmlvdEl0ZW0wLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25DaGFyaW9JdGVtVG91Y2hFbmQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY2hhcmlvdEl0ZW0xLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25DaGFyaW9JdGVtVG91Y2hFbmQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY2hhcmlvdEl0ZW0yLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25DaGFyaW9JdGVtVG91Y2hFbmQsIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLmhlcm9VcEl0ZW0wLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25IZXJvVXBUb3VjaEVuZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5oZXJvVXBJdGVtMS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uSGVyb1VwVG91Y2hFbmQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGVyb1VwSXRlbTIub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkhlcm9VcFRvdWNoRW5kLCB0aGlzKTtcclxuICAgICAgICBjYy5kaXJlY3Rvci5yZXN1bWUoKTtcclxuICAgIH1cclxuICAgIG9uRW5hYmxlKCkge1xyXG5cclxuICAgIH1cclxuICAgIHByaXZhdGUgaGVyb1VwUmVmcmVzaCgpOiBudW1iZXIge1xyXG4gICAgICAgIHZhciBoZXJvSGFzOiBBcnJheTxIZXJvX1R5cGU+ID0gW107XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5mb3JFYWNoKCh2LCBrKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh2Lmhlcm9fdHlwZSA8PSA0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodi5oZXJvX2x2bCA8IDQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb0hhcy5wdXNoKHYuaGVyb190eXBlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh2Lmhlcm9fbHZsIDwgNSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZXJvSGFzLnB1c2godi5oZXJvX3R5cGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY29uc29sZS5sb2coXCLmi6XmnInnmoTlj6/ljYfnuqfoi7Hpm4RcIiArIGhlcm9IYXMubGVuZ3RoKTtcclxuICAgICAgICB0aGlzLmhlcm9VcEl0ZW0wLnggPSAtMjIzO1xyXG4gICAgICAgIHRoaXMuaGVyb1VwSXRlbTEueCA9IDA7XHJcbiAgICAgICAgdGhpcy5oZXJvVXBJdGVtMi54ID0gMjIzO1xyXG4gICAgICAgIHRoaXMuaGVyb1VwSXRlbTAuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmhlcm9VcEl0ZW0xLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5oZXJvVXBJdGVtMi5hY3RpdmUgPSB0cnVlO1xyXG5cclxuXHJcbiAgICAgICAgaGVyb0hhcy5zb3J0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgLSAwLjVcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGhlcm9IYXMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgLy/msqHmnInlj6/ljYfnuqfoi7Hpm4TvvIzmmoLkuI3lpITnkIZcclxuICAgICAgICAgICAgdGhpcy5oZXJvVXBJdGVtMC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5oZXJvVXBJdGVtMS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5oZXJvVXBJdGVtMi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGhlcm9IYXMubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5oZXJvVXBJdGVtMC54ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5oZXJvVXBJdGVtMS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5oZXJvVXBJdGVtMi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5oZXJvVXBJdGVtMC5nZXRDb21wb25lbnQoSGVyb1VwSXRlbSkuaW5pdERhdGEoaGVyb0hhc1swXSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoaGVyb0hhcy5sZW5ndGggPT0gMikge1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9VcEl0ZW0wLnggPSAtMTExLjU7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb1VwSXRlbTEueCA9IDExMS41O1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9VcEl0ZW0yLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9VcEl0ZW0wLmdldENvbXBvbmVudChIZXJvVXBJdGVtKS5pbml0RGF0YShoZXJvSGFzWzBdKTtcclxuICAgICAgICAgICAgdGhpcy5oZXJvVXBJdGVtMS5nZXRDb21wb25lbnQoSGVyb1VwSXRlbSkuaW5pdERhdGEoaGVyb0hhc1sxXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5oZXJvVXBJdGVtMC5nZXRDb21wb25lbnQoSGVyb1VwSXRlbSkuaW5pdERhdGEoaGVyb0hhc1swXSk7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb1VwSXRlbTEuZ2V0Q29tcG9uZW50KEhlcm9VcEl0ZW0pLmluaXREYXRhKGhlcm9IYXNbMV0pO1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9VcEl0ZW0yLmdldENvbXBvbmVudChIZXJvVXBJdGVtKS5pbml0RGF0YShoZXJvSGFzWzJdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGhlcm9IYXMubGVuZ3RoO1xyXG5cclxuICAgIH1cclxuICAgIHByaXZhdGUgY2hhcmlvdFVwZ3JhZGF0aW9uKCk6IHZvaWQge1xyXG4gICAgICAgIHZhciBkYXRhOiBBcnJheTxudW1iZXI+ID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRjaGFyaW9VcGdyYWRhdGlvbkRhdGEoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuiOt+W+l+eahOWNh+e6p+aVsOaNrlwiICsgZGF0YSk7XHJcblxyXG4gICAgICAgIHRoaXMuY2hhcmlvdEl0ZW0wLmdldENvbXBvbmVudChDaGFyaW9JdGVtKS5pbml0RGF0YShkYXRhWzBdKTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGFyaW90SXRlbTEuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNoYXJpb3RJdGVtMi5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLmNoYXJpb3RJdGVtMC54ID0gLTIyMztcclxuICAgICAgICB0aGlzLmNoYXJpb3RJdGVtMS54ID0gMDtcclxuICAgICAgICB0aGlzLmNoYXJpb3RJdGVtMi54ID0gMjIzO1xyXG4gICAgICAgIGlmIChkYXRhWzFdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFyaW90SXRlbTEuZ2V0Q29tcG9uZW50KENoYXJpb0l0ZW0pLmluaXREYXRhKGRhdGFbMV0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmlvdEl0ZW0xLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJpb3RJdGVtMi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jaGFyaW90SXRlbTAueCA9IDA7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkYXRhWzJdICE9IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmlvdEl0ZW0yLmdldENvbXBvbmVudChDaGFyaW9JdGVtKS5pbml0RGF0YShkYXRhWzJdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJpb3RJdGVtMC54ID0gLTExMS41O1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJpb3RJdGVtMS54ID0gMTExLjU7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmlvdEl0ZW0yLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBjbGlja0J0blRvZ2dsZShldmVuLCBpKSB7Ly/ljZXpgInmjInpkq7nmoTpgInmi6lcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIisrKysrKytcIixldmVuLGkpXHJcbiAgICAgICAgdGhpcy50YWcgPSBpO1xyXG4gICAgICAgIHRoaXMub25Ub2dnbGVDaGFuZ2UoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBSZWZyZXNoaGVyb2l0bWVzdGF0dXMoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy/lt7Lop6PplIHnmoToi7Hpm4RcclxuICAgICAgICBsZXQgSGVyb0xpc3QgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MaXN0KCkvL+aVsOmHjyAgIOiLsembhGlk57G75Z6LIOiLsembhOetiee6pyDoi7Hpm4Tlk4HotKggIOiLsembhOaYn+aYn+mYtuautVxyXG5cclxuICAgICAgICBsZXQgaGVyb0Jhc2ljZGF0YWFyciA9IFtdLy/mnIDpq5jmiJjlipvmlbDnu4RcclxuICAgICAgICBsZXQgSGVyb0xpc3RhcnIgPSBIZXJvTGlzdC8v5bey6Kej6ZSB55qE6Iux6ZuEXHJcbiAgICAgICAgZm9yIChsZXQgaGVyb2luZGV4ID0gMDsgaGVyb2luZGV4IDwgSGVyb0xpc3QubGVuZ3RoOyBoZXJvaW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXQgaGVybyA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaGVyb19pdGVtKTtcclxuICAgICAgICAgICAgaGVyby5uYW1lID0gXCJcIiArIGhlcm9pbmRleFxyXG4gICAgICAgICAgICBoZXJvLnNldFNjYWxlKDAuNzUsIDAuNzUpXHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5hZGRDaGlsZChoZXJvKTtcclxuXHJcblxyXG4gICAgICAgICAgICBoZXJvLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkhlcm9JdGVtVG91Y2hFbmQsIHRoaXMpO1xyXG4gICAgICAgICAgICAvLyBoZXJvLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdGhpcy5vbkhlcm9JdGVtVG91Y2hDYW5jZWwsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbnRlbnQuZ2V0Q29tcG9uZW50KGNjLkxheW91dCkudXBkYXRlTGF5b3V0KCk7XHJcbiAgICAgICAgLy/liLfmlrDoi7Hpm4RpdG1lXHJcbiAgICAgICAgZm9yIChsZXQgaGVyb0Jhc2ljZGF0YWluZGV4ID0gMDsgaGVyb0Jhc2ljZGF0YWluZGV4IDwgSGVyb0xpc3QubGVuZ3RoOyBoZXJvQmFzaWNkYXRhaW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXQgaGVyb0Jhc2ljZGF0YSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0RhdGEoSGVyb0xpc3RbaGVyb0Jhc2ljZGF0YWluZGV4XS5oZXJvX3R5cGUpLy/oi7Hpm4TnmoTln7rnoYDmlbDmja4gICDkvKDlhaXoi7Hpm4RpZOexu+WeiyAg6Ziy5b6h5YqbICDnlJ/lkb3lgLwgIOWRveS4reWAvCBcclxuICAgICAgICAgICAgaGVyb0Jhc2ljZGF0YWFyci5wdXNoKGhlcm9CYXNpY2RhdGEudG90YWxfYXR0YWNrKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/mjpLliJfoi7Hpm4TmiJjliptcclxuICAgICAgICBsZXQgY3VuXHJcbiAgICAgICAgbGV0IGhlcm9jdW5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgaGVyb0Jhc2ljZGF0YWFyci5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgcGFpeHZpbmRleCA9IDA7IHBhaXh2aW5kZXggPCBoZXJvQmFzaWNkYXRhYXJyLmxlbmd0aCAtIDE7IHBhaXh2aW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGhlcm9CYXNpY2RhdGFhcnJbcGFpeHZpbmRleCArIDFdID4gaGVyb0Jhc2ljZGF0YWFycltwYWl4dmluZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1biA9IGhlcm9CYXNpY2RhdGFhcnJbcGFpeHZpbmRleF1cclxuICAgICAgICAgICAgICAgICAgICBoZXJvQmFzaWNkYXRhYXJyW3BhaXh2aW5kZXhdID0gaGVyb0Jhc2ljZGF0YWFycltwYWl4dmluZGV4ICsgMV1cclxuICAgICAgICAgICAgICAgICAgICBoZXJvQmFzaWNkYXRhYXJyW3BhaXh2aW5kZXggKyAxXSA9IGN1blxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZXJvY3VuID0gSGVyb0xpc3RhcnJbcGFpeHZpbmRleF1cclxuICAgICAgICAgICAgICAgICAgICBIZXJvTGlzdGFycltwYWl4dmluZGV4XSA9IEhlcm9MaXN0YXJyW3BhaXh2aW5kZXggKyAxXVxyXG4gICAgICAgICAgICAgICAgICAgIEhlcm9MaXN0YXJyW3BhaXh2aW5kZXggKyAxXSA9IGhlcm9jdW5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdGVhbUxpc3QgPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl90ZWFtX2xpc3Q7XHJcblxyXG4gICAgICAgIHZhciBrZXdhbk51bTpudW1iZXI9MDtcclxuICAgICAgICAvL+WIt+aWsOiLsembhGl0bWXnirbmgIFcclxuICAgICAgICBmb3IgKGxldCBzaHVheGluZ2luZGV4ID0gMDsgc2h1YXhpbmdpbmRleCA8IEhlcm9MaXN0YXJyLmxlbmd0aDsgc2h1YXhpbmdpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5jaGlsZHJlbltzaHVheGluZ2luZGV4XS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLlJlZnJlc2hIZXJvZXNJdGVtKEhlcm9MaXN0YXJyW3NodWF4aW5naW5kZXhdLmhlcm9fdHlwZSlcclxuICAgICAgICAgICAgZm9yIChsZXQgdGVhbUxpc3RpbmRleCA9IDA7IHRlYW1MaXN0aW5kZXggPCB0ZWFtTGlzdC5sZW5ndGg7IHRlYW1MaXN0aW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRlYW1MaXN0W3RlYW1MaXN0aW5kZXhdID09IEhlcm9MaXN0YXJyW3NodWF4aW5naW5kZXhdLmhlcm9fdHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5jaGlsZHJlbltzaHVheGluZ2luZGV4XS5nZXRDaGlsZEJ5TmFtZShcInNoYW5nemhlbmdcIikuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLmNvbnRlbnQuY2hpbGRyZW5bc2h1YXhpbmdpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJzaGFuZ3poZW5nXCIpLmFjdGl2ZT09ZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAga2V3YW5OdW0rKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcIuWPr+eUqOiLsembhDpcIitrZXdhbk51bSk7XHJcbiAgICAgICAgdmFyIGhhc0tvbmd3ZWk6Ym9vbGVhbj1mYWxzZTtcclxuICAgICAgICBmb3IodmFyIGk6bnVtYmVyPTA7aTx0ZWFtTGlzdC5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgaWYodGVhbUxpc3RbaV08PTApe1xyXG4gICAgICAgICAgICAgICAgaGFzS29uZ3dlaT10cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5pyJ56m65L2N5bm25LiU5pyJ5Y+v5LiK5Zy66Iux6ZuEXHJcbiAgICAgICAgaWYoa2V3YW5OdW0+MCYmaGFzS29uZ3dlaT09dHJ1ZSl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgfVxyXG4gICAgb25IZXJvVXBUb3VjaEVuZChlOiBjYy5FdmVudC5FdmVudFRvdWNoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHRvdWNoVGFyZ2V0ID0gZS5nZXRDdXJyZW50VGFyZ2V0KCk7XHJcbiAgICAgICAgaWYgKHRvdWNoVGFyZ2V0LmFjdGl2ZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHZhciBoZXJvVHlwZTogbnVtYmVyID0gdG91Y2hUYXJnZXQuZ2V0Q29tcG9uZW50KEhlcm9VcEl0ZW0pLmdldERhdGFUeXBlKCk7XHJcbiAgICAgICAgICAgIGlmIChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmdldChoZXJvVHlwZSkuaGVyb19sdmwgPCA1KSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmdldChoZXJvVHlwZSkuaGVyb19sdmwrKztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5oZXJvVXBSZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tCdG5DbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uQ2hhcmlvSXRlbVRvdWNoRW5kKGU6IGNjLkV2ZW50LkV2ZW50VG91Y2gpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdG91Y2hUYXJnZXQgPSBlLmdldEN1cnJlbnRUYXJnZXQoKTtcclxuICAgICAgICBpZiAodG91Y2hUYXJnZXQuYWN0aXZlID09IHRydWUpIHtcclxuICAgICAgICAgICAgdmFyIGNoYXJpb1R5cGU6IG51bWJlciA9IHRvdWNoVGFyZ2V0LmdldENvbXBvbmVudChDaGFyaW9JdGVtKS5nZXREYXRhVHlwZSgpO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYXJpb1VwZ3JhZGF0aW9uRGF0YVtjaGFyaW9UeXBlXSsrO1xyXG4gICAgICAgICAgICAvL1tcIuWKoOaUu+WHu1wiLFwi6KGA6YeP5LiK6ZmQXCIsXCLmlLvpgJ9cIixcIumYsuW+oVwiLFwi5oqA6IO96Ze06ZqUXCIsXCLlm57ooYBcIl07XHJcbiAgICAgICAgICAgIGlmIChjaGFyaW9UeXBlID09IDApIHtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVmcmVzaE1haW5XYWxsRGF0YUJ5YWRkSGVybygpXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhcmlvVHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hNYWluV2FsbERhdGFCeWFkZEhlcm8oKVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjaGFyaW9UeXBlID09IDIpIHtcclxuICAgICAgICAgICAgICAgIC8v5pS76YCf55u05o6l5Zyo6Iux6ZuE6YeM6Z2i5Y+WXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhcmlvVHlwZSA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hNYWluV2FsbERhdGFCeWFkZEhlcm8oKVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjaGFyaW9UeXBlID09IDQpIHtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhcmlvVHlwZSA9PSA1KSB7XHJcbiAgICAgICAgICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuY2hhbmdlSHAoV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmdldE1heEhwKCkgKiAwLjIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNoYXJpb3RVcGdyYWRhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLmNsaWNrQnRuQ2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbkhlcm9JdGVtVG91Y2hFbmQoZTogY2MuRXZlbnQuRXZlbnRUb3VjaCkge1xyXG4gICAgICAgIGxldCB0b3VjaFRlYW0gPSBlLmdldEN1cnJlbnRUYXJnZXQoKTtcclxuXHJcblxyXG4gICAgICAgIGlmICh0b3VjaFRlYW0uZ2V0Q2hpbGRCeU5hbWUoXCJzaGFuZ3poZW5nXCIpLmFjdGl2ZSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAvL+S4iumYteivpeiLsembhFxyXG4gICAgICAgICAgICBsZXQgdGVhbUxpc3QgPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl90ZWFtX2xpc3Q7XHJcbiAgICAgICAgICAgIGlmICh0ZWFtTGlzdFsxXSA9PSAtMSB8fCB0ZWFtTGlzdFsxXSA9PSBIZXJvX1R5cGUuTlVMTCkge1xyXG4gICAgICAgICAgICAgICAgdGVhbUxpc3RbMV0gPSB0b3VjaFRlYW0uZ2V0Q29tcG9uZW50KEhlcm9JdGVtKS5oZXJvX3R5cGVcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkSGVybyh0b3VjaFRlYW0uZ2V0Q29tcG9uZW50KEhlcm9JdGVtKS5oZXJvX3R5cGUsIDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja0J0bkNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0ZWFtTGlzdFszXSA9PSAtMSB8fCB0ZWFtTGlzdFszXSA9PSBIZXJvX1R5cGUuTlVMTCkge1xyXG4gICAgICAgICAgICAgICAgdGVhbUxpc3RbM10gPSB0b3VjaFRlYW0uZ2V0Q29tcG9uZW50KEhlcm9JdGVtKS5oZXJvX3R5cGVcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkSGVybyh0b3VjaFRlYW0uZ2V0Q29tcG9uZW50KEhlcm9JdGVtKS5oZXJvX3R5cGUsIDMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja0J0bkNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0ZWFtTGlzdFswXSA9PSAtMSB8fCB0ZWFtTGlzdFswXSA9PSBIZXJvX1R5cGUuTlVMTCkge1xyXG4gICAgICAgICAgICAgICAgdGVhbUxpc3RbMF0gPSB0b3VjaFRlYW0uZ2V0Q29tcG9uZW50KEhlcm9JdGVtKS5oZXJvX3R5cGVcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkSGVybyh0b3VjaFRlYW0uZ2V0Q29tcG9uZW50KEhlcm9JdGVtKS5oZXJvX3R5cGUsIDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja0J0bkNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0ZWFtTGlzdFs0XSA9PSAtMSB8fCB0ZWFtTGlzdFs0XSA9PSBIZXJvX1R5cGUuTlVMTCkge1xyXG4gICAgICAgICAgICAgICAgdGVhbUxpc3RbNF0gPSB0b3VjaFRlYW0uZ2V0Q29tcG9uZW50KEhlcm9JdGVtKS5oZXJvX3R5cGVcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkSGVybyh0b3VjaFRlYW0uZ2V0Q29tcG9uZW50KEhlcm9JdGVtKS5oZXJvX3R5cGUsIDQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja0J0bkNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDA5MSkpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvblRvZ2dsZUNoYW5nZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy50YWcgPT0gMCkge1xyXG4gICAgICAgICAgICBpZih0aGlzLmluZGV4SGVyb0l0ZW0pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aXBMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwi6YCJ5oup5LiA5Liq6Iux6ZuE5Yqg5YWl5L2g55qE6Zif5LyN44CCXCI7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aXBMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwi5bey5peg5rOV6K6p5pu05aSa6Iux6ZuE5LiK5Zy644CCXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuaGVyb19DaG9zZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJpb3RfQ2hvc2UuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb1VwX0Nob3NlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50YWcgPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9fQ2hvc2UuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmlvdF9DaG9zZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5oZXJvVXBfQ2hvc2UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYodGhpcy5pbmRleEhlcm9VcD4wKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudGlwTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIumAieaLqeS4gOS4quiLsembhOi/m+ihjOWNh+e6p+OAglwiO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMudGlwTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuayoeacieWPr+WNh+e6p+eahOiLsembhOOAglwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRhZyA9PSAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb19DaG9zZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jaGFyaW90X0Nob3NlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb1VwX0Nob3NlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnRpcExhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCLpgInmi6nkuIDkuKrmioDog73nlKjkuo7liqDlvLrkvaDnmoTmiJjovabjgIJcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjbGlja0J0bkNsb3NlKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi56a75byAcm9ndWVsaWtlXCIpO1xyXG5cclxuICAgICAgICBjYy5kaXJlY3Rvci5yZXN1bWUoKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlID0gR2FtZVN0YXRlLkdhbWVfUGxheWluZztcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWRMZXZlbCgpO1xyXG4gICAgICAgIHN1cGVyLm9uQ2xvc2UoKTtcclxuICAgIH1cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19