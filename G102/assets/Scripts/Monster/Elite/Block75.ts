import { GameState } from "../../Constants";
import GameManager from "../../GameManager";
import GongJi from "../../Hero/Game/GongJi";
import Monster from "../Monster";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Block75 extends cc.CircleCollider {
    
    @property(Monster)
    monster_ts:Monster=null;


    ////--------------------------------------碰撞开始----------------------------------------------------
    onCollisionEnter(other:cc.Collider,self:cc.Collider) {
        let gm=GameManager.getInstance();
        if(gm.cur_game_state!=GameState.Game_Playing)
            return;
        let group=other.node.group;
        switch(group){
            case 'gongji':{
                let gjData=other.node.getComponent(GongJi);
                //本次伤害直接减伤
                if(gjData){
                    this.monster_ts.jianshang_rate+=this.monster_ts.skill_data.getSkillValue1(1);
                    this.monster_ts.beFlashInjured(gjData.gongji_data);
                    this.monster_ts.jianshang_rate-=this.monster_ts.skill_data.getSkillValue1(1);
                    //直接销毁
                    gjData.node.removeFromParent();
                }                
            }break;
        }
    }

}
