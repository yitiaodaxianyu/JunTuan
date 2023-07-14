import { GameState } from "../../../Constants";
import { GameEffectId, GameEffectsManager } from "../../../Game/GameEffectsManager";
import SkyManager from "../../../Game/SkyManager";
import GameManager from "../../../GameManager";
import Monster from "../../../Monster/Monster";
import MonsterManager from "../../../Monster/MonsterManager";
import { BuffData } from "../BuffData";
import { BuffId, BuffType, DamageType, SkillType } from "../HeroConfig";


const {ccclass, property} = cc._decorator;

@ccclass
export default class KuangSha extends cc.Component {

    remain_time:number=0;
    value:number=0;

    init(remainTime:number,jiansuValue:number){
        this.remain_time=remainTime;
        this.value=jiansuValue;
    }

    destroySelf(){
        GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.a_nu_bi_si_active_skill_wind,this.node);
    }

    onAddBuff(){
        let allMonsterS=MonsterManager.getInstance().node.children;
        let len=allMonsterS.length;    
        for(let i=0;i<len; i++)
        {
            let monster=allMonsterS[i];
            let monsterTS=monster.getComponent(Monster);
            if(monsterTS&&monsterTS.getIsCanCheck())
            {
                let buffData=new BuffData();
                buffData.buff_id=BuffId.Hero_ANuBiSi_Active_Skill_JianSu;
                buffData.buff_type=BuffType.Slowdown;
                buffData.buff_value=[this.value];
                buffData.remain_time=1.5;
                monsterTS.addDeBuff(buffData,null);
            }
        }
        for(let i=0; i<5; i++){
            this.scheduleOnce(()=>{
                let xx=-375+150*i+Math.random()*40-20;
                let node=GameEffectsManager.getInstance().createGameEffectForParent(GameEffectId.a_nu_bi_si_active_skill_line,cc.v2(xx,0),this.node);
                cc.tween(node).by(0.48,{y:-cc.winSize.height}).call(()=>{
                    GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.a_nu_bi_si_active_skill_line,node);
                }).start();
                if(Math.random()<0.3){
                    let quan=GameEffectsManager.getInstance().createGameEffectForParent(GameEffectId.a_nu_bi_si_active_skill_ring,cc.v2(Math.random()*600-300,Math.random()*1000-500),this.node);
                    quan.scaleX=Math.random()<0.5?-1:1;
                }
            },Math.random()*0.4);
        }              
    }

    update (dt:number) {
        if(GameManager.getInstance().cur_game_state==GameState.Game_Playing){
            if(this.remain_time>0){
                this.remain_time-=dt;
                if(this.remain_time<=0){
                    this.destroySelf();
                }
            }else{
                this.destroySelf();
            }
        }
    }
}
