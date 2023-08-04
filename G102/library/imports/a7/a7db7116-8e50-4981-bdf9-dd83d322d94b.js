"use strict";
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