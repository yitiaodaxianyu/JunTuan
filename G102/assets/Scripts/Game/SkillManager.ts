import { GameEffectId, GameEffectsManager } from "./GameEffectsManager";
import MapNodePool from "./MapNodePool";
import GameManager from "../GameManager";
import { UIManager } from "../UI/UIManager";
import { JiaSu, SkillSpeedRate } from "../Constants";
import { SoundIndex } from "../Sound/AudioConstants";
import DamageRecord from "../Hero/Game/DamageRecord";


const {ccclass, property} = cc._decorator;

@ccclass
export default class SkillManager extends MapNodePool {

    private static _instance: SkillManager = null;
    /**是否处于释放技能的状态，用于自动战斗判断 */
    private is_skill_state:boolean=false;
    private damage_record:Map<number,DamageRecord>=null;
    private record_root:cc.Node=null;
    private skill_range:cc.Node=null;
    private de_lu_yi_ex:number=0;
    public static getInstance():SkillManager
    {
        return this._instance;
    }

    onLoad () {
        SkillManager._instance=this;
        this.damage_record=new Map<number,DamageRecord>();        
        this.record_root=this.node.getChildByName('record_root');
        this.skill_range=this.node.getChildByName('skill_range');
    }

    protected onDestroy(): void {
        super.onDestroy();
        this.damage_record.clear();
        SkillManager._instance=null;        
    }

    /**根据id创建一个特效*/
    public createGameEffectById(id:GameEffectId,pos:cc.Vec2):cc.Node
    {
        let node=GameEffectsManager.getInstance().createGameEffectForParent(id,pos,this.node);        
        return node;
    }

    releaseSkill(completeCallback:Function,heroNode:cc.Node){                 
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Xuli);
        this.setTimeStop(true);
        let commonAnima=this.createGameEffectById(GameEffectId.hero_skill_common,heroNode.getPosition().add(cc.v2(0,100))).getComponent(cc.Animation);
        commonAnima.node.zIndex=3;
        let commonState=commonAnima.play();
        commonState.speed=JiaSu;
        commonAnima.on(cc.Animation.EventType.FINISHED,()=>{
            commonAnima.off(cc.Animation.EventType.FINISHED);
            GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.hero_skill_common,commonAnima.node);
            completeCallback()
        });
        let uiTouch=UIManager.getInstance().node.getChildByName('ui_touch');
        if(uiTouch){
            let uiAnima=uiTouch.getComponent(cc.Animation).getAnimationState('ui_touch');
            if(uiAnima){
                uiAnima.speed=JiaSu;
            }
        }
        heroNode.setParent(this.node);
        heroNode.zIndex=2;
    }

    startBaiPing(){
        let bai=this.node.getChildByName('bai');
        bai.active=true;
        bai.opacity=255;
        cc.tween(bai).to(0.2*GameManager.getInstance().getGameRate(),{opacity:0}).start();
    }
    /**设置时停效果 */
    setTimeStop(isShow:boolean){
        this.node.getChildByName('bg').active=isShow;
        if(isShow){
            //1.添加蒙版,播放前奏动画,全部时停,放慢10000倍        
            GameManager.getInstance().setFightingRate(1/JiaSu);
            let bai=this.node.getChildByName('bai');
            bai.opacity=0;
            this.setIsSkillState(true);
        }else{
            GameManager.getInstance().setFightingRate(1);
        }
    }

    setIsSkillState(isSkill:boolean){
        this.is_skill_state=isSkill;
    }

    getIsSkillState():boolean{
        return this.is_skill_state;
    }

    /**3.0版本,设置技能状态 */
    releaseSkillResult(isCompelete:boolean){
        this.node.getChildByName('bg').active=!isCompelete;
        GameManager.getInstance().setFightingRate(isCompelete?1:1/SkillSpeedRate);
    }

    /**记录技能伤害 */
    recordDamage(id:number,value:number){
        if(this.damage_record.has(id)){
            this.damage_record.get(id).refreshValue(value);
        }else{
            let recorder=GameEffectsManager.getInstance().createGameEffectForParent(GameEffectId.skill_damage_record,cc.v2(0,-320),this.record_root);
            let damageRecord=recorder.getComponent(DamageRecord);
            damageRecord.init(GameEffectId.skill_damage_record,id,value,(id:number)=>{
                this.damage_record.delete(id);
            });
            this.damage_record.set(id,damageRecord);
            cc.tween(recorder).to(0.2,{x:0}).start();
        }
    }

    showSkillRange(posY:number,distance:number){
        this.skill_range.stopAllActions();
        this.skill_range.y=posY;
        this.skill_range.height=distance;
        this.skill_range.opacity=255;
        this.setSkillRange(true);
        //cc.tween(this.skill_range).to(0.2*GameManager.getInstance().getGameRate(),{opacity:255}).start();
    }

    setSkillRange(isCan:boolean){
        this.skill_range.color=isCan?cc.Color.WHITE:cc.Color.RED;
    }

    hideSkillRange(){
        this.skill_range.stopAllActions();
        this.skill_range.opacity=0;
        //cc.tween(this.skill_range).to(0.1*GameManager.getInstance().getGameRate(),{opacity:0}).start();
    }

    /**德鲁伊专武，伤害比率 */
    setDeLuYiEx(num:number){
        this.de_lu_yi_ex=num;
    }

    /**德鲁伊专武，伤害比率 */
    getDeLuYiEx():number{
        return this.de_lu_yi_ex;
    }
}
