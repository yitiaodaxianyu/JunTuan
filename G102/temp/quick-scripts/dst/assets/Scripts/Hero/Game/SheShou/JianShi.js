
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/SheShou/JianShi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f218baThfZKyZoP1GmU7hFq', 'JianShi');
// Scripts/Hero/Game/SheShou/JianShi.ts

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
var Monster_1 = require("../../../Monster/Monster");
var MonsterData_1 = require("../../../Monster/MonsterData");
var MonsterManager_1 = require("../../../Monster/MonsterManager");
var Bullect_1 = require("../Bullect");
var HeroConfig_1 = require("../HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var JianShi = /** @class */ (function (_super) {
    __extends(JianShi, _super);
    function JianShi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.jianshi_type = HeroConfig_1.JianShi_Type.putong;
        return _this;
    }
    JianShi.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addCollisionMonsterListen.call(this, this.onCollisionMonster);
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    JianShi.prototype.onCollisionMonster = function (monsterTs) {
        if (monsterTs) {
            switch (this.jianshi_type) {
                case HeroConfig_1.JianShi_Type.putong:
                    {
                        var data = monsterTs.beFlashInjured(this.gongji_data);
                        if (data.getDamageNum() > 0) {
                            //本次攻击有效                        
                            if (data.feedback_type == MonsterData_1.FeedBackType.BaoJi) {
                                if (this.gongji_data.hero_data.getIsUnlock(HeroConfig_1.SkillType.Passive_2)) {
                                    //判断锥形范围的敌人
                                    var fanweiData = cc.instantiate(this.gongji_data);
                                    fanweiData.damage_type = HeroConfig_1.DamageType.Skill;
                                    fanweiData.is_bullet = false;
                                    fanweiData.skill_damage_rate = this.gongji_data.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_2);
                                    var shanxing = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.sheshou_attack_ctrl_hit, this.node.getPosition());
                                    shanxing.angle = this.node.angle;
                                    //减速
                                    var distance = 220;
                                    var min = this.move_direction - Math.PI / 4; //45°+90
                                    var max = min + Math.PI / 2; //135°
                                    //cc.log(MyTool.radianToAngle(this.move_direction),MyTool.radianToAngle(min),MyTool.radianToAngle(max))
                                    var allMonsters = MonsterManager_1.default.getInstance().getMonstersForRadian(-1, this.node.getPosition(), distance, min, max);
                                    if (allMonsters) {
                                        for (var i = 0; i < allMonsters.length; i++) {
                                            var monsterTTs = allMonsters[i].getComponent(Monster_1.default);
                                            monsterTTs.beFlashInjured(fanweiData);
                                            ;
                                        }
                                    }
                                }
                                else {
                                    GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.sheshou_jianshi_att_hit, this.node.getPosition());
                                }
                            }
                            else {
                                GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.sheshou_jianshi_att_hit, this.node.getPosition());
                            }
                        }
                        this.is_att = true;
                        this.destroySelf();
                    }
                    break;
                case HeroConfig_1.JianShi_Type.jineng:
                    {
                        var data = monsterTs.beFlashInjured(this.gongji_data);
                        if (data.getDamageNum() > 0) {
                            //本次攻击有效
                            var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.sheshou_jianshi_att_hit, this.getHeadPos());
                            //node.scale=monsterTs.getSheShouAttackScale();
                            this.is_att = true;
                            this.destroySelf();
                        }
                        else {
                            if (data.feedback_type != MonsterData_1.FeedBackType.Die)
                                this.destroySelf();
                        }
                    }
                    break;
                case HeroConfig_1.JianShi_Type.super:
                    {
                        var data = monsterTs.beFlashInjured(this.gongji_data);
                        if (data.getDamageNum() > 0) {
                        }
                    }
                    break;
            }
        }
    };
    __decorate([
        property({ type: cc.Enum(HeroConfig_1.JianShi_Type) })
    ], JianShi.prototype, "jianshi_type", void 0);
    JianShi = __decorate([
        ccclass
    ], JianShi);
    return JianShi;
}(Bullect_1.default));
exports.default = JianShi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcU2hlU2hvdVxcSmlhblNoaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1RUFBb0Y7QUFDcEYsb0RBQStDO0FBQy9DLDREQUE0RDtBQUM1RCxrRUFBNkQ7QUFHN0Qsc0NBQWlDO0FBQ2pDLDRDQUFzRjtBQUVoRixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFxQywyQkFBTztJQUE1QztRQUFBLHFFQXdFQztRQXJFRyxrQkFBWSxHQUFjLHlCQUFZLENBQUMsTUFBTSxDQUFDOztJQXFFbEQsQ0FBQztJQW5FRyx3QkFBTSxHQUFOO1FBQ0ksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFDZixpQkFBTSx5QkFBeUIsWUFBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsa0dBQWtHO0lBQ2xHLG9DQUFrQixHQUFsQixVQUFtQixTQUFpQjtRQUNoQyxJQUFHLFNBQVMsRUFBQztZQUNULFFBQU8sSUFBSSxDQUFDLFlBQVksRUFBQztnQkFDckIsS0FBSyx5QkFBWSxDQUFDLE1BQU07b0JBQUM7d0JBQ3JCLElBQUksSUFBSSxHQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUNwRCxJQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBQyxDQUFDLEVBQUM7NEJBQ3JCLGdDQUFnQzs0QkFDaEMsSUFBRyxJQUFJLENBQUMsYUFBYSxJQUFFLDBCQUFZLENBQUMsS0FBSyxFQUFDO2dDQUN0QyxJQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxzQkFBUyxDQUFDLFNBQVMsQ0FBQyxFQUFDO29DQUMzRCxXQUFXO29DQUNYLElBQUksVUFBVSxHQUFDLEVBQUUsQ0FB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SjtvQkFBQSxNQUFNO2dCQUNQLEtBQUsseUJBQVksQ0FBQyxLQUFLO29CQUFDO3dCQUNwQixJQUFJLElBQUksR0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDcEQsSUFBRyxJQUFJLENBQUMsWUFBWSxFQUFFLEdBQUMsQ0FBQyxFQUFDO3lCQUV4QjtxQkFDSjtvQkFBQSxNQUFNO2FBQ1Y7U0FFSjtJQUNMLENBQUM7SUFwRUQ7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyx5QkFBWSxDQUFDLEVBQUMsQ0FBQztpREFDTztJQUg3QixPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBd0UzQjtJQUFELGNBQUM7Q0F4RUQsQUF3RUMsQ0F4RW9DLGlCQUFPLEdBd0UzQztrQkF4RW9CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgR2FtZUVmZmVjdHNNYW5hZ2VyLCBHYW1lRWZmZWN0SWQgfSBmcm9tIFwiLi4vLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3RlclwiO1xyXG5pbXBvcnQgeyBGZWVkQmFja1R5cGUgfSBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IE15VG9vbCBmcm9tIFwiLi4vLi4vLi4vVG9vbHMvTXlUb29sXCI7XHJcbmltcG9ydCB7IEJ1ZmZEYXRhIH0gZnJvbSBcIi4uL0J1ZmZEYXRhXCI7XHJcbmltcG9ydCBCdWxsZWN0IGZyb20gXCIuLi9CdWxsZWN0XCI7XHJcbmltcG9ydCB7IEJ1ZmZJZCwgQnVmZlR5cGUsIERhbWFnZVR5cGUsIEppYW5TaGlfVHlwZSwgU2tpbGxUeXBlIH0gZnJvbSBcIi4uL0hlcm9Db25maWdcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSmlhblNoaSBleHRlbmRzIEJ1bGxlY3Qge1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5FbnVtKEppYW5TaGlfVHlwZSl9KVxyXG4gICAgamlhbnNoaV90eXBlOkppYW5TaGlfVHlwZT1KaWFuU2hpX1R5cGUucHV0b25nO1xyXG5cclxuICAgIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICBzdXBlci5hZGRDb2xsaXNpb25Nb25zdGVyTGlzdGVuKHRoaXMub25Db2xsaXNpb25Nb25zdGVyKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t56Kw5pKe5byA5aeLLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgb25Db2xsaXNpb25Nb25zdGVyKG1vbnN0ZXJUczpNb25zdGVyKSB7XHJcbiAgICAgICAgaWYobW9uc3RlclRzKXtcclxuICAgICAgICAgICAgc3dpdGNoKHRoaXMuamlhbnNoaV90eXBlKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgSmlhblNoaV9UeXBlLnB1dG9uZzp7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGE9bW9uc3RlclRzLmJlRmxhc2hJbmp1cmVkKHRoaXMuZ29uZ2ppX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEuZ2V0RGFtYWdlTnVtKCk+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5pys5qyh5pS75Ye75pyJ5pWIICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGEuZmVlZGJhY2tfdHlwZT09RmVlZEJhY2tUeXBlLkJhb0ppKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZ29uZ2ppX2RhdGEuaGVyb19kYXRhLmdldElzVW5sb2NrKFNraWxsVHlwZS5QYXNzaXZlXzIpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WIpOaWremUpeW9ouiMg+WbtOeahOaVjOS6ulxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmYW53ZWlEYXRhPWNjLmluc3RhbnRpYXRlKHRoaXMuZ29uZ2ppX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhbndlaURhdGEuZGFtYWdlX3R5cGU9RGFtYWdlVHlwZS5Ta2lsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYW53ZWlEYXRhLmlzX2J1bGxldD1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYW53ZWlEYXRhLnNraWxsX2RhbWFnZV9yYXRlPXRoaXMuZ29uZ2ppX2RhdGEuaGVyb19kYXRhLmdldFNraWxsVmFsdWUxKFNraWxsVHlwZS5QYXNzaXZlXzIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzaGFueGluZz1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuc2hlc2hvdV9hdHRhY2tfY3RybF9oaXQsdGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoYW54aW5nLmFuZ2xlPXRoaXMubm9kZS5hbmdsZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WHj+mAn1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaXN0YW5jZT0yMjA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1pbj10aGlzLm1vdmVfZGlyZWN0aW9uLU1hdGguUEkvNDsvLzQ1wrArOTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWF4PW1pbitNYXRoLlBJLzI7Ly8xMzXCsFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY2MubG9nKE15VG9vbC5yYWRpYW5Ub0FuZ2xlKHRoaXMubW92ZV9kaXJlY3Rpb24pLE15VG9vbC5yYWRpYW5Ub0FuZ2xlKG1pbiksTXlUb29sLnJhZGlhblRvQW5nbGUobWF4KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWxsTW9uc3RlcnM9TW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb25zdGVyc0ZvclJhZGlhbigtMSx0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSxkaXN0YW5jZSxtaW4sbWF4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihhbGxNb25zdGVycyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGFsbE1vbnN0ZXJzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb25zdGVyVFRzPWFsbE1vbnN0ZXJzW2ldLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJUVHMuYmVGbGFzaEluanVyZWQoZmFud2VpRGF0YSk7OyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLnNoZXNob3VfamlhbnNoaV9hdHRfaGl0LHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuc2hlc2hvdV9qaWFuc2hpX2F0dF9oaXQsdGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfYXR0PXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBKaWFuU2hpX1R5cGUuamluZW5nOntcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YT1tb25zdGVyVHMuYmVGbGFzaEluanVyZWQodGhpcy5nb25namlfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5nZXREYW1hZ2VOdW0oKT4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/mnKzmrKHmlLvlh7vmnInmlYhcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLnNoZXNob3VfamlhbnNoaV9hdHRfaGl0LHRoaXMuZ2V0SGVhZFBvcygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9ub2RlLnNjYWxlPW1vbnN0ZXJUcy5nZXRTaGVTaG91QXR0YWNrU2NhbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc19hdHQ9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkYXRhLmZlZWRiYWNrX3R5cGUhPUZlZWRCYWNrVHlwZS5EaWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBKaWFuU2hpX1R5cGUuc3VwZXI6e1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhPW1vbnN0ZXJUcy5iZUZsYXNoSW5qdXJlZCh0aGlzLmdvbmdqaV9kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhLmdldERhbWFnZU51bSgpPjApe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==