
import { JiaSu } from "../Constants";
import { GameEffectId, GameEffectsManager } from "../Game/GameEffectsManager";
import GameManager from "../GameManager";
import { MonsterConfigureManager } from "../Monster/Data/MonsterConfigure";
import MonsterManager from "../Monster/MonsterManager";
import { SoundIndex } from "../Sound/AudioConstants";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BossManager extends cc.Component {

    private static _instance: BossManager = null;


    public static getInstance():BossManager
    {
        if(this._instance==null)
        {
            let node=new cc.Node();
            cc.director.getScene().getChildByName("Canvas").addChild(node);
            this._instance=node.addComponent(BossManager);
        }
        return this._instance;
    }

    onLoad() {
        if(!BossManager._instance)
        {
            BossManager._instance=this;
        }
        //可以根据关卡数先预加载boss相关的数据
        //cc.resources.load('boss/bosscoming');
        //cc.resources.load('boss/boss1');
    }

    onDestroy() {
        BossManager._instance=null;
    }

    addBoss(monsterId:number,level:number,hpRate:number){
        //加载对应的boss
        //显示开场动画
        this.showBossComing(monsterId,()=>{
            //播放完成
            cc.log("播放完成，生成boss");
            this.showBoss(monsterId,level,hpRate);
        });
    }
    
    private showBossComing(monsterId:number,endCallback:Function){
        let node=GameEffectsManager.getInstance().createGameEffectForParent(GameEffectId.boss_coming,cc.v2(0,0),cc.find("Canvas/Ui_Root"));
        let bossSkin=this.getBossSkin(monsterId);
        let spNode=node.getChildByName('bosscoming');
        let sps=spNode.getComponent(sp.Skeleton);
        sps.setAnimation(0,"bosscoming",false);
        sps.setSkin(bossSkin);
        sps.setCompleteListener(()=>{
            endCallback();
            GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.boss_coming,node);
        });
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_EnemyComing);
    }

    showBoss(monsterId:number,level:number,hpRate:number){
        //console.log("___________Boss")
        MonsterManager.getInstance().createMonsterById(monsterId,GameManager.getInstance().getFightCenter(),level,hpRate,true);
    }

    private getBossSkin(monsterId:number):string{
        let bossType=6;
        switch(monsterId){
            case 30381:{
                bossType=6;
            }break;
            case 30391:{
                bossType=7;
            }break;
            case 30801:{
                bossType=8;
            }break;
            case 30811:{
                bossType=9;
            }break;
            case 30821:{
                bossType=10;
            }break;
            case 30831:{
                bossType=11;
            }break;
            case 30841:{
                bossType=12;
            }break;
            case 30851:{
                bossType=13;
            }break;
            case 30861:{
                bossType=14;
            }break;
            case 30871:{
                bossType=15;
            }break;
            default:{
                bossType=6;
            }break;
        }
        return "Boss"+bossType;
    }
}
