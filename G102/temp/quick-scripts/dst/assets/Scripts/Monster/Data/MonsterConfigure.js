
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/Data/MonsterConfigure.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8db92DLE4tOaZ5WwTNrxe5j', 'MonsterConfigure');
// Scripts/Monster/Data/MonsterConfigure.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonsterConfigureManager = exports.JsonMonsterConfigure = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonMonsterConfigure = /** @class */ (function () {
    function JsonMonsterConfigure() {
        /**怪物ID */
        this.MonsterId = 0;
        /**怪物种类 */
        this.MonsterClass = 0;
        /**皮肤 */
        this.Skin = 0;
        /**强度类型 */
        this.StrengthType = 0;
        /**怪物名文本 */
        this.NameTextId = 0;
        /**介绍文本 */
        this.IntroTextId = 0;
        /**移速 */
        this.Speed = 0;
        /**攻击方式 */
        this.AttackMode = 0;
        /**攻击距离 */
        this.AttackDistance = 0;
        /**基础攻速 */
        this.AttackSpeed = 0;
        /**缩放倍率 */
        this.Scale = 0;
        /**怪物间隔 */
        this.MonsterSpacing = 0;
        /**技能数量 */
        this.SkillNum = 0;
    }
    return JsonMonsterConfigure;
}());
exports.JsonMonsterConfigure = JsonMonsterConfigure;
var MonsterConfigureManager = /** @class */ (function () {
    function MonsterConfigureManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    MonsterConfigureManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new MonsterConfigureManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    MonsterConfigureManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    MonsterConfigureManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('MonsterConfigure', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonMonsterConfigure成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonMonsterConfigure();
                jsonData = json[i];
                _this.data.set(jsonData.MonsterId, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    MonsterConfigureManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    MonsterConfigureManager.prototype.getJsonMonsterConfigure = function (id) {
        return this.data.get(id);
    };
    /**根据怪物ID获取怪物种类 */
    MonsterConfigureManager.prototype.getMonsterClass = function (id) {
        return this.data.get(id).MonsterClass;
    };
    /**根据怪物ID获取皮肤 */
    MonsterConfigureManager.prototype.getSkin = function (id) {
        return this.data.get(id).Skin;
    };
    /**根据怪物ID获取强度类型 */
    MonsterConfigureManager.prototype.getStrengthType = function (id) {
        return this.data.get(id).StrengthType;
    };
    /**根据怪物ID获取怪物名文本 */
    MonsterConfigureManager.prototype.getNameTextId = function (id) {
        return this.data.get(id).NameTextId;
    };
    /**根据怪物ID获取介绍文本 */
    MonsterConfigureManager.prototype.getIntroTextId = function (id) {
        return this.data.get(id).IntroTextId;
    };
    /**根据怪物ID获取移速 */
    MonsterConfigureManager.prototype.getSpeed = function (id) {
        return this.data.get(id).Speed;
    };
    /**根据怪物ID获取攻击方式 */
    MonsterConfigureManager.prototype.getAttackMode = function (id) {
        return this.data.get(id).AttackMode;
    };
    /**根据怪物ID获取攻击距离 */
    MonsterConfigureManager.prototype.getAttackDistance = function (id) {
        return this.data.get(id).AttackDistance;
    };
    /**根据怪物ID获取基础攻速 */
    MonsterConfigureManager.prototype.getAttackSpeed = function (id) {
        return this.data.get(id).AttackSpeed;
    };
    /**根据怪物ID获取缩放倍率 */
    MonsterConfigureManager.prototype.getScale = function (id) {
        return this.data.get(id).Scale;
    };
    /**根据怪物ID获取怪物间隔 */
    MonsterConfigureManager.prototype.getMonsterSpacing = function (id) {
        return this.data.get(id).MonsterSpacing;
    };
    /**根据怪物ID获取技能数量 */
    MonsterConfigureManager.prototype.getSkillNum = function (id) {
        return this.data.get(id).SkillNum;
    };
    /** 静态方法，获取最大的 怪物ID*/
    MonsterConfigureManager.getMaxMonsterId = function () {
        return 30871;
    };
    MonsterConfigureManager._instance = null;
    return MonsterConfigureManager;
}());
exports.MonsterConfigureManager = MonsterConfigureManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcRGF0YVxcTW9uc3RlckNvbmZpZ3VyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFBd0Q7QUFHeEQ7SUFBQTtRQUNJLFVBQVU7UUFDSCxjQUFTLEdBQVUsQ0FBQyxDQUFFO1FBQzdCLFVBQVU7UUFDSCxpQkFBWSxHQUFVLENBQUMsQ0FBRTtRQUNoQyxRQUFRO1FBQ0QsU0FBSSxHQUFVLENBQUMsQ0FBRTtRQUN4QixVQUFVO1FBQ0gsaUJBQVksR0FBVSxDQUFDLENBQUU7UUFDaEMsV0FBVztRQUNKLGVBQVUsR0FBVSxDQUFDLENBQUU7UUFDOUIsVUFBVTtRQUNILGdCQUFXLEdBQVUsQ0FBQyxDQUFFO1FBQy9CLFFBQVE7UUFDRCxVQUFLLEdBQVUsQ0FBQyxDQUFFO1FBQ3pCLFVBQVU7UUFDSCxlQUFVLEdBQVUsQ0FBQyxDQUFFO1FBQzlCLFVBQVU7UUFDSCxtQkFBYyxHQUFVLENBQUMsQ0FBRTtRQUNsQyxVQUFVO1FBQ0gsZ0JBQVcsR0FBVSxDQUFDLENBQUU7UUFDL0IsVUFBVTtRQUNILFVBQUssR0FBVSxDQUFDLENBQUU7UUFDekIsVUFBVTtRQUNILG1CQUFjLEdBQVUsQ0FBQyxDQUFFO1FBQ2xDLFVBQVU7UUFDSCxhQUFRLEdBQVUsQ0FBQyxDQUFFO0lBQ2hDLENBQUM7SUFBRCwyQkFBQztBQUFELENBM0JBLEFBMkJDLElBQUE7QUEzQlksb0RBQW9CO0FBNkJqQztJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUFrQyxJQUFJLENBQUM7UUFDM0Msc0JBQWlCLEdBQVMsS0FBSyxDQUFDO1FBaUd4Qyx5QkFBeUI7SUFHN0IsQ0FBQztJQWxHaUIsbUNBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSx1QkFBdUIsRUFBRSxDQUFDO1lBQzdDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELFNBQVM7SUFDRCxzQ0FBSSxHQUFaO1FBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBQ0QsUUFBUTtJQUNBLDBDQUFRLEdBQWhCO1FBQUEsaUJBZ0JDO1FBZkcseUJBQVcsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEVBQUMseUJBQVcsQ0FBQyxTQUFTLEVBQUMsVUFBQyxLQUFZLEVBQUUsTUFBbUI7WUFDNUYsSUFBRyxLQUFLLEVBQUM7Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsT0FBTzthQUNWO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQ3hDLEtBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNwQixJQUFJLElBQUksR0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3JCLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUM1QixJQUFJLFFBQVEsR0FBQyxJQUFJLG9CQUFvQixFQUFFLENBQUM7Z0JBQ3hDLFFBQVEsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUMsUUFBUSxDQUFDLENBQUM7YUFDOUM7WUFDRCxLQUFJLENBQUMsaUJBQWlCLEdBQUMsSUFBSSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFlBQVk7SUFDTCxvREFBa0IsR0FBekI7UUFDSSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNsQyxDQUFDO0lBQ0Qsc0JBQXNCO0lBQ2YseURBQXVCLEdBQTlCLFVBQStCLEVBQVM7UUFDcEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0Qsa0JBQWtCO0lBQ1gsaURBQWUsR0FBdEIsVUFBdUIsRUFBUztRQUM1QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQztJQUMxQyxDQUFDO0lBQ0QsZ0JBQWdCO0lBQ1QseUNBQU8sR0FBZCxVQUFlLEVBQVM7UUFDcEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDbEMsQ0FBQztJQUNELGtCQUFrQjtJQUNYLGlEQUFlLEdBQXRCLFVBQXVCLEVBQVM7UUFFNUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUM7SUFDMUMsQ0FBQztJQUNELG1CQUFtQjtJQUNaLCtDQUFhLEdBQXBCLFVBQXFCLEVBQVM7UUFDMUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUM7SUFDeEMsQ0FBQztJQUNELGtCQUFrQjtJQUNYLGdEQUFjLEdBQXJCLFVBQXNCLEVBQVM7UUFDM0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUM7SUFDekMsQ0FBQztJQUNELGdCQUFnQjtJQUNULDBDQUFRLEdBQWYsVUFBZ0IsRUFBUztRQUNyQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNuQyxDQUFDO0lBQ0Qsa0JBQWtCO0lBQ1gsK0NBQWEsR0FBcEIsVUFBcUIsRUFBUztRQUMxQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQztJQUN4QyxDQUFDO0lBQ0Qsa0JBQWtCO0lBQ1gsbURBQWlCLEdBQXhCLFVBQXlCLEVBQVM7UUFDOUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUM7SUFDNUMsQ0FBQztJQUNELGtCQUFrQjtJQUNYLGdEQUFjLEdBQXJCLFVBQXNCLEVBQVM7UUFDM0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUM7SUFDekMsQ0FBQztJQUNELGtCQUFrQjtJQUNYLDBDQUFRLEdBQWYsVUFBZ0IsRUFBUztRQUNyQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNuQyxDQUFDO0lBQ0Qsa0JBQWtCO0lBQ1gsbURBQWlCLEdBQXhCLFVBQXlCLEVBQVM7UUFDOUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUM7SUFDNUMsQ0FBQztJQUNELGtCQUFrQjtJQUNYLDZDQUFXLEdBQWxCLFVBQW1CLEVBQVM7UUFDeEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDdEMsQ0FBQztJQUVELHFCQUFxQjtJQUNQLHVDQUFlLEdBQTdCO1FBQ0ksT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQWxHYyxpQ0FBUyxHQUE0QixJQUFJLENBQUM7SUF1RzdELDhCQUFDO0NBeEdELEFBd0dDLElBQUE7QUF4R1ksMERBQXVCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uTW9uc3RlckNvbmZpZ3VyZSB7XHJcbiAgICAvKirmgKrnialJRCAqL1xyXG4gICAgcHVibGljIE1vbnN0ZXJJZDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaAqueJqeenjeexuyAqL1xyXG4gICAgcHVibGljIE1vbnN0ZXJDbGFzczpudW1iZXIgPSAwIDtcclxuICAgIC8qKuearuiCpCAqL1xyXG4gICAgcHVibGljIFNraW46bnVtYmVyID0gMCA7XHJcbiAgICAvKirlvLrluqbnsbvlnosgKi9cclxuICAgIHB1YmxpYyBTdHJlbmd0aFR5cGU6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmgKrnianlkI3mlofmnKwgKi9cclxuICAgIHB1YmxpYyBOYW1lVGV4dElkOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5LuL57uN5paH5pysICovXHJcbiAgICBwdWJsaWMgSW50cm9UZXh0SWQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirnp7vpgJ8gKi9cclxuICAgIHB1YmxpYyBTcGVlZDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaUu+WHu+aWueW8jyAqL1xyXG4gICAgcHVibGljIEF0dGFja01vZGU6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmlLvlh7vot53nprsgKi9cclxuICAgIHB1YmxpYyBBdHRhY2tEaXN0YW5jZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWfuuehgOaUu+mAnyAqL1xyXG4gICAgcHVibGljIEF0dGFja1NwZWVkOm51bWJlciA9IDAgO1xyXG4gICAgLyoq57yp5pS+5YCN546HICovXHJcbiAgICBwdWJsaWMgU2NhbGU6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmgKrnianpl7TpmpQgKi9cclxuICAgIHB1YmxpYyBNb25zdGVyU3BhY2luZzpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaKgOiDveaVsOmHjyAqL1xyXG4gICAgcHVibGljIFNraWxsTnVtOm51bWJlciA9IDAgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBNb25zdGVyQ29uZmlndXJlTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25Nb25zdGVyQ29uZmlndXJlPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpNb25zdGVyQ29uZmlndXJlTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ01vbnN0ZXJDb25maWd1cmUnLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uTW9uc3RlckNvbmZpZ3VyZeaIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25Nb25zdGVyQ29uZmlndXJlKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5Nb25zdGVySWQsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25Nb25zdGVyQ29uZmlndXJlKGlkOm51bWJlcik6SnNvbk1vbnN0ZXJDb25maWd1cmUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruaAqueJqUlE6I635Y+W5oCq54mp56eN57G7ICovXHJcbiAgICBwdWJsaWMgZ2V0TW9uc3RlckNsYXNzKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLk1vbnN0ZXJDbGFzcztcclxuICAgIH1cclxuICAgIC8qKuagueaNruaAqueJqUlE6I635Y+W55qu6IKkICovXHJcbiAgICBwdWJsaWMgZ2V0U2tpbihpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Ta2luO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5oCq54mpSUTojrflj5blvLrluqbnsbvlnosgKi9cclxuICAgIHB1YmxpYyBnZXRTdHJlbmd0aFR5cGUoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5TdHJlbmd0aFR5cGU7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7mgKrnialJROiOt+WPluaAqueJqeWQjeaWh+acrCAqL1xyXG4gICAgcHVibGljIGdldE5hbWVUZXh0SWQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuTmFtZVRleHRJZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruaAqueJqUlE6I635Y+W5LuL57uN5paH5pysICovXHJcbiAgICBwdWJsaWMgZ2V0SW50cm9UZXh0SWQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuSW50cm9UZXh0SWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7mgKrnialJROiOt+WPluenu+mAnyAqL1xyXG4gICAgcHVibGljIGdldFNwZWVkKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlNwZWVkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5oCq54mpSUTojrflj5bmlLvlh7vmlrnlvI8gKi9cclxuICAgIHB1YmxpYyBnZXRBdHRhY2tNb2RlKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkF0dGFja01vZGU7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7mgKrnialJROiOt+WPluaUu+WHu+i3neemuyAqL1xyXG4gICAgcHVibGljIGdldEF0dGFja0Rpc3RhbmNlKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkF0dGFja0Rpc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5oCq54mpSUTojrflj5bln7rnoYDmlLvpgJ8gKi9cclxuICAgIHB1YmxpYyBnZXRBdHRhY2tTcGVlZChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5BdHRhY2tTcGVlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruaAqueJqUlE6I635Y+W57yp5pS+5YCN546HICovXHJcbiAgICBwdWJsaWMgZ2V0U2NhbGUoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU2NhbGU7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7mgKrnialJROiOt+WPluaAqueJqemXtOmalCAqL1xyXG4gICAgcHVibGljIGdldE1vbnN0ZXJTcGFjaW5nKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLk1vbnN0ZXJTcGFjaW5nO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5oCq54mpSUTojrflj5bmioDog73mlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXRTa2lsbE51bShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Ta2lsbE51bTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6Z2Z5oCB5pa55rOV77yM6I635Y+W5pyA5aSn55qEIOaAqueJqUlEKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4TW9uc3RlcklkKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gMzA4NzE7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG5cclxufVxyXG4iXX0=