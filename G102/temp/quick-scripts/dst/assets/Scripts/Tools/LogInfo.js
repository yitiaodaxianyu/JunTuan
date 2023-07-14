
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Tools/LogInfo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVG9vbHNcXExvZ0luZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQThDO0FBRTlDO0lBQUE7UUFDSSxVQUFVO1FBQ1YsYUFBUSxHQUFRLG9CQUFvQixDQUFDO1FBQ3JDLE1BQU07UUFDTixnQkFBVyxHQUFRLGdCQUFnQixDQUFDO0lBRXhDLENBQUM7SUFBRCxjQUFDO0FBQUQsQ0FOQSxBQU1DLElBQUE7QUFOWSwwQkFBTztBQVFwQjtJQUFBO0lBc0VBLENBQUM7SUFsRVUsZUFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQzFCLElBQUksTUFBTSxHQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMxRCxJQUFHLE1BQU0sSUFBRSxFQUFFLElBQUksTUFBTSxJQUFFLElBQUksRUFDN0I7WUFDSSxJQUFJLEtBQUssR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZDLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUNoQztnQkFDSSxJQUFJLElBQUksR0FBQyxJQUFJLE9BQU8sRUFBRSxDQUFDO2dCQUN2QixJQUFJLEdBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzVCO1NBQ0o7SUFDTCxDQUFDO0lBQ0QsY0FBYztJQUNkLDBEQUEwRDtJQUMxRCxJQUFJO0lBQ0osOEJBQThCO0lBQzlCLGNBQWM7SUFDZCwwREFBMEQ7SUFDMUQsbURBQW1EO0lBQ25ELDhCQUE4QjtJQUM5QixRQUFRO0lBQ1IsNkNBQTZDO0lBQzdDLG1CQUFtQjtJQUNuQixtREFBbUQ7SUFDbkQsMENBQTBDO0lBQzFDLGtCQUFrQjtJQUNsQixRQUFRO0lBQ1IsMEJBQTBCO0lBQzFCLHFCQUFxQjtJQUNyQix1REFBdUQ7SUFDdkQsSUFBSTtJQUVHLHFCQUFVLEdBQWpCO1FBRUksT0FBTyxJQUFJLElBQUksQ0FBRSxDQUFDLElBQUksSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0YsQ0FBQztJQUVELGFBQWE7SUFDTixpQkFBTSxHQUFiLFVBQWMsR0FBVTtRQUVwQixJQUFHLDBCQUFjLEVBQ2pCO1lBQ0ksSUFBRyxJQUFJLENBQUMsUUFBUSxJQUFFLElBQUksRUFDdEI7Z0JBQ0ksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2Y7WUFDRCxJQUFJLE9BQU8sR0FBQyxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxRQUFRLEdBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ25DLE9BQU8sQ0FBQyxXQUFXLEdBQUMsR0FBRyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVCLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDaEQ7SUFDTCxDQUFDO0lBRU0sc0JBQVcsR0FBbEI7UUFFSSxJQUFHLDBCQUFjLEVBQ2pCO1lBQ0ksSUFBRyxJQUFJLENBQUMsUUFBUSxFQUNoQjtnQkFDSSxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7YUFDekU7U0FDSjtJQUNMLENBQUM7SUFuRWMsbUJBQVEsR0FBVyxJQUFJLENBQUM7SUFvRTNDLGlCQUFDO0NBdEVELEFBc0VDLElBQUE7QUF0RVksZ0NBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJc1NhdmVFcXVpcExvZyB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBMb2dJbmZve1xyXG4gICAgLy/ml6Xlv5fml7bpl7TnmoTlrZfnrKbkuLJcclxuICAgIGxvZ190aW1lOnN0cmluZz0nMjAyMi0yLTExIDExOjExOjExJztcclxuICAgIC8v5pel5b+X5YaF5a65XHJcbiAgICBsb2dfY29udGVudDpzdHJpbmc9J+iOt+W+l+S6huijheWkhzo2NjY2ODg4OCc7XHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTG9nTWFuYWdlcntcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBsb2dfbGlzdDpMb2dJbmZvW109bnVsbDtcclxuXHJcbiAgICBzdGF0aWMgaW5pdCgpe1xyXG4gICAgICAgIHRoaXMubG9nX2xpc3Q9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgbGV0IGxvZ1N0cjpzdHJpbmc9Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsb2dfbGlzdCcpO1xyXG4gICAgICAgIGlmKGxvZ1N0ciE9XCJcIiAmJiBsb2dTdHIhPW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgaW5mb3M6TG9nSW5mb1tdPUpTT04ucGFyc2UobG9nU3RyKTtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8aW5mb3MubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBpbmZvPW5ldyBMb2dJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICBpbmZvPWluZm9zW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dfbGlzdC5wdXNoKGluZm8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gLy/oo4XlpIfmlbDmja7nmoTmlLnliqjml6Xlv5dcclxuICAgIC8vIHN0YXRpYyBzYXZlTG9nKHN0cjpzdHJpbmcsbG9nU3RyPzpzdHJpbmcsY291bnQ/Om51bWJlcilcclxuICAgIC8vIHtcclxuICAgIC8vICAgICBpZihJc1NhdmVsb2dMb2c9PWZhbHNlKVxyXG4gICAgLy8gICAgIHJldHVybjtcclxuICAgIC8vICAgICBsb2dTdHI9YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTp0aGlzLmdldFRpbWVTdHIoKTtcclxuICAgIC8vICAgICBsZXQgc3NzPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2dTdHIpO1xyXG4gICAgLy8gICAgIGlmKHNzcyE9JycmJiBzc3MhPW51bGwpXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICBjb3VudD1hcmd1bWVudHNbMl0/YXJndW1lbnRzWzJdOjA7XHJcbiAgICAvLyAgICAgICAgIGNvdW50Kys7XHJcbiAgICAvLyAgICAgICAgIGxvZ1N0cj1sb2dTdHIuc3Vic3RyaW5nKDAsMTkpKycvJytjb3VudDtcclxuICAgIC8vICAgICAgICAgdGhpcy5zYXZlTG9nKHN0cixsb2dTdHIsY291bnQpO1xyXG4gICAgLy8gICAgICAgICByZXR1cm47XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIGNjLmxvZyhsb2dTdHIsc3RyKTtcclxuICAgIC8vICAgICAvL+aKiuaXpeW/l+S/oeaBr+S/neWtmOiHs+aXpeW/l+WIl+ihqFxyXG4gICAgLy8gICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShsb2dTdHIsc3RyKTsgICAgICAgIFxyXG4gICAgLy8gfVxyXG5cclxuICAgIHN0YXRpYyBnZXRUaW1lU3RyKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKCArbmV3IERhdGUoKSArIDggKiAzNjAwICogMTAwMCApLnRvSlNPTigpLnN1YnN0cmluZygwLDE5KS5yZXBsYWNlKFwiVFwiLFwiIFwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+a3u+WKoOS4gOS4quaXpeW/l+S/oeaBr+WIsOWIl+ihqFxyXG4gICAgc3RhdGljIGFkZExvZyhzdHI6c3RyaW5nKVxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgaWYoSXNTYXZlRXF1aXBMb2cpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLmxvZ19saXN0PT1udWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbG9nSW5mbz1uZXcgTG9nSW5mbygpO1xyXG4gICAgICAgICAgICBsb2dJbmZvLmxvZ190aW1lPXRoaXMuZ2V0VGltZVN0cigpO1xyXG4gICAgICAgICAgICBsb2dJbmZvLmxvZ19jb250ZW50PXN0cjtcclxuICAgICAgICAgICAgdGhpcy5sb2dfbGlzdC5wdXNoKGxvZ0luZm8pO1xyXG4gICAgICAgICAgICBjYy5sb2cobG9nSW5mby5sb2dfdGltZSxsb2dJbmZvLmxvZ19jb250ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHNhdmVMb2dMaXN0KClcclxuICAgIHtcclxuICAgICAgICBpZihJc1NhdmVFcXVpcExvZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubG9nX2xpc3QpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbG9nX2xpc3QnLEpTT04uc3RyaW5naWZ5KHRoaXMubG9nX2xpc3QpKTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==