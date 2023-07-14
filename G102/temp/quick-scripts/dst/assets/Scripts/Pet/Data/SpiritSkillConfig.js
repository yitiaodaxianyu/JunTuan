
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Data/SpiritSkillConfig.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a588cWRCllDD63lWOqf4Xkx', 'SpiritSkillConfig');
// Scripts/Pet/Data/SpiritSkillConfig.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpiritSkillConfigManager = exports.JsonSpiritSkillConfig = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonSpiritSkillConfig = /** @class */ (function () {
    function JsonSpiritSkillConfig() {
        /**技能ID */
        this.SkillId = 0;
        /**灵宠ID */
        this.SpiritId = 0;
        /**技能槽位 */
        this.SkillPosition = 0;
        /**冷却时间 */
        this.CoolDown = 0;
        /**释放距离 */
        this.SkillRange = 0;
        /**技能等级 */
        this.SkillLevel = 0;
        /**技能参数1 */
        this.SkillParameter_1 = 0;
        /**技能参数2 */
        this.SkillParameter_2 = 0;
        /**技能参数3 */
        this.SkillParameter_3 = 0;
    }
    return JsonSpiritSkillConfig;
}());
exports.JsonSpiritSkillConfig = JsonSpiritSkillConfig;
var SpiritSkillConfigManager = /** @class */ (function () {
    function SpiritSkillConfigManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    SpiritSkillConfigManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SpiritSkillConfigManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    SpiritSkillConfigManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    SpiritSkillConfigManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('SpiritSkillConfig', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonSpiritSkillConfig成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonSpiritSkillConfig();
                jsonData = json[i];
                _this.data.set(jsonData.SkillId, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    SpiritSkillConfigManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    SpiritSkillConfigManager.prototype.getJsonSpiritSkillConfig = function (id) {
        return this.data.get(id);
    };
    /**根据技能ID获取灵宠ID */
    SpiritSkillConfigManager.prototype.getSpiritId = function (id) {
        return this.data.get(id).SpiritId;
    };
    /**根据技能ID获取技能槽位 */
    SpiritSkillConfigManager.prototype.getSkillPosition = function (id) {
        return this.data.get(id).SkillPosition;
    };
    /**根据技能ID获取冷却时间 */
    SpiritSkillConfigManager.prototype.getCoolDown = function (id) {
        return this.data.get(id).CoolDown;
    };
    /**根据技能ID获取释放距离 */
    SpiritSkillConfigManager.prototype.getSkillRange = function (id) {
        return this.data.get(id).SkillRange;
    };
    /**根据技能ID获取技能等级 */
    SpiritSkillConfigManager.prototype.getSkillLevel = function (id) {
        return this.data.get(id).SkillLevel;
    };
    /**根据技能ID获取技能参数1 */
    SpiritSkillConfigManager.prototype.getSkillParameter_1 = function (id) {
        return this.data.get(id).SkillParameter_1;
    };
    /**根据技能ID获取技能参数2 */
    SpiritSkillConfigManager.prototype.getSkillParameter_2 = function (id) {
        return this.data.get(id).SkillParameter_2;
    };
    /**根据技能ID获取技能参数3 */
    SpiritSkillConfigManager.prototype.getSkillParameter_3 = function (id) {
        return this.data.get(id).SkillParameter_3;
    };
    /** 静态方法，获取最大的 技能ID*/
    SpiritSkillConfigManager.getMaxSkillId = function () {
        return 2143;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**
     *
     * @param petId 宠物id
     * @param skillSlot 技能槽位
     * @param skillLevel 技能等级
     * @returns
     */
    SpiritSkillConfigManager.getId = function (petId, skillSlot, skillLevel) {
        return petId * 100 + skillSlot * 10 + skillLevel;
    };
    SpiritSkillConfigManager._instance = null;
    return SpiritSkillConfigManager;
}());
exports.SpiritSkillConfigManager = SpiritSkillConfigManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxEYXRhXFxTcGlyaXRTa2lsbENvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFBd0Q7QUFHeEQ7SUFBQTtRQUNJLFVBQVU7UUFDSCxZQUFPLEdBQVUsQ0FBQyxDQUFFO1FBQzNCLFVBQVU7UUFDSCxhQUFRLEdBQVUsQ0FBQyxDQUFFO1FBQzVCLFVBQVU7UUFDSCxrQkFBYSxHQUFVLENBQUMsQ0FBRTtRQUNqQyxVQUFVO1FBQ0gsYUFBUSxHQUFVLENBQUMsQ0FBRTtRQUM1QixVQUFVO1FBQ0gsZUFBVSxHQUFVLENBQUMsQ0FBRTtRQUM5QixVQUFVO1FBQ0gsZUFBVSxHQUFVLENBQUMsQ0FBRTtRQUM5QixXQUFXO1FBQ0oscUJBQWdCLEdBQVUsQ0FBQyxDQUFFO1FBQ3BDLFdBQVc7UUFDSixxQkFBZ0IsR0FBVSxDQUFDLENBQUU7UUFDcEMsV0FBVztRQUNKLHFCQUFnQixHQUFVLENBQUMsQ0FBRTtJQUN4QyxDQUFDO0lBQUQsNEJBQUM7QUFBRCxDQW5CQSxBQW1CQyxJQUFBO0FBbkJZLHNEQUFxQjtBQXFCbEM7SUFBQTtRQUVJLGlCQUFpQjtRQUNULFNBQUksR0FBbUMsSUFBSSxDQUFDO1FBQzVDLHNCQUFpQixHQUFTLEtBQUssQ0FBQztJQTJGNUMsQ0FBQztJQXpGaUIsb0NBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSx3QkFBd0IsRUFBRSxDQUFDO1lBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELFNBQVM7SUFDRCx1Q0FBSSxHQUFaO1FBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsUUFBUSxFQUFFLENB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LHNDQUFhLEdBQTNCO1FBQ0ksT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELHlCQUF5QjtJQUN6Qjs7Ozs7O09BTUc7SUFDVyw4QkFBSyxHQUFuQixVQUFvQixLQUFZLEVBQUMsU0FBZ0IsRUFBQyxVQUFpQjtRQUMvRCxPQUFPLEtBQUssR0FBQyxHQUFHLEdBQUMsU0FBUyxHQUFDLEVBQUUsR0FBQyxVQUFVLENBQUE7SUFDNUMsQ0FBQztJQTdGYyxrQ0FBUyxHQUE2QixJQUFJLENBQUM7SUE4RjlELCtCQUFDO0NBL0ZELEFBK0ZDLElBQUE7QUEvRlksNERBQXdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uU3Bpcml0U2tpbGxDb25maWcge1xyXG4gICAgLyoq5oqA6IO9SUQgKi9cclxuICAgIHB1YmxpYyBTa2lsbElkOm51bWJlciA9IDAgO1xyXG4gICAgLyoq54G15a6gSUQgKi9cclxuICAgIHB1YmxpYyBTcGlyaXRJZDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaKgOiDveanveS9jSAqL1xyXG4gICAgcHVibGljIFNraWxsUG9zaXRpb246bnVtYmVyID0gMCA7XHJcbiAgICAvKirlhrfljbTml7bpl7QgKi9cclxuICAgIHB1YmxpYyBDb29sRG93bjpudW1iZXIgPSAwIDtcclxuICAgIC8qKumHiuaUvui3neemuyAqL1xyXG4gICAgcHVibGljIFNraWxsUmFuZ2U6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmioDog73nrYnnuqcgKi9cclxuICAgIHB1YmxpYyBTa2lsbExldmVsOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5oqA6IO95Y+C5pWwMSAqL1xyXG4gICAgcHVibGljIFNraWxsUGFyYW1ldGVyXzE6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmioDog73lj4LmlbAyICovXHJcbiAgICBwdWJsaWMgU2tpbGxQYXJhbWV0ZXJfMjpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaKgOiDveWPguaVsDMgKi9cclxuICAgIHB1YmxpYyBTa2lsbFBhcmFtZXRlcl8zOm51bWJlciA9IDAgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3Bpcml0U2tpbGxDb25maWdNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogU3Bpcml0U2tpbGxDb25maWdNYW5hZ2VyID0gbnVsbDtcclxuICAgIC8v5oqKanNvbuaVsOaNrui9rOWMluaIkG1hcOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBkYXRhOk1hcDxudW1iZXIsSnNvblNwaXJpdFNraWxsQ29uZmlnPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpTcGlyaXRTa2lsbENvbmZpZ01hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBTcGlyaXRTa2lsbENvbmZpZ01hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSnNvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Yqg6L29anNvblxyXG4gICAgcHJpdmF0ZSBsb2FkSnNvbigpIHtcclxuICAgICAgICBMb2FkTWFuYWdlci5sb2FkSnNvbignU3Bpcml0U2tpbGxDb25maWcnLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uU3Bpcml0U2tpbGxDb25maWfmiJDlip8nKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhPW5ldyBNYXAoKTtcclxuICAgICAgICAgICAgbGV0IGpzb249YXNzZXRzLmpzb247XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGpzb24ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25EYXRhPW5ldyBKc29uU3Bpcml0U2tpbGxDb25maWcoKTtcclxuICAgICAgICAgICAgICAgIGpzb25EYXRhPWpzb25baV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KGpzb25EYXRhLlNraWxsSWQsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25TcGlyaXRTa2lsbENvbmZpZyhpZDpudW1iZXIpOkpzb25TcGlyaXRTa2lsbENvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5oqA6IO9SUTojrflj5bngbXlrqBJRCAqL1xyXG4gICAgcHVibGljIGdldFNwaXJpdElkKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlNwaXJpdElkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5oqA6IO9SUTojrflj5bmioDog73mp73kvY0gKi9cclxuICAgIHB1YmxpYyBnZXRTa2lsbFBvc2l0aW9uKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlNraWxsUG9zaXRpb247XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7mioDog71JROiOt+WPluWGt+WNtOaXtumXtCAqL1xyXG4gICAgcHVibGljIGdldENvb2xEb3duKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkNvb2xEb3duO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5oqA6IO9SUTojrflj5bph4rmlL7ot53nprsgKi9cclxuICAgIHB1YmxpYyBnZXRTa2lsbFJhbmdlKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlNraWxsUmFuZ2U7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7mioDog71JROiOt+WPluaKgOiDveetiee6pyAqL1xyXG4gICAgcHVibGljIGdldFNraWxsTGV2ZWwoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU2tpbGxMZXZlbDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruaKgOiDvUlE6I635Y+W5oqA6IO95Y+C5pWwMSAqL1xyXG4gICAgcHVibGljIGdldFNraWxsUGFyYW1ldGVyXzEoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU2tpbGxQYXJhbWV0ZXJfMTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruaKgOiDvUlE6I635Y+W5oqA6IO95Y+C5pWwMiAqL1xyXG4gICAgcHVibGljIGdldFNraWxsUGFyYW1ldGVyXzIoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU2tpbGxQYXJhbWV0ZXJfMjtcclxuICAgIH1cclxuICAgIC8qKuagueaNruaKgOiDvUlE6I635Y+W5oqA6IO95Y+C5pWwMyAqL1xyXG4gICAgcHVibGljIGdldFNraWxsUGFyYW1ldGVyXzMoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU2tpbGxQYXJhbWV0ZXJfMztcclxuICAgIH1cclxuXHJcbiAgICAvKiog6Z2Z5oCB5pa55rOV77yM6I635Y+W5pyA5aSn55qEIOaKgOiDvUlEKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4U2tpbGxJZCgpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDIxNDM7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHBldElkIOWuoOeJqWlkXHJcbiAgICAgKiBAcGFyYW0gc2tpbGxTbG90IOaKgOiDveanveS9jVxyXG4gICAgICogQHBhcmFtIHNraWxsTGV2ZWwg5oqA6IO9562J57qnXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJZChwZXRJZDpudW1iZXIsc2tpbGxTbG90Om51bWJlcixza2lsbExldmVsOm51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiBwZXRJZCoxMDArc2tpbGxTbG90KjEwK3NraWxsTGV2ZWxcclxuICAgIH1cclxufVxyXG4iXX0=