
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
        if (this.data.get(id) == null) {
            return 3;
        }
        return this.data.get(id).Type;
    };
    /**根据ID获取品质框 */
    ItemManager.prototype.getQuality = function (id) {
        if (this.data.get(id) == null) {
            return 0;
        }
        return this.data.get(id).Quality;
    };
    /**根据ID获取星级 */
    ItemManager.prototype.getStar = function (id) {
        if (this.data.get(id) == null) {
            return 0;
        }
        return this.data.get(id).Star;
    };
    /**根据ID获取引用图标 */
    ItemManager.prototype.getQuoteIcon = function (id) {
        if (this.data.get(id) == null) {
            return 10001;
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUHJvcFxcRGF0YVxcSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFBd0Q7QUFFeEQ7SUFBQTtRQUNJLFFBQVE7UUFDRCxXQUFNLEdBQVUsQ0FBQyxDQUFFO1FBQzFCLFVBQVU7UUFDSCxlQUFVLEdBQVUsQ0FBQyxDQUFFO1FBQzlCLFVBQVU7UUFDSCx1QkFBa0IsR0FBVSxDQUFDLENBQUU7UUFDdEMsUUFBUTtRQUNELFNBQUksR0FBVSxDQUFDLENBQUU7UUFDeEIsU0FBUztRQUNGLFlBQU8sR0FBVSxDQUFDLENBQUU7UUFDM0IsUUFBUTtRQUNELFNBQUksR0FBVSxDQUFDLENBQUU7UUFDeEIsVUFBVTtRQUNILGNBQVMsR0FBVSxDQUFDLENBQUU7SUFDakMsQ0FBQztJQUFELGVBQUM7QUFBRCxDQWZBLEFBZUMsSUFBQTtBQWZZLDRCQUFRO0FBaUJyQjtJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUFzQixJQUFJLENBQUM7UUFDL0Isc0JBQWlCLEdBQVMsS0FBSyxDQUFDO0lBaUc1QyxDQUFDO0lBL0ZpQix1QkFBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLFdBQVcsRUFBRSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELFNBQVM7SUFDRCwwQkFBSSxHQUFaO1FBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBQ0QsUUFBUTtJQUNBLDhCQUFRLEdBQWhCO1FBQUEsaUJBZ0JDO1FBZkcseUJBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFDLHlCQUFXLENBQUMsU0FBUyxFQUFDLFVBQUMsS0FBWSxFQUFFLE1BQW1CO1lBQ2hGLElBQUcsS0FBSyxFQUFDO2dCQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLE9BQU87YUFDVjtZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDNUIsS0FBSSxDQUFDLElBQUksR0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLElBQUksSUFBSSxHQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDckIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQzVCLElBQUksUUFBUSxHQUFDLElBQUksUUFBUSxFQUFFLENBQUM7Z0JBQzVCLFFBQVEsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLENBQUM7YUFDM0M7WUFDRCxLQUFJLENBQUMsaUJBQWlCLEdBQUMsSUFBSSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFlBQVk7SUFDTCx3Q0FBa0IsR0FBekI7UUFDSSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNsQyxDQUFDO0lBQ0Qsc0JBQXNCO0lBQ2YsaUNBQVcsR0FBbEIsVUFBbUIsRUFBUztRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCxnQkFBZ0I7SUFDVCxtQ0FBYSxHQUFwQixVQUFxQixFQUFTO1FBQzFCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDO0lBQ3hDLENBQUM7SUFDRCxnQkFBZ0I7SUFDVCwyQ0FBcUIsR0FBNUIsVUFBNkIsRUFBUztRQUNsQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGtCQUFrQixDQUFDO0lBQ2hELENBQUM7SUFDRCxjQUFjO0lBQ1AsNkJBQU8sR0FBZCxVQUFlLEVBQVM7UUFDcEIsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBRSxJQUFJLEVBQUM7WUFDdkIsT0FBTyxDQUFDLENBQUM7U0FDWjtRQUVELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2xDLENBQUM7SUFDRCxlQUFlO0lBQ1IsZ0NBQVUsR0FBakIsVUFBa0IsRUFBUztRQUN2QixJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFFLElBQUksRUFBQztZQUN2QixPQUFPLENBQUMsQ0FBQztTQUNaO1FBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDckMsQ0FBQztJQUNELGNBQWM7SUFDUCw2QkFBTyxHQUFkLFVBQWUsRUFBUztRQUNwQixJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFFLElBQUksRUFBQztZQUN2QixPQUFPLENBQUMsQ0FBQztTQUNaO1FBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDbEMsQ0FBQztJQUNELGdCQUFnQjtJQUNULGtDQUFZLEdBQW5CLFVBQW9CLEVBQVM7UUFDekIsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBRSxJQUFJLEVBQUM7WUFDdkIsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsbUJBQW1CO0lBQ0wsd0JBQVksR0FBMUI7UUFDSSxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQseUJBQXlCO0lBRWxCLG1DQUFhLEdBQXBCO1FBQ0ksSUFBSSxNQUFNLEdBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLFFBQVEsRUFBQyxHQUFHO1lBQzNCLElBQUcsUUFBUSxDQUFDLElBQUksSUFBRSxDQUFDLEVBQUM7Z0JBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2hDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBbEdjLHFCQUFTLEdBQWdCLElBQUksQ0FBQztJQW9HakQsa0JBQUM7Q0FyR0QsQUFxR0MsSUFBQTtBQXJHWSxrQ0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvYWRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0xvYWRpbmcvTG9hZE1hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uSXRlbSB7XHJcbiAgICAvKipJRCAqL1xyXG4gICAgcHVibGljIEl0ZW1JRDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWQjeensOaWh+acrCAqL1xyXG4gICAgcHVibGljIE5hbWVUZXh0SWQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirpgZPlhbfmj4/ov7AgKi9cclxuICAgIHB1YmxpYyBEaXNjcmlwaXRpb25UZXh0SWQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirnsbvlnosgKi9cclxuICAgIHB1YmxpYyBUeXBlOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5ZOB6LSo5qGGICovXHJcbiAgICBwdWJsaWMgUXVhbGl0eTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaYn+e6pyAqL1xyXG4gICAgcHVibGljIFN0YXI6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlvJXnlKjlm77moIcgKi9cclxuICAgIHB1YmxpYyBRdW90ZUljb246bnVtYmVyID0gMCA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBJdGVtTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEl0ZW1NYW5hZ2VyID0gbnVsbDtcclxuICAgIC8v5oqKanNvbuaVsOaNrui9rOWMluaIkG1hcOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBkYXRhOk1hcDxudW1iZXIsSnNvbkl0ZW0+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkl0ZW1NYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgSXRlbU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSnNvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Yqg6L29anNvblxyXG4gICAgcHJpdmF0ZSBsb2FkSnNvbigpIHtcclxuICAgICAgICBMb2FkTWFuYWdlci5sb2FkSnNvbignSXRlbScsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25JdGVt5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvbkl0ZW0oKTtcclxuICAgICAgICAgICAgICAgIGpzb25EYXRhPWpzb25baV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KGpzb25EYXRhLkl0ZW1JRCxqc29uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc19sb2FkX2NvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9veaYr+WQpuWujOaIkCAqL1xyXG4gICAgcHVibGljIGdldElzTG9hZENvbXBsZXRlZCgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzX2xvYWRfY29tcGxldGVkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uaWTlj7fojrflj5ZKc29u55qE5ZCE56eN5pWw5o2uICovXHJcbiAgICBwdWJsaWMgZ2V0SnNvbkl0ZW0oaWQ6bnVtYmVyKTpKc29uSXRlbSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uSUTojrflj5blkI3np7DmlofmnKwgKi9cclxuICAgIHB1YmxpYyBnZXROYW1lVGV4dElkKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLk5hbWVUZXh0SWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5JROiOt+WPlumBk+WFt+aPj+i/sCAqL1xyXG4gICAgcHVibGljIGdldERpc2NyaXBpdGlvblRleHRJZChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5EaXNjcmlwaXRpb25UZXh0SWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5JROiOt+WPluexu+WeiyAqL1xyXG4gICAgcHVibGljIGdldFR5cGUoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBpZih0aGlzLmRhdGEuZ2V0KGlkKT09bnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybiAzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuVHlwZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNrklE6I635Y+W5ZOB6LSo5qGGICovXHJcbiAgICBwdWJsaWMgZ2V0UXVhbGl0eShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YS5nZXQoaWQpPT1udWxsKXtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5RdWFsaXR5O1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uSUTojrflj5bmmJ/nuqcgKi9cclxuICAgIHB1YmxpYyBnZXRTdGFyKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhLmdldChpZCk9PW51bGwpe1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlN0YXI7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5JROiOt+WPluW8leeUqOWbvuaghyAqL1xyXG4gICAgcHVibGljIGdldFF1b3RlSWNvbihpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YS5nZXQoaWQpPT1udWxsKXtcclxuICAgICAgICAgICAgcmV0dXJuIDEwMDAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUXVvdGVJY29uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQgSUQqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhJdGVtSUQoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAxMTAwMTI7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG4gICAgcHVibGljIGdldFByb3BJZExpc3QoKTpudW1iZXJbXXtcclxuICAgICAgICBsZXQgaWRMaXN0PW5ldyBBcnJheSgpO1xyXG4gICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKChqc29uRGF0YSxrZXkpPT57XHJcbiAgICAgICAgICAgIGlmKGpzb25EYXRhLlR5cGUhPTkpe1xyXG4gICAgICAgICAgICAgICAgaWRMaXN0LnB1c2goanNvbkRhdGEuSXRlbUlEKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBpZExpc3Q7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==