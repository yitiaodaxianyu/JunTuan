import GameManager from "../../GameManager";
import { HeroManager } from "../../Hero/Data/HeroManager";
import { Hero_Type } from "../../Hero/Game/HeroConfig";
import LanguageManager from "../../multiLanguage/LanguageManager";
import { ItemManager } from "../../Prop/Data/Item";
import { PropAction } from "../../Prop/PropConfig";
import { PropManager } from "../../Prop/PropManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import { UIManager } from "../../UI/UIManager";
import { EquipmentAttributeManager } from "../Data/EquipmentAttribute";
import { EquipInfo } from "../EquipConfig";
import {  EquipmentManager } from "../EquipmentManager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class EquipDataItem extends cc.Component {


    ui_equip_info:EquipInfo=null;
    self_equip_info:EquipInfo=null;
    ui_hero_type:Hero_Type=Hero_Type.NULL;
    self_hero_type:Hero_Type=Hero_Type.NULL;
    click_callback:Function=null;

    @property(cc.SpriteFrame)
    Common_Btn:cc.SpriteFrame[]=[]

    init(equipInfo:EquipInfo,uiEquipId:EquipInfo,heroType:Hero_Type,clickCallback:Function,selfHero:Hero_Type=Hero_Type.NULL){
        this.self_equip_info=equipInfo;
        this.ui_equip_info=uiEquipId;
        this.ui_hero_type=heroType;
        this.self_hero_type=selfHero;
        this.click_callback=clickCallback;
        this.initData();
        this.refreshData();
    }

    initData(){
        //管理器
        let LM=LanguageManager.getInstance();
        let PM=PropManager.getInstance();
        //图标
        let item=EquipmentManager.getInstance().getEquipNodeByInfo(this.self_equip_info,PropAction.Null,this.self_hero_type);
        item.scale=0.8
        this.node.getChildByName('equipRoot').addChild(item);
        //名称
        let jsonItem=ItemManager.getInstance().getJsonItem(this.self_equip_info.equip_id);
        let propName=this.node.getChildByName('propName');
        propName.getComponent(cc.Label).string="["+PM.getPropQualityName(jsonItem.Quality)+"]"+LM.getStrByTextId(jsonItem.NameTextId);
        propName.color=PM.getPropQualityTextColor(jsonItem.Quality);
        let Outlinecolor=[new cc.Color(39, 35, 28),new cc.Color(29, 63, 27),new cc.Color(25, 55, 88),new cc.Color(66, 37, 96),new cc.Color(62, 32, 0),new cc.Color(79, 16, 15)]
        // console.log("______",jsonItem.Quality)
        propName.getComponent(cc.LabelOutline).color=Outlinecolor[(jsonItem.Quality)]
        //战力数
        this.node.getChildByName('zhanliNum').getComponent(cc.Label).string=EquipmentManager.getInstance().getEquipZhanLi(this.self_equip_info.equip_id)+""//EquipmentManager.getInstance().getEquipZhanLi(this.self_equip_info)+'';
    }

    refreshData(){
        //装备的英雄
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

        // if(this.ui_equip_info.equip_id!=0){
        //     btnEquip.getChildByName("titleLabel").getComponent(cc.LabelOutline).color=new cc.Color(12,56,86)//.toHEX("#0C3856")
        //     btnEquip.getComponent(cc.Sprite).spriteFrame=this.Common_Btn[0]
        // }else{
        //     btnEquip.getChildByName("titleLabel").getComponent(cc.LabelOutline).color=new cc.Color(105,56,20)//.toHEX("#693814")
        //     btnEquip.getComponent(cc.Sprite).spriteFrame=this.Common_Btn[1]
        // }
    }

    onClickBtnExchange(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let oldCombat = HeroManager.getInstance().getHeroZhanli(this.ui_hero_type);
        let oldData = HeroManager.getInstance().getDeepHeroData(this.ui_hero_type);
        HeroManager.getInstance().addWearEquipment(this.ui_hero_type,this.self_equip_info.equip_id);
        HeroManager.getInstance().addWearEquipment(this.self_hero_type,this.ui_equip_info.equip_id,EquipmentAttributeManager.getInstance().getEquipmentPosition(this.self_equip_info.equip_id));
        let newCombat = HeroManager.getInstance().getHeroZhanli(this.ui_hero_type);
        let newData = HeroManager.getInstance().getDeepHeroData(this.ui_hero_type);
        if(oldCombat != newCombat){
            UIManager.getInstance().showCombatChangeEffect(oldCombat,newCombat,oldData,newData);
        }
        if(this.click_callback){
            this.click_callback(this.self_equip_info.equip_id);
        }
    }

    onClickBtnEquip(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        
        let oldCombat = HeroManager.getInstance().getHeroZhanli(this.ui_hero_type);
        let oldData = HeroManager.getInstance().getDeepHeroData(this.ui_hero_type);
        HeroManager.getInstance().addWearEquipment(this.ui_hero_type,this.self_equip_info.equip_id);
        let newCombat = HeroManager.getInstance().getHeroZhanli(this.ui_hero_type);
        let newData = HeroManager.getInstance().getDeepHeroData(this.ui_hero_type);
        if(oldCombat != newCombat){
            UIManager.getInstance().showCombatChangeEffect(oldCombat,newCombat,oldData,newData);
        }
        if(this.click_callback){
            this.click_callback(this.self_equip_info.equip_id);
        }
    }

}
