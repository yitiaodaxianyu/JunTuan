import GameData from "../../GameData";
import GameManager from "../../GameManager";
import { HeroManager } from "../../Hero/Data/HeroManager";
import { Hero_Type } from "../../Hero/Game/HeroConfig";
import { PropManager } from "../../Prop/PropManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import UserData from "../../UserData";
import UIComponent from "../UIComponent";


const {ccclass, property} = cc._decorator;

@ccclass
export default class AvatarUi extends UIComponent {

    @property(cc.Node)
    head_portrait:cc.Node=null;
    @property(cc.Node)
    head_item:cc.Node=null;
    @property(cc.Node)
    select:cc.Node=null;
    select_avatar_index:number=0;

    onLoad(): void {
        super.onLoad();
        this.select_avatar_index=UserData.getInstance().getUserAvatar();
        this.head_portrait.getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpheadPortraitType(this.select_avatar_index)//HeroManager.getInstance().getSpriteFrameByName('hero'+this.select_avatar_index);
        this.addAvatar();

    }

    addAvatar()
    {
        let content=this.node.getChildByName('avatarScroll').getComponent(cc.ScrollView).content;
        for(let i=Hero_Type.ChangMaoShou; i<Hero_Type.Hero_Num; i++)
        {
            let avatar=cc.instantiate(this.head_item);
            avatar.name = "icon" + i;
            avatar.parent=content;
            // avatar.addComponent(cc.Sprite).spriteFrame=HeroManager.getInstance().getSpriteFrameByName('hero'+i);
            avatar.getChildByName("headPortrait").getComponentInChildren(cc.Sprite).spriteFrame =PropManager.getInstance().getSpheadPortraitType(i)//HeroManager.getInstance().getSpriteFrameByName('hero'+i);
            let btn=avatar.addComponent(cc.Button);
            // btn.transition=cc.Button.Transition.COLOR;
            // btn.disabledColor=cc.Color.WHITE;
            let clickEvent=new cc.Component.EventHandler();
            clickEvent.target=this.node;
            clickEvent.component='AvatarUi';
            clickEvent.handler='clickBtnAvatar';
            clickEvent.customEventData=i+'';
            btn.clickEvents.push(clickEvent);
            if(i == this.select_avatar_index){
                this.select.parent = avatar;
                this.select.setPosition(cc.v2(0,0));
            }
        }
        // this.scheduleOnce(()=>{
            //     content.getComponent(cc.Layout).enabled=false;
        //     this.select.parent=content;
        //     this.showSelectAvatar();
        // },0.1);        
    }

   clickBtnAvatar(btn,indexStr:string)
   {
       GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
       let index=parseInt(indexStr);
       if(this.select_avatar_index!=index)
       {
            this.select_avatar_index=index;
            this.showSelectAvatar();
       }
   }

   showSelectAvatar()
   {
        // let spName='TY_TX_0'+this.select_avatar_index;
        // if(this.select_avatar_index>=10)
        // {
        //     spName='TY_TX_'+this.select_avatar_index;
        // }
        // let content=this.node.getChildByName('avatarScroll').getComponent(cc.ScrollView).content;
        // this.select.setPosition(content.children[this.select_avatar_index-1].getPosition());
        this.head_portrait.getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpheadPortraitType(this.select_avatar_index)//HeroManager.getInstance().getSpriteFrameByName('hero'+this.select_avatar_index);
        this.select.parent = this.node.getComponentInChildren(cc.ScrollView).content.getChildByName("icon" + this.select_avatar_index);
        this.select.setPosition(cc.v2(0,0));
   }

   clickBtnOk()
   {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        UserData.getInstance().saveUserAvatar(this.select_avatar_index+'');
        super.onClose();
   }

}
