
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/RenZhe/RenZhe.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '26489rHNaxMH6HhqtxTTS+e', 'RenZhe');
// Scripts/Hero/Game/RenZhe/RenZhe.ts

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
var FightingManager_1 = require("../../../Game/FightingManager");
var SkillManager_1 = require("../../../Game/SkillManager");
var GameManager_1 = require("../../../GameManager");
var Monster_1 = require("../../../Monster/Monster");
var MonsterData_1 = require("../../../Monster/MonsterData");
var MonsterManager_1 = require("../../../Monster/MonsterManager");
var AudioConstants_1 = require("../../../Sound/AudioConstants");
var WallManager_1 = require("../../../Wall/WallManager");
var Hero_1 = require("../Hero");
var HeroConfig_1 = require("../HeroConfig");
var ActiveDart_1 = require("./ActiveDart");
var Dart_1 = require("./Dart");
var EllipseMove_1 = require("./EllipseMove");
var FeiBiao_1 = require("./FeiBiao");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RenZhe = /** @class */ (function (_super) {
    __extends(RenZhe, _super);
    function RenZhe() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**当前存在的被动飞镖节点 */
        _this.cur_feibiao = [];
        _this.no_paopao_num = 0;
        return _this;
    }
    //---------------------------------------------加载----------------------------------------------
    RenZhe.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_att,4);
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_hit,4);
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_skill_hudun,1);
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_skill_1,4);
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_skill_ex,4);        
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_active_light_hit,2);
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_active_light_end,2);
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_active_ground_move,2);
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_active_ground_end,2);
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_active_light_move,2);        
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_huanrao,4);
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_active_ground_move,1);
        this.addSkillListen(this.useSkill);
        this.addAttackListen(this.normalAttack);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addHitListen(this.onHitMonster);
        this.addResetListen(this.onResetState);
    };
    RenZhe.prototype.onResetState = function () {
        var num = this.cur_feibiao.length;
        // for(let i=0; i<num; i++){
        //     GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.renzhe_feibiao_huanrao,this.cur_feibiao[i]);
        // }
    };
    RenZhe.prototype.onXuanYunResult = function (isXuanYun) {
        if (isXuanYun) {
            this.unscheduleAllCallbacks();
        }
        else {
            //根据上个状态判断需要做什么
            this.setHeroState(HeroConfig_1.Hero_State.idle, HeroConfig_1.GongJi_FangXiang.zhong);
        }
    };
    //---------------------------------------------攻击-------------------------------------------------
    RenZhe.prototype.onHitMonster = function (damageType, isCrit, monster) {
        if (isCrit && damageType == HeroConfig_1.DamageType.Normal) {
            if (!MonsterManager_1.default.getInstance().checkWallMonster(300)) {
                var rate = this.hero_data.getSkillValue2(HeroConfig_1.SkillType.Passive_2);
                if (rate && Math.random() < rate) {
                    WallManager_1.default.getInstance().getMainWall().addImmunityShield(HeroConfig_1.ShieldId.RenZhe_Skill2, HeroConfig_1.ShieldType.Skill, 5, 5);
                    // super.addBuff(Hero_Buff.renzhe_skill_2immunity_skill,{
                    //     remain_time: 5+this.hero_data.ExclusiveWeaponSkillValue_4,
                    //     damage_num: 0,
                    //     jiange_time: 1,
                    //     hero_type: this.hero_type,
                    //     other_value_1:1,
                    // })
                }
            }
        }
    };
    RenZhe.prototype.normalAttack = function (monster) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        //求出方向
        this.is_can_gongji = false;
        this.startAttack(monster);
    };
    RenZhe.prototype.startAttack = function (enemyNode) {
        var _this = this;
        var enemyPos = enemyNode.getComponent(Monster_1.default).getSheShouPos();
        var fangxiang = this.getFangXiangByPos(enemyPos);
        var data = new MonsterData_1.KeyFrameData();
        data.name = "Attack";
        data.callback = function () {
            var jianshiPos = _this.getCreateBulletPos();
            var offsetPos = enemyPos.sub(jianshiPos);
            var jianshiDir = Math.atan2(offsetPos.y, offsetPos.x);
            var gjData = _super.prototype.getGongJiData.call(_this, HeroConfig_1.DamageType.Normal, true, HeroConfig_1.SkillType.Null);
            //判断是否有敌军在300范围内
            if (!MonsterManager_1.default.getInstance().checkWallMonster(300)) {
                //test
                gjData.hero_data.Hit += gjData.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_2);
            }
            //先判断有没有被动飞镖
            if (_this.cur_feibiao.length > 0) {
                //减少一个飞镖
                var node = _this.cur_feibiao.pop();
                // GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.renzhe_feibiao_huanrao,node);
                // this.createFeiBiao(GameEffectId.renzhe_feibiao_skill_1,jianshiPos,this.bullet_speed,enemyNode,gjData);                
                var num = _this.cur_feibiao.length;
                var angle = num > 0 ? 360 / num : 0;
                for (var i = 0; i < num; i++) {
                    _this.cur_feibiao[i].getComponent(EllipseMove_1.default).refreshAngle(i * angle);
                }
            }
            else {
                var rate = _this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_1);
                var feibiaoId = 0;
                if (_this.hero_data.ExclusiveWeaponSkillValue_1 > 0 && _this.no_paopao_num >= _this.hero_data.ExclusiveWeaponSkillValue_1) {
                    rate = 1;
                    //feibiaoId=GameEffectId.renzhe_feibiao_skill_ex;
                }
                if (rate && Math.random() < rate) {
                    _this.createFeiBiao(feibiaoId, jianshiPos, _this.bullet_speed, enemyNode, gjData);
                    _this.no_paopao_num = 0;
                }
                else {
                    //this.createDart(GameEffectId.renzhe_feibiao_att,jianshiPos,this.bullet_speed,jianshiDir,gjData);
                    _this.no_paopao_num++;
                }
            }
        };
        _super.prototype.setHeroState.call(this, HeroConfig_1.Hero_State.attack, fangxiang, [data], function () {
            _this.setHeroState(HeroConfig_1.Hero_State.idle, _this.cur_fangxiang);
        });
    };
    RenZhe.prototype.createDart = function (id, jianshiPos, speed, dir, gjData) {
        var node = FightingManager_1.default.getInstance().createGameEffectById(id, jianshiPos);
        node.getComponent(Dart_1.default).init(id, speed, dir, gjData);
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_RenzheAttack);
    };
    RenZhe.prototype.createActiveDart = function (id, jianshiPos, speed, dir, gjData) {
        var node = FightingManager_1.default.getInstance().createGameEffectById(id, jianshiPos);
        node.getComponent(ActiveDart_1.default).init(id, speed, dir, gjData);
    };
    RenZhe.prototype.createFeiBiao = function (id, pos, speed, target, gjData) {
        var node = FightingManager_1.default.getInstance().createGameEffectById(id, pos);
        node.getComponent(FeiBiao_1.default).init(id, gjData, speed, target, 5);
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_RenzheAttack);
    };
    //---------------------------------------------技能-----------------------------------------------------
    RenZhe.prototype.useSkill = function (pos) {
        var _this = this;
        SkillManager_1.default.getInstance().releaseSkill(function () {
            _this.startSelfXuLi();
        }, this.node);
        return 0;
    };
    RenZhe.prototype.startSelfXuLi = function () {
        //蓄力帧监听        
        //怪物
    };
    RenZhe.prototype.startLaunch = function (groundMove, lightMove, monster) {
        // 
    };
    RenZhe = __decorate([
        ccclass
    ], RenZhe);
    return RenZhe;
}(Hero_1.default));
exports.default = RenZhe;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcUmVuWmhlXFxSZW5aaGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsZ0RBQXNEO0FBQ3RELGlFQUE0RDtBQUc1RCwyREFBc0Q7QUFDdEQsb0RBQStDO0FBQy9DLG9EQUErQztBQUMvQyw0REFBNEQ7QUFDNUQsa0VBQTZEO0FBQzdELGdFQUEyRDtBQUMzRCx5REFBb0Q7QUFHcEQsZ0NBQTJCO0FBQzNCLDRDQUE2SDtBQUM3SCwyQ0FBc0M7QUFDdEMsK0JBQTBCO0FBQzFCLDZDQUF3QztBQUN4QyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBb0MsMEJBQUk7SUFBeEM7UUFBQSxxRUFtS0M7UUFqS0csaUJBQWlCO1FBQ2pCLGlCQUFXLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLG1CQUFhLEdBQVEsQ0FBQyxDQUFDOztJQStKM0IsQ0FBQztJQTlKRCwrRkFBK0Y7SUFDM0YsdUJBQU0sR0FBTjtRQUVJLGlCQUFNLE1BQU0sV0FBRSxDQUFDO1FBQ2Ysa0VBQWtFO1FBQ2xFLGtFQUFrRTtRQUNsRSwwRUFBMEU7UUFDMUUsc0VBQXNFO1FBQ3RFLCtFQUErRTtRQUMvRSwrRUFBK0U7UUFDL0UsK0VBQStFO1FBQy9FLGlGQUFpRjtRQUNqRixnRkFBZ0Y7UUFDaEYsd0ZBQXdGO1FBQ3hGLHNFQUFzRTtRQUN0RSxpRkFBaUY7UUFDakYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsWUFBWSxD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OlsiXHJcbmltcG9ydCB7IEdhbWVTdGF0ZSwgSmlhU3UgfSBmcm9tIFwiLi4vLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBGaWdodGluZ01hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWUvRmlnaHRpbmdNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBHcm91bmRNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lL0dyb3VuZE1hbmFnZXJcIjtcclxuaW1wb3J0IFNraWxsTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZS9Ta2lsbE1hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyXCI7XHJcbmltcG9ydCB7IEtleUZyYW1lRGF0YSB9IGZyb20gXCIuLi8uLi8uLi9Nb25zdGVyL01vbnN0ZXJEYXRhXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBXYWxsTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vV2FsbC9XYWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHb25nSmlEYXRhIH0gZnJvbSBcIi4uLy4uL0RhdGEvSGVyb0RhdGFcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vQnVmZkRhdGFcIjtcclxuaW1wb3J0IEhlcm8gZnJvbSBcIi4uL0hlcm9cIjtcclxuaW1wb3J0IHsgQnVmZklkLCBCdWZmVHlwZSwgRGFtYWdlVHlwZSwgR29uZ0ppX0ZhbmdYaWFuZywgSGVyb19TdGF0ZSwgU2hpZWxkSWQsIFNoaWVsZFR5cGUsICBTa2lsbFR5cGUgfSBmcm9tIFwiLi4vSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgQWN0aXZlRGFydCBmcm9tIFwiLi9BY3RpdmVEYXJ0XCI7XHJcbmltcG9ydCBEYXJ0IGZyb20gXCIuL0RhcnRcIjtcclxuaW1wb3J0IEVsbGlwc2VNb3ZlIGZyb20gXCIuL0VsbGlwc2VNb3ZlXCI7XHJcbmltcG9ydCBGZWlCaWFvIGZyb20gXCIuL0ZlaUJpYW9cIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVuWmhlIGV4dGVuZHMgSGVybyB7XHJcblxyXG4gICAgLyoq5b2T5YmN5a2Y5Zyo55qE6KKr5Yqo6aOe6ZWW6IqC54K5ICovXHJcbiAgICBjdXJfZmVpYmlhbzpjYy5Ob2RlW109W107ICAgIFxyXG4gICAgbm9fcGFvcGFvX251bTpudW1iZXI9MDtcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3liqDovb0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBvbkxvYWQoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpOyAgICAgICAgXHJcbiAgICAgICAgLy8gc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5yZW56aGVfZmVpYmlhb19hdHQsNCk7XHJcbiAgICAgICAgLy8gc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5yZW56aGVfZmVpYmlhb19oaXQsNCk7XHJcbiAgICAgICAgLy8gc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5yZW56aGVfZmVpYmlhb19za2lsbF9odWR1biwxKTtcclxuICAgICAgICAvLyBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnJlbnpoZV9mZWliaWFvX3NraWxsXzEsNCk7XHJcbiAgICAgICAgLy8gc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5yZW56aGVfZmVpYmlhb19za2lsbF9leCw0KTsgICAgICAgIFxyXG4gICAgICAgIC8vIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQucmVuemhlX2ZlaWJpYW9fYWN0aXZlX2xpZ2h0X2hpdCwyKTtcclxuICAgICAgICAvLyBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnJlbnpoZV9mZWliaWFvX2FjdGl2ZV9saWdodF9lbmQsMik7XHJcbiAgICAgICAgLy8gc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5yZW56aGVfZmVpYmlhb19hY3RpdmVfZ3JvdW5kX21vdmUsMik7XHJcbiAgICAgICAgLy8gc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5yZW56aGVfZmVpYmlhb19hY3RpdmVfZ3JvdW5kX2VuZCwyKTtcclxuICAgICAgICAvLyBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnJlbnpoZV9mZWliaWFvX2FjdGl2ZV9saWdodF9tb3ZlLDIpOyAgICAgICAgXHJcbiAgICAgICAgLy8gc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5yZW56aGVfZmVpYmlhb19odWFucmFvLDQpO1xyXG4gICAgICAgIC8vIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQucmVuemhlX2ZlaWJpYW9fYWN0aXZlX2dyb3VuZF9tb3ZlLDEpO1xyXG4gICAgICAgIHRoaXMuYWRkU2tpbGxMaXN0ZW4odGhpcy51c2VTa2lsbCk7XHJcbiAgICAgICAgdGhpcy5hZGRBdHRhY2tMaXN0ZW4odGhpcy5ub3JtYWxBdHRhY2spO1xyXG4gICAgICAgIHRoaXMuYWRkWHVhbll1bkxpc3Rlbih0aGlzLm9uWHVhbll1blJlc3VsdCk7XHJcbiAgICAgICAgdGhpcy5hZGRIaXRMaXN0ZW4odGhpcy5vbkhpdE1vbnN0ZXIpO1xyXG4gICAgICAgIHRoaXMuYWRkUmVzZXRMaXN0ZW4odGhpcy5vblJlc2V0U3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUmVzZXRTdGF0ZSgpe1xyXG4gICAgICAgIGxldCBudW09dGhpcy5jdXJfZmVpYmlhby5sZW5ndGg7XHJcbiAgICAgICAgLy8gZm9yKGxldCBpPTA7IGk8bnVtOyBpKyspe1xyXG4gICAgICAgIC8vICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLnJlbnpoZV9mZWliaWFvX2h1YW5yYW8sdGhpcy5jdXJfZmVpYmlhb1tpXSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uWHVhbll1blJlc3VsdChpc1h1YW5ZdW46Ym9vbGVhbil7XHJcbiAgICAgICAgaWYoaXNYdWFuWXVuKXtcclxuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8v5qC55o2u5LiK5Liq54q25oCB5Yik5pat6ZyA6KaB5YGa5LuA5LmIXHJcbiAgICAgICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSxHb25nSmlfRmFuZ1hpYW5nLnpob25nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mlLvlh7stLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBvbkhpdE1vbnN0ZXIoZGFtYWdlVHlwZTpEYW1hZ2VUeXBlLGlzQ3JpdDpib29sZWFuLG1vbnN0ZXI6Y2MuTm9kZSl7XHJcbiAgICAgICAgaWYoaXNDcml0JiZkYW1hZ2VUeXBlPT1EYW1hZ2VUeXBlLk5vcm1hbCl7XHJcbiAgICAgICAgICAgIGlmKCFNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoZWNrV2FsbE1vbnN0ZXIoMzAwKSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmF0ZT10aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMihTa2lsbFR5cGUuUGFzc2l2ZV8yKTtcclxuICAgICAgICAgICAgICAgIGlmKHJhdGUmJk1hdGgucmFuZG9tKCk8cmF0ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmFkZEltbXVuaXR5U2hpZWxkKFNoaWVsZElkLlJlblpoZV9Ta2lsbDIsU2hpZWxkVHlwZS5Ta2lsbCw1LDUpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHN1cGVyLmFkZEJ1ZmYoSGVyb19CdWZmLnJlbnpoZV9za2lsbF8yaW1tdW5pdHlfc2tpbGwse1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICByZW1haW5fdGltZTogNSt0aGlzLmhlcm9fZGF0YS5FeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlXzQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGRhbWFnZV9udW06IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGppYW5nZV90aW1lOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBoZXJvX3R5cGU6IHRoaXMuaGVyb190eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBvdGhlcl92YWx1ZV8xOjEsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfSlcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5vcm1hbEF0dGFjayhtb25zdGVyOmNjLk5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZylcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgLy/msYLlh7rmlrnlkJFcclxuICAgICAgICB0aGlzLmlzX2Nhbl9nb25namk9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdGFydEF0dGFjayhtb25zdGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydEF0dGFjayhlbmVteU5vZGU6Y2MuTm9kZSlcclxuICAgIHtcclxuICAgICAgICBsZXQgZW5lbXlQb3M9ZW5lbXlOb2RlLmdldENvbXBvbmVudChNb25zdGVyKS5nZXRTaGVTaG91UG9zKCk7XHJcbiAgICAgICAgbGV0IGZhbmd4aWFuZz10aGlzLmdldEZhbmdYaWFuZ0J5UG9zKGVuZW15UG9zKTsgICAgICAgIFxyXG4gICAgICAgIGxldCBkYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICBkYXRhLm5hbWU9XCJBdHRhY2tcIjtcclxuICAgICAgICBkYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgICAgIGxldCBqaWFuc2hpUG9zPXRoaXMuZ2V0Q3JlYXRlQnVsbGV0UG9zKCk7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXRQb3M9ZW5lbXlQb3Muc3ViKGppYW5zaGlQb3MpO1xyXG4gICAgICAgICAgICBsZXQgamlhbnNoaURpcj1NYXRoLmF0YW4yKG9mZnNldFBvcy55LG9mZnNldFBvcy54KTtcclxuICAgICAgICAgICAgbGV0IGdqRGF0YT1zdXBlci5nZXRHb25nSmlEYXRhKERhbWFnZVR5cGUuTm9ybWFsLHRydWUsU2tpbGxUeXBlLk51bGwpO1xyXG4gICAgICAgICAgICAvL+WIpOaWreaYr+WQpuacieaVjOWGm+WcqDMwMOiMg+WbtOWGhVxyXG4gICAgICAgICAgICBpZighTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVja1dhbGxNb25zdGVyKDMwMCkpe1xyXG4gICAgICAgICAgICAgICAgLy90ZXN0XHJcbiAgICAgICAgICAgICAgICBnakRhdGEuaGVyb19kYXRhLkhpdCs9Z2pEYXRhLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMShTa2lsbFR5cGUuUGFzc2l2ZV8yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+WFiOWIpOaWreacieayoeacieiiq+WKqOmjnumVllxyXG4gICAgICAgICAgICBpZih0aGlzLmN1cl9mZWliaWFvLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgIC8v5YeP5bCR5LiA5Liq6aOe6ZWWXHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT10aGlzLmN1cl9mZWliaWFvLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5yZW56aGVfZmVpYmlhb19odWFucmFvLG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5jcmVhdGVGZWlCaWFvKEdhbWVFZmZlY3RJZC5yZW56aGVfZmVpYmlhb19za2lsbF8xLGppYW5zaGlQb3MsdGhpcy5idWxsZXRfc3BlZWQsZW5lbXlOb2RlLGdqRGF0YSk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IG51bT10aGlzLmN1cl9mZWliaWFvLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGxldCBhbmdsZT1udW0+MD8zNjAvbnVtOjA7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxudW07IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJfZmVpYmlhb1tpXS5nZXRDb21wb25lbnQoRWxsaXBzZU1vdmUpLnJlZnJlc2hBbmdsZShpKmFuZ2xlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmF0ZT10aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMShTa2lsbFR5cGUuUGFzc2l2ZV8xKTtcclxuICAgICAgICAgICAgICAgIGxldCBmZWliaWFvSWQ9MDtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaGVyb19kYXRhLkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMT4wICYmIHRoaXMubm9fcGFvcGFvX251bT49dGhpcy5oZXJvX2RhdGEuRXhjbHVzaXZlV2VhcG9uU2tpbGxWYWx1ZV8xKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJhdGU9MTtcclxuICAgICAgICAgICAgICAgICAgICAvL2ZlaWJpYW9JZD1HYW1lRWZmZWN0SWQucmVuemhlX2ZlaWJpYW9fc2tpbGxfZXg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihyYXRlJiZNYXRoLnJhbmRvbSgpPHJhdGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlRmVpQmlhbyhmZWliaWFvSWQsamlhbnNoaVBvcyx0aGlzLmJ1bGxldF9zcGVlZCxlbmVteU5vZGUsZ2pEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vX3Bhb3Bhb19udW09MDtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5jcmVhdGVEYXJ0KEdhbWVFZmZlY3RJZC5yZW56aGVfZmVpYmlhb19hdHQsamlhbnNoaVBvcyx0aGlzLmJ1bGxldF9zcGVlZCxqaWFuc2hpRGlyLGdqRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub19wYW9wYW9fbnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmF0dGFjayxmYW5neGlhbmcsW2RhdGFdLCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSx0aGlzLmN1cl9mYW5neGlhbmcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZURhcnQoaWQ6R2FtZUVmZmVjdElkLGppYW5zaGlQb3M6Y2MuVmVjMixzcGVlZDpudW1iZXIsZGlyOm51bWJlcixnakRhdGE6R29uZ0ppRGF0YSl7XHJcbiAgICAgICAgbGV0IG5vZGU9RmlnaHRpbmdNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoaWQsamlhbnNoaVBvcyk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoRGFydCkuaW5pdChpZCxzcGVlZCxkaXIsZ2pEYXRhKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfUmVuemhlQXR0YWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVBY3RpdmVEYXJ0KGlkOkdhbWVFZmZlY3RJZCxqaWFuc2hpUG9zOmNjLlZlYzIsc3BlZWQ6bnVtYmVyLGRpcjpudW1iZXIsZ2pEYXRhOkdvbmdKaURhdGEpe1xyXG4gICAgICAgIGxldCBub2RlPUZpZ2h0aW5nTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKGlkLGppYW5zaGlQb3MpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEFjdGl2ZURhcnQpLmluaXQoaWQsc3BlZWQsZGlyLGdqRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlRmVpQmlhbyhpZDpHYW1lRWZmZWN0SWQscG9zOmNjLlZlYzIsc3BlZWQ6bnVtYmVyLHRhcmdldDpjYy5Ob2RlLGdqRGF0YTpHb25nSmlEYXRhKXtcclxuICAgICAgICBsZXQgbm9kZT1GaWdodGluZ01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChpZCxwb3MpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEZlaUJpYW8pLmluaXQoaWQsZ2pEYXRhLHNwZWVkLHRhcmdldCw1KTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfUmVuemhlQXR0YWNrKTsgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mioDog70tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIHVzZVNraWxsKHBvczpjYy5WZWMyKTpudW1iZXJcclxuICAgIHsgICAgICAgIFxyXG4gICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbGVhc2VTa2lsbCgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0U2VsZlh1TGkoKTtcclxuICAgICAgICB9LHRoaXMubm9kZSk7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRTZWxmWHVMaSgpe1xyXG4gICAgICAgIC8v6JOE5Yqb5bin55uR5ZCsICAgICAgICBcclxuICAgICAgICAvL+aAqueJqVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0TGF1bmNoKGdyb3VuZE1vdmU6Y2MuTm9kZSxsaWdodE1vdmU6Y2MuTm9kZSxtb25zdGVyOmNjLk5vZGUpe1xyXG4gICAgICAgIC8vIFxyXG4gICAgfVxyXG59XHJcbiJdfQ==