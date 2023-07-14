
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Game/RayPet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '33a89gf8xVHuq7Z8lUd+LZ+', 'RayPet');
// Scripts/Pet/Game/RayPet.ts

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
var ChainLightning_1 = require("../../Hero/Game/LeiShen/ChainLightning");
var Monster_1 = require("../../Monster/Monster");
var MonsterManager_1 = require("../../Monster/MonsterManager");
var PetConfig_1 = require("../PetConfig");
var Pet_1 = require("./Pet");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RayPet = /** @class */ (function (_super) {
    __extends(RayPet, _super);
    function RayPet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**被闪电过的怪的uuid */
        _this.shandian_monster = [];
        return _this;
        // update(dt:number){
        //     if(GameManager.getInstance().cur_game_state!=GameState.Game_Playing)
        //     {
        //         return;
        //     }
        //     this.checkSkill(dt);
        // }
        // checkSkill(dt:number){
        //     this.cd_time-=dt;
        //     if(this.cd_time<0){
        //         this.cd_time=0;
        //     }
        // }
    }
    RayPet.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.addAttackListen(this.onAttack);
        this.addInitedListen(this.onPetInited);
    };
    RayPet.prototype.onPetInited = function () {
        this.cd_time = 0;
    };
    /**普攻对敌人释放一道闪电，可以连续弹射N次*/
    RayPet.prototype.onAttack = function (monster) {
        if (Math.random() < this.pet_data.getSkillValue1(PetConfig_1.PetSkillType.Active)) {
            this.shandian_monster = new Array();
            this.createShanDian(null, monster.getComponent(Monster_1.default));
            this.cd_time = 0;
        }
    };
    RayPet.prototype.createShanDian = function (firstMonster, endMonster) {
        this.shandian_monster.push(endMonster.uuid);
        var shandian = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.pet4_skill, this.node.getPosition());
        shandian.getComponent(ChainLightning_1.default).init(GameEffectsManager_1.GameEffectId.pet4_skill, firstMonster, endMonster, this.onEndMonster.bind(this));
        var gjData = this.getGongJiData(false, this.pet_data.getSkillValue3(PetConfig_1.PetSkillType.Active));
        var data = endMonster.beFlashInjured(gjData);
    };
    RayPet.prototype.onEndMonster = function (endMonster) {
        var tansheNum = this.pet_data.getSkillValue2(PetConfig_1.PetSkillType.Active);
        if (this.shandian_monster.length < tansheNum) {
            var nextMonster = this.getMonster(endMonster.getCenterPos());
            if (nextMonster) {
                this.createShanDian(endMonster, nextMonster);
            }
        }
    };
    RayPet.prototype.getIsTanShe = function (uuid) {
        return this.shandian_monster.indexOf(uuid) >= 0;
    };
    RayPet.prototype.getMonster = function (pos) {
        var em = MonsterManager_1.default.getInstance();
        if (em.node.childrenCount <= 0) {
            return null;
        }
        //1.先检测在攻击范围内符合攻击单位的敌人
        var attMonsters = new Array();
        for (var _i = 0, _a = em.node.children; _i < _a.length; _i++) {
            var enemy = _a[_i];
            var enemyTS = enemy.getComponent(Monster_1.default);
            if (enemyTS && enemyTS.getIsCanCheck() == true) {
                var distance = pos.sub(enemyTS.getCenterPos()).mag();
                if (this.getIsTanShe(enemyTS.uuid) == false && distance <= 500) {
                    attMonsters.push(enemyTS);
                }
            }
        }
        if (attMonsters.length <= 0) {
            return null;
        }
        if (1 == attMonsters.length) {
            return attMonsters[0];
        }
        //2.1优先攻击跟目标位置最近的单位
        attMonsters.sort(function (a, b) {
            return a.getCenterPos().sub(pos).mag() - b.getCenterPos().sub(pos).mag();
        });
        return attMonsters[0];
    };
    RayPet = __decorate([
        ccclass
    ], RayPet);
    return RayPet;
}(Pet_1.default));
exports.default = RayPet;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxHYW1lXFxSYXlQZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esb0VBQWlGO0FBSWpGLHlFQUFvRTtBQUNwRSxpREFBNEM7QUFDNUMsK0RBQTBEO0FBQzFELDBDQUE0QztBQUM1Qyw2QkFBd0I7QUFFbEIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBb0MsMEJBQUc7SUFBdkM7UUFBQSxxRUFnR0M7UUE5RkcsaUJBQWlCO1FBQ2pCLHNCQUFnQixHQUFVLEVBQUUsQ0FBQzs7UUErRTdCLHFCQUFxQjtRQUNyQiwyRUFBMkU7UUFDM0UsUUFBUTtRQUNSLGtCQUFrQjtRQUNsQixRQUFRO1FBQ1IsMkJBQTJCO1FBQzNCLElBQUk7UUFFSix5QkFBeUI7UUFDekIsd0JBQXdCO1FBQ3hCLDBCQUEwQjtRQUMxQiwwQkFBMEI7UUFDMUIsUUFBUTtRQUNSLElBQUk7SUFDUixDQUFDO0lBM0ZHLHVCQUFNLEdBQU47UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCw0QkFBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELHlCQUF5QjtJQUN6Qix5QkFBUSxHQUFSLFVBQVMsT0FBZTtRQUNwQixJQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyx3QkFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFDO1lBQy9ELElBQUksQ0FBQyxnQkFBZ0IsR0FBQyxJQUFJLEtBQUss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QjtZQUNJLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxJQUFHLENBQUMsSUFBRSxXQUFXLENBQUMsTUFBTSxFQUN4QjtZQUNJLE9BQU8sV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3pCO1FBQ0QsbUJBQW1CO1FBQ25CLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFTLEVBQUMsQ0FBUztZQUNqQyxPQUFPLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUMsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMzRSxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFoRmdCLE1BQU07UUFEMUIsT0FBTztPQUNhLE1BQU0sQ0FnRzFCO0lBQUQsYUFBQztDQWhHRCxBQWdHQyxDQWhHbUMsYUFBRyxHQWdHdEM7a0JBaEdvQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5pbXBvcnQgeyBHYW1lU3RhdGUgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0J1ZmZEYXRhXCI7XHJcbmltcG9ydCB7IERhbWFnZVR5cGUsIFNraWxsVHlwZSwgQnVmZklkLCBCdWZmVHlwZSB9IGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgQ2hhaW5MaWdodG5pbmcgZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9MZWlTaGVuL0NoYWluTGlnaHRuaW5nXCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuLi8uLi9Nb25zdGVyL01vbnN0ZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXJNYW5hZ2VyIGZyb20gXCIuLi8uLi9Nb25zdGVyL01vbnN0ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFBldFNraWxsVHlwZSB9IGZyb20gXCIuLi9QZXRDb25maWdcIjtcclxuaW1wb3J0IFBldCBmcm9tIFwiLi9QZXRcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmF5UGV0IGV4dGVuZHMgUGV0IHtcclxuXHJcbiAgICAvKirooqvpl6rnlLXov4fnmoTmgKrnmoR1dWlkICovXHJcbiAgICBzaGFuZGlhbl9tb25zdGVyOnN0cmluZ1tdPVtdO1xyXG5cclxuICAgIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICB0aGlzLmFkZEF0dGFja0xpc3Rlbih0aGlzLm9uQXR0YWNrKTtcclxuICAgICAgICB0aGlzLmFkZEluaXRlZExpc3Rlbih0aGlzLm9uUGV0SW5pdGVkKTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uUGV0SW5pdGVkKCl7XHJcbiAgICAgICAgdGhpcy5jZF90aW1lPTA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5pmu5pS75a+55pWM5Lq66YeK5pS+5LiA6YGT6Zeq55S177yM5Y+v5Lul6L+e57ut5by55bCETuasoSovXHJcbiAgICBvbkF0dGFjayhtb25zdGVyOmNjLk5vZGUpe1xyXG4gICAgICAgIGlmKE1hdGgucmFuZG9tKCk8dGhpcy5wZXRfZGF0YS5nZXRTa2lsbFZhbHVlMShQZXRTa2lsbFR5cGUuQWN0aXZlKSl7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhbmRpYW5fbW9uc3Rlcj1uZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVTaGFuRGlhbihudWxsLG1vbnN0ZXIuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpKTtcclxuICAgICAgICAgICAgdGhpcy5jZF90aW1lPTA7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNyZWF0ZVNoYW5EaWFuKGZpcnN0TW9uc3RlcjpNb25zdGVyLGVuZE1vbnN0ZXI6TW9uc3Rlcil7ICAgICAgICBcclxuICAgICAgICB0aGlzLnNoYW5kaWFuX21vbnN0ZXIucHVzaChlbmRNb25zdGVyLnV1aWQpO1xyXG4gICAgICAgIGxldCBzaGFuZGlhbj1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQucGV0NF9za2lsbCx0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgc2hhbmRpYW4uZ2V0Q29tcG9uZW50KENoYWluTGlnaHRuaW5nKS5pbml0KEdhbWVFZmZlY3RJZC5wZXQ0X3NraWxsLGZpcnN0TW9uc3RlcixlbmRNb25zdGVyLHRoaXMub25FbmRNb25zdGVyLmJpbmQodGhpcykpO1xyXG4gICAgICAgIGxldCBnakRhdGE9dGhpcy5nZXRHb25nSmlEYXRhKGZhbHNlLHRoaXMucGV0X2RhdGEuZ2V0U2tpbGxWYWx1ZTMoUGV0U2tpbGxUeXBlLkFjdGl2ZSkpXHJcbiAgICAgICAgbGV0IGRhdGE9ZW5kTW9uc3Rlci5iZUZsYXNoSW5qdXJlZChnakRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRW5kTW9uc3RlcihlbmRNb25zdGVyOk1vbnN0ZXIpe1xyXG4gICAgICAgIGxldCB0YW5zaGVOdW09dGhpcy5wZXRfZGF0YS5nZXRTa2lsbFZhbHVlMihQZXRTa2lsbFR5cGUuQWN0aXZlKTtcclxuICAgICAgICBpZih0aGlzLnNoYW5kaWFuX21vbnN0ZXIubGVuZ3RoPHRhbnNoZU51bSl7XHJcbiAgICAgICAgICAgIGxldCBuZXh0TW9uc3Rlcj10aGlzLmdldE1vbnN0ZXIoZW5kTW9uc3Rlci5nZXRDZW50ZXJQb3MoKSk7XHJcbiAgICAgICAgICAgIGlmKG5leHRNb25zdGVyKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU2hhbkRpYW4oZW5kTW9uc3RlcixuZXh0TW9uc3Rlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXNUYW5TaGUodXVpZDpzdHJpbmcpOmJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhbmRpYW5fbW9uc3Rlci5pbmRleE9mKHV1aWQpPj0wO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE1vbnN0ZXIocG9zOmNjLlZlYzIpOk1vbnN0ZXJcclxuICAgIHtcclxuICAgICAgICBsZXQgZW09TW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKTsgICAgICAgIFxyXG4gICAgICAgIGlmKGVtLm5vZGUuY2hpbGRyZW5Db3VudDw9MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLzEu5YWI5qOA5rWL5Zyo5pS75Ye76IyD5Zu05YaF56ym5ZCI5pS75Ye75Y2V5L2N55qE5pWM5Lq6XHJcbiAgICAgICAgbGV0IGF0dE1vbnN0ZXJzOk1vbnN0ZXJbXT1uZXcgQXJyYXkoKTtcclxuICAgICAgICBmb3IobGV0IGVuZW15IG9mIGVtLm5vZGUuY2hpbGRyZW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgZW5lbXlUUz1lbmVteS5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgIGlmKGVuZW15VFMgJiYgZW5lbXlUUy5nZXRJc0NhbkNoZWNrKCk9PXRydWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBkaXN0YW5jZT1wb3Muc3ViKGVuZW15VFMuZ2V0Q2VudGVyUG9zKCkpLm1hZygpO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5nZXRJc1RhblNoZShlbmVteVRTLnV1aWQpPT1mYWxzZSAmJiBkaXN0YW5jZTw9NTAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dE1vbnN0ZXJzLnB1c2goZW5lbXlUUyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoYXR0TW9uc3RlcnMubGVuZ3RoPD0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKDE9PWF0dE1vbnN0ZXJzLmxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhdHRNb25zdGVyc1swXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8yLjHkvJjlhYjmlLvlh7vot5/nm67moIfkvY3nva7mnIDov5HnmoTljZXkvY1cclxuICAgICAgICBhdHRNb25zdGVycy5zb3J0KChhOk1vbnN0ZXIsYjpNb25zdGVyKT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gYS5nZXRDZW50ZXJQb3MoKS5zdWIocG9zKS5tYWcoKS1iLmdldENlbnRlclBvcygpLnN1Yihwb3MpLm1hZygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBhdHRNb25zdGVyc1swXTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUoZHQ6bnVtYmVyKXtcclxuICAgIC8vICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlIT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgcmV0dXJuO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICB0aGlzLmNoZWNrU2tpbGwoZHQpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIGNoZWNrU2tpbGwoZHQ6bnVtYmVyKXtcclxuICAgIC8vICAgICB0aGlzLmNkX3RpbWUtPWR0O1xyXG4gICAgLy8gICAgIGlmKHRoaXMuY2RfdGltZTwwKXtcclxuICAgIC8vICAgICAgICAgdGhpcy5jZF90aW1lPTA7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG59XHJcbiJdfQ==