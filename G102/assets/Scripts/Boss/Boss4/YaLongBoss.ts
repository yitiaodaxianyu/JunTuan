import { GameState } from "../../Constants";
import { Enemy_State } from "../../Enemy/EnemyConfig";
import { GameEffectsManager, GameEffectId } from "../../Game/GameEffectsManager";
import GameManager from "../../GameManager";
import { BuffData } from "../../Hero/Game/BuffData";
import { DamageType, BuffId, BuffType } from "../../Hero/Game/HeroConfig";
import { KeyFrameData, StrengthType } from "../../Monster/MonsterData";
import MonsterManager from "../../Monster/MonsterManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import MyTool from "../../Tools/MyTool";
import Wall from "../../Wall/Wall";
import { WallType } from "../../Wall/WallConfig";
import WallManager from "../../Wall/WallManager";
import Boss from "../Boss";
enum Animation_Name
{
    Idle = "Idle",       //-- 正面待机
    attack = "Attack",          //-- 攻击1
    run = "Run",                //-- 跑路
    hurt1 = "Hurt",          //-- 受击1
    skill2 = "Skill2",          //-- 技能2
    skill1_1 = "Skill1_1",          //-- 技能1-1开始蓄力
    skill1_2 = "Skill1_2",          //-- 技能1-2蓄力
    skill1_3 = "Skill1_3",          //-- 技能1-3蓄力结束
    dead= "Dead",   //死亡
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class YaLongBoss extends Boss {
    
    @property([cc.Node])
    hands:cc.Node[]=[];
    is_active_skill_2:boolean=false;
    attack_num:number=0;
    /**是否处于引导中 */
    is_yindao:boolean=true;
    /**喷火节点 */
    fire_node:cc.Node=null;
    /**引导的计数 */
    yindao_jishu:number=0;
    /**缩放速度 */
    scale_speed:number=16;
    /**一倍的缩放值的距离间隔 */
    once_distance:number=0;
    /**总的引导时间 */
    yindao_time:number=1;
    kuangbao_value:number[]=[];
    is_kuang_bao:boolean=false;

    onLoad(): void {
        super.onLoad();
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss4_normal_attack_hit,1);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss4_normal_skill_penhuo,1);        
        this.addDeathCallback(this.onDeath);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addBossInitedListen(this.onBossInited);
        this.addChangeBossHpListen(this.onChangeHp);
        this.setHands(false);
    }

    onBossInited(): void {
        this.startIdle();
        this.node.y=128;
        this.attack_num=0;
        let distance=this.getAttPos().y-WallManager.getInstance().getMainWall().getWallMaxYY()
        this.once_distance=distance/5.3;
        this.kuangbao_value=[this.skill_data.getSkillValue1(2),this.skill_data.getSkillValue2(2),-this.skill_data.getSkillValue3(2)]
    }

    onChangeHp(num:number){
        if(this.cur_hp<=this.max_hp/2){
            if(this.is_active_skill_2==false&&this.skill_cold_down[1]<=0){
                this.is_active_skill_2=true;
                this.startSkill(2);
            }           
        }else{
            if(this.is_active_skill_2==true){
                this.is_active_skill_2=false;
                this.setKuangBao(false);
            }            
        }
    }

    setHands(isShow:boolean){
        for(let i=0; i<this.hands.length; i++){
            this.hands[i].active=isShow;
        }
    }

    startIdle(){        
        super.setEnemyState(Enemy_State.standby);
        super.playSpinAnimaton(Animation_Name.Idle,true);
        
    }

    startAttack(): void {
        this.att_jishu=0;
        super.setEnemyState(Enemy_State.att);
        let data=new KeyFrameData();
        data.name='Attack';
        data.callback=()=>{
            this.attack_num++;
            this.att_jishu=0;
            GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Boss4Attack);
            let walls=WallManager.getInstance().getAllWall();
            let attWall=null;
            walls.forEach((wall:Wall,wallType:WallType)=>{
                //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
                if(this.node.y>=wall.getWallMaxYY()){                
                    attWall=wall;
                }
            })
            if(attWall){
                let injuredData=attWall.beInjured(super.getAttData(DamageType.Normal,false));
                if(injuredData.getDamageNum()>0){                    
                    GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss4_normal_attack_hit,cc.v2(Math.random()*640-320,attWall.getWallMaxYY()));
                } 
            }
            
            if(this.attack_num>=this.skill_data.getSkillValue3(1)){//
                //喷火
                this.attack_num=0;
                this.skill_queue.push(1);
            }
            //node.getComponent(BossAtt3).init(super.getAttData(DamageType.Normal,true,0),GameEffectId.boss3_normal_attack,1200,Math.PI*3/2,this.node.y,270);
        }
        super.playSpinAnimaton((Animation_Name.attack),false,data,()=>{
            if(this.skill_queue.length>0){
                super.setEnemyState(Enemy_State.standby);
                this.startSkill(this.skill_queue.shift());
            }else{
                this.startIdle();
            }
        })
    }
    startSkill(skillIndex:number){
        switch(skillIndex){
            case 1:{
                this.startSkill1();
            }break;
            case 2:{
                if(this.is_active_skill_2){
                    this.startSkill2();
                }
            }break;
        }
    }
    
    //狂暴
    startSkill2(){
        if(this.is_active_skill_2==false){
            return
        }
        this.skill_cold_down[1]=this.skill_data.getSkillColdDown(2);        
        if(super.getEnemyState()!=Enemy_State.att&&super.getEnemyState()!=Enemy_State.skill){
            if(!super.isHaveDeBuff(BuffId.Hero_XuanYun)){
                //霸体，防止被打断而无法进入狂暴状态
                this.cur_toughness+=1;
                super.setEnemyState(Enemy_State.skill);
                this.skill_cold_down[1]=this.skill_data.getSkillColdDown(2);
                let data=new KeyFrameData();
                data.name='Skill2';
                data.callback=()=>{
                    this.cur_toughness-=1;
                    this.att_jishu=0;
                    this.setKuangBao(true);
                }
                super.playSpinAnimaton((Animation_Name.skill2),false,data,()=>{
                    if(this.skill_queue.length>0){
                        super.setEnemyState(Enemy_State.standby);
                        this.startSkill(this.skill_queue.shift());
                    }else{
                        this.startIdle();
                    }
                })
            }else{
                if(this.skill_queue.indexOf(2)<0){
                    this.skill_queue.push(2);
                }
            }
        }else{
            if(this.skill_queue.indexOf(2)<0){
                this.skill_queue.push(2);
            }
        }
    }

    setKuangBao(isKB:boolean){
        if(this.is_kuang_bao!=isKB){
            this.is_kuang_bao=isKB;
            this.setHands(isKB)
            this.is_active_skill_2=isKB;
            if(isKB){                
                this.monster_data.Attack+=this.base_attribute_data.Attack*this.kuangbao_value[0];
                this.changeAttackSpeed(this.kuangbao_value[1]);
                this.monster_data.Defense+=this.base_attribute_data.Defense*this.kuangbao_value[2];
            }else{
                this.monster_data.Attack-=this.base_attribute_data.Attack*this.kuangbao_value[0];
                this.changeAttackSpeed(-this.kuangbao_value[1]);
                this.monster_data.Defense-=this.base_attribute_data.Defense*this.kuangbao_value[2];
            }
        }        
    }

    //喷火
    startSkill1(){
        this.skill_cold_down[0]=this.skill_data.getSkillColdDown(1);
        if(super.getEnemyState()!=Enemy_State.att){
            if(!super.isHaveDeBuff(BuffId.Hero_XuanYun)){
                GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Boss4Skill);
                super.setEnemyState(Enemy_State.skill);
                this.skill_cold_down[0]=this.skill_data.getSkillColdDown(1);
                super.playSpinAnimaton((Animation_Name.skill1_1),false,null,()=>{
                    super.playSpinAnimaton((Animation_Name.skill1_2),true,null,null);
                    this.is_yindao=true;
                    this.yindao_time=this.skill_data.getSkillValue2(1);
                    let pos=super.getAttPos()
                    this.fire_node=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss4_normal_skill_penhuo,pos);
                    this.fire_node.scale=0;
                    this.fire_node.angle=180;
                })
            }else{
                if(this.skill_queue.indexOf(1)<0){
                    this.skill_queue.push(1);
                }
            }
        }else{
            if(this.skill_queue.indexOf(1)<0){
                this.skill_queue.push(1);
            }
        }
    }

    fireDamage(wall:Wall){
        if(GameManager.getInstance().cur_game_state==GameState.Game_Playing){
            //播放动画
            //let pos=cc.v2(super.getAttPos().x,wall.getWallMaxYY()-32);  
            let attData=super.getAttData(DamageType.Skill,false,this.skill_data.getSkillValue1(1));
            attData.is_big=false;
            let data=wall.beInjured(attData);//
            // if(data.getDamageNum()>0){
            //     MyTool.randomSceneShakeSmall();
            // }
        }
    }
    /**销毁喷火特效 */
    destroyFire(isIdle:boolean) {
        this.is_yindao=false;
        if(this.fire_node){
            cc.tween(this.fire_node).to(0.2,{scale:0}).call(()=>{
                GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.boss4_normal_skill_penhuo,this.fire_node);
            }).start();
        }        
        if(isIdle){            
            super.playSpinAnimaton((Animation_Name.skill1_3),false,null,()=>{
                if(this.skill_queue.length>0){
                    super.setEnemyState(Enemy_State.standby);
                    this.startSkill(this.skill_queue.shift());
                }else{
                    this.startIdle();
                }
            });
        }
    }

    onDeath() {
        this.unscheduleAllCallbacks();
        super.playDeadAnimaton(Animation_Name.dead,()=>{
            this.removeAllDeBuff();
            this.removeAllBuff();
            if(this.shadow){
                cc.tween(this.shadow).to(0.75,{opacity:0}).start();
            }            
            cc.tween(this.node).to(0.75,{opacity:0}).call(()=>{
                this.removeAllDeBuff();
                this.removeAllBuff();
                MonsterManager.getInstance().destroyMonster(this.node,this.monster_type);
            }).start();
        })
        //GameManager.getInstance().sound_manager.playSound(SoundIndex.rewardBox2);
        this.destroyFire(false);
        //删除
        // if(this.boss_shield){
        //     this.boss_shield.destoryShield();
        // }        
    }

    onXuanYunResult(isXuanYun:boolean){
        if(isXuanYun){
            this.startXuanYun();
        }else{
            if(!super.isHaveDeBuffType(BuffType.Vertigo)){
                if(!super.getIsDie()){
                    if(this.skill_queue.length>0){
                        super.setEnemyState(Enemy_State.standby);
                        this.startSkill(this.skill_queue.shift());
                    }else{
                        this.startIdle();
                    }
                }
            }
        }
    }

    startXuanYun(){
        this.destroyFire(false);
        super.playSpinAnimaton(Animation_Name.hurt1,false,null,()=>{
            if(super.isHaveDeBuffType(BuffType.Vertigo)&&!super.getIsDie())
                this.spine.paused=true;                
        });
    }
    
    update(dt)
    {
        if((GameManager.getInstance().cur_game_state!=GameState.Game_Playing)||this.getIsDie())
        {
            return;
        }
        super.update(dt);
        this.checkSkill(dt);
        this.checkYinDao(dt);
        if(this.getEnemyState()!=Enemy_State.skill){
            if(!this.isHaveDeBuff(BuffId.Hero_XuanYun)){
                this.checkAtt(dt);
            }
        }
    }

    checkYinDao(dt:number){
        if(this.is_yindao){                        
            if(this.fire_node){
                let walls=WallManager.getInstance().getAllWall();
                let attWall=null;
                walls.forEach((wall:Wall,wallType:WallType)=>{
                    //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
                    if(this.node.y>=wall.getWallMaxYY()){                
                        attWall=wall;
                    }
                })
                if(attWall){
                    let distance=super.getAttPos().y-attWall.getWallMaxYY();
                    let maxScale=distance/this.once_distance+1;
                    //根据距离算出缩放值，最小1倍，最大6倍
                    if(this.fire_node.scale>=maxScale){
                        this.fire_node.scale=maxScale;
                        this.yindao_jishu+=dt;
                        if(this.yindao_jishu>=0.2){
                            this.yindao_jishu=0;
                            this.fireDamage(attWall);
                        }
                    }else{
                        this.fire_node.scale+=this.scale_speed*dt;
                    }                    
                }
                
            }
            this.yindao_time-=dt;
            if(this.yindao_time<=0){
                this.yindao_time=0;
                this.destroyFire(true);
            }
        }
    }

    /**技能检测 */
    checkSkill(dt:number){
        for(let i=0; i<2; i++){            
            if(this.skill_cold_down[i]>0){
                this.skill_cold_down[i]-=dt;
                // if(i==1){
                //     //激活类技能不在此释放，只计算冷却
                //     continue;
                // }
                // if(this.skill_cold_down[i]<0){
                //     this.skill_cold_down[i]=0;
                //     this.startSkill(i+1);
                // }                
            }            
        }                
    }

    /**攻击计算 */
    checkAtt(dt:number){        
        this.att_jishu+=dt;
        if(this.att_jishu>=this.att_jiange){
            this.att_jishu=this.att_jiange;
            this.startAttack();
        }else{
            //this.moving(dt);
        }
    }
    
}
