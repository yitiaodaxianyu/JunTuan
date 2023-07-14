import { GameState } from "../../../Constants";
import { Enemy_Buff_Type, Enemy_DeBuff_Type } from "../../../Enemy/EnemyConfig";
import { GameEffectId, GameEffectsManager } from "../../../Game/GameEffectsManager";
import GameManager from "../../../GameManager";
import Monster from "../../../Monster/Monster";
import MonsterManager from "../../../Monster/MonsterManager";
import { SoundIndex } from "../../../Sound/AudioConstants";
import { GongJiData } from "../../Data/HeroData";
import { BuffData } from "../BuffData";
import GongJi from "../GongJi";
import { BuffId, BuffType, Hero_Type, SkillType } from "../HeroConfig";


const {ccclass, property} = cc._decorator;

@ccclass
export default class FeiBiao extends GongJi {

    @property({type:cc.Prefab})
    tuowei:cc.Prefab=null;

    game_effect_id:number=0;
    //飞镖经过的路径记录
    //feibiao_pos:cc.Vec2[]=[];
    //飞镖旋转记录
    //feibiao_angle:number[]=[];
    //影子节点
    //shadow_node:cc.Node=null;

    move_speed:number=1200;
    move_direction:number=Math.PI/2;
    //旋转速度
    xuanzhuan_speed:number=600;

    //弹射弹射次数
    cur_tanshe_num:number=6;
    max_tanshe_num:number=0;
    //记录弹射过的目标，防止重复弹射
    tanshe_yes:string[]=[];

    //目标
    target:cc.Node=null;

    cur_tanshe_rate:number=1;

    shanghai:number=1;

    tuo_wei:cc.Node=null;

    onLoad()
    {
        //this.addShadow();
    }
    
    init(gameEffectId:GameEffectId,gjData:GongJiData,speed:number,target:cc.Node,tansheNum:number)
    {
        super.initData(gjData);
        this.game_effect_id=gameEffectId;
        this.move_speed=speed;
        this.cur_tanshe_rate=1;
        this.max_tanshe_num=this.cur_tanshe_num=tansheNum+1;
        this.node.color=cc.Color.WHITE;
        this.node.opacity=255;
        //重置飞镖弹射数据
        this.tanshe_yes.splice(0); 
        if(typeof target == "number")
        {
            this.changeDir(target);
        }else
        {
            this.target=target;
            this.tanshe_yes.push(target.uuid);
            let offsetPos=this.target.getPosition().sub(this.node.getPosition());
            let pi2=Math.PI*2;
            this.move_direction=(Math.atan2(offsetPos.y,offsetPos.x)+pi2)%pi2;
        }

        // if(this.shadow_node)
        // {
        //     this.shadow_node.active=true;
        //     this.shadow_node.opacity=this.node.opacity/2;            
        // }
        this.tuo_wei=cc.instantiate(this.tuowei)
        this.tuo_wei.parent=this.node.parent;
        this.node.zIndex=1;
    }

    //添加影子
    // addShadow()
    // {
    //     if(this.shadow_node==null)
    //     {
    //         this.node.zIndex=this.node.zIndex-1;
    //         this.shadow_node=new cc.Node('feibiaoShadow');
    //         this.shadow_node.parent=this.node.parent;
    //         this.shadow_node.addComponent(cc.Sprite).spriteFrame=this.node.getComponent(cc.Sprite).spriteFrame;
    //         this.shadow_node.setPosition(this.node.getPosition());
    //         this.shadow_node.opacity=100;
    //         this.shadow_node.color=cc.Color.GRAY;
    //         this.shadow_node.scale=this.node.scale;
    //         this.feibiao_pos=new Array(3);
    //         let len=this.feibiao_pos.length;
    //         for(let i=0; i<len; i++)
    //         {
    //             this.feibiao_pos[i]=this.node.getPosition();
    //             this.feibiao_angle[i]=this.node.angle;
    //         }
    //     }                
    // }

    //删除
    // removeShadow()
    // {
    //     if(this.shadow_node!=null)
    //     {
    //         this.shadow_node.removeFromParent();
    //         this.shadow_node=null;
    //     }                
    // }

    tanshe()
    {
        let curMonsterTs=this.target.getComponent(Monster);
        if(curMonsterTs)
        {
            //let heroData=GameManager.getInstance().game_hero_data[Hero_Type.RenZhe];   
            let heroData=GameManager.getInstance().game_hero_data.get(Hero_Type.PaoShou);
            //如果有格挡护盾
            // if(curMonsterTs.isHaveBuff(Enemy_Buff_Type.hudun))
            // {
            //     //结束弹射
            //     this.cur_tanshe_num=0;
            //     this.gongji_data.hero_data.att_rate=this.cur_tanshe_rate;
            //     curMonsterTs.beFlashInjured(this.gongji_data);
            //     return;
            // }
            GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_RenzheAttack);                   
            //this.gongji_data.hero_data.att_rate=this.cur_tanshe_rate;
            let data=curMonsterTs.beFlashInjured(this.gongji_data);
            if(!data.is_die && data.getDamageNum()>0){
                //减速
                // curMonsterTs.addDeBuff(Enemy_DeBuff_Type.JianSu_RenZhe_EX_Skill,{
                //     /**持续剩余时间 */
                //     remain_time:heroData.ExclusiveWeaponSkillValue_3,
                //     /**每次触发的伤害值 */
                //     damage_num:0,
                //     /**触发伤害的时间间隔 */
                //     jiange_time:0.2,
                //     other_value_1:heroData.ExclusiveWeaponSkillValue_2,
                //     hero_type:Hero_Type.RenZhe,                    
                // },this.gongji_data)
                
            }
            //普攻递增伤害
            this.cur_tanshe_rate=(1+heroData.getSkillValue2(SkillType.Passive_1));
            // GameEffectsManager.getInstance().createGameEffectById(GameEffectId.renzhe_feibiao_hit,this.node.getPosition());            
            //查找弹射新目标
            this.target=this.getMonster();
            if(this.target)
            {
                this.tanshe_yes.push(this.target.uuid);
            }else{
                if(this.tanshe_yes.length>2){
                    this.tanshe_yes.splice(0,this.tanshe_yes.length-1);
                }else{
                    this.cur_tanshe_num=0;
                }                
            }
            //完成弹射
            this.cur_tanshe_num--;
        }
    }

    getMonster():cc.Node
    {
        let em=MonsterManager.getInstance();        
        if(em.node.childrenCount<=0)
        {
            return null;
        }
        let pos:cc.Vec2=this.node.getPosition();
        //1.先检测在攻击范围内符合攻击单位的敌人
        let attMonsters=[];
        for(let enemy of em.node.children)
        {
            let enemyPos=cc.v2(enemy.x,enemy.y+enemy.height/2);
            let enemyTS=enemy.getComponent(Monster);
            if(enemyTS.getIsCanCheck()==true)
            {
                let distance=pos.sub(enemyPos).mag();
                if(this.getIsTanShe(enemy.uuid)==false && distance<=500)
                {
                    attMonsters.push(enemy);
                }
            }
        }
        if(attMonsters.length<=0)
        {
            return null;
        }
        if(1==attMonsters.length)
        {
            return attMonsters[0];
        }
        //2.1优先攻击跟目标位置最近的单位
        attMonsters.sort((a:cc.Node,b:cc.Node)=>{
            return cc.v2(a.x,a.y+a.height/2).sub(pos).mag()-cc.v2(b.x,b.y+b.height/2).sub(pos).mag();
        });
        return attMonsters[0];
    }
    //飞行途中目标丢失时
    getMonsterForMiss():cc.Node
    {
        let em=MonsterManager.getInstance();
        if(em.node.childrenCount<=0)
        {
            return null;
        }
        let pos:cc.Vec2=this.node.getPosition();
        //1.先检测在攻击范围内符合攻击单位的敌人
        let attMonsters=[];
        for(let enemy of em.node.children)
        {
            let enemyPos=cc.v2(enemy.x,enemy.y+enemy.height/2);
            let enemyTS=enemy.getComponent(Monster);
            if(enemyTS.getIsCanCheck()==true)
            {
                let distance=pos.sub(enemyPos).mag();
                //let width=enemy.width/2*enemy.scaleX+this.node.width/2*this.node.scaleX;                
                if(this.getIsTanShe(enemy.uuid)==false && distance<=500)
                {
                    attMonsters.push(enemy);
                }
            }
        }
        if(attMonsters.length<=0)
        {
            return null;
        }
        if(1==attMonsters.length)
        {
            return attMonsters[0];
        }
        //2.1优先攻击跟目标位置最近的单位
        attMonsters.sort((a:cc.Node,b:cc.Node)=>{
            return cc.v2(a.x,a.y+a.height/2).sub(pos).mag()-cc.v2(b.x,b.y+b.height/2).sub(pos).mag();
        });
        return attMonsters[0];
    }

    getIsTanShe(uid:string):boolean
    {
        return this.tanshe_yes.includes(uid);
    }

    setNewTarget(enemy:cc.Node)
    {
        if(this.cur_tanshe_num>0 && this.target==null)
        {
            if(this.getIsTanShe(enemy.uuid)==false)
            {
                this.target=enemy;
            }
        }
    }

    private changeDir(dir:number)
    {
        this.move_direction=(dir+Math.PI*2)%(Math.PI*2);
    }

    collisionToWall(wallName:string)
    {
        // if(wallName=='wall_left' || wallName=='wall_right')
        // {
        //     this.changeDir((Math.PI-this.move_direction));
        //     this.cur_tanshe_num--;
        // }
        // if(wallName=='wall_top')
        // {
        //     this.changeDir((2*Math.PI-this.move_direction));
        //     this.cur_tanshe_num--;
        // }
        // if(wallName=='wall_down')
        // {
        //     //先判断当前方向
        //     let dir=this.move_direction%(Math.PI*2);
        //     if(dir>Math.PI && dir<2*Math.PI)
        //     {                
        //         this.changeDir((2*Math.PI-this.move_direction));
        //         this.cur_tanshe_num--;
        //     }
        // }
    }

    //----------------------------------------UPDATE------------------------------------------
    update (dt) {
        if(GameManager.getInstance().cur_game_state!=GameState.Game_Playing)
        return;
        this.update_move(dt);
        if(this.tuo_wei){
            this.tuo_wei.setPosition(this.node.position);
        }
        //影分身
        // this.update_locus_shadow();
        // if(this.shadow_node)
        // {
        //     this.update_shadow();
        // }
    }

    update_move(dt)
    {
        this.node.angle+=dt*this.xuanzhuan_speed;
        if(this.node.angle>=360)
        {
            this.node.angle=this.node.angle%360;
        }
        //跟踪目标
        let sp=this.move_speed*dt;
        if(this.cur_tanshe_num>0)
        {
            let disX=this.node.x;
            let disY=this.node.y;
            if(this.target && this.target.getComponent(Monster).getIsCanCheck()==true)
            {
                let enemyTs=this.target.getComponent(Monster);
                let enemyPos=enemyTs.getSheShouPos();;
                let offsetPos=enemyPos.sub(this.node.getPosition());
                if(offsetPos.mag()<sp)
                {
                    //中了,开始弹射
                    this.tanshe();
                }else
                {
                    let pi2=Math.PI*2;
                    this.move_direction=(Math.atan2(offsetPos.y,offsetPos.x)+pi2)%pi2;
                    disX+=sp*Math.cos(this.move_direction);
                    disY+=sp*Math.sin(this.move_direction);
                }
            }else
            {
                //目标丢失,往当前方向走,如果途中遇到靠近的怪，则追踪目标
                this.target=this.getMonsterForMiss();
                if(this.target==null){
                    disX+=sp*Math.cos(this.move_direction);
                    disY+=sp*Math.sin(this.move_direction);
                }
            }            
            this.node.x=disX;
            this.node.y=disY;
            if(Math.abs(this.node.y)>=1280 || Math.abs(this.node.x)>=640){
                this.destroySelf();
            }
        }else
        {
            this.backToHero(sp);
        }        
    }

    backToHero(sp:number)
    {
        if(this.tuo_wei){
            cc.tween(this.tuo_wei).delay(this.tuo_wei.getComponent(cc.MotionStreak).fadeTime).removeSelf().start();
            this.tuo_wei=null;
        }
        //收回英雄处
        this.node.color=cc.Color.GRAY;
        this.node.opacity=168;
        //this.shadow_node.opacity=this.node.opacity/2;
        //let offsetPos=GameManager.getInstance().all_hero[Hero_Type.RenZhe].node.getPosition().sub(this.node.getPosition());
        let offsetPos=GameManager.getInstance().all_hero.get(Hero_Type.PaoShou).node.getPosition().sub(this.node.getPosition());
        if(offsetPos.mag()<sp)
        {
            this.destroySelf();
        }else
        {
            let pi2=Math.PI*2;
            this.move_direction=(Math.atan2(offsetPos.y,offsetPos.x)+pi2)%pi2;
            this.node.x+=sp*Math.cos(this.move_direction);
            this.node.y+=sp*Math.sin(this.move_direction);
        }
    }

    //记录影子的路径和角度数值
    // update_locus_shadow()
    // {
    //     //加入头部
    //     this.feibiao_pos.unshift(this.node.getPosition());
    //     this.feibiao_angle.unshift(this.node.angle);
    //     //删除尾部
    //     this.feibiao_pos.pop();
    //     this.feibiao_angle.pop();        
    // }

    // //显示影子的跟随
    // update_shadow()
    // {
    //     let posIndex=this.getPosIndex();
    //     this.shadow_node.setPosition(this.feibiao_pos[posIndex]);
    //     this.shadow_node.angle=this.feibiao_angle[posIndex];
    // }
    //兼容加倍速率处理(暂时不支持减速倍率，因为游戏没有减速倍率，所以不做了，减速倍率思路：正常速度取中间值，加速取后，减速取前)
    // private getPosIndex():number
    // {
    //     let maxCL=this.feibiao_pos.length-1;
    //     let index=Math.floor(this.feibiao_pos.length/cc.kGetSpeed());
    //     if(index>=maxCL)
    //     {
    //         index=maxCL;
    //     }
    //     return index;
    // }

    destroySelf()
    {
        this.target=null;
        //this.shadow_node.active=false;
        GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id,this.node);
    }

     ////--------------------------------------碰撞开始----------------------------------------------------
    //  onCollisionEnter(other:cc.Collider,self:cc.Collider) {
    //     let gm=GameManager.getInstance();        
    //     if(gm.cur_game_state==GameState.Game_Lose)
    //         return;
    //     let group=other.node.group;
    //     switch(group){
    //         case 'wall':{
    //             this.collisionToWall(other.node.name);
    //         }
    //     }
    // }
}
