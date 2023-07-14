import { HeroManager } from "../Data/HeroManager";
import { Hero_Type } from "../Game/HeroConfig";


const {ccclass, property} = cc._decorator;

@ccclass
export default class HeroFragment extends cc.Component {

    hero_type:Hero_Type=Hero_Type.NULL;
    fragment_num:number=0;
    
    init (heroType:Hero_Type,num:number) {
        this.hero_type=heroType;
        this.fragment_num=num;
        this.refreshData();
    }

    refreshData(){
        let icon=this.node.getChildByName('mask').getChildByName('icon');
        icon.getComponent(cc.Sprite).spriteFrame=HeroManager.getInstance().getSpriteFrameByName('hero'+this.hero_type);
        let num=this.node.getChildByName('num');
        num.getComponent(cc.Label).string=""+this.fragment_num;
        this.node.name='fragment';
        if(this.hero_type==Hero_Type.NULL){
            icon.y=26;
        }else{
            icon.y=38;
        }
    }
}
