import { GameState } from "../../../Constants";
import GameManager from "../../../GameManager";
import Monster from "../../../Monster/Monster";
import { KeyFrameData } from "../../../Monster/MonsterData";
import MonsterManager from "../../../Monster/MonsterManager";
import { SoundIndex } from "../../../Sound/AudioConstants";
import { GongJiData } from "../../Data/HeroData";
import GongJi from "../GongJi";
import { BearAnimaName, BearAttackDistance, BearAttackSpeed, BearMoveSpeed, BearState } from "./BearConfig";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Bear extends GongJi {
    @property(sp.Skeleton)
    private spine: sp.Skeleton=null;
    /**熊的状态 */
    private cur_state:BearState=BearState.born;
    /**当前的移动速度 */
    private cur_move_speed: number=80;
    /**当前的移动目标地点，可能会由玩家点击屏幕而设置 */
    private move_target_pos: cc.Vec2=null;
    /**当前的攻击目标 */
    private att_target: cc.Node=null;
    /**当前的移动方向 */
    private move_direction:number=Math.PI*3/2;
    /** 攻击计数*/
    private gongji_jishu:number=0;
    /** 攻击间隔*/
    private gongji_jiange:number=1;
    /** 基础间隔 */
    private base_jiange:number=0;
    /**攻击距离 */
    private gongji_juli:number=100;
    /**攻击坐标 */
    private gongji_pos:cc.Vec2=cc.v2(0,0);
    /**寻敌范围 */
    private find_monster_fanwei:number=1000;
    /**指定缩放 */
    private setup_scale:number=1;
    /**当前的左右面向 */
    private cur_is_left:boolean=false;
    /**城墙的Y */
    wall_yy:number=0;
    /**熊剩余的时间 */
    remain_num:number=1;   

    destory_callback:Function=null;
    bear_id:number=0;
    aoe_fanwei:number=0;

    onLoad(){
        let gongjiNode=this.node.getChildByName('gongji');
        this.gongji_pos=gongjiNode.getPosition();

        gongjiNode.removeFromParent();
    }

    init(gjData:GongJiData,dt:number,bearId:number,aoe:number=0){
        if(!this.spine){
            this.spine=this.node.getComponent(sp.Skeleton);
        }
        this.initData(gjData);
        this.bear_id=bearId;
        this.gongji_jiange=this.base_jiange=1/BearAttackSpeed;
        this.cur_move_speed=BearMoveSpeed;
        this.gongji_juli=BearAttackDistance;
        this.find_monster_fanwei=gjData.hero_data.gongji_fanwei;
        this.aoe_fanwei=aoe;
        this.setBearState(BearState.born,false,false,null,this.checkIdle.bind(this));
        this.wall_yy=GameManager.getInstance().enemy_att_y;
        this.node.scale=this.setup_scale;
        this.remain_num=dt;
        this.node.zIndex=(Math.round(8000-this.node.y*10));
        
        //this.gongji_jiange/=1.5;
    }

    addDestoryListen(callBack:Function){
        this.destory_callback=callBack;
    }

    setBearState(state:BearState,isLeft:boolean=true,isLoop:boolean=false,data?:KeyFrameData[],endCallback?:Function){
        this.cur_state=state;
        this.cur_is_left=isLeft;
        this.node.scaleX=this.cur_is_left?-this.setup_scale:this.setup_scale;        
        this.playSpineAnimation(this.getAnimaName(),isLoop,data,endCallback);
    }

    getGongJiPos():cc.Vec2{
        return cc.v2(this.node.x+this.gongji_pos.x*this.node.scaleX,this.node.y+this.gongji_pos.y*this.node.scaleY);
    }

    getAnimaName():string{
        let name=BearAnimaName.Idle;
        switch(this.cur_state){
            case BearState.born:{
                name=BearAnimaName.Start;
            }break;
            case BearState.idle:{
                name=BearAnimaName.Idle;
            }break;
            case BearState.move:{
                if(this.att_target){
                    //判断距离
                    let distance=(this.att_target.getPosition().sub(this.getGongJiPos()).mag());
                    if(distance>=this.cur_move_speed){
                        name=BearAnimaName.Run;
                    }else{
                        name=BearAnimaName.Walk;
                    }
                }else{
                    name=BearAnimaName.Walk;
                }
                
            }break;
            case BearState.attack:{
                name=BearAnimaName.Attack;
            }break;
        }
        return name;
    }

    /**
     * 播放一个骨骼动画
     * @param name 骨骼动画名称
     * @param isLoop 是否循环
     * @param data 是否监听关键帧，关键帧数据包含关键帧名称，监听到关键帧后的回调
     * @param endCallback 播放结束后的回调
     */
     playSpineAnimation(name:string,isLoop:boolean=false,data?:KeyFrameData[],endCallback?:Function){     
        if(isLoop&&name==this.spine.animation){
            return;
        }
        let anima=this.spine.setAnimation(0,name,isLoop);
        if(data){
            this.spine.setTrackEventListener(anima,(entry: sp.spine.TrackEntry, event) =>{
                for(let i=0; i<data.length; i++){
                    if(event.data.name==data[i].name){
                        data[i].callback();
                    }
                }
            })
        }
        if(endCallback){
            this.spine.setTrackCompleteListener(anima,(entry: sp.spine.TrackEntry, event) =>{
                anima.listener=null;                
                endCallback();
            })
        }
    }

    startAttack(){
        this.gongji_jishu=0;
        //算出熊的面向
        let isLeft=this.att_target.x<this.node.x;
        let data=new KeyFrameData();
        data.name="Attack";
        data.callback=()=>{
            this.gongji_jishu=0;
            //造成伤害
            if(this.att_target){
                GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_ShouWangSkill2);
                let monsterTs=this.att_target.getComponent(Monster);
                if(monsterTs){
                    let damageData=monsterTs.beFlashInjured(this.gongji_data);
                    if(damageData.getDamageNum()>0){
                        //专武范围伤害
                        if(this.aoe_fanwei>0){
                            let monsters=MonsterManager.getInstance().getMonstersForCenterPos(-1,monsterTs.getCenterPos(),this.aoe_fanwei);
                            //如果范围内有怪物
                            if(monsters){
                                for(let i=0; i<monsters.length; i++){
                                    let monsterTTS=monsters[i].getComponent(Monster);
                                    if(monsterTTS.uuid!=this.uuid){
                                        monsterTTS.beFlashInjured(this.gongji_data);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        this.setBearState(BearState.attack,isLeft,false,[data],()=>{            
            this.checkIdle();
        })
    }

    startMove(dt:number){
        let disX=this.node.x;
        let disY=this.node.y;
        let speed=this.cur_move_speed*dt;
        disX+=speed*Math.cos(this.move_direction);
        disY+=speed*Math.sin(this.move_direction);
        this.node.x=disX;
        this.node.y=disY;
        if(this.node.x>360)
        {
            this.node.x=360;
            this.move_direction=(Math.PI-this.move_direction);
        }
        if(this.node.x<-360)
        {
            this.node.x=-360;
            this.move_direction=(Math.PI-this.move_direction);
        }
        //不能穿过城墙
        if(this.node.y<this.wall_yy){
            this.node.y=this.wall_yy;
        }
        let isLeft=this.move_direction>Math.PI/2&&this.move_direction<Math.PI*3/2;
        this.setBearState(BearState.move,isLeft,true);
        this.node.zIndex=(Math.round(8000-this.node.y*10));
    }

    startDestory(){
        this.setBearState(BearState.destory);
        cc.tween(this.node).delay(0.5).to(1,{opacity:0}).removeSelf().start();
        if(this.destory_callback){
            this.destory_callback();
        }
    }

    update(dt:number)
    {
        if(GameManager.getInstance().cur_game_state!=GameState.Game_Playing)
            return;
        if(this.cur_state==BearState.born||this.cur_state==BearState.destory){
            return;
        }
        this.remain_num-=dt;
        if(this.remain_num>0){
            this.checkAttack(dt);  
        }else{
            this.startDestory();
        }
    }

    private checkAttack(dt:number)
    {
        this.gongji_jishu+=dt;
        if(this.cur_state!=BearState.attack){
            let monsters=MonsterManager.getInstance().getMonstersForCenterPos(1,this.getGongJiPos(),this.find_monster_fanwei);
            //如果范围内有怪物
            if(monsters){
                this.att_target=monsters[0];
                //判断距离
                let distance=(this.att_target.getPosition().sub(this.getGongJiPos()).mag());
                if(distance<this.gongji_juli){
                    if(this.gongji_jishu>=this.gongji_jiange)
                    {
                        this.spine.timeScale=this.base_jiange/this.gongji_jiange;
                        this.startAttack();
                    }else{
                        this.checkIdle();
                    }
                }else{
                    this.checkMove(dt);
                }            
            }else{
                this.att_target=null;
                this.checkIdle();
            }
        }                
    }

    private checkIdle(){
        if(this.cur_state==BearState.idle){
            return;
        }
        this.setBearState(BearState.idle,this.cur_is_left,true);
    }

    private checkMove(dt:number){
        let speed=this.cur_move_speed*dt;
        /**如果有命令，则执行命令 */
        if(this.move_target_pos){
            let offsetPos=this.move_target_pos.sub(this.getGongJiPos());
            if(offsetPos.mag()<speed)
            {
                this.move_target_pos=null;
                this.checkIdle();
            }else
            {
                let pi2=Math.PI*2;
                this.move_direction=(Math.atan2(offsetPos.y,offsetPos.x)+pi2)%pi2;
                this.startMove(dt);
            }
        }else{
            let pi2=Math.PI*2;
            let offsetPos=this.att_target.getPosition().sub(this.getGongJiPos());
            this.move_direction=(Math.atan2(offsetPos.y,offsetPos.x)+pi2)%pi2;
            this.startMove(dt);
        }
    }
}
