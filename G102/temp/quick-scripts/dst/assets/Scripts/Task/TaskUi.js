
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Task/TaskUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '20c52EM2/FFMaajyQZKaIMG', 'TaskUi');
// Scripts/Task/TaskUi.ts

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
var WXManagerEX_1 = require("../../startscene/WXManagerEX");
var HttpManager_1 = require(".././NetWork/HttpManager");
var Constants_1 = require("../Constants");
var EquipItem_1 = require("../Equipment/Ui/EquipItem");
var GameManager_1 = require("../GameManager");
var ChallengeRoundPop_1 = require("../GuaJi/ChallengeRoundPop");
var MapManager_1 = require("../GuaJi/MapManager");
var HeroConfig_1 = require("../Hero/Game/HeroConfig");
var Home_1 = require("../Home");
var LevelManager_1 = require("../Level/LevelManager");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var Item_1 = require("../Prop/Data/Item");
var Prop_1 = require("../Prop/Prop");
var PropConfig_1 = require("../Prop/PropConfig");
var PropManager_1 = require("../Prop/PropManager");
var StorageConfig_1 = require("../Storage/StorageConfig");
var StorageManager_1 = require("../Storage/StorageManager");
var EventManager_1 = require("../Tools/EventManager");
var Turmtable_1 = require("../Turntable/Turmtable");
var MainUi_1 = require("../UI/home/MainUi");
var UIConfig_1 = require("../UI/UIConfig");
var UIManager_1 = require("../UI/UIManager");
var UserInfo_1 = require("../UserInfo/UserInfo");
var AccumulatedInformation_1 = require("./Data/AccumulatedInformation");
var TaskEnum_1 = require("./TaskEnum");
var TaskItemUi_1 = require("./TaskItemUi");
var TaskManager_1 = require("./TaskManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TaskUiState;
(function (TaskUiState) {
    TaskUiState[TaskUiState["Daily"] = 0] = "Daily";
    TaskUiState[TaskUiState["Achievement"] = 1] = "Achievement";
})(TaskUiState || (TaskUiState = {}));
var TaskUi = /** @class */ (function (_super) {
    __extends(TaskUi, _super);
    function TaskUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.task_item = null;
        _this.task_ui = null;
        _this.state = TaskUiState.Daily;
        return _this;
    }
    TaskUi.prototype.onLoad = function () {
        this.node.on(cc.Node.EventType.POSITION_CHANGED, this.onPositionChange, this);
    };
    TaskUi.prototype.onDestroy = function () {
        this.node.off(cc.Node.EventType.POSITION_CHANGED, this.onPositionChange, this);
    };
    TaskUi.prototype.onPositionChange = function () {
        if (this.node.x == 0) {
            this.refreshAchievementTask();
            this.refreshDailyTask();
        }
    };
    TaskUi.prototype.start = function () {
        this.onInitUi();
    };
    TaskUi.prototype.onInitUi = function () {
        var _this = this;
        this.state = TaskUiState.Daily;
        var content = this.node.getChildByName("content");
        var top = this.node.getChildByName("top");
        var dailyT = top.getChildByName("daily");
        var dailyC = content.getChildByName("daily");
        if (WXManagerEX_1.default.getInstance().statusBarHeight > 20) {
            top.getComponent(cc.Widget).top = 100;
            content.getComponent(cc.Widget).top = 100;
        }
        else {
            top.getComponent(cc.Widget).top = 0;
            content.getComponent(cc.Widget).top = 0;
            // dailyT.getComponent(cc.Widget).top = 158.50;
        }
        top.children[0].getChildByName("tag1").getComponent(cc.Sprite).spriteFrame = this.task_ui.getSpriteFrame("Task_Bg_2");
        top.children[0].getChildByName("tag2").getComponent(cc.Sprite).spriteFrame = this.task_ui.getSpriteFrame("Task_Bg_3");
        top.children[0].getChildByName("tagLabel1").color = cc.color(116, 82, 55);
        top.children[0].getChildByName("tagLabel2").color = cc.color(91, 69, 52);
        // let daily = this.node.getChildByName("daily");
        var achievement = content.getChildByName("achievement");
        // 总活跃 1天100 一周500
        var weekActivityNum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskWeekActivityNum, 0);
        var dailyActivityNum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskDailyActivityNum, 0);
        dailyT.getChildByName("weekActivityNum").getComponent(cc.Label).string = weekActivityNum + '';
        dailyT.getChildByName("dailyActivityNum").getComponent(cc.Label).string = dailyActivityNum + '';
        // 活跃进度条
        dailyT.getChildByName("weekActivity1").getComponent(cc.Sprite).fillRange = weekActivityNum / 500;
        if (weekActivityNum >= 500) {
            dailyT.getChildByName("weekActivity2").active = true;
        }
        else {
            dailyT.getChildByName("weekActivity2").active = false;
        }
        dailyT.getChildByName("dailyActivity1").getComponent(cc.Sprite).fillRange = dailyActivityNum / 100;
        if (dailyActivityNum >= 100) {
            dailyT.getChildByName("dailyActivity2").active = true;
        }
        else {
            dailyT.getChildByName("dailyActivity2").active = false;
        }
        // 处理累计积分奖励
        var weekAccumulateData = AccumulatedInformation_1.AccumulatedInformationManager.getInstance().getRewardByTaskType(2);
        var dailyAccumulateData = AccumulatedInformation_1.AccumulatedInformationManager.getInstance().getRewardByTaskType(1);
        weekAccumulateData.forEach(function (v, k) {
            var item;
            var itemRoot = dailyT.getChildByName("week" + (k + 1));
            if (weekActivityNum >= v.AccumulatedPoints
                && StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskWeeklyActivityState + v.AccumulatedPoints, 0) == 0) {
                item = PropManager_1.PropManager.getInstance().createPropItem(v.PropID_1, v.PropNum_1, PropConfig_1.PropAction.Null);
                itemRoot.children[0].active = true;
                item.on(cc.Node.EventType.TOUCH_END, function FF() {
                    // 领取奖励
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.周活跃每一档奖励的领取次数 + v.AccumulatedPointsID);
                    itemRoot.children[0].active = false;
                    PropManager_1.PropManager.getInstance().changePropNum(v.PropID_1, v.PropNum_1);
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskWeeklyActivityState + v.AccumulatedPoints, 1);
                    GameManager_1.default.getInstance().showGetTip(item);
                    item.off(cc.Node.EventType.TOUCH_END, FF);
                    var type = Item_1.ItemManager.getInstance().getType(v.PropID_1);
                    if (type == 3) {
                        item.getComponent(EquipItem_1.default).init(HeroConfig_1.Hero_Type.NULL, v.PropID_1, PropConfig_1.PropAction.Look);
                    }
                    else {
                        item.getComponent(Prop_1.default).init(v.PropID_1, v.PropNum_1, PropConfig_1.PropAction.Look);
                    }
                    var mask = new cc.Node();
                    mask.opacity = 150;
                    mask.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_frame_Dark");
                    var gou = new cc.Node();
                    gou.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("SignIn_Got");
                    mask.addChild(gou);
                    item.addChild(mask);
                    EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Task);
                    HttpManager_1.HttpManager.post(HttpManager_1.AccessName.saveGameTask, UserInfo_1.UserInfo.getInstance().getSaveGameTaskJsonString(v.AccumulatedPoints, 5));
                });
            }
            else if (weekActivityNum >= v.AccumulatedPoints
                && StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskWeeklyActivityState + v.AccumulatedPoints, 0) == 1) {
                item = PropManager_1.PropManager.getInstance().createPropItem(v.PropID_1, v.PropNum_1);
                itemRoot.children[0].active = false;
                var mask = new cc.Node();
                mask.opacity = 150;
                mask.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_frame_Dark");
                var gou = new cc.Node();
                gou.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("SignIn_Got");
                mask.addChild(gou);
                item.addChild(mask);
            }
            else if (weekActivityNum < v.AccumulatedPoints) {
                itemRoot.children[0].active = false;
                item = PropManager_1.PropManager.getInstance().createPropItem(v.PropID_1, v.PropNum_1);
            }
            item.scale = 0.7;
            itemRoot.addChild(item);
        });
        dailyAccumulateData.forEach(function (v, k) {
            var item;
            var itemRoot = dailyT.getChildByName("daily" + (k + 1));
            if (dailyActivityNum >= v.AccumulatedPoints
                && StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskDailyActivityState + v.AccumulatedPoints, 0) == 0) {
                item = PropManager_1.PropManager.getInstance().createPropItem(v.PropID_1, v.PropNum_1, PropConfig_1.PropAction.Null);
                itemRoot.children[0].active = true;
                item.on(cc.Node.EventType.TOUCH_END, function FF() {
                    // 领取奖励
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.日活跃每一档奖励的领取次数 + v.AccumulatedPointsID);
                    itemRoot.children[0].active = false;
                    PropManager_1.PropManager.getInstance().changePropNum(v.PropID_1, v.PropNum_1);
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskDailyActivityState + v.AccumulatedPoints, 1);
                    GameManager_1.default.getInstance().showGetTip(item);
                    item.off(cc.Node.EventType.TOUCH_END, FF);
                    var type = Item_1.ItemManager.getInstance().getType(v.PropID_1);
                    if (type == 3) {
                        item.getComponent(EquipItem_1.default).init(HeroConfig_1.Hero_Type.NULL, v.PropID_1, PropConfig_1.PropAction.Look);
                    }
                    else {
                        item.getComponent(Prop_1.default).init(v.PropID_1, v.PropNum_1, PropConfig_1.PropAction.Look);
                    }
                    var mask = new cc.Node();
                    mask.opacity = 150;
                    mask.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_frame_Dark");
                    var gou = new cc.Node();
                    gou.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("SignIn_Got");
                    mask.addChild(gou);
                    item.addChild(mask);
                    EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Task);
                    HttpManager_1.HttpManager.post(HttpManager_1.AccessName.saveGameTask, UserInfo_1.UserInfo.getInstance().getSaveGameTaskJsonString(v.AccumulatedPoints, 4));
                });
            }
            else if (dailyActivityNum >= v.AccumulatedPoints
                && StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskDailyActivityState + v.AccumulatedPoints, 0) == 1) {
                itemRoot.children[0].active = false;
                item = PropManager_1.PropManager.getInstance().createPropItem(v.PropID_1, v.PropNum_1);
                var mask = new cc.Node();
                mask.opacity = 150;
                mask.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_frame_Dark");
                var gou = new cc.Node();
                gou.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("SignIn_Got");
                mask.addChild(gou);
                item.addChild(mask);
            }
            else if (dailyActivityNum < v.AccumulatedPoints) {
                itemRoot.children[0].active = false;
                item = PropManager_1.PropManager.getInstance().createPropItem(v.PropID_1, v.PropNum_1);
            }
            item.scale = 0.7;
            itemRoot.addChild(item);
        });
        // 处理任务
        TaskManager_1.default.getInstance().sortDailyTask();
        var dailyTask = TaskManager_1.default.getInstance().getDailyTaskList();
        var dailyContent = dailyC.getChildByName("scroll").getComponent(cc.ScrollView).content;
        dailyTask.forEach(function (v, k) {
            var item = cc.instantiate(_this.task_item);
            item.name = "task" + k;
            var state = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskState + v.TaskID, 0);
            switch (state) {
                case TaskEnum_1.TaskState.Ongoing:
                    item.getComponent(TaskItemUi_1.default).initGoingItem(v, function () {
                        _this.onClickGoBtn(v.TaskID);
                    });
                    break;
                case TaskEnum_1.TaskState.Completed:
                    item.getComponent(TaskItemUi_1.default).initFinishItem(v, function () {
                        _this.onClickDailyTaskFinish(item, v);
                    });
                    break;
                case TaskEnum_1.TaskState.Received:
                    item.getComponent(TaskItemUi_1.default).initReceivedItem(v);
                    break;
            }
            dailyContent.addChild(item);
        });
        var achievementTask = TaskManager_1.default.getInstance().getAchievementTaskData();
        var achievementContent = achievement.getChildByName("scroll").getComponent(cc.ScrollView).content;
        achievementTask.forEach(function (v, k) {
            if (v == null) {
                return;
            }
            var item = cc.instantiate(_this.task_item);
            item.name = "task" + k;
            var state = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskState + v.TaskID, 0);
            switch (state) {
                case TaskEnum_1.TaskState.Ongoing:
                    item.getComponent(TaskItemUi_1.default).initGoingItem(v, function () {
                        var id = v.AchievenmentTaskType * 100000 + 1;
                        _this.onClickGoBtn(id);
                    }, true);
                    break;
                case TaskEnum_1.TaskState.Completed:
                    item.getComponent(TaskItemUi_1.default).initFinishItem(v, function () {
                        _this.onClickAchievementTaskFinish(item, v);
                    }, true);
                    break;
                case TaskEnum_1.TaskState.Received:
                    item.getComponent(TaskItemUi_1.default).initReceivedItem(v, true);
                    break;
            }
            achievementContent.addChild(item);
        });
    };
    TaskUi.prototype.refreshDailyTask = function () {
        var _this = this;
        var content = this.node.getChildByName("content");
        var top = this.node.getChildByName("top");
        var dailyT = top.getChildByName("daily");
        var dailyC = content.getChildByName("daily");
        // 总活跃 1天100 一周500
        var weekActivityNum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskWeekActivityNum, 0);
        var dailyActivityNum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskDailyActivityNum, 0);
        dailyT.getChildByName("weekActivityNum").getComponent(cc.Label).string = weekActivityNum + '';
        dailyT.getChildByName("dailyActivityNum").getComponent(cc.Label).string = dailyActivityNum + '';
        // 活跃进度条
        dailyT.getChildByName("weekActivity1").getComponent(cc.Sprite).fillRange = weekActivityNum / 500;
        if (weekActivityNum >= 500) {
            dailyT.getChildByName("weekActivity2").active = true;
        }
        else {
            dailyT.getChildByName("weekActivity2").active = false;
        }
        dailyT.getChildByName("dailyActivity1").getComponent(cc.Sprite).fillRange = dailyActivityNum / 100;
        if (dailyActivityNum >= 100) {
            dailyT.getChildByName("dailyActivity2").active = true;
        }
        else {
            dailyT.getChildByName("dailyActivity2").active = false;
        }
        // 处理累计积分奖励
        var weekAccumulateData = AccumulatedInformation_1.AccumulatedInformationManager.getInstance().getRewardByTaskType(2);
        var dailyAccumulateData = AccumulatedInformation_1.AccumulatedInformationManager.getInstance().getRewardByTaskType(1);
        weekAccumulateData.forEach(function (v, k) {
            var item;
            var itemRoot = dailyT.getChildByName("week" + (k + 1));
            if (weekActivityNum >= v.AccumulatedPoints
                && StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskWeeklyActivityState + v.AccumulatedPoints, 0) == 0) {
                itemRoot.children[0].active = true;
                item = itemRoot.children[1];
                var type_1 = Item_1.ItemManager.getInstance().getType(v.PropID_1);
                if (type_1 == 3) {
                    item.getComponent(EquipItem_1.default).init(HeroConfig_1.Hero_Type.NULL, v.PropID_1, PropConfig_1.PropAction.Null);
                }
                else {
                    item.getComponent(Prop_1.default).init(v.PropID_1, v.PropNum_1, PropConfig_1.PropAction.Null);
                }
                item.off(cc.Node.EventType.TOUCH_END);
                item.on(cc.Node.EventType.TOUCH_END, function FF() {
                    // 领取奖励
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.周活跃每一档奖励的领取次数 + v.AccumulatedPointsID);
                    itemRoot.children[0].active = false;
                    PropManager_1.PropManager.getInstance().changePropNum(v.PropID_1, v.PropNum_1);
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskWeeklyActivityState + v.AccumulatedPoints, 1);
                    GameManager_1.default.getInstance().showGetTip(item);
                    item.off(cc.Node.EventType.TOUCH_END, FF);
                    // let type = ItemManager.getInstance().getType(v.PropID_1);
                    if (type_1 == 3) {
                        item.getComponent(EquipItem_1.default).init(HeroConfig_1.Hero_Type.NULL, v.PropID_1, PropConfig_1.PropAction.Look);
                        item.on(cc.Node.EventType.TOUCH_END, function () {
                            item.getComponent(EquipItem_1.default).onClick();
                        });
                    }
                    else {
                        item.getComponent(Prop_1.default).init(v.PropID_1, v.PropNum_1, PropConfig_1.PropAction.Look);
                        item.on(cc.Node.EventType.TOUCH_END, function () {
                            item.getComponent(Prop_1.default).onClick();
                        });
                    }
                    var mask = new cc.Node();
                    mask.opacity = 150;
                    mask.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_frame_Dark");
                    var gou = new cc.Node();
                    gou.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("SignIn_Got");
                    mask.addChild(gou);
                    item.addChild(mask);
                    EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Task);
                    HttpManager_1.HttpManager.post(HttpManager_1.AccessName.saveGameTask, UserInfo_1.UserInfo.getInstance().getSaveGameTaskJsonString(v.AccumulatedPoints, 5));
                });
            }
            else {
                itemRoot.children[0].active = false;
            }
        });
        dailyAccumulateData.forEach(function (v, k) {
            var item;
            var itemRoot = dailyT.getChildByName("daily" + (k + 1));
            if (dailyActivityNum >= v.AccumulatedPoints
                && StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskDailyActivityState + v.AccumulatedPoints, 0) == 0) {
                itemRoot.children[0].active = true;
                item = itemRoot.children[1];
                var type_2 = Item_1.ItemManager.getInstance().getType(v.PropID_1);
                if (type_2 == 3) {
                    item.getComponent(EquipItem_1.default).init(HeroConfig_1.Hero_Type.NULL, v.PropID_1, PropConfig_1.PropAction.Null);
                }
                else {
                    item.getComponent(Prop_1.default).init(v.PropID_1, v.PropNum_1, PropConfig_1.PropAction.Null);
                }
                item.off(cc.Node.EventType.TOUCH_END);
                item.on(cc.Node.EventType.TOUCH_END, function FF() {
                    // 领取奖励
                    FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.日活跃每一档奖励的领取次数 + v.AccumulatedPointsID);
                    itemRoot.children[0].active = false;
                    PropManager_1.PropManager.getInstance().changePropNum(v.PropID_1, v.PropNum_1);
                    StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TaskDailyActivityState + v.AccumulatedPoints, 1);
                    GameManager_1.default.getInstance().showGetTip(item);
                    item.off(cc.Node.EventType.TOUCH_END, FF);
                    // let type = ItemManager.getInstance().getType(v.PropID_1);
                    if (type_2 == 3) {
                        item.getComponent(EquipItem_1.default).init(HeroConfig_1.Hero_Type.NULL, v.PropID_1, PropConfig_1.PropAction.Look);
                        item.on(cc.Node.EventType.TOUCH_END, function () {
                            item.getComponent(EquipItem_1.default).onClick();
                        });
                    }
                    else {
                        item.getComponent(Prop_1.default).init(v.PropID_1, v.PropNum_1, PropConfig_1.PropAction.Look);
                        item.on(cc.Node.EventType.TOUCH_END, function () {
                            item.getComponent(Prop_1.default).onClick();
                        });
                    }
                    var mask = new cc.Node();
                    mask.opacity = 150;
                    mask.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_frame_Dark");
                    var gou = new cc.Node();
                    gou.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("SignIn_Got");
                    mask.addChild(gou);
                    item.addChild(mask);
                    EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Task);
                    HttpManager_1.HttpManager.post(HttpManager_1.AccessName.saveGameTask, UserInfo_1.UserInfo.getInstance().getSaveGameTaskJsonString(v.AccumulatedPoints, 4));
                });
            }
            else {
                itemRoot.children[0].active = false;
            }
        });
        // 处理任务
        TaskManager_1.default.getInstance().sortDailyTask();
        var dailyTask = TaskManager_1.default.getInstance().getDailyTaskList();
        var dailyContent = dailyC.getChildByName("scroll").getComponent(cc.ScrollView).content;
        if (dailyContent.childrenCount == 0) {
            dailyTask.forEach(function (v, k) {
                var item = cc.instantiate(_this.task_item);
                item.name = "task" + k;
                var state = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskState + v.TaskID, 0);
                switch (state) {
                    case TaskEnum_1.TaskState.Ongoing:
                        item.getComponent(TaskItemUi_1.default).initGoingItem(v, function () {
                            _this.onClickGoBtn(v.TaskID);
                        });
                        break;
                    case TaskEnum_1.TaskState.Completed:
                        item.getComponent(TaskItemUi_1.default).initFinishItem(v, function () {
                            _this.onClickDailyTaskFinish(item, v);
                        });
                        break;
                    case TaskEnum_1.TaskState.Received:
                        item.getComponent(TaskItemUi_1.default).initReceivedItem(v);
                        break;
                }
                dailyContent.addChild(item);
            });
        }
        else {
            dailyTask.forEach(function (v, k) {
                var item = dailyContent.getChildByName("task" + k);
                var state = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskState + v.TaskID, 0);
                switch (state) {
                    case TaskEnum_1.TaskState.Ongoing:
                        item.getComponent(TaskItemUi_1.default).initGoingItem(v, function () {
                            _this.onClickGoBtn(v.TaskID);
                        });
                        break;
                    case TaskEnum_1.TaskState.Completed:
                        item.getComponent(TaskItemUi_1.default).initFinishItem(v, function () {
                            _this.onClickDailyTaskFinish(item, v);
                        });
                        break;
                    case TaskEnum_1.TaskState.Received:
                        item.getComponent(TaskItemUi_1.default).initReceivedItem(v);
                        break;
                }
            });
        }
    };
    TaskUi.prototype.refreshAchievementTask = function () {
        var _this = this;
        var content = this.node.getChildByName("content");
        var achievement = content.getChildByName("achievement");
        TaskManager_1.default.getInstance().sortAchievementTask();
        var achievementTask = TaskManager_1.default.getInstance().getAchievementTaskData();
        var achievementContent = achievement.getChildByName("scroll").getComponent(cc.ScrollView).content;
        achievementTask.forEach(function (v, k) {
            var item = achievementContent.getChildByName("task" + k);
            if (item == null)
                return;
            if (v == null) {
                achievementContent.removeChild(item);
                return;
            }
            var state = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskState + v.TaskID, 0);
            switch (state) {
                case TaskEnum_1.TaskState.Ongoing:
                    item.getComponent(TaskItemUi_1.default).initGoingItem(v, function () {
                        var id = v.AchievenmentTaskType * 100000 + 1;
                        _this.onClickGoBtn(id);
                    }, true);
                    break;
                case TaskEnum_1.TaskState.Completed:
                    item.getComponent(TaskItemUi_1.default).initFinishItem(v, function () {
                        _this.onClickAchievementTaskFinish(item, v);
                    }, true);
                    break;
                case TaskEnum_1.TaskState.Received:
                    achievementContent.removeChild(item);
                    break;
            }
        });
    };
    TaskUi.prototype.onClickDailyTaskFinish = function (taskItem, info) {
        TaskManager_1.default.getInstance().overTask(info.TaskID);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.每日任务完成数量 + info.TaskID);
        // 刷新日常任务
        this.refreshDailyTask();
        EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Task);
    };
    TaskUi.prototype.onClickAchievementTaskFinish = function (taskItem, info) {
        TaskManager_1.default.getInstance().overTask(info.TaskID);
        PropManager_1.PropManager.getInstance().changePropNum(info.RewardPropID, info.RewardPropNum);
        var reward = PropManager_1.PropManager.getInstance().createPropItem(info.RewardPropID, info.RewardPropNum);
        GameManager_1.default.getInstance().showGetTip(reward);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.成就任务完成数量 + info.TaskID);
        //刷新成就任务
        this.refreshAchievementTask();
        EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Task);
    };
    TaskUi.prototype.onClickGoBtn = function (taskItem) {
        switch (taskItem) {
            case TaskEnum_1.TaskItem.升级1次英雄:
            case TaskEnum_1.TaskItem.升星1次英雄:
            case TaskEnum_1.TaskItem.升级1次装备:
            case TaskEnum_1.TaskItem.升级1次装备品级:
            case TaskEnum_1.TaskItem.升级1次宠物:
            case TaskEnum_1.TaskItem.升级1次专武:
            case TaskEnum_1.TaskItem.将任意X名英雄升到10级:
            case TaskEnum_1.TaskItem.为任意X名英雄穿戴1件装备:
            case TaskEnum_1.TaskItem.将炮手升至1大星:
            case TaskEnum_1.TaskItem.合成X次装备:
            case TaskEnum_1.TaskItem.累计1个英雄升到X级:
            case TaskEnum_1.TaskItem.累计1个英雄升到X星:
            case TaskEnum_1.TaskItem.累计X件装备到达品质6:
            case TaskEnum_1.TaskItem.升级X次灵宠:
            case TaskEnum_1.TaskItem.累计将X只宠物升至最高品质:
                // 跳转到英雄列表
                GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.Role;
                GameManager_1.default.getInstance().jumoAndShowUi();
                break;
            case TaskEnum_1.TaskItem.挑战1次关卡:
            case TaskEnum_1.TaskItem.挑战3次关卡:
            case TaskEnum_1.TaskItem.登录游戏1次:
            case TaskEnum_1.TaskItem.观看任意1次广告:
            case TaskEnum_1.TaskItem.登录X次游戏:
            case TaskEnum_1.TaskItem.释放X次人物技能:
            case TaskEnum_1.TaskItem.上阵X名英雄:
            case TaskEnum_1.TaskItem.累计通过X关:
            case TaskEnum_1.TaskItem.转动转盘1次:
            case TaskEnum_1.TaskItem.通过第X章:
            case TaskEnum_1.TaskItem.累计登录X天:
                // 跳转到战斗
                GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.Main;
                GameManager_1.default.getInstance().jumoAndShowUi();
                break;
            case TaskEnum_1.TaskItem.转盘X次:
                UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.Turntable, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                        uiNode.getComponent(Turmtable_1.default).initUi();
                    }, });
                break;
            case TaskEnum_1.TaskItem.通关X:
                MapManager_1.default.ChallengeRoundPops.getComponent(ChallengeRoundPop_1.default).init(LevelManager_1.LevelManager.getInstance().finish_level + 1);
                break;
            case TaskEnum_1.TaskItem.挑战1次无尽挑战:
            case TaskEnum_1.TaskItem.挑战X次无尽挑战:
            case TaskEnum_1.TaskItem.挑战1次BOSS狩猎:
            case TaskEnum_1.TaskItem.挑战X次boss狩猎:
            case TaskEnum_1.TaskItem.挑战1次爬塔:
            case TaskEnum_1.TaskItem.挑战1次冰河探险:
            case TaskEnum_1.TaskItem.挑战3次无尽挑战:
            case TaskEnum_1.TaskItem.挑战3次BOSS狩猎:
            case TaskEnum_1.TaskItem.挑战3次爬塔:
                //跳转到副本
                GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.Activity;
                GameManager_1.default.getInstance().jumoAndShowUi();
                break;
            case TaskEnum_1.TaskItem.进行1次开启装备:
            case TaskEnum_1.TaskItem.进行1次宠物招募:
            case TaskEnum_1.TaskItem.进行1次英雄招募:
            case TaskEnum_1.TaskItem.商店中购买物品1次:
            case TaskEnum_1.TaskItem.购买1次商店中的金币:
            case TaskEnum_1.TaskItem.招募X次英雄:
            case TaskEnum_1.TaskItem.前往商城购买X次商品:
            case TaskEnum_1.TaskItem.前往商城孵化X次宠物:
            case TaskEnum_1.TaskItem.累计收集X个英雄:
            case TaskEnum_1.TaskItem.累计获得X件装备:
            case TaskEnum_1.TaskItem.累计招募X个英雄:
            case TaskEnum_1.TaskItem.累计孵化灵宠蛋X次:
            case TaskEnum_1.TaskItem.进行10次开启装备:
            case TaskEnum_1.TaskItem.进行10次宠物孵化:
            case TaskEnum_1.TaskItem.进行10次英雄招募:
                // 跳转到商店
                GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.City;
                GameManager_1.default.getInstance().jumoAndShowUi();
                break;
            case TaskEnum_1.TaskItem.完成X次每日任务:
                this.onClickTagBtn(null, TaskUiState.Daily);
                GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.PetList;
                GameManager_1.default.getInstance().jumoAndShowUi();
                break;
            case TaskEnum_1.TaskItem.完成X次成就任务:
                this.onClickTagBtn(null, TaskUiState.Achievement);
                GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.PetList;
                GameManager_1.default.getInstance().jumoAndShowUi();
                break;
            case TaskEnum_1.TaskItem.领取挂机奖励2次:
            case TaskEnum_1.TaskItem.领取快速挂机1次:
                // 跳转到挂机
                GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.Main;
                GameManager_1.default.getInstance().jumoAndShowUi();
                break;
            case TaskEnum_1.TaskItem.进行账号绑定:
                // 弹出设置界面
                cc.find("Canvas").getComponent(Home_1.default).clickBtnSetting();
                break;
            // 升级1次英雄=11001,
            // 升星1次英雄=12001,
            // 升级1次装备=13001,
            // 升级1次装备品级=14001,
            // 升级1次宠物=15001,
            // 升级1次专武=16001,
            // 挑战1次关卡=21001,
            // 挑战1次无尽挑战=22001,
            // 挑战1次BOSS狩猎=23001,
            // 挑战1次爬塔=24001,
            // 挑战1次冰河探险=25001,
            // 挑战3次关卡=21002,
            // 挑战3次无尽挑战=22002,
            // 挑战3次BOSS狩猎=23002,
            // 挑战3次爬塔=24002,
            // 进行1次开启装备=31001,
            // 进行1次宠物招募=32002,
            // 进行1次英雄招募=33001,
            // 商店中购买物品1次=34001,
            // 购买1次商店中的金币=35001,
            // 登录游戏1次=41001,
            // 领取挂机奖励2次=42002,
            // 领取快速挂机1次=43003,
            // 观看任意1次广告=44004,
            // // 主线任务
            // 登录1次游戏=101,
            // 释放1次人物技能=102,
            // 通关1_1=103,
            // 上阵2名英雄=104,
            // 通关1_4=105,
            // 招募1次英雄=106,
            // 上阵4名英雄=107,
            // 通关1_5=108,
            // 通关2_1=109,
            // 将任意1名英雄升到10级=110,
            // 通关2_3=111,
            // 为任意1名英雄穿戴1件装备=112,
            // 通关2_5=113,
            // 将炮手升至1大星=114,
            // 通关2_6=115,
            // 完成1次每日任务=116,
            // 完成1次成就任务=117,
            // 通关2_7=118,
            // 前往商城购买1次商品=119,
            // 合成1次装备=120,
            // 通关2_10=121,
            // 通关3_5=122,
            // 前往商城孵化1次宠物=123,
            // 通关3_10=124,
            // // 成就任务
            // 累计通过X关 = 100001,
            // 累计1个英雄升到X级 = 200001,
            // 累计收集X个英雄 = 300001,
            // 累计1个英雄升到X星 = 400001,
            // 累计获得X件装备 = 500001,
            // 累计X件装备到达品质5 = 600001,
            // 累计招募X个英雄 = 700001
        }
    };
    TaskUi.prototype.onClickTagBtn = function (e, state) {
        var content = this.node.getChildByName("content");
        var top = this.node.getChildByName("top");
        state = Number(state);
        switch (state) {
            case TaskUiState.Daily:
                this.state = TaskUiState.Daily;
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.任务_日常页签点击次数);
                top.children[0].getChildByName("tag1").getComponent(cc.Sprite).spriteFrame = this.task_ui.getSpriteFrame("Task_Bg_2");
                top.children[0].getChildByName("tag2").getComponent(cc.Sprite).spriteFrame = this.task_ui.getSpriteFrame("Task_Bg_3");
                top.children[0].getChildByName("tagLabel1").color = cc.color(116, 82, 55);
                top.children[0].getChildByName("tagLabel2").color = cc.color(91, 69, 52);
                content.getChildByName("achievement").active = false;
                content.getChildByName("daily").active = true;
                top.getChildByName("daily").active = true;
                break;
            case TaskUiState.Achievement:
                this.state = TaskUiState.Achievement;
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.任务_成就页签点击次数);
                top.children[0].getChildByName("tag2").getComponent(cc.Sprite).spriteFrame = this.task_ui.getSpriteFrame("Task_Bg_2");
                top.children[0].getChildByName("tag1").getComponent(cc.Sprite).spriteFrame = this.task_ui.getSpriteFrame("Task_Bg_3");
                top.children[0].getChildByName("tagLabel2").color = cc.color(116, 82, 55);
                top.children[0].getChildByName("tagLabel1").color = cc.color(91, 69, 52);
                content.getChildByName("achievement").active = true;
                content.getChildByName("daily").active = false;
                top.getChildByName("daily").active = false;
                break;
        }
    };
    TaskUi.prototype.onClickMainTaskUi = function () {
        var taskInfo = TaskManager_1.default.getInstance().getMainTaskData();
        var taskState = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskState + taskInfo.ThreadTaskID, 0);
        switch (taskState) {
            case 0:
                var id = Math.floor(taskInfo.ThreadTaskID / 1000) * 1000 + 1;
                this.onClickGoBtn(id);
                return;
                break;
            case 1:
                TaskManager_1.default.getInstance().overTask(taskInfo.ThreadTaskID);
                PropManager_1.PropManager.getInstance().changePropNum(taskInfo.PropID_1, taskInfo.PropNum_1);
                PropManager_1.PropManager.getInstance().changePropNum(taskInfo.PropID_2, taskInfo.PropNum_2);
                var reward1 = PropManager_1.PropManager.getInstance().createPropItem(taskInfo.PropID_1, taskInfo.PropNum_1);
                var reward2 = PropManager_1.PropManager.getInstance().createPropItem(taskInfo.PropID_2, taskInfo.PropNum_2);
                GameManager_1.default.getInstance().showMultipleGetTip([reward1, reward2]);
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.主线任务完成人数数量_x + taskInfo.ThreadTaskID);
                //刷新主线任务显示
                this.scheduleOnce(function () {
                    cc.find('Canvas/main_ui').getComponent(MainUi_1.default).refreshMainTaskUi();
                }, 0.01);
                return;
                break;
            case 2:
                break;
        }
    };
    __decorate([
        property(cc.Prefab)
    ], TaskUi.prototype, "task_item", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], TaskUi.prototype, "task_ui", void 0);
    TaskUi = __decorate([
        ccclass
    ], TaskUi);
    return TaskUi;
}(cc.Component));
exports.default = TaskUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVGFza1xcVGFza1VpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDREQUF1RDtBQUN2RCx3REFBbUU7QUFFbkUsMENBQXVDO0FBQ3ZDLHVEQUFrRDtBQUNsRCw4Q0FBeUM7QUFDekMsZ0VBQTJEO0FBQzNELGtEQUE2QztBQUM3QyxzREFBb0Q7QUFDcEQsZ0NBQTJCO0FBQzNCLHNEQUFxRDtBQUNyRCxvRUFBK0Q7QUFDL0QsZ0VBQTJEO0FBQzNELDBDQUFnRDtBQUNoRCxxQ0FBZ0M7QUFDaEMsaURBQXdEO0FBQ3hELG1EQUFrRDtBQUVsRCwwREFBc0Q7QUFDdEQsNERBQThEO0FBQzlELHNEQUFtRjtBQUNuRixvREFBK0M7QUFFL0MsNENBQXVDO0FBRXZDLDJDQUFzRDtBQUV0RCw2Q0FBNEM7QUFFNUMsaURBQWdEO0FBRWhELHdFQUE4RTtBQUk5RSx1Q0FBaUQ7QUFDakQsMkNBQXNDO0FBRXRDLDZDQUF3QztBQUVsQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1QyxJQUFLLFdBR0o7QUFIRCxXQUFLLFdBQVc7SUFDWiwrQ0FBUyxDQUFBO0lBQ1QsMkRBQVcsQ0FBQTtBQUNmLENBQUMsRUFISSxXQUFXLEtBQVgsV0FBVyxRQUdmO0FBR0Q7SUFBb0MsMEJBQVk7SUFBaEQ7UUFBQSxxRUFvcUJDO1FBanFCRyxlQUFTLEdBQWMsSUFBSSxDQUFDO1FBRTVCLGFBQU8sR0FBbUIsSUFBSSxDQUFDO1FBRS9CLFdBQUssR0FBZ0IsV0FBVyxDQUFDLEtBQUssQ0FBQzs7SUE2cEIzQyxDQUFDO0lBM3BCYSx1QkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFB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Q0FBQyxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3ZFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDVCxPQUFPO2dCQUNQLE1BQU07WUFDVixLQUFLLENBQUM7Z0JBRUYsTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQS9wQkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs2Q0FDUTtJQUU1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDOzJDQUNNO0lBTGQsTUFBTTtRQUQxQixPQUFPO09BQ2EsTUFBTSxDQW9xQjFCO0lBQUQsYUFBQztDQXBxQkQsQUFvcUJDLENBcHFCbUMsRUFBRSxDQUFDLFNBQVMsR0FvcUIvQztrQkFwcUJvQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBXWE1hbmFnZXJFWCBmcm9tIFwiLi4vLi4vc3RhcnRzY2VuZS9XWE1hbmFnZXJFWFwiO1xyXG5pbXBvcnQgeyBBY2Nlc3NOYW1lLCBIdHRwTWFuYWdlciB9IGZyb20gXCIuLi8uL05ldFdvcmsvSHR0cE1hbmFnZXJcIjtcclxuaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4uL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdvX1R5cGUgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBFcXVpcEl0ZW0gZnJvbSBcIi4uL0VxdWlwbWVudC9VaS9FcXVpcEl0ZW1cIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgQ2hhbGxlbmdlUm91bmRQb3AgZnJvbSBcIi4uL0d1YUppL0NoYWxsZW5nZVJvdW5kUG9wXCI7XHJcbmltcG9ydCBNYXBNYW5hZ2VyIGZyb20gXCIuLi9HdWFKaS9NYXBNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9fVHlwZSB9IGZyb20gXCIuLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgSG9tZSBmcm9tIFwiLi4vSG9tZVwiO1xyXG5pbXBvcnQgeyBMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vTGV2ZWwvTGV2ZWxNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd01hbmFnZXJcIjtcclxuaW1wb3J0IHsgSXRlbU1hbmFnZXIgfSBmcm9tIFwiLi4vUHJvcC9EYXRhL0l0ZW1cIjtcclxuaW1wb3J0IFByb3AgZnJvbSBcIi4uL1Byb3AvUHJvcFwiO1xyXG5pbXBvcnQgeyBQcm9wQWN0aW9uLCBQcm9wSWQgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBTdG9yYWdlS2V5IH0gZnJvbSBcIi4uL1N0b3JhZ2UvU3RvcmFnZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBUaGVTdG9yYWdlTWFuYWdlciB9IGZyb20gXCIuLi9TdG9yYWdlL1N0b3JhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEV2ZW50TWFuYWdlciwgUmVkRXZlbnRTdHJpbmcsIFJlZEV2ZW50VHlwZSB9IGZyb20gXCIuLi9Ub29scy9FdmVudE1hbmFnZXJcIjtcclxuaW1wb3J0IFR1cm10YWJsZSBmcm9tIFwiLi4vVHVybnRhYmxlL1R1cm10YWJsZVwiO1xyXG5pbXBvcnQgR29sZE1hbGxVaSBmcm9tIFwiLi4vVUkvaG9tZS9Hb2xkTWFsbFVpXCI7XHJcbmltcG9ydCBNYWluVWkgZnJvbSBcIi4uL1VJL2hvbWUvTWFpblVpXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi4vVUkvVUlDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgVUlMYXllckxldmVsLCBVSVBhdGggfSBmcm9tIFwiLi4vVUkvVUlDb25maWdcIjtcclxuaW1wb3J0IHsgVWlBY3Rpb24gfSBmcm9tIFwiLi4vVUkvVWlJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4uL1VJL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgVXNlckRhdGEgZnJvbSBcIi4uL1VzZXJEYXRhXCI7XHJcbmltcG9ydCB7IFVzZXJJbmZvIH0gZnJvbSBcIi4uL1VzZXJJbmZvL1VzZXJJbmZvXCI7XHJcbmltcG9ydCBXaXNoaW5nVWkgZnJvbSBcIi4uL1dpc2gvV2lzaGluZ1VpXCI7XHJcbmltcG9ydCB7IEFjY3VtdWxhdGVkSW5mb3JtYXRpb25NYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9BY2N1bXVsYXRlZEluZm9ybWF0aW9uXCI7XHJcbmltcG9ydCB7IEpzb25BY2hpZXZlbm1lbnRUYXNrIH0gZnJvbSBcIi4vRGF0YS9BY2hpZXZlbm1lbnRUYXNrXCI7XHJcbmltcG9ydCB7IEpzb25UYXNrSW5mb3JtYXRpb24sIFRhc2tJbmZvcm1hdGlvbk1hbmFnZXIgfSBmcm9tIFwiLi9EYXRhL1Rhc2tJbmZvcm1hdGlvblwiO1xyXG5pbXBvcnQgeyBUaHJlYWRUYXNrSW5mb3JtYXRpb25NYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9UaHJlYWRUYXNrSW5mb3JtYXRpb25cIjtcclxuaW1wb3J0IHsgVGFza1N0YXRlLCBUYXNrSXRlbSB9IGZyb20gXCIuL1Rhc2tFbnVtXCI7XHJcbmltcG9ydCBUYXNrSXRlbVVpIGZyb20gXCIuL1Rhc2tJdGVtVWlcIjtcclxuaW1wb3J0IFRhc2tNYWluSXRlbVVpIGZyb20gXCIuL1Rhc2tNYWluSXRlbVVpXCI7XHJcbmltcG9ydCBUYXNrTWFuYWdlciBmcm9tIFwiLi9UYXNrTWFuYWdlclwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmVudW0gVGFza1VpU3RhdGUge1xyXG4gICAgRGFpbHkgPSAwLFxyXG4gICAgQWNoaWV2ZW1lbnQsXHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2tVaSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHRhc2tfaXRlbTogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVBdGxhcylcclxuICAgIHRhc2tfdWk6IGNjLlNwcml0ZUF0bGFzID0gbnVsbDtcclxuXHJcbiAgICBzdGF0ZTogVGFza1VpU3RhdGUgPSBUYXNrVWlTdGF0ZS5EYWlseTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VELCB0aGlzLm9uUG9zaXRpb25DaGFuZ2UsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VELCB0aGlzLm9uUG9zaXRpb25DaGFuZ2UsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUG9zaXRpb25DaGFuZ2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS54ID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoQWNoaWV2ZW1lbnRUYXNrKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaERhaWx5VGFzaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vbkluaXRVaSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uSW5pdFVpKCkge1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBUYXNrVWlTdGF0ZS5EYWlseTtcclxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIik7XHJcbiAgICAgICAgbGV0IHRvcCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRvcFwiKTtcclxuICAgICAgICBsZXQgZGFpbHlUID0gdG9wLmdldENoaWxkQnlOYW1lKFwiZGFpbHlcIik7XHJcbiAgICAgICAgbGV0IGRhaWx5QyA9IGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJkYWlseVwiKTtcclxuICAgICAgICBpZihXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnN0YXR1c0JhckhlaWdodD4yMCl7ICAgXHJcbiAgICAgICAgICAgIHRvcC5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS50b3AgPSAxMDA7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuZ2V0Q29tcG9uZW50KGNjLldpZGdldCkudG9wID0gMTAwO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0b3AuZ2V0Q29tcG9uZW50KGNjLldpZGdldCkudG9wID0gMDtcclxuICAgICAgICAgICAgY29udGVudC5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS50b3AgPSAwO1xyXG4gICAgICAgICAgIC8vIGRhaWx5VC5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS50b3AgPSAxNTguNTA7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICB0b3AuY2hpbGRyZW5bMF0uZ2V0Q2hpbGRCeU5hbWUoXCJ0YWcxXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy50YXNrX3VpLmdldFNwcml0ZUZyYW1lKFwiVGFza19CZ18yXCIpO1xyXG4gICAgICAgIHRvcC5jaGlsZHJlblswXS5nZXRDaGlsZEJ5TmFtZShcInRhZzJcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnRhc2tfdWkuZ2V0U3ByaXRlRnJhbWUoXCJUYXNrX0JnXzNcIik7XHJcbiAgICAgICAgdG9wLmNoaWxkcmVuWzBdLmdldENoaWxkQnlOYW1lKFwidGFnTGFiZWwxXCIpLmNvbG9yID0gY2MuY29sb3IoMTE2LCA4MiwgNTUpO1xyXG4gICAgICAgIHRvcC5jaGlsZHJlblswXS5nZXRDaGlsZEJ5TmFtZShcInRhZ0xhYmVsMlwiKS5jb2xvciA9IGNjLmNvbG9yKDkxLCA2OSwgNTIpO1xyXG5cclxuICAgICAgICAvLyBsZXQgZGFpbHkgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJkYWlseVwiKTtcclxuICAgICAgICBsZXQgYWNoaWV2ZW1lbnQgPSBjb250ZW50LmdldENoaWxkQnlOYW1lKFwiYWNoaWV2ZW1lbnRcIik7XHJcblxyXG5cclxuICAgICAgICAvLyDmgLvmtLvot4MgMeWkqTEwMCDkuIDlkag1MDBcclxuICAgICAgICBsZXQgd2Vla0FjdGl2aXR5TnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UYXNrV2Vla0FjdGl2aXR5TnVtLCAwKTtcclxuICAgICAgICBsZXQgZGFpbHlBY3Rpdml0eU51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVGFza0RhaWx5QWN0aXZpdHlOdW0sIDApO1xyXG4gICAgICAgIGRhaWx5VC5nZXRDaGlsZEJ5TmFtZShcIndlZWtBY3Rpdml0eU51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHdlZWtBY3Rpdml0eU51bSArICcnO1xyXG4gICAgICAgIGRhaWx5VC5nZXRDaGlsZEJ5TmFtZShcImRhaWx5QWN0aXZpdHlOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBkYWlseUFjdGl2aXR5TnVtICsgJyc7XHJcblxyXG4gICAgICAgIC8vIOa0u+i3g+i/m+W6puadoVxyXG4gICAgICAgIGRhaWx5VC5nZXRDaGlsZEJ5TmFtZShcIndlZWtBY3Rpdml0eTFcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuZmlsbFJhbmdlID0gd2Vla0FjdGl2aXR5TnVtIC8gNTAwO1xyXG4gICAgICAgIGlmICh3ZWVrQWN0aXZpdHlOdW0gPj0gNTAwKSB7XHJcbiAgICAgICAgICAgIGRhaWx5VC5nZXRDaGlsZEJ5TmFtZShcIndlZWtBY3Rpdml0eTJcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkYWlseVQuZ2V0Q2hpbGRCeU5hbWUoXCJ3ZWVrQWN0aXZpdHkyXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGFpbHlULmdldENoaWxkQnlOYW1lKFwiZGFpbHlBY3Rpdml0eTFcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuZmlsbFJhbmdlID0gZGFpbHlBY3Rpdml0eU51bSAvIDEwMDtcclxuICAgICAgICBpZiAoZGFpbHlBY3Rpdml0eU51bSA+PSAxMDApIHtcclxuICAgICAgICAgICAgZGFpbHlULmdldENoaWxkQnlOYW1lKFwiZGFpbHlBY3Rpdml0eTJcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkYWlseVQuZ2V0Q2hpbGRCeU5hbWUoXCJkYWlseUFjdGl2aXR5MlwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5aSE55CG57Sv6K6h56ev5YiG5aWW5YqxXHJcbiAgICAgICAgbGV0IHdlZWtBY2N1bXVsYXRlRGF0YSA9IEFjY3VtdWxhdGVkSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmV3YXJkQnlUYXNrVHlwZSgyKTtcclxuICAgICAgICBsZXQgZGFpbHlBY2N1bXVsYXRlRGF0YSA9IEFjY3VtdWxhdGVkSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmV3YXJkQnlUYXNrVHlwZSgxKTtcclxuXHJcbiAgICAgICAgd2Vla0FjY3VtdWxhdGVEYXRhLmZvckVhY2goKHYsIGspID0+IHtcclxuICAgICAgICAgICAgbGV0IGl0ZW06IGNjLk5vZGU7XHJcbiAgICAgICAgICAgIGxldCBpdGVtUm9vdCA9IGRhaWx5VC5nZXRDaGlsZEJ5TmFtZShcIndlZWtcIiArIChrICsgMSkpO1xyXG4gICAgICAgICAgICBpZiAod2Vla0FjdGl2aXR5TnVtID49IHYuQWNjdW11bGF0ZWRQb2ludHNcclxuICAgICAgICAgICAgICAgICYmIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVGFza1dlZWtseUFjdGl2aXR5U3RhdGUgKyB2LkFjY3VtdWxhdGVkUG9pbnRzLCAwKSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbSh2LlByb3BJRF8xLCB2LlByb3BOdW1fMSwgUHJvcEFjdGlvbi5OdWxsKTtcclxuICAgICAgICAgICAgICAgIGl0ZW1Sb290LmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpdGVtLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgZnVuY3Rpb24gRkYoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6aKG5Y+W5aWW5YqxXHJcbiAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuWRqOa0u+i3g+avj+S4gOaho+WlluWKseeahOmihuWPluasoeaVsCArIHYuQWNjdW11bGF0ZWRQb2ludHNJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVJvb3QuY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKHYuUHJvcElEXzEsIHYuUHJvcE51bV8xKTtcclxuICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UYXNrV2Vla2x5QWN0aXZpdHlTdGF0ZSArIHYuQWNjdW11bGF0ZWRQb2ludHMsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dldFRpcChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIEZGKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdHlwZSA9IEl0ZW1NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VHlwZSh2LlByb3BJRF8xKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KEVxdWlwSXRlbSkuaW5pdChIZXJvX1R5cGUuTlVMTCwgdi5Qcm9wSURfMSwgUHJvcEFjdGlvbi5Mb29rKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChQcm9wKS5pbml0KHYuUHJvcElEXzEsIHYuUHJvcE51bV8xLCBQcm9wQWN0aW9uLkxvb2spO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWFzayA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFzay5vcGFjaXR5ID0gMTUwO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2suYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKFwiSXRlbV9mcmFtZV9EYXJrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBnb3UgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdvdS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeU5hbWUoXCJTaWduSW5fR290XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2suYWRkQ2hpbGQoZ291KTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmFkZENoaWxkKG1hc2spO1xyXG4gICAgICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLFJlZEV2ZW50VHlwZS5CdG5fVGFzayk7XHJcbiAgICAgICAgICAgICAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnNhdmVHYW1lVGFzayxVc2VySW5mby5nZXRJbnN0YW5jZSgpLmdldFNhdmVHYW1lVGFza0pzb25TdHJpbmcodi5BY2N1bXVsYXRlZFBvaW50cyw1KSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh3ZWVrQWN0aXZpdHlOdW0gPj0gdi5BY2N1bXVsYXRlZFBvaW50c1xyXG4gICAgICAgICAgICAgICAgJiYgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UYXNrV2Vla2x5QWN0aXZpdHlTdGF0ZSArIHYuQWNjdW11bGF0ZWRQb2ludHMsIDApID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHYuUHJvcElEXzEsIHYuUHJvcE51bV8xKTtcclxuICAgICAgICAgICAgICAgIGl0ZW1Sb290LmNoaWxkcmVuWzBdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1hc2sgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgbWFzay5vcGFjaXR5ID0gMTUwO1xyXG4gICAgICAgICAgICAgICAgbWFzay5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeU5hbWUoXCJJdGVtX2ZyYW1lX0RhcmtcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgZ291ID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgICAgIGdvdS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeU5hbWUoXCJTaWduSW5fR290XCIpO1xyXG4gICAgICAgICAgICAgICAgbWFzay5hZGRDaGlsZChnb3UpO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5hZGRDaGlsZChtYXNrKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh3ZWVrQWN0aXZpdHlOdW0gPCB2LkFjY3VtdWxhdGVkUG9pbnRzKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtUm9vdC5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGl0ZW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHYuUHJvcElEXzEsIHYuUHJvcE51bV8xKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpdGVtLnNjYWxlID0gMC43O1xyXG4gICAgICAgICAgICBpdGVtUm9vdC5hZGRDaGlsZChpdGVtKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGFpbHlBY2N1bXVsYXRlRGF0YS5mb3JFYWNoKCh2LCBrKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtOiBjYy5Ob2RlO1xyXG4gICAgICAgICAgICBsZXQgaXRlbVJvb3QgPSBkYWlseVQuZ2V0Q2hpbGRCeU5hbWUoXCJkYWlseVwiICsgKGsgKyAxKSk7XHJcbiAgICAgICAgICAgIGlmIChkYWlseUFjdGl2aXR5TnVtID49IHYuQWNjdW11bGF0ZWRQb2ludHNcclxuICAgICAgICAgICAgICAgICYmIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVGFza0RhaWx5QWN0aXZpdHlTdGF0ZSArIHYuQWNjdW11bGF0ZWRQb2ludHMsIDApID09IDApIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHYuUHJvcElEXzEsIHYuUHJvcE51bV8xLCBQcm9wQWN0aW9uLk51bGwpO1xyXG4gICAgICAgICAgICAgICAgaXRlbVJvb3QuY2hpbGRyZW5bMF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGl0ZW0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBmdW5jdGlvbiBGRigpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDpooblj5blpZblirFcclxuICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5pel5rS76LeD5q+P5LiA5qGj5aWW5Yqx55qE6aKG5Y+W5qyh5pWwICsgdi5BY2N1bXVsYXRlZFBvaW50c0lEKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtUm9vdC5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odi5Qcm9wSURfMSwgdi5Qcm9wTnVtXzEpO1xyXG4gICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRhc2tEYWlseUFjdGl2aXR5U3RhdGUgKyB2LkFjY3VtdWxhdGVkUG9pbnRzLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRUaXAoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBGRik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR5cGUgPSBJdGVtTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFR5cGUodi5Qcm9wSURfMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChFcXVpcEl0ZW0pLmluaXQoSGVyb19UeXBlLk5VTEwsIHYuUHJvcElEXzEsIFByb3BBY3Rpb24uTG9vayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoUHJvcCkuaW5pdCh2LlByb3BJRF8xLCB2LlByb3BOdW1fMSwgUHJvcEFjdGlvbi5Mb29rKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1hc2sgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2sub3BhY2l0eSA9IDE1MDtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5TmFtZShcIkl0ZW1fZnJhbWVfRGFya1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZ291ID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBnb3UuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKFwiU2lnbkluX0dvdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrLmFkZENoaWxkKGdvdSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hZGRDaGlsZChtYXNrKTtcclxuICAgICAgICAgICAgICAgICAgICBFdmVudE1hbmFnZXIucG9zdFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9DSEVDSyxSZWRFdmVudFR5cGUuQnRuX1Rhc2spO1xyXG4gICAgICAgICAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5zYXZlR2FtZVRhc2ssVXNlckluZm8uZ2V0SW5zdGFuY2UoKS5nZXRTYXZlR2FtZVRhc2tKc29uU3RyaW5nKHYuQWNjdW11bGF0ZWRQb2ludHMsNCkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGFpbHlBY3Rpdml0eU51bSA+PSB2LkFjY3VtdWxhdGVkUG9pbnRzXHJcbiAgICAgICAgICAgICAgICAmJiBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tEYWlseUFjdGl2aXR5U3RhdGUgKyB2LkFjY3VtdWxhdGVkUG9pbnRzLCAwKSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtUm9vdC5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGl0ZW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHYuUHJvcElEXzEsIHYuUHJvcE51bV8xKTtcclxuICAgICAgICAgICAgICAgIGxldCBtYXNrID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgICAgIG1hc2sub3BhY2l0eSA9IDE1MDtcclxuICAgICAgICAgICAgICAgIG1hc2suYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKFwiSXRlbV9mcmFtZV9EYXJrXCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGdvdSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgICAgICAgICBnb3UuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKFwiU2lnbkluX0dvdFwiKTtcclxuICAgICAgICAgICAgICAgIG1hc2suYWRkQ2hpbGQoZ291KTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uYWRkQ2hpbGQobWFzayk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGFpbHlBY3Rpdml0eU51bSA8IHYuQWNjdW11bGF0ZWRQb2ludHMpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1Sb290LmNoaWxkcmVuWzBdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaXRlbSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0odi5Qcm9wSURfMSwgdi5Qcm9wTnVtXzEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGl0ZW0uc2NhbGUgPSAwLjc7XHJcbiAgICAgICAgICAgIGl0ZW1Sb290LmFkZENoaWxkKGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDlpITnkIbku7vliqFcclxuICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvcnREYWlseVRhc2soKTtcclxuICAgICAgICBsZXQgZGFpbHlUYXNrID0gVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREYWlseVRhc2tMaXN0KCk7XHJcbiAgICAgICAgbGV0IGRhaWx5Q29udGVudCA9IGRhaWx5Qy5nZXRDaGlsZEJ5TmFtZShcInNjcm9sbFwiKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudDtcclxuICAgICAgICBkYWlseVRhc2suZm9yRWFjaCgodiwgaykgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMudGFza19pdGVtKTtcclxuICAgICAgICAgICAgaXRlbS5uYW1lID0gXCJ0YXNrXCIgKyBrO1xyXG4gICAgICAgICAgICBsZXQgc3RhdGUgPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tTdGF0ZSArIHYuVGFza0lELCAwKTtcclxuICAgICAgICAgICAgc3dpdGNoIChzdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUYXNrU3RhdGUuT25nb2luZzpcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChUYXNrSXRlbVVpKS5pbml0R29pbmdJdGVtKHYsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkNsaWNrR29CdG4odi5UYXNrSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUYXNrU3RhdGUuQ29tcGxldGVkOlxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KFRhc2tJdGVtVWkpLmluaXRGaW5pc2hJdGVtKHYsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkNsaWNrRGFpbHlUYXNrRmluaXNoKGl0ZW0sIHYpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUYXNrU3RhdGUuUmVjZWl2ZWQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoVGFza0l0ZW1VaSkuaW5pdFJlY2VpdmVkSXRlbSh2KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYWlseUNvbnRlbnQuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBhY2hpZXZlbWVudFRhc2sgPSBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEFjaGlldmVtZW50VGFza0RhdGEoKTtcclxuICAgICAgICBsZXQgYWNoaWV2ZW1lbnRDb250ZW50ID0gYWNoaWV2ZW1lbnQuZ2V0Q2hpbGRCeU5hbWUoXCJzY3JvbGxcIikuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAgICAgYWNoaWV2ZW1lbnRUYXNrLmZvckVhY2goKHYsIGspID0+IHtcclxuICAgICAgICAgICAgaWYgKHYgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy50YXNrX2l0ZW0pO1xyXG4gICAgICAgICAgICBpdGVtLm5hbWUgPSBcInRhc2tcIiArIGs7XHJcbiAgICAgICAgICAgIGxldCBzdGF0ZSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVGFza1N0YXRlICsgdi5UYXNrSUQsIDApO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRhc2tTdGF0ZS5PbmdvaW5nOlxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KFRhc2tJdGVtVWkpLmluaXRHb2luZ0l0ZW0odiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaWQgPSB2LkFjaGlldmVubWVudFRhc2tUeXBlICogMTAwMDAwICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkNsaWNrR29CdG4oaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUYXNrU3RhdGUuQ29tcGxldGVkOlxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KFRhc2tJdGVtVWkpLmluaXRGaW5pc2hJdGVtKHYsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkNsaWNrQWNoaWV2ZW1lbnRUYXNrRmluaXNoKGl0ZW0sIHYpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUYXNrU3RhdGUuUmVjZWl2ZWQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoVGFza0l0ZW1VaSkuaW5pdFJlY2VpdmVkSXRlbSh2LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhY2hpZXZlbWVudENvbnRlbnQuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaERhaWx5VGFzaygpIHtcclxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIik7XHJcbiAgICAgICAgbGV0IHRvcCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRvcFwiKTtcclxuXHJcbiAgICAgICAgbGV0IGRhaWx5VCA9IHRvcC5nZXRDaGlsZEJ5TmFtZShcImRhaWx5XCIpO1xyXG4gICAgICAgIGxldCBkYWlseUMgPSBjb250ZW50LmdldENoaWxkQnlOYW1lKFwiZGFpbHlcIik7XHJcbiAgICAgICAgLy8g5oC75rS76LeDIDHlpKkxMDAg5LiA5ZGoNTAwXHJcbiAgICAgICAgbGV0IHdlZWtBY3Rpdml0eU51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVGFza1dlZWtBY3Rpdml0eU51bSwgMCk7XHJcbiAgICAgICAgbGV0IGRhaWx5QWN0aXZpdHlOdW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tEYWlseUFjdGl2aXR5TnVtLCAwKTtcclxuICAgICAgICBkYWlseVQuZ2V0Q2hpbGRCeU5hbWUoXCJ3ZWVrQWN0aXZpdHlOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB3ZWVrQWN0aXZpdHlOdW0gKyAnJztcclxuICAgICAgICBkYWlseVQuZ2V0Q2hpbGRCeU5hbWUoXCJkYWlseUFjdGl2aXR5TnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gZGFpbHlBY3Rpdml0eU51bSArICcnO1xyXG5cclxuICAgICAgICAvLyDmtLvot4Pov5vluqbmnaFcclxuICAgICAgICBkYWlseVQuZ2V0Q2hpbGRCeU5hbWUoXCJ3ZWVrQWN0aXZpdHkxXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLmZpbGxSYW5nZSA9IHdlZWtBY3Rpdml0eU51bSAvIDUwMDtcclxuICAgICAgICBpZiAod2Vla0FjdGl2aXR5TnVtID49IDUwMCkge1xyXG4gICAgICAgICAgICBkYWlseVQuZ2V0Q2hpbGRCeU5hbWUoXCJ3ZWVrQWN0aXZpdHkyXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZGFpbHlULmdldENoaWxkQnlOYW1lKFwid2Vla0FjdGl2aXR5MlwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRhaWx5VC5nZXRDaGlsZEJ5TmFtZShcImRhaWx5QWN0aXZpdHkxXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLmZpbGxSYW5nZSA9IGRhaWx5QWN0aXZpdHlOdW0gLyAxMDA7XHJcbiAgICAgICAgaWYgKGRhaWx5QWN0aXZpdHlOdW0gPj0gMTAwKSB7XHJcbiAgICAgICAgICAgIGRhaWx5VC5nZXRDaGlsZEJ5TmFtZShcImRhaWx5QWN0aXZpdHkyXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZGFpbHlULmdldENoaWxkQnlOYW1lKFwiZGFpbHlBY3Rpdml0eTJcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWkhOeQhue0r+iuoeenr+WIhuWlluWKsVxyXG4gICAgICAgIGxldCB3ZWVrQWNjdW11bGF0ZURhdGEgPSBBY2N1bXVsYXRlZEluZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJld2FyZEJ5VGFza1R5cGUoMik7XHJcbiAgICAgICAgbGV0IGRhaWx5QWNjdW11bGF0ZURhdGEgPSBBY2N1bXVsYXRlZEluZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJld2FyZEJ5VGFza1R5cGUoMSk7XHJcblxyXG4gICAgICAgIHdlZWtBY2N1bXVsYXRlRGF0YS5mb3JFYWNoKCh2LCBrKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtOiBjYy5Ob2RlO1xyXG4gICAgICAgICAgICBsZXQgaXRlbVJvb3QgPSBkYWlseVQuZ2V0Q2hpbGRCeU5hbWUoXCJ3ZWVrXCIgKyAoayArIDEpKTtcclxuICAgICAgICAgICAgaWYgKHdlZWtBY3Rpdml0eU51bSA+PSB2LkFjY3VtdWxhdGVkUG9pbnRzXHJcbiAgICAgICAgICAgICAgICAmJiBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tXZWVrbHlBY3Rpdml0eVN0YXRlICsgdi5BY2N1bXVsYXRlZFBvaW50cywgMCkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbVJvb3QuY2hpbGRyZW5bMF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGl0ZW0gPSBpdGVtUm9vdC5jaGlsZHJlblsxXTtcclxuICAgICAgICAgICAgICAgIGxldCB0eXBlID0gSXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUeXBlKHYuUHJvcElEXzEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KEVxdWlwSXRlbSkuaW5pdChIZXJvX1R5cGUuTlVMTCwgdi5Qcm9wSURfMSwgUHJvcEFjdGlvbi5OdWxsKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoUHJvcCkuaW5pdCh2LlByb3BJRF8xLCB2LlByb3BOdW1fMSwgUHJvcEFjdGlvbi5OdWxsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGl0ZW0ub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCk7XHJcbiAgICAgICAgICAgICAgICBpdGVtLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgZnVuY3Rpb24gRkYoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6aKG5Y+W5aWW5YqxXHJcbiAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuWRqOa0u+i3g+avj+S4gOaho+WlluWKseeahOmihuWPluasoeaVsCArIHYuQWNjdW11bGF0ZWRQb2ludHNJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVJvb3QuY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKHYuUHJvcElEXzEsIHYuUHJvcE51bV8xKTtcclxuICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UYXNrV2Vla2x5QWN0aXZpdHlTdGF0ZSArIHYuQWNjdW11bGF0ZWRQb2ludHMsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dldFRpcChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIEZGKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgdHlwZSA9IEl0ZW1NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VHlwZSh2LlByb3BJRF8xKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KEVxdWlwSXRlbSkuaW5pdChIZXJvX1R5cGUuTlVMTCwgdi5Qcm9wSURfMSwgUHJvcEFjdGlvbi5Mb29rKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KEVxdWlwSXRlbSkub25DbGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChQcm9wKS5pbml0KHYuUHJvcElEXzEsIHYuUHJvcE51bV8xLCBQcm9wQWN0aW9uLkxvb2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoUHJvcCkub25DbGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1hc2sgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2sub3BhY2l0eSA9IDE1MDtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5TmFtZShcIkl0ZW1fZnJhbWVfRGFya1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZ291ID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBnb3UuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKFwiU2lnbkluX0dvdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrLmFkZENoaWxkKGdvdSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hZGRDaGlsZChtYXNrKTtcclxuICAgICAgICAgICAgICAgICAgICBFdmVudE1hbmFnZXIucG9zdFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9DSEVDSyxSZWRFdmVudFR5cGUuQnRuX1Rhc2spO1xyXG4gICAgICAgICAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5zYXZlR2FtZVRhc2ssVXNlckluZm8uZ2V0SW5zdGFuY2UoKS5nZXRTYXZlR2FtZVRhc2tKc29uU3RyaW5nKHYuQWNjdW11bGF0ZWRQb2ludHMsNSkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaXRlbVJvb3QuY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGFpbHlBY2N1bXVsYXRlRGF0YS5mb3JFYWNoKCh2LCBrKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtOiBjYy5Ob2RlO1xyXG4gICAgICAgICAgICBsZXQgaXRlbVJvb3QgPSBkYWlseVQuZ2V0Q2hpbGRCeU5hbWUoXCJkYWlseVwiICsgKGsgKyAxKSk7XHJcbiAgICAgICAgICAgIGlmIChkYWlseUFjdGl2aXR5TnVtID49IHYuQWNjdW11bGF0ZWRQb2ludHNcclxuICAgICAgICAgICAgICAgICYmIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVGFza0RhaWx5QWN0aXZpdHlTdGF0ZSArIHYuQWNjdW11bGF0ZWRQb2ludHMsIDApID09IDApIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1Sb290LmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpdGVtID0gaXRlbVJvb3QuY2hpbGRyZW5bMV07XHJcbiAgICAgICAgICAgICAgICBsZXQgdHlwZSA9IEl0ZW1NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VHlwZSh2LlByb3BJRF8xKTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChFcXVpcEl0ZW0pLmluaXQoSGVyb19UeXBlLk5VTEwsIHYuUHJvcElEXzEsIFByb3BBY3Rpb24uTnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KFByb3ApLmluaXQodi5Qcm9wSURfMSwgdi5Qcm9wTnVtXzEsIFByb3BBY3Rpb24uTnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpdGVtLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQpO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIGZ1bmN0aW9uIEZGKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOmihuWPluWlluWKsVxyXG4gICAgICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ml6XmtLvot4Pmr4/kuIDmoaPlpZblirHnmoTpooblj5bmrKHmlbAgKyB2LkFjY3VtdWxhdGVkUG9pbnRzSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1Sb290LmNoaWxkcmVuWzBdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bSh2LlByb3BJRF8xLCB2LlByb3BOdW1fMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVGFza0RhaWx5QWN0aXZpdHlTdGF0ZSArIHYuQWNjdW11bGF0ZWRQb2ludHMsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dldFRpcChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIEZGKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgdHlwZSA9IEl0ZW1NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VHlwZSh2LlByb3BJRF8xKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KEVxdWlwSXRlbSkuaW5pdChIZXJvX1R5cGUuTlVMTCwgdi5Qcm9wSURfMSwgUHJvcEFjdGlvbi5Mb29rKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KEVxdWlwSXRlbSkub25DbGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChQcm9wKS5pbml0KHYuUHJvcElEXzEsIHYuUHJvcE51bV8xLCBQcm9wQWN0aW9uLkxvb2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoUHJvcCkub25DbGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1hc2sgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2sub3BhY2l0eSA9IDE1MDtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5TmFtZShcIkl0ZW1fZnJhbWVfRGFya1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZ291ID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBnb3UuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKFwiU2lnbkluX0dvdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrLmFkZENoaWxkKGdvdSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hZGRDaGlsZChtYXNrKTtcclxuICAgICAgICAgICAgICAgICAgICBFdmVudE1hbmFnZXIucG9zdFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9DSEVDSyxSZWRFdmVudFR5cGUuQnRuX1Rhc2spO1xyXG4gICAgICAgICAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5zYXZlR2FtZVRhc2ssVXNlckluZm8uZ2V0SW5zdGFuY2UoKS5nZXRTYXZlR2FtZVRhc2tKc29uU3RyaW5nKHYuQWNjdW11bGF0ZWRQb2ludHMsNCkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaXRlbVJvb3QuY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIC8vIOWkhOeQhuS7u+WKoVxyXG4gICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuc29ydERhaWx5VGFzaygpO1xyXG4gICAgICAgIGxldCBkYWlseVRhc2sgPSBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERhaWx5VGFza0xpc3QoKTtcclxuICAgICAgICBsZXQgZGFpbHlDb250ZW50ID0gZGFpbHlDLmdldENoaWxkQnlOYW1lKFwic2Nyb2xsXCIpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5jb250ZW50O1xyXG4gICAgICAgIGlmIChkYWlseUNvbnRlbnQuY2hpbGRyZW5Db3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGRhaWx5VGFzay5mb3JFYWNoKCh2LCBrKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMudGFza19pdGVtKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0ubmFtZSA9IFwidGFza1wiICsgaztcclxuICAgICAgICAgICAgICAgIGxldCBzdGF0ZSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVGFza1N0YXRlICsgdi5UYXNrSUQsIDApO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChzdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgVGFza1N0YXRlLk9uZ29pbmc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KFRhc2tJdGVtVWkpLmluaXRHb2luZ0l0ZW0odiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkNsaWNrR29CdG4odi5UYXNrSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBUYXNrU3RhdGUuQ29tcGxldGVkOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChUYXNrSXRlbVVpKS5pbml0RmluaXNoSXRlbSh2LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2tEYWlseVRhc2tGaW5pc2goaXRlbSwgdik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFRhc2tTdGF0ZS5SZWNlaXZlZDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoVGFza0l0ZW1VaSkuaW5pdFJlY2VpdmVkSXRlbSh2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkYWlseUNvbnRlbnQuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRhaWx5VGFzay5mb3JFYWNoKCh2LCBrKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGRhaWx5Q29udGVudC5nZXRDaGlsZEJ5TmFtZShcInRhc2tcIiArIGspO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0YXRlID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UYXNrU3RhdGUgKyB2LlRhc2tJRCwgMCk7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBUYXNrU3RhdGUuT25nb2luZzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoVGFza0l0ZW1VaSkuaW5pdEdvaW5nSXRlbSh2LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2tHb0J0bih2LlRhc2tJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFRhc2tTdGF0ZS5Db21wbGV0ZWQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KFRhc2tJdGVtVWkpLmluaXRGaW5pc2hJdGVtKHYsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25DbGlja0RhaWx5VGFza0ZpbmlzaChpdGVtLCB2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgVGFza1N0YXRlLlJlY2VpdmVkOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChUYXNrSXRlbVVpKS5pbml0UmVjZWl2ZWRJdGVtKHYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hBY2hpZXZlbWVudFRhc2soKSB7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpO1xyXG4gICAgICAgIGxldCBhY2hpZXZlbWVudCA9IGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJhY2hpZXZlbWVudFwiKTtcclxuICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvcnRBY2hpZXZlbWVudFRhc2soKTtcclxuICAgICAgICBsZXQgYWNoaWV2ZW1lbnRUYXNrID0gVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBY2hpZXZlbWVudFRhc2tEYXRhKCk7XHJcbiAgICAgICAgbGV0IGFjaGlldmVtZW50Q29udGVudCA9IGFjaGlldmVtZW50LmdldENoaWxkQnlOYW1lKFwic2Nyb2xsXCIpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5jb250ZW50O1xyXG4gICAgICAgIGFjaGlldmVtZW50VGFzay5mb3JFYWNoKCh2LCBrKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gYWNoaWV2ZW1lbnRDb250ZW50LmdldENoaWxkQnlOYW1lKFwidGFza1wiICsgayk7XHJcbiAgICAgICAgICAgIGlmKGl0ZW0gPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAodiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBhY2hpZXZlbWVudENvbnRlbnQucmVtb3ZlQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHN0YXRlID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UYXNrU3RhdGUgKyB2LlRhc2tJRCwgMCk7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgVGFza1N0YXRlLk9uZ29pbmc6XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoVGFza0l0ZW1VaSkuaW5pdEdvaW5nSXRlbSh2LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpZCA9IHYuQWNoaWV2ZW5tZW50VGFza1R5cGUgKiAxMDAwMDAgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2tHb0J0bihpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRhc2tTdGF0ZS5Db21wbGV0ZWQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoVGFza0l0ZW1VaSkuaW5pdEZpbmlzaEl0ZW0odiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2tBY2hpZXZlbWVudFRhc2tGaW5pc2goaXRlbSwgdik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRhc2tTdGF0ZS5SZWNlaXZlZDpcclxuICAgICAgICAgICAgICAgICAgICBhY2hpZXZlbWVudENvbnRlbnQucmVtb3ZlQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrRGFpbHlUYXNrRmluaXNoKHRhc2tJdGVtOiBjYy5Ob2RlLCBpbmZvOiBKc29uVGFza0luZm9ybWF0aW9uKSB7XHJcbiAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5vdmVyVGFzayhpbmZvLlRhc2tJRCk7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuavj+aXpeS7u+WKoeWujOaIkOaVsOmHjyArIGluZm8uVGFza0lEKTtcclxuICAgICAgICAvLyDliLfmlrDml6XluLjku7vliqFcclxuICAgICAgICB0aGlzLnJlZnJlc2hEYWlseVRhc2soKTtcclxuICAgICAgICBFdmVudE1hbmFnZXIucG9zdFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9DSEVDSyxSZWRFdmVudFR5cGUuQnRuX1Rhc2spO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tBY2hpZXZlbWVudFRhc2tGaW5pc2godGFza0l0ZW06IGNjLk5vZGUsIGluZm86IEpzb25BY2hpZXZlbm1lbnRUYXNrKSB7XHJcbiAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5vdmVyVGFzayhpbmZvLlRhc2tJRCk7XHJcbiAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKGluZm8uUmV3YXJkUHJvcElELCBpbmZvLlJld2FyZFByb3BOdW0pO1xyXG4gICAgICAgIGxldCByZXdhcmQgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKGluZm8uUmV3YXJkUHJvcElELCBpbmZvLlJld2FyZFByb3BOdW0pO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dldFRpcChyZXdhcmQpO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7miJDlsLHku7vliqHlrozmiJDmlbDph48gKyBpbmZvLlRhc2tJRCk7XHJcbiAgICAgICAgLy/liLfmlrDmiJDlsLHku7vliqFcclxuICAgICAgICB0aGlzLnJlZnJlc2hBY2hpZXZlbWVudFRhc2soKTtcclxuICAgICAgICBFdmVudE1hbmFnZXIucG9zdFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9DSEVDSyxSZWRFdmVudFR5cGUuQnRuX1Rhc2spO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tHb0J0bih0YXNrSXRlbTogVGFza0l0ZW0pIHtcclxuICAgICAgICBzd2l0Y2ggKHRhc2tJdGVtKSB7XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u5Y2H57qnMeasoeiLsembhDpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7ljYfmmJ8x5qyh6Iux6ZuEOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLuWNh+e6pzHmrKHoo4XlpIc6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u5Y2H57qnMeasoeijheWkh+WTgee6pzpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7ljYfnuqcx5qyh5a6g54mpOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLuWNh+e6pzHmrKHkuJPmraY6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u5bCG5Lu75oSPWOWQjeiLsembhOWNh+WIsDEw57qnOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLuS4uuS7u+aEj1jlkI3oi7Hpm4Tnqb/miLQx5Lu26KOF5aSHOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLuWwhueCruaJi+WNh+iHszHlpKfmmJ86XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u5ZCI5oiQWOasoeijheWkhzpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7ntK/orqEx5Liq6Iux6ZuE5Y2H5YiwWOe6pzpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7ntK/orqEx5Liq6Iux6ZuE5Y2H5YiwWOaYnzpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7ntK/orqFY5Lu26KOF5aSH5Yiw6L6+5ZOB6LSoNjpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7ljYfnuqdY5qyh54G15a6gOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLue0r+iuoeWwhljlj6rlrqDnianljYfoh7PmnIDpq5jlk4HotKg6XHJcbiAgICAgICAgICAgICAgICAvLyDot7PovazliLDoi7Hpm4TliJfooahcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV90b19ob21lID0gR29fVHlwZS5Sb2xlO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5qdW1vQW5kU2hvd1VpKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7mjJHmiJgx5qyh5YWz5Y2hOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLuaMkeaImDPmrKHlhbPljaE6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u55m75b2V5ri45oiPMeasoTpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7op4LnnIvku7vmhI8x5qyh5bm/5ZGKOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLueZu+W9lVjmrKHmuLjmiI86XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u6YeK5pS+WOasoeS6uueJqeaKgOiDvTpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7kuIrpmLVY5ZCN6Iux6ZuEOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLue0r+iuoemAmui/h1jlhbM6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u6L2s5Yqo6L2s55uYMeasoTpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7pgJrov4fnrKxY56ugOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLue0r+iuoeeZu+W9lVjlpKk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOi3s+i9rOWIsOaImOaWl1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZSA9IEdvX1R5cGUuTWFpbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5qdW1vQW5kU2hvd1VpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLui9rOebmFjmrKE6XHJcbiAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlR1cm50YWJsZSxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFR1cm10YWJsZSkuaW5pdFVpKClcclxuICAgICAgICAgICAgICAgIH0sfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7pgJrlhbNYOlxyXG4gICAgICAgICAgICAgICAgTWFwTWFuYWdlci5DaGFsbGVuZ2VSb3VuZFBvcHMuZ2V0Q29tcG9uZW50KENoYWxsZW5nZVJvdW5kUG9wKS5pbml0KExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbCsxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLuaMkeaImDHmrKHml6DlsL3mjJHmiJg6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u5oyR5oiYWOasoeaXoOWwveaMkeaImDpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7mjJHmiJgx5qyhQk9TU+eLqeeMjjpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7mjJHmiJhY5qyhYm9zc+eLqeeMjjpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7mjJHmiJgx5qyh54is5aGUOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLuaMkeaImDHmrKHlhrDmsrPmjqLpmak6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u5oyR5oiYM+asoeaXoOWwveaMkeaImDpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7mjJHmiJgz5qyhQk9TU+eLqeeMjjpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7mjJHmiJgz5qyh54is5aGUOlxyXG4gICAgICAgICAgICAgICAgLy/ot7PovazliLDlia/mnKxcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV90b19ob21lID0gR29fVHlwZS5BY3Rpdml0eTtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuanVtb0FuZFNob3dVaSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u6L+b6KGMMeasoeW8gOWQr+ijheWkhzpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7ov5vooYwx5qyh5a6g54mp5oub5YufOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLui/m+ihjDHmrKHoi7Hpm4Tmi5vli586XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u5ZWG5bqX5Lit6LSt5Lmw54mp5ZOBMeasoTpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7otK3kubAx5qyh5ZWG5bqX5Lit55qE6YeR5biBOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLuaLm+WLn1jmrKHoi7Hpm4Q6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u5YmN5b6A5ZWG5Z+O6LSt5LmwWOasoeWVhuWTgTpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7liY3lvoDllYbln47lrbXljJZY5qyh5a6g54mpOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLue0r+iuoeaUtumbhljkuKroi7Hpm4Q6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u57Sv6K6h6I635b6XWOS7tuijheWkhzpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7ntK/orqHmi5vli59Y5Liq6Iux6ZuEOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLue0r+iuoeWtteWMlueBteWuoOibi1jmrKE6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u6L+b6KGMMTDmrKHlvIDlkK/oo4XlpIc6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u6L+b6KGMMTDmrKHlrqDnianlrbXljJY6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u6L+b6KGMMTDmrKHoi7Hpm4Tmi5vli586XHJcbiAgICAgICAgICAgICAgICAvLyDot7PovazliLDllYblupdcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV90b19ob21lID0gR29fVHlwZS5DaXR5O1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5qdW1vQW5kU2hvd1VpKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7lrozmiJBY5qyh5q+P5pel5Lu75YqhOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNsaWNrVGFnQnRuKG51bGwsVGFza1VpU3RhdGUuRGFpbHkpXHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZSA9IEdvX1R5cGUuUGV0TGlzdDtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuanVtb0FuZFNob3dVaSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u5a6M5oiQWOasoeaIkOWwseS7u+WKoTpcclxuICAgICAgICAgICAgICAgIHRoaXMub25DbGlja1RhZ0J0bihudWxsLFRhc2tVaVN0YXRlLkFjaGlldmVtZW50KVxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWUgPSBHb19UeXBlLlBldExpc3Q7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmp1bW9BbmRTaG93VWkoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLumihuWPluaMguacuuWlluWKsTLmrKE6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u6aKG5Y+W5b+r6YCf5oyC5py6MeasoTpcclxuICAgICAgICAgICAgICAgIC8vIOi3s+i9rOWIsOaMguaculxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWUgPSBHb19UeXBlLk1haW47XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmp1bW9BbmRTaG93VWkoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLui/m+ihjOi0puWPt+e7keWumjpcclxuICAgICAgICAgICAgICAgIC8vIOW8ueWHuuiuvue9rueVjOmdolxyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5nZXRDb21wb25lbnQoSG9tZSkuY2xpY2tCdG5TZXR0aW5nKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8g5Y2H57qnMeasoeiLsembhD0xMTAwMSxcclxuICAgICAgICAgICAgLy8g5Y2H5pifMeasoeiLsembhD0xMjAwMSxcclxuICAgICAgICAgICAgLy8g5Y2H57qnMeasoeijheWkhz0xMzAwMSxcclxuICAgICAgICAgICAgLy8g5Y2H57qnMeasoeijheWkh+WTgee6pz0xNDAwMSxcclxuICAgICAgICAgICAgLy8g5Y2H57qnMeasoeWuoOeJqT0xNTAwMSxcclxuICAgICAgICAgICAgLy8g5Y2H57qnMeasoeS4k+atpj0xNjAwMSxcclxuICAgICAgICAgICAgLy8g5oyR5oiYMeasoeWFs+WNoT0yMTAwMSxcclxuICAgICAgICAgICAgLy8g5oyR5oiYMeasoeaXoOWwveaMkeaImD0yMjAwMSxcclxuICAgICAgICAgICAgLy8g5oyR5oiYMeasoUJPU1Pni6nnjI49MjMwMDEsXHJcbiAgICAgICAgICAgIC8vIOaMkeaImDHmrKHniKzloZQ9MjQwMDEsXHJcbiAgICAgICAgICAgIC8vIOaMkeaImDHmrKHlhrDmsrPmjqLpmak9MjUwMDEsXHJcbiAgICAgICAgICAgIC8vIOaMkeaImDPmrKHlhbPljaE9MjEwMDIsXHJcbiAgICAgICAgICAgIC8vIOaMkeaImDPmrKHml6DlsL3mjJHmiJg9MjIwMDIsXHJcbiAgICAgICAgICAgIC8vIOaMkeaImDPmrKFCT1NT54up54yOPTIzMDAyLFxyXG4gICAgICAgICAgICAvLyDmjJHmiJgz5qyh54is5aGUPTI0MDAyLFxyXG4gICAgICAgICAgICAvLyDov5vooYwx5qyh5byA5ZCv6KOF5aSHPTMxMDAxLFxyXG4gICAgICAgICAgICAvLyDov5vooYwx5qyh5a6g54mp5oub5YufPTMyMDAyLFxyXG4gICAgICAgICAgICAvLyDov5vooYwx5qyh6Iux6ZuE5oub5YufPTMzMDAxLFxyXG4gICAgICAgICAgICAvLyDllYblupfkuK3otK3kubDnianlk4Ex5qyhPTM0MDAxLFxyXG4gICAgICAgICAgICAvLyDotK3kubAx5qyh5ZWG5bqX5Lit55qE6YeR5biBPTM1MDAxLFxyXG4gICAgICAgICAgICAvLyDnmbvlvZXmuLjmiI8x5qyhPTQxMDAxLFxyXG4gICAgICAgICAgICAvLyDpooblj5bmjILmnLrlpZblirEy5qyhPTQyMDAyLFxyXG4gICAgICAgICAgICAvLyDpooblj5blv6vpgJ/mjILmnLox5qyhPTQzMDAzLFxyXG4gICAgICAgICAgICAvLyDop4LnnIvku7vmhI8x5qyh5bm/5ZGKPTQ0MDA0LFxyXG4gICAgICAgICAgICAvLyAvLyDkuLvnur/ku7vliqFcclxuICAgICAgICAgICAgLy8g55m75b2VMeasoea4uOaIjz0xMDEsXHJcbiAgICAgICAgICAgIC8vIOmHiuaUvjHmrKHkurrnianmioDog709MTAyLFxyXG4gICAgICAgICAgICAvLyDpgJrlhbMxXzE9MTAzLFxyXG4gICAgICAgICAgICAvLyDkuIrpmLUy5ZCN6Iux6ZuEPTEwNCxcclxuICAgICAgICAgICAgLy8g6YCa5YWzMV80PTEwNSxcclxuICAgICAgICAgICAgLy8g5oub5YufMeasoeiLsembhD0xMDYsXHJcbiAgICAgICAgICAgIC8vIOS4iumYtTTlkI3oi7Hpm4Q9MTA3LFxyXG4gICAgICAgICAgICAvLyDpgJrlhbMxXzU9MTA4LFxyXG4gICAgICAgICAgICAvLyDpgJrlhbMyXzE9MTA5LFxyXG4gICAgICAgICAgICAvLyDlsIbku7vmhI8x5ZCN6Iux6ZuE5Y2H5YiwMTDnuqc9MTEwLFxyXG4gICAgICAgICAgICAvLyDpgJrlhbMyXzM9MTExLFxyXG4gICAgICAgICAgICAvLyDkuLrku7vmhI8x5ZCN6Iux6ZuE56m/5oi0MeS7tuijheWkhz0xMTIsXHJcbiAgICAgICAgICAgIC8vIOmAmuWFszJfNT0xMTMsXHJcbiAgICAgICAgICAgIC8vIOWwhueCruaJi+WNh+iHszHlpKfmmJ89MTE0LFxyXG4gICAgICAgICAgICAvLyDpgJrlhbMyXzY9MTE1LFxyXG4gICAgICAgICAgICAvLyDlrozmiJAx5qyh5q+P5pel5Lu75YqhPTExNixcclxuICAgICAgICAgICAgLy8g5a6M5oiQMeasoeaIkOWwseS7u+WKoT0xMTcsXHJcbiAgICAgICAgICAgIC8vIOmAmuWFszJfNz0xMTgsXHJcbiAgICAgICAgICAgIC8vIOWJjeW+gOWVhuWfjui0reS5sDHmrKHllYblk4E9MTE5LFxyXG4gICAgICAgICAgICAvLyDlkIjmiJAx5qyh6KOF5aSHPTEyMCxcclxuICAgICAgICAgICAgLy8g6YCa5YWzMl8xMD0xMjEsXHJcbiAgICAgICAgICAgIC8vIOmAmuWFszNfNT0xMjIsXHJcbiAgICAgICAgICAgIC8vIOWJjeW+gOWVhuWfjuWtteWMljHmrKHlrqDniak9MTIzLFxyXG4gICAgICAgICAgICAvLyDpgJrlhbMzXzEwPTEyNCxcclxuICAgICAgICAgICAgLy8gLy8g5oiQ5bCx5Lu75YqhXHJcbiAgICAgICAgICAgIC8vIOe0r+iuoemAmui/h1jlhbMgPSAxMDAwMDEsXHJcbiAgICAgICAgICAgIC8vIOe0r+iuoTHkuKroi7Hpm4TljYfliLBY57qnID0gMjAwMDAxLFxyXG4gICAgICAgICAgICAvLyDntK/orqHmlLbpm4ZY5Liq6Iux6ZuEID0gMzAwMDAxLFxyXG4gICAgICAgICAgICAvLyDntK/orqEx5Liq6Iux6ZuE5Y2H5YiwWOaYnyA9IDQwMDAwMSxcclxuICAgICAgICAgICAgLy8g57Sv6K6h6I635b6XWOS7tuijheWkhyA9IDUwMDAwMSxcclxuICAgICAgICAgICAgLy8g57Sv6K6hWOS7tuijheWkh+WIsOi+vuWTgei0qDUgPSA2MDAwMDEsXHJcbiAgICAgICAgICAgIC8vIOe0r+iuoeaLm+WLn1jkuKroi7Hpm4QgPSA3MDAwMDFcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja1RhZ0J0bihlLCBzdGF0ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpO1xyXG4gICAgICAgIGxldCB0b3AgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0b3BcIik7XHJcbiAgICAgICAgc3RhdGUgPSBOdW1iZXIoc3RhdGUpO1xyXG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSBUYXNrVWlTdGF0ZS5EYWlseTpcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBUYXNrVWlTdGF0ZS5EYWlseTtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ku7vliqFf5pel5bi46aG1562+54K55Ye75qyh5pWwKTtcclxuICAgICAgICAgICAgICAgIHRvcC5jaGlsZHJlblswXS5nZXRDaGlsZEJ5TmFtZShcInRhZzFcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnRhc2tfdWkuZ2V0U3ByaXRlRnJhbWUoXCJUYXNrX0JnXzJcIik7XHJcbiAgICAgICAgICAgICAgICB0b3AuY2hpbGRyZW5bMF0uZ2V0Q2hpbGRCeU5hbWUoXCJ0YWcyXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy50YXNrX3VpLmdldFNwcml0ZUZyYW1lKFwiVGFza19CZ18zXCIpO1xyXG4gICAgICAgICAgICAgICAgdG9wLmNoaWxkcmVuWzBdLmdldENoaWxkQnlOYW1lKFwidGFnTGFiZWwxXCIpLmNvbG9yID0gY2MuY29sb3IoMTE2LCA4MiwgNTUpO1xyXG4gICAgICAgICAgICAgICAgdG9wLmNoaWxkcmVuWzBdLmdldENoaWxkQnlOYW1lKFwidGFnTGFiZWwyXCIpLmNvbG9yID0gY2MuY29sb3IoOTEsIDY5LCA1Mik7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmdldENoaWxkQnlOYW1lKFwiYWNoaWV2ZW1lbnRcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmdldENoaWxkQnlOYW1lKFwiZGFpbHlcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcImRhaWx5XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBUYXNrVWlTdGF0ZS5BY2hpZXZlbWVudDpcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBUYXNrVWlTdGF0ZS5BY2hpZXZlbWVudDtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ku7vliqFf5oiQ5bCx6aG1562+54K55Ye75qyh5pWwKTtcclxuICAgICAgICAgICAgICAgIHRvcC5jaGlsZHJlblswXS5nZXRDaGlsZEJ5TmFtZShcInRhZzJcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnRhc2tfdWkuZ2V0U3ByaXRlRnJhbWUoXCJUYXNrX0JnXzJcIik7XHJcbiAgICAgICAgICAgICAgICB0b3AuY2hpbGRyZW5bMF0uZ2V0Q2hpbGRCeU5hbWUoXCJ0YWcxXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy50YXNrX3VpLmdldFNwcml0ZUZyYW1lKFwiVGFza19CZ18zXCIpO1xyXG4gICAgICAgICAgICAgICAgdG9wLmNoaWxkcmVuWzBdLmdldENoaWxkQnlOYW1lKFwidGFnTGFiZWwyXCIpLmNvbG9yID0gY2MuY29sb3IoMTE2LCA4MiwgNTUpO1xyXG4gICAgICAgICAgICAgICAgdG9wLmNoaWxkcmVuWzBdLmdldENoaWxkQnlOYW1lKFwidGFnTGFiZWwxXCIpLmNvbG9yID0gY2MuY29sb3IoOTEsIDY5LCA1Mik7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmdldENoaWxkQnlOYW1lKFwiYWNoaWV2ZW1lbnRcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJkYWlseVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcImRhaWx5XCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tNYWluVGFza1VpKCkge1xyXG4gICAgICAgIGxldCB0YXNrSW5mbyA9IFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpblRhc2tEYXRhKCk7XHJcbiAgICAgICAgbGV0IHRhc2tTdGF0ZSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVGFza1N0YXRlICsgdGFza0luZm8uVGhyZWFkVGFza0lELCAwKTtcclxuICAgICAgICBzd2l0Y2ggKHRhc2tTdGF0ZSkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBsZXQgaWQgPSBNYXRoLmZsb29yKHRhc2tJbmZvLlRocmVhZFRhc2tJRCAvIDEwMDApICogMTAwMCArIDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2tHb0J0bihpZCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5vdmVyVGFzayh0YXNrSW5mby5UaHJlYWRUYXNrSUQpO1xyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKHRhc2tJbmZvLlByb3BJRF8xLCB0YXNrSW5mby5Qcm9wTnVtXzEpO1xyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKHRhc2tJbmZvLlByb3BJRF8yLCB0YXNrSW5mby5Qcm9wTnVtXzIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJld2FyZDEgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHRhc2tJbmZvLlByb3BJRF8xLCB0YXNrSW5mby5Qcm9wTnVtXzEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJld2FyZDIgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHRhc2tJbmZvLlByb3BJRF8yLCB0YXNrSW5mby5Qcm9wTnVtXzIpO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TXVsdGlwbGVHZXRUaXAoW3Jld2FyZDEsIHJld2FyZDJdKTtcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7kuLvnur/ku7vliqHlrozmiJDkurrmlbDmlbDph49feCt0YXNrSW5mby5UaHJlYWRUYXNrSUQpO1xyXG4gICAgICAgICAgICAgICAgLy/liLfmlrDkuLvnur/ku7vliqHmmL7npLpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvbWFpbl91aScpLmdldENvbXBvbmVudChNYWluVWkpLnJlZnJlc2hNYWluVGFza1VpKCk7XHJcbiAgICAgICAgICAgICAgICB9LCAwLjAxKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuIl19