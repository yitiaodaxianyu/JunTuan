
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/ShouWang/ShouWangJianShi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '260f4TkqS5Ej7yfCmFaCfyx', 'ShouWangJianShi');
// Scripts/Hero/Game/ShouWang/ShouWangJianShi.ts

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
var Bullect_1 = require("../Bullect");
var HeroConfig_1 = require("../HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShouWangJianShi = /** @class */ (function (_super) {
    __extends(ShouWangJianShi, _super);
    function ShouWangJianShi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.jianshi_type = HeroConfig_1.JianShi_Type.putong;
        /**穿透数量 */
        _this.penetration_num = 0;
        /**原来的增伤数值 */
        _this.old_skill_rate = 0;
        return _this;
    }
    ShouWangJianShi.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addCollisionMonsterListen.call(this, this.onCollisionMonster);
        _super.prototype.addInitFinishedListen.call(this, this.onInitFinished);
    };
    ShouWangJianShi.prototype.onInitFinished = function () {
        this.penetration_num = 0;
        this.old_skill_rate = this.gongji_data.skill_damage_rate;
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    ShouWangJianShi.prototype.onCollisionMonster = function (monsterTs) {
        if (monsterTs) {
            switch (this.jianshi_type) {
                case HeroConfig_1.JianShi_Type.putong:
                    {
                        var data = monsterTs.beFlashInjured(this.gongji_data);
                        if (data.getDamageNum() > 0) {
                            //本次攻击有效
                            var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.sheshou_jianshi_att_hit, this.getHeadPos());
                            //node.scale=monsterTs.getSheShouAttackScale();                            
                        }
                        this.is_att = true;
                        this.destroySelf();
                    }
                    break;
                case HeroConfig_1.JianShi_Type.jineng:
                    {
                        //被动技能1的箭矢，可以穿透，并且首个目标伤害增加
                        if (this.penetration_num == 0) {
                            this.gongji_data.skill_damage_rate = 1;
                        }
                        else {
                            this.gongji_data.skill_damage_rate = this.old_skill_rate;
                        }
                        this.is_att = false;
                        this.penetration_num++;
                        var data = monsterTs.beFlashInjured(this.gongji_data);
                        if (data.getDamageNum() > 0) {
                            //本次攻击有效
                            var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.shou_wang_jianshi_skill1_hit, this.getHeadPos());
                            //node.scale=monsterTs.getSheShouAttackScale();
                        }
                    }
                    break;
            }
        }
    };
    __decorate([
        property({ type: cc.Enum(HeroConfig_1.JianShi_Type) })
    ], ShouWangJianShi.prototype, "jianshi_type", void 0);
    ShouWangJianShi = __decorate([
        ccclass
    ], ShouWangJianShi);
    return ShouWangJianShi;
}(Bullect_1.default));
exports.default = ShouWangJianShi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcU2hvdVdhbmdcXFNob3VXYW5nSmlhblNoaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1RUFBb0Y7QUFHcEYsc0NBQWlDO0FBQ2pDLDRDQUF3RDtBQUVsRCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE2QyxtQ0FBTztJQUFwRDtRQUFBLHFFQXdEQztRQXJERyxrQkFBWSxHQUFjLHlCQUFZLENBQUMsTUFBTSxDQUFDO1FBRTlDLFVBQVU7UUFDVixxQkFBZSxHQUFRLENBQUMsQ0FBQztRQUN6QixhQUFhO1FBQ2Isb0JBQWMsR0FBUSxDQUFDLENBQUM7O0lBZ0Q1QixDQUFDO0lBOUNHLGdDQUFNLEdBQU47UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLGlCQUFNLHlCQUF5QixZQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3pELGlCQUFNLHFCQUFxQixZQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsd0NBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxlQUFlLEdBQUMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQztJQUMzRCxDQUFDO0lBRUQsa0dBQWtHO0lBQ2xHLDRDQUFrQixHQUFsQixVQUFtQixTQUFpQjtRQUNoQyxJQUFHLFNBQVMsRUFBQztZQUNULFFBQU8sSUFBSSxDQUFDLFlBQVksRUFBQztnQkFDckIsS0FBSyx5QkFBWSxDQUFDLE1BQU07b0JBQUM7d0JBQ3JCLElBQUksSUFBSSxHQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUNwRCxJQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBQyxDQUFDLEVBQUM7NEJBQ3JCLFFBQVE7NEJBQ1IsSUFBSSxJQUFJLEdBQUMsdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsaUNBQVksQ0FBQyx1QkFBdUIsRUFBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQzs0QkFDdkgsMkVBQTJFO3lCQUM5RTt3QkFDRCxJQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQzt3QkFDakIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO3FCQUN0QjtvQkFBQSxNQUFNO2dCQUNQLEtBQUsseUJBQVksQ0FBQyxNQUFNO29CQUFDO3dCQUNyQiwwQkFBMEI7d0JBQzFCLElBQUcsSUFBSSxDQUFDLGVBQWUsSUFBRSxDQUFDLEVBQUM7NEJBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEdBQUMsQ0FBQyxDQUFDO3lCQUN4Qzs2QkFBSTs0QkFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixHQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7eUJBQzFEO3dCQUNELElBQUksQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFDO3dCQUNsQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7d0JBQ3ZCLElBQUksSUFBSSxHQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUNwRCxJQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBQyxDQUFDLEVBQUM7NEJBQ3JCLFFBQVE7NEJBQ1IsSUFBSSxJQUFJLEdBQUMsdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsaUNBQVksQ0FBQyw0QkFBNEIsRUFBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQzs0QkFDNUgsK0NBQStDO3lCQUNsRDtxQkFDSjtvQkFBQSxNQUFNO2FBRVY7U0FFSjtJQUNMLENBQUM7SUFwREQ7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyx5QkFBWSxDQUFDLEVBQUMsQ0FBQzt5REFDTztJQUg3QixlQUFlO1FBRG5DLE9BQU87T0FDYSxlQUFlLENBd0RuQztJQUFELHNCQUFDO0NBeERELEFBd0RDLENBeEQ0QyxpQkFBTyxHQXdEbkQ7a0JBeERvQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IEdhbWVFZmZlY3RzTWFuYWdlciwgR2FtZUVmZmVjdElkIH0gZnJvbSBcIi4uLy4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuLi8uLi8uLi9Nb25zdGVyL01vbnN0ZXJcIjtcclxuaW1wb3J0IHsgRmVlZEJhY2tUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3RlckRhdGFcIjtcclxuaW1wb3J0IEJ1bGxlY3QgZnJvbSBcIi4uL0J1bGxlY3RcIjtcclxuaW1wb3J0IHsgSmlhblNoaV9UeXBlLCBTa2lsbFR5cGUgfSBmcm9tIFwiLi4vSGVyb0NvbmZpZ1wiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG91V2FuZ0ppYW5TaGkgZXh0ZW5kcyBCdWxsZWN0IHtcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuRW51bShKaWFuU2hpX1R5cGUpfSlcclxuICAgIGppYW5zaGlfdHlwZTpKaWFuU2hpX1R5cGU9SmlhblNoaV9UeXBlLnB1dG9uZzsgICAgXHJcblxyXG4gICAgLyoq56m/6YCP5pWw6YePICovXHJcbiAgICBwZW5ldHJhdGlvbl9udW06bnVtYmVyPTA7XHJcbiAgICAvKirljp/mnaXnmoTlop7kvKTmlbDlgLwgKi9cclxuICAgIG9sZF9za2lsbF9yYXRlOm51bWJlcj0wO1xyXG5cclxuICAgIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICBzdXBlci5hZGRDb2xsaXNpb25Nb25zdGVyTGlzdGVuKHRoaXMub25Db2xsaXNpb25Nb25zdGVyKTtcclxuICAgICAgICBzdXBlci5hZGRJbml0RmluaXNoZWRMaXN0ZW4odGhpcy5vbkluaXRGaW5pc2hlZCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG9uSW5pdEZpbmlzaGVkKCl7XHJcbiAgICAgICAgdGhpcy5wZW5ldHJhdGlvbl9udW09MDtcclxuICAgICAgICB0aGlzLm9sZF9za2lsbF9yYXRlPXRoaXMuZ29uZ2ppX2RhdGEuc2tpbGxfZGFtYWdlX3JhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t56Kw5pKe5byA5aeLLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgb25Db2xsaXNpb25Nb25zdGVyKG1vbnN0ZXJUczpNb25zdGVyKSB7XHJcbiAgICAgICAgaWYobW9uc3RlclRzKXtcclxuICAgICAgICAgICAgc3dpdGNoKHRoaXMuamlhbnNoaV90eXBlKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgSmlhblNoaV9UeXBlLnB1dG9uZzp7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGE9bW9uc3RlclRzLmJlRmxhc2hJbmp1cmVkKHRoaXMuZ29uZ2ppX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEuZ2V0RGFtYWdlTnVtKCk+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5pys5qyh5pS75Ye75pyJ5pWIXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBub2RlPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5zaGVzaG91X2ppYW5zaGlfYXR0X2hpdCx0aGlzLmdldEhlYWRQb3MoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbm9kZS5zY2FsZT1tb25zdGVyVHMuZ2V0U2hlU2hvdUF0dGFja1NjYWxlKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX2F0dD10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgSmlhblNoaV9UeXBlLmppbmVuZzp7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/ooqvliqjmioDog70x55qE566t55+i77yM5Y+v5Lul56m/6YCP77yM5bm25LiU6aaW5Liq55uu5qCH5Lyk5a6z5aKe5YqgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5wZW5ldHJhdGlvbl9udW09PTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdvbmdqaV9kYXRhLnNraWxsX2RhbWFnZV9yYXRlPTE7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ29uZ2ppX2RhdGEuc2tpbGxfZGFtYWdlX3JhdGU9dGhpcy5vbGRfc2tpbGxfcmF0ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc19hdHQ9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wZW5ldHJhdGlvbl9udW0rKztcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YT1tb25zdGVyVHMuYmVGbGFzaEluanVyZWQodGhpcy5nb25namlfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5nZXREYW1hZ2VOdW0oKT4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/mnKzmrKHmlLvlh7vmnInmlYhcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLnNob3Vfd2FuZ19qaWFuc2hpX3NraWxsMV9oaXQsdGhpcy5nZXRIZWFkUG9zKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL25vZGUuc2NhbGU9bW9uc3RlclRzLmdldFNoZVNob3VBdHRhY2tTY2FsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=