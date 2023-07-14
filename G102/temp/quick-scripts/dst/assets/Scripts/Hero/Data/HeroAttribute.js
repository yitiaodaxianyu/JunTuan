
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Data/HeroAttribute.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '01110gI4B5PxJCTcHVObeGo', 'HeroAttribute');
// Scripts/Hero/Data/HeroAttribute.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroAttributeManager = exports.JsonHeroAttribute = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonHeroAttribute = /** @class */ (function () {
    function JsonHeroAttribute() {
        /**属性ID */
        this.Attribute_ID = 0;
        /**绑定英雄ID */
        this.Hero_ID = 0;
        /**星级 */
        this.Star = 0;
        /**阶段 */
        this.Stage = 0;
        /**基础生命值 */
        this.BaseHealth = 0;
        /**基础攻击力 */
        this.BaseAttack = 0;
        /**基础防御力 */
        this.BaseDefense = 0;
        /**成长生命值 */
        this.GrowthHealth = 0;
        /**成长攻击力 */
        this.GrowthAttack = 0;
        /**成长防御力 */
        this.GrowthDefense = 0;
        /**命中值 */
        this.Hit = 0;
        /**闪避值 */
        this.Miss = 0;
        /**暴击值 */
        this.Critical = 0;
        /**防暴值 */
        this.AntiCritical = 0;
        /**暴击增幅 */
        this.ExtraCritical = 0;
        /**暴击抗性 */
        this.AntiExtraCritical = 0;
    }
    return JsonHeroAttribute;
}());
exports.JsonHeroAttribute = JsonHeroAttribute;
var HeroAttributeManager = /** @class */ (function () {
    function HeroAttributeManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    HeroAttributeManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new HeroAttributeManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    HeroAttributeManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    HeroAttributeManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('HeroAttribute', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonHeroAttribute成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonHeroAttribute();
                jsonData = json[i];
                _this.data.set(jsonData.Attribute_ID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    HeroAttributeManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    HeroAttributeManager.prototype.getJsonHeroAttribute = function (id) {
        return this.data.get(id);
    };
    /**根据属性ID获取绑定英雄ID */
    HeroAttributeManager.prototype.getHero_ID = function (id) {
        return this.data.get(id).Hero_ID;
    };
    /**根据属性ID获取星级 */
    HeroAttributeManager.prototype.getStar = function (id) {
        return this.data.get(id).Star;
    };
    /**根据属性ID获取阶段 */
    HeroAttributeManager.prototype.getStage = function (id) {
        return this.data.get(id).Stage;
    };
    /**根据属性ID获取基础生命值 */
    HeroAttributeManager.prototype.getBaseHealth = function (id) {
        return this.data.get(id).BaseHealth;
    };
    /**根据属性ID获取基础攻击力 */
    HeroAttributeManager.prototype.getBaseAttack = function (id) {
        return this.data.get(id).BaseAttack;
    };
    /**根据属性ID获取基础防御力 */
    HeroAttributeManager.prototype.getBaseDefense = function (id) {
        return this.data.get(id).BaseDefense;
    };
    /**根据属性ID获取成长生命值 */
    HeroAttributeManager.prototype.getGrowthHealth = function (id) {
        return this.data.get(id).GrowthHealth;
    };
    /**根据属性ID获取成长攻击力 */
    HeroAttributeManager.prototype.getGrowthAttack = function (id) {
        return this.data.get(id).GrowthAttack;
    };
    /**根据属性ID获取成长防御力 */
    HeroAttributeManager.prototype.getGrowthDefense = function (id) {
        return this.data.get(id).GrowthDefense;
    };
    /**根据属性ID获取命中值 */
    HeroAttributeManager.prototype.getHit = function (id) {
        return this.data.get(id).Hit;
    };
    /**根据属性ID获取闪避值 */
    HeroAttributeManager.prototype.getMiss = function (id) {
        return this.data.get(id).Miss;
    };
    /**根据属性ID获取暴击值 */
    HeroAttributeManager.prototype.getCritical = function (id) {
        return this.data.get(id).Critical;
    };
    /**根据属性ID获取防暴值 */
    HeroAttributeManager.prototype.getAntiCritical = function (id) {
        return this.data.get(id).AntiCritical;
    };
    /**根据属性ID获取暴击增幅 */
    HeroAttributeManager.prototype.getExtraCritical = function (id) {
        return this.data.get(id).ExtraCritical;
    };
    /**根据属性ID获取暴击抗性 */
    HeroAttributeManager.prototype.getAntiExtraCritical = function (id) {
        return this.data.get(id).AntiExtraCritical;
    };
    /** 静态方法，获取最大的 属性ID*/
    HeroAttributeManager.getMaxAttribute_ID = function () {
        return 12026;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    HeroAttributeManager.getId = function (heroType, heroStage) {
        return heroType * 1000 + heroStage;
    };
    /**根据英雄类型和阶段获取星级 */
    HeroAttributeManager.prototype.getStarByHeroTypeAndStage = function (heroType, heroStage) {
        var info = null;
        this.data.forEach(function (v, k) {
            if (heroType == v.Hero_ID && heroStage == v.Stage) {
                info = v;
            }
        });
        if (info == null)
            return 0;
        return info.Star;
    };
    HeroAttributeManager.prototype.getJsonDataByHeroTypeAndStage = function (heroType, heroStage) {
        var info = null;
        this.data.forEach(function (v, k) {
            if (heroType == v.Hero_ID && heroStage == v.Stage) {
                info = v;
            }
        });
        return info;
    };
    HeroAttributeManager._instance = null;
    return HeroAttributeManager;
}());
exports.HeroAttributeManager = HeroAttributeManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcRGF0YVxcSGVyb0F0dHJpYnV0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFBd0Q7QUFHeEQ7SUFBQTtRQUNJLFVBQVU7UUFDSCxpQkFBWSxHQUFVLENBQUMsQ0FBRTtRQUNoQyxZQUFZO1FBQ0wsWUFBTyxHQUFVLENBQUMsQ0FBRTtRQUMzQixRQUFRO1FBQ0QsU0FBSSxHQUFVLENBQUMsQ0FBRTtRQUN4QixRQUFRO1FBQ0QsVUFBSyxHQUFVLENBQUMsQ0FBRTtRQUN6QixXQUFXO1FBQ0osZUFBVSxHQUFVLENBQUMsQ0FBRTtRQUM5QixXQUFXO1FBQ0osZUFBVSxHQUFVLENBQUMsQ0FBRTtRQUM5QixXQUFXO1FBQ0osZ0JBQVcsR0FBVSxDQUFDLENBQUU7UUFDL0IsV0FBVztRQUNKLGlCQUFZLEdBQVUsQ0FBQyxDQUFFO1FBQ2hDLFdBQVc7UUFDSixpQkFBWSxHQUFVLENBQUMsQ0FBRTtRQUNoQyxXQUFXO1FBQ0osa0JBQWEsR0FBVSxDQUFDLENBQUU7UUFDakMsU0FBUztRQUNGLFFBQUcsR0FBVSxDQUFDLENBQUU7UUFDdkIsU0FBUztRQUNGLFNBQUksR0FBVSxDQUFDLENBQUU7UUFDeEIsU0FBUztRQUNGLGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsU0FBUztRQUNGLGlCQUFZLEdBQVUsQ0FBQyxDQUFFO1FBQ2hDLFVBQVU7UUFDSCxrQkFBYSxHQUFVLENBQUMsQ0FBRTtRQUNqQyxVQUFVO1FBQ0gsc0JBQWlCLEdBQVUsQ0FBQyxDQUFFO0lBQ3pDLENBQUM7SUFBRCx3QkFBQztBQUFELENBakNBLEFBaUNDLElBQUE7QUFqQ1ksOENBQWlCO0FBbUM5QjtJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUErQixJQUFJLENBQUM7UUFDeEMsc0JBQWlCLEdBQVMsS0FBSyxDQUFDO0lBc0k1QyxDQUFDO0lBcElpQixnQ0FBVyxHQUF6QjtRQUNJLElBQUcsSUFB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QUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBdkljLDhCQUFTLEdBQXlCLElBQUksQ0FBQztJQXlJMUQsMkJBQUM7Q0ExSUQsQUEwSUMsSUFBQTtBQTFJWSxvREFBb0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9fVHlwZSB9IGZyb20gXCIuLi9HYW1lL0hlcm9Db25maWdcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uSGVyb0F0dHJpYnV0ZSB7XHJcbiAgICAvKirlsZ7mgKdJRCAqL1xyXG4gICAgcHVibGljIEF0dHJpYnV0ZV9JRDpudW1iZXIgPSAwIDtcclxuICAgIC8qKue7keWumuiLsembhElEICovXHJcbiAgICBwdWJsaWMgSGVyb19JRDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaYn+e6pyAqL1xyXG4gICAgcHVibGljIFN0YXI6bnVtYmVyID0gMCA7XHJcbiAgICAvKirpmLbmrrUgKi9cclxuICAgIHB1YmxpYyBTdGFnZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWfuuehgOeUn+WRveWAvCAqL1xyXG4gICAgcHVibGljIEJhc2VIZWFsdGg6bnVtYmVyID0gMCA7XHJcbiAgICAvKirln7rnoYDmlLvlh7vlipsgKi9cclxuICAgIHB1YmxpYyBCYXNlQXR0YWNrOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5Z+656GA6Ziy5b6h5YqbICovXHJcbiAgICBwdWJsaWMgQmFzZURlZmVuc2U6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmiJDplb/nlJ/lkb3lgLwgKi9cclxuICAgIHB1YmxpYyBHcm93dGhIZWFsdGg6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmiJDplb/mlLvlh7vlipsgKi9cclxuICAgIHB1YmxpYyBHcm93dGhBdHRhY2s6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmiJDplb/pmLLlvqHlipsgKi9cclxuICAgIHB1YmxpYyBHcm93dGhEZWZlbnNlOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5ZG95Lit5YC8ICovXHJcbiAgICBwdWJsaWMgSGl0Om51bWJlciA9IDAgO1xyXG4gICAgLyoq6Zeq6YG/5YC8ICovXHJcbiAgICBwdWJsaWMgTWlzczpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaatOWHu+WAvCAqL1xyXG4gICAgcHVibGljIENyaXRpY2FsOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6Ziy5pq05YC8ICovXHJcbiAgICBwdWJsaWMgQW50aUNyaXRpY2FsOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5pq05Ye75aKe5bmFICovXHJcbiAgICBwdWJsaWMgRXh0cmFDcml0aWNhbDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaatOWHu+aKl+aApyAqL1xyXG4gICAgcHVibGljIEFudGlFeHRyYUNyaXRpY2FsOm51bWJlciA9IDAgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSGVyb0F0dHJpYnV0ZU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBIZXJvQXR0cmlidXRlTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25IZXJvQXR0cmlidXRlPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpIZXJvQXR0cmlidXRlTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IEhlcm9BdHRyaWJ1dGVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ0hlcm9BdHRyaWJ1dGUnLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uSGVyb0F0dHJpYnV0ZeaIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25IZXJvQXR0cmlidXRlKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5BdHRyaWJ1dGVfSUQsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25IZXJvQXR0cmlidXRlKGlkOm51bWJlcik6SnNvbkhlcm9BdHRyaWJ1dGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWxnuaAp0lE6I635Y+W57uR5a6a6Iux6ZuESUQgKi9cclxuICAgIHB1YmxpYyBnZXRIZXJvX0lEKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkhlcm9fSUQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lsZ7mgKdJROiOt+WPluaYn+e6pyAqL1xyXG4gICAgcHVibGljIGdldFN0YXIoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU3RhcjtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWxnuaAp0lE6I635Y+W6Zi25q61ICovXHJcbiAgICBwdWJsaWMgZ2V0U3RhZ2UoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU3RhZ2U7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lsZ7mgKdJROiOt+WPluWfuuehgOeUn+WRveWAvCAqL1xyXG4gICAgcHVibGljIGdldEJhc2VIZWFsdGgoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuQmFzZUhlYWx0aDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWxnuaAp0lE6I635Y+W5Z+656GA5pS75Ye75YqbICovXHJcbiAgICBwdWJsaWMgZ2V0QmFzZUF0dGFjayhpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5CYXNlQXR0YWNrO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5bGe5oCnSUTojrflj5bln7rnoYDpmLLlvqHlipsgKi9cclxuICAgIHB1YmxpYyBnZXRCYXNlRGVmZW5zZShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5CYXNlRGVmZW5zZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWxnuaAp0lE6I635Y+W5oiQ6ZW/55Sf5ZG95YC8ICovXHJcbiAgICBwdWJsaWMgZ2V0R3Jvd3RoSGVhbHRoKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkdyb3d0aEhlYWx0aDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWxnuaAp0lE6I635Y+W5oiQ6ZW/5pS75Ye75YqbICovXHJcbiAgICBwdWJsaWMgZ2V0R3Jvd3RoQXR0YWNrKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkdyb3d0aEF0dGFjaztcclxuICAgIH1cclxuICAgIC8qKuagueaNruWxnuaAp0lE6I635Y+W5oiQ6ZW/6Ziy5b6h5YqbICovXHJcbiAgICBwdWJsaWMgZ2V0R3Jvd3RoRGVmZW5zZShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Hcm93dGhEZWZlbnNlO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5bGe5oCnSUTojrflj5blkb3kuK3lgLwgKi9cclxuICAgIHB1YmxpYyBnZXRIaXQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuSGl0O1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5bGe5oCnSUTojrflj5bpl6rpgb/lgLwgKi9cclxuICAgIHB1YmxpYyBnZXRNaXNzKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLk1pc3M7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lsZ7mgKdJROiOt+WPluaatOWHu+WAvCAqL1xyXG4gICAgcHVibGljIGdldENyaXRpY2FsKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkNyaXRpY2FsO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5bGe5oCnSUTojrflj5bpmLLmmrTlgLwgKi9cclxuICAgIHB1YmxpYyBnZXRBbnRpQ3JpdGljYWwoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuQW50aUNyaXRpY2FsO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5bGe5oCnSUTojrflj5bmmrTlh7vlop7luYUgKi9cclxuICAgIHB1YmxpYyBnZXRFeHRyYUNyaXRpY2FsKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkV4dHJhQ3JpdGljYWw7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lsZ7mgKdJROiOt+WPluaatOWHu+aKl+aApyAqL1xyXG4gICAgcHVibGljIGdldEFudGlFeHRyYUNyaXRpY2FsKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkFudGlFeHRyYUNyaXRpY2FsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg5bGe5oCnSUQqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhBdHRyaWJ1dGVfSUQoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAxMjAyNjtcclxuICAgIH1cclxuXHJcbiAgICAvL+S7peS4iuagvOW8j+e7n+S4gO+8jOS7peS4i+WGmeavj+S4qmpzb27mlbDmja7nmoTnibnmrorpnIDmsYJcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SWQoaGVyb1R5cGU6SGVyb19UeXBlLGhlcm9TdGFnZTpudW1iZXIpe1xyXG4gICAgICAgIHJldHVybiBoZXJvVHlwZSAqIDEwMDAgKyBoZXJvU3RhZ2U7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7oi7Hpm4TnsbvlnovlkozpmLbmrrXojrflj5bmmJ/nuqcgKi9cclxuICAgIGdldFN0YXJCeUhlcm9UeXBlQW5kU3RhZ2UoaGVyb1R5cGU6SGVyb19UeXBlLGhlcm9TdGFnZTpudW1iZXIpOm51bWJlcntcclxuICAgICAgICBsZXQgaW5mbzpKc29uSGVyb0F0dHJpYnV0ZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHYsaykgPT57XHJcbiAgICAgICAgICAgIGlmKGhlcm9UeXBlID09IHYuSGVyb19JRCAmJiBoZXJvU3RhZ2UgPT0gdi5TdGFnZSl7XHJcbiAgICAgICAgICAgICAgICBpbmZvID0gdjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKGluZm8gPT0gbnVsbCkgcmV0dXJuIDA7XHJcbiAgICAgICAgcmV0dXJuIGluZm8uU3RhcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRKc29uRGF0YUJ5SGVyb1R5cGVBbmRTdGFnZShoZXJvVHlwZTpIZXJvX1R5cGUsaGVyb1N0YWdlOm51bWJlcik6SnNvbkhlcm9BdHRyaWJ1dGV7XHJcbiAgICAgICAgbGV0IGluZm86SnNvbkhlcm9BdHRyaWJ1dGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKCh2LGspID0+e1xyXG4gICAgICAgICAgICBpZihoZXJvVHlwZSA9PSB2Lkhlcm9fSUQgJiYgaGVyb1N0YWdlID09IHYuU3RhZ2Upe1xyXG4gICAgICAgICAgICAgICAgaW5mbyA9IHY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gaW5mbztcclxuICAgIH1cclxuXHJcbn1cclxuIl19