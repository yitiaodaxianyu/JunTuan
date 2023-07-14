import ApkManager from "../../Ads/ApkManager";
import GameManager from "../../GameManager";
import { Follow_Type } from "../../multiLanguage/FollowConstants";
import FollowManager from "../../multiLanguage/FollowManager";
import LanguageManager from "../../multiLanguage/LanguageManager";
import { PropId } from "../../Prop/PropConfig";
import { PropManager } from "../../Prop/PropManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import MyTool from "../../Tools/MyTool";
import UIComponent from "../../UI/UIComponent";
import { UiAction } from "../../UI/UiInterface";
import { UIManager } from "../../UI/UIManager";
// import { SpiritMessageManager } from "../Data/SpiritMessage";
// import { JsonSpiritQualityAdvanced, SpiritQualityAdvancedManager } from "../Data/SpiritQualityAdvanced";
import { PetInfo } from "../PetConfig";
import { PetManager } from "../PetManager";
import BtnPet from "./BtnPet";
import PetItem from "./PetItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PetAdvanceUi extends UIComponent {

     @property(cc.SpriteAtlas)
     pet_advance_ui:cc.SpriteAtlas = null;
     @property(cc.Prefab)
     item:cc.Prefab = null;

     private all_list: PetInfo[] = null;

     private pet_id_num:Map<string,number> = null;
     private pet_quality_num:Map<number,number> = null;


    //  private targetInfo:JsonSpiritQualityAdvanced = null;

     private chooseItem1:PetInfo = null;
     private chooseItem2:PetInfo = null;
     private chooseItem3:PetInfo = null;

    // start(){
    //     this.sortList();
    //     this.refreshUi();
    // }

   init(uiAc: UiAction): void {
    //    super.init(uiAc);
    // //    this.sortList();
    //    this.refreshUi();
    //    let canvas = cc.find("Canvas");
    //    this.node.getChildByName("top").getComponent(cc.Widget).target = canvas;
    //    this.node.getChildByName("bottom").getComponent(cc.Widget).target = canvas; 
    //    FollowManager.getInstance().followEvent(Follow_Type.圣堂打开次数);
   }

   refreshUi(){
        // this.refreshScroll();
        // let top = this.node.getChildByName("top")
        // top.getChildByName("topCoinNum").getComponent(cc.Label).string = MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(PropId.Coin),1);
        // top.getChildByName("topGemNum").getComponent(cc.Label).string = MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(PropId.Gem),1);
        // if(this.chooseItem1 != null){
        //     let spRoot = this.node.getChildByName("spRoot");
        //     if(spRoot.children[0] == null){
        //         this.loadPrefab("" + this.chooseItem1.pet_id,spRoot);
        //         // this.node.getChildByName("Sprite_Up_Shadow").active = true;
        //         this.node.getChildByName("spRoot").active = true;
        //     }

        //     let info = top.getChildByName("info");
        //     // let formData = SpiritMessageManager.getInstance().getJsonSpiritMessage(this.chooseItem1.pet_id);
        //     info.active = true;
        //     info.getChildByName("qualityIcon").getComponent(cc.Sprite).spriteFrame = 
        //     PetManager.getInstance().getSpriteFrameByName("Sprite_Up_Quality_"+
        //     SpiritQualityMessageManager.getInstance().getSpiritQualityframe(this.chooseItem1.pet_quality));
        //     info.getChildByName("quality").getComponent(cc.Label).string = 
        //     LanguageManager.getInstance().getStrByTextId(
        //         SpiritQualityMessageManager.getInstance().getSpiritQualityName(this.chooseItem1.pet_quality));
        //     // info.getChildByName("name1").getComponent(cc.Label).string = 
        //     // LanguageManager.getInstance().getStrByTextId(formData.SpiritName);
        // }else{
        //     // this.node.getChildByName("Sprite_Up_Shadow").active = false;
        //     let spRoot = this.node.getChildByName("spRoot");
        //     spRoot.active = false;
        //     spRoot.removeAllChildren();

        //     top.getChildByName("info").active = false;
        // }
        // let bottom = this.node.getChildByName("bottom");
        // let iconRoot1 = bottom.getChildByName("3")
        // let iconRoot2 = bottom.getChildByName("2")
        // if(iconRoot1.active == true){
        //     iconRoot1.children[0].getComponent(BtnPet).init(this.chooseItem1);
        //     if(this.chooseItem2 != null){
        //         iconRoot1.children[1].getComponent(BtnPet).init(this.chooseItem2);
        //     }
        //     else{
        //         if(this.targetInfo.CostItselfNum != 0){
        //             iconRoot1.children[1].getComponent(BtnPet).showLock(this.targetInfo.CostItselfQuality);
        //         }else{
        //             iconRoot1.children[1].getComponent(BtnPet).showLock(this.targetInfo.CostSameTypeQuality);
        //         }
        //     }
            
        //     if(this.chooseItem3 != null){
        //         iconRoot1.children[2].getComponent(BtnPet).init(this.chooseItem3);
        //     }
        //     else{
        //         if(this.targetInfo.CostItselfNum != 0){
        //             iconRoot1.children[2].getComponent(BtnPet).showLock(this.targetInfo.CostItselfQuality);
        //         }else{
        //             iconRoot1.children[2].getComponent(BtnPet).showLock(this.targetInfo.CostSameTypeQuality);
        //         }
        //     }
        // }else{
        //     if(iconRoot2.active == true){
        //         iconRoot2.children[0].getComponent(BtnPet).init(this.chooseItem1);

        //         if(this.chooseItem2 != null){
        //             iconRoot2.children[1].getComponent(BtnPet).init(this.chooseItem2);
        //         }
        //         else{
        //             if(this.targetInfo.CostItselfNum != 0){
        //                 iconRoot2.children[1].getComponent(BtnPet).showLock(this.targetInfo.CostItselfQuality);
        //             }else{
        //                 iconRoot2.children[1].getComponent(BtnPet).showLock(this.targetInfo.CostSameTypeQuality);
        //             }
        //         }
        //     }
        // }
   }
    
   refreshScroll(){
        
        // let bottom = this.node.getChildByName("bottom");
        // let content = bottom.getChildByName("scroll").getComponent(cc.ScrollView).content;
        // content.removeAllChildren();

        // this.all_list = new Array<PetInfo>();
        // this.all_list = PetManager.getInstance().getDeepPetList();
        // this.pet_id_num = new Map<string,number>();
        // this.pet_quality_num = new Map<number,number>();
        // this.getPetAdvanceData();
        // let tempList1: PetInfo[] = [];
        // let tempList2: PetInfo[] = [];
        // let tempList3: PetInfo[] = [];
        // tempList1 = this.selectPetList(this.all_list,true);
        // tempList2 = this.selectPetList(this.all_list,false);
        // if(tempList1.length != 0){
        //     PetManager.getInstance().sortPetList(tempList1);
        // }
        // if(tempList2.length != 0){
        //     PetManager.getInstance().sortPetList(tempList2);
        // }
        // tempList3 = tempList3.concat(tempList1,tempList2);
        // for (let i = 0; i < tempList3.length; i++) {
        //     if(tempList3[i].pet_quality <= 1) continue;
        //     let item = cc.instantiate(this.item);
        //     item.getComponent(PetItem).init(tempList3[i]);
        //     // item.getComponent(PetItem).initToPlay();
        //     // item.scale = 0.75;
        //     if(this.targetInfo == null){
        //         // if(tempList3[i].pet_quality < SpiritMessageManager.getInstance().getQualityLimit(tempList3[i].pet_id)){
        //         //     item.on(cc.Node.EventType.TOUCH_START, this.onTouchPetItem, this);
        //         // }else{
        //         //     item.on(cc.Node.EventType.TOUCH_START, this.onTouchMaxQualityPetItem, this);
        //         // }
        //     }else{
        //         if(tempList3[i].sequence_id == this.chooseItem1.sequence_id){
        //             let gou = new cc.Node();
        //             gou.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Checkmark");
        //             // gou.scale = 1.2;
        //             item.addChild(gou);
        //         }else{
        //             if (this.chooseItem2 != null) {
        //                 if (tempList3[i].sequence_id == this.chooseItem2.sequence_id) {
        //                     let gou = new cc.Node();
        //                     gou.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Checkmark_1");
        //                     // gou.scale = 1.2;
        //                     item.addChild(gou);
        //                 }
        //                 else {
        //                     if(this.targetInfo.CostItselfNum == 2 || this.targetInfo.CostSameTypeNum == 2){
        //                         if (this.chooseItem3 != null) {
        //                             if (tempList3[i].sequence_id == this.chooseItem3.sequence_id) {
        //                                 let gou = new cc.Node();
        //                                 gou.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Checkmark_1");
        //                                 // gou.scale = 1.2;
        //                                 item.addChild(gou);
        //                                 if(this.checkCanAdvance(tempList3[i])){
        //                                     let red = new cc.Node();
        //                                     red.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Common_Icon_RedDot");
        //                                     item.addChild(red);
        //                                     red.setPosition(cc.v2(item.width/2,item.height/2));
        //                                 }
        //                                 item.setParent(content);
        //                                 continue;
        //                             }else{
        //                                 let bg = new cc.Node();
        //                                 bg.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Mask_0");
        //                                 let lock = new cc.Node();
        //                                 lock.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Lock");
        //                                 bg.addChild(lock);
        //                                 bg.scale = 1.2;
        //                                 item.addChild(bg);
        //                                 item.setParent(content);
        //                                 continue;
        //                             }
        //                         }
        //                         else{
        //                             if(this.targetInfo.CostItselfNum != 0){
        //                                 // 消耗本体
        //                                 if(tempList3[i].pet_id == this.chooseItem1.pet_id){
        //                                    if(tempList3[i].pet_quality == this.targetInfo.CostItselfQuality){
        //                                         let bg = new cc.Node();
        //                                         bg.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Mask_1");
        //                                         let arrow = new cc.Node();
        //                                         arrow.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Arrow");
        //                                         bg.addChild(arrow);
        //                                         // bg.scale = 1.3;
        //                                         item.addChild(bg);
        //                                        item.on(cc.Node.EventType.TOUCH_START, this.onTouchPetItem, this);
        //                                    }
        //                                    else{
        //                                         let bg = new cc.Node();
        //                                         bg.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Mask_0");
        //                                         let lock = new cc.Node();
        //                                         lock.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Lock");
        //                                         bg.addChild(lock);
        //                                         bg.scale = 1.2;
        //                                         item.addChild(bg);
        //                                    }
        //                                 }
        //                                 else{
        //                                     let bg = new cc.Node();
        //                                     bg.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Mask_0");
        //                                     let lock = new cc.Node();
        //                                     lock.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Lock");
        //                                     bg.addChild(lock);
        //                                     bg.scale = 1.2;
        //                                     item.addChild(bg);
        //                                 }
        //                             }else{
        //                                 // 消耗同质量
        //                                 if(tempList3[i].pet_quality == this.targetInfo.CostSameTypeQuality){
        //                                     let bg = new cc.Node();
        //                                     bg.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Mask_1");
        //                                     let arrow = new cc.Node();
        //                                     arrow.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Arrow");
        //                                     bg.addChild(arrow);
        //                                     // bg.scale = 1.3;
        //                                     item.addChild(bg);
        //                                     item.on(cc.Node.EventType.TOUCH_START, this.onTouchPetItem, this);
        //                                 } 
        //                                 // else if (this.chooseItem3 != null) {
        //                                 //     if (this.all_list[i].sequence_id == this.chooseItem3.sequence_id) {
        //                                 //         let gou = new cc.Node();
        //                                 //         gou.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Checkmark_1");
        //                                 //         gou.scale = 1.2;
        //                                 //         item.addChild(gou);
        //                                 //     }
        //                                 // }
        //                                 else{
        //                                     let bg = new cc.Node();
        //                                     bg.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Mask_0");
        //                                     let lock = new cc.Node();
        //                                     lock.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Lock");
        //                                     bg.addChild(lock);
        //                                     bg.scale = 1.2;
        //                                     item.addChild(bg);
        //                                 }
        //                             }
        //                         }
        //                     }
        //                     else{
        //                         let bg = new cc.Node();
        //                         bg.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Mask_0");
        //                         let lock = new cc.Node();
        //                         lock.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Lock");
        //                         bg.addChild(lock);
        //                         bg.scale = 1.2;
        //                         item.addChild(bg);
        //                         item.setParent(content);
        //                         continue;
        //                     }
        //                 }
        //             }
        //             else{
        //                 // 当第二个宠物未选择时
        //                 if(this.targetInfo.CostItselfNum != 0){
        //                     // 消耗本体
        //                     if(tempList3[i].pet_id == this.chooseItem1.pet_id){
        //                        if(tempList3[i].pet_quality == this.targetInfo.CostItselfQuality){
        //                             let bg = new cc.Node();
        //                             bg.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Mask_1");
        //                             let arrow = new cc.Node();
        //                             arrow.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Arrow");
        //                             bg.addChild(arrow);
        //                             // bg.scale = 1.3;
        //                             item.addChild(bg);
        //                             item.on(cc.Node.EventType.TOUCH_START, this.onTouchPetItem, this);
        //                        }
        //                        else{
        //                             let bg = new cc.Node();
        //                             bg.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Mask_0");
        //                             let lock = new cc.Node();
        //                             lock.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Lock");
        //                             bg.addChild(lock);
        //                             bg.scale = 1.2;
        //                             item.addChild(bg);
        //                        }
        //                     }
        //                     else{
        //                         let bg = new cc.Node();
        //                         bg.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Mask_0");
        //                         let lock = new cc.Node();
        //                         lock.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Lock");
        //                         bg.addChild(lock);
        //                         bg.scale = 1.2;
        //                         item.addChild(bg);
        //                     }
        //                 }else{
        //                     // 消耗同质量
        //                     if(tempList3[i].pet_quality == this.targetInfo.CostSameTypeQuality){
        //                         let bg = new cc.Node();
        //                         bg.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Mask_1");
        //                         let arrow = new cc.Node();
        //                         arrow.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Arrow");
        //                         bg.addChild(arrow);
        //                         // bg.scale = 1.3;
        //                         item.addChild(bg);
        //                         item.on(cc.Node.EventType.TOUCH_START, this.onTouchPetItem, this);
        //                     }
        //                     else{
        //                         let bg = new cc.Node();
        //                         bg.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Mask_0");
        //                         let lock = new cc.Node();
        //                         lock.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Lock");
        //                         bg.addChild(lock);
        //                         bg.scale = 1.2;
        //                         item.addChild(bg);
        //                     }
        //                 }
        //             }
        //         }
        //     }
        //     if(this.checkCanAdvance(tempList3[i])){
        //         let red = new cc.Node();
        //         red.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Common_Icon_RedDot");
        //         item.addChild(red);
        //         red.setPosition(cc.v2(item.width/2,item.height/2));
        //     }
        //     item.setParent(content);
        // }
   }

   sortList(){
        // this.all_list = new Array<PetInfo>();
        // this.all_list = PetManager.getInstance().getDeepPetList();
        // this.pet_id_num = new Map<string,number>();
        // this.pet_quality_num = new Map<number,number>();
        // this.getPetAdvanceData();
        // this.all_list.sort(this.petInfoSort.bind(this));
   }

    onClickPetBtn(e, num: number) {
        // GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        // num = Number(num);
        // let bottom = this.node.getChildByName("bottom");
        // switch (num) {
        //     case 1:
        //         bottom.getChildByName("3").active = false;
        //         bottom.getChildByName("2").active = false;
        //         this.targetInfo = null;
        //         this.chooseItem1 = null;
        //         this.chooseItem2 = null;
        //         this.chooseItem3 = null;
        //         break;
        //     case 2:
        //         this.chooseItem2 = null;
        //         this.chooseItem3 = null;
        //         break;
        //     case 3:
        //         this.chooseItem3 = null;
        //         break;

        // }
        // this.refreshUi();
   }


   onTouchPetItem(e:cc.Event.EventTouch){
        // GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        // let bottom = this.node.getChildByName("bottom");
        // if(this.targetInfo == null){
        //     // 选中晋级目标
        //     this.chooseItem1 = e.target.getComponent(PetItem).pet_info;
        //     this.targetInfo = SpiritQualityAdvancedManager.getInstance().getJsonSpiritQualityAdvanced(this.chooseItem1.pet_quality);
        //     if(this.targetInfo.CostItselfNum == 2 || this.targetInfo.CostSameTypeNum == 2){
        //         bottom.getChildByName("3").active = true;
        //         bottom.getChildByName("2").active = false;
        //     }
        //     if(this.targetInfo.CostItselfNum == 1 || this.targetInfo.CostSameTypeNum == 1){
        //         bottom.getChildByName("3").active = false;
        //         bottom.getChildByName("2").active = true;
        //     }
        // }else{
        //     // 选中晋级耗材
        //     if(this.chooseItem2 == null){
        //         this.chooseItem2 = e.target.getComponent(PetItem).pet_info;
        //     }else{
        //         if(this.chooseItem3 == null){
        //         this.chooseItem3 = e.target.getComponent(PetItem).pet_info;
        //         }
        //     }
        // }
        // this.refreshUi();
   }

   onTouchMaxQualityPetItem(){
        GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100049));
   }

   loadPrefab(petId: string,parent:cc.Node) {
        cc.resources.load("pet/ui/pet_"+petId, cc.Prefab, (error: Error, assets: cc.Prefab) => {
            if (error) {
                cc.log(error);
                return;
            }
            let node = cc.instantiate(assets)
            node.parent = parent;
            let shadow = node.getChildByName("Sprite_Up_Shadow");
            shadow.parent = parent;
            shadow.scale = node.scale;
            node.zIndex = 1;
            node.setPosition(cc.v2(0,0));
            let s = node.getComponent(sp.Skeleton);
            s.setAnimation(0,"Side_Idle",true);
        });
    }

    getPetAdvanceData(){
        // this.all_list.forEach((v,index) =>{
        //     // let num1 = this.pet_id_num.get(v.pet_id+"_"+v.pet_quality) || 0;
        //     // num1 = num1 + 1;
        //     // console.log(v.pet_id+"_"+v.pet_quality,num1);
        //     // this.pet_id_num[v.pet_id+"_"+v.pet_quality] = num1;
        //     // console.log(v.pet_id+"_"+v.pet_quality,this.pet_id_num[v.pet_id+"_"+v.pet_quality]);
        //     // let num2 = this.pet_quality_num[v.pet_quality] || 0;
        //     // num2 = num2 + 1;
        //     // this.pet_quality_num[v.pet_quality] = num2;
        //     if(this.pet_id_num.has(v.pet_id+"_"+v.pet_quality)){
        //         this.pet_id_num.set(v.pet_id+"_"+v.pet_quality,this.pet_id_num.get(v.pet_id+"_"+v.pet_quality) + 1);
        //     }
        //     else{
        //         this.pet_id_num.set(v.pet_id+"_"+v.pet_quality,1);
        //     }
        //     if(this.pet_quality_num.has(v.pet_quality)){
        //         this.pet_quality_num.set(v.pet_quality,this.pet_quality_num.get(v.pet_quality) + 1)                
        //     }
        //     else{
        //         this.pet_quality_num.set(v.pet_quality,1)    
        //     }
        // })
    }

    checkCanAdvance(info:PetInfo):boolean{
        // GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        // if(info.pet_quality<=1) return false;
        // // if(info.pet_quality == SpiritMessageManager.getInstance().getQualityLimit(info.pet_id)) return false;
        // let data = SpiritQualityAdvancedManager.getInstance().getJsonSpiritQualityAdvanced(info.pet_quality);
        // if(data.CostItselfNum != 0){
        //     // if((this.pet_id_num[info.pet_id + "_" + data.CostItselfQuality] || 0) >= (data.CostItselfNum + 1)){
        //     //     return true;
        //     // }
        //     if(this.pet_id_num.has(info.pet_id + "_" + data.CostItselfQuality)){
        //         if(this.pet_id_num.get(info.pet_id + "_" + data.CostItselfQuality) >= (info.pet_quality == data.CostItselfQuality ? data.CostItselfNum+1 : data.CostItselfNum)){
        //             return true;
        //         }
        //     }
        //     return false;
        // }
        // else{
        //     // if(this.pet_quality_num[data.CostSameTypeQuality] >= (data.CostSameTypeNum + 1)){
        //     //     return true;
        //     // }
        //     if(this.pet_quality_num.has(data.CostSameTypeQuality)){
        //         if(this.pet_quality_num.get(data.CostSameTypeQuality) >= (info.pet_quality == data.CostSameTypeQuality ? data.CostSameTypeNum + 1:data.CostSameTypeNum)){
        //             return true;
        //         }
        //     }
        // }
            return false;
    }
    // 自定义排序
    petInfoSort(a:PetInfo,b:PetInfo):number{
        let cb = this.checkCanAdvance(b);
        if(cb){
            let ca = this.checkCanAdvance(a)
            if(ca){
                return b.pet_level - a.pet_level;
            }
            return 1;
        }else{
            return b.pet_level - a.pet_level;
        }
    }

    selectPetList(list:PetInfo[],target:boolean):PetInfo[]{
        let tempList: PetInfo[] = [];
        for(let i = 0;i < list.length;i++){
            if(this.checkCanAdvance(list[i]) == target){
                tempList.push(list[i]);
            }
        }
        return tempList;
    }

    onClickAdvanceBtn(){
        // GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        // if(this.targetInfo != null){
        //     if(this.targetInfo.CostItselfNum == 2 || this.targetInfo.CostSameTypeNum == 2){
        //         if(this.chooseItem2 != null && this.chooseItem3 != null){
        //             let bottom = this.node.getChildByName("bottom");
        //             let oldPetInfo = cc.instantiate(this.chooseItem1);
        //             PetManager.getInstance().removePet(this.chooseItem2);
        //             PetManager.getInstance().removePet(this.chooseItem3);
        //             PetManager.getInstance().setPetQuality(this.chooseItem1,this.targetInfo.TargetQuality);
        //             PetManager.getInstance().saveAllPetList();
        //             PetManager.getInstance().loadAllPetData();
        //             bottom.getChildByName("3").active = false;
        //             bottom.getChildByName("2").active = false;
        //             UIManager.getInstance().showPetAdvanceShowUi(null,this.chooseItem1,oldPetInfo);

        //             // switch(SpiritMessageManager.getInstance().getSpiritRarity(this.chooseItem2.pet_id)){
        //             //     case 2:
        //             //         FollowManager.getInstance().followEvent(Follow_Type.记录进阶消耗的史诗稀有度宠物);
        //             //         break;
        //             //     case 3:
        //             //         FollowManager.getInstance().followEvent(Follow_Type.记录进阶消耗的神话稀有度宠物);
        //             //         break;
        //             //     case 4:
        //             //         FollowManager.getInstance().followEvent(Follow_Type.记录进阶消耗的SP稀有度宠物);
        //             //         break;
        //             // }

        //             // switch(SpiritMessageManager.getInstance().getSpiritRarity(this.chooseItem3.pet_id)){
        //             //     case 2:
        //             //         FollowManager.getInstance().followEvent(Follow_Type.记录进阶消耗的史诗稀有度宠物);
        //             //         break;
        //             //     case 3:
        //             //         FollowManager.getInstance().followEvent(Follow_Type.记录进阶消耗的神话稀有度宠物);
        //             //         break;
        //             //     case 4:
        //             //         FollowManager.getInstance().followEvent(Follow_Type.记录进阶消耗的SP稀有度宠物);
        //             //         break;
        //             // }

        //             FollowManager.getInstance().followEvent(Follow_Type.记录不同品质的成功进阶次数完成时品质 + this.chooseItem1.pet_quality);
        //             this.targetInfo = null;
        //             this.chooseItem1 = null;
        //             this.chooseItem2 = null;
        //             this.chooseItem3 = null;
        //             // this.sortList();
        //             this.refreshUi();
        //             // GameManager.getInstance().showMessage("进阶成功！");
        //             GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Hecheng);
        //             FollowManager.getInstance().followEvent(Follow_Type.记录宠物进阶成功);
        //             return;
        //         }
        //     }
        //     if(this.targetInfo.CostItselfNum == 1 || this.targetInfo.CostSameTypeNum == 1){
        //         if(this.chooseItem2 != null){
        //             let bottom = this.node.getChildByName("bottom");
        //             let oldPetInfo = cc.instantiate(this.chooseItem1);
        //             PetManager.getInstance().removePet(this.chooseItem2);
        //             PetManager.getInstance().setPetQuality(this.chooseItem1,this.targetInfo.TargetQuality);
        //             PetManager.getInstance().saveAllPetList();
        //             PetManager.getInstance().loadAllPetData();
        //             bottom.getChildByName("3").active = false;
        //             bottom.getChildByName("2").active = false;
        //             UIManager.getInstance().showPetAdvanceShowUi(null,this.chooseItem1,oldPetInfo);

        //             // switch(SpiritMessageManager.getInstance().getSpiritRarity(this.chooseItem2.pet_id)){
        //             //     case 2:
        //             //         FollowManager.getInstance().followEvent(Follow_Type.记录进阶消耗的史诗稀有度宠物);
        //             //         break;
        //             //     case 3:
        //             //         FollowManager.getInstance().followEvent(Follow_Type.记录进阶消耗的神话稀有度宠物);
        //             //         break;
        //             //     case 4:
        //             //         FollowManager.getInstance().followEvent(Follow_Type.记录进阶消耗的SP稀有度宠物);
        //             //         break;
        //             // }

        //             FollowManager.getInstance().followEvent(Follow_Type.记录不同品质的成功进阶次数完成时品质 + this.chooseItem1.pet_quality);
        //             this.targetInfo = null;
        //             this.chooseItem1 = null;
        //             this.chooseItem2 = null;
        //             this.chooseItem3 = null;
        //             // this.sortList();
        //             this.refreshUi();
        //             // GameManager.getInstance().showMessage("进阶成功！");
        //             GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Hecheng);
        //             FollowManager.getInstance().followEvent(Follow_Type.记录宠物进阶成功);
        //         }
        //     }
        //     // if(this.targetInfo.CostItselfNum != 0){
        //     //     if(this.targetInfo.CostSameTypeNum == 2){
        //     //         if(this.chooseItem2!= null && this.chooseItem3 != null){

        //     //         }
        //     //     }else{
        //     //         if(this.chooseItem2 != null){

        //     //         }
        //     //     }
        //     // }
        //     // else{
        //     //     if(this.targetInfo.CostSameTypeNum == 2){
        //     //         if(this.chooseItem2!= null && this.chooseItem3 != null){

        //     //         }
        //     //     }
        //     // }
        // }
    }

    clickBtnClose()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.destroySelf();
    }

    destroySelf()
    {
        super.onClose();
        ApkManager.getInstance().closeBanner();
        // EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_SignIn);
    }

}
