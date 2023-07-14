
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/copy/voidcrack/RoguefastPass.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c48ba8LtMpMZIfbcwuHEv3I', 'RoguefastPass');
// Scripts/copy/voidcrack/RoguefastPass.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoguefastPassManager = exports.JsonRoguefastPass = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonRoguefastPass = /** @class */ (function () {
    function JsonRoguefastPass() {
        /**章节 */
        this.ChapterLevel = 0;
        /**奖励1ID */
        this.PropID_1 = 0;
        /**奖励1数量 */
        this.PropNum_1 = 0;
        /**奖励2ID */
        this.PropID_2 = 0;
        /**奖励2数量 */
        this.PropNum_2 = 0;
    }
    return JsonRoguefastPass;
}());
exports.JsonRoguefastPass = JsonRoguefastPass;
var RoguefastPassManager = /** @class */ (function () {
    function RoguefastPassManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    RoguefastPassManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new RoguefastPassManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    RoguefastPassManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    RoguefastPassManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('RoguefastPass', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonRoguefastPass成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonRoguefastPass();
                jsonData = json[i];
                _this.data.set(jsonData.ChapterLevel, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    RoguefastPassManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    RoguefastPassManager.prototype.getJsonRoguefastPass = function (id) {
        return this.data.get(id);
    };
    /**根据章节获取奖励1ID */
    RoguefastPassManager.prototype.getPropID_1 = function (id) {
        return this.data.get(id).PropID_1;
    };
    /**根据章节获取奖励1数量 */
    RoguefastPassManager.prototype.getPropNum_1 = function (id) {
        return this.data.get(id).PropNum_1;
    };
    /**根据章节获取奖励2ID */
    RoguefastPassManager.prototype.getPropID_2 = function (id) {
        return this.data.get(id).PropID_2;
    };
    /**根据章节获取奖励2数量 */
    RoguefastPassManager.prototype.getPropNum_2 = function (id) {
        return this.data.get(id).PropNum_2;
    };
    /** 静态方法，获取最大的 章节*/
    RoguefastPassManager.getMaxChapterLevel = function () {
        return 8;
    };
    RoguefastPassManager._instance = null;
    return RoguefastPassManager;
}());
exports.RoguefastPassManager = RoguefastPassManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcY29weVxcdm9pZGNyYWNrXFxSb2d1ZWZhc3RQYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUF3RDtBQUV4RDtJQUFBO1FBQ0ksUUFBUTtRQUNELGlCQUFZLEdBQVUsQ0FBQyxDQUFFO1FBQ2hDLFdBQVc7UUFDSixhQUFRLEdBQVUsQ0FBQyxDQUFFO1FBQzVCLFdBQVc7UUFDSixjQUFTLEdBQVUsQ0FBQyxDQUFFO1FBQzdCLFdBQVc7UUFDSixhQUFRLEdBQVUsQ0FBQyxDQUFFO1FBQzVCLFdBQVc7UUFDSixjQUFTLEdBQVUsQ0FBQyxDQUFFO0lBQ2pDLENBQUM7SUFBRCx3QkFBQztBQUFELENBWEEsQUFXQyxJQUFBO0FBWFksOENBQWlCO0FBYTlCO0lBQUE7UUFFSSxpQkFBaUI7UUFDVCxTQUFJLEdBQStCLElBQUksQ0FBQztRQUN4QyxzQkFBaUIsR0FBUyxLQUFLLENBQUM7UUFnRXhDLHlCQUF5QjtJQUc3QixDQUFDO0lBakVpQixnQ0FBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLG9CQUFvQixFQUFFLENBQUM7WUFDMUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsU0FBUztJQUNELG1DQUFJLEdBQVo7UUFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFDRCxRQUFRO0lBQ0EsdUNBQVEsR0FBaEI7UUFBQSxpQkFnQkM7UUFmRyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUMseUJBQVcsQ0FBQyxTQUFTLEVBQUMsVUFBQyxLQUFZLEVBQUUsTUFBbUI7WUFDekYsSUFBRyxLQUFLLEVBQUM7Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsT0FBTzthQUNWO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ3JDLEtBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNwQixJQUFJLElBQUksR0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3JCLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUM1QixJQUFJLFFBQVEsR0FBQyxJQUFJLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3JDLFFBQVEsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUMsUUFBUSxDQUFDLENBQUM7YUFDakQ7WUFDRCxLQUFJLENBQUMsaUJBQWlCLEdBQUMsSUFBSSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFlBQVk7SUFDTCxpREFBa0IsR0FBekI7UUFDSSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNsQyxDQUFDO0lBQ0Qsc0JBQXNCO0lBQ2YsbURBQW9CLEdBQTNCLFVBQTRCLEVBQVM7UUFDakMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsaUJBQWlCO0lBQ1YsMENBQVcsR0FBbEIsVUFBbUIsRUFBUztRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUN0QyxDQUFDO0lBQ0QsaUJBQWlCO0lBQ1YsMkNBQVksR0FBbkIsVUFBb0IsRUFBUztRQUN6QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUN2QyxDQUFDO0lBQ0QsaUJBQWlCO0lBQ1YsMENBQVcsR0FBbEIsVUFBbUIsRUFBUztRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUN0QyxDQUFDO0lBQ0QsaUJBQWlCO0lBQ1YsMkNBQVksR0FBbkIsVUFBb0IsRUFBUztRQUN6QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsbUJBQW1CO0lBQ0wsdUNBQWtCLEdBQWhDO1FBQ0ksT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBakVjLDhCQUFTLEdBQXlCLElBQUksQ0FBQztJQXNFMUQsMkJBQUM7Q0F2RUQsQUF1RUMsSUFBQTtBQXZFWSxvREFBb0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSnNvblJvZ3VlZmFzdFBhc3Mge1xyXG4gICAgLyoq56ug6IqCICovXHJcbiAgICBwdWJsaWMgQ2hhcHRlckxldmVsOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5aWW5YqxMUlEICovXHJcbiAgICBwdWJsaWMgUHJvcElEXzE6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlpZblirEx5pWw6YePICovXHJcbiAgICBwdWJsaWMgUHJvcE51bV8xOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5aWW5YqxMklEICovXHJcbiAgICBwdWJsaWMgUHJvcElEXzI6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlpZblirEy5pWw6YePICovXHJcbiAgICBwdWJsaWMgUHJvcE51bV8yOm51bWJlciA9IDAgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUm9ndWVmYXN0UGFzc01hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBSb2d1ZWZhc3RQYXNzTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25Sb2d1ZWZhc3RQYXNzPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpSb2d1ZWZhc3RQYXNzTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IFJvZ3VlZmFzdFBhc3NNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ1JvZ3VlZmFzdFBhc3MnLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uUm9ndWVmYXN0UGFzc+aIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25Sb2d1ZWZhc3RQYXNzKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5DaGFwdGVyTGV2ZWwsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25Sb2d1ZWZhc3RQYXNzKGlkOm51bWJlcik6SnNvblJvZ3VlZmFzdFBhc3Mge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNrueroOiKguiOt+WPluWlluWKsTFJRCAqL1xyXG4gICAgcHVibGljIGdldFByb3BJRF8xKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlByb3BJRF8xO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u56ug6IqC6I635Y+W5aWW5YqxMeaVsOmHjyAqL1xyXG4gICAgcHVibGljIGdldFByb3BOdW1fMShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Qcm9wTnVtXzE7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7nq6DoioLojrflj5blpZblirEySUQgKi9cclxuICAgIHB1YmxpYyBnZXRQcm9wSURfMihpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Qcm9wSURfMjtcclxuICAgIH1cclxuICAgIC8qKuagueaNrueroOiKguiOt+WPluWlluWKsTLmlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXRQcm9wTnVtXzIoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUHJvcE51bV8yO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg56ug6IqCKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4Q2hhcHRlckxldmVsKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gODtcclxuICAgIH1cclxuXHJcbiAgICAvL+S7peS4iuagvOW8j+e7n+S4gO+8jOS7peS4i+WGmeavj+S4qmpzb27mlbDmja7nmoTnibnmrorpnIDmsYJcclxuXHJcblxyXG59XHJcbiJdfQ==