"use strict";
cc._RF.push(module, 'b1d36cWti5OU5Pm67FGqllp', 'LogInfo');
// Scripts/Tools/LogInfo.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogManager = exports.LogInfo = void 0;
var Constants_1 = require("../Constants");
var LogInfo = /** @class */ (function () {
    function LogInfo() {
        //日志时间的字符串
        this.log_time = '2022-2-11 11:11:11';
        //日志内容
        this.log_content = '获得了装备:66668888';
    }
    return LogInfo;
}());
exports.LogInfo = LogInfo;
var LogManager = /** @class */ (function () {
    function LogManager() {
    }
    LogManager.init = function () {
        this.log_list = new Array();
        var logStr = cc.sys.localStorage.getItem('log_list');
        if (logStr != "" && logStr != null) {
            var infos = JSON.parse(logStr);
            for (var i = 0; i < infos.length; i++) {
                var info = new LogInfo();
                info = infos[i];
                this.log_list.push(info);
            }
        }
    };
    // //装备数据的改动日志
    // static saveLog(str:string,logStr?:string,count?:number)
    // {
    //     if(IsSavelogLog==false)
    //     return;
    //     logStr=arguments[1]?arguments[1]:this.getTimeStr();
    //     let sss=cc.sys.localStorage.getItem(logStr);
    //     if(sss!=''&& sss!=null)
    //     {
    //         count=arguments[2]?arguments[2]:0;
    //         count++;
    //         logStr=logStr.substring(0,19)+'/'+count;
    //         this.saveLog(str,logStr,count);
    //         return;
    //     }
    //     cc.log(logStr,str);
    //     //把日志信息保存至日志列表
    //     cc.sys.localStorage.setItem(logStr,str);        
    // }
    LogManager.getTimeStr = function () {
        return new Date(+new Date() + 8 * 3600 * 1000).toJSON().substring(0, 19).replace("T", " ");
    };
    //添加一个日志信息到列表
    LogManager.addLog = function (str) {
        if (Constants_1.IsSaveEquipLog) {
            if (this.log_list == null) {
                this.init();
            }
            var logInfo = new LogInfo();
            logInfo.log_time = this.getTimeStr();
            logInfo.log_content = str;
            this.log_list.push(logInfo);
            cc.log(logInfo.log_time, logInfo.log_content);
        }
    };
    LogManager.saveLogList = function () {
        if (Constants_1.IsSaveEquipLog) {
            if (this.log_list) {
                cc.sys.localStorage.setItem('log_list', JSON.stringify(this.log_list));
            }
        }
    };
    LogManager.log_list = null;
    return LogManager;
}());
exports.LogManager = LogManager;

cc._RF.pop();