
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/home/GoldMallUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXEdvbGRNYWxsVWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQThDO0FBQzlDLDBEQUFxRDtBQUNyRCwyQ0FBc0M7QUFDdEMsaURBQTRDO0FBQzVDLHdFQUE4RTtBQUM5RSwwRUFBZ0Y7QUFDaEYseURBQXdEO0FBQ3hELHVFQUFrRTtBQUNsRSxtRUFBOEQ7QUFDOUQsNkNBQW1EO0FBQ25ELHdDQUFtQztBQUNuQyxvREFBMkQ7QUFDM0Qsc0RBQXFEO0FBQ3JELDZEQUFvRTtBQUNwRSw2Q0FBd0M7QUFDeEMsOENBQXlDO0FBRXpDLDBDQUF5QztBQUVuQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF3Qyw4QkFBVztJQUFuRDs7SUFtVEEsQ0FBQztJQWhURyw0QkFBNEI7SUFDNUIsd0JBQXdCO0lBQ3hCLGdDQUFnQztJQUNoQyxJQUFJO0lBRUoseUJBQUksR0FBSixVQUFLLElBQWM7UUFDZixpQkFBTSxJQUFJLFlBQUMsSUFBSSxDQUFDLENBQUM7UUFDakIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDeEUsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQzNFLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUMzRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFDM0QseUVBQXlFO1FBQ3pFLHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLDZCQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVELDhCQUFTLEdBQVQ7UUFDSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN6QyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUMvQyxHQUFHLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLGdCQUFNLENBQUMsYUFBYSxDQUFDLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLG1CQUFNLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEksOEpBQThKO1FBQzlKLEdBQUcsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsZ0JBQU0sQ0FBQyxhQUFhLENBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsbUJBQU0sQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUMxSSxJQUFJLFNBQVMsR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQy9DLElBQUksSUFBSSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxTQUFTLENBQUM7UUFDbkQsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN0QixJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1QixNQUFNLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNoQyxNQUFNLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNoQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsR0FBRyxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNuRCxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztRQUMxRCxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztRQUMxRCxTQUFTLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxHQUFHLE9BQU8sR0FBRyxHQUFHLEdBQUcsU0FBUyxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUM7UUFDM0YsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNWLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ2xCLElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzVCLE1BQU0sR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2hDLE1BQU0sR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2hDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxHQUFHLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ25ELE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1lBQzFELE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1lBQzFELFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxFQUFFLEdBQUcsT0FBTyxHQUFHLEdBQUcsR0FBRyxTQUFTLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQztRQUMvRixDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2xDLENBQUM7SUFFRCxrQ0FBYSxHQUFiLFVBQWMsUUFBZ0I7UUFBOUIsaUJBaU9DO1FBaE9HLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ3JGLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzVCLElBQUksSUFBSSxDQUFDO1FBQ1QsSUFBRyxRQUFRLEVBQUM7WUFDUixJQUFJLFVBQVUsR0FBRywyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDL0QsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEMsSUFBSSxHQUFHLDhDQUF5QixDQUFDLFdBQVcsRUFBRSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDNUcsOERBQThEO1lBQzlELEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQTtTQUNqRjthQUFJO1lBQ0QsaUZBQWlGO1lBQ2pGLElBQUksVUFBVSxHQUFHLDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUMvRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxJQUFJLEVBQUM7Z0JBQ3BELHFFQUFxRTtnQkFDckUsSUFBSSxHQUFHLDhDQUF5QixDQUFDLFdBQVcsRUFBRSxDQUFDLHlCQUF5QixDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2xJO2lCQUFJO2dCQUNELElBQUksR0FBRyw4Q0FBeUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUM1RyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUE7YUFDakY7U0FDSjtRQUNELHNFQUFzRTtRQUN0RSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzdCLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzVELElBQUksVUFBVSxHQUFXLElBQUksQ0FBQztnQ0FJdEIsQ0FBQztZQUNKLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBRSxDQUFDLEdBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQztnQkFDakIsVUFBVSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzVDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUN6QixPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUM3QixvQkFBb0I7YUFDdEI7WUFDRixJQUFJLFFBQVEsR0FBRyxnREFBMEIsQ0FBQyxXQUFXLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoRyw0Q0FBNEM7WUFDNUMsSUFBSSxJQUFJLEdBQUcseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUMsdUJBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6RyxJQUFJLElBQUksR0FBQyxrQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0QsaUNBQWlDO1lBQ2pDLElBQUcsQ0FBQyxHQUFDLENBQUMsRUFBQztnQkFDSCxJQUFJLFFBQVEsU0FBQSxDQUFDO2dCQUNiLElBQUcsUUFBUSxFQUFDO29CQUNSLFFBQVEsR0FBRyxDQUFDLE9BQUssWUFBWSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztvQkFDekMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLG9CQUFvQixHQUFHLENBQUMsRUFBQyxRQUFRLENBQUMsQ0FBQztvQkFDL0QsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGlCQUFpQixHQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQTtvQkFDbkQsSUFBRyxJQUFJLElBQUksQ0FBQyxFQUFDO3dCQUNULElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQVMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUMsUUFBUSxDQUFDLENBQUM7d0JBQzNHLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQVMsQ0FBQyxDQUFDLFlBQVksQ0FBQzs0QkFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBUyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7NEJBQ3ZDLHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLDZCQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7NEJBQ3BFLElBQUcsUUFBUSxDQUFDLFFBQVEsSUFBSSxtQkFBTSxDQUFDLElBQUksRUFBQztnQ0FDaEMsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsNkJBQVcsQ0FBQyxhQUFhLEVBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dDQUNqRix1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyw2QkFBVyxDQUFDLGlCQUFpQixDQUFDLENBQUM7NkJBQzFFO2lDQUFLLElBQUcsUUFBUSxDQUFDLFFBQVEsSUFBSSxtQkFBTSxDQUFDLEdBQUcsRUFBQztnQ0FDckMsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsNkJBQVcsQ0FBQyxhQUFhLEVBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dDQUNqRix1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyw2QkFBVyxDQUFDLGlCQUFpQixDQUFDLENBQUM7NkJBQzFFOzRCQUNELEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsR0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ25ELEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzt3QkFDckIsQ0FBQyxDQUFDLENBQUM7cUJBQ047eUJBQUk7d0JBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBQyxRQUFRLENBQUMsT0FBTyxHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxFQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUN0RyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQzs0QkFDakMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs0QkFDbEMsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsNkJBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQzs0QkFDcEUsSUFBRyxRQUFRLENBQUMsUUFBUSxJQUFJLG1CQUFNLENBQUMsSUFBSSxFQUFDO2dDQUNoQyx1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyw2QkFBVyxDQUFDLGFBQWEsRUFBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7Z0NBQ2pGLHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLDZCQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQzs2QkFDMUU7aUNBQUssSUFBRyxRQUFRLENBQUMsUUFBUSxJQUFJLG1CQUFNLENBQUMsR0FBRyxFQUFDO2dDQUNyQyx1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyw2QkFBVyxDQUFDLGFBQWEsRUFBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7Z0NBQ2pGLHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLDZCQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQzs2QkFDMUU7NEJBQ0QsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGlCQUFpQixHQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQzs0QkFDbkQsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO3dCQUNyQixDQUFDLENBQUMsQ0FBQztxQkFDTjtpQkFDSjtxQkFBSTtvQkFDRCxJQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUM7d0JBQzdELFFBQVEsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQzVFO3lCQUFJO3dCQUNELFFBQVEsR0FBRyxDQUFDLE9BQUssWUFBWSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQzt3QkFDekMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLG9CQUFvQixHQUFHLENBQUMsRUFBQyxRQUFRLENBQUMsQ0FBQztxQkFDbEU7b0JBQ0QsSUFBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEdBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFDO3dCQUN4RCxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEdBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFBO3FCQUN0RDtvQkFDRCxJQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsR0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUM7d0JBQ3RELElBQUcsSUFBSSxJQUFJLENBQUMsRUFBQzs0QkFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQzt5QkFDMUM7NkJBQUk7NEJBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQzt5QkFDckM7cUJBQ0o7eUJBQUk7d0JBQ0QsSUFBRyxJQUFJLElBQUksQ0FBQyxFQUFDOzRCQUNULElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQVMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUMsUUFBUSxDQUFDLENBQUM7NEJBQzNHLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQVMsQ0FBQyxDQUFDLFlBQVksQ0FBQztnQ0FDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBUyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7Z0NBQ3ZDLHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLDZCQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7Z0NBQ3BFLElBQUcsUUFBUSxDQUFDLFFBQVEsSUFBSSxtQkFBTSxDQUFDLElBQUksRUFBQztvQ0FDaEMsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsNkJBQVcsQ0FBQyxhQUFhLEVBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29DQUNqRix1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyw2QkFBVyxDQUFDLGlCQUFpQixDQUFDLENBQUM7aUNBQzFFO3FDQUFLLElBQUcsUUFBUSxDQUFDLFFBQVEsSUFBSSxtQkFBTSxDQUFDLEdBQUcsRUFBQztvQ0FDckMsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsNkJBQVcsQ0FBQyxhQUFhLEVBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29DQUNqRix1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyw2QkFBVyxDQUFDLGlCQUFpQixDQUFDLENBQUM7aUNBQzFFO2dDQUNELEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsR0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ25ELEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzs0QkFDckIsQ0FBQyxDQUFDLENBQUM7eUJBQ047NkJBQUk7NEJBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBQyxRQUFRLENBQUMsT0FBTyxHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxFQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUN0RyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQztnQ0FDakMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQ0FDbEMsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsNkJBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQ0FDcEUsSUFBRyxRQUFRLENBQUMsUUFBUSxJQUFJLG1CQUFNLENBQUMsSUFBSSxFQUFDO29DQUNoQyx1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyw2QkFBVyxDQUFDLGFBQWEsRUFBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7b0NBQ2pGLHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLDZCQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQztpQ0FDMUU7cUNBQUssSUFBRyxRQUFRLENBQUMsUUFBUSxJQUFJLG1CQUFNLENBQUMsR0FBRyxFQUFDO29DQUNyQyx1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyw2QkFBVyxDQUFDLGFBQWEsRUFBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7b0NBQ2pGLHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLDZCQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQztpQ0FDMUU7Z0NBQ0QsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGlCQUFpQixHQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztnQ0FDbkQsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDOzRCQUNyQixDQUFDLENBQUMsQ0FBQzt5QkFDTjtxQkFDSjtpQkFDSjthQUNKO2lCQUFJO2dCQUNELElBQUcsUUFBUSxFQUFDO29CQUNSLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsR0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUE7b0JBQ25ELElBQUcsSUFBSSxJQUFJLENBQUMsRUFBQzt3QkFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFTLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQzlFLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQVMsQ0FBQyxDQUFDLFlBQVksQ0FBQzs0QkFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBUyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7NEJBQ3ZDLHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLDZCQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7NEJBQ3BFLElBQUcsUUFBUSxDQUFDLFFBQVEsSUFBSSxtQkFBTSxDQUFDLElBQUksRUFBQztnQ0FDaEMsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsNkJBQVcsQ0FBQyxhQUFhLEVBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dDQUNqRix1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyw2QkFBVyxDQUFDLGlCQUFpQixDQUFDLENBQUM7NkJBQzFFO2lDQUFLLElBQUcsUUFBUSxDQUFDLFFBQVEsSUFBSSxtQkFBTSxDQUFDLEdBQUcsRUFBQztnQ0FDckMsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsNkJBQVcsQ0FBQyxhQUFhLEVBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dDQUNqRix1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyw2QkFBVyxDQUFDLGlCQUFpQixDQUFDLENBQUM7NkJBQzFFOzRCQUNELEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsR0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ25ELEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzt3QkFDckIsQ0FBQyxDQUFDLENBQUM7cUJBQ047eUJBQUk7d0JBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3pFLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBSSxDQUFDLENBQUMsWUFBWSxDQUFDOzRCQUNqQyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUNsQyx1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyw2QkFBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDOzRCQUNwRSxJQUFHLFFBQVEsQ0FBQyxRQUFRLElBQUksbUJBQU0sQ0FBQyxJQUFJLEVBQUM7Z0NBQ2hDLHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLDZCQUFXLENBQUMsYUFBYSxFQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQ0FDakYsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsNkJBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDOzZCQUMxRTtpQ0FBSyxJQUFHLFFBQVEsQ0FBQyxRQUFRLElBQUksbUJBQU0sQ0FBQyxHQUFHLEVBQUM7Z0NBQ3JDLHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLDZCQUFXLENBQUMsYUFBYSxFQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQ0FDakYsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsNkJBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDOzZCQUMxRTs0QkFDRCxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEdBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNuRCxLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7d0JBQ3JCLENBQUMsQ0FBQyxDQUFDO3FCQUNOO2lCQUNKO3FCQUFJO29CQUNELElBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGlCQUFpQixHQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBQzt3QkFDeEQsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGlCQUFpQixHQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQTtxQkFDdEQ7b0JBQ0QsSUFBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEdBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFDO3dCQUN0RCxJQUFHLElBQUksSUFBSSxDQUFDLEVBQUM7NEJBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBUyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7eUJBQzFDOzZCQUFJOzRCQUNELElBQUksQ0FBQyxZQUFZLENBQUMsY0FBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7eUJBQ3JDO3FCQUNKO3lCQUFJO3dCQUNELElBQUcsSUFBSSxJQUFJLENBQUMsRUFBQzs0QkFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFTLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQzlFLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQVMsQ0FBQyxDQUFDLFlBQVksQ0FBQztnQ0FDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBUyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7Z0NBQ3ZDLHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLDZCQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7Z0NBQ3BFLElBQUcsUUFBUSxDQUFDLFFBQVEsSUFBSSxtQkFBTSxDQUFDLElBQUksRUFBQztvQ0FDaEMsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsNkJBQVcsQ0FBQyxhQUFhLEVBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29DQUNqRix1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyw2QkFBVyxDQUFDLGlCQUFpQixDQUFDLENBQUM7aUNBQzFFO3FDQUFLLElBQUcsUUFBUSxDQUFDLFFBQVEsSUFBSSxtQkFBTSxDQUFDLEdBQUcsRUFBQztvQ0FDckMsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsNkJBQVcsQ0FBQyxhQUFhLEVBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29DQUNqRix1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyw2QkFBVyxDQUFDLGlCQUFpQixDQUFDLENBQUM7aUNBQzFFO2dDQUNELEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsR0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ25ELEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzs0QkFDckIsQ0FBQyxDQUFDLENBQUM7eUJBQ047NkJBQUk7NEJBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQ3pFLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBSSxDQUFDLENBQUMsWUFBWSxDQUFDO2dDQUNqQyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dDQUNsQyx1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyw2QkFBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dDQUNwRSxJQUFHLFFBQVEsQ0FBQyxRQUFRLElBQUksbUJBQU0sQ0FBQyxJQUFJLEVBQUM7b0NBQ2hDLHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLDZCQUFXLENBQUMsYUFBYSxFQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQ0FDakYsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsNkJBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2lDQUMxRTtxQ0FBSyxJQUFHLFFBQVEsQ0FBQyxRQUFRLElBQUksbUJBQU0sQ0FBQyxHQUFHLEVBQUM7b0NBQ3JDLHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLDZCQUFXLENBQUMsYUFBYSxFQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQ0FDakYsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsNkJBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2lDQUMxRTtnQ0FDRCxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEdBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUNuRCxLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7NEJBQ3JCLENBQUMsQ0FBQyxDQUFDO3lCQUNOO3FCQUNKO2lCQUNKO2FBQ0o7WUFDRCxxQ0FBcUM7WUFDckMsSUFBRyxDQUFDLFFBQVEsRUFBQztnQkFDVCxJQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUM7b0JBQ3RELElBQUcsSUFBSSxJQUFJLENBQUMsRUFBQzt3QkFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztxQkFDMUM7eUJBQUk7d0JBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztxQkFDckM7aUJBQ0o7YUFDSjtZQUNELFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7OztRQWhNaEIsbUNBQW1DO1FBQ25DLHNEQUFzRDtRQUN0RCxvQ0FBb0M7UUFDcEMsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFO29CQUEzQixDQUFDO1NBOExSO1FBRUQscUZBQXFGO1FBQ3JGLG1CQUFtQjtRQUVuQixNQUFNO0lBQ1YsQ0FBQztJQUVELG9DQUFlLEdBQWY7UUFBQSxpQkFNQztRQUxHLHFCQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFDLG1CQUFNLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQztZQUM3RCx1QkFBdUI7WUFDdkIsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBR0QsOEJBQVMsR0FBVCxVQUFVLE9BQWMsRUFBQyxLQUFZO1FBQ2pDLE9BQU8sT0FBTyxHQUFDLElBQUksR0FBQyxLQUFLLENBQUM7SUFDOUIsQ0FBQztJQUVELGlDQUFZLEdBQVosVUFBYSxHQUFHLEVBQUUsR0FBRztRQUNqQixHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsWUFBWTtJQUN0RSxDQUFDO0lBRUQsa0NBQWEsR0FBYjtRQUVJLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsZ0NBQVcsR0FBWDtRQUVJLGlCQUFNLE9BQU8sV0FBRSxDQUFDO1FBQ2hCLG9CQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkMsb0ZBQW9GO0lBQ3hGLENBQUM7SUFqVGdCLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FtVDlCO0lBQUQsaUJBQUM7Q0FuVEQsQUFtVEMsQ0FuVHVDLHFCQUFXLEdBbVRsRDtrQkFuVG9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXBrTWFuYWdlciBmcm9tIFwiLi4vLi4vQWRzL0Fwa01hbmFnZXJcIjtcclxuaW1wb3J0IEVxdWlwSXRlbSBmcm9tIFwiLi4vLi4vRXF1aXBtZW50L1VpL0VxdWlwSXRlbVwiO1xyXG5pbXBvcnQgR2FtZURhdGEgZnJvbSBcIi4uLy4uL0dhbWVEYXRhXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQ29pblNob3BNYW5hZ2VtZW50TWFuYWdlciB9IGZyb20gXCIuLi8uLi9Kc29uRGF0YS9Db2luU2hvcE1hbmFnZW1lbnRcIjtcclxuaW1wb3J0IHsgQ29tbW9kaXR5TWFuYWdlbWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vSnNvbkRhdGEvQ29tbW9kaXR5TWFuYWdlbWVudFwiO1xyXG5pbXBvcnQgeyBMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTGV2ZWwvTGV2ZWxNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd01hbmFnZXJcIjtcclxuaW1wb3J0IHsgSXRlbU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUHJvcC9EYXRhL0l0ZW1cIjtcclxuaW1wb3J0IFByb3AgZnJvbSBcIi4uLy4uL1Byb3AvUHJvcFwiO1xyXG5pbXBvcnQgeyBQcm9wQWN0aW9uLCBQcm9wSWQgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTXVzaWNJbmRleCwgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi8uLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVaUFjdGlvbiB9IGZyb20gXCIuLi9VaUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vVUlNYW5hZ2VyXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdvbGRNYWxsVWkgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG5cclxuICAgIC8vIHByb3RlY3RlZCBzdGFydCgpOiB2b2lkIHtcclxuICAgIC8vICAgICB0aGlzLnJlZnJlc2hVaSgpO1xyXG4gICAgLy8gICAgIHRoaXMucmVmcmVzaFNjcm9sbCh0cnVlKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICBpbml0KHVpQWM6IFVpQWN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuaW5pdCh1aUFjKTtcclxuICAgICAgICBsZXQgY2FudmFzID0gY2MuZmluZChcIkNhbnZhc1wiKVxyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRvcFwiKS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS50YXJnZXQgPSBjYW52YXM7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYm90dG9tXCIpLmdldENvbXBvbmVudChjYy5XaWRnZXQpLnRhcmdldCA9IGNhbnZhcztcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzY3JvbGxcIikuZ2V0Q29tcG9uZW50KGNjLldpZGdldCkudGFyZ2V0ID0gY2FudmFzO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFVpKCk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoU2Nyb2xsKEdhbWVEYXRhLmdldEluc3RhbmNlKCkuY2hlY2tJc05ld0RheSgpKTtcclxuICAgICAgICAvL0dhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlci5wbGF5TXVzaWMoTXVzaWNJbmRleC5CR01fU2hvcCk7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLumHkeW4geWVhuW6l+aJk+W8gOasoeaVsCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaFVpKCl7XHJcbiAgICAgICAgbGV0IHRvcCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRvcFwiKVxyXG4gICAgICAgIGxldCBib3R0b20gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJib3R0b21cIilcclxuICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJjb2luTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLmdldENvaW5EYW53ZWkoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5Db2luKSwxKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhNeVRvb2wuZ2V0Q29pbkRhbndlaShQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkNvaW4pKSxNeVRvb2wuZ2V0Q29pbkRhbndlaShQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkdlbSkpKVxyXG4gICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcImRpYW1vbmROdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wuZ2V0Q29pbkRhbndlaShQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkdlbSksMSk7XHJcbiAgICAgICAgbGV0IHRpbWVMYWJsZSA9IHRvcC5nZXRDaGlsZEJ5TmFtZShcInRpbWVMYWJlbFwiKVxyXG4gICAgICAgIGxldCBob3VyLG1pbnV0ZSxzZWNvbmQsaG91clN0cixtaW51dGVTdHIsc2Vjb25kU3RyO1xyXG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICBob3VyID0gMjMgLSBkYXRlLmdldEhvdXJzKCk7XHJcbiAgICAgICAgbWludXRlID0gNTkgLSBkYXRlLmdldE1pbnV0ZXMoKTtcclxuICAgICAgICBzZWNvbmQgPSA1OSAtIGRhdGUuZ2V0U2Vjb25kcygpO1xyXG4gICAgICAgIGhvdXJTdHIgPCAxMCA/IGhvdXJTdHIgPSBcIjBcIitob3VyIDogaG91clN0ciA9IGhvdXI7XHJcbiAgICAgICAgbWludXRlIDwgMTAgPyBtaW51dGVTdHIgPSBcIjBcIittaW51dGUgOiBtaW51dGVTdHIgPSBtaW51dGU7XHJcbiAgICAgICAgc2Vjb25kIDwgMTAgPyBzZWNvbmRTdHIgPSBcIjBcIitzZWNvbmQgOiBzZWNvbmRTdHIgPSBzZWNvbmQ7XHJcbiAgICAgICAgdGltZUxhYmxlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJcIiArIGhvdXJTdHIgKyBcIjpcIiArIG1pbnV0ZVN0ciArIFwiOlwiICsgc2Vjb25kU3RyO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT57XHJcbiAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICBob3VyID0gMjMgLSBkYXRlLmdldEhvdXJzKCk7XHJcbiAgICAgICAgICAgIG1pbnV0ZSA9IDU5IC0gZGF0ZS5nZXRNaW51dGVzKCk7XHJcbiAgICAgICAgICAgIHNlY29uZCA9IDU5IC0gZGF0ZS5nZXRTZWNvbmRzKCk7IFxyXG4gICAgICAgICAgICBob3VyU3RyIDwgMTAgPyBob3VyU3RyID0gXCIwXCIraG91ciA6IGhvdXJTdHIgPSBob3VyO1xyXG4gICAgICAgICAgICBtaW51dGUgPCAxMCA/IG1pbnV0ZVN0ciA9IFwiMFwiK21pbnV0ZSA6IG1pbnV0ZVN0ciA9IG1pbnV0ZTtcclxuICAgICAgICAgICAgc2Vjb25kIDwgMTAgPyBzZWNvbmRTdHIgPSBcIjBcIitzZWNvbmQgOiBzZWNvbmRTdHIgPSBzZWNvbmQ7XHJcbiAgICAgICAgICAgIHRpbWVMYWJsZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiXCIgKyBob3VyU3RyICsgXCI6XCIgKyBtaW51dGVTdHIgKyBcIjpcIiArIHNlY29uZFN0cjtcclxuICAgICAgICB9LDEsY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIsMClcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoU2Nyb2xsKGlzTmV3RGF5OmJvb2xlYW4pe1xyXG4gICAgICAgIGxldCBjb250ZW50ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic2Nyb2xsXCIpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5jb250ZW50O1xyXG4gICAgICAgIGNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICBsZXQgZGF0YTtcclxuICAgICAgICBpZihpc05ld0RheSl7XHJcbiAgICAgICAgICAgIGxldCBub3dDaGFwdGVyID0gTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmluaXNoQ2hhcHRlcigpO1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmdldFJhbmRvbUludCgxLCA0KTtcclxuICAgICAgICAgICAgZGF0YSA9IENvaW5TaG9wTWFuYWdlbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uQ29pblNob3BNYW5hZ2VtZW50KHRoaXMuZ2V0SXRlbUlkKG5vd0NoYXB0ZXIsIGluZGV4KSk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi6ZqP5py65paw55qE5pWw5o2uOiBcIiArIHRoaXMuZ2V0SXRlbUlkKG5vd0NoYXB0ZXIsIGluZGV4KSlcclxuICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiR29sZE1hbGxVaV9pZFwiLHRoaXMuZ2V0SXRlbUlkKG5vd0NoYXB0ZXIsIGluZGV4KSlcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLor7vlj5bmnKzlnLDmlbDmja7vvJogXCIgKyBOdW1iZXIoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiR29sZE1hbGxVaV9pZFwiKSkpXHJcbiAgICAgICAgICAgIGxldCBub3dDaGFwdGVyID0gTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmluaXNoQ2hhcHRlcigpO1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmdldFJhbmRvbUludCgxLCA0KTtcclxuICAgICAgICAgICAgaWYoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiR29sZE1hbGxVaV9pZFwiKSAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKE51bWJlcihjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJHb2xkTWFsbFVpX2lkXCIpKSk7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gQ29pblNob3BNYW5hZ2VtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25Db2luU2hvcE1hbmFnZW1lbnQoTnVtYmVyKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIkdvbGRNYWxsVWlfaWRcIikpKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gQ29pblNob3BNYW5hZ2VtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25Db2luU2hvcE1hbmFnZW1lbnQodGhpcy5nZXRJdGVtSWQobm93Q2hhcHRlciwgaW5kZXgpKTtcclxuICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIkdvbGRNYWxsVWlfaWRcIix0aGlzLmdldEl0ZW1JZChub3dDaGFwdGVyLCBpbmRleCkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCLliLfmlrDlkI7nmoRpZO+8mlwiK2NjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIkdvbGRNYWxsVWlfaWRcIikpXHJcbiAgICAgICAgbGV0IGl0ZW1MaXN0ID0gZGF0YS5TaG9wbGlzdDtcclxuICAgICAgICBsZXQgY29udGVudFJvd01vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJTaG9wX1NoZWxmXCIpO1xyXG4gICAgICAgIGxldCBjb250ZW50Um93OmNjLk5vZGUgPSBudWxsO1xyXG4gICAgICAgIC8vIGxldCBpdGVtTnVtTGlzdCA9IGRhdGEuR29vZHNOdW07XHJcbiAgICAgICAgLy8gbGV0IHNwZW5kQ3VycmVuY3lUeXBlTGlzdCA9IGRhdGEuU3BlbmRDdXJyZW5jeVR5cGU7XHJcbiAgICAgICAgLy8gbGV0IHNwZW5kTnVtTGlzdCA9IGRhdGEuU3BlbmROdW07XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDtpPGl0ZW1MaXN0Lmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgaWYoaSA9PSAwfHxpJTQgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50Um93ID0gY2MuaW5zdGFudGlhdGUoY29udGVudFJvd01vZGUpO1xyXG4gICAgICAgICAgICAgICAgY29udGVudFJvdy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5hZGRDaGlsZChjb250ZW50Um93KTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwic3NcIilcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGl0ZW1EYXRhID0gQ29tbW9kaXR5TWFuYWdlbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uQ29tbW9kaXR5TWFuYWdlbWVudChpdGVtTGlzdFtpXSk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGl0ZW1MaXN0W2ldLGl0ZW1EYXRhLkdldEl0ZW0pXHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVTYWxlUHJvcEl0ZW0oaXRlbURhdGEuR2V0SXRlbSxpdGVtRGF0YS5HZXROdW0sUHJvcEFjdGlvbi5CdXkpO1xyXG4gICAgICAgICAgICBsZXQgdHlwZT1JdGVtTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFR5cGUoaXRlbURhdGEuR2V0SXRlbSk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGl0ZW1EYXRhLkdldEl0ZW0pO1xyXG4gICAgICAgICAgICBpZihpPDQpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpc2NvdW50O1xyXG4gICAgICAgICAgICAgICAgaWYoaXNOZXdEYXkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2NvdW50ID0gKHRoaXMuZ2V0UmFuZG9tSW50KDEsNSkgKiAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiR29sZE1hbGxVaV9kaXNjb250XCIgKyBpLGRpc2NvdW50KTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJHb2xkTWFsbFVpX0l0ZW1cIitpLFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZSA9PSAzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoRXF1aXBJdGVtKS5pbml0U2FsZUl0ZW0oaXRlbURhdGEuQ29zdEl0ZW0saXRlbURhdGEuQ29zdE51bSAqIChkaXNjb3VudCAqIDAuMDEpLGRpc2NvdW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoRXF1aXBJdGVtKS5hZGRCdXlMaXN0ZW4oKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KEVxdWlwSXRlbSkuc29sZE91dCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLumHkeW4geWVhuW6l+S4reaIkOWKn+i0reS5sOeJqeWTgeeahOasoeaVsCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpdGVtRGF0YS5Db3N0SXRlbSA9PSBQcm9wSWQuQ29pbil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFRvdGFsKEZvbGxvd19UeXBlLuWcqOmHkeW4geWVhuW6l+S4rea2iOiAl+eahOmHkeW4geaVsOmHjyxpdGVtRGF0YS5Db3N0TnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5Zyo6YeR5biB5ZWG5bqX5Lit5L2/55So6YeR5biB6LSt5Lmw54mp5ZOB55qE5qyh5pWwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGl0ZW1EYXRhLkNvc3RJdGVtID09IFByb3BJZC5HZW0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRUb3RhbChGb2xsb3dfVHlwZS7lnKjph5HluIHllYblupfkuK3mtojogJfnmoTpkrvnn7PmlbDph48saXRlbURhdGEuQ29zdE51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuWcqOmHkeW4geWVhuW6l+S4reS9v+eUqOmSu+efs+i0reS5sOeJqeWTgeeahOasoeaVsCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJHb2xkTWFsbFVpX0l0ZW1cIitpLDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KFByb3ApLmluaXRTYWxlSXRlbShpdGVtRGF0YS5Db3N0SXRlbSxpdGVtRGF0YS5Db3N0TnVtICogKGRpc2NvdW50ICogMC4wMSksZGlzY291bnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChQcm9wKS5hZGRCdXlMaXN0ZW4oKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KFByb3ApLnNvbGRPdXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ph5HluIHllYblupfkuK3miJDlip/otK3kubDnianlk4HnmoTmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXRlbURhdGEuQ29zdEl0ZW0gPT0gUHJvcElkLkNvaW4pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRUb3RhbChGb2xsb3dfVHlwZS7lnKjph5HluIHllYblupfkuK3mtojogJfnmoTph5HluIHmlbDph48saXRlbURhdGEuQ29zdE51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuWcqOmHkeW4geWVhuW6l+S4reS9v+eUqOmHkeW4gei0reS5sOeJqeWTgeeahOasoeaVsCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihpdGVtRGF0YS5Db3N0SXRlbSA9PSBQcm9wSWQuR2VtKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkVG90YWwoRm9sbG93X1R5cGUu5Zyo6YeR5biB5ZWG5bqX5Lit5raI6ICX55qE6ZK755+z5pWw6YePLGl0ZW1EYXRhLkNvc3ROdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lnKjph5HluIHllYblupfkuK3kvb/nlKjpkrvnn7PotK3kubDnianlk4HnmoTmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiR29sZE1hbGxVaV9JdGVtXCIraSwxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaFVpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIkdvbGRNYWxsVWlfZGlzY29udFwiICsgaSkgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2NvdW50ID0gTnVtYmVyKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIkdvbGRNYWxsVWlfZGlzY29udFwiICsgaSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNjb3VudCA9ICh0aGlzLmdldFJhbmRvbUludCgxLDUpICogMTApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJHb2xkTWFsbFVpX2Rpc2NvbnRcIiArIGksZGlzY291bnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJHb2xkTWFsbFVpX0l0ZW1cIitpKSA9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiR29sZE1hbGxVaV9JdGVtXCIraSxcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJHb2xkTWFsbFVpX0l0ZW1cIitpKSAhPSBcIlwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodHlwZSA9PSAzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KEVxdWlwSXRlbSkuc29sZE91dCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KFByb3ApLnNvbGRPdXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0eXBlID09IDMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoRXF1aXBJdGVtKS5pbml0U2FsZUl0ZW0oaXRlbURhdGEuQ29zdEl0ZW0saXRlbURhdGEuQ29zdE51bSAqIChkaXNjb3VudCAqIDAuMDEpLGRpc2NvdW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KEVxdWlwSXRlbSkuYWRkQnV5TGlzdGVuKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoRXF1aXBJdGVtKS5zb2xkT3V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLumHkeW4geWVhuW6l+S4reaIkOWKn+i0reS5sOeJqeWTgeeahOasoeaVsCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXRlbURhdGEuQ29zdEl0ZW0gPT0gUHJvcElkLkNvaW4pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkVG90YWwoRm9sbG93X1R5cGUu5Zyo6YeR5biB5ZWG5bqX5Lit5raI6ICX55qE6YeR5biB5pWw6YePLGl0ZW1EYXRhLkNvc3ROdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5Zyo6YeR5biB5ZWG5bqX5Lit5L2/55So6YeR5biB6LSt5Lmw54mp5ZOB55qE5qyh5pWwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihpdGVtRGF0YS5Db3N0SXRlbSA9PSBQcm9wSWQuR2VtKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFRvdGFsKEZvbGxvd19UeXBlLuWcqOmHkeW4geWVhuW6l+S4rea2iOiAl+eahOmSu+efs+aVsOmHjyxpdGVtRGF0YS5Db3N0TnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuWcqOmHkeW4geWVhuW6l+S4reS9v+eUqOmSu+efs+i0reS5sOeJqeWTgeeahOasoeaVsCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIkdvbGRNYWxsVWlfSXRlbVwiK2ksMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KFByb3ApLmluaXRTYWxlSXRlbShpdGVtRGF0YS5Db3N0SXRlbSxpdGVtRGF0YS5Db3N0TnVtICogKGRpc2NvdW50ICogMC4wMSksZGlzY291bnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoUHJvcCkuYWRkQnV5TGlzdGVuKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoUHJvcCkuc29sZE91dCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ph5HluIHllYblupfkuK3miJDlip/otK3kubDnianlk4HnmoTmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGl0ZW1EYXRhLkNvc3RJdGVtID09IFByb3BJZC5Db2luKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFRvdGFsKEZvbGxvd19UeXBlLuWcqOmHkeW4geWVhuW6l+S4rea2iOiAl+eahOmHkeW4geaVsOmHjyxpdGVtRGF0YS5Db3N0TnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuWcqOmHkeW4geWVhuW6l+S4reS9v+eUqOmHkeW4gei0reS5sOeJqeWTgeeahOasoeaVsCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoaXRlbURhdGEuQ29zdEl0ZW0gPT0gUHJvcElkLkdlbSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRUb3RhbChGb2xsb3dfVHlwZS7lnKjph5HluIHllYblupfkuK3mtojogJfnmoTpkrvnn7PmlbDph48saXRlbURhdGEuQ29zdE51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lnKjph5HluIHllYblupfkuK3kvb/nlKjpkrvnn7PotK3kubDnianlk4HnmoTmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJHb2xkTWFsbFVpX0l0ZW1cIitpLDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaFVpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihpc05ld0RheSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiR29sZE1hbGxVaV9JdGVtXCIraSxcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHR5cGUgPT0gMyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KEVxdWlwSXRlbSkuaW5pdFNhbGVJdGVtKGl0ZW1EYXRhLkNvc3RJdGVtLGl0ZW1EYXRhLkNvc3ROdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChFcXVpcEl0ZW0pLmFkZEJ1eUxpc3RlbigoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoRXF1aXBJdGVtKS5zb2xkT3V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6YeR5biB5ZWG5bqX5Lit5oiQ5Yqf6LSt5Lmw54mp5ZOB55qE5qyh5pWwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGl0ZW1EYXRhLkNvc3RJdGVtID09IFByb3BJZC5Db2luKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkVG90YWwoRm9sbG93X1R5cGUu5Zyo6YeR5biB5ZWG5bqX5Lit5raI6ICX55qE6YeR5biB5pWw6YePLGl0ZW1EYXRhLkNvc3ROdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lnKjph5HluIHllYblupfkuK3kvb/nlKjph5HluIHotK3kubDnianlk4HnmoTmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoaXRlbURhdGEuQ29zdEl0ZW0gPT0gUHJvcElkLkdlbSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFRvdGFsKEZvbGxvd19UeXBlLuWcqOmHkeW4geWVhuW6l+S4rea2iOiAl+eahOmSu+efs+aVsOmHjyxpdGVtRGF0YS5Db3N0TnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5Zyo6YeR5biB5ZWG5bqX5Lit5L2/55So6ZK755+z6LSt5Lmw54mp5ZOB55qE5qyh5pWwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIkdvbGRNYWxsVWlfSXRlbVwiK2ksMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hVaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoUHJvcCkuaW5pdFNhbGVJdGVtKGl0ZW1EYXRhLkNvc3RJdGVtLGl0ZW1EYXRhLkNvc3ROdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChQcm9wKS5hZGRCdXlMaXN0ZW4oKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KFByb3ApLnNvbGRPdXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ph5HluIHllYblupfkuK3miJDlip/otK3kubDnianlk4HnmoTmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXRlbURhdGEuQ29zdEl0ZW0gPT0gUHJvcElkLkNvaW4pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRUb3RhbChGb2xsb3dfVHlwZS7lnKjph5HluIHllYblupfkuK3mtojogJfnmoTph5HluIHmlbDph48saXRlbURhdGEuQ29zdE51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuWcqOmHkeW4geWVhuW6l+S4reS9v+eUqOmHkeW4gei0reS5sOeJqeWTgeeahOasoeaVsCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihpdGVtRGF0YS5Db3N0SXRlbSA9PSBQcm9wSWQuR2VtKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkVG90YWwoRm9sbG93X1R5cGUu5Zyo6YeR5biB5ZWG5bqX5Lit5raI6ICX55qE6ZK755+z5pWw6YePLGl0ZW1EYXRhLkNvc3ROdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lnKjph5HluIHllYblupfkuK3kvb/nlKjpkrvnn7PotK3kubDnianlk4HnmoTmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiR29sZE1hbGxVaV9JdGVtXCIraSwxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaFVpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIkdvbGRNYWxsVWlfSXRlbVwiK2kpID09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJHb2xkTWFsbFVpX0l0ZW1cIitpLFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIkdvbGRNYWxsVWlfSXRlbVwiK2kpICE9IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0eXBlID09IDMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoRXF1aXBJdGVtKS5zb2xkT3V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoUHJvcCkuc29sZE91dCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHR5cGUgPT0gMyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChFcXVpcEl0ZW0pLmluaXRTYWxlSXRlbShpdGVtRGF0YS5Db3N0SXRlbSxpdGVtRGF0YS5Db3N0TnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KEVxdWlwSXRlbSkuYWRkQnV5TGlzdGVuKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoRXF1aXBJdGVtKS5zb2xkT3V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLumHkeW4geWVhuW6l+S4reaIkOWKn+i0reS5sOeJqeWTgeeahOasoeaVsCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXRlbURhdGEuQ29zdEl0ZW0gPT0gUHJvcElkLkNvaW4pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkVG90YWwoRm9sbG93X1R5cGUu5Zyo6YeR5biB5ZWG5bqX5Lit5raI6ICX55qE6YeR5biB5pWw6YePLGl0ZW1EYXRhLkNvc3ROdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5Zyo6YeR5biB5ZWG5bqX5Lit5L2/55So6YeR5biB6LSt5Lmw54mp5ZOB55qE5qyh5pWwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihpdGVtRGF0YS5Db3N0SXRlbSA9PSBQcm9wSWQuR2VtKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFRvdGFsKEZvbGxvd19UeXBlLuWcqOmHkeW4geWVhuW6l+S4rea2iOiAl+eahOmSu+efs+aVsOmHjyxpdGVtRGF0YS5Db3N0TnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuWcqOmHkeW4geWVhuW6l+S4reS9v+eUqOmSu+efs+i0reS5sOeJqeWTgeeahOasoeaVsCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIkdvbGRNYWxsVWlfSXRlbVwiK2ksMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KFByb3ApLmluaXRTYWxlSXRlbShpdGVtRGF0YS5Db3N0SXRlbSxpdGVtRGF0YS5Db3N0TnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KFByb3ApLmFkZEJ1eUxpc3RlbigoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KFByb3ApLnNvbGRPdXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6YeR5biB5ZWG5bqX5Lit5oiQ5Yqf6LSt5Lmw54mp5ZOB55qE5qyh5pWwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpdGVtRGF0YS5Db3N0SXRlbSA9PSBQcm9wSWQuQ29pbil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRUb3RhbChGb2xsb3dfVHlwZS7lnKjph5HluIHllYblupfkuK3mtojogJfnmoTph5HluIHmlbDph48saXRlbURhdGEuQ29zdE51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lnKjph5HluIHllYblupfkuK3kvb/nlKjph5HluIHotK3kubDnianlk4HnmoTmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGl0ZW1EYXRhLkNvc3RJdGVtID09IFByb3BJZC5HZW0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkVG90YWwoRm9sbG93X1R5cGUu5Zyo6YeR5biB5ZWG5bqX5Lit5raI6ICX55qE6ZK755+z5pWw6YePLGl0ZW1EYXRhLkNvc3ROdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5Zyo6YeR5biB5ZWG5bqX5Lit5L2/55So6ZK755+z6LSt5Lmw54mp5ZOB55qE5qyh5pWwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiR29sZE1hbGxVaV9JdGVtXCIraSwxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hVaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gaXRlbS5nZXRDb21wb25lbnQoUHJvcCkuc29sZE91dCgpO1xyXG4gICAgICAgICAgICBpZighaXNOZXdEYXkpe1xyXG4gICAgICAgICAgICAgICAgaWYoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiR29sZE1hbGxVaUl0ZW1cIiArIGkpID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHR5cGUgPT0gMyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KEVxdWlwSXRlbSkuc29sZE91dCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChQcm9wKS5zb2xkT3V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnRlbnRSb3cuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgICAgIGl0ZW0ueSA9IDU1O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiU2hvcF9CdG5fUmVmcmVzaFwiKS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCkgPT57XHJcbiAgICAgICAgLy8gICAgIC8vIFRPRE8g5Yi35paw5oyJ6ZKuXHJcblxyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuUmVmcmVzaCgpe1xyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dDb25zdW1wdGlvblRpcFVpKG51bGwsUHJvcElkLkdlbSwxMDAsKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIui/m+ihjOWIt+aWsFwiKTtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoU2Nyb2xsKHRydWUpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICBnZXRJdGVtSWQoY2hhcHRlcjpudW1iZXIsaW5kZXg6bnVtYmVyKXtcclxuICAgICAgICByZXR1cm4gY2hhcHRlcioxMDAwK2luZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJhbmRvbUludChtaW4sIG1heCkge1xyXG4gICAgICAgIG1pbiA9IE1hdGguY2VpbChtaW4pO1xyXG4gICAgICAgIG1heCA9IE1hdGguZmxvb3IobWF4KTtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluOyAvL+S4jeWQq+acgOWkp+WAvO+8jOWQq+acgOWwj+WAvFxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuQ2xvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3lTZWxmKClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5vbkNsb3NlKCk7XHJcbiAgICAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNsb3NlQmFubmVyKCk7XHJcbiAgICAgICAgLy8gRXZlbnRNYW5hZ2VyLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfQ0hFQ0ssUmVkRXZlbnRUeXBlLkJ0bl9NYWluX1NpZ25Jbik7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==