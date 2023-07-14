
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/JsonData/FunctionDefinition.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSnNvbkRhdGFcXEZ1bmN0aW9uRGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrREFBNEU7QUFDNUUsMENBQW1EO0FBQ25ELHNEQUFxRDtBQUNyRCxzREFBcUQ7QUFHckQsd0NBQW1DO0FBRW5DO0lBQUE7UUFDSSxVQUFVO1FBQ0gsZUFBVSxHQUFVLENBQUMsQ0FBRTtRQUM5QixXQUFXO1FBQ0osV0FBTSxHQUFVLENBQUMsQ0FBRTtRQUMxQixZQUFZO1FBQ0wsd0JBQW1CLEdBQVUsQ0FBQyxDQUFFO1FBQ3ZDLFlBQVk7UUFDTCw4QkFBeUIsR0FBVSxDQUFDLENBQUU7SUFDakQsQ0FBQztJQUFELDZCQUFDO0FBQUQsQ0FUQSxBQVNDLElBQUE7QUFUWSx3REFBc0I7QUFXbkM7SUFBQTtRQUVJLGlCQUFpQjtRQUNULFNBQUksR0FBb0MsSUFBSSxDQUFDO1FBQzdDLHNCQUFpQixHQUFTLEtBQUssQ0FBQztJQXdMNUMsQ0FBQztJQXRMaUIscUNBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSx5QkFBeUIsRUFBRSxDQUFDO1lBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELFNBQVM7SUFDRCx3Q0FBSSxHQUFaO1FBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBQ0QsUUFBUTtJQUNBLDRDQUFRLEdBQWhCO1FBQUEsaUJBZ0JDO1FBZkcseUJBQVcsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLEVBQUMseUJBQVcsQ0FBQyxTQUFTLEVBQUMsVUFBQyxLQUFZLEVBQUUsTUFB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Q0FBQTtpQkFDcEQ7Z0JBQUEsTUFBTTtZQUNQLEtBQUsscUJBQVMsQ0FBQyxTQUFTO2dCQUFDO29CQUNyQixLQUFJLElBQUksQ0FBQyxHQUFDLDhCQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBRSw4QkFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBQzt3QkFDckQsSUFBSSxJQUFJLEdBQUMsaUNBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3RELElBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBQzs0QkFDdEIsUUFBUSxHQUFDLElBQUksQ0FBQzs0QkFDZCxNQUFNO3lCQUNUO3FCQUNKO2lCQUNKO2dCQUFBLE1BQU07WUFDUCxPQUFPLENBQUMsQ0FBQTtnQkFDSixRQUFRLEdBQUMsSUFBSSxDQUFDO2FBQ2pCO1NBQ0o7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBekxjLG1DQUFTLEdBQThCLElBQUksQ0FBQztJQTJML0QsZ0NBQUM7Q0E1TEQsQUE0TEMsSUFBQTtBQTVMWSw4REFBeUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpdml0eU1hbmFnZXIsIEFjdGl2aXR5VHlwZSB9IGZyb20gXCIuLi9BY3Rpdml0eS9BY3Rpdml0eU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQnRuX0luZGV4LCBGdW5jVHlwZSB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uL0xldmVsL0xldmVsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd01hbmFnZXJcIjtcclxuaW1wb3J0IFVzZXJEYXRhIGZyb20gXCIuLi9Vc2VyRGF0YVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25GdW5jdGlvbkRlZmluaXRpb24ge1xyXG4gICAgLyoq5Yqf6IO9SUQgKi9cclxuICAgIHB1YmxpYyBGdW5jdGlvbklEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5Yqf6IO95ZCN5paH5pysICovXHJcbiAgICBwdWJsaWMgVGV4dElEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6Kej6ZSB5p2h5Lu257G75Z6LICovXHJcbiAgICBwdWJsaWMgVW5sb2NrQ29uZGl0aW9uVHlwZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuino+mUgeadoeS7tuWPguaVsCAqL1xyXG4gICAgcHVibGljIFVubG9ja0NvbmRpY3Rpb25QYXJhbWV0ZXI6bnVtYmVyID0gMCA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogRnVuY3Rpb25EZWZpbml0aW9uTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25GdW5jdGlvbkRlZmluaXRpb24+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkZ1bmN0aW9uRGVmaW5pdGlvbk1hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBGdW5jdGlvbkRlZmluaXRpb25NYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ0Z1bmN0aW9uRGVmaW5pdGlvbicsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25GdW5jdGlvbkRlZmluaXRpb27miJDlip8nKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhPW5ldyBNYXAoKTtcclxuICAgICAgICAgICAgbGV0IGpzb249YXNzZXRzLmpzb247XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGpzb24ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25EYXRhPW5ldyBKc29uRnVuY3Rpb25EZWZpbml0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5GdW5jdGlvbklELGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uRnVuY3Rpb25EZWZpbml0aW9uKGlkOm51bWJlcik6SnNvbkZ1bmN0aW9uRGVmaW5pdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5Yqf6IO9SUTojrflj5blip/og73lkI3mlofmnKwgKi9cclxuICAgIHB1YmxpYyBnZXRUZXh0SUQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuVGV4dElEO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5Yqf6IO9SUTojrflj5bop6PplIHmnaHku7bnsbvlnosgKi9cclxuICAgIHB1YmxpYyBnZXRVbmxvY2tDb25kaXRpb25UeXBlKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlVubG9ja0NvbmRpdGlvblR5cGU7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lip/og71JROiOt+WPluino+mUgeadoeS7tuWPguaVsCAqL1xyXG4gICAgcHVibGljIGdldFVubG9ja0NvbmRpY3Rpb25QYXJhbWV0ZXIoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuVW5sb2NrQ29uZGljdGlvblBhcmFtZXRlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6Z2Z5oCB5pa55rOV77yM6I635Y+W5pyA5aSn55qEIOWKn+iDvUlEKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4RnVuY3Rpb25JRCgpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDEwO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG5cclxuICAgIC8qKuiOt+WPlumcgOimgeaPkOekuueahOWKn+iDveeahOWIl+ihqCAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRGdW5jTGlzdCgpOkZ1bmNUeXBlW117XHJcbiAgICAgICAgbGV0IGZ1bmNMaXN0PW5ldyBBcnJheSgpO1xyXG4gICAgICAgIGxldCBpZFN0ckxpc3Q6c3RyaW5nPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZnVuY19saXN0Jyk7XHJcbiAgICAgICAgaWYoaWRTdHJMaXN0IT1udWxsICYmIGlkU3RyTGlzdCE9XCJcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBsaXN0PWlkU3RyTGlzdC5zcGxpdCgnLCcpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxsaXN0Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWQ9cGFyc2VJbnQobGlzdFtpXSk7XHJcbiAgICAgICAgICAgICAgICBmdW5jTGlzdC5wdXNoKGlkKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmdW5jTGlzdDtcclxuICAgIH1cclxuICAgIC8qKuS/neWtmOmcgOimgeaPkOekuueahOWKn+iDveeahOWIl+ihqCAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzYXZlRnVuY0xpc3QodGVtcDpGdW5jVHlwZVtdKVxyXG4gICAge1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZnVuY19saXN0Jyx0ZW1wLnRvU3RyaW5nKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiOt+WPluWKn+iDveeahOaPkOekuuaDheWGtSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRGdW5jSGludChmdW5jSWQ6RnVuY1R5cGUpOm51bWJlcntcclxuICAgICAgICBsZXQgbnVtPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZnVuY19oaW50XycrZnVuY0lkKTtcclxuICAgICAgICBpZihudW09PT1cIlwiIHx8IG51bT09PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBudW09MDsgICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbnVtPXBhcnNlSW50KG51bSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5L+d5a2Y5Yqf6IO955qE5o+Q56S65oOF5Ya1ICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNhdmVGdW5jSGludChmdW5jSWQ6bnVtYmVyLG51bTpudW1iZXIpe1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZnVuY19oaW50XycrZnVuY0lkLG51bSk7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvLyBwdWJsaWMgc3RhdGljIGNoZWFrRnVuY1VubG9jaygpe1xyXG4gICAgLy8gICAgIGlmKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc190dXRvcmFpbHNfc3RhdGU9PWZhbHNlKXtcclxuICAgIC8vICAgICAgICAgbGV0IHVubG9ja0lkcz10aGlzLmdldEZ1bmNMaXN0KCk7XHJcbiAgICAvLyAgICAgICAgIGlmKHVubG9ja0lkcy5sZW5ndGg+MCl7XHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgaWQ9dW5sb2NrSWRzLnBvcCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0Z1bmNVbmxvY2tVaShpZCk7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnNhdmVGdW5jTGlzdCh1bmxvY2tJZHMpO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5zYXZlRnVuY0hpbnQoaWQsMSk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9ICAgICAgICBcclxuICAgIC8vIH1cclxuICAgIC8qKuaYr+WQpuino+mUgeWKn+iDvSAqL1xyXG4gICAgcHVibGljIGdldElzVW5sb2NrKGZ1bmNUeXBlOkZ1bmNUeXBlKTpib29sZWFue1xyXG4gICAgICAgIGxldCBpc1VubG9jaz1mYWxzZTtcclxuICAgICAgICBsZXQgZmluaXNoTGV2ZWw9TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsO1xyXG4gICAgICAgIGxldCB1c2VyTGV2ZWw9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VyTGV2ZWwoKTtcclxuICAgICAgICBsZXQganNvbkRhdGE9dGhpcy5nZXRKc29uRnVuY3Rpb25EZWZpbml0aW9uKGZ1bmNUeXBlKTtcclxuICAgICAgICBsZXQgdHlwZT1qc29uRGF0YS5VbmxvY2tDb25kaXRpb25UeXBlO1xyXG4gICAgICAgIGxldCB2YWx1ZT1qc29uRGF0YS5VbmxvY2tDb25kaWN0aW9uUGFyYW1ldGVyO1xyXG4gICAgICAgIGlmKHR5cGU9PTEpe1xyXG4gICAgICAgICAgICBpZih1c2VyTGV2ZWw+PXZhbHVlKXsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpc1VubG9jaz10cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICBpZih0eXBlPT0yKXtcclxuICAgICAgICAgICAgaWYoZmluaXNoTGV2ZWw+PXZhbHVlKXtcclxuICAgICAgICAgICAgICAgIGlzVW5sb2NrPXRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlzVW5sb2NrO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SWNvbkluZGV4KGZ1bmNUeXBlOkZ1bmNUeXBlKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IHNwSW5kZXg9ZnVuY1R5cGU7XHJcbiAgICAgICAgaWYoZnVuY1R5cGU9PUZ1bmNUeXBlLld1SmluVGlhb1poYW4gfHwgZnVuY1R5cGU9PUZ1bmNUeXBlLkdlUmVuQm9zcyB8fCBmdW5jVHlwZT09RnVuY1R5cGUuUGFUYSl7XHJcbiAgICAgICAgICAgIHNwSW5kZXg9MTA7XHJcbiAgICAgICAgfSBcclxuICAgICAgICByZXR1cm4gc3BJbmRleDtcclxuICAgIH1cclxuICAgIC8qKuiOt+WPluaYr+WQpuino+mUgeS6huW6lemDqOeahOaMiemSriAqL1xyXG4gICAgcHVibGljIGdldElzVW5sb2NrSW5kZXgoaW5kZXg6QnRuX0luZGV4KTpib29sZWFue1xyXG4gICAgICAgIGxldCBpc1VubG9jaz1mYWxzZTtcclxuICAgICAgICBzd2l0Y2goaW5kZXgpe1xyXG4gICAgICAgICAgICBjYXNlIEJ0bl9JbmRleC5CdG5fQ2l0eTp7XHJcbiAgICAgICAgICAgICAgICAvL+S4u+WfjlxyXG4gICAgICAgICAgICAgICAgLy8gaXNVbmxvY2s9dGhpcy5nZXRJc1VubG9jayhGdW5jVHlwZS5YdVl1YW5DaGkpO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYoIWlzVW5sb2NrKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICBpc1VubG9jaz10aGlzLmdldElzVW5sb2NrKEZ1bmNUeXBlLkxvbmdDaGFvKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICBpZighaXNVbmxvY2spe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBpc1VubG9jaz10aGlzLmdldElzVW5sb2NrKEZ1bmNUeXBlLlRpZUppYW5nUHUpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBpZighaXNVbmxvY2spe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgaXNVbmxvY2s9dGhpcy5nZXRJc1VubG9jayhGdW5jVHlwZS5TaGFuZ0RpYW4pO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgaWYoIWlzVW5sb2NrKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBpc1VubG9jaz10aGlzLmdldElzVW5sb2NrKEZ1bmNUeXBlLlNoZW5ndGFuZyk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAvLyBpZihpc1VubG9jayYmRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEZpcnN0RG8oRm9sbG93X1R5cGUu5Li75Z+O5Yqf6IO96Kej6ZSBKSl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuS4u+WfjuWKn+iDveino+mUgSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEZpcnN0RG8oRm9sbG93X1R5cGUu5Li75Z+O5Yqf6IO96Kej6ZSBKTtcclxuICAgICAgICAgICAgICAgIC8vIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpc1VubG9jaz10cnVlO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQnRuX0luZGV4LkJ0bl9QZXQ6e1xyXG4gICAgICAgICAgICAgICAgaXNVbmxvY2s9dGhpcy5nZXRJc1VubG9jayhGdW5jVHlwZS5DaG9uZ1d1WGlUb25nKVxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQnRuX0luZGV4LkJ0bl9GdUJlbjp7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9QWN0aXZpdHlUeXBlLkVuZGxlc3M7IGk8PUFjdGl2aXR5VHlwZS5udW07IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR5cGU9QWN0aXZpdHlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RnVuY1R5cGUoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5nZXRJc1VubG9jayh0eXBlKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVW5sb2NrPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OntcclxuICAgICAgICAgICAgICAgIGlzVW5sb2NrPXRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlzVW5sb2NrO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=