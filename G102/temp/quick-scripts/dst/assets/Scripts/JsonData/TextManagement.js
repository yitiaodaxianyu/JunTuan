
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/JsonData/TextManagement.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e32d11+9YtOtotlGh9P0XGw', 'TextManagement');
// Scripts/JsonData/TextManagement.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextManagementManager = exports.JsonTextManagement = void 0;
var Constants_1 = require("../Constants");
var LoadManager_1 = require("../Loading/LoadManager");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var UserData_1 = require("../UserData");
var JsonTextManagement = /** @class */ (function () {
    function JsonTextManagement() {
        /**文本ID */
        this.Text_ID = 0;
        /**英语 */
        this.English = '';
        /**汉语 */
        this.Chinese = '';
        /**印尼语 */
        this.Indonesian = '';
        /**俄语 */
        this.Russian = '';
        /**泰语 */
        this.Thai = '';
        /**韩国 */
        this.Korea = '';
    }
    return JsonTextManagement;
}());
exports.JsonTextManagement = JsonTextManagement;
var TextManagementManager = /** @class */ (function () {
    function TextManagementManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    TextManagementManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new TextManagementManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    TextManagementManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    TextManagementManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('TextManagement', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonTextManagement成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonTextManagement();
                jsonData = json[i];
                _this.data.set(jsonData.Text_ID, jsonData);
            }
            _this.is_load_completed = true;
            UserData_1.default.getInstance().HttpPostCheckVersion();
        });
    };
    /**加载是否完成 */
    TextManagementManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    TextManagementManager.prototype.getJsonTextManagement = function (id) {
        return this.data.get(id);
    };
    /**根据文本ID获取英语 */
    TextManagementManager.prototype.getEnglish = function (id) {
        return this.data.get(id).English;
    };
    /**根据文本ID获取汉语 */
    TextManagementManager.prototype.getChinese = function (id) {
        return this.data.get(id).Chinese;
    };
    /**根据文本ID获取印尼语 */
    TextManagementManager.prototype.getIndonesian = function (id) {
        return this.data.get(id).Indonesian;
    };
    /**根据文本ID获取俄语 */
    TextManagementManager.prototype.getRussian = function (id) {
        return this.data.get(id).Russian;
    };
    /**根据文本ID获取泰语 */
    TextManagementManager.prototype.getThai = function (id) {
        return this.data.get(id).Thai;
    };
    /**根据文本ID获取韩国 */
    TextManagementManager.prototype.getKorea = function (id) {
        return this.data.get(id).Korea;
    };
    /** 静态方法，获取最大的 文本ID*/
    TextManagementManager.getMaxText_ID = function () {
        return 1600010;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /*获得富文本字符串
    * textId 文本id
    * value 数值
    * valueType 数值类型
    */
    TextManagementManager.getRichString = function (textId, value, valueType) {
        //获取文本内容，查找特殊符号~替换数值
        var textStr = LanguageManager_1.default.getInstance().getStrByTextId(textId);
        var valueStr = this.getValueUnit(value, valueType);
        //加上色值
        valueStr = this.getColorStr(valueStr);
        var newStr = textStr.replace("~", valueStr);
        return newStr;
    };
    /**根据数值和数值类型获得数值+单位字符串 */
    TextManagementManager.getValueUnit = function (value, type) {
        switch (type) {
            case Constants_1.ValueType.None: return value.toFixed(1) + Constants_1.ValueUnit.None;
            case Constants_1.ValueType.Percent: return (value * 100).toFixed(1) + Constants_1.ValueUnit.Percent;
            case Constants_1.ValueType.Thousandths: return (value * 100).toFixed(1) + Constants_1.ValueUnit.Thousandths;
            case Constants_1.ValueType.Second: return value.toFixed(1) + Constants_1.ValueUnit.Second;
        }
    };
    /**返回适合富文本的字符串，默认绿色 */
    TextManagementManager.getColorStr = function (str) {
        return '<color=green>' + str + '</color>';
    };
    TextManagementManager._instance = null;
    return TextManagementManager;
}());
exports.TextManagementManager = TextManagementManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSnNvbkRhdGFcXFRleHRNYW5hZ2VtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBDQUFvRDtBQUNwRCxzREFBcUQ7QUFDckQsb0VBQStEO0FBQy9ELHdDQUFtQztBQUVuQztJQUFBO1FBQ0ksVUFBVTtRQUNILFlBQU8sR0FBVSxDQUFDLENBQUU7UUFDM0IsUUFBUTtRQUNELFlBQU8sR0FBVSxFQUFFLENBQUU7UUFDNUIsUUFBUTtRQUNELFlBQU8sR0FBVSxFQUFFLENBQUU7UUFDNUIsU0FBUztRQUNGLGVBQVUsR0FBVSxFQUFFLENBQUU7UUFDL0IsUUFBUTtRQUNELFlBQU8sR0FBVSxFQUFFLENBQUU7UUFDNUIsUUFBUTtRQUNELFNBQUksR0FBVSxFQUFFLENBQUU7UUFDekIsUUFBUTtRQUNELFVBQUssR0FBVSxFQUFFLENBQUU7SUFDOUIsQ0FBQztJQUFELHlCQUFDO0FBQUQsQ0FmQSxBQWVDLElBQUE7QUFmWSxnREFBa0I7QUFpQi9CO0lBQUE7UUFFSSxpQkFBaUI7UUFDVCxTQUFJLEdBQWdDLElBQUksQ0FBQztRQUN6QyxzQkFBaUIsR0FBUyxLQUFLLENBQUM7SUF1RzVDLENBQUM7SUFyR2lCLGlDQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUkscUJBQXFCLEVBQUUsQ0FBQztZQUMzQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCxTQUFTO0lBQ0Qsb0NBQUksR0FBWjtRQUNJLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUNELFFBQVE7SUFDQSx3Q0FBUSxHQUFoQjtRQUFBLGlCQWlCQztRQWhCRyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBQyx5QkFBVyxDQUFDLFNBQVMsRUFBQyxVQUFDLEtBQVksRUFBRSxNQUFtQjtZQUMxRixJQUFHLEtBQUssRUFBQztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixPQUFPO2FBQ1Y7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDdEMsS0FBSSxDQUFDLElBQUksR0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLElBQUksSUFBSSxHQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDckIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQzVCLElBQUksUUFBUSxHQUFDLElBQUksa0JBQWtCLEVBQUUsQ0FBQztnQkFDdEMsUUFBUSxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBQyxRQUFRLENBQUMsQ0FBQzthQUM1QztZQUNELEtBQUksQ0FBQyxpQkFBaUIsR0FBQyxJQUFJLENBQUM7WUFDNUIsa0JBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQ2xELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFlBQVk7SUFDTCxrREFBa0IsR0FBekI7UUFDSSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNsQyxDQUFDO0lBQ0Qsc0JBQXNCO0lBQ2YscURBQXFCLEdBQTVCLFVBQTZCLEVBQVM7UUFDbEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsZ0JBQWdCO0lBQ1QsMENBQVUsR0FBakIsVUFBa0IsRUFBUztRQUN2QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUNyQyxDQUFDO0lBQ0QsZ0JBQWdCO0lBQ1QsMENBQVUsR0FBakIsVUFBa0IsRUFBUztRQUN2QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUNyQyxDQUFDO0lBQ0QsaUJBQWlCO0lBQ1YsNkNBQWEsR0FBcEIsVUFBcUIsRUFBUztRQUMxQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQztJQUN4QyxDQUFDO0lBQ0QsZ0JBQWdCO0lBQ1QsMENBQVUsR0FBakIsVUFBa0IsRUFBUztRQUN2QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUNyQyxDQUFDO0lBQ0QsZ0JBQWdCO0lBQ1QsdUNBQU8sR0FBZCxVQUFlLEVBQVM7UUFDcEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDbEMsQ0FBQztJQUNELGdCQUFnQjtJQUNULHdDQUFRLEdBQWYsVUFBZ0IsRUFBUztRQUNyQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNuQyxDQUFDO0lBRUQscUJBQXFCO0lBQ1AsbUNBQWEsR0FBM0I7UUFDSSxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQseUJBQXlCO0lBRXpCOzs7O01BSUU7SUFDSyxtQ0FBYSxHQUFwQixVQUFxQixNQUFhLEVBQUMsS0FBWSxFQUFDLFNBQW1CO1FBQy9ELG9CQUFvQjtRQUNwQixJQUFJLE9BQU8sR0FBQyx5QkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRSxJQUFJLFFBQVEsR0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBQyxTQUFTLENBQUMsQ0FBQztRQUNoRCxNQUFNO1FBQ04sUUFBUSxHQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsSUFBSSxNQUFNLEdBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUMsUUFBUSxDQUFDLENBQUM7UUFDekMsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVELHlCQUF5QjtJQUNsQixrQ0FBWSxHQUFuQixVQUFvQixLQUFZLEVBQUMsSUFBYztRQUMzQyxRQUFPLElBQUksRUFBQztZQUNSLEtBQUsscUJBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQSxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUMscUJBQVMsQ0FBQyxJQUFJLENBQUM7WUFDM0QsS0FBSyxxQkFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFBLE9BQU8sQ0FBQyxLQUFLLEdBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFDLHFCQUFTLENBQUMsT0FBTyxDQUFDO1lBQ3ZFLEtBQUsscUJBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQSxPQUFPLENBQUMsS0FBSyxHQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBQyxxQkFBUyxDQUFDLFdBQVcsQ0FBQztZQUMvRSxLQUFLLHFCQUFTLENBQUMsTUFBTSxDQUFDLENBQUEsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFDLHFCQUFTLENBQUMsTUFBTSxDQUFDO1NBQ2xFO0lBQ0wsQ0FBQztJQUNELHNCQUFzQjtJQUNmLGlDQUFXLEdBQWxCLFVBQW1CLEdBQVU7UUFDekIsT0FBTyxlQUFlLEdBQUMsR0FBRyxHQUFDLFVBQVUsQ0FBQztJQUMxQyxDQUFDO0lBekdjLCtCQUFTLEdBQTBCLElBQUksQ0FBQztJQTBHM0QsNEJBQUM7Q0EzR0QsQUEyR0MsSUFBQTtBQTNHWSxzREFBcUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWYWx1ZVR5cGUsIFZhbHVlVW5pdCB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgVXNlckRhdGEgZnJvbSBcIi4uL1VzZXJEYXRhXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSnNvblRleHRNYW5hZ2VtZW50IHtcclxuICAgIC8qKuaWh+acrElEICovXHJcbiAgICBwdWJsaWMgVGV4dF9JRDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuiLseivrSAqL1xyXG4gICAgcHVibGljIEVuZ2xpc2g6c3RyaW5nID0gJycgO1xyXG4gICAgLyoq5rGJ6K+tICovXHJcbiAgICBwdWJsaWMgQ2hpbmVzZTpzdHJpbmcgPSAnJyA7XHJcbiAgICAvKirljbDlsLzor60gKi9cclxuICAgIHB1YmxpYyBJbmRvbmVzaWFuOnN0cmluZyA9ICcnIDtcclxuICAgIC8qKuS/hOivrSAqL1xyXG4gICAgcHVibGljIFJ1c3NpYW46c3RyaW5nID0gJycgO1xyXG4gICAgLyoq5rOw6K+tICovXHJcbiAgICBwdWJsaWMgVGhhaTpzdHJpbmcgPSAnJyA7XHJcbiAgICAvKirpn6nlm70gKi9cclxuICAgIHB1YmxpYyBLb3JlYTpzdHJpbmcgPSAnJyA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0TWFuYWdlbWVudE1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBUZXh0TWFuYWdlbWVudE1hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6TWFwPG51bWJlcixKc29uVGV4dE1hbmFnZW1lbnQ+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOlRleHRNYW5hZ2VtZW50TWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IFRleHRNYW5hZ2VtZW50TWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRKc29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liqDovb1qc29uXHJcbiAgICBwcml2YXRlIGxvYWRKc29uKCkge1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmxvYWRKc29uKCdUZXh0TWFuYWdlbWVudCcsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25UZXh0TWFuYWdlbWVudOaIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25UZXh0TWFuYWdlbWVudCgpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEuVGV4dF9JRCxqc29uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc19sb2FkX2NvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgICAgICBVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLkh0dHBQb3N0Q2hlY2tWZXJzaW9uKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uVGV4dE1hbmFnZW1lbnQoaWQ6bnVtYmVyKTpKc29uVGV4dE1hbmFnZW1lbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruaWh+acrElE6I635Y+W6Iux6K+tICovXHJcbiAgICBwdWJsaWMgZ2V0RW5nbGlzaChpZDpudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5FbmdsaXNoO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5paH5pysSUTojrflj5bmsYnor60gKi9cclxuICAgIHB1YmxpYyBnZXRDaGluZXNlKGlkOm51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkNoaW5lc2U7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7mlofmnKxJROiOt+WPluWNsOWwvOivrSAqL1xyXG4gICAgcHVibGljIGdldEluZG9uZXNpYW4oaWQ6bnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuSW5kb25lc2lhbjtcclxuICAgIH1cclxuICAgIC8qKuagueaNruaWh+acrElE6I635Y+W5L+E6K+tICovXHJcbiAgICBwdWJsaWMgZ2V0UnVzc2lhbihpZDpudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5SdXNzaWFuO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5paH5pysSUTojrflj5bms7Dor60gKi9cclxuICAgIHB1YmxpYyBnZXRUaGFpKGlkOm51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlRoYWk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7mlofmnKxJROiOt+WPlumfqeWbvSAqL1xyXG4gICAgcHVibGljIGdldEtvcmVhKGlkOm51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLktvcmVhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg5paH5pysSUQqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhUZXh0X0lEKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gMTYwMDAxMDtcclxuICAgIH1cclxuXHJcbiAgICAvL+S7peS4iuagvOW8j+e7n+S4gO+8jOS7peS4i+WGmeavj+S4qmpzb27mlbDmja7nmoTnibnmrorpnIDmsYJcclxuXHJcbiAgICAvKuiOt+W+l+WvjOaWh+acrOWtl+espuS4slxyXG4gICAgKiB0ZXh0SWQg5paH5pysaWRcclxuICAgICogdmFsdWUg5pWw5YC8XHJcbiAgICAqIHZhbHVlVHlwZSDmlbDlgLznsbvlnotcclxuICAgICovXHJcbiAgICBzdGF0aWMgZ2V0UmljaFN0cmluZyh0ZXh0SWQ6bnVtYmVyLHZhbHVlOm51bWJlcix2YWx1ZVR5cGU6VmFsdWVUeXBlKTpzdHJpbmd7XHJcbiAgICAgICAgLy/ojrflj5bmlofmnKzlhoXlrrnvvIzmn6Xmib7nibnmrornrKblj7d+5pu/5o2i5pWw5YC8XHJcbiAgICAgICAgbGV0IHRleHRTdHI9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQodGV4dElkKTtcclxuICAgICAgICBsZXQgdmFsdWVTdHI9dGhpcy5nZXRWYWx1ZVVuaXQodmFsdWUsdmFsdWVUeXBlKTtcclxuICAgICAgICAvL+WKoOS4iuiJsuWAvFxyXG4gICAgICAgIHZhbHVlU3RyPXRoaXMuZ2V0Q29sb3JTdHIodmFsdWVTdHIpO1xyXG4gICAgICAgIGxldCBuZXdTdHI9dGV4dFN0ci5yZXBsYWNlKFwiflwiLHZhbHVlU3RyKTtcclxuICAgICAgICByZXR1cm4gbmV3U3RyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuagueaNruaVsOWAvOWSjOaVsOWAvOexu+Wei+iOt+W+l+aVsOWAvCvljZXkvY3lrZfnrKbkuLIgKi9cclxuICAgIHN0YXRpYyBnZXRWYWx1ZVVuaXQodmFsdWU6bnVtYmVyLHR5cGU6VmFsdWVUeXBlKTpzdHJpbmd7XHJcbiAgICAgICAgc3dpdGNoKHR5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIFZhbHVlVHlwZS5Ob25lOnJldHVybiB2YWx1ZS50b0ZpeGVkKDEpK1ZhbHVlVW5pdC5Ob25lO1xyXG4gICAgICAgICAgICBjYXNlIFZhbHVlVHlwZS5QZXJjZW50OnJldHVybiAodmFsdWUqMTAwKS50b0ZpeGVkKDEpK1ZhbHVlVW5pdC5QZXJjZW50O1xyXG4gICAgICAgICAgICBjYXNlIFZhbHVlVHlwZS5UaG91c2FuZHRoczpyZXR1cm4gKHZhbHVlKjEwMCkudG9GaXhlZCgxKStWYWx1ZVVuaXQuVGhvdXNhbmR0aHM7XHJcbiAgICAgICAgICAgIGNhc2UgVmFsdWVUeXBlLlNlY29uZDpyZXR1cm4gdmFsdWUudG9GaXhlZCgxKStWYWx1ZVVuaXQuU2Vjb25kO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKui/lOWbnumAguWQiOWvjOaWh+acrOeahOWtl+espuS4su+8jOm7mOiupOe7v+iJsiAqL1xyXG4gICAgc3RhdGljIGdldENvbG9yU3RyKHN0cjpzdHJpbmcpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gJzxjb2xvcj1ncmVlbj4nK3N0cisnPC9jb2xvcj4nO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==