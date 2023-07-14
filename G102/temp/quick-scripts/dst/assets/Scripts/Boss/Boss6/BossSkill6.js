
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Boss/Boss6/BossSkill6.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6bb67ebjRFOr4hQb7odFstz', 'BossSkill6');
// Scripts/Boss/Boss6/BossSkill6.ts

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
var GameManager_1 = require("../../GameManager");
var BuffData_1 = require("../../Hero/Game/BuffData");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var WallConfig_1 = require("../../Wall/WallConfig");
var BossBullet_1 = require("../BossBullet");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BossSkill6 = /** @class */ (function (_super) {
    __extends(BossSkill6, _super);
    function BossSkill6() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.att_hero = HeroConfig_1.Hero_Type.NULL;
        _this.gongsu_value = 0;
        return _this;
    }
    BossSkill6.prototype.onLoad = function () {
        _super.prototype.addCollisionWallListen.call(this, this.onCollisionWall);
    };
    BossSkill6.prototype.setHeroType = function (heroType, value) {
        this.att_hero = heroType;
        this.gongsu_value = value;
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    BossSkill6.prototype.onCollisionWall = function (wall) {
        if (wall) {
            this.monster_att_data.is_big = false;
            var data = wall.beInjured(this.monster_att_data);
            _super.prototype.destroySelf.call(this);
            if (data.getDamageNum() > 0) {
                GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss6_skill2_hit, this.node.getPosition());
                if (wall.getWallType() == WallConfig_1.WallType.Main && this.att_hero != HeroConfig_1.Hero_Type.NULL) {
                    //减速
                    var buffData = new BuffData_1.BuffData();
                    buffData.buff_id = HeroConfig_1.BuffId.Boss6_Skill_2_jiangongsu;
                    buffData.remain_time = 5;
                    buffData.buff_value = [this.gongsu_value];
                    buffData.max_floor = 5;
                    GameManager_1.default.getInstance().all_hero.get(this.att_hero).addDeBuff(buffData);
                }
            }
        }
    };
    BossSkill6 = __decorate([
        ccclass
    ], BossSkill6);
    return BossSkill6;
}(BossBullet_1.default));
exports.default = BossSkill6;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQm9zc1xcQm9zczZcXEJvc3NTa2lsbDYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQWlGO0FBQ2pGLGlEQUE0QztBQUM1QyxxREFBb0Q7QUFDcEQseURBQXlFO0FBRXpFLG9EQUFpRDtBQUNqRCw0Q0FBdUM7QUFFakMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBd0MsOEJBQVU7SUFBbEQ7UUFBQSxxRUFtQ0M7UUFqQ0csY0FBUSxHQUFXLHNCQUFTLENBQUMsSUFBSSxDQUFDO1FBQ2xDLGtCQUFZLEdBQVEsQ0FBQyxDQUFDOztJQWdDMUIsQ0FBQztJQTlCRywyQkFBTSxHQUFOO1FBQ0ksaUJBQU0sc0JBQXNCLFlBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxnQ0FBVyxHQUFYLFVBQVksUUFBa0IsRUFBQyxLQUFZO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUMsUUFBUSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUMsS0FBSyxDQUFDO0lBQzVCLENBQUM7SUFFRCxrR0FBa0c7SUFDbEcsb0NBQWUsR0FBZixVQUFnQixJQUFTO1FBQ3JCLElBQUcsSUFBSSxFQUFDO1lBQ0osSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUM7WUFDbkMsSUFBSSxJQUFJLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtZQUM5QyxpQkFBTSxXQUFXLFdBQUUsQ0FBQztZQUNwQixJQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBQyxDQUFDLEVBQUM7Z0JBQ3JCLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLG9CQUFvQixDQUFDLGlDQUFZLENBQUMsZ0JBQWdCLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO2dCQUM3RyxJQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBRSxxQkFBUSxDQUFDLElBQUksSUFBRSxJQUFJLENBQUMsUUFBUSxJQUFFLHNCQUFTLENBQUMsSUFBSSxFQUFDO29CQUNoRSxJQUFJO29CQUNKLElBQUksUUFBUSxHQUFDLElBQUksbUJBQVEsRUFBRSxDQUFDO29CQUM1QixRQUFRLENBQUMsT0FBTyxHQUFDLG1CQUFNLENBQUMsd0JBQXdCLENBQUM7b0JBQ2pELFFBQVEsQ0FBQyxXQUFXLEdBQUMsQ0FBQyxDQUFDO29CQUN2QixRQUFRLENBQUMsVUFBVSxHQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUN4QyxRQUFRLENBQUMsU0FBUyxHQUFDLENBQUMsQ0FBQztvQkFDckIscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQzdFO2FBQ0o7U0FFSjtJQUNMLENBQUM7SUFsQ2dCLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FtQzlCO0lBQUQsaUJBQUM7Q0FuQ0QsQUFtQ0MsQ0FuQ3VDLG9CQUFVLEdBbUNqRDtrQkFuQ29CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEJ1ZmZEYXRhIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9CdWZmRGF0YVwiO1xyXG5pbXBvcnQgeyBCdWZmSWQsIEJ1ZmZUeXBlLCBIZXJvX1R5cGUgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IFdhbGwgZnJvbSBcIi4uLy4uL1dhbGwvV2FsbFwiO1xyXG5pbXBvcnQgeyBXYWxsVHlwZSB9IGZyb20gXCIuLi8uLi9XYWxsL1dhbGxDb25maWdcIjtcclxuaW1wb3J0IEJvc3NCdWxsZXQgZnJvbSBcIi4uL0Jvc3NCdWxsZXRcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9zc1NraWxsNiBleHRlbmRzIEJvc3NCdWxsZXQge1xyXG5cclxuICAgIGF0dF9oZXJvOkhlcm9fVHlwZT1IZXJvX1R5cGUuTlVMTDtcclxuICAgIGdvbmdzdV92YWx1ZTpudW1iZXI9MDtcclxuXHJcbiAgICBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuYWRkQ29sbGlzaW9uV2FsbExpc3Rlbih0aGlzLm9uQ29sbGlzaW9uV2FsbCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNldEhlcm9UeXBlKGhlcm9UeXBlOkhlcm9fVHlwZSx2YWx1ZTpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuYXR0X2hlcm89aGVyb1R5cGU7XHJcbiAgICAgICAgdGhpcy5nb25nc3VfdmFsdWU9dmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t56Kw5pKe5byA5aeLLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgb25Db2xsaXNpb25XYWxsKHdhbGw6V2FsbCkge1xyXG4gICAgICAgIGlmKHdhbGwpe1xyXG4gICAgICAgICAgICB0aGlzLm1vbnN0ZXJfYXR0X2RhdGEuaXNfYmlnPWZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgZGF0YT13YWxsLmJlSW5qdXJlZCh0aGlzLm1vbnN0ZXJfYXR0X2RhdGEpXHJcbiAgICAgICAgICAgIHN1cGVyLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgICAgIGlmKGRhdGEuZ2V0RGFtYWdlTnVtKCk+MCl7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmJvc3M2X3NraWxsMl9oaXQsdGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgaWYod2FsbC5nZXRXYWxsVHlwZSgpPT1XYWxsVHlwZS5NYWluJiZ0aGlzLmF0dF9oZXJvIT1IZXJvX1R5cGUuTlVMTCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lh4/pgJ9cclxuICAgICAgICAgICAgICAgICAgICBsZXQgYnVmZkRhdGE9bmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl9pZD1CdWZmSWQuQm9zczZfU2tpbGxfMl9qaWFuZ29uZ3N1O1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lPTU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl92YWx1ZT1bdGhpcy5nb25nc3VfdmFsdWVdO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLm1heF9mbG9vcj01O1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm8uZ2V0KHRoaXMuYXR0X2hlcm8pLmFkZERlQnVmZihidWZmRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==