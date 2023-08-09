"use strict";
cc._RF.push(module, '7e7d2B/l4lHMrmTVFjob6uI', 'HeroBaseInfo');
// Scripts/Hero/Data/HeroBaseInfo.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroBaseInfoManager = exports.JsonHeroBaseInfo = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonHeroBaseInfo = /** @class */ (function () {
    function JsonHeroBaseInfo() {
        /**英雄ID */
        this.Hero_ID = 0;
        /**品质 */
        this.Quality = 0;
        /**最大阶段 */
        this.MaxStage = 0;
        /**最大等级 */
        this.MaxLevel = 0;
        /**技能数量 */
        this.SkillNum = 0;
        /**英雄名称文本 */
        this.NameText_ID = 0;
        /**被动技能名称_1 */
        this.PassiveIntro_1 = 0;
        /**被动技能描述_1 */
        this.PassiveDescription_1 = 0;
        /**被动技能名称_2 */
        this.PassiveIntro_2 = 0;
        /**被动技能描述_2 */
        this.PassiveDescription_2 = 0;
        /**被动技能名称_3 */
        this.PassiveIntro_3 = 0;
        /**被动技能描述_3 */
        this.PassiveDescription_3 = 0;
        /**主动技能名称 */
        this.SkillText_ID = 0;
        /**主动技能描述 */
        this.SkillDescription = 0;
        /**基础攻速 */
        this.BaseSpeed = 0;
        /**基础弹体速度 */
        this.BaseBulletSpeed = 0;
        /**普攻射程 */
        this.AttackRange = 0;
        /**英雄碎片 */
        this.HeroFragment = 0;
        /**解锁碎片数量 */
        this.UnlockFragmentNum = 0;
        /**英雄定位 */
        this.HeroPositioning = 0;
        /**是否可用 */
        this.Available = 0;
        /**初始专武道具ID */
        this.FirstExclusiveWeaponID = 0;
        /**专武碎片道具 */
        this.ExclusiveWeaponFragment = 0;
    }
    return JsonHeroBaseInfo;
}());
exports.JsonHeroBaseInfo = JsonHeroBaseInfo;
var HeroBaseInfoManager = /** @class */ (function () {
    function HeroBaseInfoManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    HeroBaseInfoManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new HeroBaseInfoManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    HeroBaseInfoManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    HeroBaseInfoManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('HeroBaseInfo', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonHeroBaseInfo成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonHeroBaseInfo();
                jsonData = json[i];
                _this.data.set(jsonData.Hero_ID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    HeroBaseInfoManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    HeroBaseInfoManager.prototype.getJsonHeroBaseInfo = function (id) {
        return this.data.get(id);
    };
    /**根据英雄ID获取品质 */
    HeroBaseInfoManager.prototype.getQuality = function (id) {
        return this.data.get(id).Quality;
    };
    /**根据英雄ID获取最大阶段 */
    HeroBaseInfoManager.prototype.getMaxStage = function (id) {
        return this.data.get(id).MaxStage;
    };
    /**根据英雄ID获取最大等级 */
    HeroBaseInfoManager.prototype.getMaxLevel = function (id) {
        return 240;
    };
    /**根据英雄ID获取技能数量 */
    HeroBaseInfoManager.prototype.getSkillNum = function (id) {
        return this.data.get(id).SkillNum;
    };
    /**根据英雄ID获取英雄名称文本 */
    HeroBaseInfoManager.prototype.getNameText_ID = function (id) {
        console.log("idName:" + id);
        if (this.data.get(id) == null) {
            console.log("idName:" + id);
        }
        return this.data.get(id).NameText_ID;
    };
    /**根据英雄ID获取被动技能名称_1 */
    HeroBaseInfoManager.prototype.getPassiveIntro_1 = function (id) {
        return this.data.get(id).PassiveIntro_1;
    };
    /**根据英雄ID获取被动技能描述_1 */
    HeroBaseInfoManager.prototype.getPassiveDescription_1 = function (id) {
        return this.data.get(id).PassiveDescription_1;
    };
    /**根据英雄ID获取被动技能名称_2 */
    HeroBaseInfoManager.prototype.getPassiveIntro_2 = function (id) {
        return this.data.get(id).PassiveIntro_2;
    };
    /**根据英雄ID获取被动技能描述_2 */
    HeroBaseInfoManager.prototype.getPassiveDescription_2 = function (id) {
        return this.data.get(id).PassiveDescription_2;
    };
    /**根据英雄ID获取被动技能名称_3 */
    HeroBaseInfoManager.prototype.getPassiveIntro_3 = function (id) {
        return this.data.get(id).PassiveIntro_3;
    };
    /**根据英雄ID获取被动技能描述_3 */
    HeroBaseInfoManager.prototype.getPassiveDescription_3 = function (id) {
        return this.data.get(id).PassiveDescription_3;
    };
    /**根据英雄ID获取主动技能名称 */
    HeroBaseInfoManager.prototype.getSkillText_ID = function (id) {
        return this.data.get(id).SkillText_ID;
    };
    /**根据英雄ID获取主动技能描述 */
    HeroBaseInfoManager.prototype.getSkillDescription = function (id) {
        return this.data.get(id).SkillDescription;
    };
    /**根据英雄ID获取基础攻速 */
    HeroBaseInfoManager.prototype.getBaseSpeed = function (id) {
        return this.data.get(id).BaseSpeed;
    };
    /**根据英雄ID获取基础弹体速度 */
    HeroBaseInfoManager.prototype.getBaseBulletSpeed = function (id) {
        return this.data.get(id).BaseBulletSpeed;
    };
    /**根据英雄ID获取普攻射程 */
    HeroBaseInfoManager.prototype.getAttackRange = function (id) {
        return this.data.get(id).AttackRange;
    };
    /**根据英雄ID获取英雄碎片 */
    HeroBaseInfoManager.prototype.getHeroFragment = function (id) {
        return this.data.get(id).HeroFragment;
    };
    /**根据英雄ID获取解锁碎片数量 */
    HeroBaseInfoManager.prototype.getUnlockFragmentNum = function (id) {
        return this.data.get(id).UnlockFragmentNum;
    };
    /**根据英雄ID获取英雄定位 */
    HeroBaseInfoManager.prototype.getHeroPositioning = function (id) {
        return this.data.get(id).HeroPositioning;
    };
    /**根据英雄ID获取是否可用 */
    HeroBaseInfoManager.prototype.getAvailable = function (id) {
        return this.data.get(id).Available;
    };
    /**根据英雄ID获取初始专武道具ID */
    HeroBaseInfoManager.prototype.getFirstExclusiveWeaponID = function (id) {
        return this.data.get(id).FirstExclusiveWeaponID;
    };
    /**根据英雄ID获取专武碎片道具 */
    HeroBaseInfoManager.prototype.getExclusiveWeaponFragment = function (id) {
        return this.data.get(id).ExclusiveWeaponFragment;
    };
    /** 静态方法，获取最大的 英雄ID*/
    HeroBaseInfoManager.getMaxHero_ID = function () {
        return 12;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    HeroBaseInfoManager.prototype.getData = function () {
        return this.data;
    };
    HeroBaseInfoManager.prototype.getArrayData = function () {
        var info = [];
        this.data.forEach(function (v, k) {
            info.push(v);
        });
        return info;
    };
    HeroBaseInfoManager._instance = null;
    return HeroBaseInfoManager;
}());
exports.HeroBaseInfoManager = HeroBaseInfoManager;

cc._RF.pop();