import { GameMode } from "../../Constants";
import GameManager from "../../GameManager";
import { HeroManager } from "../../Hero/Data/HeroManager";
import { Hero_Type } from "../../Hero/Game/HeroConfig";
import { SoundIndex } from "../../Sound/AudioConstants";
import { EventManager, RedEventString, RedEventType } from "../../Tools/EventManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class BtnTeam extends cc.Component {

    @property()
    team_index:number=0;

    icon:cc.Node=null;

    protected onLoad(): void {
        this.icon=this.node.getChildByName('mask').getChildByName('icon');
        this.refreshData();
    }
    /**刷新通用数据 */
    refreshData(){
        //获取需要设置的节点
        
        let iconSp=this.icon.getComponent(cc.Sprite);
        let plus=this.node.getChildByName('plus');
        //获取编队信息
        let teamList=HeroManager.getInstance().getTeamList(GameManager.getInstance().cur_game_mode);
        //只管刷新自己当前位置的信息
        let heroType=teamList[this.team_index];
        if(heroType>Hero_Type.NULL){
            this.icon.active=true;
            plus.active=false;
            iconSp.spriteFrame=HeroManager.getInstance().getSpriteFrameByName('hero'+heroType);
        }else{
            this.icon.active=false;
            plus.active=true;
        }
        if(GameManager.getInstance().cur_game_mode==GameMode.Main)
            EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Map_Team_0+this.team_index);
    }

    clickSelf(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
          
    }
    // update (dt) {}
}
