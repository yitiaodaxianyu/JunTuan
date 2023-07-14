import { GameState } from "../../Constants";
import { GameEffectsManager, GameEffectId } from "../../Game/GameEffectsManager";
import GameManager from "../../GameManager";
import { BuffData } from "../../Hero/Game/BuffData";
import { BuffId, BuffType } from "../../Hero/Game/HeroConfig";
import Monster from "../../Monster/Monster";
import { MonsterAttData } from "../../Monster/MonsterData";
import MonsterManager from "../../Monster/MonsterManager";
import MyTool from "../../Tools/MyTool";
import WallManager from "../../Wall/WallManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class BossSkill7 extends cc.Component {

    monster_att_data:MonsterAttData=null;
    target_yy:number=0;
    move_speed:number=2000;
    acc_speed:number=300;
    cur_acc_speed:number=0;
    is_destory:boolean=false;
    is_xuanyun:boolean=false;
    max_scale_yy:number=0;
    max_distance:number=0;

    init(attData:MonsterAttData,targetYY:number,speed:number,accSpeed:number,isXuanYun:boolean){
        this.cur_acc_speed=0;
        this.move_speed=speed;
        this.acc_speed=accSpeed;
        this.target_yy=targetYY;
        this.monster_att_data=attData;
        this.is_xuanyun=isXuanYun;
        this.node.scale=1;
        this.max_scale_yy=WallManager.getInstance().getMainWall().getWallRect().center.y;
        this.max_distance=Math.abs(WallManager.getInstance().getMainWall().getWallRect().center.y-this.node.y);
        this.is_destory=false;
    }

    destroySelf() {
        this.is_destory=true;        
        this.createBomb();
        GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.boss7_skill_bullect,this.node);
    }

    createBomb(){
        GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss7_skill_bullect_hit,cc.v2(this.node.x,this.target_yy));
       
        if(this.is_xuanyun){
            //击晕所有英雄
            GameManager.getInstance().all_hero.forEach((v,k)=>{
                let buffData=new BuffData();
                buffData.buff_id=BuffId.Monster_XuanYun;
                buffData.game_effect_id=GameEffectId.xuanyun;
                buffData.remain_time=3;
                buffData.buff_type=BuffType.Vertigo;
                v.addDeBuff(buffData);
            })
            this.monster_att_data.is_big=true;
        }else{
            this.monster_att_data.is_big=false;
        }
        WallManager.getInstance().getMainWall().beInjured(this.monster_att_data);
    }
    
    protected update(dt: number): void {
        if(GameManager.getInstance().cur_game_state==GameState.Game_Playing){
            if(this.is_destory==false){
                this.cur_acc_speed+=this.acc_speed*dt;
                let finalSpeed=this.move_speed*dt+this.cur_acc_speed;
                this.node.y-=finalSpeed;
                this.node.scale=1+(1-Math.abs(this.max_scale_yy-this.node.y)/this.max_distance)
                if(this.node.y<=this.target_yy){
                    this.destroySelf();
                }
            }
        }
    }

    
}
