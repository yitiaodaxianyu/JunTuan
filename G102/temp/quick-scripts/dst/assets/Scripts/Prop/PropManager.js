
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUHJvcFxcUHJvcE1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0RBQTRGO0FBQzVGLDJFQUFpRjtBQUNqRix3REFBZ0U7QUFDaEUsa0VBQWlFO0FBQ2pFLDhDQUF5QztBQUN6Qyx3REFBdUQ7QUFFdkQsb0VBQStEO0FBQy9ELGdFQUEyRDtBQUMzRCxvRUFBK0Q7QUFDL0QsOENBQWdFO0FBRWhFLDBEQUFzRDtBQUN0RCw0REFBOEQ7QUFDOUQsc0RBQW9HO0FBQ3BHLHdDQUFtQztBQUNuQyxvQ0FBMEM7QUFDMUMsK0JBQTBCO0FBQzFCLDJDQUE0RDtBQUc1RDtJQUFBO1FBR0ksTUFBTTtRQUNFLGlCQUFZLEdBQW9CLElBQUksQ0FBQztRQUM3QyxJQUFJO1FBQ0ksY0FBUyxHQUFXLElBQUksQ0FBQztRQUN6QixtQkFBYyxHQUFXLElBQUksQ0FBQztRQUM5QixlQUFVLEdBQWdCLElBQUksQ0FBQztJQXFmM0MsQ0FBQztJQWxmaUIsdUJBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxXQUFXLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCxTQUFTO0lBQ0QsMEJBQUksR0FBWjtRQUNJLGtCQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsMkRBQTJEO0lBQ25ELG9DQUFjLEdBQXRCO1FB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QUFDO0lBNGZqRCxrQkFBQztDQTdmRCxBQTZmQyxJQUFBO0FBN2ZZLGtDQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cE1hbmFnZXIsIFBhcmFtc19UeXBlLCBBY2Nlc3NOYW1lLCBQcm9wT2JqZWN0IH0gZnJvbSBcIi4uLy4vTmV0V29yay9IdHRwTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBFcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyIH0gZnJvbSBcIi4uL0VxdWlwbWVudC9EYXRhL0VxdWlwbWVudEF0dHJpYnV0ZVwiO1xyXG5pbXBvcnQgeyBFcXVpcEluZm8sIEVxdWlwVHlwZSB9IGZyb20gXCIuLi9FcXVpcG1lbnQvRXF1aXBDb25maWdcIjtcclxuaW1wb3J0IHsgRXF1aXBtZW50TWFuYWdlciB9IGZyb20gXCIuLi9FcXVpcG1lbnQvRXF1aXBtZW50TWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4uL0hlcm8vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvX1R5cGUgfSBmcm9tIFwiLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQZXRJbmZvLCBQZXRNZXNzYWdlLCBQZXRUeXBlIH0gZnJvbSBcIi4uL1BldC9QZXRDb25maWdcIjtcclxuaW1wb3J0IHsgUGV0TWFuYWdlciB9IGZyb20gXCIuLi9QZXQvUGV0TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTdG9yYWdlS2V5IH0gZnJvbSBcIi4uL1N0b3JhZ2UvU3RvcmFnZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBUaGVTdG9yYWdlTWFuYWdlciB9IGZyb20gXCIuLi9TdG9yYWdlL1N0b3JhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEFzc2V0c0V2ZW50VHlwZSwgRXZlbnRNYW5hZ2VyLCBSZWRFdmVudFN0cmluZywgUmVkRXZlbnRUeXBlIH0gZnJvbSBcIi4uL1Rvb2xzL0V2ZW50TWFuYWdlclwiO1xyXG5pbXBvcnQgVXNlckRhdGEgZnJvbSBcIi4uL1VzZXJEYXRhXCI7XHJcbmltcG9ydCB7IEl0ZW1NYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9JdGVtXCI7XHJcbmltcG9ydCBQcm9wIGZyb20gXCIuL1Byb3BcIjtcclxuaW1wb3J0IHsgUHJvcEFjdGlvbiwgUHJvcERhdGEsIFByb3BJZCB9IGZyb20gXCIuL1Byb3BDb25maWdcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgUHJvcE1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBQcm9wTWFuYWdlciA9IG51bGw7XHJcblxyXG4gICAgLy/pgZPlhbfmlbDmja5cclxuICAgIHByaXZhdGUgbWFwX3Byb3BfbnVtOk1hcDxudW1iZXIsbnVtYmVyPj1udWxsO1xyXG4gICAgLy/otYTmupBcclxuICAgIHByaXZhdGUgcHJvcF9pdGVtOmNjLlByZWZhYj1udWxsO1xyXG4gICAgcHJpdmF0ZSBwcm9wX3NhbGVfaXRlbTpjYy5QcmVmYWI9bnVsbDtcclxuICAgIHByaXZhdGUgaXRlbV9hdGxhczpjYy5TcHJpdGVBdGxhcz1udWxsO1xyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6UHJvcE1hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBQcm9wTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0ICgpIHtcclxuICAgICAgICBJdGVtTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIHRoaXMubG9hZEl0ZW1QcmVmYWIoKTtcclxuICAgICAgICB0aGlzLmxvYWRTYWxlSXRlbVByZWZhYigpO1xyXG4gICAgICAgIHRoaXMubG9hZFNwKCk7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t6LWE5rqQ55qE6K+75Y+WLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHByaXZhdGUgbG9hZEl0ZW1QcmVmYWIoKXtcclxuICAgICAgICBpZih0aGlzLnByb3BfaXRlbSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ3Byb3AvaXRlbScsY2MuUHJlZmFiLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgIGlmKGVycm9yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5wcm9wX2l0ZW09YXNzZXRzO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSAgICBcclxuXHJcbiAgICBwcml2YXRlIGxvYWRTYWxlSXRlbVByZWZhYigpe1xyXG4gICAgICAgIGlmKHRoaXMucHJvcF9zYWxlX2l0ZW0pXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCdwcm9wL3NhbGVJdGVtJyxjYy5QcmVmYWIsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgaWYoZXJyb3IpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnByb3Bfc2FsZV9pdGVtPWFzc2V0cztcclxuICAgICAgICB9KTtcclxuICAgIH0gXHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkU3AoKXtcclxuICAgICAgICBpZih0aGlzLml0ZW1fYXRsYXMpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkKCdwcm9wL2l0ZW1fbGlzdCcsY2MuU3ByaXRlQXRsYXMsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlNwcml0ZUF0bGFzKT0+e1xyXG4gICAgICAgICAgICBpZihlcnJvcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbV9hdGxhcz1hc3NldHM7ICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvKirotYTmupAgKi9cclxuICAgIHB1YmxpYyBnZXRTcEJ5TmFtZShuYW1lOnN0cmluZyk6Y2MuU3ByaXRlRnJhbWV7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbV9hdGxhcy5nZXRTcHJpdGVGcmFtZShuYW1lKTtcclxuICAgIH1cclxuICAgIC8qKumAmui/h+mBk+WFt2lk6I635b6X5LiA5Liq57K+54G15bin77yI5LiN5ZCr6KOF5aSH5a6g54mp77yJICovXHJcbiAgICBwdWJsaWMgZ2V0U3BCeVByb3BJZChwcm9wSWQ6UHJvcElkKTpjYy5TcHJpdGVGcmFtZXtcclxuICAgICAgICBsZXQgaWNvbklkPUl0ZW1NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVvdGVJY29uKHByb3BJZCk7XHJcbiAgICAgICAgbGV0IGljb25TcE5hbWU9XCJJdGVtX1wiK2ljb25JZDtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRTcEJ5TmFtZShpY29uU3BOYW1lKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGdldEVxdWlwSWNvbihwb3NUeXBlOm51bWJlcik6Y2MuU3ByaXRlRnJhbWV7XHJcbiAgICAgICAgbGV0IGljb25TcE5hbWU9XCJXZWFwb25fXCIrcG9zVHlwZTtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRTcEJ5TmFtZShpY29uU3BOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirpgJrov4fpgZPlhbdpZOiOt+W+l+exu+Weiyjlipvph4/mlY/mjbfmmbrlipsp55qE57K+54G15binKi9cclxuICAgIHB1YmxpYyBnZXRTcFR5cGVCeVR5cGUodHlwZTpQZXRUeXBlKTpjYy5TcHJpdGVGcmFtZXtcclxuICAgICAgICBsZXQgaWNvblNwTmFtZT1cIkhlcm9fVHlwZV9cIit0eXBlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFNwQnlOYW1lKGljb25TcE5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTcEZyYW1lQnlQcm9wVHlwZShwcm9wVHlwZTpQcm9wSWQpOmNjLlNwcml0ZUZyYW1le1xyXG4gICAgICAgIGxldCBpY29uU3BOYW1lPVwiSXRlbV9mcmFtZV9cIitJdGVtTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YWxpdHkocHJvcFR5cGUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFNwQnlOYW1lKGljb25TcE5hbWUpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFNwRnJhbWVCeUV4VHlwZShwcm9wVHlwZTpudW1iZXIpOmNjLlNwcml0ZUZyYW1le1xyXG4gICAgICAgIGxldCBpY29uU3BOYW1lPVwiSXRlbV9mcmFtZUVYX1wiK3Byb3BUeXBlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFNwQnlOYW1lKGljb25TcE5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTcEZyYW1lQnlDaGFyaW9UeXBlKHByb3BUeXBlOm51bWJlcik6Y2MuU3ByaXRlRnJhbWV7XHJcbiAgICAgICAgbGV0IGljb25TcE5hbWU9XCJySWNvblwiK3Byb3BUeXBlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFNwQnlOYW1lKGljb25TcE5hbWUpO1xyXG4gICAgfVxyXG4gICAgLyoq6YCa6L+H6Iux6ZuEaWTojrflvpfkuIDkuKrlpLTlg48gKi9cclxuICAgIHB1YmxpYyBnZXRTcGhlYWRQb3J0cmFpdFR5cGUocHJvcFR5cGU6bnVtYmVyKTpjYy5TcHJpdGVGcmFtZXtcclxuICAgICAgICBsZXQgaWNvblNwTmFtZT1cIkl0ZW1fXCIrKDExMDAwMCtwcm9wVHlwZSk7Ly9JdGVtXzExMDAwMVxyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFNwQnlOYW1lKGljb25TcE5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjcmVhdGVQcm9wSXRlbShwcm9wVHlwZTpQcm9wSWQsbnVtOm51bWJlcixwQWM6UHJvcEFjdGlvbj1Qcm9wQWN0aW9uLkxvb2sscHJvcFByaWNlOm51bWJlcj0wKTpjYy5Ob2Rle1xyXG4gICAgICAgIGxldCB0eXBlPUl0ZW1NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VHlwZShwcm9wVHlwZSk7XHJcbiAgICAgICAgbGV0IHByb3A6Y2MuTm9kZT1udWxsO1xyXG4gICAgICAgXHJcbiAgICAgICAgc3dpdGNoKHR5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIDM6e1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZm8gPSBuZXcgRXF1aXBJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICBpbmZvLmVxdWlwX2lkID0gcHJvcFR5cGU7XHJcbiAgICAgICAgICAgICAgICBpbmZvLmVxdWlwX251bSA9IG51bTtcclxuICAgICAgICAgICAgICAgIHByb3A9RXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEVxdWlwTm9kZUJ5SW5mbyhpbmZvLHBBYyk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgLy8gY2FzZSA3OntcclxuICAgICAgICAgICAgICAgIC8vIGxldCBwZXRJbmZvPW5ldyBQZXRJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBwZXRJbmZvLnBldF9pZD1wcm9wVHlwZS03MDAwMDtcclxuICAgICAgICAgICAgICAgIC8vIHBldEluZm8ucGV0X2xldmVsPTE7XHJcbiAgICAgICAgICAgICAgICAvLyBwcm9wPVBldE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQZXRJdGVtKHBldEluZm8pO1xyXG4gICAgICAgICAgICAvLyB9YnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6e1xyXG4gICAgICAgICAgICAgICAgcHJvcD1jYy5pbnN0YW50aWF0ZSh0aGlzLnByb3BfaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBwcm9wLmdldENvbXBvbmVudChQcm9wKS5pbml0KHByb3BUeXBlLG51bSxwQWMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9wO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjcmVhdGVTYWxlUHJvcEl0ZW0ocHJvcFR5cGU6UHJvcElkLG51bTpudW1iZXIscEFjOlByb3BBY3Rpb249UHJvcEFjdGlvbi5Mb29rKTpjYy5Ob2Rle1xyXG4gICAgICAgIGxldCB0eXBlPUl0ZW1NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VHlwZShwcm9wVHlwZSk7XHJcbiAgICAgICAgbGV0IHByb3A6Y2MuTm9kZT1udWxsO1xyXG4gICAgICAgIGlmKHR5cGU9PTMpe1xyXG4gICAgICAgICAgICBwcm9wPUVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTYWxlRXF1aXBOb2RlQnlJZChwcm9wVHlwZSxwQWMpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBwcm9wPWNjLmluc3RhbnRpYXRlKHRoaXMucHJvcF9zYWxlX2l0ZW0pO1xyXG4gICAgICAgICAgICBwcm9wLmdldENvbXBvbmVudChQcm9wKS5pbml0KHByb3BUeXBlLG51bSxwQWMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvcDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlumBk+WFt+eahOWTgei0qOWQjeensFxyXG4gICAgICogQHBhcmFtIHF1YWxpdHkg6YGT5YW355qE5ZOB6LSoXHJcbiAgICAgKi9cclxuICAgIGdldFByb3BRdWFsaXR5TmFtZShxdWFsaXR5Om51bWJlcik6c3RyaW5ne1xyXG4gICAgICAgIGxldCB0ZXh0SWQ9MTEwMDA1O1xyXG4gICAgICAgIHN3aXRjaChxdWFsaXR5KXtcclxuICAgICAgICAgICAgY2FzZSAxOntcclxuICAgICAgICAgICAgICAgIHRleHRJZD0xMTAwMDU7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOntcclxuICAgICAgICAgICAgICAgIHRleHRJZD0xMTAwMDc7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOntcclxuICAgICAgICAgICAgICAgIHRleHRJZD0xMTAwMDk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OntcclxuICAgICAgICAgICAgICAgIHRleHRJZD0xMTAwMTE7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OntcclxuICAgICAgICAgICAgICAgIHRleHRJZD0xMTAwMTM7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OntcclxuICAgICAgICAgICAgICAgIHRleHRJZD0xMTAwMTM7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKHRleHRJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bpgZPlhbfnmoTlk4HotKjlkI3np7DnmoTmlofmnKzoibLlgLxcclxuICAgICAqIEBwYXJhbSBxdWFsaXR5IOmBk+WFt+eahOWTgei0qFxyXG4gICAgICovXHJcbiAgICAgZ2V0UHJvcFF1YWxpdHlUZXh0Q29sb3IocXVhbGl0eTpudW1iZXIpOmNjLkNvbG9ye1xyXG4gICAgICAgIGxldCBjb2xvcj1jYy5jb2xvcigpO1xyXG4gICAgICAgIHN3aXRjaChxdWFsaXR5KXtcclxuICAgICAgICAgICAgY2FzZSAwOntcclxuICAgICAgICAgICAgICAgIGNvbG9yPWNjLmNvbG9yKDI1NCwgMjQ2LCAyMzMpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTp7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY29sb3I9Y2MuY29sb3IoMTU2LCAyMjYsIDE1MCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOntcclxuICAgICAgICAgICAgICAgIGNvbG9yPWNjLmNvbG9yKDg2LCAxNDksIDIyNSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOntcclxuICAgICAgICAgICAgICAgIGNvbG9yPWNjLmNvbG9yKDIwNSwgMTU4LCAyNTUpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDp7XHJcbiAgICAgICAgICAgICAgICBjb2xvcj1jYy5jb2xvcigyNTUsIDI0OSwgMTU4KTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6e1xyXG4gICAgICAgICAgICAgICAgY29sb3I9Y2MuY29sb3IoMjUxLCA5NSwgOTgpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNjp7XHJcbiAgICAgICAgICAgICAgICBjb2xvcj1jYy5jb2xvcigyNTUsIDI1NSwgMjU1KTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635Y+W6YGT5YW355qE5ZOB6LSo5ZCN56ew55qE5paH5pys5o+P6L656Imy5YC8Ki9cclxuICAgICBnZXRQcm9wUXVhbGl0eVRleHRPdXRsaW5lQ29sb3IoKTpjYy5Db2xvcntcclxuICAgICAgICBsZXQgY29sb3I9Y2MuY29sb3IoMzcsIDQ5LCA3MSk7ICAgICAgICBcclxuICAgICAgICByZXR1cm4gY29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635Y+W6Iux6ZuE6KeS5qCHICovXHJcbiAgICBnZXRIZXJvSWNvbihoZXJvVHlwZTpIZXJvX1R5cGUpOmNjLlNwcml0ZUZyYW1le1xyXG4gICAgICAgIGxldCBpY29uU3BOYW1lPVwiRXF1aXBwZWRfSGVyb19cIitoZXJvVHlwZTtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRTcEJ5TmFtZShpY29uU3BOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirojrflj5bnmb3oibLoi7Hpm4Top5LmoIcgKi9cclxuICAgIGdldEhlcm9JY29uYihoZXJvVHlwZTpIZXJvX1R5cGUpOmNjLlNwcml0ZUZyYW1le1xyXG4gICAgICAgIGxldCBpY29uU3BOYW1lPVwiSGVhZF9IZXJvX1NfXCIraGVyb1R5cGU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3BCeU5hbWUoaWNvblNwTmFtZSk7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICAvKiotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaVsOaNri0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgICBwdWJsaWMgbG9hZFByb3BEYXRhKCl7XHJcbiAgICAgICAgaWYoIXRoaXMubWFwX3Byb3BfbnVtKXtcclxuICAgICAgICAgICAgdGhpcy5tYXBfcHJvcF9udW09bmV3IE1hcDxudW1iZXIsbnVtYmVyPigpO1xyXG4gICAgICAgICAgICBsZXQgaWRMaXN0PUl0ZW1NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcElkTGlzdCgpO1xyXG4gICAgICAgICAgICBsZXQgbGVuPWlkTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGxlbjsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBpZD1pZExpc3RbaV07XHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SW50KFN0b3JhZ2VLZXkuUHJvcE51bStpZCwwKTtcclxuICAgICAgICAgICAgICAgIGlmKGlkPT1Qcm9wSWQuQ29pbiYmbnVtPT0wKXtcclxuICAgICAgICAgICAgICAgICAgICBudW09MjAwMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0UHJvcE51bShpZCxudW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5ouJ5Y+W5pyN5Yqh5Zmo55qEXHJcbiAgICAgICAgaWYoVXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VySUQoKSl7XHJcbiAgICAgICAgICAgIHRoaXMuSHR0cFN5bmNQcm9wRGF0YShmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBwcm9wSWQg6YGT5YW3aWRcclxuICAgICAqIEBwYXJhbSBudW0g5pS55Y+Y55qE5pWw6YePXHJcbiAgICAgKiBAcmV0dXJucyDmm7TmlLnmlbDmja7mmK/lkKbmiJDlip9cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNoYW5nZVByb3BOdW0ocHJvcElkOm51bWJlcixudW06bnVtYmVyKTpib29sZWFue1xyXG4gICAgICAgIGxldCB0eXBlPUl0ZW1NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VHlwZShwcm9wSWQpO1xyXG4gICAgICAgIC8vIGlmKHR5cGU9PTMpe1xyXG4gICAgICAgIC8vICAgICBpZihudW0+MCl7XHJcbiAgICAgICAgLy8gICAgICAgICBFcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRXF1aXBtZW50KHByb3BJZCk7XHJcbiAgICAgICAgLy8gICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5a+55bqU6YGT5YW3SUTnmoTojrflvpfmrKHmlbAgKyBwcm9wSWQpXHJcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGlmKHR5cGU9PTcpe1xyXG4gICAgICAgIC8vICAgICBpZihudW0+MCl7XHJcbiAgICAgICAgLy8gICAgICAgICAvLyBQZXRNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkUGV0KHByb3BJZC03MDAwMCk7XHJcbiAgICAgICAgLy8gICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5a+55bqU6YGT5YW3SUTnmoTojrflvpfmrKHmlbAgKyBwcm9wSWQpXHJcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIOaWsOWinuiLsembhFxyXG4gICAgICAgIGlmKHR5cGUgPT0gMTEpe1xyXG4gICAgICAgICAgICBpZihIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9JbmZvKHByb3BJZCAlIDExMDAwMCkgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEhlcm8ocHJvcElkICUgMTEwMDAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKHByb3BJZCAtIDEwMDAwLDIwKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbmV3TnVtPXRoaXMuZ2V0UHJvcE51bShwcm9wSWQpK251bTtcclxuICAgICAgICBpZihuZXdOdW0+PTApe1xyXG4gICAgICAgICAgICBpZihudW0gPiAwKXtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lr7nlupTpgZPlhbdJROeahOiOt+W+l+asoeaVsCArIHByb3BJZCk7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIGlmKG51bSA8IDApe1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuWvueW6lOmBk+WFt0lE55qE5L2/55So5qyh5pWwICsgcHJvcElkKTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgdGhpcy5zZXRQcm9wTnVtKHByb3BJZCxuZXdOdW0pO1xyXG4gICAgICAgICAgICBpZihQcm9wSWQuQ29pbj09cHJvcElkICYmIG51bSA8IDApe1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoQ29pblNob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihQcm9wSWQuR2VtPT1wcm9wSWQgJiYgbnVtIDwgMCkgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoR2VtU2hvdygpOyAgXHJcbiAgICAgICAgICAgIGlmKFByb3BJZC5PcmRpbmFyeVdpc2hpbmdDb2luPT1wcm9wSWQgJiYgbnVtID4gMCl7XHJcbiAgICAgICAgICAgICAgICBFdmVudE1hbmFnZXIucG9zdFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9DSEVDSyxSZWRFdmVudFR5cGUuQnRuX1Nob3ApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFByb3BOdW0ocHJvcElkOm51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1hcF9wcm9wX251bS5nZXQocHJvcElkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0UHJvcE51bShwcm9wSWQ6bnVtYmVyLG51bTpudW1iZXIsaXNTYXZlOmJvb2xlYW49ZmFsc2Upe1xyXG4gICAgICAgIHRoaXMubWFwX3Byb3BfbnVtLnNldChwcm9wSWQsbnVtKTtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5Qcm9wTnVtK3Byb3BJZCxudW0pO1xyXG4gICAgICAgIC8qKui1hOa6kOabtOaUuemAmuefpSAqL1xyXG4gICAgICAgIHN3aXRjaChwcm9wSWQpe1xyXG4gICAgICAgICAgICBjYXNlIFByb3BJZC5Db2luOntcclxuICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci5wb3N0QXNzZXRzRXZlbnQoQXNzZXRzRXZlbnRUeXBlLkNPSU4pO1xyXG4gICAgICAgICAgICAgICAgLy8gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoQ29pblNob3coKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFByb3BJZC5HZW06e1xyXG4gICAgICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLnBvc3RBc3NldHNFdmVudChBc3NldHNFdmVudFR5cGUuR0VNKTtcclxuICAgICAgICAgICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVmcmVzaEdlbVNob3coKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFByb3BJZC5IZXJvRXhwOntcclxuICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci5wb3N0QXNzZXRzRXZlbnQoQXNzZXRzRXZlbnRUeXBlLkhFUk9fRVhQKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFByb3BJZC5IZXJvU3RvbmU6e1xyXG4gICAgICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLnBvc3RBc3NldHNFdmVudChBc3NldHNFdmVudFR5cGUuSEVST19TVE9ORSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBQcm9wSWQuQW5pbWFsRm9vZDp7XHJcbiAgICAgICAgICAgICAgICBFdmVudE1hbmFnZXIucG9zdEFzc2V0c0V2ZW50KEFzc2V0c0V2ZW50VHlwZS5BbmltYWxfRm9vZCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSA0MDAwNDp7XHJcbiAgICAgICAgICAgICAgICAvLyBFdmVudE1hbmFnZXIucG9zdEFzc2V0c0V2ZW50KEFzc2V0c0V2ZW50VHlwZS5BbmltYWxfRm9vZCk7XHJcbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5lbWl0KFwib25SZWZyZXNoSW5zdGFuY2VJdGVtXCIpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDAwMDU6e1xyXG4gICAgICAgICAgICAgICAgLy9FdmVudE1hbmFnZXIucG9zdEFzc2V0c0V2ZW50KEFzc2V0c0V2ZW50VHlwZS5BbmltYWxfRm9vZCk7XHJcbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5lbWl0KFwib25SZWZyZXNoSW5zdGFuY2VJdGVtXCIpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDAwMDY6e1xyXG4gICAgICAgICAgICAgICAgLy9FdmVudE1hbmFnZXIucG9zdEFzc2V0c0V2ZW50KEFzc2V0c0V2ZW50VHlwZS5BbmltYWxfRm9vZCk7XHJcbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5lbWl0KFwib25SZWZyZXNoSW5zdGFuY2VJdGVtXCIpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGlzU2F2ZSl7XHJcbiAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlByb3BOdW0rcHJvcElkLG51bSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmKFByb3BJZC5HZW09PXByb3BJZCl7XHJcbiAgICAgICAgLy8gICAgIC8v55uu5YmN5Y+q5LiK5oql6ZK755+zXHJcbiAgICAgICAgLy8gICAgIGxldCBwcm9wRGF0YXM9bmV3IEFycmF5PFByb3BPYmplY3Q+KCk7XHJcbiAgICAgICAgLy8gICAgIGxldCBwcm9wRGF0YT1uZXcgUHJvcE9iamVjdCgpO1xyXG4gICAgICAgIC8vICAgICBwcm9wRGF0YS5pdGVtc0lkPXByb3BJZDtcclxuICAgICAgICAvLyAgICAgcHJvcERhdGEuaXRlbXNOdW09bnVtO1xyXG4gICAgICAgIC8vICAgICBwcm9wRGF0YXMucHVzaChwcm9wRGF0YSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuSHR0cFNldFByb3BEYXRhKHByb3BEYXRhcyk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuiOt+WPluijheWkh+eahOWIl+ihqOaVsOaNriAqL1xyXG4gICAgZ2V0RXF1aXBtZW50TGlzdChlcXVpcFR5cGU6RXF1aXBUeXBlKTpFcXVpcEluZm9bXXtcclxuICAgICAgICBsZXQgRUFNPUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBsZXQgSU09SXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBsZXQgbGlzdD1uZXcgQXJyYXkoKTtcclxuICAgICAgICB0aGlzLm1hcF9wcm9wX251bS5mb3JFYWNoKChwcm9wTnVtLHByb3BJZCk9PntcclxuICAgICAgICAgICAgaWYocHJvcE51bT4wKXtcclxuICAgICAgICAgICAgICAgIGxldCBwcm9wVHlwZT1JTS5nZXRUeXBlKHByb3BJZCk7XHJcbiAgICAgICAgICAgICAgICAvL+WmguaenOaYr+ijheWkh1xyXG4gICAgICAgICAgICAgICAgaWYocHJvcFR5cGU9PTMpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0eXBlPUVBTS5nZXRFcXVpcG1lbnRQb3NpdGlvbihwcm9wSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGVxdWlwVHlwZT09dHlwZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcm9wPW5ldyBFcXVpcEluZm8oKTtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wLmVxdWlwX2lkPXByb3BJZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcC5lcXVpcF9udW09cHJvcE51bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5wdXNoKHByb3ApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYobGlzdC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIC8v6YeN5paw5o6S5YiX5LiA5LiL77yM5ZOB6LSo5pyA5aW95Zyo5pyA5YmNXHJcbiAgICAgICAgICAgIGxpc3Quc29ydCgoYTpFcXVpcEluZm8sYjpFcXVpcEluZm8pPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgbGV2ZWxBPUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdGFnZShhLmVxdWlwX2lkKTtcclxuICAgICAgICAgICAgICAgIGxldCBsZXZlbEI9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0YWdlKGIuZXF1aXBfaWQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxldmVsQi1sZXZlbEE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgfVxyXG4gICAgLyoq6I635Y+W5a6g54mp55qE5YiX6KGo5pWw5o2uICovXHJcbiAgICBnZXRQZXRMaXN0KCk6UGV0TWVzc2FnZVtde1xyXG4gICAgICAgIGxldCBJTT1JdGVtTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGxldCBsaXN0PW5ldyBBcnJheSgpO1xyXG4gICAgICAgIHRoaXMubWFwX3Byb3BfbnVtLmZvckVhY2goKHByb3BOdW0scHJvcElkKT0+e1xyXG4gICAgICAgICAgICBpZihwcm9wTnVtPjApe1xyXG4gICAgICAgICAgICAgICAgbGV0IHByb3BUeXBlPUlNLmdldFR5cGUocHJvcElkKTtcclxuICAgICAgICAgICAgICAgIC8v5aaC5p6c5piv6KOF5aSHXHJcbiAgICAgICAgICAgICAgICBpZihwcm9wVHlwZT09Nyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByb3A9bmV3IFBldE1lc3NhZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wLnBldF9pZD1wcm9wSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcC5wZXRfbnVtPXByb3BOdW07XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdC5wdXNoKHByb3ApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZihsaXN0Lmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgLy8gdG9kbyDlrqDnianmjpLluo/vvIzpmLbmrrXpq5jnmoTlnKjliY3pnaJcclxuICAgICAgICAgICAgLy8gbGlzdC5zb3J0KChhOkVxdWlwSW5mbyxiOkVxdWlwSW5mbyk9PntcclxuICAgICAgICAgICAgLy8gICAgIGxldCBsZXZlbEE9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0YWdlKGEuZXF1aXBfaWQpO1xyXG4gICAgICAgICAgICAvLyAgICAgbGV0IGxldmVsQj1FcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RhZ2UoYi5lcXVpcF9pZCk7XHJcbiAgICAgICAgICAgIC8vICAgICByZXR1cm4gbGV2ZWxCLWxldmVsQTtcclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9XHJcbiAgICAvKirkv53lrZjov5nku73liJfooajvvIzkv67mlLnoo4XlpIfmlbDph4/lkI7osIPnlKggKi9cclxuICAgIHNhdmVFcXVpcG1lbnRMaXN0KGxpc3Q6RXF1aXBJbmZvW10pe1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGxpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgcHJvcD1saXN0W2ldO1xyXG4gICAgICAgICAgICB0aGlzLm1hcF9wcm9wX251bS5zZXQocHJvcC5lcXVpcF9pZCxwcm9wLmVxdWlwX251bSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuaKiuWPmOmHj+WtmOWCqOeahOWAvOWtmOaUvuWcqOacrOWcsOaWh+S7tiAqL1xyXG4gICAgcHVibGljIHNhdmVBbGxQcm9wTnVtKGlzUG9zdDpib29sZWFuPXRydWUpe1xyXG4gICAgICAgIGxldCBsaXN0OlByb3BPYmplY3RbXT1bXTtcclxuICAgICAgICB0aGlzLm1hcF9wcm9wX251bS5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlByb3BOdW0rayx2KTtcclxuICAgICAgICAgICAgbGV0IHByb3A9bmV3IFByb3BPYmplY3QoKTtcclxuICAgICAgICAgICAgcHJvcC5pdGVtc0lkPWs7XHJcbiAgICAgICAgICAgIHByb3AuaXRlbXNOdW09djtcclxuICAgICAgICAgICAgbGlzdC5wdXNoKHByb3ApXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvL+aPkOS6pOWIsOacjeWKoeWZqFxyXG4gICAgICAgIGlmKGlzUG9zdCl7XHJcbiAgICAgICAgICAgIHRoaXMuSHR0cFNldFByb3BEYXRhKGxpc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKirojrflj5bliLDmoLnmja7lk4HotKjmjpLluo/lkI7nmoTnianlk4HliJfooaggKi9cclxuICAgIHB1YmxpYyBnZXRTb3J0UHJvcExpc3QoKXtcclxuICAgICAgICBsZXQgcHJvcExpc3Q6UHJvcERhdGFbXSA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIHRoaXMubWFwX3Byb3BfbnVtLmZvckVhY2goKG51bSxpZCkgPT57XHJcbiAgICAgICAgICAgIGxldCBwcm9wID0ge1xyXG4gICAgICAgICAgICAgICAgcHJvcF9pZDogaWQsXHJcbiAgICAgICAgICAgICAgICBwcm9wX251bTogbnVtLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKG51bT4wKXtcclxuICAgICAgICAgICAgICAgIHByb3BMaXN0LnB1c2gocHJvcClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHByb3BMaXN0LnNvcnQoKGE6UHJvcERhdGEsYjpQcm9wRGF0YSk9PntcclxuICAgICAgICAgICAgbGV0IHF1YWxpdHlBID0gSXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KGEucHJvcF9pZCk7XHJcbiAgICAgICAgICAgIGxldCBxdWFsaXR5QiA9IEl0ZW1NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eShiLnByb3BfaWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gcXVhbGl0eUEgLSBxdWFsaXR5QjtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBwcm9wTGlzdDtcclxuICAgIH1cclxuXHJcbiAgICAvKirmj5DkuqTkv67mlLnnlLPor7cgKi9cclxuICAgIGNoYW5nZVByb3BTZXJ2ZXJUZXN0KCl7XHJcbiAgICAgICAgbGV0IGNoYW5nZT1KU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIHVpZDonZmIxMjM0NTYnLFxyXG4gICAgICAgICAgICBuYW1lOlwicHJvcHNfY2hhbmdlXCIsXHJcbiAgICAgICAgICAgIHZhbHVlOlt7aWQ6MTAwMDEsbnVtOjIwfSx7aWQ6MTAwMDIsbnVtOi0zMH1dXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBpc3N1ZT1KU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIHVpZDonZmIxMjM0NTYnLFxyXG4gICAgICAgICAgICBuYW1lOlwicHJvcHNfaXNzdWVcIixcclxuICAgICAgICAgICAgdmFsdWU6W3tpZDoxMDAwMSxudW06MTIwfSx7aWQ6MTAwMDIsbnVtOjEzMH1dXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuacjeWKoeerr+WvueaOpeeahOS7o+eggSoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4gICAgLyoq5ZCM5q2l5pyN5Yqh5Zmo55qE6YGT5YW35pWw5o2u6Iez5pys5ZywICovXHJcbiAgICBIdHRwU3luY1Byb3BEYXRhKGlzUmVmcmVzaDpib29sZWFuPXRydWUpe1xyXG4gICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5nZXRQcm9wLHRoaXMuZ2V0UHJvcEpzb25TdHJpbmcobnVsbCkpLnRoZW4oKGRhdGE6YW55KT0+e1xyXG4gICAgICAgICAgICBpZihkYXRhKXtcclxuICAgICAgICAgICAgICAgIGxldCBsZW49ZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxsZW47IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW09ZGF0YVtpXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFByb3BOdW0oaXRlbS5pdGVtc0lkLGl0ZW0uaXRlbXNOdW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoaXNSZWZyZXNoKXtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hHZW1TaG93KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL+e7n+S4gOWtmOWCqOacrOWcsCAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZUFsbFByb3BOdW0oZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKT0+e1xyXG4gICAgICAgICAgICBjYy5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGFzeW5jIEh0dHBTZXRQcm9wRGF0YShwcm9wRGF0YXM6UHJvcE9iamVjdFtdKTpQcm9taXNlPGFueT57XHJcbiAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnNldFByb3AsdGhpcy5nZXRQcm9wSnNvblN0cmluZyhwcm9wRGF0YXMpKS50aGVuKChkYXRhOmFueSk9PntcclxuICAgICAgICAgICAgY2MubG9nKCfkuIrmiqXmiJDlip8nKTtcclxuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpPT57XHJcbiAgICAgICAgICAgIGNjLmxvZyhlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRQcm9wSnNvblN0cmluZyhwcm9wRGF0YXM6UHJvcE9iamVjdFtdKTpzdHJpbmd7XHJcbiAgICAgICAgbGV0IHVpZD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpO1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIHVpZDp1aWQsXHJcbiAgICAgICAgICAgIGdhbWVVc2VySXRlbU5ld0xpc3Q6cHJvcERhdGFzLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19