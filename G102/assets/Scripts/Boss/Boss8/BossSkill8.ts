import { GameEffectsManager, GameEffectId } from "../../Game/GameEffectsManager";
import GameManager from "../../GameManager";
import { BuffData } from "../../Hero/Game/BuffData";
import { BuffId, BuffType } from "../../Hero/Game/HeroConfig";
import MonsterBullet from "../../Monster/MonsterBullet";
import { SoundIndex } from "../../Sound/AudioConstants";
import Wall from "../../Wall/Wall";
import { WallType } from "../../Wall/WallConfig";



const {ccclass, property} = cc._decorator;

@ccclass
export default class BossSkill8 extends MonsterBullet {

   
    protected onLoad(): void {
        this.addCollisionWallListen(this.onCollisionWall);
    }
    
    ////--------------------------------------碰撞开始----------------------------------------------------
    onCollisionWall(wall:Wall):boolean {
        this.destroySelf();
        if(wall){
            GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss8_skill_bullect_hit,this.node.getPosition());
            GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Boss1Attack);                
            //伤害黏液
            let damageBuffData=new BuffData();
            damageBuffData.buff_id=BuffId.Boss8_Skill_2_shanghai;                    
            damageBuffData.remain_time=this.monster_att_data.monster_ts.skill_data.getSkillValue3(2);
            damageBuffData.buff_type=BuffType.Normal;
            damageBuffData.damage_jiange_time=1;
            damageBuffData.buff_value=[this.monster_att_data.monster_ts.skill_data.getSkillValue1(2)];
            wall.addDeBuff(damageBuffData,this.monster_att_data);
            if(wall.getWallType()==WallType.Main){                    
                let attValue=this.monster_att_data.monster_ts.skill_data.getSkillValue2(2);
                GameManager.getInstance().all_hero.forEach((v,k)=>{
                    //击晕所有英雄
                    let yunBuffData=new BuffData();
                    yunBuffData.buff_id=BuffId.Monster_XuanYun;
                    yunBuffData.game_effect_id=GameEffectId.xuanyun;
                    yunBuffData.remain_time=1;
                    yunBuffData.buff_type=BuffType.Vertigo;
                    v.addDeBuff(yunBuffData);
                    //攻击力减少
                    let attBuffData=new BuffData();
                    attBuffData.buff_id=BuffId.Boss8_Skill_2_attack;
                    attBuffData.buff_value=[attValue];
                    attBuffData.remain_time=damageBuffData.remain_time;
                    attBuffData.buff_type=BuffType.Normal;
                    v.addDeBuff(attBuffData);
                })
            }
            return true
        }
    }
    
    
    
}
