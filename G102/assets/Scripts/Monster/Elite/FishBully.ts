import { GameState } from "../../Constants";
import { Enemy_State } from "../../Enemy/EnemyConfig";
import { GameEffectsManager, GameEffectId } from "../../Game/GameEffectsManager";
import GroundManager from "../../Game/GroundManager";
import GameManager from "../../GameManager";
import { BuffData } from "../../Hero/Game/BuffData";
import { BuffId, BuffType } from "../../Hero/Game/HeroConfig";
import Monster from "../Monster";
import { KeyFrameData } from "../MonsterData";
import MonsterManager from "../MonsterManager";
import MonsterNewNormal from "../MonsterNewNormal";


const {ccclass, property} = cc._decorator;

@ccclass
export default class FishBully extends MonsterNewNormal {

    light:cc.Node=null;
    load_num:number=0;

    protected onLoad(): void {
        super.onLoad();
        //GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster68_niujiangjun_skill,1);
        super.addMonsterNormalInited(this.onMonsterNormalInited);
    }

    onMonsterNormalInited () {       
        //this.skill_cold_down[0]=this.skill_data.getSkillValue1(1);
    }

    startSkill(){
        super.setEnemyState(Enemy_State.skill);
        let data=new KeyFrameData();
        data.name='Skill';
        data.callback=()=>{            
            //狂暴buff
            let ysData=new BuffData();
            ysData.buff_value=[this.skill_data.getSkillValue1(1)];
            ysData.buff_id=BuffId.Elite71_FishBully_JiaYiSu;
            ysData.buff_type=BuffType.MoveSpeedUp;
            ysData.remain_time=this.skill_data.getSkillValue3(1);
            super.addBuff(ysData);

            let gsData=new BuffData();
            gsData.buff_value=[this.skill_data.getSkillValue2(1)];
            gsData.buff_id=BuffId.Elite71_FishBully_JiaGongSu;
            gsData.buff_type=BuffType.AttSpeedUp;
            gsData.remain_time=this.skill_data.getSkillValue3(1);

            super.addBuff(gsData);
            this.skill_cold_down[0]=this.skill_data.getSkillColdDown(1);
        }
        this.skill_cold_down[0]=this.skill_data.getSkillColdDown(1);
        super.playSpinAnimaton("Side_Skill",false,data,()=>{
            this.startIdle();
            this.setEnemyState(Enemy_State.move);
        })
    }

    update (dt) {
        if((GameManager.getInstance().cur_game_state!=GameState.Game_Playing)||this.getIsDie())
        {
            return;
        }
        super.update(dt);
        this.checkSkill(dt);
    }

    checkSkill(dt:number){
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
                //buff
                this.startSkill();
            }
        }
    }
    
}
