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
import { UiAction } from "../../UI/UiInterface";
import { SpiritAttributeManager } from "../Data/SpiritAttribute";
import { PetMessage } from "../PetConfig";
import { PetManager } from "../PetManager";
import PetDataItem from "./PetDataItem";


const {ccclass, property} = cc._decorator;

@ccclass
export default class PetExchangeUi extends UIComponent {

    @property(cc.Prefab)
    pet_data:cc.Prefab = null;

    pet_id:number = null;
    current_hero_type:number = Hero_Type.NULL;

    initData(petId:number,heroType:number){
        this.pet_id = petId;
        this.current_hero_type = heroType;
        this.refreshUi();
    }

    refreshUi(){
        // let petList = PropManager.getInstance().getPetList();
        let content = this.node.getChildByName("scrollView").getComponent(cc.ScrollView).content;
        let curRoot=this.node.getChildByName('curRoot');
        let noWear=this.node.getChildByName('noWear');
        if(this.pet_id){
            
            curRoot.active=true;
            noWear.active=false;
            this.node.getChildByName("bg").color.a=200
            this.node.getChildByName("titleLabel").getComponent(TextLanguage).setTextId(640024)
            //信息展示        
            //装备Item
            let item=PetManager.getInstance().getPetNodeById(this.pet_id,PropAction.Null,this.current_hero_type);
            if(curRoot.getChildByName('propRoot').children.length>0){
                curRoot.getChildByName('propRoot').children[0].destroy()
            }
            curRoot.getChildByName('propRoot').addChild(item);
            //名称
            let jsonItem=ItemManager.getInstance().getJsonItem(this.pet_id);
            let propName=curRoot.getChildByName('propName');
            propName.getComponent(cc.Label).string="["+PropManager.getInstance().getPropQualityName(jsonItem.Quality)+"]"+LanguageManager.getInstance().getStrByTextId(jsonItem.NameTextId);
            propName.color=PropManager.getInstance().getPropQualityTextColor(jsonItem.Quality);
            let Outlinecolor=[new cc.Color(39, 35, 28),new cc.Color(29, 63, 27),new cc.Color(25, 55, 88),new cc.Color(66, 37, 96),new cc.Color(62, 32, 0),new cc.Color(79, 16, 15)]
            // console.log("______",jsonItem.Quality)
            propName.getComponent(cc.LabelOutline).color=Outlinecolor[(jsonItem.Quality)]
            //战力数
            curRoot.getChildByName('zhanliNum').getComponent(cc.Label).string=PetManager.getInstance().getPetZhanLi(this.pet_id)+"";
        }else{
            curRoot.active=false;
            noWear.active=true;
            this.node.getChildByName("bg").color.a=128
            this.node.getChildByName("titleLabel").getComponent(TextLanguage).setTextId(640023)
        }
        // 重新初始化所有
        content.removeAllChildren();
        let petList = PropManager.getInstance().getPetList();
        let petMessage=new PetMessage();
        petMessage.pet_id=this.pet_id;
        petMessage.pet_num=1;
        let temp1=new Array();
        let temp2=new Array();
        for(let i=0; i<petList.length; i++){
            let info=petList[i];
            let heroList=HeroManager.getInstance().getWearPetHeroList(info);
            let remainNum=info.pet_num-heroList.length;
            if(remainNum>0){
                let prop=new PetMessage();
                prop.pet_id=info.pet_id;
                prop.pet_num=remainNum;
                temp1.push({
                    equipInfo:prop,
                    heroType:Hero_Type.NULL
                })
            }
            for(let n=0; n<heroList.length; n++){
                let heroType=heroList[n];
                if(heroType!=this.current_hero_type){
                    let prop=new PetMessage();
                    prop.pet_id=info.pet_id;
                    prop.pet_num=1;
                    temp2.push({
                        equipInfo:prop,
                        heroType:heroType
                    });
                }                
            }            
        }
        temp1.sort(this.sort1);
        temp2.sort(this.sort1);
        let temp = new Array();
        temp = temp.concat(temp1,temp2);
        for(let i=0; i<temp.length; i++){
            let info=temp[i];
            // if(this.equip_info&&info.sequence_id==this.equip_info.sequence_id){
            //     continue;
            // }
            this.scheduleOnce(()=>{
                let item=cc.instantiate(this.pet_data);
                content.addChild(item);
                item.getComponent(PetDataItem).initData(info.equipInfo,petMessage,this.current_hero_type,(id:number)=>{
                    super.onRefresh(id);
                    this.clickBtnClose();
                },info.heroType);
            },0.02*i);
        }
    }
    
    clickBtnClose(){
        let content = this.node.getChildByName("scrollView").getComponent(cc.ScrollView).content;
        content.removeAllChildren();
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        super.onClose();
    }

    sort1(a:any,b:any):number{
        let infoA = SpiritAttributeManager.getInstance().getJsonSpiritAttribute(a.equipInfo.pet_id);
        let infoB = SpiritAttributeManager.getInstance().getJsonSpiritAttribute(b.equipInfo.pet_id);
        if(infoA.Stage != infoB.Stage){
            return infoB.Stage - infoA.Stage;
        }else{
            // return this.sort2(a.equipInfo.pet_id,b.equipInfo.pet_id);
            return PetManager.getInstance().getPetZhanLi(b.equipInfo.pet_id) - PetManager.getInstance().getPetZhanLi(a.equipInfo.pet_id)
        }
    }

    sort2(a:number,b:number):number{
        return PetManager.getInstance().getPetZhanLi(a) - PetManager.getInstance().getPetZhanLi(b);
    }

}
