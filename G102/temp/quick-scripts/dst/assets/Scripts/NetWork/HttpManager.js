
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/NetWork/HttpManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTmV0V29ya1xcSHR0cE1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQXFEO0FBQ3JELDZDQUE0QztBQUNqQyxRQUFBLEdBQUcsR0FBRSw2QkFBNkIsQ0FBQyxDQUFBLCtCQUErQjtBQUNsRSxRQUFBLElBQUksR0FBQyw2QkFBNkIsQ0FBQyxDQUFBLDZCQUE2QjtBQUUzRSxjQUFjO0FBQ2QsSUFBWSxVQXVEWDtBQXZERCxXQUFZLFVBQVU7SUFFbEIsaUJBQWlCO0lBQ2pCLGlEQUFpQyxDQUFBO0lBQ2pDLGdCQUFnQjtJQUNoQixtREFBcUMsQ0FBQTtJQUNyQyxVQUFVO0lBQ1YsMENBQTRCLENBQUE7SUFDNUIsY0FBYztJQUNkLHFEQUF1QyxDQUFBO0lBQ3ZDLDJCQUEyQjtJQUMzQiwyREFBNkMsQ0FBQTtJQUM3QyxhQUFhO0lBQ2IsaURBQW1DLENBQUE7SUFDbkMsWUFBWTtJQUNaLG1EQUFxQyxDQUFBO0lBQ3JDLGVBQWU7SUFDZiwyREFBNkMsQ0FBQTtJQUM3QyxZQUFZO0lBQ1osc0NBQXVCLENBQUE7SUFDdkIsWUFBWTtJQUNaLG9DQUFvQixDQUFBO0lBQ3BCLHVCQUF1QjtJQUN2Qix1REFBeUMsQ0FBQTtJQUN6QyxjQUFjO0lBQ2QscURBQXVDLENBQUE7SUFDdkMsWUFBWTtJQUNaLHFDQUF1QixDQUFBO0lBQ3ZCLGdCQUFnQjtJQUNoQix1Q0FBeUIsQ0FBQTtJQUN6Qix5QkFBeUI7SUFDekIsdUNBQXVCLENBQUE7SUFDdkIsVUFBVTtJQUNWLHlDQUF5QixDQUFBO0lBQ3pCLFlBQVk7SUFDWix3Q0FBMEIsQ0FBQTtJQUMxQixZQUFZO0lBQ1osNkNBQStCLENBQUE7SUFDL0IsVUFBVTtJQUNWLDJDQUE2QixDQUFBO0lBQzdCLFlBQVk7SUFDWix1REFBeUMsQ0FBQTtJQUN6QyxTQUFTO0lBQ1QsMkNBQTZCLENBQUE7SUFDN0IsYUFBYTtJQUNiLCtDQUFpQyxDQUFB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LElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FDOUIsSUFBSSxFQUNKLEdBQUcsRUFDSCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQ3ZCLENBQUM7UUFDRixPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzRCxDQUFDO0lBRWMseUJBQWEsR0FBNUI7UUFDSSxPQUFPO1FBQ1AsSUFBSSxVQUFVLEdBQUc7WUFDYixFQUFFLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDdkMsSUFBSSxFQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRztZQUN0QixPQUFPLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLO1NBQzlCLENBQUE7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBRWEsbUJBQU8sR0FBckIsVUFBc0IsR0FBVTtRQUM1QixJQUFJLEVBQUUsR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEIsSUFBSSxFQUFFLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUE5SmMsa0JBQU0sR0FBUyxVQUFVLENBQUM7SUFDMUIsaUJBQUssR0FBUyxVQUFVLENBQUM7SUFFMUIsd0JBQVksR0FBVyxJQUFJLENBQUM7SUErSjlDLGtCQUFDO0NBbktELEFBbUtDLElBQUE7QUFuS1ksa0NBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJc0RlYnVnLCBJc1Rlc3RTZXJ2ZXIgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi9VSS9VSU1hbmFnZXJcIjtcclxuZXhwb3J0IGxldCBXV1c9ICdodHRwOi8vMTI0LjIyMi4yMTIuMTQxOjg4NzInOy8vaHR0cDovL2FwaS5zdXBlci1ib3NzZ2FtZS5jb21cclxuZXhwb3J0IGxldCBURVNUPSdodHRwOi8vNDcuMjQzLjExNC4xMjY6MTAwMTgnOy8vaHR0cDovLzQ3LjI0My4xMTQuMTI2OjEwMDE4XHJcblxyXG4vKiropoHorr/pl67nmoTmjqXlj6PlkI3np7AgKi9cclxuZXhwb3J0IGVudW0gQWNjZXNzTmFtZVxyXG57XHJcbiAgICAvKirojrflj5bnlKjmiLfnjrDmnInnmoTmuLjmiI/pgZPlhbcgKi9cclxuICAgIGdldFVzZXJJdGVtcz1cIi91c2VyL2dldFVzZXJJdGVtc1wiLCAgICAgICBcclxuICAgIC8qKuiOt+WPluacjeWKoeWZqOaXtumXtOaIs+aOpeWPoyAqL1xyXG4gICAgZ2V0U2VydmVyVGltZSA9IFwiL2NsaWVudFN5bmMvc2Vjb25kc1wiLFxyXG4gICAgLyoq5oq95aWW5o6l5Y+jICovXHJcbiAgICB0cnlQcml6ZSA9IFwiL3VzZXIvdXNlclByaXplXCIsXHJcbiAgICAvKirmm7TmlrDnlKjmiLfmlbDmja7kv6Hmga8gKi9cclxuICAgIHVwZGF0ZVVzZXJJbmZvID0gXCIvdXNlci91cGRhdGVVc2VySW5mb1wiLFxyXG4gICAgLyoq5pu05paw55So5oi35pWw5o2u5L+h5oGvLUJPU1Pmr4/lkajlpZblirHpooblj5bnirbmgIEgKi9cclxuICAgIHVwZGF0ZVVzZXJJbmZvRE5MID0gXCIvdXNlci91cGRhdGVVc2VySW5mb0ROTFwiLFxyXG4gICAgLyoq5L+u5pS55aS05YOP77yM5ZCN5a2XICovXHJcbiAgICB1cGRhdGVBdmF0YXIgPSBcIi91c2VyL3VwZGF0ZUF2YXRhclwiLFxyXG4gICAgLyoq6L2s55uY5oq95aWW5o6l5Y+jICovXHJcbiAgICB1c2VyVHVyblByaXplID0gXCIvdXNlci91c2VyVHVyblByaXplXCIsXHJcbiAgICAvKirojrflj5bmiJjlipvmjpLooYzmppzmjqXlj6MgKi9cclxuICAgIGxlYWRlcmJvYXJkQnlVc2VyID0gXCIvdXNlci9sZWFkZXJib2FyZEJ5VXNlclwiLFxyXG4gICAgLyoq6YGT5YW35pWw5o2u5LiK5oqlICovXHJcbiAgICBzZXRQcm9wID1cIi9pdGVtL3JlcG9ydFwiLFxyXG4gICAgLyoq6YGT5YW35pWw5o2u5LiL5Y+RICovXHJcbiAgICBnZXRQcm9wPVwiL2l0ZW0vbGlzdFwiLFxyXG4gICAgLyoq5p+l6K+i55So5oi35Lu75Yqh6L+b5bqm5Y+K5Lu75Yqh5aWW5Yqx6aKG5Y+W54q25oCBICovXHJcbiAgICBxdWVyeUdhbWVUYXNrID0gXCIvdXNlclRhc2svcXVlcnlHYW1lVGFza1wiLFxyXG4gICAgLyoq5L+d5a2Y55So5oi35Lu75Yqh6L+b5bqmICovXHJcbiAgICBzYXZlR2FtZVRhc2sgPSBcIi91c2VyVGFzay9zYXZlR2FtZVRhc2tcIixcclxuICAgIC8qKuiOt+WPlueUqOaIt+S/oeaBryAqL1xyXG4gICAgdXNlckluZm8gPSBcIi91c2VyL2luZm9cIixcclxuICAgIC8qKkJvc3Pojrflj5bova7mjaLpobrluo8gKi9cclxuICAgIGdldEJvc3MgPSBcIi9jb3B5L2dldEJvc3NcIixcclxuICAgIC8qKuS4iuS8oOeUqOaIt2lk77yM5LygXCJcIuWAvOS8mueUn+aIkOS4gOS4queUqOaIt2lkKi9cclxuICAgIHVzZXJCYXNpYz1cIi91c2VyL2Jhc2ljXCIsXHJcbiAgICAvKirniYjmnKzojrflj5YgKi9cclxuICAgIHZlcnNpb25HZXQ9XCIvdmVyc2lvbi9nZXRcIixcclxuICAgIC8qKuiOt+WPluiLsembhOWIl+ihqCAqL1xyXG4gICAgZ2V0SGVyb0xpc3QgPSBcIi9oZXJvL2xpc3RcIixcclxuICAgIC8qKuS4iuaKpeiLsembhOWIl+ihqCAqL1xyXG4gICAgcmVwb3J0SGVyb0xpc3QgPSBcIi9oZXJvL3JlcG9ydFwiLFxyXG4gICAgLyoq5LiD5aSp562+5YiwICovXHJcbiAgICBzZXZlblNpZ24gPSBcIi9zaWduL3NldmVuU2lnblwiLFxyXG4gICAgLyoq5LiD5aSp562+5Yiw57uT5p2fICovXHJcbiAgICB1cGRhdGVTZXZlbkdpZnQgPSBcIi9zaWduL3VwZGF0ZVNldmVuR2lmdFwiLFxyXG4gICAgLyoq5pyI562+5YiwICovXHJcbiAgICBtb250aFNpZ24gPSBcIi9zaWduL21vbnRoU2lnblwiLFxyXG4gICAgLyoq5pyI562+5Yiw57Sv6K6h5aWW5YqxICovXHJcbiAgICBhZGRTaWduR2lmdCA9IFwiL3NpZ24vYWRkU2lnbkdpZnRcIixcclxuICAgIC8qKuafpeivouaciOetvuWIsOWSjOaciOetvuWIsOe0r+iuoeWlluWKsemihuWPluiusOW9lSAqL1xyXG4gICAgZ2V0U2lnblJlY29yZCA9IFwiL3NpZ24vZ2V0U2lnblJlY29yZFwiLFxyXG4gICAgLyoq5Lu75Yqh5p+l6K+iICovXHJcbiAgICBxdWVyeUdhbWVBY2hpZXZlbWVudFRhc2sgPSBcIi9hY2hpZXZlbWVudFRhc2svcXVlcnlHYW1lQWNoaWV2ZW1lbnRUYXNrXCIsXHJcbiAgICAvKirku7vliqHkv67mlLkgKi9cclxuICAgIGNoYW5nZUdhbWVBY2hpZXZlbWVudFRhc2sgPSBcIi9hY2hpZXZlbWVudFRhc2svY2hhbmdlR2FtZUFjaGlldmVtZW50VGFza1wiLFxyXG4gICAgLyoq5Lu75Yqh5paw5aKeICovXHJcbiAgICBzYXZlR2FtZUFjaGlldmVtZW50VGFzayA9IFwiL2FjaGlldmVtZW50VGFzay9zYXZlR2FtZUFjaGlldmVtZW50VGFza1wiLFxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRhc2tPYmplY3R7XHJcbiAgICAvLy8qKueUqOaIt2lkICovXHJcbiAgICAvLyB1aWQ6c3RyaW5nID0gXCJcIjtcclxuICAgIC8qKuaXpeacnyAqL1xyXG4gICAgdG9kYXk6c3RyaW5nID0gXCJcIjtcclxuICAgIC8qKuS4u+e6v+S7u+WKoeaYvuekuui/m+W6piAqL1xyXG4gICAgcHJvZ3Jlc3M6bnVtYmVyID0gMDtcclxuICAgIC8qKuS7u+WKoWlkICovXHJcbiAgICB0YXNrSWQ6bnVtYmVyID0gMDtcclxuICAgIC8qKuS7u+WKoee7tOW6piAxLeavj+aXpeS7u+WKoSAyLeaIkOWwseS7u+WKoSAzLeS4u+e6v+S7u+WKoSAqL1xyXG4gICAgZGltZW5zaW9uOm51bWJlciA9IDA7XHJcbiAgICAvKirku7vliqHnsbvlnosgKi9cclxuICAgIHRhc2tUeXBlOm51bWJlciA9IDA7XHJcbiAgICAvKirop6blj5HmrKHmlbAgKi9cclxuICAgIGVtaXQ6bnVtYmVyID0gMDtcclxuICAgIC8qKuS7u+WKoemYtuautSAqL1xyXG4gICAgc3RhZ2U6bnVtYmVyID0gMDtcclxuICAgIC8qKuS7u+WKoeeKtuaAgSAtMSDlt7LlrozmiJAgLTIg5bey6aKG5Y+WICovXHJcbiAgICBzdGF0dXM6bnVtYmVyID0gMDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEhlcm9PYmplY3R7XHJcbiAgICAvKiroi7Hpm4RpZCAqL1xyXG4gICAgaGVyb0lkOm51bWJlciA9IDA7XHJcbiAgICAvKiroi7Hpm4TnrYnnuqcgKi9cclxuICAgIGhlcm9MZXZlbDpudW1iZXIgPSAwO1xyXG4gICAgLyoq6Iux6ZuE6Zi25q61ICovXHJcbiAgICBoZXJvU3RhZ2U6bnVtYmVyID0gMDtcclxuICAgIC8qKuS4k+atpumYtuautSAqL1xyXG4gICAgaGVyb1dlYXBvblN0YWdlOm51bWJlciA9IDA7XHJcbiAgICAvKirmrablmahpZCAqL1xyXG4gICAgd2VhcG9uczpudW1iZXIgPSAwO1xyXG4gICAgLyoq5oqk55SyaWQgKi9cclxuICAgIGFybW9yOm51bWJlciA9IDA7XHJcbiAgICAvKirppbDlk4FpZCAqL1xyXG4gICAgYWNjZXNzb3JpZXM6bnVtYmVyID0gMDtcclxuICAgIC8qKumei+WtkGlkICovXHJcbiAgICBzaG9lczpudW1iZXIgPSAwO1xyXG4gICAgLyoq5a6g54mpaWQgKi9cclxuICAgIHBldDpudW1iZXIgPSAwO1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBQYXJhbXNfVHlwZVxyXG57XHJcbiAgICAvKirlj6rluKZVSUTnmoROVUxMICovXHJcbiAgICBOdWxsPTAsXHJcbiAgICBcclxuICAgIFxyXG4gICAgbnVtLFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUHJvcE9iamVjdHtcclxuICAgIGl0ZW1zSWQ6bnVtYmVyPTA7XHJcbiAgICBpdGVtc051bTpudW1iZXI9MTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEh0dHBNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIEFlc0tleTogc3RyaW5nPVwiYWJjMTIzNDVcIjtcclxuICAgIHByaXZhdGUgc3RhdGljIENCQ0lWOiBzdHJpbmc9XCJjYmE3NjMyMVwiO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaXNTdWNjZXNzUmVzOmJvb2xlYW4gPSB0cnVlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBwb3N06K+35rGC5LiA5Liq5o6l5Y+jXHJcbiAgICAgKiBAcGFyYW0gYWNjZXNzTmFtZSDor7fmsYLnmoTmjqXlj6PlkI3np7BcclxuICAgICAqIEBwYXJhbSBwYXJhbXMg6K+35rGC55qE5Y+C5pWwXHJcbiAgICAgKiBAcmV0dXJucyBQcm9taXNl5a+56LGhXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBwb3N0KGFjY2Vzc05hbWU6QWNjZXNzTmFtZSxwYXJhbXM6c3RyaW5nLGlzV2FpdDpib29sZWFuID1mYWxzZSk6UHJvbWlzZTxhbnk+e1xyXG4gICAgICAgIGlmKCFJc1Rlc3RTZXJ2ZXIpe1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge30pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpc1dhaXQpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzU3VjY2Vzc1Jlcyl7XHJcbiAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93V2FpdFVpRGlhbG9nKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzU3VjY2Vzc1JlcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7fSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKCk9PntcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coeGhyLnN0YXR1cyx4aHIucmVhZHlTdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICBpZih4aHIucmVhZHlTdGF0ZSA9PSA0KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCA0MDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlID0geGhyLnJlc3BvbnNlVGV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2MubG9nKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGpzb249SlNPTi5wYXJzZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGpzb24uc3RhdHVzPT0nMjAwJylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXNXYWl0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU3VjY2Vzc1JlcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2xvc2VXYWl0VWlEaWFsb2coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoanNvbi5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCfor7fmsYLmiJDlip8s6ZSZ6K+v56CBOicranNvbi5zdGF0dXMrXCIs6ZSZ6K+v5L+h5oGvOlwiK2pzb24ubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/mlq3nvZHmiJbogIXkuI3lrZjlnKjvvIzlj6/og73mmK/ov5Tlm540MDRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCfor7fmsYLlpLHotKXvvIznirbmgIHnoIE6Jyt4aHIuc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBsZXQgdXJsPXRoaXMuZ2V0VXJsQnlUeXBlKGFjY2Vzc05hbWUpO1xyXG4gICAgICAgICAgICB4aHIub3BlbihcIlBPU1RcIiwgdXJsLCB0cnVlKTtcclxuICAgICAgICAgICAgLy94aHIub3BlbigpXHJcbiAgICAgICAgICAgIC8vb3BlbuS5i+WQju+8jHNlbmTkuYvliY1cclxuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIixcImFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOFwiKTtcclxuICAgICAgICAgICAgLy/or7fmsYLlj4LmlbDvvIjor7fmsYLkvZPvvIk7XHJcbiAgICAgICAgICAgIC8vbGV0IHBhcmFtcz10aGlzLmdldElzc3VlZFBhcmFtc0J5VHlwZShwYXJhbXNUeXBlKTtcclxuICAgICAgICAgICAgY2MubG9nKCd1cmw6Jyt1cmwrXCJcXG5wYXJhbXM6XCIrcGFyYW1zKTtcclxuICAgICAgICAgICAgeGhyLnNlbmQocGFyYW1zKTsgICAgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2FtZVRpbWVQb3N0KGFjY2Vzc05hbWU6QWNjZXNzTmFtZSxwYXJhbXM6c3RyaW5nKTpQcm9taXNlPGFueT57XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKCk9PntcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnYW1lVGltZVBvc3Q6Jyx4aHIucmVhZHlTdGF0ZSkrJywnK3hoci5zdGF0dXM7XHJcbiAgICAgICAgICAgICAgICBpZih4aHIucmVhZHlTdGF0ZSA9PSA0KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCA0MDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlID0geGhyLnJlc3BvbnNlVGV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGpzb249SlNPTi5wYXJzZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGpzb24uc3RhdHVzPT0nMjAwJylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShqc29uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCfor7fmsYLmiJDlip8s6ZSZ6K+v56CBOicranNvbi5zdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5pat572R5oiW6ICF5LiN5a2Y5Zyo77yM5Y+v6IO95piv6L+U5ZueNDA0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCgn6K+35rGC5aSx6LSl77yM54q25oCB56CBOicreGhyLnN0YXR1cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgbGV0IHVybD10aGlzLmdldFVybEJ5VHlwZShhY2Nlc3NOYW1lKTtcclxuICAgICAgICAgICAgeGhyLm9wZW4oXCJQT1NUXCIsIHVybCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIC8veGhyLm9wZW4oKVxyXG4gICAgICAgICAgICAvL29wZW7kuYvlkI7vvIxzZW5k5LmL5YmNXHJcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsXCJhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLThcIik7XHJcbiAgICAgICAgICAgIC8v6K+35rGC5Y+C5pWw77yI6K+35rGC5L2T77yJO1xyXG4gICAgICAgICAgICAvL2xldCBwYXJhbXM9dGhpcy5nZXRJc3N1ZWRQYXJhbXNCeVR5cGUocGFyYW1zVHlwZSk7XHJcbiAgICAgICAgICAgIGNjLmxvZygndXJsOicrdXJsK1wiXFxucGFyYW1zOlwiK3BhcmFtcyk7XHJcbiAgICAgICAgICAgIHhoci5zZW5kKHBhcmFtcyk7ICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0VXJsQnlUeXBlKHVybFR5cGU6QWNjZXNzTmFtZSk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHVybFN0cj1XV1c7XHJcbiAgICAgICAgaWYoSXNEZWJ1ZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHVybFN0cj1URVNUO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdXJsPXVybFN0cit1cmxUeXBlO1xyXG4gICAgICAgIHJldHVybiB1cmw7XHJcbiAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICogQUVT5Yqg5a+G77yIQ0JD5qih5byP77yM6ZyA6KaB5YGP56e76YeP77yJXHJcbiAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGVuY3J5cHQoZGF0YSl7XHJcbiAgICAgICAgdmFyIGtleSA9IENyeXB0b0pTLmVuYy5VdGY4LnBhcnNlKHRoaXMuQWVzS2V5KTtcclxuICAgICAgICB2YXIgc2VjcmV0RGF0YSA9IENyeXB0b0pTLmVuYy5VdGY4LnBhcnNlKGRhdGEpO1xyXG4gICAgICAgIHZhciBlbmNyeXB0ZWQgPSBDcnlwdG9KUy5BRVMuZW5jcnlwdChcclxuICAgICAgICAgICAgc2VjcmV0RGF0YSwgXHJcbiAgICAgICAgICAgIGtleSwgXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q0JDT3B0aW9ucygpXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gZW5jcnlwdGVkLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQUVT6Kej5a+G77yIQ0JD5qih5byP77yM6ZyA6KaB5YGP56e76YeP77yJXHJcbiAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGRlY3J5cHQoZGF0YSl7XHJcbiAgICAgICAgdmFyIGtleSA9IENyeXB0b0pTLmVuYy5VdGY4LnBhcnNlKHRoaXMuQWVzS2V5KTtcclxuICAgICAgICB2YXIgZGVjcnlwdCA9IENyeXB0b0pTLkFFUy5kZWNyeXB0KFxyXG4gICAgICAgICAgICBkYXRhLCBcclxuICAgICAgICAgICAga2V5LCBcclxuICAgICAgICAgICAgdGhpcy5nZXRDQkNPcHRpb25zKClcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiBDcnlwdG9KUy5lbmMuVXRmOC5zdHJpbmdpZnkoZGVjcnlwdCkudG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRDQkNPcHRpb25zKCk6YW55eyAgICAgIFxyXG4gICAgICAgIC8vIOWKoOWvhumAiemhuVxyXG4gICAgICAgIGxldCBDQkNPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBpdjogQ3J5cHRvSlMuZW5jLlV0ZjgucGFyc2UodGhpcy5DQkNJViksXHJcbiAgICAgICAgICAgIG1vZGU6Q3J5cHRvSlMubW9kZS5DQkMsXHJcbiAgICAgICAgICAgIHBhZGRpbmc6IENyeXB0b0pTLnBhZC5Qa2NzN1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQ0JDT3B0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHRlc3RBRVMoc3RyOnN0cmluZyl7XHJcbiAgICAgICAgbGV0IGFhPXRoaXMuZW5jcnlwdChzdHIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGFhKTtcclxuICAgICAgICBsZXQgYmI9dGhpcy5kZWNyeXB0KGFhKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhiYik7XHJcbiAgICB9XHJcbiAgICAvLyDigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJTigJRcclxuICAgIC8vIOeJiOadg+WjsOaYju+8muacrOaWh+S4ukNTRE7ljZrkuLvjgIxteXprc2t544CN55qE5Y6f5Yib5paH56ug77yM6YG15b6qQ0MgNC4wIEJZLVNB54mI5p2D5Y2P6K6u77yM6L2s6L296K+36ZmE5LiK5Y6f5paH5Ye65aSE6ZO+5o6l5Y+K5pys5aOw5piO44CCXHJcbiAgICAvLyDljp/mlofpk77mjqXvvJpodHRwczovL2Jsb2cuY3Nkbi5uZXQvbXl6a3NreS9hcnRpY2xlL2RldGFpbHMvODIwNTI5MjBcclxufVxyXG5cclxuIl19