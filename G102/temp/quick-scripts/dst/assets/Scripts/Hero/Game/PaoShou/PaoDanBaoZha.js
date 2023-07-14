
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/PaoShou/PaoDanBaoZha.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd1c58XkhklDMpV8tIs/Ejh0', 'PaoDanBaoZha');
// Scripts/Hero/Game/PaoShou/PaoDanBaoZha.ts

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
var BuffData_1 = require("../BuffData");
var GongJi_1 = require("../GongJi");
var HeroConfig_1 = require("../HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PaoDanBaoZha = /** @class */ (function (_super) {
    __extends(PaoDanBaoZha, _super);
    function PaoDanBaoZha() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.game_effect_id = GameEffectsManager_1.GameEffectId.Null;
        _this.paodan_type = HeroConfig_1.PaoDan_Type.skill;
        return _this;
    }
    PaoDanBaoZha.prototype.init = function (id, paodanType, gjData) {
        _super.prototype.initData.call(this, gjData);
        this.game_effect_id = id;
        this.paodan_type = paodanType;
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    PaoDanBaoZha.prototype.onCollisionEnter = function (other, self) {
        var gm = GameManager_1.default.getInstance();
        if (gm.cur_game_state == Constants_1.GameState.Game_Lose)
            return;
        var group = other.node.group;
        switch (group) {
            case 'enemy':
                {
                    var monsterTs = other.node.getComponent(Monster_1.default);
                    if (monsterTs) {
                        switch (this.paodan_type) {
                            case HeroConfig_1.PaoDan_Type.skill:
                                {
                                    var data = monsterTs.beFlashInjured(this.gongji_data);
                                    if (!data.is_die) {
                                    }
                                }
                                break;
                            case HeroConfig_1.PaoDan_Type.exclusive:
                                {
                                    var data = monsterTs.beFlashInjured(this.gongji_data);
                                    if (!data.is_die) {
                                        //眩晕概率
                                        // if(this.gongji_data.hero_data.hero_info.exclusive_equip_level>0){
                                        //     // monsterTs.addDeBuff(Enemy_DeBuff_Type.XuanYun,{
                                        //     //     remain_time: this.gongji_data.hero_data.ExclusiveWeaponSkillValue_2,
                                        //     //     damage_num: 0,
                                        //     //     jiange_time: 1,
                                        //     //     hero_type: this.gongji_data.hero_type,
                                        //     // },this.gongji_data)
                                        //     let buffData=new BuffData();
                                        //     buffData.buff_id=BuffId.Hero_XuanYun;
                                        //     buffData.buff_type=BuffType.Vertigo;
                                        //     buffData.buff_value=[0];
                                        //     buffData.remain_time=this.gongji_data.hero_data.ExclusiveWeaponSkillValue_2;
                                        //     buffData.game_effect_id=GameEffectId.xuanyun;
                                        //     monsterTs.addDeBuff(buffData,this.gongji_data);
                                        // }                                
                                    }
                                }
                                break;
                            case HeroConfig_1.PaoDan_Type.super: {
                                var data = monsterTs.beFlashInjured(this.gongji_data);
                                if (!data.is_die) {
                                    //被弹开
                                    // let monsterPos=monsterTs.node.getPosition();
                                    // let offsetPos=monsterPos.sub(this.node.getPosition());
                                    // let distance=150-(offsetPos.mag()+Math.random()*40-20);
                                    // if(distance<0){
                                    //     distance=0;
                                    // }
                                    // let dir=Math.atan2(offsetPos.y,offsetPos.x);
                                    // let xx=Math.cos(dir)*(distance);
                                    // let yy=Math.sin(dir)*(distance);
                                    // if(xx+monsterTs.node.x>192){
                                    //     xx=192-monsterTs.node.x;
                                    // }
                                    // if(xx+monsterTs.node.x<-192){
                                    //     xx=-192-monsterTs.node.x;
                                    // }
                                    // cc.tween(monsterTs.node).by(distance/150*0.3,{x:xx,y:yy},{easing:'sineIn'}).call(()=>{
                                    //     monsterTs.addDeBuff(Enemy_DeBuff_Type.XuanYun,{
                                    //         remain_time: 0.5,
                                    //         damage_num: 0,
                                    //         jiange_time: 1,
                                    //         hero_type: this.gongji_data.hero_type,
                                    //     },this.gongji_data)
                                    // }).start();
                                    // monsterTs.addDeBuff(Enemy_DeBuff_Type.XuanYun,{
                                    //     remain_time: 0.5,
                                    //     damage_num: 0,
                                    //     jiange_time: 1,
                                    //     hero_type: this.gongji_data.hero_type,
                                    // },this.gongji_data)
                                    var buffData = new BuffData_1.BuffData();
                                    buffData.buff_id = HeroConfig_1.BuffId.Hero_XuanYun;
                                    buffData.buff_type = HeroConfig_1.BuffType.Vertigo;
                                    buffData.buff_value = [0];
                                    buffData.remain_time = 0.5;
                                    buffData.game_effect_id = GameEffectsManager_1.GameEffectId.xuanyun;
                                    monsterTs.addDeBuff(buffData, this.gongji_data);
                                }
                            }
                        }
                    }
                }
                break;
        }
    };
    PaoDanBaoZha = __decorate([
        ccclass
    ], PaoDanBaoZha);
    return PaoDanBaoZha;
}(GongJi_1.default));
exports.default = PaoDanBaoZha;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcUGFvU2hvdVxcUGFvRGFuQmFvWmhhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGdEQUErQztBQUUvQyx1RUFBZ0U7QUFDaEUsb0RBQStDO0FBQy9DLG9EQUErQztBQUUvQyx3Q0FBdUM7QUFDdkMsb0NBQStCO0FBQy9CLDRDQUF5RTtBQUduRSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUEwQyxnQ0FBTTtJQUFoRDtRQUFBLHFFQWdHQztRQTlGRyxvQkFBYyxHQUFjLGlDQUFZLENBQUMsSUFBSSxDQUFDO1FBQzlDLGlCQUFXLEdBQWEsd0JBQVcsQ0FBQyxLQUFLLENBQUM7O0lBNkY5QyxDQUFDO0lBM0ZHLDJCQUFJLEdBQUosVUFBSyxFQUFlLEVBQUMsVUFBc0IsRUFBQyxNQUFpQjtRQUN6RCxpQkFBTSxRQUFRLFlBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLGNBQWMsR0FBQyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBQyxVQUFVLENBQUM7SUFDaEMsQ0FBQztJQUVELGtHQUFrRztJQUNsRyx1Q0FBZ0IsR0FBaEIsVUFBaUIsS0FBaUIsRUFBQyxJQUFnQjtRQUMvQyxJQUFJLEVBQUUsR0FBQyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2pDLElBQUcsRUFBRSxDQUFDLGNBQWMsSUFBRSxxQkFBUyxDQUFDLFNBQVM7WUFDckMsT0FBTztRQUNYLElBQUksS0FBSyxHQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzNCLFFBQU8sS0FBSyxFQUFDO1lBQ1QsS0FBSyxPQUFPO2dCQUFDO29CQUNULElBQUksU0FBUyxHQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFPLENBQUMsQ0FBQztvQkFDL0MsSUFBRyxTQUFTLEVBQUM7d0JBQ1QsUUFBTyxJQUFJLENBQUMsV0FBVyxFQUFDOzRCQUNwQixLQUFLLHdCQUFXLENBQUMsS0FBSztnQ0FBQztvQ0FDbkIsSUFBSSxJQUFJLEdBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7b0NBQ3BELElBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDO3FDQUVmO2lDQUNKO2dDQUFBLE1BQU07NEJBQ1AsS0FBSyx3QkFBVyxDQUFDLFNBQVM7Z0NBQUM7b0NBQ3ZCLElBQUksSUFBSSxHQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29DQUNwRCxJQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQzt3Q0FDWixNQUFNO3dDQUNOLG9FQUFvRTt3Q0FDcEUseURBQXlEO3dDQUN6RCxrRkFBa0Y7d0NBQ2xGLDRCQUE0Qjt3Q0FDNUIsNkJBQTZCO3dDQUM3QixvREFBb0Q7d0NBQ3BELDZCQUE2Qjt3Q0FDN0IsbUNBQW1DO3dDQUNuQyw0Q0FBNEM7d0NBQzVDLDJDQUEyQzt3Q0FDM0MsK0JBQStCO3dDQUMvQixtRkFBbUY7d0NBQ25GLG9EQUFvRDt3Q0FDcEQsc0RBQXNEO3dDQUN0RCxvQ0FBb0M7cUNBQ3ZDO2lDQUNKO2dDQUFBLE1BQU07NEJBQ1AsS0FBSyx3QkFBVyxDQUFDLEtBQUssQ0FBQyxDQUFBO2dDQUNuQixJQUFJLElBQUksR0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQ0FDcEQsSUFBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7b0NBQ2IsS0FBSztvQ0FDTCwrQ0FBK0M7b0NBQy9DLHlEQUF5RDtvQ0FDekQsMERBQTBEO29DQUMxRCxrQkFBa0I7b0NBQ2xCLGtCQUFrQjtvQ0FDbEIsSUFBSTtvQ0FDSiwrQ0FBK0M7b0NBQy9DLG1DQUFtQztvQ0FDbkMsbUNBQW1DO29DQUNuQywrQkFBK0I7b0NBQy9CLCtCQUErQjtvQ0FDL0IsSUFBSTtvQ0FDSixnQ0FBZ0M7b0NBQ2hDLGdDQUFnQztvQ0FDaEMsSUFBSTtvQ0FDSix5RkFBeUY7b0NBQ3pGLHNEQUFzRDtvQ0FDdEQsNEJBQTRCO29DQUM1Qix5QkFBeUI7b0NBQ3pCLDBCQUEwQjtvQ0FDMUIsaURBQWlEO29DQUNqRCwwQkFBMEI7b0NBQzFCLGNBQWM7b0NBQ2Qsa0RBQWtEO29DQUNsRCx3QkFBd0I7b0NBQ3hCLHFCQUFxQjtvQ0FDckIsc0JBQXNCO29DQUN0Qiw2Q0FBNkM7b0NBQzdDLHNCQUFzQjtvQ0FDdEIsSUFBSSxRQUFRLEdBQUMsSUFBSSxtQkFBUSxFQUFFLENBQUM7b0NBQzVCLFFBQVEsQ0FBQyxPQUFPLEdBQUMsbUJBQU0sQ0FBQyxZQUFZLENBQUM7b0NBQ3JDLFFBQVEsQ0FBQyxTQUFTLEdBQUMscUJBQVEsQ0FBQyxPQUFPLENBQUM7b0NBQ3BDLFFBQVEsQ0FBQyxVQUFVLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQ0FDeEIsUUFBUSxDQUFDLFdBQVcsR0FBQyxHQUFHLENBQUM7b0NBQ3pCLFFBQVEsQ0FBQyxjQUFjLEdBQUMsaUNBQVksQ0FBQyxPQUFPLENBQUM7b0NBQzdDLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztpQ0FDbEQ7NkJBQ0o7eUJBQ0o7cUJBQ0o7aUJBQ0o7Z0JBQUEsTUFBTTtTQUNWO0lBQ0wsQ0FBQztJQS9GZ0IsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQWdHaEM7SUFBRCxtQkFBQztDQWhHRCxBQWdHQyxDQWhHeUMsZ0JBQU0sR0FnRy9DO2tCQWhHb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBHYW1lU3RhdGUgfSBmcm9tIFwiLi4vLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEVuZW15X0RlQnVmZl9UeXBlIH0gZnJvbSBcIi4uLy4uLy4uL0VuZW15L0VuZW15Q29uZmlnXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCB9IGZyb20gXCIuLi8uLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuLi8uLi8uLi9Nb25zdGVyL01vbnN0ZXJcIjtcclxuaW1wb3J0IHsgR29uZ0ppRGF0YSB9IGZyb20gXCIuLi8uLi9EYXRhL0hlcm9EYXRhXCI7XHJcbmltcG9ydCB7IEJ1ZmZEYXRhIH0gZnJvbSBcIi4uL0J1ZmZEYXRhXCI7XHJcbmltcG9ydCBHb25nSmkgZnJvbSBcIi4uL0dvbmdKaVwiO1xyXG5pbXBvcnQgeyBCdWZmSWQsIEJ1ZmZUeXBlLCBQYW9EYW5fVHlwZSwgU2tpbGxUeXBlIH0gZnJvbSBcIi4uL0hlcm9Db25maWdcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhb0RhbkJhb1poYSBleHRlbmRzIEdvbmdKaSB7XHJcblxyXG4gICAgZ2FtZV9lZmZlY3RfaWQ6R2FtZUVmZmVjdElkPUdhbWVFZmZlY3RJZC5OdWxsOyAgICBcclxuICAgIHBhb2Rhbl90eXBlOlBhb0Rhbl9UeXBlPVBhb0Rhbl9UeXBlLnNraWxsO1xyXG5cclxuICAgIGluaXQoaWQ6R2FtZUVmZmVjdElkLHBhb2RhblR5cGU6UGFvRGFuX1R5cGUsZ2pEYXRhOkdvbmdKaURhdGEpe1xyXG4gICAgICAgIHN1cGVyLmluaXREYXRhKGdqRGF0YSk7XHJcbiAgICAgICAgdGhpcy5nYW1lX2VmZmVjdF9pZD1pZDtcclxuICAgICAgICB0aGlzLnBhb2Rhbl90eXBlPXBhb2RhblR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t56Kw5pKe5byA5aeLLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgb25Db2xsaXNpb25FbnRlcihvdGhlcjpjYy5Db2xsaWRlcixzZWxmOmNjLkNvbGxpZGVyKSB7XHJcbiAgICAgICAgbGV0IGdtPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7ICAgICAgICBcclxuICAgICAgICBpZihnbS5jdXJfZ2FtZV9zdGF0ZT09R2FtZVN0YXRlLkdhbWVfTG9zZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCBncm91cD1vdGhlci5ub2RlLmdyb3VwO1xyXG4gICAgICAgIHN3aXRjaChncm91cCl7XHJcbiAgICAgICAgICAgIGNhc2UgJ2VuZW15Jzp7XHJcbiAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclRzPW90aGVyLm5vZGUuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYobW9uc3RlclRzKXtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2godGhpcy5wYW9kYW5fdHlwZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUGFvRGFuX1R5cGUuc2tpbGw6eyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhPW1vbnN0ZXJUcy5iZUZsYXNoSW5qdXJlZCh0aGlzLmdvbmdqaV9kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFkYXRhLmlzX2RpZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUGFvRGFuX1R5cGUuZXhjbHVzaXZlOnsgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YT1tb25zdGVyVHMuYmVGbGFzaEluanVyZWQodGhpcy5nb25namlfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighZGF0YS5pc19kaWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v55yp5pmV5qaC546HXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYodGhpcy5nb25namlfZGF0YS5oZXJvX2RhdGEuaGVyb19pbmZvLmV4Y2x1c2l2ZV9lcXVpcF9sZXZlbD4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy8gbW9uc3RlclRzLmFkZERlQnVmZihFbmVteV9EZUJ1ZmZfVHlwZS5YdWFuWXVuLHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy8gICAgIHJlbWFpbl90aW1lOiB0aGlzLmdvbmdqaV9kYXRhLmhlcm9fZGF0YS5FeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlXzIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIC8vICAgICBkYW1hZ2VfbnVtOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAvLyAgICAgamlhbmdlX3RpbWU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIC8vICAgICBoZXJvX3R5cGU6IHRoaXMuZ29uZ2ppX2RhdGEuaGVyb190eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAvLyB9LHRoaXMuZ29uZ2ppX2RhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGxldCBidWZmRGF0YT1uZXcgQnVmZkRhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgYnVmZkRhdGEuYnVmZl9pZD1CdWZmSWQuSGVyb19YdWFuWXVuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBidWZmRGF0YS5idWZmX3R5cGU9QnVmZlR5cGUuVmVydGlnbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgYnVmZkRhdGEuYnVmZl92YWx1ZT1bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lPXRoaXMuZ29uZ2ppX2RhdGEuaGVyb19kYXRhLkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQ9R2FtZUVmZmVjdElkLnh1YW55dW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIG1vbnN0ZXJUcy5hZGREZUJ1ZmYoYnVmZkRhdGEsdGhpcy5nb25namlfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBQYW9EYW5fVHlwZS5zdXBlcjp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YT1tb25zdGVyVHMuYmVGbGFzaEluanVyZWQodGhpcy5nb25namlfZGF0YSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWRhdGEuaXNfZGllICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/ooqvlvLnlvIBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQgbW9uc3RlclBvcz1tb25zdGVyVHMubm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCBvZmZzZXRQb3M9bW9uc3RlclBvcy5zdWIodGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCBkaXN0YW5jZT0xNTAtKG9mZnNldFBvcy5tYWcoKStNYXRoLnJhbmRvbSgpKjQwLTIwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZihkaXN0YW5jZTwwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgZGlzdGFuY2U9MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGRpcj1NYXRoLmF0YW4yKG9mZnNldFBvcy55LG9mZnNldFBvcy54KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQgeHg9TWF0aC5jb3MoZGlyKSooZGlzdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCB5eT1NYXRoLnNpbihkaXIpKihkaXN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYoeHgrbW9uc3RlclRzLm5vZGUueD4xOTIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB4eD0xOTItbW9uc3RlclRzLm5vZGUueDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYoeHgrbW9uc3RlclRzLm5vZGUueDwtMTkyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgeHg9LTE5Mi1tb25zdGVyVHMubm9kZS54O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjYy50d2Vlbihtb25zdGVyVHMubm9kZSkuYnkoZGlzdGFuY2UvMTUwKjAuMyx7eDp4eCx5Onl5fSx7ZWFzaW5nOidzaW5lSW4nfSkuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBtb25zdGVyVHMuYWRkRGVCdWZmKEVuZW15X0RlQnVmZl9UeXBlLlh1YW5ZdW4se1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgcmVtYWluX3RpbWU6IDAuNSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGRhbWFnZV9udW06IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBqaWFuZ2VfdGltZTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGhlcm9fdHlwZTogdGhpcy5nb25namlfZGF0YS5oZXJvX3R5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIH0sdGhpcy5nb25namlfZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1vbnN0ZXJUcy5hZGREZUJ1ZmYoRW5lbXlfRGVCdWZmX1R5cGUuWHVhbll1bix7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHJlbWFpbl90aW1lOiAwLjUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGRhbWFnZV9udW06IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGppYW5nZV90aW1lOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBoZXJvX3R5cGU6IHRoaXMuZ29uZ2ppX2RhdGEuaGVyb190eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0sdGhpcy5nb25namlfZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYnVmZkRhdGE9bmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl9pZD1CdWZmSWQuSGVyb19YdWFuWXVuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfdHlwZT1CdWZmVHlwZS5WZXJ0aWdvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfdmFsdWU9WzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lPTAuNTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5nYW1lX2VmZmVjdF9pZD1HYW1lRWZmZWN0SWQueHVhbnl1bjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyVHMuYWRkRGVCdWZmKGJ1ZmZEYXRhLHRoaXMuZ29uZ2ppX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1icmVhazsgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=