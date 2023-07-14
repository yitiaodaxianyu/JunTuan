
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Data/SpiritLevelUp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7a73cnRWIdFIJsMtTuGS2v9', 'SpiritLevelUp');
// Scripts/Pet/Data/SpiritLevelUp.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpiritLevelUpManager = exports.JsonSpiritLevelUp = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonSpiritLevelUp = /** @class */ (function () {
    function JsonSpiritLevelUp() {
        /**灵宠等级 */
        this.Spirit = 0;
        /**兽粮消耗 */
        this.FoodCost = 0;
        /**金币消耗 */
        this.CoinCost = 0;
        /**被动技能1等级 */
        this.PassiveSkillLevel_1 = 0;
        /**主动技能等级 */
        this.ActiveSkillLevel = 0;
        /**被动技能2等级 */
        this.PassiveSkillLevel_2 = 0;
    }
    return JsonSpiritLevelUp;
}());
exports.JsonSpiritLevelUp = JsonSpiritLevelUp;
var SpiritLevelUpManager = /** @class */ (function () {
    function SpiritLevelUpManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    SpiritLevelUpManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SpiritLevelUpManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    SpiritLevelUpManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    SpiritLevelUpManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('SpiritLevelUp', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonSpiritLevelUp成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonSpiritLevelUp();
                jsonData = json[i];
                _this.data.set(jsonData.Spirit, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    SpiritLevelUpManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    SpiritLevelUpManager.prototype.getJsonSpiritLevelUp = function (id) {
        return this.data.get(id);
    };
    /**根据灵宠等级获取兽粮消耗 */
    SpiritLevelUpManager.prototype.getFoodCost = function (id) {
        return this.data.get(id).FoodCost;
    };
    /**根据灵宠等级获取金币消耗 */
    SpiritLevelUpManager.prototype.getCoinCost = function (id) {
        return this.data.get(id).CoinCost;
    };
    /**根据灵宠等级获取被动技能1等级 */
    SpiritLevelUpManager.prototype.getPassiveSkillLevel_1 = function (id) {
        return this.data.get(id).PassiveSkillLevel_1;
    };
    /**根据灵宠等级获取主动技能等级 */
    SpiritLevelUpManager.prototype.getActiveSkillLevel = function (id) {
        return this.data.get(id).ActiveSkillLevel;
    };
    /**根据灵宠等级获取被动技能2等级 */
    SpiritLevelUpManager.prototype.getPassiveSkillLevel_2 = function (id) {
        return this.data.get(id).PassiveSkillLevel_2;
    };
    /** 静态方法，获取最大的 灵宠等级*/
    SpiritLevelUpManager.getMaxSpirit = function () {
        return 200;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    SpiritLevelUpManager.prototype.getNowLevelAllCostCoin = function (level) {
        level -= 1;
        var sum = 0;
        for (; level > 0; level--) {
            sum += this.data.get(level).CoinCost;
        }
        return sum;
    };
    SpiritLevelUpManager.prototype.getNowLevelAllCostFood = function (level) {
        level -= 1;
        var sum = 0;
        for (; level > 0; level--) {
            sum += this.data.get(level).FoodCost;
        }
        return sum;
    };
    SpiritLevelUpManager._instance = null;
    return SpiritLevelUpManager;
}());
exports.SpiritLevelUpManager = SpiritLevelUpManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxEYXRhXFxTcGlyaXRMZXZlbFVwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUF3RDtBQUd4RDtJQUFBO1FBQ0ksVUFBVTtRQUNILFdBQU0sR0FBVSxDQUFDLENBQUU7UUFDMUIsVUFBVTtRQUNILGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsVUFBVTtRQUNILGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsYUFBYTtRQUNOLHdCQUFtQixHQUFVLENBQUMsQ0FBRTtRQUN2QyxZQUFZO1FBQ0wscUJBQWdCLEdBQVUsQ0FBQyxDQUFFO1FBQ3BDLGFBQWE7UUFDTix3QkFBbUIsR0FBVSxDQUFDLENBQUU7SUFDM0MsQ0FBQztJQUFELHdCQUFDO0FBQUQsQ0FiQSxBQWFDLElBQUE7QUFiWSw4Q0FBaUI7QUFlOUI7SUFBQTtRQUVJLGlCQUFpQjtRQUNULFNBQUksR0FBK0IsSUFBSSxDQUFDO1FBQ3hDLHNCQUFpQixHQUFTLEtBQUssQ0FBQztJQXdGNUMsQ0FBQztJQXRGaUIsZ0NBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxvQkFBb0IsRUFBRSxDQUFDO1lBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELFNBQVM7SUFDRCxtQ0FBSSxHQUFaO1FBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBQ0QsUUFBUTtJQUNBLHVDQUFRLEdBQWhCO1FBQUEsaUJBZ0JDO1FBZkcseUJBQVcsQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFDLHlCQUFXLENBQUMsU0FBUyxFQUFDLFVB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QUssQ0FBQyxDQUFDLFFBQVEsQ0FBQztTQUN4QztRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQXpGYyw4QkFBUyxHQUF5QixJQUFJLENBQUM7SUEyRjFELDJCQUFDO0NBNUZELEFBNEZDLElBQUE7QUE1Rlksb0RBQW9CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uU3Bpcml0TGV2ZWxVcCB7XHJcbiAgICAvKirngbXlrqDnrYnnuqcgKi9cclxuICAgIHB1YmxpYyBTcGlyaXQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlhb3nsq7mtojogJcgKi9cclxuICAgIHB1YmxpYyBGb29kQ29zdDpudW1iZXIgPSAwIDtcclxuICAgIC8qKumHkeW4gea2iOiAlyAqL1xyXG4gICAgcHVibGljIENvaW5Db3N0Om51bWJlciA9IDAgO1xyXG4gICAgLyoq6KKr5Yqo5oqA6IO9Meetiee6pyAqL1xyXG4gICAgcHVibGljIFBhc3NpdmVTa2lsbExldmVsXzE6bnVtYmVyID0gMCA7XHJcbiAgICAvKirkuLvliqjmioDog73nrYnnuqcgKi9cclxuICAgIHB1YmxpYyBBY3RpdmVTa2lsbExldmVsOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6KKr5Yqo5oqA6IO9Muetiee6pyAqL1xyXG4gICAgcHVibGljIFBhc3NpdmVTa2lsbExldmVsXzI6bnVtYmVyID0gMCA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTcGlyaXRMZXZlbFVwTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFNwaXJpdExldmVsVXBNYW5hZ2VyID0gbnVsbDtcclxuICAgIC8v5oqKanNvbuaVsOaNrui9rOWMluaIkG1hcOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBkYXRhOk1hcDxudW1iZXIsSnNvblNwaXJpdExldmVsVXA+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOlNwaXJpdExldmVsVXBNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgU3Bpcml0TGV2ZWxVcE1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSnNvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Yqg6L29anNvblxyXG4gICAgcHJpdmF0ZSBsb2FkSnNvbigpIHtcclxuICAgICAgICBMb2FkTWFuYWdlci5sb2FkSnNvbignU3Bpcml0TGV2ZWxVcCcsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25TcGlyaXRMZXZlbFVw5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvblNwaXJpdExldmVsVXAoKTtcclxuICAgICAgICAgICAgICAgIGpzb25EYXRhPWpzb25baV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KGpzb25EYXRhLlNwaXJpdCxqc29uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc19sb2FkX2NvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9veaYr+WQpuWujOaIkCAqL1xyXG4gICAgcHVibGljIGdldElzTG9hZENvbXBsZXRlZCgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzX2xvYWRfY29tcGxldGVkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uaWTlj7fojrflj5ZKc29u55qE5ZCE56eN5pWw5o2uICovXHJcbiAgICBwdWJsaWMgZ2V0SnNvblNwaXJpdExldmVsVXAoaWQ6bnVtYmVyKTpKc29uU3Bpcml0TGV2ZWxVcCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u54G15a6g562J57qn6I635Y+W5YW957Ku5raI6ICXICovXHJcbiAgICBwdWJsaWMgZ2V0Rm9vZENvc3QoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuRm9vZENvc3Q7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7ngbXlrqDnrYnnuqfojrflj5bph5HluIHmtojogJcgKi9cclxuICAgIHB1YmxpYyBnZXRDb2luQ29zdChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Db2luQ29zdDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrueBteWuoOetiee6p+iOt+WPluiiq+WKqOaKgOiDvTHnrYnnuqcgKi9cclxuICAgIHB1YmxpYyBnZXRQYXNzaXZlU2tpbGxMZXZlbF8xKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlBhc3NpdmVTa2lsbExldmVsXzE7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7ngbXlrqDnrYnnuqfojrflj5bkuLvliqjmioDog73nrYnnuqcgKi9cclxuICAgIHB1YmxpYyBnZXRBY3RpdmVTa2lsbExldmVsKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkFjdGl2ZVNraWxsTGV2ZWw7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7ngbXlrqDnrYnnuqfojrflj5booqvliqjmioDog70y562J57qnICovXHJcbiAgICBwdWJsaWMgZ2V0UGFzc2l2ZVNraWxsTGV2ZWxfMihpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5QYXNzaXZlU2tpbGxMZXZlbF8yO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg54G15a6g562J57qnKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4U3Bpcml0KCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gMjAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG5cclxuICAgIGdldE5vd0xldmVsQWxsQ29zdENvaW4obGV2ZWw6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgbGV2ZWwgLT0gMTtcclxuICAgICAgICBsZXQgc3VtID0gMDtcclxuICAgICAgICBmb3IoO2xldmVsPjA7bGV2ZWwtLSl7XHJcbiAgICAgICAgICAgIHN1bSArPSB0aGlzLmRhdGEuZ2V0KGxldmVsKS5Db2luQ29zdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN1bTtcclxuICAgIH1cclxuXHJcbiAgICBnZXROb3dMZXZlbEFsbENvc3RGb29kKGxldmVsOm51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIGxldmVsIC09IDE7XHJcbiAgICAgICAgbGV0IHN1bSA9IDA7XHJcbiAgICAgICAgZm9yKDtsZXZlbD4wO2xldmVsLS0pe1xyXG4gICAgICAgICAgICBzdW0gKz0gdGhpcy5kYXRhLmdldChsZXZlbCkuRm9vZENvc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdW07XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==