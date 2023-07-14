
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/KuangZhanShi/FuTou.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '57dceyW/9VIiLUm7S4uFYZ5', 'FuTou');
// Scripts/Hero/Game/KuangZhanShi/FuTou.ts

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
var FuTou = /** @class */ (function (_super) {
    __extends(FuTou, _super);
    function FuTou() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**原来的增伤数值 */
        _this.kuangre_num = 0;
        _this.is_penetrate = false;
        _this.futou_type = 0;
        _this.real_damage_num = 0;
        _this.penetration_num = 0;
        _this.old_skill_rate = 0;
        return _this;
    }
    FuTou.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addCollisionMonsterListen.call(this, this.onCollisionMonster);
        _super.prototype.addInitFinishedListen.call(this, this.onInitFinished);
    };
    FuTou.prototype.onInitFinished = function () {
        this.node.angle = 0;
        this.node.stopAllActions();
        cc.tween(this.node).by(1, { angle: -1440 }).repeatForever().start();
        this.penetration_num = 0;
        this.old_skill_rate = this.gongji_data.skill_damage_rate;
    };
    FuTou.prototype.initFuTou = function (kuangreNum, isP, futouType) {
        this.kuangre_num = kuangreNum;
        this.is_penetrate = isP;
        this.futou_type = futouType;
        this.real_damage_num = this.gongji_data.hero_data.total_attack * this.gongji_data.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_1) * this.kuangre_num;
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    FuTou.prototype.onCollisionMonster = function (monsterTs) {
        if (monsterTs) {
            switch (this.futou_type) {
                case 0:
                    {
                        var data = monsterTs.beFlashInjured(this.gongji_data);
                        if (data.getDamageNum() > 0) {
                            //额外真伤
                            if (data.is_die == false && this.kuangre_num > 0) {
                                monsterTs.beRealDamage(this.gongji_data, this.real_damage_num);
                            }
                            //本次攻击有效
                            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.kuangzhanshi_attack_hit, this.getHeadPos());
                        }
                        this.is_att = true;
                        this.destroySelf();
                    }
                    break;
                case 1:
                    {
                        this.is_att = false;
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
                            //额外真伤
                            if (data.is_die == false && this.kuangre_num > 0 && this.penetration_num == 0) {
                                monsterTs.beRealDamage(this.gongji_data, this.real_damage_num);
                            }
                            //本次攻击有效
                            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.kuangzhanshi_attack_chuantou, this.getHeadPos());
                        }
                    }
                    break;
            }
        }
    };
    FuTou = __decorate([
        ccclass
    ], FuTou);
    return FuTou;
}(Bullect_1.default));
exports.default = FuTou;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcS3VhbmdaaGFuU2hpXFxGdVRvdS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1RUFBb0Y7QUFJcEYsc0NBQWlDO0FBQ2pDLDRDQUF3RDtBQUVsRCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFtQyx5QkFBTztJQUExQztRQUFBLHFFQXdFQztRQXJFRyxhQUFhO1FBQ2IsaUJBQVcsR0FBUSxDQUFDLENBQUM7UUFDckIsa0JBQVksR0FBUyxLQUFLLENBQUM7UUFDM0IsZ0JBQVUsR0FBUSxDQUFDLENBQUM7UUFDcEIscUJBQWUsR0FBQyxDQUFDLENBQUM7UUFDbEIscUJBQWUsR0FBUSxDQUFDLENBQUM7UUFDekIsb0JBQWMsR0FBUSxDQUFDLENBQUM7O0lBK0Q1QixDQUFDO0lBN0RHLHNCQUFNLEdBQU47UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLGlCQUFNLHlCQUF5QixZQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3pELGlCQUFNLHFCQUFxQixZQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsOEJBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzNCLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2hFLElBQUksQ0FBQyxlQUFlLEdBQUMsQ0FBQyxDQUFDO1FB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eEVELEFBd0VDLENBeEVrQyxpQkFBTyxHQXdFekM7a0JBeEVvQixLQUFLIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IEdhbWVFZmZlY3RzTWFuYWdlciwgR2FtZUVmZmVjdElkIH0gZnJvbSBcIi4uLy4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuLi8uLi8uLi9Nb25zdGVyL01vbnN0ZXJcIjtcclxuaW1wb3J0IHsgRmVlZEJhY2tUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3RlckRhdGFcIjtcclxuaW1wb3J0IHsgR29uZ0ppRGF0YSB9IGZyb20gXCIuLi8uLi9EYXRhL0hlcm9EYXRhXCI7XHJcbmltcG9ydCBCdWxsZWN0IGZyb20gXCIuLi9CdWxsZWN0XCI7XHJcbmltcG9ydCB7IEppYW5TaGlfVHlwZSwgU2tpbGxUeXBlIH0gZnJvbSBcIi4uL0hlcm9Db25maWdcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnVUb3UgZXh0ZW5kcyBCdWxsZWN0IHtcclxuXHJcblxyXG4gICAgLyoq5Y6f5p2l55qE5aKe5Lyk5pWw5YC8ICovXHJcbiAgICBrdWFuZ3JlX251bTpudW1iZXI9MDtcclxuICAgIGlzX3BlbmV0cmF0ZTpib29sZWFuPWZhbHNlO1xyXG4gICAgZnV0b3VfdHlwZTpudW1iZXI9MDtcclxuICAgIHJlYWxfZGFtYWdlX251bT0wO1xyXG4gICAgcGVuZXRyYXRpb25fbnVtOm51bWJlcj0wO1xyXG4gICAgb2xkX3NraWxsX3JhdGU6bnVtYmVyPTA7XHJcblxyXG4gICAgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIHN1cGVyLmFkZENvbGxpc2lvbk1vbnN0ZXJMaXN0ZW4odGhpcy5vbkNvbGxpc2lvbk1vbnN0ZXIpO1xyXG4gICAgICAgIHN1cGVyLmFkZEluaXRGaW5pc2hlZExpc3Rlbih0aGlzLm9uSW5pdEZpbmlzaGVkKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgb25Jbml0RmluaXNoZWQoKXtcclxuICAgICAgICB0aGlzLm5vZGUuYW5nbGU9MDtcclxuICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLmJ5KDEse2FuZ2xlOi0xNDQwfSkucmVwZWF0Rm9yZXZlcigpLnN0YXJ0KCk7XHJcbiAgICAgICAgdGhpcy5wZW5ldHJhdGlvbl9udW09MDtcclxuICAgICAgICB0aGlzLm9sZF9za2lsbF9yYXRlPXRoaXMuZ29uZ2ppX2RhdGEuc2tpbGxfZGFtYWdlX3JhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEZ1VG91KGt1YW5ncmVOdW06bnVtYmVyLGlzUDpib29sZWFuLGZ1dG91VHlwZTpudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmt1YW5ncmVfbnVtPWt1YW5ncmVOdW07XHJcbiAgICAgICAgdGhpcy5pc19wZW5ldHJhdGU9aXNQO1xyXG4gICAgICAgIHRoaXMuZnV0b3VfdHlwZT1mdXRvdVR5cGU7XHJcbiAgICAgICAgdGhpcy5yZWFsX2RhbWFnZV9udW09dGhpcy5nb25namlfZGF0YS5oZXJvX2RhdGEudG90YWxfYXR0YWNrKnRoaXMuZ29uZ2ppX2RhdGEuaGVyb19kYXRhLmdldFNraWxsVmFsdWUxKFNraWxsVHlwZS5QYXNzaXZlXzEpKnRoaXMua3VhbmdyZV9udW07XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t56Kw5pKe5byA5aeLLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgb25Db2xsaXNpb25Nb25zdGVyKG1vbnN0ZXJUczpNb25zdGVyKSB7XHJcbiAgICAgICAgaWYobW9uc3RlclRzKXtcclxuICAgICAgICAgICAgc3dpdGNoKHRoaXMuZnV0b3VfdHlwZSl7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6e1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhPW1vbnN0ZXJUcy5iZUZsYXNoSW5qdXJlZCh0aGlzLmdvbmdqaV9kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhLmdldERhbWFnZU51bSgpPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+mineWkluecn+S8pFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkYXRhLmlzX2RpZT09ZmFsc2UmJnRoaXMua3VhbmdyZV9udW0+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyVHMuYmVSZWFsRGFtYWdlKHRoaXMuZ29uZ2ppX2RhdGEsdGhpcy5yZWFsX2RhbWFnZV9udW0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/mnKzmrKHmlLvlh7vmnInmlYhcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmt1YW5nemhhbnNoaV9hdHRhY2tfaGl0LHRoaXMuZ2V0SGVhZFBvcygpKTtcclxuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX2F0dD10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTp7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc19hdHQ9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/ooqvliqjmioDog70x55qE566t55+i77yM5Y+v5Lul56m/6YCP77yM5bm25LiU6aaW5Liq55uu5qCH5Lyk5a6z5aKe5YqgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5wZW5ldHJhdGlvbl9udW09PTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdvbmdqaV9kYXRhLnNraWxsX2RhbWFnZV9yYXRlPTE7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ29uZ2ppX2RhdGEuc2tpbGxfZGFtYWdlX3JhdGU9dGhpcy5vbGRfc2tpbGxfcmF0ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc19hdHQ9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wZW5ldHJhdGlvbl9udW0rKztcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YT1tb25zdGVyVHMuYmVGbGFzaEluanVyZWQodGhpcy5nb25namlfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5nZXREYW1hZ2VOdW0oKT4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/pop3lpJbnnJ/kvKRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5pc19kaWU9PWZhbHNlJiZ0aGlzLmt1YW5ncmVfbnVtPjAmJnRoaXMucGVuZXRyYXRpb25fbnVtPT0wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJUcy5iZVJlYWxEYW1hZ2UodGhpcy5nb25namlfZGF0YSx0aGlzLnJlYWxfZGFtYWdlX251bSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+acrOasoeaUu+WHu+acieaViFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQua3Vhbmd6aGFuc2hpX2F0dGFja19jaHVhbnRvdSx0aGlzLmdldEhlYWRQb3MoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==