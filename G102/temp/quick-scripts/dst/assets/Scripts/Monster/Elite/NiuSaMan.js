
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/Elite/NiuSaMan.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd0572RMdWBP/Iydys09ql35', 'NiuSaMan');
// Scripts/Monster/Elite/NiuSaMan.ts

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
var EnemyConfig_1 = require("../../Enemy/EnemyConfig");
var GameEffectsManager_1 = require("../../Game/GameEffectsManager");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var Monster_1 = require("../Monster");
var MonsterBullet_1 = require("../MonsterBullet");
var MonsterData_1 = require("../MonsterData");
var MonsterManager_1 = require("../MonsterManager");
var MonsterNewNormal_1 = require("../MonsterNewNormal");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NiuSaMan = /** @class */ (function (_super) {
    __extends(NiuSaMan, _super);
    function NiuSaMan() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.light = null;
        //halo_data:HaloData=null;
        _this.is_loaded = false;
        _this.attack_num = 0;
        return _this;
        // onMonsterNormalDeath(){
        //     //以及删除所有光环数据
        //     if(this.light){
        //         GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.monster69_niusaman_skill,this.light);
        //         this.light=null;
        //     }        
        //     let allMonster=MonsterManager.getInstance().node.children;
        //     let len=allMonster.length;
        //     if(len<=0)
        //     {
        //         return null;
        //     }            
        //     for(let i=0;i<len; i++)
        //     {
        //         let monster=allMonster[i];
        //         let monsterTS=monster.getComponent(Monster);
        //         if(monsterTS && monsterTS.getIsCanCheck())
        //         {
        //             //移除光环效果
        //             monsterTS.subHalo(HaloId.Monster30_BianFu_Skill_Halo,this.uuid);
        //         }
        //     }
        // }    
        // update (dt) {
        //     if((GameManager.getInstance().cur_game_state!=GameState.Game_Playing)||this.getIsDie())
        //     {
        //         return;
        //     }
        //     super.update(dt);
        //     this.checkSkill();
        //     if(this.light){
        //         this.light.setPosition(this.node.getPosition());
        //     }
        // }
        // checkSkill(){
        //     let allMonster=MonsterManager.getInstance().node.children;
        //     let len=allMonster.length;
        //     if(len<=0)
        //     {
        //         return null;
        //     }            
        //     for(let i=0;i<len; i++)
        //     {
        //         let monster=allMonster[i];
        //         let monsterTS=monster.getComponent(Monster);
        //         if(monsterTS && monsterTS.getIsCanCheck())
        //         {
        //             let distance=this.getCenterPos().sub(monsterTS.getCenterPos()).mag();
        //             if(distance<=200)
        //             {
        //                 //添加光环效果                    
        //                 monsterTS.addHalo(this.halo_data);
        //             }else{
        //                 //移除光环效果
        //                 monsterTS.subHalo(HaloId.Monster69_NiuSaMan_Skill_Halo,this.uuid);
        //             }
        //         }
        //     }
        // }
    }
    NiuSaMan.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        //super.addMonsterNormalInited(this.onMonsterNormalInited);
        //super.addMonsterNormalDeath(this.onMonsterNormalDeath);
        this.addMonsterNormalAttack(this.onMonsterNormalAttack);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster69_niusaman_att);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster_zhiliao_halo_hit);
        // GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster69_niusaman_skill,1,()=>{
        //     //添加光环特效
        //     if(!this.light){
        //         this.light=GroundManager.getInstance().createGameEffectById(GameEffectId.monster69_niusaman_skill,this.node.getPosition());
        //     }
        //     this.is_loaded=true;
        // });
    };
    // onMonsterNormalInited () {        
    //     this.halo_data=new HaloData();
    //     this.halo_data.halo_id=HaloId.Monster69_NiuSaMan_Skill_Halo;
    //     this.halo_data.halo_value=[500];
    //     this.halo_data.halo_source_uuid=this.uuid;
    //     if(this.is_loaded){
    //         if(!this.light){
    //             this.light=GroundManager.getInstance().createGameEffectById(GameEffectId.monster69_niusaman_skill,this.node.getPosition());
    //         }
    //     }
    // }
    /**怪物开始攻击，返回是否截获本次攻击 */
    NiuSaMan.prototype.onMonsterNormalAttack = function () {
        var _this = this;
        //发射
        this.att_jishu = 0;
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.att);
        var data = new MonsterData_1.KeyFrameData();
        data.name = 'OnDamaging';
        data.callback = function () {
            if (_this.getIsDie() == true) {
                return;
            }
            _this.att_jishu = 0;
            var attPos = _super.prototype.getAttPos.call(_this);
            var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster69_niusaman_att, attPos);
            node.getComponent(MonsterBullet_1.default).init(_this.getAttData(HeroConfig_1.DamageType.Normal, true), _this.monster_far_att, _this.monster_far_att_hit, 1200, Math.PI * 3 / 2);
            _this.attack_num++;
            if (_this.attack_num >= _this.skill_data.getSkillValue1(1)) {
                //恢复
                _this.attack_num = 0;
                var monsters = MonsterManager_1.default.getInstance().getMonstersForMonsterPos(-1, _this.node.getPosition(), _this.skill_data.getSkillValue2(1));
                if (monsters) {
                    for (var i = 0; i < monsters.length; i++) {
                        var monsterTs = monsters[i].getComponent(Monster_1.default);
                        if (monsterTs) {
                            var isOk = monsterTs.beHeal(_this.getMaxHp() * _this.skill_data.getSkillValue3(1));
                            if (isOk) {
                                //特效
                                GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster_zhiliao_halo_hit, monsterTs.getCenterPos());
                            }
                        }
                    }
                }
            }
        };
        _super.prototype.playSpinAnimaton.call(this, (this.getAnimaName(MonsterData_1.MonsterActionName.Attack)), false, data, function () {
            _super.prototype.setEnemyState.call(_this, EnemyConfig_1.Enemy_State.move);
            _this.startIdle();
            if (_this.att_wall) {
                _this.move_direction = Math.random() > 0.5 ? Math.PI : 0;
            }
        });
        return true;
    };
    NiuSaMan = __decorate([
        ccclass
    ], NiuSaMan);
    return NiuSaMan;
}(MonsterNewNormal_1.default));
exports.default = NiuSaMan;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcRWxpdGVcXE5pdVNhTWFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUFzRDtBQUN0RCxvRUFBaUY7QUFDakYseURBQXdEO0FBQ3hELHNDQUFpQztBQUNqQyxrREFBNkM7QUFDN0MsOENBQWlFO0FBQ2pFLG9EQUErQztBQUMvQyx3REFBbUQ7QUFHN0MsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBc0MsNEJBQWdCO0lBQXREO1FBQUEscUVBNklDO1FBM0lHLFdBQUssR0FBUyxJQUFJLENBQUM7UUFDbkIsMEJBQTBCO1FBQzFCLGVBQVMsR0FBUyxLQUFLLENBQUM7UUFDeEIsZ0JBQVUsR0FBUSxDQUFDLENBQUM7O1FBMkVwQiwwQkFBMEI7UUFDMUIsbUJBQW1CO1FBQ25CLHNCQUFzQjtRQUN0QixvSEFBb0g7UUFDcEgsMkJBQTJCO1FBQzNCLGdCQUFnQjtRQUNoQixpRUFBaUU7UUFDakUsaUNBQWlDO1FBQ2pDLGlCQUFpQjtRQUNqQixRQUFRO1FBQ1IsdUJBQXVCO1FBQ3ZCLG9CQUFvQjtRQUNwQiw4QkFBOEI7UUFDOUIsUUFBUTtRQUNSLHFDQUFxQztRQUNyQyx1REFBdUQ7UUFDdkQscURBQXFEO1FBQ3JELFlBQVk7UUFDWix1QkFBdUI7UUFDdkIsK0VBQStFO1FBQy9FLFlBQVk7UUFDWixRQUFRO1FBQ1IsUUFBUTtRQUVSLGdCQUFnQjtRQUNoQiw4RkFBOEY7UUFDOUYsUUFBUTtRQUNSLGtCQUFrQjtRQUNsQixRQUFRO1FBQ1Isd0JBQXdCO1FBQ3hCLHlCQUF5QjtRQUN6QixzQkFBc0I7UUFDdEIsMkRBQTJEO1FBQzNELFFBQVE7UUFDUixJQUFJO1FBRUosZ0JBQWdCO1FBQ2hCLGlFQUFpRTtRQUNqRSxpQ0FBaUM7UUFDakMsaUJBQWlCO1FB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QixHQTZJckQ7a0JBN0lvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW5lbXlfU3RhdGUgfSBmcm9tIFwiLi4vLi4vRW5lbXkvRW5lbXlDb25maWdcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdHNNYW5hZ2VyLCBHYW1lRWZmZWN0SWQgfSBmcm9tIFwiLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IHsgRGFtYWdlVHlwZSB9IGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vTW9uc3RlclwiO1xyXG5pbXBvcnQgTW9uc3RlckJ1bGxldCBmcm9tIFwiLi4vTW9uc3RlckJ1bGxldFwiO1xyXG5pbXBvcnQgeyBLZXlGcmFtZURhdGEsIE1vbnN0ZXJBY3Rpb25OYW1lIH0gZnJvbSBcIi4uL01vbnN0ZXJEYXRhXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi4vTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXJOZXdOb3JtYWwgZnJvbSBcIi4uL01vbnN0ZXJOZXdOb3JtYWxcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5pdVNhTWFuIGV4dGVuZHMgTW9uc3Rlck5ld05vcm1hbCB7XHJcblxyXG4gICAgbGlnaHQ6Y2MuTm9kZT1udWxsO1xyXG4gICAgLy9oYWxvX2RhdGE6SGFsb0RhdGE9bnVsbDtcclxuICAgIGlzX2xvYWRlZDpib29sZWFuPWZhbHNlO1xyXG4gICAgYXR0YWNrX251bTpudW1iZXI9MDtcclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICAvL3N1cGVyLmFkZE1vbnN0ZXJOb3JtYWxJbml0ZWQodGhpcy5vbk1vbnN0ZXJOb3JtYWxJbml0ZWQpO1xyXG4gICAgICAgIC8vc3VwZXIuYWRkTW9uc3Rlck5vcm1hbERlYXRoKHRoaXMub25Nb25zdGVyTm9ybWFsRGVhdGgpO1xyXG4gICAgICAgIHRoaXMuYWRkTW9uc3Rlck5vcm1hbEF0dGFjayh0aGlzLm9uTW9uc3Rlck5vcm1hbEF0dGFjayk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXI2OV9uaXVzYW1hbl9hdHQpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyX3poaWxpYW9faGFsb19oaXQpOyAgICAgICAgXHJcbiAgICAgICAgLy8gR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXI2OV9uaXVzYW1hbl9za2lsbCwxLCgpPT57XHJcbiAgICAgICAgLy8gICAgIC8v5re75Yqg5YWJ546v54m55pWIXHJcbiAgICAgICAgLy8gICAgIGlmKCF0aGlzLmxpZ2h0KXtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMubGlnaHQ9R3JvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyNjlfbml1c2FtYW5fc2tpbGwsdGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICAgIHRoaXMuaXNfbG9hZGVkPXRydWU7XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gb25Nb25zdGVyTm9ybWFsSW5pdGVkICgpIHsgICAgICAgIFxyXG4gICAgLy8gICAgIHRoaXMuaGFsb19kYXRhPW5ldyBIYWxvRGF0YSgpO1xyXG4gICAgLy8gICAgIHRoaXMuaGFsb19kYXRhLmhhbG9faWQ9SGFsb0lkLk1vbnN0ZXI2OV9OaXVTYU1hbl9Ta2lsbF9IYWxvO1xyXG4gICAgLy8gICAgIHRoaXMuaGFsb19kYXRhLmhhbG9fdmFsdWU9WzUwMF07XHJcbiAgICAvLyAgICAgdGhpcy5oYWxvX2RhdGEuaGFsb19zb3VyY2VfdXVpZD10aGlzLnV1aWQ7XHJcbiAgICAvLyAgICAgaWYodGhpcy5pc19sb2FkZWQpe1xyXG4gICAgLy8gICAgICAgICBpZighdGhpcy5saWdodCl7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmxpZ2h0PUdyb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubW9uc3RlcjY5X25pdXNhbWFuX3NraWxsLHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuICAgIFxyXG5cclxuICAgIC8qKuaAqueJqeW8gOWni+aUu+WHu++8jOi/lOWbnuaYr+WQpuaIquiOt+acrOasoeaUu+WHuyAqL1xyXG4gICAgb25Nb25zdGVyTm9ybWFsQXR0YWNrICgpOmJvb2xlYW4ge1xyXG4gICAgICAgIC8v5Y+R5bCEXHJcbiAgICAgICAgdGhpcy5hdHRfamlzaHU9MDtcclxuICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLmF0dCk7XHJcbiAgICAgICAgbGV0IGRhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgIGRhdGEubmFtZT0nT25EYW1hZ2luZyc7XHJcbiAgICAgICAgZGF0YS5jYWxsYmFjaz0oKT0+e1xyXG4gICAgICAgICAgICBpZih0aGlzLmdldElzRGllKCk9PXRydWUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYXR0X2ppc2h1PTA7XHJcbiAgICAgICAgICAgIGxldCBhdHRQb3M9c3VwZXIuZ2V0QXR0UG9zKCk7XHJcbiAgICAgICAgICAgIGxldCBub2RlPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyNjlfbml1c2FtYW5fYXR0LGF0dFBvcyk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KE1vbnN0ZXJCdWxsZXQpLmluaXQodGhpcy5nZXRBdHREYXRhKERhbWFnZVR5cGUuTm9ybWFsLHRydWUpLHRoaXMubW9uc3Rlcl9mYXJfYXR0LHRoaXMubW9uc3Rlcl9mYXJfYXR0X2hpdCwxMjAwLE1hdGguUEkqMy8yKVxyXG4gICAgICAgICAgICB0aGlzLmF0dGFja19udW0rKztcclxuICAgICAgICAgICAgaWYodGhpcy5hdHRhY2tfbnVtPj10aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoMSkpe1xyXG4gICAgICAgICAgICAgICAgLy/mgaLlpI1cclxuICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrX251bT0wO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJzPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlcnNGb3JNb25zdGVyUG9zKC0xLHRoaXMubm9kZS5nZXRQb3NpdGlvbigpLHRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbFZhbHVlMigxKSk7XHJcbiAgICAgICAgICAgICAgICBpZihtb25zdGVycyl7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8bW9uc3RlcnMubGVuZ3RoOyBpKyspeyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJUcz1tb25zdGVyc1tpXS5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG1vbnN0ZXJUcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXNPaz1tb25zdGVyVHMuYmVIZWFsKHRoaXMuZ2V0TWF4SHAoKSp0aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxWYWx1ZTMoMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXNPayl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/nibnmlYhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubW9uc3Rlcl96aGlsaWFvX2hhbG9faGl0LG1vbnN0ZXJUcy5nZXRDZW50ZXJQb3MoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbigodGhpcy5nZXRBbmltYU5hbWUoTW9uc3RlckFjdGlvbk5hbWUuQXR0YWNrKSksZmFsc2UsZGF0YSwoKT0+e1xyXG4gICAgICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLm1vdmUpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgICAgICBpZih0aGlzLmF0dF93YWxsKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZV9kaXJlY3Rpb249TWF0aC5yYW5kb20oKT4wLjU/TWF0aC5QSTowO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfVxyXG5cclxuICAgIC8vIG9uTW9uc3Rlck5vcm1hbERlYXRoKCl7XHJcbiAgICAvLyAgICAgLy/ku6Xlj4rliKDpmaTmiYDmnInlhYnnjq/mlbDmja5cclxuICAgIC8vICAgICBpZih0aGlzLmxpZ2h0KXtcclxuICAgIC8vICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyNjlfbml1c2FtYW5fc2tpbGwsdGhpcy5saWdodCk7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubGlnaHQ9bnVsbDtcclxuICAgIC8vICAgICB9ICAgICAgICBcclxuICAgIC8vICAgICBsZXQgYWxsTW9uc3Rlcj1Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUuY2hpbGRyZW47XHJcbiAgICAvLyAgICAgbGV0IGxlbj1hbGxNb25zdGVyLmxlbmd0aDtcclxuICAgIC8vICAgICBpZihsZW48PTApXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIC8vICAgICB9ICAgICAgICAgICAgXHJcbiAgICAvLyAgICAgZm9yKGxldCBpPTA7aTxsZW47IGkrKylcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIGxldCBtb25zdGVyPWFsbE1vbnN0ZXJbaV07XHJcbiAgICAvLyAgICAgICAgIGxldCBtb25zdGVyVFM9bW9uc3Rlci5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAvLyAgICAgICAgIGlmKG1vbnN0ZXJUUyAmJiBtb25zdGVyVFMuZ2V0SXNDYW5DaGVjaygpKVxyXG4gICAgLy8gICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICAvL+enu+mZpOWFieeOr+aViOaenFxyXG4gICAgLy8gICAgICAgICAgICAgbW9uc3RlclRTLnN1YkhhbG8oSGFsb0lkLk1vbnN0ZXIzMF9CaWFuRnVfU2tpbGxfSGFsbyx0aGlzLnV1aWQpO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfSAgICBcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7XHJcbiAgICAvLyAgICAgaWYoKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUhPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpfHx0aGlzLmdldElzRGllKCkpXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICByZXR1cm47XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIHN1cGVyLnVwZGF0ZShkdCk7XHJcbiAgICAvLyAgICAgdGhpcy5jaGVja1NraWxsKCk7XHJcbiAgICAvLyAgICAgaWYodGhpcy5saWdodCl7XHJcbiAgICAvLyAgICAgICAgIHRoaXMubGlnaHQuc2V0UG9zaXRpb24odGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBjaGVja1NraWxsKCl7XHJcbiAgICAvLyAgICAgbGV0IGFsbE1vbnN0ZXI9TW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmNoaWxkcmVuO1xyXG4gICAgLy8gICAgIGxldCBsZW49YWxsTW9uc3Rlci5sZW5ndGg7XHJcbiAgICAvLyAgICAgaWYobGVuPD0wKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAvLyAgICAgfSAgICAgICAgICAgIFxyXG4gICAgLy8gICAgIGZvcihsZXQgaT0wO2k8bGVuOyBpKyspXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICBsZXQgbW9uc3Rlcj1hbGxNb25zdGVyW2ldO1xyXG4gICAgLy8gICAgICAgICBsZXQgbW9uc3RlclRTPW1vbnN0ZXIuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgLy8gICAgICAgICBpZihtb25zdGVyVFMgJiYgbW9uc3RlclRTLmdldElzQ2FuQ2hlY2soKSlcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgbGV0IGRpc3RhbmNlPXRoaXMuZ2V0Q2VudGVyUG9zKCkuc3ViKG1vbnN0ZXJUUy5nZXRDZW50ZXJQb3MoKSkubWFnKCk7XHJcbiAgICAvLyAgICAgICAgICAgICBpZihkaXN0YW5jZTw9MjAwKVxyXG4gICAgLy8gICAgICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8v5re75Yqg5YWJ546v5pWI5p6cICAgICAgICAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgICAgICAgICBtb25zdGVyVFMuYWRkSGFsbyh0aGlzLmhhbG9fZGF0YSk7XHJcbiAgICAvLyAgICAgICAgICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgICAgICAgICAvL+enu+mZpOWFieeOr+aViOaenFxyXG4gICAgLy8gICAgICAgICAgICAgICAgIG1vbnN0ZXJUUy5zdWJIYWxvKEhhbG9JZC5Nb25zdGVyNjlfTml1U2FNYW5fU2tpbGxfSGFsbyx0aGlzLnV1aWQpO1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG59XHJcbiJdfQ==