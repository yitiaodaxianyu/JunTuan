"use strict";
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