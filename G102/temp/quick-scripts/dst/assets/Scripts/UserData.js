
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
        // if(cc.sys.isNative){
        //     HttpManager.post(AccessName.versionGet,JSON.stringify({})).then((data:any)=>{
        //         if(data){
        //             if(data>CurVersionCode){
        //                 WXManagerEX.getInstance().resourcesBundle.load("loading/version_tip",cc.Prefab,(error: Error, assets:cc.Prefab)=>{  
        //                     if(error){
        //                         cc.log(error);
        //                         return;
        //                     }
        //                     let node=cc.instantiate(assets);
        //                     node.x=0;
        //                     node.y=0;
        //                     cc.find("Canvas").addChild(node);
        //                 });
        //             }else{
        //                 this.version_is_ok=true;
        //             }                
        //         }else{
        //             this.version_is_ok=true;
        //         }
        //     }).catch((error)=>{
        //         cc.error(error);
        //         this.version_is_ok=true;
        //     });
        // }else
        // {
        this.version_is_ok = true;
        //}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVXNlckRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxxREFBZ0U7QUFHaEUsNkNBQXdDO0FBQ3hDLDBEQUFnRTtBQUNoRSwwQ0FBcUQ7QUFDckQsNENBQTJDO0FBRzNDO0lBQUE7UUFHSSxvQkFBb0I7UUFDYixlQUFVLEdBQVMsS0FBSyxDQUFDO1FBRWhDLGNBQWM7UUFDUCxrQkFBYSxHQUFTLEtBQUssQ0FBQztJQTBQdkMsQ0FBQztJQXhQRyxhQUFhO0lBQ2IsdUJBQUksR0FBSjtRQUNJLElBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUM7WUFDakIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEVBQUMsU0FBUyxDQUFDLENBQUM7U0FDN0Q7YUFBSTtZQUNELElBQUksQ0FBQyxVQUFVLEdBQUMsSUFBSSxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQztJQUlhLG9CQUFXLEdBQXpCO1FBRUksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFDdkI7WUFDSSxJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksUUFBUSxFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsK0JBQVksR0FBWixVQUFhLEdBQVU7UUFFbkIsSUFBTSxPQUFPLEdBQUcsc0RBQXNELENBQUM7UUFDdkUsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO1FBQ1osS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFD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STtRQUN2SSxpQ0FBaUM7UUFDakMseUNBQXlDO1FBQ3pDLGtDQUFrQztRQUNsQyx3QkFBd0I7UUFDeEIsdURBQXVEO1FBQ3ZELGdDQUFnQztRQUNoQyxnQ0FBZ0M7UUFDaEMsd0RBQXdEO1FBQ3hELHNCQUFzQjtRQUN0QixxQkFBcUI7UUFDckIsMkNBQTJDO1FBQzNDLGdDQUFnQztRQUNoQyxpQkFBaUI7UUFDakIsdUNBQXVDO1FBQ3ZDLFlBQVk7UUFDWiwwQkFBMEI7UUFDMUIsMkJBQTJCO1FBQzNCLG1DQUFtQztRQUNuQyxVQUFVO1FBQ1YsUUFBUTtRQUNSLElBQUk7UUFDQSxJQUFJLENBQUMsYUFBYSxHQUFDLElBQUksQ0FBQztRQUM1QixHQUFHO0lBQ1AsQ0FBQztJQTlQYyxrQkFBUyxHQUFhLElBQUksQ0FBQztJQStQOUMsZUFBQztDQWpRRCxBQWlRQyxJQUFBO2tCQWpRb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBBY2Nlc3NOYW1lLCBIdHRwTWFuYWdlciB9IGZyb20gXCIuL05ldFdvcmsvSHR0cE1hbmFnZXJcIjtcclxuaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4vQWRzL0Fwa01hbmFnZXJcIjtcclxuaW1wb3J0IHsgQ3VyVmVyc2lvbkNvZGUsIElzRGVidWcgfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFBsYXllckxldmVsVXBNYW5hZ2VyIH0gZnJvbSBcIi4vSnNvbkRhdGEvUGxheWVyTGV2ZWxVcFwiO1xyXG5pbXBvcnQgeyBVSUxheWVyTGV2ZWwsIFVJUGF0aCB9IGZyb20gXCIuL1VJL1VJQ29uZmlnXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuL1VJL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgV1hNYW5hZ2VyRVggZnJvbSBcIi4uL3N0YXJ0c2NlbmUvV1hNYW5hZ2VyRVhcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJEYXRhIHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFVzZXJEYXRhID0gbnVsbDtcclxuICAgIC8qKueUqOaIt+eahOacjeWKoeWZqOaVsOaNruaYr+WQpuWKoOi9veWujOavlSAqL1xyXG4gICAgcHVibGljIGlzX2xvYWRfb2s6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICAvKirniYjmnKzmo4DmtYvmmK/lkKblrozmr5UgKi9cclxuICAgIHB1YmxpYyB2ZXJzaW9uX2lzX29rOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja4gICAgXHJcbiAgICBpbml0ICgpIHtcclxuICAgICAgICBpZighdGhpcy5nZXRVc2VySUQoKSl7XHJcbiAgICAgICAgICAgIHRoaXMuSHR0cFBvc3RHZXRVc2VySWQodGhpcy5yYW5kb21EZXZpY2VJZCgxNiksXCJPcmdhbmljXCIpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfb2s9dHJ1ZTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6VXNlckRhdGFcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBVc2VyRGF0YSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICByYW5kb21MZXR0ZXIobGVuOm51bWJlcik6c3RyaW5nIFxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGxldHRlcnMgPSBcImFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpcIjtcclxuICAgICAgICBsZXQgcmVzID0gJydcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBuID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGV0dGVycy5sZW5ndGgpXHJcbiAgICAgICAgICAgIHJlcyArPSBsZXR0ZXJzW25dXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXNcclxuICAgIH1cclxuXHJcbiAgICByYW5kb21EZXZpY2VJZChsZW46bnVtYmVyKTpzdHJpbmcgXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgbGV0dGVycyA9IFwiYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5XCI7XHJcbiAgICAgICAgbGV0IHJlcyA9ICcnXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxldHRlcnMubGVuZ3RoKVxyXG4gICAgICAgICAgICByZXMgKz0gbGV0dGVyc1tuXVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzXHJcbiAgICB9XHJcblxyXG4gICAgLy/mt7vliqBcclxuICAgIGFkZFVzZXJMZXZlbChudW06bnVtYmVyKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG5ld051bT10aGlzLmdldFVzZXJMZXZlbCgpK251bTtcclxuICAgICAgICBpZihuZXdOdW0+PTApIHtcclxuICAgICAgICAgICAgdGhpcy5zYXZlVXNlckxldmVsKG5ld051bSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VXNlckxldmVsKCk6bnVtYmVye1xyXG4gICAgICAgIGxldCBudW09Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyX2xldmVsJyk7XHJcbiAgICAgICAgaWYobnVtPT09XCJcIiB8fCBudW09PT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbnVtPTE7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG51bT1wYXJzZUludChudW0pOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5L+d5a2Y5pWw6YePXHJcbiAgICBzYXZlVXNlckxldmVsKG5ld051bTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyX2xldmVsJywgbmV3TnVtKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+abtOaUueaVsOmHj1xyXG4gICAgY2hhbmdlVXNlckV4cChudW06bnVtYmVyKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG5ld051bT10aGlzLmdldFVzZXJFeHAoKStudW07XHJcbiAgICAgICAgaWYobmV3TnVtPj0wKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZVVzZXJFeHAobmV3TnVtKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRVc2VyRXhwKCk6bnVtYmVye1xyXG4gICAgICAgIGxldCBudW09Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyX2V4cCcpO1xyXG4gICAgICAgIGlmKG51bT09PVwiXCIgfHwgbnVtPT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG51bT0wOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBudW09cGFyc2VJbnQobnVtKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxuXHJcbiAgICAvL+S/neWtmOaVsOmHj1xyXG4gICAgc2F2ZVVzZXJFeHAobmV3TnVtOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXJfZXhwJywgbmV3TnVtKTtcclxuICAgICAgICBsZXQgbGV2ZWw9dGhpcy5nZXRVc2VyTGV2ZWwoKTtcclxuICAgICAgICBsZXQgbWF4TGV2ZWw9UGxheWVyTGV2ZWxVcE1hbmFnZXIuZ2V0TWF4UGxheWVyTGV2ZWwoKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hVc2VyRXhwU2hvdygpO1xyXG4gICAgICAgIGlmKGxldmVsPG1heExldmVsICYmIG5ld051bSA+PSBQbGF5ZXJMZXZlbFVwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBsYXllckV4cENvc3QobGV2ZWwpKXtcclxuICAgICAgICAgICAgLy/mmL7npLrnjqnlrrbljYfnuqdcclxuICAgICAgICAgICAgLy8gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VzZXJMZXZlbFVpKCk7XHJcbiAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguVXNlckxldmVsLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge30sfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirotKbmiLfkv6Hmga8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICAgXHJcbiAgICBnZXRVc2VyTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIGxldCBzdHI9Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyX25hbWUnKTtcclxuICAgICAgICBpZihzdHI9PT0nJyB8fCBzdHI9PT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RyPXRoaXMucmFuZG9tTGV0dGVyKDgpO1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVVc2VyTmFtZShzdHIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVVc2VyTmFtZShzdHI6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcl9uYW1lJyxzdHIpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFVzZXJJRCgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIGxldCBzdHI9Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyX2lkJyk7XHJcbiAgICAgICAgaWYoc3RyPT09JycgfHwgc3RyPT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v6K+35rGC572R57uc6I635b6XdWlkXHJcbiAgICAgICAgICAgIHN0cj1cIlwiO1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVVc2VySUQoc3RyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYoY2Muc3lzLmlzTmF0aXZlPT1mYWxzZSlcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIGlmKHN0cj09PScnIHx8IHN0cj09PW51bGwpe1xyXG4gICAgICAgIC8vICAgICAgICAgc3RyPVwiVW5hdHRyaWJ1dGVkMTY1MjA4Nzg0MDBhMFwiO1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zYXZlVXNlcklEKHN0cik7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlVXNlcklEKHN0cjpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyX2lkJyxzdHIpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFZlcnNpb24oKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICBsZXQgc3RyPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZ2FtZV92ZXJzaW9uJyk7XHJcbiAgICAgICAgaWYoc3RyPT09JycgfHwgc3RyPT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0cj0nMS4yLjInXHJcbiAgICAgICAgICAgIC8vdGhpcy5zYXZlVmVyc2lvbihzdHIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVWZXJzaW9uKHN0cjpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdnYW1lX3ZlcnNpb24nLHN0cik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VXNlckF2YXRhcigpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGxldCBzdHI9Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyX2F2YXRhcicpO1xyXG4gICAgICAgIGlmKHN0cj09PScnIHx8IHN0cj09PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdHI9ODtcclxuICAgICAgICAgICAgdGhpcy5zYXZlVXNlckF2YXRhcihzdHIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdHI9cGFyc2VJbnQoc3RyKTtcclxuICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVVc2VyQXZhdGFyKHN0cjpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyX2F2YXRhcicsc3RyKTtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIC8qKuivt+axgue9kee7nOeUn+aIkOS4gOS4qnV1aWQgKi9cclxuICAgIEh0dHBQb3N0R2V0VXNlcklkKGRldmljZUlkOnN0cmluZyxuZXR3b3JrOnN0cmluZyl7XHJcbiAgICAgICAgaWYodGhpcy5nZXRVc2VySUQoKSl7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQganNvbj17XHJcbiAgICAgICAgICAgIHVpZDpcIlwiLC8v5Lyg56m66KGo56S66I635b6X55Sf5oiQXHJcbiAgICAgICAgICAgIG5ldHdvcms6bmV0d29yayxcclxuICAgICAgICAgICAgdXNlcjpuZXR3b3JrLFxyXG4gICAgICAgICAgICBhcHBWZXI6XCJcIixcclxuICAgICAgICAgICAgcGhvbmVNb2RlbDpcIkh1YVdlaVwiLFxyXG4gICAgICAgICAgICBwa2c6XCJjb20uSWRsZUhlcm9DYXN0bGVEZWZlbnNlXCIsXHJcbiAgICAgICAgICAgIHN5c1ZlcjozMSxcclxuICAgICAgICAgICAgbGFuZzpcInpoXCIsXHJcbiAgICAgICAgICAgIG1heExldmVsOlwiMFwiLFxyXG4gICAgICAgICAgICB0b3RhbE9ubGluZUR1cjpcIjBcIixcclxuICAgICAgICAgICAgZGV2aWNlSWQ6ZGV2aWNlSWQsXHJcbiAgICAgICAgICAgIG5hbWU6XCJUZXN0LVwiK3RoaXMucmFuZG9tTGV0dGVyKDQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdGhpcy5zYXZlVXNlcklEKFwiMTIzNDU2Nzg5XCIpO1xyXG4gICAgICAgIC8vIHRoaXMuaXNfbG9hZF9vaz10cnVlO1xyXG4gICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS51c2VyQmFzaWMsSlNPTi5zdHJpbmdpZnkoanNvbikpLnRoZW4oKGRhdGE6YW55KT0+e1xyXG4gICAgICAgICAgICBpZihkYXRhLnVpZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmVVc2VySUQoZGF0YS51aWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc19sb2FkX29rPXRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpPT57XHJcbiAgICAgICAgICAgIGNjLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgLy/lj43lpI3or7fmsYJcclxuICAgICAgICAgICAgdGhpcy5IdHRwUG9zdEdldFVzZXJJZChkZXZpY2VJZCxuZXR3b3JrKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKiror7fmsYLnvZHnu5zmo4DmtYvniYjmnKwgKi9cclxuICAgIEh0dHBQb3N0Q2hlY2tWZXJzaW9uKCl7XHJcbiAgICAgICAgLy8gaWYoY2Muc3lzLmlzTmF0aXZlKXtcclxuICAgICAgICAvLyAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnZlcnNpb25HZXQsSlNPTi5zdHJpbmdpZnkoe30pKS50aGVuKChkYXRhOmFueSk9PntcclxuICAgICAgICAvLyAgICAgICAgIGlmKGRhdGEpe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGlmKGRhdGE+Q3VyVmVyc2lvbkNvZGUpe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnJlc291cmNlc0J1bmRsZS5sb2FkKFwibG9hZGluZy92ZXJzaW9uX3RpcFwiLGNjLlByZWZhYiwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuUHJlZmFiKT0+eyAgXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nKGVycm9yKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZT1jYy5pbnN0YW50aWF0ZShhc3NldHMpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgbm9kZS54PTA7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBub2RlLnk9MDtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLnZlcnNpb25faXNfb2s9dHJ1ZTtcclxuICAgICAgICAvLyAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy52ZXJzaW9uX2lzX29rPXRydWU7XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgIH0pLmNhdGNoKChlcnJvcik9PntcclxuICAgICAgICAvLyAgICAgICAgIGNjLmVycm9yKGVycm9yKTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMudmVyc2lvbl9pc19vaz10cnVlO1xyXG4gICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAvLyB9ZWxzZVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAgICAgdGhpcy52ZXJzaW9uX2lzX29rPXRydWU7XHJcbiAgICAgICAgLy99XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==