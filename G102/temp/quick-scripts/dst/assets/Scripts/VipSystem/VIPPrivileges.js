
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
var WXManagerEX_1 = require("../../startscene/WXManagerEX");
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
        _this.maxAadNum = 10;
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
        var adNum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.VIPADNum, 0); //观看广告次数
        this.lanText.getComponent(cc.Label).string = "已观看" + adNum + "次广告，还差" + (this.maxAadNum - adNum) + "次可解锁";
        cc.director.on(WXManagerEX_1.WXADEnvnt.ZHANLINGJIESUOSHIPIN, this.onShipinComp, this);
    };
    VIPPrivileges.prototype.clickBtnbtnLan = function () {
        var _this = this;
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            WXManagerEX_1.default.getInstance().zhanlingjiesuoShipin = wx.createRewardedVideoAd({
                adUnitId: 'adunit-5d0148773715f613'
            });
            WXManagerEX_1.default.getInstance().zhanlingjiesuoShipin.offError();
            WXManagerEX_1.default.getInstance().zhanlingjiesuoShipin.onError(function (err) {
                console.log(err);
            });
            WXManagerEX_1.default.getInstance().zhanlingjiesuoShipin.offClose();
            WXManagerEX_1.default.getInstance().zhanlingjiesuoShipin.show().catch(function () {
                // 失败重试
                WXManagerEX_1.default.getInstance().zhanlingjiesuoShipin.load()
                    .then(function () { return WXManagerEX_1.default.getInstance().zhanlingjiesuoShipin.show(); })
                    .catch(function (err) {
                    GameManager_1.default.getInstance().showMessage("广告拉取失败");
                });
            });
            WXManagerEX_1.default.getInstance().zhanlingjiesuoShipin.onClose(function (res) {
                // 用户点击了【关闭广告】按钮
                // 小于 2.1.0 的基础库版本，res 是一个 undefined
                if (res && res.isEnded || res === undefined) {
                    // 正常播放结束，可以下发游戏奖励
                    _this.onShipinComp();
                }
                else {
                    // 播放中途退出，不下发游戏奖励
                }
            });
        }
        else {
            this.onShipinComp();
        }
        // ApkManager.getInstance().showPay({result:(isPay:boolean)=>{
        //     if(isPay){
        //         FollowManager.getInstance().followEvent(Follow_Type.战令购买高级战令成功人数);
        //         let itme=[]
        //         for (let index = 0; index < this.itme.length; index++) {
        //             PropManager.getInstance().changePropNum(this.propid[index],this.num[index]);
        //             let itmes=PropManager.getInstance().createPropItem(this.propid[index],this.num[index]);
        //             itme.push(itmes)
        //         }
        //         GameManager.getInstance().showMultipleGetTip(itme);
        //         TheStorageManager.getInstance().setItem(StorageKey.VipIdentity,1)
        //         PayManager.getInstance().addPayNum(this.id);
        //         this.node.parent.getComponent(VipSystem).Refresh()
        //         this.clickBtnClose()
        //     }
        // }},this.id) 
    };
    VIPPrivileges.prototype.onShipinComp = function () {
        var adNum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.VIPADNum, 0) + 1; //观看广告次数
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.VIPADNum, adNum);
        if (adNum == 10) {
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.战令购买高级战令成功人数);
            var itme = [];
            for (var index = 0; index < this.itme.length; index++) {
                PropManager_1.PropManager.getInstance().changePropNum(this.propid[index], this.num[index]);
                var itmes = PropManager_1.PropManager.getInstance().createPropItem(this.propid[index], this.num[index]);
                itme.push(itmes);
            }
            GameManager_1.default.getInstance().showMultipleGetTip(itme);
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.VipIdentity, 1);
            PayManager_1.PayManager.getInstance().addPayNum(this.id);
            this.node.parent.getComponent(VipSystem_1.default).Refresh();
            this.clickBtnClose();
        }
        else {
            this.lanText.getComponent(cc.Label).string = "已观看" + adNum + "次广告，还差" + (this.maxAadNum - adNum) + "次可解锁";
        }
    };
    VIPPrivileges.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        cc.director.off(WXManagerEX_1.WXADEnvnt.ZHANLINGJIESUOSHIPIN, this.onShipinComp, this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVmlwU3lzdGVtXFxWSVBQcml2aWxlZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLDREQUFzRTtBQUl0RSw4Q0FBeUM7QUFDekMsb0VBQStEO0FBQy9ELGdFQUEyRDtBQUczRCxvREFBbUQ7QUFFbkQsbURBQWtEO0FBQ2xELDBEQUFxRDtBQUNyRCwwREFBc0Q7QUFDdEQsNERBQThEO0FBRzlELHlDQUFvQztBQUU5QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUEyQyxpQ0FBWTtJQUF2RDtRQUFBLHFFQXFIQztRQWpIRyxVQUFJLEdBQVcsRUFBRSxDQUFBLENBQUEsaUJBQWlCO1FBQ2xDLFFBQUUsR0FBQyxNQUFNLENBQUEsQ0FBQSxZQUFZO1FBQ3JCLFlBQU0sR0FBUSxHQUFHLENBQUE7UUFDakIseUNBQXlDO1FBQ3pDLDhCQUE4QjtRQUM5QixZQUFNLEdBQUMsQ0FBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzNCLFNBQUcsR0FBQyxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUE7UUFFZixhQUFPLEdBQVMsSUFBSSxDQUFBLENBQUEsSUFBSTtRQUV4QixlQUFTLEdBQVEsRUFBRSxDQUFDOztRQXNHcEIsaUJBQWlCO0lBQ3JCLENBQUM7SUF0R0csNkJBQUssR0FBTDtRQUNJLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNuRCxJQUFJLElBQUksR0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN0RixJQUFJLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQTtZQUNmLElBQUksQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUMvQjtJQUNMLENBQUM7SUFDRCxnQ0FBUSxHQUFSO1FBQ0ksSUFBSSxLQUFLLEdBQUcsa0NBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLDBCQUFVLENBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsUUFBUTtRQUNyRixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFDLEtBQUssR0FBQyxLQUFLLEdBQUMsUUFBUSxHQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBQyxLQUFLLENBQUMsR0FBQyxNQUFNLENBQUM7UUFFOUYsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsdUJBQVMsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFDRCxzQ0FBYyxHQUFkO1FBQUEsaUJBd0RDO1FBdERHLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUU7WUFJeEMscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxvQkFBb0IsR0FBRSxFQUFFLENBQUMscUJBQXFCLENBQUM7Z0JBQ3JFLFFBQVEsRUFBRSx5QkFBeUI7YUFDdEMsQ0FBQyxDQUFDO1lBRUgscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUMxRCxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7Z0JBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDcEIsQ0FBQyxDQUFDLENBQUM7WUFDSCxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzFELHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDO2dCQUN4RCxPQUFPO2dCQUNQLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFO3FCQUNoRCxJQUFJLENBQUMsY0FBTSxPQUFBLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLEVBQXJELENBQXFELENBQUM7cUJBQ2pFLEtBQUssQ0FBQyxVQUFBLEdBQUc7b0JBQ04scUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3BELENBQUMsQ0FBQyxDQUFBO1lBQ1YsQ0FBQyxDQUFDLENBQUE7WUFDRixxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7Z0JBQ3RELGdCQUFnQjtnQkFDaEIsb0NBQW9DO2dCQUNwQyxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7b0JBQzNDLGtCQUFrQjtvQkFDbEIsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2lCQUNyQjtxQkFDSTtvQkFDRCxpQkFBaUI7aUJBQ3BCO1lBQ0wsQ0FBQyxDQUFDLENBQUE7U0FFTDthQUFJO1lBQ0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3ZCO1FBR0QsOERBQThEO1FBQzlELGlCQUFpQjtRQUNqQiw2RUFBNkU7UUFDN0Usc0JBQXNCO1FBQ3RCLG1FQUFtRTtRQUNuRSwyRkFBMkY7UUFDM0Ysc0dBQXNHO1FBQ3RHLCtCQUErQjtRQUMvQixZQUFZO1FBQ1osOERBQThEO1FBQzlELDRFQUE0RTtRQUM1RSx1REFBdUQ7UUFDdkQsNkRBQTZEO1FBQzdELCtCQUErQjtRQUMvQixRQUFRO1FBQ1IsZUFBZTtJQUNuQixDQUFDO0lBQ08sb0NBQVksR0FBcEI7UUFDSSxJQUFJLEtBQUssR0FBRyxrQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsMEJBQVUsQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUEsUUFBUTtRQUN2RixrQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsMEJBQVUsQ0FBQyxRQUFRLEVBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkUsSUFBRyxLQUFLLElBQUUsRUFBRSxFQUFDO1lBQ1QsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsNkJBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNsRSxJQUFJLElBQUksR0FBQyxFQUFFLENBQUE7WUFDWCxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ25ELHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUM1RSxJQUFJLEtBQUssR0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDdkYsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTthQUNuQjtZQUNELHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkQsa0NBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLDBCQUFVLENBQUMsV0FBVyxFQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ2pFLHVCQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsbUJBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO1lBQ2xELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTtTQUN2QjthQUFJO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBQyxLQUFLLEdBQUMsS0FBSyxHQUFDLFFBQVEsR0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUMsS0FBSyxDQUFDLEdBQUMsTUFBTSxDQUFDO1NBQ2pHO0lBSUwsQ0FBQztJQUNELHFDQUFhLEdBQWI7UUFFSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyx1QkFBUyxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBO0lBQzFCLENBQUM7SUE3R0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDRDtJQVFqQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tEQUNFO0lBWkgsYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQXFIakM7SUFBRCxvQkFBQztDQXJIRCxBQXFIQyxDQXJIMEMsRUFBRSxDQUFDLFNBQVMsR0FxSHREO2tCQXJIb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmltcG9ydCBXWE1hbmFnZXJFWCwgeyBXWEFERW52bnQgfSBmcm9tIFwiLi4vLi4vc3RhcnRzY2VuZS9XWE1hbmFnZXJFWFwiO1xyXG5pbXBvcnQgeyBCb3NzUmV3YXJkTWFuYWdlciB9IGZyb20gXCIuLi9BY3Rpdml0eS9Cb3NzUmV3YXJkXCI7XHJcbmltcG9ydCBBcGtNYW5hZ2VyIGZyb20gXCIuLi9BZHMvQXBrTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBCYXR0bGVQYXNzRGF0YU1hbmFnZXIgfSBmcm9tIFwiLi4vQmF0dGxlUGFzcy9CYXR0bGVQYXNzRGF0YVwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd01hbmFnZXJcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IFRleHRMYW5ndWFnZSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9UZXh0TGFuZ3VhZ2VcIjtcclxuaW1wb3J0IHsgUGF5TWFuYWdlciB9IGZyb20gXCIuLi9QYXltZW50L1BheU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUHJvcElkIH0gZnJvbSBcIi4uL1Byb3AvUHJvcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBUdXJudGFibGVJbmZvcm1hdGlvbk1hbmFnZXIgfSBmcm9tIFwiLi4vVHVybnRhYmxlL1R1cm50YWJsZUluZm9ybWF0aW9uXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi4vVUkvVUlDb21wb25lbnRcIjtcclxuaW1wb3J0IFZpcFN5c3RlbSBmcm9tIFwiLi9WaXBTeXN0ZW1cIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVklQUHJpdmlsZWdlcyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgaXRtZTpjYy5Ob2RlW109W10vL+avj+WkqemihuWPlueahDUwMOmSu+efs+mBk+WFt+eItuiKgueCuVxyXG4gICAgaWQ9XCJjNDAxXCIvL2M0MDEgIGM1MDFcclxuICAgIEdlbW51bTpudW1iZXI9MzYwXHJcbiAgICAvLyBwcm9waWQ9W1Byb3BJZC5HZW0sMTAwMDIsNDAwMDQsMTAxMDA0XVxyXG4gICAgLy8gbnVtPVt0aGlzLkdlbW51bSw1MDAsMTAsMjBdXHJcbiAgICBwcm9waWQ9WzEwMDAyLDQwMDA0LDEwMTAwNF1cclxuICAgIG51bT1bNTAwLDEwLDIwXVxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBsYW5UZXh0OmNjLk5vZGU9bnVsbC8v5Lu35qC8XHJcblxyXG4gICAgbWF4QWFkTnVtOm51bWJlcj0xMDtcclxuICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5pdG1lLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRtZT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHRoaXMucHJvcGlkW2luZGV4XSx0aGlzLm51bVtpbmRleF0pO1xyXG4gICAgICAgICAgICBpdG1lLnNjYWxlPTAuODVcclxuICAgICAgICAgICAgaXRtZS5wYXJlbnQ9dGhpcy5pdG1lW2luZGV4XVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uRW5hYmxlKCl7XHJcbiAgICAgICAgbGV0IGFkTnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5WSVBBRE51bSwwKTsvL+ingueci+W5v+WRiuasoeaVsFxyXG4gICAgICAgIHRoaXMubGFuVGV4dC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIuW3suingueci1wiK2FkTnVtK1wi5qyh5bm/5ZGK77yM6L+Y5beuXCIrKHRoaXMubWF4QWFkTnVtLWFkTnVtKStcIuasoeWPr+ino+mUgVwiO1xyXG5cclxuICAgICAgICBjYy5kaXJlY3Rvci5vbihXWEFERW52bnQuWkhBTkxJTkdKSUVTVU9TSElQSU4sIHRoaXMub25TaGlwaW5Db21wLCB0aGlzKTtcclxuICAgIH1cclxuICAgIGNsaWNrQnRuYnRuTGFuKCl7Ly/otK3kubBcclxuXHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLldFQ0hBVF9HQU1FKSB7XHJcblxyXG4gICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnpoYW5saW5namllc3VvU2hpcGluPSB3eC5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoe1xyXG4gICAgICAgICAgICAgICAgYWRVbml0SWQ6ICdhZHVuaXQtNWQwMTQ4NzczNzE1ZjYxMydcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnpoYW5saW5namllc3VvU2hpcGluLm9mZkVycm9yKCk7XHJcbiAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkuemhhbmxpbmdqaWVzdW9TaGlwaW4ub25FcnJvcihlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS56aGFubGluZ2ppZXN1b1NoaXBpbi5vZmZDbG9zZSgpO1xyXG4gICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnpoYW5saW5namllc3VvU2hpcGluLnNob3coKS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyDlpLHotKXph43or5VcclxuICAgICAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkuemhhbmxpbmdqaWVzdW9TaGlwaW4ubG9hZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS56aGFubGluZ2ppZXN1b1NoaXBpbi5zaG93KCkpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoXCLlub/lkYrmi4nlj5blpLHotKVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS56aGFubGluZ2ppZXN1b1NoaXBpbi5vbkNsb3NlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyDnlKjmiLfngrnlh7vkuobjgJDlhbPpl63lub/lkYrjgJHmjInpkq5cclxuICAgICAgICAgICAgICAgIC8vIOWwj+S6jiAyLjEuMCDnmoTln7rnoYDlupPniYjmnKzvvIxyZXMg5piv5LiA5LiqIHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuaXNFbmRlZCB8fCByZXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAvLyDmraPluLjmkq3mlL7nu5PmnZ/vvIzlj6/ku6XkuIvlj5HmuLjmiI/lpZblirFcclxuICAgICAgICAgICAgICAgICAgdGhpcy5vblNoaXBpbkNvbXAoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOaSreaUvuS4remAlOmAgOWHuu+8jOS4jeS4i+WPkea4uOaIj+WlluWKsVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5vblNoaXBpbkNvbXAoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvLyBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1BheSh7cmVzdWx0Oihpc1BheTpib29sZWFuKT0+e1xyXG4gICAgICAgIC8vICAgICBpZihpc1BheSl7XHJcbiAgICAgICAgLy8gICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5oiY5Luk6LSt5Lmw6auY57qn5oiY5Luk5oiQ5Yqf5Lq65pWwKTtcclxuICAgICAgICAvLyAgICAgICAgIGxldCBpdG1lPVtdXHJcbiAgICAgICAgLy8gICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5pdG1lLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bSh0aGlzLnByb3BpZFtpbmRleF0sdGhpcy5udW1baW5kZXhdKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBsZXQgaXRtZXM9UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbSh0aGlzLnByb3BpZFtpbmRleF0sdGhpcy5udW1baW5kZXhdKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBpdG1lLnB1c2goaXRtZXMpXHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNdWx0aXBsZUdldFRpcChpdG1lKTtcclxuICAgICAgICAvLyAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlZpcElkZW50aXR5LDEpXHJcbiAgICAgICAgLy8gICAgICAgICBQYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkUGF5TnVtKHRoaXMuaWQpO1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5ub2RlLnBhcmVudC5nZXRDb21wb25lbnQoVmlwU3lzdGVtKS5SZWZyZXNoKClcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuY2xpY2tCdG5DbG9zZSgpXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9fSx0aGlzLmlkKSBcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25TaGlwaW5Db21wKCk6dm9pZHtcclxuICAgICAgICBsZXQgYWROdW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlZJUEFETnVtLDApKzE7Ly/op4LnnIvlub/lkYrmrKHmlbBcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5WSVBBRE51bSxhZE51bSk7XHJcbiAgICAgICAgaWYoYWROdW09PTEwKXtcclxuICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaImOS7pOi0reS5sOmrmOe6p+aImOS7pOaIkOWKn+S6uuaVsCk7XHJcbiAgICAgICAgICAgIGxldCBpdG1lPVtdXHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLml0bWUubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odGhpcy5wcm9waWRbaW5kZXhdLHRoaXMubnVtW2luZGV4XSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRtZXM9UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbSh0aGlzLnByb3BpZFtpbmRleF0sdGhpcy5udW1baW5kZXhdKTtcclxuICAgICAgICAgICAgICAgIGl0bWUucHVzaChpdG1lcylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNdWx0aXBsZUdldFRpcChpdG1lKTtcclxuICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVmlwSWRlbnRpdHksMSlcclxuICAgICAgICAgICAgUGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFBheU51bSh0aGlzLmlkKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnBhcmVudC5nZXRDb21wb25lbnQoVmlwU3lzdGVtKS5SZWZyZXNoKClcclxuICAgICAgICAgICAgdGhpcy5jbGlja0J0bkNsb3NlKClcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5sYW5UZXh0LmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwi5bey6KeC55yLXCIrYWROdW0rXCLmrKHlub/lkYrvvIzov5jlt65cIisodGhpcy5tYXhBYWROdW0tYWROdW0pK1wi5qyh5Y+v6Kej6ZSBXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICBcclxuICAgICAgIFxyXG4gICAgfVxyXG4gICAgY2xpY2tCdG5DbG9zZSgpLy/lhbPpl61cclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLm9mZihXWEFERW52bnQuWkhBTkxJTkdKSUVTVU9TSElQSU4sIHRoaXMub25TaGlwaW5Db21wLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlPWZhbHNlXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19