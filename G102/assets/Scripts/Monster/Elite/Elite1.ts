

import { GameState } from "../../Constants";
import { Enemy_State } from "../../Enemy/EnemyConfig";
import { GameEffectId, GameEffectsManager } from "../../Game/GameEffectsManager";
import GameManager from "../../GameManager";
import { DamageType } from "../../Hero/Game/HeroConfig";
import MyTool from "../../Tools/MyTool";
import Wall from "../../Wall/Wall";
import { WallType } from "../../Wall/WallConfig";
import WallManager from "../../Wall/WallManager";
import { KeyFrameData } from "../MonsterData";
import MonsterNewNormal from "../MonsterNewNormal";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Elite1 extends MonsterNewNormal {

    chongci_juli:number=0;
    is_chongci:boolean=false;
    is_xuli:boolean=false;
    chong_ci_speed:number=1000;
    jiasu:number=200;
    cur_jiasu:number=0;
    is_release_skill:boolean=false;

    protected onLoad(): void {
        super.onLoad();  
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster37_shitouren,1);
        super.addMonsterNormalInited(this.onMonsterNormalInited);
        this.addXuanYunListen(this.onXuanYunResult);
    }

    onMonsterNormalInited () {
        this.chongci_juli=this.skill_data.getCastingRange(1);
        this.is_chongci=false;
        this.cur_jiasu=0;
        this.is_release_skill=false;
    }

    onXuanYunResult(isXuanYun: boolean): void {
        if(isXuanYun){
            this.startXuanYun();
        }else{
            if(!super.getIsDie()){
                this.startIdle();
                this.setEnemyState(Enemy_State.move);
            }
        }
    }

    startXuanYun(): void {
        this.unschedule(this.startChongCi);
        this.is_xuli=false;
    }

    startSkill(){
        this.setEnemyState(Enemy_State.skill);
        //蓄力
        super.playSpinAnimaton("Side_Skill1_1",true,null,null);
        this.is_xuli=true;
        this.scheduleOnce(this.startChongCi,3);
        this.is_release_skill=true;
    }

    startChongCi(){
        if(this.is_xuli==true){
            this.is_xuli=false;
            this.is_chongci=true;
            this.cur_toughness+=1;
            //冲刺
            super.playSpinAnimaton("Side_Skill1_2",true,null,null);
        }        
    }

    endChongCi(wall:Wall){
        this.cur_toughness-=1;
        this.is_chongci=false;
        super.playSpinAnimaton("Side_Skill1_3",false,null,()=>{
            this.startIdle();
            this.setEnemyState(Enemy_State.move);
        });
        let data=wall.beInjured(this.getAttData(DamageType.Skill,false,this.skill_data.getSkillValue1(1)));
        if(data.getDamageNum()>0){
            GameEffectsManager.getInstance().createGameEffectById(GameEffectId.monster37_shitouren,cc.v2(this.node.x,wall.getWallMaxYY()));
        }
        cc.tween(this.node).by(0.2,{y:this.base_data.AttackDistance}).start();
        MyTool.randomSceneShakeSmall();
    }

    update (dt) {
        if((GameManager.getInstance().cur_game_state!=GameState.Game_Playing)||this.getIsDie())
        {
            return;
        }
        super.update(dt);
        //this.checkSkill(dt);
        
    }

    checkSkill(dt:number){
        if(this.getEnemyState()!=Enemy_State.skill){
            if(this.is_release_skill==true){
                return;
            }
            let walls=WallManager.getInstance().getAllWall();
            let attWall=null;
            walls.forEach((wall:Wall,wallType:WallType)=>{
                //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
                let distance=Math.abs(this.node.y-wall.getWallMaxYY());
                if(this.node.y>=wall.getWallMaxYY()&&distance<=this.chongci_juli&&distance>this.base_data.AttackDistance){                
                    attWall=wall;
                }
            });
            if(attWall){
                this.startSkill();
            }
        }else{
            if(this.is_chongci){
                this.cur_jiasu+=dt*this.jiasu;
                this.node.y-=dt*(this.chong_ci_speed+this.cur_jiasu);
                let walls=WallManager.getInstance().getAllWall();
                let attWall=null;
                walls.forEach((wall:Wall,wallType:WallType)=>{
                    //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
                    if(this.node.y>=wall.getWallMaxYY()&&Math.abs(this.node.y-wall.getWallMaxYY())<=this.base_data.AttackDistance/2){
                        attWall=wall;
                    }
                });
                if(attWall){
                    this.endChongCi(attWall);
                }else{
                    let mainWall=WallManager.getInstance().getMainWall();
                    if(this.node.y<=mainWall.getWallMaxYY()){
                        this.endChongCi(mainWall);
                    }
                }
            }
        }
    }


}
