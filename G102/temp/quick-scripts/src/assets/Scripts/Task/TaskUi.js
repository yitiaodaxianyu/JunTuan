"use strict";
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