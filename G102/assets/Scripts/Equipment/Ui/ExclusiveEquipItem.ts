import { HeroManager } from "../../Hero/Data/HeroManager";
import { Hero_Type } from "../../Hero/Game/HeroConfig";
import { ExclusiveEnhancementManager } from "../../JsonData/ExclusiveEnhancement";
import { PropManager } from "../../Prop/PropManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ExclusiveEquipItem extends cc.Component {

    init(heroType:Hero_Type){

        // let data = HeroManager.getInstance().getHeroData(heroType);
        let PM=PropManager.getInstance();
        let itemData = ExclusiveEnhancementManager.getInstance().getJsonByHeroTypeAndWeaponLevel(heroType,HeroManager.getInstance().getExclusiveEquipLevel(heroType));
         //框
         let bg=this.node.getChildByName('bg');
         bg.getComponent(cc.Sprite).spriteFrame=PM.getSpByName("Item_frame_" + itemData.Quality);
        //icon
        let icon = this.node.getChildByName("icon")
        icon.getComponent(cc.Sprite).spriteFrame = PM.getSpByName("Exclusive_Weapon_" + heroType + "_1");

        this.node.getChildByName("levelNum").getComponent(cc.Label).string = "+" + HeroManager.getInstance().getExclusiveEquipLevel(heroType);
    }

}
