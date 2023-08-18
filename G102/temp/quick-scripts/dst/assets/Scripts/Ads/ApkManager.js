
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
        // if(cc.sys.isNative) {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "onJSInitFinish";
        //     let methodSignature = "()V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature);            
        // }
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
        // if(cc.sys.isNative) {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "showInterstitial";
        //     let methodSignature = "()V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature);            
        // }
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
        // if(cc.sys.isNative) {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "showCallMe";
        //     let methodSignature = "()V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature);            
        // }
    };
    //埋点
    ApkManager.prototype.followEvent = function (eventName) {
        if (Constants_1.CUR_Platform == Constants_1.Release_Platform.APK) {
            // if(cc.sys.isNative) {
            //     let className = "org/cocos2dx/javascript/ApkManager";
            //     let methodName = "followEvent";
            //     let methodSignature = "(Ljava/lang/String;)V";//如果是string：Ljava/lang/String;, bool:Z,int:I
            //     jsb.reflection.callStaticMethod(className, methodName, methodSignature,eventName);                
            // }
        }
    };
    //检测订阅信息
    ApkManager.prototype.cheakDYInfo = function () {
        //if(CUR_Platform==Release_Platform.APK)
        // if(cc.sys.isNative) {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "cheakDYInfo";
        //     let methodSignature = "()V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature);            
        // }else{
        //     if(IsDebug){
        //     }
        // }
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
        // if(cc.sys.isNative) {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "showDingYue";
        //     let methodSignature = "(Ljava/lang/String;)V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature,id);            
        // }else{
        this.dyResult(1);
        //}
    };
    ApkManager.prototype.getVipInfo = function (callback) {
        this.uploadCallback = callback;
        var uid = UserData_1.default.getInstance().getUserID();
        // if(cc.sys.isNative) {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "getVipInfo";
        //     let methodSignature = "(Ljava/lang/String;)V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature,uid);            
        // }
    };
    ApkManager.prototype.showPay = function (pay, type) {
        this.pay = pay;
        if (Constants_1.IsDebug) {
            this.payResult(1);
            return;
        }
        UIManager_1.UIManager.getInstance().showPayWaitingUi();
        // if(cc.sys.isNative) {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "showPay";
        //     let methodSignature = "(Ljava/lang/String;)V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature,type);            
        // }else{
        this.payResult(1);
        //}
    };
    //----------------------------------------------------登录交互-----------------------------------------------------------
    ApkManager.prototype.uploadAndGetUid = function (callback) {
        this.uploadCallback = callback;
        var maxLevel = LevelManager_1.LevelManager.getInstance().finish_level;
        var onlineTime = GameData_1.default.getTotalTime();
        var name = UserData_1.default.getInstance().getUserName();
        // if(cc.sys.isNative)
        // {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "uploadAndGetUid";
        //     let methodSignature = "(IILjava/lang/String;)V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature,maxLevel,onlineTime,name);
        // }else
        // {
        this.uploadResult(JSON.stringify({ uid: UserData_1.default.getInstance().getUserID(), vip: '0' }));
        // }
    };
    ApkManager.prototype.uploadOnlineTime = function () {
        var maxLevel = LevelManager_1.LevelManager.getInstance().finish_level;
        var onlineTime = GameData_1.default.getTotalTime();
        var uid = UserData_1.default.getInstance().getUserID();
        if (uid == '')
            return;
        // if(cc.sys.isNative)
        // {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "uploadOnlineTime";
        //     let methodSignature = "(IILjava/lang/String;)V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature,maxLevel,onlineTime,uid);
        // }
    };
    ApkManager.prototype.loginForFB = function (callback) {
        this.uploadCallback = callback;
        var maxLevel = LevelManager_1.LevelManager.getInstance().finish_level;
        var onlineTime = GameData_1.default.getTotalTime();
        // if(cc.sys.isNative) {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "loginForFB";
        //     let methodSignature = "(II)V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature,maxLevel,onlineTime);            
        // }
    };
    ApkManager.prototype.loginForGoogle = function (callback) {
        this.uploadCallback = callback;
        var maxLevel = LevelManager_1.LevelManager.getInstance().finish_level;
        var onlineTime = GameData_1.default.getTotalTime();
        // if(cc.sys.isNative) {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "loginForGoogle";
        //     let methodSignature = "(II)V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature,maxLevel,onlineTime);            
        // }
    };
    ApkManager.prototype.setUid = function () {
        // if(CUR_Platform==Release_Platform.APK && cc.sys.isNative)
        // {
        //     let uid=UserData.getInstance().getUserID();
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "setUid";
        //     let methodSignature = "(Ljava/lang/String;)V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature,uid);
        // }
    };
    ApkManager.prototype.getAndroidLanguage = function () {
        // if (cc.sys.isNative) {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "getAndroidLanguage";
        //     let methodSignature = "()V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature);                
        // }
    };
    ApkManager.prototype.getABTestPar = function () {
        // if (cc.sys.isNative) {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "getABTestPar";
        //     let methodSignature = "()V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature);                
        // }
    };
    /**
     * 让手机震动一下
     * @param dt 震动时间，毫秒（整数）
     */
    ApkManager.prototype.beVibrate = function (dt) {
        // if(cc.sys.isNative) {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "beVibrate";
        //     let methodSignature = "(I)V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature,dt);
        // }
    };
    ApkManager.prototype.getDingYueInfo = function (dyInfo) {
        this.dy_info_callback = dyInfo;
        // if(cc.sys.isNative) {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "getDingYueInfo";
        //     let methodSignature = "()V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature);            
        // }
    };
    /**调用android获得支付信息 */
    ApkManager.prototype.getPayInfos = function (payInfo) {
        this.pay_info_callback = payInfo;
        if (Constants_1.IsDebug) {
            this.setTestPayInfo();
            return;
        }
        // if(cc.sys.isNative) {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "getPayInfos";
        //     let methodSignature = "()V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature);            
        // }else{
        this.setTestPayInfo();
        //}
    };
    /**调用android*/
    ApkManager.prototype.jumpToGP = function () {
        // if(cc.sys.isNative) {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "jumpToGP";
        //     let methodSignature = "()V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature);            
        // }
    };
    ApkManager.prototype.getPackageInfo = function (callback) {
        this.package_callback = callback;
        // if(cc.sys.isNative) {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "getPackageInfo";
        //     let methodSignature = "()V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature);            
        // }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQWRzXFxBcGtNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQTJEO0FBQzNELG9FQUErRDtBQUMvRCwwQ0FBK0c7QUFDL0csMkNBQWdFO0FBQ2hFLHdDQUFtQztBQUNuQyw4Q0FBeUM7QUFDekMsb0VBQStEO0FBQy9ELHdFQUFtRTtBQUNuRSwwREFBcUQ7QUFDckQseURBQW9EO0FBQ3BELHNEQUFxRDtBQUNyRCx3Q0FBbUM7QUFDbkMsdURBQXdFO0FBQ3hFLG9EQUFtRDtBQUNuRCw0REFBMkQ7QUFDM0QsbURBQThDO0FBQzlDLDZDQUE0QztBQUU1Qyw0REFBOEQ7QUFDOUQsMERBQXNEO0FBQ3RELDZDQUE0QztBQUM1Qyx5Q0FBb0M7QUFFOUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBQTtRQUdZLGVBQVUsR0FBVSxJQUFJLENBQUM7UUFDekIsdUJBQWtCLEdBQVUsSUFBSSxDQUFDO1FBQ2pDLG1CQUFjLEdBQUMsQ0FBQyxDQUFDO1FBQ2pCLE9BQUUsR0FBUyxJQUFJLENBQUM7UUFDaEIsUUFBRyxHQUFLLElBQUksQ0FBQztRQUNiLG1CQUFjLEdBQVUsSUFBSSxDQUFDO1FBQzdCLHFCQUFnQixHQUFTLElBQUksQ0FBQztRQUM5QixzQkFBaUIsR0FBSyxJQUFJLENBQUM7UUFDbkMsTUFBTTtRQUNDLGlCQUFZLEdBQVEsMkJBQTJCLENBQUM7UUFDaEQsWUFBTyxHQUFRLFFBQVEsQ0FBQztRQUN4QixhQUFRLEdBQVEsRUFBRSxDQUFDO1FBQ25CLFlBQU8sR0FBUSxFQUFFLENBQUM7UUFDbEIsZUFBVSxHQUFRLEVBQUUsQ0FBQztRQUNyQixRQUFHLEdBQVEsT0FBTyxDQUFDO1FBQ25CLFNBQUksR0FBUSxLQUFLLENBQUM7UUFDbEIsUUFBRyxHQUFRLEVBQUUsQ0FBQztRQUNk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LEVBQUU7WUFDbkcsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRTtZQUNuRyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFO1lBQ25HLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7WUFDbkcsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRTtZQUNuRyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFO1lBQ25HLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7WUFDbkcsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRTtZQUNuRyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFO1lBQ25HLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7WUFDbkcsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRTtZQUNuRyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFO1lBQ25HLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7WUFDbkcsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRTtZQUNuRyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFO1lBQ25HLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7WUFDbkcsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxF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bnQiOlsiaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQge0NVUl9QbGF0Zm9ybSwgR2FtZVNjZW5lLCBJTlRFUl9WSURFT19UWVBFLCBJc0RlYnVnLCBSZWxlYXNlX1BsYXRmb3JtLCBWSURFT19UWVBFIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBEaW5nWXVlX1R5cGUsIERZSW5mbywgVmlwTWFuYWdlciB9IGZyb20gXCIuL1ZpcE1hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVEYXRhIGZyb20gXCIuLi9HYW1lRGF0YVwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IExhbmd1YWdlSW5kZXggfSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZUNvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBBQlRlc3RNYW5hZ2VyIGZyb20gXCIuLi9BQlRlc3QvQUJUZXN0TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vTGV2ZWwvTGV2ZWxNYW5hZ2VyXCI7XHJcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi4vVXNlckRhdGFcIjtcclxuaW1wb3J0IHsgRGluZ1l1ZSwgUGF5LCBQYXlJbmZvLCBQYXlJZCB9IGZyb20gXCIuLi90aGlyZFBhcnR5L1RoaXJkUGFydHlcIjtcclxuaW1wb3J0IHsgUGF5TWFuYWdlciB9IGZyb20gXCIuLi9QYXltZW50L1BheU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRGluZ1l1ZU1hbmFnZXIgfSBmcm9tIFwiLi4vUGF5bWVudC9EaW5nWXVlTWFuYWdlclwiO1xyXG5pbXBvcnQgVGFza01hbmFnZXIgZnJvbSBcIi4uL1Rhc2svVGFza01hbmFnZXJcIjtcclxuaW1wb3J0IHsgVGFza0l0ZW0gfSBmcm9tIFwiLi4vVGFzay9UYXNrRW51bVwiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFRoZVN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uL1N0b3JhZ2UvU3RvcmFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4uL1VJL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgVGFza1VpIGZyb20gXCIuLi9UYXNrL1Rhc2tVaVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcGtNYW5hZ2VyIHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEFwa01hbmFnZXIgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBhZENhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcbiAgICBwcml2YXRlIGludGVyVmlkZW9DYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgcHJpdmF0ZSBwZXJ2X2luc3RfdGltZT0wO1xyXG4gICAgcHJpdmF0ZSBkeTpEaW5nWXVlPW51bGw7XHJcbiAgICBwcml2YXRlIHBheTpQYXk9bnVsbDtcclxuICAgIHByaXZhdGUgdXBsb2FkQ2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIHByaXZhdGUgZHlfaW5mb19jYWxsYmFjazpEaW5nWXVlPW51bGw7XHJcbiAgICBwcml2YXRlIHBheV9pbmZvX2NhbGxiYWNrOlBheT1udWxsO1xyXG4gICAgLy/ljIXkvZPkv6Hmga9cclxuICAgIHB1YmxpYyBwYWNrYWdlX25hbWU6c3RyaW5nPSdjb20uSWRsZUhlcm9DYXN0bGVEZWZlbnNlJztcclxuICAgIHB1YmxpYyBhcHBfdmVyOnN0cmluZz0nMS4wLjEyJztcclxuICAgIHB1YmxpYyBhcHBfY29kZTpudW1iZXI9MTI7XHJcbiAgICBwdWJsaWMgc3lzX3ZlcjpudW1iZXI9MzE7XHJcbiAgICBwdWJsaWMgYW5kcm9pZF9pZDpzdHJpbmc9Jyc7XHJcbiAgICBwdWJsaWMgYWlkOnN0cmluZz1cInh4eHh4XCI7XHJcbiAgICBwdWJsaWMgcGxtbjpudW1iZXI9NDE0MDE7XHJcbiAgICBwdWJsaWMgZGlkOnN0cmluZz1cIlwiO1xyXG4gICAgcHVibGljIHBhY2thZ2VfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIC8v5bm/5ZGK5Yqg6L295a6M5oiQ55qE57G75Z6L5pWw6YePXHJcbiAgICBwdWJsaWMgYWRfbG9hZGVkX251bTpudW1iZXI9MDtcclxuICAgIHB1YmxpYyBtYXhfbG9hZF9udW06bnVtYmVyPTI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkFwa01hbmFnZXJcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBBcGtNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBpbml0ICgpIHtcclxuICAgICAgICBjYy5BUEs9dGhpcztcclxuICAgICAgICBjYy5nYW1lLm9uKGNjLmdhbWUuRVZFTlRfSElERSwgKCk9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmuLjmiI/ov5vlhaXlkI7lj7As5LiK5Lyg5oC75pe26ZW/XCIpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBHYW1lRGF0YS5nZXRJbnN0YW5jZSgpLnNhdmVFeGl0VGltZSgpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgY2MuZ2FtZS5vbihjYy5nYW1lLkVWRU5UX1NIT1csICgpPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5ri45oiP6L+b5YWl5YmN5Y+wLOS/neWtmOS4gOS4quaXtumXtFwiKTtcclxuICAgICAgICAgICAgR2FtZURhdGEuZ2V0SW5zdGFuY2UoKS5zYXZlTG9naW5UaW1lKCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIEdhbWVEYXRhLmdldEluc3RhbmNlKCkuY2hlY2tJc05ld0RheSgpO1xyXG4gICAgICAgICAgICAvLyDmi4nlj5bmnI3liqHlmajml7bpl7RcclxuICAgICAgICAgICAgR2FtZURhdGEuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoU2VydmVyVGltZSgpO1xyXG4gICAgICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3NjZW5lPT1HYW1lU2NlbmUuaG9tZSl7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhcy90YXNrX3VpXCIpLmdldENvbXBvbmVudChUYXNrVWkpLnJlZnJlc2hEYWlseVRhc2soKTtcclxuICAgICAgICAgICAgICAgIH0sNTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgLy90aGlzLmluaXRBZHMoKTtcclxuICAgICAgICB0aGlzLm9uSlNJbml0RmluaXNoKCk7XHJcbiAgICAgICAgLy8gc2V0SW50ZXJ2YWwoKCk9PntcclxuICAgICAgICAvLyAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlQWxsUHJvcE51bSh0cnVlKTtcclxuXHJcbiAgICAgICAgLy8gfSw2MCoxMDAwKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaW5pdEFkcygpXHJcbiAgICB7ICAgICAgICBcclxuICAgICAgICAvL+W8gOWQr+S4gOS4quiuoeaXtuWZqO+8jOWmguaenCAg5r+A5Yqx6KeG6aKRMuWIhumSn+WGhemDveaYr+acquWKoOi9ve+8jOWImeS4u+WKqOWPkei1t+S4gOasoeWKoOi9vVxyXG4gICAgICAgIGxldCBhZE5vTnVtPTA7XHJcbiAgICAgICAgLy8gbGV0IHNldEludGVyID0gc2V0SW50ZXJ2YWwoKCk9PntcclxuICAgICAgICAvLyAgICAgaWYodGhpcy5hZF92aWRlb19sb2FkX3N0YXRlPT1BRF9MT0FEX1NUQVRFLk5PKVxyXG4gICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICBhZE5vTnVtKys7XHJcbiAgICAgICAgLy8gICAgIH1lbHNlXHJcbiAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAvLyAgICAgICAgIGFkTm9OdW09MDtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBpZihhZE5vTnVtPj0xMjApXHJcbiAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAvLyAgICAgICAgIGFkTm9OdW09MDtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSwgMTAwMCk7IC8vMTAwMOavq+enkuS4ujHnp5JcclxuICAgIH07XHJcblxyXG4gICAgXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t6LCD55SoSkFWQS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBvbkpTSW5pdEZpbmlzaCgpe1xyXG4gICAgICAgIC8vIGlmKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgIC8vICAgICBsZXQgY2xhc3NOYW1lID0gXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BcGtNYW5hZ2VyXCI7XHJcbiAgICAgICAgLy8gICAgIGxldCBtZXRob2ROYW1lID0gXCJvbkpTSW5pdEZpbmlzaFwiO1xyXG4gICAgICAgIC8vICAgICBsZXQgbWV0aG9kU2lnbmF0dXJlID0gXCIoKVZcIjsvL+WmguaenOaYr3N0cmluZ++8mkxqYXZhL2xhbmcvU3RyaW5nOywgYm9vbDpaLGludDpJXHJcbiAgICAgICAgLy8gICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoY2xhc3NOYW1lLCBtZXRob2ROYW1lLCBtZXRob2RTaWduYXR1cmUpOyAgICAgICAgICAgIFxyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuICAgIC8v5bGV56S65o+S5bGP5bm/5ZGKXHJcbiAgICBzaG93QmFubmVyKClcclxuICAgIHsgICAgICAgIFxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICBpZihjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgbGV0IGNsYXNzTmFtZSA9IFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBrTWFuYWdlclwiO1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kTmFtZSA9IFwic2hvd0Jhbm5lclwiO1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kU2lnbmF0dXJlID0gXCIoKVZcIjsvL+WmguaenOaYr3N0cmluZ++8mkxqYXZhL2xhbmcvU3RyaW5nOywgYm9vbDpaLGludDpJXHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoY2xhc3NOYW1lLCBtZXRob2ROYW1lLCBtZXRob2RTaWduYXR1cmUpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+WxleekuuaPkuWxj+W5v+WRilxyXG4gICAgY2xvc2VCYW5uZXIoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICBpZihjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgbGV0IGNsYXNzTmFtZSA9IFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBrTWFuYWdlclwiO1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kTmFtZSA9IFwiY2xvc2VCYW5uZXJcIjtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZFNpZ25hdHVyZSA9IFwiKClWXCI7Ly/lpoLmnpzmmK9zdHJpbmfvvJpMamF2YS9sYW5nL1N0cmluZzssIGJvb2w6WixpbnQ6SVxyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKGNsYXNzTmFtZSwgbWV0aG9kTmFtZSwgbWV0aG9kU2lnbmF0dXJlKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/lsZXnpLrmj5LlsY/lub/lkYpcclxuICAgIHNob3dJbnRlcnN0aXRpYWwobWVzc2FnZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoVmlwTWFuYWdlci5nZXRJc1ZpcCgpPT10cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY3VyVGltZT1uZXcgRGF0ZSgpLmdldFRpbWUoKTsgXHJcbiAgICAgICAgbGV0IGlzQ2FuQWQ9ZmFsc2U7XHJcbiAgICAgICAgaWYoY3VyVGltZS10aGlzLnBlcnZfaW5zdF90aW1lPjEwMDAqMTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpc0NhbkFkPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucGVydl9pbnN0X3RpbWU9Y3VyVGltZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaXNDYW5BZD09ZmFsc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGlmKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgIC8vICAgICBsZXQgY2xhc3NOYW1lID0gXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BcGtNYW5hZ2VyXCI7XHJcbiAgICAgICAgLy8gICAgIGxldCBtZXRob2ROYW1lID0gXCJzaG93SW50ZXJzdGl0aWFsXCI7XHJcbiAgICAgICAgLy8gICAgIGxldCBtZXRob2RTaWduYXR1cmUgPSBcIigpVlwiOy8v5aaC5p6c5pivc3RyaW5n77yaTGphdmEvbGFuZy9TdHJpbmc7LCBib29sOlosaW50OklcclxuICAgICAgICAvLyAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChjbGFzc05hbWUsIG1ldGhvZE5hbWUsIG1ldGhvZFNpZ25hdHVyZSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG4gICAgLy/lsZXnpLrop4bpopHlub/lkYpcclxuICAgIHNob3dWaWRlbyhjYWxsYmFjazooaXNTdWM6Ym9vbGVhbik9PnZvaWQsdHlwZTpWSURFT19UWVBFKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMTEzKSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgLy8g5ZGo5Y2h5YWN6KeG6aKR54m55p2DXHJcbiAgICAgICAgaWYoRGluZ1l1ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRXZWVrSW5mbygpLmlzX2J1eSA9PSB0cnVlICYmIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuV2Vla0NhcmRGcmVlQWROdW0pID4gMCl7XHJcbiAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LldlZWtDYXJkRnJlZUFkTnVtLFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuV2Vla0NhcmRGcmVlQWROdW0pIC0gMSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRDYWxsYmFjaz1jYWxsYmFjaztcclxuICAgICAgICAgICAgdGhpcy5hZFJlc3VsdCgxKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoSXNEZWJ1Zz09dHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRDYWxsYmFjaz1jYWxsYmFjaztcclxuICAgICAgICAgICAgdGhpcy5hZFJlc3VsdCgxKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihWaXBNYW5hZ2VyLnN1YlZpcEZyZWVOdW0oKT09dHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5piv5ZCm6KaBVklQ5o+Q56S6ICBcclxuICAgICAgICAgICAgY2FsbGJhY2sodHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ngrnlh7vop4bpopHmkq3mlL7lpZblirHnjqnlrrbmlbApO1xyXG4gICAgICAgIHRoaXMuYWRDYWxsYmFjaz1jYWxsYmFjaztcclxuICAgICAgICBpZihjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgbGV0IGNsYXNzTmFtZSA9IFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBrTWFuYWdlclwiO1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kTmFtZSA9IFwic2hvd1ZpZGVvXCI7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2RTaWduYXR1cmUgPSBcIihJKVZcIjsvL+WmguaenOaYr3N0cmluZ++8mkxqYXZhL2xhbmcvU3RyaW5nOywgYm9vbDpaLGludDpJXHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoY2xhc3NOYW1lLCBtZXRob2ROYW1lLCBtZXRob2RTaWduYXR1cmUsdHlwZSk7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKElzRGVidWcpXHJcbiAgICAgICAgICAgIHRoaXMuYWRSZXN1bHQoMSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5hZFJlc3VsdCgwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/lsZXnpLrop4bpopHlub/lkYpcclxuICAgIHNob3dJbnRlclZpZGVvKGNhbGxiYWNrOihpc1N1Yzpib29sZWFuKT0+dm9pZCx0eXBlOklOVEVSX1ZJREVPX1RZUEUpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gaWYoSXNEZWJ1Zz09dHJ1ZSlcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuYWRDYWxsYmFjaz1jYWxsYmFjaztcclxuICAgICAgICAvLyAgICAgdGhpcy5hZFJlc3VsdCgxKTtcclxuICAgICAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIH0gICAgICAgIFxyXG4gICAgICAgIC8vRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLueCueWHu+inhumikeaSreaUvuWlluWKseeOqeWutuaVsCk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAxMTMpKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLmludGVyVmlkZW9SZXN1bHQ9Y2FsbGJhY2s7XHJcbiAgICAgICAgaWYoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgIGxldCBjbGFzc05hbWUgPSBcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0Fwa01hbmFnZXJcIjtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZE5hbWUgPSBcInNob3dJbnRlclZpZGVvXCI7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2RTaWduYXR1cmUgPSBcIihJKVZcIjsvL+WmguaenOaYr3N0cmluZ++8mkxqYXZhL2xhbmcvU3RyaW5nOywgYm9vbDpaLGludDpJXHJcbiAgICAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoY2xhc3NOYW1lLCBtZXRob2ROYW1lLCBtZXRob2RTaWduYXR1cmUsdHlwZSk7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKElzRGVidWcpXHJcbiAgICAgICAgICAgIHRoaXMuaW50ZXJWaWRlb1Jlc3VsdCgxKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLmludGVyVmlkZW9SZXN1bHQoMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5pi+56S66IGU57O75oiR5Lus6ZO+5o6lXHJcbiAgICBzaG93Q2FsbE1lKClcclxuICAgIHtcclxuICAgICAgICAvLyBpZihjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAvLyAgICAgbGV0IGNsYXNzTmFtZSA9IFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBrTWFuYWdlclwiO1xyXG4gICAgICAgIC8vICAgICBsZXQgbWV0aG9kTmFtZSA9IFwic2hvd0NhbGxNZVwiO1xyXG4gICAgICAgIC8vICAgICBsZXQgbWV0aG9kU2lnbmF0dXJlID0gXCIoKVZcIjsvL+WmguaenOaYr3N0cmluZ++8mkxqYXZhL2xhbmcvU3RyaW5nOywgYm9vbDpaLGludDpJXHJcbiAgICAgICAgLy8gICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoY2xhc3NOYW1lLCBtZXRob2ROYW1lLCBtZXRob2RTaWduYXR1cmUpOyAgICAgICAgICAgIFxyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuICAgIC8v5Z+L54K5XHJcbiAgICBmb2xsb3dFdmVudChldmVudE5hbWU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIGlmKENVUl9QbGF0Zm9ybT09UmVsZWFzZV9QbGF0Zm9ybS5BUEspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBpZihjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgLy8gICAgIGxldCBjbGFzc05hbWUgPSBcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0Fwa01hbmFnZXJcIjtcclxuICAgICAgICAgICAgLy8gICAgIGxldCBtZXRob2ROYW1lID0gXCJmb2xsb3dFdmVudFwiO1xyXG4gICAgICAgICAgICAvLyAgICAgbGV0IG1ldGhvZFNpZ25hdHVyZSA9IFwiKExqYXZhL2xhbmcvU3RyaW5nOylWXCI7Ly/lpoLmnpzmmK9zdHJpbmfvvJpMamF2YS9sYW5nL1N0cmluZzssIGJvb2w6WixpbnQ6SVxyXG4gICAgICAgICAgICAvLyAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChjbGFzc05hbWUsIG1ldGhvZE5hbWUsIG1ldGhvZFNpZ25hdHVyZSxldmVudE5hbWUpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG4gICAgLy/mo4DmtYvorqLpmIXkv6Hmga9cclxuICAgIGNoZWFrRFlJbmZvKClcclxuICAgIHtcclxuICAgICAgICAvL2lmKENVUl9QbGF0Zm9ybT09UmVsZWFzZV9QbGF0Zm9ybS5BUEspXHJcbiAgICAgICAgLy8gaWYoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgLy8gICAgIGxldCBjbGFzc05hbWUgPSBcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0Fwa01hbmFnZXJcIjtcclxuICAgICAgICAvLyAgICAgbGV0IG1ldGhvZE5hbWUgPSBcImNoZWFrRFlJbmZvXCI7XHJcbiAgICAgICAgLy8gICAgIGxldCBtZXRob2RTaWduYXR1cmUgPSBcIigpVlwiOy8v5aaC5p6c5pivc3RyaW5n77yaTGphdmEvbGFuZy9TdHJpbmc7LCBib29sOlosaW50OklcclxuICAgICAgICAvLyAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChjbGFzc05hbWUsIG1ldGhvZE5hbWUsIG1ldGhvZFNpZ25hdHVyZSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgLy8gICAgIGlmKElzRGVidWcpe1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1RpYW9LdWFuKClcclxuICAgIHtcclxuICAgICAgICBpZihDVVJfUGxhdGZvcm09PVJlbGVhc2VfUGxhdGZvcm0uQVBLKVxyXG4gICAgICAgIGlmKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lID0gXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BcGtNYW5hZ2VyXCI7XHJcbiAgICAgICAgICAgIGxldCBtZXRob2ROYW1lID0gXCJzaG93VGlhb0t1YW5cIjtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZFNpZ25hdHVyZSA9IFwiKClWXCI7Ly/lpoLmnpzmmK9zdHJpbmfvvJpMamF2YS9sYW5nL1N0cmluZzssIGJvb2w6WixpbnQ6SVxyXG4gICAgICAgICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKGNsYXNzTmFtZSwgbWV0aG9kTmFtZSwgbWV0aG9kU2lnbmF0dXJlKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNob3dEaW5nWXVlKGR5OkRpbmdZdWUsaWQ6c3RyaW5nKVxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5keT1keTtcclxuICAgICAgICBpZihJc0RlYnVnKXtcclxuICAgICAgICAgICAgdGhpcy5keVJlc3VsdCgxKTtcclxuICAgICAgICAgICAgUGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVQYXlOdW0oaWQsMSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgLy8gICAgIGxldCBjbGFzc05hbWUgPSBcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0Fwa01hbmFnZXJcIjtcclxuICAgICAgICAvLyAgICAgbGV0IG1ldGhvZE5hbWUgPSBcInNob3dEaW5nWXVlXCI7XHJcbiAgICAgICAgLy8gICAgIGxldCBtZXRob2RTaWduYXR1cmUgPSBcIihMamF2YS9sYW5nL1N0cmluZzspVlwiOy8v5aaC5p6c5pivc3RyaW5n77yaTGphdmEvbGFuZy9TdHJpbmc7LCBib29sOlosaW50OklcclxuICAgICAgICAvLyAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChjbGFzc05hbWUsIG1ldGhvZE5hbWUsIG1ldGhvZFNpZ25hdHVyZSxpZCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuZHlSZXN1bHQoMSk7XHJcbiAgICAgICAgLy99XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VmlwSW5mbyhjYWxsYmFjazpGdW5jdGlvbilcclxuICAgIHtcclxuICAgICAgICB0aGlzLnVwbG9hZENhbGxiYWNrPWNhbGxiYWNrO1xyXG4gICAgICAgIGxldCB1aWQ9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VySUQoKTtcclxuICAgICAgICAvLyBpZihjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAvLyAgICAgbGV0IGNsYXNzTmFtZSA9IFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBrTWFuYWdlclwiO1xyXG4gICAgICAgIC8vICAgICBsZXQgbWV0aG9kTmFtZSA9IFwiZ2V0VmlwSW5mb1wiO1xyXG4gICAgICAgIC8vICAgICBsZXQgbWV0aG9kU2lnbmF0dXJlID0gXCIoTGphdmEvbGFuZy9TdHJpbmc7KVZcIjsvL+WmguaenOaYr3N0cmluZ++8mkxqYXZhL2xhbmcvU3RyaW5nOywgYm9vbDpaLGludDpJXHJcbiAgICAgICAgLy8gICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoY2xhc3NOYW1lLCBtZXRob2ROYW1lLCBtZXRob2RTaWduYXR1cmUsdWlkKTsgICAgICAgICAgICBcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1BheShwYXk6UGF5LHR5cGU6c3RyaW5nKXtcclxuICAgICAgICB0aGlzLnBheT1wYXk7XHJcbiAgICAgICAgaWYoSXNEZWJ1Zyl7XHJcbiAgICAgICAgICAgIHRoaXMucGF5UmVzdWx0KDEpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dQYXlXYWl0aW5nVWkoKTtcclxuICAgICAgICAvLyBpZihjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAvLyAgICAgbGV0IGNsYXNzTmFtZSA9IFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBrTWFuYWdlclwiO1xyXG4gICAgICAgIC8vICAgICBsZXQgbWV0aG9kTmFtZSA9IFwic2hvd1BheVwiO1xyXG4gICAgICAgIC8vICAgICBsZXQgbWV0aG9kU2lnbmF0dXJlID0gXCIoTGphdmEvbGFuZy9TdHJpbmc7KVZcIjsvL+WmguaenOaYr3N0cmluZ++8mkxqYXZhL2xhbmcvU3RyaW5nOywgYm9vbDpaLGludDpJXHJcbiAgICAgICAgLy8gICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoY2xhc3NOYW1lLCBtZXRob2ROYW1lLCBtZXRob2RTaWduYXR1cmUsdHlwZSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMucGF5UmVzdWx0KDEpO1xyXG4gICAgICAgIC8vfVxyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeeZu+W9leS6pOS6ki0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgdXBsb2FkQW5kR2V0VWlkKGNhbGxiYWNrOkZ1bmN0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudXBsb2FkQ2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICAgICAgbGV0IG1heExldmVsPUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbDtcclxuICAgICAgICBsZXQgb25saW5lVGltZT1HYW1lRGF0YS5nZXRUb3RhbFRpbWUoKTtcclxuICAgICAgICBsZXQgbmFtZT1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJOYW1lKCk7XHJcbiAgICAgICAgLy8gaWYoY2Muc3lzLmlzTmF0aXZlKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgbGV0IGNsYXNzTmFtZSA9IFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBrTWFuYWdlclwiO1xyXG4gICAgICAgIC8vICAgICBsZXQgbWV0aG9kTmFtZSA9IFwidXBsb2FkQW5kR2V0VWlkXCI7XHJcbiAgICAgICAgLy8gICAgIGxldCBtZXRob2RTaWduYXR1cmUgPSBcIihJSUxqYXZhL2xhbmcvU3RyaW5nOylWXCI7Ly/lpoLmnpzmmK9zdHJpbmfvvJpMamF2YS9sYW5nL1N0cmluZzssIGJvb2w6WixpbnQ6SVxyXG4gICAgICAgIC8vICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKGNsYXNzTmFtZSwgbWV0aG9kTmFtZSwgbWV0aG9kU2lnbmF0dXJlLG1heExldmVsLG9ubGluZVRpbWUsbmFtZSk7XHJcbiAgICAgICAgLy8gfWVsc2VcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgICAgIHRoaXMudXBsb2FkUmVzdWx0KEpTT04uc3RyaW5naWZ5KHt1aWQ6VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VySUQoKSx2aXA6JzAnfSkpO1xyXG4gICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIHVwbG9hZE9ubGluZVRpbWUoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBtYXhMZXZlbD1MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWw7XHJcbiAgICAgICAgbGV0IG9ubGluZVRpbWU9R2FtZURhdGEuZ2V0VG90YWxUaW1lKCk7XHJcbiAgICAgICAgbGV0IHVpZD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpO1xyXG4gICAgICAgIGlmKHVpZD09JycpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIGlmKGNjLnN5cy5pc05hdGl2ZSlcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIGxldCBjbGFzc05hbWUgPSBcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0Fwa01hbmFnZXJcIjtcclxuICAgICAgICAvLyAgICAgbGV0IG1ldGhvZE5hbWUgPSBcInVwbG9hZE9ubGluZVRpbWVcIjtcclxuICAgICAgICAvLyAgICAgbGV0IG1ldGhvZFNpZ25hdHVyZSA9IFwiKElJTGphdmEvbGFuZy9TdHJpbmc7KVZcIjsvL+WmguaenOaYr3N0cmluZ++8mkxqYXZhL2xhbmcvU3RyaW5nOywgYm9vbDpaLGludDpJXHJcbiAgICAgICAgLy8gICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoY2xhc3NOYW1lLCBtZXRob2ROYW1lLCBtZXRob2RTaWduYXR1cmUsbWF4TGV2ZWwsb25saW5lVGltZSx1aWQpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBsb2dpbkZvckZCKGNhbGxiYWNrOkZ1bmN0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudXBsb2FkQ2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICAgICAgbGV0IG1heExldmVsPUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbDtcclxuICAgICAgICBsZXQgb25saW5lVGltZT1HYW1lRGF0YS5nZXRUb3RhbFRpbWUoKTtcclxuICAgICAgICAvLyBpZihjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAvLyAgICAgbGV0IGNsYXNzTmFtZSA9IFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBrTWFuYWdlclwiO1xyXG4gICAgICAgIC8vICAgICBsZXQgbWV0aG9kTmFtZSA9IFwibG9naW5Gb3JGQlwiO1xyXG4gICAgICAgIC8vICAgICBsZXQgbWV0aG9kU2lnbmF0dXJlID0gXCIoSUkpVlwiOy8v5aaC5p6c5pivc3RyaW5n77yaTGphdmEvbGFuZy9TdHJpbmc7LCBib29sOlosaW50OklcclxuICAgICAgICAvLyAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChjbGFzc05hbWUsIG1ldGhvZE5hbWUsIG1ldGhvZFNpZ25hdHVyZSxtYXhMZXZlbCxvbmxpbmVUaW1lKTsgICAgICAgICAgICBcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgbG9naW5Gb3JHb29nbGUoY2FsbGJhY2s6RnVuY3Rpb24pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy51cGxvYWRDYWxsYmFjaz1jYWxsYmFjaztcclxuICAgICAgICBsZXQgbWF4TGV2ZWw9TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsO1xyXG4gICAgICAgIGxldCBvbmxpbmVUaW1lPUdhbWVEYXRhLmdldFRvdGFsVGltZSgpO1xyXG4gICAgICAgIC8vIGlmKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgIC8vICAgICBsZXQgY2xhc3NOYW1lID0gXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BcGtNYW5hZ2VyXCI7XHJcbiAgICAgICAgLy8gICAgIGxldCBtZXRob2ROYW1lID0gXCJsb2dpbkZvckdvb2dsZVwiO1xyXG4gICAgICAgIC8vICAgICBsZXQgbWV0aG9kU2lnbmF0dXJlID0gXCIoSUkpVlwiOy8v5aaC5p6c5pivc3RyaW5n77yaTGphdmEvbGFuZy9TdHJpbmc7LCBib29sOlosaW50OklcclxuICAgICAgICAvLyAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChjbGFzc05hbWUsIG1ldGhvZE5hbWUsIG1ldGhvZFNpZ25hdHVyZSxtYXhMZXZlbCxvbmxpbmVUaW1lKTsgICAgICAgICAgICBcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VWlkKClcclxuICAgIHtcclxuICAgICAgICAvLyBpZihDVVJfUGxhdGZvcm09PVJlbGVhc2VfUGxhdGZvcm0uQVBLICYmIGNjLnN5cy5pc05hdGl2ZSlcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIGxldCB1aWQ9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VySUQoKTtcclxuICAgICAgICAvLyAgICAgbGV0IGNsYXNzTmFtZSA9IFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBrTWFuYWdlclwiO1xyXG4gICAgICAgIC8vICAgICBsZXQgbWV0aG9kTmFtZSA9IFwic2V0VWlkXCI7XHJcbiAgICAgICAgLy8gICAgIGxldCBtZXRob2RTaWduYXR1cmUgPSBcIihMamF2YS9sYW5nL1N0cmluZzspVlwiOy8v5aaC5p6c5pivc3RyaW5n77yaTGphdmEvbGFuZy9TdHJpbmc7LCBib29sOlosaW50OklcclxuICAgICAgICAvLyAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChjbGFzc05hbWUsIG1ldGhvZE5hbWUsIG1ldGhvZFNpZ25hdHVyZSx1aWQpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRBbmRyb2lkTGFuZ3VhZ2UoKVxyXG4gICAge1xyXG4gICAgICAgIC8vIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAvLyAgICAgbGV0IGNsYXNzTmFtZSA9IFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBrTWFuYWdlclwiO1xyXG4gICAgICAgIC8vICAgICBsZXQgbWV0aG9kTmFtZSA9IFwiZ2V0QW5kcm9pZExhbmd1YWdlXCI7XHJcbiAgICAgICAgLy8gICAgIGxldCBtZXRob2RTaWduYXR1cmUgPSBcIigpVlwiOy8v5aaC5p6c5pivc3RyaW5n77yaTGphdmEvbGFuZy9TdHJpbmc7LCBib29sOlosaW50OklcclxuICAgICAgICAvLyAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChjbGFzc05hbWUsIG1ldGhvZE5hbWUsIG1ldGhvZFNpZ25hdHVyZSk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRBQlRlc3RQYXIoKVxyXG4gICAge1xyXG4gICAgICAgIC8vIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAvLyAgICAgbGV0IGNsYXNzTmFtZSA9IFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBrTWFuYWdlclwiO1xyXG4gICAgICAgIC8vICAgICBsZXQgbWV0aG9kTmFtZSA9IFwiZ2V0QUJUZXN0UGFyXCI7XHJcbiAgICAgICAgLy8gICAgIGxldCBtZXRob2RTaWduYXR1cmUgPSBcIigpVlwiOy8v5aaC5p6c5pivc3RyaW5n77yaTGphdmEvbGFuZy9TdHJpbmc7LCBib29sOlosaW50OklcclxuICAgICAgICAvLyAgICAganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChjbGFzc05hbWUsIG1ldGhvZE5hbWUsIG1ldGhvZFNpZ25hdHVyZSk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6K6p5omL5py66ZyH5Yqo5LiA5LiLXHJcbiAgICAgKiBAcGFyYW0gZHQg6ZyH5Yqo5pe26Ze077yM5q+r56eS77yI5pW05pWw77yJXHJcbiAgICAgKi9cclxuICAgIGJlVmlicmF0ZShkdDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gaWYoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgLy8gICAgIGxldCBjbGFzc05hbWUgPSBcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0Fwa01hbmFnZXJcIjtcclxuICAgICAgICAvLyAgICAgbGV0IG1ldGhvZE5hbWUgPSBcImJlVmlicmF0ZVwiO1xyXG4gICAgICAgIC8vICAgICBsZXQgbWV0aG9kU2lnbmF0dXJlID0gXCIoSSlWXCI7Ly/lpoLmnpzmmK9zdHJpbmfvvJpMamF2YS9sYW5nL1N0cmluZzssIGJvb2w6WixpbnQ6SVxyXG4gICAgICAgIC8vICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKGNsYXNzTmFtZSwgbWV0aG9kTmFtZSwgbWV0aG9kU2lnbmF0dXJlLGR0KTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBnZXREaW5nWXVlSW5mbyhkeUluZm86RGluZ1l1ZSl7XHJcbiAgICAgICAgdGhpcy5keV9pbmZvX2NhbGxiYWNrPWR5SW5mbzsgICAgICAgIFxyXG4gICAgICAgIC8vIGlmKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgIC8vICAgICBsZXQgY2xhc3NOYW1lID0gXCJvcmcvY29jb3MyZHgvamF2YXNjcmlwdC9BcGtNYW5hZ2VyXCI7XHJcbiAgICAgICAgLy8gICAgIGxldCBtZXRob2ROYW1lID0gXCJnZXREaW5nWXVlSW5mb1wiO1xyXG4gICAgICAgIC8vICAgICBsZXQgbWV0aG9kU2lnbmF0dXJlID0gXCIoKVZcIjsvL+WmguaenOaYr3N0cmluZ++8mkxqYXZhL2xhbmcvU3RyaW5nOywgYm9vbDpaLGludDpJXHJcbiAgICAgICAgLy8gICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoY2xhc3NOYW1lLCBtZXRob2ROYW1lLCBtZXRob2RTaWduYXR1cmUpOyAgICAgICAgICAgIFxyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuICAgIC8qKuiwg+eUqGFuZHJvaWTojrflvpfmlK/ku5jkv6Hmga8gKi9cclxuICAgIGdldFBheUluZm9zKHBheUluZm86UGF5KXtcclxuICAgICAgICB0aGlzLnBheV9pbmZvX2NhbGxiYWNrPXBheUluZm87XHJcbiAgICAgICAgaWYoSXNEZWJ1Zyl7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGVzdFBheUluZm8oKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZihjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAvLyAgICAgbGV0IGNsYXNzTmFtZSA9IFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBrTWFuYWdlclwiO1xyXG4gICAgICAgIC8vICAgICBsZXQgbWV0aG9kTmFtZSA9IFwiZ2V0UGF5SW5mb3NcIjtcclxuICAgICAgICAvLyAgICAgbGV0IG1ldGhvZFNpZ25hdHVyZSA9IFwiKClWXCI7Ly/lpoLmnpzmmK9zdHJpbmfvvJpMamF2YS9sYW5nL1N0cmluZzssIGJvb2w6WixpbnQ6SVxyXG4gICAgICAgIC8vICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKGNsYXNzTmFtZSwgbWV0aG9kTmFtZSwgbWV0aG9kU2lnbmF0dXJlKTsgICAgICAgICAgICBcclxuICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zZXRUZXN0UGF5SW5mbygpO1xyXG4gICAgICAgIC8vfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuiwg+eUqGFuZHJvaWQqL1xyXG4gICAganVtcFRvR1AoKXtcclxuICAgICAgICAvLyBpZihjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAvLyAgICAgbGV0IGNsYXNzTmFtZSA9IFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBrTWFuYWdlclwiO1xyXG4gICAgICAgIC8vICAgICBsZXQgbWV0aG9kTmFtZSA9IFwianVtcFRvR1BcIjtcclxuICAgICAgICAvLyAgICAgbGV0IG1ldGhvZFNpZ25hdHVyZSA9IFwiKClWXCI7Ly/lpoLmnpzmmK9zdHJpbmfvvJpMamF2YS9sYW5nL1N0cmluZzssIGJvb2w6WixpbnQ6SVxyXG4gICAgICAgIC8vICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKGNsYXNzTmFtZSwgbWV0aG9kTmFtZSwgbWV0aG9kU2lnbmF0dXJlKTsgICAgICAgICAgICBcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGFja2FnZUluZm8oY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMucGFja2FnZV9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgICAgICAvLyBpZihjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAvLyAgICAgbGV0IGNsYXNzTmFtZSA9IFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvQXBrTWFuYWdlclwiO1xyXG4gICAgICAgIC8vICAgICBsZXQgbWV0aG9kTmFtZSA9IFwiZ2V0UGFja2FnZUluZm9cIjtcclxuICAgICAgICAvLyAgICAgbGV0IG1ldGhvZFNpZ25hdHVyZSA9IFwiKClWXCI7Ly/lpoLmnpzmmK9zdHJpbmfvvJpMamF2YS9sYW5nL1N0cmluZzssIGJvb2w6WixpbnQ6SVxyXG4gICAgICAgIC8vICAgICBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKGNsYXNzTmFtZSwgbWV0aG9kTmFtZSwgbWV0aG9kU2lnbmF0dXJlKTsgICAgICAgICAgICBcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRUZXN0UGF5SW5mbygpe1xyXG4gICAgICAgIHRoaXMuc2V0UGF5SW5mb3MoW3sgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYjIwMVwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NDAwXCIsIFwiY3VycmVuY3lcIjogXCJLUldcIiwgXCJwYXlfaWRcIjogXCJiNDAxXCIsIFwiaXNfYnV5XCI6IGZhbHNlIH0sIFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYjUwMVwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjkyLDcyNFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzEwMVwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzEwMlwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzEwM1wiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzEwNFwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzEwNVwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzEwNlwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzEwN1wiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzEwOFwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzEwOVwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzExMFwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzIwMVwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzIwMlwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzIwM1wiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzIwNFwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzIwNVwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjg0NFwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzIwNlwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIu+/pjY2NlwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzMwMVwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIiQzXCIsIFwiY3VycmVuY3lcIjogXCJLUldcIiwgXCJwYXlfaWRcIjogXCJjNTAxXCIsIFwiaXNfYnV5XCI6IGZhbHNlIH0sXHJcbiAgICAgICAgeyBcImRlc1wiOiBcImdldCA2MCBjcnlzdGFsc1wiLCBcInByaWNlXCI6IFwiJDNcIiwgXCJjdXJyZW5jeVwiOiBcIktSV1wiLCBcInBheV9pZFwiOiBcImM1MDJcIiwgXCJpc19idXlcIjogZmFsc2UgfSxcclxuICAgICAgICB7IFwiZGVzXCI6IFwiZ2V0IDYwIGNyeXN0YWxzXCIsIFwicHJpY2VcIjogXCIkM1wiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzUwM1wiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIiQzXCIsIFwiY3VycmVuY3lcIjogXCJLUldcIiwgXCJwYXlfaWRcIjogXCJjNTA0XCIsIFwiaXNfYnV5XCI6IGZhbHNlIH0sXHJcbiAgICAgICAgeyBcImRlc1wiOiBcImdldCA2MCBjcnlzdGFsc1wiLCBcInByaWNlXCI6IFwiJDAuMVwiLCBcImN1cnJlbmN5XCI6IFwiS1JXXCIsIFwicGF5X2lkXCI6IFwiYzUwNVwiLCBcImlzX2J1eVwiOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgXCJkZXNcIjogXCJnZXQgNjAgY3J5c3RhbHNcIiwgXCJwcmljZVwiOiBcIiQzXCIsIFwiY3VycmVuY3lcIjogXCJLUldcIiwgXCJwYXlfaWRcIjogXCJjNjAxXCIsIFwiaXNfYnV5XCI6IGZhbHNlIH0sXHJcbiAgICAgICAgeyBcImRlc1wiOiBcImdldCA2MCBjcnlzdGFsc1wiLCBcInByaWNlXCI6IFwiJDNcIiwgXCJjdXJyZW5jeVwiOiBcIktSV1wiLCBcInBheV9pZFwiOiBcImM0MDFcIiwgXCJpc19idXlcIjogZmFsc2UgfSxcclxuICAgIF1cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUpBVkHosIPnlKjljLotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgICBcclxuICAgIC8v5bm/5ZGK57uT5p6c6L+U5ZueXHJcbiAgICAvLzA9ZmFsc2UsMT10cnVlXHJcbiAgICBhZFJlc3VsdChyZXN1bHQpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGFkUmVzdWx0PXBhcnNlSW50KHJlc3VsdCk7XHJcbiAgICAgICAgaWYodGhpcy5hZENhbGxiYWNrIT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoYWRSZXN1bHQ9PTApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZENhbGxiYWNrKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIC8vIGlmKEdhbWVEYXRhLmdldEluc3RhbmNlKCkuZ2V0VG90YWxWaWRlb051bSgpPD0wKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICBHYW1lRGF0YS5nZXRJbnN0YW5jZSgpLmFkZFRvdGFsVmlkZW9OdW0oMSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5hZENhbGxiYWNrKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5hZENhbGxiYWNrKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIC8vIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZENhbGxiYWNrKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7op4LnnIvku7vmhI8x5qyh5bm/5ZGKKTtcclxuICAgICAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u6KeC55yL5Lu75oSPM+asoeW5v+WRiik7XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6I635b6X6KeG6aKR5pKt5pS+5aWW5Yqx546p5a625pWwKTtcclxuICAgICAgICAgICAgICAgIEdhbWVEYXRhLmdldEluc3RhbmNlKCkuYWRkVG90YWxWaWRlb051bSgxKTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5hZENhbGxiYWNrPW51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGludGVyVmlkZW9SZXN1bHQocmVzdWx0KVxyXG4gICAge1xyXG4gICAgICAgIHZhciBhZFJlc3VsdD1wYXJzZUludChyZXN1bHQpO1xyXG4gICAgICAgIGlmKHRoaXMuaW50ZXJWaWRlb0NhbGxiYWNrIT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoYWRSZXN1bHQ9PTApXHJcbiAgICAgICAgICAgICAgICB0aGlzLmludGVyVmlkZW9DYWxsYmFjayhmYWxzZSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnRlclZpZGVvQ2FsbGJhY2sodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAvL0ZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ojrflvpfop4bpopHmkq3mlL7lpZblirHnjqnlrrbmlbApO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmludGVyVmlkZW9DYWxsYmFjaz1udWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhZGRBZExvYWRlZE51bShudW0pe1xyXG4gICAgICAgIGlmKHR5cGVvZiBudW0gPT0gXCJzdHJpbmdcIil7XHJcbiAgICAgICAgICAgIG51bT1wYXJzZUludChudW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkX2xvYWRlZF9udW0rPW51bTtcclxuICAgIH1cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeiuoumYheS6pOS6ki0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBzZXREaW5nWXVlSW5mbyhpbmZvU3RyKXtcclxuICAgICAgICBsZXQgZHlJbmZvcz1uZXcgQXJyYXkoKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxpbmZvU3RyLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGluZm89aW5mb1N0cltpXTtcclxuICAgICAgICAgICAgbGV0IGR5SW5mbz1uZXcgUGF5SW5mbygpO1xyXG4gICAgICAgICAgICBkeUluZm8ucHJpY2U9aW5mby5wcmljZTtcclxuICAgICAgICAgICAgZHlJbmZvLmRlcz1pbmZvLmRlcztcclxuICAgICAgICAgICAgZHlJbmZvLmN1cnJlbmN5PWluZm8uY3VycmVuY3k7XHJcbiAgICAgICAgICAgIGR5SW5mby5pc19idXk9aW5mby5pc19idXk7XHJcbiAgICAgICAgICAgIGR5SW5mby5wYXlfaWQ9aW5mby5wYXlfaWQ7XHJcbiAgICAgICAgICAgIGR5SW5mb3MucHVzaChkeUluZm8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBEaW5nWXVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldENhcmRJbmZvKGR5SW5mb3MpO1xyXG4gICAgICAgIC8vIFtTa3VEZXRhaWxzOiB7XCJwcm9kdWN0SWRcIjpcImM1MDJcIixcInR5cGVcIjpcInN1YnNcIixcInRpdGxlXCI6XCJXZWVrbHkgZ2lmdCAoSWRsZSBIZXJvOiBDYXN0bGUgRGVmZW5zZSlcIixcIm5hbWVcIjpcIldlZWtseSBnaWZ0XCIsXCJkZXNjcmlwdGlvblwiOlwiR2V0IHdlZWtseSBnaWZ0XCIsXCJwcmljZVwiOlwi77+mMSw0MDBcIixcInByaWNlX2Ftb3VudF9taWNyb3NcIjoxNDAwMDAwMDAwLFwicHJpY2VfY3VycmVuY3lfY29kZVwiOlwiS1JXXCIsXCJza3VEZXRhaWxzVG9rZW5cIjpcIkFFdWhwNEpINGtVdVFmQVZkX19wQ25NTEV6UFNHNWZ5MW1CbmgxSmtMZmRTdXA2Z01BWnVGSF9mb3RrbnB1eE5XV3VjRGhpcnhEZUJxVGFCWVIzaG9FRXNzQlFBTk9mTlJmU285Y285TWc4PVwiLFwic3Vic2NyaXB0aW9uUGVyaW9kXCI6XCJQMVdcIixcImludHJvZHVjdG9yeVByaWNlQW1vdW50TWljcm9zXCI6MTAwMDAwMDAwLFwiaW50cm9kdWN0b3J5UHJpY2VQZXJpb2RcIjpcIlAxV1wiLFwiaW50cm9kdWN0b3J5UHJpY2VcIjpcIu+/pjEwMFwiLFwiaW50cm9kdWN0b3J5UHJpY2VDeWNsZXNcIjoxfV1cclxuICAgIH1cclxuICAgIHNldFBheUluZm9zKGluZm9TdHIpe1xyXG4gICAgICAgIGxldCBkeUluZm9zPW5ldyBBcnJheSgpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGluZm9TdHIubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgaW5mbz1pbmZvU3RyW2ldO1xyXG4gICAgICAgICAgICBsZXQgZHlJbmZvPW5ldyBQYXlJbmZvKCk7XHJcbiAgICAgICAgICAgIGR5SW5mby5wcmljZT1pbmZvLnByaWNlO1xyXG4gICAgICAgICAgICBkeUluZm8uZGVzPWluZm8uZGVzO1xyXG4gICAgICAgICAgICBkeUluZm8uY3VycmVuY3k9aW5mby5jdXJyZW5jeTtcclxuICAgICAgICAgICAgZHlJbmZvLmlzX2J1eT1pbmZvLmlzX2J1eTtcclxuICAgICAgICAgICAgZHlJbmZvLnBheV9pZD1pbmZvLnBheV9pZDtcclxuICAgICAgICAgICAgZHlJbmZvcy5wdXNoKGR5SW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdGhpcy5wYXlfaW5mb19jYWxsYmFjay5pbmZvKGR5SW5mb3MpO1xyXG4gICAgICAgIFBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRQYXlJbmZvcyhkeUluZm9zKTtcclxuICAgIH1cclxuICAgIC8v6K6i6ZiF57uT5p6c6L+U5ZueXHJcbiAgICBkeVJlc3VsdChyZXN1bHQpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGFkUmVzdWx0PXBhcnNlSW50KHJlc3VsdCk7XHJcbiAgICAgICAgaWYodGhpcy5keSE9bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGFkUmVzdWx0PT0wKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5keS5yZXN1bHQoZmFsc2UpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHkucmVzdWx0KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuiuoumYheaIkOWKn+eOqeWutuaVsCk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuZHk9bnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwYXlSZXN1bHQocmVzdWx0KVxyXG4gICAge1xyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNsb3NlUGF5V2FpdGluZ1VpKCk7XHJcbiAgICAgICAgdmFyIHBheVJlc3VsdD1wYXJzZUludChyZXN1bHQpO1xyXG4gICAgICAgIGlmKHRoaXMucGF5IT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYocGF5UmVzdWx0PT0wKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXkucmVzdWx0KGZhbHNlKVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGF5LnJlc3VsdCh0cnVlKVxyXG4gICAgICAgICAgICAgICAgLy9Gb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6K6i6ZiF5oiQ5Yqf546p5a625pWwKTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5wYXk9bnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbm90aWZ5UGF5U3RhdGUocGF5SWQpe1xyXG4gICAgICAgIGxldCBpZD1wYXJzZUludChwYXlJZCk7XHJcbiAgICAgICAgUGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJld2FyZEJ5SWQoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K6i6ZiF5L+h5oGv6K6+572uXHJcbiAgICBkeUluZm8oaW5mb1N0cilcclxuICAgIHtcclxuICAgICAgICAvL+WPkei/h+adpeebtOaOpeWwseaYr0pTT07moLzlvI/kuoZcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdkeUluZm86Jyk7XHJcbiAgICAgICAgLy8gbGV0IGluZm9zPUpTT04uc3RyaW5naWZ5KGluZm9TdHIpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGluZm9zKTtcclxuICAgICAgICAvLyBWaXBNYW5hZ2VyLmR5X2luZm89bmV3IEFycmF5KCk7XHJcbiAgICAgICAgLy8gZm9yKGxldCBpPTA7IGk8MzsgaSsrKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgbGV0IGluZm89aW5mb1N0cltpXTtcclxuICAgICAgICAvLyAgICAgbGV0IGR5SW5mbz1uZXcgRFlJbmZvKCk7XHJcbiAgICAgICAgLy8gICAgIGR5SW5mby5wcmljZT1pbmZvLnByaWNlO1xyXG4gICAgICAgIC8vICAgICBkeUluZm8uZGVzPWluZm8uZGVzO1xyXG4gICAgICAgIC8vICAgICBkeUluZm8uY3VycmVuY3k9aW5mby5jdXJyZW5jeTtcclxuICAgICAgICAvLyAgICAgVmlwTWFuYWdlci5keV9pbmZvLnB1c2goZHlJbmZvKTtcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coaW5mby5wcmljZSsnLScraW5mby5jdXJyZW5jeSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG4gICAgLy92aXDorr7nva5cclxuICAgIHNldFZpcChsZXZlbClcclxuICAgIHtcclxuICAgICAgICAvL1ZpcE1hbmFnZXIuc2F2ZVZpcChsZXZlbCk7XHJcbiAgICB9XHJcbiAgICAvL+a4uOaIj+eJiOacrOWPt+iuvue9rlxyXG4gICAgc2V0VmVyc2lvbih2ZXIpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZXRWZXJzaW9uXCIrdmVyKTtcclxuICAgICAgICBVc2VyRGF0YS5nZXRJbnN0YW5jZSgpLnNhdmVWZXJzaW9uKHZlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t55m75b2VLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8v55m75b2V57uT5p6c6L+U5ZueXHJcbiAgICB1cGxvYWRSZXN1bHQodXNlckluZm8pXHJcbiAgICB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhsb2dpbkluZm8pO1xyXG4gICAgICAgIHRoaXMudXBsb2FkQ2FsbGJhY2sodXNlckluZm8pO1xyXG4gICAgICAgIHRoaXMudXBsb2FkQ2FsbGJhY2s9bnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRMYW5ndWFnZSh0eXBlKVxyXG4gICAge1xyXG4gICAgICAgIGNjLmxvZygnc2V0TGFuZ3VhZ2XvvJonK3R5cGUpO1xyXG4gICAgICAgIExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldExhbmd1YWdlKHR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dHYW1lRXhpdCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zY2VuZSE9R2FtZVNjZW5lLmxvYWQpXHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93RGlhbG9nKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmluZyhMYW5ndWFnZUluZGV4LkRvX3lvdV9yZWFsbHlfd2FudF90b19xdWl0X2dhbWUpLCgpPT57XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc2NlbmU9PUdhbWVTY2VuZS5nYW1lKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLumAgOWHuuaMkeaImOWFs+WNoStMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydF9sZXZlbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/nu5PmnZ/muLjmiI9cclxuICAgICAgICAgICAgR2FtZURhdGEuZ2V0SW5zdGFuY2UoKS5zYXZlRXhpdFRpbWUoKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbmQoKTtcclxuICAgICAgICAgICAgfSwxMDApO1xyXG4gICAgICAgIH0sKCk9PntcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICB9LDApO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+aYr+S4gOS4qmpzb27moLzlvI/nmoTlrZfnrKbkuLJcclxuICAgIHNldEFCVGVzdFBhcihwYXIpXHJcbiAgICB7ICAgICAgICBcclxuICAgICAgICBBQlRlc3RNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0QUJUZXN0UGFyKHBhcik7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGFja2FnZUluZm8oaW5mbyl7XHJcbiAgICAgICAgbGV0IGpzb249SlNPTi5wYXJzZShpbmZvKTtcclxuICAgICAgICB0aGlzLnBhY2thZ2VfbmFtZT1qc29uLnBhY2thZ2VfbmFtZTtcclxuICAgICAgICB0aGlzLmFwcF92ZXI9anNvbi5hcHBfdmVyO1xyXG4gICAgICAgIHRoaXMuYXBwX2NvZGU9anNvbi5hcHBfY29kZTtcclxuICAgICAgICB0aGlzLnBsbW49anNvbi5wbG1uO1xyXG4gICAgICAgIHRoaXMuYWlkPWpzb24uYWlkO1xyXG4gICAgICAgIHRoaXMuZGlkPWpzb24uZGlkO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucGFja2FnZV9uYW1lLHRoaXMuYXBwX3Zlcix0aGlzLmFwcF9jb2RlLHRoaXMucGxtbix0aGlzLmFpZCx0aGlzLmRpZCxqc29uLm5ldHdvcmspO1xyXG4gICAgICAgIFVzZXJEYXRhLmdldEluc3RhbmNlKCkuSHR0cFBvc3RHZXRVc2VySWQodGhpcy5kaWQsanNvbi5uZXR3b3JrKTtcclxuICAgIH1cclxufVxyXG5cclxuIl19