
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/ABTest/ABTestManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2be3cgIck9BuIpDd9zGYYeE', 'ABTestManager');
// Scripts/ABTest/ABTestManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApkManager_1 = require("../Ads/ApkManager");
var ABTestPar = /** @class */ (function () {
    function ABTestPar() {
        this.rank_show = true;
    }
    return ABTestPar;
}());
var ABTestManager = /** @class */ (function () {
    function ABTestManager() {
        //参数列表
        this.ab_test_par = null;
    }
    ABTestManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new ABTestManager();
            this._instance.init();
        }
        return this._instance;
    };
    ABTestManager.prototype.init = function () {
        this.ab_test_par = new ABTestPar();
        ApkManager_1.default.getInstance().getABTestPar();
    };
    ABTestManager.prototype.setABTestPar = function (abTest) {
        var json = JSON.parse(abTest);
        var abt = new ABTestPar();
        abt.rank_show = json.rank_show;
        this.ab_test_par = abt;
    };
    ABTestManager.prototype.getABTestPar = function () {
        return this.ab_test_par;
    };
    ABTestManager._instance = null;
    return ABTestManager;
}());
exports.default = ABTestManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQUJUZXN0XFxBQlRlc3RNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQTJDO0FBRTNDO0lBQUE7UUFDSSxjQUFTLEdBQVMsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFBRCxnQkFBQztBQUFELENBRkEsQUFFQyxJQUFBO0FBRUQ7SUFBQTtRQUVJLE1BQU07UUFDRSxnQkFBVyxHQUFXLElBQUksQ0FBQztJQWlDdkMsQ0FBQztJQTdCaUIseUJBQVcsR0FBekI7UUFFSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUN2QjtZQUNJLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxhQUFhLEVBQUUsQ0FBQztZQUNuQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFTyw0QkFBSSxHQUFaO1FBRUksSUFBSSxDQUFDLFdBQVcsR0FBQyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQ2pDLG9CQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUVELG9DQUFZLEdBQVosVUFBYSxNQUFVO1FBRW5CLElBQUksSUFBSSxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUIsSUFBSSxHQUFHLEdBQUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUN4QixHQUFHLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBQyxHQUFHLENBQUM7SUFDekIsQ0FBQztJQUVELG9DQUFZLEdBQVo7UUFFSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQztJQTdCYyx1QkFBUyxHQUFrQixJQUFJLENBQUM7SUErQm5ELG9CQUFDO0NBcENELEFBb0NDLElBQUE7a0JBcENvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4uL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcblxyXG5jbGFzcyBBQlRlc3RQYXJ7XHJcbiAgICByYW5rX3Nob3c6Ym9vbGVhbj10cnVlO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBQlRlc3RNYW5hZ2VyIHtcclxuXHJcbiAgICAvL+WPguaVsOWIl+ihqFxyXG4gICAgcHJpdmF0ZSBhYl90ZXN0X3BhcjpBQlRlc3RQYXI9bnVsbDsgICAgXHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBBQlRlc3RNYW5hZ2VyID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6QUJUZXN0TWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IEFCVGVzdE1hbmFnZXIoKTsgICBcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmFiX3Rlc3RfcGFyPW5ldyBBQlRlc3RQYXIoKTtcclxuICAgICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QUJUZXN0UGFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QUJUZXN0UGFyKGFiVGVzdDphbnkpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGpzb249SlNPTi5wYXJzZShhYlRlc3QpO1xyXG4gICAgICAgIGxldCBhYnQ9bmV3IEFCVGVzdFBhcigpO1xyXG4gICAgICAgIGFidC5yYW5rX3Nob3c9anNvbi5yYW5rX3Nob3c7XHJcbiAgICAgICAgdGhpcy5hYl90ZXN0X3Bhcj1hYnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QUJUZXN0UGFyKCk6QUJUZXN0UGFyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWJfdGVzdF9wYXI7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==