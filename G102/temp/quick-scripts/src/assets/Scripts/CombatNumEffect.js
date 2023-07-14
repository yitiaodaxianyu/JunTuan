"use strict";
cc._RF.push(module, 'dd15a3Kdg9HOL27zbG0qD1L', 'CombatNumEffect');
// Scripts/CombatNumEffect.ts

"use strict";
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
var LanguageManager_1 = require("./multiLanguage/LanguageManager");
var MyTool_1 = require("./Tools/MyTool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CombatNumEffect = /** @class */ (function (_super) {
    __extends(CombatNumEffect, _super);
    function CombatNumEffect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CombatNumEffect.prototype.startAnimation = function (oldCombatNum, newCombatNum, oldHeroData, newHeroData) {
        var _this = this;
        // startAnimation(oldCombatNum:number,newCombatNum:number,oldHeroData:HeroData,newHeroData:HeroData,callback:Function){
        var attribute = this.node.getChildByName("attribute");
        this.unscheduleAllCallbacks();
        cc.Tween.stopAllByTarget(attribute);
        cc.Tween.stopAllByTarget(this.node);
        attribute.setPosition(0, -100, 0);
        cc.tween(this.node).to(0.2, { opacity: 255 }).to(0.8, { opacity: 255 }).to(0.3, { opacity: 0 }).start();
        var combat = this.node.getChildByName("combat");
        combat.children[1].getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(oldCombatNum);
        var s = '';
        // s += LanguageManager.getInstance().getStrByTextId(110014) + "+" + (newHeroData.Attack - oldHeroData.Attack) + '\n';
        // s += LanguageManager.getInstance().getStrByTextId(110015) + "+" + (newHeroData.Defense - oldHeroData.Defense) + '\n';
        // s += LanguageManager.getInstance().getStrByTextId(110016) + "+" + (newHeroData.Health - oldHeroData.Health) + '\n';
        // s += LanguageManager.getInstance().getStrByTextId(110017) + "+" + (newHeroData.Hit - oldHeroData.Hit) + '\n';
        // s += LanguageManager.getInstance().getStrByTextId(110018) + "+" + (newHeroData.Miss - oldHeroData.Miss) + '\n';
        // s += LanguageManager.getInstance().getStrByTextId(110019) + "+" + (newHeroData.Critical - oldHeroData.Critical) + '\n';
        // s += LanguageManager.getInstance().getStrByTextId(110021) + "+" + (newHeroData.AntiCritical - oldHeroData.AntiCritical) + '\n';
        // s += LanguageManager.getInstance().getStrByTextId(110020) + "+" + (newHeroData.ExtraCritical - oldHeroData.ExtraCritical) + '\n';
        // s += LanguageManager.getInstance().getStrByTextId(110022) + "+" + (newHeroData.AntiExtraCritical - oldHeroData.AntiExtraCritical) + '\n';
        s += this.getColor(110014, newHeroData.total_attack, oldHeroData.total_attack);
        s += this.getColor(110015, newHeroData.total_defense, oldHeroData.total_defense);
        s += this.getColor(110016, newHeroData.total_hp, oldHeroData.total_hp);
        s += this.getColor(110017, newHeroData.Hit, oldHeroData.Hit);
        s += this.getColor(110018, newHeroData.Miss, oldHeroData.Miss);
        s += this.getColor(110019, newHeroData.Critical, oldHeroData.Critical);
        s += this.getColor(110021, newHeroData.AntiCritical, oldHeroData.AntiCritical);
        if (newHeroData.ExtraCritical * 100 != oldHeroData.ExtraCritical * 100)
            s += this.getPercentColor(110020, newHeroData.ExtraCritical, oldHeroData.ExtraCritical);
        if (newHeroData.AntiExtraCritical * 100 != oldHeroData.AntiExtraCritical * 100)
            s += this.getPercentColor(110022, newHeroData.AntiExtraCritical, oldHeroData.AntiExtraCritical);
        s = "<b><color=#69FF5E><outline color=#010900 width=2><size = 26>" + s + "</b></outline></color></size>";
        attribute.getComponent(cc.RichText).string = s;
        cc.tween(attribute).by(0.2, { position: cc.v3(0, 130, 0) }).start();
        var temp = 0;
        var offset = Math.floor(newCombatNum - oldCombatNum);
        combat.children[2].getComponent(cc.Label).string = "";
        if (offset < 0) {
            combat.children[2].color = cc.color(255, 78, 78);
            combat.children[2].getComponent(cc.LabelOutline).color = cc.color(57, 0, 0);
        }
        else {
            combat.children[2].color = cc.color(109, 255, 98);
            combat.children[2].getComponent(cc.LabelOutline).color = cc.color(5, 77, 0);
        }
        var t = 0;
        var num = 17;
        var incremental = Math.floor(offset / num);
        this.schedule(function () {
            temp += incremental;
            if (Math.abs(offset) - Math.abs(temp) < Math.abs(incremental)) {
                temp = offset;
            }
            if (temp > 0) {
                combat.children[2].getComponent(cc.Label).string = "+" + MyTool_1.default.mynum_con1(temp + "");
            }
            else {
                combat.children[2].getComponent(cc.Label).string = MyTool_1.default.mynum_con1(temp + "");
            }
            t++;
            if (t == num) {
                _this.scheduleOnce(function () {
                    _this.node.active = false;
                    //         callback();
                }, 0.9);
            }
        }, 0.03, num, 0);
    };
    CombatNumEffect.prototype.getColor = function (tid, newNum, oldNum) {
        var s = '';
        var result = Math.floor(newNum - oldNum);
        if (result != 0) {
            if (result > 0) {
                s = LanguageManager_1.default.getInstance().getStrByTextId(tid) + "+" + result + '\n';
            }
            else {
                s = "<color = #ff4e4e> <outline color = #390000 width=2>" + LanguageManager_1.default.getInstance().getStrByTextId(tid) + result + "</outline></color>" + '\n';
            }
        }
        return s;
    };
    CombatNumEffect.prototype.getPercentColor = function (tid, newNum, oldNum) {
        var s = '';
        var result = Math.floor(Math.floor(newNum * 100) - Math.floor(oldNum * 100));
        if (result != 0) {
            if (result > 0) {
                s = LanguageManager_1.default.getInstance().getStrByTextId(tid) + "+" + result + "%" + '\n';
            }
            else {
                s = "<color = #ff4e4e> <outline color = #390000 width=2>" + LanguageManager_1.default.getInstance().getStrByTextId(tid) + result + "%" + "</outline></color>" + '\n';
            }
        }
        return s;
    };
    CombatNumEffect = __decorate([
        ccclass
    ], CombatNumEffect);
    return CombatNumEffect;
}(cc.Component));
exports.default = CombatNumEffect;

cc._RF.pop();