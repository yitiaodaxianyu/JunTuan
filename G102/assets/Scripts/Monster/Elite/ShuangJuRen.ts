
import { Enemy_State } from "../../Enemy/EnemyConfig";
import { GameEffectsManager, GameEffectId } from "../../Game/GameEffectsManager";
import GameManager from "../../GameManager";
import { HeroManager } from "../../Hero/Data/HeroManager";
import { BuffId, DamageType, Hero_Type } from "../../Hero/Game/HeroConfig";
import { KeyFrameData, MonsterActionName, StrengthType } from "../MonsterData";
import MonsterNewNormal from "../MonsterNewNormal";
import EliteAtt65 from "./EliteAtt65";


const {ccclass, property} = cc._decorator;

@ccclass
export default class ShuangJuRen extends MonsterNewNormal {

    protected onLoad(): void {
        super.onLoad();
        this.addMonsterNormalAttack(this.onMonsterNormalAttack);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.xuanyun,2);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster65_shuangjuren_att);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster65_shuangjuren_att_hit);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster65_shuangjuren_att_hit_crit);
    }

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
            let node=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.monster65_shuangjuren_att,attPos);
            let tss=node.getComponent(EliteAtt65);            
            //随机英雄
            let heroId=HeroManager.getInstance().getRandHeroId(GameManager.getInstance().cur_game_mode);
            if(heroId!=Hero_Type.NULL){
                let heroPos=GameManager.getInstance().all_hero.get(heroId).node.getPosition();
                let offsetPos=heroPos.sub(attPos)
                let pi2=Math.PI*2;
                let attDir=(Math.atan2(offsetPos.y,offsetPos.x)+pi2)%pi2;
                tss.setAttHero(heroId);
                tss.init(super.getAttData(DamageType.Normal,true,0),GameEffectId.monster65_shuangjuren_att,1000,attDir,1280,270);
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

}
