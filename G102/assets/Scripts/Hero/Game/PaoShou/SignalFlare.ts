import { GameState } from "../../../Constants";
import { GameEffectId, GameEffectsManager } from "../../../Game/GameEffectsManager";
import GameManager from "../../../GameManager";



const {ccclass, property} = cc._decorator;

@ccclass
export default class SignalFlare extends cc.Component {

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
    end_callback:Function=null;
    /**是否到达目的地 */
    is_arrive:boolean=false;

    init(id:GameEffectId,speed:number,targetPos:cc.Vec2,endCallback:Function)
    {
        this.game_effect_id=id;
        this.move_speed=speed;
        this.target_pos=targetPos;        
        this.end_callback=endCallback;
        let offsetPos=targetPos.sub(this.node.getPosition());
        this.move_direction=Math.atan2(offsetPos.y,offsetPos.x);
        //距离
        let distance=offsetPos.mag();
        let sp=this.move_speed/GameManager.getInstance().getGameRate();
        this.spread_time=0.02*GameManager.getInstance().getGameRate();
        let jtTime=distance/sp/GameManager.getInstance().getGameRate();;
        this.node.scale=0.5;
        cc.tween(this.node).then(cc.spawn(cc.sequence(cc.scaleTo(jtTime/4,1.1),cc.scaleTo(jtTime*3/4,0.8)),cc.jumpTo(jtTime,targetPos,distance/2,1))).call(this.destroySelf,this).start();
        this.tuo_wei=cc.instantiate(this.tuowei)
        this.tuo_wei.parent=this.node.parent;
        this.node.zIndex=2;
        this.prev_pos=this.node.getPosition();
        let ms=this.tuo_wei.getComponent(cc.MotionStreak);
        ms.fadeTime=ms.fadeTime*GameManager.getInstance().getGameRate();

        this.spread_pos=new Array(4);
        let len=this.spread_pos.length;
        for(let i=0; i<len; i++)
        {
            this.spread_pos[i]=this.node.getPosition();
        }
        this.is_arrive=false;
    }

    destroySelf()
    {
        if(this.tuo_wei){
            cc.tween(this.tuo_wei).delay(this.tuo_wei.getComponent(cc.MotionStreak).fadeTime/(10*GameManager.getInstance().getGameRate()))
            .to(0.1,{opacity:0})
            .removeSelf().start();
        }
        this.spread_time=0.6;
        if(this.end_callback){
            this.end_callback();
        }
        //GameManager.getInstance().sound_manager.playSound(SoundIndex.boom2);
        this.node.zIndex=2;
        this.is_arrive=true;
        let miaozhun=GameEffectsManager.getInstance().createGameEffectForParent(GameEffectId.paoshou_dazhao_xinhaodan_miaozhun,this.node.getPosition(),this.node.parent);
        miaozhun.getComponent(sp.Skeleton).setAnimation(0,'Skill_MiaoZhun',false);
        miaozhun.zIndex=0;
        let end=GameEffectsManager.getInstance().createGameEffectForParent(GameEffectId.paoshou_dazhao_weiyan_end,this.node.getPosition(),this.node.parent);
        end.zIndex=1;
        end.opacity=255;
        end.getComponent(sp.Skeleton).setAnimation(0,'Skill_WeiYan',false);
        cc.tween(end).to(1.3,{opacity:88}).start();
        cc.tween(this.node).to(1.3,{opacity:168}).call(()=>{
            GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id,this.node);
            GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.paoshou_dazhao_xinhaodan_miaozhun,miaozhun);
            GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.paoshou_dazhao_weiyan_end,end);
        }).start();
    }

    setDirection(dir:number)
    {
        this.move_direction=dir;
        //this.node.angle=180*dir/Math.PI;
    }

    createSpread(){
        let node=GameEffectsManager.getInstance().createGameEffectForParent(GameEffectId.paoshou_dazhao_weiyan,this.spread_pos[this.getPosIndex()],this.node.parent);
        let anima=node.getComponent(cc.Animation);
        let state=anima.play();
        state.speed=1/GameManager.getInstance().getGameRate();
        anima.on(cc.Animation.EventType.FINISHED,()=>{
            GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.paoshou_dazhao_weiyan,node);
        },this);
        node.zIndex=3;
        node.angle=Math.random()*360;
        node.scale=Math.random()*0.5+0.8;
    }

    createEndSpread(){

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
        if(this.tuowei!=null){
            let gr=GameManager.getInstance().getGameRate();
            if(gr<1){
                gr=1;
            }
            //添加在子弹前面           
            let pos=this.node.getPosition(); 
            let offsetPos=pos.sub(this.prev_pos);
            let distance=offsetPos.mag()*4/gr;
            let dir=Math.atan2(offsetPos.y,offsetPos.x);
            let xx=pos.x+Math.cos(dir)*distance;
            let yy=pos.y+Math.sin(dir)*distance;
            this.tuo_wei.setPosition(cc.v2(xx,yy));
            this.prev_pos=this.node.getPosition();
            this.spread_time-=dt;
            this.update_locus_shadow();
            if(this.spread_time<=0){
                this.spread_time=0.02*GameManager.getInstance().getGameRate();
                if(this.is_arrive==false){
                    this.createSpread();
                }              
            }
        }        
    }

    update_locus_shadow()
    {
        if(this.is_arrive==false){
            //加入头部
            this.spread_pos.unshift(this.node.getPosition());
            //删除尾部
            this.spread_pos.pop();  
        }

    }
}
