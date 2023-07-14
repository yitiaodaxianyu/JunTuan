import { GameState } from "../../Constants";
import { Enemy_State } from "../../Enemy/EnemyConfig";
import { GameEffectsManager, GameEffectId } from "../../Game/GameEffectsManager";
import GameManager from "../../GameManager";
import { BuffId } from "../../Hero/Game/HeroConfig";
import MyTool from "../../Tools/MyTool";
import Wall from "../../Wall/Wall";
import { WallType } from "../../Wall/WallConfig";
import WallManager from "../../Wall/WallManager";
import { KeyFrameData } from "../MonsterData";
import MonsterNewNormal from "../MonsterNewNormal";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Elite73 extends MonsterNewNormal {    

    is_skill_state:boolean=false;
    gou:cc.Node=null;
    is_gou_ok:boolean=false;
    /**铁链之间的间隔距离 */
    lian_jiange:number=65;
    lian_height:number=74;
    lian_jiaoji:number=-9;
    lian_root:cc.Node=null;
    /**勾的终点,勾的锚点 */
    dis_yy:number=-1000;
    gou_speed:number=4000;

    protected onLoad(): void {
        super.onLoad();
        super.addMonsterNormalInited(this.onMonsterNormalInited);
        super.addMonsterNormalXuanYun(this.onMonsterNormalXuanYun);
        super.addMonsterNormalDeath(this.onMonsterNormalDeath);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster73_skill_lian,8);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster73_skill_lian_root);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster73_skill_mao);
    }

    onMonsterNormalInited () {        
        this.dis_yy=-1000;
    }

    onMonsterNormalXuanYun(isXuanYun:boolean){
       
    }

    onMonsterNormalDeath(){
        this.is_skill_state=false;
        this.destroyLian();
    }

    startSkill(){
        //冷却完毕，可以判断是否可以出钩
        let walls=WallManager.getInstance().getAllWall();
        let attWall:Wall=null;
        let offsetYY=0;
        walls.forEach((wall:Wall,wallType:WallType)=>{
            //出钩满足大于80小于500.
            offsetYY=Math.abs(this.node.y-wall.getWallMaxYY());
            if(this.node.y>=wall.getWallMaxYY()&&offsetYY>80 && offsetYY<500){                
                let newYY=wall.getWallMaxYY()+80;
                if(newYY>this.dis_yy){
                    attWall=wall;
                    this.dis_yy=newYY;
                }
            }
        })
        
        if(attWall){
            this.setEnemyState(Enemy_State.skill);
            this.skill_cold_down[0]=this.skill_data.getSkillColdDown(1);
            let pos=this.getAttPos();
            let data=new KeyFrameData();
            data.name="Skill"
            data.callback=()=>{
                this.is_skill_state=true;
                this.skill_cold_down[0]=this.skill_data.getSkillColdDown(1);
                //链锁Root
                this.lian_root=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.monster73_skill_lian_root,pos);
                //出钩
                this.gou=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.monster73_skill_mao,pos);
                if(this.node.scaleX>0){
                    this.gou.angle=200;
                }else{
                    this.gou.angle=130;
                }
                //计算铁链数量
                let lianNum=Math.ceil(offsetYY/this.lian_jiange)+4;
                for(let i=0; i<lianNum; i++){
                    GameEffectsManager.getInstance().createGameEffectForParent(GameEffectId.monster73_skill_lian,cc.v2(0,i*65),this.lian_root);
                }
                this.lian_root.height=0;
                this.lian_root.angle=180;
            };
            super.playSpinAnimaton("Side_Skill_1",false,data,()=>{
                super.playSpinAnimaton("Side_Skill_2",true);
            })
            
        }         
    }

    endSkill(){
        this.is_skill_state=false;
        this.destroyLian();
        super.playSpinAnimaton("Side_Skill_3",false,null,()=>{
            if(this.getIsDie()==false){
                this.startIdle();
                this.setEnemyState(Enemy_State.move);
            }            
        })
    }

    destroyLian() {
        if(this.gou){
            GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.monster73_skill_mao,this.gou);
            this.gou=null;
        }
        if(this.lian_root){
            for(let i=this.lian_root.childrenCount-1; i>=0; i--){
                GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.monster73_skill_lian,this.lian_root.children[i]);
            }
            GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.monster73_skill_lian_root,this.lian_root);
            this.lian_root=null;
        }                                
    }

    onGouColliderWall(){
        this.is_gou_ok=true;
    }

    update(dt: any): void {
        super.update(dt);
        this.checkSkill(dt);
        if(this.is_skill_state&&GameManager.getInstance().cur_game_state==GameState.Game_Playing){
            if(this.gou){
                if(this.isHaveDeBuff(BuffId.Hero_MeiMo_Active_MeiHuo)){
                    this.onMonsterNormalXuanYun(true);
                    return;
                }
                let pos=super.getAttPos();
                if(this.gou.y<=this.dis_yy){
                    this.gou.y=this.dis_yy;
                    //跟随勾走
                    let offsetPos=this.gou.getPosition().sub(this.getAttPos());
                    let dir=Math.atan2(offsetPos.y,offsetPos.x);
                    this.node.y=this.node.y+Math.sin(dir)*dt*this.gou_speed/3;
                    this.node.x=this.node.x+Math.cos(dir)*dt*this.gou_speed/3;
                    pos=super.getAttPos();
                    let walls=WallManager.getInstance().getAllWall();
                    let attWall:Wall=null;
                    walls.forEach((wall:Wall,wallType:WallType)=>{
                        //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
                        if(this.node.y>=wall.getWallMaxYY()){                
                            attWall=wall;
                        }
                    })
                    //this.gou.setPosition(pos);                    
                    offsetPos=this.gou.getPosition().sub(pos);
                    this.lian_root.height=offsetPos.mag();
                    dir=Math.atan2(offsetPos.y,offsetPos.x);
                    this.lian_root.angle=MyTool.radianToAngle(dir)-90;
                    this.lian_root.setPosition(pos);
                    if(pos.y<=(attWall.getWallMaxYY()+80)){
                        this.endSkill();
                        return
                    }
                }
                else{                    
                    //钩要先走
                    this.gou.y-=dt*this.gou_speed;
                    //铁链
                    let offsetPos=this.gou.getPosition().sub(pos);
                    this.lian_root.height=offsetPos.mag();
                    let dir=Math.atan2(offsetPos.y,offsetPos.x);
                    this.lian_root.angle=MyTool.radianToAngle(dir)-90;
                    this.lian_root.setPosition(pos);
                    let walls=WallManager.getInstance().getAllWall();                    
                    walls.forEach((wall:Wall,wallType:WallType)=>{
                        //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
                        if(this.gou.y>=wall.getWallMaxYY()){                                            
                            let newYY=wall.getWallMaxYY()+80;
                            if(newYY>this.dis_yy){
                                this.dis_yy=newYY;
                            }
                        }
                    })
                }
                if((pos.y<=this.dis_yy)){
                    this.endSkill();
                    return;
                }
            }
        }
    }

    checkSkill(dt:number){
        for(let i=0; i<1; i++){            
            if(this.skill_cold_down[i]>0){
                this.skill_cold_down[i]-=dt;
                if(this.skill_cold_down[i]<0){
                    this.skill_cold_down[i]=0;
                    this.startSkill();
                }                
            }else{
                this.startSkill();
            }
        }
    }
}
