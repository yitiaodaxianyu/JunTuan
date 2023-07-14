import { GameState } from "../Constants";
import { Enemy_DeBuff_Type, Enemy_State } from "../Enemy/EnemyConfig";
import { GameEffectId, GameEffectsManager } from "../Game/GameEffectsManager";
import Move from "../Game/Move";
import GameManager from "../GameManager";
import { BuffId, BuffType, DamageType } from "../Hero/Game/HeroConfig";
import Wall from "../Wall/Wall";
import { WallType } from "../Wall/WallConfig";
import WallManager from "../Wall/WallManager";
import Monster from "./Monster";
import { GongJiMode, KeyFrameData, MonsterActionName, MonsterFaceName, MonsterSkinType, StrengthType } from "./MonsterData";
import MonsterManager from "./MonsterManager";


const {ccclass, property} = cc._decorator;
/**普通怪物 */
@ccclass
export default class MonsterNormal extends Monster {

    monster_xuanyun_callback:Function=null;
    monster_init_callback:Function=null;
    monster_death_callback:Function=null;
    monster_att_callback:Function=null;

    protected onLoad(): void {
        super.onLoad();
        this.addDeathCallback(this.onMonsterDeath);
        this.addInitListen(this.onMonsterInited);
        this.addXuanYunListen(this.onXuanYunResult);
    }

    private onMonsterInited(){
        this.initOutward();
        if(this.base_data.AttackMode==GongJiMode.Far){
            GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster_far_att);
            GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster_far_att_hit);
        }
        this.scheduleOnce(()=>{
            this.setEnemyState(Enemy_State.move);
        },1);
        if(this.monster_init_callback){
            this.monster_init_callback();
        }
    }

    addMonsterNormalInited(callback:Function){
        this.monster_init_callback=callback;
    }

    /**初始化外观*/
    private initOutward(){
        this.setSkin(this.getSkinName());
        super.playSpinAnimaton(this.getAnimaName(MonsterActionName.Idle),true);
    }

    setTargetPos(pos:cc.Vec2,endCallback:Function){
        this.move_target_pos=pos;
        this.move_end_callback=endCallback;
    }
    
    setSkin(skinName: string){
        this.spine.setSkin(skinName);
    }

    setFaceType(type:MonsterFaceName){
        this.face_type=type;
        if(this.face_type==MonsterFaceName.SideL){
            this.node.scaleX=-this.setup_scale;
        }else {
            this.node.scaleX=this.setup_scale;
        }
    }

    getSkinName():string{
        return this.face_type+this.skin_type;
    }

    getAnimaName(actionName:MonsterActionName):string{
        return this.face_type+"_"+actionName;
    }

    /**设置打击目标 */
    setAttTarget(target:cc.Node){
        this.att_target=target;
        if(target){
            this.att_jishu=this.att_jiange;
        }else{
            this.move_direction=Math.PI*3/2;
        }        
    }

    addMonsterNormalAttack(callback:Function){
        this.monster_att_callback=callback;
    }
    /**
     * 
     * @param target 攻击的目标
     */
    startAttack(target?:cc.Node){
        if(this.monster_att_callback){
            //是否截获本次攻击
            if(this.monster_att_callback())
            {
                return;
            }
        }
        super.setEnemyState(Enemy_State.att);
        this.att_jishu=0; 
        if(target){
            let offsetPos=target.getPosition().sub(this.node.getPosition());
            this.move_direction=Math.atan2(offsetPos.y,offsetPos.x);
            this.checkFace(MonsterActionName.Attack);
        }else{
            this.move_direction=Math.PI*3/2;
            this.checkFace(MonsterActionName.Attack);
        }
        let data=new KeyFrameData();
        data.name='OnDamaging';
        data.callback=()=>{
            this.att_jishu=0;
            switch(this.base_data.AttackMode){
                case GongJiMode.Melee:{
                    if(target){
                        //测试
                        target.removeFromParent();
                        this.setAttTarget(null);
                    }else{
                        //造成伤害
                        super.injureWall(super.getAttData(DamageType.Normal,false));
                    }
                    let pos=target?target.getPosition():cc.v2(this.node.x,this.att_wall.getWallMaxYY());
                    let attNode=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.monster_normal_att,pos);
                    attNode.scale=super.getWallAttackScale();
                }break;
                case GongJiMode.Far:{
                    let pos=target?target.getPosition():cc.v2(this.node.x,this.att_wall.getWallMaxYY());
                    this.startLaunch(pos);
                }break;
            }            
        }
        super.playSpinAnimaton(this.getAnimaName(MonsterActionName.Attack),false,data,()=>{
            this.startIdle();
            super.setEnemyState(Enemy_State.move);
            if(this.att_wall){
                this.move_direction=Math.random()>0.5?Math.PI:0;
            }
        })
    }

    startLaunch(pos:cc.Vec2){
        let node=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.monster_far_att,this.getAttPos());
        let moveTS=node.getComponent(Move);
        moveTS.init(400,0,GameEffectId.monster_far_att);
        moveTS.setTargetPos(pos,()=>{
            GameEffectsManager.getInstance().createGameEffectById(GameEffectId.monster_far_att_hit,node.getPosition());            
            //造成伤害
            super.injureWall(super.getAttData(DamageType.Normal,true));
        });
    }

    startIdle(){
        super.playSpinAnimaton(this.getAnimaName(MonsterActionName.Idle),true);
    }

    addMonsterNormalXuanYun(callback:Function){
        this.monster_xuanyun_callback=callback;
    }

    onXuanYunResult(isXuanYun:boolean){
        if(isXuanYun){
            this.startXuanYun();
        }else{
            this.att_jishu=0;
            this.setEnemyState(Enemy_State.move);
        }
        if(this.monster_xuanyun_callback){
            this.monster_xuanyun_callback(isXuanYun);
        }        
    }

    startXuanYun(){
        super.playSpinAnimaton(this.getAnimaName(MonsterActionName.Hurt),false,null,()=>{
            if(this.isHaveBuff(BuffId.Hero_XuanYun))
                this.spine.paused=true;
        });
    }

    addMonsterNormalDeath(callback:Function){
        this.monster_death_callback=callback;
    }

    onMonsterDeath(){
        // super.playDeadAnimaton(this.getAnimaName(MonsterActionName.Death),()=>{
        //     this.removeAllDeBuff();
        //     cc.tween(this.shadow).to(0.5,{opacity:0}).start();
        //     cc.tween(this.node).to(0.5,{opacity:0}).call(()=>{
        //         this.removeAllDeBuff();
        //         MonsterManager.getInstance().destroyMonster(this.node,this.monster_type);
        //         let die=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.monster_die,this.node.getPosition());
        //         die.scale=this.base_data.StrengthType==StrengthType.Normal?0.4:0.8;
        //     }).start();
        // });
        this.removeAllDeBuff();
        this.shadow.opacity=0;
        this.node.opacity=0;
        let die=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.monster_die,super.getCenterPos());
        die.scale=this.base_data.StrengthType==StrengthType.Normal?0.4:0.8;
        if(this.monster_death_callback){
            this.monster_death_callback();
        }
        cc.tween(this.node).delay(0.5).call(()=>{
            this.removeAllDeBuff();
            MonsterManager.getInstance().destroyMonster(this.node,this.monster_type);
        }).start();
    }
    
    update(dt)
    {
        if((GameManager.getInstance().cur_game_state!=GameState.Game_Playing)||this.getIsDie())
        {
            return;
        }
        super.update(dt);
        if(!this.isHaveDeBuffType(BuffType.Vertigo)){
            this.checkAtt(dt);
        }else{
            if(this.isHaveDeBuff(BuffId.Hero_MeiMo_Active_MeiHuo)){
                this.moving(dt);
            }
        }
    }

    private moving(dt)
    {
        if(!this.isHaveDeBuff(BuffId.Hero_XuanYun)&&(this.getEnemyState()==Enemy_State.move)){
            let speed=this.cur_move_speed*dt;
            if(this.move_target_pos){
                let offsetPos=this.move_target_pos.sub(this.node.getPosition());
                if(offsetPos.mag()<speed)
                {
                    if(this.move_end_callback){
                        this.move_end_callback();
                        this.move_end_callback=null;
                    }
                }else
                {
                    let pi2=Math.PI*2;
                    this.move_direction=(Math.atan2(offsetPos.y,offsetPos.x)+pi2)%pi2;
                    this.startMove(dt);
                }
            }else{
                this.startMove(dt);
            }
        }
    }

    startMove(dt){
        let disX=this.node.x;
        let disY=this.node.y;
        let speed=this.cur_move_speed*dt;
        disX+=speed*Math.cos(this.move_direction);
        disY+=speed*Math.sin(this.move_direction);
        let leftRight=this.setX(disX);
        if(leftRight!=0){
            this.move_direction+=Math.PI;
        }
        this.setY(disY);
        // //不能穿过城墙
        // let walls=WallManager.getInstance().getAllWall();
        // walls.forEach((wall:Wall,wallType:WallType)=>{
        //     //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
        //     let rect=wall.getWallRect();
        //     if(rect.contains(this.node.getPosition())&&this.node.y>wall.node.y){
        //         this.node.y=rect.yMax;
        //     }
        // })
        this.checkFace(MonsterActionName.Walk);
    }
    /**检测朝向 */
    checkFace(actionName:MonsterActionName){
        let pi2=Math.PI*2;
        this.move_direction=(this.move_direction+pi2)%pi2;
        let newFace=MonsterFaceName.Front;
        //60~120°，背面
        if(this.move_direction>=Math.PI/3&&this.move_direction<=Math.PI*2/3){
            newFace=MonsterFaceName.Back;
        }else if(this.move_direction>=Math.PI*4/3&&this.move_direction<=Math.PI*5/3){
            newFace=MonsterFaceName.Front;
        }else{            
            if(this.move_direction>=Math.PI*2/3&&this.move_direction<=Math.PI*4/3){                
                newFace=MonsterFaceName.SideL;
            }else{                
                newFace=MonsterFaceName.SideR;
            }
        }
        if(this.face_type!=newFace){
            this.setFaceType(newFace);
            this.setSkin(this.getSkinName());
            super.playSpinAnimaton(this.getAnimaName(actionName),true);
        }else{            
            if(this.spine.animation!=this.getAnimaName(MonsterActionName.Walk))
            super.playSpinAnimaton(this.getAnimaName(actionName),true);
        }
        
    }

    /**攻击计算 */
    checkAtt(dt:number){        
        this.att_jishu+=dt;
        if(this.att_jishu>=this.att_jiange){
            this.att_jishu=this.att_jiange;
            //判断是否在攻击范围之内
            if(this.att_target){
                this.attTarget(dt);
            }else{
                this.attWall(dt);
            }
        }else{
            this.moving(dt);
        }
    }
    /**攻击具体目标判断 */
    attTarget(dt:number){
        let dis=this.node.getPosition().sub(this.att_target.getPosition()).mag();
        if(dis<=this.base_data.AttackDistance){            
            this.startAttack(this.att_target);
        }else{
            this.move_target_pos=this.att_target.getPosition();
            if(this.getEnemyState()==Enemy_State.move)
            this.moving(dt);
        }
    }
    /**攻击城墙判断 */
    attWall(dt:number){
        let walls=WallManager.getInstance().getAllWall();
        let attWall=null;
        walls.forEach((wall:Wall,wallType:WallType)=>{
            //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
            if(this.node.y>=wall.getWallMaxYY()&&Math.abs(this.node.y-wall.getWallMaxYY())<=this.base_data.AttackDistance){                
                attWall=wall;                
            }
        })
        if(attWall!=null){            
            this.att_wall=attWall;
            this.startAttack();
        }else{
            this.move_direction=Math.PI*3/2;
            this.move_target_pos=null;        
            this.moving(dt);
        }
    }
    
}
