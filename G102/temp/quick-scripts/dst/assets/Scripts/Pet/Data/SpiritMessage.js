
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Data/SpiritMessage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9a8dbX10URMS46yECvHTzNX', 'SpiritMessage');
// Scripts/Pet/Data/SpiritMessage.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpiritMessageManager = exports.JsonSpiritMessage = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonSpiritMessage = /** @class */ (function () {
    function JsonSpiritMessage() {
        /**灵宠种类 */
        this.SpiritType = 0;
        /**灵宠名字 */
        this.SpiritName = 0;
        /**初始品质 */
        this.InitialQuality = 0;
        /**阶段上限 */
        this.StageLimit = 0;
        /**宠物技能介绍 */
        this.ActiveSkillsIntro = 0;
        /**宠物技能名字 */
        this.SpiritSkillName = 0;
    }
    return JsonSpiritMessage;
}());
exports.JsonSpiritMessage = JsonSpiritMessage;
var SpiritMessageManager = /** @class */ (function () {
    function SpiritMessageManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    SpiritMessageManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SpiritMessageManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    SpiritMessageManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    SpiritMessageManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('SpiritMessage', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonSpiritMessage成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonSpiritMessage();
                jsonData = json[i];
                _this.data.set(jsonData.SpiritType, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    SpiritMessageManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    SpiritMessageManager.prototype.getJsonSpiritMessage = function (id) {
        return this.data.get(id);
    };
    /**根据灵宠种类获取灵宠名字 */
    SpiritMessageManager.prototype.getSpiritName = function (id) {
        return this.data.get(id).SpiritName;
    };
    /**根据灵宠种类获取初始品质 */
    SpiritMessageManager.prototype.getInitialQuality = function (id) {
        return this.data.get(id).InitialQuality;
    };
    /**根据灵宠种类获取阶段上限 */
    SpiritMessageManager.prototype.getStageLimit = function (id) {
        return this.data.get(id).StageLimit;
    };
    /**根据灵宠种类获取宠物技能介绍 */
    SpiritMessageManager.prototype.getActiveSkillsIntro = function (id) {
        return this.data.get(id).ActiveSkillsIntro;
    };
    /**根据灵宠种类获取宠物技能名字 */
    SpiritMessageManager.prototype.getSpiritSkillName = function (id) {
        return this.data.get(id).SpiritSkillName;
    };
    /** 静态方法，获取最大的 灵宠种类*/
    SpiritMessageManager.getMaxSpiritType = function () {
        return 7;
    };
    SpiritMessageManager._instance = null;
    return SpiritMessageManager;
}());
exports.SpiritMessageManager = SpiritMessageManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxEYXRhXFxTcGlyaXRNZXNzYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUF3RDtBQUV4RDtJQUFBO1FBQ0ksVUFBVTtRQUNILGVBQVUsR0FBVSxDQUFDLENBQUU7UUFDOUIsVUFBVTtRQUNILGVBQVUsR0FBVSxDQUFDLENBQUU7UUFDOUIsVUFBVTtRQUNILG1CQUFjLEdBQVUsQ0FBQyxDQUFFO1FBQ2xDLFVBQVU7UUFDSCxlQUFVLEdBQVUsQ0FBQyxDQUFFO1FBQzlCLFlBQVk7UUFDTCxzQkFBaUIsR0FBVSxDQUFDLENBQUU7UUFDckMsWUFBWTtRQUNMLG9CQUFlLEdBQVUsQ0FBQyxDQUFFO0lBQ3ZDLENBQUM7SUFBRCx3QkFBQztBQUFELENBYkEsQUFhQyxJQUFBO0FBYlksOENBQWlCO0FBZTlCO0lBQUE7UUFFSSxpQkFBaUI7UUFDVCxTQUFJLEdBQStCLElBQUksQ0FBQztRQUN4QyxzQkFBaUIsR0FBUyxLQUFLLENBQUM7UUFvRXhDLHlCQUF5QjtJQUc3QixDQUFDO0lBckVpQixnQ0FBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLG9CQUFvQixFQUFFLENBQUM7WUFDMUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsU0FBUztJQUNELG1DQUFJLEdBQVo7UUFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFDRCxRQUFRO0lBQ0EsdUNBQVEsR0FBaEI7UUFBQSxpQkFnQkM7UUFmRyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUMseUJBQVcsQ0FBQyxTQUFTLEVBQUMsVUFBQyxLQUFZLEVBQUUsTUFBbUI7WUFDekYsSUFBRyxLQUFLLEVBQUM7Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsT0FBTzthQUNWO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ3JDLEtBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNwQixJQUFJLElBQUksR0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3JCLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUM1QixJQUFJLFFBQVEsR0FBQyxJQUFJLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3JDLFFBQVEsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUMsUUFBUSxDQUFDLENBQUM7YUFDL0M7WUFDRCxLQUFJLENBQUMsaUJBQWlCLEdBQUMsSUFBSSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFlBQVk7SUFDTCxpREFBa0IsR0FBekI7UUFDSSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNsQyxDQUFDO0lBQ0Qsc0JBQXNCO0lBQ2YsbURBQW9CLEdBQTNCLFVBQTRCLEVBQVM7UUFDakMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0Qsa0JBQWtCO0lBQ1gsNENBQWEsR0FBcEIsVUFBcUIsRUFBUztRQUMxQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQztJQUN4QyxDQUFDO0lBQ0Qsa0JBQWtCO0lBQ1gsZ0RBQWlCLEdBQXhCLFVBQXlCLEVBQVM7UUFDOUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUM7SUFDNUMsQ0FBQztJQUNELGtCQUFrQjtJQUNYLDRDQUFhLEdBQXBCLFVBQXFCLEVBQVM7UUFDMUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUM7SUFDeEMsQ0FBQztJQUNELG9CQUFvQjtJQUNiLG1EQUFvQixHQUEzQixVQUE0QixFQUFTO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUM7SUFDL0MsQ0FBQztJQUNELG9CQUFvQjtJQUNiLGlEQUFrQixHQUF6QixVQUEwQixFQUFTO1FBQy9CLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDO0lBQzdDLENBQUM7SUFFRCxxQkFBcUI7SUFDUCxxQ0FBZ0IsR0FBOUI7UUFDSSxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFyRWMsOEJBQVMsR0FBeUIsSUFBSSxDQUFDO0lBMEUxRCwyQkFBQztDQTNFRCxBQTJFQyxJQUFBO0FBM0VZLG9EQUFvQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvYWRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0xvYWRpbmcvTG9hZE1hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uU3Bpcml0TWVzc2FnZSB7XHJcbiAgICAvKirngbXlrqDnp43nsbsgKi9cclxuICAgIHB1YmxpYyBTcGlyaXRUeXBlOm51bWJlciA9IDAgO1xyXG4gICAgLyoq54G15a6g5ZCN5a2XICovXHJcbiAgICBwdWJsaWMgU3Bpcml0TmFtZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWIneWni+WTgei0qCAqL1xyXG4gICAgcHVibGljIEluaXRpYWxRdWFsaXR5Om51bWJlciA9IDAgO1xyXG4gICAgLyoq6Zi25q615LiK6ZmQICovXHJcbiAgICBwdWJsaWMgU3RhZ2VMaW1pdDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWuoOeJqeaKgOiDveS7i+e7jSAqL1xyXG4gICAgcHVibGljIEFjdGl2ZVNraWxsc0ludHJvOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5a6g54mp5oqA6IO95ZCN5a2XICovXHJcbiAgICBwdWJsaWMgU3Bpcml0U2tpbGxOYW1lOm51bWJlciA9IDAgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3Bpcml0TWVzc2FnZU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBTcGlyaXRNZXNzYWdlTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25TcGlyaXRNZXNzYWdlPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpTcGlyaXRNZXNzYWdlTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IFNwaXJpdE1lc3NhZ2VNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ1NwaXJpdE1lc3NhZ2UnLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uU3Bpcml0TWVzc2FnZeaIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25TcGlyaXRNZXNzYWdlKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5TcGlyaXRUeXBlLGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uU3Bpcml0TWVzc2FnZShpZDpudW1iZXIpOkpzb25TcGlyaXRNZXNzYWdlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7ngbXlrqDnp43nsbvojrflj5bngbXlrqDlkI3lrZcgKi9cclxuICAgIHB1YmxpYyBnZXRTcGlyaXROYW1lKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlNwaXJpdE5hbWU7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7ngbXlrqDnp43nsbvojrflj5bliJ3lp4vlk4HotKggKi9cclxuICAgIHB1YmxpYyBnZXRJbml0aWFsUXVhbGl0eShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Jbml0aWFsUXVhbGl0eTtcclxuICAgIH1cclxuICAgIC8qKuagueaNrueBteWuoOenjeexu+iOt+WPlumYtuauteS4iumZkCAqL1xyXG4gICAgcHVibGljIGdldFN0YWdlTGltaXQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU3RhZ2VMaW1pdDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrueBteWuoOenjeexu+iOt+WPluWuoOeJqeaKgOiDveS7i+e7jSAqL1xyXG4gICAgcHVibGljIGdldEFjdGl2ZVNraWxsc0ludHJvKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkFjdGl2ZVNraWxsc0ludHJvO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u54G15a6g56eN57G76I635Y+W5a6g54mp5oqA6IO95ZCN5a2XICovXHJcbiAgICBwdWJsaWMgZ2V0U3Bpcml0U2tpbGxOYW1lKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlNwaXJpdFNraWxsTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6Z2Z5oCB5pa55rOV77yM6I635Y+W5pyA5aSn55qEIOeBteWuoOenjeexuyovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1heFNwaXJpdFR5cGUoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiA3O1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG5cclxuXHJcbn1cclxuIl19