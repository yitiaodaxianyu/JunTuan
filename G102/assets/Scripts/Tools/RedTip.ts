import { ActivityManager, ActivityType } from "../Activity/ActivityManager";
import { FuncType, GameMode, IsDebug } from "../Constants";
import { EquipmentManager } from "../Equipment/EquipmentManager";
import GameData from "../GameData";
import GameManager from "../GameManager";
import { HeroManager } from "../Hero/Data/HeroManager";
import { FunctionDefinitionManager } from "../JsonData/FunctionDefinition";
import { OfflineRevenueManager } from "../JsonData/OfflineRevenue";
import { PayId, PayUiIndex } from "../thirdParty/ThirdParty";
import { EventManager, RedEventString, RedEventType } from "./EventManager";
import { EquipType } from "../Equipment/EquipConfig";
import { PayManager } from "../Payment/PayManager";
import { TheStorageManager } from "../Storage/StorageManager";
import { PropManager } from "../Prop/PropManager";
import { MazeManager } from "../Maze/MazeManager";
import { StorageKey } from "../Storage/StorageConfig";
import { BattlePassDataManager } from "../BattlePass/BattlePassData";
import TaskManager from "../Task/TaskManager";
import { DingYueManager } from "../Payment/DingYueManager";
import { CumulativeRechargesManager } from "../AccumulatedRecharge/CumulativeRecharges";
import { PetManager } from "../Pet/PetManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RedTip extends cc.Component {
    
    @property({type:cc.Enum(RedEventType),tooltip:"当前按钮自己的红点类型"})
    self_red_type:RedEventType=RedEventType.Btn_Main_SignIn;

    @property({type:[cc.Enum(RedEventType)],tooltip:"当前按钮所有上级的红点类型,静态节点挂载有redtip的"})
    super_red_type:RedEventType[]=[RedEventType.Btn_Main];

    @property({type:[cc.Enum(RedEventType)],tooltip:"当前按钮所有下级的红点类型,静态节点挂载有redtip的"})
    child_red_type:RedEventType[]=[RedEventType.Btn_Main];

    //是否是广告按钮，广告按钮的话，红点展示一次就可以了
    @property()
    is_video_btn:boolean=false;
    /**第一次显示时，是否自测 */
    @property()
    is_check_self:boolean=false;

    show_num:number=0;
    is_show_red:boolean=false;

    //下级反馈false的次数
    false_red_type:RedEventType[]=[];
    //下级反馈的总次数
    tip_num:RedEventType[]=[];

    /**加载时，自注册事件，red_type需要在组件上预先设置 */
    protected onLoad(): void {
        this.registerEvent();
    }

    protected start(): void {
        if(this.is_check_self){
            this.checkSelf(true);
            //this.tip_num=0;
        }        
    }
    /**销毁时，删除事件，red_type需要在组件上预先设置 */
    protected onDestroy(): void {
        this.cancelEvent();
    }
    /**注册事件*/
    registerEvent(){
        EventManager.addRedEvent(RedEventString.RED_TIP,this.self_red_type,this.onChangeTip,this);
        EventManager.addRedEvent(RedEventString.RED_CHECK,this.self_red_type,this.onCheck,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
        if(this.node._touchListener)
        {
            this.node._touchListener.setSwallowTouches(false);
        }
    }
    /**取消事件*/
    cancelEvent(){
        EventManager.removeRedEvent(RedEventString.RED_TIP,this.self_red_type,this.onChangeTip,this);
        EventManager.removeRedEvent(RedEventString.RED_CHECK,this.self_red_type,this.onCheck,this);
        this.node.off(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
        // let tanhao=this.node.getChildByName('tanhao');
        // if(tanhao)
        // tanhao.removeFromParent();
    }

    onTouchEnd(){
        if(this.is_show_red){
            this.show_num++;
            if(this.is_video_btn){
                this.onChangeTip(false,this.self_red_type);
            }
        }
    }

    /**更改红点事件类型,主要适用于同一个界面的同一个按钮，切换不同的关联类型时，比如角色页的升级按钮*/
    changeRedType(redType:RedEventType){
        if(redType!=this.self_red_type){
            this.cancelEvent();
            this.self_red_type=redType;
            this.registerEvent();
        }
        
    }
    
    /**当事件发生变化时回调
     * isShow：是否显示红点，一般由下级通知
     * redType:发送onChangeTip的红点类型红点类型
     * */
    onChangeTip(isShow:boolean,postRedType:RedEventType){
        if(this.self_red_type==RedEventType.Btn_Main){
            //cc.log('1::'+this.false_red_type.length);
        }
        this.is_show_red=isShow;
        if(postRedType){
            if(!this.tip_num.includes(postRedType)){
                this.tip_num.push(postRedType);
            }
        }
        if(isShow==true){
            
            this.addTip();
            //如果显示红点，需要通知上级也要显示
            this.super_red_type.forEach((redType)=>{
                EventManager.postRedEvent(RedEventString.RED_TIP,redType,true);
            })
        }
        else{
            if(postRedType){
                if(postRedType!=this.self_red_type){
                    if(!this.false_red_type.includes(postRedType)){
                        this.false_red_type.push(postRedType);
                    }
                    if(this.false_red_type.length>=this.child_red_type.length){                
                        this.removeTip();
                    }
                }else{
                    this.removeTip();                
                }
            }else{
                this.removeTip();                
            }        
        }
        //cc.log("我我我是"+this.self_red_type+",提示次数：:"+this.tip_num);
        if(this.tip_num.length>=this.child_red_type.length){
            this.false_red_type=new Array();
            this.tip_num=new Array();
        }
    }
    /**主动检测一个红点事件是否能显示
     *  如果有下级，则让下级进行检查，当没有自己下级的时候才开始检查自身
     *  
     *  一般由上级通知,也可主动调用
     * */
    onCheck(){
        if(this.child_red_type.length>0){
            this.false_red_type=new Array();
            this.tip_num=new Array();
            this.child_red_type.forEach((redType)=>{
                EventManager.postRedEvent(RedEventString.RED_CHECK,redType,true);
            })
        }else{
            //没有下级就检测自己，只有检查到为true时才上报
            this.checkSelf(true);            
        }
        
    }
    /**
     * 检测自己，基本所有的的类型都要有自测方案
     * @param isPost 自测完毕后是否上报给自己的上级
     * @param redType 红点类型ID。不传时，默认是自身id，传值时，用于上级向下级传达检测命令
     * @returns 是否需要红点提示
     */
    checkSelf(isPost:boolean,redType:RedEventType=this.self_red_type):boolean{
        let isTip=false;
        switch(redType)
        {
            /**主城的 */
            case RedEventType.Btn_Shop:{   
                let gd=GameData.getInstance();      
                isTip=gd.getHeroRecruitingRedTip()//||gd.getPetRecruitingRedTip()||gd.getEquipFreeRedTip()||gd.getGemFreeRedTip()||gd.getCoinFreeRedTip();
            }break;
            
            // case RedEventType.Btn_City_Equip_1:{
            //     isTip=EquipmentManager.getInstance().checkEquipMerge(EquipType.WuQi);
            // }break;
            // case RedEventType.Btn_City_Equip_2:{
            //     isTip=EquipmentManager.getInstance().checkEquipMerge(EquipType.HuJia);
            // }break;
            // case RedEventType.Btn_City_Equip_3:{
            //     isTip=EquipmentManager.getInstance().checkEquipMerge(EquipType.ShiPin);
            // }break;
            // case RedEventType.Btn_City_Equip_MergeAll:{
            //     if(!FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.ZhuangBeiHeCheng)){
            //         isTip=false;
            //         break;
            //     }
            //     for(let i=EquipType.WuQi; i<EquipType.Num; i++){
            //         isTip=EquipmentManager.getInstance().checkEquipMerge(i);
            //         if(isTip){
            //             break;
            //         }
            //     }
            // }break;
            

            case RedEventType.Btn_Task:{
                this.child_red_type.forEach((redType)=>{
                    let isT=this.checkSelf(false,redType);
                    if(isT){
                     isTip=true;
                    }
                 })
            }break;
            case RedEventType.Btn_Task_Daily:{
                isTip=TaskManager.getInstance().getDailyTaskIsCanGet();                
            }break;
            case RedEventType.Btn_Task_Achievenment:{
                isTip=TaskManager.getInstance().getAchievenmentTaskIsCanGet();
            }break;
            case RedEventType.Btn_Role:{
                for(let i=0; i<this.child_red_type.length; i++){
                    isTip=this.checkSelf(false,this.child_red_type[i]);
                    if(isTip==true){
                    break;
                    }
                }
            }break;
            case RedEventType.Btn_Role_List_1:
            case RedEventType.Btn_Role_List_2:
            case RedEventType.Btn_Role_List_3:
            case RedEventType.Btn_Role_List_4:
            case RedEventType.Btn_Role_List_5:
            case RedEventType.Btn_Role_List_6:
            case RedEventType.Btn_Role_List_7:
            case RedEventType.Btn_Role_List_8:
            case RedEventType.Btn_Role_List_9:
            case RedEventType.Btn_Role_List_10:
            case RedEventType.Btn_Role_List_11:
            case RedEventType.Btn_Role_List_12:
            {
                let hm=HeroManager.getInstance();                
                let heroType=HeroManager.getHeroTypeByRedType(redType);
                let heroInfo=hm.getHeroInfo(heroType);
                if(heroInfo!=null){                    
                    //判断升级
                    isTip=HeroManager.getInstance().checkUpgrade(heroType).is_can_up;               
                    //判断升星
                    if(!isTip){
                        isTip=HeroManager.getInstance().checkUpStar(heroType);
                    }
                    //判断装备
                    if(!isTip){
                        for(let i=1; i<EquipType.Num; i++){
                            isTip=EquipmentManager.getInstance().checkWear(heroType,i)
                            if(isTip){
                                break;
                            }
                        }                        
                    }
                    //判断宠物
                    if(!isTip){
                        isTip=PetManager.getInstance().checkRedTip(heroType);
                    }
                    //判断专武
                    if(!isTip){
                        isTip=HeroManager.getInstance().checkExUp(heroType);
                    }
                }else{
                    //判断解锁
                    isTip=HeroManager.getInstance().checkUnlock(heroType);
                }
            }break;
            case RedEventType.Btn_Role_Info_UpgradeAll:{
                //升级
                let hm=HeroManager.getInstance();
                let heroList = HeroManager.getInstance().getHeroList();
                for(let i=0; i<heroList.length; i++){                    
                    // let upData=hm.checkUpgrade(heroList[i].hero_type);
                    // if(upData.is_can_up){
                    //     isTip=true;
                    //     break;
                    // }
                }
            }break;            
            case RedEventType.Btn_Role_Equip_WearAll:{
                let em=EquipmentManager.getInstance();
                let heroList = HeroManager.getInstance().getHeroList();
                for(let i=0; i<heroList.length; i++){
                    if(HeroManager.getInstance().getHeroLevel(heroList[i].hero_type)>0){
                        let isCanWear=em.checkQuickWear(heroList[i].hero_type,false);
                        if(isCanWear){
                            isTip=true;
                            break;
                        }
                    }                    
                }
            }break;
            case RedEventType.Btn_Main:{
                this.child_red_type.forEach((redType)=>{
                   let isT=this.checkSelf(false,redType);
                   if(isT){
                    isTip=true;
                   }
                })
            }break;                        
            case RedEventType.Btn_Main_Spin:{
                if(!FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.ZhuanPan)){
                    isTip=false;
                    break;
                }
                isTip=TheStorageManager.getInstance().getNumber(StorageKey.TurmtableFreeYes, 0)==1
                // || TheStorageManager.getInstance().getNumber(StorageKey.TurmtableAd,0) < 10;                
            }break;
            case RedEventType.Btn_Main_Task:{
                if(!FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.MeiRiRenWu)){
                    isTip=false;
                    break;
                }
                //设置奖励物品
                // isTip=TaskManger.getInstance().getIsHaveGet();
                }break;
            case RedEventType.Btn_Main_Rank:{
                if(!FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.PaiHangBang)){
                    isTip=false;
                    break;
                }
                
            }break;
        
            case RedEventType.Btn_Main_SignIn:{
                if(!FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.QianDao)){
                    isTip=false;
                    break;
                }
                isTip=GameData.getInstance().getIsSignToday();
            }break;
            case RedEventType.Btn_Main_SignIn_BtnGet:{
                if(!FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.QianDao)){
                    isTip=false;
                    break;
                }
                isTip=GameData.getInstance().getIsSignToday();
            }break;
            case RedEventType.Btn_Main_Guaji:{    
                //挂机按钮
                isTip=this.checkSelf(false,RedEventType.Btn_Main_Guaji_Btn_GuaJi)                
                //快速挂机是否有广告机会
                if(!isTip){
                    isTip=this.checkSelf(false,RedEventType.Btn_Main_Guaji_Btn_Fast);
                }
            }break;
            case RedEventType.Btn_Main_Guaji_Btn_Fast:{
                isTip=OfflineRevenueManager.getInstance().isCanAdFastGuaJi();
            }break;  
            case RedEventType.Btn_Main_Guaji_Btn_Fast_Ad:{
                isTip=OfflineRevenueManager.getInstance().isCanAdFastGuaJi();
            }break;
            case RedEventType.Btn_Main_Guaji_Btn_GuaJi:{
                isTip=OfflineRevenueManager.getInstance().isCanGuaJiRedTip();
            }break;                       
            case RedEventType.Btn_Map_Team_0:
            case RedEventType.Btn_Map_Team_1:
            case RedEventType.Btn_Map_Team_2:
            case RedEventType.Btn_Map_Team_3:
            case RedEventType.Btn_Map_Team_4:
            {
                if(GameManager.getInstance().cur_game_mode!=GameMode.Main){
                    isTip=false;
                    break;
                }
                let teamList=HeroManager.getInstance().getTeamList(GameMode.Main);
                let mNum=0;
                for(let i=0; i<teamList.length; i++){
                    if(teamList[i]>0){
                        mNum++;
                    }
                }
                let unlockNum=0;
                let heroList = HeroManager.getInstance().getHeroList();
                for(let i=0; i<heroList.length; i++){
                    if(HeroManager.getInstance().getHeroLevel(heroList[i].hero_type)>0){
                        unlockNum++;
                    }
                }
                //没满员，并且解锁的数量比成员数量大
                if(mNum<teamList.length && mNum<unlockNum){
                    let chechIndex=redType-RedEventType.Btn_Map_Team_0;                
                    let heroType=teamList[chechIndex];
                    if(heroType<=0){
                        //该位置空了
                        isTip=true;
                    }
                }else{
                    isTip=false;
                }
            }break;
            case RedEventType.Btn_Main_Vip:{
                if(!FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.VIP)){
                    isTip=false;
                    break;
                }
                //判断是否可以在未购买的情况下，显示一次。
                let VipIdentity=TheStorageManager.getInstance().getNumber(StorageKey.VipIdentity,0) 
                if(VipIdentity==0){
                    if(PayManager.getInstance().getFuncTodayShow(FuncType.VIP)<=0){
                        isTip=true;
                        break;
                    }
                }
                let AllActivityNum = TheStorageManager.getInstance().getNumber(StorageKey.AllActivityNum,0);//总活跃度   
                for (let itmeindex = 0; itmeindex < 15; itmeindex++) {
                    let id=itmeindex+1                    
                    
                    let RequiredEx=BattlePassDataManager.getInstance().getRequiredExp(id)//所需活跃度
                    if(RequiredEx<=AllActivityNum){
                        let VipFreeRewardStatus = TheStorageManager.getInstance().getNumber(StorageKey.VipFreeRewardStatus+id,0);//vip免费奖励状态    0未领取,1已领取     0-14
                        let VipAdvancedRewardStatus = TheStorageManager.getInstance().getNumber(StorageKey.VipAdvancedRewardStatus+id,0);//vip高级奖励状态    0未领取,1已领
                        if(VipFreeRewardStatus==0){
                            isTip=true;
                            break;
                        }
                        if(VipAdvancedRewardStatus==0&&VipIdentity==1){
                            isTip=true;
                            break;
                        }
                    }
                }                
            }break;
            
            case RedEventType.Btn_Main_ShouChong:{
                if(!FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.FirstCharge)||PayManager.getInstance().getPayNum('c301')>0){
                    isTip=false;
                    break;
                }
                isTip=PayManager.getInstance().getFuncTodayShow(FuncType.FirstCharge)<=0;
            }break;
            case RedEventType.Btn_Main_WeekCard:{
                if(!FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.WeekCard)){
                    isTip=false;
                    break;
                }
                isTip=PayManager.getInstance().getFuncTodayShow(FuncType.WeekCard)<=0||(DingYueManager.getInstance().getWeekInfo()&&DingYueManager.getInstance().getWeekInfo().is_buy&&TheStorageManager.getInstance().getInt(StorageKey.WeekCardIsReceiveToday,0)<=0);
            }break;
            case RedEventType.Btn_Main_LeiChong:{
                if(!FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.AccumulatedRecharge)){
                    isTip=false;
                    break;
                }
                isTip=PayManager.getInstance().getFuncTodayShow(FuncType.AccumulatedRecharge)<=0;
                if(!isTip){
                    let isCanGet:boolean=false;
                    let rewarMap=CumulativeRechargesManager.getInstance().rewardMap;
                    rewarMap.forEach((v,k)=>{
                        if(isCanGet==false && v == 1){
                            isCanGet=true;
                        }
                    });
                    isTip=isCanGet;
                }                                
            }break;
            case RedEventType.Btn_Activity:{
                isTip=(FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.WuJinTiaoZhan)&&TheStorageManager.getInstance().getInt(StorageKey.UnlimitedChallengeTimes,0)>0)||(FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.GeRenBoss)&&TheStorageManager.getInstance().getInt(StorageKey.BossChallengeTimes,0)>0);
            }break;
            case RedEventType.Btn_Activity_Endless:{
                if(!FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.WuJinTiaoZhan)){
                    isTip=false;
                    break;
                }
                isTip=ActivityManager.getInstance().getTicket(ActivityType.Endless)>0;
            }break;
            case RedEventType.Btn_Activity_Boss:{
                if(!FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.GeRenBoss)){
                    isTip=false;
                    break;
                }
                isTip=ActivityManager.getInstance().getTicket(ActivityType.Boss)>0;
            }break;
            case RedEventType.Btn_Activity_Maze:{
                if(!FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.MiGong)){
                    isTip=false;
                    break;
                }
                isTip=MazeManager.getInstance().checkDate();
            }break;
        }
        //只有isPost为true时才发送
        if(isPost){
            EventManager.postRedEvent(RedEventString.RED_TIP,this.self_red_type,isTip);
        }
        return isTip;
    }

    addTip()
    {
        let tanhao=this.node.getChildByName('tanhao');
        if(!tanhao)
        {
            tanhao=new cc.Node('tanhao');
            tanhao.addComponent(cc.Sprite).spriteFrame=PropManager.getInstance().getSpByName('Common_Icon_RedDot');
            this.node.addChild(tanhao);
            tanhao.x=this.node.width/2;
            tanhao.y=this.node.height/2;
            tanhao.opacity=0;
            if(this.node.scale<1)
            tanhao.scale=1/this.node.scale;
            cc.tween(tanhao).to(0.2,{opacity:255}).start();                
        }
            
    }

    removeTip()
    {
        this.super_red_type.forEach((redType)=>{
            EventManager.postRedEvent(RedEventString.RED_TIP,redType,false,this.self_red_type);
        })
        let tanhao=this.node.getChildByName('tanhao');
        if(tanhao)
        tanhao.removeFromParent();
        this.false_red_type=new Array();
    }

}
