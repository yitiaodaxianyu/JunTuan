
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/ANuBiSi/KuangSha.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd2653d/mq5BcJGcfSsLlnEz', 'KuangSha');
// Scripts/Hero/Game/ANuBiSi/KuangSha.ts

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
var Constants_1 = require("../../../Constants");
var GameEffectsManager_1 = require("../../../Game/GameEffectsManager");
var GameManager_1 = require("../../../GameManager");
var Monster_1 = require("../../../Monster/Monster");
var MonsterManager_1 = require("../../../Monster/MonsterManager");
var BuffData_1 = require("../BuffData");
var HeroConfig_1 = require("../HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var KuangSha = /** @class */ (function (_super) {
    __extends(KuangSha, _super);
    function KuangSha() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.remain_time = 0;
        _this.value = 0;
        return _this;
    }
    KuangSha.prototype.init = function (remainTime, jiansuValue) {
        this.remain_time = remainTime;
        this.value = jiansuValue;
    };
    KuangSha.prototype.destroySelf = function () {
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.a_nu_bi_si_active_skill_wind, this.node);
    };
    KuangSha.prototype.onAddBuff = function () {
        var _this = this;
        var allMonsterS = MonsterManager_1.default.getInstance().node.children;
        var len = allMonsterS.length;
        for (var i = 0; i < len; i++) {
            var monster = allMonsterS[i];
            var monsterTS = monster.getComponent(Monster_1.default);
            if (monsterTS && monsterTS.getIsCanCheck()) {
                var buffData = new BuffData_1.BuffData();
                buffData.buff_id = HeroConfig_1.BuffId.Hero_ANuBiSi_Active_Skill_JianSu;
                buffData.buff_type = HeroConfig_1.BuffType.Slowdown;
                buffData.buff_value = [this.value];
                buffData.remain_time = 1.5;
                monsterTS.addDeBuff(buffData, null);
            }
        }
        var _loop_1 = function (i) {
            this_1.scheduleOnce(function () {
                var xx = -375 + 150 * i + Math.random() * 40 - 20;
                var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(GameEffectsManager_1.GameEffectId.a_nu_bi_si_active_skill_line, cc.v2(xx, 0), _this.node);
                cc.tween(node).by(0.48, { y: -cc.winSize.height }).call(function () {
                    GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.a_nu_bi_si_active_skill_line, node);
                }).start();
                if (Math.random() < 0.3) {
                    var quan = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(GameEffectsManager_1.GameEffectId.a_nu_bi_si_active_skill_ring, cc.v2(Math.random() * 600 - 300, Math.random() * 1000 - 500), _this.node);
                    quan.scaleX = Math.random() < 0.5 ? -1 : 1;
                }
            }, Math.random() * 0.4);
        };
        var this_1 = this;
        for (var i = 0; i < 5; i++) {
            _loop_1(i);
        }
    };
    KuangSha.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state == Constants_1.GameState.Game_Playing) {
            if (this.remain_time > 0) {
                this.remain_time -= dt;
                if (this.remain_time <= 0) {
                    this.destroySelf();
                }
            }
            else {
                this.destroySelf();
            }
        }
    };
    KuangSha = __decorate([
        ccclass
    ], KuangSha);
    return KuangSha;
}(cc.Component));
exports.default = KuangSha;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcQU51QmlTaVxcS3VhbmdTaGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQStDO0FBQy9DLHVFQUFvRjtBQUVwRixvREFBK0M7QUFDL0Msb0RBQStDO0FBQy9DLGtFQUE2RDtBQUM3RCx3Q0FBdUM7QUFDdkMsNENBQXdFO0FBR2xFLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBMERDO1FBeERHLGlCQUFXLEdBQVEsQ0FBQyxDQUFDO1FBQ3JCLFdBQUssR0FBUSxDQUFDLENBQUM7O0lBdURuQixDQUFDO0lBckRHLHVCQUFJLEdBQUosVUFBSyxVQUFpQixFQUFDLFdBQWtCO1FBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUMsVUFBVSxDQUFDO1FBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUMsV0FBVyxDQUFDO0lBQzNCLENBQUM7SUFFRCw4QkFBVyxHQUFYO1FBQ0ksdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMscUJBQXFCLENBQUMsaUNBQVksQ0FBQyw0QkFBNEIsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEgsQ0FBQztJQUVELDRCQUFTLEdBQVQ7UUFBQSxpQkE4QkM7UUE3QkcsSUFBSSxXQUFXLEdBQUMsd0JBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzNELElBQUksR0FBRyxHQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7UUFDM0IsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFDdEI7WUFDSSxJQUFJLE9BQU8sR0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFB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TztPQUNhLFFBQVEsQ0EwRDVCO0lBQUQsZUFBQztDQTFERCxBQTBEQyxDQTFEcUMsRUFBRSxDQUFDLFNBQVMsR0EwRGpEO2tCQTFEb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdElkLCBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IFNreU1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWUvU2t5TWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuLi8uLi8uLi9Nb25zdGVyL01vbnN0ZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXJNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9Nb25zdGVyL01vbnN0ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEJ1ZmZEYXRhIH0gZnJvbSBcIi4uL0J1ZmZEYXRhXCI7XHJcbmltcG9ydCB7IEJ1ZmZJZCwgQnVmZlR5cGUsIERhbWFnZVR5cGUsIFNraWxsVHlwZSB9IGZyb20gXCIuLi9IZXJvQ29uZmlnXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLdWFuZ1NoYSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgcmVtYWluX3RpbWU6bnVtYmVyPTA7XHJcbiAgICB2YWx1ZTpudW1iZXI9MDtcclxuXHJcbiAgICBpbml0KHJlbWFpblRpbWU6bnVtYmVyLGppYW5zdVZhbHVlOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5yZW1haW5fdGltZT1yZW1haW5UaW1lO1xyXG4gICAgICAgIHRoaXMudmFsdWU9amlhbnN1VmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveVNlbGYoKXtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmFfbnVfYmlfc2lfYWN0aXZlX3NraWxsX3dpbmQsdGhpcy5ub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkFkZEJ1ZmYoKXtcclxuICAgICAgICBsZXQgYWxsTW9uc3RlclM9TW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmNoaWxkcmVuO1xyXG4gICAgICAgIGxldCBsZW49YWxsTW9uc3RlclMubGVuZ3RoOyAgICBcclxuICAgICAgICBmb3IobGV0IGk9MDtpPGxlbjsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXI9YWxsTW9uc3RlclNbaV07XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyVFM9bW9uc3Rlci5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgIGlmKG1vbnN0ZXJUUyYmbW9uc3RlclRTLmdldElzQ2FuQ2hlY2soKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1ZmZEYXRhPW5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl9pZD1CdWZmSWQuSGVyb19BTnVCaVNpX0FjdGl2ZV9Ta2lsbF9KaWFuU3U7XHJcbiAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3R5cGU9QnVmZlR5cGUuU2xvd2Rvd247XHJcbiAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3ZhbHVlPVt0aGlzLnZhbHVlXTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lPTEuNTtcclxuICAgICAgICAgICAgICAgIG1vbnN0ZXJUUy5hZGREZUJ1ZmYoYnVmZkRhdGEsbnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8NTsgaSsrKXtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgIGxldCB4eD0tMzc1KzE1MCppK01hdGgucmFuZG9tKCkqNDAtMjA7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0Rm9yUGFyZW50KEdhbWVFZmZlY3RJZC5hX251X2JpX3NpX2FjdGl2ZV9za2lsbF9saW5lLGNjLnYyKHh4LDApLHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbihub2RlKS5ieSgwLjQ4LHt5Oi1jYy53aW5TaXplLmhlaWdodH0pLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmFfbnVfYmlfc2lfYWN0aXZlX3NraWxsX2xpbmUsbm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgaWYoTWF0aC5yYW5kb20oKTwwLjMpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBxdWFuPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RGb3JQYXJlbnQoR2FtZUVmZmVjdElkLmFfbnVfYmlfc2lfYWN0aXZlX3NraWxsX3JpbmcsY2MudjIoTWF0aC5yYW5kb20oKSo2MDAtMzAwLE1hdGgucmFuZG9tKCkqMTAwMC01MDApLHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVhbi5zY2FsZVg9TWF0aC5yYW5kb20oKTwwLjU/LTE6MTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxNYXRoLnJhbmRvbSgpKjAuNCk7XHJcbiAgICAgICAgfSAgICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlIChkdDpudW1iZXIpIHtcclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlPT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nKXtcclxuICAgICAgICAgICAgaWYodGhpcy5yZW1haW5fdGltZT4wKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtYWluX3RpbWUtPWR0O1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5yZW1haW5fdGltZTw9MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=