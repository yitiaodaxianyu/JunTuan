
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/Elite/FishBully.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '04f24/UuvRFAYwgJ/N6NwQV', 'FishBully');
// Scripts/Monster/Elite/FishBully.ts

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
var Constants_1 = require("../../Constants");
var EnemyConfig_1 = require("../../Enemy/EnemyConfig");
var GameManager_1 = require("../../GameManager");
var BuffData_1 = require("../../Hero/Game/BuffData");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var MonsterData_1 = require("../MonsterData");
var MonsterNewNormal_1 = require("../MonsterNewNormal");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FishBully = /** @class */ (function (_super) {
    __extends(FishBully, _super);
    function FishBully() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.light = null;
        _this.load_num = 0;
        return _this;
    }
    FishBully.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        //GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster68_niujiangjun_skill,1);
        _super.prototype.addMonsterNormalInited.call(this, this.onMonsterNormalInited);
    };
    FishBully.prototype.onMonsterNormalInited = function () {
        //this.skill_cold_down[0]=this.skill_data.getSkillValue1(1);
    };
    FishBully.prototype.startSkill = function () {
        var _this = this;
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
        var data = new MonsterData_1.KeyFrameData();
        data.name = 'Skill';
        data.callback = function () {
            //狂暴buff
            var ysData = new BuffData_1.BuffData();
            ysData.buff_value = [_this.skill_data.getSkillValue1(1)];
            ysData.buff_id = HeroConfig_1.BuffId.Elite71_FishBully_JiaYiSu;
            ysData.buff_type = HeroConfig_1.BuffType.MoveSpeedUp;
            ysData.remain_time = _this.skill_data.getSkillValue3(1);
            _super.prototype.addBuff.call(_this, ysData);
            var gsData = new BuffData_1.BuffData();
            gsData.buff_value = [_this.skill_data.getSkillValue2(1)];
            gsData.buff_id = HeroConfig_1.BuffId.Elite71_FishBully_JiaGongSu;
            gsData.buff_type = HeroConfig_1.BuffType.AttSpeedUp;
            gsData.remain_time = _this.skill_data.getSkillValue3(1);
            _super.prototype.addBuff.call(_this, gsData);
            _this.skill_cold_down[0] = _this.skill_data.getSkillColdDown(1);
        };
        this.skill_cold_down[0] = this.skill_data.getSkillColdDown(1);
        _super.prototype.playSpinAnimaton.call(this, "Side_Skill", false, data, function () {
            _this.startIdle();
            _this.setEnemyState(EnemyConfig_1.Enemy_State.move);
        });
    };
    FishBully.prototype.update = function (dt) {
        if ((GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) || this.getIsDie()) {
            return;
        }
        _super.prototype.update.call(this, dt);
        this.checkSkill(dt);
    };
    FishBully.prototype.checkSkill = function (dt) {
        for (var i = 0; i < this.skill_cold_down.length; i++) {
            var isCanSkill = false;
            if (this.skill_cold_down[i] > 0) {
                this.skill_cold_down[i] -= dt;
                if (this.skill_cold_down[i] <= 0) {
                    isCanSkill = true;
                }
            }
            else {
                isCanSkill = true;
            }
            if (isCanSkill) {
                //buff
                this.startSkill();
            }
        }
    };
    FishBully = __decorate([
        ccclass
    ], FishBully);
    return FishBully;
}(MonsterNewNormal_1.default));
exports.default = FishBully;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcRWxpdGVcXEZpc2hCdWxseS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBNEM7QUFDNUMsdURBQXNEO0FBR3RELGlEQUE0QztBQUM1QyxxREFBb0Q7QUFDcEQseURBQThEO0FBRTlELDhDQUE4QztBQUU5Qyx3REFBbUQ7QUFHN0MsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBdUMsNkJBQWdCO0lBQXZEO1FBQUEscUVBdUVDO1FBckVHLFdBQUssR0FBUyxJQUFJLENBQUM7UUFDbkIsY0FBUSxHQUFRLENBQUMsQ0FBQzs7SUFvRXRCLENBQUM7SUFsRWEsMEJBQU0sR0FBaEI7UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLGlHQUFpRztRQUNqRyxpQkFBTSxzQkFBc0IsWUFBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQseUNBQXFCLEdBQXJCO1FBQ0ksNERBQTREO0lBQ2hFLENBQUM7SUFFRCw4QkFBVSxHQUFWO1FBQUEsaUJBMkJDO1FBMUJHLGlCQUFNLGFBQWEsWUFBQyx5QkFBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZDLElBQUksSUFBSSxHQUFDLElBQUksMEJBQVksRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUMsT0FBTyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUM7WUFDVixRQUFRO1lBQ1IsSUFBSSxNQUFNLEdBQUMsSUFBSSxtQkFBUSxFQUFFLENBQUM7WUFDMUIsTUFBTSxDQUFDLFVBQVUsR0FBQyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEQsTUFBTSxDQUFDLE9BQU8sR0FBQyxtQkFBTSxDQUFDLHlCQUF5QixDQUFDO1lBQ2hELE1BQU0sQ0FBQyxTQUFTLEdBQUMscUJBQVEsQ0FBQyxXQUFXLENBQUM7WUFDdEMsTUFBTSxDQUFDLFdBQVcsR0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRCxpQkFBTSxPQUFPLGFBQUMsTUFBTSxDQUFDLENBQUM7WUFFdEIsSUFBSSxNQUFNLEdBQUMsSUFBSSxtQkFBUSxFQUFFLENBQUM7WUFDMUIsTUFBTSxDQUFDLFVBQVUsR0FBQyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEQsTUFBTSxDQUFDLE9BQU8sR0FBQyxtQkFBTSxDQUFDLDJCQUEyQixDQUFDO1lBQ2xELE1BQU0sQ0FBQyxTQUFTLEdBQUMscUJBQVEsQ0FBQyxVQUFVLENBQUM7WUFDckMsTUFBTSxDQUFDLFdBQVcsR0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVyRCxpQkFBTSxPQUFPLGFBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEIsS0FBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLENBQUMsQ0FBQTtRQUNELElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1RCxpQkFBTSxnQkFBZ0IsWUFBQyxZQUFZLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQztZQUMzQyxLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsS0FBSSxDQUFDLGFBQWEsQ0FBQyx5QkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELDBCQUFNLEdBQU4sVUFBUSxFQUFFO1FBQ04sSUFBRyxDQUFDLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxJQUFFLHFCQUFTLENBQUMsWUFBWSxDQUFDLElBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUN0RjtZQUNJLE9BQU87U0FDVjtRQUNELGlCQUFNLE1BQU0sWUFBQyxFQUFFLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRCw4QkFBVSxHQUFWLFVBQVcsRUFBUztRQUNoQixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7WUFDNUMsSUFBSSxVQUFVLEdBQUMsS0FBSyxDQUFDO1lBQ3JCLElBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEVBQUM7Z0JBQ3pCLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUUsRUFBRSxDQUFDO2dCQUM1QixJQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxFQUFDO29CQUMxQixVQUFVLEdBQUMsSUFBSSxDQUFDO2lCQUNuQjthQUNKO2lCQUFJO2dCQUNELFVBQVUsR0FBQyxJQUFJLENBQUM7YUFDbkI7WUFDRCxJQUFHLFVBQVUsRUFBQztnQkFDVixNQUFNO2dCQUNOLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUNyQjtTQUNKO0lBQ0wsQ0FBQztJQXJFZ0IsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQXVFN0I7SUFBRCxnQkFBQztDQXZFRCxBQXVFQyxDQXZFc0MsMEJBQWdCLEdBdUV0RDtrQkF2RW9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lU3RhdGUgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEVuZW15X1N0YXRlIH0gZnJvbSBcIi4uLy4uL0VuZW15L0VuZW15Q29uZmlnXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RzTWFuYWdlciwgR2FtZUVmZmVjdElkIH0gZnJvbSBcIi4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBHcm91bmRNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lL0dyb3VuZE1hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBCdWZmRGF0YSB9IGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvQnVmZkRhdGFcIjtcclxuaW1wb3J0IHsgQnVmZklkLCBCdWZmVHlwZSB9IGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vTW9uc3RlclwiO1xyXG5pbXBvcnQgeyBLZXlGcmFtZURhdGEgfSBmcm9tIFwiLi4vTW9uc3RlckRhdGFcIjtcclxuaW1wb3J0IE1vbnN0ZXJNYW5hZ2VyIGZyb20gXCIuLi9Nb25zdGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgTW9uc3Rlck5ld05vcm1hbCBmcm9tIFwiLi4vTW9uc3Rlck5ld05vcm1hbFwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmlzaEJ1bGx5IGV4dGVuZHMgTW9uc3Rlck5ld05vcm1hbCB7XHJcblxyXG4gICAgbGlnaHQ6Y2MuTm9kZT1udWxsO1xyXG4gICAgbG9hZF9udW06bnVtYmVyPTA7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICAvL0dhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyNjhfbml1amlhbmdqdW5fc2tpbGwsMSk7XHJcbiAgICAgICAgc3VwZXIuYWRkTW9uc3Rlck5vcm1hbEluaXRlZCh0aGlzLm9uTW9uc3Rlck5vcm1hbEluaXRlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Nb25zdGVyTm9ybWFsSW5pdGVkICgpIHsgICAgICAgXHJcbiAgICAgICAgLy90aGlzLnNraWxsX2NvbGRfZG93blswXT10aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoMSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRTa2lsbCgpe1xyXG4gICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc2tpbGwpO1xyXG4gICAgICAgIGxldCBkYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICBkYXRhLm5hbWU9J1NraWxsJztcclxuICAgICAgICBkYXRhLmNhbGxiYWNrPSgpPT57ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8v54uC5pq0YnVmZlxyXG4gICAgICAgICAgICBsZXQgeXNEYXRhPW5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICB5c0RhdGEuYnVmZl92YWx1ZT1bdGhpcy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUxKDEpXTtcclxuICAgICAgICAgICAgeXNEYXRhLmJ1ZmZfaWQ9QnVmZklkLkVsaXRlNzFfRmlzaEJ1bGx5X0ppYVlpU3U7XHJcbiAgICAgICAgICAgIHlzRGF0YS5idWZmX3R5cGU9QnVmZlR5cGUuTW92ZVNwZWVkVXA7XHJcbiAgICAgICAgICAgIHlzRGF0YS5yZW1haW5fdGltZT10aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxWYWx1ZTMoMSk7XHJcbiAgICAgICAgICAgIHN1cGVyLmFkZEJ1ZmYoeXNEYXRhKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBnc0RhdGE9bmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAgICAgICAgIGdzRGF0YS5idWZmX3ZhbHVlPVt0aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxWYWx1ZTIoMSldO1xyXG4gICAgICAgICAgICBnc0RhdGEuYnVmZl9pZD1CdWZmSWQuRWxpdGU3MV9GaXNoQnVsbHlfSmlhR29uZ1N1O1xyXG4gICAgICAgICAgICBnc0RhdGEuYnVmZl90eXBlPUJ1ZmZUeXBlLkF0dFNwZWVkVXA7XHJcbiAgICAgICAgICAgIGdzRGF0YS5yZW1haW5fdGltZT10aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxWYWx1ZTMoMSk7XHJcblxyXG4gICAgICAgICAgICBzdXBlci5hZGRCdWZmKGdzRGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpbGxfY29sZF9kb3duWzBdPXRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbENvbGREb3duKDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNraWxsX2NvbGRfZG93blswXT10aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxDb2xkRG93bigxKTtcclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKFwiU2lkZV9Ta2lsbFwiLGZhbHNlLGRhdGEsKCk9PntcclxuICAgICAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLm1vdmUpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlIChkdCkge1xyXG4gICAgICAgIGlmKChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlIT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nKXx8dGhpcy5nZXRJc0RpZSgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci51cGRhdGUoZHQpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tTa2lsbChkdCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tTa2lsbChkdDpudW1iZXIpe1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHRoaXMuc2tpbGxfY29sZF9kb3duLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGlzQ2FuU2tpbGw9ZmFsc2U7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2tpbGxfY29sZF9kb3duW2ldPjApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF9jb2xkX2Rvd25baV0tPWR0O1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5za2lsbF9jb2xkX2Rvd25baV08PTApe1xyXG4gICAgICAgICAgICAgICAgICAgIGlzQ2FuU2tpbGw9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpc0NhblNraWxsPXRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoaXNDYW5Ta2lsbCl7XHJcbiAgICAgICAgICAgICAgICAvL2J1ZmZcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuIl19