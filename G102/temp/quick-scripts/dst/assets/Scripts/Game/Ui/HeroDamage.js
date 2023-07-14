
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Game/Ui/HeroDamage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcVWlcXEhlcm9EYW1hZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsaURBQTRDO0FBQzVDLDJEQUEwRDtBQUMxRCx5REFBdUQ7QUFDdkQsNkNBQXdDO0FBR2xDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXdDLDhCQUFZO0lBQXBEO1FBRUksc0JBQXNCO1FBQ3RCLDBCQUEwQjtRQUg5QixxRUE2R0M7UUF4R0csWUFBWTtRQUNaLDBCQUEwQjtRQUUxQix3QkFBd0I7UUFFeEIsZUFBZTtRQUVmLHVCQUFpQixHQUFXLElBQUksQ0FBQztRQUdqQyx1QkFBaUIsR0FBUyxJQUFJLENBQUM7UUFFL0IsVUFBSSxHQUFXLEVBQUUsQ0FBQTs7UUEyRmpCLGlCQUFpQjtJQUNyQixDQUFDO0lBM0ZHLDZCQUFRLEdBQVI7UUFDSSx5QkFBeUI7UUFDekIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUEsTUFBTTtJQUMzQixDQUFDO0lBQ0QsOEJBQVMsR0FBVDtRQUNJLElBQUk7UUFDSixJQUFJLEVBQUUsR0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2pDLElBQUksUUFBUSxHQUFDLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDO1FBQ3JELElBQUksUUFBUSxHQUFDLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsZUFBZSxDQUFDO1FBQ3ZELElBQUksVUFBVSxHQUFDLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDO1FBQ3hELElBQUksTUFBTSxHQUFDLENBQUMsQ0FBQztRQUNi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LENBQUMsQ0FBQyxRQUFRLEdBQUMsR0FBRyxDQUFBO2FBQzNFO2lCQUFJO2dCQUNELE1BQU0sQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBO2FBQ3RCO1NBQ0o7SUFDTCxDQUFDO0lBL0ZEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7eURBQ2E7SUFHakM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt5REFDYTtJQWZkLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0E2RzlCO0lBQUQsaUJBQUM7Q0E3R0QsQUE2R0MsQ0E3R3VDLEVBQUUsQ0FBQyxTQUFTLEdBNkduRDtrQkE3R29CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0hlcm8vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvX1R5cGUgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IE15VG9vbCBmcm9tIFwiLi4vLi4vVG9vbHMvTXlUb29sXCI7XHJcbmltcG9ydCBTdGF0c1VpIGZyb20gXCIuL1N0YXRzVWlcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVyb0RhbWFnZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgLy8gQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgLy8gbGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICAvLyBAcHJvcGVydHlcclxuICAgIC8vIHRleHQ6IHN0cmluZyA9ICdoZWxsbyc7XHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJlZmFiX2hlcm9fc3RhdHM6Y2MuUHJlZmFiPW51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBoZXJvX3N0YXRzX3BhcmVudDpjYy5Ob2RlPW51bGw7XHJcblxyXG4gICAgaGVybzpjYy5Ob2RlW109W11cclxuICAgIG9uRW5hYmxlKCl7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCIrKysrKysrXCIpXHJcbiAgICAgICAgdGhpcy5zaG93U3RhdHMoKTsvL+aYvuekuuiLsembhFxyXG4gICAgfVxyXG4gICAgc2hvd1N0YXRzKCl7XHJcbiAgICAgICAgLy/pmJ/kvI1cclxuICAgICAgICBsZXQgaG09SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBsZXQgdGVhbUxpc3Q9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfdGVhbV9saXN0O1xyXG4gICAgICAgIGxldCBhdHRTdGF0cz1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmhlcm9fYXR0YWNrX2RwcztcclxuICAgICAgICBsZXQgc2tpbGxTdGF0cz1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmhlcm9fc2tpbGxfZHBzO1xyXG4gICAgICAgIGxldCBtYXhEcHM9MDtcclxuICAgICAgICAvL+WFiOWIpOaWreWTquS4quaYr+acgOmrmOeahFxyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPEhlcm9fVHlwZS5IZXJvX051bTsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoYXR0U3RhdHNbaV0rc2tpbGxTdGF0c1tpXT5tYXhEcHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1heERwcz1hdHRTdGF0c1tpXStza2lsbFN0YXRzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBoZXJvYXJybnVtPVtdLy/lt7LkuIrpmaPnmoToi7Hpm4RcclxuICAgICAgICAvL+aJvuWHuuaJgOacieeahOino+mUgeeahOiLsembhFxyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPDU7IGkrKylcclxuICAgICAgICB7IFxyXG4gICAgICAgICAgICBsZXQgaGVyb1R5cGU9dGVhbUxpc3RbaV07XHJcbiAgICAgICAgICAgIGlmKGhlcm9UeXBlPjApe1xyXG4gICAgICAgICAgICAgICAgaGVyb2Fycm51bS5wdXNoKGhlcm9UeXBlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBoZWlnaHR1cD0wLSgodGhpcy5wcmVmYWJfaGVyb19zdGF0cy5kYXRhLmhlaWdodC8yKSsxMClcclxuICAgICAgICBsZXQgRGF0YV9CZ18xaGVpZ2h0PXRoaXMucHJlZmFiX2hlcm9fc3RhdHMuZGF0YS5oZWlnaHQrMTArNVxyXG4gICAgICAgIC8v55Sf5oiQ6Iux6ZuE5Lyk5a6z5YiX6KGoXHJcbiAgICAgICAgZm9yIChsZXQgaGVyb19pbmRleCA9IHRoaXMuaGVyby5sZW5ndGg7IGhlcm9faW5kZXggPCBoZXJvYXJybnVtLmxlbmd0aDsgaGVyb19pbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaGVyb1N0YXRzPWNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX2hlcm9fc3RhdHMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX3N0YXRzX3BhcmVudC5hZGRDaGlsZChoZXJvU3RhdHMpO1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0dXA9IGhlaWdodHVwLWhlcm9TdGF0cy5oZWlnaHQtNVxyXG4gICAgICAgICAgICAgICAgRGF0YV9CZ18xaGVpZ2h0Kz0oaGVyb1N0YXRzLmhlaWdodCs1KVxyXG4gICAgICAgICAgICAgICAgaGVyb1N0YXRzLnNldFBvc2l0aW9uKDAsaGVpZ2h0dXApXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm8ucHVzaChoZXJvU3RhdHMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuaGVyb19zdGF0c19wYXJlbnQuaGVpZ2h0PDEwMCl7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb19zdGF0c19wYXJlbnQuaGVpZ2h0PShEYXRhX0JnXzFoZWlnaHQrMTApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjb25zPVtdLy/mioDog73lkozkvKTlrrPliqDotbfmnaXnmoTmlbDmja5cclxuICAgICAgICBsZXQgc2hhbmdoYWl6b25oZT0wLy/kvKTlrrPmgLvlkoxcclxuICAgICAgICBmb3IgKGxldCBjb25zX2luZGV4ID0gMDsgY29uc19pbmRleCA8IHRoaXMuaGVyby5sZW5ndGg7IGNvbnNfaW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXQgYU51bT1hdHRTdGF0c1toZXJvYXJybnVtW2NvbnNfaW5kZXhdXTsvL+aZrumAmuaUu+WHu1xyXG4gICAgICAgICAgICBsZXQgc051bT1za2lsbFN0YXRzW2hlcm9hcnJudW1bY29uc19pbmRleF1dOy8v5oqA6IO9XHJcbiAgICAgICAgICAgIGNvbnNbY29uc19pbmRleF09YU51bStzTnVtXHJcbiAgICAgICAgICAgIHNoYW5naGFpem9uaGUrPWNvbnNbY29uc19pbmRleF1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/ku47lpKfliLDlsI/mjpLliJfkvKTlrrPmlbDmja5cclxuICAgICAgICBsZXQgY3VuXHJcbiAgICAgICAgbGV0IGhlcm9jdW5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgY29ucy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgcGFpeHZpbmRleCA9IDA7IHBhaXh2aW5kZXggPCBjb25zLmxlbmd0aC0xOyBwYWl4dmluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGlmKGNvbnNbcGFpeHZpbmRleCsxXT5jb25zW3BhaXh2aW5kZXhdKXtcclxuICAgICAgICAgICAgICAgICAgICBjdW49Y29uc1twYWl4dmluZGV4XVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNbcGFpeHZpbmRleF09Y29uc1twYWl4dmluZGV4KzFdXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc1twYWl4dmluZGV4KzFdPWN1blxyXG5cclxuICAgICAgICAgICAgICAgICAgICBoZXJvY3VuPWhlcm9hcnJudW1bcGFpeHZpbmRleF1cclxuICAgICAgICAgICAgICAgICAgICBoZXJvYXJybnVtW3BhaXh2aW5kZXhdPWhlcm9hcnJudW1bcGFpeHZpbmRleCsxXVxyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9hcnJudW1bcGFpeHZpbmRleCsxXT1oZXJvY3VuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/liLfmlrDoi7Hpm4TnmoTkvKTlrrNcclxuICAgICAgICBmb3IgKGxldCBzaHVheGluZ19pbmRleCA9IDA7IHNodWF4aW5nX2luZGV4IDwgdGhpcy5oZXJvLmxlbmd0aDsgc2h1YXhpbmdfaW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXQgbXloZXJvPXRoaXMuaGVyb1tzaHVheGluZ19pbmRleF1cclxuICAgICAgICAgICAgaWYoc2h1YXhpbmdfaW5kZXggPCBoZXJvYXJybnVtLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICBteWhlcm8uYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgICAgIGxldCBpY29uPW15aGVyby5nZXRDaGlsZEJ5TmFtZSgnaWNvbicpO1xyXG4gICAgICAgICAgICAgICAgaWNvbi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT1obS5nZXRIZXJvU3ByaXRlRnJhbWVzKGhlcm9hcnJudW1bc2h1YXhpbmdfaW5kZXhdKTtcclxuICAgICAgICAgICAgICAgIGxldCBhTnVtPWF0dFN0YXRzW2hlcm9hcnJudW1bc2h1YXhpbmdfaW5kZXhdXTsvL+aZrumAmuaUu+WHu1xyXG4gICAgICAgICAgICAgICAgbGV0IHNOdW09c2tpbGxTdGF0c1toZXJvYXJybnVtW3NodWF4aW5nX2luZGV4XV07Ly/mioDog71cclxuICAgICAgICAgICAgICAgIGxldCBjb249YU51bStzTnVtXHJcbiAgICAgICAgICAgICAgICBsZXQgc2tpbGxOdW09MFxyXG4gICAgICAgICAgICAgICAgaWYoc2hhbmdoYWl6b25oZT4wKXtcclxuICAgICAgICAgICAgICAgICAgICBza2lsbE51bT1OdW1iZXIoKChjb24vc2hhbmdoYWl6b25oZSkqMTAwKS50b0ZpeGVkKDApKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbXloZXJvLmdldENoaWxkQnlOYW1lKFwic2tpbGxOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJcIitOdW1iZXIoTXlUb29sLm51bWJlckZvcm1hdChza2lsbE51bSwwKSkrXCIlXCJcclxuICAgICAgICAgICAgICAgIG15aGVyby5nZXRDaGlsZEJ5TmFtZShcImF0dE51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIlwiK051bWJlcihNeVRvb2wubnVtYmVyRm9ybWF0KGNvbiwwKSlcclxuICAgICAgICAgICAgICAgIGxldCBhdHQ9c2tpbGxOdW0vMTAwXHJcbiAgICAgICAgICAgICAgICBteWhlcm8uZ2V0Q2hpbGRCeU5hbWUoXCJhdHRcIikuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcz1hdHRcclxuICAgICAgICAgICAgICAgIG15aGVyby5nZXRDaGlsZEJ5TmFtZShcInNraWxsXCIpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikucHJvZ3Jlc3M9YXR0XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbXloZXJvLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxufVxyXG4iXX0=