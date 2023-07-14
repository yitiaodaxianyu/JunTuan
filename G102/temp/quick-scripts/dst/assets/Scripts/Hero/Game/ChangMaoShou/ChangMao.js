
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/ChangMaoShou/ChangMao.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c1ff7vC+fRDjK+VyM1n42S+', 'ChangMao');
// Scripts/Hero/Game/ChangMaoShou/ChangMao.ts

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
var BuffData_1 = require("../BuffData");
var Bullect_1 = require("../Bullect");
var HeroConfig_1 = require("../HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ChangMao = /** @class */ (function (_super) {
    __extends(ChangMao, _super);
    function ChangMao() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangMao.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addCollisionMonsterListen.call(this, this.onCollisionMonster);
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    ChangMao.prototype.onCollisionMonster = function (monsterTs) {
        if (monsterTs) {
            var data = monsterTs.beFlashInjured(this.gongji_data);
            if (data.getDamageNum() > 0) {
                if (data.is_die == false) {
                    var buffData = new BuffData_1.BuffData();
                    buffData.buff_id = HeroConfig_1.BuffId.Hero_ChangMaoShow_Skill;
                    buffData.remain_time = 60;
                    buffData.buff_type = HeroConfig_1.BuffType.Normal;
                    buffData.buff_value = [5];
                    buffData.game_effect_id = GameEffectsManager_1.GameEffectId.chang_mao_shou_skill_zhuazi;
                    buffData.add_floor = 1;
                    monsterTs.addDeBuff(buffData, this.gongji_data);
                    //判断有几层buff
                    var buffFloor = monsterTs.getDeBuff(HeroConfig_1.BuffId.Hero_ChangMaoShow_Skill);
                    var floorNum = 0;
                    if (buffFloor) {
                        floorNum = buffFloor.getFloorNum();
                        if (floorNum > 10) {
                            floorNum = 10;
                        }
                        /**额外真伤 */
                        var realData = cc.instantiate(this.gongji_data);
                        realData.damage_type = HeroConfig_1.DamageType.Skill;
                        var totalAttack = realData.hero_data.total_attack;
                        var realDamage = realData.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_1) * totalAttack; //0.2*100==20
                        var exRealDamage = realData.hero_data.getSkillValue2(HeroConfig_1.SkillType.Passive_1) * floorNum * totalAttack; //0.05,5=0.25*100=25
                        var finalDamage = realDamage + exRealDamage; //20+25=45
                        if (finalDamage > 0) {
                            monsterTs.beRealDamage(realData, finalDamage);
                        }
                    }
                }
            }
            _super.prototype.destroySelf.call(this);
        }
    };
    ChangMao = __decorate([
        ccclass
    ], ChangMao);
    return ChangMao;
}(Bullect_1.default));
exports.default = ChangMao;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcQ2hhbmdNYW9TaG91XFxDaGFuZ01hby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1RUFBZ0U7QUFFaEUsd0NBQXVDO0FBQ3ZDLHNDQUFpQztBQUNqQyw0Q0FBd0U7QUFFbEUsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBc0MsNEJBQU87SUFBN0M7O0lBOENBLENBQUM7SUEzQ0cseUJBQU0sR0FBTjtRQUNJLGlCQUFNLE1BQU0sV0FBRSxDQUFDO1FBQ2YsaUJBQU0seUJBQXlCLFlBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELGtHQUFrRztJQUNsRyxxQ0FBa0IsR0FBbEIsVUFBbUIsU0FBaUI7UUFDaEMsSUFBRyxTQUFTLEVBQUM7WUFDVCxJQUFJLElBQUksR0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNwRCxJQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBQyxDQUFDLEVBQUM7Z0JBQ3JCLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBRSxLQUFLLEVBQUM7b0JBQ2xCLElBQUksUUFBUSxHQUFDLElBQUksbUJBQVEsRUFBRSxDQUFDO29CQUM1QixRQUFRLENBQUMsT0FBTyxHQUFDLG1CQUFNLENBQUMsdUJBQXVCLENBQUM7b0JBQ2hELFFBQVEsQ0FBQyxXQUFXLEdBQUMsRUFBRSxDQUFDO29CQUN4QixRQUFRLENBQUMsU0FBUyxHQUFDLHFCQUFRLENBQUMsTUFBTSxDQUFDO29CQUNuQyxRQUFRLENBQUMsVUFBVSxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hCLFFBQVEsQ0FBQyxjQUFjLEdBQUMsaUNBQVksQ0FBQywyQkFBMkIsQ0FBQztvQkFDakUsUUFBUSxDQUFDLFNBQVMsR0FBQyxDQUFDLENBQUM7b0JBQ3JCLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDL0MsV0FBVztvQkFDWCxJQUFJLFNBQVMsR0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLG1CQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQztvQkFDbEUsSUFBSSxRQUFRLEdBQUMsQ0FBQyxDQUFDO29CQUNmLElBQUcsU0FBUyxFQUFDO3dCQUNULFFBQVEsR0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7d0JBQ2pDLElBQUcsUUFBUSxHQUFDLEVBQUUsRUFBQzs0QkFDWCxRQUFRLEdBQUMsRUFBRSxDQUFDO3lCQUNmO3dCQUNELFVBQVU7d0JBQ1YsSUFBSSxRQUFRLEdBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBQzlDLFFBQVEsQ0FBQyxXQUFXLEdBQUMsdUJBQVUsQ0FBQyxLQUFLLENBQUM7d0JBQ3RDLElBQUksV0FBVyxHQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFBO3dCQUMvQyxJQUFJLFVBQVUsR0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxzQkFBUyxDQUFDLFNBQVMsQ0FBQyxHQUFDLFdBQVcsQ0FBQyxDQUFBLGFBQWE7d0JBQy9GLElBQUksWUFBWSxHQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLHNCQUFTLENBQUMsU0FBUyxDQUFDLEdBQUMsUUFBUSxHQUFDLFdBQVcsQ0FBQyxDQUFBLG9CQUFvQjt3QkFDakgsSUFBSSxXQUFXLEdBQUMsVUFBVSxHQUFDLFlBQVksQ0FBQyxDQUFBLFVBQVU7d0JBQ2xELElBQUcsV0FBVyxHQUFDLENBQUMsRUFBQzs0QkFDYixTQUFTLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBQyxXQUFXLENBQUMsQ0FBQzt5QkFDaEQ7cUJBQ0o7aUJBQ0o7YUFDSjtZQUNELGlCQUFNLFdBQVcsV0FBRSxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQztJQTdDZ0IsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQThDNUI7SUFBRCxlQUFDO0NBOUNELEFBOENDLENBOUNxQyxpQkFBTyxHQThDNUM7a0JBOUNvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCB9IGZyb20gXCIuLi8uLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyXCI7XHJcbmltcG9ydCB7IEJ1ZmZEYXRhIH0gZnJvbSBcIi4uL0J1ZmZEYXRhXCI7XHJcbmltcG9ydCBCdWxsZWN0IGZyb20gXCIuLi9CdWxsZWN0XCI7XHJcbmltcG9ydCB7IEJ1ZmZJZCwgQnVmZlR5cGUsIFNraWxsVHlwZSwgRGFtYWdlVHlwZSB9IGZyb20gXCIuLi9IZXJvQ29uZmlnXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYW5nTWFvIGV4dGVuZHMgQnVsbGVjdCB7XHJcblxyXG5cclxuICAgIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICBzdXBlci5hZGRDb2xsaXNpb25Nb25zdGVyTGlzdGVuKHRoaXMub25Db2xsaXNpb25Nb25zdGVyKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t56Kw5pKe5byA5aeLLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgb25Db2xsaXNpb25Nb25zdGVyKG1vbnN0ZXJUczpNb25zdGVyKSB7XHJcbiAgICAgICAgaWYobW9uc3RlclRzKXsgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGRhdGE9bW9uc3RlclRzLmJlRmxhc2hJbmp1cmVkKHRoaXMuZ29uZ2ppX2RhdGEpO1xyXG4gICAgICAgICAgICBpZihkYXRhLmdldERhbWFnZU51bSgpPjApeyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEuaXNfZGllPT1mYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ1ZmZEYXRhPW5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfaWQ9QnVmZklkLkhlcm9fQ2hhbmdNYW9TaG93X1NraWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lPTYwO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfdHlwZT1CdWZmVHlwZS5Ob3JtYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl92YWx1ZT1bNV07XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQ9R2FtZUVmZmVjdElkLmNoYW5nX21hb19zaG91X3NraWxsX3podWF6aTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5hZGRfZmxvb3I9MTtcclxuICAgICAgICAgICAgICAgICAgICBtb25zdGVyVHMuYWRkRGVCdWZmKGJ1ZmZEYXRhLHRoaXMuZ29uZ2ppX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5Yik5pat5pyJ5Yeg5bGCYnVmZlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBidWZmRmxvb3I9bW9uc3RlclRzLmdldERlQnVmZihCdWZmSWQuSGVyb19DaGFuZ01hb1Nob3dfU2tpbGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmbG9vck51bT0wO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGJ1ZmZGbG9vcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsb29yTnVtPWJ1ZmZGbG9vci5nZXRGbG9vck51bSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihmbG9vck51bT4xMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbG9vck51bT0xMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvKirpop3lpJbnnJ/kvKQgKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlYWxEYXRhPWNjLmluc3RhbnRpYXRlKHRoaXMuZ29uZ2ppX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFsRGF0YS5kYW1hZ2VfdHlwZT1EYW1hZ2VUeXBlLlNraWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG90YWxBdHRhY2s9cmVhbERhdGEuaGVyb19kYXRhLnRvdGFsX2F0dGFja1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVhbERhbWFnZT1yZWFsRGF0YS5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLlBhc3NpdmVfMSkqdG90YWxBdHRhY2s7Ly8wLjIqMTAwPT0yMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXhSZWFsRGFtYWdlPXJlYWxEYXRhLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMihTa2lsbFR5cGUuUGFzc2l2ZV8xKSpmbG9vck51bSp0b3RhbEF0dGFjazsvLzAuMDUsNT0wLjI1KjEwMD0yNVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmluYWxEYW1hZ2U9cmVhbERhbWFnZStleFJlYWxEYW1hZ2U7Ly8yMCsyNT00NVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihmaW5hbERhbWFnZT4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJUcy5iZVJlYWxEYW1hZ2UocmVhbERhdGEsZmluYWxEYW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN1cGVyLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==