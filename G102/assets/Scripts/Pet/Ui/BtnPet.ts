import { PetInfo } from "../PetConfig";
import { PetManager } from "../PetManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BtnPet extends cc.Component {

    pet_info: PetInfo = null;
    icon:cc.Node=null;
    @property()
    team_index:number=0;

    init(petInfo: PetInfo) {
        let content = this.node.getChildByName("content");
        content.active = true;
        this.pet_info = petInfo;
        this.icon = content.getChildByName("iconMask");
        this.icon.active = true;
        // this.icon.getChildByName('icon').getComponent(cc.Sprite).spriteFrame = PetManager.getInstance().getSpriteFrameByName('Sprite_Avatar_' + this.pet_info.pet_id);
        // console.log( PetManager.getInstance().getSpriteFrameByName('Sprite_Avatar_' + this.pet_info.pet_id))
        // let type = content.getChildByName("type");
        // type.active = true;
        // type.getComponent(cc.Sprite).spriteFrame = PetManager.getInstance().getSpriteFrameByName("Hero_Type_" + SpiritMessageManager.getInstance().getSpiritType(this.pet_info.pet_id));
        // content.getChildByName("quality").getComponent(cc.Sprite).spriteFrame = PetManager.getInstance().getSpriteFrameByName("Prepare_Quality_" + SpiritQualityMessageManager.getInstance().getSpiritQualityframe(this.pet_info.pet_quality));
        let star = content.getChildByName("star");
        // star.getComponent(cc.Sprite).spriteFrame = PetManager.getInstance().getSpriteFrameByName
        // ("Prepare_Star_" + SpiritQualityMessageManager.getInstance().
        // getSpiritQualityStar(this.pet_info.pet_quality));
        let levelLabel = content.getChildByName("levelLabel");
        levelLabel.active = true;
        levelLabel.getComponent(cc.Label).string = "" + this.pet_info.pet_level;
    }

    // initQuality(quality:number){
    //     let content = this.node.getChildByName("content");
    //     content.getChildByName("quality").getComponent(cc.Sprite).spriteFrame = 
    //     PetManager.getInstance().getSpriteFrameByName("Prepare_Quality_" + 
    //     SpiritQualityMessageManager.getInstance().getSpiritQualityframe(quality));
    // }

    showLock(quality:number){
        let content = this.node.getChildByName("content");
        this.icon = content.getChildByName("iconMask");
        this.icon.active = true;
        this.icon.getChildByName('icon').getComponent(cc.Sprite).spriteFrame = null;
        // content.getChildByName("quality").getComponent(cc.Sprite).spriteFrame = 
        // PetManager.getInstance().getSpriteFrameByName("Prepare_Quality_" + 
        // SpiritQualityMessageManager.getInstance().getSpiritQualityframe(quality));
        let star = content.getChildByName("star");
        star.getComponent(cc.Sprite).spriteFrame = null;
        let levelLabel = content.getChildByName("levelLabel");
        levelLabel.active = true;
        levelLabel.getComponent(cc.Label).string = ""
    }

    showBan(){
        this.node.getChildByName("ban").active = true;
        this.node.getChildByName("content").active = false;
    }

    hideBan(){
        this.node.getChildByName("ban").active = false;
        this.node.getChildByName("content").active = true;
    }

    showNull(){
        this.node.getChildByName("content").active = false;
        this.node.getChildByName("ban").active = false;
    }
}
