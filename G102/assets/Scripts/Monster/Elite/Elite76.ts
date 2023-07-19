import { GameState } from "../../Constants";
import { GameEffectId, GameEffectsManager } from "../../Game/GameEffectsManager";
import GroundManager from "../../Game/GroundManager";
import GameManager from "../../GameManager";
import { HaloData, HaloId } from "../../Hero/Game/HeroConfig";
import Monster from "../Monster";
import MonsterManager from "../MonsterManager";
import MonsterNewNormal from "../MonsterNewNormal";



const {ccclass, property} = cc._decorator;

@ccclass
export default class Elite76 extends MonsterNewNormal {

    light:cc.Node=null;
    halo_data:HaloData=null;
    is_loaded:boolean=false;
    halo_radius:number=200;

    protected onLoad(): void {
        super.onLoad();
        super.addMonsterNormalInited(this.onMonsterNormalInited);
        super.addMonsterNormalDeath(this.onMonsterNormalDeath);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster76_attack_guanghuan,1,()=>{
            //添加光环特效
            if(!this.light){
                this.light=GroundManager.getInstance().createGameEffectById(GameEffectId.monster76_attack_guanghuan,this.node.getPosition());
            }
            this.is_loaded=true;
        });
    }

    onMonsterNormalInited () {
        this.halo_radius=this.skill_data.getSkillValue1(1);
        this.halo_data=new HaloData();
        this.halo_data.halo_id=HaloId.Monster76_JianDuZhe_Skill_Halo;
        this.halo_data.halo_value=[this.skill_data.getSkillValue2(1)];
        this.halo_data.halo_source_uuid=this.uuid;
        if(this.is_loaded){
            if(!this.light){
                this.light=GroundManager.getInstance().createGameEffectById(GameEffectId.monster76_attack_guanghuan,this.node.getPosition());
            }
        }
    }

    onMonsterNormalDeath(){
        //以及删除所有光环数据
        if(this.light){
            GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.monster76_attack_guanghuan,this.light);
            this.light=null;
        }        
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
                //移除光环效果
                monsterTS.subHalo(HaloId.Monster76_JianDuZhe_Skill_Halo,this.uuid);
            }
        }
    }    

    update (dt) {
        if((GameManager.getInstance().cur_game_state!=GameState.Game_Playing)||this.getIsDie())
        {
            return;
        }
        super.update(dt);
        this.checkSkill();
        if(this.light){
            this.light.setPosition(this.node.getPosition());
        }
    }

    checkSkill(){
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
                let distance=this.getCenterPos().sub(monsterTS.getCenterPos()).mag();
                if(distance<=200)
                {
                    //添加光环效果                    
                    monsterTS.addHalo(this.halo_data);
                }else{
                    //移除光环效果
                    monsterTS.subHalo(HaloId.Monster76_JianDuZhe_Skill_Halo,this.uuid);
                }
            }
        }
    }
}
