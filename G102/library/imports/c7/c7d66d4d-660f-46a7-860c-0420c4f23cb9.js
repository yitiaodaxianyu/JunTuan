"use strict";
cc._RF.push(module, 'c7d661NZg9Gp4YMBCDE8jy5', 'FunctionDefinition');
// Scripts/JsonData/FunctionDefinition.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionDefinitionManager = exports.JsonFunctionDefinition = void 0;
var ActivityManager_1 = require("../Activity/ActivityManager");
var Constants_1 = require("../Constants");
var LevelManager_1 = require("../Level/LevelManager");
var LoadManager_1 = require("../Loading/LoadManager");
var UserData_1 = require("../UserData");
var JsonFunctionDefinition = /** @class */ (function () {
    function JsonFunctionDefinition() {
        /**功能ID */
        this.FunctionID = 0;
        /**功能名文本 */
        this.TextID = 0;
        /**解锁条件类型 */
        this.UnlockConditionType = 0;
        /**解锁条件参数 */
        this.UnlockCondictionParameter = 0;
    }
    return JsonFunctionDefinition;
}());
exports.JsonFunctionDefinition = JsonFunctionDefinition;
var FunctionDefinitionManager = /** @class */ (function () {
    function FunctionDefinitionManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    FunctionDefinitionManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new FunctionDefinitionManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    FunctionDefinitionManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    FunctionDefinitionManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('FunctionDefinition', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonFunctionDefinition成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonFunctionDefinition();
                jsonData = json[i];
                _this.data.set(jsonData.FunctionID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    FunctionDefinitionManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    FunctionDefinitionManager.prototype.getJsonFunctionDefinition = function (id) {
        return this.data.get(id);
    };
    /**根据功能ID获取功能名文本 */
    FunctionDefinitionManager.prototype.getTextID = function (id) {
        return this.data.get(id).TextID;
    };
    /**根据功能ID获取解锁条件类型 */
    FunctionDefinitionManager.prototype.getUnlockConditionType = function (id) {
        return this.data.get(id).UnlockConditionType;
    };
    /**根据功能ID获取解锁条件参数 */
    FunctionDefinitionManager.prototype.getUnlockCondictionParameter = function (id) {
        return this.data.get(id).UnlockCondictionParameter;
    };
    /** 静态方法，获取最大的 功能ID*/
    FunctionDefinitionManager.getMaxFunctionID = function () {
        return 10;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**获取需要提示的功能的列表 */
    FunctionDefinitionManager.getFuncList = function () {
        var funcList = new Array();
        var idStrList = cc.sys.localStorage.getItem('func_list');
        if (idStrList != null && idStrList != "") {
            var list = idStrList.split(',');
            for (var i = 0; i < list.length; i++) {
                var id = parseInt(list[i]);
                funcList.push(id);
            }
        }
        return funcList;
    };
    /**保存需要提示的功能的列表 */
    FunctionDefinitionManager.saveFuncList = function (temp) {
        cc.sys.localStorage.setItem('func_list', temp.toString());
    };
    /**获取功能的提示情况 */
    FunctionDefinitionManager.getFuncHint = function (funcId) {
        var num = cc.sys.localStorage.getItem('func_hint_' + funcId);
        if (num === "" || num === null) {
            num = 0;
        }
        else {
            num = parseInt(num);
        }
        return num;
    };
    /**保存功能的提示情况 */
    FunctionDefinitionManager.saveFuncHint = function (funcId, num) {
        cc.sys.localStorage.setItem('func_hint_' + funcId, num);
    };
    // public static cheakFuncUnlock(){
    //     if(TutorailsManager.getInstance().is_tutorails_state==false){
    //         let unlockIds=this.getFuncList();
    //         if(unlockIds.length>0){
    //             let id=unlockIds.pop();
    //             UIManager.getInstance().showFuncUnlockUi(id);
    //             this.saveFuncList(unlockIds);
    //             this.saveFuncHint(id,1);
    //         }
    //     }        
    // }
    /**是否解锁功能 */
    FunctionDefinitionManager.prototype.getIsUnlock = function (funcType) {
        var isUnlock = false;
        var finishLevel = LevelManager_1.LevelManager.getInstance().finish_level;
        var userLevel = UserData_1.default.getInstance().getUserLevel();
        var jsonData = this.getJsonFunctionDefinition(funcType);
        var type = jsonData.UnlockConditionType;
        var value = jsonData.UnlockCondictionParameter;
        if (type == 1) {
            if (userLevel >= value) {
                isUnlock = true;
            }
        }
        else if (type == 2) {
            if (finishLevel >= value) {
                isUnlock = true;
            }
        }
        return isUnlock;
    };
    FunctionDefinitionManager.getIconIndex = function (funcType) {
        var spIndex = funcType;
        if (funcType == Constants_1.FuncType.WuJinTiaoZhan || funcType == Constants_1.FuncType.GeRenBoss || funcType == Constants_1.FuncType.PaTa) {
            spIndex = 10;
        }
        return spIndex;
    };
    /**获取是否解锁了底部的按钮 */
    FunctionDefinitionManager.prototype.getIsUnlockIndex = function (index) {
        var isUnlock = false;
        switch (index) {
            case Constants_1.Btn_Index.Btn_City:
                {
                    //主城
                    // isUnlock=this.getIsUnlock(FuncType.XuYuanChi);
                    // if(!isUnlock){
                    //     isUnlock=this.getIsUnlock(FuncType.LongChao);
                    //     if(!isUnlock){
                    //         isUnlock=this.getIsUnlock(FuncType.TieJiangPu);
                    //         if(!isUnlock){
                    //             isUnlock=this.getIsUnlock(FuncType.ShangDian);
                    //             if(!isUnlock){
                    //                 isUnlock=this.getIsUnlock(FuncType.Shengtang);
                    //             }
                    //         }
                    //     }
                    // }
                    // if(isUnlock&&FollowManager.getInstance().getFirstDo(Follow_Type.主城功能解锁)){
                    //     FollowManager.getInstance().followEvent(Follow_Type.主城功能解锁);
                    //     FollowManager.getInstance().addFirstDo(Follow_Type.主城功能解锁);
                    // }                
                    isUnlock = true;
                }
                break;
            case Constants_1.Btn_Index.Btn_Pet:
                {
                    isUnlock = this.getIsUnlock(Constants_1.FuncType.ChongWuXiTong);
                }
                break;
            case Constants_1.Btn_Index.Btn_FuBen:
                {
                    for (var i = ActivityManager_1.ActivityType.Endless; i <= ActivityManager_1.ActivityType.num; i++) {
                        var type = ActivityManager_1.ActivityManager.getInstance().getFuncType(i);
                        if (this.getIsUnlock(type)) {
                            isUnlock = true;
                            break;
                        }
                    }
                }
                break;
            default: {
                isUnlock = true;
            }
        }
        return isUnlock;
    };
    FunctionDefinitionManager._instance = null;
    return FunctionDefinitionManager;
}());
exports.FunctionDefinitionManager = FunctionDefinitionManager;

cc._RF.pop();