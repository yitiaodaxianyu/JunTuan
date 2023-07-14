
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Equipment/Data/EquipmentAttribute.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '56799XpdVRDX4Wdh8KYuSqp', 'EquipmentAttribute');
// Scripts/Equipment/Data/EquipmentAttribute.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentAttributeManager = exports.JsonEquipmentAttribute = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonEquipmentAttribute = /** @class */ (function () {
    function JsonEquipmentAttribute() {
        /**装备ID */
        this.Equipment_ID = 0;
        /**装备位置 */
        this.EquipmentPosition = 0;
        /**装备阶段 */
        this.Stage = 0;
        /**装备品质 */
        this.Quality = 0;
        /**基础生命值 */
        this.BaseHealth = 0;
        /**基础攻击力 */
        this.BaseAttack = 0;
        /**基础防御力 */
        this.BaseDefense = 0;
    }
    return JsonEquipmentAttribute;
}());
exports.JsonEquipmentAttribute = JsonEquipmentAttribute;
var EquipmentAttributeManager = /** @class */ (function () {
    function EquipmentAttributeManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    EquipmentAttributeManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new EquipmentAttributeManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    EquipmentAttributeManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    EquipmentAttributeManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('EquipmentAttribute', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonEquipmentAttribute成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonEquipmentAttribute();
                jsonData = json[i];
                _this.data.set(jsonData.Equipment_ID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    EquipmentAttributeManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    EquipmentAttributeManager.prototype.getJsonEquipmentAttribute = function (id) {
        return this.data.get(id);
    };
    /**根据装备ID获取装备位置 */
    EquipmentAttributeManager.prototype.getEquipmentPosition = function (id) {
        return this.data.get(id).EquipmentPosition;
    };
    /**根据装备ID获取装备阶段 */
    EquipmentAttributeManager.prototype.getStage = function (id) {
        return this.data.get(id).Stage;
    };
    /**根据装备ID获取装备品质 */
    EquipmentAttributeManager.prototype.getQuality = function (id) {
        return this.data.get(id).Quality;
    };
    /**根据装备ID获取基础生命值 */
    EquipmentAttributeManager.prototype.getBaseHealth = function (id) {
        return this.data.get(id).BaseHealth;
    };
    /**根据装备ID获取基础攻击力 */
    EquipmentAttributeManager.prototype.getBaseAttack = function (id) {
        return this.data.get(id).BaseAttack;
    };
    /**根据装备ID获取基础防御力 */
    EquipmentAttributeManager.prototype.getBaseDefense = function (id) {
        return this.data.get(id).BaseDefense;
    };
    /** 静态方法，获取最大的 装备ID*/
    EquipmentAttributeManager.getMaxEquipment_ID = function () {
        return 30431;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    EquipmentAttributeManager.getID = function (type, level) {
        return type * 100 + level + 30000;
        //=B4*100+C4+30000   装备位置   品质
    };
    //解析id，获得LevelType
    EquipmentAttributeManager.getEquipTypeById = function (id) {
        return Math.floor(id / 1000);
    };
    EquipmentAttributeManager.getMaxQuality = function () {
        return 6;
    };
    EquipmentAttributeManager.prototype.getMaxStage = function () {
        return 31;
    };
    EquipmentAttributeManager.prototype.getIsMaxStage = function (id) {
        var stage = this.getStage(id);
        return stage >= this.getMaxStage();
    };
    EquipmentAttributeManager._instance = null;
    return EquipmentAttributeManager;
}());
exports.EquipmentAttributeManager = EquipmentAttributeManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcRXF1aXBtZW50XFxEYXRhXFxFcXVpcG1lbnRBdHRyaWJ1dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseURBQXdEO0FBSXhEO0lBQUE7UUFDSSxVQUFVO1FBQ0gsaUJBQVksR0FBVSxDQUFDLENBQUU7UUFDaEMsVUFBVTtRQUNILHNCQUFpQixHQUFVLENBQUMsQ0FBRTtRQUNyQyxVQUFVO1FBQ0gsVUFBSyxHQUFVLENBQUMsQ0FBRTtRQUN6QixVQUFVO1FBQ0gsWUFBTyxHQUFVLENBQUMsQ0FBRTtRQUMzQixXQUFXO1FBQ0osZUFBVSxHQUFVLENBQUMsQ0FBRTtRQUM5QixXQUFXO1FBQ0osZUFBVSxHQUFVLENBQUMsQ0FBRTtRQUM5QixXQUFXO1FBQ0osZ0JBQVcsR0FBVSxDQUFDLENBQUU7SUFDbkMsQ0FBQztJQUFELDZCQUFDO0FBQUQsQ0FmQSxBQWVDLElBQUE7QUFmWSx3REFBc0I7QUFpQm5DO0lBQUE7UUFFSSxpQkFBaUI7UUFDVCxTQUFJLEdBQW9DLElBQUksQ0FBQztRQUM3QyxzQkFBaUIsR0FBUyxLQUFLLENBQUM7SUE4RjVDLENBQUM7SUE1RmlCLHFDQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUkseUJBQXlCLEVBQUUsQ0FBQztZQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCxTQUFTO0lBQ0Qsd0NBQUksR0FBWjtRQUNJLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUNELFFBQVE7SUFDQSw0Q0FBUSxHQUFoQjtRQUFBLGlCQWdCQztRQWZHLHlCQUFXLENB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O0lBQ2IsQ0FBQztJQUNELCtDQUFXLEdBQVg7UUFDSSxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRCxpREFBYSxHQUFiLFVBQWMsRUFBUztRQUNuQixJQUFJLEtBQUssR0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVCLE9BQU8sS0FBSyxJQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBaEdjLG1DQUFTLEdBQThCLElBQUksQ0FBQztJQWlHL0QsZ0NBQUM7Q0FsR0QsQUFrR0MsSUFBQTtBQWxHWSw4REFBeUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEVxdWlwVHlwZSB9IGZyb20gXCIuLi9FcXVpcENvbmZpZ1wiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uRXF1aXBtZW50QXR0cmlidXRlIHtcclxuICAgIC8qKuijheWkh0lEICovXHJcbiAgICBwdWJsaWMgRXF1aXBtZW50X0lEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6KOF5aSH5L2N572uICovXHJcbiAgICBwdWJsaWMgRXF1aXBtZW50UG9zaXRpb246bnVtYmVyID0gMCA7XHJcbiAgICAvKiroo4XlpIfpmLbmrrUgKi9cclxuICAgIHB1YmxpYyBTdGFnZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuijheWkh+WTgei0qCAqL1xyXG4gICAgcHVibGljIFF1YWxpdHk6bnVtYmVyID0gMCA7XHJcbiAgICAvKirln7rnoYDnlJ/lkb3lgLwgKi9cclxuICAgIHB1YmxpYyBCYXNlSGVhbHRoOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5Z+656GA5pS75Ye75YqbICovXHJcbiAgICBwdWJsaWMgQmFzZUF0dGFjazpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWfuuehgOmYsuW+oeWKmyAqL1xyXG4gICAgcHVibGljIEJhc2VEZWZlbnNlOm51bWJlciA9IDAgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRXF1aXBtZW50QXR0cmlidXRlTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6TWFwPG51bWJlcixKc29uRXF1aXBtZW50QXR0cmlidXRlPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpFcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgRXF1aXBtZW50QXR0cmlidXRlTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRKc29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liqDovb1qc29uXHJcbiAgICBwcml2YXRlIGxvYWRKc29uKCkge1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmxvYWRKc29uKCdFcXVpcG1lbnRBdHRyaWJ1dGUnLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uRXF1aXBtZW50QXR0cmlidXRl5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvbkVxdWlwbWVudEF0dHJpYnV0ZSgpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEuRXF1aXBtZW50X0lELGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uRXF1aXBtZW50QXR0cmlidXRlKGlkOm51bWJlcik6SnNvbkVxdWlwbWVudEF0dHJpYnV0ZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6KOF5aSHSUTojrflj5boo4XlpIfkvY3nva4gKi9cclxuICAgIHB1YmxpYyBnZXRFcXVpcG1lbnRQb3NpdGlvbihpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5FcXVpcG1lbnRQb3NpdGlvbjtcclxuICAgIH1cclxuICAgIC8qKuagueaNruijheWkh0lE6I635Y+W6KOF5aSH6Zi25q61ICovXHJcbiAgICBwdWJsaWMgZ2V0U3RhZ2UoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU3RhZ2U7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7oo4XlpIdJROiOt+WPluijheWkh+WTgei0qCAqL1xyXG4gICAgcHVibGljIGdldFF1YWxpdHkoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUXVhbGl0eTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruijheWkh0lE6I635Y+W5Z+656GA55Sf5ZG95YC8ICovXHJcbiAgICBwdWJsaWMgZ2V0QmFzZUhlYWx0aChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5CYXNlSGVhbHRoO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6KOF5aSHSUTojrflj5bln7rnoYDmlLvlh7vlipsgKi9cclxuICAgIHB1YmxpYyBnZXRCYXNlQXR0YWNrKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkJhc2VBdHRhY2s7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7oo4XlpIdJROiOt+WPluWfuuehgOmYsuW+oeWKmyAqL1xyXG4gICAgcHVibGljIGdldEJhc2VEZWZlbnNlKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkJhc2VEZWZlbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg6KOF5aSHSUQqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhFcXVpcG1lbnRfSUQoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAzMDQzMTtcclxuICAgIH1cclxuXHJcbiAgICAvL+S7peS4iuagvOW8j+e7n+S4gO+8jOS7peS4i+WGmeavj+S4qmpzb27mlbDmja7nmoTnibnmrorpnIDmsYJcclxuXHJcbiAgICBzdGF0aWMgZ2V0SUQodHlwZTpFcXVpcFR5cGUsbGV2ZWw6bnVtYmVyKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0eXBlKjEwMCtsZXZlbCszMDAwMDtcclxuICAgICAgICAvLz1CNCoxMDArQzQrMzAwMDAgICDoo4XlpIfkvY3nva4gICDlk4HotKhcclxuICAgIH1cclxuICAgIC8v6Kej5p6QaWTvvIzojrflvpdMZXZlbFR5cGVcclxuICAgIHN0YXRpYyBnZXRFcXVpcFR5cGVCeUlkKGlkOm51bWJlcik6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihpZC8xMDAwKTsgXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldE1heFF1YWxpdHkoKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIDY7XHJcbiAgICB9XHJcbiAgICBnZXRNYXhTdGFnZSgpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gMzE7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXNNYXhTdGFnZShpZDpudW1iZXIpOmJvb2xlYW57XHJcbiAgICAgICAgbGV0IHN0YWdlPXRoaXMuZ2V0U3RhZ2UoaWQpO1xyXG4gICAgICAgIHJldHVybiBzdGFnZT49dGhpcy5nZXRNYXhTdGFnZSgpO1xyXG4gICAgfVxyXG59Il19