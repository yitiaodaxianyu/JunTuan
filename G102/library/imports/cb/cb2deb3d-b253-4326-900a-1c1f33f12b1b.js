"use strict";
cc._RF.push(module, 'cb2des9slNDJpAKHB8z8Ssb', 'HttpManager');
// Scripts/NetWork/HttpManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpManager = exports.PropObject = exports.Params_Type = exports.HeroObject = exports.TaskObject = exports.AccessName = exports.TEST = exports.WWW = void 0;
var Constants_1 = require("../Constants");
var UIManager_1 = require("../UI/UIManager");
exports.WWW = 'http://124.222.212.141:8872'; //http://api.super-bossgame.com
exports.TEST = 'http://47.243.114.126:10018'; //http://47.243.114.126:10018
/**要访问的接口名称 */
var AccessName;
(function (AccessName) {
    /**获取用户现有的游戏道具 */
    AccessName["getUserItems"] = "/user/getUserItems";
    /**获取服务器时间戳接口 */
    AccessName["getServerTime"] = "/clientSync/seconds";
    /**抽奖接口 */
    AccessName["tryPrize"] = "/user/userPrize";
    /**更新用户数据信息 */
    AccessName["updateUserInfo"] = "/user/updateUserInfo";
    /**更新用户数据信息-BOSS每周奖励领取状态 */
    AccessName["updateUserInfoDNL"] = "/user/updateUserInfoDNL";
    /**修改头像，名字 */
    AccessName["updateAvatar"] = "/user/updateAvatar";
    /**转盘抽奖接口 */
    AccessName["userTurnPrize"] = "/user/userTurnPrize";
    /**获取战力排行榜接口 */
    AccessName["leaderboardByUser"] = "/user/leaderboardByUser";
    /**道具数据上报 */
    AccessName["setProp"] = "/item/report";
    /**道具数据下发 */
    AccessName["getProp"] = "/item/list";
    /**查询用户任务进度及任务奖励领取状态 */
    AccessName["queryGameTask"] = "/userTask/queryGameTask";
    /**保存用户任务进度 */
    AccessName["saveGameTask"] = "/userTask/saveGameTask";
    /**获取用户信息 */
    AccessName["userInfo"] = "/user/info";
    /**Boss获取轮换顺序 */
    AccessName["getBoss"] = "/copy/getBoss";
    /**上传用户id，传""值会生成一个用户id*/
    AccessName["userBasic"] = "/user/basic";
    /**版本获取 */
    AccessName["versionGet"] = "/version/get";
    /**获取英雄列表 */
    AccessName["getHeroList"] = "/hero/list";
    /**上报英雄列表 */
    AccessName["reportHeroList"] = "/hero/report";
    /**七天签到 */
    AccessName["sevenSign"] = "/sign/sevenSign";
    /**七天签到结束 */
    AccessName["updateSevenGift"] = "/sign/updateSevenGift";
    /**月签到 */
    AccessName["monthSign"] = "/sign/monthSign";
    /**月签到累计奖励 */
    AccessName["addSignGift"] = "/sign/addSignGift";
    /**查询月签到和月签到累计奖励领取记录 */
    AccessName["getSignRecord"] = "/sign/getSignRecord";
    /**任务查询 */
    AccessName["queryGameAchievementTask"] = "/achievementTask/queryGameAchievementTask";
    /**任务修改 */
    AccessName["changeGameAchievementTask"] = "/achievementTask/changeGameAchievementTask";
    /**任务新增 */
    AccessName["saveGameAchievementTask"] = "/achievementTask/saveGameAchievementTask";
})(AccessName = exports.AccessName || (exports.AccessName = {}));
var TaskObject = /** @class */ (function () {
    function TaskObject() {
        ///**用户id */
        // uid:string = "";
        /**日期 */
        this.today = "";
        /**主线任务显示进度 */
        this.progress = 0;
        /**任务id */
        this.taskId = 0;
        /**任务维度 1-每日任务 2-成就任务 3-主线任务 */
        this.dimension = 0;
        /**任务类型 */
        this.taskType = 0;
        /**触发次数 */
        this.emit = 0;
        /**任务阶段 */
        this.stage = 0;
        /**任务状态 -1 已完成 -2 已领取 */
        this.status = 0;
    }
    return TaskObject;
}());
exports.TaskObject = TaskObject;
var HeroObject = /** @class */ (function () {
    function HeroObject() {
        /**英雄id */
        this.heroId = 0;
        /**英雄等级 */
        this.heroLevel = 0;
        /**英雄阶段 */
        this.heroStage = 0;
        /**专武阶段 */
        this.heroWeaponStage = 0;
        /**武器id */
        this.weapons = 0;
        /**护甲id */
        this.armor = 0;
        /**饰品id */
        this.accessories = 0;
        /**鞋子id */
        this.shoes = 0;
        /**宠物id */
        this.pet = 0;
    }
    return HeroObject;
}());
exports.HeroObject = HeroObject;
var Params_Type;
(function (Params_Type) {
    /**只带UID的NULL */
    Params_Type[Params_Type["Null"] = 0] = "Null";
    Params_Type[Params_Type["num"] = 1] = "num";
})(Params_Type = exports.Params_Type || (exports.Params_Type = {}));
var PropObject = /** @class */ (function () {
    function PropObject() {
        this.itemsId = 0;
        this.itemsNum = 1;
    }
    return PropObject;
}());
exports.PropObject = PropObject;
var HttpManager = /** @class */ (function () {
    function HttpManager() {
    }
    /**
     * post请求一个接口
     * @param accessName 请求的接口名称
     * @param params 请求的参数
     * @returns Promise对象
     */
    HttpManager.post = function (accessName, params, isWait) {
        var _this = this;
        if (isWait === void 0) { isWait = false; }
        if (!Constants_1.IsTestServer) {
            return new Promise(function (resolve, reject) { });
        }
        if (isWait) {
            if (this.isSuccessRes) {
                UIManager_1.UIManager.getInstance().showWaitUiDialog();
                this.isSuccessRes = false;
            }
            else {
                return new Promise(function (resolve, reject) { });
            }
        }
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                //console.log(xhr.status,xhr.readyState);
                if (xhr.readyState == 4) {
                    if (xhr.status >= 200 && xhr.status < 400) {
                        var response = xhr.responseText;
                        // cc.log(response);
                        var json = JSON.parse(response);
                        if (json.status == '200') {
                            if (isWait) {
                                _this.isSuccessRes = true;
                                UIManager_1.UIManager.getInstance().closeWaitUiDialog();
                            }
                            resolve(json.data);
                        }
                        else {
                            reject('请求成功,错误码:' + json.status + ",错误信息:" + json.message);
                        }
                    }
                    else {
                        //断网或者不存在，可能是返回404
                        reject('请求失败，状态码:' + xhr.status);
                    }
                }
            };
            var url = _this.getUrlByType(accessName);
            xhr.open("POST", url, true);
            //xhr.open()
            //open之后，send之前
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            //请求参数（请求体）;
            //let params=this.getIssuedParamsByType(paramsType);
            cc.log('url:' + url + "\nparams:" + params);
            xhr.send(params);
        });
    };
    HttpManager.gameTimePost = function (accessName, params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                console.log('gameTimePost:', xhr.readyState) + ',' + xhr.status;
                if (xhr.readyState == 4) {
                    if (xhr.status >= 200 && xhr.status < 400) {
                        var response = xhr.responseText;
                        cc.log(response);
                        var json = JSON.parse(response);
                        if (json.status == '200') {
                            resolve(json);
                        }
                        else {
                            reject('请求成功,错误码:' + json.status);
                        }
                    }
                    else {
                        //断网或者不存在，可能是返回404
                        reject('请求失败，状态码:' + xhr.status);
                    }
                }
            };
            var url = _this.getUrlByType(accessName);
            xhr.open("POST", url, true);
            //xhr.open()
            //open之后，send之前
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            //请求参数（请求体）;
            //let params=this.getIssuedParamsByType(paramsType);
            cc.log('url:' + url + "\nparams:" + params);
            xhr.send(params);
        });
    };
    HttpManager.getUrlByType = function (urlType) {
        var urlStr = exports.WWW;
        if (Constants_1.IsDebug) {
            urlStr = exports.TEST;
        }
        var url = urlStr + urlType;
        return url;
    };
    /**
 * AES加密（CBC模式，需要偏移量）
 * @param data
 * @returns {*}
 */
    HttpManager.encrypt = function (data) {
        var key = CryptoJS.enc.Utf8.parse(this.AesKey);
        var secretData = CryptoJS.enc.Utf8.parse(data);
        var encrypted = CryptoJS.AES.encrypt(secretData, key, this.getCBCOptions());
        return encrypted.toString();
    };
    /**
     * AES解密（CBC模式，需要偏移量）
     * @param data
     * @returns {*}
     */
    HttpManager.decrypt = function (data) {
        var key = CryptoJS.enc.Utf8.parse(this.AesKey);
        var decrypt = CryptoJS.AES.decrypt(data, key, this.getCBCOptions());
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    };
    HttpManager.getCBCOptions = function () {
        // 加密选项
        var CBCOptions = {
            iv: CryptoJS.enc.Utf8.parse(this.CBCIV),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        };
        return CBCOptions;
    };
    HttpManager.testAES = function (str) {
        var aa = this.encrypt(str);
        console.log(aa);
        var bb = this.decrypt(aa);
        console.log(bb);
    };
    HttpManager.AesKey = "abc12345";
    HttpManager.CBCIV = "cba76321";
    HttpManager.isSuccessRes = true;
    return HttpManager;
}());
exports.HttpManager = HttpManager;

cc._RF.pop();