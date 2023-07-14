
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Game/WindPet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '492e151rJhMA6QyJlWXyHF5', 'WindPet');
// Scripts/Pet/Game/WindPet.ts

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
var GameEffectsManager_1 = require("../../Game/GameEffectsManager");
var GameManager_1 = require("../../GameManager");
var BuffData_1 = require("../../Hero/Game/BuffData");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var PetConfig_1 = require("../PetConfig");
var Pet_1 = require("./Pet");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WindPet = /** @class */ (function (_super) {
    __extends(WindPet, _super);
    function WindPet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.buff_node_back = null;
        _this.buff_node_front = null;
        return _this;
    }
    WindPet.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.addAttackListen(this.onAttack);
    };
    WindPet.prototype.onAttack = function (monster) {
        //加攻速
        var buff = new BuffData_1.BuffData();
        buff.buff_id = HeroConfig_1.BuffId.Pet3_JiaSu;
        buff.buff_value = [this.pet_data.getSkillValue1(PetConfig_1.PetSkillType.Active)];
        buff.remain_time = this.pet_data.getSkillValue2(PetConfig_1.PetSkillType.Active);
        buff.buff_type = HeroConfig_1.BuffType.Gain;
        var hero = GameManager_1.default.getInstance().getHero(this.hero_type);
        var buffTimer = hero.addBuff(buff);
        buffTimer.addDestroyListen(this.onBuffDestroy.bind(this));
        var pos = hero.node.getPosition();
        this.buff_node_back = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(GameEffectsManager_1.GameEffectId.pet3_skill_back, pos, cc.find("Canvas/Hero_Shadow_Root"));
        this.buff_node_front = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(GameEffectsManager_1.GameEffectId.pet3_skill_front, pos, cc.find("Canvas/Pet_Root"));
    };
    WindPet.prototype.onBuffDestroy = function (buff) {
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.pet3_skill_back, this.buff_node_back);
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.pet3_skill_front, this.buff_node_front);
    };
    WindPet.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) {
            return;
        }
        this.checkSkill(dt);
    };
    WindPet.prototype.checkSkill = function (dt) {
        this.cd_time -= dt;
        if (this.cd_time < 0) {
            this.cd_time = 0;
        }
    };
    WindPet = __decorate([
        ccclass
    ], WindPet);
    return WindPet;
}(Pet_1.default));
exports.default = WindPet;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxHYW1lXFxXaW5kUGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLDZDQUE0QztBQUM1QyxvRUFBaUY7QUFDakYsaURBQTRDO0FBQzVDLHFEQUFvRDtBQUNwRCx5REFBOEQ7QUFDOUQsMENBQTRDO0FBQzVDLDZCQUF3QjtBQUVsQixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFxQywyQkFBRztJQUF4QztRQUFBLHFFQTRDQztRQTFDRyxvQkFBYyxHQUFTLElBQUksQ0FBQztRQUM1QixxQkFBZSxHQUFTLElBQUksQ0FBQzs7SUF5Q2pDLENBQUM7SUF2Q0csd0JBQU0sR0FBTjtRQUNJLGlCQUFNLE1BQU0sV0FBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELDBCQUFRLEdBQVIsVUFBUyxPQUFlO1FBQ3BCLEtBQUs7UUFDTCxJQUFJLElBQUksR0FBQyxJQUFJLG1CQUFRLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFDLG1CQUFNLENBQUMsVUFBVSxDQUFDO1FBQy9CLElBQUksQ0FBQyxVQUFVLEdBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyx3QkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLFdBQVcsR0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyx3QkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxTQUFTLEdBQUMscUJBQVEsQ0FBQyxJQUFJLENBQUM7UUFDN0IsSUFBSSxJQUFJLEdBQUMscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNELElBQUksU0FBUyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDMUQsSUFBSSxHQUFHLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsY0FBYyxHQUFDLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLHlCQUF5QixDQUFDLGlDQUFZLENBQUMsZUFBZSxFQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQztRQUNwSixJQUFJLENBQUMsZUFBZSxHQUFDLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLHlCQUF5QixDQUFDLGlDQUFZLENBQUMsZ0JBQWdCLEVBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ2xKLENBQUM7SUFFRCwrQkFBYSxHQUFiLFVBQWMsSUFBYTtRQUN2Qix1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxpQ0FBWSxDQUFDLGVBQWUsRUFBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDekcsdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMscUJBQXFCLENBQUMsaUNBQVksQ0FBQyxnQkFBZ0IsRUFBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDL0csQ0FBQztJQUVELHdCQUFNLEdBQU4sVUFBTyxFQUFTO1FBQ1osSUFBRyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsSUFBRSxxQkFBUyxDQUFDLFlBQVksRUFDbkU7WUFDSSxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRCw0QkFBVSxHQUFWLFVBQVcsRUFBUztRQUNoQixJQUFJLENBQUMsT0FBTyxJQUFFLEVBQUUsQ0FBQztRQUNqQixJQUFHLElBQUksQ0FBQyxPQUFPLEdBQUMsQ0FBQyxFQUFDO1lBQ2QsSUFBSSxDQUFDLE9BQU8sR0FBQyxDQUFDLENBQUM7U0FDbEI7SUFDTCxDQUFDO0lBM0NnQixPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBNEMzQjtJQUFELGNBQUM7Q0E1Q0QsQUE0Q0MsQ0E1Q29DLGFBQUcsR0E0Q3ZDO2tCQTVDb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuaW1wb3J0IHsgR2FtZVN0YXRlIH0gZnJvbSBcIi4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEJ1ZmZEYXRhIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9CdWZmRGF0YVwiO1xyXG5pbXBvcnQgeyBCdWZmSWQsIEJ1ZmZUeXBlIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCB7IFBldFNraWxsVHlwZSB9IGZyb20gXCIuLi9QZXRDb25maWdcIjtcclxuaW1wb3J0IFBldCBmcm9tIFwiLi9QZXRcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2luZFBldCBleHRlbmRzIFBldCB7XHJcblxyXG4gICAgYnVmZl9ub2RlX2JhY2s6Y2MuTm9kZT1udWxsO1xyXG4gICAgYnVmZl9ub2RlX2Zyb250OmNjLk5vZGU9bnVsbDtcclxuXHJcbiAgICBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgdGhpcy5hZGRBdHRhY2tMaXN0ZW4odGhpcy5vbkF0dGFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgb25BdHRhY2sobW9uc3RlcjpjYy5Ob2RlKXtcclxuICAgICAgICAvL+WKoOaUu+mAn1xyXG4gICAgICAgIGxldCBidWZmPW5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgIGJ1ZmYuYnVmZl9pZD1CdWZmSWQuUGV0M19KaWFTdTtcclxuICAgICAgICBidWZmLmJ1ZmZfdmFsdWU9W3RoaXMucGV0X2RhdGEuZ2V0U2tpbGxWYWx1ZTEoUGV0U2tpbGxUeXBlLkFjdGl2ZSldO1xyXG4gICAgICAgIGJ1ZmYucmVtYWluX3RpbWU9dGhpcy5wZXRfZGF0YS5nZXRTa2lsbFZhbHVlMihQZXRTa2lsbFR5cGUuQWN0aXZlKTtcclxuICAgICAgICBidWZmLmJ1ZmZfdHlwZT1CdWZmVHlwZS5HYWluO1xyXG4gICAgICAgIGxldCBoZXJvPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVybyh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgbGV0IGJ1ZmZUaW1lcj1oZXJvLmFkZEJ1ZmYoYnVmZik7XHJcbiAgICAgICAgYnVmZlRpbWVyLmFkZERlc3Ryb3lMaXN0ZW4odGhpcy5vbkJ1ZmZEZXN0cm95LmJpbmQodGhpcykpO1xyXG4gICAgICAgIGxldCBwb3M9aGVyby5ub2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5idWZmX25vZGVfYmFjaz1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0Rm9yUGFyZW50KEdhbWVFZmZlY3RJZC5wZXQzX3NraWxsX2JhY2sscG9zLGNjLmZpbmQoXCJDYW52YXMvSGVyb19TaGFkb3dfUm9vdFwiKSk7XHJcbiAgICAgICAgdGhpcy5idWZmX25vZGVfZnJvbnQ9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEZvclBhcmVudChHYW1lRWZmZWN0SWQucGV0M19za2lsbF9mcm9udCxwb3MsY2MuZmluZChcIkNhbnZhcy9QZXRfUm9vdFwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25CdWZmRGVzdHJveShidWZmOkJ1ZmZEYXRhKXtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLnBldDNfc2tpbGxfYmFjayx0aGlzLmJ1ZmZfbm9kZV9iYWNrKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLnBldDNfc2tpbGxfZnJvbnQsdGhpcy5idWZmX25vZGVfZnJvbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdDpudW1iZXIpe1xyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUhPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2hlY2tTa2lsbChkdCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tTa2lsbChkdDpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuY2RfdGltZS09ZHQ7XHJcbiAgICAgICAgaWYodGhpcy5jZF90aW1lPDApe1xyXG4gICAgICAgICAgICB0aGlzLmNkX3RpbWU9MDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19