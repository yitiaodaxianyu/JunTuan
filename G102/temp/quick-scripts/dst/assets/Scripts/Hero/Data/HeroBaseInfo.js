
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcRGF0YVxcSGVyb0Jhc2VJbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUF3RDtBQUV4RDtJQUFBO1FBQ0ksVUFBVTtRQUNILFlBQU8sR0FBVSxDQUFDLENBQUU7UUFDM0IsUUFBUTtRQUNELFlBQU8sR0FBVSxDQUFDLENBQUU7UUFDM0IsVUFBVTtRQUNILGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsVUFBVTtRQUNILGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsVUFBVTtRQUNILGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsWUFBWTtRQUNMLGdCQUFXLEdBQVUsQ0FBQyxDQUFFO1FBQy9CLGNBQWM7UUFDUCxtQkFBYyxHQUFVLENBQUMsQ0FBRTtRQUNsQyxjQUFjO1FBQ1AseUJBQW9CLEdBQVUsQ0FBQyxDQUFFO1FBQ3hDLGNBQWM7UUFDUCxtQkFBYyxHQUFVLENBQUMsQ0FBRTtRQUNsQyxjQUFjO1FBQ1AseUJBQW9CLEdBQVUsQ0FBQyxDQUFFO1FBQ3hDLGNBQWM7UUFDUCxtQkFBYyxHQUFVLENBQUMsQ0FBRTtRQUNsQyxjQUFjO1FBQ1AseUJBQW9CLEdBQVUsQ0FBQyxDQUFFO1FBQ3hDLFlBQVk7UUFDTCxpQkFBWSxHQUFVLENBQUMsQ0FBRTtRQUNoQyxZQUFZO1FBQ0wscUJBQWdCLEdBQVUsQ0FBQyxDQUFFO1FBQ3BDLFVBQVU7UUFDSCxjQUFTLEdBQVUsQ0FBQyxDQUFFO1FBQzdCLFlBQVk7UUFDTCxvQkFBZSxHQUFVLENBQUMsQ0FBRTtRQUNuQyxVQUFVO1FBQ0gsZ0JBQVcsR0FBVSxDQUFDLENBQUU7UUFDL0IsVUFBVTtRQUNILGlCQUFZLEdBQVUsQ0FBQyxDQUFFO1FBQ2hDLFlBQVk7UUFDTCxzQkFBaUIsR0FBVSxDQUFDLENBQUU7UUFDckMsVUFBVTtRQUNILG9CQUFlLEdBQVUsQ0FBQyxDQUFFO1FBQ25DLFVBQVU7UUFDSCxjQUFTLEdBQVUs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SUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3ZDLENBQUM7SUFDRCxzQkFBc0I7SUFDZix1REFBeUIsR0FBaEMsVUFBaUMsRUFBUztRQUN0QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLHNCQUFzQixDQUFDO0lBQ3BELENBQUM7SUFDRCxvQkFBb0I7SUFDYix3REFBMEIsR0FBakMsVUFBa0MsRUFBUztRQUN2QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLHVCQUF1QixDQUFDO0lBQ3JELENBQUM7SUFFRCxxQkFBcUI7SUFDUCxpQ0FBYSxHQUEzQjtRQUNJLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVELHlCQUF5QjtJQUd6QixxQ0FBTyxHQUFQO1FBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCwwQ0FBWSxHQUFaO1FBQ0ksSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLEVBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQXhKYyw2QkFBUyxHQUF3QixJQUFJLENBQUM7SUF5SnpELDBCQUFDO0NBMUpELEFBMEpDLElBQUE7QUExSlksa0RBQW1CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25IZXJvQmFzZUluZm8ge1xyXG4gICAgLyoq6Iux6ZuESUQgKi9cclxuICAgIHB1YmxpYyBIZXJvX0lEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5ZOB6LSoICovXHJcbiAgICBwdWJsaWMgUXVhbGl0eTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuacgOWkp+mYtuautSAqL1xyXG4gICAgcHVibGljIE1heFN0YWdlOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5pyA5aSn562J57qnICovXHJcbiAgICBwdWJsaWMgTWF4TGV2ZWw6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmioDog73mlbDph48gKi9cclxuICAgIHB1YmxpYyBTa2lsbE51bTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuiLsembhOWQjeensOaWh+acrCAqL1xyXG4gICAgcHVibGljIE5hbWVUZXh0X0lEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6KKr5Yqo5oqA6IO95ZCN56ewXzEgKi9cclxuICAgIHB1YmxpYyBQYXNzaXZlSW50cm9fMTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuiiq+WKqOaKgOiDveaPj+i/sF8xICovXHJcbiAgICBwdWJsaWMgUGFzc2l2ZURlc2NyaXB0aW9uXzE6bnVtYmVyID0gMCA7XHJcbiAgICAvKirooqvliqjmioDog73lkI3np7BfMiAqL1xyXG4gICAgcHVibGljIFBhc3NpdmVJbnRyb18yOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6KKr5Yqo5oqA6IO95o+P6L+wXzIgKi9cclxuICAgIHB1YmxpYyBQYXNzaXZlRGVzY3JpcHRpb25fMjpudW1iZXIgPSAwIDtcclxuICAgIC8qKuiiq+WKqOaKgOiDveWQjeensF8zICovXHJcbiAgICBwdWJsaWMgUGFzc2l2ZUludHJvXzM6bnVtYmVyID0gMCA7XHJcbiAgICAvKirooqvliqjmioDog73mj4/ov7BfMyAqL1xyXG4gICAgcHVibGljIFBhc3NpdmVEZXNjcmlwdGlvbl8zOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5Li75Yqo5oqA6IO95ZCN56ewICovXHJcbiAgICBwdWJsaWMgU2tpbGxUZXh0X0lEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5Li75Yqo5oqA6IO95o+P6L+wICovXHJcbiAgICBwdWJsaWMgU2tpbGxEZXNjcmlwdGlvbjpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWfuuehgOaUu+mAnyAqL1xyXG4gICAgcHVibGljIEJhc2VTcGVlZDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWfuuehgOW8ueS9k+mAn+W6piAqL1xyXG4gICAgcHVibGljIEJhc2VCdWxsZXRTcGVlZDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaZruaUu+WwhOeoiyAqL1xyXG4gICAgcHVibGljIEF0dGFja1JhbmdlOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6Iux6ZuE56KO54mHICovXHJcbiAgICBwdWJsaWMgSGVyb0ZyYWdtZW50Om51bWJlciA9IDAgO1xyXG4gICAgLyoq6Kej6ZSB56KO54mH5pWw6YePICovXHJcbiAgICBwdWJsaWMgVW5sb2NrRnJhZ21lbnROdW06bnVtYmVyID0gMCA7XHJcbiAgICAvKiroi7Hpm4TlrprkvY0gKi9cclxuICAgIHB1YmxpYyBIZXJvUG9zaXRpb25pbmc6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmmK/lkKblj6/nlKggKi9cclxuICAgIHB1YmxpYyBBdmFpbGFibGU6bnVtYmVyID0gMCA7XHJcbiAgICAvKirliJ3lp4vkuJPmrabpgZPlhbdJRCAqL1xyXG4gICAgcHVibGljIEZpcnN0RXhjbHVzaXZlV2VhcG9uSUQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirkuJPmrabnoo7niYfpgZPlhbcgKi9cclxuICAgIHB1YmxpYyBFeGNsdXNpdmVXZWFwb25GcmFnbWVudDpudW1iZXIgPSAwIDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEhlcm9CYXNlSW5mb01hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBIZXJvQmFzZUluZm9NYW5hZ2VyID0gbnVsbDtcclxuICAgIC8v5oqKanNvbuaVsOaNrui9rOWMluaIkG1hcOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBkYXRhOk1hcDxudW1iZXIsSnNvbkhlcm9CYXNlSW5mbz49bnVsbDtcclxuICAgIHByaXZhdGUgaXNfbG9hZF9jb21wbGV0ZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6SGVyb0Jhc2VJbmZvTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IEhlcm9CYXNlSW5mb01hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSnNvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Yqg6L29anNvblxyXG4gICAgcHJpdmF0ZSBsb2FkSnNvbigpIHtcclxuICAgICAgICBMb2FkTWFuYWdlci5sb2FkSnNvbignSGVyb0Jhc2VJbmZvJyxMb2FkTWFuYWdlci5sb2FkX21vZGUsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkpzb25Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqg6L29SnNvbkhlcm9CYXNlSW5mb+aIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25IZXJvQmFzZUluZm8oKTtcclxuICAgICAgICAgICAgICAgIGpzb25EYXRhPWpzb25baV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KGpzb25EYXRhLkhlcm9fSUQsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25IZXJvQmFzZUluZm8oaWQ6bnVtYmVyKTpKc29uSGVyb0Jhc2VJbmZvIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7oi7Hpm4RJROiOt+WPluWTgei0qCAqL1xyXG4gICAgcHVibGljIGdldFF1YWxpdHkoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUXVhbGl0eTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruiLsembhElE6I635Y+W5pyA5aSn6Zi25q61ICovXHJcbiAgICBwdWJsaWMgZ2V0TWF4U3RhZ2UoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuTWF4U3RhZ2U7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7oi7Hpm4RJROiOt+WPluacgOWkp+etiee6pyAqL1xyXG4gICAgcHVibGljIGdldE1heExldmVsKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDI0MDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruiLsembhElE6I635Y+W5oqA6IO95pWw6YePICovXHJcbiAgICBwdWJsaWMgZ2V0U2tpbGxOdW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU2tpbGxOdW07XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7oi7Hpm4RJROiOt+WPluiLsembhOWQjeensOaWh+acrCAqL1xyXG4gICAgcHVibGljIGdldE5hbWVUZXh0X0lEKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLk5hbWVUZXh0X0lEO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6Iux6ZuESUTojrflj5booqvliqjmioDog73lkI3np7BfMSAqL1xyXG4gICAgcHVibGljIGdldFBhc3NpdmVJbnRyb18xKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlBhc3NpdmVJbnRyb18xO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6Iux6ZuESUTojrflj5booqvliqjmioDog73mj4/ov7BfMSAqL1xyXG4gICAgcHVibGljIGdldFBhc3NpdmVEZXNjcmlwdGlvbl8xKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlBhc3NpdmVEZXNjcmlwdGlvbl8xO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6Iux6ZuESUTojrflj5booqvliqjmioDog73lkI3np7BfMiAqL1xyXG4gICAgcHVibGljIGdldFBhc3NpdmVJbnRyb18yKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlBhc3NpdmVJbnRyb18yO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6Iux6ZuESUTojrflj5booqvliqjmioDog73mj4/ov7BfMiAqL1xyXG4gICAgcHVibGljIGdldFBhc3NpdmVEZXNjcmlwdGlvbl8yKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlBhc3NpdmVEZXNjcmlwdGlvbl8yO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6Iux6ZuESUTojrflj5booqvliqjmioDog73lkI3np7BfMyAqL1xyXG4gICAgcHVibGljIGdldFBhc3NpdmVJbnRyb18zKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlBhc3NpdmVJbnRyb18zO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6Iux6ZuESUTojrflj5booqvliqjmioDog73mj4/ov7BfMyAqL1xyXG4gICAgcHVibGljIGdldFBhc3NpdmVEZXNjcmlwdGlvbl8zKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlBhc3NpdmVEZXNjcmlwdGlvbl8zO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6Iux6ZuESUTojrflj5bkuLvliqjmioDog73lkI3np7AgKi9cclxuICAgIHB1YmxpYyBnZXRTa2lsbFRleHRfSUQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU2tpbGxUZXh0X0lEO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6Iux6ZuESUTojrflj5bkuLvliqjmioDog73mj4/ov7AgKi9cclxuICAgIHB1YmxpYyBnZXRTa2lsbERlc2NyaXB0aW9uKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlNraWxsRGVzY3JpcHRpb247XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7oi7Hpm4RJROiOt+WPluWfuuehgOaUu+mAnyAqL1xyXG4gICAgcHVibGljIGdldEJhc2VTcGVlZChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5CYXNlU3BlZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7oi7Hpm4RJROiOt+WPluWfuuehgOW8ueS9k+mAn+W6piAqL1xyXG4gICAgcHVibGljIGdldEJhc2VCdWxsZXRTcGVlZChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5CYXNlQnVsbGV0U3BlZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7oi7Hpm4RJROiOt+WPluaZruaUu+WwhOeoiyAqL1xyXG4gICAgcHVibGljIGdldEF0dGFja1JhbmdlKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkF0dGFja1JhbmdlO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6Iux6ZuESUTojrflj5boi7Hpm4Tnoo7niYcgKi9cclxuICAgIHB1YmxpYyBnZXRIZXJvRnJhZ21lbnQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuSGVyb0ZyYWdtZW50O1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6Iux6ZuESUTojrflj5bop6PplIHnoo7niYfmlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXRVbmxvY2tGcmFnbWVudE51bShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5VbmxvY2tGcmFnbWVudE51bTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruiLsembhElE6I635Y+W6Iux6ZuE5a6a5L2NICovXHJcbiAgICBwdWJsaWMgZ2V0SGVyb1Bvc2l0aW9uaW5nKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkhlcm9Qb3NpdGlvbmluZztcclxuICAgIH1cclxuICAgIC8qKuagueaNruiLsembhElE6I635Y+W5piv5ZCm5Y+v55SoICovXHJcbiAgICBwdWJsaWMgZ2V0QXZhaWxhYmxlKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkF2YWlsYWJsZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruiLsembhElE6I635Y+W5Yid5aeL5LiT5q2m6YGT5YW3SUQgKi9cclxuICAgIHB1YmxpYyBnZXRGaXJzdEV4Y2x1c2l2ZVdlYXBvbklEKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkZpcnN0RXhjbHVzaXZlV2VhcG9uSUQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7oi7Hpm4RJROiOt+WPluS4k+atpueijueJh+mBk+WFtyAqL1xyXG4gICAgcHVibGljIGdldEV4Y2x1c2l2ZVdlYXBvbkZyYWdtZW50KGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkV4Y2x1c2l2ZVdlYXBvbkZyYWdtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg6Iux6ZuESUQqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhIZXJvX0lEKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gMTI7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG5cclxuICAgIGdldERhdGEoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFycmF5RGF0YSgpOkpzb25IZXJvQmFzZUluZm9bXXtcclxuICAgICAgICBsZXQgaW5mbyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgIGluZm8ucHVzaCh2KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gaW5mbztcclxuICAgIH1cclxufVxyXG4iXX0=