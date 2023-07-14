import { Enemy_State } from "../../Enemy/EnemyConfig";
import { GameEffectsManager, GameEffectId } from "../../Game/GameEffectsManager";
import { DamageType } from "../../Hero/Game/HeroConfig";
import Monster from "../Monster";
import MonsterBullet from "../MonsterBullet";
import { KeyFrameData, MonsterActionName } from "../MonsterData";
import MonsterManager from "../MonsterManager";
import MonsterNewNormal from "../MonsterNewNormal";


const {ccclass, property} = cc._decorator;

@ccclass
export default class NiuSaMan extends MonsterNewNormal {

    light:cc.Node=null;
    //halo_data:HaloData=null;
    is_loaded:boolean=false;
    attack_num:number=0;
    
    protected onLoad(): void {
        super.onLoad();
        //super.addMonsterNormalInited(this.onMonsterNormalInited);
        //super.addMonsterNormalDeath(this.onMonsterNormalDeath);
        this.addMonsterNormalAttack(this.onMonsterNormalAttack);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster69_niusaman_att);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster_zhiliao_halo_hit);        
        // GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster69_niusaman_skill,1,()=>{
        //     //添加光环特效
        //     if(!this.light){
        //         this.light=GroundManager.getInstance().createGameEffectById(GameEffectId.monster69_niusaman_skill,this.node.getPosition());
        //     }
        //     this.is_loaded=true;
        // });
    }

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
    onMonsterNormalAttack ():boolean {
        //发射
        this.att_jishu=0;
        super.setEnemyState(Enemy_State.att);
        let data=new KeyFrameData();
        data.name='OnDamaging';
        data.callback=()=>{
            if(this.getIsDie()==true){
                return;
            }
            this.att_jishu=0;
            let attPos=super.getAttPos();
            let node=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.monster69_niusaman_att,attPos);
            node.getComponent(MonsterBullet).init(this.getAttData(DamageType.Normal,true),this.monster_far_att,this.monster_far_att_hit,1200,Math.PI*3/2)
            this.attack_num++;
            if(this.attack_num>=this.skill_data.getSkillValue1(1)){
                //恢复
                this.attack_num=0;
                let monsters=MonsterManager.getInstance().getMonstersForMonsterPos(-1,this.node.getPosition(),this.skill_data.getSkillValue2(1));
                if(monsters){
                    for(let i=0; i<monsters.length; i++){                            
                        let monsterTs=monsters[i].getComponent(Monster);
                        if(monsterTs){
                            let isOk=monsterTs.beHeal(this.getMaxHp()*this.skill_data.getSkillValue3(1));
                            if(isOk){
                                //特效
                                GameEffectsManager.getInstance().createGameEffectById(GameEffectId.monster_zhiliao_halo_hit,monsterTs.getCenterPos());
                            }
                        }
                    }
                }
            }
        }
        super.playSpinAnimaton((this.getAnimaName(MonsterActionName.Attack)),false,data,()=>{
            super.setEnemyState(Enemy_State.move);
            this.startIdle();
            if(this.att_wall){
                this.move_direction=Math.random()>0.5?Math.PI:0;
            }
        })
        return true
    }

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
