
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
        return this.data.get(id).MaxLevel;
    };
    /**根据英雄ID获取技能数量 */
    HeroBaseInfoManager.prototype.getSkillNum = function (id) {
        return this.data.get(id).SkillNum;
    };
    /**根据英雄ID获取英雄名称文本 */
    HeroBaseInfoManager.prototype.getNameText_ID = function (id) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcRGF0YVxcSGVyb0Jhc2VJbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUF3RDtBQUV4RDtJQUFBO1FBQ0ksVUFBVTtRQUNILFlBQU8sR0FBVSxDQUFDLENBQUU7UUFDM0IsUUFBUTtRQUNELFlBQU8sR0FBVSxDQUFDLENBQUU7UUFDM0IsVUFBVTtRQUNILGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsVUFBVTtRQUNILGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsVUFBVTtRQUNILGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsWUFBWTtRQUNMLGdCQUFXLEdBQVUsQ0FBQyxDQUFFO1FBQy9CLGNBQWM7UUFDUCxtQkFBYyxHQUFVLENBQUMsQ0FBRTtRQUNsQyxjQUFjO1FBQ1AseUJBQW9CLEdBQVUsQ0FBQyxDQUFFO1FBQ3hDLGNBQWM7UUFDUCxtQkFBYyxHQUFVLENBQUMsQ0FBRTtRQUNsQyxjQUFjO1FBQ1AseUJBQW9CLEdBQVUsQ0FBQyxDQUFFO1FBQ3hDLGNBQWM7UUFDUCxtQkFBYyxHQUFVLENBQUMsQ0FBRTtRQUNsQyxjQUFjO1FBQ1AseUJBQW9CLEdBQVUsQ0FBQyxDQUFFO1FBQ3hDLFlBQVk7UUFDTCxpQkFBWSxHQUFVLENBQUMsQ0FBRTtRQUNoQyxZQUFZO1FBQ0wscUJBQWdCLEdBQVUsQ0FBQyxDQUFFO1FBQ3BDLFVBQVU7UUFDSCxjQUFTLEdBQVUsQ0FBQyxDQUFFO1FBQzdCLFlBQVk7UUFDTCxvQkFBZSxHQUFVLENBQUMsQ0FBRTtRQUNuQyxVQUFVO1FBQ0gsZ0JBQVcsR0FBVSxDQUFDLENBQUU7UUFDL0IsVUFBVTtRQUNILGlCQUFZLEdBQVUsQ0FBQyxDQUFFO1FBQ2hDLFlBQVk7UUFDTCxzQkFBaUIsR0FBVSxDQUFDLENBQUU7UUFDckMsVUFBVTtRQUNILG9CQUFlLEdBQVUsQ0FBQyxDQUFFO1FBQ25DLFVBQVU7UUFDSCxjQUFTLEdBQVUs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a0JBQWtCO0lBQ1gsMENBQVksR0FBbkIsVUFBb0IsRUFBUztRQUN6QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUN2QyxDQUFDO0lBQ0Qsc0JBQXNCO0lBQ2YsdURBQXlCLEdBQWhDLFVBQWlDLEVBQVM7UUFDdEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQztJQUNwRCxDQUFDO0lBQ0Qsb0JBQW9CO0lBQ2Isd0RBQTBCLEdBQWpDLFVBQWtDLEVBQVM7UUFDdkMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQztJQUNyRCxDQUFDO0lBRUQscUJBQXFCO0lBQ1AsaUNBQWEsR0FBM0I7UUFDSSxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRCx5QkFBeUI7SUFHekIscUNBQU8sR0FBUDtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsMENBQVksR0FBWjtRQUNJLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQyxFQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUF4SmMsNkJBQVMsR0FBd0IsSUFBSSxDQUFDO0lBeUp6RCwwQkFBQztDQTFKRCxBQTBKQyxJQUFBO0FBMUpZLGtEQUFtQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvYWRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0xvYWRpbmcvTG9hZE1hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uSGVyb0Jhc2VJbmZvIHtcclxuICAgIC8qKuiLsembhElEICovXHJcbiAgICBwdWJsaWMgSGVyb19JRDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWTgei0qCAqL1xyXG4gICAgcHVibGljIFF1YWxpdHk6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmnIDlpKfpmLbmrrUgKi9cclxuICAgIHB1YmxpYyBNYXhTdGFnZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuacgOWkp+etiee6pyAqL1xyXG4gICAgcHVibGljIE1heExldmVsOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5oqA6IO95pWw6YePICovXHJcbiAgICBwdWJsaWMgU2tpbGxOdW06bnVtYmVyID0gMCA7XHJcbiAgICAvKiroi7Hpm4TlkI3np7DmlofmnKwgKi9cclxuICAgIHB1YmxpYyBOYW1lVGV4dF9JRDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuiiq+WKqOaKgOiDveWQjeensF8xICovXHJcbiAgICBwdWJsaWMgUGFzc2l2ZUludHJvXzE6bnVtYmVyID0gMCA7XHJcbiAgICAvKirooqvliqjmioDog73mj4/ov7BfMSAqL1xyXG4gICAgcHVibGljIFBhc3NpdmVEZXNjcmlwdGlvbl8xOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6KKr5Yqo5oqA6IO95ZCN56ewXzIgKi9cclxuICAgIHB1YmxpYyBQYXNzaXZlSW50cm9fMjpudW1iZXIgPSAwIDtcclxuICAgIC8qKuiiq+WKqOaKgOiDveaPj+i/sF8yICovXHJcbiAgICBwdWJsaWMgUGFzc2l2ZURlc2NyaXB0aW9uXzI6bnVtYmVyID0gMCA7XHJcbiAgICAvKirooqvliqjmioDog73lkI3np7BfMyAqL1xyXG4gICAgcHVibGljIFBhc3NpdmVJbnRyb18zOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6KKr5Yqo5oqA6IO95o+P6L+wXzMgKi9cclxuICAgIHB1YmxpYyBQYXNzaXZlRGVzY3JpcHRpb25fMzpudW1iZXIgPSAwIDtcclxuICAgIC8qKuS4u+WKqOaKgOiDveWQjeensCAqL1xyXG4gICAgcHVibGljIFNraWxsVGV4dF9JRDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuS4u+WKqOaKgOiDveaPj+i/sCAqL1xyXG4gICAgcHVibGljIFNraWxsRGVzY3JpcHRpb246bnVtYmVyID0gMCA7XHJcbiAgICAvKirln7rnoYDmlLvpgJ8gKi9cclxuICAgIHB1YmxpYyBCYXNlU3BlZWQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirln7rnoYDlvLnkvZPpgJ/luqYgKi9cclxuICAgIHB1YmxpYyBCYXNlQnVsbGV0U3BlZWQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmma7mlLvlsITnqIsgKi9cclxuICAgIHB1YmxpYyBBdHRhY2tSYW5nZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuiLsembhOeijueJhyAqL1xyXG4gICAgcHVibGljIEhlcm9GcmFnbWVudDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuino+mUgeeijueJh+aVsOmHjyAqL1xyXG4gICAgcHVibGljIFVubG9ja0ZyYWdtZW50TnVtOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6Iux6ZuE5a6a5L2NICovXHJcbiAgICBwdWJsaWMgSGVyb1Bvc2l0aW9uaW5nOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5piv5ZCm5Y+v55SoICovXHJcbiAgICBwdWJsaWMgQXZhaWxhYmxlOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5Yid5aeL5LiT5q2m6YGT5YW3SUQgKi9cclxuICAgIHB1YmxpYyBGaXJzdEV4Y2x1c2l2ZVdlYXBvbklEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5LiT5q2m56KO54mH6YGT5YW3ICovXHJcbiAgICBwdWJsaWMgRXhjbHVzaXZlV2VhcG9uRnJhZ21lbnQ6bnVtYmVyID0gMCA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBIZXJvQmFzZUluZm9NYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogSGVyb0Jhc2VJbmZvTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25IZXJvQmFzZUluZm8+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkhlcm9CYXNlSW5mb01hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBIZXJvQmFzZUluZm9NYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ0hlcm9CYXNlSW5mbycsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25IZXJvQmFzZUluZm/miJDlip8nKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhPW5ldyBNYXAoKTtcclxuICAgICAgICAgICAgbGV0IGpzb249YXNzZXRzLmpzb247XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGpzb24ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25EYXRhPW5ldyBKc29uSGVyb0Jhc2VJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5IZXJvX0lELGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uSGVyb0Jhc2VJbmZvKGlkOm51bWJlcik6SnNvbkhlcm9CYXNlSW5mbyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6Iux6ZuESUTojrflj5blk4HotKggKi9cclxuICAgIHB1YmxpYyBnZXRRdWFsaXR5KGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlF1YWxpdHk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7oi7Hpm4RJROiOt+WPluacgOWkp+mYtuautSAqL1xyXG4gICAgcHVibGljIGdldE1heFN0YWdlKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLk1heFN0YWdlO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6Iux6ZuESUTojrflj5bmnIDlpKfnrYnnuqcgKi9cclxuICAgIHB1YmxpYyBnZXRNYXhMZXZlbChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5NYXhMZXZlbDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruiLsembhElE6I635Y+W5oqA6IO95pWw6YePICovXHJcbiAgICBwdWJsaWMgZ2V0U2tpbGxOdW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU2tpbGxOdW07XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7oi7Hpm4RJROiOt+WPluiLsembhOWQjeensOaWh+acrCAqL1xyXG4gICAgcHVibGljIGdldE5hbWVUZXh0X0lEKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLk5hbWVUZXh0X0lEO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6Iux6ZuESUTojrflj5booqvliqjmioDog73lkI3np7BfMSAqL1xyXG4gICAgcHVibGljIGdldFBhc3NpdmVJbnRyb18xKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlBhc3NpdmVJbnRyb18xO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6Iux6ZuESUTojrflj5booqvliqjmioDog73mj4/ov7BfMSAqL1xyXG4gICAgcHVibGljIGdldFBhc3NpdmVEZXNjcmlwdGlvbl8xKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlBhc3NpdmVEZXNjcmlwdGlvbl8xO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6Iux6ZuESUTojrflj5booqvliqjmioDog73lkI3np7BfMiAqL1xyXG4gICAgcHVibGljIGdldFBhc3NpdmVJbnRyb18yKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlBhc3NpdmVJbnRyb18yO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6Iux6ZuESUTojrflj5booqvliqjmioDog73mj4/ov7BfMiAqL1xyXG4gICAgcHVibGljIGdldFBhc3NpdmVEZXNjcmlwdGlvbl8yKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlBhc3NpdmVEZXNjcmlwdGlvbl8yO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6Iux6ZuESUTojrflj5booqvliqjmioDog73lkI3np7BfMyAqL1xyXG4gICAgcHVibGljIGdldFBhc3NpdmVJbnRyb18zKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlBhc3NpdmVJbnRyb18zO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6Iux6ZuESUTojrflj5booqvliqjmioDog73mj4/ov7BfMyAqL1xyXG4gICAgcHVibGljIGdldFBhc3NpdmVEZXNjcmlwdGlvbl8zKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlBhc3NpdmVEZXNjcmlwdGlvbl8zO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6Iux6ZuESUTojrflj5bkuLvliqjmioDog73lkI3np7AgKi9cclxuICAgIHB1YmxpYyBnZXRTa2lsbFRleHRfSUQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU2tpbGxUZXh0X0lEO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6Iux6ZuESUTojrflj5bkuLvliqjmioDog73mj4/ov7AgKi9cclxuICAgIHB1YmxpYyBnZXRTa2lsbERlc2NyaXB0aW9uKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlNraWxsRGVzY3JpcHRpb247XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7oi7Hpm4RJROiOt+WPluWfuuehgOaUu+mAnyAqL1xyXG4gICAgcHVibGljIGdldEJhc2VTcGVlZChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5CYXNlU3BlZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7oi7Hpm4RJROiOt+WPluWfuuehgOW8ueS9k+mAn+W6piAqL1xyXG4gICAgcHVibGljIGdldEJhc2VCdWxsZXRTcGVlZChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5CYXNlQnVsbGV0U3BlZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7oi7Hpm4RJROiOt+WPluaZruaUu+WwhOeoiyAqL1xyXG4gICAgcHVibGljIGdldEF0dGFja1JhbmdlKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkF0dGFja1JhbmdlO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6Iux6ZuESUTojrflj5boi7Hpm4Tnoo7niYcgKi9cclxuICAgIHB1YmxpYyBnZXRIZXJvRnJhZ21lbnQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuSGVyb0ZyYWdtZW50O1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6Iux6ZuESUTojrflj5bop6PplIHnoo7niYfmlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXRVbmxvY2tGcmFnbWVudE51bShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5VbmxvY2tGcmFnbWVudE51bTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruiLsembhElE6I635Y+W6Iux6ZuE5a6a5L2NICovXHJcbiAgICBwdWJsaWMgZ2V0SGVyb1Bvc2l0aW9uaW5nKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkhlcm9Qb3NpdGlvbmluZztcclxuICAgIH1cclxuICAgIC8qKuagueaNruiLsembhElE6I635Y+W5piv5ZCm5Y+v55SoICovXHJcbiAgICBwdWJsaWMgZ2V0QXZhaWxhYmxlKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkF2YWlsYWJsZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruiLsembhElE6I635Y+W5Yid5aeL5LiT5q2m6YGT5YW3SUQgKi9cclxuICAgIHB1YmxpYyBnZXRGaXJzdEV4Y2x1c2l2ZVdlYXBvbklEKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkZpcnN0RXhjbHVzaXZlV2VhcG9uSUQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7oi7Hpm4RJROiOt+WPluS4k+atpueijueJh+mBk+WFtyAqL1xyXG4gICAgcHVibGljIGdldEV4Y2x1c2l2ZVdlYXBvbkZyYWdtZW50KGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkV4Y2x1c2l2ZVdlYXBvbkZyYWdtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg6Iux6ZuESUQqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhIZXJvX0lEKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gMTI7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG5cclxuICAgIGdldERhdGEoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFycmF5RGF0YSgpOkpzb25IZXJvQmFzZUluZm9bXXtcclxuICAgICAgICBsZXQgaW5mbyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgIGluZm8ucHVzaCh2KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gaW5mbztcclxuICAgIH1cclxufVxyXG4iXX0=