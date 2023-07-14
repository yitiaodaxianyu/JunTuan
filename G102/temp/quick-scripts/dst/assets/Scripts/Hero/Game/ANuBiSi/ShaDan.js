
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
        return _super !== null && _super.apply(this, arguments) || this;
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
                                buffData.buff_value = [0.3];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcQU51QmlTaVxcU2hhRGFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLHVFQUFvRjtBQUNwRixvREFBK0M7QUFDL0Msb0RBQStDO0FBRS9DLGtFQUE2RDtBQUM3RCxnRUFBMkQ7QUFFM0Qsd0NBQXVDO0FBQ3ZDLHNDQUFpQztBQUNqQyw0Q0FBd0U7QUFFbEUsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBb0MsMEJBQU87SUFBM0M7O0lBc0RBLENBQUM7SUFuREcsdUJBQU0sR0FBTjtRQUNJLGlCQUFNLE1BQU0sV0FBRSxDQUFDO1FBQ2YsaUJBQU0seUJBQXlCLFlBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELG1DQUFrQixHQUFsQixVQUFtQixTQUFpQjtRQUNoQyxLQUFLO1FBQ0wsSUFBRyxTQUFTLEVBQUM7WUFDVCxJQUFJLElBQUksR0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNwRCxJQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBQyxDQUFDLEVBQUM7Z0JBQ3JCLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLG9CQUFvQixDQUFDLGlDQUFZLENBQUMscUJBQXFCLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO2dCQUNsSCxJQUFJLElBQUksR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3ZCLElBQUcsSUFBSSxHQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxzQkFBUyxDQUFDLFNBQVMsQ0FBQyxFQUFDLEVBQUU7aUJBQ3pFO29CQUNJLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUM1RSxXQUFXO29CQUNYLElBQUksVUFBVSxHQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUNoRCxVQUFVLENBQUMsV0FBVyxHQUFDLHVCQUFVLENBQUMsS0FBSyxDQUFDO29CQUN4QyxVQUFVLENBQUMsU0FBUyxHQUFDLEtBQUssQ0FBQztvQkFDM0IsVUFBVSxDQUFDLGlCQUFpQixHQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxzQkFBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUM1RixJQUFJLFFBQVEsR0FBQyx1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxpQ0FBWSxDQUFDLDBCQUEwQixFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztvQkFDcEksUUFBUSxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFDL0IsSUFBSTtvQkFDSixJQUFJLFFBQVEsR0FBQyxHQUFHLENBQUM7b0JBQ2pCLElBQUksR0FBRyxHQUFDLElBQUksQ0FBQyxjQUFjLEdBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUMsQ0FBQSxRQUFRO29CQUM5QyxJQUFJLEdBQUcsR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUMsQ0FBQSxNQUFNO29CQUM1Qix1R0FBdUc7b0JBQ3ZHLDhIQUE4SDtvQkFDOUgseUVBQXlFO29CQUN6RSxJQUFJLFdBQVcsR0FBQyx3QkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQztvQkFDL0csSUFBRyxXQUFXLEVBQUM7d0JBQ1gsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7NEJBQ25DLElBQUksVUFBVSxHQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsaUJBQU8sQ0FBQyxDQUFDOzRCQUNwRCxJQUFJLE9BQU8sR0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDOzRCQUFBLENBQUM7NEJBQ25ELElBQUcsT0FBTyxDQUFDLFlBQVksRUFBRSxHQUFDLENBQUMsRUFBQztnQ0FDeEIsSUFBSSxRQUFRLEdBQUMsSUFBSSxtQkFBUSxFQUFFLENBQUM7Z0NBQzVCLFFBQVEsQ0FBQyxPQUFPLEdBQUMsbUJBQU0sQ0FBQywwQkFBMEIsQ0FBQztnQ0FDbkQsUUFBUSxDQUFDLFNBQVMsR0FBQyxxQkFBUSxDQUFDLFFBQVEsQ0FBQztnQ0FDckMsUUFBUSxDQUFDLFVBQVUsR0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dDQUMxQixRQUFRLENBQUMsV0FBVyxHQUFDLENBQUMsQ0FBQztnQ0FDdkIsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUMsVUFBVSxDQUFDLENBQUM7NkJBQzdDO3lCQUVKO3FCQUNKO2lCQUNKO2FBQ0o7WUFDRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEI7SUFDTCxDQUFDO0lBcERnQixNQUFNO1FBRDFCLE9BQU87T0FDYSxNQUFNLENBc0QxQjtJQUFELGFBQUM7Q0F0REQsQUFzREMsQ0F0RG1DLGlCQUFPLEdBc0QxQztrQkF0RG9CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmltcG9ydCBGaWdodGluZ01hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWUvRmlnaHRpbmdNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RzTWFuYWdlciwgR2FtZUVmZmVjdElkIH0gZnJvbSBcIi4uLy4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3RlclwiO1xyXG5pbXBvcnQgeyBGZWVkQmFja1R5cGUgfSBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi8uLi8uLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vQnVmZkRhdGFcIjtcclxuaW1wb3J0IEJ1bGxlY3QgZnJvbSBcIi4uL0J1bGxlY3RcIjtcclxuaW1wb3J0IHsgQnVmZklkLCBCdWZmVHlwZSwgRGFtYWdlVHlwZSwgU2tpbGxUeXBlIH0gZnJvbSBcIi4uL0hlcm9Db25maWdcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhRGFuIGV4dGVuZHMgQnVsbGVjdCB7XHJcblxyXG5cclxuICAgIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICBzdXBlci5hZGRDb2xsaXNpb25Nb25zdGVyTGlzdGVuKHRoaXMub25Db2xsaXNpb25Nb25zdGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNvbGxpc2lvbk1vbnN0ZXIobW9uc3RlclRzOk1vbnN0ZXIpIHtcclxuICAgICAgICAvL+aZrumAmuW8uVxyXG4gICAgICAgIGlmKG1vbnN0ZXJUcyl7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBkYXRhPW1vbnN0ZXJUcy5iZUZsYXNoSW5qdXJlZCh0aGlzLmdvbmdqaV9kYXRhKTtcclxuICAgICAgICAgICAgaWYoZGF0YS5nZXREYW1hZ2VOdW0oKT4wKXtcclxuICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5hX251X2JpX3NpX2F0dGFja19oaXQsdGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJhdGU9TWF0aC5yYW5kb20oKTtcclxuICAgICAgICAgICAgICAgIGlmKHJhdGU8dGhpcy5nb25namlfZGF0YS5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLlBhc3NpdmVfMSkpLy9cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfQU5CU0F0dGFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/liKTmlq3plKXlvaLojIPlm7TnmoTmlYzkurpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmFud2VpRGF0YT1jYy5pbnN0YW50aWF0ZSh0aGlzLmdvbmdqaV9kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBmYW53ZWlEYXRhLmRhbWFnZV90eXBlPURhbWFnZVR5cGUuU2tpbGw7XHJcbiAgICAgICAgICAgICAgICAgICAgZmFud2VpRGF0YS5pc19idWxsZXQ9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZmFud2VpRGF0YS5za2lsbF9kYW1hZ2VfcmF0ZT10aGlzLmdvbmdqaV9kYXRhLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMihTa2lsbFR5cGUuUGFzc2l2ZV8xKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2hhbnhpbmc9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmFfbnVfYmlfc2lfYmVpZG9uZ19za2lsbF8xLHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgICAgICAgICBzaGFueGluZy5hbmdsZT10aGlzLm5vZGUuYW5nbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lh4/pgJ9cclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGlzdGFuY2U9MjYwO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtaW49dGhpcy5tb3ZlX2RpcmVjdGlvbi1NYXRoLlBJLzQ7Ly80NcKwKzkwXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1heD1taW4rTWF0aC5QSS8yOy8vMTM1wrBcclxuICAgICAgICAgICAgICAgICAgICAvL2NjLmxvZyhNeVRvb2wucmFkaWFuVG9BbmdsZSh0aGlzLm1vdmVfZGlyZWN0aW9uKSxNeVRvb2wucmFkaWFuVG9BbmdsZShtaW4pLE15VG9vbC5yYWRpYW5Ub0FuZ2xlKG1heCkpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRmlnaHRpbmdNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5nZXRDb21wb25lbnQoY2MuR3JhcGhpY3MpLmFyYyh0aGlzLmdldEFQb3MoLTUwKS54LHRoaXMuZ2V0QVBvcygtNTApLnksZGlzdGFuY2UsbWluLG1heCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRmlnaHRpbmdNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5nZXRDb21wb25lbnQoY2MuR3JhcGhpY3MpLnN0cm9rZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhbGxNb25zdGVycz1Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vbnN0ZXJzRm9yUmFkaWFuKC0xLHRoaXMubm9kZS5nZXRQb3NpdGlvbigpLGRpc3RhbmNlLG1pbixtYXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGFsbE1vbnN0ZXJzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8YWxsTW9uc3RlcnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJUVHM9YWxsTW9uc3RlcnNbaV0uZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHp1aURhdGE9bW9uc3RlclRUcy5iZUZsYXNoSW5qdXJlZChmYW53ZWlEYXRhKTs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih6dWlEYXRhLmdldERhbWFnZU51bSgpPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBidWZmRGF0YT1uZXcgQnVmZkRhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX2lkPUJ1ZmZJZC5IZXJvX0FOdUJpU2lfU2tpbGwxX0ppYW5TdTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3R5cGU9QnVmZlR5cGUuU2xvd2Rvd247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl92YWx1ZT1bMC4zXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZT0zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJUVHMuYWRkRGVCdWZmKGJ1ZmZEYXRhLGZhbndlaURhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=