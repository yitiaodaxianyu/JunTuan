
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/BingNv/BingNvWall.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '19b10DTiuBHbLhxlh/3JxKB', 'BingNvWall');
// Scripts/Hero/Game/BingNv/BingNvWall.ts

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
var Wall_1 = require("../../../Wall/Wall");
var WallConfig_1 = require("../../../Wall/WallConfig");
var WallManager_1 = require("../../../Wall/WallManager");
var BuffData_1 = require("../BuffData");
var HeroConfig_1 = require("../HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BingNvWall = /** @class */ (function (_super) {
    __extends(BingNvWall, _super);
    function BingNvWall() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gongji_data = null;
        _this.is_destroy = false;
        _this.self_rect = null;
        _this.wall_id = WallConfig_1.WallType.BingNvWall;
        /**城墙持续时间，针对除了主城墙之外的城墙 */
        _this.remain_time = 0;
        return _this;
    }
    BingNvWall.prototype.init = function (gjData, pos, remainTime, wallId) {
        if (wallId === void 0) { wallId = WallConfig_1.WallType.BingNvWall; }
        gjData.hero_data.Health = gjData.hero_data.total_hp * (gjData.hero_data.getSkillValue2(HeroConfig_1.SkillType.Active));
        this.gongji_data = gjData;
        this.node.setPosition(cc.v2(0, pos.y));
        this.node.zIndex = (Math.round(8000 - this.node.y * 10));
        this.is_destroy = false;
        this.remain_time = remainTime;
        this.wall_id = wallId;
        this.node.getComponent(cc.Collider).enabled = false;
        if (this.checkJiTui(pos)) {
            this.node.getComponent(cc.Collider).enabled = true;
            _super.prototype.initWall.call(this, this.gongji_data.hero_data, WallConfig_1.WallType.BingNvWall);
            _super.prototype.setWallDieListen.call(this, this.onWallDie.bind(this));
            _super.prototype.setDamageListen.call(this, this.onDamage.bind(this));
            this.scheduleOnce(this.destroySelf, this.gongji_data.hero_data.getSkillValue1(HeroConfig_1.SkillType.Active));
        }
    };
    /*检测能被击退的敌人*/
    BingNvWall.prototype.checkJiTui = function (pos) {
        this.self_rect = cc.rect(-cc.winSize.width / 2, pos.y - 120 / 2, cc.winSize.width, 120);
        _super.prototype.setWallRect.call(this, this.self_rect);
        //击退专用范围
        var jituiRect = cc.rect(-cc.winSize.width / 2, pos.y - 200 / 2, cc.winSize.width, 200);
        var bnWall = MonsterManager_1.default.getInstance().getMonstersForBingNvWallRect(jituiRect);
        //专武造成伤害
        var exDamage = 0;
        var ex1 = this.gongji_data.hero_data.ExclusiveWeaponSkillValue_1;
        if (ex1 && ex1 > 0) {
            exDamage = ex1;
        }
        // if(IsDebug){
        //     exDamage=100;
        // }
        if (bnWall.boss_ts) {
            //销毁
            this.destroySelf();
            if (exDamage > 0) {
                var exData = cc.instantiate(this.gongji_data);
                exData.skill_damage_rate = exDamage;
                bnWall.boss_ts.beFlashInjured(exData);
            }
            return false;
        }
        else {
            //击退
            var allMonsters = bnWall.back_monsters;
            var jituiAct = 0.15;
            for (var i = 0; i < allMonsters.length; i++) {
                var monsterTs = allMonsters[i].getComponent(Monster_1.default);
                cc.tween(monsterTs.node).to(jituiAct, { y: pos.y + 120 / 2 + Math.random() * 70 }).start();
                var buffData = new BuffData_1.BuffData();
                buffData.buff_id = HeroConfig_1.BuffId.Hero_XuanYun;
                buffData.buff_type = HeroConfig_1.BuffType.Vertigo;
                buffData.buff_value = [0];
                buffData.remain_time = jituiAct + 0.2;
                buffData.game_effect_id = GameEffectsManager_1.GameEffectId.xuanyun;
                monsterTs.addDeBuff(buffData, this.gongji_data);
                if (exDamage > 0) {
                    var exData = cc.instantiate(this.gongji_data);
                    exData.skill_damage_rate = exDamage;
                    monsterTs.beFlashInjured(exData);
                }
            }
            this.node.getComponent(sp.Skeleton).setAnimation(0, 'BingNv_Skill_Start', false);
            WallManager_1.default.getInstance().addWall(this.wall_id, this);
            return true;
        }
    };
    /**城墙受到普通攻击时，反弹伤害 */
    BingNvWall.prototype.onDamage = function (monsterTs) {
        var fantanData = cc.instantiate(this.gongji_data);
        fantanData.skill_damage_rate = this.gongji_data.hero_data.getSkillValue3(HeroConfig_1.SkillType.Active);
        monsterTs.beFlashInjured(this.gongji_data);
    };
    BingNvWall.prototype.destroySelf = function () {
        var _this = this;
        //播放动画
        if (this.is_destroy) {
            return;
        }
        this.node.getComponent(cc.Collider).enabled = false;
        this.is_destroy = true;
        var spine = this.node.getComponent(sp.Skeleton);
        spine.setAnimation(0, 'BingNv_Skill_End', false);
        spine.setCompleteListener(function () {
            spine.setCompleteListener(null);
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.bing_nv_active_skill_wall, _this.node);
        });
        WallManager_1.default.getInstance().removeWall(this.wall_id);
        this.unschedule(this.destroySelf);
    };
    BingNvWall.prototype.getRect = function () {
        return this.self_rect;
    };
    BingNvWall.prototype.onWallDie = function () {
        this.destroySelf();
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    BingNvWall.prototype.onCollisionEnter = function (other, self) {
        var gm = GameManager_1.default.getInstance();
        var group = other.node.group;
        switch (group) {
            case 'boss_body':
                {
                    //一碰就会碎
                    this.destroySelf();
                }
                break;
        }
    };
    BingNvWall = __decorate([
        ccclass
    ], BingNvWall);
    return BingNvWall;
}(Wall_1.default));
exports.default = BingNvWall;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcQmluZ052XFxCaW5nTnZXYWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVFQUFvRjtBQUVwRixvREFBK0M7QUFDL0Msb0RBQStDO0FBQy9DLGtFQUE2RDtBQUM3RCwyQ0FBc0M7QUFDdEMsdURBQW9EO0FBQ3BELHlEQUFvRDtBQUVwRCx3Q0FBdUM7QUFFdkMsNENBQTREO0FBR3RELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXdDLDhCQUFJO0lBQTVDO1FBQUEscUVBMkhDO1FBekhHLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRTVCLGdCQUFVLEdBQVMsS0FBSyxDQUFDO1FBQ2pCLGVBQVMsR0FBUyxJQUFJLENBQUM7UUFDL0IsYUFBTyxHQUFVLHFCQUFRLENBQUMsVUFBVSxDQUFDO1FBRXJDLHlCQUF5QjtRQUN6QixpQkFBVyxHQUFRLENBQUMsQ0FBQzs7SUFrSHpCLENBQUM7SUFoSEcseUJBQUksR0FBSixVQUFLLE1BQWlCLEVBQUMsR0FBVyxFQUFDLFVBQWlCLEVBQUMsTUFBbUM7UUFBbkMsdUJBQUEsRUFBQSxTQUFnQixxQkFBUSxDQUFDLFVBQVU7UUFFcEYsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxzQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDdEcsSUFBSSxDQUFDLFdBQVcsR0FBQyxNQUFNLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsSUFB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QUFDO1lBQ3RCLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQyx1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxpQ0FBWSxDQUFDLHlCQUF5QixFQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3RyxDQUFDLENBQUMsQ0FBQztRQUNILHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsNEJBQU8sR0FBUDtRQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsOEJBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsa0dBQWtHO0lBQ2xHLHFDQUFnQixHQUFoQixVQUFpQixLQUFpQixFQUFDLElBQWdCO1FBQy9DLElBQUksRUFBRSxHQUFDLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDakMsSUFBSSxLQUFLLEdBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDM0IsUUFBTyxLQUFLLEVBQUM7WUFDVCxLQUFLLFdBQVc7Z0JBQUM7b0JBQ2IsT0FBTztvQkFDUCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQ3RCO2dCQUFBLE1BQU07U0FDVjtJQUNMLENBQUM7SUExSGdCLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0EySDlCO0lBQUQsaUJBQUM7Q0EzSEQsQUEySEMsQ0EzSHVDLGNBQUksR0EySDNDO2tCQTNIb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVTdGF0ZSwgSXNEZWJ1ZyB9IGZyb20gXCIuLi8uLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdElkLCBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IFNraWxsTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZS9Ta2lsbE1hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgV2FsbCBmcm9tIFwiLi4vLi4vLi4vV2FsbC9XYWxsXCI7XHJcbmltcG9ydCB7IFdhbGxUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL1dhbGwvV2FsbENvbmZpZ1wiO1xyXG5pbXBvcnQgV2FsbE1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL1dhbGwvV2FsbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgR29uZ0ppRGF0YSB9IGZyb20gXCIuLi8uLi9EYXRhL0hlcm9EYXRhXCI7XHJcbmltcG9ydCB7IEJ1ZmZEYXRhIH0gZnJvbSBcIi4uL0J1ZmZEYXRhXCI7XHJcbmltcG9ydCBHb25nSmkgZnJvbSBcIi4uL0dvbmdKaVwiO1xyXG5pbXBvcnQgeyBCdWZmSWQsIEJ1ZmZUeXBlLCBTa2lsbFR5cGUgfSBmcm9tIFwiLi4vSGVyb0NvbmZpZ1wiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmluZ052V2FsbCBleHRlbmRzIFdhbGwge1xyXG5cclxuICAgIGdvbmdqaV9kYXRhOkdvbmdKaURhdGE9bnVsbDtcclxuXHJcbiAgICBpc19kZXN0cm95OmJvb2xlYW49ZmFsc2U7XHJcbiAgICBwcml2YXRlIHNlbGZfcmVjdDpjYy5SZWN0PW51bGw7XHJcbiAgICB3YWxsX2lkOldhbGxUeXBlPVdhbGxUeXBlLkJpbmdOdldhbGw7XHJcblxyXG4gICAgLyoq5Z+O5aKZ5oyB57ut5pe26Ze077yM6ZKI5a+56Zmk5LqG5Li75Z+O5aKZ5LmL5aSW55qE5Z+O5aKZICovXHJcbiAgICByZW1haW5fdGltZTpudW1iZXI9MDtcclxuXHJcbiAgICBpbml0KGdqRGF0YTpHb25nSmlEYXRhLHBvczpjYy5WZWMyLHJlbWFpblRpbWU6bnVtYmVyLHdhbGxJZDpXYWxsVHlwZT1XYWxsVHlwZS5CaW5nTnZXYWxsKVxyXG4gICAge1xyXG4gICAgICAgIGdqRGF0YS5oZXJvX2RhdGEuSGVhbHRoPWdqRGF0YS5oZXJvX2RhdGEudG90YWxfaHAqKGdqRGF0YS5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTIoU2tpbGxUeXBlLkFjdGl2ZSkpO1xyXG4gICAgICAgIHRoaXMuZ29uZ2ppX2RhdGE9Z2pEYXRhO1xyXG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihjYy52MigwLHBvcy55KSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnpJbmRleD0oTWF0aC5yb3VuZCg4MDAwLXRoaXMubm9kZS55KjEwKSk7XHJcbiAgICAgICAgdGhpcy5pc19kZXN0cm95PWZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVtYWluX3RpbWU9cmVtYWluVGltZTtcclxuICAgICAgICB0aGlzLndhbGxfaWQ9d2FsbElkO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQ29sbGlkZXIpLmVuYWJsZWQ9ZmFsc2U7XHJcbiAgICAgICAgaWYodGhpcy5jaGVja0ppVHVpKHBvcykpe1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkNvbGxpZGVyKS5lbmFibGVkPXRydWU7XHJcbiAgICAgICAgICAgIHN1cGVyLmluaXRXYWxsKHRoaXMuZ29uZ2ppX2RhdGEuaGVyb19kYXRhLFdhbGxUeXBlLkJpbmdOdldhbGwpO1xyXG4gICAgICAgICAgICBzdXBlci5zZXRXYWxsRGllTGlzdGVuKHRoaXMub25XYWxsRGllLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICBzdXBlci5zZXREYW1hZ2VMaXN0ZW4odGhpcy5vbkRhbWFnZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5kZXN0cm95U2VsZix0aGlzLmdvbmdqaV9kYXRhLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMShTa2lsbFR5cGUuQWN0aXZlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8q5qOA5rWL6IO96KKr5Ye76YCA55qE5pWM5Lq6Ki9cclxuICAgIGNoZWNrSmlUdWkocG9zOmNjLlZlYzIpOmJvb2xlYW57ICAgICAgICBcclxuICAgICAgICB0aGlzLnNlbGZfcmVjdD1jYy5yZWN0KC1jYy53aW5TaXplLndpZHRoLzIscG9zLnktMTIwLzIsY2Mud2luU2l6ZS53aWR0aCwxMjApO1xyXG4gICAgICAgIHN1cGVyLnNldFdhbGxSZWN0KHRoaXMuc2VsZl9yZWN0KTtcclxuICAgICAgICAvL+WHu+mAgOS4k+eUqOiMg+WbtFxyXG4gICAgICAgIGxldCBqaXR1aVJlY3Q9Y2MucmVjdCgtY2Mud2luU2l6ZS53aWR0aC8yLHBvcy55LTIwMC8yLGNjLndpblNpemUud2lkdGgsMjAwKTtcclxuICAgICAgICBsZXQgYm5XYWxsPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlcnNGb3JCaW5nTnZXYWxsUmVjdChqaXR1aVJlY3QpO1xyXG4gICAgICAgIC8v5LiT5q2m6YCg5oiQ5Lyk5a6zXHJcbiAgICAgICAgbGV0IGV4RGFtYWdlPTA7XHJcbiAgICAgICAgbGV0IGV4MT10aGlzLmdvbmdqaV9kYXRhLmhlcm9fZGF0YS5FeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlXzE7XHJcbiAgICAgICAgaWYoZXgxJiZleDE+MCl7XHJcbiAgICAgICAgICAgIGV4RGFtYWdlPWV4MTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYoSXNEZWJ1Zyl7XHJcbiAgICAgICAgLy8gICAgIGV4RGFtYWdlPTEwMDtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgaWYoYm5XYWxsLmJvc3NfdHMpe1xyXG4gICAgICAgICAgICAvL+mUgOavgVxyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgICAgIGlmKGV4RGFtYWdlPjApe1xyXG4gICAgICAgICAgICAgICAgbGV0IGV4RGF0YT1jYy5pbnN0YW50aWF0ZSh0aGlzLmdvbmdqaV9kYXRhKTtcclxuICAgICAgICAgICAgICAgIGV4RGF0YS5za2lsbF9kYW1hZ2VfcmF0ZT1leERhbWFnZTtcclxuICAgICAgICAgICAgICAgIGJuV2FsbC5ib3NzX3RzLmJlRmxhc2hJbmp1cmVkKGV4RGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlICAgICAgICAgICAgXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8v5Ye76YCAXHJcbiAgICAgICAgICAgIGxldCBhbGxNb25zdGVycz1ibldhbGwuYmFja19tb25zdGVycztcclxuICAgICAgICAgICAgbGV0IGppdHVpQWN0PTAuMTU7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGFsbE1vbnN0ZXJzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBtb25zdGVyVHM9YWxsTW9uc3RlcnNbaV0uZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4obW9uc3RlclRzLm5vZGUpLnRvKGppdHVpQWN0LHt5OnBvcy55KzEyMC8yK01hdGgucmFuZG9tKCkqNzB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1ZmZEYXRhPW5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl9pZD1CdWZmSWQuSGVyb19YdWFuWXVuO1xyXG4gICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl90eXBlPUJ1ZmZUeXBlLlZlcnRpZ287XHJcbiAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3ZhbHVlPVswXTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lPWppdHVpQWN0KzAuMjtcclxuICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkPUdhbWVFZmZlY3RJZC54dWFueXVuO1xyXG4gICAgICAgICAgICAgICAgbW9uc3RlclRzLmFkZERlQnVmZihidWZmRGF0YSx0aGlzLmdvbmdqaV9kYXRhKTtcclxuICAgICAgICAgICAgICAgIGlmKGV4RGFtYWdlPjApe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBleERhdGE9Y2MuaW5zdGFudGlhdGUodGhpcy5nb25namlfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhEYXRhLnNraWxsX2RhbWFnZV9yYXRlPWV4RGFtYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJUcy5iZUZsYXNoSW5qdXJlZChleERhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLCdCaW5nTnZfU2tpbGxfU3RhcnQnLGZhbHNlKTtcclxuICAgICAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRXYWxsKHRoaXMud2FsbF9pZCx0aGlzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcbiAgICAvKirln47lopnlj5fliLDmma7pgJrmlLvlh7vml7bvvIzlj43lvLnkvKTlrrMgKi9cclxuICAgIG9uRGFtYWdlKG1vbnN0ZXJUczpNb25zdGVyKXtcclxuICAgICAgICBsZXQgZmFudGFuRGF0YT1jYy5pbnN0YW50aWF0ZSh0aGlzLmdvbmdqaV9kYXRhKTtcclxuICAgICAgICBmYW50YW5EYXRhLnNraWxsX2RhbWFnZV9yYXRlPXRoaXMuZ29uZ2ppX2RhdGEuaGVyb19kYXRhLmdldFNraWxsVmFsdWUzKFNraWxsVHlwZS5BY3RpdmUpO1xyXG4gICAgICAgIG1vbnN0ZXJUcy5iZUZsYXNoSW5qdXJlZCh0aGlzLmdvbmdqaV9kYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95U2VsZigpe1xyXG4gICAgICAgIC8v5pKt5pS+5Yqo55S7XHJcbiAgICAgICAgaWYodGhpcy5pc19kZXN0cm95KXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkNvbGxpZGVyKS5lbmFibGVkPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNfZGVzdHJveT10cnVlO1xyXG4gICAgICAgIGxldCBzcGluZT10aGlzLm5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICBzcGluZS5zZXRBbmltYXRpb24oMCwnQmluZ052X1NraWxsX0VuZCcsZmFsc2UpO1xyXG4gICAgICAgIHNwaW5lLnNldENvbXBsZXRlTGlzdGVuZXIoKCk9PntcclxuICAgICAgICAgICAgc3BpbmUuc2V0Q29tcGxldGVMaXN0ZW5lcihudWxsKTtcclxuICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5iaW5nX252X2FjdGl2ZV9za2lsbF93YWxsLHRoaXMubm9kZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZW1vdmVXYWxsKHRoaXMud2FsbF9pZCk7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuZGVzdHJveVNlbGYpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJlY3QoKTpjYy5SZWN0e1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGZfcmVjdDtcclxuICAgIH1cclxuXHJcbiAgICBvbldhbGxEaWUoKXtcclxuICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t56Kw5pKe5byA5aeLLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgb25Db2xsaXNpb25FbnRlcihvdGhlcjpjYy5Db2xsaWRlcixzZWxmOmNjLkNvbGxpZGVyKSB7XHJcbiAgICAgICAgbGV0IGdtPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgbGV0IGdyb3VwPW90aGVyLm5vZGUuZ3JvdXA7XHJcbiAgICAgICAgc3dpdGNoKGdyb3VwKXtcclxuICAgICAgICAgICAgY2FzZSAnYm9zc19ib2R5Jzp7XHJcbiAgICAgICAgICAgICAgICAvL+S4gOeisOWwseS8mueijlxyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==