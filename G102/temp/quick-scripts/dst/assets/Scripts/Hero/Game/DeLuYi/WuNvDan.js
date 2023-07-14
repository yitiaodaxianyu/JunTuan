
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/DeLuYi/WuNvDan.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1e0d5Re4L1Du62l+dP00en6', 'WuNvDan');
// Scripts/Hero/Game/DeLuYi/WuNvDan.ts

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
var Bullect_1 = require("../Bullect");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WuNvDan = /** @class */ (function (_super) {
    __extends(WuNvDan, _super);
    function WuNvDan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WuNvDan.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addCollisionMonsterListen.call(this, this.onCollisionMonster);
        this.addInitFinishedListen(this.onInitFinished);
    };
    WuNvDan.prototype.onInitFinished = function () {
        this.tuowei_space = 1.5;
    };
    WuNvDan.prototype.destroySelf = function () {
        _super.prototype.destroySelf.call(this);
    };
    WuNvDan.prototype.onCollisionMonster = function (monsterTs) {
        if (monsterTs) {
            var data = monsterTs.beFlashInjured(this.gongji_data);
            if (data.getDamageNum() > 0) {
                GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.deluyi_skill_beidong_create, this.getHeadPos());
                // if(data.feedback_type==FeedBackType.BaoJi){
                //     GameEffectsManager.getInstance().createGameEffectById(GameEffectId.deluyi_att_baoji,this.getHeadPos());
                // }else{
                //     GameEffectsManager.getInstance().createGameEffectById(GameEffectId.deluyi_att_hit,this.getHeadPos());
                // }
            }
            this.destroySelf();
        }
    };
    WuNvDan = __decorate([
        ccclass
    ], WuNvDan);
    return WuNvDan;
}(Bullect_1.default));
exports.default = WuNvDan;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcRGVMdVlpXFxXdU52RGFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLHVFQUFvRjtBQUdwRixzQ0FBaUM7QUFHM0IsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBcUMsMkJBQU87SUFBNUM7O0lBZ0NBLENBQUM7SUE3Qkcsd0JBQU0sR0FBTjtRQUNJLGlCQUFNLE1BQU0sV0FBRSxDQUFDO1FBQ2YsaUJBQU0seUJBQXlCLFlBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsZ0NBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxZQUFZLEdBQUMsR0FBRyxDQUFDO0lBQzFCLENBQUM7SUFFRCw2QkFBVyxHQUFYO1FBQ0ksaUJBQU0sV0FBVyxXQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELG9DQUFrQixHQUFsQixVQUFtQixTQUFpQjtRQUNoQyxJQUFHLFNBQVMsRUFBQztZQUNULElBQUksSUFBSSxHQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3BELElBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxHQUFDLENBQUMsRUFBQztnQkFDckIsdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsaUNBQVksQ0FBQywyQkFBMkIsRUFBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztnQkFDbEgsOENBQThDO2dCQUM5Qyw4R0FBOEc7Z0JBQzlHLFNBQVM7Z0JBQ1QsNEdBQTRHO2dCQUM1RyxJQUFJO2FBRVA7WUFDRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEI7SUFDTCxDQUFDO0lBL0JnQixPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBZ0MzQjtJQUFELGNBQUM7Q0FoQ0QsQUFnQ0MsQ0FoQ29DLGlCQUFPLEdBZ0MzQztrQkFoQ29CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IEZpZ2h0aW5nTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZS9GaWdodGluZ01hbmFnZXJcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdHNNYW5hZ2VyLCBHYW1lRWZmZWN0SWQgfSBmcm9tIFwiLi4vLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3RlclwiO1xyXG5pbXBvcnQgeyBGZWVkQmFja1R5cGUgfSBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgQnVsbGVjdCBmcm9tIFwiLi4vQnVsbGVjdFwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV3VOdkRhbiBleHRlbmRzIEJ1bGxlY3Qge1xyXG5cclxuICAgIFxyXG4gICAgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIHN1cGVyLmFkZENvbGxpc2lvbk1vbnN0ZXJMaXN0ZW4odGhpcy5vbkNvbGxpc2lvbk1vbnN0ZXIpO1xyXG4gICAgICAgIHRoaXMuYWRkSW5pdEZpbmlzaGVkTGlzdGVuKHRoaXMub25Jbml0RmluaXNoZWQpO1xyXG4gICAgfSAgICAgICAgXHJcblxyXG4gICAgb25Jbml0RmluaXNoZWQoKXtcclxuICAgICAgICB0aGlzLnR1b3dlaV9zcGFjZT0xLjU7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveVNlbGYoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuZGVzdHJveVNlbGYoKTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uQ29sbGlzaW9uTW9uc3Rlcihtb25zdGVyVHM6TW9uc3Rlcikge1xyXG4gICAgICAgIGlmKG1vbnN0ZXJUcyl7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBkYXRhPW1vbnN0ZXJUcy5iZUZsYXNoSW5qdXJlZCh0aGlzLmdvbmdqaV9kYXRhKTtcclxuICAgICAgICAgICAgaWYoZGF0YS5nZXREYW1hZ2VOdW0oKT4wKXtcclxuICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5kZWx1eWlfc2tpbGxfYmVpZG9uZ19jcmVhdGUsdGhpcy5nZXRIZWFkUG9zKCkpO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYoZGF0YS5mZWVkYmFja190eXBlPT1GZWVkQmFja1R5cGUuQmFvSmkpe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5kZWx1eWlfYXR0X2Jhb2ppLHRoaXMuZ2V0SGVhZFBvcygpKTtcclxuICAgICAgICAgICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5kZWx1eWlfYXR0X2hpdCx0aGlzLmdldEhlYWRQb3MoKSk7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19