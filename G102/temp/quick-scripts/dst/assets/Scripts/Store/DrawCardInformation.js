
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Store/DrawCardInformation.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f7149ONlu1HUoLbLKMNIkos', 'DrawCardInformation');
// Scripts/Store/DrawCardInformation.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawCardInformationManager = exports.JsonDrawCardInformation = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonDrawCardInformation = /** @class */ (function () {
    function JsonDrawCardInformation() {
        /**卡池ID */
        this.CardPoolID = 0;
        /**卡池类型 */
        this.CardPoolType = 0;
        /**单抽道具ID_1 */
        this.OneDrawPropsID_1 = 0;
        /**单抽道具消耗_1 */
        this.OneDrawPropsSpend_1 = 0;
        /**十连抽道具1消耗 */
        this.TenDrawPropsSpend_1 = 0;
        /**单抽道具ID_2 */
        this.OneDrawPropsID_2 = 0;
        /**单抽道具消耗_2 */
        this.OneDrawPropsSpend_2 = 0;
        /**十连抽道具2消耗 */
        this.TenDrawPropsSpend_2 = 0;
    }
    return JsonDrawCardInformation;
}());
exports.JsonDrawCardInformation = JsonDrawCardInformation;
var DrawCardInformationManager = /** @class */ (function () {
    function DrawCardInformationManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    DrawCardInformationManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new DrawCardInformationManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    DrawCardInformationManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    DrawCardInformationManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('DrawCardInformation', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonDrawCardInformation成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonDrawCardInformation();
                jsonData = json[i];
                _this.data.set(jsonData.CardPoolID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    DrawCardInformationManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    DrawCardInformationManager.prototype.getJsonDrawCardInformation = function (id) {
        return this.data.get(id);
    };
    /**根据卡池ID获取卡池类型 */
    DrawCardInformationManager.prototype.getCardPoolType = function (id) {
        return this.data.get(id).CardPoolType;
    };
    /**根据卡池ID获取单抽道具ID_1 */
    DrawCardInformationManager.prototype.getOneDrawPropsID_1 = function (id) {
        return this.data.get(id).OneDrawPropsID_1;
    };
    /**根据卡池ID获取单抽道具消耗_1 */
    DrawCardInformationManager.prototype.getOneDrawPropsSpend_1 = function (id) {
        return this.data.get(id).OneDrawPropsSpend_1;
    };
    /**根据卡池ID获取十连抽道具1消耗 */
    DrawCardInformationManager.prototype.getTenDrawPropsSpend_1 = function (id) {
        return this.data.get(id).TenDrawPropsSpend_1;
    };
    /**根据卡池ID获取单抽道具ID_2 */
    DrawCardInformationManager.prototype.getOneDrawPropsID_2 = function (id) {
        return this.data.get(id).OneDrawPropsID_2;
    };
    /**根据卡池ID获取单抽道具消耗_2 */
    DrawCardInformationManager.prototype.getOneDrawPropsSpend_2 = function (id) {
        return this.data.get(id).OneDrawPropsSpend_2;
    };
    /**根据卡池ID获取十连抽道具2消耗 */
    DrawCardInformationManager.prototype.getTenDrawPropsSpend_2 = function (id) {
        return this.data.get(id).TenDrawPropsSpend_2;
    };
    /** 静态方法，获取最大的 卡池ID*/
    DrawCardInformationManager.getMaxCardPoolID = function () {
        return 3001;
    };
    DrawCardInformationManager._instance = null;
    return DrawCardInformationManager;
}());
exports.DrawCardInformationManager = DrawCardInformationManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcU3RvcmVcXERyYXdDYXJkSW5mb3JtYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQXFEO0FBRXJEO0lBQUE7UUFDSSxVQUFVO1FBQ0gsZUFBVSxHQUFVLENBQUMsQ0FBRTtRQUM5QixVQUFVO1FBQ0gsaUJBQVksR0FBVSxDQUFDLENBQUU7UUFDaEMsY0FBYztRQUNQLHFCQUFnQixHQUFVLENBQUMsQ0FBRTtRQUNwQyxjQUFjO1FBQ1Asd0JBQW1CLEdBQVUsQ0FBQyxDQUFFO1FBQ3ZDLGNBQWM7UUFDUCx3QkFBbUIsR0FBVSxDQUFDLENBQUU7UUFDdkMsY0FBYztRQUNQLHFCQUFnQixHQUFVLENBQUMsQ0FBRTtRQUNwQyxjQUFjO1FBQ1Asd0JBQW1CLEdBQVUsQ0FBQyxDQUFFO1FBQ3ZDLGNBQWM7UUFDUCx3QkFBbUIsR0FBVSxDQUFDLENBQUU7SUFDM0MsQ0FBQztJQUFELDhCQUFDO0FBQUQsQ0FqQkEsQUFpQkMsSUFBQTtBQWpCWSwwREFBdUI7QUFtQnBDO0lBQUE7UUFFSSxpQkFBaUI7UUFDVCxTQUFJLEdBQXFDLElBQUksQ0FBQztRQUM5QyxzQkFBaUIsR0FBUyxLQUFLLENBQUM7UUE0RXhDLHlCQUF5QjtJQUc3QixDQUFDO0lBN0VpQixzQ0FBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLDBCQUEwQixFQUFFLENBQUM7WUFDaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsU0FBUztJQUNELHlDQUFJLEdBQVo7UUFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7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c291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSnNvbkRyYXdDYXJkSW5mb3JtYXRpb24ge1xyXG4gICAgLyoq5Y2h5rGgSUQgKi9cclxuICAgIHB1YmxpYyBDYXJkUG9vbElEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5Y2h5rGg57G75Z6LICovXHJcbiAgICBwdWJsaWMgQ2FyZFBvb2xUeXBlOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5Y2V5oq96YGT5YW3SURfMSAqL1xyXG4gICAgcHVibGljIE9uZURyYXdQcm9wc0lEXzE6bnVtYmVyID0gMCA7XHJcbiAgICAvKirljZXmir3pgZPlhbfmtojogJdfMSAqL1xyXG4gICAgcHVibGljIE9uZURyYXdQcm9wc1NwZW5kXzE6bnVtYmVyID0gMCA7XHJcbiAgICAvKirljYHov57mir3pgZPlhbcx5raI6ICXICovXHJcbiAgICBwdWJsaWMgVGVuRHJhd1Byb3BzU3BlbmRfMTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWNleaKvemBk+WFt0lEXzIgKi9cclxuICAgIHB1YmxpYyBPbmVEcmF3UHJvcHNJRF8yOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5Y2V5oq96YGT5YW35raI6ICXXzIgKi9cclxuICAgIHB1YmxpYyBPbmVEcmF3UHJvcHNTcGVuZF8yOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5Y2B6L+e5oq96YGT5YW3Mua2iOiAlyAqL1xyXG4gICAgcHVibGljIFRlbkRyYXdQcm9wc1NwZW5kXzI6bnVtYmVyID0gMCA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEcmF3Q2FyZEluZm9ybWF0aW9uTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IERyYXdDYXJkSW5mb3JtYXRpb25NYW5hZ2VyID0gbnVsbDtcclxuICAgIC8v5oqKanNvbuaVsOaNrui9rOWMluaIkG1hcOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBkYXRhOk1hcDxudW1iZXIsSnNvbkRyYXdDYXJkSW5mb3JtYXRpb24+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkRyYXdDYXJkSW5mb3JtYXRpb25NYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgRHJhd0NhcmRJbmZvcm1hdGlvbk1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSnNvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Yqg6L29anNvblxyXG4gICAgcHJpdmF0ZSBsb2FkSnNvbigpIHtcclxuICAgICAgICBMb2FkTWFuYWdlci5sb2FkSnNvbignRHJhd0NhcmRJbmZvcm1hdGlvbicsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25EcmF3Q2FyZEluZm9ybWF0aW9u5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvbkRyYXdDYXJkSW5mb3JtYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGpzb25EYXRhPWpzb25baV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KGpzb25EYXRhLkNhcmRQb29sSUQsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25EcmF3Q2FyZEluZm9ybWF0aW9uKGlkOm51bWJlcik6SnNvbkRyYXdDYXJkSW5mb3JtYXRpb24ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWNoeaxoElE6I635Y+W5Y2h5rGg57G75Z6LICovXHJcbiAgICBwdWJsaWMgZ2V0Q2FyZFBvb2xUeXBlKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkNhcmRQb29sVHlwZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWNoeaxoElE6I635Y+W5Y2V5oq96YGT5YW3SURfMSAqL1xyXG4gICAgcHVibGljIGdldE9uZURyYXdQcm9wc0lEXzEoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuT25lRHJhd1Byb3BzSURfMTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWNoeaxoElE6I635Y+W5Y2V5oq96YGT5YW35raI6ICXXzEgKi9cclxuICAgIHB1YmxpYyBnZXRPbmVEcmF3UHJvcHNTcGVuZF8xKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLk9uZURyYXdQcm9wc1NwZW5kXzE7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7ljaHmsaBJROiOt+WPluWNgei/nuaKvemBk+WFtzHmtojogJcgKi9cclxuICAgIHB1YmxpYyBnZXRUZW5EcmF3UHJvcHNTcGVuZF8xKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlRlbkRyYXdQcm9wc1NwZW5kXzE7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7ljaHmsaBJROiOt+WPluWNleaKvemBk+WFt0lEXzIgKi9cclxuICAgIHB1YmxpYyBnZXRPbmVEcmF3UHJvcHNJRF8yKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLk9uZURyYXdQcm9wc0lEXzI7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7ljaHmsaBJROiOt+WPluWNleaKvemBk+WFt+a2iOiAl18yICovXHJcbiAgICBwdWJsaWMgZ2V0T25lRHJhd1Byb3BzU3BlbmRfMihpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5PbmVEcmF3UHJvcHNTcGVuZF8yO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5Y2h5rGgSUTojrflj5bljYHov57mir3pgZPlhbcy5raI6ICXICovXHJcbiAgICBwdWJsaWMgZ2V0VGVuRHJhd1Byb3BzU3BlbmRfMihpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5UZW5EcmF3UHJvcHNTcGVuZF8yO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg5Y2h5rGgSUQqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhDYXJkUG9vbElEKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gMzAwMTtcclxuICAgIH1cclxuXHJcbiAgICAvL+S7peS4iuagvOW8j+e7n+S4gO+8jOS7peS4i+WGmeavj+S4qmpzb27mlbDmja7nmoTnibnmrorpnIDmsYJcclxuXHJcblxyXG59XHJcbiJdfQ==