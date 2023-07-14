
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUHJvcFxcUHJvcE1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0RBQTRGO0FBQzVGLDJFQUFpRjtBQUNqRix3REFBZ0U7QUFDaEUsa0VBQWlFO0FBQ2pFLDhDQUF5QztBQUN6Qyx3REFBdUQ7QUFFdkQsb0VBQStEO0FBQy9ELGdFQUEyRDtBQUMzRCxvRUFBK0Q7QUFDL0QsOENBQWdFO0FBRWhFLDBEQUFzRDtBQUN0RCw0REFBOEQ7QUFDOUQsc0RBQW9HO0FBQ3BHLHdDQUFtQztBQUNuQyxvQ0FBMEM7QUFDMUMsK0JBQTBCO0FBQzFCLDJDQUE0RDtBQUc1RDtJQUFBO1FBR0ksTUFBTTtRQUNFLGlCQUFZLEdBQW9CLElBQUksQ0FBQztRQUM3QyxJQUFJO1FBQ0ksY0FBUyxHQUFXLElBQUksQ0FBQztRQUN6QixtQkFBYyxHQUFXLElBQUksQ0FBQztRQUM5QixlQUFVLEdBQWdCLElBQUksQ0FBQztJQTRlM0MsQ0FBQztJQXplaUIsdUJBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxXQUFXLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCxTQUFTO0lBQ0QsMEJBQUksR0FBWjtRQUNJLGtCQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsMkRBQTJEO0lBQ25ELG9DQUFjLEdBQXRCO1FB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LENBQUM7YUFDOUI7UUFDTCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxLQUFLO1lBQ1gsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFSyxxQ0FBZSxHQUFyQixVQUFzQixTQUFzQjt1Q0FBRSxPQUFPOztnQkFDakQseUJBQVcsQ0FBQyxJQUFJLENBQUMsd0JBQVUsQ0FBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBUTtvQkFDakYsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbkIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsS0FBSztvQkFDWCxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNsQixDQUFDLENBQUMsQ0FBQzs7OztLQUNOO0lBRU8sdUNBQWlCLEdBQXpCLFVBQTBCLFNBQXNCO1FBQzVDLElBQUksR0FBRyxHQUFDLGtCQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDM0MsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ2xCLEdBQUcsRUFBQyxHQUFHO1lBQ1AsbUJBQW1CLEVBQUMsU0FBUztTQUNoQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBbGZjLHFCQUFTLEdBQWdCLElBQUksQ0FBQztJQW1makQsa0JBQUM7Q0FwZkQsQUFvZkMsSUFBQTtBQXBmWSxrQ0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBNYW5hZ2VyLCBQYXJhbXNfVHlwZSwgQWNjZXNzTmFtZSwgUHJvcE9iamVjdCB9IGZyb20gXCIuLi8uL05ldFdvcmsvSHR0cE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRXF1aXBtZW50QXR0cmlidXRlTWFuYWdlciB9IGZyb20gXCIuLi9FcXVpcG1lbnQvRGF0YS9FcXVpcG1lbnRBdHRyaWJ1dGVcIjtcclxuaW1wb3J0IHsgRXF1aXBJbmZvLCBFcXVpcFR5cGUgfSBmcm9tIFwiLi4vRXF1aXBtZW50L0VxdWlwQ29uZmlnXCI7XHJcbmltcG9ydCB7IEVxdWlwbWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vRXF1aXBtZW50L0VxdWlwbWVudE1hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb19UeXBlIH0gZnJvbSBcIi4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd01hbmFnZXJcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUGV0SW5mbywgUGV0TWVzc2FnZSwgUGV0VHlwZSB9IGZyb20gXCIuLi9QZXQvUGV0Q29uZmlnXCI7XHJcbmltcG9ydCB7IFBldE1hbmFnZXIgfSBmcm9tIFwiLi4vUGV0L1BldE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBBc3NldHNFdmVudFR5cGUsIEV2ZW50TWFuYWdlciwgUmVkRXZlbnRTdHJpbmcsIFJlZEV2ZW50VHlwZSB9IGZyb20gXCIuLi9Ub29scy9FdmVudE1hbmFnZXJcIjtcclxuaW1wb3J0IFVzZXJEYXRhIGZyb20gXCIuLi9Vc2VyRGF0YVwiO1xyXG5pbXBvcnQgeyBJdGVtTWFuYWdlciB9IGZyb20gXCIuL0RhdGEvSXRlbVwiO1xyXG5pbXBvcnQgUHJvcCBmcm9tIFwiLi9Qcm9wXCI7XHJcbmltcG9ydCB7IFByb3BBY3Rpb24sIFByb3BEYXRhLCBQcm9wSWQgfSBmcm9tIFwiLi9Qcm9wQ29uZmlnXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFByb3BNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogUHJvcE1hbmFnZXIgPSBudWxsO1xyXG5cclxuICAgIC8v6YGT5YW35pWw5o2uXHJcbiAgICBwcml2YXRlIG1hcF9wcm9wX251bTpNYXA8bnVtYmVyLG51bWJlcj49bnVsbDtcclxuICAgIC8v6LWE5rqQXHJcbiAgICBwcml2YXRlIHByb3BfaXRlbTpjYy5QcmVmYWI9bnVsbDtcclxuICAgIHByaXZhdGUgcHJvcF9zYWxlX2l0ZW06Y2MuUHJlZmFiPW51bGw7XHJcbiAgICBwcml2YXRlIGl0ZW1fYXRsYXM6Y2MuU3ByaXRlQXRsYXM9bnVsbDtcclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOlByb3BNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgUHJvcE1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCAoKSB7XHJcbiAgICAgICAgSXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICB0aGlzLmxvYWRJdGVtUHJlZmFiKCk7XHJcbiAgICAgICAgdGhpcy5sb2FkU2FsZUl0ZW1QcmVmYWIoKTtcclxuICAgICAgICB0aGlzLmxvYWRTcCgpOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLei1hOa6kOeahOivu+WPli0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBwcml2YXRlIGxvYWRJdGVtUHJlZmFiKCl7XHJcbiAgICAgICAgaWYodGhpcy5wcm9wX2l0ZW0pXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCdwcm9wL2l0ZW0nLGNjLlByZWZhYiwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICBpZihlcnJvcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucHJvcF9pdGVtPWFzc2V0cztcclxuICAgICAgICB9KTtcclxuICAgIH0gICAgXHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkU2FsZUl0ZW1QcmVmYWIoKXtcclxuICAgICAgICBpZih0aGlzLnByb3Bfc2FsZV9pdGVtKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgncHJvcC9zYWxlSXRlbScsY2MuUHJlZmFiLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgIGlmKGVycm9yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5wcm9wX3NhbGVfaXRlbT1hc3NldHM7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IFxyXG5cclxuICAgIHByaXZhdGUgbG9hZFNwKCl7XHJcbiAgICAgICAgaWYodGhpcy5pdGVtX2F0bGFzKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgncHJvcC9pdGVtX2xpc3QnLGNjLlNwcml0ZUF0bGFzLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5TcHJpdGVBdGxhcyk9PntcclxuICAgICAgICAgICAgaWYoZXJyb3IpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLml0ZW1fYXRsYXM9YXNzZXRzOyAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLyoq6LWE5rqQICovXHJcbiAgICBwdWJsaWMgZ2V0U3BCeU5hbWUobmFtZTpzdHJpbmcpOmNjLlNwcml0ZUZyYW1le1xyXG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1fYXRsYXMuZ2V0U3ByaXRlRnJhbWUobmFtZSk7XHJcbiAgICB9XHJcbiAgICAvKirpgJrov4fpgZPlhbdpZOiOt+W+l+S4gOS4queyvueBteW4p++8iOS4jeWQq+ijheWkh+WuoOeJqe+8iSAqL1xyXG4gICAgcHVibGljIGdldFNwQnlQcm9wSWQocHJvcElkOlByb3BJZCk6Y2MuU3ByaXRlRnJhbWV7XHJcbiAgICAgICAgbGV0IGljb25JZD1JdGVtTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1b3RlSWNvbihwcm9wSWQpO1xyXG4gICAgICAgIGxldCBpY29uU3BOYW1lPVwiSXRlbV9cIitpY29uSWQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3BCeU5hbWUoaWNvblNwTmFtZSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXRFcXVpcEljb24ocG9zVHlwZTpudW1iZXIpOmNjLlNwcml0ZUZyYW1le1xyXG4gICAgICAgIGxldCBpY29uU3BOYW1lPVwiV2VhcG9uX1wiK3Bvc1R5cGU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3BCeU5hbWUoaWNvblNwTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6YCa6L+H6YGT5YW3aWTojrflvpfnsbvlnoso5Yqb6YeP5pWP5o235pm65YqbKeeahOeyvueBteW4pyovXHJcbiAgICBwdWJsaWMgZ2V0U3BUeXBlQnlUeXBlKHR5cGU6UGV0VHlwZSk6Y2MuU3ByaXRlRnJhbWV7XHJcbiAgICAgICAgbGV0IGljb25TcE5hbWU9XCJIZXJvX1R5cGVfXCIrdHlwZTtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRTcEJ5TmFtZShpY29uU3BOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0U3BGcmFtZUJ5UHJvcFR5cGUocHJvcFR5cGU6UHJvcElkKTpjYy5TcHJpdGVGcmFtZXtcclxuICAgICAgICBsZXQgaWNvblNwTmFtZT1cIkl0ZW1fZnJhbWVfXCIrSXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KHByb3BUeXBlKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRTcEJ5TmFtZShpY29uU3BOYW1lKTtcclxuICAgIH1cclxuICAgIC8qKumAmui/h+iLsembhGlk6I635b6X5LiA5Liq5aS05YOPICovXHJcbiAgICBwdWJsaWMgZ2V0U3BoZWFkUG9ydHJhaXRUeXBlKHByb3BUeXBlOm51bWJlcik6Y2MuU3ByaXRlRnJhbWV7XHJcbiAgICAgICAgbGV0IGljb25TcE5hbWU9XCJJdGVtX1wiKygxMTAwMDArcHJvcFR5cGUpOy8vSXRlbV8xMTAwMDFcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRTcEJ5TmFtZShpY29uU3BOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlUHJvcEl0ZW0ocHJvcFR5cGU6UHJvcElkLG51bTpudW1iZXIscEFjOlByb3BBY3Rpb249UHJvcEFjdGlvbi5Mb29rLHByb3BQcmljZTpudW1iZXI9MCk6Y2MuTm9kZXtcclxuICAgICAgICBsZXQgdHlwZT1JdGVtTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFR5cGUocHJvcFR5cGUpO1xyXG4gICAgICAgIGxldCBwcm9wOmNjLk5vZGU9bnVsbDtcclxuICAgICAgIFxyXG4gICAgICAgIHN3aXRjaCh0eXBlKXtcclxuICAgICAgICAgICAgY2FzZSAzOntcclxuICAgICAgICAgICAgICAgIGxldCBpbmZvID0gbmV3IEVxdWlwSW5mbygpO1xyXG4gICAgICAgICAgICAgICAgaW5mby5lcXVpcF9pZCA9IHByb3BUeXBlO1xyXG4gICAgICAgICAgICAgICAgaW5mby5lcXVpcF9udW0gPSBudW07XHJcbiAgICAgICAgICAgICAgICBwcm9wPUVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRFcXVpcE5vZGVCeUluZm8oaW5mbyxwQWMpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIC8vIGNhc2UgNzp7XHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgcGV0SW5mbz1uZXcgUGV0SW5mbygpO1xyXG4gICAgICAgICAgICAgICAgLy8gcGV0SW5mby5wZXRfaWQ9cHJvcFR5cGUtNzAwMDA7XHJcbiAgICAgICAgICAgICAgICAvLyBwZXRJbmZvLnBldF9sZXZlbD0xO1xyXG4gICAgICAgICAgICAgICAgLy8gcHJvcD1QZXRNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUGV0SXRlbShwZXRJbmZvKTtcclxuICAgICAgICAgICAgLy8gfWJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OntcclxuICAgICAgICAgICAgICAgIHByb3A9Y2MuaW5zdGFudGlhdGUodGhpcy5wcm9wX2l0ZW0pO1xyXG4gICAgICAgICAgICAgICAgcHJvcC5nZXRDb21wb25lbnQoUHJvcCkuaW5pdChwcm9wVHlwZSxudW0scEFjKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvcDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlU2FsZVByb3BJdGVtKHByb3BUeXBlOlByb3BJZCxudW06bnVtYmVyLHBBYzpQcm9wQWN0aW9uPVByb3BBY3Rpb24uTG9vayk6Y2MuTm9kZXtcclxuICAgICAgICBsZXQgdHlwZT1JdGVtTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFR5cGUocHJvcFR5cGUpO1xyXG4gICAgICAgIGxldCBwcm9wOmNjLk5vZGU9bnVsbDtcclxuICAgICAgICBpZih0eXBlPT0zKXtcclxuICAgICAgICAgICAgcHJvcD1FcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U2FsZUVxdWlwTm9kZUJ5SWQocHJvcFR5cGUscEFjKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcHJvcD1jYy5pbnN0YW50aWF0ZSh0aGlzLnByb3Bfc2FsZV9pdGVtKTtcclxuICAgICAgICAgICAgcHJvcC5nZXRDb21wb25lbnQoUHJvcCkuaW5pdChwcm9wVHlwZSxudW0scEFjKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByb3A7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bpgZPlhbfnmoTlk4HotKjlkI3np7BcclxuICAgICAqIEBwYXJhbSBxdWFsaXR5IOmBk+WFt+eahOWTgei0qFxyXG4gICAgICovXHJcbiAgICBnZXRQcm9wUXVhbGl0eU5hbWUocXVhbGl0eTpudW1iZXIpOnN0cmluZ3tcclxuICAgICAgICBsZXQgdGV4dElkPTExMDAwNTtcclxuICAgICAgICBzd2l0Y2gocXVhbGl0eSl7XHJcbiAgICAgICAgICAgIGNhc2UgMTp7XHJcbiAgICAgICAgICAgICAgICB0ZXh0SWQ9MTEwMDA1O1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjp7XHJcbiAgICAgICAgICAgICAgICB0ZXh0SWQ9MTEwMDA3O1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzp7XHJcbiAgICAgICAgICAgICAgICB0ZXh0SWQ9MTEwMDA5O1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDp7XHJcbiAgICAgICAgICAgICAgICB0ZXh0SWQ9MTEwMDExO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTp7XHJcbiAgICAgICAgICAgICAgICB0ZXh0SWQ9MTEwMDEzO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNjp7XHJcbiAgICAgICAgICAgICAgICB0ZXh0SWQ9MTEwMDEzO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCh0ZXh0SWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W6YGT5YW355qE5ZOB6LSo5ZCN56ew55qE5paH5pys6Imy5YC8XHJcbiAgICAgKiBAcGFyYW0gcXVhbGl0eSDpgZPlhbfnmoTlk4HotKhcclxuICAgICAqL1xyXG4gICAgIGdldFByb3BRdWFsaXR5VGV4dENvbG9yKHF1YWxpdHk6bnVtYmVyKTpjYy5Db2xvcntcclxuICAgICAgICBsZXQgY29sb3I9Y2MuY29sb3IoKTtcclxuICAgICAgICBzd2l0Y2gocXVhbGl0eSl7XHJcbiAgICAgICAgICAgIGNhc2UgMDp7XHJcbiAgICAgICAgICAgICAgICBjb2xvcj1jYy5jb2xvcigyNTQsIDI0NiwgMjMzKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6eyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNvbG9yPWNjLmNvbG9yKDE1NiwgMjI2LCAxNTApO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjp7XHJcbiAgICAgICAgICAgICAgICBjb2xvcj1jYy5jb2xvcig4NiwgMTQ5LCAyMjUpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzp7XHJcbiAgICAgICAgICAgICAgICBjb2xvcj1jYy5jb2xvcigyMDUsIDE1OCwgMjU1KTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6e1xyXG4gICAgICAgICAgICAgICAgY29sb3I9Y2MuY29sb3IoMjU1LCAyNDksIDE1OCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OntcclxuICAgICAgICAgICAgICAgIGNvbG9yPWNjLmNvbG9yKDI1MSwgOTUsIDk4KTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDY6e1xyXG4gICAgICAgICAgICAgICAgY29sb3I9Y2MuY29sb3IoMjU1LCAyNTUsIDI1NSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiOt+WPlumBk+WFt+eahOWTgei0qOWQjeensOeahOaWh+acrOaPj+i+ueiJsuWAvCovXHJcbiAgICAgZ2V0UHJvcFF1YWxpdHlUZXh0T3V0bGluZUNvbG9yKCk6Y2MuQ29sb3J7XHJcbiAgICAgICAgbGV0IGNvbG9yPWNjLmNvbG9yKDM3LCA0OSwgNzEpOyAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGNvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiOt+WPluiLsembhOinkuaghyAqL1xyXG4gICAgZ2V0SGVyb0ljb24oaGVyb1R5cGU6SGVyb19UeXBlKTpjYy5TcHJpdGVGcmFtZXtcclxuICAgICAgICBsZXQgaWNvblNwTmFtZT1cIkVxdWlwcGVkX0hlcm9fXCIraGVyb1R5cGU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3BCeU5hbWUoaWNvblNwTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635Y+W55m96Imy6Iux6ZuE6KeS5qCHICovXHJcbiAgICBnZXRIZXJvSWNvbmIoaGVyb1R5cGU6SGVyb19UeXBlKTpjYy5TcHJpdGVGcmFtZXtcclxuICAgICAgICBsZXQgaWNvblNwTmFtZT1cIkhlYWRfSGVyb19TX1wiK2hlcm9UeXBlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFNwQnlOYW1lKGljb25TcE5hbWUpO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgLyoqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mlbDmja4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gICAgcHVibGljIGxvYWRQcm9wRGF0YSgpe1xyXG4gICAgICAgIGlmKCF0aGlzLm1hcF9wcm9wX251bSl7XHJcbiAgICAgICAgICAgIHRoaXMubWFwX3Byb3BfbnVtPW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICAgICAgbGV0IGlkTGlzdD1JdGVtTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BJZExpc3QoKTtcclxuICAgICAgICAgICAgbGV0IGxlbj1pZExpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxsZW47IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWQ9aWRMaXN0W2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IG51bT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEludChTdG9yYWdlS2V5LlByb3BOdW0raWQsMCk7XHJcbiAgICAgICAgICAgICAgICBpZihpZD09UHJvcElkLkNvaW4mJm51bT09MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbnVtPTIwMDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFByb3BOdW0oaWQsbnVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+aLieWPluacjeWKoeWZqOeahFxyXG4gICAgICAgIGlmKFVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCkpe1xyXG4gICAgICAgICAgICB0aGlzLkh0dHBTeW5jUHJvcERhdGEoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gcHJvcElkIOmBk+WFt2lkXHJcbiAgICAgKiBAcGFyYW0gbnVtIOaUueWPmOeahOaVsOmHj1xyXG4gICAgICogQHJldHVybnMg5pu05pS55pWw5o2u5piv5ZCm5oiQ5YqfXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjaGFuZ2VQcm9wTnVtKHByb3BJZDpudW1iZXIsbnVtOm51bWJlcik6Ym9vbGVhbntcclxuICAgICAgICBsZXQgdHlwZT1JdGVtTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFR5cGUocHJvcElkKTtcclxuICAgICAgICAvLyBpZih0eXBlPT0zKXtcclxuICAgICAgICAvLyAgICAgaWYobnVtPjApe1xyXG4gICAgICAgIC8vICAgICAgICAgRXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVxdWlwbWVudChwcm9wSWQpO1xyXG4gICAgICAgIC8vICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuWvueW6lOmBk+WFt0lE55qE6I635b6X5qyh5pWwICsgcHJvcElkKVxyXG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBpZih0eXBlPT03KXtcclxuICAgICAgICAvLyAgICAgaWYobnVtPjApe1xyXG4gICAgICAgIC8vICAgICAgICAgLy8gUGV0TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFBldChwcm9wSWQtNzAwMDApO1xyXG4gICAgICAgIC8vICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuWvueW6lOmBk+WFt0lE55qE6I635b6X5qyh5pWwICsgcHJvcElkKVxyXG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyDmlrDlop7oi7Hpm4RcclxuICAgICAgICBpZih0eXBlID09IDExKXtcclxuICAgICAgICAgICAgaWYoSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvSW5mbyhwcm9wSWQgJSAxMTAwMDApID09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRIZXJvKHByb3BJZCAlIDExMDAwMClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShwcm9wSWQgLSAxMDAwMCwyMCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5ld051bT10aGlzLmdldFByb3BOdW0ocHJvcElkKStudW07XHJcbiAgICAgICAgaWYobmV3TnVtPj0wKXtcclxuICAgICAgICAgICAgaWYobnVtID4gMCl7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5a+55bqU6YGT5YW3SUTnmoTojrflvpfmrKHmlbAgKyBwcm9wSWQpO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBpZihudW0gPCAwKXtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lr7nlupTpgZPlhbdJROeahOS9v+eUqOasoeaVsCArIHByb3BJZCk7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIHRoaXMuc2V0UHJvcE51bShwcm9wSWQsbmV3TnVtKTtcclxuICAgICAgICAgICAgaWYoUHJvcElkLkNvaW49PXByb3BJZCAmJiBudW0gPCAwKXtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVmcmVzaENvaW5TaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoUHJvcElkLkdlbT09cHJvcElkICYmIG51bSA8IDApIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVmcmVzaEdlbVNob3coKTsgIFxyXG4gICAgICAgICAgICBpZihQcm9wSWQuT3JkaW5hcnlXaXNoaW5nQ29pbj09cHJvcElkICYmIG51bSA+IDApe1xyXG4gICAgICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfQ0hFQ0ssUmVkRXZlbnRUeXBlLkJ0bl9TaG9wKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQcm9wTnVtKHByb3BJZDpudW1iZXIpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXBfcHJvcF9udW0uZ2V0KHByb3BJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFByb3BOdW0ocHJvcElkOm51bWJlcixudW06bnVtYmVyLGlzU2F2ZTpib29sZWFuPWZhbHNlKXtcclxuICAgICAgICB0aGlzLm1hcF9wcm9wX251bS5zZXQocHJvcElkLG51bSk7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuUHJvcE51bStwcm9wSWQsbnVtKTtcclxuICAgICAgICAvKirotYTmupDmm7TmlLnpgJrnn6UgKi9cclxuICAgICAgICBzd2l0Y2gocHJvcElkKXtcclxuICAgICAgICAgICAgY2FzZSBQcm9wSWQuQ29pbjp7XHJcbiAgICAgICAgICAgICAgICBFdmVudE1hbmFnZXIucG9zdEFzc2V0c0V2ZW50KEFzc2V0c0V2ZW50VHlwZS5DT0lOKTtcclxuICAgICAgICAgICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVmcmVzaENvaW5TaG93KCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBQcm9wSWQuR2VtOntcclxuICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci5wb3N0QXNzZXRzRXZlbnQoQXNzZXRzRXZlbnRUeXBlLkdFTSk7XHJcbiAgICAgICAgICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hHZW1TaG93KCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBQcm9wSWQuSGVyb0V4cDp7XHJcbiAgICAgICAgICAgICAgICBFdmVudE1hbmFnZXIucG9zdEFzc2V0c0V2ZW50KEFzc2V0c0V2ZW50VHlwZS5IRVJPX0VYUCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBQcm9wSWQuSGVyb1N0b25lOntcclxuICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci5wb3N0QXNzZXRzRXZlbnQoQXNzZXRzRXZlbnRUeXBlLkhFUk9fU1RPTkUpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUHJvcElkLkFuaW1hbEZvb2Q6e1xyXG4gICAgICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLnBvc3RBc3NldHNFdmVudChBc3NldHNFdmVudFR5cGUuQW5pbWFsX0Zvb2QpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDAwMDQ6e1xyXG4gICAgICAgICAgICAgICAgLy8gRXZlbnRNYW5hZ2VyLnBvc3RBc3NldHNFdmVudChBc3NldHNFdmVudFR5cGUuQW5pbWFsX0Zvb2QpO1xyXG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IuZW1pdChcIm9uUmVmcmVzaEluc3RhbmNlSXRlbVwiKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQwMDA1OntcclxuICAgICAgICAgICAgICAgIC8vRXZlbnRNYW5hZ2VyLnBvc3RBc3NldHNFdmVudChBc3NldHNFdmVudFR5cGUuQW5pbWFsX0Zvb2QpO1xyXG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IuZW1pdChcIm9uUmVmcmVzaEluc3RhbmNlSXRlbVwiKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQwMDA2OntcclxuICAgICAgICAgICAgICAgIC8vRXZlbnRNYW5hZ2VyLnBvc3RBc3NldHNFdmVudChBc3NldHNFdmVudFR5cGUuQW5pbWFsX0Zvb2QpO1xyXG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IuZW1pdChcIm9uUmVmcmVzaEluc3RhbmNlSXRlbVwiKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpc1NhdmUpe1xyXG4gICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5Qcm9wTnVtK3Byb3BJZCxudW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZihQcm9wSWQuR2VtPT1wcm9wSWQpe1xyXG4gICAgICAgIC8vICAgICAvL+ebruWJjeWPquS4iuaKpemSu+efs1xyXG4gICAgICAgIC8vICAgICBsZXQgcHJvcERhdGFzPW5ldyBBcnJheTxQcm9wT2JqZWN0PigpO1xyXG4gICAgICAgIC8vICAgICBsZXQgcHJvcERhdGE9bmV3IFByb3BPYmplY3QoKTtcclxuICAgICAgICAvLyAgICAgcHJvcERhdGEuaXRlbXNJZD1wcm9wSWQ7XHJcbiAgICAgICAgLy8gICAgIHByb3BEYXRhLml0ZW1zTnVtPW51bTtcclxuICAgICAgICAvLyAgICAgcHJvcERhdGFzLnB1c2gocHJvcERhdGEpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLkh0dHBTZXRQcm9wRGF0YShwcm9wRGF0YXMpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirojrflj5boo4XlpIfnmoTliJfooajmlbDmja4gKi9cclxuICAgIGdldEVxdWlwbWVudExpc3QoZXF1aXBUeXBlOkVxdWlwVHlwZSk6RXF1aXBJbmZvW117XHJcbiAgICAgICAgbGV0IEVBTT1FcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgbGV0IElNPUl0ZW1NYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgbGV0IGxpc3Q9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgdGhpcy5tYXBfcHJvcF9udW0uZm9yRWFjaCgocHJvcE51bSxwcm9wSWQpPT57XHJcbiAgICAgICAgICAgIGlmKHByb3BOdW0+MCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgcHJvcFR5cGU9SU0uZ2V0VHlwZShwcm9wSWQpO1xyXG4gICAgICAgICAgICAgICAgLy/lpoLmnpzmmK/oo4XlpIdcclxuICAgICAgICAgICAgICAgIGlmKHByb3BUeXBlPT0zKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdHlwZT1FQU0uZ2V0RXF1aXBtZW50UG9zaXRpb24ocHJvcElkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihlcXVpcFR5cGU9PXR5cGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJvcD1uZXcgRXF1aXBJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcC5lcXVpcF9pZD1wcm9wSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3AuZXF1aXBfbnVtPXByb3BOdW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QucHVzaChwcm9wKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmKGxpc3QubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAvL+mHjeaWsOaOkuWIl+S4gOS4i++8jOWTgei0qOacgOWlveWcqOacgOWJjVxyXG4gICAgICAgICAgICBsaXN0LnNvcnQoKGE6RXF1aXBJbmZvLGI6RXF1aXBJbmZvKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IGxldmVsQT1FcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RhZ2UoYS5lcXVpcF9pZCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGV2ZWxCPUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdGFnZShiLmVxdWlwX2lkKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsZXZlbEItbGV2ZWxBO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICByZXR1cm4gbGlzdDtcclxuICAgIH1cclxuICAgIC8qKuiOt+WPluWuoOeJqeeahOWIl+ihqOaVsOaNriAqL1xyXG4gICAgZ2V0UGV0TGlzdCgpOlBldE1lc3NhZ2VbXXtcclxuICAgICAgICBsZXQgSU09SXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBsZXQgbGlzdD1uZXcgQXJyYXkoKTtcclxuICAgICAgICB0aGlzLm1hcF9wcm9wX251bS5mb3JFYWNoKChwcm9wTnVtLHByb3BJZCk9PntcclxuICAgICAgICAgICAgaWYocHJvcE51bT4wKXtcclxuICAgICAgICAgICAgICAgIGxldCBwcm9wVHlwZT1JTS5nZXRUeXBlKHByb3BJZCk7XHJcbiAgICAgICAgICAgICAgICAvL+WmguaenOaYr+ijheWkh1xyXG4gICAgICAgICAgICAgICAgaWYocHJvcFR5cGU9PTcpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9wPW5ldyBQZXRNZXNzYWdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcC5wZXRfaWQ9cHJvcElkO1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3AucGV0X251bT1wcm9wTnVtO1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3QucHVzaChwcm9wKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYobGlzdC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIC8vIHRvZG8g5a6g54mp5o6S5bqP77yM6Zi25q616auY55qE5Zyo5YmN6Z2iXHJcbiAgICAgICAgICAgIC8vIGxpc3Quc29ydCgoYTpFcXVpcEluZm8sYjpFcXVpcEluZm8pPT57XHJcbiAgICAgICAgICAgIC8vICAgICBsZXQgbGV2ZWxBPUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdGFnZShhLmVxdWlwX2lkKTtcclxuICAgICAgICAgICAgLy8gICAgIGxldCBsZXZlbEI9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0YWdlKGIuZXF1aXBfaWQpO1xyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIGxldmVsQi1sZXZlbEE7XHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgfVxyXG4gICAgLyoq5L+d5a2Y6L+Z5Lu95YiX6KGo77yM5L+u5pS56KOF5aSH5pWw6YeP5ZCO6LCD55SoICovXHJcbiAgICBzYXZlRXF1aXBtZW50TGlzdChsaXN0OkVxdWlwSW5mb1tdKXtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxsaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHByb3A9bGlzdFtpXTtcclxuICAgICAgICAgICAgdGhpcy5tYXBfcHJvcF9udW0uc2V0KHByb3AuZXF1aXBfaWQscHJvcC5lcXVpcF9udW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirmiorlj5jph4/lrZjlgqjnmoTlgLzlrZjmlL7lnKjmnKzlnLDmlofku7YgKi9cclxuICAgIHB1YmxpYyBzYXZlQWxsUHJvcE51bShpc1Bvc3Q6Ym9vbGVhbj10cnVlKXtcclxuICAgICAgICBsZXQgbGlzdDpQcm9wT2JqZWN0W109W107XHJcbiAgICAgICAgdGhpcy5tYXBfcHJvcF9udW0uZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5Qcm9wTnVtK2ssdik7XHJcbiAgICAgICAgICAgIGxldCBwcm9wPW5ldyBQcm9wT2JqZWN0KCk7XHJcbiAgICAgICAgICAgIHByb3AuaXRlbXNJZD1rO1xyXG4gICAgICAgICAgICBwcm9wLml0ZW1zTnVtPXY7XHJcbiAgICAgICAgICAgIGxpc3QucHVzaChwcm9wKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy/mj5DkuqTliLDmnI3liqHlmahcclxuICAgICAgICBpZihpc1Bvc3Qpe1xyXG4gICAgICAgICAgICB0aGlzLkh0dHBTZXRQcm9wRGF0YShsaXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635Y+W5Yiw5qC55o2u5ZOB6LSo5o6S5bqP5ZCO55qE54mp5ZOB5YiX6KGoICovXHJcbiAgICBwdWJsaWMgZ2V0U29ydFByb3BMaXN0KCl7XHJcbiAgICAgICAgbGV0IHByb3BMaXN0OlByb3BEYXRhW10gPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICB0aGlzLm1hcF9wcm9wX251bS5mb3JFYWNoKChudW0saWQpID0+e1xyXG4gICAgICAgICAgICBsZXQgcHJvcCA9IHtcclxuICAgICAgICAgICAgICAgIHByb3BfaWQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgcHJvcF9udW06IG51bSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihudW0+MCl7XHJcbiAgICAgICAgICAgICAgICBwcm9wTGlzdC5wdXNoKHByb3ApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBwcm9wTGlzdC5zb3J0KChhOlByb3BEYXRhLGI6UHJvcERhdGEpPT57XHJcbiAgICAgICAgICAgIGxldCBxdWFsaXR5QSA9IEl0ZW1NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eShhLnByb3BfaWQpO1xyXG4gICAgICAgICAgICBsZXQgcXVhbGl0eUIgPSBJdGVtTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YWxpdHkoYi5wcm9wX2lkKTtcclxuICAgICAgICAgICAgcmV0dXJuIHF1YWxpdHlBIC0gcXVhbGl0eUI7XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gcHJvcExpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5o+Q5Lqk5L+u5pS555Sz6K+3ICovXHJcbiAgICBjaGFuZ2VQcm9wU2VydmVyVGVzdCgpe1xyXG4gICAgICAgIGxldCBjaGFuZ2U9SlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICB1aWQ6J2ZiMTIzNDU2JyxcclxuICAgICAgICAgICAgbmFtZTpcInByb3BzX2NoYW5nZVwiLFxyXG4gICAgICAgICAgICB2YWx1ZTpbe2lkOjEwMDAxLG51bToyMH0se2lkOjEwMDAyLG51bTotMzB9XVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgaXNzdWU9SlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICB1aWQ6J2ZiMTIzNDU2JyxcclxuICAgICAgICAgICAgbmFtZTpcInByb3BzX2lzc3VlXCIsXHJcbiAgICAgICAgICAgIHZhbHVlOlt7aWQ6MTAwMDEsbnVtOjEyMH0se2lkOjEwMDAyLG51bToxMzB9XVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirmnI3liqHnq6/lr7nmjqXnmoTku6PnoIEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuICAgIC8qKuWQjOatpeacjeWKoeWZqOeahOmBk+WFt+aVsOaNruiHs+acrOWcsCAqL1xyXG4gICAgSHR0cFN5bmNQcm9wRGF0YShpc1JlZnJlc2g6Ym9vbGVhbj10cnVlKXtcclxuICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUuZ2V0UHJvcCx0aGlzLmdldFByb3BKc29uU3RyaW5nKG51bGwpKS50aGVuKChkYXRhOmFueSk9PntcclxuICAgICAgICAgICAgaWYoZGF0YSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGVuPWRhdGEubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8bGVuOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtPWRhdGFbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQcm9wTnVtKGl0ZW0uaXRlbXNJZCxpdGVtLml0ZW1zTnVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGlzUmVmcmVzaCl7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoR2VtU2hvdygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy/nu5/kuIDlrZjlgqjmnKzlnLAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmVBbGxQcm9wTnVtKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmNhdGNoKChlcnJvcik9PntcclxuICAgICAgICAgICAgY2MuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBhc3luYyBIdHRwU2V0UHJvcERhdGEocHJvcERhdGFzOlByb3BPYmplY3RbXSk6UHJvbWlzZTxhbnk+e1xyXG4gICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5zZXRQcm9wLHRoaXMuZ2V0UHJvcEpzb25TdHJpbmcocHJvcERhdGFzKSkudGhlbigoZGF0YTphbnkpPT57XHJcbiAgICAgICAgICAgIGNjLmxvZygn5LiK5oql5oiQ5YqfJyk7XHJcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKT0+e1xyXG4gICAgICAgICAgICBjYy5sb2coZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0UHJvcEpzb25TdHJpbmcocHJvcERhdGFzOlByb3BPYmplY3RbXSk6c3RyaW5ne1xyXG4gICAgICAgIGxldCB1aWQ9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VySUQoKTtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICB1aWQ6dWlkLFxyXG4gICAgICAgICAgICBnYW1lVXNlckl0ZW1OZXdMaXN0OnByb3BEYXRhcyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSJdfQ==