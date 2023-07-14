import { GameEffectId, GameEffectsManager } from "../../Game/GameEffectsManager";
import { GongJiData } from "../../Hero/Data/HeroData";
import GongJi from "../../Hero/Game/GongJi";
import Monster from "../../Monster/Monster";
import MonsterManager from "../../Monster/MonsterManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class FireRing extends GongJi {

    /**持续时间 */
    remain_time:number=0;
    /**伤害间隔 */
    damage_jiange:number=0;
    /**伤害计数 */
    damage_jishu:number=0;
    /**半径 */
    radius:number=0;
    game_effect_id:number=0;
    is_destroy:boolean=false;
    
    init(gameEffectId:GameEffectId,gjData:GongJiData,remainTime:number,radius:number,damageJiange:number){
        this.initData(gjData);
        this.game_effect_id=gameEffectId;
        this.remain_time=remainTime;
        this.radius=radius;
        this.damage_jiange=damageJiange;
        this.is_destroy=false;
        this.damage_jishu=0;
        this.checkDamage();
        //标准半径是100.
        this.node.scale=radius/100;
    }

    destroySelf(){
        if(this.is_destroy){
            return;
        }
        this.is_destroy=true;
        GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id,this.node);
    }

    checkDamage(){
        let monsters=MonsterManager.getInstance().getMonstersForCenterPos(-1,this.node.getPosition(),this.radius);
        if(monsters){            
            for(let i=0; i<monsters.length; i++){
                let monsterTs=monsters[i].getComponent(Monster);
                monsterTs.beFlashInjured(this.gongji_data);
            }
        }
    }

    update (dt:number) {
        if(this.remain_time>0){
            this.remain_time-=dt;
            this.damage_jishu+=dt;
            if(this.damage_jishu>=this.damage_jiange){
                this.damage_jishu=0;
                this.checkDamage();
            }
        }else{
            this.destroySelf();
        }
    }
}
