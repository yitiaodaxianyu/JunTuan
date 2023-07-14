
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/CombatNumEffect.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQ29tYmF0TnVtRWZmZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG1FQUE4RDtBQUM5RCx5Q0FBb0M7QUFFOUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBNkMsbUNBQVk7SUFBekQ7O0lBK0ZBLENBQUM7SUE3Rkcsd0NBQWMsR0FBZCxVQUFlLFlBQW1CLEVBQUMsWUFBbUIsRUFBQyxXQUFvQixFQUFDLFdBQW9CO1FBQWhHLGlCQWlFQztRQWhFRyx1SEFBdUg7UUFDdkgsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDckQsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDOUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEMsRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzVGLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsZ0JBQU0sQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEYsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ1gsc0hBQXNIO1FBQ3RILHdIQUF3SDtRQUN4SCxzSEFBc0g7UUFDdEgsZ0hBQWdIO1FBQ2hILGtIQUFrSDtRQUNsSCwwSEFBMEg7UUFDMUgsa0lBQWtJO1FBQ2xJLG9JQUFvSTtRQUNwSSw0SUFBNEk7UUFDNUksQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzdFLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBQyxXQUFXLENBQUMsYUFBYSxFQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMvRSxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUMsV0FBVyxDQUFDLFFBQVEsRUFBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckUsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNELENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBQyxXQUFXLENBQUMsSUFBSSxFQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3RCxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUMsV0FBVyxDQUFDLFFBQVEsRUFBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckUsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzdFLElBQUcsV0FBVyxDQUFDLGFBQWEsR0FBRyxHQUFHLElBQUksV0FBVyxDQUFDLGFBQWEsR0FBRyxHQUFHO1lBQ2pFLENBQUMsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBQyxXQUFXLENBQUMsYUFBYSxFQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMxRixJQUFHLFdBQVcsQ0FBQyxpQkFBaUIsR0FBRyxHQUFHLElBQUksV0FBVyxDQUFDLGlCQUFpQixHQUFHLEdBQUc7WUFDekUsQ0FBQyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNsRyxDQUFDLEdBQUcsOERBQThELEdBQUcsQ0FBQyxHQUFHLCtCQUErQixDQUFDO1FBQ3pHLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDL0MsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDOUQsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDLENBQUM7UUFDckQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDdEQsSUFBRyxNQUFNLEdBQUcsQ0FBQyxFQUFDO1lBQ1YsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQy9DLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzdFO2FBQUk7WUFDRCxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDL0U7UUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBQyxHQUFHLENBQUMsQ0FBQTtRQUN4QyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ1YsSUFBSSxJQUFJLFdBQVcsQ0FBQztZQUNwQixJQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFDO2dCQUN6RCxJQUFJLEdBQUcsTUFBTSxDQUFDO2FBQ2pCO1lBQ0QsSUFBRyxJQUFJLEdBQUcsQ0FBQyxFQUFDO2dCQUNSLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLGdCQUFNLENBQUMsVUFBVSxDQUFDLElBQUksR0FBQyxFQUFFLENBQUMsQ0FBQzthQUN2RjtpQkFBSTtnQkFDRCxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLGdCQUFNLENBQUMsVUFBVSxDQUFDLElBQUksR0FBQyxFQUFFLENBQUMsQ0FBQzthQUNqRjtZQUNELENBQUMsRUFBRSxDQUFDO1lBQ0osSUFBRyxDQUFDLElBQUksR0FBRyxFQUFDO2dCQUNSLEtBQUksQ0FBQyxZQUFZLENBQUM7b0JBQ2QsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO29CQUNqQyxzQkFBc0I7Z0JBQ2xCLENBQUMsRUFBQyxHQUFHLENBQUMsQ0FBQzthQUNWO1FBQ0wsQ0FBQyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUVELGtDQUFRLEdBQVIsVUFBUyxHQUFVLEVBQUMsTUFBYSxFQUFDLE1BQWE7UUFDM0MsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ1gsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUM7UUFDekMsSUFBRyxNQUFNLElBQUksQ0FBQyxFQUFDO1lBQ1gsSUFBRyxNQUFNLEdBQUcsQ0FBQyxFQUFDO2dCQUNWLENBQUMsR0FBRyx5QkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQzthQUMvRTtpQkFBSTtnQkFDRCxDQUFDLEdBQUcscURBQXFELEdBQUcseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxHQUFHLG9CQUFvQixHQUFHLElBQUksQ0FBQzthQUN4SjtTQUNKO1FBQ0QsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBRUQseUNBQWUsR0FBZixVQUFnQixHQUFVLEVBQUMsTUFBYSxFQUFDLE1BQWE7UUFDbEQsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ1gsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzdFLElBQUcsTUFBTSxJQUFJLENBQUMsRUFBQztZQUNYLElBQUcsTUFBTSxHQUFHLENBQUMsRUFBQztnQkFDVixDQUFDLEdBQUcseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO2FBQ3JGO2lCQUFJO2dCQUNELENBQUMsR0FBRyxxREFBcUQsR0FBRyx5QkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLEdBQUcsR0FBRyxHQUFHLG9CQUFvQixHQUFHLElBQUksQ0FBQzthQUM5SjtTQUNKO1FBQ0QsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBN0ZnQixlQUFlO1FBRG5DLE9BQU87T0FDYSxlQUFlLENBK0ZuQztJQUFELHNCQUFDO0NBL0ZELEFBK0ZDLENBL0Y0QyxFQUFFLENBQUMsU0FBUyxHQStGeEQ7a0JBL0ZvQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGVyb0RhdGEgfSBmcm9tIFwiLi9IZXJvL0RhdGEvSGVyb0RhdGFcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuL1Rvb2xzL015VG9vbFwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21iYXROdW1FZmZlY3QgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHN0YXJ0QW5pbWF0aW9uKG9sZENvbWJhdE51bTpudW1iZXIsbmV3Q29tYmF0TnVtOm51bWJlcixvbGRIZXJvRGF0YTpIZXJvRGF0YSxuZXdIZXJvRGF0YTpIZXJvRGF0YSl7XHJcbiAgICAgICAgLy8gc3RhcnRBbmltYXRpb24ob2xkQ29tYmF0TnVtOm51bWJlcixuZXdDb21iYXROdW06bnVtYmVyLG9sZEhlcm9EYXRhOkhlcm9EYXRhLG5ld0hlcm9EYXRhOkhlcm9EYXRhLGNhbGxiYWNrOkZ1bmN0aW9uKXtcclxuICAgICAgICBsZXQgYXR0cmlidXRlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYXR0cmlidXRlXCIpXHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgY2MuVHdlZW4uc3RvcEFsbEJ5VGFyZ2V0KGF0dHJpYnV0ZSk7XHJcbiAgICAgICAgY2MuVHdlZW4uc3RvcEFsbEJ5VGFyZ2V0KHRoaXMubm9kZSk7XHJcbiAgICAgICAgYXR0cmlidXRlLnNldFBvc2l0aW9uKDAsLTEwMCwwKTtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLnRvKDAuMix7b3BhY2l0eToyNTV9KS50bygwLjgse29wYWNpdHk6MjU1fSkudG8oMC4zLHtvcGFjaXR5OjB9KS5zdGFydCgpO1xyXG4gICAgICAgIGxldCBjb21iYXQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjb21iYXRcIik7XHJcbiAgICAgICAgY29tYmF0LmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLmdldENvaW5EYW53ZWkob2xkQ29tYmF0TnVtKTtcclxuICAgICAgICBsZXQgcyA9ICcnO1xyXG4gICAgICAgIC8vIHMgKz0gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTEwMDE0KSArIFwiK1wiICsgKG5ld0hlcm9EYXRhLkF0dGFjayAtIG9sZEhlcm9EYXRhLkF0dGFjaykgKyAnXFxuJztcclxuICAgICAgICAvLyBzICs9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDExMDAxNSkgKyBcIitcIiArIChuZXdIZXJvRGF0YS5EZWZlbnNlIC0gb2xkSGVyb0RhdGEuRGVmZW5zZSkgKyAnXFxuJztcclxuICAgICAgICAvLyBzICs9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDExMDAxNikgKyBcIitcIiArIChuZXdIZXJvRGF0YS5IZWFsdGggLSBvbGRIZXJvRGF0YS5IZWFsdGgpICsgJ1xcbic7XHJcbiAgICAgICAgLy8gcyArPSBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMTAwMTcpICsgXCIrXCIgKyAobmV3SGVyb0RhdGEuSGl0IC0gb2xkSGVyb0RhdGEuSGl0KSArICdcXG4nO1xyXG4gICAgICAgIC8vIHMgKz0gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTEwMDE4KSArIFwiK1wiICsgKG5ld0hlcm9EYXRhLk1pc3MgLSBvbGRIZXJvRGF0YS5NaXNzKSArICdcXG4nO1xyXG4gICAgICAgIC8vIHMgKz0gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTEwMDE5KSArIFwiK1wiICsgKG5ld0hlcm9EYXRhLkNyaXRpY2FsIC0gb2xkSGVyb0RhdGEuQ3JpdGljYWwpICsgJ1xcbic7XHJcbiAgICAgICAgLy8gcyArPSBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMTAwMjEpICsgXCIrXCIgKyAobmV3SGVyb0RhdGEuQW50aUNyaXRpY2FsIC0gb2xkSGVyb0RhdGEuQW50aUNyaXRpY2FsKSArICdcXG4nO1xyXG4gICAgICAgIC8vIHMgKz0gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTEwMDIwKSArIFwiK1wiICsgKG5ld0hlcm9EYXRhLkV4dHJhQ3JpdGljYWwgLSBvbGRIZXJvRGF0YS5FeHRyYUNyaXRpY2FsKSArICdcXG4nO1xyXG4gICAgICAgIC8vIHMgKz0gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTEwMDIyKSArIFwiK1wiICsgKG5ld0hlcm9EYXRhLkFudGlFeHRyYUNyaXRpY2FsIC0gb2xkSGVyb0RhdGEuQW50aUV4dHJhQ3JpdGljYWwpICsgJ1xcbic7XHJcbiAgICAgICAgcyArPSB0aGlzLmdldENvbG9yKDExMDAxNCxuZXdIZXJvRGF0YS50b3RhbF9hdHRhY2ssb2xkSGVyb0RhdGEudG90YWxfYXR0YWNrKTtcclxuICAgICAgICBzICs9IHRoaXMuZ2V0Q29sb3IoMTEwMDE1LG5ld0hlcm9EYXRhLnRvdGFsX2RlZmVuc2Usb2xkSGVyb0RhdGEudG90YWxfZGVmZW5zZSk7XHJcbiAgICAgICAgcyArPSB0aGlzLmdldENvbG9yKDExMDAxNixuZXdIZXJvRGF0YS50b3RhbF9ocCxvbGRIZXJvRGF0YS50b3RhbF9ocCk7XHJcbiAgICAgICAgcyArPSB0aGlzLmdldENvbG9yKDExMDAxNyxuZXdIZXJvRGF0YS5IaXQsb2xkSGVyb0RhdGEuSGl0KTtcclxuICAgICAgICBzICs9IHRoaXMuZ2V0Q29sb3IoMTEwMDE4LG5ld0hlcm9EYXRhLk1pc3Msb2xkSGVyb0RhdGEuTWlzcyk7XHJcbiAgICAgICAgcyArPSB0aGlzLmdldENvbG9yKDExMDAxOSxuZXdIZXJvRGF0YS5Dcml0aWNhbCxvbGRIZXJvRGF0YS5Dcml0aWNhbCk7XHJcbiAgICAgICAgcyArPSB0aGlzLmdldENvbG9yKDExMDAyMSxuZXdIZXJvRGF0YS5BbnRpQ3JpdGljYWwsb2xkSGVyb0RhdGEuQW50aUNyaXRpY2FsKTtcclxuICAgICAgICBpZihuZXdIZXJvRGF0YS5FeHRyYUNyaXRpY2FsICogMTAwICE9IG9sZEhlcm9EYXRhLkV4dHJhQ3JpdGljYWwgKiAxMDApXHJcbiAgICAgICAgICAgIHMgKz0gdGhpcy5nZXRQZXJjZW50Q29sb3IoMTEwMDIwLG5ld0hlcm9EYXRhLkV4dHJhQ3JpdGljYWwsb2xkSGVyb0RhdGEuRXh0cmFDcml0aWNhbCk7XHJcbiAgICAgICAgaWYobmV3SGVyb0RhdGEuQW50aUV4dHJhQ3JpdGljYWwgKiAxMDAgIT0gb2xkSGVyb0RhdGEuQW50aUV4dHJhQ3JpdGljYWwgKiAxMDApXHJcbiAgICAgICAgICAgIHMgKz0gdGhpcy5nZXRQZXJjZW50Q29sb3IoMTEwMDIyLG5ld0hlcm9EYXRhLkFudGlFeHRyYUNyaXRpY2FsLG9sZEhlcm9EYXRhLkFudGlFeHRyYUNyaXRpY2FsKTtcclxuICAgICAgICBzID0gXCI8Yj48Y29sb3I9IzY5RkY1RT48b3V0bGluZSBjb2xvcj0jMDEwOTAwIHdpZHRoPTI+PHNpemUgPSAyNj5cIiArIHMgKyBcIjwvYj48L291dGxpbmU+PC9jb2xvcj48L3NpemU+XCI7XHJcbiAgICAgICAgYXR0cmlidXRlLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gcztcclxuICAgICAgICBjYy50d2VlbihhdHRyaWJ1dGUpLmJ5KDAuMix7cG9zaXRpb246Y2MudjMoMCwxMzAsMCl9KS5zdGFydCgpO1xyXG4gICAgICAgIGxldCB0ZW1wID0gMDtcclxuICAgICAgICBsZXQgb2Zmc2V0ID0gTWF0aC5mbG9vcihuZXdDb21iYXROdW0gLSBvbGRDb21iYXROdW0pO1xyXG4gICAgICAgIGNvbWJhdC5jaGlsZHJlblsyXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgaWYob2Zmc2V0IDwgMCl7XHJcbiAgICAgICAgICAgIGNvbWJhdC5jaGlsZHJlblsyXS5jb2xvciA9IGNjLmNvbG9yKDI1NSw3OCw3OCk7XHJcbiAgICAgICAgICAgIGNvbWJhdC5jaGlsZHJlblsyXS5nZXRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKS5jb2xvciA9IGNjLmNvbG9yKDU3LDAsMCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGNvbWJhdC5jaGlsZHJlblsyXS5jb2xvciA9IGNjLmNvbG9yKDEwOSwyNTUsOTgpO1xyXG4gICAgICAgICAgICBjb21iYXQuY2hpbGRyZW5bMl0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSkuY29sb3IgPSBjYy5jb2xvcig1LCA3NywgMCk7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdCA9IDA7XHJcbiAgICAgICAgbGV0IG51bSA9IDE3O1xyXG4gICAgICAgIGxldCBpbmNyZW1lbnRhbCA9IE1hdGguZmxvb3Iob2Zmc2V0L251bSlcclxuICAgICAgICB0aGlzLnNjaGVkdWxlKCgpPT57XHJcbiAgICAgICAgICAgIHRlbXAgKz0gaW5jcmVtZW50YWw7XHJcbiAgICAgICAgICAgIGlmKE1hdGguYWJzKG9mZnNldCkgLSBNYXRoLmFicyh0ZW1wKSA8IE1hdGguYWJzKGluY3JlbWVudGFsKSl7XHJcbiAgICAgICAgICAgICAgICB0ZW1wID0gb2Zmc2V0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRlbXAgPiAwKXtcclxuICAgICAgICAgICAgICAgIGNvbWJhdC5jaGlsZHJlblsyXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiK1wiICsgTXlUb29sLm15bnVtX2NvbjEodGVtcCtcIlwiKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBjb21iYXQuY2hpbGRyZW5bMl0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wubXludW1fY29uMSh0ZW1wK1wiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHQrKztcclxuICAgICAgICAgICAgaWYodCA9PSBudW0pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgIH0sMC45KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sMC4wMyxudW0sMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29sb3IodGlkOm51bWJlcixuZXdOdW06bnVtYmVyLG9sZE51bTpudW1iZXIpOnN0cmluZ3tcclxuICAgICAgICBsZXQgcyA9ICcnO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBNYXRoLmZsb29yKG5ld051bSAtIG9sZE51bSk7XHJcbiAgICAgICAgaWYocmVzdWx0ICE9IDApe1xyXG4gICAgICAgICAgICBpZihyZXN1bHQgPiAwKXtcclxuICAgICAgICAgICAgICAgIHMgPSBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCh0aWQpICsgXCIrXCIgKyByZXN1bHQgKyAnXFxuJztcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBzID0gXCI8Y29sb3IgPSAjZmY0ZTRlPiA8b3V0bGluZSBjb2xvciA9ICMzOTAwMDAgd2lkdGg9Mj5cIiArIExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKHRpZCkgKyByZXN1bHQgKyBcIjwvb3V0bGluZT48L2NvbG9yPlwiICsgJ1xcbic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGVyY2VudENvbG9yKHRpZDpudW1iZXIsbmV3TnVtOm51bWJlcixvbGROdW06bnVtYmVyKTpzdHJpbmd7XHJcbiAgICAgICAgbGV0IHMgPSAnJztcclxuICAgICAgICBsZXQgcmVzdWx0ID0gTWF0aC5mbG9vcihNYXRoLmZsb29yKG5ld051bSAqIDEwMCkgLSBNYXRoLmZsb29yKG9sZE51bSAqIDEwMCkpO1xyXG4gICAgICAgIGlmKHJlc3VsdCAhPSAwKXtcclxuICAgICAgICAgICAgaWYocmVzdWx0ID4gMCl7XHJcbiAgICAgICAgICAgICAgICBzID0gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQodGlkKSArIFwiK1wiICsgcmVzdWx0ICsgXCIlXCIgKyAnXFxuJztcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBzID0gXCI8Y29sb3IgPSAjZmY0ZTRlPiA8b3V0bGluZSBjb2xvciA9ICMzOTAwMDAgd2lkdGg9Mj5cIiArIExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKHRpZCkgKyByZXN1bHQgKyBcIiVcIiArIFwiPC9vdXRsaW5lPjwvY29sb3I+XCIgKyAnXFxuJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcztcclxuICAgIH1cclxuXHJcbn1cclxuIl19