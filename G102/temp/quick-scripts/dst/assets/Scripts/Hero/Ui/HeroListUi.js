
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcVWlcXEhlcm9MaXN0VWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsaURBQTRDO0FBRTVDLHVFQUFrRTtBQUNsRSxzREFBcUQ7QUFFckQsNkNBQXdDO0FBQ3hDLHFFQUFnRTtBQUVoRSw4Q0FBeUQ7QUFDekQsZ0RBQStDO0FBQy9DLHVEQUE2RDtBQUM3RCxxREFBNkU7QUFDN0UsbURBQWtEO0FBQ2xELG1EQUF5RDtBQUN6RCxpREFBK0M7QUFDL0MsdUNBQWtDO0FBQ2xDLG1DQUE4QjtBQUV4QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF3Qyw4QkFBWTtJQUFwRDtRQUFBLHFFQWdUQztRQTdTRyxlQUFTLEdBQWEsSUFBSSxDQUFDOztRQTRSM0IsK0NBQStDO1FBQy9DLDhDQUE4QztRQUM5Qyx1REFBdUQ7UUFDdkQsdURBQXVEO1FBQ3ZELDRCQUE0QjtRQUM1QixrQ0FBa0M7UUFDbEMsdUNBQXVDO1FBQ3ZDLG9DQUFvQztRQUNwQyw4REFBOEQ7UUFDOUQsNEJBQTRCO1FBQzVCLGtDQUFrQztRQUNsQyx1Q0FBdUM7UUFDdkMsb0NBQW9DO1FBQ3BDLGdCQUFnQjtRQUNoQixZQUFZO1FBQ1osUUFBUTtRQUNSLElBQUk7SUFDUixDQUFDO21CQWhUb0IsVUFBVTtJQUtqQiwyQkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixFQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRVMsOEJBQVMsR0FBbkI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FB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O2dCQUM5RCxJQUFHLEtBQUssR0FBRyxLQUFLO29CQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQzlCO1NBQ0o7UUFDRCxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ2QsQ0FBQzs7SUExUkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztpREFDTztJQUhWLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FnVDlCO0lBQUQsaUJBQUM7Q0FoVEQsQUFnVEMsQ0FoVHVDLEVBQUUsQ0FBQyxTQUFTLEdBZ1RuRDtrQkFoVG9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lTW9kZSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBSZXdhcmRIZXJvRGF0YSB9IGZyb20gXCIuLi8uLi9Kc29uRGF0YS9MZXZlbEpzb25EYXRhXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IFN0b3JlSGVyb1VpIGZyb20gXCIuLi8uLi9TdG9yZS9TdG9yZUhlcm9VaVwiO1xyXG5pbXBvcnQgUmVkVGlwIGZyb20gXCIuLi8uLi9Ub29scy9SZWRUaXBcIjtcclxuaW1wb3J0IFR1dG9yYWlsc01hbmFnZXIgZnJvbSBcIi4uLy4uL1R1dG9yaWFscy9UdXRvcmFpbHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBNYWluVWkgZnJvbSBcIi4uLy4uL1VJL2hvbWUvTWFpblVpXCI7XHJcbmltcG9ydCB7IFVJTGF5ZXJMZXZlbCwgVUlQYXRoIH0gZnJvbSBcIi4uLy4uL1VJL1VJQ29uZmlnXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi8uLi9VSS9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb0F0dHJpYnV0ZU1hbmFnZXIgfSBmcm9tIFwiLi4vRGF0YS9IZXJvQXR0cmlidXRlXCI7XHJcbmltcG9ydCB7IEhlcm9CYXNlSW5mb01hbmFnZXIsIEpzb25IZXJvQmFzZUluZm8gfSBmcm9tIFwiLi4vRGF0YS9IZXJvQmFzZUluZm9cIjtcclxuaW1wb3J0IHsgSGVyb01hbmFnZXIgfSBmcm9tIFwiLi4vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvUXVhbGl0eU1hbmFnZXIgfSBmcm9tIFwiLi4vRGF0YS9IZXJvUXVhbGl0eVwiO1xyXG5pbXBvcnQgeyBIZXJvX1R5cGUgfSBmcm9tIFwiLi4vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBIZXJvSXRlbSBmcm9tIFwiLi9IZXJvSXRlbVwiO1xyXG5pbXBvcnQgUm9sZVVpIGZyb20gXCIuL1JvbGVVaVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXJvTGlzdFVpIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgaGVyb19pdGVtOmNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuUE9TSVRJT05fQ0hBTkdFRCx0aGlzLm9uUG9zaXRpb25DaGFuZ2UsdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlBPU0lUSU9OX0NIQU5HRUQsdGhpcy5vblBvc2l0aW9uQ2hhbmdlLHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUG9zaXRpb25DaGFuZ2UoKXtcclxuICAgICAgICBpZih0aGlzLm5vZGUueD09MCl7XHJcbiAgICAgICAgICAgIHRoaXMub25SZWZyZXNoKCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNoZWNrVHV0b3JhaWxzKCk7ICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrVHV0b3JhaWxzKCl7XHJcbiAgICAgICAgaWYoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygzMDEpPT1mYWxzZSYmVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygzMDIpKXtcclxuICAgICAgICAgICAgLy8yMTjlrozmiJDmmL7npLpcclxuICAgICAgICAgICAgLy/ljYfnuqflvJXlr7xcclxuICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZT10cnVlOyAgIFxyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgLy/mmL7npLroi7Hpm4TpobUt5YW9546LXHJcbiAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkhlcm9Hcm93dGgsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PntcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFJvbGVVaSkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9oZXJvX2xpc3RfdWknKS5nZXRDb21wb25lbnQoSGVyb0xpc3RVaSkub25SZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFJvbGVVaSkuaW5pdERhdGEoSGVyb19UeXBlLlNob3VXYW5nKTtcclxuICAgICAgICAgICAgICAgIH0sfSlcclxuICAgICAgICAgICAgfSwwLjEpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfWVsc2UgaWYoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygzMTEpPT1mYWxzZSYmVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygzMTIpKXtcclxuICAgICAgICAgICAgLy/mmL7npLroi7Hpm4TpobVcclxuICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZT10cnVlOyAgICBcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguSGVyb0dyb3d0aCxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoUm9sZVVpKS5pbml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL2hlcm9fbGlzdF91aScpLmdldENvbXBvbmVudChIZXJvTGlzdFVpKS5vblJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoUm9sZVVpKS5pbml0RGF0YShIZXJvX1R5cGUuUGFvU2hvdSk7XHJcbiAgICAgICAgICAgICAgICB9LH0pXHJcbiAgICAgICAgICAgIH0sMC4xKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlOyAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25VaUluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblVpSW5pdCgpe1xyXG4gICAgICAgIGxldCBjb250ZW50ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdzY3JvbGwnKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudDtcclxuICAgICAgICBjb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgbGV0IGFsbEhlcm9MaXN0Okpzb25IZXJvQmFzZUluZm9bXSA9IFtdO1xyXG4gICAgICAgIGxldCBjYW5VbmxvY2tMaXN0Okpzb25IZXJvQmFzZUluZm9bXSA9IFtdO1xyXG4gICAgICAgIGxldCBjYW5JbmNyZWFzZVN0YXJMaXN0Okpzb25IZXJvQmFzZUluZm9bXSA9IFtdO1xyXG4gICAgICAgIGxldCB1bmxvY2tMaXN0Okpzb25IZXJvQmFzZUluZm9bXSA9IFtdO1xyXG4gICAgICAgIGxldCBtYXhMaXN0Okpzb25IZXJvQmFzZUluZm9bXSA9IFtdO1xyXG4gICAgICAgIGxldCBsb2NrTGlzdDpKc29uSGVyb0Jhc2VJbmZvW10gPSBbXTtcclxuICAgICAgICBsZXQgdGVtcExpc3Q6SnNvbkhlcm9CYXNlSW5mb1tdID0gW107XHJcblxyXG5cclxuICAgICAgICBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGF0YSgpLmZvckVhY2goKHYsaykgPT57XHJcbiAgICAgICAgICAgIGFsbEhlcm9MaXN0LnB1c2godik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGFsbEhlcm9MaXN0Lmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBsZXQgaW5mbyA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0luZm8oYWxsSGVyb0xpc3RbaV0uSGVyb19JRClcclxuICAgICAgICAgICAgaWYoaW5mbyl7XHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgcHJvcE51bSA9UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKGFsbEhlcm9MaXN0W2ldLkhlcm9GcmFnbWVudCk7XHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgbmVlZE51bSA9SGVyb1F1YWxpdHlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29zdERlYnJpc0J5SGVyb1R5cGVBbmRTdGFnZShhbGxIZXJvTGlzdFtpXS5RdWFsaXR5LGluZm8uaGVyb19zdGFnZSk7XHJcbiAgICAgICAgICAgICAgICBpZihQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oYWxsSGVyb0xpc3RbaV0uSGVyb0ZyYWdtZW50KSA+PSBIZXJvUXVhbGl0eU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb3N0RGVicmlzQnlIZXJvUXVhbGl0eUFuZFN0YWdlKGFsbEhlcm9MaXN0W2ldLlF1YWxpdHksaW5mby5oZXJvX3N0YWdlKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoSGVyb1F1YWxpdHlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29zdERlYnJpc0J5SGVyb1F1YWxpdHlBbmRTdGFnZShhbGxIZXJvTGlzdFtpXS5RdWFsaXR5LGluZm8uaGVyb19zdGFnZSkgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heExpc3QucHVzaChhbGxIZXJvTGlzdFtpXSlcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuSW5jcmVhc2VTdGFyTGlzdC5wdXNoKGFsbEhlcm9MaXN0W2ldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB1bmxvY2tMaXN0LnB1c2goYWxsSGVyb0xpc3RbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShhbGxIZXJvTGlzdFtpXS5IZXJvRnJhZ21lbnQpID49IGFsbEhlcm9MaXN0W2ldLlVubG9ja0ZyYWdtZW50TnVtKXtcclxuICAgICAgICAgICAgICAgICAgICBjYW5VbmxvY2tMaXN0LnB1c2goYWxsSGVyb0xpc3RbaV0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9ja0xpc3QucHVzaChhbGxIZXJvTGlzdFtpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhblVubG9ja0xpc3Quc29ydCh0aGlzLmxvY2tIZXJvSXRlbVNvcnQpO1xyXG4gICAgICAgIGxvY2tMaXN0LnNvcnQodGhpcy5sb2NrSGVyb0l0ZW1Tb3J0KTtcclxuICAgICAgICBjYW5JbmNyZWFzZVN0YXJMaXN0LnNvcnQodGhpcy51bmxvY2tIZXJvSXRlbVNvcnQpO1xyXG4gICAgICAgIGNhbkluY3JlYXNlU3Rhckxpc3Quc29ydCh0aGlzLnVubG9ja0hlcm9JdGVtU29ydCk7XHJcbiAgICAgICAgbWF4TGlzdC5zb3J0KHRoaXMudW5sb2NrSGVyb0l0ZW1Tb3J0KTtcclxuICAgICAgICB1bmxvY2tMaXN0LnNvcnQodGhpcy51bmxvY2tIZXJvSXRlbVNvcnQpO1xyXG4gICAgICAgIHVubG9ja0xpc3Quc29ydCh0aGlzLnVubG9ja0hlcm9JdGVtU29ydCk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMubG9ja0hlcm9JdGVtU29ydChjYW5VbmxvY2tMaXN0KTtcclxuICAgICAgICAvLyB0aGlzLmxvY2tIZXJvSXRlbVNvcnQobG9ja0xpc3QpO1xyXG4gICAgICAgIC8vIHRoaXMudW5sb2NrSGVyb0l0ZW1Tb3J0KGNhbkluY3JlYXNlU3Rhckxpc3QpO1xyXG4gICAgICAgIC8vIHRoaXMudW5sb2NrSGVyb0l0ZW1Tb3J0KHVubG9ja0xpc3QpO1xyXG5cclxuICAgICAgICB0ZW1wTGlzdCA9IHRlbXBMaXN0LmNvbmNhdChjYW5VbmxvY2tMaXN0LGNhbkluY3JlYXNlU3Rhckxpc3QsbWF4TGlzdCx1bmxvY2tMaXN0LGxvY2tMaXN0KTtcclxuXHJcbiAgICAgICAgbGV0IHNxcnRMaXN0ID0gW107XHJcblxyXG4gICAgICAgIHRlbXBMaXN0LmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgaWYodi5BdmFpbGFibGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICBzcXJ0TGlzdC5wdXNoKHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgdGVtcExpc3QubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5oZXJvX2l0ZW0pO1xyXG4gICAgICAgICAgICBpdGVtLm5hbWUgPSAnaXRlbScgKyBpO1xyXG4gICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChIZXJvSXRlbSkuaW5pdCh0ZW1wTGlzdFtpXS5IZXJvX0lELHRlbXBMaXN0W2ldLkhlcm9GcmFnbWVudCk7XHJcbiAgICAgICAgICAgIGlmKHRlbXBMaXN0W2ldLkF2YWlsYWJsZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgIGl0ZW0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5IZXJvR3Jvd3RoLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoUm9sZVVpKS5pbml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVmcmVzaENvaW5TaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFJvbGVVaSkuaW5pdERhdGEodGVtcExpc3RbaV0uSGVyb19JRCxzcXJ0TGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSx9KTtcclxuICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaXRlbS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcyA9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDExMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShzKTtcclxuICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29udGVudC5hZGRDaGlsZChpdGVtKTtcclxuICAgICAgICAgICAgLy8gbGV0IHJlZD1pdGVtLmdldENoaWxkQnlOYW1lKCdSZWRUaXAnKS5nZXRDb21wb25lbnQoUmVkVGlwKTtcclxuICAgICAgICAgICAgLy8gcmVkLnNlbGZfcmVkX3R5cGU9SGVyb01hbmFnZXIuZ2V0UmVkVHlwZUJ5SGVyb1R5cGUodGVtcExpc3RbaV0uSGVyb19JRCk7XHJcbiAgICAgICAgICAgIC8vIHJlZC5yZWdpc3RlckV2ZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uUmVmcmVzaCgpeyAgICAgICAgXHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Njcm9sbCcpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5jb250ZW50O1xyXG4gICAgICAgIC8vIGNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICBsZXQgYWxsSGVyb0xpc3Q6SnNvbkhlcm9CYXNlSW5mb1tdID0gW107XHJcbiAgICAgICAgbGV0IGNhblVubG9ja0xpc3Q6SnNvbkhlcm9CYXNlSW5mb1tdID0gW107XHJcbiAgICAgICAgbGV0IGNhbkluY3JlYXNlU3Rhckxpc3Q6SnNvbkhlcm9CYXNlSW5mb1tdID0gW107XHJcbiAgICAgICAgbGV0IHVubG9ja0xpc3Q6SnNvbkhlcm9CYXNlSW5mb1tdID0gW107XHJcbiAgICAgICAgbGV0IG1heExpc3Q6SnNvbkhlcm9CYXNlSW5mb1tdID0gW107XHJcbiAgICAgICAgbGV0IGxvY2tMaXN0Okpzb25IZXJvQmFzZUluZm9bXSA9IFtdO1xyXG4gICAgICAgIGxldCB0ZW1wTGlzdDpKc29uSGVyb0Jhc2VJbmZvW10gPSBbXTtcclxuXHJcblxyXG4gICAgICAgIEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREYXRhKCkuZm9yRWFjaCgodixrKSA9PntcclxuICAgICAgICAgICAgYWxsSGVyb0xpc3QucHVzaCh2KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgYWxsSGVyb0xpc3QubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGxldCBpbmZvID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvSW5mbyhhbGxIZXJvTGlzdFtpXS5IZXJvX0lEKVxyXG4gICAgICAgICAgICBpZihpbmZvKXtcclxuICAgICAgICAgICAgICAgIC8vIGxldCBwcm9wTnVtID1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oYWxsSGVyb0xpc3RbaV0uSGVyb0ZyYWdtZW50KTtcclxuICAgICAgICAgICAgICAgIC8vIGxldCBuZWVkTnVtID1IZXJvUXVhbGl0eU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb3N0RGVicmlzQnlIZXJvVHlwZUFuZFN0YWdlKGFsbEhlcm9MaXN0W2ldLlF1YWxpdHksaW5mby5oZXJvX3N0YWdlKTtcclxuICAgICAgICAgICAgICAgIGlmKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShhbGxIZXJvTGlzdFtpXS5IZXJvRnJhZ21lbnQpID49IEhlcm9RdWFsaXR5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvc3REZWJyaXNCeUhlcm9RdWFsaXR5QW5kU3RhZ2UoYWxsSGVyb0xpc3RbaV0uUXVhbGl0eSxpbmZvLmhlcm9fc3RhZ2UpKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihpbmZvLmhlcm9fc3RhZ2UgPT0gYWxsSGVyb0xpc3RbaV0uTWF4U3RhZ2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhMaXN0LnB1c2goYWxsSGVyb0xpc3RbaV0pXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbkluY3JlYXNlU3Rhckxpc3QucHVzaChhbGxIZXJvTGlzdFtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaW5mby5oZXJvX3N0YWdlID09IGFsbEhlcm9MaXN0W2ldLk1heFN0YWdlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4TGlzdC5wdXNoKGFsbEhlcm9MaXN0W2ldKVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bmxvY2tMaXN0LnB1c2goYWxsSGVyb0xpc3RbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZihQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oYWxsSGVyb0xpc3RbaV0uSGVyb0ZyYWdtZW50KSA+PSBhbGxIZXJvTGlzdFtpXS5VbmxvY2tGcmFnbWVudE51bSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FuVW5sb2NrTGlzdC5wdXNoKGFsbEhlcm9MaXN0W2ldKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2tMaXN0LnB1c2goYWxsSGVyb0xpc3RbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYW5VbmxvY2tMaXN0LnNvcnQodGhpcy5sb2NrSGVyb0l0ZW1Tb3J0KTtcclxuICAgICAgICBsb2NrTGlzdC5zb3J0KHRoaXMubG9ja0hlcm9JdGVtU29ydCk7XHJcbiAgICAgICAgY2FuSW5jcmVhc2VTdGFyTGlzdC5zb3J0KHRoaXMudW5sb2NrSGVyb0l0ZW1Tb3J0KTtcclxuICAgICAgICBjYW5JbmNyZWFzZVN0YXJMaXN0LnNvcnQodGhpcy51bmxvY2tIZXJvSXRlbVNvcnQpO1xyXG4gICAgICAgIG1heExpc3Quc29ydCh0aGlzLnVubG9ja0hlcm9JdGVtU29ydCk7XHJcbiAgICAgICAgdW5sb2NrTGlzdC5zb3J0KHRoaXMudW5sb2NrSGVyb0l0ZW1Tb3J0KTtcclxuICAgICAgICB1bmxvY2tMaXN0LnNvcnQodGhpcy51bmxvY2tIZXJvSXRlbVNvcnQpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLmxvY2tIZXJvSXRlbVNvcnQoY2FuVW5sb2NrTGlzdCk7XHJcbiAgICAgICAgLy8gdGhpcy5sb2NrSGVyb0l0ZW1Tb3J0KGxvY2tMaXN0KTtcclxuICAgICAgICAvLyB0aGlzLnVubG9ja0hlcm9JdGVtU29ydChjYW5JbmNyZWFzZVN0YXJMaXN0KTtcclxuICAgICAgICAvLyB0aGlzLnVubG9ja0hlcm9JdGVtU29ydCh1bmxvY2tMaXN0KTtcclxuXHJcbiAgICAgICAgdGVtcExpc3QgPSB0ZW1wTGlzdC5jb25jYXQoY2FuVW5sb2NrTGlzdCxjYW5JbmNyZWFzZVN0YXJMaXN0LG1heExpc3QsdW5sb2NrTGlzdCxsb2NrTGlzdCk7XHJcblxyXG4gICAgICAgIGxldCBzcXJ0TGlzdCA9IFtdO1xyXG5cclxuICAgICAgICB0ZW1wTGlzdC5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgIGlmKHYuQXZhaWxhYmxlID09IDEpe1xyXG4gICAgICAgICAgICAgICAgc3FydExpc3QucHVzaCh2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IHRlbXBMaXN0Lmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAvLyBsZXQgaXRlbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaGVyb19pdGVtKTtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBjb250ZW50LmdldENoaWxkQnlOYW1lKFwiaXRlbVwiICsgaSk7XHJcbiAgICAgICAgICAgIGl0ZW0ub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCk7XHJcbiAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KEhlcm9JdGVtKS5pbml0KHRlbXBMaXN0W2ldLkhlcm9fSUQsdGVtcExpc3RbaV0uSGVyb0ZyYWdtZW50KTtcclxuICAgICAgICAgICAgaWYodGVtcExpc3RbaV0uQXZhaWxhYmxlID09IDEpe1xyXG4gICAgICAgICAgICAgICAgaXRlbS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkhlcm9Hcm93dGgsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChSb2xlVWkpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25SZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFJvbGVVaSkuaW5pdERhdGEodGVtcExpc3RbaV0uSGVyb19JRCxzcXJ0TGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSx9KTtcclxuICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaXRlbS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcyA9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDExMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShzKTtcclxuICAgICAgICAgICAgICAgIH0sdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY29udGVudC5hZGRDaGlsZChpdGVtKTtcclxuICAgICAgICAgICAgbGV0IHJlZD1pdGVtLmdldENoaWxkQnlOYW1lKCdSZWRUaXAnKS5nZXRDb21wb25lbnQoUmVkVGlwKTtcclxuICAgICAgICAgICAgcmVkLmNhbmNlbEV2ZW50KCk7XHJcbiAgICAgICAgICAgIHJlZC5zZWxmX3JlZF90eXBlPUhlcm9NYW5hZ2VyLmdldFJlZFR5cGVCeUhlcm9UeXBlKHRlbXBMaXN0W2ldLkhlcm9fSUQpO1xyXG4gICAgICAgICAgICByZWQucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgICAgICAgICByZWQuY2hlY2tTZWxmKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirmnKrop6PplIHoi7Hpm4TmjpLluo8gKi9cclxuICAgIGxvY2tIZXJvSXRlbVNvcnQoYTpKc29uSGVyb0Jhc2VJbmZvLGI6SnNvbkhlcm9CYXNlSW5mbyk6bnVtYmVye1xyXG4gICAgICAgIGlmKGEuUXVhbGl0eSA8IGIuUXVhbGl0eSkgcmV0dXJuIDE7XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG4gICAgLy8gbG9ja0hlcm9JdGVtU29ydChsaXN0Okpzb25IZXJvQmFzZUluZm9bXSl7XHJcbiAgICAvLyAgICAgZm9yKGxldCBpID0gMDtpIDwgbGlzdC5sZW5ndGggLSAxO2krKyl7XHJcbiAgICAvLyAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBsaXN0Lmxlbmd0aCAtIDEgLSBpO2orKyl7XHJcbiAgICAvLyAgICAgICAgICAgICBpZihsaXN0W2pdLlF1YWxpdHkgPiBsaXN0W2orMV0uUXVhbGl0eSl7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGV0IHRlbXA7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdGVtcCA9IGxpc3Rbal07XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGlzdFtqXSA9IGxpc3RbaisxXTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBsaXN0W2orMV0gPSB0ZW1wO1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8qKuW3suino+mUgeiLsembhOaOkuW6jyAqL1xyXG4gICAgdW5sb2NrSGVyb0l0ZW1Tb3J0KGE6SnNvbkhlcm9CYXNlSW5mbyxiOkpzb25IZXJvQmFzZUluZm8pOm51bWJlcntcclxuICAgICAgICBpZihhLlF1YWxpdHkgPCBiLlF1YWxpdHkpe1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9ZWxzZSBpZihhLlF1YWxpdHkgPT0gYi5RdWFsaXR5KXtcclxuICAgICAgICAgICAgbGV0IHN0YXJBID0gSGVyb0F0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdGFyQnlIZXJvVHlwZUFuZFN0YWdlKGEuSGVyb19JRCxIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9TdGFnZShhLkhlcm9fSUQpKVxyXG4gICAgICAgICAgICBsZXQgc3RhckIgPSBIZXJvQXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0YXJCeUhlcm9UeXBlQW5kU3RhZ2UoYi5IZXJvX0lELEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb1N0YWdlKGIuSGVyb19JRCkpXHJcbiAgICAgICAgICAgIGlmKHN0YXJBIDwgc3RhckIpeyBcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihzdGFyQSA9PSBzdGFyQil7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5mb0EgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MZXZlbChhLkhlcm9fSUQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZm9CID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvTGV2ZWwoYS5IZXJvX0lEKTtcclxuICAgICAgICAgICAgICAgIGlmKGluZm9BIDwgaW5mb0IpIHJldHVybiAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB1bmxvY2tIZXJvSXRlbVNvcnQobGlzdDpKc29uSGVyb0Jhc2VJbmZvW10pe1xyXG4gICAgLy8gICAgIGZvcihsZXQgaSA9IDA7aSA8IGxpc3QubGVuZ3RoIC0gMTtpKyspe1xyXG4gICAgLy8gICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgbGlzdC5sZW5ndGggLSAxIC0gaTtqKyspe1xyXG4gICAgLy8gICAgICAgICAgICAgaWYobGlzdFtqXS5RdWFsaXR5ID4gbGlzdFtqKzFdLlF1YWxpdHkpe1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGxldCB0ZW1wO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHRlbXAgPSBsaXN0W2pdO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGxpc3Rbal0gPSBsaXN0W2orMV07XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGlzdFtqKzFdID0gdGVtcDtcclxuICAgIC8vICAgICAgICAgICAgIH1lbHNlIGlmKGxpc3Rbal0uUXVhbGl0eSA9PSBsaXN0W2orMV0uUXVhbGl0eSl7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGV0IHRlbXA7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdGVtcCA9IGxpc3Rbal07XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGlzdFtqXSA9IGxpc3RbaisxXTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBsaXN0W2orMV0gPSB0ZW1wO1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG59XHJcbiJdfQ==