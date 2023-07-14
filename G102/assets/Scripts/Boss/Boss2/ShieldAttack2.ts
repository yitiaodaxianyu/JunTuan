import { GameEffectsManager, GameEffectId } from "../../Game/GameEffectsManager";
import GameManager from "../../GameManager";
import { BuffData } from "../../Hero/Game/BuffData";
import { BuffId, BuffType, DamageType } from "../../Hero/Game/HeroConfig";
import { StrengthType } from "../../Monster/MonsterData";
import { SoundIndex } from "../../Sound/AudioConstants";
import MyTool from "../../Tools/MyTool";
import Wall from "../../Wall/Wall";
import { WallType } from "../../Wall/WallConfig";
import WallManager from "../../Wall/WallManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class ShieldAttack2 extends cc.Component {

    boss_pos:cc.Vec2=cc.v2(0,0);

    setBossPos(pos:cc.Vec2){
        this.boss_pos=pos;
    }
    
    /**帧动画回调 */
    onShieldAttack(){
        let walls=WallManager.getInstance().getAllWall();
        walls.forEach((wall:Wall,wallType:WallType)=>{
            //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
            if(wall.getWallMaxYY()<this.boss_pos.y){
                wall.beRealDamage(DamageType.Skill,StrengthType.Boss,wall.getMaxHp()*0.25)
            }
        })
        GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss2_normal_skill_hit,cc.v2(this.node.x,GameManager.getInstance().enemy_att_y));
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Boss2Skill);
        //击晕所有英雄
        GameManager.getInstance().all_hero.forEach((v,k)=>{
            let buffData=new BuffData();
            buffData.buff_id=BuffId.Monster_XuanYun;
            buffData.game_effect_id=GameEffectId.xuanyun;
            buffData.remain_time=1;
            buffData.buff_type=BuffType.Vertigo;
            v.addDeBuff(buffData);
        })
        MyTool.randomSceneShakeBig();
    }

}
