import ApkManager from "../Ads/ApkManager";
import GameManager from "../GameManager";
import { CustomsClearanceRebateManager } from "../JsonData/CustomsClearanceRebate";
import { LevelUpRebateManager } from "../JsonData/LevelUpRebate";
import LabelLanguage from "../multiLanguage/LabelLanguage";
import { LanguageIndex } from "../multiLanguage/LanguageConstants";
import LanguageManager from "../multiLanguage/LanguageManager";
import TextLanguage from "../multiLanguage/TextLanguage";
import { PropId } from "../Prop/PropConfig";
import { PropManager } from "../Prop/PropManager";
import { SoundIndex } from "../Sound/AudioConstants";
import { PayUiIndex, PayId } from "../thirdParty/ThirdParty";
import { EventManager, RedEventString, RedEventType } from "../Tools/EventManager";
import UIComponent from "../UI/UIComponent";
import UserData from "../UserData";
import { PaidItemManager } from "./Data/PaidItem";
import { PayManager } from "./PayManager";
import { RabateType, RabateManager } from "./RabateManager";



const {ccclass, property} = cc._decorator;

@ccclass
export default class RabateUi extends UIComponent {

    // @property(cc.Prefab)
    // help:cc.Prefab=null;

    cur_show_index:RabateType=RabateType.Campaign;

    onLoad(): void {
        super.onLoad();
        this.loadLevelItem();
        // this.loadUserItem();
        this.node.getChildByName('item').removeFromParent();
        this.refreshUi();
    }

    protected start(): void {
        PayManager.getInstance().addTodayShow(PayUiIndex.FanLi);
        EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_Shop_FanLi);
        this.adaptation();
    }

    
    private adaptation()
    {        
        let bottomNode=this.node.parent.getChildByName('bottom');
        let bottomHeight=bottomNode.height;
        let bottomY=bottomNode.y;        
        let topNode=this.node.parent.getChildByName('top');
        let topHeight=topNode.height;
        let topY=topNode.y;
        let height=((topY-topHeight)-(bottomY+bottomHeight));
        let centerY=(topY-topNode.height - this.node.getChildByName("icon").height);
        let scrollView=this.node.getChildByName('scrollView');
        scrollView.height=height - this.node.getChildByName("icon").height;
        scrollView.y=centerY
        scrollView.getChildByName('view').height=height - this.node.getChildByName("icon").height;
        // scrollView.getChildByName('view').y = 0;
        this.node.getChildByName("icon").y = topNode.y - (topNode.height);
    }

    loadLevelItem(){
        let copyItem=this.node.getChildByName('item');
        let num=CustomsClearanceRebateManager.getMaxRewardID();
        // let level=this.node.getChildByName('level');        
        let content=this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content;
        this.node.getChildByName("icon").getChildByName("richLabel").getComponent(cc.RichText).string = LanguageManager.getInstance().getStrByTextId(920007);
        //文本
        // let contentStr=LanguageManager.getInstance().getStrByTextId(80001);        
        let ccrm=CustomsClearanceRebateManager.getInstance();
        //总奖励
        let total=0;
        for(let i=1; i<=num; i++){
            let item=cc.instantiate(copyItem);
            item.x=0;
            item.name="item"+i;
            content.addChild(item);
            //获得数据
            let rd=RabateManager.getRabateData(RabateType.Campaign,i);
            //奖励数量
            let rewardNum=ccrm.getGetGem(i);
            // let numLabel=item.getChildByName('numLabel').getComponent(cc.Label);
            // numLabel.string=rewardNum+"";
            let t = PropManager.getInstance().createPropItem(PropId.Gem,rewardNum);
            t.setParent(item.getChildByName("kuang"));
            total+=rewardNum;
            //内容信息+条件
            let contentLabel=item.getChildByName('contentLabel').getComponent(TextLanguage);
            contentLabel.setReplaceValue('~',rd.need_num + '');
            //进度情况
            let completeLabel=item.getChildByName('completeLabel').getComponent(cc.Label);            
            completeLabel.string=rd.cur_num+"/"+rd.need_num;
            completeLabel.node.color=rd.is_complete?cc.color(131,110,77):cc.color(213,53,16);
            item.getChildByName('finish').active=rd.is_claimed;
            //按钮
            // let btnClam=item.getChildByName('btnClam');
            // btnClam.active=!rd.is_claimed;
            // if(btnClam.active){
            //     let btn=btnClam.getComponent(cc.Button);
            //     btn.interactable=rd.is_complete;
                // btn.clickEvents[0].customEventData=""+i;
                // btnClam.getChildByName('clamText').color=rd.is_complete?cc.color(124,82,13):cc.color(91,91,91);
            // }
            if(rd.is_complete){
                if(rd.is_claimed){
                    item.getChildByName("btnYes").active = true;
                }else{
                    item.getChildByName("btnClam").active = true;
                    let btn=item.getChildByName("btnClam").getComponent(cc.Button);
                    btn.clickEvents[0].customEventData=""+i;
                }
            }else{
                item.getChildByName("btnNo").active = true;
            }
            if(rd.is_claimed){
                item.zIndex=1;
            }
        }
        // level.getChildByName('numLabel').getComponent(cc.Label).string=total.toString();
        // level.getChildByName('valueText').getComponent(cc.Label).string=total/10+"% "+LanguageManager.getInstance().getString(LanguageIndex.Value);
    }

    // loadUserItem(){
    //     let copyItem=this.node.getChildByName('item');
    //     let num=LevelUpRebateManager.getMaxRewardID();
    //     let user=this.node.getChildByName('user');
    //     let content=user.getChildByName('scrollView').getComponent(cc.ScrollView).content;
    //     //文本
    //     let contentStr=LanguageManager.getInstance().getStrByTextId(80002);
    //     //当前的等级
    //     let userLevel=UserData.getInstance().getUserLevel();        
    //     let lurm=LevelUpRebateManager.getInstance();
        
    //     //总奖励
    //     let total=0;
    //     for(let i=1; i<=num; i++){
    //         let item=cc.instantiate(copyItem);
    //         item.x=0;
    //         item.name="item"+i;
    //         content.addChild(item);
    //         //获得数据
    //         let rd=RabateManager.getRabateData(RabateType.Growth,i);
    //         //奖励数量
    //         let rewardNum=lurm.getGetGem(i);
    //         // let numLabel=item.getChildByName('numLabel').getComponent(cc.Label);
    //         // numLabel.string=rewardNum+"";
    //         let t = PropManager.getInstance().createPropItem(PropId.Gem,rewardNum);
    //         t.setParent(item.getChildByName("kuang"));
    //         total+=rewardNum;
    //         //内容信息+条件
    //         let contentLabel=item.getChildByName('contentLabel').getComponent(cc.Label);
    //         contentLabel.string=contentStr+" "+rd.need_num;
    //         //进度情况
    //         let completeLabel=item.getChildByName('completeLabel').getComponent(cc.Label);            
    //         completeLabel.string=rd.cur_num+"/"+rd.need_num;            
    //         completeLabel.node.color=rd.is_complete?cc.color(131,110,77):cc.color(213,53,16);
    //         item.getChildByName('finish').active=rd.is_claimed;
    //         //按钮
    //         let btnClam=item.getChildByName('btnClam');
    //         btnClam.active=!rd.is_claimed;
    //         if(btnClam.active){
    //             let btn=btnClam.getComponent(cc.Button);
    //             btn.interactable=rd.is_complete;
    //             btn.clickEvents[0].customEventData=""+i;
    //             btnClam.getChildByName('clamText').color=rd.is_complete?cc.color(124,82,13):cc.color(91,91,91);
    //         }    
    //         if(rd.is_claimed){
    //             item.zIndex=1;
    //         }        
    //     }
    //     //等级，总奖励，价值
    //     // user.getChildByName('numLabel').getComponent(cc.Label).string=total.toString();
    //     // user.getChildByName('levelLabel').getComponent(cc.Label).string=LanguageManager.getInstance().getString(LanguageIndex.PlayerLv)+userLevel;
    //     // user.getChildByName('valueText').getComponent(cc.Label).string=total/10+"% "+LanguageManager.getInstance().getString(LanguageIndex.Value);
    // }

    refreshUi(){
        switch(this.cur_show_index){
            case RabateType.Campaign:{
                this.showLevelUi();
            }break;
            // case RabateType.Growth:{
            //     this.showUserUi();
            // }
        }
    }
    
    showLevelUi(){
        this.cur_show_index=RabateType.Campaign;
        let bottom=this.node.getChildByName('bottom');
        bottom.y=-cc.winSize.height/2;
        // let btnLevel=bottom.getChildByName('btnLevel');
        // btnLevel.getComponent(cc.Button).interactable=false;
        // btnLevel.height=71;
        // let btnUser=bottom.getChildByName('btnUser');
        // btnUser.getComponent(cc.Button).interactable=true;
        // btnLevel.height=85;
        // bottom.getChildByName('levelText').color=cc.color(240,230,166);//亮点
        // bottom.getChildByName('userText').color=cc.color(242,225,172);
        this.node.getChildByName('titleText').getComponent(TextLanguage).setTextId(900001);

        let level=this.node.getChildByName('level');
        level.active=true;
        let user=this.node.getChildByName('user');
        user.active=false;
        //刷新状态
        let num=CustomsClearanceRebateManager.getMaxRewardID();
        let content=this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content;
        let isCan=false;
        for(let i=1; i<=num; i++){
            let item=content.getChildByName('item'+i);
            //获得数据
            let rd=RabateManager.getRabateData(RabateType.Campaign,i);            
            //按钮
            let btnClam=item.getChildByName('btnClam');
            btnClam.active=!rd.is_claimed;
            item.getChildByName('finish').active=rd.is_claimed;
            //如果么有领取
            if(rd.is_complete){
                if(rd.is_claimed){
                    item.getChildByName("btnYes").active = true;
                }else{
                    item.getChildByName("btnClam").active = true;
                    let btn=item.getChildByName("btnClam").getComponent(cc.Button);
                    isCan = true;
                    btn.clickEvents[0].customEventData=""+i;
                }
            }else{
                item.getChildByName("btnNo").active = true;
            }
            if(rd.is_claimed){
                item.zIndex=1;
            }
        }
        //获取购买状态
        let btnBuy=this.node.getChildByName("icon").getChildByName('btnBuy').getComponent(cc.Button);
        let priceText=this.node.getChildByName("icon").getChildByName('priceText').getComponent(cc.Label);
        //获得数据
        let payNum=PayManager.getInstance().getPayNum('b401');
        if(payNum>0){
            priceText.string=LanguageManager.getInstance().getStrByTextId(100012);
            //根据领取状态判断能否点击
            btnBuy.interactable=isCan;            
        }else{
            let payInfo = PayManager.getInstance().getPayInfo('b401');
            // priceText.string= payInfo.price + payInfo.currency;
            priceText.string= payInfo.price;
            btnBuy.interactable=true;
        }
        // priceText.node.color=btnBuy.interactable?cc.color(124,82,13):cc.color(91,91,91);
        if(btnBuy.interactable){
            priceText.node.getComponent(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        }else{
            priceText.node.getComponent(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        }
    }

    // showUserUi(){
    //     this.cur_show_index=RabateType.Growth;
    //     let bottom=this.node.getChildByName('bottom');
    //     bottom.y=-cc.winSize.height/2;
    //     // let btnLevel=bottom.getChildByName('btnLevel');
    //     // btnLevel.getComponent(cc.Button).interactable=true;
    //     // btnLevel.height=85;
    //     // let btnUser=bottom.getChildByName('btnUser');
    //     // btnUser.getComponent(cc.Button).interactable=false;
    //     // btnLevel.height=71;

    //     // bottom.getChildByName('userText').color=cc.color(240,230,166);//亮点
    //     // bottom.getChildByName('levelText').color=cc.color(242,225,172);
    //     this.node.getChildByName('titleText').getComponent(LabelLanguage).setLanguageIndex(LanguageIndex.GrowthInvestment);

    //     let level=this.node.getChildByName('level');
    //     level.active=false;
    //     let user=this.node.getChildByName('user');
    //     user.active=true;

    //     //刷新状态
    //     let num=LevelUpRebateManager.getMaxRewardID();
    //     let content=user.getChildByName('scrollView').getComponent(cc.ScrollView).content;
    //     let isCan=false;
    //     for(let i=1; i<=num; i++){
    //         let item=content.getChildByName('item'+i);
    //         //获得数据
    //         let rd=RabateManager.getRabateData(RabateType.Growth,i);            
    //         //按钮
    //         let btnClam=item.getChildByName('btnClam');
    //         btnClam.active=!rd.is_claimed;
    //         item.getChildByName('finish').active=rd.is_claimed;
    //         //如果么有领取
    //         if(btnClam.active){
    //             btnClam.getComponent(cc.Button).interactable=rd.is_complete;
    //             btnClam.getChildByName('clamText').color=rd.is_complete?cc.color(124,82,13):cc.color(91,91,91);
    //             //如果么有领取并且完成了
    //             if(rd.is_complete){
    //                 isCan=true;
    //             }
    //         }
    //         if(rd.is_claimed){
    //             item.zIndex=1;
    //         }
    //     }
    //     //获取购买状态
    //     let btnBuy=this.node.getChildByName('btnBuy').getComponent(cc.Button);
    //     let priceText=this.node.getChildByName('icon').getChildByName('priceText').getComponent(cc.Label);
    //     //获得数据
    //     let payNum=PayManager.getInstance().getPayNum('PayId.Growth');
    //     if(payNum>0){
    //         priceText.string=LanguageManager.getInstance().getString(LanguageIndex.CLAIM_ALL);
    //         //根据领取状态判断能否点击
    //         btnBuy.interactable=isCan;
    //     }else{
    //         priceText.string=PaidItemManager.getInstance().getPrice('b'+PayId.Growth)+"$";
    //         btnBuy.interactable=true;
    //     }
    //     // priceText.node.color=btnBuy.interactable?cc.color(124,82,13):cc.color(91,91,91);
    //     if(btnBuy.interactable){
    //         priceText.node.getComponent(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
    //     }else{
    //         priceText.node.getComponent(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
    //     }
    // }

    clickBtnLevel(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.cur_show_index=RabateType.Campaign;
        this.refreshUi();
        
    }

    clickBtnUser(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.cur_show_index=RabateType.Growth;
        this.refreshUi();
 
    }

    clickBtnClaim(btn,idStr:string){
        let id=parseInt(idStr);
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        switch(this.cur_show_index){
            case RabateType.Campaign:{

                let payNum=PayManager.getInstance().getPayNum('b401');
                let payInfo = PayManager.getInstance().getPayInfo('b401');
                if(payNum>0){
                    //领取所有
                    let rewardData=RabateManager.claimOnce(RabateType.Campaign,id);
                    if(rewardData.reward_num>0){
                        // GameData.getInstance().changeGem(rewardData.reward_num);
                        // let gemItem=GameManager.getInstance().box_json_data.createBoxItem(rewardData.reward_id,rewardData.reward_num);
                        PropManager.getInstance().changePropNum(PropId.Gem,rewardData.reward_num);
                        let gemItem = PropManager.getInstance().createPropItem(PropId.Gem,rewardData.reward_num);
                        GameManager.getInstance().showGetTip(gemItem);
                        this.refreshUi();
                    }
                }else{
                    GameManager.getInstance().showBuyDialog(LanguageManager.getInstance().getStrByTextId(920004),()=>{
                        ApkManager.getInstance().showPay({result:(isPay:boolean)=>{
                            if(isPay){
                                PayManager.getInstance().addPayNum('b401');
                                this.refreshUi();
                            }
                        }},'b401')
                    },null,2,payInfo.price,payInfo.currency);
                }
            }break;
            case RabateType.Growth:{

                
            }break;
        }
    }

    clickBtnBuy(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        switch(this.cur_show_index){
            case RabateType.Campaign:{
                //获得数据
                let payNum=PayManager.getInstance().getPayNum('b401');
                if(payNum>0){
                    //领取所有
                    let rewardData=RabateManager.claimAll(RabateType.Campaign);
                    if(rewardData.reward_num>0){
                        // GameData.getInstance().changeGem(rewardData.reward_num);
                        // let gemItem=GameManager.getInstance().box_json_data.createBoxItem(rewardData.reward_id,rewardData.reward_num);
                        PropManager.getInstance().changePropNum(PropId.Gem,rewardData.reward_num);
                        let gemItem = PropManager.getInstance().createPropItem(PropId.Gem,rewardData.reward_num);
                        GameManager.getInstance().showGetTip(gemItem);
                        this.refreshUi();
                    }
                }else{
                    ApkManager.getInstance().showPay({result:(isPay:boolean)=>{
                        if(isPay){
                            PayManager.getInstance().addPayNum('b401');
                            this.refreshUi();
                        }
                    }},'b401')
                }
            }break;
            case RabateType.Growth:{
                
            }break;
        }
    }    

    clickBtnClose(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        super.onClose();
    }

    // clickBtnTip(){
    //     GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
    //     let help=cc.instantiate(this.help);
    //     this.node.addChild(help);
    // }

    
}
