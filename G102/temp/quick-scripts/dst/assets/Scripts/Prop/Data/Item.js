
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Prop/Data/Item.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e7514N4EWdLTY5nLG1nZav7', 'Item');
// Scripts/Prop/Data/Item.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemManager = exports.JsonItem = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonItem = /** @class */ (function () {
    function JsonItem() {
        /**ID */
        this.ItemID = 0;
        /**名称文本 */
        this.NameTextId = 0;
        /**道具描述 */
        this.DiscripitionTextId = 0;
        /**类型 */
        this.Type = 0;
        /**品质框 */
        this.Quality = 0;
        /**星级 */
        this.Star = 0;
        /**引用图标 */
        this.QuoteIcon = 0;
    }
    return JsonItem;
}());
exports.JsonItem = JsonItem;
var ItemManager = /** @class */ (function () {
    function ItemManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    ItemManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new ItemManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    ItemManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    ItemManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('Item', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonItem成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonItem();
                jsonData = json[i];
                _this.data.set(jsonData.ItemID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    ItemManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    ItemManager.prototype.getJsonItem = function (id) {
        return this.data.get(id);
    };
    /**根据ID获取名称文本 */
    ItemManager.prototype.getNameTextId = function (id) {
        return this.data.get(id).NameTextId;
    };
    /**根据ID获取道具描述 */
    ItemManager.prototype.getDiscripitionTextId = function (id) {
        return this.data.get(id).DiscripitionTextId;
    };
    /**根据ID获取类型 */
    ItemManager.prototype.getType = function (id) {
        console.log("getType:" + id);
        return this.data.get(id).Type;
    };
    /**根据ID获取品质框 */
    ItemManager.prototype.getQuality = function (id) {
        return this.data.get(id).Quality;
    };
    /**根据ID获取星级 */
    ItemManager.prototype.getStar = function (id) {
        return this.data.get(id).Star;
    };
    /**根据ID获取引用图标 */
    ItemManager.prototype.getQuoteIcon = function (id) {
        return this.data.get(id).QuoteIcon;
    };
    /** 静态方法，获取最大的 ID*/
    ItemManager.getMaxItemID = function () {
        return 110012;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    ItemManager.prototype.getPropIdList = function () {
        var idList = new Array();
        this.data.forEach(function (jsonData, key) {
            if (jsonData.Type != 9) {
                idList.push(jsonData.ItemID);
            }
        });
        return idList;
    };
    ItemManager._instance = null;
    return ItemManager;
}());
exports.ItemManager = ItemManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUHJvcFxcRGF0YVxcSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFBd0Q7QUFFeEQ7SUFBQTtRQUNJLFFBQVE7UUFDRCxXQUFNLEdBQVUsQ0FBQyxDQUFFO1FBQzFCLFVBQVU7UUFDSCxlQUFVLEdBQVUsQ0FBQyxDQUFFO1FBQzlCLFVBQVU7UUFDSCx1QkFBa0IsR0FBVSxDQUFDLENBQUU7UUFDdEMsUUFBUTtRQUNELFNBQUksR0FBVSxDQUFDLENBQUU7UUFDeEIsU0FBUztRQUNGLFlBQU8sR0FBVSxDQUFDLENBQUU7UUFDM0IsUUFBUTtRQUNELFNBQUksR0FBVSxDQUFDLENBQUU7UUFDeEIsVUFBVTtRQUNILGNBQVMsR0FBVSxDQUFDLENBQUU7SUFDakMsQ0FBQztJQUFELGVBQUM7QUFBRCxDQWZBLEFBZUMsSUFBQTtBQWZZLDRCQUFRO0FBaUJyQjtJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUFzQixJQUFJLENBQUM7UUFDL0Isc0JBQWlCLEdBQVMsS0FBSyxDQUFDO0lBc0Y1QyxDQUFDO0lBcEZpQix1QkFBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLFdBQVcsRUFBRSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELFNBQVM7SUFDRCwwQkFBSSxHQUFaO1FBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBQ0QsUUFBUTtJQUNBLDhCQUFRLEdBQWhCO1FBQUEsaUJBZ0JDO1FBZkcseUJBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFDLHlC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LENBQUM7SUFDbEIsQ0FBQztJQXZGYyxxQkFBUyxHQUFnQixJQUFJLENBQUM7SUF5RmpELGtCQUFDO0NBMUZELEFBMEZDLElBQUE7QUExRlksa0NBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSnNvbkl0ZW0ge1xyXG4gICAgLyoqSUQgKi9cclxuICAgIHB1YmxpYyBJdGVtSUQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlkI3np7DmlofmnKwgKi9cclxuICAgIHB1YmxpYyBOYW1lVGV4dElkOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6YGT5YW35o+P6L+wICovXHJcbiAgICBwdWJsaWMgRGlzY3JpcGl0aW9uVGV4dElkOm51bWJlciA9IDAgO1xyXG4gICAgLyoq57G75Z6LICovXHJcbiAgICBwdWJsaWMgVHlwZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWTgei0qOahhiAqL1xyXG4gICAgcHVibGljIFF1YWxpdHk6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmmJ/nuqcgKi9cclxuICAgIHB1YmxpYyBTdGFyOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5byV55So5Zu+5qCHICovXHJcbiAgICBwdWJsaWMgUXVvdGVJY29uOm51bWJlciA9IDAgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSXRlbU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBJdGVtTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25JdGVtPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpJdGVtTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IEl0ZW1NYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ0l0ZW0nLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uSXRlbeaIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25JdGVtKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5JdGVtSUQsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25JdGVtKGlkOm51bWJlcik6SnNvbkl0ZW0ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNrklE6I635Y+W5ZCN56ew5paH5pysICovXHJcbiAgICBwdWJsaWMgZ2V0TmFtZVRleHRJZChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5OYW1lVGV4dElkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uSUTojrflj5bpgZPlhbfmj4/ov7AgKi9cclxuICAgIHB1YmxpYyBnZXREaXNjcmlwaXRpb25UZXh0SWQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuRGlzY3JpcGl0aW9uVGV4dElkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uSUTojrflj5bnsbvlnosgKi9cclxuICAgIHB1YmxpYyBnZXRUeXBlKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJnZXRUeXBlOlwiK2lkKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuVHlwZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNrklE6I635Y+W5ZOB6LSo5qGGICovXHJcbiAgICBwdWJsaWMgZ2V0UXVhbGl0eShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5RdWFsaXR5O1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uSUTojrflj5bmmJ/nuqcgKi9cclxuICAgIHB1YmxpYyBnZXRTdGFyKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlN0YXI7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5JROiOt+WPluW8leeUqOWbvuaghyAqL1xyXG4gICAgcHVibGljIGdldFF1b3RlSWNvbihpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5RdW90ZUljb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCBJRCovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1heEl0ZW1JRCgpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDExMDAxMjtcclxuICAgIH1cclxuXHJcbiAgICAvL+S7peS4iuagvOW8j+e7n+S4gO+8jOS7peS4i+WGmeavj+S4qmpzb27mlbDmja7nmoTnibnmrorpnIDmsYJcclxuXHJcbiAgICBwdWJsaWMgZ2V0UHJvcElkTGlzdCgpOm51bWJlcltde1xyXG4gICAgICAgIGxldCBpZExpc3Q9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKGpzb25EYXRhLGtleSk9PntcclxuICAgICAgICAgICAgaWYoanNvbkRhdGEuVHlwZSE9OSl7XHJcbiAgICAgICAgICAgICAgICBpZExpc3QucHVzaChqc29uRGF0YS5JdGVtSUQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGlkTGlzdDtcclxuICAgIH1cclxuXHJcbn1cclxuIl19