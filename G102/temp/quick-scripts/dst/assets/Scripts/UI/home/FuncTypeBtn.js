
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXEZ1bmNUeXBlQnRuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlGQUFvRjtBQUNwRiw2Q0FBMkM7QUFDM0Msc0RBQWlEO0FBQ2pELGlEQUE0QztBQUM1Qyx3RUFBOEU7QUFDOUUseURBQStEO0FBQy9ELHVFQUFrRTtBQUNsRSxtRUFBOEQ7QUFDOUQsMkVBQXFFO0FBQ3JFLHVFQUFrRTtBQUNsRSxtRUFBOEQ7QUFDOUQsdURBQXNEO0FBQ3RELDZEQUF3RDtBQUN4RCw2REFBb0U7QUFDcEUsNkRBQXlEO0FBQ3pELCtEQUFpRTtBQUNqRSxxREFBZ0Q7QUFFaEQsdURBQWtEO0FBQ2xELHVEQUFrRDtBQUNsRCx3REFBbUQ7QUFDbkQsa0RBQTZDO0FBQzdDLHdDQUFtRDtBQUNuRCwwQ0FBeUM7QUFDekMsaUNBQTRCO0FBQzVCLDJDQUFzQztBQUN0QyxtQ0FBOEI7QUFDOUIsbUNBQThCO0FBQzlCLDZDQUF3QztBQUdsQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF5QywrQkFBWTtJQUFyRDtRQUFBLHFFQXFPQztRQWxPRyxlQUFTLEdBQVUsb0JBQVEsQ0FBQyxVQUFVLENBQUM7UUFFdkMsZUFBUyxHQUFXLElBQUksQ0FBQztRQUNqQix1QkFBaUIsR0FBaUIsZ0NBQVksQ0FBQyxFQUFFLENBQUM7O0lBK045RCxDQUFDO0lBN05hLDRCQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixHQUFDLHlCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELDZCQUFPLEdBQVA7UUFDSSxJQUFJLE1BQU0sR0FBQyw4Q0FBeUIsQ0FBQyxXQUFXLEVBQUUs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QUUsQ0FBQztZQUNoQixJQUFJLENBQUMsaUJBQWlCLEdBQUMseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzdFO0lBQ0wsQ0FBQztJQWhPRDtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFRLENBQUMsRUFBQyxDQUFDO2tEQUNJO0lBRXZDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ087SUFMUixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBcU8vQjtJQUFELGtCQUFDO0NBck9ELEFBcU9DLENBck93QyxFQUFFLENBQUMsU0FBUyxHQXFPcEQ7a0JBck9vQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFjY3VtdWxhdGVkUmVjaGFyZ2VVaSBmcm9tIFwiLi4vLi4vQWNjdW11bGF0ZWRSZWNoYXJnZS9BY2N1bXVsYXRlZFJlY2hhcmdlVWlcIjtcclxuaW1wb3J0IHsgRnVuY1R5cGUgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBNZXJnZVVpIGZyb20gXCIuLi8uLi9FcXVpcG1lbnQvVWkvTWVyZ2VVaVwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vSnNvbkRhdGEvRnVuY3Rpb25EZWZpbml0aW9uXCI7XHJcbmltcG9ydCB7IE1pc3Npb25MZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTGV2ZWwvTWlzc2lvbkxldmVsXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd01hbmFnZXJcIjtcclxuaW1wb3J0IHsgTGFuZ3VhZ2VUeXBlIH0gZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VDb25zdGFudHNcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IFBheUZpcnN0Q2hhcmdlVWkgZnJvbSBcIi4uLy4uL1BheW1lbnQvUGF5Rmlyc3RDaGFyZ2VVaVwiO1xyXG5pbXBvcnQgeyBQYXlNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1BheW1lbnQvUGF5TWFuYWdlclwiO1xyXG5pbXBvcnQgUmFua2luZ0xpc3QgZnJvbSBcIi4uLy4uL1JhbmtpbmdMaXN0L1JhbmtpbmdMaXN0XCI7XHJcbmltcG9ydCB7IE11c2ljSW5kZXgsIFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuLi8uLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgVGFrZUVnZ1VpIGZyb20gXCIuLi8uLi9UYWtlRWdnL1Rha2VFZ2dVaVwiO1xyXG5pbXBvcnQgVGFza1VpIGZyb20gXCIuLi8uLi9UYXNrL1Rhc2tVaVwiO1xyXG5pbXBvcnQgVHVybXRhYmxlIGZyb20gXCIuLi8uLi9UdXJudGFibGUvVHVybXRhYmxlXCI7XHJcbmltcG9ydCBWaXBTeXN0ZW0gZnJvbSBcIi4uLy4uL1ZpcFN5c3RlbS9WaXBTeXN0ZW1cIjtcclxuaW1wb3J0IFdlZWtDYXJkVWkgZnJvbSBcIi4uLy4uL1dlZWtDYXJkL1dlZWtDYXJkVWlcIjtcclxuaW1wb3J0IFdpc2hpbmdVaSBmcm9tIFwiLi4vLi4vV2lzaC9XaXNoaW5nVWlcIjtcclxuaW1wb3J0IHsgVUlMYXllckxldmVsLCBVSVBhdGggfSBmcm9tIFwiLi4vVUlDb25maWdcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4uL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgQmFnVWkgZnJvbSBcIi4vQmFnVWlcIjtcclxuaW1wb3J0IEdvbGRNYWxsVWkgZnJvbSBcIi4vR29sZE1hbGxVaVwiO1xyXG5pbXBvcnQgTWFpblVpIGZyb20gXCIuL01haW5VaVwiO1xyXG5pbXBvcnQgU2lnblVpIGZyb20gXCIuL1NpZ25VaVwiO1xyXG5pbXBvcnQgU2lnblVpRGFpbHkgZnJvbSBcIi4vU2lnblVpRGFpbHlcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZ1bmNUeXBlQnRuIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuRW51bShGdW5jVHlwZSl9KVxyXG4gICAgZnVuY190eXBlOkZ1bmNUeXBlPUZ1bmNUeXBlLkxpQ2hlbmdCZWk7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIG5hbWVfdGV4dDpjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgY3VyX2xhbmd1YWdlX3R5cGU6IExhbmd1YWdlVHlwZSA9IExhbmd1YWdlVHlwZS5lbjtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3VyX2xhbmd1YWdlX3R5cGU9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q3VyTGFuZ3VhZ2VUeXBlKCk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaCgpOmJvb2xlYW57XHJcbiAgICAgICAgbGV0IGlzU2hvdz1GdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SXNVbmxvY2sodGhpcy5mdW5jX3R5cGUpO1xyXG4gICAgICAgIC8v5Li75Z+O55qE6aKd5aSW5aSE55CGXHJcbiAgICAgICBpZih0aGlzLmZ1bmNfdHlwZSA+PSBGdW5jVHlwZS5TaGVuZ3RhbmcgJiYgdGhpcy5mdW5jX3R5cGUgPD0gRnVuY1R5cGUuVGllSmlhbmdQdSl7XHJcbiAgICAgICAgICAgIGxldCBub3JtYWxNYXRlcmlhbD1jYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoJzJkLXNwcml0ZScpO1xyXG4gICAgICAgICAgICBsZXQgZ3JheU1hdGVyaWFsPWNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbCgnMmQtZ3JheS1zcHJpdGUnKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsaXNTaG93P25vcm1hbE1hdGVyaWFsOmdyYXlNYXRlcmlhbCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsaXNTaG93P25vcm1hbE1hdGVyaWFsOmdyYXlNYXRlcmlhbCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImxvY2tcIikuYWN0aXZlID0gaXNTaG93P2ZhbHNlOnRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5mdW5jX3R5cGUgPT0gRnVuY1R5cGUuRmlyc3RDaGFyZ2Upe1xyXG4gICAgICAgIC8vICAgICBpZihOdW1iZXIoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaXNfcGF5X2ZpcnN0X2NoYXJnZVwiLDApKSAhPSAwIHx8IGlzU2hvdyA9PSBmYWxzZSl7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBpZihOdW1iZXIoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaXNfcGF5X2ZpcnN0X2NoYXJnZVwiLDApKSA9PSAwICYmIGlzU2hvdyA9PSB0cnVlKXtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgaWYoIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuRmlyc3RQYXlHZXRTdGF0ZSwwKSA9PSAxKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNTaG93O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGxldCBub3JtYWxNYXRlcmlhbD1jYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoJzJkLXNwcml0ZScpO1xyXG4gICAgICAgICAgICBsZXQgZ3JheU1hdGVyaWFsPWNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbCgnMmQtZ3JheS1zcHJpdGUnKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsaXNTaG93P25vcm1hbE1hdGVyaWFsOmdyYXlNYXRlcmlhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2hvd05hbWUoKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93TmFtZSgpe1xyXG4gICAgICAgIGxldCBuYW1lPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbmFtZScpO1xyXG4gICAgICAgIGlmKG5hbWUpe1xyXG4gICAgICAgICAgICBuYW1lLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKEZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUZXh0SUQodGhpcy5mdW5jX3R5cGUpKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLm5hbWVfdGV4dCl7XHJcbiAgICAgICAgICAgIHRoaXMubmFtZV90ZXh0LmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKEZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUZXh0SUQodGhpcy5mdW5jX3R5cGUpKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBpZighRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzVW5sb2NrKHRoaXMuZnVuY190eXBlKSl7XHJcbiAgICAgICAgICAgIGxldCB0eXBlPUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tDb25kaXRpb25UeXBlKHRoaXMuZnVuY190eXBlKVxyXG4gICAgICAgICAgICBsZXQgbnVtPUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tDb25kaWN0aW9uUGFyYW1ldGVyKHRoaXMuZnVuY190eXBlKVxyXG4gICAgICAgICAgICBpZih0eXBlPT0xKXtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDUxKStcIjpcIitudW0pO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZih0eXBlPT0yKXtcclxuICAgICAgICAgICAgICAgIGxldCB0ZXh0U3RyPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDA1Mik7XHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtcz1NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TGV2ZWxOYW1lKChudW0pKVxyXG4gICAgICAgICAgICAgICAgbGV0IHN0cj10ZXh0U3RyLnJlcGxhY2UoJ34nLCcnK251bXMpXHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKHN0cik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3dVaSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dVaSgpe1xyXG4gICAgICAgIGxldCB1bT1VSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBzd2l0Y2godGhpcy5mdW5jX3R5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLkxpQ2hlbmdCZWk6e1xyXG4gICAgICAgICAgICAgICAgLy8gdW0uc2hvd0JhZ1VpKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgdW0uc2hvd1VpRGlhbG9nKFVJUGF0aC5CYWcsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChCYWdVaSkuaW5pdChudWxsKTtcclxuICAgICAgICAgICAgICAgIH0sfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuTWVpUmlSZW5XdTp7XHJcbiAgICAgICAgICAgICAgICB1bS5zaG93VWlEaWFsb2coVUlQYXRoLlRhc2ssVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdWlOb2RlLmdldENvbXBvbmVudChUYXNrVWkpLmluaXQobnVsbCk7IFxyXG4gICAgICAgICAgICAgICAgfSx9KTtcclxuICAgICAgICAgICAgICAgIC8vIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7mr4/ml6Xku7vliqHmjInpkq7nlKjmiLfngrnlh7vmlbApO1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuS4u+mhteeCueWHu+S7u+WKoeeCueWHu+asoeaVsCk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuUWlhbkRhbzp7XHJcbiAgICAgICAgICAgICAgICBpZihUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5Lk5ld1BsYXllclNhdmVuRGF5U2lnbkluT3ZlciwwKSA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlNpZ25JbixVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChTaWduVWkpLmluaXQobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSx9KTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguU2lnbkluRGFpbHksVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoU2lnblVpRGFpbHkpLmluaXQobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSx9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7kuIPml6Xnrb7liLDmjInpkq7ngrnlh7vnlKjmiLfmlbApO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBGdW5jVHlwZS5GYW5MaTp7XHJcbiAgICAgICAgICAgICAgICAvLyB1bS5zaG93UmFiYXRlVWkoKTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBGdW5jVHlwZS5MaUJhbzp7XHJcbiAgICAgICAgICAgICAgICAvLyB1bS5zaG93R2lmdENlbnRlclVpKCk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuWmhhbkxpbmc6e1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaImOS7pOeCueWHu+asoeaVsCk7XHJcbiAgICAgICAgICAgICAgICAvLyB1bS5zaG93QmF0dGxlUGFzc1VpKCk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuU2hlbmd0YW5nOntcclxuICAgICAgICAgICAgICAgIC8vIHVtLnNob3dQZXRBZGR2YW5jZVVpKG51bGwpO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLlh1WXVhbkNoaTp7XHJcbiAgICAgICAgICAgICAgICAvLyB1bS5zaG93V2lzaGluZ1VpKHtvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tdXNpY19tYW5hZ2VyLnBsYXlNdXNpYyhNdXNpY0luZGV4LkJHTV9NYWluQ2l0eSk7XHJcbiAgICAgICAgICAgICAgICAvLyB9fSk7XHJcbiAgICAgICAgICAgICAgICB1bS5zaG93VWlEaWFsb2coVUlQYXRoLldpc2hpbmcsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChXaXNoaW5nVWkpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOiAoKSA9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci5wbGF5TXVzaWMoTXVzaWNJbmRleC5CR01fTWFpbkNpdHkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LH0pO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLkxvbmdDaGFvOntcclxuICAgICAgICAgICAgICAgIC8vIHVtLnNob3dUYWtlRWdnVWkoe29uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgIC8vICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXIucGxheU11c2ljKE11c2ljSW5kZXguQkdNX01haW5DaXR5KTtcclxuICAgICAgICAgICAgICAgIC8vIH19KTtcclxuICAgICAgICAgICAgICAgIHVtLnNob3dVaURpYWxvZyhVSVBhdGguVGFrZUVnZyxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFRha2VFZ2dVaSkuaW5pdCh7b25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXIucGxheU11c2ljKE11c2ljSW5kZXguQkdNX01haW5DaXR5KTtcclxuICAgICAgICAgICAgICAgICAgICB9fSlcclxuICAgICAgICAgICAgICAgIH0sfSlcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBGdW5jVHlwZS5TaGFuZ0RpYW46e1xyXG4gICAgICAgICAgICAgICAgLy8gdW0uc2hvd0dvbGRNYWxsVWkoe29uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgIC8vICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXIucGxheU11c2ljKE11c2ljSW5kZXguQkdNX01haW5DaXR5KTtcclxuICAgICAgICAgICAgICAgIC8vIH19KTtcclxuICAgICAgICAgICAgICAgIHVtLnNob3dVaURpYWxvZyhVSVBhdGguTWFsbCxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEdvbGRNYWxsVWkpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOiAoKSA9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci5wbGF5TXVzaWMoTXVzaWNJbmRleC5CR01fTWFpbkNpdHkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LH0pO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLlRpZUppYW5nUHU6e1xyXG4gICAgICAgICAgICAgICAgLy8gdW0uc2hvd0VxdWlwU3ludGhldGljVWkoe29uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgIC8vICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLm11c2ljX21hbmFnZXIucGxheU11c2ljKE11c2ljSW5kZXguQkdNX01haW5DaXR5KTtcclxuICAgICAgICAgICAgICAgIC8vIH19KTtcclxuICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguRXF1aXBTeW50aGV0aWMsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChNZXJnZVVpKS5pbml0KHtvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci5wbGF5TXVzaWMoTXVzaWNJbmRleC5CR01fTWFpbkNpdHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH19KTtcclxuICAgICAgICAgICAgICAgIH0sfSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuTmVpR291OntcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7kuLvpobXlhYXlgLzllYbln47ngrnlh7vmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgdW0uc2hvd1BheVVpKG51bGwsMSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRnVuY1R5cGUuRmlyc3RDaGFyZ2U6e1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuS4u+mhtemmluWFheekvOWMheeCueWHu+asoeaVsCk7XHJcbiAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkZpcnN0Q2hhcmdlLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoUGF5Rmlyc3RDaGFyZ2VVaSkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U6KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1haW5VaT1jYy5maW5kKFwiQ2FudmFzL21haW5fdWlcIikuZ2V0Q29tcG9uZW50KE1haW5VaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWluVWkucmVmcmVzaExlZnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSx9KTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLlpodWFuUGFuOntcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ovaznm5jnmoTmiZPlvIDmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgdW0uc2hvd1VpRGlhbG9nKFVJUGF0aC5UdXJudGFibGUsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChUdXJtdGFibGUpLmluaXRVaSgpXHJcbiAgICAgICAgICAgICAgICB9LH0pOy8v6L2s55uYXHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBGdW5jVHlwZS5WSVA6e1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaImOS7pOeCueWHu+asoeaVsCk7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5oiY5Luk5oyJ6ZKu54K55Ye75qyh5pWwKTtcclxuICAgICAgICAgICAgICAgIHVtLnNob3dVaURpYWxvZyhVSVBhdGguVmlwU3lzdGVtLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoVmlwU3lzdGVtKS5pbml0VWkoKVxyXG4gICAgICAgICAgICAgICAgfSx9KTsvL+S8muWRmOezu+e7nyAgVklQ57O757ufXHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBGdW5jVHlwZS5QYWlIYW5nQmFuZzp7XHJcbiAgICAgICAgICAgICAgICAvLyB1bS5zaG93UmFua1VpKCk7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5o6S6KGM5qac54K55Ye755So5oi35pWwKTtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7kuLvpobXmjpLooYzmppzmjInpkq7ngrnlh7vmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB1bS5zaG93VWlEaWFsb2coVUlQYXRoLlJhbmtpbmdMaXN0LFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoUmFua2luZ0xpc3QpLmluaXRVaSgxKVxyXG4gICAgICAgICAgICAgICAgfSx9KTsvL+aOkuihjOamnFxyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLkFjY3VtdWxhdGVkUmVjaGFyZ2U6e1xyXG4gICAgICAgICAgICAgICAgLy/ntK/lhYVcclxuICAgICAgICAgICAgICAgIHVtLnNob3dVaURpYWxvZyhVSVBhdGguQWNjdW11bGF0ZWRSZWNoYXJnZSxVSUxheWVyTGV2ZWwuT25lLHtcclxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlZDoodWlOb2RlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEFjY3VtdWxhdGVkUmVjaGFyZ2VVaSkuaW5pdChudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEZ1bmNUeXBlLldlZWtDYXJkOntcclxuICAgICAgICAgICAgICAgIC8v5ZGo5Y2hXHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu54m55p2D5Y2h5oyJ6ZKu54K55Ye75qyh5pWwKTtcclxuICAgICAgICAgICAgICAgIHVtLnNob3dVaURpYWxvZyhVSVBhdGguV2Vla0NhcmQsVUlMYXllckxldmVsLk9uZSx7XHJcbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZWQ6KHVpTm9kZSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChXZWVrQ2FyZFVpKS5yZWZyZXNoVWkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIFBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRGdW5jVG9kYXlTaG93KHRoaXMuZnVuY190eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlKGR0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZih0aGlzLmN1cl9sYW5ndWFnZV90eXBlIT1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDdXJMYW5ndWFnZVR5cGUoKSl7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd05hbWUoKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJfbGFuZ3VhZ2VfdHlwZT1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDdXJMYW5ndWFnZVR5cGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4iXX0=