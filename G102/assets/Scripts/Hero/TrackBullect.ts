import { GameState } from "../Constants";
import GameManager from "../GameManager";
import { GongJiData } from "./Data/HeroData";
import Monster from "../Monster/Monster";
import { GameEffectId, GameEffectsManager } from "../Game/GameEffectsManager";
import GongJi from "./Game/GongJi";


const {ccclass, property} = cc._decorator;

@ccclass
export default class TrackBullect extends GongJi {

    //目标
    target_node:cc.Node=null;
    //目标位置
    target_pos:cc.Vec2=cc.v2(0,0);
    //移动速度
    move_speed:number=300;
    //移动方向
    move_direction:number=Math.PI/2;
    follow_callback:Function=null;
    offset_xx_angle:number=90;
    game_effect_id:number=0;    

    init (gameEffectId:GameEffectId,targetNode:cc.Node,speed:number,gjData:GongJiData,offsetAngle:number=90) {
        super.initData(gjData);
        this.game_effect_id=gameEffectId;
        this.target_node=targetNode;
        this.target_pos=targetNode.getComponent(Monster).getJuJiPos();
        let pi2=Math.PI*2;
        let offsetPos=this.target_pos.sub(this.node.getPosition());
        let dir=(Math.atan2(offsetPos.y,offsetPos.x)+pi2)%pi2;
        this.node.scale=1;
        this.setDirection(dir);
        this.move_speed=speed;
        this.offset_xx_angle=offsetAngle;
        this.node.stopAllActions();
    }

    addArriveListen(callback:Function){
        this.follow_callback=callback;
    }

    update(dt)
    {
        if(GameManager.getInstance().cur_game_state!=GameState.Game_Playing)
        {
            return;
        }
        //跟踪目标
        let sp=this.move_speed*dt;
        let disX=this.node.x;
        let disY=this.node.y;
        if(this.target_node)
        {
            let monsterTs=this.target_node.getComponent(Monster);
            this.target_pos=monsterTs.getJuJiPos();
            let offsetPos=this.target_pos.sub(this.node.getPosition());
            if(offsetPos.mag()<sp)
            {
                //中了
                if(this.follow_callback)
                {
                    this.follow_callback(monsterTs);
                }
            }else
            {
                let pi2=Math.PI*2;
                let dir=(Math.atan2(offsetPos.y,offsetPos.x)+pi2)%pi2;
                this.setDirection(dir);
                disX+=sp*Math.cos(this.move_direction);
                disY+=sp*Math.sin(this.move_direction);
            }                
        }else
        {
            disX+=sp*Math.cos(this.move_direction);
            disY+=sp*Math.sin(this.move_direction);
            let offsetPos=this.target_pos.sub(this.node.getPosition());
            if(offsetPos.mag()<sp)
            {
                //消失
                this.destroySelf();
            }
        }            
        this.node.x=disX;
        this.node.y=disY;
    }

    setDirection(dir:number)
    {
        this.move_direction=dir;
        this.node.angle=180*dir/Math.PI-this.offset_xx_angle;
    }

    destroySelf()
    {
        GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id,this.node);
    }

}
