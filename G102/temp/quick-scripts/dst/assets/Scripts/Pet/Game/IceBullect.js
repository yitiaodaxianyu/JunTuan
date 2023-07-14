
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Game/IceBullect.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b7b890z/zBLk640xE9rG/xI', 'IceBullect');
// Scripts/Pet/Game/IceBullect.ts

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
var GameEffectsManager_1 = require("../../Game/GameEffectsManager");
var BuffData_1 = require("../../Hero/Game/BuffData");
var Bullect_1 = require("../../Hero/Game/Bullect");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var Monster_1 = require("../../Monster/Monster");
var MonsterManager_1 = require("../../Monster/MonsterManager");
var PetConfig_1 = require("../PetConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var IceBullect = /** @class */ (function (_super) {
    __extends(IceBullect, _super);
    function IceBullect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pet_data = null;
        return _this;
    }
    IceBullect.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addCollisionMonsterListen.call(this, this.onCollisionMonster);
    };
    IceBullect.prototype.initPetData = function (petData) {
        this.pet_data = petData;
    };
    IceBullect.prototype.start = function () {
        this.tuowei_space = 1;
    };
    IceBullect.prototype.onCollisionMonster = function (monsterTs) {
        if (monsterTs) {
            var radius = this.pet_data.getSkillValue1(PetConfig_1.PetSkillType.Active);
            var monsters = MonsterManager_1.default.getInstance().getMonstersForCenterPos(-1, monsterTs.getCenterPos(), radius);
            if (monsters) {
                var jiansuValue = this.pet_data.getSkillValue3(PetConfig_1.PetSkillType.Active);
                for (var i = 0; i < monsters.length; i++) {
                    var monsterTTs = monsters[i].getComponent(Monster_1.default);
                    var data = monsterTTs.beFlashInjured(this.gongji_data);
                    if (!data.is_die && data.getDamageNum() > 0) {
                        GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.pet1_attack_hit, monsterTTs.getCenterPos());
                        var buffData = new BuffData_1.BuffData();
                        buffData.buff_id = HeroConfig_1.BuffId.Pet1_JianSu;
                        buffData.buff_type = HeroConfig_1.BuffType.Slowdown;
                        buffData.buff_value = [jiansuValue];
                        buffData.remain_time = 3;
                        monsterTTs.addDeBuff(buffData, this.gongji_data);
                    }
                }
            }
        }
        this.destroySelf();
    };
    IceBullect = __decorate([
        ccclass
    ], IceBullect);
    return IceBullect;
}(Bullect_1.default));
exports.default = IceBullect;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxHYW1lXFxJY2VCdWxsZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9FQUFpRjtBQUNqRixxREFBb0Q7QUFDcEQsbURBQThDO0FBQzlDLHlEQUF5RTtBQUN6RSxpREFBNEM7QUFFNUMsK0RBQTBEO0FBRTFELDBDQUE0QztBQUl0QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF3Qyw4QkFBTztJQUEvQztRQUFBLHFFQTBDQztRQXhDRyxjQUFRLEdBQVMsSUFBSSxDQUFDOztJQXdDMUIsQ0FBQztJQXRDRywyQkFBTSxHQUFOO1FBQ0ksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFDZixpQkFBTSx5QkFBeUIsWUFBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsZ0NBQVcsR0FBWCxVQUFZLE9BQWU7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBQyxPQUFPLENBQUM7SUFDMUIsQ0FBQztJQUVTLDBCQUFLLEdBQWY7UUFDSSxJQUFJLENBQUMsWUFBWSxHQUFDLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRUQsdUNBQWtCLEdBQWxCLFVBQW1CLFNBQWlCO1FBQ2hDLElBQUcsU0FBUyxFQUNaO1lBQ0ksSUFBSSxNQUFNLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsd0JBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM3RCxJQUFJLFFBQVEsR0FBQyx3QkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxFQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsRUFBQyxNQUFNLENBQUMsQ0FBQztZQUN0RyxJQUFHLFFBQVEsRUFBQztnQkFDUixJQUFJLFdBQVcsR0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyx3QkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNsRSxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztvQkFDaEMsSUFBSSxVQUFVLEdBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxpQkFBTyxDQUFDLENBQUM7b0JBQ2pELElBQUksSUFBSSxHQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUNyRCxJQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLEdBQUMsQ0FBQyxFQUFDO3dCQUNyQyx1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxpQ0FBWSxDQUFDLGVBQWUsRUFBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQzt3QkFDOUcsSUFBSSxRQUFRLEdBQUMsSUFBSSxtQkFBUSxFQUFFLENBQUM7d0JBQzVCLFFBQVEsQ0FBQyxPQUFPLEdBQUMsbUJBQU0sQ0FBQyxXQUFXLENBQUM7d0JBQ3BDLFFBQVEsQ0FBQyxTQUFTLEdBQUMscUJBQVEsQ0FBQyxRQUFRLENBQUM7d0JBQ3JDLFFBQVEsQ0FBQyxVQUFVLEdBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDbEMsUUFBUSxDQUFDLFdBQVcsR0FBQyxDQUFDLENBQUM7d0JBQ3ZCLFVBQVUsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztxQkFDbkQ7aUJBQ0o7YUFDSjtTQUNKO1FBQ0QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUF4Q2dCLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0EwQzlCO0lBQUQsaUJBQUM7Q0ExQ0QsQUEwQ0MsQ0ExQ3VDLGlCQUFPLEdBMEM5QztrQkExQ29CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJc0RlYnVnIH0gZnJvbSBcIi4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0c01hbmFnZXIsIEdhbWVFZmZlY3RJZCB9IGZyb20gXCIuLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBCdWZmRGF0YSB9IGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvQnVmZkRhdGFcIjtcclxuaW1wb3J0IEJ1bGxlY3QgZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9CdWxsZWN0XCI7XHJcbmltcG9ydCB7IEJ1ZmZJZCwgQnVmZlR5cGUsIFNraWxsVHlwZSB9IGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyXCI7XHJcbmltcG9ydCB7IFN0cmVuZ3RoVHlwZSB9IGZyb20gXCIuLi8uLi9Nb25zdGVyL01vbnN0ZXJEYXRhXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQZXREYXRhIH0gZnJvbSBcIi4uL0RhdGEvUGV0RGF0YVwiO1xyXG5pbXBvcnQgeyBQZXRTa2lsbFR5cGUgfSBmcm9tIFwiLi4vUGV0Q29uZmlnXCI7XHJcblxyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSWNlQnVsbGVjdCBleHRlbmRzIEJ1bGxlY3Qge1xyXG5cclxuICAgIHBldF9kYXRhOlBldERhdGE9bnVsbDtcclxuXHJcbiAgICBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgc3VwZXIuYWRkQ29sbGlzaW9uTW9uc3Rlckxpc3Rlbih0aGlzLm9uQ29sbGlzaW9uTW9uc3Rlcik7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFBldERhdGEocGV0RGF0YTpQZXREYXRhKXtcclxuICAgICAgICB0aGlzLnBldF9kYXRhPXBldERhdGE7XHJcbiAgICB9ICAgICBcclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50dW93ZWlfc3BhY2U9MTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNvbGxpc2lvbk1vbnN0ZXIobW9uc3RlclRzOk1vbnN0ZXIpIHtcclxuICAgICAgICBpZihtb25zdGVyVHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgcmFkaXVzPXRoaXMucGV0X2RhdGEuZ2V0U2tpbGxWYWx1ZTEoUGV0U2tpbGxUeXBlLkFjdGl2ZSk7XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVycz1Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vbnN0ZXJzRm9yQ2VudGVyUG9zKC0xLG1vbnN0ZXJUcy5nZXRDZW50ZXJQb3MoKSxyYWRpdXMpO1xyXG4gICAgICAgICAgICBpZihtb25zdGVycyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgamlhbnN1VmFsdWU9dGhpcy5wZXRfZGF0YS5nZXRTa2lsbFZhbHVlMyhQZXRTa2lsbFR5cGUuQWN0aXZlKTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPG1vbnN0ZXJzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclRUcz1tb25zdGVyc1tpXS5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGE9bW9uc3RlclRUcy5iZUZsYXNoSW5qdXJlZCh0aGlzLmdvbmdqaV9kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBpZighZGF0YS5pc19kaWUgJiYgZGF0YS5nZXREYW1hZ2VOdW0oKT4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLnBldDFfYXR0YWNrX2hpdCxtb25zdGVyVFRzLmdldENlbnRlclBvcygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJ1ZmZEYXRhPW5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX2lkPUJ1ZmZJZC5QZXQxX0ppYW5TdTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl90eXBlPUJ1ZmZUeXBlLlNsb3dkb3duO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3ZhbHVlPVtqaWFuc3VWYWx1ZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lPTM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJUVHMuYWRkRGVCdWZmKGJ1ZmZEYXRhLHRoaXMuZ29uZ2ppX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7ICAgIFxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=