"use strict";
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