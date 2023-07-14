
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Data/SpiritSkill.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8eedaEMXZ5GKrRMs54qyGka', 'SpiritSkill');
// Scripts/Pet/Data/SpiritSkill.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpiritSkillManager = exports.JsonSpiritSkill = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonSpiritSkill = /** @class */ (function () {
    function JsonSpiritSkill() {
        /**灵宠技能 */
        this.SpiritSkill = 0;
        /**灵宠种类 */
        this.SpiritType = 0;
        /**技能等级 */
        this.SkillLevel = 0;
        /**冷却时间 */
        this.CoolDown = 0;
        /**技能参数1 */
        this.SkillParameter_1 = 0;
        /**技能参数2 */
        this.SkillParameter_2 = 0;
        /**技能参数3 */
        this.SkillParameter_3 = 0;
    }
    return JsonSpiritSkill;
}());
exports.JsonSpiritSkill = JsonSpiritSkill;
var SpiritSkillManager = /** @class */ (function () {
    function SpiritSkillManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    SpiritSkillManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SpiritSkillManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    SpiritSkillManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    SpiritSkillManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('SpiritSkill', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonSpiritSkill成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonSpiritSkill();
                jsonData = json[i];
                _this.data.set(jsonData.SpiritSkill, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    SpiritSkillManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    SpiritSkillManager.prototype.getJsonSpiritSkill = function (id) {
        return this.data.get(id);
    };
    /**根据灵宠技能获取灵宠种类 */
    SpiritSkillManager.prototype.getSpiritType = function (id) {
        return this.data.get(id).SpiritType;
    };
    /**根据灵宠技能获取技能等级 */
    SpiritSkillManager.prototype.getSkillLevel = function (id) {
        return this.data.get(id).SkillLevel;
    };
    /**根据灵宠技能获取冷却时间 */
    SpiritSkillManager.prototype.getCoolDown = function (id) {
        return this.data.get(id).CoolDown;
    };
    /**根据灵宠技能获取技能参数1 */
    SpiritSkillManager.prototype.getSkillParameter_1 = function (id) {
        return this.data.get(id).SkillParameter_1;
    };
    /**根据灵宠技能获取技能参数2 */
    SpiritSkillManager.prototype.getSkillParameter_2 = function (id) {
        return this.data.get(id).SkillParameter_2;
    };
    /**根据灵宠技能获取技能参数3 */
    SpiritSkillManager.prototype.getSkillParameter_3 = function (id) {
        return this.data.get(id).SkillParameter_3;
    };
    /** 静态方法，获取最大的 灵宠技能*/
    SpiritSkillManager.getMaxSpiritSkill = function () {
        return 403;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    SpiritSkillManager.prototype.getJsonByTypeAndLevel = function (type, level) {
        var info = null;
        this.data.forEach(function (v, k) {
            if (type == v.SpiritType && level == v.SkillLevel) {
                info = v;
            }
        });
        return info;
    };
    SpiritSkillManager.prototype.getSkillId = function (type, level) {
        return type * 100 + level;
    };
    SpiritSkillManager._instance = null;
    return SpiritSkillManager;
}());
exports.SpiritSkillManager = SpiritSkillManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxEYXRhXFxTcGlyaXRTa2lsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFBd0Q7QUFFeEQ7SUFBQTtRQUNJLFVBQVU7UUFDSCxnQkFBVyxHQUFVLENBQUMsQ0FBRTtRQUMvQixVQUFVO1FBQ0gsZUFBVSxHQUFVLENBQUMsQ0FBRTtRQUM5QixVQUFVO1FBQ0gsZUFBVSxHQUFVLENBQUMsQ0FBRTtRQUM5QixVQUFVO1FBQ0gsYUFBUSxHQUFVLENBQUMsQ0FBRTtRQUM1QixXQUFXO1FBQ0oscUJBQWdCLEdBQVUsQ0FBQyxDQUFFO1FBQ3BDLFdBQVc7UUFDSixxQkFBZ0IsR0FBVSxDQUFDLENBQUU7UUFDcEMsV0FBVztRQUNKLHFCQUFnQixHQUFVLENBQUMsQ0FBRTtJQUN4QyxDQUFDO0lBQUQsc0JBQUM7QUFBRCxDQWZBLEFBZUMsSUFBQTtBQWZZLDBDQUFlO0FBaUI1QjtJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUE2QixJQUFJLENBQUM7UUFDdEMsc0JBQWlCLEdBQVMsS0FBSyxDQUFDO0lBdUY1QyxDQUFDO0lBckZpQiw4QkFBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLGtCQUFrQixFQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsU0FBUztJQUNELGlDQUFJLEdBQVo7UUFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFDRCxRQUFRO0lBQ0EscUNBQVEsR0FBaEI7UUFBQSxpQkFnQkM7UUFmRyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUMseUJBQVcsQ0FBQyxTQUFTLEVBQUMsVUFBQyxLQUFZLEVBQUUsTUFBbUI7WUFDdkYsSUFBRyxLQUFLLEVBQUM7Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsT0FBTzthQUNWO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ25DLEtBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNwQixJQUFJLElBQUksR0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3JCLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUM1QixJQUFJLFFBQVEsR0FBQyxJQUFJLGVBQWUsRUFBRSxDQUFDO2dCQUNuQyxRQUFRLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2hEO1lBQ0QsS0FBSSxDQUFDLGlCQUFpQixHQUFDLElBQUksQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxZQUFZO0lBQ0wsK0NBQWtCLEdBQXpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDbEMsQ0FBQztJQUNELHNCQUFzQjtJQUNmLCtDQUFrQixHQUF6QixVQUEwQixFQUFTO1FBQy9CLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNELGtCQUFrQjtJQUNYLDBDQUFhLEdBQXBCLFVBQXFCLEVBQVM7UUFDMUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUM7SUFDeEMsQ0FBQztJQUNELGtCQUFrQjtJQUNYLDBDQUFhLEdBQXBCLFVBQXFCLEVBQVM7UUFDMUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUM7SUFDeEMsQ0FBQztJQUNELGtCQUFrQjtJQUNYLHdDQUFXLEdBQWxCLFVBQW1CLEVBQVM7UUFDeEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDdEMsQ0FBQztJQUNELG1CQUFtQjtJQUNaLGdEQUFtQixHQUExQixVQUEyQixFQUFTO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUM7SUFDOUMsQ0FBQztJQUNELG1CQUFtQjtJQUNaLGdEQUFtQixHQUExQixVQUEyQixFQUFTO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUM7SUFDOUMsQ0FBQztJQUNELG1CQUFtQjtJQUNaLGdEQUFtQixHQUExQixVQUEyQixFQUFTO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUM7SUFDOUMsQ0FBQztJQUVELHFCQUFxQjtJQUNQLG9DQUFpQixHQUEvQjtRQUNJLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVELHlCQUF5QjtJQUV6QixrREFBcUIsR0FBckIsVUFBc0IsSUFBVyxFQUFDLEtBQVk7UUFDMUMsSUFBSSxJQUFJLEdBQW1CLElBQUksQ0FBQztRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUMsRUFBQyxDQUFDO1lBQ2xCLElBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxVQUFVLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxVQUFVLEVBQUM7Z0JBQzdDLElBQUksR0FBRyxDQUFDLENBQUM7YUFDWjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELHVDQUFVLEdBQVYsVUFBVyxJQUFXLEVBQUMsS0FBWTtRQUMvQixPQUFPLElBQUksR0FBQyxHQUFHLEdBQUMsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUF6RmMsNEJBQVMsR0FBdUIsSUFBSSxDQUFDO0lBMEZ4RCx5QkFBQztDQTNGRCxBQTJGQyxJQUFBO0FBM0ZZLGdEQUFrQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvYWRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0xvYWRpbmcvTG9hZE1hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uU3Bpcml0U2tpbGwge1xyXG4gICAgLyoq54G15a6g5oqA6IO9ICovXHJcbiAgICBwdWJsaWMgU3Bpcml0U2tpbGw6bnVtYmVyID0gMCA7XHJcbiAgICAvKirngbXlrqDnp43nsbsgKi9cclxuICAgIHB1YmxpYyBTcGlyaXRUeXBlOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5oqA6IO9562J57qnICovXHJcbiAgICBwdWJsaWMgU2tpbGxMZXZlbDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWGt+WNtOaXtumXtCAqL1xyXG4gICAgcHVibGljIENvb2xEb3duOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5oqA6IO95Y+C5pWwMSAqL1xyXG4gICAgcHVibGljIFNraWxsUGFyYW1ldGVyXzE6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmioDog73lj4LmlbAyICovXHJcbiAgICBwdWJsaWMgU2tpbGxQYXJhbWV0ZXJfMjpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaKgOiDveWPguaVsDMgKi9cclxuICAgIHB1YmxpYyBTa2lsbFBhcmFtZXRlcl8zOm51bWJlciA9IDAgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3Bpcml0U2tpbGxNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogU3Bpcml0U2tpbGxNYW5hZ2VyID0gbnVsbDtcclxuICAgIC8v5oqKanNvbuaVsOaNrui9rOWMluaIkG1hcOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBkYXRhOk1hcDxudW1iZXIsSnNvblNwaXJpdFNraWxsPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpTcGlyaXRTa2lsbE1hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBTcGlyaXRTa2lsbE1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSnNvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Yqg6L29anNvblxyXG4gICAgcHJpdmF0ZSBsb2FkSnNvbigpIHtcclxuICAgICAgICBMb2FkTWFuYWdlci5sb2FkSnNvbignU3Bpcml0U2tpbGwnLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uU3Bpcml0U2tpbGzmiJDlip8nKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhPW5ldyBNYXAoKTtcclxuICAgICAgICAgICAgbGV0IGpzb249YXNzZXRzLmpzb247XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGpzb24ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25EYXRhPW5ldyBKc29uU3Bpcml0U2tpbGwoKTtcclxuICAgICAgICAgICAgICAgIGpzb25EYXRhPWpzb25baV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KGpzb25EYXRhLlNwaXJpdFNraWxsLGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uU3Bpcml0U2tpbGwoaWQ6bnVtYmVyKTpKc29uU3Bpcml0U2tpbGwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNrueBteWuoOaKgOiDveiOt+WPlueBteWuoOenjeexuyAqL1xyXG4gICAgcHVibGljIGdldFNwaXJpdFR5cGUoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU3Bpcml0VHlwZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNrueBteWuoOaKgOiDveiOt+WPluaKgOiDveetiee6pyAqL1xyXG4gICAgcHVibGljIGdldFNraWxsTGV2ZWwoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU2tpbGxMZXZlbDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrueBteWuoOaKgOiDveiOt+WPluWGt+WNtOaXtumXtCAqL1xyXG4gICAgcHVibGljIGdldENvb2xEb3duKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkNvb2xEb3duO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u54G15a6g5oqA6IO96I635Y+W5oqA6IO95Y+C5pWwMSAqL1xyXG4gICAgcHVibGljIGdldFNraWxsUGFyYW1ldGVyXzEoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU2tpbGxQYXJhbWV0ZXJfMTtcclxuICAgIH1cclxuICAgIC8qKuagueaNrueBteWuoOaKgOiDveiOt+WPluaKgOiDveWPguaVsDIgKi9cclxuICAgIHB1YmxpYyBnZXRTa2lsbFBhcmFtZXRlcl8yKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlNraWxsUGFyYW1ldGVyXzI7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7ngbXlrqDmioDog73ojrflj5bmioDog73lj4LmlbAzICovXHJcbiAgICBwdWJsaWMgZ2V0U2tpbGxQYXJhbWV0ZXJfMyhpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Ta2lsbFBhcmFtZXRlcl8zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg54G15a6g5oqA6IO9Ki9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4U3Bpcml0U2tpbGwoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiA0MDM7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG4gICAgZ2V0SnNvbkJ5VHlwZUFuZExldmVsKHR5cGU6bnVtYmVyLGxldmVsOm51bWJlcik6SnNvblNwaXJpdFNraWxse1xyXG4gICAgICAgIGxldCBpbmZvOkpzb25TcGlyaXRTa2lsbCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgaWYodHlwZSA9PSB2LlNwaXJpdFR5cGUgJiYgbGV2ZWwgPT0gdi5Ta2lsbExldmVsKXtcclxuICAgICAgICAgICAgICAgIGluZm8gPSB2O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGluZm87XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2tpbGxJZCh0eXBlOm51bWJlcixsZXZlbDpudW1iZXIpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdHlwZSoxMDArbGV2ZWw7XHJcbiAgICB9XHJcbn1cclxuIl19