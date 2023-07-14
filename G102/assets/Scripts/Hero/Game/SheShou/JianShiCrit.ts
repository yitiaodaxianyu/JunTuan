
import { GameState } from "../../../Constants";
import { GameEffectId, GameEffectsManager } from "../../../Game/GameEffectsManager";
import GameManager from "../../../GameManager";
import Monster from "../../../Monster/Monster";
import { GongJiData } from "../../Data/HeroData";
import GongJi from "../GongJi";


const {ccclass, property} = cc._decorator;

@ccclass
export default class JianShiCrit extends GongJi {

    game_effect_id:GameEffectId=GameEffectId.sheshou_attack_ctrl_hit;

    init(id:GameEffectId,gjData:GongJiData){
        super.initData(gjData);
        this.game_effect_id=id;
    }

    ////--------------------------------------碰撞开始----------------------------------------------------
    onCollisionEnter(other:cc.Collider,self:cc.Collider) {
        let gm=GameManager.getInstance();        
        if(gm.cur_game_state==GameState.Game_Lose)
            return;
        let group=other.node.group;
        switch(group){
            case 'enemy':{
                let monsterTs=other.node.getComponent(Monster);
                if(monsterTs){
                    let data=monsterTs.beFlashInjured(this.gongji_data);
                    if(data.getDamageNum()>0){
                        //本次攻击有效
                        let node=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.sheshou_jianshi_att_hit,monsterTs.getJuJiPos());
                        //node.scale=monsterTs.getSheShouAttackScale();
                    }                  
                }
            }break;           
        }
    }
}
