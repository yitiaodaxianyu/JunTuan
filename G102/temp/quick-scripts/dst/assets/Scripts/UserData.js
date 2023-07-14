
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVXNlckRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxxREFBZ0U7QUFFaEUseUNBQXNEO0FBQ3RELDZDQUF3QztBQUN4QywwREFBZ0U7QUFDaEUsMENBQXFEO0FBQ3JELDRDQUEyQztBQUUzQztJQUFBO1FBR0ksb0JBQW9CO1FBQ2IsZUFBVSxHQUFTLEtBQUssQ0FBQztRQUVoQyxjQUFjO1FBQ1Asa0JBQWEsR0FBUyxLQUFLLENBQUM7SUF3UHZDLENBQUM7SUF0UEcsYUFBYTtJQUNiLHVCQUFJLEdBQUo7UUFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFDO1lBQ2pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxFQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzdEO2FBQUk7WUFDRCxJQUFJLENBQUMsVUFBVSxHQUFDLElBQUksQ0FBQztTQUN4QjtJQUNMLENBQUM7SUFJYSxvQkFBVyxHQUF6QjtRQUVJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQ3ZCO1lBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELCtCQUFZLEdBQVosVUFBYSxHQUFVO1FBRW5CLElBQU0sT0FBTyxHQUFHLHNEQUFzRCxDQUFDO1FBQ3ZFLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtRQUNaLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsT0FBTyxD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UUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBBY2Nlc3NOYW1lLCBIdHRwTWFuYWdlciB9IGZyb20gXCIuL05ldFdvcmsvSHR0cE1hbmFnZXJcIjtcclxuaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4vQWRzL0Fwa01hbmFnZXJcIjtcclxuaW1wb3J0IHsgQ3VyVmVyc2lvbkNvZGUsIElzRGVidWcgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFBsYXllckxldmVsVXBNYW5hZ2VyIH0gZnJvbSBcIi4vSnNvbkRhdGEvUGxheWVyTGV2ZWxVcFwiO1xyXG5pbXBvcnQgeyBVSUxheWVyTGV2ZWwsIFVJUGF0aCB9IGZyb20gXCIuL1VJL1VJQ29uZmlnXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuL1VJL1VJTWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckRhdGEge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogVXNlckRhdGEgPSBudWxsO1xyXG4gICAgLyoq55So5oi355qE5pyN5Yqh5Zmo5pWw5o2u5piv5ZCm5Yqg6L295a6M5q+VICovXHJcbiAgICBwdWJsaWMgaXNfbG9hZF9vazpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIC8qKueJiOacrOajgOa1i+aYr+WQpuWujOavlSAqL1xyXG4gICAgcHVibGljIHZlcnNpb25faXNfb2s6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNriAgICBcclxuICAgIGluaXQgKCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmdldFVzZXJJRCgpKXtcclxuICAgICAgICAgICAgdGhpcy5IdHRwUG9zdEdldFVzZXJJZCh0aGlzLnJhbmRvbURldmljZUlkKDE2KSxcIk9yZ2FuaWNcIik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9vaz10cnVlO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpVc2VyRGF0YVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IFVzZXJEYXRhKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJhbmRvbUxldHRlcihsZW46bnVtYmVyKTpzdHJpbmcgXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgbGV0dGVycyA9IFwiYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWlwiO1xyXG4gICAgICAgIGxldCByZXMgPSAnJ1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsZXR0ZXJzLmxlbmd0aClcclxuICAgICAgICAgICAgcmVzICs9IGxldHRlcnNbbl1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc1xyXG4gICAgfVxyXG5cclxuICAgIHJhbmRvbURldmljZUlkKGxlbjpudW1iZXIpOnN0cmluZyBcclxuICAgIHtcclxuICAgICAgICBjb25zdCBsZXR0ZXJzID0gXCJhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODlcIjtcclxuICAgICAgICBsZXQgcmVzID0gJydcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBuID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGV0dGVycy5sZW5ndGgpXHJcbiAgICAgICAgICAgIHJlcyArPSBsZXR0ZXJzW25dXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXNcclxuICAgIH1cclxuXHJcbiAgICAvL+a3u+WKoFxyXG4gICAgYWRkVXNlckxldmVsKG51bTpudW1iZXIpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICBsZXQgbmV3TnVtPXRoaXMuZ2V0VXNlckxldmVsKCkrbnVtO1xyXG4gICAgICAgIGlmKG5ld051bT49MCkge1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVVc2VyTGV2ZWwobmV3TnVtKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRVc2VyTGV2ZWwoKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IG51bT1jYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJfbGV2ZWwnKTtcclxuICAgICAgICBpZihudW09PT1cIlwiIHx8IG51bT09PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBudW09MTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbnVtPXBhcnNlSW50KG51bSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudW07XHJcbiAgICB9XHJcblxyXG4gICAgLy/kv53lrZjmlbDph49cclxuICAgIHNhdmVVc2VyTGV2ZWwobmV3TnVtOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXJfbGV2ZWwnLCBuZXdOdW0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pu05pS55pWw6YePXHJcbiAgICBjaGFuZ2VVc2VyRXhwKG51bTpudW1iZXIpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICBsZXQgbmV3TnVtPXRoaXMuZ2V0VXNlckV4cCgpK251bTtcclxuICAgICAgICBpZihuZXdOdW0+PTApIHtcclxuICAgICAgICAgICAgdGhpcy5zYXZlVXNlckV4cChuZXdOdW0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFVzZXJFeHAoKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IG51bT1jYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJfZXhwJyk7XHJcbiAgICAgICAgaWYobnVtPT09XCJcIiB8fCBudW09PT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbnVtPTA7ICAgICAgICAgICAgXHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG51bT1wYXJzZUludChudW0pOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5L+d5a2Y5pWw6YePXHJcbiAgICBzYXZlVXNlckV4cChuZXdOdW06bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcl9leHAnLCBuZXdOdW0pO1xyXG4gICAgICAgIGxldCBsZXZlbD10aGlzLmdldFVzZXJMZXZlbCgpO1xyXG4gICAgICAgIGxldCBtYXhMZXZlbD1QbGF5ZXJMZXZlbFVwTWFuYWdlci5nZXRNYXhQbGF5ZXJMZXZlbCgpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVmcmVzaFVzZXJFeHBTaG93KCk7XHJcbiAgICAgICAgaWYobGV2ZWw8bWF4TGV2ZWwgJiYgbmV3TnVtID49IFBsYXllckxldmVsVXBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGxheWVyRXhwQ29zdChsZXZlbCkpe1xyXG4gICAgICAgICAgICAvL+aYvuekuueOqeWutuWNh+e6p1xyXG4gICAgICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VXNlckxldmVsVWkoKTtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5Vc2VyTGV2ZWwsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7fSx9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKui0puaIt+S/oeaBryoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogICBcclxuICAgIGdldFVzZXJOYW1lKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHN0cj1jYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJfbmFtZScpO1xyXG4gICAgICAgIGlmKHN0cj09PScnIHx8IHN0cj09PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdHI9dGhpcy5yYW5kb21MZXR0ZXIoOCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZVVzZXJOYW1lKHN0cik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZVVzZXJOYW1lKHN0cjpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyX25hbWUnLHN0cik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VXNlcklEKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHN0cj1jYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJfaWQnKTtcclxuICAgICAgICBpZihzdHI9PT0nJyB8fCBzdHI9PT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/or7fmsYLnvZHnu5zojrflvpd1aWRcclxuICAgICAgICAgICAgc3RyPVwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZVVzZXJJRChzdHIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZihjYy5zeXMuaXNOYXRpdmU9PWZhbHNlKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgaWYoc3RyPT09JycgfHwgc3RyPT09bnVsbCl7XHJcbiAgICAgICAgLy8gICAgICAgICBzdHI9XCJVbmF0dHJpYnV0ZWQxNjUyMDg3ODQwMGEwXCI7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnNhdmVVc2VySUQoc3RyKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVVc2VySUQoc3RyOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXJfaWQnLHN0cik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VmVyc2lvbigpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIGxldCBzdHI9Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnYW1lX3ZlcnNpb24nKTtcclxuICAgICAgICBpZihzdHI9PT0nJyB8fCBzdHI9PT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RyPScxLjIuMidcclxuICAgICAgICAgICAgLy90aGlzLnNhdmVWZXJzaW9uKHN0cik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZVZlcnNpb24oc3RyOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2dhbWVfdmVyc2lvbicsc3RyKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRVc2VyQXZhdGFyKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHN0cj1jYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJfYXZhdGFyJyk7XHJcbiAgICAgICAgaWYoc3RyPT09JycgfHwgc3RyPT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0cj04O1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVVc2VyQXZhdGFyKHN0cik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0cj1wYXJzZUludChzdHIpO1xyXG4gICAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZVVzZXJBdmF0YXIoc3RyOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXJfYXZhdGFyJyxzdHIpO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgLyoq6K+35rGC572R57uc55Sf5oiQ5LiA5LiqdXVpZCAqL1xyXG4gICAgSHR0cFBvc3RHZXRVc2VySWQoZGV2aWNlSWQ6c3RyaW5nLG5ldHdvcms6c3RyaW5nKXtcclxuICAgICAgICBpZih0aGlzLmdldFVzZXJJRCgpKXtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBqc29uPXtcclxuICAgICAgICAgICAgdWlkOlwiXCIsLy/kvKDnqbrooajnpLrojrflvpfnlJ/miJBcclxuICAgICAgICAgICAgbmV0d29yazpuZXR3b3JrLFxyXG4gICAgICAgICAgICB1c2VyOm5ldHdvcmssXHJcbiAgICAgICAgICAgIGFwcFZlcjpcIlwiLFxyXG4gICAgICAgICAgICBwaG9uZU1vZGVsOlwiSHVhV2VpXCIsXHJcbiAgICAgICAgICAgIHBrZzpcImNvbS5JZGxlSGVyb0Nhc3RsZURlZmVuc2VcIixcclxuICAgICAgICAgICAgc3lzVmVyOjMxLFxyXG4gICAgICAgICAgICBsYW5nOlwiemhcIixcclxuICAgICAgICAgICAgbWF4TGV2ZWw6XCIwXCIsXHJcbiAgICAgICAgICAgIHRvdGFsT25saW5lRHVyOlwiMFwiLFxyXG4gICAgICAgICAgICBkZXZpY2VJZDpkZXZpY2VJZCxcclxuICAgICAgICAgICAgbmFtZTpcIlRlc3QtXCIrdGhpcy5yYW5kb21MZXR0ZXIoNClcclxuICAgICAgICB9XHJcbiAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnVzZXJCYXNpYyxKU09OLnN0cmluZ2lmeShqc29uKSkudGhlbigoZGF0YTphbnkpPT57XHJcbiAgICAgICAgICAgIGlmKGRhdGEudWlkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZVVzZXJJRChkYXRhLnVpZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzX2xvYWRfb2s9dHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmNhdGNoKChlcnJvcik9PntcclxuICAgICAgICAgICAgY2MuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICAvL+WPjeWkjeivt+axglxyXG4gICAgICAgICAgICB0aGlzLkh0dHBQb3N0R2V0VXNlcklkKGRldmljZUlkLG5ldHdvcmspO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuivt+axgue9kee7nOajgOa1i+eJiOacrCAqL1xyXG4gICAgSHR0cFBvc3RDaGVja1ZlcnNpb24oKXtcclxuICAgICAgICBpZihjYy5zeXMuaXNOYXRpdmUpe1xyXG4gICAgICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUudmVyc2lvbkdldCxKU09OLnN0cmluZ2lmeSh7fSkpLnRoZW4oKGRhdGE6YW55KT0+e1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YT5DdXJWZXJzaW9uQ29kZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnJlc291cmNlcy5sb2FkKFwibG9hZGluZy92ZXJzaW9uX3RpcFwiLGNjLlByZWZhYiwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuUHJlZmFiKT0+eyAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS54PTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLnk9MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZlcnNpb25faXNfb2s9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52ZXJzaW9uX2lzX29rPXRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKChlcnJvcik9PntcclxuICAgICAgICAgICAgICAgIGNjLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudmVyc2lvbl9pc19vaz10cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy52ZXJzaW9uX2lzX29rPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=