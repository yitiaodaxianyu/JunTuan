
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/Elite/Elite76.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '01022Oy4Q9H4pC7Semzd3fZ', 'Elite76');
// Scripts/Monster/Elite/Elite76.ts

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
var GroundManager_1 = require("../../Game/GroundManager");
var GameManager_1 = require("../../GameManager");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var Monster_1 = require("../Monster");
var MonsterManager_1 = require("../MonsterManager");
var MonsterNewNormal_1 = require("../MonsterNewNormal");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Elite76 = /** @class */ (function (_super) {
    __extends(Elite76, _super);
    function Elite76() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.light = null;
        _this.halo_data = null;
        _this.is_loaded = false;
        _this.halo_radius = 200;
        return _this;
    }
    Elite76.prototype.onLoad = function () {
        var _this = this;
        _super.prototype.onLoad.call(this);
        _super.prototype.addMonsterNormalInited.call(this, this.onMonsterNormalInited);
        _super.prototype.addMonsterNormalDeath.call(this, this.onMonsterNormalDeath);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster76_attack_guanghuan, 1, function () {
            //添加光环特效
            if (!_this.light) {
                _this.light = GroundManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster76_attack_guanghuan, _this.node.getPosition());
            }
            _this.is_loaded = true;
        });
    };
    Elite76.prototype.onMonsterNormalInited = function () {
        this.halo_radius = this.skill_data.getSkillValue1(1);
        this.halo_data = new HeroConfig_1.HaloData();
        this.halo_data.halo_id = HeroConfig_1.HaloId.Monster76_JianDuZhe_Skill_Halo;
        this.halo_data.halo_value = [this.skill_data.getSkillValue2(1)];
        this.halo_data.halo_source_uuid = this.uuid;
        if (this.is_loaded) {
            if (!this.light) {
                this.light = GroundManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster76_attack_guanghuan, this.node.getPosition());
            }
        }
    };
    Elite76.prototype.onMonsterNormalDeath = function () {
        //以及删除所有光环数据
        if (this.light) {
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.monster76_attack_guanghuan, this.light);
            this.light = null;
        }
        var allMonster = MonsterManager_1.default.getInstance().node.children;
        var len = allMonster.length;
        if (len <= 0) {
            return null;
        }
        for (var i = 0; i < len; i++) {
            var monster = allMonster[i];
            var monsterTS = monster.getComponent(Monster_1.default);
            if (monsterTS && monsterTS.getIsCanCheck()) {
                //移除光环效果
                monsterTS.subHalo(HeroConfig_1.HaloId.Monster76_JianDuZhe_Skill_Halo, this.uuid);
            }
        }
    };
    Elite76.prototype.update = function (dt) {
        if ((GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) || this.getIsDie()) {
            return;
        }
        _super.prototype.update.call(this, dt);
        this.checkSkill();
        if (this.light) {
            this.light.setPosition(this.node.getPosition());
        }
    };
    Elite76.prototype.checkSkill = function () {
        var allMonster = MonsterManager_1.default.getInstance().node.children;
        var len = allMonster.length;
        if (len <= 0) {
            return null;
        }
        for (var i = 0; i < len; i++) {
            var monster = allMonster[i];
            var monsterTS = monster.getComponent(Monster_1.default);
            if (monsterTS && monsterTS.getIsCanCheck()) {
                var distance = this.getCenterPos().sub(monsterTS.getCenterPos()).mag();
                if (distance <= 200) {
                    //添加光环效果                    
                    monsterTS.addHalo(this.halo_data);
                }
                else {
                    //移除光环效果
                    monsterTS.subHalo(HeroConfig_1.HaloId.Monster76_JianDuZhe_Skill_Halo, this.uuid);
                }
            }
        }
    };
    Elite76 = __decorate([
        ccclass
    ], Elite76);
    return Elite76;
}(MonsterNewNormal_1.default));
exports.default = Elite76;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcRWxpdGVcXEVsaXRlNzYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQTRDO0FBQzVDLG9FQUFpRjtBQUNqRiwwREFBcUQ7QUFDckQsaURBQTRDO0FBQzVDLHlEQUE4RDtBQUM5RCxzQ0FBaUM7QUFDakMsb0RBQStDO0FBQy9DLHdEQUFtRDtBQUk3QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFxQywyQkFBZ0I7SUFBckQ7UUFBQSxxRUE4RkM7UUE1RkcsV0FBSyxHQUFTLElBQUksQ0FBQztRQUNuQixlQUFTLEdBQVUsSUFBSSxDQUFDO1FBQ3hCLGVBQVMsR0FBUyxLQUFLLENBQUM7UUFDeEIsaUJBQVcsR0FBUSxHQUFHLENBQUM7O0lBeUYzQixDQUFDO0lBdkZhLHdCQUFNLEdBQWhCO1FBQUEsaUJBV0M7UUFWRyxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLGlCQUFNLHNCQUFzQixZQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3pELGlCQUFNLHFCQUFxQixZQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3ZELHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLGlDQUFZLENBQUMsMEJBQTBCLEVBQUMsQ0FBQyxFQUFDO1lBQ3pGLFFBQVE7WUFDUixJQUFHLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBQztnQkFDWCxLQUFJLENBQUMsS0FBSyxHQUFDLHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsaUNBQVksQ0FBQywwQkFBMEIsRUFBQyxLQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7YUFDaEk7WUFDRCxLQUFJLENBQUMsU0FBUyxHQUFDLElBQUks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LENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFDdEI7WUFDSSxJQUFJLE9BQU8sR0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxTQUFTLEdBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxpQkFBTyxDQUFDLENBQUM7WUFDNUMsSUFBRyxTQUFTLElBQUksU0FBUyxDQUFDLGFBQWEsRUFBRSxFQUN6QztnQkFDSSxJQUFJLFFBQVEsR0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNyRSxJQUFHLFFBQVEsSUFBRSxHQUFHLEVBQ2hCO29CQUNJLDRCQUE0QjtvQkFDNUIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQ3JDO3FCQUFJO29CQUNELFFBQVE7b0JBQ1IsU0FBUyxDQUFDLE9BQU8sQ0FBQyxtQkFBTSxDQUFDLDhCQUE4QixFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDdEU7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQTdGZ0IsT0FBTztRQUQzQixPQUFPO09BQ2EsT0FBTyxDQThGM0I7SUFBRCxjQUFDO0NBOUZELEFBOEZDLENBOUZvQywwQkFBZ0IsR0E4RnBEO2tCQTlGb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdElkLCBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IEdyb3VuZE1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWUvR3JvdW5kTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhhbG9EYXRhLCBIYWxvSWQgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4uL01vbnN0ZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXJNYW5hZ2VyIGZyb20gXCIuLi9Nb25zdGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgTW9uc3Rlck5ld05vcm1hbCBmcm9tIFwiLi4vTW9uc3Rlck5ld05vcm1hbFwiO1xyXG5pbXBvcnQgTW9uc3Rlck5vcm1hbCBmcm9tIFwiLi4vTW9uc3Rlck5vcm1hbFwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWxpdGU3NiBleHRlbmRzIE1vbnN0ZXJOZXdOb3JtYWwge1xyXG5cclxuICAgIGxpZ2h0OmNjLk5vZGU9bnVsbDtcclxuICAgIGhhbG9fZGF0YTpIYWxvRGF0YT1udWxsO1xyXG4gICAgaXNfbG9hZGVkOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBoYWxvX3JhZGl1czpudW1iZXI9MjAwO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgc3VwZXIuYWRkTW9uc3Rlck5vcm1hbEluaXRlZCh0aGlzLm9uTW9uc3Rlck5vcm1hbEluaXRlZCk7XHJcbiAgICAgICAgc3VwZXIuYWRkTW9uc3Rlck5vcm1hbERlYXRoKHRoaXMub25Nb25zdGVyTm9ybWFsRGVhdGgpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyNzZfYXR0YWNrX2d1YW5naHVhbiwxLCgpPT57XHJcbiAgICAgICAgICAgIC8v5re75Yqg5YWJ546v54m55pWIXHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmxpZ2h0KXtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlnaHQ9R3JvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyNzZfYXR0YWNrX2d1YW5naHVhbix0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc19sb2FkZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbk1vbnN0ZXJOb3JtYWxJbml0ZWQgKCkge1xyXG4gICAgICAgIHRoaXMuaGFsb19yYWRpdXM9dGhpcy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUxKDEpO1xyXG4gICAgICAgIHRoaXMuaGFsb19kYXRhPW5ldyBIYWxvRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuaGFsb19kYXRhLmhhbG9faWQ9SGFsb0lkLk1vbnN0ZXI3Nl9KaWFuRHVaaGVfU2tpbGxfSGFsbztcclxuICAgICAgICB0aGlzLmhhbG9fZGF0YS5oYWxvX3ZhbHVlPVt0aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxWYWx1ZTIoMSldO1xyXG4gICAgICAgIHRoaXMuaGFsb19kYXRhLmhhbG9fc291cmNlX3V1aWQ9dGhpcy51dWlkO1xyXG4gICAgICAgIGlmKHRoaXMuaXNfbG9hZGVkKXtcclxuICAgICAgICAgICAgaWYoIXRoaXMubGlnaHQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saWdodD1Hcm91bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXI3Nl9hdHRhY2tfZ3VhbmdodWFuLHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbk1vbnN0ZXJOb3JtYWxEZWF0aCgpe1xyXG4gICAgICAgIC8v5Lul5Y+K5Yig6Zmk5omA5pyJ5YWJ546v5pWw5o2uXHJcbiAgICAgICAgaWYodGhpcy5saWdodCl7XHJcbiAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubW9uc3Rlcjc2X2F0dGFja19ndWFuZ2h1YW4sdGhpcy5saWdodCk7XHJcbiAgICAgICAgICAgIHRoaXMubGlnaHQ9bnVsbDtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICBsZXQgYWxsTW9uc3Rlcj1Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUuY2hpbGRyZW47XHJcbiAgICAgICAgbGV0IGxlbj1hbGxNb25zdGVyLmxlbmd0aDtcclxuICAgICAgICBpZihsZW48PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgZm9yKGxldCBpPTA7aTxsZW47IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyPWFsbE1vbnN0ZXJbaV07XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyVFM9bW9uc3Rlci5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgIGlmKG1vbnN0ZXJUUyAmJiBtb25zdGVyVFMuZ2V0SXNDYW5DaGVjaygpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL+enu+mZpOWFieeOr+aViOaenFxyXG4gICAgICAgICAgICAgICAgbW9uc3RlclRTLnN1YkhhbG8oSGFsb0lkLk1vbnN0ZXI3Nl9KaWFuRHVaaGVfU2tpbGxfSGFsbyx0aGlzLnV1aWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSAgICBcclxuXHJcbiAgICB1cGRhdGUgKGR0KSB7XHJcbiAgICAgICAgaWYoKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUhPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpfHx0aGlzLmdldElzRGllKCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLnVwZGF0ZShkdCk7XHJcbiAgICAgICAgdGhpcy5jaGVja1NraWxsKCk7XHJcbiAgICAgICAgaWYodGhpcy5saWdodCl7XHJcbiAgICAgICAgICAgIHRoaXMubGlnaHQuc2V0UG9zaXRpb24odGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGVja1NraWxsKCl7XHJcbiAgICAgICAgbGV0IGFsbE1vbnN0ZXI9TW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmNoaWxkcmVuO1xyXG4gICAgICAgIGxldCBsZW49YWxsTW9uc3Rlci5sZW5ndGg7XHJcbiAgICAgICAgaWYobGVuPD0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIGZvcihsZXQgaT0wO2k8bGVuOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgbW9uc3Rlcj1hbGxNb25zdGVyW2ldO1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlclRTPW1vbnN0ZXIuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICBpZihtb25zdGVyVFMgJiYgbW9uc3RlclRTLmdldElzQ2FuQ2hlY2soKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpc3RhbmNlPXRoaXMuZ2V0Q2VudGVyUG9zKCkuc3ViKG1vbnN0ZXJUUy5nZXRDZW50ZXJQb3MoKSkubWFnKCk7XHJcbiAgICAgICAgICAgICAgICBpZihkaXN0YW5jZTw9MjAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5re75Yqg5YWJ546v5pWI5p6cICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBtb25zdGVyVFMuYWRkSGFsbyh0aGlzLmhhbG9fZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvL+enu+mZpOWFieeOr+aViOaenFxyXG4gICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJUUy5zdWJIYWxvKEhhbG9JZC5Nb25zdGVyNzZfSmlhbkR1WmhlX1NraWxsX0hhbG8sdGhpcy51dWlkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=