
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Game/FireBullect.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '55644Hy2jxEn7rgaxmWRkla', 'FireBullect');
// Scripts/Pet/Game/FireBullect.ts

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
var GroundManager_1 = require("../../Game/GroundManager");
var Bullect_1 = require("../../Hero/Game/Bullect");
var PetConfig_1 = require("../PetConfig");
var FireRing_1 = require("./FireRing");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FireBullect = /** @class */ (function (_super) {
    __extends(FireBullect, _super);
    function FireBullect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pet_data = null;
        return _this;
    }
    FireBullect.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addCollisionMonsterListen.call(this, this.onCollisionMonster);
    };
    FireBullect.prototype.initPetData = function (petData) {
        this.pet_data = petData;
    };
    FireBullect.prototype.onCollisionMonster = function (monsterTs) {
        if (monsterTs) {
            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.pet2_attack_hit, this.getHeadPos());
            var fireRing = GroundManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.pet2_skill, monsterTs.node.getPosition());
            fireRing.getComponent(FireRing_1.default).init(GameEffectsManager_1.GameEffectId.pet2_skill, this.gongji_data, this.pet_data.getSkillValue3(PetConfig_1.PetSkillType.Active), this.pet_data.getSkillValue1(PetConfig_1.PetSkillType.Active), 1);
            //fireRing.getComponent(FireRing).init(GameEffectId.pet2_skill,this.gongji_data,10,200,1);
            this.destroySelf();
        }
    };
    FireBullect = __decorate([
        ccclass
    ], FireBullect);
    return FireBullect;
}(Bullect_1.default));
exports.default = FireBullect;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxHYW1lXFxGaXJlQnVsbGVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBaUY7QUFDakYsMERBQXFEO0FBRXJELG1EQUE4QztBQUs5QywwQ0FBNEM7QUFDNUMsdUNBQWtDO0FBSTVCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXlDLCtCQUFPO0lBQWhEO1FBQUEscUVBdUJDO1FBckJHLGNBQVEsR0FBUyxJQUFJLENBQUM7O0lBcUIxQixDQUFDO0lBbkJHLDRCQUFNLEdBQU47UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLGlCQUFNLHlCQUF5QixZQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxpQ0FBVyxHQUFYLFVBQVksT0FBZTtRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFDLE9BQU8sQ0FBQztJQUMxQixDQUFDO0lBRUQsd0NBQWtCLEdBQWxCLFVBQW1CLFNBQWlCO1FBQ2hDLElBQUcsU0FBUyxFQUFDO1lBQ1QsdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsaUNBQVksQ0FBQyxlQUFlLEVBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFDdEcsSUFBSSxRQUFRLEdBQUMsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxpQ0FBWSxDQUFDLFVBQVUsRUFBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFDcEgsUUFBUSxDQUFDLFlBQVksQ0FBQyxrQkFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLGlDQUFZLENBQUMsVUFBVSxFQUFDLElBQUksQ0FBQyxXQUFXLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsd0JBQVksQ0FBQyxNQUFNLENBQUMsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyx3QkFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JMLDBGQUEwRjtZQUMxRixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEI7SUFDTCxDQUFDO0lBckJnQixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBdUIvQjtJQUFELGtCQUFDO0NBdkJELEFBdUJDLENBdkJ3QyxpQkFBTyxHQXVCL0M7a0JBdkJvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZUVmZmVjdHNNYW5hZ2VyLCBHYW1lRWZmZWN0SWQgfSBmcm9tIFwiLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IEdyb3VuZE1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWUvR3JvdW5kTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBCdWZmRGF0YSB9IGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvQnVmZkRhdGFcIjtcclxuaW1wb3J0IEJ1bGxlY3QgZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9CdWxsZWN0XCI7XHJcbmltcG9ydCB7IEJ1ZmZJZCwgQnVmZlR5cGUsIFNraWxsVHlwZSB9IGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQZXREYXRhIH0gZnJvbSBcIi4uL0RhdGEvUGV0RGF0YVwiO1xyXG5pbXBvcnQgeyBQZXRTa2lsbFR5cGUgfSBmcm9tIFwiLi4vUGV0Q29uZmlnXCI7XHJcbmltcG9ydCBGaXJlUmluZyBmcm9tIFwiLi9GaXJlUmluZ1wiO1xyXG5cclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpcmVCdWxsZWN0IGV4dGVuZHMgQnVsbGVjdCB7XHJcblxyXG4gICAgcGV0X2RhdGE6UGV0RGF0YT1udWxsO1xyXG5cclxuICAgIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICBzdXBlci5hZGRDb2xsaXNpb25Nb25zdGVyTGlzdGVuKHRoaXMub25Db2xsaXNpb25Nb25zdGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0UGV0RGF0YShwZXREYXRhOlBldERhdGEpe1xyXG4gICAgICAgIHRoaXMucGV0X2RhdGE9cGV0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNvbGxpc2lvbk1vbnN0ZXIobW9uc3RlclRzOk1vbnN0ZXIpIHtcclxuICAgICAgICBpZihtb25zdGVyVHMpe1xyXG4gICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQucGV0Ml9hdHRhY2tfaGl0LHRoaXMuZ2V0SGVhZFBvcygpKTtcclxuICAgICAgICAgICAgbGV0IGZpcmVSaW5nPUdyb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQucGV0Ml9za2lsbCxtb25zdGVyVHMubm9kZS5nZXRQb3NpdGlvbigpKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgZmlyZVJpbmcuZ2V0Q29tcG9uZW50KEZpcmVSaW5nKS5pbml0KEdhbWVFZmZlY3RJZC5wZXQyX3NraWxsLHRoaXMuZ29uZ2ppX2RhdGEsdGhpcy5wZXRfZGF0YS5nZXRTa2lsbFZhbHVlMyhQZXRTa2lsbFR5cGUuQWN0aXZlKSx0aGlzLnBldF9kYXRhLmdldFNraWxsVmFsdWUxKFBldFNraWxsVHlwZS5BY3RpdmUpLDEpO1xyXG4gICAgICAgICAgICAvL2ZpcmVSaW5nLmdldENvbXBvbmVudChGaXJlUmluZykuaW5pdChHYW1lRWZmZWN0SWQucGV0Ml9za2lsbCx0aGlzLmdvbmdqaV9kYXRhLDEwLDIwMCwxKTtcclxuICAgICAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=