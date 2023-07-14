
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Game/FirePet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'eb33cKpBXZNwZryE9HCrDZV', 'FirePet');
// Scripts/Pet/Game/FirePet.ts

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
var FireBullect_1 = require("./FireBullect");
var Pet_1 = require("./Pet");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FirePet = /** @class */ (function (_super) {
    __extends(FirePet, _super);
    function FirePet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FirePet.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.addAttackListen(this.onAttack);
    };
    FirePet.prototype.onAttack = function (monster) {
        var pos = this.node.getPosition();
        var offsetPos = monster.getComponent(Monster_1.default).getCenterPos().sub(pos);
        var dir = Math.atan2(offsetPos.y, offsetPos.x);
        var fireBullect = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.pet2_attack, pos);
        var fireBts = fireBullect.getComponent(FireBullect_1.default);
        fireBts.init(GameEffectsManager_1.GameEffectId.pet2_attack, 1000, dir, _super.prototype.getGongJiData.call(this, true, this.pet_data.getSkillValue2(PetConfig_1.PetSkillType.Active)));
        fireBts.initPetData(this.pet_data);
    };
    FirePet.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) {
            return;
        }
        this.checkSkill(dt);
    };
    FirePet.prototype.checkSkill = function (dt) {
        this.cd_time -= dt;
        if (this.cd_time < 0) {
            this.cd_time = 0;
        }
    };
    FirePet = __decorate([
        ccclass
    ], FirePet);
    return FirePet;
}(Pet_1.default));
exports.default = FirePet;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxHYW1lXFxGaXJlUGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLDZDQUE0QztBQUM1QyxvRUFBaUY7QUFDakYsaURBQTRDO0FBQzVDLGlEQUE0QztBQUM1QywwQ0FBNEM7QUFDNUMsNkNBQXdDO0FBQ3hDLDZCQUF3QjtBQUVsQixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFxQywyQkFBRztJQUF4Qzs7SUFnQ0EsQ0FBQztJQTdCRyx3QkFBTSxHQUFOO1FBQ0ksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFDZixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsMEJBQVEsR0FBUixVQUFTLE9BQWU7UUFDcEIsSUFBSSxHQUFHLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNoQyxJQUFJLFNBQVMsR0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLGlCQUFPLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEUsSUFBSSxHQUFHLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QyxJQUFJLFdBQVcsR0FBQyx1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxpQ0FBWSxDQUFDLFdBQVcsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUNwRyxJQUFJLE9BQU8sR0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLHFCQUFXLENBQUMsQ0FBQztRQUNsRCxPQUFPLENBQUMsSUFBSSxDQUFDLGlDQUFZLENBQUMsV0FBVyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsaUJBQU0sYUFBYSxZQUFDLElBQUksRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyx3QkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1SCxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsd0JBQU0sR0FBTixVQUFPLEVBQVM7UUFDWixJQUFHLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxJQUFFLHFCQUFTLENBQUMsWUFBWSxFQUNuRTtZQUNJLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELDRCQUFVLEdBQVYsVUFBVyxFQUFTO1FBQ2hCLElBQUksQ0FBQyxPQUFPLElBQUUsRUFBRSxDQUFDO1FBQ2pCLElBQUcsSUFBSSxDQUFDLE9BQU8sR0FBQyxDQUFDLEVBQUM7WUFDZCxJQUFJLENBQUMsT0FBTyxHQUFDLENBQUMsQ0FBQztTQUNsQjtJQUNMLENBQUM7SUEvQmdCLE9BQU87UUFEM0IsT0FBTztPQUNhLE9BQU8sQ0FnQzNCO0lBQUQsY0FBQztDQWhDRCxBQWdDQyxDQWhDb0MsYUFBRyxHQWdDdkM7a0JBaENvQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5pbXBvcnQgeyBHYW1lU3RhdGUgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4uLy4uL01vbnN0ZXIvTW9uc3RlclwiO1xyXG5pbXBvcnQgeyBQZXRTa2lsbFR5cGUgfSBmcm9tIFwiLi4vUGV0Q29uZmlnXCI7XHJcbmltcG9ydCBGaXJlQnVsbGVjdCBmcm9tIFwiLi9GaXJlQnVsbGVjdFwiO1xyXG5pbXBvcnQgUGV0IGZyb20gXCIuL1BldFwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaXJlUGV0IGV4dGVuZHMgUGV0IHtcclxuXHJcblxyXG4gICAgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIHRoaXMuYWRkQXR0YWNrTGlzdGVuKHRoaXMub25BdHRhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQXR0YWNrKG1vbnN0ZXI6Y2MuTm9kZSl7XHJcbiAgICAgICAgbGV0IHBvcz10aGlzLm5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICBsZXQgb2Zmc2V0UG9zPW1vbnN0ZXIuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpLmdldENlbnRlclBvcygpLnN1Yihwb3MpO1xyXG4gICAgICAgIGxldCBkaXI9TWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCk7XHJcbiAgICAgICAgbGV0IGZpcmVCdWxsZWN0PUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5wZXQyX2F0dGFjayxwb3MpO1xyXG4gICAgICAgIGxldCBmaXJlQnRzPWZpcmVCdWxsZWN0LmdldENvbXBvbmVudChGaXJlQnVsbGVjdCk7XHJcbiAgICAgICAgZmlyZUJ0cy5pbml0KEdhbWVFZmZlY3RJZC5wZXQyX2F0dGFjaywxMDAwLGRpcixzdXBlci5nZXRHb25nSmlEYXRhKHRydWUsdGhpcy5wZXRfZGF0YS5nZXRTa2lsbFZhbHVlMihQZXRTa2lsbFR5cGUuQWN0aXZlKSkpO1xyXG4gICAgICAgIGZpcmVCdHMuaW5pdFBldERhdGEodGhpcy5wZXRfZGF0YSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVwZGF0ZShkdDpudW1iZXIpe1xyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUhPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2hlY2tTa2lsbChkdCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tTa2lsbChkdDpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuY2RfdGltZS09ZHQ7XHJcbiAgICAgICAgaWYodGhpcy5jZF90aW1lPDApe1xyXG4gICAgICAgICAgICB0aGlzLmNkX3RpbWU9MDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19