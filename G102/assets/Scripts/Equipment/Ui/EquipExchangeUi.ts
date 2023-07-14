import GameManager from "../../GameManager";
import { HeroManager } from "../../Hero/Data/HeroManager";
import { Hero_Type } from "../../Hero/Game/HeroConfig";
import LanguageManager from "../../multiLanguage/LanguageManager";
import TextLanguage from "../../multiLanguage/TextLanguage";
import { ItemManager } from "../../Prop/Data/Item";
import { PropAction } from "../../Prop/PropConfig";
import { PropManager } from "../../Prop/PropManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import UIComponent from "../../UI/UIComponent";
import { EquipInfo, EquipType } from "../EquipConfig";
import {  EquipmentManager } from "../EquipmentManager";
import EquipDataItem from "./EquipDataItem";


const {ccclass, property} = cc._decorator;

@ccclass
export default class EquipExchangeUi extends UIComponent {

    @property(cc.Prefab)
    equip_data:cc.Prefab=null;

    equip_id:number=null;
    cur_hero_type:Hero_Type=Hero_Type.NULL;
    equip_type:EquipType=EquipType.ShiPin;

    @property(cc.Node)
    ExchangeLevel:cc.Node=null;
    

    initData(equipId:number,heroType:Hero_Type,equipPos:EquipType){
        this.equip_id=equipId;
        this.cur_hero_type=heroType;
        this.equip_type=equipPos;
        this.initUi();
    }
    
    initUi(){
        for (let index = 0; index < this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content.children.length; index++) {
            this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content.children[index].destroy()
        }
        this.ExchangeLevel.active=false
        let curRoot=this.node.getChildByName('curRoot');
        let noWear=this.node.getChildByName('noWear');
        if(this.equip_id){
            
            curRoot.active=true;
            noWear.active=false;
            this.node.getChildByName("bg").color.a=200
            this.node.getChildByName("titleLabel").getComponent(TextLanguage).setTextId(180005)
            //信息展示        
            //装备Item
            let item=EquipmentManager.getInstance().getEquipNodeById(this.equip_id,PropAction.Null,this.cur_hero_type);
            if(curRoot.getChildByName('propRoot').children.length>0){
                curRoot.getChildByName('propRoot').children[0].destroy()
            }
            curRoot.getChildByName('propRoot').addChild(item);
            //名称
            let jsonItem=ItemManager.getInstance().getJsonItem(this.equip_id);
            let propName=curRoot.getChildByName('propName');
            propName.getComponent(cc.Label).string="["+PropManager.getInstance().getPropQualityName(jsonItem.Quality)+"]"+LanguageManager.getInstance().getStrByTextId(jsonItem.NameTextId);
            propName.color=PropManager.getInstance().getPropQualityTextColor(jsonItem.Quality);
            let Outlinecolor=[new cc.Color(39, 35, 28),new cc.Color(29, 63, 27),new cc.Color(25, 55, 88),new cc.Color(66, 37, 96),new cc.Color(62, 32, 0),new cc.Color(79, 16, 15)]
            // console.log("______",jsonItem.Quality)
            propName.getComponent(cc.LabelOutline).color=Outlinecolor[(jsonItem.Quality)]
            //战力数
            curRoot.getChildByName('zhanliNum').getComponent(cc.Label).string=EquipmentManager.getInstance().getEquipZhanLi(this.equip_id)+""//EquipmentManager.getInstance().getEquipZhanLi(this.equip_info)+'';
        }else{
            curRoot.active=false;
            noWear.active=true;
            this.node.getChildByName("bg").color.a=128
            this.node.getChildByName("titleLabel").getComponent(TextLanguage).setTextId(180006)
        }
        this.loadEquipList();
    }

    loadEquipList(){
        let type=this.equip_type;
        let equipList=PropManager.getInstance().getEquipmentList(type);        
        // console.log("+++++++",equipList)
        let content=this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content;
        //重组列表
        let uiEquipInfo=new EquipInfo();
        uiEquipInfo.equip_id=this.equip_id;
        uiEquipInfo.equip_num=1;
        let newList=new Array();
        for(let i=0; i<equipList.length; i++){
            let info=equipList[i];
            let heroList=HeroManager.getInstance().getWearEquipmentHeroList(info);
            let remainNum=info.equip_num-heroList.length;
            if(remainNum>0){
                let prop=new EquipInfo();
                prop.equip_id=info.equip_id;
                prop.equip_num=remainNum;
                newList.push({
                    equipInfo:prop,
                    heroType:Hero_Type.NULL
                })
            }
            for(let n=0; n<heroList.length; n++){
                let heroType=heroList[n];
                if(heroType!=this.cur_hero_type){
                    let prop=new EquipInfo();
                    prop.equip_id=info.equip_id;
                    prop.equip_num=1;
                    newList.push({
                        equipInfo:prop,
                        heroType:heroType
                    });
                }                
            }            
        }
        for(let i=0; i<newList.length; i++){
            let info=newList[i];
            // if(this.equip_info&&info.sequence_id==this.equip_info.sequence_id){
            //     continue;
            // }
            this.scheduleOnce(()=>{
                let item=cc.instantiate(this.equip_data);
                content.addChild(item);
                item.getComponent(EquipDataItem).init(info.equipInfo,uiEquipInfo,this.cur_hero_type,(id:number)=>{
                    super.onRefresh(id);
                    this.clickBtnClose();
                },info.heroType);
            },0.02*i);
        }
    }
    
    clickBtnClose(){

        for (let index = 0; index < this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content.children.length; index++) {
            this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content.children[index].destroy()
        }
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        super.onClose();
    }
}
