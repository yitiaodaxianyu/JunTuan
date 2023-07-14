
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/RenZhe/ActiveDart.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c22e5FizZ5DCrdMhm4OhW6Y', 'ActiveDart');
// Scripts/Hero/Game/RenZhe/ActiveDart.ts

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
var FightingManager_1 = require("../../../Game/FightingManager");
var Bullect_1 = require("../Bullect");
var HeroConfig_1 = require("../HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ActiveDart = /** @class */ (function (_super) {
    __extends(ActiveDart, _super);
    function ActiveDart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.att_tuowei = null;
        _this.tuo_wei = null;
        _this.collision_num = 0;
        _this.remain_time = 0;
        return _this;
    }
    ActiveDart.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addCollisionMonsterListen.call(this, this.onCollisionMonster);
        this.addInitFinishedListen(this.onInitFinished);
    };
    ActiveDart.prototype.onInitFinished = function () {
        this.tuo_wei = cc.instantiate(this.att_tuowei);
        this.tuo_wei.setPosition(this.node.getPosition());
        FightingManager_1.default.getInstance().node.addChild(this.tuo_wei);
        this.collision_num = 0;
        this.spin_speed = 600;
        this.node.scale = 1;
        this.remain_time = this.gongji_data.hero_data.getSkillValue3(HeroConfig_1.SkillType.Active);
        this.unscheduleAllCallbacks();
    };
    ActiveDart.prototype.destroySelf = function () {
        _super.prototype.destroySelf.call(this);
        if (this.tuo_wei) {
            cc.tween(this.tuo_wei).delay(this.tuo_wei.getComponent(cc.MotionStreak).fadeTime).removeSelf().start();
            this.tuo_wei = null;
        }
    };
    ActiveDart.prototype.onCollisionMonster = function (monsterTs) {
    };
    ActiveDart.prototype.update = function (dt) {
        _super.prototype.update.call(this, dt);
        if (this.tuo_wei) {
            var pos = this.node.getPosition();
            //添加在子弹前面
            var distance = 64;
            var xx = pos.x + Math.cos(this.move_direction) * distance;
            var yy = pos.y + Math.sin(this.move_direction) * distance;
            this.tuo_wei.setPosition(cc.v2(xx, yy));
        }
    };
    __decorate([
        property(cc.Prefab)
    ], ActiveDart.prototype, "att_tuowei", void 0);
    ActiveDart = __decorate([
        ccclass
    ], ActiveDart);
    return ActiveDart;
}(Bullect_1.default));
exports.default = ActiveDart;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcUmVuWmhlXFxBY3RpdmVEYXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLGlFQUE0RDtBQUk1RCxzQ0FBaUM7QUFDakMsNENBQTBDO0FBR3BDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXdDLDhCQUFPO0lBQS9DO1FBQUEscUVBa0RDO1FBOUNHLGdCQUFVLEdBQVcsSUFBSSxDQUFDO1FBRTFCLGFBQU8sR0FBUyxJQUFJLENBQUM7UUFDckIsbUJBQWEsR0FBUSxDQUFDLENBQUM7UUFDdkIsaUJBQVcsR0FBUSxDQUFDLENBQUM7O0lBMEN6QixDQUFDO0lBeENHLDJCQUFNLEdBQU47UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLGlCQUFNLHlCQUF5QixZQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELG1DQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNsRCx5QkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxhQUFhLEdBQUMsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxzQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxnQ0FBVyxHQUFYO1FBQ0ksaUJBQU0sV0FBVyxXQUFFLENBQUM7UUFDcEIsSUFBRyxJQUFJLENBQUMsT0FBTyxFQUFDO1lBQ1osRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN2RyxJQUFJLENBQUMsT0FBTyxHQUFDLElBQUksQ0FBQztTQUNyQjtJQUNMLENBQUM7SUFFRCx1Q0FBa0IsR0FBbEIsVUFBbUIsU0FBaUI7SUFFcEMsQ0FBQztJQUVELDJCQUFNLEdBQU4sVUFBTyxFQUFPO1FBQ1YsaUJBQU0sTUFBTSxZQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pCLElBQUcsSUFBSSxDQUFDLE9BQU8sRUFBQztZQUNaLElBQUksR0FBRyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDaEMsU0FBUztZQUNULElBQUksUUFBUSxHQUFDLEVBQUUsQ0FBQztZQUNoQixJQUFJLEVBQUUsR0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFDLFFBQVEsQ0FBQztZQUNwRCxJQUFJLEVBQUUsR0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFDLFFBQVEsQ0FBQztZQUNwRCxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzFDO0lBQ0wsQ0FBQztJQTdDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2tEQUNNO0lBSlQsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQWtEOUI7SUFBRCxpQkFBQztDQWxERCxBQWtEQyxDQWxEdUMsaUJBQU8sR0FrRDlDO2tCQWxEb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBFbmVteV9EZUJ1ZmZfVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9FbmVteS9FbmVteUNvbmZpZ1wiO1xyXG5pbXBvcnQgRmlnaHRpbmdNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lL0ZpZ2h0aW5nTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgQnVsbGVjdCBmcm9tIFwiLi4vQnVsbGVjdFwiO1xyXG5pbXBvcnQgeyBTa2lsbFR5cGUgfSBmcm9tIFwiLi4vSGVyb0NvbmZpZ1wiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0aXZlRGFydCBleHRlbmRzIEJ1bGxlY3Qge1xyXG5cclxuICAgXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgYXR0X3R1b3dlaTpjYy5QcmVmYWI9bnVsbDtcclxuXHJcbiAgICB0dW9fd2VpOmNjLk5vZGU9bnVsbDtcclxuICAgIGNvbGxpc2lvbl9udW06bnVtYmVyPTA7XHJcbiAgICByZW1haW5fdGltZTpudW1iZXI9MDtcclxuXHJcbiAgICBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgc3VwZXIuYWRkQ29sbGlzaW9uTW9uc3Rlckxpc3Rlbih0aGlzLm9uQ29sbGlzaW9uTW9uc3Rlcik7ICAgICAgICBcclxuICAgICAgICB0aGlzLmFkZEluaXRGaW5pc2hlZExpc3Rlbih0aGlzLm9uSW5pdEZpbmlzaGVkKTtcclxuICAgIH0gICAgICAgIFxyXG5cclxuICAgIG9uSW5pdEZpbmlzaGVkKCl7XHJcbiAgICAgICAgdGhpcy50dW9fd2VpPWNjLmluc3RhbnRpYXRlKHRoaXMuYXR0X3R1b3dlaSk7XHJcbiAgICAgICAgdGhpcy50dW9fd2VpLnNldFBvc2l0aW9uKHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICBGaWdodGluZ01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmFkZENoaWxkKHRoaXMudHVvX3dlaSk7XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb25fbnVtPTA7XHJcbiAgICAgICAgdGhpcy5zcGluX3NwZWVkPTYwMDtcclxuICAgICAgICB0aGlzLm5vZGUuc2NhbGU9MTtcclxuICAgICAgICB0aGlzLnJlbWFpbl90aW1lPXRoaXMuZ29uZ2ppX2RhdGEuaGVyb19kYXRhLmdldFNraWxsVmFsdWUzKFNraWxsVHlwZS5BY3RpdmUpO1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3lTZWxmKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgaWYodGhpcy50dW9fd2VpKXtcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy50dW9fd2VpKS5kZWxheSh0aGlzLnR1b193ZWkuZ2V0Q29tcG9uZW50KGNjLk1vdGlvblN0cmVhaykuZmFkZVRpbWUpLnJlbW92ZVNlbGYoKS5zdGFydCgpO1xyXG4gICAgICAgICAgICB0aGlzLnR1b193ZWk9bnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Db2xsaXNpb25Nb25zdGVyKG1vbnN0ZXJUczpNb25zdGVyKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGR0OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci51cGRhdGUoZHQpO1xyXG4gICAgICAgIGlmKHRoaXMudHVvX3dlaSl7XHJcbiAgICAgICAgICAgIGxldCBwb3M9dGhpcy5ub2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgIC8v5re75Yqg5Zyo5a2Q5by55YmN6Z2iXHJcbiAgICAgICAgICAgIGxldCBkaXN0YW5jZT02NDtcclxuICAgICAgICAgICAgbGV0IHh4PXBvcy54K01hdGguY29zKHRoaXMubW92ZV9kaXJlY3Rpb24pKmRpc3RhbmNlO1xyXG4gICAgICAgICAgICBsZXQgeXk9cG9zLnkrTWF0aC5zaW4odGhpcy5tb3ZlX2RpcmVjdGlvbikqZGlzdGFuY2U7XHJcbiAgICAgICAgICAgIHRoaXMudHVvX3dlaS5zZXRQb3NpdGlvbihjYy52Mih4eCx5eSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=