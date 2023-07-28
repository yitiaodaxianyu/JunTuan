"use strict";
cc._RF.push(module, '2c3a3IWd75Pb7xy3nheaKWn', 'StoreUi');
// Scripts/Store/StoreUi.ts

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
var WXManagerEX_1 = require("../../startscene/WXManagerEX");
var HttpManager_1 = require(".././NetWork/HttpManager");
var CumulativeRecharges_1 = require("../AccumulatedRecharge/CumulativeRecharges");
var ApkManager_1 = require("../Ads/ApkManager");
var CoinPop_1 = require("../CoinPop");
var Constants_1 = require("../Constants");
var EquipItem_1 = require("../Equipment/Ui/EquipItem");
var GameData_1 = require("../GameData");
var GameManager_1 = require("../GameManager");
var HeroManager_1 = require("../Hero/Data/HeroManager");
var HeroConfig_1 = require("../Hero/Game/HeroConfig");
var FunctionDefinition_1 = require("../JsonData/FunctionDefinition");
var LevelJsonData_1 = require("../JsonData/LevelJsonData");
var LevelManager_1 = require("../Level/LevelManager");
var MissionLevel_1 = require("../Level/MissionLevel");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var LanguageConstants_1 = require("../multiLanguage/LanguageConstants");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var TextLanguage_1 = require("../multiLanguage/TextLanguage");
var PayManager_1 = require("../Payment/PayManager");
var Item_1 = require("../Prop/Data/Item");
var Prop_1 = require("../Prop/Prop");
var PropConfig_1 = require("../Prop/PropConfig");
var PropManager_1 = require("../Prop/PropManager");
var StorageConfig_1 = require("../Storage/StorageConfig");
var StorageManager_1 = require("../Storage/StorageManager");
var TaskEnum_1 = require("../Task/TaskEnum");
var TaskManager_1 = require("../Task/TaskManager");
var EventManager_1 = require("../Tools/EventManager");
var MyTool_1 = require("../Tools/MyTool");
var TutorailsManager_1 = require("../Tutorials/TutorailsManager");
var MainUi_1 = require("../UI/home/MainUi");
var UIConfig_1 = require("../UI/UIConfig");
var UIManager_1 = require("../UI/UIManager");
var UserData_1 = require("../UserData");
var UserInfo_1 = require("../UserInfo/UserInfo");
var ChapterPack_1 = require("./ChapterPack");
var CommodityInformation_1 = require("./CommodityInformation");
var DailyShop_1 = require("./DailyShop");
var DiamondsRecharge_1 = require("./DiamondsRecharge");
var DrawCardInformation_1 = require("./DrawCardInformation");
var ProbabilityTipUi_1 = require("./ProbabilityTipUi");
var PurchaseCoins_1 = require("./PurchaseCoins");
var StoreHeroUi_1 = require("./StoreHeroUi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var StoreUi = /** @class */ (function (_super) {
    __extends(StoreUi, _super);
    function StoreUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.store_title = null;
        _this.store_chapter_item = null;
        _this.store_hero_item = null;
        _this.store_daily_item = null;
        _this.store_pet_item = null;
        _this.store_equip_item = null;
        _this.store_gem_item = null;
        _this.store_coin_item = null;
        _this.store_ui = null;
        // 私有数据
        _this.hero_instance = null;
        _this.weapon_instance = null;
        _this.pet_instance = null;
        return _this;
    }
    StoreUi.prototype.onLoad = function () {
        this.node.on(cc.Node.EventType.POSITION_CHANGED, this.onPositionChange, this);
        cc.director.on(LanguageConstants_1.OnLanguageChange, this.initStore, this);
        if (WXManagerEX_1.default.getInstance().statusBarHeight > 20) {
            this.node.getComponent(cc.Widget).top = 150;
        }
        this.initStore();
    };
    StoreUi.prototype.onDestroy = function () {
        this.node.off(cc.Node.EventType.POSITION_CHANGED, this.onPositionChange, this);
        cc.director.off(LanguageConstants_1.OnLanguageChange, this.initStore, this);
        cc.director.off("onRefreshInstanceItem");
    };
    StoreUi.prototype.onPositionChange = function () {
        if (this.node.x == 0) {
            this.onEnable();
        }
    };
    StoreUi.prototype.onEnable = function () {
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.商城商城页点击次数);
        this.refreshStore();
        //this.checkTutorails();
    };
    StoreUi.prototype.checkTutorails = function () {
        if (TutorailsManager_1.default.getInstance().is_tutorails_state && TutorailsManager_1.default.getInstance().isShowTutorials(222) && LevelManager_1.LevelManager.getInstance().finish_level >= 3) {
            TutorailsManager_1.default.getInstance().is_tutorails_state = true;
            this.scheduleOnce(function () {
                var store_ui = cc.find('Canvas/store_ui/scroll');
                var content = store_ui.getComponent(cc.ScrollView).content;
                var btn1 = content.getChildByName('heroRoot').getChildByName('heroItem').getChildByName('btn1');
                var wordPos = btn1.parent.convertToWorldSpaceAR(btn1.getPosition());
                var localPos = cc.find('Canvas/Ui_Root').convertToNodeSpaceAR(wordPos);
                localPos.x -= cc.find('Canvas/store_ui').x;
                TutorailsManager_1.default.getInstance().showTutorials(222, null, function () {
                    if (PropManager_1.PropManager.getInstance().changePropNum(40004, -1)) {
                        if (HeroManager_1.HeroManager.getInstance().getHeroInfo(HeroConfig_1.Hero_Type.DeLuYi) == null) {
                            var rewardList_1 = new Array();
                            var rd = new LevelJsonData_1.RewardHeroData();
                            rd.dropId = 110004;
                            rd.dropNum = 1;
                            rewardList_1.push(rd);
                            HeroManager_1.HeroManager.getInstance().addHero(HeroConfig_1.Hero_Type.DeLuYi);
                            HeroManager_1.HeroManager.getInstance().reportHeroList();
                            var teamList = HeroManager_1.HeroManager.getInstance().getTeamList(Constants_1.GameMode.Main);
                            teamList[1] = HeroConfig_1.Hero_Type.DeLuYi;
                            HeroManager_1.HeroManager.getInstance().saveTeamList(Constants_1.GameMode.Main, teamList);
                            TutorailsManager_1.default.getInstance().saveTutorials(222);
                            TutorailsManager_1.default.getInstance().saveTutorials(223);
                            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.StoreHeroUi, UIConfig_1.UILayerLevel.One, {
                                onCompleted: function (uiNode) {
                                    uiNode.getComponent(StoreHeroUi_1.default).init({
                                        onClose: function () {
                                            //直接进入游戏
                                            cc.find('Canvas/main_ui').getComponent(MainUi_1.default).startGame();
                                        }
                                    });
                                    uiNode.getComponent(StoreHeroUi_1.default).initData(rewardList_1);
                                },
                            });
                        }
                    }
                }, false, null, localPos);
            }, 0.1);
        }
    };
    StoreUi.prototype.initStore = function () {
        var _this = this;
        var content = this.node.getChildByName("scroll").getComponent(cc.ScrollView).content;
        content.removeAllChildren();
        cc.director.off("onRefreshInstanceItem");
        cc.director.on("onRefreshInstanceItem", this.onRefreshInstanceItem, this);
        // 章节礼包
        //#region 
        var title = cc.instantiate(this.store_title);
        title.getComponentInChildren(TextLanguage_1.default).setTextId(1430001);
        title.name = "chapterTitle";
        content.addChild(title);
        var chapterRoot = new cc.Node();
        chapterRoot.name = 'chapterRoot';
        chapterRoot.height = this.store_chapter_item.data.height;
        chapterRoot.width = (this.store_chapter_item.data.width + 20) * 3;
        var chapterRight = new cc.Node();
        var chapterLeft = new cc.Node();
        chapterRight.addComponent(cc.Sprite).spriteFrame = this.store_ui.getSpriteFrame("Shop_Arrow");
        chapterLeft.addComponent(cc.Sprite).spriteFrame = this.store_ui.getSpriteFrame("Shop_Arrow");
        chapterLeft.scaleX = -1;
        chapterRoot.addChild(chapterRight);
        chapterRoot.addChild(chapterLeft);
        chapterRight.x = 345;
        chapterLeft.x = -345;
        chapterLeft.active = false;
        var chapterData = ChapterPack_1.ChapterPackManager.getInstance().getJsonData();
        chapterData.forEach(function (v, k) {
            if (StorageManager_1.TheStorageManager.getInstance().getString(StorageConfig_1.StorageKey.StoreChapterItem + v.Chapter, '') == '' && (LevelManager_1.LevelManager.getInstance().getFinishChapter()) >= v.Chapter) {
                var item_1 = cc.instantiate(_this.store_chapter_item);
                item_1.name = "chapterItem" + v.Chapter;
                if (v.Chapter == 1) {
                    item_1.getChildByName("title").getComponent(TextLanguage_1.default).setTextId(1430002);
                }
                else {
                    item_1.getChildByName("title").getComponent(TextLanguage_1.default).setTextId(1430003);
                    item_1.getChildByName("title").getComponent(TextLanguage_1.default).setReplaceValue('~', v.Chapter + '');
                }
                var payInfo = PayManager_1.PayManager.getInstance().getPayInfo(v.ProductId);
                item_1.getChildByName("originPrice").getComponent(cc.Label).string = payInfo.currency + (MyTool_1.default.getNumberFromString(payInfo.price) * v.InitialPrice);
                item_1.getChildByName("payBtn").getComponentInChildren(cc.Label).string = payInfo.price;
                var propRoot = item_1.getChildByName("itemRoot");
                if (v.GetCoinNum != 0) {
                    var reward = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Coin, v.GetCoinNum);
                    reward.scale = 0.75;
                    propRoot.addChild(reward);
                }
                if (v.GetGemNum != 0) {
                    var reward = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Gem, v.GetGemNum);
                    reward.scale = 0.75;
                    propRoot.addChild(reward);
                }
                if (v.ItemId_1 != 0) {
                    var reward = PropManager_1.PropManager.getInstance().createPropItem(v.ItemId_1, v.ItemNum_1);
                    reward.scale = 0.75;
                    propRoot.addChild(reward);
                }
                if (v.ItemId_2 != 0) {
                    var reward = PropManager_1.PropManager.getInstance().createPropItem(v.ItemId_2, v.ItemNum_2);
                    reward.scale = 0.75;
                    propRoot.addChild(reward);
                }
                chapterRoot.addChild(item_1);
                if (chapterRoot.childrenCount == 3) {
                    chapterRoot.children[2].x = 0;
                }
                else {
                    chapterRoot.children[chapterRoot.childrenCount - 1].x = 2 * chapterRoot.children[chapterRoot.childrenCount - 1].width;
                }
                var btn = item_1.getChildByName("payBtn");
                btn.addComponent(cc.Button).transition = cc.Button.Transition.SCALE;
                btn.getComponent(cc.Button).duration = 0.1;
                btn.getComponent(cc.Button).zoomScale = 0.9;
                btn.on(cc.Node.EventType.TOUCH_END, function () {
                    ApkManager_1.default.getInstance().showPay({
                        result: function (isDy) {
                            if (isDy) {
                                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.商城章节礼包x章点击购买次数 + v.Chapter);
                                var rewardList = [];
                                if (v.GetCoinNum != 0) {
                                    PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Coin, v.GetCoinNum);
                                    var reward = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Coin, v.GetCoinNum);
                                    rewardList.push(reward);
                                }
                                if (v.GetGemNum != 0) {
                                    PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Gem, v.GetGemNum);
                                    var reward = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Gem, v.GetGemNum);
                                    rewardList.push(reward);
                                }
                                if (v.ItemId_1 != 0) {
                                    PropManager_1.PropManager.getInstance().changePropNum(v.ItemId_1, v.ItemNum_1);
                                    var reward = PropManager_1.PropManager.getInstance().createPropItem(v.ItemId_1, v.ItemNum_1);
                                    rewardList.push(reward);
                                }
                                if (v.ItemId_2 != 0) {
                                    PropManager_1.PropManager.getInstance().changePropNum(v.ItemId_2, v.ItemNum_2);
                                    var reward = PropManager_1.PropManager.getInstance().createPropItem(v.ItemId_2, v.ItemNum_2);
                                    rewardList.push(reward);
                                }
                                GameManager_1.default.getInstance().showMultipleGetTip(rewardList);
                                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.StoreChapterItem + v.Chapter, '1');
                                chapterRoot.removeChild(item_1);
                                if (chapterRoot.childrenCount == 2) {
                                    content.getChildByName("chapterTitle").active = false;
                                    chapterLeft.active = false;
                                    chapterRight.active = false;
                                    chapterRoot.active = false;
                                }
                                else if (chapterRoot.childrenCount <= 3) {
                                    chapterLeft.active = false;
                                    chapterRight.active = false;
                                    cc.tween(chapterRoot.children[2]).to(0.2, { position: cc.v3(0, 0, 0) }).start().call(function () {
                                    });
                                }
                                else {
                                    cc.tween(chapterRoot.children[2]).to(0.2, { position: cc.v3(0, 0, 0) }).start().call(function () {
                                    });
                                }
                            }
                        }
                    }, v.ProductId);
                });
            }
        });
        chapterLeft.addComponent(cc.Button).transition = cc.Button.Transition.SCALE;
        chapterLeft.getComponent(cc.Button).duration = 0.1;
        chapterLeft.getComponent(cc.Button).zoomScale = 0.9;
        chapterRight.addComponent(cc.Button).transition = cc.Button.Transition.SCALE;
        chapterRight.getComponent(cc.Button).duration = 0.1;
        chapterRight.getComponent(cc.Button).zoomScale = 0.9;
        var index = 2;
        chapterRight.on(cc.Node.EventType.TOUCH_END, function () {
            index++;
            if (index >= chapterRoot.childrenCount - 1) {
                index = chapterRoot.childrenCount - 1;
                chapterRight.active = false;
            }
            if (index > 2)
                chapterLeft.active = true;
            cc.tween(chapterRoot.children[index]).to(0.2, { position: cc.v3(0, 0, 0) }).start().call(function () {
            });
            cc.tween(chapterRoot.children[index - 1]).to(0.2, { position: cc.v3(-800, 0, 0) }).start().call(function () {
            });
        });
        chapterLeft.on(cc.Node.EventType.TOUCH_END, function () {
            index--;
            if (index <= 2) {
                index = 2;
                chapterLeft.active = false;
            }
            if (index < chapterRoot.childrenCount - 1)
                chapterRight.active = true;
            cc.tween(chapterRoot.children[index]).to(0.2, { position: cc.v3(0, 0, 0) }).start().call(function () {
            });
            cc.tween(chapterRoot.children[index + 1]).to(0.2, { position: cc.v3(800, 0, 0) }).start().call(function () {
            });
        });
        if (chapterRoot.childrenCount <= 3) {
            chapterLeft.active = false;
            chapterRight.active = false;
        }
        if (chapterRoot.childrenCount == 2) {
            content.getChildByName("chapterTitle").active = false;
            chapterRoot.active = false;
        }
        else {
            content.getChildByName("chapterTitle").active = true;
            chapterRoot.active = true;
        }
        content.addChild(chapterRoot);
        //#endregion
        // 英雄招募
        title = cc.instantiate(this.store_title);
        title.getComponentInChildren(TextLanguage_1.default).setTextId(1460011);
        title.name = "mysteryTitle";
        content.addChild(title);
        var heroRoot = new cc.Node();
        heroRoot.name = 'heroRoot';
        heroRoot.height = this.store_hero_item.data.height;
        heroRoot.width = (this.store_hero_item.data.width + 20) * 3;
        var heroItem = cc.instantiate(this.store_hero_item);
        this.hero_instance = heroItem;
        heroItem.name = "heroItem";
        heroItem.getChildByName("richBg").getComponentInChildren(cc.RichText).string = LanguageManager_1.default.getInstance().getStrByTextId(1460002);
        heroItem.getChildByName("IconNum").getComponent(cc.Label).string = "X" + PropManager_1.PropManager.getInstance().getPropNum(40004);
        var prizeHeroData = DrawCardInformation_1.DrawCardInformationManager.getInstance().getJsonDrawCardInformation(1001);
        if (PropManager_1.PropManager.getInstance().getPropNum(prizeHeroData.OneDrawPropsID_1) >= prizeHeroData.OneDrawPropsSpend_1) {
            heroItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_1);
            heroItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeHeroData.OneDrawPropsSpend_1;
        }
        else {
            heroItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_2);
            heroItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeHeroData.OneDrawPropsSpend_2;
        }
        if (PropManager_1.PropManager.getInstance().getPropNum(prizeHeroData.OneDrawPropsID_1) >= prizeHeroData.TenDrawPropsSpend_1) {
            heroItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_1);
            heroItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeHeroData.TenDrawPropsSpend_1;
        }
        else {
            heroItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_2);
            heroItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeHeroData.TenDrawPropsSpend_2;
        }
        var heroTip = heroItem.getChildByName("name").getChildByName("tip");
        heroTip.addComponent(cc.Button).transition = cc.Button.Transition.SCALE;
        heroTip.getComponent(cc.Button).duration = 0.1;
        heroTip.getComponent(cc.Button).zoomScale = 0.9;
        heroTip.on(cc.Node.EventType.TOUCH_END, function () {
            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.ProbabilityTipUi, UIConfig_1.UILayerLevel.One, {
                onCompleted: function (uiNode) {
                    uiNode.getComponent(ProbabilityTipUi_1.default).init(null);
                    uiNode.getComponent(ProbabilityTipUi_1.default).initUi();
                },
            });
        });
        var heroBtn1 = heroItem.getChildByName("btn1");
        var heroBtn10 = heroItem.getChildByName("btn10");
        heroBtn10.getChildByName('red').active = GameData_1.default.getInstance().getHeroRecruitingRedTip();
        heroBtn1.addComponent(cc.Button).transition = cc.Button.Transition.SCALE;
        heroBtn1.getComponent(cc.Button).duration = 0.1;
        heroBtn1.getComponent(cc.Button).zoomScale = 0.9;
        heroBtn10.addComponent(cc.Button).transition = cc.Button.Transition.SCALE;
        heroBtn10.getComponent(cc.Button).duration = 0.1;
        heroBtn10.getComponent(cc.Button).zoomScale = 0.9;
        heroBtn1.on(cc.Node.EventType.TOUCH_END, function () {
            var costId = 0;
            var costNum = 0;
            if (PropManager_1.PropManager.getInstance().getPropNum(prizeHeroData.OneDrawPropsID_1) >= prizeHeroData.OneDrawPropsSpend_1) {
                costId = prizeHeroData.OneDrawPropsID_1;
                costNum = prizeHeroData.OneDrawPropsSpend_1;
                // 以下为后端未存消费券的处理，当后端存储消费券时，使用上面两行代码
                // PropManager.getInstance().changePropNum(prizeHeroData.OneDrawPropsID_1,-prizeHeroData.OneDrawPropsSpend_1);
                // costId = prizeHeroData.OneDrawPropsID_2;
                // costNum = 0;
                FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.记录招募消耗招募卷数量, prizeHeroData.OneDrawPropsSpend_1);
            }
            else {
                costId = prizeHeroData.OneDrawPropsID_2;
                costNum = prizeHeroData.OneDrawPropsSpend_2;
                FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.记录招募卷消耗钻石数量, costNum);
            }
            // if(PropManager.getInstance().getPropNum(costId) < costNum){
            //     UIManager.getInstance().showUiDialog(UIPath.CoinPop,UILayerLevel.Two,{onCompleted:(uiNode)=> {
            //         uiNode.getComponent(CoinPop).initUi(PropId.Gem)
            //     },});
            //     return;
            // }
            if (PropManager_1.PropManager.getInstance().getPropNum(costId) < costNum) {
                GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100041));
                _this.node.getChildByName("scroll").getComponent(cc.ScrollView).scrollToBottom(2);
                return;
            }
            // if(IsDebug) costNum = 0;
            HttpManager_1.HttpManager.post(HttpManager_1.AccessName.tryPrize, _this.getPrizeJsonString(1, 1, costId, costNum), true).then(function (data) {
                if (data) {
                    PropManager_1.PropManager.getInstance().changePropNum(costId, -costNum);
                    GameManager_1.default.getInstance().refreshGemShow();
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.记录单次招募的次数);
                    TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.进行1次英雄招募);
                    TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.进行10次英雄招募);
                    TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.招募X次英雄);
                    PropManager_1.PropManager.getInstance().changePropNum(data[0].dropId, data[0].dropNum);
                    HeroManager_1.HeroManager.getInstance().reportHeroList();
                    var type = Item_1.ItemManager.getInstance().getType(data[0].dropId);
                    if (type == 11) {
                        TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.累计招募X个英雄);
                    }
                    PropManager_1.PropManager.getInstance().saveAllPropNum();
                    UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.StoreHeroUi, UIConfig_1.UILayerLevel.One, {
                        onCompleted: function (uiNode) {
                            uiNode.getComponent(StoreHeroUi_1.default).init(null);
                            uiNode.getComponent(StoreHeroUi_1.default).initData(data);
                        },
                    });
                    if (PropManager_1.PropManager.getInstance().getPropNum(prizeHeroData.OneDrawPropsID_1) >= prizeHeroData.OneDrawPropsSpend_1) {
                        heroItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_1);
                        heroItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeHeroData.OneDrawPropsSpend_1;
                    }
                    else {
                        heroItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_2);
                        heroItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeHeroData.OneDrawPropsSpend_2;
                    }
                    if (PropManager_1.PropManager.getInstance().getPropNum(prizeHeroData.OneDrawPropsID_1) >= prizeHeroData.TenDrawPropsSpend_1) {
                        heroItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_1);
                        heroItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeHeroData.TenDrawPropsSpend_1;
                    }
                    else {
                        heroItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_2);
                        heroItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeHeroData.TenDrawPropsSpend_2;
                    }
                }
            });
        });
        heroBtn10.on(cc.Node.EventType.TOUCH_END, function () {
            var costId = 0;
            var costNum = 0;
            if (PropManager_1.PropManager.getInstance().getPropNum(prizeHeroData.OneDrawPropsID_1) >= prizeHeroData.TenDrawPropsSpend_1) {
                costId = prizeHeroData.OneDrawPropsID_1;
                costNum = prizeHeroData.TenDrawPropsSpend_1;
                // 以下为后端未存消费券的处理，当后端存储消费券时，使用上面两行代码
                // PropManager.getInstance().changePropNum(prizeHeroData.OneDrawPropsID_1,-prizeHeroData.TenDrawPropsSpend_1);
                // costId = prizeHeroData.OneDrawPropsID_2;
                // costNum = 0;
                FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.记录招募消耗招募卷数量, prizeHeroData.TenDrawPropsSpend_1);
            }
            else {
                costId = prizeHeroData.OneDrawPropsID_2;
                costNum = prizeHeroData.TenDrawPropsSpend_2;
                FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.记录招募卷消耗钻石数量, costNum);
            }
            // if(PropManager.getInstance().getPropNum(costId) < costNum){
            //     UIManager.getInstance().showUiDialog(UIPath.CoinPop,UILayerLevel.Two,{onCompleted:(uiNode)=> {
            //         uiNode.getComponent(CoinPop).initUi(PropId.Gem)
            //     },});
            //     return;
            // }
            if (PropManager_1.PropManager.getInstance().getPropNum(costId) < costNum) {
                GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100041));
                _this.node.getChildByName("scroll").getComponent(cc.ScrollView).scrollToBottom(2);
                return;
            }
            // if(IsDebug) costNum = 0;   
            HttpManager_1.HttpManager.post(HttpManager_1.AccessName.tryPrize, _this.getPrizeJsonString(2, 1, costId, costNum), true).then(function (data) {
                if (data) {
                    PropManager_1.PropManager.getInstance().changePropNum(costId, -costNum);
                    GameManager_1.default.getInstance().refreshGemShow();
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.记录十次招募的次数);
                    var length = data.length;
                    for (var i = 0; i < length; i++) {
                        TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.进行1次英雄招募);
                        TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.进行10次英雄招募);
                        TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.招募X次英雄);
                        PropManager_1.PropManager.getInstance().changePropNum(data[i].dropId, data[i].dropNum);
                        var type = Item_1.ItemManager.getInstance().getType(data[i].dropId);
                        if (type == 11) {
                            TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.累计招募X个英雄);
                        }
                    }
                    HeroManager_1.HeroManager.getInstance().reportHeroList();
                    var tempIndex = MyTool_1.default.randomRangeInt(0, 9);
                    var temp = data[9];
                    data[9] = data[tempIndex];
                    data[tempIndex] = temp;
                    PropManager_1.PropManager.getInstance().saveAllPropNum();
                    UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.StoreHeroUi, UIConfig_1.UILayerLevel.One, {
                        onCompleted: function (uiNode) {
                            uiNode.getComponent(StoreHeroUi_1.default).init(null);
                            uiNode.getComponent(StoreHeroUi_1.default).initData(data);
                        },
                    });
                    if (PropManager_1.PropManager.getInstance().getPropNum(prizeHeroData.OneDrawPropsID_1) >= prizeHeroData.OneDrawPropsSpend_1) {
                        heroItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_1);
                        heroItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeHeroData.OneDrawPropsSpend_1;
                    }
                    else {
                        heroItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_2);
                        heroItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeHeroData.OneDrawPropsSpend_2;
                    }
                    if (PropManager_1.PropManager.getInstance().getPropNum(prizeHeroData.OneDrawPropsID_1) >= prizeHeroData.TenDrawPropsSpend_1) {
                        heroItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_1);
                        heroItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeHeroData.TenDrawPropsSpend_1;
                    }
                    else {
                        heroItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_2);
                        heroItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeHeroData.TenDrawPropsSpend_2;
                    }
                    heroBtn10.getChildByName('red').active = GameData_1.default.getInstance().getHeroRecruitingRedTip();
                    EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Shop);
                }
            });
        });
        heroRoot.addChild(heroItem);
        content.addChild(heroRoot);
        // 每日商店
        //#region 
        title = cc.instantiate(this.store_title);
        title.getComponentInChildren(TextLanguage_1.default).setTextId(1480001);
        title.name = "dailyStoreTitle";
        content.addChild(title);
        var timeLabel = new cc.Node().addComponent(TextLanguage_1.default);
        timeLabel.node.color = cc.color(255, 242, 206);
        timeLabel.node.anchorX = 1;
        timeLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
        timeLabel.horizontalAlign = cc.Label.HorizontalAlign.RIGHT;
        timeLabel.enableBold = true;
        timeLabel.fontSize = 24;
        timeLabel.setTextId(100045);
        var timeNum = new cc.Node().addComponent(cc.Label);
        timeNum.node.color = cc.color(79, 255, 70);
        timeNum.node.anchorX = 0;
        timeNum.verticalAlign = cc.Label.VerticalAlign.CENTER;
        timeNum.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        timeNum.enableBold = true;
        timeNum.fontSize = 24;
        var nowTime = Date.now() / 1000;
        var residueTime = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TomorowZeroTimeStamp, 0) - nowTime;
        if (residueTime < 0) {
            residueTime = ((new Date(new Date().toLocaleDateString()).getTime() + 8640000) / 1000) - nowTime;
        }
        var hh = Math.floor(residueTime / (60 * 60));
        if (hh < 10) {
            timeNum.string = '0' + hh + ':';
        }
        else {
            timeNum.string = hh + ':';
        }
        var mm = Math.floor(residueTime % (60 * 60) / 60);
        if (mm < 10) {
            timeNum.string += '0' + mm + ':';
        }
        else {
            timeNum.string += mm + ':';
        }
        var ss = Math.floor(residueTime % (60 * 60) % 60);
        if (ss < 10) {
            timeNum.string += '0' + ss;
        }
        else {
            timeNum.string += ss;
        }
        // 动态刷新一律写在函数的最下方
        var textRoot = new cc.Node();
        textRoot.width = this.node.width;
        textRoot.height = 20;
        textRoot.addChild(timeLabel.node);
        textRoot.addChild(timeNum.node);
        content.addChild(textRoot);
        var dailyStoreRoot = new cc.Node();
        dailyStoreRoot.name = 'dailyStoreRoot';
        dailyStoreRoot.height = this.store_daily_item.data.height * 2 + 10;
        dailyStoreRoot.width = this.node.width;
        content.addChild(dailyStoreRoot);
        var dailyStoreLayout = dailyStoreRoot.addComponent(cc.Layout);
        dailyStoreLayout.type = cc.Layout.Type.GRID;
        dailyStoreLayout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
        dailyStoreLayout.paddingRight = 40;
        dailyStoreLayout.paddingLeft = 40;
        dailyStoreLayout.spacingX = 20;
        dailyStoreLayout.spacingY = 20;
        var dailyData;
        if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.StoreDailyShopId, 0) == 0) {
            var index_1 = this.getRandomInt(1, 4);
            dailyData = DailyShop_1.DailyShopManager.getInstance().getJsonDataByChapterAndInde(LevelManager_1.LevelManager.getInstance().getFinishChapter(), index_1);
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.StoreDailyShopId, dailyData.Shop_ID);
        }
        else {
            dailyData = DailyShop_1.DailyShopManager.getInstance().getJsonDailyShop(StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.StoreDailyShopId));
        }
        console.log("每日商店ID:" + dailyData.Shop_ID);
        dailyData.Shoplist.forEach(function (v, k) {
            console.log("每日商店道具" + k + ":" + v);
        });
        dailyData.Shoplist.forEach(function (v, k) {
            var item = cc.instantiate(_this.store_daily_item);
            var storeItemInfo = CommodityInformation_1.CommodityInformationManager.getInstance().getJsonCommodityInformation(v);
            if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.StoreDailyShopNum + k, 0) < storeItemInfo.AdPlayableTimes) {
                // 可购买
                if (CommodityInformation_1.CommodityInformationManager.getInstance().getAdReward(v) == 1) {
                    // 广告商品
                    item.getChildByName("discountIcon").active = false;
                    item.getChildByName("discountNum").active = false;
                    item.getChildByName("price").active = false;
                    item.getChildByName("free").active = true;
                    item.getChildByName("red").active = true;
                    item.getChildByName("costIcon").getComponent(cc.Sprite).spriteFrame = _this.store_ui.getSpriteFrame("Shop_Icon_ADS");
                    item.getChildByName("name").getComponent(TextLanguage_1.default).setTextId(Item_1.ItemManager.getInstance().getNameTextId(storeItemInfo.GetItem));
                    // let name = item.getChildByName("name").getComponent(cc.Label);
                    // if(ItemManager.getInstance().getJsonItem(storeItemInfo.GetItem).Type==5){
                    //     let valueStr=24;
                    //     let yushu=ItemManager.getInstance().getJsonItem(storeItemInfo.GetItem).ItemID%10-1;
                    //     if(yushu<=4){
                    //         valueStr=Math.pow(2,yushu);
                    //     }
                    //     if(valueStr == 16) valueStr = 24;
                    //     name.getComponent(cc.Label).string=name.getComponent(cc.Label).string.replace('~',valueStr.toString());
                    //     // detailStr=detailStr.replace('~',valueStr.toString());
                    // }
                    var reward = PropManager_1.PropManager.getInstance().createPropItem(storeItemInfo.GetItem, storeItemInfo.GetNum);
                    reward.name = 'reward';
                    item.addChild(reward);
                    item.addComponent(cc.Button).transition = cc.Button.Transition.SCALE;
                    item.getComponent(cc.Button).duration = 0.1;
                    item.getComponent(cc.Button).zoomScale = 0.9;
                    item.on(cc.Node.EventType.TOUCH_END, function () {
                        ApkManager_1.default.getInstance().showVideo((function (isTrue) {
                            if (isTrue) {
                                TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.商店中购买物品1次);
                                TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.前往商城购买X次商品);
                                PropManager_1.PropManager.getInstance().changePropNum(storeItemInfo.GetItem, storeItemInfo.GetNum);
                                var reward_1 = PropManager_1.PropManager.getInstance().createPropItem(storeItemInfo.GetItem, storeItemInfo.GetNum);
                                var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.StoreDailyShopNum + k, 0);
                                num++;
                                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.在每日商店中使用广告购买钻石的次数);
                                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.StoreDailyShopNum + k, num);
                                if (num >= storeItemInfo.AdPlayableTimes) {
                                    item.getChildByName("costIcon").active = false;
                                    item.getChildByName("free").active = false;
                                    item.getChildByName("saleOut").zIndex = 1;
                                    item.getChildByName("saleOut").active = true;
                                    item.getChildByName("red").active = false;
                                    EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Shop);
                                    var type = Item_1.ItemManager.getInstance().getType(storeItemInfo.GetItem);
                                    if (type == 3) {
                                        item.getChildByName("reward").getComponent(EquipItem_1.default).prop_action = PropConfig_1.PropAction.Null;
                                    }
                                    else {
                                        item.getChildByName("reward").getComponent(Prop_1.default).prop_action = PropConfig_1.PropAction.Null;
                                    }
                                    item.off(cc.Node.EventType.TOUCH_END);
                                }
                                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.每日商店中成功购买物品的次数);
                                GameManager_1.default.getInstance().showGetTip(reward_1);
                            }
                            else {
                                // 失败
                                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.每日商店中购买失败的次数);
                            }
                        }), Constants_1.VIDEO_TYPE.Gem);
                    });
                }
                else {
                    // 非广告商品
                    if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.StoreDailyShopDiscount + k, 0) == 0) {
                        // 无折扣需要随机折扣
                        var discountNum_1 = _this.getRandomInt(4, 9);
                        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.StoreDailyShopDiscount + k, discountNum_1);
                        item.getChildByName("free").active = false;
                        item.getChildByName("red").active = false;
                        EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Shop);
                        item.getChildByName("costIcon").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(storeItemInfo.CostItemID);
                        item.getChildByName("price").getComponent(cc.Label).string = 'x' + MyTool_1.default.getCoinDanwei(storeItemInfo.CostNum * discountNum_1 * 0.1);
                        item.getChildByName("name").getComponent(TextLanguage_1.default).setTextId(Item_1.ItemManager.getInstance().getNameTextId(storeItemInfo.GetItem));
                        item.getChildByName("discountNum").getComponent(TextLanguage_1.default).setReplaceValue('~', (100 - discountNum_1 * 10) + '');
                        var reward = PropManager_1.PropManager.getInstance().createPropItem(storeItemInfo.GetItem, storeItemInfo.GetNum);
                        reward.name = 'reward';
                        item.addChild(reward);
                        item.addComponent(cc.Button).transition = cc.Button.Transition.SCALE;
                        item.getComponent(cc.Button).duration = 0.1;
                        item.getComponent(cc.Button).zoomScale = 0.9;
                        item.on(cc.Node.EventType.TOUCH_END, function () {
                            if (PropManager_1.PropManager.getInstance().changePropNum(storeItemInfo.CostItemID, -(storeItemInfo.CostNum * discountNum_1 * 0.1))) {
                                TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.商店中购买物品1次);
                                TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.前往商城购买X次商品);
                                PropManager_1.PropManager.getInstance().changePropNum(storeItemInfo.GetItem, storeItemInfo.GetNum);
                                HttpManager_1.HttpManager.post(HttpManager_1.AccessName.saveGameTask, _this.getSaveGameTaskJsonString(k));
                                var reward_2 = PropManager_1.PropManager.getInstance().createPropItem(storeItemInfo.GetItem, storeItemInfo.GetNum);
                                var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.StoreDailyShopNum + k, 0);
                                num++;
                                if (storeItemInfo.CostItemID == PropConfig_1.PropId.Coin) {
                                    FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.在每日商店中消耗的金币数量, (storeItemInfo.CostNum * discountNum_1 * 0.1));
                                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.在每日商店中使用金币购买物品的次数);
                                }
                                else {
                                    FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.在每日商店中消耗的钻石数量, (storeItemInfo.CostNum * discountNum_1 * 0.1));
                                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.在每日商店中使用钻石购买物品的次数);
                                }
                                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.StoreDailyShopNum + k, num);
                                if (num >= storeItemInfo.AdPlayableTimes) {
                                    item.getChildByName("costIcon").active = false;
                                    item.getChildByName("price").active = false;
                                    item.getChildByName("discountNum").active = false;
                                    item.getChildByName("discountIcon").active = false;
                                    item.getChildByName("saleOut").zIndex = 1;
                                    item.getChildByName("saleOut").active = true;
                                    var type = Item_1.ItemManager.getInstance().getType(storeItemInfo.GetItem);
                                    if (type == 3) {
                                        item.getChildByName("reward").getComponent(EquipItem_1.default).prop_action = PropConfig_1.PropAction.Null;
                                    }
                                    else {
                                        item.getChildByName("reward").getComponent(Prop_1.default).prop_action = PropConfig_1.PropAction.Null;
                                    }
                                    item.off(cc.Node.EventType.TOUCH_END);
                                }
                                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.每日商店中成功购买物品的次数);
                                GameManager_1.default.getInstance().showGetTip(reward_2);
                            }
                            else {
                                if (storeItemInfo.CostItemID == PropConfig_1.PropId.Coin) {
                                    UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.CoinPop, UIConfig_1.UILayerLevel.Three, {
                                        onCompleted: function (uiNode) {
                                            uiNode.getComponent(CoinPop_1.default).initUi(PropConfig_1.PropId.Coin);
                                        },
                                    });
                                }
                                else {
                                    UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.CoinPop, UIConfig_1.UILayerLevel.Three, {
                                        onCompleted: function (uiNode) {
                                            uiNode.getComponent(CoinPop_1.default).initUi(PropConfig_1.PropId.Gem);
                                        },
                                    });
                                }
                                // GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100041));
                                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.每日商店中购买失败的次数);
                            }
                        });
                    }
                    else {
                        // 有折扣直接读取折扣的大小
                        var discountNum_2 = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.StoreDailyShopDiscount + k);
                        item.getChildByName("free").active = false;
                        item.getChildByName("red").active = false;
                        EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Shop);
                        item.getChildByName("costIcon").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(storeItemInfo.CostItemID);
                        item.getChildByName("price").getComponent(cc.Label).string = 'x' + MyTool_1.default.getCoinDanwei(storeItemInfo.CostNum * discountNum_2 * 0.1);
                        item.getChildByName("name").getComponent(TextLanguage_1.default).setTextId(Item_1.ItemManager.getInstance().getNameTextId(storeItemInfo.GetItem));
                        item.getChildByName("discountNum").getComponent(TextLanguage_1.default).setReplaceValue('~', (100 - discountNum_2 * 10) + '');
                        var reward = PropManager_1.PropManager.getInstance().createPropItem(storeItemInfo.GetItem, storeItemInfo.GetNum);
                        reward.name = 'reward';
                        item.addChild(reward);
                        item.addComponent(cc.Button).transition = cc.Button.Transition.SCALE;
                        item.getComponent(cc.Button).duration = 0.1;
                        item.getComponent(cc.Button).zoomScale = 0.9;
                        item.on(cc.Node.EventType.TOUCH_END, function () {
                            if (PropManager_1.PropManager.getInstance().changePropNum(storeItemInfo.CostItemID, -(storeItemInfo.CostNum * discountNum_2 * 0.1))) {
                                TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.商店中购买物品1次);
                                TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.前往商城购买X次商品);
                                PropManager_1.PropManager.getInstance().changePropNum(storeItemInfo.GetItem, storeItemInfo.GetNum);
                                HttpManager_1.HttpManager.post(HttpManager_1.AccessName.saveGameTask, _this.getSaveGameTaskJsonString(k));
                                var reward_3 = PropManager_1.PropManager.getInstance().createPropItem(storeItemInfo.GetItem, storeItemInfo.GetNum);
                                var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.StoreDailyShopNum + k, 0);
                                num++;
                                if (storeItemInfo.CostItemID == PropConfig_1.PropId.Coin) {
                                    FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.在每日商店中消耗的金币数量, (storeItemInfo.CostNum * discountNum_2 * 0.1));
                                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.在每日商店中使用金币购买物品的次数);
                                }
                                else {
                                    FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.在每日商店中消耗的钻石数量, (storeItemInfo.CostNum * discountNum_2 * 0.1));
                                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.在每日商店中使用钻石购买物品的次数);
                                }
                                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.StoreDailyShopNum + k, num);
                                if (num >= storeItemInfo.AdPlayableTimes) {
                                    item.getChildByName("costIcon").active = false;
                                    item.getChildByName("price").active = false;
                                    item.getChildByName("discountNum").active = false;
                                    item.getChildByName("discountIcon").active = false;
                                    item.getChildByName("saleOut").zIndex = 1;
                                    item.getChildByName("saleOut").active = true;
                                    var type = Item_1.ItemManager.getInstance().getType(storeItemInfo.GetItem);
                                    if (type == 3) {
                                        item.getChildByName("reward").getComponent(EquipItem_1.default).prop_action = PropConfig_1.PropAction.Null;
                                    }
                                    else {
                                        item.getChildByName("reward").getComponent(Prop_1.default).prop_action = PropConfig_1.PropAction.Null;
                                    }
                                    item.off(cc.Node.EventType.TOUCH_END);
                                }
                                GameManager_1.default.getInstance().showGetTip(reward_3);
                                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.每日商店中成功购买物品的次数);
                            }
                            else {
                                if (storeItemInfo.CostItemID == PropConfig_1.PropId.Coin) {
                                    UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.CoinPop, UIConfig_1.UILayerLevel.Three, {
                                        onCompleted: function (uiNode) {
                                            uiNode.getComponent(CoinPop_1.default).initUi(PropConfig_1.PropId.Coin);
                                        },
                                    });
                                    // FollowManager.getInstance().addTotal(Follow_Type.在每日商店中消耗的金币数量,(storeItemInfo.CostNum * discountNum * 0.1))
                                    // FollowManager.getInstance().followEvent(Follow_Type.在每日商店中使用金币购买物品的次数);
                                }
                                else {
                                    UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.CoinPop, UIConfig_1.UILayerLevel.Three, {
                                        onCompleted: function (uiNode) {
                                            uiNode.getComponent(CoinPop_1.default).initUi(PropConfig_1.PropId.Gem);
                                        },
                                    });
                                    // FollowManager.getInstance().addTotal(Follow_Type.在每日商店中消耗的钻石数量,(storeItemInfo.CostNum * discountNum * 0.1))
                                    // FollowManager.getInstance().followEvent(Follow_Type.在每日商店中使用钻石购买物品的次数);
                                }
                                // GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100041));
                                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.每日商店中购买失败的次数);
                            }
                        });
                    }
                }
            }
            else {
                // 不可购买
                item.getChildByName("costIcon").active = false;
                item.getChildByName("price").active = false;
                item.getChildByName("discountNum").active = false;
                item.getChildByName("discountIcon").active = false;
                item.getChildByName("free").active = false;
                item.getChildByName("red").active = false;
                EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Shop);
                var reward = PropManager_1.PropManager.getInstance().createPropItem(storeItemInfo.GetItem, storeItemInfo.GetNum, PropConfig_1.PropAction.Null);
                item.addChild(reward);
                item.getChildByName("name").getComponent(TextLanguage_1.default).setTextId(Item_1.ItemManager.getInstance().getNameTextId(storeItemInfo.GetItem));
                item.getChildByName("saleOut").zIndex = 1;
                item.getChildByName("saleOut").active = true;
            }
            dailyStoreRoot.addChild(item);
        });
        //#endregion
        // 神秘商店
        //#region 
        title = cc.instantiate(this.store_title);
        title.getComponentInChildren(TextLanguage_1.default).setTextId(1460011);
        title.name = "mysteryTitle";
        content.addChild(title);
        var mysteryRoot = new cc.Node();
        mysteryRoot.name = 'mysteryRoot';
        mysteryRoot.height = this.store_equip_item.data.height + 20;
        mysteryRoot.width = this.node.width;
        var mysteryLayout = mysteryRoot.addComponent(cc.Layout);
        mysteryLayout.type = cc.Layout.Type.HORIZONTAL;
        mysteryLayout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
        mysteryLayout.paddingRight = 40;
        mysteryLayout.paddingLeft = 40;
        mysteryLayout.spacingX = 20;
        var petItem = cc.instantiate(this.store_pet_item);
        petItem.getChildByName("richBg").children[1].children[1].getComponent(cc.Label).string = "X" + PropManager_1.PropManager.getInstance().getPropNum(40006);
        this.pet_instance = petItem;
        petItem.getChildByName("richBg").getComponentInChildren(cc.RichText).string = LanguageManager_1.default.getInstance().getStrByTextId(1460005);
        var prizePetData = DrawCardInformation_1.DrawCardInformationManager.getInstance().getJsonDrawCardInformation(3001);
        if (PropManager_1.PropManager.getInstance().getPropNum(prizePetData.OneDrawPropsID_1) >= prizePetData.OneDrawPropsSpend_1) {
            petItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_1);
            petItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizePetData.OneDrawPropsSpend_1;
        }
        else {
            petItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_2);
            petItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizePetData.OneDrawPropsSpend_2;
        }
        if (PropManager_1.PropManager.getInstance().getPropNum(prizePetData.OneDrawPropsID_1) >= prizePetData.TenDrawPropsSpend_1) {
            petItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_1);
            petItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizePetData.TenDrawPropsSpend_1;
        }
        else {
            petItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_2);
            petItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizePetData.TenDrawPropsSpend_2;
        }
        var oneDayTime = 60 * 60 * 24 * 1000;
        var currentTime = Date.now();
        if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.StoreMysteryPetFreeTime, 0) + oneDayTime - currentTime <= 0) {
            // 免费
            petItem.getChildByName("num1").active = false;
            petItem.getChildByName("free").active = true;
            petItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = this.store_ui.getSpriteFrame("Shop_Icon_ADS");
        }
        else {
            petItem.getChildByName("num1").active = true;
            petItem.getChildByName("free").active = false;
        }
        var petBtn1 = petItem.getChildByName("btn1");
        var petBtn10 = petItem.getChildByName("btn10");
        petBtn1.getChildByName('red').active = GameData_1.default.getInstance().getPetRecruitingRedTip();
        petBtn1.addComponent(cc.Button).transition = cc.Button.Transition.SCALE;
        petBtn1.getComponent(cc.Button).duration = 0.1;
        petBtn1.getComponent(cc.Button).zoomScale = 0.9;
        petBtn10.addComponent(cc.Button).transition = cc.Button.Transition.SCALE;
        petBtn10.getComponent(cc.Button).duration = 0.1;
        petBtn10.getComponent(cc.Button).zoomScale = 0.9;
        petBtn1.on(cc.Node.EventType.TOUCH_END, function () {
            // 暂未开放处理
            // let s = LanguageManager.getInstance().getStrByTextId(100113);
            // GameManager.getInstance().showMessage(s);
            // return;
            if (FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlock(Constants_1.FuncType.PetParadise) == false) {
                var unlockType = FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockConditionType(Constants_1.FuncType.PetParadise);
                var s = '';
                if (unlockType == 1) {
                    s = LanguageManager_1.default.getInstance().getStrByTextId(100051);
                    s = s.replace('.', '.' + (FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(Constants_1.FuncType.PetParadise)) + '');
                }
                else {
                    s = LanguageManager_1.default.getInstance().getStrByTextId(100052);
                    s = s.replace('~', (MissionLevel_1.MissionLevelManager.getInstance().getLevelName((FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(Constants_1.FuncType.PetParadise)))) + '');
                }
                GameManager_1.default.getInstance().showMessage(s);
                return;
            }
            var costId = 0;
            var costNum = 0;
            if (PropManager_1.PropManager.getInstance().getPropNum(prizePetData.OneDrawPropsID_1) >= prizePetData.OneDrawPropsSpend_1) {
                costId = prizePetData.OneDrawPropsID_1;
                costNum = prizePetData.OneDrawPropsSpend_1;
            }
            else {
                costId = prizePetData.OneDrawPropsID_2;
                costNum = prizePetData.OneDrawPropsSpend_2;
            }
            var oneDayTime = 60 * 60 * 24 * 1000;
            var currentTime = Date.now();
            if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.StoreMysteryPetFreeTime, 0) + oneDayTime - currentTime <= 0) {
                // 免费
                costNum = 0;
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.StoreMysteryPetFreeTime, currentTime);
                if (PropManager_1.PropManager.getInstance().getPropNum(prizePetData.OneDrawPropsID_1) >= prizePetData.OneDrawPropsSpend_1) {
                    petItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_1);
                    petItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizePetData.OneDrawPropsSpend_1;
                }
                else {
                    petItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_2);
                    petItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizePetData.OneDrawPropsSpend_2;
                }
                petItem.getChildByName("num1").active = true;
                petItem.getChildByName("free").active = false;
                ApkManager_1.default.getInstance().showVideo(function (isTrue) {
                    if (isTrue) {
                        costNum = 0;
                        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.StoreMysteryPetFreeTime, currentTime);
                        if (PropManager_1.PropManager.getInstance().getPropNum(prizePetData.OneDrawPropsID_1) >= prizePetData.OneDrawPropsSpend_1) {
                            petItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_1);
                            petItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizePetData.OneDrawPropsSpend_1;
                        }
                        else {
                            petItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_2);
                            petItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizePetData.OneDrawPropsSpend_2;
                        }
                        petItem.getChildByName("num1").active = true;
                        petItem.getChildByName("free").active = false;
                        petBtn1.getChildByName('red').active = GameData_1.default.getInstance().getPetRecruitingRedTip();
                        EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Shop);
                        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.tryPrize, _this.getPrizeJsonString(1, 3, costId, costNum), true).then(function (data) {
                            if (data) {
                                // FollowManager.getInstance().followEvent(Follow_Type.记录开启1次宠物的次数);
                                // TaskManager.getInstance().emitTask(TaskItem.进行1次开启装备);
                                TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.累计孵化灵宠蛋X次);
                                TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.前往商城孵化X次宠物);
                                TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.进行1次宠物招募);
                                TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.进行10次宠物孵化);
                                var rewardItem = PropManager_1.PropManager.getInstance().createPropItem(data[0].dropId, data[0].dropNum);
                                PropManager_1.PropManager.getInstance().changePropNum(data[0].dropId, data[0].dropNum);
                                PropManager_1.PropManager.getInstance().saveAllPropNum();
                                GameManager_1.default.getInstance().showGetTip(rewardItem);
                                if (PropManager_1.PropManager.getInstance().getPropNum(prizePetData.OneDrawPropsID_1) >= prizePetData.OneDrawPropsSpend_1) {
                                    petItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_1);
                                    petItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizePetData.OneDrawPropsSpend_1;
                                }
                                else {
                                    petItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_2);
                                    petItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizePetData.OneDrawPropsSpend_2;
                                }
                                if (PropManager_1.PropManager.getInstance().getPropNum(prizePetData.OneDrawPropsID_1) >= prizePetData.TenDrawPropsSpend_1) {
                                    petItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_1);
                                    petItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizePetData.TenDrawPropsSpend_1;
                                }
                                else {
                                    petItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_2);
                                    petItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizePetData.TenDrawPropsSpend_2;
                                }
                                if (PropManager_1.PropManager.getInstance().getPropNum(prizePetData.OneDrawPropsID_1) >= prizePetData.OneDrawPropsSpend_1) {
                                    petItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_1);
                                    petItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizePetData.OneDrawPropsSpend_1;
                                }
                                else {
                                    petItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_2);
                                    petItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizePetData.OneDrawPropsSpend_2;
                                }
                            }
                        });
                    }
                    else {
                        // GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(1));
                    }
                }, Constants_1.VIDEO_TYPE.Equip);
            }
            else {
                if (PropManager_1.PropManager.getInstance().getPropNum(costId) < costNum) {
                    GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100041));
                    _this.node.getChildByName("scroll").getComponent(cc.ScrollView).scrollToBottom(2);
                    return;
                }
                HttpManager_1.HttpManager.post(HttpManager_1.AccessName.tryPrize, _this.getPrizeJsonString(1, 3, costId, costNum), true).then(function (data) {
                    if (data) {
                        TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.累计孵化灵宠蛋X次);
                        TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.前往商城孵化X次宠物);
                        TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.进行1次宠物招募);
                        TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.进行10次宠物孵化);
                        PropManager_1.PropManager.getInstance().changePropNum(costId, -costNum);
                        GameManager_1.default.getInstance().refreshGemShow();
                        var rewardItem = PropManager_1.PropManager.getInstance().createPropItem(data[0].dropId, data[0].dropNum);
                        PropManager_1.PropManager.getInstance().changePropNum(data[0].dropId, data[0].dropNum);
                        PropManager_1.PropManager.getInstance().saveAllPropNum();
                        GameManager_1.default.getInstance().showGetTip(rewardItem);
                        if (PropManager_1.PropManager.getInstance().getPropNum(prizePetData.OneDrawPropsID_1) >= prizePetData.OneDrawPropsSpend_1) {
                            petItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_1);
                            petItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizePetData.OneDrawPropsSpend_1;
                        }
                        else {
                            petItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_2);
                            petItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizePetData.OneDrawPropsSpend_2;
                        }
                        if (PropManager_1.PropManager.getInstance().getPropNum(prizePetData.OneDrawPropsID_1) >= prizePetData.TenDrawPropsSpend_1) {
                            petItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_1);
                            petItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizePetData.TenDrawPropsSpend_1;
                        }
                        else {
                            petItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_2);
                            petItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizePetData.TenDrawPropsSpend_2;
                        }
                        if (PropManager_1.PropManager.getInstance().getPropNum(prizePetData.OneDrawPropsID_1) >= prizePetData.OneDrawPropsSpend_1) {
                            petItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_1);
                            petItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizePetData.OneDrawPropsSpend_1;
                        }
                        else {
                            petItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_2);
                            petItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizePetData.OneDrawPropsSpend_2;
                        }
                    }
                });
            }
        });
        petBtn10.on(cc.Node.EventType.TOUCH_END, function () {
            // 暂未开放处理
            // let s = LanguageManager.getInstance().getStrByTextId(100113);
            // GameManager.getInstance().showMessage(s);
            // return;
            if (FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlock(Constants_1.FuncType.PetParadise) == false) {
                var unlockType = FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockConditionType(Constants_1.FuncType.PetParadise);
                var s = '';
                if (unlockType == 1) {
                    s = LanguageManager_1.default.getInstance().getStrByTextId(100051);
                    s = s.replace('.', '.' + (FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(Constants_1.FuncType.PetParadise)) + '');
                }
                else {
                    s = LanguageManager_1.default.getInstance().getStrByTextId(100052);
                    s = s.replace('~', (MissionLevel_1.MissionLevelManager.getInstance().getLevelName((FunctionDefinition_1.FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(Constants_1.FuncType.PetParadise)))) + '');
                }
                GameManager_1.default.getInstance().showMessage(s);
                return;
            }
            var costId = 0;
            var costNum = 0;
            if (PropManager_1.PropManager.getInstance().getPropNum(prizePetData.OneDrawPropsID_1) >= prizePetData.TenDrawPropsSpend_1) {
                costId = prizePetData.OneDrawPropsID_1;
                costNum = prizePetData.TenDrawPropsSpend_1;
            }
            else {
                costId = prizePetData.OneDrawPropsID_2;
                costNum = prizePetData.TenDrawPropsSpend_2;
            }
            if (PropManager_1.PropManager.getInstance().getPropNum(costId) < costNum) {
                GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100041));
                _this.node.getChildByName("scroll").getComponent(cc.ScrollView).scrollToBottom(2);
                return;
            }
            // if(IsDebug) costNum = 0;   
            HttpManager_1.HttpManager.post(HttpManager_1.AccessName.tryPrize, _this.getPrizeJsonString(2, 3, costId, costNum), true).then(function (data) {
                if (data) {
                    PropManager_1.PropManager.getInstance().changePropNum(costId, -costNum);
                    GameManager_1.default.getInstance().refreshGemShow();
                    var length = data.length;
                    var rewardList = [];
                    var tempIndex = MyTool_1.default.randomRangeInt(0, 9);
                    var temp = data[9];
                    data[9] = data[tempIndex];
                    data[tempIndex] = temp;
                    for (var i = 0; i < length; i++) {
                        var rewardItem = PropManager_1.PropManager.getInstance().createPropItem(data[i].dropId, data[i].dropNum);
                        PropManager_1.PropManager.getInstance().changePropNum(data[i].dropId, data[i].dropNum);
                        rewardList.push(rewardItem);
                        TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.前往商城孵化X次宠物);
                        TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.进行1次宠物招募);
                        TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.进行10次宠物孵化);
                        TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.累计孵化灵宠蛋X次);
                    }
                    PropManager_1.PropManager.getInstance().saveAllPropNum();
                    GameManager_1.default.getInstance().showMultipleGetTip(rewardList);
                }
            });
        });
        mysteryRoot.addChild(petItem);
        var equipItem = cc.instantiate(this.store_equip_item);
        equipItem.getChildByName("richBg").children[1].children[1].getComponent(cc.Label).string = "X" + PropManager_1.PropManager.getInstance().getPropNum(40005);
        this.weapon_instance = equipItem;
        equipItem.getChildByName("richBg").getComponentInChildren(cc.RichText).string = LanguageManager_1.default.getInstance().getStrByTextId(1460006);
        var prizeEquipData = DrawCardInformation_1.DrawCardInformationManager.getInstance().getJsonDrawCardInformation(2001);
        if (PropManager_1.PropManager.getInstance().getPropNum(prizeEquipData.OneDrawPropsID_1) >= prizeEquipData.OneDrawPropsSpend_1) {
            equipItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_1);
            equipItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeEquipData.OneDrawPropsSpend_1;
        }
        else {
            equipItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_2);
            equipItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeEquipData.OneDrawPropsSpend_2;
        }
        if (PropManager_1.PropManager.getInstance().getPropNum(prizeEquipData.OneDrawPropsID_1) >= prizeEquipData.TenDrawPropsSpend_1) {
            equipItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_1);
            equipItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeEquipData.TenDrawPropsSpend_1;
        }
        else {
            equipItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_2);
            equipItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeEquipData.TenDrawPropsSpend_2;
        }
        // oneDayTime = 60*60*24*1000;
        currentTime = Date.now();
        if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.StoreMysteryEquipFreeTime, 0) + oneDayTime - currentTime <= 0) {
            // 免费
            equipItem.getChildByName("num1").active = false;
            equipItem.getChildByName("free").active = true;
            equipItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = this.store_ui.getSpriteFrame("Shop_Icon_ADS");
        }
        else {
            equipItem.getChildByName("num1").active = true;
            equipItem.getChildByName("free").active = false;
        }
        var equipBtn1 = equipItem.getChildByName("btn1");
        var equipBtn10 = equipItem.getChildByName("btn10");
        equipBtn1.getChildByName('red').active = GameData_1.default.getInstance().getEquipFreeRedTip();
        equipBtn1.addComponent(cc.Button).transition = cc.Button.Transition.SCALE;
        equipBtn1.getComponent(cc.Button).duration = 0.1;
        equipBtn1.getComponent(cc.Button).zoomScale = 0.9;
        equipBtn10.addComponent(cc.Button).transition = cc.Button.Transition.SCALE;
        equipBtn10.getComponent(cc.Button).duration = 0.1;
        equipBtn10.getComponent(cc.Button).zoomScale = 0.9;
        equipBtn1.on(cc.Node.EventType.TOUCH_END, function () {
            var costId = 0;
            var costNum = 0;
            if (PropManager_1.PropManager.getInstance().getPropNum(prizeEquipData.OneDrawPropsID_1) >= prizeEquipData.OneDrawPropsSpend_1) {
                costId = prizeEquipData.OneDrawPropsID_1;
                costNum = prizeEquipData.OneDrawPropsSpend_1;
                // 以下为后端未存消费券的处理，当后端存储消费券时，使用上面两行代码
                // PropManager.getInstance().changePropNum(prizeEquipData.OneDrawPropsID_1,-prizeEquipData.OneDrawPropsSpend_1);
                // costId = prizeEquipData.OneDrawPropsID_2;
                // costNum = 0;
                FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.记录消耗的钥匙数量, prizeEquipData.OneDrawPropsSpend_1);
            }
            else {
                costId = prizeEquipData.OneDrawPropsID_2;
                costNum = prizeEquipData.OneDrawPropsSpend_2;
                FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.记录消耗宝石数量, costNum);
            }
            var oneDayTime = 60 * 60 * 24 * 1000;
            var currentTime = Date.now();
            if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.StoreMysteryEquipFreeTime, 0) + oneDayTime - currentTime <= 0) {
                // 免费
                ApkManager_1.default.getInstance().showVideo(function (isTrue) {
                    if (isTrue) {
                        costNum = 0;
                        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.StoreMysteryEquipFreeTime, currentTime);
                        // if(PropManager.getInstance().getPropNum(prizeEquipData.OneDrawPropsID_1) >= prizeEquipData.OneDrawPropsSpend_1){
                        //     equipItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_1);
                        //     equipItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeEquipData.OneDrawPropsSpend_1;
                        // }else{
                        //     equipItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_2);
                        //     equipItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeEquipData.OneDrawPropsSpend_2;
                        // }
                        equipBtn1.getChildByName('red').active = GameData_1.default.getInstance().getEquipFreeRedTip();
                        EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Shop);
                        equipItem.getChildByName("num1").active = true;
                        equipItem.getChildByName("free").active = false;
                        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.tryPrize, _this.getPrizeJsonString(1, 2, costId, costNum), true).then(function (data) {
                            if (data) {
                                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.记录开启1次装备的次数);
                                TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.进行1次开启装备);
                                TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.进行10次开启装备);
                                TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.累计获得X件装备);
                                var rewardItem = PropManager_1.PropManager.getInstance().createPropItem(data[0].dropId, data[0].dropNum);
                                PropManager_1.PropManager.getInstance().changePropNum(data[0].dropId, data[0].dropNum);
                                PropManager_1.PropManager.getInstance().saveAllPropNum();
                                GameManager_1.default.getInstance().showGetTip(rewardItem);
                                if (PropManager_1.PropManager.getInstance().getPropNum(prizeEquipData.OneDrawPropsID_1) >= prizeEquipData.OneDrawPropsSpend_1) {
                                    equipItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_1);
                                    equipItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeEquipData.OneDrawPropsSpend_1;
                                }
                                else {
                                    equipItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_2);
                                    equipItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeEquipData.OneDrawPropsSpend_2;
                                }
                                if (PropManager_1.PropManager.getInstance().getPropNum(prizeEquipData.OneDrawPropsID_1) >= prizeEquipData.TenDrawPropsSpend_1) {
                                    equipItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_1);
                                    equipItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeEquipData.TenDrawPropsSpend_1;
                                }
                                else {
                                    equipItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_2);
                                    equipItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeEquipData.TenDrawPropsSpend_2;
                                }
                                // if(PropManager.getInstance().getPropNum(prizeEquipData.OneDrawPropsID_1) >= prizeEquipData.OneDrawPropsSpend_1){
                                //     equipItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_1);
                                //     equipItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeEquipData.OneDrawPropsSpend_1;
                                // }else{
                                //     equipItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_2);
                                //     equipItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeEquipData.OneDrawPropsSpend_2;
                                // }
                            }
                        });
                    }
                    else {
                        GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(1));
                    }
                }, Constants_1.VIDEO_TYPE.Equip);
            }
            else {
                if (PropManager_1.PropManager.getInstance().getPropNum(costId) < costNum) {
                    GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100041));
                    _this.node.getChildByName("scroll").getComponent(cc.ScrollView).scrollToBottom(2);
                    return;
                }
                HttpManager_1.HttpManager.post(HttpManager_1.AccessName.tryPrize, _this.getPrizeJsonString(1, 2, costId, costNum), true).then(function (data) {
                    if (data) {
                        PropManager_1.PropManager.getInstance().changePropNum(costId, -costNum);
                        GameManager_1.default.getInstance().refreshGemShow();
                        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.记录开启1次装备的次数);
                        TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.进行1次开启装备);
                        TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.进行10次开启装备);
                        TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.累计获得X件装备);
                        var rewardItem = PropManager_1.PropManager.getInstance().createPropItem(data[0].dropId, data[0].dropNum);
                        PropManager_1.PropManager.getInstance().changePropNum(data[0].dropId, data[0].dropNum);
                        PropManager_1.PropManager.getInstance().saveAllPropNum();
                        GameManager_1.default.getInstance().showGetTip(rewardItem);
                        if (PropManager_1.PropManager.getInstance().getPropNum(prizeEquipData.OneDrawPropsID_1) >= prizeEquipData.OneDrawPropsSpend_1) {
                            equipItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_1);
                            equipItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeEquipData.OneDrawPropsSpend_1;
                        }
                        else {
                            equipItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_2);
                            equipItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeEquipData.OneDrawPropsSpend_2;
                        }
                        if (PropManager_1.PropManager.getInstance().getPropNum(prizeEquipData.OneDrawPropsID_1) >= prizeEquipData.TenDrawPropsSpend_1) {
                            equipItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_1);
                            equipItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeEquipData.TenDrawPropsSpend_1;
                        }
                        else {
                            equipItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_2);
                            equipItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeEquipData.TenDrawPropsSpend_2;
                        }
                        // if(PropManager.getInstance().getPropNum(prizeEquipData.OneDrawPropsID_1) >= prizeEquipData.OneDrawPropsSpend_1){
                        //     equipItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_1);
                        //     equipItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeEquipData.OneDrawPropsSpend_1;
                        // }else{
                        //     equipItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_2);
                        //     equipItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeEquipData.OneDrawPropsSpend_2;
                        // }
                        if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.StoreMysteryEquipFreeTime, 0) + oneDayTime - currentTime <= 0) {
                            // 免费
                            equipItem.getChildByName("num1").active = false;
                            equipItem.getChildByName("free").active = true;
                            equipItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = _this.store_ui.getSpriteFrame("Shop_Icon_ADS");
                        }
                        else {
                            equipItem.getChildByName("num1").active = true;
                            equipItem.getChildByName("free").active = false;
                        }
                    }
                });
            }
            // if(IsDebug) costNum = 0;
        });
        equipBtn10.on(cc.Node.EventType.TOUCH_END, function () {
            var costId = 0;
            var costNum = 0;
            if (PropManager_1.PropManager.getInstance().getPropNum(prizeEquipData.OneDrawPropsID_1) >= prizeEquipData.TenDrawPropsSpend_1) {
                // costId = prizeEquipData.OneDrawPropsID_1;
                // costNum = prizeEquipData.TenDrawPropsSpend_1;
                // 以下为后端未存消费券的处理，当后端存储消费券时，使用上面两行代码
                PropManager_1.PropManager.getInstance().changePropNum(prizeEquipData.OneDrawPropsID_1, -prizeEquipData.TenDrawPropsSpend_1);
                costId = prizeEquipData.OneDrawPropsID_2;
                costNum = 0;
                FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.记录消耗的钥匙数量, prizeEquipData.TenDrawPropsSpend_1);
            }
            else {
                costId = prizeEquipData.OneDrawPropsID_2;
                costNum = prizeEquipData.TenDrawPropsSpend_2;
                FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.记录消耗宝石数量, costNum);
            }
            if (PropManager_1.PropManager.getInstance().getPropNum(costId) < costNum) {
                GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100041));
                _this.node.getChildByName("scroll").getComponent(cc.ScrollView).scrollToBottom(2);
                return;
            }
            // if(IsDebug) costNum = 0;   
            HttpManager_1.HttpManager.post(HttpManager_1.AccessName.tryPrize, _this.getPrizeJsonString(2, 2, costId, costNum), true).then(function (data) {
                if (data) {
                    PropManager_1.PropManager.getInstance().changePropNum(costId, -costNum);
                    GameManager_1.default.getInstance().refreshGemShow();
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.记录开启10次装备的次数);
                    var length = data.length;
                    var rewardList = [];
                    var tempIndex = MyTool_1.default.randomRangeInt(0, 9);
                    var temp = data[9];
                    data[9] = data[tempIndex];
                    data[tempIndex] = temp;
                    for (var i = 0; i < length; i++) {
                        TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.进行1次开启装备);
                        TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.进行10次开启装备);
                        TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.累计获得X件装备);
                        var rewardItem = PropManager_1.PropManager.getInstance().createPropItem(data[i].dropId, data[i].dropNum);
                        PropManager_1.PropManager.getInstance().changePropNum(data[i].dropId, data[i].dropNum);
                        rewardList.push(rewardItem);
                    }
                    GameManager_1.default.getInstance().showMultipleGetTip(rewardList);
                    PropManager_1.PropManager.getInstance().saveAllPropNum();
                    if (PropManager_1.PropManager.getInstance().getPropNum(prizeEquipData.OneDrawPropsID_1) >= prizeEquipData.OneDrawPropsSpend_1) {
                        equipItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_1);
                        equipItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeEquipData.OneDrawPropsSpend_1;
                    }
                    else {
                        equipItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_2);
                        equipItem.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeEquipData.OneDrawPropsSpend_2;
                    }
                    if (PropManager_1.PropManager.getInstance().getPropNum(prizeEquipData.OneDrawPropsID_1) >= prizeEquipData.TenDrawPropsSpend_1) {
                        equipItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_1);
                        equipItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeEquipData.TenDrawPropsSpend_1;
                    }
                    else {
                        equipItem.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_2);
                        equipItem.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeEquipData.TenDrawPropsSpend_2;
                    }
                    if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.StoreMysteryEquipFreeTime, 0) + oneDayTime - currentTime <= 0) {
                        // 免费
                        equipItem.getChildByName("num1").active = false;
                        equipItem.getChildByName("free").active = true;
                        equipItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = _this.store_ui.getSpriteFrame("Shop_Icon_ADS");
                    }
                    else {
                        equipItem.getChildByName("num1").active = true;
                        equipItem.getChildByName("free").active = false;
                    }
                }
            });
        });
        mysteryRoot.addChild(equipItem);
        content.addChild(mysteryRoot);
        //#endregion
        // 钻石
        //#region 
        title = cc.instantiate(this.store_title);
        title.getComponentInChildren(TextLanguage_1.default).setTextId(400002);
        title.name = "gemTitle";
        content.addChild(title);
        var gemRoot = new cc.Node();
        gemRoot.name = 'gemRoot';
        gemRoot.height = this.store_gem_item.data.height * 2 + 10;
        gemRoot.width = this.node.width;
        content.addChild(gemRoot);
        var gemLayout = gemRoot.addComponent(cc.Layout);
        gemLayout.type = cc.Layout.Type.GRID;
        gemLayout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
        gemLayout.paddingRight = 40;
        gemLayout.paddingLeft = 40;
        gemLayout.spacingX = 20;
        gemLayout.spacingY = 20;
        var gemData = DiamondsRecharge_1.DiamondsRechargeManager.getInstance().getJsonData();
        gemData.forEach(function (v, k) {
            var item = cc.instantiate(_this.store_gem_item);
            item.name = 'gem' + v.RechargeID;
            item.getChildByName("title").getComponent(TextLanguage_1.default).setTextId(400002);
            item.getChildByName("title").getComponent(TextLanguage_1.default).string = v.DiamondsNum + item.getChildByName("title").getComponent(TextLanguage_1.default).string;
            var payInfo = PayManager_1.PayManager.getInstance().getPayInfo(v.ProductId);
            item.getChildByName("num").getComponent(cc.Label).string = payInfo.price;
            item.getChildByName('icon').getComponent(cc.Sprite).spriteFrame = _this.store_ui.getSpriteFrame("Shop_Icon_Gem_" + (v.RechargeID - 1));
            if (StorageManager_1.TheStorageManager.getInstance().getString(StorageConfig_1.StorageKey.StoreGemItem + v.RechargeID, '') == '') {
                item.getChildByName('bg').active = true;
                item.getChildByName('tip').active = true;
                item.getChildByName("tip").getComponent(TextLanguage_1.default).setTextId(1410004);
                item.getChildByName("tip").getComponent(TextLanguage_1.default).setReplaceValue('~', v.GetDiamondsNum + '');
            }
            else {
                item.getChildByName('bg').active = false;
                item.getChildByName('tip').active = false;
            }
            var button = item.addComponent(cc.Button);
            button.transition = cc.Button.Transition.SCALE;
            button.duration = 0.1;
            button.zoomScale = 0.9;
            var clickEvent = new cc.Component.EventHandler();
            clickEvent.target = _this.node;
            clickEvent.component = 'StoreUi';
            clickEvent.handler = 'onGemBtnClick';
            clickEvent.customEventData = v.RechargeID + '';
            button.clickEvents.push(clickEvent);
            // button
            // item.on(cc.Node.EventType.TOUCH_END,()=>{
            //     ApkManager.getInstance().showPay({
            //         result:(isDy)=> {
            //             if(isDy){
            //                 FollowManager.getInstance().followEvent(Follow_Type.x钻石点击购买次数 + v.ProductId);
            //                 if(TheStorageManager.getInstance().getString(StorageKey.StoreGemItem + v.RechargeID,'') == ''){
            //                     let reward = PropManager.getInstance().createPropItem(PropId.Gem,v.DiamondsNum + v.GetDiamondsNum);
            //                     PropManager.getInstance().changePropNum(PropId.Gem,v.DiamondsNum + v.GetDiamondsNum);
            //                     TheStorageManager.getInstance().setItem(StorageKey.StoreGemItem + v.RechargeID,'1');
            //                     item.getChildByName('bg').active = false;
            //                     item.getChildByName('tip').active = false;
            //                     GameManager.getInstance().showGetTip(reward);
            //                 }else{
            //                     let reward = PropManager.getInstance().createPropItem(PropId.Gem,v.DiamondsNum);
            //                     PropManager.getInstance().changePropNum(PropId.Gem,v.DiamondsNum);
            //                     GameManager.getInstance().showGetTip(reward);
            //                 }
            //             }
            //         }
            //     },v.ProductId)
            // });
            gemRoot.addChild(item);
        });
        //#endregion
        // 金币
        //#region 
        title = cc.instantiate(this.store_title);
        title.getComponentInChildren(TextLanguage_1.default).setTextId(400001);
        title.name = "coinTitle";
        content.addChild(title);
        var coinRoot = new cc.Node();
        coinRoot.name = 'coinRoot';
        coinRoot.height = this.store_coin_item.data.height + 10;
        coinRoot.width = this.node.width;
        content.addChild(coinRoot);
        var coinLayout = coinRoot.addComponent(cc.Layout);
        coinLayout.type = cc.Layout.Type.HORIZONTAL;
        coinLayout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
        coinLayout.paddingRight = 40;
        coinLayout.paddingLeft = 40;
        coinLayout.spacingX = 20;
        var coinData = PurchaseCoins_1.PurchaseCoinsManager.getInstance().getJsonDataByChapter(LevelManager_1.LevelManager.getInstance().getFinishChapter());
        coinData.forEach(function (v, k) {
            var item = cc.instantiate(_this.store_coin_item);
            item.getChildByName("title").getComponent(cc.Label).string = v.GetCoinNum + '';
            item.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = _this.store_ui.getSpriteFrame("Shop_Icon_Coin_" + v.DisplayPosition);
            if (v.AdReward == 1) {
                if (Number(StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.StoreCoinItem + k, 0)) < v.AdPlayableTimes) {
                    item.getChildByName("costIcon").getComponent(cc.Sprite).spriteFrame = _this.store_ui.getSpriteFrame("Shop_Icon_ADS");
                    item.getChildByName("num").active = false;
                    item.getChildByName("text").active = true;
                    item.getChildByName('red').active = true;
                }
                else {
                    item.getChildByName("costIcon").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(PropConfig_1.PropId.Gem);
                    item.getChildByName("num").active = true;
                    item.getChildByName("num").getComponent(cc.Label).string = 'x' + v.ConsumeDiamondsNum;
                    item.getChildByName("text").active = false;
                    item.getChildByName('red').active = false;
                }
            }
            else {
                item.getChildByName("costIcon").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(PropConfig_1.PropId.Gem);
                item.getChildByName("num").active = true;
                item.getChildByName("num").getComponent(cc.Label).string = 'x' + v.ConsumeDiamondsNum;
                item.getChildByName("text").active = false;
                item.getChildByName('red').active = false;
            }
            item.addComponent(cc.Button).transition = cc.Button.Transition.SCALE;
            item.getComponent(cc.Button).duration = 0.1;
            item.getComponent(cc.Button).zoomScale = 0.9;
            coinRoot.addChild(item);
            item.on(cc.Node.EventType.TOUCH_END, function () {
                if (v.AdReward == 1) {
                    if (Number(StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.StoreCoinItem + k, 0)) < v.AdPlayableTimes) {
                        ApkManager_1.default.getInstance().showVideo((function (isTrue) {
                            if (isTrue) {
                                TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.购买1次商店中的金币);
                                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.x金币点击购买次数 + v.CoinPurchaseID);
                                PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Coin, v.GetCoinNum);
                                var reward = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Coin, v.GetCoinNum);
                                var num = StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.StoreCoinItem + k, 0) + 1;
                                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.StoreCoinItem + k, num);
                                GameManager_1.default.getInstance().showGetTip(reward);
                                if (num >= v.AdPlayableTimes) {
                                    item.getChildByName("costIcon").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(PropConfig_1.PropId.Gem);
                                    item.getChildByName("num").active = true;
                                    item.getChildByName("num").getComponent(cc.Label).string = 'x' + v.ConsumeDiamondsNum;
                                    item.getChildByName("text").active = false;
                                    item.getChildByName('red').active = false;
                                    EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Shop);
                                }
                            }
                        }), Constants_1.VIDEO_TYPE.Coin);
                    }
                    else {
                        if (PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Gem, -v.ConsumeDiamondsNum)) {
                            TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.购买1次商店中的金币);
                            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.x金币点击购买次数 + v.CoinPurchaseID);
                            PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Coin, v.GetCoinNum);
                            var reward = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Coin, v.GetCoinNum);
                            GameManager_1.default.getInstance().showGetTip(reward);
                        }
                        else {
                            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.CoinPop, UIConfig_1.UILayerLevel.Three, {
                                onCompleted: function (uiNode) {
                                    uiNode.getComponent(CoinPop_1.default).initUi(PropConfig_1.PropId.Gem);
                                },
                            });
                        }
                    }
                }
                else {
                    if (PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Gem, -v.ConsumeDiamondsNum)) {
                        TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.购买1次商店中的金币);
                        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.x金币点击购买次数 + v.CoinPurchaseID);
                        PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Coin, v.GetCoinNum);
                        var reward = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Coin, v.GetCoinNum);
                        GameManager_1.default.getInstance().showGetTip(reward);
                    }
                    else {
                        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.CoinPop, UIConfig_1.UILayerLevel.Three, {
                            onCompleted: function (uiNode) {
                                uiNode.getComponent(CoinPop_1.default).initUi(PropConfig_1.PropId.Gem);
                            },
                        });
                    }
                }
            });
        });
        //#endregion
        // 动态刷新内容
        this.schedule(function () {
            // 每日商店刷新
            nowTime = Date.now() / 1000;
            var residueTime = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TomorowZeroTimeStamp, 0) - nowTime;
            if (residueTime < 0) {
                residueTime = ((new Date(new Date().toLocaleDateString()).getTime() + 8640000) / 1000) - nowTime;
            }
            var hh = Math.floor(residueTime / (60 * 60));
            if (hh < 10) {
                timeNum.string = '0' + hh + ':';
            }
            else {
                timeNum.string = hh + ':';
            }
            var mm = Math.floor(residueTime % (60 * 60) / 60);
            if (mm < 10) {
                timeNum.string += '0' + mm + ':';
            }
            else {
                timeNum.string += mm + ':';
            }
            var ss = Math.floor(residueTime % (60 * 60) % 60);
            if (ss < 10) {
                timeNum.string += '0' + ss;
            }
            else {
                timeNum.string += ss;
            }
            currentTime = Date.now();
            // 宠物刷新
            if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.StoreMysteryPetFreeTime, 0) + oneDayTime - currentTime <= 0 && petItem.getChildByName("num1").active == true) {
                petItem.getChildByName("num1").active = false;
                petItem.getChildByName("free").active = true;
                petItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = _this.store_ui.getSpriteFrame("Shop_Icon_ADS");
            }
            // 武器刷新
            if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.StoreMysteryEquipFreeTime, 0) + oneDayTime - currentTime <= 0 && petItem.getChildByName("num1").active == true) {
                equipItem.getChildByName("num1").active = false;
                equipItem.getChildByName("free").active = true;
                equipItem.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = _this.store_ui.getSpriteFrame("Shop_Icon_ADS");
            }
        }, 1, cc.macro.REPEAT_FOREVER, 0);
    };
    // item:cc.Node,v:JsonDiamondsRecharge
    StoreUi.prototype.onGemBtnClick = function (e, id) {
        var _this = this;
        var item = this.node.getChildByName("scroll").getComponent(cc.ScrollView).content.getChildByName("gemRoot").getChildByName("gem" + id);
        var v = DiamondsRecharge_1.DiamondsRechargeManager.getInstance().getJsonDiamondsRecharge(Number(id));
        ApkManager_1.default.getInstance().showPay({
            result: function (isDy) {
                if (isDy) {
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.x钻石点击购买次数 + v.ProductId);
                    if (StorageManager_1.TheStorageManager.getInstance().getString(StorageConfig_1.StorageKey.StoreGemItem + v.RechargeID, '') == '') {
                        var reward = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Gem, v.DiamondsNum + v.GetDiamondsNum);
                        PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Gem, v.DiamondsNum + v.GetDiamondsNum);
                        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.StoreGemItem + v.RechargeID, '1');
                        UserInfo_1.UserInfo.getInstance().payGem += v.DiamondsNum;
                        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.updateUserInfo, _this.setCumulativeRechargeJsonString(v.DiamondsNum)).then(function (data) {
                            UserInfo_1.UserInfo.getInstance().refreshData();
                            CumulativeRecharges_1.CumulativeRechargesManager.getInstance().refreshData();
                        });
                        item.getChildByName('bg').active = false;
                        item.getChildByName('tip').active = false;
                        GameManager_1.default.getInstance().showGetTip(reward);
                    }
                    else {
                        var reward = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Gem, v.DiamondsNum);
                        PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Gem, v.DiamondsNum);
                        UserInfo_1.UserInfo.getInstance().payGem += v.DiamondsNum;
                        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.updateUserInfo, _this.setCumulativeRechargeJsonString(v.DiamondsNum)).then(function (data) {
                            UserInfo_1.UserInfo.getInstance().refreshData();
                            CumulativeRecharges_1.CumulativeRechargesManager.getInstance().refreshData();
                        });
                        GameManager_1.default.getInstance().showGetTip(reward);
                    }
                }
            }
        }, v.ProductId);
    };
    StoreUi.prototype.refreshStore = function () {
        var _this = this;
        var content = this.node.getChildByName("scroll").getComponent(cc.ScrollView).content;
        var gemRoot = content.getChildByName("gemRoot");
        var gemData = DiamondsRecharge_1.DiamondsRechargeManager.getInstance().getJsonData();
        gemData.forEach(function (v, k) {
            var item = gemRoot.getChildByName('gem' + v.RechargeID);
            item.getChildByName("title").getComponent(TextLanguage_1.default).setTextId(400002);
            item.getChildByName("title").getComponent(TextLanguage_1.default).string = v.DiamondsNum + item.getChildByName("title").getComponent(TextLanguage_1.default).string;
            var payInfo = PayManager_1.PayManager.getInstance().getPayInfo(v.ProductId);
            item.getChildByName("num").getComponent(cc.Label).string = payInfo.price;
            item.getChildByName('icon').getComponent(cc.Sprite).spriteFrame = _this.store_ui.getSpriteFrame("Shop_Icon_Gem_" + (v.RechargeID - 1));
            if (StorageManager_1.TheStorageManager.getInstance().getString(StorageConfig_1.StorageKey.StoreGemItem + v.RechargeID, '') == '') {
                item.getChildByName('bg').active = true;
                item.getChildByName('tip').active = true;
                item.getChildByName("tip").getComponent(TextLanguage_1.default).setTextId(1410004);
                item.getChildByName("tip").getComponent(TextLanguage_1.default).setReplaceValue('~', v.GetDiamondsNum + '');
            }
            else {
                item.getChildByName('bg').active = false;
                item.getChildByName('tip').active = false;
            }
            // item.off(cc.Node.EventType.TOUCH_END);
            // item.on(cc.Node.EventType.TOUCH_END,()=>{
            //     item.scale = 1;
            //     ApkManager.getInstance().showPay({
            //         result:(isDy)=> {
            //             if(isDy){
            //                 FollowManager.getInstance().followEvent(Follow_Type.x钻石点击购买次数 + v.ProductId);
            //                 if(TheStorageManager.getInstance().getString(StorageKey.StoreGemItem + v.RechargeID,'') == ''){
            //                     let reward = PropManager.getInstance().createPropItem(PropId.Gem,v.DiamondsNum + v.GetDiamondsNum);
            //                     PropManager.getInstance().changePropNum(PropId.Gem,v.DiamondsNum + v.GetDiamondsNum);
            //                     TheStorageManager.getInstance().setItem(StorageKey.StoreGemItem + v.RechargeID,'1');
            //                     item.getChildByName('bg').active = false;
            //                     item.getChildByName('tip').active = false;
            //                     GameManager.getInstance().showGetTip(reward);
            //                 }else{
            //                     let reward = PropManager.getInstance().createPropItem(PropId.Gem,v.DiamondsNum);
            //                     PropManager.getInstance().changePropNum(PropId.Gem,v.DiamondsNum);
            //                     GameManager.getInstance().showGetTip(reward);
            //                 }
            //             }
            //         }
            //     },v.ProductId)
            // });
        });
    };
    StoreUi.prototype.getRandomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
    };
    /**
     *
     * @param type 抽奖类型 1-单抽 2-十连抽
     * @param drawTyep 抽奖类型 1-英雄,英雄碎片 2-装备 3-灵宠
     * @param costId 消耗道具id
     * @param costNum 消耗道具数量
     * @returns
     */
    StoreUi.prototype.getPrizeJsonString = function (type, drawTyep, costId, costNum) {
        var uid = UserData_1.default.getInstance().getUserID();
        return JSON.stringify({
            uid: uid,
            type: type,
            drawType: drawTyep,
            itemsId: costId,
            minusNum: costNum,
        });
    };
    StoreUi.prototype.onRefreshInstanceItem = function () {
        var prizeHeroData = DrawCardInformation_1.DrawCardInformationManager.getInstance().getJsonDrawCardInformation(1001);
        if (PropManager_1.PropManager.getInstance().getPropNum(prizeHeroData.OneDrawPropsID_1) >= prizeHeroData.OneDrawPropsSpend_1) {
            this.hero_instance.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_1);
            this.hero_instance.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeHeroData.OneDrawPropsSpend_1;
        }
        else {
            this.hero_instance.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_2);
            this.hero_instance.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeHeroData.OneDrawPropsSpend_2;
        }
        if (PropManager_1.PropManager.getInstance().getPropNum(prizeHeroData.OneDrawPropsID_1) >= prizeHeroData.TenDrawPropsSpend_1) {
            this.hero_instance.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_1);
            this.hero_instance.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeHeroData.TenDrawPropsSpend_1;
        }
        else {
            this.hero_instance.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_2);
            this.hero_instance.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeHeroData.TenDrawPropsSpend_2;
        }
        this.hero_instance.getChildByName("IconNum").getComponent(cc.Label).string = "X" + PropManager_1.PropManager.getInstance().getPropNum(40004);
        var prizePetData = DrawCardInformation_1.DrawCardInformationManager.getInstance().getJsonDrawCardInformation(3001);
        if (PropManager_1.PropManager.getInstance().getPropNum(prizePetData.OneDrawPropsID_1) >= prizePetData.OneDrawPropsSpend_1) {
            this.pet_instance.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_1);
            this.pet_instance.getChildByName("num1").getComponent(cc.Label).string = "x" + prizePetData.OneDrawPropsSpend_1;
        }
        else {
            this.pet_instance.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_2);
            this.pet_instance.getChildByName("num1").getComponent(cc.Label).string = "x" + prizePetData.OneDrawPropsSpend_2;
        }
        this.pet_instance.getChildByName("richBg").children[1].children[1].getComponent(cc.Label).string = "X" + PropManager_1.PropManager.getInstance().getPropNum(40006);
        if (PropManager_1.PropManager.getInstance().getPropNum(prizePetData.OneDrawPropsID_1) >= prizePetData.TenDrawPropsSpend_1) {
            this.pet_instance.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_1);
            this.pet_instance.getChildByName("num10").getComponent(cc.Label).string = "x" + prizePetData.TenDrawPropsSpend_1;
        }
        else {
            this.pet_instance.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizePetData.OneDrawPropsID_2);
            this.pet_instance.getChildByName("num10").getComponent(cc.Label).string = "x" + prizePetData.TenDrawPropsSpend_2;
        }
        var oneDayTime = 60 * 60 * 24 * 1000;
        var currentTime = Date.now();
        var prizeEquipData = DrawCardInformation_1.DrawCardInformationManager.getInstance().getJsonDrawCardInformation(2001);
        if (PropManager_1.PropManager.getInstance().getPropNum(prizeEquipData.OneDrawPropsID_1) >= prizeEquipData.OneDrawPropsSpend_1) {
            this.weapon_instance.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_1);
            this.weapon_instance.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeEquipData.OneDrawPropsSpend_1;
        }
        else {
            this.weapon_instance.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_2);
            this.weapon_instance.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeEquipData.OneDrawPropsSpend_2;
        }
        if (PropManager_1.PropManager.getInstance().getPropNum(prizeEquipData.OneDrawPropsID_1) >= prizeEquipData.TenDrawPropsSpend_1) {
            this.weapon_instance.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_1);
            this.weapon_instance.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeEquipData.TenDrawPropsSpend_1;
        }
        else {
            this.weapon_instance.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeEquipData.OneDrawPropsID_2);
            this.weapon_instance.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeEquipData.TenDrawPropsSpend_2;
        }
        this.weapon_instance.getChildByName("richBg").children[1].children[1].getComponent(cc.Label).string = "X" + PropManager_1.PropManager.getInstance().getPropNum(40005);
        // oneDayTime = 60*60*24*1000;
        // currentTime = Date.now();
        if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.StoreMysteryEquipFreeTime, 0) + oneDayTime - currentTime <= 0) {
            // 免费
            this.weapon_instance.getChildByName("num1").active = false;
            this.weapon_instance.getChildByName("free").active = true;
            this.weapon_instance.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = this.store_ui.getSpriteFrame("Shop_Icon_ADS");
        }
        else {
            this.weapon_instance.getChildByName("num1").active = true;
            this.weapon_instance.getChildByName("free").active = false;
        }
    };
    StoreUi.prototype.setCumulativeRechargeJsonString = function (addNum) {
        var uid = UserData_1.default.getInstance().getUserID();
        var num = addNum;
        return JSON.stringify({
            type: 8,
            uid: uid,
            value: num,
        });
    };
    StoreUi.prototype.getSaveGameTaskJsonString = function (index) {
        var uid = UserData_1.default.getInstance().getUserID();
        var num = index;
        return JSON.stringify({
            uid: uid,
            playLevel: num,
            rewardType: 10,
        });
    };
    __decorate([
        property(cc.Prefab)
    ], StoreUi.prototype, "store_title", void 0);
    __decorate([
        property(cc.Prefab)
    ], StoreUi.prototype, "store_chapter_item", void 0);
    __decorate([
        property(cc.Prefab)
    ], StoreUi.prototype, "store_hero_item", void 0);
    __decorate([
        property(cc.Prefab)
    ], StoreUi.prototype, "store_daily_item", void 0);
    __decorate([
        property(cc.Prefab)
    ], StoreUi.prototype, "store_pet_item", void 0);
    __decorate([
        property(cc.Prefab)
    ], StoreUi.prototype, "store_equip_item", void 0);
    __decorate([
        property(cc.Prefab)
    ], StoreUi.prototype, "store_gem_item", void 0);
    __decorate([
        property(cc.Prefab)
    ], StoreUi.prototype, "store_coin_item", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], StoreUi.prototype, "store_ui", void 0);
    StoreUi = __decorate([
        ccclass
    ], StoreUi);
    return StoreUi;
}(cc.Component));
exports.default = StoreUi;

cc._RF.pop();