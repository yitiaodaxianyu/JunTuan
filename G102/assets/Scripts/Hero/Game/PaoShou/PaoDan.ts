
import { PaoDan_Type } from "../HeroConfig";
import GongJi from "../GongJi";
import PaoDanBaoZha from "./PaoDanBaoZha";
import { GameEffectId, GameEffectsManager } from "../../../Game/GameEffectsManager";
import GameManager from "../../../GameManager";
import { SoundIndex } from "../../../Sound/AudioConstants";
import { GongJiData } from "../../Data/HeroData";
import MyTool from "../../../Tools/MyTool";
import MonsterManager from "../../../Monster/MonsterManager";
import Monster from "../../../Monster/Monster";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PaoDan extends GongJi {

    @property({type:cc.Enum(PaoDan_Type)})
    paodan_type:PaoDan_Type=PaoDan_Type.skill;

    game_effect_id:GameEffectId=GameEffectId.Null;
    move_speed:number=700;
    move_direction:number=Math.PI/2;

    bomb_size:number=100;
    //目标地点，到达后爆炸
    target_pos:cc.Vec2=null;

    init(id:GameEffectId,speed:number,targetPos:cc.Vec2,gjData:GongJiData,size:number)
    {
        super.initData(gjData);
        this.game_effect_id=id;
        this.move_speed=speed;
        this.target_pos=targetPos;        

        let offsetPos=targetPos.sub(this.node.getPosition());
        this.move_direction=Math.atan2(offsetPos.y,offsetPos.x);
        //距离
        let distance=offsetPos.mag();
        let sp=this.move_speed/GameManager.getInstance().getGameRate();
        let jtTime=distance/sp/GameManager.getInstance().getGameRate();;
        this.node.scale=0.5;
        cc.tween(this.node).then(cc.spawn(cc.sequence(cc.scaleTo(jtTime/4,1.1),cc.scaleTo(jtTime*3/4,0.8)),cc.jumpTo(jtTime,targetPos,distance/2.5,1))).call(this.destroySelf,this).start();
        this.bomb_size=size;
        // let node=GroundManager.getInstance().createGameEffectById(GameEffectId.paoshou_paodan_luodi,this.target_pos);
        // node.setContentSize(size);
        // cc.tween(node).delay(jtTime*GameManager.getInstance().getGameRate()).call(()=>{
        //     GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.paoshou_paodan_luodi,node);
        // }).start();
    }

    destroySelf()
    {
        //销毁后爆炸
        this.createBomb();
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_boom2);
        GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id,this.node);
    }
    /**每次攻击会对半径{参数1}范围内造成{参数2}%伤害 */
    createBomb(){
        let baozha=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.paoshou_skill_hit,this.target_pos);
        //baozha.angle=MyTool.radianToAngle(this.move_direction)-90;
        //MyTool.randomSceneShake(-5,5,0.02,6);
        let monsters=MonsterManager.getInstance().getMonstersForCenterPos(-1,this.node.getPosition(),this.bomb_size);
        if(monsters){            
            for(let i=0; i<monsters.length; i++){
                let monsterTs=monsters[i].getComponent(Monster);
                monsterTs.beFlashInjured(this.gongji_data);
                
            }
        }
        //baozha.getComponent(PaoDanBaoZha).init(GameEffectId.paoshou_paodan_hit,this.paodan_type,this.gongji_data);

        baozha.scale=this.bomb_size/100;
        //baozha.scale=1;
    }
}
