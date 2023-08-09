
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Data/HeroBaseInfo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcRGF0YVxcSGVyb0Jhc2VJbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUF3RDtBQUV4RDtJQUFBO1FBQ0ksVUFBVTtRQUNILFlBQU8sR0FBVSxDQUFDLENBQUU7UUFDM0IsUUFBUTtRQUNELFlBQU8sR0FBVSxDQUFDLENBQUU7UUFDM0IsVUFBVTtRQUNILGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsVUFBVTtRQUNILGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsVUFBVTtRQUNILGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsWUFBWTtRQUNMLGdCQUFXLEdBQVUsQ0FBQyxDQUFFO1FBQy9CLGNBQWM7UUFDUCxtQkFBYyxHQUFVLENBQUMsQ0FBRTtRQUNsQyxjQUFjO1FBQ1AseUJBQW9CLEdBQVUsQ0FBQyxDQUFFO1FBQ3hDLGNBQWM7UUFDUCxtQkFBYyxHQUFVLENBQUMsQ0FBRTtRQUNsQyxjQUFjO1FBQ1AseUJBQW9CLEdBQVUsQ0FBQyxDQUFFO1FBQ3hDLGNBQWM7UUFDUCxtQkFBYyxHQUFVLENBQUMsQ0FBRTtRQUNsQyxjQUFjO1FBQ1AseUJBQW9CLEdBQVUsQ0FBQyxDQUFFO1FBQ3hDLFlBQVk7UUFDTCxpQkFBWSxHQUFVLENBQUMsQ0FBRTtRQUNoQyxZQUFZO1FBQ0wscUJBQWdCLEdBQVUsQ0FBQyxDQUFFO1FBQ3BDLFVBQVU7UUFDSCxjQUFTLEdBQVUsQ0FBQyxDQUFFO1FBQzdCLFlBQVk7UUFDTCxvQkFBZSxHQUFVLENBQUMsQ0FBRTtRQUNuQyxVQUFVO1FBQ0gsZ0JBQVcsR0FBVSxDQUFDLENBQUU7UUFDL0IsVUFBVTtRQUNILGlCQUFZLEdBQVUsQ0FBQyxDQUFFO1FBQ2hDLFlBQVk7UUFDTCxzQkFBaUIsR0FBVSxDQUFDLENBQUU7UUFDckMsVUFBVTtRQUNILG9CQUFlLEdBQVUsQ0FBQyxDQUFFO1FBQ25DLFVBQVU7UUFDSCxjQUFTLEdBQVUs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LCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSnNvbkhlcm9CYXNlSW5mbyB7XHJcbiAgICAvKiroi7Hpm4RJRCAqL1xyXG4gICAgcHVibGljIEhlcm9fSUQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlk4HotKggKi9cclxuICAgIHB1YmxpYyBRdWFsaXR5Om51bWJlciA9IDAgO1xyXG4gICAgLyoq5pyA5aSn6Zi25q61ICovXHJcbiAgICBwdWJsaWMgTWF4U3RhZ2U6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmnIDlpKfnrYnnuqcgKi9cclxuICAgIHB1YmxpYyBNYXhMZXZlbDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaKgOiDveaVsOmHjyAqL1xyXG4gICAgcHVibGljIFNraWxsTnVtOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6Iux6ZuE5ZCN56ew5paH5pysICovXHJcbiAgICBwdWJsaWMgTmFtZVRleHRfSUQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirooqvliqjmioDog73lkI3np7BfMSAqL1xyXG4gICAgcHVibGljIFBhc3NpdmVJbnRyb18xOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6KKr5Yqo5oqA6IO95o+P6L+wXzEgKi9cclxuICAgIHB1YmxpYyBQYXNzaXZlRGVzY3JpcHRpb25fMTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuiiq+WKqOaKgOiDveWQjeensF8yICovXHJcbiAgICBwdWJsaWMgUGFzc2l2ZUludHJvXzI6bnVtYmVyID0gMCA7XHJcbiAgICAvKirooqvliqjmioDog73mj4/ov7BfMiAqL1xyXG4gICAgcHVibGljIFBhc3NpdmVEZXNjcmlwdGlvbl8yOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6KKr5Yqo5oqA6IO95ZCN56ewXzMgKi9cclxuICAgIHB1YmxpYyBQYXNzaXZlSW50cm9fMzpudW1iZXIgPSAwIDtcclxuICAgIC8qKuiiq+WKqOaKgOiDveaPj+i/sF8zICovXHJcbiAgICBwdWJsaWMgUGFzc2l2ZURlc2NyaXB0aW9uXzM6bnVtYmVyID0gMCA7XHJcbiAgICAvKirkuLvliqjmioDog73lkI3np7AgKi9cclxuICAgIHB1YmxpYyBTa2lsbFRleHRfSUQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirkuLvliqjmioDog73mj4/ov7AgKi9cclxuICAgIHB1YmxpYyBTa2lsbERlc2NyaXB0aW9uOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5Z+656GA5pS76YCfICovXHJcbiAgICBwdWJsaWMgQmFzZVNwZWVkOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5Z+656GA5by55L2T6YCf5bqmICovXHJcbiAgICBwdWJsaWMgQmFzZUJ1bGxldFNwZWVkOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5pmu5pS75bCE56iLICovXHJcbiAgICBwdWJsaWMgQXR0YWNrUmFuZ2U6bnVtYmVyID0gMCA7XHJcbiAgICAvKiroi7Hpm4Tnoo7niYcgKi9cclxuICAgIHB1YmxpYyBIZXJvRnJhZ21lbnQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirop6PplIHnoo7niYfmlbDph48gKi9cclxuICAgIHB1YmxpYyBVbmxvY2tGcmFnbWVudE51bTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuiLsembhOWumuS9jSAqL1xyXG4gICAgcHVibGljIEhlcm9Qb3NpdGlvbmluZzpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaYr+WQpuWPr+eUqCAqL1xyXG4gICAgcHVibGljIEF2YWlsYWJsZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWIneWni+S4k+atpumBk+WFt0lEICovXHJcbiAgICBwdWJsaWMgRmlyc3RFeGNsdXNpdmVXZWFwb25JRDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuS4k+atpueijueJh+mBk+WFtyAqL1xyXG4gICAgcHVibGljIEV4Y2x1c2l2ZVdlYXBvbkZyYWdtZW50Om51bWJlciA9IDAgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSGVyb0Jhc2VJbmZvTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEhlcm9CYXNlSW5mb01hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6TWFwPG51bWJlcixKc29uSGVyb0Jhc2VJbmZvPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpIZXJvQmFzZUluZm9NYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgSGVyb0Jhc2VJbmZvTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRKc29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liqDovb1qc29uXHJcbiAgICBwcml2YXRlIGxvYWRKc29uKCkge1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmxvYWRKc29uKCdIZXJvQmFzZUluZm8nLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uSGVyb0Jhc2VJbmZv5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvbkhlcm9CYXNlSW5mbygpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEuSGVyb19JRCxqc29uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc19sb2FkX2NvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9veaYr+WQpuWujOaIkCAqL1xyXG4gICAgcHVibGljIGdldElzTG9hZENvbXBsZXRlZCgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzX2xvYWRfY29tcGxldGVkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uaWTlj7fojrflj5ZKc29u55qE5ZCE56eN5pWw5o2uICovXHJcbiAgICBwdWJsaWMgZ2V0SnNvbkhlcm9CYXNlSW5mbyhpZDpudW1iZXIpOkpzb25IZXJvQmFzZUluZm8ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruiLsembhElE6I635Y+W5ZOB6LSoICovXHJcbiAgICBwdWJsaWMgZ2V0UXVhbGl0eShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5RdWFsaXR5O1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6Iux6ZuESUTojrflj5bmnIDlpKfpmLbmrrUgKi9cclxuICAgIHB1YmxpYyBnZXRNYXhTdGFnZShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5NYXhTdGFnZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruiLsembhElE6I635Y+W5pyA5aSn562J57qnICovXHJcbiAgICBwdWJsaWMgZ2V0TWF4TGV2ZWwoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gMjQwO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6Iux6ZuESUTojrflj5bmioDog73mlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXRTa2lsbE51bShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Ta2lsbE51bTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruiLsembhElE6I635Y+W6Iux6ZuE5ZCN56ew5paH5pysICovXHJcbiAgICBwdWJsaWMgZ2V0TmFtZVRleHRfSUQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImlkTmFtZTpcIitpZCk7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhLmdldChpZCk9PW51bGwpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlkTmFtZTpcIitpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5OYW1lVGV4dF9JRDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruiLsembhElE6I635Y+W6KKr5Yqo5oqA6IO95ZCN56ewXzEgKi9cclxuICAgIHB1YmxpYyBnZXRQYXNzaXZlSW50cm9fMShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5QYXNzaXZlSW50cm9fMTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruiLsembhElE6I635Y+W6KKr5Yqo5oqA6IO95o+P6L+wXzEgKi9cclxuICAgIHB1YmxpYyBnZXRQYXNzaXZlRGVzY3JpcHRpb25fMShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5QYXNzaXZlRGVzY3JpcHRpb25fMTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruiLsembhElE6I635Y+W6KKr5Yqo5oqA6IO95ZCN56ewXzIgKi9cclxuICAgIHB1YmxpYyBnZXRQYXNzaXZlSW50cm9fMihpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5QYXNzaXZlSW50cm9fMjtcclxuICAgIH1cclxuICAgIC8qKuagueaNruiLsembhElE6I635Y+W6KKr5Yqo5oqA6IO95o+P6L+wXzIgKi9cclxuICAgIHB1YmxpYyBnZXRQYXNzaXZlRGVzY3JpcHRpb25fMihpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5QYXNzaXZlRGVzY3JpcHRpb25fMjtcclxuICAgIH1cclxuICAgIC8qKuagueaNruiLsembhElE6I635Y+W6KKr5Yqo5oqA6IO95ZCN56ewXzMgKi9cclxuICAgIHB1YmxpYyBnZXRQYXNzaXZlSW50cm9fMyhpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5QYXNzaXZlSW50cm9fMztcclxuICAgIH1cclxuICAgIC8qKuagueaNruiLsembhElE6I635Y+W6KKr5Yqo5oqA6IO95o+P6L+wXzMgKi9cclxuICAgIHB1YmxpYyBnZXRQYXNzaXZlRGVzY3JpcHRpb25fMyhpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5QYXNzaXZlRGVzY3JpcHRpb25fMztcclxuICAgIH1cclxuICAgIC8qKuagueaNruiLsembhElE6I635Y+W5Li75Yqo5oqA6IO95ZCN56ewICovXHJcbiAgICBwdWJsaWMgZ2V0U2tpbGxUZXh0X0lEKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlNraWxsVGV4dF9JRDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruiLsembhElE6I635Y+W5Li75Yqo5oqA6IO95o+P6L+wICovXHJcbiAgICBwdWJsaWMgZ2V0U2tpbGxEZXNjcmlwdGlvbihpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Ta2lsbERlc2NyaXB0aW9uO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6Iux6ZuESUTojrflj5bln7rnoYDmlLvpgJ8gKi9cclxuICAgIHB1YmxpYyBnZXRCYXNlU3BlZWQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuQmFzZVNwZWVkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6Iux6ZuESUTojrflj5bln7rnoYDlvLnkvZPpgJ/luqYgKi9cclxuICAgIHB1YmxpYyBnZXRCYXNlQnVsbGV0U3BlZWQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuQmFzZUJ1bGxldFNwZWVkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6Iux6ZuESUTojrflj5bmma7mlLvlsITnqIsgKi9cclxuICAgIHB1YmxpYyBnZXRBdHRhY2tSYW5nZShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5BdHRhY2tSYW5nZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruiLsembhElE6I635Y+W6Iux6ZuE56KO54mHICovXHJcbiAgICBwdWJsaWMgZ2V0SGVyb0ZyYWdtZW50KGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkhlcm9GcmFnbWVudDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruiLsembhElE6I635Y+W6Kej6ZSB56KO54mH5pWw6YePICovXHJcbiAgICBwdWJsaWMgZ2V0VW5sb2NrRnJhZ21lbnROdW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuVW5sb2NrRnJhZ21lbnROdW07XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7oi7Hpm4RJROiOt+WPluiLsembhOWumuS9jSAqL1xyXG4gICAgcHVibGljIGdldEhlcm9Qb3NpdGlvbmluZyhpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5IZXJvUG9zaXRpb25pbmc7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7oi7Hpm4RJROiOt+WPluaYr+WQpuWPr+eUqCAqL1xyXG4gICAgcHVibGljIGdldEF2YWlsYWJsZShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5BdmFpbGFibGU7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7oi7Hpm4RJROiOt+WPluWIneWni+S4k+atpumBk+WFt0lEICovXHJcbiAgICBwdWJsaWMgZ2V0Rmlyc3RFeGNsdXNpdmVXZWFwb25JRChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5GaXJzdEV4Y2x1c2l2ZVdlYXBvbklEO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6Iux6ZuESUTojrflj5bkuJPmrabnoo7niYfpgZPlhbcgKi9cclxuICAgIHB1YmxpYyBnZXRFeGNsdXNpdmVXZWFwb25GcmFnbWVudChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5FeGNsdXNpdmVXZWFwb25GcmFnbWVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6Z2Z5oCB5pa55rOV77yM6I635Y+W5pyA5aSn55qEIOiLsembhElEKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4SGVyb19JRCgpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDEyO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG5cclxuXHJcbiAgICBnZXREYXRhKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBcnJheURhdGEoKTpKc29uSGVyb0Jhc2VJbmZvW117XHJcbiAgICAgICAgbGV0IGluZm8gPSBbXTtcclxuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICBpbmZvLnB1c2godik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGluZm87XHJcbiAgICB9XHJcbn1cclxuIl19