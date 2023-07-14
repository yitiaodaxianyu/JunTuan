
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Data/SpiritCultivate.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8b4c6sF9sJOTZkxddPU+Jsp', 'SpiritCultivate');
// Scripts/Pet/Data/SpiritCultivate.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpiritCultivateManager = exports.JsonSpiritCultivate = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonSpiritCultivate = /** @class */ (function () {
    function JsonSpiritCultivate() {
        /**当前灵宠阶段 */
        this.Stage = 0;
        /**下一级兽粮消耗 */
        this.FoodCost = 0;
        /**下一级金币消耗 */
        this.CoinCost = 0;
        /**下一级宠物1级本体消耗 */
        this.CoinSpirit = 0;
        /**下一级钻石消耗 */
        this.DiamondCost = 0;
    }
    return JsonSpiritCultivate;
}());
exports.JsonSpiritCultivate = JsonSpiritCultivate;
var SpiritCultivateManager = /** @class */ (function () {
    function SpiritCultivateManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    SpiritCultivateManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SpiritCultivateManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    SpiritCultivateManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    SpiritCultivateManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('SpiritCultivate', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonSpiritCultivate成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonSpiritCultivate();
                jsonData = json[i];
                _this.data.set(jsonData.Stage, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    SpiritCultivateManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    SpiritCultivateManager.prototype.getJsonSpiritCultivate = function (id) {
        return this.data.get(id);
    };
    /**根据当前灵宠阶段获取下一级兽粮消耗 */
    SpiritCultivateManager.prototype.getFoodCost = function (id) {
        return this.data.get(id).FoodCost;
    };
    /**根据当前灵宠阶段获取下一级金币消耗 */
    SpiritCultivateManager.prototype.getCoinCost = function (id) {
        return this.data.get(id).CoinCost;
    };
    /**根据当前灵宠阶段获取下一级宠物1级本体消耗 */
    SpiritCultivateManager.prototype.getCoinSpirit = function (id) {
        return this.data.get(id).CoinSpirit;
    };
    /**根据当前灵宠阶段获取下一级钻石消耗 */
    SpiritCultivateManager.prototype.getDiamondCost = function (id) {
        return this.data.get(id).DiamondCost;
    };
    /** 静态方法，获取最大的 当前灵宠阶段*/
    SpiritCultivateManager.getMaxStage = function () {
        return 13;
    };
    SpiritCultivateManager._instance = null;
    return SpiritCultivateManager;
}());
exports.SpiritCultivateManager = SpiritCultivateManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxEYXRhXFxTcGlyaXRDdWx0aXZhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseURBQXdEO0FBRXhEO0lBQUE7UUFDSSxZQUFZO1FBQ0wsVUFBSyxHQUFVLENBQUMsQ0FBRTtRQUN6QixhQUFhO1FBQ04sYUFBUSxHQUFVLENBQUMsQ0FBRTtRQUM1QixhQUFhO1FBQ04sYUFBUSxHQUFVLENBQUMsQ0FBRTtRQUM1QixpQkFBaUI7UUFDVixlQUFVLEdBQVUsQ0FBQyxDQUFFO1FBQzlCLGFBQWE7UUFDTixnQkFBVyxHQUFVLENBQUMsQ0FBRTtJQUNuQyxDQUFDO0lBQUQsMEJBQUM7QUFBRCxDQVhBLEFBV0MsSUFBQTtBQVhZLGtEQUFtQjtBQWFoQztJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUFpQyxJQUFJLENBQUM7UUFDMUMsc0JBQWlCLEdBQVMsS0FBSyxDQUFDO1FBZ0V4Qyx5QkFBeUI7SUFHN0IsQ0FBQztJQWpFaUIsa0NBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxzQkFBc0IsRUFBRSxDQUFDO1lBQzVDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELFNBQVM7SUFDRCxxQ0FBSSxHQUFaO1FBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBQ0QsUUFBUTtJQUNBLHlDQUFRLEdBQWhCO1FBQUEsaUJBZ0JDO1FBZkcseUJBQVcsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUMseUJBQVcsQ0FBQyxTQUFTLEVBQUMsVUFBQyxLQUFZLEVBQUUsTUFBbUI7WUFDM0YsSUFBRyxLQUFLLEVBQUM7Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsT0FBTzthQUNWO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1lBQ3ZDLEtBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNwQixJQUFJLElBQUksR0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3JCLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUM1QixJQUFJLFFBQVEsR0FBQyxJQUFJLG1CQUFtQixFQUFFLENBQUM7Z0JBQ3ZDLFFBQVEsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUMsUUFBUSxDQUFDLENBQUM7YUFDMUM7WUFDRCxLQUFJLENBQUMsaUJBQWlCLEdBQUMsSUFBSSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFlBQVk7SUFDTCxtREFBa0IsR0FBekI7UUFDSSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNsQyxDQUFDO0lBQ0Qsc0JBQXNCO0lBQ2YsdURBQXNCLEdBQTdCLFVBQThCLEVBQVM7UUFDbkMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsdUJBQXVCO0lBQ2hCLDRDQUFXLEdBQWxCLFVBQW1CLEVBQVM7UUFDeEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDdEMsQ0FBQztJQUNELHVCQUF1QjtJQUNoQiw0Q0FBVyxHQUFsQixVQUFtQixFQUFTO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQ3RDLENBQUM7SUFDRCwyQkFBMkI7SUFDcEIsOENBQWEsR0FBcEIsVUFBcUIsRUFBUztRQUMxQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQztJQUN4QyxDQUFDO0lBQ0QsdUJBQXVCO0lBQ2hCLCtDQUFjLEdBQXJCLFVBQXNCLEVBQVM7UUFDM0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUM7SUFDekMsQ0FBQztJQUVELHVCQUF1QjtJQUNULGtDQUFXLEdBQXpCO1FBQ0ksT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBakVjLGdDQUFTLEdBQTJCLElBQUksQ0FBQztJQXNFNUQsNkJBQUM7Q0F2RUQsQUF1RUMsSUFBQTtBQXZFWSx3REFBc0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSnNvblNwaXJpdEN1bHRpdmF0ZSB7XHJcbiAgICAvKirlvZPliY3ngbXlrqDpmLbmrrUgKi9cclxuICAgIHB1YmxpYyBTdGFnZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuS4i+S4gOe6p+WFveeyrua2iOiAlyAqL1xyXG4gICAgcHVibGljIEZvb2RDb3N0Om51bWJlciA9IDAgO1xyXG4gICAgLyoq5LiL5LiA57qn6YeR5biB5raI6ICXICovXHJcbiAgICBwdWJsaWMgQ29pbkNvc3Q6bnVtYmVyID0gMCA7XHJcbiAgICAvKirkuIvkuIDnuqflrqDniakx57qn5pys5L2T5raI6ICXICovXHJcbiAgICBwdWJsaWMgQ29pblNwaXJpdDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuS4i+S4gOe6p+mSu+efs+a2iOiAlyAqL1xyXG4gICAgcHVibGljIERpYW1vbmRDb3N0Om51bWJlciA9IDAgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3Bpcml0Q3VsdGl2YXRlTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFNwaXJpdEN1bHRpdmF0ZU1hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6TWFwPG51bWJlcixKc29uU3Bpcml0Q3VsdGl2YXRlPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpTcGlyaXRDdWx0aXZhdGVNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgU3Bpcml0Q3VsdGl2YXRlTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRKc29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liqDovb1qc29uXHJcbiAgICBwcml2YXRlIGxvYWRKc29uKCkge1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmxvYWRKc29uKCdTcGlyaXRDdWx0aXZhdGUnLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uU3Bpcml0Q3VsdGl2YXRl5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvblNwaXJpdEN1bHRpdmF0ZSgpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEuU3RhZ2UsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25TcGlyaXRDdWx0aXZhdGUoaWQ6bnVtYmVyKTpKc29uU3Bpcml0Q3VsdGl2YXRlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lvZPliY3ngbXlrqDpmLbmrrXojrflj5bkuIvkuIDnuqflhb3nsq7mtojogJcgKi9cclxuICAgIHB1YmxpYyBnZXRGb29kQ29zdChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Gb29kQ29zdDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruW9k+WJjeeBteWuoOmYtuauteiOt+WPluS4i+S4gOe6p+mHkeW4gea2iOiAlyAqL1xyXG4gICAgcHVibGljIGdldENvaW5Db3N0KGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkNvaW5Db3N0O1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5b2T5YmN54G15a6g6Zi25q616I635Y+W5LiL5LiA57qn5a6g54mpMee6p+acrOS9k+a2iOiAlyAqL1xyXG4gICAgcHVibGljIGdldENvaW5TcGlyaXQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuQ29pblNwaXJpdDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruW9k+WJjeeBteWuoOmYtuauteiOt+WPluS4i+S4gOe6p+mSu+efs+a2iOiAlyAqL1xyXG4gICAgcHVibGljIGdldERpYW1vbmRDb3N0KGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkRpYW1vbmRDb3N0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg5b2T5YmN54G15a6g6Zi25q61Ki9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4U3RhZ2UoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAxMztcclxuICAgIH1cclxuXHJcbiAgICAvL+S7peS4iuagvOW8j+e7n+S4gO+8jOS7peS4i+WGmeavj+S4qmpzb27mlbDmja7nmoTnibnmrorpnIDmsYJcclxuXHJcblxyXG59XHJcbiJdfQ==