"use strict";
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