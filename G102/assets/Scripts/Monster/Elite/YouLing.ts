import { GameState } from "../../Constants";
import { Enemy_State } from "../../Enemy/EnemyConfig";
import { GameEffectsManager, GameEffectId } from "../../Game/GameEffectsManager";
import GameManager from "../../GameManager";
import { BuffId, DamageType } from "../../Hero/Game/HeroConfig";
import Wall from "../../Wall/Wall";
import { WallType } from "../../Wall/WallConfig";
import WallManager from "../../Wall/WallManager";
import { StrengthType } from "../MonsterData";
import MonsterNewNormal from "../MonsterNewNormal";


const {ccclass, property} = cc._decorator;

@ccclass
export default class YouLing extends MonsterNewNormal {

    is_release_skill:boolean=false;
    is_yindao:boolean=false;
    att_node:cc.Node=null;  
    yindao_num:number=0;
    add_damage_rate:number=0;
    cur_att_wall:Wall=null;
    light_speed:number=2000;
    light_jishu:number=0.2;

    protected onLoad(): void {
        super.onLoad();
        super.addMonsterNormalInited(this.onMonsterNormalInited);
        super.addMonsterNormalAttack(this.onMonsterNormalAttack);
        super.addMonsterNormalXuanYun(this.onMonsterNormalXuanYun);
        super.addMonsterNormalDeath(this.onMonsterNormalDeath);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster19_youling_skill);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster19_youling_skill_hit);
    }

    onMonsterNormalInited () {
        //设置为没放技能
        this.is_release_skill=false;
        this.is_yindao=false;
    }

    onMonsterNormalXuanYun(isXuanYun:boolean){
        if(isXuanYun){
            this.is_yindao=false;
            //this.unschedule(this.yindao)
            if(this.att_node){
                GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.monster19_youling_skill,this.att_node);
                this.att_node=null;
            }
        }
        
    }

    onMonsterNormalDeath(){
        this.is_yindao=false;
        //this.unschedule(this.yindao)
        if(this.att_node){
            GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.monster19_youling_skill,this.att_node);
            this.att_node=null;
        }
    }  

    /**怪物开始攻击，返回是否截获本次攻击 */
    onMonsterNormalAttack ():boolean {
        if(this.is_release_skill==false){
            this.is_release_skill=true;
            //改放技能
            this.is_yindao=true;
            this.startSkill();
            return true
        }else{
            if(this.is_yindao){
                return true;
            }
            return false
        }        
    }

    startSkill(){
        let walls=WallManager.getInstance().getAllWall();
        let attWall=null;
        walls.forEach((wall:Wall,wallType:WallType)=>{
            //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
            if(this.node.y>=wall.getWallMaxYY()&&Math.abs(this.node.y-wall.getWallMaxYY())<=this.base_data.AttackDistance){                
                attWall=wall;
            }
        })
        this.cur_att_wall=attWall;
        super.setEnemyState(Enemy_State.skill);
        super.playSpinAnimaton(('Side_Skill_Start'),false,null,()=>{
            super.playSpinAnimaton(("Side_Skill_Loop"),true);
            if(super.getIsDie()==false){
                //this.schedule(this.yindao,0.2);
                //播放动画
                let pos=super.getAttPos()
                this.att_node=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.monster19_youling_skill,pos);
                this.att_node.height=0;
                // let disYY=0;
                // if(this.cur_att_wall){
                //     disYY=this.cur_att_wall.getWallMaxYY()+16;
                // }else{
                //     disYY=GameManager.getInstance().enemy_att_y+16;
                // }
                //let distance=pos.y-disYY;
                //cc.tween(this.att_node).to(0.2,{height:distance}).start();
                this.att_node.angle=180;
            }
            
        })
    }

    destroyYinDao(){
        this.is_yindao=false;
        //还原释放技能
        this.is_release_skill=false;
        this.yindao_num=0;
        this.startIdle();
        this.setEnemyState(Enemy_State.move);
        if(this.att_node){
            GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.monster19_youling_skill,this.att_node);
            this.att_node=null;
        }
    }

    lightDamage(wall:Wall){
        if(GameManager.getInstance().cur_game_state==GameState.Game_Playing){
            //播放动画
            let pos=cc.v2(super.getAttPos().x,wall.getWallMaxYY()-32);
            GameEffectsManager.getInstance().createGameEffectById(GameEffectId.monster19_youling_skill_hit,pos);
            wall.beRealDamage(DamageType.Skill,StrengthType.Elite,wall.getMaxHp()*(0.001+this.add_damage_rate));
            this.yindao_num++;
            if(this.yindao_num%2==0){
                this.add_damage_rate+=0.001;
                if(this.add_damage_rate>0.004){
                    this.add_damage_rate=0.004;
                }
            }
        }
    }
    
    update(dt: any): void {
        super.update(dt);
        if(this.is_yindao&&GameManager.getInstance().cur_game_state==GameState.Game_Playing){
            if(this.att_node){
                if(this.isHaveDeBuff(BuffId.Hero_MeiMo_Active_MeiHuo)){
                    this.onMonsterNormalXuanYun(true);
                    return;
                }
                this.att_node.setPosition(super.getAttPos());
                let walls=WallManager.getInstance().getAllWall();
                let attWall:Wall=null;
                walls.forEach((wall:Wall,wallType:WallType)=>{
                    //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
                    if(this.node.y>=wall.getWallMaxYY()){                
                        attWall=wall;
                    }
                })
                if(Math.abs(this.node.y-attWall.getWallMaxYY())>=(this.base_data.AttackDistance+200)){
                    this.destroyYinDao();
                    return;
                }
                if(attWall){
                    let distance=super.getAttPos().y-attWall.getWallMaxYY()+16;
                    if(this.att_node.height>=distance){
                        this.att_node.height=distance;
                        this.light_jishu+=dt;
                        if(this.light_jishu>=0.2){
                            this.light_jishu=0;
                            this.lightDamage(attWall);
                        }
                    }else{
                        this.att_node.height+=this.light_speed*dt;
                    }
                }
                
            }
        }
    }
}
