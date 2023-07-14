import { GameState } from "../../Constants";
import { GameEffectsManager, GameEffectId } from "../../Game/GameEffectsManager";
import GroundManager from "../../Game/GroundManager";
import GameManager from "../../GameManager";
import { HaloData, HaloId } from "../../Hero/Game/HeroConfig";
import Monster from "../Monster";
import MonsterManager from "../MonsterManager";
import MonsterNewNormal from "../MonsterNewNormal";


const {ccclass, property} = cc._decorator;

@ccclass
export default class XueGuai extends MonsterNewNormal {

    light:cc.Node=null;
    is_loaded:boolean=false;
    load_num:number=0;

    protected onLoad(): void {
        super.onLoad();
        super.addMonsterNormalInited(this.onMonsterNormalInited);
        super.addMonsterNormalDeath(this.onMonsterNormalDeath);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster_zhiliao_halo,1,()=>{
            //添加光环特效
            if(!this.light){
                this.light=GroundManager.getInstance().createGameEffectById(GameEffectId.monster_zhiliao_halo,this.node.getPosition());
            }
            this.load_num++;
            if(this.load_num>=2){
                this.is_loaded=true;
            }
        });
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster_zhiliao_halo_hit,8,()=>{
            this.load_num++;
            if(this.load_num>=2){
                this.is_loaded=true;
            }
        });

        
    }

    onMonsterNormalInited () {
        if(this.is_loaded){
            if(!this.light){
                this.light=GroundManager.getInstance().createGameEffectById(GameEffectId.monster_zhiliao_halo,this.node.getPosition());
            }
        }
        this.skill_cold_down[0]=this.skill_data.getSkillValue1(1);
    }

    onMonsterNormalDeath(){
        //以及删除所有光环数据
        if(this.light){
            GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.monster_zhiliao_halo,this.light);
            this.light=null;
        }
    }

    update (dt) {
        if((GameManager.getInstance().cur_game_state!=GameState.Game_Playing)||this.getIsDie())
        {
            return;
        }
        super.update(dt);
        this.checkSkill(dt);
        if(this.light){
            this.light.setPosition(this.getCenterPos());
        }
    }

    checkSkill(dt:number){
        if(this.is_loaded==true){
            for(let i=0; i<this.skill_cold_down.length; i++){
                let isCanSkill=false;
                if(this.skill_cold_down[i]>0){
                    this.skill_cold_down[i]-=dt;
                    if(this.skill_cold_down[i]<=0){
                        isCanSkill=true;
                    }
                }else{
                    isCanSkill=true;
                }
                if(isCanSkill){
                    this.skill_cold_down[i]=this.skill_data.getSkillValue1(1);
                    let allMonster=MonsterManager.getInstance().node.children;
                    let len=allMonster.length;
                    if(len<=0)
                    {
                        return null;
                    }            
                    for(let i=0;i<len; i++)
                    {
                        let monster=allMonster[i];
                        let monsterTS=monster.getComponent(Monster);
                        if(monsterTS && monsterTS.getIsCanCheck())
                        {
                            let pos=monsterTS.getCenterPos();
                            let distance=this.getCenterPos().sub(pos).mag();
                            if(distance<=200)
                            {
                                //恢复生命值
                                let isOk=monsterTS.beHeal(this.getMaxHp()*this.skill_data.getSkillValue2(1));
                                if(isOk){
                                    //特效
                                    GameEffectsManager.getInstance().createGameEffectById(GameEffectId.monster_zhiliao_halo_hit,pos);
                                }                                
                            }
                        }
                    }
                }
            }
        }                
    }
    
}
