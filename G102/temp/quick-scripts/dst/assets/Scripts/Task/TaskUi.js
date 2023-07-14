
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVGFza1xcVGFza1VpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHdEQUFtRTtBQUVuRSwwQ0FBdUM7QUFDdkMsdURBQWtEO0FBQ2xELDhDQUF5QztBQUN6QyxnRUFBMkQ7QUFDM0Qsa0RBQTZDO0FBQzdDLHNEQUFvRDtBQUNwRCxnQ0FBMkI7QUFDM0Isc0RBQXFEO0FBQ3JELG9FQUErRDtBQUMvRCxnRUFBMkQ7QUFDM0QsMENBQWdEO0FBQ2hELHFDQUFnQztBQUNoQyxpREFBd0Q7QUFDeEQsbURBQWtEO0FBRWxELDBEQUFzRDtBQUN0RCw0REFBOEQ7QUFDOUQsc0RBQW1GO0FBQ25GLG9EQUErQztBQUUvQyw0Q0FBdUM7QUFFdkMsMkNBQXNEO0FBRXRELDZDQUE0QztBQUU1QyxpREFBZ0Q7QUFFaEQsd0VBQThFO0FBSTlFLHVDQUFpRDtBQUNqRCwyQ0FBc0M7QUFFdEMsNkNBQXdDO0FBRWxDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDLElBQUssV0FHSjtBQUhELFdBQUssV0FBVztJQUNaLCtDQUFTLENBQUE7SUFDVCwyREFBVyxDQUFBO0FBQ2YsQ0FBQyxFQUhJLFdBQVcsS0FBWCxXQUFXLFFBR2Y7QUFHRDtJQUFvQywwQkFBWTtJQUFoRDtRQUFBLHFFQTRwQkM7UUF6cEJHLGVBQVMsR0FBYyxJQUFJLENBQUM7UUFFNUIsYUFBTyxHQUFtQixJQUFJLENBQUM7UUFFL0IsV0FBSyxHQUFnQixXQUFXLENBQUMsS0FBSyxDQUFDOztJQXFwQjNDLENBQUM7SUFucEJhLHVCQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUks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IHsgQWNjZXNzTmFtZSwgSHR0cE1hbmFnZXIgfSBmcm9tIFwiLi4vLi9OZXRXb3JrL0h0dHBNYW5hZ2VyXCI7XHJcbmltcG9ydCBBcGtNYW5hZ2VyIGZyb20gXCIuLi9BZHMvQXBrTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHb19UeXBlIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRXF1aXBJdGVtIGZyb20gXCIuLi9FcXVpcG1lbnQvVWkvRXF1aXBJdGVtXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IENoYWxsZW5nZVJvdW5kUG9wIGZyb20gXCIuLi9HdWFKaS9DaGFsbGVuZ2VSb3VuZFBvcFwiO1xyXG5pbXBvcnQgTWFwTWFuYWdlciBmcm9tIFwiLi4vR3VhSmkvTWFwTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvX1R5cGUgfSBmcm9tIFwiLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IEhvbWUgZnJvbSBcIi4uL0hvbWVcIjtcclxuaW1wb3J0IHsgTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uL0xldmVsL0xldmVsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEl0ZW1NYW5hZ2VyIH0gZnJvbSBcIi4uL1Byb3AvRGF0YS9JdGVtXCI7XHJcbmltcG9ydCBQcm9wIGZyb20gXCIuLi9Qcm9wL1Byb3BcIjtcclxuaW1wb3J0IHsgUHJvcEFjdGlvbiwgUHJvcElkIH0gZnJvbSBcIi4uL1Byb3AvUHJvcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBFdmVudE1hbmFnZXIsIFJlZEV2ZW50U3RyaW5nLCBSZWRFdmVudFR5cGUgfSBmcm9tIFwiLi4vVG9vbHMvRXZlbnRNYW5hZ2VyXCI7XHJcbmltcG9ydCBUdXJtdGFibGUgZnJvbSBcIi4uL1R1cm50YWJsZS9UdXJtdGFibGVcIjtcclxuaW1wb3J0IEdvbGRNYWxsVWkgZnJvbSBcIi4uL1VJL2hvbWUvR29sZE1hbGxVaVwiO1xyXG5pbXBvcnQgTWFpblVpIGZyb20gXCIuLi9VSS9ob21lL01haW5VaVwiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uL1VJL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFVJTGF5ZXJMZXZlbCwgVUlQYXRoIH0gZnJvbSBcIi4uL1VJL1VJQ29uZmlnXCI7XHJcbmltcG9ydCB7IFVpQWN0aW9uIH0gZnJvbSBcIi4uL1VJL1VpSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi9VSS9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IFVzZXJEYXRhIGZyb20gXCIuLi9Vc2VyRGF0YVwiO1xyXG5pbXBvcnQgeyBVc2VySW5mbyB9IGZyb20gXCIuLi9Vc2VySW5mby9Vc2VySW5mb1wiO1xyXG5pbXBvcnQgV2lzaGluZ1VpIGZyb20gXCIuLi9XaXNoL1dpc2hpbmdVaVwiO1xyXG5pbXBvcnQgeyBBY2N1bXVsYXRlZEluZm9ybWF0aW9uTWFuYWdlciB9IGZyb20gXCIuL0RhdGEvQWNjdW11bGF0ZWRJbmZvcm1hdGlvblwiO1xyXG5pbXBvcnQgeyBKc29uQWNoaWV2ZW5tZW50VGFzayB9IGZyb20gXCIuL0RhdGEvQWNoaWV2ZW5tZW50VGFza1wiO1xyXG5pbXBvcnQgeyBKc29uVGFza0luZm9ybWF0aW9uLCBUYXNrSW5mb3JtYXRpb25NYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9UYXNrSW5mb3JtYXRpb25cIjtcclxuaW1wb3J0IHsgVGhyZWFkVGFza0luZm9ybWF0aW9uTWFuYWdlciB9IGZyb20gXCIuL0RhdGEvVGhyZWFkVGFza0luZm9ybWF0aW9uXCI7XHJcbmltcG9ydCB7IFRhc2tTdGF0ZSwgVGFza0l0ZW0gfSBmcm9tIFwiLi9UYXNrRW51bVwiO1xyXG5pbXBvcnQgVGFza0l0ZW1VaSBmcm9tIFwiLi9UYXNrSXRlbVVpXCI7XHJcbmltcG9ydCBUYXNrTWFpbkl0ZW1VaSBmcm9tIFwiLi9UYXNrTWFpbkl0ZW1VaVwiO1xyXG5pbXBvcnQgVGFza01hbmFnZXIgZnJvbSBcIi4vVGFza01hbmFnZXJcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5lbnVtIFRhc2tVaVN0YXRlIHtcclxuICAgIERhaWx5ID0gMCxcclxuICAgIEFjaGlldmVtZW50LFxyXG59XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrVWkgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICB0YXNrX2l0ZW06IGNjLlByZWZhYiA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlQXRsYXMpXHJcbiAgICB0YXNrX3VpOiBjYy5TcHJpdGVBdGxhcyA9IG51bGw7XHJcblxyXG4gICAgc3RhdGU6IFRhc2tVaVN0YXRlID0gVGFza1VpU3RhdGUuRGFpbHk7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuUE9TSVRJT05fQ0hBTkdFRCwgdGhpcy5vblBvc2l0aW9uQ2hhbmdlLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuUE9TSVRJT05fQ0hBTkdFRCwgdGhpcy5vblBvc2l0aW9uQ2hhbmdlLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBvblBvc2l0aW9uQ2hhbmdlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUueCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaEFjaGlldmVtZW50VGFzaygpO1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hEYWlseVRhc2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25Jbml0VWkoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkluaXRVaSgpIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gVGFza1VpU3RhdGUuRGFpbHk7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpO1xyXG4gICAgICAgIGxldCB0b3AgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0b3BcIik7XHJcbiAgICAgICAgbGV0IGRhaWx5VCA9IHRvcC5nZXRDaGlsZEJ5TmFtZShcImRhaWx5XCIpO1xyXG4gICAgICAgIGxldCBkYWlseUMgPSBjb250ZW50LmdldENoaWxkQnlOYW1lKFwiZGFpbHlcIik7XHJcblxyXG4gICAgICAgIHRvcC5jaGlsZHJlblswXS5nZXRDaGlsZEJ5TmFtZShcInRhZzFcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnRhc2tfdWkuZ2V0U3ByaXRlRnJhbWUoXCJUYXNrX0JnXzJcIik7XHJcbiAgICAgICAgdG9wLmNoaWxkcmVuWzBdLmdldENoaWxkQnlOYW1lKFwidGFnMlwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMudGFza191aS5nZXRTcHJpdGVGcmFtZShcIlRhc2tfQmdfM1wiKTtcclxuICAgICAgICB0b3AuY2hpbGRyZW5bMF0uZ2V0Q2hpbGRCeU5hbWUoXCJ0YWdMYWJlbDFcIikuY29sb3IgPSBjYy5jb2xvcigxMTYsIDgyLCA1NSk7XHJcbiAgICAgICAgdG9wLmNoaWxkcmVuWzBdLmdldENoaWxkQnlOYW1lKFwidGFnTGFiZWwyXCIpLmNvbG9yID0gY2MuY29sb3IoOTEsIDY5LCA1Mik7XHJcblxyXG4gICAgICAgIC8vIGxldCBkYWlseSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImRhaWx5XCIpO1xyXG4gICAgICAgIGxldCBhY2hpZXZlbWVudCA9IGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJhY2hpZXZlbWVudFwiKTtcclxuXHJcblxyXG4gICAgICAgIC8vIOaAu+a0u+i3gyAx5aSpMTAwIOS4gOWRqDUwMFxyXG4gICAgICAgIGxldCB3ZWVrQWN0aXZpdHlOdW0gPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tXZWVrQWN0aXZpdHlOdW0sIDApO1xyXG4gICAgICAgIGxldCBkYWlseUFjdGl2aXR5TnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UYXNrRGFpbHlBY3Rpdml0eU51bSwgMCk7XHJcbiAgICAgICAgZGFpbHlULmdldENoaWxkQnlOYW1lKFwid2Vla0FjdGl2aXR5TnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gd2Vla0FjdGl2aXR5TnVtICsgJyc7XHJcbiAgICAgICAgZGFpbHlULmdldENoaWxkQnlOYW1lKFwiZGFpbHlBY3Rpdml0eU51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGRhaWx5QWN0aXZpdHlOdW0gKyAnJztcclxuXHJcbiAgICAgICAgLy8g5rS76LeD6L+b5bqm5p2hXHJcbiAgICAgICAgZGFpbHlULmdldENoaWxkQnlOYW1lKFwid2Vla0FjdGl2aXR5MVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5maWxsUmFuZ2UgPSB3ZWVrQWN0aXZpdHlOdW0gLyA1MDA7XHJcbiAgICAgICAgaWYgKHdlZWtBY3Rpdml0eU51bSA+PSA1MDApIHtcclxuICAgICAgICAgICAgZGFpbHlULmdldENoaWxkQnlOYW1lKFwid2Vla0FjdGl2aXR5MlwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRhaWx5VC5nZXRDaGlsZEJ5TmFtZShcIndlZWtBY3Rpdml0eTJcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkYWlseVQuZ2V0Q2hpbGRCeU5hbWUoXCJkYWlseUFjdGl2aXR5MVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5maWxsUmFuZ2UgPSBkYWlseUFjdGl2aXR5TnVtIC8gMTAwO1xyXG4gICAgICAgIGlmIChkYWlseUFjdGl2aXR5TnVtID49IDEwMCkge1xyXG4gICAgICAgICAgICBkYWlseVQuZ2V0Q2hpbGRCeU5hbWUoXCJkYWlseUFjdGl2aXR5MlwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRhaWx5VC5nZXRDaGlsZEJ5TmFtZShcImRhaWx5QWN0aXZpdHkyXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDlpITnkIbntK/orqHnp6/liIblpZblirFcclxuICAgICAgICBsZXQgd2Vla0FjY3VtdWxhdGVEYXRhID0gQWNjdW11bGF0ZWRJbmZvcm1hdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSZXdhcmRCeVRhc2tUeXBlKDIpO1xyXG4gICAgICAgIGxldCBkYWlseUFjY3VtdWxhdGVEYXRhID0gQWNjdW11bGF0ZWRJbmZvcm1hdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSZXdhcmRCeVRhc2tUeXBlKDEpO1xyXG5cclxuICAgICAgICB3ZWVrQWNjdW11bGF0ZURhdGEuZm9yRWFjaCgodiwgaykgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaXRlbTogY2MuTm9kZTtcclxuICAgICAgICAgICAgbGV0IGl0ZW1Sb290ID0gZGFpbHlULmdldENoaWxkQnlOYW1lKFwid2Vla1wiICsgKGsgKyAxKSk7XHJcbiAgICAgICAgICAgIGlmICh3ZWVrQWN0aXZpdHlOdW0gPj0gdi5BY2N1bXVsYXRlZFBvaW50c1xyXG4gICAgICAgICAgICAgICAgJiYgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UYXNrV2Vla2x5QWN0aXZpdHlTdGF0ZSArIHYuQWNjdW11bGF0ZWRQb2ludHMsIDApID09IDApIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHYuUHJvcElEXzEsIHYuUHJvcE51bV8xLCBQcm9wQWN0aW9uLk51bGwpO1xyXG4gICAgICAgICAgICAgICAgaXRlbVJvb3QuY2hpbGRyZW5bMF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGl0ZW0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBmdW5jdGlvbiBGRigpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDpooblj5blpZblirFcclxuICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5ZGo5rS76LeD5q+P5LiA5qGj5aWW5Yqx55qE6aKG5Y+W5qyh5pWwICsgdi5BY2N1bXVsYXRlZFBvaW50c0lEKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtUm9vdC5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odi5Qcm9wSURfMSwgdi5Qcm9wTnVtXzEpO1xyXG4gICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRhc2tXZWVrbHlBY3Rpdml0eVN0YXRlICsgdi5BY2N1bXVsYXRlZFBvaW50cywgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgRkYpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0eXBlID0gSXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUeXBlKHYuUHJvcElEXzEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoRXF1aXBJdGVtKS5pbml0KEhlcm9fVHlwZS5OVUxMLCB2LlByb3BJRF8xLCBQcm9wQWN0aW9uLkxvb2spO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KFByb3ApLmluaXQodi5Qcm9wSURfMSwgdi5Qcm9wTnVtXzEsIFByb3BBY3Rpb24uTG9vayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtYXNrID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrLm9wYWNpdHkgPSAxNTA7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFzay5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeU5hbWUoXCJJdGVtX2ZyYW1lX0RhcmtcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdvdSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ291LmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5TmFtZShcIlNpZ25Jbl9Hb3RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFzay5hZGRDaGlsZChnb3UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYWRkQ2hpbGQobWFzayk7XHJcbiAgICAgICAgICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfQ0hFQ0ssUmVkRXZlbnRUeXBlLkJ0bl9UYXNrKTtcclxuICAgICAgICAgICAgICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUuc2F2ZUdhbWVUYXNrLFVzZXJJbmZvLmdldEluc3RhbmNlKCkuZ2V0U2F2ZUdhbWVUYXNrSnNvblN0cmluZyh2LkFjY3VtdWxhdGVkUG9pbnRzLDUpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHdlZWtBY3Rpdml0eU51bSA+PSB2LkFjY3VtdWxhdGVkUG9pbnRzXHJcbiAgICAgICAgICAgICAgICAmJiBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tXZWVrbHlBY3Rpdml0eVN0YXRlICsgdi5BY2N1bXVsYXRlZFBvaW50cywgMCkgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0odi5Qcm9wSURfMSwgdi5Qcm9wTnVtXzEpO1xyXG4gICAgICAgICAgICAgICAgaXRlbVJvb3QuY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWFzayA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgICAgICAgICBtYXNrLm9wYWNpdHkgPSAxNTA7XHJcbiAgICAgICAgICAgICAgICBtYXNrLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5TmFtZShcIkl0ZW1fZnJhbWVfRGFya1wiKTtcclxuICAgICAgICAgICAgICAgIGxldCBnb3UgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgZ291LmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5TmFtZShcIlNpZ25Jbl9Hb3RcIik7XHJcbiAgICAgICAgICAgICAgICBtYXNrLmFkZENoaWxkKGdvdSk7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmFkZENoaWxkKG1hc2spO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHdlZWtBY3Rpdml0eU51bSA8IHYuQWNjdW11bGF0ZWRQb2ludHMpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1Sb290LmNoaWxkcmVuWzBdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaXRlbSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0odi5Qcm9wSURfMSwgdi5Qcm9wTnVtXzEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGl0ZW0uc2NhbGUgPSAwLjc7XHJcbiAgICAgICAgICAgIGl0ZW1Sb290LmFkZENoaWxkKGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkYWlseUFjY3VtdWxhdGVEYXRhLmZvckVhY2goKHYsIGspID0+IHtcclxuICAgICAgICAgICAgbGV0IGl0ZW06IGNjLk5vZGU7XHJcbiAgICAgICAgICAgIGxldCBpdGVtUm9vdCA9IGRhaWx5VC5nZXRDaGlsZEJ5TmFtZShcImRhaWx5XCIgKyAoayArIDEpKTtcclxuICAgICAgICAgICAgaWYgKGRhaWx5QWN0aXZpdHlOdW0gPj0gdi5BY2N1bXVsYXRlZFBvaW50c1xyXG4gICAgICAgICAgICAgICAgJiYgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UYXNrRGFpbHlBY3Rpdml0eVN0YXRlICsgdi5BY2N1bXVsYXRlZFBvaW50cywgMCkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0odi5Qcm9wSURfMSwgdi5Qcm9wTnVtXzEsIFByb3BBY3Rpb24uTnVsbCk7XHJcbiAgICAgICAgICAgICAgICBpdGVtUm9vdC5jaGlsZHJlblswXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIGZ1bmN0aW9uIEZGKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOmihuWPluWlluWKsVxyXG4gICAgICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ml6XmtLvot4Pmr4/kuIDmoaPlpZblirHnmoTpooblj5bmrKHmlbAgKyB2LkFjY3VtdWxhdGVkUG9pbnRzSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1Sb290LmNoaWxkcmVuWzBdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bSh2LlByb3BJRF8xLCB2LlByb3BOdW1fMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVGFza0RhaWx5QWN0aXZpdHlTdGF0ZSArIHYuQWNjdW11bGF0ZWRQb2ludHMsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dldFRpcChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIEZGKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdHlwZSA9IEl0ZW1NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VHlwZSh2LlByb3BJRF8xKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KEVxdWlwSXRlbSkuaW5pdChIZXJvX1R5cGUuTlVMTCwgdi5Qcm9wSURfMSwgUHJvcEFjdGlvbi5Mb29rKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChQcm9wKS5pbml0KHYuUHJvcElEXzEsIHYuUHJvcE51bV8xLCBQcm9wQWN0aW9uLkxvb2spO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWFzayA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFzay5vcGFjaXR5ID0gMTUwO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2suYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKFwiSXRlbV9mcmFtZV9EYXJrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBnb3UgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdvdS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeU5hbWUoXCJTaWduSW5fR290XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2suYWRkQ2hpbGQoZ291KTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmFkZENoaWxkKG1hc2spO1xyXG4gICAgICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLFJlZEV2ZW50VHlwZS5CdG5fVGFzayk7XHJcbiAgICAgICAgICAgICAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnNhdmVHYW1lVGFzayxVc2VySW5mby5nZXRJbnN0YW5jZSgpLmdldFNhdmVHYW1lVGFza0pzb25TdHJpbmcodi5BY2N1bXVsYXRlZFBvaW50cyw0KSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYWlseUFjdGl2aXR5TnVtID49IHYuQWNjdW11bGF0ZWRQb2ludHNcclxuICAgICAgICAgICAgICAgICYmIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVGFza0RhaWx5QWN0aXZpdHlTdGF0ZSArIHYuQWNjdW11bGF0ZWRQb2ludHMsIDApID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1Sb290LmNoaWxkcmVuWzBdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaXRlbSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0odi5Qcm9wSURfMSwgdi5Qcm9wTnVtXzEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1hc2sgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgbWFzay5vcGFjaXR5ID0gMTUwO1xyXG4gICAgICAgICAgICAgICAgbWFzay5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeU5hbWUoXCJJdGVtX2ZyYW1lX0RhcmtcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgZ291ID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgICAgIGdvdS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeU5hbWUoXCJTaWduSW5fR290XCIpO1xyXG4gICAgICAgICAgICAgICAgbWFzay5hZGRDaGlsZChnb3UpO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5hZGRDaGlsZChtYXNrKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYWlseUFjdGl2aXR5TnVtIDwgdi5BY2N1bXVsYXRlZFBvaW50cykge1xyXG4gICAgICAgICAgICAgICAgaXRlbVJvb3QuY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpdGVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbSh2LlByb3BJRF8xLCB2LlByb3BOdW1fMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaXRlbS5zY2FsZSA9IDAuNztcclxuICAgICAgICAgICAgaXRlbVJvb3QuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIOWkhOeQhuS7u+WKoVxyXG4gICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuc29ydERhaWx5VGFzaygpO1xyXG4gICAgICAgIGxldCBkYWlseVRhc2sgPSBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERhaWx5VGFza0xpc3QoKTtcclxuICAgICAgICBsZXQgZGFpbHlDb250ZW50ID0gZGFpbHlDLmdldENoaWxkQnlOYW1lKFwic2Nyb2xsXCIpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5jb250ZW50O1xyXG4gICAgICAgIGRhaWx5VGFzay5mb3JFYWNoKCh2LCBrKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy50YXNrX2l0ZW0pO1xyXG4gICAgICAgICAgICBpdGVtLm5hbWUgPSBcInRhc2tcIiArIGs7XHJcbiAgICAgICAgICAgIGxldCBzdGF0ZSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVGFza1N0YXRlICsgdi5UYXNrSUQsIDApO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRhc2tTdGF0ZS5PbmdvaW5nOlxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KFRhc2tJdGVtVWkpLmluaXRHb2luZ0l0ZW0odiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2tHb0J0bih2LlRhc2tJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRhc2tTdGF0ZS5Db21wbGV0ZWQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoVGFza0l0ZW1VaSkuaW5pdEZpbmlzaEl0ZW0odiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2tEYWlseVRhc2tGaW5pc2goaXRlbSwgdik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRhc2tTdGF0ZS5SZWNlaXZlZDpcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChUYXNrSXRlbVVpKS5pbml0UmVjZWl2ZWRJdGVtKHYpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhaWx5Q29udGVudC5hZGRDaGlsZChpdGVtKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGFjaGlldmVtZW50VGFzayA9IFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QWNoaWV2ZW1lbnRUYXNrRGF0YSgpO1xyXG4gICAgICAgIGxldCBhY2hpZXZlbWVudENvbnRlbnQgPSBhY2hpZXZlbWVudC5nZXRDaGlsZEJ5TmFtZShcInNjcm9sbFwiKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudDtcclxuICAgICAgICBhY2hpZXZlbWVudFRhc2suZm9yRWFjaCgodiwgaykgPT4ge1xyXG4gICAgICAgICAgICBpZiAodiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRhc2tfaXRlbSk7XHJcbiAgICAgICAgICAgIGl0ZW0ubmFtZSA9IFwidGFza1wiICsgaztcclxuICAgICAgICAgICAgbGV0IHN0YXRlID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UYXNrU3RhdGUgKyB2LlRhc2tJRCwgMCk7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgVGFza1N0YXRlLk9uZ29pbmc6XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoVGFza0l0ZW1VaSkuaW5pdEdvaW5nSXRlbSh2LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpZCA9IHYuQWNoaWV2ZW5tZW50VGFza1R5cGUgKiAxMDAwMDAgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2tHb0J0bihpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRhc2tTdGF0ZS5Db21wbGV0ZWQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoVGFza0l0ZW1VaSkuaW5pdEZpbmlzaEl0ZW0odiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2tBY2hpZXZlbWVudFRhc2tGaW5pc2goaXRlbSwgdik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRhc2tTdGF0ZS5SZWNlaXZlZDpcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChUYXNrSXRlbVVpKS5pbml0UmVjZWl2ZWRJdGVtKHYsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFjaGlldmVtZW50Q29udGVudC5hZGRDaGlsZChpdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoRGFpbHlUYXNrKCkge1xyXG4gICAgICAgIGxldCBjb250ZW50ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKTtcclxuICAgICAgICBsZXQgdG9wID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidG9wXCIpO1xyXG5cclxuICAgICAgICBsZXQgZGFpbHlUID0gdG9wLmdldENoaWxkQnlOYW1lKFwiZGFpbHlcIik7XHJcbiAgICAgICAgbGV0IGRhaWx5QyA9IGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJkYWlseVwiKTtcclxuICAgICAgICAvLyDmgLvmtLvot4MgMeWkqTEwMCDkuIDlkag1MDBcclxuICAgICAgICBsZXQgd2Vla0FjdGl2aXR5TnVtID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UYXNrV2Vla0FjdGl2aXR5TnVtLCAwKTtcclxuICAgICAgICBsZXQgZGFpbHlBY3Rpdml0eU51bSA9IFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVGFza0RhaWx5QWN0aXZpdHlOdW0sIDApO1xyXG4gICAgICAgIGRhaWx5VC5nZXRDaGlsZEJ5TmFtZShcIndlZWtBY3Rpdml0eU51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHdlZWtBY3Rpdml0eU51bSArICcnO1xyXG4gICAgICAgIGRhaWx5VC5nZXRDaGlsZEJ5TmFtZShcImRhaWx5QWN0aXZpdHlOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBkYWlseUFjdGl2aXR5TnVtICsgJyc7XHJcblxyXG4gICAgICAgIC8vIOa0u+i3g+i/m+W6puadoVxyXG4gICAgICAgIGRhaWx5VC5nZXRDaGlsZEJ5TmFtZShcIndlZWtBY3Rpdml0eTFcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuZmlsbFJhbmdlID0gd2Vla0FjdGl2aXR5TnVtIC8gNTAwO1xyXG4gICAgICAgIGlmICh3ZWVrQWN0aXZpdHlOdW0gPj0gNTAwKSB7XHJcbiAgICAgICAgICAgIGRhaWx5VC5nZXRDaGlsZEJ5TmFtZShcIndlZWtBY3Rpdml0eTJcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkYWlseVQuZ2V0Q2hpbGRCeU5hbWUoXCJ3ZWVrQWN0aXZpdHkyXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGFpbHlULmdldENoaWxkQnlOYW1lKFwiZGFpbHlBY3Rpdml0eTFcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuZmlsbFJhbmdlID0gZGFpbHlBY3Rpdml0eU51bSAvIDEwMDtcclxuICAgICAgICBpZiAoZGFpbHlBY3Rpdml0eU51bSA+PSAxMDApIHtcclxuICAgICAgICAgICAgZGFpbHlULmdldENoaWxkQnlOYW1lKFwiZGFpbHlBY3Rpdml0eTJcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkYWlseVQuZ2V0Q2hpbGRCeU5hbWUoXCJkYWlseUFjdGl2aXR5MlwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5aSE55CG57Sv6K6h56ev5YiG5aWW5YqxXHJcbiAgICAgICAgbGV0IHdlZWtBY2N1bXVsYXRlRGF0YSA9IEFjY3VtdWxhdGVkSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmV3YXJkQnlUYXNrVHlwZSgyKTtcclxuICAgICAgICBsZXQgZGFpbHlBY2N1bXVsYXRlRGF0YSA9IEFjY3VtdWxhdGVkSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmV3YXJkQnlUYXNrVHlwZSgxKTtcclxuXHJcbiAgICAgICAgd2Vla0FjY3VtdWxhdGVEYXRhLmZvckVhY2goKHYsIGspID0+IHtcclxuICAgICAgICAgICAgbGV0IGl0ZW06IGNjLk5vZGU7XHJcbiAgICAgICAgICAgIGxldCBpdGVtUm9vdCA9IGRhaWx5VC5nZXRDaGlsZEJ5TmFtZShcIndlZWtcIiArIChrICsgMSkpO1xyXG4gICAgICAgICAgICBpZiAod2Vla0FjdGl2aXR5TnVtID49IHYuQWNjdW11bGF0ZWRQb2ludHNcclxuICAgICAgICAgICAgICAgICYmIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuVGFza1dlZWtseUFjdGl2aXR5U3RhdGUgKyB2LkFjY3VtdWxhdGVkUG9pbnRzLCAwKSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtUm9vdC5jaGlsZHJlblswXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW1Sb290LmNoaWxkcmVuWzFdO1xyXG4gICAgICAgICAgICAgICAgbGV0IHR5cGUgPSBJdGVtTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFR5cGUodi5Qcm9wSURfMSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoRXF1aXBJdGVtKS5pbml0KEhlcm9fVHlwZS5OVUxMLCB2LlByb3BJRF8xLCBQcm9wQWN0aW9uLk51bGwpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChQcm9wKS5pbml0KHYuUHJvcElEXzEsIHYuUHJvcE51bV8xLCBQcm9wQWN0aW9uLk51bGwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaXRlbS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5EKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBmdW5jdGlvbiBGRigpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDpooblj5blpZblirFcclxuICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5ZGo5rS76LeD5q+P5LiA5qGj5aWW5Yqx55qE6aKG5Y+W5qyh5pWwICsgdi5BY2N1bXVsYXRlZFBvaW50c0lEKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtUm9vdC5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odi5Qcm9wSURfMSwgdi5Qcm9wTnVtXzEpO1xyXG4gICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRhc2tXZWVrbHlBY3Rpdml0eVN0YXRlICsgdi5BY2N1bXVsYXRlZFBvaW50cywgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgRkYpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCB0eXBlID0gSXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUeXBlKHYuUHJvcElEXzEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoRXF1aXBJdGVtKS5pbml0KEhlcm9fVHlwZS5OVUxMLCB2LlByb3BJRF8xLCBQcm9wQWN0aW9uLkxvb2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoRXF1aXBJdGVtKS5vbkNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KFByb3ApLmluaXQodi5Qcm9wSURfMSwgdi5Qcm9wTnVtXzEsIFByb3BBY3Rpb24uTG9vayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChQcm9wKS5vbkNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWFzayA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFzay5vcGFjaXR5ID0gMTUwO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2suYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKFwiSXRlbV9mcmFtZV9EYXJrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBnb3UgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdvdS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeU5hbWUoXCJTaWduSW5fR290XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2suYWRkQ2hpbGQoZ291KTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmFkZENoaWxkKG1hc2spO1xyXG4gICAgICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLFJlZEV2ZW50VHlwZS5CdG5fVGFzayk7XHJcbiAgICAgICAgICAgICAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnNhdmVHYW1lVGFzayxVc2VySW5mby5nZXRJbnN0YW5jZSgpLmdldFNhdmVHYW1lVGFza0pzb25TdHJpbmcodi5BY2N1bXVsYXRlZFBvaW50cyw1KSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpdGVtUm9vdC5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkYWlseUFjY3VtdWxhdGVEYXRhLmZvckVhY2goKHYsIGspID0+IHtcclxuICAgICAgICAgICAgbGV0IGl0ZW06IGNjLk5vZGU7XHJcbiAgICAgICAgICAgIGxldCBpdGVtUm9vdCA9IGRhaWx5VC5nZXRDaGlsZEJ5TmFtZShcImRhaWx5XCIgKyAoayArIDEpKTtcclxuICAgICAgICAgICAgaWYgKGRhaWx5QWN0aXZpdHlOdW0gPj0gdi5BY2N1bXVsYXRlZFBvaW50c1xyXG4gICAgICAgICAgICAgICAgJiYgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UYXNrRGFpbHlBY3Rpdml0eVN0YXRlICsgdi5BY2N1bXVsYXRlZFBvaW50cywgMCkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbVJvb3QuY2hpbGRyZW5bMF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGl0ZW0gPSBpdGVtUm9vdC5jaGlsZHJlblsxXTtcclxuICAgICAgICAgICAgICAgIGxldCB0eXBlID0gSXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUeXBlKHYuUHJvcElEXzEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KEVxdWlwSXRlbSkuaW5pdChIZXJvX1R5cGUuTlVMTCwgdi5Qcm9wSURfMSwgUHJvcEFjdGlvbi5OdWxsKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoUHJvcCkuaW5pdCh2LlByb3BJRF8xLCB2LlByb3BOdW1fMSwgUHJvcEFjdGlvbi5OdWxsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGl0ZW0ub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCk7XHJcbiAgICAgICAgICAgICAgICBpdGVtLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgZnVuY3Rpb24gRkYoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6aKG5Y+W5aWW5YqxXHJcbiAgICAgICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaXpea0u+i3g+avj+S4gOaho+WlluWKseeahOmihuWPluasoeaVsCArIHYuQWNjdW11bGF0ZWRQb2ludHNJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVJvb3QuY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKHYuUHJvcElEXzEsIHYuUHJvcE51bV8xKTtcclxuICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5UYXNrRGFpbHlBY3Rpdml0eVN0YXRlICsgdi5BY2N1bXVsYXRlZFBvaW50cywgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgRkYpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCB0eXBlID0gSXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUeXBlKHYuUHJvcElEXzEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoRXF1aXBJdGVtKS5pbml0KEhlcm9fVHlwZS5OVUxMLCB2LlByb3BJRF8xLCBQcm9wQWN0aW9uLkxvb2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoRXF1aXBJdGVtKS5vbkNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KFByb3ApLmluaXQodi5Qcm9wSURfMSwgdi5Qcm9wTnVtXzEsIFByb3BBY3Rpb24uTG9vayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChQcm9wKS5vbkNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWFzayA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFzay5vcGFjaXR5ID0gMTUwO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2suYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKFwiSXRlbV9mcmFtZV9EYXJrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBnb3UgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdvdS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeU5hbWUoXCJTaWduSW5fR290XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2suYWRkQ2hpbGQoZ291KTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmFkZENoaWxkKG1hc2spO1xyXG4gICAgICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLFJlZEV2ZW50VHlwZS5CdG5fVGFzayk7XHJcbiAgICAgICAgICAgICAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnNhdmVHYW1lVGFzayxVc2VySW5mby5nZXRJbnN0YW5jZSgpLmdldFNhdmVHYW1lVGFza0pzb25TdHJpbmcodi5BY2N1bXVsYXRlZFBvaW50cyw0KSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpdGVtUm9vdC5jaGlsZHJlblswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgLy8g5aSE55CG5Lu75YqhXHJcbiAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3J0RGFpbHlUYXNrKCk7XHJcbiAgICAgICAgbGV0IGRhaWx5VGFzayA9IFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGFpbHlUYXNrTGlzdCgpO1xyXG4gICAgICAgIGxldCBkYWlseUNvbnRlbnQgPSBkYWlseUMuZ2V0Q2hpbGRCeU5hbWUoXCJzY3JvbGxcIikuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAgICAgaWYgKGRhaWx5Q29udGVudC5jaGlsZHJlbkNvdW50ID09IDApIHtcclxuICAgICAgICAgICAgZGFpbHlUYXNrLmZvckVhY2goKHYsIGspID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy50YXNrX2l0ZW0pO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5uYW1lID0gXCJ0YXNrXCIgKyBrO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0YXRlID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UYXNrU3RhdGUgKyB2LlRhc2tJRCwgMCk7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBUYXNrU3RhdGUuT25nb2luZzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoVGFza0l0ZW1VaSkuaW5pdEdvaW5nSXRlbSh2LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2tHb0J0bih2LlRhc2tJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFRhc2tTdGF0ZS5Db21wbGV0ZWQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KFRhc2tJdGVtVWkpLmluaXRGaW5pc2hJdGVtKHYsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25DbGlja0RhaWx5VGFza0ZpbmlzaChpdGVtLCB2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgVGFza1N0YXRlLlJlY2VpdmVkOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChUYXNrSXRlbVVpKS5pbml0UmVjZWl2ZWRJdGVtKHYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRhaWx5Q29udGVudC5hZGRDaGlsZChpdGVtKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZGFpbHlUYXNrLmZvckVhY2goKHYsIGspID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gZGFpbHlDb250ZW50LmdldENoaWxkQnlOYW1lKFwidGFza1wiICsgayk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhdGUgPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tTdGF0ZSArIHYuVGFza0lELCAwKTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFRhc2tTdGF0ZS5PbmdvaW5nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChUYXNrSXRlbVVpKS5pbml0R29pbmdJdGVtKHYsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25DbGlja0dvQnRuKHYuVGFza0lEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgVGFza1N0YXRlLkNvbXBsZXRlZDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoVGFza0l0ZW1VaSkuaW5pdEZpbmlzaEl0ZW0odiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkNsaWNrRGFpbHlUYXNrRmluaXNoKGl0ZW0sIHYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBUYXNrU3RhdGUuUmVjZWl2ZWQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KFRhc2tJdGVtVWkpLmluaXRSZWNlaXZlZEl0ZW0odik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaEFjaGlldmVtZW50VGFzaygpIHtcclxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIik7XHJcbiAgICAgICAgbGV0IGFjaGlldmVtZW50ID0gY29udGVudC5nZXRDaGlsZEJ5TmFtZShcImFjaGlldmVtZW50XCIpO1xyXG4gICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuc29ydEFjaGlldmVtZW50VGFzaygpO1xyXG4gICAgICAgIGxldCBhY2hpZXZlbWVudFRhc2sgPSBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEFjaGlldmVtZW50VGFza0RhdGEoKTtcclxuICAgICAgICBsZXQgYWNoaWV2ZW1lbnRDb250ZW50ID0gYWNoaWV2ZW1lbnQuZ2V0Q2hpbGRCeU5hbWUoXCJzY3JvbGxcIikuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAgICAgYWNoaWV2ZW1lbnRUYXNrLmZvckVhY2goKHYsIGspID0+IHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBhY2hpZXZlbWVudENvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJ0YXNrXCIgKyBrKTtcclxuICAgICAgICAgICAgaWYoaXRlbSA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICh2ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGFjaGlldmVtZW50Q29udGVudC5yZW1vdmVDaGlsZChpdGVtKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgc3RhdGUgPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tTdGF0ZSArIHYuVGFza0lELCAwKTtcclxuICAgICAgICAgICAgc3dpdGNoIChzdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUYXNrU3RhdGUuT25nb2luZzpcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChUYXNrSXRlbVVpKS5pbml0R29pbmdJdGVtKHYsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlkID0gdi5BY2hpZXZlbm1lbnRUYXNrVHlwZSAqIDEwMDAwMCArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25DbGlja0dvQnRuKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgVGFza1N0YXRlLkNvbXBsZXRlZDpcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChUYXNrSXRlbVVpKS5pbml0RmluaXNoSXRlbSh2LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25DbGlja0FjaGlldmVtZW50VGFza0ZpbmlzaChpdGVtLCB2KTtcclxuICAgICAgICAgICAgICAgICAgICB9LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgVGFza1N0YXRlLlJlY2VpdmVkOlxyXG4gICAgICAgICAgICAgICAgICAgIGFjaGlldmVtZW50Q29udGVudC5yZW1vdmVDaGlsZChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tEYWlseVRhc2tGaW5pc2godGFza0l0ZW06IGNjLk5vZGUsIGluZm86IEpzb25UYXNrSW5mb3JtYXRpb24pIHtcclxuICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLm92ZXJUYXNrKGluZm8uVGFza0lEKTtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5q+P5pel5Lu75Yqh5a6M5oiQ5pWw6YePICsgaW5mby5UYXNrSUQpO1xyXG4gICAgICAgIC8vIOWIt+aWsOaXpeW4uOS7u+WKoVxyXG4gICAgICAgIHRoaXMucmVmcmVzaERhaWx5VGFzaygpO1xyXG4gICAgICAgIEV2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLFJlZEV2ZW50VHlwZS5CdG5fVGFzayk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja0FjaGlldmVtZW50VGFza0ZpbmlzaCh0YXNrSXRlbTogY2MuTm9kZSwgaW5mbzogSnNvbkFjaGlldmVubWVudFRhc2spIHtcclxuICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLm92ZXJUYXNrKGluZm8uVGFza0lEKTtcclxuICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oaW5mby5SZXdhcmRQcm9wSUQsIGluZm8uUmV3YXJkUHJvcE51bSk7XHJcbiAgICAgICAgbGV0IHJld2FyZCA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oaW5mby5SZXdhcmRQcm9wSUQsIGluZm8uUmV3YXJkUHJvcE51bSk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKHJld2FyZCk7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuaIkOWwseS7u+WKoeWujOaIkOaVsOmHjyArIGluZm8uVGFza0lEKTtcclxuICAgICAgICAvL+WIt+aWsOaIkOWwseS7u+WKoVxyXG4gICAgICAgIHRoaXMucmVmcmVzaEFjaGlldmVtZW50VGFzaygpO1xyXG4gICAgICAgIEV2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLFJlZEV2ZW50VHlwZS5CdG5fVGFzayk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja0dvQnRuKHRhc2tJdGVtOiBUYXNrSXRlbSkge1xyXG4gICAgICAgIHN3aXRjaCAodGFza0l0ZW0pIHtcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7ljYfnuqcx5qyh6Iux6ZuEOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLuWNh+aYnzHmrKHoi7Hpm4Q6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u5Y2H57qnMeasoeijheWkhzpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7ljYfnuqcx5qyh6KOF5aSH5ZOB57qnOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLuWNh+e6pzHmrKHlrqDniak6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u5Y2H57qnMeasoeS4k+atpjpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7lsIbku7vmhI9Y5ZCN6Iux6ZuE5Y2H5YiwMTDnuqc6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u5Li65Lu75oSPWOWQjeiLsembhOepv+aItDHku7boo4XlpIc6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u5bCG54Ku5omL5Y2H6IezMeWkp+aYnzpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7lkIjmiJBY5qyh6KOF5aSHOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLue0r+iuoTHkuKroi7Hpm4TljYfliLBY57qnOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLue0r+iuoTHkuKroi7Hpm4TljYfliLBY5pifOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLue0r+iuoVjku7boo4XlpIfliLDovr7lk4HotKg2OlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLuWNh+e6p1jmrKHngbXlrqA6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u57Sv6K6h5bCGWOWPquWuoOeJqeWNh+iHs+acgOmrmOWTgei0qDpcclxuICAgICAgICAgICAgICAgIC8vIOi3s+i9rOWIsOiLsembhOWIl+ihqFxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWUgPSBHb19UeXBlLlJvbGU7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmp1bW9BbmRTaG93VWkoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLuaMkeaImDHmrKHlhbPljaE6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u5oyR5oiYM+asoeWFs+WNoTpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7nmbvlvZXmuLjmiI8x5qyhOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLuingueci+S7u+aEjzHmrKHlub/lkYo6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u55m75b2VWOasoea4uOaIjzpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7ph4rmlL5Y5qyh5Lq654mp5oqA6IO9OlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLuS4iumYtVjlkI3oi7Hpm4Q6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u57Sv6K6h6YCa6L+HWOWFszpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7ovazliqjovaznm5gx5qyhOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLumAmui/h+esrFjnq6A6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u57Sv6K6h55m75b2VWOWkqTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6Lez6L2s5Yiw5oiY5paXXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV90b19ob21lID0gR29fVHlwZS5NYWluO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmp1bW9BbmRTaG93VWkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u6L2s55uYWOasoTpcclxuICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguVHVybnRhYmxlLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoVHVybXRhYmxlKS5pbml0VWkoKVxyXG4gICAgICAgICAgICAgICAgfSx9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLumAmuWFs1g6XHJcbiAgICAgICAgICAgICAgICBNYXBNYW5hZ2VyLkNoYWxsZW5nZVJvdW5kUG9wcy5nZXRDb21wb25lbnQoQ2hhbGxlbmdlUm91bmRQb3ApLmluaXQoTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsKzEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u5oyR5oiYMeasoeaXoOWwveaMkeaImDpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7mjJHmiJhY5qyh5peg5bC95oyR5oiYOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLuaMkeaImDHmrKFCT1NT54up54yOOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLuaMkeaImFjmrKFib3Nz54up54yOOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLuaMkeaImDHmrKHniKzloZQ6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u5oyR5oiYMeasoeWGsOays+aOoumZqTpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7mjJHmiJgz5qyh5peg5bC95oyR5oiYOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLuaMkeaImDPmrKFCT1NT54up54yOOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLuaMkeaImDPmrKHniKzloZQ6XHJcbiAgICAgICAgICAgICAgICAvL+i3s+i9rOWIsOWJr+acrFxyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWUgPSBHb19UeXBlLkFjdGl2aXR5O1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5qdW1vQW5kU2hvd1VpKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7ov5vooYwx5qyh5byA5ZCv6KOF5aSHOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLui/m+ihjDHmrKHlrqDnianmi5vli586XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u6L+b6KGMMeasoeiLsembhOaLm+WLnzpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7llYblupfkuK3otK3kubDnianlk4Ex5qyhOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLui0reS5sDHmrKHllYblupfkuK3nmoTph5HluIE6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u5oub5YufWOasoeiLsembhDpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7liY3lvoDllYbln47otK3kubBY5qyh5ZWG5ZOBOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLuWJjeW+gOWVhuWfjuWtteWMlljmrKHlrqDniak6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u57Sv6K6h5pS26ZuGWOS4quiLsembhDpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7ntK/orqHojrflvpdY5Lu26KOF5aSHOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLue0r+iuoeaLm+WLn1jkuKroi7Hpm4Q6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u57Sv6K6h5a215YyW54G15a6g6JuLWOasoTpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7ov5vooYwxMOasoeW8gOWQr+ijheWkhzpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7ov5vooYwxMOasoeWuoOeJqeWtteWMljpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7ov5vooYwxMOasoeiLsembhOaLm+WLnzpcclxuICAgICAgICAgICAgICAgIC8vIOi3s+i9rOWIsOWVhuW6l1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWUgPSBHb19UeXBlLkNpdHk7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmp1bW9BbmRTaG93VWkoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRhc2tJdGVtLuWujOaIkFjmrKHmr4/ml6Xku7vliqE6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2tUYWdCdG4obnVsbCxUYXNrVWlTdGF0ZS5EYWlseSlcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV90b19ob21lID0gR29fVHlwZS5QZXRMaXN0O1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5qdW1vQW5kU2hvd1VpKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7lrozmiJBY5qyh5oiQ5bCx5Lu75YqhOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNsaWNrVGFnQnRuKG51bGwsVGFza1VpU3RhdGUuQWNoaWV2ZW1lbnQpXHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZSA9IEdvX1R5cGUuUGV0TGlzdDtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuanVtb0FuZFNob3dVaSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u6aKG5Y+W5oyC5py65aWW5YqxMuasoTpcclxuICAgICAgICAgICAgY2FzZSBUYXNrSXRlbS7pooblj5blv6vpgJ/mjILmnLox5qyhOlxyXG4gICAgICAgICAgICAgICAgLy8g6Lez6L2s5Yiw5oyC5py6XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdhbWVfdG9faG9tZSA9IEdvX1R5cGUuTWFpbjtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuanVtb0FuZFNob3dVaSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVGFza0l0ZW0u6L+b6KGM6LSm5Y+357uR5a6aOlxyXG4gICAgICAgICAgICAgICAgLy8g5by55Ye66K6+572u55WM6Z2iXHJcbiAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzXCIpLmdldENvbXBvbmVudChIb21lKS5jbGlja0J0blNldHRpbmcoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyDljYfnuqcx5qyh6Iux6ZuEPTExMDAxLFxyXG4gICAgICAgICAgICAvLyDljYfmmJ8x5qyh6Iux6ZuEPTEyMDAxLFxyXG4gICAgICAgICAgICAvLyDljYfnuqcx5qyh6KOF5aSHPTEzMDAxLFxyXG4gICAgICAgICAgICAvLyDljYfnuqcx5qyh6KOF5aSH5ZOB57qnPTE0MDAxLFxyXG4gICAgICAgICAgICAvLyDljYfnuqcx5qyh5a6g54mpPTE1MDAxLFxyXG4gICAgICAgICAgICAvLyDljYfnuqcx5qyh5LiT5q2mPTE2MDAxLFxyXG4gICAgICAgICAgICAvLyDmjJHmiJgx5qyh5YWz5Y2hPTIxMDAxLFxyXG4gICAgICAgICAgICAvLyDmjJHmiJgx5qyh5peg5bC95oyR5oiYPTIyMDAxLFxyXG4gICAgICAgICAgICAvLyDmjJHmiJgx5qyhQk9TU+eLqeeMjj0yMzAwMSxcclxuICAgICAgICAgICAgLy8g5oyR5oiYMeasoeeIrOWhlD0yNDAwMSxcclxuICAgICAgICAgICAgLy8g5oyR5oiYMeasoeWGsOays+aOoumZqT0yNTAwMSxcclxuICAgICAgICAgICAgLy8g5oyR5oiYM+asoeWFs+WNoT0yMTAwMixcclxuICAgICAgICAgICAgLy8g5oyR5oiYM+asoeaXoOWwveaMkeaImD0yMjAwMixcclxuICAgICAgICAgICAgLy8g5oyR5oiYM+asoUJPU1Pni6nnjI49MjMwMDIsXHJcbiAgICAgICAgICAgIC8vIOaMkeaImDPmrKHniKzloZQ9MjQwMDIsXHJcbiAgICAgICAgICAgIC8vIOi/m+ihjDHmrKHlvIDlkK/oo4XlpIc9MzEwMDEsXHJcbiAgICAgICAgICAgIC8vIOi/m+ihjDHmrKHlrqDnianmi5vli589MzIwMDIsXHJcbiAgICAgICAgICAgIC8vIOi/m+ihjDHmrKHoi7Hpm4Tmi5vli589MzMwMDEsXHJcbiAgICAgICAgICAgIC8vIOWVhuW6l+S4rei0reS5sOeJqeWTgTHmrKE9MzQwMDEsXHJcbiAgICAgICAgICAgIC8vIOi0reS5sDHmrKHllYblupfkuK3nmoTph5HluIE9MzUwMDEsXHJcbiAgICAgICAgICAgIC8vIOeZu+W9lea4uOaIjzHmrKE9NDEwMDEsXHJcbiAgICAgICAgICAgIC8vIOmihuWPluaMguacuuWlluWKsTLmrKE9NDIwMDIsXHJcbiAgICAgICAgICAgIC8vIOmihuWPluW/q+mAn+aMguacujHmrKE9NDMwMDMsXHJcbiAgICAgICAgICAgIC8vIOingueci+S7u+aEjzHmrKHlub/lkYo9NDQwMDQsXHJcbiAgICAgICAgICAgIC8vIC8vIOS4u+e6v+S7u+WKoVxyXG4gICAgICAgICAgICAvLyDnmbvlvZUx5qyh5ri45oiPPTEwMSxcclxuICAgICAgICAgICAgLy8g6YeK5pS+MeasoeS6uueJqeaKgOiDvT0xMDIsXHJcbiAgICAgICAgICAgIC8vIOmAmuWFszFfMT0xMDMsXHJcbiAgICAgICAgICAgIC8vIOS4iumYtTLlkI3oi7Hpm4Q9MTA0LFxyXG4gICAgICAgICAgICAvLyDpgJrlhbMxXzQ9MTA1LFxyXG4gICAgICAgICAgICAvLyDmi5vli58x5qyh6Iux6ZuEPTEwNixcclxuICAgICAgICAgICAgLy8g5LiK6Zi1NOWQjeiLsembhD0xMDcsXHJcbiAgICAgICAgICAgIC8vIOmAmuWFszFfNT0xMDgsXHJcbiAgICAgICAgICAgIC8vIOmAmuWFszJfMT0xMDksXHJcbiAgICAgICAgICAgIC8vIOWwhuS7u+aEjzHlkI3oi7Hpm4TljYfliLAxMOe6pz0xMTAsXHJcbiAgICAgICAgICAgIC8vIOmAmuWFszJfMz0xMTEsXHJcbiAgICAgICAgICAgIC8vIOS4uuS7u+aEjzHlkI3oi7Hpm4Tnqb/miLQx5Lu26KOF5aSHPTExMixcclxuICAgICAgICAgICAgLy8g6YCa5YWzMl81PTExMyxcclxuICAgICAgICAgICAgLy8g5bCG54Ku5omL5Y2H6IezMeWkp+aYnz0xMTQsXHJcbiAgICAgICAgICAgIC8vIOmAmuWFszJfNj0xMTUsXHJcbiAgICAgICAgICAgIC8vIOWujOaIkDHmrKHmr4/ml6Xku7vliqE9MTE2LFxyXG4gICAgICAgICAgICAvLyDlrozmiJAx5qyh5oiQ5bCx5Lu75YqhPTExNyxcclxuICAgICAgICAgICAgLy8g6YCa5YWzMl83PTExOCxcclxuICAgICAgICAgICAgLy8g5YmN5b6A5ZWG5Z+O6LSt5LmwMeasoeWVhuWTgT0xMTksXHJcbiAgICAgICAgICAgIC8vIOWQiOaIkDHmrKHoo4XlpIc9MTIwLFxyXG4gICAgICAgICAgICAvLyDpgJrlhbMyXzEwPTEyMSxcclxuICAgICAgICAgICAgLy8g6YCa5YWzM181PTEyMixcclxuICAgICAgICAgICAgLy8g5YmN5b6A5ZWG5Z+O5a215YyWMeasoeWuoOeJqT0xMjMsXHJcbiAgICAgICAgICAgIC8vIOmAmuWFszNfMTA9MTI0LFxyXG4gICAgICAgICAgICAvLyAvLyDmiJDlsLHku7vliqFcclxuICAgICAgICAgICAgLy8g57Sv6K6h6YCa6L+HWOWFsyA9IDEwMDAwMSxcclxuICAgICAgICAgICAgLy8g57Sv6K6hMeS4quiLsembhOWNh+WIsFjnuqcgPSAyMDAwMDEsXHJcbiAgICAgICAgICAgIC8vIOe0r+iuoeaUtumbhljkuKroi7Hpm4QgPSAzMDAwMDEsXHJcbiAgICAgICAgICAgIC8vIOe0r+iuoTHkuKroi7Hpm4TljYfliLBY5pifID0gNDAwMDAxLFxyXG4gICAgICAgICAgICAvLyDntK/orqHojrflvpdY5Lu26KOF5aSHID0gNTAwMDAxLFxyXG4gICAgICAgICAgICAvLyDntK/orqFY5Lu26KOF5aSH5Yiw6L6+5ZOB6LSoNSA9IDYwMDAwMSxcclxuICAgICAgICAgICAgLy8g57Sv6K6h5oub5YufWOS4quiLsembhCA9IDcwMDAwMVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrVGFnQnRuKGUsIHN0YXRlOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIik7XHJcbiAgICAgICAgbGV0IHRvcCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRvcFwiKTtcclxuICAgICAgICBzdGF0ZSA9IE51bWJlcihzdGF0ZSk7XHJcbiAgICAgICAgc3dpdGNoIChzdGF0ZSkge1xyXG4gICAgICAgICAgICBjYXNlIFRhc2tVaVN0YXRlLkRhaWx5OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFRhc2tVaVN0YXRlLkRhaWx5O1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuS7u+WKoV/ml6XluLjpobXnrb7ngrnlh7vmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgdG9wLmNoaWxkcmVuWzBdLmdldENoaWxkQnlOYW1lKFwidGFnMVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMudGFza191aS5nZXRTcHJpdGVGcmFtZShcIlRhc2tfQmdfMlwiKTtcclxuICAgICAgICAgICAgICAgIHRvcC5jaGlsZHJlblswXS5nZXRDaGlsZEJ5TmFtZShcInRhZzJcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnRhc2tfdWkuZ2V0U3ByaXRlRnJhbWUoXCJUYXNrX0JnXzNcIik7XHJcbiAgICAgICAgICAgICAgICB0b3AuY2hpbGRyZW5bMF0uZ2V0Q2hpbGRCeU5hbWUoXCJ0YWdMYWJlbDFcIikuY29sb3IgPSBjYy5jb2xvcigxMTYsIDgyLCA1NSk7XHJcbiAgICAgICAgICAgICAgICB0b3AuY2hpbGRyZW5bMF0uZ2V0Q2hpbGRCeU5hbWUoXCJ0YWdMYWJlbDJcIikuY29sb3IgPSBjYy5jb2xvcig5MSwgNjksIDUyKTtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJhY2hpZXZlbWVudFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJkYWlseVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwiZGFpbHlcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRhc2tVaVN0YXRlLkFjaGlldmVtZW50OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFRhc2tVaVN0YXRlLkFjaGlldmVtZW50O1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuS7u+WKoV/miJDlsLHpobXnrb7ngrnlh7vmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgdG9wLmNoaWxkcmVuWzBdLmdldENoaWxkQnlOYW1lKFwidGFnMlwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMudGFza191aS5nZXRTcHJpdGVGcmFtZShcIlRhc2tfQmdfMlwiKTtcclxuICAgICAgICAgICAgICAgIHRvcC5jaGlsZHJlblswXS5nZXRDaGlsZEJ5TmFtZShcInRhZzFcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnRhc2tfdWkuZ2V0U3ByaXRlRnJhbWUoXCJUYXNrX0JnXzNcIik7XHJcbiAgICAgICAgICAgICAgICB0b3AuY2hpbGRyZW5bMF0uZ2V0Q2hpbGRCeU5hbWUoXCJ0YWdMYWJlbDJcIikuY29sb3IgPSBjYy5jb2xvcigxMTYsIDgyLCA1NSk7XHJcbiAgICAgICAgICAgICAgICB0b3AuY2hpbGRyZW5bMF0uZ2V0Q2hpbGRCeU5hbWUoXCJ0YWdMYWJlbDFcIikuY29sb3IgPSBjYy5jb2xvcig5MSwgNjksIDUyKTtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJhY2hpZXZlbWVudFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5nZXRDaGlsZEJ5TmFtZShcImRhaWx5XCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwiZGFpbHlcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja01haW5UYXNrVWkoKSB7XHJcbiAgICAgICAgbGV0IHRhc2tJbmZvID0gVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluVGFza0RhdGEoKTtcclxuICAgICAgICBsZXQgdGFza1N0YXRlID0gVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5UYXNrU3RhdGUgKyB0YXNrSW5mby5UaHJlYWRUYXNrSUQsIDApO1xyXG4gICAgICAgIHN3aXRjaCAodGFza1N0YXRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIGxldCBpZCA9IE1hdGguZmxvb3IodGFza0luZm8uVGhyZWFkVGFza0lEIC8gMTAwMCkgKiAxMDAwICsgMTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25DbGlja0dvQnRuKGlkKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLm92ZXJUYXNrKHRhc2tJbmZvLlRocmVhZFRhc2tJRCk7XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odGFza0luZm8uUHJvcElEXzEsIHRhc2tJbmZvLlByb3BOdW1fMSk7XHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odGFza0luZm8uUHJvcElEXzIsIHRhc2tJbmZvLlByb3BOdW1fMik7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmV3YXJkMSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0odGFza0luZm8uUHJvcElEXzEsIHRhc2tJbmZvLlByb3BOdW1fMSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmV3YXJkMiA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0odGFza0luZm8uUHJvcElEXzIsIHRhc2tJbmZvLlByb3BOdW1fMik7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNdWx0aXBsZUdldFRpcChbcmV3YXJkMSwgcmV3YXJkMl0pO1xyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuS4u+e6v+S7u+WKoeWujOaIkOS6uuaVsOaVsOmHj194K3Rhc2tJbmZvLlRocmVhZFRhc2tJRCk7XHJcbiAgICAgICAgICAgICAgICAvL+WIt+aWsOS4u+e6v+S7u+WKoeaYvuekulxyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9tYWluX3VpJykuZ2V0Q29tcG9uZW50KE1haW5VaSkucmVmcmVzaE1haW5UYXNrVWkoKTtcclxuICAgICAgICAgICAgICAgIH0sIDAuMDEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4iXX0=