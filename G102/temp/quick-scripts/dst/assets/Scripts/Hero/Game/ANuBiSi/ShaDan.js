
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/ANuBiSi/ShaDan.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ab69d4cxRVF5Ku4rYUwxYvp', 'ShaDan');
// Scripts/Hero/Game/ANuBiSi/ShaDan.ts

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
var GameEffectsManager_1 = require("../../../Game/GameEffectsManager");
var GameManager_1 = require("../../../GameManager");
var Monster_1 = require("../../../Monster/Monster");
var MonsterManager_1 = require("../../../Monster/MonsterManager");
var AudioConstants_1 = require("../../../Sound/AudioConstants");
var BuffData_1 = require("../BuffData");
var Bullect_1 = require("../Bullect");
var HeroConfig_1 = require("../HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShaDan = /** @class */ (function (_super) {
    __extends(ShaDan, _super);
    function ShaDan() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hero_lvl = 0;
        return _this;
    }
    ShaDan.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addCollisionMonsterListen.call(this, this.onCollisionMonster);
    };
    ShaDan.prototype.onCollisionMonster = function (monsterTs) {
        //普通弹
        if (monsterTs) {
            var data = monsterTs.beFlashInjured(this.gongji_data);
            if (data.getDamageNum() > 0) {
                GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.a_nu_bi_si_attack_hit, this.node.getPosition());
                var rate = Math.random();
                if (rate < this.gongji_data.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_1)) //
                 {
                    GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_ANBSAttack);
                    //判断锥形范围的敌人
                    var fanweiData = cc.instantiate(this.gongji_data);
                    fanweiData.damage_type = HeroConfig_1.DamageType.Skill;
                    fanweiData.is_bullet = false;
                    fanweiData.skill_damage_rate = this.gongji_data.hero_data.getSkillValue2(HeroConfig_1.SkillType.Passive_1);
                    var shanxing = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.a_nu_bi_si_beidong_skill_1, this.node.getPosition());
                    shanxing.angle = this.node.angle;
                    //减速
                    var distance = 260;
                    var min = this.move_direction - Math.PI / 4; //45°+90
                    var max = min + Math.PI / 2; //135°
                    //cc.log(MyTool.radianToAngle(this.move_direction),MyTool.radianToAngle(min),MyTool.radianToAngle(max))
                    // FightingManager.getInstance().node.getComponent(cc.Graphics).arc(this.getAPos(-50).x,this.getAPos(-50).y,distance,min,max);
                    // FightingManager.getInstance().node.getComponent(cc.Graphics).stroke();
                    var allMonsters = MonsterManager_1.default.getInstance().getMonstersForRadian(-1, this.node.getPosition(), distance, min, max);
                    if (allMonsters) {
                        for (var i = 0; i < allMonsters.length; i++) {
                            var monsterTTs = allMonsters[i].getComponent(Monster_1.default);
                            var zuiData = monsterTTs.beFlashInjured(fanweiData);
                            ;
                            if (zuiData.getDamageNum() > 0) {
                                var buffData = new BuffData_1.BuffData();
                                buffData.buff_id = HeroConfig_1.BuffId.Hero_ANuBiSi_Skill1_JianSu;
                                buffData.buff_type = HeroConfig_1.BuffType.Slowdown;
                                buffData.buff_value = [0.3 + 0.1 * this.hero_lvl];
                                buffData.remain_time = 3;
                                monsterTTs.addDeBuff(buffData, fanweiData);
                            }
                        }
                    }
                }
            }
            this.destroySelf();
        }
    };
    ShaDan = __decorate([
        ccclass
    ], ShaDan);
    return ShaDan;
}(Bullect_1.default));
exports.default = ShaDan;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcQU51QmlTaVxcU2hhRGFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLHVFQUFvRjtBQUNwRixvREFBK0M7QUFDL0Msb0RBQStDO0FBRS9DLGtFQUE2RDtBQUM3RCxnRUFBMkQ7QUFFM0Qsd0NBQXVDO0FBQ3ZDLHNDQUFpQztBQUNqQyw0Q0FBd0U7QUFFbEUsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBb0MsMEJBQU87SUFBM0M7UUFBQSxxRUFzREM7UUFwRFUsY0FBUSxHQUFRLENBQUMsQ0FBQzs7SUFvRDdCLENBQUM7SUFuREcsdUJBQU0sR0FBTjtRQUNJLGlCQUFNLE1BQU0sV0FBRSxDQUFDO1FBQ2YsaUJBQU0seUJBQXlCLFlBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELG1DQUFrQixHQUFsQixVQUFtQixTQUFpQjtRQUNoQyxLQUFLO1FBQ0wsSUFBRyxTQUFTLEVBQUM7WUFDVCxJQUFJLElBQUksR0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNwRCxJQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBQyxDQUFDLEVBQUM7Z0JBQ3JCLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLG9CQUFvQixDQUFDLGlDQUFZLENBQUMscUJBQXFCLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO2dCQUNsSCxJQUFJLElBQUksR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3ZCLElBQUcsSUFBSSxHQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxzQkFBUyxDQUFDLFNBQVMsQ0FBQyxFQUFDLEVBQUU7aUJBQ3pFO29CQUNJLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUM1RSxXQUFXO29CQUNYLElBQUksVUFBVSxHQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUNoRCxVQUFVLENBQUMsV0FBVyxHQUFDLHVCQUFVLENBQUMsS0FBSyxDQUFDO29CQUN4QyxVQUFVLENBQUMsU0FBUyxHQUFDLEtBQUssQ0FBQztvQkFDM0IsVUFBVSxDQUFDLGlCQUFpQixHQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxzQkFBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUM1RixJQUFJLFFBQVEsR0FBQyx1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxpQ0FBWSxDQUFDLDBCQUEwQixFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztvQkFDcEksUUFBUSxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFDL0IsSUFBSTtvQkFDSixJQUFJLFFBQVEsR0FBQyxHQUFHLENBQUM7b0JBQ2pCLElBQUksR0FBRyxHQUFDLElBQUksQ0FBQyxjQUFjLEdBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUMsQ0FBQSxRQUFRO29CQUM5QyxJQUFJLEdBQUcsR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUMsQ0FBQSxNQUFNO29CQUM1Qix1R0FBdUc7b0JBQ3ZHLDhIQUE4SDtvQkFDOUgseUVBQXlFO29CQUN6RSxJQUFJLFdBQVcsR0FBQyx3QkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQztvQkFDL0csSUFBRyxXQUFXLEVBQUM7d0JBQ1gsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7NEJBQ25DLElBQUksVUFBVSxHQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsaUJBQU8sQ0FBQyxDQUFDOzRCQUNwRCxJQUFJLE9BQU8sR0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDOzRCQUFBLENBQUM7NEJBQ25ELElBQUcsT0FBTyxDQUFDLFlBQVksRUFBRSxHQUFDLENBQUMsRUFBQztnQ0FDeEIsSUFBSSxRQUFRLEdBQUMsSUFBSSxtQkFBUSxFQUFFLENBQUM7Z0NBQzVCLFFBQVEsQ0FBQyxPQUFPLEdBQUMsbUJBQU0sQ0FBQywwQkFBMEIsQ0FBQztnQ0FDbkQsUUFBUSxDQUFDLFNBQVMsR0FBQyxxQkFBUSxDQUFDLFFBQVEsQ0FBQztnQ0FDckMsUUFBUSxDQUFDLFVBQVUsR0FBQyxDQUFDLEdBQUcsR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dDQUM1QyxRQUFRLENBQUMsV0FBVyxHQUFDLENBQUMsQ0FBQztnQ0FDdkIsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUMsVUFBVSxDQUFDLENBQUM7NkJBQzdDO3lCQUVKO3FCQUNKO2lCQUNKO2FBQ0o7WUFDRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEI7SUFDTCxDQUFDO0lBcERnQixNQUFNO1FBRDFCLE9BQU87T0FDYSxNQUFNLENBc0QxQjtJQUFELGFBQUM7Q0F0REQsQUFzREMsQ0F0RG1DLGlCQUFPLEdBc0QxQztrQkF0RG9CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmltcG9ydCBGaWdodGluZ01hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWUvRmlnaHRpbmdNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RzTWFuYWdlciwgR2FtZUVmZmVjdElkIH0gZnJvbSBcIi4uLy4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3RlclwiO1xyXG5pbXBvcnQgeyBGZWVkQmFja1R5cGUgfSBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi8uLi8uLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vQnVmZkRhdGFcIjtcclxuaW1wb3J0IEJ1bGxlY3QgZnJvbSBcIi4uL0J1bGxlY3RcIjtcclxuaW1wb3J0IHsgQnVmZklkLCBCdWZmVHlwZSwgRGFtYWdlVHlwZSwgU2tpbGxUeXBlIH0gZnJvbSBcIi4uL0hlcm9Db25maWdcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhRGFuIGV4dGVuZHMgQnVsbGVjdCB7XHJcblxyXG4gICAgcHVibGljIGhlcm9fbHZsOm51bWJlcj0wO1xyXG4gICAgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIHN1cGVyLmFkZENvbGxpc2lvbk1vbnN0ZXJMaXN0ZW4odGhpcy5vbkNvbGxpc2lvbk1vbnN0ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ29sbGlzaW9uTW9uc3Rlcihtb25zdGVyVHM6TW9uc3Rlcikge1xyXG4gICAgICAgIC8v5pmu6YCa5by5XHJcbiAgICAgICAgaWYobW9uc3RlclRzKXsgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGRhdGE9bW9uc3RlclRzLmJlRmxhc2hJbmp1cmVkKHRoaXMuZ29uZ2ppX2RhdGEpO1xyXG4gICAgICAgICAgICBpZihkYXRhLmdldERhbWFnZU51bSgpPjApe1xyXG4gICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmFfbnVfYmlfc2lfYXR0YWNrX2hpdCx0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmF0ZT1NYXRoLnJhbmRvbSgpO1xyXG4gICAgICAgICAgICAgICAgaWYocmF0ZTx0aGlzLmdvbmdqaV9kYXRhLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMShTa2lsbFR5cGUuUGFzc2l2ZV8xKSkvL1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9BTkJTQXR0YWNrKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+WIpOaWremUpeW9ouiMg+WbtOeahOaVjOS6ulxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmYW53ZWlEYXRhPWNjLmluc3RhbnRpYXRlKHRoaXMuZ29uZ2ppX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZhbndlaURhdGEuZGFtYWdlX3R5cGU9RGFtYWdlVHlwZS5Ta2lsbDtcclxuICAgICAgICAgICAgICAgICAgICBmYW53ZWlEYXRhLmlzX2J1bGxldD1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBmYW53ZWlEYXRhLnNraWxsX2RhbWFnZV9yYXRlPXRoaXMuZ29uZ2ppX2RhdGEuaGVyb19kYXRhLmdldFNraWxsVmFsdWUyKFNraWxsVHlwZS5QYXNzaXZlXzEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzaGFueGluZz1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuYV9udV9iaV9zaV9iZWlkb25nX3NraWxsXzEsdGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNoYW54aW5nLmFuZ2xlPXRoaXMubm9kZS5hbmdsZTtcclxuICAgICAgICAgICAgICAgICAgICAvL+WHj+mAn1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXN0YW5jZT0yNjA7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1pbj10aGlzLm1vdmVfZGlyZWN0aW9uLU1hdGguUEkvNDsvLzQ1wrArOTBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWF4PW1pbitNYXRoLlBJLzI7Ly8xMzXCsFxyXG4gICAgICAgICAgICAgICAgICAgIC8vY2MubG9nKE15VG9vbC5yYWRpYW5Ub0FuZ2xlKHRoaXMubW92ZV9kaXJlY3Rpb24pLE15VG9vbC5yYWRpYW5Ub0FuZ2xlKG1pbiksTXlUb29sLnJhZGlhblRvQW5nbGUobWF4KSlcclxuICAgICAgICAgICAgICAgICAgICAvLyBGaWdodGluZ01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmdldENvbXBvbmVudChjYy5HcmFwaGljcykuYXJjKHRoaXMuZ2V0QVBvcygtNTApLngsdGhpcy5nZXRBUG9zKC01MCkueSxkaXN0YW5jZSxtaW4sbWF4KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBGaWdodGluZ01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmdldENvbXBvbmVudChjYy5HcmFwaGljcykuc3Ryb2tlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFsbE1vbnN0ZXJzPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlcnNGb3JSYWRpYW4oLTEsdGhpcy5ub2RlLmdldFBvc2l0aW9uKCksZGlzdGFuY2UsbWluLG1heCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYWxsTW9uc3RlcnMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxhbGxNb25zdGVycy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclRUcz1hbGxNb25zdGVyc1tpXS5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgenVpRGF0YT1tb25zdGVyVFRzLmJlRmxhc2hJbmp1cmVkKGZhbndlaURhdGEpOztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHp1aURhdGEuZ2V0RGFtYWdlTnVtKCk+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJ1ZmZEYXRhPW5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfaWQ9QnVmZklkLkhlcm9fQU51QmlTaV9Ta2lsbDFfSmlhblN1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfdHlwZT1CdWZmVHlwZS5TbG93ZG93bjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3ZhbHVlPVswLjMrMC4xKnRoaXMuaGVyb19sdmxdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lPTM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3RlclRUcy5hZGREZUJ1ZmYoYnVmZkRhdGEsZmFud2VpRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==