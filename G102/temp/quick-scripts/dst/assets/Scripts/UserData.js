
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UserData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a12cfJBpNBGsZe0dao+eOVS', 'UserData');
// Scripts/UserData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpManager_1 = require("./NetWork/HttpManager");
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
var PlayerLevelUp_1 = require("./JsonData/PlayerLevelUp");
var UIConfig_1 = require("./UI/UIConfig");
var UIManager_1 = require("./UI/UIManager");
var UserData = /** @class */ (function () {
    function UserData() {
        /**用户的服务器数据是否加载完毕 */
        this.is_load_ok = false;
        /**版本检测是否完毕 */
        this.version_is_ok = false;
    }
    //初始化游戏数据    
    UserData.prototype.init = function () {
        if (!this.getUserID()) {
            this.HttpPostGetUserId(this.randomDeviceId(16), "Organic");
        }
        else {
            this.is_load_ok = true;
        }
    };
    UserData.getInstance = function () {
        if (this._instance == null) {
            this._instance = new UserData();
            this._instance.init();
        }
        return this._instance;
    };
    UserData.prototype.randomLetter = function (len) {
        var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var res = '';
        for (var i = 0; i < len; i++) {
            var n = Math.floor(Math.random() * letters.length);
            res += letters[n];
        }
        return res;
    };
    UserData.prototype.randomDeviceId = function (len) {
        var letters = "abcdefghijklmnopqrstuvwxyz0123456789";
        var res = '';
        for (var i = 0; i < len; i++) {
            var n = Math.floor(Math.random() * letters.length);
            res += letters[n];
        }
        return res;
    };
    //添加
    UserData.prototype.addUserLevel = function (num) {
        var newNum = this.getUserLevel() + num;
        if (newNum >= 0) {
            this.saveUserLevel(newNum);
            return true;
        }
        return false;
    };
    UserData.prototype.getUserLevel = function () {
        var num = cc.sys.localStorage.getItem('user_level');
        if (num === "" || num === null) {
            num = 1;
        }
        else {
            num = parseInt(num);
        }
        return num;
    };
    //保存数量
    UserData.prototype.saveUserLevel = function (newNum) {
        cc.sys.localStorage.setItem('user_level', newNum);
    };
    //更改数量
    UserData.prototype.changeUserExp = function (num) {
        var newNum = this.getUserExp() + num;
        if (newNum >= 0) {
            this.saveUserExp(newNum);
            return true;
        }
        return false;
    };
    UserData.prototype.getUserExp = function () {
        var num = cc.sys.localStorage.getItem('user_exp');
        if (num === "" || num === null) {
            num = 0;
        }
        else {
            num = parseInt(num);
        }
        return num;
    };
    //保存数量
    UserData.prototype.saveUserExp = function (newNum) {
        cc.sys.localStorage.setItem('user_exp', newNum);
        var level = this.getUserLevel();
        var maxLevel = PlayerLevelUp_1.PlayerLevelUpManager.getMaxPlayerLevel();
        GameManager_1.default.getInstance().refreshUserExpShow();
        if (level < maxLevel && newNum >= PlayerLevelUp_1.PlayerLevelUpManager.getInstance().getPlayerExpCost(level)) {
            //显示玩家升级
            // UIManager.getInstance().showUserLevelUi();
            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.UserLevel, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) { }, });
        }
    };
    //********************************************账户信息*************************************************   
    UserData.prototype.getUserName = function () {
        var str = cc.sys.localStorage.getItem('user_name');
        if (str === '' || str === null) {
            str = this.randomLetter(8);
            this.saveUserName(str);
        }
        return str;
    };
    UserData.prototype.saveUserName = function (str) {
        cc.sys.localStorage.setItem('user_name', str);
    };
    UserData.prototype.getUserID = function () {
        var str = cc.sys.localStorage.getItem('user_id');
        if (str === '' || str === null) {
            //请求网络获得uid
            str = "";
            this.saveUserID(str);
        }
        // if(cc.sys.isNative==false)
        // {
        //     if(str==='' || str===null){
        //         str="Unattributed16520878400a0";
        //         this.saveUserID(str);
        //     }
        // }
        return str;
    };
    UserData.prototype.saveUserID = function (str) {
        cc.sys.localStorage.setItem('user_id', str);
    };
    UserData.prototype.getVersion = function () {
        var str = cc.sys.localStorage.getItem('game_version');
        if (str === '' || str === null) {
            str = '1.2.2';
            //this.saveVersion(str);
        }
        return str;
    };
    UserData.prototype.saveVersion = function (str) {
        cc.sys.localStorage.setItem('game_version', str);
    };
    UserData.prototype.getUserAvatar = function () {
        var str = cc.sys.localStorage.getItem('user_avatar');
        if (str === '' || str === null) {
            str = 8;
            this.saveUserAvatar(str);
        }
        str = parseInt(str);
        return str;
    };
    UserData.prototype.saveUserAvatar = function (str) {
        cc.sys.localStorage.setItem('user_avatar', str);
    };
    /**请求网络生成一个uuid */
    UserData.prototype.HttpPostGetUserId = function (deviceId, network) {
        var _this = this;
        if (this.getUserID()) {
            return;
        }
        var json = {
            uid: "",
            network: network,
            user: network,
            appVer: "",
            phoneModel: "HuaWei",
            pkg: "com.IdleHeroCastleDefense",
            sysVer: 31,
            lang: "zh",
            maxLevel: "0",
            totalOnlineDur: "0",
            deviceId: deviceId,
            name: "Test-" + this.randomLetter(4)
        };
        //this.saveUserID("123456789");
        // this.is_load_ok=true;
        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.userBasic, JSON.stringify(json)).then(function (data) {
            if (data.uid) {
                _this.saveUserID(data.uid);
                _this.is_load_ok = true;
            }
        }).catch(function (error) {
            cc.error(error);
            //反复请求
            _this.HttpPostGetUserId(deviceId, network);
        });
    };
    /**请求网络检测版本 */
    UserData.prototype.HttpPostCheckVersion = function () {
        var _this = this;
        if (cc.sys.isNative) {
            HttpManager_1.HttpManager.post(HttpManager_1.AccessName.versionGet, JSON.stringify({})).then(function (data) {
                if (data) {
                    if (data > Constants_1.CurVersionCode) {
                        cc.resources.load("loading/version_tip", cc.Prefab, function (error, assets) {
                            if (error) {
                                cc.log(error);
                                return;
                            }
                            var node = cc.instantiate(assets);
                            node.x = 0;
                            node.y = 0;
                            cc.find("Canvas").addChild(node);
                        });
                    }
                    else {
                        _this.version_is_ok = true;
                    }
                }
                else {
                    _this.version_is_ok = true;
                }
            }).catch(function (error) {
                cc.error(error);
                _this.version_is_ok = true;
            });
        }
        else {
            this.version_is_ok = true;
        }
    };
    UserData._instance = null;
    return UserData;
}());
exports.default = UserData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVXNlckRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxxREFBZ0U7QUFFaEUseUNBQXNEO0FBQ3RELDZDQUF3QztBQUN4QywwREFBZ0U7QUFDaEUsMENBQXFEO0FBQ3JELDRDQUEyQztBQUUzQztJQUFBO1FBR0ksb0JBQW9CO1FBQ2IsZUFBVSxHQUFTLEtBQUssQ0FBQztRQUVoQyxjQUFjO1FBQ1Asa0JBQWEsR0FBUyxLQUFLLENBQUM7SUEwUHZDLENBQUM7SUF4UEcsYUFBYTtJQUNiLHVCQUFJLEdBQUo7UUFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFDO1lBQ2pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxFQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzdEO2FBQUk7WUFDRCxJQUFJLENBQUMsVUFBVSxHQUFDLElBQUksQ0FBQztTQUN4QjtJQUNMLENBQUM7SUFJYSxvQkFBVyxHQUF6QjtRQUVJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQ3ZCO1lBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELCtCQUFZLEdBQVosVUFBYSxHQUFVO1FBRW5CLElBQU0sT0FBTyxHQUFHLHNEQUFzRCxDQUFDO1FBQ3ZFLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtRQUNaLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsT0FBTyxD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O0NBalFELEFBaVFDLElBQUE7a0JBalFvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IEFjY2Vzc05hbWUsIEh0dHBNYW5hZ2VyIH0gZnJvbSBcIi4vTmV0V29yay9IdHRwTWFuYWdlclwiO1xyXG5pbXBvcnQgQXBrTWFuYWdlciBmcm9tIFwiLi9BZHMvQXBrTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBDdXJWZXJzaW9uQ29kZSwgSXNEZWJ1ZyB9IGZyb20gXCIuL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUGxheWVyTGV2ZWxVcE1hbmFnZXIgfSBmcm9tIFwiLi9Kc29uRGF0YS9QbGF5ZXJMZXZlbFVwXCI7XHJcbmltcG9ydCB7IFVJTGF5ZXJMZXZlbCwgVUlQYXRoIH0gZnJvbSBcIi4vVUkvVUlDb25maWdcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4vVUkvVUlNYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyRGF0YSB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBVc2VyRGF0YSA9IG51bGw7XHJcbiAgICAvKirnlKjmiLfnmoTmnI3liqHlmajmlbDmja7mmK/lkKbliqDovb3lrozmr5UgKi9cclxuICAgIHB1YmxpYyBpc19sb2FkX29rOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgLyoq54mI5pys5qOA5rWL5piv5ZCm5a6M5q+VICovXHJcbiAgICBwdWJsaWMgdmVyc2lvbl9pc19vazpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uICAgIFxyXG4gICAgaW5pdCAoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZ2V0VXNlcklEKCkpe1xyXG4gICAgICAgICAgICB0aGlzLkh0dHBQb3N0R2V0VXNlcklkKHRoaXMucmFuZG9tRGV2aWNlSWQoMTYpLFwiT3JnYW5pY1wiKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5pc19sb2FkX29rPXRydWU7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIFxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOlVzZXJEYXRhXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgVXNlckRhdGEoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmFuZG9tTGV0dGVyKGxlbjpudW1iZXIpOnN0cmluZyBcclxuICAgIHtcclxuICAgICAgICBjb25zdCBsZXR0ZXJzID0gXCJhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXCI7XHJcbiAgICAgICAgbGV0IHJlcyA9ICcnXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxldHRlcnMubGVuZ3RoKVxyXG4gICAgICAgICAgICByZXMgKz0gbGV0dGVyc1tuXVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzXHJcbiAgICB9XHJcblxyXG4gICAgcmFuZG9tRGV2aWNlSWQobGVuOm51bWJlcik6c3RyaW5nIFxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGxldHRlcnMgPSBcImFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OVwiO1xyXG4gICAgICAgIGxldCByZXMgPSAnJ1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsZXR0ZXJzLmxlbmd0aClcclxuICAgICAgICAgICAgcmVzICs9IGxldHRlcnNbbl1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc1xyXG4gICAgfVxyXG5cclxuICAgIC8v5re75YqgXHJcbiAgICBhZGRVc2VyTGV2ZWwobnVtOm51bWJlcik6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIGxldCBuZXdOdW09dGhpcy5nZXRVc2VyTGV2ZWwoKStudW07XHJcbiAgICAgICAgaWYobmV3TnVtPj0wKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZVVzZXJMZXZlbChuZXdOdW0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFVzZXJMZXZlbCgpOm51bWJlcntcclxuICAgICAgICBsZXQgbnVtPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcl9sZXZlbCcpO1xyXG4gICAgICAgIGlmKG51bT09PVwiXCIgfHwgbnVtPT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG51bT0xO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBudW09cGFyc2VJbnQobnVtKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxuXHJcbiAgICAvL+S/neWtmOaVsOmHj1xyXG4gICAgc2F2ZVVzZXJMZXZlbChuZXdOdW06bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcl9sZXZlbCcsIG5ld051bSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mm7TmlLnmlbDph49cclxuICAgIGNoYW5nZVVzZXJFeHAobnVtOm51bWJlcik6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIGxldCBuZXdOdW09dGhpcy5nZXRVc2VyRXhwKCkrbnVtO1xyXG4gICAgICAgIGlmKG5ld051bT49MCkge1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVVc2VyRXhwKG5ld051bSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VXNlckV4cCgpOm51bWJlcntcclxuICAgICAgICBsZXQgbnVtPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcl9leHAnKTtcclxuICAgICAgICBpZihudW09PT1cIlwiIHx8IG51bT09PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBudW09MDsgICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbnVtPXBhcnNlSW50KG51bSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudW07XHJcbiAgICB9XHJcblxyXG4gICAgLy/kv53lrZjmlbDph49cclxuICAgIHNhdmVVc2VyRXhwKG5ld051bTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyX2V4cCcsIG5ld051bSk7XHJcbiAgICAgICAgbGV0IGxldmVsPXRoaXMuZ2V0VXNlckxldmVsKCk7XHJcbiAgICAgICAgbGV0IG1heExldmVsPVBsYXllckxldmVsVXBNYW5hZ2VyLmdldE1heFBsYXllckxldmVsKCk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoVXNlckV4cFNob3coKTtcclxuICAgICAgICBpZihsZXZlbDxtYXhMZXZlbCAmJiBuZXdOdW0gPj0gUGxheWVyTGV2ZWxVcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQbGF5ZXJFeHBDb3N0KGxldmVsKSl7XHJcbiAgICAgICAgICAgIC8v5pi+56S6546p5a625Y2H57qnXHJcbiAgICAgICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVc2VyTGV2ZWxVaSgpO1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlVzZXJMZXZlbCxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHt9LH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq6LSm5oi35L+h5oGvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgIFxyXG4gICAgZ2V0VXNlck5hbWUoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICBsZXQgc3RyPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcl9uYW1lJyk7XHJcbiAgICAgICAgaWYoc3RyPT09JycgfHwgc3RyPT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0cj10aGlzLnJhbmRvbUxldHRlcig4KTtcclxuICAgICAgICAgICAgdGhpcy5zYXZlVXNlck5hbWUoc3RyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlVXNlck5hbWUoc3RyOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXJfbmFtZScsc3RyKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRVc2VySUQoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICBsZXQgc3RyPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcl9pZCcpO1xyXG4gICAgICAgIGlmKHN0cj09PScnIHx8IHN0cj09PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+ivt+axgue9kee7nOiOt+W+l3VpZFxyXG4gICAgICAgICAgICBzdHI9XCJcIjtcclxuICAgICAgICAgICAgdGhpcy5zYXZlVXNlcklEKHN0cik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmKGNjLnN5cy5pc05hdGl2ZT09ZmFsc2UpXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBpZihzdHI9PT0nJyB8fCBzdHI9PT1udWxsKXtcclxuICAgICAgICAvLyAgICAgICAgIHN0cj1cIlVuYXR0cmlidXRlZDE2NTIwODc4NDAwYTBcIjtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuc2F2ZVVzZXJJRChzdHIpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZVVzZXJJRChzdHI6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcl9pZCcsc3RyKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRWZXJzaW9uKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHN0cj1jYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2dhbWVfdmVyc2lvbicpO1xyXG4gICAgICAgIGlmKHN0cj09PScnIHx8IHN0cj09PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdHI9JzEuMi4yJ1xyXG4gICAgICAgICAgICAvL3RoaXMuc2F2ZVZlcnNpb24oc3RyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlVmVyc2lvbihzdHI6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZ2FtZV92ZXJzaW9uJyxzdHIpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFVzZXJBdmF0YXIoKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICBsZXQgc3RyPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcl9hdmF0YXInKTtcclxuICAgICAgICBpZihzdHI9PT0nJyB8fCBzdHI9PT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RyPTg7XHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZVVzZXJBdmF0YXIoc3RyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RyPXBhcnNlSW50KHN0cik7XHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlVXNlckF2YXRhcihzdHI6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcl9hdmF0YXInLHN0cik7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICAvKiror7fmsYLnvZHnu5znlJ/miJDkuIDkuKp1dWlkICovXHJcbiAgICBIdHRwUG9zdEdldFVzZXJJZChkZXZpY2VJZDpzdHJpbmcsbmV0d29yazpzdHJpbmcpe1xyXG4gICAgICAgIGlmKHRoaXMuZ2V0VXNlcklEKCkpe1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGpzb249e1xyXG4gICAgICAgICAgICB1aWQ6XCJcIiwvL+S8oOepuuihqOekuuiOt+W+l+eUn+aIkFxyXG4gICAgICAgICAgICBuZXR3b3JrOm5ldHdvcmssXHJcbiAgICAgICAgICAgIHVzZXI6bmV0d29yayxcclxuICAgICAgICAgICAgYXBwVmVyOlwiXCIsXHJcbiAgICAgICAgICAgIHBob25lTW9kZWw6XCJIdWFXZWlcIixcclxuICAgICAgICAgICAgcGtnOlwiY29tLklkbGVIZXJvQ2FzdGxlRGVmZW5zZVwiLFxyXG4gICAgICAgICAgICBzeXNWZXI6MzEsXHJcbiAgICAgICAgICAgIGxhbmc6XCJ6aFwiLFxyXG4gICAgICAgICAgICBtYXhMZXZlbDpcIjBcIixcclxuICAgICAgICAgICAgdG90YWxPbmxpbmVEdXI6XCIwXCIsXHJcbiAgICAgICAgICAgIGRldmljZUlkOmRldmljZUlkLFxyXG4gICAgICAgICAgICBuYW1lOlwiVGVzdC1cIit0aGlzLnJhbmRvbUxldHRlcig0KVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL3RoaXMuc2F2ZVVzZXJJRChcIjEyMzQ1Njc4OVwiKTtcclxuICAgICAgICAvLyB0aGlzLmlzX2xvYWRfb2s9dHJ1ZTtcclxuICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUudXNlckJhc2ljLEpTT04uc3RyaW5naWZ5KGpzb24pKS50aGVuKChkYXRhOmFueSk9PntcclxuICAgICAgICAgICAgaWYoZGF0YS51aWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlVXNlcklEKGRhdGEudWlkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9vaz10cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKT0+e1xyXG4gICAgICAgICAgICBjYy5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIC8v5Y+N5aSN6K+35rGCXHJcbiAgICAgICAgICAgIHRoaXMuSHR0cFBvc3RHZXRVc2VySWQoZGV2aWNlSWQsbmV0d29yayk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6K+35rGC572R57uc5qOA5rWL54mI5pysICovXHJcbiAgICBIdHRwUG9zdENoZWNrVmVyc2lvbigpe1xyXG4gICAgICAgIGlmKGNjLnN5cy5pc05hdGl2ZSl7XHJcbiAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS52ZXJzaW9uR2V0LEpTT04uc3RyaW5naWZ5KHt9KSkudGhlbigoZGF0YTphbnkpPT57XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhPkN1clZlcnNpb25Db2RlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoXCJsb2FkaW5nL3ZlcnNpb25fdGlwXCIsY2MuUHJlZmFiLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5QcmVmYWIpPT57ICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBub2RlPWNjLmluc3RhbnRpYXRlKGFzc2V0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLng9MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUueT0wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmVyc2lvbl9pc19vaz10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZlcnNpb25faXNfb2s9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuY2F0Y2goKGVycm9yKT0+e1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52ZXJzaW9uX2lzX29rPXRydWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnZlcnNpb25faXNfb2s9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==