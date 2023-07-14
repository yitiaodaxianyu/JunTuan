
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Activity/ActivityManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8c286r2M4RDT7LMXilGY0Jn', 'ActivityManager');
// Scripts/Activity/ActivityManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityManager = exports.ActivityType = void 0;
var Constants_1 = require("../Constants");
var FunctionDefinition_1 = require("../JsonData/FunctionDefinition");
var PropConfig_1 = require("../Prop/PropConfig");
var PropManager_1 = require("../Prop/PropManager");
var EventManager_1 = require("../Tools/EventManager");
var ActivityType;
(function (ActivityType) {
    ActivityType[ActivityType["Endless"] = 1] = "Endless";
    ActivityType[ActivityType["Boss"] = 2] = "Boss";
    ActivityType[ActivityType["Tower"] = 3] = "Tower";
    ActivityType[ActivityType["Maze"] = 4] = "Maze";
    ActivityType[ActivityType["num"] = 5] = "num";
})(ActivityType = exports.ActivityType || (exports.ActivityType = {}));
var ActivityManager = /** @class */ (function () {
    function ActivityManager() {
    }
    ActivityManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new ActivityManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    ActivityManager.prototype.init = function () {
    };
    ActivityManager.prototype.changeTicket = function (type, num) {
        var newNum = this.getTicket(type) + num;
        if (newNum >= 0) {
            this.saveTicket(type, newNum);
            return true;
        }
        return false;
    };
    ActivityManager.prototype.saveTicket = function (type, num) {
        // cc.sys.localStorage.setItem('activity_ticket'+type,num); 
        if (type == ActivityType.Boss) {
            PropManager_1.PropManager.getInstance().setPropNum(PropConfig_1.PropId.BossTicket, num);
        }
        else if (type == ActivityType.Endless) {
            PropManager_1.PropManager.getInstance().setPropNum(PropConfig_1.PropId.EndlessChallenge, num);
        }
        EventManager_1.EventManager.postAssetsEvent(EventManager_1.AssetsEventType.TICKET);
    };
    ActivityManager.prototype.getTicket = function (type) {
        // let num=cc.sys.localStorage.getItem('activity_ticket'+type);
        var num;
        if (type == ActivityType.Boss) {
            num = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.BossTicket);
        }
        else if (type == ActivityType.Endless) {
            num = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.EndlessChallenge);
        }
        // if(num===''||num===null)
        // {
        //     num=2;
        // }
        // num=parseInt(num);
        return num;
        // for(let i=ActivityType.Endless; i<ActivityType.num; i++){
        // }    
    };
    ActivityManager.prototype.changeTodayRemain = function (type, num) {
        var newNum = this.getTodayRemain(type) + num;
        if (newNum >= 0) {
            this.saveTodayRemain(type, newNum);
            return true;
        }
        return false;
    };
    ActivityManager.prototype.saveTodayRemain = function (type, num) {
        cc.sys.localStorage.setItem('today_remain' + type, num);
    };
    ActivityManager.prototype.getTodayRemain = function (type) {
        var num = cc.sys.localStorage.getItem('today_remain' + type);
        if (num === '' || num === null) {
            num = 2;
        }
        num = parseInt(num);
        return num;
    };
    ActivityManager.prototype.getIsUnlock = function (type) {
        var isUnlock = false;
        isUnlock = FunctionDefinition_1.FunctionDefinitionManager.getInstance().getIsUnlock(this.getFuncType(type));
        return isUnlock;
    };
    ActivityManager.prototype.getFuncType = function (type) {
        var funcType = Constants_1.FuncType.WuJinTiaoZhan;
        switch (type) {
            case ActivityType.Endless:
                {
                    funcType = Constants_1.FuncType.WuJinTiaoZhan;
                }
                break;
            case ActivityType.Boss:
                {
                    funcType = Constants_1.FuncType.GeRenBoss;
                }
                break;
            case ActivityType.Tower:
                {
                    funcType = Constants_1.FuncType.PaTa;
                }
                break;
            case ActivityType.Maze: {
                funcType = Constants_1.FuncType.MiGong;
            }
        }
        return funcType;
    };
    ActivityManager.prototype.getActivityType = function (mode) {
        var at = ActivityType.Endless;
        switch (mode) {
            case Constants_1.GameMode.Endless:
                {
                    at = ActivityType.Endless;
                }
                break;
            case Constants_1.GameMode.Boss_Challenge:
                {
                    at = ActivityType.Boss;
                }
                break;
            case Constants_1.GameMode.Tower:
                {
                    at = ActivityType.Tower;
                }
                break;
        }
        return at;
    };
    ActivityManager.prototype.resetTicket = function () {
        var maxNum = 2;
        // if(DingYueManager.getInstance().getMonthCardInfo().is_buy){
        //     maxNum++;
        // }
        // if(DingYueManager.getInstance().getQuarterCardInfo().is_buy){
        //     maxNum+=2;
        // }
        for (var i = ActivityType.Endless; i <= ActivityType.Boss; i++) {
            var num = this.getTicket(i);
            if (num < maxNum) {
                this.saveTicket(i, maxNum);
            }
        }
    };
    ActivityManager._instance = null;
    return ActivityManager;
}());
exports.ActivityManager = ActivityManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQWN0aXZpdHlcXEFjdGl2aXR5TWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwwQ0FBa0Q7QUFDbEQscUVBQTJFO0FBRTNFLGlEQUE0QztBQUM1QyxtREFBa0Q7QUFDbEQsc0RBQXNFO0FBRXRFLElBQVksWUFNWDtBQU5ELFdBQVksWUFBWTtJQUNwQixxREFBVyxDQUFBO0lBQ1gsK0NBQVEsQ0FBQTtJQUNSLGlEQUFTLENBQUE7SUFDVCwrQ0FBUSxDQUFBO0lBQ1IsNkNBQUcsQ0FBQTtBQUNQLENBQUMsRUFOVyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQU12QjtBQUVEO0lBQUE7SUE2SUEsQ0FBQztJQXZJaUIsMkJBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxlQUFlLEVBQUUsQ0FBQztZQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCxTQUFTO0lBQ0QsOEJBQUksR0FBWjtJQUVBLENBQUM7SUFFRCxzQ0FBWSxHQUFaLFVBQWEsSUFBaUIsRUFBQyxHQUFVO1FBRXJDLElBQUksTUFBTSxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUMsR0FBRyxDQUFDO1FBQ3BDLElBQUcsTUFBTSxJQUFFLENBQUMsRUFBQztZQUNULElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsb0NBQVUsR0FBVixVQUFXLElBQWlCLEVBQUMsR0FBVTtRQUVuQyw0REFBNEQ7UUFDNUQsSUFBRyxJQUFJLElBQUks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QVUsQ0FBQyxDQUFDLEVBQUMsTUFBTSxDQUFDLENBQUM7YUFDN0I7U0FDSjtJQUNMLENBQUM7SUExSWMseUJBQVMsR0FBb0IsSUFBSSxDQUFDO0lBMklyRCxzQkFBQztDQTdJRCxBQTZJQyxJQUFBO0FBN0lZLDBDQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IEZ1bmNUeXBlLCBHYW1lTW9kZSB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlciB9IGZyb20gXCIuLi9Kc29uRGF0YS9GdW5jdGlvbkRlZmluaXRpb25cIjtcclxuaW1wb3J0IHsgRGluZ1l1ZU1hbmFnZXIgfSBmcm9tIFwiLi4vUGF5bWVudC9EaW5nWXVlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQcm9wSWQgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQXNzZXRzRXZlbnRUeXBlLCBFdmVudE1hbmFnZXIgfSBmcm9tIFwiLi4vVG9vbHMvRXZlbnRNYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgZW51bSBBY3Rpdml0eVR5cGV7XHJcbiAgICBFbmRsZXNzID0gMSxcclxuICAgIEJvc3MgPSAyLFxyXG4gICAgVG93ZXIgPSAzLFxyXG4gICAgTWF6ZSA9IDQsXHJcbiAgICBudW0sXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBY3Rpdml0eU1hbmFnZXIge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogQWN0aXZpdHlNYW5hZ2VyID0gbnVsbDtcclxuXHJcbiAgICBcclxuICAgIFxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkFjdGl2aXR5TWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IEFjdGl2aXR5TWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQgKCkge1xyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgY2hhbmdlVGlja2V0KHR5cGU6QWN0aXZpdHlUeXBlLG51bTpudW1iZXIpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICBsZXQgbmV3TnVtPXRoaXMuZ2V0VGlja2V0KHR5cGUpK251bTtcclxuICAgICAgICBpZihuZXdOdW0+PTApe1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVUaWNrZXQodHlwZSxuZXdOdW0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVUaWNrZXQodHlwZTpBY3Rpdml0eVR5cGUsbnVtOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICAvLyBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FjdGl2aXR5X3RpY2tldCcrdHlwZSxudW0pOyBcclxuICAgICAgICBpZih0eXBlID09IEFjdGl2aXR5VHlwZS5Cb3NzKXtcclxuICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRQcm9wTnVtKFByb3BJZC5Cb3NzVGlja2V0LG51bSk7XHJcbiAgICAgICAgfWVsc2UgaWYodHlwZSA9PSBBY3Rpdml0eVR5cGUuRW5kbGVzcyl7XHJcbiAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0UHJvcE51bShQcm9wSWQuRW5kbGVzc0NoYWxsZW5nZSxudW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBFdmVudE1hbmFnZXIucG9zdEFzc2V0c0V2ZW50KEFzc2V0c0V2ZW50VHlwZS5USUNLRVQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRpY2tldCh0eXBlOkFjdGl2aXR5VHlwZSk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgLy8gbGV0IG51bT1jYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjdGl2aXR5X3RpY2tldCcrdHlwZSk7XHJcbiAgICAgICAgbGV0IG51bTtcclxuICAgICAgICBpZih0eXBlID09IEFjdGl2aXR5VHlwZS5Cb3NzKXtcclxuICAgICAgICAgICAgbnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5Cb3NzVGlja2V0KTtcclxuICAgICAgICB9ZWxzZSBpZih0eXBlID09IEFjdGl2aXR5VHlwZS5FbmRsZXNzKXtcclxuICAgICAgICAgICAgbnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5FbmRsZXNzQ2hhbGxlbmdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYobnVtPT09Jyd8fG51bT09PW51bGwpXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBudW09MjtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gbnVtPXBhcnNlSW50KG51bSk7XHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgICAgICAvLyBmb3IobGV0IGk9QWN0aXZpdHlUeXBlLkVuZGxlc3M7IGk8QWN0aXZpdHlUeXBlLm51bTsgaSsrKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gfSAgICBcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VUb2RheVJlbWFpbih0eXBlOkFjdGl2aXR5VHlwZSxudW06bnVtYmVyKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG5ld051bT10aGlzLmdldFRvZGF5UmVtYWluKHR5cGUpK251bTtcclxuICAgICAgICBpZihuZXdOdW0+PTApe1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVUb2RheVJlbWFpbih0eXBlLG5ld051bSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZVRvZGF5UmVtYWluKHR5cGU6QWN0aXZpdHlUeXBlLG51bTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RheV9yZW1haW4nK3R5cGUsbnVtKTsgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VG9kYXlSZW1haW4odHlwZTpBY3Rpdml0eVR5cGUpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGxldCBudW09Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2RheV9yZW1haW4nK3R5cGUpO1xyXG4gICAgICAgIGlmKG51bT09PScnfHxudW09PT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbnVtPTI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG51bT1wYXJzZUludChudW0pO1xyXG4gICAgICAgIHJldHVybiBudW07ICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0SXNVbmxvY2sodHlwZTpBY3Rpdml0eVR5cGUpOmJvb2xlYW57XHJcbiAgICAgICAgbGV0IGlzVW5sb2NrPWZhbHNlO1xyXG4gICAgICAgIGlzVW5sb2NrPUZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc1VubG9jayh0aGlzLmdldEZ1bmNUeXBlKHR5cGUpKTtcclxuICAgICAgICByZXR1cm4gaXNVbmxvY2s7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RnVuY1R5cGUodHlwZTpBY3Rpdml0eVR5cGUpOkZ1bmNUeXBle1xyXG4gICAgICAgIGxldCBmdW5jVHlwZT1GdW5jVHlwZS5XdUppblRpYW9aaGFuO1xyXG4gICAgICAgIHN3aXRjaCh0eXBlKXtcclxuICAgICAgICAgICAgY2FzZSBBY3Rpdml0eVR5cGUuRW5kbGVzczp7XHJcbiAgICAgICAgICAgICAgICBmdW5jVHlwZT1GdW5jVHlwZS5XdUppblRpYW9aaGFuO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEFjdGl2aXR5VHlwZS5Cb3NzOntcclxuICAgICAgICAgICAgICAgIGZ1bmNUeXBlPUZ1bmNUeXBlLkdlUmVuQm9zcztcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBBY3Rpdml0eVR5cGUuVG93ZXI6e1xyXG4gICAgICAgICAgICAgICAgZnVuY1R5cGU9RnVuY1R5cGUuUGFUYTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBBY3Rpdml0eVR5cGUuTWF6ZTp7XHJcbiAgICAgICAgICAgICAgICBmdW5jVHlwZSA9IEZ1bmNUeXBlLk1pR29uZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZnVuY1R5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWN0aXZpdHlUeXBlKG1vZGU6R2FtZU1vZGUpOkFjdGl2aXR5VHlwZXtcclxuICAgICAgICBsZXQgYXQ9QWN0aXZpdHlUeXBlLkVuZGxlc3M7XHJcbiAgICAgICAgc3dpdGNoKG1vZGUpe1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVNb2RlLkVuZGxlc3M6e1xyXG4gICAgICAgICAgICAgICAgYXQ9QWN0aXZpdHlUeXBlLkVuZGxlc3M7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuQm9zc19DaGFsbGVuZ2U6e1xyXG4gICAgICAgICAgICAgICAgYXQ9QWN0aXZpdHlUeXBlLkJvc3M7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZU1vZGUuVG93ZXI6e1xyXG4gICAgICAgICAgICAgICAgYXQ9QWN0aXZpdHlUeXBlLlRvd2VyO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRUaWNrZXQoKXtcclxuICAgICAgICBsZXQgbWF4TnVtPTI7XHJcbiAgICAgICAgLy8gaWYoRGluZ1l1ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb250aENhcmRJbmZvKCkuaXNfYnV5KXtcclxuICAgICAgICAvLyAgICAgbWF4TnVtKys7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGlmKERpbmdZdWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhcnRlckNhcmRJbmZvKCkuaXNfYnV5KXtcclxuICAgICAgICAvLyAgICAgbWF4TnVtKz0yO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBmb3IobGV0IGk9QWN0aXZpdHlUeXBlLkVuZGxlc3M7IGk8PUFjdGl2aXR5VHlwZS5Cb3NzOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgbnVtPXRoaXMuZ2V0VGlja2V0KGkpO1xyXG4gICAgICAgICAgICBpZihudW08bWF4TnVtKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZVRpY2tldChpLG1heE51bSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19