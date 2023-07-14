import { GameState } from "../../Constants";
import { GameEffectId, GameEffectsManager } from "../../Game/GameEffectsManager";
import GameManager from "../../GameManager";
import { GongJiData } from "../../Hero/Data/HeroData";
import GongJi from "../../Hero/Game/GongJi";

import Monster from "../../Monster/Monster";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Gully extends GongJi {

    is_end:boolean=false;
    game_effect_id:number=0;
    move_speed:number=700;
    move_direction:number=Math.PI/2;
    end_height:number=1200;
    destory_countdown:number=2;
    max_time:number=2;
    box_collision:cc.BoxCollider=null;

    onLoad(){
        this.box_collision=this.node.getComponent(cc.BoxCollider);
    }

    init(gameEffectId:GameEffectId,dir:number,gjData:GongJiData){
        super.initData(gjData);
        this.game_effect_id=gameEffectId;
        this.move_direction=dir;
        this.node.angle=180*dir/Math.PI-90;
        this.destory_countdown=this.max_time;
        this.node.height=0;
        this.is_end=false;
        this.node.opacity=255;
        let animation=this.node.getComponent(cc.Animation);
        animation.play('e30191');
        this.box_collision.enabled=true;
        animation.on(cc.Animation.EventType.FINISHED,()=>{
            this.box_collision.enabled=false;
            animation.off(cc.Animation.EventType.FINISHED);
            animation.play('e30191_2');            
            this.scheduleOnce(()=>{
                cc.tween(this.node).to(0.4,{opacity:64}).start();
                animation.play('e30191_3');
                animation.on(cc.Animation.EventType.FINISHED,()=>{
                    animation.off(cc.Animation.EventType.FINISHED);
                    this.destroySelf();
                });
            },1);
        });
    }

    onCollisionEnter(other:cc.Collider,self:cc.Collider) {
        let gm=GameManager.getInstance();        
        if(gm.cur_game_state==GameState.Game_Lose )
            return;
        let group=other.node.group;
        switch(group){
            case 'enemy':{                
                let monsterTs=other.node.getComponent(Monster);
                if(monsterTs.is_can_gully){
                    let data=monsterTs.beFlashInjured(this.gongji_data);
                    if(data.getDamageNum()>0){
                        monsterTs.is_can_gully=false;
                    }
                }
            }break;
        }
    }


    destroySelf()
    {
        GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id,this.node);
    }

}
