import ApkManager from "../Ads/ApkManager";
import { BattlePassDataManager } from "../BattlePass/BattlePassData";
import BattlePassItem from "../BattlePass/BattlePassItem";
import { BattlePassManager, BattlePassClaimType } from "../BattlePass/BattlePassManager";
import GameData from "../GameData";
import GameManager from "../GameManager";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import { LanguageIndex } from "../multiLanguage/LanguageConstants";
import LanguageManager from "../multiLanguage/LanguageManager";
import TextLanguage from "../multiLanguage/TextLanguage";
import { PropId } from "../Prop/PropConfig";
import { PropManager } from "../Prop/PropManager";
import { SoundIndex } from "../Sound/AudioConstants";
import TaskUi from "../Task/TaskUi";
import { PayUiIndex } from "../thirdParty/ThirdParty";
import { EventManager, RedEventString, RedEventType } from "../Tools/EventManager";
import MyTool from "../Tools/MyTool";
import UIComponent from "../UI/UIComponent";
import { UILayerLevel, UIPath } from "../UI/UIConfig";
import { UIManager } from "../UI/UIManager";
import { PayManager } from "./PayManager";


enum ShowIndex{
    item=0,
    levelProgress,
    levelIcon,
    levelLabel,

}

const {ccclass, property} = cc._decorator;

const google_id:string = 'b501';

@ccclass
export default class BattlePassUi extends UIComponent {

    @property(cc.Prefab)
    prefab_item: cc.Prefab = null;

    @property(cc.Prefab)
    prefab_level_progress: cc.Prefab = null;

    @property(cc.Prefab)
    prefab_level_label: cc.Prefab = null;

    @property(cc.Prefab)
    prefab_level_icon: cc.Prefab = null;
    
    @property(cc.Prefab)
    help:cc.Prefab=null;

    @property(cc.Prefab)
    mask:cc.Prefab = null;

    // remain_label:cc.Label=null;

    pos_xx:number[]=[-166,-12,94];
    item_yy:number[]=[];
    //分帧加载
    cur_load_index:number=0;
    a_load_num:number=10;
    delay_time:number=0.1;
    max_load_num:number=0;
    cur_level_yy:number=0;
    //滚动层设置
    topY:number=10;
    spacingY:number=10;
    bottomY:number=10;
    itemHeight:number=0;
    totalHeight:number=0;

    onLoad(): void {
        super.onLoad();
        let top=this.node.getChildByName('top');
        // this.remain_label=top.getChildByName('remainLabel').getComponent(cc.Label);
        BattlePassManager.refreshBuyState();
        this.adaptation();
        this.max_load_num=BattlePassManager.getMaxLevel()+1;        
        this.loadItem();
        this.loadLevelData();
        this.schedule(this.loadItem,this.delay_time);
    }

    protected start(): void {
        // this.schedule(this.showRemainTime,1);
        // this.showRemainTime();
        PayManager.getInstance().addTodayShow(PayUiIndex.ZhanLing);
        EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_Shop_ZhanLing);
    }

    private adaptation()
    {
        //上下模块
        let top=this.node.getChildByName('top');
        let bottom=this.node.getChildByName('bottom');        
        let wp=cc.winSize;
        top.y=(wp.height/2) - 148;
        bottom.y=-wp.height/2;
        

        let centerHeight=(top.y-top.height)-(bottom.y+bottom.height);
        let centerY=bottom.y+bottom.height+centerHeight/2;
        let scroll=this.node.getChildByName('scroll');
        scroll.y=centerY;
        scroll.height=centerHeight;
        scroll.getChildByName('view').height=centerHeight;

        
        // let btnClaimAll=top.getChildByName('btnClaim');
        // btnClaimAll.getComponent(cc.Button).interactable=false;
        // btnClaimAll.getChildByName('clamText').color=cc.color(91,91,91);
        let rewardBtn = top.getChildByName("WarOrder_Btn_0");
        if(BattlePassManager.is_buy){
            rewardBtn.getComponent(cc.Button).interactable = false;
            rewardBtn.getComponentInChildren(cc.Label).setMaterial(0,cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            rewardBtn.getComponentInChildren(TextLanguage).setTextId(100012);
        }
        //价格
        // let priceText=bottom.getChildByName('btnBuy').getChildByName('priceText');
        // let payData = PayManager.getInstance().getPayInfo(google_id);
        // priceText.getComponent(cc.Label).string = payData.price + payData.currency;
    }

    loadItem(){
        let content=this.node.getChildByName('scroll').getComponent(cc.ScrollView).content;
    
        let isCancel=false;        
        let series=BattlePassManager.getUseBattlePassSeries();
        let curLevel=BattlePassManager.getCurLevel();
        // let btnUp=content.getChildByName('btnUp');
        // btnUp.zIndex=ShowIndex.levelIcon;
        for(let i=0; i<this.a_load_num; i++){
            let loadIndex=i+this.a_load_num*this.cur_load_index;
            let loadLevel=loadIndex;
            let item=cc.instantiate(this.prefab_item);
            item.y=-((this.topY+item.height/2)+loadIndex*(item.height+this.spacingY));
            item.name=""+loadLevel;
            item.zIndex=ShowIndex.item;
            content.addChild(item);
            this.itemHeight=item.height;
            this.item_yy.push(item.y);
            //往item里添加奖励道具
            let id=BattlePassDataManager.getId(series,(loadLevel));
            item.getComponent(BattlePassItem).init(id,loadLevel,()=>{
                this.claimAfterRefresh();
            },()=>{
                this.buyAfterRefresh();
            });
            //        
            //添加icon
            let icon=cc.instantiate(this.prefab_level_icon);
            icon.y=item.y + 3;
            icon.x=-65;
            icon.zIndex=ShowIndex.levelIcon;
            content.addChild(icon);
            //
            let levelLabel=cc.instantiate(this.prefab_level_label);
            levelLabel.y=item.y + 3;
            levelLabel.x=-65;
            levelLabel.zIndex=ShowIndex.levelLabel;
            content.addChild(levelLabel);
            // let bpdm=BattlePassDataManager.getInstance();
            // let boxM=GameManager.getInstance().box_json_data;
            // let jsonData=bpdm.getJsonBattlePassData(id);
            levelLabel.getComponent(cc.Label).string=""+BattlePassDataManager.getInstance().getJsonBattlePassData(id).RequiredExp;

            if(curLevel==loadLevel){
                this.cur_level_yy=item.y;
                if(curLevel<BattlePassManager.getMaxLevel()){
                    let nextId=BattlePassDataManager.getId(series,(loadLevel+1));
                    // btnUp.x=icon.x;
                    // btnUp.y=item.y-(item.height/2+this.spacingY/2);
                    // btnUp.getChildByName('gemLabel').getComponent(cc.Label).string=''+BattlePassDataManager.getInstance().getCostDimond(nextId);
                }
            }
            if(curLevel<loadLevel){
                let mask = cc.instantiate(this.mask);
                levelLabel.addChild(mask);
            }
            if(loadIndex>=(this.max_load_num-1))
            {
                isCancel=true;
                break;
            }
        }
        if(isCancel){
            this.unschedule(this.loadItem);                        
            let height=(this.spacingY+this.itemHeight)*this.max_load_num-this.spacingY;
            this.totalHeight=this.topY+this.bottomY+height;
            content.height=this.totalHeight;
            this.startScroll();
            //添加关卡进度
            this.refreshLevelProgress(height-(this.itemHeight));
            this.claimAfterRefresh();
        }
        this.cur_load_index++;
    }

    startScroll(dt:number=0.5){
        let content=this.node.getChildByName('scroll').getComponent(cc.ScrollView).content;
        let scrollHeiht=-this.cur_level_yy;
        if(scrollHeiht<content.parent.height/2){
            scrollHeiht=content.parent.height/2;
        }
        if(scrollHeiht>(this.totalHeight-content.parent.height/2)){
            scrollHeiht=(this.totalHeight-content.parent.height/2);
        }
        cc.tween(content).to(dt,{y:scrollHeiht}).start();
    }

    loadLevelData(){
        let height=(10+138)*this.max_load_num-10;
        let totalHeight=10+10+height-138;
        let curLevel=BattlePassManager.getCurLevel()
        let top=this.node.getChildByName('top');
        //关卡等级
        // let levelLabel=top.getChildByName('levelLabel').getComponent(cc.Label);
        // levelLabel.string=""+curLevel;
        //经验值
        // let expLabel=top.getChildByName('expLabel').getComponent(cc.Label);
        // let exp=BattlePassManager.getCurExp()%10;
        // expLabel.string=exp+"/"+10;
        // top.getChildByName('expProgressBar').getComponent(cc.ProgressBar).progress=exp/10;
        let content=this.node.getChildByName('scroll').getComponent(cc.ScrollView).content;
        let levelProgress=cc.instantiate(this.prefab_level_progress);
        levelProgress.height=totalHeight;
        levelProgress.getComponent(cc.ProgressBar).totalLength=totalHeight;
        levelProgress.getComponent(cc.ProgressBar).progress=(curLevel)/(BattlePassManager.getMaxLevel());
        levelProgress.getComponent(cc.ProgressBar).progress+= curLevel == 0 ? 0 : 1/BattlePassManager.getMaxLevel()*(BattlePassManager.getCurExp()/BattlePassDataManager.getInstance().getJsonDataByLevel(curLevel).RequiredExp);
        levelProgress.y=this.item_yy[0];
        levelProgress.zIndex=ShowIndex.levelProgress;
        content.addChild(levelProgress);
        top.getChildByName("remainTimeLabel").getComponent(TextLanguage).setTextId(100047);
        top.getChildByName("remainTimeLabel").getComponent(TextLanguage).setReplaceValue('~',String(BattlePassManager.getMaxLevel() - new Date().getDate()));
        let isBuy=BattlePassManager.is_buy;
        // let btnBuy=this.node.getChildByName('bottom').getChildByName('btnBuy');
        // btnBuy.active=!isBuy;
    }

    //显示刷新关卡进度
    refreshLevelProgress(height?:number) {
        let curLevel=BattlePassManager.getCurLevel();
        let content=this.node.getChildByName('scroll').getComponent(cc.ScrollView).content;        
        let levelProgress=content.getChildByName('levelProgressBar');
        if(height){
            levelProgress.height=height;
            levelProgress.getComponent(cc.ProgressBar).totalLength=height;
            levelProgress.y=this.item_yy[0];
        }        
        levelProgress.getComponent(cc.ProgressBar).progress=(curLevel-1)/(BattlePassManager.getMaxLevel()-1);        
        levelProgress.getComponent(cc.ProgressBar).progress += curLevel == 0 ? 0 : 1/BattlePassManager.getMaxLevel()*(BattlePassManager.getCurExp()/BattlePassDataManager.getInstance().getJsonDataByLevel(curLevel).RequiredExp);
        let top=this.node.getChildByName('top');
        //关卡等级
        // let levelLabel=top.getChildByName('levelLabel').getComponent(cc.Label);
        // levelLabel.string=""+curLevel;
        //经验值
        // let expLabel=top.getChildByName('expLabel').getComponent(cc.Label);
        // let exp=BattlePassManager.getCurExp()%10;
        // expLabel.string=exp+"/"+10;
        // top.getChildByName('expProgressBar').getComponent(cc.ProgressBar).progress=exp/10;        
    }

    showRemainTime()
    {
        //获取当前时间
        let date=new Date();
        let totalDay=MyTool.getMonthDays(date.getFullYear(),date.getMonth()+1);
        let remainDay=totalDay-date.getDate();
        if(remainDay>0){
            // this.remain_label.string=LanguageManager.getInstance().getString(LanguageIndex.Reset)+": "+remainDay+" "+LanguageManager.getInstance().getString(LanguageIndex.Day);
        }else{
            let curHours=date.getHours();
            let curMin=date.getMinutes();
            let curSec=date.getSeconds();
            let remainHours=24-curHours-1;
            let remainMin=60-curMin;
            let remainSec=60-curSec;
            let shiStr='0'+remainHours;
            if(remainHours>=10)
            {
                shiStr=''+remainHours;
            }
            let fenStr='0'+remainMin;
            if(remainMin>=10)
            {
                fenStr=''+remainMin;
            }
            let miaoStr='0'+remainSec;
            if(remainSec>=10)
            {
                miaoStr=''+remainSec;
            }
            // this.remain_label.string=LanguageManager.getInstance().getString(LanguageIndex.RefreshTime)+shiStr+':'+fenStr+':'+miaoStr;
            GameData.getInstance().checkIsNewDay();
        }
        
    }

    claimAfterRefresh(){
        //检查是否可以领取所有按钮
        let top=this.node.getChildByName('top');
        let isBuy=BattlePassManager.is_buy;
        let curLevel=BattlePassManager.getCurLevel()
        let series=BattlePassManager.getUseBattlePassSeries();
        let isCanClaim=false;
        for(let i=0; i<=BattlePassManager.getMaxLevel(); i++){
            let isUnLock=curLevel>=i;
            if(isUnLock){
                let id=BattlePassDataManager.getId(series,i);
                let claimState0=BattlePassManager.getClaimState(BattlePassClaimType.Free,id);
                let claimState1=BattlePassManager.getClaimState(BattlePassClaimType.Buy,id);
                if(claimState0<=0){
                    isCanClaim=true;
                    break;
                }
                if(isBuy&&claimState1<=0){
                    isCanClaim=true;
                    break;
                }
            }else{
                break;
            }            
        }
        if(BattlePassManager.is_buy){
            let rewardBtn=top.getChildByName('WarOrder_Btn_0');
            rewardBtn.getComponent(cc.Button).interactable=isCanClaim;
            let material = isCanClaim ? cc.Material.getBuiltinMaterial("2d-sprite") : cc.Material.getBuiltinMaterial("2d-gray-sprite");
            rewardBtn.getComponentInChildren(cc.Label).setMaterial(0,material);
            rewardBtn.getComponentInChildren(TextLanguage).setTextId(100012);
        }
    }

    buyAfterRefresh(){
        let content=this.node.getChildByName('scroll').getComponent(cc.ScrollView).content;
        for(let i=0; i<=BattlePassManager.getMaxLevel(); i++){
            let item=content.getChildByName(''+i);
            if(item){
                item.getComponent(BattlePassItem).refreshData();
            }
        }
        let isBuy=BattlePassManager.is_buy;
        // let btnBuy=this.node.getChildByName('bottom').getChildByName('btnBuy');
        // btnBuy.active=!isBuy;
        if(isBuy){
            let top=this.node.getChildByName('top');
            let rewardBtn = top.getChildByName("WarOrder_Btn_0");
            if(BattlePassManager.is_buy){
                rewardBtn.getComponent(cc.Button).interactable = false;
                rewardBtn.getComponentInChildren(cc.Label).setMaterial(0,cc.Material.getBuiltinMaterial("2d-gray-sprite"));
                rewardBtn.getComponentInChildren(TextLanguage).setTextId(100012);
                this.claimAfterRefresh();
            }
            // rewardBtn.getComponentInChildren(TextLanguage).setTextId(100012);
        }
    }

    refreshBtnUp(){
        let content=this.node.getChildByName('scroll').getComponent(cc.ScrollView).content;
        let curLevel=BattlePassManager.getCurLevel()
        let btnUp=content.getChildByName('btnUp');
        let item=content.getChildByName(""+curLevel);
        this.cur_level_yy=item.y;
        if(curLevel<BattlePassManager.getMaxLevel()){
            let nextId=BattlePassDataManager.getId(BattlePassManager.getUseBattlePassSeries(),(curLevel+1));
            btnUp.y=item.y-(item.height/2+10/2);
            btnUp.getChildByName('gemLabel').getComponent(cc.Label).string=''+BattlePassDataManager.getInstance().getCostDimond(nextId);
        }else{
            btnUp.active=false;
        }
    }

    clickBtnClose(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        super.onClose();
    }

    clickBtnTip(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let help=cc.instantiate(this.help);
        this.node.addChild(help);
        FollowManager.getInstance().followEvent(Follow_Type.战令任务提示);
    }

    clickBtnClaimAll(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        FollowManager.getInstance().followEvent(Follow_Type.战令点击全部领取的次数);
        let content=this.node.getChildByName('scroll').getComponent(cc.ScrollView).content;
        let nodeArr=new Array();
        for(let i=0; i<=BattlePassManager.getMaxLevel(); i++){
            let item=content.getChildByName(''+i);
            if(item){
                let nodes=item.getComponent(BattlePassItem).toClaimAll(false);
                for(let n=0; n<nodes.length; n++){
                    nodeArr.push(nodes[n]);
                }
            }
        }
        GameManager.getInstance().showMultipleGetTip(nodeArr);
        this.claimAfterRefresh();
    }

    clickBtnBuy(){
        // GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        // FollowManager.getInstance().followEvent(Follow_Type.战令购买点击数);
        // ApkManager.getInstance().showPay({result:(isPay:boolean)=>{
        //     if(isPay){
        //         FollowManager.getInstance().followEvent(Follow_Type.战令解锁用户数);
        //         PayManager.getInstance().addPayNum(google_id);
        //         BattlePassManager.refreshBuyState();
        //         this.buyAfterRefresh();
        //     }
        // }},google_id);
        GameManager.getInstance().showBuyDialog(LanguageManager.getInstance().getStrByTextId(910002),()=>{
            ApkManager.getInstance().showPay({result:(isPay:boolean)=>{
                if(isPay){
                    PayManager.getInstance().addPayNum(google_id);
                    BattlePassManager.refreshBuyState();
                    FollowManager.getInstance().followEvent(Follow_Type.战令解锁用户数);
                    PayManager.getInstance().addPayNum(google_id);
                    // BattlePassManager.refreshBuyState();
                    this.buyAfterRefresh();
                }
            }},google_id)
        },null,2,PayManager.getInstance().getPayInfo(google_id).price,PayManager.getInstance().getPayInfo(google_id).currency);
    }

    clickRewardAllBtn(){
        if(BattlePassManager.is_buy == true){
            this.clickBtnClaimAll();
        }else{
            this.clickBtnBuy();
        }
    }

    clickBtnUp(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        let curLevel=BattlePassManager.getCurLevel()
        let nextId=BattlePassDataManager.getId(BattlePassManager.getUseBattlePassSeries(),(curLevel+1));
        let costGem=BattlePassDataManager.getInstance().getCostDimond(nextId);
        if(PropManager.getInstance().changePropNum(PropId.Gem,-costGem)){            
            // BattlePassManager.addCurExp(10);
            this.refreshBtnUp();
            this.buyAfterRefresh();
            this.claimAfterRefresh();
            this.refreshLevelProgress();
            this.startScroll(0.2);
        }else{
            GameManager.getInstance().showMessage(LanguageManager.getInstance().getString(LanguageIndex.Insufficient_gems));
        }        
    }
    onClickGoBtn(){
        UIManager.getInstance().showUiDialog(UIPath.Task,UILayerLevel.One,{onCompleted:(uiNode)=> {
            uiNode.getComponent(TaskUi).init(null); 
        },});
    }
}
