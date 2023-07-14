
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/Data/MonsterAttribute.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4364bjVlv1JEa8/fkMPz7/o', 'MonsterAttribute');
// Scripts/Monster/Data/MonsterAttribute.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonsterAttributeManager = exports.JsonMonsterAttribute = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonMonsterAttribute = /** @class */ (function () {
    function JsonMonsterAttribute() {
        /**怪物ID */
        this.Monster = 0;
        /**怪物名称文本 */
        this.MosterName_TextID = 0;
        /**初始血量 */
        this.BaseHP = 0;
        /**初始攻击力 */
        this.BaseAttack = 0;
        /**初始攻速 */
        this.BaseAttackSpeed = 0;
        /**位置 */
        this.Area = [];
        /**特性编号 */
        this.Feature = 0;
        /**移动速度 */
        this.Speed = 0;
        /**BOSS属性系数 */
        this.BossMultiple = 0;
        /**召唤系数 */
        this.SummonMultiple = 0;
    }
    return JsonMonsterAttribute;
}());
exports.JsonMonsterAttribute = JsonMonsterAttribute;
var MonsterAttributeManager = /** @class */ (function () {
    function MonsterAttributeManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    MonsterAttributeManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new MonsterAttributeManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    MonsterAttributeManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    MonsterAttributeManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('MonsterAttribute', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonMonsterAttribute成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonMonsterAttribute();
                jsonData = json[i];
                _this.data.set(jsonData.Monster, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    MonsterAttributeManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    MonsterAttributeManager.prototype.getJsonMonsterAttribute = function (id) {
        return this.data.get(id);
    };
    /**根据怪物ID获取怪物名称文本 */
    MonsterAttributeManager.prototype.getMosterName_TextID = function (id) {
        return this.data.get(id).MosterName_TextID;
    };
    /**根据怪物ID获取初始血量 */
    MonsterAttributeManager.prototype.getBaseHP = function (id) {
        return this.data.get(id).BaseHP;
    };
    /**根据怪物ID获取初始攻击力 */
    MonsterAttributeManager.prototype.getBaseAttack = function (id) {
        return this.data.get(id).BaseAttack;
    };
    /**根据怪物ID获取初始攻速 */
    MonsterAttributeManager.prototype.getBaseAttackSpeed = function (id) {
        return this.data.get(id).BaseAttackSpeed;
    };
    /**根据怪物ID获取位置 */
    MonsterAttributeManager.prototype.getArea = function (id) {
        return this.data.get(id).Area;
    };
    /**根据怪物ID获取特性编号 */
    MonsterAttributeManager.prototype.getFeature = function (id) {
        return this.data.get(id).Feature;
    };
    /**根据怪物ID获取移动速度 */
    MonsterAttributeManager.prototype.getSpeed = function (id) {
        return this.data.get(id).Speed;
    };
    /**根据怪物ID获取BOSS属性系数 */
    MonsterAttributeManager.prototype.getBossMultiple = function (id) {
        return this.data.get(id).BossMultiple;
    };
    /**根据怪物ID获取召唤系数 */
    MonsterAttributeManager.prototype.getSummonMultiple = function (id) {
        return this.data.get(id).SummonMultiple;
    };
    /** 静态方法，获取最大的 怪物ID*/
    MonsterAttributeManager.getMaxMonster = function () {
        return 50180;
    };
    MonsterAttributeManager._instance = null;
    return MonsterAttributeManager;
}());
exports.MonsterAttributeManager = MonsterAttributeManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcRGF0YVxcTW9uc3RlckF0dHJpYnV0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSx5REFBd0Q7QUFFeEQ7SUFBQTtRQUNJLFVBQVU7UUFDSCxZQUFPLEdBQVUsQ0FBQyxDQUFFO1FBQzNCLFlBQVk7UUFDTCxzQkFBaUIsR0FBVSxDQUFDLENBQUU7UUFDckMsVUFBVTtRQUNILFdBQU0sR0FBVSxDQUFDLENBQUU7UUFDMUIsV0FBVztRQUNKLGVBQVUsR0FBVSxDQUFDLENBQUU7UUFDOUIsVUFBVTtRQUNILG9CQUFlLEdBQVUsQ0FBQyxDQUFFO1FBQ25DLFFBQVE7UUFDRCxTQUFJLEdBQVksRUFBRSxDQUFFO1FBQzNCLFVBQVU7UUFDSCxZQUFPLEdBQVUsQ0FBQyxDQUFFO1FBQzNCLFVBQVU7UUFDSCxVQUFLLEdBQVUsQ0FBQyxDQUFFO1FBQ3pCLGNBQWM7UUFDUCxpQkFBWSxHQUFVLENBQUMsQ0FBRTtRQUNoQyxVQUFVO1FBQ0gsbUJBQWMsR0FBVSxDQUFDLENBQUU7SUFDdEMsQ0FBQztJQUFELDJCQUFDO0FBQUQsQ0FyQkEsQUFxQkMsSUFBQTtBQXJCWSxvREFBb0I7QUF1QmpDO0lBQUE7UUFFSSxpQkFBaUI7UUFDVCxTQUFJLEdBQWtDLElBQUksQ0FBQztRQUMzQyxzQkFBaUIsR0FBUyxLQUFLLENBQUM7UUFvRnhDLHlCQUF5QjtJQUM3QixDQUFDO0lBbkZpQixtQ0FBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLHVCQUF1QixFQUFFLENBQUM7WUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsU0FBUztJQUNELHNDQUFJLEdBQVo7UUFDSSxJQUFHLENB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QUFDLFlBQVksQ0FBQztJQUMxQyxDQUFDO0lBQ0Qsa0JBQWtCO0lBQ1gsbURBQWlCLEdBQXhCLFVBQXlCLEVBQVM7UUFDOUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUM7SUFDNUMsQ0FBQztJQUVELHFCQUFxQjtJQUNQLHFDQUFhLEdBQTNCO1FBQ0ksT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQXJGYyxpQ0FBUyxHQUE0QixJQUFJLENBQUM7SUF3RjdELDhCQUFDO0NBekZELEFBeUZDLElBQUE7QUF6RlksMERBQXVCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IEVuZW15X1R5cGUgfSBmcm9tIFwiLi4vLi4vRW5lbXkvRW5lbXlDb25maWdcIjtcclxuaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25Nb25zdGVyQXR0cmlidXRlIHtcclxuICAgIC8qKuaAqueJqUlEICovXHJcbiAgICBwdWJsaWMgTW9uc3RlcjpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaAqueJqeWQjeensOaWh+acrCAqL1xyXG4gICAgcHVibGljIE1vc3Rlck5hbWVfVGV4dElEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5Yid5aeL6KGA6YePICovXHJcbiAgICBwdWJsaWMgQmFzZUhQOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5Yid5aeL5pS75Ye75YqbICovXHJcbiAgICBwdWJsaWMgQmFzZUF0dGFjazpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWIneWni+aUu+mAnyAqL1xyXG4gICAgcHVibGljIEJhc2VBdHRhY2tTcGVlZDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuS9jee9riAqL1xyXG4gICAgcHVibGljIEFyZWE6bnVtYmVyW10gPSBbXSA7XHJcbiAgICAvKirnibnmgKfnvJblj7cgKi9cclxuICAgIHB1YmxpYyBGZWF0dXJlOm51bWJlciA9IDAgO1xyXG4gICAgLyoq56e75Yqo6YCf5bqmICovXHJcbiAgICBwdWJsaWMgU3BlZWQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKipCT1NT5bGe5oCn57O75pWwICovXHJcbiAgICBwdWJsaWMgQm9zc011bHRpcGxlOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5Y+s5ZSk57O75pWwICovXHJcbiAgICBwdWJsaWMgU3VtbW9uTXVsdGlwbGU6bnVtYmVyID0gMCA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNb25zdGVyQXR0cmlidXRlTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IE1vbnN0ZXJBdHRyaWJ1dGVNYW5hZ2VyID0gbnVsbDtcclxuICAgIC8v5oqKanNvbuaVsOaNrui9rOWMluaIkG1hcOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBkYXRhOk1hcDxudW1iZXIsSnNvbk1vbnN0ZXJBdHRyaWJ1dGU+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOk1vbnN0ZXJBdHRyaWJ1dGVNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgTW9uc3RlckF0dHJpYnV0ZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSnNvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Yqg6L29anNvblxyXG4gICAgcHJpdmF0ZSBsb2FkSnNvbigpIHtcclxuICAgICAgICBMb2FkTWFuYWdlci5sb2FkSnNvbignTW9uc3RlckF0dHJpYnV0ZScsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25Nb25zdGVyQXR0cmlidXRl5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvbk1vbnN0ZXJBdHRyaWJ1dGUoKTtcclxuICAgICAgICAgICAgICAgIGpzb25EYXRhPWpzb25baV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KGpzb25EYXRhLk1vbnN0ZXIsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25Nb25zdGVyQXR0cmlidXRlKGlkOm51bWJlcik6SnNvbk1vbnN0ZXJBdHRyaWJ1dGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruaAqueJqUlE6I635Y+W5oCq54mp5ZCN56ew5paH5pysICovXHJcbiAgICBwdWJsaWMgZ2V0TW9zdGVyTmFtZV9UZXh0SUQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuTW9zdGVyTmFtZV9UZXh0SUQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7mgKrnialJROiOt+WPluWIneWni+ihgOmHjyAqL1xyXG4gICAgcHVibGljIGdldEJhc2VIUChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5CYXNlSFA7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7mgKrnialJROiOt+WPluWIneWni+aUu+WHu+WKmyAqL1xyXG4gICAgcHVibGljIGdldEJhc2VBdHRhY2soaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuQmFzZUF0dGFjaztcclxuICAgIH1cclxuICAgIC8qKuagueaNruaAqueJqUlE6I635Y+W5Yid5aeL5pS76YCfICovXHJcbiAgICBwdWJsaWMgZ2V0QmFzZUF0dGFja1NwZWVkKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkJhc2VBdHRhY2tTcGVlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruaAqueJqUlE6I635Y+W5L2N572uICovXHJcbiAgICBwdWJsaWMgZ2V0QXJlYShpZDpudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkFyZWE7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7mgKrnialJROiOt+WPlueJueaAp+e8luWPtyAqL1xyXG4gICAgcHVibGljIGdldEZlYXR1cmUoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuRmVhdHVyZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruaAqueJqUlE6I635Y+W56e75Yqo6YCf5bqmICovXHJcbiAgICBwdWJsaWMgZ2V0U3BlZWQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU3BlZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7mgKrnialJROiOt+WPlkJPU1PlsZ7mgKfns7vmlbAgKi9cclxuICAgIHB1YmxpYyBnZXRCb3NzTXVsdGlwbGUoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuQm9zc011bHRpcGxlO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5oCq54mpSUTojrflj5blj6zllKTns7vmlbAgKi9cclxuICAgIHB1YmxpYyBnZXRTdW1tb25NdWx0aXBsZShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5TdW1tb25NdWx0aXBsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6Z2Z5oCB5pa55rOV77yM6I635Y+W5pyA5aSn55qEIOaAqueJqUlEKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4TW9uc3RlcigpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDUwMTgwO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG59XHJcbiJdfQ==