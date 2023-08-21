
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
            return false;
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
                    if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXEZ1bmNUeXBlQnRuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtEQUEwRDtBQUMxRCx5RkFBb0Y7QUFDcEYsNkNBQTJDO0FBQzNDLHNEQUFpRDtBQUNqRCxpREFBNEM7QUFDNUMsd0VBQThFO0FBQzlFLHlEQUErRDtBQUMvRCx1RUFBa0U7QUFDbEUsbUVBQThEO0FBQzlELDJFQUFxRTtBQUNyRSx1RUFBa0U7QUFFbEUsdURBQXNEO0FBQ3RELDZEQUF3RDtBQUN4RCw2REFBb0U7QUFDcEUsNkRBQXlEO0FBQ3pELCtEQUFpRTtBQUNqRSxxREFBZ0Q7QUFFaEQsdURBQWtEO0FBQ2xELHVEQUFrRDtBQUNsRCx3REFBbUQ7QUFDbkQsa0RBQTZDO0FBQzdDLHdDQUFtRDtBQUNuRCwwQ0FBeUM7QUFDekMsaUNBQTRCO0FBQzVCLDJDQUFzQztBQUV0QyxtQ0FBOEI7QUFDOUIsNkNBQXdDO0FBR2xDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXlDLCtCQUFZO0lBQXJEO1FBQUEscUVBOFBDO1FBM1BHLGVBQVMsR0FBVSxvQkFBUSxDQUFDLFVBQVUsQ0FBQztRQUV2QyxlQUFTLEdBQVcsSUFBSSxDQUFDO1FBQ2pCLHVCQUFpQixHQUFpQixnQ0FBWSxDQUFDLEVBQUUsQ0FBQzs7SUF3UDlELENBQUM7SUF0UGEsNEJBQU0sR0FBaEI7UUFDSSxJQUFJLENBQUMsaUJBQWlCLEdBQUMseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsNkJBQU8sR0FBUDtRQUNJLElBQUksTUFBTSxHQUFDLDhDQUF5QixDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FB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QUFFLENBQUMsWUFBWSxDQUFDLGlCQUFNLENBQUMsUUFBUSxFQUFDLHVCQUFZLENBQUMsR0FBRyxFQUFDO3dCQUM3QyxXQUFXLEVBQUMsVUFBQyxNQUFNOzRCQUNmLE1BQU0sQ0FBQyxZQUFZLENBQUMsb0JBQVUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO3dCQUNoRCxDQUFDO3FCQUNKLENBQUMsQ0FBQTtpQkFDTDtnQkFBQyxNQUFNO1NBQ1g7UUFDRCx1QkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRVMsNEJBQU0sR0FBaEIsVUFBaUIsRUFBVTtRQUN2QixJQUFHLElBQUksQ0FBQyxpQkFBaUIsSUFBRSx5QkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLGtCQUFrQixFQUFFLEVBQUM7WUFDMUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxpQkFBaUIsR0FBQyx5QkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDN0U7SUFDTCxDQUFDO0lBelBEO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQVEsQ0FBQyxFQUFDLENBQUM7a0RBQ0k7SUFFdkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztrREFDTztJQUxSLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0E4UC9CO0lBQUQsa0JBQUM7Q0E5UEQsQUE4UEMsQ0E5UHdDLEVBQUUsQ0FBQyxTQUFTLEdBOFBwRDtrQkE5UG9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV1hNYW5hZ2VyRVggZnJvbSBcIi4uLy4uLy4uL3N0YXJ0c2NlbmUvV1hNYW5hZ2VyRVhcIjtcclxuaW1wb3J0IEFjY3VtdWxhdGVkUmVjaGFyZ2VVaSBmcm9tIFwiLi4vLi4vQWNjdW11bGF0ZWRSZWNoYXJnZS9BY2N1bXVsYXRlZFJlY2hhcmdlVWlcIjtcclxuaW1wb3J0IHsgRnVuY1R5cGUgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBNZXJnZVVpIGZyb20gXCIuLi8uLi9FcXVpcG1lbnQvVWkvTWVyZ2VVaVwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vSnNvbkRhdGEvRnVuY3Rpb25EZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IE1pc3Npb25MZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTGV2ZWwvTWlzc2lvbkxldmVsXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd01hbmFnZXJcIjtcclxuaW1wb3J0IHsgTGFuZ3VhZ2VUeXBlIH0gZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VDb25zdGFudHNcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IFBheUZpcnN0Q2hhcmdlVWkgZnJvbSBcIi4uLy4uL1BheW1lbnQvUGF5Rmlyc3RDaGFyZ2VVaVwiO1xyXG5pbXBvcnQgeyBQYXlNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1BheW1lbnQvUGF5TWFuYWdlclwiO1xyXG5pbXBvcnQgUmFua2luZ0xpc3QgZnJvbSBcIi4uLy4uL1JhbmtpbmdMaXN0L1JhbmtpbmdMaXN0XCI7XHJcbmltcG9ydCB7IE11c2ljSW5kZXgsIFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuLi8uLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgVGFrZUVnZ1VpIGZyb20gXCIuLi8uLi9UYWtlRWdnL1Rha2VFZ2dVaVwiO1xyXG5pbXBvcnQgVGFza1VpIGZyb20gXCIuLi8uLi9UYXNrL1Rhc2tVaVwiO1xyXG5pbXBvcnQgVHVybXRhYmxlIGZyb20gXCIuLi8uLi9UdXJudGFibGUvVHVybXRhYmxlXCI7XHJcbmltcG9ydCBWaXBTeXN0ZW0gZnJvbSBcIi4uLy4uL1ZpcFN5c3RlbS9WaXBTeXN0ZW1cIjtcclxuaW1wb3J0IFdlZWtDYXJkVWkgZnJvbSBcIi4uLy4uL1dlZWtDYXJkL1dlZWtDYXJkVWlcIjtcclxuaW1wb3J0IFdpc2hpbmdVaSBmcm9tIFwiLi4vLi4vV2lzaC9XaXNoaW5nVWlcIjtcclxuaW1wb3J0IHsgVUlMYXllckxldmVsLCBVSVBhdGggfSBmcm9tIFwiLi4vVUlDb25maWdcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4uL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgQmFnVWkgZnJvbSBcIi4vQmFnVWlcIjtcclxuaW1wb3J0IEdvbGRNYWxsVWkgZnJvbSBcIi4vR29sZE1hbGxVaVwiO1xyXG5pbXBvcnQgTWFpblVpIGZyb20gXCIuL01haW5VaVwiO1xyXG5pbXBvcnQgU2lnblVpIGZyb20gXCIuL1NpZ25VaVwiO1xyXG5pbXBvcnQgU2lnblVpRGFpbHkgZnJvbSBcIi4vU2lnblVpRGFpbHlcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZ1bmNUeXBlQnRuIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuRW51bShGdW5jVHlwZSl9KVxyXG4gICAgZnVuY190eXBlOkZ1bmNUeXBlPUZ1bmNUeXBlLkxpQ2hlbmdCZWk7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIG5hbWVfdGV4dDpjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgY3VyX2xhbmd1YWdlX3R5cGU6IExhbmd1YWdlVHlwZSA9IExhbmd1YWdlVHlwZS5lbjtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3VyX2xhbmd1YWdlX3R5cGU9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q3VyTGFuZ3VhZ2VUeXBlKCk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaCgpOmJvb2xlYW57XHJcbiAgICAgICAgbGV0IGlzU2hvdz1GdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2sodGhpcy5mdW5jX3R5cGUpO1xyXG4gICAgICAgIC8v5Li75Z+O55qE6aKd5aSW5aSE55CGXHJcbiAgICAgICBpZih0aGlzLmZ1bmNfdHlwZSA+PSBGdW5jVHlwZS5TaGVuZ3RhbmcgJiYgdGhpcy5mdW5jX3R5cGUgPD0gRnVuY1R5cGUuVGllSmlhbmdQdSl7XHJcbiAgICAgICAgICAgIGxldCBub3JtYWxNYXRlcmlhbD1jYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoJzJkLXNwcml0ZScpO1xyXG4gICAgICAgICAgICBsZXQgZ3JheU1hdGVyaWFsPWNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbCgnMmQtZ3JheS1zcHJpdGUnKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsaXNTaG93P25vcm1hbE1hdGVyaWFsOmdyYXlNYXRlcmlhbCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsaXNTaG93P25vcm1hbE1hdGVyaWFsOmdyYXlNYXRlcmlhbCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImxvY2tcIikuYWN0aXZlID0gaXNTaG93P2ZhbHNlOnRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5mdW5jX3R5cGUgPT0gRnVuY1R5cGUuRmlyc3RDaGFyZ2Upe1xyXG4gICAgICAgIC8vICAgICBpZihOdW1iZXIoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaXNfcGF5X2ZpcnN0X2NoYXJnZVwiLDApKSAhPSAwIHx8IGlzU2hvdyA9PSBmYWxzZSl7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBpZihOdW1iZXIoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaXNfcGF5X2ZpcnN0X2NoYXJnZVwiLDApKSA9PSAwICYmIGlzU2hvdyA9PSB0cnVlKXtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBpZihUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlNoYXJEaW1vLDApPT0wKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBpZiggVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5GaXJzdFBheUdldFN0YXRlLDApID09IDEpe1xyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gICAgIHJldHVybiBpc1Nob3c7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLmZ1bmNfdHlwZT09RnVuY1R5cGUuQWNjdW11bGF0ZWRSZWNoYXJnZXx8dGhpcy5mdW5jX3R5cGU9PUZ1bmNUeXBlLldlZWtDYXJkKXtcclxuICAgICAgICAgICAgcmV0dXJuIGlzU2hvdztcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IG5vcm1hbE1hdGVyaWFsPWNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbCgnMmQtc3ByaXRlJyk7XHJcbiAgICAgICAgICAgIGxldCBncmF5TWF0ZXJpYWw9Y2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKCcyZC1ncmF5LXNwcml0ZScpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCxpc1Nob3c/bm9ybWFsTWF0ZXJpYWw6Z3JheU1hdGVyaWFsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaG93TmFtZSgpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dOYW1lKCl7XHJcbiAgICAgICAgbGV0IG5hbWU9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCduYW1lJyk7XHJcbiAgICAgICAgaWYobmFtZSl7XHJcbiAgICAgICAgICAgIG5hbWUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRleHRJRCh0aGlzLmZ1bmNfdHlwZSkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMubmFtZV90ZXh0KXtcclxuICAgICAgICAgICAgdGhpcy5uYW1lX3RleHQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRleHRJRCh0aGlzLmZ1bmNfdHlwZSkpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2soKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGlmKCFGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2sodGhpcy5mdW5jX3R5cGUpJiZ0aGlzLmZ1bmNfdHlwZSE9MjYpe1xyXG4gICAgICAgICAgICBsZXQgdHlwZT1GdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrQ29uZGl0aW9uVHlwZSh0aGlzLmZ1bmNfdHlwZSlcclxuICAgICAgICAgICAgbGV0IG51bT1GdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrQ29uZGljdGlvblBhcmFtZXRlcih0aGlzLmZ1bmNfdHlwZSlcclxuICAgICAgICAgICAgaWYodHlwZT09MSl7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDA1MSkrXCI6XCIrbnVtKTtcclxuICAgICAgICAgICAgfWVsc2UgaWYodHlwZT09Mil7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGV4dFN0cj1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAwNTIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG51bXM9TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExldmVsTmFtZSgobnVtKSlcclxuICAgICAgICAgICAgICAgIGxldCBzdHI9dGV4dFN0ci5yZXBsYWNlKCd+JywnJytudW1zKVxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShzdHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaG93VWkoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93VWkoKXtcclxuICAgICAgICBsZXQgdW09VUlNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgc3dpdGNoKHRoaXMuZnVuY190eXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZSBGdW5jVHlwZS5MaUNoZW5nQmVpOntcclxuICAgICAgICAgICAgICAgIC8vIHVtLnNob3dCYWdVaShudWxsKTtcclxuICAgICAgICAgICAgICAgIHVtLnNob3dVaURpYWxvZyhVSVBhdGguQmFnLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQmFnVWkpLmluaXQobnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9LH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLk1laVJpUmVuV3U6e1xyXG4gICAgICAgICAgICAgICAgdW0uc2hvd1VpRGlhbG9nKFVJUGF0aC5UYXNrLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVpTm9kZS5nZXRDb21wb25lbnQoVGFza1VpKS5pbml0KG51bGwpOyBcclxuICAgICAgICAgICAgICAgIH0sfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5q+P5pel5Lu75Yqh5oyJ6ZKu55So5oi354K55Ye75pWwKTtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7kuLvpobXngrnlh7vku7vliqHngrnlh7vmrKHmlbApO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLlFpYW5EYW86e1xyXG4gICAgICAgICAgICAgICAgaWYoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5OZXdQbGF5ZXJTYXZlbkRheVNpZ25Jbk92ZXIsMCkgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5TaWduSW4sVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoU2lnblVpKS5pbml0KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sfSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlNpZ25JbkRhaWx5LFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFNpZ25VaURhaWx5KS5pbml0KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5LiD5pel562+5Yiw5oyJ6ZKu54K55Ye755So5oi35pWwKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuRmFuTGk6e1xyXG4gICAgICAgICAgICAgICAgLy8gdW0uc2hvd1JhYmF0ZVVpKCk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuTGlCYW86e1xyXG4gICAgICAgICAgICAgICAgLy8gdW0uc2hvd0dpZnRDZW50ZXJVaSgpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLlpoYW5MaW5nOntcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7miJjku6Tngrnlh7vmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgLy8gdW0uc2hvd0JhdHRsZVBhc3NVaSgpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLlNoZW5ndGFuZzp7XHJcbiAgICAgICAgICAgICAgICAvLyB1bS5zaG93UGV0QWRkdmFuY2VVaShudWxsKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBGdW5jVHlwZS5YdVl1YW5DaGk6e1xyXG4gICAgICAgICAgICAgICAgLy8gdW0uc2hvd1dpc2hpbmdVaSh7b25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci5wbGF5TXVzaWMoTXVzaWNJbmRleC5CR01fTWFpbkNpdHkpO1xyXG4gICAgICAgICAgICAgICAgLy8gfX0pO1xyXG4gICAgICAgICAgICAgICAgdW0uc2hvd1VpRGlhbG9nKFVJUGF0aC5XaXNoaW5nLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoV2lzaGluZ1VpKS5pbml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbG9zZTogKCkgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXIucGxheU11c2ljKE11c2ljSW5kZXguQkdNX01haW5DaXR5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSx9KTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBGdW5jVHlwZS5Mb25nQ2hhbzp7XHJcbiAgICAgICAgICAgICAgICAvLyB1bS5zaG93VGFrZUVnZ1VpKHtvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tdXNpY19tYW5hZ2VyLnBsYXlNdXNpYyhNdXNpY0luZGV4LkJHTV9NYWluQ2l0eSk7XHJcbiAgICAgICAgICAgICAgICAvLyB9fSk7XHJcbiAgICAgICAgICAgICAgICB1bS5zaG93VWlEaWFsb2coVUlQYXRoLlRha2VFZ2csVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChUYWtlRWdnVWkpLmluaXQoe29uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tdXNpY19tYW5hZ2VyLnBsYXlNdXNpYyhNdXNpY0luZGV4LkJHTV9NYWluQ2l0eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfX0pXHJcbiAgICAgICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuU2hhbmdEaWFuOntcclxuICAgICAgICAgICAgICAgIC8vIHVtLnNob3dHb2xkTWFsbFVpKHtvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tdXNpY19tYW5hZ2VyLnBsYXlNdXNpYyhNdXNpY0luZGV4LkJHTV9NYWluQ2l0eSk7XHJcbiAgICAgICAgICAgICAgICAvLyB9fSk7XHJcbiAgICAgICAgICAgICAgICB1bS5zaG93VWlEaWFsb2coVUlQYXRoLk1hbGwsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChHb2xkTWFsbFVpKS5pbml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbG9zZTogKCkgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXIucGxheU11c2ljKE11c2ljSW5kZXguQkdNX01haW5DaXR5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSx9KTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBGdW5jVHlwZS5UaWVKaWFuZ1B1OntcclxuICAgICAgICAgICAgICAgIC8vIHVtLnNob3dFcXVpcFN5bnRoZXRpY1VpKHtvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tdXNpY19tYW5hZ2VyLnBsYXlNdXNpYyhNdXNpY0luZGV4LkJHTV9NYWluQ2l0eSk7XHJcbiAgICAgICAgICAgICAgICAvLyB9fSk7XHJcbiAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkVxdWlwU3ludGhldGljLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoTWVyZ2VVaSkuaW5pdCh7b25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXIucGxheU11c2ljKE11c2ljSW5kZXguQkdNX01haW5DaXR5KTtcclxuICAgICAgICAgICAgICAgICAgICB9fSk7XHJcbiAgICAgICAgICAgICAgICB9LH0pO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLk5laUdvdTp7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5Li76aG15YWF5YC85ZWG5Z+O54K55Ye75qyh5pWwKTtcclxuICAgICAgICAgICAgICAgIHVtLnNob3dQYXlVaShudWxsLDEpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLkZpcnN0Q2hhcmdlOntcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkuc2hhcmVBcHBNZXNzYWdlKCk7XHJcbiAgICAgICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnNoYXJGbGFnPXRydWU7XHJcbiAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5TaGFyRGltbywxKTtcclxuICAgICAgICAgICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5CWVRFREFOQ0VfR0FNRSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmVtaXQoXCJPblNoYXJCYWNrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sMik7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5lbWl0KFwiT25TaGFyQmFja1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB9LDIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuS4u+mhtemmluWFheekvOWMheeCueWHu+asoeaVsCk7XHJcbiAgICAgICAgICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkZpcnN0Q2hhcmdlLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHVpTm9kZS5nZXRDb21wb25lbnQoUGF5Rmlyc3RDaGFyZ2VVaSkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIG9uQ2xvc2U6KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgbGV0IG1haW5VaT1jYy5maW5kKFwiQ2FudmFzL21haW5fdWlcIikuZ2V0Q29tcG9uZW50KE1haW5VaSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBtYWluVWkucmVmcmVzaExlZnQoKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gfSx9KTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLlpodWFuUGFuOntcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ovaznm5jnmoTmiZPlvIDmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgdW0uc2hvd1VpRGlhbG9nKFVJUGF0aC5UdXJudGFibGUsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChUdXJtdGFibGUpLmluaXRVaSgpXHJcbiAgICAgICAgICAgICAgICB9LH0pOy8v6L2s55uYXHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBGdW5jVHlwZS5WSVA6e1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaImOS7pOeCueWHu+asoeaVsCk7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5oiY5Luk5oyJ6ZKu54K55Ye75qyh5pWwKTtcclxuICAgICAgICAgICAgICAgIHVtLnNob3dVaURpYWxvZyhVSVBhdGguVmlwU3lzdGVtLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoVmlwU3lzdGVtKS5pbml0VWkoKVxyXG4gICAgICAgICAgICAgICAgfSx9KTsvL+S8muWRmOezu+e7nyAgVklQ57O757ufXHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBGdW5jVHlwZS5QYWlIYW5nQmFuZzp7XHJcbiAgICAgICAgICAgICAgICAvLyB1bS5zaG93UmFua1VpKCk7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5o6S6KGM5qac54K55Ye755So5oi35pWwKTtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7kuLvpobXmjpLooYzmppzmjInpkq7ngrnlh7vmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB1bS5zaG93VWlEaWFsb2coVUlQYXRoLlJhbmtpbmdMaXN0LFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoUmFua2luZ0xpc3QpLmluaXRVaSgxKVxyXG4gICAgICAgICAgICAgICAgfSx9KTsvL+aOkuihjOamnFxyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLkFjY3VtdWxhdGVkUmVjaGFyZ2U6e1xyXG4gICAgICAgICAgICAgICAgLy/ntK/lhYVcclxuICAgICAgICAgICAgICAgIHVtLnNob3dVaURpYWxvZyhVSVBhdGguQWNjdW11bGF0ZWRSZWNoYXJnZSxVSUxheWVyTGV2ZWwuT25lLHtcclxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlZDoodWlOb2RlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEFjY3VtdWxhdGVkUmVjaGFyZ2VVaSkuaW5pdChudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLldlZWtDYXJkOntcclxuICAgICAgICAgICAgICAgIC8v5ZGo5Y2hXHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu54m55p2D5Y2h5oyJ6ZKu54K55Ye75qyh5pWwKTtcclxuICAgICAgICAgICAgICAgIHVtLnNob3dVaURpYWxvZyhVSVBhdGguV2Vla0NhcmQsVUlMYXllckxldmVsLk9uZSx7XHJcbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZWQ6KHVpTm9kZSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChXZWVrQ2FyZFVpKS5yZWZyZXNoVWkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIFBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRGdW5jVG9kYXlTaG93KHRoaXMuZnVuY190eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlKGR0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZih0aGlzLmN1cl9sYW5ndWFnZV90eXBlIT1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDdXJMYW5ndWFnZVR5cGUoKSl7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd05hbWUoKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJfbGFuZ3VhZ2VfdHlwZT1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDdXJMYW5ndWFnZVR5cGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4iXX0=