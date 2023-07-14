
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/ANuBiSi/ShaChenBao.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '10fd1mIM2dG4oGI4E300Wlr', 'ShaChenBao');
// Scripts/Hero/Game/ANuBiSi/ShaChenBao.ts

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
var Constants_1 = require("../../../Constants");
var GameEffectsManager_1 = require("../../../Game/GameEffectsManager");
var GameManager_1 = require("../../../GameManager");
var Monster_1 = require("../../../Monster/Monster");
var MonsterData_1 = require("../../../Monster/MonsterData");
var MonsterManager_1 = require("../../../Monster/MonsterManager");
var AudioConstants_1 = require("../../../Sound/AudioConstants");
var MyTool_1 = require("../../../Tools/MyTool");
var GongJi_1 = require("../GongJi");
var HeroConfig_1 = require("../HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShaChenBao = /** @class */ (function (_super) {
    __extends(ShaChenBao, _super);
    function ShaChenBao() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.remain_time = 0;
        _this.damage_time = 0;
        _this.damage_jiange = 1;
        _this.fanwei = 100;
        /**牵引速度 */
        _this.qianyin_sudu = 200;
        /**当前的旋转弧度度 */
        _this.cur_rotation = 0;
        /**旋转速度 */
        _this.ratating_speed = Math.PI;
        /**漩涡最小距离 */
        _this.min_distance = 100;
        return _this;
    }
    ShaChenBao.prototype.init = function (gjData, remainTime, damageJianGe, fanwei) {
        _super.prototype.initData.call(this, gjData);
        this.remain_time = remainTime;
        this.damage_jiange = damageJianGe;
        this.damage_time = 0;
        this.fanwei = fanwei;
        this.node.scale = fanwei / 110;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_ANBSSkill);
    };
    ShaChenBao.prototype.destroySelf = function () {
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.a_nu_bi_si_active_skill_1, this.node);
    };
    ShaChenBao.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state == Constants_1.GameState.Game_Playing) {
            if (this.remain_time > 0) {
                this.cur_rotation += dt * this.ratating_speed;
                this.remain_time -= dt;
                var isDie = false;
                if (this.remain_time < 0) {
                    this.remain_time = 0;
                    this.destroySelf();
                    isDie = true;
                }
                //牵引
                var allMonster = MonsterManager_1.default.getInstance().node.children;
                var len = allMonster.length;
                this.damage_time -= dt;
                var isCanDamage = false;
                if (this.damage_time < 0) {
                    this.damage_time = this.damage_jiange;
                    //造成伤害
                    isCanDamage = true;
                }
                if (len <= 0) {
                    return null;
                }
                for (var i = 0; i < len; i++) {
                    var monster = allMonster[i];
                    var monsterTS = monster.getComponent(Monster_1.default);
                    if (monsterTS && monsterTS.getIsCanCheck()) {
                        var offsetPos = this.node.getPosition().sub(monsterTS.getCenterPos());
                        var distance = offsetPos.mag();
                        if (distance <= this.fanwei) {
                            if (isCanDamage) {
                                monsterTS.beFlashInjured(this.gongji_data);
                            }
                            if (monsterTS.getStrengthType() != MonsterData_1.StrengthType.Boss) {
                                var radian = Math.atan2(offsetPos.y, offsetPos.x);
                                //牵引，强制位移
                                var xx = Math.cos(radian) * this.qianyin_sudu * dt;
                                var yy = Math.sin(radian) * this.qianyin_sudu * dt;
                                var disX = monster.x + xx;
                                var disY = monster.y + yy;
                                //旋转
                                var offsetCenter = cc.v2(disX, disY).sub(this.node.getPosition());
                                var centerDistance = offsetCenter.mag();
                                var min = MyTool_1.default.randomRangeInt(50, 120);
                                monsterTS.setQianYinMin(min);
                                if (centerDistance < monsterTS.getQianYinMin()) {
                                    centerDistance = monsterTS.getQianYinMin();
                                }
                                //旋转,下一帧的相对弧度
                                var curR = Math.atan2(offsetCenter.y, offsetCenter.x);
                                curR = (curR + (Math.PI * 2)) % (Math.PI * 2);
                                var nextDadian = curR + this.ratating_speed * dt;
                                nextDadian = (nextDadian + (Math.PI * 2)) % (Math.PI * 2);
                                //根据半径和弧度求下一点坐标
                                disY = this.node.y + Math.sin(nextDadian) * centerDistance;
                                disX = this.node.x + Math.cos(nextDadian) * centerDistance;
                                monsterTS.setX(disX);
                                monsterTS.setY(disY);
                                if (monsterTS.isHaveDeBuff(HeroConfig_1.BuffId.Hero_MeiMo_Active_MeiHuo) == false) {
                                    monsterTS.setMoveDir(radian + Math.PI);
                                    monsterTS.setFlip(disX > this.node.x);
                                }
                                if (isDie) {
                                    monsterTS.setMoveDir(Math.PI * 3 / 2);
                                }
                                // if(centerDistance>this.min_distance){
                                //     monsterTS.setX(disX);
                                //     monsterTS.setY(disY);
                                // }
                            }
                        }
                        else {
                            if (monsterTS.isHaveDeBuff(HeroConfig_1.BuffId.Hero_MeiMo_Active_MeiHuo) == false) {
                                monsterTS.setMoveDir(Math.PI * 3 / 2);
                            }
                        }
                    }
                }
            }
        }
    };
    ShaChenBao = __decorate([
        ccclass
    ], ShaChenBao);
    return ShaChenBao;
}(GongJi_1.default));
exports.default = ShaChenBao;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcQU51QmlTaVxcU2hhQ2hlbkJhby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBK0M7QUFDL0MsdUVBQW9GO0FBQ3BGLG9EQUErQztBQUMvQyxvREFBK0M7QUFDL0MsNERBQTREO0FBQzVELGtFQUE2RDtBQUM3RCxnRUFBMkQ7QUFDM0QsZ0RBQTJDO0FBRTNDLG9DQUErQjtBQUMvQiw0Q0FBdUM7QUFHakMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBd0MsOEJBQU07SUFBOUM7UUFBQSxxRUFzSEM7UUFwSEcsaUJBQVcsR0FBUSxDQUFDLENBQUM7UUFDckIsaUJBQVcsR0FBUSxDQUFDLENBQUM7UUFDckIsbUJBQWEsR0FBUSxDQUFDLENBQUM7UUFDdkIsWUFBTSxHQUFRLEdBQUcsQ0FBQztRQUNsQixVQUFVO1FBQ1Ysa0JBQVksR0FBUSxHQUFHLENBQUM7UUFDeEIsY0FBYztRQUNkLGtCQUFZLEdBQVEsQ0FBQyxDQUFDO1FBQ3RCLFVBQVU7UUFDVixvQkFBYyxHQUFRLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDOUIsWUFBWTtRQUNaLGtCQUFZLEdBQVEsR0FBRyxDQUFDOztJQXlHNUIsQ0FBQztJQXZHRyx5QkFBSSxHQUFKLFVBQUssTUFBaUIsRUFBQyxVQUFpQixFQUFDLFlBQW1CLEVBQUMsTUFBYTtRQUN0RSxpQkFBTSxRQUFRLFlBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBQyxVQUFVLENBQUM7UUFDNUIsSUFBSSxDQUFDLGFBQWEsR0FBQyxZQUFZLENBQUM7UUFDaEMsSUFBSSxDQUFDLFdBQVcsR0FBQyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBQyxNQUFNLENBQUM7UUFDbkIsSUFB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T0FBTztPQUNhLFVBQVUsQ0FzSDlCO0lBQUQsaUJBQUM7Q0F0SEQsQUFzSEMsQ0F0SHVDLGdCQUFNLEdBc0g3QztrQkF0SG9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lU3RhdGUgfSBmcm9tIFwiLi4vLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3RlclwiO1xyXG5pbXBvcnQgeyBTdHJlbmd0aFR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi8uLi8uLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IHsgR29uZ0ppRGF0YSB9IGZyb20gXCIuLi8uLi9EYXRhL0hlcm9EYXRhXCI7XHJcbmltcG9ydCBHb25nSmkgZnJvbSBcIi4uL0dvbmdKaVwiO1xyXG5pbXBvcnQgeyBCdWZmSWQgfSBmcm9tIFwiLi4vSGVyb0NvbmZpZ1wiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhQ2hlbkJhbyBleHRlbmRzIEdvbmdKaSB7XHJcblxyXG4gICAgcmVtYWluX3RpbWU6bnVtYmVyPTA7XHJcbiAgICBkYW1hZ2VfdGltZTpudW1iZXI9MDtcclxuICAgIGRhbWFnZV9qaWFuZ2U6bnVtYmVyPTE7XHJcbiAgICBmYW53ZWk6bnVtYmVyPTEwMDtcclxuICAgIC8qKueJteW8lemAn+W6piAqL1xyXG4gICAgcWlhbnlpbl9zdWR1Om51bWJlcj0yMDA7XHJcbiAgICAvKirlvZPliY3nmoTml4vovazlvKfluqbluqYgKi9cclxuICAgIGN1cl9yb3RhdGlvbjpudW1iZXI9MDtcclxuICAgIC8qKuaXi+i9rOmAn+W6piAqL1xyXG4gICAgcmF0YXRpbmdfc3BlZWQ6bnVtYmVyPU1hdGguUEk7XHJcbiAgICAvKirmvKnmtqHmnIDlsI/ot53nprsgKi9cclxuICAgIG1pbl9kaXN0YW5jZTpudW1iZXI9MTAwO1xyXG5cclxuICAgIGluaXQoZ2pEYXRhOkdvbmdKaURhdGEscmVtYWluVGltZTpudW1iZXIsZGFtYWdlSmlhbkdlOm51bWJlcixmYW53ZWk6bnVtYmVyKXtcclxuICAgICAgICBzdXBlci5pbml0RGF0YShnakRhdGEpO1xyXG4gICAgICAgIHRoaXMucmVtYWluX3RpbWU9cmVtYWluVGltZTtcclxuICAgICAgICB0aGlzLmRhbWFnZV9qaWFuZ2U9ZGFtYWdlSmlhbkdlO1xyXG4gICAgICAgIHRoaXMuZGFtYWdlX3RpbWU9MDtcclxuICAgICAgICB0aGlzLmZhbndlaT1mYW53ZWk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlPWZhbndlaS8xMTA7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0FOQlNTa2lsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveVNlbGYoKXtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmFfbnVfYmlfc2lfYWN0aXZlX3NraWxsXzEsdGhpcy5ub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUgKGR0Om51bWJlcikge1xyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGU9PUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpe1xyXG4gICAgICAgICAgICBpZih0aGlzLnJlbWFpbl90aW1lPjApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfcm90YXRpb24rPWR0KnRoaXMucmF0YXRpbmdfc3BlZWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbWFpbl90aW1lLT1kdDtcclxuICAgICAgICAgICAgICAgIGxldCBpc0RpZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMucmVtYWluX3RpbWU8MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1haW5fdGltZT0wO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAgICAgICAgICAgICBpc0RpZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy/nibXlvJVcclxuICAgICAgICAgICAgICAgIGxldCBhbGxNb25zdGVyPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgIGxldCBsZW49YWxsTW9uc3Rlci5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhbWFnZV90aW1lLT1kdDtcclxuICAgICAgICAgICAgICAgIGxldCBpc0NhbkRhbWFnZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuZGFtYWdlX3RpbWU8MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYW1hZ2VfdGltZT10aGlzLmRhbWFnZV9qaWFuZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/pgKDmiJDkvKTlrrNcclxuICAgICAgICAgICAgICAgICAgICBpc0NhbkRhbWFnZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYobGVuPD0wKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTxsZW47IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbW9uc3Rlcj1hbGxNb25zdGVyW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtb25zdGVyVFM9bW9uc3Rlci5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYobW9uc3RlclRTICYmIG1vbnN0ZXJUUy5nZXRJc0NhbkNoZWNrKCkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0UG9zPXRoaXMubm9kZS5nZXRQb3NpdGlvbigpLnN1Yihtb25zdGVyVFMuZ2V0Q2VudGVyUG9zKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlzdGFuY2U9b2Zmc2V0UG9zLm1hZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkaXN0YW5jZTw9dGhpcy5mYW53ZWkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlzQ2FuRGFtYWdlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyVFMuYmVGbGFzaEluanVyZWQodGhpcy5nb25namlfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihtb25zdGVyVFMuZ2V0U3RyZW5ndGhUeXBlKCkhPVN0cmVuZ3RoVHlwZS5Cb3NzKXsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByYWRpYW49TWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+eJteW8le+8jOW8uuWItuS9jeenu1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB4eD1NYXRoLmNvcyhyYWRpYW4pKnRoaXMucWlhbnlpbl9zdWR1KmR0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB5eT1NYXRoLnNpbihyYWRpYW4pKnRoaXMucWlhbnlpbl9zdWR1KmR0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaXNYPW1vbnN0ZXIueCt4eDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlzWT1tb25zdGVyLnkreXk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/ml4vovaxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0Q2VudGVyPWNjLnYyKGRpc1gsZGlzWSkuc3ViKHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2VudGVyRGlzdGFuY2U9b2Zmc2V0Q2VudGVyLm1hZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtaW49TXlUb29sLnJhbmRvbVJhbmdlSW50KDUwLDEyMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3RlclRTLnNldFFpYW5ZaW5NaW4obWluKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjZW50ZXJEaXN0YW5jZTxtb25zdGVyVFMuZ2V0UWlhbllpbk1pbigpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VudGVyRGlzdGFuY2U9bW9uc3RlclRTLmdldFFpYW5ZaW5NaW4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/ml4vovaws5LiL5LiA5bin55qE55u45a+55byn5bqmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN1clI9TWF0aC5hdGFuMihvZmZzZXRDZW50ZXIueSxvZmZzZXRDZW50ZXIueCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyUj0oY3VyUisoTWF0aC5QSSoyKSklKE1hdGguUEkqMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5leHREYWRpYW49Y3VyUit0aGlzLnJhdGF0aW5nX3NwZWVkKmR0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHREYWRpYW49KG5leHREYWRpYW4rKE1hdGguUEkqMikpJShNYXRoLlBJKjIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5qC55o2u5Y2K5b6E5ZKM5byn5bqm5rGC5LiL5LiA54K55Z2Q5qCHXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzWT10aGlzLm5vZGUueStNYXRoLnNpbihuZXh0RGFkaWFuKSpjZW50ZXJEaXN0YW5jZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNYPXRoaXMubm9kZS54K01hdGguY29zKG5leHREYWRpYW4pKmNlbnRlckRpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJUUy5zZXRYKGRpc1gpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJUUy5zZXRZKGRpc1kpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG1vbnN0ZXJUUy5pc0hhdmVEZUJ1ZmYoQnVmZklkLkhlcm9fTWVpTW9fQWN0aXZlX01laUh1byk9PWZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3RlclRTLnNldE1vdmVEaXIocmFkaWFuK01hdGguUEkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyVFMuc2V0RmxpcChkaXNYPnRoaXMubm9kZS54KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpc0RpZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJUUy5zZXRNb3ZlRGlyKE1hdGguUEkqMy8yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYoY2VudGVyRGlzdGFuY2U+dGhpcy5taW5fZGlzdGFuY2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBtb25zdGVyVFMuc2V0WChkaXNYKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgbW9uc3RlclRTLnNldFkoZGlzWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihtb25zdGVyVFMuaXNIYXZlRGVCdWZmKEJ1ZmZJZC5IZXJvX01laU1vX0FjdGl2ZV9NZWlIdW8pPT1mYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3RlclRTLnNldE1vdmVEaXIoTWF0aC5QSSozLzIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==