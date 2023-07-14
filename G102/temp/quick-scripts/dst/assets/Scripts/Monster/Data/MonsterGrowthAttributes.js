
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/Data/MonsterGrowthAttributes.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '63fcdOX2WBJyYanA6ckGBN5', 'MonsterGrowthAttributes');
// Scripts/Monster/Data/MonsterGrowthAttributes.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonsterGrowthAttributesManager = exports.JsonMonsterGrowthAttributes = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonMonsterGrowthAttributes = /** @class */ (function () {
    function JsonMonsterGrowthAttributes() {
        /**属性ID */
        this.AttributeId = 0;
        /**怪物种类 */
        this.MonsterId = 0;
        /**等级 */
        this.Level = 0;
        /**攻击力 */
        this.Attack = 0;
        /**生命值 */
        this.Health = 0;
        /**防御力 */
        this.Defense = 0;
        /**命中值 */
        this.Hit = 0;
        /**闪避值 */
        this.Miss = 0;
        /**暴击值 */
        this.Critical = 0;
        /**暴击增幅 */
        this.ExtraCritical = 0;
        /**防暴值 */
        this.AntiCritical = 0;
        /**暴击抗性 */
        this.AntiExtraCritical = 0;
        /**技能等级 */
        this.SkillLevel = 0;
    }
    return JsonMonsterGrowthAttributes;
}());
exports.JsonMonsterGrowthAttributes = JsonMonsterGrowthAttributes;
var MonsterGrowthAttributesManager = /** @class */ (function () {
    function MonsterGrowthAttributesManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    MonsterGrowthAttributesManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new MonsterGrowthAttributesManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    MonsterGrowthAttributesManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    MonsterGrowthAttributesManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('MonsterGrowthAttributes', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonMonsterGrowthAttributes成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonMonsterGrowthAttributes();
                jsonData = json[i];
                _this.data.set(jsonData.AttributeId, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    MonsterGrowthAttributesManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    MonsterGrowthAttributesManager.prototype.getJsonMonsterGrowthAttributes = function (id) {
        return this.data.get(id);
    };
    /**根据属性ID获取怪物种类 */
    MonsterGrowthAttributesManager.prototype.getMonsterId = function (id) {
        return this.data.get(id).MonsterId;
    };
    /**根据属性ID获取等级 */
    MonsterGrowthAttributesManager.prototype.getLevel = function (id) {
        // try {
        //     return this.data.get(id).Level;
        // } catch (error) {
        //     throw console.error("getLevel:"+id);
        // }
        return this.data.get(id).Level;
    };
    /**根据属性ID获取攻击力 */
    MonsterGrowthAttributesManager.prototype.getAttack = function (id) {
        return this.data.get(id).Attack;
    };
    /**根据属性ID获取生命值 */
    MonsterGrowthAttributesManager.prototype.getHealth = function (id) {
        return this.data.get(id).Health;
    };
    /**根据属性ID获取防御力 */
    MonsterGrowthAttributesManager.prototype.getDefense = function (id) {
        return this.data.get(id).Defense;
    };
    /**根据属性ID获取命中值 */
    MonsterGrowthAttributesManager.prototype.getHit = function (id) {
        return this.data.get(id).Hit;
    };
    /**根据属性ID获取闪避值 */
    MonsterGrowthAttributesManager.prototype.getMiss = function (id) {
        return this.data.get(id).Miss;
    };
    /**根据属性ID获取暴击值 */
    MonsterGrowthAttributesManager.prototype.getCritical = function (id) {
        return this.data.get(id).Critical;
    };
    /**根据属性ID获取暴击增幅 */
    MonsterGrowthAttributesManager.prototype.getExtraCritical = function (id) {
        return this.data.get(id).ExtraCritical;
    };
    /**根据属性ID获取防暴值 */
    MonsterGrowthAttributesManager.prototype.getAntiCritical = function (id) {
        return this.data.get(id).AntiCritical;
    };
    /**根据属性ID获取暴击抗性 */
    MonsterGrowthAttributesManager.prototype.getAntiExtraCritical = function (id) {
        return this.data.get(id).AntiExtraCritical;
    };
    /**根据属性ID获取技能等级 */
    MonsterGrowthAttributesManager.prototype.getSkillLevel = function (id) {
        return this.data.get(id).SkillLevel;
    };
    /** 静态方法，获取最大的 属性ID*/
    MonsterGrowthAttributesManager.getMaxAttributeId = function () {
        return 800016;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**
     * 获得属性id
     * @param monsterId 怪物id
     * @param monsterLevel 怪物等级
     * @returns 属性id
     */
    MonsterGrowthAttributesManager.getId = function (monsterId, monsterLevel) {
        return monsterId * 10000 + monsterLevel;
    };
    MonsterGrowthAttributesManager._instance = null;
    return MonsterGrowthAttributesManager;
}());
exports.MonsterGrowthAttributesManager = MonsterGrowthAttributesManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcRGF0YVxcTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseURBQXdEO0FBR3hEO0lBQUE7UUFDSSxVQUFVO1FBQ0gsZ0JBQVcsR0FBVSxDQUFDLENBQUU7UUFDL0IsVUFBVTtRQUNILGNBQVMsR0FBVSxDQUFDLENBQUU7UUFDN0IsUUFBUTtRQUNELFVBQUssR0FBVSxDQUFDLENBQUU7UUFDekIsU0FBUztRQUNGLFdBQU0sR0FBVSxDQUFDLENBQUU7UUFDMUIsU0FBUztRQUNGLFdBQU0sR0FBVSxDQUFDLENBQUU7UUFDMUIsU0FBUztRQUNGLFlBQU8sR0FBVSxDQUFDLENBQUU7UUFDM0IsU0FBUztRQUNGLFFBQUcsR0FBVSxDQUFDLENBQUU7UUFDdkIsU0FBUztRQUNGLFNBQUksR0FBVSxDQUFDLENBQUU7UUFDeEIsU0FBUztRQUNGLGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsVUFBVTtRQUNILGtCQUFhLEdBQVUsQ0FBQyxDQUFFO1FBQ2pDLFNBQVM7UUFDRixpQkFBWSxHQUFVLENBQUMsQ0FBRTtRQUNoQyxVQUFVO1FBQ0gsc0JBQWlCLEdBQVUsQ0FBQyxDQUFFO1FBQ3JDLFVBQVU7UUFDSCxlQUFVLEdBQVUsQ0FBQyxDQUFFO0lBQ2xDLENBQUM7SUFBRCxrQ0FBQztBQUFELENBM0JBLEFBMkJDLElBQUE7QUEzQlksa0VBQTJCO0FBNkJ4QztJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUF5QyxJQUFJLENBQUM7UUFDbEQsc0JBQWlCLEdBQVMsS0FBSyxDQUFDO0lBZ0g1QyxDQUFDO0lBOUdpQiwwQ0FBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLDhCQUE4QixFQUFFLENBQUM7WUFDcEQsSUFBSSxDQUFDLFNBQVMsQ0FB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OEIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25Nb25zdGVyR3Jvd3RoQXR0cmlidXRlcyB7XHJcbiAgICAvKirlsZ7mgKdJRCAqL1xyXG4gICAgcHVibGljIEF0dHJpYnV0ZUlkOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5oCq54mp56eN57G7ICovXHJcbiAgICBwdWJsaWMgTW9uc3RlcklkOm51bWJlciA9IDAgO1xyXG4gICAgLyoq562J57qnICovXHJcbiAgICBwdWJsaWMgTGV2ZWw6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmlLvlh7vlipsgKi9cclxuICAgIHB1YmxpYyBBdHRhY2s6bnVtYmVyID0gMCA7XHJcbiAgICAvKirnlJ/lkb3lgLwgKi9cclxuICAgIHB1YmxpYyBIZWFsdGg6bnVtYmVyID0gMCA7XHJcbiAgICAvKirpmLLlvqHlipsgKi9cclxuICAgIHB1YmxpYyBEZWZlbnNlOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5ZG95Lit5YC8ICovXHJcbiAgICBwdWJsaWMgSGl0Om51bWJlciA9IDAgO1xyXG4gICAgLyoq6Zeq6YG/5YC8ICovXHJcbiAgICBwdWJsaWMgTWlzczpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaatOWHu+WAvCAqL1xyXG4gICAgcHVibGljIENyaXRpY2FsOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5pq05Ye75aKe5bmFICovXHJcbiAgICBwdWJsaWMgRXh0cmFDcml0aWNhbDpudW1iZXIgPSAwIDtcclxuICAgIC8qKumYsuaatOWAvCAqL1xyXG4gICAgcHVibGljIEFudGlDcml0aWNhbDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaatOWHu+aKl+aApyAqL1xyXG4gICAgcHVibGljIEFudGlFeHRyYUNyaXRpY2FsOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5oqA6IO9562J57qnICovXHJcbiAgICBwdWJsaWMgU2tpbGxMZXZlbDpudW1iZXIgPSAwIDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IE1vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25Nb25zdGVyR3Jvd3RoQXR0cmlidXRlcz49bnVsbDtcclxuICAgIHByaXZhdGUgaXNfbG9hZF9jb21wbGV0ZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6TW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXNNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXNNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ01vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzJyxMb2FkTWFuYWdlci5sb2FkX21vZGUsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkpzb25Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqg6L29SnNvbk1vbnN0ZXJHcm93dGhBdHRyaWJ1dGVz5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvbk1vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5BdHRyaWJ1dGVJZCxqc29uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc19sb2FkX2NvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9veaYr+WQpuWujOaIkCAqL1xyXG4gICAgcHVibGljIGdldElzTG9hZENvbXBsZXRlZCgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzX2xvYWRfY29tcGxldGVkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uaWTlj7fojrflj5ZKc29u55qE5ZCE56eN5pWw5o2uICovXHJcbiAgICBwdWJsaWMgZ2V0SnNvbk1vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzKGlkOm51bWJlcik6SnNvbk1vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lsZ7mgKdJROiOt+WPluaAqueJqeenjeexuyAqL1xyXG4gICAgcHVibGljIGdldE1vbnN0ZXJJZChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Nb25zdGVySWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lsZ7mgKdJROiOt+WPluetiee6pyAqL1xyXG4gICAgcHVibGljIGdldExldmVsKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgLy8gdHJ5IHtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkxldmVsO1xyXG4gICAgICAgIC8vIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgLy8gICAgIHRocm93IGNvbnNvbGUuZXJyb3IoXCJnZXRMZXZlbDpcIitpZCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5MZXZlbDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWxnuaAp0lE6I635Y+W5pS75Ye75YqbICovXHJcbiAgICBwdWJsaWMgZ2V0QXR0YWNrKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkF0dGFjaztcclxuICAgIH1cclxuICAgIC8qKuagueaNruWxnuaAp0lE6I635Y+W55Sf5ZG95YC8ICovXHJcbiAgICBwdWJsaWMgZ2V0SGVhbHRoKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkhlYWx0aDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWxnuaAp0lE6I635Y+W6Ziy5b6h5YqbICovXHJcbiAgICBwdWJsaWMgZ2V0RGVmZW5zZShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5EZWZlbnNlO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5bGe5oCnSUTojrflj5blkb3kuK3lgLwgKi9cclxuICAgIHB1YmxpYyBnZXRIaXQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuSGl0O1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5bGe5oCnSUTojrflj5bpl6rpgb/lgLwgKi9cclxuICAgIHB1YmxpYyBnZXRNaXNzKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLk1pc3M7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lsZ7mgKdJROiOt+WPluaatOWHu+WAvCAqL1xyXG4gICAgcHVibGljIGdldENyaXRpY2FsKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkNyaXRpY2FsO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5bGe5oCnSUTojrflj5bmmrTlh7vlop7luYUgKi9cclxuICAgIHB1YmxpYyBnZXRFeHRyYUNyaXRpY2FsKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkV4dHJhQ3JpdGljYWw7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lsZ7mgKdJROiOt+WPlumYsuaatOWAvCAqL1xyXG4gICAgcHVibGljIGdldEFudGlDcml0aWNhbChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5BbnRpQ3JpdGljYWw7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lsZ7mgKdJROiOt+WPluaatOWHu+aKl+aApyAqL1xyXG4gICAgcHVibGljIGdldEFudGlFeHRyYUNyaXRpY2FsKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkFudGlFeHRyYUNyaXRpY2FsO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5bGe5oCnSUTojrflj5bmioDog73nrYnnuqcgKi9cclxuICAgIHB1YmxpYyBnZXRTa2lsbExldmVsKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlNraWxsTGV2ZWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDlsZ7mgKdJRCovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1heEF0dHJpYnV0ZUlkKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gODAwMDE2O1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635b6X5bGe5oCnaWRcclxuICAgICAqIEBwYXJhbSBtb25zdGVySWQg5oCq54mpaWRcclxuICAgICAqIEBwYXJhbSBtb25zdGVyTGV2ZWwg5oCq54mp562J57qnXHJcbiAgICAgKiBAcmV0dXJucyDlsZ7mgKdpZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldElkKG1vbnN0ZXJJZDpudW1iZXIsbW9uc3RlckxldmVsOm51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiBtb25zdGVySWQqMTAwMDArbW9uc3RlckxldmVsO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==