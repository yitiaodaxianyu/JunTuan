import { GameState } from "../Constants";
import { Enemy_DeBuff_Type, Enemy_State } from "../Enemy/EnemyConfig";
import { GameEffectId, GameEffectsManager } from "../Game/GameEffectsManager";
import Move from "../Game/Move";
import SkillManager from "../Game/SkillManager";
import GameManager from "../GameManager";
import { BuffId, BuffType, DamageType } from "../Hero/Game/HeroConfig";
import Wall from "../Wall/Wall";
import { WallType } from "../Wall/WallConfig";
import WallManager from "../Wall/WallManager";
import Monster from "./Monster";
import MonsterBullet from "./MonsterBullet";
import { FeedBackType, GongJiMode, KeyFrameData, MonsterActionName, MonsterFaceName, MonsterSkinType, StrengthType } from "./MonsterData";
import MonsterManager from "./MonsterManager";


const {ccclass, property} = cc._decorator;
/**普通怪物 */
@ccclass
export default class MonsterNewNormal extends Monster {

    monster_xuanyun_callback:Function=null;
    monster_init_callback:Function=null;
    monster_death_callback:Function=null;
    monster_att_callback:Function=null;
    monster_att_hit_callback:Function=null;
    @property()
    monster_far_att:number=0;
    @property()
    monster_far_att_hit:number=0;

    protected onLoad(): void {
        super.onLoad();
        this.addDeathCallback(this.onDeath);
        this.addInitListen(this.onMonsterInited);
        this.addXuanYunListen(this.onXuanYunResult);
    }

    private onMonsterInited(){
        this.initOutward();
        if(this.base_data.AttackMode==GongJiMode.Far){
            if(this.monster_far_att>0){
                GameEffectsManager.getInstance().addEffectPoolById(this.monster_far_att);
            }
            if(this.monster_far_att_hit>0){
                GameEffectsManager.getInstance().addEffectPoolById(this.monster_far_att_hit);
            }            
        }        
        this.scheduleOnce(this.idleToMove,1);
        if(this.monster_init_callback){
            this.monster_init_callback();
        }
        this.node.scaleX=Math.random()>0.5?this.setup_scale:-this.setup_scale;
    }

    idleToMove(){
        this.setEnemyState(Enemy_State.move);
    }

    addMonsterNormalDeath(callback:Function){
        this.monster_death_callback=callback;
    }

    addMonsterNormalInited(callback:Function){
        this.monster_init_callback=callback;
    }

    addMonsterNormalAttack(callback:Function){
        this.monster_att_callback=callback;
    }

    addMonsterNormalAttackHit(callback:Function){
        this.monster_att_hit_callback=callback;
    }

    addMonsterNormalXuanYun(callback:Function){
        this.monster_xuanyun_callback=callback;
    }

    /**初始化外观*/
    private initOutward(){
        this.setSkin(this.getSkinName());
        super.playSpinAnimaton(this.getAnimaName(MonsterActionName.Walk),true);
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
        // if(this.face_type==MonsterFaceName.SideL){
        //     this.node.scaleX=-this.setup_scale;
        // }else {
        //     this.node.scaleX=this.setup_scale;
        // }
    }

    getSkinName():string{
        return MonsterFaceName.SideR+this.skin_type;
    }

    getAnimaName(actionName:MonsterActionName):string{
        return MonsterFaceName.SideR+"_"+actionName;
    }

    /**设置打击目标 */
    setAttTarget(target:cc.Node){
        this.att_target=target;
        if(target){
            this.att_jishu=this.att_jiange;
        }else{
            this.setMoveDir(Math.PI*3/2);
        }        
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
            this.setMoveDir(Math.atan2(offsetPos.y,offsetPos.x));
            this.checkFace(MonsterActionName.Attack);
        }else{
            this.setMoveDir(Math.PI*3/2);
            this.checkFace(MonsterActionName.Attack);
        }
        let data=new KeyFrameData();
        data.name='OnDamaging';
        data.callback=()=>{
            this.att_jishu=0;
            if(this.getIsDie()){
                return;
            }
            switch(this.base_data.AttackMode){
                case GongJiMode.Melee:{
                    if(target){
                        //测试
                        target.removeFromParent();
                        this.setAttTarget(null);
                    }else{
                        //造成伤害
                        let injureData=super.injureWall(super.getAttData(DamageType.Normal,false));
                        if(injureData.is_die==false&&injureData.getDamageNum()>0){
                           if(this.monster_att_hit_callback){
                                this.monster_att_hit_callback(injureData);
                           }
                        }
                    }
                    let pos=target?target.getPosition():cc.v2(this.node.x,this.att_wall.getWallMaxYY());
                    let attNode=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.monster_normal_att,pos);
                    attNode.scale=super.getWallAttackScale();
                }break;
                case GongJiMode.Far:{
                    let attNode=GameEffectsManager.getInstance().createGameEffectById(this.monster_far_att,super.getAttPos());
                    let bullet=attNode.getComponent(MonsterBullet);
                    bullet.init(this.getAttData(DamageType.Normal,true),this.monster_far_att,this.monster_far_att_hit,1200,Math.PI*3/2);
                }break;
            }
        }
        super.playSpinAnimaton(this.getAnimaName(MonsterActionName.Attack),false,data,()=>{
            this.startIdle();
            super.setEnemyState(Enemy_State.move);
            if(this.att_wall){
                this.setMoveDir(Math.random()>0.5?Math.PI:0);
            }
        })
    }    

    startIdle(){
        super.playSpinAnimaton(this.getAnimaName(MonsterActionName.Walk),true);
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
        this.spine.paused=true;            
    }


    onDeath(){
        this.removeAllDeBuff();
        this.shadow.opacity=0;
        this.node.opacity=0;
        let die=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.monster_die,super.getCenterPos());
        die.scale=this.base_data.StrengthType==StrengthType.Normal?0.4:0.8;
        cc.tween(this.node).delay(0.5).call(()=>{
            this.removeAllDeBuff();
            MonsterManager.getInstance().destroyMonster(this.node,this.monster_type);
        }).start();
        if(this.monster_death_callback){
            this.monster_death_callback();
        }
    }
    
    update(dt)
    {
        if((GameManager.getInstance().cur_game_state!=GameState.Game_Playing)||this.getIsDie())
        {
            return;
        }
        super.update(dt);
        if(!this.isHaveDeBuffType(BuffType.Vertigo)){
            if(this.getEnemyState()!=Enemy_State.skill){
                this.checkAtt(dt);
            }
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
                    this.setMoveDir((Math.atan2(offsetPos.y,offsetPos.x)+pi2)%pi2);
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
        this.checkFace(MonsterActionName.Walk);
    }
    /**检测朝向 */
    checkFace(actionName:MonsterActionName){
        let pi2=Math.PI*2;
        this.setMoveDir((this.move_direction+pi2)%pi2);
        let newFace=MonsterFaceName.SideL;
        //60~120°，背面
        if(this.move_direction!=Math.PI*3/2){
            if(this.move_direction>=Math.PI/2&&this.move_direction<=Math.PI*3/2){
                this.node.scaleX=-this.setup_scale;
            }else{
                this.node.scaleX=this.setup_scale;
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
            this.setMoveDir(Math.PI*3/2);
            this.move_target_pos=null;       
            this.moving(dt);
        }
    }
}
