
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/Elite/EliteAtt78.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '79c83vlvx9DJoavTG74W8vs', 'EliteAtt78');
// Scripts/Monster/Elite/EliteAtt78.ts

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
var BossBullet_1 = require("../../Boss/BossBullet");
var GameEffectsManager_1 = require("../../Game/GameEffectsManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EliteAtt78 = /** @class */ (function (_super) {
    __extends(EliteAtt78, _super);
    function EliteAtt78() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EliteAtt78.prototype.onLoad = function () {
        _super.prototype.addCollisionWallListen.call(this, this.onCollisionWall);
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    EliteAtt78.prototype.onCollisionWall = function (wall) {
        if (wall) {
            this.monster_att_data.is_big = false;
            var data = wall.beInjured(this.monster_att_data);
            _super.prototype.destroySelf.call(this);
            if (data.getDamageNum() > 0) {
                GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster78_skill_bullect_hit, this.node.getPosition());
            }
        }
    };
    EliteAtt78 = __decorate([
        ccclass
    ], EliteAtt78);
    return EliteAtt78;
}(BossBullet_1.default));
exports.default = EliteAtt78;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcRWxpdGVcXEVsaXRlQXR0NzgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQStDO0FBQy9DLG9FQUFpRjtBQUczRSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF3Qyw4QkFBVTtJQUFsRDs7SUFvQkEsQ0FBQztJQWxCRywyQkFBTSxHQUFOO1FBQ0ksaUJBQU0sc0JBQXNCLFlBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFHRCxrR0FBa0c7SUFDbEcsb0NBQWUsR0FBZixVQUFnQixJQUFTO1FBQ3JCLElBQUcsSUFBSSxFQUFDO1lBQ0osSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUM7WUFDbkMsSUFBSSxJQUFJLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtZQUM5QyxpQkFBTSxXQUFXLFdBQUUsQ0FBQztZQUNwQixJQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBQyxDQUFDLEVBQUM7Z0JBQ3JCLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLG9CQUFvQixDQUFDLGlDQUFZLENBQUMsMkJBQTJCLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO2FBRTNIO1NBRUo7SUFDTCxDQUFDO0lBbkJnQixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBb0I5QjtJQUFELGlCQUFDO0NBcEJELEFBb0JDLENBcEJ1QyxvQkFBVSxHQW9CakQ7a0JBcEJvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJvc3NCdWxsZXQgZnJvbSBcIi4uLy4uL0Jvc3MvQm9zc0J1bGxldFwiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgV2FsbCBmcm9tIFwiLi4vLi4vV2FsbC9XYWxsXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsaXRlQXR0NzggZXh0ZW5kcyBCb3NzQnVsbGV0IHtcclxuXHJcbiAgICBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuYWRkQ29sbGlzaW9uV2FsbExpc3Rlbih0aGlzLm9uQ29sbGlzaW9uV2FsbCk7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICAvLy8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3norDmkp7lvIDlp4stLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBvbkNvbGxpc2lvbldhbGwod2FsbDpXYWxsKSB7XHJcbiAgICAgICAgaWYod2FsbCl7XHJcbiAgICAgICAgICAgIHRoaXMubW9uc3Rlcl9hdHRfZGF0YS5pc19iaWc9ZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBkYXRhPXdhbGwuYmVJbmp1cmVkKHRoaXMubW9uc3Rlcl9hdHRfZGF0YSlcclxuICAgICAgICAgICAgc3VwZXIuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAgICAgaWYoZGF0YS5nZXREYW1hZ2VOdW0oKT4wKXsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubW9uc3Rlcjc4X3NraWxsX2J1bGxlY3RfaGl0LHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=