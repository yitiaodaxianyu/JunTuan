"use strict";
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