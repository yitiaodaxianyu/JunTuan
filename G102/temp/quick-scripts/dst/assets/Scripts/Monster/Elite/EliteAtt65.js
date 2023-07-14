
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/Elite/EliteAtt65.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '74967U2XbRJTYpd1DRvIddm', 'EliteAtt65');
// Scripts/Monster/Elite/EliteAtt65.ts

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
var GameManager_1 = require("../../GameManager");
var BuffData_1 = require("../../Hero/Game/BuffData");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var WallConfig_1 = require("../../Wall/WallConfig");
var MonsterData_1 = require("../MonsterData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EliteAtt65 = /** @class */ (function (_super) {
    __extends(EliteAtt65, _super);
    function EliteAtt65() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.att_hero = HeroConfig_1.Hero_Type.NULL;
        return _this;
    }
    EliteAtt65.prototype.onLoad = function () {
        _super.prototype.addCollisionWallListen.call(this, this.onCollisionWall);
    };
    EliteAtt65.prototype.setAttHero = function (heroId) {
        this.att_hero = heroId;
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    EliteAtt65.prototype.onCollisionWall = function (wall) {
        if (wall) {
            var data = wall.beInjured(this.monster_att_data);
            _super.prototype.destroySelf.call(this);
            if (data.getDamageNum() > 0) {
                if (data.feedback_type == MonsterData_1.FeedBackType.BaoJi) {
                    GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster65_shuangjuren_att_hit_crit, this.node.getPosition());
                    if (wall.getWallType() == WallConfig_1.WallType.Main && this.att_hero != HeroConfig_1.Hero_Type.NULL) {
                        //眩晕英雄
                        var buffData = new BuffData_1.BuffData();
                        buffData.buff_id = HeroConfig_1.BuffId.Monster_XuanYun;
                        buffData.game_effect_id = GameEffectsManager_1.GameEffectId.xuanyun;
                        buffData.remain_time = 1;
                        buffData.buff_type = HeroConfig_1.BuffType.Vertigo;
                        GameManager_1.default.getInstance().all_hero.get(this.att_hero).addDeBuff(buffData);
                    }
                }
                else {
                    GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster65_shuangjuren_att_hit, this.node.getPosition());
                }
            }
        }
    };
    EliteAtt65 = __decorate([
        ccclass
    ], EliteAtt65);
    return EliteAtt65;
}(BossBullet_1.default));
exports.default = EliteAtt65;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcRWxpdGVcXEVsaXRlQXR0NjUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQStDO0FBQy9DLG9FQUFpRjtBQUNqRixpREFBNEM7QUFDNUMscURBQW9EO0FBQ3BELHlEQUF5RTtBQUV6RSxvREFBaUQ7QUFDakQsOENBQThDO0FBR3hDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXdDLDhCQUFVO0lBQWxEO1FBQUEscUVBbUNDO1FBakNHLGNBQVEsR0FBVyxzQkFBUyxDQUFDLElBQUksQ0FBQzs7SUFpQ3RDLENBQUM7SUEvQkcsMkJBQU0sR0FBTjtRQUNJLGlCQUFNLHNCQUFzQixZQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsK0JBQVUsR0FBVixVQUFXLE1BQWdCO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUMsTUFBTSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxrR0FBa0c7SUFDbEcsb0NBQWUsR0FBZixVQUFnQixJQUFTO1FBQ3JCLElBQUcsSUFBSSxFQUFDO1lBQ0osSUFBSSxJQUFJLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtZQUM5QyxpQkFBTSxXQUFXLFdBQUUsQ0FBQztZQUNwQixJQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBQyxDQUFDLEVBQUM7Z0JBQ3JCLElBQUcsSUFBSSxDQUFDLGFBQWEsSUFBRSwwQkFBWSxDQUFDLEtBQUssRUFBQztvQkFDdEMsdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsaUNBQVksQ0FBQyxrQ0FBa0MsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7b0JBQy9ILElBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFFLHFCQUFRLENBQUMsSUFBSSxJQUFFLElBQUksQ0FBQyxRQUFRLElBQUUsc0JBQVMsQ0FBQyxJQUFJLEVBQUM7d0JBQ2hFLE1BQU07d0JBQ04sSUFBSSxRQUFRLEdBQUMsSUFBSSxtQkFBUSxFQUFFLENBQUM7d0JBQzVCLFFBQVEsQ0FBQyxPQUFPLEdBQUMsbUJBQU0sQ0FBQyxlQUFlLENBQUM7d0JBQ3hDLFFBQVEsQ0FBQyxjQUFjLEdBQUMsaUNBQVksQ0FBQyxPQUFPLENBQUM7d0JBQzdDLFFBQVEsQ0FBQyxXQUFXLEdBQUMsQ0FBQyxDQUFDO3dCQUN2QixRQUFRLENBQUMsU0FBUyxHQUFDLHFCQUFRLENBQUMsT0FBTyxDQUFDO3dCQUNwQyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtxQkFDNUU7aUJBQ0o7cUJBQUk7b0JBQ0QsdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsaUNBQVksQ0FBQyw2QkFBNkIsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7aUJBQzdIO2FBQ0o7U0FDSjtJQUNMLENBQUM7SUFsQ2dCLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FtQzlCO0lBQUQsaUJBQUM7Q0FuQ0QsQUFtQ0MsQ0FuQ3VDLG9CQUFVLEdBbUNqRDtrQkFuQ29CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQm9zc0J1bGxldCBmcm9tIFwiLi4vLi4vQm9zcy9Cb3NzQnVsbGV0XCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RzTWFuYWdlciwgR2FtZUVmZmVjdElkIH0gZnJvbSBcIi4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0J1ZmZEYXRhXCI7XHJcbmltcG9ydCB7IEJ1ZmZJZCwgQnVmZlR5cGUsIEhlcm9fVHlwZSB9IGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgV2FsbCBmcm9tIFwiLi4vLi4vV2FsbC9XYWxsXCI7XHJcbmltcG9ydCB7IFdhbGxUeXBlIH0gZnJvbSBcIi4uLy4uL1dhbGwvV2FsbENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBGZWVkQmFja1R5cGUgfSBmcm9tIFwiLi4vTW9uc3RlckRhdGFcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsaXRlQXR0NjUgZXh0ZW5kcyBCb3NzQnVsbGV0IHtcclxuXHJcbiAgICBhdHRfaGVybzpIZXJvX1R5cGU9SGVyb19UeXBlLk5VTEw7XHJcblxyXG4gICAgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmFkZENvbGxpc2lvbldhbGxMaXN0ZW4odGhpcy5vbkNvbGxpc2lvbldhbGwpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEF0dEhlcm8oaGVyb0lkOkhlcm9fVHlwZSl7XHJcbiAgICAgICAgdGhpcy5hdHRfaGVybz1oZXJvSWQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeeisOaSnuW8gOWniy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIG9uQ29sbGlzaW9uV2FsbCh3YWxsOldhbGwpIHtcclxuICAgICAgICBpZih3YWxsKXtcclxuICAgICAgICAgICAgbGV0IGRhdGE9d2FsbC5iZUluanVyZWQodGhpcy5tb25zdGVyX2F0dF9kYXRhKVxyXG4gICAgICAgICAgICBzdXBlci5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICBpZihkYXRhLmdldERhbWFnZU51bSgpPjApe1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5mZWVkYmFja190eXBlPT1GZWVkQmFja1R5cGUuQmFvSmkpe1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyNjVfc2h1YW5nanVyZW5fYXR0X2hpdF9jcml0LHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZih3YWxsLmdldFdhbGxUeXBlKCk9PVdhbGxUeXBlLk1haW4mJnRoaXMuYXR0X2hlcm8hPUhlcm9fVHlwZS5OVUxMKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/nnKnmmZXoi7Hpm4RcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJ1ZmZEYXRhPW5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX2lkPUJ1ZmZJZC5Nb25zdGVyX1h1YW5ZdW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkPUdhbWVFZmZlY3RJZC54dWFueXVuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZT0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3R5cGU9QnVmZlR5cGUuVmVydGlnbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5nZXQodGhpcy5hdHRfaGVybykuYWRkRGVCdWZmKGJ1ZmZEYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyNjVfc2h1YW5nanVyZW5fYXR0X2hpdCx0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==