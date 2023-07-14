// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { AccessName, HttpManager } from ".././NetWork/HttpManager";
import { BattlePassDataManager } from "../BattlePass/BattlePassData";
import GameManager from "../GameManager";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import LanguageManager from "../multiLanguage/LanguageManager";
import TextLanguage from "../multiLanguage/TextLanguage";
import { PropId } from "../Prop/PropConfig";
import { PropManager } from "../Prop/PropManager";
import { SoundIndex } from "../Sound/AudioConstants";
import { StorageKey } from "../Storage/StorageConfig";
import { TheStorageManager } from "../Storage/StorageManager";
import { EventManager, RedEventString, RedEventType } from "../Tools/EventManager";
import UIComponent from "../UI/UIComponent";
import UserData from "../UserData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class VipSystem extends UIComponent {

    @property(cc.Node)
    content:cc.Node=null//父节点
    @property(cc.Node)
    Vipitme:cc.Node=null//vip节点
    Vip:cc.Node[]=[]//vip节点
    vipnum:number=15
    @property(cc.Node)
    VIPPrivileges:cc.Node=null//vip特权弹窗    如果没有购买vip 或vip到期   
    // @property(cc.Node)
    // itme:cc.Node=null//每天领取的500钻石道具父节点
    @property(cc.Node)
    btnLan:cc.Node=null//购买按钮    领取按钮   已领取
    @property(cc.Node)
    VIP_Bar_2_1:cc.Node=null//进度条
    @property(cc.Node)
    jdt:cc.Node=null//进度条   数/总数

    Gemnum:number=360
    initUi() {
        // if(this.itme.childrenCount==0){
        //     let itme=PropManager.getInstance().createPropItem(PropId.Gem,this.Gemnum);
        //     itme.scale=0.85
        //     itme.parent=this.itme
        // }
        this.vipnum=BattlePassDataManager.getMaxBattlePassLevel()
        for (let itmeindex = this.Vip.length; itmeindex < this.vipnum; itmeindex++) {
            let Vipitme=cc.instantiate(this.Vipitme)

            let id=itmeindex+1
            let itme0=PropManager.getInstance().createPropItem(BattlePassDataManager.getInstance().getFreeRewardItem(id),BattlePassDataManager.getInstance().getFreeRewardNum(id));
            itme0.scale=0.83
            itme0.parent=Vipitme.getChildByName("itme0")
            let itme1=PropManager.getInstance().createPropItem(PropId.Coin,BattlePassDataManager.getInstance().getSeniorRewardGem(id));
            itme1.scale=0.83
            itme1.parent=Vipitme.getChildByName("itme1")
            let itme2=PropManager.getInstance().createPropItem(BattlePassDataManager.getInstance().getSeniorRewardItem(id),BattlePassDataManager.getInstance().getSeniorRewardNum(id));
            itme2.scale=0.83
            itme2.parent=Vipitme.getChildByName("itme2")
            // let VIP_Bar_down_0=Vipitme.getChildByName("VIP_Bar_down_0")
            // let VIP_Bar_up_0=Vipitme.getChildByName("VIP_Bar_up_0")
            // let VIP_Bar_up_1=Vipitme.getChildByName("VIP_Bar_up_1")//上面亮
            // let VIP_Bar_down_1=Vipitme.getChildByName("VIP_Bar_down_1")//下面亮

            let mf=Vipitme.getChildByName("mf")//免费的领取遮罩
            let gj=Vipitme.getChildByName("gj")//高级的领取遮罩
            let num=Vipitme.getChildByName("num")//数字
            num.getComponent(cc.Label).string=""+id
            // if(itmeindex==0){//第一个奖励直接获得  将上面的进度条不要
            //     VIP_Bar_up_0.active=false
            //     VIP_Bar_up_1.active=false
            // }
            // if(itmeindex==this.vipnum-1){//最后一个奖励  将下面的进度条不要
            //     VIP_Bar_down_0.active=false
            //     VIP_Bar_down_1.active=false
            // }
            mf.on(cc.Node.EventType.TOUCH_END,()=>{
                this.Receivemf(itme0,id)
            },this);
            gj.on(cc.Node.EventType.TOUCH_END,()=>{
                this.Receivegj(id)
            },this);
            
            Vipitme.parent=this.content
            this.Vip.push(Vipitme)
        }
        this.Refresh()
    }
    Receivemf(itme,id){
        FollowManager.getInstance().followEvent(Follow_Type.战令免费奖励领取_x级+id);
        PropManager.getInstance().changePropNum(BattlePassDataManager.getInstance().getFreeRewardItem(id),BattlePassDataManager.getInstance().getFreeRewardNum(id));
        GameManager.getInstance().showGetTip(itme);
        TheStorageManager.getInstance().setItem(StorageKey.VipFreeRewardStatus+id,1)
        HttpManager.post(AccessName.saveGameTask,this.getSaveGameTaskJsonString(id,1));
        this.Refresh()
    }
    Receivegj(id){
        FollowManager.getInstance().followEvent(Follow_Type.战令高级奖励领取_x级+id);
        PropManager.getInstance().changePropNum(PropId.Coin,BattlePassDataManager.getInstance().getSeniorRewardGem(id));
        PropManager.getInstance().changePropNum(BattlePassDataManager.getInstance().getSeniorRewardItem(id),BattlePassDataManager.getInstance().getSeniorRewardNum(id));
        let itme1=PropManager.getInstance().createPropItem(PropId.Coin,BattlePassDataManager.getInstance().getSeniorRewardGem(id));
        let itme2=PropManager.getInstance().createPropItem(BattlePassDataManager.getInstance().getSeniorRewardItem(id),BattlePassDataManager.getInstance().getSeniorRewardNum(id));
        GameManager.getInstance().showMultipleGetTip([itme1,itme2]);
        TheStorageManager.getInstance().setItem(StorageKey.VipAdvancedRewardStatus+id,1)
        HttpManager.post(AccessName.saveGameTask,this.getSaveGameTaskJsonString(id,2));
        this.Refresh()
    }
    Refresh(){
        let zonshu=0
        let AllActivityNum = TheStorageManager.getInstance().getNumber(StorageKey.AllActivityNum,0);//总活跃度
        let VipIdentity=TheStorageManager.getInstance().getNumber(StorageKey.VipIdentity,0)   //是否开通了vip   0:没开通 锁显示   1：开通了 所有锁隐藏    
        let winText=this.btnLan.getChildByName("winText")
        if(VipIdentity==0){
            this.btnLan.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            winText.getComponent(TextLanguage).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            winText.getComponent(TextLanguage).setTextId(1450002)
        }else if(VipIdentity==1){
            winText.getComponent(TextLanguage).setTextId(1450012)//一键领取
            // let VipDailyCollectionStatus=TheStorageManager.getInstance().getNumber(StorageKey.VipDailyCollectionStatus,0) //0:未领取   1：已领取   每日刷新
            // winText.getComponent(TextLanguage).setTextId(100011)//领取
            // if(VipDailyCollectionStatus==0){
            //     this.btnLan.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            //     winText.getComponent(TextLanguage).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            // }else if(VipDailyCollectionStatus==1){
            //     this.btnLan.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            //     winText.getComponent(TextLanguage).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            // }
        }
        for (let itmeindex = 0; itmeindex < this.vipnum; itmeindex++) {
            let id=itmeindex+1
            let VIP_Bar_down_0=this.Vip[itmeindex].getChildByName("VIP_Bar_down_0")
            let VIP_Bar_up_0=this.Vip[itmeindex].getChildByName("VIP_Bar_up_0")
            let VIP_Bar_up_1=this.Vip[itmeindex].getChildByName("VIP_Bar_up_1")//上面亮
            let VIP_Bar_down_1=this.Vip[itmeindex].getChildByName("VIP_Bar_down_1")//下面亮
            let VIP_Bar_1_1=this.Vip[itmeindex].getChildByName("VIP_Bar_1_1")//中间亮
            let VIP_Lock1=this.Vip[itmeindex].getChildByName("VIP_Lock1")//锁
            let VIP_Lock2=this.Vip[itmeindex].getChildByName("VIP_Lock2")//锁
            let End_Tick1=this.Vip[itmeindex].getChildByName("End_Tick_1")//勾
            let End_Tick2=this.Vip[itmeindex].getChildByName("End_Tick_2")//勾
            let End_Tick3=this.Vip[itmeindex].getChildByName("End_Tick_3")//勾
            let hei=this.Vip[itmeindex].getChildByName("hei")//黑色遮罩
            let mf=this.Vip[itmeindex].getChildByName("mf")//免费的领取遮罩
            let gj=this.Vip[itmeindex].getChildByName("gj")//高级的领取遮罩
            let mftoday=this.Vip[itmeindex].getChildByName("mftoday")//免费的领取遮罩特效
            let gjtoday=this.Vip[itmeindex].getChildByName("gjtoday")//高级的领取遮罩特效
            let num=this.Vip[itmeindex].getChildByName("num")//数字
            let VipFreeRewardStatus = TheStorageManager.getInstance().getNumber(StorageKey.VipFreeRewardStatus+id,0);//vip免费奖励状态    0未领取,1已领取     0-14
            let VipAdvancedRewardStatus = TheStorageManager.getInstance().getNumber(StorageKey.VipAdvancedRewardStatus+id,0);//vip高级奖励状态    0未领取,1已领取     0-14
            hei.active=false
            VIP_Bar_1_1.active=false
            VIP_Lock1.active=false
            VIP_Lock2.active=false
            End_Tick1.active=false
            End_Tick2.active=false
            End_Tick3.active=false
            mf.active=false
            gj.active=false

            mftoday.active=false
            gjtoday.active=false

            VIP_Bar_up_1.active=false
            VIP_Bar_down_1.active=false
            if(VipIdentity==0){
                VIP_Lock1.active=true
                VIP_Lock2.active=true
            }
            
            let RequiredEx=BattlePassDataManager.getInstance().getRequiredExp(id)//所需活跃度

            if(RequiredEx<=AllActivityNum){
                if(FollowManager.getInstance().getFirstDo(Follow_Type.战令解锁等级_x级+id)<=0){
                    FollowManager.getInstance().addFirstDo(Follow_Type.战令解锁等级_x级+id);
                    FollowManager.getInstance().followEvent(Follow_Type.战令解锁等级_x级+id);
                }
                if(itmeindex>0){
                    this.Vip[itmeindex-1].getChildByName("VIP_Bar_down_1").active=true//下面亮
                }
                VIP_Bar_up_1.active=true
                VIP_Bar_1_1.active=true
                mf.active=true
                mftoday.active=true
                num.getComponent(cc.LabelOutline).enabled=true
                if(VipIdentity==1){
                    gj.active=true
                    gjtoday.active=true
                }
            }else{
                if(zonshu==0){
                    zonshu=RequiredEx
                }
                num.getComponent(cc.LabelOutline).enabled=false
                hei.active=true
            }
            if(VipFreeRewardStatus==1){
                mf.active=false
                mftoday.active=false
                End_Tick1.active=true
            }
            if(VipAdvancedRewardStatus==1){
                gj.active=false
                gjtoday.active=false
                End_Tick2.active=true
                End_Tick3.active=true
            }
            if(itmeindex==0){//第一个奖励直接获得  将上面的进度条不要
                VIP_Bar_up_0.active=false
                VIP_Bar_up_1.active=false
            }PropId.Gem
            if(itmeindex==this.vipnum-1){//最后一个奖励  将下面的进度条不要
                VIP_Bar_down_0.active=false
                VIP_Bar_down_1.active=false
            }
            this.Vip[itmeindex].active=true
        }
        if(AllActivityNum>=zonshu){
            this.jdt.getComponent(cc.Label).string="MAX"
            this.VIP_Bar_2_1.getComponent(cc.Sprite).fillRange=1
        }else{
            this.jdt.getComponent(cc.Label).string=AllActivityNum+"/"+zonshu
            let fillRange=AllActivityNum/zonshu
            this.VIP_Bar_2_1.getComponent(cc.Sprite).fillRange=fillRange
        }
    }
    onbtnLan(){
        let VipIdentity=TheStorageManager.getInstance().getNumber(StorageKey.VipIdentity,0)   //是否开通了vip   0:没开通 开通弹窗  1：开通了 领取按钮
        if(VipIdentity==0){
            this.VIPPrivileges.active=true
            FollowManager.getInstance().followEvent(Follow_Type.解锁高级战令的按钮点击次数);
        }else if(VipIdentity==1){
            // console.log("++++一键领取")
            let arr=[]
            for (let itmeindex = 0; itmeindex < this.vipnum; itmeindex++) {
                let id=itmeindex+1
                let mf=this.Vip[itmeindex].getChildByName("mf")//免费的领取遮罩
                let gj=this.Vip[itmeindex].getChildByName("gj")//高级的领取遮罩
                if(mf.active==true){
                    FollowManager.getInstance().followEvent(Follow_Type.战令免费奖励领取_x级+id);
                    TheStorageManager.getInstance().setItem(StorageKey.VipFreeRewardStatus+id,1)
                    HttpManager.post(AccessName.saveGameTask,this.getSaveGameTaskJsonString(id,1));
                    let itme1=PropManager.getInstance().createPropItem(BattlePassDataManager.getInstance().getFreeRewardItem(id),BattlePassDataManager.getInstance().getFreeRewardNum(id));
                    PropManager.getInstance().changePropNum(BattlePassDataManager.getInstance().getFreeRewardItem(id),BattlePassDataManager.getInstance().getFreeRewardNum(id));
                    arr.push(itme1)
                }
                if(gj.active==true){
                    FollowManager.getInstance().followEvent(Follow_Type.战令高级奖励领取_x级+id);
                    TheStorageManager.getInstance().setItem(StorageKey.VipAdvancedRewardStatus+id,1)
                    HttpManager.post(AccessName.saveGameTask,this.getSaveGameTaskJsonString(id,2));
                    let itme1=PropManager.getInstance().createPropItem(PropId.Coin,BattlePassDataManager.getInstance().getSeniorRewardGem(id));
                    let itme2=PropManager.getInstance().createPropItem(BattlePassDataManager.getInstance().getSeniorRewardItem(id),BattlePassDataManager.getInstance().getSeniorRewardNum(id));
                    PropManager.getInstance().changePropNum(PropId.Coin,BattlePassDataManager.getInstance().getSeniorRewardGem(id));
                    PropManager.getInstance().changePropNum(BattlePassDataManager.getInstance().getSeniorRewardItem(id),BattlePassDataManager.getInstance().getSeniorRewardNum(id));
                    arr.push(itme1)
                    arr.push(itme2)
                }
                

                // Receivemf(itme,id){
                //     PropManager.getInstance().changePropNum(BattlePassDataManager.getInstance().getFreeRewardItem(id),BattlePassDataManager.getInstance().getFreeRewardNum(id));
                //     GameManager.getInstance().showGetTip(itme);
                //     TheStorageManager.getInstance().setItem(StorageKey.VipFreeRewardStatus+id,1)
                //     this.Refresh()
                // }
                // Receivegj(id){
                //     PropManager.getInstance().changePropNum(PropId.Coin,BattlePassDataManager.getInstance().getSeniorRewardGem(id));
                //     PropManager.getInstance().changePropNum(BattlePassDataManager.getInstance().getSeniorRewardItem(id),BattlePassDataManager.getInstance().getSeniorRewardNum(id));
                //     let itme1=PropManager.getInstance().createPropItem(PropId.Coin,BattlePassDataManager.getInstance().getSeniorRewardGem(id));
                //     let itme2=PropManager.getInstance().createPropItem(BattlePassDataManager.getInstance().getSeniorRewardItem(id),BattlePassDataManager.getInstance().getSeniorRewardNum(id));
                //     GameManager.getInstance().showMultipleGetTip([itme1,itme2]);
                //     TheStorageManager.getInstance().setItem(StorageKey.VipAdvancedRewardStatus+id,1)
                //     this.Refresh()
                // }
            }

            if(arr.length>0){
                GameManager.getInstance().showMultipleGetTip(arr);
                this.Refresh()
            }else{
                GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(1450013),3);//已经领取过了
            }

            
            // let VipDailyCollectionStatus=TheStorageManager.getInstance().getNumber(StorageKey.VipDailyCollectionStatus,0) //0:未领取   1：已领取   每日刷新
            // if(VipDailyCollectionStatus==0){
            //     //领取360钻石
            //     PropManager.getInstance().changePropNum(PropId.Gem,this.Gemnum);
            //     GameManager.getInstance().showGetTip(this.itme.children[0]);
            //     TheStorageManager.getInstance().setItem(StorageKey.VipDailyCollectionStatus,1)
            //     this.Refresh()
            // }else if(VipDailyCollectionStatus==1){
            //     GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(1450011),3);
            // }
        }
    }
    clickBtnClose()//关闭
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.onClose();
        EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_Vip);
    }
    // start () {

    // }

    /**
     * 
     * @param index 标记id
     * @param type 1普通，2高级
     * @returns 
     */
    private getSaveGameTaskJsonString(index:number,type:number):string{
        let uid=UserData.getInstance().getUserID();
        let num=index;
        return JSON.stringify({
            uid:uid,
            playLevel:num,
            rewardType:type,
        });
    }

    // update (dt) {}
}
