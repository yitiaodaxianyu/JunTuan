import { Enemy_State } from "../../Enemy/EnemyConfig";
import { GameEffectId, GameEffectsManager } from "../../Game/GameEffectsManager";
import { DamageType } from "../../Hero/Game/HeroConfig";
import { KeyFrameData, GongJiMode, MonsterActionName } from "../MonsterData";
import MonsterNewNormal from "../MonsterNewNormal";
import EliteAtt67 from "./EliteAtt67";


const {ccclass, property} = cc._decorator;

@ccclass
export default class ShuiJingYouLong extends MonsterNewNormal {

    protected onLoad(): void {
        super.onLoad();
        super.addMonsterNormalInited(this.onMonsterNormalInited);
        super.addMonsterNormalAttack(this.onMonsterNormalAttack);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster67_shuijingyoulong_att,1);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster67_shuijingyoulong_att_hit,1);
    }

    onMonsterNormalInited () {

    }


    /**怪物开始攻击，返回是否截获本次攻击 */
    onMonsterNormalAttack ():boolean {
        this.att_jishu=0;
        super.setEnemyState(Enemy_State.att);
        let data=new KeyFrameData();
        data.name='OnDamaging';
        data.callback=()=>{
            this.att_jishu=0;
            if(this.getIsDie()){
                return;
            }
            let attNode=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.monster67_shuijingyoulong_att,super.getAttPos());
            let attData=super.getAttData(DamageType.Normal,true);
            attData.zengshang_rate+=this.skill_data.getSkillValue1(1);
            attNode.getComponent(EliteAtt67).init(attData,GameEffectId.monster67_shuijingyoulong_att,1200,Math.PI*3/2,this.node.y);
        }
        super.playSpinAnimaton(this.getAnimaName(MonsterActionName.Attack),false,data,()=>{
            this.startIdle();
            super.setEnemyState(Enemy_State.move);
            if(this.att_wall){
                this.move_direction=Math.random()>0.5?Math.PI:0;
            }
        })
        return true;
    }
}
