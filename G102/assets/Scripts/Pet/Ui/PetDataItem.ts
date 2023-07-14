import GameManager from "../../GameManager";
import { HeroManager } from "../../Hero/Data/HeroManager";
import { Hero_Type } from "../../Hero/Game/HeroConfig";
import LanguageManager from "../../multiLanguage/LanguageManager";
import { ItemManager } from "../../Prop/Data/Item";
import { PropAction } from "../../Prop/PropConfig";
import { PropManager } from "../../Prop/PropManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import { UIManager } from "../../UI/UIManager";
import { PetMessage } from "../PetConfig";
import { PetManager } from "../PetManager";
import PetItem from "./PetItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PetDataItem extends cc.Component {

    ui_pet_info:PetMessage=null;
    self_pet_info:PetMessage=null;
    ui_hero_type:Hero_Type=Hero_Type.NULL;
    self_hero_type:Hero_Type=Hero_Type.NULL;
    click_callback:Function=null;
    
    @property(cc.SpriteFrame)
    Common_Btn:cc.SpriteFrame[]=[]

    initData(petMessage:PetMessage,uiPetId:PetMessage,heroType:Hero_Type,clickCallback:Function,selfHero:Hero_Type = Hero_Type.NULL){
        this.self_pet_info = petMessage;
        this.ui_pet_info = uiPetId;
        this.ui_hero_type = heroType;
        this.self_hero_type = selfHero;
        this.click_callback = clickCallback;
        this.refreshUi();
    }

    refreshUi(){
        let LM=LanguageManager.getInstance();
        let PM=PropManager.getInstance();
        let equipRoot = this.node.getChildByName("equipRoot");
        if(equipRoot.childrenCount == 0){
            let item=PetManager.getInstance().getPetNodeByInfo(this.self_pet_info,PropAction.Null,this.self_hero_type);
            item.scale = 0.8;
            item.name = "item_equip";
            equipRoot.addChild(item);
        }else{
            let item=equipRoot.getChildByName("item_equip");
            item.getComponent(PetItem).init(this.self_hero_type,this.self_pet_info,PropAction.Null);
        }
        let jsonItem=ItemManager.getInstance().getJsonItem(this.self_pet_info.pet_id);
        let propName=this.node.getChildByName('propName');
        propName.getComponent(cc.Label).string="["+PM.getPropQualityName(jsonItem.Quality)+"]"+LM.getStrByTextId(jsonItem.NameTextId);
        propName.color=PM.getPropQualityTextColor(jsonItem.Quality);
        let Outlinecolor=[new cc.Color(39, 35, 28),new cc.Color(29, 63, 27),new cc.Color(25, 55, 88),new cc.Color(66, 37, 96),new cc.Color(62, 32, 0),new cc.Color(79, 16, 15)]
        propName.getComponent(cc.LabelOutline).color=Outlinecolor[(jsonItem.Quality)]
        this.node.getChildByName('zhanliNum').getComponent(cc.Label).string=PetManager.getInstance().getPetZhanLi(this.self_pet_info.pet_id)+"";
        let heroType=this.self_hero_type;
        let isWear=heroType!=Hero_Type.NULL;
        if(heroType!=Hero_Type.NULL){
            let heroIcon=this.node.getChildByName('heroIcon').getComponent(cc.Sprite);
            heroIcon.spriteFrame=PropManager.getInstance().getHeroIconb(heroType);
        }
        this.node.getChildByName('exBg').active=isWear;
        this.node.getChildByName('heroIcon').active=isWear;
        this.node.getChildByName('Equipped_Icon').active=isWear;
        this.node.getChildByName('btnExchange').active=isWear;
        let btnEquip=this.node.getChildByName('btnEquip')
        btnEquip.active=!isWear;
        // if(this.ui_pet_info.pet_id!=0){
        //     btnEquip.getChildByName("titleLabel").getComponent(cc.LabelOutline).color=new cc.Color(105,56,20)//.toHEX("#693814")
        //     btnEquip.getComponent(cc.Sprite).spriteFrame=this.Common_Btn[1]
        // }else{
        //     btnEquip.getChildByName("titleLabel").getComponent(cc.LabelOutline).color=new cc.Color(12,56,86)//.toHEX("#0C3856")
        //     btnEquip.getComponent(cc.Sprite).spriteFrame=this.Common_Btn[0]
        // }
    }

    onClickBtnExchange(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let oldCombat = HeroManager.getInstance().getHeroZhanli(this.ui_hero_type);
        let oldData = HeroManager.getInstance().getDeepHeroData(this.ui_hero_type);

        HeroManager.getInstance().addWearPet(this.ui_hero_type,this.self_pet_info.pet_id);
        HeroManager.getInstance().addWearPet(this.self_hero_type,this.ui_pet_info.pet_id);

        let newCombat = HeroManager.getInstance().getHeroZhanli(this.ui_hero_type);
        let newData = HeroManager.getInstance().getDeepHeroData(this.ui_hero_type);
        if(oldCombat != newCombat){
            UIManager.getInstance().showCombatChangeEffect(oldCombat,newCombat,oldData,newData);
        }
        if(this.click_callback){
            this.click_callback(this.self_pet_info.pet_id);
        }
    }

    onClickBtnEquip(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let oldCombat = HeroManager.getInstance().getHeroZhanli(this.ui_hero_type);
        let oldData = HeroManager.getInstance().getDeepHeroData(this.ui_hero_type);
        HeroManager.getInstance().addWearPet(this.ui_hero_type,this.self_pet_info.pet_id);
        if(this.click_callback){
            this.click_callback(this.self_pet_info.pet_id);
        }
        let newCombat = HeroManager.getInstance().getHeroZhanli(this.ui_hero_type);
        let newData = HeroManager.getInstance().getDeepHeroData(this.ui_hero_type);
        if(oldCombat != newCombat){
            UIManager.getInstance().showCombatChangeEffect(oldCombat,newCombat,oldData,newData);
        }
    }

}
