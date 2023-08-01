
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
exports.WWW = 'https://www.yixihuyu.com:8873'; //http://api.super-bossgame.com
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
        console.log("从服务获取时间戳" + accessName);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTmV0V29ya1xcSHR0cE1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQXFEO0FBQ3JELDZDQUE0QztBQUNqQyxRQUFBLEdBQUcsR0FBRSwrQkFBK0IsQ0FBQyxDQUFBLCtCQUErQjtBQUNwRSxRQUFBLElBQUksR0FBQyw2QkFBNkIsQ0FBQyxDQUFBLDZCQUE2QjtBQUUzRSxjQUFjO0FBQ2QsSUFBWSxVQXVEWDtBQXZERCxXQUFZLFVBQVU7SUFFbEIsaUJBQWlCO0lBQ2pCLGlEQUFpQyxDQUFBO0lBQ2pDLGdCQUFnQjtJQUNoQixtREFBcUMsQ0FBQTtJQUNyQyxVQUFVO0lBQ1YsMENBQTRCLENBQUE7SUFDNUIsY0FBYztJQUNkLHFEQUF1QyxDQUFBO0lBQ3ZDLDJCQUEyQjtJQUMzQiwyREFBNkMsQ0FBQTtJQUM3QyxhQUFhO0lBQ2IsaURBQW1DLENBQUE7SUFDbkMsWUFBWTtJQUNaLG1EQUFxQyxDQUFBO0lBQ3JDLGVBQWU7SUFDZiwyREFBNkMsQ0FBQTtJQUM3QyxZQUFZO0lBQ1osc0NBQXVCLENBQUE7SUFDdkIsWUFBWTtJQUNaLG9DQUFvQixDQUFBO0lBQ3BCLHVCQUF1QjtJQUN2Qix1REFBeUMsQ0FBQTtJQUN6QyxjQUFjO0lBQ2QscURBQXVDLENBQUE7SUFDdkMsWUFBWTtJQUNaLHFDQUF1QixDQUFBO0lBQ3ZCLGdCQUFnQjtJQUNoQix1Q0FBeUIsQ0FBQTtJQUN6Qix5QkFBeUI7SUFDekIsdUNBQXVCLENBQUE7SUFDdkIsVUFBVTtJQUNWLHlDQUF5QixDQUFBO0lBQ3pCLFlBQVk7SUFDWix3Q0FBMEIsQ0FBQTtJQUMxQixZQUFZO0lBQ1osNkNBQStCLENBQUE7SUFDL0IsVUFBVTtJQUNWLDJDQUE2QixDQUFBO0lBQzdCLFlBQVk7SUFDWix1REFBeUMsQ0FBQTtJQUN6QyxTQUFTO0lBQ1QsMkNBQTZCLENBQUE7SUFDN0IsYUFBYTtJQUNiLCtDQUFpQyxDQUFB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LCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJc0RlYnVnLCBJc1Rlc3RTZXJ2ZXIgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi9VSS9VSU1hbmFnZXJcIjtcclxuZXhwb3J0IGxldCBXV1c9ICdodHRwczovL3d3dy55aXhpaHV5dS5jb206ODg3Myc7Ly9odHRwOi8vYXBpLnN1cGVyLWJvc3NnYW1lLmNvbVxyXG5leHBvcnQgbGV0IFRFU1Q9J2h0dHA6Ly80Ny4yNDMuMTE0LjEyNjoxMDAxOCc7Ly9odHRwOi8vNDcuMjQzLjExNC4xMjY6MTAwMThcclxuXHJcbi8qKuimgeiuv+mXrueahOaOpeWPo+WQjeensCAqL1xyXG5leHBvcnQgZW51bSBBY2Nlc3NOYW1lXHJcbntcclxuICAgIC8qKuiOt+WPlueUqOaIt+eOsOacieeahOa4uOaIj+mBk+WFtyAqL1xyXG4gICAgZ2V0VXNlckl0ZW1zPVwiL3VzZXIvZ2V0VXNlckl0ZW1zXCIsICAgICAgIFxyXG4gICAgLyoq6I635Y+W5pyN5Yqh5Zmo5pe26Ze05oiz5o6l5Y+jICovXHJcbiAgICBnZXRTZXJ2ZXJUaW1lID0gXCIvY2xpZW50U3luYy9zZWNvbmRzXCIsXHJcbiAgICAvKirmir3lpZbmjqXlj6MgKi9cclxuICAgIHRyeVByaXplID0gXCIvdXNlci91c2VyUHJpemVcIixcclxuICAgIC8qKuabtOaWsOeUqOaIt+aVsOaNruS/oeaBryAqL1xyXG4gICAgdXBkYXRlVXNlckluZm8gPSBcIi91c2VyL3VwZGF0ZVVzZXJJbmZvXCIsXHJcbiAgICAvKirmm7TmlrDnlKjmiLfmlbDmja7kv6Hmga8tQk9TU+avj+WRqOWlluWKsemihuWPlueKtuaAgSAqL1xyXG4gICAgdXBkYXRlVXNlckluZm9ETkwgPSBcIi91c2VyL3VwZGF0ZVVzZXJJbmZvRE5MXCIsXHJcbiAgICAvKirkv67mlLnlpLTlg4/vvIzlkI3lrZcgKi9cclxuICAgIHVwZGF0ZUF2YXRhciA9IFwiL3VzZXIvdXBkYXRlQXZhdGFyXCIsXHJcbiAgICAvKirovaznm5jmir3lpZbmjqXlj6MgKi9cclxuICAgIHVzZXJUdXJuUHJpemUgPSBcIi91c2VyL3VzZXJUdXJuUHJpemVcIixcclxuICAgIC8qKuiOt+WPluaImOWKm+aOkuihjOamnOaOpeWPoyAqL1xyXG4gICAgbGVhZGVyYm9hcmRCeVVzZXIgPSBcIi91c2VyL2xlYWRlcmJvYXJkQnlVc2VyXCIsXHJcbiAgICAvKirpgZPlhbfmlbDmja7kuIrmiqUgKi9cclxuICAgIHNldFByb3AgPVwiL2l0ZW0vcmVwb3J0XCIsXHJcbiAgICAvKirpgZPlhbfmlbDmja7kuIvlj5EgKi9cclxuICAgIGdldFByb3A9XCIvaXRlbS9saXN0XCIsXHJcbiAgICAvKirmn6Xor6LnlKjmiLfku7vliqHov5vluqblj4rku7vliqHlpZblirHpooblj5bnirbmgIEgKi9cclxuICAgIHF1ZXJ5R2FtZVRhc2sgPSBcIi91c2VyVGFzay9xdWVyeUdhbWVUYXNrXCIsXHJcbiAgICAvKirkv53lrZjnlKjmiLfku7vliqHov5vluqYgKi9cclxuICAgIHNhdmVHYW1lVGFzayA9IFwiL3VzZXJUYXNrL3NhdmVHYW1lVGFza1wiLFxyXG4gICAgLyoq6I635Y+W55So5oi35L+h5oGvICovXHJcbiAgICB1c2VySW5mbyA9IFwiL3VzZXIvaW5mb1wiLFxyXG4gICAgLyoqQm9zc+iOt+WPlui9ruaNoumhuuW6jyAqL1xyXG4gICAgZ2V0Qm9zcyA9IFwiL2NvcHkvZ2V0Qm9zc1wiLFxyXG4gICAgLyoq5LiK5Lyg55So5oi3aWTvvIzkvKBcIlwi5YC85Lya55Sf5oiQ5LiA5Liq55So5oi3aWQqL1xyXG4gICAgdXNlckJhc2ljPVwiL3VzZXIvYmFzaWNcIixcclxuICAgIC8qKueJiOacrOiOt+WPliAqL1xyXG4gICAgdmVyc2lvbkdldD1cIi92ZXJzaW9uL2dldFwiLFxyXG4gICAgLyoq6I635Y+W6Iux6ZuE5YiX6KGoICovXHJcbiAgICBnZXRIZXJvTGlzdCA9IFwiL2hlcm8vbGlzdFwiLFxyXG4gICAgLyoq5LiK5oql6Iux6ZuE5YiX6KGoICovXHJcbiAgICByZXBvcnRIZXJvTGlzdCA9IFwiL2hlcm8vcmVwb3J0XCIsXHJcbiAgICAvKirkuIPlpKnnrb7liLAgKi9cclxuICAgIHNldmVuU2lnbiA9IFwiL3NpZ24vc2V2ZW5TaWduXCIsXHJcbiAgICAvKirkuIPlpKnnrb7liLDnu5PmnZ8gKi9cclxuICAgIHVwZGF0ZVNldmVuR2lmdCA9IFwiL3NpZ24vdXBkYXRlU2V2ZW5HaWZ0XCIsXHJcbiAgICAvKirmnIjnrb7liLAgKi9cclxuICAgIG1vbnRoU2lnbiA9IFwiL3NpZ24vbW9udGhTaWduXCIsXHJcbiAgICAvKirmnIjnrb7liLDntK/orqHlpZblirEgKi9cclxuICAgIGFkZFNpZ25HaWZ0ID0gXCIvc2lnbi9hZGRTaWduR2lmdFwiLFxyXG4gICAgLyoq5p+l6K+i5pyI562+5Yiw5ZKM5pyI562+5Yiw57Sv6K6h5aWW5Yqx6aKG5Y+W6K6w5b2VICovXHJcbiAgICBnZXRTaWduUmVjb3JkID0gXCIvc2lnbi9nZXRTaWduUmVjb3JkXCIsXHJcbiAgICAvKirku7vliqHmn6Xor6IgKi9cclxuICAgIHF1ZXJ5R2FtZUFjaGlldmVtZW50VGFzayA9IFwiL2FjaGlldmVtZW50VGFzay9xdWVyeUdhbWVBY2hpZXZlbWVudFRhc2tcIixcclxuICAgIC8qKuS7u+WKoeS/ruaUuSAqL1xyXG4gICAgY2hhbmdlR2FtZUFjaGlldmVtZW50VGFzayA9IFwiL2FjaGlldmVtZW50VGFzay9jaGFuZ2VHYW1lQWNoaWV2ZW1lbnRUYXNrXCIsXHJcbiAgICAvKirku7vliqHmlrDlop4gKi9cclxuICAgIHNhdmVHYW1lQWNoaWV2ZW1lbnRUYXNrID0gXCIvYWNoaWV2ZW1lbnRUYXNrL3NhdmVHYW1lQWNoaWV2ZW1lbnRUYXNrXCIsXHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGFza09iamVjdHtcclxuICAgIC8vLyoq55So5oi3aWQgKi9cclxuICAgIC8vIHVpZDpzdHJpbmcgPSBcIlwiO1xyXG4gICAgLyoq5pel5pyfICovXHJcbiAgICB0b2RheTpzdHJpbmcgPSBcIlwiO1xyXG4gICAgLyoq5Li757q/5Lu75Yqh5pi+56S66L+b5bqmICovXHJcbiAgICBwcm9ncmVzczpudW1iZXIgPSAwO1xyXG4gICAgLyoq5Lu75YqhaWQgKi9cclxuICAgIHRhc2tJZDpudW1iZXIgPSAwO1xyXG4gICAgLyoq5Lu75Yqh57u05bqmIDEt5q+P5pel5Lu75YqhIDIt5oiQ5bCx5Lu75YqhIDMt5Li757q/5Lu75YqhICovXHJcbiAgICBkaW1lbnNpb246bnVtYmVyID0gMDtcclxuICAgIC8qKuS7u+WKoeexu+WeiyAqL1xyXG4gICAgdGFza1R5cGU6bnVtYmVyID0gMDtcclxuICAgIC8qKuinpuWPkeasoeaVsCAqL1xyXG4gICAgZW1pdDpudW1iZXIgPSAwO1xyXG4gICAgLyoq5Lu75Yqh6Zi25q61ICovXHJcbiAgICBzdGFnZTpudW1iZXIgPSAwO1xyXG4gICAgLyoq5Lu75Yqh54q25oCBIC0xIOW3suWujOaIkCAtMiDlt7Lpooblj5YgKi9cclxuICAgIHN0YXR1czpudW1iZXIgPSAwO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSGVyb09iamVjdHtcclxuICAgIC8qKuiLsembhGlkICovXHJcbiAgICBoZXJvSWQ6bnVtYmVyID0gMDtcclxuICAgIC8qKuiLsembhOetiee6pyAqL1xyXG4gICAgaGVyb0xldmVsOm51bWJlciA9IDA7XHJcbiAgICAvKiroi7Hpm4TpmLbmrrUgKi9cclxuICAgIGhlcm9TdGFnZTpudW1iZXIgPSAwO1xyXG4gICAgLyoq5LiT5q2m6Zi25q61ICovXHJcbiAgICBoZXJvV2VhcG9uU3RhZ2U6bnVtYmVyID0gMDtcclxuICAgIC8qKuatpuWZqGlkICovXHJcbiAgICB3ZWFwb25zOm51bWJlciA9IDA7XHJcbiAgICAvKirmiqTnlLJpZCAqL1xyXG4gICAgYXJtb3I6bnVtYmVyID0gMDtcclxuICAgIC8qKumlsOWTgWlkICovXHJcbiAgICBhY2Nlc3NvcmllczpudW1iZXIgPSAwO1xyXG4gICAgLyoq6Z6L5a2QaWQgKi9cclxuICAgIHNob2VzOm51bWJlciA9IDA7XHJcbiAgICAvKirlrqDnialpZCAqL1xyXG4gICAgcGV0Om51bWJlciA9IDA7XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFBhcmFtc19UeXBlXHJcbntcclxuICAgIC8qKuWPquW4plVJROeahE5VTEwgKi9cclxuICAgIE51bGw9MCxcclxuICAgIFxyXG4gICAgXHJcbiAgICBudW0sXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQcm9wT2JqZWN0e1xyXG4gICAgaXRlbXNJZDpudW1iZXI9MDtcclxuICAgIGl0ZW1zTnVtOm51bWJlcj0xO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSHR0cE1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgQWVzS2V5OiBzdHJpbmc9XCJhYmMxMjM0NVwiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgQ0JDSVY6IHN0cmluZz1cImNiYTc2MzIxXCI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpc1N1Y2Nlc3NSZXM6Ym9vbGVhbiA9IHRydWU7XHJcbiAgICAvKipcclxuICAgICAqIHBvc3Tor7fmsYLkuIDkuKrmjqXlj6NcclxuICAgICAqIEBwYXJhbSBhY2Nlc3NOYW1lIOivt+axgueahOaOpeWPo+WQjeensFxyXG4gICAgICogQHBhcmFtIHBhcmFtcyDor7fmsYLnmoTlj4LmlbBcclxuICAgICAqIEByZXR1cm5zIFByb21pc2Xlr7nosaFcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHBvc3QoYWNjZXNzTmFtZTpBY2Nlc3NOYW1lLHBhcmFtczpzdHJpbmcsaXNXYWl0OmJvb2xlYW4gPWZhbHNlKTpQcm9taXNlPGFueT57XHJcbiAgICAgICAgaWYoIUlzVGVzdFNlcnZlcil7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7fSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGlzV2FpdCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNTdWNjZXNzUmVzKXtcclxuICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dXYWl0VWlEaWFsb2coKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNTdWNjZXNzUmVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHt9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKT0+e1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh4aHIuc3RhdHVzLHhoci5yZWFkeVN0YXRlKTtcclxuICAgICAgICAgICAgICAgIGlmKHhoci5yZWFkeVN0YXRlID09IDQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDQwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSB4aHIucmVzcG9uc2VUZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYy5sb2cocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQganNvbj1KU09OLnBhcnNlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoanNvbi5zdGF0dXM9PScyMDAnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpc1dhaXQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTdWNjZXNzUmVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jbG9zZVdhaXRVaURpYWxvZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShqc29uLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoJ+ivt+axguaIkOWKnyzplJnor6/noIE6Jytqc29uLnN0YXR1cytcIizplJnor6/kv6Hmga86XCIranNvbi5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+aWree9keaIluiAheS4jeWtmOWcqO+8jOWPr+iDveaYr+i/lOWbnjQwNFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoJ+ivt+axguWksei0pe+8jOeKtuaAgeeggTonK3hoci5zdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGxldCB1cmw9dGhpcy5nZXRVcmxCeVR5cGUoYWNjZXNzTmFtZSk7XHJcbiAgICAgICAgICAgIHhoci5vcGVuKFwiUE9TVFwiLCB1cmwsIHRydWUpO1xyXG4gICAgICAgICAgICAvL3hoci5vcGVuKClcclxuICAgICAgICAgICAgLy9vcGVu5LmL5ZCO77yMc2VuZOS5i+WJjVxyXG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLFwiYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04XCIpO1xyXG4gICAgICAgICAgICAvL+ivt+axguWPguaVsO+8iOivt+axguS9k++8iTtcclxuICAgICAgICAgICAgLy9sZXQgcGFyYW1zPXRoaXMuZ2V0SXNzdWVkUGFyYW1zQnlUeXBlKHBhcmFtc1R5cGUpO1xyXG4gICAgICAgICAgICBjYy5sb2coJ3VybDonK3VybCtcIlxcbnBhcmFtczpcIitwYXJhbXMpO1xyXG4gICAgICAgICAgICB4aHIuc2VuZChwYXJhbXMpOyAgICBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnYW1lVGltZVBvc3QoYWNjZXNzTmFtZTpBY2Nlc3NOYW1lLHBhcmFtczpzdHJpbmcpOlByb21pc2U8YW55PntcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuS7juacjeWKoeiOt+WPluaXtumXtOaIs1wiK2FjY2Vzc05hbWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpPT57XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZ2FtZVRpbWVQb3N0OicseGhyLnJlYWR5U3RhdGUpKycsJyt4aHIuc3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgaWYoeGhyLnJlYWR5U3RhdGUgPT0gNClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgNDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXNwb25zZSA9IHhoci5yZXNwb25zZVRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBqc29uPUpTT04ucGFyc2UocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihqc29uLnN0YXR1cz09JzIwMCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoanNvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCgn6K+35rGC5oiQ5YqfLOmUmeivr+eggTonK2pzb24uc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+aWree9keaIluiAheS4jeWtmOWcqO+8jOWPr+iDveaYr+i/lOWbnjQwNFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoJ+ivt+axguWksei0pe+8jOeKtuaAgeeggTonK3hoci5zdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGxldCB1cmw9dGhpcy5nZXRVcmxCeVR5cGUoYWNjZXNzTmFtZSk7XHJcbiAgICAgICAgICAgIHhoci5vcGVuKFwiUE9TVFwiLCB1cmwsIHRydWUpO1xyXG4gICAgICAgICAgICAvL3hoci5vcGVuKClcclxuICAgICAgICAgICAgLy9vcGVu5LmL5ZCO77yMc2VuZOS5i+WJjVxyXG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLFwiYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04XCIpO1xyXG4gICAgICAgICAgICAvL+ivt+axguWPguaVsO+8iOivt+axguS9k++8iTtcclxuICAgICAgICAgICAgLy9sZXQgcGFyYW1zPXRoaXMuZ2V0SXNzdWVkUGFyYW1zQnlUeXBlKHBhcmFtc1R5cGUpO1xyXG4gICAgICAgICAgICBjYy5sb2coJ3VybDonK3VybCtcIlxcbnBhcmFtczpcIitwYXJhbXMpO1xyXG4gICAgICAgICAgICB4aHIuc2VuZChwYXJhbXMpOyAgICBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGdldFVybEJ5VHlwZSh1cmxUeXBlOkFjY2Vzc05hbWUpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIGxldCB1cmxTdHI9V1dXO1xyXG4gICAgICAgIGlmKElzRGVidWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB1cmxTdHI9VEVTVDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHVybD11cmxTdHIrdXJsVHlwZTtcclxuICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAqIEFFU+WKoOWvhu+8iENCQ+aooeW8j++8jOmcgOimgeWBj+enu+mHj++8iVxyXG4gICAgICogQHBhcmFtIGRhdGFcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBlbmNyeXB0KGRhdGEpe1xyXG4gICAgICAgIHZhciBrZXkgPSBDcnlwdG9KUy5lbmMuVXRmOC5wYXJzZSh0aGlzLkFlc0tleSk7XHJcbiAgICAgICAgdmFyIHNlY3JldERhdGEgPSBDcnlwdG9KUy5lbmMuVXRmOC5wYXJzZShkYXRhKTtcclxuICAgICAgICB2YXIgZW5jcnlwdGVkID0gQ3J5cHRvSlMuQUVTLmVuY3J5cHQoXHJcbiAgICAgICAgICAgIHNlY3JldERhdGEsIFxyXG4gICAgICAgICAgICBrZXksIFxyXG4gICAgICAgICAgICB0aGlzLmdldENCQ09wdGlvbnMoKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuIGVuY3J5cHRlZC50b1N0cmluZygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEFFU+ino+Wvhu+8iENCQ+aooeW8j++8jOmcgOimgeWBj+enu+mHj++8iVxyXG4gICAgICogQHBhcmFtIGRhdGFcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBkZWNyeXB0KGRhdGEpe1xyXG4gICAgICAgIHZhciBrZXkgPSBDcnlwdG9KUy5lbmMuVXRmOC5wYXJzZSh0aGlzLkFlc0tleSk7XHJcbiAgICAgICAgdmFyIGRlY3J5cHQgPSBDcnlwdG9KUy5BRVMuZGVjcnlwdChcclxuICAgICAgICAgICAgZGF0YSwgXHJcbiAgICAgICAgICAgIGtleSwgXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q0JDT3B0aW9ucygpXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gQ3J5cHRvSlMuZW5jLlV0Zjguc3RyaW5naWZ5KGRlY3J5cHQpLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0Q0JDT3B0aW9ucygpOmFueXsgICAgICBcclxuICAgICAgICAvLyDliqDlr4bpgInpoblcclxuICAgICAgICBsZXQgQ0JDT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgaXY6IENyeXB0b0pTLmVuYy5VdGY4LnBhcnNlKHRoaXMuQ0JDSVYpLFxyXG4gICAgICAgICAgICBtb2RlOkNyeXB0b0pTLm1vZGUuQ0JDLFxyXG4gICAgICAgICAgICBwYWRkaW5nOiBDcnlwdG9KUy5wYWQuUGtjczdcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIENCQ09wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyB0ZXN0QUVTKHN0cjpzdHJpbmcpe1xyXG4gICAgICAgIGxldCBhYT10aGlzLmVuY3J5cHQoc3RyKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhhYSk7XHJcbiAgICAgICAgbGV0IGJiPXRoaXMuZGVjcnlwdChhYSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coYmIpO1xyXG4gICAgfVxyXG4gICAgLy8g4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCU4oCUXHJcbiAgICAvLyDniYjmnYPlo7DmmI7vvJrmnKzmlofkuLpDU0RO5Y2a5Li744CMbXl6a3NreeOAjeeahOWOn+WIm+aWh+eroO+8jOmBteW+qkNDIDQuMCBCWS1TQeeJiOadg+WNj+iuru+8jOi9rOi9veivt+mZhOS4iuWOn+aWh+WHuuWkhOmTvuaOpeWPiuacrOWjsOaYjuOAglxyXG4gICAgLy8g5Y6f5paH6ZO+5o6l77yaaHR0cHM6Ly9ibG9nLmNzZG4ubmV0L215emtza3kvYXJ0aWNsZS9kZXRhaWxzLzgyMDUyOTIwXHJcbn1cclxuXHJcbiJdfQ==