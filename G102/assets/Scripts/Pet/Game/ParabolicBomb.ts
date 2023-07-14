
import GameManager from "../../GameManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import { GameEffectId, GameEffectsManager } from "../../Game/GameEffectsManager";
import GroundManager from "../../Game/GroundManager";
import { GongJiData } from "../../Hero/Data/HeroData";
import { GameState } from "../../Constants";
import MonsterManager from "../../Monster/MonsterManager";
import Monster from "../../Monster/Monster";
import GongJi from "../../Hero/Game/GongJi";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ParabolicBomb extends GongJi {
    
    @property({type:cc.Prefab})
    tuowei:cc.Prefab=null;

    game_effect_id:GameEffectId=GameEffectId.Null;
    move_speed:number=700;
    move_direction:number=Math.PI/2;

    bomb_size:number=100;
    //目标地点，到达后爆炸
    target_pos:cc.Vec2=null;

    tuo_wei:cc.Node=null;
    prev_pos:cc.Vec2=cc.v2(0,0);
    /**蔓延特效 */
    spread_time:number=0.2;
    /**蔓延位置 */
    spread_pos:cc.Vec2[]=[];

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
        //let dt=cc.director.getDeltaTime();
        let sp=this.move_speed/GameManager.getInstance().getGameRate();
        this.spread_time=0.02*GameManager.getInstance().getGameRate();
        //帧率比，适配高刷率设备
        //let frameRate=cc.director.getDeltaTime()
        let jtTime=distance/sp/GameManager.getInstance().getGameRate();
        this.node.scale=0.5;
        cc.tween(this.node).then(cc.spawn(cc.sequence(cc.scaleTo(jtTime/4,1.1),cc.scaleTo(jtTime*3/4,0.8)),cc.jumpTo(jtTime,targetPos,distance/2.5,1))).call(this.destroySelf,this).start();
        this.bomb_size=size;
        // let node=GroundManager.getInstance().createGameEffectById(GameEffectId.pet_attackt_hit_2,this.target_pos);
        // node.setContentSize(size);
        // cc.tween(node).delay(jtTime).call(()=>{
        //     GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.pet_attackt_hit_2,node);
        // }).start();

        this.tuo_wei=cc.instantiate(this.tuowei)
        this.tuo_wei.parent=this.node.parent;
        this.node.zIndex=1;
        this.prev_pos=this.node.getPosition();
        let ms=this.tuo_wei.getComponent(cc.MotionStreak);
        ms.fadeTime=ms.fadeTime*GameManager.getInstance().getGameRate();

        this.spread_pos=new Array(4);
        let len=this.spread_pos.length;
        for(let i=0; i<len; i++)
        {
            this.spread_pos[i]=this.node.getPosition();
        }
    }

    destroySelf()
    {
        if(this.tuo_wei){
            cc.tween(this.tuo_wei).delay(this.tuo_wei.getComponent(cc.MotionStreak).fadeTime/(10*GameManager.getInstance().getGameRate())).removeSelf().start();
        }
        if(this.game_effect_id==GameEffectId.pet_attackt_curve_1){
            this.createBomb1();
        }else if(this.game_effect_id==GameEffectId.pet_attackt_curve_3){
            this.createBomb2();
        }
        
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_boom2);
        GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id,this.node);
        this.tuo_wei=null;
    }

    setDirection(dir:number)
    {
        this.move_direction=dir;
        //this.node.angle=180*dir/Math.PI;
    }

    createBomb1(){
        let baozha=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.pet_attackt_hit_1,this.target_pos);
        GroundManager.getInstance().createGameEffectById(GameEffectId.pet_attackt_hit_2,this.target_pos);
        let monsters=MonsterManager.getInstance().getMonstersForCenterPos(-1,this.target_pos,80);
        if(monsters){
            for(let i=0; i<monsters.length; i++){
                let monsterTs=monsters[i].getComponent(Monster);
                monsterTs.beFlashInjured(this.gongji_data);
            }
        }
    }

    createBomb2(){
        let baozha=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.pet_attackt_hit_3,this.target_pos);
        GroundManager.getInstance().createGameEffectById(GameEffectId.pet_attackt_hit_4,this.target_pos);
        let monsters=MonsterManager.getInstance().getMonstersForCenterPos(-1,this.target_pos,80);
        if(monsters){
            for(let i=0; i<monsters.length; i++){
                let monsterTs=monsters[i].getComponent(Monster);
                monsterTs.beFlashInjured(this.gongji_data);
            }
        }
    }

    createSpread(){
        let weiyanId=GameEffectId.pet_attackt_tuowei_2;
        if(this.game_effect_id==GameEffectId.pet_attackt_curve_1){
            weiyanId=GameEffectId.pet_attackt_tuowei_2;
        }else if(this.game_effect_id==GameEffectId.pet_attackt_curve_3){
            weiyanId=GameEffectId.pet_attackt_tuowei_3;
        }
        let node=GameEffectsManager.getInstance().createGameEffectById(weiyanId,this.spread_pos[this.getPosIndex()])
        node.angle=Math.random()*360;
        node.scale=Math.random()*0.5+0.8;
    }
    

    private getPosIndex():number
    {
        let maxCL=this.spread_pos.length-1;
        let index=Math.floor(this.spread_pos.length/GameManager.getInstance().getGameRate());
        if(index>=maxCL)
        {
            index=maxCL;
        }
        return index;
    }

    update (dt) {
        if(GameManager.getInstance().cur_game_state!=GameState.Game_Playing)
        return;
        if(this.tuo_wei){
            let gr=GameManager.getInstance().getGameRate();
            if(gr<1){
                gr=1;
            }
            let pos=this.node.getPosition();
            //添加在子弹前面            
            let offsetPos=pos.sub(this.prev_pos);
            let distance=offsetPos.mag()*4/gr;
            let dir=Math.atan2(offsetPos.y,offsetPos.x);
            let xx=pos.x+Math.cos(dir)*distance;
            let yy=pos.y+Math.sin(dir)*distance;
            this.tuo_wei.setPosition(cc.v2(xx,yy));
            //this.tuo_wei.setPosition(this.node.position);
            this.prev_pos=this.node.getPosition();
            this.spread_time-=dt;
            this.update_locus_shadow();
            if(this.spread_time<=0){
                this.spread_time=0.02*GameManager.getInstance().getGameRate();
                this.createSpread();
            }
            
        }
    }

    update_locus_shadow()
    {
        //加入头部
        this.spread_pos.unshift(this.node.getPosition());
        //删除尾部
        this.spread_pos.pop();  
    }
}
