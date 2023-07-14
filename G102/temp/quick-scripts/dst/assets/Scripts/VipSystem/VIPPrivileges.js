
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/VipSystem/VIPPrivileges.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '38a7agGPrRJqYovIezWcXIA', 'VIPPrivileges');
// Scripts/VipSystem/VIPPrivileges.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ApkManager_1 = require("../Ads/ApkManager");
var GameManager_1 = require("../GameManager");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var PayManager_1 = require("../Payment/PayManager");
var PropManager_1 = require("../Prop/PropManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var StorageConfig_1 = require("../Storage/StorageConfig");
var StorageManager_1 = require("../Storage/StorageManager");
var VipSystem_1 = require("./VipSystem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var VIPPrivileges = /** @class */ (function (_super) {
    __extends(VIPPrivileges, _super);
    function VIPPrivileges() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itme = []; //每天领取的500钻石道具父节点
        _this.id = "c401"; //c401  c501
        _this.Gemnum = 360;
        // propid=[PropId.Gem,10002,40004,101004]
        // num=[this.Gemnum,500,10,20]
        _this.propid = [10002, 40004, 101004];
        _this.num = [500, 10, 20];
        _this.lanText = null; //价格
        return _this;
        // update (dt) {}
    }
    VIPPrivileges.prototype.start = function () {
        for (var index = 0; index < this.itme.length; index++) {
            var itme = PropManager_1.PropManager.getInstance().createPropItem(this.propid[index], this.num[index]);
            itme.scale = 0.85;
            itme.parent = this.itme[index];
        }
    };
    VIPPrivileges.prototype.onEnable = function () {
        this.lanText.getComponent(cc.Label).string = "" + PayManager_1.PayManager.getInstance().getPayInfo(this.id).price;
    };
    VIPPrivileges.prototype.clickBtnbtnLan = function () {
        var _this = this;
        ApkManager_1.default.getInstance().showPay({ result: function (isPay) {
                if (isPay) {
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.战令购买高级战令成功人数);
                    var itme = [];
                    for (var index = 0; index < _this.itme.length; index++) {
                        PropManager_1.PropManager.getInstance().changePropNum(_this.propid[index], _this.num[index]);
                        var itmes = PropManager_1.PropManager.getInstance().createPropItem(_this.propid[index], _this.num[index]);
                        itme.push(itmes);
                    }
                    GameManager_1.default.getInstance().showMultipleGetTip(itme);
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.VipIdentity, 1);
                    PayManager_1.PayManager.getInstance().addPayNum(_this.id);
                    _this.node.parent.getComponent(VipSystem_1.default).Refresh();
                    _this.clickBtnClose();
                }
            } }, this.id);
    };
    VIPPrivileges.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.node.active = false;
    };
    __decorate([
        property(cc.Node)
    ], VIPPrivileges.prototype, "itme", void 0);
    __decorate([
        property(cc.Node)
    ], VIPPrivileges.prototype, "lanText", void 0);
    VIPPrivileges = __decorate([
        ccclass
    ], VIPPrivileges);
    return VIPPrivileges;
}(cc.Component));
exports.default = VIPPrivileges;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVmlwU3lzdGVtXFxWSVBQcml2aWxlZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR2xGLGdEQUEyQztBQUUzQyw4Q0FBeUM7QUFDekMsb0VBQStEO0FBQy9ELGdFQUEyRDtBQUczRCxvREFBbUQ7QUFFbkQsbURBQWtEO0FBQ2xELDBEQUFxRDtBQUNyRCwwREFBc0Q7QUFDdEQsNERBQThEO0FBRzlELHlDQUFvQztBQUU5QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUEyQyxpQ0FBWTtJQUF2RDtRQUFBLHFFQWlEQztRQTdDRyxVQUFJLEdBQVcsRUFBRSxDQUFBLENBQUEsaUJBQWlCO1FBQ2xDLFFBQUUsR0FBQyxNQUFNLENBQUEsQ0FBQSxZQUFZO1FBQ3JCLFlBQU0sR0FBUSxHQUFHLENBQUE7UUFDakIseUNBQXlDO1FBQ3pDLDhCQUE4QjtRQUM5QixZQUFNLEdBQUMsQ0FBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzNCLFNBQUcsR0FBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUE7UUFFZixhQUFPLEdBQVMsSUFBSSxDQUFBLENBQUEsSUFBSTs7UUFvQ3hCLGlCQUFpQjtJQUNyQixDQUFDO0lBcENHLDZCQUFLLEdBQUw7UUFDSSxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDbkQsSUFBSSxJQUFJLEdBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDdEYsSUFBSSxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUE7WUFDZixJQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDL0I7SUFDTCxDQUFDO0lBQ0QsZ0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUMsRUFBRSxHQUFDLHVCQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUE7SUFDcEcsQ0FBQztJQUNELHNDQUFjLEdBQWQ7UUFBQSxpQkFpQkM7UUFoQkcsb0JBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBQyxNQUFNLEVBQUMsVUFBQyxLQUFhO2dCQUNuRCxJQUFHLEtBQUssRUFBQztvQkFDTCx1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyw2QkFBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUNsRSxJQUFJLElBQUksR0FBQyxFQUFFLENBQUE7b0JBQ1gsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO3dCQUNuRCx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFDLEtBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDNUUsSUFBSSxLQUFLLEdBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBQyxLQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQ3ZGLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7cUJBQ25CO29CQUNELHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ25ELGtDQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQywwQkFBVSxDQUFDLFdBQVcsRUFBQyxDQUFDLENBQUMsQ0FBQTtvQkFDakUsdUJBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUM1QyxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsbUJBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO29CQUNsRCxLQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7aUJBQ3ZCO1lBQ0wsQ0FBQyxFQUFDLEVBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ2YsQ0FBQztJQUNELHFDQUFhLEdBQWI7UUFFSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUE7SUFDMUIsQ0FBQztJQXpDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUNEO0lBUWpCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ0U7SUFaSCxhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBaURqQztJQUFELG9CQUFDO0NBakRELEFBaURDLENBakQwQyxFQUFFLENBQUMsU0FBUyxHQWlEdEQ7a0JBakRvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IHsgQm9zc1Jld2FyZE1hbmFnZXIgfSBmcm9tIFwiLi4vQWN0aXZpdHkvQm9zc1Jld2FyZFwiO1xyXG5pbXBvcnQgQXBrTWFuYWdlciBmcm9tIFwiLi4vQWRzL0Fwa01hbmFnZXJcIjtcclxuaW1wb3J0IHsgQmF0dGxlUGFzc0RhdGFNYW5hZ2VyIH0gZnJvbSBcIi4uL0JhdHRsZVBhc3MvQmF0dGxlUGFzc0RhdGFcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCBUZXh0TGFuZ3VhZ2UgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvVGV4dExhbmd1YWdlXCI7XHJcbmltcG9ydCB7IFBheU1hbmFnZXIgfSBmcm9tIFwiLi4vUGF5bWVudC9QYXlNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFByb3BJZCB9IGZyb20gXCIuLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2VLZXkgfSBmcm9tIFwiLi4vU3RvcmFnZS9TdG9yYWdlQ29uZmlnXCI7XHJcbmltcG9ydCB7IFRoZVN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uL1N0b3JhZ2UvU3RvcmFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVHVybnRhYmxlSW5mb3JtYXRpb25NYW5hZ2VyIH0gZnJvbSBcIi4uL1R1cm50YWJsZS9UdXJudGFibGVJbmZvcm1hdGlvblwiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uL1VJL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCBWaXBTeXN0ZW0gZnJvbSBcIi4vVmlwU3lzdGVtXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZJUFByaXZpbGVnZXMgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGl0bWU6Y2MuTm9kZVtdPVtdLy/mr4/lpKnpooblj5bnmoQ1MDDpkrvnn7PpgZPlhbfniLboioLngrlcclxuICAgIGlkPVwiYzQwMVwiLy9jNDAxICBjNTAxXHJcbiAgICBHZW1udW06bnVtYmVyPTM2MFxyXG4gICAgLy8gcHJvcGlkPVtQcm9wSWQuR2VtLDEwMDAyLDQwMDA0LDEwMTAwNF1cclxuICAgIC8vIG51bT1bdGhpcy5HZW1udW0sNTAwLDEwLDIwXVxyXG4gICAgcHJvcGlkPVsxMDAwMiw0MDAwNCwxMDEwMDRdXHJcbiAgICBudW09WzUwMCwxMCwyMF1cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgbGFuVGV4dDpjYy5Ob2RlPW51bGwvL+S7t+agvFxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLml0bWUubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpdG1lPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0odGhpcy5wcm9waWRbaW5kZXhdLHRoaXMubnVtW2luZGV4XSk7XHJcbiAgICAgICAgICAgIGl0bWUuc2NhbGU9MC44NVxyXG4gICAgICAgICAgICBpdG1lLnBhcmVudD10aGlzLml0bWVbaW5kZXhdXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25FbmFibGUoKXtcclxuICAgICAgICB0aGlzLmxhblRleHQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJcIitQYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGF5SW5mbyh0aGlzLmlkKS5wcmljZVxyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5idG5MYW4oKXsvL+i0reS5sFxyXG4gICAgICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93UGF5KHtyZXN1bHQ6KGlzUGF5OmJvb2xlYW4pPT57XHJcbiAgICAgICAgICAgIGlmKGlzUGF5KXtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7miJjku6TotK3kubDpq5jnuqfmiJjku6TmiJDlip/kurrmlbApO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0bWU9W11cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLml0bWUubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKHRoaXMucHJvcGlkW2luZGV4XSx0aGlzLm51bVtpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpdG1lcz1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHRoaXMucHJvcGlkW2luZGV4XSx0aGlzLm51bVtpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0bWUucHVzaChpdG1lcylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd011bHRpcGxlR2V0VGlwKGl0bWUpO1xyXG4gICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVmlwSWRlbnRpdHksMSlcclxuICAgICAgICAgICAgICAgIFBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRQYXlOdW0odGhpcy5pZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUucGFyZW50LmdldENvbXBvbmVudChWaXBTeXN0ZW0pLlJlZnJlc2goKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja0J0bkNsb3NlKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH19LHRoaXMuaWQpIFxyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5DbG9zZSgpLy/lhbPpl61cclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmU9ZmFsc2VcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxufVxyXG4iXX0=