import ApkManager from "../Ads/ApkManager";
import { DingYue_Type, VipManager, Vip_Type } from "../Ads/VipManager";
import GameManager from "../GameManager";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import { LanguageIndex } from "../multiLanguage/LanguageConstants";
import LanguageManager from "../multiLanguage/LanguageManager";
import { SoundIndex } from "../Sound/AudioConstants";
import UIComponent from "./UIComponent";


const {ccclass, property} = cc._decorator;

@ccclass
export default class VipUi extends UIComponent {    
    
    start () {
        //翻译
        ApkManager.getInstance().showBanner();
        let richText=this.node.getChildByName('richText');
        richText.getComponent(cc.RichText).string=LanguageManager.getInstance().getString(LanguageIndex.DingYueTip);
        //设置价格和货币单位
        let textWeek=this.node.getChildByName('textWeek');
        let lm=LanguageManager.getInstance();
        if(VipManager.dy_info.length>DingYue_Type.Week)
        {
            textWeek.getComponent(cc.Label).string=lm.getString(LanguageIndex.Day3free_trial)+VipManager.dy_info[DingYue_Type.Week].price+' '+VipManager.dy_info[DingYue_Type.Week].currency+'/'+lm.getString(LanguageIndex.Week);
        }
        if(VipManager.dy_info.length>DingYue_Type.Month)
        {
            let textMonth=this.node.getChildByName('textMonth');
            textMonth.getComponent(cc.Label).string=VipManager.dy_info[DingYue_Type.Month].price+' '+VipManager.dy_info[DingYue_Type.Month].currency+'/'+lm.getString(LanguageIndex.Month);
        }
        if(VipManager.dy_info.length>DingYue_Type.Year)
        {
            let textYear=this.node.getChildByName('textYear');
            textYear.getComponent(cc.Label).string=VipManager.dy_info[DingYue_Type.Year].price+' '+VipManager.dy_info[DingYue_Type.Year].currency+'/'+lm.getString(LanguageIndex.Year);
        }
    }

    // showRemainTime()
    // {
    //     let timeLabel=this.node.getChildByName('timeLabel');
    //     let isVip=VipManager.getIsVip();
    //     if(isVip)
    //     {
    //         timeLabel.active=true;
    //         let totalDay=VipManager.getVipTotalDay();
    //         let curSec=new Date().getTime();
    //         let startSec=VipManager.getVipStartTime();
    //         let offsetSec=curSec-startSec;
    //         let totalSec=totalDay*24*60*60;
    //         if(offsetSec>=totalSec)
    //         {
    //             //VIP可能过期，需要请求谷歌
                
    //         }else
    //         {

    //         }
    //         let rDay=totalDay;
    //     }else
    //     {
    //         timeLabel.active=false;
    //     }
    // }

    clickBtnClose()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        super.onClose();
        ApkManager.getInstance().closeBanner();
    }
 
    clickBtnWeek()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        FollowManager.getInstance().followEvent(Follow_Type.周卡点击玩家数);
        ApkManager.getInstance().showDingYue({result:(isSuc:boolean)=>{
            if(isSuc)
            {
                VipManager.saveVip(1);
                VipManager.saveVipFreeNum(5);
                VipManager.saveVipStartTime(DingYue_Type.Week,Vip_Type.A);
            }
        }},DingYue_Type.Week);        
    }

    clickBtnMon()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        FollowManager.getInstance().followEvent(Follow_Type.月卡点击玩家数);
        ApkManager.getInstance().showDingYue({result:(isSuc:boolean)=>{
            if(isSuc)
            {
                VipManager.saveVip(1);
                VipManager.saveVipFreeNum(5);
                VipManager.saveVipStartTime(DingYue_Type.Month,Vip_Type.A);
            }
            
        }},DingYue_Type.Month);        
    }

    clickBtnYear()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        FollowManager.getInstance().followEvent(Follow_Type.年卡点击玩家数);
        ApkManager.getInstance().showDingYue({result:(isSuc:boolean)=>{
            if(isSuc)
            {
                VipManager.saveVip(1);
                VipManager.saveVipFreeNum(5);
                VipManager.saveVipStartTime(DingYue_Type.Year,Vip_Type.A);
            }
            
        }},DingYue_Type.Year);        
    }

    clickBtnTiaoKuan()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        ApkManager.getInstance().showTiaoKuan();
    }
}
