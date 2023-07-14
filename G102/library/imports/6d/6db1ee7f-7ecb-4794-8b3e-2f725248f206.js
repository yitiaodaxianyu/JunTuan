"use strict";
cc._RF.push(module, '6db1e5/fstHlIs+L3JSSPIG', 'GoldMallUi');
// Scripts/UI/home/GoldMallUi.ts

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
var ApkManager_1 = require("../../Ads/ApkManager");
var EquipItem_1 = require("../../Equipment/Ui/EquipItem");
var GameData_1 = require("../../GameData");
var GameManager_1 = require("../../GameManager");
var CoinShopManagement_1 = require("../../JsonData/CoinShopManagement");
var CommodityManagement_1 = require("../../JsonData/CommodityManagement");
var LevelManager_1 = require("../../Level/LevelManager");
var FollowConstants_1 = require("../../multiLanguage/FollowConstants");
var FollowManager_1 = require("../../multiLanguage/FollowManager");
var Item_1 = require("../../Prop/Data/Item");
var Prop_1 = require("../../Prop/Prop");
var PropConfig_1 = require("../../Prop/PropConfig");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var MyTool_1 = require("../../Tools/MyTool");
var UIComponent_1 = require("../UIComponent");
var UIManager_1 = require("../UIManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GoldMallUi = /** @class */ (function (_super) {
    __extends(GoldMallUi, _super);
    function GoldMallUi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // protected start(): void {
    //     this.refreshUi();
    //     this.refreshScroll(true);
    // }
    GoldMallUi.prototype.init = function (uiAc) {
        _super.prototype.init.call(this, uiAc);
        var canvas = cc.find("Canvas");
        this.node.getChildByName("top").getComponent(cc.Widget).target = canvas;
        this.node.getChildByName("bottom").getComponent(cc.Widget).target = canvas;
        this.node.getChildByName("scroll").getComponent(cc.Widget).target = canvas;
        this.refreshUi();
        this.refreshScroll(GameData_1.default.getInstance().checkIsNewDay());
        //GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_Shop);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.金币商店打开次数);
    };
    GoldMallUi.prototype.refreshUi = function () {
        var top = this.node.getChildByName("top");
        var bottom = this.node.getChildByName("bottom");
        top.getChildByName("coinNum").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.Coin), 1);
        // console.log(MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(PropId.Coin)),MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(PropId.Gem)))
        top.getChildByName("diamondNum").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.Gem), 1);
        var timeLable = top.getChildByName("timeLabel");
        var hour, minute, second, hourStr, minuteStr, secondStr;
        var date = new Date();
        hour = 23 - date.getHours();
        minute = 59 - date.getMinutes();
        second = 59 - date.getSeconds();
        hourStr < 10 ? hourStr = "0" + hour : hourStr = hour;
        minute < 10 ? minuteStr = "0" + minute : minuteStr = minute;
        second < 10 ? secondStr = "0" + second : secondStr = second;
        timeLable.getComponent(cc.Label).string = "" + hourStr + ":" + minuteStr + ":" + secondStr;
        this.schedule(function () {
            date = new Date();
            hour = 23 - date.getHours();
            minute = 59 - date.getMinutes();
            second = 59 - date.getSeconds();
            hourStr < 10 ? hourStr = "0" + hour : hourStr = hour;
            minute < 10 ? minuteStr = "0" + minute : minuteStr = minute;
            second < 10 ? secondStr = "0" + second : secondStr = second;
            timeLable.getComponent(cc.Label).string = "" + hourStr + ":" + minuteStr + ":" + secondStr;
        }, 1, cc.macro.REPEAT_FOREVER, 0);
    };
    GoldMallUi.prototype.refreshScroll = function (isNewDay) {
        var _this = this;
        var content = this.node.getChildByName("scroll").getComponent(cc.ScrollView).content;
        content.removeAllChildren();
        var data;
        if (isNewDay) {
            var nowChapter = LevelManager_1.LevelManager.getInstance().getFinishChapter();
            var index = this.getRandomInt(1, 4);
            data = CoinShopManagement_1.CoinShopManagementManager.getInstance().getJsonCoinShopManagement(this.getItemId(nowChapter, index));
            // console.log("随机新的数据: " + this.getItemId(nowChapter, index))
            cc.sys.localStorage.setItem("GoldMallUi_id", this.getItemId(nowChapter, index));
        }
        else {
            // console.log("读取本地数据： " + Number(cc.sys.localStorage.getItem("GoldMallUi_id")))
            var nowChapter = LevelManager_1.LevelManager.getInstance().getFinishChapter();
            var index = this.getRandomInt(1, 4);
            if (cc.sys.localStorage.getItem("GoldMallUi_id") != null) {
                // console.log(Number(cc.sys.localStorage.getItem("GoldMallUi_id")));
                data = CoinShopManagement_1.CoinShopManagementManager.getInstance().getJsonCoinShopManagement(Number(cc.sys.localStorage.getItem("GoldMallUi_id")));
            }
            else {
                data = CoinShopManagement_1.CoinShopManagementManager.getInstance().getJsonCoinShopManagement(this.getItemId(nowChapter, index));
                cc.sys.localStorage.setItem("GoldMallUi_id", this.getItemId(nowChapter, index));
            }
        }
        // console.log("刷新后的id："+cc.sys.localStorage.getItem("GoldMallUi_id"))
        var itemList = data.Shoplist;
        var contentRowMode = this.node.getChildByName("Shop_Shelf");
        var contentRow = null;
        var _loop_1 = function (i) {
            if (i == 0 || i % 4 == 0) {
                contentRow = cc.instantiate(contentRowMode);
                contentRow.active = true;
                content.addChild(contentRow);
                // console.log("ss")
            }
            var itemData = CommodityManagement_1.CommodityManagementManager.getInstance().getJsonCommodityManagement(itemList[i]);
            // console.log(itemList[i],itemData.GetItem)
            var item = PropManager_1.PropManager.getInstance().createSalePropItem(itemData.GetItem, itemData.GetNum, PropConfig_1.PropAction.Buy);
            var type = Item_1.ItemManager.getInstance().getType(itemData.GetItem);
            // console.log(itemData.GetItem);
            if (i < 4) {
                var discount = void 0;
                if (isNewDay) {
                    discount = (this_1.getRandomInt(1, 5) * 10);
                    cc.sys.localStorage.setItem("GoldMallUi_discont" + i, discount);
                    cc.sys.localStorage.setItem("GoldMallUi_Item" + i, "");
                    if (type == 3) {
                        item.getComponent(EquipItem_1.default).initSaleItem(itemData.CostItem, itemData.CostNum * (discount * 0.01), discount);
                        item.getComponent(EquipItem_1.default).addBuyListen(function () {
                            item.getComponent(EquipItem_1.default).soldOut();
                            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.金币商店中成功购买物品的次数);
                            if (itemData.CostItem == PropConfig_1.PropId.Coin) {
                                FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.在金币商店中消耗的金币数量, itemData.CostNum);
                                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.在金币商店中使用金币购买物品的次数);
                            }
                            else if (itemData.CostItem == PropConfig_1.PropId.Gem) {
                                FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.在金币商店中消耗的钻石数量, itemData.CostNum);
                                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.在金币商店中使用钻石购买物品的次数);
                            }
                            cc.sys.localStorage.setItem("GoldMallUi_Item" + i, 1);
                            _this.refreshUi();
                        });
                    }
                    else {
                        item.getComponent(Prop_1.default).initSaleItem(itemData.CostItem, itemData.CostNum * (discount * 0.01), discount);
                        item.getComponent(Prop_1.default).addBuyListen(function () {
                            item.getComponent(Prop_1.default).soldOut();
                            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.金币商店中成功购买物品的次数);
                            if (itemData.CostItem == PropConfig_1.PropId.Coin) {
                                FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.在金币商店中消耗的金币数量, itemData.CostNum);
                                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.在金币商店中使用金币购买物品的次数);
                            }
                            else if (itemData.CostItem == PropConfig_1.PropId.Gem) {
                                FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.在金币商店中消耗的钻石数量, itemData.CostNum);
                                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.在金币商店中使用钻石购买物品的次数);
                            }
                            cc.sys.localStorage.setItem("GoldMallUi_Item" + i, 1);
                            _this.refreshUi();
                        });
                    }
                }
                else {
                    if (cc.sys.localStorage.getItem("GoldMallUi_discont" + i) != null) {
                        discount = Number(cc.sys.localStorage.getItem("GoldMallUi_discont" + i));
                    }
                    else {
                        discount = (this_1.getRandomInt(1, 5) * 10);
                        cc.sys.localStorage.setItem("GoldMallUi_discont" + i, discount);
                    }
                    if (cc.sys.localStorage.getItem("GoldMallUi_Item" + i) == null) {
                        cc.sys.localStorage.setItem("GoldMallUi_Item" + i, "");
                    }
                    if (cc.sys.localStorage.getItem("GoldMallUi_Item" + i) != "") {
                        if (type == 3) {
                            item.getComponent(EquipItem_1.default).soldOut();
                        }
                        else {
                            item.getComponent(Prop_1.default).soldOut();
                        }
                    }
                    else {
                        if (type == 3) {
                            item.getComponent(EquipItem_1.default).initSaleItem(itemData.CostItem, itemData.CostNum * (discount * 0.01), discount);
                            item.getComponent(EquipItem_1.default).addBuyListen(function () {
                                item.getComponent(EquipItem_1.default).soldOut();
                                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.金币商店中成功购买物品的次数);
                                if (itemData.CostItem == PropConfig_1.PropId.Coin) {
                                    FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.在金币商店中消耗的金币数量, itemData.CostNum);
                                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.在金币商店中使用金币购买物品的次数);
                                }
                                else if (itemData.CostItem == PropConfig_1.PropId.Gem) {
                                    FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.在金币商店中消耗的钻石数量, itemData.CostNum);
                                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.在金币商店中使用钻石购买物品的次数);
                                }
                                cc.sys.localStorage.setItem("GoldMallUi_Item" + i, 1);
                                _this.refreshUi();
                            });
                        }
                        else {
                            item.getComponent(Prop_1.default).initSaleItem(itemData.CostItem, itemData.CostNum * (discount * 0.01), discount);
                            item.getComponent(Prop_1.default).addBuyListen(function () {
                                item.getComponent(Prop_1.default).soldOut();
                                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.金币商店中成功购买物品的次数);
                                if (itemData.CostItem == PropConfig_1.PropId.Coin) {
                                    FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.在金币商店中消耗的金币数量, itemData.CostNum);
                                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.在金币商店中使用金币购买物品的次数);
                                }
                                else if (itemData.CostItem == PropConfig_1.PropId.Gem) {
                                    FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.在金币商店中消耗的钻石数量, itemData.CostNum);
                                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.在金币商店中使用钻石购买物品的次数);
                                }
                                cc.sys.localStorage.setItem("GoldMallUi_Item" + i, 1);
                                _this.refreshUi();
                            });
                        }
                    }
                }
            }
            else {
                if (isNewDay) {
                    cc.sys.localStorage.setItem("GoldMallUi_Item" + i, "");
                    if (type == 3) {
                        item.getComponent(EquipItem_1.default).initSaleItem(itemData.CostItem, itemData.CostNum);
                        item.getComponent(EquipItem_1.default).addBuyListen(function () {
                            item.getComponent(EquipItem_1.default).soldOut();
                            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.金币商店中成功购买物品的次数);
                            if (itemData.CostItem == PropConfig_1.PropId.Coin) {
                                FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.在金币商店中消耗的金币数量, itemData.CostNum);
                                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.在金币商店中使用金币购买物品的次数);
                            }
                            else if (itemData.CostItem == PropConfig_1.PropId.Gem) {
                                FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.在金币商店中消耗的钻石数量, itemData.CostNum);
                                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.在金币商店中使用钻石购买物品的次数);
                            }
                            cc.sys.localStorage.setItem("GoldMallUi_Item" + i, 1);
                            _this.refreshUi();
                        });
                    }
                    else {
                        item.getComponent(Prop_1.default).initSaleItem(itemData.CostItem, itemData.CostNum);
                        item.getComponent(Prop_1.default).addBuyListen(function () {
                            item.getComponent(Prop_1.default).soldOut();
                            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.金币商店中成功购买物品的次数);
                            if (itemData.CostItem == PropConfig_1.PropId.Coin) {
                                FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.在金币商店中消耗的金币数量, itemData.CostNum);
                                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.在金币商店中使用金币购买物品的次数);
                            }
                            else if (itemData.CostItem == PropConfig_1.PropId.Gem) {
                                FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.在金币商店中消耗的钻石数量, itemData.CostNum);
                                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.在金币商店中使用钻石购买物品的次数);
                            }
                            cc.sys.localStorage.setItem("GoldMallUi_Item" + i, 1);
                            _this.refreshUi();
                        });
                    }
                }
                else {
                    if (cc.sys.localStorage.getItem("GoldMallUi_Item" + i) == null) {
                        cc.sys.localStorage.setItem("GoldMallUi_Item" + i, "");
                    }
                    if (cc.sys.localStorage.getItem("GoldMallUi_Item" + i) != "") {
                        if (type == 3) {
                            item.getComponent(EquipItem_1.default).soldOut();
                        }
                        else {
                            item.getComponent(Prop_1.default).soldOut();
                        }
                    }
                    else {
                        if (type == 3) {
                            item.getComponent(EquipItem_1.default).initSaleItem(itemData.CostItem, itemData.CostNum);
                            item.getComponent(EquipItem_1.default).addBuyListen(function () {
                                item.getComponent(EquipItem_1.default).soldOut();
                                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.金币商店中成功购买物品的次数);
                                if (itemData.CostItem == PropConfig_1.PropId.Coin) {
                                    FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.在金币商店中消耗的金币数量, itemData.CostNum);
                                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.在金币商店中使用金币购买物品的次数);
                                }
                                else if (itemData.CostItem == PropConfig_1.PropId.Gem) {
                                    FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.在金币商店中消耗的钻石数量, itemData.CostNum);
                                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.在金币商店中使用钻石购买物品的次数);
                                }
                                cc.sys.localStorage.setItem("GoldMallUi_Item" + i, 1);
                                _this.refreshUi();
                            });
                        }
                        else {
                            item.getComponent(Prop_1.default).initSaleItem(itemData.CostItem, itemData.CostNum);
                            item.getComponent(Prop_1.default).addBuyListen(function () {
                                item.getComponent(Prop_1.default).soldOut();
                                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.金币商店中成功购买物品的次数);
                                if (itemData.CostItem == PropConfig_1.PropId.Coin) {
                                    FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.在金币商店中消耗的金币数量, itemData.CostNum);
                                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.在金币商店中使用金币购买物品的次数);
                                }
                                else if (itemData.CostItem == PropConfig_1.PropId.Gem) {
                                    FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.在金币商店中消耗的钻石数量, itemData.CostNum);
                                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.在金币商店中使用钻石购买物品的次数);
                                }
                                cc.sys.localStorage.setItem("GoldMallUi_Item" + i, 1);
                                _this.refreshUi();
                            });
                        }
                    }
                }
            }
            // item.getComponent(Prop).soldOut();
            if (!isNewDay) {
                if (cc.sys.localStorage.getItem("GoldMallUiItem" + i) == 1) {
                    if (type == 3) {
                        item.getComponent(EquipItem_1.default).soldOut();
                    }
                    else {
                        item.getComponent(Prop_1.default).soldOut();
                    }
                }
            }
            contentRow.addChild(item);
            item.y = 55;
        };
        var this_1 = this;
        // let itemNumList = data.GoodsNum;
        // let spendCurrencyTypeList = data.SpendCurrencyType;
        // let spendNumList = data.SpendNum;
        for (var i = 0; i < itemList.length; i++) {
            _loop_1(i);
        }
        // this.node.getChildByName("Shop_Btn_Refresh").on(cc.Node.EventType.TOUCH_END,() =>{
        //     // TODO 刷新按钮
        // });
    };
    GoldMallUi.prototype.clickBtnRefresh = function () {
        var _this = this;
        UIManager_1.UIManager.getInstance().showConsumptionTipUi(null, PropConfig_1.PropId.Gem, 100, function () {
            // console.log("进行刷新");
            _this.refreshUi();
            _this.refreshScroll(true);
        });
    };
    GoldMallUi.prototype.getItemId = function (chapter, index) {
        return chapter * 1000 + index;
    };
    GoldMallUi.prototype.getRandomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
    };
    GoldMallUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.destroySelf();
    };
    GoldMallUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
        // EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_SignIn);
    };
    GoldMallUi = __decorate([
        ccclass
    ], GoldMallUi);
    return GoldMallUi;
}(UIComponent_1.default));
exports.default = GoldMallUi;

cc._RF.pop();