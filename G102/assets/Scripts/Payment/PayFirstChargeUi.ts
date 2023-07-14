import ApkManager from "../Ads/ApkManager";
import GameManager from "../GameManager";
import { HeroManager } from "../Hero/Data/HeroManager";
import { RewardData } from "../JsonData/LevelJsonData";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import LanguageManager from "../multiLanguage/LanguageManager";
import { PropManager } from "../Prop/PropManager";
import { SoundIndex } from "../Sound/AudioConstants";
import { StorageKey } from "../Storage/StorageConfig";
import { TheStorageManager } from "../Storage/StorageManager";
import StoreHeroShowUi from "../Store/StoreHeroShowUi";
import { PayUiIndex } from "../thirdParty/ThirdParty";
import { EventManager, RedEventString, RedEventType } from "../Tools/EventManager";
import MainUi from "../UI/home/MainUi";
import UIComponent from "../UI/UIComponent";
import { UIPath, UILayerLevel } from "../UI/UIConfig";
import { UiAction } from "../UI/UiInterface";
import { UIManager } from "../UI/UIManager";
import { PayManager } from "./PayManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PayFirstChargeUi extends UIComponent {

    reward_list:RewardData[] =[
        {reward_id:110008,reward_num:0},
        {reward_id:30113,reward_num:1},
        {reward_id:30213,reward_num:1},
        {reward_id:30313,reward_num:1},
        {reward_id:30413,reward_num:1},
        {reward_id:10002,reward_num:600},
        {reward_id:40004,reward_num:10}];
    
    // protected start(): void{
    //     this.init(null);
    // }
    @property(cc.Node)
    itmeparent: cc.Node = null;
    
    id="c301"
    itemarr:cc.Node[]=[]

    init(uiAc: UiAction): void {
        super.init(uiAc);
        this.refreshData();
        EventManager.postRedEvent(RedEventString.RED_TIP,RedEventType.Btn_Main_ShouChong,false,RedEventType.Btn_Main_ShouChong);
        FollowManager.getInstance().followEvent(Follow_Type.首充点击次数);
    }

    refreshData(){
        
        for (let itemarrindex = 0; itemarrindex < this.itemarr.length; itemarrindex++) {
            this.itemarr[itemarrindex].removeFromParent()
        }
        for (let index = 0; index < this.reward_list.length; index++) {
            // let item=PropManager.getInstance().createPropItem(rewardData.reward_id,rewardData.reward_num);
            // item.scale=0.82;
            // item.parent=this.prop;
            // item.x=-67+level3*90;
            // item.y=-40+Starindex*115-115;
            let item = PropManager.getInstance().createPropItem(this.reward_list[index].reward_id,this.reward_list[index].reward_num);
            item.scale = 0.9;
            item.parent=this.itmeparent.children[index]
            this.itemarr.push(item)
            // .addChild(item);
        }

        this.node.getChildByName("richText").getComponent(cc.RichText).string = LanguageManager.getInstance().getStrByTextId(1440002);
        this.node.getChildByName("goBtn").getChildByName("txt").getComponent(cc.Label).string=""+PayManager.getInstance().getPayInfo(this.id).price
        this.node.getChildByName("goBtn").active = PayManager.getInstance().getPayNum('c301')<=0;
        // if(PayManager.getInstance().getIsFirstPay()){
        //     this.node.getChildByName("goBtn").active = false;
        //     this.node.getChildByName("getBtn").active = true;
        // }else{
        //     this.node.getChildByName("goBtn").active = true;
        //     this.node.getChildByName("getBtn").active = false;
        // }
    }

    onClickGoBtn(){
        FollowManager.getInstance().followEvent(Follow_Type.首充点击购买按钮);
        if(PayManager.getInstance().getPayNum('c301')<=0){
            ApkManager.getInstance().showPay({result:(isPay:boolean)=>{
                if(isPay){
                    FollowManager.getInstance().followEvent(Follow_Type.首充购买成功按钮);
                    this.onClickReceiveBtn()
                }
            }},this.id)
        }        
    }

    onClickReceiveBtn(){
        if(TheStorageManager.getInstance().getNumber(StorageKey.StoreHeroID + this.reward_list[0].reward_id % 110000,0) == 0){
            UIManager.getInstance().showUiDialog(UIPath.StoreHeroShowUi,UILayerLevel.Two,{onCompleted:(uiNode)=>{
                uiNode.getComponent(StoreHeroShowUi).init({
                    onClose:()=>{
                        let rewardList:cc.Node[] = [];
                        this.reward_list.forEach((v,k) =>{
                            let item = PropManager.getInstance().createPropItem(v.reward_id,v.reward_num);
                            PropManager.getInstance().changePropNum(v.reward_id,v.reward_num);            
                            rewardList.push(item);
                        });
                        PayManager.getInstance().addPayNum(this.id);
                        TheStorageManager.getInstance().setItem(StorageKey.FirstPayGetState,1);
                        GameManager.getInstance().showMultipleGetTip(rewardList,(()=>{
                            this.destroySelf();
                            let mainNode=cc.find('Canvas/main_ui');
                            if(mainNode){
                                let main=mainNode.getComponent(MainUi);
                                if(main){
                                    main.refreshRight();
                                }
                            }
                            
                        }).bind(this));
                    }
                })
                uiNode.getComponent(StoreHeroShowUi).initData(this.reward_list[0].reward_id % 110000);
            }}); 
        }else{
            let rewardList:cc.Node[] = [];
                        this.reward_list.forEach((v,k) =>{
                            let item = PropManager.getInstance().createPropItem(v.reward_id,v.reward_num);
                            PropManager.getInstance().changePropNum(v.reward_id,v.reward_num);            
                            rewardList.push(item);
                        });
                        PayManager.getInstance().addPayNum(this.id);
                        TheStorageManager.getInstance().setItem(StorageKey.FirstPayGetState,1);
                        GameManager.getInstance().showMultipleGetTip(rewardList,(()=>{
                            this.destroySelf();
                            let mainNode=cc.find('Canvas/main_ui');
                            if(mainNode){
                                let main=mainNode.getComponent(MainUi);
                                if(main){
                                    main.refreshRight();
                                }
                            }
                            
                        }).bind(this));
        }
        HeroManager.getInstance().reportHeroList();
    }

    // clickBtnClose()
    // {
    //     GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
    //     this.destroySelf();
    // }

    destroySelf()
    {
        for (let itemarrindex = 0; itemarrindex < this.itemarr.length; itemarrindex++) {
            this.itemarr[itemarrindex].removeFromParent()
        }
        this.itemarr=new Array();
        super.onClose();
        ApkManager.getInstance().closeBanner();
    }
    
}
