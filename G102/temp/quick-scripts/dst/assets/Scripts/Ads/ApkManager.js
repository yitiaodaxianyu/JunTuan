
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Ads/ApkManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a7db7EWjlBJgb353YPTItlL', 'ApkManager');
// Scripts/Ads/ApkManager.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var FollowManager_1 = require("../multiLanguage/FollowManager");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var Constants_1 = require("../Constants");
var VipManager_1 = require("./VipManager");
var GameData_1 = require("../GameData");
var GameManager_1 = require("../GameManager");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var LanguageConstants_1 = require("../multiLanguage/LanguageConstants");
var AudioConstants_1 = require("../Sound/AudioConstants");
var ABTestManager_1 = require("../ABTest/ABTestManager");
var LevelManager_1 = require("../Level/LevelManager");
var UserData_1 = require("../UserData");
var ThirdParty_1 = require("../thirdParty/ThirdParty");
var PayManager_1 = require("../Payment/PayManager");
var DingYueManager_1 = require("../Payment/DingYueManager");
var TaskManager_1 = require("../Task/TaskManager");
var TaskEnum_1 = require("../Task/TaskEnum");
var StorageManager_1 = require("../Storage/StorageManager");
var StorageConfig_1 = require("../Storage/StorageConfig");
var UIManager_1 = require("../UI/UIManager");
var TaskUi_1 = require("../Task/TaskUi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ApkManager = /** @class */ (function () {
    function ApkManager() {
        this.adCallback = null;
        this.interVideoCallback = null;
        this.perv_inst_time = 0;
        this.dy = null;
        this.pay = null;
        this.uploadCallback = null;
        this.dy_info_callback = null;
        this.pay_info_callback = null;
        //包体信息
        this.package_name = 'com.IdleHeroCastleDefense';
        this.app_ver = '1.0.12';
        this.app_code = 12;
        this.sys_ver = 31;
        this.android_id = '';
        this.aid = "xxxxx";
        this.plmn = 41401;
        this.did = "";
        this.package_callback = null;
        //广告加载完成的类型数量
        this.ad_loaded_num = 0;
        this.max_load_num = 2;
    }
    ApkManager_1 = ApkManager;
    ApkManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new ApkManager_1();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    ApkManager.prototype.init = function () {
        cc.APK = this;
        cc.game.on(cc.game.EVENT_HIDE, function () {
            console.log("游戏进入后台,上传总时长");
            GameData_1.default.getInstance().saveExitTime();
        }, this);
        cc.game.on(cc.game.EVENT_SHOW, function () {
            console.log("游戏进入前台,保存一个时间");
            GameData_1.default.getInstance().saveLoginTime();
            // GameData.getInstance().checkIsNewDay();
            // 拉取服务器时间
            GameData_1.default.getInstance().refreshServerTime();
            if (GameManager_1.default.getInstance().cur_game_scene == Constants_1.GameScene.home) {
                setTimeout(function () {
                    cc.find("Canvas/task_ui").getComponent(TaskUi_1.default).refreshDailyTask();
                }, 500);
            }
        }, this);
        //this.initAds();
        this.onJSInitFinish();
        // setInterval(()=>{
        //     PropManager.getInstance().saveAllPropNum(true);
        // },60*1000);
    };
    ApkManager.prototype.initAds = function () {
        //开启一个计时器，如果  激励视频2分钟内都是未加载，则主动发起一次加载
        var adNoNum = 0;
        // let setInter = setInterval(()=>{
        //     if(this.ad_video_load_state==AD_LOAD_STATE.NO)
        //     {
        //         adNoNum++;
        //     }else
        //     {
        //         adNoNum=0;
        //     }
        //     if(adNoNum>=120)
        //     {
        //         adNoNum=0;
        //     }
        // }, 1000); //1000毫秒为1秒
    };
    ;
    //-----------------------------------------------调用JAVA--------------------------------------------------------------
    ApkManager.prototype.onJSInitFinish = function () {
        if (cc.sys.isNative) {
            var className = "org/cocos2dx/javascript/ApkManager";
            var methodName = "onJSInitFinish";
            var methodSignature = "()V"; //如果是string：Ljava/lang/String;, bool:Z,int:I
            jsb.reflection.callStaticMethod(className, methodName, methodSignature);
        }
    };
    //展示插屏广告
    ApkManager.prototype.showBanner = function () {
        return;
        if (cc.sys.isNative) {
            var className = "org/cocos2dx/javascript/ApkManager";
            var methodName = "showBanner";
            var methodSignature = "()V"; //如果是string：Ljava/lang/String;, bool:Z,int:I
            jsb.reflection.callStaticMethod(className, methodName, methodSignature);
        }
    };
    //展示插屏广告
    ApkManager.prototype.closeBanner = function () {
        return;
        if (cc.sys.isNative) {
            var className = "org/cocos2dx/javascript/ApkManager";
            var methodName = "closeBanner";
            var methodSignature = "()V"; //如果是string：Ljava/lang/String;, bool:Z,int:I
            jsb.reflection.callStaticMethod(className, methodName, methodSignature);
        }
    };
    //展示插屏广告
    ApkManager.prototype.showInterstitial = function (message) {
        if (VipManager_1.VipManager.getIsVip() == true) {
            return;
        }
        var curTime = new Date().getTime();
        var isCanAd = false;
        if (curTime - this.perv_inst_time > 1000 * 10) {
            isCanAd = true;
            this.perv_inst_time = curTime;
        }
        if (isCanAd == false) {
            return;
        }
        if (cc.sys.isNative) {
            var className = "org/cocos2dx/javascript/ApkManager";
            var methodName = "showInterstitial";
            var methodSignature = "()V"; //如果是string：Ljava/lang/String;, bool:Z,int:I
            jsb.reflection.callStaticMethod(className, methodName, methodSignature);
        }
    };
    //展示视频广告
    ApkManager.prototype.showVideo = function (callback, type) {
        GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100113));
        return;
        // 周卡免视频特权
        if (DingYueManager_1.DingYueManager.getInstance().getWeekInfo().is_buy == true && StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.WeekCardFreeAdNum) > 0) {
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.WeekCardFreeAdNum, StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.WeekCardFreeAdNum) - 1);
            this.adCallback = callback;
            this.adResult(1);
            return;
        }
        if (Constants_1.IsDebug == true) {
            this.adCallback = callback;
            this.adResult(1);
            return;
        }
        if (VipManager_1.VipManager.subVipFreeNum() == true) {
            //是否要VIP提示  
            callback(true);
            return;
        }
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.点击视频播放奖励玩家数);
        this.adCallback = callback;
        if (cc.sys.isNative) {
            var className = "org/cocos2dx/javascript/ApkManager";
            var methodName = "showVideo";
            var methodSignature = "(I)V"; //如果是string：Ljava/lang/String;, bool:Z,int:I
            jsb.reflection.callStaticMethod(className, methodName, methodSignature, type);
        }
        else {
            if (Constants_1.IsDebug)
                this.adResult(1);
            else
                this.adResult(0);
        }
    };
    //展示视频广告
    ApkManager.prototype.showInterVideo = function (callback, type) {
        // if(IsDebug==true)
        // {
        //     this.adCallback=callback;
        //     this.adResult(1);
        //     return;
        // }        
        //FollowManager.getInstance().followEvent(Follow_Type.点击视频播放奖励玩家数);
        GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100113));
        return;
        this.interVideoResult = callback;
        if (cc.sys.isNative) {
            var className = "org/cocos2dx/javascript/ApkManager";
            var methodName = "showInterVideo";
            var methodSignature = "(I)V"; //如果是string：Ljava/lang/String;, bool:Z,int:I
            jsb.reflection.callStaticMethod(className, methodName, methodSignature, type);
        }
        else {
            if (Constants_1.IsDebug)
                this.interVideoResult(1);
            else
                this.interVideoResult(0);
        }
    };
    //显示联系我们链接
    ApkManager.prototype.showCallMe = function () {
        if (cc.sys.isNative) {
            var className = "org/cocos2dx/javascript/ApkManager";
            var methodName = "showCallMe";
            var methodSignature = "()V"; //如果是string：Ljava/lang/String;, bool:Z,int:I
            jsb.reflection.callStaticMethod(className, methodName, methodSignature);
        }
    };
    //埋点
    ApkManager.prototype.followEvent = function (eventName) {
        if (Constants_1.CUR_Platform == Constants_1.Release_Platform.APK) {
            if (cc.sys.isNative) {
                var className = "org/cocos2dx/javascript/ApkManager";
                var methodName = "followEvent";
                var methodSignature = "(Ljava/lang/String;)V"; //如果是string：Ljava/lang/String;, bool:Z,int:I
                jsb.reflection.callStaticMethod(className, methodName, methodSignature, eventName);
            }
        }
    };
    //检测订阅信息
    ApkManager.prototype.cheakDYInfo = function () {
        if (Constants_1.CUR_Platform == Constants_1.Release_Platform.APK)
            if (cc.sys.isNative) {
                var className = "org/cocos2dx/javascript/ApkManager";
                var methodName = "cheakDYInfo";
                var methodSignature = "()V"; //如果是string：Ljava/lang/String;, bool:Z,int:I
                jsb.reflection.callStaticMethod(className, methodName, methodSignature);
            }
            else {
                if (Constants_1.IsDebug) {
                }
            }
    };
    ApkManager.prototype.showTiaoKuan = function () {
        if (Constants_1.CUR_Platform == Constants_1.Release_Platform.APK)
            if (cc.sys.isNative) {
                var className = "org/cocos2dx/javascript/ApkManager";
                var methodName = "showTiaoKuan";
                var methodSignature = "()V"; //如果是string：Ljava/lang/String;, bool:Z,int:I
                jsb.reflection.callStaticMethod(className, methodName, methodSignature);
            }
    };
    ApkManager.prototype.showDingYue = function (dy, id) {
        this.dy = dy;
        if (Constants_1.IsDebug) {
            this.dyResult(1);
            PayManager_1.PayManager.getInstance().savePayNum(id, 1);
            return;
        }
        if (cc.sys.isNative) {
            var className = "org/cocos2dx/javascript/ApkManager";
            var methodName = "showDingYue";
            var methodSignature = "(Ljava/lang/String;)V"; //如果是string：Ljava/lang/String;, bool:Z,int:I
            jsb.reflection.callStaticMethod(className, methodName, methodSignature, id);
        }
        else {
            this.dyResult(1);
        }
    };
    ApkManager.prototype.getVipInfo = function (callback) {
        this.uploadCallback = callback;
        var uid = UserData_1.default.getInstance().getUserID();
        if (cc.sys.isNative) {
            var className = "org/cocos2dx/javascript/ApkManager";
            var methodName = "getVipInfo";
            var methodSignature = "(Ljava/lang/String;)V"; //如果是string：Ljava/lang/String;, bool:Z,int:I
            jsb.reflection.callStaticMethod(className, methodName, methodSignature, uid);
        }
    };
    ApkManager.prototype.showPay = function (pay, type) {
        this.pay = pay;
        if (Constants_1.IsDebug) {
            this.payResult(1);
            return;
        }
        UIManager_1.UIManager.getInstance().showPayWaitingUi();
        if (cc.sys.isNative) {
            var className = "org/cocos2dx/javascript/ApkManager";
            var methodName = "showPay";
            var methodSignature = "(Ljava/lang/String;)V"; //如果是string：Ljava/lang/String;, bool:Z,int:I
            jsb.reflection.callStaticMethod(className, methodName, methodSignature, type);
        }
        else {
            this.payResult(1);
        }
    };
    //----------------------------------------------------登录交互-----------------------------------------------------------
    ApkManager.prototype.uploadAndGetUid = function (callback) {
        this.uploadCallback = callback;
        var maxLevel = LevelManager_1.LevelManager.getInstance().finish_level;
        var onlineTime = GameData_1.default.getTotalTime();
        var name = UserData_1.default.getInstance().getUserName();
        if (cc.sys.isNative) {
            var className = "org/cocos2dx/javascript/ApkManager";
            var methodName = "uploadAndGetUid";
            var methodSignature = "(IILjava/lang/String;)V"; //如果是string：Ljava/lang/String;, bool:Z,int:I
            jsb.reflection.callStaticMethod(className, methodName, methodSignature, maxLevel, onlineTime, name);
        }
        else {
            this.uploadResult(JSON.stringify({ uid: UserData_1.default.getInstance().getUserID(), vip: '0' }));
        }
    };
    ApkManager.prototype.uploadOnlineTime = function () {
        var maxLevel = LevelManager_1.LevelManager.getInstance().finish_level;
        var onlineTime = GameData_1.default.getTotalTime();
        var uid = UserData_1.default.getInstance().getUserID();
        if (uid == '')
            return;
        if (cc.sys.isNative) {
            var className = "org/cocos2dx/javascript/ApkManager";
            var methodName = "uploadOnlineTime";
            var methodSignature = "(IILjava/lang/String;)V"; //如果是string：Ljava/lang/String;, bool:Z,int:I
            jsb.reflection.callStaticMethod(className, methodName, methodSignature, maxLevel, onlineTime, uid);
        }
    };
    ApkManager.prototype.loginForFB = function (callback) {
        this.uploadCallback = callback;
        var maxLevel = LevelManager_1.LevelManager.getInstance().finish_level;
        var onlineTime = GameData_1.default.getTotalTime();
        if (cc.sys.isNative) {
            var className = "org/cocos2dx/javascript/ApkManager";
            var methodName = "loginForFB";
            var methodSignature = "(II)V"; //如果是string：Ljava/lang/String;, bool:Z,int:I
            jsb.reflection.callStaticMethod(className, methodName, methodSignature, maxLevel, onlineTime);
        }
    };
    ApkManager.prototype.loginForGoogle = function (callback) {
        this.uploadCallback = callback;
        var maxLevel = LevelManager_1.LevelManager.getInstance().finish_level;
        var onlineTime = GameData_1.default.getTotalTime();
        if (cc.sys.isNative) {
            var className = "org/cocos2dx/javascript/ApkManager";
            var methodName = "loginForGoogle";
            var methodSignature = "(II)V"; //如果是string：Ljava/lang/String;, bool:Z,int:I
            jsb.reflection.callStaticMethod(className, methodName, methodSignature, maxLevel, onlineTime);
        }
    };
    ApkManager.prototype.setUid = function () {
        if (Constants_1.CUR_Platform == Constants_1.Release_Platform.APK && cc.sys.isNative) {
            var uid = UserData_1.default.getInstance().getUserID();
            var className = "org/cocos2dx/javascript/ApkManager";
            var methodName = "setUid";
            var methodSignature = "(Ljava/lang/String;)V"; //如果是string：Ljava/lang/String;, bool:Z,int:I
            jsb.reflection.callStaticMethod(className, methodName, methodSignature, uid);
        }
    };
    ApkManager.prototype.getAndroidLanguage = function () {
        if (cc.sys.isNative) {
            var className = "org/cocos2dx/javascript/ApkManager";
            var methodName = "getAndroidLanguage";
            var methodSignature = "()V"; //如果是string：Ljava/lang/String;, bool:Z,int:I
            jsb.reflection.callStaticMethod(className, methodName, methodSignature);
        }
    };
    ApkManager.prototype.getABTestPar = function () {
        if (cc.sys.isNative) {
            var className = "org/cocos2dx/javascript/ApkManager";
            var methodName = "getABTestPar";
            var methodSignature = "()V"; //如果是string：Ljava/lang/String;, bool:Z,int:I
            jsb.reflection.callStaticMethod(className, methodName, methodSignature);
        }
    };
    /**
     * 让手机震动一下
     * @param dt 震动时间，毫秒（整数）
     */
    ApkManager.prototype.beVibrate = function (dt) {
        if (cc.sys.isNative) {
            var className = "org/cocos2dx/javascript/ApkManager";
            var methodName = "beVibrate";
            var methodSignature = "(I)V"; //如果是string：Ljava/lang/String;, bool:Z,int:I
            jsb.reflection.callStaticMethod(className, methodName, methodSignature, dt);
        }
    };
    ApkManager.prototype.getDingYueInfo = function (dyInfo) {
        this.dy_info_callback = dyInfo;
        if (cc.sys.isNative) {
            var className = "org/cocos2dx/javascript/ApkManager";
            var methodName = "getDingYueInfo";
            var methodSignature = "()V"; //如果是string：Ljava/lang/String;, bool:Z,int:I
            jsb.reflection.callStaticMethod(className, methodName, methodSignature);
        }
    };
    /**调用android获得支付信息 */
    ApkManager.prototype.getPayInfos = function (payInfo) {
        this.pay_info_callback = payInfo;
        if (Constants_1.IsDebug) {
            this.setTestPayInfo();
            return;
        }
        if (cc.sys.isNative) {
            var className = "org/cocos2dx/javascript/ApkManager";
            var methodName = "getPayInfos";
            var methodSignature = "()V"; //如果是string：Ljava/lang/String;, bool:Z,int:I
            jsb.reflection.callStaticMethod(className, methodName, methodSignature);
        }
        else {
            this.setTestPayInfo();
        }
    };
    /**调用android*/
    ApkManager.prototype.jumpToGP = function () {
        if (cc.sys.isNative) {
            var className = "org/cocos2dx/javascript/ApkManager";
            var methodName = "jumpToGP";
            var methodSignature = "()V"; //如果是string：Ljava/lang/String;, bool:Z,int:I
            jsb.reflection.callStaticMethod(className, methodName, methodSignature);
        }
    };
    ApkManager.prototype.getPackageInfo = function (callback) {
        this.package_callback = callback;
        if (cc.sys.isNative) {
            var className = "org/cocos2dx/javascript/ApkManager";
            var methodName = "getPackageInfo";
            var methodSignature = "()V"; //如果是string：Ljava/lang/String;, bool:Z,int:I
            jsb.reflection.callStaticMethod(className, methodName, methodSignature);
        }
    };
    ApkManager.prototype.setTestPayInfo = function () {
        this.setPayInfos([{ "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "b201", "is_buy": false },
            { "des": "get 60 crystals", "price": "￦84400", "currency": "KRW", "pay_id": "b401", "is_buy": false },
            { "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "b501", "is_buy": false },
            { "des": "get 60 crystals", "price": "￦92,724", "currency": "KRW", "pay_id": "c101", "is_buy": false },
            { "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "c102", "is_buy": false },
            { "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "c103", "is_buy": false },
            { "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "c104", "is_buy": false },
            { "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "c105", "is_buy": false },
            { "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "c106", "is_buy": false },
            { "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "c107", "is_buy": false },
            { "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "c108", "is_buy": false },
            { "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "c109", "is_buy": false },
            { "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "c110", "is_buy": false },
            { "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "c201", "is_buy": false },
            { "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "c202", "is_buy": false },
            { "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "c203", "is_buy": false },
            { "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "c204", "is_buy": false },
            { "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "c205", "is_buy": false },
            { "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "c206", "is_buy": false },
            { "des": "get 60 crystals", "price": "￦666", "currency": "KRW", "pay_id": "c301", "is_buy": false },
            { "des": "get 60 crystals", "price": "$3", "currency": "KRW", "pay_id": "c501", "is_buy": false },
            { "des": "get 60 crystals", "price": "$3", "currency": "KRW", "pay_id": "c502", "is_buy": false },
            { "des": "get 60 crystals", "price": "$3", "currency": "KRW", "pay_id": "c503", "is_buy": false },
            { "des": "get 60 crystals", "price": "$3", "currency": "KRW", "pay_id": "c504", "is_buy": false },
            { "des": "get 60 crystals", "price": "$0.1", "currency": "KRW", "pay_id": "c505", "is_buy": false },
            { "des": "get 60 crystals", "price": "$3", "currency": "KRW", "pay_id": "c601", "is_buy": false },
            { "des": "get 60 crystals", "price": "$3", "currency": "KRW", "pay_id": "c401", "is_buy": false },
        ]);
    };
    //-----------------------------------------------JAVA调用区--------------------------------------------------------------    
    //广告结果返回
    //0=false,1=true
    ApkManager.prototype.adResult = function (result) {
        var adResult = parseInt(result);
        if (this.adCallback != null) {
            if (adResult == 0) {
                this.adCallback(false);
                // if(GameData.getInstance().getTotalVideoNum()<=0){
                //     GameData.getInstance().addTotalVideoNum(1);
                //     this.adCallback(true);
                // }else{
                //     this.adCallback(false);
                // }                
            }
            else {
                this.adCallback(true);
                TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.观看任意1次广告);
                TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.观看任意3次广告);
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.获得视频播放奖励玩家数);
                GameData_1.default.getInstance().addTotalVideoNum(1);
            }
            this.adCallback = null;
        }
    };
    ApkManager.prototype.interVideoResult = function (result) {
        var adResult = parseInt(result);
        if (this.interVideoCallback != null) {
            if (adResult == 0)
                this.interVideoCallback(false);
            else {
                this.interVideoCallback(true);
                //FollowManager.getInstance().followEvent(Follow_Type.获得视频播放奖励玩家数);
            }
            this.interVideoCallback = null;
        }
    };
    ApkManager.prototype.addAdLoadedNum = function (num) {
        if (typeof num == "string") {
            num = parseInt(num);
        }
        this.ad_loaded_num += num;
    };
    //-------------------------------------订阅交互--------------------------------------
    ApkManager.prototype.setDingYueInfo = function (infoStr) {
        var dyInfos = new Array();
        for (var i = 0; i < infoStr.length; i++) {
            var info = infoStr[i];
            var dyInfo = new ThirdParty_1.PayInfo();
            dyInfo.price = info.price;
            dyInfo.des = info.des;
            dyInfo.currency = info.currency;
            dyInfo.is_buy = info.is_buy;
            dyInfo.pay_id = info.pay_id;
            dyInfos.push(dyInfo);
        }
        DingYueManager_1.DingYueManager.getInstance().setCardInfo(dyInfos);
        // [SkuDetails: {"productId":"c502","type":"subs","title":"Weekly gift (Idle Hero: Castle Defense)","name":"Weekly gift","description":"Get weekly gift","price":"￦1,400","price_amount_micros":1400000000,"price_currency_code":"KRW","skuDetailsToken":"AEuhp4JH4kUuQfAVd__pCnMLEzPSG5fy1mBnh1JkLfdSup6gMAZuFH_fotknpuxNWWucDhirxDeBqTaBYR3hoEEssBQANOfNRfSo9co9Mg8=","subscriptionPeriod":"P1W","introductoryPriceAmountMicros":100000000,"introductoryPricePeriod":"P1W","introductoryPrice":"￦100","introductoryPriceCycles":1}]
    };
    ApkManager.prototype.setPayInfos = function (infoStr) {
        var dyInfos = new Array();
        for (var i = 0; i < infoStr.length; i++) {
            var info = infoStr[i];
            var dyInfo = new ThirdParty_1.PayInfo();
            dyInfo.price = info.price;
            dyInfo.des = info.des;
            dyInfo.currency = info.currency;
            dyInfo.is_buy = info.is_buy;
            dyInfo.pay_id = info.pay_id;
            dyInfos.push(dyInfo);
        }
        //this.pay_info_callback.info(dyInfos);
        PayManager_1.PayManager.getInstance().setPayInfos(dyInfos);
    };
    //订阅结果返回
    ApkManager.prototype.dyResult = function (result) {
        var adResult = parseInt(result);
        if (this.dy != null) {
            if (adResult == 0)
                this.dy.result(false);
            else {
                this.dy.result(true);
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.订阅成功玩家数);
            }
            this.dy = null;
        }
    };
    ApkManager.prototype.payResult = function (result) {
        UIManager_1.UIManager.getInstance().closePayWaitingUi();
        var payResult = parseInt(result);
        if (this.pay != null) {
            if (payResult == 0)
                this.pay.result(false);
            else {
                this.pay.result(true);
                //FollowManager.getInstance().followEvent(Follow_Type.订阅成功玩家数);
            }
            this.pay = null;
        }
    };
    ApkManager.prototype.notifyPayState = function (payId) {
        var id = parseInt(payId);
        PayManager_1.PayManager.getInstance().getRewardById(id);
    };
    //订阅信息设置
    ApkManager.prototype.dyInfo = function (infoStr) {
        //发过来直接就是JSON格式了
        //console.log('dyInfo:');
        // let infos=JSON.stringify(infoStr);
        // console.log(infos);
        // VipManager.dy_info=new Array();
        // for(let i=0; i<3; i++)
        // {
        //     let info=infoStr[i];
        //     let dyInfo=new DYInfo();
        //     dyInfo.price=info.price;
        //     dyInfo.des=info.des;
        //     dyInfo.currency=info.currency;
        //     VipManager.dy_info.push(dyInfo);
        //     console.log(info.price+'-'+info.currency);
        // }
    };
    //vip设置
    ApkManager.prototype.setVip = function (level) {
        //VipManager.saveVip(level);
    };
    //游戏版本号设置
    ApkManager.prototype.setVersion = function (ver) {
        console.log("setVersion" + ver);
        UserData_1.default.getInstance().saveVersion(ver);
    };
    //-------------------------------------登录--------------------------------------
    //登录结果返回
    ApkManager.prototype.uploadResult = function (userInfo) {
        //console.log(loginInfo);
        this.uploadCallback(userInfo);
        this.uploadCallback = null;
    };
    ApkManager.prototype.setLanguage = function (type) {
        cc.log('setLanguage：' + type);
        LanguageManager_1.default.getInstance().setLanguage(type);
    };
    ApkManager.prototype.showGameExit = function () {
        var _this = this;
        if (GameManager_1.default.getInstance().cur_game_scene != Constants_1.GameScene.load)
            GameManager_1.default.getInstance().showDialog(LanguageManager_1.default.getInstance().getString(LanguageConstants_1.LanguageIndex.Do_you_really_want_to_quit_game), function () {
                GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
                if (GameManager_1.default.getInstance().cur_game_scene == Constants_1.GameScene.game) {
                    _this.followEvent(FollowConstants_1.Follow_Type.退出挑战关卡 + LevelManager_1.LevelManager.getInstance().start_level);
                }
                //结束游戏
                GameData_1.default.getInstance().saveExitTime();
                setTimeout(function () {
                    cc.game.end();
                }, 100);
            }, function () {
                GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
            }, 0);
    };
    //是一个json格式的字符串
    ApkManager.prototype.setABTestPar = function (par) {
        ABTestManager_1.default.getInstance().setABTestPar(par);
    };
    ApkManager.prototype.setPackageInfo = function (info) {
        var json = JSON.parse(info);
        this.package_name = json.package_name;
        this.app_ver = json.app_ver;
        this.app_code = json.app_code;
        this.plmn = json.plmn;
        this.aid = json.aid;
        this.did = json.did;
        console.log(this.package_name, this.app_ver, this.app_code, this.plmn, this.aid, this.did, json.network);
        UserData_1.default.getInstance().HttpPostGetUserId(this.did, json.network);
    };
    var ApkManager_1;
    ApkManager._instance = null;
    ApkManager = ApkManager_1 = __decorate([
        ccclass
    ], ApkManager);
    return ApkManager;
}());
exports.default = ApkManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQWRzXFxBcGtNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQTJEO0FBQzNELG9FQUErRDtBQUMvRCwwQ0FBK0c7QUFDL0csMkNBQWdFO0FBQ2hFLHdDQUFtQztBQUNuQyw4Q0FBeUM7QUFDekMsb0VBQStEO0FBQy9ELHdFQUFtRTtBQUNuRSwwREFBcUQ7QUFDckQseURBQW9EO0FBQ3BELHNEQUFxRDtBQUNyRCx3Q0FBbUM7QUFDbkMsdURBQXdFO0FBQ3hFLG9EQUFtRDtBQUNuRCw0REFBMkQ7QUFDM0QsbURBQThDO0FBQzlDLDZDQUE0QztBQUU1Qyw0REFBOEQ7QUFDOUQsMERBQXNEO0FBQ3RELDZDQUE0QztBQUM1Qyx5Q0FBb0M7QUFFOUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBQTtRQUdZLGVBQVUsR0FBVSxJQUFJLENBQUM7UUFDekIsdUJBQWtCLEdBQVUsSUFBSSxDQUFDO1FBQ2pDLG1CQUFjLEdBQUMsQ0FBQyxDQUFDO1FBQ2pCLE9BQUUsR0FBUyxJQUFJLENBQUM7UUFDaEIsUUFBRyxHQUFLLElBQUksQ0FBQztRQUNiLG1CQUFjLEdBQVUsSUFBSSxDQUFDO1FBQzdCLHFCQUFnQixHQUFTLElBQUksQ0FBQztRQUM5QixzQkFBaUIsR0FBSyxJQUFJLENBQUM7UUFDbkMsTUFBTTtRQUNDLGlCQUFZLEdBQVEsMkJBQTJCLENBQUM7UUFDaEQsWUFBTyxHQUFRLFFBQVEsQ0FBQztRQUN4QixhQUFRLEdBQVEsRUFBRSxDQUFDO1FBQ25CLFlBQU8sR0FBUSxFQUFFLENBQUM7UUFDbEIsZUFBVSxHQUFRLEVBQUUsQ0FBQztRQUNyQixRQUFHLEdBQVEsT0FBTyxDQUFDO1FBQ25CLFNBQUksR0FBUSxLQUFLLENBQUM7UUFDbEIsUUFBRyxHQUFRLEVBQUUsQ0FBQztRQUNkLHFCQUFnQixHQUFVLElBQUksQ0FBQztRQUN0QyxhQUFhO1FBQ04sa0JBQWEsR0FBUSxDQUFDLENBQUM7UUFDdkIsaUJBQVksR0FBUSxDQUFDLENBQUM7SUFrcUJqQyxDQUFDO21CQXpyQm9CLFVBQVU7SUF5QmIsc0JBQVcsR0FBekI7UUFFSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUN2QjtZQUNJLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxZQUFVLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCxTQUFTO0lBQ1QseUJBQUksR0FBSjtRQUNJLEVBQUUsQ0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDO1FBQ1osRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUM1QixrQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzFDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUNSLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDN0Isa0JBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN2QywwQ0FBMEM7WUFDMUMsVUFBVTtZQUNWLGtCQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUMzQyxJQUFHLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxJQUFFLHFCQUFTLENBQUMsSUFBSSxFQUFDO2dCQUN4RCxVQUFVLENBQUM7b0JBQ1AsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFlBQVksQ0FBQyxnQkFBTSxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDdEUsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ1Y7UUFDTCxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDUixpQkFBaUI7UUFDakIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLG9CQUFvQjtRQUNwQixzREFBc0Q7UUFFdEQsY0FBYztJQUNsQixDQUFDO0lBRUQsNEJBQU8sR0FBUDtRQUVJLHFDQUFxQztRQUNyQyxJQUFJLE9BQU8sR0FBQyxDQUFDLENBQUM7UUFDZCxtQ0FBbUM7UUFDbkMscURBQXFEO1FBQ3JELFFBQVE7UUFDUixxQkFBcUI7UUFDckIsWUFBWTtRQUNaLFFBQVE7UUFDUixxQkFBcUI7UUFDckIsUUFBUTtRQUNSLHVCQUF1QjtRQUN2QixRQUFRO1FBQ1IscUJBQXFCO1FBRXJCLFFBQVE7UUFDUix3QkFBd0I7SUFDNUIsQ0FBQztJQUFBLENBQUM7SUFHRixxSEFBcUg7SUFDckgsbUNBQWMsR0FBZDtRQUNJLElBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUU7WUFDaEIsSUFBSSxTQUFTLEdBQUcsb0NBQW9DLENBQUM7WUFDckQsSUFBSSxVQUFVLEdBQUcsZ0JBQWdCLENBQUM7WUFDbEMsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDLENBQUEsNENBQTRDO1lBQ3hFLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQztTQUMzRTtJQUNMLENBQUM7SUFDRCxRQUFRO0lBQ1IsK0JBQVUsR0FBVjtRQUVJLE9BQU87UUFDUCxJQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO1lBQ2hCLElBQUksU0FBUyxHQUFHLG9DQUFvQyxDQUFDO1lBQ3JELElBQUksVUFBVSxHQUFHLFlBQVksQ0FBQztZQUM5QixJQUFJLGVBQWUsR0FBRyxLQUFLLENBQUMsQ0FBQSw0Q0FBNEM7WUFDeEUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1NBQzNFO0lBQ0wsQ0FBQztJQUVELFFBQVE7SUFDUixnQ0FBVyxHQUFYO1FBRUksT0FBTztRQUNQLElBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUU7WUFDaEIsSUFBSSxTQUFTLEdBQUcsb0NBQW9DLENBQUM7WUFDckQsSUFBSSxVQUFVLEdBQUcsYUFBYSxDQUFDO1lBQy9CLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQyxDQUFBLDRDQUE0QztZQUN4RSxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUM7U0FDM0U7SUFDTCxDQUFDO0lBRUQsUUFBUTtJQUNSLHFDQUFnQixHQUFoQixVQUFpQixPQUFjO1FBRTNCLElBQUcsdUJBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBRSxJQUFJLEVBQzlCO1lBQ0ksT0FBTztTQUNWO1FBQ0QsSUFBSSxPQUFPLEdBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNqQyxJQUFJLE9BQU8sR0FBQyxLQUFLLENBQUM7UUFDbEIsSUFBRyxPQUFPLEdBQUMsSUFBSSxDQUFDLGNBQWMsR0FBQyxJQUFJLEdBQUMsRUFBRSxFQUN0QztZQUNJLE9BQU8sR0FBQyxJQUFJLENBQUM7WUFDYixJQUFJLENBQUMsY0FBYyxHQUFDLE9BQU8sQ0FBQztTQUMvQjtRQUNELElBQUcsT0FBTyxJQUFFLEtBQUssRUFDakI7WUFDSSxPQUFPO1NBQ1Y7UUFFRCxJQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO1lBQ2hCLElBQUksU0FBUyxHQUFHLG9DQUFvQyxDQUFDO1lBQ3JELElBQUksVUFBVSxHQUFHLGtCQUFrQixDQUFDO1lBQ3BDLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQyxDQUFBLDRDQUE0QztZQUN4RSxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUM7U0FDM0U7SUFDTCxDQUFDO0lBQ0QsUUFBUTtJQUNSLDhCQUFTLEdBQVQsVUFBVSxRQUE4QixFQUFDLElBQWU7UUFFcEQscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtRQUMzRixPQUFPO1FBQ1AsVUFBVTtRQUNWLElBQUcsK0JBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxNQUFNLElBQUksSUFBSSxJQUFJLGtDQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQywwQkFBVSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxFQUFDO1lBQ3hJLGtDQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQywwQkFBVSxDQUFDLGlCQUFpQixFQUFDLGtDQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQywwQkFBVSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbEosSUFBSSxDQUFDLFVBQVUsR0FBQyxRQUFRLENBQUM7WUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixPQUFPO1NBQ1Y7UUFFRCxJQUFHLG1CQUFPLElBQUUsSUFBSSxFQUNoQjtZQUNJLElBQUksQ0FBQyxVQUFVLEdBQUMsUUFBUSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsT0FBTztTQUNWO1FBQ0QsSUFBRyx1QkFBVSxDQUFDLGFBQWEsRUFBRSxJQUFFLElBQUksRUFDbkM7WUFDSSxZQUFZO1lBQ1osUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2YsT0FBUTtTQUNYO1FBQ0QsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsNkJBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsVUFBVSxHQUFDLFFBQVEsQ0FBQztRQUN6QixJQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO1lBQ2hCLElBQUksU0FBUyxHQUFHLG9DQUFvQyxDQUFDO1lBQ3JELElBQUksVUFBVSxHQUFHLFdBQVcsQ0FBQztZQUM3QixJQUFJLGVBQWUsR0FBRyxNQUFNLENBQUMsQ0FBQSw0Q0FBNEM7WUFDekUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBQyxJQUFJLENBQUMsQ0FBQztTQUNoRjthQUNEO1lBQ0ksSUFBRyxtQkFBTztnQkFDVixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDOztnQkFFakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwQjtJQUNMLENBQUM7SUFFRCxRQUFRO0lBQ1IsbUNBQWMsR0FBZCxVQUFlLFFBQThCLEVBQUMsSUFBcUI7UUFFL0Qsb0JBQW9CO1FBQ3BCLElBQUk7UUFDSixnQ0FBZ0M7UUFDaEMsd0JBQXdCO1FBQ3hCLGNBQWM7UUFDZCxZQUFZO1FBQ1osbUVBQW1FO1FBQ25FLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLHlCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7UUFDM0YsT0FBTztRQUNQLElBQUksQ0FBQyxnQkFBZ0IsR0FBQyxRQUFRLENBQUM7UUFDL0IsSUFBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRTtZQUNoQixJQUFJLFNBQVMsR0FBRyxvQ0FBb0MsQ0FBQztZQUNyRCxJQUFJLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQztZQUNsQyxJQUFJLGVBQWUsR0FBRyxNQUFNLENBQUMsQ0FBQSw0Q0FBNEM7WUFDekUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBQyxJQUFJLENBQUMsQ0FBQztTQUNoRjthQUNEO1lBQ0ksSUFBRyxtQkFBTztnQkFDVixJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQUV6QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBRUQsVUFBVTtJQUNWLCtCQUFVLEdBQVY7UUFFSSxJQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO1lBQ2hCLElBQUksU0FBUyxHQUFHLG9DQUFvQyxDQUFDO1lBQ3JELElBQUksVUFBVSxHQUFHLFlBQVksQ0FBQztZQUM5QixJQUFJLGVBQWUsR0FBRyxLQUFLLENBQUMsQ0FBQSw0Q0FBNEM7WUFDeEUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1NBQzNFO0lBQ0wsQ0FBQztJQUNELElBQUk7SUFDSixnQ0FBVyxHQUFYLFVBQVksU0FBZ0I7UUFFeEIsSUFBRyx3QkFBWSxJQUFFLDRCQUFnQixDQUFDLEdBQUcsRUFDckM7WUFDSSxJQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO2dCQUNoQixJQUFJLFNBQVMsR0FBRyxvQ0FBb0MsQ0FBQztnQkFDckQsSUFBSSxVQUFVLEdBQUcsYUFBYSxDQUFDO2dCQUMvQixJQUFJLGVBQWUsR0FBRyx1QkFBdUIsQ0FBQyxDQUFBLDRDQUE0QztnQkFDMUYsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBQyxTQUFTLENBQUMsQ0FBQzthQUNyRjtTQUNKO0lBQ0wsQ0FBQztJQUNELFFBQVE7SUFDUixnQ0FBVyxHQUFYO1FBRUksSUFBRyx3QkFBWSxJQUFFLDRCQUFnQixDQUFDLEdBQUc7WUFDckMsSUFBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRTtnQkFDaEIsSUFBSSxTQUFTLEdBQUcsb0NBQW9DLENBQUM7Z0JBQ3JELElBQUksVUFBVSxHQUFHLGFBQWEsQ0FBQztnQkFDL0IsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDLENBQUEsNENBQTRDO2dCQUN4RSxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUM7YUFDM0U7aUJBQUk7Z0JBQ0QsSUFBRyxtQkFBTyxFQUFDO2lCQUVWO2FBQ0o7SUFDTCxDQUFDO0lBRUQsaUNBQVksR0FBWjtRQUVJLElBQUcsd0JBQVksSUFBRSw0QkFBZ0IsQ0FBQyxHQUFHO1lBQ3JDLElBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUU7Z0JBQ2hCLElBQUksU0FBUyxHQUFHLG9DQUFvQyxDQUFDO2dCQUNyRCxJQUFJLFVBQVUsR0FBRyxjQUFjLENBQUM7Z0JBQ2hDLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQyxDQUFBLDRDQUE0QztnQkFDeEUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLGVBQWUsQ0FBQyxDQUFDO2FBQzNFO0lBQ0wsQ0FBQztJQUVELGdDQUFXLEdBQVgsVUFBWSxFQUFVLEVBQUMsRUFBUztRQUU1QixJQUFJLENBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQztRQUNYLElBQUcsbUJBQU8sRUFBQztZQUNQLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsdUJBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLE9BQU87U0FDVjtRQUNELElBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUU7WUFDaEIsSUFBSSxTQUFTLEdBQUcsb0NBQW9DLENBQUM7WUFDckQsSUFBSSxVQUFVLEdBQUcsYUFBYSxDQUFDO1lBQy9CLElBQUksZUFBZSxHQUFHLHVCQUF1QixDQUFDLENBQUEsNENBQTRDO1lBQzFGLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUMsRUFBRSxDQUFDLENBQUM7U0FDOUU7YUFBSTtZQUNELElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEI7SUFDTCxDQUFDO0lBRUQsK0JBQVUsR0FBVixVQUFXLFFBQWlCO1FBRXhCLElBQUksQ0FBQyxjQUFjLEdBQUMsUUFBUSxDQUFDO1FBQzdCLElBQUksR0FBRyxHQUFDLGtCQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDM0MsSUFBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRTtZQUNoQixJQUFJLFNBQVMsR0FBRyxvQ0FBb0MsQ0FBQztZQUNyRCxJQUFJLFVBQVUsR0FBRyxZQUFZLENBQUM7WUFDOUIsSUFBSSxlQUFlLEdBQUcsdUJBQXVCLENBQUMsQ0FBQSw0Q0FBNEM7WUFDMUYsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBQyxHQUFHLENBQUMsQ0FBQztTQUMvRTtJQUNMLENBQUM7SUFFRCw0QkFBTyxHQUFQLFVBQVEsR0FBTyxFQUFDLElBQVc7UUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBQyxHQUFHLENBQUM7UUFDYixJQUFHLG1CQUFPLEVBQUM7WUFDUCxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLE9BQU87U0FDVjtRQUNELHFCQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUMzQyxJQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO1lBQ2hCLElBQUksU0FBUyxHQUFHLG9DQUFvQyxDQUFDO1lBQ3JELElBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQztZQUMzQixJQUFJLGVBQWUsR0FBRyx1QkFBdUIsQ0FBQyxDQUFBLDRDQUE0QztZQUMxRixHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hGO2FBQUk7WUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQztJQUVELHFIQUFxSDtJQUVySCxvQ0FBZSxHQUFmLFVBQWdCLFFBQWlCO1FBRTdCLElBQUksQ0FBQyxjQUFjLEdBQUMsUUFBUSxDQUFDO1FBQzdCLElBQUksUUFBUSxHQUFDLDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDO1FBQ3JELElBQUksVUFBVSxHQUFDLGtCQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdkMsSUFBSSxJQUFJLEdBQUMsa0JBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QyxJQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUNsQjtZQUNJLElBQUksU0FBUyxHQUFHLG9DQUFvQyxDQUFDO1lBQ3JELElBQUksVUFBVSxHQUFHLGlCQUFpQixDQUFDO1lBQ25DLElBQUksZUFBZSxHQUFHLHlCQUF5QixDQUFDLENBQUEsNENBQTRDO1lBQzVGLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsQ0FBQztTQUNwRzthQUNEO1lBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUMsR0FBRyxFQUFDLGtCQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsQ0FBQztTQUN2RjtJQUNMLENBQUM7SUFFRCxxQ0FBZ0IsR0FBaEI7UUFFSSxJQUFJLFFBQVEsR0FBQywyQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQztRQUNyRCxJQUFJLFVBQVUsR0FBQyxrQkFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3ZDLElBQUksR0FBRyxHQUFDLGtCQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDM0MsSUFBRyxHQUFHLElBQUUsRUFBRTtZQUNWLE9BQU87UUFDUCxJQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUNsQjtZQUNJLElBQUksU0FBUyxHQUFHLG9DQUFvQyxDQUFDO1lBQ3JELElBQUksVUFBVSxHQUFHLGtCQUFrQixDQUFDO1lBQ3BDLElBQUksZUFBZSxHQUFHLHlCQUF5QixDQUFDLENBQUEsNENBQTRDO1lBQzVGLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxHQUFHLENBQUMsQ0FBQztTQUNuRztJQUNMLENBQUM7SUFFRCwrQkFBVSxHQUFWLFVBQVcsUUFBaUI7UUFFeEIsSUFBSSxDQUFDLGNBQWMsR0FBQyxRQUFRLENBQUM7UUFDN0IsSUFBSSxRQUFRLEdBQUMsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUM7UUFDckQsSUFBSSxVQUFVLEdBQUMsa0JBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN2QyxJQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO1lBQ2hCLElBQUksU0FBUyxHQUFHLG9DQUFvQyxDQUFDO1lBQ3JELElBQUksVUFBVSxHQUFHLFlBQVksQ0FBQztZQUM5QixJQUFJLGVBQWUsR0FBRyxPQUFPLENBQUMsQ0FBQSw0Q0FBNEM7WUFDMUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBQyxRQUFRLEVBQUMsVUFBVSxDQUFDLENBQUM7U0FDL0Y7SUFDTCxDQUFDO0lBRUQsbUNBQWMsR0FBZCxVQUFlLFFBQWlCO1FBRTVCLElBQUksQ0FBQyxjQUFjLEdBQUMsUUFBUSxDQUFDO1FBQzdCLElBQUksUUFBUSxHQUFDLDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDO1FBQ3JELElBQUksVUFBVSxHQUFDLGtCQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdkMsSUFBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRTtZQUNoQixJQUFJLFNBQVMsR0FBRyxvQ0FBb0MsQ0FBQztZQUNyRCxJQUFJLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQztZQUNsQyxJQUFJLGVBQWUsR0FBRyxPQUFPLENBQUMsQ0FBQSw0Q0FBNEM7WUFDMUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBQyxRQUFRLEVBQUMsVUFBVSxDQUFDLENBQUM7U0FDL0Y7SUFDTCxDQUFDO0lBRUQsMkJBQU0sR0FBTjtRQUVJLElBQUcsd0JBQVksSUFBRSw0QkFBZ0IsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQ3hEO1lBQ0ksSUFBSSxHQUFHLEdBQUMsa0JBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUMzQyxJQUFJLFNBQVMsR0FBRyxvQ0FBb0MsQ0FBQztZQUNyRCxJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUM7WUFDMUIsSUFBSSxlQUFlLEdBQUcsdUJBQXVCLENBQUMsQ0FBQSw0Q0FBNEM7WUFDMUYsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBQyxHQUFHLENBQUMsQ0FBQztTQUMvRTtJQUNMLENBQUM7SUFFRCx1Q0FBa0IsR0FBbEI7UUFFSSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksU0FBUyxHQUFHLG9DQUFvQyxDQUFDO1lBQ3JELElBQUksVUFBVSxHQUFHLG9CQUFvQixDQUFDO1lBQ3RDLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQyxDQUFBLDRDQUE0QztZQUN4RSxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUM7U0FDM0U7SUFDTCxDQUFDO0lBRUQsaUNBQVksR0FBWjtRQUVJLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxTQUFTLEdBQUcsb0NBQW9DLENBQUM7WUFDckQsSUFBSSxVQUFVLEdBQUcsY0FBYyxDQUFDO1lBQ2hDLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQyxDQUFBLDRDQUE0QztZQUN4RSxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUM7U0FDM0U7SUFDTCxDQUFDO0lBQ0Q7OztPQUdHO0lBQ0gsOEJBQVMsR0FBVCxVQUFVLEVBQVM7UUFFZixJQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO1lBQ2hCLElBQUksU0FBUyxHQUFHLG9DQUFvQyxDQUFDO1lBQ3JELElBQUksVUFBVSxHQUFHLFdBQVcsQ0FBQztZQUM3QixJQUFJLGVBQWUsR0FBRyxNQUFNLENBQUMsQ0FBQSw0Q0FBNEM7WUFDekUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBQyxFQUFFLENBQUMsQ0FBQztTQUM5RTtJQUNMLENBQUM7SUFHRCxtQ0FBYyxHQUFkLFVBQWUsTUFBYztRQUN6QixJQUFJLENBQUMsZ0JBQWdCLEdBQUMsTUFBTSxDQUFDO1FBQzdCLElBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUU7WUFDaEIsSUFBSSxTQUFTLEdBQUcsb0NBQW9DLENBQUM7WUFDckQsSUFBSSxVQUFVLEdBQUcsZ0JBQWdCLENBQUM7WUFDbEMsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDLENBQUEsNENBQTRDO1lBQ3hFLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQztTQUMzRTtJQUNMLENBQUM7SUFDRCxxQkFBcUI7SUFDckIsZ0NBQVcsR0FBWCxVQUFZLE9BQVc7UUFDbkIsSUFBSSxDQUFDLGlCQUFpQixHQUFDLE9BQU8sQ0FBQztRQUMvQixJQUFHLG1CQUFPLEVBQUM7WUFDUCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdEIsT0FBTztTQUNWO1FBQ0QsSUFBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRTtZQUNoQixJQUFJLFNBQVMsR0FBRyxvQ0FBb0MsQ0FBQztZQUNyRCxJQUFJLFVBQVUsR0FBRyxhQUFhLENBQUM7WUFDL0IsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDLENBQUEsNENBQTRDO1lBQ3hFLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQztTQUMzRTthQUFJO1lBQ0QsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3pCO0lBQ0wsQ0FBQztJQUVELGNBQWM7SUFDZCw2QkFBUSxHQUFSO1FBQ0ksSUFBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRTtZQUNoQixJQUFJLFNBQVMsR0FBRyxvQ0FBb0MsQ0FBQztZQUNyRCxJQUFJLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDNUIsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDLENBQUEsNENBQTRDO1lBQ3hFLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQztTQUMzRTtJQUNMLENBQUM7SUFFRCxtQ0FBYyxHQUFkLFVBQWUsUUFBaUI7UUFDNUIsSUFBSSxDQUFDLGdCQUFnQixHQUFDLFFBQVEsQ0FBQztRQUMvQixJQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO1lBQ2hCLElBQUksU0FBUyxHQUFHLG9DQUFvQyxDQUFDO1lBQ3JELElBQUksVUFBVSxHQUFHLGdCQUFnQixDQUFDO1lBQ2xDLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQyxDQUFBLDRDQUE0QztZQUN4RSxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUM7U0FDM0U7SUFDTCxDQUFDO0lBRU8sbUNBQWMsR0FBdEI7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRTtZQUNySCxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFO1lBQ3JHLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7WUFDbkcsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRTtZQUN0RyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFO1lBQ25HLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7WUFDbkcsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRTtZQUNuRyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFO1lBQ25HLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7WUFDbkcsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRTtZQUNuRyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFO1lBQ25HLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7WUFDbkcsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRTtZQUNuRyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFO1lBQ25HLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7WUFDbkcsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFF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QUFRLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM1QixJQUFJLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUMsSUFBSSxDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuRyxrQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3BFLENBQUM7O0lBdHJCYyxvQkFBUyxHQUFlLElBQUksQ0FBQztJQUYzQixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBeXJCOUI7SUFBRCxpQkFBQztDQXpyQkQsQUF5ckJDLElBQUE7a0JBenJCb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd01hbmFnZXJcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IHtDVVJfUGxhdGZvcm0sIEdhbWVTY2VuZSwgSU5URVJfVklERU9fVFlQRSwgSXNEZWJ1ZywgUmVsZWFzZV9QbGF0Zm9ybSwgVklERU9fVFlQRSB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgRGluZ1l1ZV9UeXBlLCBEWUluZm8sIFZpcE1hbmFnZXIgfSBmcm9tIFwiLi9WaXBNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lRGF0YSBmcm9tIFwiLi4vR2FtZURhdGFcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBMYW5ndWFnZUluZGV4IH0gZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VDb25zdGFudHNcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgQUJUZXN0TWFuYWdlciBmcm9tIFwiLi4vQUJUZXN0L0FCVGVzdE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uL0xldmVsL0xldmVsTWFuYWdlclwiO1xyXG5pbXBvcnQgVXNlckRhdGEgZnJvbSBcIi4uL1VzZXJEYXRhXCI7XHJcbmltcG9ydCB7IERpbmdZdWUsIFBheSwgUGF5SW5mbywgUGF5SWQgfSBmcm9tIFwiLi4vdGhpcmRQYXJ0eS9UaGlyZFBhcnR5XCI7XHJcbmltcG9ydCB7IFBheU1hbmFnZXIgfSBmcm9tIFwiLi4vUGF5bWVudC9QYXlNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IERpbmdZdWVNYW5hZ2VyIH0gZnJvbSBcIi4uL1BheW1lbnQvRGluZ1l1ZU1hbmFnZXJcIjtcclxuaW1wb3J0IFRhc2tNYW5hZ2VyIGZyb20gXCIuLi9UYXNrL1Rhc2tNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFRhc2tJdGVtIH0gZnJvbSBcIi4uL1Rhc2svVGFza0VudW1cIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBUaGVTdG9yYWdlTWFuYWdlciB9IGZyb20gXCIuLi9TdG9yYWdlL1N0b3JhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2VLZXkgfSBmcm9tIFwiLi4vU3RvcmFnZS9TdG9yYWdlQ29uZmlnXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi9VSS9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IFRhc2tVaSBmcm9tIFwiLi4vVGFzay9UYXNrVWlcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBrTWFuYWdlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBBcGtNYW5hZ2VyID0gbnVsbDtcclxuICAgIHByaXZhdGUgYWRDYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpbnRlclZpZGVvQ2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIHByaXZhdGUgcGVydl9pbnN0X3RpbWU9MDtcclxuICAgIHByaXZhdGUgZHk6RGluZ1l1ZT1udWxsO1xyXG4gICAgcHJpdmF0ZSBwYXk6UGF5PW51bGw7XHJcbiAgICBwcml2YXRlIHVwbG9hZENhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcbiAgICBwcml2YXRlIGR5X2luZm9fY2FsbGJhY2s6RGluZ1l1ZT1udWxsO1xyXG4gICAgcHJpdmF0ZSBwYXlfaW5mb19jYWxsYmFjazpQYXk9bnVsbDtcclxuICAgIC8v5YyF5L2T5L+h5oGvXHJcbiAgICBwdWJsaWMgcGFja2FnZV9uYW1lOnN0cmluZz0nY29tLklkbGVIZXJvQ2FzdGxlRGVmZW5zZSc7XHJcbiAgICBwdWJsaWMgYXBwX3ZlcjpzdHJpbmc9JzEuMC4xMic7XHJcbiAgICBwdWJsaWMgYXBwX2NvZGU6bnVtYmVyPTEyO1xyXG4gICAgcHVibGljIHN5c192ZXI6bnVtYmVyPTMxO1xyXG4gICAgcHVibGljIGFuZHJvaWRfaWQ6c3RyaW5nPScnO1xyXG4gICAgcHVibGljIGFpZDpzdHJpbmc9XCJ4eHh4eFwiO1xyXG4gICAgcHVibGljIHBsbW46bnVtYmVyPTQxNDAxO1xyXG4gICAgcHVibGljIGRpZDpzdHJpbmc9XCJcIjtcclxuICAgIHB1YmxpYyBwYWNrYWdlX2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcbiAgICAvL+W5v+WRiuWKoOi9veWujOaIkOeahOexu+Wei+aVsOmHj1xyXG4gICAgcHVibGljIGFkX2xvYWRlZF9udW06bnVtYmVyPTA7XHJcbiAgICBwdWJsaWMgbWF4X2xvYWRfbnVtOm51bWJlcj0yO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpBcGtNYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgQXBrTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgaW5pdCAoKSB7XHJcbiAgICAgICAgY2MuQVBLPXRoaXM7XHJcbiAgICAgICAgY2MuZ2FtZS5vbihjYy5nYW1lLkVWRU5UX0hJREUsICgpPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5ri45oiP6L+b5YWl5ZCO5Y+wLOS4iuS8oOaAu+aXtumVv1wiKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgR2FtZURhdGEuZ2V0SW5zdGFuY2UoKS5zYXZlRXhpdFRpbWUoKTsgICAgICAgICAgICBcclxuICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgIGNjLmdhbWUub24oY2MuZ2FtZS5FVkVOVF9TSE9XLCAoKT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIua4uOaIj+i/m+WFpeWJjeWPsCzkv53lrZjkuIDkuKrml7bpl7RcIik7XHJcbiAgICAgICAgICAgIEdhbWVEYXRhLmdldEluc3RhbmNlKCkuc2F2ZUxvZ2luVGltZSgpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBHYW1lRGF0YS5nZXRJbnN0YW5jZSgpLmNoZWNrSXNOZXdEYXkoKTtcclxuICAgICAgICAgICAgLy8g5ouJ5Y+W5pyN5Yqh5Zmo5pe26Ze0XHJcbiAgICAgICAgICAgIEdhbWVEYXRhLmdldEluc3RhbmNlKCkucmVmcmVzaFNlcnZlclRpbWUoKTtcclxuICAgICAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zY2VuZT09R2FtZVNjZW5lLmhvbWUpe1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJDYW52YXMvdGFza191aVwiKS5nZXRDb21wb25lbnQoVGFza1VpKS5yZWZyZXNoRGFpbHlUYXNrKCk7XHJcbiAgICAgICAgICAgICAgICB9LDUwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgIC8vdGhpcy5pbml0QWRzKCk7XHJcbiAgICAgICAgdGhpcy5vbkpTSW5pdEZpbmlzaCgpO1xyXG4gICAgICAgIC8vIHNldEludGVydmFsKCgpPT57XHJcbiAgICAgICAgLy8gICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUFsbFByb3BOdW0odHJ1ZSk7XHJcblxyXG4gICAgICAgIC8vIH0sNjAqMTAwMCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGluaXRBZHMoKVxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgLy/lvIDlkK/kuIDkuKrorqHml7blmajvvIzlpoLmnpwgIOa/gOWKseinhumikTLliIbpkp/lhoXpg73mmK/mnKrliqDovb3vvIzliJnkuLvliqjlj5HotbfkuIDmrKHliqDovb1cclxuICAgICAgICBsZXQgYWROb051bT0wO1xyXG4gICAgICAgIC8vIGxldCBzZXRJbnRlciA9IHNldEludGVydmFsKCgpPT57XHJcbiAgICAgICAgLy8gICAgIGlmKHRoaXMuYWRfdmlkZW9fbG9hZF9zdGF0ZT09QURfTE9BRF9TVEFURS5OTylcclxuICAgICAgICAvLyAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgYWROb051bSsrO1xyXG4gICAgICAgIC8vICAgICB9ZWxzZVxyXG4gICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICBhZE5vTnVtPTA7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgaWYoYWROb051bT49MTIwKVxyXG4gICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICBhZE5vTnVtPTA7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH0sIDEwMDApOyAvLzEwMDDmr6vnp5LkuLox56eSXHJcbiAgICB9O1xyXG5cclxuICAgIFxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeiwg+eUqEpBVkEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgb25KU0luaXRGaW5pc2goKXtcclxuICAgICAgICBpZihjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgbGV0IGNsYXNzTmFtZSA9IFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBrTWFuYWdlclwiO1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kTmFtZSA9IFwib25KU0luaXRGaW5pc2hcIjtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZFNpZ25hdHVyZSA9IFwiKClWXCI7Ly/lpoLmnpzmmK9zdHJpbmfvvJpMamF2YS9sYW5nL1N0cmluZzssIGJvb2w6WixpbnQ6SVxyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKGNsYXNzTmFtZSwgbWV0aG9kTmFtZSwgbWV0aG9kU2lnbmF0dXJlKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WxleekuuaPkuWxj+W5v+WRilxyXG4gICAgc2hvd0Jhbm5lcigpXHJcbiAgICB7ICAgICAgICBcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgIGxldCBjbGFzc05hbWUgPSBcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0Fwa01hbmFnZXJcIjtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZE5hbWUgPSBcInNob3dCYW5uZXJcIjtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZFNpZ25hdHVyZSA9IFwiKClWXCI7Ly/lpoLmnpzmmK9zdHJpbmfvvJpMamF2YS9sYW5nL1N0cmluZzssIGJvb2w6WixpbnQ6SVxyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKGNsYXNzTmFtZSwgbWV0aG9kTmFtZSwgbWV0aG9kU2lnbmF0dXJlKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/lsZXnpLrmj5LlsY/lub/lkYpcclxuICAgIGNsb3NlQmFubmVyKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgIGxldCBjbGFzc05hbWUgPSBcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0Fwa01hbmFnZXJcIjtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZE5hbWUgPSBcImNsb3NlQmFubmVyXCI7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2RTaWduYXR1cmUgPSBcIigpVlwiOy8v5aaC5p6c5pivc3RyaW5n77yaTGphdmEvbGFuZy9TdHJpbmc7LCBib29sOlosaW50OklcclxuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChjbGFzc05hbWUsIG1ldGhvZE5hbWUsIG1ldGhvZFNpZ25hdHVyZSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5bGV56S65o+S5bGP5bm/5ZGKXHJcbiAgICBzaG93SW50ZXJzdGl0aWFsKG1lc3NhZ2U6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIGlmKFZpcE1hbmFnZXIuZ2V0SXNWaXAoKT09dHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGN1clRpbWU9bmV3IERhdGUoKS5nZXRUaW1lKCk7IFxyXG4gICAgICAgIGxldCBpc0NhbkFkPWZhbHNlO1xyXG4gICAgICAgIGlmKGN1clRpbWUtdGhpcy5wZXJ2X2luc3RfdGltZT4xMDAwKjEwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaXNDYW5BZD10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnBlcnZfaW5zdF90aW1lPWN1clRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGlzQ2FuQWQ9PWZhbHNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZihjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgbGV0IGNsYXNzTmFtZSA9IFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBrTWFuYWdlclwiO1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kTmFtZSA9IFwic2hvd0ludGVyc3RpdGlhbFwiO1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kU2lnbmF0dXJlID0gXCIoKVZcIjsvL+WmguaenOaYr3N0cmluZ++8mkxqYXZhL2xhbmcvU3RyaW5nOywgYm9vbDpaLGludDpJXHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoY2xhc3NOYW1lLCBtZXRob2ROYW1lLCBtZXRob2RTaWduYXR1cmUpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5bGV56S66KeG6aKR5bm/5ZGKXHJcbiAgICBzaG93VmlkZW8oY2FsbGJhY2s6KGlzU3VjOmJvb2xlYW4pPT52b2lkLHR5cGU6VklERU9fVFlQRSlcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDExMykpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIOWRqOWNoeWFjeinhumikeeJueadg1xyXG4gICAgICAgIGlmKERpbmdZdWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0V2Vla0luZm8oKS5pc19idXkgPT0gdHJ1ZSAmJiBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LldlZWtDYXJkRnJlZUFkTnVtKSA+IDApe1xyXG4gICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5XZWVrQ2FyZEZyZWVBZE51bSxUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LldlZWtDYXJkRnJlZUFkTnVtKSAtIDEpO1xyXG4gICAgICAgICAgICB0aGlzLmFkQ2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICAgICAgICAgIHRoaXMuYWRSZXN1bHQoMSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKElzRGVidWc9PXRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFkQ2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICAgICAgICAgIHRoaXMuYWRSZXN1bHQoMSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoVmlwTWFuYWdlci5zdWJWaXBGcmVlTnVtKCk9PXRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+aYr+WQpuimgVZJUOaPkOekuiAgXHJcbiAgICAgICAgICAgIGNhbGxiYWNrKHRydWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu54K55Ye76KeG6aKR5pKt5pS+5aWW5Yqx546p5a625pWwKTtcclxuICAgICAgICB0aGlzLmFkQ2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICAgICAgaWYoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgIGxldCBjbGFzc05hbWUgPSBcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0Fwa01hbmFnZXJcIjtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZE5hbWUgPSBcInNob3dWaWRlb1wiO1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kU2lnbmF0dXJlID0gXCIoSSlWXCI7Ly/lpoLmnpzmmK9zdHJpbmfvvJpMamF2YS9sYW5nL1N0cmluZzssIGJvb2w6WixpbnQ6SVxyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKGNsYXNzTmFtZSwgbWV0aG9kTmFtZSwgbWV0aG9kU2lnbmF0dXJlLHR5cGUpO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihJc0RlYnVnKVxyXG4gICAgICAgICAgICB0aGlzLmFkUmVzdWx0KDEpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuYWRSZXN1bHQoMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5bGV56S66KeG6aKR5bm/5ZGKXHJcbiAgICBzaG93SW50ZXJWaWRlbyhjYWxsYmFjazooaXNTdWM6Ym9vbGVhbik9PnZvaWQsdHlwZTpJTlRFUl9WSURFT19UWVBFKVxyXG4gICAge1xyXG4gICAgICAgIC8vIGlmKElzRGVidWc9PXRydWUpXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICB0aGlzLmFkQ2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuYWRSZXN1bHQoMSk7XHJcbiAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAvLyB9ICAgICAgICBcclxuICAgICAgICAvL0ZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ngrnlh7vop4bpopHmkq3mlL7lpZblirHnjqnlrrbmlbApO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMTEzKSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5pbnRlclZpZGVvUmVzdWx0PWNhbGxiYWNrO1xyXG4gICAgICAgIGlmKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lID0gXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BcGtNYW5hZ2VyXCI7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2ROYW1lID0gXCJzaG93SW50ZXJWaWRlb1wiO1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kU2lnbmF0dXJlID0gXCIoSSlWXCI7Ly/lpoLmnpzmmK9zdHJpbmfvvJpMamF2YS9sYW5nL1N0cmluZzssIGJvb2w6WixpbnQ6SVxyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKGNsYXNzTmFtZSwgbWV0aG9kTmFtZSwgbWV0aG9kU2lnbmF0dXJlLHR5cGUpO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihJc0RlYnVnKVxyXG4gICAgICAgICAgICB0aGlzLmludGVyVmlkZW9SZXN1bHQoMSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5pbnRlclZpZGVvUmVzdWx0KDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+aYvuekuuiBlOezu+aIkeS7rOmTvuaOpVxyXG4gICAgc2hvd0NhbGxNZSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgIGxldCBjbGFzc05hbWUgPSBcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0Fwa01hbmFnZXJcIjtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZE5hbWUgPSBcInNob3dDYWxsTWVcIjtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZFNpZ25hdHVyZSA9IFwiKClWXCI7Ly/lpoLmnpzmmK9zdHJpbmfvvJpMamF2YS9sYW5nL1N0cmluZzssIGJvb2w6WixpbnQ6SVxyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKGNsYXNzTmFtZSwgbWV0aG9kTmFtZSwgbWV0aG9kU2lnbmF0dXJlKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+Wfi+eCuVxyXG4gICAgZm9sbG93RXZlbnQoZXZlbnROYW1lOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBpZihDVVJfUGxhdGZvcm09PVJlbGVhc2VfUGxhdGZvcm0uQVBLKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2xhc3NOYW1lID0gXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BcGtNYW5hZ2VyXCI7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWV0aG9kTmFtZSA9IFwiZm9sbG93RXZlbnRcIjtcclxuICAgICAgICAgICAgICAgIGxldCBtZXRob2RTaWduYXR1cmUgPSBcIihMamF2YS9sYW5nL1N0cmluZzspVlwiOy8v5aaC5p6c5pivc3RyaW5n77yaTGphdmEvbGFuZy9TdHJpbmc7LCBib29sOlosaW50OklcclxuICAgICAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoY2xhc3NOYW1lLCBtZXRob2ROYW1lLCBtZXRob2RTaWduYXR1cmUsZXZlbnROYW1lKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuICAgIC8v5qOA5rWL6K6i6ZiF5L+h5oGvXHJcbiAgICBjaGVha0RZSW5mbygpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoQ1VSX1BsYXRmb3JtPT1SZWxlYXNlX1BsYXRmb3JtLkFQSylcclxuICAgICAgICBpZihjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgbGV0IGNsYXNzTmFtZSA9IFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBrTWFuYWdlclwiO1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kTmFtZSA9IFwiY2hlYWtEWUluZm9cIjtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZFNpZ25hdHVyZSA9IFwiKClWXCI7Ly/lpoLmnpzmmK9zdHJpbmfvvJpMamF2YS9sYW5nL1N0cmluZzssIGJvb2w6WixpbnQ6SVxyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKGNsYXNzTmFtZSwgbWV0aG9kTmFtZSwgbWV0aG9kU2lnbmF0dXJlKTsgICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYoSXNEZWJ1Zyl7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93VGlhb0t1YW4oKVxyXG4gICAge1xyXG4gICAgICAgIGlmKENVUl9QbGF0Zm9ybT09UmVsZWFzZV9QbGF0Zm9ybS5BUEspXHJcbiAgICAgICAgaWYoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgIGxldCBjbGFzc05hbWUgPSBcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0Fwa01hbmFnZXJcIjtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZE5hbWUgPSBcInNob3dUaWFvS3VhblwiO1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kU2lnbmF0dXJlID0gXCIoKVZcIjsvL+WmguaenOaYr3N0cmluZ++8mkxqYXZhL2xhbmcvU3RyaW5nOywgYm9vbDpaLGludDpJXHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoY2xhc3NOYW1lLCBtZXRob2ROYW1lLCBtZXRob2RTaWduYXR1cmUpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgc2hvd0RpbmdZdWUoZHk6RGluZ1l1ZSxpZDpzdHJpbmcpXHJcbiAgICB7ICAgICAgICBcclxuICAgICAgICB0aGlzLmR5PWR5O1xyXG4gICAgICAgIGlmKElzRGVidWcpe1xyXG4gICAgICAgICAgICB0aGlzLmR5UmVzdWx0KDEpO1xyXG4gICAgICAgICAgICBQYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVBheU51bShpZCwxKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgbGV0IGNsYXNzTmFtZSA9IFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBrTWFuYWdlclwiO1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kTmFtZSA9IFwic2hvd0RpbmdZdWVcIjtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZFNpZ25hdHVyZSA9IFwiKExqYXZhL2xhbmcvU3RyaW5nOylWXCI7Ly/lpoLmnpzmmK9zdHJpbmfvvJpMamF2YS9sYW5nL1N0cmluZzssIGJvb2w6WixpbnQ6SVxyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKGNsYXNzTmFtZSwgbWV0aG9kTmFtZSwgbWV0aG9kU2lnbmF0dXJlLGlkKTsgICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5keVJlc3VsdCgxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VmlwSW5mbyhjYWxsYmFjazpGdW5jdGlvbilcclxuICAgIHtcclxuICAgICAgICB0aGlzLnVwbG9hZENhbGxiYWNrPWNhbGxiYWNrO1xyXG4gICAgICAgIGxldCB1aWQ9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VySUQoKTtcclxuICAgICAgICBpZihjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgbGV0IGNsYXNzTmFtZSA9IFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBrTWFuYWdlclwiO1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kTmFtZSA9IFwiZ2V0VmlwSW5mb1wiO1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kU2lnbmF0dXJlID0gXCIoTGphdmEvbGFuZy9TdHJpbmc7KVZcIjsvL+WmguaenOaYr3N0cmluZ++8mkxqYXZhL2xhbmcvU3RyaW5nOywgYm9vbDpaLGludDpJXHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoY2xhc3NOYW1lLCBtZXRob2ROYW1lLCBtZXRob2RTaWduYXR1cmUsdWlkKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1BheShwYXk6UGF5LHR5cGU6c3RyaW5nKXtcclxuICAgICAgICB0aGlzLnBheT1wYXk7XHJcbiAgICAgICAgaWYoSXNEZWJ1Zyl7XHJcbiAgICAgICAgICAgIHRoaXMucGF5UmVzdWx0KDEpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dQYXlXYWl0aW5nVWkoKTtcclxuICAgICAgICBpZihjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgbGV0IGNsYXNzTmFtZSA9IFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBrTWFuYWdlclwiO1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kTmFtZSA9IFwic2hvd1BheVwiO1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kU2lnbmF0dXJlID0gXCIoTGphdmEvbGFuZy9TdHJpbmc7KVZcIjsvL+WmguaenOaYr3N0cmluZ++8mkxqYXZhL2xhbmcvU3RyaW5nOywgYm9vbDpaLGludDpJXHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoY2xhc3NOYW1lLCBtZXRob2ROYW1lLCBtZXRob2RTaWduYXR1cmUsdHlwZSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMucGF5UmVzdWx0KDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3nmbvlvZXkuqTkupItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIHVwbG9hZEFuZEdldFVpZChjYWxsYmFjazpGdW5jdGlvbilcclxuICAgIHtcclxuICAgICAgICB0aGlzLnVwbG9hZENhbGxiYWNrPWNhbGxiYWNrO1xyXG4gICAgICAgIGxldCBtYXhMZXZlbD1MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWw7XHJcbiAgICAgICAgbGV0IG9ubGluZVRpbWU9R2FtZURhdGEuZ2V0VG90YWxUaW1lKCk7XHJcbiAgICAgICAgbGV0IG5hbWU9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VyTmFtZSgpO1xyXG4gICAgICAgIGlmKGNjLnN5cy5pc05hdGl2ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBjbGFzc05hbWUgPSBcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0Fwa01hbmFnZXJcIjtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZE5hbWUgPSBcInVwbG9hZEFuZEdldFVpZFwiO1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kU2lnbmF0dXJlID0gXCIoSUlMamF2YS9sYW5nL1N0cmluZzspVlwiOy8v5aaC5p6c5pivc3RyaW5n77yaTGphdmEvbGFuZy9TdHJpbmc7LCBib29sOlosaW50OklcclxuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChjbGFzc05hbWUsIG1ldGhvZE5hbWUsIG1ldGhvZFNpZ25hdHVyZSxtYXhMZXZlbCxvbmxpbmVUaW1lLG5hbWUpO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnVwbG9hZFJlc3VsdChKU09OLnN0cmluZ2lmeSh7dWlkOlVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCksdmlwOicwJ30pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBsb2FkT25saW5lVGltZSgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG1heExldmVsPUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbDtcclxuICAgICAgICBsZXQgb25saW5lVGltZT1HYW1lRGF0YS5nZXRUb3RhbFRpbWUoKTtcclxuICAgICAgICBsZXQgdWlkPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICAgICAgaWYodWlkPT0nJylcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYoY2Muc3lzLmlzTmF0aXZlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGNsYXNzTmFtZSA9IFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBrTWFuYWdlclwiO1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kTmFtZSA9IFwidXBsb2FkT25saW5lVGltZVwiO1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kU2lnbmF0dXJlID0gXCIoSUlMamF2YS9sYW5nL1N0cmluZzspVlwiOy8v5aaC5p6c5pivc3RyaW5n77yaTGphdmEvbGFuZy9TdHJpbmc7LCBib29sOlosaW50OklcclxuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChjbGFzc05hbWUsIG1ldGhvZE5hbWUsIG1ldGhvZFNpZ25hdHVyZSxtYXhMZXZlbCxvbmxpbmVUaW1lLHVpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxvZ2luRm9yRkIoY2FsbGJhY2s6RnVuY3Rpb24pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy51cGxvYWRDYWxsYmFjaz1jYWxsYmFjaztcclxuICAgICAgICBsZXQgbWF4TGV2ZWw9TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsO1xyXG4gICAgICAgIGxldCBvbmxpbmVUaW1lPUdhbWVEYXRhLmdldFRvdGFsVGltZSgpO1xyXG4gICAgICAgIGlmKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lID0gXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BcGtNYW5hZ2VyXCI7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2ROYW1lID0gXCJsb2dpbkZvckZCXCI7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2RTaWduYXR1cmUgPSBcIihJSSlWXCI7Ly/lpoLmnpzmmK9zdHJpbmfvvJpMamF2YS9sYW5nL1N0cmluZzssIGJvb2w6WixpbnQ6SVxyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKGNsYXNzTmFtZSwgbWV0aG9kTmFtZSwgbWV0aG9kU2lnbmF0dXJlLG1heExldmVsLG9ubGluZVRpbWUpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsb2dpbkZvckdvb2dsZShjYWxsYmFjazpGdW5jdGlvbilcclxuICAgIHtcclxuICAgICAgICB0aGlzLnVwbG9hZENhbGxiYWNrPWNhbGxiYWNrO1xyXG4gICAgICAgIGxldCBtYXhMZXZlbD1MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWw7XHJcbiAgICAgICAgbGV0IG9ubGluZVRpbWU9R2FtZURhdGEuZ2V0VG90YWxUaW1lKCk7XHJcbiAgICAgICAgaWYoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgIGxldCBjbGFzc05hbWUgPSBcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0Fwa01hbmFnZXJcIjtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZE5hbWUgPSBcImxvZ2luRm9yR29vZ2xlXCI7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2RTaWduYXR1cmUgPSBcIihJSSlWXCI7Ly/lpoLmnpzmmK9zdHJpbmfvvJpMamF2YS9sYW5nL1N0cmluZzssIGJvb2w6WixpbnQ6SVxyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKGNsYXNzTmFtZSwgbWV0aG9kTmFtZSwgbWV0aG9kU2lnbmF0dXJlLG1heExldmVsLG9ubGluZVRpbWUpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRVaWQoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKENVUl9QbGF0Zm9ybT09UmVsZWFzZV9QbGF0Zm9ybS5BUEsgJiYgY2Muc3lzLmlzTmF0aXZlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IHVpZD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpO1xyXG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lID0gXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BcGtNYW5hZ2VyXCI7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2ROYW1lID0gXCJzZXRVaWRcIjtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZFNpZ25hdHVyZSA9IFwiKExqYXZhL2xhbmcvU3RyaW5nOylWXCI7Ly/lpoLmnpzmmK9zdHJpbmfvvJpMamF2YS9sYW5nL1N0cmluZzssIGJvb2w6WixpbnQ6SVxyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKGNsYXNzTmFtZSwgbWV0aG9kTmFtZSwgbWV0aG9kU2lnbmF0dXJlLHVpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEFuZHJvaWRMYW5ndWFnZSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lID0gXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BcGtNYW5hZ2VyXCI7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2ROYW1lID0gXCJnZXRBbmRyb2lkTGFuZ3VhZ2VcIjtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZFNpZ25hdHVyZSA9IFwiKClWXCI7Ly/lpoLmnpzmmK9zdHJpbmfvvJpMamF2YS9sYW5nL1N0cmluZzssIGJvb2w6WixpbnQ6SVxyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKGNsYXNzTmFtZSwgbWV0aG9kTmFtZSwgbWV0aG9kU2lnbmF0dXJlKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEFCVGVzdFBhcigpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lID0gXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BcGtNYW5hZ2VyXCI7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2ROYW1lID0gXCJnZXRBQlRlc3RQYXJcIjtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZFNpZ25hdHVyZSA9IFwiKClWXCI7Ly/lpoLmnpzmmK9zdHJpbmfvvJpMamF2YS9sYW5nL1N0cmluZzssIGJvb2w6WixpbnQ6SVxyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKGNsYXNzTmFtZSwgbWV0aG9kTmFtZSwgbWV0aG9kU2lnbmF0dXJlKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDorqnmiYvmnLrpnIfliqjkuIDkuItcclxuICAgICAqIEBwYXJhbSBkdCDpnIfliqjml7bpl7TvvIzmr6vnp5LvvIjmlbTmlbDvvIlcclxuICAgICAqL1xyXG4gICAgYmVWaWJyYXRlKGR0Om51bWJlcilcclxuICAgIHtcclxuICAgICAgICBpZihjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgbGV0IGNsYXNzTmFtZSA9IFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBrTWFuYWdlclwiO1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kTmFtZSA9IFwiYmVWaWJyYXRlXCI7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2RTaWduYXR1cmUgPSBcIihJKVZcIjsvL+WmguaenOaYr3N0cmluZ++8mkxqYXZhL2xhbmcvU3RyaW5nOywgYm9vbDpaLGludDpJXHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoY2xhc3NOYW1lLCBtZXRob2ROYW1lLCBtZXRob2RTaWduYXR1cmUsZHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIGdldERpbmdZdWVJbmZvKGR5SW5mbzpEaW5nWXVlKXtcclxuICAgICAgICB0aGlzLmR5X2luZm9fY2FsbGJhY2s9ZHlJbmZvOyAgICAgICAgXHJcbiAgICAgICAgaWYoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgIGxldCBjbGFzc05hbWUgPSBcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0Fwa01hbmFnZXJcIjtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZE5hbWUgPSBcImdldERpbmdZdWVJbmZvXCI7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2RTaWduYXR1cmUgPSBcIigpVlwiOy8v5aaC5p6c5pivc3RyaW5n77yaTGphdmEvbGFuZy9TdHJpbmc7LCBib29sOlosaW50OklcclxuICAgICAgICAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChjbGFzc05hbWUsIG1ldGhvZE5hbWUsIG1ldGhvZFNpZ25hdHVyZSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoq6LCD55SoYW5kcm9pZOiOt+W+l+aUr+S7mOS/oeaBryAqL1xyXG4gICAgZ2V0UGF5SW5mb3MocGF5SW5mbzpQYXkpe1xyXG4gICAgICAgIHRoaXMucGF5X2luZm9fY2FsbGJhY2s9cGF5SW5mbztcclxuICAgICAgICBpZihJc0RlYnVnKXtcclxuICAgICAgICAgICAgdGhpcy5zZXRUZXN0UGF5SW5mbygpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lID0gXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BcGtNYW5hZ2VyXCI7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2ROYW1lID0gXCJnZXRQYXlJbmZvc1wiO1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kU2lnbmF0dXJlID0gXCIoKVZcIjsvL+WmguaenOaYr3N0cmluZ++8mkxqYXZhL2xhbmcvU3RyaW5nOywgYm9vbDpaLGludDpJXHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoY2xhc3NOYW1lLCBtZXRob2ROYW1lLCBtZXRob2RTaWduYXR1cmUpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNldFRlc3RQYXlJbmZvKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuiwg+eUqGFuZHJvaWQqL1xyXG4gICAganVtcFRvR1AoKXtcclxuICAgICAgICBpZihjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgbGV0IGNsYXNzTmFtZSA9IFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBrTWFuYWdlclwiO1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kTmFtZSA9IFwianVtcFRvR1BcIjtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZFNpZ25hdHVyZSA9IFwiKClWXCI7Ly/lpoLmnpzmmK9zdHJpbmfvvJpMamF2YS9sYW5nL1N0cmluZzssIGJvb2w6WixpbnQ6SVxyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKGNsYXNzTmFtZSwgbWV0aG9kTmFtZSwgbWV0aG9kU2lnbmF0dXJlKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGFja2FnZUluZm8oY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMucGFja2FnZV9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgICAgICBpZihjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgbGV0IGNsYXNzTmFtZSA9IFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBrTWFuYWdlclwiO1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kTmFtZSA9IFwiZ2V0UGFja2FnZUluZm9cIjtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZFNpZ25hdHVyZSA9IFwiKClWXCI7Ly/lpoLmnpzmmK9zdHJpbmfvvJpMamF2YS9sYW5nL1N0cmluZzssIGJvb2w6WixpbnQ6SVxyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKGNsYXNzTmFtZSwgbWV0aG9kTmFtZSwgbWV0aG9kU2lnbmF0dXJlKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRUZXN0UGF5SW5mbygpe1xyXG4gICAgICAgIHRoaXMuc2V0UGF5SW5mb3MoW3sgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYjIwMVwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NDAwXCIsIFwiY3VycmVuY3lcIjogXCJLUldcIiwgXCJwYXlfaWRcIjogXCJiNDAxXCIsIFwiaXNfYnV5XCI6IGZhbHNlIH0sIFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYjUwMVwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjkyLDcyNFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzEwMVwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzEwMlwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzEwM1wiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzEwNFwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzEwNVwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzEwNlwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzEwN1wiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzEwOFwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzEwOVwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzExMFwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzIwMVwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzIwMlwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzIwM1wiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzIwNFwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzIwNVwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzIwNlwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjY2NlwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzMwMVwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIiQzXCIsIFwiY3VycmVuY3lcIjogXCJLUldcIiwgXCJwYXlfaWRcIjogXCJjNTAxXCIsIFwiaXNfYnV5XCI6IGZhbHNlIH0sXHJcbiAgICAgICAgeyBcImRlc1wiOiBcImdldCA2MCBjcnlzdGFsc1wiLCBcInByaWNlXCI6IFwiJDNcIiwgXCJjdXJyZW5jeVwiOiBcIktSV1wiLCBcInBheV9pZFwiOiBcImM1MDJcIiwgXCJpc19idXlcIjogZmFsc2UgfSxcclxuICAgICAgICB7IFwiZGVzXCI6IFwiZ2V0IDYwIGNyeXN0YWxzXCIsIFwicHJpY2VcIjogXCIkM1wiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzUwM1wiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIiQzXCIsIFwiY3VycmVuY3lcIjogXCJLUldcIiwgXCJwYXlfaWRcIjogXCJjNTA0XCIsIFwiaXNfYnV5XCI6IGZhbHNlIH0sXHJcbiAgICAgICAgeyBcImRlc1wiOiBcImdldCA2MCBjcnlzdGFsc1wiLCBcInByaWNlXCI6IFwiJDAuMVwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzUwNVwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIiQzXCIsIFwiY3VycmVuY3lcIjogXCJLUldcIiwgXCJwYXlfaWRcIjogXCJjNjAxXCIsIFwiaXNfYnV5XCI6IGZhbHNlIH0sXHJcbiAgICAgICAgeyBcImRlc1wiOiBcImdldCA2MCBjcnlzdGFsc1wiLCBcInByaWNlXCI6IFwiJDNcIiwgXCJjdXJyZW5jeVwiOiBcIktSV1wiLCBcInBheV9pZFwiOiBcImM0MDFcIiwgXCJpc19idXlcIjogZmFsc2UgfSxcclxuICAgIF1cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUpBVkHosIPnlKjljLotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgICBcclxuICAgIC8v5bm/5ZGK57uT5p6c6L+U5ZueXHJcbiAgICAvLzA9ZmFsc2UsMT10cnVlXHJcbiAgICBhZFJlc3VsdChyZXN1bHQpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGFkUmVzdWx0PXBhcnNlSW50KHJlc3VsdCk7XHJcbiAgICAgICAgaWYodGhpcy5hZENhbGxiYWNrIT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoYWRSZXN1bHQ9PTApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZENhbGxiYWNrKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIC8vIGlmKEdhbWVEYXRhLmdldEluc3RhbmNlKCkuZ2V0VG90YWxWaWRlb051bSgpPD0wKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICBHYW1lRGF0YS5nZXRJbnN0YW5jZSgpLmFkZFRvdGFsVmlkZW9OdW0oMSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5hZENhbGxiYWNrKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5hZENhbGxiYWNrKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIC8vIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZENhbGxiYWNrKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7op4LnnIvku7vmhI8x5qyh5bm/5ZGKKTtcclxuICAgICAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u6KeC55yL5Lu75oSPM+asoeW5v+WRiik7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6I635b6X6KeG6aKR5pKt5pS+5aWW5Yqx546p5a625pWwKTtcclxuICAgICAgICAgICAgICAgIEdhbWVEYXRhLmdldEluc3RhbmNlKCkuYWRkVG90YWxWaWRlb051bSgxKTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5hZENhbGxiYWNrPW51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGludGVyVmlkZW9SZXN1bHQocmVzdWx0KVxyXG4gICAge1xyXG4gICAgICAgIHZhciBhZFJlc3VsdD1wYXJzZUludChyZXN1bHQpO1xyXG4gICAgICAgIGlmKHRoaXMuaW50ZXJWaWRlb0NhbGxiYWNrIT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoYWRSZXN1bHQ9PTApXHJcbiAgICAgICAgICAgICAgICB0aGlzLmludGVyVmlkZW9DYWxsYmFjayhmYWxzZSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnRlclZpZGVvQ2FsbGJhY2sodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAvL0ZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ojrflvpfop4bpopHmkq3mlL7lpZblirHnjqnlrrbmlbApO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmludGVyVmlkZW9DYWxsYmFjaz1udWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhZGRBZExvYWRlZE51bShudW0pe1xyXG4gICAgICAgIGlmKHR5cGVvZiBudW0gPT0gXCJzdHJpbmdcIil7XHJcbiAgICAgICAgICAgIG51bT1wYXJzZUludChudW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkX2xvYWRlZF9udW0rPW51bTtcclxuICAgIH1cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeiuoumYheS6pOS6ki0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBzZXREaW5nWXVlSW5mbyhpbmZvU3RyKXtcclxuICAgICAgICBsZXQgZHlJbmZvcz1uZXcgQXJyYXkoKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxpbmZvU3RyLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGluZm89aW5mb1N0cltpXTtcclxuICAgICAgICAgICAgbGV0IGR5SW5mbz1uZXcgUGF5SW5mbygpO1xyXG4gICAgICAgICAgICBkeUluZm8ucHJpY2U9aW5mby5wcmljZTtcclxuICAgICAgICAgICAgZHlJbmZvLmRlcz1pbmZvLmRlcztcclxuICAgICAgICAgICAgZHlJbmZvLmN1cnJlbmN5PWluZm8uY3VycmVuY3k7XHJcbiAgICAgICAgICAgIGR5SW5mby5pc19idXk9aW5mby5pc19idXk7XHJcbiAgICAgICAgICAgIGR5SW5mby5wYXlfaWQ9aW5mby5wYXlfaWQ7XHJcbiAgICAgICAgICAgIGR5SW5mb3MucHVzaChkeUluZm8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBEaW5nWXVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldENhcmRJbmZvKGR5SW5mb3MpO1xyXG4gICAgICAgIC8vIFtTa3VEZXRhaWxzOiB7XCJwcm9kdWN0SWRcIjpcImM1MDJcIixcInR5cGVcIjpcInN1YnNcIixcInRpdGxlXCI6XCJXZWVrbHkgZ2lmdCAoSWRsZSBIZXJvOiBDYXN0bGUgRGVmZW5zZSlcIixcIm5hbWVcIjpcIldlZWtseSBnaWZ0XCIsXCJkZXNjcmlwdGlvblwiOlwiR2V0IHdlZWtseSBnaWZ0XCIsXCJwcmljZVwiOlwi77+mMSw0MDBcIixcInByaWNlX2Ftb3VudF9taWNyb3NcIjoxNDAwMDAwMDAwLFwicHJpY2VfY3VycmVuY3lfY29kZVwiOlwiS1JXXCIsXCJza3VEZXRhaWxzVG9rZW5cIjpcIkFFdWhwNEpINGtVdVFmQVZkX19wQ25NTEV6UFNHNWZ5MW1CbmgxSmtMZmRTdXA2Z01BWnVGSF9mb3RrbnB1eE5XV3VjRGhpcnhEZUJxVGFCWVIzaG9FRXNzQlFBTk9mTlJmU285Y285TWc4PVwiLFwic3Vic2NyaXB0aW9uUGVyaW9kXCI6XCJQMVdcIixcImludHJvZHVjdG9yeVByaWNlQW1vdW50TWljcm9zXCI6MTAwMDAwMDAwLFwiaW50cm9kdWN0b3J5UHJpY2VQZXJpb2RcIjpcIlAxV1wiLFwiaW50cm9kdWN0b3J5UHJpY2VcIjpcIu+/pjEwMFwiLFwiaW50cm9kdWN0b3J5UHJpY2VDeWNsZXNcIjoxfV1cclxuICAgIH1cclxuICAgIHNldFBheUluZm9zKGluZm9TdHIpe1xyXG4gICAgICAgIGxldCBkeUluZm9zPW5ldyBBcnJheSgpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGluZm9TdHIubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgaW5mbz1pbmZvU3RyW2ldO1xyXG4gICAgICAgICAgICBsZXQgZHlJbmZvPW5ldyBQYXlJbmZvKCk7XHJcbiAgICAgICAgICAgIGR5SW5mby5wcmljZT1pbmZvLnByaWNlO1xyXG4gICAgICAgICAgICBkeUluZm8uZGVzPWluZm8uZGVzO1xyXG4gICAgICAgICAgICBkeUluZm8uY3VycmVuY3k9aW5mby5jdXJyZW5jeTtcclxuICAgICAgICAgICAgZHlJbmZvLmlzX2J1eT1pbmZvLmlzX2J1eTtcclxuICAgICAgICAgICAgZHlJbmZvLnBheV9pZD1pbmZvLnBheV9pZDtcclxuICAgICAgICAgICAgZHlJbmZvcy5wdXNoKGR5SW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdGhpcy5wYXlfaW5mb19jYWxsYmFjay5pbmZvKGR5SW5mb3MpO1xyXG4gICAgICAgIFBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRQYXlJbmZvcyhkeUluZm9zKTtcclxuICAgIH1cclxuICAgIC8v6K6i6ZiF57uT5p6c6L+U5ZueXHJcbiAgICBkeVJlc3VsdChyZXN1bHQpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGFkUmVzdWx0PXBhcnNlSW50KHJlc3VsdCk7XHJcbiAgICAgICAgaWYodGhpcy5keSE9bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGFkUmVzdWx0PT0wKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5keS5yZXN1bHQoZmFsc2UpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHkucmVzdWx0KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuiuoumYheaIkOWKn+eOqeWutuaVsCk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuZHk9bnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwYXlSZXN1bHQocmVzdWx0KVxyXG4gICAge1xyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNsb3NlUGF5V2FpdGluZ1VpKCk7XHJcbiAgICAgICAgdmFyIHBheVJlc3VsdD1wYXJzZUludChyZXN1bHQpO1xyXG4gICAgICAgIGlmKHRoaXMucGF5IT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYocGF5UmVzdWx0PT0wKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXkucmVzdWx0KGZhbHNlKVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGF5LnJlc3VsdCh0cnVlKVxyXG4gICAgICAgICAgICAgICAgLy9Gb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6K6i6ZiF5oiQ5Yqf546p5a625pWwKTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5wYXk9bnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbm90aWZ5UGF5U3RhdGUocGF5SWQpe1xyXG4gICAgICAgIGxldCBpZD1wYXJzZUludChwYXlJZCk7XHJcbiAgICAgICAgUGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJld2FyZEJ5SWQoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K6i6ZiF5L+h5oGv6K6+572uXHJcbiAgICBkeUluZm8oaW5mb1N0cilcclxuICAgIHtcclxuICAgICAgICAvL+WPkei/h+adpeebtOaOpeWwseaYr0pTT07moLzlvI/kuoZcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdkeUluZm86Jyk7XHJcbiAgICAgICAgLy8gbGV0IGluZm9zPUpTT04uc3RyaW5naWZ5KGluZm9TdHIpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGluZm9zKTtcclxuICAgICAgICAvLyBWaXBNYW5hZ2VyLmR5X2luZm89bmV3IEFycmF5KCk7XHJcbiAgICAgICAgLy8gZm9yKGxldCBpPTA7IGk8MzsgaSsrKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgbGV0IGluZm89aW5mb1N0cltpXTtcclxuICAgICAgICAvLyAgICAgbGV0IGR5SW5mbz1uZXcgRFlJbmZvKCk7XHJcbiAgICAgICAgLy8gICAgIGR5SW5mby5wcmljZT1pbmZvLnByaWNlO1xyXG4gICAgICAgIC8vICAgICBkeUluZm8uZGVzPWluZm8uZGVzO1xyXG4gICAgICAgIC8vICAgICBkeUluZm8uY3VycmVuY3k9aW5mby5jdXJyZW5jeTtcclxuICAgICAgICAvLyAgICAgVmlwTWFuYWdlci5keV9pbmZvLnB1c2goZHlJbmZvKTtcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coaW5mby5wcmljZSsnLScraW5mby5jdXJyZW5jeSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG4gICAgLy92aXDorr7nva5cclxuICAgIHNldFZpcChsZXZlbClcclxuICAgIHtcclxuICAgICAgICAvL1ZpcE1hbmFnZXIuc2F2ZVZpcChsZXZlbCk7XHJcbiAgICB9XHJcbiAgICAvL+a4uOaIj+eJiOacrOWPt+iuvue9rlxyXG4gICAgc2V0VmVyc2lvbih2ZXIpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZXRWZXJzaW9uXCIrdmVyKTtcclxuICAgICAgICBVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLnNhdmVWZXJzaW9uKHZlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t55m75b2VLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8v55m75b2V57uT5p6c6L+U5ZueXHJcbiAgICB1cGxvYWRSZXN1bHQodXNlckluZm8pXHJcbiAgICB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhsb2dpbkluZm8pO1xyXG4gICAgICAgIHRoaXMudXBsb2FkQ2FsbGJhY2sodXNlckluZm8pO1xyXG4gICAgICAgIHRoaXMudXBsb2FkQ2FsbGJhY2s9bnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRMYW5ndWFnZSh0eXBlKVxyXG4gICAge1xyXG4gICAgICAgIGNjLmxvZygnc2V0TGFuZ3VhZ2XvvJonK3R5cGUpO1xyXG4gICAgICAgIExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldExhbmd1YWdlKHR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dHYW1lRXhpdCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zY2VuZSE9R2FtZVNjZW5lLmxvYWQpXHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93RGlhbG9nKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmluZyhMYW5ndWFnZUluZGV4LkRvX3lvdV9yZWFsbHlfd2FudF90b19xdWl0X2dhbWUpLCgpPT57XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5nYW1lKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLumAgOWHuuaMkeaImOWFs+WNoStMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/nu5PmnZ/muLjmiI9cclxuICAgICAgICAgICAgR2FtZURhdGEuZ2V0SW5zdGFuY2UoKS5zYXZlRXhpdFRpbWUoKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbmQoKTtcclxuICAgICAgICAgICAgfSwxMDApO1xyXG4gICAgICAgIH0sKCk9PntcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICB9LDApO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+aYr+S4gOS4qmpzb27moLzlvI/nmoTlrZfnrKbkuLJcclxuICAgIHNldEFCVGVzdFBhcihwYXIpXHJcbiAgICB7ICAgICAgICBcclxuICAgICAgICBBQlRlc3RNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0QUJUZXN0UGFyKHBhcik7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGFja2FnZUluZm8oaW5mbyl7XHJcbiAgICAgICAgbGV0IGpzb249SlNPTi5wYXJzZShpbmZvKTtcclxuICAgICAgICB0aGlzLnBhY2thZ2VfbmFtZT1qc29uLnBhY2thZ2VfbmFtZTtcclxuICAgICAgICB0aGlzLmFwcF92ZXI9anNvbi5hcHBfdmVyO1xyXG4gICAgICAgIHRoaXMuYXBwX2NvZGU9anNvbi5hcHBfY29kZTtcclxuICAgICAgICB0aGlzLnBsbW49anNvbi5wbG1uO1xyXG4gICAgICAgIHRoaXMuYWlkPWpzb24uYWlkO1xyXG4gICAgICAgIHRoaXMuZGlkPWpzb24uZGlkO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucGFja2FnZV9uYW1lLHRoaXMuYXBwX3Zlcix0aGlzLmFwcF9jb2RlLHRoaXMucGxtbix0aGlzLmFpZCx0aGlzLmRpZCxqc29uLm5ldHdvcmspO1xyXG4gICAgICAgIFVzZXJEYXRhLmdldEluc3RhbmNlKCkuSHR0cFBvc3RHZXRVc2VySWQodGhpcy5kaWQsanNvbi5uZXR3b3JrKTtcclxuICAgIH1cclxufVxyXG5cclxuIl19