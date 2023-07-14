"use strict";
cc._RF.push(module, '1ed3cP1gSlPOYpg85qy9Aq6', 'HeroDamage');
// Scripts/Game/Ui/HeroDamage.ts

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
var GameManager_1 = require("../../GameManager");
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var MyTool_1 = require("../../Tools/MyTool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HeroDamage = /** @class */ (function (_super) {
    __extends(HeroDamage, _super);
    function HeroDamage() {
        // @property(cc.Label)
        // label: cc.Label = null;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @property
        // text: string = 'hello';
        // LIFE-CYCLE CALLBACKS:
        // onLoad () {}
        _this.prefab_hero_stats = null;
        _this.hero_stats_parent = null;
        _this.hero = [];
        return _this;
        // update (dt) {}
    }
    HeroDamage.prototype.onEnable = function () {
        // console.log("+++++++")
        this.showStats(); //显示英雄
    };
    HeroDamage.prototype.showStats = function () {
        //队伍
        var hm = HeroManager_1.HeroManager.getInstance();
        var teamList = GameManager_1.default.getInstance().cur_team_list;
        var attStats = GameManager_1.default.getInstance().hero_attack_dps;
        var skillStats = GameManager_1.default.getInstance().hero_skill_dps;
        var maxDps = 0;
        //先判断哪个是最高的
        for (var i = 0; i < HeroConfig_1.Hero_Type.Hero_Num; i++) {
            if (attStats[i] + skillStats[i] > maxDps) {
                maxDps = attStats[i] + skillStats[i];
            }
        }
        var heroarrnum = []; //已上陣的英雄
        //找出所有的解锁的英雄
        for (var i = 0; i < 5; i++) {
            var heroType = teamList[i];
            if (heroType > 0) {
                heroarrnum.push(heroType);
            }
        }
        var heightup = 0 - ((this.prefab_hero_stats.data.height / 2) + 10);
        var Data_Bg_1height = this.prefab_hero_stats.data.height + 10 + 5;
        //生成英雄伤害列表
        for (var hero_index = this.hero.length; hero_index < heroarrnum.length; hero_index++) {
            var heroStats = cc.instantiate(this.prefab_hero_stats);
            this.hero_stats_parent.addChild(heroStats);
            heightup = heightup - heroStats.height - 5;
            Data_Bg_1height += (heroStats.height + 5);
            heroStats.setPosition(0, heightup);
            this.hero.push(heroStats);
        }
        if (this.hero_stats_parent.height < 100) {
            this.hero_stats_parent.height = (Data_Bg_1height + 10);
        }
        var cons = []; //技能和伤害加起来的数据
        var shanghaizonhe = 0; //伤害总和
        for (var cons_index = 0; cons_index < this.hero.length; cons_index++) {
            var aNum = attStats[heroarrnum[cons_index]]; //普通攻击
            var sNum = skillStats[heroarrnum[cons_index]]; //技能
            cons[cons_index] = aNum + sNum;
            shanghaizonhe += cons[cons_index];
        }
        //从大到小排列伤害数据
        var cun;
        var herocun;
        for (var index = 0; index < cons.length; index++) {
            for (var paixvindex = 0; paixvindex < cons.length - 1; paixvindex++) {
                if (cons[paixvindex + 1] > cons[paixvindex]) {
                    cun = cons[paixvindex];
                    cons[paixvindex] = cons[paixvindex + 1];
                    cons[paixvindex + 1] = cun;
                    herocun = heroarrnum[paixvindex];
                    heroarrnum[paixvindex] = heroarrnum[paixvindex + 1];
                    heroarrnum[paixvindex + 1] = herocun;
                }
            }
        }
        //刷新英雄的伤害
        for (var shuaxing_index = 0; shuaxing_index < this.hero.length; shuaxing_index++) {
            var myhero = this.hero[shuaxing_index];
            if (shuaxing_index < heroarrnum.length) {
                myhero.active = true;
                var icon = myhero.getChildByName('icon');
                icon.getComponent(cc.Sprite).spriteFrame = hm.getHeroSpriteFrames(heroarrnum[shuaxing_index]);
                var aNum = attStats[heroarrnum[shuaxing_index]]; //普通攻击
                var sNum = skillStats[heroarrnum[shuaxing_index]]; //技能
                var con = aNum + sNum;
                var skillNum = 0;
                if (shanghaizonhe > 0) {
                    skillNum = Number(((con / shanghaizonhe) * 100).toFixed(0));
                }
                myhero.getChildByName("skillNum").getComponent(cc.Label).string = "" + Number(MyTool_1.default.numberFormat(skillNum, 0)) + "%";
                myhero.getChildByName("attNum").getComponent(cc.Label).string = "" + Number(MyTool_1.default.numberFormat(con, 0));
                var att = skillNum / 100;
                myhero.getChildByName("att").getComponent(cc.ProgressBar).progress = att;
                myhero.getChildByName("skill").getComponent(cc.ProgressBar).progress = att;
            }
            else {
                myhero.active = false;
            }
        }
    };
    __decorate([
        property(cc.Prefab)
    ], HeroDamage.prototype, "prefab_hero_stats", void 0);
    __decorate([
        property(cc.Node)
    ], HeroDamage.prototype, "hero_stats_parent", void 0);
    HeroDamage = __decorate([
        ccclass
    ], HeroDamage);
    return HeroDamage;
}(cc.Component));
exports.default = HeroDamage;

cc._RF.pop();