
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Equipment/EquipmentManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b5ac5ZbNhlDDZLom5oJhnz4', 'EquipmentManager');
// Scripts/Equipment/EquipmentManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentManager = void 0;
var EquipmentAttribute_1 = require("./Data/EquipmentAttribute");
var EventManager_1 = require("../Tools/EventManager");
var StorageConfig_1 = require("../Storage/StorageConfig");
var StorageManager_1 = require("../Storage/StorageManager");
var EquipmentMerge_1 = require("./Data/EquipmentMerge");
var EquipItem_1 = require("./Ui/EquipItem");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var PropConfig_1 = require("../Prop/PropConfig");
var EquipConfig_1 = require("./EquipConfig");
var PropManager_1 = require("../Prop/PropManager");
var HeroConfig_1 = require("../Hero/Game/HeroConfig");
var EquipmentLevelUpCost_1 = require("./Data/EquipmentLevelUpCost");
var MyTool_1 = require("../Tools/MyTool");
var CombatEffectiveness_1 = require("../Hero/Data/CombatEffectiveness");
var HeroManager_1 = require("../Hero/Data/HeroManager");
var WXManagerEX_1 = require("../../startscene/WXManagerEX");
var EquipmentManager = /** @class */ (function () {
    function EquipmentManager() {
        //资源
        this.item_equip = null;
        this.item_sale_equip = null;
        this.sprite_atlas = null;
    }
    EquipmentManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new EquipmentManager();
            console.log("EquipmentManager null");
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    EquipmentManager.prototype.init = function () {
        EquipmentAttribute_1.EquipmentAttributeManager.getInstance();
        EquipmentMerge_1.EquipmentMergeManager.getInstance();
        EquipmentLevelUpCost_1.EquipmentLevelUpCostManager.getInstance();
        CombatEffectiveness_1.CombatEffectivenessManager.getInstance();
        this.loadPrefab();
        this.loadSalePrefab();
        this.loadSp();
        //this.loadEquipmentList();
    };
    //-----------------------资源的读取-----------------------------
    EquipmentManager.prototype.loadPrefab = function () {
        var _this = this;
        WXManagerEX_1.default.getInstance().resourcesBundle.load('equipment/equipItem', cc.Prefab, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载prefab_equip成功');
            assets.addRef();
            _this.item_equip = assets;
            //WXManagerEX.getInstance().resourcesBundle.release("equipment/equipItem",cc.Prefab);
        });
    };
    EquipmentManager.prototype.loadSalePrefab = function () {
        var _this = this;
        WXManagerEX_1.default.getInstance().resourcesBundle.load('equipment/saleEquipment', cc.Prefab, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载prefab_saleEquipment成功');
            assets.addRef();
            _this.item_sale_equip = assets;
            //WXManagerEX.getInstance().resourcesBundle.release("equipment/equipItem",cc.Prefab);
        });
    };
    EquipmentManager.prototype.loadSp = function () {
        var _this = this;
        if (this.sprite_atlas)
            return;
        WXManagerEX_1.default.getInstance().resourcesBundle.load('equipment/equipment', cc.SpriteAtlas, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            assets.addRef();
            //console.log('加载EquipmentAttribute成功');
            _this.sprite_atlas = assets;
        });
    };
    EquipmentManager.prototype.getSpriteFrameByName = function (key) {
        return this.sprite_atlas.getSpriteFrame(key);
    };
    /**根据装备信息获得一个装备节点 */
    EquipmentManager.prototype.getEquipNodeByInfo = function (equipInfo, pAc, heroType) {
        if (pAc === void 0) { pAc = PropConfig_1.PropAction.Look; }
        if (heroType === void 0) { heroType = HeroConfig_1.Hero_Type.NULL; }
        var item = cc.instantiate(this.item_equip);
        item.getComponent(EquipItem_1.default).init(heroType, equipInfo, pAc);
        return item;
    };
    /**根据装备ID获得一个装备节点 */
    EquipmentManager.prototype.getEquipNodeById = function (equipId, pAc, heroType) {
        if (pAc === void 0) { pAc = PropConfig_1.PropAction.Look; }
        if (heroType === void 0) { heroType = HeroConfig_1.Hero_Type.NULL; }
        var item = cc.instantiate(this.item_equip);
        var equipInfo = new EquipConfig_1.EquipInfo();
        equipInfo.equip_id = equipId;
        equipInfo.equip_num = 1;
        item.getComponent(EquipItem_1.default).init(heroType, equipInfo, pAc);
        // console.log("+++",item)
        return item;
    };
    EquipmentManager.prototype.getSaleEquipNodeById = function (equipId, pAc, heroType) {
        if (pAc === void 0) { pAc = PropConfig_1.PropAction.Look; }
        if (heroType === void 0) { heroType = HeroConfig_1.Hero_Type.NULL; }
        var item = cc.instantiate(this.item_sale_equip);
        var equipInfo = new EquipConfig_1.EquipInfo();
        equipInfo.equip_id = equipId;
        equipInfo.equip_num = 1;
        item.getComponent(EquipItem_1.default).init(heroType, equipInfo, pAc);
        return item;
    };
    //-----------------------数据保存与读取----------------------------
    //筛选出没有被英雄装备的列表
    EquipmentManager.prototype.screeningEquipmentList = function (equipList) {
        var len = equipList.length;
        var HM = HeroManager_1.HeroManager.getInstance();
        for (var i = 0; i < len; i++) {
            var equipInfo = equipList[i];
            var heroList = HM.getWearEquipmentHeroList(equipInfo);
            equipInfo.equip_num -= heroList.length;
        }
    };
    /**
     * 检测是否可以合成
     * @param equipId 装备id
     * @param costList 返回能合成的列表
     * @returns 是否能合成
     */
    EquipmentManager.prototype.checkAEquipMerge = function (equipId, costList) {
        var type = EquipmentAttribute_1.EquipmentAttributeManager.getInstance().getEquipmentPosition(equipId);
        var list = PropManager_1.PropManager.getInstance().getEquipmentList(type);
        this.screeningEquipmentList(list);
        var costId = EquipmentMerge_1.EquipmentMergeManager.getInstance().getCostId(equipId);
        if (costId == 0) {
            return false;
        }
        var costNum = EquipmentMerge_1.EquipmentMergeManager.getInstance().getCostNumber(costId);
        var isCan = this.findEquipMerge(list, costId, costNum - 1, costList);
        return isCan;
    };
    /**
     *
     * @param list 现有的装备列表
     * @param costId 消耗的id
     * @param costNum 消耗的数量
     * @param costList 消耗存放的列表
     * @returns 是否可以满足合成条件
     */
    EquipmentManager.prototype.findEquipMerge = function (list, costId, costNum, costList) {
        var len = list.length;
        var haveNum = 0;
        for (var i = 0; i < len; i++) {
            var equipInfo = list[i];
            if (equipInfo.equip_id == costId) { //&&equipInfo.equip_level<=1               
                haveNum = equipInfo.equip_num;
                if (haveNum >= costNum) {
                    break;
                }
            }
        }
        if (haveNum >= costNum) {
            var costData = new EquipConfig_1.CostData();
            costData.cost_id = costId;
            costData.cost_num = costNum;
            costList.push(costData);
            return true;
        }
        else {
            if (haveNum > 0) {
                var costData = new EquipConfig_1.CostData();
                costData.cost_id = costId;
                costData.cost_num = haveNum;
                costList.push(costData);
            }
            var newCostId = EquipmentMerge_1.EquipmentMergeManager.getInstance().getCostId(costId);
            if (newCostId == 0) {
                return false;
            }
            var newCostNum = EquipmentMerge_1.EquipmentMergeManager.getInstance().getCostNumber(costId);
            return this.findEquipMerge(list, newCostId, (costNum - haveNum) * newCostNum, costList);
        }
    };
    /**检查是否可以装备最好的装备,isWear：是否直接穿戴*/
    EquipmentManager.prototype.checkQuickWear = function (heroType, isWear) {
        var isOK = false;
        for (var i = EquipConfig_1.EquipType.WuQi; i < EquipConfig_1.EquipType.Num; i++) {
            //当前装备的  
            var wearId = HeroManager_1.HeroManager.getInstance().getWearEquipment(heroType, i);
            var eam = EquipmentAttribute_1.EquipmentAttributeManager.getInstance();
            var equipList = PropManager_1.PropManager.getInstance().getEquipmentList(i);
            if (wearId != 0) {
                //获取穿戴装备的等级
                var wearLevel = eam.getStage(wearId);
                var len = equipList.length;
                for (var n = 0; n < len; n++) {
                    var equipInfo = equipList[n];
                    var level = eam.getStage(equipInfo.equip_id);
                    if (level > wearLevel) {
                        //没有被其他人穿戴过
                        var num = HeroManager_1.HeroManager.getInstance().getEquipmentRemainNum(equipInfo);
                        if (num > 0) {
                            if (isWear) {
                                HeroManager_1.HeroManager.getInstance().addWearEquipment(heroType, equipInfo.equip_id);
                                isOK = true;
                                break;
                            }
                            else {
                                return true;
                            }
                        }
                    }
                }
            }
            else {
                var len = equipList.length;
                if (len > 0) {
                    for (var n = 0; n < len; n++) {
                        var equipInfo = equipList[n];
                        //没有被其他人穿戴过
                        var num = HeroManager_1.HeroManager.getInstance().getEquipmentRemainNum(equipInfo);
                        if (num > 0) {
                            if (isWear) {
                                HeroManager_1.HeroManager.getInstance().addWearEquipment(heroType, equipInfo.equip_id);
                                isOK = true;
                                break;
                            }
                            else {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        if (isWear && isOK) {
            EventManager_1.EventManager.postAssetsEvent(EventManager_1.AssetsEventType.EQUIP_WEAR_UNLOAD);
        }
        return isOK;
    };
    /**检查是否可以装备最好的装备,isWear：是否直接穿戴*/
    EquipmentManager.prototype.checkWear = function (heroType, type) {
        var isOK = false;
        //当前装备的  
        var wearId = HeroManager_1.HeroManager.getInstance().getWearEquipment(heroType, type);
        var eam = EquipmentAttribute_1.EquipmentAttributeManager.getInstance();
        if (wearId != 0) {
            //获取穿戴装备的等级
            var wearLevel = eam.getStage(wearId);
            var equipList = PropManager_1.PropManager.getInstance().getEquipmentList(type);
            var len = equipList.length;
            for (var n = 0; n < len; n++) {
                var equipInfo = equipList[n];
                var level = eam.getStage(equipInfo.equip_id);
                if (level > wearLevel) {
                    //没有被其他人穿戴过
                    var num = HeroManager_1.HeroManager.getInstance().getEquipmentRemainNum(equipInfo);
                    if (num > 0) {
                        isOK = true;
                        break;
                    }
                }
            }
        }
        else {
            var equipList = PropManager_1.PropManager.getInstance().getEquipmentList(type);
            var len = equipList.length;
            if (len > 0) {
                for (var n = 0; n < len; n++) {
                    var equipInfo = equipList[n];
                    //没有被其他人穿戴过
                    var num = HeroManager_1.HeroManager.getInstance().getEquipmentRemainNum(equipInfo);
                    if (num > 0) {
                        isOK = true;
                        break;
                    }
                }
            }
        }
        return isOK;
    };
    /* *检查是否可以一键脱装*/
    EquipmentManager.prototype.checkQuickUnload = function (heroType, isUnload) {
        var isOK = false;
        for (var i = EquipConfig_1.EquipType.WuQi; i < EquipConfig_1.EquipType.Num; i++) {
            //当前装备的  
            var wearInfo = HeroManager_1.HeroManager.getInstance().getWearEquipment(heroType, i);
            if (wearInfo) {
                if (isUnload) {
                    HeroManager_1.HeroManager.getInstance().unloadWearEquipment(heroType, i);
                    isOK = true;
                    continue;
                }
                else {
                    return true;
                }
            }
        }
        if (isUnload && isOK) {
            EventManager_1.EventManager.postAssetsEvent(EventManager_1.AssetsEventType.EQUIP_WEAR_UNLOAD);
        }
        return isOK;
    };
    //----------------装备序列id--------------
    EquipmentManager.prototype.getEquipSequenceId = function () {
        var num = this.getEquipNum();
        /**拼接时间戳+装备递增数 */
        var nowTime = new Date().getTime();
        var weiShu = 1;
        var newNum = num;
        //求数量的位数
        while (Math.floor(newNum / 10) >= 1) {
            weiShu++;
            newNum /= 10;
        }
        var t1 = nowTime.toString().substring(weiShu);
        var id = parseInt(t1 + num);
        return id;
    };
    EquipmentManager.prototype.getEquipNum = function () {
        var num = StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.EquipNum, 1);
        return num;
    };
    EquipmentManager.prototype.addEquipNum = function () {
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.EquipNum, this.getEquipNum() + 1);
    };
    EquipmentManager.prototype.saveMergeNum = function (num) {
        cc.sys.localStorage.setItem('merge_num', num);
    };
    /**根据装备位获取装备名称 */
    EquipmentManager.prototype.getEquipName = function (posType) {
        var textId = 4001;
        switch (posType) {
            case 1:
                {
                    textId = 4001;
                }
                break;
            case 2:
                {
                    textId = 4002;
                }
                break;
            case 3:
                {
                    textId = 4003;
                }
                break;
        }
        return LanguageManager_1.default.getInstance().getStrByTextId(textId);
    };
    /***********************************************战力获取**************************************************** */
    EquipmentManager.prototype.getEquipZhanLi = function (equipId) {
        // let jsonAttribute=EquipmentAttributeManager.getInstance().getJsonEquipmentAttribute(this.equip_id);
        //装备和宠物：战斗力=0.5*生命值+10*（攻击力+防御力）+（命中+闪避+暴击+防爆）*295.3+（暴击增幅+暴击抗性）*251000
        var attributes = this.getAttributesadditional(equipId);
        var zhanli = (attributes[2] * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(1)) + (attributes[0] * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(2)) + (attributes[1] * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(3)); //0.5*jsonAttribute.BaseHealth+10//*(this.getAtt()+jsonAttribute.BaseDefense)
        zhanli = Number(MyTool_1.default.numberFormat(zhanli, 0));
        // 1.英雄界面战斗力=生命值*生命值系数+攻击力*攻击力系数+防御力*防御力系数+命中值*命中系数+闪避值*闪避值系数+（暴击值-100）*暴击值系数+防暴值*防暴值系数+（暴击增幅-2）*暴击增幅系数+暴击抗性*暴击抗性系数
        // 2.装备战斗力=生命值*生命值系数+攻击力*攻击力系数+防御力*防御力系数
        // 3.总战斗力=当前上阵英雄的战斗力总和
        return zhanli;
    };
    /**获得装备属性加上额外属性值
     * 攻击力 0
     * 防御力 1
     * 生命值 2
     * */
    EquipmentManager.prototype.getAttributesadditional = function (equipId) {
        var Attributes = this.getAttributes(equipId);
        // let jsonAttribute=EquipmentAttributeManager.getInstance().getJsonEquipmentAttribute(this.equip_id);
        // let dditional=[0,0,0,0,0,0,0,0,0,0]
        // 1：生命值
        // 2：攻击力
        // 3：防御力
        // 4：命中值
        // 5：闪避值
        // 6：暴击值
        // 7：防爆值
        // 8：暴击增幅
        // 9：暴击抗性
        // 10：额外攻速
        // let BaseAttack=jsonAttribute.BaseAttack//基础攻击力
        // let BaseDefense=jsonAttribute.BaseDefense//基础防御力
        // let BaseHealth=jsonAttribute.BaseHealth//基础生命值
        // let GrowthAttack=EquipmentAttributeManager.getInstance().getGrowthAttack(this.equip_id)//成长攻击值
        // let GrowthDefense=EquipmentAttributeManager.getInstance().getGrowthDefense(this.equip_id)//成长防御力
        // let GrowthHealth=EquipmentAttributeManager.getInstance().getGrowthHealth(this.equip_id)//成长生命值
        // let zhuangbeiPos=EquipmentAttributeManager.getInstance().getEquipmentPosition(this.equip_id)//装备位置
        // for (let Qualityindex = 1; Qualityindex < 7; Qualityindex++) {
        //     let id=EquipmentAttributeManager.getID(zhuangbeiPos,Qualityindex)
        //     if(Qualityindex<=jsonAttribute.Quality){
        //         let leix=EquipmentAttributeManager.getInstance().getExtraAttributeType(id)
        //         if(leix==1){
        //             Attributes[2]+=EquipmentAttributeManager.getInstance().getExtraAttributeValue(id)
        //         }
        //         if(leix==2){
        //             Attributes[0]+=EquipmentAttributeManager.getInstance().getExtraAttributeValue(id)
        //         }
        //         if(leix==3){
        //             Attributes[1]+=EquipmentAttributeManager.getInstance().getExtraAttributeValue(id)
        //         }
        //     }
        // }
        // //装备属性=成长属性*装备等级+装备基础属性
        return Attributes;
    };
    /**获得总攻击力 */
    EquipmentManager.prototype.getAtt = function (equipId) {
        var jsonAttribute = EquipmentAttribute_1.EquipmentAttributeManager.getInstance().getJsonEquipmentAttribute(equipId);
        var BaseAttack = jsonAttribute.BaseAttack; //基础攻击力
        // let GrowthAttack=EquipmentAttributeManager.getInstance().getGrowthAttack(this.equip_id)//成长攻击值
        // let zhuangbeiPos=EquipmentAttributeManager.getInstance().getEquipmentPosition(this.equip_id)//装备位置
        // for (let Qualityindex = 1; Qualityindex < 7; Qualityindex++) {
        //     let id=EquipmentAttributeManager.getID(zhuangbeiPos,Qualityindex)
        //     if(Qualityindex<=jsonAttribute.Quality){
        //         GrowthAttack+=EquipmentAttributeManager.getInstance().getGrowthAttack(id)
        //     }
        // }
        //装备属性=成长属性*装备等级+装备基础属性
        var attack = Number(MyTool_1.default.numberFormat(BaseAttack, 0));
        return attack;
    };
    /**获得总防御力 */
    EquipmentManager.prototype.getDefense = function (equipId) {
        var jsonAttribute = EquipmentAttribute_1.EquipmentAttributeManager.getInstance().getJsonEquipmentAttribute(equipId);
        var BaseDefense = jsonAttribute.BaseDefense; //基础防御力
        // let GrowthDefense=EquipmentAttributeManager.getInstance().getGrowthDefense(this.equip_id)//成长防御力
        // let zhuangbeiPos=EquipmentAttributeManager.getInstance().getEquipmentPosition(this.equip_id)//装备位置
        // for (let Qualityindex = 1; Qualityindex < 7; Qualityindex++) {
        //     let id=EquipmentAttributeManager.getID(zhuangbeiPos,Qualityindex)
        //     if(Qualityindex<=jsonAttribute.Quality){
        //         GrowthDefense+=EquipmentAttributeManager.getInstance().getGrowthDefense(id)
        //     }
        // }
        //装备属性=成长属性*装备等级+装备基础属性
        var attack = Number(MyTool_1.default.numberFormat(BaseDefense, 0));
        return attack;
    };
    /**获得总生命值 */
    EquipmentManager.prototype.getHealth = function (equipId) {
        var jsonAttribute = EquipmentAttribute_1.EquipmentAttributeManager.getInstance().getJsonEquipmentAttribute(equipId);
        var BaseHealth = jsonAttribute.BaseHealth; //基础生命值
        // let GrowthHealth=EquipmentAttributeManager.getInstance().getGrowthHealth(this.equip_id)//成长生命值
        // let zhuangbeiPos=EquipmentAttributeManager.getInstance().getEquipmentPosition(this.equip_id)//装备位置
        // for (let Qualityindex = 1; Qualityindex < 7; Qualityindex++) {
        //     let id=EquipmentAttributeManager.getID(zhuangbeiPos,Qualityindex)
        //     if(Qualityindex<=jsonAttribute.Quality){
        // GrowthHealth+=EquipmentAttributeManager.getInstance().getGrowthHealth(id)
        //     }
        // }
        //装备属性=成长属性*装备等级+装备基础属性
        var attack = Number(MyTool_1.default.numberFormat(BaseHealth, 0));
        return attack;
    };
    /**获得装备属性
     * 攻击力 0
     * 防御力 1
     * 生命值 2
     * */
    EquipmentManager.prototype.getAttributes = function (equipId) {
        var jsonAttribute = EquipmentAttribute_1.EquipmentAttributeManager.getInstance().getJsonEquipmentAttribute(equipId);
        var BaseAttack = jsonAttribute.BaseAttack; //基础攻击力
        var BaseDefense = jsonAttribute.BaseDefense; //基础防御力
        var BaseHealth = jsonAttribute.BaseHealth; //基础生命值
        // let GrowthAttack=EquipmentAttributeManager.getInstance().getGrowthAttack(this.equip_id)//成长攻击值
        // let GrowthDefense=EquipmentAttributeManager.getInstance().getGrowthDefense(this.equip_id)//成长防御力
        // let GrowthHealth=EquipmentAttributeManager.getInstance().getGrowthHealth(this.equip_id)//成长生命值
        // let zhuangbeiPos=EquipmentAttributeManager.getInstance().getEquipmentPosition(this.equip_id)//装备位置
        // for (let Qualityindex = 1; Qualityindex < 7; Qualityindex++) {
        //     let id=EquipmentAttributeManager.getID(zhuangbeiPos,Qualityindex)
        //     if(Qualityindex<=jsonAttribute.Quality){
        //         GrowthAttack+=EquipmentAttributeManager.getInstance().getGrowthAttack(id)
        //         GrowthDefense+=EquipmentAttributeManager.getInstance().getGrowthDefense(id)
        //         GrowthHealth+=EquipmentAttributeManager.getInstance().getGrowthHealth(id)
        //     }
        // }
        // let BaseAttacks=Number(MyTool.numberFormat(GrowthAttack*this.equip_level+BaseAttack,0))
        // let BaseDefenses=Number(MyTool.numberFormat(GrowthDefense*this.equip_level+BaseDefense,0))
        // let BaseHealths=Number(MyTool.numberFormat(GrowthHealth*this.equip_level+BaseHealth,0))
        //装备属性=成长属性*装备等级+装备基础属性
        var BaseAttacks = Number(MyTool_1.default.numberFormat(BaseAttack, 0));
        var BaseDefenses = Number(MyTool_1.default.numberFormat(BaseDefense, 0));
        var BaseHealths = Number(MyTool_1.default.numberFormat(BaseHealth, 0));
        var attack = [BaseAttacks, BaseDefenses, BaseHealths];
        return attack;
    };
    EquipmentManager._instance = null;
    return EquipmentManager;
}());
exports.EquipmentManager = EquipmentManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcRXF1aXBtZW50XFxFcXVpcG1lbnRNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLGdFQUFxRTtBQUNyRSxzREFBc0U7QUFDdEUsMERBQXNEO0FBQ3RELDREQUE4RDtBQUM5RCx3REFBOEQ7QUFDOUQsNENBQXVDO0FBQ3ZDLG9FQUErRDtBQUMvRCxpREFBd0Q7QUFDeEQsNkNBQStEO0FBQy9ELG1EQUFrRDtBQUNsRCxzREFBb0Q7QUFDcEQsb0VBQTBFO0FBQzFFLDBDQUFxQztBQUNyQyx3RUFBOEU7QUFDOUUsd0RBQXVEO0FBQ3ZELDREQUF1RDtBQUV2RDtJQUFBO1FBR0ksSUFBSTtRQUNJLGVBQVUsR0FBVyxJQUFJLENBQUM7UUFDMUIsb0JBQWUsR0FBVyxJQUFJLENBQUM7UUFDL0IsaUJBQVksR0FBZ0IsSUFBSSxDQUFDO0lBa2U3QyxDQUFDO0lBaGVpQiw0QkFBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLGdCQUFnQixFQUFFLENBQUM7WUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELFNBQVM7SUFDRCwrQkFBSSxHQUFaO1FBQ0ksOENBQXlCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDeEMsc0NBQXFCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEMsa0RBQTJCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDMUMsZ0RBQTBCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJ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YSxHQUFDLDhDQUF5QixDQUFDLFdBQVcsRUFBRSxDQUFDLHlCQUF5QixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdGLElBQUksVUFBVSxHQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUEsQ0FBQSxPQUFPO1FBQzlDLElBQUksV0FBVyxHQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUEsQ0FBQSxPQUFPO1FBQ2hELElBQUksVUFBVSxHQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUEsQ0FBQSxPQUFPO1FBQzlDLGlHQUFpRztRQUNqRyxtR0FBbUc7UUFDbkcsaUdBQWlHO1FBQ2pHLHFHQUFxRztRQUNyRyxpRUFBaUU7UUFDakUsd0VBQXdFO1FBQ3hFLCtDQUErQztRQUMvQyxvRkFBb0Y7UUFDcEYsc0ZBQXNGO1FBQ3RGLG9GQUFvRjtRQUNwRixRQUFRO1FBQ1IsSUFBSTtRQUNKLDBGQUEwRjtRQUMxRiw2RkFBNkY7UUFDN0YsMEZBQTBGO1FBQzFGLHVCQUF1QjtRQUN2QixJQUFJLFdBQVcsR0FBQyxNQUFNLENBQUMsZ0JBQU0sQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDekQsSUFBSSxZQUFZLEdBQUMsTUFBTSxDQUFDLGdCQUFNLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzNELElBQUksV0FBVyxHQUFDLE1BQU0sQ0FBQyxnQkFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN6RCxJQUFJLE1BQU0sR0FBQyxDQUFDLFdBQVcsRUFBQyxZQUFZLEVBQUMsV0FBVyxDQUFDLENBQUE7UUFDakQsT0FBTyxNQUFNLENBQUE7SUFDakIsQ0FBQztJQXJlYywwQkFBUyxHQUFxQixJQUFJLENBQUM7SUFzZXRELHVCQUFDO0NBeGVELEFBd2VDLElBQUE7QUF4ZVksNENBQWdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5pbXBvcnQgeyBFcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyfSBmcm9tIFwiLi9EYXRhL0VxdWlwbWVudEF0dHJpYnV0ZVwiO1xyXG5pbXBvcnQgeyBBc3NldHNFdmVudFR5cGUsIEV2ZW50TWFuYWdlciB9IGZyb20gXCIuLi9Ub29scy9FdmVudE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBFcXVpcG1lbnRNZXJnZU1hbmFnZXIgfSBmcm9tIFwiLi9EYXRhL0VxdWlwbWVudE1lcmdlXCI7XHJcbmltcG9ydCBFcXVpcEl0ZW0gZnJvbSBcIi4vVWkvRXF1aXBJdGVtXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFByb3BBY3Rpb24sIFByb3BJZCB9IGZyb20gXCIuLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuaW1wb3J0IHsgQ29zdERhdGEsIEVxdWlwSW5mbywgRXF1aXBUeXBlIH0gZnJvbSBcIi4vRXF1aXBDb25maWdcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvX1R5cGUgfSBmcm9tIFwiLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IHsgRXF1aXBtZW50TGV2ZWxVcENvc3RNYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9FcXVpcG1lbnRMZXZlbFVwQ29zdFwiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IHsgQ29tYmF0RWZmZWN0aXZlbmVzc01hbmFnZXIgfSBmcm9tIFwiLi4vSGVyby9EYXRhL0NvbWJhdEVmZmVjdGl2ZW5lc3NcIjtcclxuaW1wb3J0IHsgSGVyb01hbmFnZXIgfSBmcm9tIFwiLi4vSGVyby9EYXRhL0hlcm9NYW5hZ2VyXCI7XHJcbmltcG9ydCBXWE1hbmFnZXJFWCBmcm9tIFwiLi4vLi4vc3RhcnRzY2VuZS9XWE1hbmFnZXJFWFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEVxdWlwbWVudE1hbmFnZXIge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogRXF1aXBtZW50TWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+i1hOa6kFxyXG4gICAgcHJpdmF0ZSBpdGVtX2VxdWlwOmNjLlByZWZhYj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpdGVtX3NhbGVfZXF1aXA6Y2MuUHJlZmFiPW51bGw7XHJcbiAgICBwcml2YXRlIHNwcml0ZV9hdGxhczpjYy5TcHJpdGVBdGxhcz1udWxsO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpFcXVpcG1lbnRNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgRXF1aXBtZW50TWFuYWdlcigpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVxdWlwbWVudE1hbmFnZXIgbnVsbFwiKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCAoKSB7XHJcbiAgICAgICAgRXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIEVxdWlwbWVudE1lcmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIEVxdWlwbWVudExldmVsVXBDb3N0TWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgdGhpcy5sb2FkUHJlZmFiKCk7XHJcbiAgICAgICAgdGhpcy5sb2FkU2FsZVByZWZhYigpO1xyXG4gICAgICAgIHRoaXMubG9hZFNwKCk7XHJcbiAgICAgICAgLy90aGlzLmxvYWRFcXVpcG1lbnRMaXN0KCk7XHJcbiAgICB9XHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t6LWE5rqQ55qE6K+75Y+WLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHB1YmxpYyBsb2FkUHJlZmFiKCl7XHJcbiAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5yZXNvdXJjZXNCdW5kbGUubG9hZCgnZXF1aXBtZW50L2VxdWlwSXRlbScsY2MuUHJlZmFiLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5QcmVmYWIpPT57XHJcbiAgICAgICAgICAgIGlmKGVycm9yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vXByZWZhYl9lcXVpcOaIkOWKnycpO1xyXG4gICAgICAgICAgICBhc3NldHMuYWRkUmVmKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbV9lcXVpcD1hc3NldHM7XHJcbiAgICAgICAgICAgIC8vV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5yZXNvdXJjZXNCdW5kbGUucmVsZWFzZShcImVxdWlwbWVudC9lcXVpcEl0ZW1cIixjYy5QcmVmYWIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkU2FsZVByZWZhYigpe1xyXG4gICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucmVzb3VyY2VzQnVuZGxlLmxvYWQoJ2VxdWlwbWVudC9zYWxlRXF1aXBtZW50JyxjYy5QcmVmYWIsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgaWYoZXJyb3IpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqg6L29cHJlZmFiX3NhbGVFcXVpcG1lbnTmiJDlip8nKTtcclxuICAgICAgICAgICAgYXNzZXRzLmFkZFJlZigpO1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1fc2FsZV9lcXVpcD1hc3NldHM7XHJcbiAgICAgICAgICAgIC8vV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5yZXNvdXJjZXNCdW5kbGUucmVsZWFzZShcImVxdWlwbWVudC9lcXVpcEl0ZW1cIixjYy5QcmVmYWIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9hZFNwKCl7XHJcbiAgICAgICAgaWYodGhpcy5zcHJpdGVfYXRsYXMpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucmVzb3VyY2VzQnVuZGxlLmxvYWQoJ2VxdWlwbWVudC9lcXVpcG1lbnQnLGNjLlNwcml0ZUF0bGFzLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5TcHJpdGVBdGxhcyk9PntcclxuICAgICAgICAgICAgaWYoZXJyb3IpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhc3NldHMuYWRkUmVmKCk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ+WKoOi9vUVxdWlwbWVudEF0dHJpYnV0ZeaIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZV9hdGxhcz1hc3NldHM7ICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFNwcml0ZUZyYW1lQnlOYW1lKGtleTpzdHJpbmcpOmNjLlNwcml0ZUZyYW1le1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNwcml0ZV9hdGxhcy5nZXRTcHJpdGVGcmFtZShrZXkpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6KOF5aSH5L+h5oGv6I635b6X5LiA5Liq6KOF5aSH6IqC54K5ICovXHJcbiAgICBwdWJsaWMgZ2V0RXF1aXBOb2RlQnlJbmZvKGVxdWlwSW5mbzpFcXVpcEluZm8scEFjOlByb3BBY3Rpb249UHJvcEFjdGlvbi5Mb29rLGhlcm9UeXBlOkhlcm9fVHlwZT1IZXJvX1R5cGUuTlVMTCk6Y2MuTm9kZXtcclxuICAgICAgICBsZXQgaXRlbT1jYy5pbnN0YW50aWF0ZSh0aGlzLml0ZW1fZXF1aXApO1xyXG4gICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KEVxdWlwSXRlbSkuaW5pdChoZXJvVHlwZSxlcXVpcEluZm8scEFjKTtcclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruijheWkh0lE6I635b6X5LiA5Liq6KOF5aSH6IqC54K5ICovXHJcbiAgICBwdWJsaWMgZ2V0RXF1aXBOb2RlQnlJZChlcXVpcElkOm51bWJlcixwQWM6UHJvcEFjdGlvbj1Qcm9wQWN0aW9uLkxvb2ssaGVyb1R5cGU6SGVyb19UeXBlPUhlcm9fVHlwZS5OVUxMKTpjYy5Ob2Rle1xyXG4gICAgICAgIGxldCBpdGVtPWNjLmluc3RhbnRpYXRlKHRoaXMuaXRlbV9lcXVpcCk7XHJcbiAgICAgICAgbGV0IGVxdWlwSW5mbz1uZXcgRXF1aXBJbmZvKCk7XHJcbiAgICAgICAgZXF1aXBJbmZvLmVxdWlwX2lkPWVxdWlwSWQ7XHJcbiAgICAgICAgZXF1aXBJbmZvLmVxdWlwX251bT0xO1xyXG4gICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KEVxdWlwSXRlbSkuaW5pdChoZXJvVHlwZSxlcXVpcEluZm8scEFjKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIisrK1wiLGl0ZW0pXHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFNhbGVFcXVpcE5vZGVCeUlkKGVxdWlwSWQ6bnVtYmVyLHBBYzpQcm9wQWN0aW9uPVByb3BBY3Rpb24uTG9vayxoZXJvVHlwZTpIZXJvX1R5cGU9SGVyb19UeXBlLk5VTEwpOmNjLk5vZGV7XHJcbiAgICAgICAgbGV0IGl0ZW09Y2MuaW5zdGFudGlhdGUodGhpcy5pdGVtX3NhbGVfZXF1aXApO1xyXG4gICAgICAgIGxldCBlcXVpcEluZm89bmV3IEVxdWlwSW5mbygpO1xyXG4gICAgICAgIGVxdWlwSW5mby5lcXVpcF9pZD1lcXVpcElkO1xyXG4gICAgICAgIGVxdWlwSW5mby5lcXVpcF9udW09MTtcclxuICAgICAgICBpdGVtLmdldENvbXBvbmVudChFcXVpcEl0ZW0pLmluaXQoaGVyb1R5cGUsZXF1aXBJbmZvLHBBYyk7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaVsOaNruS/neWtmOS4juivu+WPli0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8v562b6YCJ5Ye65rKh5pyJ6KKr6Iux6ZuE6KOF5aSH55qE5YiX6KGoXHJcbiAgICBzY3JlZW5pbmdFcXVpcG1lbnRMaXN0KGVxdWlwTGlzdDpFcXVpcEluZm9bXSl7XHJcbiAgICAgICAgbGV0IGxlbj1lcXVpcExpc3QubGVuZ3RoOyAgICAgICAgXHJcbiAgICAgICAgbGV0IEhNPUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8bGVuOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgZXF1aXBJbmZvPWVxdWlwTGlzdFtpXTtcclxuICAgICAgICAgICAgbGV0IGhlcm9MaXN0PUhNLmdldFdlYXJFcXVpcG1lbnRIZXJvTGlzdChlcXVpcEluZm8pO1xyXG4gICAgICAgICAgICBlcXVpcEluZm8uZXF1aXBfbnVtLT1oZXJvTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmo4DmtYvmmK/lkKblj6/ku6XlkIjmiJBcclxuICAgICAqIEBwYXJhbSBlcXVpcElkIOijheWkh2lkXHJcbiAgICAgKiBAcGFyYW0gY29zdExpc3Qg6L+U5Zue6IO95ZCI5oiQ55qE5YiX6KGoXHJcbiAgICAgKiBAcmV0dXJucyDmmK/lkKbog73lkIjmiJBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNoZWNrQUVxdWlwTWVyZ2UoZXF1aXBJZDpudW1iZXIsY29zdExpc3Q6Q29zdERhdGFbXSk6Ym9vbGVhbntcclxuXHJcbiAgICAgICAgbGV0IHR5cGU9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEVxdWlwbWVudFBvc2l0aW9uKGVxdWlwSWQpO1xyXG4gICAgICAgIGxldCBsaXN0PVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RXF1aXBtZW50TGlzdCh0eXBlKTtcclxuICAgICAgICB0aGlzLnNjcmVlbmluZ0VxdWlwbWVudExpc3QobGlzdCk7XHJcbiAgICAgICAgbGV0IGNvc3RJZD1FcXVpcG1lbnRNZXJnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb3N0SWQoZXF1aXBJZCk7XHJcbiAgICAgICAgaWYoY29zdElkPT0wKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY29zdE51bT1FcXVpcG1lbnRNZXJnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb3N0TnVtYmVyKGNvc3RJZCk7XHJcbiAgICAgICAgbGV0IGlzQ2FuPXRoaXMuZmluZEVxdWlwTWVyZ2UobGlzdCxjb3N0SWQsY29zdE51bS0xLGNvc3RMaXN0KTtcclxuICAgICAgICByZXR1cm4gaXNDYW47XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGxpc3Qg546w5pyJ55qE6KOF5aSH5YiX6KGoXHJcbiAgICAgKiBAcGFyYW0gY29zdElkIOa2iOiAl+eahGlkXHJcbiAgICAgKiBAcGFyYW0gY29zdE51bSDmtojogJfnmoTmlbDph49cclxuICAgICAqIEBwYXJhbSBjb3N0TGlzdCDmtojogJflrZjmlL7nmoTliJfooahcclxuICAgICAqIEByZXR1cm5zIOaYr+WQpuWPr+S7pea7oei2s+WQiOaIkOadoeS7tlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGZpbmRFcXVpcE1lcmdlKGxpc3Q6RXF1aXBJbmZvW10sY29zdElkOm51bWJlcixjb3N0TnVtOm51bWJlcixjb3N0TGlzdDpDb3N0RGF0YVtdKTpib29sZWFue1xyXG4gICAgICAgIGxldCBsZW49bGlzdC5sZW5ndGg7ICAgICAgICBcclxuICAgICAgICBsZXQgaGF2ZU51bT0wO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGxlbjsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGVxdWlwSW5mbz1saXN0W2ldO1xyXG4gICAgICAgICAgICBpZihlcXVpcEluZm8uZXF1aXBfaWQ9PWNvc3RJZCl7Ly8mJmVxdWlwSW5mby5lcXVpcF9sZXZlbDw9MSAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaGF2ZU51bT1lcXVpcEluZm8uZXF1aXBfbnVtO1xyXG4gICAgICAgICAgICAgICAgaWYoaGF2ZU51bT49Y29zdE51bSl7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaGF2ZU51bT49Y29zdE51bSl7XHJcbiAgICAgICAgICAgIGxldCBjb3N0RGF0YT1uZXcgQ29zdERhdGEoKTtcclxuICAgICAgICAgICAgY29zdERhdGEuY29zdF9pZD1jb3N0SWQ7XHJcbiAgICAgICAgICAgIGNvc3REYXRhLmNvc3RfbnVtPWNvc3ROdW07XHJcbiAgICAgICAgICAgIGNvc3RMaXN0LnB1c2goY29zdERhdGEpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYoaGF2ZU51bT4wKXtcclxuICAgICAgICAgICAgICAgIGxldCBjb3N0RGF0YT1uZXcgQ29zdERhdGEoKTtcclxuICAgICAgICAgICAgICAgIGNvc3REYXRhLmNvc3RfaWQ9Y29zdElkO1xyXG4gICAgICAgICAgICAgICAgY29zdERhdGEuY29zdF9udW09aGF2ZU51bTtcclxuICAgICAgICAgICAgICAgIGNvc3RMaXN0LnB1c2goY29zdERhdGEpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBuZXdDb3N0SWQ9RXF1aXBtZW50TWVyZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29zdElkKGNvc3RJZCk7XHJcbiAgICAgICAgICAgIGlmKG5ld0Nvc3RJZD09MCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG5ld0Nvc3ROdW09RXF1aXBtZW50TWVyZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29zdE51bWJlcihjb3N0SWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maW5kRXF1aXBNZXJnZShsaXN0LG5ld0Nvc3RJZCwoY29zdE51bS1oYXZlTnVtKSpuZXdDb3N0TnVtLGNvc3RMaXN0KTtcclxuICAgICAgICB9XHJcbiAgICB9ICAgIFxyXG4gICAgLyoq5qOA5p+l5piv5ZCm5Y+v5Lul6KOF5aSH5pyA5aW955qE6KOF5aSHLGlzV2Vhcu+8muaYr+WQpuebtOaOpeepv+aItCovXHJcbiAgICBjaGVja1F1aWNrV2VhcihoZXJvVHlwZTpIZXJvX1R5cGUsaXNXZWFyOmJvb2xlYW4pOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICBsZXQgaXNPSz1mYWxzZTtcclxuICAgICAgICBmb3IobGV0IGk9RXF1aXBUeXBlLld1UWk7IGk8RXF1aXBUeXBlLk51bTsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/lvZPliY3oo4XlpIfnmoQgIFxyXG4gICAgICAgICAgICBsZXQgd2VhcklkPUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0V2VhckVxdWlwbWVudChoZXJvVHlwZSxpKTtcclxuICAgICAgICAgICAgbGV0IGVhbT1FcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgICAgIGxldCBlcXVpcExpc3Q9UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRFcXVpcG1lbnRMaXN0KGkpO1xyXG4gICAgICAgICAgICBpZih3ZWFySWQhPTApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8v6I635Y+W56m/5oi06KOF5aSH55qE562J57qnXHJcbiAgICAgICAgICAgICAgICBsZXQgd2VhckxldmVsPWVhbS5nZXRTdGFnZSh3ZWFySWQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxlbj1lcXVpcExpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBuPTA7IG48bGVuOyBuKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVxdWlwSW5mbz1lcXVpcExpc3Rbbl07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxldmVsPWVhbS5nZXRTdGFnZShlcXVpcEluZm8uZXF1aXBfaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYobGV2ZWw+d2VhckxldmVsKVxyXG4gICAgICAgICAgICAgICAgICAgIHsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/msqHmnInooqvlhbbku5bkurrnqb/miLTov4dcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG51bT1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEVxdWlwbWVudFJlbWFpbk51bShlcXVpcEluZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihudW0+MCl7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXNXZWFyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFdlYXJFcXVpcG1lbnQoaGVyb1R5cGUsZXF1aXBJbmZvLmVxdWlwX2lkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc09LPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGVuPWVxdWlwTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBpZihsZW4+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBuPTA7IG48bGVuOyBuKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXF1aXBJbmZvPWVxdWlwTGlzdFtuXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/msqHmnInooqvlhbbku5bkurrnqb/miLTov4dcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG51bT1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEVxdWlwbWVudFJlbWFpbk51bShlcXVpcEluZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihudW0+MCl7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXNXZWFyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFdlYXJFcXVpcG1lbnQoaGVyb1R5cGUsZXF1aXBJbmZvLmVxdWlwX2lkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc09LPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpc1dlYXImJmlzT0spe1xyXG4gICAgICAgICAgICBFdmVudE1hbmFnZXIucG9zdEFzc2V0c0V2ZW50KEFzc2V0c0V2ZW50VHlwZS5FUVVJUF9XRUFSX1VOTE9BRCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc09LO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuajgOafpeaYr+WQpuWPr+S7peijheWkh+acgOWlveeahOijheWkhyxpc1dlYXLvvJrmmK/lkKbnm7TmjqXnqb/miLQqL1xyXG4gICAgY2hlY2tXZWFyKGhlcm9UeXBlOkhlcm9fVHlwZSx0eXBlOkVxdWlwVHlwZSk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIGxldCBpc09LPWZhbHNlO1xyXG4gICAgICAgIC8v5b2T5YmN6KOF5aSH55qEICBcclxuICAgICAgICBsZXQgd2VhcklkPUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0V2VhckVxdWlwbWVudChoZXJvVHlwZSx0eXBlKTtcclxuICAgICAgICBsZXQgZWFtPUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBpZih3ZWFySWQhPTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+iOt+WPluepv+aItOijheWkh+eahOetiee6p1xyXG4gICAgICAgICAgICBsZXQgd2VhckxldmVsPWVhbS5nZXRTdGFnZSh3ZWFySWQpO1xyXG4gICAgICAgICAgICBsZXQgZXF1aXBMaXN0PVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RXF1aXBtZW50TGlzdCh0eXBlKTtcclxuICAgICAgICAgICAgbGV0IGxlbj1lcXVpcExpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IobGV0IG49MDsgbjxsZW47IG4rKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IGVxdWlwSW5mbz1lcXVpcExpc3Rbbl07XHJcbiAgICAgICAgICAgICAgICBsZXQgbGV2ZWw9ZWFtLmdldFN0YWdlKGVxdWlwSW5mby5lcXVpcF9pZClcclxuICAgICAgICAgICAgICAgIGlmKGxldmVsPndlYXJMZXZlbClcclxuICAgICAgICAgICAgICAgIHsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvL+ayoeacieiiq+WFtuS7luS6uuepv+aItOi/h1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBudW09SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRFcXVpcG1lbnRSZW1haW5OdW0oZXF1aXBJbmZvKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihudW0+MCl7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzT0s9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBlcXVpcExpc3Q9UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRFcXVpcG1lbnRMaXN0KHR5cGUpO1xyXG4gICAgICAgICAgICBsZXQgbGVuPWVxdWlwTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmKGxlbj4wKXtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgbj0wOyBuPGxlbjsgbisrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlcXVpcEluZm89ZXF1aXBMaXN0W25dO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5rKh5pyJ6KKr5YW25LuW5Lq656m/5oi06L+HXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG51bT1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEVxdWlwbWVudFJlbWFpbk51bShlcXVpcEluZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG51bT4wKXsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNPSz10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlzT0s7XHJcbiAgICB9XHJcblxyXG4gICAgLyogKuajgOafpeaYr+WQpuWPr+S7peS4gOmUruiEseijhSovXHJcbiAgICBjaGVja1F1aWNrVW5sb2FkKGhlcm9UeXBlOkhlcm9fVHlwZSxpc1VubG9hZDpib29sZWFuKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGlzT0s9ZmFsc2U7XHJcbiAgICAgICAgZm9yKGxldCBpPUVxdWlwVHlwZS5XdVFpOyBpPEVxdWlwVHlwZS5OdW07IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5b2T5YmN6KOF5aSH55qEICBcclxuICAgICAgICAgICAgbGV0IHdlYXJJbmZvPUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0V2VhckVxdWlwbWVudChoZXJvVHlwZSxpKTtcclxuICAgICAgICAgICAgaWYod2VhckluZm8pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKGlzVW5sb2FkKXtcclxuICAgICAgICAgICAgICAgICAgICBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLnVubG9hZFdlYXJFcXVpcG1lbnQoaGVyb1R5cGUsaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNPSz10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaXNVbmxvYWQmJmlzT0spe1xyXG4gICAgICAgICAgICBFdmVudE1hbmFnZXIucG9zdEFzc2V0c0V2ZW50KEFzc2V0c0V2ZW50VHlwZS5FUVVJUF9XRUFSX1VOTE9BRCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc09LO1xyXG4gICAgfVxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0t6KOF5aSH5bqP5YiXaWQtLS0tLS0tLS0tLS0tLVxyXG4gICAgcHVibGljIGdldEVxdWlwU2VxdWVuY2VJZCgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGxldCBudW09dGhpcy5nZXRFcXVpcE51bSgpO1xyXG4gICAgICAgIC8qKuaLvOaOpeaXtumXtOaIsyvoo4XlpIfpgJLlop7mlbAgKi9cclxuICAgICAgICBsZXQgbm93VGltZT1uZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICBsZXQgd2VpU2h1PTE7XHJcbiAgICAgICAgbGV0IG5ld051bT1udW07XHJcbiAgICAgICAgLy/msYLmlbDph4/nmoTkvY3mlbBcclxuICAgICAgICB3aGlsZShNYXRoLmZsb29yKG5ld051bS8xMCk+PTEpe1xyXG4gICAgICAgICAgICB3ZWlTaHUrKztcclxuICAgICAgICAgICAgbmV3TnVtLz0xMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHQxPW5vd1RpbWUudG9TdHJpbmcoKS5zdWJzdHJpbmcod2VpU2h1KTtcclxuICAgICAgICBsZXQgaWQ9cGFyc2VJbnQodDErbnVtKTtcclxuICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRFcXVpcE51bSgpOm51bWJlcntcclxuICAgICAgICBsZXQgbnVtPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SW50KFN0b3JhZ2VLZXkuRXF1aXBOdW0sMSk7XHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkZEVxdWlwTnVtKCl7XHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuRXF1aXBOdW0sdGhpcy5nZXRFcXVpcE51bSgpKzEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzYXZlTWVyZ2VOdW0obnVtKVxyXG4gICAge1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbWVyZ2VfbnVtJyxudW0pO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6KOF5aSH5L2N6I635Y+W6KOF5aSH5ZCN56ewICovXHJcbiAgICBwdWJsaWMgZ2V0RXF1aXBOYW1lKHBvc1R5cGU6bnVtYmVyKTpzdHJpbmd7XHJcbiAgICAgICAgbGV0IHRleHRJZD00MDAxO1xyXG4gICAgICAgIHN3aXRjaChwb3NUeXBlKXtcclxuICAgICAgICAgICAgY2FzZSAxOntcclxuICAgICAgICAgICAgICAgIHRleHRJZD00MDAxO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjp7XHJcbiAgICAgICAgICAgICAgICB0ZXh0SWQ9NDAwMjtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6e1xyXG4gICAgICAgICAgICAgICAgdGV4dElkPTQwMDM7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKHRleHRJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq5oiY5Yqb6I635Y+WKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4gICAgZ2V0RXF1aXBaaGFuTGkoZXF1aXBJZDpudW1iZXIpOm51bWJlcntcclxuICAgICAgICAvLyBsZXQganNvbkF0dHJpYnV0ZT1FcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkVxdWlwbWVudEF0dHJpYnV0ZSh0aGlzLmVxdWlwX2lkKTtcclxuICAgICAgICAvL+ijheWkh+WSjOWuoOeJqe+8muaImOaWl+WKmz0wLjUq55Sf5ZG95YC8KzEwKu+8iOaUu+WHu+WKmyvpmLLlvqHlipvvvIkr77yI5ZG95LitK+mXqumBvyvmmrTlh7sr6Ziy54iG77yJKjI5NS4zK++8iOaatOWHu+WinuW5hSvmmrTlh7vmipfmgKfvvIkqMjUxMDAwXHJcblxyXG4gICAgICAgIGxldCBhdHRyaWJ1dGVzPXRoaXMuZ2V0QXR0cmlidXRlc2FkZGl0aW9uYWwoZXF1aXBJZClcclxuICAgICAgICBsZXQgemhhbmxpPShhdHRyaWJ1dGVzWzJdKkNvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29udmVyc2lvbkZhY3RvcigxKSkrKGF0dHJpYnV0ZXNbMF0qQ29tYmF0RWZmZWN0aXZlbmVzc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb252ZXJzaW9uRmFjdG9yKDIpKSsoYXR0cmlidXRlc1sxXSpDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvbnZlcnNpb25GYWN0b3IoMykpLy8wLjUqanNvbkF0dHJpYnV0ZS5CYXNlSGVhbHRoKzEwLy8qKHRoaXMuZ2V0QXR0KCkranNvbkF0dHJpYnV0ZS5CYXNlRGVmZW5zZSlcclxuICAgICAgICB6aGFubGk9TnVtYmVyKE15VG9vbC5udW1iZXJGb3JtYXQoemhhbmxpLDApKTtcclxuICAgICAgICAvLyAxLuiLsembhOeVjOmdouaImOaWl+WKmz3nlJ/lkb3lgLwq55Sf5ZG95YC857O75pWwK+aUu+WHu+WKmyrmlLvlh7vlipvns7vmlbAr6Ziy5b6h5YqbKumYsuW+oeWKm+ezu+aVsCvlkb3kuK3lgLwq5ZG95Lit57O75pWwK+mXqumBv+WAvCrpl6rpgb/lgLzns7vmlbAr77yI5pq05Ye75YC8LTEwMO+8iSrmmrTlh7vlgLzns7vmlbAr6Ziy5pq05YC8KumYsuaatOWAvOezu+aVsCvvvIjmmrTlh7vlop7luYUtMu+8iSrmmrTlh7vlop7luYXns7vmlbAr5pq05Ye75oqX5oCnKuaatOWHu+aKl+aAp+ezu+aVsFxyXG4gICAgICAgIC8vIDIu6KOF5aSH5oiY5paX5YqbPeeUn+WRveWAvCrnlJ/lkb3lgLzns7vmlbAr5pS75Ye75YqbKuaUu+WHu+WKm+ezu+aVsCvpmLLlvqHlipsq6Ziy5b6h5Yqb57O75pWwXHJcbiAgICAgICAgLy8gMy7mgLvmiJjmlpflips95b2T5YmN5LiK6Zi16Iux6ZuE55qE5oiY5paX5Yqb5oC75ZKMXHJcbiAgICAgICAgcmV0dXJuIHpoYW5saTtcclxuICAgIH1cclxuICAgIC8qKuiOt+W+l+ijheWkh+WxnuaAp+WKoOS4iumineWkluWxnuaAp+WAvCAgICBcclxuICAgICAqIOaUu+WHu+WKmyAwXHJcbiAgICAgKiDpmLLlvqHlipsgMSBcclxuICAgICAqIOeUn+WRveWAvCAyXHJcbiAgICAgKiAqLyAgICBcclxuICAgIGdldEF0dHJpYnV0ZXNhZGRpdGlvbmFsKGVxdWlwSWQ6bnVtYmVyKTpudW1iZXJbXXtcclxuICAgICAgICBsZXQgQXR0cmlidXRlcz10aGlzLmdldEF0dHJpYnV0ZXMoZXF1aXBJZClcclxuICAgICAgICAvLyBsZXQganNvbkF0dHJpYnV0ZT1FcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkVxdWlwbWVudEF0dHJpYnV0ZSh0aGlzLmVxdWlwX2lkKTtcclxuICAgICAgICAvLyBsZXQgZGRpdGlvbmFsPVswLDAsMCwwLDAsMCwwLDAsMCwwXVxyXG4gICAgICAgIC8vIDHvvJrnlJ/lkb3lgLxcclxuICAgICAgICAvLyAy77ya5pS75Ye75YqbXHJcbiAgICAgICAgLy8gM++8mumYsuW+oeWKm1xyXG4gICAgICAgIC8vIDTvvJrlkb3kuK3lgLxcclxuICAgICAgICAvLyA177ya6Zeq6YG/5YC8XHJcbiAgICAgICAgLy8gNu+8muaatOWHu+WAvFxyXG4gICAgICAgIC8vIDfvvJrpmLLniIblgLxcclxuICAgICAgICAvLyA477ya5pq05Ye75aKe5bmFXHJcbiAgICAgICAgLy8gOe+8muaatOWHu+aKl+aAp1xyXG4gICAgICAgIC8vIDEw77ya6aKd5aSW5pS76YCfXHJcbiAgICAgICAgLy8gbGV0IEJhc2VBdHRhY2s9anNvbkF0dHJpYnV0ZS5CYXNlQXR0YWNrLy/ln7rnoYDmlLvlh7vliptcclxuICAgICAgICAvLyBsZXQgQmFzZURlZmVuc2U9anNvbkF0dHJpYnV0ZS5CYXNlRGVmZW5zZS8v5Z+656GA6Ziy5b6h5YqbXHJcbiAgICAgICAgLy8gbGV0IEJhc2VIZWFsdGg9anNvbkF0dHJpYnV0ZS5CYXNlSGVhbHRoLy/ln7rnoYDnlJ/lkb3lgLxcclxuICAgICAgICAvLyBsZXQgR3Jvd3RoQXR0YWNrPUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRHcm93dGhBdHRhY2sodGhpcy5lcXVpcF9pZCkvL+aIkOmVv+aUu+WHu+WAvFxyXG4gICAgICAgIC8vIGxldCBHcm93dGhEZWZlbnNlPUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRHcm93dGhEZWZlbnNlKHRoaXMuZXF1aXBfaWQpLy/miJDplb/pmLLlvqHliptcclxuICAgICAgICAvLyBsZXQgR3Jvd3RoSGVhbHRoPUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRHcm93dGhIZWFsdGgodGhpcy5lcXVpcF9pZCkvL+aIkOmVv+eUn+WRveWAvFxyXG4gICAgICAgIC8vIGxldCB6aHVhbmdiZWlQb3M9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEVxdWlwbWVudFBvc2l0aW9uKHRoaXMuZXF1aXBfaWQpLy/oo4XlpIfkvY3nva5cclxuICAgICAgICAvLyBmb3IgKGxldCBRdWFsaXR5aW5kZXggPSAxOyBRdWFsaXR5aW5kZXggPCA3OyBRdWFsaXR5aW5kZXgrKykge1xyXG4gICAgICAgIC8vICAgICBsZXQgaWQ9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJRCh6aHVhbmdiZWlQb3MsUXVhbGl0eWluZGV4KVxyXG4gICAgICAgIC8vICAgICBpZihRdWFsaXR5aW5kZXg8PWpzb25BdHRyaWJ1dGUuUXVhbGl0eSl7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgbGVpeD1FcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RXh0cmFBdHRyaWJ1dGVUeXBlKGlkKVxyXG4gICAgICAgIC8vICAgICAgICAgaWYobGVpeD09MSl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgQXR0cmlidXRlc1syXSs9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEV4dHJhQXR0cmlidXRlVmFsdWUoaWQpXHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICBpZihsZWl4PT0yKXtcclxuICAgICAgICAvLyAgICAgICAgICAgICBBdHRyaWJ1dGVzWzBdKz1FcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RXh0cmFBdHRyaWJ1dGVWYWx1ZShpZClcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgIGlmKGxlaXg9PTMpe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIEF0dHJpYnV0ZXNbMV0rPUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRFeHRyYUF0dHJpYnV0ZVZhbHVlKGlkKVxyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIC8v6KOF5aSH5bGe5oCnPeaIkOmVv+WxnuaApyroo4XlpIfnrYnnuqcr6KOF5aSH5Z+656GA5bGe5oCnXHJcbiAgICAgICAgcmV0dXJuIEF0dHJpYnV0ZXNcclxuICAgIH1cclxuICAgIC8qKuiOt+W+l+aAu+aUu+WHu+WKmyAqL1xyXG4gICAgZ2V0QXR0KGVxdWlwSWQ6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IGpzb25BdHRyaWJ1dGU9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25FcXVpcG1lbnRBdHRyaWJ1dGUoZXF1aXBJZCk7XHJcbiAgICAgICAgbGV0IEJhc2VBdHRhY2s9anNvbkF0dHJpYnV0ZS5CYXNlQXR0YWNrLy/ln7rnoYDmlLvlh7vliptcclxuICAgICAgICAvLyBsZXQgR3Jvd3RoQXR0YWNrPUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRHcm93dGhBdHRhY2sodGhpcy5lcXVpcF9pZCkvL+aIkOmVv+aUu+WHu+WAvFxyXG4gICAgICAgIC8vIGxldCB6aHVhbmdiZWlQb3M9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEVxdWlwbWVudFBvc2l0aW9uKHRoaXMuZXF1aXBfaWQpLy/oo4XlpIfkvY3nva5cclxuICAgICAgICAvLyBmb3IgKGxldCBRdWFsaXR5aW5kZXggPSAxOyBRdWFsaXR5aW5kZXggPCA3OyBRdWFsaXR5aW5kZXgrKykge1xyXG4gICAgICAgIC8vICAgICBsZXQgaWQ9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJRCh6aHVhbmdiZWlQb3MsUXVhbGl0eWluZGV4KVxyXG4gICAgICAgIC8vICAgICBpZihRdWFsaXR5aW5kZXg8PWpzb25BdHRyaWJ1dGUuUXVhbGl0eSl7XHJcbiAgICAgICAgLy8gICAgICAgICBHcm93dGhBdHRhY2srPUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRHcm93dGhBdHRhY2soaWQpXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy/oo4XlpIflsZ7mgKc95oiQ6ZW/5bGe5oCnKuijheWkh+etiee6pyvoo4XlpIfln7rnoYDlsZ7mgKdcclxuICAgICAgICBsZXQgYXR0YWNrPU51bWJlcihNeVRvb2wubnVtYmVyRm9ybWF0KEJhc2VBdHRhY2ssMCkpXHJcbiAgICAgICAgcmV0dXJuIGF0dGFja1xyXG4gICAgfVxyXG4gICAgLyoq6I635b6X5oC76Ziy5b6h5YqbICovXHJcbiAgICBnZXREZWZlbnNlKGVxdWlwSWQ6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IGpzb25BdHRyaWJ1dGU9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25FcXVpcG1lbnRBdHRyaWJ1dGUoZXF1aXBJZCk7XHJcbiAgICAgICAgbGV0IEJhc2VEZWZlbnNlPWpzb25BdHRyaWJ1dGUuQmFzZURlZmVuc2UvL+WfuuehgOmYsuW+oeWKm1xyXG4gICAgICAgIC8vIGxldCBHcm93dGhEZWZlbnNlPUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRHcm93dGhEZWZlbnNlKHRoaXMuZXF1aXBfaWQpLy/miJDplb/pmLLlvqHliptcclxuICAgICAgICAvLyBsZXQgemh1YW5nYmVpUG9zPUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRFcXVpcG1lbnRQb3NpdGlvbih0aGlzLmVxdWlwX2lkKS8v6KOF5aSH5L2N572uXHJcbiAgICAgICAgLy8gZm9yIChsZXQgUXVhbGl0eWluZGV4ID0gMTsgUXVhbGl0eWluZGV4IDwgNzsgUXVhbGl0eWluZGV4KyspIHtcclxuICAgICAgICAvLyAgICAgbGV0IGlkPUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SUQoemh1YW5nYmVpUG9zLFF1YWxpdHlpbmRleClcclxuICAgICAgICAvLyAgICAgaWYoUXVhbGl0eWluZGV4PD1qc29uQXR0cmlidXRlLlF1YWxpdHkpe1xyXG4gICAgICAgIC8vICAgICAgICAgR3Jvd3RoRGVmZW5zZSs9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEdyb3d0aERlZmVuc2UoaWQpXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy/oo4XlpIflsZ7mgKc95oiQ6ZW/5bGe5oCnKuijheWkh+etiee6pyvoo4XlpIfln7rnoYDlsZ7mgKdcclxuICAgICAgICBsZXQgYXR0YWNrPU51bWJlcihNeVRvb2wubnVtYmVyRm9ybWF0KEJhc2VEZWZlbnNlLDApKVxyXG4gICAgICAgIHJldHVybiBhdHRhY2tcclxuICAgIH1cclxuICAgIC8qKuiOt+W+l+aAu+eUn+WRveWAvCAqL1xyXG4gICAgZ2V0SGVhbHRoKGVxdWlwSWQ6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IGpzb25BdHRyaWJ1dGU9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25FcXVpcG1lbnRBdHRyaWJ1dGUoZXF1aXBJZCk7XHJcbiAgICAgICAgbGV0IEJhc2VIZWFsdGg9anNvbkF0dHJpYnV0ZS5CYXNlSGVhbHRoLy/ln7rnoYDnlJ/lkb3lgLxcclxuICAgICAgICAvLyBsZXQgR3Jvd3RoSGVhbHRoPUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRHcm93dGhIZWFsdGgodGhpcy5lcXVpcF9pZCkvL+aIkOmVv+eUn+WRveWAvFxyXG4gICAgICAgIC8vIGxldCB6aHVhbmdiZWlQb3M9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEVxdWlwbWVudFBvc2l0aW9uKHRoaXMuZXF1aXBfaWQpLy/oo4XlpIfkvY3nva5cclxuICAgICAgICAvLyBmb3IgKGxldCBRdWFsaXR5aW5kZXggPSAxOyBRdWFsaXR5aW5kZXggPCA3OyBRdWFsaXR5aW5kZXgrKykge1xyXG4gICAgICAgIC8vICAgICBsZXQgaWQ9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJRCh6aHVhbmdiZWlQb3MsUXVhbGl0eWluZGV4KVxyXG4gICAgICAgIC8vICAgICBpZihRdWFsaXR5aW5kZXg8PWpzb25BdHRyaWJ1dGUuUXVhbGl0eSl7XHJcbiAgICAgICAgICAgICAgICAvLyBHcm93dGhIZWFsdGgrPUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRHcm93dGhIZWFsdGgoaWQpXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy/oo4XlpIflsZ7mgKc95oiQ6ZW/5bGe5oCnKuijheWkh+etiee6pyvoo4XlpIfln7rnoYDlsZ7mgKdcclxuICAgICAgICBsZXQgYXR0YWNrPU51bWJlcihNeVRvb2wubnVtYmVyRm9ybWF0KEJhc2VIZWFsdGgsMCkpXHJcbiAgICAgICAgcmV0dXJuIGF0dGFja1xyXG4gICAgfVxyXG4gICAgLyoq6I635b6X6KOF5aSH5bGe5oCnIFxyXG4gICAgICog5pS75Ye75YqbIDBcclxuICAgICAqIOmYsuW+oeWKmyAxIFxyXG4gICAgICog55Sf5ZG95YC8IDJcclxuICAgICAqICovICAgIFxyXG4gICAgZ2V0QXR0cmlidXRlcyhlcXVpcElkOm51bWJlcik6bnVtYmVyW117XHJcbiAgICAgICAgbGV0IGpzb25BdHRyaWJ1dGU9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25FcXVpcG1lbnRBdHRyaWJ1dGUoZXF1aXBJZCk7XHJcbiAgICAgICAgbGV0IEJhc2VBdHRhY2s9anNvbkF0dHJpYnV0ZS5CYXNlQXR0YWNrLy/ln7rnoYDmlLvlh7vliptcclxuICAgICAgICBsZXQgQmFzZURlZmVuc2U9anNvbkF0dHJpYnV0ZS5CYXNlRGVmZW5zZS8v5Z+656GA6Ziy5b6h5YqbXHJcbiAgICAgICAgbGV0IEJhc2VIZWFsdGg9anNvbkF0dHJpYnV0ZS5CYXNlSGVhbHRoLy/ln7rnoYDnlJ/lkb3lgLxcclxuICAgICAgICAvLyBsZXQgR3Jvd3RoQXR0YWNrPUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRHcm93dGhBdHRhY2sodGhpcy5lcXVpcF9pZCkvL+aIkOmVv+aUu+WHu+WAvFxyXG4gICAgICAgIC8vIGxldCBHcm93dGhEZWZlbnNlPUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRHcm93dGhEZWZlbnNlKHRoaXMuZXF1aXBfaWQpLy/miJDplb/pmLLlvqHliptcclxuICAgICAgICAvLyBsZXQgR3Jvd3RoSGVhbHRoPUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRHcm93dGhIZWFsdGgodGhpcy5lcXVpcF9pZCkvL+aIkOmVv+eUn+WRveWAvFxyXG4gICAgICAgIC8vIGxldCB6aHVhbmdiZWlQb3M9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEVxdWlwbWVudFBvc2l0aW9uKHRoaXMuZXF1aXBfaWQpLy/oo4XlpIfkvY3nva5cclxuICAgICAgICAvLyBmb3IgKGxldCBRdWFsaXR5aW5kZXggPSAxOyBRdWFsaXR5aW5kZXggPCA3OyBRdWFsaXR5aW5kZXgrKykge1xyXG4gICAgICAgIC8vICAgICBsZXQgaWQ9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJRCh6aHVhbmdiZWlQb3MsUXVhbGl0eWluZGV4KVxyXG4gICAgICAgIC8vICAgICBpZihRdWFsaXR5aW5kZXg8PWpzb25BdHRyaWJ1dGUuUXVhbGl0eSl7XHJcbiAgICAgICAgLy8gICAgICAgICBHcm93dGhBdHRhY2srPUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRHcm93dGhBdHRhY2soaWQpXHJcbiAgICAgICAgLy8gICAgICAgICBHcm93dGhEZWZlbnNlKz1FcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0R3Jvd3RoRGVmZW5zZShpZClcclxuICAgICAgICAvLyAgICAgICAgIEdyb3d0aEhlYWx0aCs9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEdyb3d0aEhlYWx0aChpZClcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBsZXQgQmFzZUF0dGFja3M9TnVtYmVyKE15VG9vbC5udW1iZXJGb3JtYXQoR3Jvd3RoQXR0YWNrKnRoaXMuZXF1aXBfbGV2ZWwrQmFzZUF0dGFjaywwKSlcclxuICAgICAgICAvLyBsZXQgQmFzZURlZmVuc2VzPU51bWJlcihNeVRvb2wubnVtYmVyRm9ybWF0KEdyb3d0aERlZmVuc2UqdGhpcy5lcXVpcF9sZXZlbCtCYXNlRGVmZW5zZSwwKSlcclxuICAgICAgICAvLyBsZXQgQmFzZUhlYWx0aHM9TnVtYmVyKE15VG9vbC5udW1iZXJGb3JtYXQoR3Jvd3RoSGVhbHRoKnRoaXMuZXF1aXBfbGV2ZWwrQmFzZUhlYWx0aCwwKSlcclxuICAgICAgICAvL+ijheWkh+WxnuaApz3miJDplb/lsZ7mgKcq6KOF5aSH562J57qnK+ijheWkh+WfuuehgOWxnuaAp1xyXG4gICAgICAgIGxldCBCYXNlQXR0YWNrcz1OdW1iZXIoTXlUb29sLm51bWJlckZvcm1hdChCYXNlQXR0YWNrLDApKVxyXG4gICAgICAgIGxldCBCYXNlRGVmZW5zZXM9TnVtYmVyKE15VG9vbC5udW1iZXJGb3JtYXQoQmFzZURlZmVuc2UsMCkpXHJcbiAgICAgICAgbGV0IEJhc2VIZWFsdGhzPU51bWJlcihNeVRvb2wubnVtYmVyRm9ybWF0KEJhc2VIZWFsdGgsMCkpXHJcbiAgICAgICAgbGV0IGF0dGFjaz1bQmFzZUF0dGFja3MsQmFzZURlZmVuc2VzLEJhc2VIZWFsdGhzXVxyXG4gICAgICAgIHJldHVybiBhdHRhY2tcclxuICAgIH1cclxufVxyXG4iXX0=