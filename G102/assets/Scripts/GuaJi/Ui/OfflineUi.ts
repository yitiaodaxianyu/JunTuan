import AdManager from "../../Ads/AdManager";
import ApkManager from "../../Ads/ApkManager";
import { IsDebug, VIDEO_TYPE } from "../../Constants";
import { EquipmentManager } from "../../Equipment/EquipmentManager";
import GameManager from "../../GameManager";
import { OfflineRevenueManager } from "../../JsonData/OfflineRevenue";
import { LevelManager } from "../../Level/LevelManager";
import { Follow_Type } from "../../multiLanguage/FollowConstants";
import FollowManager from "../../multiLanguage/FollowManager";
import { LanguageIndex } from "../../multiLanguage/LanguageConstants";
import LanguageManager from "../../multiLanguage/LanguageManager";
import { PropManager } from "../../Prop/PropManager";
import { PropId } from "../../Prop/PropConfig";
import { SoundIndex } from "../../Sound/AudioConstants";
import { EventManager, RedEventString, RedEventType } from "../../Tools/EventManager";
import { DingYueManager } from "../../Payment/DingYueManager";
import UIComponent from "../../UI/UIComponent";
import { UIManager } from "../../UI/UIManager";
import { UILayerLevel, UIPath } from "../../UI/UIConfig";
import FastGuaJiUi from "./FastGuaJiUi";
import MyTool from "../../Tools/MyTool";
import TaskManager from "../../Task/TaskManager";
import { TaskItem } from "../../Task/TaskEnum";
import { RewardData } from "../../JsonData/LevelJsonData";


const {ccclass, property} = cc._decorator;

@ccclass
export default class OfflineUi extends UIComponent {

    @property(cc.Prefab)
    prefab_num:cc.Prefab=null;

    @property(cc.SpriteFrame)
    sp_vip:cc.SpriteFrame=null;//0=金币,1=英雄经验，2=玩家经验

    reward_num0:number=60;
    reward_num1:number=60;
    reward_num2:number=60;
    reward_equip_list:number[]=[];
    reward_equip_num:number[]=[];
    prop_reward:Map<number,number>=null;

    onLoad(){
        super.onLoad();
        this.prop_reward=new Map<number,number>();
    }

    onEnable()
    {
        this.showGuaJiTime();
        this.schedule(this.showGuaJiTime,1);
        ApkManager.getInstance().showBanner();
        this.showRewardList();
    }

    showGuaJiTime()
    {
        let offsetSec=OfflineRevenueManager.getGuaJiSec();
        let shi=Math.floor(offsetSec/3600);
        let shiStr='0'+shi;
        if(shi>=10)
        {
            shiStr=''+shi;
        }
        let fen=Math.floor((offsetSec-shi*3600)/60);
        let fenStr='0'+fen;
        if(fen>=10)
        {
            fenStr=''+fen;
        }
        let miao=offsetSec%60;
        let miaoStr='0'+miao;
        if(miao>=10)
        {
            miaoStr=''+miao;
        }
        
        let timeLabel=this.node.getChildByName('timeLabel').getComponent(cc.Label);
        timeLabel.string= LanguageManager.getInstance().getStrByTextId(100117) + shiStr+':'+fenStr+':'+miaoStr;
        // let timeProgressBar=this.node.getChildByName('timeProgressBar');
        // timeProgressBar.getComponent(cc.ProgressBar).progress=offsetSec/(60*60*8);
        //let level=GameData.getInstance().finish_level;  
        
        let offsetMin=Math.floor(offsetSec/60);
        let level=LevelManager.getInstance().finish_level;
        let maxMin=OfflineRevenueManager.getInstance().getTime(level);
        if(offsetMin>maxMin)
        {
            offsetMin=maxMin;
        }
        if(offsetMin<0)
        {
            offsetMin=0;
        }

        let jsonData=OfflineRevenueManager.getInstance().getJsonOfflineRevenue(level);        
        let coinLabel=this.node.getChildByName('coinLabel').getComponent(cc.Label);
        coinLabel.string=MyTool.getCoinDanwei(jsonData.GetGold * 60)+'/h';
        let heroExpLabel=this.node.getChildByName('heroExpLabel').getComponent(cc.Label);
        heroExpLabel.string=jsonData.GetHeroExp+'/min';
        let userExpLabel=this.node.getChildByName('userExpLabel').getComponent(cc.Label);
        userExpLabel.string=jsonData.GetPromotion+'/min';
        let remainMin=offsetMin-OfflineRevenueManager.getInstance().getRefreshTime();
        if(remainMin>0){
            this.showRewardList();
        }
        //设置领取按钮
        let btnGet=this.node.getChildByName('btnGet');
        let claimText=btnGet.getChildByName('claimText');
        // let btnVideo=this.node.getChildByName('btnVideo');
        let richText=this.node.getChildByName('richText');
        let needMin=IsDebug?1:60;
        if(offsetMin>=needMin){
            // btnGet.x=0;
            // btnGet.y=-280;
            // btnGet.getComponent(cc.Button).interactable=true;
            // claimText.color=cc.color(63,45,33);
            // btnVideo.active=true;
            // richText.active=false;

        }else{
            // btnGet.x=0;
            // btnGet.y=-247;
            // btnGet.getComponent(cc.Button).interactable=false;
            // claimText.getComponent(cc.LabelOutline).color = cc.color(138,138,138);
            // btnVideo.active=false;
            // richText.active=true;
            // let str1=LanguageManager.getInstance().getString(LanguageIndex.You_can_claim_after);
            // offsetSec=3600-offsetSec;
            // let fen=Math.floor((offsetSec-shi*3600)/60);
            // fenStr='0'+fen;
            // if(fen>=10)
            // {
            //     fenStr=''+fen;
            // }
            // miao=offsetSec%60;
            // miaoStr='0'+miao;
            // if(miao>=10)
            // {
            //     miaoStr=''+miao;
            // }
            // let str2=fenStr+':'+miaoStr;
            // richText.ge tComponent(cc.RichText).string="<b>"+LanguageManager.getInstance().getString(LanguageIndex.You_can_claim_after)+"</b>";
        }
    }

    //显示挂机奖励的列表
    showRewardList(){
        let rewardScrollview=this.node.getChildByName('rewardScrollview').getComponent(cc.ScrollView);
        let content=rewardScrollview.content;
        content.removeAllChildren();
        let numRoot=content.parent.getChildByName('num_root');
        numRoot.removeAllChildren();
        let equipRoot=content.parent.getChildByName('equip_root');
        equipRoot.removeAllChildren();
        //添加金币等资源列表
        let level=LevelManager.getInstance().finish_level;
        let jsonData=OfflineRevenueManager.getInstance().getJsonOfflineRevenue(level);
        let offsetMin=OfflineRevenueManager.getGuaJiMin();
        //金币
        let coinNum=jsonData.GetGold*offsetMin;
        //英雄经验
        let heroExpNum=jsonData.GetHeroExp*offsetMin;        
        //玩家经验
        let userExpNum=jsonData.GetPlayerExp*offsetMin;
        //晋升石头
        let stonePromotion=Math.floor(jsonData.GetPromotion*offsetMin);
        //普通精炼石
        let jinglian1=Math.floor(jsonData.GetOrdinaryEnhancementStone*offsetMin);
        //中级精炼石
        let jinglian2=Math.floor(jsonData.GetIntermediateEnhancementStone*offsetMin);
        //高级精炼石
        let jinglian3=Math.floor(jsonData.GetSeniorEnhancementStone*offsetMin);
        this.reward_num0=coinNum;
        this.reward_num1=heroExpNum;
        this.reward_num2=userExpNum;
        //判断一下是否VIP
        let item = null;        
        if(coinNum>0){
            coinNum=Math.floor(coinNum);
            item = PropManager.getInstance().createPropItem(PropId.Coin,coinNum)
            content.addChild(item);
            this.prop_reward.set(PropId.Coin,coinNum);
        }
        if(heroExpNum>0){
            heroExpNum=Math.floor(heroExpNum);
            item = PropManager.getInstance().createPropItem(PropId.HeroExp,heroExpNum)
            content.addChild(item);
            this.prop_reward.set(PropId.HeroExp,heroExpNum);
        }
        if(userExpNum>0){
            item = PropManager.getInstance().createPropItem(PropId.UserExp,userExpNum)
            content.addChild(item);
            this.prop_reward.set(PropId.UserExp,userExpNum);
        }
        if(stonePromotion>0){
            stonePromotion=Math.floor(stonePromotion);
            item = PropManager.getInstance().createPropItem(PropId.HeroStone,stonePromotion)
            content.addChild(item);
            this.prop_reward.set(PropId.HeroStone,stonePromotion);
        }
        if(jinglian1>0){
            item = PropManager.getInstance().createPropItem(PropId.ExclusiveWeaponStone1,jinglian1)
            content.addChild(item);
            this.prop_reward.set(PropId.ExclusiveWeaponStone1,jinglian1);
        }
        if(jinglian2>0){
            item = PropManager.getInstance().createPropItem(PropId.ExclusiveWeaponStone2,jinglian2)
            content.addChild(item);
            this.prop_reward.set(PropId.ExclusiveWeaponStone2,jinglian2);
        }
        if(jinglian3>0){
            item = PropManager.getInstance().createPropItem(PropId.ExclusiveWeaponStone3,jinglian3)
            content.addChild(item);
            this.prop_reward.set(PropId.ExclusiveWeaponStone3,jinglian3);
        }
        //添加装备id列表
        let idList=OfflineRevenueManager.getInstance().getNowEquipIdList();

        let len=idList.length;
        let em=EquipmentManager.getInstance();
        this.reward_equip_list=new Array();
        this.reward_equip_num=new Array();
        //筛选出所有唯一id
        for(let i=0; i<len; i++)
        {
            let id=idList[i];
            let index=this.reward_equip_list.indexOf(id);
            if(index==-1){
                this.reward_equip_list.push(id);
                this.reward_equip_num.push(1);
            }else{
                this.reward_equip_num[index]++;
            }
        }
        len=this.reward_equip_list.length;
        for(let i=0;i<len;i++){
            let item=em.getEquipNodeById(this.reward_equip_list[i]);
            content.addChild(item);            
        }
    }

    addCoin(){
        
    }

    // createKuang(kuangIndex:number):cc.Node{
    //     let kuang=new cc.Node();
    //     kuang.addComponent(cc.Sprite).spriteFrame=this.sp_kuang[kuangIndex];
    //     return kuang;
    // }

    // createWupin(kuangIndex:number,isVip:boolean,num:number):cc.Node{
    //     let content=this.node.getChildByName('rewardScrollview').getComponent(cc.ScrollView).content;
    //     let numRoot=content.parent.getChildByName('num_root');
    //     //框
    //     let kuang=this.createKuang(kuangIndex);               
    //     let node=new cc.Node();
    //     node.addComponent(cc.Sprite).spriteFrame=this.sp_wupin[kuangIndex];
    //     kuang.addChild(node);
    //     let numLabel=cc.instantiate(this.prefab_num);
    //     numLabel.getComponent(cc.Label).string=MyTool.getCoinDanwei(num);
    //     numLabel.setAnchorPoint(cc.v2(0,0.5));
    //     numLabel.getComponent(FixedPos).init(kuang,cc.v2(-16,-32.5),content);
    //     numRoot.addChild(numLabel);
    //     //vip标识
    //     if(isVip){
    //         let vipNode=new cc.Node();
    //         vipNode.addComponent(cc.Sprite).spriteFrame=this.sp_vip;
    //         vipNode.setPosition(cc.v2(36,44));
    //         kuang.addChild(vipNode);
    //     }
    //     content.addChild(kuang);
    //     switch(kuangIndex){
    //         case 0:{
    //             kuang.name="coin"; 
    //             node.name="coin"; 
    //         }break;
    //     }
    //     return node;
    // }

    clickBtnFive()
    {
        FollowManager.getInstance().followEvent(Follow_Type.挂机奖励5倍领取用户数);
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        if(this.reward_num0>0)
        {
            AdManager.getInstance().showVideo((isSuc:boolean)=>{
                if(isSuc)
                {
                    this.getReward(3);
                }else{
                    GameManager.getInstance().showMessage(LanguageManager.getInstance().getString(LanguageIndex.The_ad_failed_to_play_and_the_reward_cannot_be_obtained));
                }
            },VIDEO_TYPE.Coin);
        }
    }

    clickBtnClaim()
    {
        // FollowManager.getInstance().followEvent(Follow_Type.挂机奖励普通领取用户数);
        FollowManager.getInstance().followEvent(Follow_Type.获取离线奖励次数);
        TaskManager.getInstance().emitTask(TaskItem.领取挂机奖励2次);
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        if(this.reward_num0>0)
        {
            this.getReward(1);
            EventManager.postRedEvent(RedEventString.RED_TIP,RedEventType.Btn_Main_Guaji_Btn_GuaJi,false);
        }else{
            GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100115));
        }
    }

    clickBtnFast(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.destroySelf();
        FollowManager.getInstance().followEvent(Follow_Type.快速挂机按钮点击次数);
        UIManager.getInstance().showUiDialog(UIPath.FastGuaJi,UILayerLevel.One,{onCompleted:(uiNode)=>{
            uiNode.getComponent(FastGuaJiUi).init(null);
        }});
    }

    clickBtnClose()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_Guaji);
        this.destroySelf();
    }

    getReward(beishu:number)
    {
        let nodeList=new Array();                
        let em=EquipmentManager.getInstance();
        this.prop_reward.forEach((v,k)=>{
            PropManager.getInstance().changePropNum(k,v);
            let item=PropManager.getInstance().createPropItem(k,v);
            nodeList.push(item);
        })
        //获取装备列表
        // let len=this.reward_equip_list.length;        
        // for(let i=0;i<len;i++){
            
        //     let id=this.reward_equip_list[i];
        //     PropManager.getInstance().changePropNum(id,1);
        //     let item=em.getEquipNodeById(id);                       
        //     let numLabel=cc.instantiate(this.prefab_num);
        //     numLabel.getComponent(cc.Label).string=''+this.reward_equip_num[i];
        //     numLabel.setPosition(cc.v2(40,-36));
        //     item.addChild(numLabel);
        //     nodeList.push(item);
        // }
        let rewardDatas = [];
        let len=this.reward_equip_list.length;        
        for(let i=0;i<len;i++){
            let info = new RewardData();
            info.reward_id=this.reward_equip_list[i];
            info.reward_num = this.reward_equip_num[i];
            rewardDatas.push(info);
        }

        let rewardMap = new Map<number,number>();
        rewardDatas.forEach((v,k)=>{
            if(rewardMap.has(v.reward_id)){
                let num = rewardMap.get(v.reward_id);
                num += v.reward_num;
                rewardMap.set(v.reward_id,num);
            }else{
                rewardMap.set(v.reward_id,v.reward_num);
            }
        })
        rewardMap.forEach((num,id)=>{
            let item=PropManager.getInstance().createPropItem(id,num);
            PropManager.getInstance().changePropNum(id,num);
            nodeList.push(item);
        });
        OfflineRevenueManager.saveGuaJiTime();
        GameManager.getInstance().showMultipleGetTip(nodeList);
        this.showRewardList();
        super.onRefresh();
        this.destroySelf();
    }

    destroySelf(){
        super.onClose();
        ApkManager.getInstance().closeBanner();
    }
}
