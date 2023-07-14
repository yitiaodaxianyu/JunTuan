// import { SpiritQualityMessageManager } from "../Pet/Data/SpiritQualityMessage";
import { PetInfo } from "../Pet/PetConfig";
import { PetManager } from "../Pet/PetManager";
import MazeLeaseUi from "./MazeLeaseUi";


const {ccclass, property} = cc._decorator;

@ccclass
export default class MazePetItem extends cc.Component {

    index:number=0;
    lease_ts:MazeLeaseUi=null;

    init (petInfo:PetInfo,index:number,ts:MazeLeaseUi) {
        this.lease_ts=ts;
        this.index=index;
        // let SMM=SpiritQualityMessageManager.getInstance();
        let iconRoot=this.node.getChildByName('iconMask');
        //图标
        let iconSp=iconRoot.getChildByName('icon').getComponent(cc.Sprite);
        // iconSp.spriteFrame=PetManager.getInstance().getSpriteFrameByName('Sprite_Avatar_' + petInfo.pet_id);
        //框
        // let quality=SMM.getSpiritQualityframe(petInfo.pet_quality)
        // this.node.getComponent(cc.Sprite).spriteFrame = PetManager.getInstance().getSpriteFrameByName("Prepare_Quality_" + quality);
        let starSp = iconRoot.getChildByName("star").getComponent(cc.Sprite);
        // starSp.spriteFrame = PetManager.getInstance().getSpriteFrameByName("Prepare_Star_" + SMM.getSpiritQualityStar(petInfo.pet_quality));
        let levelLabel = this.node.getChildByName("levelLabel");
        levelLabel.getComponent(cc.Label).string = "" + petInfo.pet_level;
        this.node.getChildByName('gou').active=false;
    }

    refresh(isShow:boolean){
        this.node.getChildByName('gou').active=isShow;
    }

    onClick(){
        this.lease_ts.clickBtnItem(this.index);
    }
}
