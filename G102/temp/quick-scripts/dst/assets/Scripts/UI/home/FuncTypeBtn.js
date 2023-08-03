
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
var PayFirstChargeUi_1 = require("../../Payment/PayFirstChargeUi");
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
var MainUi_1 = require("./MainUi");
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
            if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.FirstPayGetState, 0) == 1) {
                return false;
            }
            else {
                return isShow;
            }
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
        if (!FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlock(this.func_type)) {
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
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.主页首充礼包点击次数);
                    UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.FirstCharge, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                            uiNode.getComponent(PayFirstChargeUi_1.default).init({
                                onClose: function () {
                                    var mainUi = cc.find("Canvas/main_ui").getComponent(MainUi_1.default);
                                    mainUi.refreshLeft();
                                }
                            });
                        }, });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXEZ1bmNUeXBlQnRuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlGQUFvRjtBQUNwRiw2Q0FBMkM7QUFDM0Msc0RBQWlEO0FBQ2pELGlEQUE0QztBQUM1Qyx3RUFBOEU7QUFDOUUseURBQStEO0FBQy9ELHVFQUFrRTtBQUNsRSxtRUFBOEQ7QUFDOUQsMkVBQXFFO0FBQ3JFLHVFQUFrRTtBQUNsRSxtRUFBOEQ7QUFDOUQsdURBQXNEO0FBQ3RELDZEQUF3RDtBQUN4RCw2REFBb0U7QUFDcEUsNkRBQXlEO0FBQ3pELCtEQUFpRTtBQUNqRSxxREFBZ0Q7QUFFaEQsdURBQWtEO0FBQ2xELHVEQUFrRDtBQUNsRCx3REFBbUQ7QUFDbkQsa0RBQTZDO0FBQzdDLHdDQUFtRDtBQUNuRCwwQ0FBeUM7QUFDekMsaUNBQTRCO0FBQzVCLDJDQUFzQztBQUN0QyxtQ0FBOEI7QUFDOUIsbUNBQThCO0FBQzlCLDZDQUF3QztBQUdsQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF5QywrQkFBWTtJQUFyRDtRQUFBLHFFQXVPQztRQXBPRyxlQUFTLEdBQVUsb0JBQVEsQ0FBQyxVQUFVLENBQUM7UUFFdkMsZUFBUyxHQUFXLElBQUksQ0FBQztRQUNqQix1QkFBaUIsR0FBaUIsZ0NBQVksQ0FBQyxFQUFFLENBQUM7O0lBaU85RCxDQUFDO0lBL05hLDRCQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixHQUFDLHlCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELDZCQUFPLEdBQVA7UUFDSSxJQUFJLE1BQU0sR0FBQyw4Q0FBeUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9FLFNBQVM7UUFDVixJQUFHLElBQUksQ0FBQyxTQUFTLElBQUksb0JBQVEsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxvQkFBUSxDQUFDLFVBQVUsRUFBQztZQUM1RSxJQUFJLGNBQWMsR0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQy9ELElBQUksWUFBWSxHQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBQyxNQUFNLENBQUEsQ0FBQyxDQUFBLGNBQWMsQ0FBQSxDQUFDLENBQUEsWUFBWSxDQUFDLENBQUM7WUFDcEYsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFDLE1BQU0sQ0FBQSxDQUFDLENBQUEsY0FBYyxDQUFBLENBQUMsQ0FBQSxZQUFZLENBQUMsQ0FBQztZQUN6RyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBLENBQUMsQ0FBQSxLQUFLLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQztTQUMvRDthQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxvQkFBUSxDQUFDLFdBQVcsRUFBQztZQUMvQyxnR0FBZ0c7WUFDaEcsb0NBQW9DO1lBQ3BDLHVCQUF1QjtZQUN2QixRQUFRO1lBQ1IsK0ZBQStGO1lBQy9GLG1DQUFtQztZQUNuQyx1QkFBdUI7WUFDdkIsUUFBUTtZQUNKLElBQUksa0NBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLDBCQUFVLENBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDO2dCQUM5RSxPQUFPLEtBQUssQ0FBQzthQUNoQjtpQkFBSTtnQkFDRCxPQUFPLE1BQU0sQ0FBQzthQUNqQjtTQUNKO2FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLG9CQUFRLENBQUMsbUJBQW1CLElBQUUsSUFBSSxDQUFDLFNBQVMsSUFBRSxvQkFBUSxDQUFDLFFBQVEsRUFBQztZQUNwRixPQUFPLE1BQU0sQ0FBQztTQUNqQjthQUFJO1lBQ0QsSUFBSSxjQUFjLEdBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMvRCxJQUFJLFlBQVksR0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDbEUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUMsTUFBTSxDQUFBLENBQUMsQ0FBQSxjQUFjLENBQUEsQ0FBQyxDQUFBLFlBQVksQ0FBQyxDQUFDO1NBQ3ZGO1FBQ0QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCw4QkFBUSxHQUFSO1FBQ0ksSUFBSSxJQUFJLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsSUFBRyxJQUFJLEVBQUM7WUFDSixJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUMseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsOENBQXlCLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBO1NBQ3JKO1FBQ0QsSUFBRyxJQUFJLENBQUMsU0FBUyxFQUFDO1lBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBQyx5QkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyw4Q0FBeUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7U0FDL0o7SUFDTCxDQUFDO0lBRUQsNkJBQU8sR0FBUDtRQUNJLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLElBQUcsQ0FBQyw4Q0FBeUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFDO1lBQ3BFLElBQUksSUFBSSxHQUFDLDhDQUF5QixDQUFDLFdBQVcsRUFBRSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUN2RixJQUFJLEdBQUcsR0FBQyw4Q0FBeUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDNUYsSUFBRyxJQUFJLElBQUUsQ0FBQyxFQUFDO2dCQUNQLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLHlCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxHQUFDLEdBQUcsR0FBQyxHQUFHLENBQUMsQ0FBQzthQUN2RztpQkFBSyxJQUFHLElBQUksSUFBRSxDQUFDLEVBQUM7Z0JBQ2IsSUFBSSxPQUFPLEdBQUMseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2pFLElBQUksSUFBSSxHQUFDLGtDQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7Z0JBQzlELElBQUksR0FBRyxHQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFDLEVBQUUsR0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDcEMscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDOUM7WUFDRCxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVELDRCQUFNLEdBQU47UUFDSSxJQUFJLEVBQUUsR0FBQyxxQkFBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQy9CLFFBQU8sSUFBSSxDQUFDLFNBQVMsRUFDckI7WUFDSSxLQUFLLG9CQUFRLENBQUMsVUFBVTtnQkFBQztvQkFDckIsc0JBQXNCO29CQUN0QixFQUFFLENBQUMsWUFBWSxDQUFDLGlCQUFNLENBQUMsR0FBRyxFQUFDLHVCQUFZLENBQUMsR0FBRyxFQUFDLEVBQUMsV0FBVyxFQUFDLFVBQUMsTUFBTTs0QkFDNUQsTUFBTSxDQUFDLFlBQVksQ0FBQyxlQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQzFDLENBQUMsR0FBRSxDQUFDLENBQUM7b0JBQ0wsT0FBTztpQkFDVjtnQkFBQSxDQUFDO1lBRUYsS0FBSyxvQkFBUSxDQUFDLFVBQVU7Z0JBQUM7b0JBQ3JCLEVBQUUsQ0FBQyxZQUFZLENBQUMsaUJBQU0sQ0FBQyxJQUFJLEVBQUMsdUJBQVksQ0FBQyxHQUFHLEVBQUMsRUFBQyxXQUFXLEVBQUMsVUFBQyxNQUFNOzRCQUM3RCwyQ0FBMkM7d0JBQy9DLENBQUMsR0FBRSxDQUFDLENBQUM7b0JBQ0wsb0VBQW9FO29CQUNwRSx1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyw2QkFBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUNuRTtnQkFBQyxNQUFNO1lBQ1IsS0FBSyxvQkFBUSxDQUFDLE9BQU87Z0JBQUM7b0JBQ2xCLElBQUcsa0NBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLDBCQUFVLENBQUMsMkJBQTJCLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDO3dCQUN4RixxQkFBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxpQkFBTSxDQUFDLE1BQU0sRUFBQyx1QkFBWSxDQUFDLEdBQUcsRUFBQyxFQUFDLFdBQVcsRUFBQyxVQUFDLE1BQU07Z0NBQ3BGLE1BQU0sQ0FBQyxZQUFZLENBQUMsZ0JBQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDM0MsQ0FBQyxHQUFFLENBQUMsQ0FBQztxQkFDUjt5QkFBSTt3QkFDRCxxQkFBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxpQkFBTSxDQUFDLFdBQVcsRUFBQyx1QkFBWSxDQUFDLEdBQUcsRUFBQyxFQUFDLFdBQVcsRUFBQyxVQUFDLE1BQU07Z0NBQ3pGLE1BQU0sQ0FBQyxZQUFZLENBQUMscUJBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDaEQsQ0FBQyxHQUFFLENBQUMsQ0FBQztxQkFDUjtvQkFDRCx1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyw2QkFBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUNwRTtnQkFBQyxNQUFNO1lBRVIsS0FBSyxvQkFBUSxDQUFDLEtBQUs7Z0JBQUM7b0JBQ2hCLHFCQUFxQjtpQkFDeEI7Z0JBQUMsTUFBTTtZQUNSLEtBQUssb0JBQVEsQ0FBQyxLQUFLO2dCQUFDO29CQUNoQix5QkFBeUI7aUJBQzVCO2dCQUFDLE1BQU07WUFDUixLQUFLLG9CQUFRLENBQUMsUUFBUTtnQkFBQztvQkFDbkIsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsNkJBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDNUQseUJBQXlCO2lCQUM1QjtnQkFBQyxNQUFNO1lBQ1IsS0FBSyxvQkFBUSxDQUFDLFNBQVM7Z0JBQUM7b0JBQ3BCLDhCQUE4QjtpQkFDakM7Z0JBQUMsTUFBTTtZQUNSLEtBQUssb0JBQVEsQ0FBQyxTQUFTO2dCQUFDO29CQUNwQixrQ0FBa0M7b0JBQ2xDLGtGQUFrRjtvQkFDbEYsT0FBTztvQkFDUCxFQUFFLENBQUMsWUFBWSxDQUFDLGlCQUFNLENBQUMsT0FBTyxFQUFDLHVCQUFZLENBQUMsR0FBRyxFQUFDLEVBQUMsV0FBVyxFQUFDLFVBQUMsTUFBTTs0QkFDaEUsTUFBTSxDQUFDLFlBQVksQ0FBQyxtQkFBUyxDQUFDLENBQUMsSUFBSSxDQUFDO2dDQUNoQyxPQUFPLEVBQUU7b0NBQ0wsOEVBQThFO2dDQUNsRixDQUFDOzZCQUNKLENBQUMsQ0FBQzt3QkFDUCxDQUFDLEdBQUUsQ0FBQyxDQUFDO2lCQUNSO2dCQUFDLE1BQU07WUFDUixLQUFLLG9CQUFRLENBQUMsUUFBUTtnQkFBQztvQkFDbkIsa0NBQWtDO29CQUNsQyxrRkFBa0Y7b0JBQ2xGLE9BQU87b0JBQ1AsRUFBRSxDQUFDLFlBQVksQ0FBQyxpQkFBTSxDQUFDLE9BQU8sRUFBQyx1QkFBWSxDQUFDLEdBQUcsRUFBQyxFQUFDLFdBQVcsRUFBQyxVQUFDLE1BQU07NEJBQ2hFLE1BQU0sQ0FBQyxZQUFZLENBQUMsbUJBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBQztvQ0FDekMsOEVBQThFO2dDQUNsRixDQUFDLEVBQUMsQ0FBQyxDQUFBO3dCQUNQLENBQUMsR0FBRSxDQUFDLENBQUE7aUJBQ1A7Z0JBQUMsTUFBTTtZQUNSLEtBQUssb0JBQVEsQ0FBQyxTQUFTO2dCQUFDO29CQUNwQixtQ0FBbUM7b0JBQ25DLGtGQUFrRjtvQkFDbEYsT0FBTztvQkFDUCxFQUFFLENBQUMsWUFBWSxDQUFDLGlCQUFNLENBQUMsSUFBSSxFQUFDLHVCQUFZLENBQUMsR0FBRyxFQUFDLEVBQUMsV0FBVyxFQUFDLFVBQUMsTUFBTTs0QkFDN0QsTUFBTSxDQUFDLFlBQVksQ0FBQyxvQkFBVSxDQUFDLENBQUMsSUFBSSxDQUFDO2dDQUNqQyxPQUFPLEVBQUU7b0NBQ0wsOEVBQThFO2dDQUNsRixDQUFDOzZCQUNKLENBQUMsQ0FBQzt3QkFDUCxDQUFDLEdBQUUsQ0FBQyxDQUFDO2lCQUNSO2dCQUFDLE1BQU07WUFDUixLQUFLLG9CQUFRLENBQUMsVUFBVTtnQkFBQztvQkFDckIseUNBQXlDO29CQUN6QyxrRkFBa0Y7b0JBQ2xGLE9BQU87b0JBQ1AscUJBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsaUJBQU0sQ0FBQyxjQUFjLEVBQUMsdUJBQVksQ0FBQyxHQUFHLEVBQUMsRUFBQyxXQUFXLEVBQUMsVUFBQyxNQUFNOzRCQUM1RixNQUFNLENBQUMsWUFBWSxDQUFDLGlCQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUM7b0NBQ3ZDLDhFQUE4RTtnQ0FDbEYsQ0FBQyxFQUFDLENBQUMsQ0FBQzt3QkFDUixDQUFDLEdBQUUsQ0FBQyxDQUFDO2lCQUNSO2dCQUFDLE1BQU07WUFDUixLQUFLLG9CQUFRLENBQUMsTUFBTTtnQkFBQztvQkFDakIsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsNkJBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDaEUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3hCO2dCQUFDLE1BQU07WUFDUixLQUFLLG9CQUFRLENBQUMsV0FBVztnQkFBQztvQkFDdEIsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsNkJBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDaEUscUJBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsaUJBQU0sQ0FBQyxXQUFXLEVBQUMsdUJBQVksQ0FBQyxHQUFHLEVBQUMsRUFBQyxXQUFXLEVBQUMsVUFBQyxNQUFNOzRCQUN6RixNQUFNLENBQUMsWUFBWSxDQUFDLDBCQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDO2dDQUN2QyxPQUFPLEVBQUM7b0NBQ0osSUFBSSxNQUFNLEdBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFlBQVksQ0FBQyxnQkFBTSxDQUFDLENBQUM7b0NBQzFELE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQ0FDekIsQ0FBQzs2QkFDSixDQUFDLENBQUM7d0JBQ1AsQ0FBQyxHQUFFLENBQUMsQ0FBQztpQkFDUjtnQkFBQSxNQUFNO1lBQ1AsS0FBSyxvQkFBUSxDQUFDLFFBQVE7Z0JBQUM7b0JBQ25CLHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLDZCQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzdELEVBQUUsQ0FBQyxZQUFZLENBQUMsaUJBQU0sQ0FBQyxTQUFTLEVBQUMsdUJBQVksQ0FBQyxHQUFHLEVBQUMsRUFBQyxXQUFXLEVBQUMsVUFBQyxNQUFNOzRCQUNsRSxNQUFNLENBQUMsWUFBWSxDQUFDLG1CQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTt3QkFDM0MsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFBLElBQUk7aUJBQ1o7Z0JBQUEsTUFBTTtZQUNQLEtBQUssb0JBQVEsQ0FBQyxHQUFHO2dCQUFDO29CQUNkLHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLDZCQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzVELHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLDZCQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQzlELEVBQUUsQ0FBQyxZQUFZLENBQUMsaUJBQU0sQ0FBQyxTQUFTLEVBQUMsdUJBQVksQ0FBQyxHQUFHLEVBQUMsRUFBQyxXQUFXLEVBQUMsVUFBQyxNQUFNOzRCQUNsRSxNQUFNLENBQUMsWUFBWSxDQUFDLG1CQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTt3QkFDM0MsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFBLGFBQWE7aUJBQ3JCO2dCQUFBLE1BQU07WUFDUCxLQUFLLG9CQUFRLENBQUMsV0FBVztnQkFBQztvQkFDdEIsbUJBQW1CO29CQUNuQix1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyw2QkFBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUM5RCx1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyw2QkFBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUVqRSxFQUFFLENBQUMsWUFBWSxDQUFDLGlCQUFNLENBQUMsV0FBVyxFQUFDLHVCQUFZLENBQUMsR0FBRyxFQUFDLEVBQUMsV0FBVyxFQUFDLFVBQUMsTUFBTTs0QkFDcEUsTUFBTSxDQUFDLFlBQVksQ0FBQyxxQkFBVyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO3dCQUM5QyxDQUFDLEdBQUUsQ0FBQyxDQUFDLENBQUEsS0FBSztpQkFDYjtnQkFBQyxNQUFNO1lBQ1IsS0FBSyxvQkFBUSxDQUFDLG1CQUFtQjtnQkFBQztvQkFDOUIsSUFBSTtvQkFDSixFQUFFLENBQUMsWUFBWSxDQUFDLGlCQUFNLENBQUMsbUJBQW1CLEVBQUMsdUJBQVksQ0FBQyxHQUFHLEVBQUM7d0JBQ3hELFdBQVcsRUFBQyxVQUFDLE1BQU07NEJBQ2YsTUFBTSxDQUFDLFlBQVksQ0FBQywrQkFBcUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDMUQsQ0FBQztxQkFDSixDQUFDLENBQUE7aUJBQ0w7Z0JBQUMsTUFBTTtZQUNSLEtBQUssb0JBQVEsQ0FBQyxRQUFRO2dCQUFDO29CQUNuQixJQUFJO29CQUNKLHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLDZCQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQy9ELEVBQUUsQ0FBQyxZQUFZLENBQUMsaUJBQU0sQ0FBQyxRQUFRLEVBQUMsdUJBQVksQ0FBQyxHQUFHLEVBQUM7d0JBQzdDLFdBQVcsRUFBQyxVQUFDLE1BQU07NEJBQ2YsTUFBTSxDQUFDLFlBQVksQ0FBQyxvQkFBVSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7d0JBQ2hELENBQUM7cUJBQ0osQ0FBQyxDQUFBO2lCQUNMO2dCQUFDLE1BQU07U0FDWDtRQUNELHVCQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFUyw0QkFBTSxHQUFoQixVQUFpQixFQUFVO1FBQ3ZCLElBQUcsSUFBSSxDQUFDLGlCQUFpQixJQUFFLHlCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsRUFBQztZQUMxRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLGlCQUFpQixHQUFDLHlCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUM3RTtJQUNMLENBQUM7SUFsT0Q7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBUSxDQUFDLEVBQUMsQ0FBQztrREFDSTtJQUV2QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tEQUNPO0lBTFIsV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQXVPL0I7SUFBRCxrQkFBQztDQXZPRCxBQXVPQyxDQXZPd0MsRUFBRSxDQUFDLFNBQVMsR0F1T3BEO2tCQXZPb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBY2N1bXVsYXRlZFJlY2hhcmdlVWkgZnJvbSBcIi4uLy4uL0FjY3VtdWxhdGVkUmVjaGFyZ2UvQWNjdW11bGF0ZWRSZWNoYXJnZVVpXCI7XHJcbmltcG9ydCB7IEZ1bmNUeXBlIH0gZnJvbSBcIi4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgTWVyZ2VVaSBmcm9tIFwiLi4vLi4vRXF1aXBtZW50L1VpL01lcmdlVWlcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0pzb25EYXRhL0Z1bmN0aW9uRGVmaW5pdGlvblwiO1xyXG5pbXBvcnQgeyBNaXNzaW9uTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0xldmVsL01pc3Npb25MZXZlbFwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IExhbmd1YWdlVHlwZSB9IGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCBQYXlGaXJzdENoYXJnZVVpIGZyb20gXCIuLi8uLi9QYXltZW50L1BheUZpcnN0Q2hhcmdlVWlcIjtcclxuaW1wb3J0IHsgUGF5TWFuYWdlciB9IGZyb20gXCIuLi8uLi9QYXltZW50L1BheU1hbmFnZXJcIjtcclxuaW1wb3J0IFJhbmtpbmdMaXN0IGZyb20gXCIuLi8uLi9SYW5raW5nTGlzdC9SYW5raW5nTGlzdFwiO1xyXG5pbXBvcnQgeyBNdXNpY0luZGV4LCBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2VLZXkgfSBmcm9tIFwiLi4vLi4vU3RvcmFnZS9TdG9yYWdlQ29uZmlnXCI7XHJcbmltcG9ydCB7IFRoZVN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1N0b3JhZ2UvU3RvcmFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IFRha2VFZ2dVaSBmcm9tIFwiLi4vLi4vVGFrZUVnZy9UYWtlRWdnVWlcIjtcclxuaW1wb3J0IFRhc2tVaSBmcm9tIFwiLi4vLi4vVGFzay9UYXNrVWlcIjtcclxuaW1wb3J0IFR1cm10YWJsZSBmcm9tIFwiLi4vLi4vVHVybnRhYmxlL1R1cm10YWJsZVwiO1xyXG5pbXBvcnQgVmlwU3lzdGVtIGZyb20gXCIuLi8uLi9WaXBTeXN0ZW0vVmlwU3lzdGVtXCI7XHJcbmltcG9ydCBXZWVrQ2FyZFVpIGZyb20gXCIuLi8uLi9XZWVrQ2FyZC9XZWVrQ2FyZFVpXCI7XHJcbmltcG9ydCBXaXNoaW5nVWkgZnJvbSBcIi4uLy4uL1dpc2gvV2lzaGluZ1VpXCI7XHJcbmltcG9ydCB7IFVJTGF5ZXJMZXZlbCwgVUlQYXRoIH0gZnJvbSBcIi4uL1VJQ29uZmlnXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IEJhZ1VpIGZyb20gXCIuL0JhZ1VpXCI7XHJcbmltcG9ydCBHb2xkTWFsbFVpIGZyb20gXCIuL0dvbGRNYWxsVWlcIjtcclxuaW1wb3J0IE1haW5VaSBmcm9tIFwiLi9NYWluVWlcIjtcclxuaW1wb3J0IFNpZ25VaSBmcm9tIFwiLi9TaWduVWlcIjtcclxuaW1wb3J0IFNpZ25VaURhaWx5IGZyb20gXCIuL1NpZ25VaURhaWx5XCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGdW5jVHlwZUJ0biBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkVudW0oRnVuY1R5cGUpfSlcclxuICAgIGZ1bmNfdHlwZTpGdW5jVHlwZT1GdW5jVHlwZS5MaUNoZW5nQmVpO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBuYW1lX3RleHQ6Y2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIGN1cl9sYW5ndWFnZV90eXBlOiBMYW5ndWFnZVR5cGUgPSBMYW5ndWFnZVR5cGUuZW47XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmN1cl9sYW5ndWFnZV90eXBlPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEN1ckxhbmd1YWdlVHlwZSgpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2goKTpib29sZWFue1xyXG4gICAgICAgIGxldCBpc1Nob3c9RnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrKHRoaXMuZnVuY190eXBlKTtcclxuICAgICAgICAvL+S4u+WfjueahOmineWkluWkhOeQhlxyXG4gICAgICAgaWYodGhpcy5mdW5jX3R5cGUgPj0gRnVuY1R5cGUuU2hlbmd0YW5nICYmIHRoaXMuZnVuY190eXBlIDw9IEZ1bmNUeXBlLlRpZUppYW5nUHUpe1xyXG4gICAgICAgICAgICBsZXQgbm9ybWFsTWF0ZXJpYWw9Y2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKCcyZC1zcHJpdGUnKTtcclxuICAgICAgICAgICAgbGV0IGdyYXlNYXRlcmlhbD1jYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoJzJkLWdyYXktc3ByaXRlJyk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLGlzU2hvdz9ub3JtYWxNYXRlcmlhbDpncmF5TWF0ZXJpYWwpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLGlzU2hvdz9ub3JtYWxNYXRlcmlhbDpncmF5TWF0ZXJpYWwpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsb2NrXCIpLmFjdGl2ZSA9IGlzU2hvdz9mYWxzZTp0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMuZnVuY190eXBlID09IEZ1bmNUeXBlLkZpcnN0Q2hhcmdlKXtcclxuICAgICAgICAvLyAgICAgaWYoTnVtYmVyKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImlzX3BheV9maXJzdF9jaGFyZ2VcIiwwKSkgIT0gMCB8fCBpc1Nob3cgPT0gZmFsc2Upe1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgaWYoTnVtYmVyKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImlzX3BheV9maXJzdF9jaGFyZ2VcIiwwKSkgPT0gMCAmJiBpc1Nob3cgPT0gdHJ1ZSl7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIGlmKCBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LkZpcnN0UGF5R2V0U3RhdGUsMCkgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzU2hvdztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMuZnVuY190eXBlPT1GdW5jVHlwZS5BY2N1bXVsYXRlZFJlY2hhcmdlfHx0aGlzLmZ1bmNfdHlwZT09RnVuY1R5cGUuV2Vla0NhcmQpe1xyXG4gICAgICAgICAgICByZXR1cm4gaXNTaG93O1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgbm9ybWFsTWF0ZXJpYWw9Y2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKCcyZC1zcHJpdGUnKTtcclxuICAgICAgICAgICAgbGV0IGdyYXlNYXRlcmlhbD1jYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoJzJkLWdyYXktc3ByaXRlJyk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLGlzU2hvdz9ub3JtYWxNYXRlcmlhbDpncmF5TWF0ZXJpYWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3dOYW1lKCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd05hbWUoKXtcclxuICAgICAgICBsZXQgbmFtZT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ25hbWUnKTtcclxuICAgICAgICBpZihuYW1lKXtcclxuICAgICAgICAgICAgbmFtZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZChGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGV4dElEKHRoaXMuZnVuY190eXBlKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5uYW1lX3RleHQpe1xyXG4gICAgICAgICAgICB0aGlzLm5hbWVfdGV4dC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZChGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGV4dElEKHRoaXMuZnVuY190eXBlKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGljaygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgaWYoIUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9jayh0aGlzLmZ1bmNfdHlwZSkpe1xyXG4gICAgICAgICAgICBsZXQgdHlwZT1GdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrQ29uZGl0aW9uVHlwZSh0aGlzLmZ1bmNfdHlwZSlcclxuICAgICAgICAgICAgbGV0IG51bT1GdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrQ29uZGljdGlvblBhcmFtZXRlcih0aGlzLmZ1bmNfdHlwZSlcclxuICAgICAgICAgICAgaWYodHlwZT09MSl7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDA1MSkrXCI6XCIrbnVtKTtcclxuICAgICAgICAgICAgfWVsc2UgaWYodHlwZT09Mil7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGV4dFN0cj1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAwNTIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG51bXM9TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExldmVsTmFtZSgobnVtKSlcclxuICAgICAgICAgICAgICAgIGxldCBzdHI9dGV4dFN0ci5yZXBsYWNlKCd+JywnJytudW1zKVxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShzdHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaG93VWkoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93VWkoKXtcclxuICAgICAgICBsZXQgdW09VUlNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgc3dpdGNoKHRoaXMuZnVuY190eXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZSBGdW5jVHlwZS5MaUNoZW5nQmVpOntcclxuICAgICAgICAgICAgICAgIC8vIHVtLnNob3dCYWdVaShudWxsKTtcclxuICAgICAgICAgICAgICAgIHVtLnNob3dVaURpYWxvZyhVSVBhdGguQmFnLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQmFnVWkpLmluaXQobnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9LH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLk1laVJpUmVuV3U6e1xyXG4gICAgICAgICAgICAgICAgdW0uc2hvd1VpRGlhbG9nKFVJUGF0aC5UYXNrLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVpTm9kZS5nZXRDb21wb25lbnQoVGFza1VpKS5pbml0KG51bGwpOyBcclxuICAgICAgICAgICAgICAgIH0sfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5q+P5pel5Lu75Yqh5oyJ6ZKu55So5oi354K55Ye75pWwKTtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7kuLvpobXngrnlh7vku7vliqHngrnlh7vmrKHmlbApO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLlFpYW5EYW86e1xyXG4gICAgICAgICAgICAgICAgaWYoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5OZXdQbGF5ZXJTYXZlbkRheVNpZ25Jbk92ZXIsMCkgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5TaWduSW4sVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoU2lnblVpKS5pbml0KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sfSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlNpZ25JbkRhaWx5LFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFNpZ25VaURhaWx5KS5pbml0KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5LiD5pel562+5Yiw5oyJ6ZKu54K55Ye755So5oi35pWwKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuRmFuTGk6e1xyXG4gICAgICAgICAgICAgICAgLy8gdW0uc2hvd1JhYmF0ZVVpKCk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuTGlCYW86e1xyXG4gICAgICAgICAgICAgICAgLy8gdW0uc2hvd0dpZnRDZW50ZXJVaSgpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLlpoYW5MaW5nOntcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7miJjku6Tngrnlh7vmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgLy8gdW0uc2hvd0JhdHRsZVBhc3NVaSgpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLlNoZW5ndGFuZzp7XHJcbiAgICAgICAgICAgICAgICAvLyB1bS5zaG93UGV0QWRkdmFuY2VVaShudWxsKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBGdW5jVHlwZS5YdVl1YW5DaGk6e1xyXG4gICAgICAgICAgICAgICAgLy8gdW0uc2hvd1dpc2hpbmdVaSh7b25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci5wbGF5TXVzaWMoTXVzaWNJbmRleC5CR01fTWFpbkNpdHkpO1xyXG4gICAgICAgICAgICAgICAgLy8gfX0pO1xyXG4gICAgICAgICAgICAgICAgdW0uc2hvd1VpRGlhbG9nKFVJUGF0aC5XaXNoaW5nLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoV2lzaGluZ1VpKS5pbml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbG9zZTogKCkgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXIucGxheU11c2ljKE11c2ljSW5kZXguQkdNX01haW5DaXR5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSx9KTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBGdW5jVHlwZS5Mb25nQ2hhbzp7XHJcbiAgICAgICAgICAgICAgICAvLyB1bS5zaG93VGFrZUVnZ1VpKHtvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tdXNpY19tYW5hZ2VyLnBsYXlNdXNpYyhNdXNpY0luZGV4LkJHTV9NYWluQ2l0eSk7XHJcbiAgICAgICAgICAgICAgICAvLyB9fSk7XHJcbiAgICAgICAgICAgICAgICB1bS5zaG93VWlEaWFsb2coVUlQYXRoLlRha2VFZ2csVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChUYWtlRWdnVWkpLmluaXQoe29uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tdXNpY19tYW5hZ2VyLnBsYXlNdXNpYyhNdXNpY0luZGV4LkJHTV9NYWluQ2l0eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfX0pXHJcbiAgICAgICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuU2hhbmdEaWFuOntcclxuICAgICAgICAgICAgICAgIC8vIHVtLnNob3dHb2xkTWFsbFVpKHtvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tdXNpY19tYW5hZ2VyLnBsYXlNdXNpYyhNdXNpY0luZGV4LkJHTV9NYWluQ2l0eSk7XHJcbiAgICAgICAgICAgICAgICAvLyB9fSk7XHJcbiAgICAgICAgICAgICAgICB1bS5zaG93VWlEaWFsb2coVUlQYXRoLk1hbGwsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChHb2xkTWFsbFVpKS5pbml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbG9zZTogKCkgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXIucGxheU11c2ljKE11c2ljSW5kZXguQkdNX01haW5DaXR5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSx9KTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBGdW5jVHlwZS5UaWVKaWFuZ1B1OntcclxuICAgICAgICAgICAgICAgIC8vIHVtLnNob3dFcXVpcFN5bnRoZXRpY1VpKHtvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tdXNpY19tYW5hZ2VyLnBsYXlNdXNpYyhNdXNpY0luZGV4LkJHTV9NYWluQ2l0eSk7XHJcbiAgICAgICAgICAgICAgICAvLyB9fSk7XHJcbiAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkVxdWlwU3ludGhldGljLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoTWVyZ2VVaSkuaW5pdCh7b25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXIucGxheU11c2ljKE11c2ljSW5kZXguQkdNX01haW5DaXR5KTtcclxuICAgICAgICAgICAgICAgICAgICB9fSk7XHJcbiAgICAgICAgICAgICAgICB9LH0pO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLk5laUdvdTp7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5Li76aG15YWF5YC85ZWG5Z+O54K55Ye75qyh5pWwKTtcclxuICAgICAgICAgICAgICAgIHVtLnNob3dQYXlVaShudWxsLDEpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLkZpcnN0Q2hhcmdlOntcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7kuLvpobXpppblhYXnpLzljIXngrnlh7vmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5GaXJzdENoYXJnZSxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFBheUZpcnN0Q2hhcmdlVWkpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOigpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtYWluVWk9Y2MuZmluZChcIkNhbnZhcy9tYWluX3VpXCIpLmdldENvbXBvbmVudChNYWluVWkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpblVpLnJlZnJlc2hMZWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sfSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBGdW5jVHlwZS5aaHVhblBhbjp7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6L2s55uY55qE5omT5byA5qyh5pWwKTtcclxuICAgICAgICAgICAgICAgIHVtLnNob3dVaURpYWxvZyhVSVBhdGguVHVybnRhYmxlLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoVHVybXRhYmxlKS5pbml0VWkoKVxyXG4gICAgICAgICAgICAgICAgfSx9KTsvL+i9rOebmFxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuVklQOntcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7miJjku6Tngrnlh7vmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaImOS7pOaMiemSrueCueWHu+asoeaVsCk7XHJcbiAgICAgICAgICAgICAgICB1bS5zaG93VWlEaWFsb2coVUlQYXRoLlZpcFN5c3RlbSxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFZpcFN5c3RlbSkuaW5pdFVpKClcclxuICAgICAgICAgICAgICAgIH0sfSk7Ly/kvJrlkZjns7vnu58gIFZJUOezu+e7n1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuUGFpSGFuZ0Jhbmc6e1xyXG4gICAgICAgICAgICAgICAgLy8gdW0uc2hvd1JhbmtVaSgpO1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaOkuihjOamnOeCueWHu+eUqOaIt+aVsCk7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5Li76aG15o6S6KGM5qac5oyJ6ZKu54K55Ye75qyh5pWwKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdW0uc2hvd1VpRGlhbG9nKFVJUGF0aC5SYW5raW5nTGlzdCxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFJhbmtpbmdMaXN0KS5pbml0VWkoMSlcclxuICAgICAgICAgICAgICAgIH0sfSk7Ly/mjpLooYzmppxcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBGdW5jVHlwZS5BY2N1bXVsYXRlZFJlY2hhcmdlOntcclxuICAgICAgICAgICAgICAgIC8v57Sv5YWFXHJcbiAgICAgICAgICAgICAgICB1bS5zaG93VWlEaWFsb2coVUlQYXRoLkFjY3VtdWxhdGVkUmVjaGFyZ2UsVUlMYXllckxldmVsLk9uZSx7XHJcbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZWQ6KHVpTm9kZSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChBY2N1bXVsYXRlZFJlY2hhcmdlVWkpLmluaXQobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBGdW5jVHlwZS5XZWVrQ2FyZDp7XHJcbiAgICAgICAgICAgICAgICAvL+WRqOWNoVxyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLueJueadg+WNoeaMiemSrueCueWHu+asoeaVsCk7XHJcbiAgICAgICAgICAgICAgICB1bS5zaG93VWlEaWFsb2coVUlQYXRoLldlZWtDYXJkLFVJTGF5ZXJMZXZlbC5PbmUse1xyXG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGVkOih1aU5vZGUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoV2Vla0NhcmRVaSkucmVmcmVzaFVpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICBQYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRnVuY1RvZGF5U2hvdyh0aGlzLmZ1bmNfdHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZShkdDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYodGhpcy5jdXJfbGFuZ3VhZ2VfdHlwZSE9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q3VyTGFuZ3VhZ2VUeXBlKCkpe1xyXG4gICAgICAgICAgICB0aGlzLnNob3dOYW1lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX2xhbmd1YWdlX3R5cGU9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q3VyTGFuZ3VhZ2VUeXBlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuIl19