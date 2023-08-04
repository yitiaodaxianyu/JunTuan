
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Ui/HeroListUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '71ec2jK68VMMJqsVtt/ieNQ', 'HeroListUi');
// Scripts/Hero/Ui/HeroListUi.ts

"use strict";
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
var WXManagerEX_1 = require("../../../startscene/WXManagerEX");
var GameManager_1 = require("../../GameManager");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var PropManager_1 = require("../../Prop/PropManager");
var RedTip_1 = require("../../Tools/RedTip");
var TutorailsManager_1 = require("../../Tutorials/TutorailsManager");
var UIConfig_1 = require("../../UI/UIConfig");
var UIManager_1 = require("../../UI/UIManager");
var HeroAttribute_1 = require("../Data/HeroAttribute");
var HeroBaseInfo_1 = require("../Data/HeroBaseInfo");
var HeroManager_1 = require("../Data/HeroManager");
var HeroQuality_1 = require("../Data/HeroQuality");
var HeroConfig_1 = require("../Game/HeroConfig");
var HeroItem_1 = require("./HeroItem");
var RoleUi_1 = require("./RoleUi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HeroListUi = /** @class */ (function (_super) {
    __extends(HeroListUi, _super);
    function HeroListUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hero_item = null;
        _this.contentView = null;
        return _this;
        // unlockHeroItemSort(list:JsonHeroBaseInfo[]){
        //     for(let i = 0;i < list.length - 1;i++){
        //         for(let j = 0; j < list.length - 1 - i;j++){
        //             if(list[j].Quality > list[j+1].Quality){
        //                 let temp;
        //                 temp = list[j];
        //                 list[j] = list[j+1];
        //                 list[j+1] = temp;
        //             }else if(list[j].Quality == list[j+1].Quality){
        //                 let temp;
        //                 temp = list[j];
        //                 list[j] = list[j+1];
        //                 list[j+1] = temp;
        //             }
        //         }
        //     }
        // }
    }
    HeroListUi_1 = HeroListUi;
    HeroListUi.prototype.onLoad = function () {
        this.node.on(cc.Node.EventType.POSITION_CHANGED, this.onPositionChange, this);
    };
    HeroListUi.prototype.onDestroy = function () {
        this.node.off(cc.Node.EventType.POSITION_CHANGED, this.onPositionChange, this);
    };
    HeroListUi.prototype.onPositionChange = function () {
        if (this.node.x == 0) {
            this.onRefresh();
        }
    };
    HeroListUi.prototype.onEnable = function () {
        this.checkTutorails();
    };
    HeroListUi.prototype.checkTutorails = function () {
        if (TutorailsManager_1.default.getInstance().isShowTutorials(301) == false && TutorailsManager_1.default.getInstance().isShowTutorials(302)) {
            //218完成显示
            //升级引导
            TutorailsManager_1.default.getInstance().is_tutorails_state = true;
            this.scheduleOnce(function () {
                //显示英雄页-兽王
                UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.HeroGrowth, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                        uiNode.getComponent(RoleUi_1.default).init({
                            onClose: function () {
                                cc.find('Canvas/hero_list_ui').getComponent(HeroListUi_1).onRefresh();
                            }
                        });
                        uiNode.getComponent(RoleUi_1.default).initData(HeroConfig_1.Hero_Type.ShouWang);
                    }, });
            }, 0.1);
            return true;
        }
        else if (TutorailsManager_1.default.getInstance().isShowTutorials(311) == false && TutorailsManager_1.default.getInstance().isShowTutorials(312)) {
            //显示英雄页
            TutorailsManager_1.default.getInstance().is_tutorails_state = true;
            this.scheduleOnce(function () {
                UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.HeroGrowth, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                        uiNode.getComponent(RoleUi_1.default).init({
                            onClose: function () {
                                cc.find('Canvas/hero_list_ui').getComponent(HeroListUi_1).onRefresh();
                            }
                        });
                        uiNode.getComponent(RoleUi_1.default).initData(HeroConfig_1.Hero_Type.PaoShou);
                    }, });
            }, 0.1);
            return true;
        }
    };
    HeroListUi.prototype.start = function () {
        this.onUiInit();
    };
    HeroListUi.prototype.onUiInit = function () {
        var _this = this;
        var content = this.node.getChildByName('scroll').getComponent(cc.ScrollView).content;
        content.removeAllChildren();
        var allHeroList = [];
        var canUnlockList = [];
        var canIncreaseStarList = [];
        var unlockList = [];
        var maxList = [];
        var lockList = [];
        var tempList = [];
        if (WXManagerEX_1.default.getInstance().statusBarHeight > 20) {
            this.contentView.getComponent(cc.Widget).top = 150 + 99;
        }
        else {
            this.contentView.getComponent(cc.Widget).top = 99;
        }
        HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getData().forEach(function (v, k) {
            allHeroList.push(v);
        });
        for (var i = 0; i < allHeroList.length; i++) {
            var info = HeroManager_1.HeroManager.getInstance().getHeroInfo(allHeroList[i].Hero_ID);
            if (info) {
                // let propNum =PropManager.getInstance().getPropNum(allHeroList[i].HeroFragment);
                // let needNum =HeroQualityManager.getInstance().getCostDebrisByHeroTypeAndStage(allHeroList[i].Quality,info.hero_stage);
                if (PropManager_1.PropManager.getInstance().getPropNum(allHeroList[i].HeroFragment) >= HeroQuality_1.HeroQualityManager.getInstance().getCostDebrisByHeroQualityAndStage(allHeroList[i].Quality, info.hero_stage)) {
                    if (HeroQuality_1.HeroQualityManager.getInstance().getCostDebrisByHeroQualityAndStage(allHeroList[i].Quality, info.hero_stage) == 0) {
                        maxList.push(allHeroList[i]);
                    }
                    else {
                        canIncreaseStarList.push(allHeroList[i]);
                    }
                }
                else {
                    unlockList.push(allHeroList[i]);
                }
            }
            else {
                if (PropManager_1.PropManager.getInstance().getPropNum(allHeroList[i].HeroFragment) >= allHeroList[i].UnlockFragmentNum) {
                    canUnlockList.push(allHeroList[i]);
                }
                else {
                    lockList.push(allHeroList[i]);
                }
            }
        }
        canUnlockList.sort(this.lockHeroItemSort);
        lockList.sort(this.lockHeroItemSort);
        canIncreaseStarList.sort(this.unlockHeroItemSort);
        canIncreaseStarList.sort(this.unlockHeroItemSort);
        maxList.sort(this.unlockHeroItemSort);
        unlockList.sort(this.unlockHeroItemSort);
        unlockList.sort(this.unlockHeroItemSort);
        // this.lockHeroItemSort(canUnlockList);
        // this.lockHeroItemSort(lockList);
        // this.unlockHeroItemSort(canIncreaseStarList);
        // this.unlockHeroItemSort(unlockList);
        tempList = tempList.concat(canUnlockList, canIncreaseStarList, maxList, unlockList, lockList);
        var sqrtList = [];
        tempList.forEach(function (v, k) {
            if (v.Available == 1) {
                sqrtList.push(v);
            }
        });
        var _loop_1 = function (i) {
            var item = cc.instantiate(this_1.hero_item);
            item.name = 'item' + i;
            item.getComponent(HeroItem_1.default).init(tempList[i].Hero_ID, tempList[i].HeroFragment);
            if (tempList[i].Available == 1) {
                item.on(cc.Node.EventType.TOUCH_END, function () {
                    UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.HeroGrowth, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                            uiNode.getComponent(RoleUi_1.default).init({
                                onClose: function () {
                                    _this.onRefresh();
                                    GameManager_1.default.getInstance().refreshCoinShow();
                                }
                            });
                            uiNode.getComponent(RoleUi_1.default).initData(tempList[i].Hero_ID, sqrtList);
                        }, });
                }, this_1);
            }
            else {
                item.on(cc.Node.EventType.TOUCH_END, function () {
                    var s = LanguageManager_1.default.getInstance().getStrByTextId(100113);
                    GameManager_1.default.getInstance().showMessage(s);
                }, this_1);
            }
            content.addChild(item);
        };
        var this_1 = this;
        for (var i = 0; i < tempList.length; i++) {
            _loop_1(i);
        }
    };
    HeroListUi.prototype.onRefresh = function () {
        var _this = this;
        var content = this.node.getChildByName('scroll').getComponent(cc.ScrollView).content;
        // content.removeAllChildren();
        var allHeroList = [];
        var canUnlockList = [];
        var canIncreaseStarList = [];
        var unlockList = [];
        var maxList = [];
        var lockList = [];
        var tempList = [];
        HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getData().forEach(function (v, k) {
            allHeroList.push(v);
        });
        for (var i = 0; i < allHeroList.length; i++) {
            var info = HeroManager_1.HeroManager.getInstance().getHeroInfo(allHeroList[i].Hero_ID);
            if (info) {
                // let propNum =PropManager.getInstance().getPropNum(allHeroList[i].HeroFragment);
                // let needNum =HeroQualityManager.getInstance().getCostDebrisByHeroTypeAndStage(allHeroList[i].Quality,info.hero_stage);
                if (PropManager_1.PropManager.getInstance().getPropNum(allHeroList[i].HeroFragment) >= HeroQuality_1.HeroQualityManager.getInstance().getCostDebrisByHeroQualityAndStage(allHeroList[i].Quality, info.hero_stage)) {
                    if (info.hero_stage == allHeroList[i].MaxStage) {
                        maxList.push(allHeroList[i]);
                    }
                    else {
                        canIncreaseStarList.push(allHeroList[i]);
                    }
                }
                else {
                    if (info.hero_stage == allHeroList[i].MaxStage) {
                        maxList.push(allHeroList[i]);
                    }
                    else {
                        unlockList.push(allHeroList[i]);
                    }
                }
            }
            else {
                if (PropManager_1.PropManager.getInstance().getPropNum(allHeroList[i].HeroFragment) >= allHeroList[i].UnlockFragmentNum) {
                    canUnlockList.push(allHeroList[i]);
                }
                else {
                    lockList.push(allHeroList[i]);
                }
            }
        }
        canUnlockList.sort(this.lockHeroItemSort);
        lockList.sort(this.lockHeroItemSort);
        canIncreaseStarList.sort(this.unlockHeroItemSort);
        canIncreaseStarList.sort(this.unlockHeroItemSort);
        maxList.sort(this.unlockHeroItemSort);
        unlockList.sort(this.unlockHeroItemSort);
        unlockList.sort(this.unlockHeroItemSort);
        // this.lockHeroItemSort(canUnlockList);
        // this.lockHeroItemSort(lockList);
        // this.unlockHeroItemSort(canIncreaseStarList);
        // this.unlockHeroItemSort(unlockList);
        tempList = tempList.concat(canUnlockList, canIncreaseStarList, maxList, unlockList, lockList);
        var sqrtList = [];
        tempList.forEach(function (v, k) {
            if (v.Available == 1) {
                sqrtList.push(v);
            }
        });
        var _loop_2 = function (i) {
            // let item = cc.instantiate(this.hero_item);
            var item = content.getChildByName("item" + i);
            item.off(cc.Node.EventType.TOUCH_END);
            item.getComponent(HeroItem_1.default).init(tempList[i].Hero_ID, tempList[i].HeroFragment);
            if (tempList[i].Available == 1) {
                item.on(cc.Node.EventType.TOUCH_END, function () {
                    UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.HeroGrowth, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                            uiNode.getComponent(RoleUi_1.default).init({
                                onClose: function () {
                                    _this.onRefresh();
                                }
                            });
                            uiNode.getComponent(RoleUi_1.default).initData(tempList[i].Hero_ID, sqrtList);
                        }, });
                }, this_2);
            }
            else {
                item.on(cc.Node.EventType.TOUCH_END, function () {
                    var s = LanguageManager_1.default.getInstance().getStrByTextId(100113);
                    GameManager_1.default.getInstance().showMessage(s);
                }, this_2);
            }
            // content.addChild(item);
            var red = item.getChildByName('RedTip').getComponent(RedTip_1.default);
            red.cancelEvent();
            red.self_red_type = HeroManager_1.HeroManager.getRedTypeByHeroType(tempList[i].Hero_ID);
            red.registerEvent();
            red.checkSelf(true);
        };
        var this_2 = this;
        for (var i = 0; i < tempList.length; i++) {
            _loop_2(i);
        }
    };
    /**未解锁英雄排序 */
    HeroListUi.prototype.lockHeroItemSort = function (a, b) {
        if (a.Quality < b.Quality)
            return 1;
        return -1;
    };
    // lockHeroItemSort(list:JsonHeroBaseInfo[]){
    //     for(let i = 0;i < list.length - 1;i++){
    //         for(let j = 0; j < list.length - 1 - i;j++){
    //             if(list[j].Quality > list[j+1].Quality){
    //                 let temp;
    //                 temp = list[j];
    //                 list[j] = list[j+1];
    //                 list[j+1] = temp;
    //             }
    //         }
    //     }
    // }
    /**已解锁英雄排序 */
    HeroListUi.prototype.unlockHeroItemSort = function (a, b) {
        if (a.Quality < b.Quality) {
            return 1;
        }
        else if (a.Quality == b.Quality) {
            var starA = HeroAttribute_1.HeroAttributeManager.getInstance().getStarByHeroTypeAndStage(a.Hero_ID, HeroManager_1.HeroManager.getInstance().getHeroStage(a.Hero_ID));
            var starB = HeroAttribute_1.HeroAttributeManager.getInstance().getStarByHeroTypeAndStage(b.Hero_ID, HeroManager_1.HeroManager.getInstance().getHeroStage(b.Hero_ID));
            if (starA < starB) {
                return 1;
            }
            else if (starA == starB) {
                var infoA = HeroManager_1.HeroManager.getInstance().getHeroLevel(a.Hero_ID);
                var infoB = HeroManager_1.HeroManager.getInstance().getHeroLevel(a.Hero_ID);
                if (infoA < infoB)
                    return 1;
            }
        }
        return -1;
    };
    var HeroListUi_1;
    __decorate([
        property(cc.Prefab)
    ], HeroListUi.prototype, "hero_item", void 0);
    __decorate([
        property(cc.Node)
    ], HeroListUi.prototype, "contentView", void 0);
    HeroListUi = HeroListUi_1 = __decorate([
        ccclass
    ], HeroListUi);
    return HeroListUi;
}(cc.Component));
exports.default = HeroListUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcVWlcXEhlcm9MaXN0VWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0RBQTBEO0FBRTFELGlEQUE0QztBQUU1Qyx1RUFBa0U7QUFDbEUsc0RBQXFEO0FBRXJELDZDQUF3QztBQUN4QyxxRUFBZ0U7QUFFaEUsOENBQXlEO0FBQ3pELGdEQUErQztBQUMvQyx1REFBNkQ7QUFDN0QscURBQTZFO0FBQzdFLG1EQUFrRDtBQUNsRCxtREFBeUQ7QUFDekQsaURBQStDO0FBQy9DLHVDQUFrQztBQUNsQyxtQ0FBOEI7QUFFeEIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBd0MsOEJBQVk7SUFBcEQ7UUFBQSxxRUF3VEM7UUFyVEcsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQixpQkFBVyxHQUFXLElBQUksQ0FBQzs7UUFpUzNCLCtDQUErQztRQUMvQyw4Q0FBOEM7UUFDOUMsdURBQXVEO1FBQ3ZELHVEQUF1RDtRQUN2RCw0QkFBNEI7UUFDNUIsa0NBQWtDO1FBQ2xDLHVDQUF1QztRQUN2QyxvQ0FBb0M7UUFDcEMsOERBQThEO1FBQzlELDRCQUE0QjtRQUM1QixrQ0FBa0M7UUFDbEMsdUNBQXVDO1FBQ3ZDLG9DQUFvQztRQUNwQyxnQkFBZ0I7UUFDaEIsWUFBWTtRQUNaLFFBQVE7UUFDUixJQUFJO0lBQ1IsQ0FBQzttQkF4VG9CLFVBQVU7SUFRakIsMkJBQU0sR0FBaEI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFFaEYsQ0FBQztJQUVTLDhCQUFTLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FB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LENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO1lBQ3JJLElBQUcsS0FBSyxHQUFHLEtBQUssRUFBQztnQkFDYixPQUFPLENBQUMsQ0FBQzthQUNaO2lCQUFLLElBQUcsS0FBSyxJQUFJLEtBQUssRUFBQztnQkFDcEIsSUFBSSxLQUFLLEdBQUcseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM5RCxJQUFJLEtBQUssR0FBRyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzlELElBQUcsS0FBSyxHQUFHLEtBQUs7b0JBQUUsT0FBTyxDQUFDLENBQUM7YUFDOUI7U0FDSjtRQUNELE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDZCxDQUFDOztJQWxTRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2lEQUNPO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7bURBQ1M7SUFOVixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBd1Q5QjtJQUFELGlCQUFDO0NBeFRELEFBd1RDLENBeFR1QyxFQUFFLENBQUMsU0FBUyxHQXdUbkQ7a0JBeFRvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdYTWFuYWdlckVYIGZyb20gXCIuLi8uLi8uLi9zdGFydHNjZW5lL1dYTWFuYWdlckVYXCI7XHJcbmltcG9ydCB7IEdhbWVNb2RlIH0gZnJvbSBcIi4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFJld2FyZEhlcm9EYXRhIH0gZnJvbSBcIi4uLy4uL0pzb25EYXRhL0xldmVsSnNvbkRhdGFcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgU3RvcmVIZXJvVWkgZnJvbSBcIi4uLy4uL1N0b3JlL1N0b3JlSGVyb1VpXCI7XHJcbmltcG9ydCBSZWRUaXAgZnJvbSBcIi4uLy4uL1Rvb2xzL1JlZFRpcFwiO1xyXG5pbXBvcnQgVHV0b3JhaWxzTWFuYWdlciBmcm9tIFwiLi4vLi4vVHV0b3JpYWxzL1R1dG9yYWlsc01hbmFnZXJcIjtcclxuaW1wb3J0IE1haW5VaSBmcm9tIFwiLi4vLi4vVUkvaG9tZS9NYWluVWlcIjtcclxuaW1wb3J0IHsgVUlMYXllckxldmVsLCBVSVBhdGggfSBmcm9tIFwiLi4vLi4vVUkvVUlDb25maWdcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1VJL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvQXR0cmlidXRlTWFuYWdlciB9IGZyb20gXCIuLi9EYXRhL0hlcm9BdHRyaWJ1dGVcIjtcclxuaW1wb3J0IHsgSGVyb0Jhc2VJbmZvTWFuYWdlciwgSnNvbkhlcm9CYXNlSW5mbyB9IGZyb20gXCIuLi9EYXRhL0hlcm9CYXNlSW5mb1wiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi9EYXRhL0hlcm9NYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9RdWFsaXR5TWFuYWdlciB9IGZyb20gXCIuLi9EYXRhL0hlcm9RdWFsaXR5XCI7XHJcbmltcG9ydCB7IEhlcm9fVHlwZSB9IGZyb20gXCIuLi9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IEhlcm9JdGVtIGZyb20gXCIuL0hlcm9JdGVtXCI7XHJcbmltcG9ydCBSb2xlVWkgZnJvbSBcIi4vUm9sZVVpXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlcm9MaXN0VWkgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBoZXJvX2l0ZW06Y2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGNvbnRlbnRWaWV3OmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlBPU0lUSU9OX0NIQU5HRUQsdGhpcy5vblBvc2l0aW9uQ2hhbmdlLHRoaXMpO1xyXG4gICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlBPU0lUSU9OX0NIQU5HRUQsdGhpcy5vblBvc2l0aW9uQ2hhbmdlLHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUG9zaXRpb25DaGFuZ2UoKXtcclxuICAgICAgICBpZih0aGlzLm5vZGUueD09MCl7XHJcbiAgICAgICAgICAgIHRoaXMub25SZWZyZXNoKCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNoZWNrVHV0b3JhaWxzKCk7ICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrVHV0b3JhaWxzKCl7XHJcbiAgICAgICAgaWYoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygzMDEpPT1mYWxzZSYmVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygzMDIpKXtcclxuICAgICAgICAgICAgLy8yMTjlrozmiJDmmL7npLpcclxuICAgICAgICAgICAgLy/ljYfnuqflvJXlr7xcclxuICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZT10cnVlOyAgIFxyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgLy/mmL7npLroi7Hpm4TpobUt5YW9546LXHJcbiAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkhlcm9Hcm93dGgsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PntcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFJvbGVVaSkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9oZXJvX2xpc3RfdWknKS5nZXRDb21wb25lbnQoSGVyb0xpc3RVaSkub25SZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFJvbGVVaSkuaW5pdERhdGEoSGVyb19UeXBlLlNob3VXYW5nKTtcclxuICAgICAgICAgICAgICAgIH0sfSlcclxuICAgICAgICAgICAgfSwwLjEpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfWVsc2UgaWYoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygzMTEpPT1mYWxzZSYmVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygzMTIpKXtcclxuICAgICAgICAgICAgLy/mmL7npLroi7Hpm4TpobVcclxuICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZT10cnVlOyAgICBcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguSGVyb0dyb3d0aCxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoUm9sZVVpKS5pbml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL2hlcm9fbGlzdF91aScpLmdldENvbXBvbmVudChIZXJvTGlzdFVpKS5vblJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoUm9sZVVpKS5pbml0RGF0YShIZXJvX1R5cGUuUGFvU2hvdSk7XHJcbiAgICAgICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgICAgIH0sMC4xKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlOyAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25VaUluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblVpSW5pdCgpe1xyXG4gICAgICAgIGxldCBjb250ZW50ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdzY3JvbGwnKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudDtcclxuICAgICAgICBjb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgbGV0IGFsbEhlcm9MaXN0Okpzb25IZXJvQmFzZUluZm9bXSA9IFtdO1xyXG4gICAgICAgIGxldCBjYW5VbmxvY2tMaXN0Okpzb25IZXJvQmFzZUluZm9bXSA9IFtdO1xyXG4gICAgICAgIGxldCBjYW5JbmNyZWFzZVN0YXJMaXN0Okpzb25IZXJvQmFzZUluZm9bXSA9IFtdO1xyXG4gICAgICAgIGxldCB1bmxvY2tMaXN0Okpzb25IZXJvQmFzZUluZm9bXSA9IFtdO1xyXG4gICAgICAgIGxldCBtYXhMaXN0Okpzb25IZXJvQmFzZUluZm9bXSA9IFtdO1xyXG4gICAgICAgIGxldCBsb2NrTGlzdDpKc29uSGVyb0Jhc2VJbmZvW10gPSBbXTtcclxuICAgICAgICBsZXQgdGVtcExpc3Q6SnNvbkhlcm9CYXNlSW5mb1tdID0gW107XHJcbiAgICAgICAgaWYoV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5zdGF0dXNCYXJIZWlnaHQ+MjApeyAgIFxyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRWaWV3LmdldENvbXBvbmVudChjYy5XaWRnZXQpLnRvcCA9IDE1MCs5OTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50Vmlldy5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS50b3AgPSA5OTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREYXRhKCkuZm9yRWFjaCgodixrKSA9PntcclxuICAgICAgICAgICAgYWxsSGVyb0xpc3QucHVzaCh2KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgYWxsSGVyb0xpc3QubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGxldCBpbmZvID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvSW5mbyhhbGxIZXJvTGlzdFtpXS5IZXJvX0lEKVxyXG4gICAgICAgICAgICBpZihpbmZvKXtcclxuICAgICAgICAgICAgICAgIC8vIGxldCBwcm9wTnVtID1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oYWxsSGVyb0xpc3RbaV0uSGVyb0ZyYWdtZW50KTtcclxuICAgICAgICAgICAgICAgIC8vIGxldCBuZWVkTnVtID1IZXJvUXVhbGl0eU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb3N0RGVicmlzQnlIZXJvVHlwZUFuZFN0YWdlKGFsbEhlcm9MaXN0W2ldLlF1YWxpdHksaW5mby5oZXJvX3N0YWdlKTtcclxuICAgICAgICAgICAgICAgIGlmKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShhbGxIZXJvTGlzdFtpXS5IZXJvRnJhZ21lbnQpID49IEhlcm9RdWFsaXR5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvc3REZWJyaXNCeUhlcm9RdWFsaXR5QW5kU3RhZ2UoYWxsSGVyb0xpc3RbaV0uUXVhbGl0eSxpbmZvLmhlcm9fc3RhZ2UpKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihIZXJvUXVhbGl0eU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb3N0RGVicmlzQnlIZXJvUXVhbGl0eUFuZFN0YWdlKGFsbEhlcm9MaXN0W2ldLlF1YWxpdHksaW5mby5oZXJvX3N0YWdlKSA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4TGlzdC5wdXNoKGFsbEhlcm9MaXN0W2ldKVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5JbmNyZWFzZVN0YXJMaXN0LnB1c2goYWxsSGVyb0xpc3RbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHVubG9ja0xpc3QucHVzaChhbGxIZXJvTGlzdFtpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKGFsbEhlcm9MaXN0W2ldLkhlcm9GcmFnbWVudCkgPj0gYWxsSGVyb0xpc3RbaV0uVW5sb2NrRnJhZ21lbnROdW0pe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhblVubG9ja0xpc3QucHVzaChhbGxIZXJvTGlzdFtpXSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBsb2NrTGlzdC5wdXNoKGFsbEhlcm9MaXN0W2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FuVW5sb2NrTGlzdC5zb3J0KHRoaXMubG9ja0hlcm9JdGVtU29ydCk7XHJcbiAgICAgICAgbG9ja0xpc3Quc29ydCh0aGlzLmxvY2tIZXJvSXRlbVNvcnQpO1xyXG4gICAgICAgIGNhbkluY3JlYXNlU3Rhckxpc3Quc29ydCh0aGlzLnVubG9ja0hlcm9JdGVtU29ydCk7XHJcbiAgICAgICAgY2FuSW5jcmVhc2VTdGFyTGlzdC5zb3J0KHRoaXMudW5sb2NrSGVyb0l0ZW1Tb3J0KTtcclxuICAgICAgICBtYXhMaXN0LnNvcnQodGhpcy51bmxvY2tIZXJvSXRlbVNvcnQpO1xyXG4gICAgICAgIHVubG9ja0xpc3Quc29ydCh0aGlzLnVubG9ja0hlcm9JdGVtU29ydCk7XHJcbiAgICAgICAgdW5sb2NrTGlzdC5zb3J0KHRoaXMudW5sb2NrSGVyb0l0ZW1Tb3J0KTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5sb2NrSGVyb0l0ZW1Tb3J0KGNhblVubG9ja0xpc3QpO1xyXG4gICAgICAgIC8vIHRoaXMubG9ja0hlcm9JdGVtU29ydChsb2NrTGlzdCk7XHJcbiAgICAgICAgLy8gdGhpcy51bmxvY2tIZXJvSXRlbVNvcnQoY2FuSW5jcmVhc2VTdGFyTGlzdCk7XHJcbiAgICAgICAgLy8gdGhpcy51bmxvY2tIZXJvSXRlbVNvcnQodW5sb2NrTGlzdCk7XHJcblxyXG4gICAgICAgIHRlbXBMaXN0ID0gdGVtcExpc3QuY29uY2F0KGNhblVubG9ja0xpc3QsY2FuSW5jcmVhc2VTdGFyTGlzdCxtYXhMaXN0LHVubG9ja0xpc3QsbG9ja0xpc3QpO1xyXG5cclxuICAgICAgICBsZXQgc3FydExpc3QgPSBbXTtcclxuXHJcbiAgICAgICAgdGVtcExpc3QuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICBpZih2LkF2YWlsYWJsZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgIHNxcnRMaXN0LnB1c2godik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCB0ZW1wTGlzdC5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmhlcm9faXRlbSk7XHJcbiAgICAgICAgICAgIGl0ZW0ubmFtZSA9ICdpdGVtJyArIGk7XHJcbiAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KEhlcm9JdGVtKS5pbml0KHRlbXBMaXN0W2ldLkhlcm9fSUQsdGVtcExpc3RbaV0uSGVyb0ZyYWdtZW50KTtcclxuICAgICAgICAgICAgaWYodGVtcExpc3RbaV0uQXZhaWxhYmxlID09IDEpe1xyXG4gICAgICAgICAgICAgICAgaXRlbS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkhlcm9Hcm93dGgsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChSb2xlVWkpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25SZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoQ29pblNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoUm9sZVVpKS5pbml0RGF0YSh0ZW1wTGlzdFtpXS5IZXJvX0lELHNxcnRMaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICB9LH0pO1xyXG4gICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpdGVtLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzID0gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMTEzKTtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKHMpO1xyXG4gICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb250ZW50LmFkZENoaWxkKGl0ZW0pO1xyXG4gICAgICAgICAgICAvLyBsZXQgcmVkPWl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ1JlZFRpcCcpLmdldENvbXBvbmVudChSZWRUaXApO1xyXG4gICAgICAgICAgICAvLyByZWQuc2VsZl9yZWRfdHlwZT1IZXJvTWFuYWdlci5nZXRSZWRUeXBlQnlIZXJvVHlwZSh0ZW1wTGlzdFtpXS5IZXJvX0lEKTtcclxuICAgICAgICAgICAgLy8gcmVkLnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25SZWZyZXNoKCl7ICAgICAgICBcclxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnc2Nyb2xsJykuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAgICAgLy8gY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIGxldCBhbGxIZXJvTGlzdDpKc29uSGVyb0Jhc2VJbmZvW10gPSBbXTtcclxuICAgICAgICBsZXQgY2FuVW5sb2NrTGlzdDpKc29uSGVyb0Jhc2VJbmZvW10gPSBbXTtcclxuICAgICAgICBsZXQgY2FuSW5jcmVhc2VTdGFyTGlzdDpKc29uSGVyb0Jhc2VJbmZvW10gPSBbXTtcclxuICAgICAgICBsZXQgdW5sb2NrTGlzdDpKc29uSGVyb0Jhc2VJbmZvW10gPSBbXTtcclxuICAgICAgICBsZXQgbWF4TGlzdDpKc29uSGVyb0Jhc2VJbmZvW10gPSBbXTtcclxuICAgICAgICBsZXQgbG9ja0xpc3Q6SnNvbkhlcm9CYXNlSW5mb1tdID0gW107XHJcbiAgICAgICAgbGV0IHRlbXBMaXN0Okpzb25IZXJvQmFzZUluZm9bXSA9IFtdO1xyXG5cclxuXHJcbiAgICAgICAgSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERhdGEoKS5mb3JFYWNoKCh2LGspID0+e1xyXG4gICAgICAgICAgICBhbGxIZXJvTGlzdC5wdXNoKHYpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBhbGxIZXJvTGlzdC5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgbGV0IGluZm8gPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9JbmZvKGFsbEhlcm9MaXN0W2ldLkhlcm9fSUQpXHJcbiAgICAgICAgICAgIGlmKGluZm8pe1xyXG4gICAgICAgICAgICAgICAgLy8gbGV0IHByb3BOdW0gPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShhbGxIZXJvTGlzdFtpXS5IZXJvRnJhZ21lbnQpO1xyXG4gICAgICAgICAgICAgICAgLy8gbGV0IG5lZWROdW0gPUhlcm9RdWFsaXR5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvc3REZWJyaXNCeUhlcm9UeXBlQW5kU3RhZ2UoYWxsSGVyb0xpc3RbaV0uUXVhbGl0eSxpbmZvLmhlcm9fc3RhZ2UpO1xyXG4gICAgICAgICAgICAgICAgaWYoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKGFsbEhlcm9MaXN0W2ldLkhlcm9GcmFnbWVudCkgPj0gSGVyb1F1YWxpdHlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29zdERlYnJpc0J5SGVyb1F1YWxpdHlBbmRTdGFnZShhbGxIZXJvTGlzdFtpXS5RdWFsaXR5LGluZm8uaGVyb19zdGFnZSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGluZm8uaGVyb19zdGFnZSA9PSBhbGxIZXJvTGlzdFtpXS5NYXhTdGFnZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heExpc3QucHVzaChhbGxIZXJvTGlzdFtpXSlcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuSW5jcmVhc2VTdGFyTGlzdC5wdXNoKGFsbEhlcm9MaXN0W2ldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpZihpbmZvLmhlcm9fc3RhZ2UgPT0gYWxsSGVyb0xpc3RbaV0uTWF4U3RhZ2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhMaXN0LnB1c2goYWxsSGVyb0xpc3RbaV0pXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVubG9ja0xpc3QucHVzaChhbGxIZXJvTGlzdFtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShhbGxIZXJvTGlzdFtpXS5IZXJvRnJhZ21lbnQpID49IGFsbEhlcm9MaXN0W2ldLlVubG9ja0ZyYWdtZW50TnVtKXtcclxuICAgICAgICAgICAgICAgICAgICBjYW5VbmxvY2tMaXN0LnB1c2goYWxsSGVyb0xpc3RbaV0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9ja0xpc3QucHVzaChhbGxIZXJvTGlzdFtpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhblVubG9ja0xpc3Quc29ydCh0aGlzLmxvY2tIZXJvSXRlbVNvcnQpO1xyXG4gICAgICAgIGxvY2tMaXN0LnNvcnQodGhpcy5sb2NrSGVyb0l0ZW1Tb3J0KTtcclxuICAgICAgICBjYW5JbmNyZWFzZVN0YXJMaXN0LnNvcnQodGhpcy51bmxvY2tIZXJvSXRlbVNvcnQpO1xyXG4gICAgICAgIGNhbkluY3JlYXNlU3Rhckxpc3Quc29ydCh0aGlzLnVubG9ja0hlcm9JdGVtU29ydCk7XHJcbiAgICAgICAgbWF4TGlzdC5zb3J0KHRoaXMudW5sb2NrSGVyb0l0ZW1Tb3J0KTtcclxuICAgICAgICB1bmxvY2tMaXN0LnNvcnQodGhpcy51bmxvY2tIZXJvSXRlbVNvcnQpO1xyXG4gICAgICAgIHVubG9ja0xpc3Quc29ydCh0aGlzLnVubG9ja0hlcm9JdGVtU29ydCk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMubG9ja0hlcm9JdGVtU29ydChjYW5VbmxvY2tMaXN0KTtcclxuICAgICAgICAvLyB0aGlzLmxvY2tIZXJvSXRlbVNvcnQobG9ja0xpc3QpO1xyXG4gICAgICAgIC8vIHRoaXMudW5sb2NrSGVyb0l0ZW1Tb3J0KGNhbkluY3JlYXNlU3Rhckxpc3QpO1xyXG4gICAgICAgIC8vIHRoaXMudW5sb2NrSGVyb0l0ZW1Tb3J0KHVubG9ja0xpc3QpO1xyXG5cclxuICAgICAgICB0ZW1wTGlzdCA9IHRlbXBMaXN0LmNvbmNhdChjYW5VbmxvY2tMaXN0LGNhbkluY3JlYXNlU3Rhckxpc3QsbWF4TGlzdCx1bmxvY2tMaXN0LGxvY2tMaXN0KTtcclxuXHJcbiAgICAgICAgbGV0IHNxcnRMaXN0ID0gW107XHJcblxyXG4gICAgICAgIHRlbXBMaXN0LmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgaWYodi5BdmFpbGFibGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICBzcXJ0TGlzdC5wdXNoKHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgdGVtcExpc3QubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIC8vIGxldCBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5oZXJvX2l0ZW0pO1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtXCIgKyBpKTtcclxuICAgICAgICAgICAgaXRlbS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5EKTtcclxuICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoSGVyb0l0ZW0pLmluaXQodGVtcExpc3RbaV0uSGVyb19JRCx0ZW1wTGlzdFtpXS5IZXJvRnJhZ21lbnQpO1xyXG4gICAgICAgICAgICBpZih0ZW1wTGlzdFtpXS5BdmFpbGFibGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICBpdGVtLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguSGVyb0dyb3d0aCxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFJvbGVVaSkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoUm9sZVVpKS5pbml0RGF0YSh0ZW1wTGlzdFtpXS5IZXJvX0lELHNxcnRMaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICB9LH0pO1xyXG4gICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpdGVtLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzID0gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMTEzKTtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKHMpO1xyXG4gICAgICAgICAgICAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjb250ZW50LmFkZENoaWxkKGl0ZW0pO1xyXG4gICAgICAgICAgICBsZXQgcmVkPWl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ1JlZFRpcCcpLmdldENvbXBvbmVudChSZWRUaXApO1xyXG4gICAgICAgICAgICByZWQuY2FuY2VsRXZlbnQoKTtcclxuICAgICAgICAgICAgcmVkLnNlbGZfcmVkX3R5cGU9SGVyb01hbmFnZXIuZ2V0UmVkVHlwZUJ5SGVyb1R5cGUodGVtcExpc3RbaV0uSGVyb19JRCk7XHJcbiAgICAgICAgICAgIHJlZC5yZWdpc3RlckV2ZW50KCk7XHJcbiAgICAgICAgICAgIHJlZC5jaGVja1NlbGYodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuacquino+mUgeiLsembhOaOkuW6jyAqL1xyXG4gICAgbG9ja0hlcm9JdGVtU29ydChhOkpzb25IZXJvQmFzZUluZm8sYjpKc29uSGVyb0Jhc2VJbmZvKTpudW1iZXJ7XHJcbiAgICAgICAgaWYoYS5RdWFsaXR5IDwgYi5RdWFsaXR5KSByZXR1cm4gMTtcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcbiAgICAvLyBsb2NrSGVyb0l0ZW1Tb3J0KGxpc3Q6SnNvbkhlcm9CYXNlSW5mb1tdKXtcclxuICAgIC8vICAgICBmb3IobGV0IGkgPSAwO2kgPCBsaXN0Lmxlbmd0aCAtIDE7aSsrKXtcclxuICAgIC8vICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IGxpc3QubGVuZ3RoIC0gMSAtIGk7aisrKXtcclxuICAgIC8vICAgICAgICAgICAgIGlmKGxpc3Rbal0uUXVhbGl0eSA+IGxpc3RbaisxXS5RdWFsaXR5KXtcclxuICAgIC8vICAgICAgICAgICAgICAgICBsZXQgdGVtcDtcclxuICAgIC8vICAgICAgICAgICAgICAgICB0ZW1wID0gbGlzdFtqXTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBsaXN0W2pdID0gbGlzdFtqKzFdO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGxpc3RbaisxXSA9IHRlbXA7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLyoq5bey6Kej6ZSB6Iux6ZuE5o6S5bqPICovXHJcbiAgICB1bmxvY2tIZXJvSXRlbVNvcnQoYTpKc29uSGVyb0Jhc2VJbmZvLGI6SnNvbkhlcm9CYXNlSW5mbyk6bnVtYmVye1xyXG4gICAgICAgIGlmKGEuUXVhbGl0eSA8IGIuUXVhbGl0eSl7XHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH1lbHNlIGlmKGEuUXVhbGl0eSA9PSBiLlF1YWxpdHkpe1xyXG4gICAgICAgICAgICBsZXQgc3RhckEgPSBIZXJvQXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0YXJCeUhlcm9UeXBlQW5kU3RhZ2UoYS5IZXJvX0lELEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb1N0YWdlKGEuSGVyb19JRCkpXHJcbiAgICAgICAgICAgIGxldCBzdGFyQiA9IEhlcm9BdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RhckJ5SGVyb1R5cGVBbmRTdGFnZShiLkhlcm9fSUQsSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvU3RhZ2UoYi5IZXJvX0lEKSlcclxuICAgICAgICAgICAgaWYoc3RhckEgPCBzdGFyQil7IFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHN0YXJBID09IHN0YXJCKXtcclxuICAgICAgICAgICAgICAgIGxldCBpbmZvQSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0xldmVsKGEuSGVyb19JRCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5mb0IgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MZXZlbChhLkhlcm9fSUQpO1xyXG4gICAgICAgICAgICAgICAgaWYoaW5mb0EgPCBpbmZvQikgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHVubG9ja0hlcm9JdGVtU29ydChsaXN0Okpzb25IZXJvQmFzZUluZm9bXSl7XHJcbiAgICAvLyAgICAgZm9yKGxldCBpID0gMDtpIDwgbGlzdC5sZW5ndGggLSAxO2krKyl7XHJcbiAgICAvLyAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBsaXN0Lmxlbmd0aCAtIDEgLSBpO2orKyl7XHJcbiAgICAvLyAgICAgICAgICAgICBpZihsaXN0W2pdLlF1YWxpdHkgPiBsaXN0W2orMV0uUXVhbGl0eSl7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGV0IHRlbXA7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdGVtcCA9IGxpc3Rbal07XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGlzdFtqXSA9IGxpc3RbaisxXTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBsaXN0W2orMV0gPSB0ZW1wO1xyXG4gICAgLy8gICAgICAgICAgICAgfWVsc2UgaWYobGlzdFtqXS5RdWFsaXR5ID09IGxpc3RbaisxXS5RdWFsaXR5KXtcclxuICAgIC8vICAgICAgICAgICAgICAgICBsZXQgdGVtcDtcclxuICAgIC8vICAgICAgICAgICAgICAgICB0ZW1wID0gbGlzdFtqXTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBsaXN0W2pdID0gbGlzdFtqKzFdO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGxpc3RbaisxXSA9IHRlbXA7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcbn1cclxuIl19