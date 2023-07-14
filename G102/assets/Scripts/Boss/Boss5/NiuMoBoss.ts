import { GameState } from "../../Constants";
import { Enemy_State } from "../../Enemy/EnemyConfig";
import { GameEffectsManager, GameEffectId } from "../../Game/GameEffectsManager";
import GroundManager from "../../Game/GroundManager";
import GameManager from "../../GameManager";
import { BuffData } from "../../Hero/Game/BuffData";
import { DamageType, BuffId, BuffType } from "../../Hero/Game/HeroConfig";
import Monster from "../../Monster/Monster";
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
    skill1 = "Skill1",          //-- 技能1
    skill2_1 = "Skill2_1",          //-- 技能2-1开始蓄力
    skill2_2 = "Skill2_2",          //-- 技能2-2蓄力
    skill2_3 = "Skill2_3",          //-- 技能2-3蓄力结束
    dead= "Dead",   //死亡
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class NiuMoBoss extends Boss {
    
    is_active_skill_2:boolean=false;
    attack_num:number=0;
    /**是否处于引导中 */
    is_yindao:boolean=true;
    yindao_time:number=0;
    /**引导的计数 */
    yindao_jishu:number=0;
    kuangbao_value:number[]=[];
    /**牛头勇士10481,牛头战士10461,牛头飞刀手10471,牛头萨满20691,牛头将军20681 */
    zhaohuan_id:number[]=[10481,10461,10471,20691,20681];
    /**（3个牛头勇士，8个牛头战士,3个牛头飞刀手,1个牛头萨满，1个牛头将军）" */
    zhaohuan_num:number[]=[3,8,3,1,1];
    /**当前的召唤索引 */
    cur_zhaohuan_index:number=0;
    cur_zhaohuan_num:number=0;

    onLoad(): void {
        super.onLoad();
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss5_normal_attack_hit,1);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss5_skill_baozha,1);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss5_skill_release,1);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster_zhaohuan,4);
        for(let i=0; i<this.zhaohuan_id.length; i++){
            MonsterManager.getInstance().addMonsterPool(this.zhaohuan_id[i],2);
        }
        this.addDeathCallback(this.onDeath);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addBossInitedListen(this.onBossInited);
        this.addChangeBossHpListen(this.onChangeHp);
    }

    onBossInited(): void {
        this.startIdle();
        this.node.y=128;
        this.attack_num=0;
        let distance=this.getAttPos().y-WallManager.getInstance().getMainWall().getWallMaxYY()        
    }

    onChangeHp(num:number){
        if(this.cur_hp<=this.max_hp/2){
            if(this.is_active_skill_2==false){
                this.is_active_skill_2=true;
                this.startSkill(2);
            }           
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
            GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Boss5Attack);
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
                    GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss5_normal_attack_hit,cc.v2(Math.random()*640-320,attWall.getWallMaxYY()));
                } 
            }            
            if(this.attack_num>=this.skill_data.getSkillValue4(1)){
                //加入技能1
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
    
    //冲击波
    startSkill1(){
        let skillNo=1;
        let skillIndex=skillNo-1;
        this.skill_cold_down[skillIndex]=this.skill_data.getSkillColdDown(skillNo);        
        if(super.getEnemyState()!=Enemy_State.att&&super.getEnemyState()!=Enemy_State.skill){
            if(!super.isHaveDeBuff(BuffId.Hero_XuanYun)){
                super.setEnemyState(Enemy_State.skill);
                this.skill_cold_down[skillIndex]=this.skill_data.getSkillColdDown(skillNo);
                let data=new KeyFrameData();
                data.name='Skill';
                data.callback=()=>{
                    GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Boss5Skill);
                    this.att_jishu=0;
                    let pos=super.getAttPos()
                    let baozha=GroundManager.getInstance().createGameEffectById(GameEffectId.boss5_skill_baozha,pos);
                    let fire=GroundManager.getInstance().createGameEffectById(GameEffectId.boss5_skill_release,pos);
                    WallManager.getInstance().getMainWall().beInjured(super.getAttData(DamageType.Skill,false,this.skill_data.getSkillValue1(1)));
                    //鼓舞buff
                    let monsters=MonsterManager.getInstance().getMonstersForMonsterPos(-1,this.node.getPosition(),this.skill_data.getSkillValue2(1));
                    if(monsters){
                        for(let i=0; i<monsters.length; i++){
                            let monsterTs=monsters[i].getComponent(Monster);
                            if(monsterTs){
                                let buffData=new BuffData();
                                buffData.buff_value=[this.skill_data.getSkillValue3(1)];
                                buffData.buff_id=BuffId.Boss5_Skill_1_guwu;
                                buffData.buff_type=BuffType.MoveSpeedUp;
                                buffData.remain_time=3;
                                monsterTs.addBuff(buffData);
                            }
                        }
                    }
                }
                super.playSpinAnimaton((Animation_Name.skill1),false,data,()=>{
                    if(this.skill_queue.length>0){
                        super.setEnemyState(Enemy_State.standby);
                        this.startSkill(this.skill_queue.shift());
                    }else{
                        this.startIdle();
                    }
                })
            }else{
                if(this.skill_queue.indexOf(skillNo)<0){
                    this.skill_queue.push(skillNo);
                }
            }
        }else{
            if(this.skill_queue.indexOf(skillNo)<0){
                this.skill_queue.push(skillNo);
            }
        }
    }

    //召唤
    startSkill2(){
        let skillNo=2;
        let skillIndex=skillNo-1;
        this.skill_cold_down[skillIndex]=this.skill_data.getSkillColdDown(skillNo);
        if(super.getEnemyState()!=Enemy_State.att){
            if(!super.isHaveDeBuff(BuffId.Hero_XuanYun)){
                GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Boss5Beidong);
                super.setEnemyState(Enemy_State.skill);
                this.skill_cold_down[skillIndex]=this.skill_data.getSkillColdDown(skillNo);
                super.playSpinAnimaton((Animation_Name.skill2_1),false,null,()=>{
                    super.playSpinAnimaton((Animation_Name.skill2_2),true,null,null);
                    this.is_yindao=true;
                    this.yindao_time=0.5*6;
                    this.cur_zhaohuan_index=0;
                    this.cur_zhaohuan_num=0;
                    //引导召唤
                })
            }else{
                if(this.skill_queue.indexOf(skillNo)<0){
                    this.skill_queue.push(skillNo);
                }
            }
        }else{
            if(this.skill_queue.indexOf(skillNo)<0){
                this.skill_queue.push(skillNo);
            }
        }
    }

    /**开始召唤 */
    startZhaoHuan(){
        if(this.cur_zhaohuan_num>16){
            return;
        }
        let id=this.zhaohuan_id[this.cur_zhaohuan_index];
        let num=this.zhaohuan_num[this.cur_zhaohuan_index];
        //半径
        let rr=256;
        let onceRadian=Math.PI*2/15;//16个怪
        for(let i=0; i<num; i++){
            let xx=Math.cos(onceRadian*(this.cur_zhaohuan_num))*rr+this.node.x;
            let yy=Math.sin(onceRadian*(this.cur_zhaohuan_num))*rr+this.getCenterPos().y;
            MonsterManager.getInstance().createSummonMonster(id,this.monster_level,cc.v2(xx,yy));
            
            this.cur_zhaohuan_num++;
        }
        this.cur_zhaohuan_index++;
        if(this.cur_zhaohuan_index>=this.zhaohuan_id.length){
            this.cur_zhaohuan_index=0;
        }
    }

    endYinDao(isIdle){
        this.is_yindao=false;
        if(isIdle){
            super.playSpinAnimaton((Animation_Name.skill2_3),false,null,()=>{
                this.startIdle();
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
        this.endYinDao(false);
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
            this.yindao_time-=dt;
            if(this.yindao_time<=0){
                this.yindao_time=0;
                this.endYinDao(true);
            }
            this.yindao_jishu+=dt;
            if(this.yindao_jishu>=0.5){
                this.yindao_jishu=0;
                this.startZhaoHuan();
            } 
        }
    }

    /**技能检测 */
    checkSkill(dt:number){
        for(let i=0; i<2; i++){
            if(i==1){
                //第二个技能
                if(this.is_active_skill_2==false){
                    continue;
                }
            }
            if(this.skill_cold_down[i]>0){
                this.skill_cold_down[i]-=dt;
                if(this.skill_cold_down[i]<0){
                    this.skill_cold_down[i]=0;
                    this.startSkill(i+1);
                }                
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
