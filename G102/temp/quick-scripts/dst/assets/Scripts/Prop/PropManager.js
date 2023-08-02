
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Prop/PropManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5d6ddQS7ixBcbPznrJxBIIi', 'PropManager');
// Scripts/Prop/PropManager.ts

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropManager = void 0;
var WXManagerEX_1 = require("../../startscene/WXManagerEX");
var HttpManager_1 = require(".././NetWork/HttpManager");
var EquipmentAttribute_1 = require("../Equipment/Data/EquipmentAttribute");
var EquipConfig_1 = require("../Equipment/EquipConfig");
var EquipmentManager_1 = require("../Equipment/EquipmentManager");
var GameManager_1 = require("../GameManager");
var HeroManager_1 = require("../Hero/Data/HeroManager");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var PetConfig_1 = require("../Pet/PetConfig");
var StorageConfig_1 = require("../Storage/StorageConfig");
var StorageManager_1 = require("../Storage/StorageManager");
var EventManager_1 = require("../Tools/EventManager");
var UserData_1 = require("../UserData");
var Item_1 = require("./Data/Item");
var Prop_1 = require("./Prop");
var PropConfig_1 = require("./PropConfig");
var PropManager = /** @class */ (function () {
    function PropManager() {
        //道具数据
        this.map_prop_num = null;
        //资源
        this.prop_item = null;
        this.prop_sale_item = null;
        this.item_atlas = null;
    }
    PropManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new PropManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    PropManager.prototype.init = function () {
        Item_1.ItemManager.getInstance();
        this.loadItemPrefab();
        this.loadSaleItemPrefab();
        this.loadSp();
    };
    //-----------------------资源的读取-----------------------------
    PropManager.prototype.loadItemPrefab = function () {
        var _this = this;
        if (this.prop_item)
            return;
        WXManagerEX_1.default.getInstance().resourcesBundle.load('prop/item', cc.Prefab, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            _this.prop_item = assets;
        });
    };
    PropManager.prototype.loadSaleItemPrefab = function () {
        var _this = this;
        if (this.prop_sale_item)
            return;
        WXManagerEX_1.default.getInstance().resourcesBundle.load('prop/saleItem', cc.Prefab, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            _this.prop_sale_item = assets;
        });
    };
    PropManager.prototype.loadSp = function () {
        var _this = this;
        if (this.item_atlas)
            return;
        WXManagerEX_1.default.getInstance().resourcesBundle.load('prop/item_list', cc.SpriteAtlas, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            _this.item_atlas = assets;
        });
    };
    /**资源 */
    PropManager.prototype.getSpByName = function (name) {
        return this.item_atlas.getSpriteFrame(name);
    };
    /**通过道具id获得一个精灵帧（不含装备宠物） */
    PropManager.prototype.getSpByPropId = function (propId) {
        var iconId = Item_1.ItemManager.getInstance().getQuoteIcon(propId);
        var iconSpName = "Item_" + iconId;
        return this.getSpByName(iconSpName);
    };
    PropManager.prototype.getEquipIcon = function (posType) {
        var iconSpName = "Weapon_" + posType;
        return this.getSpByName(iconSpName);
    };
    /**通过道具id获得类型(力量敏捷智力)的精灵帧*/
    PropManager.prototype.getSpTypeByType = function (type) {
        var iconSpName = "Hero_Type_" + type;
        return this.getSpByName(iconSpName);
    };
    PropManager.prototype.getSpFrameByPropType = function (propType) {
        var iconSpName = "Item_frame_" + Item_1.ItemManager.getInstance().getQuality(propType);
        return this.getSpByName(iconSpName);
    };
    PropManager.prototype.getSpFrameByExType = function (propType) {
        var iconSpName = "Item_frameEX_" + propType;
        return this.getSpByName(iconSpName);
    };
    PropManager.prototype.getSpFrameByCharioType = function (propType) {
        var iconSpName = "rIcon" + propType;
        return this.getSpByName(iconSpName);
    };
    /**通过英雄id获得一个头像 */
    PropManager.prototype.getSpheadPortraitType = function (propType) {
        var iconSpName = "Item_" + (110000 + propType); //Item_110001
        return this.getSpByName(iconSpName);
    };
    PropManager.prototype.createPropItem = function (propType, num, pAc, propPrice) {
        if (pAc === void 0) { pAc = PropConfig_1.PropAction.Look; }
        if (propPrice === void 0) { propPrice = 0; }
        var type = Item_1.ItemManager.getInstance().getType(propType);
        var prop = null;
        switch (type) {
            case 3:
                {
                    var info = new EquipConfig_1.EquipInfo();
                    info.equip_id = propType;
                    info.equip_num = num;
                    prop = EquipmentManager_1.EquipmentManager.getInstance().getEquipNodeByInfo(info, pAc);
                }
                break;
            // case 7:{
            // let petInfo=new PetInfo();
            // petInfo.pet_id=propType-70000;
            // petInfo.pet_level=1;
            // prop=PetManager.getInstance().createPetItem(petInfo);
            // }break;
            default: {
                prop = cc.instantiate(this.prop_item);
                prop.getComponent(Prop_1.default).init(propType, num, pAc);
            }
        }
        return prop;
    };
    PropManager.prototype.createSalePropItem = function (propType, num, pAc) {
        if (pAc === void 0) { pAc = PropConfig_1.PropAction.Look; }
        var type = Item_1.ItemManager.getInstance().getType(propType);
        var prop = null;
        if (type == 3) {
            prop = EquipmentManager_1.EquipmentManager.getInstance().getSaleEquipNodeById(propType, pAc);
        }
        else {
            prop = cc.instantiate(this.prop_sale_item);
            prop.getComponent(Prop_1.default).init(propType, num, pAc);
        }
        return prop;
    };
    /**
     * 获取道具的品质名称
     * @param quality 道具的品质
     */
    PropManager.prototype.getPropQualityName = function (quality) {
        var textId = 110005;
        switch (quality) {
            case 1:
                {
                    textId = 110005;
                }
                break;
            case 2:
                {
                    textId = 110007;
                }
                break;
            case 3:
                {
                    textId = 110009;
                }
                break;
            case 4:
                {
                    textId = 110011;
                }
                break;
            case 5:
                {
                    textId = 110013;
                }
                break;
            case 6:
                {
                    textId = 110013;
                }
                break;
        }
        return LanguageManager_1.default.getInstance().getStrByTextId(textId);
    };
    /**
     * 获取道具的品质名称的文本色值
     * @param quality 道具的品质
     */
    PropManager.prototype.getPropQualityTextColor = function (quality) {
        var color = cc.color();
        switch (quality) {
            case 0:
                {
                    color = cc.color(254, 246, 233);
                }
                break;
            case 1:
                {
                    color = cc.color(156, 226, 150);
                }
                break;
            case 2:
                {
                    color = cc.color(86, 149, 225);
                }
                break;
            case 3:
                {
                    color = cc.color(205, 158, 255);
                }
                break;
            case 4:
                {
                    color = cc.color(255, 249, 158);
                }
                break;
            case 5:
                {
                    color = cc.color(251, 95, 98);
                }
                break;
            case 6:
                {
                    color = cc.color(255, 255, 255);
                }
                break;
        }
        return color;
    };
    /**获取道具的品质名称的文本描边色值*/
    PropManager.prototype.getPropQualityTextOutlineColor = function () {
        var color = cc.color(37, 49, 71);
        return color;
    };
    /**获取英雄角标 */
    PropManager.prototype.getHeroIcon = function (heroType) {
        var iconSpName = "Equipped_Hero_" + heroType;
        return this.getSpByName(iconSpName);
    };
    /**获取白色英雄角标 */
    PropManager.prototype.getHeroIconb = function (heroType) {
        var iconSpName = "Head_Hero_S_" + heroType;
        return this.getSpByName(iconSpName);
    };
    /**-----------------------------------------------------数据----------------------------------------------------- */
    PropManager.prototype.loadPropData = function () {
        if (!this.map_prop_num) {
            this.map_prop_num = new Map();
            var idList = Item_1.ItemManager.getInstance().getPropIdList();
            var len = idList.length;
            for (var i = 0; i < len; i++) {
                var id = idList[i];
                var num = StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.PropNum + id, 0);
                if (id == PropConfig_1.PropId.Coin && num == 0) {
                    num = 2000;
                }
                this.setPropNum(id, num);
            }
        }
        //拉取服务器的
        if (UserData_1.default.getInstance().getUserID()) {
            this.HttpSyncPropData(false);
        }
    };
    /**
     *
     * @param propId 道具id
     * @param num 改变的数量
     * @returns 更改数据是否成功
     */
    PropManager.prototype.changePropNum = function (propId, num) {
        var type = Item_1.ItemManager.getInstance().getType(propId);
        // if(type==3){
        //     if(num>0){
        //         EquipmentManager.getInstance().addEquipment(propId);
        //         FollowManager.getInstance().followEvent(Follow_Type.对应道具ID的获得次数 + propId)
        //         return true;
        //     }
        //     return false;
        // }
        // if(type==7){
        //     if(num>0){
        //         // PetManager.getInstance().addPet(propId-70000);
        //         FollowManager.getInstance().followEvent(Follow_Type.对应道具ID的获得次数 + propId)
        //         return true;
        //     }
        //     return false;
        // }
        // 新增英雄
        if (type == 11) {
            if (HeroManager_1.HeroManager.getInstance().getHeroInfo(propId % 110000) == null) {
                HeroManager_1.HeroManager.getInstance().addHero(propId % 110000);
                return true;
            }
            else {
                PropManager.getInstance().changePropNum(propId - 10000, 20);
                return true;
            }
        }
        var newNum = this.getPropNum(propId) + num;
        if (newNum >= 0) {
            if (num > 0) {
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.对应道具ID的获得次数 + propId);
            }
            if (num < 0) {
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.对应道具ID的使用次数 + propId);
            }
            this.setPropNum(propId, newNum);
            if (PropConfig_1.PropId.Coin == propId && num < 0) {
                GameManager_1.default.getInstance().refreshCoinShow();
            }
            if (PropConfig_1.PropId.Gem == propId && num < 0)
                GameManager_1.default.getInstance().refreshGemShow();
            if (PropConfig_1.PropId.OrdinaryWishingCoin == propId && num > 0) {
                EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Shop);
            }
            return true;
        }
        return false;
    };
    PropManager.prototype.getPropNum = function (propId) {
        return this.map_prop_num.get(propId);
    };
    PropManager.prototype.setPropNum = function (propId, num, isSave) {
        if (isSave === void 0) { isSave = false; }
        this.map_prop_num.set(propId, num);
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.PropNum + propId, num);
        /**资源更改通知 */
        switch (propId) {
            case PropConfig_1.PropId.Coin:
                {
                    EventManager_1.EventManager.postAssetsEvent(EventManager_1.AssetsEventType.COIN);
                    // GameManager.getInstance().refreshCoinShow();
                }
                break;
            case PropConfig_1.PropId.Gem:
                {
                    EventManager_1.EventManager.postAssetsEvent(EventManager_1.AssetsEventType.GEM);
                    // GameManager.getInstance().refreshGemShow();
                }
                break;
            case PropConfig_1.PropId.HeroExp:
                {
                    EventManager_1.EventManager.postAssetsEvent(EventManager_1.AssetsEventType.HERO_EXP);
                }
                break;
            case PropConfig_1.PropId.HeroStone:
                {
                    EventManager_1.EventManager.postAssetsEvent(EventManager_1.AssetsEventType.HERO_STONE);
                }
                break;
            case PropConfig_1.PropId.AnimalFood:
                {
                    EventManager_1.EventManager.postAssetsEvent(EventManager_1.AssetsEventType.Animal_Food);
                }
                break;
            case 40004:
                {
                    // EventManager.postAssetsEvent(AssetsEventType.Animal_Food);
                    cc.director.emit("onRefreshInstanceItem");
                }
                break;
            case 40005:
                {
                    //EventManager.postAssetsEvent(AssetsEventType.Animal_Food);
                    cc.director.emit("onRefreshInstanceItem");
                }
                break;
            case 40006:
                {
                    //EventManager.postAssetsEvent(AssetsEventType.Animal_Food);
                    cc.director.emit("onRefreshInstanceItem");
                }
                break;
        }
        if (isSave) {
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.PropNum + propId, num);
        }
        // if(PropId.Gem==propId){
        //     //目前只上报钻石
        //     let propDatas=new Array<PropObject>();
        //     let propData=new PropObject();
        //     propData.itemsId=propId;
        //     propData.itemsNum=num;
        //     propDatas.push(propData);
        //     this.HttpSetPropData(propDatas);
        // }
    };
    /**获取装备的列表数据 */
    PropManager.prototype.getEquipmentList = function (equipType) {
        var EAM = EquipmentAttribute_1.EquipmentAttributeManager.getInstance();
        var IM = Item_1.ItemManager.getInstance();
        var list = new Array();
        this.map_prop_num.forEach(function (propNum, propId) {
            if (propNum > 0) {
                var propType = IM.getType(propId);
                //如果是装备
                if (propType == 3) {
                    var type = EAM.getEquipmentPosition(propId);
                    if (equipType == type) {
                        var prop = new EquipConfig_1.EquipInfo();
                        prop.equip_id = propId;
                        prop.equip_num = propNum;
                        list.push(prop);
                    }
                }
            }
        });
        if (list.length > 0) {
            //重新排列一下，品质最好在最前
            list.sort(function (a, b) {
                var levelA = EquipmentAttribute_1.EquipmentAttributeManager.getInstance().getStage(a.equip_id);
                var levelB = EquipmentAttribute_1.EquipmentAttributeManager.getInstance().getStage(b.equip_id);
                return levelB - levelA;
            });
        }
        return list;
    };
    /**获取宠物的列表数据 */
    PropManager.prototype.getPetList = function () {
        var IM = Item_1.ItemManager.getInstance();
        var list = new Array();
        this.map_prop_num.forEach(function (propNum, propId) {
            if (propNum > 0) {
                var propType = IM.getType(propId);
                //如果是装备
                if (propType == 7) {
                    var prop = new PetConfig_1.PetMessage();
                    prop.pet_id = propId;
                    prop.pet_num = propNum;
                    list.push(prop);
                }
            }
        });
        if (list.length > 0) {
            // todo 宠物排序，阶段高的在前面
            // list.sort((a:EquipInfo,b:EquipInfo)=>{
            //     let levelA=EquipmentAttributeManager.getInstance().getStage(a.equip_id);
            //     let levelB=EquipmentAttributeManager.getInstance().getStage(b.equip_id);
            //     return levelB-levelA;
            // });
        }
        return list;
    };
    /**保存这份列表，修改装备数量后调用 */
    PropManager.prototype.saveEquipmentList = function (list) {
        for (var i = 0; i < list.length; i++) {
            var prop = list[i];
            this.map_prop_num.set(prop.equip_id, prop.equip_num);
        }
    };
    /**把变量存储的值存放在本地文件 */
    PropManager.prototype.saveAllPropNum = function (isPost) {
        if (isPost === void 0) { isPost = true; }
        var list = [];
        this.map_prop_num.forEach(function (v, k) {
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.PropNum + k, v);
            var prop = new HttpManager_1.PropObject();
            prop.itemsId = k;
            prop.itemsNum = v;
            list.push(prop);
        });
        //提交到服务器
        if (isPost) {
            this.HttpSetPropData(list);
        }
    };
    /**获取到根据品质排序后的物品列表 */
    PropManager.prototype.getSortPropList = function () {
        var propList = new Array();
        this.map_prop_num.forEach(function (num, id) {
            var prop = {
                prop_id: id,
                prop_num: num,
            };
            if (num > 0) {
                propList.push(prop);
            }
        });
        propList.sort(function (a, b) {
            var qualityA = Item_1.ItemManager.getInstance().getQuality(a.prop_id);
            var qualityB = Item_1.ItemManager.getInstance().getQuality(b.prop_id);
            return qualityA - qualityB;
        });
        return propList;
    };
    /**提交修改申请 */
    PropManager.prototype.changePropServerTest = function () {
        var change = JSON.stringify({
            uid: 'fb123456',
            name: "props_change",
            value: [{ id: 10001, num: 20 }, { id: 10002, num: -30 }]
        });
        var issue = JSON.stringify({
            uid: 'fb123456',
            name: "props_issue",
            value: [{ id: 10001, num: 120 }, { id: 10002, num: 130 }]
        });
    };
    /*******************************************************服务端对接的代码****************************************************************** */
    /**同步服务器的道具数据至本地 */
    PropManager.prototype.HttpSyncPropData = function (isRefresh) {
        var _this = this;
        if (isRefresh === void 0) { isRefresh = true; }
        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.getProp, this.getPropJsonString(null)).then(function (data) {
            if (data) {
                var len = data.length;
                for (var i = 0; i < len; i++) {
                    var item = data[i];
                    _this.setPropNum(item.itemsId, item.itemsNum);
                }
                if (isRefresh) {
                    GameManager_1.default.getInstance().refreshGemShow();
                }
                //统一存储本地       
                _this.saveAllPropNum(false);
            }
        }).catch(function (error) {
            cc.error(error);
        });
    };
    PropManager.prototype.HttpSetPropData = function (propDatas) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                HttpManager_1.HttpManager.post(HttpManager_1.AccessName.setProp, this.getPropJsonString(propDatas)).then(function (data) {
                    cc.log('上报成功');
                }).catch(function (error) {
                    cc.log(error);
                });
                return [2 /*return*/];
            });
        });
    };
    PropManager.prototype.getPropJsonString = function (propDatas) {
        var uid = UserData_1.default.getInstance().getUserID();
        return JSON.stringify({
            uid: uid,
            gameUserItemNewList: propDatas,
        });
    };
    PropManager._instance = null;
    return PropManager;
}());
exports.PropManager = PropManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUHJvcFxcUHJvcE1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNERBQXVEO0FBQ3ZELHdEQUE0RjtBQUM1RiwyRUFBaUY7QUFDakYsd0RBQWdFO0FBQ2hFLGtFQUFpRTtBQUNqRSw4Q0FBeUM7QUFDekMsd0RBQXVEO0FBRXZELG9FQUErRDtBQUMvRCxnRUFBMkQ7QUFDM0Qsb0VBQStEO0FBQy9ELDhDQUFnRTtBQUVoRSwwREFBc0Q7QUFDdEQsNERBQThEO0FBQzlELHNEQUFvRztBQUNwRyx3Q0FBbUM7QUFDbkMsb0NBQTBDO0FBQzFDLCtCQUEwQjtBQUMxQiwyQ0FBNEQ7QUFHNUQ7SUFBQTtRQUdJLE1BQU07UUFDRSxpQkFBWSxHQUFvQixJQUFJLENBQUM7UUFDN0MsSUFBSTtRQUNJLGNBQVMsR0FBVyxJQUFJLENBQUM7UUFDekIsbUJBQWMsR0FBVyxJQUFJLENBQUM7UUFDOUIsZUFBVSxHQUFnQixJQUFJLENBQUM7SUFxZjNDLENBQUM7SUFsZmlCLHVCQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksV0FBVyxFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsU0FBUztJQUNELDBCQUFJLEdBQVo7UUFDSSxrQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVELDJEQUEyRDtJQUNuRCxv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LEVBQUMsU0FBUztTQUNoQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBM2ZjLHFCQUFTLEdBQWdCLElBQUksQ0FBQztJQTRmakQsa0JBQUM7Q0E3ZkQsQUE2ZkMsSUFBQTtBQTdmWSxrQ0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXWE1hbmFnZXJFWCBmcm9tIFwiLi4vLi4vc3RhcnRzY2VuZS9XWE1hbmFnZXJFWFwiO1xyXG5pbXBvcnQgeyBIdHRwTWFuYWdlciwgUGFyYW1zX1R5cGUsIEFjY2Vzc05hbWUsIFByb3BPYmplY3QgfSBmcm9tIFwiLi4vLi9OZXRXb3JrL0h0dHBNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIgfSBmcm9tIFwiLi4vRXF1aXBtZW50L0RhdGEvRXF1aXBtZW50QXR0cmlidXRlXCI7XHJcbmltcG9ydCB7IEVxdWlwSW5mbywgRXF1aXBUeXBlIH0gZnJvbSBcIi4uL0VxdWlwbWVudC9FcXVpcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBFcXVpcG1lbnRNYW5hZ2VyIH0gZnJvbSBcIi4uL0VxdWlwbWVudC9FcXVpcG1lbnRNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb01hbmFnZXIgfSBmcm9tIFwiLi4vSGVyby9EYXRhL0hlcm9NYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9fVHlwZSB9IGZyb20gXCIuLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFBldEluZm8sIFBldE1lc3NhZ2UsIFBldFR5cGUgfSBmcm9tIFwiLi4vUGV0L1BldENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBQZXRNYW5hZ2VyIH0gZnJvbSBcIi4uL1BldC9QZXRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2VLZXkgfSBmcm9tIFwiLi4vU3RvcmFnZS9TdG9yYWdlQ29uZmlnXCI7XHJcbmltcG9ydCB7IFRoZVN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uL1N0b3JhZ2UvU3RvcmFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQXNzZXRzRXZlbnRUeXBlLCBFdmVudE1hbmFnZXIsIFJlZEV2ZW50U3RyaW5nLCBSZWRFdmVudFR5cGUgfSBmcm9tIFwiLi4vVG9vbHMvRXZlbnRNYW5hZ2VyXCI7XHJcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi4vVXNlckRhdGFcIjtcclxuaW1wb3J0IHsgSXRlbU1hbmFnZXIgfSBmcm9tIFwiLi9EYXRhL0l0ZW1cIjtcclxuaW1wb3J0IFByb3AgZnJvbSBcIi4vUHJvcFwiO1xyXG5pbXBvcnQgeyBQcm9wQWN0aW9uLCBQcm9wRGF0YSwgUHJvcElkIH0gZnJvbSBcIi4vUHJvcENvbmZpZ1wiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBQcm9wTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFByb3BNYW5hZ2VyID0gbnVsbDtcclxuXHJcbiAgICAvL+mBk+WFt+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBtYXBfcHJvcF9udW06TWFwPG51bWJlcixudW1iZXI+PW51bGw7XHJcbiAgICAvL+i1hOa6kFxyXG4gICAgcHJpdmF0ZSBwcm9wX2l0ZW06Y2MuUHJlZmFiPW51bGw7XHJcbiAgICBwcml2YXRlIHByb3Bfc2FsZV9pdGVtOmNjLlByZWZhYj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpdGVtX2F0bGFzOmNjLlNwcml0ZUF0bGFzPW51bGw7XHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpQcm9wTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IFByb3BNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQgKCkge1xyXG4gICAgICAgIEl0ZW1NYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgdGhpcy5sb2FkSXRlbVByZWZhYigpO1xyXG4gICAgICAgIHRoaXMubG9hZFNhbGVJdGVtUHJlZmFiKCk7XHJcbiAgICAgICAgdGhpcy5sb2FkU3AoKTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3otYTmupDnmoTor7vlj5YtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgcHJpdmF0ZSBsb2FkSXRlbVByZWZhYigpe1xyXG4gICAgICAgIGlmKHRoaXMucHJvcF9pdGVtKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnJlc291cmNlc0J1bmRsZS5sb2FkKCdwcm9wL2l0ZW0nLGNjLlByZWZhYiwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICBpZihlcnJvcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucHJvcF9pdGVtPWFzc2V0cztcclxuICAgICAgICB9KTtcclxuICAgIH0gICAgXHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkU2FsZUl0ZW1QcmVmYWIoKXtcclxuICAgICAgICBpZih0aGlzLnByb3Bfc2FsZV9pdGVtKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnJlc291cmNlc0J1bmRsZS5sb2FkKCdwcm9wL3NhbGVJdGVtJyxjYy5QcmVmYWIsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgaWYoZXJyb3IpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnByb3Bfc2FsZV9pdGVtPWFzc2V0cztcclxuICAgICAgICB9KTtcclxuICAgIH0gXHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkU3AoKXtcclxuICAgICAgICBpZih0aGlzLml0ZW1fYXRsYXMpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucmVzb3VyY2VzQnVuZGxlLmxvYWQoJ3Byb3AvaXRlbV9saXN0JyxjYy5TcHJpdGVBdGxhcywoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuU3ByaXRlQXRsYXMpPT57XHJcbiAgICAgICAgICAgIGlmKGVycm9yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pdGVtX2F0bGFzPWFzc2V0czsgICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8qKui1hOa6kCAqL1xyXG4gICAgcHVibGljIGdldFNwQnlOYW1lKG5hbWU6c3RyaW5nKTpjYy5TcHJpdGVGcmFtZXtcclxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtX2F0bGFzLmdldFNwcml0ZUZyYW1lKG5hbWUpO1xyXG4gICAgfVxyXG4gICAgLyoq6YCa6L+H6YGT5YW3aWTojrflvpfkuIDkuKrnsr7ngbXluKfvvIjkuI3lkKvoo4XlpIflrqDnianvvIkgKi9cclxuICAgIHB1YmxpYyBnZXRTcEJ5UHJvcElkKHByb3BJZDpQcm9wSWQpOmNjLlNwcml0ZUZyYW1le1xyXG4gICAgICAgIGxldCBpY29uSWQ9SXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdW90ZUljb24ocHJvcElkKTtcclxuICAgICAgICBsZXQgaWNvblNwTmFtZT1cIkl0ZW1fXCIraWNvbklkO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFNwQnlOYW1lKGljb25TcE5hbWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0RXF1aXBJY29uKHBvc1R5cGU6bnVtYmVyKTpjYy5TcHJpdGVGcmFtZXtcclxuICAgICAgICBsZXQgaWNvblNwTmFtZT1cIldlYXBvbl9cIitwb3NUeXBlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFNwQnlOYW1lKGljb25TcE5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKumAmui/h+mBk+WFt2lk6I635b6X57G75Z6LKOWKm+mHj+aVj+aNt+aZuuWKmynnmoTnsr7ngbXluKcqL1xyXG4gICAgcHVibGljIGdldFNwVHlwZUJ5VHlwZSh0eXBlOlBldFR5cGUpOmNjLlNwcml0ZUZyYW1le1xyXG4gICAgICAgIGxldCBpY29uU3BOYW1lPVwiSGVyb19UeXBlX1wiK3R5cGU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3BCeU5hbWUoaWNvblNwTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFNwRnJhbWVCeVByb3BUeXBlKHByb3BUeXBlOlByb3BJZCk6Y2MuU3ByaXRlRnJhbWV7XHJcbiAgICAgICAgbGV0IGljb25TcE5hbWU9XCJJdGVtX2ZyYW1lX1wiK0l0ZW1NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eShwcm9wVHlwZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3BCeU5hbWUoaWNvblNwTmFtZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0U3BGcmFtZUJ5RXhUeXBlKHByb3BUeXBlOm51bWJlcik6Y2MuU3ByaXRlRnJhbWV7XHJcbiAgICAgICAgbGV0IGljb25TcE5hbWU9XCJJdGVtX2ZyYW1lRVhfXCIrcHJvcFR5cGU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3BCeU5hbWUoaWNvblNwTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFNwRnJhbWVCeUNoYXJpb1R5cGUocHJvcFR5cGU6bnVtYmVyKTpjYy5TcHJpdGVGcmFtZXtcclxuICAgICAgICBsZXQgaWNvblNwTmFtZT1cInJJY29uXCIrcHJvcFR5cGU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3BCeU5hbWUoaWNvblNwTmFtZSk7XHJcbiAgICB9XHJcbiAgICAvKirpgJrov4foi7Hpm4RpZOiOt+W+l+S4gOS4quWktOWDjyAqL1xyXG4gICAgcHVibGljIGdldFNwaGVhZFBvcnRyYWl0VHlwZShwcm9wVHlwZTpudW1iZXIpOmNjLlNwcml0ZUZyYW1le1xyXG4gICAgICAgIGxldCBpY29uU3BOYW1lPVwiSXRlbV9cIisoMTEwMDAwK3Byb3BUeXBlKTsvL0l0ZW1fMTEwMDAxXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3BCeU5hbWUoaWNvblNwTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZVByb3BJdGVtKHByb3BUeXBlOlByb3BJZCxudW06bnVtYmVyLHBBYzpQcm9wQWN0aW9uPVByb3BBY3Rpb24uTG9vayxwcm9wUHJpY2U6bnVtYmVyPTApOmNjLk5vZGV7XHJcbiAgICAgICAgbGV0IHR5cGU9SXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUeXBlKHByb3BUeXBlKTtcclxuICAgICAgICBsZXQgcHJvcDpjYy5Ob2RlPW51bGw7XHJcbiAgICAgICBcclxuICAgICAgICBzd2l0Y2godHlwZSl7XHJcbiAgICAgICAgICAgIGNhc2UgMzp7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5mbyA9IG5ldyBFcXVpcEluZm8oKTtcclxuICAgICAgICAgICAgICAgIGluZm8uZXF1aXBfaWQgPSBwcm9wVHlwZTtcclxuICAgICAgICAgICAgICAgIGluZm8uZXF1aXBfbnVtID0gbnVtO1xyXG4gICAgICAgICAgICAgICAgcHJvcD1FcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RXF1aXBOb2RlQnlJbmZvKGluZm8scEFjKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAvLyBjYXNlIDc6e1xyXG4gICAgICAgICAgICAgICAgLy8gbGV0IHBldEluZm89bmV3IFBldEluZm8oKTtcclxuICAgICAgICAgICAgICAgIC8vIHBldEluZm8ucGV0X2lkPXByb3BUeXBlLTcwMDAwO1xyXG4gICAgICAgICAgICAgICAgLy8gcGV0SW5mby5wZXRfbGV2ZWw9MTtcclxuICAgICAgICAgICAgICAgIC8vIHByb3A9UGV0TWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVBldEl0ZW0ocGV0SW5mbyk7XHJcbiAgICAgICAgICAgIC8vIH1icmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDp7XHJcbiAgICAgICAgICAgICAgICBwcm9wPWNjLmluc3RhbnRpYXRlKHRoaXMucHJvcF9pdGVtKTtcclxuICAgICAgICAgICAgICAgIHByb3AuZ2V0Q29tcG9uZW50KFByb3ApLmluaXQocHJvcFR5cGUsbnVtLHBBYyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByb3A7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZVNhbGVQcm9wSXRlbShwcm9wVHlwZTpQcm9wSWQsbnVtOm51bWJlcixwQWM6UHJvcEFjdGlvbj1Qcm9wQWN0aW9uLkxvb2spOmNjLk5vZGV7XHJcbiAgICAgICAgbGV0IHR5cGU9SXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUeXBlKHByb3BUeXBlKTtcclxuICAgICAgICBsZXQgcHJvcDpjYy5Ob2RlPW51bGw7XHJcbiAgICAgICAgaWYodHlwZT09Myl7XHJcbiAgICAgICAgICAgIHByb3A9RXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNhbGVFcXVpcE5vZGVCeUlkKHByb3BUeXBlLHBBYyk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHByb3A9Y2MuaW5zdGFudGlhdGUodGhpcy5wcm9wX3NhbGVfaXRlbSk7XHJcbiAgICAgICAgICAgIHByb3AuZ2V0Q29tcG9uZW50KFByb3ApLmluaXQocHJvcFR5cGUsbnVtLHBBYyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9wO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W6YGT5YW355qE5ZOB6LSo5ZCN56ewXHJcbiAgICAgKiBAcGFyYW0gcXVhbGl0eSDpgZPlhbfnmoTlk4HotKhcclxuICAgICAqL1xyXG4gICAgZ2V0UHJvcFF1YWxpdHlOYW1lKHF1YWxpdHk6bnVtYmVyKTpzdHJpbmd7XHJcbiAgICAgICAgbGV0IHRleHRJZD0xMTAwMDU7XHJcbiAgICAgICAgc3dpdGNoKHF1YWxpdHkpe1xyXG4gICAgICAgICAgICBjYXNlIDE6e1xyXG4gICAgICAgICAgICAgICAgdGV4dElkPTExMDAwNTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6e1xyXG4gICAgICAgICAgICAgICAgdGV4dElkPTExMDAwNztcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6e1xyXG4gICAgICAgICAgICAgICAgdGV4dElkPTExMDAwOTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6e1xyXG4gICAgICAgICAgICAgICAgdGV4dElkPTExMDAxMTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6e1xyXG4gICAgICAgICAgICAgICAgdGV4dElkPTExMDAxMztcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDY6e1xyXG4gICAgICAgICAgICAgICAgdGV4dElkPTExMDAxMztcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQodGV4dElkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlumBk+WFt+eahOWTgei0qOWQjeensOeahOaWh+acrOiJsuWAvFxyXG4gICAgICogQHBhcmFtIHF1YWxpdHkg6YGT5YW355qE5ZOB6LSoXHJcbiAgICAgKi9cclxuICAgICBnZXRQcm9wUXVhbGl0eVRleHRDb2xvcihxdWFsaXR5Om51bWJlcik6Y2MuQ29sb3J7XHJcbiAgICAgICAgbGV0IGNvbG9yPWNjLmNvbG9yKCk7XHJcbiAgICAgICAgc3dpdGNoKHF1YWxpdHkpe1xyXG4gICAgICAgICAgICBjYXNlIDA6e1xyXG4gICAgICAgICAgICAgICAgY29sb3I9Y2MuY29sb3IoMjU0LCAyNDYsIDIzMyk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOnsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjb2xvcj1jYy5jb2xvcigxNTYsIDIyNiwgMTUwKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6e1xyXG4gICAgICAgICAgICAgICAgY29sb3I9Y2MuY29sb3IoODYsIDE0OSwgMjI1KTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6e1xyXG4gICAgICAgICAgICAgICAgY29sb3I9Y2MuY29sb3IoMjA1LCAxNTgsIDI1NSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OntcclxuICAgICAgICAgICAgICAgIGNvbG9yPWNjLmNvbG9yKDI1NSwgMjQ5LCAxNTgpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTp7XHJcbiAgICAgICAgICAgICAgICBjb2xvcj1jYy5jb2xvcigyNTEsIDk1LCA5OCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OntcclxuICAgICAgICAgICAgICAgIGNvbG9yPWNjLmNvbG9yKDI1NSwgMjU1LCAyNTUpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICAvKirojrflj5bpgZPlhbfnmoTlk4HotKjlkI3np7DnmoTmlofmnKzmj4/ovrnoibLlgLwqL1xyXG4gICAgIGdldFByb3BRdWFsaXR5VGV4dE91dGxpbmVDb2xvcigpOmNjLkNvbG9ye1xyXG4gICAgICAgIGxldCBjb2xvcj1jYy5jb2xvcigzNywgNDksIDcxKTsgICAgICAgIFxyXG4gICAgICAgIHJldHVybiBjb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICAvKirojrflj5boi7Hpm4Top5LmoIcgKi9cclxuICAgIGdldEhlcm9JY29uKGhlcm9UeXBlOkhlcm9fVHlwZSk6Y2MuU3ByaXRlRnJhbWV7XHJcbiAgICAgICAgbGV0IGljb25TcE5hbWU9XCJFcXVpcHBlZF9IZXJvX1wiK2hlcm9UeXBlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFNwQnlOYW1lKGljb25TcE5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiOt+WPlueZveiJsuiLsembhOinkuaghyAqL1xyXG4gICAgZ2V0SGVyb0ljb25iKGhlcm9UeXBlOkhlcm9fVHlwZSk6Y2MuU3ByaXRlRnJhbWV7XHJcbiAgICAgICAgbGV0IGljb25TcE5hbWU9XCJIZWFkX0hlcm9fU19cIitoZXJvVHlwZTtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRTcEJ5TmFtZShpY29uU3BOYW1lKTtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIC8qKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5pWw5o2uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICAgIHB1YmxpYyBsb2FkUHJvcERhdGEoKXtcclxuICAgICAgICBpZighdGhpcy5tYXBfcHJvcF9udW0pe1xyXG4gICAgICAgICAgICB0aGlzLm1hcF9wcm9wX251bT1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgICAgIGxldCBpZExpc3Q9SXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wSWRMaXN0KCk7XHJcbiAgICAgICAgICAgIGxldCBsZW49aWRMaXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8bGVuOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGlkPWlkTGlzdFtpXTtcclxuICAgICAgICAgICAgICAgIGxldCBudW09VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbnQoU3RvcmFnZUtleS5Qcm9wTnVtK2lkLDApO1xyXG4gICAgICAgICAgICAgICAgaWYoaWQ9PVByb3BJZC5Db2luJiZudW09PTApe1xyXG4gICAgICAgICAgICAgICAgICAgIG51bT0yMDAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQcm9wTnVtKGlkLG51bSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mi4nlj5bmnI3liqHlmajnmoRcclxuICAgICAgICBpZihVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpKXtcclxuICAgICAgICAgICAgdGhpcy5IdHRwU3luY1Byb3BEYXRhKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHByb3BJZCDpgZPlhbdpZFxyXG4gICAgICogQHBhcmFtIG51bSDmlLnlj5jnmoTmlbDph49cclxuICAgICAqIEByZXR1cm5zIOabtOaUueaVsOaNruaYr+WQpuaIkOWKn1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2hhbmdlUHJvcE51bShwcm9wSWQ6bnVtYmVyLG51bTpudW1iZXIpOmJvb2xlYW57XHJcbiAgICAgICAgbGV0IHR5cGU9SXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUeXBlKHByb3BJZCk7XHJcbiAgICAgICAgLy8gaWYodHlwZT09Myl7XHJcbiAgICAgICAgLy8gICAgIGlmKG51bT4wKXtcclxuICAgICAgICAvLyAgICAgICAgIEVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFcXVpcG1lbnQocHJvcElkKTtcclxuICAgICAgICAvLyAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lr7nlupTpgZPlhbdJROeahOiOt+W+l+asoeaVsCArIHByb3BJZClcclxuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gaWYodHlwZT09Nyl7XHJcbiAgICAgICAgLy8gICAgIGlmKG51bT4wKXtcclxuICAgICAgICAvLyAgICAgICAgIC8vIFBldE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRQZXQocHJvcElkLTcwMDAwKTtcclxuICAgICAgICAvLyAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lr7nlupTpgZPlhbdJROeahOiOt+W+l+asoeaVsCArIHByb3BJZClcclxuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8g5paw5aKe6Iux6ZuEXHJcbiAgICAgICAgaWYodHlwZSA9PSAxMSl7XHJcbiAgICAgICAgICAgIGlmKEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0luZm8ocHJvcElkICUgMTEwMDAwKSA9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkSGVybyhwcm9wSWQgJSAxMTAwMDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0ocHJvcElkIC0gMTAwMDAsMjApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuZXdOdW09dGhpcy5nZXRQcm9wTnVtKHByb3BJZCkrbnVtO1xyXG4gICAgICAgIGlmKG5ld051bT49MCl7XHJcbiAgICAgICAgICAgIGlmKG51bSA+IDApe1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuWvueW6lOmBk+WFt0lE55qE6I635b6X5qyh5pWwICsgcHJvcElkKTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgaWYobnVtIDwgMCl7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5a+55bqU6YGT5YW3SUTnmoTkvb/nlKjmrKHmlbAgKyBwcm9wSWQpO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICB0aGlzLnNldFByb3BOdW0ocHJvcElkLG5ld051bSk7XHJcbiAgICAgICAgICAgIGlmKFByb3BJZC5Db2luPT1wcm9wSWQgJiYgbnVtIDwgMCl7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hDb2luU2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKFByb3BJZC5HZW09PXByb3BJZCAmJiBudW0gPCAwKSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hHZW1TaG93KCk7ICBcclxuICAgICAgICAgICAgaWYoUHJvcElkLk9yZGluYXJ5V2lzaGluZ0NvaW49PXByb3BJZCAmJiBudW0gPiAwKXtcclxuICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLFJlZEV2ZW50VHlwZS5CdG5fU2hvcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UHJvcE51bShwcm9wSWQ6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwX3Byb3BfbnVtLmdldChwcm9wSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRQcm9wTnVtKHByb3BJZDpudW1iZXIsbnVtOm51bWJlcixpc1NhdmU6Ym9vbGVhbj1mYWxzZSl7XHJcbiAgICAgICAgdGhpcy5tYXBfcHJvcF9udW0uc2V0KHByb3BJZCxudW0pO1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlByb3BOdW0rcHJvcElkLG51bSk7XHJcbiAgICAgICAgLyoq6LWE5rqQ5pu05pS56YCa55+lICovXHJcbiAgICAgICAgc3dpdGNoKHByb3BJZCl7XHJcbiAgICAgICAgICAgIGNhc2UgUHJvcElkLkNvaW46e1xyXG4gICAgICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLnBvc3RBc3NldHNFdmVudChBc3NldHNFdmVudFR5cGUuQ09JTik7XHJcbiAgICAgICAgICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hDb2luU2hvdygpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUHJvcElkLkdlbTp7XHJcbiAgICAgICAgICAgICAgICBFdmVudE1hbmFnZXIucG9zdEFzc2V0c0V2ZW50KEFzc2V0c0V2ZW50VHlwZS5HRU0pO1xyXG4gICAgICAgICAgICAgICAgLy8gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoR2VtU2hvdygpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUHJvcElkLkhlcm9FeHA6e1xyXG4gICAgICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLnBvc3RBc3NldHNFdmVudChBc3NldHNFdmVudFR5cGUuSEVST19FWFApO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUHJvcElkLkhlcm9TdG9uZTp7XHJcbiAgICAgICAgICAgICAgICBFdmVudE1hbmFnZXIucG9zdEFzc2V0c0V2ZW50KEFzc2V0c0V2ZW50VHlwZS5IRVJPX1NUT05FKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFByb3BJZC5BbmltYWxGb29kOntcclxuICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci5wb3N0QXNzZXRzRXZlbnQoQXNzZXRzRXZlbnRUeXBlLkFuaW1hbF9Gb29kKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQwMDA0OntcclxuICAgICAgICAgICAgICAgIC8vIEV2ZW50TWFuYWdlci5wb3N0QXNzZXRzRXZlbnQoQXNzZXRzRXZlbnRUeXBlLkFuaW1hbF9Gb29kKTtcclxuICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmVtaXQoXCJvblJlZnJlc2hJbnN0YW5jZUl0ZW1cIik7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSA0MDAwNTp7XHJcbiAgICAgICAgICAgICAgICAvL0V2ZW50TWFuYWdlci5wb3N0QXNzZXRzRXZlbnQoQXNzZXRzRXZlbnRUeXBlLkFuaW1hbF9Gb29kKTtcclxuICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmVtaXQoXCJvblJlZnJlc2hJbnN0YW5jZUl0ZW1cIik7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSA0MDAwNjp7XHJcbiAgICAgICAgICAgICAgICAvL0V2ZW50TWFuYWdlci5wb3N0QXNzZXRzRXZlbnQoQXNzZXRzRXZlbnRUeXBlLkFuaW1hbF9Gb29kKTtcclxuICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmVtaXQoXCJvblJlZnJlc2hJbnN0YW5jZUl0ZW1cIik7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaXNTYXZlKXtcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuUHJvcE51bStwcm9wSWQsbnVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYoUHJvcElkLkdlbT09cHJvcElkKXtcclxuICAgICAgICAvLyAgICAgLy/nm67liY3lj6rkuIrmiqXpkrvnn7NcclxuICAgICAgICAvLyAgICAgbGV0IHByb3BEYXRhcz1uZXcgQXJyYXk8UHJvcE9iamVjdD4oKTtcclxuICAgICAgICAvLyAgICAgbGV0IHByb3BEYXRhPW5ldyBQcm9wT2JqZWN0KCk7XHJcbiAgICAgICAgLy8gICAgIHByb3BEYXRhLml0ZW1zSWQ9cHJvcElkO1xyXG4gICAgICAgIC8vICAgICBwcm9wRGF0YS5pdGVtc051bT1udW07XHJcbiAgICAgICAgLy8gICAgIHByb3BEYXRhcy5wdXNoKHByb3BEYXRhKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5IdHRwU2V0UHJvcERhdGEocHJvcERhdGFzKTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635Y+W6KOF5aSH55qE5YiX6KGo5pWw5o2uICovXHJcbiAgICBnZXRFcXVpcG1lbnRMaXN0KGVxdWlwVHlwZTpFcXVpcFR5cGUpOkVxdWlwSW5mb1tde1xyXG4gICAgICAgIGxldCBFQU09RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGxldCBJTT1JdGVtTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGxldCBsaXN0PW5ldyBBcnJheSgpO1xyXG4gICAgICAgIHRoaXMubWFwX3Byb3BfbnVtLmZvckVhY2goKHByb3BOdW0scHJvcElkKT0+e1xyXG4gICAgICAgICAgICBpZihwcm9wTnVtPjApe1xyXG4gICAgICAgICAgICAgICAgbGV0IHByb3BUeXBlPUlNLmdldFR5cGUocHJvcElkKTtcclxuICAgICAgICAgICAgICAgIC8v5aaC5p6c5piv6KOF5aSHXHJcbiAgICAgICAgICAgICAgICBpZihwcm9wVHlwZT09Myl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR5cGU9RUFNLmdldEVxdWlwbWVudFBvc2l0aW9uKHByb3BJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZXF1aXBUeXBlPT10eXBlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb3A9bmV3IEVxdWlwSW5mbygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3AuZXF1aXBfaWQ9cHJvcElkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wLmVxdWlwX251bT1wcm9wTnVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0LnB1c2gocHJvcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZihsaXN0Lmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgLy/ph43mlrDmjpLliJfkuIDkuIvvvIzlk4HotKjmnIDlpb3lnKjmnIDliY1cclxuICAgICAgICAgICAgbGlzdC5zb3J0KChhOkVxdWlwSW5mbyxiOkVxdWlwSW5mbyk9PntcclxuICAgICAgICAgICAgICAgIGxldCBsZXZlbEE9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0YWdlKGEuZXF1aXBfaWQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxldmVsQj1FcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RhZ2UoYi5lcXVpcF9pZCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGV2ZWxCLWxldmVsQTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9XHJcbiAgICAvKirojrflj5blrqDniannmoTliJfooajmlbDmja4gKi9cclxuICAgIGdldFBldExpc3QoKTpQZXRNZXNzYWdlW117XHJcbiAgICAgICAgbGV0IElNPUl0ZW1NYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgbGV0IGxpc3Q9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgdGhpcy5tYXBfcHJvcF9udW0uZm9yRWFjaCgocHJvcE51bSxwcm9wSWQpPT57XHJcbiAgICAgICAgICAgIGlmKHByb3BOdW0+MCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgcHJvcFR5cGU9SU0uZ2V0VHlwZShwcm9wSWQpO1xyXG4gICAgICAgICAgICAgICAgLy/lpoLmnpzmmK/oo4XlpIdcclxuICAgICAgICAgICAgICAgIGlmKHByb3BUeXBlPT03KXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvcD1uZXcgUGV0TWVzc2FnZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3AucGV0X2lkPXByb3BJZDtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wLnBldF9udW09cHJvcE51bTtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0LnB1c2gocHJvcCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmKGxpc3QubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAvLyB0b2RvIOWuoOeJqeaOkuW6j++8jOmYtuautemrmOeahOWcqOWJjemdolxyXG4gICAgICAgICAgICAvLyBsaXN0LnNvcnQoKGE6RXF1aXBJbmZvLGI6RXF1aXBJbmZvKT0+e1xyXG4gICAgICAgICAgICAvLyAgICAgbGV0IGxldmVsQT1FcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RhZ2UoYS5lcXVpcF9pZCk7XHJcbiAgICAgICAgICAgIC8vICAgICBsZXQgbGV2ZWxCPUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdGFnZShiLmVxdWlwX2lkKTtcclxuICAgICAgICAgICAgLy8gICAgIHJldHVybiBsZXZlbEItbGV2ZWxBO1xyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICByZXR1cm4gbGlzdDtcclxuICAgIH1cclxuICAgIC8qKuS/neWtmOi/meS7veWIl+ihqO+8jOS/ruaUueijheWkh+aVsOmHj+WQjuiwg+eUqCAqL1xyXG4gICAgc2F2ZUVxdWlwbWVudExpc3QobGlzdDpFcXVpcEluZm9bXSl7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8bGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBwcm9wPWxpc3RbaV07XHJcbiAgICAgICAgICAgIHRoaXMubWFwX3Byb3BfbnVtLnNldChwcm9wLmVxdWlwX2lkLHByb3AuZXF1aXBfbnVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5oqK5Y+Y6YeP5a2Y5YKo55qE5YC85a2Y5pS+5Zyo5pys5Zyw5paH5Lu2ICovXHJcbiAgICBwdWJsaWMgc2F2ZUFsbFByb3BOdW0oaXNQb3N0OmJvb2xlYW49dHJ1ZSl7XHJcbiAgICAgICAgbGV0IGxpc3Q6UHJvcE9iamVjdFtdPVtdO1xyXG4gICAgICAgIHRoaXMubWFwX3Byb3BfbnVtLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuUHJvcE51bStrLHYpO1xyXG4gICAgICAgICAgICBsZXQgcHJvcD1uZXcgUHJvcE9iamVjdCgpO1xyXG4gICAgICAgICAgICBwcm9wLml0ZW1zSWQ9aztcclxuICAgICAgICAgICAgcHJvcC5pdGVtc051bT12O1xyXG4gICAgICAgICAgICBsaXN0LnB1c2gocHJvcClcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8v5o+Q5Lqk5Yiw5pyN5Yqh5ZmoXHJcbiAgICAgICAgaWYoaXNQb3N0KXtcclxuICAgICAgICAgICAgdGhpcy5IdHRwU2V0UHJvcERhdGEobGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKuiOt+WPluWIsOagueaNruWTgei0qOaOkuW6j+WQjueahOeJqeWTgeWIl+ihqCAqL1xyXG4gICAgcHVibGljIGdldFNvcnRQcm9wTGlzdCgpe1xyXG4gICAgICAgIGxldCBwcm9wTGlzdDpQcm9wRGF0YVtdID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgdGhpcy5tYXBfcHJvcF9udW0uZm9yRWFjaCgobnVtLGlkKSA9PntcclxuICAgICAgICAgICAgbGV0IHByb3AgPSB7XHJcbiAgICAgICAgICAgICAgICBwcm9wX2lkOiBpZCxcclxuICAgICAgICAgICAgICAgIHByb3BfbnVtOiBudW0sXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYobnVtPjApe1xyXG4gICAgICAgICAgICAgICAgcHJvcExpc3QucHVzaChwcm9wKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcHJvcExpc3Quc29ydCgoYTpQcm9wRGF0YSxiOlByb3BEYXRhKT0+e1xyXG4gICAgICAgICAgICBsZXQgcXVhbGl0eUEgPSBJdGVtTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YWxpdHkoYS5wcm9wX2lkKTtcclxuICAgICAgICAgICAgbGV0IHF1YWxpdHlCID0gSXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KGIucHJvcF9pZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBxdWFsaXR5QSAtIHF1YWxpdHlCO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIHByb3BMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuaPkOS6pOS/ruaUueeUs+ivtyAqL1xyXG4gICAgY2hhbmdlUHJvcFNlcnZlclRlc3QoKXtcclxuICAgICAgICBsZXQgY2hhbmdlPUpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgdWlkOidmYjEyMzQ1NicsXHJcbiAgICAgICAgICAgIG5hbWU6XCJwcm9wc19jaGFuZ2VcIixcclxuICAgICAgICAgICAgdmFsdWU6W3tpZDoxMDAwMSxudW06MjB9LHtpZDoxMDAwMixudW06LTMwfV1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGlzc3VlPUpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgdWlkOidmYjEyMzQ1NicsXHJcbiAgICAgICAgICAgIG5hbWU6XCJwcm9wc19pc3N1ZVwiLFxyXG4gICAgICAgICAgICB2YWx1ZTpbe2lkOjEwMDAxLG51bToxMjB9LHtpZDoxMDAwMixudW06MTMwfV1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq5pyN5Yqh56uv5a+55o6l55qE5Luj56CBKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbiAgICAvKirlkIzmraXmnI3liqHlmajnmoTpgZPlhbfmlbDmja7oh7PmnKzlnLAgKi9cclxuICAgIEh0dHBTeW5jUHJvcERhdGEoaXNSZWZyZXNoOmJvb2xlYW49dHJ1ZSl7XHJcbiAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLmdldFByb3AsdGhpcy5nZXRQcm9wSnNvblN0cmluZyhudWxsKSkudGhlbigoZGF0YTphbnkpPT57XHJcbiAgICAgICAgICAgIGlmKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGxlbj1kYXRhLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGxlbjsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbT1kYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UHJvcE51bShpdGVtLml0ZW1zSWQsaXRlbS5pdGVtc051bSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihpc1JlZnJlc2gpe1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVmcmVzaEdlbVNob3coKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8v57uf5LiA5a2Y5YKo5pys5ZywICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlQWxsUHJvcE51bShmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpPT57XHJcbiAgICAgICAgICAgIGNjLmVycm9yKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgYXN5bmMgSHR0cFNldFByb3BEYXRhKHByb3BEYXRhczpQcm9wT2JqZWN0W10pOlByb21pc2U8YW55PntcclxuICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUuc2V0UHJvcCx0aGlzLmdldFByb3BKc29uU3RyaW5nKHByb3BEYXRhcykpLnRoZW4oKGRhdGE6YW55KT0+e1xyXG4gICAgICAgICAgICBjYy5sb2coJ+S4iuaKpeaIkOWKnycpO1xyXG4gICAgICAgIH0pLmNhdGNoKChlcnJvcik9PntcclxuICAgICAgICAgICAgY2MubG9nKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFByb3BKc29uU3RyaW5nKHByb3BEYXRhczpQcm9wT2JqZWN0W10pOnN0cmluZ3tcclxuICAgICAgICBsZXQgdWlkPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgdWlkOnVpZCxcclxuICAgICAgICAgICAgZ2FtZVVzZXJJdGVtTmV3TGlzdDpwcm9wRGF0YXMsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXX0=