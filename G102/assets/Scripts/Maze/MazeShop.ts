import EquipItem from "../Equipment/Ui/EquipItem";
import GameManager from "../GameManager";
import { LevelManager } from "../Level/LevelManager";
import { MissionLevelManager } from "../Level/MissionLevel";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import { LanguageIndex } from "../multiLanguage/LanguageConstants";
import LanguageManager from "../multiLanguage/LanguageManager";
import Prop from "../Prop/Prop";
import { PropAction, PropId } from "../Prop/PropConfig";
import { PropManager } from "../Prop/PropManager";
import { SoundIndex } from "../Sound/AudioConstants";
import MyTool from "../Tools/MyTool";
import UIComponent from "../UI/UIComponent";
// import { RogueShopManager } from "./Data/RogueShop";
import { RogueTextManager } from "./Data/RogueText";
import { MazeManager, PropIndex, ShopPropList } from "./MazeManager";
import MazeUi from "./MazeUi";


const {ccclass, property} = cc._decorator;

@ccclass
export default class MazeShop extends UIComponent {
    /**格子id */
    box_id:number=0;
    hexagon_type:number=4;
    is_can_go:boolean=false;

    initData(id:number,isCanGo:boolean){
        this.box_id=id;
        this.is_can_go=isCanGo;
        this.initUi();
    }

    initUi(){
        //标题
        let jsonData=RogueTextManager.getInstance().getJsonRogueText(this.hexagon_type);
        let titleLabel=this.node.getChildByName('titleLabel');
        titleLabel.getComponent(cc.Label).string=LanguageManager.getInstance().getStrByTextId(jsonData.Roguetitle_ID);
        let contentLabel=this.node.getChildByName('contentLabel');
        contentLabel.getComponent(cc.Label).string=LanguageManager.getInstance().getStrByTextId(jsonData.RogueText_ID);        
        let btnNo=this.node.getChildByName('btnNo');
        btnNo.active=this.is_can_go;
        let btnYes=this.node.getChildByName('btnYes');
        btnYes.active=this.is_can_go;
        if(this.is_can_go)
        {
            if(MazeManager.getInstance().getPassingId()==this.box_id){
                btnNo.active=true;
                btnYes.active=false;
            }else{
                btnNo.active=false;
                btnYes.active=true;
            }
        }
        this.initItemList();
    }

    initItemList(){
        let level=LevelManager.getInstance().finish_level+1;
        level=level>MissionLevelManager.getMaxLevel()?MissionLevelManager.getMaxLevel():level;
        let finishChapter=MissionLevelManager.getInstance().getChapter(level);
        return
        // let jsonData=RogueShopManager.getInstance().getJsonRogueShop(finishChapter);
        // //判断是不是第一次打开
        // let list:PropIndex[]=MazeManager.getInstance().getAPropIndex(this.box_id);
        // let saleArr=[0.2,0.3,0.4];
        // if(list.length>0){
        // }else{
        //     let itemIndexs=MyTool.getWeightIndexs(jsonData.RogueWeight,4);
        //     //折扣                                    
        //     for(let i=0; i<itemIndexs.length; i++){
        //         let propIndex:PropIndex={
        //             prop_index: itemIndexs[i],
        //             prop_sale: saleArr[Math.floor(Math.random()*saleArr.length)],
        //         }
        //         list.push(propIndex);
        //     }
        //     let al={
        //         box_id: this.box_id,
        //         prop_list: list,                
        //     }
        //     MazeManager.getInstance().setShopProp(al);
        // }
        // let itemRoot=this.node.getChildByName('item_root');
        // let pac=this.is_can_go&&MazeManager.getInstance().getFightingId()==this.box_id?PropAction.Buy:PropAction.Look;
        // for(let i=0; i<list.length; i++){
        //     let itemIndex=list[i];
        //     let item=PropManager.getInstance().createSalePropItem(jsonData.RogueProductList[itemIndex.prop_index],jsonData.RogueProductQuantity[itemIndex.prop_index],pac);
        //     itemRoot.addChild(item);
        //     let itemTs=item.getComponent(EquipItem)
        //     if(itemTs){
        //         itemTs.initSaleItem(PropId.Gem,jsonData.RogueProductPrice[itemIndex.prop_index],itemIndex.prop_sale*100);
        //         itemTs.addBuyListen(()=>{
        //             itemTs.soldOut();
        //         });
        //     }else{
        //         let propTs=item.getComponent(Prop)
        //         if(propTs){
        //             propTs.initSaleItem(PropId.Gem,jsonData.RogueProductPrice[itemIndex.prop_index],itemIndex.prop_sale*100);
        //             propTs.addBuyListen(()=>{
        //                 propTs.soldOut();
        //             });
        //         }
        //     }
            
        // }
    }

    clickBtnYes(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        MazeManager.getInstance().setPassingId(this.box_id);
        MazeManager.getInstance().setFightingId(this.box_id);
        MazeUi.getInstance().refreshFloor();
        super.onClose();
        FollowManager.getInstance().followEvent(Follow_Type.rogue玩法商店事件);
    }

    clickBtnNo(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        //MazeManager.getInstance().setPassingId(this.box_id);
        MazeManager.getInstance().addMazePassedId(this.box_id);
        MazeUi.getInstance().refreshFloor();
        super.onClose();
    }

}
