
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/Elite/BianFu.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '322deiAvtdO6qjKmD5sTuC4', 'BianFu');
// Scripts/Monster/Elite/BianFu.ts

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
var BianFu = /** @class */ (function (_super) {
    __extends(BianFu, _super);
    function BianFu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.light = null;
        _this.halo_data = null;
        _this.is_loaded = false;
        return _this;
    }
    BianFu.prototype.onLoad = function () {
        var _this = this;
        _super.prototype.onLoad.call(this);
        _super.prototype.addMonsterNormalInited.call(this, this.onMonsterNormalInited);
        _super.prototype.addMonsterNormalDeath.call(this, this.onMonsterNormalDeath);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster30_bianfu_skill, 1, function () {
            //添加光环特效
            if (!_this.light) {
                _this.light = GroundManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster30_bianfu_skill, _this.node.getPosition());
            }
            _this.is_loaded = true;
        });
    };
    BianFu.prototype.onMonsterNormalInited = function () {
        this.halo_data = new HeroConfig_1.HaloData();
        this.halo_data.halo_id = HeroConfig_1.HaloId.Monster30_BianFu_Skill_Halo;
        this.halo_data.halo_value = [0.3];
        this.halo_data.halo_source_uuid = this.uuid;
        if (this.is_loaded) {
            if (!this.light) {
                this.light = GroundManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster30_bianfu_skill, this.node.getPosition());
            }
        }
    };
    BianFu.prototype.onMonsterNormalDeath = function () {
        //以及删除所有光环数据
        if (this.light) {
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.monster30_bianfu_skill, this.light);
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
                monsterTS.subHalo(HeroConfig_1.HaloId.Monster30_BianFu_Skill_Halo, this.uuid);
            }
        }
    };
    BianFu.prototype.update = function (dt) {
        if ((GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) || this.getIsDie()) {
            return;
        }
        _super.prototype.update.call(this, dt);
        this.checkSkill();
        if (this.light) {
            this.light.setPosition(this.node.getPosition());
        }
    };
    BianFu.prototype.checkSkill = function () {
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
                    monsterTS.subHalo(HeroConfig_1.HaloId.Monster30_BianFu_Skill_Halo, this.uuid);
                }
            }
        }
    };
    BianFu = __decorate([
        ccclass
    ], BianFu);
    return BianFu;
}(MonsterNewNormal_1.default));
exports.default = BianFu;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcRWxpdGVcXEJpYW5GdS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBNEM7QUFDNUMsb0VBQWlGO0FBQ2pGLDBEQUFxRDtBQUNyRCxpREFBNEM7QUFDNUMseURBQThEO0FBQzlELHNDQUFpQztBQUNqQyxvREFBK0M7QUFDL0Msd0RBQW1EO0FBSTdDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQW9DLDBCQUFnQjtJQUFwRDtRQUFBLHFFQTRGQztRQTFGRyxXQUFLLEdBQVMsSUFBSSxDQUFDO1FBQ25CLGVBQVMsR0FBVSxJQUFJLENBQUM7UUFDeEIsZUFBUyxHQUFTLEtBQUssQ0FBQzs7SUF3RjVCLENBQUM7SUF0RmEsdUJBQU0sR0FBaEI7UUFBQSxpQkFXQztRQVZHLGlCQUFNLE1BQU0sV0FBRSxDQUFDO1FBQ2YsaUJBQU0sc0JBQXNCLFlBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDekQsaUJBQU0scUJBQXFCLFlBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDdkQsdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsaUNBQVksQ0FBQyxzQkFBc0IsRUFBQyxDQUFDLEVBQUM7WUFDckYsUUFBUTtZQUNSLElBQUcsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFDO2dCQUNYLEtBQUksQ0FBQyxLQUFLLEdBQUMsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxpQ0FBWSxDQUFDLHNCQUFzQixFQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQzthQUM1SDtZQUNELEtBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lB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QUFZLENBQUMsaUJBQU8sQ0FBQyxDQUFDO1lBQzVDLElBQUcsU0FBUyxJQUFJLFNBQVMsQ0FBQyxhQUFhLEVBQUUsRUFDekM7Z0JBQ0ksSUFBSSxRQUFRLEdBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDckUsSUFBRyxRQUFRLElBQUUsR0FBRyxFQUNoQjtvQkFDSSw0QkFBNEI7b0JBQzVCLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUNyQztxQkFBSTtvQkFDRCxRQUFRO29CQUNSLFNBQVMsQ0FBQyxPQUFPLENBQUMsbUJBQU0sQ0FBQywyQkFBMkIsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ25FO2FBQ0o7U0FDSjtJQUNMLENBQUM7SUEzRmdCLE1BQU07UUFEMUIsT0FBTztPQUNhLE1BQU0sQ0E0RjFCO0lBQUQsYUFBQztDQTVGRCxBQTRGQyxDQTVGbUMsMEJBQWdCLEdBNEZuRDtrQkE1Rm9CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lU3RhdGUgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBHcm91bmRNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lL0dyb3VuZE1hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIYWxvRGF0YSwgSGFsb0lkIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuLi9Nb25zdGVyXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi4vTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXJOZXdOb3JtYWwgZnJvbSBcIi4uL01vbnN0ZXJOZXdOb3JtYWxcIjtcclxuXHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCaWFuRnUgZXh0ZW5kcyBNb25zdGVyTmV3Tm9ybWFsIHtcclxuXHJcbiAgICBsaWdodDpjYy5Ob2RlPW51bGw7XHJcbiAgICBoYWxvX2RhdGE6SGFsb0RhdGE9bnVsbDtcclxuICAgIGlzX2xvYWRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgc3VwZXIuYWRkTW9uc3Rlck5vcm1hbEluaXRlZCh0aGlzLm9uTW9uc3Rlck5vcm1hbEluaXRlZCk7XHJcbiAgICAgICAgc3VwZXIuYWRkTW9uc3Rlck5vcm1hbERlYXRoKHRoaXMub25Nb25zdGVyTm9ybWFsRGVhdGgpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyMzBfYmlhbmZ1X3NraWxsLDEsKCk9PntcclxuICAgICAgICAgICAgLy/mt7vliqDlhYnnjq/nibnmlYhcclxuICAgICAgICAgICAgaWYoIXRoaXMubGlnaHQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saWdodD1Hcm91bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXIzMF9iaWFuZnVfc2tpbGwsdGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Nb25zdGVyTm9ybWFsSW5pdGVkICgpIHsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuaGFsb19kYXRhPW5ldyBIYWxvRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuaGFsb19kYXRhLmhhbG9faWQ9SGFsb0lkLk1vbnN0ZXIzMF9CaWFuRnVfU2tpbGxfSGFsbztcclxuICAgICAgICB0aGlzLmhhbG9fZGF0YS5oYWxvX3ZhbHVlPVswLjNdO1xyXG4gICAgICAgIHRoaXMuaGFsb19kYXRhLmhhbG9fc291cmNlX3V1aWQ9dGhpcy51dWlkO1xyXG4gICAgICAgIGlmKHRoaXMuaXNfbG9hZGVkKXtcclxuICAgICAgICAgICAgaWYoIXRoaXMubGlnaHQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saWdodD1Hcm91bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXIzMF9iaWFuZnVfc2tpbGwsdGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTW9uc3Rlck5vcm1hbERlYXRoKCl7XHJcbiAgICAgICAgLy/ku6Xlj4rliKDpmaTmiYDmnInlhYnnjq/mlbDmja5cclxuICAgICAgICBpZih0aGlzLmxpZ2h0KXtcclxuICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyMzBfYmlhbmZ1X3NraWxsLHRoaXMubGlnaHQpO1xyXG4gICAgICAgICAgICB0aGlzLmxpZ2h0PW51bGw7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgbGV0IGFsbE1vbnN0ZXI9TW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmNoaWxkcmVuO1xyXG4gICAgICAgIGxldCBsZW49YWxsTW9uc3Rlci5sZW5ndGg7XHJcbiAgICAgICAgaWYobGVuPD0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIGZvcihsZXQgaT0wO2k8bGVuOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgbW9uc3Rlcj1hbGxNb25zdGVyW2ldO1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlclRTPW1vbnN0ZXIuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICBpZihtb25zdGVyVFMgJiYgbW9uc3RlclRTLmdldElzQ2FuQ2hlY2soKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy/np7vpmaTlhYnnjq/mlYjmnpxcclxuICAgICAgICAgICAgICAgIG1vbnN0ZXJUUy5zdWJIYWxvKEhhbG9JZC5Nb25zdGVyMzBfQmlhbkZ1X1NraWxsX0hhbG8sdGhpcy51dWlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gICAgXHJcblxyXG4gICAgdXBkYXRlIChkdCkge1xyXG4gICAgICAgIGlmKChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlIT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nKXx8dGhpcy5nZXRJc0RpZSgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci51cGRhdGUoZHQpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tTa2lsbCgpO1xyXG4gICAgICAgIGlmKHRoaXMubGlnaHQpe1xyXG4gICAgICAgICAgICB0aGlzLmxpZ2h0LnNldFBvc2l0aW9uKHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tTa2lsbCgpe1xyXG4gICAgICAgIGxldCBhbGxNb25zdGVyPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5jaGlsZHJlbjtcclxuICAgICAgICBsZXQgbGVuPWFsbE1vbnN0ZXIubGVuZ3RoO1xyXG4gICAgICAgIGlmKGxlbjw9MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICBmb3IobGV0IGk9MDtpPGxlbjsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXI9YWxsTW9uc3RlcltpXTtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXJUUz1tb25zdGVyLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAgICAgaWYobW9uc3RlclRTICYmIG1vbnN0ZXJUUy5nZXRJc0NhbkNoZWNrKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBkaXN0YW5jZT10aGlzLmdldENlbnRlclBvcygpLnN1Yihtb25zdGVyVFMuZ2V0Q2VudGVyUG9zKCkpLm1hZygpO1xyXG4gICAgICAgICAgICAgICAgaWYoZGlzdGFuY2U8PTIwMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+a3u+WKoOWFieeOr+aViOaenCAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbW9uc3RlclRTLmFkZEhhbG8odGhpcy5oYWxvX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/np7vpmaTlhYnnjq/mlYjmnpxcclxuICAgICAgICAgICAgICAgICAgICBtb25zdGVyVFMuc3ViSGFsbyhIYWxvSWQuTW9uc3RlcjMwX0JpYW5GdV9Ta2lsbF9IYWxvLHRoaXMudXVpZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19