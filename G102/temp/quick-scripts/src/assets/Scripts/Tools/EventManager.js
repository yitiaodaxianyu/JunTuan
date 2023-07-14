"use strict";
cc._RF.push(module, '0334fMiOI1OJqD25ePerPE1', 'EventManager');
// Scripts/Tools/EventManager.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventManager = exports.AssetsEventType = exports.RedEventString = exports.RedEventType = void 0;
//红点事件类型,通用的红点按钮UI自行处理,这里处理静态单独的红点
var RedEventType;
(function (RedEventType) {
    RedEventType[RedEventType["Btn_Shop"] = 10001] = "Btn_Shop";
    RedEventType[RedEventType["Btn_Shop_Hero10"] = 10100] = "Btn_Shop_Hero10";
    RedEventType[RedEventType["Btn_Shop_Gem"] = 10200] = "Btn_Shop_Gem";
    RedEventType[RedEventType["Btn_Shop_Pet"] = 10300] = "Btn_Shop_Pet";
    RedEventType[RedEventType["Btn_Shop_Coin"] = 10400] = "Btn_Shop_Coin";
    /**角色页红点 */
    RedEventType[RedEventType["Btn_Role"] = 20001] = "Btn_Role";
    RedEventType[RedEventType["Btn_Role_List_1"] = 20100] = "Btn_Role_List_1";
    RedEventType[RedEventType["Btn_Role_List_2"] = 20200] = "Btn_Role_List_2";
    RedEventType[RedEventType["Btn_Role_List_3"] = 20300] = "Btn_Role_List_3";
    RedEventType[RedEventType["Btn_Role_List_4"] = 20400] = "Btn_Role_List_4";
    RedEventType[RedEventType["Btn_Role_List_5"] = 20500] = "Btn_Role_List_5";
    RedEventType[RedEventType["Btn_Role_List_6"] = 20600] = "Btn_Role_List_6";
    RedEventType[RedEventType["Btn_Role_List_7"] = 20700] = "Btn_Role_List_7";
    RedEventType[RedEventType["Btn_Role_List_8"] = 20800] = "Btn_Role_List_8";
    RedEventType[RedEventType["Btn_Role_List_9"] = 20900] = "Btn_Role_List_9";
    RedEventType[RedEventType["Btn_Role_List_10"] = 21000] = "Btn_Role_List_10";
    RedEventType[RedEventType["Btn_Role_List_11"] = 21100] = "Btn_Role_List_11";
    RedEventType[RedEventType["Btn_Role_List_12"] = 21200] = "Btn_Role_List_12";
    RedEventType[RedEventType["Btn_Role_Info_UpgradeSelf"] = 20002] = "Btn_Role_Info_UpgradeSelf";
    RedEventType[RedEventType["Btn_Role_Info_UpgradeAll"] = 20003] = "Btn_Role_Info_UpgradeAll";
    RedEventType[RedEventType["Btn_Role_Info_SkillSelf"] = 20004] = "Btn_Role_Info_SkillSelf";
    RedEventType[RedEventType["Btn_Role_Info_SkillAll"] = 20005] = "Btn_Role_Info_SkillAll";
    RedEventType[RedEventType["Btn_Role_Equip_WearSelf"] = 20007] = "Btn_Role_Equip_WearSelf";
    RedEventType[RedEventType["Btn_Role_Equip_WearAll"] = 20008] = "Btn_Role_Equip_WearAll";
    RedEventType[RedEventType["Btn_Role_Equip_1"] = 20011] = "Btn_Role_Equip_1";
    RedEventType[RedEventType["Btn_Role_Equip_2"] = 20012] = "Btn_Role_Equip_2";
    RedEventType[RedEventType["Btn_Role_Equip_3"] = 20013] = "Btn_Role_Equip_3";
    RedEventType[RedEventType["Btn_Role_Equip_4"] = 20014] = "Btn_Role_Equip_4";
    RedEventType[RedEventType["Btn_Role_Equip_EX"] = 20020] = "Btn_Role_Equip_EX";
    RedEventType[RedEventType["Btn_Main"] = 30001] = "Btn_Main";
    RedEventType[RedEventType["Btn_Main_Spin"] = 30100] = "Btn_Main_Spin";
    RedEventType[RedEventType["Btn_Main_Spin_Spin"] = 30102] = "Btn_Main_Spin_Spin";
    RedEventType[RedEventType["Btn_Main_Task"] = 30200] = "Btn_Main_Task";
    RedEventType[RedEventType["Btn_Main_Task_Daily"] = 30201] = "Btn_Main_Task_Daily";
    RedEventType[RedEventType["Btn_Main_Task_Week"] = 30202] = "Btn_Main_Task_Week";
    RedEventType[RedEventType["Btn_Main_Task_Main"] = 30203] = "Btn_Main_Task_Main";
    RedEventType[RedEventType["Btn_Main_SignIn"] = 30300] = "Btn_Main_SignIn";
    RedEventType[RedEventType["Btn_Main_SignIn_BtnGet"] = 30301] = "Btn_Main_SignIn_BtnGet";
    RedEventType[RedEventType["Btn_Main_Guaji"] = 30400] = "Btn_Main_Guaji";
    RedEventType[RedEventType["Btn_Main_Guaji_Btn_Fast"] = 30410] = "Btn_Main_Guaji_Btn_Fast";
    RedEventType[RedEventType["Btn_Main_Guaji_Btn_GuaJi"] = 30420] = "Btn_Main_Guaji_Btn_GuaJi";
    RedEventType[RedEventType["Btn_Main_Guaji_Btn_Fast_Ad"] = 30411] = "Btn_Main_Guaji_Btn_Fast_Ad";
    RedEventType[RedEventType["Btn_Main_Rank"] = 30500] = "Btn_Main_Rank";
    RedEventType[RedEventType["Btn_Main_Vip"] = 30600] = "Btn_Main_Vip";
    RedEventType[RedEventType["Btn_Main_WeekCard"] = 30700] = "Btn_Main_WeekCard";
    RedEventType[RedEventType["Btn_Main_Bag"] = 30800] = "Btn_Main_Bag";
    RedEventType[RedEventType["Btn_Main_ShouChong"] = 30900] = "Btn_Main_ShouChong";
    RedEventType[RedEventType["Btn_Main_LeiChong"] = 31000] = "Btn_Main_LeiChong";
    RedEventType[RedEventType["Btn_Task"] = 40001] = "Btn_Task";
    RedEventType[RedEventType["Btn_Task_Daily"] = 40100] = "Btn_Task_Daily";
    RedEventType[RedEventType["Btn_Task_Achievenment"] = 40200] = "Btn_Task_Achievenment";
    RedEventType[RedEventType["Btn_Activity"] = 50000] = "Btn_Activity";
    RedEventType[RedEventType["Btn_Activity_Endless"] = 50101] = "Btn_Activity_Endless";
    RedEventType[RedEventType["Btn_Activity_Boss"] = 50201] = "Btn_Activity_Boss";
    RedEventType[RedEventType["Btn_Activity_Tower"] = 50301] = "Btn_Activity_Tower";
    RedEventType[RedEventType["Btn_Activity_Maze"] = 50401] = "Btn_Activity_Maze";
    RedEventType[RedEventType["Btn_Map_Team_0"] = 50402] = "Btn_Map_Team_0";
    RedEventType[RedEventType["Btn_Map_Team_1"] = 50403] = "Btn_Map_Team_1";
    RedEventType[RedEventType["Btn_Map_Team_2"] = 50404] = "Btn_Map_Team_2";
    RedEventType[RedEventType["Btn_Map_Team_3"] = 50405] = "Btn_Map_Team_3";
    RedEventType[RedEventType["Btn_Map_Team_4"] = 50406] = "Btn_Map_Team_4";
})(RedEventType = exports.RedEventType || (exports.RedEventType = {}));
var RedEventString;
(function (RedEventString) {
    //红点提示事件
    RedEventString["RED_TIP"] = "red_tip_";
    //红点检测事件
    RedEventString["RED_CHECK"] = "red_check_";
})(RedEventString = exports.RedEventString || (exports.RedEventString = {}));
//资源事件监听，当监听资源发生变化时，需要通知事件的触发
var AssetsEventType;
(function (AssetsEventType) {
    //金币
    AssetsEventType["COIN"] = "coin";
    //钻石
    AssetsEventType["GEM"] = "gem";
    //英雄经验
    AssetsEventType["HERO_EXP"] = "hero_exp";
    /**英雄魂石/进阶石 */
    AssetsEventType["HERO_STONE"] = "hero_stone";
    /**兽粮 */
    AssetsEventType["Animal_Food"] = "animal_food";
    //装备
    AssetsEventType["EQUIP"] = "equip";
    //任务
    AssetsEventType["TASK"] = "task";
    //战力（里程碑）
    AssetsEventType["ZHAN_LI"] = "zhan_li";
    //天赋点
    AssetsEventType["TALENT_POINT"] = "tanle_point";
    //装备穿脱
    AssetsEventType["EQUIP_WEAR_UNLOAD"] = "equip_wear_unload";
    //活动门票
    AssetsEventType["TICKET"] = "ticket";
    /**宠物的上下阵 */
    AssetsEventType["TEAM_PET"] = "team_pet";
})(AssetsEventType = exports.AssetsEventType || (exports.AssetsEventType = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EventManager = /** @class */ (function () {
    function EventManager() {
    }
    /**红点事件监听 */
    EventManager.addRedEvent = function (str, redType, callback, target) {
        cc.director.on(str + redType, callback, target);
    };
    /**删除红点事件监听 */
    EventManager.removeRedEvent = function (str, redType, callback, target) {
        cc.director.off(str + redType, callback, target);
    };
    /**推送提交红点事件
     * str 红点事件的头名称
     * redType 具体类型-通知谁的-
     * isShow 只有str为RedEventString.RED_TIP时才生效
     * postType 具体类型-谁通知的
     */
    EventManager.postRedEvent = function (str, redType, isShow, postType) {
        cc.director.emit(str + redType, isShow, postType);
    };
    /**当资源发生改变时,统一在此调度检测 */
    EventManager.postAssetsEvent = function (type) {
        switch (type) {
            case AssetsEventType.COIN:
                {
                    this.postRedEvent(RedEventString.RED_CHECK, RedEventType.Btn_Role);
                    //this.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_City);
                }
                break;
            case AssetsEventType.GEM:
                {
                    //this.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_City);
                }
                break;
            case AssetsEventType.TEAM_PET:
                {
                    this.postRedEvent(RedEventString.RED_CHECK, RedEventType.Btn_Role);
                }
                break;
            case AssetsEventType.HERO_EXP:
                {
                    this.postRedEvent(RedEventString.RED_CHECK, RedEventType.Btn_Role);
                }
                break;
            case AssetsEventType.HERO_STONE:
                {
                    this.postRedEvent(RedEventString.RED_CHECK, RedEventType.Btn_Role);
                }
                break;
            case AssetsEventType.EQUIP_WEAR_UNLOAD:
                {
                    this.postRedEvent(RedEventString.RED_CHECK, RedEventType.Btn_Role);
                }
                break;
            case AssetsEventType.EQUIP:
                {
                    this.postRedEvent(RedEventString.RED_CHECK, RedEventType.Btn_Role);
                    //this.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_City_Equip);
                }
                break;
            case AssetsEventType.TASK:
                {
                    this.postRedEvent(RedEventString.RED_CHECK, RedEventType.Btn_Main);
                }
                break;
            case AssetsEventType.ZHAN_LI:
                {
                    this.postRedEvent(RedEventString.RED_CHECK, RedEventType.Btn_Main);
                }
                break;
            case AssetsEventType.Animal_Food:
                {
                    //this.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Pet);
                }
                break;
            case AssetsEventType.TICKET: {
                this.postRedEvent(RedEventString.RED_CHECK, RedEventType.Btn_Activity);
            }
        }
    };
    EventManager = __decorate([
        ccclass
    ], EventManager);
    return EventManager;
}());
exports.EventManager = EventManager;

cc._RF.pop();