"use strict";
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