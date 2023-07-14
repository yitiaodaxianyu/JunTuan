
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/Elite/NiuJiangJun.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'aa856CtzDlP2qCzCvZ6aOpJ', 'NiuJiangJun');
// Scripts/Monster/Elite/NiuJiangJun.ts

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
var GameEffectsManager_1 = require("../../Game/GameEffectsManager");
var GroundManager_1 = require("../../Game/GroundManager");
var GameManager_1 = require("../../GameManager");
var BuffData_1 = require("../../Hero/Game/BuffData");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var Monster_1 = require("../Monster");
var MonsterData_1 = require("../MonsterData");
var MonsterManager_1 = require("../MonsterManager");
var MonsterNewNormal_1 = require("../MonsterNewNormal");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NiuJiangJun = /** @class */ (function (_super) {
    __extends(NiuJiangJun, _super);
    function NiuJiangJun() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.light = null;
        _this.load_num = 0;
        return _this;
    }
    NiuJiangJun.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster68_niujiangjun_skill, 1);
        _super.prototype.addMonsterNormalInited.call(this, this.onMonsterNormalInited);
    };
    NiuJiangJun.prototype.onMonsterNormalInited = function () {
        this.skill_cold_down[0] = this.skill_data.getSkillValue1(1);
    };
    NiuJiangJun.prototype.startSkill = function () {
        var _this = this;
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
        var data = new MonsterData_1.KeyFrameData();
        data.name = 'Skill';
        data.callback = function () {
            GroundManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster68_niujiangjun_skill, _this.node.getPosition());
            //鼓舞buff
            var monsters = MonsterManager_1.default.getInstance().getMonstersForMonsterPos(-1, _this.node.getPosition(), 200);
            if (monsters) {
                for (var i = 0; i < monsters.length; i++) {
                    var monsterTs = monsters[i].getComponent(Monster_1.default);
                    if (monsterTs) {
                        var buffData = new BuffData_1.BuffData();
                        buffData.buff_value = [_this.skill_data.getSkillValue1(1)];
                        buffData.buff_id = HeroConfig_1.BuffId.Elite68_NiuJiangJun_JiaSu;
                        buffData.buff_type = HeroConfig_1.BuffType.MoveSpeedUp;
                        buffData.remain_time = _this.skill_data.getSkillValue2(1);
                        monsterTs.addBuff(buffData);
                    }
                }
            }
        };
        this.skill_cold_down[0] = this.skill_data.getSkillColdDown(1);
        _super.prototype.playSpinAnimaton.call(this, "Side_Skill", false, data, function () {
            _this.startIdle();
            _this.setEnemyState(EnemyConfig_1.Enemy_State.move);
        });
    };
    NiuJiangJun.prototype.update = function (dt) {
        if ((GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) || this.getIsDie()) {
            return;
        }
        _super.prototype.update.call(this, dt);
        this.checkSkill(dt);
    };
    NiuJiangJun.prototype.checkSkill = function (dt) {
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
                //加速buff
                this.startSkill();
            }
        }
    };
    NiuJiangJun = __decorate([
        ccclass
    ], NiuJiangJun);
    return NiuJiangJun;
}(MonsterNewNormal_1.default));
exports.default = NiuJiangJun;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcRWxpdGVcXE5pdUppYW5nSnVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUE0QztBQUM1Qyx1REFBc0Q7QUFDdEQsb0VBQWlGO0FBQ2pGLDBEQUFxRDtBQUNyRCxpREFBNEM7QUFDNUMscURBQW9EO0FBQ3BELHlEQUFnRjtBQUNoRixzQ0FBaUM7QUFDakMsOENBQThDO0FBQzlDLG9EQUErQztBQUMvQyx3REFBbUQ7QUFHN0MsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBeUMsK0JBQWdCO0lBQXpEO1FBQUEscUVBdUVDO1FBckVHLFdBQUssR0FBUyxJQUFJLENBQUM7UUFDbkIsY0FBUSxHQUFRLENBQUMsQ0FBQzs7SUFvRXRCLENBQUM7SUFsRWEsNEJBQU0sR0FBaEI7UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLGlDQUFZLENBQUMsMkJBQTJCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0YsaUJBQU0sc0JBQXNCLFlBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELDJDQUFxQixHQUFyQjtRQUNJLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELGdDQUFVLEdBQVY7UUFBQSxpQkEyQkM7UUExQkcsaUJBQU0sYUFBYSxZQUFDLHlCQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsSUFBSSxJQUFJLEdBQUMsSUFBSSwwQkFBWSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLElBQUksR0FBQyxPQUFPLENB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QixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBdUUvQjtJQUFELGtCQUFDO0NBdkVELEFBdUVDLENBdkV3QywwQkFBZ0IsR0F1RXhEO2tCQXZFb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgRW5lbXlfU3RhdGUgfSBmcm9tIFwiLi4vLi4vRW5lbXkvRW5lbXlDb25maWdcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdHNNYW5hZ2VyLCBHYW1lRWZmZWN0SWQgfSBmcm9tIFwiLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IEdyb3VuZE1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWUvR3JvdW5kTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEJ1ZmZEYXRhIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9CdWZmRGF0YVwiO1xyXG5pbXBvcnQgeyBCdWZmSWQsIEJ1ZmZUeXBlLCBIYWxvRGF0YSwgSGFsb0lkIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuLi9Nb25zdGVyXCI7XHJcbmltcG9ydCB7IEtleUZyYW1lRGF0YSB9IGZyb20gXCIuLi9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4uL01vbnN0ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCBNb25zdGVyTmV3Tm9ybWFsIGZyb20gXCIuLi9Nb25zdGVyTmV3Tm9ybWFsXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOaXVKaWFuZ0p1biBleHRlbmRzIE1vbnN0ZXJOZXdOb3JtYWwge1xyXG5cclxuICAgIGxpZ2h0OmNjLk5vZGU9bnVsbDtcclxuICAgIGxvYWRfbnVtOm51bWJlcj0wO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXI2OF9uaXVqaWFuZ2p1bl9za2lsbCwxKTtcclxuICAgICAgICBzdXBlci5hZGRNb25zdGVyTm9ybWFsSW5pdGVkKHRoaXMub25Nb25zdGVyTm9ybWFsSW5pdGVkKTtcclxuICAgIH1cclxuXHJcbiAgICBvbk1vbnN0ZXJOb3JtYWxJbml0ZWQgKCkgeyAgICAgICBcclxuICAgICAgICB0aGlzLnNraWxsX2NvbGRfZG93blswXT10aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoMSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRTa2lsbCgpe1xyXG4gICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc2tpbGwpO1xyXG4gICAgICAgIGxldCBkYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICBkYXRhLm5hbWU9J1NraWxsJztcclxuICAgICAgICBkYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgICAgIEdyb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubW9uc3RlcjY4X25pdWppYW5nanVuX3NraWxsLHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgLy/pvJPoiJ5idWZmXHJcbiAgICAgICAgICAgIGxldCBtb25zdGVycz1Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vbnN0ZXJzRm9yTW9uc3RlclBvcygtMSx0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSwyMDApOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihtb25zdGVycyl7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxtb25zdGVycy5sZW5ndGg7IGkrKyl7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtb25zdGVyVHM9bW9uc3RlcnNbaV0uZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG1vbnN0ZXJUcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBidWZmRGF0YT1uZXcgQnVmZkRhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl92YWx1ZT1bdGhpcy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUxKDEpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl9pZD1CdWZmSWQuRWxpdGU2OF9OaXVKaWFuZ0p1bl9KaWFTdTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl90eXBlPUJ1ZmZUeXBlLk1vdmVTcGVlZFVwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZT10aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxWYWx1ZTIoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJUcy5hZGRCdWZmKGJ1ZmZEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5za2lsbF9jb2xkX2Rvd25bMF09dGhpcy5za2lsbF9kYXRhLmdldFNraWxsQ29sZERvd24oMSk7XHJcbiAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbihcIlNpZGVfU2tpbGxcIixmYWxzZSxkYXRhLCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRJZGxlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5tb3ZlKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSAoZHQpIHtcclxuICAgICAgICBpZigoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZyl8fHRoaXMuZ2V0SXNEaWUoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKGR0KTtcclxuICAgICAgICB0aGlzLmNoZWNrU2tpbGwoZHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrU2tpbGwoZHQ6bnVtYmVyKXtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTx0aGlzLnNraWxsX2NvbGRfZG93bi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBpc0NhblNraWxsPWZhbHNlO1xyXG4gICAgICAgICAgICBpZih0aGlzLnNraWxsX2NvbGRfZG93bltpXT4wKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfY29sZF9kb3duW2ldLT1kdDtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2tpbGxfY29sZF9kb3duW2ldPD0wKXtcclxuICAgICAgICAgICAgICAgICAgICBpc0NhblNraWxsPXRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaXNDYW5Ta2lsbD10cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGlzQ2FuU2tpbGwpe1xyXG4gICAgICAgICAgICAgICAgLy/liqDpgJ9idWZmXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG59XHJcbiJdfQ==