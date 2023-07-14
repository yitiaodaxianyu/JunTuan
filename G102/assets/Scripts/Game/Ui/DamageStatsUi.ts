import GameManager from "../../GameManager";
import { HeroManager } from "../../Hero/Data/HeroManager";
import { Hero_Type } from "../../Hero/Game/HeroConfig";
import { SoundIndex } from "../../Sound/AudioConstants";
import StatsUi from "./StatsUi";
import UIComponent from "../../UI/UIComponent";



const {ccclass, property} = cc._decorator;

@ccclass
export default class DamageStatsUi extends UIComponent {

    // @property(cc.Prefab)
    // prefab_hero_stats:cc.Prefab=null;
    
    onLoad(): void {
        this.node.on(cc.Node.EventType.TOUCH_START,()=>{
            GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
            this.node.removeFromParent();
        },this);
    }

    protected start(): void {
        // this.showStats();
    }

    // showStats(){
    //     //队伍
    //     let hm=HeroManager.getInstance();
    //     let teamList=HeroManager.getInstance().getTeamList(GameManager.getInstance().cur_game_mode);
    //     let attStats=GameManager.getInstance().hero_attack_dps;
    //     let skillStats=GameManager.getInstance().hero_skill_dps;
    //     let maxDps=0;
    //     //先判断哪个是最高的
    //     for(let i=0; i<Hero_Type.Hero_Num; i++)
    //     {
    //         if(attStats[i]>maxDps)
    //         {
    //             maxDps=attStats[i];
    //         }
    //         if(skillStats[i]>maxDps)
    //         {
    //             maxDps=skillStats[i];
    //         }
    //     }
    //     let statsRoot=this.node.getChildByName('statsRoot');
    //     let bgHero=this.node.getChildByName('bgHero');
    //     for(let i=0; i<5; i++)
    //     { 
    //         let heroType=teamList[i];
    //         if(heroType>0)
    //         {
    //             let heroStats=cc.instantiate(this.prefab_hero_stats);
    //             statsRoot.addChild(heroStats);
    //             heroStats.x=bgHero.x;
    //             heroStats.y=bgHero.y-53*(i+1);
    //             let icon=heroStats.getChildByName('iconRoot').getChildByName('icon');
    //             icon.getComponent(cc.Sprite).spriteFrame=hm.getHeroSpriteFrame(heroType);
    //             let aNum=attStats[heroType];
    //             let sNum=skillStats[heroType];
    //             heroStats.getComponent(StatsUi).init(aNum,sNum,1,maxDps);
    //         }
    //     }
    // }

    clickBtnClose(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        super.onClose();
    }
    

}
