"use strict";
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