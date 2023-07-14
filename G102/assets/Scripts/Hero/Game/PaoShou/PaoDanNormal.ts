
import Monster from "../../../Monster/Monster";
import { FeedBackType } from "../../../Monster/MonsterData";
import Bullect from "../Bullect";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PaoDanNormal extends Bullect {

    onLoad(): void {
        super.onLoad();
        super.addCollisionMonsterListen(this.onCollisionMonster);
    }
    
    ////--------------------------------------碰撞开始----------------------------------------------------
    onCollisionMonster(monsterTs:Monster) {
        if(monsterTs){
            let data=monsterTs.beFlashInjured(this.gongji_data);
            if(data.getDamageNum()>0){
                //本次攻击有效
                //GameEffectsManager.getInstance().createGameEffectById(GameEffectId.sheshou_jianshi_att_hit,this.getJianTouPos());
                this.is_att=true;
                this.destroySelf();
            }else{
                if(data.feedback_type!=FeedBackType.Die)
                    this.destroySelf();
            }
        }
    }
}
