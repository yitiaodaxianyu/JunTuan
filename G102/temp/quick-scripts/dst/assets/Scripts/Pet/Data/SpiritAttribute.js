
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Data/SpiritAttribute.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0683fIVNg1FP5zJkD3Q8IP3', 'SpiritAttribute');
// Scripts/Pet/Data/SpiritAttribute.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpiritAttributeManager = exports.JsonSpiritAttribute = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonSpiritAttribute = /** @class */ (function () {
    function JsonSpiritAttribute() {
        /**灵宠道具 */
        this.SpiritItem = 0;
        /**灵宠种类 */
        this.SpiritType = 0;
        /**阶段 */
        this.Stage = 0;
        /**品质 */
        this.Quality = 0;
        /**星级 */
        this.Star = 0;
        /**生命值 */
        this.Health = 0;
        /**攻击力 */
        this.Attack = 0;
        /**防御力 */
        this.Defense = 0;
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
    return JsonSpiritAttribute;
}());
exports.JsonSpiritAttribute = JsonSpiritAttribute;
var SpiritAttributeManager = /** @class */ (function () {
    function SpiritAttributeManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    SpiritAttributeManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SpiritAttributeManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    SpiritAttributeManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    SpiritAttributeManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('SpiritAttribute', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonSpiritAttribute成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonSpiritAttribute();
                jsonData = json[i];
                _this.data.set(jsonData.SpiritItem, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    SpiritAttributeManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    SpiritAttributeManager.prototype.getJsonSpiritAttribute = function (id) {
        return this.data.get(id);
    };
    /**根据灵宠道具获取灵宠种类 */
    SpiritAttributeManager.prototype.getSpiritType = function (id) {
        return this.data.get(id).SpiritType;
    };
    /**根据灵宠道具获取阶段 */
    SpiritAttributeManager.prototype.getStage = function (id) {
        return this.data.get(id).Stage;
    };
    /**根据灵宠道具获取品质 */
    SpiritAttributeManager.prototype.getQuality = function (id) {
        return this.data.get(id).Quality;
    };
    /**根据灵宠道具获取星级 */
    SpiritAttributeManager.prototype.getStar = function (id) {
        return this.data.get(id).Star;
    };
    /**根据灵宠道具获取生命值 */
    SpiritAttributeManager.prototype.getHealth = function (id) {
        return this.data.get(id).Health;
    };
    /**根据灵宠道具获取攻击力 */
    SpiritAttributeManager.prototype.getAttack = function (id) {
        return this.data.get(id).Attack;
    };
    /**根据灵宠道具获取防御力 */
    SpiritAttributeManager.prototype.getDefense = function (id) {
        return this.data.get(id).Defense;
    };
    /**根据灵宠道具获取命中值 */
    SpiritAttributeManager.prototype.getHit = function (id) {
        return this.data.get(id).Hit;
    };
    /**根据灵宠道具获取闪避值 */
    SpiritAttributeManager.prototype.getMiss = function (id) {
        return this.data.get(id).Miss;
    };
    /**根据灵宠道具获取暴击值 */
    SpiritAttributeManager.prototype.getCritical = function (id) {
        return this.data.get(id).Critical;
    };
    /**根据灵宠道具获取暴击增幅 */
    SpiritAttributeManager.prototype.getExtraCritical = function (id) {
        return this.data.get(id).ExtraCritical;
    };
    /**根据灵宠道具获取防暴值 */
    SpiritAttributeManager.prototype.getAntiCritical = function (id) {
        return this.data.get(id).AntiCritical;
    };
    /**根据灵宠道具获取暴击抗性 */
    SpiritAttributeManager.prototype.getAntiExtraCritical = function (id) {
        return this.data.get(id).AntiExtraCritical;
    };
    /** 静态方法，获取最大的 灵宠道具*/
    SpiritAttributeManager.getMaxSpiritItem = function () {
        return 70413;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    SpiritAttributeManager.prototype.getTypeFirstJsonData = function (type) {
        var info = null;
        this.data.forEach(function (v, k) {
            if (type == v.SpiritType && v.Stage == 1) {
                info = v;
            }
        });
        return info;
    };
    SpiritAttributeManager._instance = null;
    return SpiritAttributeManager;
}());
exports.SpiritAttributeManager = SpiritAttributeManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxEYXRhXFxTcGlyaXRBdHRyaWJ1dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseURBQXdEO0FBRXhEO0lBQUE7UUFDSSxVQUFVO1FBQ0gsZUFBVSxHQUFVLENBQUMsQ0FBRTtRQUM5QixVQUFVO1FBQ0gsZUFBVSxHQUFVLENBQUMsQ0FBRTtRQUM5QixRQUFRO1FBQ0QsVUFBSyxHQUFVLENBQUMsQ0FBRTtRQUN6QixRQUFRO1FBQ0QsWUFBTyxHQUFVLENBQUMsQ0FBRTtRQUMzQixRQUFRO1FBQ0QsU0FBSSxHQUFVLENBQUMsQ0FBRTtRQUN4QixTQUFTO1FBQ0YsV0FBTSxHQUFVLENBQUMsQ0FBRTtRQUMxQixTQUFTO1FBQ0YsV0FBTSxHQUFVLENBQUMsQ0FBRTtRQUMxQixTQUFTO1FBQ0YsWUFBTyxHQUFVLENBQUMsQ0FBRTtRQUMzQixTQUFTO1FBQ0YsUUFBRyxHQUFVLENBQUMsQ0FBRTtRQUN2QixTQUFTO1FBQ0YsU0FBSSxHQUFVLENBQUMsQ0FBRTtRQUN4QixTQUFTO1FBQ0YsYUFBUSxHQUFVLENBQUMsQ0FBRTtRQUM1QixVQUFVO1FBQ0gsa0JBQWEsR0FBVSxDQUFDLENBQUU7UUFDakMsU0FBUztRQUNGLGlCQUFZLEdBQVUsQ0FBQyxDQUFFO1FBQ2hDLFVBQVU7UUFDSCxzQkFBaUIsR0FBVSxDQUFDLENBQUU7SUFDekMsQ0FBQztJQUFELDBCQUFDO0FBQUQsQ0E3QkEsQUE2QkMsSUFBQTtBQTdCWSxrREFBbUI7QUErQmhDO0lBQUE7UUFFSSxpQkFBaUI7UUFDVCxTQUFJLEdBQWlDLElBQUksQ0FBQztRQUMxQyxzQkFBaUIsR0FBUyxLQUFLLENBQUM7SUFnSDVDLENBQUM7SUE5R2lCLGtDQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksc0JBQXNCLEVBQUUsQ0FBQztZ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QyxVQUFDLENBQUMsRUFBQyxDQUFDO1lBQ2xCLElBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUM7Z0JBQ3BDLElBQUksR0FBRyxDQUFDLENBQUM7YUFDWjtRQUNMLENBQUMsQ0FBQyxDQUFBO1FBQ0YsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQWpIYyxnQ0FBUyxHQUEyQixJQUFJLENBQUM7SUFtSDVELDZCQUFDO0NBcEhELEFBb0hDLElBQUE7QUFwSFksd0RBQXNCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25TcGlyaXRBdHRyaWJ1dGUge1xyXG4gICAgLyoq54G15a6g6YGT5YW3ICovXHJcbiAgICBwdWJsaWMgU3Bpcml0SXRlbTpudW1iZXIgPSAwIDtcclxuICAgIC8qKueBteWuoOenjeexuyAqL1xyXG4gICAgcHVibGljIFNwaXJpdFR5cGU6bnVtYmVyID0gMCA7XHJcbiAgICAvKirpmLbmrrUgKi9cclxuICAgIHB1YmxpYyBTdGFnZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWTgei0qCAqL1xyXG4gICAgcHVibGljIFF1YWxpdHk6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmmJ/nuqcgKi9cclxuICAgIHB1YmxpYyBTdGFyOm51bWJlciA9IDAgO1xyXG4gICAgLyoq55Sf5ZG95YC8ICovXHJcbiAgICBwdWJsaWMgSGVhbHRoOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5pS75Ye75YqbICovXHJcbiAgICBwdWJsaWMgQXR0YWNrOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6Ziy5b6h5YqbICovXHJcbiAgICBwdWJsaWMgRGVmZW5zZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWRveS4reWAvCAqL1xyXG4gICAgcHVibGljIEhpdDpudW1iZXIgPSAwIDtcclxuICAgIC8qKumXqumBv+WAvCAqL1xyXG4gICAgcHVibGljIE1pc3M6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmmrTlh7vlgLwgKi9cclxuICAgIHB1YmxpYyBDcml0aWNhbDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaatOWHu+WinuW5hSAqL1xyXG4gICAgcHVibGljIEV4dHJhQ3JpdGljYWw6bnVtYmVyID0gMCA7XHJcbiAgICAvKirpmLLmmrTlgLwgKi9cclxuICAgIHB1YmxpYyBBbnRpQ3JpdGljYWw6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmmrTlh7vmipfmgKcgKi9cclxuICAgIHB1YmxpYyBBbnRpRXh0cmFDcml0aWNhbDpudW1iZXIgPSAwIDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNwaXJpdEF0dHJpYnV0ZU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBTcGlyaXRBdHRyaWJ1dGVNYW5hZ2VyID0gbnVsbDtcclxuICAgIC8v5oqKanNvbuaVsOaNrui9rOWMluaIkG1hcOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBkYXRhOk1hcDxudW1iZXIsSnNvblNwaXJpdEF0dHJpYnV0ZT49bnVsbDtcclxuICAgIHByaXZhdGUgaXNfbG9hZF9jb21wbGV0ZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6U3Bpcml0QXR0cmlidXRlTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IFNwaXJpdEF0dHJpYnV0ZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSnNvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Yqg6L29anNvblxyXG4gICAgcHJpdmF0ZSBsb2FkSnNvbigpIHtcclxuICAgICAgICBMb2FkTWFuYWdlci5sb2FkSnNvbignU3Bpcml0QXR0cmlidXRlJyxMb2FkTWFuYWdlci5sb2FkX21vZGUsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkpzb25Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqg6L29SnNvblNwaXJpdEF0dHJpYnV0ZeaIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25TcGlyaXRBdHRyaWJ1dGUoKTtcclxuICAgICAgICAgICAgICAgIGpzb25EYXRhPWpzb25baV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KGpzb25EYXRhLlNwaXJpdEl0ZW0sanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25TcGlyaXRBdHRyaWJ1dGUoaWQ6bnVtYmVyKTpKc29uU3Bpcml0QXR0cmlidXRlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7ngbXlrqDpgZPlhbfojrflj5bngbXlrqDnp43nsbsgKi9cclxuICAgIHB1YmxpYyBnZXRTcGlyaXRUeXBlKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlNwaXJpdFR5cGU7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7ngbXlrqDpgZPlhbfojrflj5bpmLbmrrUgKi9cclxuICAgIHB1YmxpYyBnZXRTdGFnZShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5TdGFnZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNrueBteWuoOmBk+WFt+iOt+WPluWTgei0qCAqL1xyXG4gICAgcHVibGljIGdldFF1YWxpdHkoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUXVhbGl0eTtcclxuICAgIH1cclxuICAgIC8qKuagueaNrueBteWuoOmBk+WFt+iOt+WPluaYn+e6pyAqL1xyXG4gICAgcHVibGljIGdldFN0YXIoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU3RhcjtcclxuICAgIH1cclxuICAgIC8qKuagueaNrueBteWuoOmBk+WFt+iOt+WPlueUn+WRveWAvCAqL1xyXG4gICAgcHVibGljIGdldEhlYWx0aChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5IZWFsdGg7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7ngbXlrqDpgZPlhbfojrflj5bmlLvlh7vlipsgKi9cclxuICAgIHB1YmxpYyBnZXRBdHRhY2soaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuQXR0YWNrO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u54G15a6g6YGT5YW36I635Y+W6Ziy5b6h5YqbICovXHJcbiAgICBwdWJsaWMgZ2V0RGVmZW5zZShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5EZWZlbnNlO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u54G15a6g6YGT5YW36I635Y+W5ZG95Lit5YC8ICovXHJcbiAgICBwdWJsaWMgZ2V0SGl0KGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkhpdDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrueBteWuoOmBk+WFt+iOt+WPlumXqumBv+WAvCAqL1xyXG4gICAgcHVibGljIGdldE1pc3MoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuTWlzcztcclxuICAgIH1cclxuICAgIC8qKuagueaNrueBteWuoOmBk+WFt+iOt+WPluaatOWHu+WAvCAqL1xyXG4gICAgcHVibGljIGdldENyaXRpY2FsKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkNyaXRpY2FsO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u54G15a6g6YGT5YW36I635Y+W5pq05Ye75aKe5bmFICovXHJcbiAgICBwdWJsaWMgZ2V0RXh0cmFDcml0aWNhbChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5FeHRyYUNyaXRpY2FsO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u54G15a6g6YGT5YW36I635Y+W6Ziy5pq05YC8ICovXHJcbiAgICBwdWJsaWMgZ2V0QW50aUNyaXRpY2FsKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkFudGlDcml0aWNhbDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrueBteWuoOmBk+WFt+iOt+WPluaatOWHu+aKl+aApyAqL1xyXG4gICAgcHVibGljIGdldEFudGlFeHRyYUNyaXRpY2FsKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkFudGlFeHRyYUNyaXRpY2FsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg54G15a6g6YGT5YW3Ki9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4U3Bpcml0SXRlbSgpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDcwNDEzO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG5cclxuICAgIGdldFR5cGVGaXJzdEpzb25EYXRhKHR5cGU6bnVtYmVyKTpKc29uU3Bpcml0QXR0cmlidXRle1xyXG4gICAgICAgIGxldCBpbmZvOkpzb25TcGlyaXRBdHRyaWJ1dGUgPSBudWxsXHJcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgaWYodHlwZSA9PSB2LlNwaXJpdFR5cGUgJiYgdi5TdGFnZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgIGluZm8gPSB2O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gaW5mbztcclxuICAgIH1cclxuXHJcbn1cclxuIl19