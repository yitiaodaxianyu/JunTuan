"use strict";
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
        cc.resources.load('prop/item', cc.Prefab, function (error, assets) {
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
        cc.resources.load('prop/saleItem', cc.Prefab, function (error, assets) {
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
        cc.resources.load('prop/item_list', cc.SpriteAtlas, function (error, assets) {
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