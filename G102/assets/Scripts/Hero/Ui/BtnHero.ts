
import { HeroManager } from "../../Hero/Data/HeroManager";
import { Hero_Type } from "../Game/HeroConfig";



const { ccclass, property } = cc._decorator;

@ccclass
export default class BtnHero extends cc.Component {

    hero_id: Hero_Type = Hero_Type.NULL;
    icon:cc.Node=null;

    @property()
    team_index:number=0;

    init(heroId: Hero_Type) {
        this.hero_id = heroId;
        this.icon = this.node.getChildByName("iconMask");
        this.icon.active = true;
        this.icon.getChildByName('icon').getComponent(cc.Sprite).spriteFrame = HeroManager.getInstance().getSpriteFrameByName('hero' + heroId);
        // let type = this.node.getChildByName("type");
        // type.active = true;
        // type.getComponent(cc.Sprite).spriteFrame = HeroManager.getInstance().getSpriteFrameByName("Hero_Type_" + HeroBaseInfoManager.getInstance().getHeroType(heroId));
        // console.log(type.getComponent(cc.Sprite).spriteFrame)
        let levelLabel = this.node.getChildByName("levelLabel");
        levelLabel.active = true;
        levelLabel.getComponent(cc.Label).string = "" + HeroManager.getInstance().getHeroLevel(heroId);
    }

    showSelect(){
        this.node.getChildByName("select").active = true;
    }

    hideSelect(){
        this.node.getChildByName("select").active = false;
    }

}
