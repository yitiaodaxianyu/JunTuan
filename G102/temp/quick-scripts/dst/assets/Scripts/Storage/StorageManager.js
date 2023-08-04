
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Storage/StorageManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b00eemPx+5BPqivD60JtxhZ', 'StorageManager');
// Scripts/Storage/StorageManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheStorageManager = void 0;
var TheStorageManager = /** @class */ (function () {
    function TheStorageManager() {
        this.secret_key = "";
    }
    TheStorageManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new TheStorageManager();
        }
        return this._instance;
    };
    TheStorageManager.prototype.setItem = function (key, value) {
        cc.sys.localStorage.setItem(key, value);
    };
    TheStorageManager.prototype.setJson = function (key, value) {
        this.setItem(key, JSON.stringify(value));
    };
    TheStorageManager.prototype.getItem = function (key) {
        var num = cc.sys.localStorage.getItem(key);
        return num;
    };
    TheStorageManager.prototype.removeItem = function (key) {
        cc.sys.localStorage.removeItem(key);
    };
    TheStorageManager.prototype.getString = function (key, defaultValue) {
        var num = this.getItem(key);
        if (num === "" || num === null) {
            num = defaultValue;
        }
        return num;
    };
    TheStorageManager.prototype.getNumber = function (key, defaultValue) {
        var num = this.getItem(key);
        if (num === "" || num === null || num == "undefined") {
            num = defaultValue;
        }
        else {
            num = Number(num);
        }
        return num;
    };
    TheStorageManager.prototype.getInt = function (key, defaultValue) {
        var num = this.getItem(key);
        if (num === "" || num === null) {
            num = defaultValue;
        }
        else {
            num = parseInt(num);
        }
        return num;
    };
    TheStorageManager.prototype.getFloat = function (key, defaultValue) {
        var num = this.getItem(key);
        if (num === "" || num === null) {
            num = defaultValue;
        }
        else {
            num = parseFloat(num);
        }
        return num;
    };
    TheStorageManager.prototype.getIntList = function (key, defaultValue) {
        var numList = [];
        var numListStr = this.getItem(key);
        if (numListStr === "" || numListStr === null) {
            numList = defaultValue;
        }
        else {
            var list = numListStr.split(',');
            for (var i = 0; i < list.length; i++) {
                var id = parseInt(list[i]);
                numList.push(id);
            }
        }
        return numList;
    };
    TheStorageManager.prototype.getJson = function (key, defaultValue) {
        var data = this.getItem(key);
        if (data) {
            return JSON.parse(data);
        }
        else {
            return defaultValue;
        }
    };
    TheStorageManager._instance = null;
    return TheStorageManager;
}());
exports.TheStorageManager = TheStorageManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcU3RvcmFnZVxcU3RvcmFnZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7SUFBQTtRQUVZLGVBQVUsR0FBUSxFQUFFLENBQUM7SUFrR2pDLENBQUM7SUFoR2lCLDZCQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksaUJBQWlCLEVBQUUsQ0FBQztTQUMxQztRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRU0sbUNBQU8sR0FBZCxVQUFlLEdBQVUsRUFBQyxLQUFTO1FBRS9CLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVNLG1DQUFPLEdBQWQsVUFBZSxHQUFVLEVBQUMsS0FBUztRQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVNLG1DQUFPLEdBQWQsVUFBZSxHQUFVO1FBQ3JCLElBQUksR0FBRyxHQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QyxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFTSxzQ0FBVSxHQUFqQixVQUFrQixHQUFVO1FBQ3hCLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRU0scUNBQVMsR0FBaEIsVUFBaUIsR0FBVSxFQUFDLFlBQW9CO1FBQzVDLElBQUksR0FBRyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsSUFBRyxHQUFHLEtBQUcsRUFBRSxJQUFJLEdBQUcsS0FBRyxJQUFJLEVBQ3pCO1lBQ0ksR0FBRyxHQUFDLFlBQVksQ0FBQztTQUNwQjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVNLHFDQUFTLEdBQWhCLFVBQWlCLEdBQVUsRUFBQyxZQUFvQjtRQUM1QyxJQUFJLEdBQUcsR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLElBQUcsR0FBRyxLQUFHLEVBQUUsSUFBSSxHQUFHLEtBQUcsSUFBSSxJQUFFLEdBQUcsSUFBRSxXQUFXLEVBQzNDO1lBQ0ksR0FBRyxHQUFDLFlBQVksQ0FBQztTQUNwQjthQUNEO1lBQ0ksR0FBRyxHQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNuQjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVNLGtDQUFNLEdBQWIsVUFBYyxHQUFVLEVBQUMsWUFBb0I7UUFDekMsSUFBSSxHQUFHLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQixJQUFHLEdBQUcsS0FBRyxFQUFFLElBQUksR0FBRyxLQUFHLElBQUksRUFDekI7WUFDSSxHQUFHLEdBQUMsWUFBWSxDQUFDO1NBQ3BCO2FBQ0Q7WUFDSSxHQUFHLEdBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3JCO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRU0sb0NBQVEsR0FBZixVQUFnQixHQUFVLEVBQUMsWUFBb0I7UUFDM0MsSUFBSSxHQUFHLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQixJQUFHLEdBQUcsS0FBRyxFQUFFLElBQUksR0FBRyxLQUFHLElBQUksRUFDekI7WUFDSSxHQUFHLEdBQUMsWUFBWSxDQUFDO1NBQ3BCO2FBQ0Q7WUFDSSxHQUFHLEdBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRU0sc0NBQVUsR0FBakIsVUFBa0IsR0FBVSxFQUFDLFlBQXNCO1FBQy9DLElBQUksT0FBTyxHQUFVLEVBQUUsQ0FBQztRQUN4QixJQUFJLFVBQVUsR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLElBQUcsVUFBVSxLQUFHLEVBQUUsSUFBSSxVQUFVLEtBQUcsSUFBSSxFQUN2QztZQUNJLE9BQU8sR0FBQyxZQUFZLENBQUM7U0FDeEI7YUFDRDtZQUNJLElBQUksSUFBSSxHQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0IsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQy9CO2dCQUNJLElBQUksRUFBRSxHQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekIsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNwQjtTQUNKO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVNLG1DQUFPLEdBQWQsVUFBZSxHQUFVLEVBQUMsWUFBaUI7UUFDdkMsSUFBSSxJQUFJLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQixJQUFHLElBQUksRUFBQztZQUNKLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMzQjthQUFJO1lBQ0QsT0FBTyxZQUFZLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBbEdjLDJCQUFTLEdBQXNCLElBQUksQ0FBQztJQW1HdkQsd0JBQUM7Q0FwR0QsQUFvR0MsSUFBQTtBQXBHWSw4Q0FBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmV4cG9ydCBjbGFzcyBUaGVTdG9yYWdlTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFRoZVN0b3JhZ2VNYW5hZ2VyID0gbnVsbDtcclxuICAgIHByaXZhdGUgc2VjcmV0X2tleTpzdHJpbmc9XCJcIjtcclxuICAgIFxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOlRoZVN0b3JhZ2VNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgVGhlU3RvcmFnZU1hbmFnZXIoKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRJdGVtKGtleTpzdHJpbmcsdmFsdWU6YW55KXtcclxuXHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSx2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEpzb24oa2V5OnN0cmluZyx2YWx1ZTphbnkpe1xyXG4gICAgICAgIHRoaXMuc2V0SXRlbShrZXksSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SXRlbShrZXk6c3RyaW5nKTphbnl7XHJcbiAgICAgICAgbGV0IG51bT1jYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVJdGVtKGtleTpzdHJpbmcpe1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTdHJpbmcoa2V5OnN0cmluZyxkZWZhdWx0VmFsdWU/OnN0cmluZyk6c3RyaW5ne1xyXG4gICAgICAgIGxldCBudW09dGhpcy5nZXRJdGVtKGtleSk7XHJcbiAgICAgICAgaWYobnVtPT09XCJcIiB8fCBudW09PT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbnVtPWRlZmF1bHRWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TnVtYmVyKGtleTpzdHJpbmcsZGVmYXVsdFZhbHVlPzpudW1iZXIpOm51bWJlcntcclxuICAgICAgICBsZXQgbnVtPXRoaXMuZ2V0SXRlbShrZXkpO1xyXG4gICAgICAgIGlmKG51bT09PVwiXCIgfHwgbnVtPT09bnVsbHx8bnVtPT1cInVuZGVmaW5lZFwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbnVtPWRlZmF1bHRWYWx1ZTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbnVtPU51bWJlcihudW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRJbnQoa2V5OnN0cmluZyxkZWZhdWx0VmFsdWU/Om51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIGxldCBudW09dGhpcy5nZXRJdGVtKGtleSk7XHJcbiAgICAgICAgaWYobnVtPT09XCJcIiB8fCBudW09PT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbnVtPWRlZmF1bHRWYWx1ZTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbnVtPXBhcnNlSW50KG51bSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudW07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEZsb2F0KGtleTpzdHJpbmcsZGVmYXVsdFZhbHVlPzpudW1iZXIpOm51bWJlcntcclxuICAgICAgICBsZXQgbnVtPXRoaXMuZ2V0SXRlbShrZXkpO1xyXG4gICAgICAgIGlmKG51bT09PVwiXCIgfHwgbnVtPT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG51bT1kZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG51bT1wYXJzZUZsb2F0KG51bSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudW07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEludExpc3Qoa2V5OnN0cmluZyxkZWZhdWx0VmFsdWU/Om51bWJlcltdKTpudW1iZXJbXXtcclxuICAgICAgICBsZXQgbnVtTGlzdDpudW1iZXJbXT1bXTtcclxuICAgICAgICBsZXQgbnVtTGlzdFN0cj10aGlzLmdldEl0ZW0oa2V5KTtcclxuICAgICAgICBpZihudW1MaXN0U3RyPT09XCJcIiB8fCBudW1MaXN0U3RyPT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG51bUxpc3Q9ZGVmYXVsdFZhbHVlO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgbGlzdD1udW1MaXN0U3RyLnNwbGl0KCcsJyk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGxpc3QubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBpZD1wYXJzZUludChsaXN0W2ldKTtcclxuICAgICAgICAgICAgICAgIG51bUxpc3QucHVzaChpZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bUxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEpzb24oa2V5OnN0cmluZyxkZWZhdWx0VmFsdWU/OmFueSk6YW55e1xyXG4gICAgICAgIGxldCBkYXRhPXRoaXMuZ2V0SXRlbShrZXkpO1xyXG4gICAgICAgIGlmKGRhdGEpe1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=