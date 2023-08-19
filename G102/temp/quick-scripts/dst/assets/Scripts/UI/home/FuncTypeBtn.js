
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/home/FuncTypeBtn.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8d555kkcShLFr92236cSATR', 'FuncTypeBtn');
// Scripts/UI/home/FuncTypeBtn.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var WXManagerEX_1 = require("../../../startscene/WXManagerEX");
var AccumulatedRechargeUi_1 = require("../../AccumulatedRecharge/AccumulatedRechargeUi");
var Constants_1 = require("../../Constants");
var MergeUi_1 = require("../../Equipment/Ui/MergeUi");
var GameManager_1 = require("../../GameManager");
var FunctionDefinition_1 = require("../../JsonData/FunctionDefinition");
var MissionLevel_1 = require("../../Level/MissionLevel");
var FollowConstants_1 = require("../../multiLanguage/FollowConstants");
var FollowManager_1 = require("../../multiLanguage/FollowManager");
var LanguageConstants_1 = require("../../multiLanguage/LanguageConstants");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var PayManager_1 = require("../../Payment/PayManager");
var RankingList_1 = require("../../RankingList/RankingList");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var StorageConfig_1 = require("../../Storage/StorageConfig");
var StorageManager_1 = require("../../Storage/StorageManager");
var TakeEggUi_1 = require("../../TakeEgg/TakeEggUi");
var Turmtable_1 = require("../../Turntable/Turmtable");
var VipSystem_1 = require("../../VipSystem/VipSystem");
var WeekCardUi_1 = require("../../WeekCard/WeekCardUi");
var WishingUi_1 = require("../../Wish/WishingUi");
var UIConfig_1 = require("../UIConfig");
var UIManager_1 = require("../UIManager");
var BagUi_1 = require("./BagUi");
var GoldMallUi_1 = require("./GoldMallUi");
var SignUi_1 = require("./SignUi");
var SignUiDaily_1 = require("./SignUiDaily");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FuncTypeBtn = /** @class */ (function (_super) {
    __extends(FuncTypeBtn, _super);
    function FuncTypeBtn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.func_type = Constants_1.FuncType.LiChengBei;
        _this.name_text = null;
        _this.cur_language_type = LanguageConstants_1.LanguageType.en;
        return _this;
    }
    FuncTypeBtn.prototype.onLoad = function () {
        this.cur_language_type = LanguageManager_1.default.getInstance().getCurLanguageType();
        this.refresh();
    };
    FuncTypeBtn.prototype.refresh = function () {
        var isShow = FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlock(this.func_type);
        //主城的额外处理
        if (this.func_type >= Constants_1.FuncType.Shengtang && this.func_type <= Constants_1.FuncType.TieJiangPu) {
            var normalMaterial = cc.Material.getBuiltinMaterial('2d-sprite');
            var grayMaterial = cc.Material.getBuiltinMaterial('2d-gray-sprite');
            this.node.getComponent(cc.Sprite).setMaterial(0, isShow ? normalMaterial : grayMaterial);
            this.node.getChildByName("bg").getComponent(cc.Sprite).setMaterial(0, isShow ? normalMaterial : grayMaterial);
            this.node.getChildByName("lock").active = isShow ? false : true;
        }
        else if (this.func_type == Constants_1.FuncType.FirstCharge) {
            //     if(Number(cc.sys.localStorage.getItem("is_pay_first_charge",0)) != 0 || isShow == false){
            //         this.node.active = false;
            //         return false
            //     }
            //     if(Number(cc.sys.localStorage.getItem("is_pay_first_charge",0)) == 0 && isShow == true){
            //         this.node.active = true;
            //         return true;
            //     }
            if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.SharDimo, 0) == 0) {
                return true;
            }
            else {
                return false;
            }
            // if( TheStorageManager.getInstance().getNumber(StorageKey.FirstPayGetState,0) == 1){
            //     return false;
            // }else{
            //     return isShow;
            // }
        }
        else if (this.func_type == Constants_1.FuncType.AccumulatedRecharge || this.func_type == Constants_1.FuncType.WeekCard) {
            return isShow;
        }
        else {
            var normalMaterial = cc.Material.getBuiltinMaterial('2d-sprite');
            var grayMaterial = cc.Material.getBuiltinMaterial('2d-gray-sprite');
            this.node.getComponent(cc.Sprite).setMaterial(0, isShow ? normalMaterial : grayMaterial);
        }
        this.showName();
        return true;
    };
    FuncTypeBtn.prototype.showName = function () {
        var name = this.node.getChildByName('name');
        if (name) {
            name.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(FunctionDefinition_1.FunctionDefinitionManager.getInstance().getTextID(this.func_type));
        }
        if (this.name_text) {
            this.name_text.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(FunctionDefinition_1.FunctionDefinitionManager.getInstance().getTextID(this.func_type));
        }
    };
    FuncTypeBtn.prototype.onClick = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (!FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlock(this.func_type) && this.func_type != 26) {
            var type = FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockConditionType(this.func_type);
            var num = FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(this.func_type);
            if (type == 1) {
                GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100051) + ":" + num);
            }
            else if (type == 2) {
                var textStr = LanguageManager_1.default.getInstance().getStrByTextId(100052);
                var nums = MissionLevel_1.MissionLevelManager.getInstance().getLevelName((num));
                var str = textStr.replace('~', '' + nums);
                GameManager_1.default.getInstance().showMessage(str);
            }
            return;
        }
        this.showUi();
    };
    FuncTypeBtn.prototype.showUi = function () {
        var um = UIManager_1.UIManager.getInstance();
        switch (this.func_type) {
            case Constants_1.FuncType.LiChengBei:
                {
                    // um.showBagUi(null);
                    um.showUiDialog(UIConfig_1.UIPath.Bag, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                            uiNode.getComponent(BagUi_1.default).init(null);
                        }, });
                    return;
                }
                ;
            case Constants_1.FuncType.MeiRiRenWu:
                {
                    um.showUiDialog(UIConfig_1.UIPath.Task, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                            // uiNode.getComponent(TaskUi).init(null); 
                        }, });
                    // FollowManager.getInstance().followEvent(Follow_Type.每日任务按钮用户点击数);
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.主页点击任务点击次数);
                }
                break;
            case Constants_1.FuncType.QianDao:
                {
                    if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.NewPlayerSavenDaySignInOver, 0) == 0) {
                        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.SignIn, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                                uiNode.getComponent(SignUi_1.default).init(null);
                            }, });
                    }
                    else {
                        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.SignInDaily, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                                uiNode.getComponent(SignUiDaily_1.default).init(null);
                            }, });
                    }
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.七日签到按钮点击用户数);
                }
                break;
            case Constants_1.FuncType.FanLi:
                {
                    // um.showRabateUi();
                }
                break;
            case Constants_1.FuncType.LiBao:
                {
                    // um.showGiftCenterUi();
                }
                break;
            case Constants_1.FuncType.ZhanLing:
                {
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.战令点击次数);
                    // um.showBattlePassUi();
                }
                break;
            case Constants_1.FuncType.Shengtang:
                {
                    // um.showPetAddvanceUi(null);
                }
                break;
            case Constants_1.FuncType.XuYuanChi:
                {
                    // um.showWishingUi({onClose:()=>{
                    //     GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_MainCity);
                    // }});
                    um.showUiDialog(UIConfig_1.UIPath.Wishing, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                            uiNode.getComponent(WishingUi_1.default).init({
                                onClose: function () {
                                    // GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_MainCity);
                                }
                            });
                        }, });
                }
                break;
            case Constants_1.FuncType.LongChao:
                {
                    // um.showTakeEggUi({onClose:()=>{
                    //     GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_MainCity);
                    // }});
                    um.showUiDialog(UIConfig_1.UIPath.TakeEgg, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                            uiNode.getComponent(TakeEggUi_1.default).init({ onClose: function () {
                                    // GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_MainCity);
                                } });
                        }, });
                }
                break;
            case Constants_1.FuncType.ShangDian:
                {
                    // um.showGoldMallUi({onClose:()=>{
                    //     GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_MainCity);
                    // }});
                    um.showUiDialog(UIConfig_1.UIPath.Mall, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                            uiNode.getComponent(GoldMallUi_1.default).init({
                                onClose: function () {
                                    // GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_MainCity);
                                }
                            });
                        }, });
                }
                break;
            case Constants_1.FuncType.TieJiangPu:
                {
                    // um.showEquipSyntheticUi({onClose:()=>{
                    //     GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_MainCity);
                    // }});
                    UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.EquipSynthetic, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                            uiNode.getComponent(MergeUi_1.default).init({ onClose: function () {
                                    // GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_MainCity);
                                } });
                        }, });
                }
                break;
            case Constants_1.FuncType.NeiGou:
                {
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.主页充值商城点击次数);
                    um.showPayUi(null, 1);
                }
                break;
            case Constants_1.FuncType.FirstCharge:
                {
                    WXManagerEX_1.default.getInstance().shareAppMessage();
                    WXManagerEX_1.default.getInstance().sharFlag = true;
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.SharDimo, 1);
                    if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                        this.scheduleOnce(function () {
                            cc.director.emit("OnSharBack");
                        }, 2);
                    }
                    else {
                        this.scheduleOnce(function () {
                            cc.director.emit("OnSharBack");
                        }, 2);
                    }
                    // FollowManager.getInstance().followEvent(Follow_Type.主页首充礼包点击次数);
                    // UIManager.getInstance().showUiDialog(UIPath.FirstCharge,UILayerLevel.One,{onCompleted:(uiNode)=> {
                    //     uiNode.getComponent(PayFirstChargeUi).init({
                    //         onClose:() => {
                    //             let mainUi=cc.find("Canvas/main_ui").getComponent(MainUi);
                    //             mainUi.refreshLeft();
                    //         }
                    //     });
                    // },});
                }
                break;
            case Constants_1.FuncType.ZhuanPan:
                {
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.转盘的打开次数);
                    um.showUiDialog(UIConfig_1.UIPath.Turntable, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                            uiNode.getComponent(Turmtable_1.default).initUi();
                        }, }); //转盘
                }
                break;
            case Constants_1.FuncType.VIP:
                {
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.战令点击次数);
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.战令按钮点击次数);
                    um.showUiDialog(UIConfig_1.UIPath.VipSystem, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                            uiNode.getComponent(VipSystem_1.default).initUi();
                        }, }); //会员系统  VIP系统
                }
                break;
            case Constants_1.FuncType.PaiHangBang:
                {
                    // um.showRankUi();
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.排行榜点击用户数);
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.主页排行榜按钮点击次数);
                    um.showUiDialog(UIConfig_1.UIPath.RankingList, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                            uiNode.getComponent(RankingList_1.default).initUi(1);
                        }, }); //排行榜
                }
                break;
            case Constants_1.FuncType.AccumulatedRecharge:
                {
                    //累充
                    um.showUiDialog(UIConfig_1.UIPath.AccumulatedRecharge, UIConfig_1.UILayerLevel.One, {
                        onCompleted: function (uiNode) {
                            uiNode.getComponent(AccumulatedRechargeUi_1.default).init(null);
                        }
                    });
                }
                break;
            case Constants_1.FuncType.WeekCard:
                {
                    //周卡
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.特权卡按钮点击次数);
                    um.showUiDialog(UIConfig_1.UIPath.WeekCard, UIConfig_1.UILayerLevel.One, {
                        onCompleted: function (uiNode) {
                            uiNode.getComponent(WeekCardUi_1.default).refreshUi();
                        }
                    });
                }
                break;
        }
        PayManager_1.PayManager.getInstance().addFuncTodayShow(this.func_type);
    };
    FuncTypeBtn.prototype.update = function (dt) {
        if (this.cur_language_type != LanguageManager_1.default.getInstance().getCurLanguageType()) {
            this.showName();
            this.cur_language_type = LanguageManager_1.default.getInstance().getCurLanguageType();
        }
    };
    __decorate([
        property({ type: cc.Enum(Constants_1.FuncType) })
    ], FuncTypeBtn.prototype, "func_type", void 0);
    __decorate([
        property(cc.Node)
    ], FuncTypeBtn.prototype, "name_text", void 0);
    FuncTypeBtn = __decorate([
        ccclass
    ], FuncTypeBtn);
    return FuncTypeBtn;
}(cc.Component));
exports.default = FuncTypeBtn;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXEZ1bmNUeXBlQnRuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtEQUEwRDtBQUMxRCx5RkFBb0Y7QUFDcEYsNkNBQTJDO0FBQzNDLHNEQUFpRDtBQUNqRCxpREFBNEM7QUFDNUMsd0VBQThFO0FBQzlFLHlEQUErRDtBQUMvRCx1RUFBa0U7QUFDbEUsbUVBQThEO0FBQzlELDJFQUFxRTtBQUNyRSx1RUFBa0U7QUFFbEUsdURBQXNEO0FBQ3RELDZEQUF3RDtBQUN4RCw2REFBb0U7QUFDcEUsNkRBQXlEO0FBQ3pELCtEQUFpRTtBQUNqRSxxREFBZ0Q7QUFFaEQsdURBQWtEO0FBQ2xELHVEQUFrRDtBQUNsRCx3REFBbUQ7QUFDbkQsa0RBQTZDO0FBQzdDLHdDQUFtRDtBQUNuRCwwQ0FBeUM7QUFDekMsaUNBQTRCO0FBQzVCLDJDQUFzQztBQUV0QyxtQ0FBOEI7QUFDOUIsNkNBQXdDO0FBR2xDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXlDLCtCQUFZO0lBQXJEO1FBQUEscUVBNlBDO1FBMVBHLGVBQVMsR0FBVSxvQkFBUSxDQUFDLFVBQVUsQ0FBQztRQUV2QyxlQUFTLEdBQVcsSUFBSSxDQUFDO1FBQ2pCLHVCQUFpQixHQUFpQixnQ0FBWSxDQUFDLEVBQUUsQ0FBQzs7SUF1UDlELENBQUM7SUFyUGEsNEJBQU0sR0FBaEI7UUFDSSxJQUFJLENBQUMsaUJBQWlCLEdBQUMseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsNkJBQU8sR0FBUDtRQUNJLElBQUksTUFBTSxHQUFDLDhDQUF5QixDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FB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QkFBTSxDQUFDLFFBQVEsRUFBQyx1QkFBWSxDQUFDLEdBQUcsRUFBQzt3QkFDN0MsV0FBVyxFQUFDLFVBQUMsTUFBTTs0QkFDZixNQUFNLENBQUMsWUFBWSxDQUFDLG9CQUFVLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQzt3QkFDaEQsQ0FBQztxQkFDSixDQUFDLENBQUE7aUJBQ0w7Z0JBQUMsTUFBTTtTQUNYO1FBQ0QsdUJBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVTLDRCQUFNLEdBQWhCLFVBQWlCLEVBQVU7UUFDdkIsSUFBRyxJQUFJLENBQUMsaUJBQWlCLElBQUUseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxFQUFDO1lBQzFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQixJQUFJLENBQUMsaUJBQWlCLEdBQUMseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzdFO0lBQ0wsQ0FBQztJQXhQRDtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFRLENBQUMsRUFBQyxDQUFDO2tEQUNJO0lBRXZDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ087SUFMUixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBNlAvQjtJQUFELGtCQUFDO0NBN1BELEFBNlBDLENBN1B3QyxFQUFFLENBQUMsU0FBUyxHQTZQcEQ7a0JBN1BvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdYTWFuYWdlckVYIGZyb20gXCIuLi8uLi8uLi9zdGFydHNjZW5lL1dYTWFuYWdlckVYXCI7XHJcbmltcG9ydCBBY2N1bXVsYXRlZFJlY2hhcmdlVWkgZnJvbSBcIi4uLy4uL0FjY3VtdWxhdGVkUmVjaGFyZ2UvQWNjdW11bGF0ZWRSZWNoYXJnZVVpXCI7XHJcbmltcG9ydCB7IEZ1bmNUeXBlIH0gZnJvbSBcIi4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgTWVyZ2VVaSBmcm9tIFwiLi4vLi4vRXF1aXBtZW50L1VpL01lcmdlVWlcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0pzb25EYXRhL0Z1bmN0aW9uRGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBNaXNzaW9uTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0xldmVsL01pc3Npb25MZXZlbFwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IExhbmd1YWdlVHlwZSB9IGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCBQYXlGaXJzdENoYXJnZVVpIGZyb20gXCIuLi8uLi9QYXltZW50L1BheUZpcnN0Q2hhcmdlVWlcIjtcclxuaW1wb3J0IHsgUGF5TWFuYWdlciB9IGZyb20gXCIuLi8uLi9QYXltZW50L1BheU1hbmFnZXJcIjtcclxuaW1wb3J0IFJhbmtpbmdMaXN0IGZyb20gXCIuLi8uLi9SYW5raW5nTGlzdC9SYW5raW5nTGlzdFwiO1xyXG5pbXBvcnQgeyBNdXNpY0luZGV4LCBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2VLZXkgfSBmcm9tIFwiLi4vLi4vU3RvcmFnZS9TdG9yYWdlQ29uZmlnXCI7XHJcbmltcG9ydCB7IFRoZVN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1N0b3JhZ2UvU3RvcmFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IFRha2VFZ2dVaSBmcm9tIFwiLi4vLi4vVGFrZUVnZy9UYWtlRWdnVWlcIjtcclxuaW1wb3J0IFRhc2tVaSBmcm9tIFwiLi4vLi4vVGFzay9UYXNrVWlcIjtcclxuaW1wb3J0IFR1cm10YWJsZSBmcm9tIFwiLi4vLi4vVHVybnRhYmxlL1R1cm10YWJsZVwiO1xyXG5pbXBvcnQgVmlwU3lzdGVtIGZyb20gXCIuLi8uLi9WaXBTeXN0ZW0vVmlwU3lzdGVtXCI7XHJcbmltcG9ydCBXZWVrQ2FyZFVpIGZyb20gXCIuLi8uLi9XZWVrQ2FyZC9XZWVrQ2FyZFVpXCI7XHJcbmltcG9ydCBXaXNoaW5nVWkgZnJvbSBcIi4uLy4uL1dpc2gvV2lzaGluZ1VpXCI7XHJcbmltcG9ydCB7IFVJTGF5ZXJMZXZlbCwgVUlQYXRoIH0gZnJvbSBcIi4uL1VJQ29uZmlnXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IEJhZ1VpIGZyb20gXCIuL0JhZ1VpXCI7XHJcbmltcG9ydCBHb2xkTWFsbFVpIGZyb20gXCIuL0dvbGRNYWxsVWlcIjtcclxuaW1wb3J0IE1haW5VaSBmcm9tIFwiLi9NYWluVWlcIjtcclxuaW1wb3J0IFNpZ25VaSBmcm9tIFwiLi9TaWduVWlcIjtcclxuaW1wb3J0IFNpZ25VaURhaWx5IGZyb20gXCIuL1NpZ25VaURhaWx5XCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGdW5jVHlwZUJ0biBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkVudW0oRnVuY1R5cGUpfSlcclxuICAgIGZ1bmNfdHlwZTpGdW5jVHlwZT1GdW5jVHlwZS5MaUNoZW5nQmVpO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBuYW1lX3RleHQ6Y2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIGN1cl9sYW5ndWFnZV90eXBlOiBMYW5ndWFnZVR5cGUgPSBMYW5ndWFnZVR5cGUuZW47XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmN1cl9sYW5ndWFnZV90eXBlPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEN1ckxhbmd1YWdlVHlwZSgpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2goKTpib29sZWFue1xyXG4gICAgICAgIGxldCBpc1Nob3c9RnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrKHRoaXMuZnVuY190eXBlKTtcclxuICAgICAgICAvL+S4u+WfjueahOmineWkluWkhOeQhlxyXG4gICAgICAgaWYodGhpcy5mdW5jX3R5cGUgPj0gRnVuY1R5cGUuU2hlbmd0YW5nICYmIHRoaXMuZnVuY190eXBlIDw9IEZ1bmNUeXBlLlRpZUppYW5nUHUpe1xyXG4gICAgICAgICAgICBsZXQgbm9ybWFsTWF0ZXJpYWw9Y2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKCcyZC1zcHJpdGUnKTtcclxuICAgICAgICAgICAgbGV0IGdyYXlNYXRlcmlhbD1jYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoJzJkLWdyYXktc3ByaXRlJyk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLGlzU2hvdz9ub3JtYWxNYXRlcmlhbDpncmF5TWF0ZXJpYWwpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLGlzU2hvdz9ub3JtYWxNYXRlcmlhbDpncmF5TWF0ZXJpYWwpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsb2NrXCIpLmFjdGl2ZSA9IGlzU2hvdz9mYWxzZTp0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMuZnVuY190eXBlID09IEZ1bmNUeXBlLkZpcnN0Q2hhcmdlKXtcclxuICAgICAgICAvLyAgICAgaWYoTnVtYmVyKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImlzX3BheV9maXJzdF9jaGFyZ2VcIiwwKSkgIT0gMCB8fCBpc1Nob3cgPT0gZmFsc2Upe1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgaWYoTnVtYmVyKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImlzX3BheV9maXJzdF9jaGFyZ2VcIiwwKSkgPT0gMCAmJiBpc1Nob3cgPT0gdHJ1ZSl7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIGlmKFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuU2hhckRpbW8sMCk9PTApe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGlmKCBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkZpcnN0UGF5R2V0U3RhdGUsMCkgPT0gMSl7XHJcbiAgICAgICAgICAgIC8vICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIGlzU2hvdztcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMuZnVuY190eXBlPT1GdW5jVHlwZS5BY2N1bXVsYXRlZFJlY2hhcmdlfHx0aGlzLmZ1bmNfdHlwZT09RnVuY1R5cGUuV2Vla0NhcmQpe1xyXG4gICAgICAgICAgICByZXR1cm4gaXNTaG93O1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgbm9ybWFsTWF0ZXJpYWw9Y2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKCcyZC1zcHJpdGUnKTtcclxuICAgICAgICAgICAgbGV0IGdyYXlNYXRlcmlhbD1jYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoJzJkLWdyYXktc3ByaXRlJyk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLGlzU2hvdz9ub3JtYWxNYXRlcmlhbDpncmF5TWF0ZXJpYWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3dOYW1lKCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd05hbWUoKXtcclxuICAgICAgICBsZXQgbmFtZT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ25hbWUnKTtcclxuICAgICAgICBpZihuYW1lKXtcclxuICAgICAgICAgICAgbmFtZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZChGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGV4dElEKHRoaXMuZnVuY190eXBlKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5uYW1lX3RleHQpe1xyXG4gICAgICAgICAgICB0aGlzLm5hbWVfdGV4dC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZChGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGV4dElEKHRoaXMuZnVuY190eXBlKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGljaygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgaWYoIUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9jayh0aGlzLmZ1bmNfdHlwZSkmJnRoaXMuZnVuY190eXBlIT0yNil7XHJcbiAgICAgICAgICAgIGxldCB0eXBlPUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tDb25kaXRpb25UeXBlKHRoaXMuZnVuY190eXBlKVxyXG4gICAgICAgICAgICBsZXQgbnVtPUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tDb25kaWN0aW9uUGFyYW1ldGVyKHRoaXMuZnVuY190eXBlKVxyXG4gICAgICAgICAgICBpZih0eXBlPT0xKXtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDUxKStcIjpcIitudW0pO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZih0eXBlPT0yKXtcclxuICAgICAgICAgICAgICAgIGxldCB0ZXh0U3RyPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDA1Mik7XHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtcz1NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TGV2ZWxOYW1lKChudW0pKVxyXG4gICAgICAgICAgICAgICAgbGV0IHN0cj10ZXh0U3RyLnJlcGxhY2UoJ34nLCcnK251bXMpXHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKHN0cik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3dVaSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dVaSgpe1xyXG4gICAgICAgIGxldCB1bT1VSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBzd2l0Y2godGhpcy5mdW5jX3R5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLkxpQ2hlbmdCZWk6e1xyXG4gICAgICAgICAgICAgICAgLy8gdW0uc2hvd0JhZ1VpKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgdW0uc2hvd1VpRGlhbG9nKFVJUGF0aC5CYWcsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChCYWdVaSkuaW5pdChudWxsKTtcclxuICAgICAgICAgICAgICAgIH0sfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuTWVpUmlSZW5XdTp7XHJcbiAgICAgICAgICAgICAgICB1bS5zaG93VWlEaWFsb2coVUlQYXRoLlRhc2ssVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdWlOb2RlLmdldENvbXBvbmVudChUYXNrVWkpLmluaXQobnVsbCk7IFxyXG4gICAgICAgICAgICAgICAgfSx9KTtcclxuICAgICAgICAgICAgICAgIC8vIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7mr4/ml6Xku7vliqHmjInpkq7nlKjmiLfngrnlh7vmlbApO1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuS4u+mhteeCueWHu+S7u+WKoeeCueWHu+asoeaVsCk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuUWlhbkRhbzp7XHJcbiAgICAgICAgICAgICAgICBpZihUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5Lk5ld1BsYXllclNhdmVuRGF5U2lnbkluT3ZlciwwKSA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlNpZ25JbixVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChTaWduVWkpLmluaXQobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSx9KTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguU2lnbkluRGFpbHksVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoU2lnblVpRGFpbHkpLmluaXQobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSx9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7kuIPml6Xnrb7liLDmjInpkq7ngrnlh7vnlKjmiLfmlbApO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBGdW5jVHlwZS5GYW5MaTp7XHJcbiAgICAgICAgICAgICAgICAvLyB1bS5zaG93UmFiYXRlVWkoKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBGdW5jVHlwZS5MaUJhbzp7XHJcbiAgICAgICAgICAgICAgICAvLyB1bS5zaG93R2lmdENlbnRlclVpKCk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuWmhhbkxpbmc6e1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaImOS7pOeCueWHu+asoeaVsCk7XHJcbiAgICAgICAgICAgICAgICAvLyB1bS5zaG93QmF0dGxlUGFzc1VpKCk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuU2hlbmd0YW5nOntcclxuICAgICAgICAgICAgICAgIC8vIHVtLnNob3dQZXRBZGR2YW5jZVVpKG51bGwpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLlh1WXVhbkNoaTp7XHJcbiAgICAgICAgICAgICAgICAvLyB1bS5zaG93V2lzaGluZ1VpKHtvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tdXNpY19tYW5hZ2VyLnBsYXlNdXNpYyhNdXNpY0luZGV4LkJHTV9NYWluQ2l0eSk7XHJcbiAgICAgICAgICAgICAgICAvLyB9fSk7XHJcbiAgICAgICAgICAgICAgICB1bS5zaG93VWlEaWFsb2coVUlQYXRoLldpc2hpbmcsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChXaXNoaW5nVWkpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOiAoKSA9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci5wbGF5TXVzaWMoTXVzaWNJbmRleC5CR01fTWFpbkNpdHkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LH0pO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLkxvbmdDaGFvOntcclxuICAgICAgICAgICAgICAgIC8vIHVtLnNob3dUYWtlRWdnVWkoe29uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgIC8vICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXIucGxheU11c2ljKE11c2ljSW5kZXguQkdNX01haW5DaXR5KTtcclxuICAgICAgICAgICAgICAgIC8vIH19KTtcclxuICAgICAgICAgICAgICAgIHVtLnNob3dVaURpYWxvZyhVSVBhdGguVGFrZUVnZyxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFRha2VFZ2dVaSkuaW5pdCh7b25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXIucGxheU11c2ljKE11c2ljSW5kZXguQkdNX01haW5DaXR5KTtcclxuICAgICAgICAgICAgICAgICAgICB9fSlcclxuICAgICAgICAgICAgICAgIH0sfSlcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBGdW5jVHlwZS5TaGFuZ0RpYW46e1xyXG4gICAgICAgICAgICAgICAgLy8gdW0uc2hvd0dvbGRNYWxsVWkoe29uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgIC8vICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXIucGxheU11c2ljKE11c2ljSW5kZXguQkdNX01haW5DaXR5KTtcclxuICAgICAgICAgICAgICAgIC8vIH19KTtcclxuICAgICAgICAgICAgICAgIHVtLnNob3dVaURpYWxvZyhVSVBhdGguTWFsbCxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEdvbGRNYWxsVWkpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOiAoKSA9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci5wbGF5TXVzaWMoTXVzaWNJbmRleC5CR01fTWFpbkNpdHkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LH0pO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLlRpZUppYW5nUHU6e1xyXG4gICAgICAgICAgICAgICAgLy8gdW0uc2hvd0VxdWlwU3ludGhldGljVWkoe29uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgIC8vICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXIucGxheU11c2ljKE11c2ljSW5kZXguQkdNX01haW5DaXR5KTtcclxuICAgICAgICAgICAgICAgIC8vIH19KTtcclxuICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguRXF1aXBTeW50aGV0aWMsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChNZXJnZVVpKS5pbml0KHtvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci5wbGF5TXVzaWMoTXVzaWNJbmRleC5CR01fTWFpbkNpdHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH19KTtcclxuICAgICAgICAgICAgICAgIH0sfSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuTmVpR291OntcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7kuLvpobXlhYXlgLzllYbln47ngrnlh7vmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgdW0uc2hvd1BheVVpKG51bGwsMSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuRmlyc3RDaGFyZ2U6e1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5zaGFyZUFwcE1lc3NhZ2UoKTtcclxuICAgICAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkuc2hhckZsYWc9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlNoYXJEaW1vLDEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLldFQ0hBVF9HQU1FKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IuZW1pdChcIk9uU2hhckJhY2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwyKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmVtaXQoXCJPblNoYXJCYWNrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sMik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5Li76aG16aaW5YWF56S85YyF54K55Ye75qyh5pWwKTtcclxuICAgICAgICAgICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguRmlyc3RDaGFyZ2UsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdWlOb2RlLmdldENvbXBvbmVudChQYXlGaXJzdENoYXJnZVVpKS5pbml0KHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgb25DbG9zZTooKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBsZXQgbWFpblVpPWNjLmZpbmQoXCJDYW52YXMvbWFpbl91aVwiKS5nZXRDb21wb25lbnQoTWFpblVpKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIG1haW5VaS5yZWZyZXNoTGVmdCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyB9LH0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuWmh1YW5QYW46e1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLui9rOebmOeahOaJk+W8gOasoeaVsCk7XHJcbiAgICAgICAgICAgICAgICB1bS5zaG93VWlEaWFsb2coVUlQYXRoLlR1cm50YWJsZSxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFR1cm10YWJsZSkuaW5pdFVpKClcclxuICAgICAgICAgICAgICAgIH0sfSk7Ly/ovaznm5hcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLlZJUDp7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5oiY5Luk54K55Ye75qyh5pWwKTtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7miJjku6TmjInpkq7ngrnlh7vmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgdW0uc2hvd1VpRGlhbG9nKFVJUGF0aC5WaXBTeXN0ZW0sVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChWaXBTeXN0ZW0pLmluaXRVaSgpXHJcbiAgICAgICAgICAgICAgICB9LH0pOy8v5Lya5ZGY57O757ufICBWSVDns7vnu59cclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLlBhaUhhbmdCYW5nOntcclxuICAgICAgICAgICAgICAgIC8vIHVtLnNob3dSYW5rVWkoKTtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7mjpLooYzmppzngrnlh7vnlKjmiLfmlbApO1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuS4u+mhteaOkuihjOamnOaMiemSrueCueWHu+asoeaVsCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHVtLnNob3dVaURpYWxvZyhVSVBhdGguUmFua2luZ0xpc3QsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChSYW5raW5nTGlzdCkuaW5pdFVpKDEpXHJcbiAgICAgICAgICAgICAgICB9LH0pOy8v5o6S6KGM5qacXHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuQWNjdW11bGF0ZWRSZWNoYXJnZTp7XHJcbiAgICAgICAgICAgICAgICAvL+e0r+WFhVxyXG4gICAgICAgICAgICAgICAgdW0uc2hvd1VpRGlhbG9nKFVJUGF0aC5BY2N1bXVsYXRlZFJlY2hhcmdlLFVJTGF5ZXJMZXZlbC5PbmUse1xyXG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGVkOih1aU5vZGUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQWNjdW11bGF0ZWRSZWNoYXJnZVVpKS5pbml0KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuV2Vla0NhcmQ6e1xyXG4gICAgICAgICAgICAgICAgLy/lkajljaFcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7nibnmnYPljaHmjInpkq7ngrnlh7vmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgdW0uc2hvd1VpRGlhbG9nKFVJUGF0aC5XZWVrQ2FyZCxVSUxheWVyTGV2ZWwuT25lLHtcclxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlZDoodWlOb2RlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFdlZWtDYXJkVWkpLnJlZnJlc2hVaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgUGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEZ1bmNUb2RheVNob3codGhpcy5mdW5jX3R5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCB1cGRhdGUoZHQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmKHRoaXMuY3VyX2xhbmd1YWdlX3R5cGUhPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEN1ckxhbmd1YWdlVHlwZSgpKXtcclxuICAgICAgICAgICAgdGhpcy5zaG93TmFtZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cl9sYW5ndWFnZV90eXBlPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEN1ckxhbmd1YWdlVHlwZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG59XHJcbiJdfQ==