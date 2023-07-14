import { GameEffectId, GameEffectsManager } from "../../Game/GameEffectsManager";
import GameManager from "../../GameManager";
import { BuffData } from "../../Hero/Game/BuffData";
import { BuffId } from "../../Hero/Game/HeroConfig";
import { SoundIndex } from "../../Sound/AudioConstants";
import MyTool from "../../Tools/MyTool";
import Wall from "../../Wall/Wall";
import { WallType } from "../../Wall/WallConfig";
import BossBullet from "../BossBullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BossAtt3 extends BossBullet {

    @property()
    bullect_type:number=0;

    remain_time:number=0;
    buff_value:number=0;

    onLoad(): void {
        super.addCollisionWallListen(this.onCollisionWall);
    }
    
    setBuffData(remainTime:number,value:number){
        this.remain_time=remainTime;
        this.buff_value=value;
    }

    ////--------------------------------------碰撞开始----------------------------------------------------
    onCollisionWall(wall:Wall) {
        switch(this.bullect_type){
            case 0:{
                if(wall){
                    let data=wall.beInjured(this.monster_att_data)
                    super.destroySelf();
                    if(data.getDamageNum()>0){
                        GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss3_normal_attack_hit,this.node.getPosition());
                        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Boss3Skill1mingzhong);
                    }
                }
            }break;
            case 1:{
                if(wall){
                    let data=wall.beInjured(this.monster_att_data)
                    super.destroySelf();
                    if(data.getDamageNum()>0){
                        GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss3_skill_1_hit,this.node.getPosition());
                        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Boss3Skill1mingzhong);
                    }
                    if(wall.getWallType()==WallType.Main){
                        MyTool.randomSceneShakeBig();
                        //减攻速
                        GameManager.getInstance().all_hero.forEach((v,k)=>{
                            let buffData=new BuffData();
                            buffData.buff_id=BuffId.Boss3_JIAN_GongSu;
                            buffData.remain_time=this.remain_time;
                            buffData.buff_value=[this.buff_value];
                            v.addDeBuff(buffData);
                        })
                    }
                }
            }break;
        }        
    }
}
