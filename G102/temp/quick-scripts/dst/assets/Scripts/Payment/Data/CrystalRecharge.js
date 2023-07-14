
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Payment/Data/CrystalRecharge.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e823fkrplZETb11PKGHr67l', 'CrystalRecharge');
// Scripts/Payment/Data/CrystalRecharge.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrystalRechargeManager = exports.JsonCrystalRecharge = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonCrystalRecharge = /** @class */ (function () {
    function JsonCrystalRecharge() {
        /**充值ID */
        this.RechargeID = 0;
        /**龙晶数量 */
        this.CrystalQuantity = 0;
        /**首充赠送钻石数量 */
        this.DiamondsQuality = 0;
        /**谷歌计费ID */
        this.ProductId = '';
    }
    return JsonCrystalRecharge;
}());
exports.JsonCrystalRecharge = JsonCrystalRecharge;
var CrystalRechargeManager = /** @class */ (function () {
    function CrystalRechargeManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    CrystalRechargeManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new CrystalRechargeManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    CrystalRechargeManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    CrystalRechargeManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('CrystalRecharge', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonCrystalRecharge成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonCrystalRecharge();
                jsonData = json[i];
                _this.data.set(jsonData.RechargeID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    CrystalRechargeManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    CrystalRechargeManager.prototype.getJsonCrystalRecharge = function (id) {
        return this.data.get(id);
    };
    /**根据充值ID获取龙晶数量 */
    CrystalRechargeManager.prototype.getCrystalQuantity = function (id) {
        return this.data.get(id).CrystalQuantity;
    };
    /**根据充值ID获取首充赠送钻石数量 */
    CrystalRechargeManager.prototype.getDiamondsQuality = function (id) {
        return this.data.get(id).DiamondsQuality;
    };
    /**根据充值ID获取谷歌计费ID */
    CrystalRechargeManager.prototype.getProductId = function (id) {
        return this.data.get(id).ProductId;
    };
    /** 静态方法，获取最大的 充值ID*/
    CrystalRechargeManager.getMaxRechargeID = function () {
        return 606;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    CrystalRechargeManager.prototype.getData = function () {
        return this.data;
    };
    CrystalRechargeManager._instance = null;
    return CrystalRechargeManager;
}());
exports.CrystalRechargeManager = CrystalRechargeManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGF5bWVudFxcRGF0YVxcQ3J5c3RhbFJlY2hhcmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUF3RDtBQUd4RDtJQUFBO1FBQ0ksVUFBVTtRQUNILGVBQVUsR0FBVSxDQUFDLENBQUU7UUFDOUIsVUFBVTtRQUNILG9CQUFlLEdBQVUsQ0FBQyxDQUFFO1FBQ25DLGNBQWM7UUFDUCxvQkFBZSxHQUFVLENBQUMsQ0FBRTtRQUNuQyxZQUFZO1FBQ0wsY0FBUyxHQUFVLEVBQUUsQ0FBRTtJQUNsQyxDQUFDO0lBQUQsMEJBQUM7QUFBRCxDQVRBLEFBU0MsSUFBQTtBQVRZLGtEQUFtQjtBQVdoQztJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUFpQyxJQUFJLENBQUM7UUFDMUMsc0JBQWlCLEdBQVMsS0FBSyxDQUFDO0lBaUU1QyxDQUFDO0lBL0RpQixrQ0FBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLHNCQUFzQixFQUFFLENBQUM7WUFDNUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsU0FBUztJQUNELHFDQUFJLEdBQVo7UUFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFDRCxRQUFRO0lBQ0EseUNBQVEsR0FBaEI7UUFBQSxpQkFnQkM7UUFmRyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBQyx5QkFBVyxDQUFDLFNBQVMsRUFBQyxVQUFDLEtBQVksRUFBRSxNQUFtQjtZQUMzRixJQUFHLEtBQUssRUFBQztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixPQUFPO2FBQ1Y7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFDdkMsS0FBSSxDQUFDLElBQUksR0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLElBQUksSUFBSSxHQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDckIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQzVCLElBQUksUUFBUSxHQUFDLElBQUksbUJBQW1CLEVBQUUsQ0FBQztnQkFDdkMsUUFBUSxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBQyxRQUFRLENBQUMsQ0FBQzthQUMvQztZQUNELEtBQUksQ0FBQyxpQkFBaUIsR0FBQyxJQUFJLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsWUFBWTtJQUNMLG1EQUFrQixHQUF6QjtRQUNJLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2xDLENBQUM7SUFDRCxzQkFBc0I7SUFDZix1REFBc0IsR0FBN0IsVUFBOEIsRUFBUztRQUNuQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCxrQkFBa0I7SUFDWCxtREFBa0IsR0FBekIsVUFBMEIsRUFBUztRQUMvQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQztJQUM3QyxDQUFDO0lBQ0Qsc0JBQXNCO0lBQ2YsbURBQWtCLEdBQXpCLFVBQTBCLEVBQVM7UUFDL0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUM7SUFDN0MsQ0FBQztJQUNELG9CQUFvQjtJQUNiLDZDQUFZLEdBQW5CLFVBQW9CLEVBQVM7UUFDekIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDdkMsQ0FBQztJQUVELHFCQUFxQjtJQUNQLHVDQUFnQixHQUE5QjtRQUNJLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVELHlCQUF5QjtJQUVsQix3Q0FBTyxHQUFkO1FBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFuRWMsZ0NBQVMsR0FBMkIsSUFBSSxDQUFDO0lBb0U1RCw2QkFBQztDQXJFRCxBQXFFQyxJQUFBO0FBckVZLHdEQUFzQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvYWRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0xvYWRpbmcvTG9hZE1hbmFnZXJcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgSnNvbkNyeXN0YWxSZWNoYXJnZSB7XHJcbiAgICAvKirlhYXlgLxJRCAqL1xyXG4gICAgcHVibGljIFJlY2hhcmdlSUQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirpvpnmmbbmlbDph48gKi9cclxuICAgIHB1YmxpYyBDcnlzdGFsUXVhbnRpdHk6bnVtYmVyID0gMCA7XHJcbiAgICAvKirpppblhYXotaDpgIHpkrvnn7PmlbDph48gKi9cclxuICAgIHB1YmxpYyBEaWFtb25kc1F1YWxpdHk6bnVtYmVyID0gMCA7XHJcbiAgICAvKirosLfmrYzorqHotLlJRCAqL1xyXG4gICAgcHVibGljIFByb2R1Y3RJZDpzdHJpbmcgPSAnJyA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDcnlzdGFsUmVjaGFyZ2VNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogQ3J5c3RhbFJlY2hhcmdlTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25DcnlzdGFsUmVjaGFyZ2U+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkNyeXN0YWxSZWNoYXJnZU1hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBDcnlzdGFsUmVjaGFyZ2VNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ0NyeXN0YWxSZWNoYXJnZScsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25DcnlzdGFsUmVjaGFyZ2XmiJDlip8nKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhPW5ldyBNYXAoKTtcclxuICAgICAgICAgICAgbGV0IGpzb249YXNzZXRzLmpzb247XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGpzb24ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25EYXRhPW5ldyBKc29uQ3J5c3RhbFJlY2hhcmdlKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5SZWNoYXJnZUlELGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uQ3J5c3RhbFJlY2hhcmdlKGlkOm51bWJlcik6SnNvbkNyeXN0YWxSZWNoYXJnZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5YWF5YC8SUTojrflj5bpvpnmmbbmlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXRDcnlzdGFsUXVhbnRpdHkoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuQ3J5c3RhbFF1YW50aXR5O1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5YWF5YC8SUTojrflj5bpppblhYXotaDpgIHpkrvnn7PmlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXREaWFtb25kc1F1YWxpdHkoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuRGlhbW9uZHNRdWFsaXR5O1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5YWF5YC8SUTojrflj5bosLfmrYzorqHotLlJRCAqL1xyXG4gICAgcHVibGljIGdldFByb2R1Y3RJZChpZDpudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Qcm9kdWN0SWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDlhYXlgLxJRCovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1heFJlY2hhcmdlSUQoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiA2MDY7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG4gICAgcHVibGljIGdldERhdGEoKTpNYXA8bnVtYmVyLEpzb25DcnlzdGFsUmVjaGFyZ2U+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGE7XHJcbiAgICB9XHJcbn1cclxuIl19