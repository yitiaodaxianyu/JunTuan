"use strict";
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