
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Data/SpiritAptitude.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'faa44fMLnZCSYwR2eftg3QS', 'SpiritAptitude');
// Scripts/Pet/Data/SpiritAptitude.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpiritAptitudeManager = exports.JsonSpiritAptitude = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonSpiritAptitude = /** @class */ (function () {
    function JsonSpiritAptitude() {
        /**资质ID */
        this.Aptitude = 0;
        /**灵宠ID */
        this.SpiritId = 0;
        /**当前品质 */
        this.CurrentQuality = 0;
        /**协力 */
        this.Cooperation = 0;
        /**守护 */
        this.defend = 0;
        /**同心 */
        this.OneHeart = 0;
        /**命中值 */
        this.Hit = 0;
        /**闪避值 */
        this.Miss = 0;
        /**暴击值 */
        this.Critical = 0;
        /**暴击增幅 */
        this.ExtraCritical = 0;
        /**防暴值 */
        this.AntiCritical = 0;
        /**暴击抗性 */
        this.AntiExtraCritical = 0;
    }
    return JsonSpiritAptitude;
}());
exports.JsonSpiritAptitude = JsonSpiritAptitude;
var SpiritAptitudeManager = /** @class */ (function () {
    function SpiritAptitudeManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    SpiritAptitudeManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SpiritAptitudeManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    SpiritAptitudeManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    SpiritAptitudeManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('SpiritAptitude', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonSpiritAptitude成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonSpiritAptitude();
                jsonData = json[i];
                _this.data.set(jsonData.Aptitude, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    SpiritAptitudeManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    SpiritAptitudeManager.prototype.getJsonSpiritAptitude = function (id) {
        return this.data.get(id);
    };
    /**根据资质ID获取灵宠ID */
    SpiritAptitudeManager.prototype.getSpiritId = function (id) {
        return this.data.get(id).SpiritId;
    };
    /**根据资质ID获取当前品质 */
    SpiritAptitudeManager.prototype.getCurrentQuality = function (id) {
        return this.data.get(id).CurrentQuality;
    };
    /**根据资质ID获取协力 */
    SpiritAptitudeManager.prototype.getCooperation = function (id) {
        return this.data.get(id).Cooperation;
    };
    /**根据资质ID获取守护 */
    SpiritAptitudeManager.prototype.getdefend = function (id) {
        return this.data.get(id).defend;
    };
    /**根据资质ID获取同心 */
    SpiritAptitudeManager.prototype.getOneHeart = function (id) {
        return this.data.get(id).OneHeart;
    };
    /**根据资质ID获取命中值 */
    SpiritAptitudeManager.prototype.getHit = function (id) {
        return this.data.get(id).Hit;
    };
    /**根据资质ID获取闪避值 */
    SpiritAptitudeManager.prototype.getMiss = function (id) {
        return this.data.get(id).Miss;
    };
    /**根据资质ID获取暴击值 */
    SpiritAptitudeManager.prototype.getCritical = function (id) {
        return this.data.get(id).Critical;
    };
    /**根据资质ID获取暴击增幅 */
    SpiritAptitudeManager.prototype.getExtraCritical = function (id) {
        return this.data.get(id).ExtraCritical;
    };
    /**根据资质ID获取防暴值 */
    SpiritAptitudeManager.prototype.getAntiCritical = function (id) {
        return this.data.get(id).AntiCritical;
    };
    /**根据资质ID获取暴击抗性 */
    SpiritAptitudeManager.prototype.getAntiExtraCritical = function (id) {
        return this.data.get(id).AntiExtraCritical;
    };
    /** 静态方法，获取最大的 资质ID*/
    SpiritAptitudeManager.getMaxAptitude = function () {
        return 2110;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**
     *
     * @param petId 宠物id
     * @param petQuality 宠物品质
     */
    SpiritAptitudeManager.getId = function (petId, petQuality) {
        return petId * 100 + petQuality;
    };
    SpiritAptitudeManager._instance = null;
    return SpiritAptitudeManager;
}());
exports.SpiritAptitudeManager = SpiritAptitudeManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxEYXRhXFxTcGlyaXRBcHRpdHVkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFBd0Q7QUFHeEQ7SUFBQTtRQUNJLFVBQVU7UUFDSCxhQUFRLEdBQVUsQ0FBQyxDQUFFO1FBQzVCLFVBQVU7UUFDSCxhQUFRLEdBQVUsQ0FBQyxDQUFFO1FBQzVCLFVBQVU7UUFDSCxtQkFBYyxHQUFVLENBQUMsQ0FBRTtRQUNsQyxRQUFRO1FBQ0QsZ0JBQVcsR0FBVSxDQUFDLENBQUU7UUFDL0IsUUFBUTtRQUNELFdBQU0sR0FBVSxDQUFDLENBQUU7UUFDMUIsUUFBUTtRQUNELGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsU0FBUztRQUNGLFFBQUcsR0FBVSxDQUFDLENBQUU7UUFDdkIsU0FBUztRQUNGLFNBQUksR0FBVSxDQUFDLENBQUU7UUFDeEIsU0FBUztRQUNGLGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsVUFBVTtRQUNILGtCQUFhLEdBQVUsQ0FBQyxDQUFFO1FBQ2pDLFNBQVM7UUFDRixpQkFBWSxHQUFVLENBQUMsQ0FBRTtRQUNoQyxVQUFVO1FBQ0gsc0JBQWlCLEdBQVUsQ0FBQyxDQUFFO0lBQ3pDLENBQUM7SUFBRCx5QkFBQztBQUFELENBekJBLEFBeUJDLElBQUE7QUF6QlksZ0RBQWtCO0FBMkIvQjtJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUFnQyxJQUFJLENBQUM7UUFDekMsc0JBQWlCLEdBQVMsS0FBSyxDQUFDO0lBc0c1QyxDQUFDO0lBcEdpQixpQ0FBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLHFCQUFxQixFQUFFLENBQUM7WUFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMs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Q3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQ3RDLENBQUM7SUFDRCxrQkFBa0I7SUFDWCxnREFBZ0IsR0FBdkIsVUFBd0IsRUFBUztRQUM3QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQztJQUMzQyxDQUFDO0lBQ0QsaUJBQWlCO0lBQ1YsK0NBQWUsR0FBdEIsVUFBdUIsRUFBUztRQUM1QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQztJQUMxQyxDQUFDO0lBQ0Qsa0JBQWtCO0lBQ1gsb0RBQW9CLEdBQTNCLFVBQTRCLEVBQVM7UUFDakMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQztJQUMvQyxDQUFDO0lBRUQscUJBQXFCO0lBQ1Asb0NBQWMsR0FBNUI7UUFDSSxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQseUJBQXlCO0lBRXpCOzs7O09BSUc7SUFDVywyQkFBSyxHQUFuQixVQUFvQixLQUFZLEVBQUMsVUFBaUI7UUFDOUMsT0FBTyxLQUFLLEdBQUMsR0FBRyxHQUFDLFVBQVUsQ0FBQTtJQUMvQixDQUFDO0lBeEdjLCtCQUFTLEdBQTBCLElBQUksQ0FBQztJQXlHM0QsNEJBQUM7Q0ExR0QsQUEwR0MsSUFBQTtBQTFHWSxzREFBcUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25TcGlyaXRBcHRpdHVkZSB7XHJcbiAgICAvKirotYTotKhJRCAqL1xyXG4gICAgcHVibGljIEFwdGl0dWRlOm51bWJlciA9IDAgO1xyXG4gICAgLyoq54G15a6gSUQgKi9cclxuICAgIHB1YmxpYyBTcGlyaXRJZDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuW9k+WJjeWTgei0qCAqL1xyXG4gICAgcHVibGljIEN1cnJlbnRRdWFsaXR5Om51bWJlciA9IDAgO1xyXG4gICAgLyoq5Y2P5YqbICovXHJcbiAgICBwdWJsaWMgQ29vcGVyYXRpb246bnVtYmVyID0gMCA7XHJcbiAgICAvKirlrojmiqQgKi9cclxuICAgIHB1YmxpYyBkZWZlbmQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlkIzlv4MgKi9cclxuICAgIHB1YmxpYyBPbmVIZWFydDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWRveS4reWAvCAqL1xyXG4gICAgcHVibGljIEhpdDpudW1iZXIgPSAwIDtcclxuICAgIC8qKumXqumBv+WAvCAqL1xyXG4gICAgcHVibGljIE1pc3M6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmmrTlh7vlgLwgKi9cclxuICAgIHB1YmxpYyBDcml0aWNhbDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaatOWHu+WinuW5hSAqL1xyXG4gICAgcHVibGljIEV4dHJhQ3JpdGljYWw6bnVtYmVyID0gMCA7XHJcbiAgICAvKirpmLLmmrTlgLwgKi9cclxuICAgIHB1YmxpYyBBbnRpQ3JpdGljYWw6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmmrTlh7vmipfmgKcgKi9cclxuICAgIHB1YmxpYyBBbnRpRXh0cmFDcml0aWNhbDpudW1iZXIgPSAwIDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNwaXJpdEFwdGl0dWRlTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFNwaXJpdEFwdGl0dWRlTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25TcGlyaXRBcHRpdHVkZT49bnVsbDtcclxuICAgIHByaXZhdGUgaXNfbG9hZF9jb21wbGV0ZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6U3Bpcml0QXB0aXR1ZGVNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgU3Bpcml0QXB0aXR1ZGVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ1NwaXJpdEFwdGl0dWRlJyxMb2FkTWFuYWdlci5sb2FkX21vZGUsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkpzb25Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqg6L29SnNvblNwaXJpdEFwdGl0dWRl5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvblNwaXJpdEFwdGl0dWRlKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5BcHRpdHVkZSxqc29uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc19sb2FkX2NvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9veaYr+WQpuWujOaIkCAqL1xyXG4gICAgcHVibGljIGdldElzTG9hZENvbXBsZXRlZCgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzX2xvYWRfY29tcGxldGVkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uaWTlj7fojrflj5ZKc29u55qE5ZCE56eN5pWw5o2uICovXHJcbiAgICBwdWJsaWMgZ2V0SnNvblNwaXJpdEFwdGl0dWRlKGlkOm51bWJlcik6SnNvblNwaXJpdEFwdGl0dWRlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7otYTotKhJROiOt+WPlueBteWuoElEICovXHJcbiAgICBwdWJsaWMgZ2V0U3Bpcml0SWQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU3Bpcml0SWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7otYTotKhJROiOt+WPluW9k+WJjeWTgei0qCAqL1xyXG4gICAgcHVibGljIGdldEN1cnJlbnRRdWFsaXR5KGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkN1cnJlbnRRdWFsaXR5O1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6LWE6LSoSUTojrflj5bljY/lipsgKi9cclxuICAgIHB1YmxpYyBnZXRDb29wZXJhdGlvbihpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Db29wZXJhdGlvbjtcclxuICAgIH1cclxuICAgIC8qKuagueaNrui1hOi0qElE6I635Y+W5a6I5oqkICovXHJcbiAgICBwdWJsaWMgZ2V0ZGVmZW5kKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLmRlZmVuZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrui1hOi0qElE6I635Y+W5ZCM5b+DICovXHJcbiAgICBwdWJsaWMgZ2V0T25lSGVhcnQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuT25lSGVhcnQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7otYTotKhJROiOt+WPluWRveS4reWAvCAqL1xyXG4gICAgcHVibGljIGdldEhpdChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5IaXQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7otYTotKhJROiOt+WPlumXqumBv+WAvCAqL1xyXG4gICAgcHVibGljIGdldE1pc3MoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuTWlzcztcclxuICAgIH1cclxuICAgIC8qKuagueaNrui1hOi0qElE6I635Y+W5pq05Ye75YC8ICovXHJcbiAgICBwdWJsaWMgZ2V0Q3JpdGljYWwoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuQ3JpdGljYWw7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7otYTotKhJROiOt+WPluaatOWHu+WinuW5hSAqL1xyXG4gICAgcHVibGljIGdldEV4dHJhQ3JpdGljYWwoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuRXh0cmFDcml0aWNhbDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrui1hOi0qElE6I635Y+W6Ziy5pq05YC8ICovXHJcbiAgICBwdWJsaWMgZ2V0QW50aUNyaXRpY2FsKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkFudGlDcml0aWNhbDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrui1hOi0qElE6I635Y+W5pq05Ye75oqX5oCnICovXHJcbiAgICBwdWJsaWMgZ2V0QW50aUV4dHJhQ3JpdGljYWwoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuQW50aUV4dHJhQ3JpdGljYWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDotYTotKhJRCovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1heEFwdGl0dWRlKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gMjExMDtcclxuICAgIH1cclxuXHJcbiAgICAvL+S7peS4iuagvOW8j+e7n+S4gO+8jOS7peS4i+WGmeavj+S4qmpzb27mlbDmja7nmoTnibnmrorpnIDmsYJcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHBldElkIOWuoOeJqWlkXHJcbiAgICAgKiBAcGFyYW0gcGV0UXVhbGl0eSDlrqDnianlk4HotKhcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJZChwZXRJZDpudW1iZXIscGV0UXVhbGl0eTpudW1iZXIpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gcGV0SWQqMTAwK3BldFF1YWxpdHlcclxuICAgIH1cclxufVxyXG4iXX0=