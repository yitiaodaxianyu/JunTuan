import { GameEffectsManager, GameEffectId } from "../../Game/GameEffectsManager";
import { KeyFrameData, StrengthType } from "../MonsterData";
import MonsterManager from "../MonsterManager";
import MonsterNewNormal from "../MonsterNewNormal";


const {ccclass, property} = cc._decorator;

@ccclass
export default class BigSlim extends MonsterNewNormal {



    onLoad () {
        super.onLoad();
        super.addDeathCallback(this.onDeath);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster70_silaimu_qq,6);
        MonsterManager.getInstance().addMonsterPool(10491,6);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster_zhaohuan,4);
    }

    onDeath(){

        //先播放动画
        let anima=this.spine.setAnimation(0,"Side_Dead",false);
        this.spine.setTrackEventListener(anima,(entry: sp.spine.TrackEntry, event) =>{
            if(event.data.name=="Dead"){
                this.deathFinish();
            }
        })
        this.spine.setTrackCompleteListener(anima,(entry: sp.spine.TrackEntry, event) =>{
            anima.listener=null;
            this.removeAllDeBuff();
            this.shadow.opacity=0;
            this.node.opacity=0;
            let die=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.monster_die,super.getCenterPos());
            die.scale=0.8;
            MonsterManager.getInstance().destroyMonster(this.node,this.monster_type,false);
        })        
    }

    deathFinish(){
        this.removeAllDeBuff();
        //生成小史莱姆        
        //半径
        let pos=this.getCenterPos();
        let rr=200;
        let onceRadian=Math.PI/5;//6个怪
        for(let i=0; i<6; i++){
            let xx=Math.cos(onceRadian*i)*rr+pos.x;
            let yy=Math.sin(onceRadian*i)*rr+pos.y;
            //小泡泡
            let paopao=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.monster70_silaimu_qq,pos)
            let endPos=cc.v2(xx,yy)
            cc.tween(paopao).then(cc.jumpTo(0.5,endPos,yy-pos.y+50,1)).call(()=>{
                MonsterManager.getInstance().createSummonMonster(10491,this.monster_level,endPos); 
                GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.monster70_silaimu_qq,paopao);
            }).start();
        }
    }

    // update (dt) {}
}
