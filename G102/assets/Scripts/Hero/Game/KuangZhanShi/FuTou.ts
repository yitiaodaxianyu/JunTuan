
import { GameEffectsManager, GameEffectId } from "../../../Game/GameEffectsManager";
import Monster from "../../../Monster/Monster";
import { FeedBackType } from "../../../Monster/MonsterData";
import { GongJiData } from "../../Data/HeroData";
import Bullect from "../Bullect";
import { JianShi_Type, SkillType } from "../HeroConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FuTou extends Bullect {


    /**原来的增伤数值 */
    kuangre_num:number=0;
    is_penetrate:boolean=false;
    futou_type:number=0;
    real_damage_num=0;
    penetration_num:number=0;
    old_skill_rate:number=0;

    onLoad(): void {
        super.onLoad();
        super.addCollisionMonsterListen(this.onCollisionMonster);
        super.addInitFinishedListen(this.onInitFinished);
    }
    
    onInitFinished(){
        this.node.angle=0;
        this.node.stopAllActions();
        cc.tween(this.node).by(1,{angle:-1440}).repeatForever().start();
        this.penetration_num=0;
        this.old_skill_rate=this.gongji_data.skill_damage_rate;
    }

    initFuTou(kuangreNum:number,isP:boolean,futouType:number): void {
        this.kuangre_num=kuangreNum;
        this.is_penetrate=isP;
        this.futou_type=futouType;
        this.real_damage_num=this.gongji_data.hero_data.total_attack*this.gongji_data.hero_data.getSkillValue1(SkillType.Passive_1)*this.kuangre_num;
    }

    ////--------------------------------------碰撞开始----------------------------------------------------
    onCollisionMonster(monsterTs:Monster) {
        if(monsterTs){
            switch(this.futou_type){
                case 0:{
                    let data=monsterTs.beFlashInjured(this.gongji_data);
                    if(data.getDamageNum()>0){
                        //额外真伤
                        if(data.is_die==false&&this.kuangre_num>0){
                            monsterTs.beRealDamage(this.gongji_data,this.real_damage_num)
                        }
                        //本次攻击有效
                        GameEffectsManager.getInstance().createGameEffectById(GameEffectId.kuangzhanshi_attack_hit,this.getHeadPos());
                    }                    
                    this.is_att=true;
                    this.destroySelf();
                }break;
                case 1:{
                    this.is_att=false;
                    //被动技能1的箭矢，可以穿透，并且首个目标伤害增加
                    if(this.penetration_num==0){
                        this.gongji_data.skill_damage_rate=1;
                    }else{
                        this.gongji_data.skill_damage_rate=this.old_skill_rate;
                    }
                    this.is_att=false;
                    this.penetration_num++;
                    let data=monsterTs.beFlashInjured(this.gongji_data);
                    if(data.getDamageNum()>0){
                        //额外真伤
                        if(data.is_die==false&&this.kuangre_num>0&&this.penetration_num==0){
                            monsterTs.beRealDamage(this.gongji_data,this.real_damage_num)
                        }
                        //本次攻击有效
                        GameEffectsManager.getInstance().createGameEffectById(GameEffectId.kuangzhanshi_attack_chuantou,this.getHeadPos());
                    }
                }break;
            }            
        }
    }
}
