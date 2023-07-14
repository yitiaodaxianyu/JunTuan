
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Payment/Data/PrivilegedCardInformation.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '259886z+JxH6ZIGjNTrCQzq', 'PrivilegedCardInformation');
// Scripts/Payment/Data/PrivilegedCardInformation.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivilegedCardInformationManager = exports.JsonPrivilegedCardInformation = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonPrivilegedCardInformation = /** @class */ (function () {
    function JsonPrivilegedCardInformation() {
        /**尊享卡ID */
        this.PrivilegedCardID = 0;
        /**尊享卡类型 */
        this.PrivilegedCard = 0;
        /**文本 */
        this.PrivilegedCardText = 0;
        /**立即获得钻石数量 */
        this.GetDiamondsNowNum = 0;
        /**每天可领取钻石数量 */
        this.ReceiveDiamondsEveryDayNum = 0;
        /**累计获得钻石数量 */
        this.CumulativeGetDiamonds = 0;
        /**获得特权组ID */
        this.GainPrivileges = [];
        /**特权参数 */
        this.PrivilegeParameters = [];
        /**特权组文本ID */
        this.PrivilegeText = [];
        /**谷歌计费ID */
        this.ProductId = '';
    }
    return JsonPrivilegedCardInformation;
}());
exports.JsonPrivilegedCardInformation = JsonPrivilegedCardInformation;
var PrivilegedCardInformationManager = /** @class */ (function () {
    function PrivilegedCardInformationManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    PrivilegedCardInformationManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new PrivilegedCardInformationManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    PrivilegedCardInformationManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    PrivilegedCardInformationManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('PrivilegedCardInformation', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonPrivilegedCardInformation成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonPrivilegedCardInformation();
                jsonData = json[i];
                _this.data.set(jsonData.PrivilegedCardID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    PrivilegedCardInformationManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    PrivilegedCardInformationManager.prototype.getJsonPrivilegedCardInformation = function (id) {
        return this.data.get(id);
    };
    /**根据尊享卡ID获取尊享卡类型 */
    PrivilegedCardInformationManager.prototype.getPrivilegedCard = function (id) {
        return this.data.get(id).PrivilegedCard;
    };
    /**根据尊享卡ID获取文本 */
    PrivilegedCardInformationManager.prototype.getPrivilegedCardText = function (id) {
        return this.data.get(id).PrivilegedCardText;
    };
    /**根据尊享卡ID获取立即获得钻石数量 */
    PrivilegedCardInformationManager.prototype.getGetDiamondsNowNum = function (id) {
        return this.data.get(id).GetDiamondsNowNum;
    };
    /**根据尊享卡ID获取每天可领取钻石数量 */
    PrivilegedCardInformationManager.prototype.getReceiveDiamondsEveryDayNum = function (id) {
        return this.data.get(id).ReceiveDiamondsEveryDayNum;
    };
    /**根据尊享卡ID获取累计获得钻石数量 */
    PrivilegedCardInformationManager.prototype.getCumulativeGetDiamonds = function (id) {
        return this.data.get(id).CumulativeGetDiamonds;
    };
    /**根据尊享卡ID获取获得特权组ID */
    PrivilegedCardInformationManager.prototype.getGainPrivileges = function (id) {
        return this.data.get(id).GainPrivileges;
    };
    /**根据尊享卡ID获取特权参数 */
    PrivilegedCardInformationManager.prototype.getPrivilegeParameters = function (id) {
        return this.data.get(id).PrivilegeParameters;
    };
    /**根据尊享卡ID获取特权组文本ID */
    PrivilegedCardInformationManager.prototype.getPrivilegeText = function (id) {
        return this.data.get(id).PrivilegeText;
    };
    /**根据尊享卡ID获取谷歌计费ID */
    PrivilegedCardInformationManager.prototype.getProductId = function (id) {
        return this.data.get(id).ProductId;
    };
    /** 静态方法，获取最大的 尊享卡ID*/
    PrivilegedCardInformationManager.getMaxPrivilegedCardID = function () {
        return 2001;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    PrivilegedCardInformationManager.prototype.getData = function () {
        return this.data;
    };
    PrivilegedCardInformationManager._instance = null;
    return PrivilegedCardInformationManager;
}());
exports.PrivilegedCardInformationManager = PrivilegedCardInformationManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGF5bWVudFxcRGF0YVxcUHJpdmlsZWdlZENhcmRJbmZvcm1hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFBd0Q7QUFHeEQ7SUFBQTtRQUNJLFdBQVc7UUFDSixxQkFBZ0IsR0FBVSxDQUFDLENBQUU7UUFDcEMsV0FBVztRQUNKLG1CQUFjLEdBQVUsQ0FBQyxDQUFFO1FBQ2xDLFFBQVE7UUFDRCx1QkFBa0IsR0FBVSxDQUFDLENBQUU7UUFDdEMsY0FBYztRQUNQLHNCQUFpQixHQUFVLENBQUMsQ0FBRTtRQUNyQyxlQUFlO1FBQ1IsK0JBQTBCLEdBQVUsQ0FBQyxDQUFFO1FBQzlDLGNBQWM7UUFDUCwwQkFBcUIsR0FBVSxDQUFDLENBQUU7UUFDekMsYUFBYTtRQUNOLG1CQUFjLEdBQVksRUFBRSxDQUFFO1FBQ3JDLFVBQVU7UUFDSCx3QkFBbUIsR0FBWSxFQUFFLENBQUU7UUFDMUMsYUFBYTtRQUNOLGtCQUFhLEdBQVksRUFBRSxDQUFFO1FBQ3BDLFlBQVk7UUFDTCxjQUFTLEdBQVUsRUFBRSxDQUFFO0lBQ2xDLENBQUM7SUFBRCxvQ0FBQztBQUFELENBckJBLEFBcUJDLElBQUE7QUFyQlksc0VBQTZCO0FBdUIxQztJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUEyQyxJQUFJLENBQUM7UUFDcEQsc0JBQWlCLEdBQVMsS0FBSyxDQUFDO0lBeUY1QyxDQUFDO0lBdkZpQiw0Q0FBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLGdDQUFnQyxFQUFFLENBQUM7WUFDdEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsU0FBUztJQUNELCtDQUFJLEdBQVo7UUFDSSxJ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SSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUM7SUFDM0MsQ0FBQztJQUNELHFCQUFxQjtJQUNkLHVEQUFZLEdBQW5CLFVBQW9CLEVBQVM7UUFDekIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDdkMsQ0FBQztJQUVELHNCQUFzQjtJQUNSLHVEQUFzQixHQUFwQztRQUNJLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCx5QkFBeUI7SUFFekIsa0RBQU8sR0FBUDtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBM0ZjLDBDQUFTLEdBQXFDLElBQUksQ0FBQztJQTRGdEUsdUNBQUM7Q0E3RkQsQUE2RkMsSUFBQTtBQTdGWSw0RUFBZ0MiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25Qcml2aWxlZ2VkQ2FyZEluZm9ybWF0aW9uIHtcclxuICAgIC8qKuWwiuS6q+WNoUlEICovXHJcbiAgICBwdWJsaWMgUHJpdmlsZWdlZENhcmRJRDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWwiuS6q+WNoeexu+WeiyAqL1xyXG4gICAgcHVibGljIFByaXZpbGVnZWRDYXJkOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5paH5pysICovXHJcbiAgICBwdWJsaWMgUHJpdmlsZWdlZENhcmRUZXh0Om51bWJlciA9IDAgO1xyXG4gICAgLyoq56uL5Y2z6I635b6X6ZK755+z5pWw6YePICovXHJcbiAgICBwdWJsaWMgR2V0RGlhbW9uZHNOb3dOdW06bnVtYmVyID0gMCA7XHJcbiAgICAvKirmr4/lpKnlj6/pooblj5bpkrvnn7PmlbDph48gKi9cclxuICAgIHB1YmxpYyBSZWNlaXZlRGlhbW9uZHNFdmVyeURheU51bTpudW1iZXIgPSAwIDtcclxuICAgIC8qKue0r+iuoeiOt+W+l+mSu+efs+aVsOmHjyAqL1xyXG4gICAgcHVibGljIEN1bXVsYXRpdmVHZXREaWFtb25kczpudW1iZXIgPSAwIDtcclxuICAgIC8qKuiOt+W+l+eJueadg+e7hElEICovXHJcbiAgICBwdWJsaWMgR2FpblByaXZpbGVnZXM6bnVtYmVyW10gPSBbXSA7XHJcbiAgICAvKirnibnmnYPlj4LmlbAgKi9cclxuICAgIHB1YmxpYyBQcml2aWxlZ2VQYXJhbWV0ZXJzOm51bWJlcltdID0gW10gO1xyXG4gICAgLyoq54m55p2D57uE5paH5pysSUQgKi9cclxuICAgIHB1YmxpYyBQcml2aWxlZ2VUZXh0Om51bWJlcltdID0gW10gO1xyXG4gICAgLyoq6LC35q2M6K6h6LS5SUQgKi9cclxuICAgIHB1YmxpYyBQcm9kdWN0SWQ6c3RyaW5nID0gJycgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUHJpdmlsZWdlZENhcmRJbmZvcm1hdGlvbk1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBQcml2aWxlZ2VkQ2FyZEluZm9ybWF0aW9uTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25Qcml2aWxlZ2VkQ2FyZEluZm9ybWF0aW9uPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpQcml2aWxlZ2VkQ2FyZEluZm9ybWF0aW9uTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IFByaXZpbGVnZWRDYXJkSW5mb3JtYXRpb25NYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ1ByaXZpbGVnZWRDYXJkSW5mb3JtYXRpb24nLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uUHJpdmlsZWdlZENhcmRJbmZvcm1hdGlvbuaIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25Qcml2aWxlZ2VkQ2FyZEluZm9ybWF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5Qcml2aWxlZ2VkQ2FyZElELGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uUHJpdmlsZWdlZENhcmRJbmZvcm1hdGlvbihpZDpudW1iZXIpOkpzb25Qcml2aWxlZ2VkQ2FyZEluZm9ybWF0aW9uIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lsIrkuqvljaFJROiOt+WPluWwiuS6q+WNoeexu+WeiyAqL1xyXG4gICAgcHVibGljIGdldFByaXZpbGVnZWRDYXJkKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlByaXZpbGVnZWRDYXJkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5bCK5Lqr5Y2hSUTojrflj5bmlofmnKwgKi9cclxuICAgIHB1YmxpYyBnZXRQcml2aWxlZ2VkQ2FyZFRleHQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUHJpdmlsZWdlZENhcmRUZXh0O1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5bCK5Lqr5Y2hSUTojrflj5bnq4vljbPojrflvpfpkrvnn7PmlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXRHZXREaWFtb25kc05vd051bShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5HZXREaWFtb25kc05vd051bTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWwiuS6q+WNoUlE6I635Y+W5q+P5aSp5Y+v6aKG5Y+W6ZK755+z5pWw6YePICovXHJcbiAgICBwdWJsaWMgZ2V0UmVjZWl2ZURpYW1vbmRzRXZlcnlEYXlOdW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUmVjZWl2ZURpYW1vbmRzRXZlcnlEYXlOdW07XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lsIrkuqvljaFJROiOt+WPlue0r+iuoeiOt+W+l+mSu+efs+aVsOmHjyAqL1xyXG4gICAgcHVibGljIGdldEN1bXVsYXRpdmVHZXREaWFtb25kcyhpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5DdW11bGF0aXZlR2V0RGlhbW9uZHM7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lsIrkuqvljaFJROiOt+WPluiOt+W+l+eJueadg+e7hElEICovXHJcbiAgICBwdWJsaWMgZ2V0R2FpblByaXZpbGVnZXMoaWQ6bnVtYmVyKTogbnVtYmVyW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5HYWluUHJpdmlsZWdlcztcclxuICAgIH1cclxuICAgIC8qKuagueaNruWwiuS6q+WNoUlE6I635Y+W54m55p2D5Y+C5pWwICovXHJcbiAgICBwdWJsaWMgZ2V0UHJpdmlsZWdlUGFyYW1ldGVycyhpZDpudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlByaXZpbGVnZVBhcmFtZXRlcnM7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lsIrkuqvljaFJROiOt+WPlueJueadg+e7hOaWh+acrElEICovXHJcbiAgICBwdWJsaWMgZ2V0UHJpdmlsZWdlVGV4dChpZDpudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlByaXZpbGVnZVRleHQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lsIrkuqvljaFJROiOt+WPluiwt+atjOiuoei0uUlEICovXHJcbiAgICBwdWJsaWMgZ2V0UHJvZHVjdElkKGlkOm51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlByb2R1Y3RJZDtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6Z2Z5oCB5pa55rOV77yM6I635Y+W5pyA5aSn55qEIOWwiuS6q+WNoUlEKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4UHJpdmlsZWdlZENhcmRJRCgpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDIwMDE7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG4gICAgZ2V0RGF0YSgpOk1hcDxudW1iZXIsSnNvblByaXZpbGVnZWRDYXJkSW5mb3JtYXRpb24+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGE7XHJcbiAgICB9XHJcbn1cclxuIl19