
import { Enemy_DeBuff_Type } from "../../../Enemy/EnemyConfig";
import { GameEffectsManager, GameEffectId } from "../../../Game/GameEffectsManager";
import GameManager from "../../../GameManager";
import Monster from "../../../Monster/Monster";
import { SoundIndex } from "../../../Sound/AudioConstants";
import { BuffData } from "../BuffData";
import Bullect from "../Bullect";
import { BuffId, BuffType, SkillType } from "../HeroConfig";


const {ccclass, property} = cc._decorator;

@ccclass
export default class SuperManTeng extends Bullect {

    onLoad(): void {
        super.onLoad();
        super.addCollisionMonsterListen(this.onCollisionMonster);
        this.addInitFinishedListen(this.onInitFinished);
    }        

    onInitFinished(){
        this.move_speed=100;
        this.acceleration=10; 
    }
    
    onCollisionMonster(monsterTs:Monster) {
        if(monsterTs){            
            let data=monsterTs.beFlashInjured(this.gongji_data);
            if(data.getDamageNum()>0){
                GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_FashiSkiill2);
               let node=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.deluyi_active_skill_hit,monsterTs.node.getPosition());
               node.getComponent(cc.Animation).play();
                let buffData=new BuffData();
                buffData.buff_id=BuffId.Hero_XuanYun;
                buffData.buff_type=BuffType.Vertigo;
                buffData.remain_time=this.gongji_data.hero_data.getSkillValue2(SkillType.Active);
                buffData.game_effect_id=GameEffectId.xuanyun;
                monsterTs.addDeBuff(buffData,this.gongji_data);
                cc.tween(node).delay(buffData.remain_time).call(()=>{
                    GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.deluyi_active_skill_hit,node);
                }).start();
                //大招命中,专武debuff
                let ex1=this.gongji_data.hero_data.ExclusiveWeaponSkillValue_1;
                if(ex1&&ex1>0){
                    let debuffData=new BuffData();
                    debuffData.buff_id=BuffId.Hero_DeLuYi_Ex;
                    debuffData.buff_type=BuffType.Normal;
                    debuffData.remain_time=5;
                    monsterTs.addDeBuff(debuffData,this.gongji_data);
                }                
            }
            this.is_att=false;
        }
    }
}
