
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcVWlcXFJvZ3VlbGlrZVRpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRiw2Q0FBNEM7QUFDNUMsaURBQTRDO0FBQzVDLDJEQUEwRDtBQUMxRCx5REFBdUQ7QUFDdkQsbURBQThDO0FBQzlDLG9EQUErQztBQUUvQyxzREFBaUQ7QUFDakQsdUVBQWtFO0FBQ2xFLDJDQUFzQztBQUN0QywyQ0FBc0M7QUFFaEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMEMsZ0NBQVc7SUFBckQ7UUFNSSx3QkFBd0I7UUFONUIscUVBaVVDO1FBelRHLGVBQWU7UUFDZixTQUFHLEdBQVcsQ0FBQyxDQUFDLENBQUEsY0FBYztRQUU5QixxQkFBZSxHQUFZLElBQUksQ0FBQTtRQUcvQixjQUFRLEdBQVksSUFBSSxDQUFBO1FBR3hCLGFBQU8sR0FBWSxJQUFJLENBQUMsQ0FBQSxTQUFTO1FBR2pDLGVBQVMsR0FBYyxJQUFJLENBQUMsQ0FBQSxVQUFVO1FBR3RDLGdCQUFVLEdBQVksSUFBSSxDQUFDLENBQUEsUUFBUTtRQUduQyxtQkFBYSxHQUFZLElBQUksQ0FBQyxDQUFBLFVBQVU7UUFHeEMsa0JBQVksR0FBWSxJQUFJLENBQUMsQ0FBQSxVQUFVO1FBR3ZDLGtCQUFZLEdBQVksSUFBSSxDQUFDLENBQUEsV0FBVztRQUV4QyxrQkFBWSxHQUFZLElBQUksQ0FBQyxDQUFBLFdBQVc7UUFFeEMsa0JBQVksR0FBWSxJQUFJLENBQUMsQ0FBQSxXQUFXO1FBR3hDLGlCQUFXLEdBQVksSUFBSSxDQUFDLENBQUEsV0FBVztRQUV2QyxpQkFBVyxHQUFZ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QUFDLGNBQWMsR0FBRyxxQkFBUyxDQUFDLFlBQVksQ0FBQztRQUNsRSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3RDLGlCQUFNLE9BQU8sV0FBRSxDQUFDO0lBQ3BCLENBQUM7SUFwVEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt5REFDYTtJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tEQUNNO0lBR3hCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7aURBQ007SUFHeEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzttREFDUTtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29EQUNTO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7dURBQ1k7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztzREFDVztJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNXO0lBRTdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ1c7SUFFN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztzREFDVztJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3FEQUNVO0lBRTVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQ1U7SUFFNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDVTtJQTNDWCxZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBaVVoQztJQUFELG1CQUFDO0NBalVELEFBaVVDLENBalV5QyxxQkFBVyxHQWlVcEQ7a0JBalVvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IHsgR2FtZVN0YXRlIH0gZnJvbSBcIi4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0hlcm8vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvX1R5cGUgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IEhlcm9JdGVtIGZyb20gXCIuLi8uLi9IZXJvL1VpL0hlcm9JdGVtXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi4vLi4vVUkvVUlDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgVWlBY3Rpb24gfSBmcm9tIFwiLi4vLi4vVUkvVWlJbnRlcmZhY2VcIjtcclxuaW1wb3J0IFdhbGxNYW5hZ2VyIGZyb20gXCIuLi8uLi9XYWxsL1dhbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCBDaGFyaW9JdGVtIGZyb20gXCIuL0NoYXJpb0l0ZW1cIjtcclxuaW1wb3J0IEhlcm9VcEl0ZW0gZnJvbSBcIi4vSGVyb1VwSXRlbVwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvZ3VlbGlrZVRpcCBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcbiAgICB0YWc6IG51bWJlciA9IDA7Ly/pgInmi6l0b2dnbGXnmoTpgInmi6nmlbBcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgVG9nZ2xlQ29udGFpbmVyOiBjYy5Ob2RlID0gbnVsbFxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgdGlwTGFiZWw6IGNjLk5vZGUgPSBudWxsXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBjb250ZW50OiBjYy5Ob2RlID0gbnVsbDsvL+iLsembhOmAieaLqeeItuiKgueCuVxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBoZXJvX2l0ZW06IGNjLlByZWZhYiA9IG51bGw7Ly/oi7Hpm4TlpLTlg4/nmoTpooTliLbkvZNcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGhlcm9fQ2hvc2U6IGNjLk5vZGUgPSBudWxsOy8v6YCJ5oup6Iux6ZuE6IqC54K5XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBjaGFyaW90X0Nob3NlOiBjYy5Ob2RlID0gbnVsbDsvL+aImOi9puWNh+e6p+mAieaLqeiKgueCuVxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgaGVyb1VwX0Nob3NlOiBjYy5Ob2RlID0gbnVsbDsvL+iLsembhOWNh+e6p+mAieaLqeiKgueCuVxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgY2hhcmlvdEl0ZW0wOiBjYy5Ob2RlID0gbnVsbDsvL+aImOi9puWNh+e6p+mAieaLqeiKgueCuTBcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgY2hhcmlvdEl0ZW0xOiBjYy5Ob2RlID0gbnVsbDsvL+aImOi9puWNh+e6p+mAieaLqeiKgueCuTFcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgY2hhcmlvdEl0ZW0yOiBjYy5Ob2RlID0gbnVsbDsvL+aImOi9puWNh+e6p+mAieaLqeiKgueCuTJcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGhlcm9VcEl0ZW0wOiBjYy5Ob2RlID0gbnVsbDsvL+iLsembhOWNh+e6p+mAieaLqeiKgueCuTBcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgaGVyb1VwSXRlbTE6IGNjLk5vZGUgPSBudWxsOy8v6Iux6ZuE5Y2H57qn6YCJ5oup6IqC54K5MVxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBoZXJvVXBJdGVtMjogY2MuTm9kZSA9IG51bGw7Ly/oi7Hpm4TljYfnuqfpgInmi6noioLngrkyXHJcblxyXG5cclxuICAgIGdyZXlidXR0b25qdWRnbWVudDogbnVtYmVyID0gMDtcclxuXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIHRoaXMudGFnID0gMFxyXG4gICAgICAgIHRoaXMuVG9nZ2xlQ29udGFpbmVyLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5Ub2dnbGUpLmlzQ2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5vblRvZ2dsZUNoYW5nZSgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6L+b5YWlUm9ndWVMaWtlXCIpO1xyXG4gICAgICAgIHRoaXMuY2hhcmlvdFVwZ3JhZGF0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5SZWZyZXNoaGVyb2l0bWVzdGF0dXMoKTtcclxuICAgICAgICB0aGlzLmhlcm9VcFJlZnJlc2goKTtcclxuICAgICAgICB0aGlzLmNoYXJpb3RJdGVtMC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25DaGFyaW9JdGVtVG91Y2hFbmQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY2hhcmlvdEl0ZW0xLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkNoYXJpb0l0ZW1Ub3VjaEVuZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jaGFyaW90SXRlbTIub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uQ2hhcmlvSXRlbVRvdWNoRW5kLCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5oZXJvVXBJdGVtMC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25IZXJvVXBUb3VjaEVuZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5oZXJvVXBJdGVtMS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25IZXJvVXBUb3VjaEVuZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5oZXJvVXBJdGVtMi5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25IZXJvVXBUb3VjaEVuZCwgdGhpcyk7XHJcblxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNoYXJpb3RJdGVtMC5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uQ2hhcmlvSXRlbVRvdWNoRW5kLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmNoYXJpb3RJdGVtMS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uQ2hhcmlvSXRlbVRvdWNoRW5kLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmNoYXJpb3RJdGVtMi5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uQ2hhcmlvSXRlbVRvdWNoRW5kLCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5oZXJvVXBJdGVtMC5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uSGVyb1VwVG91Y2hFbmQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGVyb1VwSXRlbTEub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkhlcm9VcFRvdWNoRW5kLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmhlcm9VcEl0ZW0yLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25IZXJvVXBUb3VjaEVuZCwgdGhpcyk7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IucmVzdW1lKCk7XHJcbiAgICB9XHJcbiAgICBvbkVuYWJsZSgpIHtcclxuXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGhlcm9VcFJlZnJlc2goKTp2b2lke1xyXG4gICAgICAgIHZhciBoZXJvSGFzOkFycmF5PEhlcm9fVHlwZT49W107XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5mb3JFYWNoKCh2LCBrKSA9PiB7XHJcbiAgICAgICAgICBpZih2Lmhlcm9fbHZsPDUpe1xyXG4gICAgICAgICAgICBoZXJvSGFzLnB1c2godi5oZXJvX3R5cGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY29uc29sZS5sb2coXCLmi6XmnInnmoTlj6/ljYfnuqfoi7Hpm4RcIitoZXJvSGFzLmxlbmd0aCk7XHJcbiAgICAgICAgdGhpcy5oZXJvVXBJdGVtMC54ID0gLTIyMztcclxuICAgICAgICB0aGlzLmhlcm9VcEl0ZW0xLnggPSAwO1xyXG4gICAgICAgIHRoaXMuaGVyb1VwSXRlbTIueCA9IDIyMztcclxuICAgICAgICB0aGlzLmhlcm9VcEl0ZW0xLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5oZXJvVXBJdGVtMi5hY3RpdmUgPSB0cnVlO1xyXG5cclxuXHJcbiAgICAgICAgaGVyb0hhcy5zb3J0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgLSAwLjVcclxuICAgICAgICB9KTtcclxuICAgICAgIFxyXG4gICAgICAgIGlmKGhlcm9IYXMubGVuZ3RoPT0wKXtcclxuICAgICAgICAgICAgLy/msqHmnInlj6/ljYfnuqfoi7Hpm4TvvIzmmoLkuI3lpITnkIZcclxuICAgICAgICAgIFxyXG4gICAgICAgIH1lbHNlIGlmKGhlcm9IYXMubGVuZ3RoPT0xKXtcclxuICAgICAgICAgICAgdGhpcy5oZXJvVXBJdGVtMC54ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5oZXJvVXBJdGVtMS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5oZXJvVXBJdGVtMi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5oZXJvVXBJdGVtMC5nZXRDb21wb25lbnQoSGVyb1VwSXRlbSkuaW5pdERhdGEoaGVyb0hhc1swXSk7XHJcblxyXG4gICAgICAgIH1lbHNlIGlmKGhlcm9IYXMubGVuZ3RoPT0yKXtcclxuICAgICAgICAgICAgdGhpcy5oZXJvVXBJdGVtMC54ID0gLTExMS41O1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9VcEl0ZW0xLnggPSAxMTEuNTtcclxuICAgICAgICAgICAgdGhpcy5oZXJvVXBJdGVtMi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5oZXJvVXBJdGVtMC5nZXRDb21wb25lbnQoSGVyb1VwSXRlbSkuaW5pdERhdGEoaGVyb0hhc1swXSk7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb1VwSXRlbTEuZ2V0Q29tcG9uZW50KEhlcm9VcEl0ZW0pLmluaXREYXRhKGhlcm9IYXNbMV0pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9VcEl0ZW0wLmdldENvbXBvbmVudChIZXJvVXBJdGVtKS5pbml0RGF0YShoZXJvSGFzWzBdKTtcclxuICAgICAgICAgICAgdGhpcy5oZXJvVXBJdGVtMS5nZXRDb21wb25lbnQoSGVyb1VwSXRlbSkuaW5pdERhdGEoaGVyb0hhc1sxXSk7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb1VwSXRlbTIuZ2V0Q29tcG9uZW50KEhlcm9VcEl0ZW0pLmluaXREYXRhKGhlcm9IYXNbMl0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIHByaXZhdGUgY2hhcmlvdFVwZ3JhZGF0aW9uKCk6IHZvaWQge1xyXG4gICAgICAgIHZhciBkYXRhOiBBcnJheTxudW1iZXI+ID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRjaGFyaW9VcGdyYWRhdGlvbkRhdGEoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuiOt+W+l+eahOWNh+e6p+aVsOaNrlwiICsgZGF0YSk7XHJcblxyXG4gICAgICAgIHRoaXMuY2hhcmlvdEl0ZW0wLmdldENvbXBvbmVudChDaGFyaW9JdGVtKS5pbml0RGF0YShkYXRhWzBdKTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGFyaW90SXRlbTEuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNoYXJpb3RJdGVtMi5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLmNoYXJpb3RJdGVtMC54ID0gLTIyMztcclxuICAgICAgICB0aGlzLmNoYXJpb3RJdGVtMS54ID0gMDtcclxuICAgICAgICB0aGlzLmNoYXJpb3RJdGVtMi54ID0gMjIzO1xyXG4gICAgICAgIGlmIChkYXRhWzFdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFyaW90SXRlbTEuZ2V0Q29tcG9uZW50KENoYXJpb0l0ZW0pLmluaXREYXRhKGRhdGFbMV0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmlvdEl0ZW0xLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJpb3RJdGVtMi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jaGFyaW90SXRlbTAueCA9IDA7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkYXRhWzJdICE9IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmlvdEl0ZW0yLmdldENvbXBvbmVudChDaGFyaW9JdGVtKS5pbml0RGF0YShkYXRhWzJdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJpb3RJdGVtMC54ID0gLTExMS41O1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJpb3RJdGVtMS54ID0gMTExLjU7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmlvdEl0ZW0yLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBjbGlja0J0blRvZ2dsZShldmVuLCBpKSB7Ly/ljZXpgInmjInpkq7nmoTpgInmi6lcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIisrKysrKytcIixldmVuLGkpXHJcbiAgICAgICAgdGhpcy50YWcgPSBpO1xyXG4gICAgICAgIHRoaXMub25Ub2dnbGVDaGFuZ2UoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBSZWZyZXNoaGVyb2l0bWVzdGF0dXMoKTogdm9pZCB7XHJcbiAgICAgICAgLy/lt7Lop6PplIHnmoToi7Hpm4RcclxuICAgICAgICBsZXQgSGVyb0xpc3QgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MaXN0KCkvL+aVsOmHjyAgIOiLsembhGlk57G75Z6LIOiLsembhOetiee6pyDoi7Hpm4Tlk4HotKggIOiLsembhOaYn+aYn+mYtuautVxyXG5cclxuICAgICAgICBsZXQgaGVyb0Jhc2ljZGF0YWFyciA9IFtdLy/mnIDpq5jmiJjlipvmlbDnu4RcclxuICAgICAgICBsZXQgSGVyb0xpc3RhcnIgPSBIZXJvTGlzdC8v5bey6Kej6ZSB55qE6Iux6ZuEXHJcbiAgICAgICAgZm9yIChsZXQgaGVyb2luZGV4ID0gMDsgaGVyb2luZGV4IDwgSGVyb0xpc3QubGVuZ3RoOyBoZXJvaW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXQgaGVybyA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaGVyb19pdGVtKTtcclxuICAgICAgICAgICAgaGVyby5uYW1lID0gXCJcIiArIGhlcm9pbmRleFxyXG4gICAgICAgICAgICBoZXJvLnNldFNjYWxlKDAuNzUsIDAuNzUpXHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5hZGRDaGlsZChoZXJvKTtcclxuXHJcblxyXG4gICAgICAgICAgICBoZXJvLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkhlcm9JdGVtVG91Y2hFbmQsIHRoaXMpO1xyXG4gICAgICAgICAgICAvLyBoZXJvLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdGhpcy5vbkhlcm9JdGVtVG91Y2hDYW5jZWwsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbnRlbnQuZ2V0Q29tcG9uZW50KGNjLkxheW91dCkudXBkYXRlTGF5b3V0KCk7XHJcbiAgICAgICAgLy/liLfmlrDoi7Hpm4RpdG1lXHJcbiAgICAgICAgZm9yIChsZXQgaGVyb0Jhc2ljZGF0YWluZGV4ID0gMDsgaGVyb0Jhc2ljZGF0YWluZGV4IDwgSGVyb0xpc3QubGVuZ3RoOyBoZXJvQmFzaWNkYXRhaW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXQgaGVyb0Jhc2ljZGF0YSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0RhdGEoSGVyb0xpc3RbaGVyb0Jhc2ljZGF0YWluZGV4XS5oZXJvX3R5cGUpLy/oi7Hpm4TnmoTln7rnoYDmlbDmja4gICDkvKDlhaXoi7Hpm4RpZOexu+WeiyAg6Ziy5b6h5YqbICDnlJ/lkb3lgLwgIOWRveS4reWAvCBcclxuICAgICAgICAgICAgaGVyb0Jhc2ljZGF0YWFyci5wdXNoKGhlcm9CYXNpY2RhdGEudG90YWxfYXR0YWNrKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/mjpLliJfoi7Hpm4TmiJjliptcclxuICAgICAgICBsZXQgY3VuXHJcbiAgICAgICAgbGV0IGhlcm9jdW5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgaGVyb0Jhc2ljZGF0YWFyci5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgcGFpeHZpbmRleCA9IDA7IHBhaXh2aW5kZXggPCBoZXJvQmFzaWNkYXRhYXJyLmxlbmd0aCAtIDE7IHBhaXh2aW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGhlcm9CYXNpY2RhdGFhcnJbcGFpeHZpbmRleCArIDFdID4gaGVyb0Jhc2ljZGF0YWFycltwYWl4dmluZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1biA9IGhlcm9CYXNpY2RhdGFhcnJbcGFpeHZpbmRleF1cclxuICAgICAgICAgICAgICAgICAgICBoZXJvQmFzaWNkYXRhYXJyW3BhaXh2aW5kZXhdID0gaGVyb0Jhc2ljZGF0YWFycltwYWl4dmluZGV4ICsgMV1cclxuICAgICAgICAgICAgICAgICAgICBoZXJvQmFzaWNkYXRhYXJyW3BhaXh2aW5kZXggKyAxXSA9IGN1blxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZXJvY3VuID0gSGVyb0xpc3RhcnJbcGFpeHZpbmRleF1cclxuICAgICAgICAgICAgICAgICAgICBIZXJvTGlzdGFycltwYWl4dmluZGV4XSA9IEhlcm9MaXN0YXJyW3BhaXh2aW5kZXggKyAxXVxyXG4gICAgICAgICAgICAgICAgICAgIEhlcm9MaXN0YXJyW3BhaXh2aW5kZXggKyAxXSA9IGhlcm9jdW5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdGVhbUxpc3QgPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl90ZWFtX2xpc3Q7XHJcblxyXG4gICAgICAgIC8v5Yi35paw6Iux6ZuEaXRtZeeKtuaAgVxyXG4gICAgICAgIC8v6KGA6YePXHJcblxyXG4gICAgICAgIGZvciAobGV0IHNodWF4aW5naW5kZXggPSAwOyBzaHVheGluZ2luZGV4IDwgSGVyb0xpc3RhcnIubGVuZ3RoOyBzaHVheGluZ2luZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50LmNoaWxkcmVuW3NodWF4aW5naW5kZXhdLmdldENvbXBvbmVudChIZXJvSXRlbSkuUmVmcmVzaEhlcm9lc0l0ZW0oSGVyb0xpc3RhcnJbc2h1YXhpbmdpbmRleF0uaGVyb190eXBlKVxyXG4gICAgICAgICAgICBmb3IgKGxldCB0ZWFtTGlzdGluZGV4ID0gMDsgdGVhbUxpc3RpbmRleCA8IHRlYW1MaXN0Lmxlbmd0aDsgdGVhbUxpc3RpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGVhbUxpc3RbdGVhbUxpc3RpbmRleF0gPT0gSGVyb0xpc3RhcnJbc2h1YXhpbmdpbmRleF0uaGVyb190eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmNoaWxkcmVuW3NodWF4aW5naW5kZXhdLmdldENoaWxkQnlOYW1lKFwic2hhbmd6aGVuZ1wiKS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuICAgIG9uSGVyb1VwVG91Y2hFbmQoZTogY2MuRXZlbnQuRXZlbnRUb3VjaCk6IHZvaWQge1xyXG4gICAgICAgIGxldCB0b3VjaFRhcmdldCA9IGUuZ2V0Q3VycmVudFRhcmdldCgpO1xyXG4gICAgICAgIGlmICh0b3VjaFRhcmdldC5hY3RpdmUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB2YXIgaGVyb1R5cGU6IG51bWJlciA9IHRvdWNoVGFyZ2V0LmdldENvbXBvbmVudChIZXJvVXBJdGVtKS5nZXREYXRhVHlwZSgpO1xyXG4gICAgICAgICAgICBpZiggR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5nZXQoaGVyb1R5cGUpLmhlcm9fbHZsPDUpe1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5nZXQoaGVyb1R5cGUpLmhlcm9fbHZsKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuaGVyb1VwUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICB0aGlzLmNsaWNrQnRuQ2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbkNoYXJpb0l0ZW1Ub3VjaEVuZChlOiBjYy5FdmVudC5FdmVudFRvdWNoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHRvdWNoVGFyZ2V0ID0gZS5nZXRDdXJyZW50VGFyZ2V0KCk7XHJcbiAgICAgICAgaWYgKHRvdWNoVGFyZ2V0LmFjdGl2ZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGFyaW9UeXBlOiBudW1iZXIgPSB0b3VjaFRhcmdldC5nZXRDb21wb25lbnQoQ2hhcmlvSXRlbSkuZ2V0RGF0YVR5cGUoKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFyaW9VcGdyYWRhdGlvbkRhdGFbY2hhcmlvVHlwZV0rKztcclxuICAgICAgICAgICAgLy9bXCLliqDmlLvlh7tcIixcIuihgOmHj+S4iumZkFwiLFwi5pS76YCfXCIsXCLpmLLlvqFcIixcIuaKgOiDvemXtOmalFwiLFwi5Zue6KGAXCJdO1xyXG4gICAgICAgICAgICBpZiAoY2hhcmlvVHlwZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hNYWluV2FsbERhdGFCeWFkZEhlcm8oKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNoYXJpb1R5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoTWFpbldhbGxEYXRhQnlhZGRIZXJvKClcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhcmlvVHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAvL+aUu+mAn+ebtOaOpeWcqOiLsembhOmHjOmdouWPllxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNoYXJpb1R5cGUgPT0gMykge1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoTWFpbldhbGxEYXRhQnlhZGRIZXJvKClcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhcmlvVHlwZSA9PSA0KSB7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNoYXJpb1R5cGUgPT0gNSkge1xyXG4gICAgICAgICAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmNoYW5nZUhwKFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5nZXRNYXhIcCgpICogMC4yKTtcclxuICAgICAgICAgICAgfSBcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmlvdFVwZ3JhZGF0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tCdG5DbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uSGVyb0l0ZW1Ub3VjaEVuZChlOiBjYy5FdmVudC5FdmVudFRvdWNoKSB7XHJcbiAgICAgICAgbGV0IHRvdWNoVGVhbSA9IGUuZ2V0Q3VycmVudFRhcmdldCgpO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKHRvdWNoVGVhbS5nZXRDaGlsZEJ5TmFtZShcInNoYW5nemhlbmdcIikuYWN0aXZlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIC8v5LiK6Zi16K+l6Iux6ZuEXHJcbiAgICAgICAgICAgIGxldCB0ZWFtTGlzdCA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX3RlYW1fbGlzdDtcclxuICAgICAgICAgICAgaWYgKHRlYW1MaXN0WzFdID09IC0xIHx8IHRlYW1MaXN0WzFdID09IEhlcm9fVHlwZS5OVUxMKSB7XHJcbiAgICAgICAgICAgICAgICB0ZWFtTGlzdFsxXSA9IHRvdWNoVGVhbS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLmhlcm9fdHlwZVxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRIZXJvKHRvdWNoVGVhbS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLmhlcm9fdHlwZSwgMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrQnRuQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRlYW1MaXN0WzNdID09IC0xIHx8IHRlYW1MaXN0WzNdID09IEhlcm9fVHlwZS5OVUxMKSB7XHJcbiAgICAgICAgICAgICAgICB0ZWFtTGlzdFszXSA9IHRvdWNoVGVhbS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLmhlcm9fdHlwZVxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRIZXJvKHRvdWNoVGVhbS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLmhlcm9fdHlwZSwgMyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrQnRuQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRlYW1MaXN0WzBdID09IC0xIHx8IHRlYW1MaXN0WzBdID09IEhlcm9fVHlwZS5OVUxMKSB7XHJcbiAgICAgICAgICAgICAgICB0ZWFtTGlzdFswXSA9IHRvdWNoVGVhbS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLmhlcm9fdHlwZVxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRIZXJvKHRvdWNoVGVhbS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLmhlcm9fdHlwZSwgMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrQnRuQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRlYW1MaXN0WzRdID09IC0xIHx8IHRlYW1MaXN0WzRdID09IEhlcm9fVHlwZS5OVUxMKSB7XHJcbiAgICAgICAgICAgICAgICB0ZWFtTGlzdFs0XSA9IHRvdWNoVGVhbS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLmhlcm9fdHlwZVxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRIZXJvKHRvdWNoVGVhbS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLmhlcm9fdHlwZSwgNCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrQnRuQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDkxKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uVG9nZ2xlQ2hhbmdlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnRhZyA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGlwTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIumAieaLqeS4gOS4quiLsembhOWKoOWFpeS9oOeahOmYn+S8jeOAglwiO1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9fQ2hvc2UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5jaGFyaW90X0Nob3NlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9VcF9DaG9zZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGFnID09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5oZXJvX0Nob3NlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJpb3RfQ2hvc2UuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb1VwX0Nob3NlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMudGlwTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIumAieaLqeS4gOS4quiLsembhOi/m+ihjOWNh+e6p+OAglwiO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50YWcgPT0gMikge1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9fQ2hvc2UuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmlvdF9DaG9zZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9VcF9DaG9zZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy50aXBMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwi6YCJ5oup5LiA5Liq5oqA6IO955So5LqO5Yqg5by65L2g55qE5oiY6L2m44CCXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5DbG9zZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuemu+W8gHJvZ3VlbGlrZVwiKTtcclxuXHJcbiAgICAgICAgY2MuZGlyZWN0b3IucmVzdW1lKCk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSA9IEdhbWVTdGF0ZS5HYW1lX1BsYXlpbmc7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkTGV2ZWwoKTtcclxuICAgICAgICBzdXBlci5vbkNsb3NlKCk7XHJcbiAgICB9XHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==