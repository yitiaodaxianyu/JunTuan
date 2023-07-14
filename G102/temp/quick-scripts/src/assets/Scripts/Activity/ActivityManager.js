"use strict";
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