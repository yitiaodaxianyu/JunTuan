
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcRWxpdGVcXEJpYW5GdS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBNEM7QUFDNUMsb0VBQWlGO0FBQ2pGLDBEQUFxRDtBQUNyRCxpREFBNEM7QUFDNUMseURBQThEO0FBQzlELHNDQUFpQztBQUNqQyxvREFBK0M7QUFDL0Msd0RBQW1EO0FBSTdDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQW9DLDBCQUFnQjtJQUFwRDtRQUFBLHFFQTRGQztRQTFGRyxXQUFLLEdBQVMsSUFBSSxDQUFDO1FBQ25CLGVBQVMsR0FBVSxJQUFJLENBQUM7UUFDeEIsZUFBUyxHQUFTLEtBQUssQ0FBQzs7SUF3RjVCLENBQUM7SUF0RmEsdUJBQU0sR0FBaEI7UUFBQSxpQkFXQztRQVZHLGlCQUFNLE1BQU0sV0FBRSxDQUFDO1FBQ2YsaUJBQU0sc0JBQXNCLFlBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDekQsaUJBQU0scUJBQXFCLFlBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDdkQsdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsaUNBQVksQ0FBQyxzQkFBc0IsRUFBQyxDQUFDLEVBQUM7WUFDckYsUUFBUTtZQUNSLElBQUcsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFDO2dCQUNYLEtBQUksQ0FBQyxLQUFLLEdBQUMsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxpQ0FBWSxDQUFDLHNCQUFzQixFQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQzthQUM1SDtZQUNELEtBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lB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QUFZLENBQUMsaUJBQU8sQ0FBQyxDQUFDO1lBQzVDLElBQUcsU0FBUyxJQUFJLFNBQVMsQ0FBQyxhQUFhLEVBQUUsRUFDekM7Z0JBQ0ksSUFBSSxRQUFRLEdBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDckUsSUFBRyxRQUFRLElBQUUsR0FBRyxFQUNoQjtvQkFDSSw0QkFBNEI7b0JBQzVCLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUNyQztxQkFBSTtvQkFDRCxRQUFRO29CQUNSLFNBQVMsQ0FBQyxPQUFPLENBQUMsbUJBQU0sQ0FBQywyQkFBMkIsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ25FO2FBQ0o7U0FDSjtJQUNMLENBQUM7SUEzRmdCLE1BQU07UUFEMUIsT0FBTztPQUNhLE1BQU0sQ0E0RjFCO0lBQUQsYUFBQztDQTVGRCxBQTRGQyxDQTVGbUMsMEJBQWdCLEdBNEZuRDtrQkE1Rm9CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lU3RhdGUgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBHcm91bmRNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lL0dyb3VuZE1hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIYWxvRGF0YSwgSGFsb0lkIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuLi9Nb25zdGVyXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi4vTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXJOZXdOb3JtYWwgZnJvbSBcIi4uL01vbnN0ZXJOZXdOb3JtYWxcIjtcclxuaW1wb3J0IE1vbnN0ZXJOb3JtYWwgZnJvbSBcIi4uL01vbnN0ZXJOb3JtYWxcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJpYW5GdSBleHRlbmRzIE1vbnN0ZXJOZXdOb3JtYWwge1xyXG5cclxuICAgIGxpZ2h0OmNjLk5vZGU9bnVsbDtcclxuICAgIGhhbG9fZGF0YTpIYWxvRGF0YT1udWxsO1xyXG4gICAgaXNfbG9hZGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICBzdXBlci5hZGRNb25zdGVyTm9ybWFsSW5pdGVkKHRoaXMub25Nb25zdGVyTm9ybWFsSW5pdGVkKTtcclxuICAgICAgICBzdXBlci5hZGRNb25zdGVyTm9ybWFsRGVhdGgodGhpcy5vbk1vbnN0ZXJOb3JtYWxEZWF0aCk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXIzMF9iaWFuZnVfc2tpbGwsMSwoKT0+e1xyXG4gICAgICAgICAgICAvL+a3u+WKoOWFieeOr+eJueaViFxyXG4gICAgICAgICAgICBpZighdGhpcy5saWdodCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpZ2h0PUdyb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubW9uc3RlcjMwX2JpYW5mdV9za2lsbCx0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc19sb2FkZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbk1vbnN0ZXJOb3JtYWxJbml0ZWQgKCkgeyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5oYWxvX2RhdGE9bmV3IEhhbG9EYXRhKCk7XHJcbiAgICAgICAgdGhpcy5oYWxvX2RhdGEuaGFsb19pZD1IYWxvSWQuTW9uc3RlcjMwX0JpYW5GdV9Ta2lsbF9IYWxvO1xyXG4gICAgICAgIHRoaXMuaGFsb19kYXRhLmhhbG9fdmFsdWU9WzAuM107XHJcbiAgICAgICAgdGhpcy5oYWxvX2RhdGEuaGFsb19zb3VyY2VfdXVpZD10aGlzLnV1aWQ7XHJcbiAgICAgICAgaWYodGhpcy5pc19sb2FkZWQpe1xyXG4gICAgICAgICAgICBpZighdGhpcy5saWdodCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpZ2h0PUdyb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubW9uc3RlcjMwX2JpYW5mdV9za2lsbCx0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Nb25zdGVyTm9ybWFsRGVhdGgoKXtcclxuICAgICAgICAvL+S7peWPiuWIoOmZpOaJgOacieWFieeOr+aVsOaNrlxyXG4gICAgICAgIGlmKHRoaXMubGlnaHQpe1xyXG4gICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXIzMF9iaWFuZnVfc2tpbGwsdGhpcy5saWdodCk7XHJcbiAgICAgICAgICAgIHRoaXMubGlnaHQ9bnVsbDtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICBsZXQgYWxsTW9uc3Rlcj1Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUuY2hpbGRyZW47XHJcbiAgICAgICAgbGV0IGxlbj1hbGxNb25zdGVyLmxlbmd0aDtcclxuICAgICAgICBpZihsZW48PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgZm9yKGxldCBpPTA7aTxsZW47IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyPWFsbE1vbnN0ZXJbaV07XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyVFM9bW9uc3Rlci5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgIGlmKG1vbnN0ZXJUUyAmJiBtb25zdGVyVFMuZ2V0SXNDYW5DaGVjaygpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL+enu+mZpOWFieeOr+aViOaenFxyXG4gICAgICAgICAgICAgICAgbW9uc3RlclRTLnN1YkhhbG8oSGFsb0lkLk1vbnN0ZXIzMF9CaWFuRnVfU2tpbGxfSGFsbyx0aGlzLnV1aWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSAgICBcclxuXHJcbiAgICB1cGRhdGUgKGR0KSB7XHJcbiAgICAgICAgaWYoKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUhPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpfHx0aGlzLmdldElzRGllKCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLnVwZGF0ZShkdCk7XHJcbiAgICAgICAgdGhpcy5jaGVja1NraWxsKCk7XHJcbiAgICAgICAgaWYodGhpcy5saWdodCl7XHJcbiAgICAgICAgICAgIHRoaXMubGlnaHQuc2V0UG9zaXRpb24odGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGVja1NraWxsKCl7XHJcbiAgICAgICAgbGV0IGFsbE1vbnN0ZXI9TW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmNoaWxkcmVuO1xyXG4gICAgICAgIGxldCBsZW49YWxsTW9uc3Rlci5sZW5ndGg7XHJcbiAgICAgICAgaWYobGVuPD0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIGZvcihsZXQgaT0wO2k8bGVuOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgbW9uc3Rlcj1hbGxNb25zdGVyW2ldO1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlclRTPW1vbnN0ZXIuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICBpZihtb25zdGVyVFMgJiYgbW9uc3RlclRTLmdldElzQ2FuQ2hlY2soKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpc3RhbmNlPXRoaXMuZ2V0Q2VudGVyUG9zKCkuc3ViKG1vbnN0ZXJUUy5nZXRDZW50ZXJQb3MoKSkubWFnKCk7XHJcbiAgICAgICAgICAgICAgICBpZihkaXN0YW5jZTw9MjAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5re75Yqg5YWJ546v5pWI5p6cICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBtb25zdGVyVFMuYWRkSGFsbyh0aGlzLmhhbG9fZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvL+enu+mZpOWFieeOr+aViOaenFxyXG4gICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJUUy5zdWJIYWxvKEhhbG9JZC5Nb25zdGVyMzBfQmlhbkZ1X1NraWxsX0hhbG8sdGhpcy51dWlkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=