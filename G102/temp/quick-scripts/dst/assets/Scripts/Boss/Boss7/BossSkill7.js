
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Boss/Boss7/BossSkill7.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2c5d6UMXoNA4bR734BmiYdO', 'BossSkill7');
// Scripts/Boss/Boss7/BossSkill7.ts

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
var WallManager_1 = require("../../Wall/WallManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BossSkill7 = /** @class */ (function (_super) {
    __extends(BossSkill7, _super);
    function BossSkill7() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.monster_att_data = null;
        _this.target_yy = 0;
        _this.move_speed = 2000;
        _this.acc_speed = 300;
        _this.cur_acc_speed = 0;
        _this.is_destory = false;
        _this.is_xuanyun = false;
        _this.max_scale_yy = 0;
        _this.max_distance = 0;
        return _this;
    }
    BossSkill7.prototype.init = function (attData, targetYY, speed, accSpeed, isXuanYun) {
        this.cur_acc_speed = 0;
        this.move_speed = speed;
        this.acc_speed = accSpeed;
        this.target_yy = targetYY;
        this.monster_att_data = attData;
        this.is_xuanyun = isXuanYun;
        this.node.scale = 1;
        this.max_scale_yy = WallManager_1.default.getInstance().getMainWall().getWallRect().center.y;
        this.max_distance = Math.abs(WallManager_1.default.getInstance().getMainWall().getWallRect().center.y - this.node.y);
        this.is_destory = false;
    };
    BossSkill7.prototype.destroySelf = function () {
        this.is_destory = true;
        this.createBomb();
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.boss7_skill_bullect, this.node);
    };
    BossSkill7.prototype.createBomb = function () {
        GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss7_skill_bullect_hit, cc.v2(this.node.x, this.target_yy));
        if (this.is_xuanyun) {
            //击晕所有英雄
            GameManager_1.default.getInstance().all_hero.forEach(function (v, k) {
                var buffData = new BuffData_1.BuffData();
                buffData.buff_id = HeroConfig_1.BuffId.Monster_XuanYun;
                buffData.game_effect_id = GameEffectsManager_1.GameEffectId.xuanyun;
                buffData.remain_time = 3;
                buffData.buff_type = HeroConfig_1.BuffType.Vertigo;
                v.addDeBuff(buffData);
            });
            this.monster_att_data.is_big = true;
        }
        else {
            this.monster_att_data.is_big = false;
        }
        WallManager_1.default.getInstance().getMainWall().beInjured(this.monster_att_data);
    };
    BossSkill7.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state == Constants_1.GameState.Game_Playing) {
            if (this.is_destory == false) {
                this.cur_acc_speed += this.acc_speed * dt;
                var finalSpeed = this.move_speed * dt + this.cur_acc_speed;
                this.node.y -= finalSpeed;
                this.node.scale = 1 + (1 - Math.abs(this.max_scale_yy - this.node.y) / this.max_distance);
                if (this.node.y <= this.target_yy) {
                    this.destroySelf();
                }
            }
        }
    };
    BossSkill7 = __decorate([
        ccclass
    ], BossSkill7);
    return BossSkill7;
}(cc.Component));
exports.default = BossSkill7;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQm9zc1xcQm9zczdcXEJvc3NTa2lsbDcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQTRDO0FBQzVDLG9FQUFpRjtBQUNqRixpREFBNEM7QUFDNUMscURBQW9EO0FBQ3BELHlEQUE4RDtBQUs5RCxzREFBaUQ7QUFHM0MsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBd0MsOEJBQVk7SUFBcEQ7UUFBQSxxRUFrRUM7UUFoRUcsc0JBQWdCLEdBQWdCLElBQUksQ0FBQztRQUNyQyxlQUFTLEdBQVEsQ0FBQyxDQUFDO1FBQ25CLGdCQUFVLEdBQVEsSUFBSSxDQUFDO1FBQ3ZCLGVBQVMsR0FBUSxHQUFHLENBQUM7UUFDckIsbUJBQWEsR0FBUSxDQUFDLENBQUM7UUFDdkIsZ0JBQVUsR0FBUyxLQUFLLENBQUM7UUFDekIsZ0JBQVUsR0FBUyxLQUFLLENBQUM7UUFDekIsa0JBQVksR0FBUSxDQUFDLENBQUM7UUFDdEIsa0JBQVksR0FBUSxDQUFDLENBQUM7O0lBd0QxQixDQUFDO0lBdERHLHlCQUFJLEdBQUosVUFBSyxPQUFzQixFQUFDLFFBQWUsRUFBQyxLQUFZLEVBQUMsUUFBZSxFQUFDLFNBQWlCO1FBQ3RGLElBQUksQ0FBQyxhQUFhLEdBQUMsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUMsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUMsUUFBUSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUMsUUFBUSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxnQkFBZ0IsR0FBQyxPQUFPLENBQUM7UUFDOUIsSUFBSSxDQUFDLFVBQVUsR0FBQyxTQUFTLENBQUM7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFD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QzNCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztpQkFDdEI7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQS9EZ0IsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQWtFOUI7SUFBRCxpQkFBQztDQWxFRCxBQWtFQyxDQWxFdUMsRUFBRSxDQUFDLFNBQVMsR0FrRW5EO2tCQWxFb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdHNNYW5hZ2VyLCBHYW1lRWZmZWN0SWQgfSBmcm9tIFwiLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBCdWZmRGF0YSB9IGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvQnVmZkRhdGFcIjtcclxuaW1wb3J0IHsgQnVmZklkLCBCdWZmVHlwZSB9IGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJBdHREYXRhIH0gZnJvbSBcIi4uLy4uL01vbnN0ZXIvTW9uc3RlckRhdGFcIjtcclxuaW1wb3J0IE1vbnN0ZXJNYW5hZ2VyIGZyb20gXCIuLi8uLi9Nb25zdGVyL01vbnN0ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uLy4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgV2FsbE1hbmFnZXIgZnJvbSBcIi4uLy4uL1dhbGwvV2FsbE1hbmFnZXJcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvc3NTa2lsbDcgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIG1vbnN0ZXJfYXR0X2RhdGE6TW9uc3RlckF0dERhdGE9bnVsbDtcclxuICAgIHRhcmdldF95eTpudW1iZXI9MDtcclxuICAgIG1vdmVfc3BlZWQ6bnVtYmVyPTIwMDA7XHJcbiAgICBhY2Nfc3BlZWQ6bnVtYmVyPTMwMDtcclxuICAgIGN1cl9hY2Nfc3BlZWQ6bnVtYmVyPTA7XHJcbiAgICBpc19kZXN0b3J5OmJvb2xlYW49ZmFsc2U7XHJcbiAgICBpc194dWFueXVuOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBtYXhfc2NhbGVfeXk6bnVtYmVyPTA7XHJcbiAgICBtYXhfZGlzdGFuY2U6bnVtYmVyPTA7XHJcblxyXG4gICAgaW5pdChhdHREYXRhOk1vbnN0ZXJBdHREYXRhLHRhcmdldFlZOm51bWJlcixzcGVlZDpudW1iZXIsYWNjU3BlZWQ6bnVtYmVyLGlzWHVhbll1bjpib29sZWFuKXtcclxuICAgICAgICB0aGlzLmN1cl9hY2Nfc3BlZWQ9MDtcclxuICAgICAgICB0aGlzLm1vdmVfc3BlZWQ9c3BlZWQ7XHJcbiAgICAgICAgdGhpcy5hY2Nfc3BlZWQ9YWNjU3BlZWQ7XHJcbiAgICAgICAgdGhpcy50YXJnZXRfeXk9dGFyZ2V0WVk7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2F0dF9kYXRhPWF0dERhdGE7XHJcbiAgICAgICAgdGhpcy5pc194dWFueXVuPWlzWHVhbll1bjtcclxuICAgICAgICB0aGlzLm5vZGUuc2NhbGU9MTtcclxuICAgICAgICB0aGlzLm1heF9zY2FsZV95eT1XYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuZ2V0V2FsbFJlY3QoKS5jZW50ZXIueTtcclxuICAgICAgICB0aGlzLm1heF9kaXN0YW5jZT1NYXRoLmFicyhXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuZ2V0V2FsbFJlY3QoKS5jZW50ZXIueS10aGlzLm5vZGUueSk7XHJcbiAgICAgICAgdGhpcy5pc19kZXN0b3J5PWZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3lTZWxmKCkge1xyXG4gICAgICAgIHRoaXMuaXNfZGVzdG9yeT10cnVlOyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jcmVhdGVCb21iKCk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5ib3NzN19za2lsbF9idWxsZWN0LHRoaXMubm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlQm9tYigpe1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5ib3NzN19za2lsbF9idWxsZWN0X2hpdCxjYy52Mih0aGlzLm5vZGUueCx0aGlzLnRhcmdldF95eSkpO1xyXG4gICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5pc194dWFueXVuKXtcclxuICAgICAgICAgICAgLy/lh7vmmZXmiYDmnInoi7Hpm4RcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVmZkRhdGE9bmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX2lkPUJ1ZmZJZC5Nb25zdGVyX1h1YW5ZdW47XHJcbiAgICAgICAgICAgICAgICBidWZmRGF0YS5nYW1lX2VmZmVjdF9pZD1HYW1lRWZmZWN0SWQueHVhbnl1bjtcclxuICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lPTM7XHJcbiAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3R5cGU9QnVmZlR5cGUuVmVydGlnbztcclxuICAgICAgICAgICAgICAgIHYuYWRkRGVCdWZmKGJ1ZmZEYXRhKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5tb25zdGVyX2F0dF9kYXRhLmlzX2JpZz10cnVlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLm1vbnN0ZXJfYXR0X2RhdGEuaXNfYmlnPWZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuYmVJbmp1cmVkKHRoaXMubW9uc3Rlcl9hdHRfZGF0YSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCB1cGRhdGUoZHQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGU9PUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzX2Rlc3Rvcnk9PWZhbHNlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX2FjY19zcGVlZCs9dGhpcy5hY2Nfc3BlZWQqZHQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmluYWxTcGVlZD10aGlzLm1vdmVfc3BlZWQqZHQrdGhpcy5jdXJfYWNjX3NwZWVkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnktPWZpbmFsU3BlZWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGU9MSsoMS1NYXRoLmFicyh0aGlzLm1heF9zY2FsZV95eS10aGlzLm5vZGUueSkvdGhpcy5tYXhfZGlzdGFuY2UpXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLm5vZGUueTw9dGhpcy50YXJnZXRfeXkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBcclxufVxyXG4iXX0=