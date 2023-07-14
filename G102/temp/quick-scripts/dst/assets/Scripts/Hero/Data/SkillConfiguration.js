
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Data/SkillConfiguration.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8ecacTDIKZOjoAn3utO9WRn', 'SkillConfiguration');
// Scripts/Hero/Data/SkillConfiguration.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillConfigurationManager = exports.JsonSkillConfiguration = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonSkillConfiguration = /** @class */ (function () {
    function JsonSkillConfiguration() {
        /**技能ID */
        this.Skill = 0;
        /**绑定英雄 */
        this.BindHero = 0;
        /**技能槽位 */
        this.SkillPosition = 0;
        /**技能等级 */
        this.SkillLevel = 0;
        /**冷却时间 */
        this.ColdDown = 0;
        /**技能参数1 */
        this.SkillValue_1 = 0;
        /**技能参数2 */
        this.SkillValue_2 = 0;
        /**技能参数3 */
        this.SkillValue_3 = 0;
        /**技能参数4 */
        this.SkillValue_4 = 0;
    }
    return JsonSkillConfiguration;
}());
exports.JsonSkillConfiguration = JsonSkillConfiguration;
var SkillConfigurationManager = /** @class */ (function () {
    function SkillConfigurationManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    SkillConfigurationManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SkillConfigurationManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    SkillConfigurationManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    SkillConfigurationManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('SkillConfiguration', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonSkillConfiguration成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonSkillConfiguration();
                jsonData = json[i];
                _this.data.set(jsonData.Skill, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    SkillConfigurationManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    SkillConfigurationManager.prototype.getJsonSkillConfiguration = function (id) {
        return this.data.get(id);
    };
    /**根据技能ID获取绑定英雄 */
    SkillConfigurationManager.prototype.getBindHero = function (id) {
        return this.data.get(id).BindHero;
    };
    /**根据技能ID获取技能槽位 */
    SkillConfigurationManager.prototype.getSkillPosition = function (id) {
        return this.data.get(id).SkillPosition;
    };
    /**根据技能ID获取技能等级 */
    SkillConfigurationManager.prototype.getSkillLevel = function (id) {
        return this.data.get(id).SkillLevel;
    };
    /**根据技能ID获取冷却时间 */
    SkillConfigurationManager.prototype.getColdDown = function (id) {
        return this.data.get(id).ColdDown;
    };
    /**根据技能ID获取技能参数1 */
    SkillConfigurationManager.prototype.getSkillValue_1 = function (id) {
        return this.data.get(id).SkillValue_1;
    };
    /**根据技能ID获取技能参数2 */
    SkillConfigurationManager.prototype.getSkillValue_2 = function (id) {
        return this.data.get(id).SkillValue_2;
    };
    /**根据技能ID获取技能参数3 */
    SkillConfigurationManager.prototype.getSkillValue_3 = function (id) {
        return this.data.get(id).SkillValue_3;
    };
    /**根据技能ID获取技能参数4 */
    SkillConfigurationManager.prototype.getSkillValue_4 = function (id) {
        return this.data.get(id).SkillValue_4;
    };
    /** 静态方法，获取最大的 技能ID*/
    SkillConfigurationManager.getMaxSkill = function () {
        return 12306;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    SkillConfigurationManager.prototype.getJsonDataByHeroTypeAndSkillPosAndSkillLevel = function (heroType, sillPos, skillLevel) {
        var info = null;
        this.data.forEach(function (v, k) {
            if (v.BindHero == heroType && v.SkillPosition == sillPos && v.SkillLevel == skillLevel) {
                info = v;
            }
        });
        return info;
    };
    SkillConfigurationManager.GetSkillId = function (heroType, skillPos, skillLevel) {
        return heroType * 1000 + skillPos * 100 + skillLevel;
    };
    SkillConfigurationManager._instance = null;
    return SkillConfigurationManager;
}());
exports.SkillConfigurationManager = SkillConfigurationManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcRGF0YVxcU2tpbGxDb25maWd1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUF3RDtBQUd4RDtJQUFBO1FBQ0ksVUFBVTtRQUNILFVBQUssR0FBVSxDQUFDLENBQUU7UUFDekIsVUFBVTtRQUNILGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsVUFBVTtRQUNILGtCQUFhLEdBQVUsQ0FBQyxDQUFFO1FBQ2pDLFVBQVU7UUFDSCxlQUFVLEdBQVUsQ0FBQyxDQUFFO1FBQzlCLFVBQVU7UUFDSCxhQUFRLEdBQVUsQ0FBQyxDQUFFO1FBQzVCLFdBQVc7UUFDSixpQkFBWSxHQUFVLENBQUMsQ0FBRTtRQUNoQyxXQUFXO1FBQ0osaUJBQVksR0FBVSxDQUFDLENBQUU7UUFDaEMsV0FBVztRQUNKLGlCQUFZLEdBQVUsQ0FBQyxDQUFFO1FBQ2hDLFdBQVc7UUFDSixpQkFBWSxHQUFVLENBQUMsQ0FBRTtJQUNwQyxDQUFDO0lBQUQsNkJBQUM7QUFBRCxDQW5CQSxBQW1CQyxJQUFBO0FBbkJZLHdEQUFzQjtBQXFCbkM7SUFBQTtRQUVJLGlCQUFpQjtRQUNULFNBQUksR0FBb0MsSUFBSSxDQUFDO1FBQzdDLHNCQUFpQixHQUFTLEtBQUssQ0FBQztJQWdHNUMsQ0FBQztJQTlGaUIscUNBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSx5QkFBeUIsRUFBRSxDQUFDO1lBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELFNBQVM7SUFDRCx3Q0FBSSxHQUFaO1FBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsUUFBUSxFQUFFLENB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QXpCO1FBQ0ksT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELHlCQUF5QjtJQUV6QixpRkFBNkMsR0FBN0MsVUFBOEMsUUFBa0IsRUFBQyxPQUFjLEVBQUMsVUFBaUI7UUFDN0YsSUFBSSxJQUFJLEdBQTBCLElBQUksQ0FBQztRQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUMsRUFBQyxDQUFDO1lBQ2xCLElBQUcsQ0FBQyxDQUFDLFFBQVEsSUFBSSxRQUFRLElBQUksQ0FBQyxDQUFDLGFBQWEsSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLFVBQVUsSUFBSSxVQUFVLEVBQUM7Z0JBQ2xGLElBQUksR0FBRyxDQUFDLENBQUM7YUFDWjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVhLG9DQUFVLEdBQXhCLFVBQXlCLFFBQWtCLEVBQUMsUUFBZSxFQUFDLFVBQWlCO1FBQ3pFLE9BQU8sUUFBUSxHQUFHLElBQUksR0FBRyxRQUFRLEdBQUcsR0FBRyxHQUFHLFVBQVUsQ0FBQztJQUN6RCxDQUFDO0lBakdjLG1DQUFTLEdBQThCLElBQUksQ0FBQztJQW1HL0QsZ0NBQUM7Q0FwR0QsQUFvR0MsSUFBQTtBQXBHWSw4REFBeUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9fVHlwZSB9IGZyb20gXCIuLi9HYW1lL0hlcm9Db25maWdcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uU2tpbGxDb25maWd1cmF0aW9uIHtcclxuICAgIC8qKuaKgOiDvUlEICovXHJcbiAgICBwdWJsaWMgU2tpbGw6bnVtYmVyID0gMCA7XHJcbiAgICAvKirnu5Hlrproi7Hpm4QgKi9cclxuICAgIHB1YmxpYyBCaW5kSGVybzpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaKgOiDveanveS9jSAqL1xyXG4gICAgcHVibGljIFNraWxsUG9zaXRpb246bnVtYmVyID0gMCA7XHJcbiAgICAvKirmioDog73nrYnnuqcgKi9cclxuICAgIHB1YmxpYyBTa2lsbExldmVsOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5Ya35Y205pe26Ze0ICovXHJcbiAgICBwdWJsaWMgQ29sZERvd246bnVtYmVyID0gMCA7XHJcbiAgICAvKirmioDog73lj4LmlbAxICovXHJcbiAgICBwdWJsaWMgU2tpbGxWYWx1ZV8xOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5oqA6IO95Y+C5pWwMiAqL1xyXG4gICAgcHVibGljIFNraWxsVmFsdWVfMjpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaKgOiDveWPguaVsDMgKi9cclxuICAgIHB1YmxpYyBTa2lsbFZhbHVlXzM6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmioDog73lj4LmlbA0ICovXHJcbiAgICBwdWJsaWMgU2tpbGxWYWx1ZV80Om51bWJlciA9IDAgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2tpbGxDb25maWd1cmF0aW9uTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFNraWxsQ29uZmlndXJhdGlvbk1hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6TWFwPG51bWJlcixKc29uU2tpbGxDb25maWd1cmF0aW9uPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpTa2lsbENvbmZpZ3VyYXRpb25NYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgU2tpbGxDb25maWd1cmF0aW9uTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRKc29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liqDovb1qc29uXHJcbiAgICBwcml2YXRlIGxvYWRKc29uKCkge1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmxvYWRKc29uKCdTa2lsbENvbmZpZ3VyYXRpb24nLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uU2tpbGxDb25maWd1cmF0aW9u5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvblNraWxsQ29uZmlndXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEuU2tpbGwsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25Ta2lsbENvbmZpZ3VyYXRpb24oaWQ6bnVtYmVyKTpKc29uU2tpbGxDb25maWd1cmF0aW9uIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7mioDog71JROiOt+WPlue7keWumuiLsembhCAqL1xyXG4gICAgcHVibGljIGdldEJpbmRIZXJvKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkJpbmRIZXJvO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5oqA6IO9SUTojrflj5bmioDog73mp73kvY0gKi9cclxuICAgIHB1YmxpYyBnZXRTa2lsbFBvc2l0aW9uKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlNraWxsUG9zaXRpb247XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7mioDog71JROiOt+WPluaKgOiDveetiee6pyAqL1xyXG4gICAgcHVibGljIGdldFNraWxsTGV2ZWwoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU2tpbGxMZXZlbDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruaKgOiDvUlE6I635Y+W5Ya35Y205pe26Ze0ICovXHJcbiAgICBwdWJsaWMgZ2V0Q29sZERvd24oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuQ29sZERvd247XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7mioDog71JROiOt+WPluaKgOiDveWPguaVsDEgKi9cclxuICAgIHB1YmxpYyBnZXRTa2lsbFZhbHVlXzEoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU2tpbGxWYWx1ZV8xO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5oqA6IO9SUTojrflj5bmioDog73lj4LmlbAyICovXHJcbiAgICBwdWJsaWMgZ2V0U2tpbGxWYWx1ZV8yKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlNraWxsVmFsdWVfMjtcclxuICAgIH1cclxuICAgIC8qKuagueaNruaKgOiDvUlE6I635Y+W5oqA6IO95Y+C5pWwMyAqL1xyXG4gICAgcHVibGljIGdldFNraWxsVmFsdWVfMyhpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Ta2lsbFZhbHVlXzM7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7mioDog71JROiOt+WPluaKgOiDveWPguaVsDQgKi9cclxuICAgIHB1YmxpYyBnZXRTa2lsbFZhbHVlXzQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU2tpbGxWYWx1ZV80O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg5oqA6IO9SUQqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhTa2lsbCgpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDEyMzA2O1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG5cclxuICAgIGdldEpzb25EYXRhQnlIZXJvVHlwZUFuZFNraWxsUG9zQW5kU2tpbGxMZXZlbChoZXJvVHlwZTpIZXJvX1R5cGUsc2lsbFBvczpudW1iZXIsc2tpbGxMZXZlbDpudW1iZXIpOkpzb25Ta2lsbENvbmZpZ3VyYXRpb257XHJcbiAgICAgICAgbGV0IGluZm86SnNvblNraWxsQ29uZmlndXJhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHYsaykgPT57XHJcbiAgICAgICAgICAgIGlmKHYuQmluZEhlcm8gPT0gaGVyb1R5cGUgJiYgdi5Ta2lsbFBvc2l0aW9uID09IHNpbGxQb3MgJiYgdi5Ta2lsbExldmVsID09IHNraWxsTGV2ZWwpe1xyXG4gICAgICAgICAgICAgICAgaW5mbyA9IHY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gaW5mbztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldFNraWxsSWQoaGVyb1R5cGU6SGVyb19UeXBlLHNraWxsUG9zOm51bWJlcixza2lsbExldmVsOm51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiBoZXJvVHlwZSAqIDEwMDAgKyBza2lsbFBvcyAqIDEwMCArIHNraWxsTGV2ZWw7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==