
//红点事件类型,通用的红点按钮UI自行处理,这里处理静态单独的红点
export enum RedEventType {
    Btn_Shop=10001 ,//商城按钮
    Btn_Shop_Hero10=10100,//英雄十连
    Btn_Shop_Gem=10200,//免费钻石
    Btn_Shop_Pet=10300,//免费宠物
    Btn_Shop_Coin=10400,//免费金币
    /**角色页红点 */
    Btn_Role=20001 ,//角色按钮
    Btn_Role_List_1=20100,//角色列表-长矛手
    Btn_Role_List_2=20200,//角色列表-兽王
    Btn_Role_List_3=20300,//角色列表-炮手
    Btn_Role_List_4=20400,//角色列表-德鲁伊
    Btn_Role_List_5=20500,//角色列表-狂战士
    Btn_Role_List_6=20600,//角色列表-贞德
    Btn_Role_List_7=20700,//角色列表-女巫
    Btn_Role_List_8=20800,//角色列表-弓箭手
    Btn_Role_List_9=20900,//角色列表-冰女
    Btn_Role_List_10=21000,//角色列表-阿努比斯
    Btn_Role_List_11=21100,//角色列表-魅魔
    Btn_Role_List_12=21200,//角色列表-雷神
    Btn_Role_Info_UpgradeSelf=20002,//角色页-升级按钮-可变
    Btn_Role_Info_UpgradeAll=20003,//所有英雄的升级按钮,界面为显示时的类型是Btn_Role_Upgrade_All，界面显示后需要更改为对应的英雄按钮    
    Btn_Role_Info_SkillSelf=20004,//所有英雄的技能按钮
    Btn_Role_Info_SkillAll=20005,//所有英雄的技能按钮    
    Btn_Role_Equip_WearSelf=20007,//英雄的一键穿戴按钮
    Btn_Role_Equip_WearAll=20008,//所有英雄的穿戴按钮,界面为显示时的类型是 
    Btn_Role_Equip_1=20011,//英雄的装备1按钮
    Btn_Role_Equip_2=20012,//英雄的装备2按钮
    Btn_Role_Equip_3=20013,//英雄的装备3按钮
    Btn_Role_Equip_4=20014,//英雄的装备4按钮
    Btn_Role_Equip_EX=20020,//英雄的专武装备按钮

    Btn_Main=30001 ,//战斗按钮
    Btn_Main_Spin=30100 ,//幸运转盘按钮
    Btn_Main_Spin_Spin=30102 ,//幸运转盘按钮
    Btn_Main_Task=30200,//任务按钮
    Btn_Main_Task_Daily=30201,//任务-日常按钮
    Btn_Main_Task_Week=30202,//任务-周常按钮
    Btn_Main_Task_Main=30203,//任务-主线按钮
    Btn_Main_SignIn=30300 ,//签到按钮
    Btn_Main_SignIn_BtnGet=30301 ,//签到-领取按钮
    Btn_Main_Guaji=30400 ,//主界面-挂机礼包按钮
    Btn_Main_Guaji_Btn_Fast=30410,//主界面-挂机界面-快速挂机按钮
    Btn_Main_Guaji_Btn_GuaJi=30420,//主界面-挂机界面-挂机按钮
    Btn_Main_Guaji_Btn_Fast_Ad=30411,//主界面-挂机界面-快速按钮-广告按钮
    Btn_Main_Rank=30500,//主界面-排行榜按钮
    Btn_Main_Vip=30600,//主界面-VIP战令按钮
    Btn_Main_WeekCard=30700,//主界面-贵族订阅(周卡)按钮

    Btn_Main_Bag=30800,//主界面-背包按钮
    Btn_Main_ShouChong=30900,//主界面-商店-首充-领取按钮

    Btn_Main_LeiChong=31000,//主界面-商店-累计充值按钮

    Btn_Task = 40001,//任务按钮
    Btn_Task_Daily = 40100,//日常任务按钮
    Btn_Task_Achievenment = 40200,//成就任务按钮

    Btn_Activity=50000 ,//副本按钮  
    Btn_Activity_Endless=50101 ,//副本-无尽按钮
    Btn_Activity_Boss=50201 ,//副本-Boss按钮
    Btn_Activity_Tower=50301 ,//副本-爬塔按钮
    Btn_Activity_Maze=50401 ,//副本-迷宫按钮
    Btn_Map_Team_0,//阵容选择位置0
    Btn_Map_Team_1,//阵容选择位置1
    Btn_Map_Team_2,//阵容选择位置2
    Btn_Map_Team_3,//阵容选择位置3
    Btn_Map_Team_4,//阵容选择位置4
    
}

export enum RedEventString {
    //红点提示事件
    RED_TIP="red_tip_",
    //红点检测事件
    RED_CHECK="red_check_",
}
//资源事件监听，当监听资源发生变化时，需要通知事件的触发
export enum AssetsEventType {
    //金币
    COIN="coin",
    //钻石
    GEM="gem",
    //英雄经验
    HERO_EXP="hero_exp",
    /**英雄魂石/进阶石 */
    HERO_STONE='hero_stone',
    /**兽粮 */
    Animal_Food='animal_food',
    //装备
    EQUIP="equip",
    //任务
    TASK="task",
    //战力（里程碑）
    ZHAN_LI="zhan_li",

    //天赋点
    TALENT_POINT="tanle_point",
    //装备穿脱
    EQUIP_WEAR_UNLOAD="equip_wear_unload",
    //活动门票
    TICKET="ticket",
    /**宠物的上下阵 */
    TEAM_PET='team_pet',
}

const {ccclass, property} = cc._decorator;

@ccclass
export class EventManager {

    /**红点事件监听 */
    public static addRedEvent(str:RedEventString,redType:RedEventType,callback:Function, target?: any)
    {
        cc.director.on(str+redType,callback,target);
    }
    /**删除红点事件监听 */
    public static removeRedEvent(str:RedEventString,redType:RedEventType,callback?:Function, target?: any)
    {
        cc.director.off(str+redType,callback,target);
    }
    /**推送提交红点事件
     * str 红点事件的头名称
     * redType 具体类型-通知谁的-
     * isShow 只有str为RedEventString.RED_TIP时才生效
     * postType 具体类型-谁通知的
     */
    public static postRedEvent(str:RedEventString,redType:RedEventType,isShow?:boolean,postType?:RedEventType){
        cc.director.emit(str+redType,isShow,postType);
    }
    /**当资源发生改变时,统一在此调度检测 */
    public static postAssetsEvent(type:AssetsEventType){
        switch(type){
            case AssetsEventType.COIN:{
                this.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Role);
                //this.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_City);
            }break;
            case AssetsEventType.GEM:{
                //this.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_City);
            }break;
            case AssetsEventType.TEAM_PET:{
                this.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Role);
            }break;
            case AssetsEventType.HERO_EXP:{
                this.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Role);
            }break;
            case AssetsEventType.HERO_STONE:{
                this.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Role);
            }break;
            case AssetsEventType.EQUIP_WEAR_UNLOAD:{
                this.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Role);
            }break;
            case AssetsEventType.EQUIP:{
                this.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Role);
                //this.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_City_Equip);
            }break;
            case AssetsEventType.TASK:{
                this.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main);
            }break;
            case AssetsEventType.ZHAN_LI:{
                this.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main);
            }break;
            case AssetsEventType.Animal_Food:{
                //this.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Pet);
            }break;            
            case AssetsEventType.TICKET:{
                this.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Activity);
            }
        }
    }
}

