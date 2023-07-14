
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/JsonData/ExclusiveWeaponSkill.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '22672rep+1LQZ44Id3DYt3/', 'ExclusiveWeaponSkill');
// Scripts/JsonData/ExclusiveWeaponSkill.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExclusiveWeaponSkillManager = exports.JsonExclusiveWeaponSkill = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonExclusiveWeaponSkill = /** @class */ (function () {
    function JsonExclusiveWeaponSkill() {
        /**专武技能ID */
        this.ExclusiveWeaponSkillID = 0;
        /**技能等级 */
        this.SkillLevel = 0;
        /**英雄ID */
        this.HeroID = 0;
        /**技能参数1 */
        this.ExclusiveWeaponSkillValue_1 = 0;
        /**技能参数2 */
        this.ExclusiveWeaponSkillValue_2 = 0;
        /**技能参数3 */
        this.ExclusiveWeaponSkillValue_3 = 0;
        /**技能参数4 */
        this.ExclusiveWeaponSkillValue_4 = 0;
    }
    return JsonExclusiveWeaponSkill;
}());
exports.JsonExclusiveWeaponSkill = JsonExclusiveWeaponSkill;
var ExclusiveWeaponSkillManager = /** @class */ (function () {
    function ExclusiveWeaponSkillManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    ExclusiveWeaponSkillManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new ExclusiveWeaponSkillManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    ExclusiveWeaponSkillManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    ExclusiveWeaponSkillManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('ExclusiveWeaponSkill', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonExclusiveWeaponSkill成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonExclusiveWeaponSkill();
                jsonData = json[i];
                _this.data.set(jsonData.ExclusiveWeaponSkillID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    ExclusiveWeaponSkillManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    ExclusiveWeaponSkillManager.prototype.getJsonExclusiveWeaponSkill = function (id) {
        return this.data.get(id);
    };
    /**根据专武技能ID获取技能等级 */
    ExclusiveWeaponSkillManager.prototype.getSkillLevel = function (id) {
        return this.data.get(id).SkillLevel;
    };
    /**根据专武技能ID获取英雄ID */
    ExclusiveWeaponSkillManager.prototype.getHeroID = function (id) {
        return this.data.get(id).HeroID;
    };
    /**根据专武技能ID获取技能参数1 */
    ExclusiveWeaponSkillManager.prototype.getExclusiveWeaponSkillValue_1 = function (id) {
        return this.data.get(id).ExclusiveWeaponSkillValue_1;
    };
    /**根据专武技能ID获取技能参数2 */
    ExclusiveWeaponSkillManager.prototype.getExclusiveWeaponSkillValue_2 = function (id) {
        return this.data.get(id).ExclusiveWeaponSkillValue_2;
    };
    /**根据专武技能ID获取技能参数3 */
    ExclusiveWeaponSkillManager.prototype.getExclusiveWeaponSkillValue_3 = function (id) {
        return this.data.get(id).ExclusiveWeaponSkillValue_3;
    };
    /**根据专武技能ID获取技能参数4 */
    ExclusiveWeaponSkillManager.prototype.getExclusiveWeaponSkillValue_4 = function (id) {
        return this.data.get(id).ExclusiveWeaponSkillValue_4;
    };
    /** 静态方法，获取最大的 专武技能ID*/
    ExclusiveWeaponSkillManager.getMaxExclusiveWeaponSkillID = function () {
        return 120006;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    ExclusiveWeaponSkillManager.prototype.getJsonDataByHeroTypeAndStage = function (heroType, skillLevel) {
        var info;
        this.data.forEach(function (v, k) {
            if (v.HeroID == heroType && v.SkillLevel == skillLevel) {
                info = v;
            }
        });
        return info;
    };
    ExclusiveWeaponSkillManager.prototype.getId = function (heroId, skillLevel) {
        return heroId * 10000 + skillLevel;
    };
    ExclusiveWeaponSkillManager._instance = null;
    return ExclusiveWeaponSkillManager;
}());
exports.ExclusiveWeaponSkillManager = ExclusiveWeaponSkillManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSnNvbkRhdGFcXEV4Y2x1c2l2ZVdlYXBvblNraWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHNEQUFxRDtBQUVyRDtJQUFBO1FBQ0ksWUFBWTtRQUNMLDJCQUFzQixHQUFVLENBQUMsQ0FBRTtRQUMxQyxVQUFVO1FBQ0gsZUFBVSxHQUFVLENBQUMsQ0FBRTtRQUM5QixVQUFVO1FBQ0gsV0FBTSxHQUFVLENBQUMsQ0FBRTtRQUMxQixXQUFXO1FBQ0osZ0NBQTJCLEdBQVUsQ0FBQyxDQUFFO1FBQy9DLFdBQVc7UUFDSixnQ0FBMkIsR0FBVSxDQUFDLENBQUU7UUFDL0MsV0FBVztRQUNKLGdDQUEyQixHQUFVLENBQUMsQ0FBRTtRQUMvQyxXQUFXO1FBQ0osZ0NBQTJCLEdBQVUsQ0FBQyxDQUFFO0lBQ25ELENBQUM7SUFBRCwrQkFBQztBQUFELENBZkEsQUFlQyxJQUFBO0FBZlksNERBQXdCO0FBaUJyQztJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUFzQyxJQUFJLENBQUM7UUFDL0Msc0JBQWlCLEdBQVMsS0FBSyxDQUFDO0lBdUY1QyxDQUFDO0lBckZpQix1Q0FBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLDJCQUEyQixFQUFFLENBQUM7WUFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsU0FBUztJQUNELDBDQUFJLEdBQVo7UUFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFDRCxRQUFRO0lBQ0EsOENBQVEsR0FBaEI7UUFBQSxpQkFnQkM7UUFmRyx5QkFBVyxD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Q0gsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELDJDQUFLLEdBQUwsVUFBTSxNQUFhLEVBQUMsVUFBaUI7UUFDakMsT0FBTyxNQUFNLEdBQUMsS0FBSyxHQUFDLFVBQVUsQ0FBQztJQUNuQyxDQUFDO0lBekZjLHFDQUFTLEdBQWdDLElBQUksQ0FBQztJQTBGakUsa0NBQUM7Q0EzRkQsQUEyRkMsSUFBQTtBQTNGWSxrRUFBMkIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIZXJvX1R5cGUgfSBmcm9tIFwiLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25FeGNsdXNpdmVXZWFwb25Ta2lsbCB7XHJcbiAgICAvKirkuJPmrabmioDog71JRCAqL1xyXG4gICAgcHVibGljIEV4Y2x1c2l2ZVdlYXBvblNraWxsSUQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmioDog73nrYnnuqcgKi9cclxuICAgIHB1YmxpYyBTa2lsbExldmVsOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6Iux6ZuESUQgKi9cclxuICAgIHB1YmxpYyBIZXJvSUQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmioDog73lj4LmlbAxICovXHJcbiAgICBwdWJsaWMgRXhjbHVzaXZlV2VhcG9uU2tpbGxWYWx1ZV8xOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5oqA6IO95Y+C5pWwMiAqL1xyXG4gICAgcHVibGljIEV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMjpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaKgOiDveWPguaVsDMgKi9cclxuICAgIHB1YmxpYyBFeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlXzM6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmioDog73lj4LmlbA0ICovXHJcbiAgICBwdWJsaWMgRXhjbHVzaXZlV2VhcG9uU2tpbGxWYWx1ZV80Om51bWJlciA9IDAgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRXhjbHVzaXZlV2VhcG9uU2tpbGxNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogRXhjbHVzaXZlV2VhcG9uU2tpbGxNYW5hZ2VyID0gbnVsbDtcclxuICAgIC8v5oqKanNvbuaVsOaNrui9rOWMluaIkG1hcOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBkYXRhOk1hcDxudW1iZXIsSnNvbkV4Y2x1c2l2ZVdlYXBvblNraWxsPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpFeGNsdXNpdmVXZWFwb25Ta2lsbE1hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBFeGNsdXNpdmVXZWFwb25Ta2lsbE1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSnNvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Yqg6L29anNvblxyXG4gICAgcHJpdmF0ZSBsb2FkSnNvbigpIHtcclxuICAgICAgICBMb2FkTWFuYWdlci5sb2FkSnNvbignRXhjbHVzaXZlV2VhcG9uU2tpbGwnLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uRXhjbHVzaXZlV2VhcG9uU2tpbGzmiJDlip8nKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhPW5ldyBNYXAoKTtcclxuICAgICAgICAgICAgbGV0IGpzb249YXNzZXRzLmpzb247XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGpzb24ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25EYXRhPW5ldyBKc29uRXhjbHVzaXZlV2VhcG9uU2tpbGwoKTtcclxuICAgICAgICAgICAgICAgIGpzb25EYXRhPWpzb25baV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KGpzb25EYXRhLkV4Y2x1c2l2ZVdlYXBvblNraWxsSUQsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25FeGNsdXNpdmVXZWFwb25Ta2lsbChpZDpudW1iZXIpOkpzb25FeGNsdXNpdmVXZWFwb25Ta2lsbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5LiT5q2m5oqA6IO9SUTojrflj5bmioDog73nrYnnuqcgKi9cclxuICAgIHB1YmxpYyBnZXRTa2lsbExldmVsKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlNraWxsTGV2ZWw7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7kuJPmrabmioDog71JROiOt+WPluiLsembhElEICovXHJcbiAgICBwdWJsaWMgZ2V0SGVyb0lEKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkhlcm9JRDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruS4k+atpuaKgOiDvUlE6I635Y+W5oqA6IO95Y+C5pWwMSAqL1xyXG4gICAgcHVibGljIGdldEV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5FeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlXzE7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7kuJPmrabmioDog71JROiOt+WPluaKgOiDveWPguaVsDIgKi9cclxuICAgIHB1YmxpYyBnZXRFeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlXzIoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuRXhjbHVzaXZlV2VhcG9uU2tpbGxWYWx1ZV8yO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5LiT5q2m5oqA6IO9SUTojrflj5bmioDog73lj4LmlbAzICovXHJcbiAgICBwdWJsaWMgZ2V0RXhjbHVzaXZlV2VhcG9uU2tpbGxWYWx1ZV8zKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMztcclxuICAgIH1cclxuICAgIC8qKuagueaNruS4k+atpuaKgOiDvUlE6I635Y+W5oqA6IO95Y+C5pWwNCAqL1xyXG4gICAgcHVibGljIGdldEV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfNChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5FeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlXzQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDkuJPmrabmioDog71JRCovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1heEV4Y2x1c2l2ZVdlYXBvblNraWxsSUQoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAxMjAwMDY7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG4gICAgZ2V0SnNvbkRhdGFCeUhlcm9UeXBlQW5kU3RhZ2UoaGVyb1R5cGU6SGVyb19UeXBlLHNraWxsTGV2ZWw6bnVtYmVyKTpKc29uRXhjbHVzaXZlV2VhcG9uU2tpbGx7XHJcbiAgICAgICAgbGV0IGluZm87XHJcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgaWYodi5IZXJvSUQgPT0gaGVyb1R5cGUgJiYgdi5Ta2lsbExldmVsID09IHNraWxsTGV2ZWwpe1xyXG4gICAgICAgICAgICAgICAgaW5mbyA9IHY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gaW5mbztcclxuICAgIH1cclxuXHJcbiAgICBnZXRJZChoZXJvSWQ6bnVtYmVyLHNraWxsTGV2ZWw6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIGhlcm9JZCoxMDAwMCtza2lsbExldmVsO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==