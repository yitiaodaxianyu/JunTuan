
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Game/IcePet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ea625FWpVxHMIbwGLHxEZWA', 'IcePet');
// Scripts/Pet/Game/IcePet.ts

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
var Monster_1 = require("../../Monster/Monster");
var PetConfig_1 = require("../PetConfig");
var IceBullect_1 = require("./IceBullect");
var Pet_1 = require("./Pet");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var IcePet = /** @class */ (function (_super) {
    __extends(IcePet, _super);
    function IcePet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IcePet.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.addAttackListen(this.onAttack);
    };
    IcePet.prototype.onAttack = function (monster) {
        var pos = this.node.getPosition();
        var offsetPos = monster.getComponent(Monster_1.default).getCenterPos().sub(pos);
        var dir = Math.atan2(offsetPos.y, offsetPos.x);
        var fireBullect = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.pet1_attack, pos);
        var ice = fireBullect.getComponent(IceBullect_1.default);
        ice.init(GameEffectsManager_1.GameEffectId.pet1_attack, 1000, dir, _super.prototype.getGongJiData.call(this, true, this.pet_data.getSkillValue2(PetConfig_1.PetSkillType.Active)));
        ice.initPetData(this.pet_data);
    };
    IcePet.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) {
            return;
        }
        this.checkSkill(dt);
    };
    IcePet.prototype.checkSkill = function (dt) {
        this.cd_time -= dt;
        if (this.cd_time < 0) {
            this.cd_time = 0;
        }
    };
    IcePet = __decorate([
        ccclass
    ], IcePet);
    return IcePet;
}(Pet_1.default));
exports.default = IcePet;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxHYW1lXFxJY2VQZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsNkNBQTRDO0FBQzVDLG9FQUFpRjtBQUNqRixpREFBNEM7QUFDNUMsaURBQTRDO0FBQzVDLDBDQUE0QztBQUM1QywyQ0FBc0M7QUFDdEMsNkJBQXdCO0FBRWxCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQW9DLDBCQUFHO0lBQXZDOztJQWtDQSxDQUFDO0lBL0JHLHVCQUFNLEdBQU47UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCx5QkFBUSxHQUFSLFVBQVMsT0FBZTtRQUNwQixJQUFJLEdBQUcsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hDLElBQUksU0FBUyxHQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsaUJBQU8sQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwRSxJQUFJLEdBQUcsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVDLElBQUksV0FBVyxHQUFDLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLG9CQUFvQixDQUFDLGlDQUFZLENBQUMsV0FBVyxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BHLElBQUksR0FBRyxHQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsb0JBQVUsQ0FBQyxDQUFDO1FBQzdDLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUNBQVksQ0FBQyxXQUFXLEVBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxpQkFBTSxhQUFhLFlBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLHdCQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hILEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCx1QkFBTSxHQUFOLFVBQU8sRUFBUztRQUNaLElBQUcscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLElBQUUscUJBQVMsQ0FBQyxZQUFZLEVBQ25FO1lBQ0ksT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBSUQsMkJBQVUsR0FBVixVQUFXLEVBQVM7UUFDaEIsSUFBSSxDQUFDLE9BQU8sSUFBRSxFQUFFLENBQUM7UUFDakIsSUFBRyxJQUFJLENBQUMsT0FBTyxHQUFDLENBQUMsRUFBQztZQUNkLElBQUksQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDO1NBQ2xCO0lBQ0wsQ0FBQztJQWpDZ0IsTUFBTTtRQUQxQixPQUFPO09BQ2EsTUFBTSxDQWtDMUI7SUFBRCxhQUFDO0NBbENELEFBa0NDLENBbENtQyxhQUFHLEdBa0N0QztrQkFsQ29CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdElkLCBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyXCI7XHJcbmltcG9ydCB7IFBldFNraWxsVHlwZSB9IGZyb20gXCIuLi9QZXRDb25maWdcIjtcclxuaW1wb3J0IEljZUJ1bGxlY3QgZnJvbSBcIi4vSWNlQnVsbGVjdFwiO1xyXG5pbXBvcnQgUGV0IGZyb20gXCIuL1BldFwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJY2VQZXQgZXh0ZW5kcyBQZXQge1xyXG5cclxuXHJcbiAgICBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgdGhpcy5hZGRBdHRhY2tMaXN0ZW4odGhpcy5vbkF0dGFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgb25BdHRhY2sobW9uc3RlcjpjYy5Ob2RlKXtcclxuICAgICAgICBsZXQgcG9zPXRoaXMubm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIGxldCBvZmZzZXRQb3M9bW9uc3Rlci5nZXRDb21wb25lbnQoTW9uc3RlcikuZ2V0Q2VudGVyUG9zKCkuc3ViKHBvcyk7XHJcbiAgICAgICAgbGV0IGRpcj1NYXRoLmF0YW4yKG9mZnNldFBvcy55LG9mZnNldFBvcy54KTtcclxuICAgICAgICBsZXQgZmlyZUJ1bGxlY3Q9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLnBldDFfYXR0YWNrLHBvcyk7XHJcbiAgICAgICAgbGV0IGljZT1maXJlQnVsbGVjdC5nZXRDb21wb25lbnQoSWNlQnVsbGVjdCk7XHJcbiAgICAgICAgaWNlLmluaXQoR2FtZUVmZmVjdElkLnBldDFfYXR0YWNrLDEwMDAsZGlyLHN1cGVyLmdldEdvbmdKaURhdGEodHJ1ZSx0aGlzLnBldF9kYXRhLmdldFNraWxsVmFsdWUyKFBldFNraWxsVHlwZS5BY3RpdmUpKSk7XHJcbiAgICAgICAgaWNlLmluaXRQZXREYXRhKHRoaXMucGV0X2RhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdDpudW1iZXIpe1xyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUhPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2hlY2tTa2lsbChkdCk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgY2hlY2tTa2lsbChkdDpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuY2RfdGltZS09ZHQ7XHJcbiAgICAgICAgaWYodGhpcy5jZF90aW1lPDApe1xyXG4gICAgICAgICAgICB0aGlzLmNkX3RpbWU9MDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19