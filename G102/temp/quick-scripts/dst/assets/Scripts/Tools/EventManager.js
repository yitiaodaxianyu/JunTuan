
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Tools/EventManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVG9vbHNcXEV2ZW50TWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxrQ0FBa0M7QUFDbEMsSUFBWSxZQXFFWDtBQXJFRCxXQUFZLFlBQVk7SUFDcEIsMkRBQWMsQ0FBQTtJQUNkLHlFQUFxQixDQUFBO0lBQ3JCLG1FQUFrQixDQUFBO0lBQ2xCLG1FQUFrQixDQUFBO0lBQ2xCLHFFQUFtQixDQUFBO0lBQ25CLFdBQVc7SUFDWCwyREFBYyxDQUFBO0lBQ2QseUVBQXFCLENBQUE7SUFDckIseUVBQXFCLENBQUE7SUFDckIseUVBQXFCLENBQUE7SUFDckIseUVBQXFCLENBQUE7SUFDckIseUVBQXFCLENBQUE7SUFDckIseUVBQXFCLENBQUE7SUFDckIseUVBQXFCLENBQUE7SUFDckIseUVBQXFCLENBQUE7SUFDckIseUVBQXFCLENBQUE7SUFDckIsMkVBQXNCLENBQUE7SUFDdEIsMkVBQXNCLENBQUE7SUFDdEIsMkVBQXNCLENBQUE7SUFDdEIsNkZBQStCLENBQUE7SUFDL0IsMkZBQThCLENBQUE7SUFDOUIseUZBQTZCLENBQUE7SUFDN0IsdUZBQTRCLENBQUE7SUFDNUIseUZBQTZCLENBQUE7SUFDN0IsdUZBQTRCLENBQUE7SUFDNUIsMkVBQXNCLENBQUE7SUFDdEIsMkVBQXNCLENBQUE7SUFDdEIsMkVBQXNCLENBQUE7SUFDdEIsMkVBQXNCLENBQUE7SUFDdEIsNkVBQXVCLENBQUE7SUFFdkIsMkRBQWMsQ0FBQTtJQUNkLHFFQUFtQixDQUFBO0lBQ25CLCtFQUF3QixDQUFBO0lBQ3hCLHFFQUFtQixDQUFBO0lBQ25CLGlGQUF5QixDQUFBO0lBQ3pCLCtFQUF3QixDQUFBO0lBQ3hCLCtFQUF3QixDQUFBO0lBQ3hCLHlFQUFxQixDQUFBO0lBQ3JCLHVGQUE0QixDQUFBO0lBQzVCLHVFQUFvQixDQUFBO0lBQ3BCLHlGQUE2QixDQUFBO0lBQzdCLDJGQUE4QixDQUFB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QUM3QixtRUFBbUU7aUJBQ3RFO2dCQUFBLE1BQU07WUFDUCxLQUFLLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUN6RTtTQUNKO0lBQ0wsQ0FBQztJQTVEUSxZQUFZO1FBRHhCLE9BQU87T0FDSyxZQUFZLENBNkR4QjtJQUFELG1CQUFDO0NBN0RELEFBNkRDLElBQUE7QUE3RFksb0NBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLy/nuqLngrnkuovku7bnsbvlnoss6YCa55So55qE57qi54K55oyJ6ZKuVUnoh6rooYzlpITnkIYs6L+Z6YeM5aSE55CG6Z2Z5oCB5Y2V54us55qE57qi54K5XHJcbmV4cG9ydCBlbnVtIFJlZEV2ZW50VHlwZSB7XHJcbiAgICBCdG5fU2hvcD0xMDAwMSAsLy/llYbln47mjInpkq5cclxuICAgIEJ0bl9TaG9wX0hlcm8xMD0xMDEwMCwvL+iLsembhOWNgei/nlxyXG4gICAgQnRuX1Nob3BfR2VtPTEwMjAwLC8v5YWN6LS56ZK755+zXHJcbiAgICBCdG5fU2hvcF9QZXQ9MTAzMDAsLy/lhY3otLnlrqDnialcclxuICAgIEJ0bl9TaG9wX0NvaW49MTA0MDAsLy/lhY3otLnph5HluIFcclxuICAgIC8qKuinkuiJsumhtee6oueCuSAqL1xyXG4gICAgQnRuX1JvbGU9MjAwMDEgLC8v6KeS6Imy5oyJ6ZKuXHJcbiAgICBCdG5fUm9sZV9MaXN0XzE9MjAxMDAsLy/op5LoibLliJfooagt6ZW/55+b5omLXHJcbiAgICBCdG5fUm9sZV9MaXN0XzI9MjAyMDAsLy/op5LoibLliJfooagt5YW9546LXHJcbiAgICBCdG5fUm9sZV9MaXN0XzM9MjAzMDAsLy/op5LoibLliJfooagt54Ku5omLXHJcbiAgICBCdG5fUm9sZV9MaXN0XzQ9MjA0MDAsLy/op5LoibLliJfooagt5b636bKB5LyKXHJcbiAgICBCdG5fUm9sZV9MaXN0XzU9MjA1MDAsLy/op5LoibLliJfooagt54uC5oiY5aOrXHJcbiAgICBCdG5fUm9sZV9MaXN0XzY9MjA2MDAsLy/op5LoibLliJfooagt6LSe5b63XHJcbiAgICBCdG5fUm9sZV9MaXN0Xzc9MjA3MDAsLy/op5LoibLliJfooagt5aWz5berXHJcbiAgICBCdG5fUm9sZV9MaXN0Xzg9MjA4MDAsLy/op5LoibLliJfooagt5byT566t5omLXHJcbiAgICBCdG5fUm9sZV9MaXN0Xzk9MjA5MDAsLy/op5LoibLliJfooagt5Yaw5aWzXHJcbiAgICBCdG5fUm9sZV9MaXN0XzEwPTIxMDAwLC8v6KeS6Imy5YiX6KGoLemYv+WKquavlOaWr1xyXG4gICAgQnRuX1JvbGVfTGlzdF8xMT0yMTEwMCwvL+inkuiJsuWIl+ihqC3prYXprZRcclxuICAgIEJ0bl9Sb2xlX0xpc3RfMTI9MjEyMDAsLy/op5LoibLliJfooagt6Zu356WeXHJcbiAgICBCdG5fUm9sZV9JbmZvX1VwZ3JhZGVTZWxmPTIwMDAyLC8v6KeS6Imy6aG1LeWNh+e6p+aMiemSri3lj6/lj5hcclxuICAgIEJ0bl9Sb2xlX0luZm9fVXBncmFkZUFsbD0yMDAwMywvL+aJgOacieiLsembhOeahOWNh+e6p+aMiemSriznlYzpnaLkuLrmmL7npLrml7bnmoTnsbvlnovmmK9CdG5fUm9sZV9VcGdyYWRlX0FsbO+8jOeVjOmdouaYvuekuuWQjumcgOimgeabtOaUueS4uuWvueW6lOeahOiLsembhOaMiemSriAgICBcclxuICAgIEJ0bl9Sb2xlX0luZm9fU2tpbGxTZWxmPTIwMDA0LC8v5omA5pyJ6Iux6ZuE55qE5oqA6IO95oyJ6ZKuXHJcbiAgICBCdG5fUm9sZV9JbmZvX1NraWxsQWxsPTIwMDA1LC8v5omA5pyJ6Iux6ZuE55qE5oqA6IO95oyJ6ZKuICAgIFxyXG4gICAgQnRuX1JvbGVfRXF1aXBfV2VhclNlbGY9MjAwMDcsLy/oi7Hpm4TnmoTkuIDplK7nqb/miLTmjInpkq5cclxuICAgIEJ0bl9Sb2xlX0VxdWlwX1dlYXJBbGw9MjAwMDgsLy/miYDmnInoi7Hpm4TnmoTnqb/miLTmjInpkq4s55WM6Z2i5Li65pi+56S65pe255qE57G75Z6L5pivIFxyXG4gICAgQnRuX1JvbGVfRXF1aXBfMT0yMDAxMSwvL+iLsembhOeahOijheWkhzHmjInpkq5cclxuICAgIEJ0bl9Sb2xlX0VxdWlwXzI9MjAwMTIsLy/oi7Hpm4TnmoToo4XlpIcy5oyJ6ZKuXHJcbiAgICBCdG5fUm9sZV9FcXVpcF8zPTIwMDEzLC8v6Iux6ZuE55qE6KOF5aSHM+aMiemSrlxyXG4gICAgQnRuX1JvbGVfRXF1aXBfND0yMDAxNCwvL+iLsembhOeahOijheWkhzTmjInpkq5cclxuICAgIEJ0bl9Sb2xlX0VxdWlwX0VYPTIwMDIwLC8v6Iux6ZuE55qE5LiT5q2m6KOF5aSH5oyJ6ZKuXHJcblxyXG4gICAgQnRuX01haW49MzAwMDEgLC8v5oiY5paX5oyJ6ZKuXHJcbiAgICBCdG5fTWFpbl9TcGluPTMwMTAwICwvL+W5uOi/kOi9rOebmOaMiemSrlxyXG4gICAgQnRuX01haW5fU3Bpbl9TcGluPTMwMTAyICwvL+W5uOi/kOi9rOebmOaMiemSrlxyXG4gICAgQnRuX01haW5fVGFzaz0zMDIwMCwvL+S7u+WKoeaMiemSrlxyXG4gICAgQnRuX01haW5fVGFza19EYWlseT0zMDIwMSwvL+S7u+WKoS3ml6XluLjmjInpkq5cclxuICAgIEJ0bl9NYWluX1Rhc2tfV2Vlaz0zMDIwMiwvL+S7u+WKoS3lkajluLjmjInpkq5cclxuICAgIEJ0bl9NYWluX1Rhc2tfTWFpbj0zMDIwMywvL+S7u+WKoS3kuLvnur/mjInpkq5cclxuICAgIEJ0bl9NYWluX1NpZ25Jbj0zMDMwMCAsLy/nrb7liLDmjInpkq5cclxuICAgIEJ0bl9NYWluX1NpZ25Jbl9CdG5HZXQ9MzAzMDEgLC8v562+5YiwLemihuWPluaMiemSrlxyXG4gICAgQnRuX01haW5fR3Vhamk9MzA0MDAgLC8v5Li755WM6Z2iLeaMguacuuekvOWMheaMiemSrlxyXG4gICAgQnRuX01haW5fR3VhamlfQnRuX0Zhc3Q9MzA0MTAsLy/kuLvnlYzpnaIt5oyC5py655WM6Z2iLeW/q+mAn+aMguacuuaMiemSrlxyXG4gICAgQnRuX01haW5fR3VhamlfQnRuX0d1YUppPTMwNDIwLC8v5Li755WM6Z2iLeaMguacuueVjOmdoi3mjILmnLrmjInpkq5cclxuICAgIEJ0bl9NYWluX0d1YWppX0J0bl9GYXN0X0FkPTMwNDExLC8v5Li755WM6Z2iLeaMguacuueVjOmdoi3lv6vpgJ/mjInpkq4t5bm/5ZGK5oyJ6ZKuXHJcbiAgICBCdG5fTWFpbl9SYW5rPTMwNTAwLC8v5Li755WM6Z2iLeaOkuihjOamnOaMiemSrlxyXG4gICAgQnRuX01haW5fVmlwPTMwNjAwLC8v5Li755WM6Z2iLVZJUOaImOS7pOaMiemSrlxyXG4gICAgQnRuX01haW5fV2Vla0NhcmQ9MzA3MDAsLy/kuLvnlYzpnaIt6LS15peP6K6i6ZiFKOWRqOWNoSnmjInpkq5cclxuXHJcbiAgICBCdG5fTWFpbl9CYWc9MzA4MDAsLy/kuLvnlYzpnaIt6IOM5YyF5oyJ6ZKuXHJcbiAgICBCdG5fTWFpbl9TaG91Q2hvbmc9MzA5MDAsLy/kuLvnlYzpnaIt5ZWG5bqXLemmluWFhS3pooblj5bmjInpkq5cclxuXHJcbiAgICBCdG5fTWFpbl9MZWlDaG9uZz0zMTAwMCwvL+S4u+eVjOmdoi3llYblupct57Sv6K6h5YWF5YC85oyJ6ZKuXHJcblxyXG4gICAgQnRuX1Rhc2sgPSA0MDAwMSwvL+S7u+WKoeaMiemSrlxyXG4gICAgQnRuX1Rhc2tfRGFpbHkgPSA0MDEwMCwvL+aXpeW4uOS7u+WKoeaMiemSrlxyXG4gICAgQnRuX1Rhc2tfQWNoaWV2ZW5tZW50ID0gNDAyMDAsLy/miJDlsLHku7vliqHmjInpkq5cclxuXHJcbiAgICBCdG5fQWN0aXZpdHk9NTAwMDAgLC8v5Ymv5pys5oyJ6ZKuICBcclxuICAgIEJ0bl9BY3Rpdml0eV9FbmRsZXNzPTUwMTAxICwvL+WJr+acrC3ml6DlsL3mjInpkq5cclxuICAgIEJ0bl9BY3Rpdml0eV9Cb3NzPTUwMjAxICwvL+WJr+acrC1Cb3Nz5oyJ6ZKuXHJcbiAgICBCdG5fQWN0aXZpdHlfVG93ZXI9NTAzMDEgLC8v5Ymv5pysLeeIrOWhlOaMiemSrlxyXG4gICAgQnRuX0FjdGl2aXR5X01hemU9NTA0MDEgLC8v5Ymv5pysLei/t+Wuq+aMiemSrlxyXG4gICAgQnRuX01hcF9UZWFtXzAsLy/pmLXlrrnpgInmi6nkvY3nva4wXHJcbiAgICBCdG5fTWFwX1RlYW1fMSwvL+mYteWuuemAieaLqeS9jee9rjFcclxuICAgIEJ0bl9NYXBfVGVhbV8yLC8v6Zi15a656YCJ5oup5L2N572uMlxyXG4gICAgQnRuX01hcF9UZWFtXzMsLy/pmLXlrrnpgInmi6nkvY3nva4zXHJcbiAgICBCdG5fTWFwX1RlYW1fNCwvL+mYteWuuemAieaLqeS9jee9rjRcclxuICAgIFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBSZWRFdmVudFN0cmluZyB7XHJcbiAgICAvL+e6oueCueaPkOekuuS6i+S7tlxyXG4gICAgUkVEX1RJUD1cInJlZF90aXBfXCIsXHJcbiAgICAvL+e6oueCueajgOa1i+S6i+S7tlxyXG4gICAgUkVEX0NIRUNLPVwicmVkX2NoZWNrX1wiLFxyXG59XHJcbi8v6LWE5rqQ5LqL5Lu255uR5ZCs77yM5b2T55uR5ZCs6LWE5rqQ5Y+R55Sf5Y+Y5YyW5pe277yM6ZyA6KaB6YCa55+l5LqL5Lu255qE6Kem5Y+RXHJcbmV4cG9ydCBlbnVtIEFzc2V0c0V2ZW50VHlwZSB7XHJcbiAgICAvL+mHkeW4gVxyXG4gICAgQ09JTj1cImNvaW5cIixcclxuICAgIC8v6ZK755+zXHJcbiAgICBHRU09XCJnZW1cIixcclxuICAgIC8v6Iux6ZuE57uP6aqMXHJcbiAgICBIRVJPX0VYUD1cImhlcm9fZXhwXCIsXHJcbiAgICAvKiroi7Hpm4TprYLnn7Mv6L+b6Zi255+zICovXHJcbiAgICBIRVJPX1NUT05FPSdoZXJvX3N0b25lJyxcclxuICAgIC8qKuWFveeyriAqL1xyXG4gICAgQW5pbWFsX0Zvb2Q9J2FuaW1hbF9mb29kJyxcclxuICAgIC8v6KOF5aSHXHJcbiAgICBFUVVJUD1cImVxdWlwXCIsXHJcbiAgICAvL+S7u+WKoVxyXG4gICAgVEFTSz1cInRhc2tcIixcclxuICAgIC8v5oiY5Yqb77yI6YeM56iL56KR77yJXHJcbiAgICBaSEFOX0xJPVwiemhhbl9saVwiLFxyXG5cclxuICAgIC8v5aSp6LWL54K5XHJcbiAgICBUQUxFTlRfUE9JTlQ9XCJ0YW5sZV9wb2ludFwiLFxyXG4gICAgLy/oo4XlpIfnqb/ohLFcclxuICAgIEVRVUlQX1dFQVJfVU5MT0FEPVwiZXF1aXBfd2Vhcl91bmxvYWRcIixcclxuICAgIC8v5rS75Yqo6Zeo56WoXHJcbiAgICBUSUNLRVQ9XCJ0aWNrZXRcIixcclxuICAgIC8qKuWuoOeJqeeahOS4iuS4i+mYtSAqL1xyXG4gICAgVEVBTV9QRVQ9J3RlYW1fcGV0JyxcclxufVxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgRXZlbnRNYW5hZ2VyIHtcclxuXHJcbiAgICAvKirnuqLngrnkuovku7bnm5HlkKwgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYWRkUmVkRXZlbnQoc3RyOlJlZEV2ZW50U3RyaW5nLHJlZFR5cGU6UmVkRXZlbnRUeXBlLGNhbGxiYWNrOkZ1bmN0aW9uLCB0YXJnZXQ/OiBhbnkpXHJcbiAgICB7XHJcbiAgICAgICAgY2MuZGlyZWN0b3Iub24oc3RyK3JlZFR5cGUsY2FsbGJhY2ssdGFyZ2V0KTtcclxuICAgIH1cclxuICAgIC8qKuWIoOmZpOe6oueCueS6i+S7tuebkeWQrCAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByZW1vdmVSZWRFdmVudChzdHI6UmVkRXZlbnRTdHJpbmcscmVkVHlwZTpSZWRFdmVudFR5cGUsY2FsbGJhY2s/OkZ1bmN0aW9uLCB0YXJnZXQ/OiBhbnkpXHJcbiAgICB7XHJcbiAgICAgICAgY2MuZGlyZWN0b3Iub2ZmKHN0cityZWRUeXBlLGNhbGxiYWNrLHRhcmdldCk7XHJcbiAgICB9XHJcbiAgICAvKirmjqjpgIHmj5DkuqTnuqLngrnkuovku7ZcclxuICAgICAqIHN0ciDnuqLngrnkuovku7bnmoTlpLTlkI3np7BcclxuICAgICAqIHJlZFR5cGUg5YW35L2T57G75Z6LLemAmuefpeiwgeeahC1cclxuICAgICAqIGlzU2hvdyDlj6rmnIlzdHLkuLpSZWRFdmVudFN0cmluZy5SRURfVElQ5pe25omN55Sf5pWIXHJcbiAgICAgKiBwb3N0VHlwZSDlhbfkvZPnsbvlnost6LCB6YCa55+l55qEXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcG9zdFJlZEV2ZW50KHN0cjpSZWRFdmVudFN0cmluZyxyZWRUeXBlOlJlZEV2ZW50VHlwZSxpc1Nob3c/OmJvb2xlYW4scG9zdFR5cGU/OlJlZEV2ZW50VHlwZSl7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IuZW1pdChzdHIrcmVkVHlwZSxpc1Nob3cscG9zdFR5cGUpO1xyXG4gICAgfVxyXG4gICAgLyoq5b2T6LWE5rqQ5Y+R55Sf5pS55Y+Y5pe2LOe7n+S4gOWcqOatpOiwg+W6puajgOa1iyAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBwb3N0QXNzZXRzRXZlbnQodHlwZTpBc3NldHNFdmVudFR5cGUpe1xyXG4gICAgICAgIHN3aXRjaCh0eXBlKXtcclxuICAgICAgICAgICAgY2FzZSBBc3NldHNFdmVudFR5cGUuQ09JTjp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfQ0hFQ0ssUmVkRXZlbnRUeXBlLkJ0bl9Sb2xlKTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLFJlZEV2ZW50VHlwZS5CdG5fQ2l0eSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBBc3NldHNFdmVudFR5cGUuR0VNOntcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLFJlZEV2ZW50VHlwZS5CdG5fQ2l0eSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBBc3NldHNFdmVudFR5cGUuVEVBTV9QRVQ6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLFJlZEV2ZW50VHlwZS5CdG5fUm9sZSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBBc3NldHNFdmVudFR5cGUuSEVST19FWFA6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLFJlZEV2ZW50VHlwZS5CdG5fUm9sZSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBBc3NldHNFdmVudFR5cGUuSEVST19TVE9ORTp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfQ0hFQ0ssUmVkRXZlbnRUeXBlLkJ0bl9Sb2xlKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEFzc2V0c0V2ZW50VHlwZS5FUVVJUF9XRUFSX1VOTE9BRDp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfQ0hFQ0ssUmVkRXZlbnRUeXBlLkJ0bl9Sb2xlKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEFzc2V0c0V2ZW50VHlwZS5FUVVJUDp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfQ0hFQ0ssUmVkRXZlbnRUeXBlLkJ0bl9Sb2xlKTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLFJlZEV2ZW50VHlwZS5CdG5fQ2l0eV9FcXVpcCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBBc3NldHNFdmVudFR5cGUuVEFTSzp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfQ0hFQ0ssUmVkRXZlbnRUeXBlLkJ0bl9NYWluKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEFzc2V0c0V2ZW50VHlwZS5aSEFOX0xJOntcclxuICAgICAgICAgICAgICAgIHRoaXMucG9zdFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9DSEVDSyxSZWRFdmVudFR5cGUuQnRuX01haW4pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQXNzZXRzRXZlbnRUeXBlLkFuaW1hbF9Gb29kOntcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLFJlZEV2ZW50VHlwZS5CdG5fUGV0KTtcclxuICAgICAgICAgICAgfWJyZWFrOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYXNlIEFzc2V0c0V2ZW50VHlwZS5USUNLRVQ6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLFJlZEV2ZW50VHlwZS5CdG5fQWN0aXZpdHkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=