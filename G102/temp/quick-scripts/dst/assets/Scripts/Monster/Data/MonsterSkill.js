
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/Data/MonsterSkill.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '45a6d7ct+BCypCjbb/TOc6j', 'MonsterSkill');
// Scripts/Monster/Data/MonsterSkill.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonsterSkillManager = exports.JsonMonsterSkill = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonMonsterSkill = /** @class */ (function () {
    function JsonMonsterSkill() {
        /**怪物技能ID */
        this.MonsterSkill = 0;
        /**怪物ID */
        this.MonsterId = 0;
        /**技能说明 */
        this.SkillIntro = 0;
        /**技能序号 */
        this.SkillNum = 0;
        /**技能等级 */
        this.SkillLevel = 0;
        /**初始冷却时间 */
        this.InitialColdDown = 0;
        /**冷却时间 */
        this.ColdDown = 0;
        /**施法距离 */
        this.CastingRange = 0;
        /**技能参数1 */
        this.SkillValue_1 = 0;
        /**技能参数2 */
        this.SkillValue_2 = 0;
        /**技能参数3 */
        this.SkillValue_3 = 0;
        /**技能参数4 */
        this.SkillValue_4 = 0;
    }
    return JsonMonsterSkill;
}());
exports.JsonMonsterSkill = JsonMonsterSkill;
var MonsterSkillManager = /** @class */ (function () {
    function MonsterSkillManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    MonsterSkillManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new MonsterSkillManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    MonsterSkillManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    MonsterSkillManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('MonsterSkill', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonMonsterSkill成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonMonsterSkill();
                jsonData = json[i];
                _this.data.set(jsonData.MonsterSkill, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    MonsterSkillManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    MonsterSkillManager.prototype.getJsonMonsterSkill = function (id) {
        return this.data.get(id);
    };
    /**根据怪物技能ID获取怪物ID */
    MonsterSkillManager.prototype.getMonsterId = function (id) {
        return this.data.get(id).MonsterId;
    };
    /**根据怪物技能ID获取技能说明 */
    MonsterSkillManager.prototype.getSkillIntro = function (id) {
        return this.data.get(id).SkillIntro;
    };
    /**根据怪物技能ID获取技能序号 */
    MonsterSkillManager.prototype.getSkillNum = function (id) {
        return this.data.get(id).SkillNum;
    };
    /**根据怪物技能ID获取技能等级 */
    MonsterSkillManager.prototype.getSkillLevel = function (id) {
        return this.data.get(id).SkillLevel;
    };
    /**根据怪物技能ID获取初始冷却时间 */
    MonsterSkillManager.prototype.getInitialColdDown = function (id) {
        return this.data.get(id).InitialColdDown;
    };
    /**根据怪物技能ID获取冷却时间 */
    MonsterSkillManager.prototype.getColdDown = function (id) {
        return this.data.get(id).ColdDown;
    };
    /**根据怪物技能ID获取施法距离 */
    MonsterSkillManager.prototype.getCastingRange = function (id) {
        return this.data.get(id).CastingRange;
    };
    /**根据怪物技能ID获取技能参数1 */
    MonsterSkillManager.prototype.getSkillValue_1 = function (id) {
        return this.data.get(id).SkillValue_1;
    };
    /**根据怪物技能ID获取技能参数2 */
    MonsterSkillManager.prototype.getSkillValue_2 = function (id) {
        return this.data.get(id).SkillValue_2;
    };
    /**根据怪物技能ID获取技能参数3 */
    MonsterSkillManager.prototype.getSkillValue_3 = function (id) {
        return this.data.get(id).SkillValue_3;
    };
    /**根据怪物技能ID获取技能参数4 */
    MonsterSkillManager.prototype.getSkillValue_4 = function (id) {
        return this.data.get(id).SkillValue_4;
    };
    /** 静态方法，获取最大的 怪物技能ID*/
    MonsterSkillManager.getMaxMonsterSkill = function () {
        return 30811201;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**
     *
     * @param monsterId 怪物ID
     * @param skillNum 技能编号，技能槽位
     * @param skillLevel 技能等级
     */
    MonsterSkillManager.prototype.getId = function (monsterId, skillNum, skillLevel) {
        return monsterId * 1000 + skillNum * 100 + skillLevel;
    };
    MonsterSkillManager._instance = null;
    return MonsterSkillManager;
}());
exports.MonsterSkillManager = MonsterSkillManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcRGF0YVxcTW9uc3RlclNraWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUF3RDtBQUV4RDtJQUFBO1FBQ0ksWUFBWTtRQUNMLGlCQUFZLEdBQVUsQ0FBQyxDQUFFO1FBQ2hDLFVBQVU7UUFDSCxjQUFTLEdBQVUsQ0FBQyxDQUFFO1FBQzdCLFVBQVU7UUFDSCxlQUFVLEdBQVUsQ0FBQyxDQUFFO1FBQzlCLFVBQVU7UUFDSCxhQUFRLEdBQVUsQ0FBQyxDQUFFO1FBQzVCLFVBQVU7UUFDSCxlQUFVLEdBQVUsQ0FBQyxDQUFFO1FBQzlCLFlBQVk7UUFDTCxvQkFBZSxHQUFVLENBQUMsQ0FBRTtRQUNuQyxVQUFVO1FBQ0gsYUFBUSxHQUFVLENBQUMsQ0FBRTtRQUM1QixVQUFVO1FBQ0gsaUJBQVksR0FBVSxDQUFDLENBQUU7UUFDaEMsV0FBVztRQUNKLGlCQUFZLEdBQVUsQ0FBQyxDQUFFO1FBQ2hDLFdBQVc7UUFDSixpQkFBWSxHQUFVLENBQUMsQ0FBRTtRQUNoQyxXQUFXO1FBQ0osaUJBQVksR0FBVSxDQUFDLENBQUU7UUFDaEMsV0FBVztRQUNKLGlCQUFZLEdBQVUsQ0FBQyxDQUFFO0lBQ3BDLENBQUM7SUFBRCx1QkFBQztBQUFELENBekJBLEFBeUJDLElBQUE7QUF6QlksNENBQWdCO0FBMkI3QjtJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUE4QixJQUFJLENBQUM7UUFDdkMsc0JBQWlCLEdBQVMsS0FBSyxDQUFDO0lBcUc1QyxDQUFDO0lBbkdpQiwrQkFBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLG1CQUFtQixFQUFFLENBQUM7WUFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNB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QVM7UUFDNUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUM7SUFDMUMsQ0FBQztJQUNELHFCQUFxQjtJQUNkLDZDQUFlLEdBQXRCLFVBQXVCLEVBQVM7UUFDNUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUM7SUFDMUMsQ0FBQztJQUNELHFCQUFxQjtJQUNkLDZDQUFlLEdBQXRCLFVBQXVCLEVBQVM7UUFDNUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUM7SUFDMUMsQ0FBQztJQUNELHFCQUFxQjtJQUNkLDZDQUFlLEdBQXRCLFVBQXVCLEVBQVM7UUFDNUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUM7SUFDMUMsQ0FBQztJQUVELHVCQUF1QjtJQUNULHNDQUFrQixHQUFoQztRQUNJLE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFDRCx5QkFBeUI7SUFDekI7Ozs7O09BS0c7SUFDSCxtQ0FBSyxHQUFMLFVBQU0sU0FBZ0IsRUFBQyxRQUFlLEVBQUMsVUFBaUI7UUFDcEQsT0FBTyxTQUFTLEdBQUMsSUFBSSxHQUFDLFFBQVEsR0FBQyxHQUFHLEdBQUMsVUFBVSxDQUFDO0lBQ2xELENBQUM7SUF2R2MsNkJBQVMsR0FBd0IsSUFBSSxDQUFDO0lBd0d6RCwwQkFBQztDQXpHRCxBQXlHQyxJQUFBO0FBekdZLGtEQUFtQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvYWRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0xvYWRpbmcvTG9hZE1hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uTW9uc3RlclNraWxsIHtcclxuICAgIC8qKuaAqueJqeaKgOiDvUlEICovXHJcbiAgICBwdWJsaWMgTW9uc3RlclNraWxsOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5oCq54mpSUQgKi9cclxuICAgIHB1YmxpYyBNb25zdGVySWQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmioDog73or7TmmI4gKi9cclxuICAgIHB1YmxpYyBTa2lsbEludHJvOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5oqA6IO95bqP5Y+3ICovXHJcbiAgICBwdWJsaWMgU2tpbGxOdW06bnVtYmVyID0gMCA7XHJcbiAgICAvKirmioDog73nrYnnuqcgKi9cclxuICAgIHB1YmxpYyBTa2lsbExldmVsOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5Yid5aeL5Ya35Y205pe26Ze0ICovXHJcbiAgICBwdWJsaWMgSW5pdGlhbENvbGREb3duOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5Ya35Y205pe26Ze0ICovXHJcbiAgICBwdWJsaWMgQ29sZERvd246bnVtYmVyID0gMCA7XHJcbiAgICAvKirmlr3ms5Xot53nprsgKi9cclxuICAgIHB1YmxpYyBDYXN0aW5nUmFuZ2U6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmioDog73lj4LmlbAxICovXHJcbiAgICBwdWJsaWMgU2tpbGxWYWx1ZV8xOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5oqA6IO95Y+C5pWwMiAqL1xyXG4gICAgcHVibGljIFNraWxsVmFsdWVfMjpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaKgOiDveWPguaVsDMgKi9cclxuICAgIHB1YmxpYyBTa2lsbFZhbHVlXzM6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmioDog73lj4LmlbA0ICovXHJcbiAgICBwdWJsaWMgU2tpbGxWYWx1ZV80Om51bWJlciA9IDAgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTW9uc3RlclNraWxsTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IE1vbnN0ZXJTa2lsbE1hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6TWFwPG51bWJlcixKc29uTW9uc3RlclNraWxsPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpNb25zdGVyU2tpbGxNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgTW9uc3RlclNraWxsTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRKc29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liqDovb1qc29uXHJcbiAgICBwcml2YXRlIGxvYWRKc29uKCkge1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmxvYWRKc29uKCdNb25zdGVyU2tpbGwnLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uTW9uc3RlclNraWxs5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvbk1vbnN0ZXJTa2lsbCgpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEuTW9uc3RlclNraWxsLGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uTW9uc3RlclNraWxsKGlkOm51bWJlcik6SnNvbk1vbnN0ZXJTa2lsbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5oCq54mp5oqA6IO9SUTojrflj5bmgKrnialJRCAqL1xyXG4gICAgcHVibGljIGdldE1vbnN0ZXJJZChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Nb25zdGVySWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7mgKrnianmioDog71JROiOt+WPluaKgOiDveivtOaYjiAqL1xyXG4gICAgcHVibGljIGdldFNraWxsSW50cm8oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU2tpbGxJbnRybztcclxuICAgIH1cclxuICAgIC8qKuagueaNruaAqueJqeaKgOiDvUlE6I635Y+W5oqA6IO95bqP5Y+3ICovXHJcbiAgICBwdWJsaWMgZ2V0U2tpbGxOdW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU2tpbGxOdW07XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7mgKrnianmioDog71JROiOt+WPluaKgOiDveetiee6pyAqL1xyXG4gICAgcHVibGljIGdldFNraWxsTGV2ZWwoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU2tpbGxMZXZlbDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruaAqueJqeaKgOiDvUlE6I635Y+W5Yid5aeL5Ya35Y205pe26Ze0ICovXHJcbiAgICBwdWJsaWMgZ2V0SW5pdGlhbENvbGREb3duKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkluaXRpYWxDb2xkRG93bjtcclxuICAgIH1cclxuICAgIC8qKuagueaNruaAqueJqeaKgOiDvUlE6I635Y+W5Ya35Y205pe26Ze0ICovXHJcbiAgICBwdWJsaWMgZ2V0Q29sZERvd24oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuQ29sZERvd247XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7mgKrnianmioDog71JROiOt+WPluaWveazlei3neemuyAqL1xyXG4gICAgcHVibGljIGdldENhc3RpbmdSYW5nZShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5DYXN0aW5nUmFuZ2U7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7mgKrnianmioDog71JROiOt+WPluaKgOiDveWPguaVsDEgKi9cclxuICAgIHB1YmxpYyBnZXRTa2lsbFZhbHVlXzEoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU2tpbGxWYWx1ZV8xO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5oCq54mp5oqA6IO9SUTojrflj5bmioDog73lj4LmlbAyICovXHJcbiAgICBwdWJsaWMgZ2V0U2tpbGxWYWx1ZV8yKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlNraWxsVmFsdWVfMjtcclxuICAgIH1cclxuICAgIC8qKuagueaNruaAqueJqeaKgOiDvUlE6I635Y+W5oqA6IO95Y+C5pWwMyAqL1xyXG4gICAgcHVibGljIGdldFNraWxsVmFsdWVfMyhpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Ta2lsbFZhbHVlXzM7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7mgKrnianmioDog71JROiOt+WPluaKgOiDveWPguaVsDQgKi9cclxuICAgIHB1YmxpYyBnZXRTa2lsbFZhbHVlXzQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU2tpbGxWYWx1ZV80O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg5oCq54mp5oqA6IO9SUQqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhNb25zdGVyU2tpbGwoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAzMDgxMTIwMTtcclxuICAgIH1cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBtb25zdGVySWQg5oCq54mpSURcclxuICAgICAqIEBwYXJhbSBza2lsbE51bSDmioDog73nvJblj7fvvIzmioDog73mp73kvY1cclxuICAgICAqIEBwYXJhbSBza2lsbExldmVsIOaKgOiDveetiee6p1xyXG4gICAgICovXHJcbiAgICBnZXRJZChtb25zdGVySWQ6bnVtYmVyLHNraWxsTnVtOm51bWJlcixza2lsbExldmVsOm51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiBtb25zdGVySWQqMTAwMCtza2lsbE51bSoxMDArc2tpbGxMZXZlbDtcclxuICAgIH1cclxufVxyXG4iXX0=