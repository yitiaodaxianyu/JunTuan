import { Go_Type } from "../Constants";
import GameManager from "../GameManager";
import { RewardData } from "../JsonData/LevelJsonData";
import LanguageManager from "../multiLanguage/LanguageManager";
// import { SpiritMessageManager } from "../Pet/Data/SpiritMessage";
import { PetManager } from "../Pet/PetManager";
import { ItemManager } from "../Prop/Data/Item";
import { PropAction } from "../Prop/PropConfig";
import { PropManager } from "../Prop/PropManager";
import { SoundIndex } from "../Sound/AudioConstants";
import TutorailsManager from "../Tutorials/TutorailsManager";

const {ccclass, property} = cc._decorator;

export enum WishingItemState{
    Close = 1,
    Opened = 2,
    Openning = 3,
}

@ccclass
export default class WishingItemUi extends cc.Component {

    state:WishingItemState = WishingItemState.Close;
    rewardData:RewardData = null;
    initItem(rewardData:RewardData){
        this.rewardData = rewardData;
        this.state = WishingItemState.Close;
        if(ItemManager.getInstance().getJsonItem(rewardData.reward_id).Type == 7){
            // 宠物显示
            // this.node.getChildByName("Card_Font").getComponent(cc.Sprite).spriteFrame = 
            // PetManager.getInstance().getSpriteFrameByName("Sprite_Avatar_" + PetManager.getInstance().getPetId(rewardData.reward_id));
            // this.node.getChildByName("Sprite_Up_Quality_1").getComponent(cc.Sprite).spriteFrame = 
            // PetManager.getInstance().getSpriteFrameByName("Sprite_Up_Quality_" + 
            // SpiritMessageManager.getInstance().getInitialQuality(PetManager.getInstance().getPetId(rewardData.reward_id)));
            let label = this.node.getChildByName("name")
            label.getComponent(cc.Label).string = LanguageManager.getInstance().
            getStrByTextId(ItemManager.getInstance().getNameTextId(rewardData.reward_id))
            label.color = PropManager.getInstance().getPropQualityTextColor
            (ItemManager.getInstance().getQuality(rewardData.reward_id));
            // console.log("宠物前图："+"Sprite_Avatar_" + this.getPetId(rewardData.reward_id));
            // console.log("宠物质量："+"Sprite_Up_Quality_" + 
            // SpiritMessageManager.getInstance().getInitialQuality
            // (this.getPetId(rewardData.reward_id)),rewardData.reward_id);
            // console.log(this.node.getComponentInChildren(cc.Label).string,"宠物名字："+ LanguageManager.getInstance().getStrByTextId(ItemManager.getInstance().getNameTextId(rewardData.reward_id)),ItemManager.getInstance().getNameTextId(rewardData.reward_id));
        }else{
            // 道具显示
            this.node.getChildByName("Sprite_Up_Quality_1").active = false;
            let label = this.node.getChildByName("name")
            label.getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId
            (ItemManager.getInstance().getNameTextId(rewardData.reward_id));
            if(ItemManager.getInstance().getJsonItem(rewardData.reward_id).Type==5){
                let valueStr=24;
                let yushu=ItemManager.getInstance().getJsonItem(rewardData.reward_id).ItemID%10-1;
                if(yushu<=4){
                    valueStr=Math.pow(2,yushu);
                }
                if(valueStr == 16) valueStr = 24;
                label.getComponent(cc.Label).string=label.getComponent(cc.Label).string.replace('~',valueStr.toString());
                // detailStr=detailStr.replace('~',valueStr.toString());
            }
            label.color = PropManager.getInstance().getPropQualityTextColor
            (ItemManager.getInstance().getQuality(rewardData.reward_id));
            label.getComponent(cc.LabelOutline).color = PropManager.getInstance().
            getPropQualityTextOutlineColor();
            let item = PropManager.getInstance().createPropItem
            (rewardData.reward_id,rewardData.reward_num,PropAction.Null);
            let type=ItemManager.getInstance().getType(rewardData.reward_id);
            if(type != 3){
                item.getComponent(cc.Sprite).enabled = false;
            }else{
                item.getChildByName('bg').getComponent(cc.Sprite).enabled = false;
            }
            item.parent = this.node.getChildByName("Card_Font");
            item.scale = 1.5;
            item.setPosition(cc.v3(0,0,0));
        }

        this.node.getChildByName("Card_Back").on(cc.Node.EventType.TOUCH_END,this.openCard,this)
        // if(TutorailsManager.getInstance().isShowTutorials(212)){
        //     this.openCard();
        // }
    }

    openCard(){
        if(this.state == WishingItemState.Close){
            this.state = WishingItemState.Openning;
            let anim = this.getComponent(cc.Animation)
            anim.enabled = true;
            GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Fanka);
            switch(ItemManager.getInstance().getQuality(this.rewardData.reward_id)){
                case 0:
                    anim.play("card_common");
                    break;
                case 1:
                    anim.play("card_green");
                    break;
                case 2:
                    anim.play("card_blue");
                    break;
                case 3:
                    anim.play("card_purple");
                    break;
                case 4:
                    anim.play("card_sp");
                    let backAnim = this.node.getChildByName("backEffect").getComponent(cc.Animation);
                    backAnim.enabled = true;
                    backAnim.play("card_sp_back");
                    break;
                case 5:
                    anim.play("card_red");
                    let bbackAnim = this.node.getChildByName("backEffect").getComponent(cc.Animation);
                    bbackAnim.enabled = true;
                    bbackAnim.play("card_red_back");
                    break;
            }
        }
    }

    overOpen(){
        this.state = WishingItemState.Opened;
          
    }

    showBackEffect(){
        let backAnim = this.node.getComponentInChildren(cc.Animation);
        backAnim.enabled = true;
        backAnim.play("car_common_back");
    }



}
