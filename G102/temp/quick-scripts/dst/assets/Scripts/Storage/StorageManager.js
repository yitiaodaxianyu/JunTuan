
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
        if (num === "" || num === null) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcU3RvcmFnZVxcU3RvcmFnZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7SUFBQTtRQUVZLGVBQVUsR0FBUSxFQUFFLENBQUM7SUFrR2pDLENBQUM7SUFoR2lCLDZCQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksaUJBQWlCLEVBQUUsQ0FBQztTQUMxQztRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRU0sbUNBQU8sR0FBZCxVQUFlLEdBQVUsRUFBQyxLQUFTO1FBRS9CLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVNLG1DQUFPLEdBQWQsVUFBZSxHQUFVLEVBQUMsS0FBUztRQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVNLG1DQUFPLEdBQWQsVUFBZSxHQUFVO1FBQ3JCLElBQUksR0FBRyxHQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QyxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFTSxzQ0FBVSxHQUFqQixVQUFrQixHQUFVO1FBQ3hCLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRU0scUNBQVMsR0FBaEIsVUFBaUIsR0FBVSxFQUFDLFlBQW9CO1FBQzVDLElBQUksR0FBRyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsSUFBRyxHQUFHLEtBQUcsRUFBRSxJQUFJLEdBQUcsS0FBRyxJQUFJLEVBQ3pCO1lBQ0ksR0FBRyxHQUFDLFlBQVksQ0FBQztTQUNwQjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVNLHFDQUFTLEdBQWhCLFVBQWlCLEdBQVUsRUFBQyxZQUFvQjtRQUM1QyxJQUFJLEdBQUcsR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLElBQUcsR0FBRyxLQUFHLEVBQUUsSUFBSSxHQUFHLEtBQUcsSUFBSSxFQUN6QjtZQUNJLEdBQUcsR0FBQyxZQUFZLENBQUM7U0FDcEI7YUFDRDtZQUNJLEdBQUcsR0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbkI7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFTSxrQ0FBTSxHQUFiLFVBQWMsR0FBVSxFQUFDLFlBQW9CO1FBQ3pDLElBQUksR0FBRyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsSUFBRyxHQUFHLEtBQUcsRUFBRSxJQUFJLEdBQUcsS0FBRyxJQUFJLEVBQ3pCO1lBQ0ksR0FBRyxHQUFDLFlBQVksQ0FBQztTQUNwQjthQUNEO1lBQ0ksR0FBRyxHQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNyQjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVNLG9DQUFRLEdBQWYsVUFBZ0IsR0FBVSxFQUFDLFlBQW9CO1FBQzNDLElBQUksR0FBRyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsSUFBRyxHQUFHLEtBQUcsRUFBRSxJQUFJLEdBQUcsS0FBRyxJQUFJLEVBQ3pCO1lBQ0ksR0FBRyxHQUFDLFlBQVksQ0FBQztTQUNwQjthQUNEO1lBQ0ksR0FBRyxHQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN2QjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVNLHNDQUFVLEdBQWpCLFVBQWtCLEdBQVUsRUFBQyxZQUFzQjtRQUMvQyxJQUFJLE9BQU8sR0FBVSxFQUFFLENBQUM7UUFDeEIsSUFBSSxVQUFVLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQyxJQUFHLFVBQVUsS0FBRyxFQUFFLElBQUksVUFBVSxLQUFHLElBQUksRUFDdkM7WUFDSSxPQUFPLEdBQUMsWUFBWSxDQUFDO1NBQ3hCO2FBQ0Q7WUFDSSxJQUFJLElBQUksR0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQy9CLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUMvQjtnQkFDSSxJQUFJLEVBQUUsR0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDcEI7U0FDSjtRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFTSxtQ0FBTyxHQUFkLFVBQWUsR0FBVSxFQUFDLFlBQWlCO1FBQ3ZDLElBQUksSUFBSSxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0IsSUFBRyxJQUFJLEVBQUM7WUFDSixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0I7YUFBSTtZQUNELE9BQU8sWUFBWSxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQztJQWxHYywyQkFBUyxHQUFzQixJQUFJLENBQUM7SUFtR3ZELHdCQUFDO0NBcEdELEFBb0dDLElBQUE7QUFwR1ksOENBQWlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5leHBvcnQgY2xhc3MgVGhlU3RvcmFnZU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBUaGVTdG9yYWdlTWFuYWdlciA9IG51bGw7XHJcbiAgICBwcml2YXRlIHNlY3JldF9rZXk6c3RyaW5nPVwiXCI7XHJcbiAgICBcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpUaGVTdG9yYWdlTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IFRoZVN0b3JhZ2VNYW5hZ2VyKCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0SXRlbShrZXk6c3RyaW5nLHZhbHVlOmFueSl7XHJcblxyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRKc29uKGtleTpzdHJpbmcsdmFsdWU6YW55KXtcclxuICAgICAgICB0aGlzLnNldEl0ZW0oa2V5LEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEl0ZW0oa2V5OnN0cmluZyk6YW55e1xyXG4gICAgICAgIGxldCBudW09Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlSXRlbShrZXk6c3RyaW5nKXtcclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0U3RyaW5nKGtleTpzdHJpbmcsZGVmYXVsdFZhbHVlPzpzdHJpbmcpOnN0cmluZ3tcclxuICAgICAgICBsZXQgbnVtPXRoaXMuZ2V0SXRlbShrZXkpO1xyXG4gICAgICAgIGlmKG51bT09PVwiXCIgfHwgbnVtPT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG51bT1kZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudW07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE51bWJlcihrZXk6c3RyaW5nLGRlZmF1bHRWYWx1ZT86bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IG51bT10aGlzLmdldEl0ZW0oa2V5KTtcclxuICAgICAgICBpZihudW09PT1cIlwiIHx8IG51bT09PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBudW09ZGVmYXVsdFZhbHVlO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBudW09TnVtYmVyKG51bSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudW07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEludChrZXk6c3RyaW5nLGRlZmF1bHRWYWx1ZT86bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IG51bT10aGlzLmdldEl0ZW0oa2V5KTtcclxuICAgICAgICBpZihudW09PT1cIlwiIHx8IG51bT09PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBudW09ZGVmYXVsdFZhbHVlO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBudW09cGFyc2VJbnQobnVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RmxvYXQoa2V5OnN0cmluZyxkZWZhdWx0VmFsdWU/Om51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIGxldCBudW09dGhpcy5nZXRJdGVtKGtleSk7XHJcbiAgICAgICAgaWYobnVtPT09XCJcIiB8fCBudW09PT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbnVtPWRlZmF1bHRWYWx1ZTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbnVtPXBhcnNlRmxvYXQobnVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SW50TGlzdChrZXk6c3RyaW5nLGRlZmF1bHRWYWx1ZT86bnVtYmVyW10pOm51bWJlcltde1xyXG4gICAgICAgIGxldCBudW1MaXN0Om51bWJlcltdPVtdO1xyXG4gICAgICAgIGxldCBudW1MaXN0U3RyPXRoaXMuZ2V0SXRlbShrZXkpO1xyXG4gICAgICAgIGlmKG51bUxpc3RTdHI9PT1cIlwiIHx8IG51bUxpc3RTdHI9PT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbnVtTGlzdD1kZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBsaXN0PW51bUxpc3RTdHIuc3BsaXQoJywnKTtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8bGlzdC5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IGlkPXBhcnNlSW50KGxpc3RbaV0pO1xyXG4gICAgICAgICAgICAgICAgbnVtTGlzdC5wdXNoKGlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVtTGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SnNvbihrZXk6c3RyaW5nLGRlZmF1bHRWYWx1ZT86YW55KTphbnl7XHJcbiAgICAgICAgbGV0IGRhdGE9dGhpcy5nZXRJdGVtKGtleSk7XHJcbiAgICAgICAgaWYoZGF0YSl7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==