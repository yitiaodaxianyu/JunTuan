import { Enemy_State } from "../Enemy/EnemyConfig";
import { KeyFrameData } from "../Monster/MonsterData";
import { PropId } from "../Prop/PropConfig";
import GuaJiManager from "./GuaJiManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class GuaJiMonster extends cc.Component {

    protected spine: sp.Skeleton=null;
    /**移动速度 */
    cur_move_speed:number=80;
    /**移动方向 */
    move_direction:number=Math.PI;
    /**当前的血量 */
    protected cur_hp: number=1;
    /**最大的血量 */
    protected max_hp: number=1;
    /**阴影 */
    protected shadow: cc.Node=null;
    shadow_pos: cc.Vec2=null;
    shadow_size: cc.Size=null;
    /**攻击间隔（秒，表示多少秒攻击一次） */
    protected att_jiange: number=1;
    /**攻击计时 */
    protected att_jishu: number=0;
    /**当前的攻击力 */
    /**怪物当前的状态 */
    protected monster_state: Enemy_State=Enemy_State.standby;
    //受伤动作
    protected injured_action:cc.Tween=null;
    private juji_pos:cc.Vec2=cc.v2(0,0);

    onLoad(){
        this.spine=this.node.getComponent(sp.Skeleton);
        let juji=this.node.getChildByName('juji');
        this.juji_pos=(cc.v2(juji.x*this.node.scaleX,juji.y*this.node.scaleY));
        let shadowNode=this.node.getChildByName('shadow');
        this.shadow_pos=shadowNode.getPosition();
        this.shadow_pos.y-=50;
        this.shadow=GuaJiManager.getInstance().createShadow(cc.v2(1280,0));
        this.shadow.setContentSize(shadowNode.width*this.node.scaleX,shadowNode.height*this.node.scaleY);        
        this.update(0.016);
    }

    init(){        
        this.startWall();
    }

    getIsDie():boolean
    {
        return this.monster_state==Enemy_State.die;
    }

    getEnemyState():Enemy_State
    {
        return this.monster_state;
    }

    getIsCanCheak():boolean
    {
        let isCan=true;
        if(this.getIsDie())
        {
            isCan=false;
        }
        return isCan;
    }

    getMaxHp():number
    {
        return this.max_hp;
    }

    getCurHp():number
    {
        return this.cur_hp;
    }

    getIsFullHp():boolean
    {
        return this.cur_hp>=this.max_hp;
    }

    getJuJiPos():cc.Vec2
    {
        return this.node.getPosition().add(this.juji_pos);
    }

    getShadowPos():cc.Vec2{
        return this.node.getPosition().add(cc.v2(this.shadow_pos.x*this.node.scaleX,this.shadow_pos.y*this.node.scaleY));
    }
    

    setEnemyState(type:Enemy_State)
    {
        if(type!=this.monster_state){
            this.monster_state=type;
        }
    }

    startWall(){
        this.monster_state=Enemy_State.move;
        this.playSpinAnimaton('Side_Walk',true);
        this.spine.timeScale=1.1;
        this.cur_move_speed=160;
    }

    startDeath(){
        this.spine.timeScale=1;
        this.cur_move_speed=GuaJiManager.getInstance().bg_speed_x;
        this.monster_state=Enemy_State.die;
        this.node.getComponent(cc.Collider).enabled=false;
        this.spine.paused=false;
        this.node.stopAllActions();
        cc.tween(this.node).to(0.18,{color:cc.color(255,255,255)}).start();
        this.playDeadAnimaton('Side_Death',()=>{
            cc.tween(this.shadow).to(0.5,{opacity:0}).removeSelf().start();
            cc.tween(this.node).to(0.5,{opacity:0}).removeSelf().start();
        });
        GuaJiManager.getInstance().createRes(PropId.Coin,this.shadow.getPosition());
        GuaJiManager.getInstance().createRes(PropId.Coin,this.shadow.getPosition());
        GuaJiManager.getInstance().createRes(PropId.HeroExp,this.shadow.getPosition());
    }

    startHurt(){
        if(this.injured_action)
        {
            this.injured_action.stop();
        }
        this.node.color=cc.Color.RED;        
        this.injured_action=cc.tween(this.node).to(0.18,{color:cc.color(255,255,255)}).start();
    }

    /**
     * 播放一个骨骼动画
     * @param name 骨骼动画名称
     * @param isLoop 是否循环
     * @param data 是否监听关键帧，关键帧数据包含关键帧名称，监听到关键帧后的回调
     * @param endCallback 播放结束后的回调
     */
    playSpinAnimaton(name:string,isLoop:boolean=false,data?:KeyFrameData,endCallback?:Function){
        if(this.getEnemyState()==Enemy_State.die){
            return;
        }
        let anima=this.spine.setAnimation(0,name,isLoop);
        if(data){

            this.spine.setCompleteListener((trackEntry, loopCount) => {
                let nameTemp = trackEntry.animation ? trackEntry.animation.name : '';
                if (nameTemp === name && data.callback) {
                    data.callback();
                }
                this.spine.setCompleteListener(null);
            });
            // this.spine.setTrackEventListener(anima,(entry: sp.spine.TrackEntry, event) =>{
            //     if(event.data.name==data.name){
            //         data.callback();
            //     }
            // })
        }
        if(endCallback){
            // this.spine.setTrackCompleteListener(anima,(entry: sp.spine.TrackEntry, event) =>{
            //     anima.listener=null;
            //     endCallback();
            // })

            this.spine.setCompleteListener((trackEntry, loopCount) => {
                let nameTemp = trackEntry.animation ? trackEntry.animation.name : '';
                if (nameTemp === name && endCallback) {
                    endCallback();
                }
                this.spine.setCompleteListener(null);
            });
        }
    }

    playDeadAnimaton(name:string,endCallback:Function){
        let anima=this.spine.setAnimation(0,name,false);

        this.spine.setCompleteListener((trackEntry, loopCount) => {
            let nameTemp = trackEntry.animation ? trackEntry.animation.name : '';
            if (nameTemp === name && endCallback) {
                endCallback();
            }
            this.spine.setCompleteListener(null);
        });
        // this.spine.setTrackCompleteListener(anima,(entry: sp.spine.TrackEntry, event) =>{
        //     anima.listener=null;
        //     endCallback();
        // })
    }

    public changeHp(): boolean {
        if(this.getIsDie())
        {
            return true;
        }
        let isDie=false;
        this.cur_hp-=1;
        this.startHurt();
        if(this.cur_hp<=0)
        {
            this.startDeath();
            isDie=true;
        }
        if(this.cur_hp>this.max_hp)
        {
            this.cur_hp=this.max_hp
        }
        return isDie;
    }

    protected update(dt: number): void {
        this.moving(dt);
    }

    private moving(dt)
    {        
        let disX=this.node.x;
        let disY=this.node.y;
        let speed=this.cur_move_speed*dt;
        disX+=speed*Math.cos(this.move_direction);
        disY+=speed*Math.sin(this.move_direction);
        this.node.x=disX;
        this.node.y=disY;
        //不能穿过城墙
        if(this.node.x<-64){
            this.node.x=-64;            
        }
        this.shadow.setPosition(this.getShadowPos());
    }
}
